---
title: "Integration between Azure Active Directory and OpenLM"
sidebar_position: 5
---
This document describes the steps required to configure Azure Active Directory (AAD) with the Identity Service and set the Azure Active Directory as the external Identity provider for OpenLM. The following steps are to be performed to achieve this configuration:

## Azure Active Directory configuration

1. Log in to the Azure Portal, link: https://portal.azure.com. Navigate your Azure Active Directory (AAD).  
   ![Screenshot: Azure Active Directory configuration](/img/legacy/word-image-41985-1-2.png)
2. Navigate to the **App Registrations** section.  
   ![Screenshot 2: Azure Active Directory configuration](/img/legacy/word-image-41985-2-2.png)
3. Create a new registration. Click the **New Registration** button.  
   ![Screenshot 3: Azure Active Directory configuration](/img/legacy/word-image-41985-3-2.png)
4. Provide the application **display name** (for example I**dentity Service**). In the Redirect URI field, from the drop-down list select Web. Leave the URI field empty, as we will come back to this step and update it later during configuration. Click the **Register** button.  
   ![Screenshot 4: Azure Active Directory configuration](/img/legacy/word-image-41985-4-2.png)
5. The Application is now registered. Have handy the information depicted below - **Application (client) ID** and **Directory (tenant) ID** (it appears after clicking the Register button).  
   ![Screenshot 5: Azure Active Directory configuration](/img/legacy/word-image-41985-5-2.png)
6. Navigate to the **Certificates & Secrets** section to create a new client secret. Click **New client secret**.  
    **Pro tip:** open this section in a new tab.  
   **![Screenshot 6: Azure Active Directory configuration](/img/legacy/word-image-41985-6-2.png)**
7. Provide a **description** for the client and choose its **lifespan**. Click **ADD**.  
   **![Screenshot 7: Azure Active Directory configuration](/img/legacy/word-image-41985-7-1.png)**
8. The Client Secret is now created. Note the **Value** and **Secret ID.  
   Important**! Client secret values cannot be viewed, except immediately after creation. Be sure to save the secret ID when created before leaving the page.  
   **![Screenshot 8: Azure Active Directory configuration](/img/legacy/word-image-41985-8-1.png)**
9. **Note**: The value will be displayed hidden as shown in the following image and impossible to retrieve after closing the page:  
   ![Screenshot 9: Azure Active Directory configuration](/img/legacy/word-image-41985-9-1.png)

### **OpenLM on-premise users** - Adding Azure Active Directory in OpenLM Identity Service as an external Identity provider

To add the external provider (Azure) in the OpenLM Identity Service, make sure the OpenLM SLM and Identity Service are [SSL secured](../../openlm-slm/setting-up-ssl-for-openlm-server-and-identity-service.md)

1. Navigate to your Identity Service account → Click on the **External Providers** icon to add the external provider.
2. Select the provider type **Azure** from the drop-down options.
3. Enter the **Client ID** in the Client ID field. Client ID is "**Application (client) ID**" (from AAD settings, as in step 5 of the section "IAzure Active Directory Configuration" above).
4. Enter the **Client Secret** in the Client Secret field. Client Secret is "**Value**" (from AAD settings, as in step 8 of the section "Azure Active Directory Configuration" above).
5. Enter the Account ID - n**one** in the **Account ID** field.
6. Enter the authority URL in the **Authority** field. The Authority field will be filled by the Azure Authority URL. Take the **Directory (tenant) ID** as mentioned in step 5 of the section "Identity Service Configuration Process with Azure Active Directory (AAD)" above and add it to the link: **https://login.microsoftonline.com/{Directory (tenant) ID}.**
7. Enter the display name for the provider in the Display Name field. For example **Login with Azure**.
8. Click **Save**.  
   **![Screenshot: OpenLM on-premise users - Adding Azure Active Directory in OpenLM Identity Service as an external Identity provider](/img/legacy/word-image-41985-10-1.png)**
9. After clicking Save, the following screen will appear. The added External Provider (Azure) is displayed in the External Providers list with the following details as shown on the screen below. Note the fields marked in red:  
   ![Screenshot 2: OpenLM on-premise users - Adding Azure Active Directory in OpenLM Identity Service as an external Identity provider](/img/legacy/word-image-41985-11-1.png)
10. Leave this window open for a while.
11. Return to your Azure Active Directory account. Navigate to the **Authentication** section. Click **Add Platform**. Choose "**Web**" then provide the information for the Redirect URLs: F**ront-channel Logout URL** and **Web Redirect UR**L. Check the **ID Tokens** and choose who can use this application. Click Configure then Save.**Note:** The Redirect URLs are required to be taken from OpenLM Identity Service UI (as shown in the image, in step 9 above) when adding a new external provider.  
    ![Screenshot 3: OpenLM on-premise users - Adding Azure Active Directory in OpenLM Identity Service as an external Identity provider](/img/legacy/word-image-41985-12-1.png)
12. Navigate to your Identity Service account. Log out. The Azure Login button has appeared as a login option:  
    ![Screenshot 4: OpenLM on-premise users - Adding Azure Active Directory in OpenLM Identity Service as an external Identity provider](/img/legacy/word-image-41985-13-1.png)

### **OpenLM Cloud users** - Configure Azure Active Directory as an external identity provider in Cloud Portal

1. Navigate to your OpenLM Cloud Portal→**External Providers** tab. Click **Add Provider**.  
   ![Screenshot: OpenLM Cloud users - Configure Azure Active Directory as an external identity provider in Cloud Portal](/img/legacy/word-image-41985-14-1.png)
2. Enter the **Client ID** in the Client ID field. Client ID is "**Application (client) ID**" (from AAD settings, as in step 5 of the section "IAzure Active Directory Configuration" above).
3. Enter the Client Secret in the **Client Secre**t field. Client Secret is "**Value**" (from AAD settings, as in step 8 of the section "Azure Active Directory Configuration" above).
4. In the **Authority** field, input **https://login.microsoftonline.com/{Directory (tenant) ID}** (the tenant ID is Directory (tenant) ID from AAD settings, as in step 5 of the section "Azure Active Directory Configuration" above).
5. Input the display name, e.g "**Login with Azure**".
6. Click **SAVE.  
   ![Screenshot 2: OpenLM Cloud users - Configure Azure Active Directory as an external identity provider in Cloud Portal](/img/legacy/word-image-41985-15.png)**
7. After clicking Save, the following screen will appear. The added External Provider (Azure) is displayed in the External Providers list with the following details as shown on the screen below. Note the fields marked in red:  
   ![Screenshot 3: OpenLM Cloud users - Configure Azure Active Directory as an external identity provider in Cloud Portal](/img/legacy/word-image-41985-16.png)
8. Leave this window open for a while.
9. Return to your Azure Active Directory account. Navigate to the **Authentication** section. Click **Add Platform**. Choose "**Web**" then provide the information for the Redirect URLs: Front-channel Logout URL and Web Redirect URL. Check the **ID Tokens** and choose who can use this application. Click **Configure** then Save.**Note:** The Redirect URLs are required to be taken from OpenLM Cloud Portal (as shown in the image, in step 7 above) when adding a new external provider.  
   ![Screenshot 4: OpenLM Cloud users - Configure Azure Active Directory as an external identity provider in Cloud Portal](/img/legacy/word-image-41985-17.png)
10. Go to your Cloud Portal. Click on your username (upper right corner) to see your profile information.  
    ![Screenshot 5: OpenLM Cloud users - Configure Azure Active Directory as an external identity provider in Cloud Portal](/img/legacy/word-image-41985-18.png)
11. Note and copy your **OpenLM account ID**.
12. To access the OpenLM Cloud account using Azure Active Directory you need to create the following address, either  
    [https://cloud.openlm.com/portal?loginAccountId=](https://cloud.openlm.com/portal?loginAccountId=olmid)your OpenLM account ID  
    or  
    [https://eu-cloud.openlm.com/portal?loginAccountId=](https://eu-cloud.openlm.com/portal?loginAccountId=olmid)your OpenLM account ID

**Pro-tip**: clear your cache before accessing the Cloud Portal with the new configuration.
