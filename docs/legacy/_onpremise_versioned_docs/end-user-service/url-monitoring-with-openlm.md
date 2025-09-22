---
title: URL Monitoring with OpenLM
sidebar_position: 4
description: Guide to URL monitoring and enforcing personal dashboard user authentication in OpenLM.
---


### **Cloud Services Monitoring with OpenLM**

This document outlines how to configure **OpenLM** to monitor web-based applications and cloud services. This feature requires **OpenLM SLM** or **SLMC**, as well as the **OpenLM Workstation Agent** (v21 or higher) or a dedicated **Browser Agent**. The monitoring is compatible with Chromium-based browsers (Google Chrome, Edge, Vivaldi, Opera, Brave) and Firefox.

***

### **What is Cloud Services Monitoring?**

As applications transition to the web, monitoring cloud service usage becomes critical. OpenLM provides this capability, allowing you to generate detailed reports on how long each user has been active on a specific service. This data offers significant benefits for license management:

* **Saving Unused Licenses**: By identifying users who have an allocated license but are not actively using the service, you can reclaim or reallocate those licenses.
* **Optimizing Usage**: For users who only use a service for a short period each month, you can gain insights into their usage patterns and explore more cost-effective licensing alternatives.

***

### **How to Configure URL Monitoring**

1.  **Access EasyAdmin**: Open the EasyAdmin User Interface and navigate to **Start → Administration → License Manager - Servers**.
2.  **Add License Manager**: Click the **Add License Manager** button.
3.  **Enter Details**:
    * Provide a descriptive title.
    * Select **Browser** as the type.
    * In the **Domain** field, enter the URL of the cloud service you want to monitor.
    * Select the appropriate time zone.
4.  **Save Configuration**: Click **Save**.

Once configured, the **OpenLM Workstation Agent** will automatically report unique cross-browser sessions that match the specified URL to the **OpenLM SLM** every hour.

***

### **Viewing Results**

You can view the results of the monitoring in the **License Activity Report**. The monitored URL addresses will also be visible to end-users in their **Personal Dashboard**.