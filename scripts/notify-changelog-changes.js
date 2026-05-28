#!/usr/bin/env node
/**
 * Notify subscribers about changelog updates after a docs deploy.
 *
 * Runs in Azure Pipelines after the rsync deploy step. Detects three
 * kinds of release-notes change in the latest commit range:
 *   - .mdx / .md edits under docs/cloud/changelog/  (rare — page shell)
 *   - .json edits under static/release-notes/      (the common case —
 *     release entries live here; the .mdx renders them via
 *     <ReleaseNotesGenerator noteKey="<key>" />). Both en (`<key>.json`)
 *     and ja (`<key>-ja.json`) variants resolve back to the same .mdx.
 *   - The curated /release-notes/ page itself — src/pages/release-notes.js
 *     or its JA mirror at
 *     i18n/ja/docusaurus-plugin-content-pages/release-notes.js. Either
 *     edit produces one synthetic change with slug "/release-notes" and
 *     title "Release Notes"; the function templates a dedicated subject.
 *
 * For each affected page it reads frontmatter title and POSTs the list
 * to the `notifyPagesChanged` Cloud Function in zoho-creator-dev.
 *
 * Environment:
 *   NOTIFY_URL                  (required) — Cloud Function endpoint, e.g.
 *                               https://europe-west1-zoho-creator-dev.cloudfunctions.net/notifyPagesChanged
 *   NOTIFY_PIPELINE_TOKEN       (required) — shared secret bound to the
 *                               function via Firebase Secret Manager.
 *   GIT_BASE                    (optional) — git ref to compare against.
 *                               Defaults to HEAD~1 which works for squash-merge
 *                               flows (one merge commit per deploy). Override
 *                               when the deploy includes multiple commits.
 *   NOTIFY_RELEASE_NOTES_PAGE   (optional) — kill switch for the curated
 *                               /release-notes/ page trigger (both en and ja).
 *                               Default: enabled. Set to "false", "0", or
 *                               "off" to skip the page-level synthetic
 *                               notification while you stage upcoming
 *                               release content. Edits to changelog .mdx
 *                               files and static/release-notes/*.json
 *                               continue to notify normally.
 *
 * Exit codes:
 *   0 — success (sent OR no changelog files changed)
 *   1 — unexpected error (config missing, fetch failed, etc.)
 *
 * Intentionally non-fatal: we exit 0 if the notification API returns an
 * error, because a failed notification shouldn't fail a docs deploy.
 * (Logs the issue so it's visible in the build log.)
 */

const {execSync} = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const NOTIFY_URL = process.env.NOTIFY_URL;
const NOTIFY_PIPELINE_TOKEN = process.env.NOTIFY_PIPELINE_TOKEN;
const GIT_BASE = process.env.GIT_BASE || "HEAD~1";

// Kill switch for the curated /release-notes/ page trigger. Toggle from the
// Azure Pipelines variable `notifyReleaseNotesPage` (or set the env var
// directly). Default: enabled. Set to "false", "0", or "off" to silence
// notifications for edits to src/pages/release-notes.js and its JA mirror.
const NOTIFY_RELEASE_NOTES_PAGE = !["false", "0", "off"].includes(
  String(process.env.NOTIFY_RELEASE_NOTES_PAGE || "").toLowerCase(),
);

if (!NOTIFY_URL || !NOTIFY_PIPELINE_TOKEN) {
  console.error("notify-changelog-changes: NOTIFY_URL or NOTIFY_PIPELINE_TOKEN missing — skipping.");
  process.exit(0);
}

// 1. Find changelog files that changed in this push.
//
// Two flavours of edit count as a changelog change:
//   a) The .mdx page itself (rare — usually only on creation or rename).
//   b) The JSON data file at static/release-notes/<key>.json or
//      static/release-notes/<key>-ja.json (the common case — every
//      release adds rows here, the .mdx is a thin shell that renders
//      via <ReleaseNotesGenerator noteKey="<key>" />).
//
// For each JSON change we resolve back to the matching .mdx so the
// email subject and link still come from the page's frontmatter and
// canonical URL. JSON files whose .mdx we can't locate are skipped
// (logged, non-fatal).
const CHANGELOG_DIR = "docs/cloud/changelog";
const CHANGELOG_PREFIX = `${CHANGELOG_DIR}/`;
const RELEASE_NOTES_PREFIX = "static/release-notes/";

let diffOut;
try {
  diffOut = execSync(`git diff --name-only ${GIT_BASE} HEAD`, {encoding: "utf8"});
} catch (err) {
  console.error("notify-changelog-changes: git diff failed:", err.message);
  process.exit(0);
}

const diffPaths = diffOut.split("\n").map((s) => s.trim()).filter(Boolean);

// Direct .mdx / .md edits under docs/cloud/changelog/.
const directMdx = diffPaths.filter(
  (s) => s.startsWith(CHANGELOG_PREFIX) && (s.endsWith(".mdx") || s.endsWith(".md")),
);

// JSON edits under static/release-notes/. Map each one back to its .mdx.
function findMdxForKey(key) {
  // Walk docs/cloud/changelog/ recursively and pick the first .mdx whose
  // basename matches "<key>.mdx" (or .md). Keys are unique across the tree.
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, {withFileTypes: true});
    } catch {
      return null;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const hit = walk(full);
        if (hit) return hit;
      } else if (
        entry.isFile() &&
        (entry.name === `${key}.mdx` || entry.name === `${key}.md`)
      ) {
        return full;
      }
    }
    return null;
  }
  return walk(CHANGELOG_DIR);
}

const jsonHits = diffPaths
  .filter((s) => s.startsWith(RELEASE_NOTES_PREFIX) && s.endsWith(".json"))
  .map((s) => {
    // static/release-notes/agent-activity-manager.json     → key "agent-activity-manager"
    // static/release-notes/agent-activity-manager-ja.json  → key "agent-activity-manager"
    const base = path.basename(s, ".json").replace(/-ja$/, "");
    const mdx = findMdxForKey(base);
    if (!mdx) {
      console.warn(`notify-changelog-changes: no .mdx found for release-notes key "${base}" (from ${s}); skipping.`);
      return null;
    }
    return mdx;
  })
  .filter(Boolean);

// Dedupe — same .mdx may be reached from .mdx edit + .json edit, or from
// en + ja JSON edits in the same push.
const changedFiles = [...new Set([...directMdx, ...jsonHits])];

// Curated /release-notes/ page (en or ja). Either edit fires one
// synthetic change keyed by slug "/release-notes" so it dedupes across
// the en + ja sources in the same push.
const RELEASE_NOTES_PAGE_PATHS = new Set([
  "src/pages/release-notes.js",
  "i18n/ja/docusaurus-plugin-content-pages/release-notes.js",
]);
const releaseNotesPagePathsTouched = diffPaths.some((s) => RELEASE_NOTES_PAGE_PATHS.has(s));
if (releaseNotesPagePathsTouched && !NOTIFY_RELEASE_NOTES_PAGE) {
  console.log(
    "notify-changelog-changes: /release-notes/ page changed but NOTIFY_RELEASE_NOTES_PAGE is off — skipping page-level notification.",
  );
}
const releaseNotesPageTouched = releaseNotesPagePathsTouched && NOTIFY_RELEASE_NOTES_PAGE;

if (changedFiles.length === 0 && !releaseNotesPageTouched) {
  console.log("notify-changelog-changes: no release-notes files changed in this deploy.");
  process.exit(0);
}
const summaryItems = [...changedFiles];
if (releaseNotesPageTouched) summaryItems.push("/release-notes (curated page)");
console.log(`notify-changelog-changes: ${summaryItems.length} release-notes change(s):`);
summaryItems.forEach((f) => console.log(`  ${f}`));

// 2. For each file, read frontmatter and extract title + build the docs URL.
function readFrontmatter(filePath) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    return {};
  }
  // Frontmatter is a `---`-delimited block at the very top of the file.
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = match[1];
  // Naïve YAML: pull each "key: value" pair. Strips matched single/double
  // quotes from the value. Enough for our needs (title, tags, description).
  const result = {};
  for (const line of fm.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.+?)\s*$/);
    if (m) {
      let v = m[2];
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      result[m[1]] = v;
    }
  }
  return result;
}

function fileToSlug(filePath) {
  // docs/cloud/changelog/components/broker.mdx → /cloud/changelog/components/broker
  return "/" + filePath
    .replace(/^docs\//, "")
    .replace(/\/index\.(mdx?|md)$/, "")
    .replace(/\.(mdx?|md)$/, "");
}

const changes = changedFiles.map((f) => {
  const fm = readFrontmatter(f);
  const title = fm.title || path.basename(f, path.extname(f));
  return {slug: fileToSlug(f), title};
});
if (releaseNotesPageTouched) {
  // Synthetic change for the curated /release-notes/ page. The function
  // detects slug === "/release-notes" and uses a dedicated subject /
  // body template ("OpenLM Release Notes — updated").
  changes.push({slug: "/release-notes", title: "Release Notes"});
}

// 3. POST to notifyPagesChanged. Native fetch in Node 22+.
console.log(`notify-changelog-changes: notifying for ${changes.length} change(s).`);
(async () => {
  try {
    const res = await fetch(NOTIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Notify-Token": NOTIFY_PIPELINE_TOKEN,
      },
      body: JSON.stringify({changes}),
    });
    const text = await res.text();
    if (!res.ok) {
      console.error(`notify-changelog-changes: ${res.status} ${res.statusText} — ${text}`);
      // Don't fail the deploy — a missed notification is recoverable.
      process.exit(0);
    }
    console.log("notify-changelog-changes: response:", text);
  } catch (err) {
    console.error("notify-changelog-changes: fetch failed:", err.message);
    process.exit(0);
  }
})();
