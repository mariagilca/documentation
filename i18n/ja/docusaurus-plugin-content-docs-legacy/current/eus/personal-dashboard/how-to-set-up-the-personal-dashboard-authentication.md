---
title: Personal Dashboardの認証設定方法
description: "この機能は OpenLM SLM および Identity Service v22.4 とともに v22.4 以降で利用でき、ユーザー認証を有効にすると Personal Dashboard 全体に適用されます。"
sidebar_position: 2
---
**注: この機能は v22.4 以降で利用できます（OpenLM SLM と Identity Service v22.4 以降が必要です）**  
ユーザー認証を有効にすると、Personal Dashboard のユーザーは OKTA、Windows Authentication、AzureAD などのサポートされたプロバイダー、または OpenLM Identity Service で作成した認証情報でログインできます。

End-User Services の認可ファイルを作成する手順:

1. **EasyAdmin** → **Administration** → **System&Security** → **Security** → **Authorization** を開き、**ADD** をクリックします。
2. **Type** のドロップダウンから **End-User Services** を選択します。
3. **Description** フィールドに説明を入力します。
4. End-User Services の URL を **protocol://hostname:port** の形式で入力します。
5. **Save** をクリックします。
6. シークレットキーは 1 度だけ表示される旨のポップアップが表示されます。**OK** をクリックします。必要に応じて ***Don't show this message again*** にチェックします。
7. シークレットキーが表示されたら **Download** をクリックします。
8. `C:\Program Files\OpenLM\End-User Services` に移動し、既存の JSON 認可ファイルを新しく作成したものに置き換えます。
9. End-User Services サービスを再起動します。
10. **EasyAdmin** → **Administration** → **Roles** に移動します。**admin\_role** をダブルクリックし、**Users** → **Add** を選択してユーザー名を追加します。
11. Personal Dashboard に戻ってページを更新します。新しいタブ **Settings** が表示されます。
12. **Enable user authentication** にチェックを入れて **Save** をクリックします。サービスの再起動が必要である旨のポップアップが表示されます。**OK** をクリックして閉じ、End-User Services サービスを再起動します。これでユーザーは EasyAdmin の認証情報でログインできます。

**![中程度の信頼度で自動生成されたユーザーインターフェイスの説明](/img/legacy/graphical-user-interface-description-automaticall.png)**
