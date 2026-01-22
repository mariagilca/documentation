---
title: "OpenLM Broker Web UI"
sidebar_position: 2
---
## 概要

v21.11 以降、OpenLM Broker には同一ネットワーク内の他マシンからアクセスできる Browser UI が用意されています。

これにより Broker をリモートで制御・設定できます。多数の Broker がある環境で、集中管理ステーションを用意する場合に便利です。  
また、Linux マシン上の Broker にも Web UI でアクセスできます。

## セキュリティ上の注意

Broker Web UI はポート 5090 を使用します。セキュリティを考慮し、このポートは開放または閉鎖できます。また、リモートから Broker Browser UI にアクセスするためのトークンを設定します。

Broker の XML ファイルで UI ポートを変更できます:

![](/img/legacy/word-image-53_1.png)

Broker Browser では Web UI を無効化できます:

![](/img/legacy/word-image-54_1.png)

これにより、Broker XML のポート設定は無効になります:

![](/img/legacy/word-image-55_1.png)

元に戻す必要がある場合は、指定ポートに再設定してください。

## リモートログイン手順

OpenLM Broker には、Broker 21.11 以降でインストールされる新しい WebUI があります。

Broker WebUI は [http://localhost:5090](http://localhost:5090/) にアクセスして利用できます。リモートから利用する場合は localhost をサーバーのホスト名に置き換えます。

リモートアクセスにはアクセス・トークンの生成が必要です:

![](/img/legacy/word-image-56_1.png)

トークンは Broker システムにログイン後にのみ取得できます。以下の URL でプレーンテキストとして取得できます:

[http://localhost:5090/api/new-token](http://localhost:5090/api/new-token)

リモートのコマンドラインからトークンを取得するには以下のコマンドを使用します。

Linux:

```
ssh server_name wget -O - http://localhost:5090/api/new-token
```

Windows:

```
winrs -r:server_name powershell -command "(Invoke-WebRequest -Uri http://localhost:5090/api/new-token -Method GET).Content"
```

putty を使用した例:

![](/img/legacy/word-image-57_1.png)

トークンは生成から 30 分で失効します。Broker サービスを再起動した場合も失効します。

## 基本機能

#### OpenLM SLM の追加

1. **OpenLM SLMs** タブで **Add Server** をクリックします。  
   ![](/img/legacy/word-image-58_1.png)
2. 接続タイプ（On-premise または OpenLM Cloud）を選択して **Add** をクリックします。  
   ![](/img/legacy/word-image-59_1.png)
3. OpenLM SLM のホスト名を入力します。Identity Service を使用している場合は Start → Administration → System Security → Security → Authorization → Add で認可ファイルを作成し、Broker Authorization File をインポートして **Save** をクリックします。  
   ![](/img/legacy/word-image-60_1.png)
4. License Managers 画面でライセンスマネージャーを確認・追加できます。
5. **Add License Manager** をクリックします。
6. ドロップダウンからライセンスマネージャーの種類を選択し、ポートを入力して **Add** をクリックします。  
   ![](/img/legacy/word-image-62_1.png)
7. License file 情報を追加します:  
   ![](/img/legacy/word-image-63_1.png)
8. Commands 情報を追加します。実行ファイルのパスを入力すると、Status と Data_Inquiry のコマンドパスが更新されます。  
   ![](/img/legacy/word-image-64_1.png)
9. Vendor 情報を入力します:  
   ![](/img/legacy/word-image-65_1.png)
10. ベンダー名と Options File 情報を追加し、**Confirm** をクリックします。  
    ![](/img/legacy/word-image-66_1.png)
11. Log File を追加します:  
    ![](/img/legacy/word-image-67_1.png)
12. Log File Type を選択し、Log name を更新し、ログパスを入力してベンダーを選択します。**Confirm** をクリックしてから **Save** をクリックします。  
    ![](/img/legacy/word-image-68.png)

## 並列 Broker インスタンスの切り替え

同じマシンに複数の Broker をインストールしている場合、UI から切り替えられます。

![](/img/legacy/word-image-69.png)

また、localhost:5090、localhost:5091 のようにポートを指定した URL に直接アクセスして切り替えることもできます。

## 制限事項

Broker Configuration ツールの以下の機能は Browser UI では使用できません。

- Broker Restart
- License File Sorting
- ファイルブラウズ機能
