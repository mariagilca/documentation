---
title: "OpenLM EasyAdmin ユーザーインターフェース"
sidebar_position: 3
---
## 概要

OpenLM EasyAdmin User Interface は、OpenLM の主要な管理インターフェースで、レポートとシステム設定を行います。Mozilla Firefox、Microsoft Edge、Google Chrome などの最新ブラウザからアクセスできます。

![](/img/legacy/word-image-26360-2.png)

## 起動

EasyAdmin User Interface は OpenLM SLM のインストールに含まれており、通常はアクセスのための変更は不要です。次の方法で起動できます:

- Windows の '**Start**' → "**All Programs**" → **OpenLM** → "**OpenLM EasyAdmin User Interface**" をクリックする
- Web ブラウザの URL 欄に EasyAdmin の URL を入力する: [http://localhost:5015/](https://fqdn:5015/)
- 別のマシンから EasyAdmin User Interface にアクセスするには、'localhost' を OpenLM SLM のホスト名または IP に置き換えます。
- EasyAdmin には軽量 Web サーバーの Kestrel が同梱されています。EasyAdmin User Interface に接続する既定ポートは 5015 です。

## EasyAdmin User Interface ウィンドウの共通プロパティ

EasyAdmin のレポート/管理ウィンドウには、共通のプロパティがあります:

## OpenLM アイコンのプロパティ

ウィンドウ左上の OpenLM アイコンを左クリックすると、表示に関するプロパティが表示されます。

![](/img/legacy/word-image-26360-3.png)

ほとんどの項目は自明です。'Properties' オプションでは、EasyAdmin User Interface の起動時に開くウィンドウと、その更新間隔を設定できます。

## フィルター

ほとんどのウィンドウにはフィルターペインがあり、通常はウィンドウの左側にあります。

- フィルターの位置（Left、Right、Down、Up）は歯車アイコンから設定できます。
- フィルターフィールドは、EasyAdmin が OpenLM SLM に送信するクエリ条件を指定します。
- レポート結果を取得するには、まずフィルターフィールドを入力してから 'Apply' ボタンをクリックします。
- 特定のフィールドを空欄のままにすると、すべての候補が対象になります。例: 監視対象のライセンスサーバー名を選択しない場合、すべてのライセンスサーバーに対してクエリが実行されます。
- 一部のフィルター設定は左下の漏斗アイコンで保存/再読み込みできます。これらのフィルターは、ログイン中の EasyAdmin ユーザーごとにブラウザのキャッシュに保存されます。
- 一部のフィルター設定は左下の 'Share' アイコンから共有できます。

## 表示エリア

![](/img/legacy/word-image-26360-4.png)

- 一部のウィンドウには複数の表示エリアがあり、タブで区別されます。例: Table と "Group by" 表示。
- 列の表示は列ヘッダーをクリックして 'Columns' を選択すると制御できます。
- 列の並び替えやソート順も設定できます。
- 一部のウィンドウでは内容を CSV ファイル、PNG 画像としてダウンロードしたり、印刷したりできます。

## レポートの共有

Share ボタンを使うと、EasyAdmin User Interface のユーザーがワンクリックでビュー（レポート）を共有できます。

- どのレポートでも "Share" ボタンをクリックし、リンク、メール、またはスケジュール（OpenLM Report Scheduler が必要）を選択します。
- 同じ表示内容を共有したい EasyAdmin ユーザーにリンクを送ります。

![](/img/legacy/word-image-26360-5.png)

この機能はほとんどすべてのフィルターに対応しており、定期メールレポートや常時更新のレポートページなどの運用が可能です。

## レポートのスケジュール

スケジュールレポートを作成するには、OpenLM 管理者が次を行います:

- EasyAdmin User Interface のメール送信設定を行う
- 特定の EasyAdmin User Interface レポート（例: License Usage ウィンドウ）を設定する
- レポートを特定のユーザーに割り当て、必要に応じて追加受信者を設定する
- スケジュール実行のタイミングを設定する

以上です。OpenLM EasyAdmin のスケジュールレポートは、あらかじめ設定した時間に指定された受信者へ送信されます。詳しくは以下を参照してください:

[EasyAdmin Reports Scheduler](../openlm-reports-scheduler/openlm-reports-scheduler-configuration.md)

## ダッシュボード

ダッシュボードは、全体のシステム状況をひと目で表示します:

- License Servers のステータス。
- 各ライセンスサーバー上の OpenLM Broker のステータス。
- 監視対象アプリケーションの "Top 10" 統計。

![Dashboard](/img/legacy/dashboard.png)

## ウィジェット

EasyAdmin の 'Start' → 'Widgets' メニューをクリックします。次のメニュー項目が表示されます:

## ライセンスサーバー

License servers ウィンドウは通常、最初に確認する場所です。監視対象ライセンスサーバーのステータスと、ライセンスサーバーマシンにインストールされた OpenLM Broker のステータスを表示します。主な内容は次のとおりです:

- ライセンスサーバーステータス
- Green: 稼働中
- Yellow: ライセンスサーバー側の問題（例: Broker 停止、LM 停止、時刻差エラー）
- Red: Down。ライセンスサーバーと通信できません。
- 合計ライセンス数（該当するライセンス在庫テーブルへのリンク付き）
- 使用中ライセンス数（Currently Consumed Licenses テーブルへのリンク付き）
- 借用ライセンス数
- 使用率
- Broker 情報とアクション:
- ライセンスサーバーマシンからファイルをインポート（例: License file、Options file）
- Broker バージョンと関連する Java (JRE) バージョン
- License Server time ![License Managers Servers](/img/legacy/license-managers-servers.png)

## ホスト稼働状況

ホスト稼働状況の波形図は、時間経過に伴うライセンスサーバーの活動を表示します。  
![](/img/legacy/word-image-26360-8.png)

## アラート

[OpenLM Alerts モジュール](../openlm-slm-features/openlm-alerts-configuration.md) はライセンスシステムの安定性を確保するために設計されています。システム管理者はアラート条件と、それに伴うアクションを定義できます。アラートメッセージは EasyAdmin の 'Alerts' ウィンドウに表示され、ログファイルにも記録されます。事前に定義したメールアドレスへ送信することもできます。  
![](/img/legacy/word-image-26360-9.png)

## 最近のフィーチャー拒否

このウィンドウは、フィーチャーごとのライセンス拒否に関する初期統計を提供します。長期および短期の期間における拒否リクエスト数を表示します。  
![](/img/legacy/word-image-26360-10.png)

## フィーチャー使用状況

多くの顧客に人気のウィジェットとして、指定した監視フィーチャーのライセンス使用率を Green-To-Red で表示するビューがあります。

## その他

- 一般統計
- 選択フィーチャー統計

## 運用

### 現在消費中のライセンス

Currently Consumed Licenses (CCL) ウィンドウは、現在監視中のすべてのライセンスセッションを一覧表示します。これはライセンス管理者にとって重要なインターフェースで、権限のあるシステム管理者は、リアルタイムの包括的な使用情報を取得し、必要に応じて任意のユーザーからライセンスを手動で回収できます。

表示される情報と操作は次のとおりです:

- ユーザー詳細（例: 名/姓、電話、メール、グループ、プロジェクト所属）
- フィーチャー詳細（例: Version、Vendor、Feature、Product name）
- セッション開始時刻と継続時間
- ライセンス借用情報（例: Linger time、Linger due）
- ライセンス情報（例: ライセンスサーバー、handle 番号）
- アイドルセッション情報（例: Idle 波形表示、Workstation idle time、Process idle time）
- 操作ボタン: アプリケーションを閉じる、ライセンスを回収する

## 解放済みライセンス

管理者の介入によって解放されたライセンスの一覧です。

## レポートウィンドウ

EasyAdmin の 'Start' → 'Reports' ウィンドウをクリックします。履歴の使用統計とメトリクスの一覧が表示されます:

## License Usage

強力な License Usage レポートウィンドウは、総ライセンス数に対する単一または複数フィーチャーの実使用量を集計します。設定可能な期間とサンプル解像度でライセンス消費パターンを表示し、ライセンス在庫のボトルネックや冗長性の特定に役立ちます。

このレポートは表示ペインのタブにより 3 つの形式で提供されます: 表、チャート、またはヒートマップ図。

スマートフィルターにより、ユーザーはライセンスのカスタムリストを作成し、これらのライセンスに関する有用な情報を簡単に取得できます。"License usage" ウィンドウのフィルターには次の特徴があります:

- 使用レポートの期間は設定可能です。事前定義の期間（例: 過去 30 日）と、開始/終了を指定する期間から選択できます。
- チャート表示では、チャート下部のズームドラッグボタンで表示期間を拡大できます。
- "Aggregated usage" チェックボックスは、期間（hour/day/week）ごとにサンプルされた最大使用量を表示するか、ライセンスマネージャーから報告される実際の使用発生を表示するかを切り替えます。

## License Activity

License Activity ウィンドウは、システム管理者が高度なレポートを作成し、個々のユーザーのライセンス活動を追跡できる強力なツールです。このウィンドウの "Group by" タブは、Workstations、Features、Users、Groups、Projects に基づくライセンス統計レポートの生成を支援します。

## Denials

これはライセンス拒否の履歴発生を表示します。FlexLM と IBM-LUM ライセンスマネージャーのみで利用可能で、ライセンスサーバーマシン上の OpenLM Broker が必要です。[詳しくはこのドキュメントを参照してください](./openlm-easy-admin-user-interface-modules-and-reports/license-denials-reporting.md)。

Denials レポートウィンドウに関する注意点は次のとおりです:

- 情報は円グラフ、線、または表として表示できます。
- 時間、ユーザー、プロジェクトなどの条件で分割できます。
- フィルターには "True denials" チェックボックスがあります。このオプションはライセンスマネージャーによる無関係な拒否レポートを除外します。無関係なレポートの例:
- 特定ユーザーによる短時間での複数リクエスト
- あるサーバーで拒否されたが別のサーバーで許可されたライセンス要求

## プロジェクトとグループ使用状況

OpenLM はユーザーの活動を監視し、グループやプロジェクトに基づいてライセンス使用状況を割り当てられます。この機能は、ライセンス使用のチャージバック（利用課金）ポリシーを実装する際によく利用されます。

## 管理

### ライセンス調達テーブル

このウィンドウには OpenLM データベースに保存されているすべてのライセンス情報が一覧表示されます。

組織のソフトウェア資産の棚卸しに役立ちます。表示される情報は次のとおりです:

- ライセンスパッケージの内容
- フィーチャープロパティ（例: Feature name、Product name、Vendor）
- ライセンスプロパティ（例: 数量、Start、Issue、Expiration 日）。期限が近いライセンスは赤で表示されます。
- FlexLM ライセンスファイル情報（例: Vendor info、Asset Info、Vendor String）

## プロジェクト

OpenLM は、特定のアクティブプロジェクトにライセンス使用状況を割り当てられます。これにより、組織のプロジェクトに基づいたソフトウェア資産の消費を監視し、チャージバックレポートを作成できます。

OpenLM データベースで新しいプロジェクトを作成するためのインターフェースは 2 つあります。1 つはこの 'Projects' ウィンドウで、もう 1 つは End-Users Services（Personal Dashboard）です。

このウィンドウでは管理者が新しいプロジェクトを作成し、次の項目を編集できます:

- プロジェクト名
- プロジェクトの開始/終了日時
- このプロジェクトに割り当てる作業時間
- プロジェクトの優先度
- プロジェクトの達成率（パーセンテージ）

## ライセンス効率

このメニューの 2 つの補完的なウィンドウが、ライセンス効率の指標として機能します:

- License utilization: ライセンス使用のヒストグラムで、各 'y' 値は「対応する x 本のライセンスがどれだけの使用時間割合で利用されているか」を示します。この表示形式は一時的な使用ピークを無視し、実際のライセンス消費パターンを明確に示します。組織で必要なライセンス数を描写します。
- Licenses not in use: 自明です。おそらく不要なライセンスの一覧です。

## OpenLM License 関連

- Audit report
- Active users report

## ユーザーとグループ

OpenLM は Users、Groups、IPs、Hosts、Host groups といった異なる種類のエンティティを扱います。新しいエンティティを OpenLM データベースに導入する方法については、前述の "OpenLM Entities" 段落で説明しています。

この 'Start' メニューオプションでは、管理者は次を行えます:

- OpenLM データベースに存在する Users と Groups の一覧を取得する
- OpenLM データベースに存在するワークステーション情報を取得する
- Users と Groups を手動で追加する
- ユーザープロパティと OpenLM パスワードを編集する
- グループメンバーシップを設定する

## Options files

FLEXlm Options files は、ライセンスモデルの制約内でさまざまな運用パラメータを細かく制御する手段をライセンス管理者に提供します。Options file の設定により、ライセンス対象フィーチャーを Users/Groups、Hosts、IPs、Host Groups に対して専用、拒否、または予約できます。Options file のメンテナンスに関する詳細は、以下の専用章を参照してください。

## EasyAdmin User Interface の Administration メニュー

Administration メニューは、さまざまな管理作業のための OpenLM インターフェースです。ほとんどの内容は各項目の文脈で詳細に説明しているため、ここでは繰り返さず、該当する段落へのリンクのみを示します。

![](/img/legacy/word-image-26360-11.png)

## System & Security

- 既定タイムゾーンの設定
- システムのログレベル設定
- メール通知の有効化
- システム認証とセキュリティオプションの有効化

Active Agent の設定

これらは OpenLM Agent に関連するウィンドウです。Agent はエンドユーザーのワークステーションに配置され、ワークステーション上のプロセス監視に基づくさまざまな機能を提供します。これらの機能には、アイドルライセンスの回収や 'Unmanaged licenses' の監視が含まれます。

- Active Agent
- Agent Policy
- Agent Procedures
- Process / Features
- Unmanaged processes

## Working Days & Hours

組織の稼働時間を設定します。OpenLM はこの設定に関係なく使用情報を蓄積しますが、履歴ライセンス使用状況は週末や時間外を除外するように設定できます。

## Show/Hide Features

ユーザーはレポートウィンドウから除外するフィーチャーを選択できます。ライセンス使用情報はこの設定に関係なく蓄積されます。

## Product Packages

パッケージ内にライセンスフィーチャーを配置するための手動方法です。他の方法（FlexLM ライセンスファイルの読み取りやオンライン更新）については、[こちら](./openlm-easyadmin-user-interface-administration/products-and-packages.md) を参照してください。

## Directory Sync

このウィンドウは Directory Synchronization プロセスの一部です。詳細は該当段落に記載しています。このウィンドウを設定するには [Directory Synchronization](../directory-sync/) がインストールされている必要があります。

## Options files

Options file メンテナンス機能に関するいくつかのプロパティ（データフローの方向など）を設定します。

## File fetching

ファイル取得は "License servers" ウィンドウから行います。ここでは、取得の有効化、タイムアウト、ターゲットディレクトリの場所など関連設定を行います。

## Projects

OpenLM は、作業プロジェクトに基づくライセンスアプリケーションの使用状況管理とレポートのための基盤を提供します。

## Alerts

OpenLM はリアルタイムのアラートと介入のための管理インターフェースを提供します。アラートは EasyAdmin の 'Alerts' ウィンドウに表示されるほか、事前に指定したメールにも送信できます。関連ウィンドウ:

- Email
- Alerts management

## Roles

OpenLM SLM はロールベースのセキュリティ機能をサポートし、アクセスロールを設定して OpenLM ツールへのアクセスをカスタマイズできます。[詳細はこちら](../openlm-slm-features/openlm-roles-permissions.md)。

## OpenLM License

お使いの OpenLM ライセンスで利用可能な内容と機能がこのウィンドウに表示されます。

## Cleanup Manager

不要な情報をクリーンアップするツールです。クリーンアップは元に戻せないため、使用前にデータベースのバックアップを行い、慎重に実行してください。[詳細はこちら](./openlm-easyadmin-user-interface-administration/cleanup-manager-module.md)。

## Checkout Policy

OpenLM のライセンスカウントがベンダーのライセンス消費ポリシーと一致するように設定します。

- 同一ユーザーが同一ワークステーションで複数セッションを開いても 1 ライセンスとして消費する
- 同一ユーザーが同一ワークステーションで複数セッションを開くと複数ライセンスとして消費する

## OpenLM Applications Manager

OpenLM Applications Manager の設定と、それに関連するすべての機能を管理するための設定です。

## Denials

OpenLM がライセンス拒否イベントデータをどのように扱うかを管理します。

## Token-Flex

Token-Flex サーバーの扱いを設定します。

## External Platforms

OpenLM と連携するさまざまなアダプタや外部プラットフォーム（例: ServiceNow）を設定します。

## EasyAdmin User Interface への接続

- EasyAdmin には軽量 Web サーバーの Kestrel が同梱されています。EasyAdmin User Interface に接続する既定ポートは 5015 です。
- 既定の EasyAdmin User Interface URL は http://localhost:5015 です。
- ネットワーク上の別マシンから EasyAdmin に接続する場合は、'localhost' を対象の OpenLM SLM ホスト名に置き換えます。

EasyAdmin User Interface Web アプリケーションの起動に問題がある場合は、次を確認してください:

- OpenLM SLM サービスが稼働している
- 関連ポート（5015）が Firewall によってブロックされていない

問題が解決しない場合は、support@openlm.com までお問い合わせください。
