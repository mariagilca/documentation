---
title: "Azure Active Directory と OpenLM の統合"
sidebar_position: 5
---
このドキュメントでは、Azure Active Directory (AAD) を Identity Service と構成し、OpenLM の外部 Identity Provider として Azure Active Directory を設定するための手順を説明します。以下の手順を実行して設定を完了します。

## Azure Active Directory の構成

1. [Azure Portal]（https://portal.azure.com） にログインします。Azure Active Directory (AAD) に移動します。  
   ![](/img/legacy/word-image-41985-1-2.png)
2. **App Registrations** セクションに移動します。  
   ![](/img/legacy/word-image-41985-2-2.png)
3. 新しい登録を作成します。**New Registration** ボタンをクリックします。  
   ![](/img/legacy/word-image-41985-3-2.png)
4. アプリケーションの **display name** を入力します（例: **Identity Service**）。Redirect URI フィールドでは、ドロップダウンから Web を選択します。URI フィールドは空のままにしておき、後で構成時に更新します。**Register** ボタンをクリックします。  
   ![](/img/legacy/word-image-41985-4-2.png)
5. アプリケーションが登録されました。以下に表示される **Application (client) ID** と **Directory (tenant) ID** を控えてください（Register ボタンをクリックすると表示されます）。  
   ![](/img/legacy/word-image-41985-5-2.png)
6. **Certificates & Secrets** セクションに移動し、新しい client secret を作成します。**New client secret** をクリックします。  
    **Pro tip:** このセクションは新しいタブで開いておくことをおすすめします。  
   **![](/img/legacy/word-image-41985-6-2.png)**
7. client secret の **description** と **lifespan** を指定し、**ADD** をクリックします。  
   **![](/img/legacy/word-image-41985-7-1.png)**
8. Client Secret が作成されました。**Value** と **Secret ID** を控えてください。  
   **重要**: Client secret の値は作成直後にしか表示されません。ページを離れる前に必ず Secret ID を保存してください。  
   **![](/img/legacy/word-image-41985-8-1.png)**
9. **注**: 値は以下の画像のように伏せ字で表示され、ページを閉じると再取得できません:  
   ![](/img/legacy/word-image-41985-9-1.png)

### **OpenLM オンプレミスユーザー** - OpenLM Identity Service に Azure Active Directory を外部 Identity Provider として追加

Identity Service に外部プロバイダ（Azure）を追加するには、OpenLM SLM と Identity Service が [SSL で保護](../../openlm-slm/setting-up-ssl-for-openlm-server-and-identity-service.md) されていることを確認してください。

1. Identity Service アカウントに移動し、**External Providers** アイコンをクリックして外部プロバイダを追加します。
2. ドロップダウンからプロバイダタイプ **Azure** を選択します。
3. Client ID フィールドに **Client ID** を入力します。Client ID は "**Application (client) ID**"（上記 "Azure Active Directory の構成" セクションの手順 5）です。
4. Client Secret フィールドに **Client Secret** を入力します。Client Secret は "**Value**"（上記 "Azure Active Directory の構成" セクションの手順 8）です。
5. **Account ID** フィールドに n**one** を入力します。
6. **Authority** フィールドに authority URL を入力します。Azure Authority URL に **Directory (tenant) ID**（上記 "Azure Active Directory の構成" セクションの手順 5）を組み合わせ、**https://login.microsoftonline.com/{Directory (tenant) ID}** を設定します。
7. Display Name フィールドにプロバイダの表示名（例: **Login with Azure**）を入力します。
8. **Save** をクリックします。  
   **![](/img/legacy/word-image-41985-10-1.png)**
9. Save をクリックすると次の画面が表示されます。追加した External Provider (Azure) が External Providers リストに表示され、以下の詳細が表示されます。赤で示されたフィールドを確認してください:  
   ![](/img/legacy/word-image-41985-11-1.png)
10. このウィンドウはしばらく開いたままにしてください。
11. Azure Active Directory アカウントに戻り、**Authentication** セクションに移動します。**Add Platform** をクリックし、"**Web**" を選択して Redirect URL を設定します: **Front-channel Logout URL** と **Web Redirect URL**。**ID Tokens** をチェックし、このアプリケーションを使用できるユーザーを選択します。**Configure** をクリックして **Save** します。**注:** Redirect URL は、外部プロバイダ追加時に OpenLM Identity Service UI から取得した値（手順 9 の画面）を使用する必要があります。  
    ![](/img/legacy/word-image-41985-12-1.png)
12. Identity Service に戻ってログアウトします。Azure のログインボタンがログインオプションとして表示されます:  
    ![](/img/legacy/word-image-41985-13-1.png)

### **OpenLM Cloud ユーザー** - Cloud Portal で Azure Active Directory を外部 Identity Provider として構成

1. OpenLM Cloud Portal の **External Providers** タブに移動し、**Add Provider** をクリックします。  
   ![](/img/legacy/word-image-41985-14-1.png)
2. Client ID フィールドに **Client ID** を入力します。Client ID は "**Application (client) ID**"（上記 "Azure Active Directory の構成" セクションの手順 5）です。
3. **Client Secret** フィールドに Client Secret を入力します。Client Secret は "**Value**"（上記 "Azure Active Directory の構成" セクションの手順 8）です。
4. **Authority** フィールドに **https://login.microsoftonline.com/{Directory (tenant) ID}** を入力します（tenant ID は上記 "Azure Active Directory の構成" セクションの手順 5 の Directory (tenant) ID です）。
5. 表示名を入力します（例: "**Login with Azure**"）。
6. **SAVE** をクリックします。  
   ![](/img/legacy/word-image-41985-15.png)
7. Save をクリックすると次の画面が表示されます。追加した External Provider (Azure) が External Providers リストに表示され、以下の詳細が表示されます。赤で示されたフィールドを確認してください:  
   ![](/img/legacy/word-image-41985-16.png)
8. このウィンドウはしばらく開いたままにしてください。
9. Azure Active Directory アカウントに戻り、**Authentication** セクションに移動します。**Add Platform** をクリックし、"**Web**" を選択して Redirect URL を設定します: Front-channel Logout URL と Web Redirect URL。**ID Tokens** をチェックし、このアプリケーションを使用できるユーザーを選択します。**Configure** をクリックして **Save** します。**注:** Redirect URL は、外部プロバイダ追加時に OpenLM Cloud Portal から取得した値（手順 7 の画面）を使用する必要があります。  
   ![](/img/legacy/word-image-41985-17.png)
10. Cloud Portal に移動し、右上のユーザー名をクリックしてプロフィール情報を表示します。  
    ![](/img/legacy/word-image-41985-18.png)
11. **OpenLM account ID** を控えてコピーします。
12. Azure Active Directory を使って OpenLM Cloud アカウントにアクセスするには、次のいずれかの URL を作成します:  
    [https://cloud.openlm.com/portal?loginAccountId=](https://cloud.openlm.com/portal?loginAccountId=olmid)your OpenLM account ID  
    または  
    [https://eu-cloud.openlm.com/portal?loginAccountId=](https://eu-cloud.openlm.com/portal?loginAccountId=olmid)your OpenLM account ID

**Pro-tip**: 新しい構成で Cloud Portal にアクセスする前に、キャッシュをクリアしてください。
