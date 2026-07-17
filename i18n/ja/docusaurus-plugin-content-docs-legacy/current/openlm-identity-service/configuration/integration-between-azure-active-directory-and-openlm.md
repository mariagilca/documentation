---
title: Azure Active Directory と OpenLM の統合
description: このドキュメントでは、Microsoft Entra ID を Identity Service と構成し、OpenLM の外部 Identity Provider として Microsoft Entra ID を設定するための手順を説明します。
sidebar_position: 5
---
このドキュメントでは、Microsoft Entra ID を Identity Service と構成し、OpenLM の外部 Identity Provider として Microsoft Entra ID を設定するための手順を説明します。

## 前提条件

- アプリケーションを登録する権限を持つ [Azure Portal](https://portal.azure.com) へのアクセス
- オンプレミスユーザーの場合: OpenLM SLM と Identity Service が [SSL で保護](../../openlm-slm/setting-up-ssl-for-openlm-server-and-identity-service) されていること

## Microsoft Entra ID の構成

1. [Azure Portal](https://portal.azure.com) にログインします。Microsoft Entra ID ディレクトリに移動します。  
   ![Azure Portal showing the Microsoft Entra ID navigation menu](/img/legacy/word-image-41985-1-2.png)
2. **App Registrations** セクションに移動します。  
   ![App Registrations section in Microsoft Entra ID](/img/legacy/word-image-41985-2-2.png)
3. 新しい登録を作成します。**New Registration** ボタンをクリックします。  
   ![New Registration button on the App Registrations page](/img/legacy/word-image-41985-3-2.png)
4. アプリケーションの **display name** を入力します（例: **Identity Service**）。Redirect URI フィールドでは、ドロップダウンから Web を選択します。URI フィールドは空のままにしておき、後で構成時に更新します。**Register** ボタンをクリックします。  
   ![App registration form with display name and Redirect URI fields](/img/legacy/word-image-41985-4-2.png)
5. アプリケーションが登録されました。概要ページに表示される **Application (client) ID** と **Directory (tenant) ID** を控えてください。以降の手順でこれらの値が必要になります。  
   ![Registered application overview showing Client ID and Tenant ID](/img/legacy/word-image-41985-5-2.png)
6. **Certificates & Secrets** セクションに移動し、新しい client secret を作成します。**New client secret** をクリックします。  
    **Pro tip:** このセクションは新しいタブで開いておくことをおすすめします。  
   **![Certificates and Secrets section with New client secret button](/img/legacy/word-image-41985-6-2.png)**
7. client secret の **description** と **lifespan** を指定し、**ADD** をクリックします。  
   **![Add a client secret dialog with description and expiry fields](/img/legacy/word-image-41985-7-1.png)**
8. Client Secret が作成されました。**Value** と **Secret ID** を控えてください。

   :::warning
   Client secret の値は作成直後にしか表示されません。ページを離れる前に必ずシークレットの値を保存してください。
   :::

   ![Newly created client secret showing Value and Secret ID](/img/legacy/word-image-41985-8-1.png)

   ページを離れると、値は伏せ字で表示され、再取得できなくなります:  
   ![Client secret with hidden value after navigating away](/img/legacy/word-image-41985-9-1.png)

## OpenLM オンプレミスユーザー — Microsoft Entra ID を外部 Identity Provider として追加

1. Identity Service アカウントに移動し、**External Providers** アイコンをクリックして外部プロバイダを追加します。
2. ドロップダウンからプロバイダタイプ **Azure** を選択します。
3. **Client ID** を入力します。これは上記 [手順 5](#microsoft-entra-id-の構成) の **Application (client) ID** です。
4. **Client Secret** を入力します。これは上記 [手順 8](#microsoft-entra-id-の構成) の **Value** です。
5. **Account ID** フィールドに **none** と入力します。

   :::warning
   Account ID フィールドを空白のままにしないでください — 必ず `none` と入力してください。空白のままにすると設定が失敗します。
   :::
6. **Authority** フィールドに、次の形式で authority URL を入力します:  
   `https://login.microsoftonline.com/{Directory (tenant) ID}`  
   `{Directory (tenant) ID}` は上記 [手順 5](#microsoft-entra-id-の構成) の tenant ID に置き換えます。
7. Display Name フィールドにプロバイダの表示名（例: **Login with Azure**）を入力します。
8. **Save** をクリックします。  
   ![Identity Service External Providers form with Azure configuration fields](/img/legacy/word-image-41985-10-1.png)
9. Save をクリックすると、追加した外部プロバイダ (Azure) が External Providers リストに表示されます。画面に表示される **Redirect URLs** を控えてください。次の手順で必要になります。  
   ![External Providers list showing the newly added Azure provider with Redirect URLs](/img/legacy/word-image-41985-11-1.png)
10. ここに表示される Redirect URLs が必要になるため、このウィンドウは開いたままにしてください。
11. Microsoft Entra ID アカウントに戻り、**Authentication** セクションに移動します。**Add Platform** をクリックし、**Web** を選択して次を入力します:
    - **Front-channel Logout URL**
    - **Web Redirect URL**

    **ID Tokens** をチェックし、このアプリケーションを使用できるユーザーを選択します。**Configure** をクリックし、**Save** をクリックします。

    :::note
    Redirect URLs は OpenLM Identity Service の UI（上記手順 9 の画面）からコピーする必要があります。
    :::

    ![Azure Authentication section showing platform configuration with Redirect URLs](/img/legacy/word-image-41985-12-1.png)
12. Identity Service アカウントに移動してログアウトします。Azure のログインボタンがログインオプションとして表示されます:  
    ![Identity Service login page showing the Azure Login button](/img/legacy/word-image-41985-13-1.png)

## OpenLM Platform ユーザー — Microsoft Entra ID を外部 Identity Provider として構成

1. OpenLM Cloud Portal の **External Providers** タブに移動し、**Add Provider** をクリックします。  
   ![Cloud Portal External Providers tab with Add Provider button](/img/legacy/word-image-41985-14-1.png)
2. **Client ID** を入力します。これは上記 [手順 5](#microsoft-entra-id-の構成) の **Application (client) ID** です。
3. **Client Secret** を入力します。これは上記 [手順 8](#microsoft-entra-id-の構成) の **Value** です。
4. **Authority** フィールドに次を入力します:  
   `https://login.microsoftonline.com/{Directory (tenant) ID}`  
   `{Directory (tenant) ID}` は上記 [手順 5](#microsoft-entra-id-の構成) の tenant ID に置き換えます。
5. 表示名を入力します（例: **Login with Azure**）。
6. **Save** をクリックします。  
   ![Cloud Portal External Providers form with Azure configuration fields](/img/legacy/word-image-41985-15.png)
7. Save をクリックすると、追加した外部プロバイダ (Azure) が External Providers リストに表示されます。画面に表示される **Redirect URLs** を控えてください。次の手順で必要になります。  
   ![External Providers list in Cloud Portal showing the newly added Azure provider with Redirect URLs](/img/legacy/word-image-41985-16.png)
8. ここに表示される Redirect URLs が必要になるため、このウィンドウは開いたままにしてください。
9. Microsoft Entra ID アカウントに戻り、**Authentication** セクションに移動します。**Add Platform** をクリックし、**Web** を選択して次を入力します:
   - **Front-channel Logout URL**
   - **Web Redirect URL**

   **ID Tokens** をチェックし、このアプリケーションを使用できるユーザーを選択します。**Configure** をクリックし、**Save** をクリックします。

   :::note
   Redirect URLs は OpenLM Cloud Portal（上記手順 7 の画面）からコピーする必要があります。
   :::

   ![Azure Authentication section showing platform configuration with Redirect URLs for Cloud](/img/legacy/word-image-41985-17.png)
10. Cloud Portal に移動し、右上のユーザー名をクリックしてプロフィール情報を表示します。  
    ![Cloud Portal user profile showing the account ID](/img/legacy/word-image-41985-18.png)
11. **OpenLM account ID** を控えてコピーします。
12. Microsoft Entra ID を使って OpenLM Platform アカウントにアクセスするには、次のいずれかの URL を使用します:

    ```
    https://cloud.openlm.com/portal?loginAccountId=<YOUR_ACCOUNT_ID>
    ```

    または

    ```
    https://eu-cloud.openlm.com/portal?loginAccountId=<YOUR_ACCOUNT_ID>
    ```

    `<YOUR_ACCOUNT_ID>` は手順 11 でコピーしたアカウント ID に置き換えます。

:::tip
新しい構成で Cloud Portal にアクセスする前に、ブラウザのキャッシュをクリアしてください。
:::
