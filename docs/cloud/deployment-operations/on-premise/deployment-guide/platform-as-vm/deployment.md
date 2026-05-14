---
title: Deployment
sidebar_position: 2
description: "Install the OpenLM Platform on a single virtual machine with one configuration file and one script."
---

The Platform as VM deployment uses a single script that transforms a clean RHEL-family operating system into a fully operational OpenLM Platform. The script handles K3s installation, database provisioning, schema initialization, Kafka topic creation, and platform service deployment automatically.

Make sure you have completed everything on the [Requirements](./requirements) page before starting.

## What the script does

The installer runs an Ansible playbook that:

1. Verifies prerequisites (operating system, RAM, CPU).
2. Installs K3s as a lightweight Kubernetes environment, with Traefik as the ingress controller.
3. Creates the cluster namespaces and stores your TLS certificate as a Kubernetes secret.
4. Deploys the infrastructure services: Redis, Kafka, MongoDB, and the operational and reporting databases.
5. Initializes the operational and reporting database schemas.
6. Creates the Kafka topics required by the platform.
7. Deploys the OpenLM API gateway and the OpenLM Platform services.

Total install time is **20 to 40 minutes**, dominated by the initial container image pulls.

## Deployment steps

### 1. Transfer the deployment package

{/* TODO: Add link to Platform as VM deployment package download */}

Copy the deployment package to the target VM:

```bash
scp -r platform-as-vm/ <user>@<vm-ip>:~/
```

### 2. Place the TLS certificate

SSH into the VM and put your certificate and key at the paths you will reference in `config.yaml`. The default locations are:

```bash
sudo mkdir -p /etc/openlm/certs
sudo cp tls.crt /etc/openlm/certs/tls.crt
sudo cp tls.key /etc/openlm/certs/tls.key
sudo chmod 600 /etc/openlm/certs/tls.key
```

You can store the files anywhere – just update the corresponding paths in `config.yaml`.

### 3. Edit `config.yaml`

Open `~/platform-as-vm/config.yaml` and set the three required fields:

```yaml
openlm_system_domain: "openlm.yourcompany.com"        # Your OpenLM FQDN
tls_cert_path:        "/etc/openlm/certs/tls.crt"    # Path to the TLS certificate
tls_key_path:         "/etc/openlm/certs/tls.key"    # Path to the TLS private key
```

Every other field has a sensible default for a single-VM deployment. See the [Configuration reference](./configuration) for advanced patterns such as external SQL Server, external Kafka, or air-gapped installations.

### 4. Edit `passwords.yaml`

Open `~/platform-as-vm/passwords.yaml` and set strong passwords for the three bundled databases:

```yaml
postgres_password:     "<a strong password>"
mariadb_root_password: "<a different strong password>"
mongodb_root_password: "<another strong password>"
```

:::warning
These passwords are baked in when the databases are initialized. Changing them in `passwords.yaml` after the first install does **not** update the running databases. Treat them as one-time-set values and rotate them later using each database's native commands.
:::

### 5. Run the installer

From inside the deployment directory:

```bash
cd ~/platform-as-vm
chmod +x entrypoint.sh
./entrypoint.sh
```

The script will prompt for your sudo password once. From there it runs end-to-end without further input.

If the installer fails partway through, fix the cause and re-run `./entrypoint.sh` – the playbook is idempotent and resumes from where it left off.

## Verify the deployment

### Check pods

```bash
kubectl get pods -A
```

You should see:

- `kube-system` – all pods Running (CoreDNS, Traefik, metrics-server, local-path-provisioner).
- `openlm-infrastructure` – all pods Running (Redis, Kafka, MongoDB, MariaDB, PostgreSQL).
- `openlm` – approximately 100 pods, most Running. A handful may stay in `Init` or `ContainerCreating` for a few minutes after the installer exits – this is normal while services pull images and wait for their dependencies.

If pods stay in `CrashLoopBackOff` after 15 minutes, see [Troubleshooting](./troubleshooting).

### Check Helm releases

```bash
helm list -A
```

Each release should show `STATUS: deployed`.

### Open the platform

Open `https://<your-domain>/` in a browser. The OpenLM login page should appear.

If you see a browser TLS warning, it means your certificate is self-signed or from a CA the browser does not trust – that is expected for those cases.

### Wire up Power BI (optional)

To connect Power BI or another BI tool to the reporting database:

| Setting | Value |
| --- | --- |
| Server | `<vm-ip-or-fqdn>:30432` |
| Database | `openlm_reporting_db` |
| Username | `postgres` |
| Password | The `postgres_password` you set in `passwords.yaml` |

In Power BI Desktop, choose **Get Data** → **PostgreSQL database**, enter the server and database, then provide the credentials.

## What's next

- Operate the platform – [Operations](./operations) covers health checks, logs, backups, and upgrades.
- Tune the configuration – [Configuration reference](./configuration) covers external SQL Server, external Kafka, and other patterns.
- Hit an issue – [Troubleshooting](./troubleshooting) lists the most common problems and how to fix them.
