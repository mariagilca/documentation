---
title: License Harvesting of Idle Applications (MATLAB, AutoCAD, ArcGIS, ArcGIS Pro, SOLIDWORKS, and CATIA) – Save and Close
sidebar_position: 1
description: Guide to harvesting licenses of idle applications and automatically saving and closing them in OpenLM.
---

The "Save and Close" method, also known as the "Extension" method, is an OpenLM license retrieval method that saves a user's currently opened project and closes the application, returning the license to the pool.

This method can be configured for the following applications:

ArcGIS and ArcGIS Pro

AutoCAD (all features using the acad.exe process)

SOLIDWORKS

MATLAB

CATIA

Harmony

Kingdom

Petra

## Overview
With the "Save and Close" method, once an idle application has been detected on a workstation, the user's current project is saved and the application is closed. The autosave location is configurable, so the saved session won't overwrite the current project. See the "Extension dedicated functions" section for more information.

## Workstation agent installation
The "Save and Close" method requires the Workstation Agent to be installed on the end-user workstation.

If the application is open, close the extension-enabled application (e.g., ArcGIS, AutoCAD, MATLAB, SOLIDWORKS, CATIA) on all end-user workstations.

Install the latest Workstation Agent. The latest installer is available here.

When installing manually, if an extension-supported application is detected on the computer, the OpenLM Extensions dialog will have the appropriate checkboxes available. Check the box for each application you want to use "Save and Close."

!(img/openlm-extensions-dialog.png)

At this point, the Workstation Agent will have an extension for each of the supported applications. It is a good practice to ensure the extension has been properly installed. See the "Verify the OpenLM Extension Installation" section below.

## Configuring OpenLM for "Save and Close"
The following steps are required to configure the "Save and Close" method for a supported application. For software suites like ArcGIS that use the same license for multiple applications (e.g., ArcMap, ArcCatalog, ArcGlobe), these steps must be repeated, setting the same idle time values for each application you want to control.

Open the OpenLM EasyAdmin web application by going to Windows Start → OpenLM → OpenLM EasyAdmin User Interface.

Click EasyAdmin Start → Administration → Process Features. The Process Features window opens.

!(img/openlm-process-features-window.png)

Select an extension-enabled application and click Edit.

In the Edit process window, select Extension from the License release method drop-down menu.

!(img/edit-process-window-extension-selected.png)

Make sure the Enabled and Enable automatic license release functionality boxes are checked.

Set the Enable automatic license release functionality parameters. These parameters determine the policy for labeling an application as idle and how license retrieval proceeds:

Start releasing licenses after usage rate of (percentage): The usage rate is a percentage of used licenses relative to the total licenses available for this vendor/application. When the threshold is met, licenses that meet the idle time threshold are released. For example, if there are 100 total licenses and the threshold is set to 80%, when 80 or more licenses are in use, applications idle for 15 minutes or more will be released automatically.

Idle time license release threshold (minutes): Licenses are marked as idle and released if they have been idle for more than the specified amount of time.

The Advanced panel can be expanded to set the system resource threshold parameters. These numbers are used to determine if a monitored application is idle. The default values should not be changed unless instructed by OpenLM Support.

% Processor time (Default: 2): The CPU usage percentage threshold over which the application is considered active. The software will only be closed if its processor time is lower than the set percentage.

I/O Data operations/sec (Default: 2): An I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the set value.

User usage (Default: 2): The processor utilization for user-mode processes on the workstation.

Click Save.

## That's it.
Your license usage will now be automatically optimized by OpenLM's "Save and Close" method.

Idle applications will have the current project saved and the application closed. A notification will pop up on the workstation to notify the user.

Activity may be resumed via the Personal Dashboard's "Recently closed" interface on the end-user workstation.

Save and close method for CATIA
To configure the Save and Close method for CATIA, go to EasyAdmin Start → Administration → Process Features.

Click the Add button. Enter the process name (e.g., CNEXT), description, and select the vendor name.

Make sure the Enabled and Enable automatic license release functionality boxes are checked.

From the License release method drop-down menu, select Extension.

!(img/openlm-add-process-window-catia.png)

!(img/openlm-edit-process-window-catia.png)

Set the Enable automatic license release functionality parameters as described in step 6 above.

Track process Idle / Active Periods: Select the time (in minutes) for the Idle Time Report Threshold. This means the application is considered idle after the defined amount of time.

The Advanced panel can be expanded to set the system resource threshold parameters, as described in step 7 above.

Click Save.

CATIA usage will now be automatically optimized by OpenLM’s “Save and Close” method.

The idle application will have the current project saved and the application closed.

An appropriate notification will pop up on the workstation to notify the user.

!(img/catia-notification-pop-up.png)

Edit process - CATIA
Open the OpenLM EasyAdmin web application.

Click EasyAdmin Start → Administration → Process Features.

Select the CATIA process and click Edit.

!(img/openlm-process-features-window-catia-selected.png)

In the Edit Process window, you can make the required changes and click Save to apply them.

!(img/openlm-edit-process-window-catia-final.png)

## Folder to save closed projects
This is the folder where extension-closed projects will be saved if the "Overwrite existing projects" box is unchecked or if the project has not been saved at least once to a specific location after being created.

## Overwrite existing projects
Checked (Default): The project is saved in its original location, overwriting the original file. If the document has not been saved at least once, it is saved in the location specified in "Folder to save closed projects."

Unchecked: The project is saved as a copy in the "Folder to save closed projects" path. The original file remains untouched unless the source and specified paths overlap.

## Show extension list at software startup (for ArcGIS only)
Checked: The application's extension list is shown when the application is restarted after being closed. This is useful for manually prompting users to confirm their usage of an extension.

Unchecked (default): The extension list will not be shown when the application is restarted.

## Turn off licensed extensions at shutdown (for ArcGIS only)
Checked (Default): Extensions that require licenses are closed with the idle application. This requires the user to obtain a license for the extension when restarting the application.

Unchecked: Extensions that require licenses are not closed.

Turn off custom extensions (for ArcGIS only)
Checked (Default): Extensions that do not require licenses are closed with the idle application. This requires the user to obtain a license for the extension when restarting the application.

Unchecked: Extensions that do not require licenses are not closed.

## Application's behavior when extension passes usage threshold (for ArcGIS only)
There are two ways to deal with an event when a licensed extension that is part of an application has passed the usage threshold:

The extension is turned off.

The application is shut down altogether.

## Actively shut any open applications down at (time set)
When this option is enabled, any extension-supported applications that are still open will be shut down at the specified time. This can be useful if the license usage rate has not reached the defined threshold but you still want to close and release licenses at a certain time (e.g., midnight). To use this function:

Check the "Shut application down" radio button.

Set the time when any working applications will be automatically shut down.

## Hide "Set ArcGIS license level" from agents
Checking this box prevents users with the Workstation Agent from adjusting the ArcGIS license levels.

## Software items that will not be saved nor reported when closed
This panel lists executables whose data will not be saved when the application is closed. For example, ArcCatalog.exe is a file browser that holds no substantial data, so it would not be saved. Click Add to add more executables to the list.

## List of directories for which projects will not be saved when closed
Any projects located in the specified directories will not be saved when the application is automatically closed. This is useful for projects that must maintain the same static information every time they are started. Click Add to add more directories to the list.

Appendix A: Verify the OpenLM Extension installation
## ESRI ArcGIS desktop
Click Customize → Extensions.

Confirm that OpenLM ArcGIS Extension appears in the Extensions list and that the box is checked.

!(img/openlm-arcgis-desktop-extension-verification.png)

## ESRI ArcGIS Pro
In the main menu, click Add-In Manager and check if OpenLM_ArcGISPro_Extension_2 is present.

!(img/openlm-arcgis-pro-extension-verification.png)

## Autodesk AutoCAD
"Save and Close" works for Autodesk software applications that use the acad.exe process. To verify:

In AutoCAD Map 3D, for example, type the "OLM" command at the bottom of the AutoCAD window. If the Workstation Agent extension was installed, the end user should receive a message like the one below.

!(img/openlm-autocad-extension-verification.png)

If the Extension is not installed, an error message will appear, stating that the "OLM" command is not recognized.

## MathWorks MATLAB
When opening MATLAB, the Command Window will display a STARTUP FILE status.

!(img/openlm-matlab-extension-verification.png)

## Dassault Systèmes SOLIDWORKS
Go to Tools → Add-Ins. The OpenLM Extension should be in the list with its box checked.

!(img/openlm-solidworks-extension-verification.png)