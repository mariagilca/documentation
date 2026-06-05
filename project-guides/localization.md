---
id: localization-guide
title: Localization Guide
sidebar_label: Localization
---

Japanese is the primary localization supported by this repository. Follow the steps below to keep locale content synchronized with the English source material.

## Workflow Overview

1. Run the extraction command after any English doc updates:
   ```bash
   npm run write-translations -- --locale ja
   ```
2. Translate the generated files under `i18n/ja/docusaurus-plugin-content-docs` and `i18n/ja/docusaurus-plugin-content-pages`.
3. Update additional structured data (for example `static/release-notes/broker-ja.json`) to mirror the latest English changes.
4. Preview the localized site with:
   ```bash
   npm run start -- --locale ja
   ```

## Translation Tips

- Keep front matter fields such as `id`, `slug`, `tags`, and `keywords` identical to the English source unless a localized route is required.
- Never translate `tags:` values in frontmatter — they are route keys for the generated `/tags/` pages and must byte-match the English source (`scripts/check-a11y-source.py` checks this). Localized tag *labels* belong in `i18n/ja/docusaurus-plugin-content-docs-cloud/current/tags.yml`.
- Maintain Markdown structure and code fences to ensure Docusaurus renders components correctly.
- For shared data files, align version identifiers and timestamps with the English source to avoid mismatched release entries.

## Quality Checks

- Confirm that navigation labels appear correctly by reviewing the locale specific sidebar configuration under `i18n/ja`. 
- Use the dev server console to spot missing translations or broken component imports.
- When updating release notes or other JSON driven content, validate the format with `jq` or an equivalent tool if available.

## Submitting Translations

Include both the source modifications and translated files in the same pull request to keep language variants in sync. Reviewers should verify that timestamps, version numbers, and structured content remain aligned across locales.
