---
title: "Denials"
sidebar_position: 4
description: "Denials Report helps administrators track and analyze failed license requests, identify root causes, and optimize license distribution."
---

Denials Report helps administrators track and analyze failed license requests, identify root causes, and optimize license distribution. This guide explains how to access, configure, and interpret the report.

> **Applies to Roles**: Admin only

## Purpose

Denials Report records each failed attempt to acquire a license. It includes:

* Time of request
* User attempting request
* Requested feature
* Error or reason for denial

Administrators can:

* Track and investigate license denials
* Identify bottlenecks and trends
* Optimize license pools
* Justify license adjustments

## Key features

* **Historical Log**: Records all past denials
* **Filtering & Grouping**: Filter by time, user, feature, group, or server
* **Sorting**: Sort by server, vendor, license type, and more
* **Detailed Parameters**: Each denial includes:

  * Time
  * Feature and Product name
  * Server and Vendor
  * License type and software version
  * Additional license key (if any)
  * Total available licenses
  * Username and workstation
  * Error message and group

## Access the denials report

Navigate to **Reporting** then **Denials Report** in OpenLM interface.

### Interface overview

* Main table shows all recorded denials
* Filters:

  * **Show true denials only** check box
  * **Server Name** and **Vendor Name**
  * **Denials time** selector
  * **Search** bar for keywords

### Filtering

* License Type: Filter by Floating, Named User, and so on.
* Use **APPLY** to activate filters
* Use **CLEAR** to reset filters

## Report details

Scrolling the report reveals all denial data:

* Requested software version
* Additional key (if applicable)
* Total available licenses
* Username and workstation
* Error message
* Group (for example, user group or denial type)

## Time filtering

Use the **Denials time** filter to focus on specific periods:

* Presets: Today, Yesterday, Last 7 Days, Last 30 Days
* **Custom Range**: Select specific start and end dates
* Time filter affects visible data, not sorting

## Configuring denials logging

Navigate to **Management > General** to configure settings:

### True denials

* **License Pull Tolerance**: Defines a window (for example, 60s) to ignore transient denials
* **Track True Denials Only**: When activated, logs only unresolved denials
* Changes apply to future data only

### Excluding denials

Go to **Management then Excluded Denials**:

* Select a License Server
* Use **+ Add Error** to exclude:

  * Specific **Major Error Codes**, or
  * Exact **Error Messages**
* Matching denials will not be stored

### Exclusion UI features

* Server list shows name and license manager type
* Context menu options:

  * Restore default columns
  * Print server list

### Adding rules

In **ADD EXCLUDED ERROR** dialog:

* Select target **License Server**
* Enter **Major Error Code** or **Error Message** (one is required)
* Select **SAVE** to apply the rule


## Process flow

1. **Denial occurs**
2. **OpenLM logs details** (based on True/Excluded settings)
3. **Admin views report**
4. **Apply filters & groupings**
5. **Perform root cause analysis**
6. **Take action**: License/configuration changes


