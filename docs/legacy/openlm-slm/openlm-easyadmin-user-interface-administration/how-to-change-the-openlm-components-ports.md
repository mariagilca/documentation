---
title: "How to change the OpenLM components' ports"
sidebar_position: 8
---
## Ports Changing

Please note, that it's not enough to just change listening ports. After changing the listening port number, make sure all other components that connect to it as a client, are also updated for the new port number. E.g. if you change Server port 5015 to something else, you also need to change other components to use the new port because they are connecting to Server API through 5015.

## OpenLM Server

Access C:Program FilesOpenLMOpenLM Serverbinappsettings.json to make the required changes:

![](/img/legacy/word-image-51.png)

![](/img/legacy/word-image-52.png)

## Identity Service

Go to C:Program FilesOpenLMOpenLM Identity ServiceSecurityServiceappsettings.json

![](/img/legacy/word-image-53.png)

![](/img/legacy/word-image-54.png)

If you are changing ports of other components:

![](/img/legacy/word-image-55.png)

## Broker

Change the ports of OpenLM Server, then you can use other ports other than 5015 in the Broker configuration tool.

## Broker UI

Access C:Program FilesOpenLMOpenLM Brokerbroker.xml

![](/img/legacy/word-image-56.png)

### End-User Services

Access C:Program FilesOpenLMEnd-User Servicessettings.json

![](/img/legacy/word-image-57.png)

If you are changing ports for other components:

![](/img/legacy/word-image-58.png)

### Workstation Agent

If you are changing ports for other components,

C:Program FilesOpenLMAgentsettings.json

![](/img/legacy/word-image-59.png)

### Applications Manager

C:Program FilesOpenLMOpenLM Applications Manageropenlm-app-manager.properties

![](/img/legacy/word-image-60.png)

If you are changing ports for other components,

![](/img/legacy/word-image-61.png)

### Reports Scheduler

C:Program FilesOpenLMOpenLM Reports Schedulerreport\_scheduler.properties

![](/img/legacy/word-image-62.png)

C:Program FilesOpenLMOpenLM Serverbinwwwrootparams.js

![](/img/legacy/word-image-63.png)

If you are changing ports for other components,

C:Program FilesOpenLMOpenLM Reports Schedulerreport\_scheduler.properties.

![](/img/legacy/word-image-64.png)

### DSS

C:Program FilesOpenLMOpenLM Directory Synchronization Servicekestrel.config

![](/img/legacy/word-image-65.png)

### DSA

C:Program FilesOpenLMOpenLM Directory Synchronization Agentkestrel.config

![](/img/legacy/word-image-66.png)

If you are changing ports for other components,

C:Program FilesOpenLMOpenLM Directory Synchronization AgentOpenLM.Ldap.Agent.config

![](/img/legacy/word-image-67.png)
