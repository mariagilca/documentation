---
title: インフラ要件
description: "以下の値は Azure デプロイのベースラインとなるサイジングを示します。"
sidebar_label: 要件
sidebar_position: 1
---

以下の値は Azure デプロイ向けのベースラインサイジングを示しています。環境ごとの規模や負荷に応じて調整してください。

## ネットワーク

Azure Kubernetes Service (AKS) では Azure Container Networking Interface (CNI) モードを使用します。

| 項目 | ベースライン |
| --- | --- |
| Network block | `/22`（例: `10.0.0.0/22`） |
| Address capacity | 1,024 IP addresses |
| Planned running pods | 約 143 |
| Planned nodes | 6 |
| Reserved addresses | Pod、ノード、拡張用に約 400 IP addresses |

### 容量例

- 元の設計では、ノードあたり約 29 個の Pod IP addresses を確保します
- 6 ノードで約 174 個の Pod IP addresses を利用できます
- 143 Pod と 6 ノードで約 149 個の IP addresses を消費します
- `/22` ブロックにより拡張余地を確保できます

## Azure Kubernetes Service

| Node pool | 用途 | Node count | Max pods per node | サイズ |
| --- | --- | --- | --- | --- |
| System node pool | プラットフォームのシステム Pod | 2 | 30 | 4 vCPU, 16 GB RAM（例: `Standard_D4ds_v4` または同等の v5 / v6 サイズ） |
| Main node pool | コアアプリケーションワークロード | 2 | 70 | 4 vCPU, 16 GB RAM |
| Reporting node pool | レポートワークロード | 3 | 30 | 4 vCPU, 16 GB RAM |

Kubernetes バージョンは `1.32.9`、または運用ポリシーに合う AKS サポート対象バージョンを使用してください。

元の設計では、3 つの node pools に合計 7 台の仮想マシンを使用します。16 GB RAM のノードであれば、ノードあたり約 1 GB の基本オーバーヘッドを見込んでも、プラットフォーム Pod 用の余裕を確保できます。

## マネージドサービス

| サービス | 用途 | ベースライン |
| --- | --- | --- |
| Azure SQL Managed Instance | Identity、server、reporting データ向けリレーショナルデータベース | General Purpose、4 vCores、256 GB 以上のストレージ |
| Azure Cache for Redis | キャッシュとセッションストレージ | `C2` tier、2.5 GB cache |
| Azure Managed Disks | Kafka、MongoDB、その他 stateful services の永続ボリューム | 合計約 400 GB |

必要な storage classes が設定されていれば、AKS が managed disks を自動プロビジョニングします。

## サイジングメモ

- Pod 数、データ保持期間、レポート量をデプロイ前に確認してください
- ユーザー数、レポート負荷、保持期間が増える場合は、データベースとキャッシュサイズを増やしてください
