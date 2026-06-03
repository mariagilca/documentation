---
title: "OpenLM データベースの最適な構成"
sidebar_label: "データベースの最適な構成"
sidebar_position: 3
description: "MySQL、MS SQL Server、MariaDB における OpenLM データベースの推奨設定とベストプラクティス。"
---

{/* Source: https://www.openlm.com/knowledge-base/openlm-database-optimal-configuration/ */}

本ドキュメントでは、MySQL、MS SQL Server、MariaDB 上で OpenLM データベースを運用するための推奨設定とベストプラクティスをまとめます。

## 推奨事項

- バイナリログが有効な場合、一部のアップグレードスクリプトを実行するにはデータベースユーザーに SUPER 権限が必要です。バイナリログが有効かどうかを確認するには、次を実行します。

  ```sql
  SHOW VARIABLES LIKE 'log_bin';
  ```

- 現在のユーザーが SUPER 権限を持っているかどうかを確認するには、次を実行します。

  ```sql
  SELECT *
  FROM INFORMATION_SCHEMA.USER_PRIVILEGES
  WHERE PRIVILEGE_TYPE = 'SUPER'
    AND REPLACE(GRANTEE, '''', '') = CURRENT_USER();
  ```

- `log_bin_trust_function_creators` を有効にすると、関数およびプロシージャの作成を許可できます。有効かどうかを確認するには、次を実行します。

  ```sql
  SHOW VARIABLES LIKE 'log_bin_trust_function_creators';
  ```

- レプリケーションが有効でなく、ポイントインタイムリカバリも不要な場合は、バイナリログを無効にすることもできます。
- 1 秒間に複数回のチェックアウト/チェックインを行うコンパイラーの場合、ベースラインより 25%〜50% 高性能なハードウェアを推奨します。
- VM 管理者は、ホスティングサーバーが必要なリソースに対応できることを確認してください。
- DB クエリのパフォーマンスが低い場合は、ディスクキューを確認してください。
- データベースは OpenLM Server と同じデータセンターに配置することを強く推奨します。
- MySQL については、Windows 用 (`my.ini`) および Linux 用 (`my.cnf`) のサンプル構成ファイルを提供しています。適用前に DBA が確認してください。
- 各ネットワークカードに対して、VM ネットワークコントローラーを 1 つ用意してください。
- 高負荷下の大規模データベース (25 GB 以上) では、各データベースに 3 つのファイルと 3 つの VM ディスクコントローラー（データベースファイル、ログファイル、temp ファイルに 1 つずつ）を用意してください。

## MySQL を使用する場合のベストプラクティス

1. 最新の MySQL 5.7/8 リリースを使用します。
2. システムのリソースを活用するには、MySQL の構成ファイル (`my.cnf` / `my.ini`) に適切な値を設定する必要があります。設定しない場合、MySQL はホストマシンのリソースを十分に活用できません。次のサンプル構成ファイル (`.zip` 形式) は一般的なシステム規模に対応しています。適用前に DBA とともに確認してください。

   - [8GB_4Cores_Windows](https://www.openlm.com/wp-content/uploads/2018/10/my_8GB_4Cores_Windows.zip)
   - [16GB_8Cores_Linux](https://www.openlm.com/wp-content/uploads/2018/10/My_16GB_8Cores_Linux.zip)
   - [16GB_8Cores_Windows](https://www.openlm.com/wp-content/uploads/2018/10/my_16GB_8Cores_Windows.zip)
   - [24GB_8Cores_Windows](https://www.openlm.com/wp-content/uploads/2018/10/my_24GB_8Cores_Windows.zip)

## MS SQL Server を使用する場合のベストプラクティス

1. 次の項目で構成されるメンテナンスプランを適用します。
   - 統計情報の定期的な更新。
   - インデックスの定期的な再構築または再編成。

   DBA は、社内のメンテナンスポリシーを OpenLM データベースにも適用してください。そのようなポリシーがない場合は、公開パッケージ（例: [Ola Hallengren のメンテナンスソリューション](https://ola.hallengren.com/)）を使用できます。

2. Windows マシン上でほぼ専用に稼働する MSSQL Server に推奨されるメモリ割り当ては、マシン全体のメモリの 80% 以下です。

3. OpenLM データベースでは、`is_read_committed_snapshot_on` パラメーターを設定してください。

   設定されているかどうかを確認するには、次を実行します。

   ```sql
   SELECT is_read_committed_snapshot_on
   FROM sys.databases
   WHERE name = 'YourDatabase';
   ```

   設定するには、次を実行します。

   ```sql
   DECLARE @sqlCommand varchar(1000)
   DECLARE @db_name varchar(50)

   SET @db_name = 'YourDatabase'

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET ALLOW_SNAPSHOT_ISOLATION ON '
   EXEC (@sqlCommand)

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET SINGLE_USER WITH ROLLBACK IMMEDIATE '
   EXEC (@sqlCommand)

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET READ_COMMITTED_SNAPSHOT ON '
   EXEC (@sqlCommand)

   SET @sqlCommand = 'ALTER DATABASE ' + @db_name + ' SET MULTI_USER '
   EXEC (@sqlCommand)
   ```

4. パフォーマンスを向上させるため、`tempdb`、データベース、ログファイルを別々の論理（場合によっては物理）ディスクにインストールします。堅牢な構成は次のとおりです。

   - `tempdb` データ用に 1 ディスク（SSD 推奨）。
   - システム DB (`msdb`、`model`、`master`) 用に 1 ディスク。
   - すべてのログ（`tempdb` ログを含む）用に 1 ディスク。
   - すべての DB データ用に 1 ディスク。

5. `tempdb` は重要な役割を担い、パラメーターや一時テーブルを格納し、ソートや集計を実行します。`tempdb` データファイルの数はプロセッサ数に合わせ、最大 8 までを推奨します（それ以上はパフォーマンスに効果がないか、悪影響を及ぼします）。
6. データベースファイルの自動拡張の単位は既定でパーセンテージですが、これは危険です。予測される増加量にレコードサイズを掛けた値に基づき、MB 単位を使用してください。いずれの場合も、ディスクサイズにアラートを設定してください。
7. ログサイズはあらかじめ設定してください。
8. クラッシュからの復旧とログファイルの増大の抑制のため、定期的なバックアッププログラムを推奨します。データベースの縮小 (shrink) は不適切な運用であり、推奨しません。

### ハードウェアサイジングの目安

| ユーザー数 | ポート数 | エージェント数 | サーバー CPU | サーバーメモリ | サーバーネットワーク | DB CPU | DB メモリ | DB ディスク | DB ネットワーク |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 500 | 5 | – | 4 コア | 16 GB | 1 Gbit | – | – | – | – |
| 1,000 | 5 | – | 4 コア | 16 GB | 1 Gbit | – | – | – | – |
| 5,000 | 20 | – | 4 コア | 16 GB | 1 Gbit | 2 コア | 8 GB | 10K+ RPM HDD または SSD | 1 Gbit |
| 5,000 | 50 | – | 4 コア | 16 GB | 1 Gbit | 4 コア | 12 GB | 10K+ RPM HDD または SSD | 1 Gbit |
| 10,000 | 50 | – | 4 コア | 16 GB | 1 Gbit | 4 コア | 16 GB | 10K+ RPM HDD または SSD | 1 Gbit |
| 15,000 | 200 | – | 4 コア | 32 GB | 10 Gbit | 8 コア | 16 GB | 10K+ RPM HDD または SSD | 10 Gbit |
| 30,000 | 500 | – | 8 コア | 32 GB | 10 Gbit | 8 コア | 24 GB | 10K+ RPM HDD または SSD | 10 Gbit |
| 250 | 5 | 50 | 4 コア | 16 GB | 1 Gbit | – | – | – | – |
| 500 | 5 | 100 | 4 コア | 16 GB | 1 Gbit | – | – | – | – |
| 1,000 | 10 | 250 | 4 コア | 16 GB | 1 Gbit | 4 コア | 8 GB | 10K+ RPM HDD または SSD | 1 Gbit |
| 5,000 | 20 | 500 | 4 コア | 16 GB | 1 Gbit | 4 コア | 12 GB | 10K+ RPM HDD または SSD | 1 Gbit |
| 10,000 | 50 | 500 | 4 コア | 16 GB | 1 Gbit | 8 コア | 16 GB | 10K+ RPM HDD または SSD | 1 Gbit |
| 15,000 | 100 | 500 | 4 コア | 16 GB | 10 Gbit | 8 コア | 16 GB | 10K+ RPM HDD または SSD | 10 Gbit |
| 15,000 | 300 | 3,000 | 8 コア | 32 GB | 10 Gbit | 12 コア | 24 GB | 10K+ RPM HDD または SSD | 10 Gbit |
| 30,000 | 500 | 15,000 | 24 コア | 64 GB | 10 Gbit | 16 コア | 64 GB | 10K+ RPM HDD または SSD | 10 Gbit |

## MariaDB を使用する場合のベストプラクティス

:::note
ファイルを変更する前に `my.ini` をバックアップしてください。
:::

### 8 GB

```ini
innodb_buffer_pool_size=5G
innodb_io_capacity=1500
innodb_open_files=3000
max_allowed_packet=1G
max_connections=500
max_heap_table_size=1G
thread_cache_size=500
tmp_table_size=1G
```

### 16 GB

```ini
innodb_buffer_pool_size=12G
innodb_io_capacity=2500
innodb_open_files=5000
max_allowed_packet=1G
max_connections=500
max_heap_table_size=2G
thread_cache_size=1000
tmp_table_size=2G
```

### 24 GB

```ini
innodb_buffer_pool_size=18G
innodb_io_capacity=3000
innodb_open_files=80000
max_allowed_packet=2G
max_connections=1000
max_heap_table_size=3G
thread_cache_size=2000
tmp_table_size=3G
```
