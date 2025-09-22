---
title: What is EasyCopy?
sidebar_position: 2
description: Overview of EasyCopy and its licensing.
---


The **OpenLM Broker Configuration Tool** is a Java software module that is a crucial part of the OpenLM system. It acts as an intermediary, directly interacting with license manager servers to gather and relay license information to the OpenLM Server (SLM). This document details the configuration process for the Broker, a task that is completed using the OpenLM Broker Configuration Tool.

### Benefits of OpenLM Broker
Using the OpenLM Broker provides several advantages for license monitoring and management, including:
* **Enhanced Data Collection**: Sends queries to license managers to obtain detailed license usage information.
* **Resilient Communication**: Buffers data transmissions to overcome potential network failures, ensuring no data is lost.
* **Comprehensive Monitoring**: Monitors log files for information on license denials, accurate usage, and offline licenses.
* **Remote Management**: Allows for remote maintenance of FlexLM Options files and license files directly from the OpenLM EasyAdmin interface.
* **License Server Control**: Enables remote starting, stopping, and rereading of license servers.

### Configuring OpenLM SLM
The OpenLM SLM is the central hub of the OpenLM system. The first step is to configure the Broker to connect to the SLM.
1.  Open the **OpenLM Broker Configuration Tool**.
2.  Click **OpenLM SLMs** and then the `[+Add OpenLM SLM]` button.
3.  Enter the hostname or IP address and port of your OpenLM SLM. The default port is `7016`.
4.  Optionally, configure buffering and SSL settings.
5.  Click `[Check Connectivity to OpenLM SLM]` to verify the connection.
6.  Click `[Apply]` to save the configuration and `[Restart Broker]` to apply the changes.

### Adding a License Server
After configuring the connection to the SLM, you can add and configure license servers.
1.  In the configuration tool, click on a server name in the left navigation pane.
2.  Click `[+Add Port]`.
3.  Enter the license server's **Port Number** (default 27000) and select the **License Manager Type** (e.g., FlexLM, RLM).
4.  Click `[Apply]` to save the changes.
5.  **Review Command Paths**: Expand the `Commands` node under the port. Click on each command (e.g., `status`, `data_inquiry`) and click `[Execute]` to verify the path to the license manager's executable. If a path is incorrect, you can update it manually.
6.  Click `[Restart Broker]` to apply the new configurations.

### Detecting Broker Configuration
The `[Detect]` feature simplifies configuration by automatically finding license manager information on the machine. This is useful for new installations or for detecting new license servers without manual input. Clicking `[Detect]` will populate the necessary nodes and commands.

### Reading License Files
OpenLM can read license files to get detailed information, such as license pools and named licenses.
1.  Select a port node and click the `Advanced>>` link.
2.  In the **License Information** section, manually add the path to the license file by checking `[Set Path Manually]` and clicking `[Add]`.
3.  To monitor for changes, check the `[Watch License File]` box and set a `Watch Interval`.
4.  Click `[Apply]` and `[Restart Broker]`.

### Advanced Settings
The **Advanced Settings** panel provides general parameters and debugging tools.
* **Log Levels**: Configure the level of detail for logging (e.g., `DEBUG`, `WARN`, `ERROR`).
* **Reset**: This feature clears all license server and port configurations. It is intended to be used with caution as it erases all manual changes.
* **Record**: A debugging feature used to record Broker activity for a specified duration, often used by OpenLM support to troubleshoot issues.

After any configuration changes, you should always click `[Apply]`, then `[Restart Broker]`, and finally `[Exit]` to ensure the new settings are saved and active.