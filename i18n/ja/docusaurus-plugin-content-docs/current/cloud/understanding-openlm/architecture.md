---
title: OpenLMプラットフォームのアーキテクチャ
sidebar_position: 2
description: OpenLMプラットフォームがマイクロサービス、Kubernetes、およびメッセージキューを使用してライセンス使用状況データを処理・管理する方法について理解します。
---

OpenLMプラットフォームのアーキテクチャ
OpenLMプラットフォームは、Workstation AgentsとBrokersを介してアプリケーションおよび実行可能ファイルのデータを収集します。これらのコンポーネントは、組織の完全修飾ドメイン名 (FQDN) またはDNS名を表すOpenLM Gatewayに接続します。ゲートウェイはデータをOpenLMサービスに転送し、OpenLMサービスはデータを適切なデータベースに保存します。

主要コンポーネント
Workstation Agents: 個々のユーザーマシンからデータを収集します。

Brokers: ライセンスマネージャーサーバー上で動作します。ライセンス使用状況データを収集し、関連するサービスに送信します。

OpenLM Gateway: エントリポイントとして機能し、データを個別のサービスにルーティングします。

OpenLM Services: 収集されたデータを処理、強化、および管理します。

Databases: 処理されたデータを、サーバーデータベース、IDサービスデータベース、DSSデータベース、レポートデータベースなどの専用システムに保存します。

マイクロサービスとKubernetes
OpenLM Platform Annapurnaバージョンは、Kubernetesクラスターにデプロイされたマイクロサービス上で動作します。
各サービスは、Kubernetesノード上のポッド内のコンテナで実行されます。
サービスはデータを内部データベースに保存し、非同期処理のためにKafkaをメッセージキューとして使用します。

アーキテクチャレベル
Level 1: 高レベルのデータフロー
Workstation Agents、Brokers、およびその他のサービスは、独自のデータベースにデータを書き込みます。

サービスは、データをKafkaトピックに公開します。

Reporting Serviceは、Kafkaデータを集約します。

Reporting Serviceは、データをレポートデータベースに保存します。

レポートダッシュボードは、レポートデータベースからデータを読み取ります。

Level 2: 詳細なデータパイプライン
Workstation AgentsとBrokersは、PCとサーバーからデータを収集します。

Agent HubとBroker Hubは、このデータを統合します。

Agent HubとBroker Hubからのデータは、MongoDBとKafkaに保存されます。

その他のサービス（ユーザー、プロジェクト、サーバー）は、関連するKafkaトピックを消費します。

Enrichment Serviceは、すべてのサービスからのデータをマージして強化し、Kafkaに再度公開します。

Apache Sparkは、レポート用に強化されたKafkaデータを集約します。

Sparkは、結果をレポートデータベースに書き込みます。

ビジネスインテリジェンスツールは、レポートデータベースにアクセスします。

強化サービス
OpenLM Platformには、収集されたデータを統合および強化するための強化サービスが含まれています。

Allocation Enrichment Service: アロケーションIDを使用してアロケーションデータを追加します。

Usage Enrichment Service: セッションIDを使用して使用状況データを強化します。

Denials Enrichment Service: 拒否IDを使用して拒否データを処理します。

データストレージとリカバリ
OpenLM Platformは、データの損失または破損の場合にデータリカバリをサポートするために、ステージングデータベースを使用します。
このステージングデータは、後にMongoDBに移動され、内部リカバリソースとして機能します。