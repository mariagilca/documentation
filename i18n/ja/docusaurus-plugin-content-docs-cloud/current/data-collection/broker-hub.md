---
title: "Broker Hub"
sidebar_position: 1
description: "Broker Hub は、ライセンスサーバーにインストールされた OpenLM Broker の参照・承認・更新・再起動・削除を一元的に行うコンソールです。"
---

## 概要

**Broker Hub** は、ライセンスサーバーにインストールされた OpenLM Broker を一元管理するコンソールです。1 つの画面から、新しく検出された Broker の承認、稼働状態の監視、新しいバージョンへのアップグレード、再起動、不要になった Broker の削除を行えます。

Broker は、ライセンスサーバー上(またはその近く)で動作し、データを OpenLM に報告します。すべての Broker はまず Broker Hub に報告し、承認するとそのデータが後続の処理へと引き渡されます。

![承認済み Broker の一覧を表示する Broker Hub](/services/broker-hub/brokers-overview.png)
*承認済み Broker の一覧を表示する Broker Hub*

ナビゲーションパネルには 4 つのエリアがあります。

- **Brokers** — すべての承認済み Broker と現在のステータス。
- **Pending Brokers** — 新しく検出され、承認待ちの Broker。
- **SaaS Agents** — SaaS プラットフォームからライセンスデータを収集するコネクター。[Cloud Broker](./cloud-broker) を参照してください。
- **AI Proxy** — OpenLM AI Proxy サービス。[AI Proxy](/cloud/deployment-operations/ai-proxy) を参照してください。

## 前提条件

Broker Hub に Broker が表示される前に、各ライセンスサーバーへ Broker をインストールします。

1. [Broker 認可ファイルを生成します](../openlm-administration/identity#%E8%AA%8D%E5%8F%AFauthorization)。
2. ライセンスサーバーに [Broker をインストールします](/cloud/deployment-operations/components-installation)。
3. Broker の UI で認可ファイルをアップロードし、**Continue** を選択します。

Broker は、サーバー上にインストールされたライセンスマネージャーを自動的に検出し、接続性を確認します。検出が完了すると、Broker は Broker Hub に報告し、**Pending Brokers** に表示されます。

## 保留中の Broker を承認する

新しく検出された Broker は保留中(pending)ステータスで表示されます。OpenLM がデータの収集を開始する前に、Broker を承認してください。

1. ナビゲーションから **Pending Brokers** を選択します。

![保留中の Broker 一覧](/services/broker-hub/pending-brokers-list.png)
*承認待ちの Broker(重複としてフラグが付いたエントリを含む)*

2. 承認する各 Broker のチェックボックスを選択します。
3. **Approve Brokers** を選択します。

![保留中の Broker を選択すると Approve Brokers ボタンが有効になります](/services/broker-hub/pending-approve-select.png)
*1 つ以上の Broker を選択すると Approve Brokers が有効になります*

:::note
**Approve Brokers** は即座に実行され、追加の確認ステップはありません。承認された Broker は **Pending Brokers** から **Brokers** 一覧へ移動します。
:::

**ID** 列には、対応が必要な Broker がフラグ表示されます。

- **Duplicate** — 同じ ID の Broker がすでに登録されています。行の **Remove**(✕)ボタンで重複を破棄するか、OpenLM サポートに連絡して競合を解決してください。
- **Not Reporting** / **Not Accepting** — Broker が送信を停止しているか、無効化されています。

Broker を承認すると、検出されたライセンスマネージャーが [License Servers](../slm/license-servers) で承認できるようになります。

## Broker のステータスを理解する

**Brokers** 一覧の **Status** 列は、各 Broker の現在の稼働状態を示します。

| ステータス | 意味 |
| --- | --- |
| **Up** | 承認済みで正常に稼働しています。 |
| **Not Reporting** | Broker がデータの送信を停止しています。ライセンスサーバー上で Broker サービスが実行されているか確認してください。 |
| **New** | 検出済みですが、まだ承認されていません。 |
| **Broker Sync** | Broker がオンラインに復帰し、データを同期しています。 |
| **Not Accepting** | Broker のアカウントが停止されています。 |
| **Duplicate** | 複数の Broker が同じ ID を報告しています。OpenLM サポートに連絡して解決してください。 |
| **Time Sync Error** | Broker のシステムクロックがずれています。マシンの時刻と Network Time Protocol(NTP)の設定を確認してください。 |

:::tip
90 日を超えて報告のない Broker は非アクティブとみなされ、その行が強調表示されます。**Show Inactive Brokers** チェックボックスをオフにすると、現在報告していない Broker を非表示にできます。また、**Search** ボックスで一覧を絞り込めます(複数の語はカンマで区切ります)。
:::

その他の列には、**Hostname**、**IP**、**Version**、**Installation Path**、**Operating System**、**Time Zone**、**Latest Status Date**(Broker の最終報告時刻)などがあります。**Broker UI** アイコンを選択すると、その Broker 独自の Web インターフェースが新しいタブで開きます。

## Broker を更新する

**Update Brokers** を使用して、1 つ以上の Broker を新しいバージョンにアップグレードします。

1. **Brokers** 一覧で **Update Brokers** を選択します。
2. インストールするバージョンを選択します。
   - **Latest Version** — 最新のリリース版 Broker をインストールします。
   - **Custom Version** — 特定のインストーラーファイル(`.tar.gz`)をアップロードします。

![Update Brokers のバージョン選択](/services/broker-hub/update-brokers-version.png)
*Update Brokers のステップ 1:バージョンを選択*

3. **Continue** を選択します。
4. 更新する Broker を選択し、もう一度 **Continue** を選択します。

OpenLM は選択した Broker に更新コマンドを送信します。アップグレードはバックグラウンドで実行されます。各 Broker がアップグレードして報告し直すと新しいバージョンが表示されるので、Brokers 一覧を更新して確認してください。

:::note
Broker Hub から更新できるのは、バージョン 22.6.13.105 以上を実行している Broker のみです。
:::

## Broker を再起動する

Broker をリモートで再起動するには、**Restart Brokers** を選択し、再起動する Broker を選択して **Restart** を選択します。OpenLM は選択した各 Broker に再起動コマンドを送信します。

## Broker を削除する

1. **Brokers** 一覧で、削除する各 Broker のチェックボックスを選択します。
2. **Delete** を選択します。
3. 一覧に表示された Broker を確認し、**Confirm** を選択します。

![Remove Brokers の確認ダイアログ](/services/broker-hub/remove-brokers-confirm.png)
*Broker を削除する前に確認します*

:::warning
Broker を削除すると、そのライセンスサーバーからのデータ収集が停止します。この操作は Broker Hub から元に戻せません。
:::

## Broker のライセンスマネージャーを操作する

Broker の **Hostname** を選択すると、その **License Manager** ビューが開きます。ここでは、各ライセンスマネージャーのポートごとに次の操作を行えます。

- ライセンスサーバーの起動、停止、再読み込み。
- ライセンスファイルのダウンロード、アップロード、再読み込み。
- アセットデータの同期。

コマンドはキューに入れられ、数分以内に実行されます。

## SaaS Agents

**SaaS Agents** タブには、SaaS プラットフォームからライセンスデータを収集するクラウドホスト型のエージェントが一覧表示されます。[Cloud Broker](./cloud-broker) で SaaS サービスを接続すると、エージェントがここに表示されます。

![SaaS Agents タブ](/services/broker-hub/saas-agents.png)
*SaaS Agents タブ*

各エージェントには、**Hostname**、**Status**、**ID**、**Time Zone**、**Latest Status Date**、**Creation Date**、**IP**、**Version** が表示されます。このタブでは次の操作を行えます。

- **Update SaaS Agents** — バージョンのインストーラーをアップロードして、選択したエージェントをアップグレードします。
- **Delete** — 選択したエージェントを削除します。エージェントのチェックボックスを選択するとボタンが有効になります。
- **Search** — 一覧を絞り込みます。

OpenLM が監視する SaaS プラットフォームを選択するには、[Cloud Broker](./cloud-broker) を参照してください。

## AI Proxy

**AI Proxy** タブには、デプロイ済みの **AI Proxy Agents** が一覧表示されます。OpenLM AI Proxy は、大規模言語モデル(LLM)の API リクエストをルーティングし、AI FinOps レポート向けにトークン使用量を記録するセルフホスト型のゲートウェイです。AI Proxy をデプロイすると、エージェントがここに表示されます。

![AI Proxy タブ](/services/broker-hub/ai-proxy.png)
*AI Proxy Agents タブ*

各エージェントには、**Hostname**、**ID**、**Status**、**Creation Date**、**Last Update** が表示されます。エージェントのチェックボックスを選択して **Delete** を選択すると削除できます。また、**Search** で一覧を絞り込めます。

サービスのデプロイと設定については、[AI Proxy](/cloud/deployment-operations/ai-proxy) を参照してください。
