---
title: "保存して閉じる"
description: "OpenLM が提供するライセンス回収方法の 1 つに、「Extension」方式とも呼ばれる「Save and Close」方式があります。"
sidebar_label: "保存して閉じる"
---

{/* Source: https://www.openlm.com/knowledge-base/license-retrieval-of-idle-applications-matlab-autodesk-arcgis-solidworks-save-and-close-kb4005b/ */}

OpenLM が提供するライセンス回収方法の 1 つが "Save and Close" 方法で、"Extension" 方法とも呼ばれます。名前のとおり、この方法はユーザーが現在開いているプロジェクトを保存してアプリケーションを閉じ、ライセンスをプールに戻します。

この方法は次のアプリケーションに設定できます:

* ArcGIS と ArcGIS Pro
* AutoCAD（acad.exe プロセスを使用するすべてのフィーチャー）
* SOLIDWORKS
* MATLAB
* CATIA
* Harmony
* Kingdom
* Petra

## 概要

"Save and Close" 方法では、アイドル状態のアプリケーションを持つワークステーションが検出されると、ユーザーの現在のプロジェクトが保存され、アプリケーションが閉じられます。自動保存の場所は設定可能なため、保存したセッションが既存のプロジェクトを上書きしないようにできます。詳細は下記の "Extension dedicated functions" セクションを参照してください。

## Workstation Agent のインストール

"Save and close" 方法では、エンドユーザーのワークステーションに Workstation Agent（旧 OpenLM Agent）をインストールする必要があります。

1. アプリケーションが開いている場合は、すべてのエンドユーザーのワークステーションで拡張対応アプリケーション（ArcGIS / ArcGIS Pro / MATLAB / AutoCAD / SOLIDWORKS / CATIA）を閉じます。

2. Workstation Agent（旧 OpenLM Agent & Personal Dashboard）をワークステーションにインストールします。最新のインストーラーは [こちら](https://www.openlm.jp/downloads/) です。

3. Workstation Agent を手動でインストールする際、拡張対応アプリケーションがコンピューター上で検出されると、OpenLM Extensions ダイアログに該当するチェックボックスが表示されます。"Save and Close" を使用するアプリケーションにチェックを入れてください（ArcMap、ArcGIS Pro、AutoCAD、MATLAB、SOLIDWORKS などに該当）。

![スクリーンショット: Workstation Agent Installation](/img/legacy/word-image-76.png)

この時点で、Workstation Agent（旧 OpenLM Agent）にはサポート対象アプリケーションごとの拡張がインストールされます。拡張が正しくインストールされたことを確認するのが推奨されます。本ドキュメント末尾の "Verify the OpenLM Extension Installation" 付録を参照してください。

## OpenLM で "Save and Close" を使用する設定

サポート対象アプリケーションに "Save and Close" 方法を設定するには次の手順が必要です。ArcGIS のように複数アプリケーション（例: ArcMap、ArcCatalog、ArcGlobe）で同じライセンスを使用するソフトウェアスイートでは、制御したい各アプリケーションに対して同じアイドル時間の値でこれらの手順を繰り返す必要があります。

1. **Windows Start → OpenLM → OpenLM EasyAdmin User Interface** を開きます。

2. **EasyAdmin Start → Administration → Process Features** をクリックします。Process Features ウィンドウが開きます:

![スクリーンショット: OpenLM to employ "Save and Close" の設定](/img/legacy/word-image-77.png)

3. 拡張対応アプリケーション（ArcGIS / ArcGIS Pro / MATLAB / AutoCAD / SolidWorks）を選択し、**Edit** をクリックします。

4. Edit process ウィンドウで、**License release method** のドロップダウンメニューから Extension を選択します。

![スクリーンショット 2: OpenLM to employ "Save and Close" の設定](/img/legacy/word-image-78.png)

5. **Enabled** と **Enable automatic license release functionality** のチェックボックスがオンになっていることを確認します。

6. "Enable automatic license release functionality" パラメータを設定します。これらのパラメータは、アプリケーションをアイドルとラベル付けするポリシーと、ライセンス回収の進め方を決定します:

* **Start releasing licenses after usage rate of (percentage)**: 使用率は、このベンダー/アプリケーションで利用可能な総ライセンス数に対する使用中ライセンスの割合（%）です。設定した使用率のしきい値に到達すると、Idle time license release threshold を満たすライセンスが回収されます。例: 総ライセンス数が 100 でしきい値を 80% に設定した場合、使用中ライセンスが 80 本以上になると、下記の値（例: 15 分）以上アイドルのアプリケーションが自動的に回収されます。
* **Idle time license release threshold (minutes)**: 指定時間を超えてアイドルだったライセンスはアイドルと判定され、回収されます。

7. ‘Advanced' パネルを展開して、システムリソースのしきい値を設定します。これらの数値は監視対象アプリケーションがアイドルかどうかを判断するためのしきい値です。表示される既定値は、OpenLM Support から明示的に指示されない限り変更しないでください。不適切な値は OpenLM システムの性能に悪影響を与える可能性があります。

* % Processor time (Default: 2): アプリケーションがアクティブと判断される CPU 使用率のしきい値です。ワークステーションの CPU 使用率がこの値より低い場合にのみソフトウェアが閉じられます。
* I/O Data operations/sec (Default: 2): 同様に、アプリケーションがアクティブと判断される I/O しきい値です。1 秒あたりのディスク操作数が表示値より低い場合にのみソフトウェアが閉じられます。
* User usage (Default: 2): ワークステーション上のユーザーモードプロセスの CPU 使用率です。

8. **Save** をクリックします。

**以上です!**

ライセンス使用状況は OpenLM の "Save and Close" 方法によって自動的に最適化されます。

* アイドルアプリケーションは現在のプロジェクトが保存され、アプリケーションが閉じられます。適切な通知がワークステーションに表示され、ユーザーに知らせます。
* アクティビティは、エンドユーザーのワークステーションにある Personal Dashboard の "Recently closed" インターフェースから Workstation Agent を通じて再開できます。

**Save and Close Method for CATIA**: CATIA で Save and Close 方法を設定するには **EasyAdmin Start → Administration → Process Features** に移動します。Process Features ウィンドウが開きます:

1. **Add** ボタンをクリックします。Process name（例: ‘CNEXT'）を入力し、Description を追加し、Vendor Name を選択します。
2. **Enabled** と **Enable automatic license release functionality** のチェックボックスをオンにします。
3. **License release method** のドロップダウンメニューから **Extension** を選択します。

![スクリーンショット 3: OpenLM to employ "Save and Close" の設定](/img/legacy/word-image-79.png)

![スクリーンショット 4: OpenLM to employ "Save and Close" の設定](/img/legacy/word-image-80.png)

4. "Enable automatic license release functionality" パラメータを設定します。これらのパラメータは、アプリケーションをアイドルとラベル付けするポリシーと、ライセンス回収の進め方を決定します:

* **Start releasing licenses after usage rate of (percentage)**: 使用率は、このベンダー/アプリケーションで利用可能な総ライセンス数に対する使用中ライセンスの割合（%）です。設定した使用率のしきい値に到達すると、Idle time license release threshold を満たすライセンスが回収されます。例: 総ライセンス数が 100 でしきい値を 80% に設定した場合、使用中ライセンスが 80 本以上になると、下記の値（例: 15 分）以上アイドルのアプリケーションが自動的に回収されます。
* **Idle time license release threshold (minutes)**: 指定時間を超えてアイドルだったライセンスはアイドルと判定され、回収されます。

5. **Track process Idle / Active Periods**: Idle Time Report Threshold の時間（分）を選択します。これは、アプリケーションが非アクティブになってから定義した分数が経過するとアイドルと判断されることを意味します。

6. ‘Advanced' パネルを展開して、システムリソースのしきい値を設定します。これらの数値は監視対象アプリケーションがアイドルかどうかを判断するためのしきい値です。表示される既定値は、OpenLM Support から明示的に指示されない限り変更しないでください。不適切な値は OpenLM システムの性能に悪影響を与える可能性があります。

* % Processor time (Default: 2): アプリケーションがアクティブと判断される CPU 使用率のしきい値です。ワークステーションの CPU 使用率がこの値より低い場合にのみソフトウェアが閉じられます。
* I/O Data operations/sec (Default: 2): 同様に、アプリケーションがアクティブと判断される I/O しきい値です。1 秒あたりのディスク操作数が表示値より低い場合にのみソフトウェアが閉じられます。
* User usage (Default: 2): ワークステーション上のユーザーモードプロセスの CPU 使用率です。

7. **Save** をクリックします。

CATIA の使用状況は OpenLM の "Save and Close" 方法によって自動的に最適化されます。

* アイドルアプリケーションは現在のプロジェクトが保存され、アプリケーションが閉じられます。
* 適切な通知がワークステーションに表示され、ユーザーに知らせます。

![スクリーンショット 5: OpenLM to employ "Save and Close" の設定](/img/legacy/word-image-81.png)

**Edit Process - CATIA**

1. **Windows Start → OpenLM → OpenLM EasyAdmin User Interface** を開きます。

2. **EasyAdmin Start → Administration → Process Features** をクリックします。Process Features ウィンドウが開きます:

3. CATIA のプロセスを選択し、**Edit** をクリックします。

![スクリーンショット 6: OpenLM to employ "Save and Close" の設定](/img/legacy/word-image-82.png)

4. **Edit Process** ウィンドウで必要な変更を行い、**SAVE** ボタンをクリックして変更を適用します。

![スクリーンショット 7: OpenLM to employ "Save and Close" の設定](/img/legacy/word-image-83.png)

### 閉じたプロジェクトの保存フォルダ

"Overwrite existing projects" がオフの場合、またはプロジェクト作成後に **少なくとも 1 回** 特定の場所へ保存されていない場合、拡張によって閉じられたプロジェクト文書を保存するフォルダを指定します。

### 既存プロジェクトの上書き

* Checked (Default): ドキュメントはユーザーが対象アプリケーションで Save をクリックした場合と同様に保存されます。元の場所に保存され、元のファイルが上書きされます。ドキュメントが作成後に少なくとも 1 回保存されていない場合、保存先は "Folder to save closed projects" で指定した場所になります。
* Unchecked: ドキュメントは "Folder to save closed projects" のパスに、ユーザーが "Save As…" をクリックした場合と同様にコピーとして保存されます。同じファイル名が保持され、上記フォルダパスが使用されます。元のファイルは変更されません（ソースフォルダパスと指定パスが重複している場合を除く）。

### ソフトウェア起動時に拡張リストを表示（ArcGIS のみ）:

* Checked: アイドル検出で閉じた後にアプリケーションを再起動する際、拡張リストが表示されます。特定の拡張の使用をユーザーに手動で確認させる場合に有用です。
* Unchecked (default): アイドル検出で閉じた後にアプリケーションを再起動しても拡張リストは表示されません。

### シャットダウン時にライセンス付き拡張をオフ（ArcGIS のみ）:

* Checked (Default): ライセンスが必要な拡張は、アイドルアプリケーションと一緒に閉じられます。アプリケーションを再起動する際に、拡張のライセンスを取得し直す必要があります。
* Unchecked: ライセンスが必要な拡張は、アイドルアプリケーションと一緒に閉じられません。

### カスタム拡張をオフ（ArcGIS のみ）:

* Checked (Default): ライセンスを必要としない拡張も、アイドルアプリケーションと一緒に閉じられます。アプリケーションを再起動する際に、拡張のライセンスを取得し直す必要があります。
* Unchecked: ライセンスを必要としない拡張は、アイドルアプリケーションと一緒に閉じられません。

### 拡張が使用しきい値を超えたときのアプリケーションの動作（ArcGIS のみ）

ライセンス付き拡張が使用しきい値を超えた場合の対応は 2 つあります:

1. 拡張をオフにする。
2. アプリケーションを完全に終了する。

### 指定時刻に開いているアプリケーションを強制終了する

このオプションを有効にすると、拡張対応アプリケーションが開いたままの場合でも、指定時刻にシャットダウンされます。ライセンス使用率が定義したしきい値に達していない場合でも、特定の時刻（例: 深夜）にライセンスを閉じて回収したい場合に有用です。この機能を使用するには:

1. "Shut application down" ラジオボタンを選択します。
2. 稼働中のアプリケーションを自動的に終了させる時刻を設定します。

### エージェントから "Set ArcGIS License Level" を非表示にする

このチェックボックスをオンにすると、Workstation Agent（旧 OpenLM Agent）を使用するユーザーが ArcGIS ライセンスレベルを調整できなくなります。

### 閉じる際に保存されず、レポートされないソフトウェア項目

このパネルには、アプリケーションが閉じられたときにデータが保存されない実行ファイルの一覧が表示されます。例: ArcCatalog.exe はファイルブラウザであり実質的なデータがないため保存されません。'Add' をクリックして実行ファイルを追加できます。

### 閉じる際に保存されないプロジェクトのディレクトリ一覧

指定したディレクトリにあるプロジェクトは、アプリケーションが自動的に閉じられる際に保存されません。これは、起動するたびに同じ静的情報を維持する必要があるプロジェクトに有用です。'Add' をクリックしてディレクトリを追加できます。

## 付録 A: OpenLM Extension のインストール確認

### **ESRI ArcGIS Desktop**

* Customize をクリック → Extensions を選択
* Extensions リストに OpenLM ArcGIS Extension が表示され、チェックが入っていることを確認します。

![Verifying Save and Close extension for ArcGIS](/img/legacy/verifying-save-and-close-extension-for-arcgis-1.png)

### **ESRI ArcGIS Pro**

メインメニューで Add-In Manager をクリックし、OpenLM_ArcGISPro_Extension_2 が存在するか確認します。

![Verifying Save and Close extension for ArcGIS Pro](/img/legacy/verifying-save-and-close-extension-for-arcgis-pro-1.png)

### **Autodesk AutoCAD**

"Save and Close" は acad.exe プロセスを使用する Autodesk ソフトウェアアプリケーションで動作します。確認方法:

* 例として AutoCAD Map 3D の場合、AutoCAD ウィンドウ下部で "OLM" コマンドを入力します。Workstation Agent（旧 OpenLM Agent）拡張がインストールされている場合、以下のようなメッセージがユーザーに表示されます。

![Verifying Save and Close extension for AutoCAD](/img/legacy/verifying-save-and-close-extension-for-autocad-1.png)

拡張がインストールされていない場合は、"OLM" コマンドが認識されないというエラーメッセージが表示されます。

### **MathWorks MATLAB**

MATLAB を開くと、Command Window に STARTUP FILE のステータスが表示されます。

![Verifying Save and Close extension for MATLAB](/img/legacy/verifying-save-and-close-extension-for-matlab-1.png)

### **Dassault Systèmes SOLIDWORKS**

**Tools → Add-Ins** に移動します。OpenLM Extension が一覧にあり、チェックが入っていることを確認します。

![Verifying Save and Close extension for SOLIDWORKS](/img/legacy/verifying-save-and-close-extension-for-solidworks-1.png)
