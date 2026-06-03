---
title: マネージド Amazon Elastic Kubernetes Service のインフラ要件
description: "このリファレンスは、2026 年 2 月 4 日付の Terraform ベースのデプロイドキュメントに対応します。サイジングのベースラインは eu-central-1 での本番デプロイを反映しています。"
sidebar_label: マネージド Amazon Elastic Kubernetes Service
sidebar_position: 2
---

このリファレンスは、2026 年 2 月 4 日付の Terraform ベースのデプロイドキュメントに基づいています。ここで示すサイジングベースラインは、`eu-central-1` における本番デプロイメントを前提としています。

## デプロイメント概要

- リージョン: `eu-central-1`
- Availability Zone: `eu-central-1a`、`eu-central-1b`、`eu-central-1c`
- Kubernetes サービス: Amazon Elastic Kubernetes Service
- Kubernetes バージョン: `1.34`
- エンドポイントアクセス: パブリックおよびプライベート。パブリックアクセスは許可済みネットワーク範囲に制限
- コントロールプレーンログ: API、audit、authenticator、controller manager、scheduler
- シークレット暗号化: AWS Key Management Service（KMS）のカスタマー管理キー
- ソースコミット: `acbd6f0`

## ネットワークトポロジー

| 項目 | 値 |
| --- | --- |
| Virtual private cloud（VPC）ブロック | `10.0.0.0/22` |
| パブリックサブネット | `10.0.3.0/26`、`10.0.3.64/26`、`10.0.3.128/26` |
| プライベートサブネット | `10.0.0.0/24`、`10.0.1.0/24`、`10.0.2.0/24` |
| internet アクセス | internet gateway |
| outbound internet | 1 network address translation（NAT）Gateway と 1 elastic IP address |
| Amazon Simple Storage Service（Amazon S3）アクセス | Gateway endpoint |
| IP プロトコル | IPv4 のみ |

## ノードグループ

| ノードグループ | 用途 | インスタンスタイプ | Desired / min / max | ラベル |
| --- | --- | --- | --- | --- |
| `openlm-infrastructure-workload` | インフラサービス | `m6i.large` | `1 / 1 / 1` | `openlm.com/role=infrastructure-workload` |
| `openlm-main-workload` | コアアプリケーションサービス | `m6i.xlarge` | `3 / 3 / 3` | `openlm.com/role=main-workload` |
| `openlm-reporting-workload` | レポートサービス | `m6i.xlarge` | `3 / 3 / 3` | `openlm.com/role=reporting-workload` |

元の設計では、合計 7 ノードを使用します。内訳は `m6i.large` が 1 ノード、`m6i.xlarge` が 6 ノードです。

## マネージド AWS サービス

### Amazon Relational Database Service for SQL Server

| 設定 | 値 |
| --- | --- |
| エンジン | SQL Server Standard（`sqlserver-se`） |
| 可用性 | 複数 Availability Zone |
| インスタンスクラス | `db.m6i.xlarge` |
| ストレージ | `gp3`、100 GB |
| バックアップ保持期間 | 14 日 |
| 認証 | SQL ユーザー名とパスワード |
| 監視 | Enhanced Monitoring と Performance Insights。KMS で暗号化 |

### Amazon Managed Streaming for Apache Kafka

| 設定 | 値 |
| --- | --- |
| デプロイメントタイプ | Standard |
| Kafka バージョン | `3.8.x` |
| ブローカー数 | 3。各 Availability Zone に 1 つ |
| インスタンスタイプ | `kafka.m5.large` |
| ストレージ | `gp3`、ブローカーごとに 250 GB |
| 認証 | AWS Secrets Manager に保存したクライアント認証情報を使用し、KMS で暗号化 |
| ログ | CloudWatch Logs。KMS で暗号化し、365 日保持 |

### Amazon ElastiCache for Valkey

| 設定 | 値 |
| --- | --- |
| エンジン | Valkey `7.2` |
| クラスターモード | オフ |
| ノード数 | 3。1 プライマリ、2 レプリカ |
| インスタンスタイプ | `cache.m6g.large` |
| 暗号化 | 転送中および保存時に KMS で暗号化 |
| 認証 | ユーザーとパスワード |

## MongoDB 要件

- このデプロイメントでは AWS DocumentDB をサポートしません。
- MongoDB Atlas のマネージドサービスを使用するか、Kubernetes 上で MongoDB を実行します。

## 月額コストの目安

これらの見積もりは、2026 年 2 月 4 日時点の `eu-central-1` を前提としています。最終的な見積もりには AWS Pricing Calculator を使用してください。

| リソース | 月額コストの目安 |
| --- | --- |
| Amazon Elastic Kubernetes Service コントロールプレーン | $70 から $90 |
| ノードグループ | $900 から $1,400 |
| Amazon Relational Database Service for SQL Server | $1,100 から $1,900 |
| Amazon Managed Streaming for Apache Kafka | $650 から $1,100 |
| Amazon ElastiCache for Valkey | $250 から $450 |
| NAT Gateway とデータ転送 | $40 から $120 |
| KMS と CloudWatch Logs | ボリュームに応じて $50 未満 |

見積もり総額: 月額約 $3,050 から $5,100。

## 前提条件

- このサイジングは、中程度の負荷がある本番システムを前提としています。
- 開発環境向けのサイジングは `dev.tfvars.example` にあります。
- Amazon Relational Database Service の料金には SQL Server ライセンスが含まれており、主要なコスト要因になります。
- スループット、ストレージ増加、ワークロード需要に応じてコストは増加します。
