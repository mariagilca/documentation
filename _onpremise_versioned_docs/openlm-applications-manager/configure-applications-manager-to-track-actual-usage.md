---
title: "Configure Applications Manager to Track Actual Usage"
date: "2023-11-04T23:13:41"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/configure-applications-manager-to-track-actual-usage/"
posttype: "manual_documentation"
id: "6619"
---

<h2><strong>Introduction</strong></h2>
The OpenLM system can be configured to track idle times of processes that are monitored by OpenLM Workstation Agents. This document outlines how to configure the measurement of actual usage for a feature that is monitored by the Applications Manager. <em>[NOTE: We will use ‘Notepad’ as the process for this example.]</em> Setup and configuration of the process require OpenLM SLM, OpenLM Applications Manager, OpenLM Broker, and OpenLM Workstation Agent. OpenLM Broker, installed on the same machine as the Applications Manager, reports usage to the OpenLM SLM.

Features (i.e., products and applications) will have to have been previously defined in OpenLM Applications Manager before configuring for actual usage. See the full documentation on OpenLM Applications Manager for configuring features: <a href="https://www.openlm.com/application-notes-v3-0/openlm-modules-v3-0/the-openlm-proactive-application-manager-an4058/">OpenLM Applications Manager Installation and Configuration</a>
<h2><a id="post-26671-_wm8mxz8xj22"></a><strong>Configuring the Process</strong></h2>
Configuration takes place in the OpenLM EasyAdmin User Interface using Process Features.
<ol>
 <li>Start EasyAdmin User Interface (In Windows<strong> [Start] > [OpenLM] > [OpenLM EasyAdmin User Interface]</strong>). This will open the EasyAdmin dashboard in a browser.</li>
 <li>Navigate to Process Features. To do this click<strong> [Start] > [Administration]</strong> to open the Administration screen, then click on the <strong>Process Features</strong> icon (see<strong> Figure 1</strong>). This will open the Administration — Process Features screen. <img class="wp-image-45414" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-1.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1918px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-1.png 1918w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-1-1280x599.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-1-980x459.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-1-480x225.png 480w" width="1918" height="898" />
<strong>Figure 1: Locating the Process Features icon.</strong></li>
 <li>Add a process. To do this click the<strong> [Add]</strong> button in the upper right of the screen (see <strong>Figure 2</strong>). This will open the Add Process screen. <img class="wp-image-45415" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-2.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1919px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-2.png 1919w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-2-1280x585.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-2-980x448.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-2-480x219.png 480w" width="1919" height="877" />
<strong>Figure 2: Locating the [Add] button on the Process Features screen.</strong></li>
 <li>Enter the <strong>Process Name</strong>, <strong>Description</strong> and <strong>Vendor Name</strong> fields. Be sure “Enabled” and “Track process idle/active periods” boxes are both checked.
<em style="font-size: 16px;">[NOTE: The name of the process should match exactly with the feature to be tracked. Locate process names using Process List</em><strong style="font-size: 16px;"><em> ([Start] > [OpenLM] > [Process List])</em></strong><em style="font-size: 16px;">. The process must be active/running to appear in the list. The Vendor Name must match the vendor name used when configuring products in the Product List screen (click </em><strong style="font-size: 16px;"><em>[Configure]</em></strong><em style="font-size: 16px;"> on the OpenLM Applications Manager tab of the Agent Configuration screen).]
<em><img class="wp-image-45416" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-3.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 812px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-3.png 812w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-3-480x424.png 480w" width="812" height="718" />
<strong style="font-size: 16px;">Figure 3: Highlighted entries for Step #4.</strong></em></em></li>
 <li>Click<strong> [Save]</strong> to return to the Process Features window. A new row will be added to the upper half of the screen (see <strong>Figure 4</strong>).
<img class="wp-image-45417" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-4.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1920px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-4.png 1920w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-4-1280x603.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-4-980x461.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-4-480x226.png 480w" width="1920" height="904" />
<strong style="font-size: 16px;">Figure 4: The new row added to the Process Features screen.</strong></li>
 <li>Click on the new row to activate it. Several buttons will appear at the lower right of the screen.</li>
 <li>Click the<strong> [+Add Vendor’s Features]</strong> button (see <strong>Figure 5</strong>). A confirmation screen will appear (see <strong>Figure 6</strong>).
<img class="wp-image-45418" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-5.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1222px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-5.png 1222w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-5-980x487.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-5-480x238.png 480w" width="1222" height="607" />
<strong style="font-size: 16px;">Figure 5: The [+Add Vendor Features] button.</strong>
<strong><img class="wp-image-45419" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-6.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 600px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-6.png 600w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-6-480x185.png 480w" width="600" height="231" />
<strong style="font-size: 16px;">Figure 6: The Add All Features confirmation screen.</strong></strong></li>
 <li>Click<strong> [Yes] </strong>to accept the changes. The feature name(s) associated with the process will populate in the bottom half of the Process Features window. Tracking idle time for features is now set.</li>
</ol>
<h2><a id="post-26671-_s9r34qg5k8b2"></a><strong>Observing Actual Usage</strong></h2>
When consuming a feature, you’ll be able to monitor idle times using the Currently Consumed Licenses screen (see<strong> Figure 7)</strong>. Navigate to the screen from the Start menu (<strong>[Start] > [Operational] > [Currently Consumed Licenses]</strong>).
<img class="alignnone size-full wp-image-54948" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-02-24-at-15.55.57.png" alt="" width="1618" height="716" />

<strong>Figure 7: The Currently Consumed Licenses screen</strong>

Clicking the <strong>Idle Times</strong> icon ( <img class="wp-image-45421" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26671-8.png" width="11" height="12" /> ) to the right of the row will reveal the <strong>Session Active/Idle Ratio</strong> screen.
<h2><a id="post-26671-_x9ngk9a79379"></a><strong>Limitations</strong></h2>
This configuration for measuring actual usage will not work in the following cases:
<ul>
 <li>The same process is already defined in Unmanaged Processes. <em>[NOTE: This is an accepted limitation as Applications Manager is a replacement for Unmanaged Processes]</em>.</li>
 <li>The same process is already configured in Process Products using ‘Extension’ as the release method.</li>
</ul>
