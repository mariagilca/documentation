---
title: Applications Manager Installation on Linux
sidebar_position: 3
description: Step-by-step guide for installing the OpenLM Applications Manager on Linux.
---

The **OpenLM Applications Manager** is a Java application that monitors and controls software use in your organization, regardless of its licensing scheme. It works with the **OpenLM Agent**, a lightweight component installed on end-user workstations.

### Key features

The Applications Manager provides the following key features:

  * **Data Collection**: Obtains information from the OpenLM Agent about active processes and software launches.
  * **Rule-based Launching**: Allows OpenLM Agents to launch software based on specific rules and configurations defined by an administrator.
  * **Extended Management**: Adds management capabilities for applications that aren't controlled by a license manager or for license managers that lack advanced features.
  * **Stand-alone License Monitoring**: Monitors software usage for workstation-based, single, or named licenses.

The OpenLM Agent monitors running processes, intercepts software launch events, and runs administrator-defined actions on end-user workstations.

### Installation

To install the Applications Manager on a Linux machine, you must first obtain the distribution package and then follow these steps:

1.  **Obtain the package**: Get the `tar.gz` distribution package from the OpenLM download page.
2.  **Unzip the package**: In the Linux console, use the command:
    ```
    sudo tar -zxvf <Tar.Gz PackageFile>
    ```

### Upgrade and uninstall

  * **Upgrade**: To upgrade, stop the running service, back up the `settings.sh` file, remove the installation folder, and then overwrite the new `settings.sh` with your backup.
  * **Uninstall**: To uninstall, stop the running service and remove the installation folder.

### Installation steps

After unzipping the package, follow these steps to install the Applications Manager:

1.  **Change directory**: Navigate to the installation folder.
2.  **Set `JAVA_HOME`**: Set the `JAVA_HOME` path in the `settings.sh` file to point to your Java 11 installation.
3.  **Install the service**: Run the following command to install the Applications Manager:
    ```
    sudo ./app_manager.sh install
    ```
4.  **Import authorization**: If you're using **Identity Service Security Mode**, you must import an Authorization JSON file. You may need to change folder permissions first:
    ```
    sudo chmod 777 <FolderName>
    sudo ./auth_tool.sh applications-manager-authorization.json
    ```
5.  **Manual key entry**: If the importing process doesn't automatically add the **Client ID** and **Secret Key**, you'll have to add them manually to the `openlm-app-manager.properties` file.
6.  **Restart service**: Finally, restart the Applications Manager service with one of the following commands:
    ```
    sudo ./app_manager.sh start
    sudo ./app_manager.sh stop
    sudo ./app_manager.sh restart
    ```