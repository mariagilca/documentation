---
title: "Cleanup Manager モジュール"
sidebar_position: 3
---
Cleanup Manager は、OpenLM データベースから不要な情報を削除するバックグラウンドプロセスを実行します。対象には、組織に所属していないグループやユーザー、またはエンジニアリングライセンスを使用しなくなったユーザーなどが含まれます。

Cleanup Manager は、不要な使用履歴データの削除（履歴のパージ）も可能です。期間を指定して古い情報を削除できます。

## Cleanup Manager の起動

クリーンアップツールを開くには、**OpenLM User Interface** の **Start** ボタンをクリックし、**Administration** を選択します:

![](/img/legacy/word-image-85.png)

次に **Cleanup Manager** アイコンをクリックします:

![](/img/legacy/word-image-86.png)

**Cleanup Manager** ウィンドウが次の設定で開きます:

![](/img/legacy/word-image-87.png)

**History**: 不要な使用履歴データを削除します。期間を選択して古い情報をパージします。

**Groups**: OpenLM に使用履歴がないグループ名を削除します。

**Users**: OpenLM に使用履歴がない不要なユーザーを削除します。使用履歴があるユーザーは削除されません。

### 履歴のクリーンアップ

履歴を削除する前に、誤削除を防ぐため必ずデータのバックアップを取得してください。

不要な使用履歴を削除するには、**Start date/time** と **End date/time** で期間を指定します:

![](/img/legacy/word-image-88.png)

**Run** ボタンを押すと **Cleanup Monitor** がポップアップを表示し、意図した操作であることを確認します。**Yes** で続行、**Cancel** でキャンセルします。

![](/img/legacy/word-image-89.png) **Yes** を選択すると、クリーンアップ結果を表示する新しいウィンドウが開きます。結果は Clear ボタンで消去、Refresh ボタンで更新、Export ボタンでエクスポートできます:

![](/img/legacy/word-image-90.png)

## グループのクリーンアップ

グループをクリーンアップするには **Cleanup Manager** を開き、**Groups** ラジオボタンを選択します:

![](/img/legacy/word-image-91.png)

**Creation Sources** ドロップダウンから次を選択します:

- **[All]** すべての作成元のグループ

- **LDAP Sync** LDAP Sync アプリケーションで作成されたグループ

- **Manual** OpenLM User Interface で手動作成されたグループ

- **Options File** Options File から作成されたグループをクリーンアップ

Run ボタンを押してクリーンアップを開始します。確認ウィンドウが表示されます:

![](/img/legacy/word-image-92.png)

**Yes** を押してクリーンアップ開始を確認します。

**Cleanup Monitor** ウィンドウが開き、削除結果が表示されます:

![](/img/legacy/word-image-93.png)

削除結果を消すには、削除されたグループ (1) を選択し、**Clear** ボタン (2) を押します:

![](/img/legacy/word-image-94.png)

### ユーザーのクリーンアップ

ユーザーをクリーンアップするには **Cleanup Manager** を開き、**Users** ラジオボタンを選択します:

![](/img/legacy/word-image-95.png)Creation Sources のドロップダウンから次を選択します:

**[All]** - すべての作成元のユーザーを選択

**License Usage** - ライセンスのチェックアウト時に OpenLM が検出したユーザーを削除

**LDAP Sync** - Active Directory/eDirectory/Apache DS など LDAP 対応ディレクトリから同期されたユーザーを削除

**Manual** - OpenLM User Interface で手動追加されたユーザーを削除

**Options File** - options file から作成されたユーザーを削除

**Agent** - OpenLM Agent により追加されたユーザーを削除

**Router** - OpenLM Router により追加されたユーザーを削除

### 履歴ユーザーの匿名化

選択した期間の全ユーザー履歴を匿名化するには **Cleanup Manager** を開き、**Anonimyze Users** ラジオボタンを選択します。開始日と終了日を選び、**Run** をクリックします:

![](/img/legacy/cleanup-manager.png)

## GDPR ユーザー匿名化オプション

特定のユーザーを匿名化して個人情報を非表示にするには、**GDPR Anonymize User** を使用します。ユーザー名だけでなく、Username、First、Last、Display Name、Phone、Email も GDPR_XXXXXXXX 形式に置き換えられます。**GDPR Anonymize User** ボタンを押して開始します:

![](/img/legacy/word-image-96.png)

匿名化するユーザーを選択 (1) し、**Select** ボタン (2) を押します:

![](/img/legacy/word-image-97.png)

ユーザーが識別される User ID を確認し、**Run Anonymization** をクリックして続行します:

![](/img/legacy/word-image-98.png)

**Confirmation** ウィンドウで **Yes** を押します:

![](/img/legacy/word-image-99.png)

User **Anonymization Summary** ウィンドウのメッセージを確認し、OpenLM のアプリケーション/機能に個人データが残る可能性があるため、必要に応じて手動削除が必要である点に注意してください。

![](/img/legacy/word-image-100.png)
