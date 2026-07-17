---
title: API
description: "OpenLM REST API で認証し、ライセンス機能・セッション・ユーザーのメソッドを呼び出します。"
sidebar_position: 14
---

OpenLM REST API を使用すると、ライセンスデータ（アクティブな機能の使用状況、過去のセッション、拒否、ライセンスサーバー、ユーザー）をプログラムから照会できます。REST API は V21.12 で安定しました。OpenLM SLM に標準的な HTTP リクエストを送信すると、JSON 形式のレスポンスが返されます。

## バージョンと互換性

v4.x または v5.x の連携から移行する前に、次の点を確認してください。

- v4.x の旧 XML/SOAP API は、v5.6、V21.12 以降のリリースではサポートされません。
- 一部の XML/SOAP メソッドは、引き続き `/OpenLM.Server.Services/AdminAPI/web/{adminApiMethod}` で利用できます。
- v5.x の一部の REST エンドポイントは V21.12 以降で変更されました。アップグレード前に、Swagger でパスとパラメータを確認してください。

:::note[公開 API の正式な一覧]
Swagger ページには、お客様向けのすべての API メソッドが、現行のパラメータとスキーマとともに `https://<fqdn>:5015/swagger/index.html` に一覧表示されます。Swagger を信頼できる情報源としてください。このページのカタログは V22 ビルドに基づいています。
:::

## ベース URL と表記規則

OpenLM SLM のポート 5015 にリクエストを送信します。

```text
http://<openlm_server>:5015/api/v<version>/<method>
```

- 現在の API バージョンは `1` です。そのため、ほとんどのパスは `/api/v1/` で始まります。
- エージェントリスナーのメソッドは、バージョンを含まないプレフィックス `/api/agentapi/` を使用します。
- レスポンスは JSON 形式です。タイムスタンプは UTC です。
- `<openlm_server>` と `<identity_server>` は、実際のホスト名に置き換えてください。TLS を構成している場合は `https` を使用します。

## 認証と認可

認証には OAuth 2.0 のパスワードグラントを使用します。API 認証情報を一度生成し、それを Bearer トークンと交換して、すべてのリクエストでそのトークンを送信します。

OpenLM は、認証と認可を 2 つのサービスに分離しています。

| サービス | 役割 | 必要なもの |
| --- | --- | --- |
| OpenLM Identity Service | 認証。アクセストークン（セキュリティトークン）を発行します。 | `client_id` と `client_secret`（認証ファイル） |
| OpenLM SLM | 認可。API メソッドを提供します。 | ユーザー名とパスワード（OpenLM ログイン） |

:::note[セキュリティモード]
Identity Service のセキュリティモードを使用していない場合は、Bearer トークンなしで API を呼び出せます。その場合は、トークンの手順を省略してください。
:::

### EasyAdmin でクライアント ID とクライアントシークレットを生成する

1. OpenLM のユーザーインターフェイスで、**Administration > System & Security** に移動します。
2. **Security > Authorization** を選択し、**Client Authorization** を開きます。
3. **Add** を選択します。
4. **Type** で **OpenLM SLM API** を選択します。
5. 生成された **Client ID** と **Secret Key** をコピーするか、**Download** を選択して認証ファイルを保存します。シークレットは安全に保管してください。再取得はできません。

### セキュリティトークンを取得する

Identity Service のトークンエンドポイントで、認証情報をアクセストークンと交換します。

```text
POST http://<identity_server>:5000/connect/token
Content-Type: application/x-www-form-urlencoded
```

次のフォームフィールドを送信します。

| フィールド | 値 |
| --- | --- |
| `grant_type` | `password` |
| `username` | OpenLM のユーザー名 |
| `password` | OpenLM のパスワード |
| `scope` | `openlm.server.scope` |
| `client_id` | 前の手順で取得したクライアント ID |
| `client_secret` | 前の手順で取得したクライアントシークレット |

PowerShell でトークンを要求します。

```powershell
$uri = "http://<identity_server>:5000/connect/token"
$header = @{ "Content-Type" = "application/x-www-form-urlencoded" }
$body = @{
    "grant_type"    = "password"
    "username"      = "admin"
    "password"      = "<password>"
    "scope"         = "openlm.server.scope"
    "client_id"     = "openlm.server.api.<id>.none"
    "client_secret" = "<client_secret>"
}
$response = Invoke-WebRequest -Method POST -Uri $uri -Headers $header -Body $body
$response.Content
```

curl でトークンを要求します。

```bash
curl -X POST "http://<identity_server>:5000/connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "username=admin" \
  -d "password=<password>" \
  -d "scope=openlm.server.scope" \
  -d "client_id=openlm.server.api.<id>.none" \
  -d "client_secret=<client_secret>"
```

レスポンスにはトークンが含まれます。

```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "scope": "openlm.server.scope"
}
```

OpenLM のユーザーインターフェイスにログイン済みの場合は、ブラウザーから有効なトークンをコピーすることもできます。

1. ブラウザーのデベロッパーツール（F12）を開きます。
2. ユーザーインターフェイスにログインします。
3. 任意のネットワークリクエストを選択し、そのリクエストヘッダーから `Authorization: Bearer` の値をコピーします。

### 各リクエストでトークンを送信する

すべての OpenLM SLM リクエストの `Authorization` ヘッダーにトークンを追加します。

```text
Authorization: Bearer <security_token>
```

:::warning[認証情報を保護する]
クライアントシークレット、パスワード、トークンは、ライセンスデータへのアクセスを許可します。ソース管理や共有ドキュメントには含めないでください。ここに示す値はプレースホルダーです。
:::

## Swagger で API をテストする

Swagger UI は、利用可能なすべてのメソッドを一覧表示し、ブラウザーからリクエストを実行します。`http://<openlm_server>:5015/swagger/index.html` で開きます。

1. Postman または Identity Service からトークンを取得します。
2. Swagger UI で **Authorize** を選択します。 ![Authorize ボタンが強調表示された Swagger UI の OpenLM Server API ページ](/img/legacy/word-image-41988-1-1.png)
3. `Bearer`、半角スペース、トークンの順に入力し、**Authorize** を選択します。 ![値フィールドに Bearer トークンを入力した Swagger の認証ダイアログ](/img/legacy/word-image-41988-2-1.png)
4. 実行する API メソッドを選択します。 ![Swagger UI で展開された OpenLM API メソッドの一覧](/img/legacy/word-image-41988-3-1.png)
5. **Try it out** を選択し、必要なパラメータを入力します。現在の API バージョンは `1` です。 ![パラメータの入力フィールドが表示された Swagger のメソッド画面](/img/legacy/word-image-41988-4-1.png)
6. **Execute** を選択し、レスポンスコードと本文を確認します。 ![JSON レスポンス本文と HTTP 200 コードを表示する Swagger のレスポンスセクション](/img/legacy/word-image-41988-5-1.png)

:::note[Authorize に入力する値]
トークンは `Bearer <token>` の形式で入力します（例: `Bearer eyJhbGci...`）。認可後は、各メソッドのロックアイコンが閉じます。
:::

## Postman で API を呼び出す

OpenLM の Postman コレクションには、すぐに使えるリクエストと環境が含まれており、トークンを一度取得すれば再利用できます。[セットアップ動画](https://youtu.be/kqgL-WtDGSA) を視聴するか、次の手順に従ってください。

1. サンプルコレクションをインポートします。[v21 API サンプルコレクション](/zips/v21-APIs-for-example.postman_collection.zip)。
2. 次の表の環境変数を設定します。
3. **Get Client Api Token** を実行してトークンを取得します。Postman がトークンを保存し、他のリクエストで再利用します。
4. 任意のリクエストを送信します（例: `GET {{openlmserver_url}}/api/v{{apiversion}}/features/lookup`）。**Authorization** は **Bearer Token** に設定します。

| 変数 | 値の例 |
| --- | --- |
| `openlmserver_url` | `http://<openlm_server>:5015` |
| `apiversion` | `1` |
| `identityservice_url` | `http://<identity_server>:5000` |
| `client_id` | `openlm.server.api.<id>.none` |
| `client_secret` | `<client_secret>` |
| `username` | `admin` |
| `password` | `<password>` |

:::tip
認証情報はリクエスト本文ではなく環境変数に保存してください。コレクションを共有してもデータが安全に保たれます。
:::

## エンドポイントリファレンス

次のメソッドは V22 ビルドの Swagger に表示されます。各メソッドとパスは登録されているとおりに示します。クエリパラメータは、ドキュメントに記載がある場合に記載しています。完全な最新の一覧は Swagger で確認してください。

### エージェントリスナー

| メソッド | 説明 |
| --- | --- |
| `POST /api/agentapi/postmessage` | エージェントからリスナーにメッセージを送信します。 |
| `GET /api/agentapi/test` | エージェントリスナーのエンドポイントが応答するかをテストします。 |

### ブローカーコマンド (v1)

| メソッド | 説明 |
| --- | --- |
| `GET /api/v1/broker/commands` | ブローカーコマンドを返します。 |
| `PATCH /api/v1/broker/commands` | ブローカーコマンドの実行ステータスを更新します。 |

関連する `BrokerCompositeMessageV1` グループも Swagger に表示されます。現行のメソッドは Swagger で確認してください。

### 機能 (v1)

| メソッド | 説明 |
| --- | --- |
| `GET /api/v1/features` | ライセンスサーバーごとの機能の一覧を返します。 |
| `GET /api/v1/features/usage` | 特定の機能における、アクティブなセッションの使用状況の詳細を返します。 |
| `GET /api/v1/features/totalusage` | アクティブなセッションの機能使用状況の合計を返します。 |
| `GET /api/v1/features/usertop` | ユーザーごとの機能使用状況の上位 10 件を降順で返します。 |
| `GET /api/v1/features/useractivity` | 選択した期間における、過去および現在のユーザーアクティビティを返します。事前定義の `TimeFrame` を使用するか、`StartDate` と `EndDate` を設定します。 |
| `GET /api/v1/features/usercurrentactivity` | 現在のユーザーアクティビティを返します。 |
| `GET /api/v1/features/by-vendor` | ベンダーと機能名で機能を返します。 |
| `GET /api/v1/features/lookup` | ライセンス機能のルックアップを返します。`activeOnly` クエリパラメータを指定すると、結果をアクティブなライセンスのみに絞り込みます。 |

### セッションとユーザー (v1)

| メソッド | 説明 |
| --- | --- |
| `GET /api/v1/sessions` | ライセンスアクティビティのセッションを返します。クエリパラメータ: `StartDateUtc`、`EndDateTimeUtc`、`UserIds`、`PageSize`、`PageNumber`。 |
| `GET /api/v1/users/lookup` | ユーザーを `Id` と `Name` のペアで返します。 |

### Postman コレクションのサンプル

**v21 APIs samples** コレクションには、次のリクエストがまとめられています。各リクエストは `/api/v<version>/` 配下の対応するメソッドを呼び出します。

- Get Client Api Token
- license servers — lookup
- license servers — statistics
- license servers — full info for server
- features
- features — total usage
- features — usage
- features — useractivity
- features — usercurrentactivity
- denials
- sessions
- users — lookup

## ライセンスアクティビティレポートを作成する

この例では、EasyAdmin のライセンスアクティビティレポート（1 人のユーザーの 1 日分のセッション）を再現します。EasyAdmin で同じフィルター（ユーザー `M.Eve.Leonard`、2022-11-09）を適用すると、3 件のセッションが返されます。

### ユーザー ID を取得する

ユーザーを検索して、数値の ID を確認します。

```text
GET {{openlmserver_url}}/api/v{{apiversion}}/users/lookup
Authorization: Bearer <security_token>
```

レスポンスでユーザーを見つけ、`Id` を確認します。

```json
{
  "Id": 597,
  "Name": "M.Eve.Leonard"
}
```

### ライセンスアクティビティを取得する

指定した期間における、そのユーザーのセッションを要求します。UTC のタイムスタンプを使用します。

```text
GET {{openlmserver_url}}/api/v{{apiversion}}/sessions
  ?StartDateUtc=2022-11-09T00:00:00.000Z
  &EndDateTimeUtc=2022-11-09T23:59:00.000Z
  &UserIds=597
  &PageSize=100
  &PageNumber=1
Authorization: Bearer <security_token>
```

レスポンスには、UTC タイムスタンプと機能の詳細を含む 3 件のセッションが返されます。これは EasyAdmin のレポートと一致します。

:::note[タイムゾーン]
API は UTC タイムスタンプを返し、UTC タイムスタンプを想定します。レポートで必要な場合は、コード側でローカル時刻に変換してください。
:::

## サンプルコード

OpenLM は、認証からメソッド呼び出しまでを一貫して行う C# サンプルを提供しています。[Program.cs（PDF）](https://cdn.openlm.com/wp-content/uploads/2022/10/Program.cs_.pdf)。

:::note
Identity Service のセキュリティモードを使用していない場合は、Bearer トークンなしで API を呼び出せます。そのため、サンプル内のトークン要求は不要です。
:::
