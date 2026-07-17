---
title: EasyAdmin UI 管理
description: ここでは、OpenLM EasyAdmin User Interface の Administration ウィンドウの基本的な説明を確認できます。
sidebar_position: 1
---
ここでは、OpenLM EasyAdmin User Interface の **Administration** ウィンドウの基本的な説明を確認できます。

![Administration](/img/legacy/Screenshot-2023-08-22-at-18.43.55.png)

Administration

## System&Security

### System

### Timezone

OpenLM インターフェースのタイムゾーンは、初回ログイン時にユーザーが設定するか、管理者がグローバルに設定できます。

![Administration - Timezone](/img/legacy/Screenshot-2023-08-22-at-18.44.52.png)

Administration - Timezone

### Chart Color

チャートカラーでは、事前定義のカラーパターンを選択するか、カスタマイズして色を設定できます。色をクリックするとカラーピッカーが表示され、必要な色を調整できます。この選択は OpenLM インターフェース内のすべてのチャートに影響します。使用可能なパレットは Medium Pallete、Soft Pallete、Custom Pallete の 3 種類です。

![Administration- System&Security Chart Color](/img/legacy/Screenshot-2024-04-22-at-12.57.49.png)

Administration - System&Security Chart Color

### Email Notifications

オンにすると、定義済みシナリオに対するメール通知をシステム管理者が受け取れるようになります。  
Email notifications をオンにするには Email パネルの設定とテストが必要です。

対応する通知:
1. Performance improvements: OpenLM が改善可能な運用アクションを報告します（OpenLM Light ユーザー & Live Monitoring ライセンスのみ）。  
2. License violations: ライセンス契約違反や違反しているコンポーネントを通知します。  
3. New version released: 新しいバージョンがリリースされるたびにメールで通知します。  
4. Usability report: OpenLM が技術的問題やクラッシュを検出すると自動レポートを生成します。この通知をオンにすると、システムメッセージに加えてメールも送信されます。

![Email Notifications Administration](/img/legacy/Screenshot-2024-04-22-at-13.02.02.png)

Administration - Email Notifications

### General Configuration

**Support spaces in the user name when reading LM SLM output/log files.**  
OpenLM が LM 出力ファイル/ログでユーザー名欄のスペースをユーザー名の終端として解釈するのが既定です。このオプションをオンにすると、出力/ログ内の User name にスペースを含められます（この方法はデータ解析ミスを増やす可能性があります）。

**Table Mapping:**  
Update product features  
このオプションを選ぶと、システムの製品フィーチャーテーブルをリモートで更新します。

Update feature/packages  
OpenLM がライセンスフィーチャーを Packages に整理できるようにします。リモート更新も可能です。

これら 2 つのテーブルは定期的に更新されます。  
Daily / Weekly / Monthly の自動更新を選択するか、手動同期を選択できます。  
Daily は毎日 0:00、Weekly は毎週日曜 0:00、Monthly は毎月 1 日に更新されます。

**製品/フィーチャー、またはフィーチャー/パッケージを package/product ウィンドウから手動更新した後に自動更新へ切り替えると、** 以前のマッピングは上書きされます。

**System Configuration:**  
システム構成のエクスポート/インポートができます。  
特に DB 種別を切り替える場合は、構成のバックアップを強く推奨します。

![Administration - General Configuration](/img/legacy/Screenshot-2024-04-22-at-13.06.03.png)

Administration - General Configuration

### Logs&Reports

**Generate support reports**: 問題が発生した場合に OpenLM Support チーム向けのレポートを簡単に生成できます。レポートにはサーバー設定/ポート、DB 種別、メモリ消費などの一般情報が含まれ、トラブルシューティングの出発点として有用です。

**Server Logger Configuration File Destination**: ログ設定ファイルの保存先です。すべてのログパスはこのファイルで定義されます。

**Enable detailed logs:** 事前定義した期間、詳細ログを有効化できます。ログの取り忘れやシステム過負荷を防ぎます。  
詳細ログには 3 つのモードがあります:  
**Full OpenLM logging (All Logs)**: OpenLM がサポートする全ログを詳細モードで記録（ライセンスマネージャーサーバーログを含む）。  
**Full LM Logging:** 特定のライセンスマネージャーサーバーを詳細モードで記録し、加えて OpenLM のフルログ（Server、Broker listener、Agent listener）を記録します。その他の LM サーバーは既定モードで監視されます。  
**LDAP Log**: LDAP ログの記録を開始します。  
ログは 5 分〜48 時間の期間で実行できます。終了後は標準設定に戻ります。

![Administration - Logs&Reports](/img/legacy/Screenshot-2024-04-22-at-13.10.17.png)

Administration - Logs&Reports

### Security

### Data management

**Resolve workstation name every day**  
このオプションを有効にすると、OpenLM SLM が選択した時刻に毎日ワークステーション名を IP アドレスへ変換します。

**Store user information anonymously**  
法令や契約によりユーザー利用情報の保存が制限される場合があります。このオプションを使用すると、データは匿名で保存されます。

**Set as permanent**  
このオプションを選択すると匿名化が恒久化され、元に戻せません。システムは明確なユーザー情報を取得できなくなります。影響を理解したうえで設定してください。  
もう 1 つの方法は、未承認ユーザーから利用情報を隠すことです。  
アクセス制御は "OpenLM Role Based Security" によって提供されます。

![Administration - Data Management](/img/legacy/Screenshot-2024-04-22-at-13.13.58.png)

Administration - Data Management

### Authorization

OpenLM は Oauth2.0 と Open ID Connect のセキュリティプロトコルをサポートします。Authorization 画面ではクライアント ID と secret key を生成し、OpenLM Broker や DSS など外部コンポーネントが OpenLM SLM にアクセスできるようにします。  
Reset Secret: クリックすると、クライアント ID に紐づく既存の secret key をリセットし、新しいキーを生成します。旧キーは無効になります。

![Administration - Client Authorization](/img/legacy/Administration-Client-Authorization.png)

Administration - Client Authorization

## Working Hours

組織の勤務時間を定義し、OpenLM のすべてのレポートのフィルタに使用します。

![レポートフィルターで使用する組織の稼働時間を定義する EasyAdmin の Working hours 設定。](/img/legacy/Screenshot-2023-08-22-at-18.49.34.png)

## Show/Hide features

OpenLM インターフェースで表示/非表示にする機能を選択します。

![OpenLM インターフェースでフィーチャーを表示・非表示にする EasyAdmin の Show/hide features 設定。](/img/legacy/Screenshot-2023-08-22-at-18.50.30.png)

## [Product Packages](./products-and-packages.md)

OpenLM User Interface 内で製品名の変更と製品パッケージの設定を行います。

![製品名の変更とパッケージ定義を行う EasyAdmin の Product packages 設定。](/img/legacy/Screenshot-2023-08-22-at-18.51.19.png)

## [Process Feature](../../openlm-slm-features/license-harvesting/)

OpenLM Process Features ウィンドウは、特定アプリケーションのライセンス監視を設定するためのツールです。管理者は監視対象プロセスを定義し、アイドル時間のしきい値やセッションをアイドルとみなす条件を設定できます。これにより未使用ライセンスを特定して回収し、最適なリソース配分を実現できます。  
![Administration - Process Features](/img/legacy/process-features-1.png)

## [Projects](../../openlm-slm-features/openlm-project-usage.md)

**Log projects information:** この機能と設定を有効化します。

**General Settings:**  
**Minimal usage duration for project:** プロジェクトが非アクティブになる前の最小使用時間を設定します。

**Active project window:**  
Active project ウィンドウの挙動を制御します。以下を選択できます:

Display the window at license retrieval.

Display the window periodically at a set time interval. "every" の隣で間隔を設定します。

**Projects window fades away after** 表示後にプロジェクトウィンドウが開いている時間を設定します。

**Show "Set Active Project" in Agent menu:** Agent メニューに "Set Active Project" を表示します。

**Show "Create New Project" in Agent menu:** Agent メニューに "Create New Project" を表示します。

**Show unassigned projects:** 未割り当てプロジェクトを表示します。

**Support environment variable:** OpenLM 用の環境変数を設定します。

**Variable name:** 環境変数名を指定します。

**Add unknown projects:** 環境変数の値に基づき未知のプロジェクトを OpenLM に追加します。

![Administration - Projects](/img/legacy/Screenshot-2024-04-22-at-14.04.41.png)

Administration - Projects

## [Cleanup Manager](./cleanup-manager-module.md)

OpenLM データベースから使用履歴、グループ、ユーザーを削除します。

![データベースから使用履歴、グループ、ユーザーを削除する EasyAdmin の Cleanup Manager 設定。](/img/legacy/Screenshot-2023-08-22-at-18.52.25.png)

## [Directory Synchronization](../../directory-sync/configuration.md)

OpenLM はドメインディレクトリ（例: ActiveDirectory）のユーザー情報を OpenLM データベースと同期する機能を提供します。

## OpenLM License

OpenLM ライセンスファイルの詳細（有効期限、保有拡張、数量など）を確認できます。

![有効期限や拡張機能などライセンスファイルの詳細を表示する EasyAdmin の OpenLM license ウィンドウ。](/img/legacy/Screenshot-2023-08-22-at-18.53.22.png)

## Email

SMTP サーバーの詳細を設定し、OpenLM SLM が条件に応じてメール送信できるようにします。

![Administration - Email](/img/legacy/Screenshot-2023-08-22-at-18.55.55.png)

Administration - Email

## [Alerts](../../openlm-slm-features/openlm-alerts-configuration.md)

OpenLM Alerts 機能はライセンスシステムの安定性と可用性を監視するために設計されています。アラート条件と、条件を満たしたときのアクションを定義できます。

この拡張は複数ライセンスサーバーに対する複雑な条件と機能を扱えます。アラート表示方法には次のオプションがあります:

- EasyAdmin User Interface の Alerts ウィジェット内、および Application Event Log 内のイベントとして表示。
- 1 つまたは複数のメールアカウントへメールとして送信。

## Roles

OpenLM SLM は、システム管理者がアクセスロールを設定して OpenLM ツールへのアクセスをカスタマイズできるロールベースセキュリティ機能を提供します。この機能により、ヘルプデスク、システム管理者、マネージャー、開発者など多様なグループに OpenLM ツールを適用できます。ロールベースセキュリティは、OpenLM システム内のサーバー一覧、フィールド、アクションボタンなど、ほぼすべてのリソースを保護します。

![Administration - Roles](/img/legacy/Screenshot-2024-04-22-at-14.14.14.png)

Administration - Roles

## [Unmanaged Processes](../../openlm-slm-features/openlm-unmanaged-processes.md)

すべての Software Feature は PC 上で Process として実行されます。Unmanaged Processes を使うとこれらのフィーチャーを追跡できます。

![Administration - Unmanaged Processes](/img/legacy/Screenshot-2024-04-22-at-14.23.36.png)

Administration - Unmanaged Processes

![プロセスとして実行されるソフトウェアフィーチャーを追跡する EasyAdmin の Unmanaged processes 設定。](/img/legacy/Screenshot-2024-04-22-at-14.23.36-1.png)

## [Options Files](../../options-files/options-file-management.md)

FlexLM（FlexNet Publisher）の Options ファイルを使うと、ライセンス管理者はライセンスモデルの制約の範囲内でさまざまな動作パラメーターを細かく制御できます。Options ファイルの設定に応じて、ライセンスフィーチャーをユーザーやユーザーグループ、さらにホスト、IP、ホストグループに対して専有、拒否、予約できます。

![Administration - Option FIles](/img/legacy/Screenshot-2024-04-22-at-14.26.56.png)

Administration - Option Files

## [Agent Procedures](../../openlm-slm-features/license-harvesting/license-retrieval-of-idle-applications-enhanced-workstation-agent-procedures.md)

OpenLM は Agent Procedures を通じて、アイドル状態のアプリケーションからライセンスを回収できます。次の機能が含まれます:

1. 任意のライセンスサーバーが管理するライセンスの汎用的な回収（FlexLM に限定されません）。
2. 条件付きライセンス回収（例:「アプリケーション B が非アクティブの場合にのみ、アイドル状態のアプリケーション A を終了する」）。
3. 'Unmanaged' ライセンス（OpenLM が照会するライセンスサーバーで管理されていないライセンス）のアイドルアプリケーションの終了。

![Administration - Agent Procedures](/img/legacy/Screenshot-2024-04-22-at-14.52.57.png)

Administration - Agent Procedures

## [Checkout Policy](./configuring-the-license-checkout-policy.md)

"Checkout Policy" とは、複数のセッションを起動したときにアプリケーションが消費するライセンス数のことです。たとえば、同一ユーザーが 1 台のワークステーションで Autodesk のセッションを複数起動した場合、ライセンスサーバーはそのユーザーの消費を 1 ライセンスとみなすことも、それ以上とみなすこともあります。**正しいライセンス使用状況レポートのために、ライセンスサーバー（つまりベンダー）が定義するチェックアウトポリシーと OpenLM で指定するポリシーを一致させることが不可欠です。**

![Administration - Checkout Policy](/img/legacy/Screenshot-2024-04-22-at-14.59.39.png)

Administration - Checkout Policy

## [Applications Manager](../../openlm-applications-manager/openlm-applications-manager-configuration.md#1433336741-fgedf3)

OpenLM Applications Manager は、ライセンス方式にかかわらず組織内のあらゆるソフトウェアの使用を監視・制御する Java アプリケーションです。

![Administration - Applications Manager](/img/legacy/word-image-26657-2.png)

Administration - Applications Manager

## [Token Flex](../../interfacing-articles/autodesk-token-flex.mdx)

Token Flex は Autodesk のクラウドベースの従量課金型ライセンスモデルです。顧客は複数のトークン（「トークンプール」と呼ばれます）を購入し、ユーザーが特定の製品ファミリーに属する製品を所定の時間内（通常は 24 時間単位でカウント）に実行するたびに、このトークンで支払います。

![Administration - Token Flex](/img/legacy/Screenshot-2024-04-22-at-15.11.43.png)

Administration - Token Flex

## External Platforms

### DSS

![Administration - External Platforms - DSS](/img/legacy/Screenshot-2024-04-22-at-15.15.07.png)

Administration - External Platforms - DSS

**Connection setup**  
OpenLM SLM と OpenLM Directory Synchronizations Service（DSS）間の接続を承認・管理します。  
DSS が OpenLM SLM へレポートするよう構成されると、5 分間、またはリクエストが承認/拒否されるまで承認待ち（pending approval）モードになります。  
OpenLM SLM と DSS 間の接続は単一接続です。DSS を切り替えるには、新しい DSS から承認リクエストを送信します。新しい DSS は承認待ちとして表示され、承認して保存すると接続が新しい DSS に切り替わります。

### ServiceNow

### ServiceNow destination

![Administration - External Platforms - ServiceNow Destination](/img/legacy/Screenshot-2024-04-22-at-15.17.43.png)

Administration - External Platforms - ServiceNow Destination

OpenLM は ServiceNow の信頼されたパートナーであり、OpenLM のレポートを ServiceNow のインターフェースに統合する ServiceNow アプリケーションを提供しています。  
**ServiceNow URL:** ServiceNow インスタンスへのパスです。例: https://ven11111.service-now.com  
**User:** ServiceNow のユーザー名です。  
**Password:** ServiceNow のパスワードです。  
**Test connection:** OpenLM と ServiceNow 間の接続を確認します。

### ServiceNow sync configuration

**Sync Status:**  
OpenLM と ServiceNow 間のデータ同期を有効化/無効化します。**Sync every day at:**  
OpenLM と ServiceNow 間の毎日の同期を開始する時刻を設定します。実行時刻は External Platforms サーバーのタイムゾーンに基づきます。**Sync Now:**  
定期スケジュール外に ServiceNow との同期リクエストを実行します。スケジュールされた同期の実行中は、Sync Now は無効になります。

**ServiceNow data aggregation time zone:**  
OpenLM は日次の集計データを ServiceNow にレポートします。1 日の区切りを定義するタイムゾーンを選択します。

![Administration - External Platforms - ServiceNow Sync Configuration](/img/legacy/Screenshot-2024-04-22-at-15.19.45.png)

Administration - External Platforms - ServiceNow Sync Configuration

### ServiceNow notifications

ServiceNow 統合にはメール通知とアラート通知が含まれます。同期が正常に完了したとき、または問題が発生したときに、システム管理者と受信者リストへ通知が送信されます。

**EasyAdmin Alerts:** オンにすると、通知が OpenLM EasyAdmin の Alerts ウィンドウに表示されます。

**Email Notifications:** オンにすると、通知が OpenLM のシステム管理者と受信者リストへメールで送信されます。

**Recipients list:** Email スイッチがオンの場合、必要な数だけ受信者のメールアドレスを追加できます。1 行につき 1 件ずつ入力します。

![Administration - External Platforms - ServiceNow Notifications](/img/legacy/Screenshot-2024-04-22-at-15.21.58.png)

Administration - External Platforms - ServiceNow Notifications

## License Manager Servers

### LM servers

ライセンスマネージャーサーバーの設定を管理します。ステータスを監視し、ライセンスサーバーの承認、追加、編集を行います。

**Status:**  
ライセンスサーバーのステータスは pending、activated、deactivated、denied のいずれかです。

Pending: 初期ステータスです。OpenLM Broker が LM サーバーをレポートしたことを示します。LM サーバーを承認すると、OpenLM が監視を開始します。

Denied: OpenLM Broker がレポートした LM サーバーのうち、拒否を選択したものを示します。このステータスの LM サーバーは監視されません。

Activated:  
緑のチェックマークは、OpenLM が LM サーバーを正常に監視していることを示します。  
緑以外のマークとともに "Enabled" と表示される場合は、OpenLM が LM サーバーの監視中に問題に遭遇したことを示します（アイコンにマウスオーバーすると理由が表示されます）。

Deactivated: LM サーバーは構成されていますが、監視はオフになっています。

**Add LM:** OpenLM で監視する新しいライセンスマネージャーサーバーを手動で追加します。

**Edit:** サーバー名を直接開くか、サーバーを選択して edit を選択します。

**Remove:** OpenLM が監視する LM サーバーリストから削除するサーバーを 1 つ以上選択します（履歴データは保持されます）。

**Show/hide denied servers:** 拒否したライセンスサーバーを表示し、ステータスを pending に戻せるようにします。拒否されたサーバーは既定でリストの下部に表示されます。

![Administration - License Manager Servers](/img/legacy/LM-Servers.png)

Administration - License Manager Servers

### LM tools

OpenLM がライセンスサーバーへの照会に使用する exe ファイルまたはコマンドラインを設定します。

![Administration - LIcense Manager Servers](/img/legacy/Screenshot-2024-04-22-at-15.28.13.png)

Administration - License Manager Servers

## License Files

管理者はソフトウェアアプリケーションの FlexLM ライセンスファイルをアップロード、変更、比較できます。

**License Server Name:** ライセンスファイルが存在するライセンスサーバーの名前を表示する列です。

**Type:** ライセンスファイルの種類を示す列です。

**Upload Date:** ライセンスファイルがサーバーにアップロードされた日付を示す列です。\

**オリジナルファイルからドラフトへの切り替え**

**Menu:** このボタンを選択すると、ライセンスファイルを管理するための次のオプションが表示されます:

**Create a new draft:** 編集用にライセンスファイルの新しいドラフト版を作成します。

**Compare:** ライセンスファイルの現在のバージョンとドラフト版を比較します。

![Administration - LIcense File Compare](/img/legacy/Screenshot-2024-04-22-at-15.47.51.png)

Administration - License File Compare

**Push to LM Server:** 選択したライセンスファイル（オリジナルまたはドラフト）をライセンスサーバーにアップロードします。

**Search in file:** ライセンスファイル内の特定のキーワードを検索します。

![Administration - License Files](/img/legacy/Screenshot-2024-04-22-at-15.44.43.png)

Administration - License Files

![Administration - LIcense File Push](/img/legacy/Screenshot-2024-04-22-at-15.46.49.png)

Administration - License File Push

新しいライセンスファイルをプッシュする場合は、Push and Restart license manager または Push and Reread license manager を使用できます:

## [Denials](./denials.md)

OpenLM のレポートおよびデータベースから除外する拒否（denial）を設定します。

**Track true denials only:** 選択すると、ユーザーが定義した許容インターバル内にライセンス取得が成功した場合、その前の拒否は記録されません。また、同じライセンスに対する複数プールからの拒否について、このインターバル内に別のプールからライセンスが付与された場合も除外されます（「false denial」と呼ばれます）。

**License pull tolerance**

最初の拒否の後、このインターバル内にユーザーが別のサーバーからライセンスの取得に成功した場合、その拒否は True Denial としてカウントされません。最小値は 1 秒、最大値は 600 秒です。

**Excluded denials**

特定のライセンスサーバー、エラーコード、エラーメッセージに基づいてレポートから除外される拒否の一覧です。

![Track true denials only と Excluded denials オプションで拒否をフィルタリングする EasyAdmin の Denials 設定。](/img/legacy/Screenshot-2023-08-22-at-19.10.56.png)
