---
title: "OpenLM BrokerのHTTPプロキシサーバー経由の接続"
description: "特定のネットワーク環境では、クライアントベースのアプリケーションが OpenLM Broker と通信できるように、プロキシサーバーを構成する必要がある場合があります。"
sidebar_position: 6
---
## 概要

特定のネットワーク環境では、クライアントベースのアプリケーションが OpenLM Broker と通信できるようにプロキシサーバーの設定が必要になる場合があります。本記事では、プロキシサーバー経由で Broker に接続する方法を説明します。

## 手動でのプロキシ設定

OpenLM Broker をプロキシサーバー経由で接続するには、次の手順を実行します:

- 任意のテキストエディタを開き、`proxy.properties` という新規ファイルを作成します。
- 次のプロパティを貼り付けて値を設定します。

```
http.proxyHost=your.proxy.host (related to target URLs)
http.proxyPort=your.proxy.port (related to target URLs)
https.proxyHost=your.https.proxy.host (related to target URLs)
https.proxyPort=your.https.proxy.port (related to target URLs)
jdk.http.auth.tunneling.disabledSchemes= (empty as Basic Auth is disabled by default )
http.proxyUser=your.username (related to the proxy)
http.proxyPassword=your.password (related to the proxy)
```

- **プレースホルダーは実際のプロキシサーバーと認証情報に置き換えてください。**
- このファイルを **C:\Program Files\OpenLM\OpenLM Broker** に保存します。
- Windows Services を開いて OpenLM Broker を再起動します。

## プロパティの説明

- `http.proxyHost` と `http.proxyPort`: 対象 URL に関連する HTTP プロキシのホスト/ポート設定。
- `https.proxyHost` と `https.proxyPort`: 対象 URL に関連する HTTPS プロキシのホスト/ポート設定。
- `http.proxyUser` と `http.proxyPassword`: プロキシサーバーで認証が必要な場合のユーザー名とパスワード。
- `jdk.http.auth.tunneling.disabledSchemes`: Basic 認証が無効（既定）である場合は空欄。

## 追加情報

このファイルでは Apache Commons HTTPClient の設定も利用できます:

```
http.proxyUser
https.proxyUser
socks.proxyUser
```

Java のネットワークプロパティの詳細は [[公式ドキュメント]](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/doc-files/net-properties.html) を参照してください。
