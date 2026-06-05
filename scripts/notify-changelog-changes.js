#!/usr/bin/env node
/**
 * Notify subscribers about changelog updates after a docs deploy.
 *
 * Runs in Azure Pipelines after the rsync deploy step. Detects three
 * kinds of release-notes change in the latest commit range:
 *   - .mdx / .md edits under docs/cloud/changelog/ or docs/legacy/changelog/
 *     (rare — page shell). Edits confined to frontmatter (tag sweeps,
 *     sidebar_position shuffles) are skipped: subscribers only care when
 *     the rendered body changes.
 *   - .json edits under static/release-notes/      (the common case —
 *     release entries live here; the .mdx renders them via
 *     <ReleaseNotesGenerator noteKey="<key>" />). Both en (`<key>.json`)
 *     and ja (`<key>-ja.json`) variants resolve back to the same .mdx.
 *     Resolution is by noteKey first, filename second — legacy keys carry
 *     a `legacy-` prefix their page filename doesn't (legacy-slm.json →
 *     docs/legacy/changelog/slm.mdx).
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
 *   NOTIFY_DRY_RUN              (optional) — "true", "1", or "on" prints the
 *                               payload that would be sent and exits 0
 *                               without POSTing. NOTIFY_URL and
 *                               NOTIFY_PIPELINE_TOKEN are not required in
 *                               this mode. For local testing, e.g.:
 *                               NOTIFY_DRY_RUN=1 GIT_BASE=origin/master \
 *                                 node scripts/notify-changelog-changes.js
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

// Dry run: compute and print the payload, send nothing. URL/token optional.
const NOTIFY_DRY_RUN = ["true", "1", "on"].includes(
  String(process.env.NOTIFY_DRY_RUN || "").toLowerCase(),
);

if (!NOTIFY_DRY_RUN && (!NOTIFY_URL || !NOTIFY_PIPELINE_TOKEN)) {
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
//
// Both changelog trees are covered: docs/cloud/changelog/ (Platform)
// and docs/legacy/changelog/ (Version 25). Cloud is searched first.
const CHANGELOG_DIRS = ["docs/cloud/changelog", "docs/legacy/changelog"];
const CHANGELOG_PREFIXES = CHANGELOG_DIRS.map((d) => `${d}/`);
const RELEASE_NOTES_PREFIX = "static/release-notes/";

let diffOut;
try {
  diffOut = execSync(`git diff --name-only ${GIT_BASE} HEAD`, {encoding: "utf8"});
} catch (err) {
  console.error("notify-changelog-changes: git diff failed:", err.message);
  process.exit(0);
}

const diffPaths = diffOut.split("\n").map((s) => s.trim()).filter(Boolean);

// Direct .mdx / .md edits under a changelog tree (cloud or legacy).
//
// Frontmatter-only edits (tag sweeps, sidebar_position shuffles,
// description tweaks) are not release content — compare the body
// (everything after the frontmatter block) at GIT_BASE vs HEAD and drop
// files whose body is unchanged. Files deleted in this push are dropped
// too (nothing to link to); newly added pages notify.
function gitShow(ref, filePath) {
  try {
    return execSync(`git show "${ref}:${filePath}"`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null; // path doesn't exist at that ref
  }
}

function stripFrontmatter(raw) {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

const isChangelogMdx = (s) =>
  CHANGELOG_PREFIXES.some((p) => s.startsWith(p)) &&
  (s.endsWith(".mdx") || s.endsWith(".md"));

const directMdx = diffPaths.filter(isChangelogMdx).filter((f) => {
  const newRaw = gitShow("HEAD", f);
  if (newRaw === null) {
    console.log(`notify-changelog-changes: ${f} was deleted in this push; skipping.`);
    return false;
  }
  const oldRaw = gitShow(GIT_BASE, f);
  if (oldRaw === null) return true; // newly added page
  if (stripFrontmatter(oldRaw) === stripFrontmatter(newRaw)) {
    console.log(`notify-changelog-changes: ${f} changed in frontmatter only; skipping.`);
    return false;
  }
  return true;
});

// JSON edits under static/release-notes/. Map each one back to its .mdx.
//
// Resolution order:
//   1. noteKey match — the page that renders the JSON declares it via
//      <ReleaseNotesGenerator noteKey="<key>" />. This is what handles
//      legacy components, whose key carries a `legacy-` prefix the page
//      filename doesn't (legacy-slm.json → docs/legacy/changelog/slm.mdx,
//      which renders noteKey="legacy-slm").
//   2. basename match — "<key>.mdx" / "<key>.md", the original heuristic,
//      kept as a fallback for shells that don't declare a noteKey.
//
// A key may resolve to MULTIPLE pages: the Broker changelog is rendered
// by both trees (docs/cloud/changelog/components/broker.mdx and
// docs/legacy/changelog/broker.mdx both declare noteKey="broker"), and
// each rendered page changes when the JSON does — notify all of them.
function collectChangelogPages() {
  const files = [];
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, {withFileTypes: true});
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))
      ) {
        files.push(full);
      }
    }
  }
  for (const dir of CHANGELOG_DIRS) walk(dir);
  return files;
}

const changelogPages = collectChangelogPages();

function findPagesForKey(key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Matches noteKey="…", noteKey='…', and the JSX brace form noteKey={"…"}.
  const noteKeyRe = new RegExp(`noteKey\\s*=\\s*\\{?\\s*["']${escaped}["']`);
  const byNoteKey = changelogPages.filter((f) => {
    let raw;
    try {
      raw = fs.readFileSync(f, "utf8");
    } catch {
      return false;
    }
    return noteKeyRe.test(raw);
  });
  if (byNoteKey.length > 0) return byNoteKey;
  return changelogPages.filter(
    (f) => path.basename(f) === `${key}.mdx` || path.basename(f) === `${key}.md`,
  );
}

const jsonHits = diffPaths
  .filter((s) => s.startsWith(RELEASE_NOTES_PREFIX) && s.endsWith(".json"))
  .flatMap((s) => {
    // static/release-notes/agent-activity-manager.json     → key "agent-activity-manager"
    // static/release-notes/agent-activity-manager-ja.json  → key "agent-activity-manager"
    const base = path.basename(s, ".json").replace(/-ja$/, "");
    const pages = findPagesForKey(base);
    if (pages.length === 0) {
      console.warn(`notify-changelog-changes: no .mdx found for release-notes key "${base}" (from ${s}); skipping.`);
    }
    return pages;
  });

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
if (NOTIFY_DRY_RUN) {
  console.log("notify-changelog-changes: dry run — payload that would be sent:");
  console.log(JSON.stringify({changes}, null, 2));
  process.exit(0);
}
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
