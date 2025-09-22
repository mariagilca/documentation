---
title: HTTPS/SSL Support for Applications Manager and Broker
sidebar_position: 4
description: Guide to enabling HTTPS/SSL support for OpenLM Applications Manager and Broker.
---


To configure OpenLM Applications Manager for **SSL/HTTPS** communication, you must update its certificate settings and properties file, as well as the related OpenLM Broker and `lmstat.bat` configurations. This process ensures secure data transfer.

***

### Applications Manager Configuration

1.  **Add a certificate chain to the keystore**: First, you need to purchase a certificate from a trusted authority. Then, convert the certificate file to **JKS format** and ensure the passwords for the certificate and the JKS file are synchronized.
2.  **Configure the keystore**: In `C:\Program Files\OpenLM\OpenLM Applications Manager\bin\OpenLM Applications Manager.exe`, go to the **Java** tab and manually configure the following SSL settings:
    * `-Djavax.net.ssl.keyStore=<path to the JKS file>`
    * `-Djavax.net.ssl.keyStorePassword=<password>`
3.  **Update the properties file**: Open the `openlm-app-manager.properties` file in a text editor.
    * Change the `binding.host` parameter to your system's actual hostname or IP address.
    * Set the `protocol` parameter to **`https`**.
    * If your OpenLM SLM is also running with SSL, set the `openlm.server.protocol` parameter to **`https`**.
4.  **Restart the service**: Save the file and restart the **Applications Manager** service to apply the changes.

***

### Securing Web Services

When the Applications Manager is configured with SSL, you must also update the OpenLM Broker and `lmstat.bat` file.

1.  **Modify `lmstat.bat`**: Open the `lmstat.bat` file in the Applications Manager folder.
    * Change the `set host` parameter to the correct HostName IP for your system.
    * Change the `call` parameter to use the `https` protocol instead of `http`.
    * Save and close the file.
2.  **Update OpenLM Broker**: Open the **OpenLM Broker Configuration Tool**.
    * Verify that the **Host Name IP** for **License Servers** matches the `binding.host` you configured and isn't set to `localhost`.
    * Click **`[Apply]`** to save changes.
    * Click the **Commands** node for Applications Manager, and then click **`[Update]`** to apply the new path settings.
    * To confirm the changes, click the `data_inquiry` node and click **`Execute`**. A `<server_status="ok">` message will confirm the configuration is working.