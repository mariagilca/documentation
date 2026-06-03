---
title: "EUS & Agentインストールガイド"
description: 本ドキュメントは OpenLM End-User Services と Workstation Agent のインストール手順を説明します。Workstation Agent は任意のワークステーションにインストールできるコンポーネントです。
sidebar_position: 1
---
## **End-User Services (Personal Dashboard) と Workstation Agent について**

本ドキュメントは OpenLM End-User Services と Workstation Agent のインストール手順を説明します。Workstation Agent は多数のワークステーションにインストールできるコンポーネントで、エンドユーザー体験の向上と制御を目的としています。管理者が各ワークステーションのライセンス使用状況に関する追加情報を取得し、より効果的なリソース管理に利用できるようにすることが目的です。

主な機能は以下のとおりです:

- エンドユーザーのアプリケーションのアイドル時間を監視し、アイドルライセンスを解放できる。
- エンドユーザー向けのライセンス空き状況インターフェイスを提供する。
- IP、プロジェクト情報、ワークステーションの可用性をレポートする。

OpenLM Personal Dashboard は、エンジニアリングアプリケーションのユーザーに対して、組織内のライセンス消費状況を可視化し理解を促す追加インターフェイスです。

ユーザーは自身のライセンス使用状況を確認でき、消費習慣を改善するヒントや、デフォルトグループ/組織平均との差を確認できます。

以下は Personal Dashboard と Agent のインストールおよび設定の包括的なガイドです。

次の順番でインストールしてください:

1. End-User Services
2. Workstation Agent（旧名: OpenLM Agent）

## **Personal Dashboard のインストール**

1. 当社の Web サイトからインストーラーを取得します: [https://www.openlm.jp/downloads/](https://www.openlm.jp/downloads/)。ダブルクリックしてインストールを開始します。OpenLM End-User Services Installation Wizard のウェルカム画面が表示されるので **Next** をクリックします。
2. ライセンス契約を読み、次のいずれかを選択します（A、B、C）。  
   A. インストールを続行しない場合は **Cancel** をクリックします。インストーラーを完了せずに終了する警告を含む確認画面が表示されます。**Yes** をクリックして終了します。B. **Back** をクリックして Setup Wizard 画面に戻ります。

   C. インストールを続行するには "I Agree" にチェックを入れます。**Next** ボタンが有効になるので、**Next** をクリックして OpenLM Extensions 画面に進みます（図 4）。
3. OpenLM End-User Services をインストールするフォルダを選択します。既定パスのまま進める場合は **Next** をクリックします（推奨）。
4. SSL 証明書を接続する場合はチェックを入れ、**Browse** から証明書をインポートしてパスワードを入力します。SSL を使用しない場合は **Next** をクリックします。  
   ![Graphical user interface, application Description automatically generated](/img/legacy/graphical-user-interface-application-description-4.png)
5. OpenLM SLM のアドレスとポート番号を入力します。SSL 接続を使用する場合はチェックを入れます。入力内容の正しさを確認するため、**Check Connectivity** をクリックします。成功するとポップアップが表示されます:  
   ![Graphical user interface, text, application, chat or text message Description automatically generated](/img/legacy/graphical-user-interface-text-application-chat-1.png)  
   *接続テスト成功*
6. **OK** をクリックしてポップアップを閉じ、**Next** をクリックします。入力データに誤りがある場合は、次のポップアップが表示されます:  
   ![Graphical user interface, application Description automatically generated](/img/legacy/graphical-user-interface-application-description-5.png)  
   *OpenLM SLM への接続に失敗*
7. 次の画面で認可が必要です。セキュリティを使用しない場合は手順 11 に進み、"I am not using Security" を選択します。使用する場合は手順 8 に従います。
8. EasyAdmin を開き、**Start** → **Administration** をクリックします。
9. Administration パネルで **System&Security** を選択します。
10. **Authorization** タブをクリックし、**ADD CLIENT** を選択します。ドロップダウンから **End-User Services** を選択し、説明文と End-User Services の URL を入力します（セキュリティ/認可のため、形式は protocol://hostmane:port）。**Save** をクリックします。  
    ![Graphical user interface, application Description automatically generated](/img/legacy/graphical-user-interface-application-description-6.png)
11. 次のステップで認可ファイルが生成されます。JSON をダウンロードするか、Client ID と Secret Key をコピーします。インストールに戻り **Next** をクリックして JSON を参照するか、手動で入力します。  
    ![Graphical user interface, text, application, email Description automatically generated](/img/legacy/graphical-user-interface-text-application-email-3.png)
12. **Next** をクリックします。
13. 設定が完了したら **Install** をクリックします。  
    *設定を見直したい場合は* **Back** *をクリックしてください。  
    ![Graphical user interface, text, application, email Description automatically generated](/img/legacy/graphical-user-interface-text-application-email-4.png)*
14. インストールが完了したら **Finish** をクリックします。

    *![Text Description automatically generated](/img/legacy/text-description-automatically-generated-1.png)  
    OpenLM End-User Services が Windows サービスとしてインストールされました:*

### **End-User Services のサイレントインストール**

1. 管理者権限でコマンドプロンプトを開きます。起動方法はいくつかあります:  
   A. タスクバー検索に 'cmd' と入力して RETURN を押します。結果一覧の "Command Prompt" を右クリックし、"Run as administrator" を選択します。B. EXE を右クリックして "Run as administrator" を選択します。

   C. スタートメニューから起動します。Start を右クリックして Windows PowerShell (Admin) を選択します。管理者モードで Windows PowerShell が開きます。
2. コマンドプロンプトで、以下の形式でパラメータを指定して実行します:

```
msiexec /i "a path to msi packageOpenLM.EndUserServices.Setup.msi" SERVER_USE_SSL=true SERVER_ADDRESS=some_address SERVER_PORT=5015 EUS_USE_SSL=true SSL_CERTIFICATE_PATH="a path to ssl certificatecertificate.pfx" SSL_CERTIFICATE_PASSWORD=some_password /q
```

**例:** Server アドレス/ポート/SSL を指定し、End-User Services の SSL を有効にしてインストール:

```
msiexec /i "C:Program FilesOpenLMOpenLM.EndUserServices_dev_xxx.msi" SERVER_USE_SSL=true SERVER_ADDRESS=localhost SERVER_PORT=5015 EUS_USE_SSL=true SSL_CERTIFICATE_PATH="C:Program Filesssl-certificate.pfx" SSL_CERTIFICATE_PASSWORD=SSL123. /q
```

## セットアップウィザードによる Workstation Agent のインストール

1. 当社の Web サイトからインストーラーを取得します: [https://www.openlm.jp/downloads/](https://www.openlm.jp/downloads/)。ダブルクリックしてインストールを開始します。
2. ライセンス契約を読み、次のいずれかを選択します（A、B、C）。  
   A. インストールを続行しない場合は **Cancel** をクリックします。インストーラーを完了せずに終了する警告を含む確認画面が表示されます。**Yes** をクリックして終了します。B. **Back** をクリックして Setup Wizard 画面に戻ります。

   C. "I Agree" にチェックを入れてインストールを続行します。Next ボタンが有効になるので、**Next** をクリックして OpenLM Extensions 画面に進みます。
3. インストーラーはライセンス対象ソフトウェアの有無を自動的に検出します。OpenLM Extensions に含まれるアプリケーションがインストール済みの場合、自動検出され、チェックボックスが有効化され既定でチェックされます。内容を確認し、監視不要なものがあればチェックを外します。**Next** をクリックします。
4. **Select Installation Folder** 画面に進むには **Next** をクリックします。既定のインストールパスが入力されています。変更したい場合は **Change...** をクリックしてフォルダを選択し、**Next** をクリックします。
5. Operation mode を **Cloud** または **On-Premise** から選択します。**Next** をクリックします。
6. Application Manager を使用する場合はチェックします。使用しない場合は空欄のままにします。  
   a SSL プロトコルを使用する場合はチェックします。使用しない場合は空欄のままにします。

   b Application Manager のホスト名とポートを入力し、**Check Connectivity** をクリックします。
7. **Next** をクリックします。  
   ![スクリーンショット: Workstation Agent using Setup Wizard のインストール](/img/legacy/word-image-33292-8.png)
8. End-User Services のアドレスとポートを設定します。必要に応じて Use SSL をチェックします。既定の検出値が要件に合わない場合は修正し、**Next** をクリックします。  
   ![スクリーンショット 2: Workstation Agent using Setup Wizard のインストール](/img/legacy/word-image-33292-9.png)
9. 次に Server のアドレスとポートを設定します。必要に応じて **Use SSL** をチェックします。既定の検出値が要件に合わない場合は修正し、**Next** をクリックします。  
   ![スクリーンショット 3: Workstation Agent using Setup Wizard のインストール](/img/legacy/word-image-33292-10.png)
10. 次は認可方法を定義します。Identity Service を使用しない場合は **I am not using Security** を選択して手順 12 に進みます。使用する場合は JSON 認可ファイルをインポートするか手動入力します（手順 11）。  
    ![Graphical user interface, text, application, email Description automatically generated](/img/legacy/graphical-user-interface-text-application-email-5.png)
11. Identity Service を使用する場合は **EasyAdmin** → **System&Security** → **Authorization** → **ADD** を開きます。  
    ドロップダウンから **Agent** を選択し、認可ファイルを生成してデータをインポートします。  
    ![Graphical user interface, application Description automatically generated](/img/legacy/graphical-user-interface-application-description-7.png)
12. 設定が完了したら **Install** をクリックします。
13. インストール完了後、**Finish** をクリックします。
14. Agent のインストールが完了すると Personal Dashboard が自動的に起動します（起動しない場合は Start メニューのアイコンを使用します）。![Graphical user interface, text, application Description automatically generated](/img/legacy/graphical-user-interface-text-application-descri.png) ![Graphical user interface Description automatically generated](/img/legacy/graphical-user-interface-description-automatically.png)  
    ライセンスリポジトリにアクセスでき、現在消費されているライセンス、使用者、機能、アイドル時間、連絡先などの情報を確認できます。  
    また、*Recently closed* プロセス、*Project management, and Product licensing level*（ArcGIS）も表示されます。  
    ![Graphical user interface, text, application Description automatically generated](/img/legacy/graphical-user-interface-text-application-descri-1.png)

### トラブルシューティング

ArcGIS 拡張のインストールで次のエラーが表示された場合:  
![Image](/img/legacy/arcgis.png)  
インストーラーのコマンドライン引数に NETFRAMEWORK35="1" を追加してください。例:

```
msiexec /i "C:\OpenLM.NewAgent.Setup.22.2.1.1912.msi" AUTHORIZATION_TYPE="1" AUTHORIZATION_FILE_PATH="C:\agent-authorization.json" INSTALL_ARCGIS=1 NETFRAMEWORK35="1" /q
```

## **Workstation Agent のサイレントインストール**

1. 管理者権限でコマンドプロンプトを開きます。起動方法はいくつかあります:  
   A. タスクバー検索に 'cmd' と入力して RETURN を押します。結果一覧の "Command Prompt" を右クリックし、"Run as administrator" を選択します。B. EXE を右クリックして "Run as administrator" を選択します。

   C. スタートメニューから起動します。Start を右クリックして Windows PowerShell (Admin) を選択します。管理者モードで Windows PowerShell が開きます。
2. コマンドプロンプトで、以下の形式でパラメータを指定して実行します:

### 認可ファイルのインポートでインストール

```
msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" AUTHORIZATION_TYPE="1" AUTHORIZATION_FILE_PATH="a path to security settings json filesetting json file" /q
```

**例:**

```
msiexec / i "C:Program FilesOpenLM OpenLM.NewAgent.Setup.22.1.11.1010.msi" AUTHORIZATION_TYPE = "1" AUTHORIZATION_FILE_PATH = "C:Program FilesOpenLM agent-authorization.json" / q
```

### **セキュリティなしでインストール:**

```
msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" AUTHORIZATION_TYPE="3" /q
```

### **追加パラメータ:**

```
USE_APP_MANAGER=true/false
APP_MANAGER_USE_SSL=true/false
APPMANAGER_ADDRESS=FQDN
APPMANAGER_PORT=27080
ENDUSERS_SERVICES_USE_SSL=true/false
ENDUSERS_SERVICES_ADDRESS=FQDN
ENDUSERS_SERVICES_PORT=53555
SERVER_USE_SSL=true/false
SERVER_ADDRESS=FQDN
SERVER_PORT=5015
INSTALLFOLDER
INSTALL_ARCGIS="1"
INSTALL_ARCGISPRO="1"
INSTALL_AUTOCAD="1"
INSTALL_MATLAB="1"
INSTALL_SOLIDWORKS="1"
CREATE_AGENT_PROGRAM_MENU_SHORTCUT=false

```

## AppManager と SSL 接続

```
msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" USE_APP_MANAGER=true APP_MANAGER_USE_SSL=true APPMANAGER_ADDRESS=FQDN APPMANAGER_PORT=27080 /q
```

**例:**

```
msiexec /i "C:Program FilesOpenLMOpenLM.NewAgent.Setup.22.1.11.1010.msi" USE_APP_MANAGER=true APP_MANAGER_USE_SSL=true APPMANAGER_ADDRESS=FQDN APPMANAGER_PORT=27080 /q
```

**例:**

**Server Address, port, EUS address, AppManager Address, port, SSL**

```
msiexec /i "a path to msi packageOpenLM.NewAgent.Setup.msi" SERVER_ADDRESS=localhost SERVER_PORT=5015 SERVER_USE_SSL=true ENDUSERS_SERVICES_ADDRESS=localhost ENDUSERS_SERVICES_PORT=53555 ENDUSERS_SERVICES_USE_SSL=true USE_APP_MANAGER=true APPMANAGER_ADDRESS=localhost APPMANAGER_PORT=27080 APP_MANAGER_USE_SSL=true INSTALL_ARCGIS="1" INSTALL_AUTOCAD="1" INSTALL_MATLAB="1" /q
```

## End-User Services (Personal Dashboard) on Linux

End-User Services は DEB、RPM、または .tar.gz で提供されます。

必要な形式を選び、以下の手順に従ってください:

### .deb パッケージで End-User Services をインストール

```
sudo apt install openlm-eus_xxxx_amd64.deb
```

### CentOS では、提供された .rpm を使用して End-User Services をインストール

```
sudo yum install openlm_eus-xxxxx.x86_64.rpm
```

### .tar.gz を使用したインストール

**.tar.gz を展開:**

```
mkdir eus
tar -xf openlm_eus_xxxxx.tar.gz -C eus
```

**実行権限を付与してスクリプトを実行:**

```
cd eus
sudo chmod +x install.sh
sudo ./install.sh
```

## **インストール後に必ず行う作業:**

**End-User Services の設定を編集します。OpenLM SLM のホスト名とポートを指定してください:**

```
sudo nano /opt/openlmeus/settings.json
```

**OpenLM SLM with Identity を使用する場合、settings.json でセキュリティを有効にする必要があります。**

また、/opt/openlmeus/end-user-services-authorization.json を EasyAdmin でダウンロードしたファイルに置き換えるか、clientId と clientSecret を手動で編集します。

**変更を反映するため End-User Services を再起動し、ステータスを確認します:**

```
sudo systemctl restart openlmeus
sudo systemctl status openlmeus
```

## **Linux に Workstation Agent をインストール**

**! End-User Services のインストールが必須です。**

Agent は DEB、RPM、または .tar.gz でインストールできます。

### .deb パッケージで Agent をインストール

```
sudo apt install openlm-agent_xxx_amd64.deb
```

### CentOS では、提供された .rpm を使用して Agent をインストール

```
sudo yum install openlm_agent-xxxx.x86_64.rpm
```

**または .tar.gz を使用してインストール:**

**.tar.gz を展開:**

```
mkdir agent
tar -xf openlm_agent_dev_xxxx.tar.gz -C agent
```

**実行権限を付与してスクリプトを実行:**

```
cd agent
sudo chmod +x install.sh
sudo ./install.sh
```

## **インストール後に必ず行う作業:**

**Agent の設定を編集します:**

```
sudo nano /opt/openlmagent/settings.json
```

OpenLM SLM、End-User Services、Applications Manager のホスト名とポートを指定する必要があります。

OpenLM SLM with Identity を使用する場合は、settings.json でセキュリティを有効にする必要があります。また、/opt/openlmagent/agent-authorization.json を EasyAdmin でダウンロードしたファイルに置き換えるか、clientId と clientSecret を手動で編集します。

**変更を反映するため Agent サービスを再起動し、ステータスを確認します:**

```
systemctl --user restart openlmagent
```

```
systemctl --user status openlmagent
```
