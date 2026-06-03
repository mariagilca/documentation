---
title: "LinuxでのServerとIdentityインストール"
description: Linux マシンに RPM、DEB、TAR パッケージを使用して OpenLM SLM と Identity Service をインストールするための手順を説明します。
sidebar_position: 2
---
Linux マシンに RPM、DEB、TAR パッケージを使用して OpenLM SLM と Identity Service をインストールするための手順を説明します。

## 要件

Linux パッケージ依存関係:

**SLM**: systemd, redhat-lsb, libgdiplus, dotnet core, powershell core

**Identity Service**: systemd, dotnet core, powershell core

Putty や WinSCP などのソフトウェアは OpenLM SLM のインストールに必要な前提ツールです。これらは Windows 専用で、Windows マシンから Linux マシンに接続して操作するために使用します。Putty / WinSCP 以外でも、コンソールを開いてファイルを Linux にコピーできるツールであれば使用可能です。プロトコル: Putty (SSH)、WinSCP (SCP)。

## Putty を使って Linux マシンに接続

Putty のセッションウィンドウで Linux マシンのアドレスを追加します。接続先のホスト名と IP アドレスを入力し、**Open** をクリックします。

![スクリーンショット: Connect to a Linux machine using PuTTY](/img/legacy/word-image-159.png)

ログイン認証情報を使用して Linux マシンに接続し、システムパスワードを入力します:

![スクリーンショット 2: Connect to a Linux machine using PuTTY](/img/legacy/word-image-160.png)

**RPM の場合**: 次のコマンドで OpenLM アプリケーションのインストール有無を確認します:

sudo rpm -qa | grep openlm

情報が返らない場合は、OpenLM アプリケーションは未インストールです。

**DEB の場合**: 次のコマンドで OpenLM アプリケーションのインストール有無を確認します:

sudo apt list -installed | grep openlm

**Tar.Gz の場合**: 次のコマンドで OpenLM アプリケーションのインストール有無を確認します:

sudo ps -aux | grep openlm

OR

ls /etc/systemd/system

OR

ls /opt

関連情報が返らない場合は、OpenLM アプリケーションは未インストールです。

**注**: Putty コンソールに表示崩れがある場合は、CMD ウィンドウを開き、次のコマンドを使用してください:

ssh [user]@[IP|Hostname]

## RPM を使用して OpenLM SLM をインストール

OpenLM SLM をインストールする手順:

1. RPM インストールファイルをマシンにダウンロードします（例: Downloads フォルダー）。

2. WinSCP を開いて Linux マシンに接続します。

![スクリーンショット: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-161.png)

3. ログイン後、ダウンロードした RPM ファイルを Windows から Linux マシンへドラッグ＆ドロップします。

**注**: RPM パッケージには依存関係が含まれています。ディストリビューションが yum を含む場合は、次のコマンドで依存関係を自動インストールできます:

sudo yum install [RPMFILE]

それ以外の場合は、コピー完了後に Putty へ戻り、次のコマンドを実行します:

sudo rpm -i [RPMFILE]  
（例: sudo rpm -i openlm_server-21.6.9-937.x86_64.rpm）

**注**: RPM の依存関係は次のコマンドで確認できます:

rpm -qp [RPMFILE] -provides

rpm -qp [RPMFILE] -requires

![スクリーンショット 2: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-162.png)

4. データベース構成ウィンドウが表示されたら、任意のデータベースプロバイダーで新しい空のデータベースを作成します。

**注**: 対応データベースは MS SQL Server、MySQL、MariaDB です。

![スクリーンショット 3: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-163.png)

![スクリーンショット 4: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-164.png)

サーバー名、データベース名、ユーザー資格情報（User ID と Password）を入力し、**Test Connection** と **Approve** をクリックします。

![スクリーンショット 5: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-165.png)

![スクリーンショット 6: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-166.png)

このメッセージでインストール完了が確認できます。

5. OpenLM SLM にライセンスを追加します。

/opt/openlm/license フォルダーに cp コマンドで直接コピーします。

![スクリーンショット 7: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-167.png)

**または**

Putty で次のコマンドを使って OpenLM フォルダーに移動します: cd /opt/openlm

WinSCP を使用し、Windows から Linux の /opt/openlm/license フォルダーへライセンスファイルをドラッグ＆ドロップします。

![スクリーンショット 8: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-168.png)

ライセンス反映のため OpenLM サービスを再起動します。次のコマンドを実行します:

sudo service openlm restart

OR

sudo systemctl restart openlm

OpenLM のインストールが完了しました。Linux マシンの OpenLM SLM は **http://[IP|Hostname]:5015** から利用できます。

![スクリーンショット 9: the OpenLM SLM using RPM のインストール](/img/legacy/word-image-169.png)

## RPM を使用して Identity Service をインストール

Identity Service をインストールする手順:

1. Identity Service の RPM ファイルをコピーし、WinSCP で Linux マシンに移動してインストールします。

![スクリーンショット: the Identity Service using RPM のインストール](/img/legacy/word-image-170.png)  
![スクリーンショット 2: the Identity Service using RPM のインストール](/img/legacy/word-image-171.png)

2. 新しいデータベースを作成し、Identity Service のインストール中にそのデータベースを指定します。

![スクリーンショット 3: the Identity Service using RPM のインストール](/img/legacy/word-image-172.png)

![スクリーンショット 4: the Identity Service using RPM のインストール](/img/legacy/word-image-173.png)

3. Identity Service のポートを選択します（既定 5000、Enter）。

![スクリーンショット 5: the Identity Service using RPM のインストール](/img/legacy/word-image-174.png)

![スクリーンショット 6: the Identity Service using RPM のインストール](/img/legacy/word-image-175.png)

4. Identity Service を次のリンクで開きます: `http://[FQDN]:5000`。FQDN は Fully Qualified Domain Name を意味します。

![スクリーンショット 7: the Identity Service using RPM のインストール](/img/legacy/word-image-176.png)

OpenLM SLM へ接続します。

![スクリーンショット 8: the Identity Service using RPM のインストール](/img/legacy/word-image-177.png)

OpenLM サービスを再起動します（OpenLM SLM 側にアカウントが存在している必要があります）:

sudo service openlm restart

OR

sudo systemctl restart openlm

**![スクリーンショット 9: the Identity Service using RPM のインストール](/img/legacy/word-image-178.png)**

OpenLM SLM の appsettings.json: 設定が正しいことを確認するには次のコマンドを使用します:

cat /opt/openlm/bin/appsettings.json

**![スクリーンショット 10: the Identity Service using RPM のインストール](/img/legacy/word-image-179.png)**

**Client Secret** と **Authority** が入力され、**EnableSecurity** が **True** であることを確認します。

## RPM 固有の Linux Sudo コマンド

**RPM をインストール:**

sudo rpm -i [RPMFILE]

OR

sudo yum install [RPMFILE]

**RPM をアップグレード:**

sudo rpm -U [RPMFILE]

OR

sudo yum update [RPMFILE]

**アンインストール:**

**インストール済み OpenLM を確認:** sudo rpm -qa | grep openlm

**インストール済みアイテムの削除:** sudo rpm -e [name]

**修復:**

sudo rpm -i -replacepkgs [PackageNAme]

**OpenLM SLM:**

sudo cp [YourLicenseFile] /opt/openlm/license/

**サービス再起動**

sudo service openlm restart

**任意ツール Server:**

**DB 設定:**

sudo pwsh /opt/openlm/tools/postinstall/start-serverdbconfiguration.ps1

**全 DB アップグレード:**

sudo pwsh /opt/openlm/tools/postinstall/start-alldbupgradeapi.ps1

**任意ツール Identity Service:**

**DB 設定:**

sudo /opt/securityservice/tools/postinstall/start-identitydbconfiguration.ps1

## DEB を使用して OpenLM SLM をインストール

1. Debian パッケージをサーバーへコピーします。

2. apt を使用してインストールします。次のコマンドを実行します:

- sudo apt install ./[DebName]

![スクリーンショット: OpenLM SLM using DEB のインストール](/img/legacy/word-image-180.png)  
![スクリーンショット 2: OpenLM SLM using DEB のインストール](/img/legacy/word-image-181.png)

3. データベースアクセスを設定します。

![スクリーンショット 3: OpenLM SLM using DEB のインストール](/img/legacy/word-image-182.png)

![スクリーンショット 4: OpenLM SLM using DEB のインストール](/img/legacy/word-image-183.png)

次の lines ファイルが表示されます:

![スクリーンショット 5: OpenLM SLM using DEB のインストール](/img/legacy/word-image-184.png)

4. OpenLM サービスが稼働していることを確認します。次のコマンドを実行します:

-sudo service openlm status

![スクリーンショット 6: OpenLM SLM using DEB のインストール](/img/legacy/word-image-185.png)

5. ライセンスファイルを **/opt/openlm/license** にコピーします。次のコマンドを実行します:

-  sudo cp [LicenseFileName] /opt/openlm/license/[LicenseFileName]

6. OpenLM SLM インターフェースに接続します:

リンク: **http://[hostname]:5015**（Web ブラウザ）。ここで hostname は OpenLM SLM がインストールされたサーバーのホスト名です。

## DEB を使用して Identity Service をインストール

1. Debian（DEB）パッケージをサーバーへコピーします。

2. apt を使用してインストールします。次のコマンドを実行します。

- sudo apt install ./[DebName]

![スクリーンショット: the Identity Service using DEB のインストール](/img/legacy/word-image-186.png)  
![スクリーンショット 2: the Identity Service using DEB のインストール](/img/legacy/word-image-187.png)

3. データベースアクセスを設定します。

![スクリーンショット 3: the Identity Service using DEB のインストール](/img/legacy/word-image-188.png)

![スクリーンショット 4: the Identity Service using DEB のインストール](/img/legacy/word-image-189.png)

4. Identity server のポートを選択します（既定 5000、Enter）。

![スクリーンショット 5: the Identity Service using DEB のインストール](/img/legacy/word-image-190.png)

Database created:  
![スクリーンショット 6: the Identity Service using DEB のインストール](/img/legacy/word-image-191.png)

5. Identity Service へ次の URL でアクセスします: `http://[FQDN]:[Port]`。ここで FQDN は Fully Qualified Domain Name です。

**注**: 画面が空白の場合は、正しい FQDN を使用していない可能性があります。

## DEB 固有の Linux コマンド

Debian パッケージとその設定ファイルをインストール/アップグレードするには、次のコマンドを実行します: sudo apt install ./[DEBNAME]（アップグレードでも同じコマンドを使用）。

Debian パッケージとその設定ファイルを削除するには、次のコマンドを実行します: Sudo apt purge [DEBNAME]

## TAR を使用して OpenLM SLM をインストール

OpenLM SLM をインストールする手順:

1. TAR インストールファイルをマシンにダウンロードします（例: Downloads フォルダー）。

2. WinSCP を開き、Linux マシンに接続します。

![スクリーンショット: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-192.png)

3. ログイン後、ダウンロードした TAR ファイルを Windows から Linux マシンへドラッグ＆ドロップします。

4. コピーが完了したら Putty に戻り、次のコマンドを実行します:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

![スクリーンショット 2: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-193.png)

cd [destination]

sudo /bin/bash ./installer.sh

![スクリーンショット 3: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-194.png)

5. データベース構成ウィンドウが表示されたら、任意のデータベースプロバイダーで新しい空のデータベースを作成します。

![スクリーンショット 4: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-195.png)

![スクリーンショット 5: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-196.png)

Putty で作成したデータベースを指定し、**Test Connection** と **Approve** をクリックします。

![スクリーンショット 6: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-197.png)

次の lines ファイルが表示されます:

![スクリーンショット 7: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-198.png)

6. OpenLM SLM にライセンスを追加します。

**![スクリーンショット 8: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-199.png)**

OR

Putty で次のコマンドを使って OpenLM フォルダーに移動します: cd /opt/openlm

WinSCP を使用し、Windows から Linux の /opt/openlm/license フォルダーへライセンスファイルをドラッグ＆ドロップします。

![スクリーンショット 9: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-200.png)

ライセンス反映のため OpenLM サービスを再起動します。次のコマンドを実行します:

sudo service openlm restart

OR

sudo systemctl restart openlm

OpenLM のインストールが完了しました。Linux マシンの OpenLM SLM は http://[IP|Hostname]:5015 から利用できます。

![スクリーンショット 10: the OpenLM SLM using TAR のインストール](/img/legacy/word-image-201.png)

## TAR を使用して Identity Service をインストール

Identity Service をインストールする手順:

1. Identity Service の TAR ファイルをコピーし、WinSCP で Linux マシンに移動してインストールします。

次のコマンドを実行します:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

![スクリーンショット: the Identity Service using TAR のインストール](/img/legacy/word-image-202.png)

cd [destination]

sudo /bin/bash ./installer.sh

![スクリーンショット 2: the Identity Service using TAR のインストール](/img/legacy/word-image-203.png)

2. 新しいデータベースを作成し、Identity Service のインストール中にそのデータベースを指定します。

![スクリーンショット 3: the Identity Service using TAR のインストール](/img/legacy/word-image-204.png)

![スクリーンショット 4: the Identity Service using TAR のインストール](/img/legacy/word-image-205.png)

3. Identity server のポートを選択します（既定 5000、Enter）。

![スクリーンショット 5: the Identity Service using TAR のインストール](/img/legacy/word-image-206.png)

![スクリーンショット 6: the Identity Service using TAR のインストール](/img/legacy/word-image-207.png)

4. Identity Service を次のリンクで開きます: **http://[FQDN]:5000**。ここで FQDN は Fully Qualified Domain Name です。

![スクリーンショット 7: the Identity Service using TAR のインストール](/img/legacy/word-image-208.png)

OpenLM SLM へ接続します。OpenLM サービスを再起動するには次のコマンドを実行します（OpenLM SLM にアカウントが存在している必要があります）:

sudo service openlm restart

OR

sudo systemctl restart openlm

**![スクリーンショット 8: the Identity Service using TAR のインストール](/img/legacy/word-image-209.png)**

![スクリーンショット 9: the Identity Service using TAR のインストール](/img/legacy/word-image-210.png)

OpenLM 設定ファイルの "Auth" セクションが、上記の接続処理で埋まっていることを確認するには次のコマンドを使用します。

![スクリーンショット 10: the Identity Service using TAR のインストール](/img/legacy/word-image-211.png)

## TAR 固有の Linux コマンド

**tar -xvf [Tarfile] -C [DestinationFolder]:** ここで -xvf は強制上書きと詳細表示付きの展開を意味します。-C は展開先パスを指定します。

**sudo /bin/bash ./install.sh:** installer.sh スクリプトを実行する bash プロセスを起動します。

**sudo ps -aux | grep openlm:** 現在起動中のプロセスを一覧し、OpenLM の文字列を含むものを抽出します。

## 略語

**FQDN** - Fully Qualified Domain Name
