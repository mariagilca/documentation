---
title: "EasyAdmin UI 管理"
sidebar_position: 1
---
ここでは、OpenLM EasyAdmin User Interface の **Administration** ウィンドウの基本的な説明を確認できます。

![Administration](/img/legacy/Screenshot-2023-08-22-at-18.43.55.png)

Administration

## **System&Security**

### System

#### Timezone

OpenLM インターフェースのタイムゾーンは、初回ログイン時にユーザーが設定するか、管理者がグローバルに設定できます。

![Administration - Timezone](/img/legacy/Screenshot-2023-08-22-at-18.44.52.png)

Administration - Timezone

#### Chart Color

チャートカラーでは、事前定義のカラーパターンを選択するか、カスタマイズして色を設定できます。色をクリックするとカラーピッカーが表示され、必要な色を調整できます。この選択は OpenLM インターフェース内のすべてのチャートに影響します。使用可能なパレットは Medium Pallete、Soft Pallete、Custom Pallete の 3 種類です。

![Administration- System&Security Chart Color](/img/legacy/Screenshot-2024-04-22-at-12.57.49.png)

Administration - System&Security Chart Color

#### Email Notifications

オンにすると、定義済みシナリオに対するメール通知をシステム管理者が受け取れるようになります。  
Email notifications をオンにするには Email パネルの設定とテストが必要です。

対応する通知:
1. Performance improvements: OpenLM が改善可能な運用アクションを報告します（OpenLM Light ユーザー & Live Monitoring ライセンスのみ）。  
2. License violations: ライセンス契約違反や違反しているコンポーネントを通知します。  
3. New version released: 新しいバージョンがリリースされるたびにメールで通知します。  
4. Usability report: OpenLM が技術的問題やクラッシュを検出すると自動レポートを生成します。この通知をオンにすると、システムメッセージに加えてメールも送信されます。

![Email Notifications Administration](/img/legacy/Screenshot-2024-04-22-at-13.02.02.png)

Administration - Email Notifications

#### General Configuration

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

#### **Logs&Reports**

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

#### Data management

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

#### Authorization

OpenLM は Oauth2.0 と Open ID Connect のセキュリティプロトコルをサポートします。Authorization 画面ではクライアント ID と secret key を生成し、OpenLM Broker や DSS など外部コンポーネントが OpenLM SLM にアクセスできるようにします。  
Reset Secret: クリックすると、クライアント ID に紐づく既存の secret key をリセットし、新しいキーを生成します。旧キーは無効になります。

![Administration - Client Authorization](/img/legacy/Administration-Client-Authorization.png)

Administration - Client Authorization

## **Working Hours**

組織の勤務時間を定義し、OpenLM のすべてのレポートのフィルタに使用します。

![スクリーンショット: Working hours](/img/legacy/Screenshot-2023-08-22-at-18.49.34.png)

## **Show/Hide features**

OpenLM インターフェースで表示/非表示にする機能を選択します。

![スクリーンショット: Show/hide features](/img/legacy/Screenshot-2023-08-22-at-18.50.30.png)

## [**Product Packages**](./products-and-packages.md)

OpenLM User Interface 内で製品名の変更と製品パッケージの設定を行います。

![](/img/legacy/Screenshot-2023-08-22-at-18.51.19.png)

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

## [**Cleanup Manager**](./cleanup-manager-module.md)

OpenLM データベースから使用履歴、グループ、ユーザーを削除します。

![](/img/legacy/Screenshot-2023-08-22-at-18.52.25.png)

## [Directory Synchronization](../../directory-sync/configuration.md)

OpenLM はドメインディレクトリ（例: ActiveDirectory）のユーザー情報を OpenLM データベースと同期する機能を提供します。

## **OpenLM License**

OpenLM ライセンスファイルの詳細（有効期限、保有拡張、数量など）を確認できます。

![スクリーンショット: OpenLM license](/img/legacy/Screenshot-2023-08-22-at-18.53.22.png)

## **Email**

SMTP サーバーの詳細を設定し、OpenLM SLM が条件に応じてメール送信できるようにします。

![Administration - Email](/img/legacy/Screenshot-2023-08-22-at-18.55.55.png)

Administration - Email

## [Alerts](../../openlm-slm-features/openlm-alerts-configuration.md)

OpenLM Alerts 機能はライセンスシステムの安定性と可用性を監視するために設計されています。アラート条件と、条件を満たしたときのアクションを定義できます。

この拡張は複数ライセンスサーバーに対する複雑な条件と機能を扱えます。アラート表示方法は次のとおりです:

- EasyAdmin User Interface の Alerts ウィジェット内のイベント
- Application Event Log のイベント
- 1 つまたは複数のメールアカウントに送信

## Roles

OpenLM SLM は、システム管理者がアクセスロールを設定して OpenLM ツールへのアクセスをカスタマイズできるロールベースセキュリティ機能を提供します。この機能により、ヘルプデスク、システム管理者、マネージャー、開発者など多様なグループに OpenLM ツールを適用できます。ロールベースセキュリティは、OpenLM システム内のサーバー一覧、フィールド、アクションボタンなど、ほぼすべてのリソースを保護します。

![Administration - Roles](/img/legacy/Screenshot-2024-04-22-at-14.14.14.png)

Administration - Roles

## [Unmanaged Processes](../../openlm-slm-features/openlm-unmanaged-processes.md)

すべての Software Feature は PC 上で Process として実行されます。Unmanaged Processes を使うとこれらのフィーチャーを追跡できます。

![Administration - Unmanaged Processes](/img/legacy/Screenshot-2024-04-22-at-14.23.36.png)

Administration - Unmanaged Processes
