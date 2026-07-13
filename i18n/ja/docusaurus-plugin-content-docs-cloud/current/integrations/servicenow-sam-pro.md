---
title: ServiceNow Connector
sidebar_position: 1
description: "ServiceNow Connector で OpenLM Platform と ServiceNow を接続します。ライセンス使用状況データの SAM Pro への同期、OpenLM アラートの転送、ライセンス ファイル変更の自動化を行えます。"
---

ServiceNow Connector を使用して、OpenLM Platform と ServiceNow インスタンスを接続します。コネクタには 3 つのモジュールがあり、それぞれ独立して使用できます。

- **Adapter** は、OpenLM のライセンス管理データをスケジュールに従って ServiceNow に送信します。送信されたデータは ServiceNow Software Asset Management Professional（SAM Pro）のレポートで利用できます。
- **Alerts** は、OpenLM のアラートを発生時に ServiceNow のタスク レコードとして転送します。
- **License Automation Tool** は、ServiceNow の申請を起点に、OpenLM を通じたライセンス ファイルの比較とデプロイを実行します。

このガイドを完了すると、各モジュールを ServiceNow インスタンスに接続し、データ同期のスケジュール設定と手動実行を行い、OpenLM のアラートを ServiceNow で受信し、ServiceNow 側の License Automation Tool アプリケーションが OpenLM を呼び出すために使う API キーを発行できるようになります。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Integrations（連携統合）→ ServiceNow Connector** を選択します。

**事前準備:** [OpenLM Products](/cloud/openlm-administration/products) で **ServiceNow Connector** を有効化し（有効化ではインフラがプロビジョニングされ、最大 10 分かかることがあります）、ServiceNow マーケットプレイスから **OpenLM Adapter Integration** をインストールします。
:::

## 連携の仕組み

各モジュールは、それぞれ独自の ServiceNow 接続とデータ フローの方向を持ちます。

- **Adapter** は、OpenLM のデータを ServiceNow インスタンス上の OpenLM アプリケーションのステージング テーブルにプッシュします。最後のバッチが到着すると、アプリケーションがステージング レコードをターゲット テーブル（SAM Pro の Engineering Application Usage テーブルなど）に変換し、ServiceNow のレポートやダッシュボードで利用できるようになります。同期は設定したスケジュールで実行され、手動でいつでも実行できます。
- **Alerts** モジュールは、OpenLM が生成するアラートを監視し、1 件ずつ ServiceNow の OpenLM Alerts アプリケーションに送信します。アラートはタスク レコードとして保存され、アラートの重大度がタスクの優先度にマッピングされます。スケジュールはなく、接続を保存すると継続的にアラートが流れます。
- **License Automation Tool** は逆方向に動作します。ServiceNow ユーザーが OpenLM License Automation Tool アプリケーションでライセンス申請を作成すると、アプリケーションは OpenLM Platform で発行した API キーを使って OpenLM を呼び出します。OpenLM は、提出されたライセンス ファイルをライセンス サーバーに現在デプロイされているファイルと比較するか、OpenLM Broker を通じて新しいファイルをデプロイし、結果を ServiceNow に返します。

### 必要なコンポーネント

ServiceNow Connector を使用するには、次のコンポーネントが必要です。

- **ServiceNow Connector** 製品が有効化された OpenLM Platform アカウント。メイン メニューに ServiceNow Connector が表示されない場合は、営業担当者にお問い合わせください。
- OpenLM アプリケーションがインストールされた ServiceNow インスタンス。Adapter 用の OpenLM データ アプリケーション、アラート用の OpenLM Alerts アプリケーション、ライセンス自動化用の OpenLM License Automation Tool アプリケーションです。
- データのインポート権限を持つコネクタ用 ServiceNow サービス アカウント、または ServiceNow の Open Authorization（OAuth）クライアント ID とクライアント シークレット。
- SAM Pro レポートを利用する場合は、インスタンスにインストールおよび構成済みの ServiceNow SAM Pro。
- License Automation Tool を利用する場合は、管理対象のライセンス サーバーに接続された OpenLM Broker。

### プライバシーとデータの取り扱い

- 各モジュールは、ServiceNow の資格情報を OpenLM Platform アカウントごとに暗号化して保存します。
- 保存したパスワード、クライアント シークレット、API キーは、保存後に再表示されません。
- Adapter が送信するのはライセンス管理データのみです。ServiceNow からデータを読み取ることはありません。

## 連携を構成する

使用するモジュールについて、このセクションのタスクを実行します。各モジュールには独自の **Destination Instance** タブがあるため、同じインスタンスにも別々のインスタンスにも接続できます。

### 前提条件を確認する

開始する前に、次の要件を満たしていることを確認してください。

- OpenLM Platform で ServiceNow Connector が有効で、管理者ロールを持っている。
- ServiceNow インスタンスに OpenLM アプリケーションがインストールされている。
- ServiceNow インスタンスの URL と、サービス アカウントの資格情報、または OAuth クライアント ID とクライアント シークレットを把握している。
- SAM Pro レポートを利用する場合は、ServiceNow チームが SAM Pro のターゲット テーブル（Engineering Application Usage など）を有効化している。

### Adapter でライセンス データを同期する

Adapter は次のデータ カテゴリを ServiceNow に送信します: ユーザー、コンピューター、プロジェクト、グループ、グループ関係、グループ メンバーシップ、ライセンス サーバー、ライセンス マネージャー ホスト、ライセンス インベントリ、アラート、集計済み使用状況、集計済み拒否、集計済み同時使用状況。各カテゴリは、OpenLM データ アプリケーション内の `olm_stg_*` という名前の専用ステージング テーブルに格納されます。

#### 接続先インスタンスを接続する

1. OpenLM Platform でメイン メニューを開き、**ServiceNow Connector** を選択します。**Adapter** ページが開きます。
2. **Destination Instance** タブで **ServiceNow URL** を入力します（例: `https://your-instance.service-now.com`）。
3. **Authentication Method** で **Basic** または **OAUTH 2.0** を選択します。
4. Basic 認証の場合は、ServiceNow サービス アカウントの **Username** と **Password** を入力します。
5. OAuth の場合は、ServiceNow の OAuth レジストリの **Client ID** と **Client Secret** を入力します。
6. **Test Connection** を選択し、成功メッセージを確認します。
7. **Save** を選択します。

![OpenLM Platform ServiceNow Connector の Adapter 接続先インスタンス設定](/img/integrations/servicenow-olm/servicenow-adapter-destination-instance.png)
*ServiceNow Connector の Adapter 接続先インスタンス設定*

#### 自動同期をスケジュールする

1. **Adapter** ページで **Auto Sync Configuration** タブを選択します。
2. **Auto-Sync** トグルをオンにします。
3. 同期を開始する時刻を **Auto Sync Time** に設定します。
4. 同期時刻の基準となる **Time Zone** を選択します。リストは検索できます。
5. **Frequency** で **Daily** または **Weekly** を選択します。Weekly を選択した場合は **Day Of Week** も選択します。
6. **Save** を選択します。

スケジュール同期では、前回成功した同期以降の変更が送信されます。スケジュールを有効化した後の最初の同期では、過去 3 か月分のデータが送信されます。

![週次スケジュールを選択した Adapter の自動同期設定](/img/integrations/servicenow-olm/servicenow-adapter-auto-sync.png)
*週次スケジュールを選択した Adapter の自動同期設定*

#### 手動同期を実行する

1. **Adapter** ページで **Sync Now** を選択します。「Manual sync started successfully.」というメッセージが表示されます。
2. ステータス表示を確認します。同期の実行中は **Last Sync Status** に **Processing** と表示され、完了すると **Success** または **Failed** に変わります。
3. 同期が完了すると **Last Successful Sync Time** が更新されます。

手動同期では過去 3 か月分のデータが再送信されるため、接続直後や同期が失敗していた期間の後に、ServiceNow へデータをバックフィルする用途に使えます。

#### ServiceNow でデータを確認する

OpenLM は、各データ カテゴリを OpenLM データ アプリケーション内の専用ステージング テーブルにプッシュします。ServiceNow の **Tables** で `x_oplm_openlm_data` プレフィックスでフィルタすると確認できます。

![ServiceNow の OpenLM ステージング テーブル](/img/integrations/servicenow-olm/servicenow-staging-tables.png)
*ServiceNow の OpenLM ステージング テーブル*

同期の最後のバッチが到着すると、OpenLM がアプリケーションの変換エンドポイントを呼び出し、アプリケーションがステージング データを SAM Pro が使用するターゲット テーブルに移動します。たとえば、使用状況レコードは **Engineering Application Usages** に **Source** が `OpenLM` として表示されます。

![ServiceNow の Engineering Application Usages テーブルに表示された OpenLM の使用状況データ](/img/integrations/servicenow-olm/servicenow-engineering-app-usage.png)
*SAM Pro の Engineering Application Usages テーブルに表示された OpenLM の使用状況データ*

### OpenLM アラートを ServiceNow に転送する

Alerts モジュールは、OpenLM が生成するすべてのアラートを ServiceNow の OpenLM Alerts アプリケーションに送信します。各アラートは `OLM_ALERTS` 番号を持つタスク レコードになります。アラートのタイトルが短い説明に、アラートの説明はプレーン テキストに変換され、アラートの重大度がタスクの緊急度、影響度、優先度を設定します。OpenLM が生成するアラートの定義については、[アラート](../automations/alerts)を参照してください。

#### Alerts の接続先インスタンスを接続する

1. ServiceNow Connector のメニューで **Alerts** を選択します。
2. **Destination Instance** タブで **ServiceNow URL** を入力します。
3. **Authentication Method** で **Basic** または **OAUTH 2.0** を選択し、アラートを受信する ServiceNow サービス アカウントの資格情報を入力します。
4. **Test Connection** を選択し、成功メッセージを確認します。
5. **Save** を選択します。接続を保存すると、すぐにアラートの転送が始まります。

![ServiceNow Connector の Alerts 接続先インスタンス設定](/img/integrations/servicenow-olm/servicenow-alerts-destination-instance.png)
*ServiceNow Connector の Alerts 接続先インスタンス設定*

#### 重複アラートの抑制を設定する

同じアラートが繰り返し発生した場合、コネクタは一定の時間枠内の重複を抑制し、ServiceNow が重複レコードであふれないようにします。

1. **Alerts** ページで **Configuration** タブを選択します。
2. **Duplicate Alert Suppression Time (in hours)** に時間枠の長さを入力します。デフォルトは 24 時間です。
3. **Save** を選択します。

![Alerts の Configuration タブにある重複アラート抑制設定](/img/integrations/servicenow-olm/servicenow-alerts-configuration.png)
*Configuration タブの重複アラート抑制の時間枠*

### License Automation Tool でライセンス ファイルの変更を自動化する

License Automation Tool を使用すると、エンジニアはライセンス サーバー上ではなく ServiceNow でライセンス ファイルの変更を申請できます。ServiceNow の OpenLM License Automation Tool アプリケーションには **License Deployment Requests** と **License Comparison Tool** があります。申請には新しいライセンス ファイルが添付され、OpenLM がライセンス サーバーに現在デプロイされているファイルと機能単位で比較し、承認されると OpenLM Broker を通じてデプロイします。比較レポートとデプロイ結果は、OpenLM が ServiceNow の申請に書き戻します。

この連携には 2 つの接続が必要です。OpenLM が結果を ServiceNow に送信するための **Destination Instance** 資格情報と、ServiceNow アプリケーションが OpenLM を呼び出すための API キーおよび **Connection URL** です。

#### License Automation Tool の接続先インスタンスを接続する

1. ServiceNow Connector のメニューで **License Automation Tool** を選択します。
2. **Destination Instance** タブで **ServiceNow URL** を入力します。
3. **Authentication Method** で **Basic** または **OAUTH 2.0** を選択し、この連携用に作成した ServiceNow アカウントの資格情報を入力します。
4. **Test Connection** を選択し、成功メッセージを確認します。
5. **Save** を選択します。

![License Automation Tool の接続先インスタンス設定](/img/integrations/servicenow-olm/servicenow-lat-destination-instance.png)
*License Automation Tool の接続先インスタンス設定*

#### API キーを管理する

ServiceNow アプリケーションは、OpenLM への呼び出しを API キーで認証します。キーの有効期間は 1 年で、同時に有効化できるキーは 1 つだけです。

1. **License Automation Tool** ページで **API Key Management** タブを選択します。
2. **Generate New Key** を選択します。新しいキーは一度しか表示されません。コピーして安全に保管してください。紛失した場合は、キーを失効させて新しいキーを生成します。
3. **Connection URL** をコピーします。
4. ServiceNow の OpenLM License Automation Tool アプリケーションで、接続設定に Connection URL と API キーを貼り付けます。

このタブには、現在のキーの **Api Key Status**、**Generation Time**、**Expiration Time** が表示されます。現在のキーを無効化するには **Revoke Current Key** を選択します。すでに有効なキーがある場合は、先に失効させてから新しいキーを生成し、ServiceNow アプリケーションを新しいキーで更新してください。

![License Automation Tool の API キー管理](/img/integrations/servicenow-olm/servicenow-lat-api-key-management.png)
*License Automation Tool の API キー管理*

## 連携を確認する

1. 各モジュールの **Destination Instance** タブで **Test Connection** を選択し、成功メッセージを確認します。
2. **Adapter** ページで **Sync Now** を選択し、**Last Sync Status** が **Processing** から **Success** に変わることを確認します。
3. ServiceNow で、OpenLM ステージング テーブルに新しいレコードがあることを確認します。
4. SAM Pro のターゲット テーブル（Engineering Application Usages など）に、**Source** が `OpenLM` のレコードがあることを確認します。
5. OpenLM でテスト アラートを発生させ、`OLM_ALERTS` 番号を持つタスク レコードが ServiceNow に表示されることを確認します。
6. License Automation Tool については、ServiceNow で比較申請を送信し、申請に比較レポートが表示されることを確認します。

## トラブルシューティング

| 症状 | 考えられる原因 | 対処方法 |
| --- | --- | --- |
| **Test Connection** が失敗する | インスタンス URL または資格情報が正しくない、あるいはサービス アカウントにインポート権限がない | URL の形式を確認し、資格情報を再入力し、ServiceNow でアカウントのロールを確認します |
| OAuth で **Test Connection** が失敗する | OAuth クライアントが無効化されている、またはクライアント シークレットが変更された | ServiceNow の OAuth レジストリ エントリを確認し、クライアント ID とクライアント シークレットを再入力します |
| **Last Sync Status** が **Failed** になる | 同期中に ServiceNow へ到達できなかった、または前回の保存以降に資格情報が変更された | **Test Connection** を実行し、修正した資格情報を保存してから **Sync Now** を選択します |
| 同期の実行中に Adapter の資格情報を保存できない | 同期の実行中は資格情報がロックされます | 同期の完了を待ってから、もう一度保存します |
| アラートが ServiceNow に表示されない | 抑制の時間枠内で同じアラートが繰り返されている、または Alerts の接続が保存されていない | **Duplicate Alert Suppression Time** を短くするか、Alerts の接続先インスタンス設定を確認します |
| ServiceNow のライセンス申請が処理されない | API キーが期限切れまたは失効している、あるいは OpenLM Broker がオフライン | 新しいキーを生成して ServiceNow アプリケーションを更新し、Broker とライセンス サーバーの接続を確認します |
| API キーを紛失した | キーは生成時に一度しか表示されません | **Revoke Current Key** を選択して新しいキーを生成し、ServiceNow アプリケーションを更新します |

## 既知の制限

- API キーは生成時に一度しか表示されず、アカウントごとに有効化できるキーは 1 つだけです。キーは 1 年で期限切れになります。
- 手動同期では、常に過去 3 か月分のデータが再送信されます。
- アラート転送にはオン/オフの切り替えがありません。Alerts の接続が保存されている間、アラートは常に転送されます。

## 関連情報

- [アラート](../automations/alerts)
- [OpenLM Broker](../data-collection/openlm-broker)
- [ServiceNow 変更履歴](../changelog/cloud/servicenow)
