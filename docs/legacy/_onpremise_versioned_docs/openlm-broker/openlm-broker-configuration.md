---
title: OpenLM Broker Configuration
sidebar_position: 4
description: Learn how to configure OpenLM Broker for license server communication and monitoring.
---



OpenLM can track the idle times of processes monitored by the **OpenLM Workstation Agent**. This guide explains how to configure actual usage measurement for features managed by the **Applications Manager**, using Notepad as an example process. This setup requires **OpenLM SLM**, **OpenLM Applications Manager**, **OpenLM Broker**, and **OpenLM Workstation Agent**.

***

### Configuring the process

Configuration for tracking idle time takes place in the OpenLM EasyAdmin User Interface, under **Process Features**.

1.  Start the EasyAdmin User Interface.
2.  Navigate to **Start → Administration → Process Features**. 
3.  Click the **`[Add]`** button in the upper right of the screen.
4.  In the **Add Process** screen, enter the **Process Name**, a **Description**, and the **Vendor Name**. Make sure to check both the **`Enabled`** and **`Track process idle/active periods`** boxes.
5.  Click **`[Save]`**. A new row for the process will be added to the upper half of the screen.
6.  Click on the new row to activate it, then click the **`[+Add Vendor’s Features]`** button at the lower right.
7.  Click **`[Yes]`** on the confirmation screen to accept the changes. The feature names associated with the process will populate in the bottom half of the window.

***

### Observing actual usage

After a feature is consumed, you can monitor idle times using the **Currently Consumed Licenses** screen. Navigate to this screen from the Start menu by going to **Start → Operational → Currently Consumed Licenses**.

Clicking the **Idle Times** icon to the right of a row will display the **Session Active/Idle Ratio** screen.

***

### Limitations

The actual usage configuration will not work in these cases:

* The same process is already defined in **Unmanaged Processes**.
* The same process is already configured in **Process Products** using **'Extension'** as the release method.