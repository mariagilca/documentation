---
title: "URL Monitoring With OpenLM"
date: "2023-11-05T19:47:41"
permalink: "https://www.openlm.com/docs/end-user-services-workstation-agent-installation-guide/url-monitoring-with-openlmhow-to-enforce-the-personal-dashboard-user-authentication/"
posttype: "manual_documentation"
id: "6650"
---

<h2>Prerequisites:</h2>
<ul>
 <li>OpenLM SLM or SLMC;</li>
 <li>OpenLM Workstation Agent v21 or higher, installed on the end-users’ workstations (Windows/Linux); or Browser Agent (it monitors URLs only);</li>
 <li>Supported browsers: Chromium-based Google Chrome, Edge, Vivaldi, Opera, Brave; Firefox;</li>
</ul>
<h2>What is Cloud Services Monitoring</h2>
More and more applications are moving to the web, thus the need to have the possibility to monitor Cloud Services is arising.

OpenLM has developed a new capability to monitor Cloud Services/web-based applications. The reports our users can get will list the amount of time each user has utilized the service. Based on this data the user can get the following benefits:
<table>
<thead>
<tr>
<th><strong>Case</strong></th>
<th><strong>Action</strong></th>
<th><strong>Benefit</strong></th>
</tr>
<tr>
<th>The user is not using the service but has an allocated license</th>
<th>Remove allocation from the license</th>
<th>Save unused licenses</th>
</tr>
<tr>
<th>The user has an allocated license but only uses it for minutes during the whole month</th>
<th>Understand what is the actual usage and conceiver alternatives</th>
<th>Save licenses that are not fully utilized</th>
</tr>
</thead>
</table>
 
<h2>How to configure URL monitoring:</h2>
<ol>
 <li>Go to EasyAdmin User Interface→ Start→ Administration→ License Manager -Servers. The list with all LM will be displayed.</li>
 <li>Click <strong style="font-size: 16px;">Add License Manager.</strong></li>
 <li>Type in a descriptive title.</li>
 <li>Select the type: <strong style="font-size: 16px;">Browser.</strong></li>
 <li>Type in the URL address you want to monitor in the <em style="font-size: 16px;">Domain</em><span style="font-size: 16px;"> field.</span></li>
 <li>Select the time zone.</li>
 <li>Click <strong style="font-size: 16px;">Save.</strong></li>
</ol>
<img class="wp-image-53993" src="https://www.openlm.com/wp-content/uploads/2023/01/word-image-53992-1.png" />

By default, The Workstation Agent will report every hour to OpenLM SLM unique cross-browser sessions matching the given URLs.
<h2><a id="post-53992-_qlrju95wa06j"></a>Results</h2>
You can check the results, as reported by Agents, in the License Activity Report:

<img class="wp-image-53994" src="https://www.openlm.com/wp-content/uploads/2023/01/word-image-53992-2.png" />

Monitored addresses are visible to end-users in the Personal Dashboard:

<img class="wp-image-53995" src="https://www.openlm.com/wp-content/uploads/2023/01/word-image-53992-3.png" />
