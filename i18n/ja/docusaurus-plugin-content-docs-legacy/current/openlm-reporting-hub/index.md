---
title: Reporting Hubインストールガイド
description: "OpenLM Reporting Hub のインストールガイド。"
sidebar_position: 1
---
## ダウンロードと解凍

1. [ダウンロード](https://www.openlm.jp/downloads/)した OpenLM Reporting Hub を、Reporting Hub を配置するサーバーに解凍します。
2. Reporting Hub をホストするサーバーに解凍します。OpenLM SLM と同じサーバーに置くことも、別のサーバーに置くこともできます。

## ライセンスファイル

1. 解凍した Reporting Hub フォルダに移動します。
2. ETL folder → Jobs folder → License folder に移動します。
3. ライセンスファイルを license folder に貼り付けます。

## Reporting データベース

1. 解凍した Reporting Hub フォルダ → Postgres フォルダ → "Postgres Server.exe" をインストールします。インストール中は **Stack Builder** を未選択のままにし、PostgreSQL のパスワードを必ず控えてください。
2. Postgres の "data" フォルダ (C:\...\PostgreSQL\14\data) に移動します。
3. 管理者権限のテキストエディタで "**pg_hba.conf**" ファイルを開きます。
4. **Ipv4 local connections settings** セクションを探します。
5. 既存の行をその下にコピーし、ADDRESS を 127.0.0.1/32 から **0.0.0.0/0** に変更して保存します。  
   ![pg_hba.conf ファイルで IPv4 ローカル接続のアドレスを編集している画面。](/img/legacy/Screenshot-2023-10-12-at-15.27.32.png)
6. Postgres の "data" フォルダ (C:\...\PostgreSQL\14\data) に移動します。
7. 管理者権限のテキストエディタで "**PostgreSQL.conf**" ファイルを開きます。  
   \* **work_mem** がコメントアウトされていないこと、かつ 4MB〜12MB（環境に応じて）であることを確認します。この行は 1 行あたりの最大データ量を指定します。デフォルトは 4MB（推奨）です。  
   \* **shared_buffers** がコメントアウトされていないこと、かつ 2048〜8192MB（環境に応じて）であることを確認します。デフォルトは 128KB です。
8. 編集したファイルを保存し、Windows Services から PostgreSQL サービスを再起動します。
9. Windows Start → **PGAdmin 4** を起動します。Windows Search で探しても構いません。
10. 接続するには PostgreSQL 14 をクリックし、パスワード（手順 1）を入力して OK をクリックします。
11. PostgreSQL 14 を右クリック → Create → Database → 新しい DB 名を "ReportingHub" として保存します。

## Power BI

- 解凍した Reporting Hub フォルダ → Power BI フォルダ → "Power BI Desktop.msi" をインストール → "Power BI Connector.msi" をインストール（GAC コンポーネントを含む全コンポーネントをこのマシン全体にインストール）。

## Connection properties

1. 解凍した Reporting Hub フォルダ → ETL フォルダ → "Edit_connection.bat" を実行します（プロンプトが開かない場合は、kettle.kettle フォルダの kettle.properties を Notepad などのテキストエディタで開きます）。
2. ソースデータベースの詳細（server, port, username, password, database name&schema）を入力します。
3. 宛先 Postgres データベースの詳細（server, port, username, password, database name）を入力します。
4. （任意）宛先 MSSQL または MySQL データベースの詳細（server, port, username, password, database name）を入力します。
5. **License params** セクションの指定フィールドに server hostname、MAC address、License Name を入力します。
6. SMTP サーバーの詳細（server, port, username, password, sender email, destination email）を入力します。

### **利用可能なプロパティ:**

```
ETL_TIMEZONE=int value 0..24 Default 0: タイムゾーンオフセット
ETL_LIVE=true/false Default false: （未実装）
ETL_DATA_AGGREGATION_BY_HOUR=true/false (true の場合は時間単位、false の場合は日単位で最小集計)
ETL_RUN_ON_INCREMENTS=true/false (true の場合は差分実行、false の場合は毎回全データを同期)
ETL_COMPILE_RESERVED_LICENSES=true/false (Default true: true の場合は予約ライセンスを使用中として扱い、false の場合は予約を無視)
ETL_SHOW_ONLY_TRUE_DENIALS=true/false Default false: true の場合は真の拒否のみ抽出し、false の場合は false denials も抽出
ETL_DENIALS_AGGREGATION_PERIOD=integer value. Default 0 (拒否の集計に用いる時間間隔(分))
ETL_EXPORT_DENIALS_INTERVAL=integer value. (Default 7: 1 回の転送イテレーションあたりの日数。値: 7-30 (大きな DB は 7、小さな DB は 30))
ETL_ANONYMIZE=true/false (Default false: "true" の場合、宛先データベースでユーザー名、ホスト名、メールなどの機微情報をマスク)
ETL_FILTER_BY_VENDOR=accepts a CSV string as input. Default empty. (指定すると、このリストのベンダーのみ処理)
```

## ETL scheduling

1. "Windows Task Scheduler" を起動し、"Task Scheduler Library" を選択します。
2. "Actions" の下で "Create Task" をクリックします。
3. "General" タブでタスク名を "OpenLM ETL" にします。
4. "Run whether the user is logged on or not" にチェックを入れます。
5. "Run with highest privileges" にチェックを入れます。
6. " Triggers " タブに移動して "New" をクリックします。
7. 毎日 0:00 にスケジュールを設定し、OK をクリックします。
8. " Actions " タブに移動して "New" をクリックします。
9. アクションは "Start a program" を選択します。
10. "Run ETL.bat" ファイルを選択します。
11. OK をクリックし、ETL のスケジュールタスクが設定されます。

## Run ETL

1. 解凍した **Reporting Hub** フォルダ → **ETL** フォルダ → "**Run ETL.bat**" を実行します。完了まで時間がかかる場合があります。

## Sample reports

1. "OpenLM Reporting Hub" フォルダ内の "Reports" フォルダに移動します。
2. レポートをダブルクリックして起動します。
3. Power BI → "Edit Queries" → "Data Source Settings" → "Change source"。
4. 正しい PostgreSQL host と database 名を入力して "OK" をクリックします。
5. "Edit Permissions" → "Edit" をクリックします。
6. 正しい Postgres username と password を入力し、"OK" をクリックします。
7. データを更新するか "Apply Changes" をクリックします。
