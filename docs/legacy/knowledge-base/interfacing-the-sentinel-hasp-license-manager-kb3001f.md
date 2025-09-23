---
title: "Monitoring the Sentinel HASP license manager with OpenLM"
sidebar_label: "Monitoring the Sentinel HASP license manager with OpenLM"
---

<!-- Source: https://www.openlm.com/knowledge-base/interfacing-the-sentinel-hasp-license-manager-kb3001f/ -->

* Monitoring the Sentinel HASP license manager with OpenLM

# Monitoring the Sentinel HASP license manager with OpenLM

Table of contents 

* [Scope](#post-26478-_915pntm1wqd4)
* [Requirements](#post-26478-_ek0vblu0pghp)
* [Monitoring capabilities and features](#post-26478-_7w55uhob2ebv)
* [Interfacing Sentinel HASP using OpenLM Server only](#post-26478-_ri56wk82goa4)
* [Enabling the OpenLM server to work with Sentinel HASP](#post-26478-_rpsiopwhshh9)

## Scope [#](#post-26478-_915pntm1wqd4)

OpenLM supports license monitoring of a wide, and ever-growing variety of [license managers](https://www.openlm.com/license-manager-capabilities/ "license managers").

This document elaborates the steps required to configure OpenLM to interface Sentinel HASP, monitor license usage ,and obtain license statistics. OpenLM only supports HASP versions 5.0 and higher. Versions 4 and lower are not supported.

## Requirements [#](#post-26478-_ek0vblu0pghp)

To query the Sentinel HASP License Manager, the following components must be installed:

1. OpenLM Server installed on a machine in your organization
2. Additionally, OpenLM Broker installed on the same machine as the Sentinel HASP License Manager for more accurate data

## Monitoring capabilities and features [#](#post-26478-_7w55uhob2ebv)

The current monitoring capabilities available for Sentinel HASP through OpenLM Broker are as follows:

* Denials Reporting *Yes*
* Report resolution *By Minute*
* Borrowed License reporting *No*
* Expiration Date reporting *No*
* Multiple Server Redundancy Support *No*
* Token License Support *No*

## Interfacing Sentinel HASP using OpenLM Server only [#](#post-26478-_ri56wk82goa4)

**![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-26478-2.png)**

*Diagram of how OpenLM interfaces with Sentinel HASP using OpenLM Server only*

The first option for interfacing Sentinel HASP is to have OpenLM Server query the license manager server directly. Using this option however ,limits the available data to only license totals and license usage.

### Adding a new Sentinel HASP License manager server

Adding a new Sentinel HASP server directly in OpenLM EasyADmin User Interface

1. Access your OpenLM account..
2. Navigate to **Start**→**Administration**→**License Manager Servers.**
3. In the upper left corner find **LMAdd** and click on it. ADD LICENSE window will open:![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-26478-3.png)
4. Insert a display name in the **Display name** box to help you recognize the license manager.
5. From the **Type** drop-down menu, select **HASP**.**Use Broker toggle** -Switch ON to enable OpenLM Server to work with OpenLM Broker to locally query the license server. (to support this feature install OpenLM Broker on the LM server). When switched OFF, OpenLM Server remotely queries the license manager output file, without Broker involvement. Set the **Time Zone** to where the license server physically resides (e.g. UTC +02:00 Jerusalem).
6. Submit an appropriate **Hostname** and **Port** number.
7. **Enable Triad Configuration** toggle: off.
8. **Use Broker** box: unchecked.
9. **Vendor Name**: the Sentinel Hasp vendor name - any descriptive text to help differentiate by vendor in EasyAdmin User interface reports.
10. Click **Apply** then close the OpenLM Server configuration tool.OpenLM Server should now be ready to query your Sentinel HASP License Manager remotely and present the relevant license information via the EasyAdmin user interface6. Interfacing Sentinel HASP License Manager using OpenLM Server + OpenLM Broker

**![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-26478-4.png)**

*Diagram of how OpenLM interfaces with the Sentinel HASP License Manager using OpenLM Broker*

The second option for interfacing with Sentinel HASP License Manager is to have OpenLM Broker query the license manager server locally. This is done through the Sentinel HASP License Manager command-line utilities and any available **Sentinel HASP License Manager usage log files**. Once this data is queried by Broker, it is sent to OpenLM Server for processing. Using this option gives you full monitoring capabilities over Sentinel HASP License Manager.

Please note that OpenLM Broker must already be [installed](https://www.openlm.com/application-notes-v3-0/installing-openlm-v3-0/broker-comprehensive-installation-guide-an4004b/) and [configured](https://www.openlm.com/knowledge-base/openlm-broker-configuration/) to report to OpenLM Server before proceeding further.

### **OpenLM Broker configuration**

**Manual OpenLM Broker configuration**

1. Click **Add Port**
2. Enter the Sentinel HASP License Manager server port number (e.g. **5093**)
3. Select **Sentinel HASP License Manager** from the "License Manager Type" drop-down menu.
4. Select the **Commands** node. Click **[…]** to the left of "Update path for commands:" and browse to the folder where the Sentinel HASP License Manager command-line utilities are located. Click **Update.**
5. (Windows only) If your Sentinel HASP License Manager install is configured to run using a Windows service, check the **Use Service** box and type in **Sentinel HASP License Manager**
6. Click **Apply**.
7. Select the **data\_inquiry** node under Commands then click **Execute**. Make sure that you see a valid output. Right-click the Log Files node and then click **Add Log File**.
8. Select the newly created **log** node.
9. Select **Other** from the Type drop-down menu.
10. Click **[…]** right to the Path field and browse to the location of the Sentinel HASP License Manager usage log file as you have configured it in section 4.1.
11. Click **Apply**.
12. Click **Restart Broker**.

### **OpenLM Server Configuration**

Once Broker has been configured, it should be sending data to OpenLM Server. The final step in interfacing Sentinel HASP License Manager with OpenLM is to approve the configuration in EasyAdmin User Interface.

**Automatic OpenLM Server configuration via EasyAdmin**

1. Open the EasyAdmin User Interface by accessing **Windows Start** → **OpenLM** → **OpenLM EasyAdmin User Interface**→**Start**→**Widgets**→**License Manager - Servers**.
2. Navigate to the **Servers pending approval** icon and click on it.
3. In the newly opened prompt, double-click on the license manager with Pending Status, (i.e Sentinel HASP License Manager).
4. Give a descriptive name to the added connection (e.g HASP) or leave the default one. Make sure the Enabled toggle button is on. Click **Approve**.

## Enabling the OpenLM server to work with Sentinel HASP [#](#post-26478-_rpsiopwhshh9)

If the OpenLM Server is installed on the same machine as the HASP license server, then no additional setting is required. If OpenLM Server is installed on a different machine than the HASP server, follow these actions:

* Open the Sentinel Hasp Admin Control Center port (default 1947) on firewall.
* In the Configuration tab, under the Basic Settings tab, change the settings of Sentinel Hasp Admin Control Center to check the box to Allow Remote Access to ACC . See the image below for clarification.

![b2](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![b2](/img/legacy/kb/b2.jpeg)
