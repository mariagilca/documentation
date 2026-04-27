---
id: intern-task-list
title: Intern Task List
sidebar_label: Intern Tasks
---

This task list gives joining interns a practical starting point for maintaining the OpenLM documentation repository. It combines onboarding work, recurring documentation responsibilities, and a backlog of real gaps currently visible in the repo.

## Goal

Help interns contribute useful documentation updates without guessing where to start. Every completed task should improve clarity, completeness, accuracy, or maintainability of the OpenLM docs.

## First Week Checklist

1. Read the internal guides in `project-guides/overview.md`, `project-guides/development-workflow.md`, `project-guides/architecture.md`, and `project-guides/localization.md`.
2. Install dependencies with `npm install`.
3. Start the local docs site with `npm run start`.
4. Review the repository structure:
   - `docs/cloud` for OpenLM Platform content
   - `docs/legacy` for Version 25 and older product content
   - `i18n/ja` for Japanese localization
   - `static` and `src/static` for images and structured assets
   - `src` for custom pages, components, and theme overrides
5. Open at least one cloud page and one legacy page locally to understand how content is rendered.
6. Learn the validation commands:
   - `npm run build`
   - `npm run vale`
   - `npm run write-translations -- --locale ja`

## Ongoing Responsibilities

1. Update pages that have missing steps, outdated screenshots, unclear wording, or incomplete prerequisites.
2. Replace placeholder text, TODO comments, and "coming soon" pages with complete documentation.
3. Keep terminology consistent across pages, especially for OpenLM Platform service names and deployment terms.
4. Add or update screenshots and diagrams when the current visuals no longer match the product.
5. Check links, headings, code blocks, tables, and front matter whenever a page is edited.
6. Run `npm run build` before submitting significant documentation updates.
7. Run `npm run vale` for style checks on Markdown content under `docs/`.
8. When English content changes, review whether Japanese localization also needs an update.

## Priority Task Backlog

### 1. Complete placeholder OpenLM Platform integration guides

These pages currently contain placeholder text and should be expanded into real setup guides with prerequisites, configuration steps, verification, screenshots, and troubleshooting:

- `docs/cloud/data-collection/connect-license-managers/engineering-lms/altair-managed.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/altiva.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/autodesk-token-flex.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/ibm-jazz.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/juniper.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/msc-licensing-helium.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/peloton-rigview.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/phase2phase.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/re-vision-effects.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/seisware.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/sparx-pro.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/tebis-tg.mdx`
- `docs/cloud/data-collection/connect-license-managers/engineering-lms/tweak.mdx`

Recommended starting page: `docs/cloud/data-collection/connect-license-managers/engineering-lms/office365-cloud.mdx`, because it already contains partial structure and notes about missing Broker steps, verification, and screenshots.

### 2. Replace placeholder administration content

Expand `docs/cloud/openlm-administration/license-manager.mdx`, which is still marked as a placeholder. The final version should explain:

- what the service does
- where it appears in the platform
- prerequisites
- main configuration or usage steps
- validation steps
- common problems and troubleshooting notes

### 3. Close TODOs in on-premise deployment documentation

These pages still contain unresolved TODO markers or missing package references:

- `docs/cloud/deployment-operations/on-premise/deployment-guide/aws/environment-setup.md`
- `docs/cloud/deployment-operations/on-premise/deployment-guide/platform-as-vm/deployment.md`
- `docs/cloud/deployment-operations/on-premise/architecture-components.mdx`
- `docs/cloud/deployment-operations/on-premise/deployment-guide/platform-installation.md`

Intern tasks for this area:

1. Confirm which download links or package references should appear.
2. Replace unresolved TODO markers with final content.
3. Validate that all placeholder configuration tokens are explained clearly.
4. Check that related pages link to each other correctly.

### 4. Finish draft and "coming soon" legacy pages

The following legacy content still needs full documentation work:

- `docs/legacy/slmc/cloud-portal.md`
- `docs/legacy/interfacing-articles/aimms.mdx`
- `docs/legacy/interfacing-articles/ogi-systems.mdx`
- `docs/legacy/interfacing-articles/squish.mdx`

For `docs/legacy/slmc/cloud-portal.md`, replace TODO sections for prerequisites, external identity providers, security considerations, troubleshooting, and next steps.

### 5. Audit internal contributor documentation

Some internal repo guides still describe an outdated structure that references `docs/onpremise`, while the current Docusaurus configuration publishes `docs/cloud` and `docs/legacy`.

Audit and update:

- `README.md`
- `project-guides/development-workflow.md`
- `project-guides/architecture.md`

The goal is to make contributor guidance match `docusaurus.config.js` and the real repo layout.

### 6. Run cleanup passes on pages already in progress

When working on any assigned page, also check for:

- broken internal links
- inconsistent heading capitalization
- missing image alt text or unclear image names
- outdated product names
- duplicated content that can be consolidated
- pages that need a short checklist, prerequisites table, or troubleshooting section

## Definition Of Done

A task is complete only when all of the following are true:

1. The page no longer contains placeholder text, TODO markers, or draft-only notes.
2. Steps are written clearly enough for another person to follow without extra explanation.
3. Any required images or assets are committed in the correct location.
4. Links, headings, and code blocks render correctly in local preview.
5. `npm run build` succeeds for significant changes.
6. `npm run vale` is run for Markdown changes, or any exceptions are documented.
7. Japanese localization impact has been reviewed when English source content changes.

## Suggested Intern Workflow

1. Pick one assigned page or gap from the backlog.
2. Review similar completed pages in the same section for format and level of detail.
3. Draft the content update.
4. Preview locally and fix formatting or link issues.
5. Run build and style checks.
6. Submit the change for review with a short summary of what was updated and what still needs validation.

## Good Starter Assignments

If an intern is new to the product, start with one of these:

1. Expand one placeholder engineering integration page.
2. Clean up one legacy "coming soon" article.
3. Audit one documentation section for broken links and outdated wording.
4. Update one internal contributor guide so it matches the current repo structure.
