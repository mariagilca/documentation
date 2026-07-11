---
title: "Process Manager"
sidebar_label: License harvesting
sidebar_position: 4
description: "Process Manager monitors application processes through the Workstation Agent, tracks idle time, and automatically releases licenses (license harvesting)."
---

## Overview

Process Manager monitors application processes through the OpenLM Workstation Agent installed on end-user machines. Use it to track application usage, measure actual usage, monitor specific features and DLLs, and automatically release licenses held by idle applications (**license harvesting**).

For applications that don't use a vendor license manager, Process Manager can enforce license-style limits through **shadow licenses** — virtual licenses with their own consumption and release policies.

The Process Manager interface has four pages:

| Page | What it's for |
|---|---|
| **Active Sessions** | See processes currently running on monitored workstations and manually trigger a release. |
| **Processes** | Define which processes the Workstation Agent monitors and how they're released. |
| **Procedures** | Build the step-by-step actions (save, suspend, kill) the Agent runs to release a process. |
| **Parent Packages** | Create shared shadow-license pools that several processes draw from. |

## What you can do

- **Monitor and differentiate usage**: Track applications, their features, and specific DLLs.
- **License harvesting**: Automatically close, suspend, or save idle applications to return licenses to the pool.
- **Shadow licenses**: Cap concurrent use and control access for applications without a license manager.

## Prerequisites

Before configuring Process Manager, ensure:

- **Process Monitoring is activated** in [Products](/cloud/openlm-administration/products).
- The [Workstation Agent](/cloud/data-collection/agent_activity_manager) is installed on all target machines.
- For license-managed applications, [Brokers](/cloud/data-collection/broker-hub) and [License Servers](/cloud/slm/license-servers) are configured.
- You have an **administrator** role. Viewers can browse all pages but can't add, edit, or delete anything.

## How automatic release works

The release pipeline chains several settings together. A license is harvested only when every step is satisfied:

1. The **Workstation Agent** detects that a monitored process is idle (no user input, and — if enabled — system resource usage below the configured thresholds).
2. Once the process has been idle longer than the **Idle Time Limit**, it becomes eligible for release.
3. The release fires when the license pool usage reaches the **Release Processes After %** threshold — as long as the user or session isn't covered by a [Process Release Exclusion](#process-release-exclusion).
4. The Agent executes the configured **release method** (procedure, suspension, or extension) on the workstation.

:::note
Idle-time tracking and each release method consume OpenLM token entitlements (for example, the Actual Usage feature and per-application harvesting features). If your subscription has insufficient tokens for a feature, monitoring for that process waits until tokens free up. Contact your OpenLM account manager for your plan's token allocation.
:::

## The Processes page

Open **Process Manager** > **Processes** to see all monitored process definitions.

![Processes page with the Shadow License panel for the selected process](/services/process_manager/processes.png)
*Processes page. Selecting a row shows its Shadow License, Features, and DLLs panels.*

When you activate Process Monitoring, a starter set of well-known applications is pre-listed automatically (ArcMap, ArcCatalog, ArcGlobe, ArcScene, ArcGIS Pro, AutoCAD, NX, MATLAB, and SolidWorks). MATLAB and SolidWorks start disabled — enable them when you're ready to monitor them.

- Select a row to inspect the process's **Shadow License**, **Features**, and **DLLs** in the right-hand panel.
- Select the pencil icon on a row to edit the process.
- Use the column menu (⋮) to show additional columns such as the idle thresholds, **Automatic Process Release**, and the system-resource rates.

:::caution
Deleting a process also deletes all of its active sessions. If any selected process has active sessions, the confirmation dialog lists those processes before anything is removed.
:::

## Add or edit a process

Select **Add Process**, or the pencil icon next to an existing process. The form has three tabs: **General**, **Process Release**, and **Shadow Licenses**.

### General

![Edit Process, General tab with Advanced Settings expanded](/services/process_manager/process-general.png)
*General tab, with Advanced Settings expanded.*

- **Monitoring Target** (required) — to track a process, enter the process name. For file or folder tracking, specify the directory to monitor.
- **Description** (required) — a unique description, up to 140 characters.
- **Vendor** (required) — the vendor daemon or vendor name. For license-managed applications this is used to look up the vendor's features.
- **Tracking Type** (required):
  - **Process** — track by process name.
  - **File** — track a process launched from a specific file.
  - **Directory** — monitor all process launches within a directory.
- **Process managed by a license server** — on by default. When enabled, you can attach license features to this process, and the **Suspension** and **Extension** release methods become available.

Under **Advanced Settings**:

- **Command Line Launch Arguments** — narrows detected processes to those whose launch command line matches the specified text.
- **Window Title** — track only processes whose window titles match the specified pattern (wildcard supported).

### Process Release

This tab controls license harvesting for the process.

![Edit Process, Process Release tab](/services/process_manager/process-release.png)
*Process Release tab.*

1. Turn on the **Process Release** toggle to activate the feature.
2. Select a **Process Release Method**:

   | Method | What it does | Available |
   |---|---|---|
   | **None** | Monitor only — no automatic release. | Always |
   | **Procedure** | The Agent runs a [procedure](#procedures) you define (save, suspend, or kill steps). | Always |
   | **Suspension** | The Agent freezes the application and the license is released. Users resume through the Personal Dashboard. | Processes managed by a license server |
   | **Extension** | An application-specific harvesting extension saves the work and closes the application. Users resume through the Personal Dashboard. | Managed processes of supported applications only |

   The **Extension** method is supported for AutoCAD, ArcMap, ArcCatalog, ArcGlobe, ArcScene, ArcGIS Pro, MATLAB, SolidWorks, Petra, Kingdom, CATIA, and Harmony Enterprise. If you later rename the process or turn off **Process managed by a license server**, an incompatible method automatically resets to **None**.

3. If you selected **Procedure**, pick one in **Select Procedure**.
4. Turn on **Automatic Process Release** and set the thresholds:
   - **Release Processes After %** (default 80) — release idle processes when their license pool usage reaches this percentage. Lower values release licenses more aggressively.
   - **Idle Time Limit (minutes)** (default 15) — the idle time after which a process becomes eligible for release. Minimum 3 minutes; for MATLAB the minimum is 15 minutes unless the release method is None or Extension. The value must also be at least the **Report as "Idle" After** value.
5. Turn on **Track Process Idle/Active Periods** to record idle periods:
   - **Report as "Idle" After (minutes)** (default 1) — after the process has been idle this long, its idle information is linked to the related feature session and shown in **Usage** > **Currently Consumed Licenses**. This setting affects reporting only; it does not change when a process is released.

:::tip
Set the thresholds conservatively at first to avoid releasing licenses while users are still working, then tighten them based on observed usage.
:::

#### Process Release Exclusion

Process Release Exclusion exempts specific users, groups, or application invocations from license harvesting while idle-time monitoring continues for everyone. This protects long, non-interactive workloads — simulations, rendering, batch scripts — where the application looks idle (no mouse or keyboard input) but is still doing critical work.

:::info[Example]
Your organization releases idle MATLAB licenses after 15 minutes. Most users benefit — idle licenses return to the pool quickly. But an engineer running an overnight simulation would have their session terminated, losing hours of work. Exclude that engineer (or their group), or exclude batch invocations by their command-line pattern, and their work is protected while everyone else's licenses keep recycling.
:::

![Process Release Exclusion with schedule, CLI patterns, and system resource thresholds](/services/process_manager/release-exclusion.png)
*The Process Release Exclusion block with an exclusion schedule, the CLI Command field, and Advanced Settings.*

A process is **not** released when **any** configured condition matches: an excluded user, an excluded group, or a command-line pattern.

**Exclude users or groups:**

1. In the process's **Process Release** tab, turn on **Process Release Exclusion** (the toggle is available only while **Process Release** is on).
2. Use **Select User** or **Select Group** to pick one or more entries, then select the **+** button to add each one to the exclusion list. Selecting a name alone does not add it.
3. Select the trash icon next to an entry to remove it.
4. Select **Save**.

User and group names are matched case-insensitively, and group exclusions cover all members of the group (as resolved by the Users & Groups service).

**Schedule the exclusion (optional):**

By default, exclusions apply at all times. To limit them to a recurring window:

1. Turn on **Process Release Exclusion Schedule**.
2. Set the **Start Time** and **End Time**.
3. Select the days of the week when the exclusion starts. The selected days apply to the *start* of the window, so an overnight window (for example, Friday 22:00 to 02:00) ends on Saturday morning.
4. Select **Save**.

Outside the scheduled window, normal release rules apply. Times are evaluated in the time zone configured in the OpenLM settings of the user who saved the process.

**Exclude by command line (CLI patterns):**

To exclude specific *invocations* of an application — batch runs, read-only sessions — rather than whole users:

1. Type a pattern in **CLI Command** and select the **+** button. Add as many patterns as you need.
2. Select **Save**.

Pattern matching rules:

- `*` matches any sequence of characters; everything else is literal.
- Matching is case-insensitive and unanchored — the pattern can appear anywhere in the command line. For example, `-f *.tcl` matches `pt_shell -f script.tcl -64bit`.
- A match on **any one** pattern excludes the process.
- CLI patterns are **not** affected by the exclusion schedule — a matching process is excluded at all times, for as long as its arguments match.
- If the Workstation Agent doesn't report command-line arguments for a process (older Agent versions), CLI patterns are skipped and only user/group exclusions apply.

:::warning
A pattern of just `*` matches every process that reports command-line arguments — effectively disabling harvesting for this process.
:::

**How it works:**

- The Workstation Agent keeps monitoring and reporting idle time for everyone — exclusions only suppress the release trigger.
- With a scheduled exclusion, harvesting resumes automatically the moment the window ends; a process that is still idle past its threshold is released then.
- Changes take effect immediately: removing an exclusion re-evaluates processes that are already idle, which can release a long-idle process right away.

**Rules and limits:**

- At least one user, group, or CLI pattern is required while the exclusion is on.
- When the schedule is on, at least one user or group is required — CLI patterns alone don't satisfy a scheduled exclusion (they ignore the schedule).
- Exclusions can't be enabled while the process's **Consumption Policy Type** (Shadow Licenses tab) is set to **Workstation**.

#### Advanced Settings: System Resource Thresholds

By default, idle detection is based on user input. Turn on **System Resource Thresholds** to also include resource usage in idle detection — the process is considered idle when its usage stays below these thresholds:

- **User Usage %** (default 2)
- **Processor Usage %** (default 2)
- **I/O Data Operations/Second** (default 2)

:::tip
If genuinely busy processes are being flagged idle (or vice versa), sample real values from 2–3 workstations and adjust the thresholds to match actual usage patterns.
:::

### Shadow Licenses

Use shadow licenses to apply license-style controls to any monitored application — including apps that don't use a vendor license manager. You can cap concurrent use, restrict versions and named users, and control when a consumed unit is released.

![Edit Process, Shadow Licenses tab](/services/process_manager/shadow-licenses.png)
*Shadow Licenses tab: consumption policies on the left, release policies on the right.*

#### Consumption Policies

These policies decide whether a newly launched process is allowed to run, and what counts as one consumed unit.

- **Deny Multiple Versions**
  Prevents the same user on the same workstation from running two differently-configured versions of the same vendor's software at the same time. Define each version as its own process with its own **Configured Version**; when this policy is on, a new process is denied if the same user and workstation already run a process of that vendor with a different configured version. **Configured Version** is required while the toggle is on.

- **Enforce Named User Restriction**
  Prevents the same user from running the application on more than one workstation at a time. It doesn't limit how many instances the user runs on a single workstation.

- **Unlimited Concurrent Instances / Concurrent Instances Limit**
  **Unlimited Concurrent Instances** is on by default for a new process. Turn it off to set a **Concurrent Instances Limit** — the maximum number of consumed units across your whole organization. New launches beyond the limit are denied and the application is blocked on the workstation.

- **Parent Package** (optional)
  Link the process to a [parent package](#parent-packages) so several processes share one pool. Access is denied if **either** the process's own limit **or** the parent package limit is reached.

- **Consumption Policy Type**
  Selects what consumes one unit:
  - **Process** — every running instance consumes its own unit (three open copies = three units).
  - **Workstation** — one unit per workstation, regardless of how many users or instances run the application there.
  - **User at workstation** — one unit per user per workstation; multiple instances by the same user on one machine share a unit.

:::caution
Changing the Consumption Policy Type of a process deletes all of its active sessions — the interface asks for confirmation first. Also note that a limit of `0` denies every new launch; use the **Unlimited Concurrent Instances** toggle for no limit.
:::

:::note[Offline versus online agents]
Consumption policies are enforced globally for processes monitored by an **online** Workstation Agent. For **offline** agent reports, only the Consumption Policy Type applies, evaluated per agent — the deny checks (versions, named user, limits) don't run on offline data.
:::

#### Release Policies

These policies decide when a consumed unit returns to the pool after the application closes. The shadow license is released at **whichever time is later**: the release delay or the end of the current bucket.

- **Release Delay (in minutes)** (default 0)
  Holds the unit for a grace period after the process closes. If the user reopens the application before the delay expires, the same session simply continues — useful to avoid churn during application restarts and updates.

- **Bucket Duration** (default None)
  Aligns the release to a time bucket, in UTC:
  - **Day** — release at the end of the day (midnight UTC).
  - **Hour** — release at the start of the next hour.
  - **None** — release immediately (the release delay still applies).

**Examples:**

- Process closes at **14:50 UTC**, **Release Delay = 20**, **Bucket Duration = None** → released at **15:10**.
- Process closes at **14:05 UTC**, **Release Delay = 10**, **Bucket Duration = Hour** → released at **15:00** (the bucket end is later than 14:15).
- Process closes at **14:55 UTC**, **Release Delay = 10**, **Bucket Duration = Hour** → released at **15:05** (the delay is later than the bucket end).

#### Best practices

- **Match the scope to the application's behavior**: use **Workstation** for tools that spawn helper processes; **User at workstation** for shared machines.
- **Protect named-user terms**: turn on **Enforce Named User Restriction** to mirror contract rules.
- **Stabilize short restarts**: a small **Release Delay** avoids losing the session when apps close and reopen during updates.
- **Pool related tools**: use parent packages for suites that should share a common cap.

## Attach license features and DLLs

Select a process on the **Processes** page, then use the **Features** and **DLLs** tabs in the right-hand panel.

![Features tab for a selected process](/services/process_manager/features.png)
*Features tab for the selected process.*

**Features** link the monitored process to the license features it consumes, so that agent-reported activity can be matched to license sessions (actual usage). Select **Add Feature**, then either **Add All Features** (every feature of the process's vendor) or **Add Specific Feature** and pick one from the list. The button is available only for processes with **Process managed by a license server** turned on.

**DLLs** let you distinguish specific functions inside an application: attaching a DLL makes the Workstation Agent track when the process loads it, producing separate per-DLL usage entries (typical use: per-module or add-on tracking).

![Add DLL dialog](/services/process_manager/add-dll.png)
*Adding a DLL to a process.*

1. Open the **DLLs** tab and select **Add DLL**.
2. Enter the DLL file name (it must end in `.dll`) and select **Add**.

:::tip
Use a tool like Microsoft Process Explorer to find which DLLs an application loads for a given function.
:::

## Procedures

A procedure is a named, ordered list of actions the Workstation Agent runs on a process when it's released. Bind a procedure to a process by selecting the **Procedure** release method on the process's **Process Release** tab.

![Procedures page](/services/process_manager/procedures.png)
*Procedures page. Selecting a procedure shows its steps.*

export function ArcadeEmbed() {
  return (
    <div style={{ position: 'relative', paddingBottom: 'calc(55.31746031746032% + 41px)', height: 0, width: '100%' }}>
      <iframe
        src="https://demo.arcade.software/UwGSZu8Lo5xTu0eZMael?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
        title="Create a New Procedure in Process Manager"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
    </div>
  )
}

<ArcadeEmbed />

To create a procedure:

1. Go to the **Procedures** page and select **Add Procedure**.
2. Enter a unique **Procedure Name**.
3. Select **Add Agent Step**. In the **Add Action** dialog, choose an **Action Type**:
   - **Agent kill** — force-close the application without saving; unsaved work is lost.
   - **Agent suspend** — freeze the application. Users resume through the Personal Dashboard.
   - **Agent save and close** — save the user's work, then close the application.
4. Choose an **Execution Condition**. The first step always runs immediately (**No wait**); each later step runs after the previous one finishes (**Wait complete**) or only if it succeeded (**Wait success**).
5. For **Agent save and close**, you can fill **'Save dialog' Title or Identifier**. Usually this stays empty, but some applications (for example ArcGIS Pro or MATLAB) have save dialogs the Agent can't access by default — in that case enter the dialog's partial or full window title, or its identifier (use a window-inspection tool to find it).
6. Select **Add**, then **Save**.

![Add Action dialog with the Agent save and close action](/services/process_manager/add-action.png)
*Adding an Agent save and close step.*

Each procedure has an **Enabled** toggle, and each step has its own **Status** toggle, so you can turn a step off temporarily without deleting it. A procedure that is attached to a process can't be deleted — detach it first.

:::danger
Use **Agent kill** with caution: it closes applications without saving and can cause data loss.
:::

## Parent Packages

Parent packages let multiple processes share the same shadow-license consumption limit — for example, a suite of related tools that should draw from one pool of 100 units.

![Parent Packages page](/services/process_manager/parent-packages.png)
*Parent Packages page.*

1. Go to the **Parent Packages** page and select **Add Parent Package**.
2. Enter a unique **Package Name** and a **Package Limit**, then select **Save**.
3. Attach processes to the package with the **Parent Package** field on each process's **Shadow Licenses** tab.

Every consumed unit counts against both the process's own limit and the package limit; a new launch is denied when **either** is reached. Deleting a package automatically detaches it from all processes, which then revert to their own limits.

## Active Sessions

The **Active Sessions** page shows the sessions currently running on workstations where the Workstation Agent is installed. It refreshes automatically every minute.

Columns include **Process Name**, **Hostname**, **Username**, **Idle Time Duration**, **Idle Time Start**, **Release Method**, and **Automatic License Release** (with optional **Process Start Time** and **Last Report Time** columns).

- To release a session manually, select the release icon on its row (**Execute Release Method**). The icon appears only for sessions whose process has the **Process Release** toggle on and a release method other than **None**.
- Coming from **Usage** > **Currently Consumed Licenses**, the page opens pre-filtered to the session you selected there.

If no data appears: the Workstation Agent isn't installed on the machine, the installed Agent is offline, or the license you're looking for is borrowed and the software isn't in use right now.

## Monitoring reports

### Network floating license usage

- **Currently Consumed Licenses** (Usage) — includes idle time.
- **License Activity** (Usage) — excludes idle time.
- **Active Sessions** (Process Manager) — live sessions on monitored workstations.
- **Process Sessions** — historical process sessions with idle/active segments.
- Detailed reports through the BI tool.

### Standalone application usage

- **Active Sessions** (Process Manager).
- **Process Sessions**.

:::note
The Usage service does not display standalone application usage.
:::

## Troubleshooting

| Issue | Resolution |
|---|---|
| The **Process Release Exclusion** toggle is grayed out | Turn on the **Process Release** toggle at the top of the tab first. |
| Cannot save: "Harvesting Exclusions cannot be enabled when Shadow License Consumption Policy is set to Workstation" | Change the **Consumption Policy Type** on the **Shadow Licenses** tab, or turn off the exclusion. |
| Cannot save exclusions: "At least one username, group, or command-line argument pattern must be excluded when Harvesting Exclusions are enabled" | Add at least one user, group, or CLI pattern with the **+** button — selecting a name in the dropdown alone doesn't add it. |
| Cannot save exclusions: "At least one username or group must be excluded when the exclusion schedule is enabled" | CLI patterns ignore the schedule, so a scheduled exclusion needs at least one user or group. Either add one or turn the schedule off. |
| **Suspension** or **Extension** is missing from the release methods | Turn on **Process managed by a license server** (General tab). **Extension** additionally requires one of the supported applications. |
| **Idle Time Limit** won't accept a low value for MATLAB | MATLAB requires at least 15 minutes unless the release method is **None** or **Extension**. |
| **Add Feature** is disabled | The process must have **Process managed by a license server** turned on. |
| A process was released even though its user is excluded | Check the exclusion schedule — user/group exclusions apply only inside the scheduled window. CLI patterns, by contrast, apply at all times. |
| CLI patterns never match | The Workstation Agent on that machine may not report command-line arguments — update the Agent. |
