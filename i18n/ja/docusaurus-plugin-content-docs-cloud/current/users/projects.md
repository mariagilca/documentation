---
sidebar_position: 3
id: projects
title: プロジェクト(Project)
description: "プロジェクト単位でライセンス使用状況を追跡し、ライセンスコストを正確に配分するために projects を使用します。"
---
プロジェクト機能を使うと、プロジェクト別にライセンス使用状況を追跡し、コスト配賦を正確に行えます。各ユーザーは*アクティブプロジェクト*のもとで作業し、OpenLM はそのユーザーのライセンス使用をそのプロジェクトに紐づけます。アクティブプロジェクトは、Workstation Agent／パーソナルダッシュボードでユーザーが選択するほか、システム環境変数から自動設定したり、ユーザーの既定プロジェクトにフォールバックしたりできます。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Users（ユーザー）→ Projects** を選択します。

**事前準備:** [OpenLM Products](/cloud/openlm-administration/products) で **Projects** を有効化し、使用データを取得できるよう対象端末に [Workstation Agent](/cloud/getting-started/install-workstation-agent) をインストールします。

**関連:** [Users and Groups](/cloud/users/users-and-groups) · [Directory Sync](/cloud/users/directory-sync) · [Agents Hub](/cloud/data-collection/agents_hub)
:::

![プロジェクト名・日付・作成元・優先度が並ぶプロジェクト一覧](/img/projects/projects-list.png)

## 前提条件

- **Projects 製品**: [OpenLM Products](/cloud/openlm-administration/products) で **Projects** を有効化します。アプリ内のすべての操作はこの有効化を前提とします。
- **Workstation Agent**: ライセンス使用中にどのプロジェクトがアクティブかを取得できるよう、対象端末すべてに [Workstation Agent](/cloud/getting-started/install-workstation-agent) をインストールします。
- **Directory Sync（任意）**: Active Directory の組織単位からプロジェクトを自動作成する場合は [Directory Sync](/cloud/users/directory-sync) を使用します。

## Projects アプリ

アプリには、左側のナビゲーションから開く 2 つの画面があります。

- **Projects** — プロジェクトの追加・編集・整理・有効化／無効化・削除・インポート・エクスポートを行う一覧画面です。
- **Settings** — Workstation Agent がユーザーにプロジェクトをどう提示するかを設定します（[エージェントの動作設定](#エージェントの動作設定)を参照）。

プロジェクトの追加・編集・インポート・設定変更には**管理者**ロールが必要です。権限のないユーザーには読み取り専用で表示されます（一覧の CSV エクスポートは誰でも利用できます）。

## エージェントの動作設定

**Settings** を開くと、Workstation Agent とパーソナルダッシュボードがプロジェクトをどう扱うかを制御できます。すべての項目は 1 つの **Agent's behavior** セクションにまとまっており、相互に排他的な 2 つのモード（**Use OpenLM's projects** または **Support environment variable**）を選択します。変更後は **Save** を選択して適用します。

![Agent's behavior の項目が表示された Projects の Settings 画面](/img/projects/projects-settings.png)

### Use OpenLM's projects

既定のモードです。ユーザーは OpenLM 上で管理されるプロジェクトから選択します。選択すると次の項目が有効になります（いずれも既定でオン）。

- **Display active project at license retrieval**: アプリがライセンスを取得する際にプロジェクトの確認・選択を促します。
- **Display active project periodically**: 一定間隔でアクティブプロジェクトの確認を促します。
  - **Display periodically every … minutes**: 定期的な確認の間隔（分）。0 より大きい値が必要です。
- **Show "Set Active Project" in Personal Dashboard's projects page**: パーソナルダッシュボードからアクティブプロジェクトを設定できるようにします。
- **Show "Create New Project" in Personal Dashboard's projects page**: パーソナルダッシュボードから新規プロジェクトを作成できるようにします。
- **Show unassigned projects**: ユーザーに未割り当てのプロジェクトも含め、選択肢にすべて表示します。この項目は **Show "Set Active Project" in Personal Dashboard's projects page** がオンのときのみ利用できます。

### Support environment variable

OpenLM のプロジェクト一覧の代わりに、端末に設定されたシステム環境変数からアクティブプロジェクトを取得します。選択すると次の項目が有効になります。

- **Environment variable name**: アクティブプロジェクトを判定するためにエージェントが読み取る環境変数名（例 `LM_PROJECT`）。このモードでは必須です。
- **Add unknown projects**: 環境変数が示す名前が OpenLM に存在しない場合に、自動的にプロジェクトを作成します。既定はオフです。

## プロジェクトの管理

**Projects** 画面には、テナントのすべてのプロジェクトが一覧表示されます。ここでは次の操作が可能です。

- プロジェクトの追加・編集・有効化・無効化・削除。
- フラットな**グリッド**表示と階層的な**ツリー**表示の切り替え。
- 検索、列フィルター、期間指定フィルター、無効なプロジェクトの表示／非表示。
- CSV ファイルからのインポート、一覧の CSV エクスポート。

既定の列は **Project Name**・**Start Date**・**End Date**・**Created By**・**Priority** です。列メニュー（⋮）から **Parent Project**・**Allocate Time**・**Percent Done**・**Status**（Enabled/Disabled）などの列を追加表示できます。**Created By** はプロジェクトの作成元を示します — `Admin`（このアプリで作成）、`Agent`（端末から作成）、`CSV`（インポート）、`LDAP`（Directory Sync が作成）。

### グリッド表示とツリー表示

**View By** の切り替えで表示方法を選べます。

- **Grid view** — 列フィルターと期間フィルターを備えた、並べ替え可能なフラットな表。詳細の確認に適しています。
- **Tree view** — 親子階層を展開できる表示。プロジェクトの入れ子構造の把握に適しています。

![親プロジェクトと子プロジェクトを表示した Projects のツリー表示](/img/projects/projects-tree.png)

### 検索・フィルター・期間指定

- **Search** はプロジェクトの各フィールドおよび割り当てユーザー名を対象に検索します（最大 100 文字）。
- **Toggle Filters** はグリッド表示で列ごとのフィルターを有効にします（例: Priority を Low/Medium/High で絞り込む、Created By を作成元で絞り込む）。
- **Start Date Range** と **End Date Range** は、開始日・終了日が指定範囲に入るプロジェクトに絞り込みます（グリッド表示のみ）。
- **Show disabled** は無効なプロジェクトも一覧に含めます。通常は非表示で、表示時は赤いアイコンが付きます。

### プロジェクトの追加・編集

**Add Project**（または行の編集アイコン）を選択すると、**Project**・**Users**・**Groups** の 3 つのタブを持つプロジェクトフォームが開きます。

![プロジェクトの詳細項目が並ぶ Add Project フォーム](/img/projects/add-project.png)

**Project** タブの項目:

- **Active / Inactive**: プロジェクトが有効かどうか。無効なプロジェクトは選択肢から除外されます。
- **Name**: プロジェクト名。必須で、テナント内で一意です（大文字・小文字を区別しません）。
- **Parent Project**: 任意。別のプロジェクトの下に入れ子にして階層を作ります。自分自身を親にはできず、親子の循環参照は拒否されます。
- **Priority**: Low・Medium・High。既定は Low。
- **Allocated Time**: 予定工数（時間）。参考情報です。
- **Progress**: 進捗率（0〜100%）。参考情報です。
- **Start Date / Start Time** と **End Date / End Time**: プロジェクト期間。開始は終了より前である必要があります。

使用データの紐づけと整理に使われるのはプロジェクト名と親プロジェクトのみで、優先度・予定工数・進捗は追跡やレポート用の記述的な属性です。**Save** を選択してプロジェクトを作成・更新します。

:::note
開始日・終了日はプロジェクト期間を表しますが、期限が過ぎても自動的に無効にはなりません。プロジェクトは無効化するまで利用可能なままです。本サービスが制御するライフサイクルは有効化／無効化のみです。
:::

### 有効化・無効化・削除

行のチェックボックスで 1 つ以上のプロジェクトを選択し、ツールバーを使用します。

- **Disable** は選択したプロジェクトを無効化します。親を無効化すると**その子プロジェクトもすべて無効化**され、親が無効な間は子を有効化できません。
- **Enable** は無効なプロジェクトを再度有効化します。
- **Delete** は選択したプロジェクトを削除します。削除しても子プロジェクトは削除されず、トップレベルに移動して残ります。割り当てられていたユーザーやグループからも削除されます。

Disable と Delete は実行前に確認を求めます。

### CSV のインポートとエクスポート

**Import records** で CSV ファイルからプロジェクトを一括作成でき（管理者のみ）、**Export CSV** で現在の一覧をダウンロードできます。

![Projects 一覧に表示された CSV インポートダイアログ](/img/projects/projects-import.png)

CSV の列はエクスポートのテンプレートと同じです — **Project Name, Start Date, End Date, Created By, Priority, Parent Project, Allocate Time, Percent Done, Status**。インポート時:

- **Parent Project** は親の**名前**で照合されます。親は既に存在するか、ファイル内で先に現れる必要があります。
- **Created By** は無視され、インポートされたプロジェクトの作成元は常に `CSV` になります。
- 値が空の場合の既定は Allocate Time `0`、Percent Done `0`、Priority `Medium` です。**Status** は `Enabled` または `Disabled` を受け付けます。
- 日付はアカウントの日付形式で解釈されます。

インポート後、ダイアログに成功・失敗した件数が表示されます。失敗した行がある場合は、その行だけをダウンロードして修正し、再アップロードできます。

### プロジェクトへのユーザー割り当て

プロジェクトの **Users** タブで、パーソナルダッシュボードにこのプロジェクトを表示するユーザーを割り当てます。

![割り当て済みユーザーが一覧表示されたプロジェクトの Users タブ](/img/projects/project-users.png)

- **Add Users To Project**: 割り当てるユーザーを選びます。ユーザーは [Users and Groups](/cloud/users/users-and-groups) から取得されます。事前に少なくとも 1 ユーザーが存在することを確認してください。
- **Set As Default Project** / **Remove default project**: 選択したユーザーの既定プロジェクトとして設定します。既定プロジェクトはユーザーごとに最大 1 つで、エージェントが明示的なプロジェクトを報告しない場合のフォールバックになります。既定は Username 列のホームアイコンで示されます。
- **Remove**: 選択したユーザーの割り当てを解除します。
- **Show disabled**: 無効化済みのユーザーも一覧に含めます。

グリッドには **Username, First Name, Last Name, Display Name, Email, Department** が表示されます。割り当ての変更は **Save** で保存します。

### プロジェクトへのグループ割り当て

**Groups** タブもグループに対して同様に機能します — **Add Groups To Project**、**Set As Default Project** / **Remove default project**、**Remove**、**Show disabled**。グループも [Users and Groups](/cloud/users/users-and-groups) から取得されます。グループの **Group** 名と **Members** 件数が表示され、件数を選択するとそのグループのメンバーを読み取り専用の一覧で確認できます。

## アクティブプロジェクトの決定方法

ユーザーのアクティブプロジェクトがどう決まるかは、Settings とユーザーの状態によって異なります。

1. **明示的な選択** — **Use OpenLM's projects** では、エージェントがライセンス取得時や定期的にユーザーへ確認を促し、（対応する項目が有効なら）ユーザーはパーソナルダッシュボードからプロジェクトを設定・作成できます。
2. **環境変数** — **Support environment variable** では、エージェントが設定された変数を読み取ってそのプロジェクトを使用します（**Add unknown projects** がオンなら必要に応じて作成します）。
3. **既定プロジェクト** — 明示的なプロジェクトが報告されない場合、使用データはユーザーの既定プロジェクトにフォールバックします。

対応する Settings 項目が有効な場合、ユーザーはパーソナルダッシュボードの Projects ページからもプロジェクトを操作できます。[パーソナルダッシュボード](/cloud/users/personal-dashboard)を参照してください。

## Directory Sync による自動作成

[Directory Sync](/cloud/users/directory-sync) は、Active Directory の構造からプロジェクトを作成・維持できます。作成されたプロジェクトは作成元 **LDAP** で表示されます。作成だけでなく、既存プロジェクトの親の更新やユーザーの追加・削除も行い、プロジェクト構造をディレクトリと同期させます。

## プロジェクトの表示制御と Agents Hub

ユーザーに表示されるプロジェクト選択の項目は、本アプリの **Settings** で制御します（[エージェントの動作設定](#エージェントの動作設定)を参照）。たとえば、ライセンス取得時に確認を促すか、パーソナルダッシュボードに *Set Active Project* や *Create New Project* の操作を表示するか、などです。

[Agents Hub](/cloud/data-collection/agents_hub) は、パーソナルダッシュボード全体（ページポリシーやプロジェクト選択の強制の有無）を管理する場所です。両者を併用します — プロジェクトの選択肢の内容は Projects の **Settings** で、その周辺のパーソナルダッシュボードのポリシーは Agents Hub で設定します。

## レポート

プロジェクト使用データは BI ツールに表示されます。Projects アプリ自身の **Dashboard**（Reporting 内）には **User and Project Insights** 分析ダッシュボードが埋め込まれており、同じデータが [Project report](/cloud/reporting/bi-reports/basic-reports/user-projects-insights/project-report) および [Project usage](/cloud/reporting/bi-reports/basic-reports/user-projects-insights/project-usage-report) の BI レポートにも流れます。
