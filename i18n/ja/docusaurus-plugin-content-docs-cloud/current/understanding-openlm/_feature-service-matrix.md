---
sidebar_position: 6
title: 機能–サービス対応表（Feature–Service Matrix）
description: Overview of OpenLM Platform features, associated services, dependencies, and prerequisites.
---

この表は、OpenLM プラットフォームの主要機能について、主担当サービス・依存サービス・セットアップ前提を一覧化したものです。機能の相互関係と有効化に必要な要素の理解に役立ちます。

## 凡例
- **Primary services**: 機能を提供する主担当サービス
- **Dependent services**: 機能を成立させるために有効/連携が必要なサービス
- **Prerequisites**: 前提条件（DB、インストール、有効化など）

| 機能名                         | 説明                                                                        | 主担当サービス                      | 依存サービス                                 | 前提条件                                                                      |
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
| License access control        | Controls access to licenses based on rules and schedules.                  | License Access Control (LAC)       | Broker Hub, Identity Service                | Activate in Products Service; License servers configured.                     |
| Projects management           | Manages projects for grouping users, machines, or resources.                | Projects Service                   | Directory Sync, Agents Hub                 | MongoDB; Activate Projects Service.                                          |
| Directory synchronization     | Syncs user and group data from external directories (for example, Lightweight Directory Access Protocol). | Directory Sync                     | Identity Service                            | External directory (Lightweight Directory Access Protocol/Active Directory) configured; Identity Service active. |

## Notes
- Base this matrix on OpenLM Platform architecture and service documentation. Features might include additional sub-features or variations in Cloud versus On-Premise deployments.
- Dependencies often work asynchronously through Kafka, so ensure event stream operates.
- For detailed setup, refer to the linked service documentation.
- If a feature requires activation, do so typically through Products Service on Home Page.

_各サービスの詳細は[サービス一覧](/cloud/service-index)を参照してください。_
