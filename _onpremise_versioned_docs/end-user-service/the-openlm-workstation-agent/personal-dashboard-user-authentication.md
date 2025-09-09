---
title: " Personal Dashboard User authentication"
date: "2023-11-05T19:55:28"
permalink: "https://www.openlm.com/docs/end-user-services-workstation-agent-installation-guide/the-openlm-workstation-agents-interface-the-personal-dashboard/personal-dashboard-user-authentication/"
posttype: "manual_documentation"
id: "6653"
---

<div class="elementor-element elementor-element-e945905 elementor-widget elementor-widget-betterdocs-title" data-id="e945905" data-element_type="widget" data-widget_type="betterdocs-title.default">
<div class="elementor-widget-container"></div>
</div>
<div class="elementor-element elementor-element-433001b elementor-widget elementor-widget-betterdocs-toc" data-id="433001b" data-element_type="widget" data-widget_type="betterdocs-toc.default">
<div class="elementor-widget-container">
<div class="betterdocs-elementor"></div>
</div>
</div>
<div class="elementor-element elementor-element-585577c elementor-widget elementor-widget-betterdocs-content" data-id="585577c" data-element_type="widget" data-widget_type="betterdocs-content.default">
<div class="elementor-widget-container">
<div class="betterdocs-entry-content ">
<div id="betterdocs-single-content" class="betterdocs-content">
<h2 id="0-toc-title" class="betterdocs-content-heading">Enabling User Authentication</h2>
<ol>
 <li>Access your Personal Dashboard.</li>
 <li>Click the <strong>Settings</strong> tab→<strong>SSL </strong>tab and provide the password and the path to the SSL Certificate, then restart the End User Services Service.
<img class="wp-image-50582" src="https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1.png" sizes="(max-width: 1917px) 100vw, 1917px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1.png 1917w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1-300x150.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1-1024x513.png 1024w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1-768x385.png 768w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1-1536x769.png 1536w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1-24x12.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1-36x18.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-application-teams-desc-1-48x24.png 48w" alt="Graphical user interface, application, Teams Description automatically generated" width="1917" height="960" /></li>
</ol>
 

<strong>Note:</strong> if previously your Personal Dashboard was not secured with the SSL configuration, please make sure you issue a new authorization file at <strong>EasyAdmin User interface</strong>→ <strong>Start</strong> → <strong>Administartion</strong> → <strong>System&Security</strong> →<strong>Security</strong> →<strong>Authorization</strong>→<strong> ADD. Then </strong>go to C:\Program Files\OpenLM\End-User Services and replace the existing authorization file with the newly created one, and restart the End User Services Service.
<ol>
 <li>Now reopen your Personal Dashboard with the updated address: <strong>https://fqdn:53555.</strong></li>
 <li>Switch to the <strong>SECURITY</strong> tab and check the <strong>Enable user authentication</strong> box.</li>
 <li><img class="wp-image-50583" src="https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1.png" sizes="(max-width: 1920px) 100vw, 1920px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1.png 1920w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1-300x150.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1-1024x511.png 1024w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1-768x384.png 768w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1-1536x767.png 1536w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1-24x12.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1-36x18.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/graphical-user-interface-text-application-descr-1-48x24.png 48w" alt="Graphical user interface, text, application Description automatically generated with medium confidence" width="1920" height="959" /></li>
 <li>Restart the End User Services Service and, if necessary, refresh the page. We observe that now it is possible to log out from our Personal Dashboard Account:
<img class="wp-image-50584" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1.png" sizes="(max-width: 1920px) 100vw, 1920px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1.png 1920w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1-300x169.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1-1024x576.png 1024w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1-768x432.png 768w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1-1536x864.png 1536w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1-24x14.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1-36x20.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-3-1-48x27.png 48w" width="1920" height="1080" /></li>
</ol>
 
<h2 id="post-50565-_5n30ozu8nkwd" class="betterdocs-content-heading"><a id="post-50565-_5n30ozu8nkwd"></a>How to filter the License Managers’ information available in PD</h2>
Administrators might want OpenLM Personal Dashboard Users to only see specific servers/licenses and not all of them, as the default setting. For this ACL must be enforced for the Personal Dashboard.
<ol>
 <li>Access the <strong>EasyAdmin User Interface</strong>→<strong>Administrtation</strong>→<strong>Roles</strong>. The Roles Window opens.
<img class="wp-image-50585" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-4-1.png" sizes="(max-width: 553px) 100vw, 553px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-4-1.png 553w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-4-1-300x196.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-4-1-24x16.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-4-1-36x24.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-4-1-48x31.png 48w" width="553" height="361" /></li>
 <li>Click <strong>Add. </strong>Provide a Role name and description. Click <strong>Save.</strong></li>
 <li>After Clicking Save, the <strong>Resources</strong> tab is enabled. Click on it then → <strong>Add.</strong></li>
 <li>Select the desired roles:<img class="wp-image-50586" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1.png" sizes="(max-width: 1406px) 100vw, 1406px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1.png 1406w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1-300x147.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1-1024x502.png 1024w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1-768x376.png 768w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1-24x12.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1-36x18.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-5-1-48x24.png 48w" width="1406" height="689" /></li>
 <li>Switch to the <strong>Role Details</strong> tab and click on <strong>Users→ADD:

</strong><img class="wp-image-50587" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-6-1.png" sizes="(max-width: 940px) 100vw, 940px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-6-1.png 940w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-6-1-300x127.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-6-1-768x326.png 768w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-6-1-24x10.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-6-1-36x15.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-6-1-48x20.png 48w" width="940" height="399" /></li>
 <li>Select the users to assign this role:
<img class="wp-image-50588" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-7-1.png" sizes="(max-width: 940px) 100vw, 940px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-7-1.png 940w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-7-1-300x129.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-7-1-768x329.png 768w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-7-1-24x10.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-7-1-36x15.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-7-1-48x21.png 48w" width="940" height="403" /></li>
 <li>Go back to <strong>Administrtation</strong>→<strong>Roles </strong>and double click on <strong>agent_query_role</strong>→<strong>Groups </strong>and delete OpenLM_Everyone group:
<img class="wp-image-50589" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1.png" sizes="(max-width: 1526px) 100vw, 1526px" srcset="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1.png 1526w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1-300x139.png 300w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1-1024x475.png 1024w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1-768x356.png 768w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1-24x11.png 24w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1-36x17.png 36w, https://www.openlm.com/wp-content/uploads/2022/12/word-image-50565-8-1-48x22.png 48w" width="1526" height="708" /></li>
 <li>Restart the OpenLM SLM and End-User Service services</li>
 <li>Now the Personal Dashboard User will only see the servers that have been assigned to them.</li>
</ol>
</div>
</div>
</div>
</div>
