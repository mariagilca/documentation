---
title: License Retrieval of Idle Applications – Enhanced Workstation Agent Procedures
sidebar_position: 1
description: Procedures for retrieving licenses of idle applications using the Enhanced Workstation Agent in OpenLM.
---

## License retrieval
The OpenLM license management tool is designed to identify and retrieve idle licenses, improving license usage and availability. OpenLM offers several methods to achieve this optimization:

## Manually:
 License administrators can manually return a license to the pool through the OpenLM EasyAdmin user interface.

## Suspend and Resume:
 OpenLM automatically detects idle FlexLM licenses, removes them, and suspends the application's process.

## Save and Close: 
OpenLM automatically saves and closes idle sessions for applications like MATLAB, Autodesk, and ArcGIS using dedicated extensions.

## Workstation Agent Procedures:
 A flexible, script-based method for enhanced idle license identification and retrieval.

## Workstation agent procedures requirements
OpenLM Agent procedures address customer requests for enhanced license retrieval capabilities, including:

General-purpose license retrieval for any type of license server.

Conditional license retrieval (e.g., "close idle application A only if application B is inactive").

Closing idle applications for "unmanaged" licenses (licenses not queried by OpenLM).

OpenLM v3.1 and later provides a flexible, configurable, script-based mechanism to facilitate these scenarios.

## Detecting idle processes and linking them to monitored features
The following steps are required to configure the "Procedure" method for an application. For software suites like ArcGIS that use the same license for multiple applications (e.g., ArcMap, ArcCatalog, ArcGlobe), these steps must be repeated with the same idle time values for each application you want to automatically release.

If you haven't already, install the OpenLM Workstation Agent on the workstation. You can get the installer from the OpenLM Download page.

During installation, the Agent Configuration window opens. Enter the OpenLM SLM you want the Workstation Agent to connect to and click Apply.

Link the application's process to its respective license by going to EasyAdmin Start → Administration → Process Features.

!(img/openlm-process-features-window.png)

If the required process is not on the list, you must add it manually:

Click the EasyAdmin Start button.

Select OpenLM → Processes Features.

Click Add in the Process List frame. The Add process window appears.

Enter the exact process name, the vendor name as it appears in the license file, and a free-text description.

!(img/openlm-add-process-window.png)

For processes that already exist in the process list, select them and click Edit.

Verify that the features of interest are linked to the monitored process. They should appear in the bottom half of the Process / Features window. If they don't, add them by either:

Highlighting a current process and clicking Add in the lower-righthand corner. A dialog box appears. Select the required feature name.

Clicking "Add all vendor's features". This will include all of the vendor's recorded features in the list.

If an Agent procedure does not yet exist, click EasyAdmin Start → Administration → “Agent Procedures”. The Agent Procedures window opens. Click Add to add a new procedure (e.g., TEST).

!(img/openlm-agent-procedures-window.png)

In the Edit process window (or Add process window for new processes), check the Enabled and Enable License release functionality checkboxes.

From the License release method dropdown menu, select Procedure and enter the procedure name.

Set the Enable License release functionality parameters. These parameters determine the policy for license retrieval once a license is labeled as idle.

Start releasing licenses after usage… (Default: 80): Licenses will only become candidates for retrieval if more than the defined percentage of licenses have been checked out.

Idle time license release threshold (Default: 15 min): Idle licenses will be available for retrieval if they have been idle for more than the defined period.

Expand the Advanced panel and set the system resource threshold parameters. These numbers are used to determine if the monitored application is idle. The default values should not be changed unless instructed by OpenLM Support.

% Processor time (Default: 2): The CPU usage percentage threshold over which the application is considered active.

I/O Data operations/sec (Default: 2): The I/O threshold over which the application is considered active.

User usage (Default: 2): The processor usage for user-mode processes on the workstation.

Click Save.

OpenLM is now configured to monitor and detect idle processes and features. Now you can set the actual procedure that dictates the license retrieval policy.

## Setting up an agent procedure
Agent procedures can have multiple steps and can invoke external scripts. The order and relation of procedure steps and the content of each step affect the procedure flow. To configure a procedure, select one from the Agent procedures window and click Edit. The Edit procedure window opens.

!(img/openlm-agent-procedure-editor.png)

## The "Edit procedure" window
Each row represents a procedure step.

Steps can be added by clicking the "Add actions" button.

Each step must be separately configured by setting the content of three columns: Action type, Script info, and Execute condition.

Help information is available by clicking the information '?' icon on each column header.

Each step can be set as active or inactive using the 'Active' checkbox.

## Action type
Selects the type of step to execute:

License Manager: Access the relevant License Manager to release or kill the feature.

Agent Kill: Instruct the OpenLM Agent to kill a specific process.

Agent Suspend: Instruct the OpenLM Agent to suspend a specific process.

Agent Script: Instruct the OpenLM Agent to execute a script or command on the agent machine.

## Script info
This column contains command lines or paths to batch files that will be run by the Windows shell on the OpenLM Agent machine. This enables administrators to perform conditional sequences of any Windows shell command (e.g., invoke or kill applications) as part of the Agent procedure. Click the info '?' icon for more information.

## Execute condition
This column reflects the procedure's flow control.

No Wait: The step can be invoked regardless of the previous step. This is the default for the first step.

Wait Complete: Waits for the previous step to complete.

Wait Success: Waits for the previous step to complete successfully. If a step requires Wait Success and the previous step completes with an error, the procedure is terminated, and no further steps are executed.

## What's next?
OpenLM can now perform any sequence of conditional actions after detecting idle applications.

For further assistance, contact the OpenLM Support team at Support@OpenLM.com