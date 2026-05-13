#!/usr/bin/env node
/**
 * Notify subscribers about changelog updates after a docs deploy.
 *
 * Runs in Azure Pipelines after the rsync deploy step. Computes the set
 * of .mdx files under docs/cloud/changelog/ that changed in the latest
 * commit range, reads each file's frontmatter title, and POSTs the list
 * to the `notifyPagesChanged` Cloud Function in zoho-creator-dev.
 *
 * Environment:
 *   NOTIFY_URL            (required) — Cloud Function endpoint, e.g.
 *                         https://europe-west1-zoho-creator-dev.cloudfunctions.net/notifyPagesChanged
 *   NOTIFY_PIPELINE_TOKEN (required) — shared secret bound to the
 *                         function via Firebase Secret Manager.
 *   GIT_BASE              (optional) — git ref to compare against.
 *                         Defaults to HEAD~1 which works for squash-merge
 *                         flows (one merge commit per deploy). Override
 *                         when the deploy includes multiple commits.
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

if (!NOTIFY_URL || !NOTIFY_PIPELINE_TOKEN) {
  console.error("notify-changelog-changes: NOTIFY_URL or NOTIFY_PIPELINE_TOKEN missing — skipping.");
  process.exit(0);
}

// 1. Find changelog files that changed in this push.
const CHANGELOG_PREFIX = "docs/cloud/changelog/";
let changedFiles;
try {
  const out = execSync(`git diff --name-only ${GIT_BASE} HEAD`, {encoding: "utf8"});
  changedFiles = out
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.startsWith(CHANGELOG_PREFIX) && (s.endsWith(".mdx") || s.endsWith(".md")));
} catch (err) {
  console.error("notify-changelog-changes: git diff failed:", err.message);
  process.exit(0);
}

if (changedFiles.length === 0) {
  console.log("notify-changelog-changes: no changelog files changed in this deploy.");
  process.exit(0);
}
console.log(`notify-changelog-changes: ${changedFiles.length} changelog file(s) changed:`);
changedFiles.forEach((f) => console.log(`  ${f}`));

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
