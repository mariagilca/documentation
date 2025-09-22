---
title: License Harvesting (Manual Method) and Monitoring Idle Application Time
sidebar_position: 1
description: Guide to manually harvesting licenses and monitoring idle application time in OpenLM.
---

## Managing idle licenses
License managers may label licenses as occupied even when they are idle, wasting company resources. OpenLM's EasyAdmin User Interface allows system administrators to identify these idle licenses and retrieve them manually or automatically. This document describes how to monitor application idle time and manually harvest licenses.

## How to track idle applications
To obtain idle time information, the OpenLM Workstation Agent module must be installed on each client workstation. The agent samples idle time and propagates it to the OpenLM Server.
Idle time is shown in the "Currently consumed licenses" window in the "Recent App. Idle period" column. 

## To set up idle time tracking:

Open the EasyAdmin interface: Start → OpenLM → OpenLM EasyAdmin User Interface.

Click Start → Administration.

Select Process Features.

If the process isn't listed, add it manually.
a.  Open Windows Task Manager and go to the Processes tab.
b.  Find the process and copy its exact name (case-sensitive).
c.  In the Process features window, click the Add icon. The Add Process window will appear. For existing processes, select it and click Edit.
d.  Add features to the application by clicking Add + or Add All Vendor's features +.

Configure the process window to monitor idle licenses.

!

Type the Process name exactly as it appears in Task Manager (e.g., ArcMap).

Input a description for the managed process.

The application's Vendor name must match the name in the license file (e.g., ARCGIS).

Check the Enabled box and Track process idle/active periods box.

Set the System resource thresholds. These numbers define the activity level below which a process is considered idle.

Set the Idle time report threshold. This is the minimum period of inactivity before a session is reported as idle.

For software suites like ArcGIS that use the same license for multiple applications (e.g., ArcMap, ArcCatalog, ArcGlobe), repeat these steps with the same idle time values for each application you want to control.

## Manually retrieving licenses
To monitor idle time and retrieve licenses, go to the Currently Consumed Licenses (CCL) window: EasyAdmin → Start → Operational → Currently Consumed Licenses.

This window lists all currently active sessions and allows administrators to monitor and manage them. With a workstation agent installed, you can detect idle applications and shut them down with a single click.

## Workstation Idle Time: 
Shows the idle time for the end-user's workstation.

## Recent Application Idle Period: 
Shows the recent idle time for a specific application.

## Linger Time: 
The period a license remains checked out after its application has exited or a check-in occurred.

## Linger Due: 
The exact time a lingering license will be returned to the license pool.

## View Idle times: 
Click the dark crescent moon icon for a graphic view of idle periods.

## License removal
Administrators can manually remove a license from a workstation by highlighting the user row and clicking the Remove License icon.

:::caution
Manual license removal does not work for ArcGIS 10.
:::

There are some constraints for this feature:

The end user must have been inactive for at least 5 minutes. This is the default value to comply with FLEXlm license manager limitations.

If the license is "frozen" on a computer and not associated with any active product, it will be released and returned to the license pool.

If the user is actively using the product, the system will automatically try to re-obtain a license, and the license will reappear in the active products list with a new handle number.

## Closing applications
Administrators can manually close an application on a workstation by highlighting the row and clicking the Close Application icon. This operation saves the open project, shuts down the application, and returns the license to the pool.

:::note
This feature requires a properly installed Workstation Agent and only works on extension-enabled applications like MATLAB, AUTOCAD, ARCGIS, ARCGIS PRO, SOLIDWORKS, and CATIA.
:::

## Common constraints
These constraints apply to both License Removal and Application Closure:

The features are only applicable to the FLEXlm license manager.

A Workstation Agent module must be properly installed on each client workstation.

Borrowed or "Linger" licenses cannot be retrieved via the EasyAdmin application.

Referenced Images
img/openlm-process-features-window.png
