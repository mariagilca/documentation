---
title: "Introducing Entities in OpenLM - Users, Groups, IP and Hosts"
date: "2023-11-05T21:09:46"
permalink: "https://www.openlm.com/docs/openlm-slm-features/openlm-group-usage-configuration/introducing-entities-in-openlm-users-groups-ip-and-hosts/"
posttype: "manual_documentation"
id: "6677"
---

<h2>Scope</h2>
OpenLM monitors license usage according to users and user groups. It can also be utilized to apply license usage constraints via Options file management.

This document discusses the different entity types that OpenLM relates to Users, User groups, Host, Host groups, and IPs.

It briefly explains their roles and methods of introduction to the OpenLM DB.
<h2><a id="post-26336-_xi3oz0ypfjmn"></a>Users</h2>
There are four methods of introducing new users to the OpenLM database:
<ul>
 <li>Active license usage: when a user checks out a license</li>
 <li>Manually through the EasyAdmin User Interface web application.</li>
 <li>Synchronizing with a company’s Active directory</li>
 <li>Options File Reading</li>
</ul>
 
<h3><a id="post-26336-_z9utcanm9wqd"></a>Active users</h3>
Once a user checks out a license for the first time, they automatically become an<strong> Active User</strong>. All information is recorded and stored and the System Administrator can gauge usage and ownership of software in the future.
<h3><a id="post-26336-_ovnlb488iupx"></a>Manually introducing new Users</h3>
The manual method of adding users and groups is through EasyAdmin’s<strong> Users & Groups </strong>menu.
<ol>
 <li>Open the OpenLM EasyAdmin web application.</li>
 <li>Click <strong style="font-size: 16px;">Start → Users & Groups → Users</strong><span style="font-size: 16px;">.</span></li>
 <li>Click <strong style="font-size: 16px;">Add User</strong><span style="font-size: 16px;"> and insert the required data, Check </span><strong style="font-size: 16px;">Enabled</strong><span style="font-size: 16px;">, and then click </span><strong style="font-size: 16px;">Save</strong><span style="font-size: 16px;">.</span></li>
</ol>
<img class="wp-image-39179" src="https://www.openlm.com/wp-content/uploads/2017/02/word-image-26336-1-1.png" />
<h3><a id="post-26336-_zavrywz2lh5w"></a>Synchronizing Users with the Organization’s Active Directory (LDAP)</h3>
To import users via directory synchronization, refer to the following Application notes:

For current versions of OpenLM, use the Directory Synchronization components:

<a href="https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/">Directory Synchronization – Comprehensive Guide</a>
<h3><a id="post-26336-_q3x7epuhpi1"></a>Importing information from an Options file</h3>
FLEXlm (FlexNet publisher) Options files grant license administrators close control over various operating parameters within the constraints of the license model. Licensed features can be dedicated, denied, or reserved to users or groups of users, as well as Hosts, IPs, and Host Groups according to the Options file setting.

Read more about it in this document:

<a href="https://www.openlm.com/knowledge-base/options-file-management-using-openlm-easyadmin-kb4007/">Options File management Using OpenLM EasyAdmin</a>

 
<h3><a id="post-26336-_4ujo003wl2fz"></a>Groups</h3>
User groups may be imported into the OpenLM DB through one of the following:
<ul>
 <li>Manually adding a user group through the EasyAdmin User Interface web application.</li>
 <li>Synchronizing with a company’s Active Directory service.</li>
 <li>Options File reading.</li>
</ul>
<strong>Note:</strong>
<ul>
 <li>Users may be members of several groups. Each user is assigned a default user group.</li>
 <li>OpenLM attributes the entire usage time of a specific user to the user’s default group.</li>
 <li>Users who are only members of a single group – that group will be regarded as their default group.</li>
</ul>
 
<h3><a id="post-26336-_3mlbc6xin1j"></a>Manually introducing new User Groups</h3>
<ol>
 <li>Open the OpenLM EasyAdmin web application.</li>
 <li>Click <strong style="font-size: 16px;">Start → Users & Groups → Groups</strong></li>
 <li>Click <strong style="font-size: 16px;">Add Group</strong><span style="font-size: 16px;"> and Insert the required data, Insert information for the </span><strong style="font-size: 16px;">Group Name</strong><span style="font-size: 16px;">, and click </span><strong style="font-size: 16px;">OK</strong><span style="font-size: 16px;">.
<img class="wp-image-39180" src="https://www.openlm.com/wp-content/uploads/2017/02/word-image-26336-2-1.png" /></span> </li>
 <li>From the <strong style="font-size: 16px;">Groups</strong><span style="font-size: 16px;"> window, highlight the newly created group(a) (e.g.: my_group) and click the </span><strong style="font-size: 16px;">Members</strong><span style="font-size: 16px;"> icon (b) to add new members to the group. The </span><strong style="font-size: 16px;">Users in my_group</strong><span style="font-size: 16px;"> window (c) opens.</span></li>
 <li>The <strong style="font-size: 16px;">Users search</strong><span style="font-size: 16px;"> window will open. Select users from the </span><strong style="font-size: 16px;">Users search</strong><span style="font-size: 16px;"> window and click </span><strong style="font-size: 16px;">Add</strong><span style="font-size: 16px;"> (d) to </span><strong style="font-size: 16px;">Users in my_group</strong><span style="font-size: 16px;">. Repeat this step as often as necessary.</span></li>
</ol>
<img class="wp-image-39181" src="https://www.openlm.com/wp-content/uploads/2017/02/word-image-26336-3-1.png" />
<h3><a id="post-26336-_yydhsoh1us8j"></a>Introducing groups via Active Directory synchronization</h3>
This issue is also discussed in this document:

<a href="https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/">Directory Synchronization – Comprehensive Guide</a> (specifically the “Group Rules tab” section)

Note that it is possible to set a user’s default group via the DSS configuration interface.

 
<h3><a id="post-26336-_117x87ku152"></a>Options file reading</h3>
It is also possible to import Groups and Group members via Options file reading, as already discussed above, and in this application note:

<a href="https://www.openlm.com/knowledge-base/options-file-management-using-openlm-easyadmin-kb4007/">Options File management Using OpenLM EasyAdmin</a>
<h2><a id="post-26336-_r8ky7jlx5tgs"></a>Applying Options files restrictions to IP ranges</h2>
Controlling the license usage of specific computers is made possible by applying constraints to IP addresses. It is also possible to control the license usage of an IP range of computers.

For example, typing in the IP: 123.123.123.* applies the Options File configurations window to be implemented on all user IPs in the range of 123.123.123.0 through 123.123.123.255.
<h3><a id="post-26336-_kkdwczq3tiup"></a>Add a specific IP</h3>
<ol>
 <li>Open the EasyAdmin web application.</li>
 <li>ClickStart → Option Files → IPs</li>
 <li>Click the <strong style="font-size: 16px;">Add</strong><span style="font-size: 16px;"> button, and the </span><strong style="font-size: 16px;">Add IP</strong><span style="font-size: 16px;"> window will open.</span></li>
 <li>In the text box enter the IP address you want to add.</li>
</ol>
<h3><a id="post-26336-_27f75mebspn5"></a>Add a range of IPs</h3>
<ol>
 <li>On the EasyAdmin User Interface web application window.</li>
 <li>Click Start→ Option Files → IPs</li>
 <li>Click the <strong style="font-size: 16px;">Add</strong><span style="font-size: 16px;"> button, and the </span><strong style="font-size: 16px;">Add IP</strong><span style="font-size: 16px;"> window will open.</span></li>
 <li>In the text box enter the IP range you want to add (as explained in the paragraph above).</li>
</ol>
 

<img class="wp-image-39182" src="https://www.openlm.com/wp-content/uploads/2017/02/word-image-26336-4-1.png" />
<h2><a id="post-26336-_qmbah5kmb67"></a>Applying Options files restrictions to Hosts and Host groups</h2>
Hosts may be introduced into the OpenLM DB
<ul>
 <li>Options file reading</li>
 <li>LDAP synchronization</li>
 <li>Manually into the Options file editor (see below)</li>
</ul>
<h3><a id="post-26336-_m55t6ho9fzyh"></a>About Host Groups</h3>
Custom groups of virtual machine hosts may also be created, for grouping hosts and their virtual machines in meaningful ways. For example, you may create a host group for every branch office in your organization. You can also use host groups to set aside resources on hosts in the host group for the use of the host operating system.
<ol>
 <li>Open the EasyAdmin User Interface web application.</li>
 <li>Click <strong style="font-size: 16px;">Start → Option Files → Host Groups</strong><span style="font-size: 16px;">. The Host Groups window opens.</span></li>
 <li>Click the ‘<strong style="font-size: 16px;">Add</strong><span style="font-size: 16px;">‘ button, and add a Host group (e.g.: “test test test”).</span></li>
 <li>Select the newly added group, and click the “Members’ icon. The Members of the “test test test” window opens (see image).
<img class="wp-image-39183" src="https://www.openlm.com/wp-content/uploads/2017/02/word-image-26336-5-1.png" /></li>
 <li>Select the computers that are required for grouping, then click ‘<strong style="font-size: 16px;">Select</strong><span style="font-size: 16px;">‘. The new Host group is ready for use.</span></li>
</ol>
