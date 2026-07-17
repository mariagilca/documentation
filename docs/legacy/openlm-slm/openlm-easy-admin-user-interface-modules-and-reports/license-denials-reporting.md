---
title: License denials reporting
description: Report and analyze license denials in EasyAdmin to reveal unmet license demand across FlexLM, DSLS, IBM-LUM, Reprise RLM, and other license managers.
sidebar_position: 4
---

OpenLM monitors and optimizes the license usage of various license managers such as FlexLM, DSLS, IBM-LUM, Reprise RLM, and many others. As part of this activity, OpenLM also produces license denial reports, that is, an account of events where the license server has declined an application license request. The quantity of license denials is a key parameter in license maintenance and in the planning of additional license procurement.

This document addresses the required configurations for obtaining these reports for the FlexLM, DSLS, IBM LUM, and Reprise RLM license managers.

##  Denials report

License denial information is presented in OpenLM's EasyAdmin web interface. The report can be accessed by going to **EasyAdmin Start → Reports → Denials**. The Denials report window includes:

- Details of the denial event (for example, Denied username and workstation, Time, License Server, Denied Feature and Vendor)
- The cause for denial (for example, limit of available licenses reached or [user is on the Options file exclude list](../../options-files/options-file-management-using-openlm-easyadmin-kb4007))
- A Group by the filter to display denials according to categories such as Features, Vendors, Users, Period, Servers, and so on.
- Different views to display denial events: table or different chart types
- True Denials toggle. After being denied a software license, a user may still receive a license automatically if 1) a license for the same feature is available in a different pool on the same license server or 2) a license is available on another license server. In such cases, a denial is still written in the log, even if the user ultimately receives a license. OpenLM can filter out such cases and keep only those when the user did not receive a license. These are referred to as "True" denials. **Note: if the "Track True Denials only" box was checked in the Administration → Denials panel during the period selected for the report, this toggle has no effect.**
- Ability to export the report data to a CSV file
- Ability to share the report by link, by email or to schedule it (OpenLM Reports Scheduler required)
- Ability to save preset report filters for easy recall

The following image depicts an example of a 'Denials' report for Autodesk licensed features:

![EasyAdmin Denials report showing an example of denied Autodesk licensed features.](/img/legacy/denials-report-autodesk-features.png)

## **Setting up OpenLM to monitor license denials**

To produce denial reports for monitored licenses, you must:

1. Install the OpenLM Broker on the license server machine. Then connect it to the OpenLM SLM and configure it to monitor the local license servers, as described in the [OpenLM Broker Configuration Guide](../../openlm-broker/openlm-broker-configuration).
2. Configure the OpenLM Broker to query or extract license denial information according to one of the sub-sections below.
3. Make sure the marker in the **EasyAdmin Start → Widgets → License Servers** window is green and states "Up to date", as below for FlexLM:

![EasyAdmin License servers widget showing a green Up to date marker for a FlexLM license server.](/img/legacy/license-servers-up-to-date-marker.png)

If it's showing up as yellow or red - wait 5 to 10 minutes and refresh the "License servers" window. If it is still red - check your license server configuration as well as any alerts in the **EasyAdmin → Start → Widgets → Alerts** window.

### For FlexLM

After configuring OpenLM Broker to monitor the FlexLM license server, OpenLM will also be set to query the license server for license denials. In addition to this, the FlexLM Debug Log file must be configured:

1. Select the 'Log Files' node on the left configuration panel.
2. Select the green 'Add Log File' button
3. From the Type dropdown menu, select "FlexLM Debug Log File".
4. In the "Name (Descriptive)" textbox, write something that you can easily recognize.
5. In the 'Path' textbox, set the full path to the FlexLM debug log file.
6. In the Vendor dropdown menu, select the vendor to which this log file corresponds.
7. Select 'Apply' and "Restart Broker" to finalize the configuration.

![OpenLM Broker Log Files node with a FlexLM Debug Log File entry configured for a vendor.](/img/legacy/flexlm_debug_log_broker-configuration.png)

### For DSLS

OpenLM Broker can detect and configure monitoring for the DSLS license server automatically. This includes querying the license server for license denials. Select the **Commands → Denial** node to review this configuration. You can also examine its functionality by selecting the **Execute** button. Additionally, the DSLS log file must be configured with the "Dassault Systemes" vendor, as described in the [Interfacing the DSLS license manager](../../interfacing-articles/dsls).

![OpenLM Broker Commands Denial node showing the DSLS license denial monitoring configuration.](/img/legacy/word-image-39.png)

### For IBM-LUM

OpenLM Broker can detect and configure monitoring for the IBM-LUM license server automatically. This includes querying the license server for license denials. Select the **Commands → Denial** node to review this configuration. You can also examine its functionality by selecting the **Execute** button. For more details, consult the [Interfacing the IBM LUM license manager article](../../interfacing-articles/ibm-lum). See the following image for clarification:

![OpenLM Broker Commands Denial node showing the IBM-LUM license denial monitoring configuration.](/img/legacy/word-image-40.png)

### For Reprise RLM

OpenLM Broker must be configured as per the [Interfacing the Reprise RLM license manager](../../interfacing-articles/reprise-rlm) article.

![Broker log settings for Reprise RLM.](/img/legacy/broker-log-settings-for-reprise-rlm.png)

## **Troubleshooting**

### Denials do not appear in the FlexNet debug log

Denial reports may not appear in the FlexLM debug log if the application's option file contains a NOLOG line, with a DENIED flag. If this is the case, [edit the options file to exclude this flag,](../../options-files/options-file-management-using-openlm-easyadmin-kb4007) and restart the license server.
