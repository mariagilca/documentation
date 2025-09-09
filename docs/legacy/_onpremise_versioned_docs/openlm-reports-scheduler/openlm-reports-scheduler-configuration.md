---
title: "OpenLM Reports Scheduler Configuration"
date: "2023-11-04T23:32:08"
permalink: "https://www.openlm.com/docs/openlm-reports-scheduler-installation-guide/openlm-reports-scheduler-configuration/"
posttype: "manual_documentation"
id: "6632"
---

The OpenLM EasyAdmin user interface incorporates a variety of reports that display information related to license usage. EasyAdmin allows sharing these reports by either:
<ol>
 <li>Granting report viewing access to non-administrator accounts</li>
 <li>Sharing a custom-generated report URL</li>
 <li>Sharing the report by email to specific users, groups, or individual addresses in an accessible format (.png, .csv)</li>
</ol>
By default, these reports are generated manually whenever the user requests or accesses the given feature. The OpenLM Reports Scheduler extension allows administrators to automate this process by giving them the ability to generate reports according to a predefined schedule.

 
<h2><a id="post-35188-_heading=h.gjdgxs"></a><strong>Overview</strong></h2>
To schedule a report, the OpenLM administrator should:
<ol>
 <li>Configure a valid SMTP server in EasyAdmin’s “Email” module.</li>
 <li>If EasyAdmin authentication is turned on, check that you have an admin account in EasyAdmin and configure it with Scheduler.</li>
 <li>Open a specific EasyAdmin report and define filters (e.g. License Usage report).</li>
 <li>Click Share → Schedule, define the frequency, report recipients, then click Save.</li>
</ol>
Once this is done, the scheduled report will be sent to the designated recipients at the specified time. A scheduled report displays the same data as a regular report, the main difference being that it’s generated automatically. This makes them ideal when used with a date range filter that displays a recent period (i.e. “Last 7 days”).
<h2><a id="post-35188-_heading=h.2et92p0"></a><strong>Configuring EasyAdmin to Produce Scheduled Reports</strong></h2>
<h3><a id="post-35188-_heading=h.tyjcwt"></a><strong>Setting up the Email Configuration</strong></h3>
Since OpenLM Reports Scheduler sends the reports by email, a working email server must be configured in <strong>EasyAdmin’s Start → Administration → Email/SMS</strong> module.

<img class="alignnone size-full wp-image-62538" src="https://www.openlm.com/wp-content/uploads/2022/03/Screenshot-2023-11-01-at-21.43.04.png" alt="" width="1262" height="724" />

<strong>It is highly recommended to enter at least one value for Recipient Addresses as it will be used to send notifications in case any errors occur.</strong>
<h3><a id="post-35188-_heading=h.3dy6vkm"></a><strong>Setting up the Recipient User’s Email Account </strong></h3>
By default, scheduled reports are attributed to a specific user. In most cases, this user would be the administrator who set up the scheduled reports. This designated user should exist within the OpenLM database and should have a valid email account associated with it.

To set a user’s email, open <strong>EasyAdmin User Interface Start → Users & Groups → Users</strong>. Find the user you want to assign an email to, double-click on it, and edit the user’s details as depicted in the image below:

<img class="wp-image-35196" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-67.png" />

<img class="wp-image-35197" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-68.png" />

For more information on how to create users (and other entities) in OpenLM, please refer to this application note: <a href="https://www.openlm.com/application-notes-v2-0/application-notes-easyadmin-configuration-v2-0/application-note-3042-openlm-v2-0-introducing-entities-in-openlm-users-groups-ip-and-hosts/">Introducing Entities in OpenLM – Users, Groups, IP and Hosts</a>
<h2><a id="post-35188-_heading=h.4d34og8"></a><strong>Configuring OpenLM Reports Scheduler</strong></h2>
<h3><a id="post-35188-_heading=h.2s8eyo1"></a><strong>Editing the report_scheduler.properties file</strong></h3>
The report_scheduler.properties file is where all of the Reports Scheduler’s settings are stored. Usually, most settings required for operation are defined during the installation process or preserved from a previous version (if upgrading). Manually editing this file is not required as long as the steps in section 4 (“Configuring EasyAdmin to produce scheduled reports”) have been followed.

However, editing is possible and even required in special cases such as:
<ul>
 <li>If no SMTP server has been configured in EasyAdmin. By default, the SMTP configuration in EasyAdmin overrides the one in report_scheduler.properties. However, if for some reason SMTP is not configured there, the <strong>mail</strong> variables can be used to configure SMTP independently. A benefit of doing this is that administrators can be notified by email if any errors occur during the integration of the Reports Scheduler with the Server.</li>
 <li>If there are any changes to the OpenLM SLM hostname (if installed on a different machine than the Server) or default communication ports.</li>
</ul>
The following variables are most relevant for administrators to configure:
<table>
<thead>
<tr>
<th><strong>Variable</strong></th>
<th><strong>Possible value</strong></th>
<th><strong>Description</strong></th>
</tr>
<tr>
<th>mail.smtp.host*</th>
<th><em>User-defined</em></th>
<th>The SMTP server host or IP.</th>
</tr>
<tr>
<th>mail.smtp.port*</th>
<th><em>User-defined</em></th>
<th>The SMTP server port.</th>
</tr>
<tr>
<th>mail.smtp.auth*</th>
<th><strong>true</strong> or <strong>false</strong></th>
<th>Set depending on whether the SMTP server requires login credentials.</th>
</tr>
<tr>
<th>mail.smtp.ssl*</th>
<th><strong>true</strong> or <strong>false</strong></th>
<th>Set depending on whether the SMTP server uses SSL for connections.</th>
</tr>
<tr>
<th>mail.smtp.username*</th>
<th><em>User-defined</em></th>
<th>The SMTP server user.</th>
</tr>
<tr>
<th>mail.smtp.password*</th>
<th><em>User-defined</em></th>
<th>The SMTP server password.</th>
</tr>
<tr>
<th>mail.smtp.sender*</th>
<th><em>User-defined</em></th>
<th>The email address that will show up on the “from:” field.</th>
</tr>
<tr>
<th>mail.recipients*</th>
<th><em>User-defined</em></th>
<th>The recipient email(s), separated by a semicolon.</th>
</tr>
<tr>
<th>openlm.protocol</th>
<th><strong>http</strong> (default) or <strong>https</strong></th>
<th>The protocol used on OpenLM’s API port.</th>
</tr>
<tr>
<th>openlm.host</th>
<th><strong>localhost </strong>(default) or FQDN</th>
<th>The OpenLM SLM hostname that Reports Scheduler will synchronize with.

The localhost is to be changed by the Fully Qualified Domain Name (FQDN) when the SSL connection is required by the OpenLM SLM.</th>
</tr>
<tr>
<th>openlm.soap.port</th>
<th>Default: <strong>5015 </strong></th>
<th>The OpenLM SLM API port.</th>
</tr>
<tr>
<th>openlm.ea.port</th>
<th>Default: 5015</th>
<th>OpenLM’s EasyAdmin port.</th>
</tr>
<tr>
<th>openlm.ea.host</th>
<th>Default: <strong>localhost </strong>(default) or FQDN</th>
<th>OpenLM’s EasyAdmin hostname, the same as OpenLM SLM’s hostname
The localhost is to be changed by the FQDN when the SSL connection is required.</th>
</tr>
<tr>
<th>openlm.ea.protocol</th>
<th><strong>http </strong>(default) or <strong>https</strong></th>
<th>OpenLM’s EasyAdmin communication protocol. Can be set to <strong>http</strong> or <strong>https</strong>.</th>
</tr>
<tr>
<th>openlm.client.id=openlm.reportscheduler.client</th>
<th rowspan="3">Configured automatically from Identity Service web UI when a user connects Identity Service and Reports Scheduler</th>
<th rowspan="3">Report Scheduler’s credentials for a secure connection.</th>
</tr>
<tr>
<th>openlm.client.secret=reportscheduler_secret</th>
</tr>
<tr>
<th>openlm.client.scope=openlm.server.scope</th>
</tr>
<tr>
<th>scheduler.report.files.directory</th>
<th><em>User-defined</em></th>
<th>If you want reports to also be stored locally in a specific directory, set a path here.</th>
</tr>
<tr>
<th>webdriver.impl.path</th>
<th>Default: <strong>chromedriver.exe</strong></th>
<th>Change if using a different path for the ChromeDriver.</th>
</tr>
</thead>
</table>
* Note: If not configured, Reports Scheduler will use the SMTP server settings configured in EasyAdmin.

<strong>Param.js File Configuration to connect OpenLM SLM (EasyAdmin) with Report Scheduler</strong>

In case OpenLM SLM (Easy Admin) and Report Scheduler are installed on different computers/servers and they are unable to connect, for example, getting the connection error while connecting to default host 127.0.0.1. Perform the following steps to change the required hostname and port number in the param.js file of the OpenLM SLM to enable connect it to the required host and port of the Report Scheduler:

To locate the param.js file of the OpenLM SLM, navigate to the below-mentioned default path:

"C:Program FilesOpenLMOpenLM SLMbinwwwrootparams.js"

Default Report Scheduler - scheduling task URL is mentioned in the param.js file and is as per shown in the image below:

<img class="wp-image-35198" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-69.png" />

Change the hostname and/or the port number of the computer/server to that of where the Report Scheduler is installed.
<h3><a id="post-35188-_heading=h.nz87f1ou3y0n"></a><strong>Reports Scheduler Configuration in a Secured Environment</strong></h3>
<strong>Case 1: Connection via Identity Service</strong>

To configure Report Scheduler in a secured environment via the Identity Service, perform the following steps:

Please know it is required to have the OpenLM SLM, Identity Service, and Report Scheduler installed on your machine:

<img class="wp-image-35199" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-70.png" />
<ol>
 <li>Install OpenLM SLM. Refer to the link on How to Install OpenLM SLM:</li>
 <li>Install Identity Service. Refer to the link on How to Install Identity Service:</li>
 <li>Install Report Scheduler. Refer to Section 3 of this document for the Report Scheduler installation process.</li>
 <li>Now, configure these above-installed applications to connect through the Identity service. The OpenLM SLM and Report Scheduler are connected with Identity Service, as shown in the screen below.</li>
</ol>
 

To configure Report Scheduler with Identity Service, go to <strong>Identity Service< Settings< Security Configuration </strong>and switch on the toggle button <img class="wp-image-35200" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-71.png" /> and add Report Scheduler URL. (Port: 8888). Click the <strong>Save</strong> button to save the information.

<img class="wp-image-35201" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-72.png" />
<ol>
 <li>Restart the Report Scheduler to apply the changes and restart the OpenLM SLM.</li>
</ol>
To restart the Report Scheduler, go to <strong>Services</strong> > select <strong>OpenLM Reports Scheduler</strong>, and click <strong>Restart </strong>to restart the service.

Similarly, to restart the OpenLM SLM, go to <strong>Services</strong> > select <strong>OpenLM SLM</strong>, and click <strong>Restart </strong>to restart the service.

<img class="wp-image-35202" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-73.png" />

Report Scheduler will now be connected in a secured environment with Identity Server, as shown in the screen below:

<img class="wp-image-35203" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-74.png" />

The report_scheduler.properties file will be updated with client.id and client.secret, as shown in the image below.

<img class="wp-image-35204" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-75.png" />

<strong>Case</strong> <strong>2</strong> - <strong>Connection through HTTPS</strong>

When the OpenLM SLM is connected through https, it is also required that the OpenLM Report Scheduler is also connected through HTTPS.

Note: The OpenLM SLM will not be able to connect to OpenLM Report Scheduler if they both are not connected through HTTPS.

Required Changes in OpenLM Report Scheduler Properties File

To connect the OpenLM Report Scheduler through HTTPS, perform the following steps:
<ol>
 <li>Navigate to the OpenLM Report Scheduler Properties file.</li>
</ol>
<img class="wp-image-35205" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-76.png" />

2. Change the protocol of openlm.protocol and openlm.ea.protocol fields to HTTPS.

<img class="wp-image-35206" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-77.png" />

3. Change the openlm host to Fully Qualified Domain Name.

<img class="wp-image-35207" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-78.png" />

4. Change the server protocol to HTTPS.

<img class="wp-image-35208" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-79.png" />

5. Save the Report Scheduler Properties file commit  the changes.
<h3>Required Changes in OpenLM SLM Param.js File</h3>
<ol>
 <li>Navigate to the param.js file of OpenLM SLM.</li>
</ol>
<img class="wp-image-35209" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-80.png" />

2. In the var_schedulingTaskURL, change HTTP to HTTPS.

<img class="wp-image-35210" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-81.png" />

3. Save the OpenLM SLM Param.js file to save the changes.
<h3>Required Changes in OpenLM Identity Service appsettings.json File</h3>
<ol>
 <li>Navigate to the appsettings.json file of OpenLM Identity Service.</li>
</ol>
<img class="wp-image-35211" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-82.png" />

2. Change the scheduler URL to HTTPS. Save the appsettings.json file.

<img class="wp-image-35212" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-83.png" />

OR

In the OpenLM Identity Service UI, navigate to the Security Configuration tab, and change the URL for Report Scheduler to HTTPS.

<img class="wp-image-35213" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-84.png" />

Restart the “OpenLM Reports Scheduler” service.

<img class="wp-image-35214" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-85.png" />

The OpenLM SLM will be now connected to Report Scheduler through HTTPS.

 
<h2><a id="post-35188-_heading=h.1ksv4uv"></a><strong>Using OpenLM Reports Scheduler</strong></h2>
<h3><a id="post-35188-_heading=h.44sinio"></a>Scheduling a Report</h3>
1. To schedule a report, open any of the EasyAdmin reports (e.g. License Usage).

2. Configure the report fields, filters, and other options as you require.

3. Click <strong>Share</strong> in the bottom-left corner of the report window then click on <strong>Schedule</strong>.

<img class="wp-image-35215" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-86.png" />
<h3></h3>
4. The <strong>Schedule Report</strong> window appears:

<strong><em><a href="https://www.openlm.com/wp-content/uploads/2022/03/scheduler.png"><img class="alignnone size-full wp-image-35220" src="https://www.openlm.com/wp-content/uploads/2022/03/scheduler.png" alt="" width="752" height="552" /></a></em></strong>

Here you can set up:
<ul>
 <li>Frequency of the report (e.g. Every Sunday at 01:00 AM),</li>
 <li>Recipient(s): this can be either an existing user(s), group(s), or any number of direct email addresses. Please note that for the user and group recipients, a valid email address must be associated with the user and/or the users in those groups</li>
 <li>Job Description: any text you enter here will be included in the email report</li>
 <li>Receiving User Timezone: if the recipient is in a different timezone than the OpenLM SLM, this option can be used to adjust the timing</li>
</ul>
5. Click <strong>OK</strong> to save the report, then <strong>Close</strong> the window.
<h3></h3>
<h3><a id="post-35188-_heading=h.z337ya"></a>Managing Scheduled Reports</h3>
In order to manage scheduling tasks that you have already created:

1. Click EasyAdmin Start → Scheduling Tasks

<img class="wp-image-35217" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-88.png" />

2. In the window that appears, select any of the tasks you wish to modify. You can <strong>Edit</strong>, <strong>Delete</strong>, <strong>Disable/Enable</strong> and <strong>Show URL</strong> of any of the scheduled reports (this feature is identical to the one when clicking Share → Share Link)

<img class="wp-image-35218" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-89.png" />
