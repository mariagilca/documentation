# tooling/audits/

One-shot audit scripts and the audit artifacts they produced. **Not part of the documentation build** — Docusaurus does not read this folder.

The contents are point-in-time tooling that ran during specific migrations. Kept in-repo for institutional knowledge and so the scripts are available if a similar migration recurs.

## What's here

### Audit reports (point-in-time)

| File | What it audited |
| --- | --- |
| `Engineering-License-Managers-Audit-2026-05-06.docx` | Coverage and quality of `docs/cloud/data-collection/connect-license-managers/engineering-lms/`. |
| `SaaS-Platforms-Audit-2026-05-06.docx` | Coverage and quality of `docs/cloud/data-collection/connect-license-managers/saas-platforms/`. |

These reflect the state of the docs **as of May 2026**. Re-run the corresponding `build_*_audit.py` script to regenerate against the current state.

### Audit generators

| Script | Produces |
| --- | --- |
| `build_engineering_lms_audit.py` | `Engineering-License-Managers-Audit-*.docx`. |
| `build_saas_platforms_audit.py` | `SaaS-Platforms-Audit-*.docx`. |

### One-shot migration scripts (already executed)

These ran during the April–May 2026 cleanup. They are kept for reference, not for re-running on the current tree — they assume a specific starting state.

| Script | Purpose |
| --- | --- |
| `add_image_captions.py` | Added italicised captions under MDX images. |
| `admonition_global_fix.py` | Normalised admonition keywords across legacy content. |
| `arrow_separator_fix.py` | Replaced `→` arrows with breadcrumb-style menu separators. |
| `ja_translate.py`, `ja_translate_captions.py` | One-shot JA translation passes. |
| `track1_normalize.py`, `saas_track1_normalize.py`, `saas_track1_cleanup.py` | Track 1 normalisation across LM and SaaS content. |
| `track4a_migrate_stubs.py`, `track4b_*` | Track 4 migration: stubs → substantive content, recovery, polish. |
| `saas_track4_migrate.py`, `saas_track4_polish.py` | Track 4 equivalents for SaaS. |
| `transpose_capability_tables.py` | Reshaped LM capability tables from wide to tall format. |

## Conventions

- **Date-stamp every audit artifact** (`*-YYYY-MM-DD.docx`) so old reports stay legible.
- **Don't commit `.docx` outputs that this folder didn't already track.** New runs should write to your local copy or to `$TMPDIR`. The `.gitignore` at the repo root excludes new `*.docx` files.
- **Don't add migration scripts here unless they've already run.** This folder is an archive. Active tooling belongs in `scripts/` (which CI uses).

## Running an audit generator

```bash
cd tooling/audits
python3 build_engineering_lms_audit.py
```

Each `build_*_audit.py` script declares its own dependencies in the docstring. Typical needs: `python-docx`, `gray-matter`-equivalent (`python-frontmatter`), `lxml`.

## Removing this folder

If you decide these are no longer worth keeping in-repo:

1. Archive `*.docx` outputs to long-term storage (cloud drive, internal wiki) and link from `project-guides/overview.md`.
2. Move the migration scripts to a separate `openlm-docs-tooling` repo if they're worth preserving as a code library.
3. Delete the folder.

The repo's primary `STYLE_GUIDE.md` and `CONTRIBUTING.md` describe the current authoring conventions — the migration scripts that got the legacy content there don't need to ship forever.
