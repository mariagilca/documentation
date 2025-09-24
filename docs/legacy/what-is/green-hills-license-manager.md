---
title: "Green Hills License Manager"
sidebar_position: 25
---

## What is Green Hills License Manager?

The Greenhills License Manager (or GHS LM) is a license manager that is mandatory for all GHS software running on a host machine (as opposed to their embedded products for IoT and other devices). There are 4 available license models:-

- Floating License. The license keys are installed on a network license server
- Named-user. The license keys are installed on the network license server, but only the named user or the administrator can access the license.
- Computer-locked. The license key is installed on a specific machine
- Dongle-locked. The rights to using the license are stored in a device, such as a dongle. Machines which are cleared to use the software must also have a license key installed.

There is also a "Legacy" license available for very old software versions.

OpenLM provides the following functionality for monitoring Green Hill licenses:

- Denials reporting *No*
- Report resolution *By minute*
- Borrowed license reporting *No*
- Expiration date reporting *Yes*
- Multiple server redundancy support *No*
- Token license support *No*

Greenhills GHS is only one of over 70 license managers that OpenLM can manage. [Check the list](https://www.openlm.com/license-manager-capabilities/).

### Parsing Green Hills logs

OpenLM has [added the Green Hills license](https://www.openlm.com/application-notes-v3-0/monitoring-app-usage-v3-0/configuring-openlm-to-interface-the-greenhills-license-manager-an4001v/) manager to its portfolio of monitored license servers starting from version 3.2.

Green Hills log files are also interpreted in the OpenLM "All License Parser" online tool.

### Who is Green Hills?

Greenhills Software (GHS) was founded in 1982 in California, and specializes in real-time operating solutions (RTOS) and embedded security systems for protection of IoT devices. Their flagship product is the Integrity RTOS, which holds the highest certification by the NSA of EAL 6+ High Robustness, which certifies it for the protection of critical resources against cyberattack, in industries such as aerospace, where most manufacturers (including Airbus, Boeing, Lockheed Martin) use it for their avionics.

They have also developed a Device Lifecycle Management (DLM) system to help manage devices throughout their life. Their embedded software is supplied with an embedded license. Where GHS software is running on a host machine, customers a required to install the GHS License Manager.
