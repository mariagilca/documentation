---
sidebar_position: 11
---

# Dongle Monitoring

## Overview

**Dongle Monitoring** lets you track USB devices (Dongle License Keys) connected to your PCs using the Workstation Agent. This feature helps license managers monitor the location and usage frequency of dongle-based licenses. 

You can't monitor application usage directly through Dongle Monitoring. For application-level usage tracking, use the **Unmanaged Process Feature** along with the Workstation Agent ([Learn more](Link)).

You can also blacklist a specific USB dongle if it’s stolen, lost, or returned to a vendor, and set alerts to notify you if it connects again, helping you avoid compliance issues.

## Prerequisites

- Install and connect the **Workstation Agent** using the **Agent Activity Manager** on all target PCs. ([Installation guide](Link))

## Configuration

To configure Dongle Monitoring:

1. Activate **Dongle Monitoring** in the **Product** microservice on the **Home** page.
2. Open the **Dongle Monitoring** microservice and follow the Tour Guide to complete your setup.

### Add USB vendor information

Before monitoring, add USB vendor details:

1. On a PC with the Workstation Agent installed, identify the USB device’s hardware ID (**VendorID** and **ProductID**), for example: `USB\VID_0411&PID_0241`.
2. Enter the required hardware ID information in the Dongle Monitoring microservice.

The Workstation Agent automatically sends connected USB device information to the system every 10 minutes by default.

### Track USB devices (Dongle Keys)

In the **Usage** tab:

- View detailed records of USB dongle connections, including location, connected, and disconnected times.
- Use filters to refine the displayed data.
- If the table is empty, reconnect the USB device to refresh the data.
- Export device records by selecting **Export**.

### Blacklist USB devices

If a USB dongle is lost, stolen, or returned to the vendor, you can blacklist it:

1. Add the DeviceID of the dongle to the **Blacklist** in the Dongle Monitoring microservice.
2. Set up an alert in the **Alerts** microservice ([Alert setup](Link)) to receive notifications if the blacklisted device reconnects.
3. Configure email notifications in the **Notification** microservice ([Notification setup](Link)).
4. Toggle notifications to **on**.

