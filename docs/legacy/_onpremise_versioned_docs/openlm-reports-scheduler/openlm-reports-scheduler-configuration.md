---
title: OpenLM Reports Scheduler Configuration
sidebar_position: 2
description: Guide to configuring the OpenLM Reports Scheduler for automated reporting.
---


## Overview of OpenLM Reports Scheduler
OpenLM Reports Scheduler is an extension that automates the generation of reports from the OpenLM EasyAdmin user interface. Instead of manually creating reports, administrators can define a schedule to have reports automatically generated and sent to specified recipients via email.

To schedule a report, you must:

Configure a valid SMTP server in EasyAdmin.

Ensure you have an admin account in EasyAdmin and that it's configured with the Scheduler if EasyAdmin authentication is enabled.

Define a report in EasyAdmin with all the necessary filters.

Click Share → Schedule, set the frequency and recipients, and then save.

Once configured, the scheduled report will be sent to the designated recipients at the specified time, displaying the same data as a manually generated report. This feature is ideal for reports that show recent data, such as a "Last 7 days" date range.

## Configuring EasyAdmin for scheduled reports
Setting up the email configuration
Since the Reports Scheduler sends reports via email, a working email server must be configured in EasyAdmin's Start → Administration → Email/SMS module. It's highly recommended to enter at least one recipient address for notifications in case of errors.

## Setting up the recipient user's email account
Scheduled reports are attributed to a specific user, usually the administrator who set them up. This user must exist in the OpenLM database and have a valid email address associated with their account.

To set a user's email, go to EasyAdmin User Interface Start → Users & Groups → Users. Find the user, double-click on them, and edit their details to include a valid email address.

## Configuring OpenLM Reports Scheduler
## Editing the report_scheduler.properties file
The report_scheduler.properties file stores all the Reports Scheduler's settings. Manual editing is generally not required unless:

An SMTP server has not been configured in EasyAdmin. The mail variables can be used to configure it independently.

The OpenLM SLM hostname or communication ports have changed.

The following variables are most relevant for administrators:

Variable	Possible value	Description
mail.smtp.host	User-defined	The SMTP server host or IP.
mail.smtp.port	User-defined	The SMTP server port.
mail.smtp.auth	true or false	Set depending on whether the SMTP server requires login credentials.
mail.smtp.ssl	true or false	Set depending on whether the SMTP server uses SSL for connections.
mail.smtp.username	User-defined	The SMTP server user.
mail.smtp.password	User-defined	The SMTP server password.
mail.smtp.sender	User-defined	The email address that will appear in the "from:" field.
mail.recipients	User-defined	The recipient emails, separated by a semicolon.
openlm.protocol	http (default) or https	The protocol used on OpenLM’s API port.
openlm.host	localhost (default) or FQDN	The OpenLM SLM hostname that the Reports Scheduler will synchronize with.
openlm.soap.port	Default: 5015	The OpenLM SLM API port.
openlm.ea.port	Default: 5015	OpenLM’s EasyAdmin port.
openlm.ea.host	Default: localhost or FQDN	OpenLM’s EasyAdmin hostname.
openlm.ea.protocol	http (default) or https	OpenLM’s EasyAdmin communication protocol.
openlm.client.id	Configured automatically	Report Scheduler’s credentials for a secure connection.
openlm.client.secret	reportscheduler_secret	
openlm.client.scope	openlm.server.scope	
scheduler.report.files.directory	User-defined	Path to a local directory to store reports.
webdriver.impl.path	Default: chromedriver.exe	Path for the ChromeDriver.

Export to Sheets
:::note
If not configured, Reports Scheduler will use the SMTP server settings configured in EasyAdmin.
:::

Configuring the param.js file
If OpenLM SLM and Reports Scheduler are on different computers, you need to change the hostname and/or port in the param.js file.

Navigate to the default path: "C:\Program Files\OpenLM\OpenLM SLM\bin\wwwroot\params.js"

Change the hostname and/or port number in the var_schedulingTaskURL to match the computer where the Reports Scheduler is installed.

Reports scheduler in a secured environment
Case 1: Connection via Identity Service
Install OpenLM SLM, Identity Service, and Reports Scheduler on your machine.

In Identity Service → Settings → Security Configuration, enable the toggle button and add the Report Scheduler URL (Port: 8888).

Click Save.

Restart the OpenLM Reports Scheduler and OpenLM SLM services to apply the changes.

The report_scheduler.properties file will be updated with the client.id and client.secret for the secure connection.

Case 2: Connection through HTTPS
When OpenLM SLM is connected via HTTPS, the Reports Scheduler must also be connected via HTTPS.

Required changes in Reports Scheduler Properties File:

Navigate to the report_scheduler.properties file.

Change the protocols for openlm.protocol and openlm.ea.protocol to https.

Change openlm.host to the Fully Qualified Domain Name (FQDN).

Change the server protocol to HTTPS.

Save the file.

Required changes in OpenLM SLM param.js file:

Navigate to the param.js file.

In var_schedulingTaskURL, change http to https.

Save the file.

Required changes in OpenLM Identity Service appsettings.json file:

Navigate to the appsettings.json file.

Change the scheduler URL to https.

Save the file.

Alternatively, you can change the URL in the Identity Service UI under the Security Configuration tab.

Restart the OpenLM Reports Scheduler service to apply the changes.

Using OpenLM Reports Scheduler
Scheduling a report
Open any EasyAdmin report (e.g., License Usage).

Configure the report fields, filters, and other options.

Click Share in the bottom-left corner and then Schedule.

The Schedule Report window will appear. Here you can set:

Frequency: How often the report should be generated (e.g., every Sunday at 01:00 AM).

Recipient(s): Existing users, groups, or direct email addresses.

Job Description: Text to be included in the email.

Receiving User Timezone: To adjust the timing for recipients in different time zones.

Click OK to save the report, then Close the window.

Managing scheduled reports
Go to EasyAdmin Start → Scheduling Tasks.

In the window that appears, you can Edit, Delete, Disable/Enable, and Show URL for any of the scheduled reports.