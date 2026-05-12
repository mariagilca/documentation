---
sidebar_position: 3
title: Salesforce Alerts
description: Connect Salesforce to OpenLM through Cloud Broker to monitor licensed seats and surface alerts.
---

Use the Salesforce Alerts integration to connect a Salesforce org to OpenLM Cloud Broker. Once connected, Cloud Broker pulls usage signals from Salesforce so OpenLM can monitor licensed seats, raise alerts on critical events, and feed downstream services such as Subscription Optimizer.

After you complete this guide, OpenLM authenticates to your Salesforce org through a Connected App, the connection succeeds in Cloud Broker, and Salesforce data is available to OpenLM Alerts and reporting.

## How the integration works

OpenLM uses a **Salesforce Connected App** with OAuth and the username-password flow to authenticate. You register the connected app in Salesforce, copy the Consumer Key and Consumer Secret, and provide them — together with the Salesforce username and password — in OpenLM Cloud Broker. Cloud Broker uses those credentials to fetch data and surface it to OpenLM Alerts and downstream services.

### Components you need

You need these components to connect Salesforce to OpenLM:

- An OpenLM Cloud account with **Cloud Broker** active and **Salesforce Alerts Integration** activated.
- A Salesforce org where you can create and manage Connected Apps. A sandbox is recommended for first-time setup.
- Salesforce administrator access to enable the OpenID Connect settings, create the Connected App, and adjust its access policies.

:::info
The integration currently expects the Salesforce login host `https://login.salesforce.com`. Sandboxes that use `https://test.salesforce.com` may not work without additional configuration. Confirm the target host with OpenLM Support before you connect a sandbox.
:::

## Configure the integration

Complete the tasks in this section in order. The Salesforce side comes first because OpenLM needs the Connected App credentials.

### Confirm prerequisites

Before you start, make sure the following requirements are met:

- You can sign in to Salesforce as an administrator.
- You can sign in to OpenLM Cloud as an administrator.
- **Cloud Broker** is active in OpenLM. See [Cloud Broker](../data-collection/cloud-broker).

### Enable the OpenID Connect settings in Salesforce

1. In Salesforce, open **Setup** and go to **Identity → OAuth and OpenID Connect Settings**.
2. Turn on **Allow OAuth Username-Password Flows**.
3. Turn on **Allow OAuth User-Agent Flows**.
4. Save your changes.

### Create a Connected App

1. In Salesforce Setup, open **Apps → App Manager** and select **New Connected App**.
2. Complete the basic information:
   - **Connected App Name** — a descriptive name, for example `OpenLM Cloud Broker`.
   - **API Name** — Salesforce fills this from the Connected App Name; keep or adjust as needed.
   - **Contact Email** — an administrator email address.
3. In the **API (Enable OAuth Settings)** section:
   - Select **Enable OAuth Settings**.
   - Set **Callback URL** to `http://localhost`. Salesforce accepts the `http` scheme for this flow.
   - Add OAuth scopes. Select all available scopes except **Issue JSON Web Token (JWT) based access tokens**.
4. Save the Connected App.

After Salesforce provisions the Connected App, the **Consumer Key** and **Consumer Secret** are available on the Manage Connected Apps page. You copy these values into OpenLM in a later step.

### Adjust access policies

Salesforce blocks OAuth flows by default until you adjust access policies on the Connected App.

1. Open **Setup → Apps → Manage Connected Apps**.
2. Select your Connected App.
3. Set **Permitted Users** to **All users may self-authorize**.
4. Set **IP Relaxation** to **Relax IP restrictions**.
5. Save.

:::warning
**All users may self-authorize** is the simplest setting for proof of concept. For production, scope the Connected App to a specific permission set or profile and review the IP relaxation setting with your security team.
:::

### Activate Salesforce Alerts Integration in OpenLM

1. Sign in to OpenLM Cloud.
2. Open **Products** from the navigation menu.
3. Locate the **Salesforce Alerts Integration** card and select **Activate**.

### Connect Salesforce in Cloud Broker

1. From the navigation menu, open **Cloud Broker**.
2. Select **Salesforce** from the list of supported services and select **Active** if it is not already.
3. Enter the credentials you gathered earlier:

| Field | What to enter |
|---|---|
| Consumer Key | The Consumer Key from your Salesforce Connected App. |
| Consumer Secret | The Consumer Secret from your Salesforce Connected App. |
| Username | The Salesforce username Cloud Broker authenticates as. |
| Password | The password for that Salesforce user. |

4. Save the configuration.

### Run an initial fetch

1. In Cloud Broker, open **Commands** and run the Salesforce sync command.
2. Watch for the success state.

If the command fails, see [Troubleshoot](#troubleshoot).

## Verify the integration

After the initial fetch succeeds, verify that data flows into OpenLM.

1. In Cloud Broker, confirm that the last successful fetch timestamp updates.
2. In OpenLM Alerts, define an alert rule that targets Salesforce data and confirm that the rule triggers when its conditions are met.
3. In your reporting tool of choice, confirm that Salesforce-sourced rows appear.

## Troubleshoot

| Symptom | Likely cause | Fix |
|---|---|---|
| Cloud Broker reports an authentication failure. | The Consumer Key, Consumer Secret, username, or password is incorrect, or the Connected App is not yet active. | Verify all four fields character-by-character. Confirm the Connected App is saved and access policies are set. |
| Cloud Broker connects but returns no data. | The Salesforce user has no access to the relevant objects. | Assign the appropriate Salesforce profile or permission set to the user. |
| The Connected App rejects the request with an IP block. | IP Relaxation is set to **Enforce IP restrictions**. | Set IP Relaxation to **Relax IP restrictions** on the Connected App. |
| The Connected App rejects the request with a self-authorization error. | **Permitted Users** is set to **Admin approved users are pre-authorized** and the user is not pre-authorized. | Set **Permitted Users** to **All users may self-authorize**, or pre-authorize the relevant profile. |
| The Salesforce user is in a sandbox and the connection fails. | The integration assumes `login.salesforce.com`. | Contact OpenLM Support to confirm the target host before connecting a sandbox. |

## Known limitations

- The integration assumes the production Salesforce login host. Sandbox support requires confirmation from OpenLM Support.
- The Cloud Broker UI lists fields as **Client ID** and **Client Secret** in some places; these correspond to **Consumer Key** and **Consumer Secret** in Salesforce. Treat the names as synonyms.
- The Cloud Broker password field is not masked while you type. Avoid sharing the screen during configuration.

## Related

- [Cloud Broker](../data-collection/cloud-broker)
- [OpenLM Alerts](../automations/alerts)
- [Subscription Optimizer](../automations/subscription-optimizer)
- [Products](../openlm-administration/products)
