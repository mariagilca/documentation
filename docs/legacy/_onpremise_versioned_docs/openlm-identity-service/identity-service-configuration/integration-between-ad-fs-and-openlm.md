---
title: Integration Between AD FS and OpenLM
sidebar_position: 4
description: Step-by-step guide to integrate Active Directory Federation Services (AD FS) with OpenLM Identity Service for secure authentication.
---


## Requirements
To configure AD FS as an external identity provider for OpenLM Identity Service, you must have the following prerequisites in place:

AD FS service configured.

OpenLM Identity Service installed and running with HTTPS (SSL).

Creating an application group in AD FS
In AD FS Management, right-click Application Groups and select Add Application Group.

On the Application Group Wizard, enter a name. Under Standalone applications, select the Server application template. Click Next.

Copy the Client Identifier value. You will use this later in the OpenLM Identity Service configuration.

Enter the OpenLM Identity Service URL for Redirect URI (e.g., https://server.domain/). Click Add, then Next.

On the Configure Application Credentials screen, check Generate a shared secret and copy the secret. Click Next.

On the Summary screen, click Next.

On the Complete screen, click Close.

Right-click the new Application Group and select Properties.

On the Properties window, click Add application.

On the Add a new application to... screen, select Web API and click Next.

Enter the same URL for Identifier (e.g., https://server.domain/). Click Add, then Next.

On the Apply Access Control Policy screen, select Permit everyone and click Next.

On the Configure Application Permissions screen, ensure openid and profile are checked and click Next.

On the Summary screen, click Next.

On the Complete screen, click Close.

On the Properties window, click OK.

Adding an external provider (AD FS) in OpenLM Identity Service
Click the External Providers icon, then navigate to Add Provider.

Select ADFS from the provider type dropdown.

Fill in the Client ID field with the Application (client) ID you copied from step 3 in the previous section.

Fill in the Client Secret field with the Value you copied from step 5.

Fill in the value none in the Account ID field.

Enter the authority URL (your AD FS Server address) in the Authority field. Example: https://fqdn.domain.com/adfs.

Enter a button display name, for example, AD FS.

Click Save.

The new provider will appear on the next screen. Copy the Sign in and Sign out redirect URL.

Go back to the AD FS Server. Navigate to Tools → AD FS Management → Application Groups.

Double-click the application, select it, and click Edit.

In the redirect URI field, paste the Sign in and Sign out URL you copied in step 9, then click Add → OK → Apply.

Now, when you try to sign in, the AD FS button will appear as an option.

Referenced Images
img/external-providers-icon.png

img/adfs-login-button.png