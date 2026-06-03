---
title: プラットフォームのインストール
description: "OpenLM Platform の Helm チャート構成とデプロイについて説明します。"
sidebar_position: 6
---

このページでは、OpenLM Platform の Helm チャート設定とデプロイ手順を説明します。ここで扱う手順は、すべてのデプロイパス（オンプレミスマシン、AWS、Azure）で共通です。

開始前に、選択したデプロイパスの前提条件チェックリストを完了していることを確認してください。

## API ゲートウェイのインストール

API ゲートウェイは、すべての外部トラフィックの単一入口です。

### 設定

ゲートウェイの `values.yaml` を編集します。

- `lbfqdn` にドメイン名を設定します。例: `openlm.yourcompany.com`
- Redis のアドレスを設定します

### インストール

```bash
helm install openlm-gateway openlm-gateway-<version>.tgz \
  -f values.yaml \
  -n openlm
```

### 確認

```bash
kubectl exec -it <any-pod> -n openlm -- /bin/sh
curl https://<your-domain>/api/homepage/.security
```

この段階で `host not reachable` が返るのは想定どおりです。これはゲートウェイのルーティング設定が有効であることを示します。別のエラーが出る場合は、ゲートウェイのログと Redis アドレスを確認してください。

## プラットフォーム Helm チャートの設定

{/* TODO: Add link to deployment package download (Helm charts, values template, SQL scripts, Kafka topic scripts) */}

プラットフォームは、単一の umbrella Helm チャートでデプロイされます。デプロイパッケージに含まれる `mono-values-placeholders.yaml` を起点にしてください。

### 設定手順

#### 1. データベースタイプ

`db_type_placeholder` を、運用データベースと identity データベースのタイプに置き換えます。

- `MariaDB`
- `SqlServer_SQLServerAuth`
- `PostgreSQL`

:::note
レポート用パスワードを除くすべてのデータベースパスワードは、Helm values ファイル内で Base64 エンコードする必要があります。
:::

#### 2. ドメイン

`lbfqdn-placeholder` を完全修飾ドメイン名に置き換えます。

#### 3. Kafka 接続

`kafka-connection-placeholder` を Kafka の bootstrap servers アドレスに置き換えます。

#### 4. MongoDB 接続

`mongo-connection-placeholder-no-end-slash` を、末尾スラッシュなしの MongoDB 接続文字列に置き換えます。

#### 5. Redis 接続

`redis-connection-placeholder` を Redis 接続文字列に置き換えます。

#### 6. 運用データベース

運用データベース接続を設定します。

- `INFRASTRUCTURE__ServerConnectionStringTemplate` を探し、接続文字列テンプレートを設定します
- `INFRASTRUCTURE__ServerDbPrefix` を探し、データベース名プレフィックスを設定します（`_none` なし）
- `SERVER_DATABASE_CONNECTIONSTRING` を探し、接続文字列を設定します

**MariaDB の例:**

```
Server=mariadb.openlm-infrastructure.svc.cluster.local;Port=3306;User ID=root;Password=<base64-password>;Database={0};Connection Lifetime=0;Minimum Pool Size=0;Maximum Pool Size=100;Default Command Timeout=30
```

**SQL Server の例:**

```
Data Source=<host>;Initial Catalog={0};User ID=<user>;Password=<base64-password>;Min Pool Size=0;Max Pool Size=100;Encrypt=False;TrustServerCertificate=False
```

#### 7. Identity データベース

- `identity-db-connection-placeholder` を identity データベースの接続文字列に置き換えます
- `identity:` セクション内 `vars_list` の `DbType` が使用するデータベースエンジンと一致していることを確認します

#### 8. DSS データベース

`dss:` セクションの `vars_list` を見つけて接続を設定します。`db_type` の値は次のとおりです。

| 値 | エンジン |
| --- | --- |
| `2` | SQL Server |
| `3` | MySQL |
| `4` | MariaDB |

#### 9. レポート

Helm values ファイルには、2 種類のレポート用データベース向けのセクションが事前設定されています。利用するエンジンに対応するセクションをコメント解除してください。

- `MSSQL REPORTING`: SQL Server 用
- `POSTGRESQL REPORTING`: PostgreSQL 用

その後、次のレポート用プレースホルダーを置き換えます。

- `reporting-sql-db-host-placeholder`
- `reporting-sql-db-port-placeholder`
- `reporting-sql-db-name-placeholder`
- `reporting-sql-db-username-placeholder`
- `reporting-sql-db-password-placeholder`

Spark の永続ボリューム向け `storageClassName` を設定し、`REPORTING_DATABASE_CONNECTIONSTRING` を構成します。

## プラットフォームのインストール

```bash
helm upgrade --install monohelm monohelm.tgz \
  -f mono-values.yaml \
  -n openlm
```

## ノードアフィニティ

ノードアフィニティのルールは、環境セットアップ時に適用したノードラベルと一致するよう Helm values 内で設定する必要があります。これにより、各ワークロードタイプ（main、reporting、infrastructure）が設計どおりのノードグループにスケジュールされます。

## デプロイの確認

すべての Pod が起動するまで監視します。

```bash
kubectl get pods -n openlm -w
```

Pod がクラッシュしている場合は、次を確認します。

```bash
# Pod のログを確認
kubectl logs <pod-name> -n openlm

# Pod のイベントを確認（image pull failures, resource limits, scheduling issues）
kubectl describe pod <pod-name> -n openlm
```

設定したドメインで OpenLM のホームページが表示されるはずです。

## インストール後

### Apache Superset（任意）

レポート用ダッシュボードとして Apache Superset をデプロイする場合は、次の手順を実行します。

1. 専用 namespace と TLS secret を作成します。
   ```bash
   kubectl create namespace apache-superset
   kubectl create secret tls openlm-lb-cert \
     --key your-domain.key \
     --cert your-domain.crt \
     -n apache-superset
   ```

2. `values.yaml` を設定します。
   - `lbfqdn` に別サブドメインを設定します。例: `superset-openlm.yourcompany.com`
   - Redis と PostgreSQL の接続を `supersetNode` > `connections` に設定します。PostgreSQL を外部公開していない場合は、`postgresql.enabled: true` で同梱インスタンスを有効化します

3. インストールします。
   ```bash
   helm install superset superset.tgz \
     -f values.yaml \
     -n apache-superset
   ```

### SMTP 設定

メールアラートと通知を有効にするため、notification service で SMTP サーバーを設定します。

### 継続的な監視

定期的にすべての Pod が正常かを確認します。

```bash
kubectl get pods -n openlm
```

再起動ループに入っている Pod があれば、ログとイベントを確認して調査してください。
