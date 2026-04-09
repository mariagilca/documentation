---
title: Identity Alignment
sidebar_position: 5
---

# Identity Alignment

Identity Alignment は、プロビジョニング解除されたユーザーを外部サービスから自動的に削除します。Directory Sync Service（DSS）が社内 Active Directory からユーザーの削除を検出すると、Identity Alignment は設定済みのすべての外部プラットフォームからそのユーザーを削除するか、手動で対応するよう通知します。

Identity Alignment は**ユーザーの削除**のみに特化しています。外部サービスでのユーザーの作成や更新は行いません。

## 機能概要

- DSS の同期結果に応じて削除されたユーザーを検出
- Cloud Broker を通じて設定済みの外部サービスからユーザーを削除
- 組み込みサービス連携とカスタムサービス定義の両方に対応
- 各削除アクションについてメールまたはチケットで通知
- サービスごとに削除シナリオを設定可能：自動削除、通知のみ、削除と通知

:::info
Identity Alignment は以前 **OneDirectorySync** という名前でした。ログや設定でその名前が表示された場合、このサービスを指しています。
:::

## 動作の仕組み

1. 社内 Active Directory からユーザーが削除される。
2. DSS が同期サイクルを実行し、削除を検出する。
3. DSS が Identity Alignment に削除イベントを送信する。
4. Identity Alignment が、削除されたユーザーに関連付けられたサービスを確認する。
5. 各サービスの設定に応じて、次のアクションを実行する：
   - **通知なしで削除**：Cloud Broker が外部サービスからユーザーを削除する。削除できない場合、ユーザーは「removed」としてマークされる。
   - **通知のみ**：手動で削除すべきことをメールで通知する。自動削除は行わない。
   - **削除して通知**：Cloud Broker がユーザーを削除し、Identity Alignment がメールで確認通知を送信する。
6. **カスタムサービス**の場合、アップロードされたユーザーリストにユーザーが存在するかを確認し、手動削除の通知を送信する。

:::note
外部サービスでユーザーがグループに所属している場合、Identity Alignment はユーザーとグループの関係を削除します。即時の完全削除は行いません。
:::

:::tip
Identity Alignment はサービスの設定とオーケストレーションを担当します。外部サービスからの実際の削除は **Cloud Broker** が実行します。Identity Alignment にサービスを追加する前に、Cloud Broker で必要な認証情報を設定してください。
:::

## ユーザーインターフェース

Identity Alignment のインターフェースは 2 つのページで構成されています：

- **Services**：ユーザー削除用の外部サービスの表示、追加、管理。
- **Settings**：デフォルトの通知メールおよびチケットメールアドレスの設定。

## 前提条件

Identity Alignment を設定する前に、以下を確認してください：

1. **Directory Sync Service（DSS）** が有効化され、同期サイクルが実行されていること。
2. **Directory Sync Agent（DSA）** がお客様の環境にインストールされ、Active Directory に接続されていること。
3. **Cloud Broker** が対象サービスに必要な認証情報で設定されていること（通常サービスの場合）。

:::info
Identity Alignment を有効化すると、プロダクトサービスが不足している依存関係（DSS など）を表示し、自動的に有効化するオプションを提供します。
:::

## Identity Alignment の設定

### 通知設定の構成

Settings ページでデフォルトの通知メールアドレスを設定します。これらのデフォルトはすべてのサービスに適用されます。

1. **Identity Alignment** に移動し、左サイドバーで **Settings** を選択します。
2. **Notifications** タブで、**Default email for notifications** を入力します。
3. 削除イベントで IT サービス管理システムにチケットを作成する場合は、**Default ticketing system email for notifications** を入力します。
4. **Save** を選択します。

![Identity Alignment Settings ページ](/img/automations/identity-alignment-settings.png)
*デフォルトの通知メールとチケットメールフィールドを含む Settings ページ。*

### 通常サービスの追加

サービスを追加する前に、Cloud Broker で有効な認証情報が設定されていることを確認してください。

1. 左サイドバーで **Services** を選択します。
2. **Add Service** を選択します。

![External Services ページ](/img/automations/identity-alignment-services-list.png)
*Add Service ボタンとサービス一覧を含む External Services ページ。*

3. **Add External Service** ダイアログで、**Services** ドロップダウンを開き、サービスを選択します。Cloud Broker で利用可能なすべてのサービスが一覧表示されます。

![Cloud Broker からサービスを選択](/img/automations/identity-alignment-add-service.png)
*Services ドロップダウンには Cloud Broker で利用可能なすべてのサービスが表示されます。*

4. サービスの詳細を確認します。**Account** フィールドには、選択したサービスの Cloud Broker 設定名が表示されます。

![サービス設定の詳細](/img/automations/identity-alignment-service-config.png)
*Cloud Broker のアカウント名を表示するサービス設定。*

5. **Select the scenario of deleting** で、以下のオプションから 1 つを選択します：
   - **Delete user without additional notification** — Cloud Broker がユーザーを削除する。削除できない場合、ユーザーは「removed」としてマークされる。
   - **Delete user and notify** — Cloud Broker がユーザーを削除し、Identity Alignment がメール通知を送信する。
   - **Notify about user should be deleted** — Identity Alignment が通知のみ送信する。自動削除は行わない。
6. （任意）このサービスのデフォルト通知メールを上書きする場合は、**Custom email** を入力します。
7. （任意）このサービスのデフォルトチケットメールを上書きする場合は、**Custom ticketing system** メールを入力します。
8. **Save** を選択します。

![削除シナリオとカスタムメールオプションを含むアクション設定](/img/automations/identity-alignment-action-config.png)
*削除シナリオの選択肢と、カスタムメールおよびチケットメールの上書きオプション。*

### カスタムサービスの追加

カスタムサービスを使用すると、OpenLM がネイティブにサポートしていないプラットフォームや、API 認証情報を共有したくない場合のユーザー削除を管理できます。

すべての外部プラットフォームが自動ユーザー削除用の API を提供しているわけではありません。そのようなプラットフォームでは、外部サービスからユーザーをエクスポートし、そのファイルを Identity Alignment にアップロードして参照用に使用します。

1. 左サイドバーで **Services** を選択します。
2. **Add Service** を選択します。
3. **Services** ドロップダウンで **Custom** を選択します。
4. 外部サービスのユーザーリストを含むファイル（CSV など）をアップロードします。
5. **Save** を選択します。

Active Directory からユーザーが削除されると、Identity Alignment はアップロードされたファイルにそのユーザーが存在するかを確認します。一致が見つかった場合、そのサービスからユーザーを手動で削除する必要があることを通知します。

:::note
カスタムサービスは Settings ページで設定されたデフォルトの通知設定を使用します。カスタムサービスではサービスごとのメール上書きは利用できません。
:::

カスタムサービスは次の場合に使用します：

- 外部プラットフォームがユーザー管理用の API を提供していない場合。
- サービスが OpenLM Cloud Broker でサポートされていない場合。
- OpenLM に認証情報を共有したくない場合。

## サービスの種類

Identity Alignment は 2 種類のサービスをサポートしています。

### 通常サービス

通常サービスは Cloud Broker を通じて外部プラットフォームに接続します。Active Directory からユーザーが削除されると、Identity Alignment は Cloud Broker に外部サービスからユーザーを自動的に削除するよう指示します。

Cloud Broker で利用可能な任意のサービスを追加できます：

- Autodesk Cloud
- Cloudflare
- GitLab
- Monday
- Office 365

### カスタムサービス

カスタムサービスでは、手動でアップロードしたユーザーリスト（CSV エクスポートなど）が必要です。Identity Alignment は外部プラットフォームに直接接続しません。代わりに、削除されたユーザーがアップロードされたファイルに存在するかを確認し、手動削除の通知を送信します。

## 削除シナリオ

通常サービスを追加する際に、以下の削除シナリオから 1 つを選択します：

| シナリオ | 動作 |
|----------|------|
| **Delete user without additional notification** | Cloud Broker が外部サービスからユーザーを削除する。削除できない場合、ユーザーは「removed」としてマークされる。通知は送信されない。 |
| **Delete user and notify** | Cloud Broker がユーザーを削除し、Identity Alignment が削除確認メールを送信する。 |
| **Notify about user should be deleted** | Identity Alignment が通知のみ送信する。自動削除は行わない。手動で確認・削除したい場合に使用する。 |

## エラー処理

Cloud Broker が外部サービスへの接続に失敗した場合、または削除処理中にエラーが発生した場合：

- Identity Alignment は削除アクションが失敗したことを示すメール通知を送信します。
- 通知には、問題の診断に役立つ Cloud Broker のレスポンス詳細が含まれます。

## 例：退職する従業員のオフボーディング

従業員が組織を離れる際に、すべての外部プラットフォームからアクセスを削除する必要があります。

**シナリオ**：山田太郎さんが退職します。Monday、GitLab、およびカスタム HR プラットフォームにアカウントがあります。

1. 管理者が Active Directory から山田太郎さんを削除する。
2. DSS が同期サイクルを実行し、削除を検出する。
3. Identity Alignment がイベントを受信し、設定済みのサービスを確認する。
4. Monday と GitLab（**Delete and notify** に設定）：Cloud Broker が両方のサービスから山田太郎さんを削除する。管理者にメールで確認通知が届く。
5. カスタム HR プラットフォーム：管理者に手動削除の通知が届く。

Identity Alignment がなければ、管理者は各外部プラットフォームに個別にログインし、手動でユーザーを削除する必要があります。

## トラブルシューティング

| 症状 | 考えられる原因 | 対処方法 |
|------|---------------|----------|
| 通常サービスからユーザーが削除されない | Cloud Broker が未設定またはアクセス不可 | Cloud Broker で有効な認証情報でサービスが設定されていることを確認する。 |
| 削除イベントが受信されない | DSS が削除を検出していない | DSS が有効化され同期サイクルが完了していることを確認する。DSA がインストールされ Active Directory に接続されていることを確認する。 |
| 通知が届かない | メール設定が未構成 | Settings ページでデフォルトの通知メールを確認する。 |
| カスタムサービスでユーザーが一致しない | アップロードされたファイルが古い、またはユーザー名が不一致 | 外部サービスから最新のユーザーデータを含む更新ファイルをアップロードする。 |
| サービスリストにサービスが表示されない | Cloud Broker でサービスが未設定 | 先に Cloud Broker でサービスを追加し、その後 Identity Alignment で追加する。 |
| 削除失敗メールが届いた | Cloud Broker 接続エラー | メール通知のエラー詳細を確認する。Cloud Broker のログを確認し、サービスの認証情報を検証する。 |
| 有効化時に依存関係の警告が表示される | 必要なサービスが有効化されていない | DSS およびその他の表示された依存関係を有効化する。プロダクトサービスが自動的に有効化できる。 |

## FAQ

<details>
<summary>Identity Alignment に関するよくある質問</summary>

**Identity Alignment は外部サービスでユーザーを作成・更新しますか？**
いいえ。Identity Alignment はユーザーの削除のみに特化しています。外部プラットフォームでのユーザーアカウントの作成や更新は行いません。

**なぜ削除のみで完全な同期ではないのですか？**
お客様からのフィードバックにより、外部プラットフォームでの自動ユーザー作成はライセンスコストの増加につながる可能性があることが判明しました。従業員が組織を離れる際のユーザー削除が、意図しないアカウント作成のリスクなく明確なコスト削減を実現する主要なユースケースです。

**Identity Alignment は社内ディレクトリからユーザーを削除しますか？**
いいえ。Identity Alignment は Active Directory で既に発生した削除に反応します。ディレクトリ自体からではなく、外部サービスからユーザーを削除します。

**Cloud Broker なしで Identity Alignment を使用できますか？**
通常サービスの場合はできません。Cloud Broker が外部プラットフォームからの実際のユーザー削除を処理します。カスタムサービスの場合は、Identity Alignment が通知のみを送信するため、Cloud Broker は不要です。

**削除中に Cloud Broker が失敗した場合はどうなりますか？**
Identity Alignment が削除アクションの実行に失敗したことを示すメール通知が届きます。通知には Cloud Broker のレスポンスからのエラー詳細が含まれます。

**サポートリストにないサービスを追加できますか？**
はい。カスタムサービスタイプを使用し、ユーザーリストを含むファイルをアップロードします。手動削除の通知が届きます。

**カスタムサービスで通知メールを上書きできますか？**
いいえ。カスタムサービスは Settings ページで設定されたデフォルトの通知設定を使用します。サービスごとのメール上書きは通常サービスのみで利用できます。

**Identity Alignment にはどのような依存関係が必要ですか？**
Identity Alignment には DSS（Directory Sync Service）の有効化と DSA（Directory Sync Agent）のインストールが必要です。通常サービスの場合は、Cloud Broker が対象サービスの認証情報で設定されている必要があります。Identity Alignment を有効化すると、プロダクトサービスが不足している依存関係を表示します。

**DSS の同期はどのくらいの頻度で実行されますか？**
DSS の同期頻度は Identity Alignment ではなく DSS の設定で構成されます。現在のスケジュールについては DSS の設定を確認してください。
</details>
