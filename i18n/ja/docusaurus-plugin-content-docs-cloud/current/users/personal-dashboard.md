---
sidebar_position: 18
title: パーソナルダッシュボード(Personal Dashboard)
description: "Personal Dashboard では、エンドユーザーが管理者権限なしに自分のライセンス活動を確認できます。本ページでは管理者向けのセットアップ（前提条件、各ユーザーに表示するページを決めるポリシー、各ページの機能）を説明します。"
---

パーソナルダッシュボード（Personal Dashboard）は、OpenLM Workstation Agent によって提供されるエンドユーザー向けポータルで、管理者権限なしに自分のライセンス活動を確認できます。本ページでは管理者向けのセットアップを説明します。エンドユーザー向けの説明は [個人ダッシュボード](/cloud/for-end-users/personal-dashboard) を参照してください。

設定したポリシーと有効化した製品に応じて、ダッシュボードには最大 6 つのページが表示されます。左側のサイドバーでは **Management**（Recently Closed、Projects、Product Licensing Level）、**Operational**（License Repository、Live Feed）、**Reporting**（Workstations Overview）にグループ化され、加えてリアルタイム通知が届きます。管理者はユーザーのダッシュボード内で作業することはありません。各ユーザーに表示するページを [Agents Hub](/cloud/data-collection/agents_hub) の Personal Dashboard ポリシーで決定し、データを扱うページは [Products](/cloud/openlm-administration/products) で該当製品を有効化して利用可能にします。

:::info[パーソナルダッシュボードへのアクセス]
Personal Dashboard はアプリランチャーからは開きません。エンドユーザーは自分のマシンで開きます。Workstation Agent のインストール後に自動的に起動するか、**Windows のスタート → OpenLM → Personal Dashboard** から起動します。

**関連:** [Workstation Agent](/cloud/getting-started/install-workstation-agent) · [Projects](./projects.md) · [Users and Groups](./users-and-groups.mdx) · [Identity](/cloud/openlm-administration/identity)
:::

![License Repository のランディングページを表示したパーソナルダッシュボード](/img/personal_dashboard/license-repository.png)
*ダッシュボードの全体像: サイドバーはページを Management・Operational・Reporting に分類し、ヘッダーには通知ベルとユーザーメニューがあります。*

## 前提条件

OpenLM パーソナルダッシュボード（Personal Dashboard）へアクセスするには、以下の前提条件を満たす必要があります。

### 1. [Identity Service でユーザーアカウントを作成](./../openlm-administration/identity#users-management)

パーソナルダッシュボードにアクセスするには、OpenLM Identity Service 上にユーザーアカウントが必要です。

オプション:

- 役割（ロール）の有無にかかわらず、個別アカウントを手動で作成できます。
:::info
 Identity Service は一括ユーザー作成をサポートしていません。ユーザーは個別に追加する必要があります。
:::
- 共有アカウントを作成することもできますが、推奨しません。最も簡単な方法ではありますが、共有アカウントはパーソナルダッシュボードには表示されません。Workstation Agent は常にローカルマシンからユーザー情報を取得し、Identity Service からは取得しません。

### 2. [推奨の認証方式（SSO）の利用](./../openlm-administration/identity#external-providers-sso)

ユーザー数が多い組織では、認証とユーザー管理のためにサードパーティのアイデンティティプロバイダーを統合することを推奨します。サポートされる例:

- Okta  
- Azure AD  
- Windows 認証  

### 3. [Workstation Agent のインストール](/cloud/deployment-operations/components-installation)

Workstation Agent を PC にインストールした後にのみ、Personal Dashboard へアクセスできます。

### インストール方法:

- **手動インストール**  
  Identity Service で生成した承認ファイルを用意すれば、ユーザー自身で Workstation Agent をインストールできます。インストール後、Personal Dashboard は自動的に起動します。

- **大量/サイレント配布**  
  IT チームは以下のツールなどを使って Workstation Agent を一括配布できます。
  - Microsoft Intune  
  - グループポリシー（GPO）  
  - SCCM（System Center Configuration Manager）  
  - PDQ Deploy  
  - カスタムサイレントスクリプト  

### 4. 必要な製品を有効化

データを扱うページは、該当製品がアカウントで有効になっている場合にのみ読み込まれます。

- **License Repository**、**Product Licensing Level**、**Workstations Overview** は **SLM** 製品が必要です。
- **Projects** は **Projects** 製品が必要です。

製品は [Products](/cloud/openlm-administration/products) → **Available Products** → **Activate** で有効化します。Recently Closed と Live Feed は製品を必要としません。

## 表示されるページの制御

各ページは、[Agents Hub](/cloud/data-collection/agents_hub) で設定する Personal Dashboard ポリシーによって、ユーザー単位で表示/非表示が切り替わります。いくつかのページは、データを読み込む前に製品の有効化も必要です。

| ページ | グループ | 表示条件 | 必要な製品 |
| --- | --- | --- | --- |
| Recently Closed | Management | 常に表示 | — |
| Projects | Management | Projects ページが有効 | Projects |
| Product Licensing Level | Management | Set ArcGIS level が非表示でない | SLM |
| License Repository | Operational | ライセンス使用状況の情報が非表示でない | SLM |
| Live Feed | Operational | Live Feed ページが有効 | — |
| Workstations Overview | Reporting | Workstations Overview ページが有効 | SLM |

サインイン後、ダッシュボードは既定で **License Repository** で開きます（そのユーザーでライセンス使用状況が非表示の場合は **Recently Closed**）。

## パーソナルダッシュボードの通知 

パーソナルダッシュボードのユーザーは、Workstation Agent からブラウザー通知を受け取れます。

- 通知には、プロセス解放のアラート、プロジェクト選択の促し、禁止アプリケーションの警告、ライセンス空きの通知などが含まれます。
- ブラウザーのネイティブ通知が許可されていればそれを使用し、許可されていない場合はアプリ内のトースト通知として表示されます。


### 通知の例:

- アクティブなプロジェクトの選択をユーザーに促す。
- ライセンスに空きが出たことを通知する。
- 他のユーザーから要求されたライセンスの解放を促す。このリクエストは License Repository の **License in use** パネルから送信され（現在のコントロールは **Send "Close App" Notification**）、リクエスト間の最小間隔は [Agents Hub](/cloud/data-collection/agents_hub) で設定できます。

通知はヘッダーのベルメニューに集約され、ユーザーは履歴の確認、既読化（**Read all**）、既読の削除（**Clear read**）ができます。一部の通知はクリック可能で、たとえば *Process released* の項目は Recently Closed へのリンクになっており、そこからプロセスを再開できます。

![プロジェクト選択の促しが表示された通知メニュー](/img/personal_dashboard/notifications.png)
*ヘッダーのベルから開いた通知メニュー（ここではプロジェクト選択の促しを表示）。上部に **Read all** / **Clear read** があります。*

## プロジェクトとライセンスのトラッキング

OpenLM は、ライセンス使用状況を特定のアクティブプロジェクトに紐づけて記録できます。

- [Projects](./projects.md) サービスで許可されていれば、ユーザーはパーソナルダッシュボード内でアクティブプロジェクトを作成または選択できます。
- プロジェクト単位のライセンス使用追跡は [Projects](./projects.md) サービスで管理します。ページの表示やプロジェクト選択の促しは [Agents Hub](/cloud/data-collection/agents_hub) で制御します。

**Projects** ページでは、使用状況を計上するプロジェクトを設定し（検索可能な **Active project** 一覧から選んで **Apply**）、**Add Project** で新規作成し、選択した期間で自分の **Usage by projects** を確認します。このページには **Projects** 製品が必要です。

![Projects ページ](/img/personal_dashboard/projects.png)
*Projects ページ: アクティブプロジェクトを選んで Apply します。下部のグリッドにはユーザー自身のプロジェクト別使用状況が表示されます。*

### Recently Closed 最近閉じた項目

- Workstation Agent によって能動的にクローズされたアプリケーションを表示し、ライセンス回収の履歴を確認します。
- プロセス名を選択してアプリケーションを再度開き、ライセンスを再チェックアウトします。

列は **Process**、**Action**（ライセンスの回収方法 — *Save & Close*、*Closed*、*Suspended*）、**Time**、**Workstation**、**File path** です。行ごとに、プロセスの **Resume**（再開）、ファイルのフォルダーを開く（Agents Hub のポリシーで許可されている場合）、**Show last screenshot**（プロセススクリーンショットが有効な場合）、行の **Clear**（削除）が行えます。中断（Suspended）されたプロセスは再開できますが削除はできません。

![閉じたアプリケーションを一覧表示する Recently Closed ページ](/img/personal_dashboard/recently-closed.png)
*Recently Closed には、エージェントがライセンス回収のために閉じた／中断したアプリケーションが一覧表示されます。**Resume** で再度開けます。*

### License Repositoryライセンスリポジトリ

- 使用中、借用中、利用可能数など、ライセンスのリアルタイム使用状況を表示します。
- 現在ライセンスを保持しているユーザーの詳細情報にアクセスします。
- エンドユーザーに表示するライセンスの範囲を制御するためのフィルターオプションを構成します。

このテーブルは、サーバー別に各ライセンスの **Total**、**Available**、**Used**、**Borrowed** の数を一覧表示します（値 `-99` は **Unlimited**（無制限）として表示）。行の **Used** の値（0 より大きい場合）を選択すると **License in use**（その機能を現在保持しているユーザー）が開き、メール・電話・アプリ内の **Send "Close App" Notification** でライセンス解放を促せます。**Show / Hide**、**Show hidden**、**Show packages only** で表示するライセンスを制御します。License Repository はサインイン後の既定ページです。

### ArcGIS のライセンスレベル（ArcGIS のみ）

ArcGIS ユーザーは、ArcGIS Desktop および ArcGIS Pro 向けに（**Advanced**、**Standard**、**Basic**）のライセンスレベルを選択できます。既定レベルの設定や、パーソナルダッシュボード上でユーザーの選択肢を制限することも可能です。

**Product Licensing Level** ページでは、**Product**（ArcGIS Desktop または ArcGIS Pro）、**Server**、レベルを選び、**Advanced** でレベルの保存先（**Registry**、**System Environment**、**User Environment**）を選択してから **Save** をクリックします。Agents Hub のポリシーで、このページの非表示、既定の保存先の設定、保存先の変更禁止（ロック）が可能です。このページには **SLM** 製品が必要です。

![Advanced セクションを開いた Product Licensing Level ページ](/img/personal_dashboard/product-licensing-level.png)
*ArcGIS のレベルと保存先の選択。Advanced セクションに保存先のオプションがあります。*

> [ArcGIS のライセンスレベルについて（英語）](https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm)

## Live Feed

**Live Feed** は、ユーザーの接続中の Workstation Agent 向けのリアルタイムログウィンドウであり、ライセンスのビューではありません。エージェントが接続していると、それぞれが独自のログタブとして表示され、ユーザーは **Restart Agent**（再起動）、最小 **Log Level** の変更、エージェントマシン上での **Open Logs Location** を実行できます。Live Feed ページが有効な場合にのみ表示され、製品の有効化とは連動しません。

![接続中エージェントのログをストリーミングする Live Feed ページ](/img/personal_dashboard/live-feed.png)
*Live Feed は接続中の各 Workstation Agent のログをタブごとにストリーミングします（Restart Agent / Agent Settings のコントロール付き）。*

## Workstations Overview

**Workstations Overview** は、選択した 1 つの機能について、どのワークステーションがそのライセンスを取得できるかを表示します。**Vendor**、**License Server**、**Feature**、ワークステーションの範囲でフィルターすると、右側に **Total**、**Available**、**In use** が集計され、各カードはワークステーションを **Available** または **In use** として示します（使用状況は約 1 分ごとに更新）。Workstations Overview ページが有効な場合にのみ表示され、**SLM** 製品が必要です。

![Workstations Overview ページ](/img/personal_dashboard/workstations-overview.png)
*ベンダー・サーバー・機能でフィルターします。各カードはワークステーションの空き状況を示し、右側に集計が表示されます。*

## ダッシュボードのカスタマイズ

ヘッダーのユーザーメニューから、ユーザーは **Time zone**（ダッシュボード内のすべてのタイムスタンプに使用）を設定でき、**Mobile QR code** を開くと、同じユーザーとしてサインインした状態でスマートフォンでダッシュボードを起動できます。これらはユーザーの設定であり、管理者設定ではありません。

![ヘッダーのユーザーメニュー](/img/personal_dashboard/user-menu.png)
*ユーザーメニュー: Log Out、Mobile QR code、Time zone。*
