---
sidebar_position: 5
---

# Broker Hub

## Overview

The **Broker Hub** provides a central interface to view, approve, or reject brokers installed on license servers. Brokers first report data here, before sending it further to the OpenLM Server for processing.

## Prerequisites

Before Brokers appear in the Broker Hub, you must install them on your license servers.

## Prepare a Broker authorization file

Before installing the Broker on a license server, create an authorization file to authenticate the Broker's connection with OpenLM:

1. From the **Home page**, select **Identity**.
2. Under **Identity**, go to **Authorization** and select **Add Client**.
3. In **Client Type**, select **Broker**.
4. Enter a description (this is optional).
5. Select **Save** to generate the authorization file.
6. Download the authorization file.

## Install a Broker

Follow these steps to install the broker:

1. Download the Broker installer from the OpenLM download page and transfer it to the license server.
2. Double-click the `.msi` file to start installation.
3. Accept the terms and select **Next**.
4. Choose the default option (**Install Broker with Java 11 OpenJDK**) and select **Next**.
5. Keep the default installation directory (recommended), or specify another directory, then select **Next**.
6. Confirm your selections by selecting **Next**.
7. Once installation ends, close the confirmation window.
8. The Broker UI opens automatically in your browser:
   - For local OpenLM installations, select **Continue** under **Local OpenLM Installation**.
   - For cloud installations, select **Continue** under **OpenLM Cloud Account**.

## Import the authorization file

After installation, import the previously generated authorization file:

1. In the Broker UI, upload the authorization file.
2. Select **Continue**.

## Initial setup

The broker automatically detects license managers installed on the license server and checks connectivity.

When detection completes:

- Review detected license managers.
- Open the OpenLM UI to approve the broker and start monitoring.

The Broker Console will show that the OpenLM Server status is **Active**.

## Approve brokers in Broker Hub

Post Broker installation:

1. Open the **Broker Hub** from Home navigation.
2. Locate the new Broker entry marked as **Pending Approval**.
3. Select the OpenLM icon associated with the broker to approve it.
4. In the prompt, select the Broker and choose **Approve**.

After approving the Broker, corresponding license manager entries appear under **Pending Servers**. Review and approve or deny servers as needed.

