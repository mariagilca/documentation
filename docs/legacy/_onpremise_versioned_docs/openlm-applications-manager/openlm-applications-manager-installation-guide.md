---
title: "OpenLM Applications Manager Installation Guide"
date: "2023-11-04T22:13:31"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/"
posttype: "manual_documentation"
id: "6601"
---

The OpenLM Applications Manager provides a solution for intervening in excessive license consumption and avoiding unplanned license expenditure or breach of license compliance.

The Applications Manager is a Java application hub for all OpenLM Workstation Agents. The OpenLM SLM queries the Broker component, which queries the Application Manager to obtain usage data. Because of this, the Broker component is mandatory and must be installed on the same machine as the Applications Manager.

<img class="wp-image-50402" src="https://www.openlm.com/wp-content/uploads/2022/12/openlm-applications-manager-workflow.png" alt="OpenLM Applications Manager workflow" />

OpenLM Applications Manager workflow.
<h2>Installation</h2>
The OpenLM Applications Manager is implemented in Java and can be installed on any machine that supports it. This section covers both Windows and Unix / Linux installations.
<h3>System Requirements</h3>
<ol>
 <li>Java 11<strong>*</strong></li>
 <li>64-bit OS</li>
 <li>A working install of OpenLM SLM</li>
 <li>Working install of OpenLM Broker</li>
</ol>
<strong>*</strong> Java 11 is optionally bundled with the Applications Manager installer, so no additional download is required.
<h3>Unix / Linux Installation</h3>
<h3><a id="post-50401-_qmubeu4stc0p"></a> Preliminary steps</h3>
1. Download the latest version of the Application Manager for Unix/Linux from the OpenLM website downloads section.

2. Extract the archive (OpenLM_AppManager_#.#.#.#.tar.gz) to a convenient location.

3. Open the <strong>settings.sh,</strong> file in your editor of choice. This file holds all the variables required for AppManager to operate. It is mandatory to modify the <strong>JAVA_HOME</strong> variable to point to the path of your JDK 11 install.

<em>The </em><strong><em>JAVA_HOME</em></strong><em> path must </em><strong><em>not</em></strong><em> end with a trailing slash</em>.

Optionally, you can also edit the <strong>APPMANGERSRVNAMEUSER</strong> variable in case you need to launch the service from a different account than “root.” In this case, you must ensure that all the files in the “OpenLM_AppManager_X.X.X.X” folder have their ownership reassigned to the new user.

4. Save the file and continue following the installation steps below, depending on your Linux distribution.
<h3><a id="post-50401-_vvlt0ikcw0tn"></a>Installing AppManager as a service</h3>
If your Linux version supports systemd, the following steps will install OpenLM AppManager as a service which starts automatically on system start-up:

1. Install the AppManager as a service:

sudo ./appmanager.sh install

2. Test the status of the AppManager service:

sudo ./appmanager.sh status

3. Run the AppManager detection script. Alternatively, if your Linux install has a desktop user interface, you can run the GUI AppManager Configuration tool with:

sudo ./appmanager.sh config
<h3><a id="post-50401-_10xyqyrsznl1"></a>Running AppManager as a background process</h3>
If your Linux version does not support systemd, the following steps will run OpenLM AppManager as a background process instead:

1. Run the AppManager process with:

sudo ./run_appmanager.sh

To open the AppManger configuration screen:

sudo ./run_appmanagerconfig.sh
<h3>Windows Installation</h3>
<ol>
 <li>Obtain the latest Windows installer from our <a href="https://www.openlm.com/download/">Downloads</a> page.</li>
 <li>Double-click the OpenLM Applications Manager installation file to launch the installation wizard.
<img class="wp-image-50403" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-2.png" />
Figure 1: The Applications Manager Setup wizard.</li>
 <li>Click <strong> Next, </strong> and the License agreement screen will appear</li>
 <li>Read the license agreement, then check the “<strong>I Accept the Terms of the License Agreement</strong>” box.
<img class="wp-image-50404" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-3.png" />
Figure 2: The License Agreement screen.</li>
 <li>Click <strong> Next </strong>to advance to the Java Selection Screen. You have two options:</li>
 <li>Install Application Manager with Java OpenJDK</li>
 <li>If you already have it installed, browse to the path where it is installed:
<img class="wp-image-50405" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-4.png" />
Figure 3: The Java Selection screen.</li>
 <li>Click <strong style="font-size: revert; color: var(--ast-global-color-2); background-color: var(--ast-global-color-5);"> Next </strong><span style="font-size: revert; color: var(--ast-global-color-2); background-color: var(--ast-global-color-5); font-weight: inherit;">to accept the configuration and advance to the “Install Location” screen.
<img class="wp-image-50406" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-5.png" />
Figure 4: The “Choose Install Location” screen.</span></li>
 <li>Select the installation path. The default is: <strong style="font-size: revert; color: var(--ast-global-color-2); background-color: var(--ast-global-color-5);">C:\Program Files\OpenLM\OpenLM App Manager\</strong></li>
 <li>Provide the OpenLM SLM hostname and listener port - the default port is 5015:
<img class="wp-image-50407" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-6.png" />
Figure 5: The Installation Completed screen.</li>
 <li>After installation is complete, click <strong style="font-size: revert; color: var(--ast-global-color-2); background-color: var(--ast-global-color-5);"> Next, </strong><span style="font-size: revert; color: var(--ast-global-color-2); background-color: var(--ast-global-color-5); font-weight: inherit;">then </span><strong style="font-size: revert; color: var(--ast-global-color-2); background-color: var(--ast-global-color-5);"> Finish </strong><span style="font-size: revert; color: var(--ast-global-color-2); background-color: var(--ast-global-color-5); font-weight: inherit;">to complete the installation:
<img class="wp-image-50408" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-7.png" />
Figure 6: The completion screen.
</span></li>
</ol>
<h3><a id="post-50401-_901v2bpws9ay"></a>Using an external JRE installation</h3>
Suppose you have chosen to use an external JRE installation instead of the one bundled with the Applications Manager installer. In that case, you must follow additional steps to get the “OpenLM App Manager” service to work. Please ensure that your Java installation is at least version 11 per the listed system requirements. To configure an external JRE with the Applications Manager:
<ol>
 <li>Locate your Applications Manager installation and open the <strong>bin</strong> folder (by default, the full path is <strong>C:\Program Files\OpenLM\OpenLM App Manager\bin</strong>).</li>
 <li>Double-click on <strong>OpenLMLicenseManager.exe.</strong></li>
 <li>Select the <strong>Java</strong> tab.
<img class="wp-image-50409" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-8.png" width="506" height="496" />
Figure 7: The “Java” tab in the OpenLM App Manager Config tool.</li>
 <li>Uncheck the “Use default” box.</li>
 <li>Click the <strong> … </strong>box near the “Java Virtual Machine” field.</li>
 <li>Browse to the location of your <strong>sqljdbc_auth.dll</strong> file. (e.g., on a typical JDK11 installation, this is located at <strong>C:\Program Files\OpenLM\OpenLM Applications Manager\bin</strong>)</li>
 <li>Click Open, then OK.</li>
</ol>
<h3>Generate an authorization file.</h3>
<ol>
 <li>Access the EasyAdmin User Interface.</li>
 <li>Navigate to Start <span style="font-weight: 400;">→ Administration → System & Security → Security → Authorization → ADD.</span></li>
 <li>From the <strong>Type </strong>drop-down list, select <strong>Applications Manager.</strong></li>
 <li>In the <strong>Description</strong> field, type in a free text.</li>
 <li>Click <strong>SAVE</strong>. Click <strong>OK. </strong> The authorization details (Client ID and Client Secret ) are displayed. You can either download the JSON file or copy and paste them.</li>
 <li>Click <strong>Download</strong> or <strong>Copy.</strong></li>
 <li>Close the dialog.</li>
</ol>
<h3>Applications Manager Authorization</h3>
<ol>
 <li>Access C:\Program Files\OpenLM\OpenLM Applications Manager</li>
 <li>Look for the <strong>auth_tool </strong>bat file and open it. The OpenLM Applications Manager Auth Tool opens up.</li>
 <li>Click <strong>Import Authorization File</strong>. Please navigate to the location where the authorization file is saved and open it. (You can also manually paste the Client ID and Client Secret).</li>
 <li>Click <strong>Test. </strong>A pop-up message should appear that the connection is successful. Click <strong>OK</strong> to close it.</li>
 <li>Click <strong>Apply. </strong>A pop-up message should appear, prompting you to restart the Applications Manager.</li>
 <li>Open the Windows Services screen (open a Run dialog by pressing <strong>Windows + R</strong>, type <strong>services. msc,</strong> and click OK)</li>
 <li>Locate the “OpenLM App Manager” service and select it.</li>
 <li>Click on “Start” in the top-left corner.</li>
 <li>You can close the Services window once the service has started.</li>
</ol>
<h2>Configuring the Applications Manager</h2>
To run correctly, the Applications Manager requires configuration of the various components that it interacts with. These include the OpenLM SLM, OpenLM Broker, and OpenLM Workstation Agent. This section will show you how to configure each of these components separately.
<h3>OpenLM Broker Configuration for Applications Manager</h3>
The OpenLM Broker facilitates the connection to the OpenLM SLM. Once the Broker has been configured to interface with the Applications Manager, the settings will be passed along to the SLM. For this reason, we recommend that the configuration of the Applications Manager be done through the Broker first.

The Detect feature can automatically detect license manager information and simplify OpenLM Broker configuration. The function will add information for new ports (e.g., commands and paths) depending on what is detected.
<ol>
 <li>Open the OpenLM Broker. Go to <strong> License Managers Tab → ADD</strong>.</li>
 <li>Click <strong> Detect. This will populate the options with detected configurations or</strong> use defaults. The Applications Manager license server and additional nodes will be added to the navigation panel.
<img class="wp-image-50411" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-10.png" />
Figure 8: The OpenLM Broker Configuration Tool and the “Detect” function.</li>
 <li>Review the auto-detected license managers to ensure the information corresponds to your installation. These items include the Applications Manager Host Name \ IP (License Server node), Port number and License Manager Type (Port node), command line paths to ‘status’ (Commands Status node) and ‘data_inquiry’ (Commands → data_inquiry node), and log file path (Log Files node). See the defaults listed in <strong>Table 1</strong>.</li>
</ol>
<table>
<thead>
<tr>
<th><strong>LM Type</strong></th>
<th>OpenLM App Manager</th>
</tr>
<tr>
<th><strong>Hostname \ IP</strong></th>
<th>Localhost</th>
</tr>
<tr>
<th><strong>Port Number</strong></th>
<th>27080</th>
</tr>
<tr>
<th><strong>Status Toggle</strong></th>
<th><em>Active </em></th>
</tr>
<tr>
<th><strong>Log File</strong></th>
<th>C:\Program Files\OpenLM\OpenLM App Manager\logs\lm-log.log</th>
</tr>
</thead>
</table>
<strong>Table 1: OpenLM Broker defaults for the Applications Manager</strong>

<strong>
</strong> Click <strong> SAVE </strong> to commit the changes.
<ol>
 <li>Open the EasyAdmin User Interface of the SLM and Open the License Servers window. Go to <strong>Start → Widgets → License Servers.</strong>
<img class="wp-image-50412" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-11.png" />
Figure 9: EasyAdmin User InterfaceLicense Servers screen.</li>
 <li>If the Broker has detected and added your Applications Manager, you should use the AppManager with Pending Status as depicted in the screenshot above. Double-click, then select the timezone and click <strong>Approve.</strong></li>
</ol>
<h3><a id="post-50401-_dzdl29psg990"></a>OpenLM Workstation Agent Configuration for Applications Manager</h3>
To enable the OpenLM Workstation Agent to intervene in software licensing distribution via the Applications Manager, it must be configured in the Workstation Agent. This can be done in two ways: before or after the Workstation Agent.
<ol>
 <li>While installing the Workstation Agent, one prompt will ask whether you are using the App Manager. Check the Use Applications Manager box and provide its host and port as depicted below:
<img class="wp-image-50413 alignnone" src="https://www.openlm.com/wp-content/uploads/2022/12/word-image-50401-12.png" />
Figure 10: The OpenLM Workstation Agent installation prompt with Applications Manager settings</li>
 <li>For the complete Workstation Agent installation guide, follow this link</li>
 <li>If not already set, change the Applications Manager server address to the actual hostname or IP address where it is installed.</li>
 <li>Check the connectivity to the OpenLM License Manager by clicking the <strong> Check Connectivity Status </strong>button. This should return a success screen. If it returns a failure, check to see that the Applications Manager service is running, that the configuration for the Port and License Server in the Broker is set correctly, and that your license file has support for the Applications Manager extension. If the problem persists, please get in touch with OpenLM support (support@openlm.com)</li>
 <li>Click the<strong> Apply </strong>button. This will accept the changes and close the Agent Configuration screen.</li>
</ol>
At this point, the configuration is complete.

Please take a look at <a href="https://www.openlm.com/knowledge-base/configuring-openlm-applications-manager/">this document</a> for more in-depth information.
