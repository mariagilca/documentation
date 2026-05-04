---
title: Environment setup
sidebar_position: 2
description: "This page covers provisioning the Azure infrastructure for the OpenLM Platform using Azure Kubernetes Service (AKS) and managed Azure services."
---
# Environment setup

This page covers provisioning the Azure infrastructure for the OpenLM Platform using Azure Kubernetes Service (AKS) and managed Azure services.

For detailed sizing and service specifications, see [Requirements](./requirements).

## Infrastructure components

The Azure deployment uses the following managed services:

| Component | Azure service | Purpose |
| --- | --- | --- |
| Kubernetes | Azure Kubernetes Service (AKS) | Container orchestration |
| SQL database | Azure SQL Managed Instance | Identity, operational, and reporting data |
| Cache | Azure Cache for Redis | Caching and session storage |
| Persistent storage | Azure Managed Disks | Kafka, MongoDB, and other stateful services (~400 GB) |

:::note
Kafka and MongoDB run inside the Kubernetes cluster using Helm charts and Azure Managed Disks for persistence, rather than as Azure managed services.
:::

## Network provisioning

Use Azure CNI networking mode for AKS.

| Item | Requirement |
| --- | --- |
| Virtual network (VNet) | Minimum `/22` CIDR block (for example, `10.0.0.0/22`) |
| IP capacity | 1,024 addresses – approximately 400 needed for pods, nodes, and growth |
| Planned pods | ~143 |
| Planned nodes | 6–7 |

## AKS cluster

### Node pools

Create three node pools:

| Node pool | Purpose | VM size | Count | Max pods per node |
| --- | --- | --- | --- | --- |
| System | Kubernetes system pods | 4 vCPU, 16 GB RAM (for example, `Standard_D4ds_v4`) | 2 | 30 |
| Main | Core application workloads | 4 vCPU, 16 GB RAM | 2 | 70 |
| Reporting | Reporting workloads | 4 vCPU, 16 GB RAM | 3 | 30 |

Use Kubernetes version `1.32.9` or another AKS-supported version matching your release policy.

### Node labels

Apply labels to nodes for workload scheduling:

```bash
kubectl label node <system-node>     openlm.com/role=system
kubectl label node <main-node-1>     openlm.com/role=main-workload
kubectl label node <main-node-2>     openlm.com/role=main-workload
kubectl label node <report-node-1>   openlm.com/role=reporting-workload
kubectl label node <report-node-2>   openlm.com/role=reporting-workload
kubectl label node <report-node-3>   openlm.com/role=reporting-workload
```

## Managed services

### Azure SQL Managed Instance

| Setting | Requirement |
| --- | --- |
| Tier | General Purpose |
| Compute | 4 vCores minimum |
| Storage | 256 GB minimum |
| Scaling | Increase based on user volume, reporting load, and data retention |

### Azure Cache for Redis

| Setting | Requirement |
| --- | --- |
| Tier | C2 |
| Cache size | 2.5 GB |

### Azure Managed Disks

Managed disks are provisioned automatically by AKS when storage classes are configured. Approximately 400 GB total is needed for Kafka, MongoDB, and other stateful services.

## MongoDB

Deploy MongoDB inside the Kubernetes cluster using the Helm chart provided in the deployment package. Azure Managed Disks provide the underlying persistent storage.

## Next steps

Once infrastructure is provisioned:

1. Configure `kubectl` to connect to the AKS cluster:
   ```bash
   az aks get-credentials --resource-group <resource-group> --name <cluster-name>
   ```
2. Complete the [Prerequisites](./prerequisites) checklist
3. Proceed to [Platform installation](../platform-installation)
