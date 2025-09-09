---
title: "OpenLM Broker Configuration"
date: "2023-11-04T21:36:22"
permalink: "https://www.openlm.com/docs/openlm-broker-installation-on-windows/openlm-broker-configuration/"
posttype: "manual_documentation"
id: "6588"
---

<h2><a id="post-14324-_mlv65xg30sp6"></a><strong>Introduction</strong></h2>
The OpenLM Broker requires configuration according to the desired use and preferences of an organization and to influence the best communications between the Broker and Server. All parts of the configuration are completed through the OpenLM Broker Configuration Tool (besides Java and some specialized configurations). This document covers only Broker configuration. For information on configurations for Server, installation of Broker and Broker use, see the dedicated <a href="https://www.openlm.com/application-notes-v3-0/installing-openlm-v3-0/broker-comprehensive-installation-guide-an4004b/">OpenLM Broker Installation</a>.

The OpenLM Broker tool is an optional Java software module that interacts directly with the license manager server in order to get the current license server status. Being a Java component, the OpenLM Broker can run on any Java-supported platform.

The benefits of OpenLM Broker include the following (see the <a href="https://www.openlm.com/support-page/faq/faq-openlm-broker/faq-what-is-the-openlm-broker-do-i-need-it/">feature list</a> for additional information):
<ul>
 <li>Sending queries to obtain license usage information from the license manager.</li>
 <li>Buffering transmissions to overcome potential communication failures.</li>
 <li>Monitoring log file information (e.g., license denials, accurate license usage logging, offline licenses, etc.).</li>
 <li>Maintenance of FlexLM Options files from the OpenLM EasyAdmin interface.</li>
 <li>Monitoring license file information (e.g., license packaging, license pools, Named licenses, DUP_GROUP).</li>
 <li>Remote file fetching.</li>
 <li>Uploading license files to the license server.</li>
 <li>Starting / Stopping / Rereading of the license server.</li>
</ul>
After OpenLM Broker is installed on the license manager server, the next step is to configure the package to address the OpenLM SLM, license servers and to define access to server files.

 

To open the configuration, choose<strong> [Start] > [OpenLM] > [OpenLM Broker]</strong> (default path: C:ProgramDataMicrosoftWindowsStart MenuProgramsOpenLMOpenLM Broker). This will open the OpenLM Broker Configuration Tool (see <strong>Figure 1</strong>) which allows the setup of OpenLM Broker, OpenLM SLMs, and license servers.

<strong><img class="wp-image-14325" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-220.png" />
Figure 1: The OpenLM Broker Configuration Tool as it appears immediately after installation.</strong>

<em>[NOTE: OpenLM Broker automatically detects the settings of some license managers (e.g., FlexLM, DSLS, RMS) if they are already installed on the machine so initial configurations may vary. The existence and location of options files are not automatically configured, so setting names and paths need to be entered manually.]</em>

 
<h1><a id="post-14324-_yabmo4oz9n0g"></a><strong>Configuring OpenLM Broker</strong></h1>
The options for configuration include adding an OpenLM SLM and adding a license server. These options are covered in separate sections below.

 
<h2><a id="post-14324-x5mrpsrhptee"></a><em>Add an OpenLM SLM</em></h2>
The OpenLM SLM is the hub of the OpenLM system. It integrates the info from peripheral OpenLM components (e.g., OpenLM Brokers and OpenLM Workstation Agents). At least one server must be added to complete the setup and exit the configuration tool.

1. Open the OpenLM Broker Configuration Tool (<strong>Start > OpenLM > OpenLM Broker Configuration Tool). </strong>

2. Click the "OpenLM SLMs" item in the menu at the left of the OpenLM Broker Configuration Tool screen.

3. Click on the<strong> [+Add OpenLM SLM]</strong> button. The OpenLM SLM connectivity panel will appear at the right of the screen prefilled with default information (see<strong> Figure 2</strong>).

<strong><img class="wp-image-14326" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-221.png" />
Figure 2: The Configuration Tool with Connectivity panel displayed.</strong>

4. Change the OpenLM SLM parameters to match your configuration. Items 'a' and 'b' must match the server name and port in order for the connectivity check to succeed.
<p style="padding-left: 30px;">a.<em> [Optional] </em>Change the <strong>OpenLM SLM </strong>name. This will be "localhost" by default. If the location of the installation is not local, this should be modified to match the exact server name or IP address.</p>
<p style="padding-left: 30px;">b.<em> [Optional] </em>Change the OpenLM <strong>Port</strong> for the Broker. This will be "7016" by default. <em>[NOTE: This is the same port number as appears in the “OpenLM SLM Configuration” tool, under the “Port Settings” tab, in the “License Managers Reporting Port” text box.]</em></p>
<p style="padding-left: 30px;">c.<em> [Optional] </em>Change the <strong>Sending Timeout</strong> time. This is the Broker’s sending timeout limit. The default is "45" sec.</p>
<p style="padding-left: 30px;">d.<em> [Optional] </em>Change<strong> Activate Buffering</strong>. This is enabled/checked by default. It enables the Broker’s offline mode which stores unsent data when not connected to the OpenLM SLM. All messages buffered will be sent to the OpenLM SLM when the connection resumes.</p>
<p style="padding-left: 30px;">e.<em> [Optional] </em>Change the <strong>Buffer File Size</strong>. This step is only possible if Active Buffering is enabled. The file size limits the number of messages saved in one buffer file. The default value is 3,072 kb. <em>[NOTE: it is the user’s responsibility to clear the file system.] </em></p>
<em> [Optional] </em>Check <strong>SSL</strong> checkbox to send data to OpenLM SLM using SSL secure communication protocol.

f.<em> [Optional] </em>Click the<strong> [Clean Buffer] </strong>button. A confirmation screen will appear (see <strong>Figure 3</strong>). Click<strong> [Yes] </strong>to confirm to delete the data; click<strong> [No] </strong>to close without affecting the data in the buffer file. <em>[NOTE: It is recommended that this feature be used with some caution so that desired data is not lost.]</em>
<p style="padding-left: 30px;"><strong><img class="wp-image-14327" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-222.png" />
Figure 3: The Clean Buffer confirmation screen.</strong></p>
<p style="padding-left: 30px;">g. Click the<strong> [Check Connectivity to OpenLM SLM]</strong> button. This will initiate a connectivity check and result in one of several behaviors (i, ii or iii):</p>
<p style="padding-left: 60px;">i. If OpenLM SLM name or Port change, the check applies the changes. A reminder to clean the buffer appears (see <strong>Figure 4</strong>), and then a Save confirmation (see <strong>Figure 5</strong>). Either <strong>Step #4.g.ii</strong> or <strong>Step #4.g.iii </strong>follows.</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14328" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-223.png" />
Figure 4: The Clean Buffer reminder.</strong></p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14329" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-224.png" />
Figure 5: Confirmation screen for data changes</strong></p>
<p style="padding-left: 60px;">ii. An error screen opens if Broker appears to be stopped. (see <strong>Figure 6</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14330" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-225.png" />
Figure 6: The Broker Connection error screen.</strong></p>
<p style="padding-left: 60px;">If the error screen appears, click<strong> [OK]</strong> to close the screen and then click<strong> [Restart Broker]</strong>. A success screen should appear confirming that Broker services have restarted (see <strong>Figure 7</strong>). Click<strong> [OK]</strong> and repeat <strong>Step #4.g</strong>.<em> [NOTE: If Broker services do not restart successfully examine the OpenLM Broker log files for recent errors (located in </em><strong><em><path>OpenLM Brokerlogs</em></strong><em>). If the issue is not apparent or cannot be resolved contact OpenLM support </em><a href="mailto:support@openlm.com"><em>support@openlm.com</em></a><em>.]</em></p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14331" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-226.png" />
Figure 7: The Broker restart success screen.
</strong></p>
<p style="padding-left: 60px;">iii. A countdown screen will appear (see <strong>Figure 8</strong>), and then a result of success (see <strong>Figure 9</strong>) or server connection failure (see <strong>Figure 10</strong>). If the connection is successful continue with <strong>Step #5</strong>. If the connection fails, check that the OpenLM SLM is running and repeat <strong>Step #4.g</strong>.</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14332" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-227.png" />
Figure 8: Countdown screen.
</strong>
<img class="wp-image-14333" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-228.png" />
<strong>Figure 9: Connection success.</strong></p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14334" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-229.png" />
Figure 10: Connection Failure.</strong></p>
<p style="padding-left: 30px;"><em>h. [Optional] </em>Click the<strong> [Detect] </strong>button to automatically detect license managers. This action will look for new configurations. <em>[NOTE: See Detecting Broker Configuration later in this document for additional details.]</em></p>
5. Click<strong> [Apply] </strong>to save the information entered.

6. Click the<strong> [Restart Broker]</strong> button. This restarts the OpenLM Broker services with the updated configuration.

The OpenLM Broker connection to OpenLM SLM is complete. Please refer to documentation for specific modules for additional integration.

 
<h2 id="post-14324-8h8tornqnotk"><em>Add a License Server</em></h2>
Adding a license server involves adding the server and then configuring it.

1. Click on a server name in the navigation pane at the left of the OpenLM Broker Configuration Tool screen (see <strong>Figure 11</strong>). This displays the License Manager panel at right. The license server Host Name IP should default in based on the local machine.<em> [NOTE: To check the Host Name, type </em><strong><em>ipconfig/all</em></strong><em> at a command prompt.]</em>

<img class="wp-image-14335" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-230.png" />
<strong>Figure 11: Selected License Server License Manager panel.</strong>

2. Click<strong> [+Add Port] </strong>above the navigation panel. A new port node is added and the <strong>Add New Port</strong> dialog opens warning to update Port Number and Vendor detail (see <strong>Figure 12</strong>).

<img class="wp-image-14336" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-231.png" />
<strong>Figure 12: Add New Port dialogue.</strong>

3. Click <strong>[OK]</strong> to close the Add New Port dialogue. The Port Number field, License Manager Type drop list and “Advanced” link will be displayed in the License Manager Port panel (see <strong>Figure 13</strong>).

<strong><img class="wp-image-14337" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-232.png" />
Figure 13: The Configuration Tool displaying the License Manager Port panel.</strong>

4. Change the <strong>Port Number</strong> if appropriate. The default will be 27000.

5. Select the license type that needs to be managed (e.g., FlexLM) from the <strong>License Manager Type</strong> drop list.

6. Click<strong> [Apply]</strong> to accept the changes. If changes have been made, a confirmation screen appears requesting confirmation of the changes (see<strong> Figure 14</strong>).

<strong><img class="wp-image-14338" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-233.png" />
</strong><strong>Figure 14: The Update Commands Confirmation screen.</strong>

7. Click<strong> [Yes] </strong>on the confirmation screen commits the data. A save success screen appears when the process is complete (see <strong>Figure 15</strong>).

<strong><img class="wp-image-14339" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-234.png" />
Figure 15: Save success screen for License Manager changes.</strong>

8. Click <strong>[OK]</strong> on the Save success screen to return to the License Port Manager panel.

9. Review the paths at each node to be sure they are valid. To do this, follow <strong>Step #9.a</strong> to <strong>Step #9.c</strong>. For more information on setting paths or to address failures, see <a href="#14324-mbl8vx4hgacm">License Server Command Paths</a> later in this document.
<p style="padding-left: 30px;">a. Click the plus<strong> [+]</strong> icon to the left of the <strong>Commands</strong> node to expand the node See <strong>Figure 16</strong>).</p>
<p style="padding-left: 30px;"><strong><img class="wp-image-14340" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-235.png" />
Figure 16: The Commands node expanded.</strong></p>
<p style="padding-left: 30px;">b. Click the node to reveal the associated configuration panel on the right of the OpenLM Broker Configuration Tool screen.</p>
<p style="padding-left: 30px;">c. Click the<strong> [Execute] </strong>button below the Command Line field. The "Test execution of the status command line" screen will appear with a message of success or failure.</p>
<em>10. [Optional] </em>Create additional license server ports by repeating <strong>Step #2</strong> to <strong>Step #9</strong>. <em>[NOTE: Port numbers cannot be duplicated.]</em>

11. Click the<strong> [Restart Broker] </strong>button. This restarts OpenLM Broker with the applied configurations.

At this point the basic configuration of the license server is complete.

 
<h2><a id="post-14324-us4pdov2kxi"></a><em>Detecting Broker Configuration</em></h2>
The Detect feature can be used to automatically detect license manager information and simplify OpenLM Broker configuration. The function will add information for new ports (e.g., commands and paths) depending on what is detected. This is useful for clean setups or detecting new license server information. Existing information is reserved and edited ports are not updated with default information.

1. Click <strong>[Detect]</strong> on the bottom of the OpenLM Broker Configuration Tool screen. This will populate the Command options with detected configurations or it will use defaults for the License Manager Type. Nodes will be added to the navigation tree in the navigation panel corresponding to the populated commands.

2. Review all the added configurations to be sure the information has been added correctly.

 
<h2><a id="post-14324-cqi50hx23msh"></a><em>Read License Files</em></h2>
OpenLM can obtain license information via license usage records or via license files with supported license managers (e.g., FlexLM). In order to read the license files and incorporate the detailed license information, the OpenLM SLM and OpenLM Broker must be configured to relate to the license file.

1. Navigate to the License Manager Port panel of the OpenLM Broker Configuration Tool by clicking on the port to configure in the navigation panel to the left of the screen.

2. Click the <strong>Advanced>></strong> link. This will reveal the License Information section of the panel (see <strong>Figure 17</strong>).<em> [NOTE: The available configurations for the Advanced portion of the panel is context sensitive to the selected License Manager Type. For example, LUM license manager type has a "Cluster" checkbox which reveals further configuration options to allow Broker to make cluster-specific commands. All features are not supported at all for the selected License Manager Types. If there are no advanced configurations, the message "License Information not supported" will display on the panel.]</em>

<strong><img class="wp-image-14341" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-236.png" />
Figure 17: The License Manager Port screen with Advanced options revealed.</strong>

3. Locate the license file that will be monitored. This can be accomplished automatically (a) or manually (b). The file content can be viewed (c) and the order of the license files sorted (d). Finally, the monitoring needs to be enabled (e) to use the feature.
<p style="padding-left: 30px;">a. Automatic License File Path detection. License file paths are acquired automatically during startup for some license managers (e.g, FlexLM).</p>
<p style="padding-left: 30px;">b. Manual License File Path selection.</p>
<p style="padding-left: 60px;">i. Check the <strong>Set Path Manually</strong> checkbox by clicking on it. This will activate the <strong>[Add] </strong>button to the right of the entry field.</p>
<p style="padding-left: 60px;">ii. Click on<strong> [Add]</strong>. This will call a file browser.</p>
<p style="padding-left: 60px;">iii. Navigate to the location of the desired license file in the file browser and click on the file name to highlight it.</p>
<p style="padding-left: 60px;">iv. Click<strong> [Open]</strong>. This will place the path to the license file in the Path field (see <strong>Figure 18</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14342" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-237.png" />
Figure 18: The path field populated by the</strong> [Add] <strong>button.</strong></p>
<p style="padding-left: 60px;"><em>v. [Optional] </em>Repeat <strong>Step #2.b.ii</strong> to <strong>Step #2.b.iv </strong>to add additional files. Additional files with be added to the Path field separator.<em> [NOTE: The separators vary depending on vendor and OS. Most often they are semicolons </em><strong><em>(;)</em></strong><em> on Windows or colons</em><strong><em> (:)</em></strong><em> on Linux / Unix.]</em></p>
<p style="padding-left: 60px;">vi. Click<strong> [Apply] </strong>to commit the changes. This will display a query screen for updating all command nodes (see<strong> Figure 19</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14343" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-238.png" />
Figure 19: The Update Commands Confirmation screen.</strong></p>
<p style="padding-left: 60px;">vii. Click <strong>[Yes]</strong> to proliferate the changes to other nodes in the command tree. Click <strong>[No]</strong> to leave the command nodes as previously configured. A Save confirmation screen will appear to confirm changes have been committed to the broker.xml file (see<strong> Figure 20</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14344" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-239.png" />
Figure 20: Save confirmation screen.</strong></p>
<p style="padding-left: 30px;"><em>c. [Optional] </em>Click <strong>[Show]</strong> to display the content of the license file (see <strong>Figure 21</strong>). This opens a 'read only' display of the license text to confirm the file content. If there is more than one license file, multiple windows will open displaying the content individually.</p>
<p style="padding-left: 30px;"><strong><img class="wp-image-14345" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-240.png" />
Figure 21: Display of file content.</strong></p>
<p style="padding-left: 30px;"><em>d. [Optional] </em>Sort the license order. License files are sorted according to pools as part of OpenLM SLM multiple-pool monitoring. Sort order can be overridden using the <strong>Sort</strong> option in the License Information configuration.</p>
<p style="padding-left: 60px;">i. Click the<strong> Allow to Sort License File </strong>checkbox to enable sorting.</p>
<p style="padding-left: 60px;">ii. Click the<strong> [Sort] </strong>button to open the Asset Info Order screen.</p>
<p style="padding-left: 60px;">iii. Reorder the items in the screen by clicking an item to select it and then use the<strong> [Move Up]</strong> and<strong> [Move Down] </strong>buttons to position the item in the order (see <strong>Figure 22</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14346" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-241.png" />
</strong><strong>Figure 22: The Asset Info Order screen.
</strong></p>
<p style="padding-left: 60px;">iv. Click<strong> [Apply] </strong>to commit the changes and close the Asset Info Order screen.</p>
<p style="padding-left: 30px;">e. Initiate monitoring of the license file(s).</p>
<p style="padding-left: 60px;">i. Check the <strong>Watch License File</strong> box. This will enable the Watch Interval value.</p>
<p style="padding-left: 60px;">ii. Adjust the Watch Interval value as desired (the default is 300 seconds). Either enter a number directly in the field or scrolling with the toggle arrows. The license file will be checked for changes as defined in the Watch Interval. If a change is found, the Broker will propagate the new license file information to the OpenLM SLM.</p>
<p style="padding-left: 30px;">f. Click the <strong>[Apply] </strong>button. This commits the changes.</p>
<p style="padding-left: 30px;">g. Click the<strong> [Restart Broker] </strong>button. This restarts OpenLM Broker in order with the applied configurations.</p>
 
<h2><a id="post-14324-mbl8vx4hgacm"></a><em>License Server Command Paths</em></h2>
Commands allow control over a variety of tasks including starting and stopping processes, querying data and querying server status. Commands are license manager specific, and the paths for these commands may be set for each license server or port individually, or globally. The configuration is mostly automated by detecting settings. Manual configuration may be necessary. The steps below cover manual setup.

<em>[NOTE: Upon installation, some paths will be automatically detected. Other license manager command paths are set by default to C:Program FilesOpenLMOpenLM Brokertools. All Commands will not all be available for every license manager type.]</em>

1. Expand the port node in the OpenLM Broker Configuration Tool screen that will be configured by clicking the <strong>[+] </strong>to the left of the port. This will display additional nodes for configuration (see <strong>Figure 23</strong>).

<strong> <img class="wp-image-14347" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-242.png" />
Figure 23: The OpenLM Broker Configuration Tool with a port node expanded.</strong>

2. Click on the <strong>Commands</strong> node under the expanded port that you want to configure. The current configuration for the command will be displayed in the Command Definition panel on the right which will be context sensitive.

<em>3. [Optional] </em>Address the Windows Service Configuration on the Commands panel.<strong> Use Service</strong> is checked by default. The <strong>Service Name</strong> field will populate with default values when appropriate. <em>[NOTE: If the automated detection fails to populate the field, it is possible to determine the name using Windows Services]</em>. When checked <strong>NET START / NET STOP</strong> commands are used for Start / Stop processes. When unchecked<strong> LMGRD / LMUTIL DOWN </strong>are used which are FlexLM-specific.

4. Review the paths by clicking each node in the navigation tree. To check the Command Line paths, click the <strong>[Execute]</strong> button. If the Command Line paths are valid, a confirmation screen appears confirming the success (see<strong> Figure 24</strong>). If there is an error, the screen will contain error information (see <strong>Figure 25</strong>). See Table 1 for a list of configurable commands. If the commands are configured as desired, skip to <strong>Step #5</strong>.

<strong><img class="wp-image-14348" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-243.png" />
Figure 24: Execute confirmation screen with generic content.
</strong>

<strong><img class="wp-image-14349" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-244.png" />
Figure 25: Execute confirmation screen with error content.</strong>
<table>
<tbody>
<tr>
<td><strong>Command Node </strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td><strong>status</strong></td>
<td>Queries the License Server for its status; Up or idle.</td>
</tr>
<tr>
<td><strong>data_inquiry</strong></td>
<td>Queries the License Manager for license usage information that is forwarded by OpenLM Broker to the OpenLM SLM.</td>
</tr>
<tr>
<td><strong>start</strong></td>
<td>Starts license manager server activity.</td>
</tr>
<tr>
<td><strong>stop</strong></td>
<td>Stops license manager server activity.</td>
</tr>
<tr>
<td><strong>reread</strong></td>
<td>Prompts the license manager to re-read Option or License files that have been edited and incorporate new information.</td>
</tr>
<tr>
<td><strong>denial</strong></td>
<td>Returns data about license denials.</td>
</tr>
<tr>
<td><strong>remove_license</strong></td>
<td>Used to terminate license sessions.</td>
</tr>
</tbody>
</table>
<strong>Table 1: Configurable Commands.</strong>

<em>5. [Optional] </em>If any of the paths are incorrect, these can be updated manually (a) or by using the <strong>Update</strong> feature (b).
<p style="padding-left: 30px;">a. Manually update a command.</p>
<p style="padding-left: 60px;">i. Click on the command in the navigation tree. The information for the command will appear on the Command Definition screen.</p>
<p style="padding-left: 60px;">ii. Edit the path directly in the Command Line field.</p>
<p style="padding-left: 60px;">iii. Click the<strong> [Execute]</strong> button to confirm the command is functioning properly. A confirmation screen appears with success or error messages. If an error appears, edit the Command Line as necessary and repeat the test.</p>
<p style="padding-left: 60px;">iv. Click<strong> [Apply] </strong>to store and confirmation the changes (see <strong>Figure 26</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14350" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-245.png" />
Figure 26: The Command update confirmation screen after</strong> [Apply]<strong>. </strong></p>
<p style="padding-left: 60px;">v. Click<strong> [OK] </strong>to close the confirmation screen.</p>
<p style="padding-left: 60px;"><em>vi. [Optional] </em>Repeat <strong>Step #4.a.i</strong> to <strong>Step #4.a.iv</strong> to configure other commands.</p>
<p style="padding-left: 60px;">vii. Click<strong> [Restart Broker] </strong>to engage the new configuration. A success screen will confirm the restart (see <strong>Figure 27</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14351" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-246.png" />
Figure 27: Confirmation screen for the Broker restart.</strong></p>
<p style="padding-left: 30px;">b. To update all command paths under a Command node:</p>
<p style="padding-left: 60px;">i. Click on the Command node where the commands reside. The Commands panel will display to the right.</p>
<p style="padding-left: 60px;">ii. Browse for the path to the desired executable file using the<strong> [...] </strong>button to the right of the <strong>Path</strong> field, or type changes to the path directly in the field.</p>
<p style="padding-left: 60px;">iii. Click the<strong> [Update]</strong> button. This will update all paths under the Command node that have not previously been manually altered. A success screen will appear (see<strong> Figure 28</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14352" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-247.png" />
Figure 28: The Command update confirmation screen.</strong></p>
<p style="padding-left: 60px;">iv. Click<strong> [Apply] </strong>to store the changes. A confirmation screen will appear (see <strong>Figure 29</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14353" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-248.png" />
Figure 29: The Command update confirmation screen after</strong> [Apply]<strong>. </strong></p>
<p style="padding-left: 60px;">v. Click<strong> [OK] </strong>to close the confirmation screen.</p>
<p style="padding-left: 60px;">vi. Click<strong> [Restart Broker] </strong>to engage the new configuration. A success screen will confirm the restart (see <strong>Figure 30</strong>).</p>
<p style="padding-left: 60px;"><strong><img class="wp-image-14354" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-249.png" />
Figure 30: Confirmation screen for the Broker restart.</strong></p>
 
<h2><a id="post-14324-un06lbwonu3p"></a><em>License Server Vendors</em></h2>
The Vendors node on the navigation tree is used to define handling of vendor-specific license and option files. For more information on options files, see the <a href="https://www.openlm.com/controlling-licenses/options-file-management-using-openlm-easyadmin-an4007/">Options File Management</a> document.

1. Expand the port node where vendors need to be added in the OpenLM Broker Configuration Tool navigation panel by clicking the <strong>[+] </strong>to the left of the port. This will display additional nodes.

2. Click on the<strong> [+] </strong>to the left of the <strong>Vendors</strong> node under the port. The Vendor Definition panel will display on the right of the OpenLM Broker Configuration Tool screen.

3. A node titled ¨Vendor Name to Be Filled¨ will display under the Vendor node.<em> [NOTE: If no node appears, one can be added by clicking the</em><strong><em> [+Add Vendor]</em></strong><em> button above the navigation pane when the Vendor node is active.]</em>

4. Click on "<strong>Vendor Name to Be Filled</strong>" and the Vendor Definition panel will display additional fields to be used in the definition (see <strong>Figure 31</strong>).

<strong><img class="wp-image-14355" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-250.png" />
Figure 31: The Vendor Name to Be Filled node highlighted and additional fields visible.</strong>

5. Enter the vendor name in the <strong>Vendor Name</strong> field. The vendor’s name should be exactly as provided by the vendor (e.g.: ARCGIS, adskflex, ptc_d, MLM, ugslmd). For FlexLM, this field is secondary as the real name is read directly from the action line. For other license managers, the exact name is necessary for proper log analysis. The provided name will be displayed in the tree node when the changes are applied and can be used to create log file definitions (see <a href="#post-14324-_34kjwk1fcirh">License Server Log Files</a>). <em>[NOTE: You can find the vendor name in the Broker’s ‘data_inquiry’ command execution output or in EasyAdmin's Management → Licenses window.]</em>
<blockquote>
<ul>
 <li><strong>For RLM and LMX, the name must be an exact match to the one found in the Licenses window.</strong></li>
 <li><strong>For DSLS, the vendor name should be entered as "Dassault Systemes".</strong></li>
</ul>
</blockquote>
<em>6. [Optional] </em>Enter a description in the<strong> Option File Description</strong> field. This is a free text field for reference.

7. Click the<strong> [...] </strong>button to the right of the Option File Path field to search for the vendor option file. This should be a full path, including the option file name.

8. Click on the <strong>"Advanced>>"</strong> link to display the advanced options on the bottom of the panel if they are not displayed already.

9. Check the <strong>Watch Option File</strong> box to enable detection of changes in the option file.

10. <em>[Optional]</em> Adjust the <strong>Watch Interval</strong> which determines how often the option file is checked.<em> [NOTE: It is recommended to keep the 600 sec default value for best performance.]</em>

11. Click<strong> [Apply] </strong>to commit the changes made to the Vendor Definition panel. A confirmation screen will appear (see <strong>Figure 32</strong>).

<strong><img class="wp-image-14356" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-251.png" />
Figure 32: The Command update confirmation screen after</strong> [Apply]<strong>. </strong>

12. Click<strong> [Restart Broker]</strong> to engage the new configuration. A success screen will confirm the restart (see <strong>Figure 33</strong>).

<strong><img class="wp-image-14357" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-252.png" />
Figure 33: Confirmation screen for the Broker restart.</strong>

 
<h2 id="post-14324-_34kjwk1fcirh"><em>License Server Log Files</em></h2>
Log files produced by license managers must be configured to be read by OpenLM Broker. OpenLM Broker forwards data to the OpenLM server for analysis of license usage.

1. Expand the port node which needs to be configured so OpenLM Broker will read the log file by clicking the <strong>[+] </strong>to the left of the port in the OpenLM Broker Configuration Tool navigation panel. This will display additional nodes.

2. Click on the<strong> Log Files</strong> node. This displays the Log File Definition panel and reveals the <strong>[+Add Log File]</strong> button above the navigation panel (see <strong>Figure 34</strong>).

<strong><img class="wp-image-14358" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-253.png" />
Figure 34: The Log File node highlighted.</strong>

3. Click the<strong> [+ Add Log File]</strong> button. This will add a node below the Log Files node and reveal fields in the Log File Definition panel which are used to configure the definition.

4. Select the log file type from the <strong>Type</strong> drop-down list. Different options become available and should be selected according to the type of the license manager. E.g. For FlexLM it's <strong>"FlexLM Debug Log File"</strong>, for LMX it's <strong>"LMX Debug Log"</strong>. If no appropriate option is available, select <strong>"Other"</strong>.

5. Enter a name for the log file in the <strong>Name (Descriptive)</strong> field. This is a free text field and is used in the navigation tree as the log file node name.

6. Click the<strong> [...] </strong>button to the right of the Path field to search for the log file. This field should contain the full path, including the file name.

<em>7</em>. Select a <strong>Vendor</strong> from the Vendor drop-down list. The vendors are populated from entries that have been entered under the Vendor node. Make sure that for RLM, LMX and DSLS the names are an exact match (see step 5 in the <a href="#post-14324-un06lbwonu3p">License Server Vendors</a> section).

<em>8. [Optional] </em>Click on the <strong>"Advanced>>"</strong> link to display the advanced options on the bottom of the panel if they are not displayed already. <em>[NOTE: It is recommended that the default values for these parameters remain as predefined to avoid performance issues.]</em>

<em>9. [Optional]</em> Adjust the <strong>Set Data Size Limit</strong> parameter. This parameter defines the amount of data that is read from the log file on each pass in kilobytes.

10. Set the <strong>Watch Files by Pattern</strong> check box. When checked, logs can be tracked even when the logs are configured to change names (e.g., timestamps are added to the filenames). <em>[NOTE: Required for DSLS clients]</em>

11. Click<strong> [Apply]</strong> to commit any changes. A confirmation screen will appear (see <strong>Figure 35</strong>).

<strong><img class="wp-image-14359" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-254.png" />
Figure 35: The Command update confirmation screen after</strong> [Apply]<strong>. </strong>

12. Click<strong> [Restart Broker]</strong> to engage the new configuration. A success screen will confirm the restart (see <strong>Figure 36</strong>).

<strong><img class="wp-image-14360" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-255.png" />
Figure 36: Confirmation screen for the Broker restart.</strong>

 
<h2><a id="post-14324-847cfu36p8m"></a><em>Advanced Settings</em></h2>
Advanced settings accommodate some general parameters and functions. This includes setting logging levels (A) separately for Broker Service and Broker Configuration, as well as Reset (B) and Recording (C) components.
<h3><a id="post-14324-_oxtk7othsdsk"></a><em>A. OpenLM Broker Log Levels </em></h3>
The log file level for Broker Service and Broker Configuration are set on the Advanced Settings panel.

1. Click on the <strong>Advanced Settings</strong> node in the navigation panel of the OpenLM Broker Configuration Tool to display the Advanced Settings panel (see <strong>Figure 37</strong>).

<strong><img class="wp-image-14361" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-256.png" />
Figure 37: The Broker Configuration Tool with Advanced Settings displayed.</strong>

<em>2. [Optional] </em>Choose the desired logging level from the drop lists. <strong>Table 3</strong> defines these parameters.<em> [NOTE: More complex levels of logging may affect system performance.]
</em>
<table>
<tbody>
<tr>
<td><strong>Log Level </strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td><strong>ALL</strong></td>
<td>Most detailed level of event reporting including all data transaction information.</td>
</tr>
<tr>
<td><strong>DEBUG</strong></td>
<td>Detailed information about processed data transactions that give context to events so they can be analyzed.</td>
</tr>
<tr>
<td><strong>WARN</strong></td>
<td>Includes unexpected events that may warrant attention but do not qualify as errors or failures. Intended to help diagnose running issues.</td>
</tr>
<tr>
<td><strong>ERROR</strong></td>
<td>Logs all error and failure messages signaling irrecoverable behaviors or data loss .</td>
</tr>
<tr>
<td colspan="2"><strong>Table 3: Log level listing with descriptions.</strong></td>
</tr>
</tbody>
</table>
3. Click<strong> [Apply]</strong> to commit any changes. A confirmation screen will appear (see <strong>Figure 38</strong>).

<strong><img class="wp-image-14362" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-257.png" />
Figure 38: The Command update confirmation screen after</strong> [Apply]<strong>. </strong>

4. Click<strong> [Restart Broker]</strong> to engage the new configuration. A success screen will confirm the restart (see <strong>Figure 39</strong>).

<strong><img class="wp-image-14363" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-258.png" />
Figure 39: Confirmation screen for the Broker restart.</strong>

 
<h3><a id="post-14324-_10ad1a6ogfss"></a><em>B. Reset </em></h3>
Reset is intended to provide a method for clearing configurations OpenLM Broker. Because this may have broad-reaching effects, it is recommended that users become familiar with all the ramifications of resetting before attempting to reset (listed below as well as on the Reset panel).
<ul>
 <li>Reset clears all License Server and Port definitions. Any manual configuration of ports will be lost.</li>
 <li>Reset is not intended for deleting single ports. <em>[NOTE: To delete a specific port or license server, click the appropriate node and then click the </em><strong><em>[Delete]</em></strong><em> button above the navigation tree.]</em></li>
 <li>Reset should not be used to detect additional ports because it wipes out customizations.<em> [NOTE: Use</em><strong><em> [Detect]</em></strong><em> to automatically configure additional ports. See the section of this document on </em><a href="#post-14324-us4pdov2kxi"><em>Detecting Broker Configuration</em></a><em>.]</em></li>
 <li>Reset backs up the the OpenLM Broker configuration file prior to resetting. The backup file is labeled broker_YYYY-MM-DD_HH-MM-SS.xml. Users can rollback to that configuration by changing the file name to broker.xml (the current XML file name will need to be changed first).</li>
 <li>Default settings are applied after reset using automatic detection.</li>
 <li>OpenLM SLMs nodes are not affected.</li>
 <li>Advanced Settings are not affected.</li>
</ul>
After considering these warnings, the configuration can be reset using the following steps.

1. Click the <strong>Reset</strong> node so the Reset panel appears on the right of the OpenLM Broker Configuration Tool screen.

2. Click the<strong> [Reset]</strong> button. A Reset confirmation screen will appear (see <strong>Figure 40</strong>).

<strong><img class="wp-image-14364" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-259.png" />
</strong><strong>Figure 40: The Reset confirmation screen. </strong>

3. Click the<strong> [Yes]</strong> button to confirm deletion of the current configurations. Once the current configuration is deleted, a screen will appear (see <strong>Figure 41</strong>) while the system detects existing license servers..

<strong><img class="wp-image-14365" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-260.png" />
Figure 41: Detecting existing license servers.</strong>

4. Click<strong> [Restart Broker]</strong> to engage the new configuration. A success screen will confirm the restart (see <strong>Figure 42</strong>).

<strong><img class="wp-image-14366" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-261.png" />
Figure 42: Confirmation screen for the Broker restart.</strong>

 
<h3><a id="post-14324-_w7e2v6oozojd"></a><em>C. Record</em></h3>
Recording is a debugging feature meant to record OpenLM Broker activity. It is generally used by OpenLM support to locate issues. To record, follow the steps below.

1. Search for a location to store the recording using the <strong>[...] </strong>browse button located to the right of the <strong>Recording to Path</strong> field. Making a selection will populate the field with the full path but no file name. The file will be created and stored there when the<strong> [Record] </strong>button is clicked (<strong>Step #4</strong>) and will be named as in the example below:
<p style="padding-left: 30px;"><serverName>_<port #>_<startDateTime>_<endDateTime>.rec</p>
2. Set the duration of the recording in <strong>Recording Duration</strong> field. This defaults to one minute.

3. Select the ports to be recorded. These are populated in a tree structure according to the ports and license servers in the navigation panel (see <strong>Figure 43</strong>).<em> [NOTE: The illustration shows a checkbox tree in the Recording Configuration panel used for selecting what to record. In this case, the FlexLM license server will be recorded but the OpenLM App manager will not.]</em>

<strong><img class="wp-image-14367" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-262.png" />
Figure 43: The Recording Configuration panel with port 27080 selected.</strong>

4. Click the<strong> [Record] </strong>button. A file will be created and the activity recorded for the duration selected.

 
<h2><a id="post-14324-_v3mqbfs1uotv"></a><em>Exit the OpenLM Broker </em></h2>
When the configuration is complete, it is recommended that the user exit the configuration tool. Three components usually apply to nearly any configuration change (see the buttons on the screen in<strong> Figure 44</strong>):
<ul>
 <li><strong>[Apply]</strong></li>
 <li><strong>[Restart Broker]</strong></li>
 <li><strong>[Exit]</strong></li>
</ul>
<strong><img class="wp-image-14368" src="https://www.openlm.com/wp-content/uploads/2018/03/word-image-263.png" />
Figure 44: A typical OpenLM Broker  screen.</strong>

When exiting the configuration screen it is best to always click<strong> [Apply]</strong> (to store changes), then<strong> [Restart Broker]</strong> (to make changes live) before clicking <strong>[Exit]</strong> (to close the screen). This will conclude OpenLM Broker configuration.
