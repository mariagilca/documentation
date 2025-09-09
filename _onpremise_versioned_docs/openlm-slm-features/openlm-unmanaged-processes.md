---
title: "OpenLM Unmanaged Processes"
date: "2023-11-05T21:50:03"
permalink: "https://www.openlm.com/docs/openlm-slm-features/openlm-unmanaged-processes/"
posttype: "manual_documentation"
id: "6702"
---

<h2>How to monitor "unmanaged" licenses (step-by-step):</h2>
 
<p dir="ltr">Every Software feature is run as a process on your PC. To locate it:</p>

<ol>
 <li><span style="line-height: 1.5em;">Make sure the application you want to monitor is up and running.</span></li>
 <li><a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/finding-the-process-id">Identify the process</a> that is used by the application feature you want to monitor and note down the process name.</li>
 <li>In the EasyAdmin user interface click <strong style="font-size: 16px;">‘Start’ → ‘Administration’ → “Unmanaged Processes”.
<img class="alignnone wp-image-54357" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-09-at-10.54.10.png" alt="" width="1221" height="616" /></strong> </li>
 <li>In the “Unmanaged Processes” window, click the “Add Vendor” icon to add the Vendor to the list of monitored vendors.
<img class="alignnone size-full wp-image-54358" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-09-at-10.56.15.png" alt="" width="1223" height="603" /></li>
 <li>The Add Vendor pop-up opens:
<img class="alignnone size-full wp-image-54359" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-09-at-11.00.01.png" alt="" width="1224" height="605" /></li>
 <li>Insert the values as follows:
6a. <strong style="font-size: 16px;">Type in the software vendor name:</strong><span style="font-size: 16px;">  The vendor's name
</span>6b.<strong style="font-size: 16px;"> Feature Name:</strong><span style="font-size: 16px;"> this is a free text field.
</span>6c<strong style="font-size: 16px;">. Process Name:</strong><span style="font-size: 16px;"> Type in the Process name exactly as it is shown in the previously opened Process List tool.
</span>6d. <strong style="font-size: 16px;">Description:</strong><span style="font-size: 16px;"> This is a free text field.</span></li>
</ol>
<p dir="ltr">Additional features may be added to the monitored vendor using the “Add” button.</p>
<p dir="ltr">After the Process is configured to be monitored, it will appear on all relevant EasyAdmin user interface windows as well as on the “License Usage Information” window<strong>.</strong></p>
