---
sidebar_position: 19
---

# Process Manager

## Overview

Use the Process Manager to monitor application processes through the Workstation Agent. You can track the usage of applications, specific features, and DLLs. DLL monitoring helps distinguish specific functions within applications. Manage licenses effectively, including automated release of licenses based on user inactivity (license harvesting).

## What you can do

### Key features

- **Monitor and differentiate usage**: Track applications and their specific functions.
- **License management**: Track license usage and manage license availability proactively.
- **Automated license harvesting**: Automatically close idle applications to free licenses.

## Prerequisites

Before configuring the Process Manager, ensure the following:

- **Agent Activity Manager**: Install the Agent on all target machines.
- **Brokers Hub and License Servers**: Ensure you have Brokers and License Managers configured.
- **Activate Process Manager**: Activate in the Products.

:::info
Ensure you meet all prerequisites before proceeding with configuration.
:::

## Setting up procedures

1. Open Process Manager.
2. Go to the **Procedures** tab.
3. Select **Add Procedure**.
4. Select a method: 
   - Agent Kill (Close)
   - Agent Save & Close
   - Agent Suspend
5. Name your procedure and save.

## Configuration processes

1. Open the Process Manager.
2. Network floating licenses (extensions) for specific applications are pre-listed.
3. To modify settings, select the pencil icon next to a process:
   - **Name**: Enter the exact executable name (case-sensitive).
   - **Description**: Provide details for easy reference.
   - **Vendor**: Specify the vendor.
   - Activate **Process managed by License Server** if applicable.

## Managing a license release

Configure the license release settings in the License Release tab:

- **License Release Method**: Select from Extension, Suspension, or Procedure.
- **Automatic License Release**: Activate or deactivate automated license release.
- **Thresholds**:
  - **Release Licenses after usage rate (%)**: Set usage level to trigger license release.
  - **Minimal Idle Time for License Release**: Define inactivity period to trigger license release (minimum 3 minutes, varies by application).
- **Track process idle/active periods**: Monitor user inactivity periods.
- **Report as idle after (minutes)**: Set interval to initiate idle tracking.

:::warning
Ensure to set thresholds appropriately to avoid premature license release.
:::

## Advanced settings

Activate system resource monitoring to determine software inactivity:

- Set thresholds for:
  - User Usage %
  - Processor Usage %
  - I/O operations/sec
- Default is 2%.
- The system marks the application as active if it exceeds any threshold, otherwise as idle.

:::tip
Adjust thresholds based on actual usage patterns (sample from 2-3 workstation agents).
:::

## Adding features and DLLs

1. Select the arrow icon to include specific features and DLLs.
2. Use tools like Microsoft Process Explorer for tracking DLLs.

## Monitoring reports

### Network floating license usage:

- **Currently Consumed License** (Usage microservice) - includes idle time.
- **License Activity Report** (Usage microservice) - excludes idle time.
- **Active Processes** (Process Manager microservice).
- **Process Sessions** (Process Session microservice).
- **Detailed Reports** through BI Tool.

### Standalone application usage:

- **Active Processes** (Process Manager microservice).
- **Process Sessions** (Process Session microservice).

:::note
Usage microservice does not display standalone application usage.
:::

## License Harvesting options

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
