---
title: What is the Green Hills license manager?
sidebar_position: 220
description: Overview of the Green Hills license manager and its licensing.
---

### What is Green Hills License Manager?

The **Green Hills License Manager (GHS LM)** is a mandatory license manager for all Green Hills Software (GHS) running on a host machine. It does not apply to their embedded products. GHS offers four main license models:

* **Floating License**: License keys are installed on a network license server, and any user on the network can access them.
* **Named-user**: Licenses are on a network server, but only specific, named users or an administrator can access them.
* **Computer-locked**: The license key is installed and tied to a specific machine.
* **Dongle-locked**: The license is stored on a hardware device (dongle). Machines require both the dongle and a license key to use the software.

GHS also offers "Legacy" licenses for older software versions.

OpenLM provides the following functionality for monitoring Green Hills licenses:

* **Denials Reporting**: No
* **Report resolution**: By Minute
* **Borrowed License reporting**: No
* **Expiration Date reporting**: Yes
* **Multiple Server Redundancy Support**: No
* **Token License Support**: No

---

### Parsing Green Hills logs

OpenLM has supported the Green Hills license manager since version 3.2. Green Hills log files can also be interpreted using the **OpenLM "All License Parser"** online tool.

---

### Who is Greenhills?

**Green Hills Software (GHS)** was founded in 1982 in California. The company specializes in **real-time operating systems (RTOS)** and embedded security systems for protecting IoT devices. Their flagship product is the **Integrity RTOS**, which holds the highest certification from the NSA, **EAL 6+ High Robustness**. This certification is vital for industries like aerospace, where manufacturers such as Airbus, Boeing, and Lockheed Martin use it for their avionics. GHS has also developed a **Device Lifecycle Management (DLM)** system to help manage devices throughout their lifespan.