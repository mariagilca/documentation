---
title: OpenLM Reports Scheduler Installation Guide
sidebar_position: 1
description: Step-by-step guide to installing and setting up the OpenLM Reports Scheduler.
---

## System requirements
To install OpenLM Reports Scheduler, the following prerequisites must be met:

A single OpenLM SLM installation on a central network server.

An OpenLM license that includes support for the Reports Scheduler extension. If you can't find the Reports_Scheduler feature in the Administration → OpenLM License window, contact OpenLM sales.

(Optional) If you don't use the bundled OpenJDK 11, a compatible version of Java 11 must be on the target machine.

## Installation
OpenLM Reports Scheduler should be installed on the same machine as the OpenLM SLM.

Download the latest installer from the Downloads page.

Double-click the installer file (e.g., Openlm_Reports_Scheduler_XXXX.exe) to start the installation.

Click Next to proceed to the License Agreement screen.

Check the I accept the terms of the License Agreement box and click Next.

On the Choose Install Location screen, you can change the installation folder. It's recommended to leave the default setting. Click Next.

The Choose Components screen displays the components to be installed. You can uncheck JRE if you prefer to use an external Java 11 installation, but we recommend keeping the default settings. Click Install.

Click Next, then Finish to close the wizard.

To verify the installation, open the Services window and confirm that the "OpenLM Report Scheduler" service is running.

For configuration, refer to the Reports Scheduler configuration guide.