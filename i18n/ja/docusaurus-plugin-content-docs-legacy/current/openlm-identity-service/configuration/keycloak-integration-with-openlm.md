---
title: "OpenLM と KeyCloak の連携"
sidebar_position: 3
---
## KeyCloak の設定

### 前提条件

- KeyCloak は **HTTPS** で稼働している必要があります。
- ユーザー名に空白は使用できません。

## 設定

1. KeyCloak の認証設定を取得します:  
   [**keyCloakURL**/realms/**realm-name**/.well-known/openid-configuration](http://localhost:8080/realms/master/.well-known/openid-configuration)  
   **keyCloakURL** は KeyCloak の URL に置き換えます。**master** を使用していない場合は、実際の realm 名に変更してください。例: [http://localhost:8080/realms/**master**/.well-known/openid-configuration](http://localhost:8080/realms/master/.well-known/openid-configuration)
2. クライアントを定義するには、管理コンソールにログインし、左メニューの **Clients** タブを選択して **Create Client** ボタンをクリックします:  
   ![スクリーンショット: Configuration](/img/legacy/word-image-83208-1.png)  
   ![スクリーンショット 2: Configuration](/img/legacy/word-image-83208-2.png)
3. クライアントを保存します。
4. クライアントをクリックして詳細を確認します。
5. Identity\portal に OIDC 外部プロバイダーを追加し、次の **Client ID** と **Client Secret** を使用します:  
   ![スクリーンショット 3: Configuration](/img/legacy/word-image-83208-3.png)  
   ![スクリーンショット 4: Configuration](/img/legacy/word-image-83208-4.png)
6. Authority には、手順 2 のコマンド出力にある **issuer** の値を入力します。  
   **注** - 場合によっては `keycloak-url/auth/realms/master/.well-known/openid-configuration` を使用する必要があります。  
   ![スクリーンショット 5: Configuration](/img/legacy/word-image-83208-5.png)
7. 外部プロバイダーを保存します。
8. KeyCloak クライアントを編集し、Identity Service の OIDC 外部プロバイダー設定からリダイレクト URI を追加します:  
   ![スクリーンショット 6: Configuration](/img/legacy/word-image-83208-6.png)
9. クライアントを保存します。
