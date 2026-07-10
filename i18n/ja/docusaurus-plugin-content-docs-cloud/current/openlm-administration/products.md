---
title: "製品（Products）"
sidebar_position: 2
description: "Products では、アカウントの OpenLM 製品の有効化・無効化、新規ユーザーに割り当てるデフォルトロールの設定、OpenLM コンポーネントのダウンロード、サードパーティ連携統合の管理を行えます。"
---

**Products** では、アカウントで利用できる OpenLM 製品を管理します。このアプリケーションから、製品の有効化・無効化、各製品が新規ユーザーに割り当てるデフォルトロールの設定、OpenLM コンポーネントのインストーラーのダウンロード、サードパーティのチケットシステムとの連携統合の管理を行えます。

開くには、OpenLM ポータルで **Navigation** を選択し、**Products** を選択します。アプリケーションの左ナビゲーションの **Management** には、次の 3 つのページがあります。

- **Products** — アカウントのすべての OpenLM 製品を表示・管理します。
- **Downloads** — OpenLM コンポーネントのインストーラーをダウンロードします。
- **Integrations** — サードパーティのチケットシステムとのアラート連携統合を管理します。

![Products ページでは、製品カードが Active、Deactivated、Available、System products の各セクションにグループ化されます。](/services/openlm_administration/products.png)
*Figure 1. Products ページでは、製品カードが Active、Deactivated、Available、System products の各セクションにグループ化されます。*

## 製品のセクション

Products ページでは、製品が 4 つのセクションにグループ化されます。製品は有効化状態の変化に応じて最初の 3 つのセクション間を移動します。システム製品は専用のセクションに常に表示されます。

| セクション | 表示される内容 |
|---|---|
| Active products | アカウントで有効化されている製品。製品名を選択すると、そのユーザーインターフェースが新しいタブで開きます。有効化が進行中または失敗した製品もここに表示されます。 |
| Deactivated products | 以前に有効化した後、無効化した製品。**Reactivate** を選択すると再度有効化できます。 |
| Available products | OpenLM が提供している、まだ有効化していない製品。**Activate** を選択すると製品が **Active products** に移動します。 |
| System products | デフォルトで常に有効な OpenLM のコア製品。無効化はできません。ロールが定義されているシステム製品では、[デフォルトロールの設定](#デフォルトロールの設定)のための **Settings** が利用できます。 |

## 製品カード

各製品カードには、製品のアイコン、名前、説明と、製品の現在の状態に応じたアクションが表示されます。

- **アクションボタン** — メインボタンは製品の状態によって変わります。**Activate**（未有効化）、**Deactivate**（有効化中）、**Reactivate**（無効化済み）、**Retry**（有効化・無効化が保留中または失敗）。システム製品にはアクションボタンはありません。
- **Settings** — 製品の[デフォルトロール設定](#デフォルトロールの設定)を開きます。このリンクは、ロールを定義しているシステム製品および有効な製品に表示されます。
- **Learn more** — openlm.com の製品説明ページを新しいタブで開きます。このリンクは、説明ページが用意されている製品に表示されます。

トップバーの **Lite view** / **Detailed view** トグルでカードレイアウトを切り替えられます。デフォルトの Lite view はコンパクトなカードを表示します。Detailed view では、製品が提供する個々のサービスを一覧表示する **Services included** パネルが追加されます。有効な製品とシステム製品では、一覧の各サービスがそのユーザーインターフェースを開くリンクになります。たとえば、Software License Management には License Servers、Licenses、Denials、Usage、License Allocations の各サービスが含まれ、Process Monitoring には Process Manager、Process Sessions、Personal Dashboard が含まれます。

![Detailed view では、各製品カードに製品が提供するサービスを一覧表示する Services included パネルが追加されます。](/services/openlm_administration/products-detailed-view.png)
*Figure 2. Detailed view では、各製品カードに製品が提供するサービスを一覧表示する Services included パネルが追加されます。*

## システム製品

OpenLM Cloud では、ライセンス構成に関係なく、10 個のシステム製品がデフォルトで有効になっています。これらは常に **System products** セクションに表示されます。

- Agent Activity Manager
- Agents Hub
- Audit
- Broker Hub
- Cloud Broker
- Identity Service
- Notifications
- Reporting
- Users And Groups
- OpenLM License

![System products セクションには、常に有効な OpenLM のコア製品が一覧表示されます。](/services/openlm_administration/products-system.png)
*Figure 3. System products セクションには、常に有効な OpenLM のコア製品が一覧表示されます。*

## 製品の有効化

1. **Products** ページで **Available products** までスクロールします。
2. 製品カードで **Activate** を選択します。
3. **Activate Product** ダイアログで **Confirm** を選択します。

ほとんどの製品は即座に有効化されます。カードが **Active products** に移動し、製品のメニュー項目が OpenLM Platform のナビゲーションに追加されます。ページはリアルタイムで更新されるため、再読み込みは不要です。

一部の製品は、有効化時に追加のインフラストラクチャをプロビジョニングします。**Software License Management**、**Directory Sync**、および OpenLM Cloud では **ServiceNow Connector** が該当します。これらのカードは、有効化の実行中は **Activation can take up to 10 minutes, please wait...** というメッセージとともに **Active products** に表示されます。10 分以内に有効化が完了しない場合、カードに **Activation failed** と表示され、**Retry** ボタンが利用可能になります。

:::note
製品を有効化できるのは、その製品が OpenLM ライセンスの対象になっている場合のみです。対象でない場合、有効化は失敗し、OpenLM セールスへの問い合わせを促すメッセージが表示されます。サブスクリプションに含まれる製品を確認するには、[OpenLM ライセンスマネージャー](./license-manager#プロダクトとフィーチャーのマッピング)を参照してください。
:::

### 製品の依存関係

一部の製品は、先に別の製品が有効になっている必要があります。

| 製品 | 必要な製品 |
|---|---|
| Virtual License Manager | Software License Management |
| Subscription Optimizer | License Access Control |
| Identity Alignment | Directory Sync |
| LDAP Connector | Directory Sync |

依存製品が有効になっていない製品を有効化しようとすると、**Dependent Products** ダイアログが開き、必要な各製品とその有効化状態が一覧表示されます。**Activate All** を選択して不足している依存製品をまとめて有効化するか、個別に有効化してから確定します。

## 製品の無効化

1. **Active products** で、製品カードの **Deactivate** を選択します。
2. **Deactivate Product** ダイアログで **Confirm** を選択します。

製品は **Deactivated products** に移動し、そのメニュー項目は OpenLM Platform のナビゲーションから削除されます。**Reactivate** でいつでも再有効化できます。

:::warning
**Software License Management** または **Directory Sync** を無効化すると、その製品に関連するすべてのデータが完全に削除されます。確認ダイアログはデータ損失について警告し、**Confirm** ボタンは 10 秒のカウントダウン後にのみ利用可能になります。
:::

製品は自動的に無効化されることもあります。製品をカバーするライセンスフィーチャーの有効期限が切れると、その製品は無効化されます。この方法で無効化された製品は、ライセンスが更新されると自動的に再有効化されます。手動で無効化した製品は無効のままです。すべての有効化・無効化・デフォルトロールの変更は [Audit](./audit) に記録されます。

## デフォルトロールの設定

ロールを定義している各製品には、デフォルトロール割り当てのための **Settings** オプションがあります。割り当てられたデフォルトロールは、新規ユーザーの作成時にその製品用として自動的に事前選択されますが、ユーザー設定を確定する前に削除できます。ユーザーへの製品ロールの割り当てについては、[Users and Groups](../users/users-and-groups) を参照してください。

1. 製品カードで **Settings** を選択します。
2. **Default Role** で、デフォルトとして割り当てるロールを選択します。
3. **Save** を選択します。

![製品の設定ページでは、その製品の Default Role を選択できます。](/services/openlm_administration/product-settings-roles.png)
*Figure 4. 製品の設定ページでは、その製品の Default Role を選択できます。*

ほとんどの製品には **Admin** と **Viewer** のロールがあります。一部の製品は異なります。Virtual License Manager には部門の **Manager** ロールが追加され、ServiceNow Connector にはコンポーネントごとに個別の Admin と Viewer のロールが定義されています。また、一部の製品（Notifications、Identity Alignment、LDAP Connector など）には Admin ロールのみが定義されています。ロールが定義されていない製品（Identity Service、Reporting、Subscription Optimizer など）のカードには **Settings** リンクは表示されません。

## OpenLM コンポーネントのダウンロード

**Downloads** ページでは、環境内で実行する OpenLM コンポーネントのインストーラーを提供します。ページには 2 つのタブがあります。**Platform** タブには OpenLM Platform デプロイ向けの最新リリースが、**Legacy** タブには Version 25（オンプレミス）デプロイ向けのコンポーネントが表示されます。

各カードには、コンポーネントの現在のバージョン、簡単な説明、利用可能なパッケージ形式のメニューを持つ **Download** ボタン、および該当するインストールガイドを開く **Documentation** ボタンが表示されます。

![Downloads ページの Platform タブでは、Workstation Agent、Broker、DSA、SaaS Agent のインストーラーを提供します。](/services/openlm_administration/products-downloads.png)
*Figure 5. Downloads ページの Platform タブでは、Workstation Agent、Broker、DSA、SaaS Agent のインストーラーを提供します。*

**Platform** タブには次のコンポーネントが含まれます。インストール手順については、[コンポーネントのインストール](../deployment-operations/components-installation)を参照してください。

| コンポーネント | パッケージ形式 |
|---|---|
| Workstation Agent | Windows Installer、tar.gz Archive、Debian Package、RPM Package、macOS (Intel)、macOS (Apple Silicon) |
| Broker | Windows Installer、tar.gz Archive、Debian Package、RPM Package |
| DSA — Directory Synchronization Agent | Windows Installer |
| SaaS Agent | Windows Installer |

**Legacy** タブには Version 25 のコンポーネントが一覧表示されます。SLM、Identity、Broker、AutoCAD Plugin、Workstation Agent、End-User Services、ServiceNow Adapter、Directory Sync、Reporting Hub、Applications Manager、Reports Scheduler です。各レガシーカードには、コンポーネントの変更履歴を開く **See what's new** リンクも表示されます。

![Downloads ページの Legacy タブでは、Version 25 コンポーネントのインストーラーと変更履歴を提供します。](/services/openlm_administration/products-downloads-legacy.png)
*Figure 6. Downloads ページの Legacy タブでは、Version 25 コンポーネントのインストーラーと変更履歴を提供します。*

## 連携統合の管理

**Integrations** ページでは、OpenLM のアラートからサードパーティシステムにチケットを作成するアラート連携統合を管理します。Products ページとまったく同じ仕組みで、**Active**、**Deactivated**、**Available** の各セクション、同じカードアクション、同じ表示トグルがあります。

利用できる連携統合は次のとおりです。

- [Freshworks Alerts Integration](../integrations/freshworks-alerts) — Freshdesk にチケットを作成します。
- [Zoho Alerts Integration](../integrations/zoho-alerts) — Zoho Desk にチケットを作成します。
- [Salesforce Alerts Integration](../integrations/salesforce-alerts) — Salesforce Service Cloud にケースを作成します。
- Zendesk Alerts Integration — Zendesk にチケットを作成します。

![Integrations ページでは、サードパーティのチケットシステムとのアラート連携統合を管理します。](/services/openlm_administration/products-integrations.png)
*Figure 7. Integrations ページでは、サードパーティのチケットシステムとのアラート連携統合を管理します。*

## OpenLM Cloud とオンプレミスの違い

製品カタログはデプロイモデルによって少し異なります。

| 項目 | OpenLM Cloud | OpenLM オンプレミス |
|---|---|---|
| Cloud 専用製品 | License Parser、Identity Alignment、LDAP Connector、および Freshworks・Salesforce・Zoho のアラート連携統合が利用できます。 | 利用できません。 |
| Diagnostics & Logs | 利用できません。 | プラットフォーム監視用のシステム製品として利用できます。 |
| Anonymization | 利用できません。 | システム製品として利用できます。 |
| Identity Service | システム製品として常に有効です。 | 標準の製品として管理されます。 |
| Reporting | Quicksight Reporting と Touch Point Events のサービスが含まれます。 | Superset Reporting と Touch Point Events のサービスが含まれます。 |
| ServiceNow Connector | 有効化時にインフラストラクチャをプロビジョニングするため、最大 10 分かかることがあります。 | 即座に有効化されます。 |
