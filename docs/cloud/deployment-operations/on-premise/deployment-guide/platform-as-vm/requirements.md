---
title: Requirements
sidebar_position: 1
---

# Requirements

The Platform as VM deployment runs the entire OpenLM Platform on a single virtual machine or bare-metal server. All components – Kubernetes (K3s), databases, message broker, cache, and platform services – are installed automatically by the deployment script.

## System requirements

| Resource | Minimum (evaluation) | Recommended |
| --- | --- | --- |
| CPU | 4 cores | 8+ cores |
| RAM | 32 GB | 64 GB |
| Storage | 100 GB SSD | 500 GB+ SSD (IOPS dependent) |
| OS | AlmaLinux 10.1 | AlmaLinux 10.1 / RHEL 10.x |

:::warning
The minimum specification is suitable for evaluation, demo, and POC environments with low load. For production use with active Brokers and users, use the recommended specification.
:::

## Operating system

Officially supported:

- **AlmaLinux 10.1** (stable) – primary target, fully validated
- **RHEL 10.x** – enterprise alternative

Other RHEL-family distributions may work but are not officially supported.

## Network requirements

- The VM must have outbound internet access during installation. The deployment script pulls dependencies, container images, and Helm charts dynamically.
- Ports **443** and **80** must be accessible from machines where agents and users will connect.
- A DNS record pointing your domain to the VM's IP address.
- A valid TLS certificate and key for your domain.

## Capacity considerations

This deployment path is designed for small customer environments. All services share a single machine, so there is a practical cap on the load the system can handle compared to a multi-node cluster deployment.

If the environment outgrows the single-VM capacity, consider migrating to one of the multi-node deployment paths: [On-premise machines](../on-premise-machines/requirements), [AWS](../aws/requirements), or [Azure](../azure/requirements).
