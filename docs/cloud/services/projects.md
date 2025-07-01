---
sidebar_position: 22
id: projects
title: Projects
---
Use projects to track license usage by project and allocate licensing costs accurately. Users select a project in the Personal Dashboard of the Workstation Agent before launching an application to capture usage data.

## Prerequisites

- **Agent Activity Manager**: Install the Agent on all target machines. 
- **Directory Sync (optional)**: Recommended if you want to create projects based on Active Directory organizational units. 
- **Projects**: Activate this service.

## Configure projects

1. Open Projects service from the home page.
2. Configure the following settings to display projects in the Personal Dashboard:

### Project usage settings

- **Minimal usage duration**: Set the minimum duration to capture project usage data. Shorter sessions merge with the next session.

### Agent behavior settings

- **Use OpenLM's projects**: Enable to use OpenLM-managed projects.
- **Display active project at license retrieval**: Prompt users to select a project when launching an application.
- **Display active project periodically**: Prompt users to select a project at set intervals.
- **Show "Set Active Project" in Personal Dashboard**: Allow users to select a project in the Personal Dashboard.
- **Show "Create New Project" in Personal Dashboard**: Allow users to create a new project in the Personal Dashboard.
- **Show unassigned projects**: Display all created projects in the Personal Dashboard, even if they are not assigned to the user.

### Environment variable support

- Enable to set a project automatically using a system environment variable.
- **Environment variable name**: For example, `LM_PROJECT`. Use this to set the project name automatically.
- **Add unknown projects**: Automatically create a project if the specified project name does not exist in the Projects microservice.

## Manage projects

If you use OpenLM's projects, you need to create projects here.

- Add, remove, enable, or disable projects.
- Use tabular or tree views to organize parent and child projects.
- Search by project date range, filter columns, and export or import data.

### Add a project

- You can add descriptions for internal reference.
- The system uses only the project name and parent project for processing.
- The start and end dates affect project visibility in the Personal Dashboard. Expired projects do not appear in the list.

### Assign users to projects

Assign users to projects so they appear in the Personal Dashboard.

- Add or remove users and view disabled users.
- Set a default project for users.
- Ensure you have at least one user in the UGS service.

### Assign groups to projects

Assign groups to projects so they appear in the Personal Dashboard.

- Add or remove groups and view disabled groups.
- Set a default project for groups.
- Ensure you have at least one group in the UGS service. 

## Using projects in the Personal Dashboard

Users must select a project before launching an application. They can also create new projects directly in the Personal Dashboard.

## Automate project creation with Directory Sync

You can automatically create projects using the Directory Sync service. 

## Manage project views from Agents Hub

Control project visibility using the Agents Hub service. 

## Reporting

Project usage data appears in your BI tool only.