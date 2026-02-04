---
title: "Directory Sync設定"
sidebar_position: 2
---
Directory Sync を使用して OpenLM Database を組織のディレクトリサービスと同期するための包括的ガイドです。クラウドで Directory Sync を設定する方法は、[こちらのガイド](../slmc/cloud-directory-sync)を参照してください。

**Ldap 属性と OpenLM User 属性の対応表**は、[こちらのリンク](/pdfs/Mappings-between-Ldap-attributes-and-OpenLM-User-attributes.pdf)から確認できます。

## **概要**

OpenLM は、ドメインディレクトリ（例: ActiveDirectory）のユーザー情報を OpenLM データベースと同期する機能を提供します。これは **Directory Sync 製品**で実現され、2 つのコンポーネントで構成されています:

- **Directory Synchronization Agent** (DSA)。以降、本ドキュメントでは DSA と表記します。
- **Directory Synchronization Service** (DSS)。以降、本ドキュメントでは DSS と表記します。

LDAP 同期には両コンポーネントのインストールが必要です。

アーキテクチャ概要:

1. DSS は OpenLM SLM に直接接続します。同一マシンにインストールすることも、別マシンにインストールすることも可能です。DSS の役割は同期定義を保存し、エージェントを管理することです。
2. 1 つ以上の DSA が DSS に接続します。DSA は DSS と同じマシンにも別マシンにもインストールできます。役割は、DSS から同期定義を取得し、ドメインディレクトリを照会して結果を DSS に返すことです。
3. DSS が DSA からデータを受け取ると、OpenLM SLM に送信できる状態になります。

![](/img/legacy/word-image-34440-1.png)

**注:** 1 つの DSA で複数のディレクトリ（例: AD と eDirectory）を照会できます。この図は、多数ある構成のうち、2 つの DSA を使用する構成の一例のみを示しています。

## **要件**

1. OpenLM SLM 21 以上。
2. Directory Sync 拡張をサポートするライセンスファイル（不明な場合は sales@openlm.com にお問い合わせください）。
3. DSS と DSA を OpenLM SLM と別のマシンにインストールする場合、そのマシンが AD ドメインコントローラと同一ネットワークにあることを確認してください。
4. サポート対象データベースのいずれかに指定スキーマがあること - **MariaDB, MS SQL, My SQL**（Firebird は廃止済み）。

### ポート構成:

DSA のインストール時にポート 8081 が空いている必要があります。占有されていてインストール時にエラーが出る場合は、DSA のインストールフォルダ（C: Program FilesOpenLMOpenLM Directory Synchronization Agent）の **kestrel.config** ファイルを編集し、ポート番号を変更して DSA サービスを再起動してください。

さらに、DSS と DSA を OpenLM SLM と別マシンにインストールする場合は、アプリケーションポートに適切なファイアウォールルールを設定する必要があります:

1. OpenLM SLM マシン: 5015 への受信、7026 への送信
2. DSS マシン: 7026 への受信と送信
3. DSA マシン: 7026 への送信

## **設定**

### Directory Synchronization Service (DSS)

DSS を稼働させる前に設定を完了する必要があります。手順は次のとおりです:

1. Directory Sync UI を開きます。これは DSS インストーラの Finish をクリックすると自動で開くか、**Windows Start → OpenLM → OpenLM Directory Sync** から開けます。

**注:** *Identity Service を使用する場合は、Identity Service で DSS を設定し、DSS サービスを再起動してください。詳しくは [こちらのガイド](../openlm-identity-service/configuration)を参照してください。Identity Service を使用しない場合はログイン不要です。*

2. 左側メニューの **Service Configuration** タブをクリックします。

3. 次のとおり詳細を入力します:

![](/img/legacy/word-image-34440-7.png)

*図: OpenLM SLM と DSS を同一マシンにインストールした場合のデフォルト設定*

**OpenLM SLM:**

- **IP/Hostname** - DSS が接続・報告する OpenLM SLM マシンの URL。OpenLM SLM で HTTPS/SSL が有効な場合、ここで指定するホスト名は SSL 証明書の記載と完全一致している必要があります。
- **Port** - OpenLM SLM の API ポート（デフォルト: 5015）

**DSS Server**

- **IP/Hostname** - OpenLM SLM から参照される DSS サーバーの URL。DSS を OpenLM SLM と別マシンにインストールしている場合は、そのアドレスを指定します。SSL を使用する場合は、証明書ファイルに記載されているホスト名と完全一致させてください。
- **Port** - DSS UI が提供されるポート（デフォルト: 7026）。既定では読み取り専用です。変更するには C:Program FilesOpenLMOpenLM Directory Synchronization Service Service の **kestrel.config** を編集し、DSS Service を再起動します。
- **SSL** - DSS の通信ポートで HTTPS を有効/無効にするトグル。ON にした場合は **SSL certificate file (pfx)** とその **Password** を指定する必要があります。DSA の接続設定も、DSA インストールフォルダ内の *OpenLM.Ldap.Agent.config* を編集して調整する必要があります。DSS と Server/Identity を SSL (HTTPS) で構成するワークフローは [こちら](../openlm-slm/setting-up-ssl-for-openlm-server-and-identity-service.md) を参照してください。

追加のサービス設定:

**Time&Date**

- DSS UI で表示・使用するタイムゾーンを指定できます:

![](/img/legacy/word-image-34440-8.png)

**Advanced:**

- **Advanced** タブでは DSS データベースからユーザーやグループを削除できます。DSS データベースのエンティティや関連を削除するために使用し、DSS の初期設定プロセスでは使用しないでください。これは元に戻せない操作です:

![](/img/legacy/word-image-34440-9.png)

4. **Apply** をクリックして設定を確定します。OpenLM SLM への接続リクエストが送信されます。

**注:** *Identity Service を使用している場合、DSS がこの構成を自動検出します:*

![](/img/legacy/word-image-34440-10.png)

![](/img/legacy/word-image-34440-11.png)

5. EasyAdmin を開きます（**Windows Start → OpenLM → OpenLM EasyAdmin User Interface**）。

6. **EasyAdmin Start → Administration** に移動し、**External Platforms** をクリックします。

![](/img/legacy/word-image-34440-12.png)

7. 左側の **DSS** タブをクリックし、**Approve** をクリックします。

![](/img/legacy/word-image-34440-13.png)

8. DSS への接続が正常に確立されたことを示す成功メッセージが表示されます:

![](/img/legacy/word-image-34440-14.png)

これで OpenLM SLM と DSS の接続が確立されました:

a) 既存の LDAP 同期定義がある場合は、新しいドメイン追加や同期定義作成の前にそれらをどうするか決める必要があります。続きはセクション 4.2 を参照してください。

b) 既存の LDAP 同期定義がない場合、設定は完了です。セクション 5 の手順でドメインと同期定義を追加する前に、少なくとも 1 つの DSA インスタンスを追加する必要があります。

### SSL (HTTPS) で OpenLM SLM と Identity を構成した場合の DSS のワークフロー

OpenLM SLM と Identity が SSL (HTTPS) の場合:

1. OpenLM SLM と Identity Service で SSL (HTTPS) を有効化した後、DSS UI の Connectivity タブを開き、Server の IP/hostname を HTTPS: FQDN（例: "https://hostname.domain"）に変更します。SSL 証明書は FQDN に発行されるのが一般的なためです。**Apply** をクリックします。

2. HTTPS Server で DSS を承認した後、DSS の appsettings.json にある Identity Service の場所を必ず更新します:

- "Authority" フィールドを "http:identityHost:port" から "http**s**:identityHost:port" に手動で変更する

- Identity UI の Security settings から、DSS URL の末尾に "/" を追加して **Save** をクリックする（Identity が新しい設定を適用し DSS にリクエストを送るための回避策）。例: [http://hostname:7026](http://hostname:7026) を [http://hostname:7026/](http://hostname:7026/) に変更。

3. 手順 1 と 2 の変更後、DSS を再起動し、その後 DSA サービスを再起動して通常どおり作業を続けます。

### DSS & DSA SSL 構成

1. SSL トグルを ON にし、証明書パスとパスワードを入力します。
2. DSS サービスを再起動します。
3. Identity Service UI に移動し、新しい DSS URL `https://FQDN:port` を入力します。
4. DSS サービスを再起動します。
5. 新しい URL `https://FQDN:port` で DSS UI を開きます。
6. DSS UI の [DSS SERVER IP/Hostname] フィールドに新しい URL `https://FQDN` を設定します。
7. **Apply** ボタンをクリックします。

### Directory Sync 1.4 (Firebird) から Directory Sync v2x へのアップグレード: アップグレード時のデータベース移行

Directory Sync をアップグレードする場合、システムが Firebird エンジンを使用していることを検出すると、DSS 移行ウィザードに専用のチェックボックスが自動的に表示されます。別のデータベースタイプを使用している場合は移行は不要です。このガイドでは、OpenLM SLM 5.6 から v21 への移行がすでに実行されている前提です。

1. "Migrate data" チェックボックスをオンにします。ドロップダウンから使用するデータベースを選択し、**Next** をクリックします。

**![](/img/legacy/word-image-34440-15.png)**

2. インストールには空のデータベーススキーマが必要です。以下のスクリーンショットのように、Server 名、Database 名、User、Password を入力して **Next** をクリックします。*注: データベースタイプによって画面の項目が多少異なる場合があります。*

*![](/img/legacy/word-image-34440-16.png)*

3. インストール先フォルダを選択します。**Browse** をクリックして選択するか、デフォルト（推奨）を使用します。フォルダを選択したら **Next** をクリックします。

**![](/img/legacy/word-image-34440-17.png)**

4. DSS をインストールする準備ができました。デスクトップアイコンを作成したい場合はチェックし、**Install** をクリックします。

**![](/img/legacy/word-image-34440-18.png)**

5. インストール/移行が完了したら **Finish** をクリックします。

**![](/img/legacy/word-image-34440-19.png)**

6. DSS ページを開き、**Service Configuration** タブに移動します。ここで Server の設定詳細（v21 は v5.6 と異なります）を指定し、**Apply** をクリックします。

**![](/img/legacy/word-image-34440-20.png)**

***変更が正常に反映されたか確認するには、Easy Admin から DSS を開きます（Administration→Directory Synchronization Service）。***

7. [インストールガイド](./)に従って Directory Synchronization Agent のアップグレードを続けます。

### DSS 設定ツール

#### DB 設定

**外部データベースを DSS で使用する前に、** [**DSS system requirements**](https://www.openlm.jp/openlm-system-requirements/) **に従ってデータベースを作成し、以下の "DB Upgrade" 手順でスキーマを更新する必要があります。**

DSS がデータを保存するデータベースを設定します。

DSS は外部データベース（mysql / MySQL/MariaDB）で動作するように設定できます（要件を確認してください）。

![](/img/legacy/word-image-34440-21.png)

**DB provider** - データベースプロバイダを選択します。MariaDB、MySQL、Microsoft SQL Server（標準認証または Windows 認証）から選択できます。

**Server name** - 外部データベースサーバーの IP またはホスト名。

**Port** -（MySQL または MariaDB）データベースサーバーのリスニングポート。

**DB Name** - データベース名。

**User ID** -（MySQL、MariaDB、または SQL Server 認証）データベースユーザー名。

**Password** -（MySQL、MariaDB、または SQL Server 認証）データベースユーザーのパスワード。

**Test** - データベース接続をテストします。

**Apply** - 設定を保存します。

#### DB upgrade

このツールを使用すると、DSS データベースを最新スキーマにアップグレードできます。DSS スキーマで初期化されていない新規データベースを使用する場合に必要です。

アップグレードするには、使用中のデータベースタイプを選択し、DB Configuration タブでログイン/接続情報を入力して Upgrade をクリックし、ウィザードに従います。

## **使用方法**

### Agent Manager

Agent Manager タブでは、DSS によって管理されるすべての DSA を確認できます。

![](/img/legacy/word-image-34440-30.png)

#### 新しいエージェントの承認

DSS に報告するよう設定された新規 DSA は、運用開始前に承認が必要です。

手順:

1. **Agent Manager** タブをクリックします。

2. ステータスが "Pending approval" のエージェント行をダブルクリックします（または Edit Agent アイコンをクリック）。

![](/img/legacy/word-image-34440-31.png)

3. Approve Agent 画面で Status ドロップダウンから **Enabled** を選択し、**Approve** をクリックします。

![](/img/legacy/word-image-34440-32.png)

#### エージェントのプロパティを編集

1. 変更したいエージェントの行をダブルクリック（または **Edit Agent** アイコンをクリック）し、**Advanced Settings** をクリックします。

2. 必要な項目を変更します。各項目の意味は以下のとおりです。

![](/img/legacy/word-image-34440-33.png)

**Agent name** - エージェント名。既存のエージェント名と重複しない一意の名前が必要です。

**Description (optional)** - エージェントを識別するための任意の説明。

**Status** - 次のいずれかを設定できます:

- Enabled - エージェントが稼働し、DSS に同期ジョブを問い合わせて実行します。
- Suspended - このエージェントが実行するすべての同期が停止されます。Enabled に戻すと再開します。

**Agent request interval** - エージェントが DSS に同期ジョブを問い合わせる頻度（5〜600 秒）。

**Sync method** - 次のいずれかを設定できます:

- Parallel - 複数の同期を同時に並列実行します。
- Serial mode - FIFO（先入れ先出し）で同期を 1 件ずつ順番に実行します。

3. 完了したら **Save Changes** をクリックします。

#### エージェントのプロパティを一括編集

複数エージェントのプロパティを同時に変更する場合:

1. 変更したいエージェントのチェックボックスを選択します。

2. **Bulk Edit** をクリックします。

これで Bulk Editor ウィンドウが開きます。

![](/img/legacy/word-image-34440-34.png)

利用可能なプロパティは、上記のセクション 6.1.2 と同じです。

3. 完了したら **Save** をクリックして変更を適用します。

#### エージェントの削除

削除するエージェントのチェックボックスを選択し、**Delete** をクリックします。

![](/img/legacy/word-image-34440-35.png)

### Domain Manager

Domain Manager タブでは、OpenLM と同期するドメインディレクトリを設定します。

![](/img/legacy/word-image-34440-36.png)

#### 新しい同期ドメインの追加

1. **Add Domain** をクリックします。Add Domain 画面が開くので、以下の説明に従って設定します。

![](/img/legacy/word-image-34440-37.png)

**Domain type** - 同期する LDAP ドメインディレクトリの種類。現在は次から選択できます:

- Active Directory
- eDirectory
- ApacheDS
- AzureAD
- Google CDS

**Domain name** - ドメインコントローラのホスト名/IP。

**Port** - ドメインコントローラのポート。

**SSL** - ドメインコントローラへの接続が SSL 暗号化かどうかを切り替えるトグル。

**Username** - 管理者アカウントのユーザー名（読み取り権限が必要）。
サービスアカウントを推奨します。通常アカウントの場合、パスワード期限切れで同期が停止する可能性があります。

**Password** - ドメインコントローラユーザーのパスワード。

Azure の場合:

- Domain Name
- Client ID
- Client Secret
- Tenant ID

AzureAd 同期の詳細は [こちら](/pdfs/DS-Support-Azure-Direcory-.pdf) を参照してください。

Google CDS の詳細は [こちら](/pdfs/DSS-Support-Google-CDS.pdf) を参照してください。

Okta 連携の詳細は [こちら](/pdfs/Directory-Sync-Okta-support.pdf) を参照してください。

2. **Check Domain Connectivity** をクリックしてテストを実行します。接続テストを実行するエージェントの選択が求められます。処理には最大 2 分かかる場合があります。完了すると、ボタン下に成功または失敗のメッセージが表示されます。

3. **Save** をクリックしてドメイン設定を保存するか、**Save Domain & Add Sync** をクリックして設定を保存し、このドメインが選択済みの **Add Sync** 画面を開きます。

#### ドメインの削除

削除するドメインのチェックボックスを選択し、**Delete** をクリックします。

最終確認の警告ポップアップが表示されます:

![](/img/legacy/word-image-34440-38.png)

**注:** ドメインに関連する同期定義がある場合、それらも削除する必要があります。このチェックボックスをオンにしないと続行できません。

### Sync Manager

Sync Manager タブでは、OpenLM が同期するドメイン向けの同期定義を設定できます。Sync Manager はすべての同期設定へのアクセスを一元化します。

![](/img/legacy/word-image-34440-39.png)

#### 新しい同期定義の追加

同期定義を追加するには:

1. **Add Sync** をクリックします。

2. 次のとおり項目を入力します:

**Sync name** - 同期定義を識別するための任意のテキスト。一意（既存の同期定義名と重複しない）である必要があります。

**Status** - 同期を有効/無効に切り替えます。

##### Destination & Time タブ

**Agent** - この同期を実行するエージェントを選択します。

**Domain name** - 同期対象のドメインを選択します。Domain Manager タブで登録したドメインがドロップダウンに表示されます。

**Start node** - 同期を開始するノードの LDAP パスを入力します。大規模なディレクトリではツリー内のノードを指定することで検索範囲が絞られ、パフォーマンスが向上します。既定では、選択したドメインのルートに対応する値が自動入力されます。**Test** をクリックしてディレクトリ開始ノードを検証します（最大 2 分）。LDAP 接続文字列の形式が正しいことを確認してください。

**Example #1:** ドメインコントローラ 10.0.0.153 上の "testdev1domain.openlm.biz" ドメインで組織単位 "OU_AB" を選択

LDAP://10.0.0.153/OU=OU_AB,DC=testdev1domain,DC=openlm,DC=biz

**Example #2:** ドメインコントローラ server2008r2ldap.openlm.biz 上の "openlm.com" ドメインでセキュリティグループ "SecGroup" を選択

LDAP://server2008r2ldap.openlm.biz/CN=SecGroup,DC=openlm,DC=com

**Example #3:** "testdev1domain.openlm.biz" ドメインで、組織単位 "OU_AB" の下の組織単位 "OU_A" 配下にあるグループ "Group_AB1" を選択

LDAP://10.0.0.153/CN=Group_A2,OU=OU_A,OU=OU_AB,DC=testdev1domain,DC=openlm,DC=biz

正しいノードパスを見つけるには [LDAP Admin](http://www.ldapadmin.org/) などのツールを使用できます。ノードツリーを右クリックして "Copy dn to clipboard" を選択してください。

**Sync schedule** - 同期を実行するスケジュールを定義します:

- **By time** - 同期の曜日と開始時刻を選択し、**Add** をクリックしてスケジュールに追加します。複数の時刻を追加できます。
- **By interval** - 開始時刻（hh: mm）と同期の間隔（1〜720 時間の範囲で指定）を入力します。DSS が再起動された場合、開始時刻まで待機して同期をトリガーします。

##### Object タブ

![](/img/legacy/image-1.png)

![](/img/legacy/word-image-34440-41.png)

**Sync object type** - 同期するオブジェクトタイプを選択します:

- **Users** - ユーザーオブジェクトのみ同期します。ここで **Only users monitored by the OpenLM box** にチェックできます（説明は下記）。
- **Computers** - コンピュータオブジェクトのみ同期します。

*注: Azure AD では Users のみサポートされます。*

**Only users monitored by OpenLM**

このチェックボックスをオンにすると、同期実行時に OpenLM のユーザー名に一致するディレクトリユーザーのみが取り込まれ、同期されます。OpenLM システム内にライセンス活動の記録がないディレクトリユーザーを追加したくない場合に有用です。

**Technical note:** パフォーマンス上の理由から、監視対象ユーザーのリストは DSS にキャッシュされます。スケジュール同期がトリガーされると、DSS は前回 Server からリストを取得してからの経過時間を確認します（初回同期を除く）。この期間が **appsettings.json** の ActiveUsersRefreshIntervalHours パラメータより大きい場合、DSS は OpenLM SLM に問い合わせてユーザーリストを更新した後、更新済みリストで DSA を通じてディレクトリを照会します。期間が設定値より小さい場合、DSA はキャッシュからのユーザーリストでディレクトリを照会します。手動同期はこの条件を無視します。同期間隔中に監視対象の OpenLM ユーザーが追加/変更される可能性があり、より頻繁に同期を実行したい場合は、このパラメータを低く設定してください。

**Sync attribute** - ユーザー名同期のためのディレクトリ属性を選択または入力します。属性が使用中のディレクトリタイプに存在することを確認してください。"Sync attribute" は "Users" オブジェクトタイプでのみサポートされます。次から選択します:

- All Attributes
- Custom Attributes:  
  **cn** はすべての LDAP ディレクトリで使用される標準 "Common Name" 属性です。  
  **sAMAccountName**（例: "jdoe"）は Windows Server 2000 以前の Active Directory バージョンで使用されます。  
  **userPrincipalName**（例: "john.doe@company.com"）は Windows Server 2000 以降の Active Directory バージョンで使用されます。  

  **mail  
  givenName  
  sn  
  dispalyName  
  telephoneNumber  
  title  
  department  
  description  
  physicaldeliveryofficename  
  whenCreated  
  whenChanged  
  ou  
  mobile  
  co  
  c  
  countryName  
  id  
  jobtitle  
  mailnickname  
  surname  
  MobilePhone**

注: "**Custom selection of attributes**" を選択すると、選択した属性のみが LDAP から取得され、外部のサードパーティシステム（OpenLM SLM または Users and Groups サービス）に送信されます。

DSS が OpenLM SLM と連携している場合、OpenLM SLM は LDAP 同期の更新前にユーザーのプロパティをクリアするロジックを持っています（[Mobile Phone]、[Email]、[Country] を除く）。そのため DSS の同期設定で任意属性を無効にすると、同期後は空になります（[Mobile Phone]、[Email]、[Country] は変更されません）。

*注: Azure AD では UserPrincipalName のみサポートされます。*

**Membership filter** - フィルタなし（全オブジェクト）で同期するか、特定の Organizational Units (OU) または Security Groups に属するオブジェクトのみ同期するかを選択します。

*注: Azure AD では次の 2 つの選択肢があります*

1. *All objects*
2. *Only members of a group*

**Search depth** - 同期の深さを定義します。このオプションにより、同期処理を特定の階層レベルに制限できます:

- **0**（デフォルト） - ツリー全体のグループ階層を同期します。
- **1** - 開始ノードのグループのみ同期します。
- **2** - 開始ノードのグループと、その第 1 階層の子孫を同期します。
- **3** - 開始ノードと、その第 2 階層の子孫を同期します。
- 以降同様。

##### Group Rules タブ

グループの作成ルールを選択します:

**No groups** - グループ同期のデフォルト設定。このオプションでは、オブジェクトが属するグループはすべて無視され、すべてのオブジェクトがシステム既定の **OpenLM_Everyone** グループに割り当てられます。

**Flat** - すべてのオブジェクトが、管理者が指定したグループのメンバーになります。指定した同期ツリーで検出されたオブジェクトはすべて 1 つのグループに割り当てられ、他の階層構造は無視されます。

**Hierarchical** - LDAP の階層ノードツリーに従ってグループを作成します。次のオブジェクトクラスを含めるか選択できます:

- **Organizational Units (OUs)** - ディレクトリ内の OUs に対して同名のグループが作成され、その中のオブジェクトがメンバーになります。
- **Security Groups** - ディレクトリ内の Security Groups に対して同名のグループが作成され、その中のオブジェクトがメンバーになります。
- **Distribution groups** - ディレクトリ内の distribution groups に対して同名のグループが作成され、その中のオブジェクトがメンバーになります。
- **Customized & Unknown Object Classes** - OUs、Security Groups、DGs など標準ディレクトリクラス以外の未知/カスタムオブジェクトクラスに対して同名のグループが作成され、その中のオブジェクトがメンバーになります。

*注: Azure AD では Security Groups のみサポートされます。*

**Include start node** - 同期に開始ノードを含めるかどうかを指定します。

**Search depth** - 同期の深さを定義します。このオプションにより、同期処理を特定の階層レベルに制限できます:

- **0**（デフォルト） - ツリー全体のグループ階層を同期します。
- **1** - 開始ノードのグループのみ同期します。
- **2** - 開始ノードのグループと、その第 1 階層の子孫を同期します。
- **3** - 開始ノードと、その第 2 階層の子孫を同期します。
- 以降同様。

![](/img/legacy/word-image-34440-42.png)

**Entity attribute** - メンバーが持つ特定の属性に基づいてグループを作成します。同期したい属性（例: "Division"、"Employee ID"、"Initials"、"Department" など）をドロップダウンから選択、または入力します。各固有の属性値ごとに新しい OpenLM グループが作成され、同じ属性を持つユーザー/コンピュータがそのグループに追加されます。

**Regular expression to specify the sub-level of the selected attribute (optional)** - Regex に一致する属性での同期を可能にします。例: "Country" 属性を選択し "USA" を入力すると、"Country" 属性が "USA" のオブジェクトのみが同期されます。

##### Set as default group checkbox

レポート用途では、デフォルトグループはユーザーのライセンス使用時間を集計するグループとみなされます。既定では、手動で作成または同期されたすべてのユーザーはシステム既定の **OpenLM_Everyone** グループに割り当てられます。このチェックボックスをオンにすると挙動を上書きできます:

- **Flat** および **Entity Attribute** 同期ルールでは、入力または選択したグループがデフォルトグループになります。
- **Hierarchical** 同期ルールでは、スキャン中に最初に見つかったグループがデフォルトグループになります（例: JohnDoe が A, B, C に属する場合、デフォルトグループは A）。

"**Set as default group**" がチェックされている間、オブジェクトのデフォルトグループは同期のたびに設定・上書きされます。

**ApacheDS に関する注意:**

*ApacheDs のグループ実装に特有のルールがあるため、DSS は ApacheDs グループを他のディレクトリタイプとは異なる方法で同期します。ApacheDs のグループは通常、objectClass = groupOfNames または groupOfUniqueNames として指定されます。これらの場合、子オブジェクト（メンバー）はそれぞれ member または uniqueMember になります。これらの関係に基づいてグループメンバーシップが定義されます。したがって、groupOfNames には member、groupOfUniqueNames には uniqueMember が含まれている必要があります。以下の例を参照してください:*

*![](/img/legacy/word-image-34440-43.png)*

対応表の詳細は [こちら](/pdfs/Mappings-between-Ldap-attributes-and-OpenLM-User-attributes.pdf) を参照してください。

6.3.2. 手動で同期を実行

次のアイコンをクリックすると、選択した 1 つ以上の同期定義を手動で実行します。

![](/img/legacy/word-image-34440-44.png)

トリガー後は、進行状況を示すアニメーションアイコンが表示されます。アイコンにカーソルを合わせると現在の状態が表示されます。

![](/img/legacy/word-image-34440-45.png)

#### エンティティ関係データのリセット

次のアイコンをクリックすると、選択した同期定義によって生成されたすべての関係データがクリアされます。以前に設定した "ignore" フラグ（6.4.1 参照）も含まれます。実際のユーザーデータには影響しません。

![](/img/legacy/word-image-34440-46.png)

#### Stop Sync ボタン

"Update Openlm DB" フェーズで同期が停止することがあります。その場合は "Stop Sync" ボタンで同期をキャンセルし、再度実行できるようにします。

#### 同期定義の削除

削除する同期定義のチェックボックスを選択し、**Delete** をクリックします。

削除前に最終確認の警告ポップアップが表示されます。

![](/img/legacy/word-image-34440-47.png)

同期が実行中の場合は削除できません。

### Entities

Entities タブでは、DSS 同期で作成されたエンティティを確認し、個別の ignore フラグを設定できます。列には、DSS データベース内のエンティティ ID、エンティティ名、エンティティタイプ、最後に同期した定義、最終同期時刻が表示されます。フィルタを使って、どの同期でどのエンティティが変更されたかを確認したり、特定のエンティティを検索したりできます。また、列のカスタマイズ、表の印刷/エクスポート、1 ページあたりの表示件数の設定も可能です:

![](/img/legacy/word-image-34440-48.png)

![](/img/legacy/word-image-34440-49.png)

#### すべての同期からエンティティを除外

特定のエンティティに対して **Ignore** にチェックし **Save** をクリックすると、そのエンティティはすべての同期定義から除外されます。ディレクトリ側の更新があっても、OpenLM データベースには反映されません。

#### エンティティの手動同期

次のアイコンをクリックすると、特定のエンティティの同期が手動で実行されます。この操作は、以前に設定された "ignore" フラグを上書きします。

![](/img/legacy/word-image-34440-50.png)

#### エンティティ関係の表示

特定のエンティティの次のアイコンをクリックすると Relations タブが開き、そのエンティティが持つ関係が表示されます。

![](/img/legacy/word-image-34440-51.png)

### Relations

Relations タブでは、DSS データベース内でエンティティが持つすべての関係を確認できます。ディレクトリ照会を行ったエージェント、所属ドメイン、関連する同期定義、エンティティ名、親名（存在する場合）、最終同期時刻が含まれます。フィルタを使って、どの関係がいつ更新されたかを確認できます。

"Ignore" チェックボックスは、その同期に関連するエンティティ単位で適用されます。列のカスタマイズ、表の印刷/エクスポート、表示件数の設定も可能です:

![](/img/legacy/word-image-34440-52.png)

![](/img/legacy/word-image-34440-53.png)

リンクをクリックすると、該当タブ（agent、domain、sync、または entity）へ移動して詳細情報を表示します。

#### 特定の同期からエンティティを除外

特定の Relation エンティティで **Ignore** にチェックし **Save** をクリックすると、"Sync Name" の同期定義からそのエンティティが除外されます。ディレクトリ側の更新があっても、この同期定義では OpenLM データベースに反映されません。
