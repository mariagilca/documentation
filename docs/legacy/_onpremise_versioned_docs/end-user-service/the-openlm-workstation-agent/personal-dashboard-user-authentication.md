---
title: Personal Dashboard User Authentication
sidebar_position: 3
description: Guide to configuring user authentication for the Personal Dashboard in OpenLM.
---
### Enabling User Authentication
To enable user authentication for the **OpenLM Personal Dashboard**, you'll need to configure SSL and update your settings.

1.  Access your Personal Dashboard, navigate to the **Settings → SSL** tab, and provide the path and password for your SSL Certificate.
2.  Restart the **End User Services** service.
3.  If your dashboard wasn't previously SSL-secured, you must generate a new authorization file in the EasyAdmin User Interface at **Start → Administration → System&Security → Security → Authorization → ADD**. Then, replace the old authorization file in `C:\Program Files\OpenLM\End-User Services` and restart the service.
4.  Reopen the Personal Dashboard using the HTTPS address (e.g., `https://fqdn:53555`), go to the **Security** tab, and check the **Enable user authentication** box.
5.  Restart the **End User Services** service again. Users can now authenticate with their EasyAdmin credentials.

***

### Filtering License Managers' Information in the Personal Dashboard
Administrators can control which servers and licenses are visible to users by enforcing **Access Control Lists (ACLs)** through roles.

1.  In the EasyAdmin User Interface, go to **Administration → Roles**.
2.  Click **Add**, provide a name and description for the new role, and click **Save**.
3.  In the **Resources** tab, click **Add** to select the specific servers or features you want this role to see.
4.  Switch to the **Role Details** tab, click **Users → ADD**, and select the user(s) to assign this role.
5.  Go back to **Administration → Roles**, double-click on `agent_query_role`, and in the **Groups** tab, delete the `OpenLM_Everyone` group.
6.  Restart the **OpenLM SLM** and **End-User Services** services.

Personal Dashboard users will now only see the servers specifically assigned to their role.