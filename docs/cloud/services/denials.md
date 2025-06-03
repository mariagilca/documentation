---
sidebar_position: 9
---

#  Denials

## Overview

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

## Business Value

* **Identify License Bottlenecks**: Spot high denial areas
* **Optimize License Pools**: Prevent overspending
* **Improve User Experience**: Reduce frustration
* **Justify License Adjustments**: Support data-driven decisions

## Process Flow

1. **Denial Occurs**
2. **OpenLM Logs Details** (based on True/Excluded settings)
3. **Admin Views Report**
4. **Apply Filters & Groupings**
5. **Perform Root Cause Analysis**
6. **Take Action**: License/configuration changes

## Quiz (Assessment)

### Multiple Choice (Single Answer)

1. What is the primary purpose of the Denials Report?

   *  C. To track and analyze failed license requests
2. Which parameter is NOT included in a typical denial?

   *  B. User's email address
3. Required to create an exclusion rule:

   *  D. Major Error Code or Error Message

### True/False

4. The Denials Report can justify increasing licenses.  True
5. The report supports multi-dimensional filtering.  True
6. False denials are automatically filtered.  False
7. Entries include feature and product names.  True

### Multiple Answer

8. Available filters:

   *  Denials time range
   *  Server name and vendor
   *  License type
9. Admin actions:

   *  Adjust license counts
   *  Refine configurations
   *  Identify bottlenecks
10. Time filter options:

    *  Last 30 Days
    *  Today
    *  Custom Range

### Final Assessment

1. What does "Track True Denials Only" do?

   *  C. Logs only genuine denials, ignoring those resolved within a defined window
2. Where is 'Excluded Denials' configured?

   *  C. Management
3. License Pull Tolerance affects past data. ❌ False
4. Possible denial causes:

   *  Max users reached
   *  Incorrect user group
   *  License server offline
5. Denial record details:

   *  Workstation name
   *  Software version
   *  Error message


