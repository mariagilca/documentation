---
title: "ログ・アップローダー"
sidebar_position: 4
---
ログアップローダーは、FlexLM ライセンスマネージャーとの連携における「Manual」方式を指します。ライセンスマネージャーファイルは EasyAdmin ユーザーインターフェイスに手動でアップロードする必要があります。  
この手順を実行できる管理者ロールがあることを確認してください。

## 設定

1. EasyAdmin ユーザーインターフェイスを開きます:  
   - **Start → Administration → License Manager Servers → Add LM** に移動します。  
2. ライセンスマネージャーの詳細を設定します:  
   - **Unique Name**: ライセンスマネージャーを識別するための一意な名前を入力します。(1)  
   - **License File**: 指定された領域にライセンスファイルをドラッグ＆ドロップします。(2)  
3. ライセンスファイルを送信します:  
   - **Submit** をクリックします。(3)  
4. 接続設定を行います:  
   - **Port Number**: ライセンスマネージャーのポート番号を設定します。(4)  
   - **Time Zone**: ライセンスマネージャーのタイムゾーンを選択します。(5)  
5. **Save** をクリックして設定を完了します。  
   ![Add a new License Server window (manually)](/img/legacy/add-a-new-license-server-window-manually.png)

   ![図 1: 手動でのライセンスサーバー追加ウィンドウ](/img/legacy/word-image-85568-2.png)
6. 次にデバッグログをアップロードします。右上のクラウドアイコンをクリックします:

   ![Debug log upload icon](/img/legacy/debug-log-upload-icon.png)

   図 2: デバッグログのアップロードアイコン
7. デバッグログをドラッグ＆ドロップし、**Upload** をクリックします。

   ![Drag and drop the debug log prompt](/img/legacy/drag-and-drop-the-debug-log-prompt.png)

   図 3: デバッグログのドラッグ＆ドロップ画面
8. その後、ライセンスデータが License Activity などの OpenLM レポートに表示されます。

   ![License activity window](/img/legacy/license-activity-window.png)

   図 4: License Activity ウィンドウ
