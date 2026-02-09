---
title: "OpenLM ServiceNowアダプターのインストールと設定"
sidebar_position: 10
---
本書では、OpenLM ServiceNow アダプターのインストール手順を説明します。併せて、OpenLM SLM と ServiceNow 間でアダプターが正常に接続できるようにするための External Platform Service の設定についても説明します。

## 必要条件

OpenLM ServiceNow アダプターを動作させるには、次のコンポーネントが必要です。

1. お使いの ServiceNow インスタンスに OpenLM ServiceNow アプリケーションが導入されていること

2. OpenLM SLM v21 以降が稼働していること、または OpenLM SLMC アカウントがあること（SLMC アカウントの場合はセクション #4 を参照）

4. External Platforms をサポートする OpenLM SLM ライセンス。確認するには、**EasyAdmin Start → Administration → OpenLM License** に移動し、*External\_Platforms* フラグを確認します。

![](/img/legacy/word-image-103.png)

ライセンスに External Platforms のサポートがない場合は、sales@openlm.com までご連絡ください。

## OpenLM ServiceNow アダプターのインストール

ServiceNow アダプターのインストール手順は次のとおりです。

1. [ダウンロード](https://www.openlm.jp/downloads/) ページから、最新の External Platforms Service & ServiceNow Adapter のインストーラー（**OpenLM\_ServiceNow\_Adapter\_Installer\_#.#.###.msi**）を入手します。

2. インストーラーをダブルクリックして実行します。

3. 「**I agree to the license terms and conditions**」にチェックを入れます。

4. **Next** をクリックします。

5. インストール先を変更する場合は **Browse** をクリックし、任意のフォルダーを選択します。

6. **Next** をクリックしてインストールを開始します。ハードウェア構成によっては数分かかる場合があります。

7. インストールが完了したら **Finish** をクリックしてウィンドウを閉じます。続いて External Platforms の UI 設定画面が開きます（次のセクション参照）。

![](/img/legacy/word-image-104.png)

## ServiceNow と External Platforms Service の設定

### Identity Service を使用する場合

まず、ServiceNow 連携を機能させるために、External Platforms Service を Identity Service に接続する必要があります。Identity Service にログインし、**Settings tab → Security Configuration** へ移動して **ServiceNow** を有効化し、URL を入力します。**Save** をクリックし、ServiceNow サービスを再起動します。

![](/img/legacy/word-image-105.png)

### Identity Service を使用しない場合

次に、External Platforms の設定画面を開きます。  
設定画面は次のいずれかの方法で開けます。

- インストール完了後に「Finish」をクリックすると自動的に起動
- スタートメニューのショートカット：*Start Menu → OpenLM → OpenLM External Platform Configuration*
- ブラウザーで External Platforms Service 用の OpenLM SLM アドレスへアクセス（既定: [http://fqdn:5005/](http://localhost:8080/)）

![](/img/legacy/word-image-106.png)

この画面では、External Platform Service と OpenLM SLM との接続設定とテストを行います。各フィールドは次のとおりです。

- **URL** - OpenLM SLM のパスを `http://` または `https://` と待受ポート（既定 5015）付きで入力します。例: [**`http://localhost:5015`**](http://devbuild:7014/)。入力後、**Test Connection** をクリックして接続を確認し、成功したら **Save** をクリックします。ウィザードは接続成功時のみ先へ進めます。成功すると以下のメッセージが表示されます。

![](/img/legacy/word-image-107.png)

- 正しいポートが指定されている
- SLM の URL が正しく入力されている
- OpenLM SLM が起動している
- 本書セクション1（「必要条件」）のデータベース要件を満たしている
- 当該ポートでの通信やマシンと OpenLM SLM 間の通信を妨げるファイアウォール規則・セキュリティポリシー・他アプリがない

![](/img/legacy/word-image-108.png)

## External Platform セットアップウィザードの使用

OpenLM と ServiceNow の連携を完了するには、EasyAdmin インターフェースから External Platforms セットアップウィザードを起動します。

手順:

1. **EasyAdmin Start → Administration** → **External Platforms** → **ServiceNow** を開きます。  
   ![](/img/legacy/word-image-109.png)
2. ServiceNow セットアップウィザードが開きます。  
   ![](/img/legacy/word-image-110.png)
3. 必要項目を次のとおり入力します。  
   **Basic Authentication**

   **ServiceNow URL** - お使いの ServiceNow インスタンスの URL（例: https://abc123.service-now.com）

   **Username** - ServiceNow アカウントのユーザー名

   **Password** - ServiceNow アカウントのパスワード

   **OAuth 2.0**

   **ServiceNow URL** - お使いの ServiceNow インスタンスの URL（例: https://abc123.service-now.com）

   **Username** - ServiceNow アカウントのユーザー名

   **Password** - ServiceNow アカウントのパスワード

   **Client ID**

   **Client Secret**
4. **Test Connection** をクリックします。UI に次の表示が出るとおり、テストが成功した場合にのみ次へ進めます。  
   ![](/img/legacy/word-image-111.png)
5. **Next** をクリックして Sync Configurations 画面へ進みます。  
   この画面では OpenLM と ServiceNow の同期設定を行います。

   **Select range to sync your data** - 同期する期間を選択します。次の 3 つから選べます:
   1. *Period* - 選択した期間内のすべてのデータを同期
   2. *Start date* - 指定した開始日から本日までのデータを同期
   3. *All available data* - OpenLM データベースにあるすべてのデータを同期

   **Schedule sync to run every day at** - 同期を開始する時刻を指定します。

   **Sync Now (Run initial sync at the end of this wizard)** - 有効にすると、ウィザード完了直後に初回同期を開始します。無効のままの場合は、上記のスケジュール時刻に同期が開始されます。

   ![](/img/legacy/word-image-112.png)
6. **Next** をクリックします。  
   ![](/img/legacy/word-image-113.png)
7. ServiceNow Time Zone 画面で、OpenLM が ServiceNow に送信する集計データの同期に用いるタイムゾーンを選択します。同期は 1 日 1 回のため、時間計算の基準となるタイムゾーンを指定してください。
8. **Next** をクリックし、ウィザードの通知設定画面へ進みます。  
   ![](/img/legacy/word-image-114.png)
9. 次のとおり設定します。  
   **Notifications (on/off)** - すべての同期通知を一括で有効/無効化するスイッチ。
   **EasyAdmin Alerts (on/off)** - EasyAdmin UI での通知を有効/無効化。
   **Email (on/off)** - メール通知を有効/無効化。同期が以下の状態のときに EasyAdmin とメールの両方へ通知できます。
   - 成功
   - スキップ
   - 失敗
   - External Platform サービスが OpenLM SLM に応答していない

   **Recipients** - メール通知を有効にした場合、通知を受け取るメールアドレスを入力します。複数指定する場合は 1 行につき 1 件ずつ入力します。注: この設定には SMTP サーバーの構成が必要です。
10. **Finish** をクリックして ServiceNow 設定を保存し、ウィザードを閉じます。
11. ServiceNow 側で、以下のロールを持つスコープドアプリケーションユーザーを追加します。

    ```
    X_oplm_openlm_data.integration_user
    sam_eng_app_integrator
    ```
12. ServiceNow の「Plugins」セクションで「OpenLM」を検索し、見つかったら **Install** をクリックして ServiceNow 側に OpenLM API をインストールします。

以上で External Platforms 側の設定は完了です。設定を完了するには、以下のセクション 5 の手順に従ってください。

## App Store アプリケーションのインストール後の手順

**インスタンスで Domain Separation を有効化しているお客様のみ対象**

ServiceNow のナビゲーションから **Scripts - Background** モジュールへ移動し、新しいタブで開きます。**OpenLM Integration: Domain Field Fix Script** のスクリプトをコピーし、Scripts - Background タブの **Run Script** フィールドに貼り付けます。

![](/img/legacy/word-image-115.png)

スコープを **global** に設定し、**Run script** をクリックして実行します。

このスクリプトを実行したくない場合は、各ステージングテーブルに対応する **Transform Map** に移動し、以下の手順で **sys\_domain** フィールドについて coalesce を有効にし、choice action を reject に設定します。

1. **System Import Sets** の **Administration** サブセクションにある **Transform Maps** モジュールへ移動します。

2. **Filter** アイコンをクリックし、**Application** が **OpenLM Data Integration** となる条件を追加して **Run** をクリックします。

![](/img/legacy/word-image-116.png)

3. 各レコードを開き、**Field Maps** セクションで **sys\_domain** の mapping を true、choice action を reject に設定し、完了したら **Update** をクリックします。

![](/img/legacy/word-image-117.png)

次のレコードを更新してください。

- olm\_imp\_group\_relations\_table
- olm\_imp\_agg\_usage
- olm\_imp\_users\_table
- olm\_imp\_lm\_hosts
- olm\_imp\_groups\_table
- olm\_imp\_computers
- olm\_imp\_license\_servers
- olm\_imp\_projects\_table
- olm\_imp\_agg\_concurrent\_usage
- olm\_imp\_license\_inventory
- olm\_imp\_group\_users\_table
- olm\_imp\_agg\_denials
- olm\_imp\_alerts

**参考情報:** Domain Separation 環境で統合ユーザーを作成する場合、統合ユーザーは適切なドメインに割り当て、グローバルドメインに所属させないでください。データは統合ユーザーが所属するドメインに挿入されます。誤った／グローバルドメインに割り当てると、データが誤ったドメインに挿入され、全ユーザーから見えてしまう可能性があります。
