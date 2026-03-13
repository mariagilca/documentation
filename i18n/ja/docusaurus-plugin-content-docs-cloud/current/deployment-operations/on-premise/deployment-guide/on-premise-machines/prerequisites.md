---
title: 前提条件
sidebar_position: 3
---

# 前提条件

OpenLM Platform をデプロイする前に、[環境セットアップ](./environment-setup) で準備した環境が以下の要件を満たしていることを確認してください。

## インフラチェックリスト

次のサービスが Kubernetes クラスタから利用可能であることを確認します。

| サービス | 確認事項 |
| --- | --- |
| **SQL データベース** | サーバーへ到達可能で、接続文字列が利用できること。サポートエンジン: SQL Server、MariaDB、または PostgreSQL（operational は MariaDB、reporting は PostgreSQL）。 |
| **MongoDB** | 到達可能で、接続文字列が利用できること。Infrastructure ノード上でクラスタ内実行されます。 |
| **Kafka** | クラスタへ到達可能で、認証情報が利用できること。必要なトピックはデプロイ前にすべて作成済みであること。 |
| **Redis** | 到達可能で、接続文字列と認証情報が利用できること。 |
| **Storage class** | 少なくとも 1 つの Kubernetes storage class が利用可能であること。`kubectl get storageclass` で確認してください。 |

## データベース準備

### データベースの作成

デプロイ前に、SQL server 上に次のデータベースを作成してください。

1. **Identity database** - ユーザーと認証データを保存
2. **Operational database** - ライセンスサーバーと使用データを保存。サーバー上のデータベース名は `_none` で終わる必要があります（例: `openlm_operational_none`）。Helm values では `_none` を除いたプレフィックスを設定します。
3. **DSS database** - Directory Synchronization Service データを保存
4. **Reporting database** - レポートデータを保存（PostgreSQL または SQL Server）

### Reporting database の準備

Reporting database を作成した後、提供される SQL スクリプトを次の順で適用してください。

1. テーブル作成スクリプト
2. ビュー作成スクリプト

これらのスクリプトはデプロイパッケージに含まれています。

### Kafka トピックの準備

デプロイ前に必要な Kafka トピックをすべて作成してください。トピック作成スクリプトはデプロイパッケージに含まれています。

## Kubernetes namespace

OpenLM platform 用の namespace を作成します。

```bash
kubectl create namespace openlm
```

## TLS 証明書

TLS 証明書を準備し、Kubernetes secret を作成します。

```bash
kubectl create secret tls openlm-lb-cert \
  --key your-domain.key \
  --cert your-domain.crt \
  -n openlm
```

## Custom CA 証明書

組織内で内部 CA を使用している場合は、完全な証明書チェーンを含む ConfigMap を作成します。

```bash
kubectl apply -f custom-ca-configmap.yaml -n openlm
```

ConfigMap には、組織で利用している完全な証明書チェーンを含めてください。不明な場合は、上記 TLS secret に使用した証明書と同じものを使用してください。

## 検証

[プラットフォームのインストール](../platform-installation) へ進む前に、次を実行してください。

```bash
# Namespace の存在確認
kubectl get namespace openlm

# TLS secret の確認
kubectl get secret openlm-lb-cert -n openlm

# Storage class の確認
kubectl get storageclass

# ノードが Ready であることを確認
kubectl get nodes

# インフラサービスが起動していることを確認
kubectl get pods -n openlm-infrastructure
```
