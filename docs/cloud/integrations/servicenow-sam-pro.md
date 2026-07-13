---
title: ServiceNow Connector
sidebar_position: 1
description: "Connect OpenLM Platform to ServiceNow with the ServiceNow Connector: sync license usage data into SAM Pro, forward OpenLM alerts, and automate license file changes."
---

Use the ServiceNow Connector to link OpenLM Platform with your ServiceNow instance. The connector has 3 modules, and you can use any of them independently:

- **Adapter** sends OpenLM license management data to ServiceNow on a schedule, where ServiceNow Software Asset Management Professional, SAM Pro, reports on it.
- **Alerts** forwards OpenLM alerts to ServiceNow as task records, as the alerts occur.
- **License Automation Tool** lets ServiceNow requests drive license file comparison and deployment through OpenLM.

After you complete this guide, you can connect each module to your ServiceNow instance, schedule and run data syncs, receive OpenLM alerts in ServiceNow, and issue the API key that the License Automation Tool application in ServiceNow uses to call OpenLM.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Integrations → ServiceNow Connector**.

**Before you start:** Activate **ServiceNow Connector** in [OpenLM Products](/cloud/openlm-administration/products) — activation provisions infrastructure and can take up to 10 minutes — then install the **OpenLM Adapter Integration** from the ServiceNow marketplace.
:::

## How the integration works

Each module has its own connection to ServiceNow and its own direction of data flow:

- The **Adapter** pushes data from OpenLM to staging tables in an OpenLM application on your ServiceNow instance. After the last batch arrives, the application transforms the staging records into target tables, such as the SAM Pro Engineering Application Usage table, which ServiceNow reports and dashboards use. Syncs run on the schedule you set, and you can start a sync manually at any time.
- The **Alerts** module listens for alerts that OpenLM generates and posts each one to the OpenLM Alerts application in ServiceNow, which stores it as a task record with the alert severity mapped to the task priority. Alert forwarding has no schedule: alerts flow continuously once you save the connection.
- The **License Automation Tool** works in the opposite direction. A ServiceNow user raises a license request in the OpenLM License Automation Tool application, and the application calls OpenLM with an API key that you issue in OpenLM Platform. OpenLM compares the submitted license file with the file currently deployed on the license server, or deploys the new file through OpenLM Broker, and posts the result back to ServiceNow.

### Components you need

You need these components to use the ServiceNow Connector:

- An OpenLM Platform account with the **ServiceNow Connector** product activated. If ServiceNow Connector does not appear in the main menu, contact your sales agent.
- A ServiceNow instance with the OpenLM applications installed: the OpenLM data application for the Adapter, the OpenLM Alerts application for alerts, and the OpenLM License Automation Tool application for license automation.
- A ServiceNow service account for the connector, with rights to import data, or a ServiceNow Open Authorization, OAuth, client ID and client secret.
- For SAM Pro reporting, ServiceNow SAM Pro installed and configured on your instance.
- For the License Automation Tool, OpenLM Broker connected to the license servers you want to manage.

### Privacy and data handling

- Each module stores its ServiceNow credentials encrypted, per OpenLM Platform account.
- Saved passwords, client secrets, and API keys are not displayed again after you save them.
- The Adapter sends license management data only. It does not read data back from ServiceNow.

## Configure the integration

Complete the tasks in this section for the modules you use. Each module has its own **Destination Instance** tab, so you can connect them to the same instance or to different ones.

### Confirm prerequisites

Before you start, make sure the following requirements are met:

- ServiceNow Connector is active in OpenLM Platform, and you have an administrator role.
- The OpenLM applications are installed on your ServiceNow instance.
- You have the ServiceNow instance URL and the service account credentials, or the OAuth client ID and client secret.
- For SAM Pro reporting, the ServiceNow team has activated the SAM Pro target tables, such as Engineering Application Usage.

### Sync license data with the Adapter

The Adapter sends these data categories to ServiceNow: users, computers, projects, groups, group relations, group memberships, license servers, license manager hosts, license inventory, alerts, aggregated usage, aggregated denials, and aggregated concurrent usage. Each category lands in its own staging table, named `olm_stg_*`, in the OpenLM data application.

#### Connect the destination instance

1. In OpenLM Platform, open the main menu and select **ServiceNow Connector**. The **Adapter** page opens.
2. On the **Destination Instance** tab, enter the **ServiceNow URL**, for example `https://your-instance.service-now.com`.
3. Under **Authentication Method**, select **Basic** or **OAUTH 2.0**.
4. For Basic authentication, enter the **Username** and **Password** of the ServiceNow service account.
5. For OAuth, enter the **Client ID** and **Client Secret** from your ServiceNow OAuth registry.
6. Select **Test Connection** and wait for the success message.
7. Select **Save**.

![Adapter destination instance settings in the OpenLM Platform ServiceNow Connector](/img/integrations/servicenow-olm/servicenow-adapter-destination-instance.png)
*Adapter destination instance settings in the ServiceNow Connector*

#### Schedule automatic synchronization

1. On the **Adapter** page, select the **Auto Sync Configuration** tab.
2. Turn on the **Auto-Sync** toggle.
3. Set the **Auto Sync Time**, the time of day when the sync starts.
4. Select the **Time Zone** that the sync time refers to. The list is searchable.
5. Select the **Frequency**, **Daily** or **Weekly**. If you select Weekly, also select the **Day Of Week**.
6. Select **Save**.

Scheduled syncs send the changes since the last successful sync. The first sync after you activate the schedule sends the last 3 months of data.

![Auto sync configuration for the Adapter with a weekly schedule](/img/integrations/servicenow-olm/servicenow-adapter-auto-sync.png)
*Auto sync configuration for the Adapter, with a weekly schedule selected*

#### Run a manual sync

1. On the **Adapter** page, select **Sync Now**. The confirmation message "Manual sync started successfully" appears.
2. Watch the status strip: **Last Sync Status** shows **Processing** while the sync runs, then **Success** or **Failed**.
3. When the sync completes, **Last Successful Sync Time** updates.

A manual sync resends the last 3 months of data, so you can use it to backfill ServiceNow after you connect or after a period of failed syncs.

#### Review the data in ServiceNow

OpenLM pushes each data category into its own staging table in the OpenLM data application. Find them in ServiceNow under **Tables**, filtered by the `x_oplm_openlm_data` prefix.

![OpenLM staging tables in ServiceNow](/img/integrations/servicenow-olm/servicenow-staging-tables.png)
*The OpenLM staging tables in ServiceNow*

After the last batch of a sync arrives, OpenLM calls the application's transform endpoint, and the application moves the staging data into the target tables that SAM Pro uses. For example, usage records appear in **Engineering Application Usages** with **Source** set to `OpenLM`.

![OpenLM usage data in the ServiceNow Engineering Application Usages table](/img/integrations/servicenow-olm/servicenow-engineering-app-usage.png)
*OpenLM usage data in the SAM Pro Engineering Application Usages table*

### Forward OpenLM alerts to ServiceNow

The Alerts module sends every alert that OpenLM generates to the OpenLM Alerts application in ServiceNow. Each alert becomes a task record with an `OLM_ALERTS` number: the alert title becomes the short description, the connector converts the alert description to plain text, and the alert severity sets the task urgency, impact, and priority. To define which alerts OpenLM generates, see [Alerts](../automations/alerts).

#### Connect the Alerts destination instance

1. In the ServiceNow Connector menu, select **Alerts**.
2. On the **Destination Instance** tab, enter the **ServiceNow URL**.
3. Under **Authentication Method**, select **Basic** or **OAUTH 2.0** and enter the credentials of the ServiceNow service account that receives the alerts.
4. Select **Test Connection** and wait for the success message.
5. Select **Save**. Alert forwarding starts when you save the connection.

![Alerts destination instance settings in the ServiceNow Connector](/img/integrations/servicenow-olm/servicenow-alerts-destination-instance.png)
*Alerts destination instance settings in the ServiceNow Connector*

#### Set duplicate alert suppression

When the same alert fires repeatedly, the connector suppresses the repeats for a time window so ServiceNow is not flooded with duplicates.

1. On the **Alerts** page, select the **Configuration** tab.
2. In **Duplicate Alert Suppression Time (in hours)**, enter the window length. The default is 24 hours.
3. Select **Save**.

![Duplicate alert suppression setting on the Alerts Configuration tab](/img/integrations/servicenow-olm/servicenow-alerts-configuration.png)
*The duplicate alert suppression window on the Configuration tab*

### Automate license file changes with the License Automation Tool

With the License Automation Tool, engineers request license file changes in ServiceNow instead of on the license server. The OpenLM License Automation Tool application in ServiceNow provides **License Deployment Requests** and a **License Comparison Tool**: a request carries the new license file, OpenLM compares it feature by feature with the file currently deployed on the license server, and, on approval, deploys it through OpenLM Broker. OpenLM posts the comparison report and the deployment result back to the request in ServiceNow.

Two connections make this work: the **Destination Instance** credentials that OpenLM uses to post results to ServiceNow, and an API key plus **Connection URL** that the ServiceNow application uses to call OpenLM.

#### Connect the License Automation Tool destination instance

1. In the ServiceNow Connector menu, select **License Automation Tool**.
2. On the **Destination Instance** tab, enter the **ServiceNow URL**.
3. Under **Authentication Method**, select **Basic** or **OAUTH 2.0** and enter the credentials of the ServiceNow account created for the integration.
4. Select **Test Connection** and wait for the success message.
5. Select **Save**.

![License Automation Tool destination instance settings](/img/integrations/servicenow-olm/servicenow-lat-destination-instance.png)
*License Automation Tool destination instance settings*

#### Manage the API key

The ServiceNow application authenticates its calls to OpenLM with an API key. The key is valid for 1 year, and only 1 key can be active at a time.

1. On the **License Automation Tool** page, select the **API Key Management** tab.
2. Select **Generate New Key**. The new key appears only once: copy it and store it securely. If you lose it, revoke the key and generate a new key.
3. Copy the **Connection URL**.
4. In the OpenLM License Automation Tool application in ServiceNow, paste the Connection URL and the API key into the connection settings.

The tab shows the **Api Key Status**, the **Generation Time**, and the **Expiration Time** of the current key. To invalidate the current key, select **Revoke Current Key**. If a key is already active, revoke it before you generate a new one, and update the ServiceNow application with the new key.

![API key management for the License Automation Tool](/img/integrations/servicenow-olm/servicenow-lat-api-key-management.png)
*API key management for the License Automation Tool*

## Verify the integration

1. On each module's **Destination Instance** tab, select **Test Connection** and confirm the success message.
2. On the **Adapter** page, select **Sync Now** and confirm that **Last Sync Status** moves from **Processing** to **Success**.
3. In ServiceNow, confirm that the OpenLM staging tables contain new records.
4. Confirm that SAM Pro target tables, such as Engineering Application Usages, contain records with **Source** set to `OpenLM`.
5. Generate a test alert in OpenLM and confirm that a task record with an `OLM_ALERTS` number appears in ServiceNow.
6. For the License Automation Tool, submit a comparison request in ServiceNow and confirm that the comparison report appears on the request.

## Troubleshoot

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| **Test Connection** fails | Wrong instance URL, wrong credentials, or the service account lacks import rights | Verify the URL format, reenter the credentials, and confirm the account's roles in ServiceNow |
| **Test Connection** fails with OAuth | The OAuth client is inactive or the client secret changed | Check the OAuth registry entry in ServiceNow and reenter the client ID and client secret |
| **Last Sync Status** shows **Failed** | ServiceNow was unreachable during the sync, or credentials changed since the last save | Run **Test Connection**, save the corrected credentials, then select **Sync Now** |
| You cannot save Adapter credentials | An active sync locks credential updates | Wait for the sync to complete, then save again |
| Alerts do not appear in ServiceNow | The alert repeats within the suppression window, or the Alerts connection is missing | Reduce **Duplicate Alert Suppression Time**, or verify the Alerts destination instance settings |
| ServiceNow license requests stay unanswered | The API key expired or lost its validity, or OpenLM Broker is offline | Generate a new key and update the ServiceNow application, and confirm the Broker connection to the license server |
| You lost the API key | The key appears only once, at generation | Select **Revoke Current Key**, generate a new key, and update the ServiceNow application |

## Known limitations

- The API key appears only once, when you generate it, and only 1 key can be active per account. Keys expire after 1 year.
- A manual sync always resends the last 3 months of data.
- Alert forwarding has no on/off switch. Alerts flow as long as the connection details remain in place.

## Related

- [Alerts](../automations/alerts)
- [OpenLM Broker](../data-collection/openlm-broker)
- [ServiceNow changelog](../changelog/cloud/servicenow)
