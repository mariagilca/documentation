---
title: "OpenLM ServerのDNS解決"
sidebar_position: 6
---
OpenLM はライセンス在庫、使用状況、ユーザー、ワークステーションなど、ライセンス使用に関するあらゆる情報をレポートします。システム管理者は、稼働中ワークステーションの IP アドレスを、例えばドメイン特定のために重視することがあります。

一部のフローティングライセンス管理システムでは、ライセンスをチェックアウトしたワークステーションの IP アドレスが報告されません。

OpenLM Workstation Agent モジュールでこの情報を取得できる場合がありますが、エージェントがすべてのエンドユーザー端末に配布されているとは限りません。OpenLM Server はネットワークサービスを利用してワークステーションの IP アドレスを解決し、IP を取得できます。

## DNS 解決の設定

DNS 解決は OpenLM Server 上でバックグラウンド処理として実行されます。ワークステーションの IP を解決するには次の設定を行います:

1. EasyAdmin のユーザーインターフェイスで **Start → Administration → System&Security → Security → Data Management** を開きます。  
2. 「**Resolve workstations names ...**」のトグルをオンにします。  
3. 解決の実行時刻を設定します。  
4. **Save** をクリックします。  

この処理は設定した時刻に 24 時間ごとに実行されます。以下のスクリーンショットでは、毎日午前 3 時に DNS 解決が実行される例を示しています。

![スクリーンショット: DNS resolving configuration](/img/legacy/Screenshot-2023-08-22-at-19.37.47.png)

初回の実行前は IP アドレスが表示されません。実行間隔の途中では、IP アドレスのないワークステーションが表示される場合があります。

IP 情報は後で、**Start → Reports → License Activity** などの OpenLM レポート画面に表示されます（例は下図）。

![スクリーンショット 2: DNS resolving configuration](/img/legacy/Screenshot-2023-08-22-at-19.40.15.png)
