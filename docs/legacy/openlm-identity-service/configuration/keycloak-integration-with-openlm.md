---
title: "KeyCloak integration with OpenLM"
description: keyCloakURL/realms/realm-name/.well-known/openid-configurationkeyCloakURL - should be replaced by the url of keycloak master -should be changed to the.
sidebar_position: 3
---

## KeyCloak configuration

### Prerequisites

- KeyCloak MUST run **HTTPS**
- No spaces allowed in usernames

## Configuration

1. To get the authentication configuration for KeyCloak:  
   [**keyCloakURL**/realms/**realm-name/**.well-known/openid-configuration](http://localhost:8080/realms/master/.well-known/openid-configuration)**keyCloakURL - should be replaced by the url of keycloak  
   master -should be changed to the real name if it is not the master.** for example [http://localhost:8080/realms/**master**/.well-known/openid-configuration](http://localhost:8080/realms/master/.well-known/openid-configuration)
2. To define a client, login to the administration console, select **Clients** tab in left menu, then select **Create Client** button:![Screenshot: Configuration](/img/legacy/word-image-83208-1.png)![Screenshot 2: Configuration](/img/legacy/word-image-83208-2.png)
3. Save the client.
4. Select on the client to see its details.
5. Add OIDC external provider in Identity\portal , use the following ****ClientID and Client Secret  
   ![Screenshot 3: Configuration](/img/legacy/word-image-83208-3.png)****![Screenshot 4: Configuration](/img/legacy/word-image-83208-4.png)
6. Authority should be filled with the **issuer** value from the output of the command in step 2.  
   **Note** - in some cases one needs to use ****keycloak-url/auth/realms/master/.well-known/openid-configuration  
   ![Screenshot 5: Configuration](/img/legacy/word-image-83208-5.png)****
7. Save the external provider.
8. Edit the KeyCloak client and add the redirect uri from the OIDC external provider config in Identity Service:  
   ![Screenshot 6: Configuration](/img/legacy/word-image-83208-6.png)
9. Save the client.
