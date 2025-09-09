---
title: "OpenLM Actual  Usage"
date: "2023-11-05T21:27:09"
permalink: "https://www.openlm.com/docs/openlm-slm-features/openlm-actual-usage/"
posttype: "manual_documentation"
id: "6684"
---

<h2></h2>
<p dir="ltr">A significant challenge when monitoring the utilization of network licenses is to find out whether and how the specific software is being used, and for which license is being utilized. OpenLM delivers two figures to be able to measure this factor:</p>

<ul>
 <li>
<p dir="ltr">Duration of time a license is consumed by a specific user a session</p>
</li>
 <li>
<p dir="ltr">Duration of time a shared license application was actually in use and for how long a period.</p>
</li>
</ul>
<p dir="ltr">Before viewing, there are several steps needed to follow that will make it possible to assess Actual Usage:</p>
<p dir="ltr">1. Make sure the OpenLM Workstation Agent is installed on the end user’s workstation.</p>
<p dir="ltr">2. Open the EasyAdmin user interface.</p>
<p dir="ltr">3. Click <strong>Start → Administration→ Process Features</strong></p>
<p dir="ltr"><a href="https://www.openlm.com/wp-content/uploads/2017/02/KB3002.jpg"><img class="alignnone size-full wp-image-54352" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-08-at-18.14.53.png" alt="" width="2556" height="1354" /></a></p>
<p dir="ltr">4. The Process features window will open:</p>
<p dir="ltr"><a href="https://www.openlm.com/wp-content/uploads/2017/02/KB3002_2.jpg"><img class="alignnone size-full wp-image-54353" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-08-at-18.17.01.png" alt="" width="2558" height="1346" /></a></p>
<p dir="ltr">5. If the process that needs monitoring is not already on the list of processes, it needs to be added manually:</p>
<p dir="ltr">a. Go to <strong>Administration → Process Features → Add</strong>:</p>
<p dir="ltr"><img class="alignnone size-full wp-image-54355" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-08-at-18.24.23.png" alt="" width="2560" height="1354" /></p>
<p dir="ltr">6. Configure the process window to monitor idle licenses:</p>

<ul>
 <li>
<p dir="ltr">Provide a Process name, e.g: ArcMap.</p>
</li>
 <li>
<p dir="ltr">Provide a  Description of the managed process, and</p>
</li>
 <li>
<p dir="ltr">Provide the application’s Vendor name exactly as appears in the license file.</p>
</li>
 <li>
<p dir="ltr">Very important that the Enabled, Save process activity, and System resource threshold used boxes are marked.</p>
</li>
 <li>
<p dir="ltr">Set the Idle Time Report Threshold. This is the minimum period of time before an inactive session is reported as idle.</p>
</li>
 <li>
<p dir="ltr">Set the software resource thresholds. These numbers indicate the thresholds under which a process is considered idle.</p>
</li>
</ul>
<p dir="ltr">After completing the process described above in paragraphs 1 through 6, the Active Agent is set to monitor the managed process.</p>

<h2>Tracking Actual Usage</h2>
<p dir="ltr">1. Open the OpenLM EasyAdmin web application.</p>
<p dir="ltr">2. Click Start → Operational → Currently Consumed Licenses. The Currently Consumed Licenses page is open.</p>
<p dir="ltr">3.  Click the Crescent moon icon ( <img class="alignnone size-full wp-image-3149" src="https://www.openlm.com/wp-content/uploads/2014/06/q7.jpg" alt="q7" width="25" height="26" /> ) for a particular row to view the Actual usage of a particular vendor.</p>
<p dir="ltr">This window lists all currently active sessions. Using this window, administrators can monitor individual workstations that run licensed applications.<img class="alignnone size-full wp-image-54373" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-09-at-16.45.44.png" alt="" width="1920" height="970" /></p>
<p dir="ltr">4.  The peaks in the chart represent Active Usage which represents the Actual Usage. The low flat line represents the Idle time.</p>
<p dir="ltr"><img class="alignnone size-full wp-image-54769" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-22-at-10.24.15.png" alt="" width="732" height="399" /></p>
<p dir="ltr">It is also able to differentiate the exact Actual Usage from the Idle time.</p>
<p dir="ltr"><img class="alignnone size-full wp-image-54770" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-22-at-10.25.38.png" alt="" width="732" height="402" /></p>
