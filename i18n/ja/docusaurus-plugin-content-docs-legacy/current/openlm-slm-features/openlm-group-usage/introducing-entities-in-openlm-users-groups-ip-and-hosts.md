---
title: "エンティティ導入 - Users、Groups、IP、Hosts"
description: "OpenLM はユーザーおよびユーザーグループに基づいてライセンス使用状況を監視し、Options file を通じてライセンス使用の制約を適用することもできます。"
sidebar_position: 2
---
## 範囲

OpenLM はユーザーおよびユーザーグループに基づいてライセンス使用状況を監視します。また、Options file 管理によってライセンス使用の制約を適用することもできます。

本ドキュメントでは、OpenLM が扱うエンティティ（Users、User groups、Host、Host groups、IPs）について説明します。

それぞれの役割と OpenLM DB への導入方法を簡潔に説明します。

## Users

新しいユーザーを OpenLM データベースに導入する方法は 4 つあります:

- Active license usage: ユーザーがライセンスをチェックアウトしたとき
- EasyAdmin User Interface Web アプリケーションから手動で追加
- 会社の Active Directory との同期
- Options File Reading

### Active users

ユーザーが初めてライセンスをチェックアウトすると、自動的に **Active User** になります。すべての情報が記録・保存され、システム管理者は将来のソフトウェア使用状況や所有を把握できます。

### 手動で新しい Users を追加する

ユーザーとグループを手動で追加する方法は、EasyAdmin の **Users & Groups** メニューから行います。

1. OpenLM EasyAdmin User Interface を開きます。
2. **Start → Users & Groups → Users** をクリックします。
3. **Add User** をクリックして必要なデータを入力し、**Enabled** をチェックしてから **Save** をクリックします。

![スクリーンショット: Manually introducing new users](/img/legacy/word-image-26336-1-1.png)

### 組織の Active Directory (LDAP) とのユーザー同期

ディレクトリ同期でユーザーを取り込む方法については、以下のアプリケーションノートを参照してください:

現行の OpenLM バージョンでは Directory Synchronization コンポーネントを使用します:

[Directory Synchronization - Configuration Guide](../../directory-sync/configuration.md)

### Options file からの情報インポート

FLEXlm（FlexNet publisher）Options file は、ライセンスモデルの制約内でさまざまな運用パラメータをライセンス管理者が細かく制御できるようにします。Options file の設定により、ライセンス対象フィーチャーを Users/Groups、Hosts、IPs、Host Groups に対して専用、拒否、または予約できます。

詳細はこのドキュメントを参照してください:

[Options File management Using OpenLM EasyAdmin](../../options-files/options-file-management-using-openlm-easyadmin-kb4007.md)

### グループ

ユーザーグループは次のいずれかで OpenLM DB にインポートできます:

- OpenLM EasyAdmin User Interface からユーザーグループを手動で追加
- 会社の Active Directory サービスとの同期
- Options File の読み取り

**注意:**

- ユーザーは複数のグループに所属できます。各ユーザーには既定のユーザーグループが割り当てられます。
- OpenLM は特定ユーザーの全使用時間を、そのユーザーの既定グループに割り当てます。
- 1 つのグループにのみ所属しているユーザーは、そのグループが既定グループとみなされます。

### 手動で新しい User Groups を追加する

1. OpenLM EasyAdmin User Interface を開きます。
2. **Start → Users & Groups → Groups** をクリックします。
3. **Add Group** をクリックし、必要なデータを入力します。**Group Name** を入力して **OK** をクリックします。  
   ![スクリーンショット: Manually introducing new user groups](/img/legacy/word-image-26336-2-1.png)
4. **Groups** ウィンドウで新しく作成したグループ (a)（例: my_group）をハイライトし、**Members** アイコン (b) をクリックしてグループに新しいメンバーを追加します。**Users in my_group** ウィンドウ (c) が開きます。
5. **Users search** ウィンドウが開きます。**Users search** ウィンドウからユーザーを選択し、**Add** (d) をクリックして **Users in my_group** に追加します。必要に応じて繰り返します。

![スクリーンショット 2: Manually introducing new user groups](/img/legacy/word-image-26336-3-1.png)

### Active Directory 同期によるグループの導入

この内容は次のドキュメントでも説明されています:

[Directory Synchronization - Configuration Guide](../../directory-sync/configuration.md)（特に "Group Rules tab" セクション）

DSS 設定インターフェースを使用して、ユーザーの既定グループを設定できます。

### Options file の読み取り

Options file の読み取りによってグループとグループメンバーをインポートすることもできます。上記および次のアプリケーションノートで説明しています:

[Options File management Using OpenLM EasyAdmin](../../options-files/options-file-management-using-openlm-easyadmin-kb4007.md)

## IP 範囲への Options file 制約の適用

特定コンピューターのライセンス使用を制御するには、IP アドレスに制約を適用します。コンピューターの IP 範囲を指定して制御することもできます。

例えば、IP に 123.123.123.* と入力すると、Options File 設定が 123.123.123.0 〜 123.123.123.255 の範囲のすべてのユーザー IP に適用されます。

### 特定 IP の追加

1. EasyAdmin Web アプリケーションを開きます。
2. Start → Option Files → IPs をクリックします。
3. **Add** ボタンをクリックすると **Add IP** ウィンドウが開きます。
4. テキストボックスに追加したい IP アドレスを入力します。

### IP 範囲の追加

1. EasyAdmin User Interface Web アプリケーションのウィンドウで操作します。
2. Start → Option Files → IPs をクリックします。
3. **Add** ボタンをクリックすると **Add IP** ウィンドウが開きます。
4. テキストボックスに追加したい IP 範囲を入力します（上の段落で説明したとおり）。

![スクリーンショット: Add a range of IP addresses](/img/legacy/word-image-26336-4-1.png)

## Hosts および Host groups への Options file 制約の適用

Hosts は次の方法で OpenLM DB に導入できます:

- Options file の読み取り
- LDAP 同期
- Options file エディタから手動で追加（下記参照）

### Host Groups について

仮想マシンのホストをカスタムグループとして作成し、ホストとその仮想マシンを意味のある形でグルーピングできます。例えば、組織の支社ごとにホストグループを作成できます。ホストグループを使用して、ホストグループ内のホスト上のリソースをホスト OS の使用に割り当てることも可能です。

1. EasyAdmin User Interface Web アプリケーションを開きます。
2. **Start → Option Files → Host Groups** をクリックします。Host Groups ウィンドウが開きます。
3. '**Add**' ボタンをクリックし、Host group（例: "test test test"）を追加します。
4. 追加したグループを選択し、"Members" アイコンをクリックします。"test test test" の Members ウィンドウが開きます（画像参照）。  
   ![スクリーンショット: About host groups](/img/legacy/word-image-26336-5-1.png)
5. グルーピングに必要なコンピューターを選択し、'**Select**' をクリックします。新しい Host group の準備が整います。
