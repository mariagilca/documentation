---
title: "Applications Manager Installation on Linux"
date: "2023-11-04T22:41:33"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/applications-manager-installation-on-linux/"
posttype: "manual_documentation"
id: "6606"
---

OpenLM Applications Manager is a Java application that monitors and controls the use of any software in the organization regardless of the licensing scheme in effect. This document details the steps for configuring the OpenLM Applications Manager.

The main features of the Applications Manager are as follows:
<ul>
 <li>Obtains information from the OpenLM Agent regarding active processes and software launches on the end-user workstation</li>
 <li>Enables OpenLM Agents to launch software according to specific rules and configurations</li>
</ul>
The Applications Manager interacts with the OpenLM Agent which is a lightweight component that is installed on the end-user’s workstation. It has the following features:
<ul>
 <li>Monitors processes that are running on the workstation</li>
 <li>Intercepts and reports software launch events</li>
 <li>Intervenes in the execution of specific processes on the workstation by running actions as defined by an administrator</li>
</ul>
The Applications Manager also adds management capabilities to applications that are not managed by a license manager or in cases where the license manager lacks advanced management capabilities.

In situations where workstation licenses cannot be managed directly by a license manager (e.g., single licenses or named licenses), the OpenLM Applications Manager provides the ability to monitor software usage. This permits OpenLM to simultaneously monitor software controlled by a license manager along with software that supports stand-alone licenses.
<h2><a id="post-41960-_rn9dzgt9ipfp"></a>Installing Applications Manager</h2>
<ol>
 <li>Obtain the distribution package from the <a href="https://www.openlm.com/download/">download</a> page (tar.gz).</li>
 <li>Unzip the package in Linux Console:</li>
</ol>
<pre>sudo tar -zxvf <Tar.Gz PackageFile></pre>
<h3>Upgrade</h3>
Stop the running service and backup settings.sh, then remove the installation folder. Overwrite the installed setting.sh with backup.
<h3>Uninstall</h3>
Stop the running service and remove the installation folder.
<img class="wp-image-41961" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41960-1.png" />

3. Change directory to the installation folder.

<img class="wp-image-41962" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41960-2.png" />

4. Set JAVA_HOME path in settings.sh

<img class="wp-image-41963" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41960-3.png" />

5. Install Applications Manager
<pre>sudo ./app_manager.sh install

sudo ./appmanager.sh uninstall</pre>
6. In case of you are using Identity Service Security Mode, you need to import
Authorization json file. Change permission of folder if necessary.
<pre>sudo chmod 777 <FolderName>
sudo ./auth_tool.sh applications-manager-authorization.json</pre>
7. In case that #6 importing doesn’t add Client ID and Secret Key in openlm-app-manager.properties, add them manually in the file.

<img class="wp-image-41964" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41960-4.png" />

<img class="wp-image-41965" src="https://www.openlm.com/wp-content/uploads/2022/07/word-image-41960-5.png" />

8. Restart Applications Manager Service.
<pre>sudo ./app_manager.sh start
sudo ./app_manager.sh stop
sudo ./app_manager.sh restart</pre>
 
