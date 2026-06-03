---
title: "Directory Sync インストールガイド"
description: "このプロンプトは、使用するデータベースの種類によって若干異なる場合があります。"
sidebar_position: 1
---
## 前提条件

- OpenLM SLM 21 以上。
- Directory Sync 拡張をサポートするライセンスファイル（不明な場合は sales@openlm.com にお問い合わせください）。
- DSS と DSA を OpenLM SLM とは別のマシンにインストールする場合、そのマシンが AD ドメインコントローラと同じネットワークにあることを確認してください。
- サポート対象データベースのいずれかに指定スキーマがあること - **MariaDB, MS SQL, My SQL**。

## Directory Synchronization Service のインストール

1. [OpenLM Downloads](https://www.openlm.jp/downloads/) ページから最新の DSS を取得し、ダブルクリックでインストーラを実行します。

![スクリーンショット: Directory Synchronization Service installation](/img/legacy/word-image-34440-2.png)

2. "**I agree to the license terms and conditions**" にチェックし、**Next** をクリックします。

3. 次のプロンプトで使用するデータベースタイプを選択します。ドロップダウンから選択して **Next** をクリックします。アップグレードでデータ移行が必要な場合は手順 [4.2](./configuration) に進んでください。

![スクリーンショット 2: Directory Synchronization Service installation](/img/legacy/word-image-34440-3.png)

4. データベース設定の詳細を入力し、**Next:** をクリックします。

**注: 使用する DB タイプによって、このプロンプトは多少異なる場合があります。**

**![スクリーンショット 3: Directory Synchronization Service installation](/img/legacy/word-image-34440-4.png)**

5. 必要に応じてインストールフォルダを変更できます。デフォルトは C:Program FilesOpenLMOpenLM Directory Sync (DSS) Service です。**Next** をクリックします。

![スクリーンショット 4: Directory Synchronization Service installation](/img/legacy/word-image-34440-5.png)

6. セットアップ完了後、**Finish** をクリックします。これによりセットアップウィザードが閉じ、ブラウザで DSS UI が開きます。

![スクリーンショット 5: Directory Synchronization Service installation](/img/legacy/word-image-34440-6.png)

## Directory Synchronization Agent のインストール

1. [OpenLM Downloads](https://www.openlm.jp/downloads/) ページから最新の DSA を取得し、ダブルクリックでインストーラを実行します。

![スクリーンショット: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-22.png)

2. "**I agree to the license terms and conditions**" にチェックし、**Next** をクリックします。

3. Agent インスタンスを識別するための名前（スペース不可）と DSS インストール情報（**Directory Sync UI → Service Configuration** タブの DSS Server に記載）を入力し、Server バージョン（On-premise または Cloud）を選択します。**Next** をクリックします。

![スクリーンショット 2: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-23.png)

4. 次のプロンプトで認可が必要になります。Identity Service を使用しない場合はこの手順をスキップできます。

![スクリーンショット 3: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-24.png)

5. Authorization ファイルを取得するには **EasyAdmin** に移動し、**Start→Administration→System&Security→Security→Authorization→Add** の順に進みます。

**![スクリーンショット 4: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-25.png)**

6. ドロップダウンから Client type を DSA に設定し、**Save** をクリックします。

**(***注: Secret Key は 1 度しか表示されません。ウィンドウを閉じる前に必ず保存してください***).**

7. Client ID と Client Secret を含む JSON ファイルをコピーまたはダウンロードします:

![スクリーンショット 5: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-26.png)

8. インストール手順に戻り、資格情報をインポートするかコピー&ペーストします:

![スクリーンショット 6: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-27.png)

9. 必要に応じてインストールフォルダを変更できます。パスを入力するか **Browse** をクリックし、完了したら **Next** をクリックします。

![スクリーンショット 7: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-28.png)

10. セットアップ完了後、**Finish** をクリックします。この時点で DSA の承認要求が DSS に送信されています。DSS UI を開き、Agent Manager タブで承認してください。  
![スクリーンショット 8: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-29.png)

完了したら、[このガイド](./configuration)に従って Directory Sync インスタンスを構成してください。
