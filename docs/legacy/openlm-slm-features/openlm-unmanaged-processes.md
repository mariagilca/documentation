---
title: "OpenLM Unmanaged Processes"
description: Every Software feature runs as a process on your PC. To locate it.
sidebar_position: 9
---

## How to monitor "unmanaged" licenses (step-by-step):

Every Software feature runs as a process on your PC. To locate it:

1. Make sure the application you want to monitor is up and running.
2. [Identify the process](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/finding-the-process-id) that is used by the application feature you want to monitor and note down the process name.
3. In the EasyAdmin user interface click **'Start' → 'Administration' → "Unmanaged Processes".  
   ![Screenshot: How to monitor "unmanaged" licenses (step-by-step):](/img/legacy/Screenshot-2023-02-09-at-10.54.10.png)**
4. In the "Unmanaged Processes" window, click the "Add Vendor" icon to add the Vendor to the list of monitored vendors.  
   ![Screenshot 2: How to monitor "unmanaged" licenses (step-by-step):](/img/legacy/Screenshot-2023-02-09-at-10.56.15.png)
5. The Add Vendor pop-up opens:  
   ![Screenshot 3: How to monitor "unmanaged" licenses (step-by-step):](/img/legacy/Screenshot-2023-02-09-at-11.00.01.png)
6. Insert the values as follows:  
   6a. **Type in the software vendor name:**  The vendor's name  
   6b. **Feature Name:** this is a free text field.  
   6c**. Process Name:** Type in the Process name exactly as it is shown in the previously opened Process List tool.  
   6d. **Description:** This is a free text field.

Additional features may be added to the monitored vendor using the "Add" button.

After the Process is configured to be monitored, it will appear on all relevant EasyAdmin user interface windows as well as on the "License Usage Information" window**.**
