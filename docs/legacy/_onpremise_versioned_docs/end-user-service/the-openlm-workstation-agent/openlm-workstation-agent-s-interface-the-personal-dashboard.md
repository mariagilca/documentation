---
title: The OpenLM Workstation Agent's Interface – The Personal Dashboard
sidebar_position: 1
description: Overview of the OpenLM Workstation Agent interface and its Personal Dashboard features.
---


The OpenLM Workstation Agent is a lightweight, optional software component installed on end-user workstations to provide productivity tools and reduce reliance on system administrators. To access its full functionality, you should install the **OpenLM End-User Services** on a separate machine, which enables the **Personal Dashboard**—a web interface for end-users.

***

### Capabilities of the Workstation Agent

The agent offers a variety of tools that enhance the user experience and provide valuable data for administrators.

* **License Visibility**: Users can see who is using a required license and contact them.
* **Idle Monitoring**: The agent monitors and reports idle sessions, allowing administrators to retrieve licenses.
* **License Retrieval**: The agent facilitates both manual and automatic license retrieval through methods like "Suspend and Resume" or "Save and Close."
* **"Unmanaged" Licenses**: It collects usage statistics for software not monitored by a traditional license server.
* **Application Management**: The agent works with the **OpenLM Applications Manager** to enforce administrative rules for application launches.
* **Project Tracking**: It prompts users to select an active project, attributing all license usage to that project.
* **ArcGIS Licensing**: It allows ArcGIS users to set their desired license level (Advanced, Standard, or Basic) before launching the software.
* **Notifications**: The agent sends native browser notifications for events like a released license, a required project selection, or a forbidden application.

***

### Installation and Configuration

The Workstation Agent installer is available in the **Downloads** section of the OpenLM website and can be installed manually or silently.

* **Project Page**: The "Project" page in the Personal Dashboard is hidden by default. To enable it, navigate to **EasyAdmin → Start → Administration → Projects** and check the **"Log projects information"** box. You can also allow users to create new projects by checking the **"Show "Create New Project" in the Agent menu"** box.
* **Agent Settings**: The **"Agent Policy"** window in the EasyAdmin UI is where you can configure all Workstation Agent settings.

***

### End-User Features

* **Recently Closed**: This window logs applications that were automatically closed by OpenLM to retrieve a license. Users can click the process name to resume the application and check out a new license.
* **License Repository**: This page allows end-users to query license availability. Administrators can filter the information presented to users by using a search box, applying **roles and permissions**, or manually hiding specific features.
* **Product Licensing Level**: For ArcGIS, users can select their preferred license level for either ArcGIS Desktop or ArcGIS Pro before starting the application.