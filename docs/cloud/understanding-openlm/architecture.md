---
title: OpenLM Platform architecture
sidebar_position: 2
description: Understand how OpenLM Platform uses microservices, Kubernetes, and messaging queues to process and manage license usage data.
---



# OpenLM Platform architecture

OpenLM Platform collects application and executable data through Workstation Agents and Brokers. These components connect to OpenLM Gateway, which represents the organization’s fully qualified domain name (FQDN) or DNS name. The gateway forwards the data to OpenLM services, which stores it in appropriate databases.

## Key components

- **Workstation Agents**: Collect data from individual user machines.  
- **Brokers**: Run on license manager servers. They collect license usage data and send it to relevant services.  
- **OpenLM Gateway**: Serves as entry point and routes data to individual services.  
- **OpenLM Services**: Process, enrich, and manage the collected data.  
- **Databases**: Store processed data in dedicated systems, such as the server database, identity service database, DSS database, and reporting database.



## Microservices and Kubernetes

OpenLM Platform Annapurna version runs on microservices deployed in a Kubernetes cluster.  
Each service runs inside a container within a pod on a Kubernetes node.  
Services store their data in internal databases and use Kafka as a message queue for asynchronous processing.



## Architecture levels


### Level 1: High-level data flow

- Workstation Agents, Brokers, and other services write data to their own databases.  
- Services publish data to Kafka topics.  
- The Reporting Service aggregates Kafka data.  
- The Reporting Service stores data in the reporting database.  
- The reporting dashboard reads data from the reporting database.

![OpenLM Platform Level 1 architecture](/img/on_premise/understanding_openlm/level-1.png)

### Level 2: Detailed data pipeline

- Workstation Agents and Brokers collect data from PCs and servers.  
- Agent Hub and Broker Hub consolidate this data.  
- Data from Agent Hub and Broker Hub is saved to MongoDB and Kafka.  
- Other services (User, Project, Server) consume relevant Kafka topics.  
- The Enrichment Service merges and enhances data from all services, then publishes it back to Kafka.  
- Apache Spark aggregates the enriched Kafka data for reporting.  
- Spark writes results to the reporting database.  
- Business intelligence tools access the reporting database.

![OpenLM Platform Level 2 architecture](/img/on_premise/understanding_openlm/level-2.png)


### Comprehensive architecture 

The diagram represents the broader OpenLM Platform architecture, including identity, event streaming, hubs, monitoring, core services, and reporting flows.

```mermaid
architecture-beta
    %% Main groups
    group platform(cloud)[OpenLM Platform]
    group bi_tools(cloud)[BI Client] in platform

    %% Major external systems
    service iddb(database)[Identity RDB (EF)]
    service reportingdb(database)[OpenLM Reporting DB]

    %% Identity services
    service identity(server)[OpenLM Identity Service] in platform

    %% Kafka Event Stream as central bus
    service kafka(server)[Kafka Event Stream] in platform

    %% Microservices attached to Kafka, each with a MongoDB
    service licensing(server)[OpenLM Licensing] in platform
    service licensingdb(database)[MongoDB] in platform

    service products(server)[Products Service] in platform
    service productsdb(database)[MongoDB] in platform

    service usergroups(server)[Users & Groups Service] in platform
    service usergroupsdb(database)[MongoDB] in platform

    service alerts(server)[Alerts Service] in platform
    service alertsdb(database)[MongoDB] in platform

    service notification(server)[Notification Service] in platform
    service notificationdb(database)[MongoDB] in platform

    service audit(server)[OpenLM Audit] in platform
    service auditdb(database)[MongoDB] in platform

    service projects(server)[Projects Service] in platform
    service projectsdb(database)[MongoDB] in platform

    service lac(server)[License Access Control] in platform
    service lacdb(database)[MongoDB] in platform

    service lfm(server)[License Flex Management] in platform
    service lfmdb(database)[MongoDB] in platform

    %% Directory Sync & Broker
    service directorysync(server)[Directory Sync] in platform
    service directorysyncdb(database)[MongoDB] in platform
    service brokerhub(server)[Broker Hub] in platform
    service brokerhubdb(database)[MongoDB] in platform
    service cloudbroker(server)[Cloud Broker] in platform
    service cloudbrokerdb(database)[MongoDB] in platform

    %% Agents, Monitoring, SLM
    service agentshub(server)[Agents Hub] in platform
    service agentshubdb(database)[MongoDB] in platform

    service processmonitor(server)[Process Monitoring] in platform
    service processmonitordb(database)[MongoDB] in platform

    service touchpoints(server)[Touch Points] in platform
    service touchpointsdb(database)[MongoDB] in platform

    service donglemonitor(server)[Dongle Monitoring] in platform
    service donglemonitordb(database)[MongoDB] in platform

    service slm(server)[SLM] in platform
    service slmdb(database)[MongoDB] in platform

    service compliance(server)[Compliance Service] in platform
    service compliancedb(database)[MongoDB] in platform

    %% Spark Streaming (pipe to reporting)
    service spark(server)[Spark Streaming] in platform

    %% Agents and Sync external systems
    service syncagents(server)[OpenLM Directory Sync Agents]
    service rdbms1(database)[RDBMS]
    service brokers(server)[OpenLM Brokers]
    service cloudmgmt(cloud)[Cloud License Mgmt]
    service agents(server)[OpenLM Agents]
    service rdbms2(database)[RDBMS]
    service rdbms3(database)[RDBMS]

    %% BI tools block
    service grafana(server)[Grafana] in bi_tools
    service powerbi(server)[Power BI] in bi_tools
    service quicksight(server)[Amazon QuickSight] in bi_tools

    %% MAJOR FLOWS

    %% Identity
    iddb:B --> T:identity
    identity:R --> L:kafka

    %% SYNC, BROKER, AGENTS, SLM, ETC. to Kafka (represents vertical lines)
    directorysync:T -- B:kafka
    brokerhub:T -- B:kafka
    cloudbroker:T -- B:kafka
    agentshub:T -- B:kafka
    processmonitor:T -- B:kafka
    touchpoints:T -- B:kafka
    donglemonitor:T -- B:kafka
    slm:T -- B:kafka
    compliance:T -- B:kafka

    %% Service DBs
    licensing:T -- B:licensingdb
    products:T -- B:productsdb
    usergroups:T -- B:usergroupsdb
    alerts:T -- B:alertsdb
    notification:T -- B:notificationdb
    audit:T -- B:auditdb
    projects:T -- B:projectsdb
    lac:T -- B:lacdb
    lfm:T -- B:lfmdb
    directorysync:B -- T:directorysyncdb
    brokerhub:B -- T:brokerhubdb
    cloudbroker:B -- T:cloudbrokerdb
    agentshub:B -- T:agentshubdb
    processmonitor:B -- T:processmonitordb
    touchpoints:B -- T:touchpointsdb
    donglemonitor:B -- T:donglemonitordb
    slm:B -- T:slmdb
    compliance:B -- T:compliancedb

    %% Event stream to all microservices
    kafka:T -- B:licensing
    kafka:T -- B:products
    kafka:T -- B:usergroups
    kafka:T -- B:alerts
    kafka:T -- B:notification
    kafka:T -- B:audit
    kafka:T -- B:projects
    kafka:T -- B:lac
    kafka:T -- B:lfm

    %% Event stream to Spark Streaming
    kafka:R --> L:spark
    spark:R --> L:reportingdb

    %% BI tools access Reporting DB
    reportingdb:R -- L:grafana
    reportingdb:R -- L:powerbi
    reportingdb:R -- L:quicksight

    %% Directory Sync Agents to Directory Sync
    syncagents:R --> L:directorysync
    syncagents:B --> T:rdbms1

    %% Brokers to Broker Hub
    brokers:R --> L:brokerhub

    %% Cloud License Mgmt to Cloud Broker
    cloudmgmt:R --> L:cloudbroker

    %% Agents to Agents Hub
    agents:R --> L:agentshub
    agents:B --> T:rdbms2

    %% SLM RDBMS
    slm:B --> T:rdbms3

```



## Enrichment services

OpenLm Platform includes enrichment services to consolidate and enhance the collected data:

- **Allocation Enrichment Service**: Adds allocation data using allocation IDs.  
- **Usage Enrichment Service**: Enhances usage data using session IDs.  
- **Denials Enrichment Service**: Processes denial data using denial IDs.


## Data storage and recovery

OpenLM Platform uses a staging database to support data recovery in case of loss or corruption.  
This staging data is later moved to MongoDB, which serves as an internal recovery source.