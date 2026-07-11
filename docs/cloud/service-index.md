---
title: "Service index"
sidebar_position: 999
description: "Every OpenLM Platform service, grouped by the category it appears under in the app launcher."
---

This index lists every OpenLM Platform service, grouped by the category it appears under in the app **launcher** (the grid icon, top-right). Installed components and surfaces that are not launcher apps are listed at the end and marked.

## Licenses and Features

Inspect and manage the licenses your organization runs: the license inventory, the servers that publish them, historical allocations, usage and denials, license-file tooling, the virtual licensing layer, and policy enforcement.

- [Licenses](/cloud/slm/licenses)
- [License Access Control](/cloud/automations/lac)
- [License Servers](/cloud/slm/license-servers)
- [License Allocations](/cloud/slm/license-allocations)
- [Usage](/cloud/reporting/ui-reports/usage)
- [Compliance](/cloud/compliance)
- [Denials](/cloud/reporting/ui-reports/denials)
- [License File Management](/cloud/lfm)
- [Virtual License Manager](/cloud/vlm)
- [License Parser](/cloud/license-parser)

## Users

Manage end-user accounts, project tagging for usage attribution, and synchronization with external directories.

- [Users and Groups](/cloud/users/users-and-groups)
- [Projects](/cloud/users/projects)
- [Directory Sync](/cloud/users/directory-sync)
- [LDAP Connector](/cloud/users/ldap-connector) — forwards Directory Sync output to Amazon S3 and Amazon SQS (FIFO). Cloud only.
- [Identity Alignment](/cloud/automations/identity-alignment) — removes deprovisioned users from external services through Cloud Broker. Previously named OneDirectorySync.

## Brokers

Collect license-server data and expose it to OpenLM.

- [Broker Hub](/cloud/data-collection/broker-hub)
- [Cloud Broker](/cloud/data-collection/cloud-broker) — for SaaS license sources where the Broker cannot run.

## Agents

Track what end users do on their workstations, and the processes and dongles they use.

- [Agents Hub](/cloud/data-collection/agents_hub)
- [Agent Activity Manager](/cloud/data-collection/agent_activity_manager)
- [Dongle Monitoring](/cloud/dongle-monitoring)
- [Process Sessions](/cloud/reporting/ui-reports/process-sessions)
- [Process Manager](/cloud/automations/process-manager)
- [Touch Point Events](/cloud/reporting/ui-reports/touch-point-events)

## Platform Administration

Identity, the OpenLM license itself, the catalog of activatable products, system audit, notifications, and UI display preferences. Every account starts with these.

- [Alerts](/cloud/automations/alerts)
- [Audit](/cloud/openlm-administration/audit)
- [Identity](/cloud/openlm-administration/identity)
- [OpenLM License](/cloud/openlm-administration/license-manager)
- [Notifications](/cloud/automations/notifications)
- [OpenLM Products](/cloud/openlm-administration/products)
- [UI Configurations](/cloud/openlm-administration/ui-configuration)

## Software Asset Management

- [Software Asset Management](/cloud/sam) — sellers, purchases, and entitlement records.
- [SAM Catalog](/cloud/sam-catalog) — a centralized, structured catalog of software applications.

## Integrations

Connect OpenLM to ITSM, helpdesk, and CRM platforms so that license events surface where teams already work.

- [Freshworks Alerts Integration](/cloud/integrations/freshworks-alerts)
- [Salesforce Alerts Integration](/cloud/integrations/salesforce-alerts)
- [ServiceNow Connector](/cloud/integrations/servicenow-sam-pro)
- [Zoho Alerts Integration](/cloud/integrations/zoho-alerts)
- [Zendesk Alerts Integration](/cloud/integrations/zendesk-alerts)

## Not a launcher category

These surfaces and installed components do not appear as tiles in the **All Applications** panel.

- [Homepage](/cloud/getting-started/homepage) — the post-login dashboard (a launcher header shortcut).
- [BI Reports](/cloud/category/bi-reports) — the reporting portal (a launcher header shortcut). Amazon QuickSight in Cloud, Apache Superset on-premises.
- [Workstation Agent](/cloud/data-collection/workstation-agent) — installed on end-user machines; managed through Agents Hub and Agent Activity Manager.
- [OpenLM Broker](/cloud/data-collection/openlm-broker) — installed on each license server; managed through Broker Hub.
- [Personal Dashboard](/cloud/users/personal-dashboard) — end-user surface delivered by the Workstation Agent.
- [Database Configuration Tool](/cloud/openlm-administration/database-configuration-tool) — desktop utility for on-premises deployments.
- [Subscription Optimizer](/cloud/automations/subscription-optimizer) — no dedicated UI; configured through License Access Control. Visible only when activated.
- [OpenLM MCP Connector](/cloud/mcp-reporting-server/introduction) — a server-side endpoint for external AI clients; it has no launcher tile.

_For each service, see its dedicated document._
