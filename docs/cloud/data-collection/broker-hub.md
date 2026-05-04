---
title: "Broker Hub"
sidebar_position: 1
description: "The Broker Hub provides a central interface to view, approve or reject and mass upgrade Brokers installed on license servers."
---
# Broker Hub

## Overview

The **Broker Hub** provides a central interface to view, approve or reject and mass upgrade Brokers installed on license servers. Brokers first report data here, before sending it further for processing.

 ![Broker Hub showing pending brokers list](/services/broker-hub/pending-brokers.png)
*Broker Hub showing pending brokers list*

## Prerequisites

Before Brokers appear in the Broker Hub, you must install them on your license servers.

### Prepare a Broker authorization file

[Generate a new authorization file](../openlm-administration/identity#generate-a-new-authorization-file)

### Install a Broker
[Component installation guide](/cloud/deployment-operations/components-installation)

## Import the authorization file

After installation, import the previously generated authorization file:

1. In the Broker UI, upload the authorization file.
2. Select **Continue**.

## Initial setup

The broker automatically detects license managers installed on the license server and checks connectivity.

When detection completes:

- Review detected license managers.
- Open OpenLM UI to approve the Broker and start monitoring.

The Broker Console will show that the OpenLM Server status is **Active**.

## Approve brokers in Broker Hub

Post Broker installation:

1. Open the **Broker Hub** from Home navigation.
2. Locate the new Broker entry marked as **Pending Approval**.
![Pending approval Broker entry in Broker Hub](/services/broker-hub/pending.jpeg)
*Pending approval Broker entry in Broker Hub*
3. Select Broker(s) to approve.
4. In the prompt, select the Broker and select **Approve**.

After approving the Broker, corresponding license manager entries appear under [**Pending Servers**](../slm/license-servers.md). Review and approve or deny servers as needed.
