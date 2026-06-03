---
sidebar_position: 3
title: Salesforce アラート
description: Cloud Broker を介して Salesforce を OpenLM に接続し、ライセンスシートを監視してアラートを表示します。
---

Salesforce アラート連携を使用して、Salesforce 組織を OpenLM Cloud Broker に接続します。接続後、Cloud Broker が Salesforce から利用シグナルを取得し、OpenLM がライセンスシートの監視、重要イベントのアラート発報、Subscription Optimizer などの下流サービスへのフィードを行えるようにします。

このガイドを完了すると、OpenLM が Connected App を介して Salesforce 組織を認証し、Cloud Broker での接続が成功し、Salesforce のデータが OpenLM Alerts とレポートで利用可能になります。

## 連携の仕組み

OpenLM は **Salesforce Connected App** と OAuth のユーザー名/パスワードフローを使用して認証します。Salesforce 側で Connected App を登録し、Consumer Key と Consumer Secret を取得した後、Salesforce のユーザー名とパスワードと一緒に OpenLM Cloud Broker に入力します。Cloud Broker はその認証情報を使用してデータを取得し、OpenLM Alerts と下流サービスに公開します。

### 必要なコンポーネント

Salesforce を OpenLM に接続するには、次のコンポーネントが必要です。

- **Cloud Broker** が有効化され、**Salesforce Alerts Integration** が有効化された OpenLM Cloud アカウント。
- Connected App を作成および管理できる Salesforce 組織。初回構成にはサンドボックスの使用を推奨します。
- OpenID Connect 設定の有効化、Connected App の作成、アクセスポリシーの調整を行える Salesforce 管理者権限。

:::info
本連携は現在、Salesforce のログインホスト `https://login.salesforce.com` を前提としています。`https://test.salesforce.com` を使用するサンドボックスでは追加構成なしには動作しない場合があります。サンドボックスを接続する前に、対象ホストを OpenLM サポートに確認してください。
:::

## 連携を構成する

このセクションのタスクは順番に実行します。OpenLM 側で Connected App の認証情報が必要となるため、Salesforce 側の作業を先に行います。

### 前提条件を確認する

開始前に、以下の要件を満たしていることを確認してください。

- 管理者として Salesforce にサインインできる。
- 管理者として OpenLM Cloud にサインインできる。
- OpenLM で **Cloud Broker** が有効化されている。[Cloud Broker](../data-collection/cloud-broker) を参照してください。

### Salesforce で OpenID Connect 設定を有効化する

1. Salesforce で **Setup** を開き、**Identity → OAuth and OpenID Connect Settings** に移動します。
2. **Allow OAuth Username-Password Flows** をオンにします。
3. **Allow OAuth User-Agent Flows** をオンにします。
4. 変更を保存します。

### Connected App を作成する

1. Salesforce Setup で **Apps → App Manager** を開き、**New Connected App** を選択します。
2. 基本情報を入力します。
   - **Connected App Name** — `OpenLM Cloud Broker` などの分かりやすい名称。
   - **API Name** — Connected App Name から Salesforce が自動入力します。必要に応じて調整してください。
   - **Contact Email** — 管理者のメールアドレス。
3. **API (Enable OAuth Settings)** セクションで以下を実行します。
   - **Enable OAuth Settings** を選択します。
   - **Callback URL** に `http://localhost` を設定します。Salesforce はこのフローで `http` スキームを許容します。
   - OAuth スコープを追加します。**Issue JSON Web Token (JWT) based access tokens** を除く、利用可能なすべてのスコープを選択します。
4. Connected App を保存します。

Salesforce が Connected App をプロビジョニングすると、Manage Connected Apps ページで **Consumer Key** と **Consumer Secret** が利用可能になります。これらの値は後の手順で OpenLM にコピーします。

### アクセスポリシーを調整する

Connected App でアクセスポリシーを調整するまで、Salesforce は OAuth フローをデフォルトでブロックします。

1. **Setup → Apps → Manage Connected Apps** を開きます。
2. 作成した Connected App を選択します。
3. **Permitted Users** を **All users may self-authorize** に設定します。
4. **IP Relaxation** を **Relax IP restrictions** に設定します。
5. 保存します。

:::warning
**All users may self-authorize** は概念実証で最も簡単な設定です。本番運用では Connected App を特定のパーミッションセットまたはプロファイルに限定し、IP 制限の緩和をセキュリティチームと確認してください。
:::

### OpenLM で Salesforce Alerts Integration を有効化する

1. OpenLM Cloud にサインインします。
2. ナビゲーションメニューから **Products** を開きます。
3. **Salesforce Alerts Integration** カードを探し、**Activate** を選択します。

### Cloud Broker で Salesforce を接続する

1. ナビゲーションメニューから **Cloud Broker** を開きます。
2. サポートされているサービス一覧から **Salesforce** を選択し、未有効ならば **Active** にします。
3. 先ほど取得した認証情報を入力します。

| 項目 | 入力する値 |
|---|---|
| Consumer Key | Salesforce Connected App の Consumer Key。 |
| Consumer Secret | Salesforce Connected App の Consumer Secret。 |
| Username | Cloud Broker が認証に使用する Salesforce ユーザー名。 |
| Password | そのユーザーのパスワード。 |

4. 構成を保存します。

### 初回フェッチを実行する

1. Cloud Broker で **Commands** を開き、Salesforce 同期コマンドを実行します。
2. 成功状態を確認します。

コマンドが失敗する場合は、[トラブルシューティング](#トラブルシューティング) を参照してください。

## 連携を検証する

初回フェッチが成功したら、OpenLM へのデータ流入を検証します。

1. Cloud Broker で、最終成功フェッチのタイムスタンプが更新されることを確認します。
2. OpenLM Alerts で Salesforce データを対象とするアラートルールを定義し、条件成立時にルールが発動することを確認します。
3. お使いのレポートツールで、Salesforce 由来の行が表示されることを確認します。

## トラブルシューティング

| 症状 | 想定される原因 | 対処 |
|---|---|---|
| Cloud Broker が認証エラーを報告する。 | Consumer Key、Consumer Secret、ユーザー名、パスワードのいずれかが正しくない、または Connected App がまだ有効になっていない。 | 4 つの項目を 1 文字ずつ確認します。Connected App が保存され、アクセスポリシーが設定されていることを確認します。 |
| Cloud Broker は接続できるがデータが返らない。 | Salesforce ユーザーが対象オブジェクトへのアクセス権を持っていない。 | 適切な Salesforce プロファイルまたはパーミッションセットをユーザーに割り当てます。 |
| Connected App が IP ブロックでリクエストを拒否する。 | IP Relaxation が **Enforce IP restrictions** に設定されている。 | Connected App の IP Relaxation を **Relax IP restrictions** に設定します。 |
| Connected App がセルフ承認エラーでリクエストを拒否する。 | **Permitted Users** が **Admin approved users are pre-authorized** で、ユーザーが事前承認されていない。 | **Permitted Users** を **All users may self-authorize** に設定するか、対象プロファイルを事前承認します。 |
| Salesforce ユーザーがサンドボックスにあり接続が失敗する。 | 連携は `login.salesforce.com` を前提としている。 | サンドボックスを接続する前に、対象ホストを OpenLM サポートに確認してください。 |

## 既知の制限事項

- 本連携は本番 Salesforce のログインホストを前提としています。サンドボックス対応には OpenLM サポートの確認が必要です。
- Cloud Broker UI では項目名として **Client ID** および **Client Secret** が表示される箇所があります。これらは Salesforce 側の **Consumer Key** および **Consumer Secret** に対応します。同義として扱ってください。
- Cloud Broker のパスワード入力欄は入力中にマスキングされません。構成中は画面共有を避けてください。

## 関連項目

- [Cloud Broker](../data-collection/cloud-broker)
- [OpenLM Alerts](../automations/alerts)
- [Subscription Optimizer](../automations/subscription-optimizer)
- [Products](../openlm-administration/products)
