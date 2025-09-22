---
title: OpenLM Server DNS resolving
sidebar_position: 6
description: Learn how OpenLM Server handles DNS resolving and configuration.
---

## OpenLM Server DNS resolving
OpenLM reports all aspects of license usage, including license inventory, usage, users, and workstations. For system administrators, the IP address of an active workstation is often important for tasks like locating its domain.

Some floating license management systems don't report the IP addresses of workstations that have checked out licenses. While the OpenLM Workstation Agent can provide this information, agents aren't always deployed on all end-users' workstations. To address this, the OpenLM Server can resolve workstation IP addresses using network services.

## DNS resolving configuration
DNS configuration is a background process on the OpenLM Server. To configure OpenLM to resolve workstation IP addresses:

Open the EasyAdmin User Interface.

Go to Start → Administration → System & Security → Security → Data Management.

Turn the "Resolve workstations names..." toggle on.

Set the desired resolution time.

Click Save.

The process runs every 24 hours at the set time. For example, DNS resolving can be set to take place every day at 3 AM.

!

Before the first run of this process, no IP addresses will be shown. Between occurrences of the resolving process, some workstations may be displayed without IP addresses.

The IP information will be presented in OpenLM report windows, such as the Start → Reports → "License Activity" window.

!

Referenced Images
img/dns-resolving-configuration.png

img/license-activity-report-ip.png