---
title: Integration between Microsoft Entra ID (formerly Azure AD) and OpenLM
description: This document describes the steps required to configure Microsoft Entra ID with the Identity Service and set Microsoft Entra ID as the external identity.
sidebar_position: 5
---

This document describes the steps required to configure Microsoft Entra ID with the Identity Service and set Microsoft Entra ID as the external identity provider for OpenLM.

## Prerequisites

- Access to the [Azure Portal](https://portal.azure.com) with permissions to register applications
- For on-premise users: OpenLM SLM and Identity Service must be [SSL secured](../../openlm-slm/setting-up-ssl-for-openlm-server-and-identity-service)

## Microsoft Entra ID configuration

1. Log in to the [Azure Portal](https://portal.azure.com). Navigate to your Microsoft Entra ID directory.  
   ![Azure Portal showing the Microsoft Entra ID navigation menu](/img/legacy/word-image-41985-1-2.png)
2. Navigate to the **App Registrations** section.  
   ![App Registrations section in Microsoft Entra ID](/img/legacy/word-image-41985-2-2.png)
3. Create a new registration. Select the **New Registration** button.  
   ![New Registration button on the App Registrations page](/img/legacy/word-image-41985-3-2.png)
4. Provide the application **display name** (for example **Identity Service**). In the Redirect URI field, from the drop-down list select Web. Leave the URI field empty, as we will come back to this step and update it later during configuration. Select the **Register** button.  
   ![App registration form with display name and Redirect URI fields](/img/legacy/word-image-41985-4-2.png)
5. The application is now registered. Note the **Application (client) ID** and **Directory (tenant) ID** shown on the overview page — you will need these values in the steps below.  
   ![Registered application overview showing Client ID and Tenant ID](/img/legacy/word-image-41985-5-2.png)
6. Navigate to the **Certificates & Secrets** section to create a new client secret. Select **New client secret**.  
   **Pro tip:** open this section in a new tab.  
   ![Certificates and Secrets section with New client secret button](/img/legacy/word-image-41985-6-2.png)
7. Provide a **description** for the client and select its **lifespan**. Select **ADD**.  
   ![Add a client secret dialog with description and expiry fields](/img/legacy/word-image-41985-7-1.png)
8. The client secret is now created. Note the **Value** and **Secret ID**.

   :::warning
   Client secret values cannot be viewed except immediately after creation. Be sure to save the secret value before leaving the page.
   :::

   ![Newly created client secret showing Value and Secret ID](/img/legacy/word-image-41985-8-1.png)

   After navigating away, the value will be hidden and impossible to retrieve:  
   ![Client secret with hidden value after navigating away](/img/legacy/word-image-41985-9-1.png)

## OpenLM on-premise users — adding Microsoft Entra ID as an external identity provider

1. Navigate to your Identity Service account → Select the **External Providers** icon to add the external provider.
2. Select the provider type **Azure** from the drop-down options.
3. Enter the **Client ID** — this is the **Application (client) ID** from [step 5](#microsoft-entra-id-configuration) above.
4. Enter the **Client Secret** — this is the **Value** from [step 8](#microsoft-entra-id-configuration) above.
5. In the **Account ID** field, type **none**.

   :::warning
   Do not leave the Account ID field blank — you must explicitly enter `none`. Leaving it blank will cause the configuration to fail.
   :::
6. Enter the authority URL in the **Authority** field using the format:  
   `https://login.microsoftonline.com/{Directory (tenant) ID}`  
   Replace `{Directory (tenant) ID}` with the tenant ID from [step 5](#microsoft-entra-id-configuration) above.
7. Enter the display name for the provider in the Display Name field, for example **Login with Azure**.
8. Select **Save**.  
   ![Identity Service External Providers form with Azure configuration fields](/img/legacy/word-image-41985-10-1.png)
9. After selecting Save, the external provider (Azure) is displayed in the External Providers list. Note the **Redirect URLs** shown on screen — you will need these in the next step.  
   ![External Providers list showing the newly added Azure provider with Redirect URLs](/img/legacy/word-image-41985-11-1.png)
10. Keep this window open — you will need the Redirect URLs displayed here.
11. Return to your Microsoft Entra ID account. Navigate to the **Authentication** section. Select **Add Platform**. Select **Web**, then provide the following:
    - **Front-channel Logout URL**
    - **Web Redirect URL**

    Check **ID Tokens** and select who can use this application. Select **Configure**, then **Save**.

    :::note
    The Redirect URLs must be copied from the OpenLM Identity Service UI (as shown in step 9 above).
    :::

    ![Azure Authentication section showing platform configuration with Redirect URLs](/img/legacy/word-image-41985-12-1.png)
12. Navigate to your Identity Service account and log out. The Azure Login button now appears as a login option:  
    ![Identity Service login page showing the Azure Login button](/img/legacy/word-image-41985-13-1.png)

## OpenLM Platform users — configure Microsoft Entra ID as an external identity provider

1. Navigate to your OpenLM Portal → **External Providers** tab. Select **Add Provider**.  
   ![Cloud Portal External Providers tab with Add Provider button](/img/legacy/word-image-41985-14-1.png)
2. Enter the **Client ID** — this is the **Application (client) ID** from [step 5](#microsoft-entra-id-configuration) above.
3. Enter the **Client Secret** — this is the **Value** from [step 8](#microsoft-entra-id-configuration) above.
4. In the **Authority** field, enter:  
   `https://login.microsoftonline.com/{Directory (tenant) ID}`  
   Replace `{Directory (tenant) ID}` with the tenant ID from [step 5](#microsoft-entra-id-configuration) above.
5. Enter the display name, for example **Login with Azure**.
6. Select **Save**.  
   ![Cloud Portal External Providers form with Azure configuration fields](/img/legacy/word-image-41985-15.png)
7. After selecting Save, the external provider (Azure) is displayed in the External Providers list. Note the **Redirect URLs** shown on screen — you will need these in the next step.  
   ![External Providers list in Cloud Portal showing the newly added Azure provider with Redirect URLs](/img/legacy/word-image-41985-16.png)
8. Keep this window open — you will need the Redirect URLs displayed here.
9. Return to your Microsoft Entra ID account. Navigate to the **Authentication** section. Select **Add Platform**. Select **Web**, then provide the following:
   - **Front-channel Logout URL**
   - **Web Redirect URL**

   Check **ID Tokens** and select who can use this application. Select **Configure**, then **Save**.

   :::note
   The Redirect URLs must be copied from the OpenLM Portal (as shown in step 7 above).
   :::

   ![Azure Authentication section showing platform configuration with Redirect URLs for Cloud](/img/legacy/word-image-41985-17.png)
10. Go to your Cloud Portal. Select your username (upper right corner) to see your profile information.  
    ![Cloud Portal user profile showing the account ID](/img/legacy/word-image-41985-18.png)
11. Note and copy your **OpenLM account ID**.
12. To access the OpenLM Platform account using Microsoft Entra ID, use one of the following URLs:

    ```text
    https://cloud.openlm.com/portal?loginAccountId=<YOUR_ACCOUNT_ID>
    ```

    or

    ```text
    https://eu-cloud.openlm.com/portal?loginAccountId=<YOUR_ACCOUNT_ID>
    ```

    Replace `<YOUR_ACCOUNT_ID>` with the account ID copied in step 11.

:::tip
Clear your browser cache before accessing the Cloud Portal with the new configuration.
:::
