---
title: "OpenLM コンポーネントのポート変更方法"
description: リスニングポートを変更するだけでは不十分です。ポート番号を変更した後、クライアントとして接続する他のすべてのコンポーネントも新しいポート番号に更新してください。
sidebar_position: 8
---
## ポート変更

リスニングポートを変更するだけでは不十分です。ポート番号を変更した後、そのポートにクライアントとして接続する他のコンポーネントも新しい番号に更新してください。例えば、Server のポートを 5015 から別の番号に変更した場合、他のコンポーネントも 5015 を使って Server API に接続しているため、新しいポートへ変更する必要があります。

## OpenLM Server

C:Program FilesOpenLMOpenLM Serverbinappsettings.json にアクセスして変更します:

![OpenLM Server appsettings.json file location](/img/legacy/word-image-51.png)

![OpenLM Server port configuration in appsettings.json](/img/legacy/word-image-52.png)

## Identity Service

C:Program FilesOpenLMOpenLM Identity ServiceSecurityServiceappsettings.json に移動します。

![Identity Service appsettings.json file location](/img/legacy/word-image-53.png)

![Identity Service port configuration in appsettings.json](/img/legacy/word-image-54.png)

他のコンポーネントのポートも変更する場合:

![Identity Service settings for other component ports](/img/legacy/word-image-55.png)

## Broker

OpenLM Server のポートを変更した後、Broker 設定ツールで 5015 以外のポートを使用できます。

## Broker UI

C:Program FilesOpenLMOpenLM Brokerbroker.xml にアクセスします。

![Broker UI port configuration in broker.xml](/img/legacy/word-image-56.png)

### End-User Services

C:Program FilesOpenLMEnd-User Servicessettings.json にアクセスします。

![End-User Services port configuration in settings.json](/img/legacy/word-image-57.png)

他のコンポーネントのポートを変更する場合:

![End-User Services settings for other component ports](/img/legacy/word-image-58.png)

### Workstation Agent

他のコンポーネントのポートを変更する場合は、

C:Program FilesOpenLMAgentsettings.json

![Workstation Agent port configuration in settings.json](/img/legacy/word-image-59.png)

### Applications Manager

C:Program FilesOpenLMOpenLM Applications Manageropenlm-app-manager.properties

![Applications Manager port in openlm-app-manager.properties](/img/legacy/word-image-60.png)

他のコンポーネントのポートを変更する場合:

![Applications Manager settings for other component ports](/img/legacy/word-image-61.png)

### Reports Scheduler

C:Program FilesOpenLMOpenLM Reports Schedulerreport_scheduler.properties

![Reports Scheduler port in report_scheduler.properties](/img/legacy/word-image-62.png)

C:Program FilesOpenLMOpenLM Serverbinwwwrootparams.js

![Reports Scheduler params.js port configuration](/img/legacy/word-image-63.png)

他のコンポーネントのポートを変更する場合、

C:Program FilesOpenLMOpenLM Reports Schedulerreport_scheduler.properties

![Reports Scheduler settings for other component ports](/img/legacy/word-image-64.png)

### DSS

C:Program FilesOpenLMOpenLM Directory Synchronization Servicekestrel.config

![DSS port configuration in kestrel.config](/img/legacy/word-image-65.png)

### DSA

C:Program FilesOpenLMOpenLM Directory Synchronization Agentkestrel.config

![DSA port configuration in kestrel.config](/img/legacy/word-image-66.png)

他のコンポーネントのポートを変更する場合、

C:Program FilesOpenLMOpenLM Directory Synchronization AgentOpenLM.Ldap.Agent.config

![DSA settings for other component ports in OpenLM.Ldap.Agent.config](/img/legacy/word-image-67.png)
