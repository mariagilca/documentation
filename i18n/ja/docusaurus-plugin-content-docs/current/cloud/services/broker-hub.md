---
sidebar_position: 5
---

# Broker Hub

## Overview

The **Broker Hub** provides a central interface to view, approve, or reject brokers installed on license servers. Brokers first report data here, before sending it further for processing.

## Prerequisites

Before Brokers appear in the Broker Hub, you must install them on your license servers.

### Prepare a Broker authorization file

[Generate a new authorization file](../services/identity#generate-a-new-authorization-file)

### Install a Broker
[Component installation guide](../install/components_installation)

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

