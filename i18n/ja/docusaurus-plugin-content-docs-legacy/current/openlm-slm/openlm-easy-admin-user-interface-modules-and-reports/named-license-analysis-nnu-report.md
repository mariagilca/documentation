---
title: Named License Analysis (NNU) レポート
description: "Named License Analysis (NNU) レポートは、FlexLM の名前付きライセンスの割り当てと消費状況の概要を提供します。"
sidebar_position: 3
---
Named License Analysis (NNU) レポートは、FlexLM の Named ライセンスの割り当てと消費状況の概要を提供します。

このレポートは、組織の Named ライセンスの実使用状況を把握できるため、管理者にとって有用です。ライセンス計画やコスト削減に役立ちます。レポートを実行して結果を分析した後、管理者は NNU ライセンスに割り当てるユーザー数を増やすか、フローティングライセンスの負荷を減らすか、追加ライセンスを購入するかを判断できます。

このレポートは、Named ライセンスがベンダー契約に従って使用されているかどうかを可視化する自己監査ツールとしても機能し、ライセンス違反を早期に防いで高額な罰金や法的費用を回避できます。

## NNU レポートの起動

Named License Analysis (NNU) レポートは、**EasyAdmin Start → Reports → Named License Analysis (NNU)** で表示できます。

![Named License Analysis (NNU) レポートを選択した EasyAdmin の Reports メニュー。](/img/legacy/Screenshot-2023-03-14-at-09.53.16.png)

## レポートのフィルタとオプション

### Include current activity\*

このチェックボックスは、選択した Date フィルタに含まれる Named ライセンスのセッション活動のうち、まだ終了していないものをレポートに含めるかどうかを切り替えます。

\* *このオプションは "View by → Usage" モードでレポートを表示している場合のみ表示されます。*

### View by

結果の表示方法は次の 3 種類から選択できます:

**1. By allocation** - NNU ライセンスの概要を表示し、ライセンスの種類、総数、使用中の数などの情報を示します。このビューでは特定のフィーチャーまで掘り下げて、割り当て状況の現在の状態を表示できます。

![ライセンス種別、総数、使用中数を表示する Allocation ビューの Named License Analysis (NNU) レポート。](/img/legacy/Screenshot-2023-03-14-at-09.56.23.png)

*Allocation ビューを表示した Named License Analysis (NNU) レポート*

**2. By usage** - NNU ライセンスの詳細ビューです。ライセンスが誰に割り当てられているか、最後に使用された時刻、使用期間などの情報を確認できます。

![ライセンスの割り当て、最終使用、使用時間を表示する Usage ビューの Named License Analysis (NNU) レポート。](/img/legacy/Screenshot-2023-03-14-at-09.57.53.png)

*Usage ビューを表示した Named License Analysis (NNU) レポート*

**3. Not in use** - 特定期間に最も利用されていない NNU ライセンスの詳細ビューです。

![使用の少ないネームドライセンスと未使用のものを表示する Not In Use ビューの Named License Analysis (NNU) レポート。](/img/legacy/Screenshot-2023-03-14-at-11.38.46.png)

*Not In Use ビューを表示した Named License Analysis (NNU) レポート*

### Vendor name

このフィルタ設定では、ベンダー名で Named ライセンスを絞り込みます。

### Server name

このフィルタ設定では、ライセンスマネージャーサーバーで Named ライセンスを絞り込みます。

### Asset-info

このフィルタ設定では、所属するプール（Asset-info）で Named ライセンスを絞り込み、割り当て状況と使用データを確認します。

### License model

このフィルタ設定では、所属するライセンスモデルで Named ライセンスを絞り込みます。これはベンダーのライセンスファイルで決定され、各 asset-info プールには次のいずれかのフラグがあります:

- **NamedUser** - ユーザー単位でライセンスが割り当てられる
- **HostBased** - ワークステーション単位でライセンスが割り当てられる

### Features

このフィルタ設定では、割り当てられたフィーチャー（アプリケーション）ライセンスでユーザーを絞り込みます。

### Users

このフィルタ設定では、特定ユーザーの使用統計を確認できます。Date フィルタを "Today" に設定した場合、ユーザーに現在割り当てられている Named ライセンスも表示されます。

### Date

このフィルタでは、レポート生成に使用する期間を指定します。
