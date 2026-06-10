---
title: "License harvesting (Manual method), and Monitoring Idle Application time"
description: License managers may sometimes label licenses as occupied, when in fact they are idle and wasting limited company resources. System administrators can.
sidebar_label: "License harvesting (Manual method), and Monitoring Idle Application time"
---

{/* Source: https://www.openlm.com/knowledge-base/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/ */}

License managers may sometimes label licenses as occupied, when in fact they are idle and wasting limited company resources. System administrators can use the OpenLM EasyAdmin User Interface to identify such conditions and retrieve idle licenses either manually or automatically.

This document describes how to monitor application idle time and harvest idle licenses manually.

## Idle application

If the user has not been actively using the license, the idle period would be shown in the OpenLM EasyAdmin User Interface 'Start' → 'Operational' → "Currently consumed licenses" → "Recent App. Idle period" column. This information is sampled by the OpenLM Workstation  Agent module on each client workstation and propagated to the OpenLM SLM.

## Setting a process to license link

To obtain idle time information, follow these steps

1. Make sure you have OpenLM Workstation Agent installed on the end user's workstation.

2. Open the EasyAdmin interface: Windows **Start → OpenLM → OpenLM EasyAdmin User Interface**.

3. Select the EasyAdmin **Start → Administration**.

4. Select **Process Features**.

5. If the process you wish to monitor is not already on the list of processes, it will need to be added manually:

a. Select the Windows Start button.

b. Go to **Task Manager  →  Processes tab**. The Processes table window should appear.

c. Find the required process and copy its exact format name (case sensitive).

d. To add the new process to the currently managed processes' list, select the  Add icon in the Process List frame, on the top right-hand side of the Process features window. The Add Process window will appear. For processes that already exist in the process list, select them and select Edit. An identical Edit process window will appear (see the following section).

e. Add features to the selected application. You can add features one at a time by selecting the Add + on the bottom-right corner of the Process features window, or all of them by selecting the Add All Vendor's features +.

6. Configure the process window to monitor idle licenses:

![Screenshot: Setting a Process to License link](/img/legacy/Screenshot-2023-01-24-at-23.28.57.png)

* Type the "Process name" as obtained in item 5c (above), e.g: ArcMap.
* Input a description of the managed process, and
* The application's Vendor name is exactly as appears in the license file. for example, ARCGIS
* Check the **Enabled** box and the **Track process idle/active periods** box.
* Set the System resource thresholds. These numbers indicate the thresholds under which a process is considered idle.
* Set the Idle time report threshold. This is the minimum period before an inactive session is reported as idle.

After completing the process described above in paragraphs 1 through 6, the Workstation is set to monitor the managed process. For software suites like ArcGIS that use the same license for multiple applications (for example, ArcMap, ArcCatalog, ArcGlobe), these steps will have to be repeated with the same idle time values for each application that you want to control.

## Monitoring idle time and retrieving licenses manually on the CCL window

To open the EasyAdmin Currently Consumed Licenses (CCL) Window: EasyAdmin **Start →  Operational  →  Currently Consumed Licenses**.

This window lists all currently active sessions. Using this window, Administrators can monitor individual workstations that run licensed applications. They can detect idle applications and shut them down with a mouse select. To do so, an OpenLM Workstation Agent module must be installed on each client workstation.

## Workstation idle time

The end user's workstation idle time is recorded and presented in the "Workstation Idle time" column.

## Recent application idle period

Records the recent idle time of a specific application.

## Linger time

A lingering license stays checked out for a specified period beyond its check-in or FlexEnabled application exit, whichever comes first.

## Linger due

The Linger Due is the actual time the license is returned to the pool to be claimed by another user.

## View idle times

Select the dark-shaded crescent moon icon for a graphic view of idle and active time as well as a list of idle periods.

## License removal

Administrators have the option to manually remove a license from a specified workstation. This is done by highlighting the user row on the Active Products window and selecting the Remove License icon. Several constraints are specific to this feature:

* The end user must have been inactive for a minimum period for this license to be retrieved. This value is set by default to 5 minutes in compliance with the FLEXlm license manager's limitations.
* If the license is not associated with any real product activity on the specified workstation (as happens when a license gets artificially "frozen" on a computer), then the license will be released and returned to the pool of available licenses.
* If the worker is using the product, then re-obtaining a license would be automatically attempted. If this happens the license for that product and workstation will reappear on the active products screen, with a new handle number.
* Manual License removal does not work for ArcGIS 10.

### Closing applications

To manually close an application on the workstation,  an administrator should highlight the relevant row, and select the Close Application icon.

This operation will retrieve the license back to the license pool, save the open project,  and the application itself will be shut down.

Some constraints are specific to this feature:

* It requires a proper installation of the Workstation Agent module.
* It works only on extension-enabled applications. At the time of writing this revision, these include MATLAB, AUTOCAD, ARCGIS, ARCGIS PRO, SOLIDWORKS, AND CATIA.

### Common constraints

Several constraints are common to both the License Removal and Application Closure features. These are as follows:

* These features are only applicable to the FLEXlm license manager.
* A Workstation Agent module must be properly installed on each Client workstation.
* Borrowed licenses (AKA "Linger licenses") can not be retrieved through the EasyAdmin application.
