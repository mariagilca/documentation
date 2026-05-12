---
sidebar_position: 4
title: Zoho Alerts
description: Connect a Zoho service to OpenLM to monitor licensed seats and forward alerts.
---

Use the Zoho Alerts integration to connect a Zoho service to OpenLM Cloud Broker. Once connected, Cloud Broker pulls usage signals from Zoho so OpenLM can monitor licensed seats, raise alerts on critical events, and feed downstream services such as Subscription Optimizer.

After you complete this guide, OpenLM authenticates to Zoho through a Zoho self-client OAuth application, the connection succeeds in Cloud Broker, and Zoho data is available to OpenLM Alerts and reporting.

:::info
This integration is currently scoped to the Zoho services your Cloud Broker version supports. The Cloud Broker UI lists the supported Zoho service explicitly. If a Zoho service you need is not listed, open a support request before you start the configuration.
:::

## How the integration works

OpenLM uses a **Zoho self-client OAuth application** to authenticate to your Zoho account. You register the client in the Zoho API Console, generate a Client ID and Client Secret, then provide them in OpenLM Cloud Broker. Cloud Broker uses the credentials to fetch data and surface it to OpenLM Alerts and downstream services.

### Components you need

You need these components to connect Zoho to OpenLM:

- An OpenLM Cloud account with **Cloud Broker** active and **Zoho Alerts Integration** activated.
- A Zoho account with administrator access for the service you want to monitor.
- The ability to register an OAuth client in the [Zoho API Console](https://api-console.zoho.com/).

## Configure the integration

Complete the tasks in this section in order. The Zoho side comes first because OpenLM needs the OAuth credentials.

### Confirm prerequisites

Before you start, make sure the following requirements are met:

- You can sign in to Zoho as an administrator for the service you want to monitor.
- You can sign in to OpenLM Cloud as an administrator.
- **Cloud Broker** is active in OpenLM. See [Cloud Broker](../data-collection/cloud-broker).
- You know which Zoho data center your account belongs to (for example, `.com`, `.eu`, `.in`). The data center affects the OAuth and API host names.

### Register a Zoho self-client

1. Open the [Zoho API Console](https://api-console.zoho.com/) and sign in.
2. Select **Add Client** and choose **Self Client**.
3. Confirm registration. Zoho generates a **Client ID** and **Client Secret** for the self-client.
4. Generate the scopes you need for the Zoho service you are connecting. Confirm the required scopes with OpenLM Support; the scope list depends on the Zoho service.
5. Copy the **Client ID**, **Client Secret**, and the **Generated Code** from the API Console. You will use these values in OpenLM.

:::tip
Self-client OAuth tokens have a short expiration window. Plan to copy the values into OpenLM Cloud Broker right after generation.
:::

### Activate Zoho Alerts Integration in OpenLM

1. Sign in to OpenLM Cloud.
2. Open **Products** from the navigation menu.
3. Locate the **Zoho Alerts Integration** card and select **Activate**.

### Connect Zoho in Cloud Broker

1. From the navigation menu, open **Cloud Broker**.
2. Select your Zoho service from the list of supported services and select **Active** if it is not already.
3. Enter the credentials you gathered earlier:

| Field | What to enter |
|---|---|
| Client ID | The Client ID generated for your Zoho self-client. |
| Client Secret | The Client Secret for your Zoho self-client. |
| Authorization Code | The Generated Code from the Zoho API Console. |
| Data Center | The Zoho data center for your account (for example, `com`, `eu`, `in`). |

4. Save the configuration.

### Run an initial fetch

1. In Cloud Broker, open **Commands** and run the Zoho sync command.
2. Watch for the success state.

If the command fails, see [Troubleshoot](#troubleshoot).

## Verify the integration

After the initial fetch succeeds, verify that data flows into OpenLM.

1. In Cloud Broker, confirm that the last successful fetch timestamp updates.
2. In OpenLM Alerts, define an alert rule that targets Zoho data and confirm that the rule triggers when its conditions are met.
3. In your reporting tool of choice, confirm that Zoho-sourced rows appear.

## Troubleshoot

| Symptom | Likely cause | Fix |
|---|---|---|
| Cloud Broker reports an authentication failure with an `invalid_code` error. | The Generated Code expired before Cloud Broker could exchange it. | Return to the Zoho API Console, regenerate the code, and save the new code in Cloud Broker right away. |
| Cloud Broker reports an authentication failure with an `invalid_client` error. | The Client ID or Client Secret is incorrect. | Verify the values character-by-character against the Zoho API Console. |
| Cloud Broker connects but returns no data. | The self-client does not have the required scopes for your Zoho service. | Confirm the required scopes with OpenLM Support, regenerate the self-client with those scopes, and reconnect. |
| Cloud Broker reaches the wrong Zoho host. | The Data Center value does not match the account. | Verify your Zoho data center and update the Data Center field. |

## Known limitations

- The Zoho self-client flow requires the Generated Code to be exchanged before it expires. Cloud Broker performs the exchange on save.
- The list of supported Zoho services depends on your Cloud Broker version. Confirm scope coverage with OpenLM Support before you commit to a Zoho service in production.

## Related

- [Cloud Broker](../data-collection/cloud-broker)
- [OpenLM Alerts](../automations/alerts)
- [Subscription Optimizer](../automations/subscription-optimizer)
- [Products](../openlm-administration/products)
