---
sidebar_position: 2
title: Freshworks Alerts Integration
description: Automate Freshdesk ticket creation from OpenLM Alerts.
---

Use the Freshworks Alerts integration to automate Freshdesk ticket creation from OpenLM Alerts. When an alert rule fires in OpenLM, the integration creates a ticket in your Freshdesk account so the right team can respond.

After you complete this guide, OpenLM Alerts route to Freshdesk tickets automatically, with no manual steps after the initial setup.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Integrations → Freshworks Alerts Integration**.

**Before you start:** Activate **Freshworks Alerts Integration** in [OpenLM Products](/cloud/openlm-administration/products), then configure at least one rule in [OpenLM Alerts](/cloud/automations/alerts) so there are events to send.

**Related:** [Notifications](/cloud/automations/notifications)
:::

## How the integration works

OpenLM Alerts flow into Amazon SQS. AWS Lambda functions read the queue, look up your Freshdesk credentials in AWS Secrets Manager, and create the ticket through the Freshdesk API. You provide the credentials once, in the OpenLM Platform; OpenLM stores them securely in AWS Secrets Manager.

### Components you need

You need these components to send OpenLM alert events to Freshdesk:

- An OpenLM Platform account with the **Freshworks Alerts Integration** product activated.
- An active Freshdesk account with administrator access.
- The **OpenLM Alerts Integration** application installed from the Freshworks Marketplace.
- An OpenLM Alerts rule that triggers on the events you want as Freshdesk tickets.

### Privacy and data handling

- Alert payloads come from OpenLM Alerts through Amazon SQS and are processed by AWS Lambda functions.
- Freshworks credentials are stored in AWS Secrets Manager. They are not visible to other OpenLM accounts.
- Tickets are created in Freshdesk through the Freshdesk API using the credentials you provide.

## Configure the integration

Complete the tasks in this section to connect OpenLM to Freshdesk.

### Confirm prerequisites

Before you start, make sure the following requirements are met:

- You can log in to Freshdesk as an administrator.
- You can log in to OpenLM Platform, or you can register a new OpenLM Platform account.
- OpenLM Alerts is configured with at least one alert rule. See [OpenLM Alerts](../automations/alerts).

### Install the OpenLM application from the Freshworks Marketplace

1. Sign in to Freshdesk as an administrator.
2. Open the Freshworks Marketplace.
3. Search for **OpenLM Alerts Integration** and install the application.
4. Open the application and select **Register for OpenLM Platform**. Freshworks redirects you to OpenLM Platform.

### Create or log in to your OpenLM Platform account

1. On the OpenLM Platform log-in page, register a new account or log in with an existing account.
2. After sign-in, the OpenLM Homepage opens.

### Activate Freshworks Alerts Integration

1. From the OpenLM Platform Homepage, select **Go to Products**, or open the navigation menu and select **Products**.
2. On the Products page, locate the **Freshworks Alerts Integration** card.
3. Select **Activate**.

### Enter your Freshworks credentials

1. On the same product card, select **Go to Product Page**, or open **Freshworks Alerts Integration** from the navigation menu.
2. On the **Manage Credentials** page, enter the following values:

| Field | What to enter | Where to find it in Freshdesk |
|---|---|---|
| API Key | Your Freshdesk API key. | In Freshdesk, open **Profile Settings → View API Key**. |
| Domain | The domain name prefix from your Freshdesk URL. For example, if your URL is `acme.freshdesk.com`, enter `acme`. | The portion of your Freshdesk URL before `.freshdesk.com`. |
| Email | The email address of the ticket requester. If no contact exists with this email in Freshdesk, the integration creates a new contact. | The Freshdesk contact you want listed as the requester for OpenLM-generated tickets. |

3. Select **Save**.

OpenLM stores your credentials in AWS Secrets Manager. The integration starts processing alerts immediately.

## Verify the integration

After you save your credentials, verify that an alert reaches Freshdesk as a ticket.

1. In OpenLM Alerts, trigger an alert that matches one of your alert rules. Use a non-disruptive condition for testing.
2. Wait for the alert to flow through Amazon SQS and the AWS Lambda function. Most tickets appear within a minute.
3. In Freshdesk, open the ticket inbox and confirm that the new ticket exists.
4. Confirm that the ticket requester matches the email address you entered on the **Manage Credentials** page.

## Manage tickets

Once tickets reach Freshdesk, manage them with the standard Freshdesk workflow:

- Triage and assign tickets to the correct support agent.
- Reply to the contact through Freshdesk to keep the conversation in one place.
- Close tickets in Freshdesk; closing a ticket has no effect on the source alert in OpenLM Alerts.

## Troubleshoot

If tickets do not appear in Freshdesk, work through this checklist before opening a support case:

- Confirm the **API Key**, **Domain**, and **Email** fields on the OpenLM **Manage Credentials** page match your Freshdesk values exactly. The API key must come from the same Freshdesk account.
- Open OpenLM Alerts and confirm that the alert rule actually fired. If the rule did not fire, no ticket is sent.
- Confirm that the **Freshworks Alerts Integration** product is **Active** on the Products page.
- In Freshdesk, confirm the requester contact is not suspended.
- If you regenerated the Freshdesk API key, return to **Manage Credentials** in OpenLM and save the new key.

## Related

- [OpenLM Alerts](../automations/alerts)
- [Notifications](../automations/notifications)
- [Products](../openlm-administration/products)
