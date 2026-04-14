---
title: "Identity Service configuration"
sidebar_position: 1
---
When Identity Service is not installed, everyone can access every OpenLM component without any security. When installing the Identity Service and setting up the Security Configuration, every component needs Client ID and Secret Key to be accessed.

There are 2 types of Security Configuration:

a. URL settings in Identity Service

- OpenLM Software License Management (SLM)
- Directory Sync
- Reports Scheduler
- ServiceNow

b. By setting the URL, when the user tries to open a URL in the Browser, Login Credentials will be asked. Client ID and Secret Key will be inserted into configuration files such as appsettings.json or property file. Once secured, every component connected to OpenLM SLM should be set up in security mode:

- Authorization JSON file from EasyAdmin User Interface:
- Broker
- DSA
- Workstation Agent
- End User Services (Personal Dashboard)
- Applications Manager
- OpenLM SLM API

Once OpenLM SLM is configured to work in secure mode in Identity Service, issue the Authorization JSON file from EasyAdmin User Interface and import it into each component.

To configure the OpenLM components to work in a secure environment, select the **Security Configuration tab** in the Identity Service:  
![Screenshot: Identity Service configuration](/img/legacy/slm.png)

## Configure OpenLM SLM to work in a secure environment

1. In the Identity Service UI, select the **Security Configuration** tab.
2. Proceed with turning on the **SLM** toggle switch.
3. Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: [http://FQDN:5015](http://fqdn:5015/)).
4. Type in the username (Admin by default)
5. Click **Save.**

![Screenshot: Configure OpenLM SLM to work in a secure environment](/img/legacy/slm1.png)

Note: this will activate Security, Client ID, and Secret Key in the appsettings.json file located at "C:\Program Files\OpenLM\OpenLM SLM\bin\appsettings.json"

```

"Auth": {

"EnableSecurity": true,

"Authority": "https://fqdn:5009",

"Audience": "openlm.server.api",

"AuthProvider": "",

"ClientId": "openlm.server.client",

"ClientSecret": "c0936471-0f6a-44af-9078-99d150683cad",

"ClientScope": "openlm.cloud.scope openlm.ugs.read.scope IdentityServerApi openlm.dss.scope openlm.etlmanager.scope",

"TokenEndpoint": "/connect/token"

}

```

6. Go to **Services** and restart both Identity Service and OpenLM SLM.

Restarting Services is mandatory to get a new Client ID and Secret Key.

In the EasyAdmin User Interface Dashboard, we can now see the logout button with the account:

![dashboard with login](/img/legacy/dashboard-with-login-2.png)

Instead, if we turn off the Server's toggle switch (Non-Security Mode), the logout/in button will disappear. Everyone can access the EasyAdmin User Interface.

![dashboard without login](/img/legacy/dashboard-without-login-2.png)

Note: the second time you decide to turn off the Security for the OpenLM SLM, this will be done by changing the appsetings.json→EnableSecurity parameter to **False** (file located at "C:\Program Files\OpenLM\OpenLM SLM\bin\appsettings.json").

```

"Auth": {

"EnableSecurity": "False",

"Authority": "https://fqdn:5009",

"Audience": "openlm.server.api",

"AuthProvider": "",

"ClientId": "openlm.server.client",

"ClientSecret": "c0936471-0f6a-44af-9078-99d150683cad",

"ClientScope": "openlm.cloud.scope openlm.ugs.read.scope IdentityServerApi openlm.dss.scope openlm.etlmanager.scope",

"TokenEndpoint": "/connect/token"
```

**Warning**: Restart OpenLM SLM Service every time you turn on/off Security Mode to reflect the changes.

## Configure Directory Sync to work in a secure environment

1. In the Identity Service UI, select the **Security Configuration** tab.
2. Proceed with turning on the **DSS** toggle switch.
3. Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: [http://FQDN:](http://fqdn:5015/)7026).
4. Click **Save.**

**Note: this will enable Security, Client ID, and Secret Key in the appsettings.json file. C:Program FilesOpenLMOpenLM Directory Synchronization Service**

5. Navigate to **Services** and DSS Service.

Restarting Services is mandatory to get a new Client ID and Secret Key.

### Configure Reports Scheduler to work in a secure environment

1. In the Identity Service UI, select the **Settings** tab, then **Security Configuration.**
2. Turn on the **Reports Scheduler** toggle switch.
3. Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: [http://FQDN:](http://fqdn:5015/)8888).
4. Click **Save.**

**Note: this will enable Security, Client ID, and Secret Key in the report\_scheduler.properties file. C:**\**Program Files**\**OpenLM**\**OpenLM Reports Scheduler**\

5. Go to Windows **Services** and restart Reports Scheduler Service.

Restarting Services is mandatory to get a new Client ID and Secret Key.

## Configure ServiceNow Adapter to work in a secure environment

1. In the Identity Service UI, select the **Security Configuration tab.**
2. Turn on the **ServiceNow** toggle switch.
3. Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: [http://FQDN:](http://fqdn:5015/)5005).
4. Click **Save.**

**Note: this will enable Security, Client ID, and Secret Key in the appsettings.json file. C:/Program Files/OpenLM/OpenLM External Platforms/Service**

5. Go to **Services** and restart ExternalPlatformServices Service.

Restarting Services is mandatory to get a new Client ID and Secret Key.

## Account in Identity Service and Role&Permissions

If your license file doesn't have Role&Permission, Identity Service still has basic Roles to assign users. It is presented in edit-only mode (No Adding, Deleting, Duplicating).

![Screenshot: Account in Identity Service and Role&Permissions](/img/legacy/word-image-41970-5.png)

![Screenshot 2: Account in Identity Service and Role&Permissions](/img/legacy/word-image-41970-6.png)

But if your license file has Role&Permission, it can give you full range and functionality of Roles like the below.

![Screenshot 3: Account in Identity Service and Role&Permissions](/img/legacy/word-image-41970-7.jpeg)

Consult with our Sales at sales@openlm.com if you want full functionalities.

The first default account is Admin in Identity Service. But if you want to create a new user, follow the below steps.

1. Create a User Account in Easyadmin User Interface: navigate to EasyAdmin User Interface→Start→Users&Groups→Users→Add User→Input the User's data→Save.![Screenshot 4: Account in Identity Service and Role&Permissions](/img/legacy/word-image-41970-8.png)
2. Assign the Role to the user to login in EasyAdmin User Interface. (for more insights, see the full Roles&Permissions [document](../../openlm-slm-features/openlm-roles-permissions.md).  
   ![Screenshot 5: Account in Identity Service and Role&Permissions](/img/legacy/word-image-41970-9.jpeg)
3. Navigate to your Identity Service instance→ Users tab→click Add User and create the same user as in the EasyAdmin User Interface→Click Save.  
   ![Screenshot 6: Account in Identity Service and Role&Permissions](/img/legacy/word-image-41970-10.png)  
   →  
   ![Screenshot 7: Account in Identity Service and Role&Permissions](/img/legacy/word-image-41970-11.png)

Note: If you want the user to be able to edit Identity Service settings, activate the System Administrator toggle button.

1. Login to the EasyAdmin User Interface with the user account.

Right now, we have to manually add the same user in each EasyAdmin User Interface and Identity Service UI. Only the system administrator of Identity Service UI can change the passwords.

## Configuring each component in Security Mode

Note that, after you activate OpenLM SLM Security mode in Identity Service, each connected component needs Client ID and Secret Key (Authorization Json file).

Navigate to EasyAdmin User Interface → Security&Service→Security Tab→Authorization Tab.

![Screenshot: Configuring each component in Security Mode](/img/legacy/word-image-41970-12.jpeg)

Add each component you are using and download the Authorization Json file.

![Screenshot 2: Configuring each component in Security Mode](/img/legacy/word-image-41970-13.png)

Import the Json file while installing each component or put it under the installation folder.

(This depends on each component)

![Screenshot 3: Configuring each component in Security Mode](/img/legacy/word-image-41970-14.png)

![Screenshot 4: Configuring each component in Security Mode](/img/legacy/word-image-41970-15.jpeg)

![Screenshot 5: Configuring each component in Security Mode](/img/legacy/word-image-41970-16.jpeg)

![Screenshot 6: Configuring each component in Security Mode](/img/legacy/word-image-41970-17.jpeg)

![Screenshot 7: Configuring each component in Security Mode](/img/legacy/word-image-41970-18.jpeg)

![Screenshot 8: Configuring each component in Security Mode](/img/legacy/word-image-41970-19.jpeg)

Restart each service in Windows Service with OpenLM SLM & Identity Service services running.  
Note that the OpenLM SLM needs to read the Client ID and Secret Key info from each component.

## Configuring username and password

Do not turn off the username and password toggle button unless desired to deactivate security.

![Screenshot: Configuring username and password](/img/legacy/word-image-41970-20.png)

## Configuring Windows Authentication

Refer to [this document.](https://www.openlm.com/knowledge-base/how-to-configure-the-windows-authentication-v21-and-higher/)

## Configuring SMTP

If you forget your account password, use this button to reset it through your email address.

![Screenshot: Configuring SMTP](/img/legacy/word-image-41970-21.png)

![Screenshot 2: Configuring SMTP](/img/legacy/word-image-41970-22.png)

## Configuring session time

You can configure the Screen time in this tab and then use your credentials to log in.

![Screenshot: Configuring session time](/img/legacy/word-image-41970-23.png)

## Configuring External Providers:

[Okta SSO](./integration-between-okta-sso-and-openlm-configuration.md).  
[Azure Active Directory](./integration-between-azure-active-directory-and-openlm.md).  
[AD FS](./integration-between-ad-fs-and-openlm.md).

## [Troubleshooting](/pdfs/Troubleshooting.pdf)
