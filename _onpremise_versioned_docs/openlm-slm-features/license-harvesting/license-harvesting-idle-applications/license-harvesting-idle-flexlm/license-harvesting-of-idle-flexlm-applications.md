---
title: "License Harvesting of Idle FlexLM Applications"
date: "2023-11-05T21:41:31"
permalink: "https://www.openlm.com/docs/openlm-slm-features/license-retrieval-manual-method-and-monitoring-idle-application-time/license-retrieval-of-idle-applications-matlab-autocad-arcgis-arcgis-pro-solidworks-and-catia-save-and-close/license-retrieval-of-idle-flexlm-applications/"
posttype: "manual_documentation"
id: "6695"
---

<!-- wp:heading -->
<h2>License Harvesting</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The OpenLM License management tool is designed to identify consumed licenses that are sitting idle and return them to their license pools, thus improving license utilization and availability throughout the organization. There are several methods to obtain such optimization license utilization:</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Manually</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>License administrators can monitor the OpenLM EasyAdmin User Interface, and<a href="https://www.openlm.com/knowledge-base/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/"> manually return a license back to the license pool</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Suspend and Resume</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>OpenLM may automatically detect the idle FlexLM licenses, release them back into the licensing pool and suspend the application’s process. This method is referred to as “Suspend and Resume” and it is described further in this document.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Save and Close</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>OpenLM can automatically save and close idle MATLAB, Autodesk, ArcGIS, CATIA, and SolidWorks sessions. It performs this with the use of dedicated extensions, specifically implemented by OpenLM for each of these applications.<a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/"> This method is referred to as “Save and Close”</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Agent Procedures</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>OpenLM has added a new method for further enhancing idle license identification and retrieval. This is referred to as<a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/"> retrieval through “Agent procedures”</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Suspend and Resume Idle Applications</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The basic idle process management method is “Suspend and Resume”. This method detects an idle process, identifies its respective license, releases the license into the common license pool, and “freezes” the application until the license is reclaimed. This method is a global one, intended for all sorts of FlexLM-licensed applications.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>To configure OpenLM to automatically retrieve idle licenses by the Suspend and Resume method, the administrator needs to follow the steps below. For software suites like ArcGIS that use the same license for multiple applications (e.g. ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated with the same idle time values for each application that you want to control.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>If the OpenLM Workstation Agent is not yet installed, download it on your workstation from the <a href="https://www.openlm.com/downloads/">OpenLM Download</a>. This can be done either manually, or deployed quietly via msiexec.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>If an Extension Supported application (i.e. ArcGIS, Autocad, Matlab, SolidWorks) has been identified as installed on the computer, the OpenLM Extensions window will open with its selected checkbox. You can uncheck a software extension to rule that idle instances of Autocad, Matlab or SolidWorks.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:image {"id":46756} -->
<figure class="wp-block-image"><img class="wp-image-46756" src="https://copy.openlm.com/wp-content/uploads/2021/02/word-image-26687-1.png" alt="" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>OPENLM WORKSTATION AGENT- EXTENSIONS</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true,"start":3} -->
<ol start="3"><!-- wp:list-item -->
<li>At the end of the installation process, the Workstation Agent Configuration dialog window opens. Type in the OpenLM server that the Workstation Agent is required to connect and click <strong>Apply</strong>.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Similar options are available through the deployment flags when installing the Agent silently.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Link the application’s process to its respective license:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>a. click the <strong>OpenLM Start</strong> → <strong>Administration </strong>→ <strong>Process Features</strong>. The Administration – Process features window opens:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":46760} -->
<figure class="wp-block-image"><img class="wp-image-46760" src="https://copy.openlm.com/wp-content/uploads/2021/02/word-image-26687-2.png" alt="" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>ADMINISTRATION – PROCESS FEATURES</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>b. if the required process is not on the Processes list, it will be necessary to add it manually:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>click <strong>Add</strong> in the Process List frame, on the upper right corner of the Administration – Process features window. The Add process window appears;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>type in the exact process name, the vendor name, as it appears in the license file and a free text description of the process;</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>For a process that already exists in the process list: select it and click <strong>Edit</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true,"start":6} -->
<ol start="6"><!-- wp:list-item -->
<li>Verify that the Features of interest are linked to the monitored Process. These features should appear on the lower panel of the Administration – Process features window. If not, then they should be added by either:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>a. highlighting a current process and clicking <strong>Add</strong> on the bottom right corner of the Administration – Process features window. A dialog box appears. Select the required Feature name from there, or</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>b. by clicking <strong>Add all vendor’s features</strong>. This will include all the vendor’s recorded Features in the list of monitored features.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true,"start":7} -->
<ol start="7"><!-- wp:list-item -->
<li>In the Edit process window (or the identical Add process window for new processes), click the drop-down menu of the License release method. Select <strong>Suspension</strong> (See “License retrieval policy” below):</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:image {"id":46764} -->
<figure class="wp-block-image"><img class="wp-image-46764" src="https://copy.openlm.com/wp-content/uploads/2021/02/word-image-26687-3.png" alt="" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>EDIT PROCESS</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true,"start":8} -->
<ol start="8"><!-- wp:list-item -->
<li>Check the <strong>Enabled </strong>and the <strong>Enable automatic license release functionality</strong> checkboxes.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Set the <strong>Enable automatic license release functionality</strong> parameters, which determine the policy for license retrieval. Once they have a labeled idle:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>start releasing licenses after usage … (Default: 80): Licenses will become candidates for retrieval only if more than the defined percentage of licenses have been checked out;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>idle time license release threshold (Default: 15 min): Idle licenses will be made available for retrieval if they had been idle for more than the defined period.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list {"ordered":true,"start":10} -->
<ol start="10"><!-- wp:list-item -->
<li>Expand the <strong>Advanced</strong> panel and set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The shown default values should not be changed unless explicitly instructed by the OpenLM’s support team. Changing these values inappropriately can harm the OpenLM system’s performance.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>% Processor time (Default: 2): this is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if the use of the workstation’s processor time is lower than the percentage shown;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>I/O Data operations / sec (Default: 2): similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the shown value;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>User usage (Default: 2): the processor utilization for user-mode processes on the workstation.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list {"ordered":true,"start":11} -->
<ol start="11"><!-- wp:list-item -->
<li>Click <strong>Save</strong>.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>What now?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>That’s it. OpenLM is now set to optimize your licensed application through the “Suspend and Resume” method:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>idle applications will be suspended on the workstation. An appropriate notification will pop up on the workstation monitor;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>the application activity may be resumed either via the suspension notification or via the Personal Dashboard interface <strong>Recently closed documents</strong> on the end-user’s workstation.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p> </p>
<!-- /wp:paragraph -->
