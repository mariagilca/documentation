---
title: インフラ要件
description: "このサイジングのベースラインは eu-central-1 での本番デプロイを反映したもので、プラットフォームの進化に伴い変更される場合があります。"
sidebar_label: 要件
sidebar_position: 1
---

このサイジングベースラインは `eu-central-1` における本番デプロイを前提としており、プラットフォームの進化に伴って変更される可能性があります。

## デプロイ概要

- Region: `eu-central-1`
- Availability Zones: `eu-central-1a`, `eu-central-1b`, `eu-central-1c`
- Kubernetes service: Amazon Elastic Kubernetes Service
- Kubernetes version: `1.34`
- Endpoint access: public と private の両方。有効な public access は許可ネットワーク範囲に制限
- Control plane logs: API、audit、authenticator、controller manager、scheduler

## ネットワークトポロジー

| 項目 | 値 |
| --- | --- |
| Virtual private cloud (VPC) block | `10.0.0.0/22` |
| Public subnets | `10.0.3.0/26`, `10.0.3.64/26`, `10.0.3.128/26` |
| Private subnets | `10.0.0.0/24`, `10.0.1.0/24`, `10.0.2.0/24` |
| internet access | internet gateway |
| Outbound internet | 1 つの network address translation (NAT) Gateway と 1 つの elastic IP address |
| Amazon Simple Storage Service (Amazon S3) access | Gateway endpoint |
| IP protocol | IPv4 のみ |

## ノードグループ

| ノードグループ | 用途 | インスタンスタイプ | Desired / min / max | ラベル |
| --- | --- | --- | --- | --- |
| `openlm-infrastructure-workload` | インフラサービス | `m6i.large` | `1 / 1 / 1` | `openlm.com/role=infrastructure-workload` |
| `openlm-main-workload` | コアアプリケーションサービス | `m6i.xlarge` | `3 / 3 / 3` | `openlm.com/role=main-workload` |
| `openlm-reporting-workload` | レポートサービス | `m6i.xlarge` | `3 / 3 / 3` | `openlm.com/role=reporting-workload` |

元の設計では、合計 7 ノードを使用します。内訳は `m6i.large` が 1 ノード、`m6i.xlarge` が 6 ノードです。

## AWS マネージドサービス

### Amazon Relational Database Service for SQL Server

| 設定 | 値 |
| --- | --- |
| Engine | SQL Server Standard (`sqlserver-se`) |
| Availability | 複数 Availability Zones |
| Instance class | `db.m6i.xlarge` |
| Storage | `gp3`, 100 GB |
| Backup retention | 14 日 |
| Authentication | SQL username と password |
| Monitoring | KMS 暗号化付き Enhanced Monitoring と Performance Insights |

### Amazon Managed Streaming for Apache Kafka

| 設定 | 値 |
| --- | --- |
| Deployment type | Standard |
| Kafka version | `3.8.x` |
| Broker count | 3（各 Availability Zone に 1 つ） |
| Instance type | `kafka.m5.large` |
| Storage | `gp3`, broker ごとに 250 GB |
| Authentication | AWS Secrets Manager に保存されたクライアント認証情報（KMS 暗号化） |
| Logs | KMS 暗号化・365 日保持の CloudWatch Logs |

### Amazon ElastiCache for Redis

| 設定 | 値 |
| --- | --- |
| Engine | Redis `7.x` |
| Cluster mode | Off |
| Nodes | 3（1 primary、2 replicas） |
| Instance type | `cache.m6g.large` |
| Encryption | 転送中・保存時ともに KMS で暗号化 |
| Authentication | User と password |

## MongoDB 要件

- このデプロイでは AWS DocumentDB はサポートされません。
- マネージドサービスとして MongoDB Atlas を使うか、Kubernetes 上で MongoDB を実行してください。

## 月額コストの目安

これらの見積もりは 2026 年 2 月 4 日時点の `eu-central-1` を前提としています。最終見積もりには AWS Pricing Calculator を使用してください。

| リソース | 想定月額コスト |
| --- | --- |
| Amazon Elastic Kubernetes Service control plane | $70 から $90 |
| Node groups | $900 から $1,400 |
| Amazon Relational Database Service for SQL Server | $1,100 から $1,900 |
| Amazon Managed Streaming for Apache Kafka | $650 から $1,100 |
| Amazon ElastiCache for Redis | $250 から $450 |
| NAT Gateway とデータ転送 | $40 から $120 |
| KMS と CloudWatch Logs | ボリュームに応じて $50 未満 |

想定総額: 月額約 $3,050 から $5,100。

## 前提

- このサイジングは、中程度の負荷がある本番システムを前提としています。
- 開発環境向けのサイジングは `dev.tfvars.example` にあります。
- Amazon Relational Database Service の価格には SQL Server ライセンスが含まれており、これが主要なコスト要因です。
- スループット、ストレージ増加、ワークロード需要に応じてコストは増加します。
