---
title: Named license analysis (NNU) report
sidebar_position: 2
description: Overview of the named license analysis report for FLEXlm licenses in OpenLM.
---

## Overview

The **Named License Analysis (NNU)** report provides an overview of license allocation and consumption for your FLEXlm named licenses.

This report helps administrators:

- Determine real usage of named licenses.
- Improve license planning and reduce costs.
- Decide whether to assign more users to NNU licenses, reduce floating license usage, or purchase additional licenses.

:::note
This report can also serve as a self-auditing tool. It displays whether the licenses are being used in accordance with vendor agreements—helping prevent breaches, costly penalties, and legal issues.
:::

---

## Launching the NNU report

To launch the NNU report:

**Path:** `Start → Reports → Named License Analysis (NNU)`

![Named license analysis (NNU) report](/img/legacy/nnu.png)

---

## Report filters and options

### Include current activity

This checkbox toggles whether the report should include named license sessions that are still open but fall within the selected **Date** range.

:::note
This option is only available when viewing the report in **View by → Usage** mode.
:::

---

## View by options

There are three available views for displaying the NNU report:

### 1. Allocation view

- High-level overview of named licenses
- Shows license types, totals, and how many are in use
- Lets you drill down to a specific feature to see current allocation status

![Named license analysis (NNU) report](/img/legacy/nnu1.png)

---

### 2. Usage view

- Detailed view of license allocations
- Displays:
  - Who the license is assigned to
  - Last usage time
  - Usage duration

![Named license analysis (NNU) report](/img/legacy/nnu2.png)

---

### 3. Not in use view

- Highlights licenses least used or not used at all during a specific period

![Named license analysis (NNU) report](/img/legacy/nnu3.png)

---

## Filters

You can apply the following filters to customize your report:

### Vendor name

Filter licenses by **vendor name**.

### Server name

Filter licenses by the **license manager server**.

### Asset-info

Filter licenses by the **asset-info pool** they belong to, to view allocation and usage.

### License model

Filter by license model based on the vendor license file:

- `NamedUser` – license allocated per user
- `HostBased` – license allocated per workstation

### Features

Filter licenses by the **feature** (application) assigned to users.

### Users

- View usage stats for a specific user.
- If the **Date** filter is set to **Today**, see currently allocated named licenses for that user.

### Date

Specify the time range for generating the report.

