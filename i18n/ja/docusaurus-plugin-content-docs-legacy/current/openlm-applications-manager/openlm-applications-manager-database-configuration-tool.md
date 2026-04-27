---
title: "Applications Managerデータベース設定ツール"
sidebar_position: 7
---
OpenLM Applications Manager Database Configuration ツールは、Applications Manager が使用する既定の Hyper SQL Database (HSQLDB) を SQL Server または MySQL に切り替えるために作成されました。

Applications Manager DB Configuration ツールを使用するには、Applications Manager のライセンスに外部データベースのサポートが含まれている必要があります。疑問がある場合は [sales](https://www.openlm.jp/contact-us/) または [support](https://www.openlm.jp/contact-us/) にお問い合わせください。

また、Applications Manager を多数の OpenLM Workstation Agent と併用している場合は、[Optimal Configuration for Applications Manager](./optimal-configuration-for-applications-manager.md) ガイドを必ずご確認ください。

## データベース設定ツールの起動

### Windows の場合

Applications Manager DB Configuration ツールは次の方法で起動できます:

1. Windows のスタートメニュー（*Start → OpenLM → OpenLM Applications Manager DB Configuration*）  
   ![スクリーンショット: On Windows](/img/legacy/word-image.png)
2. OpenLM Applications Manager フォルダ内の **database_configuration.bat** を実行（通常は `C:\Program Files\OpenLM\OpenLM App Manager`）

### Linux の場合

1. OpenLM Applications Manager ファイルを展開・インストールしたフォルダを開きます。

2. app_manager.sh スクリプトを dbconfig パラメータで実行します:

```
sudo ./app_manager.sh dbconfig
```

## HSQLDB の設定

これは OpenLM Applications Manager に付属する既定データベースです。DB タイプを変更していない場合、DB Provider のドロップダウンで既定選択されています。  
![Applications Manager Database Configuration tool using HSQLDB](/img/legacy/word-image-1.png)

1. 必要な設定を以下のとおり編集します:

**Connection Pool Size** - 1 つの時点でデータベースに作成できる並列接続数（既定: *50*）

**DB File Location** - HSQLDB データベースフォルダの場所（既定: Applications Manager と同じフォルダ内の **db/** フォルダ）

**User** - データベースへの接続に使用するユーザー名（既定: *sa*）

**Password** - 接続に使用するユーザー名に対応するパスワード

2. **Apply** をクリックして設定を保存し、DB Configuration ツールを閉じます。

3. Applications Manager サービスを再起動します:

*Windows*: Windows Services を開き（*Windows + R* を押して **services.msc** と入力し Enter）、"OpenLM App Manager" サービスを再起動します。

*Linux*: 次のコマンドを実行します。

```
sudo ./app_manager.sh restart
```

または

```
sudo ./app_manager.sh stop
```

続けて

```
sudo ./app_manager.sh start
```

## MySQL の設定

Applications Manager を MySQL データベースに接続するには:

1. DB Provider のドロップダウンから **MySQL** を選択します。

![Applications Manager Database Configuration tool using MySQL](/img/legacy/word-image-2.png)

2. 必要な設定を以下のとおり編集します:

**Connection Pool Size** - 1 つの時点でデータベースに作成できる並列接続数（既定: *50*）

**Server** - MySQL サーバー名

**Port** - MySQL サーバーのアクセス用ポート

**DB Name** - アクセスするデータベース名

**User ID** - データベース接続に使用するユーザー ID

**Password** - ユーザー ID に対応するパスワード

3. **Apply** をクリックして設定を保存し、DB Configuration ツールを閉じます。

4. Applications Manager サービスを再起動します:

*Windows*: Windows Services を開き（*Windows + R* を押して **services.msc** と入力し Enter）、"OpenLM App Manager" サービスを再起動します。

*Linux*: 次のコマンドを実行します。

```
sudo ./app_manager.sh restart
```

または

```
sudo ./app_manager.sh stop
```

続けて

```
sudo ./app_manager.sh start
```

## SQL Server の設定

Applications Manager を MS-SQL データベースに接続するには:

### SQL Server 認証を使用

1. DB Provider のドロップダウンから **SQL Server (SQL Server Authentication)** を選択します。

![Applications Manager Database Configuration tool using SQL Server with standard authentication](/img/legacy/word-image-3.png)

2. 必要な設定を以下のとおり編集します:

**Connection Pool Size** - 1 つの時点でデータベースに作成できる並列接続数（既定: *50*）

**Server** - SQL Server 名

**User ID** - データベース接続に使用するユーザー ID

**Password** - ユーザー ID に対応するパスワード

**DB Name** - アクセスするデータベース名（Server、User ID、Password を設定するとドロップダウンから選択可能）

3. **Apply** をクリックして設定を保存し、DB Configuration ツールを閉じます。

4. Windows Services を開き（*Windows + R* を押して **services.msc** と入力し Enter）、"OpenLM App Manager" サービスを再起動します。

### Windows 認証を使用

Windows 認証で SQL Server に接続するには、次の前提条件を満たす必要があります:

1. OpenLM サービスが "Local System Account" 権限を持つユーザーでログインするよう設定されていること。
2. MS-SQL サーバーが Windows 認証でそのユーザーにアクセス権を付与していること。

前提条件を満たしたら、以下の手順を実行します:

1. DB Provider のドロップダウンから **SQL Server (Windows Authentication)** を選択します。

2. 必要な設定を以下のとおり編集します:

![Using Applications Manager Database Configuration tool with SQL Server and Windows Auth](/img/legacy/word-image-4.png)

**Connection Pool Size** - 1 つの時点でデータベースに作成できる並列接続数（既定: *50*）

**Server Name** - SQL Server 名

**DB Name** - アクセスするデータベース名（Server を設定するとドロップダウンから選択可能）

3. **Apply** をクリックして設定を保存し、DB Configuration ツールを閉じます。

4. Applications Manager サービスを再起動します:

*Windows*: Windows Services を開き（*Windows + R* を押して **services.msc** と入力し Enter）、"OpenLM App Manager" サービスを再起動します。

*Linux*: 次のコマンドを実行します。

```
sudo ./app_manager.sh restart
```

または

```
sudo ./app_manager.sh stop
```

続けて

```
sudo ./app_manager.sh start
```
