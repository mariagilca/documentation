---
title: "OpenLM コンポーネントのポート変更方法"
sidebar_position: 8
---
## ポート変更

リスニングポートを変更するだけでは不十分です。ポート番号を変更した後、そのポートにクライアントとして接続する他のコンポーネントも新しい番号に更新してください。例えば、Server のポートを 5015 から別の番号に変更した場合、他のコンポーネントも 5015 を使って Server API に接続しているため、新しいポートへ変更する必要があります。

## OpenLM Server

C:Program FilesOpenLMOpenLM Serverbinappsettings.json にアクセスして変更します:

![](/img/legacy/word-image-51.png)

![](/img/legacy/word-image-52.png)

## Identity Service

C:Program FilesOpenLMOpenLM Identity ServiceSecurityServiceappsettings.json に移動します。

![](/img/legacy/word-image-53.png)

![](/img/legacy/word-image-54.png)

他のコンポーネントのポートも変更する場合:

![](/img/legacy/word-image-55.png)

## Broker

OpenLM Server のポートを変更した後、Broker 設定ツールで 5015 以外のポートを使用できます。

## Broker UI

C:Program FilesOpenLMOpenLM Brokerbroker.xml にアクセスします。

![](/img/legacy/word-image-56.png)

### End-User Services

C:Program FilesOpenLMEnd-User Servicessettings.json にアクセスします。

![](/img/legacy/word-image-57.png)

他のコンポーネントのポートを変更する場合:

![](/img/legacy/word-image-58.png)

### Workstation Agent

他のコンポーネントのポートを変更する場合は、

C:Program FilesOpenLMAgentsettings.json

![](/img/legacy/word-image-59.png)

### Applications Manager

C:Program FilesOpenLMOpenLM Applications Manageropenlm-app-manager.properties

![](/img/legacy/word-image-60.png)

他のコンポーネントのポートを変更する場合:

![](/img/legacy/word-image-61.png)

### Reports Scheduler

C:Program FilesOpenLMOpenLM Reports Schedulerreport_scheduler.properties

![](/img/legacy/word-image-62.png)

C:Program FilesOpenLMOpenLM Serverbinwwwrootparams.js

![](/img/legacy/word-image-63.png)

他のコンポーネントのポートを変更する場合、

C:Program FilesOpenLMOpenLM Reports Schedulerreport_scheduler.properties

![](/img/legacy/word-image-64.png)

### DSS

C:Program FilesOpenLMOpenLM Directory Synchronization Servicekestrel.config

![](/img/legacy/word-image-65.png)

### DSA

C:Program FilesOpenLMOpenLM Directory Synchronization Agentkestrel.config

![](/img/legacy/word-image-66.png)

他のコンポーネントのポートを変更する場合、

C:Program FilesOpenLMOpenLM Directory Synchronization AgentOpenLM.Ldap.Agent.config

![](/img/legacy/word-image-67.png)
