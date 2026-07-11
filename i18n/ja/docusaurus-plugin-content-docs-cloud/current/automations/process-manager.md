---
title: "プロセスマネージャー(Process Manager)"
description: "Process Manager は、Workstation Agent を通じてアプリケーションプロセスを監視し、アイドル時間を追跡して、ライセンスを自動的に解放（ライセンスハーベスティング）します。"
sidebar_label: License harvesting
sidebar_position: 4
---

## 概要

プロセスマネージャー(Process Manager)は、エンドユーザーのマシンにインストールされたOpenLM Workstation Agentを介してアプリケーションプロセスを監視します。アプリケーションの使用状況の追跡、実使用量（Actual Usage）の測定、特定のフィーチャーやDLLの監視に加え、アイドル状態のアプリケーションが保持するライセンスを自動的に解放（**ライセンスハーベスティング**）できます。

ベンダーのライセンスマネージャーを使用しないアプリケーションに対しては、**シャドウライセンス**（独自の消費ポリシーと解放ポリシーを持つ仮想ライセンス）によってライセンス方式の制限を適用できます。

プロセスマネージャーのインターフェースは4つのページで構成されています。

| ページ | 用途 |
|---|---|
| **Active Sessions** | 監視対象ワークステーションで現在実行中のプロセスを確認し、手動で解放を実行します。 |
| **Processes** | Workstation Agentが監視するプロセスと、その解放方法を定義します。 |
| **Procedures** | プロセスを解放する際にAgentが実行する一連のアクション（保存・一時停止・強制終了）を構成します。 |
| **Parent Packages** | 複数のプロセスで共有するシャドウライセンスプールを作成します。 |

## できること

- **使用状況の監視と区別**: アプリケーション、フィーチャー、特定のDLLを追跡します。
- **ライセンスハーベスティング**: アイドル状態のアプリケーションを自動的に閉じる・一時停止する・保存することで、ライセンスをプールに返却します。
- **シャドウライセンス**: ライセンスマネージャーを使用しないアプリケーションに対して、同時使用数の上限やアクセス制御を適用します。

## 前提条件

プロセスマネージャーを設定する前に、以下を確認してください。

- [Products製品](/cloud/openlm-administration/products)で**Process Monitoring**をアクティベートしていること。
- すべての対象マシンに[Workstation Agent](/cloud/data-collection/agent_activity_manager)をインストールしていること。
- ライセンス管理対象のアプリケーションについては、[Broker](/cloud/data-collection/broker-hub)と[ライセンスサーバー](/cloud/slm/license-servers)が設定されていること。
- **管理者**ロールを持っていること。閲覧者はすべてのページを参照できますが、追加・編集・削除はできません。

## 自動解放の仕組み

解放のパイプラインは複数の設定が連鎖して動作します。ライセンスがハーベスティングされるのは、すべての段階が満たされた場合のみです。

1. **Workstation Agent**が、監視対象プロセスのアイドル状態（ユーザー入力がなく、有効な場合はシステムリソース使用量が設定したしきい値未満）を検出します。
2. プロセスのアイドル時間が**Idle Time Limit**を超えると、解放の対象になります。
3. ライセンスプールの使用率が**Release Processes After %**のしきい値に達すると解放が実行されます。ただし、ユーザーまたはセッションが[プロセス解放の除外](#プロセス解放の除外process-release-exclusion)の対象である場合を除きます。
4. Agentがワークステーション上で設定された**解放方法**（プロシージャ、一時停止、拡張機能）を実行します。

:::note
アイドル時間の追跡と各解放方法は、OpenLMのトークンエンタイトルメント（例: Actual Usageフィーチャーやアプリケーション別ハーベスティングフィーチャー）を消費します。サブスクリプションのトークンが不足している場合、そのプロセスの監視はトークンが解放されるまで待機します。プランのトークン割り当てについては、OpenLMのアカウントマネージャーにお問い合わせください。
:::

## Processesページ

**Process Manager** > **Processes**を開くと、監視対象のプロセス定義がすべて表示されます。

![選択したプロセスのShadow Licenseパネルを表示したProcessesページ](/services/process_manager/processes.png)
*Processesページ。行を選択すると、そのShadow License、Features、DLLsパネルが表示されます。*

Process Monitoringをアクティベートすると、よく知られたアプリケーションのスターターセット（ArcMap、ArcCatalog、ArcGlobe、ArcScene、ArcGIS Pro、AutoCAD、NX、MATLAB、SolidWorks）が自動的に事前登録されます。MATLABとSolidWorksは無効の状態で登録されるため、監視を開始する際に有効化してください。

- 行を選択すると、右側のパネルでプロセスの**Shadow License**、**Features**、**DLLs**を確認できます。
- 行の鉛筆アイコンを選択すると、プロセスを編集できます。
- 列メニュー（⋮）から、各アイドルしきい値、**Automatic Process Release**、システムリソースレートなどの追加列を表示できます。

:::caution
プロセスを削除すると、そのアクティブセッションもすべて削除されます。選択したプロセスにアクティブセッションがある場合は、削除前に該当プロセスを一覧表示する確認ダイアログが表示されます。
:::

## プロセスの追加と編集

**[Add Process]** を選択するか、既存プロセスの鉛筆アイコンを選択します。フォームは**General**、**Process Release**、**Shadow Licenses**の3つのタブで構成されています。

### General

![Advanced Settingsを展開したEdit ProcessのGeneralタブ](/services/process_manager/process-general.png)
*Generalタブ（Advanced Settingsを展開した状態）。*

- **Monitoring Target**（必須） — プロセスを追跡する場合はプロセス名を入力します。ファイルまたはフォルダーの追跡では、監視するディレクトリを指定します。
- **Description**（必須） — 一意の説明（最大140文字）。
- **Vendor**（必須） — ベンダーデーモンまたはベンダー名。ライセンス管理対象のアプリケーションでは、ベンダーのフィーチャー検索に使用されます。
- **Tracking Type**（必須）:
  - **Process** — プロセス名で追跡します。
  - **File** — 特定のファイルから起動されたプロセスを追跡します。
  - **Directory** — ディレクトリ内のすべてのプロセス起動を監視します。
- **Process managed by a license server** — デフォルトで有効です。有効にすると、このプロセスにライセンスフィーチャーを添付でき、解放方法として**Suspension**と**Extension**が選択可能になります。

**Advanced Settings**では以下を設定できます。

- **Command Line Launch Arguments** — 起動コマンドラインが指定したテキストに一致するプロセスのみに検出対象を絞り込みます。
- **Window Title** — ウィンドウタイトルが指定したパターン（ワイルドカード対応）に一致するプロセスのみを追跡します。

### Process Release

このタブでは、プロセスのライセンスハーベスティングを制御します。

![Edit ProcessのProcess Releaseタブ](/services/process_manager/process-release.png)
*Process Releaseタブ。*

1. **Process Release**トグルをオンにして機能を有効化します。
2. **Process Release Method**を選択します。

   | 方法 | 動作 | 利用条件 |
   |---|---|---|
   | **None** | 監視のみ — 自動解放は行いません。 | 常に選択可能 |
   | **Procedure** | Agentが定義済みの[プロシージャ](#procedures)（保存・一時停止・強制終了のステップ）を実行します。 | 常に選択可能 |
   | **Suspension** | Agentがアプリケーションをフリーズし、ライセンスが解放されます。ユーザーはPersonal Dashboardから再開します。 | ライセンスサーバー管理対象のプロセス |
   | **Extension** | アプリケーション専用のハーベスティング拡張機能が作業を保存してアプリケーションを閉じます。ユーザーはPersonal Dashboardから再開します。 | 対応アプリケーションの管理対象プロセスのみ |

   **Extension**は、AutoCAD、ArcMap、ArcCatalog、ArcGlobe、ArcScene、ArcGIS Pro、MATLAB、SolidWorks、Petra、Kingdom、CATIA、Harmony Enterpriseで利用できます。後からプロセス名を変更したり**Process managed by a license server**をオフにしたりすると、互換性のない解放方法は自動的に**None**にリセットされます。

3. **Procedure**を選択した場合は、**Select Procedure**でプロシージャを選択します。
4. **Automatic Process Release**をオンにして、しきい値を設定します。
   - **Release Processes After %**（デフォルト80） — ライセンスプールの使用率がこの割合に達したときに、アイドル状態のプロセスを解放します。値を小さくするほど積極的に解放されます。
   - **Idle Time Limit (minutes)**（デフォルト15） — この時間を超えてアイドル状態が続いたプロセスが解放の対象になります。最小値は3分です。MATLABの場合、解放方法がNoneまたはExtension以外のときは最小15分です。また、**Report as "Idle" After**の値以上である必要があります。
5. **Track Process Idle/Active Periods**をオンにすると、アイドル期間が記録されます。
   - **Report as "Idle" After (minutes)**（デフォルト1） — プロセスがこの時間アイドル状態になると、そのアイドル情報が関連するフィーチャーセッションに関連付けられ、**Usage** > **Currently Consumed Licenses**に表示されます。この設定はレポートのみに影響し、プロセスが解放されるタイミングは変わりません。

:::tip
まずは控えめなしきい値から始め、ユーザーの作業中にライセンスが解放されないことを確認しながら、実際の使用状況に合わせて調整してください。
:::

#### プロセス解放の除外（Process Release Exclusion）

Process Release Exclusionは、特定のユーザー、グループ、またはアプリケーションの起動条件をライセンスハーベスティングから除外します。除外中もアイドル時間の監視は全ユーザーに対して継続されます。シミュレーション、レンダリング、バッチスクリプトなど、アプリケーションがアイドル状態に見えても（マウスやキーボードの入力がなくても）重要な処理を実行し続ける長時間の非対話型ワークロードを保護できます。

:::info[例]
組織でアイドル状態のMATLABライセンスを15分後に解放しているとします。ほとんどのユーザーにとっては、アイドル状態のライセンスが素早くプールに戻るため有益です。しかし、夜間シミュレーションを実行しているエンジニアのセッションが終了されると、数時間分の作業が失われてしまいます。そのエンジニア（またはそのグループ）を除外するか、バッチ起動をコマンドラインパターンで除外すれば、他のユーザーのライセンスは循環し続けたまま、その作業を保護できます。
:::

![スケジュール、CLIパターン、システムリソースしきい値を含むProcess Release Exclusion](/services/process_manager/release-exclusion.png)
*Process Release Exclusionブロック（除外スケジュール、CLI Commandフィールド、Advanced Settings）。*

除外ユーザー、除外グループ、コマンドラインパターンのうち、**いずれか**の条件に一致した場合、プロセスは解放**されません**。

**ユーザーまたはグループを除外する:**

1. プロセスの**Process Release**タブで**Process Release Exclusion**をオンにします（このトグルは**Process Release**がオンの間のみ操作できます）。
2. **Select User**または**Select Group**で対象を選択し、**+**ボタンで除外リストに追加します。名前を選択しただけでは追加されません。
3. エントリの横のごみ箱アイコンを選択すると削除できます。
4. **[Save]** を選択します。

ユーザー名とグループ名は大文字小文字を区別せずに照合され、グループの除外はそのグループの全メンバー（Users & Groupsサービスで解決）に適用されます。

**除外をスケジュールする（オプション）:**

デフォルトでは、除外は常時適用されます。定期的な時間帯に限定するには次のようにします。

1. **Process Release Exclusion Schedule**をオンにします。
2. **Start Time**と**End Time**を設定します。
3. 除外を開始する曜日を選択します。選択した曜日はウィンドウの*開始*時刻に適用されるため、夜をまたぐウィンドウ（例: 金曜22:00〜02:00）は土曜の朝に終了します。
4. **[Save]** を選択します。

スケジュールの時間帯以外では、通常の解放ルールが適用されます。時刻は、プロセスを保存したユーザーのOpenLM設定で構成されているタイムゾーンで評価されます。

**コマンドラインで除外する（CLIパターン）:**

ユーザー単位ではなく、アプリケーションの特定の*起動方法*（バッチ実行や読み取り専用セッションなど）を除外するには次のようにします。

1. **CLI Command**にパターンを入力し、**+**ボタンを選択します。パターンは必要な数だけ追加できます。
2. **[Save]** を選択します。

パターン照合のルール:

- `*`は任意の文字列に一致します。それ以外の文字はそのまま照合されます。
- 照合は大文字小文字を区別せず、コマンドライン内のどの位置でも一致します。たとえば`-f *.tcl`は`pt_shell -f script.tcl -64bit`に一致します。
- **いずれか1つ**のパターンに一致すれば、プロセスは除外されます。
- CLIパターンは除外スケジュールの影響を**受けません** — 引数が一致している限り、常に除外されます。
- Workstation Agentがプロセスのコマンドライン引数を報告しない場合（古いバージョンのAgent）、CLIパターンはスキップされ、ユーザー/グループの除外のみが適用されます。

:::warning
`*`だけのパターンは、コマンドライン引数を報告するすべてのプロセスに一致します。実質的にこのプロセスのハーベスティングが無効になります。
:::

**動作の仕組み:**

- Workstation Agentは全ユーザーのアイドル時間の監視とレポートを継続します。除外は解放のトリガーのみを抑止します。
- スケジュールされた除外では、ウィンドウが終了した瞬間にハーベスティングが自動的に再開されます。しきい値を超えてアイドル状態が続いているプロセスは、その時点で解放されます。
- 変更は即時反映されます。除外を削除すると、すでにアイドル状態のプロセスが再評価され、長時間アイドルのプロセスが直ちに解放されることがあります。

**ルールと制限:**

- 除外がオンの間は、ユーザー、グループ、CLIパターンのいずれかを1つ以上設定する必要があります。
- スケジュールがオンの場合は、ユーザーまたはグループが1つ以上必要です。CLIパターンはスケジュールを無視するため、CLIパターンだけではスケジュール付き除外の条件を満たせません。
- プロセスの**Consumption Policy Type**（Shadow Licensesタブ）が**Workstation**に設定されている間は、除外を有効にできません。

#### Advanced Settings: System Resource Thresholds

デフォルトでは、アイドル判定はユーザー入力に基づきます。**System Resource Thresholds**をオンにすると、リソース使用量もアイドル判定に含まれます。プロセスは、使用量が以下のしきい値を下回っている場合にアイドルと判定されます。

- **User Usage %**（デフォルト2）
- **Processor Usage %**（デフォルト2）
- **I/O Data Operations/Second**（デフォルト2）

:::tip
実際には処理中のプロセスがアイドルと判定される場合（またはその逆の場合）は、2〜3台のワークステーションで実測値をサンプリングし、実際の使用パターンに合わせてしきい値を調整してください。
:::

### Shadow Licenses

シャドウライセンスを使用すると、ベンダーのライセンスマネージャーを使用しないアプリケーションを含め、あらゆる監視対象アプリケーションにライセンス方式の制御を適用できます。同時使用数の上限、バージョンや指名ユーザーの制限、消費ユニットの解放タイミングを制御できます。

![Edit ProcessのShadow Licensesタブ](/services/process_manager/shadow-licenses.png)
*Shadow Licensesタブ。左が消費ポリシー、右が解放ポリシーです。*

#### 消費ポリシー（Consumption Policies）

これらのポリシーは、新しく起動したプロセスの実行を許可するかどうかと、何を1消費ユニットとして数えるかを決定します。

- **Deny Multiple Versions**
  同じユーザーが同じワークステーション上で、同じベンダーのソフトウェアの異なる設定バージョンを同時に実行することを防ぎます。各バージョンを個別のプロセスとして定義し、それぞれに**Configured Version**を設定してください。このポリシーが有効な場合、同じユーザーとワークステーションで、異なる設定バージョンの同一ベンダーのプロセスがすでに実行されていると、新しいプロセスは拒否されます。トグルがオンの間、**Configured Version**は必須です。

- **Enforce Named User Restriction**
  同じユーザーが複数のワークステーションで同時にアプリケーションを実行することを防ぎます。1台のワークステーション上でのインスタンス数は制限しません。

- **Unlimited Concurrent Instances / Concurrent Instances Limit**
  新規プロセスでは**Unlimited Concurrent Instances**がデフォルトで有効です。オフにすると**Concurrent Instances Limit**（組織全体での最大消費ユニット数）を設定できます。上限を超える新規起動は拒否され、ワークステーション上でアプリケーションがブロックされます。

- **Parent Package**（オプション）
  プロセスを[親パッケージ](#parent-packages)にリンクして、複数のプロセスで1つのプールを共有します。プロセス自体の上限と親パッケージの上限の**いずれか**に達すると、アクセスが拒否されます。

- **Consumption Policy Type**
  何が1ユニットを消費するかを選択します。
  - **Process** — 実行中のインスタンスごとに1ユニットを消費します（3つ起動すれば3ユニット）。
  - **Workstation** — ワークステーションごとに1ユニット。ユーザー数やインスタンス数は問いません。
  - **User at workstation** — ワークステーション上のユーザーごとに1ユニット。同じユーザーが同じマシンで複数起動しても1ユニットです。

:::caution
プロセスのConsumption Policy Typeを変更すると、そのアクティブセッションがすべて削除されます（変更前に確認ダイアログが表示されます）。また、上限値`0`はすべての新規起動を拒否します。無制限にするには**Unlimited Concurrent Instances**トグルを使用してください。
:::

:::note[オフラインエージェントとオンラインエージェント]
消費ポリシーは、**オンライン**のWorkstation Agentが監視するプロセスに対してグローバルに適用されます。**オフライン**のAgentレポートに対しては、Consumption Policy Typeのみがエージェント単位で適用され、拒否チェック（バージョン、指名ユーザー、上限）は実行されません。
:::

#### 解放ポリシー（Release Policies）

これらのポリシーは、アプリケーションを閉じた後に消費ユニットがプールに戻るタイミングを決定します。シャドウライセンスは、解放遅延と現在のバケットの終了時刻の**いずれか遅い方**の時点で解放されます。

- **Release Delay (in minutes)**（デフォルト0）
  プロセスが閉じた後、この猶予時間の間ユニットを保持します。遅延が終わる前にユーザーがアプリケーションを再度開いた場合、同じセッションがそのまま継続されます。アプリケーションの再起動や更新の際のセッション断を防ぐのに便利です。

- **Bucket Duration**（デフォルトNone）
  解放をタイムバケット（UTC基準）に合わせます。
  - **Day** — その日の終わり（UTCの深夜0時）に解放します。
  - **Hour** — 次の正時に解放します。
  - **None** — 直ちに解放します（Release Delayは引き続き適用されます）。

**例:**

- プロセスが**UTC 14:50**に終了、**Release Delay = 20**、**Bucket Duration = None** → **15:10**に解放。
- プロセスが**UTC 14:05**に終了、**Release Delay = 10**、**Bucket Duration = Hour** → **15:00**に解放（バケット終了時刻が14:15より遅いため）。
- プロセスが**UTC 14:55**に終了、**Release Delay = 10**、**Bucket Duration = Hour** → **15:05**に解放（遅延の方がバケット終了より遅いため）。

#### ベストプラクティス

- **アプリケーションの動作に合わせてスコープを選ぶ**: ヘルパープロセスを起動するツールには**Workstation**を、共有マシンには**User at workstation**を使用します。
- **指名ユーザー契約を保護する**: 契約条件に合わせて**Enforce Named User Restriction**を有効にします。
- **短時間の再起動を安定させる**: 小さめの**Release Delay**を設定すると、更新時の閉じる・開き直すによるセッション断を防げます。
- **関連ツールをプールする**: 共通の上限を共有すべきスイート製品には親パッケージを使用します。

## ライセンスフィーチャーとDLLの添付

**Processes**ページでプロセスを選択し、右側パネルの**Features**タブと**DLLs**タブを使用します。

![選択したプロセスのFeaturesタブ](/services/process_manager/features.png)
*選択したプロセスのFeaturesタブ。*

**Features**は、監視対象プロセスをそのプロセスが消費するライセンスフィーチャーに関連付けます。これにより、Agentが報告したアクティビティをライセンスセッションに照合できます（実使用量）。**[Add Feature]** を選択し、**Add All Features**（そのプロセスのベンダーの全フィーチャー）または**Add Specific Feature**（リストから1つ選択）を選びます。このボタンは、**Process managed by a license server**がオンのプロセスでのみ使用できます。

**DLLs**では、アプリケーション内の特定の機能を区別できます。DLLを添付すると、Workstation Agentがそのプロセスによる該当DLLのロードを追跡し、DLLごとの使用状況エントリを生成します（モジュール別・アドオン別の追跡が典型的な用途です）。

![Add DLLダイアログ](/services/process_manager/add-dll.png)
*プロセスへのDLLの追加。*

1. **DLLs**タブを開き、**[Add DLL]** を選択します。
2. DLLファイル名（末尾が`.dll`である必要があります）を入力し、**[Add]** を選択します。

:::tip
アプリケーションが特定の機能でロードするDLLを調べるには、Microsoft Process Explorerなどのツールを使用してください。
:::

## Procedures

プロシージャは、プロセスの解放時にWorkstation Agentが実行する、名前付きの順序付きアクションリストです。プロセスの**Process Release**タブで解放方法に**Procedure**を選択すると、プロシージャをプロセスにバインドできます。

![Proceduresページ](/services/process_manager/procedures.png)
*Proceduresページ。プロシージャを選択するとそのステップが表示されます。*

export function ArcadeEmbed() {
  return (
    <div style={{ position: 'relative', paddingBottom: 'calc(55.31746031746032% + 41px)', height: 0, width: '100%' }}>
      <iframe
        src="https://demo.arcade.software/UwGSZu8Lo5xTu0eZMael?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
        title="Process Managerで新しいプロシージャを作成"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
    </div>
  )
}

<ArcadeEmbed />

プロシージャを作成するには次のようにします。

1. **Procedures**ページに移動し、**[Add Procedure]** を選択します。
2. 一意の**Procedure Name**を入力します。
3. **[Add Agent Step]** を選択します。**Add Action**ダイアログで**Action Type**を選択します。
   - **Agent kill** — 保存せずにアプリケーションを強制終了します。未保存の作業は失われます。
   - **Agent suspend** — アプリケーションをフリーズします。ユーザーはPersonal Dashboardから再開します。
   - **Agent save and close** — ユーザーの作業を保存してからアプリケーションを閉じます。
4. **Execution Condition**を選択します。最初のステップは常に即時実行（**No wait**）です。2番目以降のステップは、前のステップの完了後（**Wait complete**）または成功時のみ（**Wait success**）に実行されます。
5. **Agent save and close**では、**'Save dialog' Title or Identifier**を入力できます。通常は空欄のままで構いませんが、一部のアプリケーション（ArcGIS ProやMATLABなど）では、Agentがデフォルトで保存ダイアログにアクセスできません。その場合は、ダイアログのウィンドウタイトル（一部または全部）またはその識別子を入力してください（識別子はウィンドウ検査ツールで確認できます）。
6. **[Add]**、続いて **[Save]** を選択します。

![Agent save and closeアクションを選択したAdd Actionダイアログ](/services/process_manager/add-action.png)
*Agent save and closeステップの追加。*

各プロシージャには**Enabled**トグル、各ステップには**Status**トグルがあり、削除せずに一時的にオフにできます。プロセスに添付されているプロシージャは削除できません。先にプロセスから切り離してください。

:::danger
**Agent kill**は保存せずにアプリケーションを閉じるため、データ損失につながる可能性があります。使用には注意してください。
:::

## Parent Packages

親パッケージを使用すると、複数のプロセスが同じシャドウライセンス消費上限を共有できます。たとえば、関連ツール群で100ユニットのプールを1つ共有する、といった構成です。

![Parent Packagesページ](/services/process_manager/parent-packages.png)
*Parent Packagesページ。*

1. **Parent Packages**ページに移動し、**[Add Parent Package]** を選択します。
2. 一意の**Package Name**と**Package Limit**を入力し、**[Save]** を選択します。
3. 各プロセスの**Shadow Licenses**タブの**Parent Package**フィールドで、プロセスをパッケージに添付します。

すべての消費ユニットは、プロセス自体の上限とパッケージの上限の両方にカウントされます。**いずれか**に達すると新規起動は拒否されます。パッケージを削除すると、すべてのプロセスから自動的に切り離され、各プロセスは自身の上限に戻ります。

## Active Sessions

**Active Sessions**ページには、Workstation Agentがインストールされたワークステーションで現在実行中のセッションが表示されます。1分ごとに自動更新されます。

列には**Process Name**、**Hostname**、**Username**、**Idle Time Duration**、**Idle Time Start**、**Release Method**、**Automatic License Release**が含まれます（**Process Start Time**と**Last Report Time**列はオプションで表示できます）。

- セッションを手動で解放するには、行の解放アイコン（**Execute Release Method**）を選択します。このアイコンは、**Process Release**トグルがオンで解放方法が**None**以外のプロセスのセッションにのみ表示されます。
- **Usage** > **Currently Consumed Licenses**から遷移した場合、選択したセッションでフィルタリングされた状態でページが開きます。

データが表示されない場合は、そのマシンにWorkstation Agentがインストールされていない、インストール済みのAgentがオフラインである、または対象のライセンスがボローされていてソフトウェアが現在使用されていない、のいずれかが考えられます。

## 監視レポート

### ネットワークフローティングライセンスの使用状況

- **Currently Consumed Licenses**（Usage） — アイドル時間を含みます。
- **License Activity**（Usage） — アイドル時間を除きます。
- **Active Sessions**（Process Manager） — 監視対象ワークステーション上のライブセッション。
- **Process Sessions** — アイドル/アクティブ区間を含む過去のプロセスセッション。
- BIツールによる詳細レポート。

### スタンドアロンアプリケーションの使用状況

- **Active Sessions**（Process Manager）。
- **Process Sessions**。

:::note
Usageサービスには、スタンドアロンアプリケーションの使用状況は表示されません。
:::

## トラブルシューティング

| 問題 | 解決方法 |
|---|---|
| **Process Release Exclusion**トグルがグレーアウトしている | まずタブ上部の**Process Release**トグルをオンにしてください。 |
| 保存できない: 「Harvesting Exclusions cannot be enabled when Shadow License Consumption Policy is set to Workstation」 | **Shadow Licenses**タブの**Consumption Policy Type**を変更するか、除外をオフにしてください。 |
| 除外を保存できない: 「At least one username, group, or command-line argument pattern must be excluded when Harvesting Exclusions are enabled」 | **+**ボタンでユーザー、グループ、またはCLIパターンを1つ以上追加してください。ドロップダウンで名前を選択しただけでは追加されません。 |
| 除外を保存できない: 「At least one username or group must be excluded when the exclusion schedule is enabled」 | CLIパターンはスケジュールを無視するため、スケジュール付き除外にはユーザーまたはグループが1つ以上必要です。追加するか、スケジュールをオフにしてください。 |
| 解放方法に**Suspension**や**Extension**が表示されない | **Process managed by a license server**（Generalタブ）をオンにしてください。**Extension**はさらに対応アプリケーションであることが必要です。 |
| MATLABで**Idle Time Limit**に小さい値を設定できない | MATLABでは、解放方法が**None**または**Extension**以外の場合、最小15分が必要です。 |
| **[Add Feature]** が無効になっている | プロセスの**Process managed by a license server**をオンにする必要があります。 |
| 除外したユーザーのプロセスが解放された | 除外スケジュールを確認してください。ユーザー/グループの除外はスケジュールの時間帯内でのみ適用されます。一方、CLIパターンは常時適用されます。 |
| CLIパターンが一致しない | そのマシンのWorkstation Agentがコマンドライン引数を報告していない可能性があります。Agentを更新してください。 |
