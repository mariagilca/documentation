---
title: Denials(拒否)レポート
description: FlexLM、DSLS、IBM-LUM、Reprise RLM などのライセンスマネージャーで満たされなかったライセンス需要を、EasyAdmin の Denials レポートで分析します。
sidebar_position: 4
---
OpenLM は FlexLM、DSLS、IBM-LUM、Reprise RLM など多くのライセンスマネージャーのライセンス使用状況を監視・最適化します。その一環として、ライセンスサーバーがアプリケーションのライセンス要求を拒否したイベント（ライセンス拒否）を報告するレポートも生成します。ライセンス拒否の件数は、ライセンス保守や追加ライセンス調達の計画における重要な指標です。

本ドキュメントでは、FlexLM、DSLS、IBM LUM、Reprise RLM 向けの拒否レポートを取得するための設定を説明します。

## Denials レポート

ライセンス拒否情報は OpenLM の EasyAdmin Web インターフェースで表示されます。**EasyAdmin Start → Reports → Denials** からアクセスできます。Denials レポートウィンドウには以下が含まれます:

- 拒否イベントの詳細（例: 拒否されたユーザー名とワークステーション、Time、License Server、Denied Feature、Vendor）
- 拒否理由（例: 利用可能ライセンス数の上限に達した、または [Options file の exclude リストにユーザーが含まれている](../../options-files/options-file-management-using-openlm-easyadmin-kb4007.md)）
- Features、Vendors、Users、Period、Servers などのカテゴリで拒否を表示するための Group by フィルタ
- 拒否イベントを表示するビュー: テーブルまたは各種チャート
- True Denials トグル。ライセンス要求が拒否された後でも、1) 同一ライセンスサーバーの別プールに同じフィーチャーのライセンスがある場合、または 2) 別のライセンスサーバーにライセンスがある場合、ユーザーが自動的にライセンスを受け取れることがあります。その場合でも拒否はログに記録されます。OpenLM はこのようなケースを除外し、ユーザーがライセンスを取得できなかったケースのみを抽出できます。これを "True" denials と呼びます。**注: 選択した期間中に Administration → Denials パネルで "Track True Denials only" がチェックされていた場合、このトグルは効果がありません。**
- レポートデータを CSV にエクスポートする機能
- レポートをリンクやメールで共有、またはスケジュール実行する機能（OpenLM Reports Scheduler が必要）
- レポートフィルタのプリセットを保存し、再利用できる機能

以下の画像は Autodesk のライセンスフィーチャーに対する Denials レポートの例です:

![拒否された Autodesk のライセンスフィーチャーの例を表示する EasyAdmin の Denials レポート。](/img/legacy/denials-report-autodesk-features.png)

## **ライセンス拒否を監視するための OpenLM の設定**

監視対象ライセンスの拒否レポートを生成するには、次の設定が必要です:

1. ライセンスサーバーマシンに OpenLM Broker をインストールします。次に、[OpenLM Broker 構成ガイド](../../openlm-broker/openlm-broker-configuration)の説明に従って OpenLM SLM に接続し、ローカルのライセンスサーバーを監視するように設定します。
2. 以下のいずれかのサブセクションに従って、OpenLM Broker がライセンス拒否情報を照会または抽出するように設定します。
3. **EasyAdmin Start → Widgets → License Servers** ウィンドウのマーカーが緑色で "Up to date" と表示されていることを確認します（以下は FlexLM の例です）:

![FlexLM ライセンスサーバーに緑色の Up to date マーカーが表示された EasyAdmin の License servers ウィジェット。](/img/legacy/license-servers-up-to-date-marker.png)

マーカーが黄色または赤色の場合は、5〜10 分待ってから "License servers" ウィンドウを更新してください。それでも赤色の場合は、ライセンスサーバーの設定と、**EasyAdmin → Start → Widgets → Alerts** ウィンドウのアラートを確認してください。

### FlexLM の場合

OpenLM Broker を FlexLM ライセンスサーバー監視用に設定すると、OpenLM はライセンス拒否の問い合わせも行います。さらに FlexLM Debug Log ファイルの設定が必要です:

1. 左側の構成パネルで 'Log Files' ノードをクリックします。
2. 緑色の 'Add Log File' ボタンをクリックします。
3. Type ドロップダウンから "FlexLM Debug Log File" を選択します。
4. "Name (Descriptive)" テキストボックスに識別しやすい名前を入力します。
5. 'Path' テキストボックスに FlexLM debug log ファイルのフルパスを設定します。
6. Vendor ドロップダウンで、このログファイルに対応するベンダーを選択します。
7. 'Apply' と "Restart Broker" をクリックして設定を確定します。

![ベンダー向けに FlexLM Debug Log File エントリを構成した OpenLM Broker の Log Files ノード。](/img/legacy/flexlm_debug_log_broker-configuration.png)

### DSLS の場合

OpenLM Broker は DSLS ライセンスサーバーの監視を自動検出・設定できます。これにはライセンス拒否の問い合わせも含まれます。**Commands → Denial** ノードをクリックして設定を確認してください。**Execute** ボタンで動作確認もできます。さらに、DSLS ログファイルを "Dassault Systemes" ベンダーで設定する必要があります。手順は [DSLS license manager の接続](../../interfacing-articles/dsls) を参照してください。

![DSLS のライセンス拒否監視構成を表示する OpenLM Broker の Commands Denial ノード。](/img/legacy/word-image-39.png)

### IBM-LUM の場合

OpenLM Broker は IBM-LUM ライセンスサーバーの監視を自動検出・設定できます。これにはライセンス拒否の問い合わせも含まれます。**Commands → Denial** ノードをクリックして設定を確認してください。**Execute** ボタンで動作確認もできます。詳細は [IBM LUM license manager の接続](../../interfacing-articles/ibm-lum) を参照してください。以下の画像も参考にしてください:

![IBM-LUM のライセンス拒否監視構成を表示する OpenLM Broker の Commands Denial ノード。](/img/legacy/word-image-40.png)

### Reprise RLM の場合

OpenLM Broker は [Reprise RLM license manager の接続](../../interfacing-articles/reprise-rlm) の手順に従って設定する必要があります。

![Reprise RLM 用の Broker ログ設定。](/img/legacy/broker-log-settings-for-reprise-rlm.png)

## **トラブルシューティング**

### FlexNet debug log に Denials が表示されない

アプリケーションの Options ファイルに NOLOG 行と DENIED フラグが含まれている場合、FlexLM debug log に Denial レポートが表示されないことがあります。この場合は、[options file を編集してこのフラグを除外](../../options-files/options-file-management-using-openlm-easyadmin-kb4007.md)し、ライセンスサーバーを再起動してください。
