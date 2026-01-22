---
title: "Applications Manager を2インスタンスで並列インストール"
sidebar_position: 2
---
以下のドキュメントでは、同一の Windows マシンに Applications Manager の異なる2インスタンスを並列でインストールする方法を説明します。

## 手順の概要

Applications Manager の並列インストールでは次を行います:

- OpenLM Workstation Agent と Broker で、各 Applications Manager に異なるポート（例: 27080 と 27081）を設定する
- 新しいフォルダーを作成し、既存の Applications Manager 設定をコピーして調整する

## Applications Manager アプリケーションの設定

1. Applications Manager が稼働しているマシンを準備します。
2. Applications Manager Service を停止します。
3. C:Program Files OpenLM に **OpenLM App Manager2** という新しいフォルダーを作成します。
4. ***C:Program Files OpenLMOpenLM App Manager*** の内容を ***C:Program Files OpenLMOpenLM App Manager2*** にコピーします。
5. **OpenLM App Manager2** フォルダー内の **Openlm-app-manager.properties** ファイルを開きます。
6. port=27081 を設定します。
7. このファイル内のその他の設定が正しいことを確認します。
8. このファイルを保存します。
9. **Bin** フォルダー内の **OpenLMLicenseManager.exe** を **OpenLMLicenseManager2.exe** にリネームします。
10. **OpenLMLicenseManager_x86.exe** を **OpenLMLicenseManager2.exe.** にリネームします。
11. 同じフォルダー内の **Uninstall Service.bat** ファイルを "**OpenLMLicenseManager2_x86.exe**" //DS//**OpenLMLicenseManager2** に変更します。
12. 同じフォルダーの **Bin** にある **Install *Service.bat*** ファイルは以下のようになります。元のファイルからの変更点は太字で示しています:  
    @SET LOG_DIR="%~dp0..logs" **"OpenLMLicenseManager2.exe" //IS//OpenLMLicenseManager2** -DisplayName="**OpenLM App Manager2**"^ -Description="**OpenLM App Manager2**"^ -Install="**%~dp0OpenLMLicenseManager2.exe**"^ -Jvm="C:Program FilesOpenLM**OpenLM App Manager2**jrebinserverjvm.dll" -StartMode=jvm -StopMode=jvm -Startup=auto -Classpath=openlm-app-manager-1.8.3.jar^ -StartClass=com.openlm.shadowlm.Main -StartMethod=start^ -JvmOptions=-Djava.net.preferIPv4Stack=true;-Dlog4j.configuration=file:log4j.properties;-Dopenlm.log.dir=%LOG_DIR%^ -StopClass=com.openlm.shadowlm.Main -StopMethod=stop^ -StdOutput=auto -StdError=auto -StartPath "%~dp0.."^ -LogPath=%LOG_DIR% -LogPrefix=openlm-app-manager
13. **OpenLMLicenseManager2.exe** をダブルクリックし、適切な Java Runtime Environment を設定します。次に ***InstallService.bat*** を実行し、Windows Services に新しいサービス **OpenLM App Manager2** が作成されたことを確認します。  
    ![OpenLM Applications Manager](/img/legacy/installing-2-app-managers-006.png)
14. **OpenLM App Manager 2** フォルダーの ***lmstat.bat*** ファイルを開き、**port=27080** を **port=27081** に変更します（ポート番号は例です。ポートは手順 5 と同じにしてください**）。**
15. これで、同じデータベースを使用する Applications Manager が 2 インスタンス並列で構成されます。新しく追加した Applications Manager には既存データベースを削除することを推奨します。
16. **Windows Services** に移動し、OpenLM App Manager と OpenLM App Manager2 のサービスを開始します。  
    ![OpenLM Applications Manager](/img/legacy/installing-2-app-managers-007.png)

## OpenLM Broker の設定

1. Broker を開きます。
2. 新しい Applications Manager License Manager のポート 27081 を追加します。  
   **注**: 元の AppManager（C:Program Files OpenLMOpenLM App Managerlicense）からライセンスファイルを新しい AppManager の license フォルダーにコピーする必要があります。
3. **Port 27081** 配下の **Commands** メニューに移動し、両方の commands メニューでコマンドのパスを *C:Program Files OpenLMOpenLM App Manager2* に設定します。
4. ***Update*** ボタンをクリックして変更を保存します。
5. **Log Files** メニューでログファイルパスを ***C:Program Files OpenLMOpenLM App Manager2logslm-log.log*** に設定します:
6. ***Apply*** ボタンを押し、続けて ***Restart Broker*** を実行します。
7. 追加したポート 27081 の **status** コマンドをクリックします。
8. **Execute** ボタンをクリックします。
9. 次の形式で成功レスポンスが返ることを確認します:  
   `<SERVER name="..." port="27081" request_time_utc="..." server_status="ok"/>`
10. 同様のエラーメッセージが表示される場合は、[OpenLM サポートにお問い合わせください](https://www.openlm.com/contact-tech-support/)。

## ライセンスサーバーの設定

1. **Windows Start menu** から **OpenLM SLM** の構成ツールを起動し、**License Servers** メニューを開いて ***Add Server*** をクリックします:
2. ドロップダウンから **OpenLM Applications Manager** を選択します。
3. **OpenLM Broker** アプリケーションの Host Name/IP と Port と同じ値を入力し、例として **Port 27081** を設定します。
4. ***Apply*** ボタンを押して再起動します。

## OpenLM User Interface で 2 つの Applications Manager を表示

1. Applications Manager を 2 インスタンス表示する前に、**Windows Services** で OpenLM App Manager と OpenLM App Manager2 のサービスを開始します。
2. 次に **OpenLM User Interface ->Start->Administration** を開き、**OpenLM Applications Manager** をクリックします:
3. 開いたウィンドウの左側に 2 つの Applications Manager が並列で表示されます:
