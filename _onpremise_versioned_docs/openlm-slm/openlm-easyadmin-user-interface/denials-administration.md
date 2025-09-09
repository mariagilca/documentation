---
title: Denials administration in OpenLM
sidebar_position: 2
description: Manage license denials, exclusions, and aggregation using OpenLM’s administration tools.
---

# Denials administration

The **Denials** screen in EasyAdmin provides tools for managing license denial records collected by OpenLM. It allows administrators to configure what denial data is stored, exclude specific denials, and set aggregation rules.

## Denials settings

Located in **Start > Administration > Denials**, this section controls how denial data is collected.

### Track true denials only

If enabled:

- Denials are not recorded when a license was initially denied but later granted by another license pool or server.
- All false denials, as defined by the *License Pull Tolerance Interval*, are excluded.
- This applies only to newly collected data. Historical records remain unaffected.

### License pull tolerance interval

This setting defines a time window (in seconds). If a license is successfully pulled from a different server within this period, the denial is marked as false and excluded.

## Excluded denials

Exclude denials from reports when specific conditions match:

- Match by **License Server**, and either:
  - **Major Error Code**, or
  - **Error Message**

If no code or message is entered, records for that server are **not excluded**.

### Steps to exclude denials

1. Identify the Major Error Codes and/or Error Messages from reports, queries, or documentation.
2. Go to **Start > Administration > Denials**.
3. In the **License Servers** panel, click **Add**.
4. Select a license server from the dropdown.
5. Press **Enter** to populate the Type field.
6. In the **Denials Data** panel, click **Add**.
7. Enter the **Major Error Code** and/or **Error Message**.
8. Press **Enter** to commit.
9. Repeat to add more codes or servers.
10. Click **Save** to apply.

:::note
Only **Major Error Codes** should be used. Minor Error Codes are not supported for exclusion filtering.
:::

## Reviewing the excluded denials setup

You can verify exclusion rules by checking if excluded denials no longer appear in reports.

Steps:

1. Open **Start > Reports > Denials**.
2. Filter by Server Name and the excluded Error Message.
3. Adjust the **Start Time** to after the exclusion rule was saved.
4. Click **Apply**.

Expected result: _No Results Found._

:::tip
Run the same report for a broader time range (before the rule was set) to confirm the exclusion setup is working.
:::

If results still appear for the exclusion period, contact [support@openlm.com](mailto:support@openlm.com).

## Aggregation settings

Aggregation groups repeated denials within a specified time window, simplifying reports.

### How to configure aggregation

1. Go to **Start > Administration > Denials**.
2. Click the **Aggregation Settings** tab.
3. Click **Add** at the bottom of the Aggregation Interval panel.
4. Select a license server from the dropdown.
5. Set the **Time Interval** (in minutes).
6. Choose **Enabled** or **Disabled** for that server.
7. Click **Save** to apply.

### Viewing aggregated denials

1. Navigate to **Start > Reports > Denials**.
2. Enable **Show Aggregated Denials**.
3. Filter by server and time period.
4. Click **Apply**.

The aggregated report displays denials grouped by the selected interval.

---
