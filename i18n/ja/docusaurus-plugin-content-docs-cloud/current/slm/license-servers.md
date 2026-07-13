---
title: "License Servers"
sidebar_position: 15
description: "License Servers セクションでは、監視対象のライセンスサーバーの詳細を表示し、リアルタイムのライセンス使用状況とサーバーステータスを確認できます。"
keywords: [license servers, license manager, FlexLM, RLM, license monitoring, OpenLM Broker, server status, license usage, pending servers]
---

## 概要

**License Servers** セクションでは、監視対象のライセンスサーバーの詳細、リアルタイムの使用状況、サーバーステータスを確認できます。接続済みライセンスサーバーの効率的な管理・監視に活用してください。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Licenses and Features（ライセンスと機能）→ License Servers** を選択します。

**関連:** [Licenses](/cloud/slm/licenses) · [License Allocations](/cloud/slm/license-allocations)
:::

## 機能

主な操作:

- 監視対象のライセンスサーバーとリアルタイム使用統計の表示
- 承認待ちサーバーの確認後、承認して既存構成に統合、または監視不要であれば拒否
- 以前に拒否したサーバーを **Pending Servers** に戻して再評価
- サーバー行にマウスオーバーして **Edit** アイコンから編集モードへ。管理/削除が可能

## License Servers ワークスペース

左側のサイドバーは 2 つのグループで構成されています。

- **Operational** — 読み取り専用の監視ダッシュボードである **Live Servers Statistics**。
- **Management** — サーバーを確認・構成するページ: **Pending Servers**、**Denied Servers**、**Servers Configuration**。

各ページには共通のツールバーがあります。最新データを再読み込みする **Refresh**、列でグリッドを絞り込む **Toggle Filters**、特定のサーバーを探す **Search**、そして大量のリスト向けのページネーションです。

## Live Servers Statistics

**Live Servers Statistics** は、OpenLM が現在監視している対象すべてを表示する読み取り専用ダッシュボードです。各行が 1 台のライセンスサーバーで、最新のサンプルで更新され、可用性と消費状況をひと目で確認できます。

![監視対象ライセンスサーバーをステータス・使用状況・割り当ての各列で一覧表示する Live Servers Statistics ダッシュボード](/img/license_servers/live-servers-statistics.png)

確認待ちの候補サーバーがあると、グリッド上部にバナー（例: *「There are 6 servers pending approval」*）と **Go to pending servers** ショートカットが表示されます。

グリッドには次の列を表示できます。

| 列 | 内容 |
| --- | --- |
| **Status** | サーバーの現在の稼働状況 — **Up**、**Down**、**Unknown**、**Data error**。 |
| **Server Name** | ライセンスサーバーの表示名。 |
| **License Manager Type** | ライセンスマネージャーの種類（例: FLEXlm、RLM、ArcGIS Online、Autodesk Cloud、Office365Cloud、OpenLM Generic）。 |
| **Host Name** / **Port** | OpenLM が問い合わせるアドレス。 |
| **Status Date** | 現在のステータスが最後に記録された日時。 |
| **RSQT** | Recent Successful Query Time — ライセンスと使用状況を最後に正常に取得できた日時。 |
| **Quantity** | サーバーのアクティブなフィーチャー全体で利用可能なライセンス総数。 |
| **Used** / **Borrowed** | 現在使用中／借用中のライセンス数。 |
| **Usage Percent** | 総数に対する消費割合。 |
| **Allocations** | アクティブなライセンス割り当ての数。 |
| **Usage Scope** / **Country** / **Description** | サーバーに設定したカスタムプロパティ（[Custom Fields](#ライセンスサーバーの編集) を参照）。 |
| **Source** | OpenLM がサーバーのデータを収集する方法（例: OpenLM Broker 経由）。 |
| **License File** | サーバーがライセンスファイルを読み取るかどうか。 |

## Servers Configuration

**Servers Configuration** は、同じサーバー群を編集可能なインベントリとして一覧表示します。サーバーの設定変更、一時的な無効化、削除に使用します。

![サーバーごとの構成ステータス・ライセンスマネージャータイプ・ホスト・ポート・ソースを表示する Servers Configuration グリッド](/img/license_servers/servers-configuration.png)

**Configuration Status** 列は、各サーバーが **Enabled**（有効）か **Disabled**（無効）かを示します。残りの列（Server Name、License Manager Type、Host Name、Port、Source）は監視ダッシュボードと同じです。

サーバーを削除するには、チェックボックスで 1 つ以上の行を選択し、**Delete** を選びます。

### ライセンスサーバーの編集

サーバー行の **Edit** アイコンを選択して **Edit License Server** ページを開きます。上部で **Display Name** を設定し、**Disable / Enable** トグルで OpenLM がそのサーバーを実際に監視するかどうかを切り替えます。

![ライセンスマネージャータイプ・タイムゾーン・サンプルレート・ホストとポートのテーブルを表示する Edit License Server ページの Type タブ](/img/license_servers/edit-license-server.png)

設定は 2 つのタブに分かれています。

- **Type** — 接続とサンプリングの主要設定:
  - **License Manager Type** — このサーバーで動作している技術。
  - **Time Zone** — 使用状況のタイムスタンプを揃えるためのサーバーのタイムゾーン。
  - **Sample Rate (Seconds)** — OpenLM がサーバーにステータスと使用状況を問い合わせる間隔。
  - **Broker** — サーバーのデータを OpenLM Broker 経由で収集するかどうか。
  - **Read License File** — 権利情報のためにサーバーのライセンスファイルを読み取るかどうか。
  - **Allow server fall back to denied license** — 拒否されたライセンスへのフォールバック動作を許可します。
  - **Enable Redundant Configuration** — サーバーを冗長（トライアド）構成の一部として指定します。
  - **Host Name / Port** テーブルには OpenLM が問い合わせるホストが一覧表示されます。ここでホストを追加・削除できます。
- **Custom Fields** — サーバーに付与できる任意のメタデータ: **Country**、**Usage Scope**、**Description**。これらの値は監視ダッシュボードに列として表示されます。

**Save** で変更を適用、**Cancel** で破棄、**Delete** でサーバーを削除します。

## 検出されたサーバーの承認・拒否

ライセンスサーバーは **OpenLM Broker** によってネットワーク上で検出され、監視候補として報告されます。新しい候補は **pending（承認待ち）** として届き、確認するまで監視インベントリには含まれません。

### Pending Servers

**Pending Servers** には、判断待ちの候補サーバーが Server Name、License Manager Type、Host Name、Port、Source とともに一覧表示されます。

![Approve And Merge と Deny の操作を備えた、候補サーバー一覧の Pending Servers ページ](/img/license_servers/pending-servers.png)

1 つ以上のサーバーを選択して、次のいずれかを実行します。

- **Approve And Merge** — サーバーを監視構成に追加し、Live Servers Statistics と Servers Configuration に表示されるようにします。
- **Deny** — 監視不要なサーバーを拒否します。サーバーは **Denied Servers** に移動します。

### Denied Servers

**Denied Servers** には、以前に拒否した候補が一覧表示され、承認待ちキューから除外されます。

![Restore To Pending 操作を備えた Denied Servers ページ](/img/license_servers/denied-servers.png)

考えを変えた場合は、サーバーを選択して **Restore To Pending** を選ぶと、**Pending Servers** に戻して再度確認できます。
