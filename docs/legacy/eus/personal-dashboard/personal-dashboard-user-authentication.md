---
title: "Personal Dashboard user authentication"
description: "OpenLM documentation: personal dashboard user authentication."
sidebar_position: 3
---

## Activating user authentication

1. Access your Personal Dashboard.
2. Select the **Settings** tab→**SSL**tab and provide the password and the path to the SSL Certificate, then restart the End User Services Service.  
   ![Graphical user interface, application, Teams Description automatically generated](/img/legacy/graphical-user-interface-application-teams-desc-1.png)

**Note:** if previously your Personal Dashboard was not secured with the SSL configuration, make sure you issue a new authorization file at **EasyAdmin User interface**→ **Start** → **Administartion** → **System&Security** →**Security** →**Authorization**→**ADD. Then**go to C:\Program Files\OpenLM\End-User Services and replace the existing authorization file with the newly created one, and restart the End User Services Service.

1. Now reopen your Personal Dashboard with the updated address: **https://fqdn:53555.**
2. Switch to the **SECURITY** tab and check the **Enable user authentication** box.
3. ![Graphical user interface, text, application Description automatically generated with medium confidence](/img/legacy/graphical-user-interface-text-application-descr-1.png)
4. Restart the End User Services Service and, if necessary, refresh the page. We observe that now it is possible to log out from our Personal Dashboard Account:  
   ![Screenshot: Activating user authentication](/img/legacy/word-image-50565-3-1.png)

## How to filter the License Managers' information available in PD

Administrators might want OpenLM Personal Dashboard Users to only see specific servers/licenses and not all of them, as the default setting. For this ACL must be enforced for the Personal Dashboard.

1. Access the **EasyAdmin User Interface**→**Administrtation**→**Roles**. The Roles Window opens.  
   ![Screenshot: How to filter the License Managers' information available in PD](/img/legacy/word-image-50565-4-1.png)
2. Select **Add.**Provide a Role name and description. Select **Save.**
3. After Selecting Save, the **Resources** tab is enabled. Select on it then → **Add.**
4. Select the desired roles:![Screenshot 2: How to filter the License Managers' information available in PD](/img/legacy/word-image-50565-5-1.png)
5. Switch to the **Role Details** tab and select on **Users→ADD:**![Screenshot 3: How to filter the License Managers' information available in PD](/img/legacy/word-image-50565-6-1.png)
6. Select the users to assign this role:  
   ![Screenshot 4: How to filter the License Managers' information available in PD](/img/legacy/word-image-50565-7-1.png)
7. Go back to **Administrtation**→**Roles**and double select on **agent\_query\_role**→**Groups**and delete OpenLM\_Everyone group:  
   ![Screenshot 5: How to filter the License Managers' information available in PD](/img/legacy/word-image-50565-8-1.png)
8. Restart the OpenLM SLM and End-User Service services
9. Now the Personal Dashboard User will only see the servers that have been assigned to them.
