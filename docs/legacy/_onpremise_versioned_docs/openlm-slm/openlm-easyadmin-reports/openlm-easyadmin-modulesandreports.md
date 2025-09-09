---
title: OpenLM Easy Admin user interface modules and reports
sidebar_position: 1
description: Overview of the EasyAdmin modules and reports, including dashboard, license usage, alerts, and administration tools.
---

# EasyAdmin user interface

The EasyAdmin user interface is the main OpenLM UI for reporting and system configuration. It is accessible from standard browsers like Mozilla Firefox, Microsoft Edge, Apple Safari, and Google Chrome.

## Dashboard

The dashboard provides a quick overview of system status:

- License server status
- OpenLM Broker status on each license server
- General statistics on daily and weekly license usage
- License server health summary
- Alerts and system messages

It features a Windows-like interface that facilitates access and management within a browser.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports.png)

## Widget windows

### License servers

This window shows the monitored license servers and their associated OpenLM Brokers.

- **License server status:**
  - **Green:** Server is up
  - **Yellow:** Issue detected (e.g., Broker down, LM down, time mismatch)
  - **Red:** No communication with the license server

- **License data:**
  - Total licenses (linked to inventory table)
  - Used licenses (linked to currently consumed licenses)
  - Borrowed licenses
  - Usage percentage

- **Broker actions:**
  - Import license or options files
  - Upload license files and restart
  - View Broker and JRE versions
  - View server time

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports1.png)


### Host availability

This diagram shows the server’s activity over time.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports2.png)

### General statistics

Presents statistical summaries of license utilization and user activity.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports3.png)

### Alerts

The Alerts module ensures system stability. It allows you to:

- Define alert conditions
- Configure actions like UI alerts, logs, email, or SMS

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports4.png)

### Recent features denials

Displays preliminary statistics for license denials per feature.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports5.png)

## Feature usage status

Shows:

- Number of used and borrowed licenses
- License usage percentage
- Filter option to add specific features

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports6.png)

## Operational

### Currently consumed licenses

Shows real-time license checkout data.

:::note
Many license managers don’t provide real-time usage data.
:::

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports7.png)

Other features:

1. View active vs. idle session periods by clicking the crescent icon.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports8.png)

2. Authorized managers can retrieve a license from any user if needed.

### Released licenses

Displays license check-ins. Relevant only if extensions like ESRI ArcGIS, Autodesk, or Application Manager rules are used.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports9.png)

## Management

### Licenses

Lists all available licenses with filtering options.

- Supports FlexNet packages (e.g., AutoCAD)
- Unused licenses can be highlighted

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports10.png)

### Licenses not in use

Highlights licenses that haven’t been used for a predefined period.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports11.png)

### License utilization

This chart answers: _“What percentage of time were at least X licenses in use?”_

- Ignores momentary spikes
- Quality of Service (QoS) line shows required licenses for a percentage of requests

:::tip
You may only need 7 out of 12 licenses to support 96% of requests.
:::

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports12.png)

### License procurement
![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports.png)
Displays license inventory from the OpenLM database:

- Feature and product details
- License quantity and dates
- Vendor and asset information

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports13.png)

### Audit report

PDF report summarizing OpenLM deployment status, including:

- Installed components
- Vendor daemons and license services
- Unique user count for the last 3 months

This report is required during maintenance renewals.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports14.png)

## Reports


### Active users report

Reports all users active in the monitored time range.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports15.png)

### Projects

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports16.png)

### Project usage

View license usage time by user group or project. Supports manual and Active Directory-based grouping.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports17.png)

:::tip
Use this report to implement chargeback (license billing).
:::

### Group usage

Displays license usage by group.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports18.png)

### License usage

Compares actual usage to available licenses.

View formats:

- Table
- Chart
- Heatmap

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports19.png)
![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports20.png)
![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports21.png)

Key filters:

- Customizable time ranges
- Zoom on chart view
- Aggregated vs. actual usage display

### License activity

Displays all sessions using monitored licenses.

- By default, only shows completed sessions (start and end time)
- Can be configured to show active sessions
- Grouping options: Server, Vendor, Workstation, Feature, User, Group, Project

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports22.png)

### License allocation

Find which licenses are allocated to whom and view usage stats.

- Use filters to narrow down results
- View data in a table format

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports23.png)

### Named license analysis (NNU)

Provides FLEXlm named license consumption overview.

Benefits:

- Optimizes license planning
- Reduces unnecessary floating licenses

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports24.png)

Refer to the knowledge base for more.

### Denials

Shows historical license denial events.

:::note
Only available if your license server supports denials (e.g., FlexLM, DSLS, IBM-LUM).
:::

Requirements:

- OpenLM Broker installed on license server
- Filters include: time, user, group, workstation, denial type, license type, etc.
- View options: pie chart, line, or table
- “True denials” option filters out irrelevant denial records

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports25.png)
![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports26.png)
![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports27.png)

### Feature usage per group

Displays usage in hours for selected features across user groups using stacked bar charts.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports28.png)

### Feature usage per user

Displays usage in hours for selected features across users using stacked bar charts.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports29.png)

## TokenFlex

Token Flex is Autodesk’s pay-as-you-go licensing model using a pool of tokens.

Reports available:

### TokenFlex usage

- Total tokens consumed per product family
- Consumption time
- View by user
- Data shown with 48-hour delay

### Double token consumption

Highlights potential duplicate charges for the same product in one workday.

### Released idle licenses

Shows suspected cases of idle license charges.

## Administration

### EasyAdmin UI – administration

Config screens let users set their preferences.

:::tip
Working hours affect calculated statistics shown in reports.
:::

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports30.png)

### User settings

User preferences affect how data is displayed.

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports31.png)

### Groups window

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports32.png)

Manage and view license-related group data.

### Users and permissions – Workstations window

Displays all connected workstations, including:

- Hostname
- Agent version (if available)
- Online/offline status
- Idle time
- Controlled status (for supported systems)

![OpenLM Easy Admin user interface modules and reports](/img/legacy/easyadmin-reports33.png)
