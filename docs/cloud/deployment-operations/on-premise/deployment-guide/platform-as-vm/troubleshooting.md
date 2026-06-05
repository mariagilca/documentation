---
title: Troubleshooting
sidebar_position: 5
description: "Common installer and post-install issues for a Platform as VM deployment, with practical fixes."
tags:
  - troubleshooting
---

This page lists the issues we see most often. If your problem is not listed here, the general approach is:

1. `kubectl get pods -A` to find the failing pod.
2. `kubectl logs <pod> -n <namespace> --tail 200` to read its output.
3. `kubectl describe pod <pod> -n <namespace>` to see the recent events at the bottom.

## Installer failures

### "This playbook is only for RedHat-family systems"

The installer only supports RHEL and AlmaLinux. Ubuntu, Debian, and SUSE are not supported. Reprovision the VM with a supported operating system – see [Requirements](./requirements).

### "Minimum 32 GB RAM required" / "Minimum 4 CPU cores required"

The VM is undersized. Resize it before continuing – there is no workaround.

### "Authentication failure" on the sudo password prompt

The password you entered was wrong, or your user does not have sudo privileges. Verify with:

```bash
sudo -v
```

If that fails, ask whoever provisioned the VM to grant you sudo access.

### Installer hangs at "Wait for K3s to be ready"

K3s is downloading or its API server is slow to start. Wait 5 minutes; if it is still hung, open another SSH session and check:

```bash
sudo systemctl status k3s
sudo journalctl -u k3s --no-pager --since "5 minutes ago"
```

The most common cause is the VM not having outbound HTTPS access to `get.k3s.io`. Fix the proxy or firewall and re-run the installer.

### Installer fails at "Helm install"

Look at the Helm error message in the installer output. The usual causes:

- **Timeout** – the chart's pods aren't reaching Ready in time. Check `kubectl get pods -n openlm-infrastructure` and look at the failing pod's events.
- **ImagePullBackOff** – the VM cannot reach the container image registry. Verify outbound HTTPS to `public.ecr.aws` and `docker.io`.
- **Insufficient disk space** – run `df -h` and free up space under `/var/lib/rancher/k3s`.

After fixing the underlying issue, re-run `./entrypoint.sh`. The playbook is idempotent and will pick up where it left off.

## Post-install issues

### Pod stuck in `Pending`

```bash
kubectl describe pod <pod> -n openlm | tail -20
```

Look at the Events section. Typical causes:

- **Insufficient memory or CPU** – the VM is oversubscribed. Resize the VM or scale non-critical services down.
- **PVC stuck Pending** – `kubectl get pvc -n openlm-infrastructure`. If a PVC is `Pending`, the storage class can't provision. Check that `local-path-provisioner` is running in `kube-system`.

### Pod stuck in `ImagePullBackOff`

```bash
kubectl describe pod <pod> -n openlm | grep -i image
```

The image tag listed there should be valid in `public.ecr.aws/r3q3q2f4/`. If it looks right, it is a network problem:

```bash
curl -I https://public.ecr.aws/r3q3q2f4/olm-server/manifests/latest 2>&1 | head -5
```

Any TLS or timeout error here means the VM cannot reach the registry – fix the proxy or firewall.

If the tag looks wrong or unknown, the deployment package may be corrupted; re-download from OpenLM.

### Pod stuck in `CrashLoopBackOff`

```bash
kubectl logs <pod> -n openlm --previous --tail 100
```

The `--previous` flag is critical – it shows the logs from the last crashed container, not the empty new one. Common patterns:

- **Database connection failure** – the service cannot reach its database. Check that `mariadb-0`, `postgres-postgresql-0`, and `mongodb-0` are Running, and that the passwords in `passwords.yaml` match what the databases were initialized with.
- **Kafka topic missing** – the service expects a topic that wasn't created. Re-run the topics creation script (see [Missing Kafka topics](#missing-kafka-topics)).
- **Schema mismatch** – the database schema is out of date. The `AllDbUpgradeAPI` service migrates schemas on startup; verify it is Running and check its logs.

### The OpenLM URL returns 404 or Bad Gateway

```bash
# Is Traefik routing the request?
kubectl logs -n kube-system -l app.kubernetes.io/name=traefik --tail 50

# Does the ingress exist?
kubectl get ingress -n openlm | grep <path-prefix>
```

If the expected ingress doesn't exist, the platform Helm release didn't install fully – re-run `./entrypoint.sh`.

### TLS / certificate errors in the browser

- **`NET::ERR_CERT_AUTHORITY_INVALID`** – the certificate is self-signed or from a CA the browser doesn't trust. Expected for non-production setups.
- **`NET::ERR_CERT_COMMON_NAME_INVALID`** – the certificate doesn't cover the FQDN you're using. Re-issue the certificate for the right name and re-run the installer – it re-reads the certificate files and updates the Kubernetes secret.
- **"certificate has expired"** – re-issue and re-run as above. The installer always overwrites the certificate secret with the current file contents.

To verify the certificate and key match:

```bash
openssl x509 -noout -modulus -in /etc/openlm/certs/tls.crt | md5sum
openssl rsa  -noout -modulus -in /etc/openlm/certs/tls.key | md5sum
```

The two outputs must be identical.

## DNS issues

### Services crash with "host not found" for the platform's own domain

Symptom: services that call back to the platform (for example, the identity service issuing tokens) fail with "host not found".

Cause: the cluster's internal DNS can't resolve `openlm_system_domain`. This typically happens when the VM lives in a network where the FQDN isn't published.

Fix – set the CoreDNS hosts entry in `config.yaml` and re-run the installer:

```yaml
add_coredns_hosts_entry: true
coredns_hosts_entry_ip:  "<the VM's IP>"
```

See [Air-gapped network without DNS](./configuration#air-gapped-network-without-dns) for the full pattern.

### End users can't reach the platform

Run `dig <openlm_system_domain> +short` **from the user's machine** (not from the VM). If it doesn't resolve to the VM's IP, fix your DNS A record. If it does resolve but the connection still fails, check the external firewall – port 443 must be open from the user's network.

## Database issues

### Reset the PostgreSQL or MariaDB password

The bundled database passwords are set once at install time. After that, `passwords.yaml` is no longer the source of truth. To reset:

**PostgreSQL:**

```bash
kubectl exec -n openlm-infrastructure -it postgres-postgresql-0 -- \
  psql -U postgres -c "ALTER USER postgres WITH PASSWORD '<new-password>';"
```

**MariaDB:**

```bash
kubectl exec -n openlm-infrastructure -it mariadb-0 -- \
  mysql -uroot -p'<old-password>' -e \
  "ALTER USER 'root'@'%' IDENTIFIED BY '<new-password>'; FLUSH PRIVILEGES;"
```

Then update `passwords.yaml` and re-run the installer so the platform services pick up the new password.

### Connect to a bundled database directly

```bash
# PostgreSQL
kubectl port-forward -n openlm-infrastructure svc/postgres-postgresql 5432:5432

# MariaDB
kubectl port-forward -n openlm-infrastructure svc/mariadb 3306:3306

# MongoDB
kubectl port-forward -n openlm-infrastructure svc/mongodb 27017:27017
```

Then run `psql`, `mysql`, or `mongosh` from another terminal pointing at `localhost`.

## Kafka issues

### Missing Kafka topics

If a service log shows "topic does not exist" or "Unknown topic or partition", re-run the topic creation script:

```bash
kubectl cp installation_files/kafka_topics/full_topic_list_create.sh \
  openlm-infrastructure/kafka-controller-0:/tmp/create-topics.sh
kubectl exec -n openlm-infrastructure kafka-controller-0 -- \
  bash /tmp/create-topics.sh
```

The script is idempotent – it skips topics that already exist.

### List existing topics

```bash
kubectl exec -n openlm-infrastructure kafka-controller-0 -- \
  /opt/bitnami/kafka/bin/kafka-topics.sh \
  --bootstrap-server localhost:9092 --list
```

## Disk space

K3s, container images, and database data all live on the VM's primary disk. If pods start failing with eviction warnings, check disk usage:

```bash
df -h
sudo du -sh /var/lib/rancher/k3s/*
sudo du -sh /var/lib/rancher/k3s/storage/*   # persistent volume data
```

If `/var/lib/rancher/k3s` is full, the simplest fix is to extend the disk. To clean up unused container images:

```bash
sudo k3s crictl images        # list
sudo k3s crictl rmi --prune   # remove unused
```

## Getting help

When you contact OpenLM support, include:

1. Output of `kubectl get pods -A`.
2. Output of `helm list -A`.
3. Logs of the failing pod: `kubectl logs <pod> -n <ns> --tail 500`.
4. `kubectl describe pod <pod> -n <ns>` if the pod isn't running.
5. Your `config.yaml` (redact passwords) and the version of the deployment package.
