---
title: "監査（Audit）"
sidebar_position: 4
description: "Audit では、OpenLM の各コンポーネントが記録したイベント（ログイン、設定変更、エラー、その他の操作）を、フィルター・確認・エクスポートできる単一の一覧で確認できます。"
---

**Audit** を使用すると、OpenLM の各コンポーネントがアカウント全体で記録したイベントを確認できます。OpenLM の各サービスは、注目すべきアクティビティ（ログイン、設定変更、エラー、その他の操作）を Audit に報告し、Audit はそれらを単一の **Events** 一覧に集約します。この一覧はフィルター・確認・エクスポートが可能です。Audit は読み取り専用のビューであり、問題のトラブルシューティングや、「いつ・何が・誰に関して」起きたかの把握に役立ちます。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Platform Administration（プラットフォーム管理）→ Audit** を選択します。

**関連:** [OpenLM Products](./products) · [Alerts](/cloud/automations/alerts) · [Notifications](/cloud/automations/notifications)
:::

## 概要

Audit は、OpenLM Platform の各コンポーネントが発行するイベントを集約し、一か所で確認できるようにします。次の点で役立ちます。

- コンポーネントが記録したエラーを見つけ、その説明を読むことで、問題をトラブルシューティングする。
- OpenLM Platform 全体のアクティビティ（どのコンポーネントが、いつ、どのユーザーに対して何を行ったか）を追跡する。
- 失敗したログインや設定変更など、特定の操作を、各コンポーネントを個別に開かずに調査する。

すべてのイベントは、固定された項目を持つ 1 件のレコードです。イベントを報告した **System Component**、重大度を示す **Type**、発生した **Date and Time**、イベントの **Name**、関連する **User**、そして自由記述の **Description** です。Audit 自体はイベントを変更したり生成したりすることはなく、他のコンポーネントが報告した内容を表示するだけです。

Audit は OpenLM の[システム製品](./products#システム製品)の 1 つであり、アカウントに対して常に有効です。アクセスは管理者に限定されます（[アクセスと権限](#アクセスと権限)を参照）。また、各アカウントは自身のイベントのみを閲覧できます。

## Events 画面

**Events** は Audit で唯一の画面で、左ナビゲーションの **Reporting → Events** から開きます。画面は次の 3 つの部分で構成されます。

- 上部の**フィルターバー** — **System Component**、**Type**、**Name**、**User** の各フィルターと、**Apply**、**Clear** ボタン。
- 結果の上の**ツールバー** — **Date and Time** 範囲ピッカーと、**Export CSV**、**Refresh**、**Search** の各コントロール。
- 一致したイベントを一覧表示する**結果グリッド**。

**Events** 見出しの横にある情報アイコン（**ⓘ**）を選択すると、フィルターとボタンの動作に関するアプリ内の説明が表示されます。

画面を最初に開いたときはグリッドは空で、*Select and apply the "Filters" to get the report* というメッセージが表示されます。初めて **Apply** を選択すると結果が表示されます。

![Audit の Events 画面。上部に System Component、Type、Name、User の各フィルターがあり、結果グリッドにイベントのコンポーネント、タイプ、日時、名前、ユーザー、説明が一覧表示されます。](/services/openlm_administration/audit-events.png)
*Figure 1. Events 画面。フィルターバーの下に結果グリッドが表示されます。*

## イベントをフィルターする

フィルターバーには 4 つのフィルターがあります。いずれも複数選択式のリストで、その選択肢はアカウント内のイベントから取得されるため、実際にデータに存在する値のみを選択できます。

| フィルター | 絞り込む対象 |
|---|---|
| System Component | イベントを報告した OpenLM コンポーネント。例: `OpenLM.SecurityService`、`BrokerHub`、`LicenseAccessControl.API`、`VirtualLicenseManager`、`OpenLM.ProductsService`。 |
| Type | イベントの重大度: **Information**、**Warning**、**Error**。 |
| Name | イベント名。例: `Successful login`、`GetPhysicalLicenseManagersList`。 |
| User | イベントに関連するユーザー。 |

レポートを実行するには:

1. 1 つ以上のフィルターを開き、必要な値を選択します。各フィルターには、長い一覧から値を探すための検索ボックスがあります。
2. **Apply** を選択します。設定したすべてのフィルターに一致するイベントがグリッドに読み込まれます。
3. 最初からやり直すには、**Clear** を選択します。4 つのフィルターがすべて空になり、フィルターなしのイベント一覧全体が再読み込みされます。

フィルターを設定せずに **Apply** を選択すると、アカウントのすべてのイベントが返されます。

![System Component フィルターを開いた状態。イベントを報告した OpenLM コンポーネントが、検索可能な複数選択リストとして表示されています。](/services/openlm_administration/audit-filter-component.png)
*Figure 2. 各フィルターは、アカウントのイベントから生成される検索可能な複数選択リストです。*

## 日時で絞り込む

グリッドの上にある **Date and Time** ピッカーは、レポートを特定の期間に限定します。これは任意であり、フィルターバーとは独立しています。デフォルトでは日時フィルターは適用されず、レポートには記録されたすべてのイベントが含まれます。

カレンダーを選択して範囲を選びます。**Select Preset** メニューで手早く期間を指定できます（**Last 7 Days**、**Last 30 Days**、**Last 60 Days**、**Last 180 Days**、**Last 360 Days**）。または **Custom** を選択して、開始日と終了日を自分で指定します。選択した範囲でグリッドが再読み込みされます。

![Date and Time ピッカー。カレンダーと、Last 7、30、60、180、360 Days および Custom を選べる Select Preset メニューが表示されています。](/services/openlm_administration/audit-date-range.png)
*Figure 3. Date and Time ピッカーは、レポートをプリセットまたはカスタムの期間に限定します。*

## 結果内を検索する

ツールバーの **Search** ボックスは、入力したテキストを、現在グリッドに表示されているイベントの中で強調表示します。これは読み込み済みのページを見やすくするための強調表示の補助であり、追加のフィルターではありません。レポートが返すイベントを変えるものではありません。結果セットを変更するには、代わりにフィルターと日時範囲を使用してください。

## イベントの詳細を表示する

**Description** 列はグリッド内で省略表示されます。イベントを全文で読むには、その行にカーソルを合わせ、行末に表示される **View** アイコンを選択します。**Event Description** ダイアログが開き、イベントの完全な詳細（**System Component**、**Type**、**Date and Time**、**Name**、**User**、および全文の **Description**）が表示されます。閉じる（**✕**）アイコンを選択するとグリッドに戻ります。

![Event Description ダイアログ。1 件のイベントの System Component、Type、Date and Time、Name、User、および全文の Description が表示されています。](/services/openlm_administration/audit-event-details.png)
*Figure 4. Event Description ダイアログには、イベントの省略されていない完全な詳細が表示されます。*

## 結果の並べ替えとページ送り

列見出しを選択すると、その列で並べ替えます。もう一度選択すると順序が逆になります。**Description** を除くすべての列を並べ替えできます。

結果はページ分割されます。グリッド下部の **Items per page** コントロールとページ矢印を使って、大きな結果セットを移動します。ツールバーの **Refresh** を選択すると、現在のレポートが再実行されます。

## CSV にエクスポートする

ツールバーの **Export CSV** アイコンを選択すると、レポートをダウンロードできます。エクスポートには、現在のフィルターと日時範囲に一致する**すべての**イベントが含まれ（画面に表示されているページだけではありません）、現在の並べ替え順が適用されます。ファイル名は `Audit Events.csv` で、グリッドと同じ列（System Component、Type、Date and Time、Name、User、Description）を含みます。エクスポート形式は CSV のみです。

## イベントタイプ

Audit は、すべてのイベントを 3 つの重大度のいずれかで分類します。

| タイプ | 意味 |
|---|---|
| Information | ログイン成功や通常のクエリなど、正常な操作が記録されたことを示します。 |
| Warning | 操作は停止しなかったものの、注目に値する状態を示します。 |
| Error | 操作が失敗したことを示します。通常、理由は Description に記載されます。 |

## 列

結果グリッドには 6 つの列が表示されます。

| 列 | 説明 |
|---|---|
| System Component | イベントを報告した OpenLM コンポーネント。 |
| Type | イベントの重大度（Information、Warning、Error）。 |
| Date and Time | イベントが発生した日時。設定した日付形式とタイムゾーンで表示されます。 |
| Name | イベントの名前。 |
| User | イベントに関連するユーザー。 |
| Description | イベントの自由記述の説明。グリッド内では省略表示され、[Event Description ダイアログ](#イベントの詳細を表示する)で全文が表示されます。 |

## アクセスと権限

Audit は管理者のみが利用できます。Events 画面を開くには、OpenLM アカウントに管理者ロール（**Account Administrator**、**System Administrator**、または専用の **Audit** 管理者ロール）が必要です。これらのロールを持たないユーザーには、アプリランチャーに Audit が表示されず、画面を開くこともできません。

イベントはアカウント単位でスコープされます。自分の OpenLM アカウントに記録されたイベントのみが表示され、他のテナントのイベントが表示されることはありません。

## データ保持期間

Audit はイベントを無期限ではなく、一定期間だけ保持します。OpenLM Cloud では、イベントの保存と保持期間は OpenLM Platform によって管理されます。オンプレミス環境では、スケジュールされたジョブが、設定された保持期間（デフォルトは 90 日）より古いイベントを削除します。保持しておきたいイベントは、期限切れになる前に [CSV にエクスポート](#csv-にエクスポートする)しておいてください。
