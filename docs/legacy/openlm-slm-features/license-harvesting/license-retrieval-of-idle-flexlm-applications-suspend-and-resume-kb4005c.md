---
title: License harvesting of idle FlexLM applications
description: The OpenLM License management tool is designed to identify consumed licenses that are sitting idle and return them to their license pools, thus improving.
sidebar_label: "License Harvesting of Idle FlexLM Applications"
sidebar_position: 5
---

{/* Source: https://www.openlm.com/knowledge-base/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c/ */}

## License harvesting

The OpenLM License management tool is designed to identify consumed licenses that are sitting idle and return them to their license pools, thus improving license utilization and availability throughout the organization. There are several methods to obtain such optimization license utilization:

### Manually

License administrators can monitor the OpenLM EasyAdmin User Interface, and [manually return a license back to the license pool](https://www.openlm.com/knowledge-base/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/).

### Suspend and resume

OpenLM may automatically detect the idle FlexLM licenses, release them back into the licensing pool and suspend the application's process. This method is referred to as "Suspend and Resume" and it is described further in this document.

### Save and close

OpenLM can automatically save and close idle MATLAB, Autodesk, ArcGIS, CATIA, and SolidWorks sessions. It performs this with the use of dedicated extensions, specifically implemented by OpenLM for each of these applications. [This method is referred to as "Save and Close"](https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/).

### Agent procedures

OpenLM has added a new method for further enhancing idle license identification and retrieval. This is referred to as [retrieval through "Agent procedures"](https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/).

## Suspend and resume idle applications

The basic idle process management method is "Suspend and Resume". This method detects an idle process, identifies its respective license, releases the license into the common license pool, and "freezes" the application until the license is reclaimed. This method is a global one, intended for all sorts of FlexLM-licensed applications.

To configure OpenLM to automatically retrieve idle licenses by the Suspend and Resume method, the administrator needs to follow these steps. For software suites like ArcGIS that use the same license for multiple applications (for example, ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated with the same idle time values for each application that you want to control.

1. If the OpenLM Workstation Agent is not yet installed, download it on your workstation from the [OpenLM Download](https://www.openlm.com/downloads/). This can be done either manually, or deployed quietly by using msiexec.
2. If an Extension Supported application (that is, ArcGIS, Autocad, Matlab, SolidWorks) has been identified as installed on the computer, the OpenLM Extensions window will open with its selected checkbox. You can uncheck a software extension to rule that idle instances of Autocad, Matlab or SolidWorks.

![OpenLM Workstation Agent Extensions window with checkboxes for supported applications such as ArcGIS and Matlab.](/img/legacy/word-image-26687-1.png)

OPENLM WORKSTATION AGENT- EXTENSIONS

3. At the end of the installation process, the Workstation Agent Configuration dialog window opens. Type in the OpenLM server that the Workstation Agent is required to connect and select **Apply**.
4. Similar options are available through the deployment flags when installing the Agent silently.
5. Link the application's process to its respective license:

a. select the **OpenLM Start** → **Administration** → **Process Features**. The Administration - Process features window opens:

![EasyAdmin Administration Process features window for linking an application process to its license.](/img/legacy/word-image-26687-2.png)

ADMINISTRATION - PROCESS FEATURES

b. if the required process is not on the Processes list, it will be necessary to add it manually:

* select **Add** in the Process List frame, on the upper right corner of the Administration - Process features window. The Add process window appears;
* type in the exact process name, the vendor name, as it appears in the license file and a free text description of the process;

For a process that already exists in the process list: select it and select **Edit**.

6. Verify that the Features of interest are linked to the monitored Process. These features should appear on the lower panel of the Administration - Process features window. If not, then they should be added by either:

a. highlighting a current process and selecting **Add** on the bottom right corner of the Administration - Process features window. A dialog box appears. Select the required Feature name from there, or

b. by selecting **Add all vendor's features**. This will include all the vendor's recorded Features in the list of monitored features.

7. In the Edit process window (or the identical Add process window for new processes), select the drop-down menu of the License release method. Select **Suspension** (See "License retrieval policy" below):

![Edit process window with the License release method drop-down set to Suspension.](/img/legacy/word-image-26687-3.png)

EDIT PROCESS

8. Check the **Enabled** and the **Enable automatic license release functionality** checkboxes.
9. Set the **Enable automatic license release functionality** parameters, which determine the policy for license retrieval. Once they have a labeled idle:

* start releasing licenses after usage … (Default: 80): Licenses will become candidates for retrieval only if more than the defined percentage of licenses have been checked out;
* idle time license release threshold (Default: 15 min): Idle licenses will be made available for retrieval if they had been idle for more than the defined period.

10. Expand the **Advanced** panel and set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The shown default values should not be changed unless explicitly instructed by the OpenLM's support team. Changing these values inappropriately can harm the OpenLM system's performance.

* % Processor time (Default: 2): this is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if the use of the workstation's processor time is lower than the percentage shown;
* I/O Data operations / sec (Default: 2): similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the shown value;
* User usage (Default: 2): the processor utilization for user-mode processes on the workstation.

11. Select **Save**.

## What now?

That's it. OpenLM is now set to optimize your licensed application through the "Suspend and Resume" method:

* idle applications will be suspended on the workstation. An appropriate notification will pop up on the workstation monitor;
* the application activity may be resumed either through the suspension notification or through the Personal Dashboard interface **Recently closed documents** on the end-user's workstation.
