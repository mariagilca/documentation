---
title: Azure cloud infrastructure requirements
sidebar_label: Azure cloud
sidebar_position: 1
description: "This reference captures the Azure sizing baseline from document version 1.1.1 dated November 26, 2025."
---
# Azure cloud infrastructure requirements

This reference captures the Azure sizing baseline from document version 1.1.1 dated November 26, 2025. Adjust node counts and service sizes for larger environments.

## Networking

Use Azure Container Networking Interface (CNI) mode for Azure Kubernetes Service (AKS).

| Item | Baseline |
| --- | --- |
| Network block | `/22`, such as `10.0.0.0/22` |
| Address capacity | 1,024 IP addresses |
| Planned running pods | About 143 |
| Planned nodes | 6 |
| Reserved addresses | About 400 IP addresses for pods, nodes, and growth |

### Capacity example

- The source design allows about 29 pod IP addresses per node.
- Six nodes provide about 174 pod IP addresses.
- 143 pods and 6 nodes consume about 149 IP addresses.
- A `/22` block leaves room for growth.

## Azure Kubernetes Service

The following table describes the node pools and their sizing.

| Node pool | Purpose | Node count | Max pods per node | Size |
| --- | --- | --- | --- | --- |
| System node pool | Platform system pods | 2 | 30 | 4 vCPU, 16 GB RAM, such as `Standard_D4ds_v4` or a comparable v5 or v6 size |
| Main node pool | Core application workloads | 2 | 70 | 4 vCPU, 16 GB RAM |
| Reporting node pool | Reporting workloads | 3 | 30 | 4 vCPU, 16 GB RAM |

Use Kubernetes version `1.32.9` or another AKS-supported version that matches your release policy.

The source design uses 7 virtual machines across the 3 node pools. Nodes with 16 GB of RAM leave headroom for platform pods because baseline node overhead is about 1 GB per node.

## Managed services

The following table lists the managed Azure services and their baseline configurations.

| Service | Purpose | Baseline |
| --- | --- | --- |
| Azure SQL Managed Instance | Relational database for identity, server, and reporting data | General Purpose, 4 vCores, 256 GB storage minimum |
| Azure Cache for Redis | Cache and session storage | `C2` tier with 2.5 GB cache |
| Azure Managed Disks | Persistent volumes for Kafka, MongoDB, and other stateful services | About 400 GB total |

AKS provisions managed disks automatically when the cluster uses the required storage classes.

## Sizing notes

Review the following sizing guidelines.

- Validate pod counts, data retention, and report volume before deployment.
- Increase database and cache sizes when user volume, reporting load, or retention increases.
