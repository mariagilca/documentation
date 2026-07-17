---
title: OpenLM EasyAdmin user interface modules and reports
description: The following article shows screenshots of the EasyAdmin User Interface modules and reports with some brief descriptive information about their function.
sidebar_position: 1
---

The following article shows screenshots of the EasyAdmin User Interface modules and reports with some brief descriptive information about their function.

## EasyAdmin user interface

The EasyAdmin user interface is the main OpenLM user interface for reporting and system configuration. It is accessible from any standard internet browser, for example, Mozilla Firefox, Microsoft Edge, Apple Safari & Google Chrome.

## EasyAdmin user interface dashboard

The Dashboard allows users to get system status information in a single glance:

- License server status.
- OpenLM Broker status on each license server.
- General statistics on licenses on daily and weekly license usage.
- One-glance status of critical features over multiple license servers.
- Alerts system messages.

The Dashboard features a Windows-like interface that facilitates access and management of Windows on a standard browser interface.

![EasyAdmin Dashboard showing license server status, Broker status, usage statistics, and alerts at a glance.](/img/legacy/word-image-26362-1-1.png)

## Widget windows

### License servers

The License servers' window is typically the first place to start. It presents the status of monitored license servers and the status of the OpenLM Brokers installed on the license server machines. This includes:

License Server status:

- Green: Up
- Yellow: Problem on the license server side, for example, Broker down, LM down, Time difference error.
- Red: Down. No communication with the license server.

Total number of licenses, with a hyperlink to the respective license inventory table

Used licenses, with a hyperlink to respective Currently Consumed Licenses table

Borrowed licenses

Usage percentage

Broker information and actions:

- Import files from the license server machine (for example, License file, Options file)
- Upload license files to the license server machine, and invoke a subsequent reread or restart action
- Broker version, and related Java (JRE) version
- License Server time

![EasyAdmin License servers window listing monitored servers, Broker status, and license counts.](/img/legacy/word-image-26362-2-1.png)

### Host availability

The host availability indication diagram provides the full information regarding the server's activity over time.

![EasyAdmin Host availability diagram showing license server activity over time.](/img/legacy/word-image-26362-3-1.png)

### General statistics

This window shows a general statistical overview of user activity and license utilization efficiency as recorded in the system.

![EasyAdmin General statistics window with an overview of user activity and license utilization efficiency.](/img/legacy/word-image-26362-4-1.png)

### Alerts

[The OpenLM Alerts module](https://www.openlm.com/application-notes-v3-0/application-notes-easyadmin-configuration-v3-0-2/application-note-4013-openlm-v3-0-openlm-alerts/) is designed to ensure the stability of the licensing system. It allows system managers to define alert conditions and consequent actions that will be taken when these conditions are met. The system can present alert messages on the EasyAdmin 'Alerts' window, as well as a log file. It can also be set to send alert messages to predefined email or SMS accounts.

![EasyAdmin Alerts window listing licensing system alert messages.](/img/legacy/word-image-26362-5-1.png)

### Recent features denials

This window provides preliminary statistic processing of license denials per feature: It presents the number of denied license requests in long term and short term period.

![EasyAdmin Recent feature denials widget showing long-term and short-term denied request counts per feature.](/img/legacy/word-image-26362-6-1.png)

### Feature usage status

This window shows the number of licenses used, the number of licenses borrowed, and the license-usage percentage. It's easy to add features by using the filter.

![EasyAdmin Feature usage status window showing licenses used, borrowed, and usage percentage.](/img/legacy/word-image-26362-7-1.png)

## Operational

### Currently consumed licenses

Just as the name suggests, the Currently Consumed Licenses window presents, **in real time,** the licenses that are being checked out from the license pool.

It is important to note that many license management tools do not provide such real time information.

![EasyAdmin Currently consumed licenses window showing licenses checked out from the pool in real time.](/img/legacy/word-image-26362-8-1.png)

In addition to this, the Currently Consumed Licenses window presents a few more interesting capabilities;

1. License managers may label licenses as occupied, when in fact they are idle and wasting your limited resources.

Select the crescent ![Crescent icon.](/img/legacy/word-image-26362-9-1.jpeg) icon to present the active versus idle periods within running sessions

![EasyAdmin Currently consumed licenses view showing active versus idle periods within running sessions.](/img/legacy/word-image-26362-10-1.png)

2. The Currently Consumed Licenses window also serves as an interface for authorized system managers to retrieve a license from any user when necessary.

For more information on these important capabilities, [refer to this document](../../openlm-slm-features/license-harvesting/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a).

### Released licenses

The Released Licenses window reports license release (check-ins). This functionality is only relevant for applications with supported extensions such as ESRI Desktop ArcGIS and Autodesk or those who have set rules with OpenLM's Applications Manager extension.

![EasyAdmin Released licenses window reporting license check-ins.](/img/legacy/word-image-26362-11-1.png)

## Management

### Licenses

The licenses window lists available licenses and allows easy management of the organizational assets. A sophisticated sliding filter allows users to filter long lists easily.

OpenLM EasyAdmin User Interface supports advanced features like FlexNet packages (As used by Autodesk the makers of AutoCAD). License Packages appear as boxed items.

![EasyAdmin Licenses window listing available licenses with a sliding filter and boxed FlexNet packages.](/img/legacy/word-image-26362-12-1.png)

### Licenses not in use

Single out licenses that have not been used for a predefined period of time.

![EasyAdmin Licenses not in use window showing licenses unused for a defined period.](/img/legacy/word-image-26362-13-1.png)

### License utilization

This chart indicates the license usage efficiency. Each column 'x' answers the question: "what is the percentage of usage time that at least x licenses have been in use?". This form of presentation ignores momentary usage peaks and provides a vivid representation of the true license consumption pattern. It clearly depicts the number of licenses that are actually required by the organization.

The Quality of Service line indicates the number of required licenses to support a certain percentage of license requests. In the following example, the chart shows that only 7 licenses (out of 12 available licenses) are required to support 96% of license requests:

![EasyAdmin License utilization efficiency chart with a Quality of Service line showing required license counts.](/img/legacy/word-image-26362-14-1.png)

[For more information about this important report window, refer to this document](../../openlm-slm-features/license-utilization-efficiency-kb4063).

### License procurement

This window lists all the available license information resident in the OpenLM database.

It facilitates taking inventory of the organizational software assets. The information presented in this window includes:

- License package contents
- Feature properties, for example, Feature name, Product name, Vendor
- License properties, for example, Quantity, Start, Issue and Expiration dates. Licenses that are approaching their expiration date are marked with red.
- FlexLM License file information, for example, Vendor info, Asset Info, Vendor String

![EasyAdmin License procurement window listing license inventory with feature and expiration details.](/img/legacy/word-image-26362-15-1.png)

### Audit report

The audit Report is a PDF document that contains the OpenLM deployment status in the environment. These details include a list of all the vendor daemons, license services, components of OpenLM installed, and the number of unique users monitored by the OpenLM system in the past 3 months. Customers can select to share the feature/product name mapping list in the audit report.

An audit report is required during maintenance renewal to compile a new license file.

![EasyAdmin Audit report window used to generate a PDF of the OpenLM deployment status.](/img/legacy/word-image-26362-16-1.png)

### Active users report

![EasyAdmin Active users report window.](/img/legacy/word-image-26362-17-1.png)

### Projects

![EasyAdmin Projects management window.](/img/legacy/word-image-26362-18-1.png)

## Reports

### Project usage

OpenLM allows organizations to manage users according to groups and projects and easily obtain the total usage time for these groups.

This could be done either manually or by synchronizing the OpenLM database with the organization's Active Directory. This functionality is often applied to implement a license charge-back policy (license usage billing).

Project reporting allows project-oriented companies to get license usage time according to the active project, as reported by the end user.

![EasyAdmin Project usage report showing license usage time by active project.](/img/legacy/word-image-26362-19-1.png)

### Group usage

Group reporting allows managers and system administrators to obtain license usage statistics according to groups.

![EasyAdmin Group usage report showing license usage statistics by group.](/img/legacy/word-image-26362-20-1.png)

### License usage

The license usage reports allow system administrators to compare the actual license usage to the number of available licenses.

The smart filter allows users to build a customized list of licenses and view their total usage.

According to the tabs in the display pane, this report is available in 3 different formats: as a table, chart, or heatmap diagram, as depicted below.

![EasyAdmin License usage report shown as a table.](/img/legacy/word-image-26362-21-1.png) ![EasyAdmin License usage report shown as a chart.](/img/legacy/word-image-26362-22-1.png) ![EasyAdmin License usage report shown as a heatmap diagram.](/img/legacy/word-image-26362-23-1.png)

Some of the "License usage" window filter functionality is unique:

- The time span of the usage report is configurable: select between predefined periods (for example, last 30 days) and a start - to - end period definition
- When displaying a chart view, the displayed period can also be zoomed - in using the zoom drag buttons, at the bottom of the chart.
- The "Aggregated usage" check box selects between displaying the maximal level of usage sampled per period (hour /day / week) or the actual usage occurrences as reported by the license manager.

### License activity

The License Activity window presents an account of all application sessions that have consumed a monitored license.

By default, this window presents only ended sessions (that is, those that have a start and end time), but it can also be configured to present currently active sessions.

The license activity window is a very powerful tool that allows system administrators and license administrators to produce elaborate reports and track license activity of individual users.

The "Group by" tab on this window facilitates license statistics report generation according to Server, Vendor, Workstations, Features, Users, Groups, and Projects.

![EasyAdmin License activity window listing application sessions that consumed a license, with a Group by tab.](/img/legacy/word-image-26362-24-1.png)

### License allocation

The License Allocation screen allows to find out licenses which are allocated to whom. Also, it gives the possibility to check the usage statistics.  
**Filters**: Use filters to select necessary allocation options and users to get the precise report. Select the filter parameters and select "Apply" to proceed to the result.

**Table**: The report results are displayed in the table view.

![EasyAdmin License allocation screen with filters and a table of licenses allocated to users.](/img/legacy/word-image-26362-25-1.png)

### Named license analysis (NNU)

The Named License Analysis (NNU) report provides an overview of the license allocation and consumption of your FlexLM named licenses.

This report has several benefits for administrators as it allows to determine the real usage of an organization's named licenses, which can help with license planning and reducing costs. After running the report and analyzing the results, the administrator can decide whether to assign more users to NNU licenses, reduce the load of floating licenses or purchase additional licenses.

For more information on this report, consult the [specific item](./named-license-analysis-nnu-report).

![EasyAdmin Named License Analysis NNU report showing allocation and consumption of FlexLM named licenses.](/img/legacy/word-image-26362-26-1.png)

### Denials

This is a presentation of historic license denial occurrences. It is available only for license servers that implement license denials, for example, FlexLM, DSLS, IBM-LUM and others. Requires the employment of an OpenLM Broker on the license server machine. [Consult this document for more information](./license-denials-reporting). A few points to note regarding the Denials report window:

- Information may be sliced according to a list of criteria, for example, time, user, project, group, workstation, denial type, vendor name, license server, license type (for example, Floating, Node-locked), and "additional key" (for example, FlexLM asset info).
- It may be presented as a pie chart, line or table.
- The filter includes a "True denials" check box. This option filters out irrelevant denial reports made by the license manager. Such irrelevant reports include:
  - Multiple requests made by a specific user in a short period of time, and
  - License requests that have been denied by one server, but granted by another.

![EasyAdmin Denials report of historic license denial occurrences shown as a pie chart.](/img/legacy/word-image-26362-27-1.png)

![EasyAdmin Denials report of historic license denial occurrences shown as a line chart.](/img/legacy/word-image-26362-28-1.png)

![EasyAdmin Denials report of historic license denial occurrences shown as a table.](/img/legacy/word-image-26362-29-1.png)

### Feature usage per group

This window presents the usage in hours of selected features per the selected user groups or all active groups, in a stacked vertical bar chart. Hover over the chart to view explicit usage information per each section of the bars.

![EasyAdmin Feature usage per group report as a stacked vertical bar chart of usage hours.](/img/legacy/word-image-26362-30-1.png)

### Feature usage per user

This window presents the usage in hours of selected features per the selected users or per all active users, in a stacked vertical bar chart. Hover over the chart to view explicit usage information per each section of the bars.

![EasyAdmin Feature usage per user report as a stacked vertical bar chart of usage hours.](/img/legacy/word-image-26362-31-1.png)

### TokenFlex

Token Flex is a cloud-based, pay-as-you-go licensing model from Autodesk where the customer buys several tokens (referred to as a "token pool") and pays with these tokens each time a user runs a product belonging to a certain product family within a specified amount of time (usually counted as 24-hour intervals).

This window presents 3 reports on TekenFlex:

- **TokenFlex Usage**

This report shows the total number of tokens that were consumed for a certain product family along with the total consumption time. Two types of views are available: table and chart. Keep in mind that due to the way vendors calculate token consumption, the reports are displayed with a 48 hour delay. In addition to this, the Token Usage report can group the data by User, allowing you to see how many tokens a certain user has consumed.

- **Double Token Consumption**  
  This report shows suspected cases where a user might have been charged twice for the same product family during a working day.
- **Released Idle Licenses**  
  This report shows suspected cases where a user might have been charged twice for the same product family during a working day.

## EasyAdmin user interface - administration

The configuration screens allow users to set their preferences. The choice of working hours affects the statistical information which is calculated and shown to all system users.

![EasyAdmin Administration configuration screen for setting system preferences and working hours.](/img/legacy/word-image-26362-32-1.png)

## User settings

The configured preferences in the "User" window effect the format of information as it is presented to the User.

![EasyAdmin User settings window for configuring how information is presented to the user.](/img/legacy/word-image-26362-33-1.png)

Groups windows

![EasyAdmin Groups window.](/img/legacy/word-image-26362-34-1.png)

## Users and permissions - workstations window

The Workstations window provides all the information a system administrator needs to manage workstations that are accessing licenses.

This information includes:

- Hostname
- Agent version (if applicable)
- Online (Workstation is online or offline)
- Idle time (User idle time)
- Controlled (for supported systems)

![EasyAdmin Workstations window listing hostnames, agent version, online status, and idle time.](/img/legacy/word-image-26362-35-1.png)
