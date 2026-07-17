---
title: Introducing entities in OpenLM - users, groups, IP and hosts
description: OpenLM monitors license usage according to users and user groups. It can also be used to apply license usage constraints through Options file.
sidebar_position: 2
---

## Scope

OpenLM monitors license usage according to users and user groups. It can also be used to apply license usage constraints through Options file management.

This document discusses the different entity types that OpenLM relates to Users, User groups, Host, Host groups, and IPs.

It briefly explains their roles and methods of introduction to the OpenLM DB.

## Users

There are four methods of introducing new users to the OpenLM database:

- Active license usage: when a user checks out a license
- Manually through the EasyAdmin User Interface web application.
- Synchronizing with a company's Active directory
- Options File Reading

### Active users

Once a user checks out a license for the first time, they automatically become an **Active User**. All information is recorded and stored and the System Administrator can gauge usage and ownership of software in the future.

### Manually introducing new users

The manual method of adding users and groups is through EasyAdmin's **Users & Groups** menu.

1. Open the OpenLM EasyAdmin web application.
2. Select **Start → Users & Groups → Users**.
3. Select **Add User** and insert the required data, Check **Enabled**, and then select **Save**.

![EasyAdmin Users window with the Add User form for manually adding a user.](/img/legacy/word-image-26336-1-1.png)

### Synchronizing users with the organization's Active Directory (LDAP)

To import users through directory synchronization, refer to the following Application notes:

For current versions of OpenLM, use the Directory Synchronization components:

[Directory Synchronization - Configuration Guide](../../directory-sync/configuration)

### Importing information from an options file

FlexLM (FlexNet publisher) Options files grant license administrators close control over various operating parameters within the constraints of the license model. Licensed features can be dedicated, denied, or reserved to users or groups of users, as well as Hosts, IPs, and Host Groups according to the Options file setting.

Read more about it in this document:

[Options File management Using OpenLM EasyAdmin](../../options-files/options-file-management-using-openlm-easyadmin-kb4007)

### Groups

User groups may be imported into the OpenLM DB through one of the following:

- Manually adding a user group through the EasyAdmin User Interface web application.
- Synchronizing with a company's Active Directory service.
- Options File reading.

**Note:**

- Users may be members of several groups. Each user is assigned a default user group.
- OpenLM attributes the entire usage time of a specific user to the user's default group.
- Users who are only members of a single group - that group will be regarded as their default group.

### Manually introducing new user groups

1. Open the OpenLM EasyAdmin web application.
2. Select **Start → Users & Groups → Groups**
3. Select **Add Group** and Insert the required data, Insert information for the **Group Name**, and select **OK**.  
   ![EasyAdmin Groups window with the Add Group form for entering a group name.](/img/legacy/word-image-26336-2-1.png)
4. From the **Groups** window, highlight the newly created group(a) (for example, my\_group) and select the **Members** icon (b) to add new members to the group. The **Users in my\_group** window (c) opens.
5. The **Users search** window will open. Select users from the **Users search** window and select **Add** (d) to **Users in my\_group**. Repeat this step as often as necessary.

![EasyAdmin Users in group window with the Users search dialog for adding members to a group.](/img/legacy/word-image-26336-3-1.png)

### Introducing groups through Active Directory synchronization

This issue is also discussed in this document:

[Directory Synchronization - Configuration Guide](../../directory-sync/configuration) (specifically the "Group Rules tab" section)

Note that it is possible to set a user's default group through the DSS configuration interface.

### Options file reading

It is also possible to import Groups and Group members through Options file reading, as already discussed above, and in this application note:

[Options File management Using OpenLM EasyAdmin](../../options-files/options-file-management-using-openlm-easyadmin-kb4007)

## Applying options files restrictions to IP ranges

Controlling the license usage of specific computers is made possible by applying constraints to IP addresses. It is also possible to control the license usage of an IP range of computers.

For example, typing in the IP: 123.123.123.\* applies the Options File configurations window to be implemented on all user IPs in the range of 123.123.123.0 through 123.123.123.255.

### Add a specific IP address

1. Open the EasyAdmin web application.
2. ClickStart → Option Files → IPs
3. Select the **Add** button, and the **Add IP** window will open.
4. In the text box enter the IP address you want to add.

### Add a range of IP addresses

1. On the EasyAdmin User Interface web application window.
2. Select Start→ Option Files → IPs
3. Select the **Add** button, and the **Add IP** window will open.
4. In the text box enter the IP range you want to add (as explained in the paragraph above).

![EasyAdmin Add IP window for entering a range of IP addresses under Option Files.](/img/legacy/word-image-26336-4-1.png)

## Applying options files restrictions to hosts and host groups

Hosts may be introduced into the OpenLM DB through the following methods:

- Options file reading
- LDAP synchronization
- Manually into the Options file editor (see the following section)

### About host groups

Custom groups of virtual machine hosts may also be created, for grouping hosts and their virtual machines in meaningful ways. For example, you may create a host group for every branch office in your organization. You can also use host groups to set aside resources on hosts in the host group for the use of the host operating system.

1. Open the EasyAdmin User Interface web application.
2. Select **Start → Option Files → Host Groups**. The Host Groups window opens.
3. Select the '**Add**' button, and add a Host group (for example, "test test test").
4. Select the newly added group, and select the "Members' icon. The Members of the "test test test" window opens (see image).  
   ![EasyAdmin Host Groups window with the Members dialog for adding computers to a host group.](/img/legacy/word-image-26336-5-1.png)
5. Select the computers that are required for grouping, then select '**Select**'. The new Host group is ready for use.
