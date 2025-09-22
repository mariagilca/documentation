---
title: OpenLM ServiceNOW Adapter Installation and Configuration
sidebar_position: 1
description: Guide to installing and configuring the OpenLM ServiceNOW Adapter.
---

The OpenLM ServiceNow Adapter is a tool that integrates OpenLM with ServiceNow. This document provides instructions for installing the adapter and configuring the External Platforms Service to ensure a successful connection between OpenLM SLM and ServiceNow.

### **Requirements**
To use the adapter, you need:
* The **OpenLM ServiceNow application** in your ServiceNow instance.
* A working **OpenLM SLM v21 or higher** (or an **OpenLM SLMC account**).
* An OpenLM license that supports **External Platforms**. You can verify this by checking the `External_Platforms` flag in **EasyAdmin → Administration → OpenLM License**.

### **Installing the OpenLM ServiceNow Adapter**
1.  **Download** the installer (`OpenLM_ServiceNow_Adapter_Installer_#.#.###.msi`).
2.  **Run the installer** and agree to the license terms.
3.  Click **Next** to start the installation.
4.  Once the installation is complete, click **Finish**. This will automatically open the **External Platforms UI configuration screen**.

### **Configuring the External Platforms Service**
#### **With Identity Service**
If you are using **Identity Service**, you must first connect the adapter to it. Log in to the Identity Service, go to **Settings → Security Configuration**, toggle on the **ServiceNow** button, provide its URL, and click **Save**. Then, restart the ServiceNow Service.

#### **Without Identity Service**
1.  Access the **External Platforms configuration screen** (by default, `http://fqdn:5005/`).
2.  In the **URL** field, enter the path to your OpenLM SLM (e.g., `http://localhost:5015`).
3.  Click **Test Connection** to verify. If successful, click **Save**.

### **Using the External Platform Setup Wizard**
To finalize the integration, use the wizard available in the **EasyAdmin** interface.
1.  Go to **EasyAdmin Start → Administration → External Platforms → ServiceNow**.
2.  Fill in the required fields for either **Basic Authentication** or **OAuth 2.0** and click **Test Connection**. A successful test is required to proceed.
3.  On the **Sync Configurations** screen, define the **sync range**, **schedule**, and whether to **Sync Now**.
4.  On the **ServiceNow Time Zone** screen, select the time zone for the synchronized data.
5.  On the **Notifications** screen, configure global alerts for sync events (Succeeded, Skipped, Failed) and when the service stops reporting. You can enable these alerts in the EasyAdmin UI and/or via email.
6.  Click **Finish** to commit the configuration.

### **Post-installation Steps**
* **For Domain Separation**: If Domain Separation is active, you must run a background script to fix the domain field.
* **For all users**: In ServiceNow, assign the `x_oplm_openlm_data.integration_user` and `sam_eng_app_integrator` roles to the scoped application user.
* Go to **Plugins**, search for `OpenLM`, and click **Install** to install the OpenLM API.