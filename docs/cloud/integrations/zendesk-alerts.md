---
sidebar_position: 5
title: Zendesk Alerts Integration
description: Automate Zendesk ticket creation from OpenLM Alerts.
---

Use the Zendesk Alerts integration to automate Zendesk ticket creation from OpenLM Alerts. When an alert rule fires in OpenLM, the integration creates a ticket in your Zendesk account so the right team can respond.

After you complete this guide, OpenLM Alerts route to Zendesk tickets automatically, with no manual steps after the initial setup.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Integrations → Zendesk Alerts Integration**.

**Before you start:** Activate **Zendesk Alerts Integration** in [OpenLM Products](/cloud/openlm-administration/products), then configure at least one rule in [OpenLM Alerts](/cloud/automations/alerts) so there are events to send.

**Related:** [Notifications](/cloud/automations/notifications)
:::

## How the integration works

When an OpenLM Alerts rule fires, the event flows through OpenLM's alert-integration pipeline, which looks up the Zendesk credentials you stored in the OpenLM Platform and creates a ticket through the Zendesk API. You provide the credentials once, in the OpenLM Platform, and OpenLM stores them securely; they are not visible to other OpenLM accounts.

### Components you need

- An OpenLM Platform account with the **Zendesk Alerts Integration** product activated.
- An active Zendesk account with administrator access.
- An OpenLM Alerts rule that triggers on the events you want as Zendesk tickets.

## Set up the integration

Complete these tasks to connect OpenLM to Zendesk.

### Confirm prerequisites

- You can sign in to Zendesk as an administrator.
- You can sign in to the OpenLM Platform (or register a new account).
- OpenLM Alerts is configured with at least one alert rule. See [OpenLM Alerts](/cloud/automations/alerts).

### Activate Zendesk Alerts Integration

1. From the OpenLM Platform Homepage, select **Activate Product**, or open the navigation menu and select **Products**.
2. On the Products page, locate the **Zendesk Alerts Integration** card.
3. Select **Activate**.

### Enter your Zendesk connection details

1. Open **Zendesk Alerts Integration** from the navigation menu (or select **Go to Product Page** on the product card).
2. Enter your Zendesk connection details. Zendesk's API uses your account subdomain together with an API credential:

| Field | What to enter | Where to find it in Zendesk |
|---|---|---|
| Subdomain | The subdomain from your Zendesk URL. For example, if your URL is `acme.zendesk.com`, enter `acme`. | The portion of your Zendesk URL before `.zendesk.com`. |
| Email / agent | The Zendesk agent used to authenticate and listed as the ticket requester. | The Zendesk agent account you want associated with OpenLM-generated tickets. |
| API token | A Zendesk API token used to authenticate requests. | In Zendesk, open **Admin Center → Apps and integrations → APIs → Zendesk API**, then enable and add a token. |

3. Save your changes.

:::note
Zendesk Alerts Integration is a newer integration. The exact field labels on the product's credentials page can vary by version — enter the values shown in the app, which map to your Zendesk subdomain and API credentials.
:::

## Verify the integration

1. In OpenLM Alerts, trigger an alert that matches one of your rules. Use a non-disruptive condition for testing.
2. Wait for the event to flow through the integration. Most tickets appear within about a minute.
3. In Zendesk, open the ticket views and confirm the new ticket exists, with the requester you configured.

## Manage tickets

Once tickets reach Zendesk, use your standard Zendesk workflow to triage, assign, reply, and close them. Closing a ticket in Zendesk has no effect on the source alert in OpenLM Alerts.

## Troubleshoot

- Confirm the subdomain, agent email, and API token match your Zendesk values exactly, and that the token is still valid.
- Open [OpenLM Alerts](/cloud/automations/alerts) and confirm the alert rule actually fired. If it did not fire, no ticket is sent.
- Confirm the **Zendesk Alerts Integration** product is **Active** on the [Products](/cloud/openlm-administration/products) page.
- If you regenerated the Zendesk API token, return to the product's credentials page in OpenLM and save the new token.

## Related

- [OpenLM Alerts](/cloud/automations/alerts)
- [Notifications](/cloud/automations/notifications)
- [Products](/cloud/openlm-administration/products)
