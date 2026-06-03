---
title: "NVIDIA License Manager"
description: "Nvidia GRID License manager は、使用中の GRID ライセンス数と、キャパシティプランニングの観点から必要となるライセンス数を監視するために使用されます。"
sidebar_position: 12
---
## NVIDIA License Managerとは?

Nvidia GRID® License managerは、使用中のGRID®ライセンス数と、キャパシティプランニングの観点から必要なライセンス数を監視するために使用されます。NVIDIAには、顧客が仮想コンピューティングモードで実行できるようにする4つの異なるソフトウェア製品があり、このソフトウェアはライセンスマネージャーによって管理されます。年間サブスクリプションまたは同時使用バージョンの2つのライセンスモデルがあり、後者には年間保守料金も必要です。NVIDIA GPUの使用方法もライセンスの種類に影響を与える可能性があります。顧客がAI、ハイパフォーマンスコンピューティング、または機械学習にGPUをvCS（仮想コンピュートサーバー）として使用している場合、ライセンス費用はユーザーごとではなくGPUごとになります。

同時ライセンスは制限的ではなく、ユーザーはライセンスなしでGRIDソフトウェアを実行でき、アクセスを拒否されることはありません。また、顧客はNVIDIA GRIDライセンスマネージャーの使用に限定されず、NVIDIAは別の方法からの信頼できるライセンストラッキングデータを受け入れます。

**OpenLM Server v4.5以降、Nvidia License Managerは[FlexNet Embedded](../interfacing-articles/flexnet-embedded)に置き換えられたため、この統合は古くなっていることに注意してください。**

OpenLMは、NVIDIAライセンスを監視するために次の機能を提供します。

- 拒否レポート *いいえ*
- レポート解決 *分単位*
- 借用ライセンスレポート *いいえ*
- 有効期限レポート *はい*
- 複数サーバー冗長サポート *いいえ*
- トークンライセンスサポート *いいえ*

NVIDIAは、OpenLMが管理できる70以上のライセンスマネージャーの1つにすぎません。[リストを確認してください](https://www.openlm.com/license-manager-capabilities/)。

### NVIDIAとは?

ゲーム用のグラフィックアクセラレータボードを開発することから始まった会社が、幅広い業界に不可欠なハードウェアプロバイダーになると誰が思ったでしょうか。シミュレーションソフトウェアを実行するエンジニアや研究会社、広範な仮想マシン設定を持つIT運用管理者、およびCPUのスタックが提供できる以上の計算能力を必要とするその他の組織は、NVIDIA GPUに依存しています。AMDのような競合他社はいますが、NVIDIAは市場シェアの大部分を占めています。また、顧客が最大の効率で作業するのに十分な容量を確保するために、ライセンス使用状況を監視するライセンスマネージャーも提供しています。ライセンスマネージャーはNVIDIA GRID®ライセンスマネージャーとして知られており、NVIDIAが提供する4つのソフトウェアエディションを監視するために使用されます。

- GRID vPC（GRID Virtual PC）-フルパフォーマンスの仮想デスクトップ用
- Quadro vDWS（Quadro® Virtual Data Center Workstation）-CATIA、SOLIWORKS、Siemens NX、PTC Creo、Autodesk Maya、Schlumberger Petrelなどのソフトウェアを実行する必要がある設計者やエンジニアに最適です。
- GRID vApps（GRID Virtual Applications）-XenAppなどのアプリストリーミングソリューションを実行している顧客に適しています。
- NVIDIA vCS（Virtual ComputeServer）-AI、機械学習、ハイパフォーマンスコンピューティング用。このソフトウェアは、他の3つの製品とは異なり、ユーザーごとではなくGPUごとにライセンスされます。