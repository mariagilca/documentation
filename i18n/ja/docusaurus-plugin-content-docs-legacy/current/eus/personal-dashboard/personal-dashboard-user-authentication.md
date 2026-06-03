---
title: "Personal Dashboardのユーザー認証"
description: "Personal Dashboard のユーザー認証。"
sidebar_position: 3
---
## ユーザー認証の有効化

1. Personal Dashboard にアクセスします。
2. **Settings** タブ → **SSL** タブでパスワードと SSL 証明書のパスを入力し、End User Services Service を再起動します。  
   ![Graphical user interface, application, Teams Description automatically generated](/img/legacy/graphical-user-interface-application-teams-desc-1.png)

**注:** 以前 Personal Dashboard を SSL 設定で保護していなかった場合は、**EasyAdmin User interface** → **Start** → **Administration** → **System&Security** → **Security** → **Authorization** → **ADD** で新しい認可ファイルを発行してください。  
その後 `C:\Program Files\OpenLM\End-User Services` に移動し、既存の認可ファイルを新しいものに置き換えて、End User Services Service を再起動します。

3. 更新後のアドレスで Personal Dashboard を開き直します: **https://fqdn:53555.**
4. **SECURITY** タブで **Enable user authentication** にチェックを入れます。
5. ![Graphical user interface, text, application Description automatically generated with medium confidence](/img/legacy/graphical-user-interface-text-application-descr-1.png)
6. End User Services Service を再起動し、必要に応じてページを更新します。これで Personal Dashboard からログアウト可能になります。  
   ![スクリーンショット: user authentication のアクティベーション](/img/legacy/word-image-50565-3-1.png)

## Personal Dashboard で表示するライセンスマネージャーを絞り込む方法

既定では、OpenLM Personal Dashboard ユーザーはすべてのサーバー／ライセンスを閲覧できます。特定のサーバー／ライセンスのみを表示したい場合は、Personal Dashboard に ACL を適用します。

1. **EasyAdmin User Interface** → **Administration** → **Roles** に移動します。Roles ウィンドウが開きます。  
   ![スクリーンショット: How to filter the ライセンスマネージャーs' information available in PD](/img/legacy/word-image-50565-4-1.png)
2. **Add** をクリックし、ロール名と説明を入力して **Save** をクリックします。
3. **Save** 後に **Resources** タブが有効になります。**Resources** → **Add** をクリックします。
4. 対象のリソースを選択します。  
   ![スクリーンショット 2: How to filter the ライセンスマネージャーs' information available in PD](/img/legacy/word-image-50565-5-1.png)
5. **Role Details** タブに切り替え、**Users → ADD** をクリックします。  
   ![スクリーンショット 3: How to filter the ライセンスマネージャーs' information available in PD](/img/legacy/word-image-50565-6-1.png)
6. このロールを割り当てるユーザーを選択します。  
   ![スクリーンショット 4: How to filter the ライセンスマネージャーs' information available in PD](/img/legacy/word-image-50565-7-1.png)
7. **Administration** → **Roles** に戻り、**agent\_query\_role** をダブルクリックして **Groups** を開き、OpenLM\_Everyone グループを削除します。  
   ![スクリーンショット 5: How to filter the ライセンスマネージャーs' information available in PD](/img/legacy/word-image-50565-8-1.png)
8. OpenLM SLM と End-User Service のサービスを再起動します。
9. Personal Dashboard ユーザーには、割り当てられたサーバーのみが表示されます。
