---
title: "手動回収とアイドル時間"
description: "ライセンスマネージャーは、実際にはアイドル状態でリソースを浪費しているライセンスを使用中と表示することがあります。本ドキュメントでは、システム管理者向けの対処方法を説明します。"
sidebar_label: "手動回収とアイドル時間"
---

{/* Source: https://www.openlm.com/knowledge-base/license-retrieval-manual-method-and-monitoring-idle-application-time-kb4005a/ */}

ライセンスマネージャーは、実際にはアイドル状態で企業の限られたリソースを浪費しているライセンスを「使用中」とラベル付けしてしまう場合があります。システム管理者は OpenLM EasyAdmin User Interface を使用してこうした状況を特定し、アイドルライセンスを手動または自動で回収できます。

このドキュメントでは、アプリケーションのアイドル時間の監視方法と、アイドルライセンスを手動で回収する方法を説明します。

## アイドルアプリケーション

ユーザーがライセンスをアクティブに使用していない場合、アイドル時間は OpenLM EasyAdmin User Interface の ‘Start' → ‘Operational' → "Currently consumed licenses" → "Recent App. Idle period" 列に表示されます。この情報は各クライアントワークステーションの OpenLM Workstation Agent モジュールによってサンプリングされ、OpenLM SLM に送信されます。

## プロセスとライセンスのリンク設定

アイドル時間情報を取得するには、以下の手順に従います。

1. エンドユーザーのワークステーションに OpenLM Workstation Agent がインストールされていることを確認します。

2. EasyAdmin インターフェースを開きます: Windows **Start → OpenLM → OpenLM EasyAdmin User Interface**。

3. EasyAdmin の **Start → Administration** をクリックします。

4. **Process Features** を選択します。

5. 監視したいプロセスがプロセス一覧にない場合、手動で追加する必要があります:

a. Windows の Start ボタンをクリックします。

b. **Task Manager  →  Processes tab** に移動します。Processes テーブルが表示されます。

c. 必要なプロセスを見つけ、正確なプロセス名（大文字小文字を区別）をコピーします。

d. 新しいプロセスを現在の管理対象プロセス一覧に追加するには、Process Features ウィンドウ右上の Process List フレームにある Add アイコンをクリックします。Add Process ウィンドウが表示されます。プロセス一覧にすでに存在するプロセスについては選択して Edit をクリックします。同一の Edit process ウィンドウが開きます（下記参照）。

e. 選択したアプリケーションにフィーチャーを追加します。Process Features ウィンドウ右下の Add + をクリックして 1 つずつ追加するか、Add All Vendor's features + をクリックしてすべて追加します。

6. プロセスウィンドウを設定してアイドルライセンスを監視します:

![スクリーンショット: Setting a Process to License link](/img/legacy/Screenshot-2023-01-24-at-23.28.57.png)

* 項目 5c で取得した "Process name" を入力します（例: ArcMap）。
* 管理対象プロセスの説明を入力します。
* アプリケーションの Vendor name は、ライセンスファイルに記載されている表記そのままです（例: ARCGIS）。
* **Enabled** と **Track process idle/active periods** のチェックボックスをオンにします。
* システムリソースのしきい値を設定します。これらの数値はプロセスをアイドルと判断するためのしきい値です。
* Idle time report threshold を設定します。これは非アクティブなセッションがアイドルとして報告されるまでの最小時間です。

上記 1〜6 の手順を完了すると、ワークステーションは管理対象プロセスの監視ができるようになります。ArcGIS のように複数アプリケーション（例: ArcMap、ArcCatalog、ArcGlobe）で同じライセンスを使用するソフトウェアスイートでは、制御したい各アプリケーションに対して、同じアイドル時間の値でこれらの手順を繰り返す必要があります。

## CCL ウィンドウでのアイドル時間の監視と手動ライセンス回収

EasyAdmin の Currently Consumed Licenses (CCL) ウィンドウを開くには: EasyAdmin **Start →  Operational  →  Currently Consumed Licenses**。

このウィンドウには現在アクティブなセッションがすべて一覧表示されます。管理者はこのウィンドウを使って、ライセンス対象アプリケーションを実行している個々のワークステーションを監視できます。アイドルアプリケーションを検出して、マウスクリックで終了することも可能です。これを行うには、各クライアントワークステーションに OpenLM Workstation Agent モジュールをインストールする必要があります。

## Workstation Idle Time

エンドユーザーのワークステーションのアイドル時間は "Workstation Idle time" 列に記録・表示されます。

## Recent Application Idle Period

特定アプリケーションの最近のアイドル時間を記録します。

## Linger Time

ライセンスは、チェックインまたは FlexEnabled アプリケーション終了のいずれか早い時点を超えて、指定された期間チェックアウト状態に留まります。

## Linger Due

Linger Due は、ライセンスが実際にプールに戻され、別ユーザーが取得できる時刻です。

## View Idle times

暗い色の三日月アイコンをクリックすると、アイドル/アクティブ時間のグラフ表示と、アイドル期間の一覧が表示されます。

## License removal

管理者は、特定のワークステーションからライセンスを手動で削除できます。Active Products ウィンドウでユーザー行をハイライトし、Remove License アイコンをクリックします。この機能には以下の制約があります:

* エンドユーザーが最低限の非アクティブ時間に達している必要があります。この値は FLEXlm ライセンスマネージャーの制約に準拠して既定で 5 分に設定されています。
* 指定ワークステーション上で実際の製品活動に紐づいていないライセンス（ライセンスがコンピューター上で人工的に「フリーズ」されている場合など）は、解放されて利用可能なライセンスプールに戻されます。
* 作業者が製品を使用中の場合、ライセンスの再取得が自動で試行されます。この場合、その製品とワークステーションのライセンスが新しいハンドル番号で Active Products 画面に再表示されます。
* ArcGIS 10 では手動ライセンス削除は機能しません。

### アプリケーションのクローズ

ワークステーション上のアプリケーションを手動で閉じるには、管理者は該当行をハイライトし、Close Application アイコンをクリックします。

この操作はライセンスをプールに戻し、開いているプロジェクトを保存し、アプリケーション自体を終了します。

この機能には以下の制約があります:

* Workstation Agent モジュールが適切にインストールされている必要があります。
* 拡張対応アプリケーションでのみ動作します。この改訂時点では MATLAB、AUTOCAD、ARCGIS、ARCGIS PRO、SOLIDWORKS、CATIA が該当します。

### 共通の制約

License Removal と Application Closure の両方に共通する制約は次のとおりです:

* これらの機能は FLEXlm ライセンスマネージャーでのみ利用可能です。
* 各クライアントワークステーションに Workstation Agent モジュールを適切にインストールする必要があります。
* 借用ライセンス（別名 "Linger licenses"）は EasyAdmin アプリケーションから回収できません。
