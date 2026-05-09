---
title: "Glossary"
sidebar_position: 998
description: "OpenLM ドキュメント全体で使用される主要な用語、略語、表現を定義します。"
---

# 用語集

OpenLM ドキュメント全体で使用される主要な用語・略語・表現を定義します。アルファベット順に整理しています。

## A

### Agents Hub（エージェントハブ）

組織全体の Workstation Agent を展開・設定・監視するための集中管理インターフェース。

**関連用語:** Workstation Agent、Broker Hub

### alerts（アラート）

ライセンスマネージャーが定義した条件に合致した際に通知を発する仕組み。使用率のしきい値、ライセンスの有効期限切れ、デナイアル（拒否）の監視に使用します。

**関連用語:** denied usage、license utilization

### API

Application Programming Interface の略。OpenLM はサードパーティシステムとの連携やライセンス管理の自動化に REST API を提供します。

## B

### borrowed license（借用ライセンス）

ライセンスサーバーからオフライン使用のために一時的にチェックアウトされたライセンス。返却または借用期間の満了まで他のユーザーは使用できません。

**関連用語:** floating license、linger time

### Broker（ブローカー）

ライセンスサーバー上またはその近傍に導入するコンポーネント。OpenLM とライセンスマネージャーとの通信を仲介し、ライセンス使用データを標準化して OpenLM Platform に送信します。

Cloud Broker と混同しないでください。Cloud Broker は SaaS プラットフォームに API 経由で接続します。

**関連用語:** Broker Hub、Cloud Broker、license server

### Broker Hub（ブローカーハブ）

License Server Broker を展開・設定・監視するための集中管理インターフェース。Broker 接続の管理、バージョンの更新、稼働状況の確認に使用します。

**関連用語:** Broker、Agents Hub

## C

### CCL（Currently Consumed Licenses：現在消費中のライセンス）

監視対象ライセンスサーバー全体のアクティブなセッションをリアルタイムで表示するビュー。どのライセンスが誰によってどのワークステーションからチェックアウトされているかを確認できます。

**関連用語:** concurrent usage、session、real-time reports

### Cloud Broker（クラウドブローカー）

SaaS やクラウドベースのプラットフォームに API 経由で接続し、使用データを収集する Broker の一種。ライセンスサーバーへのインストールは不要です。

オンプレミスのライセンスマネージャーを監視する Broker と混同しないでください。

**関連用語:** Broker、Subscription Optimizer

### Compliance Service（コンプライアンスサービス）

ライセンス使用状況を地理的に監視し、地域ごとのライセンス契約や制限への準拠を検証するサービス。

**関連用語:** license entitlement、SAM

### component（コンポーネント）

コア OpenLM Platform とは独立して展開され、機能を拡張するソフトウェアモジュール。Broker、Workstation Agent、Directory Sync Agent などがあります。

**関連用語:** Broker、Workstation Agent、DSA

### concurrent usage（同時使用数）

任意の時点で使用中のライセンス数。同時使用数の監視により、ピーク需要期の特定やライセンス割り当ての最適化が可能になります。

別名: simultaneous usage（同時利用）。

**関連用語:** floating license、license utilization、CCL

## D

### denied usage（デナイアル・拒否）

ユーザーがライセンスのチェックアウトを試みたが、利用可能なライセンスがすべて使用中のためブロックされた際に記録されるイベント。デナイアルを追跡することで、追加購入やポリシー変更の正当性を立証できます。

別名: license denial（ライセンス拒否）。

**関連用語:** concurrent usage、license utilization

### Dongle Monitoring（ドングルモニタリング）

組織全体のワークステーションに接続されている USB ハードウェアライセンスキー（ドングル）を追跡する OpenLM 製品。ドングルの所在、使用状況、可用性を可視化します。

**関連用語:** license manager、usage monitoring

### DSA（Directory Sync Agent：ディレクトリ同期エージェント）

オンプレミスに導入し、ローカルのディレクトリサービス（Active Directory や LDAP など）のユーザー・グループデータを Directory Sync Service と同期するエージェント。

**関連用語:** DSS、Identity Alignment

### DSS（Directory Sync Service：ディレクトリ同期サービス）

ユーザーディレクトリを OpenLM と同期するプラットフォームサービス。自動的なユーザープロビジョニングやグループベースのライセンスアクセスポリシーを実現します。

**関連用語:** DSA、Identity Alignment

## E

### Enrichment Service（エンリッチメントサービス）

生の使用データを処理し、ユーザー ID、プロジェクト割り当て、デナイアル分類などの補足情報を付加するプラットフォームマイクロサービス。

**関連用語:** microservice、usage monitoring

## F

### feature（フィーチャ）

OpenLM が追跡するライセンス対象ソフトウェアの特定の機能・モジュール・ケイパビリティ。たとえば、1 つのソフトウェア製品に複数のフィーチャが含まれ、それぞれが個別のライセンスまたはトークンを消費することがあります。

OpenLM の製品・サービスを指す product（プロダクト）と混同しないでください。

**関連用語:** product、license file

### floating license（フローティングライセンス）

ネットワーク上のユーザー間で共有されるライセンス。ユーザーがアプリケーションを開くとチェックアウトされ、終了するとプールに返却されます。同時使用可能なユーザー数はライセンス数によって制限されます。

別名: concurrent license（コンカレントライセンス）、network license（ネットワークライセンス）。

**関連用語:** named user license、node-locked license、concurrent usage

## G

### Gateway（ゲートウェイ）

ユーザーやコンポーネントが OpenLM Platform にアクセスするための DNS または FQDN エントリポイント。

**関連用語:** OpenLM Platform、on-premises

## H

### historical reports（履歴レポート）

過去の一定期間におけるライセンス使用状況を分析するレポート。使用トレンドの把握、需要予測、ライセンス監査への対応に活用します。

**関連用語:** real-time reports、license utilization

## I

### Identity Alignment（アイデンティティアラインメント）

組織のディレクトリでユーザーが無効化された際に、外部サービスから自動的にユーザーを削除またはプロビジョニング解除する OpenLM 製品。旧称: OneDirectorySync。

新しいドキュメントでは「OneDirectorySync」を使用しないでください。

**関連用語:** DSA、DSS

### idle time（アイドル時間）

ライセンスがチェックアウトされたまま、関連するアプリケーションが実際には使用されていない時間。アイドルライセンスを特定することで、未活用リソースの回収が可能になります。

**関連用語:** License Harvesting、session、license utilization

## L

### LAC（License Access Control：ライセンスアクセス制御）

オプションファイルを使用してライセンスアクセスルールを適用するポリシー駆動の機能。管理者は、ユーザー、グループ、またはワークステーションの属性に基づいて、特定のライセンスへのアクセス権限を定義できます。

**関連用語:** options file、LFM

### LFM（License File Management：ライセンスファイル管理）

管理対象のライセンスサーバー全体にわたり、中央インターフェースからライセンスファイルの表示・編集・配布を行う機能。

**関連用語:** license file、LAC

### license chargeback（ライセンスチャージバック）

OpenLM が収集した実際の使用データに基づいて、ソフトウェアライセンスコストを特定の部門、チーム、またはプロジェクトに割り当てる手法。

**関連用語:** project、license utilization

### license compliance（ライセンスコンプライアンス）

ソフトウェアの使用が購入済みライセンス契約の条件に適合しているかを検証するプロセス。OpenLM は使用状況の追跡、エンタイトルメントとの比較、デナイアルレポートを通じてコンプライアンス監視を支援します。

別名: software license compliance（ソフトウェアライセンスコンプライアンス）、license audit readiness（ライセンス監査対応）。

**関連用語:** license entitlement、Compliance Service、SAM

### license entitlement（ライセンスエンタイトルメント）

購入済みライセンス権利の記録。シート数、ライセンスされたフィーチャ、有効期間などの情報を含みます。エンタイトルメントを実際の使用状況と比較することで、過剰ライセンスや不足ライセンスを把握できます。

**関連用語:** license compliance、license file、SAM

### license file（ライセンスファイル）

ライセンス数、有効化されたフィーチャ、有効期限、使用制限などのライセンス情報を含むデジタルドキュメント。ソフトウェアベンダーが発行し、ライセンスサーバーに配布されます。

**関連用語:** LFM、license entitlement、license server

### License Harvesting（ライセンスハーベスティング）

ソフトウェアをアクティブに使用していないユーザーからアイドル状態のフローティングライセンスを回収するプロセス。追加シートの購入なしにライセンスの実効的な可用性を高めます。

**関連用語:** idle time、floating license

### license manager（ライセンスマネージャー）

ライセンスの配布と使用を制御し、同時使用数が購入上限を超えないようにするソフトウェア。OpenLM は FlexNet（FlexLM）、IBM LUM、Sentinel RMS、Reprise RLM、LM-X、DSLS をはじめ、多数のライセンスマネージャーを監視します。

**関連用語:** license server、Broker

### license pool（ライセンスプール）

同じ種類のライセンスが同時使用のために利用可能なグループ。ライセンスプールはライセンスマネージャーにより定義され、フィーチャ、サーバー、またはユーザーグループで制限できます。

**関連用語:** floating license、concurrent usage

### license server（ライセンスサーバー）

ライセンスマネージャーソフトウェアをホストし、ネットワーク全体でライセンスの配布と認証を処理するサーバー。

ライセンスサーバーと併設される OpenLM コンポーネントである Broker と混同しないでください。

**関連用語:** license manager、Broker

### license utilization（ライセンス使用率）

利用可能なライセンスのうち、時間経過に伴い使用中のライセンス数を示す指標。使用効率の評価、更新の正当化、最適化機会の特定に役立ちます。

**関連用語:** concurrent usage、idle time、historical reports

### linger time（リンガータイム）

アプリケーション終了後もライセンスがチェックアウト状態のまま保持される猶予期間。リンガータイムはライセンスマネージャーで設定され、高速なチェックアウト／チェックインサイクルを防止します。

**関連用語:** floating license、borrowed license、idle time

## M

### microservice（マイクロサービス）

特定のタスクを実行する独立したソフトウェアサービス。OpenLM Platform のマイクロサービスアーキテクチャの一部を構成します。各マイクロサービスはデータエンリッチメント、レポーティング、ディレクトリ同期など固有の機能を担当します。

**関連用語:** OpenLM Platform、Enrichment Service

## N

### named user license（指名ユーザーライセンス）

特定の個人に割り当てられたライセンス。現在使用中かどうかにかかわらず、そのユーザーのみがソフトウェアにアクセスできます。

**関連用語:** floating license、node-locked license

### node-locked license（ノードロックライセンス）

MAC アドレスやホスト ID などのハードウェア属性で識別される特定のマシンに紐づけられたライセンス。そのマシンでのみソフトウェアを実行できます。

**関連用語:** floating license、named user license

## O

### on-premises（オンプレミス）

物理サーバー、仮想マシン、プライベートクラウド環境など、組織自身のインフラストラクチャにホストされる OpenLM ソフトウェア。オンプレミス展開により、データとネットワーク構成を完全にコントロールできます。

「on-premise」や「on premise」ではなく「on-premises」と表記してください。

**関連用語:** OpenLM Platform、Gateway

### OpenLM Platform（OpenLM プラットフォーム）

エンジニアリングライセンス管理、SAM、SaaS 管理のための OpenLM のサービスと製品を包括するコアシステム。マイクロサービスアーキテクチャで構築され、クラウド（SaaS）またはオンプレミスで展開できます。

同じページまたはセクション内で最初に「OpenLM Platform」と記載してから、以降「Platform」のみで使用してください。

**関連用語:** microservice、Gateway、on-premises

### OpenLM token（OpenLM トークン）

OpenLM の特定の機能にアクセスし使用するための、柔軟で再利用可能な計量単位。OpenLM トークンは OpenLM システム内のライセンスエンタイトルメントの一形態です。

**関連用語:** license entitlement、token-based licensing

### options file（オプションファイル）

ライセンスアクセスポリシーを制御するための FlexNet 設定ファイル。INCLUDE、EXCLUDE、RESERVE ディレクティブなどのルールを定義し、特定のライセンスにアクセスできるユーザーやグループを管理します。

別名: FlexNet options file（FlexNet オプションファイル）。

**関連用語:** LAC、license manager

## P

### perpetual licensing（永続ライセンス）

ソフトウェアを無期限で使用できるライセンスモデル。通常、初期費用と任意の年間メンテナンス料金が発生します。OpenLM では、オンプレミス展開でのみ利用可能です。

**関連用語:** subscription licensing、token-based licensing

### Process Manager（プロセスマネージャー）

ワークステーション上でアプリケーションのプロセスレベルの使用を追跡するコンポーネント。実行中のアプリケーションとライセンス消費に関する詳細な可視性を提供します。

**関連用語:** Workstation Agent、usage monitoring

### product（プロダクト）（OpenLM）

OpenLM が提供する個別の製品。コア製品またはオプション製品があり、有効化するとシステムリソースを消費する場合があります。例: Dongle Monitoring、Software License Management、Identity Alignment。

サードパーティライセンスソフトウェアの機能を指す feature（フィーチャ）と混同しないでください。

**関連用語:** feature、OpenLM Platform

### project（プロジェクト）

チーム、部門、またはコストセンター別にライセンス使用データを整理するための OpenLM の分類方法。プロジェクトにより、ライセンスチャージバックや使用状況の帰属レポートが可能になります。

**関連用語:** license chargeback、historical reports

## R

### real-time reports（リアルタイムレポート）

現在のライセンス使用状況、可用性、デナイアルの最新ビューを提供するレポート。日常的なライセンス監視のために履歴レポートを補完します。

**関連用語:** historical reports、CCL

### role（ロール）

OpenLM システム内でユーザーに割り当てられる権限とアクセスレベルの名前付きセット。ロールにより、ユーザーが表示・管理できる機能やデータを制御します。

**関連用語:** user

## S

### SAM（Software Asset Management：ソフトウェア資産管理）

組織全体のソフトウェアエンタイトルメント、調達、コスト、コンプライアンスを追跡する手法および OpenLM 製品。SAM はライセンス使用データと購買記録を連携し、コスト削減の機会を特定します。

**関連用語:** SLM、license compliance、license entitlement

### session（セッション）

OpenLM が追跡するユーザーのアクティブなソフトウェア使用インスタンス。開始時刻、終了時刻、アプリケーション、フィーチャ、ライセンスサーバー、ワークステーションなどの情報を含みます。セッションは使用レポートの基礎となるデータ単位です。

**関連用語:** concurrent usage、CCL、idle time

### SLM（Software License Management：ソフトウェアライセンス管理）

組織全体のソフトウェアライセンス使用を監視・追跡・管理するための OpenLM のコア製品。

**関連用語:** SAM、license manager、license utilization

### subscription licensing（サブスクリプションライセンス）

定期的な料金で一定期間（月次、年次）ソフトウェアをライセンスするモデル。サブスクリプションライセンスは更新しない限り期間終了時に失効します。

**関連用語:** perpetual licensing、Subscription Optimizer

### Subscription Optimizer（サブスクリプションオプティマイザー）

SaaS サブスクリプションのシート再割り当てを自動化する OpenLM 製品。非アクティブな指名ユーザーシートを特定して回収し、Autodesk Cloud や LinkedIn Sales Navigator などのプラットフォームでの無駄を削減します。

**関連用語:** subscription licensing、Cloud Broker

## T

### token-based licensing（トークンベースライセンス）

使用するアプリケーションやフィーチャに応じてトークンの共有プールが消費されるライセンスモデル。フィーチャごとに消費されるトークン量が異なります。Autodesk Token Flex や Altair HyperWorks Units などがあります。

**関連用語:** floating license、OpenLM token

## U

### usage monitoring（使用状況モニタリング）

ライセンス消費を分析・最適化するためにソフトウェア使用を追跡・記録するプロセス。OpenLM はオンプレミスのライセンスマネージャー、SaaS プラットフォーム、クラウドサービス全体の使用を監視します。

**関連用語:** license utilization、SLM、session

### user（ユーザー）

OpenLM が追跡するライセンスソフトウェアを使用する個人。名前、部門、メールアドレス、関連するワークステーションなどの属性がレポーティングとアクセス制御のために記録されます。

**関連用語:** role、session、named user license

## V

### VLM（Virtual License Manager：仮想ライセンスマネージャー）

物理的なライセンスサーバーを必要とせずにライセンスを割り当てる機能。VLM は OpenLM 内で完全に管理される仮想ライセンスプールを作成します。現在は FlexNet Embedded ライセンスに対応しています。

**関連用語:** license manager、license pool

## W

### workstation（ワークステーション）

ユーザーがライセンスソフトウェアにアクセスするコンピュータまたはデバイス。OpenLM はワークステーションの属性を追跡し、組織全体のライセンス使用状況をマッピングします。

**関連用語:** Workstation Agent、user

### Workstation Agent（ワークステーションエージェント）

エンドユーザーのワークステーションにインストールする軽量なソフトウェアプログラム。ソフトウェアライセンス使用データを収集し、Agents Hub 経由で OpenLM Platform に送信します。

**関連用語:** Agents Hub、Process Manager、workstation
