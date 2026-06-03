---
title: "アイドル時間監視"
description: "ネットワークライセンスの利用状況を監視するうえで大きな課題は、特定のソフトウェアが実際に使用されているかどうか、またどのように使用されているかを把握することです。"
sidebar_position: 7
---

ネットワークライセンスの利用状況を監視する際の大きな課題は、特定のソフトウェアが実際に使用されているか、どのライセンスが使われているかを把握することです。OpenLM はこの指標を測るために 2 つの数値を提供します:

- 特定ユーザーのセッションでライセンスが消費されている時間
- 共有ライセンスのアプリケーションが実際に使用されていた時間とその期間

実使用量を評価できるようにするため、表示前に次の手順を実施します:

1. エンドユーザーのワークステーションに OpenLM Workstation Agent がインストールされていることを確認します。

2. EasyAdmin のユーザーインターフェイスを開きます。

3. **Start → Administration → Process Features** をクリックします。

![スクリーンショット: OpenLM Actual Usage](/img/legacy/Screenshot-2023-02-08-at-18.14.53.png)

4. Process Features ウィンドウが開きます:

![スクリーンショット 2: OpenLM Actual Usage](/img/legacy/Screenshot-2023-02-08-at-18.17.01.png)

5. 監視対象のプロセスが一覧にない場合は手動で追加します:

a. **Administration → Process Features → Add** に移動します:

![スクリーンショット 3: OpenLM Actual Usage](/img/legacy/Screenshot-2023-02-08-at-18.24.23.png)

6. プロセス設定画面でアイドルライセンスを監視するよう設定します:

- プロセス名を入力します（例: ArcMap）。
- 管理対象プロセスの Description を入力します。
- アプリケーションの Vendor 名をライセンスファイルに記載されたとおりに入力します。
- **Enabled**、**Save process activity**、**System resource threshold used** にチェックが入っていることを確認します。
- **Idle Time Report Threshold** を設定します。これは非アクティブなセッションをアイドルとして報告するまでの最小時間です。
- ソフトウェアのリソース閾値を設定します。これらはプロセスがアイドルと見なされる基準値です。

上記 1〜6 の手順が完了すると、Active Agent は管理対象プロセスの監視を開始します。

## 実使用量の追跡

1. OpenLM EasyAdmin の Web アプリケーションを開きます。

2. **Start → Operational → Currently Consumed Licenses** をクリックします。Currently Consumed Licenses ページが開きます。

3. 特定の行の三日月アイコン（![q7](/img/legacy/q7.jpg)）をクリックすると、そのベンダーの実使用量を確認できます。

このウィンドウには、現在アクティブなすべてのセッションが表示されます。管理者はライセンスアプリケーションを実行している個々のワークステーションを監視できます。  
![スクリーンショット: Tracking actual usage](/img/legacy/Screenshot-2023-02-09-at-16.45.44.png)

4. グラフのピークは Active Usage（実使用量）を示します。低く平坦な線は Idle time を示します。

![スクリーンショット 2: Tracking actual usage](/img/legacy/Screenshot-2023-02-22-at-10.24.15.png)

実使用量とアイドル時間を明確に区別できます。

![スクリーンショット 3: Tracking actual usage](/img/legacy/Screenshot-2023-02-22-at-10.25.38.png)
