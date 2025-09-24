---
title: "OpenLM Server DNS resolving"
sidebar_position: 6
---
OpenLM reports all aspects of license usage e.g. license inventory, license usage, users, and workstations. System administrators often find the IP address of active workstations important, for example, to locate the domain of such workstations.

Some floating license management systems do not report the IP addresses of workstations that had checked out licenses.

The OpenLM Workstation Agent module may provide this information, however, agents are not always deployed on all end users' workstations. The OpenLM Server is able to resolve the IP address of workstations using network services, thus providing the IP.

## DNS resolving configuration

DNS configuration is executed as a background process on the OpenLM Server. In order to configure OpenLM to resolve workstation IPs please:

1. Open the EasyAdmin User Interface **→ Start → Administration → System&Security → Security → Data Management.**
2. Turn the "**Resolve workstations names ...**" toggle on.
3. Set the resolution time.
4. Click **Save**.

The process will take place every 24 hours at the set time. See the screenshot below for clarification: DNS resolving is set to take place every day at 3AM.

![](/img/legacy/Screenshot-2023-08-22-at-19.37.47.png)

Before the first occurrence of the process, no IP addresses will be shown. Between occurrences of the resolving process, some workstations may be shown without IP addresses.

The IP information will later be presented in OpenLM report windows such as the Start → Reports → "License Activity" window (see example below).

![](/img/legacy/Screenshot-2023-08-22-at-19.40.15.png)
