---
title: Optimal Configuration for Applications Manager
sidebar_position: 6
description: Guide to achieving the optimal configuration for OpenLM Applications Manager.
---

To achieve optimal performance when running the **OpenLM Applications Manager**, you should adhere to specific hardware and database configuration recommendations. For compilers with high checkout/checkin rates, consider increasing hardware specs by 25-50% over the standard recommendations. You should also ensure that the database is located in the same data center as the OpenLM SLM to minimize latency.
***
### Best practices for using MySQL
1. Use the latest **MySQL 5.7 or 8** release.
2. To maximize resource utilization, you must properly configure the `my.cnf` or `my.ini` file. OpenLM provides sample configuration files tailored to different system sizes, which should be reviewed by your Database Administrator (DBA).
***
### Best practices for using MS SQL Server
1. Implement a maintenance plan that includes **periodic statistics updates** and **index rebuilding or reorganization**.
2. Limit memory allocation for SQL Server running (almost) exclusively on a Windows machine to **no more than 80%** of the total machine memory.
3. Ensure the OpenLM database has the `is_read_committed_snapshot_on` parameter set. You can check the current status and set the parameter using the provided SQL commands.
4. For better performance, install **`tempdb`**, databases, and log files on separate logical or physical disks.
5. Set the number of `tempdb` data files to match the number of processors, up to a maximum of 8.
6. Change the autogrowth units of database files from percentage to **MB units** to prevent dangerous growth.
7. Set the log size upfront rather than relying on autogrowth.
8. Implement a regular backup program to recover from crashes and manage log file growth. Avoid shrinking the database, as this is considered a bad practice.
***
### Recommended hardware configuration
The following table provides the recommended hardware configuration for the OpenLM Applications Manager based on the number of monitored agents and the database type.

| Agent | App Manager Server | Database Server |
| :--- | :--- | :--- |
| **Number of Agents** | **DB type** | **Applications** | **CPU** | **Memory** | **Network Card** | **Disk** | **CPU** | **Memory** | **Network Card** | **Disk** |
| 3000 | Internal | 10 | 4 Cores | 4GB | 1Gbit | Fast HD | – | – | – | – |
| 10000 | External | 75 | 8 Cores | 12GB | 10Gbit | Fast HD | 8 Cores | 16GB | 10Gbit | Fast HD |
| 15000 | External | 75 | 8 Cores | 16GB | 10Gbit | Fast HD | 8 Cores | 16GB | 10Gbit | Fast HD |
