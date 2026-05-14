---
title: Requirements
sidebar_position: 1
description: "Hardware, operating system, network, and TLS requirements for installing the OpenLM Platform on a single virtual machine."
---

The Platform as VM deployment runs the entire OpenLM Platform on a single virtual machine or bare-metal server. The deployment script installs Kubernetes (K3s), the databases, the message broker, the cache, and all OpenLM services on top of a clean RHEL-family operating system – you don't need any Kubernetes, Ansible, or Helm experience to run it.

This page lists what you need to have in place before you start. The actual install is covered in [Deployment](./deployment).

## Licensing

A valid OpenLM license is required to use the platform. Contact [sales@openlm.com](mailto:sales@openlm.com) to obtain or extend a license before deploying to production.

## System requirements

| Resource | Minimum (evaluation) | Recommended (production) |
| --- | --- | --- |
| CPU | 4 vCPU | 8+ vCPU |
| RAM | 32 GB | 64 GB |
| Storage | 100 GB SSD | 500 GB+ SSD |
| Network | 100 Mbps | 1 Gbps |

The installer enforces the minimums and fails fast if CPU or RAM fall short.

:::warning
The minimum specification is suitable for evaluation, demo, and POC environments with low load. For production use with active Brokers and users, use the recommended specification or higher.
:::

## Operating system

Officially supported: **RHEL 9, AlmaLinux 9, or Rocky 9** (RHEL-family 9.x).

Ubuntu, Debian, and SUSE are not supported. Older RHEL-family majors (7, 8) and newer (10) are not officially validated.

## User account

You need a non-root user account on the VM with `sudo` privileges. The installer will prompt for the sudo password once at the start.

## Network requirements

### Outbound (during installation)

The VM needs outbound HTTPS access to the following hosts so the installer can pull Kubernetes, container images, and Helm charts:

- `get.k3s.io` – K3s installer
- `public.ecr.aws` – OpenLM container images
- `docker.io`, `bitnami.com` – infrastructure container images (Redis, Kafka, MongoDB, MariaDB, PostgreSQL)

If the VM is behind an HTTPS proxy, set `HTTPS_PROXY` and `NO_PROXY` in your shell before running the installer.

### Inbound (during operation)

Open the following ports on whatever firewall sits in front of the VM:

| Port | Source | Purpose |
| --- | --- | --- |
| 443 | End users | HTTPS – the OpenLM Platform UI and APIs |
| 80 | End users | HTTP redirect to 443 |
| 6443 | Admins | Kubernetes API (for `kubectl` access from off-VM) |
| 30432 | BI tools | Reporting database (PostgreSQL) for Power BI and similar |
| 22 | Admins | SSH |

The installer manages the VM's internal `firewalld` rules for K3s itself – you don't need to configure those manually.

## DNS

You need a fully qualified domain name (FQDN) that resolves to the VM, such as `openlm.yourcompany.com`. Create an **A record** pointing the FQDN at the VM's IP address before running the installer.

Verify resolution from a client machine (not from the VM itself):

```bash
dig openlm.yourcompany.com +short
# Should print the VM's IP address.
```

If the VM lives in an air-gapped network where you cannot publish a DNS record, see the [`add_coredns_hosts_entry` pattern](./configuration#air-gapped-network-without-dns) in the configuration reference.

## TLS certificate

You need a TLS certificate and matching private key in **PEM format**. This can be:

- A certificate from a public CA (Let's Encrypt, DigiCert, etc.)
- A certificate from your internal/corporate CA
- A self-signed certificate (acceptable for evaluation; browsers will show a warning)

The certificate's Common Name or Subject Alternative Name must cover the FQDN you configured.

Verify the certificate and key match before installation:

```bash
openssl x509 -noout -modulus -in tls.crt | md5sum
openssl rsa  -noout -modulus -in tls.key | md5sum
```

The two outputs must be identical.

## Capacity considerations

This deployment path is designed for small customer environments, evaluation, and POC. All services share a single machine, so there is a practical cap on the load the system can handle compared to a multi-node cluster deployment.

If the environment outgrows the single-VM capacity, consider migrating to one of the multi-node deployment paths: [On-premise machines](../on-premise-machines/requirements), [AWS](../aws/requirements), or [Azure](../azure/requirements).
