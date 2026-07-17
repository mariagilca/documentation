---
title: プロジェクト使用状況
description: "OpenLM には、ライセンス使用情報を記録し、プロジェクトごとに分類する機能があり、必要に応じたライセンスの割り当てを可能にします。"
sidebar_position: 8
---
OpenLM にはライセンス使用情報を記録し、プロジェクト別にグルーピングする機能があります。これにより、組織内の各プロジェクトに必要なライセンスを割り当てられるだけでなく、プロジェクト別のライセンスコストを効率的に監視できます。

## プロジェクト使用状況レポート

Project Usage ウィンドウは、EasyAdmin インターフェイスで **EasyAdmin User Interface Start → Reports → Project Usage** をクリックすると表示されます。

画面左側でフィルター条件を設定し、**Apply** をクリックして使用状況クエリを実行します。**Chart** タブをクリックしてグラフ表示、または右下のダウンロードアイコンをクリックして CSV として出力することもできます。

![Project Usage](/img/legacy/project-usage.png)

## 前提条件

1. プロジェクト単位でのライセンス使用のグルーピングには追加ライセンスが必要です。OpenLM License ウィンドウに *Projects_Billing* タグが表示されない場合は、sales@openlm.com にお問い合わせください。

2. OpenLM SLM で認証を使用している場合、プロジェクト設定には管理者権限が必要です。

3. アクティブなプロジェクトを選択するには、エンドユーザーのワークステーションに OpenLM Workstation Agent をインストールする必要があります。

## プロジェクト設定

Projects Settings 画面では、プロジェクト使用状況の監視ポリシーを定義します。開くには **EasyAdmin Start → Administration → Projects** に移動します。Projects ウィンドウが表示されます。

### Administration - Projects

### プロジェクト情報を記録

**Log projects information** ボックスにチェックを入れると、ライセンス使用情報をプロジェクト単位で記録するようになります。

### プロジェクトの最小利用時間

この設定はログ記録に使用する最短時間を定義します。短い期間は統合され、意味のある使用期間としてまとめられます。例えば最小時間を 5 分に設定し、ユーザーがアプリケーションを合計 3 分だけ開いていた場合、その使用期間は現在のセッションには追加されず、次のセッションに統合されます。

### Workstation Agent の動作設定

これらの設定は、エンドユーザーが複数のプロジェクトに従事している場合にワークステーションで表示される内容を定義します。

プロジェクト割り当ての既定方法は、OpenLM データベースに保存されているプロジェクト名を使用する方法です。これは "Use OpenLM Projects" のラジオボタンで有効になり、後述の環境変数方式とは異なります。

エンドユーザーが EasyAdmin で 1 つのプロジェクトにのみ割り当てられている場合、OpenLM は自動的にそのプロジェクトにライセンス使用を記録します。

エンドユーザーが複数のプロジェクトに従事している場合、OpenLM Workstation Agent がダイアログを表示し、現在のプロジェクトの選択を促します。

### メニューからプロジェクト選択を非表示

エンドユーザーがアクティブプロジェクトを選択する方法は 2 つあります:

1. トレイの Agent アイコンを右クリックし、"Set Active Project" を選択する。

2. プロジェクト選択のポップアップが表示されるのを待ち、そこから選択する。

違いは、"Set Active Project" メニューには OpenLM に登録されたすべてのプロジェクトが表示されるのに対し、ポップアップメニューにはユーザーに割り当てられたプロジェクトのみが表示される点です。このチェックボックスを有効にすると、Agent の右クリックメニューから **Set Active Project** が非表示になります。ユーザーは引き続きポップアップからプロジェクトを選択できます。

### プロジェクトウィンドウの自動消去時間

OpenLM では、一定秒数後にプロジェクト選択ダイアログを自動的に消す設定が可能です。

### Workstation Agent でのプロジェクト作成を許可

OpenLM のプロジェクト管理モジュールは、OpenLM Workstation Agent からのプロジェクト作成をサポートします。"Create New Project" ボックスにチェックを入れると、この機能が有効になり、Workstation Agent のメニューに新しい項目が追加されます（下図参照）。

![Set Active Project](/img/legacy/show-set-active-project.png)

エンドユーザーがこの項目を選択すると "Create New Project" ウィンドウが開き、プロジェクトの作成と割り当てが可能になります。

作成された新規プロジェクトの編集は EasyAdmin のみで行えます。作成元は EasyAdmin の Projects 一覧で確認できます（後述の「既存プロジェクトの編集」を参照）。

### 未割り当てプロジェクトを表示

既定では、Workstation Agent → Set Active Project でユーザーが表示できるのは、割り当て済みプロジェクトのみです。このボックスをチェックすると、システムで有効なすべてのプロジェクトが一覧に表示され、任意のプロジェクトを選択できるようになります。

### 環境変数のサポート

環境変数を使用する方法は後方互換性のためのオプションです。選択すると既定の OpenLM プロジェクト管理方式を上書きします。OpenLM Workstation Agent は既定の Windows 環境変数（既定: **LM_PROJECT**）を読み取り、その値をユーザーセッションのプロジェクトとして使用します。

この変数はワークステーションごとに設定する必要があるため、ユーザー間で値を上書きすることはできません。また、通常の OpenLM プロジェクト機能を使った場合のようなプロジェクト選択ポップアップも表示されません。

環境変数はユーザーが手動で設定できます:

1. "Windows + R" を押して [ファイル名を指定して実行] を開き、テキストボックスに "sysdm.cpl" と入力して Enter を押し、システムのプロパティを開きます。
2. "詳細設定" タブに移動し、"環境変数" を選択します。
3. 環境変数の画面が表示されます。2 種類の変数を確認し、必要に応じて設定します。

また、システム管理者が CRM、ERP、または他のリモート管理ソリューションを通じて一括設定することもできます。

![Environment Variable](/img/legacy/environment-variable.png)

環境変数オプションは既定では無効です。環境変数方式の後方互換が必要な場合を除き、OpenLM が提供する方式の利用を推奨します。

**Add unknown projects** オプションは、OpenLM SLM が未知のプロジェクト名を検出した際の管理者向けフィルターです:

- チェックあり: 既存の OpenLM プロジェクト一覧にない未知のプロジェクト名を追加し、現在のプロジェクトとして設定します。
- チェックなし（既定）: 環境変数の値が OpenLM のプロジェクト一覧に存在しない場合、未知のプロジェクトは設定されず、使用状況は追跡されません。

## EasyAdmin User Interface でのプロジェクト作成

前のセクションでは Workstation Agent からプロジェクトを作成する方法を説明しました。プロジェクトは EasyAdmin のユーザーインターフェイスからも作成できます:

**EasyAdmin User Interface Start → Management → Projects** をクリックすると Project ウィンドウが表示されます。

**Add** をクリックし、"Add Project" フォームに情報を入力します。

![Project creation in EasyAdmin User Interface](/img/legacy/project-creation-in-easyadmin-user-interface.png)

Project details タブでは、管理者は次の項目を設定できます:

- プロジェクト名
- プロジェクトの開始日と終了日
- プロジェクトに割り当てられた稼働時間
- プロジェクトの優先度
- プロジェクトの完了率（パーセンテージ）

Users と user groups は、Users タブと Groups タブでプロジェクトに割り当てることができます。これらを設定したら **Save** をクリックします。

## 既存プロジェクトの編集

新規プロジェクトは Projects ウィンドウ（**EasyAdmin User Interface Start → Management → Projects**）に表示されます。

![Projects window](/img/legacy/projects-window.png)

このウィンドウでは、新規プロジェクトの作成だけでなく、既存プロジェクトの削除や編集が可能です。2 つのパネルに分かれています:

左側のパネルは、右側に表示するプロジェクトを絞り込むためのフィルターです。

- **Priority** のドロップダウンで優先度（*Low*、*Medium*、*High*）を選択してフィルターできます。
- **Created in** のドロップダウンで、プロジェクト作成元（EasyAdmin User Interface で作成した場合は *Admin*、OpenLM Workstation Agent で作成した場合は *Agent*）を選択してフィルターできます。

右側のパネルには既存プロジェクトの一覧が表示されます。上部のアクションバーでは、プロジェクトの追加、削除、プロパティ編集、プロジェクトの有効化/無効化ができます。

## プロジェクトへのユーザーおよびユーザーグループの紐付け

プロジェクト作成時に、設定完了と同時にユーザーやユーザーグループを追加できます。手順は次のとおりです:

1. 対象プロジェクトを選択して **Edit** をクリックします。
2. Project ウィンドウで **Users** または **Groups** タブを選択します。**Add** ボタンをクリックし、表示される検索ウィンドウでユーザーまたはグループを選択します。
3. 完了したら **Select** をクリックします。
4. **Save** をクリックして変更を保存します。

![Attaching users and user groups to a project](/img/legacy/attaching-users-and-user-groups-to-a-project.png) ![Attaching users and user groups to a project](/img/legacy/attaching-users-and-user-groups-to-a-project-1.png)
