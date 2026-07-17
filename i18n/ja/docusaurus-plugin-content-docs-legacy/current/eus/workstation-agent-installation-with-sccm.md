---
title: SCCMによるAgentのインストール
description: "OpenLM は SCCM を使用した Workstation Agent のインストールに対応しており、本書では SCCM によるインストールを一例として紹介します。"
sidebar_position: 2
---
## 対象範囲

OpenLM は Microsoft System Center Configuration Manager(SCCM) を使用した Workstation Agent のインストールをサポートしています。なお、このドキュメントの SCCM インストールは例として提示しており、環境に応じた追加調整が必要です。具体的な調整はローカルの担当者またはシステム管理者が行ってください。

以下の手順は Workstation Agent のインストールを説明します。環境に SCCM が導入済みであり、Workstation Agent を展開するワークステーションにも SCCM が利用可能であることを前提としています。SCCM 関連の作業には IT 部門の支援を受けることを推奨します。本書の範囲を超える SCCM の詳細やサポートについては、Microsoft Support（[System Center Configuration Manager](https://www.microsoft.com/en-us/cloud-platform/system-center-configuration-manager)）を参照してください。

## インストール

インストールは 2 段階です:

●アプリケーションのインストールパッケージ作成

●対象ワークステーションへの展開

### インストールパッケージの作成

1. Workstation Agent インストーラー（**OpenLM_Agent_Installer_###.msi**）を SCCM サーバーまたはネットワーク共有に配置し、SCCM サーバーからアクセスできることを確認します。
2. SCCM サーバーで SCCM Configuration Management Console を開きます。
3. 画面左の Software Library メニューで Applications タブに移動します（Software Library > Overview > Application Management > Applications）。
4. [任意] Applications 配下にフォルダを作成してアプリケーション管理を整理できます。複数のケースに応じたアプリケーションを作成する場合に便利です。  
   フォルダを作成するには、Applications を右クリックしてポップアップから "Folder" を選択します。Configurations Manager 画面でフォルダ名を入力し、[OK] をクリックします。
5. Applications を右クリックし、ポップアップメニューから "Create Application" を選択します。  
   "Application Wizard" ダイアログが開き、一般情報が表示されます（図 20）。[注: Step #4 で作成したフォルダにアプリケーションを追加する場合は、Applications ではなくフォルダ名を右クリックします。]  
   ![Create Application Wizard General panel in SCCM](/img/legacy/word-image-55927-1.png)  
   図 20: General パネルを表示した Create an Application Wizard
6. ラジオボタンを選択して "Automatically detect information about this application from the installation files" を選択します。インストールファイルから情報を取得し、インストールを可能な限り自動化します。
7. インストールファイルタイプを選択します。Type のドロップダウンで下矢印をクリックし、"Window Installer (*.msi)" を選択します。
8. [Browse] ボタンをクリックし、Step #1 で特定した MSI インストールファイルを選択します。
9. [Next] をクリックして "View Imported Information" パネルに進みます。インストーラーから自動取得された情報が表示されます。
10. [Next] をクリックして "Specify information about this application" パネルに進みます（図 21）。  
    ![Specify information about this application screen in SCCM](/img/legacy/word-image-55927-2.png)  
    図 21: "Specify information about this application" 画面
11. 画面上部に必要な情報を入力します。これらのフィールドは自由入力で、アプリケーションの検索や整理に役立ちます。Name、Administrative Comments、Manufacturer、Version、Optional Reference、Administrative Categories などが含まれます。
12. Installation program フィールドを必要に応じて変更し、[Browse] ボタンでインストールファイルを指定します。このフィールドには、コマンドラインのサイレントインストールで使用するオプションを含められます。本書の "Installation Parameters, Options, and Descriptions." セクションを参照してください。
13. パネル下部の "install behavior" ドロップダウンからインストール動作を選択します。  
    ●Install per user — 現在のユーザー権限でインストールします。●Install per system — SMS Agent Host サービス権限（Local System アカウント）でインストールします。●Install per system if the resource is a device; otherwise, install per user — 対象がデバイスコレクションの場合は install per system を使用します。対象がユーザーまたはユーザーグループのコレクションの場合は install per user を使用します。
14. [Next] をクリックして Summary 画面に進みます。
15. 収集されたアプリケーション情報を確認します。変更が必要な場合は [Previous] で戻って修正し、Summary 画面へ戻ります。
16. Summary 画面で [Next] をクリックすると変更が保存され、作成進行画面が表示されます（図 22）。作成完了後、完了画面と処理レビューが表示されます（図 23）。  
    ![Create Application Wizard progress screen](/img/legacy/word-image-55927-3.png)  
    図 22: "Create Application Wizard" 進行画面  
    ![Create Application Wizard completion screen](/img/legacy/word-image-55927-4.png)  
    図 23: "Create Application Wizard" 成功画面
17. [Close] をクリックして完了画面を閉じ、ウィザードを終了します。  
    これでインストールパッケージの作成は完了です。SCCM コンソールの Software Library > Overview > Application Management > Applications に表示されます。  
    必要に応じて Step #4 から Step #17 を繰り返し、別のインストール条件に対応するアプリケーションを作成できます。追加パラメータや詳細は、コンソールでアプリケーションを右クリックし "Properties" を選択して設定します。

### 対象ワークステーションへの展開

1. SCCM コンソールを開き、Software Library > Overview > Application Management > Applications の一覧から対象アプリケーションを選択します。
2. Workstation Agent アプリケーションを右クリックし、ポップアップメニューから "Deploy" を選択します。"Deploy Software" Wizard が開き、General 画面（"Specify General Information for this Deployment"）が表示されます。'Software' フィールドにはアプリケーション名が自動入力されます（図 24）。  
   ![Deploy Software Wizard general information screen](/img/legacy/word-image-55927-5.png)  
   図 24: "Deploy Software Wizard" - 配置の一般情報画面
3. 'Collection' フィールド右の [Browse] をクリックすると "Select Collections" 画面が開きます。既定では User collections が開きます（図 25）。  
   ![Users Collections panel on Select Collection screen](/img/legacy/word-image-55927-6.png)  
   図 25: Select Collection 画面の "Users Collections" パネル
4. Select Collections 画面左上のドロップダウンで目的の User Collections に移動し、画面右側の一覧から対象を選択します。
5. [任意] "Select Collections" 画面左上のドロップダウンで "Device Collections" に移動し、画面右側の一覧から対象を選択します。  
   ![Device Collections panel on Select Collection screen](/img/legacy/word-image-55927-7.png)  
   図 25: Select Collection 画面の "Device Collections" パネル
6. [OK] をクリックして変更を反映し、General 画面へ戻ります。
7. [Next] をクリックして "Content" 画面（"Specify Content Destination"）へ進みます。
8. [ADD] をクリックしてポップアップメニューを開き、"Distribution Points" を選択します。  
   Add Distribution Points 画面でチェックボックスを選択して配布ポイントを追加します。
9. [OK] をクリックして Content 画面へ戻ります。
10. [Next] をクリックして "Deployment Settings" 画面（"Specify Settings to Control How this Software is Deployed"）へ進みます。
11. "Action and Purpose" の既定値は "Install" と "Available" です。Workstation Agent のインストール推奨設定として、"Available" を "Required" に変更します。  
    [Next] をクリックして "Scheduling" 画面（"Specify Schedule for this Deployment"）へ進みます。
12. [任意] "Scheduling" 画面でインストール時刻を指定します。既定の "As soon as possible after the available time" は、展開設定完了後できるだけ早くインストールを開始します。
13. [Next] をクリックして "User Experience" 画面（"Specify the user experience for the installation of the software on the selected devices"）へ進みます。
14. [任意] 必要に応じて設定を変更します。"User Notification" の既定は "Display in Software Center and show all notifications" です。"Commit changes at the deadline or during the maintenance window (requires restart)" も既定でチェックされています。
15. [Next] をクリックして "Alert" 画面（"Specify Configuration Manager and Operation Manager alert options"）へ進みます。
16. [任意] 必要に応じて設定を変更します。既定ではいずれのオプションも無効です。
17. [Next] をクリックして "Summary" 画面（"Confirm settings for the new deployment"）へ進みます。
18. 収集された展開情報を確認します。変更が必要な場合は [Previous] で戻り、修正後に Summary 画面へ戻ります。
19. "Summary" 画面で [Next] をクリックして変更を確定し、展開の作成を開始します。進行画面が表示され、完了後に完了画面とレビューが表示されます。
20. [Close] をクリックしてウィザードを終了し、コンソール画面へ戻ります。
21. [任意] 選択したアプリケーションの SCCM コンソール画面下部にある Deployments タブをクリックして、展開状況を確認します。

展開が成功すると、クライアントの "Software Center" に Workstation Agent が表示され、自動的にインストールされます。
