---
title: "Linux での Applications Manager インストール"
sidebar_position: 3
---
OpenLM Applications Manager は、ライセンス方式に関係なく組織内のあらゆるソフトウェア利用を監視・制御する Java アプリケーションです。本書では OpenLM Applications Manager の設定手順を説明します。

Applications Manager の主な機能は次のとおりです:

- エンドユーザーのワークステーション上で稼働中のプロセスやソフトウェア起動に関する情報を OpenLM Agent から取得
- 特定のルールや構成に基づいて OpenLM Agent がソフトウェアを起動できるようにする

Applications Manager は、エンドユーザーのワークステーションにインストールされる軽量コンポーネントである OpenLM Agent と連携します。OpenLM Agent には次の機能があります:

- ワークステーション上で実行中のプロセスを監視
- ソフトウェア起動イベントを傍受して報告
- 管理者が定義したアクションを実行し、特定プロセスの実行に介入

Applications Manager は、ライセンスマネージャーで管理されていないアプリケーションや、ライセンスマネージャーに高度な管理機能がない場合にも管理機能を追加します。

ワークステーションライセンスをライセンスマネージャーで直接管理できない場合（例: シングルライセンスやネームドライセンス）でも、OpenLM Applications Manager はソフトウェア使用状況を監視できます。これにより、ライセンスマネージャーで管理されるソフトウェアとスタンドアロンライセンスのソフトウェアを同時に監視できます。

## Applications Manager のインストール

1. [ダウンロード](https://www.openlm.com/download/) ページから配布パッケージ（tar.gz）を取得します。
2. Linux コンソールでパッケージを展開します:

```
sudo tar -zxvf <Tar.Gz PackageFile>
```

### アップグレード

稼働中のサービスを停止し、settings.sh をバックアップしてからインストールフォルダーを削除します。バックアップした settings.sh で既存の settings.sh を上書きします。

### アンインストール

稼働中のサービスを停止し、インストールフォルダーを削除します。  
![](/img/legacy/word-image-41960-1.png)

3. インストールフォルダーに移動します。

![](/img/legacy/word-image-41960-2.png)

4. settings.sh で JAVA_HOME パスを設定します。

![](/img/legacy/word-image-41960-3.png)

5. Applications Manager をインストールします。

```
sudo ./app_manager.sh install

sudo ./appmanager.sh uninstall
```

6. Identity Service のセキュリティモードを使用している場合は、Authorization JSON ファイルをインポートする必要があります。必要に応じてフォルダー権限を変更してください。

```
sudo chmod 777 <FolderName>
sudo ./auth_tool.sh applications-manager-authorization.json
```

7. 手順 6 のインポートで openlm-app-manager.properties に Client ID と Secret Key が追加されない場合は、ファイルに手動で追加します。

![](/img/legacy/word-image-41960-4.png)

![](/img/legacy/word-image-41960-5.png)

8. Applications Manager サービスを再起動します。

```
sudo ./app_manager.sh start
sudo ./app_manager.sh stop
sudo ./app_manager.sh restart
```
