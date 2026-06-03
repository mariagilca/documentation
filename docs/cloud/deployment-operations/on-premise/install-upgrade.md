---
title: Upgrade
sidebar_position: 7
description: "For first-time installation, start with Deployment paths to select your setup path, and then continue with Platform installation."
---

For first-time installation, start with [Deployment paths](./deployment-paths) to select your setup path, and then continue with [Platform installation](./deployment-guide/platform-installation).

This page covers upgrading an existing deployment.

## Before upgrading

Complete these steps before starting the upgrade.

- Review the release notes for breaking changes, migration steps, or required database changes.
- Back up your databases before applying the upgrade.
- Confirm that all pods are healthy before starting (`kubectl get pods -n openlm`).

## Apply the upgrade

```bash
helm upgrade monohelm monohelm-<new-version>.tgz \
  -f mono-values.yaml \
  -n openlm
```

## After upgrading

Complete these steps after the upgrade finishes.

- Monitor pod startup: `kubectl get pods -n openlm -w`
- Verify core services are healthy and responding.
- Validate data flows (license events, reporting pipeline, directory sync).
- Check the platform UI for errors.

## Rollback

If the upgrade causes issues, Helm supports rollback:

```bash
helm rollback monohelm -n openlm
```
