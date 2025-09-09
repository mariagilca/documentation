---
title: "Integration Between Azure Active Directory And OpenLM"
date: "2023-11-03T15:10:20"
permalink: "https://www.openlm.com/docs/openlm-identity-service-installation-guide/identity-service-configuration/integration-between-azure-active-directory-and-openlm/"
posttype: "manual_documentation"
id: "6575"
---

This document describes the steps required to configure Azure Active Directory (AAD) with the Identity Service and set the Azure Active Directory as the external Identity provider for OpenLM. The following steps are to be performed to achieve this configuration:
<h2><a id="post-41985-_8er08b9lxafn"></a>Azure Active Directory Configuration</h2>
<ol>
 <li>Log in to the Azure Portal, link: https://portal.azure.com. Navigate your Azure Active Directory (AAD).
<img class="wp-image-54202" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-1-2.png" /></li>
 <li>Navigate to the <strong>App Registrations</strong> section.
<img class="wp-image-54203" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-2-2.png" /></li>
 <li>Create a new registration. Click the <strong>New Registration</strong> button.
<img class="wp-image-54204" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-3-2.png" /></li>
 <li>Provide the application <strong>display name</strong> (for example I<strong>dentity Service</strong>). In the Redirect URI field, from the drop-down list select Web. Leave the URI field empty, as we will come back to this step and update it later during configuration. Click the <strong>Register</strong> button.
<img class="wp-image-54205" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-4-2.png" /></li>
 <li>The Application is now registered. Please have handy the information depicted below – <strong>Application (client) ID</strong> and <strong>Directory (tenant) ID</strong> (it appears after clicking the Register button).
<img class="wp-image-54206" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-5-2.png" /></li>
 <li>Navigate to the <strong>Certificates & Secrets</strong> section to create a new client secret. Click<strong> New client secret</strong>.
<strong> Pro tip: </strong>open this section in a new tab.
<strong><img class="wp-image-54207" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-6-2.png" /></strong></li>
 <li>Provide a <strong>description</strong> for the client and choose its <strong>lifespan</strong>. Click <strong>ADD</strong>.
<strong><img class="wp-image-54208" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-7-1.png" /></strong></li>
 <li>The Client Secret is now created. Note the <strong>Value</strong> and <strong>Secret ID.
Important</strong>! Client secret values cannot be viewed, except immediately after creation. Be sure to save the secret ID when created before leaving the page.
<strong><img class="wp-image-54209" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-8-1.png" /></strong></li>
 <li><strong>Note</strong>: The value will be displayed hidden as shown in the image below and impossible to retrieve after closing the page:
<img class="wp-image-54210" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-9-1.png" /></li>
</ol>
<h3><a id="post-41985-_d3bowb51v9g6"></a><strong>OpenLM On-premise users</strong> - Adding Azure Active Directory in OpenLM Identity Service as an external Identity provider</h3>
 

To add the external provider (Azure) in the OpenLM Identity Service, make sure the OpenLM SLM and Identity Service are <a href="https://www.openlm.com/docs/openlm-slm-installation-guide/setting-up-ssl-for-openlm-server-and-identity-service/">SSL secured</a>
<ol>
 <li>Navigate to your Identity Service account → Click on the <strong>External Providers</strong> icon to add the external provider.</li>
 <li>Select the provider type <strong>Azure</strong> from the drop-down options.</li>
 <li>Enter the <strong>Client ID</strong> in the Client ID field. Client ID is “<strong>Application (client) ID</strong>” (from AAD settings, as in step 5 of the section “IAzure Active Directory Configuration” above).</li>
 <li>Enter the <strong>Client Secret</strong> in the Client Secret field. Client Secret is “<strong>Value</strong>” (from AAD settings, as in step 8 of the section “Azure Active Directory Configuration” above).</li>
 <li>Enter the Account ID - n<strong>one</strong> in the <strong>Account ID</strong> field.</li>
 <li>Enter the authority URL in the <strong>Authority</strong> field. The Authority field will be filled by the Azure Authority URL. Take the <strong>Directory (tenant) ID</strong> as mentioned in step 5 of the section “Identity Service Configuration Process with Azure Active Directory (AAD)” above and add it to the link: <strong>https://login.microsoftonline.com/{Directory (tenant) ID}.</strong></li>
 <li>Enter the display name for the provider in the Display Name field. For example <strong>Login with Azure</strong>.</li>
 <li>Click <strong>Save</strong>.
<strong><img class="wp-image-54211" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-10-1.png" /></strong></li>
 <li>After clicking Save, the following screen will appear. The added External Provider (Azure) is displayed in the External Providers list with the following details as shown on the screen below. Note the fields marked in red:
<img class="wp-image-54212" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-11-1.png" /></li>
 <li>Leave this window open for a while.</li>
 <li>Return to your Azure Active Directory account. Navigate to the <strong>Authentication</strong> section. Click <strong>Add Platform</strong>. Choose “<strong>Web</strong>” then provide the information for the Redirect URLs: F<strong>ront-channel Logout URL</strong> and <strong>Web Redirect UR</strong>L. Check the <strong>ID Tokens</strong> and choose who can use this application. Click Configure then Save.<strong>Note:</strong> The Redirect URLs are required to be taken from OpenLM Identity Service UI (as shown in the image, in step 9 above) when adding a new external provider.
<img class="wp-image-54213" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-12-1.png" /></li>
 <li>Navigate to your Identity Service account. Log out. The Azure Login button has appeared as a login option:
<img class="wp-image-54214" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-13-1.png" /></li>
</ol>
<h3><a id="post-41985-_dd7puea3eu0f"></a><strong>OpenLM Cloud Users</strong> - Configure Azure Active Directory as an external identity provider in Cloud Portal</h3>
<ol>
 <li>Navigate to your OpenLM Cloud Portal→<strong>External Providers</strong> tab. Click <strong>Add Provider</strong>.
<img class="wp-image-54215" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-14-1.png" /></li>
 <li>Enter the <strong>Client ID</strong> in the Client ID field. Client ID is “<strong>Application (client) ID</strong>” (from AAD settings, as in step 5 of the section “IAzure Active Directory Configuration” above).</li>
 <li>Enter the Client Secret in the <strong>Client Secre</strong>t field. Client Secret is “<strong>Value</strong>” (from AAD settings, as in step 8 of the section “Azure Active Directory Configuration” above).</li>
 <li>In the <strong>Authority</strong> field, input <strong>https://login.microsoftonline.com/{Directory (tenant) ID} </strong>(the tenant ID is Directory (tenant) ID from AAD settings, as in step 5 of the section “Azure Active Directory Configuration” above).</li>
 <li>Input the display name, e.g “<strong>Login with Azure</strong>”.</li>
 <li>Click <strong>SAVE.
<img class="wp-image-54216" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-15.png" /></strong></li>
 <li>After clicking Save, the following screen will appear. The added External Provider (Azure) is displayed in the External Providers list with the following details as shown on the screen below. Note the fields marked in red:
<img class="wp-image-54217" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-16.png" /></li>
 <li>Leave this window open for a while.</li>
 <li>Return to your Azure Active Directory account. Navigate to the <strong>Authentication</strong> section. Click <strong>Add Platform</strong>. Choose “<strong>Web</strong>” then provide the information for the Redirect URLs: Front-channel Logout URL and Web Redirect URL. Check the <strong>ID Tokens</strong> and choose who can use this application. Click <strong>Configure</strong> then Save.<strong>Note:</strong> The Redirect URLs are required to be taken from OpenLM Cloud Portal (as shown in the image, in step 7 above) when adding a new external provider.
<img class="wp-image-54218" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-17.png" /></li>
 <li>Go to your Cloud Portal. Click on your username (upper right corner) to see your profile information.
<img class="wp-image-54219" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41985-18.png" /></li>
 <li>Note and copy your <strong>OpenLM account ID</strong>.</li>
 <li>To access the OpenLM Cloud account using Azure Active Directory you need to create the following address, either
<a href="https://cloud.openlm.com/portal?loginAccountId=olmid">https://cloud.openlm.com/portal?loginAccountId=</a>your OpenLM account ID
or
<a style="font-size: 16px; background-color: #ffffff;" href="https://eu-cloud.openlm.com/portal?loginAccountId=olmid">https://eu-cloud.openlm.com/portal?loginAccountId=</a><span style="font-size: 16px;">your OpenLM account ID</span></li>
</ol>
<strong>Pro-tip</strong>: please clear your cache before accessing the Cloud Portal with the new configuration.

 

 
