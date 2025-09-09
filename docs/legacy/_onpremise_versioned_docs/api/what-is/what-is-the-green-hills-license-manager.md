---
title: What is the Green Hills license manager?
sidebar_position: 24
description: Overview of the Green Hills license manager and its licensing.
---

<h2>What is Green Hills License Manager?</h2>
<span style="font-weight: 400;">The Greenhills License Manager (or GHS LM) is a license manager that is mandatory for all GHS software running on a host machine (as opposed to their embedded products for IoT and other devices). There are 4 available license models:-</span>
<ul>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Floating License. The license keys are installed on a network license server</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Named-user. The license keys are installed on the network license server, but only the named user or the administrator can access the license.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Computer-locked. The license key is installed on a specific machine</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Dongle-locked. The rights to using the license are stored in a device, such as a dongle. Machines which are cleared to use the software must also have a license key installed.</span></li>
</ul>
<span style="font-weight: 400;">There is also a “Legacy” license available for very old software versions.</span>

<span style="font-weight: 400;">OpenLM provides the following functionality for monitoring Green Hill Licenses:-</span>
<ul>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Denials Reporting</span> <span style="color: #000080;"><em><span style="font-weight: 400;">No</span></em></span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Report resolution</span> <span style="color: #000080;"><em><span style="font-weight: 400;">By Minute</span></em></span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Borrowed License reporting</span> <span style="color: #000080;"><em><span style="font-weight: 400;">No</span></em></span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Expiration Date reporting</span> <span style="color: #000080;"><em><span style="font-weight: 400;">Yes</span></em></span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Multiple Server Redundancy Support</span> <span style="color: #000080;"><em><span style="font-weight: 400;">No</span></em></span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Token License Support</span> <span style="color: #000080;"><em><span style="font-weight: 400;">No</span></em></span></li>
</ul>
<span style="font-weight: 400;">Greenhills GHS is only one of over 70 license managers that OpenLM can manage. </span><a href="https://www.openlm.com/license-manager-capabilities/"><span style="font-weight: 400;">Check the list</span></a><span style="font-weight: 400;">.</span>

 

 
<h3 class="c5 c8"><a name="h.mc1dvqu5ph8q"></a>Parsing Green Hills logs</h3>
<p class="c5">OpenLM has <a href="https://www.openlm.com/application-notes-v3-0/monitoring-app-usage-v3-0/configuring-openlm-to-interface-the-greenhills-license-manager-an4001v/">added the Green Hills license </a>manager to its portfolio of monitored license servers starting from version 3.2.</p>
<p class="c5">Green Hills log files are also interpreted in the <span class="c7">OpenLM “All License Parser” online tool</span>.</p>
 
<h3>Who is Greenhills?</h3>
<span style="font-weight: 400;">Greenhills Software (GHS) was founded in 1982 in California, and specializes in real-time operating solutions (RTOS) and embedded security systems for protection of IoT devices. Their flagship product is the Integrity RTOS, which holds the highest certification by the NSA of EAL 6+ High Robustness, which certifies it for the protection of critical resources against cyberattack, in industries such as aerospace, where most manufacturers (including Airbus, Boeing, Lockheed Martin) use it for their avionics.</span>

<span style="font-weight: 400;">They have also developed a Device Lifecycle Management (DLM) system to help manage devices throughout their life. Their embedded software is supplied with an embedded license. Where GHS software is running on a host machine, customers a required to install the </span><span style="font-weight: 400;">GHS License Manager</span><span style="font-weight: 400;">.</span>
