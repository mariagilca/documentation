---
title: "Monitoring the IBM LUM license manager with OpenLM"
sidebar_label: "Monitoring the IBM LUM license manager with OpenLM"
---

<!-- Source: https://www.openlm.com/knowledge-base/interfacing-the-ibm-lum-license-manager-kb4001h/ -->

* Monitoring the IBM LUM license manager with OpenLM

# Monitoring the IBM LUM license manager with OpenLM

Table of contents 

* [Scope](#post-42308-_j38jhsj64e2v)
* [Method 1: Enabling the OpenLM server to query the IBM-LUM license server:](#post-42308-_z3c5zegmci7p)
* [Methods 2 and 3: Installing OpenLM on a machine other than the IBM-LUM license server](#post-42308-_rdsnsf9hy30)
* [Method 2: OpenLM Server queries the IBM-LUM License server via the LUM client](#post-42308-_ubpo09o4ch9k)
* [Method 3: Employ the OpenLM Broker to propagate data to the OpenLM Server](#post-42308-_fzv4xdotaimp)
* [IBM LUM indications in EasyAdmin User Interface](#post-42308-_46pqhu45way2)

## Scope [#](#post-42308-_j38jhsj64e2v)

OpenLM supports license monitoring of a wide and ever-growing variety of [license managers](https://www.openlm.com/software-license-management/), such as FlexLM and DSLS. This application note elaborates the steps required to configure OpenLM to interface the IBM-LUM license server, to monitor license usage and denials, and obtain license statistics.

### Three configuration methods

There are three methods to query the IBM-LUM License Server, as elaborated below. This document refers to these methods henceforth:

**Method 1 -** Minimal installation. Installing only the OpenLM Server on the same machine as the IBM-LUM license manager. This method is the most straightforward but lacks the benefits provided by the OpenLM Broker.

**Method 2 -** Installing the OpenLM Server and the IBM-LUM client software on a machine other than the IBM-LUM license server. The OpenLM Server will query the IBM-LUM license server via the IBM-LUM client. This method also lacks the benefits provided by the OpenLM Broker.

**Method 3 -** Installing the OpenLM Broker on the same machine as the IBM-LUM license server, query the License Server locally, and propagate the information to the OpenLM Server. The OpenLM server may be installed on any machine on the network (including the IBM-LUM license server machine). This is the most recommended method, as it displays various benefits for license administrators (e.g. obtaining license denial reports).

## Method 1: Enabling the OpenLM server to query the IBM-LUM license server: [#](#post-42308-_z3c5zegmci7p)

Methods 1 & 2 require the OpenLM Server to query the IBM-LUM license server. In order to enable that - follow these steps:

1. [Download and install the OpenLM Server](https://www.openlm.com/knowledge-base/install-openlm-server-ht802/).
2. Login to the OpenLM EasyAdmin → Administration → License Manager Servers
3. Select the LM Tools tab, located on the left side.
4. Select LM Type as ‘LUM'.
5. Copy the i4blt.exe file to the OpenLM Server installation folder, under the LM directory, e.g.: "C:Program Files OpenLMOpenLM ServerLM" (64bit)
6. Type the full path to the executable and click SAVE.  
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20987%20393'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42308-1.png)

### Introducing a new IBM-LUM server

After configuring the OpenLM configuration tool to work with IBM-LUM as described above, switch to the License Servers tab:

1. Click '**Add LM**'. The ADD LICENSE MANAGER window appears.
2. Type a descriptive name in the **Description** text box, e.g. "IBM LUM license server"
3. From the Type drop-down menu, select **LUM.**
4. Type in the IBM-LUM license server name in the **Hostname** text box, e.g.: ibm\_lum\_server.
5. Type in the IBM-LUM license server's port number in the **Port** text box. (The IBM-LUM default port is 1515).
6. Set the **Time Zone** to where the License Server physically resides (e.g.: Eastern time).
7. "**Enable HAL configuration**" : OpenLM supports multiple server redundancy configurations for IBM-LUM. This is referred to as "[High Availability Licensing (HAL)](https://www.openlm.com/knowledge-base/license-server-redundancy-constellations-flexera-triad-ibm-high-availability-licensing-hal-dsls-cluster/)".  
   A. For HAL multiple server redundancy configurations this box needs to be checked,  
   B. OpenLM Brokers need to be installed on each of the IBM-LUM license server machines (see below).  
   C. The HAL member server names can be obtained by running the following command line:

   ```
   i4blt -H s -N "clusterName"
   ```

   D. Specify the different cluster's server names and respective port numbers, one beneath the other, in the ‘Hostname' list.**Use Broker** toggle:

* OFF (Default): The OpenLM Server actively queries the license manager. Keep this configuration when not employing the OpenLM Broker.
* ON: Usage information is obtained solely by the OpenLM Broker installation on the License manager machine.

1. Additional: Switch to the **Custom fields** tab to add information such as:  
   A. Country  
   B. Usage Scope  
   C. Description  
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202048%201282'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42308-2.png)
2. Click **SAVE**.

The OpenLM Server is now able to monitor the IBM-LUM license server when both are installed on the same machine, as described in method #1, above.

## Methods 2 and 3: Installing OpenLM on a machine other than the IBM-LUM license server [#](#post-42308-_rdsnsf9hy30)

If the OpenLM Server is installed on a machine other than the IBM-LUM license server, additional actions are required. These actions elaborate methods 2 and 3, already mentioned above:

* Method 2: Configure the OpenLM Server machine to query the IBM LUM License server via the LUM client, or
* Method 3: Query the license server locally by installing the OpenLM Broker on the license server machine, and propagating IBM LUM usage data to the OpenLM Server.

There are many benefits for employing the method 3, requiring the installation of the OpenLM Broker on the License server machine. These benefits include:

* Robustness: License usage information will be buffered in case of connectivity failure.
* Configuration: The OpenLM Broker provides a flexible configuration interface
* Reports: The OpenLM Broker will extract license denial information and propagate it to the OpenLM Server.

## Method 2: OpenLM Server queries the IBM-LUM License server via the LUM client [#](#post-42308-_ubpo09o4ch9k)

The IBM-LUM Server enables other machines to query license usage and perform actions remotely. For a full install procedure please consult the Using License Use Management Runtime document. The following list is a short overview of this procedure.

1. Make sure that you have IIS installed and configured on the OpenLM Server Machine

2. Install the LUM client software on the OpenLM Server machine. There is no need to configure the OpenLM Server machine as a LUM server.

3. Add a reference to the OpenLM Server on the IBM-LUM License server

4. After installing the LUM software on the OpenLM Server machine, the i4ls.ini file is created. For Windows versions Vista and beyond, copy this file from:

*C:Users\AppDataLocalVirtualStoreProgramDataIBMLUM* to

*C:ProgramDataIBMLUM*

For pre-Vista versions, copy this file from

*C:Documents and SettingsAll UsersApplication DataIBMLUM* to

*C:UsersAll UsersIBMLUM*

Note that if you use the Server's IP instead of its name (for instance if the servers are located on different DNS domains so that DNS resolution does not work), a ‘#' symbol must precede the IP.

## Method 3: Employ the OpenLM Broker to propagate data to the OpenLM Server [#](#post-42308-_fzv4xdotaimp)

This solution is simple and very beneficial (see above) but requires access to the license server machine for installation. The OpenLM Broker queries the license usage information locally and propagates the data to the OpenLM Server. The OpenLM Broker is a Java application, and can therefore run on Windows or UNIX / Linux license servers. Installation of the OpenLM Broker includes the installation of Java JRE.

### OpenLM Server configuration for IBM-LUM

The OpenLM Server configuration will be exactly the same as performed in the previous method, i.e. without the Broker, except that the "**Use Broker**" box should be checked.

### OpenLM Broker configuration for IBM-LUM

1. Download and install the latest OpenLM Broker version.
2. Configure The OpenLM Broker to interface the license server and the OpenLM Server:  
   A. Click "Add port" and enter the port number as it was set on the OpenLM Server configuration tool (i.e.: 1515)  
   B. The OpenLM hostname and port (e.g. OpenLM\_Server and the default 5015)  
   C. The vendor name should be set correctly (e.g. "CATIADBS")
3. The ‘**Status**' and "**data\_inquiry**" commands should be as depicted below. Replace **`<fullpath>`** with the actual path of the i4blt executable on the IBM LUM license server.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20806%20693'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42308-3.png)

4. In case the IBM LUM system employs HAL - multiple server redundancy, the LUM ‘**status**‘ and "**Data inquiry**" commands should contain all 3 license servers as follows:

4a. status command:

***i4blt -H s -N "clusterName"***

As mentioned above, executing this command will obtain the cluster's member server names.

4b. "data inquiry" command:

***i4blt -s -lc -n "server1 server2 server3"***

***i4blt -s -l co -n "server1 server2 server3 "***

***i4blt -lp -i -n "server1 server2 server3"***

### Additional: Configure the OpenLM Broker to monitor LUM using Broker UI

1. Access your Broker UI in the Chrome/Edge/Firefox e.g: http://localhost:5090/.
2. Navigate to the [License Managers](https://www.openlm.com/license-manager-capabilities/ "license managers") tab → Add License Manager. A pop-up appears.
3. From the drop-down list select LM type LUM and enter the Port number (ex: 1515)
4. Click ADD.  
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202048%201218'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42308-4.png)
5. Cluster toggle:

* OFF.
* ON. See p7 in Introducing a new IBM-LUM server above.

1. Switch to to Commands tab. In the **Executable path** field input the actual path of the i4blt executable on the IBM LUM license server.
2. Under Vendors, set the name correctly.
3. Click on SAVE

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201904%20957'%3E%3C/svg%3E)![](/img/legacy/kb/word-image-42308-5.png)

## IBM LUM indications in EasyAdmin User Interface [#](#post-42308-_46pqhu45way2)

In order to verify OpenLM's interface to the IBM LUM License Server, please

1. Open the EasyAdmin web application.
2. Click EasyAdmin **Start → Widgets → License servers**. The License Servers window appears. Verify that the configured license managers appear on the list. A green circle node indicates an active connection to a license server.

### IBM LUM denials reports

IBM LUM license denials will be presented in the EasyAdmin **Start → Reports → Denials**. Note that they are subject to "True denials" filtering. That means that denials' reporting will be delayed for a while, to assert that the user has not been granted a license shortly after being denied one.

Your OpenLM system is now configured to provide IBM LUM licensing information.

If you require further assistance on this subject, please contact support@openlm.com, and our team will be glad to assist.
