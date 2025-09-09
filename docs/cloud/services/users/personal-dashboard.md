---
sidebar_position: 18
title: Personal Dashboard
---
## Prerequisites

To access OpenLM Personal Dashboard (PD), users must meet the following prerequisites:

### 1. [Create a user account in Identity Service](./../openlm-administration/identity#users-management)


To access Personal Dashboard, a user must have an account in OpenLM Identity Service.


Options:

- You can manually create individual accounts with or without roles.
:::info
 Identity Service does **not** support bulk user creation. User accounts must be added individually.
:::
- You can create a shared user account, but it’s not recommended. This is the easiest option. The shared account won’t appear in Personal Dashboard. Workstation Agent always collects user identity from local machine, not from Identity Service.

### 2. [Use a recommended authentication method(SSO)](./../openlm-administration/identity#external-providers-sso)

For organizations with many users, we recommend integrating a third-party identity provider for authentication and user management. Supported options include:

- Okta  
- Azure AD  
- Windows Authentication  

### 3. [Install Workstation Agent](../../install/components_installation)

Users can only access PD after installing Workstation Agent on their computer.

### Installation methods:

- **Manual installation**  
  Users can install Workstation Agent themselves if provided with an authorization file generated in Identity Service. The PD launches automatically after installation.

- **Mass or silent deployment**  
  IT teams can deploy Workstation Agent at scale using tools such as:
  - Microsoft Intune  
  - Group Policy (GPO)  
  - SCCM (System Center Configuration Manager)  
  - PDQ Deploy  
  - Custom silent script  



## Personal Dashboard notifications 

Personal Dashboard users can receive browser notifications from Workstation Agent:

- Notifications include process release alerts, project selection prompts, forbidden application alerts, and license availability notifications.
- Notifications use built-in browser notifications if allowed. Otherwise, notifications appear in-app as toast messages.


### Notification examples:

- Prompting a user to select an active project.
- Alerting users when licenses become available.
- Notifying users to release licenses requested by others through the Personal Dashboard's "Send In-App Request" feature (limit: once every 3 minutes).

## Projects and license tracking

OpenLM can attribute license usage to specific active projects:

- Users can create or select active projects within Personal Dashboard if activated in EasyAdmin.
- You can manage project-based license usage tracking through EasyAdmin.

### Recently closed

- View applications actively closed by Workstation Agent to recover licenses.
- Select process names to reopen applications and check-out licenses again.

### License repository

- View real-time license usage, including number of licenses in use, borrowed, and available.
- Access detailed user information currently holding licenses.
- Configure filtering options to control license visibility for end-users.

### ArcGIS licensing levels (ArcGIS only)

ArcGIS users can select licensing levels (**Advanced**, **Standard**, **Basic**) for ArcGIS Desktop and ArcGIS Pro. Set default levels or restrict user choices in Personal Dashboard.

> [Learn more about ArcGIS licensing levels](https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm).

