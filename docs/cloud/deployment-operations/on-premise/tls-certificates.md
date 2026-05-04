---
title: TLS certificates
sidebar_position: 4
description: "The main actors communicating with the OpenLM Platform are the field agents (Broker, Workstation Agent, Directory Sync Agent) and users accessing the web UI."
---
import Checklist from '@site/src/components/Checklist';
import ChecklistItem from '@site/src/components/CheckListItem';

# TLS certificates

The main actors communicating with the OpenLM Platform are the field agents (Broker, Workstation Agent, Directory Sync Agent) and users accessing the web UI. All of them connect through a single HTTPS endpoint. The TLS certificate provided during deployment is what makes this work. If the certificate is not set up correctly, agents will not be able to establish the encrypted HTTPS connection and will not be able to communicate with the system.

## Requirements

### 1. The certificate must match your domain

The certificate Common Name (CN) or Subject Alternative Name (SAN) must match the fully qualified domain name (FQDN) configured during deployment (for example, `openlm.yourcompany.com`). This is the domain that all agents and web UI users will connect to.

### 2. The certificate must be trusted on every machine where agents are installed

Every machine running a Broker, Workstation Agent, or Directory Sync Agent must trust the certificate. If the certificate is issued by a public CA (like Let's Encrypt or DigiCert), this usually works out of the box.

If the certificate is issued by an **internal or private CA**, install the CA's root and intermediate certificates in the OS trust store of each agent machine. Without this, agents will refuse to connect.

### 3. The certificate must be trusted inside the Kubernetes cluster

The `custom-ca-configmap` ConfigMap is mounted into every microservice and makes the CA chain trusted by each one. This is essential because the platform uses an IdentityServer for authentication, and every microservice validates JWT tokens by calling back to the issuer at `https://<your-fqdn>/identity`. If the certificate is not trusted inside the cluster, services will not be able to reach the identity issuer, JWT validation will fail, and users will not be able to sign in.

The ConfigMap should contain the full certificate chain (root and intermediate CA certificates).

## How to configure

### Kubernetes TLS secret

Load your certificate and private key as a Kubernetes secret in the `openlm` namespace:

```bash
kubectl create secret tls openlm-lb-cert \
  --key your-domain.key \
  --cert your-domain.crt \
  -n openlm
```

### Custom CA ConfigMap

Create a ConfigMap with the full CA chain (root and intermediate certificates):

```bash
kubectl apply -f custom-ca-configmap.yaml -n openlm
```

The ConfigMap should contain every certificate in the chain that is needed to establish trust. If you are unsure which certificates to include, you can extract them from a browser by visiting a website on the same domain and exporting the certificate chain.

If your certificate is from a public CA and you do not have a custom chain, use the same certificate from the TLS secret described earlier.

## Self-signed or custom CA certificates

If you are using a self-signed certificate or a certificate issued by a custom (internal) CA, provide the **full certificate chain** in every place where the certificate is used:

- The **Kubernetes TLS secret** (`openlm-lb-cert`) must contain the full chain, not just the leaf certificate.
- The **`custom-ca-configmap`** must include the root and all intermediate CA certificates.
- The **OS trust store** on every agent machine and user workstation must have the root CA installed.

Providing only the leaf certificate without the full chain is one of the most common causes of TLS errors. If any link in the chain is missing in any of these locations, the connection will fail.

## Troubleshooting

:::warning
Untrusted or incomplete certificate chains are the most common cause of agent connection failures. If agents cannot reach the platform after deployment, check certificate trust and chain completeness first.
:::

**Agents fail to connect**: Verify that the CA root certificate is installed in the OS trust store on the agent machine. On Windows, check the Trusted Root Certification Authorities store. On Linux, check `/etc/pki/ca-trust/` or `/usr/local/share/ca-certificates/`.

**Web UI shows "not secure" warning**: The certificate does not match the domain, is expired, or the CA is not trusted by the browser.

**Users cannot sign in or services show authentication errors**: The `custom-ca-configmap` is likely missing or incomplete. Each service needs to trust the certificate to validate JWT tokens against the identity issuer (`https://<your-fqdn>/identity`). Verify the ConfigMap contains the full CA chain and redeploy.

## Checklist

<Checklist>
  <ChecklistItem title="Certificate CN or SAN matches the platform FQDN" />
  <ChecklistItem title="Certificate and private key loaded as Kubernetes TLS secret (`openlm-lb-cert`)" />
  <ChecklistItem title="Full CA chain configured in `custom-ca-configmap` inside the cluster" />
  <ChecklistItem title="CA root certificate installed on all machines running Brokers" />
  <ChecklistItem title="CA root certificate installed on all machines running Workstation Agents" />
  <ChecklistItem title="CA root certificate installed on all machines running Directory Sync Agents" />
  <ChecklistItem title="Web UI accessible without browser certificate warnings" />
</Checklist>
