---
title: "OpenLM Roles & Permissions"
sidebar_position: 4
---
## Scope

This document describes the OpenLM Roles & Permissions Groups feature and serves as a reference guide to system administrators who seek intricate grouping and permission granting over their OpenLM-managed licensing control system.

## General

The OpenLM SLM supports a role-based security feature that allows system administrators to implement customized access to OpenLM tools by setting access roles. This feature facilitates the implementation of OpenLM tools for diverse groups; like help desk, system administrators, managers, and developers. The role-based security system secures nearly all the resources of the OpenLM system's entities, such as listed servers, fields and action buttons.

## Identity Service

The OpenLM Identity Service is a multi-layered identity and access management attribute of our license monitoring and management solution.
If your license file doesn't have the Role&Permission feature, Identity Service still has basic Roles to assign users,  and you can edit it only (No Adding, Deleting, or Duplicating).
![Screenshot: Identity Service](/img/legacy/w2xkb_kTJQ4gnZaHb15IbNRqy3YPmFmhi22iUCCg4yv-jL-wRsggUSspawbXlQPieYTgoY3tGRbZpw5ZS4dwmoTCr7jkSqa_VWnI_9kwUYeLmH3GW_RbeUaZ7OtGwxdqGgpKaKcWM6T7V6WFJxP-qkU7Y_Sd1MmmXNBq845241vBCEMXtbzo6_KaI4T3AA.png)
![Screenshot 2: Identity Service](/img/legacy/UMutkzAYUqv0voq6J9GAIWKCtBqDKhvvQcQxnLmQd_udDGZfcVfNEh6x8pFzpzud298GAQNY6Il0RFfkzcOuXlePJQBVGSV8q9tSlMEZld17_whtGsb9DgD8ioFysWOLeDabg7hFUsRl-FqqA4CD0eP0vGMIfwm1C_aM5DDa-6b4jagjKE69FrZ7qR7AZQ.png)
But if your license file has Role&Permission, it can give you the full range and functionality of Roles like the one below.
![Screenshot 3: Identity Service](/img/legacy/bdwQX7Yccv2RcS9U9xlKm3NQjstlqaIisi6mFFByUx9Kz_2emFaKLB1dowZORNS-kkH4d1iW0tQYssCkFIdrJ_FUy9gapCPezO7p9rS57gt6GHkikol8iAlVfQbVFB-MHBcy0zm2mpBYOawkUeXdbolDlqYHKqWiwo9ps7A3aUBGxGM0i17MUT1idu6eVA.jpg)
Consult with our Sales at [sales@openlm.com](mailto:sales@openlm.com)for finding out about the full spectrum  functionalities.
The first default account is Admin in Identity Service. But if you want to create a new user, follow the below steps.

### Creating a new user

1. Create a User Account in Easyadmin User Interface.
   ![Screenshot: Creating a new user](/img/legacy/JT1TXrJzIZnyJMArXvTwMy1627bY5MPCen3PXEW2yvL-GAYbx863x8dcBRkXw4gnx8EDvs8eTJVzyRd8S27anPL6U8OpZmUB0E3htz1Klwu7E6ob11ihHr06_RaOgeQZYpSJAHQCiRrjTI_iH5q2cYxRCbzaLoS3GM_Y_HA-_o558-K5otCXDZJfK__6fA.png)
2. Assign a desired role(s) to the created user.
   ![Screenshot 2: Creating a new user](/img/legacy/FZaTGtoPS6kv77JcBnhb4-xgpYxx6E0RB2njyvcZ9OLYd3zXKoOpx6uR_TQPuCi4PsBgTfdmyllmNeq2KF6f071veeZpkxTyL_8Y328QlJNLNVbwo3ryfWTEtPgV5HHMgHv-35iBWvCPrO_QJtVhxEWjBefGuhlnnZPvj0eLRrpyJ_qOYC857Ti4HTYeuw.jpg)
3. Create the same user in Identity Service with Password.
   ![Screenshot 3: Creating a new user](/img/legacy/Ovp9h2szDhdZkH3jxXssylp8UhjZNtoTQQMXloCT8E-ED90roTZuZtHG74xIhin1kJSQnlqu_rmTsJhefP2bB3iXbeu8z41OgsYE1EsVhPMdYvUkkk2KoriTqpvHDELsiW_W5aYigPtD7YKPs1oJ2vMw3WrH_Os4wf6344VBjp65SZaf-S_wDGjtnfJVFQ.jpg)

![Screenshot 4: Creating a new user](/img/legacy/i6JAOLHySvJBjp0Sncih5HoCRyl22as8MPIeKz7UQKkNb12iaNDzVgWc_6u6x76_C4-QQxXzHdfY1qYsOENOizyrOYZrjQ44dIBYp46eqWmoZGlMuOYS1VIoQgBxnsXJ8qFv_3rQB6QK8kzDgU5_NY8dNagpBDISCxRaBUtiNnctA9JRE6rVpgPIJhwmag.png)
Note:  If you want the user to be able to edit Identity Service settings, activate the System Administrator toggle button.

4. Login to EasyAdmin with the user account.
   ![Screenshot 5: Creating a new user](/img/legacy/wr2QWghdh2soWKknWPiau73U8n-mVsR4mUGD6chM8HevUn8hptbKHa77K4-P7CBJya-5WbXfbLzVNfFk_qA5jmXOR1hQlKz3ObT6EwXNoUOsaybC1p2ys2DmaDO8-w427Hlcb_iMHGVtiwWPJiVLmLm2HJ90HZhK55J0qDEPxSvjZ33Ar6-Luaf9284yLg.png)

Right now, we have to manually add the same user in each EasyAdmin and Identity Service UI. Especially passwords, only the system administrator of Identity Service UI can change it.

## Permissions and roles

Permitting a Resource is the act of granting a certain accessibility level to a certain resource. Each permission is attached to a specific Resource, granting it a permission attribute. Permission attributes may hold either one of the following values:

- Allow: The resource is accessible for a user or a user group.
- Disable: The resource is visible but not accessible for a user or a user group.
- Deny: The resource is neither visible nor accessible to a user or a user group.

A set of such Resource permissions is referred to as a role. Roles are attributed to certain groups of function holders in a company, each group having different accessibility options to OpenLM's resources.
Roles' implementation may be set on, activating the differentiation of users and groups according to permission levels, or turned off altogether, thus granting all users and user groups full accessibility to all the system's resources.
Handling of Roles and permissions is easily done by system administrators on the EasyAdmin administrative interface of the OpenLM system. The intuitive EasyAdmin control panel incorporates all the options required to configure the Roles and permissions groups according to administration requirements.

## Role inheritance

Permission groups possess an inheritance property. This property facilitates the application of similar permission schemes to different groups. By doing so, different groups may be easily created with only slight differences between their permission schemes.

## Creating a new role

In order to create a new role, go through the following steps:
1.  Open the EasyAdmin User Interface, and log in with the Administrator's name and password.
2. First, your organization's SMTP server has to be configured. Simply open up the OpenLM User Interface → **Click Start** → **Select Administration** → **Click on Email/SMS -> Fill in your organization's SMTP Sever details -> Send Test Email -> Save**.
2. The Roles need to be created using OpenLM Administrator privileges, and duplicated in the Identity Service.
4. Click the Start button on the EasyAdmin control panel. Select Administration → Roles tab. The Administration-Roles window appears, with some predefined default roles and their description.
![Screenshot: Creating a new role](/img/legacy/pPbQ58wPjueeM1K2wAiN9KQh_UTOR9JOqByOWAFdHRNIHkFFGogWhbel8ltGZc7_fpPBtVotRDXls9egmAEOD6vuw2igTzAWCHusy76v29MwONa4V-x-7HbBTU3k5KVMAz-iZBYBoSUSYztickkIfBpxrZi7FDcFBs5pfZxc6lg9Pa9QGx_vOD3v6AESkw.png)
5. Click the Add icon, to add a role. The Role Details dialog window appears.  Type in the role name and description (for example, "HelpDesk" and "Help Desk Team" as they appear respectively in the image above). Click Save. Note that the new role name would be saved in lower-case format (that is, "helpdesk").
![Screenshot 2: Creating a new role](/img/legacy/s-qVthEJ8JzGLV15olv6pQOgzBCkRH_mW12uvNv5pp1O1yJ5MCGotRzrzs2OmVN1kMIt4O5op2J6046QpLwXEYcQLg0yHSwxYG9uhyotvSyyzp4loAqMR6ZkijFyIOmTyqy9OVIAsgYLqRMyQJpGoNrcABr7fFM_2eqPX6GMbyGRWDnt1voO-xhIqfpNvA.png)
Type in the role name and description (for example, "HelpDesk" and "Help Desk Team" as they appear respectively in the image above). Click Save. Note that the new role name would be saved in lower-case format (that is, "helpdesk").

## Adding resources to a role

Adding resources to the newly created role may be done in either one of two methods. The 1st is by manually selecting Resources and attaching them to the new role:
1. In the Roles window, Select the required role, for example, "helpdesk". Click the "Edit" icon. The "Role Details for helpdesk" window appears (Similar to the "Role Details" dialog window depicted above). Note that the default predefined roles may not be edited.
2. Select the Resources tab, and click the Add button. The "Resources Search" dialog box appears. Note that each line in this table contains a Resource name and description, easing the linkage between a registry in the table and its actual function in the OpenLM system.
![Screenshot: Adding resources to a role](/img/legacy/gGuYbkSlRE7vYh88Qezuw46pj-IpcIgW6VTTYfWvBLwCcvTDxKpjnmbIg3Ma2HajxHJADeTt8trSgcNn1dGwlhPO9vRg_iw47U5hHw2smib6UQR1H4Qs2_B23l5DIYBYHOjGp6q7bqd_i-dqbjOsag6WgELCK-wHQhfa7A-vi4_6ZDDdspdmh0aDV7qm7Q.png)
3. Select a resource (for example, the add\_project), and click the Select button. The "Role Details" window's Resources tab now appears with the newly attached "add\_project" resource.
4. Select the Resources tab and click on any line while under the Permission heading. The drop-down functionality is engaged and the user may now select a permission attribute for a resource per user.
![Screenshot 2: Adding resources to a role](/img/legacy/e8-HhyVTAhHlI-NS3XV_2AmsLwlz-Wm8pC_YE67SX3EqpLTfPtsHDjXOHY1FB0No59okTgp5u7cMvYEou11ZbXvysoWYhXzjtlybJlg5WoFh9_o2SZyWhWmiL9p5UcKtzhuSe2atbtvbqTj4AlnsbFCQ5caqd-Rd7JMBQCa0bdpulEnRHFyKH7jrMrVDsQ.png)

## Adding resource permissions through inheritance property

1. In the "Role Details for helpdesk" dialog window, select the "Parent Roles" tab and click the Add icon. The Roles search dialog window appears.
![Screenshot: Adding resource permissions through inheritance property](/img/legacy/Bv13_NUVnFNFjbI1z5W3Voh1dzcxgl_9_EKtFv2jOXg9-hzd1_N3fKCIFgENX874nmq5aAkeNOxmdZAqFevXSYIjlgZvobki6xu5jojtP4JYI4WMKt1T1BPaX0Oj9hWfzupXwkHiy1g698h8UbS3N0mlq-KFT1iKJiyxIbtxp4s7eXAN93v_aKVeKfmjrw.png)
2. Select the role that would serve as the parent of the newly created "helpdesk" role, for example, "admin\_role" in the image above, and click the Select button. Note that the "admin\_role" is the default basic role, and is always apparent for serving as a parent role. The new "helpdesk" role now possesses all the permission attributes of the parent "admin\_role".

## OpenLM users

In order to assign roles to users, we should first make sure such users exist in the OpenLM database. The list of users is shown in the EasyAdmin 'Start' → "Users & Groups" → "Users" tab.
Users can be added to the OpenLM database in a number of ways:
1. By synchronizing the OpenLM database with the organization's Active Directory, by using the OpenLM Directory Sync.
2. Through monitoring of license usage.
3. By reading the FlexLM License file
4. [By reading the FlexLM Options file](../options-files/options-file-management-using-openlm-easyadmin-kb4007.md)
5. Manually created, as described in the following section.

### Manually creating a new user entry

To manually create a new user entry in EasyAdmin, go through the following steps:
1. Follow this path, **EasyAdmin Start→ Users & Groups → Users tab**. The Users window appears.
2. Click the Add User button. The User details form appears. Fill in the appropriate information items, check the Enabled box, and click Save as depicted below.
![Screenshot: Manually creating a new user entry](/img/legacy/l1twkHLD3d8SngxD12gA5COnbsZIV-hkCmLP27-eWPrhaFGp7x7LxpgnjJyZOD4JSz7Jh60nXreRcrtOEla5KFPhRNyAIwywmwO3gTpDp4G5j7B6UGC2kaVBnefqL_9f1lqzobxZ8c3xGYAAsj-xpBUsSvXTqgqZ7ZSCFYow_OeFglhA3051AeftTrD35g.png)

### Manually adding a user to a group

Users can be made members of a group by either:
1. Synchronizing the OpenLM database with the organization's Active Directory. See Directory Sync documentation for more information.
2. Manually, as described in the following steps:
a. Follow this path: **EasyAdmin Start→ Users & Groups → Groups**. The Groups window appears.
b. Select a group from the Group window (for example, "GroupName"), and click the **Members** icon to view the members of the selected group. The Users in Group Name window appears.
c. Click the **Add** icon, to add further users to Group Name's list of users.

## Assigning roles to a user or group of users

After establishing a new role of permissions and introducing a new user or group of users, it is now possible to attach this role to the users, to assign the role's permission set to these users.
To do so:
1. Follow this path: **EasyAdmin Start→ Administration → Roles**.
2. Select the new role (for example, "helpdesk"), The Role details for help desk" dialog window appears.
3. Click the Users or Groups buttons on the bottom of the window. The appropriate window (that is, the Users in the helpdesk or Groups in the help desk) appears.
4. Click the Add icon. The appropriate window (User search or Groups) appears. Select the required instance of the user or group, and click the Select icon. The added user or Group instance has been added to the role, and may be seen there in the Users in the help desk or Groups in the help desk window.

## Changing a resource's permission attribute

To change a Resource's permission attribute, for example, to deactivate accessibility to this Resource by a certain role, follow this procedure:
1. Follow this path: **EasyAdmin Start→ Users and Groups→ Workstations**. In this example - this would be the affected Resource.
2. Follow this path: **EasyAdmin Start -> Administration→ "Roles" tab**.
3. Select a specific role, for example, "helpdesk". Click the **Edit** button. The Role details for the helpdesk dialog window appear.
4. Select the **Resources** tab and click the **Add** icon.
5. Select a resource, for example, **"control\_panel\_menu\_workstations"** as depicted, and click Select. The control\_panel\_menu\_workstations resource is added to the Role details for the helpdesk dialog window
6. Stand and click on the **Permission** attribute of that Resource. A drop-down list appears. Click the drop-down list, and select the required permission attribute value, for example, Disable.
7. Click the **Save** icon, close, and reopen the OpenLM EasyAdmin UI.
8. Click the **Start** button on the EasyAdmin control panel. Select the **Users & Groups tab**. Notice that the Workstation is no longer visible. It has been removed from the admin\_role view.

## License server resource visibility

If the permission of a Resource entry whose name starts with the word "server\_\*" is disabled or denied, the respective user groups would become unable to view items on that server. Moreover, that server would become omitted from the Workstation Agent  "License usage information" window.
The following is an administrator Frequently Asked Question: "Why is all license usage information on the Agent blocked whenever an admin account is created in the OpenLM SLM Configuration window?" The answer is that when permissions are activated, users need to be assigned a set of permissions that would allow them to view license servers' details. To achieve this, follow this action list:
1. Uncheck, and then recheck the **Require Login Credentials** checkbox. Follow the Creating a New Role section above.
2. Assign resources to the new role: After you save the new role, the Resources tab will become activated. Navigate to that tab. Note that it is assigned with one default resource. Now you need to add all resources that have this name pattern "server\_servername" for example, server\_srv1 (where srv1 is the name of the server that you will grant access to). To do so, Follow the description in the section Adding resources to a role above.
3. Assign the new role to the admin user: To do so, Follow the description in the section Assigning roles to a user or group of users above.

## Permission arbitration

Using the permissions tool, it is possible to grant resource permissions to single users independently. Also, as stated earlier, permissions may be inherited from parent roles. If one method grants permission and the other denies it, a mismatch condition may be present. In this case - an arbitration procedure runs; The closest entity to a single user, that is, a permission attribute granted to an individual user, or to the "youngest child" of an inherited attribute is the most "powerful". If two contradicting attributes of the same strength are applied: an unknown condition may occur.
For example, picture the following circumstance:

- The admin role is parent to two roles: Role1 and Role2.
- Admin denies permission to a resource.
- Role1 does not explicitly refer to that resource, hence - it denies it implicitly.
- Role2 explicitly allows the resource permission.

User attributes:

- If the User is attached to any one single role, its permission attributes will be the same as that of the role.
- If the User is attached to roles Admin and Role1 the permission will be denied.
- If the User is attached to Role1 & Role2, the permission would be allowed, since Role2 is the "youngest child" to infer to that resource.
- If the User is attached to roles Admin and Role2, an unknown condition occurs.

## List of resources

The following is an available list resources:

|  |  |
| --- | --- |
| NAME | DESCRIPTION |
| currently\_consumed\_licenses\_column\_close\_application | Currently Consumed Licenses Panel - Permission to close applications |
| currently\_consumed\_licenses\_column\_remove\_license | Currently Consumed Licenses Panel - Permission to remove licenses |
| currently\_consumed\_licenses\_column\_username | Currently Consumed Licenses Panel - Show User Name column |
| configuration\_form\_read | Permission to open OpenLM SLM Configuration" tool" |
| configuration\_form\_update | Permission to make updates in the OpenLM SLM Configuration" tool" |
| control\_panel\_menu\_currently\_consumed\_licenses | Control Panel - Show Currently Consumed Licenses" (under "Operational" menu)" |
| control\_panel\_menu\_change\_password | Control Panel - Show Change Password" in "Start" menu" |
| control\_panel\_menu\_denials | Control Panel - Show Denials" (under "Reports" menu)" |
| control\_panel\_menu\_features | Control Panel - Show Features"  (under "Option Files" menu)" |
| control\_panel\_menu\_group\_usage | Control Panel - Show Group Usage" (under "Reports" menu)" |
| control\_panel\_menu\_groups | Control Panel - Show Groups" (under "Users & Groups" menu)" |
| control\_panel\_menu\_host\_groups | Control Panel - Show Host Groups" (under "Option Files" menu)" |
| control\_panel\_menu\_ips | Control Panel - Show IPs" (under "Option Files" menu)" |
| control\_panel\_menu\_license\_activity | Control Panel - Show License Activity"  (under "Reports" menu)" |
| control\_panel\_menu\_license\_usage | Control Panel - Show License Usage" (under "Reports" menu)" |
| control\_panel\_menu\_licenses | Control Panel - Show Licenses" (under "Management" menu)" |
| control\_panel\_menu\_logout | Control Panel - Show Logout" in "Start" menu" |
| control\_panel\_menu\_management | Control Panel - Show Management" (include: "Licenses", "Licenses Not In Use", "License Utilization", "License Procurement", "Audit Report" and "Active Users Report")" |
| control\_panel\_menu\_option\_files | Control Panel - Show Options Files"  (include:  "IPs", "Host Groups" and "Options Files Management")" |
| control\_panel\_menu\_policy | Control Panel - Show Policy" (under "Option Files" menu)" |
| control\_panel\_menu\_project\_usage | Control Panel - Show Project Usage" (under "Reports" menu)" |
| control\_panel\_menu\_released\_licenses | Control Panel - Show Released Licenses"  (under "Operational" menu)" |
| control\_panel\_menu\_reports | Control Panel - Show Reports" (include: "Project Usage", "Group Usage", "License Usage", "License Activity", "Denials")" |
| admin\_panel\_roles | Administration Panel - Show Roles"" |
| control\_panel\_menu\_users | Control Panel - Show Users" (under "Users & Groups" menu)" |
| control\_panel\_menu\_users\_permissions | Control Panel - Show Users & Groups" in "Start" menu (include: "Users", "Groups", "Workstations")" |
| control\_panel\_menu\_workstations | Control Panel - Show Workstations" (under "Users & Groups" menu)" |
| control\_panel\_tab | Basic permission to open OpenLM User Interface"" |
| user\_change\_password | Permission to change other user's password |
| control\_panel\_menu\_administration | Permission to configure administration actions |
| add\_user | Permission to add a new user |
| edit\_user | Permission to edit an existing user |
| add\_group | Permission to add a new group |
| edit\_group | Permission to edit an existing group |
| delete\_group | Permission to delete an existing group |
| view\_group\_members | Permission to view group members |
| add\_group\_members | Permission to add group members |
| remove\_group\_members | Permission to remove group members |
| add\_role | Permission to add a new role |
| edit\_role | Permission to edit an existing role |
| delete\_role | Permission to delete an existing role |
| duplicate\_role | Permission to duplicate an existing role |
| add\_parent\_role | Permission to add a parent role |
| delete\_parent\_role | Permission to delete a parent role |
| add\_role\_resource | Permission to add a resource to a role |
| delete\_role\_resource | Permission to delete a resource from a role |
| add\_role\_user | Permission to associate a user with a role |
| remove\_role\_user | Permission to remove a user from a role |
| add\_role\_group | Permission to add a group to a role |
| remove\_role\_group | Permission to remove a group from a role |
| control\_panel\_menu\_project\_list | Control Panel - Show Projects List" (under "Management" menu)" |
| add\_project | Permission to add a project |
| delete\_project | Permission to delete a project |
| edit\_project | Permission to edit a project |
| add\_project\_members | Permission to add project members |
| add\_project\_groups | Permission to add project groups |
| enable\_project | Permission to activate projects |
| disable\_project | Permission to deactivate projects |
| remove\_project\_members | Permission to remove project members |
| remove\_workstation | Permission to remove workstations |
| remove\_project\_groups | Permission to remove project groups |
| control\_panel\_menu\_general\_statistics | Control Panel - Show General Statistics" (under "Widgets" menu)" |
| control\_panel\_menu\_license\_servers | Control Panel - Show License Servers" (under "Widgets" menu)" |
| control\_panel\_menu\_alerts | Control Panel - Show Alert" (under "Widgets" menu)" |
| control\_panel\_menu\_feature\_usage\_status | Control Panel - Show Feature Usage Status" (under "Widgets" menu)" |
| control\_panel\_menu\_license\_procurement | Control Panel - Show License Procurement" (under "Management" menu)" |
| license\_servers\_administer\_host | Permission to start, stop, reread servers, and reset the Broker |
| control\_panel\_menu\_license\_not\_in\_use | Control Panel - Show License not in use" (under "Management" menu)" |
| enable\_or\_disable\_users | Permission to activate or deactivate users |
| delete\_history | Permission to delete historical data |
| control\_panel\_menu\_all\_features | Control Panel - Show All Features" (under "Option Files" menu)" |
| control\_panel\_menu\_recent\_feature\_denials | Control Panel - Show Recent Feature Denials" (under "Widgets" menu)" |
| control\_panel\_menu\_license\_utilization | Control Panel - Show License Utilization" (under "Management" menu)" |
| control\_panel\_menu\_license\_usage\_heatmap | Control Panel - Show License Usage Heatmap"" |
| enable\_or\_disable\_groups | Permission to activate or deactivate groups |
| currently\_consumed\_licenses\_column\_workstation | Currently Consumed Licenses Panel - Show Worksation column |
| license\_activity\_column\_workstation | License Activity Panel - Show Workstation column |
| license\_activity\_column\_username | License Activity Panel - Show User Name column |
| control\_panel\_menu\_operational | Control Panel - Show Operational" (include: "currently consumed licenses", "Released licenses")" |
| control\_panel\_menu\_widgets | Control Panel - Show Widgets" (includes: "License Servers", "License Usage Heat Map", "Host Availability", "General Statistics", "Alerts", "Recent Features Denials", "Features Usage Status", "Selected Feature Statistics")" |
| control\_panel\_menu\_host\_availability | Control Panel - Show Host Availability" (under "Widgets" menu)" |
| control\_panel\_menu\_audit\_report | Control Panel - Show Audit Report" (under "Management" menu)" |
| control\_panel\_menu\_active\_users\_report | Control Panel - Show Active Users Report" (under "Management" menu) " |
| control\_panel\_menu\_user\_settings | Control Panel - Show User Settings" in "Start" menu" |
| currently\_consumed\_licenses\_column\_host\_id | Currently Consumed Licenses Panel - Show Host Id column |
| currently\_consumed\_licenses\_column\_first\_name | Currently Consumed Licenses Panel - Show First Name column |
| currently\_consumed\_licenses\_column\_last\_name | Currently Consumed Licenses Panel - Show Last Name column |
| currently\_consumed\_licenses\_column\_phone\_number | Currently Consumed Licenses Panel - Show Phone Number column |
| currently\_consumed\_licenses\_column\_email | Currently Consumed Licenses Panel - Show Email column |
| currently\_consumed\_licenses\_column\_start\_time | Currently Consumed Licenses Panel - Show Start Time column |
| currently\_consumed\_licenses\_column\_ip | Currently Consumed Licenses Panel - Show IP column |
| currently\_consumed\_licenses\_column\_duration | Currently Consumed Licenses Panel - Show Duration column |
| currently\_consumed\_licenses\_column\_borrowed | Currently Consumed Licenses Panel - Show Borrowed column |
| currently\_consumed\_licenses\_column\_linger\_time | Currently Consumed Licenses Panel - Show Linger Time column |
| currently\_consumed\_licenses\_column\_linger\_due | Currently Consumed Licenses Panel - Show Linger Due column |
| currently\_consumed\_licenses\_column\_recent\_application\_idle\_period | Currently Consumed Licenses Panel - Show Recent Application Idle Period column |
| currently\_consumed\_licenses\_column\_workstation\_idle\_time | Currently Consumed Licenses Panel - Show Workstation Idle Time column |
| currently\_consumed\_licenses\_column\_idle\_times | Currently Consumed Licenses Panel - Show Idle Times column |
| license\_activity\_filter\_workstation | Permission To Run Filter On License Activity By Workstation |
| license\_activity\_filter\_user | Permission To Run Filter On License Activity By User |
| license\_activity\_column\_first\_name | License Activity Panel - Show First Name column |
| license\_activity\_column\_last\_name | License Activity Panel - Show Last Name column |
| license\_activity\_column\_ip | License Activity Panel - Show IP column |
| license\_activity\_column\_host\_ids | License Activity Panel - Show Host Ids column |
| denials\_filter\_workstation | Permission To Run Filter On Denials By Workstation |
| denials\_filter\_user | Permission To Run Filter On Denials By User |
| denials\_column\_user\_name | Denials Panel - Show User Name column |
| denials\_column\_first\_name | Denials Panel - Show First Name column |
| denials\_column\_last\_name | Denials Panel - Show Last Name column |
| denials\_column\_workstation | Denials Panel - Show Workstation column |
| add\_project\_members\_groups | Permission to add members groups to a project |
| remove\_project\_members\_groups | Permission to remove members groups to a project |
| view\_unmanaged\_processes | Permission to view unmanaged processes (under Administration" menu)" |
| edit\_unmanaged\_processes | Permission to edit unmanaged processes |
| license\_activity\_column\_email | License Activity Panel - Show Email column |
| view\_system\_messages | Permission to view system messages |
| license\_usage\_filter\_user | Permission to run filter on License Usage by Users |
| view\_dashboard | Permission to view the Dashboard |
| view\_router\_monitoring | Permission to view the Router Monitoring |
| control\_panel\_menu\_feature\_usage\_per\_group | Control Panel - Show Feature Usage per Group" (under "Reports" menu)" |
| control\_panel\_menu\_feature\_usage\_per\_user | Control Panel - Show Feature Usage per User" (under "Reports" menu)" |
| license\_servers\_upload\_license\_file | Allows to upload license file in License Servers -> Files window |
| scheduling\_reports\_show\_all | Show Scheduling Reports from all users |
| scheduling\_reports\_show | Using Scheduling Reports |
| denials\_column\_email | Denials Panel - Show Email column |
| license\_servers\_show\_candidates | Show candidate servers in License Servers" window" |
| add\_workstation | Permission to add workstations |
| view\_token\_flex\_reports | Permission to view Token Flex reports |
| control\_panel\_menu\_named\_license\_analysis | Control Panel - Show Named License Analysis (NNU)" report  (under "Reports" menu)" |
| currently\_consumed\_licenses\_filter\_user | Permission to filter by Users in Currently Consumed Licenses report |
| currently\_consumed\_licenses\_filter\_workstation | Permission to filter by Workstations in Currently Consumed Licenses report |
| currently\_consumed\_licenses\_column\_group | Currently Consumed Licenses Panel - Show Group Name column |
| currently\_consumed\_licenses\_column\_project | Currently Consumed Licenses Panel - Show Project Name column |
| currently\_consumed\_licenses\_column\_vendor | Currently Consumed Licenses Panel - Show Vendor Name column |
| currently\_consumed\_licenses\_column\_server | Currently Consumed Licenses Panel - Show Server Name column |
| currently\_consumed\_licenses\_column\_feature | Currently Consumed Licenses Panel - Show Feature Name column |
| currently\_consumed\_licenses\_column\_product\_name | Currently Consumed Licenses Panel - Show Product Name column |
| currently\_consumed\_licenses\_column\_version | Currently Consumed Licenses Panel - Show Version column |
| currently\_consumed\_licenses\_column\_additional\_key | Currently Consumed Licenses Panel - Show Additional Key column |
| currently\_consumed\_licenses\_column\_license\_type | Currently Consumed Licenses Panel - Show License Type column |
| currently\_consumed\_licenses\_column\_handle | Currently Consumed Licenses Panel - Show Handle column |
| currently\_consumed\_licenses\_column\_total\_licenses | Currently Consumed Licenses Panel - Show Total Number of Licenses column |
| currently\_consumed\_licenses\_column\_consumed\_tokens | Currently Consumed Licenses Panel - Show Consumed Tokens column |
| view\_token\_flex\_released\_idle\_licenses | view\_token\_flex\_released\_idle\_licenses |
| license\_servers\_admin\_read | Permission to read License Server |
| license\_servers\_admin\_update | Permission to update License Server |
| view\_license\_files | View License Files |
| edit\_license\_files | Edit License Files |
| server\_OpenLM reusable tokens | Display data of server OpenLM reusable tokens over any panel in OpenLM User Interface"" |
| admin\_server\_OpenLM reusable tokens | License Servers Panel - Permission to Stop/Start/Reread server OpenLM reusable tokens |
