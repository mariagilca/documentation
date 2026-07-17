---
title: 一時停止して再開
description: "OpenLM ライセンス管理ツールは、アイドル状態のまま消費されているライセンスを特定してライセンスプールに返却し、利用効率を向上させるために設計されています。"
sidebar_label: "一時停止して再開"
sidebar_position: 5
---

{/* Source: https://www.openlm.com/knowledge-base/license-retrieval-of-idle-flexlm-applications-suspend-and-resume-kb4005c/ */}

## ライセンス回収

OpenLM のライセンス管理ツールは、消費中だがアイドル状態のライセンスを特定してライセンスプールに戻し、組織全体のライセンス利用率と可用性を向上させるよう設計されています。こうした最適化を実現する方法はいくつかあります:

### 手動

ライセンス管理者は OpenLM EasyAdmin User Interface を監視し、[ライセンスを手動でライセンスプールに戻す](./license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a.md) ことができます。

### Suspend and Resume(一時停止して再開)

OpenLM はアイドル状態の FlexLM ライセンスを自動検出し、ライセンスプールへ戻してアプリケーションのプロセスをサスペンドします。この方法は "Suspend and Resume" と呼ばれ、本ドキュメントで詳しく説明します。

### Save and Close(保存して閉じる)

OpenLM は MATLAB、Autodesk、ArcGIS、CATIA、SolidWorks のアイドルセッションを自動的に保存して閉じます。これは各アプリケーション向けに OpenLM が実装した専用拡張を使用して行われます。[この方法は "Save and Close" と呼ばれます](./license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close.md)。

### Agent Procedures

OpenLM は、アイドルライセンスの識別と回収をさらに強化するための新しい方法を追加しました。これは ["Agent procedures" による回収](./license-retrieval-of-idle-applications-enhanced-workstation-agent-procedures.md) と呼ばれます。

## アイドルアプリケーションの Suspend and Resume

基本的なアイドルプロセス管理方法は "Suspend and Resume" です。この方法はアイドルプロセスを検出し、対応するライセンスを特定して共通ライセンスプールに戻し、ライセンスが再取得されるまでアプリケーションを「凍結」します。これは FlexLM ライセンスのあらゆるアプリケーション向けの汎用的な方法です。

Suspend and Resume 方法で OpenLM がアイドルライセンスを自動回収するよう設定するには、管理者が以下の手順を実施する必要があります。ArcGIS のように複数アプリケーション（例: ArcMap、ArcCatalog、ArcGlobe）で同じライセンスを使用するソフトウェアスイートの場合、制御したい各アプリケーションに対して同じアイドル時間値でこれらの手順を繰り返す必要があります。

1. OpenLM Workstation Agent がまだインストールされていない場合は、[OpenLM Download](https://www.openlm.jp/downloads/) からワークステーションにダウンロードします。これは手動でも、msiexec によるサイレント展開でも可能です。
2. Extension 対応アプリケーション（例: ArcGIS、Autocad、Matlab、SolidWorks）が PC にインストール済みと検出された場合、OpenLM Extensions ウィンドウがチェック済みで開きます。Autocad、Matlab、SolidWorks のアイドルインスタンスを対象外にするには、該当する拡張のチェックを外します。

![ArcGIS や Matlab など対応アプリケーションのチェックボックスがある OpenLM Workstation Agent の Extensions ウィンドウ。](/img/legacy/word-image-26687-1.png)

OPENLM WORKSTATION AGENT- EXTENSIONS

3. インストールの終盤で Workstation Agent Configuration ダイアログが開きます。Workstation Agent が接続する OpenLM サーバーを入力し、**Apply** をクリックします。
4. Agent をサイレントインストールする場合も、同様の設定が展開フラグで可能です。
5. アプリケーションのプロセスを対応するライセンスに紐付けます:

a. **OpenLM Start** → **Administration** → **Process Features** をクリックします。Administration - Process Features ウィンドウが開きます:

![アプリケーションプロセスをライセンスに紐づける EasyAdmin の Administration Process features ウィンドウ。](/img/legacy/word-image-26687-2.png)

ADMINISTRATION - PROCESS FEATURES

b. 必要なプロセスが Processes リストにない場合は、手動で追加する必要があります:

* Administration - Process Features ウィンドウ右上の Process List フレームにある **Add** をクリックします。Add process ウィンドウが表示されます。
* ライセンスファイルに記載されている正確なプロセス名、ベンダー名、および任意の説明文を入力します。

プロセスリストに既に存在するプロセスについては、それを選択して **Edit** をクリックします。

6. 対象フィーチャーが監視対象プロセスにリンクされていることを確認します。これらのフィーチャーは Administration - Process Features ウィンドウの下部パネルに表示されます。表示されない場合は、次のいずれかで追加します:

a. 既存のプロセスをハイライトし、Administration - Process Features ウィンドウ右下の **Add** をクリックします。ダイアログボックスが表示されるので、必要な Feature name を選択します。

b. **Add all vendor's features** をクリックします。これにより、ベンダーの記録済みフィーチャーがすべて監視フィーチャーの一覧に追加されます。

7. Edit process ウィンドウ（新規プロセスの場合は同一の Add process ウィンドウ）で License release method のドロップダウンをクリックし、**Suspension** を選択します（下記 "License retrieval policy" を参照）:

![License release method ドロップダウンを Suspension に設定した Edit process ウィンドウ。](/img/legacy/word-image-26687-3.png)

EDIT PROCESS

8. **Enabled** と **Enable automatic license release functionality** のチェックボックスをオンにします。
9. **Enable automatic license release functionality** のパラメータを設定します。これらはライセンス回収のポリシーを決定します。Idle とラベル付けされた後は次の条件で回収されます:

* start releasing licenses after usage … (Default: 80): チェックアウトされたライセンスの割合が指定した割合を超えた場合にのみ、回収対象の候補になります。
* idle time license release threshold (Default: 15 min): 指定した期間を超えてアイドルだったライセンスが回収対象になります。

10. **Advanced** パネルを展開して、システムリソースのしきい値を設定します。これらの数値は監視対象アプリケーションがアイドルかどうかを判断するためのしきい値です。表示される既定値は、OpenLM サポートチームから明示的に指示されない限り変更しないでください。不適切な変更は OpenLM システムの性能に悪影響を与える可能性があります。

* % Processor time (Default: 2): アプリケーションがアクティブと判断される CPU 使用率のしきい値です。ワークステーションの CPU 使用率がこの値より低い場合にのみソフトウェアが閉じられます。
* I/O Data operations / sec (Default: 2): 同様に、アプリケーションがアクティブと判断される I/O しきい値です。1 秒あたりのディスク操作数が表示値より低い場合にのみソフトウェアが閉じられます。
* User usage (Default: 2): ワークステーション上のユーザーモードプロセスの CPU 使用率です。

11. **Save** をクリックします。

## What now?

以上です。OpenLM は "Suspend and Resume" 方法でライセンスアプリケーションを最適化するよう設定されました:

* アイドルアプリケーションはワークステーションでサスペンドされ、適切な通知がモニターに表示されます。
* アプリケーションの再開は、サスペンド通知から、またはエンドユーザーのワークステーションにある Personal Dashboard の **Recently closed documents** インターフェースから行えます。
