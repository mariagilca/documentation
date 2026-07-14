---
title: "拒否（Denials）"
description: "Denials レポートは、管理者が失敗したライセンス要求を追跡・分析し、根本原因を特定し、ライセンスプールを最適化するのに役立ちます。"
sidebar_position: 4
---

**Denials（拒否）** レポートは、ライセンスのチェックアウトに失敗した各試行を記録し、ユーザー、グループ、フィーチャ、サーバーなどの単位で分析できるようにします。ライセンスのボトルネックの発見、要求が拒否された理由の調査、ライセンス増設・再配分の根拠作りに活用できます。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Licenses and Features（ライセンスと機能）→ Denials** を選択します。
:::

Denials アプリは、左サイドバーにグループ化された 3 つの画面で構成されます。

| 画面 | グループ | 役割 |
| --- | --- | --- |
| **Denials** | Reporting | 拒否レポートのテーブル（既定の表示）。 |
| **General** | Management | どの拒否を記録するかを制御します。 |
| **Excluded Denials** | Management | 特定の拒否を保存対象から除外します。 |

## Denials レポート

**Reporting → Denials** を開くと、記録されたすべての拒否が、並べ替え・絞り込み可能なテーブルに表示されます。各行が 1 件の拒否です。多くの場合、利用可能なライセンスが無かったためにライセンス要求が拒否された瞬間を表します。

このレポートは過去の拒否発生を提示するもので、OpenLM が追跡する任意のディメンション（ユーザー、グループ、フィーチャなど）で集計できます。

![時刻・フィーチャ・サーバー・ベンダー・ライセンスタイプなどの列を持つ Denials レポートのテーブル](/img/reporting/denials/report.png)
*Denials レポート — 1 行が 1 件の拒否。絞り込み・並べ替え・列の調整が可能です。*

### 表示される項目

各拒否には、次の列を表示できます。

| 列 | 内容 |
| --- | --- |
| Time | 拒否が発生した日時 |
| Feature Name | 要求されたライセンス対象フィーチャ |
| Product Name | フィーチャが属する製品 |
| Server Name | 要求を処理したライセンスサーバー |
| Vendor Name | ライセンスマネージャまたはベンダーデーモン |
| License Type | ライセンスモデル（例: Floating） |
| Version | 要求されたソフトウェアのバージョン |
| Additional Key | 追加ライセンスキー（該当する場合） |
| Total Available Licenses | 要求時点でプールに存在するライセンス数 |
| User Name | 要求を拒否されたユーザー |
| Workstation | 要求元のマシン |
| Error | ライセンスマネージャが返したエラー |
| Group | ユーザーのグループ |

列の表示・非表示・固定は、ヘッダー行の右端にある列メニュー（**⋮** アイコン）を開き、**Columns** を選択して設定します。

### レポートの絞り込み

テーブル上部のコントロールで表示範囲を絞り込めます。

- **Denials Time** — 期間を限定します。プリセット（**Last 7 Days**、**Last 30 Days**、**Last 60 Days**、**Last 180 Days**、**Last 360 Days**）を選ぶか、**Custom** を選んでカレンダーで開始日・終了日を指定します。
- **Show true denials only** — 「false（偽）」の拒否（あるサーバーで拒否されたが別の場所で満たされた要求）を非表示にします。真の拒否の定義については [記録する拒否の設定](#記録する拒否の設定) を参照してください。
- **Filters**（じょうごアイコン） — 列ごとのフィルターのオン／オフを切り替えます。有効にすると各列ヘッダーの下にフィルターボックスが表示され、その列の値で絞り込めます。
- **Search** — テーブル全体を対象としたフリーテキスト検索。
- **Refresh** — 最新データを再読み込みします。

テーブル下部のページャーで、ページサイズの変更やページ移動ができます。

## 記録する拒否の設定

**Management → General** を開くと、OpenLM が拒否として保存する対象を制御できます。

![License Pull Tolerance と Track True denials only チェックボックスを表示した General 設定画面](/img/reporting/denials/general.png)
*General 設定で、OpenLM が記録する拒否を制御します。*

- **License Pull Tolerance (seconds)** — 猶予時間（既定値 **60**）。あるサーバーで拒否されたユーザーが、この時間内に*別の*サーバーから同じライセンスの取得に成功した場合、最初の拒否は false と見なされ、真の拒否として計上されません。
- **Track True denials only** — 有効にすると、ライセンスが最終的に別のプールまたはライセンスサーバーで付与された場合、その拒否を記録しません。また（上記 License Pull Tolerance の枠に基づく）false の拒否も除外します。これは Denials レポート全体に適用されるグローバル設定です。この設定は**今後のデータにのみ**適用され、すでにデータベースにある拒否は変更されず、false の拒否が残る場合があります。

変更を反映するには **Save**、破棄するには **Cancel** を選択します。

## 特定の拒否を除外する

拒否の中には、保存する必要のない「ノイズ」— 繰り返し発生するライセンスマネージャのエラー — もあります。**Management → Excluded Denials** を開いて除外ルールを作成します。拒否は、ライセンスサーバー**かつ**そのサーバーに登録した Major Error Code または Error Message に一致した場合に破棄されます。エラールールが無いサーバーでは何も除外されません。

この画面は 2 つのパネルで構成されます。

- **左** — 除外ルールを持つライセンスサーバー。各サーバーの **License Manager**（ライセンスマネージャの種類）も表示されます。
- **右** — 選択したサーバーに対する **Major Error Code** と **Error Message** のルール。

![左にライセンスサーバーのパネル、右にエラールールのパネルを持つ Excluded Denials 画面](/img/reporting/denials/excluded-denials.png)
*Excluded Denials: 左でサーバーを選択し、右でそのエラールールを管理します。*

### 除外ルールの追加

1. **+ Add Error** を選択します。
2. **Add Excluded Error** ダイアログで、一致させる **Major Error Code** と **Error Message**（いずれか、または両方）を入力します。
3. ルールを適用する **License Server** を選択します。
4. **Save** を選択します。

![Major Error Code、Error Message、License Server の各フィールドを持つ Add Excluded Error ダイアログ](/img/reporting/denials/add-excluded-error.png)
*Add Excluded Error ダイアログ。*

以降、一致する拒否は保存されなくなります。ルールを削除するには、右パネルで対象を選択して **Delete** を選びます。

:::note[Major Error Code について]
**Major Error Code** は、拒否とともにライセンスマネージャが返す番号で、OpenLM のコードではなくマネージャ固有のものです。FlexLM/FlexNet 系のサーバー（Autodesk、Esri など多数）では、`-4`（利用可能なライセンスがすべて使用中）、`-15`（ライセンスサーバーに接続できない）、`-10`（フィーチャの有効期限切れ）、`-18`（サーバーがこのフィーチャに対応していない）などが一般的です。DSLS、RLM、Sentinel など他のマネージャは独自のコードを使用します。

`-4` のような本当のライセンス不足は通常残すべきです。接続エラーなど、自分にとってノイズとなるコードを除外してください。除外すべき正確なコードとメッセージは、既存の拒否レポート、データベースクエリ、またはライセンスマネージャのドキュメントで確認できます。
:::

## 関連レポート

- **[Denial Analysis](/cloud/reporting/bi-reports/basic-reports/denial-analysis/denials-report)** — 拒否をユーザー別・フィーチャ別に集計し、詳細テーブルへドリルスルーできる BI ダッシュボード。
- **[Shadow denials](/cloud/reporting/bi-reports/basic-reports/shadow-denials)** — シャドウライセンスポリシーにより OpenLM が利用を制限したキャッピングイベント。
- **[拒否されたときの対処](/cloud/for-end-users/dealing-with-denials)** — 拒否に遭遇したエンドユーザー向けのガイダンス。
