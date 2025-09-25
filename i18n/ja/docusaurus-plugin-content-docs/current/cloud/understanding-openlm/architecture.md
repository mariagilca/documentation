---

title: OpenLM プラットフォーム アーキテクチャ

sidebar_position: 2

description: OpenLM プラットフォームがマイクロサービス、Kubernetes、およびメッセージキューを使用してライセンス使用データを処理・管理する方法を理解します。

---

# OpenLM プラットフォーム アーキテクチャ

OpenLM プラットフォームは、Workstation Agent と Broker を通じてアプリケーションおよび実行ファイルのデータを収集します。これらのコンポーネントは OpenLM Gateway に接続し、Gateway は組織の完全修飾ドメイン名 (FQDN) または DNS 名を表します。Gateway はデータを OpenLM サービスに転送し、適切なデータベースに保存します。

## 主なコンポーネント

- **Workstation Agent**: 個々のユーザーマシンからデータを収集します。  
- **Broker**: ライセンスマネージャーサーバー上で実行されます。ライセンス使用データを収集し、関連するサービスに送信します。  
- **OpenLM Gateway**: エントリーポイントとして機能し、データを各サービスにルーティングします。  
- **OpenLM Services**: 収集されたデータを処理・強化・管理します。  
- **データベース**: 処理済みデータを専用システムに保存します（サーバーデータベース、Identity Service データベース、DSS データベース、レポートデータベースなど）。  

## マイクロサービスと Kubernetes

OpenLM プラットフォーム Annapurna バージョンは、Kubernetes クラスターにデプロイされたマイクロサービス上で動作します。  
各サービスは Kubernetes ノード上の Pod 内のコンテナで実行されます。  
サービスは内部データベースにデータを保存し、Kafka をメッセージキューとして使用して非同期処理を行います。  

## アーキテクチャレベル

### レベル 1: 高レベルのデータフロー

- Workstation Agent、Broker、その他のサービスはそれぞれのデータベースにデータを書き込みます。  
- サービスは Kafka トピックにデータを公開します。  
- Reporting Service が Kafka データを集約します。  
- Reporting Service がデータをレポートデータベースに保存します。  
- レポートダッシュボードがレポートデータベースからデータを読み取ります。  

![OpenLM Platform Level 1 architecture](/img/on_premise/understanding_openlm/level-1.png)

### レベル 2: 詳細なデータパイプライン

- Workstation Agent と Broker が PC やサーバーからデータを収集します。  
- Agent Hub と Broker Hub がこれらのデータを統合します。  
- Agent Hub と Broker Hub からのデータは MongoDB と Kafka に保存されます。  
- その他のサービス（User、Project、Server）が関連する Kafka トピックを利用します。  
- Enrichment Service が全サービスからのデータを統合・強化し、Kafka に再公開します。  
- Apache Spark が強化された Kafka データを集約し、レポート用に処理します。  
- Spark が結果をレポートデータベースに書き込みます。  
- BI ツールがレポートデータベースにアクセスします。  

![OpenLM Platform Level 2 architecture](/img/on_premise/understanding_openlm/level-2.png)

## エンリッチメントサービス

OpenLM プラットフォームには、収集したデータを統合・強化するエンリッチメントサービスが含まれています:

- **Allocation Enrichment Service**: 割り当て ID を使用して割り当てデータを追加します。  
- **Usage Enrichment Service**: セッション ID を使用して使用データを強化します。  
- **Denials Enrichment Service**: 拒否 ID を使用して拒否データを処理します。  

## データ保存とリカバリ

OpenLM プラットフォームは、データの損失や破損時にリカバリをサポートするためにステージングデータベースを使用します。  
このステージングデータは後に MongoDB に移され、内部のリカバリソースとして機能します。  