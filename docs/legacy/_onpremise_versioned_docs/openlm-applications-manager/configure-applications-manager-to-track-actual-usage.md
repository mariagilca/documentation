---
title: Configure Applications Manager to Track Actual Usage
sidebar_position: 8
description: Guide to configuring the OpenLM Applications Manager to track actual software usage.
---

To configure actual usage measurement for features managed by the **Applications Manager** using the OpenLM EasyAdmin User Interface, follow these steps. This setup tracks the idle time of processes monitored by the **OpenLM Workstation Agent**.

***

### Configuring the process

1.  **Start the EasyAdmin User Interface**.
2.  Navigate to **Start → Administration → Process Features**.
3.  Click the **`[Add]`** button. 
4.  In the **Add Process** screen, enter the **Process Name**, a **Description**, and the **Vendor Name**.
5.  Check both the **`Enabled`** and **`Track process idle/active periods`** boxes.
6.  Click **`[Save]`**. A new row for the process will be added.
7.  Click the new row to activate it, then click the **`[+Add Vendor’s Features]`** button.
8.  Click **`[Yes]`** on the confirmation screen to accept the changes. The feature names associated with the process will populate in the bottom half of the window.

***

### Observing actual usage

After a feature is consumed, you can monitor idle times using the **Currently Consumed Licenses** screen.

* Go to **Start → Operational → Currently Consumed Licenses**.
* Click the **Idle Times** icon to the right of a row to display the **Session Active/Idle Ratio** screen.

***

### Limitations

The actual usage configuration will not work if:

* The same process is already defined in **Unmanaged Processes**.
* The same process is already configured in **Process Products** using **'Extension'** as the release method.