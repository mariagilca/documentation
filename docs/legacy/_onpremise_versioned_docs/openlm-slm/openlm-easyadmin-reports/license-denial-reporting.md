---
title: License denials reporting
sidebar_position: 4
description: How to configure OpenLM to monitor and report license denials across different license managers.
---

# License denials reporting

OpenLM monitors and optimizes the license usage of various license managers such as FlexLM, DSLS, IBM-LUM, Reprise RLM, and many others. As part of this activity, OpenLM also produces license denial reports, i.e., an account of events where the license server has declined an application license request.

The quantity of license denials is a key parameter in license maintenance and in the planning of additional license procurement.

This document addresses the required configurations for obtaining these reports for the FlexLM, DSLS, IBM-LUM, and Reprise RLM license managers.

## The denials report

License denial information is presented in OpenLM’s EasyAdmin web interface. The report can be accessed by going to:

**EasyAdmin → Start → Reports → Denials**

The Denials report window includes:

- Details of the denial event (e.g., denied username and workstation, time, license server, denied feature and vendor)
- The cause for denial (e.g., limit of available licenses reached or user is on the Options file exclude list)
- A “Group by” filter to display denials according to categories such as features, vendors, users, period, servers, etc.
- Different views to display denial events: table or different chart types
- **True Denials** toggle

:::note
After being denied a software license, a user may still receive a license automatically if:
1. A license for the same feature is available in a different pool on the same license server
2. A license is available on another license server.

In such cases, a denial is still written in the log, even if the user ultimately receives a license.

OpenLM can filter out such cases and keep only those when the user did not receive a license. These are referred to as **True Denials**.

**Note:** If the **Track True Denials only** box was checked in the **Administration → Denials** panel during the period selected for the report, this toggle has no effect.
:::

Additional features:

- Ability to export the report data to a CSV file
- Ability to share the report by link, by email, or to schedule it (requires OpenLM Reports Scheduler)
- Ability to save preset report filters for easy recall

![Example Denials Report](img/denials-report-autodesk-example.png)

## Setting up OpenLM to monitor license denials

To produce denial reports for monitored licenses, you must:

1. Install the OpenLM Broker on the license server machine.
2. Connect the Broker to the OpenLM SLM and configure it to monitor the local license servers. (Refer to the [OpenLM Broker Configuration Guide](https://docs.openlm.com/broker/))
3. Configure the Broker to query or extract license denial information as described below.
4. Verify that the marker in **EasyAdmin → Start → Widgets → License Servers** is green and states **Up to date**.

![License Server Status Green](img/license-server-status-green.png)

:::tip
If the status shows yellow or red, wait 5 to 10 minutes and refresh the window. If still red, check your license server configuration and review any alerts under **EasyAdmin → Start → Widgets → Alerts**.
:::

## FlexLM

After configuring OpenLM Broker to monitor the FlexLM license server, OpenLM will also be set to query the server for license denials. Additionally, the FlexLM Debug Log file must be configured:

1. Click the **Log Files** node in the left configuration panel.
2. Click the green **Add Log File** button.
3. From the **Type** dropdown, select **FlexLM Debug Log File**.
4. In the **Name (Descriptive)** textbox, enter a recognizable name.
5. In the **Path** textbox, set the full path to the FlexLM debug log file.
6. In the **Vendor** dropdown, select the corresponding vendor.
7. Click **Apply** and then **Restart Broker** to finalize.

## DSLS

OpenLM Broker can automatically detect and configure monitoring for the DSLS license server. This includes querying the server for denials.

- Navigate to **Commands → Denial** to review this configuration.
- Click **Execute** to verify functionality.
- The DSLS log file must be configured with the **Dassault Systemes** vendor.

Refer to the [Interfacing the DSLS license manager](https://docs.openlm.com/) guide for more information.

## IBM-LUM

OpenLM Broker can automatically detect and configure monitoring for the IBM-LUM license server, including denial queries.

- Navigate to **Commands → Denial** to review this configuration.
- Click **Execute** to verify functionality.

Refer to the [Interfacing the IBM-LUM license manager](https://docs.openlm.com/) article for more details.

![IBM-LUM Denial Settings](img/ibm-lum-denial-settings.png)

## Reprise RLM

OpenLM Broker must be configured according to the [Interfacing the Reprise RLM license manager](https://docs.openlm.com/) article.

## Troubleshooting

### Denials do not appear in the FlexLM debug log

:::caution
Denial reports may not appear in the FlexLM debug log if the application’s **Options file** contains a `NOLOG` line with the `DENIED` flag.

**Solution:** Edit the options file to remove the `DENIED` flag and restart the license server.
:::
