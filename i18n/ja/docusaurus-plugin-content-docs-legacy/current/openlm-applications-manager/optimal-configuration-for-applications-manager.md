---
title: "Applications Managerの最適構成"
sidebar_position: 6
---
OpenLM Applications Manager をサーバーで運用するために必要な最適なハードウェア構成について説明します。

推奨事項は次のとおりです:

- VM の各ネットワークカードにネットワークコントローラが利用可能であること
- 1 秒あたり複数回のチェックアウト/チェックインを行うコンパイラに対しては、本書末尾の表に記載された仕様より 25%〜50% 高いハードウェア構成を推奨します。

例:

![](/img/legacy/table1.png)

- VM 管理者は、ホスティングサーバーが必要なリソースを確保できることを確認してください。
- DB クエリの性能が低い場合は、ディスクキューを確認してください。
- DB は OpenLM SLM と同じデータセンターに配置することを強く推奨します。
- 以下の MS SQL Server 推奨事項も参照してください。
- MySQL については、Windows（my.ini）および Linux（my.cnf）用のサンプル設定ファイルを提供しています。DBA が内容を見直す必要があります。

## MySQL のベストプラクティス

1. 最新の MySQL 5.7/8 リリースを使用します。
2. システムリソースを十分に活用するため、MySQL の設定ファイル（my.cnf/my.ini）を適切な値に設定する必要があります。設定が適切でない場合、ホストマシンのリソースを活用できません。設定例として、システム規模に応じた .zip 形式の設定ファイルを用意しています:  
   [4GB_2Cores_Windows](/zips/my_4GB_2Cores_Windows.zip)

## MS SQL Server のベストプラクティス

1. 次のメンテナンス計画を適用する必要があります:

1. 定期的な統計更新
2. 定期的なインデックスの再構築または再編成
DBA は OpenLM DB に対しても社内のメンテナンスポリシーを適用する必要があります。ポリシーが存在しない場合は、公開パッケージを適用できます。

2. Windows マシン上で（ほぼ）専用で動作する MSSQL Server の推奨メモリ割り当ては、マシンの総メモリの 80% を超えないようにします。

3. OpenLM データベースには is_read_committed_snapshot_on パラメータを設定する必要があります。

設定されているか確認するには:

```
SELECT is_read_committed_snapshot_on FROM sys.databases WHERE name= 'YourDatabase'
```

設定するには:

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

4. パフォーマンス向上のため、tempdb、データベース、ログファイルは別々の論理ディスク（場合によっては物理ディスク）に配置することを推奨します。以下のような構成が望ましいです:

1. tempdb データ用に 1 ディスク（SSD 構成を推奨）
2. システム DB（msdb、model、master）用に 1 ディスク
3. すべてのログ（tempdb ログを含む）用に 1 ディスク
4. すべての DB データ用に 1 ディスク

5. tempdb は重要な役割を持ち、すべてのパラメータ、テンポラリテーブル、ソートおよび集計の実行に使用されます。tempdb のデータファイル数は、プロセッサ数と同数（最大 8）を推奨します（それ以上は効果がないか、パフォーマンスを低下させる可能性があります）。

6. データベースファイルの自動増加単位は既定でパーセンテージになっており、危険です。良い方法としては、レコードサイズを加味した予測成長量に基づいて MB 単位を使用します。いずれにせよ、ディスクサイズのアラート設定を推奨します。

7. ログサイズは事前に設定することを推奨します。

8. クラッシュ後の復旧とログファイルの成長管理のため、定期バックアッププログラムを推奨します。データベースの縮小は悪い慣行であり、推奨しません。

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Agent | App Manager サーバー | | | | | | データベースサーバー | | | |
| エージェント数 | DB 種別 | アプリケーション数 | CPU | メモリ | ネットワークカード | ディスク | CPU | メモリ | ネットワークカード | ディスク |
| 3000 | Internal | 10 | 4 Cores | 4GB | 1Gbit | Fast HD | - | - | - | - |
| 10000 | External | 75 | 8 Cores | 12GB | 10Gbit | Fast HD | 8 Cores | 16GB | 10Gbit | Fast HD |
| 15000 | External | 75 | 8 Cores | 16GB | 10Gbit | Fast HD | 8 Cores | 16GB | 10Gbit | Fast HD |
