---
title: Software License Management Cloud Registration and Configuration Guide (SLMC)
sidebar_position: 1
description: Guide to registering and configuring OpenLM Software License Management Cloud (SLMC).
---

<h2><strong>Introduction</strong></h2>
<a href="https://www.openlm.com/products/software-license-management-cloud-saas/">Software License Management Cloud</a> is a platform for managing and monitoring software licenses. In this delivery model, the software is hosted and licensed by a third party by subscription. Organizations choose the cloud to outsource hardware and software maintenance and reduce IT costs. OpenLM offers a cloud solution that enables organizations to implement license monitoring with minimal installation and maintenance efforts.

To implement the Software License Management Cloud solution, organizations need to do the following:
<ul>
 <li>Register to Use the Software License Management Cloud</li>
 <li>Configure OpenLM Broker for Software License Management Cloud</li>
 <li>Install and configure other components such as Applications Manager, Workstation Agent, and Directory Sync.</li>
</ul>
For additional information that gives broader perspectives on Software License Management Cloud, OpenLM Broker, and the OpenLM system, please see the following documents and resources:
<ul>
 <li><a href="https://www.openlm.com/knowledge-base/openlm-system-structure-overview-kb4400/">OpenLM System Structure Overview</a></li>
</ul>
If you have questions about Software License Management Cloud configuration, please get in touch with our support team (support@openlm.com).
<h2><a id="post-89305-_m10o6o35c1of"></a><strong>Register to Use the Software License Management Cloud Solution</strong></h2>
To start using the Software License Management Cloud solution, follow these steps to complete the registration process:
<ol>
 <li>Visit the OpenLM <a href="https://www.openlm.com/free-trial/"><strong>Free-Trial</strong></a> page on the company website.</li>
 <li>Locate the link to sign up for Software License Management Cloud (hosted on the European Union Server or USA Server; see <strong>Figure 1</strong>).

[caption id="attachment_89306" align="alignnone" width="2048"]<img class="wp-image-89306" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-1.png" alt="Figure 1: The registration boxes on the Free Trial page have a link to the registration page for Software License Management Cloud." width="2048" height="1276" /> Figure 1: The registration boxes on the Free Trial page have a link to the registration page for Software License Management Cloud.[/caption]</li>
 <li>Select a desired server location to open the Identity Service registration page (see <strong>Figure 2</strong>).</li>
 <li>Choose your preferred registration method:
<ul>
 <li>Direct Registration: Provide an email and a password with at least ten characters, including at least one non-alphanumeric character.</li>
 <li>Third-Party Accounts: Register with Google, Microsoft, or GitHub.</li>
</ul>
[caption id="attachment_89307" align="alignnone" width="2048"]<img class="wp-image-89307" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-2.png" alt="Figure 2: The Identity Service registration form." width="2048" height="1286" /> Figure 2: The Identity Service registration form.[/caption]</li>
 <li>For Direct Registration, click the<strong> Register </strong>button.

[caption id="attachment_89308" align="alignnone" width="2048"]<img class="wp-image-89308" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-3.png" alt="Figure 3: The registration confirmation screen and login button." width="2048" height="1283" /> Figure 3: The registration confirmation screen and login button.[/caption]</li>
 <li>Click <strong>LOGIN</strong>. The Welcome page opens up.</li>
 <li>Introduce yourself and click <strong>CONFIRM</strong>.

[caption id="attachment_89309" align="alignnone" width="2048"]<img class="wp-image-89309" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-4.png" alt="Figure 4: Personal data" width="2048" height="1279" /> Figure 4: Personal data[/caption]</li>
 <li>Click LET’S GO. The Active Products tab opens:

[caption id="attachment_89310" align="alignnone" width="2048"]<img class="wp-image-89310" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-5.png" alt="Figure 5: The Software License Management Cloud Portal Active Products tab" width="2048" height="1285" /> Figure 5: The Software License Management Cloud Portal Active Products tab[/caption]</li>
 <li>Activate the required products. The first product to activate is the Software License Management Cloud. Click on <strong>Software License Management Cloud</strong> → <strong><strong>ACTIVATE:
</strong></strong>

[caption id="attachment_89311" align="alignnone" width="2048"]<img class="wp-image-89311" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-6.png" alt="Figure 6: The Software License Management Cloud Activation window" width="2048" height="1104" /> Figure 6: The Software License Management Cloud Activation window[/caption]</li>
 <li>It will take a few moments until the Product moves to the Active Products pane:

[caption id="attachment_89312" align="alignnone" width="2048"]<img class="wp-image-89312" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-7.png" alt="Figure 7: The Software License Management Cloud Activation process ongoing" width="2048" height="1092" /> Figure 7: The Software License Management Cloud Activation process ongoing[/caption]</li>
 <li>Once the panel turns blue, click <strong>Open</strong>:

[caption id="attachment_89313" align="alignnone" width="2048"]<img class="wp-image-89313" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-8.png" alt="Figure 8: The Software License Management Cloud Activation process finished" width="2048" height="1283" /> Figure 8: The Software License Management Cloud Activation process finished[/caption]</li>
 <li>The Welcome to OpenLM Cloud screen opens:</li>
</ol>
[caption id="attachment_89314" align="alignnone" width="2048"]<img class="wp-image-89314" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-9.png" alt="Figure 9: OpenLM Cloud Welcome tour guide" width="2048" height="1088" /> Figure 9: OpenLM Cloud Welcome tour guide[/caption]
<h2><a id="post-89305-_d15044c0t3w4"></a><strong>Configure the license monitoring on Software License Management Cloud</strong></h2>
To start monitoring licensing data, configure a License Manager. There are two options:
<ul>
 <li><strong>Manual: </strong>no other installation is required. This configuration is dedicated to FlexLM License Manager.</li>
 <li><strong>Automatic</strong>: it requires the OpenLM Broker configuration on your license Server machine. The Software License Management Cloud creates a secure connection over a dedicated port between the OpenLM Broker and the cloud-resident OpenLM SLM.</li>
</ul>
<h2><a id="post-89305-_kp4t4igujngy"></a>Manual mode</h2>
Let’s add a FlexLM license manager:
<ol>
 <li>During the onboarding tour, continue using the manual method.</li>
 <li>You will be redirected to<strong> EasyAdmin User Interface</strong> → <strong>License Manager Servers.
</strong>

[caption id="attachment_89315" align="alignnone" width="2048"]<img class="wp-image-89315" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-10.png" alt="Figure 10: Add License Manager window" width="2048" height="1090" /> Figure 10: Add License Manager window[/caption]</li>
 <li>Enter a description in the <strong>Display</strong> field to help you recognize the license manager.</li>
 <li>From the <strong>Type</strong> drop-down menu, select <strong>FlexLM</strong>.</li>
 <li>Type in the license server’s <strong>Hostname</strong> and <strong>Port number</strong>.</li>
 <li>Set the <strong>Time Zone</strong> to where the license server physically resides (e.g. UTC +02:00 Jerusalem).</li>
 <li><strong>Triad Configuration: </strong>Enable the Triad Configuration toggle if needed:
<strong>On:</strong> The OpenLM server will monitor the activity of all FlexLM servers in the triad.
<strong>Off </strong>(Default): The OpenLM server will monitor the activity of a single FlexLM license server.</li>
 <li>Drag or select the FlexLM license manager license file. Click <strong>Submit.
Important: if you have more than one license file for the same license manager, upload all of them before submitting.
</strong></li>
 <li>Optionally, you can switch the tab to <strong>Custom fields</strong> and add information such as country, usage scope, and description:

[caption id="attachment_89316" align="alignnone" width="2048"]<img class="wp-image-89316" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-11.png" alt="Figure 11: Custom Fields" width="2048" height="1086" /> Figure 11: Custom Fields[/caption]</li>
 <li>Click <strong>SAVE.</strong></li>
 <li>Approve the newly added license manager.</li>
 <li>Then, the licensing data will be displayed in various OpenLM reports, such as License Activity:

[caption id="attachment_89317" align="alignnone" width="1538"]<img class="wp-image-89317" src="https://cdn.openlm.com/wp-content/uploads/2024/08/license-activity-window.png" alt="Figure 12: License activity window" width="1538" height="753" /> Figure 12: License activity window[/caption]</li>
</ol>
<h2><a id="post-89305-_62gryn702e24"></a>Automatic mode</h2>
<ol>
 <li>During the onboarding tour, continue using the automatic method.</li>
 <li><a href="https://www.openlm.com/downloads/">Download</a> and <a href="https://www.openlm.com/docs/openlm-broker-installation-on-windows/">install</a> the OpenLM Broker on your license server machine.

[caption id="attachment_89318" align="alignnone" width="2048"]<img class="wp-image-89318" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-13.png" alt="Figure 13: OpenLM Cloud Welcome tour guide - Automatic" width="2048" height="1086" /> Figure 13: OpenLM Cloud Welcome Tour Guide - Automatic[/caption]</li>
 <li>In the onboarding tour, click <strong>NEXT:
</strong>

[caption id="attachment_89319" align="alignnone" width="2048"]<img class="wp-image-89319" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-14.png" alt="Figure 14: OpenLM Cloud Welcome tour guide - Download Broker authorization file" width="2048" height="1088" /> Figure 14: OpenLM Cloud Welcome tour guide - Download Broker authorization file[/caption]</li>
 <li>Let’s generate the authorization file. <a href="https://cloud.openlm.com/portal/">Navigate to your Cloud Portal</a><strong>→Client Authorization files </strong>tab, and click <strong>ADD.</strong>

[caption id="attachment_89320" align="alignnone" width="2048"]<img class="wp-image-89320" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-15.png" alt="Figure 15: Cloud Authorization" width="2048" height="1090" /> Figure 15: Cloud Authorization[/caption]</li>
 <li>The Add Client form appears. From the <strong>Type</strong> drop-down list, select <strong>Broker. </strong>Enter a descriptive text in the <strong>Description</strong> field:

[caption id="attachment_89321" align="alignnone" width="2048"]<img class="wp-image-89321" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-16.png" alt="Figure 16: Add Client" width="2048" height="1088" /> Figure 16: Add Client[/caption]</li>
 <li>Click <strong>SAVE.</strong></li>
 <li>Note: The Secret key will be displayed only once; please save it before closing the window.</li>
 <li>The Secret Key and Secret ID are generated. Download the JSON file and have it ready on the License manager machine.</li>
</ol>
<strong>Pro-tip: </strong>Here's a tip for accessing the OpenLM Broker remotely!

While the OpenLM Broker is typically installed on a specific machine, you can access it from any device on your network. Here's how:
<ul>
 <li>Locate the Broker Machine: Identify the machine where you installed the OpenLM Broker.</li>
</ul>
Generate a Token:
<ul>
 <li>Open a web browser on the Broker machine.</li>
 <li>Navigate to http://localhost:yourPort/api/new-token (replace yourPort with the actual Broker port).</li>
 <li>A single-use token will be displayed. Copy this token.</li>
</ul>
Access the Broker Remotely:
<ul>
 <li>Open a web browser on any device within your network.</li>
 <li>Enter the Broker's fully qualified domain name (FQDN) and port in the address bar, like http://demo.openlm.net:5090/#/.</li>
 <li>Paste the copied token into the appropriate field.</li>
</ul>
<ol>
 <li>Access your OpenLM Broker instance. Navigate to the OpenLM Servers tab.</li>
 <li>Click <strong>Add Server. </strong>Select <strong>OpenLM Cloud</strong> and click <strong>ADD</strong>. Click Import <strong>Broker Authorization File. </strong>The fields are automatically populated. Click <strong>CHECK CONNECTIVITY.
</strong>

[caption id="attachment_89322" align="alignnone" width="2048"]<img class="wp-image-89322" src="https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-17.png" alt="Figure 17: Add OpenLM Server Connection" width="2048" height="1090" /> Figure 17: Add OpenLM Server Connection[/caption]</li>
 <li>If successful, <strong>click SAVE. </strong>The Broker is now successfully connected with the OpenLM SLMC.</li>
</ol>
<h2><a id="post-89305-_2u2ozsob7lzf"></a>Adding a License Server</h2>
Adding a license server involves adding the server and then configuring it.
OpenLM supports the monitoring of a wide range of License managers.
To set up a license manager, visit our knowledge base and access the Monitoring License Managers category. Then, choose the required license manager and follow the instructions.
