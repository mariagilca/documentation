---
title: "Applications Manager installation on Linux"
description: OpenLM Applications Manager is a Java application that monitors and controls the use of any software in the organization regardless of the licensing.
sidebar_position: 3
---

OpenLM Applications Manager is a Java application that monitors and controls the use of any software in the organization regardless of the licensing scheme in effect. This document details the steps for configuring the OpenLM Applications Manager.

The main features of the Applications Manager are as follows:

- Obtains information from the OpenLM Agent regarding active processes and software launches on the end-user workstation
- Allows OpenLM Agents to launch software according to specific rules and configurations

The Applications Manager interacts with the OpenLM Agent which is a lightweight component that is installed on the end-user's workstation. It has the following features:

- Monitors processes that are running on the workstation
- Intercepts and reports software launch events
- Intervenes in the execution of specific processes on the workstation by running actions as defined by an administrator

The Applications Manager also adds management capabilities to applications that are not managed by a license manager or in cases where the license manager lacks advanced management capabilities.

In situations where workstation licenses cannot be managed directly by a license manager (for example, single licenses or named licenses), the OpenLM Applications Manager provides the ability to monitor software usage. This permits OpenLM to simultaneously monitor software controlled by a license manager along with software that supports stand-alone licenses.

## Installing Applications Manager

1. Obtain the distribution package from the [download](https://www.openlm.com/download/) page (tar.gz).
2. Unzip the package in Linux Console:

```
sudo tar -zxvf <Tar.Gz PackageFile>
```

### Upgrade

Stop the running service and backup settings.sh, then remove the installation folder. Overwrite the installed setting.sh with backup.

### Uninstall

Stop the running service and remove the installation folder.  
![Screenshot: Uninstall](/img/legacy/word-image-41960-1.png)

3. Change directory to the installation folder.

![Screenshot 2: Uninstall](/img/legacy/word-image-41960-2.png)

4. Set JAVA\_HOME path in settings.sh

![Screenshot 3: Uninstall](/img/legacy/word-image-41960-3.png)

5. Install Applications Manager

```
sudo ./app_manager.sh install

sudo ./appmanager.sh uninstall
```

6. In case of you are using Identity Service Security Mode, you need to import  
Authorization json file. Change permission of folder if necessary.

```
sudo chmod 777 <FolderName>
sudo ./auth_tool.sh applications-manager-authorization.json
```

7. In case that #6 importing doesn't add Client ID and Secret Key in openlm-app-manager.properties, add them manually in the file.

![Screenshot 4: Uninstall](/img/legacy/word-image-41960-4.png)

![Screenshot 5: Uninstall](/img/legacy/word-image-41960-5.png)

8. Restart Applications Manager Service.

```
sudo ./app_manager.sh start
sudo ./app_manager.sh stop
sudo ./app_manager.sh restart
```
