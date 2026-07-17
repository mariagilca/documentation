---
title: Integration between OKTA SSO and OpenLM
description: This is a short guide on configuring OKTA SSO and OpenLM integration.
sidebar_position: 2
---

This is a short guide on configuring OKTA SSO and OpenLM integration.

## Requirements

- An existing OKTA account
- OpenLM SLM&Identity Service v21 and higher configured with SSL or an OpenLM Platform

## Adding OpenLM application in Okta admin interface

1. On the left side menu, select **Applications:  
   ![Okta admin interface with the Applications menu selected.](/img/legacy/word-image-41990-1-5.png)**
2. Select **Create App Integration:  
   ![Okta Applications page with the Create App Integration button.](/img/legacy/word-image-41990-2-5.png)**
3. In the newly opened pop-up window, select the Sign-in method - **OIDC - OpenID Connect** and Application Type - **Web Application.** Select **Next.  
   ![Okta pop-up selecting OIDC sign-in method and Web Application type.](/img/legacy/word-image-41990-3-5.png)**
4. Name the application and check the following boxes:
   - A. Client Credentials
   - B. Authorization Code
   - C. Implicit (Hybrid)

   ![Okta app integration form naming the app and enabling the grant type checkboxes.](/img/legacy/word-image-41990-4-5.png)
5. Leave the URIs unchanged; the correct URIs will be provided by OpenLM after the integration is imported on the side of OpenLM at a later stage. Scroll down and select **Save. (Step 9).** After selecting **Save,** this prompt will appear:  
   ![Okta prompt displaying the new application's Client ID and Client Secret.](/img/legacy/word-image-41990-5-5.png)  
    **Note the Client ID and Client and Client Secret. Leave this window open for a while; we will return to collect the Client ID and Client Secret.**

## OpenLM on-premise configuration

1. Go to the OpenLM Identity Service →External Providers tab.
2. Select Add Provider. From the Provider type drop-down list, select Okta.
3. Fill in the following fields with the information from your Okta Account:
4. Provide a name at your convenience, for example, Okta.  
   A. Client IDClient Secret  
   B. Account ID - n**one** (case sensitive)C. Authority - your Okta ID as depicted below:  
   ![Identity Service Add Provider form for Okta with Client ID, Secret, and Authority.](/img/legacy/word-image-41990-6-5.png)
5. Select **Save.**![Identity Service saving the new Okta external provider.](/img/legacy/word-image-41990-7-5.png)
6. After the import is completed on the OpenLM Identity Service side, the correct URIs tied to your account will be generated.  
   ![Identity Service showing the generated sign-in and sign-out redirect URIs for the Okta provider.](/img/legacy/word-image-41990-8-5.png)
7. Go back to your OKTA account. Select **Edit** on the General Settings section:  
   ![Okta application General Settings section with the Edit button.](/img/legacy/word-image-41990-9-5.png)
8. Scroll down to the Login Section. Input data from OpenLM Identity Service, including the sign-in and sign-out redirect URLs**.** Select **Save.  
   ![Okta Login section with the OpenLM sign-in and sign-out redirect URLs entered.](/img/legacy/word-image-41990-10-5.png)
9. Go to the Identity Service webpage. Log out. Now you will be able to log in with OKTA:![Identity Service sign-in page showing the Okta login button.](/img/legacy/word-image-41990-11-5.png)

## OpenLM Platform

If you are using OpenLM Platform, follow these steps to configure OKTA as an external Identity provider:

1. Navigate to your Cloud Portal instance→Identity&Access Management (IAM)→External Providers→Add Provider.![Cloud Portal Identity and Access Management External Providers Add Provider page.](/img/legacy/word-image-41990-12-5.png)
2. Input the following details from your Okta account:  
   A. Client ID  
   B. Client Secret  
   C. Authority (example: dev-12345678.okta.com).
3. Provide a public button name (example: Okta).![Cloud Portal Add Provider form with the Okta Client ID, Secret, Authority, and button name.](/img/legacy/word-image-41990-13-5.png)
4. Switch to the Products and Roles tab. For the following products:  
   A. Virtual License Manager  
   B. Software License Management Cloud  
   C. Dongle Monitoring  
   D. OneDirectorySync
5. Select either an Admin or Manager role.  
   ![Cloud Portal Products and Roles tab assigning Admin or Manager roles per product.](/img/legacy/word-image-41990-14-5.png)
6. Select **SAVE**. After the import is completed on the OpenLM Identity&Access Management side, the correct URIs tied to your account will be generated.  
   ![Cloud Portal showing the generated redirect URIs after the Okta provider import.](/img/legacy/Cloud-portal.png)
7. Go back to your OKTA account. Select **Edit on the General setting Section.**
8. Scroll down to the Login Section. Input data from the OpenLM Portal, including the sign-in and signout redirect URLs**.** Select **Save.**
9. Go back to your Cloud Portal and Sign out. Sign - in again using this pattern:  
   [https://cloud.openlm.com/portal?loginAccountId=](https://qa-awslinux-cloud.openlm.com/portal?loginAccountId=285639607)123456789  
   Note: The OpenLM Account ID is taken by clinking on the drop-down arrow in the upper right corner next to your user name:  
   ![Cloud Portal user menu dropdown showing where to find the OpenLM Account ID.](/img/legacy/word-image-41990-16-5.png)
