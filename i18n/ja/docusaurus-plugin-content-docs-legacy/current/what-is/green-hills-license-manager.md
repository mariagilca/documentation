---
title: "Green Hills License Manager"
description: "Greenhills License Manager (GHS LM) は、ホストマシン上で実行されるすべての GHS ソフトウェアに必須となるライセンスマネージャーです。"
sidebar_position: 25
---

## Green Hills License Managerとは?

Greenhills License Manager（またはGHS LM）は、ホストマシンで実行されているすべてのGHSソフトウェアに必須のライセンスマネージャーです（IoTやその他のデバイス向けの組み込み製品とは対照的です）。利用可能なライセンスモデルは4つあります。

- フローティングライセンス。ライセンスキーはネットワークライセンスサーバーにインストールされます。
- 指名ユーザー。ライセンスキーはネットワークライセンスサーバーにインストールされますが、指名ユーザーまたは管理者のみがライセンスにアクセスできます。
- コンピューターロック。ライセンスキーは特定のコンピューターにインストールされます。
- ドングルロック。ライセンスを使用する権利は、ドングルなどのデバイスに保存されます。ソフトウェアの使用が許可されているコンピューターにも、ライセンスキーをインストールする必要があります。

非常に古いソフトウェアバージョン向けに「レガシー」ライセンスも利用できます。

OpenLMは、Green Hillライセンスを監視するために次の機能を提供します。

- 拒否レポート *いいえ*
- レポート解決 *分単位*
- 借用ライセンスレポート *いいえ*
- 有効期限レポート *はい*
- 複数サーバー冗長サポート *いいえ*
- トークンライセンスサポート *いいえ*

Greenhills GHSは、OpenLMが管理できる70以上のライセンスマネージャーの1つにすぎません。[リストを確認してください](https://www.openlm.com/license-manager-capabilities/)。

### Green Hillsログの解析

OpenLMは、バージョン3.2から、監視対象ライセンスサーバーのポートフォリオに[Green Hillsライセンス](https://www.openlm.com/application-notes-v3-0/monitoring-app-usage-v3-0/configuring-openlm-to-interface-the-greenhills-license-manager-an4001v/)マネージャーを追加しました。

Green Hillsログファイルは、OpenLMの「All License Parser」オンラインツールでも解釈されます。

### Green Hillsとは?

Greenhills Software（GHS）は、1982年にカリフォルニアで設立され、リアルタイムオペレーティングソリューション（RTOS）と、IoTデバイスを保護するための組み込みセキュリティシステムを専門としています。主力製品はIntegrity RTOSであり、NSAからEAL 6+ High Robustnessの最高認証を取得しています。これにより、航空宇宙など、ほとんどのメーカー（Airbus、Boeing、Lockheed Martinなど）がアビオニクスに使用している業界で、サイバー攻撃から重要なリソースを保護することが認定されています。

また、デバイスのライフサイクル全体でデバイスを管理するのに役立つデバイスライフサイクル管理（DLM）システムも開発しました。組み込みソフトウェアには、組み込みライセンスが付属しています。GHSソフトウェアがホストマシンで実行されている場合、お客様はGHSライセンスマネージャーをインストールする必要があります。