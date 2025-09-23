---
title: "Monitoring the SlickEdit license manager with OpenLM"
sidebar_label: "Monitoring the SlickEdit license manager with OpenLM"
---

<!-- Source: https://www.openlm.com/knowledge-base/interfacing-the-slickedit-license-manager-kb4001o/ -->

* Monitoring the SlickEdit license manager with OpenLM

# Monitoring the SlickEdit license manager with OpenLM

Table of contents 

* [Scope](#post-42302-_jwqprrtshj14)
* [OpenLM Server Direct Method](#1-toc-title)
* [Monitoring with Broker](#2-toc-title)
* [Verifying the SlickEdit configuration](#3-toc-title)

## Scope [#](#post-42302-_jwqprrtshj14)

[SlickEdit is a popular cross-platform](http://www.slickedit.com/), multi-language source code and text editor. It provides various coding tools and time-saving programming features. SlickEdit 2014 facilitates coding in over 40 languages on 9 different platforms.

Usage of the SlickEdit editor is licensed and managed by a proprietary license manager. This application note elaborates on the steps required to configure OpenLM to monitor with the SlickEdit license manager, monitor license usage and obtain license usage statistics.

There are two options to query the License Server:

1. Directly query the license server from the OpenLM Server.

2. Query the license server locally by the OpenLM Broker and propagate the information back to the OpenLM Server.

## OpenLM Server Direct Method [#](#1-toc-title)

### Enabling the OpenLM Server to work with SlickEdit

In order to configure OpenLM to work with SlickEdit, follow this procedure:

1. Download and install the OpenLM Server.
2. Open EasyAdmin (Browser UI).
3. EasyAdmin → Start → Administration →License Manager Servers
4. Select the LM Tools tab. Choose SlickEdit.
5. Either copy or install the SlickEdit **selicutil.exe** executable file to "C:\Program Files\OpenLM\OpenLM Server\LM".
6. Type in the full path of the executable file, i.e.: "C:\Program Files \OpenLM\OpenLM Server\LM\**selicutil.exe**" in the "SlickEdit executable file" text box, click the ‘**Apply**'.
7. Restart OpenLM Server Service in Windows Service.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20802%20410'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42302-1.png)

### Adding a new SlickEdit server

1. EasyAdmin→Start →Administration -→License Manager Servers
2. Select the LM Servers tab. Add a License Manager.
3. From the **Type** drop-down menu, select **SlickEdit**
4. Type in a descriptive text in the **Display Name** field (e.g. "SlickEdit license server")
5. Set the Timezone to where the License Server physically resides
6. Submit an appropriate **Hostname** and **Port** number (SlickEdit\_server and 27100 respectively). Note that the default port used is 27100 which must not be used by any other application, and must have clearance through all firewalls.
7. "**Is Triad Configuration**": OpenLM supports multiple server redundancy configurations for several types of license servers (e.g. FlexLM, DSLS, IBM LUM). At the time of writing this article, OpenLM does not yet support multiple server redundancy for SlickEdit. Keep this box unchecked.
8. **Use Broker** unchecked.
9. Click **Save**. Restart OpenLM Server Service in Windows Service.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201280%20795'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42302-2.png)

## Monitoring with Broker [#](#2-toc-title)

### OpenLM Broker configuration for SlickEdit

The OpenLM Broker is an optional, though highly recommended component, that should be installed and configured on the SlickEdit license manager machine. It provides:

* Accurate license statistics
* Facilitates communication between the OpenLM Server and the License manager

1. Download and install the latest OpenLM Broker version. Follow the installation instructions on the [Download Page & Documents](https://www.openlm.com/downloads/)

2. Select the license manager node then click **Add Port in case Auto-Detect couldn't  
detect the SlickEdit**.

3. Configure the OpenLM Broker to monitor the SlickEdit license server (e.g. slickedit\_license\_server) on the license manager's port (e.g. 27100).

4. The vendor name should be set correctly (e.g. "**SlickEdit**")

5. In the ‘‘**Commands**‘ node, fill in the full path to the selicutil executable file, Click **Update** & **Apply**.

6. The SlickEdit commands for ‘**Status**' and "**Data\_inquiry**" should be set as depicted below. Replace `<fullpath>` with the actual path to the selicutil executable file.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20806%20693'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42302-3.png)

7. Click "**Restart Broker**"

8. You can also use Broker Browser UI for configuration.  
https://www.openlm.com/knowledge-base/openlm-broker-webui/

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20867%20793'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42302-4-1.png)

## Verifying the SlickEdit configuration [#](#3-toc-title)

Verify the OpenLM configuration to monitor the SlickEdit license server via the EasyAdmin web application.

* Open the EasyAdmin User Interface.
* Click the link for Pending Approval. Approve the SlickEdit.
* Verify that the configured license manager appears on the list. A green circle node indicates an Up-to-Date connection to a license server.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201168%20204'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42302-5.png) ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201273%20796'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42302-6.png) ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201084%20344'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42302-7.png)
