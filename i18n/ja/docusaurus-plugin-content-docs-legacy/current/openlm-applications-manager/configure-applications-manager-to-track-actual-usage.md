---
title: "Applications Managerアイドル時間監視設定"
sidebar_position: 8
---
## はじめに

OpenLM システムは、OpenLM Workstation Agent が監視するプロセスのアイドル時間を追跡するよう設定できます。本ドキュメントでは、Applications Manager が監視する機能の実使用量を測定するための設定方法を説明します。*注: 例では「Notepad」をプロセスとして使用します。* プロセスのセットアップと設定には OpenLM SLM、OpenLM Applications Manager、OpenLM Broker、OpenLM Workstation Agent が必要です。Applications Manager と同じマシンにインストールされた OpenLM Broker が、使用状況を OpenLM SLM に報告します。

実使用量を設定する前に、対象の機能（製品・アプリケーション）は OpenLM Applications Manager に事前登録されている必要があります。機能の設定手順は、[OpenLM Applications Manager Configuration](./openlm-applications-manager-configuration.md) を参照してください。

## プロセスの設定

設定は OpenLM EasyAdmin User Interface の Process Features で行います。

1. EasyAdmin User Interface を起動します（Windows **[Start] > [OpenLM] > [OpenLM EasyAdmin User Interface]**）。ブラウザで EasyAdmin ダッシュボードが開きます。
2. Process Features に移動します。**[Start] > [Administration]** をクリックして Administration 画面を開き、**Process Features** アイコンをクリックします（図 1）。Administration - Process Features 画面が開きます。  
   ![](/img/legacy/word-image-26671-1.png)  
   **図 1: Process Features アイコンの位置**
3. プロセスを追加します。画面右上の **[Add]** ボタンをクリックします（図 2）。Add Process 画面が開きます。  
   ![](/img/legacy/word-image-26671-2.png)  
   **図 2: Process Features 画面の [Add] ボタン**
4. **Process Name**、**Description**、**Vendor Name** を入力します。**Enabled** と **Track process idle/active periods** の両方にチェックが入っていることを確認します。  
   *注: プロセス名は追跡対象の機能名と完全一致させる必要があります。Process List（**[Start] > [OpenLM] > [Process List]**）で確認できます。プロセスは稼働中でないと一覧に表示されません。Vendor Name は Product List 画面で設定したベンダー名に合わせます（Agent Configuration 画面の OpenLM Applications Manager タブで **[Configure]** をクリック）。*  
   ![](/img/legacy/word-image-26671-3.png)  
   **図 3: 手順 4 の入力例**
5. **[Save]** をクリックして Process Features ウィンドウに戻ります。画面上部に新しい行が追加されます（図 4）。  
   ![](/img/legacy/word-image-26671-4.png)  
   **図 4: Process Features 画面に追加された新規行**
6. 追加された行をクリックしてアクティブにします。画面右下に複数のボタンが表示されます。
7. **[+Add Vendor's Features]** ボタンをクリックします（図 5）。確認画面が表示されます（図 6）。  
   ![](/img/legacy/word-image-26671-5.png)  
   **図 5: [+Add Vendor Features] ボタン**  
   ![](/img/legacy/word-image-26671-6.png)  
   **図 6: Add All Features の確認画面**
8. **[Yes]** をクリックして変更を適用します。プロセスに関連付けられた機能名が Process Features ウィンドウ下部に表示されます。これで機能のアイドル時間追跡が有効になります。

## 実使用量の確認

機能を使用すると、Currently Consumed Licenses 画面でアイドル時間を確認できます（図 7）。Start メニューから **[Start] > [Operational] > [Currently Consumed Licenses]** に移動します。  
![](/img/legacy/Screenshot-2023-02-24-at-15.55.57.png)

**図 7: Currently Consumed Licenses 画面**

行の右側にある **Idle Times** アイコン（![](/img/legacy/word-image-26671-8.png)）をクリックすると、**Session Active/Idle Ratio** 画面が表示されます。

## 制限事項

実使用量を測定するこの設定は、次の場合には動作しません:

- 同じプロセスが Unmanaged Processes で既に定義されている場合。*注: Applications Manager は Unmanaged Processes の後継機能のため、これは想定された制限です。*
- 同じプロセスが Process Products で "Extension" のリリース方法として設定されている場合。
