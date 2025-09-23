---
title: "Monitoring the FlexLM license manager with OpenLM"
sidebar_label: "Monitoring the FlexLM license manager with OpenLM"
---

<!-- Source: https://www.openlm.com/knowledge-base/configuring-openlm-to-interface-the-flexlm-license-manager-kb4001a/ -->

* Monitoring the FlexLM license manager with OpenLM

# Monitoring the FlexLM license manager with OpenLM

Table of contents 

* [Interfacing FlexLM using OpenLM Server only](#0-toc-title)
* [Monitoring the  FlexLM using OpenLM Server + OpenLM Broker](#1-toc-title)
* [OpenLM Broker configuration](#2-toc-title)
* [OpenLM Server configuration](#3-toc-title)
* [When using FlexNet Publisher](#4-toc-title)
* [Multiple-pool license files information](#5-toc-title)
* [Importing files, and uploading FlexLM license files](#6-toc-title)
* [FlexLM Options files management](#7-toc-title)
* [Monitoring License borrowing information](#8-toc-title)
* [Verify FlexLM configuration in EasyAdmin User Interface](#9-toc-title)

FlexLM, AKA [FlexNet](https://www.openlm.com/knowledge-base/flexera-flexlm-flexnet-publisher/ "Flexnet") publisher is a popular [license management software](https://www.openlm.com/software-asset-management/ "license management software"), accommodating a wide variety of licensed applications in multiple disciplines. This document elaborates the steps required to configure OpenLM to interface with the [FlexLM license manager](https://www.openlm.com/knowledge-base/configuring-openlm-to-interface-the-flexlm-license-manager-kb4001a/ "FLEXlm license manager"), monitor license usage, and obtain license usage statistics. There are two options to query the License Server:

1. Quick method: Remotely query the license server from the OpenLM Server. This method facilitates reporting of license usage information in EasyAdmin User Interface report windows.

2. Enhanced method: Query the license server locally by the OpenLM Broker and propagate the information back to the OpenLM Server. This option provides:

* Additional information, such as license denials and borrowed licenses.
* Administrative capabilities, such as options files management, and
* System robustness, overcoming network and security issues.

## Interfacing FlexLM using OpenLM Server only [#](#0-toc-title)

The first option for interfacing FlexLM is to have the OpenLM Server query the license manager server directly.

![OpenLM Server interfacing directly with the LM](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20857%20544'%3E%3C/svg%3E)![OpenLM Server interfacing directly with the LM](/img/legacy/kb/openlm-server-interfacing-directly-with-the-lm.png)

[Make sure the OpenLM Server](https://www.openlm.com/knowledge-base/openlm-server-installation-guide-v21-and-above/) is installed and configured.

1. 1. Navigate to EasyAdmin User Interface → Start Menu → Administration → License Manager Servers → Add LM.

![Graphical user interface, application Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202012%20929'%3E%3C/svg%3E)![Graphical user interface, application Description automatically generated](/img/legacy/kb/graphical-user-interface-application-description.png)

1. 2. Insert a description in the Description box to help you recognize the license manager.
2. 3. From the Type drop-down menu, select FlexLM.
3. 4. Type in the license server's Hostname and Port number. In the example below, these are win2016dev2 and 27000 respectively.
4. 5. Set the Time Zone to where the license server physically resides (e.g. UTC +02:00 Jerusalem).
5. 6. Enable Triad Configuration: OpenLM supports multiple server redundancy configurations for several types of license servers (e.g. FlexLM, DSLS, IBM LUM). In the case of FlexLM, such servers are referred to as a ‘triad'.

* **Checked**: The OpenLM server will monitor the activity of all FlexLM servers of the triad.
* **Unchecked** (Default): The OpenLM server will only monitor the activity of a single FlexLM license server

1. 7. Use Broker toggle: off.
2. 8. It is recommended to test the connection (a pop-up will appear).

An established connection will look like this:

![Graphical user interface, text, application, Word Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20658'%3E%3C/svg%3E)![Graphical user interface, text, application, Word Description automatically generated](/img/legacy/kb/graphical-user-interface-text-application-word.png)

A failed connection test will look like this:

![Graphical user interface, application Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20658'%3E%3C/svg%3E)![Graphical user interface, application Description automatically generated](/img/legacy/kb/graphical-user-interface-application-description-1.png)

1. 9. Click SAVE.
2. 10. OpenLM Server should now be ready to query your FlexLM license manager remotely and present the relevant license information via the EasyAdmin User  Interface.

### The LM Tools tab:

1. Select the LM Tools tab, located on the left side.

2. From the drop-down list select FLEXlm.

3. Copy the lmutil.exe license server query program to the C:Program FilesOpenLMOpenLM ServerLM folder, if it is not already there.

4. Type in the full path of the executable file, e.g.: C:Program FilesOpenLMOpenLM ServerLMlmutil.exe in the FLEXlm executable file text box.

5. Click the SAVE button.

![Graphical user interface, text, application Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201011%20591'%3E%3C/svg%3E)![Graphical user interface, text, application Description automatically generated](/img/legacy/kb/graphical-user-interface-text-application-descr.png)

## Monitoring the  FlexLM using OpenLM Server + OpenLM Broker [#](#1-toc-title)

The OpenLM Broker is an optional component. Configuring the OpenLM Server is usually enough for monitoring licensed applications.

To produce more informative FLEXlm license usage reports, it is highly recommended to install the OpenLM Broker on the FLEXlm license manager machine. The OpenLM Broker will query the license server machine locally, and propagate the response to the OpenLM Server.

![Broker interface with log and license files](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201037%20548'%3E%3C/svg%3E)![Broker interface with log and license files](/img/legacy/kb/broker-interface-with-log-and-license-files.png)

**The Broker provides:**

* Accurate license statistics, in 1-second resolution
* Facilitates robust, buffered communication between the OpenLM Server and the License manager, overcoming security restrictions and network failure
* License Borrowing information
* License denial information
* License pool: multiple pools, node-locked, and named users' information
* License packaging information
* Automatic maintenance of FlexLM Options files
* Importing of license files from remote license servers
* Uploading license files to remote license servers

The following paragraphs describe the configuration and utilization of the OpenLM Broker, to achieve the said benefits.

### OpenLM Broker installation

[Download](https://www.openlm.com/download/) and install the latest OpenLM Broker version.

## OpenLM Broker configuration [#](#2-toc-title)

Automatic OpenLM Broker configuration

To have OpenLM Broker automatically detect part of the settings required to monitor FlexLM, click Detect as depicted below:

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20611'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-26383-7.png)

If the FlexLM service (e.g. FlexLM License Manager) is started, the Broker will detect and configure the port and utility path settings automatically. Please note that this only auto-detects some settings and does not guarantee that the configuration is valid. To verify and configure the remaining settings, please continue with step 7 in the Manual section below.

### Manual OpenLM Broker configuration

If auto-detect did not work, you can also add and configure the license manager manually. To do so navigate to your Broker instance and:

1. 1. Click Add License Manager. A pop-up will appear.
2. 2. Enter the FlexLM server port number.
3. 3. Select FlexLM from the License Manager Type drop-down menu.
4. 4. Click ADD.
5. 5. Click on the SETTINGS tab. Add the License file path as depicted below:![Graphical user interface, application Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20650'%3E%3C/svg%3E)![Graphical user interface, application Description automatically generated](/img/legacy/kb/graphical-user-interface-application-description-2.png)
6. 6. Select the Commands tab. Make sure the path for commands is correct then click Execute. Make sure that you see a valid output.*Note**: on some FlexLM installs, the lsmon utility is placed in a separate folder. In such cases, you would have to manually edit the data\_inquiry node to point to the correct path*  

   ![Graphical user interface, application Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20650'%3E%3C/svg%3E)![Graphical user interface, application Description automatically generated](/img/legacy/kb/graphical-user-interface-application-description-3.png)  
   (Windows only) If your FlexLM install is configured to run using a Windows service, turn on the Use the operating system start/stop commands toggle and type in FlexLM License Manager.
7. 7.Switch to the VENDORS tab then click Add Vendor. Type in the vendor name - adskflex.
8. 8. Click to expand the Options File Details. Type in a description, declare the File path, and if necessary the backup path. Click CONTINUE:![Graphical user interface, application, Teams Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20654'%3E%3C/svg%3E)![Graphical user interface, application, Teams Description automatically generated](/img/legacy/kb/graphical-user-interface-application-teams-desc.png)
9. 9. To obtain license denials and second-exact usage information, the OpenLM Broker needs to be configured to read the FlexLM debug log file. Navigate to the  Log Files tab and then click Add Log File:![Graphical user interface, application Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20655'%3E%3C/svg%3E)![Graphical user interface, application Description automatically generated](/img/legacy/kb/graphical-user-interface-application-description-4.png)
10. 10. Select FlexLM Debug Log File from the Log Type drop-down menu.
11. 11. Click on the magnifier and look for the Log Path field and browse to the location of the FlexLM usage log file resides. Click CONTINUE.  
    ![Graphical user interface, application, Teams Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20663'%3E%3C/svg%3E)![Graphical user interface, application, Teams Description automatically generated](/img/legacy/kb/graphical-user-interface-application-teams-desc-1.png)
12. 12. Click SAVE.

## OpenLM Server configuration [#](#3-toc-title)

Once Broker has been configured, it should be sending data to OpenLM Server. The final step in interfacing FlexLM with OpenLM is to approve the configuration in EasyAdmin User Interface.

### Automatic OpenLM Server configuration via EasyAdmin User Interface

1. 1. Open the EasyAdmin user interface (Windows Start → OpenLM → OpenLM EasyAdmin User Interface. Navigate to the License Servers window, and double-click on the row that contains the details of the newly added FlexLM server entry.![Graphical user interface, text, application, email Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20656'%3E%3C/svg%3E)![Graphical user interface, text, application, email Description automatically generated](/img/legacy/kb/graphical-user-interface-text-application-email.png)
2. 2.  Click Approve.

![Graphical user interface, application Description automatically generated](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201386%20649'%3E%3C/svg%3E)![Graphical user interface, application Description automatically generated](/img/legacy/kb/graphical-user-interface-application-description-5.png)

3. The FlexLM configuration has now been automatically added to OpenLM Server and it queries the license server locally via the OpenLM Broker and presents license usage on the OpenLM EasyAdmin User Interface.

## When using FlexNet Publisher [#](#4-toc-title)

* Because FlexNet Publisher does not use the lmutil.exe and lmgrd.exe utilities, the path in the status and data\_inquiry tabs should remain the default lmutil that comes with the OpenLM Broker installation, which can be found at: C:Program FilesOpenLMOpenLM Brokertools64lmutil.exe.
* .Note that for FlexNet Publisher, the main license manager port needs to be set (27000 by default) instead of the vendor port.

## Multiple-pool license files information [#](#5-toc-title)

OpenLM can present license usage according to specific FlexLM license pools, and distinguish between floating licenses, named licenses, and node-locked licenses.

For more information on this capability, please refer to this article: [Multiple FlexLM license pool monitoring](https://www.openlm.com/Knowledgebase%20and%20articles/multiple-flexlm-license-pool-monitoring-kb4053/)

## Importing files, and uploading FlexLM license files [#](#6-toc-title)

OpenLM EasyAdmin users are able to:

* Import FlexLM Options files from remote license servers
* Import log files from remote license servers
* Import FlexLM license files from remote license servers
* Edit and upload the said license files back to the remote license server, and
* Apply a ‘restart' or ‘re-read' action to have the changes take effect on the remote license server.

For more information on this functionality - please refer to this article: [Downloading files from, and uploading files to the license server machine](https://www.openlm.com/Knowledgebase%20and%20articles/downloading-files-from-and-uploading-files-to-the-license-server-machine-kb4057/)

## FlexLM Options files management [#](#7-toc-title)

The OpenLM solution incorporates various capabilities for maintaining FlexLM Options files.

* The EasyAdmin User Inter enables administrators to easily edit Options files, and apply changes to FlexLM license allocations and restrictions
* OpenLM integrates these Options file maintenance capabilities with synchronization of the organization's Active Directory. This enables OpenLM to keep the FLEXlm Options file up-to-date as users leave or join the organization, or move between groups.
* OpenLM facilitates the import of user and group entities into its database using reading Options files.

For more information on these options - please refer to the following articles:

* [Options File management Using OpenLM EasyAdmin](https://www.openlm.com/Knowledgebase%20and%20articles/options-file-management-using-openlm-easyadmin-kb4007/)
* [Importing users and groups via the Options files reading mechanism](https://www.openlm.com/Knowledgebase%20and%20articles/importing-users-and-groups-via-the-options-files-reading-mechanism-kb4037a/)

## Monitoring License borrowing information [#](#8-toc-title)

License Borrowing is a method of linking a specific workstation to a single license instance from within the license pool. This procedure marks a license as being perpetually used on the license manager (LM), enables users to borrow a product license for a designated period, and to operate the licensed application without connecting to the license manager.

OpenLM presents license ‘borrow' data in the EasyAdmin License Servers window.

## Verify FlexLM configuration in EasyAdmin User Interface [#](#9-toc-title)

To check to see if the FlexLM License Server interface is working correctly:

1. Open the EasyAdmin User Interface.

2. Click EasyAdmin User Interface Start → Widgets→ License servers. The License Servers window appears. Verify that the configured [license managers](https://www.openlm.com/license-manager-capabilities/ "license managers") appear on the list. A green circle node indicates an active connection to a license server.

3. FlexLM denials will be presented in the EasyAdmin Start → Reports → Denials. Note that they should be acquired from the debug log from the moment of the OpenLM Broker configuration. They will not appear retroactively.
