---
title: "The OpenLM Workstation Agent's interface - the Personal Dashboard"
date: "2023-11-05T19:44:14"
permalink: "https://www.openlm.com/docs/end-user-services-workstation-agent-installation-guide/the-openlm-workstation-agents-interface-the-personal-dashboard/"
posttype: "manual_documentation"
id: "6647"
---

OpenLM is a software license monitoring tool for various concurrent license managers. It provides productivity tools for license usage optimization and application usage management.

OpenLM provides two main user interfaces:
<ul>
 <li>The EasyAdmin web application is meant for managers and system administrators.</li>
 <li>The Personal Dashboard is meant for end-users. This document discusses the latter.</li>
</ul>
The Workstation Agent is a lightweight optional software component that is installed on end users’ workstations. It provides a set of capabilities that empower end-users, making them less dependent on system administrators. The Workstation Agent does not present a risk of negative impact on the organization’s network; It limits end users’ capabilities to a subset of safe actions according to their specific area of work. To access the full functionality of Workstation Agent we advise you to install OpenLM End-User Services beforehand on a separate machine from Workstation Agent  (can be on the same machine as OpenLM SLM). That way, you can use a web interface to interact with Workstation Agent, that interface being the Personal Dashboard that comes installed with End-User Services.
<h2><a id="post-33725-_vgufats1v4ah"></a>Capabilities Provided by the Workstation Agent</h2>
The Workstation Agent  provides a wide variety of productivity tools, affecting the working environment in many aspects:
<h2><a id="post-33725-_9c698lxfpe0e"></a>Who’s Got My License?</h2>
End users can find out who’s got the license they need and contact that person.
<h2><a id="post-33725-_oy5aundk36d"></a>Idle or Active?</h2>
Idle sessions are monitored and presented graphically in OpenLM EasyAdmin. See here for more information: <a href="https://www.openlm.com/knowledge-base/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/">Monitoring Idle Application time.</a>
<h3><a id="post-33725-_ih5g62ofr4o6"></a>Manual Application Shutdown</h3>
Administrators can manually shut down specific applications or check licenses back into the license pool, <a href="https://www.openlm.com/knowledge-base/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/">Retrieving licenses manually via the CCL window</a>
<h2><a id="post-33725-_szojijxsuw8z"></a>Automatic Idle License Retrieval</h2>
Workstation Agent facilitates different methods to automatically shut down software applications, and retrieve concurrent licenses. Please refer to these application notes for more information:
<ul>
 <li><a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-enhanced-agent-procedures-kb4005d/">License retrieval of idle applications – Enhanced Agent procedures</a></li>
 <li><a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/">License retrieval of idle applications (MATLAB, Autodesk, ArcGIS, Solidworks, Catia) – Save and Close</a></li>
 <li><a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c/">License retrieval of idle FlexLM applications – Suspend and Resume</a></li>
</ul>
.
<h2><a id="post-33725-_qkerl2oludg"></a>Unmanaged License</h2>
OpenLM monitors a wide variety of licensed applications and provides license usage statistics by directly querying specific types of license servers. OpenLM is constantly striving to enhance its capabilities by supporting as many license server types as possible. Nevertheless, there will always be license server types for which OpenLM will not have a dedicated interface to apply license usage queries.

In such cases, the Workstation Agent is employed to accumulate usage statistics on the end-users’ workstations. OpenLM refers to this capability as “Unmanaged licenses” monitoring. Further details on this can be found here: <a href="https://www.openlm.com/knowledge-base/working-with-unmanaged-licenses-kb4035/">Working with Unmanaged Licenses</a>.
<h2><a id="post-33725-_9nx900o7oct"></a>License management</h2>
The OpenLM Applications Manager serves as a shell for vendors’ license managers. It provides intricate license management capabilities that are not provided by the vendors’ license managers.

It is designed with the users’ best interest in mind: returning software control to the user.

The OpenLM Applications Manager interfaces with end-user workstations through the Workstation Agent. The Agent can be configured to intercept application launches according to a predefined configuration.
<h2><a id="post-33725-_gjwi5f9h1vcb"></a>Projects</h2>
OpenLM can be configured to log license usage according to projects. The Workstation Agent may prompt the end-user for the currently active project name to select the project name through a menu item. This will attribute all license usage on that workstation to the selected project until the setting is changed.

For more information on license usage logging according to projects, see this document: <a href="https://www.openlm.com/knowledge-base/license-usage-monitoring-according-to-projects-kb4030/">License Usage Monitoring According to Projects</a>
<h3><a id="post-33725-_l1frm2veonim"></a>ArcGIS License level</h3>
OpenLM was originally written by ESRI ArcGIS veterans, and as such still includes some ArcGIS-oriented benefits. Setting the ArcGIS license level is one of them.
<h2>Notifications</h2>
Personal Dashboard users can receive browser notifications coming from OpenLM Workstation Agent.

These are native browser notifications, meaning they will be displayed as long as the browser is open. To receive them, the user should allow notifications to be displayed when they navigate to the Personal Dashboard user interface:

<img class="alignnone size-full wp-image-5513" src="https://cdn.openlm.com/wp-content/uploads/2022/02/notification.png" alt="" width="687" height="281" />

<em>Browser notification</em>

<span style="box-sizing: border-box; margin: 0px; padding: 0px;">If the user clicks <strong>Allow</strong> and the network is not closed (allows connections to external APIs), the user will start receiving notifications from Workstation Agent. Otherwise, the notification system will fall back to a SignalR-based web socket system (it will show notifications only inside of the app in Toast message format).</span>

<img class="alignnone size-full wp-image-5514" src="https://cdn.openlm.com/wp-content/uploads/2022/02/diagram.png" alt="" width="770" height="568" />

<em>The diagram of how the notification system works</em>

For Firefox, the “<strong>Allow notification</strong>” popup window has to be triggered from the user’s interaction, because of that we display a dialog to the user first. That dialog has a request permission button that triggers the notification popup when clicked.

<img class="alignnone size-full wp-image-5515" src="https://cdn.openlm.com/wp-content/uploads/2022/02/notification-example.png" alt="" width="630" height="294" />

<em> Example of a notification</em>

The following events will trigger a notification:
<ul>
 <li aria-level="1">When a process has been released;</li>
 <li aria-level="1">When the user has to select an active project (there is also a variation of that, which includes the currently selected project and the possibility to choose another one);</li>
 <li aria-level="1">When an app is forbidden to run;</li>
</ul>
The latest Agent also provides the possibility to force the opening of a new browser tab (or a new browser window if the default browser is not opened) when the user receives the notification related to selecting a project.
<h3>Other notifications</h3>
When a license becomes available after previously being fully allocated, the user can attempt to claim it. This process can be configured in EasyAdmin:
<img src="https://openlm.visualstudio.com/5cf556e4-c450-4544-9abc-f7f009c0b615/_apis/wit/attachments/413d5b9b-cb59-416c-ae87-5358f146ab49?fileName=image.png" alt="Image" />
<p class="p1">Available license notification/reservation period: If no licenses were available when the user attempted to acquire one, but a license becomes available within x minutes, the user will receive a notification.</p>
 
<p class="p1">When another user requests you to release a license, this can be triggered from the personal dashboard here:</p>

<img src="https://openlm.visualstudio.com/5cf556e4-c450-4544-9abc-f7f009c0b615/_apis/wit/attachments/a04c6313-d1b9-40ba-bf21-7d94bcbcea61?fileName=image.png" alt="Image" />
<p class="p1">The ‘Send In-App Request’ feature allows a user to request another user to release a license by clicking a button. This action can be performed once every three minutes</p>

<h2><a id="post-33725-_2okll43am6j"></a>Additional information</h2>
Additional information such as the Workstation IP is provided to the OpenLM SLM by the Agent.
<h2><a id="post-33725-_60pzx2u9h9zg"></a>Installation</h2>
The Workstation Agent is available in the<a href="https://www.openlm.com/download/"> Downloads</a> section of the OpenLM site. It can either be installed manually per workstation or silently distributed by a script.

During installation, the user may be prompted to choose whether to add OpenLM extensions for certain supported applications. At the time of writing this revision – these applications include ArcGIS, Autodesk, and MATLAB. The OpenLM extensions provide additional capabilities such as saving and closing idle sessions and managing ArcGIS.

As stated above, OpenLM can attribute license usage according to active projects. The end-user may create an active project name or be prompted to select the active project from a dropdown list.

<img class="wp-image-33726" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-212.png" />

The "Project" page in the Personal Dashboard and the "Add project" button inside of it are hidden by default. To show them, open the EasyAdmin web application click Start → Administration → Projects, and check the ”Log projects information” box. That will allow you to view the "Project" page in your Personal Dashboard and select one of the already existing projects. To add a new one, you have to go to the EasyAdmin web application click Start → Administration → Projects, and check the "Show "Create New Project" in the Agent menu" box. For more information on license usage logging according to projects see this document: <a href="https://www.openlm.com/knowledge-base/license-usage-monitoring-according-to-projects-kb4030/">License Usage Monitoring According to Projects</a>
<h2><a id="post-33725-_s211sgd8zttk"></a>Recently closed page</h2>
As explained above, the Workstation Agent facilitates different methods to actively shut down software applications and retrieve concurrent licenses. Please refer to these application notes for more information:
<ul>
 <li><a href="https://www.openlm.com/knowledge-base/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/">License retrieval (Manual method), and Monitoring Idle Application time</a></li>
 <li><a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-enhanced-agent-procedures-kb4005d/">License retrieval of idle applications – Enhanced Agent procedures</a></li>
 <li><a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/">License retrieval of idle applications (MATLAB, Autodesk, ArcGIS, Solidworks) – Save and Close </a></li>
 <li><a href="https://www.openlm.com/knowledge-base/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c/">License retrieval of idle FlexLM applications – Suspend and Resume</a></li>
</ul>
OpenLM will indicate such cases of administrative license closure in the “Recently closed documents” window.

<img class="wp-image-33727" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-213.png" />

Clicking the Process name will resume the application, and check out a new license for it (if available).
<h2><a id="post-33725-_1w0bip2157jp"></a>License Repository page</h2>
The ability to query license availability from the end-user workstation is a very important step towards improving license usability. The license usage window displays the total number of used, borrowed, and available licenses per license server. Click on a row to get the complete list of active users who are currently drawing on a specific license (e.g.: Autodesk). Click on one of the user entries to get the user’s details as they’re recorded in the OpenLM database.

<img class="wp-image-33728" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-214.png" />

The license usage status may be hidden from end-users by checking the ”Hide license status query option” box, in the <strong>EasyAdmin Start → Administration → Agent Policy</strong> window
<h2><a id="post-33725-_dhzag4oiaowv"></a>License repository filtering</h2>
There are several methods of filtering entries in the Agent’s license usage window so that end-users would only see the information regarding licenses of interest.

1. Use the ‘Search’ text box, in the “License usage information” window

2. By applying <a href="https://www.openlm.com/knowledge-base/roles-and-permission-groups-based-security-kb4006/">roles and permissions</a> to users and user groups. This will limit the presented information to specific license servers.

3. Filtering entries in single features' resolution can be accomplished by clicking the hide license button at the end of the desired row inside of the "License Repository" page: <img class="wp-image-33729" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-215.png" />

3.1 To undo this change, you can click on the "SHOW HIDDEN LICENSES" button on the "License Repository" page:

<img class="wp-image-33730" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-216.png" />

This will show you all the items that you've decided to hide. After that, you have to click the "Show this license in the list" button to toggle it back to a visible state:

<img class="wp-image-33731" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-217.png" />
<h2><a id="post-33725-_7ik6q3ww38r7"></a>Product Licensing level</h2>
Three licensing levels are available in ArcGIS (From high to low): Advanced, Standard, and Basic. ArcGIS end users can set this licensing level before activating the software. If such a license is available, the software will start at that chosen level. They can also choose one of the two available products for which they want to set the licensing level: ArcGIS Desktop and ArcGIS Pro. <img class="wp-image-33732" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-218.png" />

For further reference: https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm
<h2><a id="post-33725-_pkep0ut0iqgl"></a>Workstation Agent configuration window in OpenLM EasyAdmin</h2>
The ”Agent Policy” window in the EasyAdmin User Interface can be used to configure Workstation Agent. It is accessible by following this path: EasyAdmin Start → Administration → Agent Policy.
