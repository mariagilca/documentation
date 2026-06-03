---
title: "Denials (拒否)"
description: "ライセンス拒否情報は、OpenLM User Interface の Denials レポート画面 (Start > Reports > Denials) に表示されます。"
sidebar_position: 4
---
## Administration - Denials

ライセンス拒否情報は、OpenLM User Interface の Denials レポート画面（**Start > Reports > Denials**）に表示されます。組織によっては、特定の拒否を除外してデータを効率的に扱いたい場合があります。OpenLM Denials Collection Filter を使用すると、特定の拒否レコードの収集を避けるルールを作成でき、該当レコードはデータベースやレポートに含まれません。

この設定は EasyAdmin の **Administration - Denials** 画面（**Start > Administration > Denials**）で行います。**Denials Settings** と **Excluded Denials** パネルが収集される拒否データに影響します。

![The Administration - Denials Screen](/img/legacy/the-administration-denials-screen-3.png)

本ドキュメントでは次を扱います:

- Denials Settings
- Excluded Denials
- Excluded Denials の設定確認
- Aggregation Settings

拒否の設定に関する追加情報は [Denialsレポート](../openlm-easy-admin-user-interface-modules-and-reports/license-denials-reporting.md) を参照してください。

## Denials settings

**Administration - Denials** 画面の **Denials Settings** パネルにある 2 つの設定が、保存される拒否レコードに影響します。

**Track true denials only:**

Track True Denials Only をオンにした場合:

- 初回のライセンス要求が拒否されても、別のプールやライセンスサーバーで許可された場合は記録されません。
  - 異なるライセンスプールからのすべての false denials（下記の License Pull Tolerance Interval 参照）は記録されません。この設定はグローバル設定として Denials レポートに影響します。
  - 新規に記録されるデータのみが対象です。既存の履歴データは影響を受けず、false denials が含まれる可能性があります。

**License Pull Tolerance Interval:**

License Pull Tolerance Interval（"License consumption on different server tolerance interval"）は秒単位の時間幅です。最初の要求とは別のサーバーで正常なライセンス取得が行われた場合、その拒否は false とみなされます。

## Excluded Denials

拒否レコードは、License Server と Major Error Code または Error Message の値が一致した場合に保存されず、レポートにも含まれません。Major Error Code または Error Message が未入力の場合、すべてのレコードが記録されます（License Server 単独では除外されません）。

1. 除外すべき Error Message Code および/または Error Message を特定します。これは完成したレポート、データベースクエリ、またはライセンスマネージャーのドキュメントから確認できます。

2. EasyAdmin の Denials 管理画面を開きます（**Start > Administration > Denials**）。

3. **License Servers** パネル下部の **Add** ボタンをクリックします。パネルに新しい行が作成され、必須フィールドが表示されます。

![A row inserted into the License Servers Panel using Add button](/img/legacy/a-row-inserted-into-the-license-servers-panel-usin-3.png)

4. Name フィールド右側の下矢印をクリックします。構成済みサーバーの選択肢が表示されるので、ドロップダウンから選択します。

5. Name フィールドで **Return/Enter** を押すか、フォーカスを外します。**Type** フィールドがライセンスサーバー構成に基づいて自動入力され、Denials Data パネルの **Add** ボタンが有効になります。

6. **Denials Data** パネルの **Add** ボタンをクリックします。パネルに新しい行が作成されます。

7. 新しい行に Major Error Code および/または Error Message を入力します。

*注: ここで使用するのは Major Error Codes のみです。Minor Error Codes はフィルタリング用途として設計されておらず、正しい結果が得られません。*

8. **Return/Enter** を押して入力を確定します。

9. **Step #6** 〜 **Step #8** を繰り返して、同じサーバーに追加のコードを登録します。

10. **Step #3** 〜 **Step #9** を繰り返して、追加のサーバーとエラーコードを登録します。

11. **Save** ボタンをクリックして変更を保存します。

![ Click [Save] to commit the changes.](/img/legacy/click-save-to-commit-the-changes-1-3.png)

これで Excluded Denials の設定は完了です。次のセクションで、設定が意図通りに機能しているかを確認します。

## Excluded Denials の設定確認

新しいルールを反映した制限付きのパラメータでレポートを実行し、拒否が除外されているか確認できます。

1. Windows の Start メニューから **EasyAdmin** を開きます。

2. Denials へ移動します: **Start > Reports > Denials**。

3. 直前のセクションで追加した **Server Name** と **Denial Error Message** を入力します。

4. **Start Time**（例: 現在の DD/MM/YYYY と HH:MM）を、Excluded Denials 設定を保存した後の期間に限定します。

5. **Apply** をクリックしてレポート結果を確認します。

![The report result should show "No Results Found."](/img/legacy/the-report-result-should-show-no-results-found-1-3.png)

Denials チャートに結果が表示される場合は、OpenLM サポート（[support@openlm.com](mailto:support@openlm.com)）へお問い合わせください。

*6. [Optional]* ルール適用前の期間を広めに指定してレポートを実行し、以前の拒否レコードが表示されることを確認します。ルール適用前の期間で記録が表示されれば、設定は正しく機能しています。

## Aggregation settings

Denials Aggregation は、設定した期間内で繰り返し発生する拒否を集計します。収集された拒否は指定期間で集計され、集計された Denials レポートに表示されます。

OpenLM SLM は、設定された期間で拒否を集計し、使いやすい形式で表示します:

 1. EasyAdmin の Denials 管理画面を開きます（**Start > Administration > Denials**）。

 2. Aggregation **Settings** タブをクリックします。**Aggregation Interval** パネル下部の **Add** ボタンをクリックし、新しい行を作成して必須フィールドを表示します。

![Aggregation Settings Screen ](/img/legacy/aggregation-settings-screen-3.png)

 3. **License Server** フィールド右側の下矢印をクリックし、構成済みサーバーの一覧から選択します。**Type** フィールドはライセンスサーバー構成に基づいて自動入力されます。

 4. **Time Interval** を分単位で設定します。

![Time Interval Settings](/img/legacy/time-interval-settings-3.png)

 5. ドロップダウンで **Enabled** を選択すると、そのライセンスサーバーの拒否集計が有効になります。**Disabled** を選択すると無効になります。

 6. **Aggregation Interval** パネル下部の **Save** ボタンをクリックして集計設定を保存します。

## Aggregated Denials の確認

Aggregated Denials を確認するには:

1. EasyAdmin の Denials 管理画面を開きます（**Start > Reports > Denials**）。

2. **Show Aggregated Denials** をチェックします。

3. **Server Name** を選択し、必要に応じて Denials - Filter に他の情報を入力します。

4. **Denials** 画面下部の **Apply** ボタンをクリックします。

![Denials - Filter settings](/img/legacy/denials-filter-settings-3.png)

選択したサーバーの集計拒否が次のように表示されます:

![Aggregated denials displayed for the selected server](/img/legacy/aggregated-denials-displayed-for-the-selected-serv-3.png)
