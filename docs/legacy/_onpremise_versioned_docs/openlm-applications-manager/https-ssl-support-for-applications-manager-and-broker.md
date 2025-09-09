---
title: "HTTPS/SSL support for Applications Manager and Broker"
date: "2023-11-04T22:49:43"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/https-ssl-support-for-applications-manager-and-broker6609-2/"
posttype: "manual_documentation"
id: "6609"
---

<h2><span style="font-weight: 400;">Introduction</span></h2>
<span style="font-weight: 400;">Enhanced security for sensitive data transfer can be enabled by properly configuring Applications Manager and associated components to use </span><span style="font-weight: 400;">Secure Sockets Layer (SSL) with HTTPS protocol</span><span style="font-weight: 400;">. The purpose of this document is to present basic configuration options for using HTTPS/SSL in Applications Manager network communication.</span>

<span style="font-weight: 400;">It is assumed that a certificate will be purchased from a trusted certificate authority. Options for creating a self-signed certificate are not covered in this document. </span>
<h2><span style="font-weight: 400;">Applications Manager configuration</span></h2>
<span style="font-weight: 400;">To configure Applications Manager with HTTPS/SSL follow these steps:</span>
<h3><span style="font-weight: 400;">Adding certificate chain to keystore</span></h3>
<span style="font-weight: 400;">Configure Applications Manager to use the JKS (Java Key Storage) file as the keystore (repository for security certificates). Certificate files may need to be converted to JKS with synchronized passwords (matching for file and certificate) and the Applications Manager needs to be configured to use the Keystore. The source file has to include the entire chain of certificates from a trusted certificate authority that produced the certificate, not just the one that the user got for a hostname. The "OpenSSL" tool can also be used to produce the required file. The process includes the following: </span>
<ol>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Purchase a Certificate File (from a trusted certificate authority). </span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Convert the Certificate File to JKS format. </span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Synchronize certificate and JKS passwords.</span></li>
</ol>
 
<h3><span style="font-weight: 400;">Configuring Applications Manager to use Keystore</span></h3>
<span style="font-weight: 400;">RunC:\Program Files\OpenLM\OpenLM Applications Manager\bin\OpenLM Applications Manager.exe</span><span style="font-weight: 400;"> and go to Java tab:</span>

<span style="font-weight: 400;">All parameters in Java tab are pre-configured by the installer except for SSL: </span>

<b><i>-Djavax.net.ssl.keyStore=<path to the JKS file> </i></b>

<b><i>-Djavax.net.ssl.keyStorePassword=<password></i></b>

<span style="font-weight: 400;">Nothing else is required if Server uses valid SSL certificates signed with a trusted authority.</span>

<span style="font-weight: 400;">In case of a self-signed certificate it has to be added to Java trust store.</span>

 
<h3><span style="font-weight: 400;">Updating Applications Manager properties file</span></h3>
Several parameters need to be updated in <em><strong>openlm-app-manager.properties</strong> </em>file which is used to configure Applications Manager. HTTPS/SSL needs to be enabled using properties and <strong>binding.host</strong> parameters. A secure connection between Applications Manager and OpenLM SLM is established with <strong>openlm.server.protocol</strong> parameter.

1. Locate <em>openlm-app-manager.properties</em> file (e.g., <span style="font-weight: 400;">C:\Program Files\OpenLM\OpenLM Applications Manager</span>) and open it in a text editor (e.g., Notepad).

2. Locate <strong>binding.host</strong> parameter and change it to actual host name or IP address (see Figure 1).

<img src="https://www.openlm.com/wp-content/uploads/2018/10/app-manager-ssl-003.png" />

<b>Figure 1: Changing Protocol parameter to "https."</b>

3. <span style="font-weight: 400;">Change the protocol parameter to "https" (see </span><b>Figure 2</b><span style="font-weight: 400;">).</span>

<img src="https://www.openlm.com/wp-content/uploads/2018/10/app-manager-ssl-004.png" />

<b>Figure 2: Changing Protocol parameter to "https."</b>

<span style="font-weight: 400;">4. If your OpenLM SLM is running with SSL, change </span><b>openlm.server.protocol</b><span style="font-weight: 400;"> parameter to "</span><b>http</b><b>s</b><span style="font-weight: 400;">" (see </span><b>Figure 3</b><span style="font-weight: 400;">).</span>

<img src="https://www.openlm.com/wp-content/uploads/2018/10/app-manager-ssl-005.png" />

<b>Figure4: Changing Protocol parameter to "https."</b>

<span style="font-weight: 400;">5. Save </span><b>openlm-app-manager.properties</b><span style="font-weight: 400;"> file.</span>

<span style="font-weight: 400;">6. Restart the Applications Manager to activate the changes.</span>

 
<h2><span style="font-weight: 400;">Securing Applications Manager Web Services</span></h2>
 
<h3><span style="font-weight: 400;">Broker Configuration</span></h3>
<span style="font-weight: 400;">When Applications Manager is bound to a host name (as opposed to 'localhost') and SSL is enabled for Agent, host name and secure parameters have to be added to OpenLM Broker configurations in </span><span style="font-weight: 400;">OpenLM Broker Configurations Tool</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">lmstat.bat</span><span style="font-weight: 400;"> file (lmstat.sh for Linux/Unix).</span>

 
<h3><span style="font-weight: 400;">Modifying lmstat.bat file</span></h3>
 

<span style="font-weight: 400;">1. Locate </span><b>lmstat.bat</b><span style="font-weight: 400;"> file in OpenLM Applications Manager folder (e.g., C:\Program Files\OpenLM\OpenLM Applications Manager\lmstat.bat</span><span style="font-weight: 400;">).</span>

<span style="font-weight: 400;">2. Open </span><b>lmstat.bat </b><span style="font-weight: 400;">file in any text editor (e.g., Notepad). </span>

<span style="font-weight: 400;">3. Locate </span><b>set host</b><span style="font-weight: 400;"> parameter and change its value to correct HostName IP for your system (see </span><b>Figure 9</b><span style="font-weight: 400;">).</span>

<img src="https://www.openlm.com/wp-content/uploads/2018/10/app-manager-ssl-010.png" />

<b>Figure 5: Locating and changing </b><b><i>set host</i></b><b> parameter. </b>

4. <i><span style="font-weight: 400;">[Optional] </span></i><span style="font-weight: 400;">Locate </span><b>call</b><span style="font-weight: 400;"> parameter and add </span><b>-k</b><span style="font-weight: 400;"> to call string if accepting self-signed certificates (see </span><b>Figure 10</b><span style="font-weight: 400;">).</span>

<img src="https://www.openlm.com/wp-content/uploads/2018/10/app-manager-ssl-011.png" />

<b>Figure 5: Locating and changing call string parameter. </b>

<span style="font-weight: 400;">5. Locate and change </span><b>http</b><span style="font-weight: 400;"> parameter to </span><b>https</b><span style="font-weight: 400;">.</span>

<img src="https://www.openlm.com/wp-content/uploads/2018/10/app-manager-ssl-012.png" />

<b>Figure 6: Locating and changing http parameter to https.</b>

6. <b>Save and close</b><span style="font-weight: 400;"> lmstat.bat file.</span>

 
<h3><span style="font-weight: 400;">OpenLM Broker  </span></h3>
<span style="font-weight: 400;">1. Run OpenLM Broker  (</span><b>[Start] > [OpenLM] > [OpenLM Broker ])</b><span style="font-weight: 400;">. OpenLM Broker will open. </span>

<span style="font-weight: 400;">2. Check the Host Name IP for License Servers. It should match the binding host (e.g., it should not be 'localhost').  If the value needs to be changed, click on the localhost node and enter the Host Name IP in the field.</span>

3. <span style="font-weight: 400;">Click the </span><b>[Apply] </b><span style="font-weight: 400;">button to commit changes.</span>

<span style="font-weight: 400;">4. Click the </span><b>Commands</b><span style="font-weight: 400;"> node for Applications Manager (e.g., Commands under Port 27080).</span>

<span style="font-weight: 400;">5. Click the </span><b>[Update]</b><span style="font-weight: 400;"> button on the Commands panel.</span>

<span style="font-weight: 400;">6. Click on the </span><b>data_inquery</b><span style="font-weight: 400;"> node to be sure that the Command Line has been updated successfully. Click the </span><b>Execute </b><span style="font-weight: 400;">button to make sure that it works. <server_status="ok"> message will be displayed. </span>
