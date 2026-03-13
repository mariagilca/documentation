---
title: 前提条件
sidebar_position: 3
---

# 前提条件

OpenLM Platform をデプロイする前に、[環境セットアップ](./environment-setup) で構築した Azure インフラが以下の要件を満たしていることを確認してください。

## インフラチェックリスト

次のサービスが AKS クラスタから利用可能であることを確認します。

| サービス | 確認事項 |
| --- | --- |
| **Azure SQL Managed Instance** | インスタンスが利用可能で、endpoint と認証情報が準備できていること。AKS VNet からアクセス可能であること（private endpoint または VNet integration）。 |
| **MongoDB** | クラスタ内デプロイが稼働し、接続文字列が利用可能であること。 |
| **Kafka** | クラスタ内デプロイまたは Confluent Cloud が稼働し、bootstrap endpoint と認証情報が利用可能であること。必要なトピックはデプロイ前にすべて作成されていること。 |
| **Azure Cache for Redis** | インスタンスが利用可能で、接続文字列と認証情報が準備できていること。 |
| **Azure Managed Disks** | 永続ボリューム用の storage classes が AKS に設定されていること。`kubectl get storageclass` で確認してください。 |

## データベース準備

### データベースの作成

デプロイ前に、Azure SQL Managed Instance 上に次のデータベースを作成してください。

1. **Identity database** - ユーザーと認証データを保存
2. **Operational database** - ライセンスサーバーと使用データを保存。サーバー上のデータベース名は `_none` で終わる必要があります（例: `openlm_operational_none`）。Helm values では `_none` を除いたプレフィックスを設定します。
3. **DSS database** - Directory Synchronization Service データを保存
4. **Reporting database** - レポートデータを保存

### Reporting database の準備

Reporting database 作成後、提供される SQL スクリプトを次の順で適用してください。

1. テーブル作成スクリプト
2. ビュー作成スクリプト

これらのスクリプトはデプロイパッケージに含まれています。

### Kafka トピックの準備

デプロイ前に必要な Kafka トピックをすべて作成してください。トピック作成スクリプトはデプロイパッケージに含まれています。Confluent Cloud を使用する場合は、Confluent console または CLI でトピックを作成してください。

## kubectl の設定

未設定の場合:

```bash
az aks get-credentials --resource-group <resource-group> --name <cluster-name>
```

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

ConfigMap には、組織で使う完全な証明書チェーンを含めてください。不明な場合は、上記 TLS secret に使った証明書と同じものを使用してください。

## 検証

[プラットフォームのインストール](../platform-installation) に進む前に、次を実行します。

```bash
# Namespace の存在確認
kubectl get namespace openlm

# TLS secret の確認
kubectl get secret openlm-lb-cert -n openlm

# Storage class の確認 (Azure Managed Disks)
kubectl get storageclass

# ノードが Ready であることを確認
kubectl get nodes

# インフラ namespace の確認 (Kafka/MongoDB がクラスタ内の場合)
kubectl get pods -n openlm-infrastructure
```
