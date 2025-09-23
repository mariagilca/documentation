---
title: "Integration Between AD FS and OpenLM"
sidebar_label: "Integration Between AD FS and OpenLM"
---

<!-- Source: https://www.openlm.com/knowledge-base/how-to-use-ad-fs-as-an-external-identity-provider-for-identity-service/ -->

# Integration Between AD FS and OpenLM

## Requirements:

* ADFS service configured
* OpenLM Identity Service installed and running with HTTPS (SSL)

This document describes the steps required to configure AD FS as an external Identity provider for the OpenLM Identity Service.

## Creating an application group

1. In AD FS Management, right-click on **Application Groups** and select **Add Application Group**.
2. On the **Application Group Wizard**, type a name, and under Standalone applications select the **Server application** template. **Click Next.**
3. Copy the **Client Identifier** value. It will be used later in the Identity Service configuration
4. Enter the Identity Service URL for Redirect URI ([https://server.domain](https://server.domain/)). Click **Add.** Click **Next.**
5. On the Configure Application Credentials screen, place the check **Generate a shared secret** and copy the secret. Click **Next**.
6. On the Summary screen, click **Next**.
7. On the Complete screen, click **Close**.
8. Right-click on the newly added Application Group and select **Properties**.
9. On the Properties window click **Add application**.
10. On the Add a new application to… select **Web API** and click **Next**.
11. On the Configure Web API screen, enter the same URL for Identifier ([https://server.domain](https://server.domain/)). Click **Add**. Click **Next**.
12. In the Apply Access Control Policy screen, select **Permit everyone** and click **Next.**
13. On the Configure Application Permissions screen, make sure ***openid*** and ***profile*** are checked and **click Next.**
14. On the Summary screen, click **Next**.
15. On the Complete screen, click **Close**.
16. On the Properties window click **OK.**

## Adding An External Provider (AD FS) in OpenLM Identity Service

To add the external provider (AD FS) to the OpenLM Identity Service, perform the following steps:

1. Click on the **External Providers** ![](/img/legacy/kb/word-image-14.png) icon then navigate to **Add Provider.**
2. Select the provider type **ADFS** from the drop-down options.
3. Fill in the ID Client in the **Client ID** field. Client ID is "Application (client) ID"  from AD FS settings, as in step 3 of the section above.
4. Fill in the Client Secret in the Client Secret field. Client Secret is "Value" (from AD FS settings, as in step 5 of the section above.
5. Fill in the value **none** in the **Account ID** field.
6. Enter the authority URL ( AD FS Server address) in the Authority field. Example: https://fqdn.domain.com/adfs.)
7. Enter the button display name, for example, **AD FS.**
8. Click **Save.**
9. The newly added provider will appear on the next screen. Copy the Sign in and Sign out redirect URL.
10. Go back to the AD FS Server. Click on **Tools**→**AD FS Management**→**Application Groups.**
11. Double-click on the application.
12. Select the application and click **Edit.**
13. In the redirect URI field paste the copied in step 9 Sign in and Sign out URL, then click **Add,**  then **OK**→**Apply**.

Now, when trying to sign in, there will be the AD FS button:

[![](/img/legacy/kb/identity.png)](/img/legacy/kb/identity.png)
