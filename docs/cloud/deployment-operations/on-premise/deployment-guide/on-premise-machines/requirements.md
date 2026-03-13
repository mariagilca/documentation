---
title: Infrastructure requirements
sidebar_label: Requirements
sidebar_position: 1
---

# On-premise machines infrastructure requirements

This page covers the hardware and software requirements for deploying the OpenLM Platform on bare-metal servers or virtual machines that you manage.

## How the cluster is organized

The OpenLM Platform runs on Kubernetes and is made up of ~150 microservices, data infrastructure (databases, message broker, cache), and a reporting engine. To keep the system stable and reliable, workloads are split across dedicated node groups, each with a clear responsibility. This separation ensures that resource-heavy processes like reporting do not compete with the core application, and that critical data services remain isolated from application load.

The cluster uses four node roles. Each role runs on its own set of machines – roles are not combined.

### Control plane

The control plane node runs only the Kubernetes system processes (API server, etcd, scheduler, controllers) and the ingress controller. It is tainted so that no application workloads are scheduled on it. This is a hard requirement – keeping the control plane free from application load ensures cluster stability and reliable ingress routing.

### Main workload

The main workload nodes run the OpenLM application microservices, the API gateway, and telemetry. This is where the core platform logic runs – license management, identity, administration, and all user-facing services.

### Reporting workload

The reporting nodes are dedicated to the Spark ETL engine and reporting services. Spark processes usage data and outputs reporting tables into PostgreSQL or SQL Server, which customers rely on for dashboards and compliance reporting. Spark is resource-intensive, so it runs on its own nodes to avoid competing with the core application for CPU and memory.

### Infrastructure

The infrastructure node runs all data services: Kafka (message broker), MongoDB, MariaDB or PostgreSQL (operational databases), and Redis (cache). These are the most critical components in the system – if any of them go down, the entire platform stops functioning. Isolating them on a dedicated node with SSD storage protects them from application I/O and ensures consistent database performance.

## Node specifications

This is the minimum layout for a stable production deployment under small-to-medium load. The 8-node configuration is the baseline – Kubernetes requires a healthy number of nodes to maintain reliability, schedule workloads effectively, and handle node failures.

| Role | Count | vCPU | RAM | Storage | Notes |
| --- | --- | --- | --- | --- | --- |
| Control plane | 1 | 4 | 8 GB | 50 GB | Tainted, no application workloads |
| Main workload | 3 | 8 | 16 GB | 50 GB | Core platform microservices |
| Reporting workload | 3 | 8 | 16 GB | 50 GB | Spark ETL and reporting services |
| Infrastructure | 1 | 8 | 32 GB | 300 GB (SSD) | Databases, Kafka, Redis |

**Totals: 8 nodes, 68 vCPUs, 136 GB RAM, 950 GB storage.**

:::note
The infrastructure node requires SSD storage for database performance. All other nodes need only 50 GB for the OS and container images – no persistent data is stored on them.
:::

## Infrastructure services

The following services run on the infrastructure node:

| Service | Purpose | Approximate storage |
| --- | --- | --- |
| Kafka | Event streaming between microservices | 100 GB+ |
| MongoDB | Document storage | 20 GB+ |
| MariaDB or PostgreSQL | Operational and identity databases | 50 GB+ |
| PostgreSQL or SQL Server | Reporting database (Spark ETL output) | 50 GB+ |
| Redis | Caching and session storage | Minimal |

Total persistent storage: approximately 250–400 GB on the infrastructure node.

## Operating system

Use an RHEL-based distribution:

- **Preferred**: AlmaLinux 9
- **Alternatives**: RHEL 9 or Rocky Linux 9

## Kubernetes distribution

Any CNCF-conformant Kubernetes distribution is supported for on-premise deployments (e.g., MicroK8s, kubeadm, RKE2, K3s).

Minimum Kubernetes version: `1.28` or later.

### Storage class

A `local-path` or equivalent storage provisioner is needed for persistent volumes, isolated to the infrastructure node.

## Network requirements

For detailed port tables, firewall rules, and network topology, see the [Networking](../../networking#on-premise-machines) page.

Summary:

- All nodes must reside on the same L2 network or have full inter-node connectivity.
- Ports 80 and 443 open on the control plane node for ingress.
- Inter-node ports: 6443 (API), 8472 (VXLAN), 10250 (kubelet), 51820 (WireGuard).
- DNS A record pointing your domain to the control plane node IP.
- Outbound access to `public.ecr.aws/r3q3q2f4` for container images.

## Sizing notes

- This is the baseline for a stable production system under small-to-medium load.
- Increase worker node count for higher Broker counts or user volumes.
- Increase infrastructure node storage for longer data retention periods.
- Monitor resource utilization after deployment and scale accordingly.
