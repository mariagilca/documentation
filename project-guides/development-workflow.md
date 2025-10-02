---
id: development-workflow
title: Development Workflow
sidebar_label: Workflow
---

This guide outlines the day-to-day tasks for contributors who maintain the OpenLM documentation site.

## Prerequisites

- Node.js 18 or later (see `package.json` engines field).
- npm (bundled with Node.js).
- Git for version control.

Optional tooling:

- `vale` for editorial linting (`npm install -g vale`).

## Installing Dependencies

```bash
npm install
```

Install once per environment or whenever dependencies change.

## Common Scripts

| Command | Purpose |
| --- | --- |
| `npm run start` | Launches the dev server at `http://localhost:3000/documentation/` using the default English locale. |
| `npm run start -- --locale ja` | Previews the Japanese locale. |
| `npm run build` | Produces a production build inside the `build/` folder. |
| `npm run serve` | Serves the build output locally for smoke testing. |
| `npm run write-translations -- --locale ja` | Extracts strings that require translation for the Japanese locale. |
| `npm run clear` | Clears cached Docusaurus data to resolve stale build artifacts. |
| `npm run vale` | Runs style checks on Markdown files under `docs/`. |

## Content Authoring Flow

1. Create or edit Markdown or MDX files in the relevant documentation set (`docs/cloud`, `docs/onpremise`, or `docs/legacy`).
2. Commit assets referenced by docs into `static/` or `src/static/` to ensure they are included in builds.
3. Preview changes locally with the dev server and address any console warnings or lint errors.
4. Submit a pull request that includes updated content and any generated translation diffs.

## Pull Request Expectations

- Include screenshots or screen recordings when UI changes are made to components under `src/`.
- Run `npm run build` prior to requesting review for significant site changes to catch broken imports or route issues.
- Ensure Markdown follows Vale rules or project specific style guides.

## Troubleshooting

- If the dev server fails to start, run `npm run clear` followed by another `npm run start`.
- When translations appear outdated, re-run `npm run write-translations -- --locale ja` and review changes under `i18n/ja`.
- For dependency issues, delete `node_modules` and reinstall with `npm install`.
