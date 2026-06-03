---
title: "How to set up Personal Dashboard authentication"
description: "Note: this feature is available in v22.4 and above, together with OpenLM SLM and Identity Service v22.4 By activating user authentication, all Personal."
sidebar_position: 2
---

**Note: this feature is available in v22.4 and above, together with OpenLM SLM and Identity Service v22.4**  
By activating user authentication, all Personal Dashboard users will be able to log into the system using one of the supported providers (like OKTA, Windows Authentication, AzureAD, and so on) or by using the credentials created in OpenLM Identity Service.

Creating authorization file for the End-User Sevices:

1. Open up the **EasyAdmin** → **Administration** → **System&Security** → **Security** →**Authorization**. Select **ADD**.
2. From the **Type** dropdown list, select **End-User Services**.
3. Type in a description in the **Description** field.
4. Provide the End-User Services URL in the following format: **protocol://hostname:port**.
5. **Select Save**.
6. A pop-up window will appear, notifying that the secret key will only be displayed once. Select OK. (**Check** the ***Don't show this message again if needed***).
7. Once the Secret Key is displayed, select the **Download** button.
8. Go to C:Program FilesOpenLMEnd-User Services and replace the existing JSON Authorization file with the newly created one.
9. Restart the End-User Services Service.
10. Go to **EasyAdmin** → **Administration** → **Roles.** Double-click the **admin\_role** row → **Users** → **Add** then **Select a** username (s).
11. Go back to the Personal Dashboard and refresh the page. A new tab will appear -  **Settings.**
12. Check the **Enable user authentication** box then select **Save.**  A pop-up window will appear, notifying that the service restart is required. Select **OK** to close it then restart the End-User Services service.Now the user can use the EasyAdmin credentials to authenticate.

**![Graphical user interface Description automatically generated with medium confidence](/img/legacy/graphical-user-interface-description-automaticall.png)**
