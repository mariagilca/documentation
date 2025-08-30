---
sidebar_position: 9
---

#  Denials



The OpenLM Denials Report helps administrators track and analyze failed license requests, identify root causes, and optimize license distribution. This guide explains how to access, configure, and interpret the report.

> **Applies to Roles**: Admin only

## Purpose

The Denials Report records each failed attempt to acquire a license. It includes key data such as:

* Time of request
* User attempting the request
* Requested feature
* Error or reason for denial

Administrators use this report to:

* Track and investigate license denials
* Identify bottlenecks and trends
* Optimize license pools
* Justify license adjustments

## Key Features

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

## Accessing the Report

Navigate to **Reporting > Denials Report** in the OpenLM interface.

### Interface Overview

* Main table shows all recorded denials
* Filters:

  * **Show true denials only** checkbox
  * **Server Name** and **Vendor Name**
  * **Denials time** selector
  * **Search** bar for keywords

### Filtering

* License Type: Filter by Floating, Named User, etc.
* Use **APPLY** to activate filters
* Use **CLEAR** to reset filters

## Report Details

Scrolling the report reveals all denial data:

* Requested software version
* Additional key (if applicable)
* Total available licenses
* Username and workstation
* Error message
* Group (e.g., user group or denial type)

## Time Filtering

Use the **Denials time** filter to focus on specific periods:

* Presets: Today, Yesterday, Last 7 Days, Last 30 Days
* **Custom Range**: Choose specific start and end dates
* Time filter affects visible data, not sorting

## Configuring Denial Logging

Navigate to **Management > General** to configure settings:

### True Denials

* **License Pull Tolerance**: Defines a window (e.g., 60s) to ignore transient denials
* **Track True Denials Only**: When enabled, logs only unresolved denials
* Changes apply to future data only

### Excluding Denials

Go to **Management > Excluded Denials**:

* Select a License Server
* Use **+ Add Error** to exclude:

  * Specific **Major Error Codes**, or
  * Exact **Error Messages**
* Matching denials will not be stored

### Exclusion UI Features

* Server list shows name and license manager type
* Context menu options:

  * Restore default columns
  * Print server list

### Adding Rules

In the **ADD EXCLUDED ERROR** dialog:

* Select target **License Server**
* Enter **Major Error Code** or **Error Message** (one is required)
* Click **SAVE** to apply the rule


## Process Flow

1. **Denial Occurs**
2. **OpenLM Logs Details** (based on True/Excluded settings)
3. **Admin Views Report**
4. **Apply Filters & Groupings**
5. **Perform Root Cause Analysis**
6. **Take Action**: License/configuration changes


