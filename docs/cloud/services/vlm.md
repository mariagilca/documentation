---
sidebar_position: 29
---

# Virtual License Manager (VLM)

## Overview

Use Virtual License Manager (VLM) to allocate software licenses to users or devices without tying them to a physical license server. Current release supports **FlexNet Embedded** license managers. Future support for other license managers depends on those systems exposing an external API or similar interface.




## User roles

VLM defines 2 roles:

* **Admin**: Full configuration control.
* **Manager**: Allocates licenses within assigned virtual pools.

### Admin capabilities

Admins can:

* View and manage Physical License Managers, Virtual License Managers, Virtual Pools, and Manager users.
* Create or delete Virtual License Managers and Virtual Pools.
* Assign Virtual Pools to Manager users.

### Manager capabilities

Managers can:

* View assigned Virtual Pools.
* Allocate or remove licenses for individual devices or users.
* Add or edit descriptions for device IDs or user IDs.


## Get started

### 1. Register and log in
1. Register at [OpenLM Cloud Platform](https://cloud-us.openlm.com/).
2. Log in to a regional platform:
   * Global: https://cloud.openlm.com
   * EU: https://eu-cloud.openlm.com

### 2. Activate VLM
In platform, activate Virtual License Manager for your account.

### 3. Launch VLM
Select **Open** on Virtual License Manager tile. System opens Admin or Manager UI based on your role.



## Admin tasks

### View synchronized Physical License Managers
1. Go to **Physical LM**.
2. Review:
   * **Available Features**: Features you can assign to Virtual Pools.
   * **Total Features**: Total features reported by physical manager.

### Create a Virtual License Manager
1. Select one or more Physical License Managers.
2. Select **Create Virtual LM**.
3. Enter name, type, and optional description.
4. Select the features to expose.
5. Select **SAVE**.

### Manage Virtual License Managers
* Monitor available versus total features.
* Delete a Virtual License Manager only if no Virtual Pools depend on it.

### Create a Virtual Pool
1. Open a Virtual License Manager.
2. Select **Create Virtual Pool**.
3. Enter name, allocation manager, and optional description.
4. Select features and define license quantities.
5. Select **SAVE**.

### Manage Virtual Pools
* View available features and allocations.
* Delete pools you no longer need.

### Manage Manager users
* Open the **Users** tab in VLM (or go to **Identity & Access Management > Users**).
* Invite users and assign the Manager role.



## Manager tasks

### View Virtual Pools
1. Select **Virtual Pools**.
2. Use search, column controls, or export as required.

### Allocate licenses
1. Open a Virtual Pool and select **Manage License Allocations**.
2. Choose a feature and select **Execute License Allocations**.
3. Enter a device ID (or user ID) and optional description.
4. Select **SAVE**.

### Remove licenses or edit descriptions
1. Select the **Device IDs** count link in the pool.
2. Select **Edit** to change a description or **Delete** to remove an allocation.

> Sync with underlying license servers can take up to 2 minutes.
