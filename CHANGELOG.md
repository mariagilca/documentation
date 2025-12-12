# Changelog

This project follows Keep a Changelog and Semantic Versioning.

- Reference: `https://keepachangelog.com/en/1.1.0/`
- Versioning: `https://semver.org/`

## [Unreleased]

- Placeholder for upcoming changes. Add new entries under the sections below.

### Added
- Navbar item “Doc feedback” → `https://app.arcade.software/share/QmFv92cLTnwngBcCvHBi`.
- Deployment & Operations section (Cloud) with Cloud/On-Premise subcats; On-Premise landing at `docs/cloud/deployment-operations/on-premise/index.mdx`.
- Embedded Arcade demo on the homepage hero using `https://demo.arcade.software/dIJf3kJCT0mFSmhg3IcM?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true`.
- Modernized Deployment/Quick start cards for Cloud / On-Premise / Legacy (glow, hover motion).
- Japanese localization for Deployment & Operations (labels and docs) in `i18n/ja/docusaurus-plugin-content-docs-cloud/current/deployment-operations/**` and UI strings in `i18n/ja/code.json`.

### Changed
- Removed On-Premise docs plugin and placeholder preset; docs nav now exposes Platform (Cloud) and Legacy only.
- Reordered Cloud sidebar: Deployment & Operations moved to position 2; Getting started shifted down.
- Hero restyled (animated gradients, framed embed) and stripped redundant pills/modals.
- Quick start cards rewritten for cloud onboarding, On-Premise install, and legacy access; updated styling.
- Demo frame styling enhanced (rounding, layered gradients, inset border, deeper shadow).
- Footer rebuilt as a custom theme override; styling centralized in `src/theme/Footer/styles.module.css` while keeping existing links/content.

### Removed
- Old `docs/cloud/onpremise` tree (content migrated to deployment-operations/on-premise).
- Hero feedback/demo pill and modal-based demo triggers.

### Fixed
- Broken links from LAC slug, feature matrix, release notes, legacy paths, and deployment moves; `npm run build` now passes cleanly after changes.

### Notes
- Builds verified with `npm run build` after major edits.
- Legacy remains accessible via homepage cards; Cloud/On-Premise entry points consolidated under the new structure.

---

### How to add new entries

1. Record changes under `[Unreleased]` during development.
2. When releasing, create a new version/date section (e.g., `## [2026-01-15]`).
3. Move items from `[Unreleased]` into the release section, grouped by categories: Added, Changed, Deprecated, Removed, Fixed, Security.
4. Keep bullets concise, reference file paths or URLs in backticks.
5. Prefer date-based sections if no package version is published.
