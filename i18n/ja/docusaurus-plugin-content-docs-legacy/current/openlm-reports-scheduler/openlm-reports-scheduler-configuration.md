---
title: "OpenLM Reports Scheduler設定"
sidebar_position: 2
---
OpenLM EasyAdmin ユーザーインターフェースには、ライセンス使用状況に関する情報を表示するさまざまなレポートが含まれています。EasyAdmin では、次の方法でレポートを共有できます:

1. 管理者以外のアカウントにレポート閲覧権限を付与する
2. カスタム生成されたレポート URL を共有する
3. レポートをメールで特定のユーザー/グループ/個別アドレスに共有する（.png、.csv などの形式）

既定では、これらのレポートはユーザーが該当機能を要求またはアクセスしたときに手動で生成されます。OpenLM Reports Scheduler 拡張により、管理者は事前に定義したスケジュールに従ってレポートを自動生成できます。

## Overview

レポートをスケジュールするには、OpenLM 管理者は次を実施します:

1. EasyAdmin の "Email" モジュールで有効な SMTP サーバーを設定します。
2. EasyAdmin の認証が有効な場合、EasyAdmin に管理者アカウントがあることを確認し、Scheduler に設定します。
3. 特定の EasyAdmin レポートを開き、フィルターを設定します（例: License Usage レポート）。
4. Share → Schedule をクリックし、頻度とレポート受信者を定義して保存します。

これで、スケジュールされたレポートは指定した時刻に受信者へ送信されます。スケジュールされたレポートは通常のレポートと同じデータを表示しますが、自動生成される点が異なります。これは、直近期間を表示する日付範囲フィルター（例: "Last 7 days"）と併用するのに適しています。

## EasyAdmin を設定してスケジュールレポートを作成する

### Email の設定

OpenLM Reports Scheduler はメールでレポートを送信するため、**EasyAdmin Start → Administration → Email/SMS** モジュールで有効なメールサーバーを設定する必要があります。

![](/img/legacy/Screenshot-2023-11-01-at-21.43.04.png)

**エラー発生時の通知に使用されるため、Recipient Addresses は少なくとも 1 つ以上入力することを強く推奨します。**

### **受信者ユーザーのメールアカウント設定**

既定では、スケジュールレポートは特定のユーザーに紐づいています。多くの場合、このユーザーはスケジュールレポートを設定した管理者です。このユーザーは OpenLM データベースに存在し、有効なメールアカウントが関連付けられている必要があります。

ユーザーのメールアドレスを設定するには、**EasyAdmin User Interface Start → Users & Groups → Users** を開きます。対象ユーザーを見つけてダブルクリックし、以下の画像のようにユーザー詳細を編集します:

![](/img/legacy/word-image-67_2.png)

![](/img/legacy/word-image-68_1.png)

OpenLM でユーザー（および他のエンティティ）を作成する方法の詳細は、次のアプリケーションノートを参照してください: [Introducing Entities in OpenLM - Users, Groups, IP and Hosts](../openlm-slm-features/openlm-group-usage/introducing-entities-in-openlm-users-groups-ip-and-hosts.md)

## **OpenLM Reports Scheduler の構成**

### **report_scheduler.properties ファイルの編集**

report_scheduler.properties ファイルには、Reports Scheduler の設定がすべて保存されています。通常、運用に必要な設定のほとんどはインストール時に定義されるか、（アップグレード時に）以前のバージョンから引き継がれます。セクション 4（"EasyAdmin を設定してスケジュールレポートを作成する"）の手順に従っている限り、手動編集は不要です。

ただし、次のような特別なケースでは編集が可能であり、必要になる場合があります:

- EasyAdmin に SMTP サーバーを設定していない場合。既定では、EasyAdmin の SMTP 設定が report_scheduler.properties の設定より優先されますが、何らかの理由で SMTP が設定されていない場合は **mail** 変数で SMTP を個別に設定できます。これにより、Reports Scheduler と Server の統合でエラーが発生した際に管理者へメール通知を送ることができます。
- OpenLM SLM のホスト名（Server とは別マシンにインストールされている場合）や既定の通信ポートが変更された場合。

管理者が主に設定する変数は次のとおりです:

| **Variable** | **Possible value** | **Description** |
| --- | --- | --- |
| mail.smtp.host\* | *ユーザー指定* | SMTP サーバーのホスト名または IP。 |
| mail.smtp.port\* | *ユーザー指定* | SMTP サーバーのポート。 |
| mail.smtp.auth\* | **true** or **false** | SMTP サーバーが認証を必要とするかに応じて設定します。 |
| mail.smtp.ssl\* | **true** or **false** | SMTP サーバーが SSL 接続を使用するかに応じて設定します。 |
| mail.smtp.username\* | *ユーザー指定* | SMTP サーバーのユーザー。 |
| mail.smtp.password\* | *ユーザー指定* | SMTP サーバーのパスワード。 |
| mail.smtp.sender\* | *ユーザー指定* | "from:" フィールドに表示されるメールアドレス。 |
| mail.recipients\* | *ユーザー指定* | セミコロン区切りの受信者メールアドレス。 |
| openlm.protocol | **http** (default) or **https** | OpenLM の API ポートで使用するプロトコル。 |
| openlm.host | **localhost** (default) or FQDN | Reports Scheduler が同期する OpenLM SLM のホスト名。SSL 接続が必要な場合は localhost を FQDN に変更します。 |
| openlm.soap.port | Default: **5015** | OpenLM SLM API ポート。 |
| openlm.ea.port | Default: 5015 | OpenLM の EasyAdmin ポート。 |
| openlm.ea.host | Default: **localhost** (default) or FQDN | OpenLM の EasyAdmin ホスト名（OpenLM SLM のホスト名と同一）。SSL 接続が必要な場合は localhost を FQDN に変更します。 |
| openlm.ea.protocol | **http** (default) or **https** | OpenLM の EasyAdmin 通信プロトコル。**http** または **https** を設定できます。 |
| openlm.client.id=openlm.reportscheduler.client | Identity Service の Web UI でユーザーが Identity Service と Reports Scheduler を接続すると自動設定 | セキュア接続用の Reports Scheduler 資格情報。 |
| openlm.client.secret=reportscheduler_secret |  |  |
| openlm.client.scope=openlm.server.scope |  |  |
| scheduler.report.files.directory | *ユーザー指定* | レポートをローカルに保存する場合のディレクトリパス。 |
| webdriver.impl.path | Default: **chromedriver.exe** | ChromeDriver を別パスで使う場合に変更します。 |

\* 注: 設定されていない場合、Reports Scheduler は EasyAdmin で設定された SMTP サーバー設定を使用します。

**Param.js ファイルの設定（OpenLM SLM (EasyAdmin) と Report Scheduler の接続）**

OpenLM SLM (Easy Admin) と Report Scheduler を別のコンピュータ/サーバーにインストールしていて接続できない場合（例: 既定ホスト 127.0.0.1 への接続エラーが発生する場合）、OpenLM SLM の param.js ファイル内のホスト名とポート番号を変更して、Report Scheduler のホストとポートに接続できるようにします。手順は次のとおりです:

OpenLM SLM の param.js ファイルは、既定では次のパスにあります:

"C:Program FilesOpenLMOpenLM SLMbinwwwrootparams.js"

Report Scheduler のスケジューリングタスク URL は param.js に記載されており、次の画像のとおりです:

![](/img/legacy/word-image-69_1.png)

hostname および/またはポート番号を、Report Scheduler がインストールされているコンピュータ/サーバーの値に変更します。

### セキュア環境での Reports Scheduler 設定

**ケース 1: Identity Service 経由の接続**

Identity Service を介してセキュア環境で Report Scheduler を構成するには、次の手順に従います:

OpenLM SLM、Identity Service、Report Scheduler が同一マシンにインストールされている必要があります:

![](/img/legacy/word-image-70.png)

1. OpenLM SLM をインストールします。OpenLM SLM のインストール方法のリンクを参照してください。
2. Identity Service をインストールします。Identity Service のインストール方法のリンクを参照してください。
3. Report Scheduler をインストールします。Report Scheduler のインストール手順は本ドキュメントのセクション 3 を参照してください。
4. これらのアプリケーションを Identity Service を介して接続するように設定します。OpenLM SLM と Report Scheduler は Identity Service で接続され、以下の画面のようになります。

Report Scheduler を Identity Service と連携するには、**Identity Service < Settings < Security Configuration** に移動し、トグルボタン ![](/img/legacy/word-image-71.png) をオンにして Report Scheduler の URL（ポート: 8888）を追加します。**Save** ボタンで情報を保存します。

![](/img/legacy/word-image-72.png)

1. 変更を反映するために Report Scheduler を再起動し、OpenLM SLM も再起動します。

Report Scheduler を再起動するには、**Services** > **OpenLM Reports Scheduler** を選択し、**Restart** をクリックしてサービスを再起動します。

同様に、OpenLM SLM を再起動するには、**Services** > **OpenLM SLM** を選択し、**Restart** をクリックしてサービスを再起動します。

![](/img/legacy/word-image-73.png)

Report Scheduler は Identity Server とセキュア環境で接続され、次の画面のようになります:

![](/img/legacy/word-image-74.png)

report_scheduler.properties ファイルは、次の画像のように client.id と client.secret で更新されます。

![](/img/legacy/word-image-75.png)

**ケース 2 - HTTPS 経由の接続**

OpenLM SLM が HTTPS で接続されている場合、OpenLM Report Scheduler も HTTPS で接続する必要があります。

注意: OpenLM SLM と OpenLM Report Scheduler の両方が HTTPS で接続されていない場合、OpenLM SLM は OpenLM Report Scheduler に接続できません。

OpenLM Report Scheduler プロパティファイルで必要な変更

OpenLM Report Scheduler を HTTPS で接続するには、次の手順を実施します:

1. OpenLM Report Scheduler のプロパティファイルに移動します。

![](/img/legacy/word-image-76_1.png)

2. openlm.protocol と openlm.ea.protocol のプロトコルを HTTPS に変更します。

![](/img/legacy/word-image-77_1.png)

3. openlm host を Fully Qualified Domain Name に変更します。

![](/img/legacy/word-image-78_1.png)

4. サーバープロトコルを HTTPS に変更します。

![](/img/legacy/word-image-79_1.png)

5. Report Scheduler のプロパティファイルを保存して変更を反映します。

### OpenLM SLM の param.js ファイルで必要な変更

1. OpenLM SLM の param.js ファイルに移動します。

![](/img/legacy/word-image-80_1.png)

2. var_schedulingTaskURL で HTTP を HTTPS に変更します。

![](/img/legacy/word-image-81_1.png)

3. OpenLM SLM の Param.js ファイルを保存して変更を反映します。

### OpenLM Identity Service の appsettings.json ファイルで必要な変更

1. OpenLM Identity Service の appsettings.json ファイルに移動します。

![](/img/legacy/word-image-82_1.png)

2. scheduler URL を HTTPS に変更し、appsettings.json を保存します。

![](/img/legacy/word-image-83_1.png)

OR

OpenLM Identity Service UI で Security Configuration タブに移動し、Report Scheduler の URL を HTTPS に変更します。

![](/img/legacy/word-image-84.png)

"OpenLM Reports Scheduler" サービスを再起動します。

![](/img/legacy/word-image-85_1.png)

OpenLM SLM は HTTPS 経由で Report Scheduler に接続されます。

## **OpenLM Reports Scheduler の使用方法**

### レポートのスケジュール設定

1. レポートをスケジュールするには、EasyAdmin レポート（例: License Usage）を開きます。

2. 必要に応じてレポートの項目、フィルター、その他オプションを設定します。

3. レポートウィンドウ左下の **Share** をクリックし、**Schedule** をクリックします。

![](/img/legacy/word-image-86_1.png)

### 

4. **Schedule Report** ウィンドウが表示されます:

***![](/img/legacy/scheduler.png)***

ここで設定できる内容:

- レポートの頻度（例: 毎週日曜 01:00 AM）
- 受信者: 既存のユーザー/グループ、または複数の直接メールアドレスを指定できます。ユーザー/グループ受信者の場合は、ユーザーまたはグループ内ユーザーに有効なメールアドレスが関連付けられている必要があります。
- Job Description: ここで入力したテキストはメールレポートに含まれます。
- Receiving User Timezone: 受信者が OpenLM SLM と異なるタイムゾーンにいる場合、このオプションで送信タイミングを調整できます。

5. **OK** をクリックしてレポートを保存し、ウィンドウを **Close** します。

### スケジュールレポートの管理

作成済みのスケジュールタスクを管理するには:

1. EasyAdmin Start → Scheduling Tasks をクリックします。

![](/img/legacy/word-image-88_1.png)

2. 表示されたウィンドウで、変更したいタスクを選択します。**Edit**、**Delete**、**Disable/Enable**、**Show URL** を実行できます（Share → Share Link と同じ機能です）。

![](/img/legacy/word-image-89_1.png)
