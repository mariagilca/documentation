---
sidebar_position: 999
---

# サービス一覧

このドキュメントでは、OpenLM Platform に含まれるすべてのサービスを機能別に分類して一覧表示します。カテゴリは OpenLM Cloud アプリランチャーの **All Applications** パネルに準拠しています。

## プラットフォーム管理

以下のサービスは、アイデンティティ、OpenLM ライセンス自体、有効化可能な製品カタログ、システム監査、UI 表示設定を担当します。すべてのアカウントが最初から利用できます。

- [Identity](/cloud/openlm-administration/identity)
- [OpenLM License Manager](/cloud/openlm-administration/license-manager)
- [Products](/cloud/openlm-administration/products)
- [UI Configuration](/cloud/openlm-administration/ui-configuration)
- [Audit](/cloud/openlm-administration/audit)
- [Database Configuration Tool](/cloud/openlm-administration/database-configuration-tool) — オンプレミス展開向けのデスクトップユーティリティです。クラウドアプリランチャーには表示されません。

## ユーザー

以下のサービスは、エンドユーザーアカウント、利用状況の按分のためのプロジェクトタグ付け、エンドユーザーが目にするダッシュボード、外部ディレクトリとの同期を管理します。

- [Users and Groups](/cloud/users/users-and-groups)
- [Projects](/cloud/users/projects)
- [Personal Dashboard](/cloud/users/personal-dashboard) — Workstation Agent によって提供されるエンドユーザー向けの画面です。クラウドアプリランチャーには表示されません。
- [Directory Synchronization Service (DSS)](/cloud/users/directory-sync)
- [LDAP Connector](/cloud/users/ldap-connector) — DSS の同期出力を Amazon S3 と Amazon SQS（FIFO）へ転送します。クラウド専用です。

## ライセンスと機能

以下のサービスは、エンジニアリングライセンスの調査と管理を行います。ライセンスインベントリ、ライセンスを発行するサーバー、過去の割り当て、ライセンスファイルのライフサイクル、仮想ライセンス層、アセットレベルでのポリシー適用を扱います。

- [Licenses](/cloud/slm/licenses)
- [License Servers](/cloud/slm/license-servers)
- [License Allocations](/cloud/slm/license-allocations)
- [License File Management](/cloud/lfm)
- [Virtual License Manager (VLM)](/cloud/vlm)
- [Compliance](/cloud/compliance)
- [Dongle Monitoring](/cloud/dongle-monitoring)
- [License Parser](/cloud/license-parser)

## ブローカー

ブローカーとハブは、ライセンスサーバーのデータを収集して OpenLM に公開します。Broker Hub は従来型 Broker のオーケストレーション層であり、Cloud Broker は Broker を実行できない SaaS ライセンスソースを扱います。

- [Broker Hub](/cloud/data-collection/broker-hub)
- [Cloud Broker](/cloud/data-collection/cloud-broker)

## エージェント

エージェントは、エンドユーザーがワークステーションで実際に行っている操作を追跡します。Workstation Agent は各 PC で動作し、Agents Hub で構成し、Agent Activity Manager で監視と保守を行います。

- [Agents Hub](/cloud/data-collection/agents_hub)
- [Agent Activity Manager](/cloud/data-collection/agent_activity_manager)

## オートメーションとポリシー

以下のサービスは、観測を行動につなげます。条件成立時のアラート、適切なチャネルへの通知、ライセンスマネージャーでのポリシー適用、ライセンスハーベスティング、SaaS シートの再割り当て、アイデンティティ駆動のクリーンアップ、調達トラッキングを扱います。

- [OpenLM Alerts](/cloud/automations/alerts)
- [Notifications](/cloud/automations/notifications)
- [License Access Control](/cloud/automations/lac)
- [Process Manager](/cloud/automations/process-manager)
- [Subscription Optimizer](/cloud/automations/subscription-optimizer) — アカウントで有効化されている場合のみ表示されます。
- [Identity Alignment](/cloud/automations/identity-alignment) — Cloud Broker を介して、外部サービスから廃止されたユーザーを自動的に削除します。以前の名称は OneDirectorySync です。
- [Software Asset Management](/cloud/sam)

## レポート

以下のサービスは、プラットフォーム UI とより詳細な BI ダッシュボード上で、使用状況、拒否、過去のセッションのレポートを提供します。

- [Denials](/cloud/reporting/ui-reports/denials)
- [Process Sessions](/cloud/reporting/ui-reports/process-sessions)
- [Touch Point Events](/cloud/reporting/ui-reports/touch-point-events)
- [Usage](/cloud/reporting/ui-reports/usage)
- [BI Reports](/cloud/category/bi-reports) — OpenLM レポートデータベース上のキュレーション済みダッシュボードです。クラウドでは Amazon QuickSight、オンプレミスでは Apache Superset を使用します。

## 統合

以下のサービスは、ITSM、ヘルプデスク、CRM プラットフォームと OpenLM を接続し、ライセンスイベントをチームが日常的に使うツールに表示します。

- [ServiceNow](/cloud/integrations/servicenow-sam-pro)
- [Freshworks Alerts](/cloud/integrations/freshworks-alerts)
- [Salesforce Alerts](/cloud/integrations/salesforce-alerts)
- [Zoho Alerts](/cloud/integrations/zoho-alerts)

_各サービスの詳細については、専用のドキュメントを参照してください。_
