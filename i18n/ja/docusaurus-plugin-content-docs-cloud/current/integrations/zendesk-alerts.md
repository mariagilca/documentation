---
sidebar_position: 5
title: Zendesk アラート統合
description: OpenLM Alerts から Zendesk チケットの作成を自動化します。
---

Zendesk Alerts 連携を使用すると、OpenLM Alerts から Zendesk チケットの作成を自動化できます。OpenLM でアラートルールが発火すると、この連携が Zendesk アカウントにチケットを作成し、適切なチームが対応できるようにします。

このガイドを完了すると、OpenLM Alerts が自動的に Zendesk チケットへルーティングされ、初期設定後は手動操作が不要になります。

:::info[アプリでの場所]
OpenLM Platform の **アプリランチャー**（右上のグリッドアイコン）を開き、**Integrations（連携統合） → Zendesk Alerts Integration** を選択します。

**事前準備:** [OpenLM Products](/cloud/openlm-administration/products) で **Zendesk Alerts Integration** を Activate してから、送信するイベントが存在するように [OpenLM Alerts](/cloud/automations/alerts) で少なくとも 1 つのルールを設定します。

**関連:** [Notifications](/cloud/automations/notifications)
:::

## 連携の仕組み

OpenLM Alerts のルールが発火すると、そのイベントは OpenLM のアラート連携パイプラインを通過します。パイプラインは OpenLM Platform に保存された Zendesk 認証情報を参照し、Zendesk API を通じてチケットを作成します。認証情報は OpenLM Platform で一度だけ入力すれば、OpenLM が安全に保管します。他の OpenLM アカウントからは見えません。

### 必要なコンポーネント

- **Zendesk Alerts Integration** 製品を Activate した OpenLM Platform アカウント。
- 管理者アクセス権を持つ有効な Zendesk アカウント。
- Zendesk チケットにしたいイベントで発火する OpenLM Alerts ルール。

## 連携をセットアップする

OpenLM を Zendesk に接続するには、以下のタスクを完了します。

### 前提条件を確認する

- 管理者として Zendesk にサインインできること。
- OpenLM Platform にサインインできること（または新規アカウントを登録できること）。
- OpenLM Alerts に少なくとも 1 つのアラートルールが設定されていること。[OpenLM Alerts](/cloud/automations/alerts) を参照してください。

### Zendesk Alerts Integration を Activate する

1. OpenLM Platform のホームページで **Activate Product** を選択するか、ナビゲーションメニューを開いて **Products** を選択します。
2. Products ページで **Zendesk Alerts Integration** カードを探します。
3. **Activate** を選択します。

### Zendesk の接続情報を入力する

1. ナビゲーションメニューから **Zendesk Alerts Integration** を開きます（または製品カードで **Go to Product Page** を選択します）。
2. Zendesk の接続情報を入力します。Zendesk の API は、アカウントの Subdomain と API 認証情報を組み合わせて使用します。

| フィールド | 入力する内容 | Zendesk での確認場所 |
|---|---|---|
| Subdomain | Zendesk URL の Subdomain。たとえば URL が `acme.zendesk.com` の場合は `acme` と入力します。 | Zendesk URL の `.zendesk.com` より前の部分。 |
| Email / agent | 認証に使用され、チケットのリクエスターとして表示される Zendesk エージェント。 | OpenLM が生成するチケットに関連付けたい Zendesk エージェントアカウント。 |
| API token | リクエストの認証に使用する Zendesk の API token。 | Zendesk で **Admin Center → Apps and integrations → APIs → Zendesk API** を開き、有効化してトークンを追加します。 |

3. 変更を保存します。

:::note
Zendesk Alerts Integration は比較的新しい連携です。製品の認証情報ページに表示される正確なフィールドラベルはバージョンによって異なる場合があります。アプリに表示される値を入力してください。これらは Zendesk の Subdomain と API 認証情報に対応します。
:::

## 連携を検証する

1. OpenLM Alerts で、いずれかのルールに一致するアラートをトリガーします。テストには支障のない条件を使用してください。
2. イベントが連携を通過するのを待ちます。ほとんどのチケットは約 1 分以内に表示されます。
3. Zendesk でチケットビューを開き、設定したリクエスターで新しいチケットが作成されていることを確認します。

## チケットを管理する

チケットが Zendesk に届いたら、通常の Zendesk ワークフローを使用して、トリアージ、割り当て、返信、クローズを行います。Zendesk でチケットをクローズしても、OpenLM Alerts の元のアラートには影響しません。

## トラブルシューティング

- Subdomain、エージェントの Email、API token が Zendesk の値と正確に一致していること、およびトークンが引き続き有効であることを確認します。
- [OpenLM Alerts](/cloud/automations/alerts) を開き、アラートルールが実際に発火したかどうかを確認します。発火していない場合、チケットは送信されません。
- [Products](/cloud/openlm-administration/products) ページで **Zendesk Alerts Integration** 製品が **Active** になっていることを確認します。
- Zendesk の API token を再生成した場合は、OpenLM の製品の認証情報ページに戻り、新しいトークンを保存します。

## 関連

- [OpenLM Alerts](/cloud/automations/alerts)
- [Notifications](/cloud/automations/notifications)
- [Products](/cloud/openlm-administration/products)
