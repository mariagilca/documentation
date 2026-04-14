---
title: Prerequisites
sidebar_position: 3
---

# Prerequisites

Before deploying the OpenLM Platform, verify that the AWS infrastructure provisioned in [Environment setup](./environment-setup) meets the following requirements.

## Infrastructure checklist

Confirm the following managed services are provisioned and accessible from the EKS cluster:

| Service | Status to verify |
| --- | --- |
| **Amazon RDS (SQL Server)** | Instance available, endpoint and credentials ready. Security group allows traffic from the EKS cluster. |
| **MongoDB** | Atlas cluster or in-cluster deployment reachable, connection string available. |
| **Amazon MSK (Kafka)** | Cluster active, bootstrap brokers endpoint available. All required topics must be created before deployment. |
| **Amazon ElastiCache (Redis)** | Cluster available, primary endpoint and credentials ready. |
| **EBS CSI driver** | Installed on the EKS cluster. Verify with `kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver`. |

## Database preparation

### Create databases

Create the following databases on RDS SQL Server before deployment:

1. **Identity database** – stores user and authentication data
2. **Operational database** – stores license server and usage data. The database name in the server must end with `_none` (for example, `openlm_operational_none`). In the Helm values we configure the prefix without `_none`.
3. **DSS database** – stores Directory Synchronization Service data
4. **Reporting database** – stores reporting data

### Prepare reporting database

After creating the reporting database, apply the provided SQL scripts in this order:

1. Table creation script
2. View creation script

These scripts are included in the deployment package.

### Prepare Kafka topics

Create all required Kafka topics before deployment. A topic creation script is included in the deployment package. Topics can also be created through the AWS console or CLI against the MSK cluster.

## Configure kubectl

If not already done:

```bash
aws eks update-kubeconfig --name openlm-eks --region eu-central-1
```

## Kubernetes namespace

Create the namespace for the OpenLM platform:

```bash
kubectl create namespace openlm
```

## TLS certificate

Prepare your TLS certificate and create a Kubernetes secret:

```bash
kubectl create secret tls openlm-lb-cert \
  --key your-domain.key \
  --cert your-domain.crt \
  -n openlm
```

## Custom CA certificate

If your organization uses internal certificate authorities, create a ConfigMap with the full certificate chain:

```bash
kubectl apply -f custom-ca-configmap.yaml -n openlm
```

The ConfigMap should contain the full chain of certificates used by your organization. If you are unsure, use the same certificate from the TLS secret described earlier.

## Validation

Run these checks before proceeding to [Platform installation](../platform-installation):

```bash
# Verify namespace exists
kubectl get namespace openlm

# Verify TLS secret
kubectl get secret openlm-lb-cert -n openlm

# Verify storage class (EBS CSI)
kubectl get storageclass

# Verify nodes are ready
kubectl get nodes

# Verify connectivity to RDS
kubectl run test-sql --rm -it --image=mcr.microsoft.com/mssql-tools -- /bin/bash

# Verify MSK bootstrap brokers are reachable
kubectl run test-kafka --rm -it --image=bitnami/kafka -- kafka-broker-api-versions.sh --bootstrap-server <msk-endpoint>:9096
```
