---
title: Troubleshooting OpenLM Broker via EasyAdmin UI Messages
sidebar_position: 6
description: Guide to troubleshooting OpenLM Broker issues using EasyAdmin user interface messages.
---


### License server status messages

When you open the **“License Servers”** widget in the OpenLM EasyAdmin user interface, you may see one of the following status messages. Here is how to troubleshoot each scenario:

* **BROKER DOWN**: An OpenLM Broker that was previously connected is no longer communicating with the OpenLM SLM.
    * Check if the **"OpenLM Broker"** service is running in Windows Services.
    * Verify that the Broker's hostname or IP in the OpenLM SLM configuration matches the one shown in EasyAdmin.
    * Rule out network connectivity issues.
    * In the Broker interface, click **Check Connectivity to OpenLM SLM**.
    
* **UNKNOWN**: The Broker has connected, but the incoming data cannot be identified.
    * If this is a new configuration, this is normal and should resolve in about 3 minutes.
    * Confirm that the same License Manager type is configured in both the OpenLM SLM configuration and the OpenLM Broker configuration.
    * Check if the Broker is querying the license manager correctly. In the Broker configuration tool, go to **Port → Commands → status** and click **Execute**. If the result is not as expected, ensure the path to the license manager executable is mapped correctly.
    * Verify that the `data_inquiry` command line path is also mapped correctly.
    * If you've upgraded the license manager, the path to the executable may have changed. Update it accordingly.
    * If you've installed a new license file, make sure the Broker is pointing to it under **Port → Advanced**.

* **LM DOWN**: The Broker is running, but the license manager is offline. Verify the status of the license manager and restart it if necessary.

* **NO BROKER**: A Broker is expected to transmit data but has not yet communicated with the OpenLM SLM. This is common during initial installation or a major upgrade.

* **REMOTE SAMPLING**: This status indicates that the OpenLM server is directly querying a license manager without an intermediary broker.

* **DATA ERROR**: The Broker is sending data, but the OpenLM SLM cannot parse it.

* **CLUSTER_ERROR**: This error, mainly with FLEXlm, occurs when multiple servers in a cluster or triad incorrectly identify themselves as the master server.

* **NOT CONFIGURED**: The Broker is present but has not reported any port-related data.

* **BROKER SYNC**: The connection between the Broker and the server was disrupted for a long time, and the Broker is now reporting a backlog of data that accumulated during the downtime.

* **TIME DIFF ERROR**: This is a timing issue in the license manager or Broker, often due to an incorrect configuration in EasyAdmin or Daylight Saving Time adjustments.

* **UP (initializing...)**: A data gap, typically attributed to a startup process.

---

### Other things to check

1.  **Version**: Ensure you are using the latest Broker version. Always back up your `Broker.xml` file before upgrading.
2.  **Corrupted `Broker.xml`**: If an upgrade causes issues, the `Broker.xml` file may be corrupted. Uninstall the Broker, clean any trace files, perform a fresh installation, and then replace the new `broker.xml` file with your backup.
3.  **RMS**: For RMS, check that the path points to `lsmon.exe` or `lservnt.exe`.
4.  **"License file is missing"**: If this error occurs despite a correct path, the file might be unsupported. Toggle off the **"Watch license file"** option in the Broker configuration and the **"Read License File"** option in the EasyAdmin configuration. Then, restart both the Broker and OpenLM SLM services.
5.  **Alerts Window**: Always inspect the Alert Window for additional error messages.
6.  **`lmutil.exe`**: If you are using the latest FlexLM, it may not support `lmutil.exe`. Use the Broker's embedded `lmutil.exe` instead.
7.  **Service Account**: The Broker Service runs as a local system account, which can cause permission issues with certain license managers. To resolve this, switch the Service account to a Windows logon account.
8.  **"Empty Feature List"**: This error indicates that the streamed data has no features. If you are configuring Applications Manager, ensure you have added features in the Applications Manager window.
9.  **DSLS**: For DSLS, set `date_format` as blank and `locale` as `en_US`. If that doesn't work, find the correct date format and locale for your license manager.
10. **DSLS Vendor Name**: For DSLS, the vendor name must be `Dassault Systèmes`. Using any other name will cause incorrect log parsing and license output.