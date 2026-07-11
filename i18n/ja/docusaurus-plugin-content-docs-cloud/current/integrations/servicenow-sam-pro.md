---
title: ServiceNow Connector
description: "OpenLM Platform を ServiceNow Software Asset Management Professional（SAM Pro）に接続する手順を説明します。"
sidebar_position: 1
---

このトピックでは、OpenLM Platform を ServiceNow Software Asset Management Professional（SAM Pro）に接続する方法を説明します。エンジニアリング ライセンスの使用状況と拒否データを同期して、ServiceNow で確認できるようにします。

このトピックを完了すると、OpenLM と ServiceNow を接続し、同期オプションを設定して、SAM Pro のレポートが OpenLM データを使用していることを確認できます。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Integrations（連携統合）→ ServiceNow Connector** を選択します。

**事前準備:** [OpenLM Products](/cloud/openlm-administration/products) で **ServiceNow Connector** を有効化し（有効化ではインフラがプロビジョニングされ、最大 10 分かかることがあります）、ServiceNow マーケットプレイスから **OpenLM Adapter Integration** をインストールします。
:::

## 連携の仕組み

この連携により、OpenLM の使用状況データを ServiceNow に送信し、SAM Pro がライセンス使用状況とコンプライアンスをレポートできるようになります。

### 目的とメリット

この連携で次のことができます。

- SAM Pro でエンジニアリング ライセンスの使用状況と拒否の傾向を確認する。
- OpenLM の実使用状況と発行元のコンプライアンスを比較する。
- 主要なライセンス メトリクスを ServiceNow SAM Pro に集約する。

### 必要なコンポーネント

OpenLM データを ServiceNow に送信するには、次のコンポーネントが必要です。

- OpenLM Platform で有効化した OpenLM Connector
- ServiceNow マーケットプレイスから取得し、サーバーにインストールした OpenLM Adapter Integration

## 連携を構成する

このセクションの手順を完了して、接続と同期を行います。

### 前提条件を確認する

作業を開始する前に、次の要件を満たしていることを確認します。

- ServiceNow インスタンスに SAM Pro がインストールされ、構成されている。
- ServiceNow チームが、Engineering Application Usage などの SAM Pro ターゲット テーブルを有効化している。
- ServiceNow インスタンスの URL と認証情報を把握している。
- Open Authorization（OAuth）を使用する場合は、OAuth クライアント ID とクライアント シークレットを把握している。

### OpenLM で ServiceNow を接続する

OpenLM の ServiceNow Connector を使用して接続を設定します。

1. OpenLM Platform で ServiceNow Connector が有効であることを確認します。
2. ServiceNow Connector が無効の場合は、営業担当に連絡して有効化を依頼します。
3. メイン メニューで ServiceNow Connector を選択します。
4. ServiceNow connection タブで ServiceNow インスタンスの URL を入力します。
5. 認証方法を選択します。
6. ServiceNow のユーザー名とパスワードを入力します。
7. Open Authorization（OAuth）を使用する場合は、OAuth クライアント ID とクライアント シークレットを入力します。
8. Test Connection を選択します。
9. Save を選択します。

![OpenLM Platform の ServiceNow Connector にある ServiceNow connection の設定](/img/integrations/servicenow-olm/servicenow-connection.png)
*OpenLM Platform の ServiceNow Connector にある ServiceNow connection の設定*

### 同期オプションを設定する

OpenLM が ServiceNow にデータを送信する頻度を設定します。

1. Sync configurations タブでタイム ゾーンを設定します。
2. 同期頻度を選択します。daily または weekly を選択します。
3. Activate Sync を選択します。
4. Save を選択します。
5. 手動同期を実行する場合は、Sync Now を選択します。

![OpenLM Platform の ServiceNow Connector にある Sync configurations タブ](/img/integrations/servicenow-olm/servicenow-sync-configurations.png)
*OpenLM Platform の ServiceNow Connector にある Sync configurations タブ*

### 同期されるデータを確認する

OpenLM は ServiceNow の 13 個のステージング テーブルにデータを送信します。データは次のカテゴリです。

- Usage
- Denials
- Aggregated usage
- Alerts
- Computers
- Groups
- User information
- License
- Inventory
- Server information
- Hosts
- Projects
- Users

![OpenLM データ用の ServiceNow ステージング テーブルの一覧](/img/integrations/servicenow-olm/servicenow-staging-tables.png)
*OpenLM データ用の ServiceNow ステージング テーブルの一覧*

### データが SAM Pro に届く流れを理解する

ServiceNow で検証する箇所を把握するために、次の 2 段階の流れを確認します。

1. OpenLM が ServiceNow インスタンス内の OpenLM Adapter Integration によって作成されたステージング テーブルにデータを送信します。
2. ServiceNow SAM Pro がステージング データを Engineering Application Usage などのターゲット テーブルに変換し、レポートとダッシュボードで使用します。

![OpenLM のステージング テーブルから SAM Pro ターゲット テーブルへの ServiceNow 変換マップ](/img/integrations/servicenow-olm/servicenow-transform-map.png)
*OpenLM のステージング テーブルから SAM Pro ターゲット テーブルへの ServiceNow 変換マップ*

## 連携を検証する

同期を設定した後、SAM Pro が OpenLM データを使用していることを確認します。

1. Sync Now を選択して手動同期を実行します。
2. 手動同期を実行しない場合は、スケジュールされた同期の実行を待ちます。
3. ServiceNow で OpenLM のステージング テーブルに新しいレコードがあることを確認します。
4. Engineering Application Usage などの SAM Pro ターゲット テーブルに変換済みのデータがあることを確認します。
5. ServiceNow Software Asset Workspace でレポートとダッシュボードを確認し、使用状況とコンプライアンスのメトリクスに OpenLM データが反映されていることを確認します。
