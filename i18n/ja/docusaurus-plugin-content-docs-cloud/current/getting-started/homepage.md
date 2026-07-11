---
title: ホームページ
sidebar_position: 10
description: OpenLM Platform のホームページ（サインイン後に最初に表示されるダッシュボード）のツアー。ライセンスサーバーの稼働状態、拒否、ライセンスプールのウィジェットを紹介します。
---

**ホームページ** は、OpenLM Platform にサインインした後に最初に表示される画面です。これはネイティブのダッシュボードであり、サインインした瞬間に最も重要な運用シグナル（オフラインのライセンスサーバー、拒否されたリクエスト、ライセンスサーバーの稼働状態、ライセンスプールの使用率）を表示します。それぞれから、ワンクリックで該当するビューへ移動できます。

:::info[アプリでの場所]
ホームページはサインイン時に自動的に開きます。いつでも戻るには、アプリランチャー（右上のグリッドアイコン）で **Homepage** ショートカットを選択するか、OpenLM ロゴを選択してください。
:::

## Dashboard と Reporting Dashboard

ホームページには 2 つのタブがあります。

- **Dashboard** — 本ページで説明する運用ダッシュボードです。Platform に組み込まれた KPI カードとウィジェットで構成されています。
- **Reporting Dashboard** — 厳選されたビジネスインテリジェンスのダッシュボードです。ここで利用できるレポートについては、[BI Reports](/cloud/category/bi-reports) を参照してください。

## ツールバー

Dashboard 上部のツールバーは、ウィジェットの表示内容を制御し、管理者が一般的な操作へすばやくアクセスできるようにします。

- **Period** — ウィジェットが対象とする期間（例：*Last 30 days*）を選択します。Dashboard 上のすべてのウィジェットがこの設定に従います。
- **Refresh** — 最新のデータでウィジェットを再読み込みします。再読み込みが完了すると、ダッシュボードに短い確認メッセージが表示されます。
- **Invite User** — 他のユーザーを自分の OpenLM アカウントに招待する招待状を送信します。*(管理者のみ。)*
- **Activate Product** — 製品カタログを開いて OpenLM サービスを有効化します。[OpenLM Products](/cloud/openlm-administration/products) を参照してください。*(管理者のみ。)*
- **Take the Tour** — 各ウィジェットを紹介するガイド付きウォークスルーを開始します。初回サインイン時に便利です。

Documentation および Contact Us のリンクもホームページから利用できます。主要なアクション（Invite User、Activate Product、Take the Tour）は管理者にのみ表示されます。

## KPI サマリーカード

ダッシュボードの上部には 2 つのサマリーカードがあり、ひと目で確認できるカウントを表示します。それぞれには、対処できるビューへのディープリンクが用意されています。

| カード | 表示内容 | ディープリンク |
| --- | --- | --- |
| **License servers offline** | 現在オフラインになっている、監視対象のライセンスサーバーの数。 | **View servers** → [License Servers](/cloud/slm/license-servers) |
| **Denied requests** | 選択した期間内に拒否されたライセンスリクエストの数。 | **View denials** → [Denials](/cloud/reporting/ui-reports/denials) |

## ウィジェット

サマリーカードの下には、数値を細かく分解する固定グリッドのウィジェットがあります。すべてのウィジェットは、読み込み中・データなし・エラーの各状態で同じ動作を共有するため、ダッシュボード全体が一貫して読み取れます。

- **License Servers Status** — ライセンスサーバー群を **Healthy**、**Pending**、**Error** の各状態に分ける稼働状態のドーナツグラフで、中央に合計数が表示されます。1 件の障害が集計値の陰に隠れることはもうありません。
- **Top 5 Denied Features** — 選択した期間内に、ユーザーが最も頻繁にライセンスの上限に達した機能です。
- **Top 5 Features in Use** — チームが実際に消費している機能で、拒否された機能と並べて表示されるため、需要とコストを比較できます。
- **Top 5 Saturated License Pools** — 上限に達しているプールで、さらに拒否が発生する可能性があります。
- **Top 5 Underutilized License Pools** — 遊休状態のプールで、ライセンスを回収または再割り当てできます。
- **Usage trend** — 選択した期間における使用状況の推移です。
- **Upcoming expirations & renewals** — 有効期限や更新日が近づいているライセンスで、期限を見逃さないようにします。

:::note
対処すべき問題がある場合は、ホームページの上部に運用アラートバーが表示されます。重大なシグナルが目立つように、重要度に応じたスタイルが適用されます。
:::

## オンボーディングとトライアルの状態

- **Onboarding In Progress** — セットアップが完了していない間は、ヘッダー内のパネルに残りの手順が表示され、各サービスの該当ページへのリンクと短いビデオチュートリアルが用意されます。まだセットアップ中の場合は、[Get started](/cloud/getting-started/what-is-openlm) を最初から最後まで実施してください。
- **Trial countdown** — トライアル中のアカウントには、カウントダウンと有料プランへのアップグレード経路が表示されます。

## ウィジェットが非表示になる場合

ホームページのウィジェットは、アカウントで Software License Management が有効になっていることを前提とします。まだ有効になっていない場合、ウィジェットは非表示のままとなり、空のパネルや「データなし」のパネルを表示する代わりに、次の手順を説明するロックカードが表示されます。**Activate Product** から該当する製品を有効化し（[OpenLM Products](/cloud/openlm-administration/products) を参照）、ホームページに戻ってください。

## 関連

- [Verify your setup](/cloud/getting-started/verify-setup) — ウィジェットに頼る前に、データが流れていることを確認します。
- [Denials](/cloud/reporting/ui-reports/denials) と [Usage](/cloud/reporting/ui-reports/usage) — 拒否ウィジェットと使用状況ウィジェットの背後にある詳細ビューです。
- [BI Reports](/cloud/category/bi-reports) — Reporting Dashboard タブのダッシュボードです。
