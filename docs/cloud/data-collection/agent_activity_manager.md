---
title: "Agent Activity Manager"
sidebar_position: 5
description: "Monitor connected agents, roll out upgrades, restart Workstation Agents, and remove obsolete records from the Agent Activity Manager console in the OpenLM Platform."
---

## Overview

Use **Agent Activity Manager** to monitor and maintain the OpenLM agents installed across your organization. OpenLM agents are small programs that run on end-user devices and report software and license activity back to the OpenLM Platform. From a single screen, Agent Activity Manager gives you a complete, searchable list of those agents, shows whether each one is currently online, and lets administrators push software upgrades, restart agents remotely, and remove any that are obsolete or no longer needed.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Agents → Agent Activity Manager**.

**Before you start:** Install and connect at least one Workstation Agent so agents appear in the console; Agent Activity Manager needs no separate product activation.

**Related:** [Agents Hub](/cloud/data-collection/agents_hub) · [System requirements](/cloud/deployment-operations/system-requirements)
:::

With Agent Activity Manager you can:

- **View every installed agent**: a row for each agent, with host name, username, IP address, agent version, agent type, online status, and activity timestamps.
- **Tell who is online**: an at-a-glance online indicator, kept current by the OpenLM Platform behind the scenes.
- **Find specific agents**: filter by host name, username, IP address, version, agent type, online status, and last-report date.
- **Upgrade agents**: upload a new agent installer (`.msi`) and roll it out to selected agents or to your whole fleet.
- **Keep new agents current**: auto-upgrade automatically updates agents as they report in.
- **Restart all Workstation Agents**: send a restart command to every Workstation Agent.
- **Remove agents**: delete obsolete agent records from the console.

:::note
Agent Activity Manager is part of the OpenLM Platform process monitoring family of tools and is provisioned with your OpenLM Platform account. You do not need to activate a separate product.
:::

## How Agent Activity Manager works

You do not need to understand the internals to use the console, but a few concepts make the screens easier to interpret.

### Agents and agent types

An agent is OpenLM software installed on a user's machine that monitors application and license usage and periodically reports activity to the OpenLM Platform. Each agent appears automatically in the console once it is installed and starts reporting. You never create agents manually. An agent is uniquely identified by the combination of its tenant, user name, host name, and agent type, so the same person on a second machine, or a second agent type on the same machine, appears as a separate row. Agent Activity Manager tracks 3 agent types:

- **Workstation Agent**: installed on a user's desktop or workstation.
- **Browser Agent**: runs in the user's web browser.
- **AutoCAD Extension Agent**: runs inside Autodesk AutoCAD.

### Online and offline status

An agent's online or offline state is determined in 2 ways that work together:

- **From the agent's own report**: when an agent reports in, it tells the OpenLM Platform whether it is online or offline.
- **From a connectivity check**: the OpenLM Platform runs a background check about once a minute. If the central [Agents Hub](/cloud/data-collection/agents_hub) becomes unreachable, all agents currently marked online are switched to offline.

When an agent goes offline, the OpenLM Platform also notifies downstream services to close that agent's open sessions (processes, dongles, and so on) so licenses are released instead of remaining stuck open. As a result, an agent that drops off the network, or whose machine shuts down, typically shows as offline within about a minute.

:::info
The Agents screen is not a live feed. It loads when you open the page and refreshes when you change a filter, sort, or page, or select **Refresh**. To see the latest online status and timestamps, select **Refresh**.
:::

### Activity timestamps

| Timestamp | What it means |
| --- | --- |
| **Last Report On** | The most recent time the agent reported in. This is the most reliable indicator of how recently the agent was alive. |
| **Current Machine Date** | The clock time on the agent's own machine at its last report. This can differ from server time if the PC clock is off. |
| **User Idle Duration** | How long the user at that machine has been idle. An empty or zero value means the user is, or was, active. |
| **Last Process List Update On** | The last time the agent reported activity for a monitored application or process. |

## Prerequisites

- Install and connect at least 1 Workstation Agent.

## Install and connect Workstation Agents

Follow these steps to install Workstation Agent and connect it to your system:

:::tip
For the full install, authorization, and at-scale deployment reference, see the [Workstation Agent](/cloud/data-collection/workstation-agent) component page.
:::

1. Prepare the end-user workstation according to the [system requirements](/cloud/deployment-operations/system-requirements).
2. Download Workstation Agent from the [OpenLM Downloads page](https://www.openlm.com/downloads/).
3. Run Workstation Agent installers and accept the License Agreement, then select **Next**.
4. Select extensions relevant to your installed applications (leave unchecked if none apply), then select **Next**.
5. Select an installation path or keep the default (recommended), then select **Next**.
6. Select your deployment type (**Cloud** or **On-premises**), then select **Next**.

**For both Cloud and On-premises deployments:**

7. Select whether to allow end-users to access their Personal Dashboard (such as the license repository), then select **Next**.

**For On-premises deployments only:**

8. Select whether to activate **Dongle Monitoring**, then select **Next**.
9. Enter your system's Fully Qualified Domain Name (**FQDN**) followed by `/agents-hub` in the host name field, and ensure connectivity through Port 443.



**For both Cloud and On-premises deployments:**

10. Import the **Agent Authorization File** issued from Identity, then select **Next**.
11. Select **Finish** to complete installation.



### Prepare the agent authorization file

Your system uses OAuth authentication and requires each component to authenticate before connecting:

1. On the **Home Page**, select **Identity**.
2. Select **Add Client**, then select **Agent** as the client type.
3. Select **Save**, then download the generated **Agent Authorization File**.

## Access the console

Agent Activity Manager runs inside the OpenLM Platform in your web browser. You reach it under your OpenLM cloud address:

```text
https://cloud-XX.openlm.com/agent-activity-manager/#/agents
```

where `cloud-XX` is your specific cloud instance (for example, `cloud-us`). The Agents screen is the console's home page. Any unrecognized address inside the console returns you to it.

### Log in

Agent Activity Manager has no separate login form. Login is handled by the OpenLM Platform's single sign-on:

1. Open Agent Activity Manager from your OpenLM Platform account.
2. If you are not already logged in, your browser is redirected to the OpenLM login page. Complete login there.
3. You are returned to the console, which opens the Agents page automatically.

:::note
Your identity is carried by a secure session managed by the OpenLM Platform. No password is entered on this screen and no login token is stored in your browser. If your session expires, you are redirected to log in again.
:::

## Roles and permissions

What you can do in the console depends on your OpenLM role. The console has 2 roles, plus the global OpenLM account-administrator role:

| Capability | Administrator | Viewer (read-only) |
| --- | --- | --- |
| View the Agents list, all columns and data | Yes | Yes |
| Search, filter, date-range, refresh, select columns | Yes | Yes |
| Upgrade agents (upload installer) | Yes | No |
| Restart all Workstation Agents | Yes | No |
| Remove (delete) agents | Yes | No |

Administrators hold the Agent Activity Manager admin role (or a global OpenLM account-admin role) and see the operational action buttons (**Restart All Workstation Agents**, **Upgrade Agents**, and **Delete**). Viewers see exactly the same agent list and information, but those action buttons are hidden from them.

A signed-in user who holds neither role is shown a "Not enough permissions" screen instead of the Agents list, and the navigation sidebar is hidden until a role is granted.

:::tip
If you need to run agent operations but don't see the action buttons, you most likely have the Viewer role. Ask your OpenLM administrator to grant you the Agent Activity Manager admin role.
:::

## Tour of the console

After you log in, the Agents screen opens. The following screenshot shows the main areas of the console.

![The Agent Activity Manager console, showing the header with the signed-in account, the navigation sidebar with the Agents item under Management, the blue auto-upgrade banner, the action toolbar with Restart All Workstation Agents, Upgrade Agents, and Delete buttons, the Refresh, Filter, and Search controls, the Last Reported On date filter, and the agents table](/services/agent_activity_manager/agents-console.png)
*The Agents console*

- **Header**: shows the application title "Agent Activity Manager", your signed-in account (with a menu for **Log Out**), and a button that opens the platform-wide navigation.
- **Navigation sidebar**: contains a single entry, **Agents**, under the **Management** group. It can be collapsed with the **«** button. The sidebar is shown only to users who have access.
- **Page title**: "Agents", with an information icon whose tooltip reads "Detailed view of all Workstation Agents connected to the OpenLM system."
- **Action toolbar (administrators only)**: **Restart All Workstation Agents**, **Upgrade Agents**, and **Delete**.
- **Search and filter controls**: a **Refresh** button, a **Filter** (funnel) toggle, and a **Search** box.
- **Agents table**: the list of agents, with row check boxes, sortable columns, a column chooser (**⋮**), and a paginator.

## The Agents list

The table shows each agent on its own row. Because the table has many columns, it scrolls horizontally. The following screenshot shows the columns further along, including **Agent Version** and **Agent Type**.

![The agents table scrolled to show the Agent Version, Agent Type, Current Machine Date, and Last Process List Update On columns, with an upward-arrow upgrade marker next to the versions queued for upgrade](/services/agent_activity_manager/agents-table-columns.png)
*Additional columns of the agents table. An upward-arrow marker next to the version indicates an agent that is queued for upgrade.*

### Columns

| Column | Shows | Notes |
| --- | --- | --- |
| **Hostname** | The machine or host name reported by the agent. | Always shown; filterable. |
| **Username** | The user account associated with the agent. | Always shown; filterable. |
| **Last Report On** | When the agent most recently reported in. | Always shown; sortable; filtered by the date picker. |
| **IP** | The IP address reported by the machine. | Always shown; filterable. |
| **User Idle Duration** | How long the user has been idle. | Optional column; not sortable. |
| **Online** | Whether the agent is currently online. | Always shown; a check mark means online, blank means offline. |
| **Agent Version** | The installed agent software version. | Optional column; filterable; shows an upgrade marker when queued. |
| **Agent Type** | Workstation, Browser, or AutoCAD Extension Agent. | Always shown; filterable. |
| **Current Machine Date** | Local date and time on the agent's machine. | Optional column; sortable. |
| **Last Process List Update On** | Last time the agent reported monitored-process activity. | Optional column; sortable. |

:::note
The **Online** column shows a check mark for agents that are online and stays blank for agents that are offline. No separate "offline" icon exists. Date and time values use your configured date format and time zone; empty values appear blank. **User Idle Duration** is shown in seconds, minutes, or hours (for example, "0 second(s)", "45 minute(s)", "198 hour(s)").
:::

### Sort, select columns, and page through the list

- **Sort**: select a sortable column header to sort by it.
- **Show or hide columns**: use the column chooser (the **⋮** menu in the header row) to show or hide the optional columns (**User Idle Duration**, **Agent Version**, **Current Machine Date**, and **Last Process List Update On**). The other columns are always shown.
- **Paging**: the table loads 25 agents per page by default; use the paginator to move between pages.
- **Layout is remembered**: your column choices are saved in your browser for next time.
- **Refresh**: select the **Refresh** button to reload the list with the latest data. Refreshing also clears your current selection.

## Find agents with filters and search

Select the **Filter** (funnel) button in the toolbar to turn the filterable column headers into drop-down filters. Select it again to hide the filters, which also clears all filter selections at once.

![The agents table with filters turned on, showing the Hostname, Username, and IP column headers turned into drop-down filters](/services/agent_activity_manager/column-filters.png)
*With filters turned on, each filterable column header becomes a drop-down with a search box and multiselect check boxes.*

With filters turned on, each filterable column header (**Hostname**, **Username**, **IP**, **Online**, **Agent Version**, and **Agent Type**) becomes a drop-down with a search box and multiselect check boxes. The **Hostname**, **Username**, **IP**, and **Agent Version** filters load their options on demand from the server. The **Last Report On** column has no header filter. It is filtered by the separate **Last Reported On** date picker.

### Available filters

| Filter | Type | Behavior |
| --- | --- | --- |
| **Hostname** | Multiselect | Options loaded from the server; type to search. |
| **Username** | Multiselect | Options loaded from the server; type to search. |
| **IP** | Multiselect | Options loaded from the server; type to search. |
| **Agent Version** | Multiselect | Options loaded from the server; type to search. |
| **Online** | Multiselect | Two fixed options: "Online only" and "Offline only". |
| **Agent Type** | Multiselect | Three fixed options: AutoCAD Extension Agent, Browser Agent, and Workstation Agent. |
| **Last reported on** | Date range | Limits the list to agents whose last report falls in the chosen range; future dates can't be selected. |

Filters apply automatically as you change them (the console has no separate "Apply" button), and any filter change returns you to the first page. Filters combine restrictively: an agent must match every active filter. Values within a single filter combine inclusively: for example, 2 selected host names return agents on either host.

### The Search box

:::info
The Search box highlights, it does not filter. Typing in the Search box highlights matching text in the rows currently shown; it does not reduce the list or change the total count. To narrow the list, use the column filters or the date range instead.
:::

## Select agents for bulk actions

Bulk actions (**Upgrade** and **Delete**) act on the agents you select. Use the row check boxes to select agents. The header check box selects every agent on the current page.

When you select the whole page, a blue bar appears with a message such as "25 agents on this page were selected" and a "Select All 50 Agents" link. After you select that link, the bar reads "All 50 agents were selected" with a "Clear Selection" link, and the action applies to every agent matching your current filter.

![The agents table with all rows selected, a blue bar reading "All 50 agents were selected" with a Clear Selection link, and the Upgrade button reading Upgrade 50 Agents](/services/agent_activity_manager/select-all-agents.png)
*Global selection: all 50 agents are selected, and the Upgrade button updates to "Upgrade 50 Agents".*

The console has 2 selection modes, and they change what a bulk action targets:

- **Specific agents**: the exact rows you checked.
- **All matching agents**: after choosing "Select All N Agents", the action targets every agent that matches your current **Hostname**, **Username**, **IP**, and **Agent Version** filters, even those on other pages. With no filter applied, this means all agents.

:::note
Changing a filter, changing the date range, or refreshing clears your current selection. When you use "Select All", only the **Hostname**, **Username**, **IP**, and **Agent Version** filters scope the bulk action; the **Online**, **Agent Type**, and date filters are not applied to the action itself.
:::

## Upgrade agents

:::note
Upgrading is an administrator action.
:::

Upgrading rolls out a newer agent version using an OpenLM agent installer (`.msi`) that you upload. The version you upgrade to is taken automatically from the installer's file name; there is no version to type in.

### Step by step

1. **Select the agents to upgrade.** Check specific rows, or use "Select All N Agents" to target everything matching your filter. The **Upgrade** button stays unavailable until you select at least 1 agent (hovering over it shows "Select at least one item").
2. **Select the Upgrade button.** Its label shows how many agents the action affects, for example "Upgrade 50 Agents". The **Upgrade Agents** dialog opens.
3. **Upload the installer.** Select **Upload File**, then select the OpenLM agent `.msi`. Upload starts automatically and a progress bar shows "Uploading… NN%". The file is sent in chunks, so large installers upload reliably.
4. **Wait for success.** On a successful upload the file name turns blue. If the file is rejected, the file name turns red and the reason is shown beneath it.
5. **Select Confirm.** The upgrade request is sent for your selected agents and the dialog closes. (**Confirm** has no effect until a file has uploaded successfully.) Select **Cancel** to stop instead.

![The Upgrade Agents dialog with the text "Upload an agent installation '.msi' file. Selected agents will be upgraded.", an Upload File button, and Cancel and Confirm buttons](/services/agent_activity_manager/upgrade-agents-dialog.png)
*The Upgrade Agents dialog. Upload the installer with Upload File, then select Confirm.*

### Installer requirements

The server validates the installer before accepting it. The file name must:

- end in `.msi`
- contain both "openlm" and "agent" (not case-sensitive)
- contain a 4-part version number such as `25.9.26.1338`

If a file does not meet these rules, the upload is rejected with a message such as those listed in [On-screen messages](#on-screen-messages). A file that is not a `.msi` is ignored without an error.

:::warning
Upgrading is asynchronous. Selecting **Confirm** queues the upgrade and turns on [auto-upgrade](#auto-upgrade). Agents are upgraded when they next report in, not instantly. Agents queued for upgrade show a small upgrade marker in the **Agent Version** column with the tooltip "This Agent was selected for upgrade." On success, the message "Agents upgrade request was sent successfully" appears.
:::

## Auto-upgrade

Starting an upgrade turns on auto-upgrade for the uploaded version. While auto-upgrade is on, any agent that reports in is automatically upgraded to that version, including agents that were not part of your original selection. A blue banner shows the active version, for example: "Auto-upgrade to "26.6.24.1528" version is enabled".

### Turn off auto-upgrade

1. Select **Turn Off** on the auto-upgrade banner.
2. A confirmation dialog titled "Turn off Auto-upgrade" appears. Confirm to stop.

:::warning
When you turn auto-upgrade off, agents that were already upgraded keep the new version, but to run the process again you need to upload the `.msi` file again. On success, the message "Auto-upgrade was stopped successfully" appears.
:::

## Restart all Workstation Agents

:::note
This is an administrator action, and it always targets all Workstation Agents. You do not select individual agents.
:::

Select **Restart All Workstation Agents** and confirm to send a restart command to every Workstation Agent. A confirmation dialog explains the impact before anything happens.

![The Restart Workstation Agents confirmation dialog warning that restarting will interrupt data reporting and close all active sessions, with Cancel and Confirm buttons](/services/agent_activity_manager/restart-confirmation.png)
*The restart confirmation dialog.*

On success, the message "Agents restart request was sent successfully" appears.

## Remove agents

:::note
This is an administrator action.
:::

Use **Delete** to remove obsolete agent records from the console. Select the agents to remove (specific rows, or all matching agents through "Select All"), select **Delete**, and confirm. On success, the message "Agent information was deleted successfully" appears and the list reloads.

:::tip
Deleting removes the agent's record from the console view. If the agent is still installed and active, it reports in again and reappears in the list.
:::

## Log out

Open the account menu in the header (it shows your signed-in account) and select **Log Out**. Logging out is handled by the OpenLM Platform and returns you to the Agent Activity Manager start page.

## Troubleshooting

| Question or symptom | What to do |
| --- | --- |
| A "Not enough permissions" screen appears. | Your account has neither the Admin nor the Viewer role for Agent Activity Manager. Ask your OpenLM administrator to grant a role. |
| The list is visible, but the Restart, Upgrade, and Delete buttons are not. | You have the read-only Viewer role. Ask your administrator for the Agent Activity Manager admin role. |
| The online status or timestamps look out of date. | The screen is not live. Select **Refresh** (or reapply a filter). Connectivity-based status changes are detected about once a minute. |
| An agent shows as offline but the machine is on. | The agent might not have reported recently, or the Agents Hub was briefly unreachable. It returns to online after its next successful report. |
| The installer upload failed. | Check the message under the file name and confirm the file name ends in `.msi` and contains "openlm", "agent", and a 4-part version number. |
| Typing in Search doesn't shrink the list. | Search only highlights matches. Use the column filters or the date range to narrow the list. |
| The Upgrade button is greyed out. | Select at least 1 agent first (hovering over the button shows "Select at least one item"). |
| "Failed to initialize navigation" appears. | The platform-wide navigation failed to load. Refresh the page. If the problem persists, contact your OpenLM administrator. |

## On-screen messages

### Confirmations

| Action | Confirmation text |
| --- | --- |
| Restart all Workstation Agents | "Restarting all workstation agents will interrupt their current data reporting and close all active sessions, including processes, dongles, etc. Please, confirm to proceed." |
| Turn off auto-upgrade | "If the upgrade is turned off any agents already upgraded will retain the new version. To run the process again you will need to upload '.msi' file again. Please, confirm to continue." |

### Success messages

- "Agents upgrade request was sent successfully"
- "Agents restart request was sent successfully"
- "Agent information was deleted successfully"
- "Auto-upgrade was stopped successfully"

### Installer upload errors

| Message | Meaning |
| --- | --- |
| Only .msi files are allowed. | The file is not a `.msi` installer. |
| File must be an OpenLM Agent MSI. | The file name must contain both "openlm" and "agent". |
| Failed to parse Agent version from filename. | The file name has no 4-part version number (for example, `25.9.26.1338`). |
| File chunk is empty. / File name is required. | The upload was incomplete or malformed; try the upload again. |
| File upload failed. | A general upload failure with no specific server detail; try again. |

### Empty state

When no agents match your filters (or none exist), the table shows: "There are no active agents".

## Glossary

| Term | Definition |
| --- | --- |
| **Agent** | OpenLM software installed on a user's machine that monitors usage and reports activity to the OpenLM Platform. |
| **Workstation, Browser, and AutoCAD Extension Agent** | The 3 agent types, distinguished by where the agent runs. |
| **Online and offline** | Whether the agent is currently reporting in. Shown as a check mark (online) or blank (offline). |
| **Last Report On** | The most recent time an agent reported in. |
| **Auto-upgrade** | A mode, turned on by starting an upgrade, in which agents are upgraded automatically to the uploaded version as they report in. |
| **Administrator and Viewer** | The 2 console roles. Administrators can act on agents, and Viewers have read-only access. |
| **Bulk action** | An action (Upgrade or Delete) applied to multiple selected agents at once. |
| **Global selection** | Selecting every agent matching the current filter ("Select All N Agents"), rather than only the visible page. |
