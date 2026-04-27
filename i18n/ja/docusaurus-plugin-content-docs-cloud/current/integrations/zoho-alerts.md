---
sidebar_position: 4
title: Zoho アラート
description: Zoho サービスを OpenLM に接続し、ライセンスシートを監視してアラートを転送します。
---

# Zoho アラート

Zoho アラート連携を使用して、Zoho サービスを OpenLM Cloud Broker に接続します。接続後、Cloud Broker が Zoho から利用シグナルを取得し、OpenLM がライセンスシートの監視、重要イベントのアラート発報、Subscription Optimizer などの下流サービスへのフィードを行えるようにします。

このガイドを完了すると、OpenLM が Zoho セルフクライアント OAuth アプリケーションを介して Zoho を認証し、Cloud Broker での接続が成功し、Zoho のデータが OpenLM Alerts とレポートで利用可能になります。

:::info
本連携は、お使いの Cloud Broker バージョンがサポートする Zoho サービスに限定されます。Cloud Broker UI には対応する Zoho サービスが明示的に表示されます。必要な Zoho サービスが一覧に表示されない場合は、構成を始める前にサポートへお問い合わせください。
:::

## 連携の仕組み

OpenLM は **Zoho セルフクライアント OAuth アプリケーション** を使用して Zoho アカウントに認証します。Zoho API コンソールでクライアントを登録し、Client ID と Client Secret を生成した後、OpenLM Cloud Broker に入力します。Cloud Broker はその認証情報を使用してデータを取得し、OpenLM Alerts と下流サービスに公開します。

### 必要なコンポーネント

Zoho を OpenLM に接続するには、次のコンポーネントが必要です。

- **Cloud Broker** が有効化され、**Zoho Alerts Integration** が有効化された OpenLM Cloud アカウント。
- 監視対象の Zoho サービスに対する管理者アクセス権を持つ Zoho アカウント。
- [Zoho API コンソール](https://api-console.zoho.com/) で OAuth クライアントを登録できる権限。

## 連携を構成する

このセクションのタスクは順番に実行します。OpenLM 側で OAuth 認証情報が必要となるため、Zoho 側の作業を先に行います。

### 前提条件を確認する

開始前に、以下の要件を満たしていることを確認してください。

- 監視対象の Zoho サービスに対して管理者として Zoho にサインインできる。
- 管理者として OpenLM Cloud にサインインできる。
- OpenLM で **Cloud Broker** が有効化されている。[Cloud Broker](../data-collection/cloud-broker) を参照してください。
- Zoho アカウントが属するデータセンター（たとえば `.com`、`.eu`、`.in`）を把握している。データセンターは OpenLM および API のホスト名に影響します。

### Zoho セルフクライアントを登録する

1. [Zoho API コンソール](https://api-console.zoho.com/) を開いてサインインします。
2. **Add Client** を選択し、**Self Client** を選びます。
3. 登録を確認します。Zoho がセルフクライアントの **Client ID** と **Client Secret** を生成します。
4. 接続する Zoho サービスに必要なスコープを生成します。必要なスコープは Zoho サービスによって異なるため、OpenLM サポートに確認してください。
5. API コンソールから **Client ID**、**Client Secret**、および **Generated Code** をコピーします。これらの値は OpenLM で使用します。

:::tip
セルフクライアントの OAuth トークンには短い有効期限があります。生成直後に OpenLM Cloud Broker へコピーする想定で進めてください。
:::

### OpenLM で Zoho Alerts Integration を有効化する

1. OpenLM Cloud にサインインします。
2. ナビゲーションメニューから **Products** を開きます。
3. **Zoho Alerts Integration** カードを探し、**Activate** を選択します。

### Cloud Broker で Zoho を接続する

1. ナビゲーションメニューから **Cloud Broker** を開きます。
2. サポートされているサービス一覧から該当の Zoho サービスを選択し、未有効ならば **Active** にします。
3. 先ほど取得した認証情報を入力します。

| 項目 | 入力する値 |
|---|---|
| Client ID | Zoho セルフクライアントの Client ID。 |
| Client Secret | Zoho セルフクライアントの Client Secret。 |
| Authorization Code | Zoho API コンソールで取得した Generated Code。 |
| Data Center | アカウントの Zoho データセンター（たとえば `com`、`eu`、`in`）。 |

4. 構成を保存します。

### 初回フェッチを実行する

1. Cloud Broker で **Commands** を開き、Zoho 同期コマンドを実行します。
2. 成功状態を確認します。

コマンドが失敗する場合は、[トラブルシューティング](#トラブルシューティング) を参照してください。

## 連携を検証する

初回フェッチが成功したら、OpenLM へのデータ流入を検証します。

1. Cloud Broker で、最終成功フェッチのタイムスタンプが更新されることを確認します。
2. OpenLM Alerts で Zoho データを対象とするアラートルールを定義し、条件成立時にルールが発動することを確認します。
3. お使いのレポートツールで、Zoho 由来の行が表示されることを確認します。

## トラブルシューティング

| 症状 | 想定される原因 | 対処 |
|---|---|---|
| Cloud Broker が `invalid_code` で認証エラーを報告する。 | Cloud Broker が交換する前に Generated Code が失効した。 | Zoho API コンソールに戻ってコードを再生成し、すぐに Cloud Broker に保存します。 |
| Cloud Broker が `invalid_client` で認証エラーを報告する。 | Client ID または Client Secret が正しくない。 | Zoho API コンソールの値と 1 文字ずつ照合します。 |
| Cloud Broker は接続できるがデータが返らない。 | セルフクライアントが Zoho サービスに必要なスコープを持っていない。 | 必要なスコープを OpenLM サポートに確認し、そのスコープでセルフクライアントを再生成して再接続します。 |
| Cloud Broker が誤った Zoho ホストにアクセスする。 | Data Center の値がアカウントと一致していない。 | Zoho データセンターを確認し、Data Center の値を更新します。 |

## 既知の制限事項

- Zoho セルフクライアントのフローでは、Generated Code が失効する前に交換する必要があります。Cloud Broker は保存時に交換を実行します。
- サポートされる Zoho サービスは、お使いの Cloud Broker バージョンに依存します。本番運用で Zoho サービスを採用する前に、必要なスコープがカバーされているかを OpenLM サポートで確認してください。

## 関連項目

- [Cloud Broker](../data-collection/cloud-broker)
- [OpenLM Alerts](../automations/alerts)
- [Subscription Optimizer](../automations/subscription-optimizer)
- [Products](../openlm-administration/products)
