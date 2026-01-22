---
title: "OpenLM Workstation Agent のインターフェース - Personal Dashboard"
sidebar_position: 1
---
OpenLM は、さまざまな同時使用ライセンスマネージャー向けのソフトウェアライセンス監視ツールです。ライセンス使用の最適化やアプリケーション使用管理のための生産性向上ツールを提供します。

OpenLM には主に 2 つのユーザーインターフェースがあります:

- EasyAdmin Web アプリケーションはマネージャーとシステム管理者向けです。
- Personal Dashboard はエンドユーザー向けです。本ドキュメントでは後者を説明します。

Workstation Agent は、エンドユーザーのワークステーションにインストールされる軽量の任意ソフトウェアコンポーネントです。エンドユーザーを支援する機能を提供し、システム管理者への依存を減らします。Workstation Agent は組織ネットワークに悪影響を与えるリスクはなく、エンドユーザーの操作を業務領域に応じた安全な範囲に限定します。Workstation Agent の全機能を利用するには、Workstation Agent と別マシン（OpenLM SLM と同一でも可）に OpenLM End-User Services を事前にインストールすることを推奨します。これにより、End-User Services に含まれる Personal Dashboard（Web インターフェース）を通じて Workstation Agent と連携できます。

## Workstation Agent が提供する機能

Workstation Agent はさまざまな生産性向上ツールを提供し、作業環境の多くの側面に影響します。

## ライセンスは誰が使っている？

エンドユーザーは、必要なライセンスを誰が使用しているかを確認し、その人に連絡できます。

## アイドルか稼働中か？

アイドルセッションは監視され、OpenLM EasyAdmin 上でグラフ表示されます。詳細は [Monitoring Idle Application time.](../../openlm-slm-features/license-harvesting/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a.md) を参照してください。

### 手動でアプリケーションを終了

管理者は特定のアプリケーションを手動で終了したり、ライセンスをプールに戻したりできます。[Retrieving licenses manually via the CCL window](../../openlm-slm-features/license-harvesting/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a.md)

## アイドルライセンスの自動回収

Workstation Agent は、ソフトウェアアプリケーションを自動で終了し、同時使用ライセンスを回収するさまざまな方法を提供します。詳細は以下のアプリケーションノートを参照してください:

- [License retrieval of idle applications - Enhanced Agent procedures](../../openlm-slm-features/license-harvesting/license-retrieval-of-idle-applications-enhanced-workstation-agent-procedures.md)
- [License retrieval of idle applications (MATLAB, Autodesk, ArcGIS, Solidworks, Catia) - Save and Close](../../openlm-slm-features/license-harvesting/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close.md)
- [License retrieval of idle FlexLM applications - Suspend and Resume](../../openlm-slm-features/license-harvesting/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c.md)

.

## 管理外ライセンス

OpenLM は多種多様なライセンス対象アプリケーションを監視し、特定のライセンスサーバーに直接問い合わせてライセンス使用状況を取得します。OpenLM は可能な限り多くのライセンスサーバータイプをサポートするよう努めていますが、専用のインターフェースで使用状況を取得できないタイプが存在することもあります。

そのような場合、Workstation Agent を使用してエンドユーザーのワークステーション上で使用状況を収集します。OpenLM ではこの機能を "Unmanaged licenses" の監視と呼びます。詳細は [Working with Unmanaged Licenses](https://www.openlm.com/knowledge-base/working-with-unmanaged-licenses-kb4035/) を参照してください。

## ライセンス管理

OpenLM Applications Manager は、ベンダーのライセンスマネージャーのためのシェルとして機能します。ベンダーのライセンスマネージャーでは提供されない高度なライセンス管理機能を提供します。

これはユーザーの利益を最優先に設計されており、ソフトウェアの制御をユーザーに戻すことを目的としています。

OpenLM Applications Manager は Workstation Agent を介してエンドユーザーのワークステーションと連携します。Agent は事前設定に従ってアプリケーションの起動をインターセプトするように構成できます。

## プロジェクト

OpenLM は、プロジェクト単位でライセンス使用状況を記録するように構成できます。Workstation Agent はエンドユーザーに対して、現在のアクティブプロジェクト名を入力するよう促したり、メニュー項目からプロジェクト名を選択させたりできます。設定が変更されるまで、そのワークステーション上のライセンス使用は選択したプロジェクトに紐づきます。

プロジェクト単位のライセンス使用記録については、[License Usage Monitoring According to Projects](../../openlm-slm-features/openlm-project-usage.md) を参照してください。

### ArcGIS ライセンスレベル

OpenLM は ESRI ArcGIS の経験者によって開発されており、ArcGIS 向けの利点が残っています。その 1 つが ArcGIS ライセンスレベルの設定です。

## 通知

Personal Dashboard ユーザーは、OpenLM Workstation Agent からのブラウザ通知を受け取ることができます。

これはブラウザのネイティブ通知であり、ブラウザが開いている限り表示されます。受信するには、Personal Dashboard UI にアクセスした際に通知の表示を許可する必要があります:

![](/img/legacy/notification.png)

*ブラウザ通知*

ユーザーが **Allow** をクリックし、ネットワークが閉じていない（外部 API への接続が許可されている）場合、Workstation Agent から通知を受信します。そうでない場合、通知システムは SignalR ベースの WebSocket にフォールバックし、アプリ内の Toast 形式でのみ表示されます。

![](/img/legacy/diagram.png)

*通知システムの仕組みの図*

Firefox では、"Allow notification" ポップアップはユーザーの操作でトリガーする必要があるため、まずダイアログを表示します。そのダイアログにはリクエスト許可ボタンがあり、クリックすると通知ポップアップが表示されます。

![](/img/legacy/notification-example.png)

*通知の例*

次のイベントで通知がトリガーされます:

- プロセスが解放されたとき
- ユーザーがアクティブプロジェクトを選択する必要があるとき（現在の選択プロジェクトを含み、別のプロジェクトを選択できるバリエーションもあります）
- アプリが実行禁止になったとき

最新の Agent では、プロジェクト選択に関連する通知を受け取った際に、新しいブラウザタブ（デフォルトブラウザが開いていない場合は新しいブラウザウィンドウ）を強制的に開くこともできます。

### その他の通知

以前はライセンスがすべて割り当て済みだったが後で空きが出た場合、ユーザーはそのライセンスの取得を試みることができます。このプロセスは EasyAdmin で構成できます:  
![Image](https://openlm.visualstudio.com/5cf556e4-c450-4544-9abc-f7f009c0b615/_apis/wit/attachments/413d5b9b-cb59-416c-ae87-5358f146ab49?fileName=image.png)

Available license notification/reservation period: ライセンス取得を試みた時点で空きがなかったが、x 分以内に空きが出た場合、ユーザーに通知が送信されます。

別のユーザーからライセンス解放を依頼された場合、Personal Dashboard の以下の場所からトリガーできます:

![Image](https://openlm.visualstudio.com/5cf556e4-c450-4544-9abc-f7f009c0b615/_apis/wit/attachments/a04c6313-d1b9-40ba-bf21-7d94bcbcea61?fileName=image.png)

"Send In-App Request" 機能を使うと、ボタンをクリックして別のユーザーにライセンス解放を依頼できます。この操作は 3 分に 1 回実行できます。

## 追加情報

Workstation IP などの追加情報は Agent によって OpenLM SLM に送信されます。

## インストール

Workstation Agent は OpenLM サイトの [Downloads](https://www.openlm.com/download/) から入手できます。各ワークステーションに手動でインストールするか、スクリプトでサイレント配布することができます。

インストール時に、対応アプリケーション向けの OpenLM 拡張を追加するかどうかを選択する場合があります。執筆時点では ArcGIS、Autodesk、MATLAB が含まれます。OpenLM 拡張は、アイドルセッションの保存と終了、ArcGIS 管理などの追加機能を提供します。

前述のとおり、OpenLM はアクティブプロジェクトに基づいてライセンス使用状況を記録できます。エンドユーザーはアクティブプロジェクト名を作成するか、ドロップダウンリストから選択するよう促される場合があります。

![](/img/legacy/word-image-212.png)

Personal Dashboard の "Project" ページと "Add project" ボタンは既定では非表示です。表示するには EasyAdmin Web アプリケーションで Start → Administration → Projects をクリックし、"Log projects information" にチェックを入れます。これにより Personal Dashboard の "Project" ページが表示され、既存プロジェクトのいずれかを選択できます。新しいプロジェクトを追加するには、EasyAdmin Web アプリケーションで Start → Administration → Projects をクリックし、"Show "Create New Project" in the Agent menu" にチェックを入れます。プロジェクト単位のライセンス使用記録については [License Usage Monitoring According to Projects](../../openlm-slm-features/openlm-project-usage.md) を参照してください。

## Recently closed ページ

前述のとおり、Workstation Agent はソフトウェアアプリケーションを能動的に終了し、同時使用ライセンスを回収するさまざまな方法を提供します。詳細は以下のアプリケーションノートを参照してください:

- [License retrieval (Manual method), and Monitoring Idle Application time](../../openlm-slm-features/license-harvesting/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a.md)
- [License retrieval of idle applications - Enhanced Agent procedures](../../openlm-slm-features/license-harvesting/license-retrieval-of-idle-applications-enhanced-workstation-agent-procedures.md)
- [License retrieval of idle applications (MATLAB, Autodesk, ArcGIS, Solidworks) - Save and Close](../../openlm-slm-features/license-harvesting/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close.md)
- [License retrieval of idle FlexLM applications - Suspend and Resume](../../openlm-slm-features/license-harvesting/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c.md)

OpenLM は、管理者によるライセンス終了が行われた場合に "Recently closed documents" ウィンドウでそのケースを示します。

![](/img/legacy/word-image-213.png)

Process 名をクリックすると、アプリケーションが再開され、新しいライセンスがチェックアウトされます（利用可能な場合）。

## License Repository ページ

エンドユーザーのワークステーションからライセンスの利用可否を問い合わせできることは、ライセンスの有効活用に向けた重要なステップです。ライセンス使用状況ウィンドウには、ライセンスサーバーごとの使用中/借用中/利用可能ライセンス数が表示されます。行をクリックすると、特定ライセンス（例: Autodesk）を使用中のアクティブユーザー一覧が表示されます。ユーザーエントリをクリックすると、OpenLM データベースに記録されたユーザー詳細を確認できます。

![](/img/legacy/word-image-214.png)

ライセンス使用状況は、**EasyAdmin Start → Administration → Agent Policy** で "Hide license status query option" をチェックするとエンドユーザーから非表示にできます。

## License repository のフィルタリング

Agent のライセンス使用状況ウィンドウをフィルタリングし、エンドユーザーが関心のあるライセンス情報のみを表示する方法はいくつかあります。

1. "License usage information" ウィンドウの 'Search' テキストボックスを使用する

2. ユーザーとユーザーグループに [roles and permissions](../../openlm-slm-features/openlm-roles-permissions.md) を適用して、表示を特定のライセンスサーバーに限定する

3. "License Repository" ページ内の目的の行の末尾にある hide license ボタンをクリックして、特定機能単位でエントリをフィルタリングする: ![](/img/legacy/word-image-215.png)

3.1 この変更を元に戻すには、"License Repository" ページの "SHOW HIDDEN LICENSES" ボタンをクリックします:

![](/img/legacy/word-image-216.png)

非表示にした項目がすべて表示されます。その後、"Show this license in the list" ボタンをクリックして再表示に切り替えます:

![](/img/legacy/word-image-217.png)

## 製品ライセンスレベル

ArcGIS には 3 つのライセンスレベル（高い順に Advanced、Standard、Basic）があります。ArcGIS のエンドユーザーはソフトウェア起動前にライセンスレベルを設定できます。利用可能なライセンスがあれば、その選択したレベルでソフトウェアが起動します。ライセンスレベルを設定する対象は、ArcGIS Desktop と ArcGIS Pro の 2 つの製品から選択できます。 ![](/img/legacy/word-image-218.png)

参考: https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm

## OpenLM EasyAdmin の Workstation Agent 設定ウィンドウ

EasyAdmin User Interface の "Agent Policy" ウィンドウで Workstation Agent を構成できます。次のパスでアクセスします: EasyAdmin Start → Administration → Agent Policy.
