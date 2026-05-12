---
title: "HTTPS/SSL support for Applications Manager and Broker"
description: Enhanced security for sensitive data transfer can be activated by properly configuring Applications Manager and associated components to use Secure.
sidebar_position: 4
---

## Introduction

Enhanced security for sensitive data transfer can be activated by properly configuring Applications Manager and associated components to use Secure Sockets Layer (SSL) with HTTPS protocol. The purpose of this document is to present basic configuration options for using HTTPS/SSL in Applications Manager network communication.

It is assumed that a certificate will be purchased from a trusted certificate authority. Options for creating a self-signed certificate are not covered in this document.

## Applications Manager configuration

To configure Applications Manager with HTTPS/SSL follow these steps:

### Adding certificate chain to keystore

Configure Applications Manager to use the JKS (Java Key Storage) file as the keystore (repository for security certificates). Certificate files may need to be converted to JKS with synchronized passwords (matching for file and certificate) and the Applications Manager needs to be configured to use the Keystore. The source file has to include the entire chain of certificates from a trusted certificate authority that produced the certificate, not just the one that the user got for a hostname. The "OpenSSL" tool can also be used to produce the required file. The process includes the following:

1. Purchase a Certificate File (from a trusted certificate authority).
2. Convert the Certificate File to JKS format.
3. Synchronize certificate and JKS passwords.

### Configuring Applications Manager to use Keystore

RunC:\Program Files\OpenLM\OpenLM Applications Manager\bin\OpenLM Applications Manager.exe and go to Java tab:

All parameters in Java tab are pre-configured by the installer except for SSL:

-Djavax.net.ssl.keyStore=`<path to the JKS file>`

-Djavax.net.ssl.keyStorePassword=`<password>`

Nothing else is required if Server uses valid SSL certificates signed with a trusted authority.

In case of a self-signed certificate it has to be added to Java trust store.

### Updating Applications Manager properties file

Several parameters need to be updated in ***openlm-app-manager.properties*** file which is used to configure Applications Manager. HTTPS/SSL needs to be enabled using properties and **binding.host** parameters. A secure connection between Applications Manager and OpenLM SLM is established with **openlm.server.protocol** parameter.

1. Locate *openlm-app-manager.properties* file (for example, C:\Program Files\OpenLM\OpenLM Applications Manager) and open it in a text editor (for example, Notepad).

2. Locate **binding.host** parameter and change it to actual host name or IP address (see Figure 1).

![Screenshot: Updating Applications Manager properties file](/img/legacy/app-manager-ssl-003.png)

**Figure 1: Changing Protocol parameter to "https."**

3. Change the protocol parameter to "https" (see **Figure 2**).

![Screenshot 2: Updating Applications Manager properties file](/img/legacy/app-manager-ssl-004.png)

**Figure 2: Changing Protocol parameter to "https."**

4. If your OpenLM SLM is running with SSL, change **openlm.server.protocol** parameter to "**http****s**" (see **Figure 3**).

![Screenshot 3: Updating Applications Manager properties file](/img/legacy/app-manager-ssl-005.png)

**Figure4: Changing Protocol parameter to "https."**

5. Save **openlm-app-manager.properties** file.

6. Restart the Applications Manager to activate the changes.

## Securing Applications Manager Web Services

### Broker Configuration

When Applications Manager is bound to a host name (as opposed to 'localhost') and SSL is activated for Agent, host name and secure parameters have to be added to OpenLM Broker configurations in OpenLM Broker Configurations Tool and lmstat.bat file (lmstat.sh for Linux/Unix).

### Modifying lmstat.bat file

1. Locate **lmstat.bat** file in OpenLM Applications Manager folder (for example, C:\Program Files\OpenLM\OpenLM Applications Manager\lmstat.bat).

2. Open **lmstat.bat** file in any text editor (for example, Notepad).

3. Locate **set host** parameter and change its value to correct HostName IP for your system (see **Figure 9**).

![Screenshot: Modifying lmstat.bat file](/img/legacy/app-manager-ssl-010.png)

**Figure 5: Locating and changing** ***set host*** **parameter.**

4. *[Optional]* Locate **call** parameter and add **-k** to call string if accepting self-signed certificates (see **Figure 10**).

![Screenshot 2: Modifying lmstat.bat file](/img/legacy/app-manager-ssl-011.png)

**Figure 5: Locating and changing call string parameter.**

5. Locate and change **http** parameter to **https**.

![Screenshot 3: Modifying lmstat.bat file](/img/legacy/app-manager-ssl-012.png)

**Figure 6: Locating and changing http parameter to https.**

6. **Save and close** lmstat.bat file.

### OpenLM Broker

1. Run OpenLM Broker  (**[Start] > [OpenLM] > [OpenLM Broker ])**. OpenLM Broker will open.

2. Check the Host Name IP for License Servers. It should match the binding host (for example, it should not be 'localhost').  If the value needs to be changed, click on the localhost node and enter the Host Name IP in the field.

3. Click the **[Apply]** button to commit changes.

4. Click the **Commands** node for Applications Manager (for example, Commands under Port 27080).

5. Click the **[Update]** button on the Commands panel.

6. Click on the **data\_inquery** node to be sure that the Command Line has been updated successfully. Click the **Execute** button to make sure that it works. `<server_status="ok">` message will be displayed.
