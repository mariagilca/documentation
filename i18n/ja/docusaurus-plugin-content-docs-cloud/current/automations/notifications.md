---
title: "通知（Notifications）"
sidebar_position: 3
description: "Notification Service は OpenLM 共通の配信ハブです。Alerts、Identity、Cloud などの OpenLM アプリに代わって、メール・チケット・プッシュの通知を送信します。"
---

## 概要

Notification Service は OpenLM 共通の配信ハブです。通知の *内容* を決めるのではなく、他の OpenLM アプリが発行したメッセージを、**メール**・**チケット**・**プッシュ**の 3 つのチャネルで配信します。

通知は複数の OpenLM アプリケーション（**Identity**、**Identity Alignment**、**Alerts**、**Cloud**、および任意の **Custom** アプリ）から発生し、それぞれが Notification Service にメッセージを渡します。1 件の通知は、1 つ・複数・またはすべてのチャネルで配信できます。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Platform Administration（プラットフォーム管理）→ Notifications** を選択します。

**関連:** [Alerts](/cloud/automations/alerts)
:::

Notifications アプリには、左側ナビゲーションの **Management** の下に 3 つのページがあります。

- **Email Notifications** — メール配信の受信者と件名の書式設定。
- **Ticketing Notifications** — IT サービスプラットフォームへの email-to-ticket 配信。
- **Push Notifications** — プッシュ配信の履歴とデバイスのサブスクリプション。

## 仕組み

1. OpenLM アプリ（例: 「License usage > 90%」のような **Alerts** ルール）が通知を発行します。
2. アプリはその通知を Notification Service に送信します。
3. Notification Service は、その通知が対象とする各チャネル（メール、チケット、プッシュ）で配信します。

配信が一元化されているため、各チャネルの設定はここで一度だけ行えば、すべての OpenLM アプリで再利用されます。

## メール通知（Email Notifications）

**Email Notifications** ページでは、OpenLM のテストメールを受け取る宛先と、通知件名のタグ付け（任意）を管理します。

![OpenLM Platform の Email Notifications ページ。Test Email Recipients のグリッドと Advanced セクションが表示されている。](/img/notifications/email-notifications.png)

**Test Email Recipients** — チャネルを検証するための宛先を追加します。

1. **Email** フィールドにアドレスを入力し、**Add** を選択します。行のアクションで編集・削除できます。
2. **Send Sample Email** を選択すると、その宛先にテストメッセージが送信されます。成功すると *「Email was sent, check inbox please.」* と表示されます。
3. **Save** を選択して変更を保存します。

:::info[送信は自動で管理されます]
ホスト型の OpenLM Platform では、メールは OpenLM のマネージドメールサービス（`no-reply` アドレス）から一元的に送信されるため、ここで SMTP サーバーの項目を設定することはありません。管理するのは受信者と件名の書式のみです。オンプレミス環境では、これに加えて **Sender Account**（Sender Email、Host、Port、SMTP のユーザー名/パスワードを表示する **Security** トグル、**SSL** トグル）を設定します。
:::

個々の通知の実際の受信者は、通知を発行したアプリ側で設定されます（例: 各 Alert 自身の受信者リスト）。Test Email Recipients は、このページからサンプルメールを送信するときに使用される宛先です。

### 件名のプレフィックス／サフィックス（Advanced）

**Advanced** を展開すると、発信元アプリケーションごとに、通知メールの件名へプレフィックスやサフィックスを追加できます。受信トレイやチケットシステムで OpenLM のメールをフィルタリング・振り分けしやすくなります。

![Prefix/Suffix トグルが有効になり、Application・Prefix・Suffix の各フィールドが表示された Advanced セクション。](/img/notifications/email-advanced.png)

1. **Prefix/Suffix** をオンにします。
2. **Application** を選択します（OpenLM Identity application、OpenLM Identity Alignment、OpenLM Alerts、OpenLM Cloud、または Custom）。
3. **Prefix**、**Suffix**、またはその両方を入力し、**Add** を選択します。アプリケーションごとに有効になるのは 1 件のみです（同じアプリケーションに複数追加した場合は最初の 1 件が使用されます）。
4. **Save** を選択します。

## チケット通知（Ticketing Notifications）

チケット通知は、通知をチケットシステムの受信用 *email-to-ticket* アドレスへメール送信することで、サポートチケットを作成します。

![Ticket System ドロップダウンが EmailSender に設定され、Test Email Recipients グリッドが表示された Ticketing Notifications ページ。](/img/notifications/ticketing-notifications.png)

1. **Ticket System** で **EmailSender**（利用可能な配信方法）を選択します。
2. **Test Email Recipients** にチケットシステムの受信用アドレスを追加します（例: ServiceNow、Jira、Zendesk の受信メールアドレス）。
3. **Send Sample Email** を選択して、そのアドレスがメールを受け付けることを確認します。
4. **Save** を選択します。

:::note
チケット配信はメールのみです。OpenLM は通知をメールとして送信し、各プラットフォームが email-to-ticket 機能で取り込みます。直接的な API 連携や双方向連携はなく、OpenLM はチケットのステータスを追跡しません。メールと同様に、オンプレミス環境ではここで独自の **Sender Account** を設定します。
:::

## プッシュ通知（Push Notifications）

プッシュは、受信を購読しているデバイスへリアルタイムにアラートを配信します。ホスト型 Platform では、プッシュは Firebase Cloud Messaging（FCM）経由で配信されます。ページには 2 つのタブがあります。

### Push Notifications（履歴）

送信されたすべてのプッシュ通知のログです。配信の検証や監査に役立ちます。

![Application、Notification Level、Notification Time の各列を持つ履歴グリッドと詳細ペインが表示された Push Notifications タブ。](/img/notifications/push-notifications.png)

- 列: **Application**、**Notification Level**（Warning、Info、Error）、**Notification Time**。
- 行を選択すると、その **Subject** と **Message** が詳細ペインに表示されます。
- ツールバーで、選択した通知の **Delete**、**Send Sample Push Notification**、リストの **Refresh**、**Search** を実行できます。

### Subscriptions（サブスクリプション）

現在プッシュ通知を受信するよう登録されているデバイスです。デバイスは購読時に自動的に追加されます。このタブは読み取り専用です。

![Application、Token、Subscribed at の各列が表示された Subscriptions タブ。](/img/notifications/push-subscriptions.png)

列: **Application**、**Token**、**Subscribed at**。

### サンプルプッシュ通知の送信

購読中のデバイスがプッシュを受信できることを確認するには、**Send Sample Push Notification** を選択してダイアログを入力します。

![Subject、Application、Notification Level、Message の各フィールドを持つ Send Sample Push Notification ダイアログ。](/img/notifications/push-sample-dialog.png)

1. **Subject** を入力します（必須）。
2. **Application** と **Notification Level**（Warning、Info、Error）を選択します。
3. **Message** を入力します（必須）。
4. **Send** を選択します。サンプルは購読中のデバイスへ配信され、履歴に記録されます。

## アクセス権限

通知設定の管理には、OpenLM Platform の管理者ロールが必要です。
