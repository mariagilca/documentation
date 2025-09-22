---
title: OpenLM Applications Manager Installation Guide
sidebar_position: 1
description: Step-by-step guide to installing the OpenLM Applications Manager.
---


The OpenLM Applications Manager is a Java application that centrally monitors and controls software use by working with the OpenLM Workstation Agent. It helps manage stand-alone and named licenses alongside traditional network licenses. This guide details the installation and configuration of the Applications Manager on both Windows and Unix/Linux systems.

***

### ⚙️ Installation
The Applications Manager requires **Java 11**, a **64-bit OS**, and functioning installations of **OpenLM SLM** and **OpenLM Broker**.

#### Unix/Linux
1.  **Download and extract** the `tar.gz` package.
2.  Open `settings.sh` and set the `JAVA_HOME` variable to your JDK 11 installation path.
3.  For `systemd` systems, install as a service with `sudo ./appmanager.sh install`.
4.  For non-`systemd` systems, run as a background process with `sudo ./run_appmanager.sh`.

#### Windows
1.  **Download and run** the installer.
2.  Follow the wizard: accept the license, choose your Java environment (bundled OpenJDK or an existing installation), select an install path, and provide the **OpenLM SLM hostname** and **port (5015)**.
3.  If using an external JRE, run `OpenLMLicenseManager.exe`, go to the **Java** tab, uncheck "Use default," and browse to your `jvm.dll` file.

***

### 🔑 Authorization
If you're using **Identity Service**, you must generate and import an authorization file.
1.  In **EasyAdmin**, go to **Start → Administration → System & Security → Security → Authorization → ADD**.
2.  Select **Applications Manager**, add a description, and click **Save**.
3.  Download the **JSON file** containing the Client ID and Secret.
4.  Run `auth_tool.bat` in the Applications Manager directory, import the JSON file, and click **Apply**.
5.  Restart the **OpenLM App Manager** service.

***

### 🛠️ Configuration
The Applications Manager must be configured in both the Broker and the Workstation Agent.

#### OpenLM Broker
1.  Open the **OpenLM Broker Configuration Tool**. Go to the **License Managers** tab and click **ADD**.
2.  Click **Detect**. The Broker will automatically find and configure the Applications Manager.
3.  Review the settings (hostname, default port `27080`, log file path) and click **Save**.
4.  In the **EasyAdmin UI**, open the **License Servers** widget, double-click the Applications Manager with a "Pending" status, and click **Approve**.

#### OpenLM Workstation Agent
1.  During or after installation, open the Agent's configuration tool.
2.  Check the **"Use Applications Manager"** box and provide the host and port.
3.  Click **Check Connectivity Status** to verify the connection.
4.  If successful, click **Apply**. If the connection fails, check that the Applications Manager service is running and that your license supports the Applications Manager extension.