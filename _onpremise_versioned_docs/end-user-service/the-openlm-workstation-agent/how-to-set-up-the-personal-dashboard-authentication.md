---
title: "How to set up the  Personal Dashboard authentication"
date: "2022-04-29T12:32:14"
permalink: "https://www.openlm.com/docs/how-to-set-up-the-personal-dashboard-authentication/"
posttype: "manual_documentation"
id: "7000"
---

<strong>Note: this feature is available in v22.4 and above, together with OpenLM SLM and Identity Service v22.4
</strong>
By enabling user authentication, all Personal Dashboard users will be able to log into the system using one of the supported providers (like OKTA, Windows Authentication, AzureAD, etc.) or by using the credentials created in OpenLM Identity Service.

Creating authorization file for the End-User Sevices:
<ol>
 <li>Open up the <strong>EasyAdmin</strong> → <strong>Administration</strong> → <strong>System&Security</strong> → <strong>Security</strong> →<strong>Authorization</strong>. Click <strong>ADD</strong>.</li>
 <li>From the <strong>Type</strong> dropdown list, select <strong>End-User Services</strong>.</li>
 <li>Type in a description in the <strong>Description</strong> field.</li>
 <li>Provide the End-User Services URL in the following format: <strong>protocol://hostname:port</strong>.</li>
 <li><strong>Click Save</strong>.</li>
 <li>A pop-up window will appear, notifying that the secret key will only be displayed once. Click OK. (<strong>Check</strong> the <strong><em>Don't show this message again if needed</em></strong>).</li>
 <li>Once the Secret Key is displayed, click the <strong>Download</strong> button.</li>
 <li>Go to C:Program FilesOpenLMEnd-User Services and replace the existing JSON Authorization file with the newly created one.</li>
 <li>Restart the End-User Services Service.</li>
 <li>Go to <strong>EasyAdmin</strong> → <strong>Administration </strong>→ <strong>Roles. </strong>Double-click the <strong>admin_role </strong>row → <strong>Users </strong>→ <strong>Add </strong>then <strong>Select a </strong>username (s).</li>
 <li>Go back to the Personal Dashboard and refresh the page. A new tab will appear -  <strong>Settings. </strong></li>
 <li>Check the <strong>Enable user authentication </strong>box then click <strong>Save. </strong> A pop-up window will appear, notifying that the service restart is required. Click <strong>OK </strong>to close it then restart the End-User Services service.Now the user can use the EasyAdmin credentials to authenticate.</li>
</ol>
<strong><img class="wp-image-37112" src="https://www.openlm.com/docs/wp-content/uploads/2022/04/graphical-user-interface-description-automaticall.png" alt="Graphical user interface Description automatically generated with medium confidence" /></strong>

 

 
