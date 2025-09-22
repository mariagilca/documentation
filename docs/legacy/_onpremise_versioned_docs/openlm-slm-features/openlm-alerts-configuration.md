---
title: OpenLM Alerts Configuration
sidebar_position: 3
description: Guide to configuring alerts in OpenLM for license monitoring and notifications.
---

Alerts management
The OpenLM Alerts feature helps you monitor the stability and availability of your licensing system. You can define alert conditions and the actions that will be triggered when those conditions are met.

The alerts system can handle complex conditions for multiple license servers and features. Alert notifications can be displayed in the EasyAdmin User Interface, as an event in the Application Event Log, or sent to one or more email accounts.

## The alerts configuration form
To set up a new alert:

In the OpenLM EasyAdmin User Interface, click Start → Administration → Alerts Management.

!

Click Add Rule to create a new alert condition.

!

Name the new alert (e.g., alert1) and set its notification severity level (e.g., Warning).

!

Select the timing and frequency for when the alert condition will be checked. You can choose a specific date and time or enter a custom CRON pattern.

Click Save. You can now define alert rules (conditions and actions).

Define the alert condition: click the Type dropdown menu and select a condition type.

!

The following condition types are available:

Feature usage percentage: Notifies when the usage of a feature is above or below a predefined threshold.

Duplicate license usage: Notifies when a user has checked out the same feature on multiple workstations.

Feature expiration date: Notifies when a feature's license expiration date is approaching.

License servers not responding: Notifies when a monitored license manager's status is DOWN or UNKNOWN. In a triad configuration, all servers must be down for the alert to trigger.

Users not assigned to a default group: Notifies if users do not have a default group.

Users not assigned to a default project: Notifies if users do not have a default project.

Usage session duration: Notifies when a license has been checked out for longer than a specified duration.

Total number of denials in a predefined period: Notifies when the number of license denials exceeds a set threshold.

Persistence queue overflow: Notifies when the number of records in the OLM_PERSISTED_MESSAGES database exceeds a certain limit.

After selecting a type, click Add to open the condition configuration window.

Configure the condition. The configuration options depend on the type you selected. For example, a Feature expiration date condition may require a threshold number of days. Click Save to commit the changes.

!

Add multiple conditions by using AND / OR logic. This logic is applied serially (without parentheses). For example, a rule with expiration < 14 AND feature usage percentage > 80 will only be triggered if both conditions are met.

!

Configure the alert action. From the Type dropdown menu, select an action to be executed when the alert is triggered.

!

The following actions are available:

Send an email: Sends an email to a specified address or user.

Show application alert: Displays an alert in the EasyAdmin User Interface Alerts window.

Create an Event Log: Writes an event to the Windows Application Event Log.

Run a program on OpenLM SLM: Runs a program or command on the machine hosting the OpenLM SLM.

Run a Broker command on LM Server: Runs a standard Broker command (start, stop, re-read, restart) or a custom command on the license manager machine.

Click Add to open the action configuration window and define the specific parameters for the selected action type.

Define action-specific settings.

!

Address (email only): The email address to send the alert to.

Users (email only): Sends an email to a specific OpenLM user (if an email is specified in their profile).

Notification mode: Defines whether the action will run only once or every time the alert condition is triggered.

Command (Broker and OpenLM SLM actions only): The specific command to execute.

Limit sending times: Restricts the execution of the action to a certain time period (e.g., to avoid sending emails at night).

Customized Title (email, application, or Event Log only): A custom title for the alert.

An alert can have multiple actions. Click OK when done configuring.

Click Save to commit the alert configuration.

## Automatically delete alert notifications
You can configure OpenLM to automatically delete alert notifications to manage the size of your alerts list.

!

## Recommendations
Every alert query consumes system resources. An efficient alert system should contain the minimum number of checks required to ensure a stable and effective licensing system.

## Email configuration
OpenLM alerts can be sent via email. To configure this:

Click EasyAdmin Start → Administration → Email.

Configure the email parameters.

Click Save. You must send at least one test email before you can save the configuration.

!

:::note
If you are using Google's G-Suite SMTP servers, the password must be set as an App Password, as per Google's instructions.
:::

Referenced Images
img/openlm-alerts-management-button.png

img/openlm-add-rule-button.png

img/openlm-alert-rule-dialog.png

img/openlm-alert-condition-type-dropdown.png

img/openlm-alert-condition-configuration.png

img/openlm-alert-with-multiple-conditions.png

img/openlm-alert-action-type-dropdown.png

img/openlm-alert-action-configuration.png

img/openlm-automatic-alert-notification-deletion.png

img/openlm-email-configuration-window.png








