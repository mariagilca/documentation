---
title: "Okta SSO と OpenLM の統合"
sidebar_position: 2
---
Okta SSO と OpenLM の統合を設定するための簡易ガイドです。

## 要件:

- 既存の Okta アカウント
- SSL 構成済みの OpenLM SLM/Identity Service v21 以上、または OpenLM SLMC

# Okta Admin Interface で OpenLM アプリケーションを追加

1. 左側メニューで **Applications** をクリックします:  
   ![](/img/legacy/word-image-41990-1-5.png)
2. **Create App Integration** をクリックします:  
   ![](/img/legacy/word-image-41990-2-5.png)
3. 表示されたポップアップで Sign-in method を **OIDC - OpenID Connect**、Application Type を **Web Application** に設定し、**Next** をクリックします。  
   ![](/img/legacy/word-image-41990-3-5.png)
4. アプリケーション名を付け、次のボックスにチェックします:
   - A. Client Credentials
   - B. Authorization Code
   - C. Implicit (Hybrid)

   ![](/img/legacy/word-image-41990-4-5.png)
5. URI は変更しません。正しい URI は、OpenLM 側で統合をインポートした後に提供されます。下にスクロールして **Save** をクリックします（Step 9）。**Save** をクリックすると次のプロンプトが表示されます:  
   ![](/img/legacy/word-image-41990-5-5.png)  
   **Client ID と Client Secret を控えてください。しばらくこのウィンドウを開いたままにしておきます。**

## OpenLM オンプレミス構成

1. OpenLM Identity Service → External Providers タブに移動します。
2. Add Provider をクリックし、Provider type のドロップダウンから Okta を選択します。
3. Okta アカウントの情報を使って各フィールドを入力します。
4. 任意の名前（例: Okta）を入力します。  
   A. Client ID / Client Secret  
   B. Account ID - n**one**（大文字小文字を区別）  
   C. Authority - 下図の Okta ID を使用  
   ![](/img/legacy/word-image-41990-6-5.png)
5. **Save** をクリックします。  
   ![](/img/legacy/word-image-41990-7-5.png)
6. OpenLM Identity Service 側でインポートが完了すると、アカウントに紐づいた正しい URI が生成されます。  
   ![](/img/legacy/word-image-41990-8-5.png)
7. OKTA アカウントに戻り、General setting セクションで **Edit** をクリックします:  
   ![](/img/legacy/word-image-41990-9-5.png)
8. Login セクションまでスクロールし、OpenLM Identity Service の情報（sign-in と sign-out の redirect URLs を含む）を入力します。**Save** をクリックします。  
   **![](/img/legacy/word-image-41990-10-5.png)**
9. Identity Service のページに戻り、ログアウトします。これで OKTA でログインできるようになります。  
   ![](/img/legacy/word-image-41990-11-5.png)

## OpenLM SLMC (クラウド)

OpenLM SLMC を使用している場合は、以下の手順で Okta を外部 Identity Provider として構成します:

1. Cloud Portal インスタンス → Identity&Access Management (IAM) → External Providers → Add Provider に移動します。  
   ![](/img/legacy/word-image-41990-12-5.png)
2. Okta アカウントの情報を入力します:  
   A. Client ID  
   B. Client Secret  
   C. Authority（例: dev-12345678.okta.com）。
3. 公開ボタン名を入力します（例: Okta）。  
   ![](/img/legacy/word-image-41990-13-5.png)
4. Products and Roles タブに切り替え、次の製品を対象にします:  
   A. Virtual License Manager  
   B. Software License Management Cloud  
   C. Dongle Monitoring  
   D. OneDirectorySync
5. Admin または Manager ロールのいずれかを選択します。  
   ![](/img/legacy/word-image-41990-14-5.png)
6. **SAVE** をクリックします。OpenLM Identity&Access Management 側でインポートが完了すると、アカウントに紐づいた正しい URI が生成されます。  
   ![](/img/legacy/Cloud-portal.png)
7. OKTA アカウントに戻り、General setting セクションで **Edit** をクリックします。
8. Login セクションまでスクロールし、OpenLM Cloud Portal の情報（sign-in と signout の redirect URLs を含む）を入力します。**Save** をクリックします。
9. Cloud Portal に戻ってサインアウトし、次のパターンで再サインインします:  
   [https://cloud.openlm.com/portal?loginAccountId=](https://qa-awslinux-cloud.openlm.com/portal?loginAccountId=285639607)123456789  
   注: OpenLM Account ID は、右上のユーザー名の隣にあるドロップダウン矢印をクリックすると確認できます:  
   ![](/img/legacy/word-image-41990-16-5.png)
