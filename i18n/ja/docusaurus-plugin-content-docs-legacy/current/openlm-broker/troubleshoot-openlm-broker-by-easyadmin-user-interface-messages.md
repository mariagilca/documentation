---
title: "EasyAdmin UIメッセージによるOpenLM Brokerのトラブルシューティング"
description: "OpenLM の EasyAdmin ユーザーインターフェイスで「License Servers」ウィジェットを開くと、ステータスメッセージが表示されます。"
sidebar_position: 7
---
OpenLM の EasyAdmin ユーザーインターフェイスで "License Servers" ウィジェットを開くと、ステータスメッセージが表示されます:

![Description of each possible Broker error](/img/legacy/description-of-each-possible-broker-error-2.png)

### 各シナリオのトラブルシューティング

**BROKER DOWN:** 過去に OpenLM Broker が接続していたが、現在はライセンスサーバーマシンと OpenLM SLM への接続がない状態です。

- "OpenLM Broker" サービスは稼働していますか？Windows Services で確認してください。
- ホスト名または IP は変更されていますか？OpenLM SLM 設定ツール内の Broker IP/ホスト名は、EasyAdmin に表示されるものと同一である必要があります。
- ネットワークの問題はありませんか？
- Broker インターフェイスで **Check Connectivity to OpenLM SLM** をクリックしてください。
- telnet で接続できるか確認してください。

**UNKNOWN**: 接続は確立しているが、受信データを識別できない状態です。

- 新規設定の場合は正常なメッセージです。約 3 分で更新されるはずです。
- OpenLM SLM 設定ツールと OpenLM Broker 設定ツールで同じ License Manager タイプが設定されていますか？
- Broker がライセンスマネージャーを正しく照会できていますか？確認方法:
- 設定ツールで **Port → Commands → status** を選択し、**Execute** をクリックします。結果は正常ですか？
- 設定ツールで **Port → Commands → status** を選択し、**Execute** をクリックします。結果は正常ですか？
- 上記コマンドが動作しない場合は、ライセンスマネージャーの実行ファイルのパスが正しく設定されているか確認してください。対象ポートの Commands ノードをクリック → "**...**" ボタンで "*Update path for commands*" を開く → 実行ファイルの場所（通常は Program Files）を選択 → **Open** → **Update**。
- **Port → Commands → data_inquiry** のコマンドラインパスは正しく設定されていますか？**status** と **data_inquiry** を再実行してください。
- ライセンスマネージャーをアップグレードしましたか？アップグレード時にパスが変更されることが多いです。上記 C の手順を参照してください。
- 新しいライセンスファイルをインストールしましたか？Broker が **Port → Advanced** で新しいライセンスファイルを参照しているか確認してください。

**LM DOWN -** Broker は稼働していますが、ライセンスマネージャーが現在オフラインです。ライセンスマネージャーの状態を確認し、必要に応じて開始または再起動してください。

**NO BROKER -** Broker がデータ送信するはずですが、まだ OpenLM SLM と通信していません。新規インストール直後や大幅なアップグレード後に発生することがあります。

**REMOTE SAMPLING -** この構成には Broker がありません。代わりに Server がライセンスマネージャー (LM) を直接照会します。

**DATA ERROR -** Broker は OpenLM SLM にデータを送信していますが、データ自体に問題があるようです。OpenLM SLM がデータを解析できません。

**CLUSTER_ERROR -** 主に FLEXlm で見られるエラーで、クラスターまたはトライアド内の複数サーバーが誤って自分をマスターと認識している場合に発生します。

**NOT CONFIGURED -** Broker は存在しますが、ポート関連データを報告していません。

**BROKER SYNC -** Broker と Server の接続が長期間切断されていたため、Broker がダウン中に蓄積した過去データを報告しています。

**TIME DIFF ERROR -** EasyAdmin の LM 設定が誤っているか、LM または Broker の時間設定に問題があります。多くの場合、サマータイム調整が原因です。

**UP (initializing...) -** 起動処理に起因するデータギャップです。

### その他の確認事項

1. 使用している [バージョン](https://www.openlm.jp/downloads/) は何ですか？最新の Broker バージョンの使用を推奨します（Broker.xml をバックアップしてアップグレード）。
2. 最新版へアップグレード後に突然動作しなくなった場合、broker.xml が破損している可能性があります。一度アンインストールし、痕跡ファイルを削除してクリーンインストールした後、バックアップした XML を戻してください。
3. RMS を使用している場合、パスは lsmon.exe/lservnt.exe を指していますか？環境に存在しますか？存在しない場合は [support@openlm.com](mailto:support@openlm.com) に連絡してください。
4. Broker 設定ツールでライセンスパスを正しく設定しているにもかかわらず "license file is missing" が出る場合、未対応ライセンスファイルが原因の可能性があります。Broker 設定ツールの "Watch license file" と EasyAdmin 設定の "Read License File" を無効化し、Windows Services で Broker Service と OpenLM SLM サービスを再起動してください。  
   ![スクリーンショット: Other things to check:](/img/legacy/Screenshot-2023-10-03-at-16.44.11.png)  
   ![スクリーンショット 2: Other things to check:](/img/legacy/word-image-42321-3-1.png)
5. Broker ステータスの問題がある場合は、Alert Window に表示されるエラーメッセージも確認してください。![スクリーンショット 3: Other things to check:](/img/legacy/word-image-42321-4-1.png)
6. 最新の FlexLM は lmutil.exe をサポートしない場合があります。Broker に同梱されている lmutil.exe を使用してください。![スクリーンショット 4: Other things to check:](/img/legacy/word-image-42321-5-1.png)
7. Broker Configuration Tool は Windows ログオンアカウントの権限で動作しますが、Broker Service はローカルシステムアカウントで動作します。ライセンスマネージャーによっては、ローカルシステムアカウントで data_inquiry コマンドを実行すると権限問題が発生する場合があります。この場合、Service アカウントを Windows ログオンアカウントに変更することを推奨します。
8. "Empty Feature List" エラーは、ストリーミングデータに機能情報が含まれていない場合に発生します。Applications Manager を設定している場合は、Applications Manager ウィンドウで機能を追加しているか確認してください。![スクリーンショット 5: Other things to check:](/img/legacy/word-image-42321-6-1.png)
9. DSLS の場合、date_format は空欄、locale は en_US に設定してください。うまくいかない場合は、ライセンスマネージャーに合わせて正しい date_format と locale を確認してください。
10. DSLS のベンダー名は "Dassault Systèmes" と記載する必要があります。誤った名前を使用すると、ライセンス出力およびログ解析が正しく行われません。
