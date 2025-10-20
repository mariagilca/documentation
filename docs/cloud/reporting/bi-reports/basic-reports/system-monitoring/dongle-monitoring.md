---
sidebar_position: 2
---

# Dongle Monitoring

Definition: The Dongle Monitoring Report provides real-time and historical tracking of hardware dongles used for license enforcement. It shows dongle distribution across hosts, how long users keep them active, which users and manufacturers participate, and flags blacklisted or duplicate devices for security and compliance monitoring.

![Dongle Monitoring](/img/reporting/dongle-monitoring.png)

This report monitors dongle device usage, identifying user behavior, hardware distribution, and security compliance through real-time and historical tracking.

## Visualizations

- **Device Count by Host Name:** Treemap visualization showing the number of dongles connected to each host machine, helping track distribution across systems.

**Values displayed:**

- Host Name
- Device Count

- **Dongle Usage Time by Username:** Bar chart displaying how much time each user has utilized dongles, highlighting top consumers of dongle-based licenses.

**Values displayed:**

- Username
- Dongle Usage Time

- **Dongle Usage Time by Manufacturer:** Bar chart showing total dongle usage time categorized by device manufacturer, helping identify vendor-specific patterns.

**Values displayed:**

- Manufacturer
- Dongle Usage Time

- **Device Count by Manufacturer:** Bar chart summarizing the number of dongles per manufacturer to monitor hardware inventory.

**Values displayed:**

- Manufacturer
- Device Count

- **Dongle Usage Time by Date:** Bar chart showing daily dongle usage times to identify usage trends over the selected period.

**Values displayed:**

- Day
- Dongle Usage Time

- **Total Number of Sessions by Device Name:** Donut chart indicating the number of sessions by specific dongle device names, helping to visualize device-level activity.

**Values displayed:**

- Total Number of Sessions
- Device Name

- **Total Users:** Count of users who use dongles.
- **Average Usage (Hours):** Average dongle usage duration per user.
- **Unique Device Identifier:** Number of unique dongle devices detected.
- **Blacklisted Devices:** Number of blacklisted dongles identified for security monitoring.
- **Filters:**

- **Device Connected Date:** Users can select any date range between 2020/01/01 and 2024/12/01 to filter dongle connection records.
- **Agent Status:** Users can filter by the agent operational status, such as Online or Offline.
- **Device Status:** Users can filter devices based on their status, for example, Active or Blacklisted.
- **Host Name:** Users can select specific host names to view dongle usage by machine.
- **Username:** Users can filter by specific usernames to analyze individual usage behavior.
- **Manufacturer:** Users can select dongle manufacturers to focus on vendor-specific devices.
- **Device Name:** Users can filter by dongle device names to view sessions or usage of specific hardware.
