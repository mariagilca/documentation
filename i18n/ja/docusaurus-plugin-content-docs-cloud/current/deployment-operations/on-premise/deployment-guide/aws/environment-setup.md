---
title: 環境セットアップ
sidebar_position: 2
---

# 環境セットアップ

このページでは、Amazon EKS と AWS マネージドサービスを使って OpenLM Platform の AWS インフラを構築する方法を説明します。

詳細なサイジングとサービス仕様は [要件](./requirements) を参照してください。

## インフラコンポーネント

AWS デプロイでは、次のマネージドサービスを使用します。

| コンポーネント | AWS サービス | 用途 |
| --- | --- | --- |
| Kubernetes | Amazon EKS | コンテナオーケストレーション |
| SQL database | Amazon RDS for SQL Server | Identity、operational、reporting データ |
| Message broker | Amazon MSK | イベントストリーミング（Kafka） |
| Cache | Amazon ElastiCache for Redis | キャッシュおよびセッションストレージ |
| MongoDB | MongoDB Atlas または self-hosted | ドキュメントストレージ（AWS DocumentDB は未サポート） |

## Terraform リファレンス

<!-- TODO: Add link to Terraform reference configuration download -->

完全な AWS インフラを構築するための Terraform 構成がリファレンスとして提供されています。これにより次が構築されます。

- **Networking**: 3 つの availability zones にまたがる public / private subnets を持つ VPC、NAT gateway、S3 gateway endpoint
- **EKS cluster**: ノードラベル付き managed node groups、OIDC provider、EBS CSI driver、control plane logging
- **RDS SQL Server**: Multi-AZ、gp3 ストレージ、enhanced monitoring、Performance Insights
- **MSK (Kafka)**: SASL/SCRAM 認証、TLS 暗号化、CloudWatch logging を備えた 3 brokers
- **ElastiCache (Redis)**: 暗号化と認証を有効化した 3-node replication group
- **Security**: シークレット、ログ、保存データ向けの KMS customer-managed keys

:::note
Terraform 構成は出発点となるリファレンスです。適用前に、組織のセキュリティポリシー、命名規則、ネットワークトポロジーに合わせて確認・調整してください。
:::

### 主な Terraform 変数

| 変数 | デフォルト | 説明 |
| --- | --- | --- |
| `eks_version` | `1.34` | Kubernetes バージョン |
| `eks_public_access_cidrs` | `[]` | EKS API の public access を許可する CIDRs |
| `db_engine` | `sqlserver-se` | RDS エンジン（SQL Server Standard） |
| `db_instance_class` | `db.m6i.xlarge` | RDS インスタンスサイズ |
| `main_instance_type` | `m6i.xlarge` | Main workload ノードのインスタンスタイプ |
| `reporting_instance_type` | `m6i.xlarge` | Reporting ノードのインスタンスタイプ |
| `infra_instance_type` | `m6i.large` | Infrastructure ノードのインスタンスタイプ |
| `msk_kafka_version` | `3.8.x` | Kafka バージョン |
| `msk_instance_type` | `kafka.m5.large` | MSK broker のインスタンスタイプ |
| `cache_node_type` | `cache.m6g.large` | ElastiCache ノードタイプ |

### Terraform 構成の適用

```bash
# Terraform を初期化
terraform init

# 実行計画を確認
terraform plan -var-file="production.tfvars"

# 適用
terraform apply -var-file="production.tfvars"
```

適用後、Terraform は Helm チャート設定に必要な接続情報を出力します。

- EKS cluster endpoint
- RDS SQL Server endpoint
- MSK bootstrap brokers (SASL/SCRAM)
- Redis primary と reader endpoints

すべての接続文字列をまとめた `managed-connections.txt` ファイルも生成されます。

## 手動構築

Terraform を使わない場合は、次のリソースを手動で構築してください。詳細仕様は [Managed EKS infrastructure requirements](./requirements) を参照してください。

### Network

- 少なくとも `/22` の CIDR block を持つ VPC
- ワークロード用の private subnets を 3 つ（各 availability zone に 1 つ）
- ロードバランサー用の public subnets を 3 つ
- Private subnets からの outbound internet 用 NAT gateway

### EKS cluster

- API endpoint で public / private access を有効化
- Public access は組織の CIDRs に制限
- Control plane logging（API、audit、authenticator、controller manager、scheduler）を有効化
- 永続ボリューム用に EBS CSI driver をインストール

### Node groups

次の 3 つの managed node groups をラベル付きで作成します。

| Node group | Instance type | Count | Label |
| --- | --- | --- | --- |
| Infrastructure | `m6i.large` | 1 | `openlm.com/role=infrastructure-workload` |
| Main workload | `m6i.xlarge` | 3 | `openlm.com/role=main-workload` |
| Reporting | `m6i.xlarge` | 3 | `openlm.com/role=reporting-workload` |

### Managed services

RDS、MSK、ElastiCache を [要件ページ](./requirements) に記載の構成で用意します。Security groups が EKS cluster security group からの通信を許可していることを確認してください。

## MongoDB

AWS DocumentDB はサポートされません。次のいずれかを使用します。

- **MongoDB Atlas**（推奨） - VPC peering で直接接続できるマネージドサービス
- **Self-hosted in Kubernetes** - Helm チャートを使ってクラスタ内に MongoDB をデプロイ

## 次の手順

インフラ構築後:

1. `kubectl` を EKS クラスタへ接続するよう設定
   ```bash
   aws eks update-kubeconfig --name openlm-eks --region eu-central-1
   ```
2. [前提条件](./prerequisites) チェックリストを完了
3. [プラットフォームのインストール](../platform-installation) に進む
