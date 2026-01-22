---
title: "アイドルアプリケーションのライセンス回収 - 強化版 Workstation Agent 手順"
sidebar_position: 2
---
## ライセンス回収

OpenLM のライセンス管理ツールは、消費中だがアイドル状態のライセンスを特定してライセンスプールに戻し、組織全体のライセンス利用率と可用性を向上させるよう設計されています。こうした最適化を実現する方法はいくつかあります:

### 手動

ライセンス管理者は OpenLM EasyAdmin User Interface を監視し、[ライセンスを手動でライセンスプールに戻す](https://www.openlm.com/Knowledgebase%20and%20articles/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/) ことができます。

### Suspend and resume

OpenLM はアイドル状態の FlexLM ライセンスを自動的に検出し、回収してアプリケーションのプロセスをサスペンドします。この方法は ["Suspend and Resume" と呼ばれます](https://www.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c/)。

### Save and close

OpenLM はアイドル状態の MATLAB、Autodesk、ArcGIS、Harmony、Kingdom、Petra のセッションを自動的に保存して閉じます。これは各アプリケーション向けに OpenLM が実装した専用拡張を使用して行われます。[この方法は "Save and Close" と呼ばれます](https://www.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/)。

### Workstation Agent procedures

OpenLM v3.1 以降、アイドルライセンスの識別と回収をさらに強化する新しい方法が追加されました。これは "Agent procedures" による回収と呼ばれます。この方法は [こちらのドキュメント](https://www.openlm.com/Knowledgebase%20and%20articles/license-retrieval-of-idle-applications-enhanced-agent-procedures-kb4005d/) に記載されています。

## アイドルプロセスの検出と監視対象フィーチャーへの紐付け

アプリケーションに "Procedure" 方法を設定するには次の手順が必要です。ArcGIS のように複数アプリケーション（例: ArcMap、ArcCatalog、ArcGlobe）で同じライセンスを使用するソフトウェアスイートでは、制御したい各アプリケーションに対して、同じアイドル時間の値でこれらの手順を繰り返す必要があります。

1. まだ実施していない場合は、[OpenLM Download](https://www.openlm.com/?page_id=729) からワークステーションに OpenLM Workstation Agent をインストールします。手動でもサイレント展開でも可能です。
2. インストールの終盤で Agent Configuration ダイアログが開きます。Workstation Agent が接続する OpenLM SLM を入力して Apply をクリックします。Workstation Agent をサイレントインストールする場合も、展開フラグで同様の設定が可能です。
3. アプリケーションのプロセスを対応するライセンスに紐付けます:

EasyAdmin Start → Administration → Process Features をクリックします。Process Features ウィンドウが開きます。
![Process features](/img/legacy/process-features.png)
必要なプロセスが Processes リストにない場合は、手動で追加します:

- EasyAdmin Start ボタンをクリックします。
- **OpenLM → Process Features** を選択します。Processes テーブルが表示されます:
- "Process Features" ウィンドウ右上の Process List フレームで '**Add**' をクリックします。"Add process" ウィンドウが表示されます: ![Add process](/img/legacy/add-process.png)
- ライセンスファイルに記載されている正確なプロセス名、ベンダー名、および任意の説明文を入力します。

プロセスリストに既に存在するプロセスについては、それを選択して '**Edit'** をクリックします。

4. 対象フィーチャーが監視対象プロセスにリンクされていることを確認します。これらのフィーチャーは Process / Features ウィンドウ下部に表示されます。表示されない場合は、次のいずれかで追加します:

4a. 現在のプロセスをハイライトし、"Process Features" ウィンドウ右下の '**Add**' をクリックします。ダイアログボックスが表示されるので、必要な Feature name を選択します。
or
"**Add all vendor's features**" をクリックします。これにより、ベンダーの記録済みフィーチャーがすべて監視フィーチャー一覧に追加されます。

5. Workstation Agent の procedure がまだ存在しない場合は、**EasyAdmin Start → Administration → "Agent Procedures"** をクリックします。"Agent Procedures" ウィンドウが開きます。'**Add**' をクリックして新しい procedure（例: TEST）を追加します。

![Administration - Agent procedures](/img/legacy/administration-agent-procedures.png)

6. "Edit process" ウィンドウ（新規プロセスの場合は同一の "Add process" ウィンドウ）で '**Enabled**' と "**Enable License release functionality**" のチェックボックスをオンにします。
7. License release method のドロップダウンメニューをクリックし、'Procedure' を選択して procedure 名を入力します。
8. "**Enable License release functionality**" パラメータを設定します。これらは Idle とラベル付けされた後のライセンス回収ポリシーを決定します。

- Start releasing licenses after usage ... (Default: 80): チェックアウトされたライセンスの割合が指定した割合を超えた場合にのみ、回収対象の候補になります。
- Idle time license release threshold (Default: 15 min): 指定した期間を超えてアイドルだったライセンスが回収対象になります。

9. '**Advanced**' パネルを展開し、システムリソースのしきい値を設定します。これらの数値は監視対象アプリケーションがアイドルかどうかを判断するためのしきい値です。表示される既定値は、OpenLM サポートチームから明示的に指示されない限り変更しないでください。不適切な変更は OpenLM システムの性能に悪影響を与える可能性があります。

- % Processor time (Default: 2): アプリケーションがアクティブと判断される CPU 使用率のしきい値です。ワークステーションの CPU 使用率がこの値より低い場合にのみソフトウェアが閉じられます。
- I/O Data operations/sec (Default: 2): 同様に、アプリケーションがアクティブと判断される I/O しきい値です。1 秒あたりのディスク操作数が表示値より低い場合にのみソフトウェアが閉じられます。
- User usage (Default: 2): ワークステーション上のユーザーモードプロセスの CPU 使用率です。

10. '**Save**' をクリックします。

OpenLM はアイドルプロセスとフィーチャーを監視・検出するように設定されました。次に、ライセンス回収ポリシーを定める実際の procedure を設定します。

## Agent Procedure の設定

Agent procedures は複数のステップで構成でき、外部スクリプトを呼び出すことも可能です。手順ステップの順序や関係、および各ステップの内容が procedure の流れに影響します。procedure を設定するには、"Agent procedures" ウィンドウで対象を選択し、'Edit' ボタンをクリックします。"Edit procedure" ウィンドウが開きます。
![Agent Procedure Editor](/img/legacy/agent-procedure-editor.png)

### "Edit Procedure" ウィンドウ

- "Edit procedure" ウィンドウでは、各行が 1 つの procedure ステップを表します。
- **"Add actions**" ボタンをクリックしてステップを追加できます。
- 各ステップは "Action type"、"Script info"、"Execute condition" の 3 列の内容を設定して個別に構成する必要があります。
- 各列ヘッダーの情報 '?' アイコンをクリックするとヘルプが表示されます。
- 各ステップは 'Active' チェックボックスで有効/無効を設定できます。

### Action type

実行するステップの種類を選択します:

- License Manager - 対象の License Manager にアクセスしてフィーチャーを解放/終了します。
- Agent Kill - OpenLM Agent に特定のプロセスを強制終了するよう指示します。
- Agent Suspend - OpenLM Agent に特定のプロセスをサスペンドするよう指示します。
- Agent Script - OpenLM Agent に、OpenLM Agent マシン上でスクリプトまたはコマンドを実行するよう指示します。

### Script info

この列には、OpenLM Agent マシンの Windows シェルで実行されるコマンドラインやバッチファイルのパスが含まれます。これにより、Agent procedure の一部として任意の Windows シェルコマンド（例: アプリケーションの起動/終了）を条件付きで実行できます。詳細は情報 '?' アイコンをクリックしてください。

### Execute condition

この列は procedure のフロー制御を反映します。

- No Wait - 直前のステップに関係なく実行できます。最初のステップの既定値です。
- Wait Complete - 直前のステップの完了を待ちます。
- Wait Success - 直前のステップが正常に完了するのを待ちます。前のステップがエラーで終了し、Wait Success が必要な場合は procedure が終了し、以降のステップは実行されません。

## Now what?

OpenLM はアイドルアプリケーション検出後に、条件付きアクションの任意のシーケンスを実行できるようになりました。
Agent procedures の実装について追加の支援が必要な場合は、OpenLM サポートチーム（Support@OpenLM.com）までお気軽にお問い合わせください。
