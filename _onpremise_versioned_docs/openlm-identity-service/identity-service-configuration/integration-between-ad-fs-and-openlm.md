---
title: "Integration Between AD FS and OpenLM"
date: "2023-11-03T15:03:45"
permalink: "https://www.openlm.com/docs/openlm-identity-service-installation-guide/identity-service-configuration/integration-between-ad-fs-and-openlm/"
posttype: "manual_documentation"
id: "6568"
---

<h2>Requirements:</h2>
<ul>
 <li>ADFS service configured</li>
 <li><span style="font-weight: 400;">OpenLM Identity Service installed and running with HTTPS (SSL)</span></li>
</ul>
This document describes the steps required to configure AD FS as an external Identity provider for the OpenLM Identity Service.
<h2>Creating an application group</h2>
<ol>
 <li>In AD FS Management, right-click on <strong>Application Groups</strong> and select <strong>Add Application Group</strong>.</li>
 <li>On the <strong>Application Group Wizard</strong>, type a name, and under Standalone applications select the <strong>Server application</strong> template. <strong>Click Next.</strong></li>
 <li>Copy the <strong>Client Identifier</strong> value. It will be used later in the Identity Service configuration</li>
 <li>Enter the Identity Service URL for Redirect URI (<a href="https://server.domain/">https://server.domain</a>). Click <strong>Add.</strong> Click <strong>Next.</strong></li>
 <li>On the Configure Application Credentials screen, place the check <strong>Generate a shared secret</strong> and copy the secret. Click <strong>Next</strong>.</li>
 <li>On the Summary screen, click <strong>Next</strong>.</li>
 <li>On the Complete screen, click <strong>Close</strong>.</li>
 <li>Right-click on the newly added Application Group and select <strong>Properties</strong>.</li>
 <li>On the Properties window click <strong>Add application</strong>.</li>
 <li>On the Add a new application to… select <strong>Web API </strong>and click <strong>Next</strong>.</li>
 <li>On the Configure Web API screen, enter the same URL for Identifier (<a href="https://server.domain/">https://server.domain</a>). Click <strong>Add</strong>. Click <strong>Next</strong>.</li>
 <li>In the Apply Access Control Policy screen, select <strong>Permit everyone</strong> and click <strong>Next.</strong></li>
 <li>On the Configure Application Permissions screen, make sure <strong><em>openid</em></strong> and <strong><em>profile</em></strong> are checked and <strong>click Next.</strong></li>
 <li>On the Summary screen, click <strong>Next</strong>.</li>
 <li>On the Complete screen, click <strong>Close</strong>.</li>
 <li>On the Properties window click <strong>OK.</strong></li>
</ol>
<h2>Adding An External Provider (AD FS) in OpenLM Identity Service</h2>
To add the external provider (AD FS) to the OpenLM Identity Service, perform the following steps:
<ol>
 <li> Click on the <strong>External Providers</strong> <img class="wp-image-35110" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-14.png" /> icon then navigate to <strong>Add Provider.</strong></li>
 <li>Select the provider type <strong>ADFS</strong> from the drop-down options.</li>
 <li>Fill in the ID Client in the<strong> Client ID</strong> field. Client ID is "Application (client) ID"  from AD FS settings, as in step 3 of the section above.</li>
 <li>Fill in the Client Secret in the Client Secret field. Client Secret is “Value” (from AD FS settings, as in step 5 of the section above.</li>
 <li>Fill in the value <strong>none </strong>in the <strong>Account ID </strong>field.</li>
 <li>Enter the authority URL ( AD FS Server address) in the Authority field. Example: https://fqdn.domain.com/adfs.)</li>
 <li>Enter the button display name, for example, <strong> AD FS.</strong></li>
 <li>Click <strong>Save.</strong></li>
 <li>The newly added provider will appear on the next screen. Copy the Sign in and Sign out redirect URL.</li>
 <li>Go back to the AD FS Server. Click on <strong>Tools</strong>→<strong>AD FS Management</strong>→<strong>Application Groups.</strong></li>
 <li>Double-click on the application.</li>
 <li>Select the application and click <strong>Edit.</strong></li>
 <li>In the redirect URI field paste the copied in step 9 Sign in and Sign out URL, then click <strong>Add, </strong> then <strong>OK</strong>→<strong>Apply</strong>.</li>
</ol>
Now, when trying to sign in, there will be the AD FS button:

<a href="https://www.openlm.com/wp-content/uploads/2022/03/identity.png"><img class="alignnone size-full wp-image-35116" src="https://www.openlm.com/wp-content/uploads/2022/03/identity.png" alt="" width="800" height="627" /></a>
