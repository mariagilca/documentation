---
id: project-architecture
title: Architecture
sidebar_label: Architecture
---

The site is built with the Docusaurus Classic preset and is organized around three principal documentation sets. Custom React components and data loaders extend the base functionality to support OpenLM specific needs.

## Documentation Sets

- `docs/cloud` contains Annapurna cloud content.
- `docs/onpremise` holds Annapurna on-premise documentation.
- `docs/legacy` preserves historical documentation that remains relevant to some customers.

Each folder follows the Docusaurus docs file naming conventions and is referenced through corresponding sidebars defined in `sidebars-default.js`.

## Configuration

`docusaurus.config.js` defines global site metadata, the locales that are built, Algolia search integration, and plugin activation. Important configuration areas include:

- `presets` for the Classic preset with custom docs and blog settings.
- `themeConfig` for navigation, prism syntax highlighting, and Algolia search keys.
- `i18n` for supported locales (`en` and `ja`) and their default settings.

## Source Customizations

- `src/components` holds reusable React components embedded within docs or pages.
- `src/theme` overrides default Docusaurus components to align the user interface with OpenLM brand guidelines.
- `src/static` and `static` store JSON and binary assets that the documentation references. JSON files such as `static/release-notes/broker.json` power dynamic content that is rendered in MDX pages or custom React widgets.

## Build Pipeline

1. Authors edit Markdown or MDX files, optionally leveraging React components from `src/components`.
2. Translators run `npm run write-translations -- --locale ja` to sync locale files before adding Japanese content under `i18n/ja`.
3. Contributors preview updates via `npm run start` (`--locale ja` for Japanese) which executes the Docusaurus development server.
4. Production builds produce optimized static assets using `npm run build` and can be served locally with `npm run serve` for validation before deployment.

## Quality Tooling

The repository integrates `vale` through the `npm run vale` script, enabling style linting for Markdown content. Additional tooling such as Prettier or ESLint can be added if content or React components require formatting or linting enforcement.
