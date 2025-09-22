---
title: Directory Sync v2x Configuration
sidebar_position: 1
description: Guide to configuring Directory Sync v2x in OpenLM.
---


This is a comprehensive guide on how to synchronize the OpenLM Database with an organization’s directory service using Directory Sync. For a guide on setting up Directory Sync on Cloud, see this guide. For details on the mappings between LDAP and OpenLM attributes, see this link.

## Overview
OpenLM's Directory Sync synchronizes the OpenLM database with user information from a domain directory like Active Directory. The product consists of two components:

Directory Synchronization Service (DSS): Connects to OpenLM SLM, stores sync definitions, and manages agents. It can be installed on the same or a separate machine.

Directory Synchronization Agent (DSA): Connects to the DSS, queries the domain directory based on sync definitions, and reports data back to the DSS. One or more DSAs can be installed on the same or separate machines.

The DSS sends the data received from the DSA back to the OpenLM SLM.

## Requirements
OpenLM SLM 21 or higher.

A license file with support for the Directory Sync extension.

If installed separately from the OpenLM SLM, the DSS and DSA machines must be on the same network as the AD domain controller.

A designated schema in a supported database (MariaDB, MS SQL, or MySQL). Firebird has been deprecated.

## Port configuration
Port 8081 must be free for DSA installation. If not, edit kestrel.config in the DSA installation folder to change the port and restart the service.

Firewall rules must be configured for the following ports:

OpenLM SLM machine: inbound for 5015, outbound for 7026.

DSS machine: inbound and outbound for 7026.

DSA machine: outbound for 7026.

## Configuration
## Directory Synchronization Service (DSS)
Open the Directory Sync user interface.

Click the Service Configuration tab on the left menu.

Fill in the details for OpenLM SLM and DSS Server. The IP/Hostname for each must be accurate, and if using SSL, the hostname must match the certificate. The kestrel.config file can be edited to change the DSS port.

Optionally, configure the Time&Date and use the Advanced tab to delete users and groups (an irreversible action).

Click Apply to send a connection request to OpenLM SLM.

Open EasyAdmin and go to Start → Administration → External Platforms.

Click the DSS tab, then click Approve to establish the connection.

If you have previous LDAP sync definitions, you must decide what to do with them. If not, you must add at least one DSA instance before configuring domains.

## The workflow of DSS with OpenLM SLM and identity configured with SSL (HTTPS)
If OpenLM SLM and Identity are on SSL, change the Server's IP/hostname in the DSS UI to https://FQDN and click Apply.

Update the Identity Service location in the DSS appsettings.json file manually or by changing the DSS URL in the Identity UI's Security settings.

Restart both the DSS and DSA services.

## DSS & DSA SSL configuration
Turn on the SSL toggle in DSS and provide the certificate path and password.

Restart the DSS service.

In the Identity Service UI, provide the new DSS URL (https://FQDN:port).

Restart DSS again.

In the DSS UI, update the DSS Server IP/Hostname to the new URL and click Apply.

## Upgrading from Directory Sync 1.4
If upgrading from a Firebird database, a "Migrate data" checkbox will appear in the DSS wizard. Check this box, select your desired database, and fill in the details. After installation, update the Server's configuration details in the Service Configuration tab of the new DSS page.

## DSS configuration tools
DB Configuration: This tool configures which external database (MariaDB, MySQL, or MS SQL Server) DSS will use. You must have a created database and then use this tool to configure the server name, port, database name, and user credentials.

## DB Upgrade:
This tool upgrades the DSS database to the latest schema, which is necessary for a newly created database.

## Usage
Agent Manager
The Agent Manager tab shows all DSAs controlled by the DSS.

Approve a new agent: Double-click on an agent with the status "Pending approval," select Enabled from the status dropdown, and click Approve.

## Edit an agent's properties:
Double-click an agent to edit its name, description, status, request interval, and sync method (Parallel or Serial).

Edit agent properties in bulk: Check the boxes for multiple agents and click Bulk Edit.

## Delete an agent: 
Select an agent and click Delete.

## Domain Manager
The Domain Manager tab configures the domain directories for synchronization.

## Add a new sync domain: 
Click Add Domain and fill in the details.

Domain type: Select the type (e.g., Active Directory, AzureAD).

Domain name: The hostname/IP of the domain controller.

Port and SSL: The port and whether the connection is SSL encrypted.

Username and Password: Credentials for an administrator account with read access.

## Delete a domain: 
Select a domain and click Delete.

## Sync Manager
The Sync Manager tab configures the synchronization definitions.

Add a new sync definition: Click Add Sync and fill in the fields.

Sync name: A unique name for the sync definition.

Status: Toggle to enable or disable the sync.

Destination & Time: Select the Agent and Domain name. Define the Start node (LDAP path) and Sync schedule (by time or interval).

Object: Select the Sync object type (Users or Computers). For users, you can check the "Only users monitored by the OpenLM" box.

Group Rules: Select the rule for group creation (No groups, Flat, Hierarchical, or Entity attribute).

Manually trigger a synchronization: Click the sync icon to trigger a sync manually.

Reset entity-relationship data: Clears all relationship data for a sync definition.

Stop Sync: Cancels a running sync.

Delete a sync definition: Select a definition and click Delete.

Entities
The Entities tab displays entities created by DSS synchronizations. You can:

Ignore an entity: Check the "Ignore" box for an entity to exclude it from all future synchronizations.

Manually synchronize: Click the sync icon to trigger a manual sync for a specific entity, overriding any ignore flags.

View entity relationships: Click the relations icon to see all relations for an entity.

## Relations
The Relations tab shows all relations an entity has in the DSS database. You can:

Ignore an entity from a specific synchronization: Check the "Ignore" box for a specific relationship to exclude it from that sync.

Click on any of the links to navigate to the corresponding tab for more information.