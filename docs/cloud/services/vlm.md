---
sidebar_position: 29
---
# Virtual License Manager (VLM)

## Overview

Virtual License Manager (VLM)** is a solution that helps organizations manage software licenses by allocating them to users or devices virtually. In this version, VLM manages **FlexNet Embedded** license managers, with plans to support additional license managers in the future, provided these systems offer external interfaces such as APIs.




## User Roles in VLM

VLM has 2 user roles:

* **Admin Role**
* **Manager Role**

### Admin Role

Users with Admin Role can:

* View and manage Physical License Managers, Virtual License Managers, Virtual Pools, and users with Manager Role.
* Create and delete Virtual License Managers and Virtual Pools.
* Allocate Virtual Pools to Manager Role users for license management.

### Manager Role

Users with Manager Role can:

* View Virtual Pools and allocate or remove licenses individually to devices or users.
* Add descriptions to devices or user IDs for identification.


## Getting Started with VLM

### Step 1: Register and Log In

1. Register at [OpenLM Cloud Portal](https://www.openlm.com/products/software-license-management-cloud-saas).
2. Log in to the appropriate OpenLM Cloud Portal based on your region:

   * **Global:** [cloud.openlm.com](https://cloud.openlm.com)
   * **EU:** [eu-cloud.openlm.com](https://eu-cloud.openlm.com)

### Step 2: Activate VLM

Activate Virtual License Manager from your OpenLM Cloud Portal account.

### Step 3: Open VLM

Select **Open** on Virtual License Manager product to access VLM interface based on your user role:

* **Admin UI**
* **Manager UI**



## Detailed Usage

### Admin Role Operations

#### Synchronizing Physical License Managers

1. Select **Physical LM** in the navigation menu.
2. Monitor columns:

   * **Available Features:** Features assignable to VLM.
   * **Total Features:** Total number of features provided by each manager.

#### Creating a Virtual License Manager

1. Select the desired Physical License Managers.
2. Select **Create Virtual LM**.
3. Fill in required fields (Name, Type, Description), select features, and Select **SAVE**.

#### Managing Virtual License Managers

* View available features and total features.
* Delete Virtual License Managers (if no Virtual Pools are linked).

#### Creating a Virtual Pool

1. Select a Virtual License Manager.
2. Select **Create Virtual Pool**.
3. Provide details (Name, Allocation Manager, Description), select features, set license quantity, and select **SAVE**.

#### Managing Virtual Pools

* View available features.
* Delete Virtual Pools as necessary.

#### Managing Users with Manager Role

* Access through **Users** tab in VLM or Users and Groups.
* Invite users through **Identity & Access Management (IAM) → Users**.



### Manager Role Operations

#### Viewing and Managing Virtual Pools

* Select **Virtual Pools** in the navigation.
* Manage columns, search, and export data as needed.

#### Allocating Licenses

1. Select a Virtual Pool and then **Manage Licenses Allocations**.
2. Select a feature then **Execute Licenses Allocations**.
3. Enter Device ID and add a description, then select **SAVE**.

#### Removing Licenses and Editing Descriptions

1. Select **Device IDs** number link.
2. Use the **Edit** button to update descriptions or **Delete** button to remove allocations.

**Note:** License synchronization with actual servers might take 1-2 minutes.

