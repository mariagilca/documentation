---
title: OpenLM EasyAdmin user interface
sidebar_position: 3
description: Overview and usage guide for the OpenLM EasyAdmin user interface
---

## Overview

The OpenLM EasyAdmin user interface is the primary administrative interface for reporting and system configuration. It is accessible from any modern web browser, such as Mozilla Firefox, Microsoft Edge, or Google Chrome.

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin.png)

## Startup

EasyAdmin is installed as part of the OpenLM SLM installation and typically requires no changes to access.

You can launch it by:

- Clicking **Start → All Programs → OpenLM → OpenLM EasyAdmin User Interface**
- Entering the following URL in a browser: `http://localhost:5015/`

To access it from another machine, replace `localhost` with the hostname or IP address of the OpenLM SLM.

EasyAdmin uses the Kestrel web server, and the default port is `5015`.

## EasyAdmin interface properties

### OpenLM icon properties

Left-click the OpenLM icon in the top-left corner to access presentation options. The **Properties** option allows you to set a default window to open at launch and configure the refresh rate.

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin1.png)
### Filters

Most windows have a filter pane, typically on the left. You can:

- Change filter position (Left, Right, Down, Up) via the gear icon.
- Fill in filter fields and click **Apply** to get results.
- Leave fields blank to query all options.
- Save filter configurations with the funnel icon (stored in browser cache).
- Share filters using the **Share** icon.

### Display area

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin2.png)

Some windows have tabbed display areas, e.g. **Table** and **Group by**.

You can:

- Customize column visibility from column headers.
- Sort or reorder columns.
- Download contents as CSV, PNG, or print.

### Sharing reports

Click the **Share** button on any report to share via:

- Link
- Email
- Schedule (requires OpenLM Report Scheduler)

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin3.png)

Shared views preserve filters and are ideal for periodic reports or public dashboards.

## Report scheduling

To schedule a report:

1. Configure EasyAdmin email settings.
2. Open the desired report window (e.g., License Usage).
3. Assign it to a user and optional recipients.
4. Set up the schedule.

:::tip
Refer to the [EasyAdmin Reports Scheduler](#) document for more details.
:::

## Dashboard

The dashboard provides a system overview including:

- License server status
- OpenLM Broker status
- Top 10 usage status

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin4.png)

### Widgets

Access via **Start → Widgets**. Available widgets include:

#### License servers

View server and broker status:

- **Green**: Server up
- **Yellow**: Issues (e.g., Broker down)
- **Red**: Server down

Includes:

- License totals and links to inventories
- Broker version, JRE version, import options

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin5.png)

#### Host availability

Waveform chart of server activity over time.

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin6.png)

#### Alerts

Define conditions and actions for license alerts. Alerts can appear in EasyAdmin or be emailed.

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin7.png)

#### Recent feature denials

Preliminary stats on license denials per feature.

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin8.png)

#### Feature usage status

Displays license utilization with green-to-red indicators.

### Miscellaneous reports

- General statistics
- Selected feature statistics
- Operational reports

## License usage reports

### Currently consumed licenses

Lists active sessions with:

- User info (name, phone, email, group)
- Feature details (version, vendor, product)
- Session info (start time, duration)
- Idle time metrics
- Action buttons to close or release licenses

### Released licenses

Shows licenses manually released by an admin.

### Historical reports

Access via **Start → Reports**:

#### License usage

Tracks usage patterns of features. Available in:

- Table
- Chart
- Heatmap

Options include:

- Custom date ranges
- Zoom for charts
- Aggregated vs actual usage

#### License activity

Generates usage reports grouped by:

- Workstations
- Features
- Users
- Groups
- Projects

#### Denials

Shows historical denials (for FlexLM and IBM-LUM). Must use OpenLM Broker.

Options:

- Display as chart or table
- Filter by time, user, project
- “True denials” filter excludes irrelevant events

#### Projects and group usage

Track usage by groups and projects. Useful for chargeback and billing.

## Management

### License procurement

Lists available licenses and includes:

- Package and feature properties
- Expiration indicators
- FlexLM info

### Projects

Create and manage projects, including:

- Name
- Start/end time
- Working hours
- Priority
- Completion %

### License efficiency

Two helpful charts:

- **License utilization**: Histogram showing license use frequency.
- **Licenses not in use**: List of unused licenses.

## Users and entities

### Users and groups

Add or manage:

- Users
- Groups
- Workstations
- Group memberships
- Passwords

### FLEXlm options files

Control license access for users, groups, hosts, or IPs. Features can be:

- Dedicated
- Denied
- Reserved

## Administration menu
The Administration menu is OpenLM’s interface to a wide variety of administrative activities. 

![OpenLM EasyAdmin user interface](/img/legacy/easyadmin9.png)


### System & security

- Set default time zone
- Set logging level
- Enable emails
- Configure security

### Active Agent configuration

Control features related to the OpenLM Agent (e.g., idle retrieval).

- Active Agent
- Agent policy
- Agent procedures
- Monitored processes
- Unmanaged processes

### Working days & hours

Configure organizational work hours for accurate usage reporting.

### Show/hide features

Hide selected features from reports. Usage data remains available.

### Product packages

Manually organize features into product packages.

### Directory sync

Sync with directory services. Requires Directory Sync module.

### Options files settings

Control options file behavior, including data direction.

### File fetching

Set fetch options for license server files.

### Alerts

Manage alert setup:

- Email config
- Alert definitions

### Roles

Configure role-based access controls.

### OpenLM license

View license details and capabilities.

### Cleanup manager

Permanently delete old data. Backup before use.

:::caution
Cleanup is irreversible. Always back up the database first.
:::

### Checkout policy

Configure license usage counting method:

- One license per user/workstation
- One license per session

### Applications manager

Settings for OpenLM Applications Manager.

### Denials

Configure denial data handling.

### Token-Flex

Set up Token-Flex server integration.

### External platforms

Manage connections to external tools (e.g., ServiceNow).

## Connecting to EasyAdmin User Interface

1.EasyAdmin comes with a lightweight Web server: Kestrel. The default port for connecting to EasyAdmin User Interface is 5015.
2.The default EasyAdmin User Interface URL is http://localhost:5015
3.To connect to EasyAdmin from a different machine on the network, simply replace ‘localhost’ with the target OpenLM SLM hostname.

If EasyAdmin won't launch:

1. Check that OpenLM SLM is running.
2. Ensure port `5015` is open in the firewall.

If issues persist, contact [support@openlm.com](mailto:support@openlm.com).
