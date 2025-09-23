---
title: "Configure Applications Manager to Track Actual Usage"
sidebar_label: "Configure Applications Manager to Track Actual Usage"
---

<!-- Source: https://www.openlm.com/knowledge-base/configure-app-manager-track-actual-usage/ -->

# Configure Applications Manager to Track Actual Usage

## **Introduction**

The OpenLM system can be configured to track idle times of processes that are monitored by OpenLM Workstation Agents. This document outlines how to configure the measurement of actual usage for a feature that is monitored by the Applications Manager. *[NOTE: We will use ‘Notepad' as the process for this example.]* Setup and configuration of the process require OpenLM SLM, OpenLM Applications Manager, OpenLM Broker, and OpenLM Workstation Agent. OpenLM Broker, installed on the same machine as the Applications Manager, reports usage to the OpenLM SLM.

Features (i.e., products and applications) will have to have been previously defined in OpenLM Applications Manager before configuring for actual usage. See the full documentation on OpenLM Applications Manager for configuring features: [OpenLM Applications Manager Installation and Configuration](https://www.openlm.com/application-notes-v3-0/openlm-modules-v3-0/the-openlm-proactive-application-manager-an4058/)

## **Configuring the Process**

Configuration takes place in the OpenLM EasyAdmin User Interface using Process Features.

1. Start EasyAdmin User Interface (In Windows**[Start] > [OpenLM] > [OpenLM EasyAdmin User Interface]**). This will open the EasyAdmin dashboard in a browser.
2. Navigate to Process Features. To do this click**[Start] > [Administration]** to open the Administration screen, then click on the **Process Features** icon (see**Figure 1**). This will open the Administration - Process Features screen. ![](/img/legacy/kb/word-image-26671-1.png)  
   **Figure 1: Locating the Process Features icon.**
3. Add a process. To do this click the**[Add]** button in the upper right of the screen (see **Figure 2**). This will open the Add Process screen. ![](/img/legacy/kb/word-image-26671-2.png)  
   **Figure 2: Locating the [Add] button on the Process Features screen.**
4. Enter the **Process Name**, **Description** and **Vendor Name** fields. Be sure "Enabled" and "Track process idle/active periods" boxes are both checked.  
   *[NOTE: The name of the process should match exactly with the feature to be tracked. Locate process names using Process List****([Start] > [OpenLM] > [Process List])****. The process must be active/running to appear in the list. The Vendor Name must match the vendor name used when configuring products in the Product List screen (click****[Configure]****on the OpenLM Applications Manager tab of the Agent Configuration screen).]  
   *![](/img/legacy/kb/word-image-26671-3.png)  
   **Figure 3: Highlighted entries for Step #4.****
5. Click**[Save]** to return to the Process Features window. A new row will be added to the upper half of the screen (see **Figure 4**).  
   ![](/img/legacy/kb/word-image-26671-4.png)  
   **Figure 4: The new row added to the Process Features screen.**
6. Click on the new row to activate it. Several buttons will appear at the lower right of the screen.
7. Click the**[+Add Vendor's Features]** button (see **Figure 5**). A confirmation screen will appear (see **Figure 6**).  
   ![](/img/legacy/kb/word-image-26671-5.png)  
   **Figure 5: The [+Add Vendor Features] button.**  
   **![](/img/legacy/kb/word-image-26671-6.png)  
   **Figure 6: The Add All Features confirmation screen.****
8. Click**[Yes]**to accept the changes. The feature name(s) associated with the process will populate in the bottom half of the Process Features window. Tracking idle time for features is now set.

## **Observing Actual Usage**

When consuming a feature, you'll be able to monitor idle times using the Currently Consumed Licenses screen (see**Figure 7)**. Navigate to the screen from the Start menu (**[Start] > [Operational] > [Currently Consumed Licenses]**).  
![](/img/legacy/kb/Screenshot-2023-02-24-at-15.55.57.png)

**Figure 7: The Currently Consumed Licenses screen**

Clicking the **Idle Times** icon ( ![](/img/legacy/kb/word-image-26671-8.png) ) to the right of the row will reveal the **Session Active/Idle Ratio** screen.

## **Limitations**

This configuration for measuring actual usage will not work in the following cases:

* The same process is already defined in Unmanaged Processes. *[NOTE: This is an accepted limitation as Applications Manager is a replacement for Unmanaged Processes]*.
* The same process is already configured in Process Products using ‘Extension' as the release method.
