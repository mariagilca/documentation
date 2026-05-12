---
title: Platform installation
sidebar_position: 6
description: "This page covers the Helm chart configuration and deployment of the OpenLM Platform."
---

This page covers the Helm chart configuration and deployment of the OpenLM Platform. These steps are common across all deployment paths (on-premise machines, AWS, and Azure).

Before starting, confirm you have completed the prerequisites checklist for your deployment path.

## API gateway installation

The API gateway is the single entry point for all external traffic.

### Configure

Edit the gateway `values.yaml`:

- Set `lbfqdn` to your domain (for example, `openlm.yourcompany.com`)
- Set the Redis address

### Install

```bash
helm install openlm-gateway openlm-gateway-<version>.tgz \
  -f values.yaml \
  -n openlm
```

### Verify

```bash
kubectl exec -it <any-pod> -n openlm -- /bin/sh
curl https://<your-domain>/api/homepage/.security
```

A "host not reachable" response is expected at this stage – it confirms the gateway routing is configured. If you see other errors, check the gateway logs and verify the Redis address.

## Platform Helm chart configuration

{/* TODO: Add link to deployment package download (Helm charts, values template, SQL scripts, Kafka topic scripts) */}

The platform is deployed using a single umbrella Helm chart. Start from the `mono-values-placeholders.yaml` file included in the deployment package.

### Configuration steps

### 1. Database type

Replace `db_type_placeholder` with your operational and identity database type:

- `MariaDB`
- `SqlServer_SQLServerAuth`
- `PostgreSQL`

:::note
All database passwords except the reporting password must be Base64-encoded in the Helm values file.
:::

### 2. Domain

Replace `lbfqdn-placeholder` with your fully qualified domain name.

### 3. Kafka connection

Replace `kafka-connection-placeholder` with your Kafka bootstrap servers address.

### 4. MongoDB connection

Replace `mongo-connection-placeholder-no-end-slash` with your MongoDB connection string (without a trailing slash).

### 5. Redis connection

Replace `redis-connection-placeholder` with your Redis connection string.

### 6. Operational database

Configure the operational database connection:

- Find `INFRASTRUCTURE__ServerConnectionStringTemplate` and set the connection string template.
- Find `INFRASTRUCTURE__ServerDbPrefix` and set the database name prefix (without `_none`).
- Find `SERVER_DATABASE_CONNECTIONSTRING` and set the connection string.

**MariaDB example:**

```
Server=mariadb.openlm-infrastructure.svc.cluster.local;Port=3306;User ID=root;Password=<base64-password>;Database={0};Connection Lifetime=0;Minimum Pool Size=0;Maximum Pool Size=100;Default Command Timeout=30
```

**SQL Server example:**

```
Data Source=<host>;Initial Catalog={0};User ID=<user>;Password=<base64-password>;Min Pool Size=0;Max Pool Size=100;Encrypt=False;TrustServerCertificate=False
```

### 7. Identity database

- Replace `identity-db-connection-placeholder` with the identity database connection string
- Verify `DbType` in the `identity:` section `vars_list` matches your database engine

### 8. DSS database

Find `vars_list` in the `dss:` section and configure the connection. The `db_type` values are:

| Value | Engine |
| --- | --- |
| `2` | SQL Server |
| `3` | MySQL |
| `4` | MariaDB |

### 9. Reporting

The Helm values file contains preconfigured sections for two reporting database types. Uncomment the section matching your engine:

- `MSSQL REPORTING` for SQL Server
- `POSTGRESQL REPORTING` for PostgreSQL

Then replace the reporting placeholders:

- `reporting-sql-db-host-placeholder`
- `reporting-sql-db-port-placeholder`
- `reporting-sql-db-name-placeholder`
- `reporting-sql-db-username-placeholder`
- `reporting-sql-db-password-placeholder`

Set `storageClassName` for Spark persistent volumes, and configure `REPORTING_DATABASE_CONNECTIONSTRING`.

## Install the platform

```bash
helm upgrade --install monohelm monohelm.tgz \
  -f mono-values.yaml \
  -n openlm
```

## Node affinity

Configure node affinity rules in the Helm values to match the node labels you applied during environment setup. This ensures that each workload type (main, reporting, infrastructure) runs on the correct node group as designed.

## Verify deployment

Monitor pods until all are running:

```bash
kubectl get pods -n openlm -w
```

If pods are crashing, investigate:

```bash
# Check pod logs
kubectl logs <pod-name> -n openlm

# Check pod events (image pull failures, resource limits, scheduling issues)
kubectl describe pod <pod-name> -n openlm
```

Your domain should now serve the OpenLM homepage.

## Post-installation

### Apache Superset (optional)

To deploy Apache Superset for reporting dashboards:

1. Create a dedicated namespace and TLS secret:
   ```bash
   kubectl create namespace apache-superset
   kubectl create secret tls openlm-lb-cert \
     --key your-domain.key \
     --cert your-domain.crt \
     -n apache-superset
   ```

2. Configure `values.yaml`:
   - Set `lbfqdn` to a separate subdomain (for example, `superset-openlm.yourcompany.com`)
   - Configure `supersetNode` > `connections` for Redis and PostgreSQL. If PostgreSQL is not available externally, activate the bundled instance with `postgresql.enabled: true`

3. Install:
   ```bash
   helm install superset superset.tgz \
     -f values.yaml \
     -n apache-superset
   ```

### SMTP configuration

Configure the SMTP server in the notification service to activate email alerts and notifications.

### Ongoing monitoring

Regularly verify that all pods are healthy:

```bash
kubectl get pods -n openlm
```

Investigate any pods that are in a restart loop by checking logs and events.
