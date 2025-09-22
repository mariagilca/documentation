---
title: OpenLM Broker Web UI
sidebar_position: 1
description: Overview of the OpenLM Broker Web UI for configuration, monitoring, and management.
---


OpenLM Broker version 21.11 and above includes a **Browser UI** that allows for remote control and configuration from other machines on the same network. This is particularly useful for managing multiple Brokers or accessing them on Linux machines.

***

### Security Concerns 🔒

The Broker's Web UI uses port **5090**. You can manage this port's state and secure access using a token.

* The default port can be changed in the `broker.xml` file.
* The UI can be turned off in the browser, which also disables the port in the `broker.xml` file.
* To re-enable the UI, you can manually change the port setting back in the `broker.xml` file.

***

### Remote Login Process 🔑

To access the Web UI from a remote machine, you'll need to generate an **access token**.

* To get a token, you must be logged into the Broker system.
* The token can be retrieved via a URL or command-line tools.
    * **URL:** `http://localhost:5090/api/new-token`
    * **Linux:** `ssh server_name wget -O - http://localhost:5090/api/new-token`
    * **Windows:** `winrs -r:server_name powershell -command "(Invoke-WebRequest -Uri http://localhost:5090/api/new-token -Method GET).Content"`
* The token is valid for 30 minutes and expires if the Broker Service restarts.

***

### Basic Functionality ⚙️

The Browser UI simplifies several configuration tasks.

#### Adding the OpenLM Server
1.  Go to the **OpenLM Servers** tab and click **Add Server**.
2.  Select the connection type (**On-premise** or **OpenLM Cloud**).
3.  Enter the hostname of the OpenLM Server. If using the Identity Service, you'll need to generate and import the authorization file.
4.  Click **Save**.

#### Adding a License Manager
1.  In the **License Managers** screen, click **Add License Manager**.
2.  Select the type and enter the port.
3.  Add information for the license file, commands (including the path to the executable), vendor, and log file.
4.  Click **Confirm** and then **Save**.

***

### Switching Instances 🔄

If you have multiple Broker instances on the same machine, you can switch between them in the UI. You can also switch by typing the URL with the specific port number (e.g., `localhost:5090` or `localhost:5091`).

***

### Limitations 🚧

The Browser UI does not support the following functions from the traditional Broker Configuration tool:
* Broker Restart
* License File Sorting
* File Browsing functionality