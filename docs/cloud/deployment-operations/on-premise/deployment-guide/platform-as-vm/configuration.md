---
title: Configuration reference
sidebar_position: 3
description: "Reference for config.yaml and passwords.yaml, with end-to-end patterns for default, external SQL Server, external Kafka, and air-gapped installations."
---

All customer-facing configuration lives in two files at the root of the deployment package:

- `config.yaml` – platform configuration (domain, databases, ingress, etc.)
- `passwords.yaml` – passwords used by the bundled databases

The installer reads both files and renders them into Helm chart values and Kubernetes secrets at install time. Re-running the installer re-renders everything based on the current files.

## Required fields

These three fields **must** be set; the installer will abort if they are empty.

```yaml
openlm_system_domain: "openlm.yourcompany.com"    # FQDN used to access the platform
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"
```

Every other field has a default that works for a single-VM, all-bundled deployment.

## Database options

The platform uses two database roles:

- **Operational** – live state, identity, allocations. High write throughput, small queries.
- **Reporting** – historical usage and ETL output for BI tools. Large analytical queries.

Each role can use one of these backends:

| Backend | Mode | Notes |
| --- | --- | --- |
| MariaDB | Bundled | Default for operational |
| PostgreSQL | Bundled | Default for reporting |
| SQL Server | External | Either role, customer-supplied |
| MySQL | External | Operational only, customer-supplied |

### Recommended patterns

The two patterns we recommend:

1. **All-bundled** – operational on MariaDB, reporting on PostgreSQL. Self-contained, nothing extra to manage. Use this if you have no SQL Server infrastructure or DBA team.
2. **All-external on SQL Server** – both roles on the same external SQL Server instance, in separate databases. Best for customers with an existing SQL Server fleet.

Mixing bundled and external is supported but uncommon.

### Reporting database

```yaml
reporting_db_type:     "PostgreSQL"    # or "SqlServer_SQLServerAuth"
reporting_db_host:     "postgres-postgresql.openlm-infrastructure.svc.cluster.local"
reporting_db_port:     5432
reporting_db_username: "postgres"
reporting_db_password: "GENERATED"     # Substituted from passwords.yaml
reporting_db_name:     "openlm_reporting_db"
```

When using external SQL Server, set `reporting_db_password` to the real password (not `GENERATED`), and either pre-create the database or grant the user permission to create it. The bundled PostgreSQL is not installed when the type is `SqlServer_SQLServerAuth`.

### Operational database

```yaml
operational_db_type:     "MariaDB"     # or "SqlServer_SQLServerAuth"
operational_db_host:     "mariadb.openlm-infrastructure.svc.cluster.local"
operational_db_port:     3306
operational_db_username: "root"
operational_db_password: "GENERATED"
operational_db_name:     "openlm_operational_db"
identity_db_name:        "openlm_identity_db"
dss_db_name:             "openlm_dss_db"
```

The operational role uses three logical databases: operational, identity, and DSS. With the bundled MariaDB, all three are created automatically.

## Message broker (Kafka)

```yaml
kafka_bootstrap_servers: "kafka.openlm-infrastructure.svc.cluster.local:9092"

# Only set the SASL fields when connecting to an external/managed Kafka:
kafka_sasl_mechanism:         ""    # e.g. ScramSha512
kafka_sasl_username:          ""
kafka_sasl_password:          ""
kafka_security_protocol:      ""    # e.g. SASLSSL
kafka_ssl_endpoint_algorithm: ""    # e.g. https
```

- **Default** – bundled Kafka inside the cluster, no authentication.
- **External Kafka** – set `kafka_bootstrap_servers` to the external endpoint and fill in the SASL fields. Contact OpenLM support if you also want to disable the bundled Kafka.

## Document store (MongoDB)

```yaml
mongo_connection_string: "mongodb://admin:GENERATED@mongodb.openlm-infrastructure.svc.cluster.local:27017"
```

The literal string `GENERATED` is replaced at install time with `mongodb_root_password` from `passwords.yaml`. External MongoDB is not a supported configuration – the platform expects the bundled MongoDB.

:::warning
Do **not** end the MongoDB connection string with a trailing `/`. Some clients reject it.
:::

## Cache (Redis)

```yaml
redis_connection_string: "redis-master.openlm-infrastructure.svc.cluster.local:6379"
```

Redis runs cluster-internal with no authentication. External Redis is not a supported configuration.

## SMTP (diagnostic notifications)

These fields configure the Diagnostic Tool's email notifications. Leave the defaults if you don't need email out.

```yaml
diagnostictool_smtp_host:       "smtp.example.com"
diagnostictool_smtp_port:       587
diagnostictool_smtp_useTls:     true
diagnostictool_smtp_username:   ""                          # Leave empty for no auth
diagnostictool_smtp_password:   ""
diagnostictool_smtp_from:       "openlm-diagnostics@example.com"
diagnostictool_smtp_recipients: "admin@example.com"
```

`diagnostictool_smtp_recipients` accepts a single email address or a comma-separated list.

## Storage class

```yaml
k8s_storage_class: "local-path"
```

`local-path` is the K3s default and stores persistent volume data on the VM's local disk. This is the right choice for a single-VM deployment and is automatically backed up when you snapshot the VM.

If you have a different provisioner already installed on the host (NFS, Longhorn, Ceph), you can switch it here – but make sure it is installed and ready **before** running the installer.

## Air-gapped network without DNS

If the VM lives in a network with no DNS server that can host your platform domain, the installer can patch K3s's internal DNS so the domain resolves correctly **inside the cluster**:

```yaml
openlm_system_domain: "openlm.internal"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

add_coredns_hosts_entry: true
coredns_hosts_entry_ip:  "10.20.30.40"    # The VM's IP
```

End users still need to reach the VM somehow – either by IP, by a `hosts` file entry on each client, or via your own internal DNS server.

## `passwords.yaml`

```yaml
postgres_password:     "changeme"
mariadb_root_password: "changeme"
mongodb_root_password: "changeme"
```

These passwords are used to:

1. Initialize the bundled databases at install time.
2. Configure the platform services to connect with those passwords.

If a database is not used (for example, when `reporting_db_type` is `SqlServer_SQLServerAuth`), its password value is ignored.

:::warning
Passwords are baked in at install time. Changing `passwords.yaml` after the install does **not** update the running databases. Rotate via each database's native commands afterwards.
:::

## Full configuration examples

### Pattern 1 – Default single-VM, all bundled

The simplest deployment. Everything runs on one VM, including the databases.

```yaml
openlm_system_domain: "openlm.yourcompany.com"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"
# Everything else: defaults
```

### Pattern 2 – External SQL Server for both database roles

The customer has an existing SQL Server instance. The bundled PostgreSQL and MariaDB are not installed; the DBA must pre-create the four databases (or grant create rights to the application user).

```yaml
openlm_system_domain: "openlm.yourcompany.com"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

reporting_db_type:     "SqlServer_SQLServerAuth"
reporting_db_host:     "mssql.yourcompany.com"
reporting_db_port:     1433
reporting_db_username: "openlm_app"
reporting_db_password: "<real password>"
reporting_db_name:     "openlm_reporting_db"

operational_db_type:     "SqlServer_SQLServerAuth"
operational_db_host:     "mssql.yourcompany.com"
operational_db_port:     1433
operational_db_username: "openlm_app"
operational_db_password: "<real password>"
operational_db_name:     "openlm_operational_db"
identity_db_name:        "openlm_identity_db"
dss_db_name:             "openlm_dss_db"
```

### Pattern 3 – External Kafka (e.g. AWS MSK)

Useful when you already operate an event-bus you want OpenLM to share.

```yaml
openlm_system_domain: "openlm.yourcompany.com"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

kafka_bootstrap_servers:     "b-1.mycluster.xxxxx.kafka.us-east-1.amazonaws.com:9092"
kafka_sasl_mechanism:        "ScramSha512"
kafka_sasl_username:         "openlm-user"
kafka_sasl_password:         "<msk-password>"
kafka_security_protocol:     "SASLSSL"
kafka_ssl_endpoint_algorithm:"https"
```

### Pattern 4 – Air-gapped network with no external DNS

The VM has no DNS server that can host the platform domain. End users reach the platform by IP or via local `hosts` entries.

```yaml
openlm_system_domain: "openlm.internal"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

add_coredns_hosts_entry: true
coredns_hosts_entry_ip:  "10.20.30.40"
```
