---
title: "License Servers"
sidebar_position: 15
description: "License Servers section provides details about your monitored license servers, showing real-time license usage and server status."
keywords: [license servers, license manager, FlexLM, RLM, license monitoring, OpenLM Broker, server status, license usage, pending servers]
---

## Overview

 **License Servers** section provides details about your monitored license servers, showing real-time license usage and server status. Use this section to efficiently manage and monitor connected license servers.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Licenses and Features → License Servers**.

**Related:** [Licenses](/cloud/slm/licenses) · [License Allocations](/cloud/slm/license-allocations)
:::

## Features

With License Servers, you can:

- View monitored license servers and real-time usage statistics.
- Review servers pending approval, then approve and merge them into your existing configuration, or deny servers you don't want to monitor.
- Restore previously denied servers by returning them to **Pending Servers** for reconsideration.
- Manage or delete existing license servers by hovering over server row and selecting **Edit** icon to enter editing mode.

## The License Servers workspace

The left sidebar organizes the section into two groups:

- **Operational** — **Live Servers Statistics**, the read-only monitoring dashboard.
- **Management** — the pages where you review and configure servers: **Pending Servers**, **Denied Servers**, and **Servers Configuration**.

Every page shares the same toolbar controls: **Refresh** to reload the latest data, **Toggle Filters** to filter the grid by column, **Search** to find a specific server, and pagination controls for large lists.

## Live Servers Statistics

**Live Servers Statistics** is the read-only dashboard for everything OpenLM currently monitors. Each row is one license server, refreshed from the latest sample, so you can see availability and consumption at a glance.

![Live Servers Statistics dashboard listing monitored license servers with status, usage, and allocation columns](/img/license_servers/live-servers-statistics.png)

When candidate servers are waiting for a decision, a banner appears at the top of the grid — for example, *"There are 6 servers pending approval"* — with a **Go to pending servers** shortcut.

The grid can display the following columns:

| Column | What it shows |
| --- | --- |
| **Status** | Current server health — **Up**, **Down**, **Unknown**, or **Data error**. |
| **Server Name** | The display name of the license server. |
| **License Manager Type** | The license manager technology (for example, FLEXlm, RLM, ArcGIS Online, Autodesk Cloud, Office365Cloud, or OpenLM Generic). |
| **Host Name** / **Port** | The address OpenLM queries for this server. |
| **Status Date** | When the current status was last recorded. |
| **RSQT** | Recent Successful Query Time — the last time OpenLM successfully read licenses and usage from the server. |
| **Quantity** | Total licenses available across the server's active features. |
| **Used** / **Borrowed** | Licenses currently in use and currently borrowed. |
| **Usage Percent** | Consumption as a share of the total. |
| **Allocations** | Number of active license allocations. |
| **Usage Scope** / **Country** / **Description** | Custom properties you set on the server (see [Custom Fields](#edit-a-license-server)). |
| **Source** | How OpenLM collects the server's data — for example, through the OpenLM Broker. |
| **License File** | Whether the server reads from a license file. |

## Servers Configuration

**Servers Configuration** lists the same servers as an editable inventory. Use it to change a server's settings, disable it temporarily, or remove it.

![Servers Configuration grid with per-server configuration status, license manager type, host, port, and source](/img/license_servers/servers-configuration.png)

The **Configuration Status** column shows whether each server is **Enabled** or **Disabled**. The remaining columns — Server Name, License Manager Type, Host Name, Port, and Source — mirror the monitoring dashboard.

To remove servers, select one or more rows with the checkboxes and choose **Delete**.

### Edit a license server

Select the **Edit** icon on a server's row to open the **Edit License Server** page. At the top, set the **Display Name** and use the **Disable / Enable** toggle to control whether OpenLM actively monitors the server.

![Edit License Server page showing the Type tab with license manager type, time zone, sample rate, and the host and port table](/img/license_servers/edit-license-server.png)

Settings are split across two tabs:

- **Type** — the core connection and sampling settings:
  - **License Manager Type** — the technology this server runs.
  - **Time Zone** — the server's time zone, used to align usage timestamps.
  - **Sample Rate (Seconds)** — how often OpenLM queries the server for status and usage.
  - **Broker** — whether the server's data is collected through the OpenLM Broker.
  - **Read License File** — whether OpenLM reads the server's license file for entitlement details.
  - **Allow server fall back to denied license** — permit fall-back behavior for denied licenses.
  - **Enable Redundant Configuration** — mark the server as part of a redundant (triad) cluster.
  - The **Host Name / Port** table lists the hosts OpenLM queries; add or remove hosts here.
- **Custom Fields** — optional metadata you can attach to the server: **Country**, **Usage Scope**, and **Description**. These values surface as columns on the monitoring dashboard.

Choose **Save** to apply your changes, **Cancel** to discard them, or **Delete** to remove the server.

## Approve or deny discovered servers

License servers are discovered on your network by the **OpenLM Broker** and reported as candidates for monitoring. New candidates arrive as **pending** and stay out of the monitored inventory until you review them.

### Pending Servers

**Pending Servers** lists candidate servers awaiting a decision, with their Server Name, License Manager Type, Host Name, Port, and Source.

![Pending Servers page listing candidate servers with Approve And Merge and Deny actions](/img/license_servers/pending-servers.png)

Select one or more servers, then:

- **Approve And Merge** — add the servers to your monitored configuration so they appear in Live Servers Statistics and Servers Configuration.
- **Deny** — reject servers you don't want to monitor. They move to **Denied Servers**.

### Denied Servers

**Denied Servers** lists candidates you previously denied, keeping them out of the pending queue.

![Denied Servers page with the Restore To Pending action](/img/license_servers/denied-servers.png)

If you change your mind, select the servers and choose **Restore To Pending** to return them to **Pending Servers** for another review.
