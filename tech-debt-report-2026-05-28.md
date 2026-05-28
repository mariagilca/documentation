---
title: Technical debt and improvement report
description: Engineering-lens audit of the OpenLM documentation site (Docusaurus 3.10) covering build, CI, config, repo hygiene, and structural debt, with a prioritized fix list.
date: 2026-05-28
---

# Technical debt and improvement report

**Scope:** the OpenLM documentation repo (Docusaurus 3.10, React 19, deployed to `https://openlm.com/documentation/`).
**Lens:** build, CI, config, and repo health. A prior content/IA audit already exists in `audit-2026-05-12.md`; this report focuses on engineering debt and does not repeat that work.

## Summary

The site is structurally healthy: current Docusaurus and React, 100% `title`/`description` frontmatter on the cloud doc set, near-1:1 Japanese parity, a real Vale style derived from Splunk, security `headTags`, and a working CI deploy. The debt is concentrated in three areas: a build that can't fail on the errors that matter most, quality gates that exist but aren't enforced, and accumulated repo cruft that blurs the line between "docs site" and "everything else that grew up next to it."

## Prioritized fix list

| # | Issue | Effort | Impact |
| --- | --- | --- | --- |
| 1 | Broken links and anchors never fail the build | S | High |
| 2 | CI uses `npm install --force`, not `npm ci` | S | High |
| 3 | Vale runs only locally, never in CI | S | Medium |
| 4 | a11y gate is soft and scans only 4 pages | M | Medium |
| 5 | No lint/format/test step for `src/` | M | Medium |
| 6 | Firebase Functions project lives inside the docs repo | M | Medium |
| 7 | `*.bak.todelete` and one-off audit scripts committed | S | Low |
| 8 | Stale/incomplete onboarding docs and a shipped placeholder | S | Low |

## Build and config

The highest-leverage issue is that **broken internal links and anchors are invisible to the build.** `docusaurus.config.js` sets `onBrokenLinks: 'warn'` and `onBrokenAnchors: 'ignore'`. Across ~2,200 MD/MDX files with an actively churning redirect map, link rot accumulates silently and only surfaces as a 404 in production. The config itself documents one such trap: the `#arcgis-online` anchor redirect can't be expressed, so inbound links "silently miss the section." Recommendation: move to `onBrokenLinks: 'throw'` (at minimum in CI), fix the backlog the first run surfaces, and set `onBrokenAnchors: 'warn'`.

**CI installs with `npm install --force`** (`azure-pipelines.yml`), which overrides peer-dependency conflicts — likely the React 19 / Docusaurus combination — and produces non-reproducible installs that ignore `package-lock.json`. Switch to `npm ci` so the lockfile is authoritative, and resolve the underlying peer conflict rather than masking it. There's also no `node_modules` cache step, so every run reinstalls from scratch.

Two Algolia settings look like **un-customized template placeholders**: `externalUrlRegex: 'external\\.com|domain\\.com'` and `replaceSearchResultPathname: { from: '/docs/', to: '/' }`. The site's `baseUrl` is `/documentation/`, not `/docs/`, so that rewrite is almost certainly dead or wrong. Worth verifying against live search results and removing if unused.

Minor: the config mixes ES module `import` at the top with `module.exports` / `require.resolve` at the bottom — pick one style. The `future.v4: true` flag is on while several `// TODO Docusaurus v4` workarounds remain in swizzled theme files (`SearchBar`, `Navbar/MobileSidebar`); these are tracked migration debt to close before v4 lands.

## Quality gates that exist but aren't enforced

The repo has good tooling that CI doesn't run:

- **Vale** is fully configured (`.vale.ini` plus ~65 rules under `styles/OpenLM/`) and exposed as `npm run vale`, but it is not a pipeline step. Style enforcement is therefore opt-in and drifts.
- **Accessibility** checks run but `exit 0` at the end, so violations only warn. The axe scan also covers just four hardcoded URLs out of ~870 routes — the home page, one getting-started page, privacy, and accessibility. It won't catch regressions in the doc body, which is most of the site.
- **No lint, format, or test step** covers the 35 JS/TSX files in `src/` (custom plugins, 13 swizzled theme components, MDX components). A swizzled-component bug ships unless caught by eye.

None of these need to *block* immediately; even running them as required-but-warning jobs makes the signal visible.

## Repo hygiene and mixed concerns

**A full Firebase Cloud Functions project lives inside the docs repo** at `subscriptions-functions/` — its own `package.json`, `firebase.json`, `.firebaserc`, and Zoho/email integration code. It's unrelated to building a Docusaurus content site and entangles two deploy targets, two dependency surfaces, and two security postures in one repo. Consider extracting it to its own repo (or at least documenting why it's here and isolating its CI).

Three files are committed with a literal **`.bak.todelete`** suffix (`subscriptions-functions/HANDOFF.md`, `subscriptions-functions/README.md`, `project-guides/subscriptions-architecture.md`) — explicitly marked for deletion yet still tracked. Delete them. Similarly, `tooling/audits/` holds ~20 single-use migration Python scripts plus committed `.docx` audit artifacts; archive or remove the spent ones so the directory stops reading as live tooling.

`src/pages/release-notes.js` ships a placeholder: `src: null, // TODO: paste published Arcade embed URL here.` — the embed renders nothing in production until that URL is filled in.

## Documentation drift

`CLAUDE.md` is the onboarding contract and has two inaccuracies that will mislead future contributors (and agents):

- It documents the `reading-time` and `last-updated` custom plugins but omits the third, **`llm-markdown`** (352 lines) — the largest of them. Anyone adding a doc set per the CLAUDE.md instructions will forget to wire it.
- It states there is "no `docs/onpremise/`," yet a substantial on-premise section exists at `docs/cloud/deployment-operations/on-premise/` (with its own open TODOs). The statement is technically true about the path but misleading about the content's existence.

The swizzled **`BlogLayout`** component remains in `src/theme/` while `blog: false` is set — a dead swizzle that still has to be reconciled on every Docusaurus upgrade.

## What to keep

Docusaurus 3.10 and React 19 are current; frontmatter discipline on the cloud set is excellent; the Vale style and JA parity are real assets; security `headTags` and the date-gated announcement bar are thoughtful touches. The fixes above are mostly about *enforcing* quality that the repo already knows how to produce, not building it from scratch.
