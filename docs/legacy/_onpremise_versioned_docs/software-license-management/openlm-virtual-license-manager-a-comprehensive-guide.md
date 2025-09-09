---
title: "OpenLM Virtual License Manager: A Comprehensive Guide"
date: "2023-11-05T22:04:57"
permalink: "https://www.openlm.com/docs/software-license-management-cloud-registration-and-configuration-guide-slmc/openlm-virtual-license-manager-a-comprehensive-guide/"
posttype: "manual_documentation"
id: "6715"
---

This document is a comprehensive technical guide to the OpenLM Virtual License Manager (VLM). It begins with a detailed explanation of what the Virtual License Manager is, followed by a systematic walkthrough of its functionalities using step-by-step instructions and accompanying screen illustrations.
<h2><a id="post-56627-_eobks05su8id"></a><strong>What is the Virtual License Manager?</strong></h2>
VLM is a cloud software tool that manages and processes licenses for the FlexNet Embedded license manager. Looking ahead, VLM aims to support additional license managers. However, this expansion will be subject to the condition that the license managers provide an external interface, such as APIs or other methods, to retrieve information and allocate licenses to users or devices.

The Virtual License Manager (VLM) currently supports compatibility exclusively with OpenLM Cloud, with plans to introduce an On-Prem version in the future. Given its cloud-based nature, a registered account on the OpenLM Cloud Portal is mandatory.
<h2><a id="post-56627-_2rqte6i5xoj5"></a><strong>VLM User Roles</strong></h2>
VLM has 2 types of roles for users: Admin Role and Manager Role. <strong>
</strong>
<h3><a id="post-56627-_jfntruf46uy6"></a>Admin Role</h3>
<ul>
 <li>A user with an <strong>Admin Role</strong> manages Physical License Managers, Virtual License Managers, Virtual Pools, and users with a Manager Role. It can manage and do the following operations:</li>
 <li>Visualize Physical License Managers with their features.</li>
 <li>Visualize and manage Virtual License Managers with their features. A user can create Virtual License Managers from features of Physical License Managers, for example, it can create one Virtual License Manager from one or many features of different Physical License Managers or the same Physical License Manager. A user can delete the Virtual License Managers, but only in cases when there are no Virtual Pools created from these Virtual License Managers.</li>
 <li>Visualize and manage Virtual Pools with their features: a user can create Virtual Pools from the features of Virtual License Managers. Specifically, a user can create a Virtual Pool by selecting licenses of only one feature from one Virtual License Manager. This Virtual Pool can then be assigned to a certain user with a Manager Role who will be responsible for allocating those licenses to specific users or devices within the company. Hence, a <strong>Virtual Pool</strong> is a pool of licenses associated with a <strong>specific feature of a License Manager</strong>. When creating a Virtual Pool, the user determines the number of licenses they want to include in that pool. They also designate a user with a Manager Role to manage the Virtual Pool, responsible for allocating or removing license allocations to users or devices.</li>
 <li>The allocation of licenses is done on a one-to-one basis, meaning that each license of a certain feature can only be allocated to one user or device.</li>
 <li>As the user with the Admin Role sets a number of licenses for a Virtual Pool, that quantity is subtracted from the corresponding feature, effectively decreasing the available license quantity.</li>
 <li>This decrement continues for each Virtual Pool until the quantity reaches zero. If the quantity of licenses for a feature reaches zero, that feature can no longer be used for creating new Virtual Pools.</li>
 <li>Additionally, users have the ability to delete Virtual Pools, and when a Virtual Pool is deleted, the quantity of licenses associated with that pool is returned to the feature of the license manager it was created from, increasing its value back to the number of licenses in the deleted Virtual Pool.</li>
 <li>Visualize and manage users with a Manager Role: A user with an Admin Role can visualize users with a Manager Role in 2 places: The Users tab of VLM and the Users tab of OpenLM Cloud Portal. Also in the Users tab of OpenLM Cloud Portal, a new user with a Manager Role can be invited and or/and deleted.</li>
</ul>
<h3><a id="post-56627-_qm6u3obdlcyd"></a>Manager Role</h3>
<ul>
 <li>A user with a <strong>Manager Role </strong>can visualize the Virtual Pools and manage license allocations, allocate licenses, remove allocations of licenses, and manage devices of users.</li>
 <li>Visualize Virtual Pools with their features with their quantity of licenses.</li>
 <li>It can allocate licenses to devices, i.e. their users in attachment, by the ID of the device. Allocation of a license is going one-to-one, i.e. only one license of a certain feature can be allocated only to one user or device.</li>
 <li>It can remove allocations of licenses, i.e. their users in attachment, by the ID of the device. The removal of allocation of a license is going one-to-one, i.e. only one license of a certain feature can be removed from one user or device.</li>
 <li>Add a description to the Device or User. As the user is shown only in the encrypted way by Device ID, a user with Manager Role cannot know or remember for the future who is that user, thus user with Manager Role can add a note or description of that Device ID (user) on time of allocation of a license, after being able to manage them by special page, reaching that page by clicking to a number of Devices Ids of a certain feature of Virtual Pool.</li>
</ul>
<h2><a id="post-56627-_1oon0dx3k286"></a><strong>How to access Virtual License Manager</strong></h2>
<ol>
 <li>To get started, register for an account on the OpenLM Cloud Portal if you don't already have one. Simply visit the following link to create your account: <a href="https://www.openlm.com/products/software-license-management-cloud-saas">OpenLM Cloud Portal Registration</a>.</li>
 <li>To access the OpenLM Cloud Portal, log in using the appropriate URL based on your registration zone:
<a href="https://cloud.openlm.com/"> OpenLM Cloud Portal - Other Countries</a>
<a href="https://eu-cloud.openlm.com/"> OpenLM Cloud Portal - EU Countries</a></li>
 <li>Activate Virtual License Manager Product in the OpenLM Cloud Portal.
<img src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-1.png" /></li>
 <li>To open the Virtual License Manager (VLM) product, simply click on the "Open" button. The specific user interface (UI) interface of VLM that you will see upon opening will depend on the role assigned to you.</li>
</ol>
<ul>
 <li>Users with the Admin Role will be presented with the following user interface (UI) upon opening the Virtual License Manager (VLM):
<img class="wp-image-56629" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-2.png" /></li>
</ul>
 
<ul>
 <li>Users with the Manager Role will be presented with the following user interface (UI) upon opening the Virtual License Manager (VLM):
<img class="wp-image-56630" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-3.png" /></li>
</ul>
 
<h2><a id="post-56627-_8hbs6i91tlzr"></a><strong>Virtual License Manager User Guide</strong></h2>
<h3><a id="post-56627-_vme7ds66zpqb"></a>Admin Role User Guide</h3>
To synchronize the Virtual License Manager (VLM) with the FlexNet Embedded server's License Managers, follow these steps:
<ol>
 <li>Access the Physical License Managers page by clicking on the "Physical LM" option from the left tab menu.</li>
 <li>On the Physical License Managers page, you will find various columns, including "Available Features" and "Total Features."</li>
 <li>The "Available Features" quantity indicates the number of features that can be assigned to the Virtual License Manager. Each feature can only be assigned once to a Virtual License Manager. As features are assigned, the quantity in the "Available Features" column decreases for the corresponding Physical License Manager.
<strong><img class="wp-image-56631" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-4.png" /></strong></li>
 <li>When the "Available Features" quantity reaches zero for a Physical License Manager, it can no longer be used to create new Virtual License Managers. The feature becomes unavailable for further assignments and is not visible in the list of assignments.</li>
 <li>The "Total Features" quantity represents the total number of features associated with a Physical License Manager, regardless of their availability.</li>
 <li>If the "Total Features" quantity is zero, it means that there are no features delivered or accessible for management or use through that specific Physical License Manager. In this case, the "Available Features" quantity is also zero, indicating that the Physical License Manager cannot be used for the creation of Virtual License Managers.</li>
</ol>
<h4><a id="post-56627-_lnt1mje0fm0a"></a>Search Functionality</h4>
<ul>
 <li>Easily find a specific Physical License Manager by using the search field. Enter the name you are looking for, and the table will automatically filter the results.
<img class="wp-image-56632" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-5.png" /></li>
</ul>
 
<h4><a id="post-56627-_e54ka7k8aa39"></a>Column Management</h4>
<ul>
 <li>Customize the view of the table by managing the columns. You have the option to rearrange their order, adjust their size, or even remove certain columns altogether. Simply click on the three-dot icon located on the top-right of the table header to access these options.</li>
</ul>
<h4><a id="post-56627-_3964vtisca6f"></a>Print and Export</h4>
<ul>
 <li>Utilize the three-dot icon mentioned above to access the print and export functionalities. This allows you to generate a printable version or export the table data to a CSV file for further processing.</li>
</ul>
<h4><a id="post-56627-_ik0xnfzfknq8"></a>Information Icon</h4>
<ul>
 <li>If you require information about the current page or tab you are on, look for the information "i" icon located on the right side of the header. Clicking on this icon will provide you with relevant details and insights pertaining to the specific page or tab you are viewing.
<img class="wp-image-56633" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-6.png" /></li>
</ul>
 
<h4><a id="post-56627-_7x37v4fixrqt"></a>View Physical License Manager Features</h4>
<ul>
 <li>To view Features associated with a Physical License Manager, simply click the "View" icon located at the end of the respective record.</li>
 <li>Utilize the search field to search for specific Features by name.</li>
 <li>To close the Features view, click the cross-close icon.</li>
 <li>You can manage columns, print, and export the Features table in the same way as you would with the Physical License Managers table.
<img class="wp-image-56634" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-7.png" /><img class="wp-image-56635" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-8.png" /></li>
</ul>
 
<h4><a id="post-56627-_l1lw1hivzcg"></a>Creating a Virtual License Manager</h4>
<ol>
 <li>To create a Virtual License Manager, select the Physical License Managers tab and click the “Create Virtual LM” button:
<img class="wp-image-56636 alignnone" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-9.png" width="1020" height="479" /></li>
 <li>Fill in the fields with data: a Virtual License Manager name, select the type, and give a free text description</li>
 <li>Once you have selected the desired features from one or both Physical License Managers to assign them to the Virtual License Manager, click "SAVE". To cancel the operation or return to the previous page, simply click "CANCEL".
<img class="wp-image-56637" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-10.png" /><img class="wp-image-56638" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-11.png" /></li>
</ol>
<ul>
 <li>The Virtual License Manager is successfully created. you will be automatically directed to the Virtual License Managers page with the "Virtual LM" item selected in the left tab.</li>
 <li>You can always navigate back to this page or choose other items from the left tab menu.</li>
 <li>In addition to the self-explanatory columns, there are "Available Features" and "Total Features" columns.</li>
 <li>The "Available Features" quantity indicates the number of features that can be assigned to Virtual Pools.</li>
 <li>When creating a Virtual Pool, you specify the number of licenses to allocate and designate a Manager Role user to manage them.</li>
 <li>As licenses are assigned to Virtual Pools by an Admin Role user, the quantity decreases for each Virtual Pool, eventually reaching zero.</li>
 <li>If the quantity of licenses for a feature becomes zero, it can no longer be used for creating new Virtual Pools and will be removed from the list of available features for that Virtual License Manager</li>
 <li>The Admin can delete Virtual Pools. If a Virtual Pool is deleted, the quantity of licenses of this Virtual Pool is returned back to the feature of Virtual License Manager, from what it was created, increasing its value back to the number of licenses of Virtual Pool deleted, thus “Available Features” quantity is increasing back allowing that feature to be assignable to other Virtual Pool, in case that feature had 0 licenses before.</li>
 <li>The "Total Features" quantity displays the overall number of features associated with the Virtual License Manager, regardless of whether they have available licenses or not, providing an overview of the total features belonging to a specific Virtual License Manager.
<img class="wp-image-56639" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-12.png" /></li>
 <li>Search a Virtual License Manager by name using the search field.</li>
 <li>To customize columns in the table, use the three dots icon on the top right of the table header. From there, you can adjust the size, or remove the columns</li>
 <li>The same icon also allows you to print or export the table as a CSV file.</li>
 <li>To access information about the current page or tab, simply click the "i" icon on the right side of the header, displaying the page name.
<img class="wp-image-56640" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-13.png" /></li>
 <li>To view features, click the "View" icon at the end of the Virtual License Manager record.</li>
 <li>Use the search field to find specific features by name.</li>
 <li>To close the features view, click the cross-close icon.</li>
 <li>You can manage columns, print, and export the table in the same manner as the Virtual License Manager table.
<img class="wp-image-56641" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-14.png" /><img class="wp-image-56642" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-15.png" /></li>
</ul>
 
<ul>
 <li>To delete a Virtual License Manager, select it and click the “Delete” button.
<img class="wp-image-56643" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-16.png" /></li>
</ul>
 
<h4><a id="post-56627-_bjzdf3ci0gxk"></a>Creating a Virtual Pool</h4>
<ol>
 <li>To create a Virtual Pool, select one Virtual License Manager from the list of tables and click the “Create Virtual Pool” button.
<img class="wp-image-56644" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-17.png" /></li>
 <li>Fill in the header fields with data: Give Virtual Pool a name, select Allocation Manager to whom to assign this Virtual Pool, and give a free text description.</li>
 <li>Select one feature from Virtual License Manager set the value of the quantity of licenses of this feature type you want to insert into the Virtual Pool and click “SAVE”.</li>
 <li>To return to the previous page or cancel the operation you always can click “CANCEL”.
<img class="wp-image-56645" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-18.png" /></li>
 <li>The Virtual Pool is now created. You will get automatically a page of Virtual Pools with the item “Virtual Pools” from the left tab selected. You always can return to this page or any other of selecting items from the left tab menu.</li>
 <li>Visualize the available Features by clicking the “View” icon at the end of the record of Virtual Pool.\To search Features by name use the search field.</li>
 <li>To close the Features view - click the cross-close icon. You can manage columns, print, and export tables in the same way as the Virtual Pool table.
<img class="wp-image-56646" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-19.png" /><img class="wp-image-56647" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-20.png" /></li>
</ol>
 
<ul>
 <li>To delete a Virtual Pool, select it and click the “Delete” button.
<img class="wp-image-56648" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-21.png" /></li>
</ul>
 
<h4><a id="post-56627-_yoz13s8iqof9"></a>Users</h4>
<ol>
 <li>To visualize users with a Manager Role, select the “Users” tab.
<img class="wp-image-56649" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-22.png" /></li>
 <li>To create a user with Manager Role for OpenLM Virtual License Manager, you have to log in to Cloud Portal, from the left tab menu select the item “Identity & Access Management(IAM) → Users” and click the “Invite User” button.
<img class="wp-image-56650" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-23.png" /></li>
 <li>Fill out the form with the data using an email from your company.</li>
 <li>Set the Portal Role to “Viewer” and set the “Manager” role for the Virtual License Manager product.</li>
 <li>Click “Confirm”.</li>
 <li>The user will receive an email to register for Cloud Portal, with a temp password.</li>
 <li>The User has to click a link from the email and set its password and after this, he or she will be able to log in to Virtual License Manager with “Manager Role” (the user will also have access to Cloud Portal with “Viewer” role, being able to access Virtual License Manager from products list of Cloud Portal).
<img class="wp-image-56651" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-24.png" /></li>
</ol>
 
<h3><span style="color: #0274be;"><span style="background-color: #d5d5d5;">Manager Role User Guide</span></span></h3>
<ul>
 <li>The available tab for the Manager role is the Virtual Pools tab. Below is a series of features and actions an Admin can do and see:
<img class="wp-image-56652" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-25.png" /></li>
</ul>
<h4><a id="post-56627-_fq8edjl4s1ka"></a>Searching virtual pools</h4>
<ul>
 <li>A manager can search Virtual Pools by name using the search field.</li>
</ul>
<h4><a id="post-56627-_s1bhyi9c8cft"></a>Managing the appearance of the columns</h4>
<ul>
 <li>Manage columns, change their place, and size, or remove them from the table by using 3 dots in one line icon on the top right of the table header. Also using that icon an admin user can print or export the table to a CSV file. To get info about the current page or tab from the menu - click the info “i” icon on the right of the header showing the name of the page.
<img class="wp-image-56653" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-26.png" /></li>
</ul>
 
<h4><a id="post-56627-_3is1p0p414r7"></a>Obtaining features information</h4>
<ul>
 <li>A manager can visualize Features by clicking the “View” icon at the end of the record of the Virtual Pool. To search Features by name use the search field. To close the Features view - click the cross-close icon. You can manage columns, print, and export tables in the same way as the Virtual Pool table.
<img class="wp-image-56654" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-27.png" /><img class="wp-image-56655" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-28.png" /></li>
</ul>
 
<h4><a id="post-56627-_sle7gm1exw9c"></a>Managing License allocation</h4>
<ul>
 <li>A manager can manage license allocations of the Virtual Pool by selecting one Virtual Pool from the list of tables and clicking the “Manage Licenses Allocations” button.
<img class="wp-image-56656" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-29.png" /></li>
</ul>
 
<ul>
 <li>You will reach the “ALLOCATE POOL” page.
<img class="wp-image-56657" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-30.png" /></li>
 <li>Manage columns: Use the three-dot icon in the top right of the table header to change column placement, and size, or remove columns.</li>
 <li>Print/export table: Use the same icon to print or export the table to a CSV file.</li>
 <li>Get page/tab info: Click the info "i" icon on the right of the header displaying the page name.</li>
 <li>Column details: The table includes columns like "Quantity" (total number of licenses), "Available" (licenses available for allocation), and "Device Ids" (number of devices/users with a license).</li>
 <li>Device/User details: The "Device Ids" column is a link that leads to a page where you can remove allocations and modify device/user descriptions.</li>
 <li>Allocation changes: Allocating a license decreases the "Available" count but increases the "Device Ids" count while removing an allocation has the opposite effect.
<img class="wp-image-56658" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-31.png" /></li>
</ul>
 
<ul>
 <li>To allocate a license to a Device or User select the feature from the table and click “Execute Licenses Allocations”.
<img class="wp-image-56659" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-32.png" /></li>
</ul>
 
<ul>
 <li>Fill out the form: Enter data, including Device ID and Description.</li>
 <li>Encryption: User information is encrypted, so Managers cannot identify users by Device ID alone.</li>
 <li>Add notes/description: Managers can add notes or descriptions to Device IDs during license allocation.</li>
 <li>Manage allocations: Managers can access a special page by clicking on the number of Device IDs in the Virtual Pool feature.</li>
 <li>Save changes: Click "SAVE" to apply the changes.
<img class="wp-image-56660" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-33.png" /></li>
</ul>
 
<ul>
 <li>License is allocated to the Device or User.</li>
 <li>You will return back to “ALLOCATE POOL” \</li>
 <li>Observe that the quantity of "Device IDs" has increased.</li>
 <li>Note that the allocation of the license to the Device or User may take some time on the real machine/server where the license managers are located.</li>
 <li>There is a synchronization time of 1-2min between the OpenLM Virtual License Manager and the real machine/server.
<img class="wp-image-56661" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-34.png" /></li>
</ul>
 
<ul>
 <li>To remove the allocations of the licenses and change the description of Devices or Users, click the number of the “Device Ids” column, the number itself is a link. You will reach the following page:
<img class="wp-image-56662" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-35.png" /></li>
</ul>
 
<ul>
 <li>Use the Search field to search for Devices or Users by ID using the search field.</li>
 <li>Manage the columns by changing their place, and size or removing them from the table using the 3 dots in one line icon on the top right of the table header.</li>
 <li>Also using that icon you can print or export the table to a CSV file.</li>
 <li>To get info about the current page or tab from the menu - click the info “i” icon on the right of the header showing the name of the page.
<strong><img class="wp-image-56663" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-36.png" /></strong></li>
</ul>
 
<ul>
 <li>To edit the description of the Device or User, click the “Edit” button at the end of the record of the Device or User. As result, you will get a form where you can change your description:
<img class="wp-image-56664" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-37.png" /><img class="wp-image-56665" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-38.png" /></li>
</ul>
 
<ul>
 <li>To remove an allocation of a license to a Device or User, click the “Delete” button at the end of the record of Device or User.</li>
 <li>Note the moving of allocation of license of Device or User takes time on real machine/server that resides license managers.</li>
 <li>There is a synchronization time of 1-2min between OpenLM Virtual License Manager and real machine/server.
<img class="wp-image-56666" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-39.png" /><img class="wp-image-56667" src="https://www.openlm.com/wp-content/uploads/2023/06/word-image-56627-40.png" /></li>
</ul>
 

 

 
