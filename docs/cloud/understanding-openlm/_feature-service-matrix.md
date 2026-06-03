---
sidebar_position: 6
title: Feature-service matrix
description: Overview of OpenLM Platform features, associated services, dependencies, and prerequisites.
---

This matrix provides an overview of key features in OpenLM Platform, including primary services responsible, dependencies on other services, and prerequisites for setup. It helps users understand how features interconnect and what they need to activate them.

## Legend

The following terms are used throughout the matrix:

- **Primary services**: Main services that provide the feature.
- **Dependent services**: Other services that must be active or integrated for the feature to function fully.
- **Prerequisites**: Setup requirements, such as databases, installations, or activations.

| Feature name                   | Description                                                                 | Primary services                   | Dependent services                          | Prerequisites                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|------------------------------------|---------------------------------------------|-------------------------------------------------------------------------------|
| License usage tracking        | Collects and monitors license usage data from workstations and servers.     | Agents Hub, Broker Hub             | Enrichment Service, Reporting Service       | Workstation Agents/Brokers installed; Kafka for messaging; MongoDB databases. |
| User identity management      | Manages user accounts, groups, and authentication.                          | Identity Service                   | Directory Sync (optional)                   | Identity database (Relational Database, EF); User accounts created individually; SSO integration optional. |
| Compliance monitoring         | Tracks software compliance and license adherence based on geographical rules. | Compliance Service                 | Broker (for licenses), Workstation Agent    | Activate in Products Service; License manager sends data through Broker/Agent; Inventory integration activated. |
| Audit logging                 | Logs system events and activities for security, troubleshooting, and compliance. | Audit Service                      | BrokerHub, SecurityService                 | MongoDB for storage; OpenLM components activated.                               |
| Software asset management     | Manages software licenses by tracking purchases, entitlements, and usage.   | Software Asset Manager (SAM)       | Reporting Service                          | Reporting Service active; Activate from Products Service; License servers and Workstation Agents for data. |
| Personal dashboard            | Provides individual users with a view of their license usage and activity.  | Personal Dashboard                 | Identity Service, Workstation Agent         | User account in Identity Service; Workstation Agent installed; SSO for large organizations. |
| Product catalog management    | Organizes and manages product catalog, pricing, and inventory.              | Products Service                   | Reporting Service (for analytics)           | Configure general settings (currency, tax); MongoDB for storage.              |
| Reporting and analytics       | Generates dashboards and reports on license usage, assets, and compliance.  | Reporting Service                  | Enrichment Service, Apache Spark            | Reporting DB; Kafka topics for data aggregation; BI tools for access.         |
| Data enrichment               | Merges and enhances data from various sources for improved insights.        | Enrichment Service                 | Agents Hub, Broker Hub, Kafka Event Stream | Kafka running; MongoDB databases for services.                                |
| Alerts and notifications      | Sends automated alerts for license events, thresholds, or issues.           | Alerts Service, Notification Service | Kafka Event Stream                         | MongoDB; Integrations like Freshworks/Salesforce optional.                   |
| License access control        | Controls access to licenses based on rules and policies.                   | License Access Control (LAC)       | Broker Hub, Identity Service                | Activate in Products Service; License servers configured.                     |
| Projects management           | Manages projects for grouping users, machines, or resources.                | Projects Service                   | Directory Sync, Agents Hub                 | MongoDB; Activate Projects Service.                                          |
| Directory synchronization     | Syncs user and group data from external directories (for example, Lightweight Directory Access Protocol). | Directory Sync                     | Identity Service                            | External directory (Lightweight Directory Access Protocol/Active Directory) configured; Identity Service active. |

## Notes

Keep the following considerations in mind when using this matrix:

- Base this matrix on OpenLM Platform architecture and service documentation. Features might include additional sub-features or variations in Cloud versus On-premises deployments.
- Dependencies often work asynchronously through Kafka, so ensure event stream operates.
- For detailed setup, refer to the linked service documentation.
- If a feature requires activation, do so typically through Products Service on Home Page.

_For more details on each service, see the [Service index](/cloud/service-index)._
