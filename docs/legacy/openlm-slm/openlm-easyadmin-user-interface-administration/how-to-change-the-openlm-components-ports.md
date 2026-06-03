---
title: "How to change the OpenLM components' ports"
description: "Note that it's not enough to just change listening ports. After changing the listening port number, make sure all other components that connect to it as."
sidebar_position: 8
---

## Ports changing

Note that it's not enough to just change listening ports. After changing the listening port number, make sure all other components that connect to it as a client, are also updated for the new port number. for example, if you change Server port 5015 to something else, you also need to change other components to use the new port because they are connecting to Server API through 5015.

## OpenLM Server

Access C:Program FilesOpenLMOpenLM Serverbinappsettings.json to make the required changes:

![OpenLM Server appsettings.json file location](/img/legacy/word-image-51.png)

![OpenLM Server port configuration in appsettings.json](/img/legacy/word-image-52.png)

## Identity Service

Go to C:Program FilesOpenLMOpenLM Identity ServiceSecurityServiceappsettings.json

![Identity Service appsettings.json file location](/img/legacy/word-image-53.png)

![Identity Service port configuration in appsettings.json](/img/legacy/word-image-54.png)

If you are changing ports of other components:

![Identity Service settings for other component ports](/img/legacy/word-image-55.png)

## Broker

Change the ports of OpenLM Server, then you can use other ports other than 5015 in the Broker configuration tool.

## Broker UI

Access C:Program FilesOpenLMOpenLM Brokerbroker.xml

![Broker UI port configuration in broker.xml](/img/legacy/word-image-56.png)

### End-User Services

Access C:Program FilesOpenLMEnd-User Servicessettings.json

![End-User Services port configuration in settings.json](/img/legacy/word-image-57.png)

If you are changing ports for other components:

![End-User Services settings for other component ports](/img/legacy/word-image-58.png)

### Workstation Agent

If you are changing ports for other components,

C:Program FilesOpenLMAgentsettings.json

![Workstation Agent port configuration in settings.json](/img/legacy/word-image-59.png)

### Applications Manager

C:Program FilesOpenLMOpenLM Applications Manageropenlm-app-manager.properties

![Applications Manager port in openlm-app-manager.properties](/img/legacy/word-image-60.png)

If you are changing ports for other components,

![Applications Manager settings for other component ports](/img/legacy/word-image-61.png)

### Reports Scheduler

C:Program FilesOpenLMOpenLM Reports Schedulerreport\_scheduler.properties

![Reports Scheduler port in report_scheduler.properties](/img/legacy/word-image-62.png)

C:Program FilesOpenLMOpenLM Serverbinwwwrootparams.js

![Reports Scheduler params.js port configuration](/img/legacy/word-image-63.png)

If you are changing ports for other components,

C:Program FilesOpenLMOpenLM Reports Schedulerreport\_scheduler.properties.

![Reports Scheduler settings for other component ports](/img/legacy/word-image-64.png)

### DSS

C:Program FilesOpenLMOpenLM Directory Synchronization Servicekestrel.config

![DSS port configuration in kestrel.config](/img/legacy/word-image-65.png)

### DSA

C:Program FilesOpenLMOpenLM Directory Synchronization Agentkestrel.config

![DSA port configuration in kestrel.config](/img/legacy/word-image-66.png)

If you are changing ports for other components,

C:Program FilesOpenLMOpenLM Directory Synchronization AgentOpenLM.Ldap.Agent.config

![DSA settings for other component ports in OpenLM.Ldap.Agent.config](/img/legacy/word-image-67.png)
