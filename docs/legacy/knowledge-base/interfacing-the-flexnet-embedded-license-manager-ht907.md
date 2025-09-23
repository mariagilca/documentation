---
title: "Monitoring the FlexNet Embedded License Manager with OpenLM - HT907"
sidebar_label: "Monitoring the FlexNet Embedded License Manager with OpenLM - HT907"
---

<!-- Source: https://www.openlm.com/knowledge-base/interfacing-the-flexnet-embedded-license-manager-ht907/ -->

* Monitoring the FlexNet Embedded License Manager with OpenLM - HT907

# Monitoring the FlexNet Embedded License Manager with OpenLM - HT907

Table of contents 

* [How does it work?](#0-toc-title)
* [OpenLM Server configuration](#1-toc-title)
* [Verify the FlexNet Embedded license manager configuration #](#2-toc-title)
* [Known limitations](#3-toc-title)

[FlexNet](https://www.openlm.com/knowledge-base/flexera-flexlm-flexnet-publisher/) Embedded is one of the many [license managers](https://www.openlm.com/software-license-management/) supported by OpenLM. In this step-by-step guide, we will explore how to configure OpenLM to monitor with a [FlexNet](https://www.openlm.com/knowledge-base/flexera-flexlm-flexnet-publisher/ "Flexnet") Embedded license manager in order to monitor license usage and obtain license statistics.![Diagram of how the OpenLM Server interfaces with the Flexnet Embedded server](/img/legacy/kb/diagram-of-how-the-openlm-server-interfaces-with-t.png)

*Diagram of how the OpenLM Server interfaces with the FlexNet Embedded server*

## How does it work? [#](#0-toc-title)

OpenLM Server queries the FlexNet Embedded server's XML API directly to retrieve data about license usage, statistics and other information. This data is then aggregated by OpenLM Server and displayed to the user through easily accessible reports in the EasyAdmin user interface. For more information, please check out our [What is FlexNet Embedded?](https://www.openlm.com/Knowledgebase%20and%20articles/what-is-flexnet-embedded/) article.

## OpenLM Server configuration [#](#1-toc-title)

1. In EasyAdmin navigate to License Manager Servers (**Start Menu → Administration → License Manager Servers**)

2. Select the **LM Servers** tab.

3. Click **+** **Add LM**.

4. Configure the server screen as follows:

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201277%20797'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42299-2.png)

**Type:** FlexNet Embedded

**Description:** a name to recognize the FlexNet Embedded server

**Time Zone:** timezone that matches the license server's physical location

**Hostname:** the FlexNet Embedded server's IP or hostname

**Port:** See how to find the port in section 2.1 below

**Vendor Name**: the vendor of the software you are running (e.g. "Avid", "NVIDIA", etc.)

5. Click **Test** to verify that the configuration is working.

6. Click the **Apply** button to save the configuration.

7. Click **Save**

### How to find the FlexNet Embedded server's port number

1. Open the FlexNet Embedded Web UI address (e.g. http://win10:8888/FneServer/)
2. On the left panel, click **Properties and Status**.
3. Locate the **Listen port** and write it down.

![Finding the FlexNet Embedded Server's listening port](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201256%20410'%3E%3C/svg%3E)![Finding the FlexNet Embedded Server's listening port](/img/legacy/kb/finding-the-flexnet-embedded-servers-listening-po.png)

### Additional configuration for Nvidia customers

Nvidia customers that use FNE may sometimes be unable to query the XML API remotely (any machine other than the one that FlexNet Embedded is installed). In such cases, an additional tweak to the FNE configuration file is required:

1. Open the translator-config.properties file (typically located at **C:Program Files (x86)NVIDIALicense ServerTomcatwebappsfneWEB-INFclassestranslator-config.properties**)
2. Locate and edit the RESTRICT\_TO\_LOCALHOST variable to **false**, e.g.:  
   RESTRICT\_TO\_LOCALHOST=false
3. Save the file and restart the FlexNet Embedded server

## Verify the FlexNet Embedded license manager configuration [#](https://www.openlm.com/knowledge-base/interfacing-the-flexnet-embedded-license-manager-ht907/#post-21450-_n4t2hwjv22ly) [#](#2-toc-title)

To verify that the FlexNet Embedded license manager is being monitored correctly:

1. Open the EasyAdmin web application either by going to the address of your EasyAdmin Server (i.e. [http://localhost:](http://localhost:7019/EasyAdmin2/)5015) or by accessing the shortcut in the Windows **Start Menu → OpenLM → OpenLM EasyAdmin User Interface**

**![Opening EasyAdmin through Windows Start](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20386%20440'%3E%3C/svg%3E)![Opening EasyAdmin through Windows Start](/img/legacy/kb/opening-easyadmin-through-windows-start.png)**

2. Click **EasyAdmin Start → Widgets→ License Manager-Servers**. The License Servers window appears. Verify that the configured license manager appears on the list. A green circle node indicates an active connection to a license server.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201889%20533'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42299-5.png)

## Known limitations [#](#3-toc-title)

* License denials are not currently monitored
* There is no support for multiple server redundancy
