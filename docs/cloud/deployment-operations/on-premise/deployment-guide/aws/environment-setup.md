---
title: Environment setup
sidebar_position: 2
description: "This page covers provisioning the AWS infrastructure for the OpenLM Platform using Amazon EKS and managed AWS services."
---
# Environment setup

This page covers provisioning the AWS infrastructure for the OpenLM Platform using Amazon EKS and managed AWS services.

For detailed sizing and service specifications, see [Requirements](./requirements).

## Infrastructure components

The AWS deployment uses the following managed services:

| Component | AWS service | Purpose |
| --- | --- | --- |
| Kubernetes | Amazon EKS | Container orchestration |
| SQL database | Amazon RDS for SQL Server | Identity, operational, and reporting data |
| Message broker | Amazon MSK | Event streaming (Kafka) |
| Cache | Amazon ElastiCache for Redis | Caching and session storage |
| MongoDB | MongoDB Atlas or self-hosted | Document storage (AWS DocumentDB is not supported) |

## Terraform reference

{/* TODO: Add link to Terraform reference configuration download */}

A Terraform configuration is available as a reference for provisioning the complete AWS infrastructure. It provisions:

- **Networking**: VPC with public and private subnets across 3 availability zones, NAT gateway, S3 gateway endpoint
- **EKS cluster**: Managed node groups with node labels, OIDC provider, EBS CSI driver, control plane logging
- **RDS SQL Server**: Multi-AZ, gp3 storage, enhanced monitoring, Performance Insights
- **MSK (Kafka)**: 3 brokers with SASL/SCRAM authentication, TLS encryption, CloudWatch logging
- **ElastiCache (Redis)**: 3-node replication group with encryption and authentication
- **Security**: KMS customer-managed keys for secrets, logs, and data at rest

:::note
The Terraform configuration is a reference starting point. Review and adapt it to your organization's security policies, naming conventions, and network topology before applying.
:::

### Key Terraform variables

| Variable | Default | Description |
| --- | --- | --- |
| `eks_version` | `1.34` | Kubernetes version |
| `eks_public_access_cidrs` | `[]` | Allowed CIDRs for EKS API public access |
| `db_engine` | `sqlserver-se` | RDS engine (SQL Server Standard) |
| `db_instance_class` | `db.m6i.xlarge` | RDS instance size |
| `main_instance_type` | `m6i.xlarge` | Main workload node instance type |
| `reporting_instance_type` | `m6i.xlarge` | Reporting node instance type |
| `infra_instance_type` | `m6i.large` | Infrastructure node instance type |
| `msk_kafka_version` | `3.8.x` | Kafka version |
| `msk_instance_type` | `kafka.m5.large` | MSK broker instance type |
| `cache_node_type` | `cache.m6g.large` | ElastiCache node type |

### Applying the Terraform configuration

```bash
# Initialize Terraform
terraform init

# Review the plan
terraform plan -var-file="production.tfvars"

# Apply
terraform apply -var-file="production.tfvars"
```

After applying, Terraform outputs the connection details needed for the Helm chart configuration:

- EKS cluster endpoint
- RDS SQL Server endpoint
- MSK bootstrap brokers (SASL/SCRAM)
- Redis primary and reader endpoints

A `managed-connections.txt` file is generated with all connection strings.

## Manual provisioning

If you prefer not to use Terraform, provision the following resources manually. Refer to the [Managed EKS infrastructure requirements](./requirements) for detailed specifications.

### Network

Provision the following network resources.

- VPC with at least a `/22` CIDR block
- 3 private subnets (one per availability zone) for workloads
- 3 public subnets for load balancers
- NAT gateway for outbound internet access from private subnets

### EKS cluster

Configure the EKS cluster with the following settings.

- Activate public and private API endpoint access
- Restrict public access to your organization's CIDRs
- Activate control plane logging (API, audit, authenticator, controller manager, scheduler)
- Install EBS CSI driver for persistent volumes

### Node groups

Create three managed node groups with labels:

| Node group | Instance type | Count | Label |
| --- | --- | --- | --- |
| Infrastructure | `m6i.large` | 1 | `openlm.com/role=infrastructure-workload` |
| Main workload | `m6i.xlarge` | 3 | `openlm.com/role=main-workload` |
| Reporting | `m6i.xlarge` | 3 | `openlm.com/role=reporting-workload` |

### Managed services

Provision RDS, MSK, and ElastiCache as described in the [requirements page](./requirements). Ensure security groups allow traffic from the EKS cluster security group.

## MongoDB

AWS DocumentDB is not supported. Use one of the following alternatives.

- **MongoDB Atlas** (recommended) – managed service with direct VPC peering
- **Self-hosted in Kubernetes** – deploy MongoDB into the cluster using a Helm chart

## Next steps

Once infrastructure is provisioned:

1. Configure `kubectl` to connect to the EKS cluster:
   ```bash
   aws eks update-kubeconfig --name openlm-eks --region eu-central-1
   ```
2. Complete the [Prerequisites](./prerequisites) checklist
3. Proceed to [Platform installation](../platform-installation)
