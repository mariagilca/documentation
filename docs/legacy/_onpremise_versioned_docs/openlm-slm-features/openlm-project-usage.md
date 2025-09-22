---
title: OpenLM Project Usage
sidebar_position: 6
description: Overview of OpenLM Project Usage feature for monitoring software license consumption by projects.
---

## Project usage reporting
OpenLM records license usage and groups it by project, allowing you to allocate licenses and monitor costs per project.

The Project Usage window is available in the EasyAdmin interface by clicking EasyAdmin User Interface Start → Reports → Project Usage.

Set the filtering options on the left and click Apply to run the query. You can view the report as a chart, a table, or download it as a CSV file.

!

## Prerequisites
Grouping license usage by project requires additional licensing. If you do not see the Projects_Billing tag in the OpenLM License window, contact sales@openlm.com.

Project configuration requires administrative privileges when the OpenLM SLM uses authentication.

The OpenLM Workstation Agent must be installed on end-users' workstations to select the active project.

## Project settings
The Projects Settings screen defines the policy for project usage monitoring. To open it, go to EasyAdmin Start → Administration → Projects.

!

## Log projects information
Check this box to start grouping license usage information by the project it has been allocated to.

## Minimal usage duration for project
This setting defines the shortest duration for logging purposes. Shorter periods are merged to form significant usage periods. For example, if the minimal duration is 5 minutes and a user has an application open for only 3 minutes, this usage will be merged with the next session.

## Workstation agent’s behavior settings
These settings define what end users see on their workstations.

The default method for project assignment is by the project name stored in the OpenLM database. This is enabled with the “Use OpenLM Projects” radio button.

When end-users are assigned to only one project, OpenLM logs their usage to that project without any additional action required from the user.

When end-users work on more than one project, the Workstation Agent presents a dialog box for them to select the current project.

## Hide projects option from menu
End-users can select the active project in two ways: by right-clicking the Agent icon in the system tray and selecting Set Active Project, or by selecting a project from the pop-up window.

The Set Active Project menu includes all projects listed in OpenLM, whereas the pop-up menu only shows projects the user is assigned to. Checking this box hides the Set Active Project menu item, but the user can still select a project from the pop-up.

## Projects window fades away after
This setting allows you to configure the project selection dialog box to fade away after a predefined number of seconds.

## Allow creation of projects in agent
The OpenLM project management module facilitates project creation via the Workstation Agent. Checking this box enables the Create New Project option in the Workstation Agent interface.

!

When a user selects this option, they can create new projects and assign themselves to them. Editing these projects is only possible in EasyAdmin.

## Show unassigned projects
By default, users can only see projects they have been assigned to in the Workstation Agent → Set Active Project menu. Checking this box populates the list with all enabled projects in the system, and the user can select any project.

## Support environment variable
This is a backward-compatibility option that overrides the default OpenLM project management option. The Workstation Agent will read the predefined Windows variable (LM_PROJECT by default) and use its value as the project for the user session.

This variable must be set separately for each workstation, and users will not see the project selection pop-up.

You can set an environment variable manually:

Press Windows + R to open the Run window, type sysdm.cpl, and press Enter.

Go to the Advanced tab and select Environment Variables.

Set the variables as needed.

System administrators can also set this in bulk through a remote management solution.

!

The Add unknown projects option is an administrative filter for projects not in the OpenLM SLM:

Checked: Any unknown project name from the environment variable will be added to the project list and set as the current one.

Unchecked (default): If the value of the environment variable is not found in OpenLM's project list, the usage will not be tracked.

## Project creation in EasyAdmin
Projects can also be created via the EasyAdmin user interface:

Click EasyAdmin User Interface Start → Management → Projects.

Click Add.

Fill in the information in the Add Project form.

!

In the Project details tab, you can set:

Project name

Start and end time for the project

Number of working hours allocated

Project priority

Completeness percentage

Users and user groups can be assigned to the project upon creation. After configuring these items, click Save.

## Editing existing projects
New projects are displayed in the Projects window (EasyAdminUser Interface Start → Management → Projects).

!

This window allows you to create new projects, as well as delete or edit existing ones. The left panel serves as a filter:

Priority: Filter by priority level (Low, Medium, or High).

Created in: Filter by the source where the project was created (Admin for EasyAdmin or Agent for Workstation Agent).

The right panel displays a list of existing projects with options to add, delete, edit, enable, or disable a project.

## Attaching users and user groups to a project
To attach users or groups to a project:

Highlight the target project and click Edit.

Select the Users or Groups tab.

Click the Add button and highlight the user or group from the search window.

Click Select.

Click Save to commit the changes.

! !
