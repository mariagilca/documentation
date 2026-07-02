---
id: license-access-control
title: License Access Control (LAC)
sidebar_position: 1
slug: lac
description: "Approve license servers, define access rules, schedule deployments, and monitor results with License Access Control (LAC) in OpenLM Platform."
---

License Access Control (LAC) lets you manage software license allocations from a single web interface. It is built for license administrators who approve license servers, define access rules, schedule deployments, and monitor results.

## What License Access Control does

Software licenses are often controlled in many different places: engineering teams edit option files by hand on FLEXlm or RLM servers, while other teams assign seats through separate vendor portals for cloud products. This is slow, error-prone, and hard to audit.

License Access Control gives you one place to control all of it. You define who can use which licensed features as a set of readable rules, and License Access Control translates those rules into the exact format each license server expects and delivers them for you. You work with clear actions such as Grant Access, Deny Access, and Reserve Seats instead of raw option-file syntax.

With License Access Control, you can do the following:

- Approve the license servers you want to manage, and monitor the rest.
- Create access rules that grant, deny, reserve, or limit licensed features for specific users, groups, and workstations.
- Schedule when rules deploy, so access matches your working hours or maintenance windows.
- Deploy changes on demand, on a schedule, or automatically when directory groups change.
- Preview the exact configuration before it reaches a server, and review a full deployment history.

## How License Access Control works

License Access Control separates what you want (your rules) from how each server enforces it. When you deploy, the service compiles your rules into the correct form for the target server and sends them out. Two deployment models cover both on-premises and cloud licensing:

- **On-premises license managers** (for example, FLEXlm and RLM) receive a complete option file that reflects all active rules for that server.
- **Software as a service (SaaS) platforms** receive individual allocation changes through the vendor API. License Access Control resolves each user's identity (for example, mapping a directory user name to the email address the vendor requires) before it sends the change.

Deployment is asynchronous. When you deploy, License Access Control adds a job to a deployment queue, validates your rules against your directory, and pushes the result to the server in the background. You track progress and results in the Deployment area.

:::note
License Access Control validates every rule against your directory before it deploys. Rules that point to a deleted, disabled, or empty directory entity are skipped so that a single bad entry does not block the rest of the deployment.
:::

### Supported license managers and platforms

License Access Control supports the license server types in the following table. The interface shows the type identifier in the License Manager Type column. Your available types depend on your OpenLM deployment.

| Type (as shown) | Platform | Deployment model |
|---|---|---|
| [FLEXlm](../data-collection/connect-license-managers/engineering-lms/flexera-flexnet-flexlm) | On-premises license manager | Full option file |
| [RLM](../data-collection/connect-license-managers/engineering-lms/reprise-rlm) | On-premises license manager | Full option file |
| [DSLS](../data-collection/connect-license-managers/engineering-lms/dsls) | On-premises license manager | Full option file |
| [RMS](../data-collection/connect-license-managers/engineering-lms/sentinel-rms) | On-premises license manager | Full option file |
| [LMX](../data-collection/connect-license-managers/engineering-lms/lm-x) | On-premises license manager | Full option file |
| [AutodeskCloud](../data-collection/connect-license-managers/saas-platforms/autodesk-cloud) | Autodesk cloud licensing (SaaS) | Per-rule API change |
| [LinkedInSales](../data-collection/connect-license-managers/saas-platforms/linkedin-sales-navigator) | LinkedIn Sales Navigator (SaaS) | Per-rule API change |
| ClaudeAi | Claude AI (SaaS) | Per-rule API change |
| CursorAi | Cursor AI (SaaS) | Per-rule API change |

OpenLM adds support for more SaaS platforms over time. The types available to you appear in the interface.

## What you need

- Access to the OpenLM Platform, with License Access Control activated for your organization.
- A LAC Admin or LAC Viewer role. Administrators can make changes; viewers can review information but cannot make changes. For details, see [Roles and permissions](#roles-and-permissions).
- One or more license servers that OpenLM monitors, so that License Access Control can discover them.
- For on-premises license servers, [Broker](../getting-started/install-broker) installed on the license server, with **Watch option file** turned on in the Broker configuration. License Access Control cannot discover or deploy to a server whose option file Broker does not watch.

## Roles and permissions

Access to License Access Control depends on your assigned role. The features activated for your organization also determine which actions are available.

| Role | What you can do |
|---|---|
| LAC Admin | Full access. Approve and deny servers, create and edit rules and schedules, deploy configurations, and change settings. |
| LAC Viewer | Read-only access to the server lists (Server Allocations, Pending Servers, and Denied Servers), the Deployment area, and the Settings page. Viewers cannot open an individual asset to see its Rules, Schedules, or Settings tabs, and cannot make changes. |

If you open License Access Control without either role, the interface shows a message that you do not have enough permissions. Contact your OpenLM administrator to request access.

## Key terms

The following terms appear throughout this guide and the interface:

| Term | Meaning |
|---|---|
| Asset | A single license server that License Access Control tracks. Assets appear on the Server Allocations page. |
| Mode | How you track an asset. Managed assets can be configured and deployed. Read-Only assets are monitored only. |
| Rule | A single access statement, made up of an action, one feature, and one target entity, with an optional schedule. |
| Action | What a rule does, such as Grant Access, Deny Access, Reserve Seats, or Limit Usage. |
| Feature | A licensed product or capability that a rule applies to. |
| Entity | The target of a rule: a user, user group, workstation, or workstation group. |
| Schedule | A named weekly plan that controls when a set of rules deploys. |
| Deployment | The act of pushing an asset's rules to its license server. |
| Deploy type | How rules deploy to a server: Per Asset (the whole asset at once, used by on-premises license managers) or Per Rule (individual changes, used by SaaS platforms). |
| Option file | The configuration file that on-premises license managers read to enforce access. |
| Directory | Your source of users and groups (for example, Active Directory), synchronized to OpenLM. |
| Workstation Agent | The OpenLM agent installed on a user's computer. Optional enforcement can require it before user rules deploy. |

## Get started

### Open License Access Control

1. Sign in to the OpenLM Platform.
2. In the OpenLM navigation, select **License Access Control**.

License Access Control opens on the Server Allocations page, which lists the license servers you manage and monitor.

### Explore the interface

License Access Control has 5 main areas. Move between them from the OpenLM navigation.

| Area | Purpose |
|---|---|
| Server Allocations | The home page. View, manage, deploy, and preview the license servers you have approved. |
| Pending Servers | Review newly discovered license servers and approve or deny them. |
| Denied Servers | Review servers you denied, and restore any that need another look. |
| Deployment | Monitor deployment jobs in progress, upcoming scheduled runs, and past results. |
| Settings | Configure organization-wide options, such as Workstation Agent Enforcement. |

### The License Access Control workflow

Managing access with License Access Control follows a repeatable path. Complete the steps in order the first time you configure a server; afterward, you adjust rules and schedules as needed.

1. **Approve a server.** In Pending Servers, approve a discovered license server as Managed so that you can configure it.
2. **Add rules.** On the server's Rules tab, define who can use which features.
3. **Schedule deployments** (optional). On the Schedules tab, control when specific rules are active.
4. **Deploy.** Push your rules to the license server on demand, on a schedule, or automatically on group changes.
5. **Monitor.** In the Deployment area, confirm that deployments succeed and review their history.

### Understand asset modes

You set the mode when you approve a server. To change how you track a server later, delete the asset, then approve the server again from Pending Servers when OpenLM next discovers it.

| Mode | What it means |
|---|---|
| Managed | Full management access. You can add rules, create schedules, and deploy configurations to the server. |
| Read-Only | The server is monitored only. You can view it, but you cannot change its allocations or configuration. |

## Approve and deny license servers

OpenLM automatically discovers license servers in your environment and lists them on the Pending Servers page. Before you can manage a server, you approve it. You can also deny servers you do not want to track, and restore them later if needed.

### Review pending servers

1. In the navigation, select **Pending Servers**.
2. Review the discovered servers. Each row shows the Host Name, Port, Vendor Name, and License Manager Type.
3. To narrow the list, select the filter icon and set filters, or enter text in the search box.
4. To see the raw content a server reported, select the row. The content opens in a preview panel.

![The Pending Servers page lists discovered license servers and previews the content the selected server reported.](/services/lac/pending-servers.png)
*Figure 1. The Pending Servers page. Select a row to preview the content a server reported.*

### Approve a server

Approve a server to move it to the Server Allocations page for management or monitoring.

1. In Pending Servers, find the server to approve.
2. In the row, select the approve icon (a check mark). The Approve asset dialog opens.
3. Select an approval mode:
   - **Managed** — Full management access. Select this option to add rules and deploy configurations.
   - **Read-Only** — The server is monitored only. You cannot modify its allocations or configuration.
4. Select **Save**.

The server moves to the Server Allocations page. A confirmation message reads *Asset was approved successfully*.

:::note
When you approve a license server as Managed, License Access Control takes over the server's option file, and Broker's own option-file monitor for that server disconnects. Broker continues to monitor the license server itself; only the option-file watch is handed over.
:::

### Deny a server

Deny a server to keep it out of License Access Control. Denied servers move to the Denied Servers page.

1. In Pending Servers, find the server to deny.
2. In the row, select the deny icon.

:::warning
Denying a server takes effect immediately, without a confirmation prompt. If you deny a server by mistake, restore it from the Denied Servers page.
:::

### Restore a denied server

If you need to re-evaluate a server you denied, restore it to the pending list.

1. In the navigation, select **Denied Servers**.
2. Select the checkbox for one or more servers to restore.
3. Select **Restore To Pending**.

The servers return to the Pending Servers page, where you can approve or deny them again.

![The Denied Servers page lists servers you previously denied, with a Restore To Pending action.](/services/lac/denied-servers.png)
*Figure 2. The Denied Servers page. Select servers, then choose Restore To Pending to re-evaluate them.*

## Work with server allocations

The Server Allocations page is your home base. It lists every approved license server (asset) with its current status, rule and schedule counts, and most recent deployment result.

![The Server Allocations page lists every approved license server with its rules, schedules, mode, and last update.](/services/lac/server-allocations.png)
*Figure 3. The Server Allocations page lists every approved license server with its rules, schedules, mode, and last update.*

### View server allocations

Each row on the Server Allocations page shows the following columns:

| Column | Description |
|---|---|
| Status | Icons that flag a server you cannot deploy to, such as one that was deleted or disabled. See [Understand asset status icons](#understand-asset-status-icons). |
| Server Name | The name of the license server. Select it to open the server's page in OpenLM. |
| License Manager Type | The server type, such as FLEXlm, RLM, or AutodeskCloud. |
| Vendor Name | The license vendor. |
| Rules | The number of rules defined for the asset. Select the number to open the Rules tab. |
| Schedules | The number of schedules defined for the asset. Select the number to open the Schedules tab. |
| Mode | Managed or Read-Only. |
| Last Update | When the asset last changed. |
| Last Deployment Status | The result of the most recent deployment, or *Deployment in progress* while a deployment runs. |

Use the toolbar to refresh the list, filter by column, or search across the page.

### Understand asset status icons

An icon in the Status column means the server needs attention before you can deploy to it.

| Icon | Meaning | What to do |
|---|---|---|
| Delete (server removed) | The license server was deleted. Deployment is not possible. | Delete the asset, or restore the license server in OpenLM. |
| Disabled (server disabled) | The license server is disabled. | Enable the license server to make deployment available. |

### Preview an asset's allocation file

Preview an asset to see the exact configuration content License Access Control generates for it, before you deploy.

1. On the Server Allocations page, find the asset.
2. In the row, select the preview icon.

The File preview dialog shows the generated content line by line. Close the dialog when you finish.

### Open an asset to manage it

Open a Managed asset to work with its rules, schedules, and settings.

1. On the Server Allocations page, find a Managed asset.
2. In the row, select the manage icon, or select the value in the Rules or Schedules column.

The asset's detail page opens. A context card at the top summarizes the server — its vendor, license manager type, mode, number of schedules, number of deployed rules, and last update. Below the card, 3 tabs organize your work: Rules, Schedules, and Settings.

![An asset's detail page shows the context card, the Deploy button, and the Rules, Schedules, and Settings tabs.](/services/lac/asset-detail.png)
*Figure 4. An asset's detail page shows the context card, the Deploy button, and the Rules, Schedules, and Settings tabs.*

### Delete an asset

Delete an asset to stop managing its server in License Access Control.

1. On the Server Allocations page, select the asset.
2. Select **Delete Asset**.
3. In the confirmation dialog, confirm the deletion.

:::warning
Deleting an asset removes all schedules and rules associated with it. This action cannot be undone.
:::

## Create and manage rules

A rule is a single access statement for a license server. Each rule combines an action (what to do), one feature (the licensed product), and one target entity (who or what it applies to). You can also assign a rule to a schedule that controls when it deploys.

### About rule actions and categories

License Access Control groups actions into categories so that related controls stay together. The interface shows friendly action names; the underlying option-file keywords differ by server type. The most common actions are the following:

| Category | Common actions | Use it to |
|---|---|---|
| Access Control | Grant Access, Deny Access, Grant All Access, Deny All Access, Allow Access | Control who can and cannot use a feature. |
| Seat Reservations | Reserve Seats | Guarantee a number of seats for specific users or groups. |
| Usage Limits | Limit Usage, Idle Timeout, Global Timeout, Max Overdraft, Linger Duration | Cap concurrent use, reclaim idle seats, and control borrowing. |
| Server Settings | Server Timezone, Log Rotation, Debug Log, Report Log, and more | Configure server-level behavior and logging. |
| Comments | Comment | Add notes to the generated configuration. |

:::note
The actions available for a rule depend on the license manager type. License Access Control shows only the actions that the selected server supports. For the full list of action names, see [Rule actions reference](#rule-actions-reference).
:::

### Entity types

An entity is the target of a rule. The available entity types depend on the server type.

| Entity type | Applies to |
|---|---|
| User | An individual user. |
| User Group | A directory group of users. |
| Workstation | A single computer (host). |
| Workstation Group | A group of computers. |
| IP Address, IP Group, IP Range, IP Range Group | Network addresses or ranges. |
| Display Name, Project | Vendor-specific targets used by some server types. |

### Add a rule

Add a rule to grant, deny, reserve, or limit a feature for one or more targets. When you save, License Access Control creates one rule for each feature-and-entity combination you selected, so you can configure many rules at once.

1. Open the Managed asset, then select the **Rules** tab.
2. Select **Add Rule**. The rule builder opens.
3. From the **Action** list, select what the rule does, such as Grant Access or Reserve Seats.
4. If a **License Type** list appears, select a license type. Some server types, such as DSLS, scope rules by license type.
5. If the action needs a value, enter it in the field that appears. For example, enter the number of seats to reserve, a maximum number of concurrent uses, or a duration and unit.
6. Select **Features**, then select one or more features the rule applies to. Selected features appear in the Selected Features panel.
7. Select **Target Entities**, select an **Entity Type**, then select one or more entities. Selected entities appear in the Selected Entities panel.
8. (Optional) From the **Schedule** list, select a schedule to control when the rule deploys.
9. Select **Save**.

A confirmation message reports how many rules were added. The new rules appear on the Rules tab and are ready to deploy.

![The rule builder prompts you to select an action, then choose features, target entities, and an optional schedule.](/services/lac/add-rule.png)
*Figure 5. The rule builder. Select an action, then choose one or more features, target entities, and an optional schedule.*

:::tip
To apply the same action to several features and audiences at once, select multiple features and multiple entities before you save. License Access Control creates a separate rule for each combination.
:::

### Edit a rule

1. On the **Rules** tab, find the rule.
2. In the row, select the edit icon.
3. Change the action, value, features, entities, or schedule, then select **Save**.

:::note
You cannot edit a rule that is currently deployed, or one that is marked for deletion on the next deployment. To change a deployed rule, duplicate it and edit the copy, or delete it and create a new rule.
:::

### Duplicate a rule

Duplicate a rule to use it as a starting point for a new one.

1. On the **Rules** tab, find the rule.
2. In the row, select the duplicate icon.
3. Adjust the copied rule in the rule builder, then select **Save**.

If you duplicate a rule that is currently deployed, License Access Control adds the new rule to the undeployed list. The original rule stays deployed.

### Delete rules

1. On the **Rules** tab, select the checkbox for one or more rules.
2. Select **Delete**.
3. Review the list of rules in the confirmation dialog, then select **Confirm**.

:::note
If you delete a rule that is currently deployed, License Access Control marks it as *Pending Delete* and removes it from the server during the next deployment.
:::

### Filter rules and show only deployed rules

- To narrow the list, select the filter icon and filter by Rule, Feature, Entity Type, Entity Name, Additional Key (a version or product identifier for the feature), or Category. You can also search across the tab.
- To hide rules that are not on the server yet, select **Show currently deployed only**.

### Understand rule status icons

Icons next to a rule flag conditions that stop it from deploying. Resolve these before you deploy so the rule takes effect.

| Icon | Meaning |
|---|---|
| Pending delete | The rule is marked for deletion and will be removed on the next deployment. |
| Server unavailable | The license server was deleted or disabled, so the rule cannot deploy. Delete the rule, or restore the license server. |
| User or group problem | The user or group the rule targets was deleted from, or disabled in, your directory. The asset or schedule will not deploy until you restore or enable the entity. |
| Empty group | The group the rule targets has no members. The asset or schedule will not deploy until the group contains users. |

A rule also shows the directory status of its target, such as Valid, Deleted from directory, or Empty group. For the full list of statuses and their meanings, see [Directory entity status reference](#directory-entity-status-reference).

### View the schedules assigned to a rule

On the Rules tab, the Schedule column shows how a rule is scheduled:

- If a rule belongs to 1 schedule, the schedule name appears as a chip.
- If a rule belongs to more than 1 schedule, a number appears. Select the number to open the Schedules dialog and see every schedule and its frequency.

## Schedule rule deployments

A schedule bundles a set of rules with a deployment configuration — the days and time when those rules deploy to the license server. Enabling a schedule queues its rules for automatic deployment at the configured time; a disabled schedule stays dormant. Use schedules to align access with working hours, shifts, or maintenance windows.

Only 1 schedule is active on an asset at a time. Deploying a schedule makes it the active schedule and replaces the rule set currently on the server.

![The Schedules tab shows each schedule as a card with its days, time, assigned rules, and active status.](/services/lac/schedules-tab.png)
*Figure 6. The Schedules tab shows each schedule as a card with its days, time, assigned rules, and active status.*

:::warning[Important]
When a schedule deploys — automatically at its configured time, or on demand — it **replaces** the rule set currently on the server with the schedule's assigned rules. Rules that are not part of the deploying schedule are removed from the server by that deployment (see [Remove rules from a server](#remove-rules-from-a-server)). A disabled schedule, by contrast, changes nothing by itself: the configuration already on the server stays in effect until the next deployment replaces it.
:::

### Add a schedule

1. Open the Managed asset, then select the **Schedules** tab.
2. Select **Add Schedule**.
3. In the **Schedule Name** field, enter a name.
4. Set the toggle to **Enabled** to queue the schedule for automatic deployment at its scheduled time. Leave it **Disabled** to keep the schedule dormant.
5. On the **Schedule** tab, select the days of the week for the deployment, then set the deployment time. A summary confirms your selection.
6. Select the **Rules** tab, then select the checkbox for each rule to assign to the schedule. The Option File Preview panel shows the option file content generated for your selection.
7. Select **Save**.

The schedule appears on the Schedules tab as a card that shows its name, day range, and time, along with an *Active now* or *Next* indicator.

![The Add Schedule form with a name field, an Enabled toggle, day-of-week buttons, and a time picker.](/services/lac/add-schedule.png)
*Figure 7. The Add Schedule form: name the schedule, set its days and time, and assign rules on the Rules tab.*

### Edit a schedule

1. On the **Schedules** tab, find the schedule card.
2. Select the edit icon.
3. Change the name, status, days, time, or assigned rules, then select **Save**.

### Turn a schedule on or off

Set a schedule's toggle to **Enabled** or **Disabled** when you edit it. An enabled schedule is queued for automatic deployment at its scheduled time. A disabled schedule stays dormant: it does not deploy automatically, and you cannot deploy it on demand until you enable it.

### Delete a schedule

1. On the **Schedules** tab, find the schedule card.
2. Select the delete icon.
3. In the confirmation dialog, confirm the deletion.

:::warning
Deleting a schedule cannot be undone. Deleting a schedule also removes all deployments planned for that schedule from the deployment queue and the Schedule tab of the Deployment area.
:::

### Deploy a schedule now

Deploy a schedule on demand to push its assigned rules to the license server immediately, without waiting for the scheduled time.

1. On the **Schedules** tab, find the schedule card.
2. Select the deploy icon.
3. In the confirmation dialog, confirm the deployment.

The schedule is added to the deployment queue and deploys shortly.

:::warning
Deploying a schedule makes it the active schedule for the asset and replaces the rule set currently deployed on the license server. Only 1 schedule is active per asset at a time. You can deploy a schedule only when it is enabled and has at least 1 rule assigned.
:::

## Deploy configurations

Deploying pushes an asset's rules to its license server. License Access Control queues the job, validates the rules against your directory, compiles them into the correct format for the server, and delivers them in the background. You can deploy on demand, on a schedule, or automatically when directory groups change.

### Deploy an asset manually

Deploy an asset to push all of its active rules to the license server.

1. Open the Managed asset, or find it on the Server Allocations page.
2. Select **Deploy** on the asset's detail page, or the deploy icon in the asset's row.
3. In the confirmation dialog, confirm the deployment.

A message confirms that the asset was added to the deployment queue. Track the result in the Deployment area.

### When you cannot deploy

The Deploy button is unavailable in these situations:

| Situation | How to resolve it |
|---|---|
| The asset has no rules. | Add at least 1 rule, then deploy. |
| The license server was deleted or disabled. | Restore or enable the license server, or delete the asset. |
| A schedule is disabled or has no rules (when deploying a schedule). | Enable the schedule and assign at least 1 rule. |

### Remove rules from a server

License Access Control does not have a separate undeploy control. To remove rules that are already on a server, use either of these approaches:

- **Delete the rules, then deploy the asset.** On the asset's Rules tab, select the rules to remove, then select **Delete**. Rules that are currently deployed are marked *Pending Delete*. Deploy the asset; the next deployment removes the deleted rules from the server.
- **Deploy a schedule that does not contain those rules.** Because deploying a schedule replaces the rule set on the server with the schedule's assigned rules, deploying a schedule without the unwanted rules removes them while keeping the rules themselves available for later use.

### Turn on automatic deployment on group change

Turn on automatic deployment for an asset so that License Access Control redeploys it whenever the membership of a targeted group changes. This keeps access current without manual deployments.

1. Open the Managed asset, then select the **Settings** tab.
2. Select **Edit Configuration**.
3. Turn on **Automatic Deployment on Group Change**.
4. Select **Save**.

![The asset's Settings tab shows the Edit Configuration button and the Automatic Deployment on Group Change toggle.](/services/lac/asset-settings.png)
*Figure 8. The Settings tab, where you turn on Automatic Deployment on Group Change for an asset.*

:::note
To avoid frequent, repeated deployments when a group changes many times in a short period, License Access Control waits for group membership to settle before it redeploys, so that a burst of changes results in a single deployment. By default, this wait time is 1 hour.
:::

### What happens during deployment

Each deployment runs through the same steps:

- License Access Control validates every rule against your directory and skips rules whose target was deleted, disabled, or is an empty group.
- For SaaS platforms, it resolves each user's required identity details, such as email address and name.
- If Workstation Agent Enforcement is on, it skips user rules for users who do not have an active Workstation Agent. See [Configure organization settings](#configure-organization-settings).
- It compiles the remaining rules and delivers them to the server, then records the result in the deployment history.

## Monitor deployments

The Deployment area tracks the full lifecycle of your deployment jobs in one place, separate from the per-asset tabs. It has 3 tabs: Queue, Schedule, and History.

### View the deployment queue

The Queue tab lists deployment jobs that are waiting or in progress. Each row shows the Server Name, Vendor Name, License Manager Type, Deploy Type (Per Asset or Per Rule), and Deployment Status. Refresh the tab to see the latest state.

![The Deployment area has Queue, Schedule, and History tabs; the Queue tab is shown with no jobs waiting.](/services/lac/deployment-queue.png)
*Figure 9. The Deployment area has Queue, Schedule, and History tabs. The Queue tab is shown here with no jobs waiting.*

### View scheduled deployments

The Schedule tab lists upcoming automated deployments, from both time-based schedules and automatic deployments triggered by group changes. Each row shows the Server Name, Vendor Name, License Manager Type, Deploy Type, and the Schedule To time of the next run.

### Review deployment history

The History tab lists past deployments from the last 7 days, with their results. Every deployment appears here, whether you started it manually, a schedule triggered it, or a group change triggered it.

| Column | Description |
|---|---|
| Server Name | The license server that was deployed to. |
| Host Name / Port | The server's connection details. |
| Vendor Name / License Manager Type | The vendor and server type. |
| Deployment Status | The result of the deployment. |
| Deployment Message | Details for a deployment, such as an error message when one fails. |
| Deployment Time | When the deployment ran. |

To see the exact content that was deployed, select the preview icon in the row. Use the filter and search controls to find specific deployments.

![The Deployment History tab lists past deployments with statuses such as Success, Failure, and Skipped.](/services/lac/deployment-history-tab.png)
*Figure 10. The Deployment History lists past deployments and their results, including Success, Failure, and Skipped.*

## Configure organization settings

The Settings page holds organization-wide options for License Access Control. Only administrators can change these settings; viewers can see the current state.

### About Workstation Agent Enforcement

Workstation Agent Enforcement makes License Access Control confirm that a user has the [OpenLM Workstation Agent](../getting-started/install-workstation-agent) installed before it deploys rules that target that individual user. Rules for users without an active agent are skipped during deployment.

- Enforcement affects only rules that target individual users with the actions Grant Access, Grant All Access, Allow Access, or Reserve Seats.
- Rules that target groups and workstations always deploy, regardless of agent status.
- The setting applies across your whole organization.

### Turn Workstation Agent Enforcement on or off

1. In the navigation, select **Settings**.
2. Turn **Workstation Agent Enforcement** on or off.
3. Select **Save**.

When you turn enforcement on, later deployments skip users without an installed Workstation Agent. When you turn it off, all user rules deploy regardless of agent status.

![The Settings page shows the Workstation Agent Enforcement toggle and a Save button.](/services/lac/organization-settings.png)
*Figure 11. The Settings page, where you turn Workstation Agent Enforcement on or off for your organization.*

## Reference

### Rule actions reference

License Access Control shows friendly action names in the interface. The following table lists them by category. The actions available for a specific rule depend on the license manager type.

| Action name | Category |
|---|---|
| Grant Access | Access Control |
| Deny Access | Access Control |
| Grant All Access | Access Control |
| Deny All Access | Access Control |
| Allow Access | Access Control |
| Grant Borrow Access / Deny Borrow Access | Access Control |
| Allow Borrow / Deny Borrow | Access Control |
| Grant All Roaming Access / Deny All Roaming Access | Access Control |
| Reserve Seats | Seat Reservations |
| Limit Usage | Usage Limits |
| Usage Limit | Usage Limits |
| Idle Timeout / Global Timeout | Usage Limits |
| Max Overdraft | Usage Limits |
| Linger Duration | Usage Limits |
| Max Borrow Duration / Borrow Low Water Mark | Usage Limits |
| Borrow Count Limit / Borrow Hours Limit | Usage Limits |
| Max Roaming Licenses / Max Roaming Days | Usage Limits |
| Queue Priority | Usage Limits |
| Exempt from Limits / Exempt All from Limits | Usage Limits |
| Server Timezone, Log Rotation, Debug Log, Report Log, Suppress Logging, Case-Insensitive Groups, and more | Server Settings |
| Comment | Comments |

### Entity types reference

| Entity type | Description |
|---|---|
| User | An individual user. |
| User Group | A directory group of users. |
| Workstation | A single computer (host). |
| Workstation Group | A group of computers. |
| IP Address | A single network address. |
| IP Group | A group of network addresses. |
| IP Range | A range of network addresses. |
| IP Range Group | A group of address ranges. |
| Display Name | A vendor-specific display name. |
| Project | A project target used by some server types. |

### Directory entity status reference

| Status | Meaning |
|---|---|
| Valid | The entity exists, is enabled, and is available. |
| Deleted from directory | The entity no longer exists in your directory. |
| Disabled in directory | The entity exists but is disabled. |
| Renamed | The entity was renamed in your directory. |
| Empty group | The group exists but has no members. |
| Security Risk (Group Transfer) | The entity moved between groups. |
| Validation Timeout | The directory check timed out. |

### Roles and permissions reference

| Role | Access |
|---|---|
| LAC Admin | Full read and write access to all License Access Control features. |
| LAC Viewer | Read-only access to the server lists, the Deployment area, and the Settings page. Cannot open an asset's detail tabs, approve servers, change rules or schedules, deploy, or change settings. |

## Frequently asked questions

### Why is the Deploy button unavailable?

The asset has no rules, or its license server was deleted or disabled. Add at least 1 rule, or restore or enable the license server. See [When you cannot deploy](#when-you-cannot-deploy).

### I deleted a rule, but it is still on the server. Why?

A deployed rule is marked *Pending Delete* and is removed during the next deployment. Deploy the asset to complete the removal.

### I disabled a schedule, but access did not change. Why?

Disabling a schedule stops future automatic deployments, but it does not change what is already on the server. The rules from the last deployment stay in effect until a new deployment replaces them — deploy the asset, or deploy another schedule, to change access now. See [Schedule rule deployments](#schedule-rule-deployments).

### Why can't I edit a rule?

You cannot edit a rule that is currently deployed or marked for deletion. Duplicate the rule and edit the copy, or delete the rule and create a new one.

### Why were some rules skipped during deployment?

License Access Control skips rules whose target was deleted, disabled, or is an empty group. If Workstation Agent Enforcement is on, it also skips user rules for users without an active Workstation Agent.
