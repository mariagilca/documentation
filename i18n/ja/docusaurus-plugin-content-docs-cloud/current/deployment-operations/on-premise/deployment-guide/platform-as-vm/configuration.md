---
title: 構成リファレンス
sidebar_position: 3
description: "config.yaml と passwords.yaml のリファレンス。既定構成、外部 SQL Server、外部 Kafka、エアギャップ構成のエンドツーエンドのパターンを含みます。"
---

顧客が編集する構成は、すべてデプロイパッケージのルートにある以下の 2 ファイルに集約されています。

- `config.yaml` – プラットフォーム構成（ドメイン、データベース、Ingress など）
- `passwords.yaml` – 同梱データベースで使用するパスワード

インストーラーはこの 2 ファイルを読み込み、インストール時に Helm チャートの value と Kubernetes Secret にレンダリングします。インストーラーを再実行すると、その時点のファイル内容に基づいてすべてが再レンダリングされます。

## 必須フィールド

以下の 3 フィールドは**必ず**設定する必要があります。空の場合、インストーラーは処理を中止します。

```yaml
openlm_system_domain: "openlm.yourcompany.com"    # プラットフォームへのアクセスに使う FQDN
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"
```

それ以外のフィールドは、すべて単一 VM ですべて同梱版を使うデプロイ向けの既定値が設定されています。

## データベースの選択肢

プラットフォームは 2 つの役割のデータベースを使用します。

- **運用（Operational）** – ライブ状態、ID、アロケーション。書き込みスループットが高く、クエリは小さい。
- **レポーティング（Reporting）** – BI ツール向けの履歴利用データおよび ETL 出力。大規模な分析クエリを扱う。

各役割には、以下のいずれかのバックエンドを選べます。

| バックエンド | モード | 補足 |
| --- | --- | --- |
| MariaDB | 同梱 | 運用ロールの既定値 |
| PostgreSQL | 同梱 | レポーティングロールの既定値 |
| SQL Server | 外部 | 両ロールに使用可、顧客提供 |
| MySQL | 外部 | 運用ロールのみ、顧客提供 |

### 推奨パターン

推奨する 2 つのパターン:

1. **すべて同梱** – 運用は MariaDB、レポーティングは PostgreSQL。自己完結型で、追加で管理すべきものはありません。SQL Server インフラや DBA チームがない場合に最適です。
2. **すべて外部 SQL Server** – 両ロールを同一の外部 SQL Server インスタンス上の別データベースに格納します。SQL Server を既に運用している顧客に最適です。

同梱と外部を混在させる構成もサポートされていますが、一般的ではありません。

### レポーティングデータベース

```yaml
reporting_db_type:     "PostgreSQL"    # または "SqlServer_SQLServerAuth"
reporting_db_host:     "postgres-postgresql.openlm-infrastructure.svc.cluster.local"
reporting_db_port:     5432
reporting_db_username: "postgres"
reporting_db_password: "GENERATED"     # passwords.yaml から置換されます
reporting_db_name:     "openlm_reporting_db"
```

外部 SQL Server を使う場合は、`reporting_db_password` に実際のパスワードを設定し（`GENERATED` のままにはしない）、データベースを事前に作成するか、ユーザーに作成権限を付与しておきます。タイプが `SqlServer_SQLServerAuth` のとき、同梱の PostgreSQL はインストールされません。

### 運用データベース

```yaml
operational_db_type:     "MariaDB"     # または "SqlServer_SQLServerAuth"
operational_db_host:     "mariadb.openlm-infrastructure.svc.cluster.local"
operational_db_port:     3306
operational_db_username: "root"
operational_db_password: "GENERATED"
operational_db_name:     "openlm_operational_db"
identity_db_name:        "openlm_identity_db"
dss_db_name:             "openlm_dss_db"
```

運用ロールは、operational、identity、DSS の 3 つの論理データベースを使用します。同梱の MariaDB を使う場合、3 つとも自動的に作成されます。

## メッセージブローカー（Kafka）

```yaml
kafka_bootstrap_servers: "kafka.openlm-infrastructure.svc.cluster.local:9092"

# SASL フィールドは外部 / マネージド Kafka に接続する場合のみ設定します:
kafka_sasl_mechanism:         ""    # 例: ScramSha512
kafka_sasl_username:          ""
kafka_sasl_password:          ""
kafka_security_protocol:      ""    # 例: SASLSSL
kafka_ssl_endpoint_algorithm: ""    # 例: https
```

- **既定** – クラスタ内で同梱の Kafka を起動し、認証は使用しません。
- **外部 Kafka** – `kafka_bootstrap_servers` を外部エンドポイントに設定し、SASL フィールドを記入します。同梱の Kafka をあわせて無効化したい場合は、OpenLM サポートまでお問い合わせください。

## ドキュメントストア（MongoDB）

```yaml
mongo_connection_string: "mongodb://admin:GENERATED@mongodb.openlm-infrastructure.svc.cluster.local:27017"
```

リテラル文字列 `GENERATED` は、インストール時に `passwords.yaml` の `mongodb_root_password` に置換されます。外部 MongoDB はサポートされていません。プラットフォームは同梱の MongoDB を前提とします。

:::warning
MongoDB 接続文字列の末尾に `/` を**付けないでください**。一部のクライアントが拒否します。
:::

## キャッシュ（Redis）

```yaml
redis_connection_string: "redis-master.openlm-infrastructure.svc.cluster.local:6379"
```

Redis はクラスタ内部で認証なしで動作します。外部 Redis はサポートされていません。

## ストレージクラス

```yaml
k8s_storage_class: "local-path"
```

`local-path` は K3s の既定値で、永続ボリュームのデータを VM のローカルディスクに保存します。単一 VM デプロイにはこれが適切で、VM のスナップショットを取得すれば自動的にバックアップされます。

ホスト側で別のプロビジョナー（NFS、Longhorn、Ceph など）を既に導入している場合は、ここで切り替えられます。ただし、インストーラーを実行する**前**に導入と準備を完了させておく必要があります。

<a id="air-gapped-network-without-dns"></a>

## DNS のないエアギャップネットワーク

プラットフォームドメインをホストできる DNS サーバーがないネットワークに VM がある場合、インストーラーが K3s の内部 DNS にパッチを適用し、**クラスタ内**でドメインを正しく解決できるようにします。

```yaml
openlm_system_domain: "openlm.internal"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

add_coredns_hosts_entry: true
coredns_hosts_entry_ip:  "10.20.30.40"    # VM の IP
```

エンドユーザーは何らかの方法で VM に到達する必要があります。IP で直接接続する、クライアントごとに `hosts` ファイルへエントリを追加する、もしくは社内 DNS サーバーを用意します。

## `passwords.yaml`

```yaml
postgres_password:     "changeme"
mariadb_root_password: "changeme"
mongodb_root_password: "changeme"
```

これらのパスワードは、次の用途で使用されます。

1. インストール時に同梱データベースを初期化する。
2. プラットフォームサービスが同じパスワードで接続できるよう構成する。

データベースを使用しない場合（例: `reporting_db_type` が `SqlServer_SQLServerAuth` のとき）、対応するパスワードの値は無視されます。

:::warning
パスワードはインストール時に組み込まれます。インストール後に `passwords.yaml` を変更しても、稼働中のデータベースは更新**されません**。以後は、各データベースのネイティブなコマンドでローテーションしてください。
:::

## 構成例（全体）

### パターン 1 – 既定の単一 VM、すべて同梱

最もシンプルなデプロイです。データベースを含め、すべてが 1 台の VM 上で動作します。

```yaml
openlm_system_domain: "openlm.yourcompany.com"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"
# それ以外: 既定値
```

### パターン 2 – 両データベースロールを外部 SQL Server に配置

顧客が既存の SQL Server インスタンスを保有しているケースです。同梱の PostgreSQL と MariaDB はインストールされません。DBA は事前に 4 つのデータベースを作成するか、アプリケーションユーザーに作成権限を付与する必要があります。

```yaml
openlm_system_domain: "openlm.yourcompany.com"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

reporting_db_type:     "SqlServer_SQLServerAuth"
reporting_db_host:     "mssql.yourcompany.com"
reporting_db_port:     1433
reporting_db_username: "openlm_app"
reporting_db_password: "<実際のパスワード>"
reporting_db_name:     "openlm_reporting_db"

operational_db_type:     "SqlServer_SQLServerAuth"
operational_db_host:     "mssql.yourcompany.com"
operational_db_port:     1433
operational_db_username: "openlm_app"
operational_db_password: "<実際のパスワード>"
operational_db_name:     "openlm_operational_db"
identity_db_name:        "openlm_identity_db"
dss_db_name:             "openlm_dss_db"
```

### パターン 3 – 外部 Kafka（例: AWS MSK）

既に運用しているイベントバスを OpenLM と共有させたい場合に有用です。

```yaml
openlm_system_domain: "openlm.yourcompany.com"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

kafka_bootstrap_servers:     "b-1.mycluster.xxxxx.kafka.us-east-1.amazonaws.com:9092"
kafka_sasl_mechanism:        "ScramSha512"
kafka_sasl_username:         "openlm-user"
kafka_sasl_password:         "<msk-password>"
kafka_security_protocol:     "SASLSSL"
kafka_ssl_endpoint_algorithm:"https"
```

### パターン 4 – 外部 DNS がないエアギャップネットワーク

VM が稼働するネットワークにプラットフォームドメインをホストできる DNS サーバーがない構成です。エンドユーザーは IP またはローカルの `hosts` エントリ経由でプラットフォームに到達します。

```yaml
openlm_system_domain: "openlm.internal"
tls_cert_path:        "/etc/openlm/certs/tls.crt"
tls_key_path:         "/etc/openlm/certs/tls.key"

add_coredns_hosts_entry: true
coredns_hosts_entry_ip:  "10.20.30.40"
```
