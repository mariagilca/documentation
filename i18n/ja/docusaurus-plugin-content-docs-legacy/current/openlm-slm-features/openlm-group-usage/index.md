---
title: "OpenLM Group Usage の設定"
sidebar_position: 1
---
## グループへのユーザーの手動追加

- 中央のネットワークサーバーに単一の OpenLM SLM をインストールしていることを確認します。
- Windows の **Start** ボタン -> **OpenLM** -> **OpenLM User Interface** -> **Start** -> **Users & Groups -> Groups**。
- **Add Group** を選択 -> グループ名を入力 -> **Add Under Current Node** をチェック -> **Save** を選択します。
- 一覧から新しいグループを選択 -> **Members** -> **Add** -> **Select users** -> **Select**。

## CSV ファイルのアップロード

- 中央のネットワークサーバーに単一の OpenLM SLM をインストールしていることを確認します。
- [CSV insert tool](/zips/importUsersToOpenLM2.zip) を OpenLM SLM と同じサーバーにダウンロードして解凍します。
- [JAVA_HOME 変数](https://docs.oracle.com/cd/E19182-01/821-0917/6nluh6gq9/index.html) を設定します。
- **config.properties** を次のように編集します:
  - **login** -> OpenLM SLM の管理者ユーザー名
  - **password** -> OpenLM SLM の管理者パスワード
  - **csv.format.delimiter** -> CSV ファイルの区切り文字（Line separator）
- **Save** します。
- **groups.csv** を編集し、次の値を入力します:
  - **ID** -> グループ ID（1,2,3,4....）
  - **Name** -> 追加したいグループ名
  - **ParentId** -> 親グループの ID
- **datasource.csv** を編集し、次のユーザー値を入力します:
  - ユーザー詳細 -> UserName, FirstName, LastName, DisplayName, Title, Department, PhoneNumber, Description, Office, Email, Enabled, Projects, DefaultProject
  - **Groups** -> グループ ID を入力
  - **DefaultGroup** -> グループ ID を入力
- **Start import.bat** をダブルクリックします。
- **OpenLM User Interface** -> **Start** -> **Users and Groups** -> **Users** で新しいユーザーを確認します。
- **Start** -> **Users and Groups** -> **Groups** で新しいグループを確認します。

## Group Usage の構成 - Options File

- 中央のネットワークサーバーに単一の OpenLM SLM をインストールしていることを確認します。
- ライセンスサーバーに [OpenLM Broker をインストール](https://www.openlm.com/knowledge-base/install-openlm-broker-ht821/) し、[OpenLM Brokers を設定](https://www.openlm.com/knowledge-base/configure-openlm-engineering-applications-ht823/) していることを確認します。
- Windows の **Start** ボタン -> **All Programs** -> **OpenLM** -> **OpenLM User Interface** -> **Start** -> **Administration** -> **Options Files**。
- 該当する options file を選択 -> **Edit** -> **Changes made to the Options File are reflected in the OpenLM User Interface Options File editor.** にチェックします。
- Users と Groups は Options File から自動同期されます。
- [OpenLM のレポート](https://www.openlm.com/knowledge-base/openlm-user-interface-reports-ht890/) を参照してください。
