---
title: "OpenLM Alerts"
description: OpenLM Alerts feature is designed to help you monitor the stability and availability of a licensing system. You can define alert conditions and actions.
sidebar_position: 3
---

OpenLM Alerts feature is designed to help you monitor the stability and availability of a licensing system. You can define alert conditions and actions that will be triggered when these conditions are met.

The extension can handle complex conditions for multiple license servers and features. There are several options for how these alerts are displayed:

- In the EasyAdmin User Interface Alerts widget, as an event in the Application Event Log.
- Sent as letters to one or multiple email accounts.

This document goes over the OpenLM Alerts functionality and configuration options.

## Alerts configuration form

To set up a new alert:

1. In the OpenLM EasyAdmin User Interface, select **Start → Administration → Alerts Management.  
   ![Screenshot: Alerts configuration form](/img/legacy/word-image-26598-2.png)**
2. Select **Add Rule** to introduce a new Alert condition.  
   ![Screenshot 2: Alerts configuration form](/img/legacy/word-image-26598-3.png)
3. Name the new alert (for example, "alert1"), and set its notification severity level (for example, "Warning").  
   ![Screenshot 3: Alerts configuration form](/img/legacy/word-image-26598-4.png)
4. Select the timing and frequency on how often the alert condition will be checked, either:
   - - Pick a date and time or
     - Enter a custom CRON pattern (when you check the radio button, the values from option A are converted to a pattern for convenience)
5. Select **Save**. Now you can define alert rules (conditions and actions).
6. Alert condition: select the **Type** dropdown menu and select a condition type.

   ![Screenshot 4: Alerts configuration form](/img/legacy/word-image-26598-5.png)

   The following condition types are available:

   - **Feature usage percentage**: Notify when the usage of a feature is above or below predefined thresholds.
   - **Duplicate license usage**: Notify when a user has checked out the same feature on multiple workstations.
   - **Feature expiration date**: Notify when a feature's license expiration date is coming up.
   - **License servers not responding**: Notify when a monitored license manager's status is either DOWN or UNKNOWN. In triad configurations, all servers (or Brokers monitoring the license servers) have to be down for this condition to be triggered.
   - **Users not assigned to a default group**: Notify if users do not have a default group set (that is, still using the system default "OpenLM\_Everyone")
   - **Users not assigned to a default project**: Notify if users do not have a default project assigned.
   - **Usage session duration**: Notify when a license has been checked out for more than the specified duration.
   - **a Total number of denials in a predefined period**: Notify when the number of license denials surpasses a set threshold during a specified period.
   - **Persistence queue overflow:** Notify and alert when the number of records in OLM\_PERSISTED\_MESSAGES DB exceeds a certain limit.

   Once selected, select **Add** to open the condition configuration window.
7. Condition configuration:  
   The condition configuration may differ from type to type: some require a threshold number or a period to be typed in, others require specifying a feature or license server, and so on. For example, consider a feature expiration condition with `<` (less-than) and a 14-day period. This condition triggers when there are fewer than 14 days until a license expires. Select **Save** to commit the changes.

![Screenshot 5: Alerts configuration form](/img/legacy/word-image-26598-6.png)

Select **OK** once done to commit the settings.
8. Adding multiple conditions:  
   Additional conditions can be added to a single alert using AND / OR logic. The AND / OR logic is applied serially (without parenthesis). See the following image of two separate conditions (`expiration < 14 AND feature usage percentage > 80`). This alert will be triggered when there are less than 14 days until the license expiration date and the feature usage percentage is over 80%.![Screenshot 6: Alerts configuration form](/img/legacy/word-image-26598-7.png)
9. Action configuration:  
   From the **Type** dropdown menu, select one of the actions to be executed when the alert is triggered:![Screenshot 7: Alerts configuration form](/img/legacy/word-image-26598-8.png)
   - **Send an email** (Easy Admin User Interface Email configuration required)
   - **Show application alert** - show an alert in the EasyAdmin User Interface Alerts window
   - **Create an Event Log** - write an event in the Windows Application Event Log
   - **Run a program on OpenLM SLM** - run a program or command on the machine that hosts the OpenLM SLM
   - **Run a Broker command on LM Server** - run one of the standard Broker commands (start, stop, re-read the license file, restart) or a custom one on the license manager machine.

   Select **Add** to open the action configuration window and define specific parameters for the selected action type.
10. Define action type-specific settings:  
    ![Screenshot 8: Alerts configuration form](/img/legacy/word-image-26598-9.png)
    - **Address** (email only) - the email to send the alert to.
    - **Users** (email only) - send an email to a specific OpenLM user (provided he/she/them has the email specified in his/her/their user profile).
    - **Notification mode** - define whether this action will be run only once or every time the alert condition is triggered.
    - **Command** (Broker and OpenLM SLM action only):
      - For Broker this can be either the start/stop / reread / restart or a custom command
      - For OpenLM SLM the command runs as:
    - **Limit sending times** - restrict the execution of this action to a certain time. for example, can be used to avoid sending emails at early hours. A time can either be picked or entered in the custom pattern field as a CRON expression.
    - **Customized Title** (email, application, or Event Log only)- a custom title

    Select **OK** when done configuring to close the window.

    Note: as with conditions, an alert can have multiple actions.
11. Select **Save** to commit the alert configuration.

## Automatically delete alert notifications

![Screenshot: Automatically delete alert notifications](/img/legacy/word-image-26598-10.png)

## Recommendations

Every alert query consumes system resources, hence a good alert system should contain the minimum number of checks that would ensure a stable and effective licensing system.

## Email

OpenLM Alerts may be sent by email. Email needs to be configured accordingly:

1. Select the EasyAdmin **Start → Administration**.
2. Select the **Email.**
3. Configure the email parameters accordingly.
4. Select **Save** to commit the settings. Note that you will have to send at least one test email before you can save the configuration.  
   ![Alets](/img/legacy/Screenshot-2023-01-21-at-22.51.31.png)

**Note:** if using Google's G-Suite SMTP servers, the password must be set as the App Password as per [Google's steps](https://support.google.com/accounts/answer/185833?hl=en)
