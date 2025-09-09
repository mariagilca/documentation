---
title: What is FlexLM License file format
sidebar_position: 16
description: Overview of the FlexLM license file format and its structure.
---

<h2>General</h2>
<p dir="ltr">FlexLM license files are in effect an agreement between the license vendor and the end user; They elaborate on the number of available licenses, the check-out policy for each license, the validity and expiration date of each license etc. The FlexLM License Manager Daemon (lmgrd) interprets the license file to dispatch license requests to different license vendor daemons.</p>
<p dir="ltr">This document is a short account of the format and syntax of the license file, and its effect on licensed applications’ utilization.</p>

<h2>SERVER line</h2>
<p dir="ltr">License files usually begin with a single SERVER line, or three SERVER lines for Server triad configurations. The SERVER line specifies the license server’s</p>

<ul>
 <li>
<p dir="ltr">Hostname</p>
</li>
 <li>
<p dir="ltr">Hostid (MAC address) of the and</p>
</li>
 <li>
<p dir="ltr">TCP/IP port number of the license manager daemon (lmgrd). If no port is specified then the first available port in the range 27000 to 27009 will be used.</p>
</li>
</ul>
 
<h3>SYNTAX</h3>
<p dir="ltr">Server line syntax is as follows:</p>

<pre>SERVER <server name> <host id> <lmgrd port></pre>
<h3>EXAMPLE</h3>
<pre>SERVER my_server 001122334455 27000</pre>
 
<h2>VENDOR line</h2>
<p dir="ltr">The VENDOR line specifies the</p>

<ul>
 <li>
<p dir="ltr">Vendor daemon name and path. lmgrd uses this line to start the vendor daemon.</p>
</li>
 <li>
<p dir="ltr">Options file path</p>
</li>
 <li>
<p dir="ltr">Vendor daemon TCP/IP port number (default 2080).</p>
</li>
</ul>
 
<h3>SYNTAX</h3>
<pre>VENDOR vendor [vendor_daemon_path][[options=]options_file_path] [[port=]port]</pre>
<h3>EXAMPLE</h3>
<pre>VENDOR adskflex adskflex.opt port=2080</pre>
<h2>FEATURE line / INCREMENT line</h2>
<p dir="ltr">FEATURE / INCREMENT lines describe specific licenses. A single FEATURE (or INCREMENT) line may be followed by several INCREMENT lines, creating separate license pools.</p>

<h3>SYNTAX</h3>
<pre>{FEATURE|INCREMENT} feature vendor feat_version exp_date num_lic SIGN=sign [optional_attributes]</pre>
<h3>EXAMPLE</h3>
<pre>FEATURE MayaUnltdf sgiawd 7.000 17-aug-2005 2 001122334455</pre>
<h2>PACKAGE Lines</h2>
<p dir="ltr">PACKAGE lines provide an outline to licensing product SUITEs, and facilitate distribution of features which largely share the same FEATURE line arguments. PACKAGE lines are ineffective on their own account; they require FEATURE / INCREMENT lines to effectively activate these licenses.</p>

<h3>SYNTAX</h3>
<pre>PACKAGE package vendor COMPONENTS=pkg_list SIGN=pkg_sign</pre>
<h3>EXAMPLE</h3>
<pre>PACKAGE suite_example vendor_name version SIGN=12345 COMPONENTS="feature_1:version_1:3 feature_2:version_2:4"

FEATURE suite_example vendor_name version issue_date 2 SIGN=54321 SN=123</pre>
In this case, checking out either feature_1 or feature_2 will also check out the suite_example suite. The total number of available licenses is 3x2=6 for feature_1, and 4x2=8 for feature_2.

For more information on the FlexLM license file format, please refer to this document.
