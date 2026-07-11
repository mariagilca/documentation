---
title: Workstation Agent
sidebar_position: 0
description: Install, authorize, deploy, and manage the OpenLM Workstation Agent — the component that collects application and license activity from end-user machines.
---

The **Workstation Agent** is an OpenLM component installed on end-user machines. It detects which licensed applications a user runs and for how long, and reports that activity to the OpenLM Platform. It is the data source behind the Agents apps and behind endpoint features such as idle-license detection and license harvesting.

The Workstation Agent is an **installed component, not an app in the launcher.** You manage the agents it produces through two launcher apps:

- [Agents Hub](/cloud/data-collection/agents_hub) — configure agent behavior and the sites/applications agents watch.
- [Agent Activity Manager](/cloud/data-collection/agent_activity_manager) — monitor connected agents and roll out upgrades, restarts, and removals.

:::note
This page is the administrator's install-and-manage reference. For the end user's plain-language explanation of what the agent does on their computer, see [Understanding the Workstation Agent](/cloud/for-end-users/workstation-agent).
:::

## Agent types

Once installed and reporting, agents appear automatically in Agent Activity Manager. OpenLM tracks three agent types, distinguished by where they run:

- **Workstation Agent** — installed on a user's desktop or workstation.
- **Browser Agent** — runs in the user's web browser.
- **AutoCAD Extension Agent** — runs inside Autodesk AutoCAD.

## Install and authorize

The install flow is the same whether you deploy to one machine or to a fleet. For platform-specific installers (Windows, Linux RPM, DEB, tar.gz), interactive walkthroughs, and troubleshooting, see [Install and configure OpenLM Components](/cloud/deployment-operations/components-installation).

### Before you begin

- Confirm the target machines meet the [system requirements](/cloud/deployment-operations/system-requirements).
- Generate an [authorization file](/cloud/getting-started/authorize-components) for the Workstation Agent in Identity. You can use one file per machine or a shared file.
- Confirm the machines have outbound internet access on port 443.

### Steps

1. Download the Workstation Agent installer from the [Downloads page](https://www.openlm.com/downloads/).
2. Run the installer and accept the license agreement.
3. Select any extensions relevant to your installed applications (leave unchecked if none apply).
4. Choose an installation path, or keep the default (recommended).
5. Choose the deployment type — **Cloud** or **On-premises**.
6. Choose whether to allow end users to open their [Personal Dashboard](/cloud/users/personal-dashboard).
7. **On-premises only:** choose whether to activate [Dongle Monitoring](/cloud/dongle-monitoring), then enter your system's fully qualified domain name followed by `/agents-hub` as the host, with connectivity on port 443.
8. Import the **Agent Authorization File** issued from Identity, then finish the installation.

After installation, the agent connects to the OpenLM Platform automatically.

### Deploy at scale

IT teams can deploy the Workstation Agent silently across many machines with a shared authorization file, using tools such as:

- Microsoft Intune
- Group Policy (GPO)
- System Center Configuration Manager (SCCM)
- PDQ Deploy
- A custom silent script

## Verify

After installation, open [Agents Hub](/cloud/data-collection/agents_hub) or [Agent Activity Manager](/cloud/data-collection/agent_activity_manager) and confirm the agent appears in the list with an online status. If it does not appear, re-check the authorization file and the machine's outbound access on port 443.

## Manage installed agents

Day-to-day agent operations happen in [Agent Activity Manager](/cloud/data-collection/agent_activity_manager):

- **Upgrade** agents by uploading a newer installer, to selected agents or the whole fleet (with optional auto-upgrade).
- **Restart** all Workstation Agents.
- **Remove** obsolete agent records.

## Configure what the agent does

- **Harvesting and idle-license policies** — define how the agent releases idle licenses (Save & Close, Suspend & Resume, or Kill) in [Process Manager](/cloud/automations/process-manager).
- **Watched sites and applications** — configure in [Agents Hub](/cloud/data-collection/agents_hub).

## What the agent does not do

The Workstation Agent does not monitor personal files, emails, or activity, and it does not capture screenshots. It tracks only the licensed software defined by your administrator.

## Related

- [Understanding the Workstation Agent](/cloud/for-end-users/workstation-agent) — the end-user view.
- [Agents Hub](/cloud/data-collection/agents_hub) · [Agent Activity Manager](/cloud/data-collection/agent_activity_manager) — the apps that manage agents.
- [Process Manager](/cloud/automations/process-manager) · [Dongle Monitoring](/cloud/dongle-monitoring) — features powered by the agent.
- [Install and configure OpenLM Components](/cloud/deployment-operations/components-installation) — platform-specific installers and troubleshooting.
