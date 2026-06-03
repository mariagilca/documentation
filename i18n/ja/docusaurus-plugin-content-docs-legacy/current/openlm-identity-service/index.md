---
title: "OpenLM Identity Service インストールガイド"
description: "Identity Service は、業界標準の OAuth 2.0 を使用してすべての OpenLM 製品の認証を管理する、安全なソリューションです。"
sidebar_position: 1
---
## 前提条件

- システム要件に準拠した、Identity Service 専用の空のデータベース

## 概要

Identity Service は、すべての OpenLM 製品の認証を管理するセキュアなソリューションです。業界標準の OAuth 2.0 を使用し、ユーザーのサインインを即時に処理します。OpenLM の [システム要件](https://www.openlm.jp/openlm-system-requirements/) も必ず確認してください。

## インストール

以下は Identity Service のインストールと設定の簡易ガイドです:

1. OpenLM Web サイトから OpenLM Identity Service を取得します。ダブルクリックしてインストールを開始します。
2. 利用規約をよく読み、同意する場合はチェックボックスを選択して **Next** をクリックします。
3. Identity Service を別の場所にインストールする場合は **Change** をクリックし、任意のフォルダーを選択します。
4. Identity Service には空のデータベースが必要です。インストールを続行する前に用意し、**Install** をクリックします:

![スクリーンショット: Installation](/img/legacy/jKJPez2KcHF1NWTx5Y8ARyGAHKAK4C5bbiE67a5yY4eGgyGacHiEmdT3EoNH72jGn93BZv0qOUgoQl_yKDlLhAdnTntmSJXM9AyrAbyW6IYKEgGTwWhx3iBsst-h4WZWkhKe9nVkIx-Ph22rv-hL23a7rLtuDwMQuc5ZmT9uDNlLYsvHdB3JCZ2B8ycE.png)

5. 次の画面で一時的なユーザー名とパスワードが表示されます。すぐに変更することを強く推奨します。**Next** をクリックして続行します:

![スクリーンショット 2: Installation](/img/legacy/MNScr54FAtXIpS03yUcEJlDCqG1Zc_kRkvz-JUxAM-uzttDnHAs1zLl0uPwxqt_xq245jmmNW8JuqgRLviXCAoFuIpMqCiXU9VQc8W0L8-FwyJ201lyvD8O_WrimEWrCuTHjpyjTiFH1SbmlqKMnkNklzL_xIElArMTUJW-eD_NoCl_Y5ZrCig1EgLh7.png)

6. 直後にデータベース構成ツールが表示されます。必要な情報を入力し、接続テストを行って成功したら **Approve** をクリックします。

![powershell prompt](/img/legacy/f0I9m8EeX7qED8GuRaU-geeRYZM0Cy6Pxw3AL3LAt_7IkjpDIUrb0qSunxSlsvsOzwaVASq1-6I0KS2BONxo1NgzVA91Wm1mK8ToEhYdT5SZSwHL6y2IA6V-CRHiOR8cX591rToEK2RP0dxydDiXTgCZO4HTrNFuhmI2CRmjPG-7NF2IY4BNfO08dK9y.png)

7. 次の画面でポート番号を指定し、**Enter** を押します。既定は 5000 です。*注: 他のアプリケーションが使用しているポートは使用しないでください。不明な場合は既定の 5000 を使用してください。*

ポートの空き状況を確認する CMD コマンド（5000 の例）:      netstat -a -n -o | find "5000"

![powershell prompt](/img/legacy/B2oHKWr83vT6zOS0MES70Rb-sCFqrk2Z2jl119a4GfwkE-YWUkHZuLqiTYmEF0FZswFph-Ykvw2uzTaz07MClB-tTzn6JBIuXtEGhIPR-pGckcKJfATRW5-9fNfEJd0oztvVSPKxcKkcGqmjvV42GESdFlehQN82h-5QH7FER0sI3MEg5fb_ImEGAyTr.png)

8. 続いてデータベースの作成と Identity Service の構成が行われます:

![powershell prompt](/img/legacy/XtHahtucly2BFtcCP4J2Cbqu05S0QQbkLvriIpjwUbnWRmrUh_1RKhhTkuts8I21rCRtYZ3xy6CWjuaMbR5YXtLGvvEJJo1eEjk_N6yQyROTDWeV3lFEA3plai9arUE8nTbRNf32w1-vKTYttgF0uA3qJ4bE4o1AL3frVCudDXdZmKezM02pBMBAy86G.png)

9. 構成が完了したら **Enter** を押します。

10. **Finish** ボタンをクリックします。OpenLM Identity Service UI にリダイレクトされます。以下の既定の認証情報でサインインします:

Login: Admin

Password: Admin123!

![Identity service login](/img/legacy/ydu0Ms_f7IbTQqdFRsy2fvSWNiNtM-CQL7mFnoWlc1OpMMj015Ei1hm4aefsuLvh6Rop5PRArR7KVfMv5CACKiO8M44OnrTuFC8NJVTziRFpyYHKWzrjLhV2j6_ktKCITF60jk-fbo_J0op96yh-u76_A9Rg9cK9fcYFPK9b4gDCYu_sxM4dnvDh6hR2.png)

11. 一時パスワードを変更します。安全な新しいパスワードを入力して確認し、**Change** をクリックします:

![Identity service change password prompt](/img/legacy/AGgqWzAXCCo6kXDEgs9TNRj8srylFuguwBeK4Na6bnjM97XeDrMJuaefG2ZLvUrRDO0CXC1mss5GlAFND3yNeZvw0w1kapoO6TY94ldrq5oaXzsIF1VJ3DBAqh5nUtkWoAO9FYqTUTGgxqu6OQ8Ddsyj6GrtMEEWsmILz95qTx2o2YEqZC-afanfjvQo.png)

12. パスワード変更後、ログインページに戻ります。新しい認証情報で Identity Service にアクセスしてください。推奨される設定については [Identity Service 設定](./configuration/) を参照してください。
