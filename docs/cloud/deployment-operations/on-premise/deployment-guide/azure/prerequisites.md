---
title: Prerequisites
sidebar_position: 3
description: "Before deploying the OpenLM Platform, verify that the Azure infrastructure provisioned in Environment setup meets the following requirements."
---

Before deploying the OpenLM Platform, verify that the Azure infrastructure provisioned in [Environment setup](./environment-setup) meets the following requirements.

## Infrastructure checklist

Confirm the following services are provisioned and accessible from the AKS cluster:

| Service | Status to verify |
| --- | --- |
| **Azure SQL Managed Instance** | Instance available, endpoint and credentials ready. Accessible from the AKS VNet (private endpoint or VNet integration). |
| **MongoDB** | In-cluster deployment running, connection string available. |
| **Kafka** | In-cluster deployment or Confluent Cloud running, bootstrap endpoint and credentials available. All required topics must be created before deployment. |
| **Azure Cache for Redis** | Instance available, connection string and credentials ready. |
| **Azure Managed Disks** | Storage classes configured in AKS for persistent volumes. Verify with `kubectl get storageclass`. |

## Database preparation

### Create databases

Create the following databases on Azure SQL Managed Instance before deployment:

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

Create all required Kafka topics before deployment. A topic creation script is included in the deployment package. If using Confluent Cloud, create the topics through the Confluent console or CLI.

## Configure kubectl

If not already done:

```bash
az aks get-credentials --resource-group <resource-group> --name <cluster-name>
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

# Verify storage class (Azure Managed Disks)
kubectl get storageclass

# Verify nodes are ready
kubectl get nodes

# Verify infrastructure namespace (if Kafka/MongoDB are in-cluster)
kubectl get pods -n openlm-infrastructure
```
