---
title: "Glossary"
sidebar_position: 998
toc_max_heading_level: 2
description: "ソフトウェアライセンス管理、OpenLM Platform、ライセンスマネージャー、ソフトウェアベンダー、IT・SAM・AI に関する、OpenLM ドキュメント全体で使われる用語を定義します。"
---

この用語集では、OpenLM でソフトウェアライセンスを管理する際に登場する用語・略語・製品名を定義します。ライセンスモデル、ライセンスの基本概念、OpenLM の製品と機能、OpenLM が接続するサードパーティのライセンスマネージャー、監視対象ソフトウェアのベンダー、そして関連する IT 資産管理・コンプライアンス・AI の概念までを網羅しています。

各項目は単独で読めるように記述しています。各用語の下にあるカテゴリーラベルは、その用語が属する分野を示します（例: *OpenLM 機能*、*ライセンスマネージャー*、*ソフトウェアベンダー*）。

## 文字から探す

[A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [K](#k) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v) · [W](#w)

## A

### Active Directory (AD)（アクティブディレクトリ）

*IT・SAM・連携*

Windows ネットワークのユーザー、グループ、コンピューターのアカウントを保存する Microsoft のディレクトリサービス。OpenLM は Directory Synchronization Agent を通じて Active Directory からユーザーとグループを同期し、ライセンス使用状況とアクセスルールを実際の組織の ID に対応付けます。

### Actual Usage（実使用）

*OpenLM 機能*

ライセンスがチェックアウトされている時間だけでなく、ソフトウェアが実際に使用されている時間を報告する OpenLM の機能。チェックアウト時間と実際の操作を比較することで、回収・再割り当てが可能なアイドルセッションを明らかにします。

### Adobe（アドビ）

*ソフトウェアベンダー*

主に Creative Cloud サブスクリプションでライセンスされる、クリエイティブおよびドキュメント関連ソフトウェアのベンダー。OpenLM Subscription Optimizer は未使用の Adobe シートを特定し、チームが実際に使用する分だけを支払えるようにします。

### AEC (architecture, engineering, and construction)（建築・エンジニアリング・建設）

*業界・分野*

Revit、MicroStation、Civil 3D などのツールを使って物理的な環境を設計・建設する業界分野。AEC 企業は、OpenLM が監視する大規模なライセンス管理ソフトウェア資産を運用しています。

### Agent (OpenLM Agent)（エージェント）

*OpenLM コンポーネント*

Workstation Agent の旧称。エンドユーザーのワークステーションにインストールし、ライセンス使用データを収集する OpenLM クライアントです。新しいドキュメントでは「Workstation Agent」を使用してください。Workstation Agent を参照してください。

### Agent Activity Manager（エージェントアクティビティマネージャー）

*OpenLM コンポーネント*

アクティブな Workstation Agent が稼働しているワークステーションを追跡する OpenLM サービス。License Access Control は展開時にこのサービスへ問い合わせ、個別ユーザー向けルールを割り当てる前に、ユーザーのマシンで Workstation Agent が稼働していることを確認します。

### Agents Hub（エージェントハブ）

*OpenLM コンポーネント*

組織全体の Workstation Agent を展開・設定・監視するための中心的な OpenLM インターフェース。Workstation Agent は Agents Hub を通じて使用データを OpenLM Platform に報告します。

**関連用語:** Workstation Agent、Broker Hub

### AI FinOps

*AI・連携*

ファイナンシャルオペレーション（FinOps）の手法を AI ツールに適用する OpenLM の機能。大規模言語モデル（LLM）のトークン消費を、リアルタイムのトークン帰属によってプロジェクト、チーム、ユーザーに割り当てます。これにより、エンジニアリング組織は従来のソフトウェア支出と並行して AI 予算を予測可能に保てます。

### Alerts (OpenLM Alerts)（アラート）

*OpenLM 機能*

ライセンスの空きが少ない、有効期限が近づいているなどの条件を管理者が定義し、その条件が満たされたときに通知を受け取れるようにする OpenLM の自動化機能。Alerts により、不足がデナイアル（拒否）を引き起こす前にチームが対処できます。

**関連用語:** denied usage、license utilization

### Allocation（割り当て）

*ライセンスの概念*

特定のライセンスを、特定のユーザー、グループ、デバイス、またはプロジェクトに割り当てること。OpenLM では、License Access Control による割り当てにより、必要とする人のために容量を確保し、優先度の低いユーザーが共有プールを使い切るのを防ぎます。

### Allowlist（許可リスト）

*ライセンスの概念*

あるフィーチャへのアクセスを明示的に許可されたユーザーまたはグループのリストで、ブロックリストの反対。OpenLM Compliance と License Access Control は許可リストを使用し、許可されたユーザーだけが高価なエンジニアリングツールにアクセスできるようにします。

### Altair（アルテア）

*ソフトウェアベンダー*

HyperWorks Units と呼ばれるユニットベースのライセンスモデルを採用する、シミュレーションおよびデータ分析ソフトウェアのベンダー。OpenLM は、ホスト型 HyperWorks ユニットを含む Altair のライセンスを監視します。

### Annapurna（アンナプルナ）

*プラットフォーム・アーキテクチャ*

OpenLM Platform のマイクロサービス世代を指すリリース名。マイクロサービスアーキテクチャ上に構築され、パフォーマンスとスケーラビリティのために AI で強化された Annapurna は、OpenLM スイート全体のライセンス管理と監視の中核となるシステムです。OpenLM は主要なリリースに山の名前を付けています。

### Ansys（アンシス）

*ソフトウェアベンダー*

構造、流体、エレクトロニクス、マルチフィジックス解析向けのエンジニアリングシミュレーションソフトウェアのベンダー。Ansys のライセンスは価値が高く、OpenLM で監視されることが一般的です。

### API (application programming interface)

*IT・SAM・連携*

外部システムがプラットフォームに対してプログラムから読み書きできるようにする、定義済みのエンドポイントの集合。OpenLM は API を公開し、顧客がライセンスデータを IT サービス管理、ビジネスインテリジェンス、調達システムと連携できるようにします。

### Asset (License Access Control)（アセット）

*OpenLM コンポーネント*

License Access Control において、管理対象のライセンスソースを識別する、ホスト、ポート、ライセンスマネージャーの種類、オプションファイルの一意の組み合わせ。ルールとポリシーはアセットに紐づき、1 つのアセットに対して同時に有効なポリシーは 1 つだけです。

### Audit (software license audit)（ソフトウェアライセンス監査）

*IT・SAM・コンプライアンス*

多くの場合ソフトウェアベンダーが開始する正式なレビューで、組織が契約条件の範囲内でライセンスを使用しているかを検証します。OpenLM は完全な使用履歴を保持し、適正な使用を示す証跡をエクスポートすることで、監査対応を支援します。

### Autodesk（オートデスク）

*ソフトウェアベンダー*

AutoCAD、Revit、Token-Flex プログラムなどを含む、設計・エンジニアリングソフトウェアのベンダー。Autodesk は指名ユーザーおよびトークンベースのモデルへ移行しており、OpenLM はこれらを監視してサブスクリプションの無駄を削減します。

### Autodesk Cloud

*ライセンスマネージャー*

指名ユーザーサブスクリプション向けの、Autodesk のクラウドベースライセンスサービス。OpenLM は Autodesk Cloud と連携して割り当てと使用状況を報告し、対応するクラウドライセンスソースへアクセスポリシーを展開します。

### Autodesk Token-Flex

*ライセンスマネージャー*

製品ごと・時間ごとに消費されるトークンに基づいて使用量を課金する、Autodesk の従量制プログラム。OpenLM は Token-Flex の消費を報告し、チームが支出を予測して予算超過を回避できるようにします。

## B

### Bentley Systems（ベントレーシステムズ）

*ソフトウェアベンダー*

MicroStation や OpenRoads 製品ラインを含む、インフラエンジニアリングソフトウェアのベンダー。Bentley のライセンスはエンタイトルメントに対して使用量を計測し、超過課金が発生する場合があります。OpenLM は監視とアラートによってこれを防止します。

### BetaLM

*ライセンスマネージャー*

一部のエンジニアリングアプリケーションで使用されるライセンスマネージャー。OpenLM は BetaLM の使用状況、デナイアル、有効期限を監視します。

### BI Services (OpenLM BI Services)（BI サービス）

*OpenLM サービス*

ライセンスデータからカスタムのビジネスインテリジェンスレポートやダッシュボードを構築する OpenLM サービス。経営層が組織にとって重要な指標を確認できるようにします。

### BIM (building information modeling)（ビルディングインフォメーションモデリング）

*業界・分野*

建物やインフラのデジタル表現を作成・管理するプロセス。Revit や MicroStation などの BIM ツールは高価なライセンス管理アプリケーションであり、OpenLM の顧客が監視しています。

### Blocklist（ブロックリスト）

*ライセンスの概念*

あるフィーチャへのアクセスを明示的に拒否されたユーザーまたはグループのリストで、許可リストの反対。License Access Control はブロックリストルールを生成し、指定したユーザーをプレミアムライセンスから除外できます。

### Borrowed license（借用ライセンス）

*ライセンスの概念*

オフライン使用のために共有プールから一時的にチェックアウトされ、一定期間後に返却されるライセンス。コミューターライセンスとも呼ばれます。OpenLM は借用ライセンスを報告し、他のユーザーが使用できない容量を管理者が把握できるようにします。

**関連用語:** floating license、linger time

### Broad Peak（ブロードピーク）

*プラットフォーム・アーキテクチャ*

OpenLM Platform のリリース名の 1 つ。Annapurna と同様に、OpenLM は主要なリリースに山の名前を付けています。

### Broker (OpenLM Broker)（ブローカー）

*OpenLM コンポーネント*

ライセンスサーバーごとにインストールされ、ライセンスマネージャーと通信してその使用データを標準形式に変換する、仲介的な OpenLM コンポーネント。Broker は License Access Control 用のオプションファイルを展開し、オプションファイルの変更も監視します。

Cloud Broker と混同しないでください。Cloud Broker は SaaS およびクラウドプラットフォームに API 経由で接続します。

**関連用語:** Broker Hub、Cloud Broker、license server

### Broker Hub（ブローカーハブ）

*OpenLM コンポーネント*

Broker ホストの登録、承認、管理を行う OpenLM のサービスおよびインターフェース。Broker の展開・更新や稼働状況の確認に使用します。License Access Control がアセットを検出・管理するには、事前にホストを Broker Hub で承認する必要があります。

**関連用語:** Broker、Agents Hub

## C

### CAD (computer-aided design)（コンピューター支援設計）

*業界・分野*

AutoCAD、SOLIDWORKS、Creo など、精密な 2D・3D 設計を作成するために使用されるソフトウェア。CAD ツールは、OpenLM が管理対象とする専門アプリケーションの 1 つです。

### CAE (computer-aided engineering)（コンピューター支援エンジニアリング）

*業界・分野*

有限要素解析や数値流体力学のツールを含む、エンジニアリング設計のシミュレーションと検証に使用されるソフトウェア。CAE ライセンスは高価であり、綿密な使用状況の監視が有効です。

### CAM (computer-aided manufacturing)（コンピューター支援製造）

*業界・分野*

設計を製造用の機械命令に変換するソフトウェア。CAM アプリケーションはライセンスサーバーで提供されることが多く、OpenLM が追跡します。

### CCL (Currently Consumed Licenses)（現在消費中のライセンス）

*レポート・指標*

監視対象ライセンスサーバー全体のアクティブなライセンスセッションをリアルタイムで表示するビュー。どのライセンスが、誰によって、どのワークステーションからチェックアウトされているかを確認できます。

**関連用語:** concurrent usage、session、real-time reports

### CFD (computational fluid dynamics)（数値流体力学）

*業界・分野*

液体と気体の流れをモデル化するシミュレーション手法。Ansys Fluent などの CFD ツールは、価値の高いライセンス管理アプリケーションです。

### Chargeback（チャージバック）

*レポート・指標*

ソフトウェアコストを、それを消費するチーム、部門、またはプロジェクトに配分する会計手法。OpenLM Projects は、ライセンス使用を組織単位に帰属させることでチャージバックを支援します。

**関連用語:** project、license utilization

### Check-in (license check-in)（チェックイン）

*ライセンスの概念*

アプリケーションの終了時やセッションの終了時に、ライセンスを共有プールへ返却すること。速やかなチェックインは容量を空いた状態に保ち、OpenLM はハーベスティングによってアイドルセッションのチェックインを強制できます。

### Checkout (license checkout)（チェックアウト）

*ライセンスの概念*

アプリケーションがライセンスサーバーにライセンスを要求して受け取る瞬間。ライセンスマネージャーはチェックアウト時にアクセスルールを適用し、License Access Control はこのタイミングでポリシーを適用します。

### Cloud Broker（クラウドブローカー）

*OpenLM コンポーネント*

SaaS やクラウドベースのプラットフォームに API 経由で接続し、使用データを収集する Broker の一種。ライセンスサーバーへのインストールは不要です。

オンプレミスのライセンスマネージャーを監視する Broker と混同しないでください。

**関連用語:** Broker、Subscription Optimizer

### Cloud deployment（クラウド展開）

*プラットフォーム・アーキテクチャ*

ローカルインフラを管理せずにスケーラブルに運用するために、OpenLM Platform をクラウドでホストすること。OpenLM はクラウド、オンプレミス、ハイブリッドの展開に対応しています。

### CodeMeter（コードメーター）

*ライセンスマネージャー*

ハードウェア（CmDongle）とソフトウェア（CmActLicense）のコンテナーを使用する、Wibu-Systems のライセンス・保護システム。OpenLM は、借用ライセンスや有効期限を含む CodeMeter の使用状況を監視します。

### Commuter license（コミューターライセンス）

*ライセンスの概念*

オフライン使用のためにチェックアウトされ、後で返却される borrowed license（借用ライセンス）の別名。Borrowed license を参照してください。

### Compliance (license compliance)（ライセンスコンプライアンス）

*IT・SAM・コンプライアンス*

ソフトウェアをライセンス契約の条件の範囲内で使用している状態。OpenLM は、アクセスルールの適用、真のデナイアルや過剰使用の報告、監査証跡の作成を通じてコンプライアンスを支援します。実現できる内容は、各顧客の契約、地域、構成によって異なります。

別名: software license compliance（ソフトウェアライセンスコンプライアンス）、license audit readiness（ライセンス監査対応）。

**関連用語:** license entitlement、Compliance Service、SAM

### Compliance Service（コンプライアンスサービス）

*OpenLM コンポーネント*

ライセンス使用状況を地理的に監視し、地域ごとのライセンス契約や制限への準拠を検証する OpenLM マイクロサービス。

**関連用語:** license compliance、license entitlement、SAM

### Component (OpenLM)（コンポーネント）

*プラットフォーム・アーキテクチャ*

コアの OpenLM Platform とは独立して展開され、その適用範囲を拡張するソフトウェアモジュール。OpenLM Broker、Workstation Agent、Directory Synchronization Agent などがあります。

**関連用語:** Broker、Workstation Agent、DSA

### Concurrent license（コンカレントライセンス）

*ライセンスモデル*

共有プールから取得され、許可された任意のユーザーが先着順で利用できるライセンス。コンカレントライセンスとフローティングライセンスに機能的な違いはありません。Floating (concurrent) license を参照してください。

### Concurrent usage（同時使用数）

*レポート・指標*

ある時点で使用中のライセンス数。ピーク時の同時使用数は、フローティングライセンスプールを適正化するための重要な指標です。

別名: simultaneous usage（同時利用）。

**関連用語:** floating license、license utilization、CCL

### Consultancy Services (OpenLM Consultancy Services)（コンサルティングサービス）

*OpenLM サービス*

ライセンス管理戦略の設計、支出の最適化、監査への準備を支援する OpenLM のアドバイザリーサービス。

### Cost-per-active-user（アクティブユーザー単価）

*レポート・指標*

ライセンスコストを、購入したシート数ではなく実際にソフトウェアを使用したユーザー数で割る指標。ツールの真のコストを明らかにし、正確な部門チャージバックを支援します。

### Custom Commands（カスタムコマンド）

*OpenLM 機能*

ユーザーへの通知やアイドルセッションの解放など、ライセンスイベントに応じて事前定義のスクリプトやアクションを実行する OpenLM の機能。

## D

### Dassault Systèmes（ダッソー・システムズ）

*ソフトウェアベンダー*

CATIA、SOLIDWORKS、SIMULIA、DELMIA を含む、設計・シミュレーション・製品ライフサイクル管理ソフトウェアのベンダー。Dassault 製品は DS License Server（DSLS）で提供され、OpenLM が監視・管理します。

### Denial (license denial)（デナイアル）

*ライセンスの概念*

ユーザーがソフトウェアを要求したものの、利用可能なライセンスがない事象。デナイアルを追跡すると、容量を増やすべきか、割り当てを改善すべきかが分かります。true denial（真のデナイアル）と比較してください。

### Denied usage（拒否された使用）

*レポート・指標*

利用可能なライセンスがすべて使用中であったために、ライセンスアクセスがブロックされた記録。OpenLM は拒否された使用を報告し、チームが不足を定量化できるようにします。

別名: license denial（ライセンス拒否）。

**関連用語:** concurrent usage、license utilization

### Deployment (License Access Control)（デプロイメント）

*OpenLM コンポーネント*

License Access Control において、ルールをオプションファイルにコンパイルし、Broker を通じてライセンスサーバーへ送信する操作。デプロイメントは手動またはスケジュール実行が可能で、OpenLM は監査のために各実行を記録します。

### Directory Synchronization Agent (DSA)（ディレクトリ同期エージェント）

*OpenLM コンポーネント*

Active Directory または LDAP からユーザー、グループ、組織構造をインポートする OpenLM コンポーネント。DSA は OpenLM の ID をディレクトリと整合させ、使用記録とアクセスルールが実際の組織を反映するようにします。

**関連用語:** DSS、Identity Alignment

### Docker（ドッカー）

*プラットフォーム・アーキテクチャ*

ソフトウェアをコンテナーにパッケージ化するプラットフォーム。OpenLM Platform はコンテナー化されたマイクロサービスとして提供され、クラウド、オンプレミス、ハイブリッドで一貫した展開を可能にします。

### Dongle（ドングル）

*ライセンスの概念*

保護されたソフトウェアの実行に必要な、通常は USB デバイスの物理ハードウェアキー。ドングルは紛失したり引き出しに死蔵されたりすることがあるため、OpenLM はネットワーク全体の USB ポートを監視して所在を特定し、ソフトウェアが実際に使用されているかを確認します。

### Dongle Monitoring（ドングルモニタリング）

*OpenLM 製品*

ネットワーク全体のハードウェアドングルを追跡し、どのユーザーが特定のドングルを保持しているか、関連するソフトウェアが使用中かどうかを表示する OpenLM 製品。物理的なライセンスキーを、ネットワークライセンスと同じ可視性のもとに置きます。

**関連用語:** license manager、usage monitoring

### DSLS (Dassault Systèmes License Server)

*ライセンスマネージャー*

CATIA や SOLIDWORKS など Dassault Systèmes 製品向けのライセンスマネージャー。OpenLM は、デナイアルレポート、借用ライセンスレポート、トークン対応、割り当て、サーバー冗長化対応を備えた DSLS の監視を提供します。

### DSS (Directory Sync Service)（ディレクトリ同期サービス）

*OpenLM コンポーネント*

ユーザーディレクトリを OpenLM と同期するプラットフォームサービス。自動的なユーザープロビジョニングやグループベースのライセンスアクセスポリシーを有効にします。オンプレミスの Directory Synchronization Agent が Directory Sync Service にデータを供給します。

**関連用語:** Directory Synchronization Agent、Identity Alignment

## E

### EDA (electronic design automation)（電子設計自動化）

*業界・分野*

Cadence、Synopsys、Siemens EDA などのベンダーが提供する、集積回路や電子システムを設計するためのソフトウェア。EDA ライセンスは企業が購入するソフトウェアの中でも特に高価であり、監視の価値が高くなります。

### Engineering license management（エンジニアリングライセンス管理）

*ライセンスの概念*

専門的なエンジニアリングおよび科学技術ソフトウェアのライセンスを監視・制御する分野。OpenLM の中核的な焦点であり、フローティング、トークン、ドングルといったモデルがあるため、一般的な IT ソフトウェア管理とは異なります。

### Engineering License Management Service（エンジニアリングライセンス管理サービス）

*OpenLM サービス*

OpenLM の専門家が顧客に代わってエンジニアリングライセンス管理を運用し、プラットフォームと専門的な運用を組み合わせる OpenLM サービス。

### Enrichment Service（エンリッチメントサービス）

*OpenLM コンポーネント*

生の使用データを処理し、ユーザー ID、プロジェクト割り当て、デナイアル分類などの補足情報を付加する OpenLM マイクロサービス。

**関連用語:** microservice、usage monitoring

### Entitlement（エンタイトルメント）

*ライセンスの概念*

組織が購入した権利の集合。シート数、対象フィーチャ、有効期間などを指します。エンタイトルメント単位でライセンスを管理することで、個別の割り当てではなくロールに基づいてアクセスを付与できます。

**関連用語:** license compliance、license file、SAM

### Esri（エスリ）

*ソフトウェアベンダー*

ArcGIS 地理情報システムのベンダー。OpenLM は、ArcGIS Online を含む ArcGIS の指名ユーザーおよびコンカレントライセンスを監視します。

### EULA (end-user license agreement)（エンドユーザーライセンス契約）

*IT・SAM・コンプライアンス*

許可されるユーザー、フィーチャ、展開形態など、ソフトウェア製品の使用条件を定める法的契約。コンプライアンスは EULA に照らして測定されます。

### EXCLUDE

*OpenLM コンポーネント*

指定したユーザー、グループ、またはホストにフィーチャを拒否するオプションファイルのディレクティブ。License Access Control は EXCLUDE ルールを生成し、優先度の低いユーザーが予約済みの容量を消費しないようにします。

### Expiration monitoring（有効期限監視）

*ライセンスの概念*

予期しないアクセス喪失を防ぐために、ライセンスやメンテナンスの更新期日を追跡すること。OpenLM は有効期限を報告し、ライセンスが失効する前に管理者へ通知できます。

### External DB Support（外部 DB サポート）

*OpenLM 機能*

スケール、データ保持、ビジネスインテリジェンスツールとの連携のために、ライセンスデータを PostgreSQL や Microsoft SQL Server などの外部データベースに保存する OpenLM の機能。

## F

### FEA (finite element analysis)（有限要素解析）

*業界・分野*

構造を小さな要素に分割し、応力、熱、変形を予測するシミュレーション手法。Ansys Mechanical や Abaqus などの FEA ツールはライセンス管理され、頻繁に監視されます。

### Feature (license feature)（フィーチャ）

*ライセンスの概念*

ライセンスマネージャーが個別に制御する、ライセンス対象アプリケーションの特定の機能、モジュール、またはアドイン。OpenLM はフィーチャ単位で使用を追跡するため、どの製品かだけでなく、どの機能が実際に使われているかを把握できます。

OpenLM の提供物を指す product（プロダクト）と混同しないでください。

**関連用語:** product、license file

### Features Service（フィーチャサービス）

*OpenLM コンポーネント*

ライセンスフィーチャの正式なカタログを維持する OpenLM サービス。License Access Control はルールを展開する前に、フィーチャ名を Features Service と照合して検証します。

### FinOps

*IT・SAM・コンプライアンス*

エンジニアリング、財務、調達を連携させ、変動するテクノロジー支出に財務的な説明責任をもたらす分野。OpenLM は FinOps の考え方をソフトウェアライセンスに適用し、AI FinOps を通じて LLM のトークン消費にも適用します。

### Flexera（フレクセラ）

*ソフトウェアベンダー*

最も一般的なエンジニアリングライセンスマネージャーである FlexNet Publisher と、FlexNet Embedded を提供する企業。OpenLM は Flexera でライセンスされたソフトウェアを監視し、Flexera 環境と連携します。

### FlexNet (FLEXlm)

*ライセンスマネージャー*

エンジニアリングソフトウェアで最も広く使用されているライセンスマネージャー。当初は FLEXlm で、現在は Flexera FlexNet Publisher です。ベンダーデーモン、lmgrd ライセンスサーバープロセス、アクセス制御用のオプションファイルを使用します。OpenLM は、デナイアルレポート、借用、トークン対応、オプションファイル管理を備えた FlexNet の完全な監視を提供します。

### FlexNet Embedded (FNE)

*ライセンスマネージャー*

アプリケーションやデバイスに直接組み込まれる Flexera のライセンス技術。OpenLM は FNE と連携し、使用状況、借用、トークンを報告します。

### Floating (concurrent) license（フローティングライセンス）

*ライセンスモデル*

ユーザーのプール間で共有されるライセンス。アプリケーションを開くと中央サーバーにライセンスを要求し、閉じるとライセンスはプールに返却されて他のユーザーが使用できるようになります。フローティングライセンスはグローバルに分散したチームに適しており、OpenLM が最も頻繁に最適化するモデルです。

別名: concurrent license（コンカレントライセンス）、network license（ネットワークライセンス）。

**関連用語:** named user license、node-locked license、concurrent usage

## G

### Gateway（ゲートウェイ）

*プラットフォーム・アーキテクチャ*

ユーザーやコンポーネントが OpenLM Platform にアクセスするための、DNS または完全修飾ドメイン名（FQDN）のエントリポイント。

**関連用語:** OpenLM Platform、on-premises

### GIS (geographic information system)（地理情報システム）

*業界・分野*

空間・地理データの取得、分析、可視化を行うソフトウェアで、Esri ArcGIS が代表的です。GIS ライセンスは政府や公益事業で広く使用され、OpenLM で監視されることが一般的です。

### GraphQL

*AI・連携*

クライアントが必要なデータだけを正確に要求できる、クエリ言語およびデータレイヤー。OpenLM MCP Reporting Connector は、AI アシスタント向けに正確な分析データを取得するために GraphQL データレイヤーを使用します。

### Group Usage（グループ別使用状況）

*レポート・指標*

ライセンス使用を組織グループ別に集計する OpenLM レポート。チームや部門間で消費を比較できます。

### GSA (General Services Administration)（米国一般調達局）

*IT・SAM・コンプライアンス*

政府の購入者が承認済み製品を購入できるスケジュールを管理する米国連邦機関。OpenLM は GSA 契約ホルダーであり、公共部門の顧客の調達を簡素化します。

## H

### Hardlock

*ライセンスマネージャー*

ドングル方式のハードウェアベースのライセンスマネージャー。OpenLM は Hardlock の使用状況と有効期限を監視します。

### Harvesting (license harvesting)（ハーベスティング）

*ライセンスの概念*

アイドルセッションからライセンスを自動的に回収し、共有プールへ返却すること。OpenLM は非アクティブを検出し、ユーザーの作業を保存したうえでライセンスを解放できるため、アクティブな同僚が使用できるようになります。これにより、シートを追加購入することなく、無駄を容量に変えます。

**関連用語:** idle time、floating license

### Heat map（ヒートマップ）

*レポート・指標*

色の濃淡を使って、ライセンス需要がいつ・どこでピークに達するかを示す可視化。OpenLM は使用状況の可視化の 1 つとしてヒートマップを備えています。

### Hexagon（ヘキサゴン）

*ソフトウェアベンダー*

MSC シミュレーションや Intergraph 製品ラインを含む、設計・製造・地理空間ソフトウェアのベンダー。OpenLM は複数の Hexagon ライセンスマネージャーを監視します。

### Historical reports（履歴レポート）

*レポート・指標*

過去の一定期間にわたるライセンス使用状況を分析し、傾向の把握と需要予測を行うレポート。推測ではなく根拠に基づいて更新を適正化するための基礎となります。

**関連用語:** real-time reports、license utilization

### Hybrid deployment（ハイブリッド展開）

*プラットフォーム・アーキテクチャ*

オンプレミスとクラウドのコンポーネントを組み合わせた展開。OpenLM はハイブリッド環境に対応し、オンプレミスのライセンスサーバーとクラウドワークロードを 1 か所で監視できます。

## I

### IBM

*ソフトウェアベンダー*

エンジニアリングおよび開発ツールが歴史的に IBM License Use Management（LUM）システムを使用してきたテクノロジーベンダー。OpenLM は IBM でライセンスされたソフトウェアを監視します。

### IBM LUM (License Use Management)

*ライセンスマネージャー*

IBM や複数のエンジニアリングアプリケーションで歴史的に使用されてきたライセンスマネージャー。OpenLM は IBM LUM の使用状況、デナイアル、借用、有効期限、サーバー冗長化を監視します。

### Identity Alignment（アイデンティティアラインメント）

*OpenLM 機能*

ディレクトリやライセンスマネージャー間でユーザー ID の整合性を保ち、システムごとに名前が異なる場合でも、使用記録やアクセスルールを正しい個人に紐づける OpenLM の機能。組織のディレクトリでユーザーが無効化された際に、外部サービスからユーザーをプロビジョニング解除することもできます。旧称: OneDirectorySync。

新しいドキュメントでは「OneDirectorySync」を使用しないでください。

**関連用語:** DSA、DSS

### Idle time（アイドル時間）

*ライセンスの概念*

ライセンスがチェックアウトされたまま、アプリケーションが実際には使用されていない期間。アイドル時間は、OpenLM が回収する価値のあるライセンスを特定するための主要なシグナルです。

**関連用語:** License Harvesting、session、license utilization

### INCLUDE

*OpenLM コンポーネント*

指定したユーザー、グループ、またはホストにフィーチャを付与するオプションファイルのディレクティブ。License Access Control は INCLUDE ルールを生成し、必要とする人のために容量を確保します。

### ISO/IEC 19770

*IT・SAM・コンプライアンス*

ソフトウェア識別タグを含む、IT 資産管理に関する国際標準ファミリー。OpenLM のデータが支える、ソフトウェア資産管理の実践のための枠組みを提供します。

### ITAM (IT asset management)（IT 資産管理）

*IT・SAM・コンプライアンス*

組織のハードウェアおよびソフトウェア資産を、そのライフサイクル全体にわたって追跡・管理する実践。ソフトウェア資産管理はソフトウェアに焦点を当てたその一部であり、OpenLM は一般的な ITAM ツールに不足しがちなエンジニアリングソフトウェアの使用データを提供します。

### ITIL

*IT・SAM・コンプライアンス*

IT サービス管理のベストプラクティスの枠組み。OpenLM は、ITIL プロセスを実装する ServiceNow などの IT サービス管理プラットフォームと連携します。

## K

### Kubernetes（クバネティス）

*プラットフォーム・アーキテクチャ*

コンテナー化されたアプリケーションの展開とスケーリングを自動化するオーケストレーションシステム。OpenLM Platform は、スケーラブルなクラウドおよびオンプレミス運用のために、マイクロサービスを Kubernetes 上で実行します。

## L

### LDAP (Lightweight Directory Access Protocol)

*IT・SAM・連携*

ユーザーやグループを保存するディレクトリサービスにアクセスするためのプロトコル。OpenLM は LDAP 経由でユーザーとグループを読み取り、ID を整合させてアクセスルールを駆動します。

### LDAP Connector

*OpenLM 製品*

プラットフォームを LDAP および Active Directory ディレクトリに接続し、レポートとアクセス制御のためにユーザーとグループをインポートする OpenLM 製品。

### License Access Control (LAC)（ライセンスアクセス制御）

*OpenLM 機能*

ライセンス管理を受動的な監視から、能動的でポリシー駆動の制御へと変える OpenLM の自動化機能。誰がいつどのフィーチャを使用できるかのルールを定義すると、LAC がオプションファイルをコンパイル・展開し、ライセンスマネージャーがチェックアウト時にそれを適用します。LAC は、監査とトラブルシューティングのためにすべての結果も記録します。

**関連用語:** options file、LFM

### License file（ライセンスファイル）

*ライセンスの概念*

ライセンス数、有効化されたフィーチャ、有効期限、使用制限などのライセンス情報を記録した、ベンダー発行のデジタルドキュメント。OpenLM License File Management はこれらのファイルを比較・追跡します。

**関連用語:** LFM、license entitlement、license server

### License File Management (LFM)（ライセンスファイル管理）

*OpenLM 機能*

管理対象のライセンスサーバー全体にわたり、ベンダーのライセンスファイルを中央インターフェースから表示・比較・編集・配布する OpenLM の機能。新しいファイルが想定どおりのフィーチャとバージョンを含んでいるかを、稼働前に管理者が確認できます。

### License manager（ライセンスマネージャー）

*ライセンスの概念*

ライセンスの配布と使用を制御し、購入した上限を超えないようにするソフトウェア。FlexNet、DSLS、IBM LUM、Sentinel RMS などがあります。ライセンスマネージャーは、それをホストするライセンスサーバーとは区別されます。

**関連用語:** license server、Broker

### License Parser（ライセンスパーサー）

*OpenLM 製品*

ベンダーのライセンスファイルを読み取って解釈し、分析・比較のためにフィーチャ、数量、有効期限を抽出する OpenLM ツール。

### License pool（ライセンスプール）

*ライセンスの概念*

ユーザー間で共有されるフローティングライセンスの集合。アプリケーションはチェックアウト時にプールから取得し、チェックイン時に返却します。プールのサイズが同時使用数の上限を決めます。

**関連用語:** floating license、concurrent usage

### License server（ライセンスサーバー）

*ライセンスの概念*

ライセンスマネージャーソフトウェアをホストし、ネットワーク全体でライセンスの配布と認証を処理するサーバー。OpenLM Broker は、各ライセンスサーバーにインストールされてそのデータを収集します。

併設される OpenLM コンポーネントである Broker と混同しないでください。

**関連用語:** license manager、Broker

### License Server Monitoring（ライセンスサーバー監視）

*OpenLM 機能*

ライセンスサーバーの稼働状況と可用性を監視し、チェックアウトを妨げる障害を管理者に通知する OpenLM の機能。

### License utilization（ライセンス使用率）

*レポート・指標*

利用可能なライセンスのうち、時間の経過に伴い使用中のライセンス数を示す指標。効率の評価や無駄の発見に使用します。高価な製品で使用率が低い場合は、回収やより小規模な更新の有力な候補となります。

**関連用語:** concurrent usage、idle time、historical reports

### linger time（リンガータイム）

*ライセンスの概念*

アプリケーションの終了後もライセンスがチェックアウト状態のまま保持される猶予期間。リンガータイムをライセンスマネージャーで設定し、高速なチェックアウト・チェックインの繰り返しを防止します。

**関連用語:** floating license、borrowed license、idle time

### LM-X

*ライセンスマネージャー*

多くのエンジニアリングアプリケーションで使用される、X-Formation の商用ライセンスマネージャー。OpenLM は LM-X の使用状況、デナイアル、有効期限、トークン対応を監視します。

### lmgrd

*ライセンスマネージャー*

ベンダーデーモンを起動し、チェックアウト要求を仲介する FlexNet のライセンスサーバープロセス。OpenLM は lmgrd に直接ではなく、Broker を介して接続します。

## M

### Maintenance（メンテナンス）

*ライセンスの概念*

永続ライセンスで一般的な年間費用で、更新とサポートを提供します。メンテナンスの更新を追跡することで、重要なツールのサポート喪失を防ぎます。

### Managed Services (OpenLM Managed Services)（マネージドサービス）

*OpenLM サービス*

OpenLM の専門家が顧客に代わってライセンス管理を運用する OpenLM サービス。ホスト型ライセンスマネージャーのオプションも含みます。

### MathWorks（マスワークス）

*ソフトウェアベンダー*

MathLM ライセンスマネージャーでライセンスされる技術計算ツール、MATLAB と Simulink のベンダー。OpenLM は MathWorks の使用状況を監視し、コンカレントおよびネットワークライセンスを最適化します。

### MCP (Model Context Protocol)

*AI・連携*

AI アシスタントが外部のデータソースやツールに接続できるようにするオープン標準。OpenLM は MCP を使用し、Claude や ChatGPT などのアシスタントがライセンスデータを直接照会できるようにします。

### MCP Connector (OpenLM MCP Reporting Connector)（MCP コネクター）

*OpenLM 機能*

レポートデータベースと AI アシスタントの間で、安全な読み取り専用ゲートウェイとして機能する OpenLM の機能。たとえば「90 日間アクティビティのない AutoCAD ユーザーを一覧表示する」のように自然言語で質問でき、自社のテレメトリから得られた回答とビジュアルレポートを受け取れます。GraphQL データレイヤーと OAuth 2.0 認証を使用します。

### Microservice（マイクロサービス）

*プラットフォーム・アーキテクチャ*

1 つのタスクを実行し、他のサービスと組み合わさって、より大きなシステムを形成する独立したソフトウェアサービス。OpenLM Platform は、顧客が必要に応じてサブスクライブできる個別のマイクロサービスとして構築されています。

**関連用語:** OpenLM Platform、Enrichment Service

### Monday.com

*IT・SAM・連携*

OpenLM が連携するワークマネジメントプラットフォーム。ライセンスイベントやタスクを既存のチームワークフローに流し込みます。

### MSC Licensing (Helium)

*ライセンスマネージャー*

現在は Hexagon の一部である MSC シミュレーションソフトウェア向けのライセンスマネージャー。OpenLM は MSC Helium の使用状況、借用、有効期限、冗長化、トークンを監視します。

## N

### Named user license（指名ユーザーライセンス）

*ライセンスモデル*

共有できない、特定の個人に割り当てられたライセンス。ベンダーへのコンプライアンスを簡素化しますが、ソフトウェアを時々しか使わないユーザーには割高になることがあります。OpenLM はこのパターンを可視化し、未使用の割り当てを再割り当てできるようにします。

**関連用語:** floating license、node-locked license

### Node-locked license（ノードロックライセンス）

*ライセンスモデル*

ユーザーや共有プールではなく、特定のマシンに紐づけられたライセンス。ソフトウェアは、ライセンスがロックされたデバイスでのみ実行できます。

**関連用語:** floating license、named user license

### Notifications（通知）

*OpenLM 機能*

アラート条件、デプロイメント結果、しきい値に達した際に、OpenLM がメールや連携を通じて送信するメッセージ。適切な担当者がライセンスイベントを速やかに把握できます。

### Nvidia License Manager

*ライセンスマネージャー*

Nvidia の仮想 GPU や関連ソフトウェア向けのライセンスサービス。OpenLM は使用状況と有効期限のレポートのために連携します。

## O

### OAuth 2.0

*AI・連携*

パスワードを共有せずに、アプリケーションへスコープ付きのアクセスを付与する認可標準。OpenLM MCP Reporting Connector は、AI アシスタントへの接続を保護するために OAuth 2.0 を使用します。

### On-premises（オンプレミス）

*プラットフォーム・アーキテクチャ*

物理サーバーやプライベートクラウドなど、組織自身のインフラにホストされるソフトウェア。OpenLM は、インフラとデータを完全に管理する必要がある顧客向けにオンプレミス展開を提供します。

「on-premise」や「on premise」ではなく「on-premises」と表記してください。

**関連用語:** OpenLM Platform、Gateway

### OpenLM

*プラットフォーム・アーキテクチャ*

2007 年に設立された、エンジニアリングおよび専門ソフトウェア向けのソフトウェアライセンス管理プロバイダーで、Gartner にも認知されています。OpenLM は 100 を超えるライセンスマネージャーに接続し、それらのデータを 1 つのプラットフォームに集約して、可視化、最適化、制御を実現します。

### OpenLM Analytics

*OpenLM 製品*

ライセンス使用データを、分析、予測、調達判断のためのレポート、ダッシュボード、可視化に変える OpenLM 製品。

### OpenLM Audit

*OpenLM 機能*

アクセスや構成の変更を完全な監査証跡として記録する OpenLM の機能。誰が何を使用し、誰がどのルールを変更したかを示せます。

### OpenLM Compliance

*OpenLM 機能*

許可リストとアクセスルールを通じてライセンス条件の適用を支援し、過剰使用を可視化して監査対応を支える OpenLM の機能。保証できる内容は、顧客の契約と構成によって異なります。

### OpenLM Directory Sync

*OpenLM 機能*

Active Directory または LDAP からユーザーとグループを同期し、プラットフォーム全体で ID を最新に保つ OpenLM の機能。

### OpenLM Platform（OpenLM プラットフォーム）

*OpenLM 製品*

FlexNet、DSLS、Sentinel RMS、Reprise、LM-X をはじめとする 100 以上のライセンスマネージャーから、リアルタイムおよび履歴の使用データを 1 つのインターフェースに集約する、OpenLM のコアシステム。マイクロサービス上に構築され、Software License Management、Software Asset Management、ドングルおよびプロセスの監視、アクセス制御などを、サブスクライブ可能なサービスとして提供します。

同じページまたはセクション内で最初に「OpenLM Platform」と記載してから、「Platform」のみを使用してください。

**関連用語:** microservice、Gateway、on-premises

### OpenLM Projects

*OpenLM 機能*

チームや部門をまたいだ追跡、レポート、チャージバックのために、ライセンス使用をプロジェクト単位でグループ化する OpenLM の機能。

### OpenLM token（OpenLM トークン）

*プラットフォーム・アーキテクチャ*

特定の OpenLM 機能にアクセスして使用するための、柔軟で再利用可能な計量単位として OpenLM 内で使用される、ライセンスエンタイトルメントの一形態。

**関連用語:** license entitlement、token-based licensing

### Optimization (license optimization)（最適化）

*ライセンスの概念*

アイドルライセンスの回収、プールの適正化、シェルフウェアの削減によって、ライセンスの供給を実際の需要に合わせる実践。OpenLM が実現するために構築されている成果です。

### Option file (options file)（オプションファイル）

*ライセンスの概念*

ユーザーやグループの制限、予約、借用設定など、ライセンスアクセスポリシーを制御する FlexNet および互換の設定ファイル。License Access Control はルールをオプションファイルにコンパイルし、Broker を通じて展開します。

別名: FlexNet options file（FlexNet オプションファイル）。

**関連用語:** LAC、license manager

### Overuse (over-licensing)（過剰使用）

*IT・SAM・コンプライアンス*

契約が許可する数を超えてライセンスを使用することで、コンプライアンスと監査のリスクを生みます。OpenLM は過剰使用を報告し、監査で指摘される前に是正できるようにします。

## P

### Perpetual license（永続ライセンス）

*ライセンスモデル*

特定バージョンのソフトウェアを無期限に使用するために一度購入するライセンス。通常は初期費用と年間メンテナンスが伴います。減少しつつありますが、エンジニアリング資産では依然として一般的で、OpenLM はサブスクリプションやトークンモデルと並行して追跡します。オンプレミス展開でのみ利用可能です。

**関連用語:** subscription licensing、token-based licensing

### Policy (License Access Control)（ポリシー）

*OpenLM コンポーネント*

License Access Control において、1 つのアセットに対するルールの名前付き集合で、任意でスケジュールを設定できます。1 つのアセットに対して同時に有効なポリシーは 1 つだけで、これにより制御が予測可能に保たれます。

### Process Manager（プロセスマネージャー）

*OpenLM 機能*

ワークステーション上でアプリケーションのプロセスレベルの使用を追跡する OpenLM コンポーネント。どのアプリケーションが実行され、ライセンスを消費しているかを詳細に可視化します。

**関連用語:** Process Monitoring、Workstation Agent、usage monitoring

### Process Monitoring（プロセスモニタリング）

*OpenLM 機能*

ライセンスサーバーを持たない管理対象外ソフトウェアを含め、ワークステーション上で実行中のアプリケーションプロセスを監視する OpenLM の機能。回収すべきアイドルセッションを特定し、ライセンスシステム外のアプリケーション使用を検出します。

### Procurement（調達）

*IT・SAM・コンプライアンス*

ソフトウェアやライセンスを調達・購入するプロセス。OpenLM は、真のデナイアル、使用率、傾向などの使用根拠を提供し、更新やベンダー交渉を強化します。

### Product (OpenLM)（プロダクト）

*プラットフォーム・アーキテクチャ*

コアまたはオプションの、個別の OpenLM 提供物。有効化するとシステムリソースを消費する場合があります。Dongle Monitoring や Software License Management などがあります。

サードパーティのライセンスソフトウェアの機能を指す feature（フィーチャ）と混同しないでください。

**関連用語:** feature、OpenLM Platform

### Professional Services (OpenLM Professional Services)（プロフェッショナルサービス）

*OpenLM サービス*

顧客がプラットフォームを展開し、自社システムと連携できるよう支援する、OpenLM の実装・構成・連携サービス。

### Project（プロジェクト）

*OpenLM 機能*

チーム、部門、またはプロジェクト別にライセンス使用データを整理する OpenLM の分類方法。追跡、レポート、チャージバックに使用します。

**関連用語:** license chargeback、historical reports

### Project Usage（プロジェクト別使用状況）

*レポート・指標*

ライセンス消費を定義済みのプロジェクトに帰属させ、コスト配分とチャージバックを支援する OpenLM レポート。

### PTC

*ソフトウェアベンダー*

Creo や Windchill を含む、CAD および製品ライフサイクル管理ソフトウェアのベンダー。OpenLM は PTC のライセンス使用を監視します。

## R

### Real-time reports（リアルタイムレポート）

*レポート・指標*

現在のライセンス使用状況、可用性、デナイアルの最新ビューを提供するレポート。収集に遅延がある場合、OpenLM は「near real time（ニアリアルタイム）」という表現を使用します。

**関連用語:** historical reports、CCL

### Reclamation (license reclamation)（回収）

*ライセンスの概念*

チェックアウトされているが使用されていないライセンスを回収し、他のユーザーが使用できるようにすること。回収は、アイドルセッションのハーベスティングの結果です。

### Redundancy (license server redundancy)（冗長化）

*ライセンスの概念*

複数のライセンスサーバーが互いをバックアップし、1 台が停止してもチェックアウトを継続できる高可用性構成。FlexNet の 3 サーバー冗長化（トライアドとも呼ばれます）が一般的な例で、OpenLM は冗長構成を報告します。

### Reporting Hub (OpenLM Reporting Hub)（レポーティングハブ）

*OpenLM 機能*

製品やライセンスマネージャーをまたいでレポートを集約する OpenLM の機能。ライセンスインテリジェンスを構築、スケジュール、共有する場を 1 つにまとめます。

### Reprise RLM (Reprise License Manager)

*ライセンスマネージャー*

Reprise Software が提供する、広く使用されている商用ライセンスマネージャー。OpenLM は RLM の使用状況、デナイアル、有効期限を監視します。

### RESERVE

*OpenLM コンポーネント*

競合時にも容量が保証されるよう、特定のユーザー、グループ、またはホストにライセンスを確保するオプションファイルのディレクティブ。License Access Control は、たとえば上級エンジニアのためにプレミアムシートを確保する目的で RESERVE ルールを作成します。

### Role（ロール）

*プラットフォーム・アーキテクチャ*

OpenLM 内でユーザーに割り当てられる、権限とアクセスレベルの定義。ロールは、誰がデータを表示し、ルールを変更し、プラットフォームを管理できるかを制御します。

**関連用語:** user

### Roles & Permissions（ロールと権限）

*OpenLM 機能*

各ユーザーがプラットフォームで何を表示・実行できるかを管理する OpenLM の機能。最小権限の管理と職務分掌を支援します。

## S

### SaaS (software as a service)（サービスとしてのソフトウェア）

*ライセンスモデル*

Adobe Creative Cloud や Microsoft 365 など、インターネット経由でサブスクリプション提供されるソフトウェア。SaaS は初期コストを抑えますが、シェルフウェアを生みがちで、OpenLM Subscription Optimizer がこれを対象とします。

### SaaS Management (OpenLM SaaS Management)（SaaS 管理）

*OpenLM 製品*

可視化と最適化を SaaS サブスクリプションへ拡張する OpenLM 製品。クラウドのシートを、オンプレミスやフローティングライセンスと並べて管理できます。

### SAM (software asset management)（ソフトウェア資産管理）

*IT・SAM・コンプライアンス*

ソフトウェアの購入、展開、使用、廃棄を管理・最適化する実践。OpenLM は、専門アプリケーションの SAM を支えるエンジニアリングソフトウェアの使用データを提供します。

**関連用語:** SLM、license compliance、license entitlement

### SAML (Security Assertion Markup Language)

*AI・連携*

シングルサインオンを可能にする、認証データ交換のための標準。OpenLM は安全なアクセスのために SAML ID プロバイダーと連携します。

### Sentinel HASP

*ライセンスマネージャー*

Thales が提供する、ハードウェアおよびソフトウェアベースの保護・ライセンスシステム。HASP は Hardware Against Software Piracy の略です。OpenLM は Sentinel HASP の使用状況を監視します。

### Sentinel RMS

*ライセンスマネージャー*

多くのエンジニアリングアプリケーションで使用される、Thales のソフトウェアライセンスマネージャー。OpenLM は Sentinel RMS の使用状況、デナイアル、借用、有効期限を監視します。

### Sentinel SuperPro

*ライセンスマネージャー*

Sentinel ファミリーのレガシーなハードウェアキー型ライセンスマネージャー。OpenLM は Sentinel SuperPro の使用状況と有効期限を監視します。

### Session（セッション）

*ライセンスの概念*

OpenLM が記録する、ユーザーのアクティブなソフトウェア使用インスタンス。開始・終了時刻、アプリケーション、ワークステーションなどの情報を含みます。セッションは、使用状況とアイドル時間の分析の素材となります。

**関連用語:** concurrent usage、CCL、idle time

### Shelfware（シェルフウェア）

*IT・SAM・コンプライアンス*

組織が購入したものの使用していないソフトウェア。シェルフウェアの特定は、OpenLM の顧客が更新時に支出を削減する主要な方法です。

### Siemens（シーメンス）

*ソフトウェアベンダー*

NX、Teamcenter、Siemens EDA ツールを含む、産業・電子設計・製品ライフサイクル管理ソフトウェアのベンダー。OpenLM は複数の Siemens ライセンスマネージャーを監視します。

### SOC 2

*IT・SAM・コンプライアンス*

サービスプロバイダー向けのセキュリティおよび統制の監査基準。OpenLM は SOC 2 を維持し、顧客データの取り扱いについて顧客に保証します。

### Software estate（ソフトウェア資産（全体））

*IT・SAM・コンプライアンス*

組織が所有・運用するソフトウェアの全体。OpenLM は、一般的な ITAM ツールが見落としがちなエンジニアリングソフトウェア資産に可視性をもたらします。

### Software License Management (SLM)（ソフトウェアライセンス管理）

*OpenLM 機能*

ベンダーをまたいでライセンスを監視・制御・最適化することに焦点を当てた、OpenLM のマイクロサービスおよび分野。OpenLM Platform の基盤です。

**関連用語:** SAM、license manager、license utilization

### Specialty software（専門ソフトウェア）

*業界・分野*

CAD、EDA、GIS、シミュレーションツールなど、フローティング、トークン、ドングルのライセンスを使用する、高価でドメイン固有のアプリケーション。一般的な IT ツールではほとんど監視されないため、OpenLM の焦点となっています。

### SSO (single sign-on)（シングルサインオン）

*AI・連携*

一度サインインするだけで複数のシステムにアクセスできる認証方式。OpenLM は SAML とディレクトリ連携を通じてシングルサインオンに対応します。

### Subscription license（サブスクリプションライセンス）

*ライセンスモデル*

定額の料金で、定められた期間の使用を許可するライセンス。サブスクリプションは現在の業界標準であり、コストを資本支出から運用支出へと移します。OpenLM は、未使用シートへの支払いを防ぐためにこれらを追跡します。

**関連用語:** perpetual licensing、Subscription Optimizer

### Subscription Optimizer（サブスクリプションオプティマイザー）

*OpenLM 機能*

使用パターンを分析し、使用率の低いサブスクリプションシートを特定する OpenLM の機能。更新時に再割り当てやキャンセルができます。

**関連用語:** subscription licensing、Cloud Broker

## T

### Third Party Integrations（サードパーティ連携）

*OpenLM 機能*

ServiceNow、Salesforce、Monday.com、LDAP、SAML などのエンタープライズシステムとの OpenLM の連携。ライセンスデータやアクションを、チームがすでに使用しているツールに流し込みます。

### Token (token-based or consumption license)（トークン）

*ライセンスモデル*

製品、フィーチャ、または時間あたりに消費されるトークンに基づいて使用量を課金するモデルで、Autodesk Token-Flex などのプログラムで使用されます。柔軟ですが、監視がないとコストが予測しづらくなります。OpenLM はこれをニアリアルタイムで提供します。

**関連用語:** floating license、OpenLM token

### Token attribution（トークン帰属）

*AI・連携*

LLM のトークン消費を、それを発生させたプロジェクト、チーム、またはユーザーに割り当てる実践。OpenLM AI FinOps はトークン帰属を使用し、AI 支出を透明かつ課金可能にします。

### True denial（真のデナイアル）

*ライセンスの概念*

生のデナイアル数を水増しする再試行や一時的なエラーを除外したうえで、真の不足を反映するデナイアル。容量を追加購入すべきかを判断するための信頼できるシグナルであり、OpenLM はこれを個別に報告します。

### True-up（トゥルーアップ）

*IT・SAM・コンプライアンス*

多くの場合は更新時や監査後に、ライセンス数を超えた使用分を顧客が支払う精算。OpenLM による継続的な監視は、想定外のトゥルーアップを避けるのに役立ちます。

## U

### UGS (User/Group Service)（ユーザー／グループサービス）

*OpenLM コンポーネント*

Active Directory または LDAP を基盤として、ユーザー、グループ、ホストを、License Access Control などの機能に供給する OpenLM サービス。License Access Control はルールの対象を UGS と照合して検証します。

### Unmanaged process（管理対象外プロセス）

*OpenLM 機能*

それを報告するライセンスサーバーを持たずに実行されるアプリケーション。OpenLM Process Monitoring は管理対象外プロセスを検出し、ライセンスのない、またはローカルでライセンスされたソフトウェアの使用を可視化します。

### Usage monitoring（使用状況モニタリング）

*レポート・指標*

ライセンス消費を分析・最適化するために、ソフトウェア使用を追跡・記録するプロセス。あらゆる OpenLM のレポートと最適化の基盤です。

**関連用語:** license utilization、SLM、session

### User（ユーザー）

*プラットフォーム・アーキテクチャ*

OpenLM が追跡する、ライセンスアプリケーションを使用する個人。名前、チーム、ワークステーションなどの属性が、レポートとアクセス制御のために記録されます。

**関連用語:** role、session、named user license

## V

### Vendor daemon（ベンダーデーモン）

*ライセンスマネージャー*

ソフトウェアの発行元ごとに固有の FlexNet プロセスで、どのフィーチャがライセンスされ、いくつ使用中かを追跡します。ライセンスサーバー上で lmgrd の下で実行されます。

### Virtual License Manager (VLM)（仮想ライセンスマネージャー）

*OpenLM 製品*

従来のライセンスサーバーに到達しづらい、仮想化・クラウドホスト環境でライセンスを提示・管理する OpenLM 製品。

**関連用語:** license manager、license pool

### Visualization（可視化）

*レポート・指標*

ライセンスデータをチャート、ヒートマップ、ダッシュボードとして表示すること。OpenLM は、使用パターンを一目で把握できるよう、円グラフやヒートマップなどの可視化を備えています。

## W

### Watch option file（オプションファイル監視）

*OpenLM コンポーネント*

OpenLM がライセンスサーバーのオプションファイルを観察・管理できるようにする Broker の設定。License Access Control がアセットを検出・制御するには、事前に有効化する必要があります。

### Workstation（ワークステーション）

*プラットフォーム・アーキテクチャ*

ユーザーがライセンスソフトウェアにアクセスするコンピューターまたはデバイス。OpenLM はワークステーションを追跡し、組織全体のライセンス使用状況をマッピングします。

**関連用語:** Workstation Agent、user

### Workstation Agent（ワークステーションエージェント）

*OpenLM コンポーネント*

エンドユーザーのワークステーションにインストールし、ソフトウェアライセンス使用データを収集して OpenLM Platform に送信する OpenLM クライアント。アプリケーション単位およびフィーチャ単位のアクティビティを報告し、アイドルセッションを検出し、ドングルおよびプロセスの監視に対応します。License Access Control は、個別ユーザー向けライセンスを割り当てる前に、アクティブな Workstation Agent を要求できます。

旧称: Agent（OpenLM Agent）。

**関連用語:** Agents Hub、Process Manager、workstation
