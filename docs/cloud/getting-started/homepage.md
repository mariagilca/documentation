---
title: Homepage
sidebar_position: 10
description: Tour of the OpenLM Platform Homepage — the dashboard you land on after signing in, with license-server health, denials, and license-pool widgets.
---

The **Homepage** is the screen you land on after you sign in to the OpenLM Platform. It is a native dashboard that surfaces the most important operational signals — offline license servers, denied requests, license-server health, and license-pool utilization — the moment you sign in, each with a one-click path into the underlying view.

:::info[Finding this in the app]
The Homepage opens automatically when you sign in. To return to it at any time, select the **Homepage** shortcut in the app launcher (grid icon, top-right), or select the OpenLM logo.
:::

## Dashboard and Reporting Dashboard

The Homepage has two tabs:

- **Dashboard** — the operational dashboard described on this page: KPI cards and widgets built into the Platform.
- **Reporting Dashboard** — the curated business-intelligence dashboards. For the reports available there, see [BI Reports](/cloud/category/bi-reports).

## Toolbar

The toolbar at the top of the Dashboard controls what the widgets show and gives administrators quick access to common actions.

- **Period** — choose the time range the widgets report on (for example, *Last 30 days*). All widgets on the Dashboard follow this setting.
- **Refresh** — reload the widgets with the latest data. The dashboard shows a short confirmation when the refresh completes.
- **Invite User** — send an invitation for another person to join your OpenLM account. *(Administrators only.)*
- **Activate Product** — open the product catalog to activate an OpenLM service. See [OpenLM Products](/cloud/openlm-administration/products). *(Administrators only.)*
- **Take the Tour** — start a guided walkthrough that introduces each widget. Useful the first time you sign in.

Documentation and Contact Us links are also available from the Homepage. Primary calls to action (Invite User, Activate Product, Take the Tour) are shown only to administrators.

## KPI summary cards

Two summary cards sit at the top of the dashboard and give at-a-glance counts, each with a deep link into the view where you can act:

| Card | Shows | Deep link |
| --- | --- | --- |
| **License servers offline** | How many monitored license servers are currently offline. | **View servers** → [License Servers](/cloud/slm/license-servers) |
| **Denied requests** | How many license requests were denied in the selected period. | **View denials** → [Denials](/cloud/reporting/ui-reports/denials) |

## Widgets

Below the summary cards, a fixed grid of widgets breaks the numbers down. Every widget shares the same behavior for loading, empty, and error states, so the dashboard reads consistently.

- **License Servers Status** — a health donut that splits your license-server fleet into **Healthy**, **Pending**, and **Error** states, with the total in the center. A single outage no longer hides behind an aggregate number.
- **Top 5 Denied Features** — the features where users most often hit a license ceiling in the selected period.
- **Top 5 Features in Use** — the features your teams are actually consuming, shown alongside denied features so you can compare demand against spend.
- **Top 5 Saturated License Pools** — the pools that are maxed out, where more denials are likely.
- **Top 5 Underutilized License Pools** — the pools sitting idle, where licenses can be reclaimed or reallocated.
- **Usage trend** — how usage moves across the selected period.
- **Upcoming expirations & renewals** — licenses approaching their expiry or renewal date, so deadlines don't slip.

:::note
An operational alert bar appears at the top of the Homepage when there are issues to act on, with severity styling so the critical signal stands out.
:::

## Onboarding and trial status

- **Onboarding In Progress** — while your setup is incomplete, a panel in the header tracks your remaining steps and links to the right page in each service, with short video tutorials. If you are still setting up, follow [Get started](/cloud/getting-started/what-is-openlm) end to end.
- **Trial countdown** — accounts on a trial see a countdown and an upgrade path to a paid plan.

## When the widgets are hidden

The Homepage widgets depend on Software License Management being active for your account. If it is not yet active, the widgets stay hidden and a lock card explains the next step rather than showing empty or "no data" panels. Activate the relevant products from **Activate Product** (see [OpenLM Products](/cloud/openlm-administration/products)), then return to the Homepage.

## Related

- [Verify your setup](/cloud/getting-started/verify-setup) — confirm data is flowing before you rely on the widgets.
- [Denials](/cloud/reporting/ui-reports/denials) and [Usage](/cloud/reporting/ui-reports/usage) — the detailed views behind the denial and usage widgets.
- [BI Reports](/cloud/category/bi-reports) — the dashboards on the Reporting Dashboard tab.
