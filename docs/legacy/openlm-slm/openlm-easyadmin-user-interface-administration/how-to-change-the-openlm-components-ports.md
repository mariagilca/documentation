---
title: How to change the OpenLM components' ports
description: Change the listening ports of OpenLM components and update every dependent component so they keep connecting correctly.
sidebar_position: 8
---

## Ports changing

Note that it's not enough to just change listening ports. After changing the listening port number, make sure all other components that connect to it as a client, are also updated for the new port number. for example, if you change Server port 5015 to something else, you also need to change other components to use the new port because they are connecting to Server API through 5015.

## OpenLM SLM

Access C:\Program Files\OpenLM\OpenLM Server\bin\appsettings.json to make the required changes:

![OpenLM Server appsettings.json file location](/img/legacy/word-image-51.png)

![OpenLM Server port configuration in appsettings.json](/img/legacy/word-image-52.png)

## Identity Service

Go to C:\Program Files\OpenLM\OpenLM Identity Service\SecurityService\appsettings.json

![Identity Service appsettings.json file location](/img/legacy/word-image-53.png)

![Identity Service port configuration in appsettings.json](/img/legacy/word-image-54.png)

If you are changing ports of other components:

![Identity Service settings for other component ports](/img/legacy/word-image-55.png)

## Broker

Change the ports of OpenLM SLM, then you can use other ports other than 5015 in the Broker configuration tool.

## Broker UI

Access C:\Program Files\OpenLM\OpenLM Broker\broker.xml

![Broker UI port configuration in broker.xml](/img/legacy/word-image-56.png)

### End-User Services

Access C:\Program Files\OpenLM\End-User Services\settings.json

![End-User Services port configuration in settings.json](/img/legacy/word-image-57.png)

If you are changing ports for other components:

![End-User Services settings for other component ports](/img/legacy/word-image-58.png)

### Workstation Agent

If you are changing ports for other components,

C:\Program Files\OpenLM\Agent\settings.json

![Workstation Agent port configuration in settings.json](/img/legacy/word-image-59.png)

### Applications Manager

C:\Program Files\OpenLM\OpenLM Applications Manager\openlm-app-manager.properties

![Applications Manager port in openlm-app-manager.properties](/img/legacy/word-image-60.png)

If you are changing ports for other components,

![Applications Manager settings for other component ports](/img/legacy/word-image-61.png)

### Reports Scheduler

C:\Program Files\OpenLM\OpenLM Reports Scheduler\report\_scheduler.properties

![Reports Scheduler port in report_scheduler.properties](/img/legacy/word-image-62.png)

C:\Program Files\OpenLM\OpenLM Server\bin\wwwroot\params.js

![Reports Scheduler params.js port configuration](/img/legacy/word-image-63.png)

If you are changing ports for other components,

C:\Program Files\OpenLM\OpenLM Reports Scheduler\report\_scheduler.properties.

![Reports Scheduler settings for other component ports](/img/legacy/word-image-64.png)

### DSS

C:\Program Files\OpenLM\OpenLM Directory Synchronization Service\kestrel.config

![DSS port configuration in kestrel.config](/img/legacy/word-image-65.png)

### DSA

C:\Program Files\OpenLM\OpenLM Directory Synchronization Agent\kestrel.config

![DSA port configuration in kestrel.config](/img/legacy/word-image-66.png)

If you are changing ports for other components,

C:\Program Files\OpenLM\OpenLM Directory Synchronization Agent\OpenLM.Ldap.Agent.config

![DSA settings for other component ports in OpenLM.Ldap.Agent.config](/img/legacy/word-image-67.png)
