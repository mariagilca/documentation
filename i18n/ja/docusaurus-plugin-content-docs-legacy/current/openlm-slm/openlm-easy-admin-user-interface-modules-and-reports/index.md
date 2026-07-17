---
title: EasyAdmin UI モジュールとレポート
description: "次の記事では、EasyAdmin User Interface のモジュールとレポートのスクリーンショットを、その機能に関する簡単な説明とともに紹介します。"
sidebar_position: 1
---
EasyAdmin ユーザーインターフェースのモジュールおよびレポートについて、スクリーンショットと簡単な説明を掲載します。

## EasyAdmin User Interface

EasyAdmin ユーザーインターフェースは、レポートとシステム構成のための OpenLM のメイン UI です。Mozilla Firefox、Microsoft Edge、Apple Safari、Google Chrome などの標準的なインターネットブラウザからアクセスできます。

## EasyAdmin User Interface Dashboard

Dashboard では、システムのステータス情報を一目で確認できます:

- ライセンスサーバーの状態
- 各ライセンスサーバーにおける OpenLM Broker の状態
- 日次/週次のライセンス使用状況に関する一般統計
- 複数ライセンスサーバーにまたがる重要フィーチャーの一目要約
- アラートのシステムメッセージ

Dashboard は Windows ライクな UI を備えており、標準ブラウザ上で Windows 風のアクセス/管理を行えます。

![ライセンスサーバー状態、Broker 状態、使用統計、アラートを一目で表示する EasyAdmin の Dashboard。](/img/legacy/word-image-26362-1-1.png)

## Widget Windows

### License Servers

License Servers ウィンドウは、通常最初に確認する場所です。監視対象のライセンスサーバーと、ライセンスサーバーマシンにインストールされた OpenLM Broker の状態を表示します。内容は次のとおりです:

License Server status:

- Green: 稼働中
- Yellow: ライセンスサーバー側の問題（例: Broker 停止、LM 停止、時刻差異エラー）
- Red: 停止中。ライセンスサーバーと通信できません。

ライセンス総数（該当するライセンス在庫テーブルへのリンク付き）

使用中ライセンス（該当する Currently Consumed Licenses テーブルへのリンク付き）

借用中ライセンス

使用率

Broker information and actions:

- ライセンスサーバーマシンからのファイル取り込み（例: License file、Options file）
- ライセンスファイルをライセンスサーバーマシンへアップロードし、再読み込みまたは再起動を実行
- Broker バージョンと関連する Java (JRE) バージョン
- License Server time

![監視対象サーバー、Broker 状態、ライセンス数を一覧表示する EasyAdmin の License servers ウィンドウ。](/img/legacy/word-image-26362-2-1.png)

### Host Availability

ホスト可用性の図は、時間経過に伴うサーバーのアクティビティを示します。

![ライセンスサーバーの稼働状況を時系列で示す EasyAdmin の Host availability 図。](/img/legacy/word-image-26362-3-1.png)

### General Statistics

このウィンドウでは、ユーザーアクティビティとライセンス使用効率の一般統計概要を表示します。

![ユーザー活動とライセンス利用効率の概要を示す EasyAdmin の General statistics ウィンドウ。](/img/legacy/word-image-26362-4-1.png)

### Alerts

[OpenLM Alerts モジュール](../../openlm-slm-features/openlm-alerts-configuration.md)は、ライセンスシステムの安定性を確保するために設計されています。システム管理者がアラート条件と、条件を満たした際に実行されるアクションを定義できます。EasyAdmin の Alerts ウィンドウにアラートメッセージを表示するほか、ログファイルにも記録できます。事前定義したメールまたは SMS アカウントへの通知も可能です。

![ライセンスシステムのアラートメッセージを一覧表示する EasyAdmin の Alerts ウィンドウ。](/img/legacy/word-image-26362-5-1.png)

### Recent Features Denials

このウィンドウでは、フィーチャー別のライセンス拒否に関する予備統計を表示します。長期/短期の拒否リクエスト数が確認できます。

![フィーチャーごとの長期・短期の拒否要求数を表示する EasyAdmin の Recent feature denials ウィジェット。](/img/legacy/word-image-26362-6-1.png)

### Feature Usage Status

このウィンドウでは、使用中ライセンス数、借用中ライセンス数、使用率を簡単に確認できます。フィルターを使ってフィーチャーを追加できます。

![使用中ライセンス数、借用数、使用率を表示する EasyAdmin の Feature usage status ウィンドウ。](/img/legacy/word-image-26362-7-1.png)

## オプション

### Currently Consumed Licenses

名前のとおり、Currently Consumed Licenses ウィンドウはライセンスプールからチェックアウトされているライセンスを **リアルタイム** で表示します。

多くのライセンス管理ツールがこのようなリアルタイム情報を提供しない点に注意してください。

![プールからチェックアウトされたライセンスをリアルタイムに表示する EasyAdmin の Currently consumed licenses ウィンドウ。](/img/legacy/word-image-26362-8-1.png)

さらに、Currently Consumed Licenses ウィンドウには次のような機能があります:

1. ライセンスマネージャーが、実際にはアイドルでリソースを浪費しているライセンスを占有として表示する場合があります。

三日月アイコン ![三日月アイコン。](/img/legacy/word-image-26362-9-1.jpeg) をクリックすると、実行中セッション内のアクティブ/アイドル期間を表示できます。

![実行中セッションのアクティブ期間とアイドル期間を表示する EasyAdmin の Currently consumed licenses ビュー。](/img/legacy/word-image-26362-10-1.png)

2. Currently Consumed Licenses ウィンドウは、必要に応じて権限のあるシステム管理者がユーザーからライセンスを回収するためのインターフェースでもあります。

これらの重要な機能の詳細は、[こちらのドキュメント](../../openlm-slm-features/license-harvesting/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a.md) を参照してください。

### Released Licenses

Released Licenses ウィンドウはライセンスの返却（チェックイン）をレポートします。この機能は、ESRI Desktop ArcGIS や Autodesk などの対応拡張があるアプリケーション、または OpenLM の Applications Manager 拡張でルールを設定した場合にのみ該当します。

![ライセンスのチェックインを報告する EasyAdmin の Released licenses ウィンドウ。](/img/legacy/word-image-26362-11-1.png)

## Management

### Licenses

Licenses ウィンドウは利用可能なライセンスを一覧表示し、組織の資産を容易に管理できます。高度なスライディングフィルターにより、長いリストでも簡単に絞り込みが可能です。

OpenLM EasyAdmin User Interface は FlexNet パッケージ（Autodesk の AutoCAD などで使用）などの高度な機能をサポートします。ライセンスパッケージはボックス形式で表示されます。

![スライドフィルターと枠付きの FlexNet パッケージを備え利用可能なライセンスを一覧表示する EasyAdmin の Licenses ウィンドウ。](/img/legacy/word-image-26362-12-1.png)

### Licenses Not in Use

一定期間使用されていないライセンスを抽出します。

![一定期間使用されていないライセンスを表示する EasyAdmin の Licenses not in use ウィンドウ。](/img/legacy/word-image-26362-13-1.png)

### License Utilization

このチャートはライセンス利用効率を示します。各列の "x" は「少なくとも x 本のライセンスが使用されていた時間の割合はどれくらいか？」を示します。この表示形式は一時的なピークを無視し、実際のライセンス消費パターンを分かりやすく表現します。組織に必要な実ライセンス数を明確に把握できます。

Quality of Service の線は、一定割合のライセンス要求を満たすために必要なライセンス数を示します。次の例では、12 本中 7 本のライセンスで 96% の要求を満たせることを示しています:

![必要ライセンス数を示す Quality of Service ラインを備えた EasyAdmin の License utilization 効率チャート。](/img/legacy/word-image-26362-14-1.png)

この重要なレポートの詳細は、[こちらのドキュメント](../../openlm-slm-features/license-utilization-efficiency-kb4063.md) を参照してください。

### License Procurement

このウィンドウは OpenLM データベースにあるすべてのライセンス情報を一覧表示します。

組織のソフトウェア資産の棚卸しに役立ちます。表示内容には次が含まれます:

- ライセンスパッケージの内容
- フィーチャー属性（例: フィーチャー名、製品名、ベンダー）
- ライセンス属性（例: 数量、開始日、発行日、有効期限）。有効期限が近いライセンスは赤で表示。
- FlexLM ライセンスファイル情報（例: ベンダー情報、アセット情報、Vendor String）

![フィーチャーと有効期限の詳細を含むライセンス在庫を一覧表示する EasyAdmin の License procurement ウィンドウ。](/img/legacy/word-image-26362-15-1.png)

### Audit Report

Audit Report は、環境内の OpenLM 展開状況をまとめた PDF ドキュメントです。ベンダーデーモン、ライセンスサービス、インストール済みの OpenLM コンポーネント、過去 3 か月に監視されたユニークユーザー数などが含まれます。監査レポート内にフィーチャー/製品名の対応一覧を含めるかどうかを選択できます。

メンテナンス更新時に新しいライセンスファイルを作成するため、監査レポートが必要です。

![OpenLM の導入状況の PDF を生成する EasyAdmin の Audit report ウィンドウ。](/img/legacy/word-image-26362-16-1.png)

### Active Users Report

![EasyAdmin の Active users レポートウィンドウ。](/img/legacy/word-image-26362-17-1.png)

### Projects

![EasyAdmin の Projects 管理ウィンドウ。](/img/legacy/word-image-26362-18-1.png)

## Reports

### Project Usage

OpenLM は、ユーザーをグループやプロジェクト単位で管理し、それらの合計使用時間を容易に取得できます。

これは手動で行うことも、OpenLM データベースを組織の Active Directory と同期することでも実現できます。この機能は、ライセンス使用状況に基づくチャージバック（利用料金配分）ポリシーの実装に使われることが多いです。

プロジェクトレポートは、エンドユーザーから報告されたアクティブプロジェクトに基づくライセンス使用時間を表示します。

![アクティブなプロジェクト別のライセンス使用時間を表示する EasyAdmin の Project usage レポート。](/img/legacy/word-image-26362-19-1.png)

### Group Usage

Group レポートにより、管理者はグループ別のライセンス使用統計を取得できます。

![グループ別のライセンス使用統計を表示する EasyAdmin の Group usage レポート。](/img/legacy/word-image-26362-20-1.png)

### License Usage

License Usage レポートでは、実際のライセンス使用量と利用可能ライセンス数を比較できます。

スマートフィルターにより、ライセンスのカスタム一覧を作成し、合計使用量を確認できます。

表示ペインのタブにより、このレポートは表、チャート、ヒートマップの 3 形式で表示できます。

![表で表示する EasyAdmin の License usage レポート。](/img/legacy/word-image-26362-21-1.png) ![チャートで表示する EasyAdmin の License usage レポート。](/img/legacy/word-image-26362-22-1.png) ![ヒートマップ図で表示する EasyAdmin の License usage レポート。](/img/legacy/word-image-26362-23-1.png)

"License usage" ウィンドウのフィルターには、次のような独自機能があります:

- 使用期間は設定可能です。あらかじめ定義された期間（例: 過去 30 日）と、開始〜終了の期間指定を選択できます。
- チャート表示では、チャート下部のズームドラッグボタンで期間を拡大できます。
- "Aggregated usage" チェックボックスで、期間（時間/日/週）ごとの最大使用量を表示するか、ライセンスマネージャーが報告した実使用発生を表示するかを切り替えます。

### License Activity

License Activity ウィンドウは、監視対象ライセンスを消費したすべてのアプリケーションセッションを表示します。

既定では終了済みセッション（開始時刻と終了時刻のあるセッション）のみ表示しますが、現在アクティブなセッションを表示するよう構成することも可能です。

License Activity ウィンドウは強力なツールであり、システム管理者やライセンス管理者が詳細なレポートを作成し、個別ユーザーのライセンスアクティビティを追跡できます。

このウィンドウの "Group by" タブでは、Server、Vendor、Workstations、Features、Users、Groups、Projects などの条件でライセンス統計レポートを生成できます。

![ライセンスを消費したアプリケーションセッションを一覧表示し Group by タブを備えた EasyAdmin の License activity ウィンドウ。](/img/legacy/word-image-26362-24-1.png)

### License Allocation

License Allocation 画面では、ライセンスが誰に割り当てられているかを確認できます。使用統計の確認も可能です。  
**Filters**: フィルターで必要な割り当て条件とユーザーを選択し、"Apply" をクリックして結果を表示します。

**Table**: レポート結果はテーブル表示されます。

![フィルターとユーザーに割り当てられたライセンスの表がある EasyAdmin の License allocation 画面。](/img/legacy/word-image-26362-25-1.png)

### Named License Analysis (NNU)

Named License Analysis (NNU) レポートは、FlexLM のネームドライセンスの割り当てと消費状況を概要として提供します。

このレポートは、組織におけるネームドライセンスの実利用を把握できるため、ライセンス計画やコスト削減に役立ちます。結果を分析して、NNU ライセンスへのユーザー割り当ての追加、フローティングライセンスの負荷削減、追加ライセンス購入の判断を行えます。

このレポートの詳細は [該当ドキュメント](./named-license-analysis-nnu-report.md) を参照してください。

![FlexLM ネームドライセンスの割り当てと消費を表示する EasyAdmin の Named License Analysis (NNU) レポート。](/img/legacy/word-image-26362-26-1.png)

### Denials

これは過去のライセンス拒否の発生状況を示すレポートです。FlexLM、DSLS、IBM-LUM などの拒否機能を持つライセンスサーバーでのみ利用できます。ライセンスサーバーマシンで OpenLM Broker を使用する必要があります。[詳細はこちら](./license-denials-reporting.md)。Denials レポートウィンドウについての注意点は以下です:

- 情報は時間、ユーザー、プロジェクト、グループ、ワークステーション、拒否タイプ、ベンダー名、ライセンスサーバー、ライセンスタイプ（例: Floating、Node-locked）、"additional key"（例: FlexLM asset info）などの条件で切り分けできます。
- 円グラフ、折れ線グラフ、テーブルとして表示できます。
- フィルターには "True denials" チェックボックスがあります。このオプションは、ライセンスマネージャーによる無関係な拒否報告を除外します。無関係な報告の例:
  - 特定ユーザーが短時間に複数回リクエストしたケース
  - あるサーバーで拒否されたが別のサーバーでは許可されたリクエスト

![過去のライセンス拒否発生を円グラフで表示する EasyAdmin の Denials レポート。](/img/legacy/word-image-26362-27-1.png)

![過去のライセンス拒否発生を折れ線グラフで表示する EasyAdmin の Denials レポート。](/img/legacy/word-image-26362-28-1.png)

![過去のライセンス拒否発生を表で表示する EasyAdmin の Denials レポート。](/img/legacy/word-image-26362-29-1.png)

### Feature usage per group

このウィンドウは、選択したフィーチャーの使用時間（時間単位）を、選択したユーザーグループまたはすべての有効グループごとに積み上げ縦棒グラフで表示します。バーにホバーすると、各セクションの明確な使用情報を確認できます。

![使用時間を積み上げ縦棒グラフで示す EasyAdmin の Feature usage per group レポート。](/img/legacy/word-image-26362-30-1.png)

### Feature usage per user

このウィンドウは、選択したフィーチャーの使用時間（時間単位）を、選択したユーザーまたはすべての有効ユーザーごとに積み上げ縦棒グラフで表示します。バーにホバーすると、各セクションの明確な使用情報を確認できます。

![使用時間を積み上げ縦棒グラフで示す EasyAdmin の Feature usage per user レポート。](/img/legacy/word-image-26362-31-1.png)

### TokenFlex

Token Flex は Autodesk のクラウドベースの従量課金ライセンスモデルです。顧客は一定数のトークン（"token pool"）を購入し、ユーザーが特定の製品ファミリーの製品を一定時間（通常は 24 時間単位）使用するたびにトークンで支払います。

このウィンドウでは TekenFlex に関する 3 つのレポートを表示します:

- **TokenFlex Usage**

このレポートは、特定の製品ファミリーで消費されたトークン数と合計消費時間を表示します。表とチャートの 2 種類の表示が利用できます。ベンダー側の計算仕様により、レポートは 48 時間遅延で表示される点に注意してください。また、Token Usage レポートはユーザー別にデータをグルーピングでき、特定ユーザーが消費したトークン数を確認できます。

- **Double Token Consumption**  
  このレポートは、同一ユーザーが同じ製品ファミリーに対して 1 営業日内に二重課金されている可能性のあるケースを示します。
- **Released Idle Licenses**  
  このレポートは、同一ユーザーが同じ製品ファミリーに対して 1 営業日内に二重課金されている可能性のあるケースを示します。

## EasyAdmin User Interface - Administration

設定画面ではユーザーが好みの設定を行えます。稼働時間の設定は、すべてのシステムユーザーに表示される統計情報の計算に影響します。

![システム設定と稼働時間を設定する EasyAdmin の Administration 設定画面。](/img/legacy/word-image-26362-32-1.png)

## User settings

"User" ウィンドウで設定した内容は、ユーザーに表示される情報の形式に影響します。

![ユーザーへの情報の表示方法を設定する EasyAdmin の User settings ウィンドウ。](/img/legacy/word-image-26362-33-1.png)

Groups ウィンドウ

![EasyAdmin の Groups ウィンドウ。](/img/legacy/word-image-26362-34-1.png)

## Users and permissions - Workstations window

Workstations ウィンドウは、ライセンスへアクセスするワークステーションを管理するために必要な情報を提供します。

これには次が含まれます:

- Hostname
- Agent バージョン（該当する場合）
- Online（ワークステーションがオンライン/オフラインか）
- Idle time（ユーザーのアイドル時間）
- Controlled（対応システムの場合）

![ホスト名、エージェントバージョン、オンライン状態、アイドル時間を一覧表示する EasyAdmin の Workstations ウィンドウ。](/img/legacy/word-image-26362-35-1.png)
