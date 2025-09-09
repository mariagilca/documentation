---
title: "Installing OpenLM Broker on Unix / Linux"
date: "2023-11-04T21:31:51"
permalink: "https://www.openlm.com/docs/openlm-broker-installation-on-windows/installing-openlm-broker-on-unix-linux/"
posttype: "manual_documentation"
id: "6585"
---

This document describes how to install or upgrade OpenLM Broker on Linux/Unix-based systems for different types of distributions that use both systemd and alternative init systems. The instructions in this guide have been tested on Ubuntu 18.04 LTS, however, they should apply to other distributions as well.

 
<h2>System Requirements</h2>
A working install of JDK must be present on the machine. Consult the <a href="https://www.openlm.com/openlm-system-requirements-2/">system requirements</a> page for the correct version.

 
<h2> Installing Broker</h2>
Depending on your Linux distribution, there are two ways of installing OpenLM Broker:
<ul>
 <li>For systems that use systemd, section 2.2 describes how Broker can be installed as a service</li>
 <li>For systems without systemd, section 2.3 describes how Broker can be started as a background process</li>
</ul>
 
<h3>Preliminary steps</h3>
1. Download the latest version of Broker for Unix/Linux from the OpenLM website downloads section.

2. Extract the archive (OpenLM_Broker_#.#.#.#.tar.gz) to a convenient location.

3. Open the <strong>settings.sh</strong> file in your editor of choice. This file holds all the variables required for Broker to operate. It is mandatory to modify the <strong>JAVA_HOME</strong> variable so that it points to the path of your JDK 11 install.
<blockquote><em>The <strong>JAVA_HOME</strong> path must <strong>not</strong> end with a trailing slash</em>.</blockquote>
Optionally, you can also edit the <strong>BROKERSRVNAMEUSER</strong> variable in case you need to launch the service from an account that is different from “root”. In this case, you must ensure that all the files in the “OpenLM_Broker_X.X.X.X” folder have their ownership reassigned to the new user.

The <strong>BROKERSRVNAME</strong> variable can be changed when you want to install multiple instances of OpenLM Broker in parallel.

Example file:
<pre>#!/usr/bin/env bash

# Edit this file and customize service name in order to install multiple Broker services in parallel

BROKERSRVNAMEUSER="<strong>JohnDoe</strong>"

BROKERSRVNAME="openlm_broker_$BROKERSRVNAMEUSER"

BROKERSRVNAMEFILE="$BROKERSRVNAME.service"

#Change JAVA_HOME to point at installation folder

[[ -z "$JAVA_HOME" ]] && JAVA_HOME=<strong>/usr/lib/jvm/java-11-openjdk-amd64</strong></pre>
4. Save the file and continue following the installation steps below, depending on your Linux distribution.

 
<h3>Installing Broker as a service</h3>
If your Linux version supports systemd, the following steps will install OpenLM Broker as a service which starts automatically on system start up:

1. Install the Broker as a service:
<pre>sudo ./broker.sh install</pre>
2. Test the status of the Broker service:
<pre>sudo ./broker.sh status</pre>
3. Run the Broker detection script as per the instructions described in section 4 of this document (“Configuring Broker with detect.sh”). Alternatively, if your Linux install has a desktop user interface, you can run the GUI Broker Configuration tool with:
<pre>sudo ./broker.sh config</pre>
 
<h3>Running Broker as a background process</h3>
If your Linux version does not support systemd, the following steps will run OpenLM Broker as a background process instead:

1. Run the Broker process with:
<pre>sudo ./broker.sh start</pre>
To open the Broker configuration screen:
<pre>sudo ./run_brokerconfig.sh</pre>
 
<h2>Upgrading an existing Broker installation</h2>
To upgrade an existing installation of OpenLM Broker:
<ol>
 <li>Download the latest version of OpenLM Broker for Unix/Linux from the OpenLM <a href="https://www.openlm.com/download/">Downloads</a> section.</li>
 <li>Remove the current Broker installation
<ul>
 <li>If using systemd, uninstall the current Broker services with:
<pre>./broker.sh uninstall</pre>
</li>
 <li>If you are not using systemd, stop the Broker process:
<pre>./broker.sh stop</pre>
</li>
</ul>
</li>
 <li>Extract the archive (OpenLM_Broker_#.#.#.#.tar.gz) to a convenient location.</li>
 <li>Copy the <strong>broker.xml</strong> and <strong>settings.sh</strong> files from the previous Broker installation folder to the new folder, overwriting if required.</li>
 <li>Install the Broker services for the new version from the new OpenLM_Broker_x.x.x.x folder
<ul>
 <li>If using systemd, install the service:
<pre>./broker.sh install</pre>
</li>
 <li>If not using systemd, start the process:
<pre>./broker.sh start</pre>
</li>
</ul>
</li>
</ol>
 
<blockquote><strong>IMPORTANT</strong>: If your OS does not have systemd, you also need to replace <strong>broker.sh</strong> with the older script from the <strong>broker.sh.tar.gz</strong> archive available inside the main Broker archive.</blockquote>
It’s good practice to verify that the settings and license servers have remained the same in the GUI (if your Linux install has one) by running ./broker.sh config as well as checking that the Broker-monitored license managers are showing up in EasyAdmin’s License Servers window.

 
<h2>Broker.sh commands</h2>
<table>
<tbody>
<tr>
<td><strong>Command name</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td>install</td>
<td>Installs OpenLM Broker as a service using “systemctl enable”</td>
</tr>
<tr>
<td>uninstall</td>
<td>Disables an already installed OpenLM Broker instance from starting as a service</td>
</tr>
<tr>
<td>start</td>
<td>Starts the OpenLM Broker service</td>
</tr>
<tr>
<td>stop</td>
<td>Stops the OpenLM Broker service</td>
</tr>
<tr>
<td>restart</td>
<td>Restarts the OpenLM Broker service</td>
</tr>
<tr>
<td>status</td>
<td>Displays the current status of the OpenLM Broker service</td>
</tr>
<tr>
<td>config</td>
<td>Launches the GUI Broker configuration tool</td>
</tr>
</tbody>
</table>
 

Command format:
<pre>sudo ./broker.sh <command></pre>
 
<h2>Configuring Broker with detect.sh</h2>
The function of this script is to detect and add supported license managers ports to the Broker configuration file.
<blockquote><strong>For proper operation, detect.sh has to be run as root</strong>.</blockquote>
There are a couple of behaviors that this script exhibits:
<ul>
 <li>Running detect.sh when no configuration file exists will create a default configuration file with the license manager ports that have been detected as open on the machine.</li>
 <li>Running detect.sh when a configuration file already exists will merge the two files, adding any missing port information to broker.xml. A copy of the original file is created as “broker.xml.backup”.</li>
</ul>
Command format:
<pre>sudo ./detect.sh <fileName.xml> <On Premise OpenLM SLM IP/Hostname></pre>
<strong>NOTE:</strong> the second parameter is optional and is applicable only when configuring a connection to an on-premise OpenLM SLM.

 
<h3><a id="post-16027-_uqdh1l95u065"></a>Examples</h3>
This command adds the ports from addonports.xml to the main broker.xml file.
<pre>sudo ./detect.sh addonports.xml</pre>
This command adds the ports from the specified XML file along with 10.0.0.12 as a connection to an on-premise OpenLM SLM, with a default setting to port 5015
<pre>sudo ./detect.sh broker.xml 10.0.0.12</pre>
 
<h3>Using detect.sh to import an OpenLM SLMC configuration</h3>
If you want to configure your Broker installation to connect to OpenLM SLMC, you must:
<ul>
 <li>Download the attached broker.xml file that was provided in the initial welcome email when you signed up to OpenLM SLMC</li>
 <li>In case your Broker installation is already configured to actively query one or more license managers, rename the new broker.xml file to avoid overriding the old configuration file (e.g. brokerSaaS.xml)</li>
 <li>Copy the file to the location where you have installed OpenLM Broker</li>
 <li>Run detect.sh:
<pre>sudo ./detect.sh brokerSaaS.xml</pre>
</li>
 <li>Restart the Broker service/process:</li>
</ul>
<pre>    sudo ./broker.sh restart

</pre>
<h2>Importing the TLS Certificate for Java</h2>
<p class="p1">To ensure a secure connection between the OpenLM Broker and the OpenLM Server over HTTPS, follow the steps below to configure Java to trust the server’s TLS certificate.</p>

<ol>
 <li><b><b>Use HTTPS in the OpenLM Server URL
</b></b>
<p class="p1">Ensure that the OpenLM Server URL uses the <span class="s2">https://</span> scheme:</p>

<pre><code>https://<your-openlm-server>:<port></code></pre>
</li>
 <li><b>Check if Java Automatically Imports the Certificate
</b>Some Java distributions automatically import the TLS certificate from the system trust store. Test the connection before proceeding. If the Broker connects successfully, no further action is needed.<b>
</b></li>
 <li><b><b>Troubleshoot SSL Errors
</b></b>
<p class="p3">If you receive SSL-related errors, the issue may be caused by one of the following:</p>

<ul>
 <li>
<p class="p1">Java does not have permission to access the trusted root certificate directory.</p>
</li>
 <li>
<p class="p1">Java is not configured to use the system trust store.</p>
</li>
 <li>
<p class="p1">The certificate must be manually added to the Java KeyStore.</p>
</li>
</ul>
</li>
 <li><b>Import the certificate using </b><b><b>keytool
</b></b>
<p class="p3">If needed, manually import the TLS certificate to the Java KeyStore:</p>

<pre><code>keytool -import -trustcacerts \
  -keystore $JAVA_HOME/lib/security/cacerts \
  -storepass changeit \
  -noprompt \
  -alias mycert \
  -file my-cert.pem</code></pre>
<blockquote><span class="s1"><b>Note:</b></span> Only <span class="s2">.crt</span>, <span class="s2">.cer</span>, or <span class="s2">.pem</span> files are supported. If you have a <span class="s2">.pfx</span> file, convert it to <span class="s2">.crt</span> before importing.</blockquote>
</li>
 <li><b>Restart the Broker</b></li>
</ol>
<p class="p4">After importing the certificate, restart the OpenLM Broker service to apply the changes.</p>

<h2>Alternate configurations</h2>
It is also possible to import a configuration file from a different machine. This can be useful when there is a need to configure specific ports but there is no GUI, and thus the graphical Broker configuration tool cannot be used.

In such cases all that is required is to copy the broker.xml file from an already configured Broker machine and import it with the detect.sh command. If broker.xml already exists on your machine, make sure to rename the copied file:
<pre>sudo ./detect.sh brokerAddon.xml</pre>
