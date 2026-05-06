---
title: Deployment paths
sidebar_position: 5
description: "Now that we covered what the platform looks like (Architecture), what it needs (System requirements), and how traffic flows (Networking), it is time to choose…"
---
# Deployment paths

Now that we covered what the platform looks like ([Architecture](./architecture-components)), what it needs ([System requirements](./system-requirements)), and how traffic flows ([Networking](./networking)), it is time to choose a deployment model.

There are four deployment paths. Each determines where Kubernetes runs, how infrastructure services are provisioned, and what you are responsible for managing.

## Overview

| Path | Kubernetes | Infrastructure services | Best suited for |
| --- | --- | --- | --- |
| **Platform as VM** | K3s (automated) | All automated on a single VM | Small customers, demos, POC, and evaluation environments |
| **On-premise machines** | Any CNCF-conformant distribution on your own servers | All self-hosted in-cluster | Organizations with existing data centers and Kubernetes expertise |
| **Private cloud (AWS)** | Amazon EKS (managed) | Mostly AWS managed services | Organizations on AWS, or those without existing data center infrastructure |
| **Private cloud (Azure)** | Azure AKS (managed) | Mix of Azure managed and in-cluster | Organizations on Azure |

:::tip[Recommendation]
If your organization does not have an existing data center or dedicated infrastructure team, deploy on a cloud provider. Cloud-managed Kubernetes and data services significantly reduce operational overhead.

**AWS is currently the best-supported cloud path** – it has the most managed service coverage (RDS, MSK, ElastiCache), a Terraform reference configuration for infrastructure-as-code provisioning, and the most deployment experience within our team.
:::

## Platform as VM

The Platform as VM path is designed for small customers, demos, and evaluation environments. A single deployment script transforms a clean AlmaLinux or RHEL installation into a fully operational OpenLM Platform – no Kubernetes or infrastructure expertise required.

The script automates everything: K3s installation, database provisioning (MariaDB, PostgreSQL, MongoDB), Kafka, Redis, schema initialization, and platform service deployment. The result is a ready-to-use system on a single machine.

**What the script manages for you**: Everything – Kubernetes, all databases, Kafka, Redis, MongoDB, schema creation, Kafka topics, and platform services.

**What you provide**: A VM or bare-metal server with AlmaLinux 10.1 or RHEL 10.x, a domain name, and a TLS certificate.

| Resource | Minimum (evaluation) | Recommended |
| --- | --- | --- |
| CPU | 4 cores | 8+ cores |
| RAM | 32 GB | 64 GB |
| Storage | 100 GB SSD | 500 GB+ SSD |

:::note
This path trades scalability for simplicity. All services share a single machine, so there is a practical cap on the load the system can handle. If the environment outgrows the single-VM capacity, consider migrating to one of the multi-node deployment paths described in the following sections.
:::

For detailed requirements, see [Platform as VM requirements](./deployment-guide/platform-as-vm/requirements).
For deployment steps, see [Platform as VM deployment](./deployment-guide/platform-as-vm/deployment).

## On-premise machines

The on-premise path runs everything on bare-metal servers or virtual machines that you manage. Kubernetes and all infrastructure services are installed on your hardware.

**What you manage**: Everything – servers, OS, Kubernetes, databases, Kafka, Redis, MongoDB, networking, certificates.

This path requires a team with Kubernetes and Linux administration experience. All infrastructure services run inside the cluster on a dedicated infrastructure node.

| Service | Option |
| --- | --- |
| SQL database | MSSQL, or MariaDB/MySQL + PostgreSQL (in-cluster) |
| Kafka | In-cluster |
| Redis | In-cluster |
| MongoDB | In-cluster |

For detailed hardware requirements, see [On-premise machines requirements](./deployment-guide/on-premise-machines/requirements).
For deployment steps, see [On-premise machines environment setup](./deployment-guide/on-premise-machines/environment-setup).

## Private cloud (AWS)

The AWS path uses Amazon EKS for Kubernetes and AWS managed services for most infrastructure components. This gives you the least operational burden while keeping everything within your own AWS account.

**What AWS manages for you**: Kubernetes control plane, SQL Server (RDS), Kafka (MSK), Redis (ElastiCache).

**What you still manage**: AWS account, networking/VPC, EKS node groups, MongoDB (Atlas or in-cluster).

| Service | Option | Status |
| --- | --- | --- |
| SQL database | Amazon RDS for SQL Server | Supported |
| Kafka | Amazon MSK | Supported |
| Redis | Amazon ElastiCache for Redis | Supported |
| MongoDB | MongoDB Atlas or in-cluster | Supported (DocumentDB support coming soon) |

A **Terraform reference configuration** is available to provision the full AWS environment (VPC, EKS, RDS, MSK, ElastiCache, KMS, IAM) as infrastructure-as-code.

For detailed sizing and costs, see [AWS infrastructure requirements](./deployment-guide/aws/requirements).
For deployment steps, see [AWS environment setup](./deployment-guide/aws/environment-setup).

## Private cloud (Azure)

The Azure path uses AKS for Kubernetes with managed services for SQL and cache. Kafka and MongoDB run inside the cluster or through third-party managed services.

**What Azure manages for you**: Kubernetes control plane, SQL database (SQL Managed Instance), Redis (Azure Cache).

**What you still manage**: Azure subscription, networking/VNet, AKS node pools, Kafka, MongoDB.

| Service | Option | Status |
| --- | --- | --- |
| SQL database | Azure SQL Managed Instance | Supported |
| Redis | Azure Cache for Redis | Supported |
| Kafka | Confluent Cloud or in-cluster | Event Hubs with Kafka layer not supported (no confirmed timeline) |
| MongoDB | MongoDB Atlas or in-cluster | Cosmos DB support coming soon |

Kafka and MongoDB can be provisioned through marketplace offerings (Confluent Cloud, MongoDB Atlas) billed through your Azure subscription, or deployed inside the Kubernetes cluster using the included Helm charts.

For detailed sizing, see [Azure infrastructure requirements](./deployment-guide/azure/requirements).
For deployment steps, see [Azure environment setup](./deployment-guide/azure/environment-setup).

## SQL database options

Regardless of deployment path, there are two ways to configure the SQL layer:

**Option A – Single MSSQL instance**: Use one SQL Server for operational, identity, and reporting databases. Simplest setup.

**Option B – MariaDB/MySQL + PostgreSQL**: Use MariaDB or MySQL for operational and identity databases, and PostgreSQL for reporting. This split exists because:

- Operational services support MariaDB, MySQL, or MSSQL
- The reporting engine (Spark ETL) supports only MSSQL or PostgreSQL

Choose based on your existing database expertise and licensing.
