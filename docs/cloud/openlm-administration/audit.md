---
title: "Audit"
sidebar_position: 4
description: "Use Audit to review the events that OpenLM components record — logins, configuration changes, errors, and other activity — in a single filterable, exportable list."
---

Use **Audit** to review the events that OpenLM components record across your account. Each OpenLM service reports notable activity — logins, configuration changes, errors, and other operations — to Audit, which collects them into a single **Events** list you can filter, inspect, and export. Audit is a read-only view; it helps you troubleshoot problems and see what happened, when, and who was involved.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Platform Administration → Audit**.

**Related:** [OpenLM Products](./products) · [Alerts](/cloud/automations/alerts) · [Notifications](/cloud/automations/notifications)
:::

## Overview

Audit aggregates events emitted by OpenLM Platform components so you can review them in one place. It helps you:

- Troubleshoot problems by finding the errors a component recorded and reading their descriptions.
- Track activity across OpenLM Platform — which component did what, when, and for which user.
- Investigate a specific action, such as a failed login or a configuration change, without opening each component separately.

Every event is a single record with a fixed set of fields: the **System Component** that reported it, a severity **Type**, the **Date and Time** it occurred, an event **Name**, the **User** it relates to, and a free-text **Description**. Audit does not modify or generate events itself — it only displays what other components report.

Audit is one of the OpenLM [system products](./products#system-products), so it is always active for your account. Access is limited to administrators (see [Access and permissions](#access-and-permissions)), and each account sees only its own events.

## The Events screen

**Events** is the only screen in Audit, reached from **Reporting → Events** in the left navigation. It has three parts:

- A **filter bar** across the top — the **System Component**, **Type**, **Name**, and **User** filters, with the **Apply** and **Clear** buttons.
- A **toolbar** above the results — the **Date and Time** range picker, and the **Export CSV**, **Refresh**, and **Search** controls.
- The **results grid**, which lists the matching events.

Select the information icon (**ⓘ**) next to the **Events** heading for an in-app summary of how the filters and buttons work.

When you first open the screen, the grid is empty and shows the prompt *Select and apply the "Filters" to get the report*. The results appear after you select **Apply** for the first time.

![The Audit Events screen: the System Component, Type, Name, and User filters across the top, and the results grid listing events with their component, type, date and time, name, user, and description.](/services/openlm_administration/audit-events.png)
*Figure 1. The Events screen, with the filter bar above the results grid.*

## Filter events

The filter bar has four filters. Each is a multi-select list whose options are drawn from the events in your account, so you only ever choose values that actually exist in the data.

| Filter | What it narrows by |
|---|---|
| System Component | The OpenLM component that reported the event — for example `OpenLM.SecurityService`, `BrokerHub`, `LicenseAccessControl.API`, `VirtualLicenseManager`, or `OpenLM.ProductsService`. |
| Type | The event severity: **Information**, **Warning**, or **Error**. |
| Name | The event name, such as `Successful login` or `GetPhysicalLicenseManagersList`. |
| User | The user the event relates to. |

To run a report:

1. Open one or more filters and select the values you want. Each filter has a search box for finding values in a long list.
2. Select **Apply**. The grid loads the events that match every filter you set.
3. To start over, select **Clear**. This empties all four filters and reloads the full, unfiltered list of events.

Selecting **Apply** with no filters set returns all events for your account.

![The System Component filter open, showing a searchable, multi-select list of the OpenLM components that have reported events.](/services/openlm_administration/audit-filter-component.png)
*Figure 2. Each filter is a searchable, multi-select list populated from your account's events.*

## Narrow by date and time

The **Date and Time** picker above the grid restricts the report to a time window. It is optional and independent of the filter bar — by default no date filter is applied and the report covers all recorded events.

Select the calendar to choose a range. Use the **Select Preset** menu for a quick window — **Last 7 Days**, **Last 30 Days**, **Last 60 Days**, **Last 180 Days**, or **Last 360 Days** — or choose **Custom** and pick the start and end dates yourself. The grid reloads for the selected range.

![The Date and Time picker with a calendar and a Select Preset menu offering Last 7, 30, 60, 180, and 360 Days, plus Custom.](/services/openlm_administration/audit-date-range.png)
*Figure 3. The Date and Time picker limits the report to a preset or custom time window.*

## Search within the results

The **Search** box in the toolbar highlights the text you type wherever it appears in the events currently shown in the grid. It is a highlight aid for scanning a loaded page, not an additional filter — it does not change which events the report returns. To change the result set, use the filters and the date range instead.

## View event details

The **Description** column is truncated in the grid. To read an event in full, hover over its row and select the **View** icon that appears at the end of the row. The **Event Description** dialog opens with the event's complete details — **System Component**, **Type**, **Date and Time**, **Name**, **User**, and the full **Description**. Select the close (**✕**) icon to return to the grid.

![The Event Description dialog showing a single event's System Component, Type, Date and Time, Name, User, and full Description.](/services/openlm_administration/audit-event-details.png)
*Figure 4. The Event Description dialog shows an event's full, untruncated details.*

## Sort and page through results

Select a column header to sort by that column; select it again to reverse the order. Every column can be sorted except **Description**.

The results are paged. Use the **Items per page** control and the page arrows at the bottom of the grid to move through large result sets. Selecting **Refresh** in the toolbar reruns the current report.

## Export to CSV

Select the **Export CSV** icon in the toolbar to download the report. The export includes **all** events that match the current filters and date range — not only the page shown on screen — and applies the current sort order. The file is named `Audit Events.csv` and contains the same columns as the grid: System Component, Type, Date and Time, Name, User, and Description. CSV is the only export format.

## Event types

Audit classifies every event with one of three severities:

| Type | Meaning |
|---|---|
| Information | A normal operation was recorded, such as a successful login or a routine query. |
| Warning | A condition worth noting that did not stop the operation. |
| Error | An operation failed; the Description usually explains why. |

## Columns

The results grid shows six columns:

| Column | Description |
|---|---|
| System Component | The OpenLM component that reported the event. |
| Type | The event severity — Information, Warning, or Error. |
| Date and Time | When the event occurred, shown in your configured date format and time zone. |
| Name | The name of the event. |
| User | The user the event relates to. |
| Description | A free-text description of the event, truncated in the grid and shown in full in the [Event Description dialog](#view-event-details). |

## Access and permissions

Audit is available to administrators only. To open the Events screen, your OpenLM account must have an administrator role — an **Account Administrator**, **System Administrator**, or a dedicated **Audit** administrator role. Users without one of these roles do not see Audit in the app launcher and cannot open the screen.

Events are scoped to your account: you see only the events recorded for your own OpenLM account, never those of other tenants.

## Data retention

Audit keeps events for a limited time rather than indefinitely. In OpenLM Cloud, event storage and retention are managed by OpenLM Platform. In on-premises deployments, a scheduled job removes events older than a configurable retention period (90 days by default). Export the events you need to keep with [Export to CSV](#export-to-csv) before they age out.
