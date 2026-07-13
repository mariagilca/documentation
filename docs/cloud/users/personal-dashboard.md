---
sidebar_position: 18
title: Personal Dashboard
description: "Personal Dashboard gives end users visibility into their license activity without needing admin access. This page covers the administrator setup: prerequisites, the policies that control which pages each user sees, and what every page does."
---

Personal Dashboard is the end-user portal delivered by the OpenLM Workstation Agent, giving users visibility into their own license activity without admin access. This page covers the administrator setup. For the end user's view, see [Your Personal Dashboard](/cloud/for-end-users/personal-dashboard).

Depending on the policies you set and the products you activate, the dashboard presents up to six pages, grouped in the left sidebar as **Management** (Recently Closed, Projects, Product Licensing Level), **Operational** (License Repository, Live Feed), and **Reporting** (Workstations Overview), plus real-time notifications. As an administrator you don't work inside a user's dashboard: you decide which pages each user sees through the Personal Dashboard policies in [Agents Hub](/cloud/data-collection/agents_hub), and you make the data-backed pages available by activating the relevant products in [Products](/cloud/openlm-administration/products).

:::info[Accessing Personal Dashboard]
Personal Dashboard is not opened from the app launcher. End users open it on their own machine — it launches automatically after the Workstation Agent is installed, or from **Windows Start → OpenLM → Personal Dashboard**.

**Related:** [Workstation Agent](/cloud/getting-started/install-workstation-agent) · [Projects](./projects.md) · [Users and Groups](./users-and-groups.mdx) · [Identity](/cloud/openlm-administration/identity)
:::

![The Personal Dashboard on the License Repository landing page](/img/personal_dashboard/license-repository.png)
*The dashboard shell: the sidebar groups pages into Management, Operational, and Reporting; the header carries the notifications bell and the user menu.*

## Prerequisites

To access OpenLM Personal Dashboard (PD), users must meet the following prerequisites:

### 1. [Create a user account in Identity Service](./../openlm-administration/identity#users-management)


To access Personal Dashboard, a user must have an account in OpenLM Identity Service.


Options:

- You can manually create individual accounts with or without roles.
:::info
 Identity Service does **not** support bulk user creation. User accounts must be added individually.
:::
- You can create a shared user account, but it's not recommended. This is the easiest option. The shared account won't appear in Personal Dashboard. Workstation Agent always collects user identity from local machine, not from Identity Service.

### 2. [Use a recommended authentication method(SSO)](./../openlm-administration/identity#external-providers-sso)

For organizations with many users, integrate a third-party identity provider for authentication and user management. Supported options include:

- Okta  
- Azure AD  
- Windows Authentication  

### 3. [Install Workstation Agent](/cloud/deployment-operations/components-installation)

Users can only access PD after installing Workstation Agent on their computer.

### Installation methods

- **Manual installation**  
  Users can install Workstation Agent themselves if provided with an authorization file generated in Identity Service. The PD launches automatically after installation.

- **Mass or silent deployment**  
  IT teams can deploy Workstation Agent at scale using tools such as:
  - Microsoft Intune  
  - Group Policy (GPO)  
  - SCCM (System Center Configuration Manager)  
  - PDQ Deploy  
  - Custom silent script  

### 4. Activate the required products

The data-backed pages load only when their product is active for the account:

- **License Repository**, **Product Licensing Level**, and **Workstations Overview** require the **SLM** product.
- **Projects** requires the **Projects** product.

Activate products in [Products](/cloud/openlm-administration/products) → **Available Products** → **Activate**. Recently Closed and Live Feed do not require a product.

## Controlling which pages users see

Each page is shown or hidden per user by a Personal Dashboard policy, configured in [Agents Hub](/cloud/data-collection/agents_hub). Several pages also require an activated product before they load data.

| Page | Group | Appears when… | Requires product |
| --- | --- | --- | --- |
| Recently Closed | Management | Always shown | — |
| Projects | Management | The Projects page is enabled | Projects |
| Product Licensing Level | Management | Set ArcGIS level is not hidden | SLM |
| License Repository | Operational | License usage information is not hidden | SLM |
| Live Feed | Operational | The Live Feed page is enabled | — |
| Workstations Overview | Reporting | The Workstations Overview page is enabled | SLM |

After sign-in the dashboard opens on **License Repository** by default (or **Recently Closed** if license-usage information is hidden for that user).

## Personal Dashboard notifications 

Personal Dashboard users can receive browser notifications from Workstation Agent:

- Notifications include process release alerts, project selection prompts, forbidden application alerts, and license availability notifications.
- Notifications use built-in browser notifications if allowed. Otherwise, notifications appear in-app as toast messages.


### Notification examples

- Prompting a user to select an active project.
- Alerting users when licenses become available.
- Notifying users to release a license requested by someone else. The request is sent from the **License in use** panel of the License Repository (the current control is **Send "Close App" Notification**); the minimum interval between such requests is configurable in [Agents Hub](/cloud/data-collection/agents_hub).

Notifications collect in the bell menu in the header, where users read their history, mark items read (**Read all**), and clear read items (**Clear read**). Some notifications are clickable — for example, a *Process released* item links to Recently Closed so the user can resume it.

![The notifications menu with project-selection prompts](/img/personal_dashboard/notifications.png)
*The notifications menu (opened from the bell) — here with project-selection prompts — with **Read all** and **Clear read** at the top.*

## Projects and license tracking

OpenLM can attribute license usage to specific active projects:

- Users can create or select active projects within Personal Dashboard if the [Projects](./projects.md) service allows it.
- You can manage project-based license usage tracking through the [Projects](./projects.md) service; page visibility and project prompting are controlled in [Agents Hub](/cloud/data-collection/agents_hub).

On the **Projects** page a user sets the project their usage is billed to — picking it from the searchable **Active project** list and clicking **Apply** — creates one with **Add Project**, and sees their own **Usage by projects** over a selectable time frame. This page requires the **Projects** product.

![The Projects page](/img/personal_dashboard/projects.png)
*The Projects page: choose the active project and Apply; the lower grid shows the user's usage per project.*

### Recently closed

- View applications actively closed by Workstation Agent to recover licenses.
- Select process names to reopen applications and check-out licenses again.

The columns are **Process**, **Action** (how the license was reclaimed — *Save & Close*, *Closed*, or *Suspended*), **Time**, **Workstation**, and **File path**. Per row a user can **Resume** the process, open the file's containing folder (when your Agents Hub policy allows it), **Show last screenshot** (when process screenshots are enabled), or **Clear** the row. Suspended processes can be resumed but not cleared.

![The Recently Closed page listing closed applications](/img/personal_dashboard/recently-closed.png)
*Recently Closed lists applications the agent closed or suspended to recover licenses; the **Resume** action reopens one.*

### License repository

- View real-time license usage, including number of licenses in use, borrowed, and available.
- Access detailed user information currently holding licenses.
- Configure filtering options to control license visibility for end-users.

The table lists every license per server with **Total**, **Available**, **Used**, and **Borrowed** counts (a count of `-99` shows as **Unlimited**). Selecting a row's **Used** count (when it is greater than 0) opens **License in use** — the people currently holding that feature — from where a user can nudge them to release it by email, phone, or an in-app **Send "Close App" Notification**. **Show / Hide**, **Show hidden**, and **Show packages only** control which licenses appear. License Repository is the default page after sign-in.

### ArcGIS licensing levels (ArcGIS only)

ArcGIS users can select licensing levels (**Advanced**, **Standard**, **Basic**) for ArcGIS Desktop and ArcGIS Pro. Set default levels or restrict user choices in Personal Dashboard.

On the **Product Licensing Level** page the user picks the **Product** (ArcGIS Desktop or ArcGIS Pro), the **Server**, and the level, and — under **Advanced** — chooses where the level is stored (**Registry**, **System Environment**, or **User Environment**) before clicking **Save**. Agents Hub policies can hide the page, set the default save location, or lock it so users can't change it. This page requires the **SLM** product.

![The Product Licensing Level page](/img/personal_dashboard/product-licensing-level.png)
*Choosing the ArcGIS level and where it is saved; the Advanced section holds the save-location options.*

> [Learn more about ArcGIS licensing levels](https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm).

## Live Feed

**Live Feed** is a real-time log window for a user's connected Workstation Agents — not a license view. With agents connected, each appears as its own log tab, and the user can **Restart Agent**, change its minimum **Log Level**, or **Open Logs Location** on the agent machine. It appears only when the Live Feed page is enabled and is not tied to product activation.

![Live Feed streaming a connected agent's log](/img/personal_dashboard/live-feed.png)
*Live Feed streams each connected agent's Workstation Agent log (one tab per agent), with Restart Agent and Agent Settings controls.*

## Workstations Overview

**Workstations Overview** shows, for one selected feature, which workstations can obtain the license. Filter by **Vendor**, **License Server**, **Feature**, and workstation set; the summary rolls up **Total**, **Available**, and **In use**, and each card shows a workstation as **Available** or **In use** (usage refreshes about every minute). It appears only when the Workstations Overview page is enabled and requires the **SLM** product.

![The Workstations Overview page](/img/personal_dashboard/workstations-overview.png)
*Filter by vendor, server, and feature; each card shows a workstation's availability, with a rollup on the right.*

## Personalizing the dashboard

From the header user menu a user can set their **Time zone** (used for every timestamp in the dashboard) and open a **Mobile QR code** to launch the dashboard, signed in as the same user, on a phone. These are user preferences, not admin settings.

![The header user menu](/img/personal_dashboard/user-menu.png)
*The user menu: Log Out, Mobile QR code, and Time zone.*
