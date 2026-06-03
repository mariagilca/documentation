---
title: "Sentinel HASP"
description: "Sentinel HASP は当初 Aladdin Knowledge Technologies によって開発され、2008 年に SafeNet が買収しました。その後 SafeNet は Gemalto に買収されました。"
sidebar_position: 19
---

## Sentinel HASPとは?

Sentinel HASPは、元々Aladdin Knowledge Technologiesによって開発され、2008年にSafeNetに買収されました。SafeNetは、2014年に[Gemalto](#Who-is-Gemalto?)に買収されました。元々、HASPはハードウェア（ドングル）とソフトウェアの両方のソリューションとして利用可能でした。現在はSentinel HLに名称変更され、ハードウェアソリューションとなっています。顧客は、Sentinel HASPのソフトウェア部分であったSentinel SLと、すべてのHLまたはハードウェアバリアントを含むSentinel LDKを購入することをお勧めします。

OpenLMとの[インターフェース](../interfacing-articles/sentinel-hasp)のためにSentinel HASPを構成する方法の詳細については、こちらをお読みください。

Sentinel HASPは、OpenLMが管理できる70以上のライセンスマネージャーの1つにすぎません。[リストを確認してください](https://www.openlm.com/license-manager-capabilities/)。

## Sentinel HLとは?

Sentinel HLは、ハードウェアライセンス保護アプリケーションです。以前はハードウェアとソフトウェアの両方のライセンスマネージャーであったSentinel HASPとして知られていましたが、Sentinel HLはハードウェアのみの保護であり、Sentinel HASP HLと下位互換性があります。Gemalto独自のUpdateOnChip mechanism™を使用して、現場で更新できます。[Gemalto](#Who-is-Gemalto?)は、ハードウェアライセンスマネージャーの世界市場シェアの75％以上を占めています。

OpenLMは、Sentinel HLライセンスを監視するために次の機能を提供します。

- 拒否レポート はい
- レポート解決 *分単位*
- 借用ライセンスレポート *いいえ*
- 有効期限レポート *いいえ*
- 複数サーバー冗長サポート *いいえ*
- トークンライセンスサポート *いいえ*

## Sentinel LDKとは?

Sentinel LDK（License Development Kit）は、独立系ソフトウェアベンダー（ISV）が独自のソフトウェアをライセンスするために購入する製品です。GemaltoのSentinelシリーズの一部であり、ISVは、永久ライセンスからクラウドまで、さまざまなライセンスモデルを選択し、ハードウェアまたはソフトウェアのライセンス管理、あるいはその両方の組み合わせを選択できます。この最後のオプションは、Cross-Locking™テクノロジーを介して実現されます。

## Sentinel EMSとは?

GemaltoのSentinel EMSは、ライセンスの生成とアクティベーションから、ライセンスの有効期限が切れるまでの使用状況の追跡とレポート作成まで、製品のライフサイクルをサポートするエンタイトルメント管理システムです。これにより、ベンダーは顧客に提供できるライセンスに柔軟性と多様性をもたらし、新しいエンタイトルメントを作成することなく既存の顧客のアップグレードを許可できます。

## Sentinel Fitとは?

Sentinel Fitは、非常に小型でコンパクトなライセンスマネージャーであり、デバイスへの組み込みに最適です。利用可能なストレージが非常に少ない環境向けに設計されていますが、Fitは、永久ライセンスや時間ベースのバリアントなど、さまざまなライセンスモデルに対応できる柔軟性を備えています。ライセンスは、必要に応じてリモートで更新でき、IoTに実用的です。Sentinel製品は、現在Thales Groupの一部である[Gemalto](#Who-is-Gemalto?)によって提供されています。

## Sentinel UPとは?

GemaltoのSentinel UPは、ソフトウェアの更新を、それらを受け取る資格のある人に自動的に送信するアプリケーションです。グローバルな場所、製品バージョン、およびオペレーティングプラットフォームを考慮に入れています。

## Gemaltoとは?

Gemaltoは、2006年に、銀行セクターへのスマートカードとPOS端末の2つの主要サプライヤーであるSchlumbergerのAxaltoとGemplusの合併により設立されました。着実な買収プロセスを通じて、Gemaltoはデジタル資産管理の世界的なリーダーになりました。2014年、Gemaltoは米国の情報セキュリティ会社[SafeNet](#safenet)を8億9,000万ドルで買収しました。当時、彼らは、SafeNetのネットワークデータ保護が自社の認証技術とよく適合していると述べていました。ソフトウェア収益化の観点から、彼らはSafeNetのSentinelブランドのライセンス管理およびソフトウェア収益化製品を買収し、現在では世界最大のライセンスマネージャーサプライヤーとなっています。製品には、Sentinel LDK（License Development Kit）、Sentinel HASP（現在はSentinel HLとして知られています）、Sentinel RMS、Sentinel Fitなどがあります。

Gemaltoは、2019年4月にフランスの航空宇宙および防衛大手Thalesに買収され、吸収されました。

## SafeNetとは?

SafeNet, Incは、1983年に設立され、1989年に上場した情報セキュリティ会社IRE（Industrial Resource Engineering）に2000年に付けられた名前です。IREは、銀行セクターへの主要なプロバイダーであり、特にSWIFTとその顧客に、X25プロトコルを使用してパッケージを切り替える最初の仮想プライベートネットワーク（VPN）を介して、安全な銀行間送金用の暗号化デバイスを供給していました。その後、彼らはSafeNetと呼ばれる最初の商用VPNを作成し、米国の主要銀行のほとんどに採用されました。同社はSafeNetに社名を変更し、さまざまなセキュリティテクノロジー企業の買収を開始しました。2004年のこれらの買収の1つは、ハードウェアとソフトウェアの両方のオプションを提供するSentinelと呼ばれるソフトウェア資産保護製品群を持っていたRainbow Technologiesでした。2008年、SafeNetは、さまざまなハードウェアデバイスを介してソフトウェアセキュリティも提供していたHASP製品を持つAladdin Knowledge Technologiesを買収し、Sentinel HASPとしてブランド変更されました。その後、2014年に、SafeNetとSentinelブランドの権利はGemaltoのポートフォリオの一部となり、[Gemalto](#Who-is-Gemalto?)はソフトウェア収益化製品の世界的なマーケットリーダーになりました。この市場シェアは、ハードウェアライセンス管理の大部分を占めていることに基づいていますが、Flexeraはソフトウェアライセンス管理市場でわずかに上回っています。

Sentinel HASP（旧Aladdin HASP SRM）は、SafeNetが提供する同時使用ソフトウェアライセンスソリューションです。2つのフレーバーがあります。

- HASP SLは、ソフトウェア保護キーを使用してソフトウェア保護とライセンスを強制します。データ暗号化キーは、ソフトウェアベンダーとの通信によって取得され、ライセンス要求と付与のプロセスを可能にします。
- HASP HLは、ハードウェアドングルで同じことを行います。ライセンスサーバーにアクセスしてライセンスを取得するために、インターネット接続は必要ありません。

Sentinel HASPには、次の機能もあります。

- ライセンスを特定の仮想マシン（VM）に結び付けることができ、仮想環境でライセンス保護を提供します。

- 機能ごとの柔軟性：ユーザーのニーズと予算に基づいて、製品機能を有効または無効にします。
- ユーザーが使用するセッション数または機能数に対して課金します。
- エンドユーザーが特定の期間、ソフトウェアツールにサブスクライブできるようにします。
- ビジネスニーズに最適な複雑なライセンスモデルを作成します。

## OpenLMによるHASPの監視

原則として、OpenLMはバージョン5.0以降のSentinel HASPをサポートしています。とはいえ、詳細な説明が必要です。OpenLMは、HASP（Sentinel）Admin Control CenterのWebインターフェイスとインターフェイスします。

Sentinelドライバー（および多数あります）は、内部からAdmin Control Centerとインターフェイスする必要があります。したがって、Admin Control Centerでライセンス使用状況レポートが表示される場合は、OpenLMで確実にサポートされています。Sentinel HASPに必要なOpenLMサーバー構成については、[この記事](../interfacing-articles/sentinel-hasp)を参照してください。