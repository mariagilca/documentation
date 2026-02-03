---
title: "Applications Managerの最適構成"
sidebar_label: "Applications Manager の最適構成"
---

<!-- Source: https://www.openlm.com/knowledge-base/optimal-configuration-applications-manager-kb803/ -->

# Applications Manager の最適構成

本ドキュメントでは、サーバーで OpenLM Applications Manager を稼働させるために必要な最適なハードウェア構成について説明します。

推奨事項は以下のとおりです:

* 各ネットワークカードごとに VM のネットワークコントローラを割り当てる。
* 1 秒あたり複数回の checkout/checkin を行うコンパイラ向けには、文末の表に記載された仕様より 25%〜50% 高いスペックを推奨します。

例:

![](/img/legacy/kb/table1.png)

* VM 管理者は、ホスティングサーバーが必要なリソースを確保できることを確認してください。
* DB クエリの性能が低い場合は、ディスクキューを確認してください。
* DB は OpenLM SLM と同じデータセンターに配置することを強く推奨します。
* MS SQL Server の推奨事項は以下を参照してください。
* MySQL については、Windows 用（my.ini）と Linux 用（my.cnf）のサンプル設定ファイルを提供しています。DBA が環境に合わせて見直してください。

## MySQL のベストプラクティス

1. 最新の MySQL 5.7/8 系リリースを使用してください。
2. システムリソースを最大限活用するには、MySQL の設定ファイル（my.cnf/my.ini）に適切な値を設定する必要があります。設定が不十分だと、ホストマシンのリソースを活用できません。システム規模に応じた設定例を .zip で用意していますので参照してください:  
   [4GB_2Cores_Windows](https://www.openlm.com/wp-content/uploads/2018/10/my_4GB_2Cores_Windows.zip)

## MS SQL Server のベストプラクティス

1. 次の内容を含むメンテナンスプランを適用してください:
   - 定期的な統計情報の更新
   - 定期的なインデックスのリビルドまたは再編成

   DBA は OpenLM DB に対しても社内のメンテナンスポリシーを適用する必要があります。ポリシーがない場合は、公開パッケージを適用できます。

2. Windows マシンで MSSQL Server を（ほぼ）専用稼働させる場合、割り当てメモリは総メモリの 80% を超えないことを推奨します。

3. OpenLM データベースの is_read_committed_snapshot_on パラメータを有効にしてください。

確認方法:

```
SELECT is_read_committed_snapshot_on FROM sys.databases WHERE name= 'YourDatabase'
```

設定方法:

```
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

4. 性能向上のため、tempdb、データベース、ログファイルを別々の論理ディスク（場合によっては物理ディスク）に配置することを推奨します。構成例は以下です:

   1. tempdb データ用ディスク（SSD 推奨）
   2. システム DB 用ディスク（msdb、model、master）
   3. すべてのログ用ディスク（tempdb ログを含む）
   4. すべての DB データ用ディスク

5. tempdb はパラメータや一時テーブル、ソート・集計などを扱う重要な役割を担います。tempdb のデータファイル数は CPU 数と同数にすることを推奨します（最大 8。増やしても効果がないか、性能低下の可能性があります）。

6. データベースファイルの自動拡張は既定で % 指定になっていますが、これは危険です。予測成長量にレコードサイズを掛けた値を基に MB 単位で指定することを推奨します。いずれの場合でも、ディスク容量に対するアラート設定を推奨します。

7. ログサイズは事前に設定することを推奨します。

8. 障害復旧とログファイルの増大管理のため、定期的なバックアップを推奨します。データベースの縮小は悪いプラクティスであり推奨しません。

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| エージェント | App Manager サーバー | | | | | | データベースサーバー | | | |
| エージェント数 | DB タイプ | アプリケーション数 | CPU | メモリ | ネットワークカード | ディスク | CPU | メモリ | ネットワークカード | ディスク |
| 3000 | 内部 | 10 | 4 コア | 4GB | 1Gbit | 高速 HD | - | - | - | - |
| 10000 | 外部 | 75 | 8 コア | 12GB | 10Gbit | 高速 HD | 8 コア | 16GB | 10Gbit | 高速 HD |
| 15000 | 外部 | 75 | 8 コア | 16GB | 10Gbit | 高速 HD | 8 コア | 16GB | 10Gbit | 高速 HD |
