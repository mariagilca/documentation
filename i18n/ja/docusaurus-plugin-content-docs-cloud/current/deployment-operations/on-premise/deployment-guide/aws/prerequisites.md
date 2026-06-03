---
title: 前提条件
description: "OpenLM Platform をデプロイする前に、Environment setup でプロビジョニングした AWS インフラが以下の要件を満たしていることを確認します。"
sidebar_position: 3
---

OpenLM Platform をデプロイする前に、[環境セットアップ](./environment-setup) で構築した AWS インフラが以下の要件を満たしていることを確認してください。

## インフラチェックリスト

次のマネージドサービスが EKS クラスタから利用可能であることを確認します。

| サービス | 確認事項 |
| --- | --- |
| **Amazon RDS (SQL Server)** | インスタンスが利用可能で、endpoint と認証情報が準備できていること。Security group が EKS クラスタからのトラフィックを許可していること。 |
| **MongoDB** | Atlas クラスタまたはクラスタ内デプロイへ到達可能で、接続文字列が利用可能であること。 |
| **Amazon MSK (Kafka)** | クラスタが有効で、bootstrap brokers endpoint が利用できること。必要なトピックはデプロイ前にすべて作成されていること。 |
| **Amazon ElastiCache (Redis)** | クラスタが利用可能で、primary endpoint と認証情報が準備できていること。 |
| **EBS CSI driver** | EKS クラスタにインストール済みであること。`kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver` で確認してください。 |

## データベース準備

### データベースの作成

デプロイ前に、RDS SQL Server 上に次のデータベースを作成してください。

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

デプロイ前に必要な Kafka トピックをすべて作成してください。トピック作成スクリプトはデプロイパッケージに含まれています。MSK クラスタに対して AWS console または CLI を使って作成することも可能です。

## kubectl の設定

未設定の場合:

```bash
aws eks update-kubeconfig --name openlm-eks --region eu-central-1
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

# Storage class の確認 (EBS CSI)
kubectl get storageclass

# ノードが Ready であることを確認
kubectl get nodes

# RDS 接続確認
kubectl run test-sql --rm -it --image=mcr.microsoft.com/mssql-tools -- /bin/bash

# MSK bootstrap brokers への到達確認
kubectl run test-kafka --rm -it --image=bitnami/kafka -- kafka-broker-api-versions.sh --bootstrap-server <msk-endpoint>:9096
```
