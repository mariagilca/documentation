---
title: Applications ManagerとBrokerのHTTPS/SSL対応
description: "機密データ転送のセキュリティを強化するには、Applications Manager および関連コンポーネントを適切に設定し、Secure な通信を使用するように構成します。"
sidebar_position: 4
---
## 概要

機密データ転送のセキュリティを強化するには、Applications Manager と関連コンポーネントを適切に設定し、HTTPS プロトコルで SSL を使用します。本書では、Applications Manager のネットワーク通信で HTTPS/SSL を利用するための基本的な設定オプションを説明します。

信頼された認証局から証明書を購入することを前提としています。自己署名証明書の作成方法は本書では扱いません。

## Applications Manager の設定

Applications Manager を HTTPS/SSL で構成するには、次の手順に従ってください。

### 証明書チェーンをキーストアに追加

Applications Manager が JKS (Java Key Storage) ファイルをキーストア（セキュリティ証明書の保管場所）として使用するように設定します。証明書ファイルは、パスワード（ファイルと証明書で一致）を同期したうえで JKS に変換する必要がある場合があります。また、Applications Manager 側でもキーストアを使用する設定が必要です。ソースファイルには、ホスト名用に取得した証明書だけでなく、発行元の認証局からの証明書チェーン全体を含める必要があります。必要なファイルの作成には「OpenSSL」ツールも使用できます。手順は次のとおりです。

1. 証明書ファイルを購入する（信頼された認証局から取得）。
2. 証明書ファイルを JKS 形式に変換する。
3. 証明書と JKS のパスワードを同期する。

### Applications Manager でキーストアを使用する設定

`C:\Program Files\OpenLM\OpenLM Applications Manager\bin\OpenLM Applications Manager.exe` を実行し、Java タブに移動します。

Java タブのパラメータは SSL を除き、インストーラーによって事前設定されています。

-Djavax.net.ssl.keyStore=`<path to the JKS file>`

-Djavax.net.ssl.keyStorePassword=`<password>`

サーバーが信頼された認証局の有効な SSL 証明書を使用している場合は、これ以外は不要です。

自己署名証明書を使用する場合は、Java のトラストストアに追加する必要があります。

### Applications Manager プロパティファイルの更新

Applications Manager の設定に使用する ***openlm-app-manager.properties*** ファイルの複数パラメータを更新する必要があります。HTTPS/SSL は properties と **binding.host** パラメータで有効化します。Applications Manager と OpenLM SLM の安全な接続は **openlm.server.protocol** パラメータで確立します。

1. *openlm-app-manager.properties* ファイル（例: `C:\Program Files\OpenLM\OpenLM Applications Manager`）を探してテキストエディタ（例: Notepad）で開きます。

2. **binding.host** パラメータを探して、実際のホスト名または IP アドレスに変更します（図 1）。

![openlm-app-manager.properties ファイル内の binding.host パラメータ。](/img/legacy/app-manager-ssl-003.png)

**図 1: プロトコルパラメータを "https" に変更。**

3. プロトコルパラメータを "https" に変更します（図 2）。

![openlm-app-manager.properties ファイルで https に設定した protocol パラメータ。](/img/legacy/app-manager-ssl-004.png)

**図 2: プロトコルパラメータを "https" に変更。**

4. OpenLM SLM が SSL で稼働している場合は、**openlm.server.protocol** パラメータを "http**s**" に変更します（図 3）。

![properties ファイルで https に設定した openlm.server.protocol パラメータ。](/img/legacy/app-manager-ssl-005.png)

**図 4: プロトコルパラメータを "https" に変更。**

5. **openlm-app-manager.properties** ファイルを保存します。

6. Applications Manager を再起動して変更を反映します。

## Applications Manager Web サービスの保護

### Broker の構成

Applications Manager をホスト名にバインドし（'localhost' ではない）、かつ Agent で SSL を有効にしている場合、ホスト名とセキュア関連パラメータを OpenLM Broker Configurations Tool と lmstat.bat ファイル（Linux/Unix では lmstat.sh）に追加する必要があります。

### lmstat.bat ファイルの変更

1. OpenLM Applications Manager フォルダー内の **lmstat.bat** ファイルを探します（例: `C:\Program Files\OpenLM\OpenLM Applications Manager\lmstat.bat`）。

2. **lmstat.bat** ファイルをテキストエディタ（例: Notepad）で開きます。

3. **set host** パラメータを探し、システムに合った Host Name IP に値を変更します（図 9）。

![lmstat.bat ファイル内の set host パラメータ。](/img/legacy/app-manager-ssl-010.png)

**図 5: ***set host* パラメータの場所と変更。**

4. *[任意]* 自己署名証明書を受け入れる場合、**call** パラメータを探して呼び出し文字列に **-k** を追加します（図 10）。

![lmstat.bat ファイルの call 文字列に -k フラグを追加した状態。](/img/legacy/app-manager-ssl-011.png)

**図 5: call 文字列パラメータの場所と変更。**

5. **http** パラメータを探して **https** に変更します。

![lmstat.bat ファイルで http パラメータを https に変更した状態。](/img/legacy/app-manager-ssl-012.png)

**図 6: http パラメータを https に変更。**

6. lmstat.bat ファイルを **保存して閉じます**。

### OpenLM Broker

1. OpenLM Broker を起動します（**[Start] > [OpenLM] > [OpenLM Broker]**）。OpenLM Broker が開きます。

2. License Servers の Host Name IP を確認します。これは binding host と一致している必要があります（例: 'localhost' ではない）。変更が必要な場合は、localhost ノードをクリックし、フィールドに Host Name IP を入力します。

3. **[Apply]** ボタンをクリックして変更を反映します。

4. Applications Manager の **Commands** ノードをクリックします（例: Port 27080 配下の Commands）。

5. Commands パネルの **[Update]** ボタンをクリックします。

6. **data_inquery** ノードをクリックして、Command Line が正常に更新されたことを確認します。**Execute** ボタンをクリックして動作を確認してください。`<server_status="ok">` メッセージが表示されます。
