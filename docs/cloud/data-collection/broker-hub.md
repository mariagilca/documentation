---
title: "Broker Hub"
sidebar_position: 1
description: "The Broker Hub is the central console for viewing, approving, updating, restarting, and removing the OpenLM Brokers installed on your license servers."
---

## Overview

The **Broker Hub** is the central console for the OpenLM Brokers installed on your license servers. From a single screen you can approve newly discovered Brokers, monitor their health, upgrade them to a new version, restart them, and remove ones you no longer need.

A **[Broker](./openlm-broker)** runs on (or next to) a license server and reports its data to OpenLM. Every Broker first reports in to the Broker Hub. After you approve it, its data flows on for processing.

![The Broker Hub Brokers list](/services/broker-hub/brokers-overview.png)
*The Broker Hub, showing the list of approved Brokers*

The navigation panel has four areas:

- **Brokers** — all approved Brokers and their current status.
- **Pending Brokers** — newly discovered Brokers awaiting approval.
- **SaaS Agents** — connectors that collect licensing data from SaaS platforms. See [Cloud Broker](./cloud-broker).
- **AI Proxy** — the OpenLM AI Proxy service. See [AI Proxy](/cloud/deployment-operations/ai-proxy).

## Prerequisites

Before a Broker appears in the Broker Hub, install it on your license server:

1. [Generate a Broker authorization file](../openlm-administration/identity#generate-a-new-authorization-file).
2. [Install the Broker](/cloud/deployment-operations/components-installation) on the license server.
3. In the [Broker UI](./openlm-broker#open-the-broker-ui), upload the authorization file and select **Continue**.

The Broker automatically detects the license managers installed on the server and checks connectivity. When detection completes, the Broker reports in to the Broker Hub and appears under **Pending Brokers**.

## Approve pending Brokers

Newly discovered Brokers arrive with a pending status. Approve a Broker before OpenLM starts collecting its data.

1. Select **Pending Brokers** from the navigation.

![The Pending Brokers list](/services/broker-hub/pending-brokers-list.png)
*Brokers awaiting approval, including entries flagged as duplicates*

2. Select the check box next to each Broker you want to approve.
3. Select **Approve Brokers**.

![Selecting a pending Broker activates the Approve Brokers button](/services/broker-hub/pending-approve-select.png)
*Select one or more Brokers to activate Approve Brokers*

:::note
**Approve Brokers** takes effect immediately, with no extra confirmation step. Approved Brokers move from **Pending Brokers** to the **Brokers** list.
:::

The **ID** column flags Brokers that need attention:

- **Duplicate** — another Broker with the same ID is already registered. Use the **Remove** (✕) button on the row to discard the duplicate, or contact OpenLM support to resolve the conflict.
- **Not Reporting** / **Not Accepting** — the Broker has stopped transmitting or is disabled.

After you approve a Broker, its detected license managers become available for approval under [License Servers](../slm/license-servers).

## Understand Broker status

The **Status** column on the Brokers list shows each Broker's current health:

| Status | Meaning |
| --- | --- |
| **Up** | Approved and running normally. |
| **Not Reporting** | The Broker has stopped transmitting data. Check that the Broker service is running on the license server. |
| **New** | Discovered but not yet approved. |
| **Broker Sync** | The Broker is syncing data after coming back online. |
| **Not Accepting** | The Broker's account is suspended. |
| **Duplicate** | Multiple Brokers report the same ID. Contact OpenLM support to resolve. |
| **Time Sync Error** | The Broker's system clock is out of sync. Check the machine's time and Network Time Protocol (NTP) settings. |

:::tip
The Broker Hub treats a Broker that has not reported for more than 90 days as inactive and highlights its row. Clear the **Show Inactive Brokers** check box to hide Brokers that are not currently reporting, or use the **Search** box to filter the list (separate multiple terms with commas).
:::

Other columns include **Hostname**, **IP**, **Version**, **Installation Path**, **Operating System**, **Time Zone**, and **Latest Status Date** (the time of the Broker's last report). Select a **Broker UI** icon to open that Broker's own web interface in a new tab.

## Update Brokers

Use **Update Brokers** to upgrade one or more Brokers to a new version.

1. On the **Brokers** list, select **Update Brokers**.
2. Select the version to install:
   - **Latest Version** — installs the most recent released Broker version.
   - **Custom Version** — upload a specific installer file (`.tar.gz`).

![Selecting a version in the Update Brokers steps](/services/broker-hub/update-brokers-version.png)
*Step 1 of Update Brokers: select the version*

3. Select **Continue**.
4. Select the Brokers to update, then select **Continue** again.

OpenLM sends the update command to the selected Brokers. The upgrade runs in the background. Refresh the Brokers list to see each Broker's new version once it has upgraded and reported back.

:::note
You can update only Brokers running version 22.6.13.105 or higher.
:::

## Restart Brokers

To restart Brokers remotely, select **Restart Brokers**, select the Brokers to restart, and select **Restart**. OpenLM sends the restart command to each selected Broker.

## Remove Brokers

1. On the **Brokers** list, select the check box next to each Broker you want to remove.
2. Select **Delete**.
3. Review the listed Brokers, then select **Confirm**.

![The Remove Brokers confirmation dialog](/services/broker-hub/remove-brokers-confirm.png)
*Confirm before removing Brokers*

:::warning
Removing a Broker stops data collection from its license servers. This action cannot be undone from the Broker Hub.
:::

## Work with a Broker's license managers

Select a Broker's **Hostname** to open its **License Manager** view. From here you can, for each license manager port:

- Start, stop, or reread the license server.
- Download, upload, or reread license files.
- Sync asset data.

The Broker runs each command within a few minutes.

## SaaS Agents

The **SaaS Agents** tab lists the cloud-hosted agents that collect licensing data from SaaS platforms. An agent appears here after you connect a SaaS service in [Cloud Broker](./cloud-broker).

![The SaaS Agents tab](/services/broker-hub/saas-agents.png)
*The SaaS Agents tab*

Each agent shows its **Hostname**, **Status**, **ID**, **Time Zone**, **Latest Status Date**, **Creation Date**, **IP**, and **Version**. From this tab you can:

- **Update SaaS Agents** — upgrade the selected agents by uploading a version installer.
- **Delete** — remove the selected agents. Select an agent's check box to activate the button.
- **Search** — filter the list.

To choose which SaaS platforms OpenLM monitors, see [Cloud Broker](./cloud-broker).

## AI Proxy

The **AI Proxy** tab lists your deployed **AI Proxy Agents**. OpenLM AI Proxy is a self-hosted gateway that routes large language model (LLM) API requests and records token usage for AI FinOps reporting. An agent appears here after you deploy the AI Proxy.

![The AI Proxy tab](/services/broker-hub/ai-proxy.png)
*The AI Proxy Agents tab*

Each agent shows its **Hostname**, **ID**, **Status**, **Creation Date**, and **Last Update**. Select an agent's check box and select **Delete** to remove it, or use **Search** to filter the list.

To deploy and configure the service, see [AI Proxy](/cloud/deployment-operations/ai-proxy).
