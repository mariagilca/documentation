---
sidebar_position: 11
---

# Dongle Monitoring

## Overview

With **Dongle Monitoring** you can track USB devices (Dongle License Keys) connected to your PCs using Workstation Agent. This way, license managers can monitor location and usage frequency of dongle-based licenses. 

You can't monitor application usage directly through Dongle Monitoring. For application-level usage tracking, use the **Unmanaged Process Feature** along with Workstation Agent.

You can also denylist a specific USB dongle if it’s stolen, lost, or returned to a vendor, and set alerts to notify you if it connects again, helping you avoid compliance issues.

## Prerequisites

- Install and connect **Workstation Agent** using **Agent Activity Manager** on all target PCs.

## Configuration

To configure Dongle Monitoring:

1. Activate **Dongle Monitoring** in **Product** microservice on **Home** page.
2. Open **Dongle Monitoring** and follow Tour Guide to complete your setup.

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

### Denylist USB devices

If you lose a USB dongle or return to the vendor, you can denylist it:

1. Add the DeviceID of the dongle to the **Blacklist** in Dongle Monitoring.
2. Set up an alert in the **Alerts** ([Alert setup](alerts.md)) to receive notifications if the denylisted device reconnects.
3. Configure email notifications in **Notification** microservice ([Notification setup](notifications.md)).
4. Toggle notifications to **on**.

