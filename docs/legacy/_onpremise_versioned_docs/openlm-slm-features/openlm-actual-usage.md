---
title: OpenLM Actual Usage
sidebar_position: 5
description: Overview of OpenLM Actual Usage feature and its monitoring capabilities.
---

A major challenge in monitoring network licenses is determining if and how a specific application is being used. OpenLM provides two metrics for this: the duration a license is consumed and the duration the application was actively in use.

Before you can view these metrics, you must take these steps to configure actual usage tracking:

Make sure the OpenLM Workstation Agent is installed on the end user’s workstation.

## Tracking Actual Usage
Open the EasyAdmin user interface.

Click Start → Administration → Process Features.

!(img/openlm-easyadmin-menu.png)

The Process features window will open.

!(img/openlm-process-features-window.png)

If the process you want to monitor is not already on the list, you must add it manually:
a. Go to Administration → Process Features → Add.

!(img/openlm-process-features-add-button.png)

Configure the process window to monitor idle licenses:

Provide a Process name (e.g., ArcMap).

Provide a Description of the managed process.

Provide the application’s Vendor name exactly as it appears in the license file.

Ensure the Enabled, Save process activity, and System resource threshold used boxes are checked.

Set the Idle Time Report Threshold. This is the minimum time before an inactive session is reported as idle.

Set the software resource thresholds. These numbers indicate the thresholds below which a process is considered idle.

After completing these steps, the Workstation Agent is set to monitor the managed process.

Viewing actual usage reports
Open the OpenLM EasyAdmin web application.

Click Start → Operational → Currently Consumed Licenses.

Click the crescent moon icon !(img/crescent-moon-icon.png) for a specific row to view the actual usage of a particular vendor.

This window lists all currently active sessions and allows administrators to monitor individual workstations running licensed applications.

!(img/openlm-currently-consumed-licenses.png)

On the graph, the peaks represent Active Usage, and the flat line represents Idle time.

!(img/openlm-active-usage-graph.png)

You can also view a detailed breakdown of active and idle time.

!(img/openlm-detailed-usage-breakdown.png)