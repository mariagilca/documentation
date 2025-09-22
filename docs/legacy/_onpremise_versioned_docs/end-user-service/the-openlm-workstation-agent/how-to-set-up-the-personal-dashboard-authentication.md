---
title: How to Set Up Personal Dashboard Authentication
sidebar_position: 2
description: Step-by-step guide to configuring personal dashboard authentication in OpenLM.
---


### Creating an authorization file for End-User Services 🔑

1.  **Open EasyAdmin** and navigate to **Administration → System&Security → Security → Authorization**.
2.  Click **ADD**.
3.  From the **Type** dropdown, select **End-User Services**.
4.  Enter a description and provide the **End-User Services URL** in the format `protocol://hostname:port`.
5.  Click **Save**. A warning will appear; click **OK**.
6.  Click the **Download** button to get the JSON authorization file.
7.  Go to `C:\Program Files\OpenLM\End-User Services` and replace the existing JSON file with the new one.
8.  **Restart the End-User Services service**.

### Configuring user access and authentication ⚙️

1.  In EasyAdmin, go to **Administration → Roles**.
2.  Double-click the **`admin_role`** row, go to the **Users** tab, click **Add**, and select the user(s) you want to grant access.
3.  Go back to the **Personal Dashboard** and refresh the page. A new **Settings** tab will appear.
4.  In the **Settings** tab, check the **Enable user authentication** box and click **Save**.
5.  A pop-up will notify you that a service restart is required. Click **OK** and **restart the End-User Services service** again.

The user can now use their EasyAdmin credentials to authenticate when accessing the Personal Dashboard.
 

 
