---
title: "OpenLM Project Usage"
date: "2023-11-05T21:46:21"
permalink: "https://www.openlm.com/docs/openlm-slm-features/openlm-project-usage/"
posttype: "manual_documentation"
id: "6700"
---

OpenLM has a feature to record license usage information and group it by different projects. This allows the allocation of licenses as needed by different organizational projects and it can also serve as a means to effectively monitor license usage costs by project.

 
<h2><a id="post-26626-_gfyb8rc8acwa"></a><strong>Project Usage reporting</strong></h2>
The Project Usage window is available through the EasyAdmin interface by clicking <strong>EasyAdmin User Interface Start → Reports → Project Usage</strong>.

Set the filtering options on the left-hand side of the screen then click <strong>Apply</strong> to run the usage query. It is also possible to view the report in chart format (by clicking the Chart tab) or as a CSV file (by clicking the download icon in the bottom right of the window).

<img class="wp-image-39233" src="https://www.openlm.com/wp-content/uploads/2021/02/project-usage.png" alt="Project Usage" />
<h2><a id="post-26626-_nby0bgsutnap"></a><strong>Prerequisites</strong></h2>
1. Grouping license usage by the project is a feature that requires additional licensing. If you don't see the <em>Projects_Billing</em> tag in the OpenLM License window, please contact sales@openlm.com.

2. When the OpenLM SLM uses authentication, project configuration requires administrative privileges.

3. OpenLM Workstation Agent must be installed on the end-users’ workstation in order to be able to select the active project.

 
<h2><a id="post-26626-_lk73v5txldqz"></a><strong>Projects Settings</strong></h2>
The Projects Settings screen defines the policy of the Project usage monitoring capability. In order to open it, go to <strong>EasyAdmin Start → Administration → Projects</strong>. The Projects window appears:
<h3><a id="post-26626-_5wfpg5tu5ppv"></a><img class="wp-image-39234" src="https://www.openlm.com/wp-content/uploads/2021/02/administration-projects.png" alt="Administration - Projects" /></h3>
 
<h3><a id="post-26626-_73n6hl7ugxtj"></a><strong>Log Projects Information</strong></h3>
Check the <strong>Log projects information</strong> box to start grouping license usage information according to which project it has been allocated to.

 
<h3><a id="post-26626-_5karwwvffc86"></a><strong>Minimal Usage Duration for Project</strong></h3>
This setting defines the shortest duration for logging purposes. Shorter periods would be merged together to form significant usage periods. For example, if the minimal duration is set to 5 minutes and a user has had an application open for a total of only 3 minutes, this usage period will not be added to the current session but merged with the following session instead.

 
<h3><a id="post-26626-_4v0n4qmth0z7"></a><strong>Workstation Agent’s Behavior Settings</strong></h3>
These settings define what the end-users will see on their workstations if they work on more than one project for their organization.

The default method for project assignment is by the project name, as they are stored in the OpenLM database. This method is enabled with the “Use OpenLM Projects” radio button, as opposed to the environment variables method, which is discussed further below.

When end-users are assigned to only one project in EasyAdmin, OpenLM will log their license usage and assign it to that project without any additional action required on the end-users' part.

When end-users work on more than one project, OpenLM Workstation Agent will present a dialog box on their screen prompting them to select the current project.

 
<h3><a id="post-26626-_jtr8cawy3m36"></a><strong>Hide Projects Option from Menu </strong></h3>
End-users may select the active project in one of two ways:

1. By right-clicking the Agent icon in the tray and selecting ”Set Active Project”.

2. Waiting for the project selection pop-up box to appear and selecting it from there.

The difference between the two is that the ”Set Active Project” menu includes all the projects listed in OpenLM, whereas the pop-up menu contains only the project to which the user is assigned. This checkbox hides the <strong>Set Active Project</strong> entry in the Agent’s right-click menu. The user will still be able to select a project according to the project selection pop-up menu.

 
<h3><a id="post-26626-_9tl8lyn18864"></a><strong>Projects Window Fades Away After</strong></h3>
OpenLM enables users to ignore the project dialog box by having it fade away after a predefined number of seconds.
<h3><a id="post-26626-_rghwiexd4lae"></a><strong>Allow Creation of Projects in Agent</strong></h3>
The OpenLM project management module facilitates project creation via the OpenLM Workstation Agent. Check the ”Create New Project” box to enable this option, thus adding a new menu item in the OpenLM Agent interface (see image below).

<img class="wp-image-39235" src="https://www.openlm.com/wp-content/uploads/2021/02/show-set-active-project.png" alt="Show "Set Active "Project"" />

When an end-user selects this option, the ”Create New Project” window opens. End-users can then create new projects and assign themselves to them.

Editing these newly created projects is possible in EasyAdmin only. The origin of the project will be apparent in the EasyAdmin Projects list window (See “Editing existing projects” below).

 
<h3><a id="post-26626-_44r1e6ay49t2"></a><strong>Show Unassigned Projects</strong></h3>
By default, users can only see projects they have been assigned to in the Workstation Agent → Set Active Project menu option. Checking this box will produce a list that contains all enabled projects in the system and the user will be able to select any project from this list.

 
<h3><a id="post-26626-_fhgzwv1i4io0"></a><strong>Support Environment Variable</strong></h3>
The support environment variable option is a backward-compatibility option. Choosing this will override the default OpenLM project management option. OpenLM Workstation Agent will read the predefined Windows variable (<strong>LM_PROJECT</strong> by default) and use its value as the project towards which it will assign the license usage for the user session.

This variable must be set separately for each workstation, so there is no option of overriding its value between users. Users will also not see the project selection pop-up like when the regular OpenLM projects functionality is used.

Setting environment variable can be done manually by the user:
<ol>
 <li>Press "Windows + R" to open the Run window, type "sysdm.cpl" in the text box and press Enter to open System Properties.</li>
 <li>Go to the "Advanced" tab and select "Environment Variables".</li>
 <li>The Environment Variables panel appears on the screen. You can observe two types of variables and set them according to your needs.</li>
</ol>
Also, this can be achieved by the system administrator in bulk through a CRM, ERP or any other remote management solution.

<img class="wp-image-39236" src="https://www.openlm.com/wp-content/uploads/2021/02/environment-variable.png" alt="Environment Variable" />

The environment variable option is disabled by default. It is recommended to use the OpenLM supplied solution, unless backward support of the environment variable option is required.

The <strong>Add unknown projects</strong> option presents an administrative filter for project names that are unknown to the OpenLM SLM:
<ul>
 <li>Checked: Any unknown project name that is not already found in OpenLM's project list will be added to the list of projects and set as the current one.</li>
 <li>Unchecked (default): If the value of the environment project is not found in OpenLM's project list, the unknown project will not be set and usage will not be tracked.</li>
</ul>
 
<h2><a id="post-26626-_39idkqh306nt"></a><strong>Project creation in EasyAdmin User Interface</strong></h2>
In the previous section, we have seen the method for creating projects via the Workstation Agent. Projects can also be created via the EasyAdmin user interface too:

Click <strong>EasyAdmin User Interface Start → Management → Projects</strong>. The Project window appears.

Click <strong>Add</strong> then fill in the information in the “Add Project” form.

<img class="wp-image-39237" src="https://www.openlm.com/wp-content/uploads/2021/02/project-creation-in-easyadmin-user-interface.png" alt="Project creation in EasyAdmin User Interface " />

In the Project details tab, the Administrator can set up the following fields:
<ul>
 <li>Project name</li>
 <li>Start and End time for the project</li>
 <li>Number of working hours allocated to this project</li>
 <li>The project’s priority</li>
 <li>The project’s completeness percentage</li>
</ul>
Users and user groups may be assigned to the project upon its creation via the Users and Groups tabs. After configuring these items, click <strong>Save</strong>.

 
<h2><a id="post-26626-_82kzwoo94tii"></a><strong>Editing existing projects</strong></h2>
New Projects are presented in the Projects window (<strong>EasyAdminUser Interface Start → Management → Projects</strong>).

<img class="wp-image-39238" src="https://www.openlm.com/wp-content/uploads/2021/02/projects-window.png" alt="Projects window" />

This window allows creating new projects, as well as deleting or editing existing ones. It is split in two panels:

The left panel serves as a filter for projects to be shown in the right panel.
<ul>
 <li>The <strong>Priority</strong> drop-down list allows filtering by priority level: <em>Low, Medium </em>or<em> High</em>.</li>
 <li>The <strong>Created in</strong> the drop-down list allows filtering by the source where the Project was created: <em>Admin</em> for EasyAdmin User Interface or <em>Agent</em> for those created with OpenLM Workstation Agent</li>
</ul>
The right panel displays a list of existing projects. The action bar at the top allows adding a new project, deleting, editing a project’s properties, and finally enabling or disabling a particular project.

 
<h2><a id="post-26626-_c45kq412bhu0"></a><strong>Attaching users and user groups to a project</strong></h2>
When creating a project, it's possible to add users or user groups to it as soon as the configuration is complete. To do so:
<ol>
 <li>Highlight the target project then click <strong>Edit</strong>.</li>
 <li>Select the <strong>Users</strong> or <strong>Groups</strong> tab in the Project window. Click the <strong>Add</strong> button then highlight the user or group from the Search window that pops up.</li>
 <li>Click <strong>Select</strong> when finished.</li>
 <li>Click <strong>Save</strong> to commit the changes.</li>
</ol>
<img class="wp-image-39239" src="https://www.openlm.com/wp-content/uploads/2021/02/attaching-users-and-user-groups-to-a-project.png" alt="Attaching users and user groups to a project " /> <img class="wp-image-39240" src="https://www.openlm.com/wp-content/uploads/2021/02/attaching-users-and-user-groups-to-a-project-1.png" alt="Attaching users and user groups to a project " />
