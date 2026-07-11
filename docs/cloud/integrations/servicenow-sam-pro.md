---
title: ServiceNow Connector
sidebar_position: 1
description: "Use this guide to connect OpenLM Platform to ServiceNow Software Asset Management Professional, SAM Pro."
---

Use this guide to connect OpenLM Platform to ServiceNow Software Asset Management Professional, SAM Pro. You sync engineering license usage and denial data so you can review it in ServiceNow.

After you complete this topic, you can connect OpenLM to ServiceNow, set synchronization options, and confirm that SAM Pro reports use OpenLM data.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Integrations → ServiceNow Connector**.

**Before you start:** Activate **ServiceNow Connector** in [OpenLM Products](/cloud/openlm-administration/products) — activation provisions infrastructure and can take up to 10 minutes — then install the **OpenLM Adapter Integration** from the ServiceNow marketplace.
:::

## How the integration works

You use the integration to send OpenLM usage data to ServiceNow so SAM Pro can report on license usage and compliance.

### Purpose and benefits

The integration helps you do the following:

- Review engineering license usage and denial trends in SAM Pro.
- Compare publisher compliance with actual usage from OpenLM.
- Keep core license metrics in one place, ServiceNow SAM Pro.

### Components you need

You need these components to send OpenLM data to ServiceNow:

- OpenLM Connector, activated in OpenLM Platform.
- OpenLM Adapter Integration, installed on a server from the ServiceNow marketplace.

## Configure the integration

Complete the tasks in this section to connect and sync data.

### Confirm prerequisites

Before you start, make sure the following requirements are met:

- ServiceNow SAM Pro is installed and configured on your ServiceNow instance.
- The ServiceNow team has activated the SAM Pro target tables, such as Engineering Application Usage.
- You have the ServiceNow instance URL and credentials.
- If you use Open Authorization, OAuth, you have the OAuth client ID and client secret.

### Connect ServiceNow in OpenLM

Use the ServiceNow Connector in OpenLM to set up the connection.

1. In OpenLM Platform, confirm that ServiceNow Connector is active.
2. If ServiceNow Connector is not active, contact your sales agent to activate it.
3. In the main menu, select ServiceNow Connector.
4. On the ServiceNow connection tab, enter your ServiceNow instance URL.
5. Select an authentication method.
6. Enter your ServiceNow username and password.
7. If you use Open Authorization, OAuth, enter the OAuth client ID and client secret.
8. Select Test Connection.
9. Select Save.

![ServiceNow connection settings in OpenLM Platform ServiceNow Connector](/img/integrations/servicenow-olm/servicenow-connection.png)
*ServiceNow connection settings in OpenLM Platform ServiceNow Connector*

### Set synchronization options

Configure how often OpenLM sends data to ServiceNow.

1. In the Sync configurations tab, set the time zone.
2. Select the sync frequency, daily or weekly.
3. Select Activate Sync.
4. Select Save.
5. Select Sync Now to run a manual sync.

![Sync configurations tab in the OpenLM Platform ServiceNow Connector](/img/integrations/servicenow-olm/servicenow-sync-configurations.png)
*Sync configurations tab in the OpenLM Platform ServiceNow Connector*

### Review data that syncs

OpenLM sends data to 13 staging tables in ServiceNow. The data includes the following categories:

- Usage
- Denials
- Aggregated usage
- Alerts
- Computers
- Groups
- User information
- License
- Inventory
- Server information
- Hosts
- Projects
- Users

![ServiceNow staging table list for OpenLM data](/img/integrations/servicenow-olm/servicenow-staging-tables.png)
*ServiceNow staging table list for OpenLM data*

### Understand how data reaches SAM Pro

Use this two-step flow to know where to validate data in ServiceNow.

1. OpenLM pushes data into staging tables created by OpenLM Adapter Integration in your ServiceNow instance.
2. ServiceNow SAM Pro transforms the staging data into target tables, for example Engineering Application Usage, and uses those tables in reports and dashboards.

![ServiceNow transform map from OpenLM staging tables to SAM Pro target tables](/img/integrations/servicenow-olm/servicenow-transform-map.png)
*ServiceNow transform map from OpenLM staging tables to SAM Pro target tables*

## Verify the integration

After you configure sync, verify that SAM Pro is using OpenLM data.

1. Select Sync Now to run a manual sync.
2. If you do not run a manual sync, wait for the scheduled sync run.
3. In ServiceNow, confirm that OpenLM staging tables contain new records.
4. Confirm that SAM Pro target tables, such as Engineering Application Usage, contain the transformed data.
5. In ServiceNow Software Asset Workspace, review reports and dashboards to confirm that usage and compliance metrics reflect OpenLM data.
