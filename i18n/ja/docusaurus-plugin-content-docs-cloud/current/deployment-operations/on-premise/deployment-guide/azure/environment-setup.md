---
title: 環境セットアップ
description: "Azure Kubernetes Service（AKS）とマネージド Azure サービスを使用して、OpenLM Platform 用の Azure インフラをプロビジョニングする手順を説明します。"
sidebar_position: 2
---

このページでは、Azure Kubernetes Service (AKS) と Azure マネージドサービスを使って OpenLM Platform の Azure インフラを構築する方法を説明します。

詳細なサイジングとサービス仕様は [要件](./requirements) を参照してください。

## インフラコンポーネント

Azure デプロイでは、次のマネージドサービスを使用します。

| コンポーネント | Azure サービス | 用途 |
| --- | --- | --- |
| Kubernetes | Azure Kubernetes Service (AKS) | コンテナオーケストレーション |
| SQL database | Azure SQL Managed Instance | Identity、operational、reporting データ |
| Cache | Azure Cache for Redis | キャッシュおよびセッションストレージ |
| Persistent storage | Azure Managed Disks | Kafka、MongoDB、その他 stateful services（約 400 GB） |

:::note
Kafka と MongoDB は Azure のマネージドサービスとしてではなく、Helm チャートと Azure Managed Disks を使って Kubernetes クラスタ内で動作します。
:::

## ネットワーク構築

AKS では Azure CNI ネットワークモードを使用します。

| 項目 | 要件 |
| --- | --- |
| Virtual network (VNet) | 最低 `/22` の CIDR block（例: `10.0.0.0/22`） |
| IP capacity | 1,024 addresses（Pod、ノード、拡張分として約 400 必要） |
| Planned pods | 約 143 |
| Planned nodes | 6 から 7 |

## AKS クラスタ

### Node pools

次の 3 つの node pools を作成します。

| Node pool | 用途 | VM size | Count | Max pods per node |
| --- | --- | --- | --- | --- |
| System | Kubernetes システム Pod | 4 vCPU, 16 GB RAM（例: `Standard_D4ds_v4`） | 2 | 30 |
| Main | コアアプリケーションワークロード | 4 vCPU, 16 GB RAM | 2 | 70 |
| Reporting | レポートワークロード | 4 vCPU, 16 GB RAM | 3 | 30 |

Kubernetes バージョンは `1.32.9`、または運用ポリシーに合致する AKS サポート対象バージョンを使用してください。

### Node labels

ワークロードスケジューリング用にノードへラベルを付与します。

```bash
kubectl label node <system-node>     openlm.com/role=system
kubectl label node <main-node-1>     openlm.com/role=main-workload
kubectl label node <main-node-2>     openlm.com/role=main-workload
kubectl label node <report-node-1>   openlm.com/role=reporting-workload
kubectl label node <report-node-2>   openlm.com/role=reporting-workload
kubectl label node <report-node-3>   openlm.com/role=reporting-workload
```

## マネージドサービス

### Azure SQL Managed Instance

| 設定 | 要件 |
| --- | --- |
| Tier | General Purpose |
| Compute | 最低 4 vCores |
| Storage | 最低 256 GB |
| Scaling | ユーザー数、レポート負荷、データ保持期間に応じて拡張 |

### Azure Cache for Redis

| 設定 | 要件 |
| --- | --- |
| Tier | C2 |
| Cache size | 2.5 GB |

### Azure Managed Disks

Storage classes が設定されていれば、Managed Disks は AKS によって自動プロビジョニングされます。Kafka、MongoDB、その他 stateful services 用に合計約 400 GB が必要です。

## MongoDB

デプロイパッケージに含まれる Helm チャートを使って、MongoDB を Kubernetes クラスタ内へデプロイします。永続ストレージは Azure Managed Disks が提供します。

## 次の手順

インフラ構築後:

1. `kubectl` を AKS クラスタへ接続するよう設定
   ```bash
   az aks get-credentials --resource-group <resource-group> --name <cluster-name>
   ```
2. [前提条件](./prerequisites) チェックリストを完了
3. [プラットフォームのインストール](../platform-installation) に進む
