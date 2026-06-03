---
title: "OpenLM Server と Identity Service の SSL 設定"
description: "これは、OpenLM SLM および Identity Service v2x 向けに SSL 接続を設定するためのクイックガイドです。"
sidebar_position: 2
---
OpenLM SLM と Identity Service v2x の SSL 接続を設定するためのクイックガイドです。

**重要**:

- SLM で使用する証明書は、OpenLM SLM に接続するコンポーネントが動作するマシンの Trusted Certificate Store にもインストールしておく必要があります。
- サーバーで SSL を有効にしたら、接続するすべてのコンポーネントでホスト名/IP を HTTPS プロトコルに更新する必要があります。SLM の設定と同様に、ホスト指定には正確な FQDN を使用してください。
- デモでは自己署名証明書を使用しています。**認証局 (CA) によるデジタル署名付き証明書の使用を強く推奨します。**

## Identity Service の SSL 設定

1. C**:\Program Files\OpenLM\OpenLM IdentityService\SecurityService\cert** に移動し、認証局 (CA) のデジタル署名付き証明書をここに配置します。  
   **注意!** 既存の証明書は削除しないでください!
2. **C:\Program Files\OpenLM\OpenLM Identity Service\SecurityService** にある appsettings.json ファイルを、管理者権限で任意のテキストエディタで開きます。
3. **Settings** ノードを見つけ、"**IssuerUri**" パラメータを HTTP から HTTPS に変更します:

```
},
  "Settings": {
    "UseDb": true,
    "IssuerUri": "https://FQDN:5000",
    "DbType": "MariaDB"
  },
```

5. **Kestrel node** を編集します。証明書の情報（証明書のパスとパスワード）を設定し、URL パラメータを HTTP から HTTPS に変更します:

```
  },
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "https://FQDN Name:5000"
          "Certificate": {
          "Path": "./cert/cert.pfx",
          "Password": "Cert Password"
        }
      },
      "Https": {
        "Url": "http://*:5001"
   }
    }
  },

```

- **Path** - 証明書ファイルへのパスです。Windows のパスはスラッシュではなく、バックスラッシュ 2 つを使用してください。
- **Password** - 証明書の秘密鍵のパスワードです。
- **Certificate Name - 証明書名は 'cert.pfx' にしてください。**

*注: 中括弧 { } が常に正しく閉じられていることを確認してください。*

6. 変更を保存します。

7. Identity Service を再起動します:

![Restarting the Services](/img/legacy/restarting-the-services-1.png)

8. SSL 接続が成功しているかを確認するには、Identity Service UI を開き、アドレスバーに新しいアドレス (HTTPS) を入力してページを更新します。下図の "Lock" アイコンをクリックしてください:

![スクリーンショット: Setting up SSL for Identity Service](/img/legacy/word-image-6.png)

## OpenLM Server の SSL 設定

1. C:\Program Files\OpenLM\OpenLM Server\bin に移動し、"**Cert**" というフォルダを作成して、認証局 (CA) のデジタル署名付き証明書をこのフォルダに貼り付けます。

2. C:\Program Files\OpenLM\OpenLM Server\bin にある **appsettings.json** を管理者権限でテキストエディタで開きます。

3. Kestrel ノードの設定を見つけて編集し、Kestrel エンドポイントの URL（EasyAdmin のフルパス）を更新します: http**s://FQDN:port**

```
},
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "https://FQDN:5015"
      },

```

4. **Certificates** ノードを見つけて編集します。次の情報を指定します:

- **Path** - 証明書ファイルへのパスです。Windows のパスはスラッシュではなく、バックスラッシュ 2 つを使用してください。
- **Password** - 証明書の秘密鍵のパスワードです。

*注: 中括弧 { } が常に正しく閉じられていることを確認してください。*

```
},
    "Certificates": {
      "Default": {
        "Path": "./cert/cert.pfx",
        "Password": "12345"
      }
    },
```

5. "Auth" ノードを見つけ、"Authority" 行を更新した Identity Service URL (HTTPS) に変更します。

```
},
  "Auth": {
    "EnableSecurity": true,
    "Authority": "https://hostnname:5000",
    "Audience": "openlm.server.api",
    "AuthProvider": "",
    "ClientId": "openlm.server.client",
    "ClientSecret": "c0936471-0f6a-44af-9078-99d150683cad",
    "ClientScope": "openlm.cloud.scope openlm.ugs.read.scope IdentityServerApi openlm.dss.scope openlm.etlmanager.scope",
    "TokenEndpoint": "/connect/token"
  }
}
```

6. 変更を保存します (Ctrl+S)。

7. Identity Service Settings で宣言した OpenLM SLM の URL を変更するタイミングです。**Identity Service**→**Settings**→**Security Configuration** タブにログインし、更新後のサーバー (SLM) アドレス (HTTPS) を設定して **Save** をクリックします:

![スクリーンショット: Setting up SSL for OpenLM SLM](/img/legacy/Id.png)

8. Server Service を再起動します。

![スクリーンショット 2: Setting up SSL for OpenLM SLM](/img/legacy/word-image-8.png)

9. 接続を確認するには、アドレスバーに更新後の EasyAdmin アドレスを入力します: [http**s://FQDN:port**](about:blank)
