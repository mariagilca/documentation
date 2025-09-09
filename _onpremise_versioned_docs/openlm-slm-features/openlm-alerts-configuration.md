---
title: "OpenLM Alerts Configuration"
date: "2023-11-05T20:49:08"
permalink: "https://www.openlm.com/docs/openlm-slm-features/openlm-alerts-configuration/"
posttype: "manual_documentation"
id: "6669"
---

The OpenLM Alerts feature is designed to help you monitor the stability and availability of a licensing system. You can define alert conditions and actions that will be triggered when these conditions are met.

The extension can handle complex conditions for multiple license servers and features. There are several options for how these alerts are displayed:
<ul>
 <li>In the EasyAdmin User Interface Alerts widget, as an event in the Application Event Log.</li>
 <li>Sent as letters to one or multiple email accounts.</li>
</ul>
This document goes over the OpenLM Alerts functionality and configuration options.
<h2><a id="post-26598-_f98w50t3b1ma"></a><strong>The Alerts Configuration Form</strong></h2>
To set up a new alert:
<ol>
 <li>In the OpenLM EasyAdmin User Interface, click <strong>Start → Administration → Alerts Management.
<img class="wp-image-40170" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-2.png" /></strong></li>
 <li>Click <strong style="font-size: 16px;">Add Rule</strong><span style="font-size: 16px;"> to introduce a new Alert condition.
<img class="wp-image-40171" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-3.png" /></span></li>
 <li>Name the new alert (e.g. “alert1”), and set its notification severity level (e.g. “Warning”).
<img class="wp-image-40172" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-4.png" /></li>
 <li>Select the timing and frequency on how often the alert condition will be checked, either:
<ul>
 <li style="list-style-type: none;">
<ul>
 <li>Pick a date and time or</li>
 <li>Enter a custom CRON pattern (when you check the radio button, the values from option A are converted to a pattern for convenience)</li>
</ul>
</li>
</ul>
</li>
 <li>Click <strong style="font-size: 16px;">Save</strong><span style="font-size: 16px;">. Now you can define alert rules (conditions and actions).</span></li>
 <li>Alert condition: click the <strong style="font-size: 16px;">Type</strong><span style="font-size: 16px;"> dropdown menu and select a condition type.</span>
<ol>
 <li></li>
</ol>
<img class="wp-image-40173" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-5.png" />

The following condition types are available:
<ul>
 <li><strong>Feature usage percentage</strong>: Notify when the usage of a feature is above or below predefined thresholds.</li>
 <li><strong>Duplicate license usage</strong>: Notify when a user has checked out the same feature on multiple workstations.</li>
 <li><strong>Feature expiration date</strong>: Notify when a feature’s license expiration date is coming up.</li>
 <li><strong>License servers not responding</strong>: Notify when a monitored license manager’s status is either DOWN or UNKNOWN. In triad configurations, all servers (or Brokers monitoring the license servers) have to be down for this condition to be triggered.</li>
 <li><strong>Users not assigned to a default group</strong>: Notify if users do not have a default group set (i.e. still using the system default “OpenLM_Everyone”)</li>
 <li><strong>Users not assigned to a default project</strong>: Notify if users do not have a default project assigned.</li>
 <li><strong>Usage session duration</strong>: Notify when a license has been checked out for more than the specified duration.</li>
 <li><strong>a Total number of denials in a predefined period</strong>: Notify when the number of license denials surpasses a set threshold during a specified period.</li>
 <li><strong>Persistence queue overflow: </strong>Notify and alert when the number of records in OLM_PERSISTED_MESSAGES DB exceeds a certain limit.</li>
</ul>
Once selected, click <strong>Add</strong> to open the condition configuration window.</li>
 <li>Condition configuration:
The condition configuration may differ from type to type: some require a threshold number or a period to be typed in, others require specifying a feature or license server, and so on.For example, let’s take a feature expiration condition with a “<” (less) and 14 days period. This condition will trigger when there are less than 14 days until a license expires.Click <strong>Save</strong> to commit the changes.<img class="wp-image-40174" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-6.png" />Click <strong>OK</strong> once done to commit the settings.</li>
 <li>Adding multiple conditions:
Additional conditions can be added to a single alert using AND / OR logic. The AND / OR logic is applied serially (without parenthesis). See the image below of two separate conditions (expiration < 14 AND feature usage percentage > 80). This alert will be triggered when there are less than 14 days until the license expiration date and the feature usage percentage is over 80%.<img class="wp-image-40175" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-7.png" /></li>
 <li>Action configuration:
From the <strong>Type</strong> dropdown menu, select one of the actions to be executed when the alert is triggered:<img class="wp-image-40176" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-8.png" />
<ul>
 <li><strong>Send an email</strong> (Easy Admin User Interface Email configuration required)</li>
 <li><strong>Show application alert</strong> - show an alert in the EasyAdmin User Interface Alerts window</li>
 <li><strong>Create an Event Log </strong>- write an event in the Windows Application Event Log</li>
 <li><strong>Run a program on OpenLM SLM</strong> - run a program or command on the machine that hosts the OpenLM SLM</li>
 <li><strong>Run a Broker command on LM Server</strong> - run one of the standard Broker commands (start, stop, re-read the license file, restart) or a custom one on the license manager machine.</li>
</ul>
Click <strong>Add</strong> to open the action configuration window and define specific parameters for the selected action type.</li>
 <li>Define action type-specific settings:
<img class="wp-image-40177" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-9.png" />
<ul>
 <li><strong>Address</strong> (email only) - the email to send the alert to.</li>
 <li><strong>Users</strong> (email only) - send an email to a specific OpenLM user (provided he/she/them has the email specified in his/her/their user profile).</li>
 <li><strong>Notification mode</strong> - define whether this action will be run only once or every time the alert condition is triggered.</li>
 <li><strong>Command</strong> (Broker and OpenLM SLM action only):
<ul>
 <li>For Broker this can be either the start/stop / reread / restart or a custom command</li>
 <li>For OpenLM SLM the command is executed as:</li>
</ul>
</li>
 <li><strong>Limit sending times</strong> - restrict the execution of this action to a certain time. E.g. can be used to avoid sending emails at early hours. A time can either be picked or entered in the custom pattern field as a CRON expression.</li>
 <li><strong>Customized Title </strong>(email, application, or Event Log only)- a custom title</li>
</ul>
Click <strong>OK</strong> when done configuring to close the window.

Note: as with conditions, an alert can have multiple actions.</li>
 <li>Click <strong style="font-size: 16px;">Save</strong><span style="font-size: 16px;"> to commit the alert configuration.</span></li>
</ol>
<h2><a id="post-26598-_y1tzq5xxpvbg"></a>Automatically delete alert notifications</h2>
<img class="wp-image-40178" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26598-10.png" />
<h2><a id="post-26598-_eovuswi32nay"></a>Recommendations</h2>
Every alert query consumes system resources, hence a good alert system should contain the minimum number of checks that would ensure a stable and effective licensing system.
<h2><a id="post-26598-_auet2tlea0z8"></a>Email</h2>
OpenLM Alerts may be sent via email. Email needs to be configured accordingly:
<ol>
 <li>Click the EasyAdmin <strong>Start → Administration</strong>.</li>
 <li>Click the <strong>Email.</strong></li>
 <li>Configure the email parameters accordingly.</li>
 <li>Click <strong>Save</strong> to commit the settings. Note that you will have to send at least one test email before you can save the configuration.
<img class="alignnone wp-image-51693 size-full" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-01-21-at-22.51.31.png" alt="Alets" width="2560" height="1348" /></li>
</ol>
 

<strong>Note: </strong>if using Google's G-Suite SMTP servers, the password must be set as the App Password as per<a href="https://support.google.com/accounts/answer/185833?hl=en"> Google's steps</a>
