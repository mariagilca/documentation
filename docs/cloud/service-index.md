---
title: "Service index"
sidebar_position: 999
description: "This document enumerates all services included in the OpenLM Platform, grouped by function."
---

This document enumerates all services included in the OpenLM Platform, grouped by function. Categories follow the **All Applications** panel in the OpenLM Platform app launcher.

## Platform administration

The following services handle identity, the OpenLM license itself, the catalog of activatable products, system audit, and UI display preferences. These are the services every account starts with.

- [Identity](/cloud/openlm-administration/identity)
- [OpenLM License Manager](/cloud/openlm-administration/license-manager)
- [Products](/cloud/openlm-administration/products)
- [UI Configuration](/cloud/openlm-administration/ui-configuration)
- [Audit](/cloud/openlm-administration/audit)
- [Database Configuration Tool](/cloud/openlm-administration/database-configuration-tool) — desktop utility for on-premises deployments. Not visible in the cloud app launcher.

## Users

The following services manage end-user accounts, project tagging for usage attribution, the dashboard end users see, and synchronization with external directories.

- [Users and Groups](/cloud/users/users-and-groups)
- [Projects](/cloud/users/projects)
- [Personal Dashboard](/cloud/users/personal-dashboard) — end-user surface delivered by Workstation Agent. Not visible in the cloud app launcher.
- [Directory Synchronization Service (DSS)](/cloud/users/directory-sync)
- [LDAP Connector](/cloud/users/ldap-connector) — forwards DSS sync output to Amazon S3 and Amazon SQS (FIFO). Cloud only.

## Licenses and features

The following services let you inspect and manage the engineering licenses your customers care about: the license inventory itself, the servers that publish them, the historical allocations, license-file lifecycle tooling, the virtual licensing layer, and policy enforcement at the asset level.

- [Licenses](/cloud/slm/licenses)
- [License Servers](/cloud/slm/license-servers)
- [License Allocations](/cloud/slm/license-allocations)
- [License File Management](/cloud/lfm)
- [Virtual License Manager (VLM)](/cloud/vlm)
- [Compliance](/cloud/compliance)
- [Dongle Monitoring](/cloud/dongle-monitoring)
- [License Parser](/cloud/license-parser)

## Brokers

Brokers and Hubs collect license-server data and expose it to OpenLM. The Broker is the component installed on each license server; Broker Hub is the orchestration layer for traditional Brokers; Cloud Broker covers SaaS license sources where the Broker can not run.

- [Broker Hub](/cloud/data-collection/broker-hub)
- [OpenLM Broker](/cloud/data-collection/openlm-broker)
- [Cloud Broker](/cloud/data-collection/cloud-broker)

## Agents

Agents track what end users actually do on their workstations. Workstation Agent runs on each PC; Agents Hub configures it; Agent Activity Manager monitors and maintains it.

- [Agents Hub](/cloud/data-collection/agents_hub)
- [Agent Activity Manager](/cloud/data-collection/agent_activity_manager)

## Automations and policy

The following services turn observation into action: alerts when conditions are met, notifications on the right channel, policy enforcement at the license manager, license harvesting, SaaS seat reallocation, identity-driven cleanup, and procurement tracking.

- [OpenLM Alerts](/cloud/automations/alerts)
- [Notifications](/cloud/automations/notifications)
- [License Access Control](/cloud/automations/lac)
- [Process Manager](/cloud/automations/process-manager)
- [Subscription Optimizer](/cloud/automations/subscription-optimizer) — visible only when activated for the account.
- [Identity Alignment](/cloud/automations/identity-alignment) — automated removal of deprovisioned users from external services through Cloud Broker. Previously named OneDirectorySync.
- [Software Asset Management](/cloud/sam)

## Reporting

The following services provide usage, denial, and historical session reporting through the platform UI and a deeper BI dashboard surface.

- [Denials](/cloud/reporting/ui-reports/denials)
- [Process Sessions](/cloud/reporting/ui-reports/process-sessions)
- [Touch Point Events](/cloud/reporting/ui-reports/touch-point-events)
- [Usage](/cloud/reporting/ui-reports/usage)
- [BI Reports](/cloud/category/bi-reports) — curated dashboards on the OpenLM reporting database. Amazon QuickSight in Cloud, Apache Superset on-premises.

## Integrations

The following services connect OpenLM to ITSM, helpdesk, and CRM platforms so that license events surface where teams already work.

- [ServiceNow](/cloud/integrations/servicenow-sam-pro)
- [Freshworks Alerts](/cloud/integrations/freshworks-alerts)
- [Salesforce Alerts](/cloud/integrations/salesforce-alerts)
- [Zoho Alerts](/cloud/integrations/zoho-alerts)

_For each service, see its dedicated document._
