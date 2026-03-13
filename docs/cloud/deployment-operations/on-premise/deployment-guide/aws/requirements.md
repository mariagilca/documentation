---
title: Infrastructure requirements
sidebar_label: Requirements
sidebar_position: 1
---

# Managed Amazon Elastic Kubernetes Service infrastructure requirements

This sizing baseline reflects a production deployment in `eu-central-1` and is subject to change as the platform evolves.

## Deployment summary

- Region: `eu-central-1`
- Availability Zones: `eu-central-1a`, `eu-central-1b`, `eu-central-1c`
- Kubernetes service: Amazon Elastic Kubernetes Service
- Kubernetes version: `1.34`
- Endpoint access: public and private, with public access restricted by allowed network ranges
- Control plane logs: API, audit, authenticator, controller manager, and scheduler

## Network topology

| Item | Value |
| --- | --- |
| Virtual private cloud (VPC) block | `10.0.0.0/22` |
| Public subnets | `10.0.3.0/26`, `10.0.3.64/26`, `10.0.3.128/26` |
| Private subnets | `10.0.0.0/24`, `10.0.1.0/24`, `10.0.2.0/24` |
| internet access | internet gateway |
| Outbound internet | 1 network address translation (NAT) Gateway with 1 elastic IP address |
| Amazon Simple Storage Service (Amazon S3) access | Gateway endpoint |
| IP protocol | IPv4 only |

## Node groups

| Node group | Purpose | Instance type | Desired / min / max | Label |
| --- | --- | --- | --- | --- |
| `openlm-infrastructure-workload` | Infrastructure services | `m6i.large` | `1 / 1 / 1` | `openlm.com/role=infrastructure-workload` |
| `openlm-main-workload` | Core application services | `m6i.xlarge` | `3 / 3 / 3` | `openlm.com/role=main-workload` |
| `openlm-reporting-workload` | Reporting services | `m6i.xlarge` | `3 / 3 / 3` | `openlm.com/role=reporting-workload` |

The source design uses 7 nodes in total: 1 `m6i.large` node and 6 `m6i.xlarge` nodes.

## Managed AWS services

### Amazon Relational Database Service for SQL Server

| Setting | Value |
| --- | --- |
| Engine | SQL Server Standard (`sqlserver-se`) |
| Availability | Multiple Availability Zones |
| Instance class | `db.m6i.xlarge` |
| Storage | `gp3`, 100 GB |
| Backup retention | 14 days |
| Authentication | SQL username and password |
| Monitoring | Enhanced Monitoring and Performance Insights with KMS encryption |

### Amazon Managed Streaming for Apache Kafka

| Setting | Value |
| --- | --- |
| Deployment type | Standard |
| Kafka version | `3.8.x` |
| Broker count | 3, 1 per Availability Zone |
| Instance type | `kafka.m5.large` |
| Storage | `gp3`, 250 GB per broker |
| Authentication | Client credentials stored in AWS Secrets Manager with KMS encryption |
| Logs | CloudWatch Logs with KMS encryption and 365-day retention |

### Amazon ElastiCache for Redis

| Setting | Value |
| --- | --- |
| Engine | Redis `7.x` |
| Cluster mode | Off |
| Nodes | 3, with 1 primary and 2 replicas |
| Instance type | `cache.m6g.large` |
| Encryption | In transit and at rest with KMS |
| Authentication | User and password |

## MongoDB requirement

- AWS DocumentDB is not supported in this deployment.
- Use MongoDB Atlas as a managed service, or run MongoDB in Kubernetes.

## Ballpark monthly cost

These estimates apply to `eu-central-1` as of February 4, 2026. Use AWS Pricing Calculator for final quotes.

| Resource | Estimated monthly cost |
| --- | --- |
| Amazon Elastic Kubernetes Service control plane | $70 to $90 |
| Node groups | $900 to $1,400 |
| Amazon Relational Database Service for SQL Server | $1,100 to $1,900 |
| Amazon Managed Streaming for Apache Kafka | $650 to $1,100 |
| Amazon ElastiCache for Redis | $250 to $450 |
| NAT Gateway and data transfer | $40 to $120 |
| KMS and CloudWatch Logs | Less than $50, depending on volume |

Total estimated range: about $3,050 to $5,100 per month.

## Assumptions

- This sizing assumes a moderately loaded production system.
- Development sizing is available in `dev.tfvars.example`.
- The Amazon Relational Database Service price includes SQL Server licensing, and that licensing is a major cost driver.
- Costs increase with throughput, storage growth, and workload demand.
