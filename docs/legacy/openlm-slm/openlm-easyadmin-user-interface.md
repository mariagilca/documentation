---
title: "OpenLM EasyAdmin User Interface"
description: The OpenLM EasyAdmin User Interface is the main OpenLM administrative interface for reporting and system configuration. It is accessible from any modern.
sidebar_position: 3
---

## General

The OpenLM EasyAdmin User Interface is the main OpenLM administrative interface for reporting and system configuration. It is accessible from any modern internet browser, for example, Mozilla Firefox, Microsoft Edge, and Google Chrome.

![OpenLM EasyAdmin User Interface main screen](/img/legacy/word-image-26360-2.png)

## Startup

EasyAdmin User Interface is installed as part of the OpenLM SLM installation and normally requires no modifications to be accessed. It can be launched by

- Selecting Windows '**Start**' → "**All Programs**" → **OpenLM** → "**OpenLM EasyAdmin User Interface**" or
- Typing in the EasyAdmin URL line in the web browser: [http://localhost:5015/](https://fqdn:5015/)
- To access the EasyAdmin User Interface from another machine, simply replace 'localhost' with the OpenLM SLM's hostname or IP.
- EasyAdmin comes with a lightweight Web server: Kestrel. The default port for connecting to the EasyAdmin User Interface is 5015.

## EasyAdmin user interface windows properties

The EasyAdmin report and management windows have some common properties worth mentioning:

## OpenLM icon properties

Select the OpenLM icon on the top-left corner of the window to get some presentation properties

![OpenLM icon context menu with presentation properties](/img/legacy/word-image-26360-3.png)

Most of these properties are self-explanatory. The 'Properties' option allows the user to set a window to open at EasyAdmin User Interface launch, and set the window's refresh rate.

## Filters

Most windows contain a filter pane, normally located on the window's left side.

- The filter's position(Left, Right, Down, Up) may be configured through the gear wheel icon.
- The filter fields specify the required query that EasyAdmin will propagate to the OpenLM SLM.
- To obtain report results, first fill in the filter fields, and then select the 'Apply' button.
- NOT filling in a specific field will render ALL possible selections, that is, Not selecting a monitored license server name will require the query of all license servers
- Some filter configurations can be saved and reloaded by using the funnel icon on the bottom-left corner. These filters are saved on the Browser's cache memory per logged-in EasyAdmin user.
- Some filter configurations can be shared through the 'Share' icon, also located on the bottom-left corner.

## Display area

![EasyAdmin display area with table tabs and column controls](/img/legacy/word-image-26360-4.png)

- Some windows have multiple display areas distinguished by respective tabs, for example, Table & "Group by" displays.
- The presentation of columns can be controlled by selecting the column headers, and selecting the 'Columns' option.
- The ordering and sorting according to columns can also be configured.
- Some windows have the option to download their contents as CSV files, a PNG image, or to print them.

## Sharing reports

The share button allows EasyAdmin User Interface users to share a view (report) with a single select;

- Select the "Share" button on any report and select a type: link, email or schedule (OpenLM Report Scheduler required).
- Send this link to any other EasyAdmin user to share the same presented information.

![Share button dialog with link, email, and schedule options](/img/legacy/word-image-26360-5.png)

This functionality supports almost any filter in the system and allows different implementations such as periodic email report or a webpage with constant reports.

## Report scheduling

To produce a scheduled report, The OpenLM administrator should:

- Set up the EasyAdmin User Interface emailing configurations
- Set up a specific EasyAdmin User Interface report (for example, License Usage window)
- Assign the report to a specific user, and optionally add additional recipients
- Set up the scheduled report timing.

And that's it. The OpenLM EasyAdmin scheduled reports will be sent to the designated recipients at the predefined time. Refer to this document for more information on the EasyAdmin report scheduler:

[EasyAdmin Reports Scheduler](../openlm-reports-scheduler/openlm-reports-scheduler-configuration)

## Dashboard

The Dashboard presents general system status information at a glance:

- License Servers' status.
- OpenLM Broker status on each license server.
- "Top 10" statistics concerning all monitored applications.

![Dashboard](/img/legacy/dashboard.png)

## Widgets

Select the EasyAdmin 'Start' → 'Widgets' menu. The following menu options are presented:

## License servers

The License servers' window is typically the 1st place to start. It presents the status of monitored license servers and the status of the OpenLM brokers installed on the license server machines. This includes:

- License Server status
- Green: Up
- Yellow: Problem on the license server side, for example, Broker down, LM down, Time difference error.
- Red: Down. No communication with the license server.
- Total number of licenses, with a hyperlink to the respective license inventory table
- Used licenses, with a hyperlink to respective Currently Consumed Licenses table
- Borrowed licenses
- Usage percentage
- Broker information and actions:
- Import files from the license server machine (for example, License file, Options file)
- Broker version, and related Java (JRE) version
- License Server time![License Managers Servers](/img/legacy/license-managers-servers.png)

## Host availability

The host availability waveform diagram presents license servers' activity over time.  
![Host availability waveform diagram showing license server activity over time](/img/legacy/word-image-26360-8.png)

## Alerts

[The OpenLM Alerts module](../openlm-slm-features/openlm-alerts-configuration) is designed to ensure the stability of the licensing system. It allows system managers to define alert conditions and consequent actions that will be taken when these conditions are met. The system can present alert messages on the EasyAdmin 'Alerts' window, as well as a log file. It can also be set to send alert messages to predefined emails.  
![EasyAdmin Alerts window displaying system alert messages](/img/legacy/word-image-26360-9.png)

## Recent features denials

This window provides preliminary statistic processing of license denials per feature: It presents the number of denied license requests in long-term and short-term period.sd  
![Recent feature denials widget showing denial statistics](/img/legacy/word-image-26360-10.png)

## Feature usage status

A popular widget with many customers is this Green-To-Red license utilization presentation of specified monitored features.

## Miscellaneous

- General Statistics
- Selected Feature Statistics

## Operational

### Currently consumed licenses

The Currently Consumed Licenses (CCL) window lists all actively monitored license sessions. It serves as an important interface for license administrators. Through this interface, authorized system managers are able to obtain comprehensive real-time usage information, as well as manually retrieve a license from any user when necessary.

The presented information and controls include:

- User details, for example, First / Last name, Phone, email, Group, and Project membership
- Feature details, for example, Version, Vendor, Feature, Product name
- Session start time and duration
- License Borrowing information, for example, Linger time, Linger due
- License information, for example, License server, handle number
- Idle session information, for example, Idle waveform presentations, Workstation idle time, Process idle time
- Action buttons: Close the application, and Remove the license.

## Released licenses

List of licenses that had been released by the administrative intervention

## Report windows

Select the EasyAdmin 'Start' → 'Reports' window. This will present a list of historical usage statistics and metrics:

## License usage

The powerful license usage report window accounts for the actual license usage of single or multiple licensed features concerning the total number of licenses. It presents license consumption patterns over configurable periods and sample resolutions. This information can be used to identify bottlenecks and redundancies in the license inventory.

This report is available in 3 different formats, according to the tabs in the display pane: As a table, a chart, or as a heatmap diagram.

The smart Filter allows users to build a customized list of licenses and easily obtain useful information regarding these licenses. There are some unique features to the "License usage" window's filter:

- The period of the usage report is configurable: select between predefined periods (for example, last 30 days) and a start-to-end period definition
- When displaying a chart view, the displayed period can also be zoomed-in using the zoom drag buttons, at the bottom of the chart.
- The "Aggregated usage" check box selects between displaying the maximal level of usage sampled per period (hour /day/week) or the actual usage occurrences as reported by the license manager.

## License activity

The License Activity window is a very powerful tool that allows system administrators to produce sophisticated reports and track the license activity of individual users. The "Group by" tab on this window facilitates license statistics report generation according to Workstations, Features, Users, Groups, and Projects.

## Denials

This is a presentation of historic license denial occurrences. It is available for FlexLM and IBM-LUM license managers only and requires the employment of an OpenLM Broker on the license server machine. [Consult this document for more information](./openlm-easy-admin-user-interface-modules-and-reports/license-denials-reporting).

A few points to note regarding the Denials report window:

- Information may be presented as a pie chart, line, or table.
- It may be sliced according to a list of criteria, for example, time, user, project and so on.
- The filter includes a "True denials" check box. This option filters out irrelevant denial reports made by the license manager. Such irrelevant reports include:
- Multiple requests made by a specific user in a short period of time, and
- License requests that have been denied by one server, but granted by another.

## Projects and group usage

OpenLM facilitates the monitoring of user activity and can attribute license usage according to groups and projects. This functionality is often applied to implement a license charge back policy (license usage billing).

## Management

### License procurement table

This window lists all the available licenses' information resident in the OpenLM database.

It facilitates taking inventory of the organizational software assets. The information presented in this window includes:

- License package contents
- Feature properties, for example, Feature name, Product name, Vendor
- License properties, for example, Quantity, Start, Issue, and Expiration dates. Licenses that are approaching their expiration date are marked red.
- FlexLM License file information, for example, Vendor info, Asset Info, Vendor String

## Projects

OpenLM can attribute license usage to specific active projects. This serves to monitor software asset consumption according to organizational projects, and to produce charge-back reports.

There are two interfaces for creating new projects in the OpenLM database. One is this 'Projects' window. The other is the End-Users Services (Personal Dashboard).

In this window, Administrators can create new projects, as well as edit the following:

- Project name
- Project Start and End time
- Number of working hours allocated to this project
- The project's priority, and
- The project's completeness percentage.

## License efficiency

Two complementary windows on this menu perform as indicators of license efficiency:

- License utilization: This chart represents a histogram of license usage, that is, each 'y' value answers the question: "What is the percentage of usage time that the respective x licenses have been in use". This form of presentation ignores momentary usage peaks and provides a vivid realization of the true license consumption pattern. It depicts the number of licenses that are required in the organization.
- Licenses not in use: Self-explanatory. A list of licenses you could probably do without.

## OpenLM license related

- Audit report
- Active users report

## Users and groups

OpenLM relates to different types of entities, that is, Users, Groups, IPs, Hosts and Host groups. There are various methods for introducing new such entities into the OpenLM database, as discussed above, in the "OpenLM Entities" paragraph.

This 'Start' menu option allows administrators to

- Obtain a list of Users and Groups resident in the OpenLM database
- Obtain information about workstations resident in the OpenLM database
- Manually introduce new Users and Groups
- Edit User properties and OpenLM passwords, and
- Set up Group membership.

## Options files

FLEXlm Options files grant license administrators close control over various operating parameters within the constraints of the license model. Licensed features can be dedicated, denied or reserved to users or groups of users, as well as Hosts, IPs, and Host Groups according to the Options file setting. For more information on Options file maintenance, refer to the dedicated chapter below.

## The EasyAdmin user interface administration menu

The Administration menu is OpenLM's interface to a wide variety of administrative activities. Note that I have elaborated on most of these activities in their respective context. I will therefore not repeat this information here, but rather link to the proper paragraphs.

![EasyAdmin Administration menu with available options](/img/legacy/word-image-26360-11.png)

## System & security

- Setting the default timezone
- Setting the system's logging level
- Activating email notifications
- Activating system authorization and security optionsActive Agent configuration

These are different windows that relate to the OpenLM Agent. The Agent is located on end-users' workstations and provides different capabilities deriving from monitoring processes on workstations. These capabilities include idle license retrieval and 'Unmanaged licenses' monitoring.

- Active Agent
- Agent Policy
- Agent Procedures
- Process / Features
- Unmanaged processes

## Working days & hours

Setting the organization's work hours. OpenLM will accumulate usage information regardless of this configuration, but historical license usage may be configured to disregard weekends and after-hours.

## Show/hide features

Users may select features to be omitted from report windows. License usage information will be accumulated regardless of this configuration.

## Product packages

Manual method for arranging licensed features in Packages. Other methods (via reading the FlexLM license file or updating online) [are presented here](./openlm-easyadmin-user-interface-administration/products-and-packages).

## Directory Sync

This window is part of the Directory Synchronization process. An elaborated description is provided in the respective paragraph. Note that you must have [Directory Synchronization](../directory-sync/) installed for this window to be configurable.

## Options files

Sets up some properties of the Options file maintenance capabilities, including data flow direction.

## File fetching

File fetching is done through the "License servers" window. These are some related configurations, for example, Activate fetching, Timeout, and location for the target directory.

## Projects

OpenLM provides a backbone for managing and reporting the usage of licensed applications according to work projects.

## Alerts

OpenLM provides an administrative interface for real-time alerting and intervention. The Alerts may be sent to a predefined email to the EasyAdmin 'Alerts' window. The relevant windows are:

- Email
- Alerts management

## Roles

OpenLM SLM supports a role-based security feature that allows system administrators to implement customized access to OpenLM tools by setting access roles. [More information](../openlm-slm-features/openlm-roles-permissions).

## OpenLM license

The contents and capabilities available by your OpenLM license are presented in this window.

## Cleanup Manager

A tool for cleaning up unneeded information. Use this tool carefully, and only after backing up your database, as the cleanup process is irreversible. [More information](./openlm-easyadmin-user-interface-administration/cleanup-manager-module).

## Checkout policy

Set up the OpenLM license count to match the vendor license consumption policy.

- Multiple sessions opened by the same user on the same workstation consume a single license, or
- Multiple sessions opened by the same user on the same workstation consume multiple licenses

## OpenLM Applications Manager

Settings for managing the configuration of OpenLM Applications Manager, and all its associated functions.

## Denials

Manage how OpenLM handles license denial event data.

## Token-Flex

Configure OpenLM's handling of Token-Flex servers.

## External platforms

Configure different adapters and external platforms that interface with OpenLM (for example, ServiceNow).

## Connecting to EasyAdmin user interface

- EasyAdmin comes with a lightweight Web server: Kestrel. The default port for connecting to EasyAdmin User Interface is 5015.
- The default EasyAdmin User Interface URL is http://localhost:5015
- To connect to EasyAdmin from a different machine on the network, simply replace 'localhost' with the target OpenLM SLM hostname.

If you encounter trouble in launching the EasyAdmin User Interface web application, ensure that:

- The OpenLM SLM service is up and running
- All relevant ports (5015) are unblocked by Firewall.

If you still encounter a problem - feel free to contact our support team at support@openlm.com
