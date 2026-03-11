---
title: System requirements
sidebar_position: 1
---

# System requirements

Use this section when you deploy OpenLM on infrastructure that you manage.

## Core platform baseline

These requirements apply across customer-managed Kubernetes deployments.

| Resource | Baseline |
| --- | --- |
| CPU | 16 vCPUs across worker nodes |
| Memory | 70 GB RAM across worker nodes |
| Storage | Solid-state persistent volumes sized for retention needs |
| Kubernetes | A supported Kubernetes distribution with ingress and TLS |
| Connectivity | Network access from Brokers, the Directory Synchronization Agent (DSA), license managers, and directory services |

## Shared requirements

- Use persistent storage classes for stateful workloads.
- Use TLS termination at the ingress layer.
- Validate sizing against expected Broker counts, usage volume, report volume, and retention.
- Confirm that all required OpenLM services can reach the cluster endpoints.

## Provider-specific references

- [Azure cloud infrastructure requirements](./system-requirements/azure-cloud)
- [Managed Amazon Elastic Kubernetes Service infrastructure requirements](./system-requirements/managed-eks)

Use the provider-specific pages for network sizing, node pool layouts, and managed service baselines.
