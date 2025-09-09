---
title: What is the difference between the FlexLM lmgrd and lmadmin license server managers
sidebar_position: 19
description: Overview of the differences between FlexLM lmgrd and lmadmin license server managers.
---

<h2>License server components</h2>
The vendor daemon and the license server manager jointly comprise the FlexLM (Flexnet) license server. The license server manager contacts a Flex-enabled application, and dispatches the handling of that application to the appropriate vendor daemon. It also serves as an interface between the Vendor daemon and the Application, for checking out licenses.

 
<h2>License server manager types</h2>
There are two versions of the license server manager:
• lmgrd - the original license server manager with a command-line interface.
• lmadmin - a newer web-based license server manager.

 
<h2>Conceptual differences</h2>
The following table summarizes the conceptual differences between the two license server manager types:
<div dir="ltr">
<table><colgroup> <col width="*" /> <col width="*" /> <col width="*" /></colgroup>
<tbody>
<tr>
<td>Item</td>
<td>lmgrd</td>
<td>lmadmin</td>
</tr>
<tr>
<td>Interface</td>
<td>Command-line interface</td>
<td>Web-based license server manager</td>
</tr>
<tr>
<td>Configuration Options</td>
<td>Configuration information is acquired  from the command-line options used when the program is started</td>
<td>No configuration options are required upon program start.</td>
</tr>
<tr>
<td>Persistence of change</td>
<td>Changes need to be done in the license file</td>
<td>Settings are maintained after relaunching the tool, and they override the license file.</td>
</tr>
<tr>
<td>License file import</td>
<td>A single license file set by the configuration options upon running lmgrd</td>
<td>Import (multiple) license files.</td>
</tr>
<tr>
<td>Number of running instances</td>
<td>One instance of lmgrd is run for each vendor daemon.</td>
<td>Supports multiple vendor daemons with one lmadmin process.</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
 

</div>
<h2>More changes between lmgrd & lmadmin</h2>
On top of these conceptual changes, there have been some changes in commands:
<ul>
 <li>Some commands are no longer supported or have been replaced in lmadmin (e.g. lmremove, lmdown)</li>
 <li>Some have changed in behavior (e.g. lmreread)</li>
 <li>Other commands have been added into the lmadmin to integrate the functionality previously provided by the LMTOOLS (Stop server)</li>
</ul>
