---
title: "OpenLM Broker の設定"
sidebar_position: 4
---
## **はじめに**

OpenLM Broker は、組織の用途や環境に合わせて設定する必要があり、Broker と Server 間の最適な通信に影響します。設定の大部分は OpenLM Broker Configuration Tool で完結します（Java と一部の特殊設定を除く）。本ドキュメントは Broker の設定のみを扱います。Server の設定、Broker のインストール、Broker の利用については、専用の [OpenLM Broker インストール](./index.md) を参照してください。

OpenLM Broker ツールは、ライセンスマネージャーサーバーと直接通信して現在のライセンスサーバー状態を取得する、オプションの Java ソフトウェアモジュールです。Java コンポーネントのため、Java をサポートする任意のプラットフォームで実行できます。

OpenLM Broker の利点は以下のとおりです（追加情報は [ライセンスマネジャーリスト](https://www.openlm.jp/license-manager-capabilities/) を参照）:

- ライセンスマネージャーからライセンス使用状況を取得するクエリを送信する。
- 通信障害に備えて送信をバッファリングする。
- ログファイル情報を監視する（ライセンス拒否、正確な使用ログ、オフラインライセンスなど）。
- OpenLM EasyAdmin から FlexLM Options ファイルを保守する。
- ライセンスファイル情報を監視する（ライセンスパッケージング、ライセンスプール、Named licenses、DUP_GROUP）。
- リモートでファイルを取得する。
- ライセンスファイルをライセンスサーバーへアップロードする。
- ライセンスサーバーの Start / Stop / Reread を実行する。

OpenLM Broker をライセンスマネージャーサーバーにインストールしたら、次は OpenLM SLM(Server)、ライセンスサーバーへのアクセス、およびサーバーファイルへのアクセスを設定します。

設定を開くには、**[Start] > [OpenLM] > [OpenLM Broker]** を選択します（既定パス: C:ProgramDataMicrosoftWindowsStart MenuProgramsOpenLMOpenLM Broker）。OpenLM Broker Configuration Tool が起動し（**図 1**）、OpenLM Broker、OpenLM SLM、ライセンスサーバーの設定が行えます。

**![スクリーンショット: Introduction](/img/legacy/word-image-220.png)  
図 1: インストール直後の OpenLM Broker Configuration Tool**

*注: OpenLM Broker は、すでにマシンにインストール済みのライセンスマネージャー（例: FlexLM、DSLS、RMS）の設定を自動検出します。初期設定は環境によって異なる場合があります。Options ファイルの存在と場所は自動設定されないため、名前とパスは手動で入力する必要があります。*

## **OpenLM Broker の設定**

設定項目には OpenLM SLM の追加、ライセンスサーバーの追加が含まれます。以下のセクションでそれぞれ説明します。

## OpenLM SLM の追加

OpenLM SLM は OpenLM システムのハブです。周辺の OpenLM コンポーネント（OpenLM Broker や OpenLM Workstation Agent など）からの情報を統合します。設定ツールを終了してセットアップを完了するには、少なくとも 1 台のサーバーを追加する必要があります。

1. OpenLM Broker Configuration Tool を開きます（**Start > OpenLM > OpenLM Broker Configuration Tool**）。

2. OpenLM Broker Configuration Tool 画面左のメニューで "OpenLM SLMs" をクリックします。

3. **[+Add OpenLM SLM]** ボタンをクリックします。OpenLM SLM の接続パネルが画面右側に表示され、既定値が入力されています（**図 2**）。

**![スクリーンショット: Add an OpenLM SLM](/img/legacy/word-image-221.png)  
図 2: 接続パネルが表示された Configuration Tool**

4. OpenLM SLM のパラメータを環境に合わせて変更します。項目 a と b はサーバー名とポート番号が一致していないと接続確認が成功しません。

a. *（任意）* **OpenLM SLM** の名前を変更します。既定では "localhost" です。ローカルではない場合、正しいサーバー名または IP アドレスに変更してください。

b. *（任意）* Broker の OpenLM **Port** を変更します。既定は "7016" です。*注: これは "OpenLM SLM Configuration" ツールの "Port Settings" タブにある "License Managers Reporting Port" と同じ番号です。*

c. *（任意）* **Sending Timeout** を変更します。Broker の送信タイムアウトで、既定は 45 秒です。

d. *（任意）* **Activate Buffering** を変更します。既定は有効（チェック済み）で、OpenLM SLM に接続できないときに未送信データを保存します。接続が回復するとバッファされたメッセージを送信します。

e. *（任意）* **Buffer File Size** を変更します。Activate Buffering が有効な場合のみ設定可能です。1 つのバッファファイルに保存するメッセージ数の上限を指定します。既定値は 3,072 kb です。*注: ファイルシステムのクリーンアップはユーザーの責任で行ってください。*

*（任意）* **SSL** チェックボックスをオンにすると、OpenLM SLM へ SSL のセキュア通信でデータを送信します。

f. *（任意）* **[Clean Buffer]** ボタンをクリックします。確認画面が表示されます（**図 3**）。**[Yes]** をクリックするとデータを削除し、**[No]** をクリックするとバッファファイル内のデータを保持したまま閉じます。*注: 必要なデータを失わないよう注意して使用してください。*

**![スクリーンショット 2: Add an OpenLM SLM](/img/legacy/word-image-222.png)  
図 3: Clean Buffer の確認画面**

g. **[Check Connectivity to OpenLM SLM]** ボタンをクリックします。接続確認が行われ、結果は以下のいずれかになります（i, ii, iii）。

i. OpenLM SLM 名または Port を変更している場合、変更が適用されます。バッファをクリアするリマインダーが表示され（**図 4**）、続いて保存確認画面が表示されます（**図 5**）。その後 **Step #4.g.ii** または **Step #4.g.iii** に進みます。

**![スクリーンショット 3: Add an OpenLM SLM](/img/legacy/word-image-223.png)  
図 4: Clean Buffer リマインダー**

**![スクリーンショット 4: Add an OpenLM SLM](/img/legacy/word-image-224.png)  
図 5: 変更内容の確認画面**

ii. Broker が停止している場合、エラー画面が表示されます（**図 6**）。

**![スクリーンショット 5: Add an OpenLM SLM](/img/legacy/word-image-225.png)  
図 6: Broker 接続エラー画面**

エラーが表示されたら **[OK]** で閉じ、**[Restart Broker]** をクリックします。Broker サービスが再起動したことを示す成功画面が表示されます（**図 7**）。**[OK]** をクリックして **Step #4.g** を再実行してください。*注: Broker サービスの再起動に失敗する場合は、OpenLM Broker のログ（`<path>\OpenLM Broker\logs`）を確認してください。問題が不明または解決できない場合は OpenLM サポート（[support@openlm.com](mailto:support@openlm.com)）に連絡してください。*

**![スクリーンショット 6: Add an OpenLM SLM](/img/legacy/word-image-226.png)  
図 7: Broker 再起動成功画面**

iii. カウントダウン画面が表示され（**図 8**）、成功（**図 9**）または接続失敗（**図 10**）が表示されます。成功した場合は **Step #5** に進みます。失敗した場合は OpenLM SLM が稼働しているか確認し、**Step #4.g** を再実行してください。

**![スクリーンショット 7: Add an OpenLM SLM](/img/legacy/word-image-227.png)  
図 8: カウントダウン画面**  
![スクリーンショット 8: Add an OpenLM SLM](/img/legacy/word-image-228.png)  
**図 9: 接続成功**

**![スクリーンショット 9: Add an OpenLM SLM](/img/legacy/word-image-229.png)  
図 10: 接続失敗**

*h. （任意）* **[Detect]** ボタンをクリックするとライセンスマネージャーを自動検出します。新しい設定を検索します。*注: 詳細は本ドキュメント後半の Detecting Broker Configuration を参照してください。*

5. **[Apply]** をクリックして入力内容を保存します。

6. **[Restart Broker]** ボタンをクリックします。更新した設定で OpenLM Broker サービスを再起動します。

OpenLM Broker と OpenLM SLM の接続はこれで完了です。特定モジュールの追加統合については各ドキュメントを参照してください。

## ライセンスサーバーの追加

ライセンスサーバーの追加は、サーバーの追加とその設定で構成されます。

1. OpenLM Broker Configuration Tool 画面左のナビゲーションペインでサーバー名をクリックします（**図 11**）。右側に License Manager パネルが表示されます。ライセンスサーバーの Host Name / IP はローカルマシンを基に既定値が入ります。*注: Host Name を確認するには、コマンドプロンプトで* **ipconfig/all** *を実行します。*

![スクリーンショット: Add a license server](/img/legacy/word-image-230.png)  
**図 11: License Server を選択した License Manager パネル**

2. ナビゲーションパネル上部の **[+Add Port]** をクリックします。新しいポートノードが追加され、Port Number と Vendor の更新を促す **Add New Port** ダイアログが表示されます（**図 12**）。

![スクリーンショット 2: Add a license server](/img/legacy/word-image-231.png)  
**図 12: Add New Port ダイアログ**

3. **[OK]** をクリックして Add New Port ダイアログを閉じます。License Manager Port パネルに Port Number、License Manager Type のドロップダウン、"Advanced" リンクが表示されます（**図 13**）。

**![スクリーンショット 3: Add a license server](/img/legacy/word-image-232.png)  
図 13: License Manager Port パネルが表示された Configuration Tool**

4. 必要に応じて **Port Number** を変更します。既定値は 27000 です。

5. **License Manager Type** のドロップダウンから管理対象のライセンス種別（例: FlexLM）を選択します。

6. **[Apply]** をクリックして変更を適用します。変更がある場合は確認画面が表示されます（**図 14**）。

**![スクリーンショット 4: Add a license server](/img/legacy/word-image-233.png)****図 14: Update Commands の確認画面**

7. 確認画面で **[Yes]** をクリックするとデータが確定します。保存完了画面が表示されます（**図 15**）。

**![スクリーンショット 5: Add a license server](/img/legacy/word-image-234.png)  
図 15: License Manager の変更保存成功画面**

8. 保存成功画面の **[OK]** をクリックして License Port Manager パネルに戻ります。

9. 各ノードのパスが正しいか確認します。**Step #9.a** から **Step #9.c** を実行します。パスの設定方法や失敗時の対応は本ドキュメント後半の [License Serveコマンドパス](#ライセンスサーバーのコマンドパス) を参照してください。

a. **Commands** ノード左の **[+]** をクリックして展開します（**図 16**）。

**![スクリーンショット 6: Add a license server](/img/legacy/word-image-235.png)  
図 16: Commands ノードの展開**

b. ノードをクリックすると、右側に該当する設定パネルが表示されます。

c. Command Line 欄の下にある **[Execute]** ボタンをクリックします。"Test execution of the status command line" 画面に成功または失敗のメッセージが表示されます。

*10. （任意）* **Step #2** から **Step #9** を繰り返して追加のライセンスサーバーポートを作成します。*注: ポート番号の重複はできません。*

11. **[Restart Broker]** をクリックして OpenLM Broker を再起動します。

これでライセンスサーバーの基本設定は完了です。

## Detecting Broker Configuration

Detect 機能はライセンスマネージャー情報を自動検出し、OpenLM Broker の設定を簡素化します。検出内容に応じて新しいポート情報（コマンドやパスなど）が追加されます。新規セットアップや新しいライセンスサーバー情報の検出に有用です。既存情報は保持され、編集済みのポートは既定値で上書きされません。

1. OpenLM Broker Configuration Tool 画面下部の **[Detect]** をクリックします。検出された設定で Command のオプションが入力されるか、License Manager Type に応じた既定値が使用されます。設定されたコマンドに対応するノードがナビゲーションツリーに追加されます。

2. 追加された設定内容が正しいか確認します。

## ライセンスファイルの読み取り

OpenLM は、ライセンス使用状況レコードまたは対応するライセンスマネージャー（例: FlexLM）のライセンスファイルからライセンス情報を取得できます。ライセンスファイルを読み取り詳細情報を取り込むには、OpenLM SLM と OpenLM Broker の両方でライセンスファイルとの関連付けが必要です。

1. 画面左のナビゲーションで設定対象のポートをクリックし、OpenLM Broker Configuration Tool の License Manager Port パネルに移動します。

2. **Advanced>>** リンクをクリックします。パネルに License Information セクションが表示されます（**図 17**）。*注: Advanced 部分で利用できる設定は選択した License Manager Type によって異なります。たとえば LUM では "Cluster" チェックボックスが表示され、Broker がクラスター専用コマンドを実行できるようになります。すべての機能がすべての License Manager Type で利用できるわけではありません。Advanced 設定がない場合は "License Information not supported" と表示されます。*

**![スクリーンショット: Read license files](/img/legacy/word-image-236.png)  
図 17: Advanced オプションを表示した License Manager Port 画面**

3. 監視対象のライセンスファイルを指定します。自動取得（a）、手動指定（b）、内容表示（c）、順序の並べ替え（d）が可能です。最後に監視を有効化（e）します。

a. ライセンスファイルパスの自動検出。FlexLM など一部のライセンスマネージャーは起動時に自動的にパスを取得します。

b. ライセンスファイルパスの手動指定。

i. **Set Path Manually** チェックボックスをオンにします。右側の **[Add]** ボタンが有効になります。

ii. **[Add]** をクリックするとファイルブラウザが開きます。

iii. ファイルブラウザでライセンスファイルの場所に移動し、対象ファイルを選択します。

iv. **[Open]** をクリックします。Path フィールドにライセンスファイルのパスが入力されます（**図 18**）。

**![スクリーンショット 2: Read license files](/img/legacy/word-image-237.png)  
図 18: [Add] により Path フィールドが入力された状態**

*v. （任意）* 追加ファイルを指定する場合は **Step #2.b.ii** から **Step #2.b.iv** を繰り返します。追加ファイルは Path フィールドの区切り文字で連結されます。*注: 区切り文字はベンダーや OS により異なります。多くの場合、Windows はセミコロン **(;)**、Linux / Unix はコロン **(:)** です。*

vi. **[Apply]** をクリックして変更を保存します。コマンドノードの更新確認画面が表示されます（**図 19**）。

**![スクリーンショット 3: Read license files](/img/legacy/word-image-238.png)  
図 19: Update Commands の確認画面**

vii. **[Yes]** をクリックするとコマンドツリーの他ノードにも変更が反映されます。**[No]** をクリックすると、コマンドノードは既存設定のままです。broker.xml への保存確認画面が表示されます（**図 20**）。

**![スクリーンショット 4: Read license files](/img/legacy/word-image-239.png)  
図 20: 保存確認画面**

*c. （任意）* **[Show]** をクリックするとライセンスファイルの内容を表示します（**図 21**）。読み取り専用で表示され、ファイル内容を確認できます。複数のライセンスファイルがある場合は個別にウィンドウが開きます。

**![スクリーンショット 5: Read license files](/img/legacy/word-image-240.png)  
図 21: ファイル内容の表示**

*d. （任意）* ライセンスの並び順を並べ替えます。ライセンスファイルは OpenLM SLM の複数プール監視の一環としてプール順に並びます。**Sort** オプションで並び順を上書きできます。

i. **Allow to Sort License File** チェックボックスをオンにして並べ替えを有効にします。

ii. **[Sort]** をクリックして Asset Info Order 画面を開きます。

iii. 項目を選択し、**[Move Up]** / **[Move Down]** で順序を調整します（**図 22**）。

**![スクリーンショット 6: Read license files](/img/legacy/word-image-241.png)****図 22: Asset Info Order 画面**

iv. **[Apply]** をクリックして変更を保存し、Asset Info Order 画面を閉じます。

e. ライセンスファイル監視を開始します。

i. **Watch License File** をチェックします。Watch Interval の値が有効になります。

ii. Watch Interval を必要に応じて設定します（既定は 300 秒）。数値入力または矢印で調整できます。指定間隔でライセンスファイルをチェックし、変更が見つかると Broker が新しいライセンス情報を OpenLM SLM に送信します。

f. **[Apply]** をクリックして変更を保存します。

g. **[Restart Broker]** をクリックして OpenLM Broker を再起動します。

## *ライセンスサーバーのコマンドパス*

Commands は、プロセスの開始/停止、データの照会、サーバーステータスの照会などを行います。コマンドはライセンスマネージャー固有で、パスはサーバー/ポート単位、またはグローバルに設定できます。通常は自動検出されますが、手動設定が必要な場合があります。以下は手動設定の手順です。

*注: インストール時に一部のパスは自動検出されます。その他のライセンスマネージャーのコマンドパスは既定で C:Program FilesOpenLMOpenLM Brokertools に設定されています。すべてのコマンドがすべてのライセンスマネージャーで利用できるわけではありません。*

1. 設定対象のポートノード左の **[+]** をクリックして展開します（**図 23**）。追加の設定ノードが表示されます。

**![スクリーンショット: *License server command paths*](/img/legacy/word-image-242.png)  
図 23: ポートノードを展開した OpenLM Broker Configuration Tool**

2. 展開したポート配下の **Commands** ノードをクリックします。右側にコマンド定義パネルが表示されます。

*3. （任意）* Commands パネルで Windows Service 設定を行います。**Use Service** は既定で有効です。**Service Name** は適切であれば既定値が表示されます。*注: 自動検出が失敗する場合は Windows Services で確認できます。* 有効な場合は Start/Stop に **NET START / NET STOP** が使用されます。無効にすると FlexLM 固有の **LMGRD / LMUTIL DOWN** が使用されます。

4. ナビゲーションツリーの各ノードをクリックし、パスを確認します。Command Line のパスを確認するには **[Execute]** をクリックします。パスが正しければ成功画面（**図 24**）が表示され、エラーがある場合はエラー内容が表示されます（**図 25**）。設定可能なコマンドは表 1 を参照してください。設定が正しければ **Step #5** へ進んでください。

**![スクリーンショット 2: *License server command paths*](/img/legacy/word-image-243.png)  
図 24: Execute 成功画面（汎用）**

**![スクリーンショット 3: *License server command paths*](/img/legacy/word-image-244.png)  
図 25: Execute エラー画面**

|  |  |
| --- | --- |
| **Command Node** | **Description** |
| **status** | License Server の状態（Up または idle）を照会します。 |
| **data_inquiry** | ライセンス使用情報を照会し、OpenLM Broker が OpenLM SLM に転送します。 |
| **start** | ライセンスマネージャーサーバーを起動します。 |
| **stop** | ライセンスマネージャーサーバーを停止します。 |
| **reread** | 編集された Option または License ファイルを再読み取りさせ、新しい情報を反映します。 |
| **denial** | ライセンス拒否に関するデータを返します。 |
| **remove_license** | ライセンスセッションを終了するために使用します。 |

**表 1: 設定可能なコマンド**

*5. （任意）* パスが誤っている場合は、手動更新（a）または **Update** 機能（b）で修正できます。

a. コマンドを手動で更新する。

i. ナビゲーションツリーで対象コマンドをクリックします。Command Definition 画面に情報が表示されます。

ii. Command Line フィールドでパスを直接編集します。

iii. **[Execute]** をクリックして動作確認を行います。成功/エラーメッセージが表示されます。エラーがある場合は Command Line を修正して再試行します。

iv. **[Apply]** をクリックして変更を保存します（**図 26**）。

**![スクリーンショット 4: *License server command paths*](/img/legacy/word-image-245.png)  
図 26: [Apply] 後のコマンド更新確認画面**

v. **[OK]** をクリックして確認画面を閉じます。

*vi. （任意）* **Step #4.a.i** から **Step #4.a.iv** を繰り返して他のコマンドを設定します。

vii. **[Restart Broker]** をクリックして新しい設定を適用します。再起動成功画面が表示されます（**図 27**）。

**![スクリーンショット 5: *License server command paths*](/img/legacy/word-image-246.png)  
図 27: Broker 再起動確認画面**

b. Command ノード配下のすべてのコマンドパスを更新する。

i. コマンドが配置されている Command ノードをクリックします。右側に Commands パネルが表示されます。

ii. **Path** フィールド右側の **[...]** ボタンで実行ファイルのパスを参照するか、直接入力します。

iii. **[Update]** をクリックします。手動で変更されていないパスがすべて更新され、成功画面が表示されます（**図 28**）。

**![スクリーンショット 6: *License server command paths*](/img/legacy/word-image-247.png)  
図 28: コマンド更新確認画面**

iv. **[Apply]** をクリックして変更を保存します。確認画面が表示されます（**図 29**）。

**![スクリーンショット 7: *License server command paths*](/img/legacy/word-image-248.png)  
図 29: [Apply] 後のコマンド更新確認画面**

v. **[OK]** をクリックして確認画面を閉じます。

vi. **[Restart Broker]** をクリックして新しい設定を適用します。再起動成功画面が表示されます（**図 30**）。

**![スクリーンショット 8: *License server command paths*](/img/legacy/word-image-249.png)  
図 30: Broker 再起動確認画面**

## ライセンスサーバーベンダー

ナビゲーションツリーの Vendors ノードでは、ベンダー固有のライセンスファイルやオプションファイルの扱いを定義します。Options ファイルの詳細は [Options File 管理](../options-files/options-file-management.md) を参照してください。

1. OpenLM Broker Configuration Tool のナビゲーションパネルで、ベンダーを追加するポートノード左の **[+]** をクリックして展開します。

2. 展開したポート配下の **Vendors** ノード左の **[+]** をクリックします。Vendor Definition パネルが画面右側に表示されます。

3. Vendors ノードの下に "Vendor Name to Be Filled" というノードが表示されます。*注: ノードが表示されない場合は、Vendors ノードを選択した状態でナビゲーションペイン上部の* **[+Add Vendor]** *ボタンをクリックして追加できます。*

4. "Vendor Name to Be Filled" をクリックすると、Vendor Definition パネルに追加フィールドが表示されます（**図 31**）。

**![スクリーンショット: License server vendors](/img/legacy/word-image-250.png)  
図 31: Vendor Name to Be Filled ノードが選択され、追加フィールドが表示された状態**

5. **Vendor Name** フィールドにベンダー名を入力します。ベンダー名は、ベンダーが提供する正確な名前（例: ARCGIS、adskflex、ptc_d、MLM、ugslmd）を入力してください。FlexLM の場合、このフィールドは補助的で、実際の名前は action line から読み取られます。それ以外のライセンスマネージャーでは正確な名前が必要です。入力された名前はツリーノードに表示され、ログファイル定義にも使用されます（[License Serverログファイル](#ライセンスサーバーのログファイル) を参照）。*注: ベンダー名は Broker の data_inquiry コマンド実行結果や EasyAdmin の Management → Licenses 画面で確認できます。*

> - **RLM と LMX では Licenses 画面に表示される名前と完全一致させる必要があります。**
> - **DSLS のベンダー名は "Dassault Systemes" と入力してください。**

*6. （任意）* **Option File Description** に説明を入力します。任意のメモ用フィールドです。

7. Option File Path の右にある **[...]** ボタンをクリックし、ベンダーのオプションファイルを選択します。フルパス（ファイル名を含む）を指定してください。

8. **"Advanced>>"** をクリックして、パネル下部に Advanced オプションを表示します（未表示の場合）。

9. **Watch Option File** をチェックして、オプションファイルの変更検出を有効にします。

10. *（任意）* **Watch Interval** を調整します。オプションファイルのチェック間隔を決定します。*注: 最良のパフォーマンスのため既定値 600 秒の使用を推奨します。*

11. **[Apply]** をクリックして Vendor Definition パネルの変更を保存します。確認画面が表示されます（**図 32**）。

**![スクリーンショット 2: License server vendors](/img/legacy/word-image-251.png)  
図 32: [Apply] 後のコマンド更新確認画面**

12. **[Restart Broker]** をクリックして新しい設定を適用します。再起動成功画面が表示されます（**図 33**）。

**![スクリーンショット 3: License server vendors](/img/legacy/word-image-252.png)  
図 33: Broker 再起動確認画面**

## ライセンスサーバーのログファイル

ライセンスマネージャーが生成するログファイルを OpenLM Broker が読み取れるように設定します。OpenLM Broker はデータを OpenLM サーバーへ転送し、ライセンス使用状況の分析に利用されます。

1. OpenLM Broker Configuration Tool のナビゲーションパネルで、設定対象のポートノード左の **[+]** をクリックして展開します。

2. **Log Files** ノードをクリックします。Log File Definition パネルが表示され、ナビゲーションパネル上部に **[+Add Log File]** ボタンが表示されます（**図 34**）。

**![スクリーンショット: License server log files](/img/legacy/word-image-253.png)  
図 34: Log Files ノードの選択**

3. **[+ Add Log File]** をクリックします。Log Files ノードの下に新しいノードが追加され、Log File Definition パネルに設定用フィールドが表示されます。

4. **Type** ドロップダウンからログファイル種別を選択します。ライセンスマネージャーの種類に応じて選択肢が変わります。例: FlexLM は **"FlexLM Debug Log File"**、LMX は **"LMX Debug Log"**。該当がない場合は **"Other"** を選択します。

5. **Name (Descriptive)** フィールドにログファイル名を入力します。任意のテキストで、ナビゲーションツリーのノード名として使用されます。

6. Path フィールド右側の **[...]** ボタンをクリックしてログファイルを選択します。フルパス（ファイル名を含む）を指定します。

*7.* **Vendor** ドロップダウンからベンダーを選択します。ベンダーは Vendor ノードで入力したエントリから自動的に取得されます。RLM、LMX、DSLS は名前が完全一致していることを確認してください（[License Server ベンダー](#ライセンスサーバーベンダー) の Step 5 を参照）。

*8. （任意）* **"Advanced>>"** をクリックしてパネル下部に Advanced オプションを表示します（未表示の場合）。*注: パフォーマンス問題を避けるため、既定値のままにすることを推奨します。*

*9. （任意）* **Set Data Size Limit** を調整します。1 回の読み取りでログファイルから読み込むデータ量（KB）を指定します。

10. **Watch Files by Pattern** をオンにします。ログファイル名が変わる場合（例: タイムスタンプ付与）でも追跡できます。*注: DSLS クライアントでは必須です。*

11. **[Apply]** をクリックして変更を保存します。確認画面が表示されます（**図 35**）。

**![スクリーンショット 2: License server log files](/img/legacy/word-image-254.png)  
図 35: [Apply] 後のコマンド更新確認画面**

12. **[Restart Broker]** をクリックして新しい設定を適用します。再起動成功画面が表示されます（**図 36**）。

**![スクリーンショット 3: License server log files](/img/legacy/word-image-255.png)  
図 36: Broker 再起動確認画面**

## Advanced settings

Advanced settings では、一般パラメータや機能を設定します。Broker Service と Broker Configuration のログレベル（A）を分けて設定できるほか、Reset（B）や Recording（C）も含まれます。

### A. OpenLM Broker のログレベル*

Broker Service と Broker Configuration のログレベルは Advanced Settings パネルで設定します。

1. OpenLM Broker Configuration Tool のナビゲーションパネルで **Advanced Settings** ノードをクリックし、Advanced Settings パネルを表示します（**図 37**）。

**![スクリーンショット: A. OpenLM Broker log levels*](/img/legacy/word-image-256.png)  
図 37: Advanced Settings を表示した Broker Configuration Tool**

*2. （任意）* ドロップダウンからログレベルを選択します。**表 3** を参照してください。*注: 詳細なログを有効にするとシステムパフォーマンスに影響する可能性があります。*

|  |  |
| --- | --- |
| **Log Level** | **Description** |
| **ALL** | 最も詳細なレベルで、すべてのデータトランザクション情報を含みます。 |
| **DEBUG** | イベント分析に役立つ詳細なトランザクション情報を記録します。 |
| **WARN** | 注意が必要な予期しないイベントを記録します（エラーや障害には該当しないが診断に有用）。 |
| **ERROR** | 回復不能な挙動やデータ損失を示すエラー/失敗を記録します。 |
| **Table 3: Log level listing with descriptions.** | |

3. **[Apply]** をクリックして変更を保存します。確認画面が表示されます（**図 38**）。

**![スクリーンショット 2: A. OpenLM Broker log levels*](/img/legacy/word-image-257.png)  
図 38: [Apply] 後のコマンド更新確認画面**

4. **[Restart Broker]** をクリックして新しい設定を適用します。再起動成功画面が表示されます（**図 39**）。

**![スクリーンショット 3: A. OpenLM Broker log levels*](/img/legacy/word-image-258.png)  
図 39: Broker 再起動確認画面**

### B. Reset

Reset は OpenLM Broker の設定をクリアするための機能です。影響範囲が大きいため、実行前に以下の注意点（Reset パネルにも記載）を確認してください。

- Reset はすべての License Server と Port 定義を削除します。手動で設定したポートは失われます。
- Reset は個別ポート削除のための機能ではありません。*注: 特定ポートやライセンスサーバーを削除するには、該当ノードを選択し、ナビゲーションツリー上部の* **[Delete]** *をクリックします。*
- Reset は追加ポートの検出には使用しません。カスタム設定が消えてしまいます。*注: 追加ポートの自動設定には* **[Detect]** *を使用します。詳しくは* [Detecting Broker Configuration](#detecting-broker-configuration) *を参照してください。*
- Reset 前に OpenLM Broker の設定ファイルをバックアップします。バックアップファイル名は broker_YYYY-MM-DD_HH-MM-SS.xml です。復元するには、現在の broker.xml をリネームした後にバックアップファイル名を broker.xml に変更してください。
- Reset 後は自動検出で既定値が適用されます。
- OpenLM SLMs ノードには影響しません。
- Advanced Settings には影響しません。

注意事項を理解したうえで、以下の手順でリセットできます。

1. **Reset** ノードをクリックし、Reset パネルを表示します。

2. **[Reset]** をクリックします。リセット確認画面が表示されます（**図 40**）。

**![スクリーンショット: B. Reset](/img/legacy/word-image-259.png)****図 40: Reset 確認画面**

3. **[Yes]** をクリックして現在の設定の削除を確定します。削除後、既存ライセンスサーバーの検出画面が表示されます（**図 41**）。

**![スクリーンショット 2: B. Reset](/img/legacy/word-image-260.png)  
図 41: 既存ライセンスサーバーの検出**

4. **[Restart Broker]** をクリックして新しい設定を適用します。再起動成功画面が表示されます（**図 42**）。

**![スクリーンショット 3: B. Reset](/img/legacy/word-image-261.png)  
図 42: Broker 再起動確認画面**

### C. Record

Recording は OpenLM Broker の動作を記録するデバッグ機能です。主に OpenLM サポートが問題解析に使用します。記録手順は次のとおりです。

1. **Recording to Path** フィールド右側の **[...]** をクリックして保存先を指定します。指定するとフルパスが入力されます（ファイル名は含まれません）。**[Record]** をクリックするとファイルが作成され、以下の形式で保存されます:

`<serverName>_<port #>_<startDateTime>_<endDateTime>.rec`

2. **Recording Duration** フィールドで記録時間を設定します。既定は 1 分です。

3. 記録対象のポートを選択します。ナビゲーションパネルのポート/ライセンスサーバーに応じたツリーが表示されます（**図 43**）。*注: 図はチェックボックスツリーの例で、FlexLM ライセンスサーバーは記録対象だが OpenLM App Manager は対象外です。*

**![スクリーンショット: C. Record](/img/legacy/word-image-262.png)  
図 43: ポート 27080 が選択された Recording Configuration パネル**

4. **[Record]** をクリックします。選択した時間だけ活動が記録されます。

## OpenLM Broker の終了

設定完了後は、設定ツールを終了することを推奨します。通常、ほとんどの変更には次の 3 つのボタンが関係します（**図 44**）。

- **[Apply]**
- **[Restart Broker]**
- **[Exit]**

**![スクリーンショット: Exit OpenLM Broker](/img/legacy/word-image-263.png)  
図 44: 一般的な OpenLM Broker 画面**

終了する際は、**[Apply]**（変更保存）→ **[Restart Broker]**（変更反映）→ **[Exit]**（画面を閉じる）の順でクリックしてください。これで OpenLM Broker の設定は完了です。
