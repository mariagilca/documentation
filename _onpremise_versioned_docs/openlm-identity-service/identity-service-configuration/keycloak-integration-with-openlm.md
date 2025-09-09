---
title: "KeyCloak integration with OpenLM"
date: "2024-04-03T12:01:11"
permalink: "https://www.openlm.com/docs/keycloak-integration-with-openlm/"
posttype: "manual_documentation"
id: "6802"
---

<h2>KeyCloak Configuration</h2>
<h3><a id="post-83208-_s8ebtc51xkl3"></a>Prerequisites</h3>
<ul>
 <li>KeyCloak MUST run <strong>HTTPS</strong></li>
 <li>No spaces allowed in usernames</li>
</ul>
<h2><a id="post-83208-_p7xyj7gjctbe"></a>Configuration</h2>
<ol>
 <li>To get the authentication configuration for KeyCloak:
<a href="http://localhost:8080/realms/master/.well-known/openid-configuration"><strong>keyCloakURL</strong>/realms/<strong>realm-name/</strong>.well-known/openid-configuration
</a><strong>keyCloakURL - should be replaced by the url of keycloak
master -should be changed to the real name if it is not the master.
</strong> for example <a href="http://localhost:8080/realms/master/.well-known/openid-configuration">http://localhost:8080/realms/<strong>master</strong>/.well-known/openid-configuration</a></li>
 <li>To define a client, login to the administration console, select <strong>Clients</strong> tab in left menu, then click <strong>Create Client</strong> button:<img class="wp-image-83209" src="https://cdn.openlm.com/wp-content/uploads/2024/04/word-image-83208-1.png" /><img class="wp-image-83210" src="https://cdn.openlm.com/wp-content/uploads/2024/04/word-image-83208-2.png" /></li>
 <li>Save the client.</li>
 <li>Click on the client to see its details.</li>
 <li>Add OIDC external provider in Identity\portal , use the following <strong><strong>ClientID and Client Secret
<img class="wp-image-83211" src="https://cdn.openlm.com/wp-content/uploads/2024/04/word-image-83208-3.png" /></strong></strong><img class="wp-image-83212" src="https://cdn.openlm.com/wp-content/uploads/2024/04/word-image-83208-4.png" />

 </li>
 <li>Authority should be filled with the <strong>issuer </strong>value from the output of the command in step 2.
<strong>Note</strong> - in some cases one needs to use <strong><strong>keycloak-url/auth/realms/master/.well-known/openid-configuration
<img class="wp-image-83213" src="https://cdn.openlm.com/wp-content/uploads/2024/04/word-image-83208-5.png" /></strong></strong> </li>
 <li>Save the external provider.</li>
 <li>Edit the KeyCloak client and add the redirect uri from the OIDC external provider config in Identity Service:
<img class="wp-image-83214" src="https://cdn.openlm.com/wp-content/uploads/2024/04/word-image-83208-6.png" /></li>
 <li>Save the client.</li>
</ol>
 
