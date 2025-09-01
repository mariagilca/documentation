---
sidebar_position: 17
---

# Notifications

## Overview

Notifications in OpenLM keep you informed about key license activities, system events, and compliance issues.

## How Notifications work

Notifications are triggered by alert rules defined in the Alerts module. When an alert is activated—for example, "License usage > 90%"—the Notifications service sends a message through the configured delivery channel: email, ticket, or push.



## Set up email notifications

Follow these steps to configure email notifications:

1. Configure the sender account and associated security settings.
2. Select the **Security** toggle, and enter required security details.
3. Add recipient email addresses.
4. Send a test email to verify connectivity.
   - Wait until you receive a test email to confirm connectivity.
5. Select **Save** to apply changes.

## Ticketing system integration


You can configure OpenLM to send alerts directly to IT ticketing platforms, such as ServiceNow.

- Use email-based alerts to automatically open support tickets in systems that accept email triggers.
- Configure the sender address, port, and security settings based on your system's requirements.
- Use the "Send sample email" feature to verify the connection before going live.

> For environments using API-based integration, OpenLM can connect to ticketing systems directly, enabling real-time incident creation and tracking.

## Push notifications

Push notifications provide real-time alerts to subscribed devices. There are 2 key areas to manage:

- **Notification history**: View a complete log of all previously sent push notifications. This is useful for verifying delivery or auditing activity.
- **Subscriptions**: See which applications or devices are currently registered to receive push notifications. This ensures that alerts are only sent to active, intended recipients.