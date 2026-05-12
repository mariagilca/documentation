---
title: "License Harvesting of Idle Applications (MATLAB, AutoCAD, ArcGIS, ArcGIS Pro, SOLIDWORKS, and CATIA) - Save and Close"
description: "One of the license retrieval methods that OpenLM offers is the \"Save and Close\" method, also referred to as the \"Extension\" method. As the name implies."
sidebar_label: "License Harvesting of Idle Applications (MATLAB, AutoCAD, ArcGIS, ArcGIS Pro, SOLIDWORKS, and CATIA) - Save and Close"
---

{/* Source: https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/ */}

One of the license retrieval methods that OpenLM offers is the "Save and Close" method, also referred to as the "Extension" method. As the name implies, using this method saves the user's currently opened project and closes the application, returning the license to the pool.

This method can be configured for the following applications:

* ArcGIS and ArcGIS Pro
* AutoCAD (all features that use the acad.exe process)
* SOLIDWORKS
* MATLAB
* CATIA
* Harmony
* Kingdom
* Petra

## Overview

With the "Save and Close" method, once a workstation with an idle application has been detected, the user's currently opened project is saved and the application is closed. The autosave location is configurable, so the saved session can avoid overwriting the current project. See the "Extension dedicated functions" section for more information.

## Workstation Agent Installation

The "Save and close" method requires the installation of Workstation Agent (previously OpenLM Agent) on the end-user workstation.

1. If the application is open, close the extension-enabled application (ArcGIS / ArcGIS Pro / MATLAB / AutoCAD / SOLIDWORKS, CATIA ) on all end-user workstations.

2. Install Workstation Agent (previously OpenLM Agent & Personal Dashboard on the workstation. The latest installer is available on the [OpenLM download page](https://www.openlm.com/download/).

3.  When installing Workstation Agent manually, if an extension-supported application is detected on the computer, the OpenLM Extensions dialog will have the appropriate checkboxes available. Check for each application that you want to use "Save and Close" (relevant only for ArcMap, ArcGIS Pro, AutoCAD, MATLAB, SOLIDWORKS and so on)

![Screenshot: Workstation Agent Installation](/img/legacy/kb/word-image-76.png)

At this point, Workstation Agent (previously OpenLM Agent) will have an extension for each of the supported applications. It is good practice to ensure that the extension has been properly installed. See the "Verify the OpenLM Extension Installation" appendix at the end of this document.

## Configuring OpenLM to employ "Save and Close"

The following steps are required to configure the "Save and Close" method for a supported application. For software suites like ArcGIS which use the same license for multiple applications (for example, ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated, setting the same idle time values for each application that you want to control.

1. Open the OpenLM EasyAdmin web application by going to **Windows Start → OpenLM → OpenLM EasyAdmin User Interface**.

2. Click **EasyAdmin Start → Administration → Process Features**. The Process Features window opens:

![Screenshot: Configuring OpenLM to employ "Save and Close"](/img/legacy/kb/word-image-77.png)

3. Select an extension activated application (ArcGIS / ArcGIS Pro / MATLAB / AutoCAD / SolidWorks), and click **Edit**.

4. In the Edit process window, from the **License release method** drop-down menu select Extension.

![Screenshot 2: Configuring OpenLM to employ "Save and Close"](/img/legacy/kb/word-image-78.png)

5. Make sure the **Enabled** and the **Enable automatic license release functionality** boxes are checked.

6. Set the "Enable automatic license release functionality" parameters. These parameters determine the policy for labeling an application as idle and how license retrieval proceeds:

* **Start releasing licenses after usage rate of (percentage)**: The usage rate is expressed as a percentage of used licenses relative to the total amount of licenses available for this vendor/application. Once the set percentage threshold of used licenses has been reached, licenses that meet the Idle time license release threshold will be released. E.g. if there are 100 total licenses, the threshold is set to 80%, then when there are 80 used licenses or more, applications that have been idle for the value below (for example, 15 min) are released automatically.
* **Idle time license release threshold (minutes)**: Licenses will be marked as idle and released if they have been idle for more than the specified amount of time.

7. The ‘Advanced' panel can be expanded to set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The default values shown should not be changed unless explicitly instructed by OpenLM Support. Wrong values can adversely affect the OpenLM system's performance.

* % Processor time (Default: 2): This is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if its use of the workstation's processor time is lower than the percentage shown
* I/O Data operations/sec (Default: 2): Similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the value shown.
* User usage (Default: 2): The processor utilization for user-mode processes on the workstation.

8. Click **Save**.

**That's it.**

Your license usage will now be automatically optimized by OpenLM's "Save and Close" method.

* Idle applications will have the current project saved and the application closed. An appropriate notification will pop up on the workstation to notify the user.
* Activity may be resumed through Workstation Agents through the Personal Dashboard's "Recently closed" interface on the end-user workstation.

**Save and Close Method for CATIA**: To configure the Save and Close method for CATIA, go to **EasyAdmin Start → Administration → Process Features**. The Process Features window opens:

1. Click the **Add** button. Mention the Process name, for example, ‘CNEXT'. Add the Description and select the Vendor Name.
2. Make sure the **Enabled** and the **Enable automatic license release functionality** boxes are checked.
3. From the **License release method** drop-down menu, select **Extension**.

![Screenshot 3: Configuring OpenLM to employ "Save and Close"](/img/legacy/kb/word-image-79.png)

![Screenshot 4: Configuring OpenLM to employ "Save and Close"](/img/legacy/kb/word-image-80.png)

4. Set the "Enable automatic license release functionality" parameters. These parameters determine the policy for labeling an application as idle and how license retrieval proceeds:

* **Start releasing licenses after usage rate of (percentage)**: The usage rate is expressed as a percentage of used licenses relative to the total amount of licenses available for this vendor/application. Once the set percentage threshold of used licenses has been reached, licenses that meet the Idle time license release threshold will be released. E.g. If there are 100 total licenses, the threshold is set to 80%, then when there are 80 used licenses or more, applications that have been idle for the value below (for example, 15 min) are released automatically.
* **Idle time license release threshold (minutes)**: Licenses will be marked as idle and released if they have been idle for more than the specified amount of time.

5. **Track process Idle / Active Periods**: Select the time (in minutes) for the Idle Time Report Threshold. This means that the application will be considered idle after the defined amount of time in minutes of inactivity.

6. The ‘Advanced' panel can be expanded to set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The default values shown should not be changed unless explicitly instructed by OpenLM Support. Wrong values can adversely affect the OpenLM system's performance.

* % Processor time (Default: 2): This is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if its use of the workstation's processor time is lower than the percentage shown
* I/O Data operations/sec (Default: 2): Similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the value shown. User usage (Default: 2): The processor utilization for user-mode processes on the workstation.

7. Click **Save**.

CATIA usage will now be automatically optimized by OpenLM's "Save and Close" method.

* The idle application will have the current project saved and the application closed.
* An appropriate notification will pop up on the workstation to notify the user.

![Screenshot 5: Configuring OpenLM to employ "Save and Close"](/img/legacy/kb/word-image-81.png)

**Edit Process - CATIA**

1. Open the OpenLM EasyAdmin web application by going to **Windows Start → OpenLM → OpenLM EasyAdmin User Interface**.

2. Click **EasyAdmin Start → Administration → Process Features**. The Process Features window opens:

3. Select the CATIA process, and click **Edit**.

![Screenshot 6: Configuring OpenLM to employ "Save and Close"](/img/legacy/kb/word-image-82.png)

4. In the **Edit Process** window, you can make the required changes and click the **SAVE** button to apply the changes.

![Screenshot 7: Configuring OpenLM to employ "Save and Close"](/img/legacy/kb/word-image-83.png)

### Folder to Save Closed Projects

Specify the folder in which to save extension-closed project documents, if the "Overwrite existing projects" box is unchecked or if the project was not saved **at least once to a specific location after being created**.

### Overwrite Existing Projects

* Checked (Default): The project document will be saved as if the user clicked Save in the respective application. The document is saved in its original location, thus overwriting the original file. If the document has not been saved at least once after creation, the location for saving will be the one in "Folder to save closed projects".
* Unchecked: The project document will be saved as a copy in the "Folder to save closed projects" path as if the user clicked "Save As…". The same filename is kept and the above folder path is used. The original file will remain untouched (unless the source folder path and the specified path is overlapping).

### Show extension list at software startup (for ArcGIS only):

* Checked: The application's extension list is shown when the application is restarted after being detected as idle and closed. This is useful for manually prompting users to confirm their usage of a certain extension.
* Unchecked (default): The application's extension list will not be shown when the application is restarted after being detected as idle and closed.

### Turn off licensed extensions at shutdown (for ArcGIS only):

* Checked (Default): Extensions that require licenses are closed together with the idle application. This requires the user to obtain a license for the extension when restarting the application.
* Unchecked: Extensions that require licenses are not closed together with the idle application.

### Turn off custom extensions (for ArcGIS only):

* Checked (Default): Extensions that do not require licenses are closed together with the idle application. This requires the user to obtain a license for the extension when restarting the application.
* Unchecked: Extensions that do not require licenses are not closed together with the idle application.

### Application's behavior when extension passes usage threshold (for ArcGIS only)

There are two ways to deal with an event when a licensed extension that is part of an application has passed the usage threshold:

1. The extension is turned off.
2. The application is shut down altogether.

### Actively shut any open applications down at (time set)

When this option is activated, any extension-supported applications that are still open will be shut down at the specified time. This can be useful if the license usage rate has not reached the defined threshold but you still want to close and release licenses at a certain time (for example, midnight). To use this function:

1. Check the "Shut application down" radio button
2. Set the time as to when any working applications will be automatically shut down.

### Hide "Set ArcGIS License Level" from agents

Checking this box will prevent users with Workstation Agent (previously OpenLM Agent) from being able to adjust the ArcGIS license levels.

### Software items that will not be saved nor reported when closed

This panel lists executables that would not have their data saved when the application is closed; for example, ArcCatalog.exe is a file browser that holds no substantial data so it would not be saved. Click 'Add' to add more executables to the list.

### List of directories for which projects will not be saved when closed

Any projects located in the specified directories will not be saved when the application is automatically closed. This is useful for projects that must maintain the same static information every time they are started. Click 'Add' to add more directories to the list.

## Appendix A: Verify the OpenLM Extension installation

### **ESRI ArcGIS Desktop**

* Click Customize → select Extensions
* Confirm that OpenLM ArcGIS Extension appears in the Extensions list and that the box is checked.

![Verifying Save and Close extension for ArcGIS](/img/legacy/kb/verifying-save-and-close-extension-for-arcgis-1.png)

### **ESRI ArcGIS Pro**

In the main menu, click on Add-In Manager and check if OpenLM\_ArcGISPro\_Extension\_2 is present.

![Verifying Save and Close extension for ArcGIS Pro](/img/legacy/kb/verifying-save-and-close-extension-for-arcgis-pro-1.png)

### **Autodesk AutoCAD**

"Save and Close" works for Autodesk software applications that use the acad.exe process. To verify:

* In AutoCAD Map 3D for example, type in the "OLM" command at the bottom of the AutoCAD window. If the Workstation Agent (previously OpenLM Agent) extension was installed, the end user should receive a message such as depicted below.

![Verifying Save and Close extension for AutoCAD](/img/legacy/kb/verifying-save-and-close-extension-for-autocad-1.png)

If the Extension is not installed, an error message will appear, stating that the "OLM" command is not recognized.

### **MathWorks MATLAB**

When opening MATLAB, the Command Window will display a STARTUP FILE status.

![Verifying Save and Close extension for MATLAB](/img/legacy/kb/verifying-save-and-close-extension-for-matlab-1.png)

### **Dassault Systèmes SOLIDWORKS**

Go to **Tools → Add-Ins**. The OpenLM Extension should be in the list and its box checked.

![Verifying Save and Close extension for SOLIDWORKS](/img/legacy/kb/verifying-save-and-close-extension-for-solidworks-1.png)
