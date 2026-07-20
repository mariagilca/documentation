---
title: Homepage
sidebar_position: 10
description: Tour of the OpenLM Platform Homepage — the dashboard you land on after signing in, with license-server health, denials, and license-pool widgets.
---

The **Homepage** is the screen you land on after you sign in to the OpenLM Platform. It is a native dashboard that surfaces the most important operational signals — license-server health, denied features, feature usage, and license-pool utilization — the moment you sign in.

:::info[Finding this in the app]
The Homepage opens automatically when you sign in. To return to it at any time, select the **Homepage** shortcut in the app launcher (grid icon, top-right), or select the OpenLM logo.
:::

## Dashboard and Reporting Dashboard

The Homepage has two tabs:

- **Dashboard** — the operational dashboard described on this page: the widgets built into the Platform.
- **Reporting Dashboard** — the curated business-intelligence dashboards. For the reports available there, see [BI Reports](/cloud/category/bi-reports).

## Toolbar

The toolbar at the top of the Dashboard controls what the widgets show and gives administrators quick access to common actions.

- **Period** — choose the time range the widgets report on: **Last 7 days**, **Last 14 days**, or **Last 30 days**. All widgets on the Dashboard follow this setting.
- **Refresh** — reload the widgets with the latest data.
- **Invite User** — send an invitation for another person to join your OpenLM account. *(Administrators only.)*
- **Activate Product** — open the product catalog to activate an OpenLM service. See [OpenLM Products](/cloud/openlm-administration/products). *(Administrators only.)*

Primary calls to action (Invite User, Activate Product) are shown only to administrators.

## Widgets

The Dashboard shows a fixed grid of widgets. Widgets link through to the underlying view and share the same behavior for loading, empty, and error states, so the dashboard reads consistently.

- **License server status** — the health of your monitored license-server fleet, so a single outage no longer hides behind an aggregate number.
- **Top denied features** — the features where users most often hit a license ceiling in the selected period.
- **Top features in use** — the features your teams are actively consuming, shown alongside denied features so you can compare demand against spend.
- **License pool saturation** — the pools that are maxed out, where more denials are likely.
- **License pool underutilization** — the pools sitting idle, where licenses can be reclaimed or reallocated.
- **Upcoming expirations** — licenses approaching their expiry or renewal date, so deadlines don't slip.
- **Recently expired licenses** — licenses that expired during the selected period.

If you are still setting up, follow [Get started](/cloud/getting-started/what-is-openlm) end to end so your components begin reporting the data these widgets show.

## When the widgets are hidden

The Homepage widgets depend on Software License Management being active for your account. If it is not yet active, the widgets stay hidden and a lock card explains the next step rather than showing empty or "no data" panels. Activate the relevant products from **Activate Product** (see [OpenLM Products](/cloud/openlm-administration/products)), then return to the Homepage.

## Related

- [Verify your setup](/cloud/getting-started/verify-setup) — confirm data is flowing before you rely on the widgets.
- [Denials](/cloud/reporting/ui-reports/denials) and [Usage](/cloud/reporting/ui-reports/usage) — the detailed views behind the denial and usage widgets.
- [BI Reports](/cloud/category/bi-reports) — the dashboards on the Reporting Dashboard tab.
