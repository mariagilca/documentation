---
title: "Notifications"
sidebar_position: 3
description: "The Notification Service is OpenLM's shared delivery hub. It sends email, ticketing, and push notifications on behalf of OpenLM apps such as Alerts, Identity, and Cloud."
---

## Overview

The Notification Service is OpenLM's shared delivery hub. It doesn't decide *what* to notify you about—it delivers messages that other OpenLM apps raise, through three channels: **email**, **ticketing**, and **push**.

Notifications originate from several OpenLM applications—**Identity**, **Identity Alignment**, **Alerts**, **Cloud**, and any **Custom** app—each of which hands its messages to the Notification Service. A single notification can be delivered through one, some, or all three channels.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Platform Administration → Notifications**.

**Related:** [Alerts](/cloud/automations/alerts)
:::


## How notifications work

1. An OpenLM app (for example, an **Alerts** rule such as "License usage > 90%") raises a notification.
2. The app publishes the notification to the Notification Service.
3. The service delivers it through each channel the notification targets—email, ticketing, and/or push.

Because delivery is centralized, you configure each channel once here and every OpenLM app reuses it.

## Email notifications

The **Email Notifications** page manages who receives OpenLM's test emails and, optionally, how notification subject lines are tagged.

![The Email Notifications page in the OpenLM Platform, showing the Test Email Recipients grid and the Advanced section.](/img/notifications/email-notifications.png)

**Test Email Recipients** — add the addresses used to verify the channel:

1. Type an address in the **Email** field and select **Add**. Use the row actions to edit or remove an address.
2. Select **Send Sample Email** to send a test message to those recipients. On success you'll see *"Email was sent, check inbox please."*
3. Select **Save** to keep your changes.

:::info[Sending is managed for you]
In the hosted OpenLM Platform, email is sent centrally through OpenLM's managed mail service (from `no-reply` addresses), so there are no SMTP server fields to configure here—you manage recipients and subject formatting only. On-premise deployments additionally configure a **Sender Account** (Sender Email, Host, Port, a **Security** toggle that reveals SMTP username and password, and an **SSL** toggle).
:::

The actual recipients of a given notification are set by the app that raises it (for example, an Alert's own recipient list). Test Email Recipients are the addresses used when you send a sample email from this page.

### Subject prefixes and suffixes (Advanced)

Expand **Advanced** to add a prefix and/or suffix to notification email subject lines, per originating application. This makes it easy to filter or route OpenLM mail in your inbox or ticketing system.

![The Advanced section with the Prefix/Suffix toggle enabled and the Application, Prefix, and Suffix fields.](/img/notifications/email-advanced.png)

1. Turn on **Prefix/Suffix**.
2. Select an **Application**—OpenLM Identity application, OpenLM Identity Alignment, OpenLM Alerts, OpenLM Cloud, or Custom.
3. Enter a **Prefix**, a **Suffix**, or both, then select **Add**. Only one entry per application takes effect—if you add more than one for the same application, the first is used.
4. Select **Save**.

## Ticketing notifications

Ticketing turns notifications into support tickets by emailing them to your ticketing platform's inbound *email-to-ticket* address.

![The Ticketing Notifications page, showing the Ticket System dropdown set to EmailSender and the Test Email Recipients grid.](/img/notifications/ticketing-notifications.png)

1. Under **Ticket System**, select **EmailSender** (the available delivery method).
2. Add your ticketing platform's intake address under **Test Email Recipients** (for example, a ServiceNow, Jira, or Zendesk inbound email address).
3. Select **Send Sample Email** to confirm the address accepts mail.
4. Select **Save**.

:::note
Ticketing delivery is email-only: OpenLM sends the notification as an email that your platform ingests through its email-to-ticket feature. There is no direct API or two-way integration, and OpenLM does not track ticket status. As with email, on-premise deployments configure their own **Sender Account** here.
:::

## Push notifications

Push delivers real-time alerts to devices that have subscribed to receive them. In the hosted Platform, push is delivered through Firebase Cloud Messaging (FCM). The page has two tabs.

### Push Notifications (history)

A log of every push notification that has been sent—useful for delivery verification and auditing.

![The Push Notifications tab, showing the history grid with Application, Notification Level, and Notification Time columns and a detail pane.](/img/notifications/push-notifications.png)

- Columns: **Application**, **Notification Level** (Warning, Info, or Error), and **Notification Time**.
- Select a row to view its **Subject** and **Message** in the detail pane.
- Use the toolbar to **Delete** a selected notification, **Send Sample Push Notification**, **Refresh** the list, or **Search**.

### Subscriptions

The devices currently registered to receive push notifications. Devices are added automatically when they subscribe; this tab is read-only.

![The Subscriptions tab, showing Application, Token, and Subscribed at columns.](/img/notifications/push-subscriptions.png)

Columns: **Application**, **Token**, and **Subscribed at**.

### Send a sample push notification

To confirm that subscribed devices receive pushes, select **Send Sample Push Notification** and complete the dialog.

![The Send Sample Push Notification dialog with Subject, Application, Notification Level, and Message fields.](/img/notifications/push-sample-dialog.png)

1. Enter a **Subject** (required).
2. Select an **Application** and a **Notification Level** (Warning, Info, or Error).
3. Enter a **Message** (required).
4. Select **Send**. The sample is delivered to subscribed devices and recorded in the history.

## Access

Managing notification settings requires an administrator role in the OpenLM Platform.
