---
title: "Integration between OKTA SSO and OpenLM"
description: This is a short guide on configuring OKTA SSO and OpenLM integration.
sidebar_position: 2
---

This is a short guide on configuring OKTA SSO and OpenLM integration.

## Requirements:

- An existing OKTA account
- OpenLM SLM&Identity Service v21 and higher configured with SSL or an OpenLM SLMC

## Adding OpenLM Application in Okta Admin Interface

1. On the left side menu, click on **Applications:  
   ![Screenshot: Adding OpenLM Application in Okta Admin Interface](/img/legacy/word-image-41990-1-5.png)**
2. Click on **Create App Integration:  
   ![Screenshot 2: Adding OpenLM Application in Okta Admin Interface](/img/legacy/word-image-41990-2-5.png)**
3. In the newly opened pop-up window, select the Sign-in method - **OIDC - OpenID Connect** and Application Type - **Web Application.** Click **Next.  
   ![Screenshot 3: Adding OpenLM Application in Okta Admin Interface](/img/legacy/word-image-41990-3-5.png)**
4. Name the application and check the following boxes:
   - A. Client Credentials
   - B. Authorization Code
   - C. Implicit (Hybrid)

   ![Screenshot 4: Adding OpenLM Application in Okta Admin Interface](/img/legacy/word-image-41990-4-5.png)
5. Leave the URIs unchanged; the correct URIs will be provided by OpenLM after the integration is imported on the side of OpenLM at a later stage. Scroll down and click **Save. (Step 9).** After clicking **Save,** this prompt will appear:  
   ![Screenshot 5: Adding OpenLM Application in Okta Admin Interface](/img/legacy/word-image-41990-5-5.png)  
    **Note the Client ID and Client and Client Secret. Leave this window open for a while; we will return to collect the Client ID and Client Secret.**

## OpenLM on-premise configuration

1. Go to the OpenLM Identity Service →External Providers tab.
2. Click Add Provider. From the Provider type drop-down list, select Okta.
3. Fill in the following fields with the information from your Okta Account:
4. Provide a name at your convenience, for example, Okta.  
   A. Client IDClient Secret  
   B. Account ID - n**one** (case sensitive)C. Authority - your Okta ID as depicted below:  
   ![Screenshot: OpenLM on-premise configuration](/img/legacy/word-image-41990-6-5.png)
5. Click **Save.**![Screenshot 2: OpenLM on-premise configuration](/img/legacy/word-image-41990-7-5.png)
6. After the import is completed on the OpenLM Identity Service side, the correct URIs tied to your account will be generated.  
   ![Screenshot 3: OpenLM on-premise configuration](/img/legacy/word-image-41990-8-5.png)
7. Go back to your OKTA account. Click ****Edit on General setting Section:  
   ![Screenshot 4: OpenLM on-premise configuration](/img/legacy/word-image-41990-9-5.png)****
8. Scroll down to the Login Section. Input data from OpenLM Identity Service, including the sign-in and sign-out redirect URLs**.** Click **Save.  
   **![Screenshot 5: OpenLM on-premise configuration](/img/legacy/word-image-41990-10-5.png)****
9. Go to the Identity Service webpage. Log out. Now you will be able to log in with OKTA:![Screenshot 6: OpenLM on-premise configuration](/img/legacy/word-image-41990-11-5.png)

## OpenLM SLMC

If you are an OpenLM SLMC, follow these steps to configure OKTA as an external Identity provider:

1. Navigate to your Cloud Portal instance→Identity&Access Management (IAM)→External Providers→Add Provider.![Screenshot: OpenLM SLMC](/img/legacy/word-image-41990-12-5.png)
2. Input the following details from your Okta account:  
   A. Client ID  
   B. Client Secret  
   C. Authority (example: dev-12345678.okta.com).
3. Provide a public button name (example: Okta).![Screenshot 2: OpenLM SLMC](/img/legacy/word-image-41990-13-5.png)
4. Switch to the Products and Roles tab. For the following products:  
   A. Virtual License Manager  
   B. Software License Management Cloud  
   C. Dongle Monitoring  
   D. OneDirectorySync
5. Choose either an Admin or Manager role.  
   ![Screenshot 3: OpenLM SLMC](/img/legacy/word-image-41990-14-5.png)
6. Click **SAVE**. After the import is completed on the OpenLM Identity&Access Management side, the correct URIs tied to your account will be generated.  
   ![Screenshot 4: OpenLM SLMC](/img/legacy/Cloud-portal.png)
7. Go back to your OKTA account. Click **Edit on the General setting Section.**
8. Scroll down to the Login Section. Input data from the OpenLM Cloud Portal, including the sign-in and signout redirect URLs**.** Click **Save.**
9. Go back to your Cloud Portal and Sign out. Sign - in again using this pattern:  
   [https://cloud.openlm.com/portal?loginAccountId=](https://qa-awslinux-cloud.openlm.com/portal?loginAccountId=285639607)123456789  
   Note: The OpenLM Account ID is taken by clinking on the drop-down arrow in the upper right corner next to your user name:  
   ![Screenshot 5: OpenLM SLMC](/img/legacy/word-image-41990-16-5.png)
