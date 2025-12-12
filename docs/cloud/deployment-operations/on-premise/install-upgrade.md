---
title: Install & upgrade
sidebar_position: 3
---

# Install & upgrade

## Getting started

- Decide where to deploy the cluster (On-Premise hardware or your cloud K8s). Ensure hardware and K8s expertise are available.

## Install flow

- Configure Helm values (ingress, TLS certificates, storage classes, secrets).
- Deploy the chart and verify core services are healthy.
- Connect agents (Broker, Workstation Agent, DSA) to the On-Premise endpoints.

## Deployment options

- **Small/self-contained VM**: For low-usage setups, use the all-in-one VM image/script with Kubernetes and OpenLM pre-baked.
- **Cloud-managed K8s (AWS/Azure)**: Follow provider-specific requirements (networking, storage classes, IAM/identity) before running Helm.

## Upgrade

- Apply chart upgrades with a documented checklist tied to release notes.
- Validate services and data flows post-upgrade; keep a rollback plan.

## TLS and ingress

- Use trusted certificates for public endpoints and store them as Kubernetes secrets.
- Ensure ingress controllers are configured before deploying the chart.
