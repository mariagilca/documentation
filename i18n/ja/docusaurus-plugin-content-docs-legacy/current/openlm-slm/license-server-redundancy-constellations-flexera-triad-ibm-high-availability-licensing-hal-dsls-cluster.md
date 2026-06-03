---
title: "ライセンスサーバー冗長構成: Flexera Triad、IBM High Availability Licensing (HAL)、DSLS クラスター"
description: 目次。
sidebar_label: "ライセンスサーバー冗長構成: Flexera Triad、IBM High Availability Licensing (HAL)、DSLS クラスター"
---

{/* Source: https://www.openlm.com/knowledge-base/license-server-redundancy-constellations-flexera-triad-ibm-high-availability-licensing-hal-dsls-cluster/ */}

* ライセンスサーバー冗長構成: Flexera Triad、IBM High Availability Licensing (HAL)、DSLS クラスター

目次

* [範囲:](#0-toc-title)
* [Flexera の 3 台冗長構成](#1-toc-title)
* [IBM の High Availability Licensing (HAL)](#2-toc-title)

**Flexera の FlexLM 3 台冗長 (Triad)**

**IBM の High Availability Licensing (HAL)**

**Dassault Systemes の DSLS クラスター（"Failover" モード）**

## 範囲: [#](#0-toc-title)

IBM や Flexera などのライセンス管理ツールは、障害のない[ライセンス管理ソリューション](https://www.openlm.com/software-license-management/ "Software License Management")を実現するために、複数ライセンスサーバーをクラスター化して運用する方法を提供しています。本記事では、各ソリューションの実装に必要な運用手順をまとめ、長所と短所の観点から比較します。  
OpenLM Utilizer ライセンス監視ツールは両構成をサポートします。OpenLM は WAN 越しに複数サーバーからライセンス統計を取得する設計で、Flexera の Triad 構成では検証済みです。本稿執筆時点 (Rev 1.0) では IBM LUM HAL での検証はまだ行われていません。

## Flexera の 3 台冗長構成 [#](#1-toc-title)

### 概要:

この構成は、TCP/IP で相互接続された 3 台のライセンスサーバーで構成されます。3 台は "Primary"、"Secondary"、"Tertiary" と呼ばれます。最初の 2 台（Primary または Secondary）のどちらかが "Master" として定義されます。直感に反しますが、Master がすべての処理を担い、残り 2 台は基本的に待機します。すべてのライセンスは Master から提供され、Report と Debug のログも Master に集約されます。

システム起動時は 3 台が順番に起動され、Master ロールは起動順または "PRIMARY_IS_MASTER" フラグにより決定されます。

サーバー間は同一ポートで TCP/IP の "Heartbeat" メッセージにより通信します。送信した Heartbeat に応答がないマシンはベンダーデーモンを停止し、ライセンスを提供できなくなります。Master サーバー（Primary または Secondary）が停止した場合、Master ロールはもう一方（Secondary または Primary）へ移行します。新しい Master が FlexEnabled アプリケーション全体のライセンス管理を引き継ぎ、新しい Debug と Report のログを蓄積します。

### 3 台冗長構成の設定:

* まず、安定した 3 台のマシンを選定し、それらの間で信頼性の高い通信を確立します。
* ソフトウェアベンダーに Triad を構成するマシンの HostID と Host name を提供します。ベンダーはそれに基づいたライセンスサーバーファイルを提供します。これらの情報に合わせてライセンスファイル内の設定（PRIMARY_IS_MASTER 値、通信ポート番号、HEARTBEAT_INTERVAL など）を変更する必要があります。HEARTBEAT_INTERVAL は、サーバーが Triad から除外されるまでのタイムアウトを意味します。
* ライセンスサーバーパッケージを 3 台の参加サーバーにコピーします。

### 制限:

* 常に 2 台以上が稼働している必要があります。2 台が停止すると Triad 全体が停止し、"FlexEnabled" アプリケーションにはライセンスが提供されません。単一マシンでの運用に近い構成であることを考えると、これは不自然な制限です。
* "Tertiary" マシンは "Master" になりません。結果的にこのマシンが有効活用されないため、計画として不自然です。
* この構成では常に 1 台に負荷が集中します。作業は分散されず、特に高負荷環境ではエラーの原因になりやすいです。

## IBM の High Availability Licensing (HAL) [#](#2-toc-title)

### 概要

IBM HAL は "License server Cluster" の概念に基づいています。クラスターは 3〜12 台のライセンスサーバーで構成され、共同でライセンス対象アプリケーションを管理します。負荷は大部分のサーバーで動的かつ均等に分散され、1〜2 台は待機状態として、稼働中サーバーが利用不可になった場合に引き継ぎます。  
クラスターに参加するネットワークライセンスサーバーは、サーバーに紐づくアプリケーションと、クラスターに紐づくアプリケーションの両方を同時に提供できます。

### HAL の設定

* クラスターのメンバーとなるライセンスサーバーを選定します。これらは常時稼働する安定したマシンである必要があります。ネットワークの安定性も重要で、同じ地理的エリアで同一の OS 種別を使用することが推奨されます。

* 各ライセンスサーバーに LUM をインストールします。

* クラスター内のいずれかのサーバーでクラスターを作成します。i4blt -H コマンドまたは GUI を使用します。以下の例では、ThisCluster を作成し、Server1、Server2、Server3 の 3 台を含めています。
  + ```
    i4blt -H c -N ThisCluster -T 3 -n "Server1 Server2 Server3"
    ```

* クラスターの各メンバーを有効化します。1 台目はクラスター定義後にデフォルトで有効です。以下は Server2 を有効化する例です:
  + ```
    i4blt -H a -N ThisCluster -n Server2
    ```

Server2 を無効化するには、次を使用します。

* ```
  i4blt -H a -N ThisCluster -n Server2
  ```

* ライセンスベンダーから HAL Enrollment Certification File (ECF) を取得します。そのために "Cluster ID" を送信する必要があります。この ID は status cmmad を入力して取得します:
  + ```
    i4blt -H s -N ThisCluster.
    ```

* GUI または i4blt コマンドラインで、通常のライセンスサーバーと同様に HAL ECF を登録します。例:
  + ```
    i4blt -a -n ThisCluster -f -T
    ```

* すべてのクライアントがクラスター内の全メンバーを認識するように構成します。

### Dassault Systemes DSLS

DSLS ライセンスマネージャーも "Failover" モードのためにクラスター構造を実装しています。特徴は上記 2 つのタイプの中間です。

* サーバーはクラスターの一部として動作し、同時に単独サーバーとして動作することはできません。
* クラスターに参加するライセンスサーバー数は必ず 3 台です。
* 各サーバーの OS は Unix または Windows のいずれでも構いません。
* 2 台以上が稼働し、相互接続されている必要があります。
* "Master" は存在せず、すべてのマシンが同じライセンス管理ロールを担います。
* 3 台のマシンはそれぞれ独立してライセンス使用状況をログに記録し、使用状況が変化すると互いに更新します。

### まとめ

複数サーバー構成に関しては、IBM LUM の方が Flexera より包括的に見えます。主な "pro" 特性は次のとおりです:

* 負荷が均等に分散される。
* サーバー可用性に応じて動的にライセンス管理が再分配される。
* 構成可能なサーバー数が多い（最大 12 台）。Flexera は 3 台（実質 2 台）と比較して拡張性が高い。

IBM LUM の主な "con" は、[Flexnet](../what-is/flexera-flexlm-flexnet-publisher.md "Flexnet") (FlexLM) と比べて普及が低いことです。そのため、LUM から FlexLM や DSLS など他のライセンス管理ツールへ移行する傾向が見られます。

### 参考資料:

https://www-01.ibm.com/software/awdtools/lum/library.html

https://kb.flexerasoftware.com/doc/DocumentRepository/Licensing/FLEXnet_Publisher/FLEXnet_Publisher_11.6/03_ISV/Product%20Manual/LicenseAdministration.pdf

https://communities.mentor.com/mgcx/servlet/JiveServlet/previewBody/2877-102-1-5407/licensing_bp_wp-10.8.pdf

[https://pdir.technodat.cz/r21/install\_v5d](https://pdir.technodat.cz/r21/install_v5doc/doc21/online/basil_C2/pdf/DSLS.pdf)[oc/doc21/online/basil\_C2/pdf/DSLS.pdf](https://pdir.technodat.cz/r21/install_v5doc/doc21/online/basil_C2/pdf/DSLS.pdf)
