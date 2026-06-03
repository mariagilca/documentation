---
title: "AD FS と OpenLM の連携"
description: "本書では、AD FS を OpenLM Identity Service の外部 ID プロバイダーとして設定するために必要な手順を説明します。"
sidebar_position: 4
---
## 要件:

- ADFS サービスが構成済み
- OpenLM Identity Service が HTTPS（SSL）でインストール・稼働していること

このドキュメントでは、OpenLM Identity Service の外部 ID プロバイダーとして AD FS を構成する手順を説明します。

## アプリケーショングループの作成

1. AD FS Management で **Application Groups** を右クリックし、**Add Application Group** を選択します。
2. **Application Group Wizard** で名前を入力し、Standalone applications で **Server application** テンプレートを選択して **Next** をクリックします。
3. **Client Identifier** の値をコピーします。後で Identity Service の設定で使用します。
4. Redirect URI に Identity Service の URL（[https://server.domain](https://server.domain/)）を入力し、**Add** → **Next** をクリックします。
5. Configure Application Credentials 画面で **Generate a shared secret** にチェックし、シークレットをコピーして **Next** をクリックします。
6. Summary 画面で **Next** をクリックします。
7. Complete 画面で **Close** をクリックします。
8. 追加した Application Group を右クリックして **Properties** を選択します。
9. Properties 画面で **Add application** をクリックします。
10. Add a new application to... で **Web API** を選択し、**Next** をクリックします。
11. Configure Web API 画面で Identifier に同じ URL（[https://server.domain](https://server.domain/)）を入力し、**Add** → **Next** をクリックします。
12. Apply Access Control Policy 画面で **Permit everyone** を選択し、**Next** をクリックします。
13. Configure Application Permissions 画面で ***openid*** と ***profile*** にチェックが入っていることを確認し、**Next** をクリックします。
14. Summary 画面で **Next** をクリックします。
15. Complete 画面で **Close** をクリックします。
16. Properties 画面で **OK** をクリックします。

## OpenLM Identity Service に外部プロバイダー（AD FS）を追加

OpenLM Identity Service に外部プロバイダー（AD FS）を追加するには、次の手順を実施します:

1. **External Providers** ![スクリーンショット: an External Provider (AD FS) in OpenLM Identity Service の追加](/img/legacy/word-image-14.png) アイコンをクリックし、**Add Provider** に移動します。
2. ドロップダウンから **ADFS** を選択します。
3. **Client ID** フィールドに Client ID を入力します。Client ID は上記セクションの手順 3 の AD FS 設定にある "Application (client) ID" です。
4. Client Secret フィールドに Client Secret を入力します。Client Secret は上記セクションの手順 5 の AD FS 設定にある "Value" です。
5. **Account ID** フィールドには **none** を入力します。
6. **Authority** フィールドに権限 URL（AD FS サーバーのアドレス）を入力します。例: https://fqdn.domain.com/adfs/
7. ボタンの表示名を入力します（例: **AD FS**）。
8. **Save** をクリックします。
9. 追加されたプロバイダーが次の画面に表示されます。Sign in と Sign out のリダイレクト URL をコピーします。
10. AD FS サーバーに戻り、**Tools** → **AD FS Management** → **Application Groups** をクリックします。
11. アプリケーションをダブルクリックします。
12. アプリケーションを選択して **Edit** をクリックします。
13. Redirect URI フィールドに手順 9 でコピーした Sign in / Sign out の URL を貼り付け、**Add** → **OK** → **Apply** をクリックします。

これでサインイン時に AD FS ボタンが表示されます:

![スクリーンショット 2: an External Provider (AD FS) in OpenLM Identity Service の追加](/img/legacy/identity.png)
