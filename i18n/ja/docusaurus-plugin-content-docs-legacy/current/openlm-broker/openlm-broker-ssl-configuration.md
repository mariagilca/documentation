---
title: OpenLM Broker の SSL 設定
description: "OpenLM Broker の SSL を設定します。Broker を OpenLM SLM に HTTPS で接続する方法と、Broker のブラウザーインターフェイスを HTTPS で提供する方法を説明します。"
sidebar_position: 5
---

このガイドでは 2 つの独立したタスクを扱います。必要なタスクを実施してください:

- **Broker を OpenLM SLM に HTTPS で接続する** — Broker がサーバーに安全に接続します。Broker はクライアントです。
- **Broker インターフェイスを HTTPS で提供する** — ユーザーが Broker のブラウザーインターフェイスに安全にアクセスします。Broker はサーバーです。

## Broker を OpenLM SLM に HTTPS で接続する

### ステップ 1. Broker を HTTPS アドレスに向ける

1. Broker の設定で、OpenLM SLM の URL を `http` から `https` に変更します。
2. Broker を開き、サーバーに接続できることを確認します。

**注:** Broker のブラウザーインターフェイスで URL を変更した場合、接続をテストするために Broker を再起動する必要はありません。`broker.xml` を直接編集した場合（非推奨）、または ConfigTool GUI で設定を変更した場合のみ、Broker を再起動してください。その場合は、テストが成功した後に再起動すると、Broker サービスに変更が適用されます。

ステップ 2 が必要かどうかは、OpenLM SLM が使用する証明書の種類によって異なります:

- **パブリック証明書**（Sectigo や Let's Encrypt などのパブリック認証局が発行）: Java はすでにこれを信頼しているため、Broker は自動的に接続します。これで完了です。
- **プライベート証明書または社内発行の証明書:** Java はまだこれを信頼していません。Broker は証明書エラーまたはハンドシェイクエラーを記録します。ステップ 2 に進んでください。
- **自己署名証明書:** サポートされていません。代わりに、社内またはパブリック認証局が発行した証明書を使用してください。

### ステップ 2. 証明書を信頼する（Linux）

Broker は Java 上で動作し、Java はオペレーティングシステムとは別に、独自の信頼された証明書のリスト（キーストア）を保持します。現在の Broker バージョンは Linux のシステム証明書ストアを参照しないため、Linux がすでに信頼している場合でも、証明書を自分で Java のキーストアにインポートします。Linux および Java のシステム証明書との連携は、将来のバージョンで対応予定です。

サーバー証明書を発行した**認証局（CA）の証明書** — ルート証明書または中間証明書 — をインポートします。サーバー証明書そのものではありません。証明書は CA までさかのぼるチェーンを形成します。CA 証明書が変更されることはまれなため、サーバー証明書が更新されても（通常は少なくとも年に 1 回）、Broker はサーバーを信頼し続けます。単一のサーバー証明書を信頼する方法でも動作しますが、その証明書が変更されるたびにインポートを繰り返す必要があります。

**始める前に:**

- 発行元の CA 証明書（ルートまたは中間）を `.crt`、`.cer`、または `.pem` 形式で取得します。
- Broker を実行する Java の `JAVA_HOME` パスを確認します。

**証明書をインポートする:**

1. keytool を実行して、CA 証明書を Java のキーストアにインポートします:

   ```bash
   keytool -import -trustcacerts \
     -keystore "$JAVA_HOME/lib/security/cacerts" \
     -storepass changeit -noprompt \
     -alias mycompany-root-ca -file ca-cert.pem
   ```

2. パスワードの入力を求められたら、キーストアのパスワードを入力します。デフォルトは `changeit` です。
3. 証明書を信頼するか確認されたら、`yes` と入力します。
4. Broker を再起動し、接続を確認します。

**注:** `changeit` は Java の `cacerts` キーストアの既知のデフォルトパスワードです。セキュリティポリシー上必要な場合は、このパスワードをより強力なものに変更し（例: `keytool -storepasswd`）、上記のコマンドで新しいパスワードを使用してください。

**注:** 証明書が `.pfx`（PKCS#12）形式の場合は、まず CA 証明書を `.pem` ファイルに抽出できます:

```bash
openssl pkcs12 -in certificate.pfx -clcerts -nokeys -out ca-cert.pem
```

### Windows の場合

Windows では keytool は不要です。発行元の CA 証明書を、**ローカルコンピューター**の**信頼されたルート証明機関**ストア（現在のユーザーではなく）にインストールし、Broker を再起動します。

### Broker がまだ接続できない場合

- 証明書が発行された正確なホスト名を使用して接続します。この名前は、証明書の詳細のコモンネーム（CN）またはサブジェクト代替名（SAN）で確認できます。IP アドレスやホスト名のエイリアスでは接続できない場合があります。よくある原因は、証明書が完全修飾ドメイン名（FQDN）に対して発行されているのに、Broker が短いホスト名やローカルホスト名で構成されているケースです。
- Broker を実行するアカウントが証明書ファイルを読み取れることを確認します。
- Broker を実行しているものと同じ Java に証明書をインポートしたことを確認します。

## Broker インターフェイスを HTTPS で提供する

デフォルトでは、各セッションでセキュリティトークンが使用されるものの、Broker のブラウザーインターフェイスへの通信は暗号化されていません。これを保護するには HTTPS を有効にします。設定方法は Windows と Linux で同じで、Broker のルートディレクトリにある `application.properties` ファイルを編集します。Windows では、このファイルは通常 `C:\Program Files\OpenLM\OpenLM Broker\application.properties` にあります。

**注:** これは秘密鍵を保持する Broker 自身の証明書を使用します。これはステップ 2 で信頼した CA 証明書とは異なります。ここでは `.pfx` ファイルを変換せずに直接使用できます。

**手順:**

1. Broker のルートディレクトリで `application.properties` を開きます。
2. `server.ssl.enabled=true` を設定します。
3. 以下の 2 つのオプションのいずれかを使用して証明書を構成します。
4. Broker を再起動し、`https` でインターフェイスを開きます。

**注:** HTTPS を有効にすると、Broker インターフェイスは HTTP リクエストを HTTPS にリダイレクトするため、既存の `http` リンクからも引き続き安全なインターフェイスにアクセスできます。

**オプション A — 証明書ファイル .pfx（Windows と Linux）:**

```properties
server.ssl.enabled=true
server.ssl.key-store=mycertificate.pfx
server.ssl.key-store-password=<password to the pfx file>
server.ssl.key-store-type=pkcs12
```

**オプション B — Windows 証明書ストア（Windows のみ）:**

```properties
server.ssl.enabled=true
server.ssl.key-store-type=Windows-MY
server.ssl.key-store=
```

`Windows-MY` は**個人**証明書ストア（証明書 → 個人）を指します。これは Windows が提供する複数のストアのうちの 1 つです。Broker サービスが読み取れるように、Broker の証明書は現在のユーザーストアではなく**ローカルコンピューター**ストアにインストールしてください（特別な理由がない限り）。

**注:** `server.ssl.key-store=` の行は空であっても残してください。SSL が有効な場合、Broker はこの行を必要とします。

**各パラメーターの説明:**

- `server.ssl.enabled` — メインのスイッチです。Broker インターフェイスの HTTPS を有効にするには `true` に設定します。使用しない行は `#` でコメントアウトしたままにします。
- `server.ssl.key-store` — 証明書ファイルへのパスです（例: `mycertificate.pfx`）。この証明書は Broker 自身の秘密鍵を保持します。代わりに Windows ストアから読み取る場合は、この行は残したまま空にします。
- `server.ssl.key-store-password` — 証明書ファイルを保護するパスワードです。
- `server.ssl.key-store-type` — キーストアの形式です。`.pfx` ファイルの場合は `pkcs12`、Java キーストアの場合は `jks`、Windows 証明書ストアから読み取る場合は `Windows-MY` です。
- `server.ssl.key-alias` — 省略可能です。キーストアに複数の証明書がある場合に、エイリアスで 1 つの証明書を選択します。
