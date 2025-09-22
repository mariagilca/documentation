---
title: Integration Between Azure Active Directory and OpenLM
sidebar_position: 5
description: Learn how to integrate Azure Active Directory (Azure AD) with OpenLM Identity Service for streamlined authentication and access management.
---


I'm unable to access the image URLs you've provided, but I can format the document for you.

This document describes the steps required to configure Azure Active Directory (AAD) with the Identity Service and set it as the external Identity provider for OpenLM.

Azure Active Directory configuration
Log in to the Azure Portal.

Navigate to the App Registrations section.

Click the New Registration button.

Provide an application display name (e.g., Identity Service). In the Redirect URI field, select Web from the dropdown and leave the URI field empty for now. Click Register.

After the application is registered, note the Application (client) ID and Directory (tenant) ID.

Navigate to the Certificates & Secrets section and click New client secret.

Provide a description for the client and choose its lifespan. Click Add.

The Client Secret is now created. Important: Note the Value and Secret ID. The value is only visible immediately after creation, so be sure to save it.

OpenLM on-premise users: Adding Azure Active Directory
Before starting, ensure that OpenLM SLM and Identity Service are SSL secured.

Navigate to your Identity Service account and click the External Providers icon to add the provider.

Select Azure from the provider type dropdown.

Enter the Application (client) ID from step 5 of the Azure configuration in the Client ID field.

Enter the Client Secret Value from step 8 in the Client Secret field.

Enter none in the Account ID field.

Enter the authority URL in the Authority field. This URL is https://login.microsoftonline.com/{Directory (tenant) ID} (using the Directory ID you noted in step 5).

Enter a display name (e.g., Login with Azure).

Click Save.

Note the Sign in and Sign out redirect URL values from the newly created provider.

Return to your Azure Active Directory account. Go to the Authentication section.

Click Add Platform, choose Web, and provide the Redirect URLs (the URLs you just copied from OpenLM). Check the ID Tokens box and choose who can use this application. Click Configure and then Save.

Log out of your Identity Service account. The "Login with Azure" button should now appear as a login option.

OpenLM Cloud users: Configure Azure Active Directory in Cloud Portal
Navigate to your OpenLM Cloud Portal and select the External Providers tab. Click Add Provider.

Enter the Application (client) ID from step 5 of the Azure configuration in the Client ID field.

Enter the Client Secret Value from step 8 in the Client Secret field.

In the Authority field, input https://login.microsoftonline.com/{Directory (tenant) ID} (using the Directory ID you noted in step 5).

Input a display name (e.g., Login with Azure).

Click Save.

Note the Sign in and Sign out redirect URL values from the newly created provider.

Return to your Azure Active Directory account. Navigate to the Authentication section.

Click Add Platform, choose Web, and provide the Redirect URLs (the URLs you just copied from the Cloud Portal). Check the ID Tokens box and click Configure, then Save.

To access your OpenLM Cloud account using Azure Active Directory, use one of the following URLs, replacing your OpenLM account ID with the ID from your profile:

https://cloud.openlm.com/portal?loginAccountId=your OpenLM account ID

https://eu-cloud.openlm.com/portal?loginAccountId=your OpenLM account ID

:::tip
Clear your browser's cache before accessing the Cloud Portal with the new configuration.
:::
 

 
