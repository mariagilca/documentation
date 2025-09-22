---
title: OpenLM Virtual License Manager: A Comprehensive Guide
sidebar_position: 2
description: Comprehensive guide to OpenLM Virtual License Manager configuration and usage.
---


This document is a comprehensive technical guide to the **OpenLM Virtual License Manager (VLM)**.  
It explains what VLM is, followed by a systematic walkthrough of its functionalities with step-by-step instructions and screenshots.

---

## What is the Virtual License Manager?

VLM is a cloud-based software tool that manages and processes licenses for the **FlexNet Embedded license manager**.  

- Future support for additional license managers is planned, provided they expose external interfaces (APIs, etc.) for retrieving license data and allocations.  
- Currently, VLM is only available in **OpenLM Cloud**. An On-Prem version is planned.  
- A registered account in the **OpenLM Cloud Portal** is required.  

---

## VLM User Roles

VLM has two user roles: **Admin** and **Manager**.

### Admin Role

An **Admin** can:

- Manage **Physical License Managers**, **Virtual License Managers**, **Virtual Pools**, and Manager users.  
- Visualize Physical License Managers and their features.  
- Create Virtual License Managers from one or more Physical License Managers.  
- Delete Virtual License Managers (only if no Virtual Pools are linked).  
- Create Virtual Pools from Virtual License Managers.  
  - A **Virtual Pool** = a set of licenses for a **specific feature** of a License Manager.  
  - Licenses are allocated one-to-one (a single license per user or device).  
  - Licenses subtracted from the source feature when assigned.  
  - When a Virtual Pool is deleted, licenses are returned to the feature pool.  
- Manage Manager Role users (via VLM → Users tab or OpenLM Cloud Portal → IAM → Users).  

### Manager Role

A **Manager** can:

- Visualize Virtual Pools and their license quantities.  
- Allocate or remove licenses to devices/users (by Device ID).  
- Add descriptions/notes to Device IDs (to help identify encrypted users).  
- Manage allocations via a dedicated page accessed through Device IDs.  

---

## How to access Virtual License Manager

1. **Register** for an account on the [OpenLM Cloud Portal](https://www.openlm.com/products/software-license-management-cloud-saas).  
2. **Log in** based on your region:  
   - [OpenLM Cloud Portal – Global](https://cloud.openlm.com/)  
   - [OpenLM Cloud Portal – EU](https://eu-cloud.openlm.com/)  
3. **Activate the VLM product** in the Cloud Portal.  
   ![Activate VLM](img/vlm-activate.png)  
4. **Open the VLM** by clicking the **Open** button.  
   - Admin users see:  
     ![Admin UI](img/vlm-admin-ui.png)  
   - Manager users see:  
     ![Manager UI](img/vlm-manager-ui.png)  

---

## Virtual License Manager User Guide

### Admin Role User Guide

#### Synchronizing with Physical License Managers

1. Go to **Physical LM** in the left menu.  
2. Columns:  
   - **Available Features** → number of assignable features.  
   - **Total Features** → total delivered features.  
3. Assigning features decreases *Available Features*.  
4. If Available = 0 → cannot assign more features.  
   ![Physical LM features](img/vlm-physical-features.png)  

#### Search Functionality

Use the **search bar** to filter Physical License Managers.  
![Search Physical LM](img/vlm-search-physical.png)

#### Column Management, Print & Export

- Click the **three-dot icon** on the top-right to:  
  - Rearrange/hide columns  
  - Print or export CSV  

#### Information Icon

Click the **"i" icon** in the header for page-specific info.  
![Info icon](img/vlm-info-icon.png)

#### Viewing Physical LM Features

- Click the **View icon** at the end of the row.  
- Use search to filter features.  
- Manage/export columns same as above.  
![View features](img/vlm-view-features-1.png)  
![Features table](img/vlm-view-features-2.png)  

#### Creating a Virtual License Manager

1. Go to **Physical License Managers → Create Virtual LM**.  
   ![Create Virtual LM](img/vlm-create.png)  
2. Enter name, type, description.  
3. Select features from Physical LMs.  
4. Click **Save** (or Cancel).  
   ![VLM config](img/vlm-config-1.png)  
   ![VLM config 2](img/vlm-config-2.png)  

The new Virtual License Manager appears in the list.  
- Admins can manage features, pools, columns, search, and exports here.  
- Deletion is possible if no Virtual Pools exist.  
![VLM list](img/vlm-list.png)

#### Creating a Virtual Pool

1. Select a VLM → click **Create Virtual Pool**.  
   ![Create pool](img/vlm-create-pool.png)  
2. Fill name, assign Manager, description.  
3. Select one feature → set license quantity → **Save**.  
   ![Pool config](img/vlm-pool-config.png)  
4. Manage/search/export pools as with LMs.  
   ![Pool view](img/vlm-pool-view.png)  

#### Managing Users

- **Users tab (VLM):** view Manager role users.  
- **Cloud Portal → IAM → Users → Invite User** to add Managers.  
   ![Users tab](img/vlm-users.png)  
- Assign role: **Portal Role = Viewer, VLM Role = Manager**.  
- Invited user sets password via email → logs in with Manager access.  
   ![Invite user](img/vlm-invite-user.png)  

---

### Manager Role User Guide

The **Manager dashboard** = Virtual Pools tab.  

#### Searching Virtual Pools

Use the **search bar** to filter pools by name.

#### Column Management

- Use **three-dot icon** to rearrange/hide columns, print, or export CSV.  
- Use **"i" icon** for page info.  
![Manager column config](img/vlm-manager-columns.png)

#### Viewing Features

- Click **View icon** in Virtual Pools table.  
- Search and manage/export as above.  
![Manager view features](img/vlm-manager-view-features-1.png)  
![Manager features table](img/vlm-manager-view-features-2.png)

#### Managing License Allocation

1. Select a pool → click **Manage Licenses Allocations**.  
   ![Manage allocations](img/vlm-manage-allocations.png)  
2. On **ALLOCATE POOL** page:  
   - Columns include Quantity, Available, Device IDs.  
   - Device IDs column links to device allocation details.  
   ![Allocate pool](img/vlm-allocate-pool.png)  
3. Allocate license: select feature → click **Execute License Allocations**.  
   ![Execute allocation](img/vlm-execute-allocation.png)  
4. Fill Device ID + description → Save.  
   ![Allocation form](img/vlm-allocation-form.png)  
5. License is allocated (sync takes 1–2 minutes).  
   ![Allocation sync](img/vlm-allocation-sync.png)  

#### Removing Allocations

- Click the **Device IDs link** → manage allocations page.  
- Use search, manage columns, print/export as before.  
   ![Device allocations](img/vlm-device-allocations.png)  
- Edit device descriptions:  
   ![Edit description](img/vlm-edit-description.png)  
- Delete allocations:  
   ![Delete allocation](img/vlm-delete-allocation.png)  

---

## Referenced Images

- `img/vlm-activate.png` – Activate VLM product  
- `img/vlm-admin-ui.png` – VLM Admin interface  
- `img/vlm-manager-ui.png` – VLM Manager interface  
- `img/vlm-physical-features.png` – Physical LM features  
- `img/vlm-search-physical.png` – Search Physical LM  
- `img/vlm-info-icon.png` – Info icon  
- `img/vlm-view-features-1.png`, `img/vlm-view-features-2.png` – View features  
- `img/vlm-create.png`, `img/vlm-config-1.png`, `img/vlm-config-2.png` – Create Virtual LM  
- `img/vlm-list.png` – VLM list  
- `img/vlm-create-pool.png`, `img/vlm-pool-config.png`, `img/vlm-pool-view.png` – Virtual Pool setup  
- `img/vlm-users.png`, `img/vlm-invite-user.png` – Users management  
- `img/vlm-manager-columns.png` – Manager column management  
- `img/vlm-manager-view-features-1.png`, `img/vlm-manager-view-features-2.png` – Manager features  
- `img/vlm-manage-allocations.png`, `img/vlm-allocate-pool.png`, `img/vlm-execute-allocation.png` – License allocation  
- `img/vlm-allocation-form.png`, `img/vlm-allocation-sync.png` – Allocation form/sync  
- `img/vlm-device-allocations.png`, `img/vlm-edit-description.png`, `img/vlm-delete-allocation.png` – Managing/removing allocations  


 

 
