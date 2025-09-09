---
title: Historical license usage reports
sidebar_position: 5
description: Overview of historical license usage reports available in OpenLM EasyAdmin.
---

# Historical license usage reports

OpenLM monitors license data in real time and stores it in a relational database. This supports both:

- Real-time management of network licenses
- Generation of historical license usage reports

This page provides an overview of the historical license reports available in the OpenLM **EasyAdmin** user interface.

## License usage

Navigate to:

**EasyAdmin → Start → Reports → License Usage**

This report shows consumption of single or multiple feature licenses over time, relative to the total available. It helps identify bottlenecks and redundancies in license usage.

The data is available in three formats:

- Table
- Chart
- Heatmap

### Unique features of the License Usage report:

- Zoom in/out on the chart using drag controls
- Choose display style: steps, lines, or smoothed lines
- Apply smart filters by: server, vendor, license type, additional key (e.g., asset info), feature, user, group, or project

#### Filtering options include:

- Selectable time periods (e.g., last 30 days or custom date range)
- **Aggregated usage** checkbox toggles between:
  - Max usage per sample period (hour/day/week)
  - Actual raw usage records

## License activity

The **License Activity** window enables system administrators to generate detailed reports of individual user activity.

Use the **Group by** tab to break down license stats by:

- Workstations
- Features
- Users
- Groups
- Projects

## Projects and group usage

OpenLM supports group- and project-based license usage monitoring. This is commonly used to implement license chargeback (usage-based billing).

:::note
For more details on entities like users, groups, and projects, see the [entity documentation](https://docs.openlm.com/).
:::

## Project usage report

Project-oriented organizations can use this report to view usage time attributed to specific projects, as reported by end users.

:::note
For more information on project-based license usage reporting, refer to [this guide](https://docs.openlm.com/).
:::

## Group usage report

This report shows license usage statistics by group and helps managers and admins understand group-level license demand.

## License utilization (efficiency report)

Navigate to:

**EasyAdmin → Start → Management → License Utilization**

This chart visualizes license usage efficiency. Each column `x` answers:

> What is the percentage of time that at least `x` licenses were in use?

This helps you ignore short-term spikes and focus on real consumption patterns.

The **QoS line** shows how many licenses are needed to satisfy a specific percentage of license requests.

### Example:

If there are 12 available licenses, and the chart shows that **7 licenses support 96%** of requests, then 5 are likely redundant.

![License utilization efficiency](img/license-utilization-efficiency.png)

:::tip
For a deeper explanation of this feature, read [this documentation](https://docs.openlm.com/).
:::

## Additional license usage reports

### Feature usage per group

Navigate to:

**EasyAdmin → Start → Reports → Feature usage per group**

This displays license usage (in hours) of selected features by user group, shown as a stacked vertical bar chart.

Hover over each bar section to view exact usage values.

### Feature usage per user

Navigate to:

**EasyAdmin → Start → Reports → Feature usage per user**

This presents feature usage per selected users or all users in a stacked bar chart format, with hover-enabled details.

## Denied license requests

Navigate to:

**EasyAdmin → Start → Reports → Denials**

This report shows a historical record of license denials.

:::note
Refer to the [supported license managers for denials](https://docs.openlm.com/) and [broker installation guide](https://docs.openlm.com/) for setup help.
:::

### Denials report window features:

- Slice data by:
  - Time
  - User
  - Project
  - Group
  - Workstation
  - Denial type
  - Vendor name
  - License server
  - License type (floating, node-locked)
  - Additional key (e.g., FlexLM asset info)

- View formats:
  - Table
  - Line chart
  - Pie chart

### Filtering options:

- **True denials** checkbox:
  - Filters out irrelevant denials like:
    - Multiple rapid requests from the same user
    - Requests denied by one server but granted by another

- **Aggregated denials** checkbox:
  - Combines repeated denials within a short time span into one entry
  - Example: 5 denials in one minute → shown as a single event if enabled

## Recent feature denials widget

Navigate to:

**EasyAdmin → Start → Widgets → Recent feature denials**

This widget provides quick stats on recent license denials by feature. It displays short-term and long-term denial counts.

![Recent feature denials](img/recent-feature-denials.png)

## There’s more!

In addition to the above reports, OpenLM allows you to create **custom license usage reports** via its configurable platform.

For help or additional guidance, contact: [support@openlm.com](mailto:support@openlm.com)
