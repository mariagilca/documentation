---
title: OpenLM Broker の Windows インストール
description: "OpenLM Broker は、OpenLM Software License Management (SLM) と Software License Management Cloud との間の通信を仲介します。"
sidebar_position: 1
---
## **概要**

OpenLM Broker は、OpenLM Software License Management と Software License Management Cloud（本書では **SLM** と **SLMC**）およびライセンスマネージャー間の通信を仲介し、ライセンス統計と機能を強化します。ライセンスマネージャーに直接アクセスして定期的にライセンス情報を照会し、そのデータを OpenLM SLM (Server) に中継します。OpenLM Broker はオプションのコンポーネントですが、OpenLM システムのライセンス管理体験と機能を強化するため、導入を強く推奨します。

## **OpenLM Broker のインストール**

OpenLM Broker は Java ベースで、Java をサポートするプラットフォームで動作します。Broker はライセンスマネージャーと同じマシンにインストールする必要があります。Java 環境が必要なため、Java Runtime Environment (JRE) はインストールに同梱されています（Broker のインストール時のみ）。インストールを開始する前に、OpenLM Web サイトの [システム要件](https://www.openlm.jp/openlm-system-requirements/) を確認することを推奨します。本書では、Windows に OpenLM Broker をインストールする方法として、標準のウィザードインストール（**A. インストールウィザードで OpenLM Broker をインストール**）とサイレントインストール（**B. OpenLM Broker のサイレントインストール**）を説明します。

両方の方法で OpenLM Broker インストーラーが必要です。ダウンロードページ[https://www.openlm.jp/downloads/](https://www.openlm.jp/downloads/)から取得できます。

### ***A. インストールウィザードで OpenLM Broker をインストール***

1. インストーラーファイル（OpenLM.Broker.Installer-#.#.##.##.msi）をダブルクリックしてインストールを開始します。インストール Welcome 画面（**図 2**）の前に「Preparing to install」画面（**図 1**）が一時的に表示されます。

![OpenLM Broker Installer wizard welcome screen.](/img/legacy/openlm-broker-installer-wizard-welcome-screen-.png)

**図 1: インストール準備画面。**

**![スクリーンショット: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-16.png)**

**図 2: インストール Welcome 画面。**

2. **[Next]** をクリックして続行します。ライセンス契約画面が表示されます（**図 3**）。

![スクリーンショット 2: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-17.png)

**図 3: ライセンス契約画面。**

3. 条件に同意してインストールを続行する場合は、I Agree のラジオボタンをクリックします（**図 4**）。ラジオボタンをクリックすると **[Next]** ボタンが有効になります。**[Cancel]** をクリックすると、変更を行わずにインストーラーを終了します。

![スクリーンショット 3: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-18.png)

**図 4: I Agree を選択したライセンス契約画面。**

4. **[Next]** をクリックします。Java 選択画面が表示されます。バンドルされた OpenJDK を使用するか、既にインストールされている Java 11 のパスを選択してください（**図 5**）。

![スクリーンショット 4: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-19.png)

**図 5: Java 選択画面。**

**[Next]** をクリックします。既定のインストールパスが表示された Select Installation Folder 画面が表示されます（**図 6**）。

![スクリーンショット 5: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-20.png)

**図 6: インストールフォルダーの選択画面。**

5. *[任意]* **[Browse]** をクリックして別のインストールパスを選択します。既定パスを推奨します。

6. **[Next]** をクリックします。インストール確認画面が表示されます（**図 6**）。

![スクリーンショット 6: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-21.png)

**図 7: インストール確認画面。**

7. **[Next]** ボタンをクリックしてインストールを開始します。インストール進行画面が表示されます（**図 8**）。インストール完了後、成功画面（**図 9**）が表示されます。  
![スクリーンショット 7: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-22.png)

**図 8: インストール進行画面。**

![スクリーンショット 8: A. Install OpenLM Broker with the installation wizard](/img/legacy/Screenshot-2024-07-02-at-19.12.13.png)

**図 9: インストール成功通知。Broker 初期設定ウィンドウ**

8. **[Close]** ボタンをクリックしてインストーラーを終了します。

9. Broker に戻り、Broker がデータを送信する先（クラウドアカウントまたはオンプレミスインストール）を選択します。

9.1 オンプレミスインストール:

1. **Local OpenLM Installation** を選択して **[Next]** をクリックします。
2. Easy Admin の URL を入力します:  
   ![スクリーンショット 9: A. Install OpenLM Broker with the installation wizard](/img/legacy/Screenshot-2024-07-02-at-19.13.23.png)
3. **[Next]** をクリックします。Broker が EasyAdmin への接続を試行します。

**Identity Service 経由で OpenLM SLM に接続している場合:**

1. EasyAdmin -> Start Menu -> Administration -> System & Security -> Authorization -> Add に移動します。  
   ![スクリーンショット 10: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-25.png)
2. ドロップダウンリストから **[Broker]** を選択します。
3. 適切な説明を入力します:  
   ![スクリーンショット 11: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-26.png)
4. **[Save]** をクリックします。
5. Client Secret と Client ID に関する「Attention」メッセージをよく読んでから **[OK]** をクリックします。  
   ![スクリーンショット 12: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-27.png)
6. 次のプロンプトで Client Secret と Client ID が表示されます。これらは Broker にインポートする必要があります。インポート方法は、JSON ファイルのダウンロードか Copy&Paste のいずれかです。適切な方法を選択して Broker に戻ります:  
   ![スクリーンショット 13: A. Install OpenLM Broker with the installation wizard](/img/legacy/word-image-28.png)
7. **[Import Broker Authorization File]** をクリックします。Authorization File をダウンロードしたパスを指定します。
8. Authorization File をインポートするとフィールドが自動入力されます。同様の操作は Copy&Paste でも可能です。**[Next]** をクリックします。  
   ![スクリーンショット 14: A. Install OpenLM Broker with the installation wizard](/img/legacy/Screenshot-2024-07-02-at-19.18.39.png)

これで OpenLM Broker のインストールは完了です。**OPENLM USER INTERFACE** をクリックすると EasyAdmin が開きます。設定の詳細は [OpenLM Broker 設定](./openlm-broker-configuration.md) を参照してください。

### ***B. OpenLM Broker のサイレントインストール***

複数のインストールを展開するシステム管理者は、サイレントインストールを使用すると効率的です。この方法では、事前定義したオプションでウィザードの対話なしに OpenLM Broker をインストールできます。また、インストール時に Broker の自動検出機能が実行され、特定のライセンスマネージャー（例: FLEXlm）が自動で検出・設定されます。

1. 管理者権限でコマンドプロンプトを開きます（**図 9**）。コマンドプロンプトは次の方法で起動できます:

- タスクバーの検索欄に **cmd** と入力して **[ENTER]**。結果の Command Prompt を右クリックし、Run as administrator を選択。
- EXE を直接起動（例: C:WindowsSystem32cmd.exe を右クリックし、Run as administrator を選択）。
- スタートメニューから Windows PowerShell を開き、Start を右クリックして Windows PowerShell (Admin) を選択。管理者モードで PowerShell が開きます。

![スクリーンショット: B. OpenLM Broker silent installation](/img/legacy/word-image-30.png)

**図 10: 管理者権限で開いたコマンドプロンプト画面。**

2. 管理者権限のコマンドプロンプトで、次の形式で msiexec を実行します:

```bash
msiexec /i "<full Broker MSI file path>" /qn TRANSFORMS=":I01" MSINEWINSTANCE="1" <parameters>
```

TRANSFORMS と MSINEWINSTANCE フラグはインストールのインスタンス ID を示します。Broker を追加インスタンスとしてインストールする場合は番号を変更してください（例: 同一マシンで 2 つ目のインストールを行う場合は `:I02` と `2` など）。

使用できるパラメータは次のとおりです:

- **INSTALLLOCATION** - インストールフォルダーを指定します。既定から変更する場合に使用します。フォルダーが存在しない場合は作成されます。このパラメータを省略すると既定のインストールフォルダーが使用されます（例: C:Program Files (x86)OpenLMOpenLM Broker）
- **OPENLMLOCATION** - Broker が接続する既定の OpenLM SLM を指定します。形式は PORT@IP（例: 5015@10.0.0.201）です。
- **BROKERXML** - Broker フォルダーにコピーして既定の設定ファイルとして使用する Broker.xml ファイルを指定します。

例: カスタムのインストールフォルダー、10.0.0.201@5015 の既定 OpenLM SLM 接続、Broker.xml のインポートを指定したサイレントインストールは次のとおりです:

```bash
msiexec /i "C:\Users\mariag\Desktop\OpenLM_Broker_22.3.30.1312.msi" /qn TRANSFORMS=":I01" MSINEWINSTANCE="1" USE_OPENLM_JAVA="true" /l*v "C:\Users\mariag\Desktop\log.txt"
```

3. インストールコマンドを入力したら **[Enter]** を押してインストールを開始します。コマンドプロンプトは次の行に進み、バックグラウンドでインストールが完了します。

4. コマンドプロンプトを閉じます。

サイレントインストールのため、追加のユーザー入力は不要です。既存インストールフォルダーに以前の OpenLM Broker バージョンが存在する場合は自動的にアップグレードされます。

## **OpenLM Broker を 2 インスタンス以上インストールする場合**

OpenLM Broker は 2 インスタンス以上インストールできます。この構成では次の要件があります:

- 追加の OpenLM Broker インスタンスは、それぞれ別の OpenLM SLM に接続するよう構成する必要があります。
- 追加の OpenLM Broker インスタンスは、本番の OpenLM Broker と同じライセンスサーバーマシンにインストールする必要があります。

以下の手順は、対象のライセンスサーバーに 1 つの Broker インスタンスが既にインストールされていることを前提としています。追加の OpenLM Broker インスタンスをインストールするには次の手順を使用します。

1. インストーラーファイルをダブルクリックしてインストールを開始します。ウィザードの Welcome 画面が表示されます。既存インストールが検出され、検出内容に応じた既定値が設定されます。古いインスタンスが検出されると既定で Upgrade Instance(s) が選択されます（**図 11**）。既存インスタンスがすべて最新の場合は、既定で Install New Instance が選択されます（**図 12**）。並列インストールでは Install New Instance を選択します。

**図 11: Upgrade Instance(s) が選択されたウィザード画面。**

![スクリーンショット: Installation of two or more OpenLM Broker instances](/img/legacy/word-image-31.png)

**図 12: OpenLM Broker ウィザードのセットアップ画面。**

2. **[Next]** をクリックして続行します。ライセンス契約画面が表示されます（**図 13**）。

![スクリーンショット 2: Installation of two or more OpenLM Broker instances](/img/legacy/word-image-32.png)

**図 13: ライセンス契約画面。**

3. **I Agree** ラジオボタンをクリックします（**図 14**）。ラジオボタンをクリックすると **[Next]** ボタンが有効になります。

![スクリーンショット 3: Installation of two or more OpenLM Broker instances](/img/legacy/word-image-33.png)

**図 14: I Agree を選択したライセンス契約画面。**

4. **[Next]** をクリックします。既定のインストールパスが表示された **Select Installation Folder** 画面が表示され、Broker フォルダー名に自動的に数字が追加されます（**図 15**）。

![スクリーンショット 4: Installation of two or more OpenLM Broker instances](/img/legacy/word-image-34.png)

**図 15: インストールパスが表示された Select Installation Folder 画面。**

5. *[任意]* **[Browse]** ボタンをクリックして別のインストールパスを選択します。既定パスを推奨します。

6. **[Next]** ボタンをクリックします。Confirm Installation 画面が表示されます（**図 16**）。

![スクリーンショット 5: Installation of two or more OpenLM Broker instances](/img/legacy/word-image-35.png)

**図 16: Confirm Installation 画面。**

7. **[Next]** をクリックしてインストールを続行します。インストール進行画面が表示されます（**図 17**）。インストール完了後、成功画面（**図 18**）が表示されます。

![スクリーンショット 6: Installation of two or more OpenLM Broker instances](/img/legacy/word-image-36.png)

**図 17: インストール進行画面。**

**![スクリーンショット 7: Installation of two or more OpenLM Broker instances](/img/legacy/word-image-37.png)**

**図 18: インストール成功画面。**

8. **[Close]** をクリックしてインストーラーを終了します。

9. Broker の追加インスタンスをインストールするには **Step #8** から **Step #9** を繰り返します。

並列インストールは完了です。

## **OpenLM Broker のアンインストール**

OpenLM Broker のアンインストールは、Windows のコントロールパネル（Option A）、OpenLM Broker Setup Wizard からの変更（Option B）、または Windows Shell でのサイレントアンインストールで実行できます。

### ***Option A: Windows コントロールパネルからアンインストール***

1. Windows コントロールパネルを開きます。

2. Programs の下にある **Uninstall a Program** をクリックします（**図 19**）。Programs and Features 画面が表示されます。

![スクリーンショット: Option A: Uninstall using Windows Control Panel](/img/legacy/word-image-38.png)

**図 19: Programs リンクがハイライトされた Windows コントロールパネル。**

3. 名前一覧から OpenLM Broker を探してクリックします（Name をクリックしてアルファベット順に並べ替え可能）。プログラムの操作オプションが一覧上部に表示されます（**図 20**）。

![スクリーンショット 2: Option A: Uninstall using Windows Control Panel](/img/legacy/word-image-39_1.png)

**図 20: オプションがハイライトされた Programs and Features 画面。**

4. **Uninstall** をクリックします。確認画面が表示されます（**図 21**）。

![スクリーンショット 3: Option A: Uninstall using Windows Control Panel](/img/legacy/word-image-40_1.png)

**図 21: アンインストール確認画面。**

5. **[Yes]** をクリックしてアンインストールを確定します。進行画面が表示されます（**図 22**）。進行画面は処理完了時に閉じます。

![スクリーンショット 4: Option A: Uninstall using Windows Control Panel](/img/legacy/word-image-41.png)

**図 22: OpenLM Agent のアンインストール進行画面。**

6. Programs and Features 画面は右上の **[x]** をクリックして閉じます。

これでコントロールパネルからのアンインストールは完了です。OpenLM Broker の設定ファイルは削除されず、再インストール時に以前の設定を保持するために残されています。必要であれば手動で削除してください。既定では C:Program Files (x86)OpenLMOpenLM Broker (#) にあります。

### ***Option B: OpenLM インストーラーパッケージからアンインストール***

1. インストーラーファイルを探してダブルクリックします。OpenLM Broker Setup Wizard 画面が表示されます（**図 23**）。既定では Install New Instance が選択されています。

![スクリーンショット: Option B: Uninstall using the OpenLM installer package](/img/legacy/word-image-42.png)

**図 23: OpenLM Broker Setup Wizard 画面。**

2. **Modify Instance(s)** チェックボックスをクリックして削除オプションを選択します（**図 24**）。

3. **[Next]** をクリックして Select Instance 画面へ進みます（図 25）。

![スクリーンショット 2: Option B: Uninstall using the OpenLM installer package](/img/legacy/word-image-43.png)

**図 24: Select Instance 画面。**

4. リストからインスタンスを選択します（1 つしかない場合は既にハイライトされています）。

5. **[Remove]** ボタンをクリックします。

6. 進行画面が表示されます。  
![スクリーンショット 3: Option B: Uninstall using the OpenLM installer package](/img/legacy/word-image-44.png)

**図 25: OpenLM Broker の削除進行画面。**

7. OpenLM Broker に関連するプロセスがまだ稼働中の場合は、関係するプロセス情報を含むエラー画面が表示されます。これらのプロセスは Windows Services で停止できます（例: C:WINDOWSsystem32services.msc を実行するか、タスクバーの Windows 検索で Services と入力して Services アプリを選択します）。停止後、**[Try Again]** をクリックして削除を続行します（図 27）。削除が完了すると、削除成功画面が表示されます（図 28）。

**![スクリーンショット 4: Option B: Uninstall using the OpenLM installer package](/img/legacy/word-image-45.png)**

**図 26: 削除成功画面。**

8. **[Close]** ボタンをクリックして Setup Wizard を終了します。

これで OpenLM Broker Installer ウィザードを使用した削除は完了です。OpenLM Broker の設定ファイルは削除されず、再インストール時に以前の設定を保持するために残されています。必要であれば手動で削除してください。既定では C:Program Files (x86)OpenLMOpenLM Broker (#) にあります。

### ***Option C: OpenLM Broker のサイレントアンインストール***

サイレントでアンインストールしたいシステム管理者は、以下の方法を使用できます。

1. 管理者権限でコマンドプロンプトを開きます（**図 28**）。コマンドプロンプトは管理者権限で実行する必要があります。起動方法は「B. OpenLM Broker のサイレントインストール」の該当セクションを参照してください。

![スクリーンショット: Option C: OpenLM Broker silent uninstallation](/img/legacy/word-image-46.png)

**図 28: 管理者権限で開いたコマンドプロンプト画面。**

2. コマンドプロンプトで、次の形式でアンインストール用パラメータを入力します:

```bash
msiexec /x "<msi installation file path>" /qn TRANSFORMS=":I##"
```

MSI ファイルパスは、インストール用にダウンロードした MSI ファイルの場所です。シンプルなアンインストール例は次のとおりです（アンインストール対象のインスタンス番号を示す TRANSFORMS パラメータ [:I##] を含みます）。

```bash
msiexec /x "C:\Users\mariag\Desktop\OpenLM_Broker_22.3.30.1312.msi" /qn TRANSFORMS=":I01"
```

3. アンインストールコマンドを入力したら **[Enter]** を押してアンインストールを開始します。コマンドプロンプトは次の行に進み、バックグラウンドでアンインストールが完了します。

4. 右上の **[x]** をクリックしてコマンドプロンプトを閉じます。

サイレントアンインストールのため、追加のユーザー入力は不要です。OpenLM Broker の設定ファイルは削除されず、再インストール時に以前の設定を保持するために残されています。必要であれば手動で削除してください。既定では C:Program FilesOpenLMOpenLM Broker (#) にあります。
