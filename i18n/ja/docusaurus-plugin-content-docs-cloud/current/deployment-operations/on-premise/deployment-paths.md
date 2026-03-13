---
title: デプロイパス
sidebar_position: 5
---

# デプロイパス

ここまでで、プラットフォームの構成（[アーキテクチャ](./architecture-components)）、必要なインフラ（[システム要件](./system-requirements)）、通信の流れ（[ネットワーク](./networking)）を確認しました。次は、どのデプロイモデルを選ぶかを決めます。

デプロイパスは 4 つあります。それぞれ、Kubernetes をどこで動かすか、インフラサービスをどう用意するか、そして何を自社で管理するかが異なります。

## 概要

| パス | Kubernetes | インフラサービス | 向いているケース |
| --- | --- | --- | --- |
| **Platform as VM** | K3s（自動構成） | 単一 VM 上ですべて自動構成 | 小規模顧客、デモ、PoC、評価環境 |
| **オンプレミスマシン** | 自社サーバー上の任意の CNCF 準拠ディストリビューション | すべてクラスタ内で self-hosted | 既存データセンターと Kubernetes 運用経験を持つ組織 |
| **プライベートクラウド (AWS)** | Amazon EKS（マネージド） | 多くを AWS マネージドサービスで構成 | AWS を利用している組織、または既存データセンターを持たない組織 |
| **プライベートクラウド (Azure)** | Azure AKS（マネージド） | Azure マネージドとクラスタ内構成の混在 | Azure を利用している組織 |

:::tip 推奨
既存のデータセンターや専任のインフラチームがない場合は、クラウドプロバイダー上へのデプロイを推奨します。クラウド管理型の Kubernetes とデータサービスにより、運用負荷を大きく下げられます。

**現在もっともサポートが厚いクラウドパスは AWS です。** RDS、MSK、ElastiCache といったマネージドサービスの対応範囲が広く、Terraform の参照構成もあり、チーム内の導入実績も最も多い構成です。
:::

## Platform as VM

Platform as VM は、小規模顧客、デモ、評価環境向けのパスです。単一のデプロイスクリプトで、クリーンな AlmaLinux または RHEL 環境を、完全に動作する OpenLM Platform に変換します。Kubernetes やインフラの専門知識は不要です。

このスクリプトは、K3s のインストール、データベース（MariaDB、PostgreSQL、MongoDB）、Kafka、Redis、スキーマ初期化、プラットフォームサービスのデプロイまで自動化します。結果として、単一マシン上でそのまま利用できる環境が構築されます。

**スクリプトが管理するもの**: Kubernetes、すべてのデータベース、Kafka、Redis、MongoDB、スキーマ作成、Kafka トピック、プラットフォームサービスのすべて。

**お客様が用意するもの**: AlmaLinux 10.1 または RHEL 10.x の VM またはベアメタルサーバー、ドメイン名、TLS 証明書。

| リソース | 最小（評価用） | 推奨 |
| --- | --- | --- |
| CPU | 4 コア | 8 コア以上 |
| RAM | 32 GB | 64 GB |
| ストレージ | 100 GB SSD | 500 GB 以上の SSD |

:::note
このパスは、スケーラビリティよりもシンプルさを優先します。すべてのサービスが単一マシンを共有するため、処理できる負荷には現実的な上限があります。単一 VM の容量を超える場合は、下記のマルチノード構成への移行を検討してください。
:::

詳細な要件は [Platform as VM requirements](./deployment-guide/platform-as-vm/requirements) を参照してください。  
導入手順は [Platform as VM deployment](./deployment-guide/platform-as-vm/deployment) を参照してください。

## オンプレミスマシン

オンプレミスパスでは、すべてをお客様が管理するベアメタルサーバーまたは仮想マシン上で動かします。Kubernetes とすべてのインフラサービスは自社ハードウェア上にインストールされます。

**お客様が管理するもの**: サーバー、OS、Kubernetes、データベース、Kafka、Redis、MongoDB、ネットワーク、証明書などすべて。

このパスでは、Kubernetes と Linux 運用の経験を持つチームが必要です。すべてのインフラサービスは、専用の infrastructure ノード上でクラスタ内実行されます。

| サービス | 構成 |
| --- | --- |
| SQL データベース | MSSQL、または MariaDB/MySQL + PostgreSQL（クラスタ内） |
| Kafka | クラスタ内 |
| Redis | クラスタ内 |
| MongoDB | クラスタ内 |

詳細なハードウェア要件は [On-premise machines requirements](./deployment-guide/on-premise-machines/requirements) を参照してください。  
導入手順は [On-premise machines environment setup](./deployment-guide/on-premise-machines/environment-setup) を参照してください。

## プライベートクラウド (AWS)

AWS パスでは、Kubernetes に Amazon EKS を利用し、多くのインフラコンポーネントを AWS のマネージドサービスで構成します。自社の AWS アカウント内で完結させつつ、運用負荷を最も低く抑えられる構成です。

**AWS が管理するもの**: Kubernetes control plane、SQL Server（RDS）、Kafka（MSK）、Redis（ElastiCache）。

**引き続きお客様が管理するもの**: AWS アカウント、ネットワーク/VPC、EKS node groups、MongoDB（Atlas またはクラスタ内）。

| サービス | 構成 | 状態 |
| --- | --- | --- |
| SQL データベース | Amazon RDS for SQL Server | サポート済み |
| Kafka | Amazon MSK | サポート済み |
| Redis | Amazon ElastiCache for Redis | サポート済み |
| MongoDB | MongoDB Atlas またはクラスタ内 | サポート済み（DocumentDB は近日対応予定） |

AWS 環境全体（VPC、EKS、RDS、MSK、ElastiCache、KMS、IAM）を infrastructure-as-code で構築するための **Terraform 参照構成** が用意されています。

詳細なサイジングとコストは [AWS infrastructure requirements](./deployment-guide/aws/requirements) を参照してください。  
導入手順は [AWS environment setup](./deployment-guide/aws/environment-setup) を参照してください。

## プライベートクラウド (Azure)

Azure パスでは、Kubernetes に AKS を利用し、SQL とキャッシュにはマネージドサービスを利用します。Kafka と MongoDB はクラスタ内、またはサードパーティのマネージドサービスとして実行します。

**Azure が管理するもの**: Kubernetes control plane、SQL データベース（SQL Managed Instance）、Redis（Azure Cache）。

**引き続きお客様が管理するもの**: Azure subscription、ネットワーク/VNet、AKS node pools、Kafka、MongoDB。

| サービス | 構成 | 状態 |
| --- | --- | --- |
| SQL データベース | Azure SQL Managed Instance | サポート済み |
| Redis | Azure Cache for Redis | サポート済み |
| Kafka | Confluent Cloud またはクラスタ内 | Event Hubs の Kafka レイヤーは未サポート（時期未定） |
| MongoDB | MongoDB Atlas またはクラスタ内 | Cosmos DB は近日対応予定 |

Kafka と MongoDB は、Azure subscription 経由で課金される marketplace 提供サービス（Confluent Cloud、MongoDB Atlas）として用意することも、付属の Helm チャートで Kubernetes クラスタ内にデプロイすることもできます。

詳細なサイジングは [Azure infrastructure requirements](./deployment-guide/azure/requirements) を参照してください。  
導入手順は [Azure environment setup](./deployment-guide/azure/environment-setup) を参照してください。

## SQL データベースの選択肢

デプロイパスにかかわらず、SQL レイヤーの構成方法は 2 つあります。

**Option A - 単一 MSSQL インスタンス**: 運用、identity、reporting のすべてを 1 つの SQL Server で構成します。最もシンプルな構成です。

**Option B - MariaDB/MySQL + PostgreSQL**: 運用・identity に MariaDB または MySQL を使い、reporting に PostgreSQL を使います。この分離がある理由は次のとおりです。

- 運用系サービスは MariaDB、MySQL、MSSQL をサポートしている
- reporting engine（Spark ETL）は MSSQL または PostgreSQL のみをサポートしている

既存のデータベース運用経験やライセンス条件に応じて選択してください。
