---
title: インフラ要件
sidebar_label: 要件
sidebar_position: 1
---

# オンプレミスマシンのインフラ要件

このページでは、お客様が管理するベアメタルサーバーまたは仮想マシン上に OpenLM Platform をデプロイするためのハードウェアおよびソフトウェア要件を説明します。

## クラスタ構成

OpenLM Platform は Kubernetes 上で動作し、約 150 のマイクロサービス、データインフラ（データベース、メッセージブローカー、キャッシュ）、およびレポートエンジンから構成されます。システムを安定かつ信頼性高く運用するため、ワークロードは責務ごとに専用ノードグループへ分離されます。これにより、レポートのような高負荷処理がコアアプリケーションと競合せず、重要なデータサービスもアプリケーション負荷から隔離されます。

クラスタでは 4 つのノードロールを使います。各ロールは専用マシン群で実行され、ロールは混在させません。

### Control plane

Control plane ノードは、Kubernetes のシステムプロセス（API server、etcd、scheduler、controllers）と Ingress controller のみを実行します。アプリケーションワークロードがスケジュールされないよう taint されます。これは必須要件です。Control plane をアプリケーション負荷から切り離すことで、クラスタ安定性と信頼できる Ingress ルーティングを維持します。

### Main workload

Main workload ノードでは、OpenLM のアプリケーションマイクロサービス、API gateway、telemetry が動作します。ライセンス管理、identity、管理機能、ユーザー向けサービスなど、プラットフォームの中核ロジックがここで実行されます。

### Reporting workload

Reporting ノードは、Spark ETL エンジンとレポートサービス専用です。Spark は使用データを処理し、PostgreSQL または SQL Server にレポート用テーブルを出力します。顧客はこれをダッシュボードやコンプライアンスレポートに利用します。Spark はリソース消費が大きいため、CPU とメモリ競合を避ける目的で専用ノード上で実行します。

### Infrastructure

Infrastructure ノードでは、Kafka（メッセージブローカー）、MongoDB、MariaDB または PostgreSQL（運用データベース）、Redis（キャッシュ）といったデータサービスを実行します。これらはシステム内で最も重要なコンポーネントです。いずれかが停止すると、プラットフォーム全体が機能しなくなります。SSD ストレージを持つ専用ノードへ隔離することで、アプリケーション I/O から保護し、一貫したデータベース性能を確保します。

## ノード仕様

これは、小規模から中規模負荷の安定した本番デプロイ向け最小構成です。8 ノード構成がベースラインです。Kubernetes が信頼性を維持し、ワークロードを適切にスケジュールし、ノード障害に対応するには十分なノード数が必要です。

| ロール | 台数 | vCPU | RAM | ストレージ | 備考 |
| --- | --- | --- | --- | --- | --- |
| Control plane | 1 | 4 | 8 GB | 50 GB | Taint 済み、アプリケーションワークロードなし |
| Main workload | 3 | 8 | 16 GB | 50 GB | コアプラットフォームのマイクロサービス |
| Reporting workload | 3 | 8 | 16 GB | 50 GB | Spark ETL とレポートサービス |
| Infrastructure | 1 | 8 | 32 GB | 300 GB（SSD） | データベース、Kafka、Redis |

**合計: 8 ノード、68 vCPU、136 GB RAM、950 GB ストレージ**

:::note
Infrastructure ノードには、データベース性能のため SSD ストレージが必要です。他のノードでは OS とコンテナイメージ用の 50 GB があれば十分で、永続データは保持しません。
:::

## インフラサービス

次のサービスが Infrastructure ノード上で動作します。

| サービス | 用途 | 想定ストレージ |
| --- | --- | --- |
| Kafka | マイクロサービス間イベントストリーミング | 100 GB 以上 |
| MongoDB | ドキュメントストレージ | 20 GB 以上 |
| MariaDB または PostgreSQL | 運用データベースと identity データベース | 50 GB 以上 |
| PostgreSQL または SQL Server | レポートデータベース（Spark ETL 出力先） | 50 GB 以上 |
| Redis | キャッシュおよびセッションストレージ | 最小限 |

永続ストレージ総量: Infrastructure ノード上で約 250 から 400 GB。

## オペレーティングシステム

RHEL 系ディストリビューションを使用します。

- **推奨**: AlmaLinux 9
- **代替**: RHEL 9 または Rocky Linux 9

## Kubernetes ディストリビューション

オンプレミスデプロイでは、CNCF 準拠の任意の Kubernetes ディストリビューションが利用可能です（例: MicroK8s、kubeadm、RKE2、K3s）。

最小 Kubernetes バージョン: `1.28` 以上。

### Storage class

永続ボリューム用に、Infrastructure ノードへ隔離された `local-path` または同等のストレージプロビジョナーが必要です。

## ネットワーク要件

詳細なポート一覧、ファイアウォールルール、ネットワークトポロジーは [ネットワーク](../../networking#オンプレミスマシン) ページを参照してください。

概要:

- すべてのノードは同一 L2 ネットワーク上に置くか、完全なノード間接続を持つ必要があります
- Control plane ノードで Ingress 用に 80 と 443 番ポートを開放
- ノード間ポート: 6443（API）、8472（VXLAN）、10250（kubelet）、51820（WireGuard）
- ドメインを Control plane ノード IP に向ける DNS A レコード
- コンテナイメージ取得用に `public.ecr.aws/r3q3q2f4` への outbound アクセス

## サイジングメモ

- これは、小規模から中規模負荷の安定した本番システム向けベースラインです
- Broker 数やユーザー数が多い場合は Worker ノード数を増やしてください
- データ保持期間が長い場合は Infrastructure ノードのストレージを増やしてください
- デプロイ後にリソース使用率を監視し、必要に応じてスケールしてください
