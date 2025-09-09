---
title: "Directory Sync v2x Configuration"
date: "2023-11-04T23:25:15"
permalink: "https://www.openlm.com/docs/directory-sync-installation-guide/directory-sync-v2x-configuration/"
posttype: "manual_documentation"
id: "6626"
---

This is a comprehensive guide on how to synchronize the OpenLM Database with an organization’s directory service using <strong>Directory Sync.</strong> To see how to set up Directory Sync on Cloud, follow<a href="https://www.openlm.com/docs/setting-up-cloud-directory-sync/"> this guide</a>.

To see the <strong>Mappings between Ldap attributes and OpenLM User attributes</strong>, click on this <a href="https://www.openlm.com/wp-content/uploads/2022/06/Mappings-between-Ldap-attributes-and-OpenLM-User-attributes.pdf">link.</a>
<h2><a id="post-34440-_o3ehwyv039jl"></a><strong>Overview</strong></h2>
OpenLM provides functionality for synchronizing the OpenLM database with user information from a domain directory (e.g. ActiveDirectory). This is accomplished using the <strong>Directory Sync product, </strong>which consists of two components:
<ul>
 <li><strong>Directory Synchronization Agent </strong>(DSA), further in the document DSA.</li>
 <li><strong>Directory Synchronization Service </strong>(DSS), further in the document DSS.</li>
</ul>
Both components are required to be installed for LDAP synchronization.

Architecture overview:
<ol>
 <li>DSS connects to OpenLM SLM directly. It can be installed on the same machine as OpenLM SLM or a separate one. The function of the DSS is to store the sync definitions and manage the  Agents.</li>
 <li>One or more DSAs connect to the DSS. DSA can be installed on the same machine as DSS or a separate one. Its function is to take the sync definitions from DSS, query the domain directory, and report the data back to DSS.</li>
 <li>Once DSS has received this data from DSA, it is ready to send it back to OpenLM SLM.</li>
</ol>
<img class="wp-image-38466" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-1.png" />

<strong>Note:</strong> A single DSA can be used to query multiple directories (i.e. both AD and eDirectory). This diagram illustrates only one of many possible configurations where two separate DSAs can be used.
<h2><a id="post-34440-_1bwtoivrqv9g"></a><strong>Requirements</strong></h2>
<ol>
 <li>OpenLM SLM 21 or higher.</li>
 <li>A license file that has support for the Directory Sync extension (contact sales@openlm.com if unsure).</li>
 <li>If installing DSS and DSA on a machine separate from OpenLM SLM, make sure that the machine is on the same network as the AD domain controller.</li>
 <li>A designated schema in any supported database – <strong>MariaDB, MS SQL, My SQL</strong> (Firebird has been deprecated).</li>
</ol>
<h3><a id="post-34440-_xefkh367aflf"></a>Port configuration:</h3>
Port 8081 must be free when installing DSA. If it is occupied and you get an error during the installation stage, edit the <strong>kestrel.config</strong> file in the DSA installation folder (C: Program FilesOpenLMOpenLM Directory Synchronization Agent), change the port number and restart the DSA service.

Additionally, if installing DSS and DSA on separate machines from OpenLM SLM, you will have to make sure that proper firewall rules are set for the application ports:
<ol>
 <li>OpenLM SLM machine: inbound for 5015, outbound for 7026</li>
 <li>DSS machine: both inbound and outbound for 7026</li>
 <li>DSA machine: outbound for 7026</li>
</ol>
 
<h2><a id="post-34440-_lf9zt6uwujqa"></a><strong> Configuration</strong></h2>
<h3><a id="post-34440-_plmbtaprj6y7"></a>Directory Synchronization Service (DSS)</h3>
Before DSS is operational, you have to finish its configuration. To do so:

1. Open the Directory Sync user interface. This will either happen automatically when you click Finish on the DSS installer or by going to <strong>Windows Start → OpenLM → OpenLM Directory Sync</strong>.

<strong>Note:</strong> <em>If you use Identity Service, configure the DSS in the Identity Service and restart the DSS service. Use</em><a href="https://www.openlm.com/docs/openlm-identity-service-installation-guide/identity-service-configuration/"><em> this guide</em></a><em> for more. If you do not use Identity Service – then no login is required.</em>

2. On the left menu, click on the <strong>Service Configuration</strong> tab.

3. Fill in the details as follows:

<img class="wp-image-38472" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-7.png" />

<em>Illustration: default settings for OpenLM SLM and DSS installed on the same machine</em>

<strong>OpenLM SLM:</strong>
<ul>
 <li><strong>IP/Hostname</strong> – the URL of the OpenLM SLM machine that DSS will connect and report to. If HTTPS/SSL is turned on for OpenLM SLM, make sure that the hostname here is exactly as it appears on the SSL certificate.</li>
 <li><strong>Port</strong> – the API port of the OpenLM SLM (default: 5015)</li>
</ul>
<strong>DSS Server</strong>
<ul>
 <li><strong>IP/Hostname</strong> – the URL of the DSS server that will be reported to the OpenLM SLM machine. If you have installed DSS on a machine different from OpenLM SLM, specify its address. If using SSL, make sure the hostname is exactly as it’s reflected on the certificate file.</li>
 <li><strong>Port</strong> – the port through which the DSS UI is served (default: 7026). By default, this field is read-only. To change, edit <strong>kestrel.config</strong> in C:Program FilesOpenLMOpenLM Directory Synchronization Service Service and restart the DSS Service.</li>
 <li><strong>SSL</strong> – toggle to either enable or disable HTTPS for the DSS communications port. If turned on, you will also have to specify the <strong>SSL certificate file (pfx)</strong> and the <strong>Password</strong> for the SSL certificate. DSA connection settings will also have to be adjusted by editing the <em>OpenLM.Ldap.Agent.config</em> file in the DSA installation folder. See<a href="https://www.openlm.com/knowledge-base/dss-dsa-21-5-new-security-release-insights/"> this</a> document for the workflow of DSS with Server and Identity configured with SSL (HTTPS)</li>
</ul>
Additional Service Configurations:

<strong>Time&Date</strong>
<ul>
 <li>It allows specifying the timezone displayed and used in DSS UI:</li>
</ul>
<img class="wp-image-38473" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-8.png" />

<strong>Advanced:</strong>
<ul>
 <li>The <strong>Advanced </strong>tab allows deleting users and Groups from the DSS database. It should be used to delete entities and relations from the DSS Database and should not be used in the process of the initial configuration of DSS. Be mindful as this is an irreversible action:</li>
</ul>
<img class="wp-image-38474" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-9.png" />

4. Click <strong>Apply</strong> to finalize the configuration. This will send a connection request to OpenLM SLM.

<strong>Note:</strong><em> If you are using Identity Service, the DSS will automatically detect this configuration</em>:

<img class="wp-image-38475" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-10.png" />

<img class="wp-image-38476" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-11.png" />

5. Open EasyAdmin (<strong>Windows Start → OpenLM → OpenLM EasyAdmin User Interface</strong>).

6. Go to <strong>EasyAdmin Start → Administration </strong>then click on <strong>External Platforms</strong>.

<img class="wp-image-38477" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-12.png" />

7. Click on the <strong>DSS</strong> tab on the left then click on <strong>Approve</strong>.

<img class="wp-image-38478" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-13.png" />

8. You should see a success message confirming that the connection to DSS has been established successfully:

<img class="wp-image-38479" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-14.png" />

At this point, the connection between OpenLM SLM and DSS is established:

a) If you have any previous LDAP sync definitions, you must decide what to do with them before you can add new domains and configure new sync definitions. Consult section 4.2. below to continue.

b) If you don’t have any previous LDAP sync definitions stored, the configuration is now complete. You will have to add at least one DSA instance before you can start adding domains and sync definitions as described in Section 5.
<h3><a id="post-34440-_g37h3a1rm0cp"></a>The workflow of DSS with OpenLM SLM and Identity configured with SSL (HTTPS)</h3>
If the OpenLM SLM and Identity are on SSL (HTTPS):

1. After turning on SSL (HTTPS) on OpenLM SLM and Identity Service, open the Connectivity tab of DSS UI and change the Server’s IP/hostname value to HTTPS: FQDN (example “https://hostname.domain”). This should be done because SSL certificates are issued to FQDNs, which is common practice. Click <strong>Apply</strong>.

2. After DSS is approved in the HTTPS Server, it is mandatory to update the Identity Service location in appsettings.json of DSS by:

-changing manually “Authority” field from “http:identityHost:port” to “http<strong>s</strong>:identityHost:port” or

-from Identity UI Security settings, change the DSS URL by adding “/” at the end of the URL and clicking <strong>Save </strong>(a workaround to allow Identity to apply new settings and send a request to DSS). For example by changing:<a href="http://hostname:7026/"> http://hostname:7026</a> to <a href="http://hostname:7026/">http://hostname:7026</a><strong>/</strong>

3. After changes from steps 1 and 2, just restart first DSS, and then DSA services and continue working as usual.
<h3><a id="post-34440-_ee8nfuji6fu6"></a>DSS & DSA SSL Configuration</h3>
<ol>
 <li>Turn ON the SSL toggle and provide the certificate path and its password.</li>
 <li>Restart the DSS service.</li>
 <li>Go to the Identity Service UI and provide the new DSS URL (https://FQDN:port).</li>
 <li>Restart DSS service again.</li>
 <li>Open the DSS UI using the new URL https://FQDN:port.</li>
 <li>Set in the DSS UI [DSS SERVER IP/Hostname] field the new URL (https://FQDN).</li>
 <li>Click the <strong>Apply</strong> button.</li>
</ol>
<h3><a id="post-34440-_civfcddwq3xg"></a>Upgrading from Directory Sync 1.4 (Firebird ) to Directory Sync v2x. Database migration during upgrade:</h3>
If you are upgrading the Directory Sync, a specially designated checkbox will appear automatically in the DSS migration wizard if the system detects you are using the Firebird engine. If a different database type is used, no migration is required, you’re all set. The guide below also assumes that the migration from OpenLM SLM 5.6 to v 21 has been executed.
<ol>
 <li>Check the “Migrate data” box. From the dropdown list, choose the desired database then click <strong>Next.</strong></li>
</ol>
<strong><img class="wp-image-38480" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-15.png" /></strong>

2. The installation requires a clear database schema. You will need to fill in the configuration details as in the screenshot below: Server name, Database name, User, and Password. Click <strong>Next.</strong><em>Note: depending on your database type, the fields in the screen below may look slightly different</em>

<em><img class="wp-image-38481" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-16.png" /></em>

3. Select the folder you want to install the program to. Click <strong>Browse </strong>to do so or leave the default one (recommended). When the folder has been chosen, click <strong>Next.</strong>

<strong><img class="wp-image-38482" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-17.png" /></strong>

4. The DSS is ready to be installed. Tick the box if you wish to create a desktop icon then click <strong>Install.</strong>

<strong><img class="wp-image-38483" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-18.png" /></strong>

5. The installation/migration has been completed. Click <strong>Finish.</strong>

<strong><img class="wp-image-38484" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-19.png" /></strong>

6. Open up your DSS page. Go to the <strong>Service Configuration</strong> tab. Here specify the Server’s configuration details (v21 has a different one than v.5.6) then click <strong>Apply.</strong>

<strong><img class="wp-image-38485" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-20.png" /></strong>

<strong><em>To check if the changes are successfully applied, open up DSS from Easy Admin. (Administration→Directory Synchronization Service.</em></strong>

7.<a href="https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/#post-34440-_r6t6bsm0awb1"> Continue with the Directory Synchronization Agent upgrade.</a>
<h3><a id="post-34440-_9758ankszj9j"></a>DSS Configuration tools</h3>
<h4><a id="post-34440-_ftn6l38y1kov"></a>DB Configuration</h4>
<strong>Note that you must first create a database using the</strong><a href="https://www.openlm.com/openlm-system-requirements-2/"><strong> DSS system requirements</strong></a><strong> and upgrade its schema using the “DB Upgrade” procedure below before DSS can use an external database.</strong>

Configure which database the DSS will use to store its data.

DSS will be configured to work with an external database: mysql / MySQL/MariaDB (Check the system requirements).

<img class="wp-image-38486" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-21.png" />

<strong>DB provider</strong> – select the provider of your database. It can be either MariaDB, MySQL or Microsoft SQL Server with either standard authentication or Windows Authentication.

<strong>Server name</strong> – the IP or hostname of the external database server.

<strong>Port</strong> – (MySQL or MariaDB) the database server listening port.

<strong>DB Name</strong> – the name of the database

<strong>User ID</strong> – (MySQL, MariaDB or SQL Server Authentication) is the name of the database user.

<strong>Password</strong> – (MySQL, MariaDB or SQL Server Authentication) is the password for the database user.

<strong>Test</strong> – click to test the connection to the database.

<strong>Apply</strong> – save the settings.
<h4><a id="post-34440-_63mf1cthhpmf"></a>DB Upgrade</h4>
This tool allows you to upgrade the DSS database to the latest database schema. This operation is necessary if using a newly created database that has not been previously formatted to the DSS schema.

To upgrade the database, select the database type you have, enter the login and connection details on the DB Configuration tab, click Upgrade then follow the wizard instructions.

 
<h2><a id="post-34440-_b5zt8u6bhjh8"></a><strong>Usage</strong></h2>
<h3><a id="post-34440-_ctv7v7jtu7io" style="font-size: 1.5em; font-weight: bold;"></a>Agent Manager</h3>
On the Agent Manager tab, you can see all the DSAs controlled by the DSS.

<img class="wp-image-38495" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-30.png" />
<h4>Approve a new agent</h4>
All newly installed DSAs configured to report to the DSS have to be approved before they are operational.

To do so:

1. Click the <strong>Agent Manager</strong> tab.

2. Double-click on the agent row that has its status as “Pending approval” (or click the Edit Agent icon).

<img class="wp-image-38496" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-31.png" />

3. On the Approve Agent screen, open the Status drop-down menu and select <strong>Enabled</strong> then click <strong>Approve</strong>.

<img class="wp-image-38497" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-32.png" />
<h4><a id="post-34440-_u11bdhhpu5sq"></a>Edit an agent’s properties</h4>
1. Double-click on the row of the agent you want to change (or click the <strong>Edit</strong> <strong>Agent </strong>icon) and click on <strong>Advanced Settings</strong>.

2. Change any of the required fields. Consult the text below for the meaning of each value.

<img class="wp-image-38498" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-33.png" />

<strong>Agent name</strong> – a name for the agent. Must be unique (i.e. different from other pre-existing agent names).

<strong>Description (optional)</strong> – enter any text to help you recall or identify the agent

<strong>Status</strong> – can be set to either:
<ul>
 <li>Enabled – the agent is operational, querying the DSS for sync jobs and executing them.</li>
 <li>Suspended – all synchronizations run by this agent will be suspended. Once the status is changed back to Enabled they will resume</li>
</ul>
<strong>Agent request interval </strong>– specify how often the agent will query the DSS to check for sync jobs. It can be any value between 5 and 600 (seconds).

<strong>Sync method</strong> – can be set to either:
<ul>
 <li>Parallel – this mode means that the agent will run several syncs in parallel, at the same time.</li>
 <li>Serial mode – syncs are run one by one based on the FIFO method (first in, first out).</li>
</ul>
3. Click <strong>Save Changes </strong>when done.
<h4>Edit agent properties in bulk</h4>
To change the properties for several agents at once:

1. Check the box for each agent you want to edit

2. Click on <strong>Bulk Edit</strong>.

This will open the Bulk Editor window.

<img class="wp-image-38499" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-34.png" />

The available properties are the same as described in section 6.1.2. above.

3. Once done, click <strong>Save</strong> to apply the changes.
<h4><a id="post-34440-_1z1qdozct9q8"></a>Delete an agent</h4>
To delete one or more agents, check the box of the agent you wish to delete then click <strong>Delete</strong>.

<img class="wp-image-38500" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-35.png" />
<h3><a id="post-34440-_s0op2yaoiup3"></a>Domain Manager</h3>
On the Domain Manager tab, you can configure the domain directories you would like OpenLM to sync with.

<img class="wp-image-38501" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-36.png" />
<h4><a id="post-34440-_fdew1vm7ndm7"></a>Add a new sync domain</h4>
1. Click on <strong>Add Domain</strong>. The Add Domain screen will open. Configure the fields according to the instructions below.

<img class="wp-image-38502" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-37.png" />

<strong>Domain type</strong> – the type of the LDAP domain directory that you want to synchronize with. Currently, you can select either of these:
<ul>
 <li>Active Directory</li>
 <li>eDirectory</li>
 <li>ApacheDS</li>
 <li>AzureAD</li>
 <li>Google CDS</li>
</ul>
<strong>Domain name</strong> – the hostname/IP of the domain controller

<strong>Port</strong> – the port of the domain controller

<strong>SSL</strong> – toggle if the connection to the domain controller is SSL encrypted

<strong>Username</strong> – the username of an administrator account. Note that read access is required. A service account is recommended. If a normal account is used, the password might expire at which point the sync would stop working

<strong>Password</strong> – the password of the domain controller user

For Azure:
<ul>
 <li>Domain Name</li>
 <li>Client ID</li>
 <li>Client Secret</li>
 <li>Tenant ID</li>
</ul>
For more details about AzureAd synchronization consult this<a href="https://www.openlm.com/wp-content/uploads/2022/01/DS-Support-Azure-Direcory-.pdf"> link</a>.

For more details about Google CDS consult this<a href="https://www.openlm.com/wp-content/uploads/2022/04/DSS-Support-Google-CDS.pdf"> link.</a>

For more details about Okta integration consult this<a href="https://www.openlm.com/docs/wp-content/uploads/2024/04/Directory-Sync-Okta-support.pdf"> link.</a>

2. Click on <strong>Check Domain Connectivity</strong> to run a test. You will be prompted to select an agent which will run the connectivity test. The operation itself can take up to 2 minutes. Once finished, you will see either a success or failure message below the button.

3. Click either on <strong>Save</strong> to save the domain configuration OR click on <strong>Save Domain & Add Sync </strong>to save the configuration and open the <strong>Add Sync</strong> screen with this domain already preselected.
<h4><a id="post-34440-_oc93ti6nnx46"></a>Delete a domain</h4>
To delete one or more domains, check the box of the domain you wish to delete then click on <strong>Delete.</strong>

You will see a final warning popup:

<img class="wp-image-38503" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-38.png" />

<strong>Note:</strong> if there are any sync definitions associated with a domain, the sync definitions will also have to be deleted. Checking this box is required to proceed.
<h3><a id="post-34440-_b141s9d0s6bu"></a>Sync Manager</h3>
On the Sync Manager tab you can configure the synchronization definitions for the domains OpenLM will sync with. The Sync Manager centralizes access to all sync configurations.

<img class="wp-image-38504" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-39.png" />
<h4><a id="post-34440-_ffo7r99hnyn7"></a>Add a new sync definition</h4>
To add a new sync definition:

1. Click <strong>Add Sync</strong>.

2. Fill in the fields as follows:

<strong>Sync name</strong> – enter any text to identify the sync definition. Must be unique (i.e. different) from other sync definition names.

<strong>Status</strong> – toggle whether this sync is enabled or disabled.
<h5><a id="post-34440-_y0md0ses9a9s"></a>Destination & Time tab<a id="post-34440-_uxog6rf8757"></a><img class="wp-image-38505" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-40.png" /></h5>
<strong>Agent</strong> – select the agent that will execute this sync.

<strong>Domain name</strong> – select the domain to be synced. The drop-down list will be auto-populated with domains from the Domain Manager tab.

<strong>Start node</strong> – enter the LDAP path for the node that this sync will start from. For large service directories, specifying a node in the tree narrows the search and improves performance. By default, this value is automatically filled to correspond to the root of the selected domain directory. Click <strong>Test</strong> to validate the directory start node (can take up to 2 minutes). Make sure the LDAP connection string is in the right format.

<strong>Example #1:</strong> select the organizational unit “OU_AB” for the “testdev1domain.openlm.biz” domain on domain controller 10.0.0.153

LDAP://10.0.0.153/OU=OU_AB,DC=testdev1domain,DC=openlm,DC=biz

<strong>Example #2:</strong> Select the “SecGroup” security group for the “openlm.com” domain on domain controller server2008r2ldap.openlm.biz

LDAP://server2008r2ldap.openlm.biz/CN=SecGroup,DC=openlm,DC=com

<strong>Example #3:</strong> Select the group “Group_AB1” under organizational unit “OU_A” which in turn is under organizational unit “OU_AB” for the “testdev1domain.openlm.biz” domain

LDAP://10.0.0.153/CN=Group_A2,OU=OU_A,OU=OU_AB,DC=testdev1domain,DC=openlm,DC=biz

For help with finding the correct node path, a tool like<a href="http://www.ldapadmin.org/"> LDAP Admin</a> can be used: right-click on a node tree and select “Copy dn to clipboard”.

<strong>Sync schedule </strong>– define the schedule for when the sync will be run:
<ul>
 <li><strong>By time</strong> – select a day and a start time for the sync then click <strong>Add</strong> to add it to the schedule. Multiple times can be added.</li>
 <li><strong>By interval</strong> – enter a start time (format hh: mm) and the interval at which the sync will be repeated (can be any value from 1 to 720 hours). If the DSS is restarted, it will wait for the start time to trigger the sync.</li>
</ul>
<h5><a id="post-34440-_c4pabuiua7as"></a>Object tab</h5>
<img class="alignnone size-full wp-image-62447" src="https://www.openlm.com/wp-content/uploads/2022/01/image-1.png" alt="" width="1251" height="848" />

<img class="wp-image-38506" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-41.png" />

<strong>Sync object type</strong> – select the object type to be synchronized:
<ul>
 <li><strong>Users</strong> – only user objects will be synchronized. Here you can check the <strong>Only users monitored by the OpenLM box </strong>(description below).</li>
 <li><strong>Computers</strong> – only computer objects will be synchronized.</li>
</ul>
<em>Note: for Azure AD – only the Users option is supported</em>

<strong>Only users monitored by OpenLM</strong>

Checking this box means that when the sync is run, only the records of directory users with a matching OpenLM username will be imported and synchronized. This option is useful if you want to avoid adding directory users that have no correlated license activity recorded in the OpenLM system.

<strong>Technical note:</strong> for performance reasons, the monitored user list is cached by DSS. When a scheduled sync is triggered, DSS evaluates how much time has passed since the list was last retrieved from the Server (provided this isn’t the first time a sync is run). If this period is greater than the ActiveUsersRefreshIntervalHours parameter in the <strong>appsettings.json</strong> file, DSS will first query OpenLM SLM to update the user list and then proceed to query the directory via DSA using this updated list. If the period is lower than the set parameter, DSA will query the directory using the user list from the cache. Manual syncs bypass this condition. Set this parameter to a lower amount if you need to trigger syncs more frequently and anticipate that monitored OpenLM users will be added/changed during the sync interval.

<strong>Sync attribute</strong> – Select or enter the directory attribute for synchronizing the username. Make sure that the attribute exists for your specific directory type. The “Sync attribute” is supported only for the “Users” object type. Select from:
<ul>
 <li>All Attributes</li>
 <li>Custom Attributes:
<strong style="font-size: 16px;">cn</strong><span style="font-size: 16px;"> is the standard “Common Name” attribute used by all LDAP directories.
</span><strong style="font-size: 16px;">sAMAccountName</strong><span style="font-size: 16px;"> (e.g. “jdoe”) is used by Windows Server pre-2000 Active Directory versions.
</span><strong style="font-size: 16px;">userPrincipalName</strong><span style="font-size: 16px;"> (e.g. “john.doe@company.com”) is used by Windows Server post-2000 Active Directory versions.
</span>
<p class="p1"><b>mail
givenName
sn
dispalyName
telephoneNumber
title
department
description
physicaldeliveryofficename
whenCreated
whenChanged
ou
mobile
co
c
countryName
id
jobtitle
mailnickname
surname
MobilePhone</b></p>
</li>
</ul>
Note: when selecting the "<strong>Custom selection of attributes</strong>" option. only selected attributes will be retrieved from LDAP and sent to an external third-party system (OpenLM SLM or Users and
<p class="p1">Groups service).</p>
<p class="p1">In case DSS is still working with the OpenLM SLM, the last one has the logic to clear all user's properties (except (Mobile Phone].</p>
<p class="p1">[Email] and (Country|) before updating from LDAP sync, so if you disable some non-mandatory attributes in DSS sync settings, they will be empty after sync (except [Mobile Phone]. [Email] and [Country] - they will remain unchanged)</p>
<em>Note: for Azure AD – only the UserPrincipalName option is supported</em>

<strong>Membership filter</strong> – Choose whether to sync all objects (no filter) or only objects that belong to either Organizational Units (OUs) or Security Groups.

<em>Note: for Azure AD – there are two options</em>
<ol>
 <li><em>All objects</em></li>
 <li><em>Only members of a group</em></li>
</ol>
<strong>Search depth</strong> – define the sync depth. This option allows limiting the synchronization process to a certain hierarchical level:
<ul>
 <li><strong>0</strong> (default) – the full tree group hierarchy will be synchronized.</li>
 <li><strong>1</strong> – only the start node group will be synchronized.</li>
 <li><strong>2</strong> – the start node group and its 1st level descendants will be synchronized.</li>
 <li><strong>3</strong> – the start node and its 2nd level descendants will be synchronized.</li>
 <li>And so on.</li>
</ul>
<h5><a id="post-34440-_w19ebm43p3cu"></a>Group Rules tab</h5>
Select the rule by which groups will be created:

<strong>No groups</strong> – This is the default selection for group synchronization. This option negates any groups that an object belongs to. All objects will be assigned to the system default <strong>OpenLM_Everyone</strong> group.

<strong>Flat</strong> – All objects will become members of the group defined by the administrator. All objects found in the specified sync tree will be assigned as members of this single group. Any other hierarchical structures will be ignored.

<strong>Hierarchical</strong> – Create groups according to the hierarchical LDAP node trees. You can choose which kind of object classes to include in this rule:
<ul>
 <li><strong>Organizational Units (OUs)</strong> – any existing OUs in the directory will have groups created with the same name and the objects belonging inside them will be assigned as members of these groups.</li>
 <li><strong>Security Groups</strong> – any existing Security Groups in the directory will have groups created with the same name and the objects inside them will be assigned as members of these groups.</li>
 <li><strong>Distribution groups</strong> – any existing distribution groups in the directory will have groups created with the same name and the objects inside them will be assigned as members of these groups.</li>
 <li><strong>Customized & Unknown Object Classes</strong> – any unknown and custom object classes (those outside the standard directory class types of OUs, Security Groups, and DGs) – will have groups created with the same name and the objects inside them will be assigned as members of these groups.</li>
</ul>
<em>Note: for Azure AD – only the Security Groups option is supported</em>

<strong>Include start node</strong> – whether to include or not the start node in the synchronization.

<strong>Search depth</strong> – define the sync depth. This option allows limiting the synchronization process to a certain hierarchical level:
<ul>
 <li><strong>0</strong> (default) – the full tree group hierarchy will be synchronized.</li>
 <li><strong>1</strong> – only the start node group will be synchronized.</li>
 <li><strong>2</strong> – the start node group and its 1st level descendants will be synchronized.</li>
 <li><strong>3</strong> – the start node and its 2nd level descendants will be synchronized.</li>
 <li>And so on.</li>
</ul>
<img class="wp-image-38507" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-42.png" />

<strong>Entity attribute </strong>– Groups will be created according to the specific attribute a member has. Type or select an attribute from the drop-down menu that you would like to synchronize by (e.g. “Division”, “Employee ID”, “Initials”, “Department”, etc.). For each unique attribute, a new OpenLM group is created. If a user/computer is found to have the same attribute, it is added to the respective group.

<strong>Regular expression to specify the sub-level of the selected attribute (optional)</strong> – allows synchronization by an attribute that matches the Regex expression. E.g. If the “Country” attribute is selected, entering “USA” means that only objects that have their “Country” attribute set to “USA” will be synchronized.
<h5><a id="post-34440-_onbz0meyjy5a"></a>Set as default group checkbox</h5>
For reporting purposes, the default group is considered the group towards which a user’s license usage time is counted. By default, all users created manually or synchronized into OpenLM are assigned to the system default <strong>OpenLM_Everyone</strong> group. Checking this box allows you to override this behaviour:
<ul>
 <li>For the <strong>Flat</strong> and <strong>Entity Attribute</strong> synchronization rules, the default group will be the one you input or select from the menu.</li>
 <li>For the <strong>Hierarchical</strong> synchronization rule, the default group will be the first one that is found during the scan (e.g. if JohnDoe belongs to groups A, B and C – the default group is A)</li>
</ul>
While “<strong>Set as default group”</strong> is checked, the default group of an object is set and overwritten each time the synchronization runs.

<strong>Note about ApacheDS:</strong>

<em>Because of some specific ApacheDs rules in the group’s implementation, DSS is synchronizing ApacheDs groups in a different way from other directory types. The group in ApacheDs is usually specified as objectClass = groupOfNames OR groupOfUniqueNames. Respectively, child objects (members) in such cases are members or uniqueMember. Based on these relations is defined group membership. So, groupOfNames should contain member(s), and groupOfUniqueNames should contain uniqueMember(s). See the example below:</em>

<em><img class="wp-image-38508" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-43.png" /></em>

Link to the mapping details<a href="https://www.openlm.com/wp-content/uploads/2022/06/Mappings-between-Ldap-attributes-and-OpenLM-User-attributes.pdf"> here</a>.

6.3.2. Manually trigger a synchronization

Clicking the

<img class="wp-image-38509" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-44.png" />

icon with one or more sync definitions selected will manually trigger the respective synchronizations to be run.

Once triggered, you should see an animated icon indicating progress. Hovering over the icon will display the current status of the synchronization.

<img class="wp-image-38510" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-45.png" />
<h4><a id="post-34440-_1nci17pie4u9"></a>Reset entity-relationship data</h4>
Clicking the

<img class="wp-image-38511" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-46.png" />

icon with one or more sync definitions selected will clear all relationship data that was generated by that sync definition, including any “ignore” flags (see 6.4.1) that might have been previously set. It does not affect actual user data.
<h4><a id="post-34440-_nccxciwqgffk"></a>Stop Sync button</h4>
Sometimes syncs get stuck on the “Update Openlm DB” phase. Use the “Stop Sync” button to cancel those syncs to be able to run them again.
<h4><a id="post-34440-_wyk00sqxq4ef"></a>Delete a sync definition</h4>
To delete one or more sync definitions, check the box of the definition you wish to delete then click on <strong>Delete.</strong>

You will see a final warning pop-up before it is deleted.

<img class="wp-image-38512" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-47.png" />

Note that if a sync is running, it cannot be deleted.
<h3><a id="post-34440-_wckilp59rxxg"></a>Entities</h3>
On the Entities tab, you can see the entities created by the DSS synchronizations and set individual to ignore flags. The columns show the ID an entity has in the DSS database, the entity name, the entity type, which definition last synced it, and when was the last time it was synced. Use the filters to see which entities were modified by which sync, or search for a specific entity. Also, there is the possibility to customize the list of columns, print or export the table and configure the number of entities displayed on one page:

<img class="wp-image-38513" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-48.png" />

<img class="wp-image-38514" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-49.png" />
<h4><a id="post-34440-_c9rcunfpc4ud"></a>Ignore an entity from all synchronizations</h4>
Checking the <strong>Ignore</strong> box for a specific entity and then clicking <strong>Save</strong> will ignore that entity from all synchronization definitions. Any updates that might occur in the directory records will not be reflected in the OpenLM database for that entity.
<h4><a id="post-34440-_y2dizy26esgd"></a>Manually synchronize an entity</h4>
Clicking the

<img class="wp-image-38515" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-50.png" />

the icon will manually trigger synchronization for that specific entity. This option overrides any “ignore” flags that might have been previously set.
<h4><a id="post-34440-_42ab78eui9hn"></a>View entity relationships</h4>
Clicking on the

<img class="wp-image-38516" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-51.png" />

icon for a specific entity will open the Relations tab and display the relations that a specific entity has.
<h3><a id="post-34440-_9il1vg56fk15"></a>Relations</h3>
On the Relations tab, you can see all the relations an entity has in the DSS database, including the agent that queried the directory for this entity, the domain to which the entity belongs, the sync definition it is associated, the entity name, its parent name (if any) and the last time it was synced on. Use the filters to see which relations were updated and when.

The “Ignore” checkbox is per entity for the sync it is associated with. The list of columns can be customized and the table can be printed or exported. Also, the number of relations displayed on the page can be configured:

<img class="wp-image-38517" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-52.png" />

<img class="wp-image-38518" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-53.png" />

Clicking on any of the links will switch to the appropriate tab, showing more information about the linked item (agent, domain, sync, or entity).
<h4><a id="post-34440-_mx491orldmlr"></a>Ignore an entity from a specific synchronization</h4>
Checking the <strong>Ignore</strong> box for a specific Relation entity and then clicking <strong>Save</strong> will ignore that entity from the synchronization it is associated with under “Sync Name”. Any updates that might occur in the directory records will not be reflected in the OpenLM database for that entity, for this specific sync definition.
