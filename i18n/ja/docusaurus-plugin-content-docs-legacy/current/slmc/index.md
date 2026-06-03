---
title: "Cloud登録・設定ガイド(SLMC）"
description: "Software License Management Cloud は、ソフトウェアライセンスを管理および監視するための、ホスト型で提供されるプラットフォームです。"
sidebar_position: 1
---
## はじめに

[Software License Management Cloud](https://www.openlm.com/products/software-license-management-cloud-saas/) は、ソフトウェアライセンスを管理・監視するためのプラットフォームです。この提供モデルでは、ソフトウェアは第三者によってサブスクリプション形式でホスティングおよびライセンス提供されます。組織はクラウドを選択することで、ハードウェアとソフトウェアの保守を外部化し、IT コストを削減できます。OpenLM は、最小限のインストールと保守でライセンス監視を実現できるクラウドソリューションを提供します。

Software License Management Cloud ソリューションを導入するには、次を実施してください:

- Software License Management Cloud の利用登録
- Software License Management Cloud 用 OpenLM Broker の設定
- Applications Manager、Workstation Agent、Directory Sync などの他コンポーネントのインストールと設定

Software License Management Cloud、OpenLM Broker、および OpenLM システムについての広い視点を得るには、次のドキュメントとリソースを参照してください:

- [OpenLM System Structure Overview](../openlm-system-architecture.md)

Software License Management Cloud の設定について質問がある場合は、サポートチーム（support@openlm.com）までお問い合わせください。

## **Software License Management Cloud の利用登録**

Software License Management Cloud ソリューションを使い始めるには、次の手順で登録を完了します:

1. 会社サイトの OpenLM [**Free-Trial**](https://www.openlm.com/free-trial/) ページにアクセスします。
2. Software License Management Cloud の登録リンクを探します（EU サーバーまたは USA サーバーでホスト。**図 1** を参照）。

   ![図 1: Free Trial ページの登録ボックスには Software License Management Cloud の登録ページへのリンクがあります。](/img/legacy/word-image-89305-1.png)

   図 1: Free Trial ページの登録ボックスには Software License Management Cloud の登録ページへのリンクがあります。
3. 利用するサーバーの場所を選択し、Identity Service の登録ページを開きます（**図 2** を参照）。
4. 希望する登録方法を選択します:
   - Direct Registration: メールアドレスと、10 文字以上かつ英数字以外を 1 文字以上含むパスワードを入力します。
   - Third-Party Accounts: Google、Microsoft、または GitHub で登録します。

   ![図 2: Identity Service 登録フォーム](/img/legacy/word-image-89305-2.png)

   図 2: Identity Service 登録フォーム
5. Direct Registration の場合は **Register** ボタンをクリックします。

   ![図 3: 登録確認画面とログインボタン](/img/legacy/word-image-89305-3.png)

   図 3: 登録確認画面とログインボタン
6. **LOGIN** をクリックします。Welcome ページが開きます。
7. 必要情報を入力して **CONFIRM** をクリックします。

   ![図 4: 個人情報](/img/legacy/word-image-89305-4.png)

   図 4: 個人情報
8. LET'S GO をクリックします。Active Products タブが開きます:

   ![図 5: Software License Management Cloud Portal の Active Products タブ](/img/legacy/word-image-89305-5.png)

   図 5: Software License Management Cloud Portal の Active Products タブ
9. 必要な製品を有効化します。最初に有効化する製品は Software License Management Cloud です。**Software License Management Cloud** → **ACTIVATE:** をクリックします。

   ![図 6: Software License Management Cloud の有効化ウィンドウ](/img/legacy/word-image-89305-6.png)

   図 6: Software License Management Cloud の有効化ウィンドウ
10. 製品が Active Products に移動するまで少し時間がかかります:

    ![図 7: Software License Management Cloud の有効化処理中](/img/legacy/word-image-89305-7.png)

    図 7: Software License Management Cloud の有効化処理中
11. パネルが青くなったら **Open** をクリックします:

    ![図 8: Software License Management Cloud の有効化完了](/img/legacy/word-image-89305-8.png)

    図 8: Software License Management Cloud の有効化完了
12. OpenLM Cloud の Welcome 画面が開きます:

![図 9: OpenLM Cloud Welcome ツアーガイド](/img/legacy/word-image-89305-9.png)

図 9: OpenLM Cloud Welcome ツアーガイド

## Software License Management Cloud でのライセンス監視の設定

ライセンスデータの監視を開始するには、License Manager を設定します。方法は 2 つあります:

- **Manual:** 追加のインストールは不要です。この構成は FlexLM License Manager 専用です。
- **Automatic**: ライセンスサーバーマシンで OpenLM Broker を構成する必要があります。Software License Management Cloud は、OpenLM Broker とクラウド上の OpenLM SLM の間に専用ポートで安全な接続を作成します。

## Manual mode

FlexLM license manager を追加します:

1. オンボーディングツアーでは Manual 方式を選択して進めます。
2. **EasyAdmin User Interface** → **License Manager Servers** にリダイレクトされます。

   ![図 10: License Manager 追加ウィンドウ](/img/legacy/word-image-89305-10.png)

   図 10: License Manager 追加ウィンドウ
3. **Display** フィールドに説明を入力してライセンスマネージャーを識別できるようにします。
4. **Type** ドロップダウンから **FlexLM** を選択します。
5. ライセンスサーバーの **Hostname** と **Port number** を入力します。
6. ライセンスサーバーが実際に存在する場所に合わせて **Time Zone** を設定します（例: UTC +02:00 Jerusalem）。
7. **Triad Configuration:** 必要に応じてトグルを有効にします。  
   **On:** OpenLM サーバーは triad 内のすべての FlexLM サーバーの活動を監視します。  
   **Off**（デフォルト）: OpenLM サーバーは 1 台の FlexLM ライセンスサーバーのみを監視します。
8. FlexLM ライセンスマネージャーのライセンスファイルをドラッグまたは選択します。**Submit** をクリックします。  
   重要: 同じライセンスマネージャーに複数のライセンスファイルがある場合は、Submit 前にすべてアップロードしてください。
9. （任意）タブを **Custom fields** に切り替えて、国、利用範囲、説明などの情報を追加できます:

   ![図 11: Custom Fields](/img/legacy/word-image-89305-11.png)

   図 11: Custom Fields
10. **SAVE** をクリックします。
11. 追加したライセンスマネージャーを承認します。
12. その後、ライセンスデータは License Activity などの OpenLM レポートに表示されます:

    ![図 12: License activity ウィンドウ](/img/legacy/license-activity-window_1.png)

    図 12: License activity ウィンドウ

## Automatic mode

1. オンボーディングツアーでは Automatic 方式を選択して進めます。
2. [ダウンロード](https://www.openlm.com/downloads/)し、ライセンスサーバーマシンに OpenLM Broker を[インストール](../openlm-broker/index.md)します。

   ![図 13: OpenLM Cloud Welcome ツアーガイド - Automatic](/img/legacy/word-image-89305-13.png)

   図 13: OpenLM Cloud Welcome ツアーガイド - Automatic
3. オンボーディングツアーで **NEXT:** をクリックします:

   ![図 14: OpenLM Cloud Welcome ツアーガイド - Broker 認可ファイルのダウンロード](/img/legacy/word-image-89305-14.png)

   図 14: OpenLM Cloud Welcome ツアーガイド - Broker 認可ファイルのダウンロード
4. 認可ファイルを生成します。[Cloud Portal に移動](https://cloud.openlm.com/portal/)し、**Client Authorization files** タブで **ADD** をクリックします。

   ![図 15: Cloud Authorization](/img/legacy/word-image-89305-15.png)

   図 15: Cloud Authorization
5. Add Client フォームが表示されます。**Type** ドロップダウンから **Broker** を選択し、**Description** フィールドに説明を入力します:

   ![図 16: Add Client](/img/legacy/word-image-89305-16.png)

   図 16: Add Client
6. **SAVE** をクリックします。
7. 注意: Secret key は一度だけ表示されます。ウィンドウを閉じる前に必ず保存してください。
8. Secret Key と Secret ID が生成されます。JSON ファイルをダウンロードし、ライセンスマネージャーマシンに用意しておきます。

**Pro-tip:** OpenLM Broker をリモートからアクセスするためのヒントです。

OpenLM Broker は特定のマシンにインストールされますが、ネットワーク内の任意のデバイスからアクセスできます。手順は次のとおりです:

- Broker マシンの特定: OpenLM Broker をインストールしたマシンを特定します。

トークンの生成:

- Broker マシンで Web ブラウザを開きます。
- `http://localhost:yourPort/api/new-token` にアクセスします（yourPort は実際の Broker ポートに置き換えます）。
- 1 回限りのトークンが表示されるのでコピーします。

リモートから Broker にアクセス:

- ネットワーク内の任意のデバイスで Web ブラウザを開きます。
- アドレスバーに Broker の FQDN とポートを入力します（例: `http://demo.openlm.net:5090/#/`）。
- コピーしたトークンを該当フィールドに貼り付けます。

1. OpenLM Broker インスタンスにアクセスし、OpenLM Servers タブに移動します。
2. **Add Server** をクリックします。**OpenLM Cloud** を選択して **ADD** をクリックします。**Broker Authorization File** をインポートします。フィールドは自動入力されます。**CHECK CONNECTIVITY** をクリックします。

   ![図 17: OpenLM Server 接続の追加](/img/legacy/word-image-89305-17.png)

   図 17: OpenLM Server 接続の追加
3. 成功したら、**SAVE** をクリックします。Broker は OpenLM SLMC に正常に接続されました。

## ライセンスサーバーの追加

ライセンスサーバーを追加するには、サーバーを追加したうえで設定する必要があります。  
OpenLM は幅広い License managers の監視に対応しています。  
ライセンスマネージャーを設定するには、ナレッジベースの Monitoring License Managers カテゴリにアクセスし、対象のライセンスマネージャーを選択して手順に従ってください。
