---
title: "License harvesting (Manual method), and Monitoring Idle Application time"
date: "2023-11-05T21:33:47"
permalink: "https://www.openlm.com/docs/openlm-slm-features/license-retrieval-manual-method-and-monitoring-idle-application-time/"
posttype: "manual_documentation"
id: "6687"
---

<p class="c5"><span class="c1">License managers may sometimes label licenses as occupied, when in fact they are idle and wasting limited company resources. System administrators can utilize the OpenLM EasyAdmin User Interface to identify such conditions and retrieve idle licenses either manually or automatically.</span></p>
<p class="c5"><span class="c1">This document describes how to monitor application idle time and harvest idle licenses manually. </span></p>

<h2 class="c2"><a name="h.z9zg5bxt22g7"></a><span class="c6"> Idle application</span></h2>
<p class="c5"><span class="c1">If the user has not been actively using the license, the idle period would be shown in the OpenLM EasyAdmin User Interface ‘Start’ → ‘Operational’ → <span style="font-weight: 400;">“Currently consumed licenses” </span>→ “Recent App. Idle period” column. This information is sampled by the OpenLM Workstation  Agent module on each client workstation and propagated to the OpenLM SLM.</span></p>
 
<h2 class="c2"><a name="h.9juqdc3esjdu"></a><span class="c6">Setting a Process to License link</span></h2>
<p class="c5"><span class="c1">To obtain idle time information, follow the steps below</span></p>
<p class="c5"><span class="c1">1. Make sure you have OpenLM Workstation Agent installed on the end user’s workstation.</span></p>
<p class="c5"><span class="c1">2. Open the EasyAdmin interface: Windows <strong>Start → OpenLM → OpenLM EasyAdmin User Interface</strong>.</span></p>
<p class="c5"><span class="c1">3. Click the EasyAdmin </span><strong><span class="c1 c3">Start</span><span class="c1"> → </span><span class="c1 c3">Administration</span></strong><span class="c1">.</span></p>
<p class="c5"><span class="c1">4. Select </span><strong><span class="c1 c3">Process Features</span></strong><span class="c1">.</span></p>
<p class="c5"><span class="c1">5. If the process you wish to monitor is not already on the list of processes, it will need to be added manually:</span></p>
<p class="c5"><span class="c1">a. Click the Windows </span><span class="c1 c3">Start </span><span class="c1">button.</span></p>
<p class="c5"><span class="c1">b. Go to <strong>Task Manager  →  Processes tab</strong>. The Processes table window should appear.</span></p>
<p class="c5"><span class="c1">c. Find the required process and copy its exact format name (case sensitive).</span></p>
<p class="c5"><span class="c1">d. To add the new process to the currently managed processes’ list, click the  </span><span class="c1 c3">Add</span><span class="c1"> icon in the Process List frame, on the top right–hand side of the </span><span class="c1 c3">Process feature</span><span class="c1">s window. The </span><span class="c1 c3">Add Process</span><span class="c1"> window will appear. For processes that already exist in the process list, select them and click </span><span class="c1 c3">Edit</span><span class="c1">. An identical </span><span class="c1 c3">Edit process</span><span class="c1"> window will appear (see below).</span></p>
<p class="c5"><span class="c1">e. Add features to the selected application. You can add features one at a time by clicking the </span><span class="c1 c3">Add +</span><span class="c1"> on the bottom-right corner of the </span><span class="c1 c3">Process features</span><span class="c1"> window, or all of them by clicking the </span><span class="c1 c3">Add All Vendor’s features +</span><span class="c1">.</span></p>
<p class="c5"><span class="c1">6. Configure the process window to monitor idle licenses:</span></p>
<p class="c5"><img class="alignnone size-full wp-image-53975" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-01-24-at-23.28.57.png" alt="" width="2560" height="1326" /></p>

<ul class="c7 lst-kix_ud3toq17snf6-0 start">
 <li class="c0"><span class="c1">Type the “Process name” as obtained in item 5c (above), e.g: ArcMap.</span></li>
 <li class="c0"><span class="c1">Input a description of the managed process, and</span></li>
 <li class="c0"><span class="c1">The application’s Vendor name is exactly as appears in the license file. e.g.: ARCGIS</span></li>
 <li class="c0"><span class="c1">Check the </span><strong><span class="c1 c3">Enabled</span></strong><span class="c1"> box and the </span><strong><span class="c1 c3">Track process idle/active periods</span></strong><span class="c1"> box.</span></li>
 <li class="c0"><span class="c1">Set the </span><span class="c1 c3">System resource thresholds</span><span class="c1">. These numbers indicate the thresholds under which a process is considered idle.</span></li>
 <li class="c0"><span class="c1">Set the</span><span class="c1 c3"> Idle time report threshold</span><span class="c1">. This is the minimum period before an inactive session is reported as idle.</span></li>
</ul>
<p class="c5"><span class="c1">After completing the process described above in paragraphs 1 through 6, the Workstation is set to monitor the managed process. For software suites like ArcGIS that use the same license for multiple applications (e.g. ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated with the same idle time values for each application that you want to control.</span></p>
 
<h2 class="c2"><a name="h.iq9dzwmiffm7"></a><span class="c6">Monitoring Idle time and retrieving licenses manually on the CCL window</span></h2>
<p class="c5"><span class="c1">To open the EasyAdmin </span><span class="c1 c3">Currently Consumed Licenses</span><span class="c1"> (CCL) Window: EasyAdmin <strong>Start →  Operational  →  Currently Consumed Licenses</strong>.</span></p>
<p class="c5"><span class="c1">This window lists all currently active sessions. Using this window, Administrators can monitor individual workstations that run licensed applications. They can detect idle applications and shut them down with a mouse click. To do so, an OpenLM Workstation Agent module must be installed on each client workstation.</span></p>
 
<h2 class="c2"><a name="h.qni40823d9k9"></a><span class="c6">Workstation Idle Time</span></h2>
<p class="c5"><span class="c1">The end user’s workstation idle time is recorded and presented in the “Workstation Idle time” column.</span></p>
 
<h2 class="c2"><a name="h.9qi50w297yi3"></a><span class="c6">Recent Application Idle Period</span></h2>
<p class="c5"><span class="c1">Records the recent idle time of a specific application.</span></p>
 
<h2 class="c2"><a name="h.2ocrl94htwj1"></a><span class="c6">Linger Time</span></h2>
<p class="c5"><span class="c8">A lingering license stays checked out for a specified period beyond its check-in or FlexEnabled application exit, whichever comes first.</span></p>
 
<h2 class="c2"><a name="h.olaijtie7z62"></a><span class="c6">Linger Due</span></h2>
<p class="c5"><span class="c1">The Linger Due is the actual time the license is returned to the pool to be claimed by another user.</span></p>
 
<h2 class="c2"><a name="h.q4uqdj7lyxsi"></a><span class="c6">View Idle times</span></h2>
<p class="c5"><span class="c1">Click the dark-shaded crescent moon icon </span><span class="c1">for a graphic view of idle and active time as well as a list of idle periods.</span></p>
 
<h2 class="c2"><a name="h.o5kajhtwhsjx"></a><span class="c6">License removal</span></h2>
<p class="c5"><span class="c1">Administrators have the option to manually remove a license from a specified workstation. This is done by highlighting the user row on the Active Products window and clicking the </span><span class="c1 c3">Remove License</span><span class="c1"> icon</span><span class="c1">. Several constraints are specific to this feature:</span></p>

<ul class="c7 lst-kix_ixo43t4lip4w-0 start">
 <li class="c0"><span class="c1">The end user must have been inactive for a minimum period for this license to be retrieved. This value is set by default to 5 minutes in compliance with the FLEXlm license manager’s limitations.</span></li>
 <li class="c0"><span class="c1">If the license is not associated with any real product activity on the specified workstation (as happens when a license gets artificially “frozen” on a computer), then the license will be released and returned to the pool of available licenses.</span></li>
 <li class="c0"><span class="c1">If the worker is using the product, then re-obtaining a license would be automatically attempted. If this happens the license for that product and workstation will reappear on the active products screen, with a new handle number.</span></li>
 <li class="c0"><span class="c1">Manual License removal does not work for ArcGIS 10.</span></li>
</ul>
 
<h3 class="c9"><a name="h.gjxyas4kk31x"></a><span class="c4">Closing Applications</span></h3>
<p class="c5"><span class="c1">To manually close an application on the workstation,  an administrator should highlight the relevant row, and click the Close Application icon.</span></p>
<p class="c5"><span class="c1">This operation will retrieve the license back to the license pool, save the open project,  and the application itself will be shut down.</span></p>
<p class="c5"><span class="c1">Some constraints are specific to this feature:</span></p>

<ul class="c7 lst-kix_czc3sdopalv1-0 start">
 <li class="c0"><span class="c1">It requires a proper installation of the Workstation Agent module.</span></li>
 <li class="c0"><span class="c1">It works only on extension-enabled applications. At the time of writing this revision, these include MATLAB, AUTOCAD, ARCGIS, ARCGIS PRO, SOLIDWORKS, AND CATIA.</span></li>
</ul>
 
<h3 class="c9"><a name="h.syumb0u9hdbv"></a><span class="c4">COMMON CONSTRAINTS</span></h3>
<p class="c5"><span class="c1">Several constraints are common to both the License Removal and Application Closure features. These are as follows:</span></p>

<ul class="c7 lst-kix_6kntjenm49oy-0 start">
 <li class="c0"><span class="c1">These features are only applicable to the FLEXlm license manager.</span></li>
 <li class="c0"><span class="c1">A Workstation Agent module must be properly installed on each Client workstation.</span></li>
 <li class="c0"><span class="c1">Borrowed licenses (AKA “Linger licenses”) can not be retrieved via the EasyAdmin application.</span></li>
</ul>
