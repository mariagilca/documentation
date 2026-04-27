---
id: project-overview
title: Project Overview
sidebar_label: Overview
---

This repository hosts the source for the OpenLM documentation site that is built with Docusaurus. The project consolidates current OpenLM Platform (cloud) and legacy product documentation together with localization assets and static resources that power https://www.openlm.com documentation properties. On-premise deployment material lives inside the cloud set under `docs/cloud/deployment-operations/on-premise/`.

## Objectives

- Provide a single documentation codebase for OpenLM products.
- Offer fast, local preview of documentation changes using the Docusaurus development server.
- Support multilingual content with a focus on Japanese localization.
- Deliver a production-ready static site that can be deployed to the OpenLM hosting environment.

## Repository Highlights

- `docs/` contains the authored Markdown and MDX files grouped by documentation set.
- `i18n/` stores locale specific copies of docs that are generated and translated.
- `src/` hosts React components, theme overrides, and static data consumed by the site.
- `static/` contains assets that are copied verbatim into the generated site output.
- `docusaurus.config.js` centralizes site configuration including navigation, locales, theming, and plugins.

## Audience

This documentation folder targets maintainers, writers, and developers who contribute to the OpenLM documentation ecosystem. It complements the root `README.md` by providing deeper guidance on architecture, workflows, and localization conventions.
