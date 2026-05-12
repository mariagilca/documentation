---
title: "Troubleshoot OpenLM Broker by EasyAdmin User Interface messages"
description: "When opening the \"License Servers\" widget in OpenLM's EasyAdmin user interface, you will see status messages."
sidebar_position: 6
---

When opening the "License Servers" widget in OpenLM's EasyAdmin user interface, you will see status messages:

![Description of each possible Broker error](/img/legacy/description-of-each-possible-broker-error-2.png)

### How to troubleshoot each scenario:

**BROKER DOWN:** An OpenLM Broker had connected in the past, but no connection is currently active with the license server machine and OpenLM SLM.

- Is the "OpenLM Broker" service running? Verify in Windows Services.
- Has the hostname or IP changed? Note that the Broker IP or hostname in the OpenLM SLM configuration tool needs to be the same as it is shown in EasyAdmin.
- Is it a network issue?
- In the Broker interface, click on **Check Connectivity to OpenLM SLM.**
- Check if a connection can be established with telnet.

**UNKNOWN**: The connection has been established, but the incoming data can not be identified

- If this is a fresh configuration, this is a normal message which should change in about 3 minutes.
- Is the same License Manager type configured in both the OpenLM SLM configuration tool and the OpenLM Broker configuration tool?
- Does the Broker query the license manager correctly? To verify:
- In the configuration tool, select **Port → Commands → status,** then click on **Execute**. Does the result look OK?
- In the configuration tool, select **Port → Commands → status,** then click on **Execute**. Does the result look OK?
- If the preceding commands do not work, make sure the path to the license manager executable is mapped correctly. Click the Commands node of the required port → click the "**...**" button on the "*Update path for commands*" field → browse to the folder where the executable is located (usually in Program Files)→ click **Open** → click **Update**.
- Did the **Port → Commands →** **data\_inquiry** command line path get mapped correctly? Try re-running the **status** and **data\_inquiry** commands now.
- Did you upgrade the license manager? A lot of times, when upgrading the license manager, the path will change. Refer to point C above.
- Did you install a new license file? Make sure the Broker is pointing to the new license file under the **Port → Advanced** button.

**LM DOWN -** The Broker is operational, but the license manager is currently offline. Verify the status of the license manager and initiate a start or restart as needed.

**NO BROKER -** The Broker is supposed to transmit data, but it has not yet communicated with the OpenLM SLM. This situation may arise during a fresh installation or following a significant upgrade.

**REMOTE SAMPLING -** This configuration does not involve a broker. Instead, the server directly queries a license manager (LM).

**DATA ERROR - T**he Broker is transmitting data to the OpenLM SLM, but there appears to be an issue with the data itself. OpenLM SLM can't parse the data.

**CLUSTER\_ERROR -** Primarily seen with FLEXlm, this error occurs when multiple servers within a cluster or triad incorrectly identify themselves as the master server.

**NOT CONFIGURED -** The Broker is present but has not reported any port-related data.

**BROKER SYNC -** The connection between the Broker and the Server has been disrupted for an extended period, resulting in the Broker reporting data from the past that accumulated during the downtime.

**TIME DIFF ERROR -** The LM configuration in EasyAdmin is incorrect, or there is another timing issue within the LM or Broker, often stemming from Daylight Saving Time adjustments.

**UP (initializing...) -** A data gap, typically attributed to startup processes.

### Other things to check:

1. Which [version](https://www.openlm.com/download/) are you using? Use the latest Broker version. (Back up Broker.xml file and upgrade).
2. If you've upgraded to the latest version and it suddenly stopped working, the broker.xml file may have been corrupted. Uninstall it, clean any trace files, do a fresh install, and replace the XML file with the backup.
3. When using RMS, is the path pointing to lsmon.exe/lservnt.exe? Do they exist in your environment? If not, contact [support@openlm.com](mailto:support@openlm.com).
4. If you receive a "license file is missing" error message despite correctly configuring the license path in the Broker configuration tool, it may be due to an unsupported license file. To address this, toggle off the "Watch license file" option in the Broker configuration tool and the "Read License File" option in the EasyAdmin configuration. Then, restart both the Broker Service and the OpenLM SLM service in Windows Services.![Screenshot: Other things to check:](/img/legacy/Screenshot-2023-10-03-at-16.44.11.png)  
   ![Screenshot 2: Other things to check:](/img/legacy/word-image-42321-3-1.png)
5. If you encounter an issue with the Broker status, be sure to inspect any error messages displayed in the Alert Window as well.![Screenshot 3: Other things to check:](/img/legacy/word-image-42321-4-1.png)
6. The latest FlexLM might not support lmutil.exe. Use the Broker embedded lmutil.exe.![Screenshot 4: Other things to check:](/img/legacy/word-image-42321-5-1.png)
7. The Broker Configuration Tool operates within the context of a Windows logon account, whereas the Broker Service runs using a local system account. Certain license managers may encounter permission problems when attempting to run data\_inquiry commands under a local system account. To resolve this issue, it is advisable to switch the Service account to a Windows logon account.
8. The "Empty Feature List" error message occurs when the streamed data lacks any features. If you are configuring Applications Manager, ensure that you have added features within the Applications Manager Window.![Screenshot 5: Other things to check:](/img/legacy/word-image-42321-6-1.png)
9. For DSLS, set date\_format as blank and a locale as en\_US. If it doesn't work, find the correct date\_format and locale according to your license manager.
10. For DSLS, it is essential to mention the vendor name as "Dassault Systèmes." Failing to do so will result in incorrect license output and log parsing.
