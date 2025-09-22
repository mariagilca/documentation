---
title: Workstation Agent Installation with Microsoft System Center Configuration Manager (SCCM)
sidebar_position: 2
description: Guide for installing the OpenLM Workstation Agent using Microsoft SCCM.
---


I'm unable to access the image URLs you've provided, but I can format the document for you.

***

### Overview

OpenLM supports the installation of the **Workstation Agent** using **System Center Configuration Manager (SCCM)**. This document provides a step-by-step guide for creating and deploying the installation package. The instructions assume you have a working SCCM installation in your environment and on the target workstations. For assistance with SCCM-related tasks, consult your IT department or Microsoft Support.

The installation process has two main stages:
1.  Creating the installation package for the application.
2.  Deploying the application on the target workstations.

---

### Creating the installation package

1.  Locate the Workstation Agent installer (`OpenLM_Agent_Installer_###.msi`) on the SCCM server or a network share.
2.  Open the **SCCM Configuration Management Console**.
3.  Navigate to **Software Library → Overview → Application Management → Applications**.
4.  Right-click on **Applications** and select **Create Application**.
5.  In the **Application Wizard**, select **"Automatically detect information about this application from the installation files"**.
6.  From the **Type** dropdown, choose **"Window Installer (*.msi)"**.
7.  Click **Browse** to locate the MSI file.
8.  Click **Next** to view the imported information, then **Next** again to advance to the **"Specify information about this application"** panel.
9.  Fill in the relevant details, such as **Name**, **Manufacturer**, and **Version**.
10. Modify the **Installation program** field as needed, and set the **install behavior** to **"Install per system"** if targeting a collection of devices, or **"Install per user"** if targeting a collection of users.
11. Click **Next** to review the summary, then click **Next** to create the application.
12. Once the process is complete, click **Close** to exit the wizard.

The new installation package will now be available in the SCCM console.

---

### Deploying applications to target workstations

1.  In the SCCM console, locate the **Workstation Agent** application.
2.  Right-click on the application and select **Deploy**. The **"Deploy Software" Wizard** will open.
3.  Click **Browse** next to the **Collection** field, then select the target user or device collection.
4.  Click **OK** and then **Next**.
5.  On the **Content** screen, click **ADD** to add distribution points. Select the desired points and click **OK**.
6.  Click **Next** to proceed to **Deployment Settings**.
7.  Change the **"Purpose"** dropdown from **"Available"** to **"Required"** to ensure the installation is mandatory.
8.  Click **Next** to configure the **Scheduling** and **User Experience** settings. The default options are generally sufficient.
9.  Click **Next** to advance through the **Alert** and **Summary** screens.
10. On the **Summary** screen, review your settings, and then click **Next** to create the deployment.
11. Click **Close** to exit the wizard.

Upon successful deployment, the Workstation Agent should appear in the **"Software Center"** on the client machine and will install automatically.