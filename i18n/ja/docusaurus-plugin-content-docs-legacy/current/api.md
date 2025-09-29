title: "API"
sidebar_position: 14
---
REST API の仕様は V21.12 で安定しました。

以下は v4.x および v5.x API の利用者向けの重要ポイントです。

- v4.x の旧 XML/SOAP API は v5.6 および v21.12 以降でサポート対象外です。
- 一部の XML/SOAP メソッドは次の URL から引き続き利用できます。  
  `/OpenLM.Server.Services/AdminAPI/web/{adminApiMethod}`
- v21.12 以降で v5.x の一部 REST API に変更があります。
- Swagger に一覧化された API がお客様向けの公開 API とドキュメントです。  
  [HTTP(s)://fqdn:5015/swagger/index.html](http://localhost:5015/swagger/index.html)

## Postman の使い方

[ビデオ](https://youtu.be/kqgL-WtDGSA) [インポート用CSV](/zips/v21-APIs-for-example.postman_collection.zip)

注: Identity Service のセキュリティモードを使用していない場合は、Bearer トークンなしでアクセスできます。  
Identity Service からトークンを取得する必要はありません。

## サンプルコード

[C#](https://cdn.openlm.com/wp-content/uploads/2022/10/Program.cs_.pdf)

注: Identity Service のセキュリティモードを使用していない場合は、Bearer トークンなしでアクセスできます。  
Identity Service からトークンを取得する必要はありません。

## Swagger の使い方

1. Postman でトークンを取得します。
2. Swagger UI を開き、Authorize をクリックします。 ![](/img/legacy/word-image-41988-1-1.png)
3. 指示に従ってテキストボックスにトークンを貼り付けます。  
   ![](/img/legacy/word-image-41988-2-1.png)
4. 目的の API メソッドを選択します。 ![](/img/legacy/word-image-41988-3-1.png)
5. 必要なパラメータをすべて入力します。 現在の API バージョンは 1 です: ![](/img/legacy/word-image-41988-4-1.png)
6. 実行して結果を取得します。  
   ![](/img/legacy/word-image-41988-5-1.png)

注: Identity Service のセキュリティモードを使用していない場合は、Bearer トークンなしでアクセスできます。  
Postman からトークンを取得する必要はありません。
