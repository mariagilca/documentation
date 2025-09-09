---
title: "License retrieval of idle applications – Enhanced  Workstation Agent procedures"
date: "2023-11-05T21:42:51"
permalink: "https://www.openlm.com/docs/openlm-slm-features/license-retrieval-manual-method-and-monitoring-idle-application-time/license-retrieval-of-idle-applications-matlab-autocad-arcgis-arcgis-pro-solidworks-and-catia-save-and-close/license-retrieval-of-idle-flexlm-applications/license-retrieval-of-idle-applications-enhanced-workstation-agent-procedures/"
posttype: "manual_documentation"
id: "6698"
---

<!-- wp:heading -->
<h2>License Retrieval</h2>
<!-- /wp:heading --><!-- wp:paragraph -->

The OpenLM License management tool is designed to identify consumed licenses that are sitting idle and retrieve them to their license pools, thus improving license usage and availability throughout the organization. There are several methods to obtain such optimization:

<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->
<h3>Manually</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

License administrators can monitor the OpenLM EasyAdmin user interface, and <a href="https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/">manually return a license to the license pool</a>.

<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->
<h3>Suspend and Resume</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

OpenLM automatically detects idle FlexLM licenses, removes them, and suspends the application’s process. This method is <a href="https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c/">referred to as “Suspend and Resume”</a>.

<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->
<h3>Save and Close</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

OpenLM automatically saves and closes idle MATLAB, Autodesk, ArcGIS, Harmony, Kingdom, and Petra sessions. It does so with the use of dedicated extensions, specifically implemented by OpenLM for each of these applications. <a href="https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/">This method is referred to as “Save and Close”</a>.

<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->
<h3>Workstation Agent procedures</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

Starting from OpenLM v3.1 there is a new method for further enhancing idle license identification and retrieval. This is referred to as retrieval through “Agent procedures”. This method is described in <a href="https://copy.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-applications-enhanced-agent-procedures-kb4005d/">this document</a>.

<!-- /wp:paragraph --><!-- wp:heading -->
<h3>Workstation Agent procedures requirements</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

OpenLM has been addressed by many customers in requests to enhance its license retrieval capabilities. These requests included:

<!-- /wp:paragraph --><!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
 <li>General purpose license retrieval, of licenses managed by any type of license server (not just for FlexLM).</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Conditional license retrieval (e.g.: “close idle application A only if application B is inactive”)</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Close idle applications of ‘Unmanaged’ licenses (licenses that are not managed by a license server that is queried by OpenLM)</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --><!-- wp:paragraph -->

OpenLM v3.1 and up provides a script-based, flexible, configurable mechanism to facilitate such requests and accommodate future scenarios.

<!-- /wp:paragraph --><!-- wp:heading -->
<h2>Detecting idle processes, and linking them to monitored features</h2>
<!-- /wp:heading --><!-- wp:paragraph -->

The following steps are required to configure the “Procedure” method for an application. For software suites like ArcGIS that use the same license for multiple applications (e.g. ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated with the same idle time values for each application that you want to automatically release.

<!-- /wp:paragraph --><!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
 <li>If not previously done, Install the OpenLM Workstation Agent onto the workstation from <a href="https://copy.openlm.com/?page_id=729">OpenLM Download</a>. This can be done either manually or deployed quietly.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Towards the end of the installation process, the Agent Configuration dialog window opens. Type in the OpenLM SLM with which the Workstation Agent is required to connect, and click Apply. A similar option is available through the deployment flags when installing the Workstation Agent silently.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Link the application’s process to its respective license:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --><!-- wp:paragraph -->

Click the EasyAdmin Start → Administration → Process Features. The Process Features window opens.

<!-- /wp:paragraph --><!-- wp:image {"id":43579} -->
<figure class="wp-block-image"><img class="wp-image-43579" src="https://copy.openlm.com/wp-content/uploads/2021/02/process-features.png" alt="Process features" /></figure>
<!-- /wp:image --><!-- wp:paragraph -->

If the required process is not on the Processes list, it will need to be added manually:

<!-- /wp:paragraph --><!-- wp:list -->
<ul><!-- wp:list-item -->
 <li>Click the EasyAdmin Start button.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Select <strong>OpenLM → Processes Features</strong>. The Processes table appears:</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Click ‘<strong>Add</strong>’ in the Process List frame, on the top right–hand side of the “Process features” window. The “Add process” window appears: <img src="https://copy.openlm.com/wp-content/uploads/2021/02/add-process.png" alt="Add process" /></li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Type in the exact process name, the vendor name as appears in the license file, and a free text description of the process.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><!-- wp:paragraph -->

For processes that already exist in the process list, select them and click ‘<strong>Edit’</strong>.

<!-- /wp:paragraph --><!-- wp:list {"ordered":true,"start":4} -->
<ol start="4"><!-- wp:list-item -->
 <li>Verify that the Features of interest are linked to the monitored Process. These features should appear in the bottom half of the Process / Features window. If not, then they should be added by either:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --><!-- wp:paragraph -->

4a. Highlight a current process, and click ‘<strong>Add</strong>’ on the lower-righthand corner of the “Process features” window. A dialog box appears. Select the required Feature name from there.

<!-- /wp:paragraph --><!-- wp:paragraph -->

or

<!-- /wp:paragraph --><!-- wp:paragraph -->

Click “<strong>Add all vendor’s features”</strong>. This will include all the vendor’s recorded Features in the list of monitored features.

<!-- /wp:paragraph --><!-- wp:list {"ordered":true,"start":5} -->
<ol start="5"><!-- wp:list-item -->
 <li>If a WorkstationAgent procedure does not yet exist, click <strong>EasyAdmin Start → Administration → “Agent Procedures”</strong>. The “Agent Procedures” window opens. Click ‘<strong>Add</strong>’ and add a new procedure (e.g.: TEST).</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --><!-- wp:image {"id":43581} -->
<figure class="wp-block-image"><img class="wp-image-43581" src="https://copy.openlm.com/wp-content/uploads/2021/02/administration-agent-procedures.png" alt="Administration - Agent procedures" /></figure>
<!-- /wp:image --><!-- wp:list {"ordered":true,"start":6} -->
<ol start="6"><!-- wp:list-item -->
 <li>In the “Edit process” window (or the identical “Add process” window for new processes) check the ‘<strong>Enabled</strong>’ and the “<strong>Enable License release functionality</strong>” checkboxes.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Click the drop-down menu at the License release method. Select ‘Procedure’, and fill in the procedure name.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Set the “<strong>Enable License release functionality</strong>” parameters. These parameters determine the policy for license retrieval, once they have been labeled Idle.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --><!-- wp:list -->
<ul><!-- wp:list-item -->
 <li>Start releasing licenses after usage … (Default: 80): Licenses will only become candidates for retrieval only if more than the defined percentage of licenses have been checked out.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Idle time license release threshold (Default: 15 min): Idle licenses will be made available for retrieval if they had been idle for more than the defined period.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><!-- wp:list {"ordered":true,"start":9} -->
<ol start="9"><!-- wp:list-item -->
 <li>Expand the ‘<strong>Advanced</strong>’ panel, and set the system resource threshold parameters. These numbers are thresholds used for determining whether the monitored application is idle. The default values shown should not be changed unless explicitly instructed by OpenLM’s support team. Changing these values inappropriately can harm the OpenLM system’s performance.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --><!-- wp:list -->
<ul><!-- wp:list-item -->
 <li>% Processor time (Default: 2): This is the CPU usage percentage threshold over which the application is considered active. The software will only be closed if its use of the workstation’s processor time is lower than the percentage shown</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>I/O Data operations/sec (Default: 2): Similarly, this is an I/O threshold over which the application is considered active. The software will only be closed if the number of disk operations per second is lower than the value shown.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>User usage (Default: 2): The processor usage for user-mode processes on the workstation.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><!-- wp:list {"ordered":true,"start":10} -->
<ol start="10"><!-- wp:list-item -->
 <li>Click ‘<strong>Save</strong>’.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --><!-- wp:paragraph -->

OpenLM is now configured to monitor and detect idle processes and features. Now the actual procedure that dictates the license retrieval policy needs to be set.

<!-- /wp:paragraph --><!-- wp:heading -->
<h2>Setting up an Agent Procedure</h2>
<!-- /wp:heading --><!-- wp:paragraph -->

Agent procedures may comprise multiple steps and may invoke external scripts. The order and relation of procedure steps as well as the content of each step affect the procedure flow. To configure a procedure, select one from the “Agent procedures” window, and click the ‘Edit’ button.The “Edit procedure” window opens.

<!-- /wp:paragraph --><!-- wp:image {"id":43582} -->
<figure class="wp-block-image"><img class="wp-image-43582" src="https://copy.openlm.com/wp-content/uploads/2021/02/agent-procedure-editor.png" alt="Agent Procedure Editor" /></figure>
<!-- /wp:image --><!-- wp:heading {"level":3} -->
<h3>The “Edit procedure” window</h3>
<!-- /wp:heading --><!-- wp:list -->
<ul><!-- wp:list-item -->
 <li>On The “Edit procedure” window each row represents a procedure step.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Steps can be added by clicking the <strong>“Add actions</strong>” button.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Each step needs to be separately configured by setting up the content of 3 columns: “Action type”, “Script info” and “Execute condition”.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Help information is available by clicking the information ‘?’ icon on each column header.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Each step can be set as active or inactive, according to the ‘Active’ check box.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><!-- wp:heading {"level":3} -->
<h3>Action Type</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

Selects the type of step to execute:

<!-- /wp:paragraph --><!-- wp:list -->
<ul><!-- wp:list-item -->
 <li>License Manager – Access relevant License Manager to release/kill the feature.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Agent Kill – Instruct the OpenLM Agent to kill a specific process.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Agent Suspend – Instruct the OpenLM Agent to suspend a specific process.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Agent Script – Instruct the OpenLM Agent to execute a script or command on the OpenLM Agent machine.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><!-- wp:heading {"level":3} -->
<h3>Script info</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

This column contains command lines or paths to batch files which will be run by the Windows shell on the OpenLM Agent machine. This enables administrators to perform conditional sequences of any Windows shell command (e.g. invoke or kill applications) as part of the Agent procedure. Click the info ‘?’ icon for more information.

<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->
<h3>Execute condition</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

This column reflects the procedure’s flow control.

<!-- /wp:paragraph --><!-- wp:list -->
<ul><!-- wp:list-item -->
 <li>No Wait – step can be invoked regardless of the previous step. This is the default value for the first step.</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Wait Complete – Wait for the previous step to complete</li>
<!-- /wp:list-item --><!-- wp:list-item -->
 <li>Wait Success – Wait for the previous step to complete successfully. If one step requires Wait Success and the previous step is completed with an error, the procedure is terminated. No further steps are executed.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><!-- wp:heading -->
<h2>Now what ?</h2>
<!-- /wp:heading --><!-- wp:paragraph -->

OpenLM can now perform any sequence of conditional actions following the detection of idle applications.

<!-- /wp:paragraph --><!-- wp:paragraph -->

Please feel free to contact the OpenLM Support team (Support@OpenLM.com) in case you require further assistance in implementing your Agent procedures.

<!-- /wp:paragraph -->
