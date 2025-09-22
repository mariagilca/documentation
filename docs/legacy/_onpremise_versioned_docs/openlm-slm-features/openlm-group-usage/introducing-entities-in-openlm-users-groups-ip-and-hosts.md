---
title: Introducing Entities in OpenLM - Users, Groups, IP, and Hosts
sidebar_position: 1
description: Guide to understanding and managing entities in OpenLM, including users, groups, IPs, and hosts.
---

## Scope
OpenLM monitors license usage based on users and user groups and applies license usage constraints via Options File management. This document discusses the different entity types that OpenLM relates to, including users, user groups, hosts, host groups, and IPs. It also explains their roles and how to introduce them into the OpenLM database.

## Users
There are four methods for introducing new users to the OpenLM database:

## Active license usage: 
Users are automatically added to the database when they check out a license for the first time.

## Manually: 
You can add new users through the EasyAdmin User Interface.

Directory synchronization: You can synchronize users from your company's Active Directory (LDAP).

Options File reading: User information can be imported from a FLEXlm (FlexNet Publisher) Options file.

Manually introducing new users
Open the OpenLM EasyAdmin web application.

Go to Start → Users & Groups → Users.

Click Add User, enter the required data, check Enabled, and click Save.

!(img/openlm-easyadmin-add-user-interface.png)

Synchronizing users with Active Directory
For current versions of OpenLM, refer to the Directory Synchronization – Comprehensive Guide.

Importing from an options file
FLEXlm (FlexNet Publisher) Options files provide granular control over license usage parameters. You can dedicate, deny, or reserve features for specific users or groups of users, as well as hosts, IPs, and host groups.

For more information, see Options File Management Using OpenLM EasyAdmin.

Groups
User groups can be introduced into the OpenLM database via three methods:

Manually adding a user group through the EasyAdmin User Interface.

Synchronizing with your company’s Active Directory service.

Reading an Options File.

:::note

Users can be members of several groups. Each user is assigned a default group.

OpenLM attributes the entire usage time of a user to their default group.

If a user is only a member of a single group, that group is considered their default group.
:::

Manually introducing new user groups
Open the OpenLM EasyAdmin web application.

Go to Start → Users & Groups → Groups.

Click Add Group, enter a Group Name, and click OK.

!(img/openlm-easyadmin-add-group-window.png)

From the Groups window, highlight the newly created group (e.g., my_group) and click the Members icon to add new members. The Users in my_group window will open.

Select users from the Users search window and click Add to move them to the Users in my_group list.

!(img/openlm-easyadmin-add-members-to-group.png)

Introducing groups via active directory synchronization
This is discussed in the Directory Synchronization – Comprehensive Guide, specifically in the "Group Rules tab" section. You can set a user’s default group via the DSS configuration interface.

Options file reading
You can also import groups and group members via Options File reading, as discussed in the Options File Management Using OpenLM EasyAdmin document.

Applying options file restrictions to IP ranges
You can control license usage for specific computers by applying constraints to IP addresses or a range of IP addresses. For example, typing the IP 123.123.123.* applies the constraints to all user IPs in the range of 123.123.123.0 through 123.123.123.255.

Add a specific IP
Open the EasyAdmin web application.

Go to Start → Option Files → IPs.

Click the Add button. The Add IP window will open.

Enter the IP address in the text box.

Add a range of IPs
On the EasyAdmin web application, go to Start → Option Files → IPs.

Click the Add button.

In the text box, enter the IP range (as explained above).

!(img/openlm-easyadmin-add-ip.png)

Applying options file restrictions to hosts and host groups
Hosts can be introduced into the OpenLM database via:

Options file reading

LDAP synchronization

Manual entry into the Options file editor

About host groups
You can create custom groups of virtual machine hosts to group them in meaningful ways, such as by branch office. Host groups can also be used to reserve resources for the host operating system.

Open the EasyAdmin web application.

Go to Start → Option Files → Host Groups. The Host Groups window opens.

Click the Add button to add a new Host group (e.g., test test test).

Select the new group and click the Members icon. The Members of test test test window opens.

Select the computers you want to group and click Select. The new host group is ready to use.

!(img/openlm-easyadmin-add-host-group-members.png)

Referenced Images
img/openlm-easyadmin-add-user-interface.png

img/openlm-easyadmin-add-group-window.png

img/openlm-easyadmin-add-members-to-group.png

img/openlm-easyadmin-add-ip.png

img/openlm-easyadmin-add-host-group-members.png