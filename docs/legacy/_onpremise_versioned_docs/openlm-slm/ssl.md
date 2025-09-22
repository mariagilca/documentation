---
title: Setting up SSL for OpenLM SLM and Identity Service
sidebar_position: 2
description: Learn how to configure HTTPS/SSL for OpenLM SLM and Identity Service v2x using a CA-signed certificate.
---

# Setting up SSL for OpenLM SLM and Identity Service

This guide explains how to enable SSL (HTTPS) for OpenLM SLM and Identity Service v2x using a certificate with a digital signature from a Certificate Authority (CA).

:::caution
The certificates used for OpenLM SLM must also be present in the **Trusted Certificate Store** of any machine that connects to the server.
:::

:::note
Once SSL is enabled, all component configurations must update the hostname or IP to use the **HTTPS** protocol. Ensure the **exact FQDN** is used when specifying the host.
:::

A self-signed certificate is used here for demonstration. We strongly recommend using a certificate signed by a **Certificate Authority (CA)**.

---

## Setting up SSL for Identity Service

1. Go to:

C:\Program Files\OpenLM\OpenLM IdentityService\SecurityService\cert

2. Place your **CA-signed certificate** here.

:::caution
**Do not delete existing certificates** in the `cert` folder.
:::

3. Open the `appsettings.json` file located at:

C:\Program Files\OpenLM\OpenLM Identity Service\SecurityService

Use a text editor with **administrator privileges**.

4. Locate the `Settings` node and update the `IssuerUri` to use `https`:

![SSL for Identity Service](/img/legacy/ssl.png)

Locate and edit the Kestrel node to configure certificate details and HTTPS endpoint:

![SSL for Identity Service](/img/legacy/ssl1.png)

Use double backslashes in Windows file paths.

Ensure all curly braces {} are properly closed.

Save your changes.

Restart the Identity Service.

![SSL for Identity Service](/img/legacy/ssl2.png)

To verify whether the SSL connection is successful, open up the Identity Service UI, type in the address bar the new address (HTTPS), and refresh the page. Click on the “Lock” icon as portrayed below:

![SSL for Identity Service](/img/legacy/ssl3.png)

Setting up SSL for OpenLM SLM
Navigate to:
C:\Program Files\OpenLM\OpenLM Server\bin
Create a new folder called Cert, and paste your CA-signed certificate inside it.

Open the appsettings.json file at:
C:\Program Files\OpenLM\OpenLM SLM\bin
Edit the Kestrel node to define the EasyAdmin HTTPS endpoint:

![SSL for Identity Service](/img/legacy/ssl4.png)

Add or update the Certificates node:

![SSL for Identity Service](/img/legacy/ssl5.png)

Update the Auth node with the Identity Service URL using HTTPS:

![SSL for Identity Service](/img/legacy/ssl6.png)
Save the file.

Update server address in Identity Service
Login to the Identity Service.

Navigate to Settings → Security Configuration.

Update the SLM server address to use HTTPS:

![SSL for Identity Service](/img/legacy/ssl7.png)

Restart OpenLM SLM service
After making the changes, restart the OpenLM SLM Server Service.

![SSL for Identity Service](/img/legacy/ssl8.png)

To verify the connection, type in the address bar the updated EasyAdmin address: https://FQDN:port
