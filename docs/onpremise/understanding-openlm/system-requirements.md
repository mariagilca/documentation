---
title: On-premise deployment requirements
sidebar_position: 3
description: System requirements for deploying OpenLM Annapurna platform on-premises, including OS, Kubernetes setup, infrastructure, and hardware specs.
---

# On-premise deployment system requirements

## Operating system

- Ubuntu 20.04 LTS or later  
- RHEL 8 or later  



## Kubernetes setup

- Use MicroK8s or any other supported Kubernetes distribution  
- Install an ingress controller  
- Install the Kubernetes dashboard  
- Set up persistent storage for pod-level data  



## Infrastructure

Infrastructure includes the components used to store data, manage communication between microservices, and support caching.  
You can deploy these components inside Kubernetes or use managed services from cloud providers such as Azure or AWS.

- **MongoDB** – Non-relational database for services (deployed in Kubernetes or as a managed service)  
- **Redis** – In-memory cache (deployed in Kubernetes or as a managed service)  
- **SQL Server 2019 or later** – Relational database for operational and reporting data (deployed separately or as a managed service)  
- **Kafka** – Messaging system for communication between services  



## TLS certificates

- A wildcard certificate (domain-level) is required for UI access  
- TLS certificates must be stored as Kubernetes secrets  



## Hardware requirements

### Single-ode cluster

- **CPU**: At least 8 cores  
- **RAM**: At least 64 GB  
- **Disk**: 200 GB SSD (recommended)  

### Multi-node cluster (per node)

- **CPU**: At least 8 cores per node  
- **RAM**: At least 32 GB per node (total across all schedulable nodes should be at least 72 GB)  
- **Disk**: 200 GB SSD (recommended)  

> **Note**: Allocate additional RAM to handle peak loads and system overhead.



## Internet connectivity

- A working internet connection with no firewall or access restrictions  
