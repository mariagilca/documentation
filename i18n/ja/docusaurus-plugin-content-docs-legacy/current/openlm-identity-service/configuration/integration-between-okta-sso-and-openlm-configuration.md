---
title: Okta SSO と OpenLM の統合
description: "OKTA SSO と OpenLM の連携を設定するための簡単なガイドです。"
sidebar_position: 2
---
Okta SSO と OpenLM の統合を設定するための簡易ガイドです。

## 要件:

- 既存の Okta アカウント
- SSL 構成済みの OpenLM SLM/Identity Service v21 以上、または OpenLM Platform

## Okta Admin Interface で OpenLM アプリケーションを追加

1. 左側メニューで **Applications** をクリックします:  
   ![Applications メニューを選択した Okta 管理インターフェース。](/img/legacy/word-image-41990-1-5.png)
2. **Create App Integration** をクリックします:  
   ![Create App Integration ボタンがある Okta の Applications ページ。](/img/legacy/word-image-41990-2-5.png)
3. 表示されたポップアップで Sign-in method を **OIDC - OpenID Connect**、Application Type を **Web Application** に設定し、**Next** をクリックします。  
   ![OIDC サインイン方式と Web Application タイプを選択する Okta のポップアップ。](/img/legacy/word-image-41990-3-5.png)
4. アプリケーション名を付け、次のボックスにチェックします:
   - A. Client Credentials
   - B. Authorization Code
   - C. Implicit (Hybrid)

   ![アプリに名前を付けグラントタイプのチェックボックスを有効にする Okta のアプリ統合フォーム。](/img/legacy/word-image-41990-4-5.png)
5. URI は変更しません。正しい URI は、OpenLM 側で統合をインポートした後に提供されます。下にスクロールして **Save** をクリックします（Step 9）。**Save** をクリックすると次のプロンプトが表示されます:  
   ![新しいアプリケーションの Client ID と Client Secret を表示する Okta のプロンプト。](/img/legacy/word-image-41990-5-5.png)  
   **Client ID と Client Secret を控えてください。しばらくこのウィンドウを開いたままにしておきます。**

## OpenLM オンプレミス構成

1. OpenLM Identity Service → External Providers タブに移動します。
2. Add Provider をクリックし、Provider type のドロップダウンから Okta を選択します。
3. Okta アカウントの情報を使って各フィールドを入力します。
4. 任意の名前（例: Okta）を入力します。  
   A. Client ID / Client Secret  
   B. Account ID - n**one**（大文字小文字を区別）  
   C. Authority - 下図の Okta ID を使用  
   ![Client ID・Secret・Authority を入力する Okta 用の Identity Service の Add Provider フォーム。](/img/legacy/word-image-41990-6-5.png)
5. **Save** をクリックします。  
   ![新しい Okta 外部プロバイダーを保存する Identity Service。](/img/legacy/word-image-41990-7-5.png)
6. OpenLM Identity Service 側でインポートが完了すると、アカウントに紐づいた正しい URI が生成されます。  
   ![Okta プロバイダー用に生成されたサインインとサインアウトのリダイレクト URI を表示する Identity Service。](/img/legacy/word-image-41990-8-5.png)
7. OKTA アカウントに戻り、General setting セクションで **Edit** をクリックします:  
   ![Edit ボタンがある Okta アプリケーションの General Settings セクション。](/img/legacy/word-image-41990-9-5.png)
8. Login セクションまでスクロールし、OpenLM Identity Service の情報（sign-in と sign-out の redirect URLs を含む）を入力します。**Save** をクリックします。  
   **![OpenLM のサインインとサインアウトのリダイレクト URL を入力した Okta の Login セクション。](/img/legacy/word-image-41990-10-5.png)**
9. Identity Service のページに戻り、ログアウトします。これで OKTA でログインできるようになります。  
   ![Okta ログインボタンを表示する Identity Service のサインインページ。](/img/legacy/word-image-41990-11-5.png)

## OpenLM Platform (クラウド)

OpenLM Platform を使用している場合は、以下の手順で Okta を外部 Identity Provider として構成します:

1. Cloud Portal インスタンス → Identity&Access Management (IAM) → External Providers → Add Provider に移動します。  
   ![Cloud Portal の Identity and Access Management の External Providers の Add Provider ページ。](/img/legacy/word-image-41990-12-5.png)
2. Okta アカウントの情報を入力します:  
   A. Client ID  
   B. Client Secret  
   C. Authority（例: dev-12345678.okta.com）。
3. 公開ボタン名を入力します（例: Okta）。  
   ![Okta の Client ID・Secret・Authority・ボタン名を入力した Cloud Portal の Add Provider フォーム。](/img/legacy/word-image-41990-13-5.png)
4. Products and Roles タブに切り替え、次の製品を対象にします:  
   A. Virtual License Manager  
   B. Software License Management Cloud  
   C. Dongle Monitoring  
   D. OneDirectorySync
5. Admin または Manager ロールのいずれかを選択します。  
   ![製品ごとに Admin または Manager ロールを割り当てる Cloud Portal の Products and Roles タブ。](/img/legacy/word-image-41990-14-5.png)
6. **SAVE** をクリックします。OpenLM Identity&Access Management 側でインポートが完了すると、アカウントに紐づいた正しい URI が生成されます。  
   ![Okta プロバイダーのインポート後に生成されたリダイレクト URI を表示する Cloud Portal。](/img/legacy/Cloud-portal.png)
7. OKTA アカウントに戻り、General setting セクションで **Edit** をクリックします。
8. Login セクションまでスクロールし、OpenLM Cloud Portal の情報（sign-in と signout の redirect URLs を含む）を入力します。**Save** をクリックします。
9. Cloud Portal に戻ってサインアウトし、次のパターンで再サインインします:  
   [https://cloud.openlm.com/portal?loginAccountId=](https://qa-awslinux-cloud.openlm.com/portal?loginAccountId=285639607)123456789  
   注: OpenLM Account ID は、右上のユーザー名の隣にあるドロップダウン矢印をクリックすると確認できます:  
   ![OpenLM アカウント ID の場所を示す Cloud Portal のユーザーメニューのドロップダウン。](/img/legacy/word-image-41990-16-5.png)
