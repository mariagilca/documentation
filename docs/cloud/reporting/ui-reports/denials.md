---
title: "Denials"
sidebar_position: 4
description: "The Denials report helps administrators track and analyze failed license requests, find their root causes, and right-size license pools."
---

The **Denials** report records every failed attempt to check out a license and lets you analyze those failures by user, group, feature, server, and more. Use it to find licensing bottlenecks, investigate why requests were refused, and build the case for adding — or reallocating — licenses.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Licenses and Features → Denials**.
:::

The Denials app has three screens, grouped in the left sidebar:

| Screen | Group | What it does |
| --- | --- | --- |
| **Denials** | Reporting | The denial report table — the default view. |
| **General** | Management | Controls which denials are recorded. |
| **Excluded Denials** | Management | Stops specific denials from being stored. |

## The Denials report

Open **Reporting → Denials** to see every recorded denial in a sortable, filterable table. Each row is one denial — a moment when a license request was refused, usually because no license was available.

The report presents historic denial occurrences, which you can aggregate by any dimension OpenLM tracks (user, group, feature, and so on).

![The Denials report table, with columns for time, feature, server, vendor, and license type](/img/reporting/denials/report.png)
*The Denials report — one row per denial, with filtering, sorting, and column controls.*

### What you can see

Each denial can display the following columns:

| Column | What it shows |
| --- | --- |
| Time | When the denial occurred |
| Feature Name | The licensed feature that was requested |
| Product Name | The product the feature belongs to |
| Server Name | The license server that handled the request |
| Vendor Name | The license manager or vendor daemon |
| License Type | The license model, for example Floating |
| Version | The requested software version |
| Additional Key | An additional license key, if any |
| Total Available Licenses | Licenses in the pool at the time of the request |
| User Name | The user whose request was denied |
| Workstation | The machine the request came from |
| Error | The error returned by the license manager |
| Group | The user's group |

To show, hide, or pin columns, open the column menu (the **⋮** icon at the right of the header row) and choose **Columns**.

### Filter the report

The controls above the table narrow what you see:

- **Denials Time** — Limit the report to a period. Choose a preset (**Last 7 Days**, **Last 30 Days**, **Last 60 Days**, **Last 180 Days**, or **Last 360 Days**), or pick **Custom** and select a start and end date on the calendar.
- **Show true denials only** — Hide "false" denials — requests that were refused by one server but satisfied elsewhere. See [Configure which denials are recorded](#configure-which-denials-are-recorded) for how true denials are defined.
- **Filters** (funnel icon) — Toggle per-column filters on and off. When enabled, a filter box appears under each column header so you can filter by that column's value.
- **Search** — Free-text search across the table.
- **Refresh** — Reload the latest data.

Use the pager at the bottom of the table to change the page size and move between pages.

## Configure which denials are recorded

Open **Management → General** to control what OpenLM stores as a denial.

![The General settings screen showing License Pull Tolerance and the Track True denials only checkbox](/img/reporting/denials/general.png)
*General settings control which denials OpenLM records.*

- **License Pull Tolerance (seconds)** — A grace window (default **60**). If a user is denied on one server but successfully pulls the same license from a *different* server within this interval, the initial denial is treated as false and is not counted as a true denial.
- **Track True denials only** — When enabled, OpenLM does not record a denial if the license was ultimately granted by a different pool or license server, and it drops false denials (per the License Pull Tolerance window above). This is a global setting that applies to the whole Denials report. It affects **new data only** — denials already in the database are not changed and may still contain false denials.

Select **Save** to apply your changes, or **Cancel** to discard them.

## Exclude specific denials

Some denials are noise — recurring license-manager errors that you never want stored. Open **Management → Excluded Denials** to create exclusion rules. A denial is dropped when it matches a license server **and** a Major Error Code or Error Message you have registered for that server. A server with no error rules excludes nothing.

The screen has two panels:

- **Left** — the license servers that have exclusion rules, each with its **License Manager** type.
- **Right** — the **Major Error Code** and **Error Message** rules for the selected server.

![The Excluded Denials screen with a license-servers panel on the left and an error-rules panel on the right](/img/reporting/denials/excluded-denials.png)
*Excluded Denials: select a server on the left, manage its error rules on the right.*

### Add an exclusion rule

1. Select **+ Add Error**.
2. In the **Add Excluded Error** dialog, enter the **Major Error Code** and/or **Error Message** to match.
3. Choose the **License Server** the rule applies to.
4. Select **Save**.

![The Add Excluded Error dialog with Major Error Code, Error Message, and License Server fields](/img/reporting/denials/add-excluded-error.png)
*The Add Excluded Error dialog.*

From that point on, matching denials are no longer stored. To remove a rule, select it in the right panel and choose **Delete**.

:::note[About the Major Error Code]
The **Major Error Code** is the number your license manager returns with the denial — it's specific to that manager, not an OpenLM code. On FlexLM/FlexNet-based servers (Autodesk, Esri, and many others), common codes are `-4` (all available licenses in use), `-15` (cannot connect to the license server), `-10` (feature has expired), and `-18` (server does not support this feature); other managers (DSLS, RLM, Sentinel, and so on) use their own.

Exclude the codes that are noise for you — connection errors, for example — rather than genuine shortages such as `-4`, which you usually want to keep. Find the exact codes and messages to exclude in existing denial reports, database queries, or your license manager's documentation.
:::

## Related reports

- **[Denial Analysis](/cloud/reporting/bi-reports/basic-reports/denial-analysis/denials-report)** — BI dashboards that summarize denials by user and feature, with drill-through to a details table.
- **[Shadow denials](/cloud/reporting/bi-reports/basic-reports/shadow-denials)** — Capping events where OpenLM restricted usage under a shadow-license policy.
- **[What to do when you get a denial](/cloud/for-end-users/dealing-with-denials)** — Guidance for end users who hit a denial.
