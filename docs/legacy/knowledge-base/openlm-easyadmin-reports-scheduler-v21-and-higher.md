---
title: "OpenLM Reports Scheduler Configuration"
sidebar_label: "OpenLM Reports Scheduler Configuration"
---

<!-- Source: https://www.openlm.com/knowledge-base/openlm-easyadmin-reports-scheduler-v21-and-higher/ -->

# OpenLM Reports Scheduler Configuration

The OpenLM EasyAdmin user interface incorporates a variety of reports that display information related to license usage. EasyAdmin allows sharing these reports by either:

1. Granting report viewing access to non-administrator accounts
2. Sharing a custom-generated report URL
3. Sharing the report by email to specific users, groups, or individual addresses in an accessible format (.png, .csv)

By default, these reports are generated manually whenever the user requests or accesses the given feature. The OpenLM Reports Scheduler extension allows administrators to automate this process by giving them the ability to generate reports according to a predefined schedule.

## **Overview**

To schedule a report, the OpenLM administrator should:

1. Configure a valid SMTP server in EasyAdmin's "Email" module.
2. If EasyAdmin authentication is turned on, check that you have an admin account in EasyAdmin and configure it with Scheduler.
3. Open a specific EasyAdmin report and define filters (e.g. License Usage report).
4. Click Share → Schedule, define the frequency, report recipients, then click Save.

Once this is done, the scheduled report will be sent to the designated recipients at the specified time. A scheduled report displays the same data as a regular report, the main difference being that it's generated automatically. This makes them ideal when used with a date range filter that displays a recent period (i.e. "Last 7 days").

## **Configuring EasyAdmin to Produce Scheduled Reports**

### **Setting up the Email Configuration**

Since OpenLM Reports Scheduler sends the reports by email, a working email server must be configured in **EasyAdmin's Start → Administration → Email/SMS** module.

![](/img/legacy/kb/Screenshot-2023-11-01-at-21.43.04.png)

**It is highly recommended to enter at least one value for Recipient Addresses as it will be used to send notifications in case any errors occur.**

### **Setting up the Recipient User's Email Account**

By default, scheduled reports are attributed to a specific user. In most cases, this user would be the administrator who set up the scheduled reports. This designated user should exist within the OpenLM database and should have a valid email account associated with it.

To set a user's email, open **EasyAdmin User Interface Start → Users & Groups → Users**. Find the user you want to assign an email to, double-click on it, and edit the user's details as depicted in the image below:

![](/img/legacy/kb/word-image-67.png)

![](/img/legacy/kb/word-image-68.png)

For more information on how to create users (and other entities) in OpenLM, please refer to this application note: [Introducing Entities in OpenLM - Users, Groups, IP and Hosts](https://www.openlm.com/application-notes-v2-0/application-notes-easyadmin-configuration-v2-0/application-note-3042-openlm-v2-0-introducing-entities-in-openlm-users-groups-ip-and-hosts/)

## **Configuring OpenLM Reports Scheduler**

### **Editing the report\_scheduler.properties file**

The report\_scheduler.properties file is where all of the Reports Scheduler's settings are stored. Usually, most settings required for operation are defined during the installation process or preserved from a previous version (if upgrading). Manually editing this file is not required as long as the steps in section 4 ("Configuring EasyAdmin to produce scheduled reports") have been followed.

However, editing is possible and even required in special cases such as:

* If no SMTP server has been configured in EasyAdmin. By default, the SMTP configuration in EasyAdmin overrides the one in report\_scheduler.properties. However, if for some reason SMTP is not configured there, the **mail** variables can be used to configure SMTP independently. A benefit of doing this is that administrators can be notified by email if any errors occur during the integration of the Reports Scheduler with the Server.
* If there are any changes to the OpenLM SLM hostname (if installed on a different machine than the Server) or default communication ports.

The following variables are most relevant for administrators to configure:

| **Variable** | **Possible value** | **Description** |
| --- | --- | --- |
| mail.smtp.host\* | *User-defined* | The SMTP server host or IP. |
| mail.smtp.port\* | *User-defined* | The SMTP server port. |
| mail.smtp.auth\* | **true** or **false** | Set depending on whether the SMTP server requires login credentials. |
| mail.smtp.ssl\* | **true** or **false** | Set depending on whether the SMTP server uses SSL for connections. |
| mail.smtp.username\* | *User-defined* | The SMTP server user. |
| mail.smtp.password\* | *User-defined* | The SMTP server password. |
| mail.smtp.sender\* | *User-defined* | The email address that will show up on the "from:" field. |
| mail.recipients\* | *User-defined* | The recipient email(s), separated by a semicolon. |
| openlm.protocol | **http** (default) or **https** | The protocol used on OpenLM's API port. |
| openlm.host | **localhost** (default) or FQDN | The OpenLM SLM hostname that Reports Scheduler will synchronize with. The localhost is to be changed by the Fully Qualified Domain Name (FQDN) when the SSL connection is required by the OpenLM SLM. |
| openlm.soap.port | Default: **5015** | The OpenLM SLM API port. |
| openlm.ea.port | Default: 5015 | OpenLM's EasyAdmin port. |
| openlm.ea.host | Default: **localhost** (default) or FQDN | OpenLM's EasyAdmin hostname, the same as OpenLM SLM's hostname  The localhost is to be changed by the FQDN when the SSL connection is required. |
| openlm.ea.protocol | **http** (default) or **https** | OpenLM's EasyAdmin communication protocol. Can be set to **http** or **https**. |
| openlm.client.id=openlm.reportscheduler.client | Configured automatically from Identity Service web UI when a user connects Identity Service and Reports Scheduler | Report Scheduler's credentials for a secure connection. |
| openlm.client.secret=reportscheduler\_secret |
| openlm.client.scope=openlm.server.scope |
| scheduler.report.files.directory | *User-defined* | If you want reports to also be stored locally in a specific directory, set a path here. |
| webdriver.impl.path | Default: **chromedriver.exe** | Change if using a different path for the ChromeDriver. |

\* Note: If not configured, Reports Scheduler will use the SMTP server settings configured in EasyAdmin.

**Param.js File Configuration to connect OpenLM SLM (EasyAdmin) with Report Scheduler**

In case OpenLM SLM (Easy Admin) and Report Scheduler are installed on different computers/servers and they are unable to connect, for example, getting the connection error while connecting to default host 127.0.0.1. Perform the following steps to change the required hostname and port number in the param.js file of the OpenLM SLM to enable connect it to the required host and port of the Report Scheduler:

To locate the param.js file of the OpenLM SLM, navigate to the below-mentioned default path:

"C:Program FilesOpenLMOpenLM SLMbinwwwrootparams.js"

Default Report Scheduler - scheduling task URL is mentioned in the param.js file and is as per shown in the image below:

![](/img/legacy/kb/word-image-69.png)

Change the hostname and/or the port number of the computer/server to that of where the Report Scheduler is installed.

### **Reports Scheduler Configuration in a Secured Environment**

**Case 1: Connection via Identity Service**

To configure Report Scheduler in a secured environment via the Identity Service, perform the following steps:

Please know it is required to have the OpenLM SLM, Identity Service, and Report Scheduler installed on your machine:

![](/img/legacy/kb/word-image-70.png)

1. Install OpenLM SLM. Refer to the link on How to Install OpenLM SLM:
2. Install Identity Service. Refer to the link on How to Install Identity Service:
3. Install Report Scheduler. Refer to Section 3 of this document for the Report Scheduler installation process.
4. Now, configure these above-installed applications to connect through the Identity service. The OpenLM SLM and Report Scheduler are connected with Identity Service, as shown in the screen below.

To configure Report Scheduler with Identity Service, go to **Identity Service< Settings< Security Configuration** and switch on the toggle button ![](/img/legacy/kb/word-image-71.png) and add Report Scheduler URL. (Port: 8888). Click the **Save** button to save the information.

![](/img/legacy/kb/word-image-72.png)

1. Restart the Report Scheduler to apply the changes and restart the OpenLM SLM.

To restart the Report Scheduler, go to **Services** > select **OpenLM Reports Scheduler**, and click **Restart** to restart the service.

Similarly, to restart the OpenLM SLM, go to **Services** > select **OpenLM SLM**, and click **Restart** to restart the service.

![](/img/legacy/kb/word-image-73.png)

Report Scheduler will now be connected in a secured environment with Identity Server, as shown in the screen below:

![](/img/legacy/kb/word-image-74.png)

The report\_scheduler.properties file will be updated with client.id and client.secret, as shown in the image below.

![](/img/legacy/kb/word-image-75.png)

**Case** **2** - **Connection through HTTPS**

When the OpenLM SLM is connected through https, it is also required that the OpenLM Report Scheduler is also connected through HTTPS.

Note: The OpenLM SLM will not be able to connect to OpenLM Report Scheduler if they both are not connected through HTTPS.

Required Changes in OpenLM Report Scheduler Properties File

To connect the OpenLM Report Scheduler through HTTPS, perform the following steps:

1. Navigate to the OpenLM Report Scheduler Properties file.

![](/img/legacy/kb/word-image-76-1.png)

2. Change the protocol of openlm.protocol and openlm.ea.protocol fields to HTTPS.

![](/img/legacy/kb/word-image-77-1.png)

3. Change the openlm host to Fully Qualified Domain Name.

![](/img/legacy/kb/word-image-78-1.png)

4. Change the server protocol to HTTPS.

![](/img/legacy/kb/word-image-79-1.png)

5. Save the Report Scheduler Properties file commit  the changes.

### Required Changes in OpenLM SLM Param.js File

1. Navigate to the param.js file of OpenLM SLM.

![](/img/legacy/kb/word-image-80-1.png)

2. In the var\_schedulingTaskURL, change HTTP to HTTPS.

![](/img/legacy/kb/word-image-81-1.png)

3. Save the OpenLM SLM Param.js file to save the changes.

### Required Changes in OpenLM Identity Service appsettings.json File

1. Navigate to the appsettings.json file of OpenLM Identity Service.

![](/img/legacy/kb/word-image-82-1.png)

2. Change the scheduler URL to HTTPS. Save the appsettings.json file.

![](/img/legacy/kb/word-image-83-1.png)

OR

In the OpenLM Identity Service UI, navigate to the Security Configuration tab, and change the URL for Report Scheduler to HTTPS.

![](/img/legacy/kb/word-image-84.png)

Restart the "OpenLM Reports Scheduler" service.

![](/img/legacy/kb/word-image-85-1.png)

The OpenLM SLM will be now connected to Report Scheduler through HTTPS.

## **Using OpenLM Reports Scheduler**

### Scheduling a Report

1. To schedule a report, open any of the EasyAdmin reports (e.g. License Usage).

2. Configure the report fields, filters, and other options as you require.

3. Click **Share** in the bottom-left corner of the report window then click on **Schedule**.

![](/img/legacy/kb/word-image-86-1.png)

### 

4. The **Schedule Report** window appears:

***[![](/img/legacy/kb/scheduler.png)](/img/legacy/kb/scheduler.png)***

Here you can set up:

* Frequency of the report (e.g. Every Sunday at 01:00 AM),
* Recipient(s): this can be either an existing user(s), group(s), or any number of direct email addresses. Please note that for the user and group recipients, a valid email address must be associated with the user and/or the users in those groups
* Job Description: any text you enter here will be included in the email report
* Receiving User Timezone: if the recipient is in a different timezone than the OpenLM SLM, this option can be used to adjust the timing

5. Click **OK** to save the report, then **Close** the window.

### 

### Managing Scheduled Reports

In order to manage scheduling tasks that you have already created:

1. Click EasyAdmin Start → Scheduling Tasks

![](/img/legacy/kb/word-image-88-1.png)

2. In the window that appears, select any of the tasks you wish to modify. You can **Edit**, **Delete**, **Disable/Enable** and **Show URL** of any of the scheduled reports (this feature is identical to the one when clicking Share → Share Link)

![](/img/legacy/kb/word-image-89-1.png)
