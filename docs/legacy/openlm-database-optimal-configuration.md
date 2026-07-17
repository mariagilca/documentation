---
title: OpenLM database optimal configuration
sidebar_label: "Database optimal configuration"
sidebar_position: 3
description: "Recommended settings and best practices for the OpenLM database on MySQL, MS SQL Server, and MariaDB."
---

{/* Source: https://www.openlm.com/knowledge-base/openlm-database-optimal-configuration/ */}

This document collects the recommended settings and best practices for running the OpenLM database on MySQL, MS SQL Server, and MariaDB.

## Our recommendations

- If the binary log is enabled, the database user needs SUPER privileges to run some upgrade scripts. To verify if the binary log is enabled, run:

  ```sql
  SHOW VARIABLES LIKE 'log_bin';
  ```

- To verify whether the current user has SUPER privileges, run:

  ```sql
  SELECT *
  FROM INFORMATION_SCHEMA.USER_PRIVILEGES
  WHERE PRIVILEGE_TYPE = 'SUPER'
    AND REPLACE(GRANTEE, '''', '') = CURRENT_USER();
  ```

- It is possible to allow function and procedure creation by enabling `log_bin_trust_function_creators`. To check if it is enabled:

  ```sql
  SHOW VARIABLES LIKE 'log_bin_trust_function_creators';
  ```

- Another option is to disable binary logging if replication is not enabled and point-in-time recovery is not needed.
- For compilers that perform multiple checkouts/check-ins per second, we recommend hardware that is 25%-50% stronger than the baseline.
- VM administrators should make sure the hosting server is capable of accommodating the required resources.
- When you observe low performance in DB queries, check the disk queue.
- We strongly recommend placing the database in the same data center as the OpenLM SLM.
- For MySQL we provide sample configuration files for Windows (`my.ini`) and Linux (`my.cnf`) that should be reviewed by your DBA.
- A VM network controller should be available for each network card.
- For larger databases (25 GB and up) under heavy load, each database should have 3 files and 3 VM disk controllers — one each for the database file, log file, and temp file.

## Best practices for using MySQL

1. Use the latest MySQL 5.7/8 release.
2. To use the system's resources, MySQL requires its configuration file (`my.cnf` / `my.ini`) to be set with correct values. Otherwise MySQL will not take advantage of the hosting machine's resources. The following sample configuration files (archived as `.zip`) cover common system sizes — review with your DBA before applying:

   - [8GB_4Cores_Windows](https://www.openlm.com/wp-content/uploads/2018/10/my_8GB_4Cores_Windows.zip)
   - [16GB_8Cores_Linux](https://www.openlm.com/wp-content/uploads/2018/10/My_16GB_8Cores_Linux.zip)
   - [16GB_8Cores_Windows](https://www.openlm.com/wp-content/uploads/2018/10/my_16GB_8Cores_Windows.zip)
   - [24GB_8Cores_Windows](https://www.openlm.com/wp-content/uploads/2018/10/my_24GB_8Cores_Windows.zip)

## Best practices for using MS SQL Server

1. Apply a maintenance plan consisting of:
   - Periodic statistics update.
   - Periodic rebuild or reorganization of indexes.

   DBAs should apply the company maintenance policy to the OpenLM database as well. If no such policy exists, a public package can be used (for example, [Ola Hallengren's maintenance solution](https://ola.hallengren.com/)).

2. Recommended memory allocation for MSSQL Server running (almost) exclusively on a Windows machine is no more than 80% of total machine memory.

3. The OpenLM database should have the `is_read_committed_snapshot_on` parameter set.

   To check whether it is set:

   ```sql
   SELECT is_read_committed_snapshot_on
   FROM sys.databases
   WHERE name = 'YourDatabase';
   ```

   To set it:

   ```sql
   DECLARE @sqlCommand varchar(1000)
   DECLARE @db_name varchar(50)

   SET @db_name = 'YourDatabase'

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET ALLOW_SNAPSHOT_ISOLATION ON '
   EXEC (@sqlCommand)

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET SINGLE_USER WITH ROLLBACK IMMEDIATE '
   EXEC (@sqlCommand)

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET READ_COMMITTED_SNAPSHOT ON '
   EXEC (@sqlCommand)

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET MULTI_USER '
   EXEC (@sqlCommand)
   ```

4. For better performance, install `tempdb`, databases, and log files on separate logical (and in some cases physical) disks. A solid installation has:

   - 1 disk for `tempdb` data (SSD recommended).
   - 1 disk for system DBs (`msdb`, `model`, `master`).
   - 1 disk for all logs (including `tempdb` logs).
   - 1 disk for all DB data.

5. `tempdb` has a critical role — it stores parameters and temporary tables and runs sorts and aggregations. The number of `tempdb` data files is recommended to match the number of processors, up to 8 (more will have no effect or a negative effect on performance).
6. The autogrowth unit for database files defaults to a percentage, which is dangerous. Use MB units based on a predicted growth multiplied by record size. In any case, set alerts on disk size.
7. Set the log size up front.
8. A regular backup program is recommended to recover from crashes and to control log file growth. Shrinking a database is bad practice and is not recommended.

### Hardware sizing reference

| Number of users | Number of ports | Agents | Server CPU | Server memory | Server network | DB CPU | DB memory | DB disk | DB network |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 500 | 5 | – | 4 cores | 16 GB | 1 Gbit | – | – | – | – |
| 1,000 | 5 | – | 4 cores | 16 GB | 1 Gbit | – | – | – | – |
| 5,000 | 20 | – | 4 cores | 16 GB | 1 Gbit | 2 cores | 8 GB | 10K+ RPM HDD or SSD | 1 Gbit |
| 5,000 | 50 | – | 4 cores | 16 GB | 1 Gbit | 4 cores | 12 GB | 10K+ RPM HDD or SSD | 1 Gbit |
| 10,000 | 50 | – | 4 cores | 16 GB | 1 Gbit | 4 cores | 16 GB | 10K+ RPM HDD or SSD | 1 Gbit |
| 15,000 | 200 | – | 4 cores | 32 GB | 10 Gbit | 8 cores | 16 GB | 10K+ RPM HDD or SSD | 10 Gbit |
| 30,000 | 500 | – | 8 cores | 32 GB | 10 Gbit | 8 cores | 24 GB | 10K+ RPM HDD or SSD | 10 Gbit |
| 250 | 5 | 50 | 4 cores | 16 GB | 1 Gbit | – | – | – | – |
| 500 | 5 | 100 | 4 cores | 16 GB | 1 Gbit | – | – | – | – |
| 1,000 | 10 | 250 | 4 cores | 16 GB | 1 Gbit | 4 cores | 8 GB | 10K+ RPM HDD or SSD | 1 Gbit |
| 5,000 | 20 | 500 | 4 cores | 16 GB | 1 Gbit | 4 cores | 12 GB | 10K+ RPM HDD or SSD | 1 Gbit |
| 10,000 | 50 | 500 | 4 cores | 16 GB | 1 Gbit | 8 cores | 16 GB | 10K+ RPM HDD or SSD | 1 Gbit |
| 15,000 | 100 | 500 | 4 cores | 16 GB | 10 Gbit | 8 cores | 16 GB | 10K+ RPM HDD or SSD | 10 Gbit |
| 15,000 | 300 | 3,000 | 8 cores | 32 GB | 10 Gbit | 12 cores | 24 GB | 10K+ RPM HDD or SSD | 10 Gbit |
| 30,000 | 500 | 15,000 | 24 cores | 64 GB | 10 Gbit | 16 cores | 64 GB | 10K+ RPM HDD or SSD | 10 Gbit |

## Best practices for using MariaDB

:::note
Back up `my.ini` before changing the file.
:::

### 8 GB

```ini
innodb_buffer_pool_size=5G
innodb_io_capacity=1500
innodb_open_files=3000
max_allowed_packet=1G
max_connections=500
max_heap_table_size=1G
thread_cache_size=500
tmp_table_size=1G
```

### 16 GB

```ini
innodb_buffer_pool_size=12G
innodb_io_capacity=2500
innodb_open_files=5000
max_allowed_packet=1G
max_connections=500
max_heap_table_size=2G
thread_cache_size=1000
tmp_table_size=2G
```

### 24 GB

```ini
innodb_buffer_pool_size=18G
innodb_io_capacity=3000
innodb_open_files=80000
max_allowed_packet=2G
max_connections=1000
max_heap_table_size=3G
thread_cache_size=2000
tmp_table_size=3G
```
