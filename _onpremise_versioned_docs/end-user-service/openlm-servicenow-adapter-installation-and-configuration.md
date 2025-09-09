---
title: "OpenLM ServiceNOW Adapter Installation and Configuration"
date: "2023-11-05T20:33:16"
permalink: "https://www.openlm.com/docs/openlm-servicenow-adapter-installation-and-configuration/"
posttype: "manual_documentation"
id: "6658"
---

The following document describes the process for installing the OpenLM ServiceNow Adapter. The External Platform Service configuration is also covered in order to make the Adapter establish a successful connection between OpenLM SLM and ServiceNow.

 
<h2>Requirements</h2>
The following components are required for the OpenLM ServiceNow Adapter to work:

1. The OpenLM ServiceNow application in your ServiceNow instance

2. A working installation of OpenLM SLM v21 or higher or an OpenLM SLMC account (for SLMC account scroll to section #4)

4. An OpenLM SLM license that has support for External Platforms. To verify, go to <strong>EasyAdmin Start → Administration → OpenLM License</strong>. Look for the <em>External_Platforms</em> flag:

<img class="wp-image-35861" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-103.png" />

In case your license is missing support for External Platforms, please contact sales@openlm.com for assistance.

 
<h2> Installing the OpenLM ServiceNow Adapter</h2>
The steps for installing the ServiceNow Adapter are as follows:

1. Obtain the latest External Platforms Service & ServiceNow Adapter installer file (<strong>OpenLM_ServiceNow_Adapter_Installer_#.#.###.msi</strong>) from our <a href="https://www.openlm.com/downloads-servicenow/">Downloads</a> page

2. Double-click the installer file to run it.

3. Check the “<strong>I agree to the license terms and conditions</strong>” box.

4. Click <strong>Next</strong>.

5. If you want to install the External Platforms & ServiceNow Adapter to a different location, click <strong>Browse</strong> and navigate to the destination folder of your choosing.

6. Click <strong>Next </strong>to begin the installation. Please note that this step may take up to several minutes depending on your hardware specifications.

7. Once the installer has finished, click <strong>Finish</strong> to close the window. This will open the External Platforms UI configuration screen which is described in the section below.

<img class="wp-image-35862" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-104.png" />

 
<h2>Configuring the External Platforms Service with ServiceNow</h2>
<h3><a id="post-27224-_3s9oenjg48e7"></a> With Identity Service</h3>
First, the External Platforms Service must be connected to the Identity Service in order for the ServiceNow integration to work. To do so, login to the Identity Service, go to <strong>the Settings tab→Security Configuration→</strong> toggle on the <strong>ServiceNow</strong> button and provide its URL. Click <strong>Save</strong>. Restart the ServiceNow Service.

<img class="wp-image-35863" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-105.png" />
<h3>Without Identity Service</h3>
The next step is to open the External Platform configuration screen.
The External Platforms configuration screen can be opened in a number of ways:
<ul>
 <li>Automatically, at the successful conclusion of the ServiceNow Adapter installation after the user has clicked the “Finish” button.</li>
 <li>Through the shortcut found in <em>Start Menu → OpenLM → OpenLM External Platform Configuration</em></li>
 <li>By accessing the OpenLM SLM address dedicated to the External Platforms Service in your browser (by default: <a href="http://localhost:8080/">http://fqdn:5005/</a>)</li>
</ul>
<img class="wp-image-35864" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-106.png" />

The purpose of this screen is to configure and test the connection between the External Platform Service and your installation of OpenLM SLM. The fields are as follows:
<ul>
 <li><strong>URL</strong> – Enter the path to your OpenLM SLM with either http:// or https:// and the listening port (default 5015). E.g. <a href="http://devbuild:7014/"><strong>http://localhost:5015
</strong></a> Once you have filled in the required field, click on <strong>Test Connection</strong> to verify that a connection can be established. If successful, click <strong>Save</strong>. Please note that you will be able to advance the wizard only if a successful connection can be established. In case of success, you should see the following message:</li>
</ul>
<img class="wp-image-35865" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-107.png" />
<ul>
 <li>The correct port has been specified</li>
 <li>The SLM URL is spelled correctly</li>
 <li>The OpenLM SLM is up and running</li>
 <li>All database requirements from section 1 (“Requirements”) of this document have been met</li>
 <li>There are no firewall roles, security policies or other applications preventing communication on that port or between your machine and the OpenLM SLM</li>
</ul>
<img class="wp-image-35866" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-108.png" />

 
<h2>Using the External Platform Setup Wizard</h2>
To finalize the ServiceNow integration with OpenLM, you must launch the External Platforms Setup Wizard from the EasyAdmin interface.

To do so:
<ol>
 <li>Go to <strong>EasyAdmin Start → Administration</strong> → click on <strong>External Platforms </strong>→ <strong>ServiceNow.
<img class="wp-image-35867" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-109.png" />
</strong></li>
 <li>The ServiceNow Setup Wizard will open.
<img class="wp-image-35868" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-110.png" /></li>
 <li>Fill in the required fields as follows:
<a id="post-27224-_yrldotdnqsg2"></a><strong>Basic Authentication</strong><strong>ServiceNow URL</strong> – The path to your ServiceNow instance. For example, https://abc123.service-now.com<strong>Username</strong> – Your ServiceNow account username.<strong>Password</strong> – Your ServiceNow account password.<a id="post-27224-_cx9pw0j9jwsl"></a><strong>OAuth 2.0</strong>

<strong>ServiceNow URL</strong> – The path to your ServiceNow instance. For example, https://abc123.service-now.com

<strong>Username</strong> – Your ServiceNow account username.

<strong>Password</strong> – Your ServiceNow account password.

<strong>Client ID</strong>

<strong>Client Secret</strong></li>
 <li>Click <strong style="font-size: 16px;">Test Connection</strong><span style="font-size: 16px;">. Please note that you will be able to advance to the next screen only if the test is successful, as indicated by this notice in the UI:
<img class="wp-image-35869" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-111.png" />
</span></li>
 <li>Click <strong style="font-size: 16px;">Next</strong><span style="font-size: 16px;"> to advance to the Sync Configurations screen.
</span>This screen holds the options for configuring the synchronization of OpenLM with ServiceNow.<strong>Select range to sync your data</strong> – You can pick the time range for the sync. Three options are available:
<ol>
 <li><em>Period</em> – this will synchronize all the data within the selected time period</li>
 <li><em>Start date</em> – this will synchronize all the data beginning with the selected start date up until today</li>
 <li><em>All available data</em> – this will synchronize all data available from the OpenLM database</li>
</ol>
<strong>Schedule sync to run every day at </strong>– Specify the time you would like the synchronization of OpenLM with ServiceNow to start at.

<strong>Sync Now (Run initial sync at the end of this wizard) </strong>– turning this toggle on will start the initial synchronization as soon as you have completed all the steps and finished the Wizard configuration. Leaving it off means that the sync will begin at the scheduled sync time above.

<span style="font-size: 16px;"><img class="wp-image-35870" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-112.png" /></span></li>
 <li>Click <strong style="font-size: 16px;">Next</strong><span style="font-size: 16px;">.
<img class="wp-image-35871" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-113.png" />
</span></li>
 <li>On the ServiceNow Time Zone screen, select the time zone by which OpenLM will synchronize the aggregated data it sends to ServiceNow. Since synchronization once per day, you must specify the time zone by which OpenLM will adjust the time calculations.</li>
 <li>Click <strong style="font-size: 16px;">Next</strong><span style="font-size: 16px;"> to advance to the Notifications configuration part of the Wizard.
<img class="wp-image-35873" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-114.png" />
</span></li>
 <li><span style="font-size: 16px;"> Configure the options on this screen as follows:
</span><strong>Notifications (on/off)</strong> – this is a global switch that enables or disables all sync notifications.<strong>EasyAdmin Alerts (on/off)</strong> – this switch enables or disables notifications in the EasyAdmin user interface.<strong>Email (on/off)</strong> – this switch enables or disables email notifications.Notifications to both EasyAdmin and email can be sent whenever a sync has either:
<ul>
 <li>Succeeded</li>
 <li>Skipped</li>
 <li>Failed</li>
 <li>When the External Platform service is not reporting back to the OpenLM SLM</li>
</ul>
<strong>Recipients</strong> – if the email switch has been turned on, enter the email(s) from which you want to receive the notifications. For multiple emails, each email must be placed on its line. Note: The SMTP server must be configured for this setting.</li>
 <li>Click <strong style="font-size: 16px;">Finish</strong><span style="font-size: 16px;"> to commit the new ServiceNow configuration and close the Wizard.</span></li>
 <li>In the ServiceNow interface, simply add a scoped application user that requires the following roles:
<pre><strong>X_oplm_openlm_data.integration_user
</strong><strong>sam_eng_app_integrator</strong></pre>
</li>
 <li><span style="font-size: 16px;">In the ServiceNow interface, go to your “Plugins” section and search for “OpenLM”. After finding it click on </span><strong style="font-size: 16px;">Install</strong><span style="font-size: 16px;"> to install the OpenLM API on the ServiceNow side.</span></li>
</ol>
At this point configuration on the External Platforms side is complete. To finish the configuration, follow the steps in section 5 below.

 
<h2><a id="post-27224-_1f3k7ptp7stk"></a>Post-installation steps for the App Store application</h2>
<strong>Only for customers who have Domain Separation activated on their instances</strong>

In the ServiceNow navigation panel, navigate to <strong>Scripts – Background</strong> module and open this in a new tab. Copy the script from <strong>OpenLM Integration: Domain Field Fix Script</strong> and paste it in the <strong>Run Script</strong> field in Scripts – Background tab

<img class="wp-image-35874" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-115.png" />

Set the scope to <strong>global</strong> and click on <strong>Run script</strong> to execute.

For the customers which do not want to execute this script, they can go the <strong>Transform Map </strong>corresponding to each of the staging table and activate coalesce value and set choice action to reject on <strong>sys_domain </strong>field by following these steps:

1. Navigate to the <strong>Transform Maps</strong> module which is present under the <strong>Administration</strong> subsection of <strong>System Import Sets</strong>

2. Click on the <strong>Filter</strong> icon and add <strong>Application</strong> is <strong>OpenLM Data Integration</strong>. Click on the <strong>Run</strong> button

<img class="wp-image-35875" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-116.png" />

3. Open each of the record and update the <strong>sys_domain </strong>mapping under <strong>Field Maps</strong> section to true and choice action to reject and click on the <strong>Update </strong>button when done.

<img class="wp-image-35876" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-117.png" />

The following records must be updated:
<ul>
 <li>olm_imp_group_relations_table</li>
 <li>olm_imp_agg_usage</li>
 <li>olm_imp_users_table</li>
 <li>olm_imp_lm_hosts</li>
 <li>olm_imp_groups_table</li>
 <li>olm_imp_computers</li>
 <li>olm_imp_license_servers</li>
 <li>olm_imp_projects_table</li>
 <li>olm_imp_agg_concurrent_usage</li>
 <li>olm_imp_license_inventory</li>
 <li>olm_imp_group_users_table</li>
 <li>olm_imp_agg_denials</li>
 <li>olm_imp_alerts</li>
</ul>
 

<strong>Information note:</strong> When creating an integration user in a domain-separated environment, the integration user should be assigned to the appropriate domain and should not be part of a global domain as the data gets inserted into the domain the integration user is part of. Assigning a wrong/global domain to a user leads to the data being inserted in the wrong domain and can be visible to all users.
