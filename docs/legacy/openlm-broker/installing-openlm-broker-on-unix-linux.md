---
title: "Installing OpenLM Broker on Unix / Linux"
description: This document describes how to install or upgrade OpenLM Broker on Linux/Unix-based systems for different types of distributions that use both systemd.
sidebar_position: 3
---

This document describes how to install or upgrade OpenLM Broker on Linux/Unix-based systems for different types of distributions that use both systemd and alternative init systems. The instructions in this guide have been tested on Ubuntu 18.04 LTS, however, they should apply to other distributions as well.

## System requirements

A working install of JDK must be present on the machine. Consult the [system requirements](https://www.openlm.com/openlm-system-requirements-2/) page for the correct version.

## Installing Broker

Depending on your Linux distribution, there are two ways of installing OpenLM Broker:

- For systems that use systemd, section 2.2 describes how Broker can be installed as a service
- For systems without systemd, section 2.3 describes how Broker can be started as a background process

### Preliminary steps

1. Download the latest version of Broker for Unix/Linux from the OpenLM website downloads section.

2. Extract the archive (OpenLM\_Broker\_#.#.#.#.tar.gz) to a convenient location.

3. Open the **settings.sh** file in your editor of choice. This file holds all the variables required for Broker to operate. It is mandatory to modify the **JAVA\_HOME** variable so that it points to the path of your JDK 11 install.

> *The **JAVA\_HOME** path must **not** end with a trailing slash*.

Optionally, you can also edit the **BROKERSRVNAMEUSER** variable in case you need to launch the service from an account that is different from "root". In this case, you must ensure that all the files in the "OpenLM\_Broker\_X.X.X.X" folder have their ownership reassigned to the new user.

The **BROKERSRVNAME** variable can be changed when you want to install multiple instances of OpenLM Broker in parallel.

Example file:

```
#!/usr/bin/env bash

# Edit this file and customize service name in order to install multiple Broker services in parallel

BROKERSRVNAMEUSER="JohnDoe"

BROKERSRVNAME="openlm_broker_$BROKERSRVNAMEUSER"

BROKERSRVNAMEFILE="$BROKERSRVNAME.service"

#Change JAVA_HOME to point at installation folder

[[ -z "$JAVA_HOME" ]] && JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```

4. Save the file and continue following the following installation steps, depending on your Linux distribution.

### Installing Broker as a service

If your Linux version supports systemd, the following steps will install OpenLM Broker as a service which starts automatically on system start up:

1. Install the Broker as a service:

```
sudo ./broker.sh install
```

2. Test the status of the Broker service:

```
sudo ./broker.sh status
```

3. Run the Broker detection script as per the instructions described in section 4 of this document ("Configuring Broker with detect.sh"). Alternatively, if your Linux install has a desktop user interface, you can run the GUI Broker Configuration tool with:

```
sudo ./broker.sh config
```

### Running Broker as a background process

If your Linux version does not support systemd, the following steps will run OpenLM Broker as a background process instead:

1. Run the Broker process with:

```
sudo ./broker.sh start
```

To open the Broker configuration screen:

```
sudo ./run_brokerconfig.sh
```

## Upgrading an existing Broker installation

To upgrade an existing installation of OpenLM Broker:

1. Download the latest version of OpenLM Broker for Unix/Linux from the OpenLM [Downloads](https://www.openlm.com/download/) section.
2. Remove the current Broker installation
   - If using systemd, uninstall the current Broker services with:

     ```
     ./broker.sh uninstall
     ```
   - If you are not using systemd, stop the Broker process:

     ```
     ./broker.sh stop
     ```
3. Extract the archive (OpenLM\_Broker\_#.#.#.#.tar.gz) to a convenient location.
4. Copy the **broker.xml** and **settings.sh** files from the previous Broker installation folder to the new folder, overwriting if required.
5. Install the Broker services for the new version from the new OpenLM\_Broker\_x.x.x.x folder
   - If using systemd, install the service:

     ```
     ./broker.sh install
     ```
   - If not using systemd, start the process:

     ```
     ./broker.sh start
     ```

> **IMPORTANT**: If your OS does not have systemd, you also need to replace **broker.sh** with the older script from the **broker.sh.tar.gz** archive available inside the main Broker archive.

It's good practice to verify that the settings and license servers have remained the same in the GUI (if your Linux install has one) by running ./broker.sh config as well as checking that the Broker-monitored license managers are showing up in EasyAdmin's License Servers window.

## Broker.sh commands

|  |  |
| --- | --- |
| **Command name** | **Description** |
| install | Installs OpenLM Broker as a service using "systemctl enable" |
| uninstall | Deactivates an already installed OpenLM Broker instance from starting as a service |
| start | Starts the OpenLM Broker service |
| stop | Stops the OpenLM Broker service |
| restart | Restarts the OpenLM Broker service |
| status | Displays the current status of the OpenLM Broker service |
| config | Launches the GUI Broker configuration tool |

Command format:

```
sudo ./broker.sh <command>
```

## Configuring Broker with detect.sh

The function of this script is to detect and add supported license managers ports to the Broker configuration file.

> **For proper operation, detect.sh has to be run as root**.

There are a couple of behaviors that this script exhibits:

- Running detect.sh when no configuration file exists will create a default configuration file with the license manager ports that have been detected as open on the machine.
- Running detect.sh when a configuration file already exists will merge the two files, adding any missing port information to broker.xml. A copy of the original file is created as "broker.xml.backup".

Command format:

```
sudo ./detect.sh <fileName.xml> <On Premise OpenLM SLM IP/Hostname>
```

**NOTE:** the second parameter is optional and is applicable only when configuring a connection to an on-premise OpenLM SLM.

### Examples

This command adds the ports from addonports.xml to the main broker.xml file.

```
sudo ./detect.sh addonports.xml
```

This command adds the ports from the specified XML file along with 10.0.0.12 as a connection to an on-premise OpenLM SLM, with a default setting to port 5015

```
sudo ./detect.sh broker.xml 10.0.0.12
```

### Using detect.sh to import an OpenLM SLMC configuration

If you want to configure your Broker installation to connect to OpenLM SLMC, you must:

- Download the attached broker.xml file that was provided in the initial welcome email when you signed up to OpenLM SLMC
- In case your Broker installation is already configured to actively query one or more license managers, rename the new broker.xml file to avoid overriding the old configuration file (for example, brokerSaaS.xml)
- Copy the file to the location where you have installed OpenLM Broker
- Run detect.sh:

  ```
  sudo ./detect.sh brokerSaaS.xml
  ```
- Restart the Broker service/process:

```
    sudo ./broker.sh restart

```

## Importing the TLS Certificate for Java

To ensure a secure connection between the OpenLM Broker and the OpenLM Server over HTTPS, follow these steps to configure Java to trust the server's TLS certificate.

1. ****Use HTTPS in the OpenLM Server URL****

   Ensure that the OpenLM Server URL uses the https:// scheme:

   ```
   `https://<your-openlm-server>:<port>`
   ```
2. **Check if Java Automatically Imports the Certificate**Some Java distributions automatically import the TLS certificate from the system trust store. Test the connection before proceeding. If the Broker connects successfully, no further action is needed.
3. ****Troubleshoot SSL Errors****

   If you receive SSL-related errors, the issue may be caused by one of the following:

   - Java does not have permission to access the trusted root certificate directory.
   - Java is not configured to use the system trust store.
   - The certificate must be manually added to the Java KeyStore.
4. **Import the certificate using** ****keytool****

   If needed, manually import the TLS certificate to the Java KeyStore:

   ```
   keytool -import -trustcacerts \
     -keystore $JAVA_HOME/lib/security/cacerts \
     -storepass changeit \
     -noprompt \
     -alias mycert \
     -file my-cert.pem
   ```

   > **Note:** Only .crt, .cer, or .pem files are supported. If you have a .pfx file, convert it to .crt before importing.
5. **Restart the Broker**

After importing the certificate, restart the OpenLM Broker service to apply the changes.

## Alternate configurations

It is also possible to import a configuration file from a different machine. This can be useful when there is a need to configure specific ports but there is no GUI, and thus the graphical Broker configuration tool cannot be used.

In such cases all that is required is to copy the broker.xml file from an already configured Broker machine and import it with the detect.sh command. If broker.xml already exists on your machine, make sure to rename the copied file:

```
sudo ./detect.sh brokerAddon.xml
```
