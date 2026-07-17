---
title: LinuxでのServerとIdentityインストール
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

![Linux マシンのホスト名と IP を入力した PuTTY セッションウィンドウ。](/img/legacy/word-image-159.png)

ログイン認証情報を使用して Linux マシンに接続し、システムパスワードを入力します:

![Linux のログイン認証情報を求める PuTTY コンソール。](/img/legacy/word-image-160.png)

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

![RPM ファイルを転送するため Linux マシンに接続した WinSCP。](/img/legacy/word-image-161.png)

3. ログイン後、ダウンロードした RPM ファイルを Windows から Linux マシンへドラッグ＆ドロップします。

**注**: RPM パッケージには依存関係が含まれています。ディストリビューションが yum を含む場合は、次のコマンドで依存関係を自動インストールできます:

sudo yum install [RPMFILE]

それ以外の場合は、コピー完了後に Putty へ戻り、次のコマンドを実行します:

sudo rpm -i [RPMFILE]  
（例: sudo rpm -i openlm_server-21.6.9-937.x86_64.rpm）

**注**: RPM の依存関係は次のコマンドで確認できます:

rpm -qp [RPMFILE] -provides

rpm -qp [RPMFILE] -requires

![OpenLM SLM パッケージの rpm インストールコマンドを実行する PuTTY コンソール。](/img/legacy/word-image-162.png)

4. データベース構成ウィンドウが表示されたら、任意のデータベースプロバイダーで新しい空のデータベースを作成します。

**注**: 対応データベースは MS SQL Server、MySQL、MariaDB です。

![RPM インストール中に開く OpenLM SLM のデータベース設定ウィンドウ。](/img/legacy/word-image-163.png)

![データベースプロバイダーを選択する OpenLM SLM のデータベース設定。](/img/legacy/word-image-164.png)

サーバー名、データベース名、ユーザー資格情報（User ID と Password）を入力し、**Test Connection** と **Approve** をクリックします。

![サーバー名・データベース・認証情報を入力した OpenLM SLM のデータベース設定。](/img/legacy/word-image-165.png)

![OpenLM SLM のインストール完了を知らせるメッセージ。](/img/legacy/word-image-166.png)

このメッセージでインストール完了が確認できます。

5. OpenLM SLM にライセンスを追加します。

/opt/openlm/license フォルダーに cp コマンドで直接コピーします。

![ライセンスファイルを /opt/openlm/license フォルダーにコピーする PuTTY コンソール。](/img/legacy/word-image-167.png)

**または**

Putty で次のコマンドを使って OpenLM フォルダーに移動します: cd /opt/openlm

WinSCP を使用し、Windows から Linux の /opt/openlm/license フォルダーへライセンスファイルをドラッグ＆ドロップします。

![ライセンスファイルを /opt/openlm/license フォルダーにドラッグする WinSCP。](/img/legacy/word-image-168.png)

ライセンス反映のため OpenLM サービスを再起動します。次のコマンドを実行します:

sudo service openlm restart

OR

sudo systemctl restart openlm

OpenLM のインストールが完了しました。Linux マシンの OpenLM SLM は **http://[IP|Hostname]:5015** から利用できます。

![インストール後、ブラウザーでポート 5015 に表示された OpenLM SLM の Web インターフェース。](/img/legacy/word-image-169.png)

## RPM を使用して Identity Service をインストール

Identity Service をインストールする手順:

1. Identity Service の RPM ファイルをコピーし、WinSCP で Linux マシンに移動してインストールします。

![Identity Service の RPM ファイルを Linux マシンに転送する WinSCP。](/img/legacy/word-image-170.png)  
![Identity Service の RPM パッケージをインストールする PuTTY コンソール。](/img/legacy/word-image-171.png)

2. 新しいデータベースを作成し、Identity Service のインストール中にそのデータベースを指定します。

![RPM インストール中の Identity Service データベース設定プロンプト。](/img/legacy/word-image-172.png)

![新しいデータベースを指定した Identity Service のデータベース設定。](/img/legacy/word-image-173.png)

3. Identity Service のポートを選択します（既定 5000、Enter）。

![RPM インストール中に Identity Service のポートを求める PuTTY コンソール。](/img/legacy/word-image-174.png)

![Identity Service のポート選択を確認する PuTTY コンソール。](/img/legacy/word-image-175.png)

4. Identity Service を次のリンクで開きます: `http://[FQDN]:5000`。FQDN は Fully Qualified Domain Name を意味します。

![ブラウザーでポート 5000 に表示された Identity Service の Web インターフェース。](/img/legacy/word-image-176.png)

OpenLM SLM へ接続します。

![Identity Service を OpenLM SLM に接続する設定。](/img/legacy/word-image-177.png)

OpenLM サービスを再起動します（OpenLM SLM 側にアカウントが存在している必要があります）:

sudo service openlm restart

OR

sudo systemctl restart openlm

**![Identity Service 接続後に OpenLM サービスを再起動する PuTTY コンソール。](/img/legacy/word-image-178.png)**

OpenLM SLM の appsettings.json: 設定が正しいことを確認するには次のコマンドを使用します:

cat /opt/openlm/bin/appsettings.json

**![Client Secret、Authority、EnableSecurity が True になった appsettings.json の出力。](/img/legacy/word-image-179.png)**

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

![apt で OpenLM SLM の Debian パッケージをインストールする PuTTY コンソール。](/img/legacy/word-image-180.png)  
![OpenLM SLM の DEB インストール中の PuTTY コンソール出力。](/img/legacy/word-image-181.png)

3. データベースアクセスを設定します。

![DEB インストール中の OpenLM SLM データベースアクセス設定。](/img/legacy/word-image-182.png)

![DEB インストール中に入力した OpenLM SLM のデータベース設定情報。](/img/legacy/word-image-183.png)

次の lines ファイルが表示されます:

![OpenLM SLM のデータベース設定後に表示された PuTTY コンソールの出力行。](/img/legacy/word-image-184.png)

4. OpenLM サービスが稼働していることを確認します。次のコマンドを実行します:

-sudo service openlm status

![OpenLM サービスが実行中であることを示す PuTTY コンソール。](/img/legacy/word-image-185.png)

5. ライセンスファイルを **/opt/openlm/license** にコピーします。次のコマンドを実行します:

-  sudo cp [LicenseFileName] /opt/openlm/license/[LicenseFileName]

6. OpenLM SLM インターフェースに接続します:

リンク: **http://[hostname]:5015**（Web ブラウザ）。ここで hostname は OpenLM SLM がインストールされたサーバーのホスト名です。

## DEB を使用して Identity Service をインストール

1. Debian（DEB）パッケージをサーバーへコピーします。

2. apt を使用してインストールします。次のコマンドを実行します。

- sudo apt install ./[DebName]

![apt で Identity Service の Debian パッケージをインストールする PuTTY コンソール。](/img/legacy/word-image-186.png)  
![Identity Service の DEB インストール中の PuTTY コンソール出力。](/img/legacy/word-image-187.png)

3. データベースアクセスを設定します。

![DEB インストール中の Identity Service データベースアクセス設定。](/img/legacy/word-image-188.png)

![DEB インストール中に入力した Identity Service のデータベース設定情報。](/img/legacy/word-image-189.png)

4. Identity server のポートを選択します（既定 5000、Enter）。

![DEB インストール中に Identity Service のポートを求める PuTTY コンソール。](/img/legacy/word-image-190.png)

Database created:  
![Identity Service のデータベース作成を確認する PuTTY コンソール。](/img/legacy/word-image-191.png)

5. Identity Service へ次の URL でアクセスします: `http://[FQDN]:[Port]`。ここで FQDN は Fully Qualified Domain Name です。

**注**: 画面が空白の場合は、正しい FQDN を使用していない可能性があります。

## DEB 固有の Linux コマンド

Debian パッケージとその設定ファイルをインストール/アップグレードするには、次のコマンドを実行します: sudo apt install ./[DEBNAME]（アップグレードでも同じコマンドを使用）。

Debian パッケージとその設定ファイルを削除するには、次のコマンドを実行します: Sudo apt purge [DEBNAME]

## TAR を使用して OpenLM SLM をインストール

OpenLM SLM をインストールする手順:

1. TAR インストールファイルをマシンにダウンロードします（例: Downloads フォルダー）。

2. WinSCP を開き、Linux マシンに接続します。

![TAR ファイルを転送するため Linux マシンに接続した WinSCP。](/img/legacy/word-image-192.png)

3. ログイン後、ダウンロードした TAR ファイルを Windows から Linux マシンへドラッグ＆ドロップします。

4. コピーが完了したら Putty に戻り、次のコマンドを実行します:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

![tar コマンドで OpenLM SLM の TAR ファイルを展開する PuTTY コンソール。](/img/legacy/word-image-193.png)

cd [destination]

sudo /bin/bash ./installer.sh

![OpenLM SLM の installer.sh スクリプトを実行する PuTTY コンソール。](/img/legacy/word-image-194.png)

5. データベース構成ウィンドウが表示されたら、任意のデータベースプロバイダーで新しい空のデータベースを作成します。

![TAR インストール中に開く OpenLM SLM のデータベース設定ウィンドウ。](/img/legacy/word-image-195.png)

![TAR インストール中の OpenLM SLM データベース設定プロンプト。](/img/legacy/word-image-196.png)

Putty で作成したデータベースを指定し、**Test Connection** と **Approve** をクリックします。

![PuTTY で作成済みデータベースを指定した OpenLM SLM のデータベース設定。](/img/legacy/word-image-197.png)

次の lines ファイルが表示されます:

![TAR で OpenLM SLM のデータベース設定後に表示された PuTTY コンソールの出力行。](/img/legacy/word-image-198.png)

6. OpenLM SLM にライセンスを追加します。

**![ライセンスファイルを OpenLM SLM のライセンスフォルダーにコピーする PuTTY コンソール。](/img/legacy/word-image-199.png)**

OR

Putty で次のコマンドを使って OpenLM フォルダーに移動します: cd /opt/openlm

WinSCP を使用し、Windows から Linux の /opt/openlm/license フォルダーへライセンスファイルをドラッグ＆ドロップします。

![ライセンスファイルを /opt/openlm/license フォルダーにドラッグする WinSCP。](/img/legacy/word-image-200.png)

ライセンス反映のため OpenLM サービスを再起動します。次のコマンドを実行します:

sudo service openlm restart

OR

sudo systemctl restart openlm

OpenLM のインストールが完了しました。Linux マシンの OpenLM SLM は http://[IP|Hostname]:5015 から利用できます。

![TAR インストール後、ブラウザーでポート 5015 に表示された OpenLM SLM の Web インターフェース。](/img/legacy/word-image-201.png)

## TAR を使用して Identity Service をインストール

Identity Service をインストールする手順:

1. Identity Service の TAR ファイルをコピーし、WinSCP で Linux マシンに移動してインストールします。

次のコマンドを実行します:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

![tar コマンドで Identity Service の TAR ファイルを展開する PuTTY コンソール。](/img/legacy/word-image-202.png)

cd [destination]

sudo /bin/bash ./installer.sh

![Identity Service の installer.sh スクリプトを実行する PuTTY コンソール。](/img/legacy/word-image-203.png)

2. 新しいデータベースを作成し、Identity Service のインストール中にそのデータベースを指定します。

![TAR インストール中の Identity Service データベース設定プロンプト。](/img/legacy/word-image-204.png)

![新しいデータベースを指定した Identity Service のデータベース設定。](/img/legacy/word-image-205.png)

3. Identity server のポートを選択します（既定 5000、Enter）。

![TAR インストール中に Identity Service のポートを求める PuTTY コンソール。](/img/legacy/word-image-206.png)

![TAR インストール中に Identity Service のポート選択を確認する PuTTY コンソール。](/img/legacy/word-image-207.png)

4. Identity Service を次のリンクで開きます: **http://[FQDN]:5000**。ここで FQDN は Fully Qualified Domain Name です。

![TAR インストール後、ブラウザーでポート 5000 に表示された Identity Service の Web インターフェース。](/img/legacy/word-image-208.png)

OpenLM SLM へ接続します。OpenLM サービスを再起動するには次のコマンドを実行します（OpenLM SLM にアカウントが存在している必要があります）:

sudo service openlm restart

OR

sudo systemctl restart openlm

**![Identity Service 接続後に OpenLM サービスを再起動する PuTTY コンソール。](/img/legacy/word-image-209.png)**

![OpenLM サービス再起動後の PuTTY コンソール出力。](/img/legacy/word-image-210.png)

OpenLM 設定ファイルの "Auth" セクションが、上記の接続処理で埋まっていることを確認するには次のコマンドを使用します。

![接続処理により Auth セクションが埋められた OpenLM 設定ファイルの出力。](/img/legacy/word-image-211.png)

## TAR 固有の Linux コマンド

**tar -xvf [Tarfile] -C [DestinationFolder]:** ここで -xvf は強制上書きと詳細表示付きの展開を意味します。-C は展開先パスを指定します。

**sudo /bin/bash ./install.sh:** installer.sh スクリプトを実行する bash プロセスを起動します。

**sudo ps -aux | grep openlm:** 現在起動中のプロセスを一覧し、OpenLM の文字列を含むものを抽出します。

## 略語

**FQDN** - Fully Qualified Domain Name
