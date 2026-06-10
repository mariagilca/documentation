---
title: Operations
sidebar_position: 4
description: "Day-2 operations: health checks, logs, scaling, backups, upgrades, and uninstall for a Platform as VM deployment."
---

This page covers running the platform after install. For installer-time issues see [Troubleshooting](./troubleshooting).

## Accessing the cluster

The installer writes a kubeconfig to your home directory and exports `KUBECONFIG` in `~/.bashrc`. Open a new shell on the VM and `kubectl` will work:

```bash
kubectl get nodes
kubectl get pods -A
```

To reach the cluster from your laptop, copy the kubeconfig off the VM and update the server URL:

```bash
scp <user>@<vm-ip>:~/.kube/config ./openlm-vm.kubeconfig
sed -i '' 's|127.0.0.1|<vm-public-ip>|' ./openlm-vm.kubeconfig
export KUBECONFIG=$PWD/openlm-vm.kubeconfig
kubectl get nodes
```

## Health checks

### All pods running

```bash
kubectl get pods -A | grep -v Running | grep -v Completed
```

On a healthy cluster this should be empty. Anything in `CrashLoopBackOff`, `Error`, `ImagePullBackOff`, or `Pending` for more than a few minutes warrants investigation – see [Troubleshooting](./troubleshooting).

### Helm releases

```bash
helm list -A
```

Every release should show `STATUS: deployed`. A release stuck in `pending-install` or `failed` is a problem.

### Ingress

```bash
kubectl get ingress -n openlm
```

Lists all the routes Traefik will serve. If the platform is reachable but specific URLs return 404, check that the corresponding ingress exists here.

## Logs

### A single pod

```bash
kubectl logs <pod-name> -n openlm
kubectl logs <pod-name> -n openlm --tail 100 -f      # follow last 100 lines
kubectl logs <pod-name> -n openlm --previous         # crashed container's last logs
```

### All pods of a service

```bash
kubectl logs -n openlm -l app=openlm-identity --tail 50
```

## Backup and restore

The platform has two main classes of state to back up:

1. **Persistent volume data** – Kafka, MongoDB, PostgreSQL, and MariaDB data on disk. This is the bulk of the backup size.
2. **K3s cluster state** – the embedded datastore that holds Kubernetes objects (deployments, secrets, etc.). Small, quick to restore.

External databases (if you use SQL Server) are out of scope here – back them up with your usual DBA tooling.

### VM-level snapshots (recommended)

For most customers the simplest reliable backup is a hypervisor- or cloud-provider snapshot of the whole VM. K3s, all persistent volumes, and system state are captured in one consistent image. This is the approach we recommend.

If your VM platform supports it, schedule daily snapshots and retain them according to your RPO/RTO policy.

### Database-level backups

For more granular RPO, or when you need to extract data without restoring the whole VM:

**PostgreSQL (reporting):**

```bash
kubectl port-forward -n openlm-infrastructure svc/postgres-postgresql 5432:5432 &
PGPASSWORD='<postgres_password>' pg_dump -h localhost -U postgres \
  openlm_reporting_db | gzip > reporting-$(date +%F).sql.gz
kill %1
```

**MariaDB (operational):**

```bash
kubectl port-forward -n openlm-infrastructure svc/mariadb 3306:3306 &
mysqldump -h localhost -u root -p<mariadb_root_password> \
  --all-databases | gzip > operational-$(date +%F).sql.gz
kill %1
```

**MongoDB:**

```bash
kubectl exec -n openlm-infrastructure mongodb-0 -- \
  mongodump --archive --gzip \
  --uri "mongodb://admin:<mongodb_root_password>@localhost:27017/?authSource=admin" \
  > mongo-$(date +%F).archive.gz
```

Restores follow the reverse pattern – port-forward and pipe the dump into `psql`, `mysql`, or `mongorestore`. Scale down the consuming services first so they don't write while a restore is in flight.

## Upgrades

The deployment package is **versioned**. To upgrade:

1. Receive the new deployment package from OpenLM.
2. Unpack it on the VM at a **new path** (for example, `~/platform-as-vm-2026-05/`). Don't overwrite the previous package – you may want it for rollback.
3. Copy your existing `config.yaml` into the new directory and reconcile any new options.
4. Copy `passwords.yaml` from the previous deployment directly – it must contain the **same** passwords the bundled databases were initialized with.
5. Run `./entrypoint.sh` from the new directory.

The playbook is idempotent: K3s, namespaces, and secrets are detected and left alone. Helm releases are upgraded in-place with the new chart versions, with pods rolling one at a time. Brief downtime of individual services is normal during the upgrade; total platform downtime should be less than a minute per service.

:::note
Database schema migrations are handled automatically by the `AllDbUpgradeAPI` service on first startup of the new version. Do not delete that service.
:::

For major version upgrades that skip multiple releases, contact OpenLM support – some data migration steps may need to happen between specific versions.

### Rolling back

If an upgrade fails or behaves incorrectly:

1. `cd` into the **previous** deployment directory.
2. Re-run `./entrypoint.sh`.

This downgrades each Helm release back to the previous chart version.

:::warning
Schema migrations are not reversible. If the new version already ran `AllDbUpgradeAPI`, you cannot roll back the database – restore from a backup if you need to undo schema changes.
:::

## Maintenance windows

Plan upgrades and database-level operations during a maintenance window. The platform tolerates pod restarts well, but:

- Active end-user sessions may be briefly interrupted.
- Reporting ETL jobs may need to re-run their last batch.
- Integrations with external systems (ServiceNow, etc.) queue events in Kafka until services come back.

A 30-minute maintenance window is sufficient for a routine upgrade.

## Uninstall

To completely remove the platform and K3s from the VM:

```bash
sudo /usr/local/bin/k3s-uninstall.sh
```

:::warning
`k3s-uninstall.sh` removes **everything**: the cluster, all persistent volumes (including all your data), all container images, and the kubectl config. There is no undo. Take a VM snapshot first if you might want to recover.
:::

To also remove the certificate directory and the deployment package:

```bash
sudo rm -rf /etc/openlm
rm -rf ~/platform-as-vm*
```
