---
title: "License Harvesting of Idle Applications (MATLAB, AutoCAD, ArcGIS, ArcGIS Pro, SOLIDWORKS, and CATIA) – Save and Close"
date: "2023-11-05T21:38:33"
permalink: "https://www.openlm.com/docs/openlm-slm-features/license-retrieval-manual-method-and-monitoring-idle-application-time/license-retrieval-of-idle-applications-matlab-autocad-arcgis-arcgis-pro-solidworks-and-catia-save-and-close/"
posttype: "manual_documentation"
id: "6692"
---

One of the license retrieval methods that OpenLM offers is the “Save and Close” method, also referred to as the “Extension” method. As the name implies, using this method saves the user’s currently opened project and closes the application, returning the license to the pool.

This method can be configured for the following applications:
<ul>
 <li>ArcGIS and ArcGIS Pro</li>
 <li>AutoCAD (all features that use the acad.exe process)</li>
 <li>SOLIDWORKS</li>
 <li>MATLAB</li>
 <li>CATIA</li>
 <li>Harmony</li>
 <li>Kingdom</li>
 <li>Petra</li>
</ul>
<h2>Overview</h2>
With the ”Save and Close” method, once a workstation with an idle application has been detected, the user’s currently opened project is saved and the application is closed. The autosave location is configurable, so the saved session can avoid overwriting the current project. See the ”Extension dedicated functions” section below for more information.
<h2>Workstation Agent Installation</h2>
The “Save and close” method requires the installation of Workstation Agent (previously OpenLM Agent) on the end-user workstation.

1. If the application is open, close the extension-enabled application (ArcGIS / ArcGIS Pro / MATLAB / AutoCAD / SOLIDWORKS, CATIA ) on all end-user workstations.

2. Install Workstation Agent (previously OpenLM Agent & Personal Dashboard on the workstation. The latest installer is <a href="https://www.openlm.com/download/">here</a>.

3.  When installing Workstation Agent manually, if an extension-supported application is detected on the computer, the OpenLM Extensions dialog will have the appropriate checkboxes available. Check for each application that you want to use “Save and Close” (relevant only for ArcMap, ArcGIS Pro, AutoCAD, MATLAB, SOLIDWORKS etc.)

<img class="wp-image-34519" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-76.png" width="745" height="579" />

At this point, Workstation Agent (previously OpenLM Agent) will have an extension for each of the supported applications. It is good practice to ensure that the extension has been properly installed. See the “Verify the OpenLM Extension Installation” appendix at the end of this document.
<h2>Configuring OpenLM to employ “Save and Close”</h2>
The following steps are required to configure the “Save and Close” method for a supported application. For software suites like ArcGIS which use the same license for multiple applications (e.g. ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated, setting the same idle time values for each application that you want to control.

1. Open the OpenLM EasyAdmin web application by going to <strong>Windows Start → OpenLM → OpenLM EasyAdmin User Interface</strong>.

2. Click <strong>EasyAdmin Start → Administration → Process Features</strong>. The Process Features window opens:

<img class="wp-image-34520" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-77.png" />

3. Select an extension enabled application (ArcGIS / ArcGIS Pro / MATLAB / AutoCAD / SolidWorks), and click <strong>Edit</strong>.

4. In the Edit process window, from the <strong>License release method</strong> drop-down menu select Extension.

<img class="wp-image-34521" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-78.png" />

5. Make sure the <strong>Enabled</strong> and the <strong>Enable automatic license release functionality</strong> boxes are checked.

6. Set the “Enable automatic license release functionality” parameters. These parameters determine the policy for labeling an application as idle and how license retrieval proceeds:
<ul>
 <li><strong>Start releasing licenses after usage rate of (percentage)</strong>: The usage rate is expressed as a percentage of used licenses relative to the total amount of licenses available for this vendor/application. Once the set percentage threshold of used licenses has been reached, licenses that meet the Idle time license release threshold will be released. E.g. if there are 100 total licenses, the threshold is set to 80%, then when there are 80 used licenses or more, applications that have been idle for the value below (e.g. 15 min) are released automatically.</li>
 <li><strong>Idle time license release threshold (minutes)</strong>: Licenses will be marked as idle and released if they have been idle for more than the specified amount of time.</li>
</ul>
7. The ‘Advanced’ panel can be expanded to set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The default values shown should not be changed unless explicitly instructed by OpenLM Support. Wrong values can adversely affect the OpenLM system’s performance.
<ul>
 <li>% Processor time (Default: 2): This is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if its use of the workstation’s processor time is lower than the percentage shown</li>
 <li>I/O Data operations/sec (Default: 2): Similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the value shown.</li>
 <li>User usage (Default: 2): The processor utilization for user-mode processes on the workstation.</li>
</ul>
8. Click <strong>Save</strong>.

<strong>That’s it!</strong>

Your license usage will now be automatically optimized by OpenLM’s “Save and Close” method.
<ul>
 <li>Idle applications will have the current project saved and the application closed. An appropriate notification will pop up on the workstation to notify the user.</li>
 <li>Activity may be resumed via Workstation Agents via the Personal Dashboard's "Recently closed" interface on the end-user workstation.</li>
</ul>
<strong>Save and Close Method for CATIA</strong>: To configure the Save and Close method for CATIA, go to <strong>EasyAdmin Start → Administration → Process Features</strong>. The Process Features window opens:
<ol>
 <li>Click the <strong>Add </strong>button. Mention the Process name, for example, ‘CNEXT’. Add the Description and select the Vendor Name.</li>
 <li>Make sure the <strong>Enabled</strong> and the <strong>Enable automatic license release functionality</strong> boxes are checked.</li>
 <li>From the <strong>License release method</strong> drop-down menu, select <strong>Extension</strong>.</li>
</ol>
<img class="wp-image-34522" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-79.png" />

<img class="wp-image-34523" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-80.png" />

4. Set the “Enable automatic license release functionality” parameters. These parameters determine the policy for labeling an application as idle and how license retrieval proceeds:
<ul>
 <li><strong>Start releasing licenses after usage rate of (percentage)</strong>: The usage rate is expressed as a percentage of used licenses relative to the total amount of licenses available for this vendor/application. Once the set percentage threshold of used licenses has been reached, licenses that meet the Idle time license release threshold will be released. E.g. If there are 100 total licenses, the threshold is set to 80%, then when there are 80 used licenses or more, applications that have been idle for the value below (e.g. 15 min) are released automatically.</li>
 <li><strong>Idle time license release threshold (minutes)</strong>: Licenses will be marked as idle and released if they have been idle for more than the specified amount of time.</li>
</ul>
5. <strong>Track process Idle / Active Periods</strong>: Select the time (in minutes) for the Idle Time Report Threshold. This means that the application will be considered idle after the defined amount of time in minutes of inactivity.

6. The ‘Advanced’ panel can be expanded to set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The default values shown should not be changed unless explicitly instructed by OpenLM Support. Wrong values can adversely affect the OpenLM system’s performance.
<ul>
 <li>% Processor time (Default: 2): This is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if its use of the workstation’s processor time is lower than the percentage shown</li>
 <li>I/O Data operations/sec (Default: 2): Similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the value shown. User usage (Default: 2): The processor utilization for user-mode processes on the workstation.</li>
</ul>
7. Click <strong>Save</strong>.

CATIA usage will now be automatically optimized by OpenLM’s “Save and Close” method.
<ul>
 <li>The idle application will have the current project saved and the application closed.</li>
 <li>An appropriate notification will pop up on the workstation to notify the user.</li>
</ul>
<img class="wp-image-34524" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-81.png" width="693" height="203" />

<strong>Edit Process – CATIA</strong>

1. Open the OpenLM EasyAdmin web application by going to <strong>Windows Start → OpenLM → OpenLM EasyAdmin User Interface</strong>.

2. Click <strong>EasyAdmin Start → Administration → Process Features</strong>. The Process Features window opens:

3. Select the CATIA process, and click <strong>Edit</strong>.

<img class="wp-image-34525" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-82.png" />

4. In the <strong>Edit Process </strong>window, you can make the required changes and click the <strong>SAVE </strong>button to apply the changes.

<img class="wp-image-34526" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-83.png" />
<h3>Folder to Save Closed Projects</h3>
Specify the folder in which to save extension-closed project documents, if the “Overwrite existing projects” box is unchecked or if the project was not saved <strong>at least once to a specific location after being created</strong>.
<h3>Overwrite Existing Projects</h3>
<ul>
 <li>Checked (Default): The project document will be saved as if the user clicked Save in the respective application. The document is saved in its original location, thus overwriting the original file. If the document has not been saved at least once after creation, the location for saving will be the one in “Folder to save closed projects”.</li>
 <li>Unchecked: The project document will be saved as a copy in the “Folder to save closed projects” path as if the user clicked “Save As…”. The same filename is kept and the above folder path is used. The original file will remain untouched (unless the source folder path and the specified path is overlapping).</li>
</ul>
<h3>Show extension list at software startup (for ArcGIS only):</h3>
<ul>
 <li>Checked: The application’s extension list is shown when the application is restarted after being detected as idle and closed. This is useful for manually prompting users to confirm their usage of a certain extension.</li>
 <li>Unchecked (default): The application’s extension list will not be shown when the application is restarted after being detected as idle and closed.</li>
</ul>
<h3> Turn off licensed extensions at shutdown (for ArcGIS only):</h3>
<ul>
 <li>Checked (Default): Extensions that require licenses are closed together with the idle application. This requires the user to obtain a license for the extension when restarting the application.</li>
 <li>Unchecked: Extensions that require licenses are not closed together with the idle application.</li>
</ul>
<h3>Turn off custom extensions (for ArcGIS only):</h3>
<ul>
 <li>Checked (Default): Extensions that do not require licenses are closed together with the idle application. This requires the user to obtain a license for the extension when restarting the application.</li>
 <li>Unchecked: Extensions that do not require licenses are not closed together with the idle application.</li>
</ul>
<h3>Application’s behavior when extension passes usage threshold (for ArcGIS only)</h3>
There are two ways to deal with an event when a licensed extension that is part of an application has passed the usage threshold:
<ol>
 <li>The extension is turned off.</li>
 <li>The application is shut down altogether.</li>
</ol>
<h3>Actively shut any open applications down at (time set)</h3>
When this option is enabled, any extension-supported applications that are still open will be shut down at the specified time. This can be useful if the license usage rate has not reached the defined threshold but you still want to close and release licenses at a certain time (e.g. midnight). To use this function:
<ol>
 <li>Check the “Shut application down” radio button</li>
 <li>Set the time as to when any working applications will be automatically shut down.</li>
</ol>
<h3>Hide “Set ArcGIS License Level” from agents</h3>
Checking this box will prevent users with Workstation Agent (previously OpenLM Agent) from being able to adjust the ArcGIS license levels.
<h3>Software items that will not be saved nor reported when closed</h3>
This panel lists executables that would not have their data saved when the application is closed; e.g.: ArcCatalog.exe is a file browser that holds no substantial data so it would not be saved. Click ’Add’ to add more executables to the list.
<h3>List of directories for which projects will not be saved when closed</h3>
Any projects located in the specified directories will not be saved when the application is automatically closed. This is useful for projects that must maintain the same static information every time they are started. Click ’Add’ to add more directories to the list.
<h2>Appendix A: Verify the OpenLM Extension installation</h2>
<h3><strong>ESRI ArcGIS Desktop</strong></h3>
<ul>
 <li>Click Customize → select Extensions</li>
 <li>Confirm that OpenLM ArcGIS Extension appears in the Extensions list and that the box is checked.</li>
</ul>
<img class="wp-image-34528" src="https://www.openlm.com/wp-content/uploads/2021/02/verifying-save-and-close-extension-for-arcgis-1.png" alt="Verifying Save and Close extension for ArcGIS" />
<h3><strong>ESRI ArcGIS Pro</strong></h3>
In the main menu, click on Add-In Manager and check if OpenLM_ArcGISPro_Extension_2 is present.

<img class="wp-image-34529" src="https://www.openlm.com/wp-content/uploads/2021/02/verifying-save-and-close-extension-for-arcgis-pro-1.png" alt="Verifying Save and Close extension for ArcGIS Pro" />
<h3><strong>Autodesk AutoCAD</strong></h3>
“Save and Close” works for Autodesk software applications that use the acad.exe process. To verify:
<ul>
 <li>In AutoCAD Map 3D for example, type in the “OLM” command at the bottom of the AutoCAD window. If the Workstation Agent (previously OpenLM Agent) extension was installed, the end user should receive a message such as depicted below.</li>
</ul>
<img class="wp-image-34530" src="https://www.openlm.com/wp-content/uploads/2021/02/verifying-save-and-close-extension-for-autocad-1.png" alt="Verifying Save and Close extension for AutoCAD" />

If the Extension is not installed, an error message will appear, stating that the “OLM” command is not recognized.
<h3><strong>MathWorks MATLAB</strong></h3>
When opening MATLAB, the Command Window will display a STARTUP FILE status.

<img class="wp-image-34531" src="https://www.openlm.com/wp-content/uploads/2021/02/verifying-save-and-close-extension-for-matlab-1.png" alt="Verifying Save and Close extension for MATLAB" />
<h3><strong>Dassault Systèmes SOLIDWORKS</strong></h3>
Go to <strong>Tools → Add-Ins</strong>. The OpenLM Extension should be in the list and its box checked.

<img class="wp-image-34532" src="https://www.openlm.com/wp-content/uploads/2021/02/verifying-save-and-close-extension-for-solidworks-1.png" alt="Verifying Save and Close extension for SOLIDWORKS" />
