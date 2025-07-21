---
id: report-summary
title: Report summary
sidebar_position: 1
---

Use the **Report summary** dashboard to get a high-level overview of your license servers and user activity. This dashboard helps you monitor license usage patterns, server status, and highlights top users based on usage duration.

![Report Summary](/img/reporting/report-summary.png)

## What you can do

- Monitor real-time license server status.
- Compare total usage time and idle time.
- Identify the top 10 most and least active users.

## Visualizations

### License server status table

This table includes the following fields:

- **Server status**: Shows the current status when the user refreshes the dashboard.
- **Server name**: Displays the name of the license server.
- **Type**: Indicates the type of server.

> **Note:** The status field is color coded:  
> - Green when the server is **Up**.  
> - Red when the status is **CLUSTER_ERROR**, **DATA_ERROR**, **DOWN**, **NO_VALID_LIC_FILE**, or **UNKNOWN**.

### Top 10 most active users

This chart shows the ten users with the highest total usage time. Use this to identify your heaviest license consumers.

### Top 10 least active users

This chart displays the ten users with the lowest total usage time. Use this to find underutilized license allocations.

### Total usage vs. idle time

This chart compares the total session time with idle time across all users. Values are shown in hours.

**Displayed values:**

- **Total usage time (hours)**: Time when the license was actively used.
- **Total idle time (hours)**: Time when the license was checked out but not used.
- **Duration**: Total session length, from session start to end.

## Definitions

- **Duration**: The full session length, calculated as `End time – Start time`. This includes both active and idle time.
- **Total usage time**: The time when a license was actively used by a user.
- **Total idle time**: The time when the license was checked out but not used. This is typically measured using user inactivity tracking.
