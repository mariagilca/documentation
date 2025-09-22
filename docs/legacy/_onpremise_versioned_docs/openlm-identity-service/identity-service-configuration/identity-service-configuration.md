---
title: Identity Service Configuration
sidebar_position: 1
description: Learn how to configure the OpenLM Identity Service for authentication and integration.
---


Overview
When the OpenLM Identity Service isn't installed, every OpenLM component is unsecured. After installing the Identity Service and configuring security, every component needs a Client ID and Secret Key to access the system.

There are two main types of security configuration:

URL settings in Identity Service: This applies to OpenLM SLM, Directory Sync, Reports Scheduler, and ServiceNow.

Authorization JSON file from EasyAdmin: This applies to components that connect to the OpenLM SLM, such as the Broker, DSA, Workstation Agent, End User Services, Applications Manager, and the OpenLM SLM API.

Once OpenLM SLM is in secure mode, you must issue an Authorization JSON file from the EasyAdmin User Interface and import it into each connected component.

Configure the OpenLM SLM for a secure environment
In the Identity Service UI, select the Security Configuration tab.

Turn on the SLM toggle switch.

Provide the Fully Qualified Domain Name (FQDN) for the OpenLM SLM machine (e.g., http://FQDN:5015).

Type in the administrator username (default is Admin).

Click Save.

This will enable security, a Client ID, and a Secret Key in the appsettings.json file located at C:\Program Files\OpenLM\OpenLM SLM\bin\appsettings.json.

Go to Services and restart both the Identity Service and OpenLM SLM. Restarting is mandatory to generate a new Client ID and Secret Key.

After a successful restart, the EasyAdmin User Interface Dashboard will show a login/logout button. If you turn off the server's toggle switch, the buttons will disappear, and the system will return to non-security mode.

:::caution
You must restart the OpenLM SLM service every time you turn security mode on or off to reflect the changes.
:::

Configure the Directory Sync for a secure environment
In the Identity Service UI, select the Security Configuration tab.

Turn on the DSS toggle switch.

Provide the FQDN for the OpenLM SLM machine (e.g., http://FQDN:7026).

Click Save.

This will enable the Client ID and Secret Key in the appsettings.json file located at C:\Program Files\OpenLM\OpenLM Directory Synchronization Service.

Navigate to Services and restart the DSS Service.

Configure the Reports Scheduler for a secure environment
In the Identity Service UI, go to Settings → Security Configuration.

Turn on the Reports Scheduler toggle switch.

Provide the FQDN for the OpenLM SLM machine (e.g., http://FQDN:8888).

Click Save.

This will enable the Client ID and Secret Key in the report_scheduler.properties file located at C:\Program Files\OpenLM\OpenLM Reports Scheduler.

Go to Windows Services and restart the Reports Scheduler Service.

Configure the ServiceNow Adapter for a secure environment
In the Identity Service UI, select the Security Configuration tab.

Turn on the ServiceNow toggle switch.

Provide the FQDN for the OpenLM SLM machine (e.g., http://FQDN:5005).

Click Save.

This will enable the Client ID and Secret Key in the appsettings.json file located at C:\Program Files\OpenLM\OpenLM External Platforms\Service.

Go to Services and restart the ExternalPlatformServices Service.

Account in identity service and role & permissions
If your license file doesn't have the Role & Permission feature, the Identity Service will still have basic roles in an edit-only mode. With a license that includes the feature, you will have a full range of functionality for roles.

To create a new user:

Create a user account in the EasyAdmin User Interface by going to EasyAdmin User Interface → Start → Users & Groups → Users → Add User.

Assign a role to the user to allow them to log in to the EasyAdmin User Interface.

Navigate to your Identity Service instance, click the Users tab, then Add User, and create the same user as in EasyAdmin.

:::note
To enable a user to edit Identity Service settings, enable the System Administrator toggle button. You must manually add users to both EasyAdmin and Identity Service, and only the Identity Service administrator can change passwords.
:::

Configuring each component in security mode
After enabling OpenLM SLM Security mode, each connected component needs an Authorization JSON file containing its Client ID and Secret Key.

In the EasyAdmin User Interface, go to Security & Service → Security Tab → Authorization Tab.

Add each component you are using and download the Authorization JSON file.

Import the JSON file during each component's installation or place it in the installation folder.

Restart each component's service along with the OpenLM SLM and Identity Service services.

Other security configurations
User Name and Password: Do not turn off this toggle button unless you want to disable security.

Windows Authentication: Refer to this document for instructions.

SMTP: This is required for password resets. You can configure it to send a reset email if you forget your password.

Session Time: This tab allows you to configure screen time before re-authentication is required.

External Providers: OpenLM supports integration with Okta SSO, Azure Active Directory, and AD FS.

Troubleshooting: Refer to the troubleshooting document for assistance.