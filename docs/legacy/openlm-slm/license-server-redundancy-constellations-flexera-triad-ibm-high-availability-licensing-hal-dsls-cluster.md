---
title: "License server redundancy constellations: Flexera Triad, IBM High Availability Licensing (HAL), DSLS cluster"
description: Table of contents.
sidebar_label: "License Server redundancy constellations: Flexera Triad, IBM High Availability Licensing (HAL), DSLS cluster."
sidebar_position: 4
---

{/* Source: https://www.openlm.com/knowledge-base/license-server-redundancy-constellations-flexera-triad-ibm-high-availability-licensing-hal-dsls-cluster/ */}

* License Server redundancy constellations: Flexera Triad, IBM High Availability Licensing (HAL), DSLS cluster.

Table of contents 

* [Scope:](#0-toc-title)
* [Flexera's Three Server Redundancy constellation](#1-toc-title)
* [IBM's High Availability Licensing (HAL)](#2-toc-title)

**Flexera's FlexLM Three Server Redundancy (Triad)**

**IBM's High Availability Licensing (HAL)**

**Dassault Systemes DSLS cluster for "Failover" mode**

## Scope: [#](#0-toc-title)

Several License management tools such as IBM and Flexera present a method of employing multiple license servers in a cluster as part of their attempt to assure a fault-free [license management solution](https://www.openlm.com/software-license-management/ "Software License Management"). This article summarizes the operative measures required for implementing each of these solutions, and attempts to compare them in terms of pros and cons.  
The OpenLM Utilizer license monitoring tool supports both configurations. OpenLM is designed to extract license statistics from multiple servers over WAN. It has been tried and confirmed for Flexera's Triad configuration. At the time of writing this revision (Rev 1.0), It has not yet been verified with the IBM LUM HAL.

## Flexera's three server redundancy constellation [#](#1-toc-title)

### General

{/* vale OpenLM.BiasFreeLanguage = NO */}
This constellation is consisted of Three license servers, all inter-connected by TCP/IP. These machines are adequately named "Primary", "Secondary" & "Tertiary". Any one of the two first machines (Primary or Secondary) may be defined as the "Master"; which is counter intuitive, as it gets to do all the work while the other two basically sit on their hands. All licenses are served by this Master machine, and the Report & Debug logs are also accumulated by it.

Upon system start-up, the three servers are started up separately according to their order, and the Master role is set according to this order or according to a designated flag: "PRIMARY\_IS\_MASTER".

The Servers inter-communicate by a "Heartbeat" messages over TCP/IP, using the same port number. A machine which fails to receive a response to its sent Heartbeats turns down the vendor daemon and can not serve licenses. When the Master server (Primary or Secondary) fails, the Master role is passed to the other (Secondary or Primary) server. The new Master assumes the license management role for all the FlexEnabled applications, and accumulates new Debug and Report logs.
{/* vale OpenLM.BiasFreeLanguage = YES */}

### Configuration of a three server redundancy constellation

* First, a set of three stable machines needs to be identified, and reliable communication needs to be set between them.
* The software vendor must receive the HostID and Host name of the machines that consist the Triad. In return, they should provide system - specific license server files. Some changes may need to be done in the license file according to this new information, such as the PRIMARY\_IS\_MASTER value, the communication port number and the HEARTBEAT\_INTERVAL which is effectively the timeout for license servers to be knocked out of the triad.
* The license server package needs to be copied to each of the three participating servers.

### Limitations

{/* vale OpenLM.BiasFreeLanguage = NO */}

* There should always be at least two machines up and running. If any two machines halt - then the Triad is stopped as a whole, and no "FlexEnabled" applications are served. This is quite an odd limitation, as the system basically employs a single machine at a time anyway.
* The "Tertiary" machine never gets to play "Master". I find this an odd planning, because this in effect renders this machine useless.
* This configuration puts a strain on one machine at a time. It does not share the work, and is prone for errors especially in busy environments.

{/* vale OpenLM.BiasFreeLanguage = YES */}

## IBM's High Availability Licensing (HAL) [#](#2-toc-title)

### General

The IBM HAL is based on the "License server Cluster" concept. A cluster is a group of 3 to 12 license servers, that jointly manage licensed applications. The management activity load is dynamically and equally shared among most of the servers, while one or two other servers remain on-hold, waiting to pitch in in case an active server becomes unavailable.  
Network license servers that participate in a cluster can simultaneously serve server-bound licensed applications,  as well as cluster bound applications.

### Configuring HAL

* Select a set of interconnected license servers as cluster members. These members need to be stable machines, that stay on permanently. Network stability is also crucial to assure faultless system activity. Maintain the machines in the same geographical vicinity, and ensure they all run the same operating system type.

* Instal LUM on each of the license servers.

* Create the cluster from one of the servers in the cluster. This may be done using the i4blt -H command or the GUI. In the following example, cluster ThisCluster was created, and it contains 3 servers: Server1, Server2 & Server3.
  + ```
    i4blt -H c -N ThisCluster -T 3 -n "Server1 Server2 Server3"
    ```text

* Activate each member of the cluster. The 1st member is already enabled by default following the cluster definition. This example enables Server2:
  + ```
    i4blt -H a -N ThisCluster -n Server2
    ```

To Deactivate a Server2, use

* ```
  i4blt -H a -N ThisCluster -n Server2
  ```text

* Get a HAL Enrollment Certification File (ECF) from the license vendor. To do so, You must send him the "Cluster ID". This ID can be obtained by typing in the status cmmad:
  + ```
    i4blt -H s -N ThisCluster.
    ```

* Enroll the HAL ECF just like as for regular license servers, using the GUI or the i4blt command line. for example:
  + ```
    i4blt -a -n ThisCluster -f -T
    ```text

* Configure all clients to recognize all the cluster members.

### Dassault Systemes DSLS

The DSLS license manager also implements a cluster structure, for "Failover mode". Its characteristics are a mix of the two types mentioned earlier;

{/* vale OpenLM.BiasFreeLanguage = NO */}

* A server may not perform as part of a cluster AND as a stand alone server at the same time.
* The number of license servers that participate in the cluster are exactly 3.
* The OS on each server may be either Unix or Windows.
* At least two machines should be up and running, and interconnected  to serve licensed applications.
* There is no 'Master' here: all machines have the same role of license management.
* The three machines each log the license activity independently. They update each other when usage conditions change.

{/* vale OpenLM.BiasFreeLanguage = YES */}

### Summary

It seems that the IBM LUM solution for multiple server constellations is more comprehensive than that of Flexera's. Its main 'pro' characteristics include:

* Equal sharing of the workload.
* Dynamic redistribution of license management as a function of server availability
* Configurable amount of servers; a maximal 12 server constellation, in comparison to 3 (effectively 2) Flexera servers.

The main 'con' on the IBM LUM list is its lack of popularity in comparison to [FlexNet](/supported-software "FlexNet") (FlexLM). This has manifested in a trend of licensed application vendor's migration from LUM to various other license management tools, for example, FlexLM and DSLS.

### Further reading

https://www-01.ibm.com/software/awdtools/lum/library.html

https://kb.flexerasoftware.com/doc/DocumentRepository/Licensing/FLEXnet_Publisher/FLEXnet_Publisher_11.6/03_ISV/Product%20Manual/LicenseAdministration.pdf

https://communities.mentor.com/mgcx/servlet/JiveServlet/previewBody/2877-102-1-5407/licensing_bp_wp-10.8.pdf

[https://pdir.technodat.cz/r21/install\_v5d](https://pdir.technodat.cz/r21/install_v5doc/doc21/online/basil_C2/pdf/DSLS.pdf)[oc/doc21/online/basil\_C2/pdf/DSLS.pdf](https://pdir.technodat.cz/r21/install_v5doc/doc21/online/basil_C2/pdf/DSLS.pdf)
