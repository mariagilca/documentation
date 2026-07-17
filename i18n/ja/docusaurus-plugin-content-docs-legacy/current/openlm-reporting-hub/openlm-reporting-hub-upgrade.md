---
title: Reporting Hubのアップグレード
description: 最新版の Reporting Hub を https://www.openlm.com/downloads/ReportingHub/Latest からダウンロードします。
sidebar_position: 5
---
## 注意:

- ETL のバージョンをアップグレードする際は、古いフォルダをリネームするか削除してください。
- インストールは空のフォルダで行ってください。既存フォルダに上書きすると、後続リリースで削除されたファイルが残り、機能不全の原因になります。
- ETL をアップグレードする前に、既存の `kettle.properties` ファイルを保持しておくことを推奨します。
- 新しいリリースでは、`kettle.properties` ファイルに新しいパラメータが追加される場合があります。
- 新しい空の構成を既存のものに置き換えると、新しいファイルでパラメータ構成が異なる場合に機能が壊れる可能性があります。

### Reporting Hub のアップグレード手順

1. Reporting Hub の現在のインストールパスに移動し、"C:...ETLJobsLicense" にある **ライセンスのバックアップ** ファイルをコピーします。

![ETL Jobs フォルダー内の Reporting Hub ライセンスファイルをバックアップしている画面。](/img/legacy/word-image-118.png)

2. "C:...ETLJobsLicense" にある **kettle ファイルのバックアップ** をコピーします。ここにはデータベース接続情報と ETL 設定が保存されています。

![データベース接続情報と ETL 設定を含む kettle.properties ファイルをバックアップしている画面。](/img/legacy/word-image-119.png)

3. **最新の Reporting Hub (RH) をダウンロード** します: [https://www.openlm.com/downloads/ReportingHub/Latest](https://www.openlm.com/downloads/ReportingHub/Latest)

![最新バージョンをダウンロードする OpenLM Reporting Hub のダウンロードページ。](/img/legacy/word-image-120.png)

4. **解凍して置き換え**、ダウンロードした ETL フォルダで現在の ETL フォルダを置き換えます。

![ダウンロードした ETL フォルダーを解凍して既存のフォルダーを置き換える画面。](/img/legacy/word-image-121.png)

![既存の ETL フォルダーをダウンロード版に置き換えている画面。](/img/legacy/word-image-122.png)

5. 保存しておいた **ライセンスファイル** を "C:...ETLJobsLicense" フォルダに **貼り付け** ます。

![保存したライセンスファイルを ETL Jobs フォルダーに貼り付けている画面。](/img/legacy/word-image-123.png)

6. 元の **kettle.properties** ファイルから、次の項目をコピーします:

a. Source Database (注: FireBird の項目はサポート終了のため削除されています)。

![kettle.properties ファイル内のソースデータベースのエントリ。](/img/legacy/word-image-124.png)

b. Reporting database のエントリを照合します。

![kettle.properties ファイル内のレポーティングデータベースのエントリ。](/img/legacy/word-image-125.png)

c. Destination database（使用する場合。MSSQL または MySQL）

![kettle.properties ファイル内の宛先データベース（MSSQL または MySQL）のエントリ。](/img/legacy/word-image-126.png)

d. 元の Kettle.properties ファイルから SMTP サーバーの詳細を入力します。

![kettle.properties ファイル内の SMTP サーバーの詳細設定。](/img/legacy/word-image-127.png)

e. License params の項目を入力します。

![kettle.properties ファイル内のライセンスパラメーターのエントリ。](/img/legacy/word-image-128.png)

f. 正しい ETL flagging** を設定します:

![kettle.properties ファイル内の ETL フラグのエントリ。](/img/legacy/word-image-129.png)

7. 宛先データベースに MySQL または MS SQL Server を使用する場合のみ: 宛先の Reporting Hub MySQL / MSSQL データベース内の **すべてのテーブルを削除** します。スキーマは再作成されます。

![宛先の Reporting Hub データベース内のすべてのテーブルを削除している画面。](/img/legacy/word-image-130.png)

8. 変数 "ETL_RUN_ON_INCREMENTS" を "**false**" に設定し、kettle ファイルを保存します。

![kettle ファイルで ETL_RUN_ON_INCREMENTS を false に設定している画面。](/img/legacy/word-image-131.png)

9. "**Run_ETL.bat**" ファイルで **ETL を実行** します。これにより古い DB スキーマが削除され、再作成されます。

![Run_ETL.bat ファイルで ETL を実行している画面。](/img/legacy/word-image-132.png)

10. 実行完了後、変数 "ETL_RUN_ON_INCREMENTS" を "**true**" に戻して kettle ファイルを保存します。

![kettle ファイルで ETL_RUN_ON_INCREMENTS を true に設定している画面。](/img/legacy/word-image-133.png)

**

## Kettle file の ETL フラグ一覧:

- 1. ETL_DATA_AGGREGATION_BY_HOUR (true/false)
     - データを日単位で集計するか、時間単位で集計するかを選択します。
  2. ETL_RUN_ON_INCREMENTS (true/false)
     - ETL を差分実行するか、毎回データベースを再作成するかを選択します。
  3. ETL_COMPILE_RESERVED_LICENSES (true/false)
     - 予約ライセンスを、実際に使用中のライセンスとして表示します（予約が使われていなくても表示）。
  4. ETL_SHOW_ONLY_TRUE_DENIALS (true/false)
     - 誤った拒否（false denials）を除外するか、表示するかを選択します。
  5. ETL_EXPORT_DENIALS_INTERVAL (Whole Number)
     - 近接した拒否を 1 件の拒否イベントにまとめます。数値は、拒否を集計したい期間を表します（0 は拒否の集計なし）。
  6. ETL_ANONYMIZE (true/false)
     - 高いセキュリティが必要な場合に、ユーザー名やグループ名などの個人情報を匿名化できます。
  7. ETL_FILTER_BY_VENDOR (text list separated by ",")
     - 対象とするベンダーのみをフィルタします（空の場合はすべてのベンダー）。
  8. ETL_EXPORT_RAW_START_DATE='2010-01-01 00:00:00'
     - 選択した日付以降のデータを取得します。

![ETL 設定変数を示す kettle ファイルの ETL フラグマップ。](/img/legacy/word-image-134.png)
