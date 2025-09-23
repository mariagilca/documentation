---
title: "License retrieval of idle applications - Enhanced Workstation Agent procedures"
sidebar_label: "License retrieval of idle applications - Enhanced Workstation Agent procedures"
---

<!-- Source: https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-enhanced-agent-procedures-kb4005d/ -->

# License retrieval of idle applications - Enhanced Workstation Agent procedures

## License Retrieval

The OpenLM License management tool is designed to identify consumed licenses that are sitting idle and retrieve them to their license pools, thus improving license usage and availability throughout the organization. There are several methods to obtain such optimization:

### Manually

License administrators can monitor the OpenLM EasyAdmin user interface, and [manually return a license to the license pool](https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/).

### Suspend and Resume

OpenLM automatically detects idle FlexLM licenses, removes them, and suspends the application's process. This method is [referred to as "Suspend and Resume"](https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c/).

### Save and Close

OpenLM automatically saves and closes idle MATLAB, Autodesk, ArcGIS, Harmony, Kingdom, and Petra sessions. It does so with the use of dedicated extensions, specifically implemented by OpenLM for each of these applications. [This method is referred to as "Save and Close"](https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/).

### Workstation Agent procedures

Starting from OpenLM v3.1 there is a new method for further enhancing idle license identification and retrieval. This is referred to as retrieval through "Agent procedures". This method is described in [this document](https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-applications-enhanced-agent-procedures-kb4005d/).

### Workstation Agent procedures requirements

OpenLM has been addressed by many customers in requests to enhance its license retrieval capabilities. These requests included:

1. General purpose license retrieval, of licenses managed by any type of license server (not just for FlexLM).
2. Conditional license retrieval (e.g.: "close idle application A only if application B is inactive")
3. Close idle applications of ‘Unmanaged' licenses (licenses that are not managed by a license server that is queried by OpenLM)

OpenLM v3.1 and up provides a script-based, flexible, configurable mechanism to facilitate such requests and accommodate future scenarios.

## Detecting idle processes, and linking them to monitored features

The following steps are required to configure the "Procedure" method for an application. For software suites like ArcGIS that use the same license for multiple applications (e.g. ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated with the same idle time values for each application that you want to automatically release.

1. If not previously done, Install the OpenLM Workstation Agent onto the workstation from [OpenLM Download](https://copy.openlm.com/?page_id=729). This can be done either manually or deployed quietly.
2. Towards the end of the installation process, the Agent Configuration dialog window opens. Type in the OpenLM SLM with which the Workstation Agent is required to connect, and click Apply. A similar option is available through the deployment flags when installing the Workstation Agent silently.
3. Link the application's process to its respective license:

Click the EasyAdmin Start → Administration → Process Features. The Process Features window opens.
![Process features](/img/legacy/kb/process-features.png)
If the required process is not on the Processes list, it will need to be added manually:

* Click the EasyAdmin Start button.
* Select **OpenLM → Processes Features**. The Processes table appears:
* Click ‘**Add**' in the Process List frame, on the top right-hand side of the "Process features" window. The "Add process" window appears: ![Add process](/img/legacy/kb/add-process.png)
* Type in the exact process name, the vendor name as appears in the license file, and a free text description of the process.

For processes that already exist in the process list, select them and click ‘**Edit'**.

4. Verify that the Features of interest are linked to the monitored Process. These features should appear in the bottom half of the Process / Features window. If not, then they should be added by either:

4a. Highlight a current process, and click ‘**Add**' on the lower-righthand corner of the "Process features" window. A dialog box appears. Select the required Feature name from there.
or
Click "**Add all vendor's features"**. This will include all the vendor's recorded Features in the list of monitored features.

5. If a WorkstationAgent procedure does not yet exist, click **EasyAdmin Start → Administration → "Agent Procedures"**. The "Agent Procedures" window opens. Click ‘**Add**' and add a new procedure (e.g.: TEST).

![Administration - Agent procedures](/img/legacy/kb/administration-agent-procedures.png)

6. In the "Edit process" window (or the identical "Add process" window for new processes) check the ‘**Enabled**' and the "**Enable License release functionality**" checkboxes.
7. Click the drop-down menu at the License release method. Select ‘Procedure', and fill in the procedure name.
8. Set the "**Enable License release functionality**" parameters. These parameters determine the policy for license retrieval, once they have been labeled Idle.

* Start releasing licenses after usage … (Default: 80): Licenses will only become candidates for retrieval only if more than the defined percentage of licenses have been checked out.
* Idle time license release threshold (Default: 15 min): Idle licenses will be made available for retrieval if they had been idle for more than the defined period.

9. Expand the ‘**Advanced**' panel, and set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The default values shown should not be changed unless explicitly instructed by OpenLM's support team. Changing these values inappropriately can harm the OpenLM system's performance.

* % Processor time (Default: 2): This is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if its use of the workstation's processor time is lower than the percentage shown
* I/O Data operations/sec (Default: 2): Similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the value shown.
* User usage (Default: 2): The processor usage for user-mode processes on the workstation.

10. Click ‘**Save**'.

OpenLM is now configured to monitor and detect idle processes and features. Now the actual procedure that dictates the license retrieval policy needs to be set.

## Setting up an Agent Procedure

Agent procedures may comprise multiple steps and may invoke external scripts. The order and relation of procedure steps as well as the content of each step affect the procedure flow. To configure a procedure, select one from the "Agent procedures" window, and click the ‘Edit' button.The "Edit procedure" window opens.
![Agent Procedure Editor](/img/legacy/kb/agent-procedure-editor.png)

### The "Edit procedure" window

* On The "Edit procedure" window each row represents a procedure step.
* Steps can be added by clicking the **"Add actions**" button.
* Each step needs to be separately configured by setting up the content of 3 columns: "Action type", "Script info" and "Execute condition".
* Help information is available by clicking the information ‘?' icon on each column header.
* Each step can be set as active or inactive, according to the ‘Active' check box.

### Action Type

Selects the type of step to execute:

* License Manager - Access relevant License Manager to release/kill the feature.
* Agent Kill - Instruct the OpenLM Agent to kill a specific process.
* Agent Suspend - Instruct the OpenLM Agent to suspend a specific process.
* Agent Script - Instruct the OpenLM Agent to execute a script or command on the OpenLM Agent machine.

### Script info

This column contains command lines or paths to batch files which will be run by the Windows shell on the OpenLM Agent machine. This enables administrators to perform conditional sequences of any Windows shell command (e.g. invoke or kill applications) as part of the Agent procedure. Click the info ‘?' icon for more information.

### Execute condition

This column reflects the procedure's flow control.

* No Wait - step can be invoked regardless of the previous step. This is the default value for the first step.
* Wait Complete - Wait for the previous step to complete
* Wait Success - Wait for the previous step to complete successfully. If one step requires Wait Success and the previous step is completed with an error, the procedure is terminated. No further steps are executed.

## Now what ?

OpenLM can now perform any sequence of conditional actions following the detection of idle applications.
Please feel free to contact the OpenLM Support team (Support@OpenLM.com) in case you require further assistance in implementing your Agent procedures.
