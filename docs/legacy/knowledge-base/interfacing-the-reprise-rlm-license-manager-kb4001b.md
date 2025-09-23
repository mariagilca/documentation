---
title: "Monitoring the Reprise RLM license manager with OpenLM"
sidebar_label: "Monitoring the Reprise RLM license manager with OpenLM"
---

<!-- Source: https://www.openlm.com/knowledge-base/interfacing-the-reprise-rlm-license-manager-kb4001b/ -->

* Monitoring the Reprise RLM license manager with OpenLM

# Monitoring the Reprise RLM license manager with OpenLM

Table of contents 

* [Requirements](#post-42307-_27m8jopcx5sv)
* [Monitoring capabilities and features](#post-42307-_uzi9femwip58)
* [Interfacing Reprise License Manager using OpenLM Server only](#post-42307-_eztmvnnpnkeq)
* [Interfacing Reprise License Manager using OpenLM Broker](#post-42307-_x087cogw8tj0)
* [RLM failover configuration](#4-toc-title)
* [How to verify your Reprise License Manager (RLM) configuration](#5-toc-title)

This document describes the steps required to interface OpenLM with the Reprise License Manager (RLM) to monitor license usage and obtain license statistics.

## Requirements [#](#post-42307-_27m8jopcx5sv)

To query the RLM server OpenLM Server must be installed on a machine in your organization.

Installing OpenLM Broker on the RLM License Server is optional but highly recommended to take advantage of additional monitoring and control features.

## Monitoring capabilities and features [#](#post-42307-_uzi9femwip58)

Monitoring capabilities will depend on which method you choose to query the RLM license server:

1. Querying remotely through OpenLM Server gives you only license totals and license usage data.
2. Querying locally through OpenLM Broker gives you the same data as when queried through Server plus additional benefits such as:

* Buffered communication with the OpenLM Server to overcome temporary network failures
* Ability to remotely start/stop the license manager service
* Access to license denial information
* 1-second resolution for license usage reports
* Ability to read Reprise RLM license and log files
* Ability to view RLM license file content in EasyAdmin User Interface

## Interfacing Reprise License Manager using OpenLM Server only [#](#post-42307-_eztmvnnpnkeq)

**![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-1.png)**

*Diagram of how OpenLM interfaces with the Reprise License Manager using OpenLM Server only*

### OpenLM Server configuration

To get the OpenLM Server to query the RLM license server:

1. After installing the OpenLM Server, click **Windows Start** → **OpenLM** → **OpenLM EasyAdmin User Interface.** If accessing from another machine, open a convenient browser and type in the address bar the following: HTTP(s)://fullyQualifiedDomainName:5015. The OpenLM EasyAdmin User Interface will open.
2. Click **Start** → **Administration** → **License Manager Servers.** **![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-2.png)**
3. The License Manager Servers window opens:![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-3.png)
4. Click **Add LM.** The **Add License Manager** window opens.
5. Type in a free text in the **Display name** field. Ex. "RLM". Make sure the **Enabled** toggle is on
6. From the **Type** drop-down list, select **RLM.  
   Use Broker** toggle:
   1. **Off** (Default): The OpenLM Server will query the license manager directly. Keep this unchecked if not using OpenLM Broker.
   2. **On** Usage information is obtained solely by the OpenLM Broker installation on the license manager machine. This configuration will be documented in the section below.

Another parameter: **Enable Triad Configuration** toggle (keep it **off**):  
**Allow server fallback to denied license:** Do not count as denial when granting a license from another server after being denied by this server.

1. Submit an appropriate **Hostname** and **Port** numbers. The RLM default port is *5054* (before RLM version 6, the default port was 9000).
2. Set the **Time Zone** to where the License Server physically resides.
3. Click **SAVE.** **![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-4.png)**

## Interfacing Reprise License Manager using OpenLM Broker [#](#post-42307-_x087cogw8tj0)

**![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-5.png)**

*Diagram of how OpenLM interfaces with the Reprise License Manager using OpenLM Broker*

The OpenLM Broker component should be installed and configured on the same machine where the Reprise License Manager resides. OpenLM Broker reads the RLM server locally through both log and license files and then sends this data back to OpenLM Server.

### Enabling RLM Report Log functionality

By default, the Reprise License Manager does not record report log files. This setting may vary from vendor to vendor, however, it must be enabled for OpenLM Broker to provide additional monitoring benefits.

Instructions on how to enable report log functionality for your version of RLM can be found [here](http://www.reprisesoftware.com/blog/2011/03/how-to-produce-rlm-report-logs/) or in the RLM manual ([PDF link](http://www.reprisesoftware.com/RLM_License_Administration.pdf)) under **The ISV Options File** chapter, specifically, the REPORTLOG option. Please note that the **std** argument should also be specified.

Once report log functionality is enabled, it is important to locate the correct log file. The exact location will be specified in the ISV options file. Usually, the file extension is **.txt** and the first 6 lines of the file will contain "RLM Report Log Format":

```
RLM Report Log Format 0, version 11.0, authenticated
ISV: ssi, RLM version 11.1 BL2
```

Logfile format Copyright (C) 2006-2014 Reprise Software, Inc.

For documentation on this format, email info@reprisesoftware.com

You are encouraged to build tools to process this data.

### OpenLM Broker configuration

**Automatic OpenLM Broker configuration**

To automatically configure OpenLM Broker with the Reprise License Manager, access the Broker on your RLM License Server machine, click the **[License Managers](https://www.openlm.com/license-manager-capabilities/ "license managers") Tab,** then click **Detect**:

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-6.png)

If the RLM service (e.g. "rlm") is started, the Broker will detect and configure all the required settings automatically. We recommend executing the Manual configuration section below to make sure that the server is queried successfully without any errors.

**Manual OpenLM Broker configuration**

If auto-detect did not work, you can also add and configure the license manager manually. To do so:

1. Navigate to your Broker instance and click on the **License Managers** tab → **Add License Manager.** A pop-up will open.
2. Select **RLM** from the "LM Type" drop-down menu, enter the RLM server port number (e.g. 5054) then click **ADD**. The Add License Mangers window opens.
3. Click on the blue **Settings** tab.
4. Check the **Set Path Manually** box then click **Add License File manually.**A pop-up appears.
5. Fill in the correct filename and full path in the text box (or click **on the magnifier** and browse to the license file location).
6. Toggle the **Watch license** file Button on.
7. Select the **Commands** tab. Click **Executable path**:" and browse to the folder where the **rlmutil.exe** command-line utility is located (typically C:RLMServer). Click **Execute** and make sure the output is valid.  
   RLM can have specified a password in the license file for checking out licenses. If this is the case we need to add parameter -z (password) to the Status and data inquiry Command-Line.
8. **![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-7.png)**
9. *(Optional)* If you have configured RLM to run as a service, check the **Use the operating system start/stop commands** toggle and enter the **Service Name**.
10. Switch to the **Vendors tab.** To obtain license denial information and 1-second resolution usage reports, OpenLM needs to read the content of the Reprise RLM Report log file as well as associate the correct vendor name with the reports.
11. Click **Add Vendor.** A pop-up appears. Please input the vendor name then click **Continue.**
12. Switch to the **Log Files** tab → **Add Log File.**  A pop-up appears. ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-8.png)
13. Input the Log file path, select the vendor then click **Continue.**
14. Click **SAVE.**

### OpenLM Server configuration

To have OpenLM Server configured automatically via EasyAdmin User Interface:

1. Open the EasyAdmin interface either by accessing in your browser or through **Windows Start → OpenLM → OpenLM EasyAdmin User Interface**)
2. In the License Servers window, Click "**there are x servers pending approva**l". Click on it to approve the new entry.![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42307-9.png)

## RLM failover configuration [#](#4-toc-title)

### Prerequirements:

* RLM configured with failover support according to  the RLM requirements

1. Add a RLM primary port in the Broker (or  use the Detection)
2. Add a primary license file in the RLM primary port (or  use the Detection)
3. Add a RLM failover port in the Broker (or  use the Detection)
4. Go to the EasyAdmin User Interface (both RLM LMs should be visible as candidates)
5. Select the primary host for the approving
6. Enable Failover Configuration
7. Add the hostname and the port of the failover RLM LM
8. Make sure the Primary RLM LM is marked
9. Click Apply

## How to verify your Reprise License Manager (RLM) configuration [#](#5-toc-title)

To check if the RLM License Server is monitored correctly:

1. Open the EasyAdmin user interface in your browser
2. Click **EasyAdmin Start → Widgets → License Servers**. The License Servers window will open. Verify that the configured license manager(s) appears on the list. A green circle node indicates an active connection to the license server

Please note that sometimes it may take up to 3 minutes for the status indicator to change if this is a newly added connection.
