---
title: "OpenLM Broker Installation on Windows"
date: "2023-11-04T21:24:42"
permalink: "https://www.openlm.com/docs/openlm-broker-installation-on-windows/"
posttype: "manual_documentation"
id: "6583"
---

<h2><strong>Introduction</strong></h2>
OpenLM Broker facilitates communication between OpenLM Software License Management and Software License Management Cloud (further in the document <strong>SLM</strong> and <strong>SLMC</strong>) and the license manager to provide enhanced license statistics and functionality. It interacts directly with the license manager, querying it regularly for license information and relaying this data to the OpenLM SLM. While OpenLM Broker is an optional component, it is highly recommended for enhancing the license management experience and capabilities of the OpenLM system.

 
<h2><a id="post-26523-_j0u3fusxbf69"></a><strong>OpenLM Broker Installation</strong></h2>
OpenLM Broker is Java-based and can run on any Java-supported platform. The Broker needs to be installed on the same machine as the license manager. As the Java environment is required, Java Runtime Environment (JRE) is bundled as part of the installation (available only for the Broker installation). Before starting the installation, it is advisable to check the<a href="https://www.openlm.com/openlm-system-requirements-2/"> system requirements</a> on the OpenLM website. This document covers the installation of the OpenLM Broker on Windows in both standard wizard installation (see <strong>A. Installing OpenLM Broker with the Installation Wizard</strong>) and through the silent installation (see <strong>B. OpenLM Broker Silent Installation</strong>).

Both methods of installation require the OpenLM Broker installer. It can be located in the download area (<a href="https://www.openlm.com/download/">https://www.openlm.com/download/</a>).
<h3><a id="post-26523-_2p50darzi3"></a><strong><em>A. Installing OpenLM Broker with the Installation Wizard</em></strong></h3>
1. Double-click the installer file (OpenLM.Broker.Installer-#.#.##.##.msi) to initiate installation. A "Preparing to install" screen (see <strong>Figure 1</strong>) will appear briefly before the installation Welcome screen (see <strong>Figure 2</strong>).temp

<img class="wp-image-32458" src="https://www.openlm.com/wp-content/uploads/2021/02/openlm-broker-installer-wizard-welcome-screen-.png" alt="OpenLM Broker Installer wizard welcome screen." />

<strong>Figure 1: Installation preparation screen.</strong>

<strong><img class="wp-image-32459" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-16.png" /></strong>

<strong>Figure 2: Installation welcome screen.</strong>

2. Click <strong>[Next] </strong>to continue with the installation. The License Agreement screen will appear (see <strong>Figure 3</strong>).

<img class="wp-image-32460" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-17.png" />

<strong>Figure 3: License agreement screen.</strong>

3. If you agree to the terms and want to continue with the installation, click the "I Agree" radio button (see <strong>Figure 4</strong>). Clicking the radio button will enable the <strong>[Next]</strong> button. Clicking <strong>[Cancel]</strong> will exit the installer without any changes.

<img class="wp-image-32461" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-18.png" />

<strong>Figure 4: License agreement with "I Agree" checked.</strong>

4. Click <strong>[Next]</strong>. The Java selection screen will appear. Either accept the bundled OpenJDK distributive or choose and point to a path where Java 11 is already installed (see <strong>Figure 5</strong>).

<img class="wp-image-32462" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-19.png" />

<strong>Figure 5: The Java selection screen.</strong>

Click <strong>[Next]</strong>. The Select Installation Folder screen will appear with the default installation path (see <strong>Figure 6</strong>).

<img class="wp-image-32463" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-20.png" />

<strong>Figure 6: Select the Installation Folder screen.</strong>

5.<em> [Optional]</em> Click<strong> [Browse]</strong> to select a different installation path. The default path is recommended.

6. Click <strong>[Next]</strong>. An installation confirmation screen will appear (see <strong>Figure 6</strong>).

<img class="wp-image-32464" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-21.png" />

<strong>Figure 7: Installation confirmation screen.</strong>

7. Click the<strong> [Next]</strong> button to continue with the installation. An installation progress screen will appear (see <strong>Figure 8</strong>). The installation will continue until completion. The Success screen (see <strong>Figure 9</strong>) will appear at the end of a successful installation.
<img class="wp-image-32465" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-22.png" />

<strong>Figure 8: Installation progress screen.</strong>

<img class="alignnone size-full wp-image-6865" src="https://www.openlm.com/docs/wp-content/uploads/2023/11/Screenshot-2024-07-02-at-19.12.13.png" alt="" width="1881" height="1005" />

<strong>Figure 9: Notification of successful installation. Broker Initial Setup window</strong>

8. Click the <strong>[Close]</strong> button to exit the installer.

9. Go to the Broker and select where the Broker will report the data: into your Cloud Account or your on-premise installation:

9.1 On-premise installation:
<ol>
 <li>Select the<strong> “Local OpenLM Installation”</strong> option then click <strong>[Next]</strong></li>
 <li>Indicate the URL to the Easy Admin:
<img class="alignnone size-full wp-image-6867" src="https://www.openlm.com/docs/wp-content/uploads/2023/11/Screenshot-2024-07-02-at-19.13.23.png" alt="" width="1878" height="1006" /></li>
 <li>Click<strong style="font-size: 16px;"> [Next]. </strong><span style="font-size: 16px;">The Broker will attempt to make the connection to the EasyAdmin</span></li>
</ol>
<a id="post-26523-_f0soxqqgh4k8"></a><strong>If you are connected to the OpenLM SLM via the Identity Service:</strong>
<ol>
 <li>Go to EasyAdmin -> Start Menu -> Administration -> System & Security -> Authorization -> Add
<img class="wp-image-32468" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-25.png" /></li>
 <li>From the dropdown list select <strong style="font-size: 16px;">[Broker]</strong></li>
 <li>Type in a suitable description:
<img class="wp-image-32469" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26.png" /></li>
 <li>Click <strong style="font-size: 16px;">[Save]</strong></li>
 <li>Make sure you read carefully the “Attention” about the Client Secret and Client ID message then click <strong>[OK]
<img class="wp-image-32470" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-27.png" />
</strong></li>
 <li>In the next prompt, the Client Secret and Client ID will be displayed. These must be imported into the Broker. There are two options to perform this action: either by downloading the JSON file or using the Copy&Paste command. Select the convenient one then go back to the Broker:
<img class="wp-image-32471" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-28.png" /></li>
 <li>Click [<strong style="font-size: 16px;">Import Broker Authorization File</strong><span style="font-size: 16px;">]. Indicate the path where the Authorization File has been downloaded.</span></li>
 <li>After importing the Authorization File, the fields will be automatically populated. The same actions can be done with the Copy&Paste commands. Click<strong> [Next].
<img class="alignnone size-full wp-image-6869" src="https://www.openlm.com/docs/wp-content/uploads/2023/11/Screenshot-2024-07-02-at-19.18.39.png" alt="" width="1877" height="1002" />
</strong></li>
</ol>
 

At this point, the OpenLM Broker installation is complete. Once you click <b>OPENLM USER INTERFACE</b> the EasyAdmin will open. Detailed explanation of the configuration is presented in the <a href="https://www.openlm.com/knowledge-base/openlm-broker-configuration/">OpenLM Broker configuration</a> document.
<h3><a id="post-26523-_vhknmazfc69a"></a><strong><em>B. OpenLM Broker Silent Installation</em></strong></h3>
System administrators who need to deploy multiple installations may find it easier and more efficient to perform a silent installation. This method allows users to install OpenLM Broker with predefined options and no on-screen 'wizard' assistance. The installation will also execute Broker’s autodetect functionality to automatically detect and configure certain license managers (e.g. FLEXlm).

1. Open a command prompt with administrative privileges (see <strong>Figure 9</strong>). The command prompt can be run in several ways:
<ul>
 <li>Type <strong>cmd</strong> in the taskbar search field and press<strong> [ENTER]</strong>. Right-click "Command Prompt" in the results list and choose "Run as administrator" from the popup menu.</li>
 <li>Launch EXE directly by right-clicking (e.g., from C:WindowsSystem32cmd.exe) and choosing "Run as administrator" from the popup window.</li>
 <li>Open Windows PowerShell from the Start Menu. Right-click on Start then choose Windows PowerShell (Admin). This will open Windows PowerShell in administration mode.</li>
</ul>
<img class="wp-image-32473" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-30.png" />

<strong>Figure 10: Command Prompt screen opened with Administrator role.</strong>

2. Launch msiexec with the required parameters for installation in the command prompt using the following format:

msiexec /i "<full Broker MSI file path>" /qn TRANSFORMS=":I01" MSINEWINSTANCE="1" <parameters>

The TRANSFORMS and MSINEWINSTANCE flags indicate the instance ID of the installation. Change the number if installing additional instances of Broker (e.g. ":I02" and “2” if it’s a second installation on the same machine and so on).

The following parameters are available:
<ul>
 <li><strong>INSTALLLOCATION</strong> - specifies the installation folder. Use if you want to change from the default one. If the folder does not exist, it will be created. If this parameter is omitted, the default installation folder will be used (e.g., C:Program Files (x86)OpenLMOpenLM Broker)</li>
 <li><strong>OPENLMLOCATION</strong> - specify the default OpenLM SLM connection that the Broker will connect to. Use the PORT@IP format (e.g. 5015@10.0.0.201)</li>
 <li><strong>BROKERXML</strong> - specify a Broker.xml file to be copied in the Broker folder and used as the default configuration file</li>
</ul>
E.g. the command for a silent installation using a custom installation folder, a default OpenLM SLM connection at 10.0.0.201@5015 with an imported Broker.xml file would look like the following:

msiexec /i "C:UsersmariagDesktopOpenLM_Broker_22.3.30.1312.msi" /qn TRANSFORMS=":I01" MSINEWINSTANCE="1" USE_OPENLM_JAVA="true" /l*v "C:UsersmariagDesktoplog.txt"

3. After entering the installation command, press <strong>[Enter]</strong> to launch the installation. The command prompt will advance to a new line and installation will be completed in the background.

4. Close the command prompt.

As this is a silent installation, no additional user input is required. Older OpenLM Broker versions will be upgraded if an earlier version is found in the installation folder.
<h2><a id="post-26523-_2xz46yhx6x16"></a><strong>Installation of Two or More OpenLM Broker Instances</strong></h2>
It’s possible to install two or more instances of OpenLM Broker. This deployment requires the following:
<ul>
 <li>Each new installation of OpenLM Broker should be configured to connect to a different OpenLM SLM.</li>
 <li>Each new installation of OpenLM Broker must be installed on the same license server machine as the production installation of OpenLM Broker.</li>
</ul>
The following series of steps assumes that one instance of Broker is already installed on the targeted license server. Use the following steps to install additional instances of OpenLM Broker.

1. Double-click the installer file to initiate installation. The wizard welcome screen will appear. Previous installation(s) will be detected and the default will be set according to what installations are located. If an older instance is detected the default will be set to Upgrade Instance(s) (see <strong>Figure 11</strong>). If all existing instances are current, the screen will check by default Install New Instance (see <strong>Figure 12</strong>). The correct option for parallel installation is Install New Instance.

<strong>Figure 11: Wizard screen with Upgrade Instances checked</strong>.

<img class="wp-image-32474" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-31.png" />

<strong>Figure 12: OpenLM Broker wizard setup screen.</strong>

2. Click<strong> [Next] </strong>to continue with the installation. The License Agreement screen will appear (see <strong>Figure 13</strong>).

<img class="wp-image-32475" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-32.png" />

<strong>Figure 13: License agreement screen.</strong>

3. Click the "<strong>I Agree</strong>" radio button (see <strong>Figure 14</strong>). Clicking the radio button will enable the [<strong>Next</strong>] button.

<img class="wp-image-32476" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-33.png" />

<strong>Figure 14: License agreement with "I Agree" checked.</strong>

4. Click <strong>[Next]</strong>. <strong>Select Installation Folder</strong> screen will appear with the default installation path and automatically will add a digit to the Broker folder name (see <strong>Figure 15</strong>).

<img class="wp-image-32477" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-34.png" />

<strong>Figure 15: Select Installation Folder screen with installation path. </strong>

5.<em> [Optional] </em>Click <strong>[Browse]</strong> button to select a different installation path. The default path is recommended.

6. Click <strong>[Next]</strong> button. Confirm Installation screen will appear (see <strong>Figure 16</strong>).

<img class="wp-image-32478" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-35.png" />

<strong>Figure 16: Confirm Installation screen.</strong>

7. Click <strong>[Next]</strong> to continue with the installation. An installation progress screen will appear (see <strong>Figure 17</strong>). The installation will continue until completion. Success screen (see <strong>Figure 18</strong>) will appear at the end of a successful installation.

<img class="wp-image-32479" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-36.png" />

<strong>Figure 17: Installation progress screen.</strong>

<strong><img class="wp-image-32480" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-37.png" /></strong>

<strong>Figure 18: Installation success screen.</strong>

8. Click <strong>[Close]</strong> to exit the installer.

9. Repeat <strong>Step #8</strong> to <strong>Step #9</strong> to install additional instances of Broker.

The parallel installation is complete.
<h2><a id="post-26523-_qqwk7oc7lc9l"></a><strong>Uninstalling OpenLM Broker</strong></h2>
Uninstalling the OpenLM Broker component can be initiated through the Windows Control panel (Option A), by launching OpenLM Broker Setup Wizard and choosing the option to modify OpenLM Broker (Option B), or by doing a silent uninstall via the Windows Shell.
<h3><a id="post-26523-_a62w07akkmtz"></a><strong><em>Option A: Uninstall Using Windows Control Panel</em></strong></h3>
1. Open the Windows Control Panel.

2. Locate and click the "<strong>Uninstall a Program</strong>" option under Programs highlighted in <strong>Figure 19</strong>. Programs and Features screen will appear.

<img class="wp-image-32481" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-38.png" />

<strong>Figure 19: Windows Control Panel with Programs link highlighted.</strong>

3. Locate and click on OpenLM Broker in the list of names (click on Name to sort the list alphabetically). Action options for the program will appear at the top of the list (see <strong>Figure 20</strong>).

<img class="wp-image-32482" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-39.png" />

<strong>Figure 20: Programs and Features screen with the options highlighted.</strong>

4. Click on <strong>Uninstall</strong>. This will open a confirmation screen (see <strong>Figure 21</strong>).

<img class="wp-image-32483" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-40.png" />

<strong>Figure 21: Uninstall confirmation screen.</strong>

5. Click<strong> [Yes] </strong>to confirm uninstall. A progress screen will appear (see <strong>Figure 22</strong>). The progress screen will close when the process is complete.

<img class="wp-image-32484" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-41.png" />

<strong>Figure 22: OpenLM Agent uninstall progress screen.</strong>

6. Close the Programs and Features screen by clicking <strong>[x]</strong> in the upper right part of the window to close the Control Panel.

At this point the uninstall via the Control Panel Programs and Features function is complete. Uninstalling will leave configuration files for OpenLM Broker intact and they must be deleted manually. They are left so that OpenLM Broker can be reinstalled without losing previous configurations. They can be found by default in C:Program Files (x86)OpenLMOpenLM Broker (#).
<h3><a id="post-26523-_cs87557l4erh"></a><strong><em>Option B: Uninstall Using the OpenLM Installer Package</em></strong></h3>
1. Locate the installer file and double-click it. OpenLM Broker Setup Wizard screen will appear (see <strong>Figure 23</strong>). "Install New Instance" is selected by default.

<img class="wp-image-32485" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-42.png" />

<strong>Figure 23: OpenLM Broker Setup Wizard screen.</strong>

2. Click <strong>Modify Instance(s)</strong> checkbox to select the option for removing the installation (see <strong>Figure 24</strong>).

3. Click <strong>[Next]</strong> button to advance to the Select Instance screen (see Figure 25).

<img class="wp-image-32486" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-43.png" />

<strong>Figure 24: Select Instance screen.</strong>

4. Choose the instance by clicking on it in the list (if there is only one it will be highlighted already).

5. Click the <strong>[Remove]</strong> button.

6. A progress screen will appear
<img class="wp-image-32487" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-44.png" />

<strong>Figure 25: Removed OpenLM Broker progress screen.</strong>

7. If any processes linked to OpenLM Broker are still running, an error screen will appear with information on the process(es) involved. These processes can be stopped using Windows Services (e.g., execute C:WINDOWSsystem32services.msc or type "Services" in the Windows search on the taskbar and choose Services App from the result), and removal can be continued by clicking <strong>[Try Again]</strong> (see Figure 27). When removal is complete, the removal success screen will appear (see Figure 28).

<strong><img class="wp-image-32488" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-45.png" /></strong>

<strong>Figure 26: Removal success screen.</strong>

8. Click <strong>[Close]</strong> button to exit the Setup Wizard.

At this point the removal process using the OpenLM Broker Installer wizard is complete. Uninstalling will leave configuration files for OpenLM Broker intact and these must be deleted manually. They are left so that OpenLM Broker can be reinstalled without losing previous configurations. They can be found by default in C:Program Files (x86)OpenLMOpenLM Broker (#).
<h3><a id="post-26523-_pu4ykb53qofg"></a><strong><em>Option C: OpenLM Broker Silent Uninstallation</em></strong></h3>
System administrators who would like to uninstall silently can do so with the following method.

1. Open a command prompt with administrative privileges (see <strong>Figure 28</strong>). The command prompt must be run as an administrator. Instructions for eliciting the command prompt can be found in section "B. OpenLM Broker Silent Installation" under the OpenLM Broker Installation heading.

<img class="wp-image-32489" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-46.png" />

<strong>Figure 28: Command Prompt screen opened in the Administrator role.</strong>

2. At the command prompt, enter the desired parameters for the uninstall. This will be in the format as follows:

msiexec /x "<msi installation file path>" /qn TRANSFORMS=":I##"

The MSI file path is the location of the MSI file downloaded for the installation. A simple uninstall might look like the following (includes the 'TRANSFORMS' parameter which refers to the number of the instance [:I##] to be uninstalled):

msiexec /x "C:UsersmariagDesktopOpenLM_Broker_22.3.30.1312.msi" /qn TRANSFORMS=":I01"

3. After entering the installation command, press<strong> [Enter]</strong> to launch the installation. The command prompt will advance to a new line and the installation will complete in the background.

4. Close the command prompt by clicking the<strong> [x]</strong> in the upper right of the window.

As this is a silent uninstall, there is no additional user input. Uninstalling will leave the configuration files for OpenLM Broker intact and these must be deleted manually. They are left so that the OpenLM Broker can be reinstalled without losing previous configurations. They can be found by default in C:Program FilesOpenLMOpenLM Broker (#).
