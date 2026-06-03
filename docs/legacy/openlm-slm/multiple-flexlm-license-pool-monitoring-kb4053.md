---
title: "Multiple FlexLM license pool monitoring"
description: Table of contents.
sidebar_label: "Multiple FlexLM license pool monitoring"
---

{/* Source: https://www.openlm.com/knowledge-base/multiple-flexlm-license-pool-monitoring-kb4053/ */}

* Multiple FlexLM license pool monitoring

Table of contents 

* [What are multiple pools?](#0-toc-title)
* [Benefits of multiple pool monitoring](#1-toc-title)
* [Prerequisites](#2-toc-title)
* [Process](#3-toc-title)
* [Additional key](#4-toc-title)
* [When matching does not succeed](#5-toc-title)

## What are multiple pools? [#](#0-toc-title)

The Flexera network license management system employs license files to track client license inventory. The license file is an account of purchased licensed features, each with respective attributes such as the licensing model, number of licenses, expiration date and so on. Licenses for equivalent features may be bought separately, thus forming separate 'pools' in the license file, each pool determining specific attributes.

## Benefits of multiple pool monitoring [#](#1-toc-title)

The OpenLM system can very well report license usage levels of multiple pool licenses. However, without applying the multiple pool monitoring capability it will not attribute a specific license usage session to a specific pool. This disadvantage is especially evident in the context of presenting the licensing model; [Floating licenses](https://www.google.com/url?q=https%3A%2F%2Fopenlm.com%2Fblog%2Fwhat-are-network-floating-licenses%2F&sa=D&sntz=1&usg=AFQjCNF2BOztR7q0Xa1RadrX0bn3ZEqOiw), Node locked and [Network named licenses](https://www.google.com/url?q=https%3A%2F%2Fopenlm.com%2Fblog%2Fwhat-are-flexnet-network-named-licenses%2F&sa=D&sntz=1&usg=AFQjCNFxNZFQk_PY3b_DL9vi0yeQq0wESA) all being presented equally, as part of a single pool. Keep in mind that licenses are priced differently per license model.

![Screenshot: Benefits of multiple pool monitoring [#](#1-toc-title)](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202560%201322'%3E%3C/svg%3E)![Screenshot 2: Benefits of multiple pool monitoring [#](#1-toc-title)](/img/legacy/kb/Screenshot-2023-01-24-at-23.53.23.png)

## Prerequisites [#](#2-toc-title)

There are several requirements that need to be met to provide multiple pool monitoring capabilities in OpenLM.

### OpenLM as an active system

OpenLM must be accepted as an active system:

* OpenLM will actively edit and sort the FlexLM license file. **Back up the FlexLM license file** prior to monitoring multiple FlexLM license pools.
* If a manual change is done to the license file - OpenLM will actively restart the license server, to read the updated license information from that license server.

### OpenLM Broker

The OpenLM Broker needs to be installed on the license server machine.

### License file

The OpenLM Broker needs to access the FlexLM license file on the license manager of interest. Refer to the paragraph "LICENSE MANAGER PORT; ADVANCED" .

### Options file

The OpenLM Broker needs to access the FlexLM Options file on the license manager of interest. Refer to the paragraph "LICENSE SERVER - VENDORS" [on the same document](https://www.openlm.com/knowledge-base/openlm-broker-installation-guide-comprehensive-kb4004b/). Note that accessing the FlexLM Options file will require a license for the OpenLM Options file management extension.

### Debug log

The OpenLM Broker needs to access the FlexLM Debug log file on the license manager of interest. Refer to the paragraph "LICENSE SERVER - Log file" [on the same document](https://www.openlm.com/knowledge-base/openlm-broker-installation-guide-comprehensive-kb4004b/).

### OpenLM License file

Multiple pool monitoring is a new OpenLM extension and requires a license. This license is presented in the OpenLM license file and is provided per vendor. The presentation of license usage acts according to the OpenLM license and configuration as depicted below:

As described in the diagram above, if the OpenLM license file does not include a Multiple pool license monitoring extension per a specific vendor, license usage will be partially presented, or not presented altogether. The  EasyAdmin 'Licenses' window will look as follows. Note the '0' usage and warning signs:

![Screenshot: OpenLM License file](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202560%201322'%3E%3C/svg%3E)![Screenshot 2: OpenLM License file](/img/legacy/kb/Screenshot-2023-01-24-at-23.55.04.png)

## Process [#](#3-toc-title)

When the OpenLM server is configured to monitor multiple pool licenses, it goes through the license file and locates features that appear in multiple pools. It then backs up the license file, and edits the original file. OpenLM sorts the license pools according to the precedence of their usage, for example, Network Named User-based licenses will precede ordinary floating licenses. The licenses' 'Asset\_info' attribute is changed according to this sorting.

To activate OpenLM to sort the license file:

* Open the OpenLM Broker configuration tool
* Select the port of interest
* Set the license file path (manually or automatically)
* Select the '**Sort**' button - to apply license file sorting immediately, OR
* Check the "**Allow to sort License File**" box, to apply this action automatically
* Select the **'Apply'** and "**Restart Broker**" buttons.

![Screenshot: Process [#](#3-toc-title)](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20806%20693'%3E%3C/svg%3E)![Screenshot 2: Process [#](#3-toc-title)](/img/legacy/kb/broker-sort-license-file.png)

The backed up copy of the original license file will be found on the same directory, with the added .bak extension.

The OpenLM Broker then actively restarts the License server, so that the changes made in the license file would take effect.

Following this, OpenLM will compile usage information from multiple sources to match specific sessions with their respective license pools.

> **Note:** The matching process is lengthy, and licenses will not be attributed to their license pool in real time. While the process is not yet complete, the session will be assigned an arbitrary pool, and an appropriate notification will be presented in both the "Currently consumed licenses" and "License activity" EasyAdmin windows:

![Screenshot 3: Process [#](#3-toc-title)](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202558%201336'%3E%3C/svg%3E)![Screenshot 4: Process [#](#3-toc-title)](/img/legacy/kb/Screenshot-2023-01-24-at-23.57.34.png)

## Additional key [#](#4-toc-title)

It is possible to filter reports according to licenses' Asset info, and present usage according to license pools. This is available on the "Currently consumed licenses" , "License usage" and "License activity" EasyAdmin windows.

## When matching does not succeed [#](#5-toc-title)

As noted earlier:

1. if the matching process fails, license usage will be attributed to an arbitrary license pool, and a notification will be presented.
2. If the client is not licensed by OpenLM to monitor multiple pool licenses - license usage will be partially presented

### Options file changed manually

OpenLM relies on the FlexLM Options file to associate licensed application usage with license pools.

If:

1. the Options file editing capability is used in 'Write' mode ( that is, the user edits the license manager's Options file through the OpenLM EasyAdmin Options file editor) and
2. the Options file is manually edited on the license server machine

then:

OpenLM will no longer be able to rely on the Options file, and will resort to license usage reporting regardless of license pools. Usage reporting will not include license pool attributes, and an appropriate warning message will pop up in EasyAdmin User Interface .

**Solution:**

There are two manners to deal with this condition, and regain association of license usage to license pools. Either:

1. Reload the Options file information by selecting: EasyAdmin **Start → Administration → Options file → select the required Options file → Delete**. The edited Options file will then be re-associated with that vendor.
2. Override the external changes that were made to that Options file by selecting EasyAdmin **Start → Options files → Options File Management → Deploy**.

### License file edited

If a change is detected in the license file, OpenLM will initiate a license server restart, to ensure that the license manager reports are accurate.
