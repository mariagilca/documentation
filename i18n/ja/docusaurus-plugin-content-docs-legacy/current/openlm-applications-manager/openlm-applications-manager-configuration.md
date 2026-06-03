---
title: "Applications Managerの設定"
description: "OpenLM Applications Manager は、ライセンス方式を問わず組織内のあらゆるソフトウェアの使用を監視および制御する Java アプリケーションです。"
sidebar_position: 5
---
OpenLM Applications Manager は、ライセンス方式に関係なく組織内のあらゆるソフトウェア使用状況を監視・制御する Java アプリケーションです。本ドキュメントでは OpenLM Applications Manager の設定手順を説明します。

Applications Manager の主な機能は次のとおりです:

- OpenLM Workstation Agent から、エンドユーザーのワークステーションでのアクティブプロセスやソフトウェア起動情報を取得する
- 特定のルールや設定に従って OpenLM Workstation Agent にソフトウェア起動を実行させる

Applications Manager は、エンドユーザーのワークステーションにインストールされる軽量コンポーネントである OpenLM Workstation Agent と連携します。Workstation Agent の機能は次のとおりです:

- ワークステーション上で動作しているプロセスを監視する
- ソフトウェア起動イベントを検知・報告する
- 管理者が定義したアクションに基づき、特定プロセスの実行に介入する

Applications Manager は、ライセンスマネージャーで管理されないアプリケーションや、ライセンスマネージャーに高度な管理機能がない場合にも管理機能を追加します。

ワークステーションライセンスをライセンスマネージャーで直接管理できない場合（例: シングルライセンスやネームドライセンス）でも、OpenLM Applications Manager を使うことでソフトウェア使用状況を監視できます。これにより、OpenLM はライセンスマネージャーで管理されるソフトウェアと、スタンドアロンライセンスを持つソフトウェアを同時に監視できます。

## 必要な OpenLM コンポーネントのインストール

OpenLM Applications Manager の動作には以下のコンポーネントが必須です:

- **OpenLM SLM**: OpenLM Applications Manager および関連コンポーネントの設定を行う管理インターフェイス（EasyAdmin）を提供し、ライセンス使用情報をデータベースに保持し、レポートのプラットフォームを提供します。インストールの詳細は [OpenLM SLM Installation Guide](../openlm-slm/index.md) を参照してください。
- **OpenLM Workstation Agent**: 監視対象のエンドユーザーすべてのワークステーションにインストールする必要があります。ユーザーのワークステーション上のソフトウェア活動を監視するエンドユーザープロキシです。インストールの詳細は [OpenLM Workstation Agent Installation](../eus/index.md) を参照してください。
- **OpenLM Broker** と **OpenLM Applications Manager**: 同じ Windows または Linux マシンにインストールする必要があります。OpenLM Broker は OpenLM SLM からの指示に従って動作し、ライセンスマネージャーから高度なライセンス情報を返します。

## OpenLM Workstation Agent の設定

1. Workstation Agent を設定する前に OpenLM Applications Manager をインストールしてください。インストール手順は [OpenLM Applications Manager installation document](../openlm-applications-manager/index.md) を参照してください。
2. [OpenLM Web サイト](https://www.openlm.jp/downloads/)から最新の Workstation Agent をダウンロードしてインストールします。

## OpenLM Applications Manager の設定

設定を進める前に、Applications Manager が OpenLM Broker の設定で検出・構成されていることを確認してください。Broker は OpenLM SLM に接続し、報告できる状態になっている必要があります。

以下では OpenLM Applications Manager の設定オプションと機能について説明します。

### OpenLM Applications Manager にアプリケーションを追加

アプリケーションは EasyAdmin のユーザーインターフェイスから手動で追加できます。以下は EasyAdmin User Interface を使用して Applications Manager にアプリケーションを追加する手順です:

1. OpenLM EasyAdmin User Interface を開きます（**Windows Start → OpenLM → OpenLM EasyAdmin User Interface**）。

2. **EasyAdmin Start Menu** から **Administration** を選択します。

3. **OpenLM Applications Manager** をクリックします:

![スクリーンショット: an application to OpenLM Applications Manager の追加](/img/legacy/word-image-26657-1.png)

4. 表示された **Applications** ウィンドウで **Add** ボタンをクリックします:

![スクリーンショット 2: an application to OpenLM Applications Manager の追加](/img/legacy/word-image-26657-2.png)

5. 追跡したい対象に応じて Tracking Type をドロップダウンから選択します: *Process*、*File*、または *Folder*。

- **Process** - プロセス名でアプリケーションを追跡します。多くの場合、.exe 拡張子を除いた実行ファイル名と同じです。追跡したいアプリケーションのプロセス名を確認するにはアプリケーションを起動し、*Windows Start → Task Manager* を開いて対象プロセス名を確認してください。
- **File** - 特定の実行ファイルの起動を監視してアプリケーションを追跡します。Process と同様です。
- **Folder** - 特定フォルダ内の実行ファイル起動を監視して追跡します。

![スクリーンショット 3: an application to OpenLM Applications Manager の追加](/img/legacy/word-image-26657-3.png)

6. テキストフィールドを以下のように入力します。アスタリスク付きの項目は必須です:

**Application Name\*** - 追跡対象アプリケーションの一意な名称

**Process Name\*** - アプリケーションのプロセス名と一致する必要があります。

**File Path\* / Folder Path\*** - Tracking Type を "File" または "Folder" にした場合、追跡したいファイルまたはフォルダのフルパスを入力します。

**Description\*** - 対象のプロセス/ファイル/フォルダの目的を把握するための説明

**Vendor\*** - ドロップダウンからベンダーを選択、または新規入力

**Version** - アプリケーション識別や複数バージョン管理のためのバージョン番号

**Parameters** - 追跡対象アプリケーションの起動時パラメータ。同一プロセス名でも引数で機能が変わるアプリケーションに使用します。

**Enabled** - このアプリケーションの追跡を有効/無効にします。

**Limit\*** - アプリケーションごとの同時起動数の上限。既定は "Unlimited"。0 を設定するとすべての起動をブロックします。

**License Return Policy** - ライセンスをプールへ返却するタイミングを定義するルールセット。

**License Consumption Policy\*** - 複数バージョンの起動を拒否するか、複数ライセンス使用をどうカウントするかなど、アプリケーション利用ルールを定義します。

![スクリーンショット 4: an application to OpenLM Applications Manager の追加](/img/legacy/word-image-26657-4.png)

7. "Save" をクリックして新しいアプリケーションを追加します。

### 既存のアプリケーション設定の編集

設定済みのアプリケーションを編集するには、アプリケーションの行を選択し、Applications Manager ウィンドウで "Edit" をクリックするか、該当行をダブルクリックします。設定項目は「アプリケーションを追加」のセクションと同じです。

### "Filtered Vendors" 機能の使用

***Filtered Vendors*** ボタンを使うと、フローティングとスタンドアロンの両方のライセンス形態があるソフトウェアを監視する際に、二重レポートを防げます。

ユーザーのマシン上のソフトウェアがライセンスマネージャー（例: FlexLM）に接続しつつ、スタンドアロンライセンス（例: 単体の登録キー）でも動作できる場合があります。通常、ライセンスマネージャー（OpenLM Broker/SLM 経由）と OpenLM Applications Manager の両方で監視していると、起動時に両方へ使用状況が報告されてしまいます。"Filtered Vendors" 機能はこれを防ぎ、Applications Manager にはスタンドアロンライセンスのみが報告されるようにします。

"stand-alone license" は次のいずれかを指します:

- 登録キーやローカルライセンスによる単体インストールソフトウェア
- ライセンスマネージャーでは報告されないノードロックライセンス
- クラウドマネージャーで割り当てられるが監視されないネームドライセンス
- 管理者の同意なしにインストールされた違法ソフトウェア
- OpenLM SLM がサポートしないネットワークライセンス

**既知の制限事項**

- 監視対象ソフトウェアが、同一ユーザー・同一ワークステーションでネットワークライセンスかスタンドアロンライセンスのいずれかを使用するという前提に基づいています。
- 両方のライセンス形態を持つソフトウェアは、Applications Manager ではネットワークライセンスとして扱われます。そのためスタンドアロンライセンスのセッションは報告されません。
- ワークステーション上でライセンス方式を切り替えると（ネットワークからスタンドアロン、またはその逆）、一部の期間で誤った使用状況が報告される可能性があります。
- ベンダーフィルターは同じベンダー名を持つ複数アプリケーションを区別できません。同じベンダー名のアプリケーションをフィルターする必要がある場合は、アプリごとに異なるベンダー名を割り当てることを推奨します。

1. **Filtered Vendors** ボタンをクリックして Filtered Vendors 画面を開きます:

![スクリーンショット: Using the "Filtered Vendors" functionality](/img/legacy/word-image-26657-5.png)

2. ドロップダウンリスト付きの新しいウィンドウが表示されます。**Add** をクリックし、ドロップダウンから対象のベンダーを選択します（利用可能な製品一覧から自動的に生成されます）。

![スクリーンショット 2: Using the "Filtered Vendors" functionality](/img/legacy/word-image-26657-6.png)

3. **Save** をクリックして変更を保存します。

これでフィルタリング設定は完了です。次のいずれかが発生します:

- フィルタリング対象ベンダーのソフトウェアがライセンスマネージャーで制御され、ライセンスが消費される場合（例: フローティングライセンス）は、使用状況は OpenLM SLM のみで報告されます。
- フィルタリング対象ベンダーのソフトウェアがライセンスマネージャーで制御されておらずライセンスが消費される場合（例: クラウドライセンス、単一ユーザーのスタンドアロンライセンス、違法ソフトウェア）は、使用状況は OpenLM Applications Manager から報告されます。

**注:** フローティングライセンスを消費しているユーザーで、過去 72 時間にライセンスマネージャーからの使用状況報告がない場合、そのライセンスはフローティングではなく単一ユーザーとしてログ記録されます。フローティングとスタンドアロンの切り替え期間（10 分未満）では、両方のタイプとしてカウントされ、OpenLM SLM と Applications Manager の両方のレポートに表示される可能性があります。

### License Consumption Rules Table でルールを定義

**License Consumption Rules Table** を使うと、ライセンスに対するさまざまなアクセスルールを定義できます。ルールは "Decision Table" として実装されます。**License Consumption Rules Table** ボタンをクリックして開きます:

![スクリーンショット: Defining rules with the License Consumption Rules Table](/img/legacy/word-image-26657-7.png)

#### 新しいルールの追加

1. 既定の **Rule Name** は "Everyone" で、**Actions** は Deny に設定されています。

![スクリーンショット: a new rule の追加](/img/legacy/word-image-26657-8.png)

2. これはセキュリティ上の既定値であり、アプリケーションの起動を許可したり新しいルールや条件を作成するには **Allow** に設定する必要があります。あるいは、左側のチェックボックスを選択して **Delete Rule** をクリックし、このルールを削除することもできます。

3. **New Rule** をクリックし、名前（例: ***Windows Media Player is not allowed***）を入力し、***Deny*** または ***Allow*** を選択して結果を設定します（例: ***Deny***）。

![スクリーンショット 2: a new rule の追加](/img/legacy/word-image-26657-9.png)

**注:** 赤い三角のインジケータは未保存の変更を示します。**Save** ボタンで保存してください。

#### ルールに新しい条件を追加

1. 新規または既存のルールに条件を追加するには **New Condition** をクリックします:

![スクリーンショット: a new condition to a rule の追加](/img/legacy/word-image-26657-10.png)

**Condition Editor** ウィンドウが表示されます。条件を作成するには、引数を選択し、操作タイプを選択し、比較値を入力します。

![スクリーンショット 2: a new condition to a rule の追加](/img/legacy/word-image-26657-11.png)

2. **Argument** の各項目の説明:

**Time** - ルールを時間条件にします。*after* と *before* は時刻ベースで、*matchesCron* は CRON 式でルールを定義します。CRON の構文は Linux の CRON と少し異なる点に注意してください（[詳細](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html)）。

*Example:*

time after 9:00

time before 18:00

time matchesCron * * 15 9 6 ?

**Application** - 特定のアプリケーションにルールを紐付けます。*equal*、*startsWith*、*endsWith* の操作は、OpenLM Applications Manager の設定ウィンドウで設定したアプリケーション名/製品名に対して評価されます。

*Example:*

application equals AutoCAD 2016

application equals MicroStation

application startsWith AutoCAD

application endsWith 2016

**Username** - 1 人以上のユーザーアカウントにルールを関連付けます。*equals* は完全一致、*startsWith* と *endsWith* はワイルドカードとして機能します。

*Example:* NY オフィスのユーザー名には _NY のサフィックスが付いている場合、次の条件で該当ユーザーに適用できます。

username endsWith _NY

**Workstation** - 特定のワークステーションにルールを関連付けます。比較はワークステーション名で行います。

*Example:* デスクトップ PC の名前が "DESKTOP-" で始まる場合、次の条件で適用できます。

workstation startsWith DESKTOP-

**Groups** - OpenLM の Groups コンポーネントで定義された特定グループのユーザーにルールを関連付けます。

*Example:* "engineering" グループに適用する条件

groups include engineering

または、グループ未所属ユーザー向けの条件

groups empty

**Version** - 特定のソフトウェアバージョンにルールを関連付けます。これは Applications Manager にアプリケーションを追加したときの Version 値と比較されます。

*Example:*

version equals 5.0

version startsWith 5

version endsWith 2019

**Vendor** - 特定ベンダーにルールを関連付けます。ベンダー値は Applications Manager でアプリケーションを追加したときの Vendor 値と比較されます。

*Example:*

vendor equals Autodesk

vendor equals Bentley

3. **Argument** に対して **Select an operation** を選択します。操作の選択肢は選択した **Argument** によって異なります:

![スクリーンショット 3: a new condition to a rule の追加](/img/legacy/word-image-26657-12.png)

4. **Compared value** フィールドに値を入力します。**time** 引数を除き、この値は Applications Manager リストで設定した値と完全一致または部分一致（*startsWith*、*endsWith* 使用時）する必要があります。**値の比較は大文字/小文字を区別しません。**

例では、"Windows Media Player is not allowed" ルールに一致させるため、条件タイプを *application*、操作を *equals*、比較値を Applications Manager リストで定義された *windows media player* に設定します。

![スクリーンショット 4: a new condition to a rule の追加](/img/legacy/word-image-26657-13.png)

**注**: Application 名、Version、Vendor は Applications Manager で定義した値です。Groups は OpenLM システムに存在するグループが自動的に表示されます。Username と Workstation は OpenLM Workstation Agent が報告した値と一致します。

5. **Save** ボタンをクリックして新しい設定を保存します。**License Consumption Rules Table** 画面に新しい **Conditions** 列が追加されます。

6. 追加された列の **Conditions** のチェックボックスを、関連付けたいルールに対してチェックします。

![スクリーンショット 5: a new condition to a rule の追加](/img/legacy/word-image-26657-14.png)

この例では、監視対象の Agent/ワークステーションで関連付けられたプロセス、ファイル、フォルダが起動されるたびに、Applications Manager は *windows media player* の起動をチェックします。条件に一致した場合、Actions 列の値に応じて起動を **Deny** または **Allow** します。

#### 条件のテスト

新しい条件が適用されているかテストするには、**Deny** が設定されたアプリケーションを起動します。この例では *Windows Media Player* です。ユーザーがアプリケーションを起動しようとすると、汎用の拒否メッセージが表示されます。

既定メッセージや実行スクリプトは、*Allow* または *Deny* のアクション列をダブルクリックしてカスタマイズできます。**Action Editor** 画面が表示され、「新しいアクションの追加」セクションと同じ設定が行えます。

#### 新しいアクションの追加

1. **New Action** をクリックして Action Editor 画面を開きます:

![スクリーンショット: a new action の追加](/img/legacy/word-image-26657-15.png)

2. 次の項目を設定します:

**Name**:

**Allow** - ライセンスが正常に付与されたときに実行されるアクション。

**Deny** - ライセンスが拒否されたときに実行されるアクション。

**Script**:

この項目は OpenLM SLM ライセンスに Custom Commands 機能が含まれている場合にのみ利用できます（[営業へ問い合わせ](https://www.openlm.jp/contact-us/)）。Windows Shell スクリプト形式のコマンドを入力します。スクリプトで実現できる機能例:

- 警告などのカスタムメッセージ表示
- レジストリ変更によるライセンス管理
- 任意のプログラムやプロセスの自動起動

カスタムコマンドの詳細は [Using Custom Commands document](https://www.openlm.jp/docs/custom-commands/) を参照してください。

**Run At:**

**Application**:

- Agent Application ドメインで実行されるスクリプト向け（画面表示やユーザー操作など）。
- スクリプトは現在のユーザー権限で実行されます。
- System 所有タスクには影響できません。

**Service**:

- Agent Service ドメインで実行されるスクリプト向け（バックグラウンド処理や静かな手続きなど）。
- スクリプトは System ユーザー権限で実行されます。
- ユーザー設定にはアクセスできません。
- User 所有タスクには影響できません。

3. **Save** をクリックして変更を保存します。**License Consumption Rules Table** ウィンドウの右側に新しい **Actions** サブ列が追加されます（例: 追加された Deny 列）。

**注:** 1 つのルール名に対して複数のアクションを設定できます。たとえば Application と Service の両方を実行することが可能です。不要な列を削除するには、列ヘッダー（例: Allow または Deny）を選択し、Action Editor ウィンドウで **Delete** をクリックします。

4. 追加した列の **Deny** にチェックを入れます。

5. **Save** をクリックして変更を保存します。これ以降、条件に一致した拒否イベントでスクリプトが実行されます。

**注:** 複数のルールが同時に一致する場合、OpenLM Applications Manager は条件数が最も多いルールを優先します。例えば、AutoCAD を全員に許可するルールがある場合でも、JohnDoe だけ例外にしたい場合は、同じ条件に加えて username JohnDoe の条件を追加したルールを作成します。条件数が多いため、そのルールが優先されます。

#### 3.4.5 既存のアクションまたは条件の編集

1. 既存のアクションまたは条件を編集するには、ラベル（例: **Conditions** の "application starts with Windows media player"、または **Actions** の "Allow/Deny"）をクリックします:

![スクリーンショット: 3.4.5 Editing an existing action or condition](/img/legacy/word-image-26657-16.png)

2. **Condition Editor** または **Action Editor** が表示されるので、設定を変更します:

![スクリーンショット 2: 3.4.5 Editing an existing action or condition](/img/legacy/word-image-26657-17.png)

### License Return Policies の設定

1. アプリケーション終了時の動作を定義するルールセットは、OpenLM Applications Manager ウィンドウ下部の ***License Return Policies*** タブで設定します:

![スクリーンショット: License Return Policies の設定](/img/legacy/word-image-26657-18.png)

各フィールドの説明は以下のとおりです:

**Name** - アプリケーションにポリシーを関連付けるための一意の名前。

**Agent Heartbeat Timeout (min)** - OpenLM Agent がハートビート送信を停止した後、Applications Manager がライセンスを保持し続ける時間（分）。ハートビートは 1 分ごとに送られ、ワークステーション上の監視対象アプリケーション一覧が含まれます。これにより、イベント取りこぼしがあっても状態を同期します。タイムアウトに達すると、その Agent に関連するライセンスはすべて解放されます。

**Hibernating** - 既定では、ワークステーションがシャットダウンされると OpenLM Agent が全セッション終了メッセージを送信し、ライセンスを解放します。このチェックを有効にすると、Sleep/Stand By/Hibernate に入った場合も同様に即時解放されます。無効の場合はハートビートタイムアウト後に解放されます。

**Bucket Duration** - 主に Bentley の trusted licensing モデルに使用されます。**DAY**、**HOUR**、**NONE** を設定できます。カレンダー時間内でライセンスが消費されると、その時間の終了までライセンスが消費されたままになります。

Bucket Duration が **DAY** の場合、Applications Manager は深夜にのみライセンスを解放します。

Bucket Duration が **HOUR** の場合、毎時 0 分（0:00、1:00、2:00...）にライセンスが解放されます。

**Release Delay (min)** - アプリケーション終了イベントからライセンスをプールに戻すまでの遅延時間（分）。この間はライセンスがユーザーに予約されたままです。ユーザーが遅延時間内に再度アプリケーションを起動すると、Applications Manager は前回セッションを継続し、OpenLM SLM 上では 1 セッションとして表示されます。

Bentley の trusted licensing モデルで時間単位のバケットを使用する場合、Bentley の最小セッション長が 10 分であるため、Release Delay は 11 分、Bucket Duration は **NONE** に設定することを推奨します。これは 50 分を超えるセッションが少なくとも 2 バケットを消費することを意味します。

2. **License Return Policies** タブ右上の **Save** をクリックして変更を保存します。

## License Consumption Policies の設定

1. **License Consumption Policies** タブでは、アプリケーション起動イベントが検知されライセンスが消費される際の動作を設定します:

![スクリーンショット: Setting up License Consumption Policies](/img/legacy/word-image-26657-19.png)

**Name** - アプリケーションとポリシーを関連付けるための一意の値。

**Deny multiple versions** - Autodesk 製品の二重ライセンス消費を防ぐための設定です。Autodesk のスイートライセンスでは、複数の Autodesk 製品を実行しても消費ライセンスは 1 つで済みます。しかし同一製品の異なるバージョン（例: Autodesk 2017 と Autodesk 2016）を同時に実行すると、ライセンスマネージャーは 2 ライセンスを消費します。

このチェックを有効にすると、同じベンダー名でバージョンが異なる別アプリケーションの起動を Applications Manager がブロックします。

バージョンは Version フィールドの値、または Name/Description に含まれる年次サフィックスで判定されます。多くの Autodesk 製品は名称に年次サフィックスを含みます（例: AutoCAD 2017）。

*Example:*

AutoCAD と 3DS MAX をスイートで購入している場合、"Deny multiple version" を有効にした License Consumption Policy では次のルールになります:

AutoCAD 2016 が実行中の場合、AutoCAD 2015 の起動は拒否されます。

3DS MAX 2016 が実行中の場合、3DS MAX 2015 の起動は拒否されます。

現行の OpenLM Applications Manager はスイート構成をサポートしていませんが、この機能は Vendor 名に基づきます。回避策として、複数のスイートや製品群を区別するためにベンダー名を分けて設定することができます。

**License Consumption Policy** - ライセンス消費対象に適用されます。ドロップダウンをダブルクリックして以下のいずれかを選択します:

![License Consumption Policy options](/img/legacy/license-consumption-policy-options.png)

**Single license per application process** - 消費対象を "Application Process" にした場合、同一ワークステーションであってもアプリケーションの各インスタンスが 1 ライセンスを消費します。

**Single license per workstation** - 消費対象を "Workstation" にした場合、ライセンスはワークステーションに紐付きます。同じ PC を異なるユーザーが使っても同じライセンスを消費します。Bentley のライセンスモデルで使用されます。

**Single license per user on the workstation** - 最も一般的なポリシーです。ライセンスはユーザーに割り当てられます。複数ユーザーが同じワークステーションを共有していても、それぞれのライセンス使用セッションが Applications Manager に報告されます。

**Parent Package** - 異なるアプリケーション間で共有ライセンスプールを利用できる機能です。これにより、OpenLM SLM ではアプリケーションごとに監視・レポートしつつ、使用上限はライセンス数と同じになります。"**Parent Package**" には、Applications Manager で既に設定済みの別アプリケーション名を指定します。

この結果、"Parent Package" を含むポリシーに関連付けられたアプリケーションをユーザーが起動すると、そのアプリケーションと Parent Package の両方に対してライセンス消費がカウントされます。

*Example:*

"AutoCAD 2017" を Applications Manager にスタンドアロンアプリケーションとして設定します。

"AutoCAD" という新しい License Consumption Policy を作成し、Parent Package に "AutoCAD 2017" を設定します。

"AutoCAD Map 3D 2017" を別のアプリケーションとして追加し、先ほどの "AutoCAD" ポリシーを割り当てます。

ユーザーが "AutoCAD Map 3D 2017" を起動すると、Applications Manager は 2 ライセンス消費として報告します（"AutoCAD 2017" と "AutoCAD Map 3D 2017"）。

2. **License Consumption Policies** タブ右上の **Save** をクリックして変更を保存します。
