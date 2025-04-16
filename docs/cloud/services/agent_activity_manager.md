---
sidebar_position: 1
---

# Agent Activity Manager

## Overview

Use **Agent Activity Manager** to monitor connected Workstation Agents on end-user devices. Restart agents remotely and remove any that are obsolete or no longer needed.

![Agent Activity Manager](/services/agent-activity-manager/agent-activity-manager.gif)

## Prerequisites

- Install and connect at least 1 Workstation Agent.

## Install and connect Workstation Agents

Follow these steps to install the workstation agent and connect it to your system (Cloud or On-Premise):

1. Prepare the end-user workstation according to system requirements (url tbd).
2. Download Workstation Agent from the [OpenLM Downloads page](/downloads).
3. Run Workstation Agent installers and accept the License Agreement, then select **Next**.
4. Select extensions relevant to your installed applications (leave unchecked if none apply), then select **Next**.
5. Select an installation path or keep the default (recommended), then select **Next**.
6. Select your deployment type (**Cloud** or **On-Premise**), then select **Next**.

**For both Cloud and On-Premise deployments:**

7. Select whether to allow end-users to access their Personal Dashboard (such as the license repository), then select **Next**.

**For On-Premise deployments only:**

8. Select whether to activate **Dongle Monitoring**, then select **Next**.
9. Enter your system's Fully Qualified Domain Name (**FQDN**) followed by `/agents-hub` in the host name field, and ensure connectivity through Port 443.



**For both Cloud and On-Premise deployments:**

10. Import the **Agent Authorization File** issued from Identity, then select **Next**.
11. Select **Finish** to complete installation.
![Workstation Agent installation](/services/agent-activity-manager/workstation-agent-installation.gif)


### Prepare the agent authorization file

Your system uses OAuth authentication and requires each component to authenticate before connecting:

1. On the **Home Page**, select **Identity**.
2. Select **Add Client**, then select **Agent** as the client type.
3. Select **Save**, then download the generated **Agent Authorization File**.
![Creating Workstation Agent authorization JSON ](/services/agent-activity-manager/agent-authorization.gif)

## Manage connected Workstation Agents

After the Workstation Agents installation, you can:

- View information for all connected agents, including:
  - Host Name
  - User Name
  - IP Address
  - Agent Version
- Monitor the online/offline status of each agent.
- Remotely restart agents.
- Delete obsolete or unnecessary agents.

