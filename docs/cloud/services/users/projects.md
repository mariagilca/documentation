---
sidebar_position: 3
id: projects
title: Projects
---
Use projects to track license usage by project and allocate licensing costs accurately. Users select a project in Personal Dashboard of Workstation Agent before launching an application to capture usage data.

## Prerequisites

- **Agent Activity Manager**: Install Workstation Agent on all target machines. 
- **Directory Sync (optional)**: - To create projects based on Active Directory organizational units. 
- **Projects**: Activate this service.

## Configure projects

1. Open Projects service from Home Page.
2. Configure these settings to show projects in your Personal Dashboard:

### Project usage settings

- **Minimal usage duration**: Set minimum duration to capture project usage data. Shorter sessions merge with next session.

### Workstation Agent behavior settings

- **Use OpenLM's projects**: Enable to use OpenLM-managed projects.
- **Display active project at license retrieval**: Prompt users to select a project when launching an application.
- **Display active project periodically**: Prompt users to select a project at set intervals.
- **Show "Set Active Project" in Personal Dashboard**: Allow users to select a project in Personal Dashboard.
- **Show "Create New Project" in Personal Dashboard**: Allow users to create a new project in Personal Dashboard.
- **Show unassigned projects**: Display all created projects in Personal Dashboard, even if they are not assigned to a user.

### Environment variable support

- Activate to set a project automatically using a system environment variable.
- **Environment variable name**: For example, `LM_PROJECT`. Use this to set a project name automatically.
- **Add unknown projects**: Automatically create a project if specified project name does not exist in Projects.

## Manage projects

Project let's you:

- Add, remove, activate, or deactivate projects.
- Use tabular or tree view to organize parent and child projects.
- Search by project date range, filter columns, and export or import data.

### Add a project

- You can add descriptions for internal reference.
- Only project name and parent project are used for processing.
- Start and end dates affect project visibility in Personal Dashboard. Expired projects do not appear in the list.

### Assign users to projects

Assign users to projects so they appear in Personal Dashboard.

- Add or remove users and view deactivated users.
- Set a default project for users.
- Ensure you have at least 1 user in [User and Groups](./users-and-groups.mdx).

### Assign groups to projects

Assign groups to projects so they appear in Personal Dashboard.

- Add or remove groups and view deactivated groups.
- Set a default project for groups.
- Ensure you have at least 1 group in [User and Groups](./users-and-groups.mdx).. 

## Using projects in Personal Dashboard

Users must select a project before launching an application. They can also create new projects directly in Personal Dashboard.

## Automate project creation with Directory Sync

You can automatically create projects using Directory Sync service. 

## Manage project views from Agents Hub

Control project visibility using Agents Hub service. 

## Reporting

Project usage data appears in your BI tool only.