---
title: End-User Services & Workstation Agent Installation Guide
sidebar_position: 1
description: Step-by-step guide for installing OpenLM End-User Services and Workstation Agent.
---


The **OpenLM Workstation Agent** is a lightweight component that runs on end-user machines to provide administrators with valuable license usage data and offer users tools to manage their own license consumption. The **OpenLM Personal Dashboard** is a web-based interface that works with the Agent, giving users a clear view of their license activity. For full functionality, you should install the **End-User Services** component before the **Workstation Agent**.

***

### Installing the Personal Dashboard

The Personal Dashboard is installed through the **End-User Services** component.

#### Wizard Installation

1.  Download and run the installer. Agree to the license and click **Next**.
2.  Choose an installation folder and configure SSL settings if needed.
3.  Enter your **OpenLM SLM address and port** and click **Check Connectivity** to verify the connection.
4.  If you use security, you'll need to generate and download a **JSON authorization file** from **EasyAdmin** (**Start → Administration → System&Security → Authorization**). Import this file or manually enter the credentials into the installation wizard.
5.  Click **Install** and then **Finish**. The **End-User Services** will be installed as a Windows Service.

#### Silent Installation

To perform a silent installation, open a command prompt with administrator privileges and use the `msiexec` command with the appropriate parameters for your setup. For example:

`msiexec /i "path\to\OpenLM.EndUserServices.Setup.msi" SERVER_USE_SSL=true SERVER_ADDRESS=some_address SERVER_PORT=5015 /q`

***

### Installing the Workstation Agent

#### Wizard Installation

1.  Download and run the Agent installer. Agree to the license and click **Next**.
2.  The wizard will automatically detect and check boxes for supported applications. Review and click **Next**.
3.  Choose an installation folder and your operation mode (**Cloud** or **On-Premise**).
4.  Provide the hostnames and ports for **End-User Services** and the main **OpenLM Server**.
5.  If using security, generate and import an authorization file from **EasyAdmin** for the **Agent**.
6.  Click **Install** and then **Finish**. The Personal Dashboard will open automatically.

#### Silent Installation

For a silent installation, open a command prompt as an administrator and use `msiexec` with the relevant parameters for your configuration. For instance, to install with an authorization file:

`msiexec /i "path\to\OpenLM.NewAgent.Setup.msi" AUTHORIZATION_TYPE="1" AUTHORIZATION_FILE_PATH="path\to\agent-authorization.json" /q`

***

### Linux Installation

Both the **End-User Services** and **Agent** can be installed on Linux using DEB, RPM, or TAR.GZ packages.

* **End-User Services**: Use `apt`, `yum`, or the provided installer script for a TAR.GZ package. After installation, edit `/opt/openlmeus/settings.json` to configure the **OpenLM SLM hostname** and port.
* **Workstation Agent**: Install the **End-User Services** first. Use `apt`, `yum`, or the provided installer script. After installation, edit `/opt/openlmagent/settings.json` to specify the hostnames and ports for the **OpenLM SLM**, **End-User Services**, and **Applications Manager**.

In both cases, if security is enabled, you'll need to enable it in the `settings.json` file and replace the authorization JSON file. Remember to restart the services for the changes to take effect.