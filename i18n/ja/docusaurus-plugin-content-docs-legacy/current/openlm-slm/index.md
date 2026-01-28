---
title: "OpenLM Server インストールガイド"
sidebar_position: 1
---
**重要:** 製品名は OpenLM Server から OpenLM SLM (Software License Management) に変更されました。ドキュメントおよび Web サイトはこの変更を反映していますが、設定項目やユーザーインターフェース (UI) は今後のリリースで順次反映されます。ご理解ください。

本ドキュメントでは、組織で OpenLM SLM をインストールするための手順を説明します。インストールプロセスを理解することで、OpenLM の適切な設定、ライセンス有効化に必要な初期手順の実施、OpenLM SLM インストーラが提示するオプションの理解が可能になります。

## **OpenLM SLM のインストール**

OpenLM SLM をインストールする前に、[推奨システム要件](https://www.openlm.jp/openlm-system-requirements/)を満たしていることを確認してください。OpenLM は Windows および Unix / Linux 環境を監視でき、OpenLM SLM コンポーネントは [Linux マシン](../openlm-identity-service/openlm-slm-and-identity-service-installation-on-linux.md)にもインストールできます。

Windows に OpenLM SLM をインストールする手順:

1. [Downloads](https://www.openlm.jp/downloads/) ページから最新の OpenLM SLM インストーラ（例: **OpenLM_Server_2x.#.##.##.msi**）を入手します。
2. ダウンロード完了後、インストーラファイルをダブルクリックしてインストールを開始します。
3. Windows のユーザーアカウント制御により "Do you want to allow the following software to make changes to your computer?" と表示される場合は、"**Yes**" をクリックして続行します。インストーラが開始されると次の画面が表示されます。  
   ![](/img/legacy/word-image-63206-1.png)

   チェックボックスの説明:
   - **"Allow OpenLM to send updates and news emails"** を選択すると、OpenLM のニュース、更新情報、サポートウェビナー（週 1 回程度）を受け取れます。メールは後で表示される "Activation" 画面で入力したアドレスに送信されます。
   - **"I agree to the license terms and conditions"** はインストールを続行するために必要です。エンドユーザーライセンス契約 (EULA) の条件を確認し、同意してください。EULA には本ソフトウェアの使用条件が記載されています。条件に同意することで、法的かつ適切に使用することを確認したことになります。**Next** をクリックして続行します。
4. データベースオプションを選択します:  
   a. 組み込み MariaDB をインストール（評価目的のみ）:  
      ![](/img/legacy/word-image-63206-2.png)

      組み込み MariaDB を選択した場合、データベース関連の追加手順は不要です。  
      それ以外の場合は、接続文字列パラメータを入力する必要があります（手順 6）。  
   b. 既存のデータベース接続を使用:  
      ![](/img/legacy/word-image-63206-3.png)

      (*既存のデータベース接続を指定する場合、インストール途中で接続文字列の詳細（手順 6）の入力が必要になります。*)  
      ![](/img/legacy/word-image-63206-4.png)

   "Destination Folder" 画面では、OpenLM SLM の既定インストール先ディレクトリを変更できます。"Browse" をクリックして新しい場所を選択できます。既定の場所のままにすることを推奨します。
5. インストール先ディレクトリを選択したら、"**Next**" と "**Install**" をクリックして処理を開始します。  
   ![](/img/legacy/word-image-63206-5.png)
6. データベースを使用する設定を選択した場合、次のプロンプトが表示されます:  
   ****注: スクリーンショットの例ではなく、実際の環境の DB 設定を入力してください。この手順はシステムを正しく動作させるために重要です。****  
   ![](/img/legacy/word-image-63206-6.png)

### 手順:

1. DB タイプを選択します。
2. 接続文字列パラメータ（Server name、DB name、User ID、password）を入力します。
3. 接続をテストし、成功したら "**Approve**" をクリックします。
4. データベース設定とインストールが完了したら "**Finish**" をクリックします。  
   ![](/img/legacy/word-image-63206-7.png)

### **登録ページ**

1. 登録ページが自動的に開き、Sales 部門にフォームを送信してトライアルライセンスを取得できます。デスクトップにはショートカットも作成されます。  
   ![](/img/legacy/word-image-63206-8.png)  
   ![](/img/legacy/word-image-63206-9.png)
2. 必須項目（Company Name、First and Last Name、Email）を入力し、**"Contact"** をクリックして詳細情報とライセンスファイルを受け取ります。
3. 次のステップはライセンスファイルのダウンロードです。
4. C: Program FilesOpenLMOpenLM SLM license に移動し、ダウンロードしたライセンスをこのフォルダに保存します。
5. OpenLM SLM サービスを再起動します:  
   ![](/img/legacy/word-image-63206-10.png)
6. デスクトップのショートカットから EasyAdmin User Interface にアクセスします。

## **既存の OpenLM SLM インストールのアップグレード**

既存の OpenLM SLM をアップグレードする手順は次のとおりです:

### アップグレードの準備

1. Windows Services に移動し、OpenLM Server Service を見つけて **Stop the service** をクリックします。  
   ![](/img/legacy/word-image-63206-11.png)
2. OpenLM SLM データベースをバックアップします。

### アップグレード

1. [Downloads](https://www.openlm.com/download/) ページから最新の OpenLM SLM インストーラ（例: **OpenLM_Server_2x.#.##.##.msi**）を入手します。
2. ダブルクリックしてインストールウィザードを起動します。ウェルカムメッセージが表示されたら **Next:** をクリックします。  
   ![](/img/legacy/word-image-63206-12.png)
3. 次のプロンプトでエンドユーザーライセンス契約の確認と同意が求められます。Accepting the End User License Agreement のチェックボックスをオンにします。
4. アップグレード前に EULA の条件を確認して同意してください。EULA には本ソフトウェアの使用条件が記載されています。条件に同意することで、法的かつ適切に使用することを確認したことになります。**Next** をクリックして続行します。  
   ![](/img/legacy/word-image-63206-13.png)
5. 既存の SLM が検出され、アップグレードが求められます。**Install** ボタンをクリックしてアップグレードを開始します。  
   ![](/img/legacy/word-image-63206-14.png)
6. インストールには約 1 分かかります。  
   ![](/img/legacy/gif.gif)
7. **Finish** をクリックします。アップグレードは完了です。  
   **![](/img/legacy/word-image-63206-16.png)**

### データベースの手動アップグレード

1. Windows Search で OpenLM Server Post install tool を探して開きます。
2. データベース接続情報を入力し、**Test connection** をクリックします。成功したら **OK**、次に **Approve** をクリックします。  
   注: スクリーンショットの例ではなく、実際の環境の DB 設定を入力してください。この手順はシステムを正しく動作させるために重要です。  
   ![](/img/legacy/word-image-63206-17.png)
3. EasyAdmin の背景画面で、OpenLM ロゴ横のバージョンにカーソルを合わせ、OpenLM SLM とデータベースのバージョンが一致していることを確認します。  
   ![](/img/legacy/image.png)

以上です。

## **Repair Mode**

ソフトウェアまたはハードウェアの不具合により OpenLM SLM が破損または停止した場合、Repair で復旧できます。

手順:

1. インストーラの実行ファイルをダブルクリックします。
2. Control Panel → Programs and Features → "OpenLM SLM" を選択 → "Uninstall/Change" をクリックします。\  
   ![](/img/legacy/word-image-63206-18.png)
3. "Repair OpenLM" を選択し、"**Next**" をクリックします。
4. Repair が完了したら "Finish" をクリックして終了します。その後 EasyAdmin User Interface にアクセスするか、ウィンドウ **[X]** を閉じて終了します。  
   ![](/img/legacy/word-image-63206-19.png)

## **アンインストール**

OpenLM SLM をアンインストールするには、次のいずれかの方法を使用します:

1. インストーラ実行ファイルをダブルクリックします。
2. Control Panel -> Programs and Features -> "OpenLM SLM" を選択 -> "Uninstall" をクリックします。
3. "Uninstall OpenLM" を選択し、"**Next**" をクリックします。
4. 最終確認ダイアログが表示されます。続行する場合は "Uninstall" をクリックします。
5. アンインストーラ完了後に表示される画面で "**Close**" をクリックして手順を完了します。

アンインストーラは複数のユーザーファイルとフォルダを残します（既定では **C: Program FilesOpenLM**）。これらにはライセンス、ログ、データベースファイルが含まれます。完全に削除するには手動で削除する必要があります。
