---
sidebar_position: 1
title: Freshworks アラート
description: OpenLM アラートから Freshdesk チケットの作成を自動化します。
---

# Freshworks アラート

Freshworks アラート連携を使用して、OpenLM アラートから Freshdesk チケットの作成を自動化します。OpenLM でアラートルールが発動すると、本連携は Freshdesk アカウントにチケットを作成し、適切なチームが対応できるようにします。

このガイドを完了すると、初期セットアップ後は手動操作なしで OpenLM アラートが自動的に Freshdesk チケットへルーティングされます。

## 連携の仕組み

OpenLM アラートは Amazon SQS に送信されます。AWS Lambda 関数がキューを読み取り、AWS Secrets Manager に保管された Freshdesk 認証情報を参照し、Freshdesk API を介してチケットを作成します。認証情報は OpenLM Platform で 1 度だけ入力します。OpenLM はそれを AWS Secrets Manager に安全に保管します。

### 必要なコンポーネント

OpenLM アラートのイベントを Freshdesk へ送信するには、次のコンポーネントが必要です。

- **Freshworks Alerts Integration** 製品が有効化された OpenLM Cloud アカウント。
- 管理者アクセス権を持つ有効な Freshdesk アカウント。
- Freshworks マーケットプレイスからインストールした **OpenLM Alerts Integration** アプリケーション。
- Freshdesk チケットとして起票したいイベントで発動する OpenLM アラートルール。

### プライバシーとデータの取り扱い

- アラートのペイロードは OpenLM Alerts から Amazon SQS を経由し、AWS Lambda 関数で処理されます。
- Freshworks の認証情報は AWS Secrets Manager に保管されます。他の OpenLM アカウントからは参照できません。
- チケットは、入力された認証情報を用いて Freshdesk API 経由で作成されます。

## 連携を構成する

このセクションのタスクを完了して、OpenLM と Freshdesk を接続します。

### 前提条件を確認する

開始前に、以下の要件を満たしていることを確認してください。

- 管理者として Freshdesk にサインインできる。
- OpenLM Cloud にサインインできる、または新規 OpenLM Cloud アカウントを登録できる。
- 少なくとも 1 つのアラートルールで OpenLM Alerts が構成されている。[OpenLM Alerts](../automations/alerts.md) を参照してください。

### Freshworks マーケットプレイスから OpenLM アプリケーションをインストールする

1. 管理者として Freshdesk にサインインします。
2. Freshworks マーケットプレイスを開きます。
3. **OpenLM Alerts Integration** を検索してアプリケーションをインストールします。
4. アプリケーションを開き、**Register for OpenLM Cloud** を選択します。Freshworks が OpenLM Cloud にリダイレクトします。

### OpenLM Cloud アカウントを作成またはサインインする

1. OpenLM Cloud のサインインページで、新規アカウントを登録するか、既存アカウントでサインインします。
2. サインイン後、OpenLM ホームページが表示されます。

### Freshworks Alerts Integration を有効化する

1. OpenLM Cloud のホームページから **Go to Products** を選択するか、ナビゲーションメニューを開いて **Products** を選択します。
2. Products ページで **Freshworks Alerts Integration** カードを探します。
3. **Activate** を選択します。

### Freshworks の認証情報を入力する

1. 同じ製品カードで **Go to Product Page** を選択するか、ナビゲーションメニューから **Freshworks Alerts Integration** を開きます。
2. **Manage Credentials** ページで以下の値を入力します。

| 項目 | 入力する値 | Freshdesk での確認方法 |
|---|---|---|
| API Key | Freshdesk の API キー。 | Freshdesk で **Profile Settings → View API Key** を開きます。 |
| Domain | Freshdesk URL のドメイン名プレフィックス。たとえば URL が `acme.freshdesk.com` の場合は `acme` を入力します。 | Freshdesk URL のうち `.freshdesk.com` より前の部分です。 |
| Email | チケットの依頼者となるメールアドレス。Freshdesk にこのメールアドレスの連絡先が存在しない場合は、本連携が新しい連絡先を作成します。 | OpenLM 起票チケットの依頼者として表示したい Freshdesk の連絡先です。 |

3. **Save** を選択します。

OpenLM は認証情報を AWS Secrets Manager に保管します。連携はその時点からアラートの処理を開始します。

## 連携を検証する

認証情報を保存したら、アラートが Freshdesk のチケットとして届くことを確認します。

1. OpenLM Alerts で、アラートルールに合致するアラートを発動させます。テスト用には業務に影響しない条件を使用します。
2. アラートが Amazon SQS と AWS Lambda 関数を経由するのを待ちます。多くの場合、チケットは 1 分以内に表示されます。
3. Freshdesk でチケット受信箱を開き、新しいチケットが存在することを確認します。
4. チケットの依頼者が、**Manage Credentials** ページで入力したメールアドレスと一致することを確認します。

## チケットを管理する

Freshdesk にチケットが届いたら、Freshdesk の標準ワークフローで管理します。

- 適切なサポート担当者にチケットを振り分け、割り当てます。
- 連絡先への返信は Freshdesk から行い、やり取りを 1 か所に集約します。
- チケットは Freshdesk 上でクローズします。Freshdesk でチケットをクローズしても、OpenLM Alerts 側のソースアラートには影響しません。

## トラブルシューティング

Freshdesk にチケットが届かない場合、サポートに問い合わせる前に以下のチェックリストを確認します。

- OpenLM の **Manage Credentials** ページの **API Key**、**Domain**、**Email** が Freshdesk の値と完全に一致していることを確認します。API キーは同じ Freshdesk アカウントから取得したものを使用してください。
- OpenLM Alerts を開き、アラートルールが実際に発動したことを確認します。発動していない場合はチケットも送信されません。
- Products ページで **Freshworks Alerts Integration** 製品が **Active** であることを確認します。
- Freshdesk で、依頼者の連絡先が停止状態になっていないことを確認します。
- Freshdesk の API キーを再生成した場合は、OpenLM の **Manage Credentials** に戻り、新しいキーを保存してください。

## 関連項目

- [OpenLM Alerts](../automations/alerts.md)
- [Notifications](../automations/notifications.md)
- [Products](../openlm-administration/products.md)
