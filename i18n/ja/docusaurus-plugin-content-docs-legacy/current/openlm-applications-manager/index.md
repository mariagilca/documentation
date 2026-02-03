---
title: "Applications Managerインストールガイド"
sidebar_position: 1
---
OpenLM Applications Manager は、過剰なライセンス消費への介入や、予定外のライセンス費用・ライセンス準拠違反を回避するためのソリューションを提供します。

Applications Manager は、すべての OpenLM Workstation Agent のための Java アプリケーションハブです。OpenLM SLM は Broker コンポーネントに問い合わせ、Broker が Applications Manager に問い合わせて使用状況データを取得します。そのため、Broker コンポーネントは必須であり、Applications Manager と同じマシンにインストールする必要があります。

![OpenLM Applications Manager workflow](/img/legacy/openlm-applications-manager-workflow.png)

OpenLM Applications Manager のワークフロー。

## インストール

OpenLM Applications Manager は Java で実装されており、Java が動作する任意のマシンにインストールできます。本セクションでは Windows と Unix / Linux の両方を説明します。

### システム要件

1. Java 11**\***
2. 64-bit OS
3. OpenLM SLM が正常にインストール済み
4. OpenLM Broker が正常にインストール済み

**\*** Java 11 は Applications Manager インストーラーに同梱される場合があるため、追加ダウンロードは不要です。

### Unix / Linux のインストール

### 事前準備

1. OpenLM のダウンロードページから、Unix/Linux 用 Application Manager の最新バージョンを取得します。

2. アーカイブ（OpenLM\_AppManager\_#.#.#.#.tar.gz）を任意の場所に展開します。

3. **settings.sh** ファイルをエディタで開きます。このファイルには AppManager 動作に必要な変数が含まれています。**JAVA\_HOME** 変数を JDK 11 のインストールパスに設定することが必須です。

* **JAVA\_HOME** のパス末尾にはスラッシュを付けないでください。

必要に応じて **APPMANGERSRVNAMEUSER** 変数を編集し、"root" 以外のアカウントでサービスを起動できます。その場合は "OpenLM\_AppManager\_X.X.X.X" フォルダ内のすべてのファイルの所有者を新しいユーザーに変更してください。

4. ファイルを保存し、Linux ディストリビューションに応じて以下のインストール手順へ進みます。

### Applications Manager をサービスとしてインストール

Linux が systemd をサポートしている場合、以下の手順で OpenLM AppManager をサービスとしてインストールし、システム起動時に自動開始できます:

1. AppManager をサービスとしてインストール:

sudo ./appmanager.sh install

2. AppManager サービスの状態を確認:

sudo ./appmanager.sh status

3. AppManager の検出スクリプトを実行します。Linux にデスクトップ UI がある場合、GUI の AppManager Configuration ツールを次のコマンドで起動することもできます:

sudo ./appmanager.sh config

### Applications Manager をバックグラウンドプロセスとして実行

Linux が systemd をサポートしていない場合は、以下の手順で OpenLM AppManager をバックグラウンドプロセスとして実行します:

1. AppManager プロセスを起動:

sudo ./run\_appmanager.sh

AppManger の設定画面を開く場合:

sudo ./run\_appmanagerconfig.sh

### Windows インストール

1. [Downloads](https://www.openlm.jp/downloads/) ページから最新の Windows インストーラーを取得します。
2. OpenLM Applications Manager のインストールファイルをダブルクリックしてウィザードを起動します。  
   ![](/img/legacy/word-image-50401-2.png)
3. **Next** をクリックするとライセンス契約画面が表示されます。
4. ライセンス契約を確認し、"**I Accept the Terms of the License Agreement**" にチェックを入れます。  
   ![](/img/legacy/word-image-50401-3.png)  
   図 2: ライセンス契約画面。
5. **Next** をクリックして Java Selection Screen に進みます。次の 2 つの選択肢があります。
6. Java OpenJDK で Application Manager をインストールする。
7. 既に Java をインストールしている場合は、そのパスを指定します:  
   ![](/img/legacy/word-image-50401-4.png)  
   図 3: Java Selection 画面。
8. **Next** をクリックして設定を確定し、"Install Location" 画面へ進みます。  
   ![](/img/legacy/word-image-50401-5.png)  
   図 4: "Choose Install Location" 画面。
9. インストールパスを選択します。既定は **C:\Program Files\OpenLM\OpenLM App Manager\** です。
10. OpenLM SLM のホスト名とリスナーポートを入力します（既定ポートは 5015）:  
    ![](/img/legacy/word-image-50401-6.png)  
    図 5: インストール完了画面。
11. インストール完了後、**Next** をクリックし、**Finish** をクリックして終了します。  
    ![](/img/legacy/word-image-50401-7.png)  
    図 6: 完了画面。

### 外部 JRE を使用する場合

Applications Manager インストーラーに同梱された JRE ではなく外部 JRE を使用する場合、"OpenLM App Manager" サービスを動作させるために追加の手順が必要です。Java はシステム要件に合わせて 11 以上を使用してください。外部 JRE を設定する手順:

1. Applications Manager のインストールフォルダを開き、**bin** フォルダに移動します（既定のパスは **C:\Program Files\OpenLM\OpenLM App Manager\bin**）。
2. **OpenLMLicenseManager.exe** をダブルクリックします。
3. **Java** タブを選択します。  
   ![](/img/legacy/word-image-50401-8.png)  
   図 7: OpenLM App Manager Config ツールの "Java" タブ。
4. "Use default" のチェックを外します。
5. "Java Virtual Machine" フィールド付近の **...** ボタンをクリックします。
6. **sqljdbc_auth.dll** の場所を指定します（例: 一般的な JDK11 環境では **C:\Program Files\OpenLM\OpenLM Applications Manager\bin**）。
7. Open をクリックし、続けて OK をクリックします。

### 認可ファイルの生成

1. EasyAdmin User Interface にアクセスします。
2. Start → Administration → System & Security → Security → Authorization → ADD に移動します。
3. **Type** のドロップダウンから **Applications Manager** を選択します。
4. **Description** に任意のテキストを入力します。
5. **SAVE** をクリックし、**OK** をクリックします。認可情報（Client ID と Client Secret）が表示されます。JSON ファイルをダウンロードするか、値をコピーできます。
6. **Download** または **Copy** をクリックします。
7. ダイアログを閉じます。

### Applications Manager の認可

1. `C:\Program Files\OpenLM\OpenLM Applications Manager` に移動します。
2. **auth_tool** の bat ファイルを探して開きます。OpenLM Applications Manager Auth Tool が起動します。
3. **Import Authorization File** をクリックし、認可ファイルの保存先を指定して開きます（Client ID と Client Secret を手動で貼り付けることも可能）。
4. **Test** をクリックします。接続成功のポップアップが表示されるので **OK** で閉じます。
5. **Apply** をクリックします。Applications Manager の再起動を促すポップアップが表示されます。
6. Windows Services 画面を開きます（**Windows + R** で実行を開き、**services.msc** と入力して OK）。
7. "OpenLM App Manager" サービスを探して選択します。
8. 左上の "Start" をクリックします。
9. サービスが開始したら Services ウィンドウを閉じます。

## Applications Manager の設定

Applications Manager を正しく動作させるには、連携する各コンポーネントの設定が必要です。対象は OpenLM SLM、OpenLM Broker、OpenLM Workstation Agent です。本セクションではそれぞれの設定方法を説明します。

### Applications Manager 用の OpenLM Broker 設定

OpenLM Broker は OpenLM SLM との接続を担います。Broker を Applications Manager に接続すると、その設定が SLM に渡されます。このため、Applications Manager の設定は最初に Broker 側で行うことを推奨します。

Detect 機能はライセンスマネージャー情報を自動検出し、OpenLM Broker の設定を簡素化します。検出結果に応じて新しいポート情報（コマンドやパスなど）が追加されます。

1. OpenLM Broker を開き、**License Managers Tab → ADD** に移動します。
2. **Detect** をクリックします。検出された設定が反映されるか、既定値が使用されます。Applications Manager ライセンスサーバーと追加ノードがナビゲーションに追加されます。  
   ![](/img/legacy/word-image-50401-10.png)  
   図 8: OpenLM Broker 設定ツールと "Detect" 機能。
3. 自動検出されたライセンスマネージャー情報がインストール内容と一致しているか確認します。対象は Applications Manager の Host Name / IP（License Server ノード）、Port Number と License Manager Type（Port ノード）、'status' のコマンドパス（Commands Status ノード）、'data_inquiry' のコマンドパス（Commands → data_inquiry ノード）、ログファイルパス（Log Files ノード）です。既定値は **表 1** を参照してください。

| **LM Type** | OpenLM App Manager |
| --- | --- |
| **Hostname / IP** | Localhost |
| **Port Number** | 27080 |
| **Status Toggle** | *Active* |
| **Log File** | C:\Program Files\OpenLM\OpenLM App Manager\logs\lm-log.log |

**表 1: Applications Manager に対する OpenLM Broker の既定値**

**SAVE** をクリックして変更を保存します。

1. OpenLM SLM の EasyAdmin User Interface を開き、License Servers ウィンドウへ移動します。**Start → Widgets → License Servers** に移動します。  
   ![](/img/legacy/word-image-50401-11.png)  
   図 9: EasyAdmin User Interface の License Servers 画面。
2. Broker が Applications Manager を検出して追加していれば、上図のように Pending Status の AppManager が表示されます。ダブルクリックし、タイムゾーンを選択して **Approve** をクリックします。

### Applications Manager 用の OpenLM Workstation Agent 設定

OpenLM Workstation Agent が Applications Manager を通じてライセンス配分に介入できるようにするには、Workstation Agent 側で設定が必要です。設定はインストール前または後に行えます。

1. Workstation Agent のインストール中に、App Manager を使用するかどうかの確認が表示されます。Use Applications Manager にチェックを入れ、下記のようにホストとポートを入力します。  
   ![](/img/legacy/word-image-50401-12.png)  
   図 10: Applications Manager 設定を含む Workstation Agent インストール画面
2. Workstation Agent のインストール手順は、このリンクを参照してください。
3. Applications Manager のサーバーアドレスが未設定の場合は、実際のホスト名または IP アドレスに変更します。
4. **Check Connectivity Status** ボタンをクリックして OpenLM License Manager への接続を確認します。成功画面が表示されるはずです。失敗する場合は、Applications Manager サービスが稼働しているか、Broker の Port と License Server 設定が正しいか、ライセンスファイルに Applications Manager 拡張が含まれているかを確認してください。問題が解消しない場合は OpenLM サポート（support@openlm.com）に連絡してください。
5. **Apply** をクリックして変更を反映し、Agent Configuration 画面を閉じます。

これで設定は完了です。

より詳細な情報は [このドキュメント](./openlm-applications-manager-configuration.md) を参照してください。
