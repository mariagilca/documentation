---
title: "End-User Services & Workstation Agent Installation guide"
date: "2023-11-05T19:12:06"
permalink: "https://www.openlm.com/docs/end-user-services-workstation-agent-installation-guide/"
posttype: "manual_documentation"
id: "6634"
---

<h2><strong>About End-User Services (Personal Dashboard) and Workstation Agent</strong></h2>
This document covers the OpenLM End User Services and Workstation Agent installation process. The Workstation Agent is a component that can be installed on any number of workstations to enhance the end-user experience and control it. The goal is to allow administrators to obtain additional information regarding license usage on individual workstations which can be used for more effective resource management.

The capabilities include, but are not limited to:
<ul>
 <li>Providing administrators with the capability of monitoring end-user application idle times, and releasing idle licenses as a result.</li>
 <li>Providing end-users with a license availability interface.</li>
 <li>Reporting on IP, project information, and workstation availability.</li>
</ul>
The OpenLM Personal Dashboard is an additional OpenLM interface that comes to educate engineering application users and raise their awareness of the way the licenses in the organization are consumed.

The user will be able to see different information on his or her license usage, get tips to improve consumption habits, and have a benchmark against the average license consumption in his or her default group/of the –organization.

The following is a comprehensive guide on how to install and configure the Personal Dashboard and the Agent.

Please follow the installation order:

1. End-User Services

2.Workstation Agent (Old Name->OpenLM Agent)
<h2><a id="post-33292-_896gjfhzg6i7"></a><strong>Installing the Personal Dashboard</strong></h2>
<ol>
 <li>Obtain the installer from our website: <a href="https://www.openlm.com/download/">https://www.openlm.com/download/</a>. Double-click on it to launch the installation. A welcome screen for the OpenLM End-User Services Installation Wizard will appear. Click <strong>Next.</strong></li>
 <li>Read the license agreement and choose one of the following options (A, B, or C):
A. If you do not want to continue the installation, click Cancel. A confirmation screen will appear with a warning that you will be exiting the installer without completing the installation. Click Yes to exit the installer.B. Click Back to return to the Setup Wizard window.

C. In order to continue with the installation, check the “I Agree” box. This will make the <strong>Next</strong> button active. Click <strong>Next</strong> to advance to the OpenLM Extensions screen (see Figure 4).</li>
 <li> Select a folder you wish to install the OpenLM End-User Services to. Click <strong>Next</strong> to continue with the default path (which is recommended).</li>
 <li>If you want to connect an SSL certificate, check the box, click <strong>Browse </strong>to import the SSL certificate then provide the certificate’s password. If no SSL certificate is used, simply click <strong>Next.
<img class="wp-image-38089" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-application-description-4.png" alt="Graphical user interface, application Description automatically generated" /></strong></li>
 <li>Enter the OpenLM SLM address and port number. If an SSL connection is used, check the box. Also, to assure the input data is correct, click the <strong>Check Connectivity </strong>button. If successful, a pop-up will appear:
<img class="wp-image-38090" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-text-application-chat-1.png" alt="Graphical user interface, text, application, chat or text message Description automatically generated" />
<em>Test connectivity successful</em></li>
 <li>Click <strong>OK </strong>to close the pop-up, then click <strong>Next.
</strong>If any of the input data is wrong, this pop-up will appear:
<em><img class="wp-image-38091" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-application-description-5.png" alt="Graphical user interface, application Description automatically generated" />
<em>Failed connection to the OpenLM SLM</em></em></li>
 <li>The next screen will require you to authorize. If you do not use security, select “<strong>I am not using Security”</strong> and proceed to step 8. Otherwise, follow step 13.</li>
 <li>Open up the EasyAdmin then click on the <strong>Start</strong> →<strong>Administration:</strong></li>
 <li> In the Administration Panel, select <strong>System&Security:</strong></li>
 <li>Click on the <strong>Authorization</strong> tab →<strong>ADD CLIENT. </strong>Then, from the drop-down list select <strong>End-User Services. </strong>Fill in a description and provide the End-User Services URL (for security and authorization purposes, it should be in the following format: protocol://hostmane:port). Click<strong> Save:
<img class="wp-image-38092" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-application-description-6.png" alt="Graphical user interface, application Description automatically generated" /></strong></li>
 <li>In the next step, the authorization file will be generated. Download the JSON file or copy the Client ID and the Secret Key. Go back to the installation, click Next to browse to the downloaded JSON authorization file or input them manually:
<img class="wp-image-38093" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-text-application-email-3.png" alt="Graphical user interface, text, application, email Description automatically generated" /></li>
 <li>Click <strong>Next</strong>.</li>
 <li> All the configuration steps have been passed; now click the <strong>Install </strong>button:
<em>In case you missed any configuration, select the </em><strong><em>Back </em></strong><em>button.
<img class="wp-image-38094" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-text-application-email-4.png" alt="Graphical user interface, text, application, email Description automatically generated" /></em></li>
 <li>When the installation is completed, hit the <strong>Finish </strong>button.

<em><img class="wp-image-38095" src="https://www.openlm.com/wp-content/uploads/2021/10/text-description-automatically-generated-1.png" alt="Text Description automatically generated" />
OpenLM End-User Services has been installed as a Windows Service:
</em></li>
</ol>
 
<h3><a id="post-33292-_lkl0vdiss99u"></a><strong>Silent End User Services installation</strong></h3>
<ol>
 <li>Open a command prompt with administrative privileges. The command prompt can be run in several ways:
A. Type ‘cmd’ in the taskbar search field and press RETURN on the keyboard. Right-click “Command Prompt” in the results list and choose “Run as administrator” from the popup menu.B. Launch the EXE directly by right-clicking and choosing “Run as administrator” from the popup window.

C. Navigate through the Start menu. Right-click on Start then choose Windows PowerShell (Admin). This will open the Windows PowerShell in administration mode.</li>
 <li>At the command prompt, enter the desired parameters for the installation. This will be in the format as follows:</li>
</ol>
<pre>msiexec /i "a path to msi packageOpenLM.EndUserServices.Setup.msi" SERVER_USE_SSL=true SERVER_ADDRESS=some_address SERVER_PORT=5015 EUS_USE_SSL=true SSL_CERTIFICATE_PATH="a path to ssl certificatecertificate.pfx" SSL_CERTIFICATE_PASSWORD=some_password /q</pre>
<strong>Example:</strong> Install End-User Services with a Server address, port, SSL; End-User Services SSL:
<pre>msiexec /i "C:Program FilesOpenLMOpenLM.EndUserServices_dev_xxx.msi" SERVER_USE_SSL=true SERVER_ADDRESS=localhost SERVER_PORT=5015 EUS_USE_SSL=true SSL_CERTIFICATE_PATH="C:Program Filesssl-certificate.pfx" SSL_CERTIFICATE_PASSWORD=SSL123. /q</pre>
<h2><a id="post-33292-_2jvr71n6fsgi"></a>Installing the Agent using Setup Wizard</h2>
<ol>
 <li>Obtain the installer from our website: <a href="https://www.openlm.com/download/">https://www.openlm.com/download/</a>. Double-click on it to launch the installation.</li>
 <li>Read the license agreement and choose one of the following options (A, B, or C):
A. If you do not want to continue the installation, click <strong>Cancel.</strong> A confirmation screen will appear with a warning that you will be exiting the installer without completing the installation. Click <strong>Yes</strong> to exit the installer.B. Click <strong>Back</strong> to return to the Setup Wizard window.

C. Check the “I Agree” box to continue with the installation. This will make the Next button active. Click <strong>Next</strong> to advance to the OpenLM Extensions screen.</li>
 <li>The installer automatically checks for the presence of licensed software packages. If applications from the OpenLM Extensions list on the screen are installed, they will be detected automatically, and checkboxes will be activated and checked by default. Review the options and uncheck only if it is not required to monitor the packages. <strong>Click Next</strong>.</li>
 <li>Click <strong>Next</strong> to see <strong>the Select Installation Folder</strong> screen. This will be populated with a default path for the installation. If you wish to change the path, click the <strong>Change… </strong>button and select a new folder. Click <strong>Next.</strong></li>
 <li>Select the Operation mode: <strong>Cloud </strong>or <strong>On-Premise. </strong>Click<strong> Next.</strong></li>
 <li>If Application Manager is used, check the box, otherwise leave it empty.a If SSL protocol is used, check the box, otherwise leave it empty.

b Provide the Application Manager hostname and port then <strong>Check Connectivity.</strong></li>
 <li> Click <strong>Next.
<img class="wp-image-38096" src="https://www.openlm.com/wp-content/uploads/2021/10/word-image-33292-8.png" /></strong></li>
 <li>Configure End-User Services’ address and port. Check the Use SSL if needed. If the detected by default do not match your needs, make the changes accordingly, then click <strong>Next</strong>:
<img class="wp-image-38097" src="https://www.openlm.com/wp-content/uploads/2021/10/word-image-33292-9.png" /></li>
 <li>In the next prompt, configure the Server’s address and port. Check the <strong>Use SSL if </strong>needed. If the detected by default do not match your needs, make the changes accordingly, then click <strong>Next</strong>:
<img class="wp-image-38098" src="https://www.openlm.com/wp-content/uploads/2021/10/word-image-33292-10.png" /></li>
 <li> The next step is to define the authorization method. In case you do not use the Identity Service, select the <strong>I am not using Security </strong>radio button and proceed to step 12. Otherwise, choose to import or input manually the JSON Authorization file (step 11).
<img class="wp-image-38099" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-text-application-email-5.png" alt="Graphical user interface, text, application, email Description automatically generated" /></li>
 <li>The Identity Service users will open up the <strong>EasyAdmin</strong> → <strong>System&Security</strong>→ <strong>Authorization</strong>→ <strong>ADD</strong>.
From the drop-down list, select <strong>Agent</strong> to generate the Authorization file and import the data.
<img class="wp-image-38100" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-application-description-7.png" alt="Graphical user interface, application Description automatically generated" /></li>
 <li>The configuration is ready, hit the<strong> Install</strong> button.</li>
 <li>Once the installation is completed, hit the <strong>Finish </strong>button.</li>
 <li>When the Agent’s installation is completed, the Personal Dashboard will open up automatically (otherwise, find the icon in the Start Menu). <img class="wp-image-38101" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-text-application-descri.png" alt="Graphical user interface, text, application Description automatically generated" /> <img class="wp-image-38102" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-description-automatically.png" alt="Graphical user interface Description automatically generated" />
There is access to the license repository, with information about the currently consumed licenses, the person using them, what features, idle time, and contact details.
Also <em>Recently closed</em> processes, <em>Project management, and Product licensing level </em>(ArcGIS):
<img class="wp-image-38103" src="https://www.openlm.com/wp-content/uploads/2021/10/graphical-user-interface-text-application-descri-1.png" alt="Graphical user interface, text, application Description automatically generated" /></li>
</ol>
 
<h3>Troubleshooting</h3>
If you  get the following error when trying to install the ArcGIS extension:
<img src="https://dev.azure.com/openlm/5cf556e4-c450-4544-9abc-f7f009c0b615/_apis/wit/attachments/16bb6f7e-eb27-4eb7-b714-18b13d01f3e8?fileName=image.png" alt="Image" />
add the NETFRAMEWORK35="1" param to the command line arguments line when starting the installer, like this:
<pre>msiexec /i "C:\OpenLM.NewAgent.Setup.22.2.1.1912.msi" AUTHORIZATION_TYPE="1" AUTHORIZATION_FILE_PATH="C:\agent-authorization.json" INSTALL_ARCGIS=1 NETFRAMEWORK35="1" /q</pre>
<h2><a id="post-33292-_6pz3nbgg3cyv"></a><strong>Silent Agent installation</strong></h2>
<ol>
 <li>Open a command prompt with administrative privileges. The command prompt can be run in several ways:
A. Type ‘cmd’ in the taskbar search field and press RETURN on the keyboard. Right-click “Command Prompt” in the results list and choose “Run as administrator” from the popup menu.B. Launch the EXE directly by right-clicking and choosing “Run as administrator” from the popup window.

C. Navigate through the Start menu. Right-click on Start then choose Windows PowerShell (Admin). This will open the Windows PowerShell in administration mode.</li>
 <li>At the command prompt, enter the desired parameters for the installation. This will be in the format as follows:</li>
</ol>
<h4><a id="post-33292-_3fzf4i4ecpv6"></a><strong>Install with import authorization:</strong></h4>
<pre>msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" AUTHORIZATION_TYPE="1" AUTHORIZATION_FILE_PATH="a path to security settings json filesetting json file" /q</pre>
<strong>Example:</strong>
<pre>msiexec / i "C:Program FilesOpenLM OpenLM.NewAgent.Setup.22.1.11.1010.msi" AUTHORIZATION_TYPE = "1" AUTHORIZATION_FILE_PATH = "C:Program FilesOpenLM agent-authorization.json" / q</pre>
<h4><a id="post-33292-_e74r3xgskw39"></a><strong>Install without security:</strong></h4>
<pre>msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" AUTHORIZATION_TYPE="3" /q</pre>
<h4><a id="post-33292-_b89dlf30d5cf"></a><strong>Additional parameters:</strong></h4>
<pre>USE_APP_MANAGER=true/false
APP_MANAGER_USE_SSL=true/false
APPMANAGER_ADDRESS=FQDN
APPMANAGER_PORT=27080
ENDUSERS_SERVICES_USE_SSL=true/false
ENDUSERS_SERVICES_ADDRESS=FQDN
ENDUSERS_SERVICES_PORT=53555
SERVER_USE_SSL=true/false
SERVER_ADDRESS=FQDN
SERVER_PORT=5015
INSTALLFOLDER
INSTALL_ARCGIS=”1″
INSTALL_ARCGISPRO="1"
INSTALL_AUTOCAD="1"
INSTALL_MATLAB="1"
INSTALL_SOLIDWORKS="1"
CREATE_AGENT_PROGRAM_MENU_SHORTCUT=false

</pre>
 

 
<h2><a id="post-33292-_t9kzpn3mb0l0"></a>AppManager and SSL connection</h2>
<pre>msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" USE_APP_MANAGER=true APP_MANAGER_USE_SSL=true APPMANAGER_ADDRESS=FQDN APPMANAGER_PORT=27080 /q</pre>
<strong>Example:</strong>
<pre>msiexec /i “C:Program FilesOpenLMOpenLM.NewAgent.Setup.22.1.11.1010.msi” USE_APP_MANAGER=true APP_MANAGER_USE_SSL=true APPMANAGER_ADDRESS=FQDN APPMANAGER_PORT=27080 /q</pre>
<strong>Example:</strong>

<strong>Server Address, port, EUS address, AppManager Address, port, SSL</strong>
<pre>msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" SERVER_ADDRESS=localhost SERVER_PORT=5015 SERVER_USE_SSL=true ENDUSERS_SERVICES_ADDRESS=localhost ENDUSERS_SERVICES_PORT=53555 ENDUSERS_SERVICES_USE_SSL=true USE_APP_MANAGER=true APPMANAGER_ADDRESS=localhost APPMANAGER_PORT=27080 APP_MANAGER_USE_SSL=true INSTALL_ARCGIS="1" INSTALL_AUTOCAD="1" INSTALL_MATLAB="1" /q</pre>
<h2><a id="post-33292-_ty9w668iok4"></a>End-User Services (Personal Dashboard) on Linux</h2>
The End-User Services is delivered as DEB, RPM or .tar.gz packages.

Choose the one you require and follow the instructions below:
<h6><a id="post-33292-_49h77nvbgojb"></a><strong>Installing End-User Services using the .deb package:</strong></h6>
<pre>sudo apt install openlm-eus_xxxx_amd64.deb</pre>
<h6><a id="post-33292-_opb1g1vs71dz"></a><strong>On CentOS, install the End-User Services using the provided .rpm:</strong></h6>
<pre>sudo yum install openlm_eus-xxxxx.x86_64.rpm</pre>
<h6><a id="post-33292-_jfgrajqyto8x"></a><strong>Installation using .tar.gz:</strong></h6>
<strong>Unpack the .tar.gz:</strong>
<pre>mkdir eus
tar -xf openlm_eus_xxxxx.tar.gz -C eus</pre>
<strong>Give execute permission and run the script:</strong>
<pre>cd eus
sudo chmod +x install.sh
sudo ./install.sh</pre>
<h2><a id="post-33292-_8syikyh8iz83"></a><strong>Mandatory steps to perform after any of the installations:</strong></h2>
<strong>Edit End-User Services’ settings. You need to specify your OpenLM SLM hostname and port:</strong>
<pre>sudo nano /opt/openlmeus/settings.json</pre>
<strong>If you are using OpenLM SLM with Identity, security also must be enabled in settings.json.</strong>

Also, you need to replace /opt/openlmeus/end-user-services-authorization.json file with the one you have downloaded in EasyAdmin or edit clientId and clientSecret manually.

<strong>Restart the End-User Services’ service for the changes to take effect and check its status:</strong>
<pre>sudo systemctl restart openlmeus
sudo systemctl status openlmeus</pre>
<h2><a id="post-33292-_phsck9929fal"></a><strong>Installing the Agent on Linux</strong></h2>
<strong>! It is mandatory to install End-User Services first.</strong>

The Agent can be installed using the provided DEB, RPM or .tar.gz packages.
<h6><a id="post-33292-_afg4bli4tccn"></a><strong>Install the Agent using the .deb package:</strong></h6>
<pre>sudo apt install openlm-agent_xxx_amd64.deb</pre>
<h6><a id="post-33292-_9xfyyicphres"></a><strong>On CentOS, install the Agent using the provided .rpm:</strong></h6>
<pre>sudo yum install openlm_agent-xxxx.x86_64.rpm</pre>
<strong>Or install using .tar.gz:</strong>

<strong>Unpack the .tar.gz:</strong>
<pre>mkdir agent
tar -xf openlm_agent_dev_xxxx.tar.gz -C agent</pre>
<strong>Give execute permission and run the script:</strong>
<pre>cd agent
sudo chmod +x install.sh
sudo ./install.sh</pre>
<h2><a id="post-33292-_wljnj14xhjfo"></a><strong>Mandatory steps to perform after any of the installations:</strong></h2>
<strong>Edit Agent’s settings:</strong>
<pre>sudo nano /opt/openlmagent/settings.json</pre>
It is necessary to specify your OpenLM SLM, End-User Services and Applications Manager hostnames and ports.

If you are using OpenLM SLM with Identity: security must be enabled also in settings.json. Also, you need to replace /opt/openlmagent/agent-authorization.json file with the one you have downloaded in EasyAdmin or edit clientId and clientSecret manually.

<strong>Restart the Agent’s service for the changes to take effect and check Agent’s status:</strong>
<pre>systemctl --user restart openlmagent</pre>
<pre>systemctl --user status openlmagent</pre>
