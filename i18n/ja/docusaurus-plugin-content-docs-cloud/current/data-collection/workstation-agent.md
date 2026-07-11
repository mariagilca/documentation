---
title: Workstation Agent
sidebar_position: 0
description: OpenLM Workstation Agent（エンドユーザーのマシンからアプリケーションとライセンスのアクティビティを収集するコンポーネント）のインストール、認証、デプロイ、管理を行います。
---

**Workstation Agent** は、エンドユーザーのマシンにインストールされる OpenLM コンポーネントです。ユーザーがどのライセンス付きアプリケーションをどれくらいの時間実行したかを検出し、そのアクティビティを OpenLM Platform に報告します。Agents 系アプリの、そしてアイドルライセンス検出やライセンスハーベスティングといったエンドポイント機能の背後にあるデータソースです。

Workstation Agent は **アプリランチャー上のアプリではなく、インストール型のコンポーネント** です。生成されるエージェントは、次の 2 つのランチャーアプリで管理します。

- [Agents Hub](/cloud/data-collection/agents_hub) — エージェントの動作、および監視対象のサイト／アプリケーションを設定します。
- [Agent Activity Manager](/cloud/data-collection/agent_activity_manager) — 接続中のエージェントを監視し、アップグレード・再起動・削除を展開します。

:::note
このページは管理者向けのインストールと管理のリファレンスです。エージェントがコンピューター上で何を行うかについてのエンドユーザー向けのわかりやすい説明は、[Workstation Agent を理解する](/cloud/for-end-users/workstation-agent) を参照してください。
:::

## エージェントの種類

インストールして報告を開始すると、エージェントは自動的に Agent Activity Manager に表示されます。OpenLM は、実行される場所によって区別される 3 種類のエージェントを追跡します。

- **Workstation Agent** — ユーザーのデスクトップまたはワークステーションにインストールされます。
- **Browser Agent** — ユーザーの Web ブラウザー内で実行されます。
- **AutoCAD Extension Agent** — Autodesk AutoCAD の内部で実行されます。

## インストールと認証

インストールの流れは、1 台のマシンにデプロイする場合でも多数のマシンにデプロイする場合でも同じです。プラットフォーム別のインストーラー（Windows、Linux RPM、DEB、tar.gz）、対話型のウォークスルー、トラブルシューティングについては、[OpenLM コンポーネントのインストールと構成](/cloud/deployment-operations/components-installation) を参照してください。

### 事前準備

- 対象のマシンが [システム要件](/cloud/deployment-operations/system-requirements) を満たしていることを確認します。
- Identity で Workstation Agent 用の [認証ファイル](/cloud/getting-started/authorize-components) を生成します。マシンごとに 1 つのファイルを使用することも、共有ファイルを使用することもできます。
- マシンがポート 443 で外向きのインターネットアクセスを持っていることを確認します。

### 手順

1. [Downloads ページ](https://www.openlm.com/downloads/) から Workstation Agent のインストーラーをダウンロードします。
2. インストーラーを実行し、ライセンス契約に同意します。
3. インストール済みアプリケーションに関連する拡張機能を選択します（該当するものがない場合はチェックを外したままにします）。
4. インストールパスを選択するか、デフォルトのまま（推奨）にします。
5. デプロイの種類として **Cloud** または **On-premises** を選択します。
6. エンドユーザーに [Personal Dashboard](/cloud/users/personal-dashboard) を開くことを許可するかどうかを選択します。
7. **On-premises の場合のみ:** [Dongle Monitoring](/cloud/dongle-monitoring) を有効にするかどうかを選択し、続いてシステムの完全修飾ドメイン名の後に `/agents-hub` を付けたものをホストとして入力します（ポート 443 で接続できるようにします）。
8. Identity から発行された **Agent Authorization File** をインポートし、インストールを完了します。

インストール後、エージェントは自動的に OpenLM Platform に接続します。

### 大規模なデプロイ

IT チームは、共有認証ファイルを使用して、次のようなツールで多数のマシンに Workstation Agent をサイレントでデプロイできます。

- Microsoft Intune
- グループポリシー（GPO）
- System Center Configuration Manager（SCCM）
- PDQ Deploy
- カスタムのサイレントスクリプト

## 確認

インストール後、[Agents Hub](/cloud/data-collection/agents_hub) または [Agent Activity Manager](/cloud/data-collection/agent_activity_manager) を開き、エージェントがオンライン状態でリストに表示されることを確認します。表示されない場合は、認証ファイルと、マシンのポート 443 での外向きアクセスを再確認してください。

## インストール済みエージェントの管理

日々のエージェント操作は [Agent Activity Manager](/cloud/data-collection/agent_activity_manager) で行います。

- 新しいインストーラーをアップロードして、選択したエージェントまたはフリート全体を **アップグレード** します（オプションで自動アップグレードも可能）。
- すべての Workstation Agent を **再起動** します。
- 不要になったエージェントのレコードを **削除** します。

## エージェントの動作の構成

- **ハーベスティングとアイドルライセンスのポリシー** — エージェントがアイドルライセンスを解放する方法（Save & Close、Suspend & Resume、または Kill）を [Process Manager](/cloud/automations/process-manager) で定義します。
- **監視対象のサイトとアプリケーション** — [Agents Hub](/cloud/data-collection/agents_hub) で設定します。

## エージェントが行わないこと

Workstation Agent は、個人のファイル、メール、アクティビティを監視せず、スクリーンショットも取得しません。追跡するのは、管理者が定義したライセンス付きソフトウェアのみです。

## 関連

- [Workstation Agent を理解する](/cloud/for-end-users/workstation-agent) — エンドユーザー向けの説明。
- [Agents Hub](/cloud/data-collection/agents_hub) · [Agent Activity Manager](/cloud/data-collection/agent_activity_manager) — エージェントを管理するアプリ。
- [Process Manager](/cloud/automations/process-manager) · [Dongle Monitoring](/cloud/dongle-monitoring) — エージェントによって実現される機能。
- [OpenLM コンポーネントのインストールと構成](/cloud/deployment-operations/components-installation) — プラットフォーム別のインストーラーとトラブルシューティング。
