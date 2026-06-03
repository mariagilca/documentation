---
title: "LS-DYNA"
description: "LS-DYNA は、幅広い業界で使用されている Livermore Software (LSTC) の有限要素解析ツールです。LSTC は独自のライセンスマネージャーを提供しています。"
sidebar_position: 4
---

## LS-DYNAとは?

[LS-DYNA](http://www.lstc.com/)は、Livermore Software（LSTC）の有限要素解析ツールであり、幅広い業界で使用されています。LSTCには、独自のライセンスマネージャー（LS-DYNAも）があります。

LS-DYNAはシミュレーションツールであるため、複数のCPU（および/またはGPU）で実行され、ライセンスは使用されるコア数と同時に実行されるジョブ数に基づいて構成されます。ライセンスは、ノードロックシナリオとネットワーク使用の両方で利用できます。従来のライセンスマネージャーとは異なり、同時ユーザー数ではなく、同時に使用されているコア数が監視されます。

OpenLMは、LM-Xライセンスを監視するために次の機能を提供します。

- 拒否レポート *はい*
- レポート解決 *分単位*
- 借用ライセンスレポート *いいえ*
- 有効期限レポート *はい*
- 複数サーバー冗長サポート *いいえ*
- トークンライセンスサポート *いいえ*

LS-DYNAは、OpenLMが管理できる70以上のライセンスマネージャーの1つにすぎません。[リストを確認してください](https://www.openlm.com/license-manager-capabilities/)。

### OpenLMの利点

OpenLMは、LS-DYNAライセンスの現在の使用状況を明確に表示する方法を提供するだけでなく、ライセンス使用統計とパターンを蓄積し、アイドル状態のライセンスを監視します。

### Livermore Technologiesとは?

Livermore、またはLSTC（Livermore Software Technologies Corporation）は、同名のカリフォルニアの町に拠点を置き、1987年にDYNA3DをLS-DYNAという名前で商品化するために設立されました。LS-DYNAは、シミュレーション用のFEA（有限要素解析）ツールであり、LS-OPTやTHUMS™（Total Human Model for Safety）などの補完的なツールを備えています。これは、一連の仮想衝突試験ダミーと組み合わせて使用​​され、トヨタ向けに開発されました。航空宇宙から生物工学、製造業まで、さまざまな業界がLSTCの一連のソルバーソフトウェアを使用しています。LSTC独自のライセンスマネージャーは、LS-DYNAとしても知られています。