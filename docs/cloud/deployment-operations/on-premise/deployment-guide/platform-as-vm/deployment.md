---
title: Deployment
sidebar_position: 2
description: "The Platform as VM deployment uses a single script that transforms a clean OS installation into a fully operational OpenLM Platform."
---
# Deployment

The Platform as VM deployment uses a single script that transforms a clean OS installation into a fully operational OpenLM Platform. The script handles all infrastructure provisioning, database creation, schema initialization, and service deployment automatically.

## What the script does

The deployment script automates the following sequence:

1. **Environment preparation** – performs a full system and package upgrade to ensure a secure, stable baseline
2. **Automation layer** – creates an isolated Python virtual environment and installs Ansible for consistent execution regardless of the system's default Python version
3. **Orchestrated deployment** – the Ansible playbook handles:
   - Installs and initializes K3s as a lightweight Kubernetes environment
   - Configures system certificates and generates environment configurations
   - Deploys Redis, Kafka, MongoDB, PostgreSQL (reporting), and MariaDB (operational data)
   - Creates databases, installs schemas, and configures Kafka topics
   - Installs the OpenLM Platform services into the local K3s cluster

## Deployment steps

### 1. Transfer the deployment package

{/* TODO: Add link to Platform as VM deployment package download */}

Copy the `src` folder to the target machine. Any directory is supported.

### 2. Configure

Edit the `configuration.yaml` file and set:

- Your domain name (FQDN)
- Paths to your TLS certificate and key

### 3. Set permissions

```bash
chmod +x entrypoint.sh
```

### 4. Run the installer

```bash
./entrypoint.sh
```

The script will run through the full deployment sequence. Once it completes, the platform is ready to use at the configured domain.

## Validation

After the script finishes, verify the deployment:

```bash
# Check that all pods are running
kubectl get pods -A

# Access the platform
curl -k https://<your-domain>
```

Your domain should now serve the OpenLM Platform homepage. All backend services, databases, and Kubernetes components are pre-configured and networked.

## Upgrades and maintenance

Since the deployment environment is fully controlled by the script, upgrades follow a predictable path. Updated deployment packages will include new versions of the script and Ansible playbooks that handle the upgrade process.
