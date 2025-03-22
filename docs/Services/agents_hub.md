---
sidebar_position: 2
---

# Agents Hub

## Overview

The **Agents Hub** microservice manages and orchestrates connected Workstation Agents. You can configure agent settings, manage user interfaces such as the Personal Dashboard, and handle monitoring of websites accessed by users.

## Prerequisites

- **Agent Activity Manager**: Install and connect the Workstation Agent on each target machine.

## Manage discovered websites

The Agents Hub automatically discovers websites accessed by users. In the **Discovered Web Services** section, you can:

- Approve discovered websites for monitoring (these will appear in the [Touch Points Events](Link) microservice).
- Toggle off (deny) discovered websites to exclude them from monitoring.

You can also manually add websites (including specific subdirectories) to track access frequency.

## Agent configuration settings

Configure the following settings within the **Agents Hub**:

### General

- **Enable Process Screenshots**: Allow the agent to periodically capture screenshots of monitored processes. Screenshots can be viewed in the Personal Dashboard under the **Recently Closed** page.

### Discovery settings

- **Report web services anonymously**: Anonymizes user and machine details for discovered websites.
- **Report discovered applications anonymously**: Anonymizes user and machine details for discovered applications.
- **Report discovered related executables**: When enabled, reports `.exe` files associated with discovered applications. Use cautiously, as it can generate significant data.

### Licensing settings

- **Available license notification**: Notify end-users when previously unavailable licenses become available within a defined reservation period.

### Reporting settings

- **Normalize reported workstation names**: Converts all reported workstation names to lowercase.
- **Normalize reported usernames**: Converts usernames to lowercase. Use cautiously on Unix-like systems where usernames are case-sensitive.

### Projects settings

- **Default Closed Projects Location**: Default location for unsaved projects when the agent automatically closes applications.
- **Overwrite Existing Projects**: Allows overwriting project files when saving.
- **Force Project Selection**: Forces users to select an active project, automatically closing newly opened processes until selection is made.

### Extensions (ArcGIS only)

- **Show extensions list at software startup**: Displays ArcGIS extensions list on ArcMap startup.
- **Turn off license extensions at shutdown**: Automatically disables ArcMap licensed extensions on shutdown.
- **Turn off custom extensions**: Disables third-party ArcMap extensions on shutdown.
- **Application's behavior when extension passes usage threshold**: Choose to either turn off the extension or shut down ArcMap when idle usage thresholds are exceeded.
- **Actively shut any open applications down at**: Specify a time to automatically shut down supported applications.
- **Software items that won't be saved or reported**: List executables (e.g., ArcCatalog.exe) that will not save data upon closure.
- **Directories excluded from automatic project saving**: List directories to exclude from automatic project saving.

## Personal Dashboard configuration

Adjust the agent’s browser-based user interface (Personal Dashboard):

### General

- Set the minimum interval between license release request notifications.

### Visibility settings

Control Personal Dashboard page visibility:

- **Show Project Page**: Display the Projects page.
- **Show Live Feed Page**: Display the Live Feed page.
- **Show Workstation Overview Page**: Display the Workstation Overview page.
- **Disable open folder button**: Disable opening last used project folders.
- **Hide license usage information**: Prevent users from viewing license usage details.
- **Show named license usage information**: Control visibility of named license usage details.

### ArcGIS-specific settings

- Set default ArcGIS license levels for users.
- **Prohibit users from changing ArcGIS level**: Prevent changes to ArcGIS licensing levels.
- **Hide ArcGIS level selection**: Disable the ArcGIS license selection UI for users.

## Personal Dashboard notifications

Personal Dashboard users can receive browser notifications from the Workstation Agent:

- Notifications include process release alerts, project selection prompts, forbidden application alerts, and license availability notifications.
- Notifications use native browser notifications if allowed. Otherwise, notifications appear in-app as toast messages.

### Notification examples:

- Prompting a user to select an active project.
- Alerting users when licenses become available.
- Notifying users to release licenses requested by others through the Personal Dashboard's "Send In-App Request" feature (limit: once every 3 minutes).

## Projects and license tracking

OpenLM can attribute license usage to specific active projects:

- Users can create or select active projects within the Personal Dashboard if activated in EasyAdmin.
- You can manage project-based license usage tracking through EasyAdmin.

### Recently Closed

- View applications actively closed by Workstation Agent to recover licenses.
- Select the process names to reopen applications and check out licenses again.

### License Repository

- View real-time license usage, including the number of licenses in use, borrowed, and available.
- Access detailed user information currently holding licenses.
- Configure filtering options to control license visibility for end-users.

### ArcGIS licensing levels (ArcGIS only)

ArcGIS users can select licensing levels (**Advanced**, **Standard**, **Basic**) for ArcGIS Desktop and ArcGIS Pro. Set default levels or restrict user choices in the Personal Dashboard.

> [Learn more about ArcGIS licensing levels](https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm).

