---
title: Keycloak Integration with OpenLM
sidebar_position: 3
description: Guide to integrating Keycloak with OpenLM Identity Service for authentication and user management.
---


Keycloak Configuration
Prerequisites
Keycloak must run on HTTPS.

No spaces are allowed in usernames.

Configuration
To get the authentication configuration for Keycloak, navigate to the following URL in your browser:
keyCloakURL/realms/realm-name/.well-known/openid-configuration

keyCloakURL should be replaced with the URL of your Keycloak instance.

realm-name should be replaced with the name of your realm if it is not the master.

For example: http://localhost:8080/realms/master/.well-known/openid-configuration

To define a client, log in to the administration console, select the Clients tab in the left-hand menu, then click the Create Client button.

Save the client.

Click on the client to view its details.

Add the OIDC external provider in your Identity/portal, using the ClientID and Client Secret.

The Authority field should be filled with the issuer value from the output of the command in step 1.

Note: In some cases, you may need to use keycloak-url/auth/realms/master/.well-known/openid-configuration.

Save the external provider.

Edit the Keycloak client and add the redirect uri from the OIDC external provider configuration in Identity Service.

Save the client.