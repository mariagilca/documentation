---
title: License Harvesting of Idle FlexLM Applications
sidebar_position: 1
description: Guide to harvesting licenses of idle FlexLM applications using OpenLM.
---

## License harvesting
The OpenLM license management tool is designed to identify and retrieve idle licenses, improving license utilization and availability. OpenLM offers several methods to achieve this optimization:

## Manually: 
License administrators can monitor the OpenLM EasyAdmin User Interface and manually return a license to the license pool.

## Suspend and Resume: 
OpenLM can automatically detect idle FlexLM licenses, release them, and suspend the application's process.

## Save and Close:
 OpenLM can automatically save and close idle MATLAB, Autodesk, ArcGIS, CATIA, and SOLIDWORKS sessions using dedicated extensions. This method is referred to as "Save and Close".

## Agent Procedures: 
A new method for enhancing idle license identification and retrieval through Agent procedures.

## Suspend and resume idle applications
The basic idle process management method is "Suspend and Resume." This method detects an idle process, identifies its license, releases it back into the license pool, and "freezes" the application until the license is reclaimed. This method is a global one, intended for all types of FlexLM-licensed applications.

To configure OpenLM to automatically retrieve idle licenses by the Suspend and Resume method, follow the steps below. For software suites like ArcGIS that use the same license for multiple applications (e.g., ArcMap, ArcCatalog, ArcGlobe), these steps must be repeated with the same idle time values for each application you want to control.

If the OpenLM Workstation Agent is not yet installed, download it from the OpenLM Download page. It can be installed manually or deployed quietly via msiexec.

If an Extension Supported application (i.e., ArcGIS, AutoCAD, MATLAB, SOLIDWORKS) has been identified, the OpenLM Extensions window will open with its checkbox selected. You can uncheck a software extension to exclude idle instances of that application from being suspended.

!(img/openlm-workstation-agent-extensions.png)

At the end of the installation, the Workstation Agent Configuration dialog window opens. Enter the OpenLM server the Workstation Agent should connect to and click Apply.

Similar options are available through deployment flags for silent installation.

Link the application's process to its respective license:
a. Click OpenLM Start → Administration → Process Features. The Administration - Process features window opens.

!(img/openlm-administration-process-features.png)

b. If the required process is not on the list, you must add it manually:
    * Click **Add** in the **Process List** frame. The **Add process** window appears.
    * Enter the exact process name, the vendor name as it appears in the license file, and a description.
For a process that already exists in the process list, select it and click Edit.

Verify that the features of interest are linked to the monitored process. These features should appear on the lower panel of the Administration - Process features window. If not, add them by either:
a. Highlighting a process and clicking Add on the bottom right corner of the window. Select the required feature name from the dialog box that appears.
b. Clicking Add all vendor's features. This will include all the vendor's recorded features in the list.

In the Edit process window, click the dropdown menu for License release method and select Suspension.

!(img/openlm-edit-process-suspension.png)

Check the Enabled and Enable automatic license release functionality checkboxes.

Set the Enable automatic license release functionality parameters, which determine the policy for license retrieval once they are labeled as idle:

Start releasing licenses after usage… (Default: 80): Licenses will only become candidates for retrieval if more than the defined percentage of licenses have been checked out.

Idle time license release threshold (Default: 15 min): Idle licenses will be made available for retrieval if they have been idle for more than the defined period.

Expand the Advanced panel and set the system resource threshold parameters. These numbers are used to determine if the monitored application is idle. Do not change the default values unless instructed by OpenLM Support.

% Processor time (Default: 2): The CPU usage percentage threshold over which the application is considered active. The software will only be closed if its use of the workstation’s processor time is lower than the percentage shown.

I/O Data operations / sec (Default: 2): The I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the shown value.

User usage (Default: 2): The processor utilization for user-mode processes on the workstation.

Click Save.

## What now?
OpenLM is now set to optimize your licensed application through the "Suspend and Resume" method:

Idle applications will be suspended on the workstation, and a notification will pop up on the monitor.

The application activity can be resumed via the suspension notification or the Recently closed documents interface on the end-user's Personal Dashboard.

Referenced Images
img/openlm-workstation-agent-extensions.png

img/openlm-administration-process-features.png

img/openlm-edit-process-suspension.png