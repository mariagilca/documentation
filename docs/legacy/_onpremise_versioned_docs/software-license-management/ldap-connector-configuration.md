---
title: LDAP Connector Configuration
sidebar_position: 3
description: Guide to configuring the OpenLM LDAP Connector.
---

## What is LDAP connector

The LDAP Connector saves user and group entity data from a source directory to Amazon S3 or Amazon SQS.  
This is useful if you want to use entity data in your own solution (for example, a software integration).

## Prerequisites

- [OpenLM SLMC registration](https://www.openlm.com/knowledge-base/openlm-cloud-registration-installation-configuration/)
- Directory Sync activation and configuration if you want to sync with the OpenLM SLM database  
  (not required if syncing only with Amazon S3 or SQS)
- LDAP Connector activation in the Cloud Portal

## Configuration

1. Activate the LDAP Connector in the Cloud Customer Portal.  
   ![Activate LDAP Connector](img/ldap-connector-activate.png)

2. Set up a source Active Directory in Directory Sync:  
   [Setting up cloud directory sync](https://www.openlm.com/knowledge-base/setting-up-cloud-directory-sync/)

   Supported sources include:
   - Active Directory
   - eDirectory
   - ApacheDS
   - Azure AD
   - Google CDS

   Configure synchronization settings in Directory Sync.  
   For details, see the [Directory synchronization comprehensive guide](https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/).

3. Set up a destination system in LDAP Connector.  
   You can register multiple systems and check connectivity.  
   Supported destinations:
   - Amazon S3
   - Amazon SQS  

   ![Set up destination system](img/ldap-connector-destination.png)

4. Go to Directory Sync and manually run a sync.  
   ![Run Directory Sync](img/ldap-connector-sync.png)

5. If the LDAP Connector is not triggered, delete all entities from the Directory Sync database and re-run sync from scratch.  
   ![Delete entities and resync](img/ldap-connector-delete-resync.png)

6. User and group entities are saved and synchronized in the registered destination systems.

---

## Referenced images

- `img/ldap-connector-activate.png` (activation in Cloud Portal)  
- `img/ldap-connector-destination.png` (destination system setup)  
- `img/ldap-connector-sync.png` (run Directory Sync)  
- `img/ldap-connector-delete-resync.png` (delete entities and resync)  
