---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Process Manager

## Overview

Process Manager monitors application processes through the Workstation Agent installed on end-user machines. It lets you track application usage, measure Actual Usage, monitor specific features, and analyze DLL activity.

DLL monitoring helps distinguish specific functions within applications. You can manage licenses by tracking usage and automating license release based on user inactivity (License Harvesting).

## What you can do

- **Monitor and differentiate usage**: Track applications and their specific functions.
- **License management**: Track license usage and manage license availability proactively.
- **License Harvesting**: Automatically close idle applications to free licenses.

## Prerequisites

Before configuring Process Manager, ensure:
- **Activate Process Manager**: Activate it in Products.
- [Agent Activity Manager](./agent_activity_manager.md): Install Workstation Agent on all target machines.
- [Brokers Hub](./broker-hub.md) and [License Servers*](./../slm/license-servers.md): Ensure you have Brokers and License Managers configured.



## Setting up Procedures

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

1. Open Process Manager.
2. Go to the **Procedures** tab.
3. Select **Add Procedure**.
4. Click **Add agent step**
5. Select a method: 
   - Agent Kill (Close)
   - Agent Save & Close
   - Agent Suspend
6. Name your procedure and save.

<!--![Procedures flow for Process Manager](/services/process_manager/procedures.png)-->


##  Processes configuration

1. Open the Process Manager.
2. Network floating licenses (extensions) for specific applications are pre-listed.

![Processes](/services/process_manager/processes.png)

3. To modify settings, select the pencil icon next to a process:
   - **Name**: Enter the exact executable name (case-sensitive).
   - **Description**: Provide details for easy reference.
   - **Vendor**: Specify the vendor.
   - Activate **Process managed by License Server** if applicable.



## Add a new process

### General

**Monitoring target** - To track a process, enter the process name here.
For file or folder tracking, specify the directory to monitor.

**Description**
**Vendor**
**Tracking type**:
   - **Process** - track by process name.
   - **File** - track a process launch from a specific file.
   - **Directory** - monitor all process launches within a directory.

**Process managed by a license server** - Toggle on to allow attaching license features to this process.

### Process release


Configure the license release settings in the License Release tab:

1. Make sure the toggle is on to activate this feature. 

- **Process release method**: Select None, Suspension or Procedure.
- **Automatic process release**: Activate or deactivate automated process release.
- **Thresholds**:
  - **Release Licenses after usage rate (%)**: Set usage level to initiate license release.
  - **Minimal idle time for process release**: Define inactivity period to start license release (minimum 3 minutes, varies by application).

:::tip
Ensure to set thresholds appropriately to avoid premature license release.
:::

- **Track process idle/active periods**: Monitor user inactivity periods.
   - **Report as idle after (minutes)**: Set interval to initiate idle tracking.

:::note
Idle time traking is charged 50 tokens.
:::


**Advanced settings**

Activate system resource monitoring to determine software inactivity:

- Set thresholds for:
  - User Usage %
  - Processor Usage %
  - I/O operations/sec
- Default is 2%.
- The system marks the application as active if it exceeds any threshold, otherwise as idle.

:::tip
Adjust thresholds based on actual usage patterns (sample from 2-3 Workstation Agents).
:::

### Shadow licenses

Use **shadow licenses** to apply license-style controls to apps that don’t use a vendor license manager. You can cap concurrent use, restrict by user or workstation, and control when usage is released.

#### Where to configure

Go to **Processes** → **Add process** or **Edit process** → **Shadow licenses**.

> Tip: Configure at the process level. Parent packages let multiple processes share the same pool.

#### Consumption policies

Set how OpenLM counts and limits usage.

- **Deny multiple versions**  
  Block all versions except the **Configured version** you specify.

- **Enforce named-user restriction**  
  Prevent the same user from running the app on multiple workstations at once.

- **Consumption policy type**  
  Choose the scope that consumes one unit:
  - **Process** — each running process.
  - **Workstation** — one per machine, regardless of process count.
  - **User at workstation** — one per user on a specific machine.

- **Unlimited concurrent instances**  
  - On by default. Turn **off** to set **Concurrent instances limit**.  
  - Use `-1` for no limit.


- **Parent packages (optional)**  
  Link the process to a **Parent package** to draw from a shared pool.  
  OpenLM denies access if **either** the process limit **or** the parent limit is reached.

:::note Offline vs. online agents
Policies apply globally for processes monitored by an **online** Workstation Agent. For **offline** agents, only the **Consumption policy type** applies, evaluated per agent.
:::

#### Release policies

Decide when OpenLM frees a consumed unit after the app closes. OpenLM uses **whichever occurs later**: the **Release delay** or the **Bucket duration**.

- **Release delay (minutes)**  
  Holds usage for a grace period. If the user reopens the app before the delay ends, the same session continues.

- **Bucket duration**  
  Aligns release to a time bucket:
  - **DAY** — release at midnight.
  - **HOUR** — release at the start of the next hour.
  - **NONE** — release immediately (still respects Release delay).

#### Examples

- App closes at **14:50**, **Release delay = 20** → held until **15:10** if **Bucket duration = NONE**.
- App closes at **14:05**, **Release delay = 10**, **Bucket duration = HOUR** → released at **15:00** (bucket is later than 14:15).

#### Best practices

- **Match scope to behavior**:  
  Use **Workstation** for tools that spawn helper processes. Use **User at workstation** for shared machines.
- **Protect named-user terms**:  
  Enable **Enforce named-user restriction** to mirror contract rules.
- **Stabilize short restarts**:  
  Set a small **Release delay** to avoid churn when apps close and reopen during updates.
- **Pool related tools**:  
  Use **Parent packages** for suites that should share a common cap.

#### What you can achieve

- **Enforce compliance** with named-user and concurrency terms.  
- **Control access** by process, workstation, or user.  
- **Reduce cost** by tracking usage for purchase and renewal decisions.  
- **Improve availability** by tuning release timing so licenses return to the pool when users finish a job.


## Adding features and DLLs

1. Select the arrow icon to include specific features and DLLs.

![Adding a DLL in Process Manager](/services/process_manager/add-dll.png)


2. Use tools like Microsoft Process Explorer for tracking DLLs.

## Monitoring reports

### Network floating license usage:

- **Currently Consumed License** (See Usage) - includes idle time.
- **License Activity Report** (See Usage) - excludes idle time.
- **Active Processes** (See Process Manager).
- **Process Sessions** (See Process Session).
- **Detailed Reports** through BI Tool.

### Standalone application usage:

- **Active Processes** (Process Manager microservice).
- **Process Sessions** (Process Session microservice).

:::note
Usage service does not display standalone application usage.
:::

## License Harvesting options

<Tabs>
<TabItem value="options" label="Options" default>

- **None**: Only monitor application idle time.
- **Extension**: 
  - Specify folders to save work through Agents Hub.
  - Resume work through Personal Dashboard.
- **Suspension**:
  - Freeze applications.
  - Resume through Personal Dashboard.
- **Procedure**:
  - **Agent Save & Close**: Automatically save and close applications. Specify identifiers for certain applications (for example ArcGIS Pro, MATLAB).
  - **Agent Suspend**: Freeze applications. Resume through Personal Dashboard.
  - **Agent Kill**: Force-close applications without saving. Applications restart empty upon resumption.

:::danger
Use Agent Kill with caution as it might result in data loss.
:::

</TabItem>
<TabItem value="exclusions" label="Turn off for users/groups">

#### Overview

Turn off automatic license harvesting (automatic process release) for selected users or groups. Idle time monitoring continues for all users. You can apply exclusions all the time or within a time frame.

#### Before you begin

Make sure the following conditions are true:

- You have access to the Process Manager UI.
- The consumption policy type in the **Shadow Licenses** tab is not set to **Workstation**. When you turn on user or group exclusions, you can't use the **Workstation** consumption policy type.

#### Configure user or group exclusions

1. In Process Manager, open the **Process Release** tab.
2. Scroll to **Advanced settings** and turn on **Enable user/group exclusions**.
3. Add at least one user or group:
   - Select **Add user** and choose one or more users from the searchable list.
   - Select **Add group** and choose one or more groups from the searchable list.
   - Click the **+** icon next to the selected user or group to add it to the exclusions list. Selecting a name alone doesn't add it - you must click **+** for it to appear in the list.
   - Select the **X** next to a name to remove it.
4. If you need a time frame for the exclusions, continue with **Configure time framed exclusions (optional)**.
5. Select **Save**.

#### Configure time framed exclusions (optional)

1. Turn on **Enable time framed user/group exclusions**.
2. Set the start time and end time in `HH:MM` format.
3. Select the days of the week when the exclusions apply.
4. Select **Save** if you have not already saved your changes.

#### How exclusions work

Exclusions behave as follows:

- For excluded users or groups, Process Manager does not send the idle-above-threshold message to License Harvester for the relevant monitored processes.
- If time framed exclusions are enabled, the exclusions apply only during the selected days and times.
- If time framed exclusions are disabled, the exclusions apply at all times.

#### Rules and limits

The following rules apply:

- You must add at least one user or one group when exclusions are enabled.
- If time framed exclusions are enabled, both start and end times are required, and the end time must be later than the start time.

#### Troubleshooting

If something does not work, check the following:

- Can't turn on user or group exclusions? Check the consumption policy type in the **Shadow Licenses** tab and make sure it is not set to **Workstation**.
- Can't save your changes? Make sure you selected and added at least one user or group.

</TabItem>
</Tabs>
