---
sidebar_position: 3
title: Understanding the Workstation Agent
description: What the OpenLM Workstation Agent does, why it's installed on your computer, and how it optimizes license usage.
---

# Understanding the Workstation Agent

The Workstation Agent is a small background application installed on your computer by your IT team. It reports which licensed software you are running and for how long. It provides real-time, endpoint-level visibility into how, when, and if licensed software is used — beyond what license servers report.

## What it does

The Workstation Agent performs the following tasks.

- Detects when you open or close a licensed application
- Reports usage data to the OpenLM Platform
- Allows license-release policies (for example, releasing an idle license so a colleague can use it)
- Tracks idle time for each application
- Supports license harvesting to reclaim unused licenses automatically

## What it does NOT do

The Workstation Agent does not perform any of the following actions.

- It does not monitor your files, emails, or personal activity
- It does not capture screenshots
- It only tracks usage of specific licensed software defined by your administrator

## Is it required?

The Workstation Agent is required for applications that do not report usage data to a central license server (for example, some standalone or node-locked tools). For server-based licenses (FlexNet, Sentinel, and so on), the agent is optional but provides richer usage detail.

## Idle license detection

Licenses are often checked out but not actively used. For example, a user might open AutoCAD and walk away, leaving the license occupied. This causes:

- **Blocked access**: Other users are denied entry to the software.
- **False demand**: High checkout rates lead to over-purchasing.
- **Wasted budget**: Idle licenses consume resources without delivering value.

### How idle time tracking works

Idle time is when a licensed application is open but not actively used (no keyboard or mouse input to that application). The Workstation Agent tracks idle time and sends it to OpenLM.

When a session exceeds the idle time threshold, OpenLM marks it as idle and displays:

- All running software sessions.
- Idle time for each application.
- A session timeline showing activity and inactivity.

## License harvesting

License harvesting automatically reclaims licenses from idle sessions and returns them to the pool for other users.

### Harvesting methods

OpenLM supports several harvesting strategies, depending on the application and license type:

- **Save & Close**: Saves the user's work and closes the application. Requires an OpenLM extension. Common for:
  - ArcGIS / ArcGIS Pro
  - AutoCAD
  - SOLIDWORKS
  - MATLAB
  - CATIA

- **Suspend & Resume**: Suspends the application (ideal for FlexLM). Users resume it from their Personal Dashboard.

- **Kill**: Force-closes the application without saving. Use only when other options are not available.

## Process Manager configuration

The Process Manager lets administrators configure how the agent handles each application.

### Set up a process

In the **Process** tab:

- **Name**: Enter the exact executable name (case-sensitive).
- **License server toggle**:
  - On: Links the process to a license feature.
  - Off: For standalone applications.

### Define idle behavior

In the **License Release** tab:

- **Release method**: Choose Save & Close, Suspend & Resume, custom Procedure, or None.
- **Release conditions**: Set idle thresholds (for example, 60 minutes) or only release when usage hits a certain level (for example, 90%).
- **Advanced detection**: Refine based on CPU, I/O, or activity levels.
- **Agent procedures**: Define custom actions (for example, `Agent Kill`, `Agent Save&Close`).

## Shadow license policies

Use the **Shadow Licenses** tab to manage applications without a license manager.

### Define consumption rules

- **Policy type**:
  - *Process*: One license per running instance.
  - *Workstation*: One license per machine.
  - *User at Workstation*: One license per user/machine combo.
- **Named user restriction**: Prevent the same user from using the application on multiple machines.
- **Concurrency and version control**: Block multiple versions or limit concurrent use.

### Define release rules

- **Release delay**: Set a grace period (for example, 10 minutes).
- **Bucket duration**:
  - `DAY`: License is released at midnight.
  - `HOUR`: Released at the top of the hour.
  - `NONE`: Released immediately after the delay.

## Process sessions report

The **Process Sessions** report captures what happened on the user's machine — beyond license checkouts.

Data includes:

- Process name, user, host
- Session start and end time
- Total idle time
- Shutdown reason (for example, closed by user or agent)

:::note
To see idle time for a past session, use the **Process Sessions** report, not the license server data.
:::

## Personal Dashboard

The Personal Dashboard helps users understand and manage their license usage.

Key features:

- **License availability**: View real-time status and see who holds each license.
- **Recently closed**: Shows applications closed by OpenLM with a **Resume** button to reopen them.
- **Projects**: Attribute usage to a specific project for reporting.
- **Live feed**: Displays diagnostic logs from the local agent.
