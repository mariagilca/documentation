---
title: "LDAP Connector configuration"
description: LDAP Connector can save User and Group entity data from Source Directory to Amazon S3 or SQS. This is convenient if you would like to make use of entity.
sidebar_position: 3
---

## What is LDAP Connector

LDAP Connector can save User and Group entity data from Source Directory to Amazon S3 or SQS. This is convenient if you would like to make use of entity data for your solution (ex: Software).

## Prerequisites

- [OpenLM SLMC Registration](../slmc/index.md)
- Directory Sync Activation and Configuration if you would like to sync with OpenLM SLM DB.  
  (Not necessary if you just want to sync with Amazon S3 or SQS only)
- LDAP Connector Activation in the Cloud Portal

## Configuration

- Activate the LDAP Connector in Cloud Customer Portal.  
  ![Screenshot: Configuration](/img/legacy/word-image-56143-1.png)
- Set up a source Active Directory in Directory Sync:  
  [https://www.openlm.com/knowledge-base/setting-up-cloud-directory-sync/](https://www.openlm.com/knowledge-base/setting-up-cloud-directory-sync/)
- Active Directory
- eDirectory
- ApacheDS
- AzureAD
- Google CDS
- Configure the Synchronization setting in Directory Sync.

[https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/](https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/)

- Set up a destination System in LDAP Connector.  
  You can register multiple systems. Check connectivity.  
  Amazon S3  
  Amazon SQS  
  ![Screenshot 2: Configuration](/img/legacy/word-image-56143-2.png)
- Go to Directory Sync and manually run Sync.  
  ![Screenshot 3: Configuration](/img/legacy/word-image-56143-3.png)
- In case this doesn't trigger LDAP Connector, delete all entities from Directory Sync Database once and run Sync from scratch.![Screenshot 4: Configuration](/img/legacy/word-image-56143-4.png)
- User and Group entities are saved and synchronized in the registered destination systems.
