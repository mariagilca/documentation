---
title: ホームページ
sidebar_position: 10
description: OpenLM Platform のホームページ（サインイン後に最初に表示されるダッシュボード）のツアー。ライセンスサーバーの稼働状態、拒否、ライセンスプールのウィジェットを紹介します。
---

**ホームページ** は、OpenLM Platform にサインインした後に最初に表示される画面です。これはネイティブのダッシュボードであり、サインインした瞬間に最も重要な運用シグナル（ライセンスサーバーの稼働状態、拒否された機能、機能の使用状況、ライセンスプールの使用率）を表示します。

:::info[アプリでの場所]
ホームページはサインイン時に自動的に開きます。いつでも戻るには、アプリランチャー（右上のグリッドアイコン）で **Homepage** ショートカットを選択するか、OpenLM ロゴを選択してください。
:::

## Dashboard と Reporting Dashboard

ホームページには 2 つのタブがあります。

- **Dashboard** — 本ページで説明する運用ダッシュボードです。Platform に組み込まれたウィジェットです。
- **Reporting Dashboard** — 厳選されたビジネスインテリジェンスのダッシュボードです。ここで利用できるレポートについては、[BI Reports](/cloud/category/bi-reports) を参照してください。

## ツールバー

Dashboard 上部のツールバーは、ウィジェットの表示内容を制御し、管理者が一般的な操作へすばやくアクセスできるようにします。

- **Period** — ウィジェットが対象とする期間（**Last 7 days**、**Last 14 days**、**Last 30 days**）を選択します。Dashboard 上のすべてのウィジェットがこの設定に従います。
- **Refresh** — 最新のデータでウィジェットを再読み込みします。
- **Invite User** — 他のユーザーを自分の OpenLM アカウントに招待する招待状を送信します。*(管理者のみ。)*
- **Activate Product** — 製品カタログを開いて OpenLM サービスを有効化します。[OpenLM Products](/cloud/openlm-administration/products) を参照してください。*(管理者のみ。)*

主要なアクション（Invite User、Activate Product）は管理者にのみ表示されます。

## ウィジェット

Dashboard には固定グリッドのウィジェットが表示されます。ウィジェットは背後にあるビューへリンクしており、読み込み中・データなし・エラーの各状態で同じ動作を共有するため、ダッシュボード全体が一貫して読み取れます。

- **License server status** — 監視対象のライセンスサーバー群の稼働状態で、1 件の障害が集計値の陰に隠れることはもうありません。
- **Top denied features** — 選択した期間内に、ユーザーが最も頻繁にライセンスの上限に達した機能です。
- **Top features in use** — チームが積極的に消費している機能で、拒否された機能と並べて表示されるため、需要とコストを比較できます。
- **License pool saturation** — 上限に達しているプールで、さらに拒否が発生する可能性があります。
- **License pool underutilization** — 遊休状態のプールで、ライセンスを回収または再割り当てできます。
- **Upcoming expirations** — 有効期限や更新日が近づいているライセンスで、期限を見逃さないようにします。
- **Recently expired licenses** — 選択した期間内に有効期限が切れたライセンスです。

まだセットアップ中の場合は、[Get started](/cloud/getting-started/what-is-openlm) を最初から最後まで実施し、各コンポーネントがこれらのウィジェットに表示されるデータのレポートを開始できるようにしてください。

## ウィジェットが非表示になる場合

ホームページのウィジェットは、アカウントで Software License Management が有効になっていることを前提とします。まだ有効になっていない場合、ウィジェットは非表示のままとなり、空のパネルや「データなし」のパネルを表示する代わりに、次の手順を説明するロックカードが表示されます。**Activate Product** から該当する製品を有効化し（[OpenLM Products](/cloud/openlm-administration/products) を参照）、ホームページに戻ってください。

## 関連

- [Verify your setup](/cloud/getting-started/verify-setup) — ウィジェットに頼る前に、データが流れていることを確認します。
- [Denials](/cloud/reporting/ui-reports/denials) と [Usage](/cloud/reporting/ui-reports/usage) — 拒否ウィジェットと使用状況ウィジェットの背後にある詳細ビューです。
- [BI Reports](/cloud/category/bi-reports) — Reporting Dashboard タブのダッシュボードです。
