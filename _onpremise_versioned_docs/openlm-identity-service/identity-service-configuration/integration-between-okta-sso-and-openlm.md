---
title: "Integration Between OKTA SSO and OpenLM"
date: "2023-11-03T15:00:31"
permalink: "https://www.openlm.com/docs/openlm-identity-service-installation-guide/identity-service-configuration/integration-between-okta-sso-and-openlm-configuration/"
posttype: "manual_documentation"
id: "6565"
---

This is a short guide on configuring OKTA SSO and OpenLM integration.
<h2>Requirements:</h2>
<ul>
 <li>An existing OKTA account</li>
 <li>OpenLM SLM&Identity Service v21 and higher configured with SSL or an OpenLM SLMC</li>
</ul>
<h1>Adding OpenLM Application in the Okta Admin Interface</h1>
<ol>
 <li>On the left side menu, click on <strong>Applications:
<img class="wp-image-54869" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-1-5.png" />
</strong></li>
 <li>Click on <strong>Create App Integration:
<img class="wp-image-54870" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-2-5.png" />
</strong></li>
 <li>In the newly opened pop-up window, select the Sign-in method - <strong>OIDC - OpenID Connect</strong> and Application Type - <strong>Web Application. </strong>Click<strong> Next.
<img class="wp-image-54871" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-3-5.png" />
</strong></li>
 <li>Name the application and check the following boxes:
<ul>
 <li style="list-style-type: none;">
<ul>A. Client Credentials</ul>
</li>
</ul>
<ul>
 <li style="list-style-type: none;">
<ul>B. Authorization Code</ul>
</li>
</ul>
<ul>
 <li style="list-style-type: none;">
<ul>C. Implicit (Hybrid)</ul>
</li>
</ul>
<img class="wp-image-54872" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-4-5.png" /></li>
 <li>Leave the URIs unchanged; the correct URIs will be provided by OpenLM after the integration is imported on the side of OpenLM at a later stage. Scroll down and click <strong>Save. (Step 9).
</strong> After clicking <strong>Save, </strong>this prompt will appear:
<img class="wp-image-54873" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-5-5.png" />
<strong>
Note the Client ID and Client and Client Secret. Leave this window open for a while; we will return to collect the Client ID and Client Secret.</strong></li>
</ol>
<h2><a id="post-41990-_ukxc4g1002x0"></a>OpenLM on-premise configuration</h2>
<ol>
 <li>Go to the OpenLM Identity Service →External Providers tab.</li>
 <li>Click Add Provider. From the Provider type drop-down list, select Okta.</li>
 <li>Fill in the following fields with the information from your Okta Account:</li>
 <li>Provide a name at your convenience, for example, Okta.
A. Client IDClient Secret
B. Account ID - n<strong>one </strong>(case sensitive)<strong>
</strong>C. Authority - your Okta ID as depicted below:
<img class="wp-image-54874" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-6-5.png" /></li>
 <li>Click <strong>Save.</strong><img class="wp-image-54875" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-7-5.png" /></li>
 <li>After the import is completed on the OpenLM Identity Service side, the correct URIs tied to your account will be generated.
<img class="wp-image-54876" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-8-5.png" /></li>
 <li>Go back to your OKTA account. Click <strong style="font-size: 16px;"><strong>Edit on General setting Section:
<img class="wp-image-54877" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-9-5.png" />
</strong></strong></li>
 <li>Scroll down to the Login Section. Input data from OpenLM Identity Service, including the sign-in and sign-out redirect URLs<strong style="font-size: 16px;">. </strong><span style="font-size: 16px;">Click</span><strong style="font-size: 16px;"> Save.
<strong><img class="wp-image-54878" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-10-5.png" /></strong>
</strong></li>
 <li>Go to the Identity Service webpage. Log out. Now you will be able to log in with OKTA:<img class="wp-image-54879" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-11-5.png" /></li>
</ol>
<h2><a id="post-41990-_gjqz9en37jtb"></a>OpenLM SLMC</h2>
If you are an OpenLM SLMC, follow these steps to configure OKTA as an external Identity provider:
<ol>
 <li>Navigate to your Cloud Portal instance→Identity&Access Management (IAM)→External Providers→Add Provider.<img class="wp-image-54880" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-12-5.png" /></li>
 <li>Input the following details from your Okta account:
A. Client ID
B. Client Secret
C. Authority (example: dev-12345678.okta.com).</li>
 <li>Provide a public button name (example: Okta).<img class="wp-image-54881" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-13-5.png" /></li>
 <li>Switch to the Products and Roles tab. For the following products:
A. Virtual License Manager
B. Software License Management Cloud
C. Dongle Monitoring
D. OneDirectorySync</li>
 <li>Choose either an Admin or Manager role.
<img class="wp-image-54882" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-14-5.png" /></li>
 <li>Click <strong style="font-size: 16px;">SAVE</strong><span style="font-size: 16px;">. After the import is completed on the OpenLM Identity&Access Management side, the correct URIs tied to your account will be generated.
<img class="alignnone size-full wp-image-54887" src="https://www.openlm.com/wp-content/uploads/2022/02/Cloud-portal.png" alt="" width="1615" height="666" /></span></li>
 <li>Go back to your OKTA account. Click <strong style="font-size: 16px;">Edit on the General setting Section.</strong></li>
 <li>Scroll down to the Login Section. Input data from the OpenLM Cloud Portal, including the sign-in and signout redirect URLs<strong>. </strong>Click<strong> Save.</strong></li>
 <li>Go back to your Cloud Portal and Sign out. Sign - in again using this pattern:
<a href="https://qa-awslinux-cloud.openlm.com/portal?loginAccountId=285639607">https://cloud.openlm.com/portal?loginAccountId=</a>123456789
Note: The OpenLM Account ID is taken by clinking on the drop-down arrow in the upper right corner next to your user name:
<img class="wp-image-54884" src="https://www.openlm.com/wp-content/uploads/2022/02/word-image-41990-16-5.png" /></li>
</ol>
 

 
