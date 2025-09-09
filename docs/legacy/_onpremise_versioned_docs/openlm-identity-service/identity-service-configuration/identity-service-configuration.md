---
title: "Identity Service Configuration"
date: "2023-11-03T14:08:03"
permalink: "https://www.openlm.com/docs/openlm-identity-service-installation-guide/identity-service-configuration/"
posttype: "manual_documentation"
id: "6558"
---

When the Identity Service is not installed, everyone can access every OpenLM component without any security. When installing the Identity Service and setting up the Security Configuration, every component needs Client ID and Secret Key to be accessed.

There are 2 types of Security Configuration:

a. URL settings in Identity Service
<ul>
 <li>OpenLM Software License Management (SLM)</li>
 <li>Directory Sync</li>
 <li>Reports Scheduler</li>
 <li>ServiceNow</li>
</ul>
b. By setting the URL, when the user tries to open a URL in the Browser, Login Credentials will be asked. Client ID and Secret Key will be inserted into configuration files such as appsettings.json or property file. Once secured, every component connected to OpenLM SLM should be set up in security mode:
<ul>
 <li>Authorization JSON file from EasyAdmin User Interface:</li>
 <li>Broker</li>
 <li>DSA</li>
 <li>Workstation Agent</li>
 <li>End User Services (Personal Dashboard)</li>
 <li>Applications Manager</li>
 <li>OpenLM SLM API</li>
</ul>
Once OpenLM SLM is configured to work in secure mode in Identity Service, issue the Authorization JSON file from EasyAdmin User Interface and import it into each component.

To configure the OpenLM components to work in a secure environment, select the <strong>Security Configuration tab </strong>in the Identity Service:
<img class="alignnone size-full wp-image-62208" src="https://www.openlm.com/wp-content/uploads/2022/07/slm.png" alt="" width="1913" height="940" />

 
<h2><a id="post-41970-_rwoq81nkr8pd"></a>Configure the OpenLM SLM to work in a secure environment</h2>
<ol>
 <li>In the Identity Service UI, select the <strong>Security Configuration</strong> tab.</li>
 <li>Proceed with turning on the <strong>SLM </strong>toggle switch.</li>
 <li>Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: <a href="http://fqdn:5015/">http://FQDN:5015</a>).</li>
 <li>Type in the username (Admin by default)</li>
 <li>Click <strong>Save.</strong></li>
</ol>
<img class="alignnone size-full wp-image-62209" src="https://www.openlm.com/wp-content/uploads/2022/07/slm1.png" alt="" width="1917" height="938" />

Note: this will enable Security, Client ID, and Secret Key in the appsettings.json file located at "C:\Program Files\OpenLM\OpenLM SLM\bin\appsettings.json"
<pre>[php]
},

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

}
[/php]</pre>
6. Go to <strong>Services</strong> and restart both the Identity Service and the OpenLM SLM.

Restarting Services is mandatory to get a new Client ID and Secret Key.

In the EasyAdmin User Interface Dashboard, we can now see the logout button with the account:

<img class="wp-image-51448" src="https://www.openlm.com/wp-content/uploads/2022/07/dashboard-with-login-2.png" alt="dashboard with login" />

Instead, if we turn off the Server’s toggle switch (Non-Security Mode), the logout/in button will disappear. Everyone can access the EasyAdmin User Interface.

<img class="wp-image-51449" src="https://www.openlm.com/wp-content/uploads/2022/07/dashboard-without-login-2.png" alt="dashboard without login" />

Note: the second time you decide to turn off the Security for the OpenLM SLM, this will be done by changing the appsetings.json→EnableSecurity parameter to <strong>False</strong> (file located at "C:\Program Files\OpenLM\OpenLM SLM\bin\appsettings.json").
<pre>[php]

},

"Auth": {

"EnableSecurity": "False",

"Authority": "https://fqdn:5009",

"Audience": "openlm.server.api",

"AuthProvider": "",

"ClientId": "openlm.server.client",

"ClientSecret": "c0936471-0f6a-44af-9078-99d150683cad",

"ClientScope": "openlm.cloud.scope openlm.ugs.read.scope IdentityServerApi openlm.dss.scope openlm.etlmanager.scope",

"TokenEndpoint": "/connect/token"

}

}
[/php]</pre>
<strong>Warning</strong>: Restart the OpenLM SLM Service every time you turn on/off the Security Mode to reflect the changes.
<h2><a id="post-41970-_w320so60s2tn"></a>Configure the Directory Sync to work in a secure environment</h2>
<ol>
 <li>In the Identity Service UI, select the <strong>Security Configuration</strong> tab.</li>
 <li>Proceed with turning on the <strong>DSS </strong>toggle switch.</li>
 <li>Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: <a href="http://fqdn:5015/">http://FQDN:</a>7026).</li>
 <li>Click <strong>Save.</strong></li>
</ol>
<strong>Note: this will enable Security, Client ID, and Secret Key in the appsettings.json file. C:Program FilesOpenLMOpenLM Directory Synchronization Service</strong>

5. Navigate to <strong>Services</strong> and DSS Service.

Restarting Services is mandatory to get a new Client ID and Secret Key.
<h3><a id="post-41970-_h1mxwxd43ubk"></a>Configure the Reports Scheduler to work in a secure environment</h3>
<ol>
 <li>In the Identity Service UI, select the <strong>Settings</strong> tab, then <strong>Security Configuration.</strong></li>
 <li>Turn on the <strong>Reports Scheduler </strong>toggle switch.</li>
 <li>Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: <a href="http://fqdn:5015/">http://FQDN:</a>8888).</li>
 <li>Click <strong>Save.</strong></li>
</ol>
<strong>Note: this will enable Security, Client ID, and Secret Key in the report_scheduler.properties file. C:</strong>\<strong>Program Files</strong>\<strong>OpenLM</strong>\<strong>OpenLM Reports Scheduler</strong>\

5. Go to Windows <strong>Services</strong> and restart Reports Scheduler Service.

Restarting Services is mandatory to get a new Client ID and Secret Key.
<h2><a id="post-41970-_33o2sr6um5gd"></a>Configure the ServiceNow Adapter to work in a secure environment</h2>
<ol>
 <li>In the Identity Service UI, select the <strong>Security Configuration tab.</strong></li>
 <li>Turn on the <strong>ServiceNow </strong>toggle switch.</li>
 <li>Provide the Fully Qualified Domain Name for OpenLM SLM Machine (Ex: <a href="http://fqdn:5015/">http://FQDN:</a>5005).</li>
 <li>Click <strong>Save.</strong></li>
</ol>
<strong>Note: this will enable Security, Client ID, and Secret Key in the appsettings.json file. C:/Program Files/OpenLM/OpenLM External Platforms/Service</strong>

5. Go to <strong>Services</strong> and restart ExternalPlatformServices Service.

Restarting Services is mandatory to get a new Client ID and Secret Key.
<h2><a id="post-41970-_ny2u2j6hm7xv"></a>Account in Identity Service and Role&Permissions</h2>
If your license file doesn’t have Role&Permission, Identity Service still has basic Roles to assign users. It is presented in edit-only mode (No Adding, Deleting, Duplicating).

<img class="wp-image-51450" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-5.png" />

<img class="wp-image-51451" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-6.png" />

But if your license file has Role&Permission, it can give you full range and functionality of Roles like the below.

<img class="wp-image-51452" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-7.jpeg" />

Please consult with our Sales at sales@openlm.com if you want full functionalities.

The first default account is Admin in Identity Service. But if you want to create a new user, please follow the below steps.
<ol>
 <li>Create a User Account in Easyadmin User Interface: navigate to EasyAdmin User Interface→Start→Users&Groups→Users→Add User→Input the User’s data→Save.<img class="wp-image-51453" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-8.png" /></li>
 <li>Assign the Role to the user to login in EasyAdmin User Interface. (for more insights, please see the full Roles&Permissions <a href="https://www.openlm.com/knowledge-base/roles-and-permission-groups-based-security-kb4006">document</a>.
<img class="wp-image-51454" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-9.jpeg" /></li>
 <li>Navigate to your Identity Service instance→ Users tab→click Add User and create the same user as in the EasyAdmin User Interface→Click Save.
<img class="wp-image-51455" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-10.png" />
→
<img class="wp-image-51456" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-11.png" /></li>
</ol>
Note: If you want the user to be able to edit Identity Service settings, enable the System Administrator toggle button.
<ol>
 <li>Login to the EasyAdmin User Interface with the user account.</li>
</ol>
Right now, we have to manually add the same user in each EasyAdmin User Interface and Identity Service UI. Only the system administrator of Identity Service UI can change the passwords.
<h2><a id="post-41970-_uk8gjefosofs"></a>Configuring each component in Security Mode</h2>
 

Please note that, after you enable OpenLM SLM Security mode in Identity Service, each connected component needs Client ID and Secret Key (Authorization Json file).

Navigate to EasyAdmin User Interface → Security&Service→Security Tab→Authorization Tab.

<img class="wp-image-51457" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-12.jpeg" />

Add each component you are using and download the Authorization Json file.

<img class="wp-image-51458" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-13.png" />

Import the Json file while installing each component or put it under the installation folder.

(This depends on each component)

 

<img class="wp-image-51459" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-14.png" />

<img class="wp-image-51460" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-15.jpeg" />

<img class="wp-image-51461" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-16.jpeg" />

<img class="wp-image-51462" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-17.jpeg" />

<img class="wp-image-51463" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-18.jpeg" />

<img class="wp-image-51464" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-19.jpeg" />

Restart each service in Windows Service with OpenLM SLM & Identity Service services running.
Please note that the OpenLM SLM needs to read the Client ID and Secret Key info from each component.
<h2><a id="post-41970-_j2ls4qwjxty3"></a>Configuring User Name and Password</h2>
Do not turn off the User Name and Password toggle button unless desired to disable security.

<img class="wp-image-51465" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-20.png" />
<h2><a id="post-41970-_z1xwvr7yfwss"></a>Configuring Windows Authentication</h2>
Please refer to <a href="https://www.openlm.com/knowledge-base/how-to-configure-the-windows-authentication-v21-and-higher/">this document.</a>
<h2><a id="post-41970-_46map09gz7nt"></a>Configuring SMTP</h2>
When resetting the password if you forget your account, this button lets you set it back through your email address.

<img class="wp-image-51466" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-21.png" />

<img class="wp-image-51467" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-22.png" />
<h2><a id="post-41970-_a6fngj568yc1"></a>Configuring Session Time</h2>
You can configure the Screen time in this tab and then use your credentials to log in.

<img class="wp-image-51468" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41970-23.png" />
<h2><a id="post-41970-_2ukhoth2x8lu"></a>Configuring External Providers:</h2>
<a href="https://www.openlm.com/knowledge-base/configuring-okta-sso-with-openlm/">Okta SSO</a>.
<a href="https://www.openlm.com/knowledge-base/how-to-configure-identity-service-with-azure-active-directory-aad/">Azure Active Directory</a>.
<a href="https://www.openlm.com/knowledge-base/how-to-use-ad-fs-as-an-external-identity-provider-for-identity-service/">AD FS</a>.
<h2><a id="post-41970-_861m3uyis09f"></a><a href="https://www.openlm.com/wp-content/uploads/2022/07/Troubleshooting.pdf">Troubleshooting</a></h2>
