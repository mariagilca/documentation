---
title: OpenLM EasyAdmin administration
sidebar_position: 8
description: Overview of the OpenLM EasyAdmin interface administration features and settings.
---

## Changing component ports
If you change a listening port for one OpenLM component, you must also update all other components that connect to it as a client. For example, if you change the OpenLM Server port from its default of 5015 to another number, you must also update the configuration of other components that connect to the Server's API.

## OpenLM Server
Access the appsettings.json file to make the necessary changes:

C:\Program Files\OpenLM\OpenLM Server\bin\appsettings.json

!

!

## Identity service
Go to the appsettings.json file to change the port number for the Identity Service:

C:\Program Files\OpenLM\OpenLM Identity Service\SecurityService\appsettings.json

!

!

If you are changing ports of other components, also edit the appsettings.json file:

!

## Broker
After changing the OpenLM Server's port, you can use other ports besides 5015 in the Broker configuration tool.

## Broker UI
Access the broker.xml file:

C:\Program Files\OpenLM\OpenLM Broker\broker.xml

!

## End-User Services
Access the settings.json file:

C:\Program Files\OpenLM\End-User Services\settings.json

!

If you're changing ports for other components, also edit the settings.json file:

!

## Workstation agent
If you are changing ports for other components, edit the settings.json file:

C:\Program Files\OpenLM\Agent\settings.json

!

## Applications Manager
Edit the openlm-app-manager.properties file:

C:\Program Files\OpenLM\OpenLM Applications Manager\openlm-app-manager.properties

!

If you are changing ports for other components, also edit the openlm-app-manager.properties file:

!

## Reports scheduler
Edit the report_scheduler.properties file:

C:\Program Files\OpenLM\OpenLM Reports Scheduler\report_scheduler.properties

!

Also, edit the params.js file:

C:\Program Files\OpenLM\OpenLM Server\bin\wwwroot\params.js

!

If you are changing ports for other components, edit the report_scheduler.properties file again:

C:\Program Files\OpenLM\OpenLM Reports Scheduler\report_scheduler.properties

!

## DSS
Edit the kestrel.config file:

C:\Program Files\OpenLM\OpenLM Directory Synchronization Service\kestrel.config

!

## DSA
Edit the kestrel.config file:

C:\Program Files\OpenLM\OpenLM Directory Synchronization Agent\kestrel.config

!

If you are changing ports for other components, also edit the OpenLM.Ldap.Agent.config file:

C:\Program Files\OpenLM\OpenLM Directory Synchronization Agent\OpenLM.Ldap.Agent.config

!
