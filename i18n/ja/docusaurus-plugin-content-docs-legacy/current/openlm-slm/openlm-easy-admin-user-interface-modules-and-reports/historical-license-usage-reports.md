---
title: ライセンス使用履歴レポート
description: "OpenLM はライセンスデータをリアルタイムで監視し、リレーショナルデータベースに蓄積します。"
sidebar_position: 6
---
OpenLM はライセンスデータをリアルタイムで監視し、リレーショナルデータベースに蓄積します。これにより、次の両方が可能になります:

- ネットワークライセンスのリアルタイム管理
- ライセンス使用履歴レポートの作成

本ドキュメントでは、OpenLM EasyAdmin User Interface で利用可能な履歴ライセンスレポートの概要を説明します。

EasyAdmin が提供する機能の全体像は、[こちらのドキュメント](../openlm-easyadmin-user-interface.md) を参照してください。

## License usage

EasyAdmin の **'Start' → 'Reports' → "License Usage"** をクリックします。

強力な License usage レポートでは、総ライセンス数に対する単一または複数フィーチャーの消費状況を集計します。設定可能な期間とサンプル解像度でライセンス消費パターンを表示し、ライセンス在庫のボトルネックや冗長性の特定に役立ちます。

このレポートは表示ペインのタブにより 3 つの形式で提供されます: 表、チャート、ヒートマップ。

![ライセンス消費を表で表示する EasyAdmin の License Usage レポート。](/img/legacy/Screenshot-2023-03-10-at-16.28.04.png)

![ライセンス消費の推移をチャートで表示する EasyAdmin の License Usage レポート。](/img/legacy/Screenshot-2023-03-10-at-16.25.41.png)

![ライセンス消費をヒートマップ図で表示する EasyAdmin の License Usage レポート。](/img/legacy/Screenshot-2023-03-10-at-16.30.10.png)

"License usage" レポートには次の特徴があります:

- チャートの表示期間をズームドラッグボタンで拡大/縮小できます。
- チャート表示を "steps"、"lines"、"Smoothed lines" から選択できます。

License usage ウィンドウのスマートフィルタでは、Server、Vendor、License Type、Additional Key（例: asset info）、Feature、User、Group、Project の条件でカスタマイズできます。

"License usage" フィルタの特徴:

- 使用レポートの期間を設定できます: 定義済み期間（例: last 30 days）または開始/終了の期間指定。
- "Aggregated usage" チェックボックスで、期間ごとの最大使用レベル（"top watermark"）表示か、ライセンスマネージャーが報告した実際の使用発生を表示するかを選択できます。

## License Activity

License Activity ウィンドウは、システム管理者が高度なレポートを作成し、個々のユーザーのライセンス活動を追跡できる機能です。このウィンドウの "Group by" タブでは、Workstations、Features、Users、Groups、Projects によるライセンス統計レポートを生成できます。

![Group by タブで個々のユーザーのライセンス活動を追跡する EasyAdmin の License Activity ウィンドウ。](/img/legacy/Screenshot-2023-03-10-at-16.36.55.png)

## Projects and group usage

OpenLM はユーザー活動の監視を可能にし、グループやプロジェクト単位でライセンス使用を割り当てられます。この機能は、ライセンスのチャージバック（使用量課金）ポリシーの実装に用いられることが多いです。

OpenLM における [さまざまなエンティティ（例: Users, Groups, Projects）](../../openlm-slm-features/openlm-group-usage/introducing-entities-in-openlm-users-groups-ip-and-hosts.md) については、こちらを参照してください。

## Project usage report

Project reporting は、プロジェクト指向の企業が、エンドユーザーが報告するアクティブプロジェクトに基づいたライセンス使用時間を取得できる機能です。

![アクティブなプロジェクトに紐づくライセンス使用時間を表示する EasyAdmin の Project usage レポート。](/img/legacy/Screenshot-2023-03-10-at-18.49.24.png)

プロジェクト別のライセンス使用レポートについては、[こちらのドキュメント](../../openlm-slm-features/openlm-project-usage.md) を参照してください。

## Group usage report

Group reporting は、マネージャーやシステム管理者がグループ別のライセンス使用統計を取得できる機能です。

![グループ別のライセンス使用統計を表示する EasyAdmin の Group usage レポート。](/img/legacy/Screenshot-2023-03-10-at-18.51.38.png)

## License utilization ("Efficiency report")

EasyAdmin の 'Start' ボタンをクリックし、'Management' → "License utilization" を選択します。

このチャートはライセンス使用効率を示します。各列 'x' は "少なくとも x 本のライセンスが同時に使用されていた時間の割合" を表します。この表示は瞬間的なピークを無視し、実際のライセンス消費パターンを直感的に示します。組織に必要なライセンス数を把握できます。

QoS ラインは、一定割合のライセンス要求を満たすために必要なライセンス数を示します。以下の例では、12 本中 7 本のライセンスがあれば 96% の要求を満たせることを示しています:

![12 本中 7 本のライセンスで要求の 96% を満たすことを示す QoS ラインを備えた EasyAdmin の License utilization 効率チャート。](/img/legacy/Screenshot-2023-03-10-at-18.56.58.png)

[この重要なレポートウィンドウの詳細は、こちらを参照してください](../../openlm-slm-features/license-utilization-efficiency-kb4063.md)。

## 追加のライセンス使用レポート

EasyAdmin の 'Start' ボタンをクリックし、'Reports' → "Feature usage per group" を選択します。このウィンドウは、選択したユーザーグループ（またはすべてのアクティブグループ）に対する選択フィーチャーの使用時間を、積み上げ縦棒グラフで表示します。チャートにカーソルを合わせると、バー各セクションの具体的な使用情報が表示されます。

![使用時間を積み上げ縦棒グラフで示す EasyAdmin の Feature usage per group レポート。](/img/legacy/Screenshot-2023-03-13-at-11.13.50.png)

EasyAdmin の 'Start' ボタンをクリックし、'Reports' → "Feature usage per user" を選択します。このウィンドウは、選択したユーザー（またはすべてのアクティブユーザー）に対する選択フィーチャーの使用時間を、積み上げ縦棒グラフで表示します。チャートにカーソルを合わせると、バー各セクションの具体的な使用情報が表示されます。

![使用時間を積み上げ縦棒グラフで示す EasyAdmin の Feature usage per user レポート。](/img/legacy/Screenshot-2023-03-13-at-12.05.59.png)

## Denied license requests

EasyAdmin の 'Start' ボタンをクリックし、'Reports' → 'Denials' を選択します。

ここでは、ライセンス拒否（denial）の履歴を表示します。

OpenLM が拒否レポートに対応している License Managers の一覧は、[こちらのドキュメント](https://www.openlm.jp/license-manager-capabilities/) を参照してください。

この機能には、ライセンスサーバーマシンへの OpenLM Broker のインストールが必要です。[詳細はこのドキュメントを参照してください](./license-denials-reporting.md)。

Denials レポートウィンドウの注意点:

- 情報は、time、user、project、group、workstation、denial type、vendor name、license server、license type（例: Floating, Node-locked）、"additional key"（例: FlexLM asset info）、Denial Type（License Server Error、Limit Reached、Problem With License、Restriction Or Authorization、Unspecified Reason、Other）などの条件で絞り込めます。
- 円グラフ、折れ線、テーブルで表示できます。
- フィルタには "True denials" チェックボックスがあります。ライセンス要求が拒否された後でも、1) 同一ライセンスサーバーの別プールに同じフィーチャーのライセンスがある場合、または 2) 別のライセンスサーバーにライセンスがある場合、ユーザーは自動的にライセンスを取得できることがあります。その場合でもログには拒否が記録されます。OpenLM はそのようなケースを除外し、実際にライセンスを取得できなかった場合のみを抽出できます。これを "True" denials と呼びます。**注: 選択した期間中に Administration → Denials パネルで "Track True Denials only" がチェックされていた場合、このトグルは効果がありません。**
  - フィルタには "Aggregated Denials" チェックボックスも含まれます。このオプションは拒否を指定期間で集計します。ユーザーが数秒おきにライセンス取得を試みる場合、同一タイムスタンプ内で多数の True Denials が発生します。例えば 1 分間に 5 回試行して 5 回拒否された場合、True Denials は 5 件として扱われますが、"Aggregated Denials" を有効にすると 1 件として表示されます。

![過去のライセンス拒否発生を円グラフで表示する EasyAdmin の Denials レポート。](/img/legacy/Screenshot-2023-03-13-at-12.34.56.png)

![過去のライセンス拒否発生を折れ線グラフで表示する EasyAdmin の Denials レポート。](/img/legacy/Screenshot-2023-03-13-at-12.36.51.png)

![過去のライセンス拒否発生を表で表示する EasyAdmin の Denials レポート。](/img/legacy/Screenshot-2023-03-13-at-12.39.15.png)

## OpenLM EasyAdmin User Interface - Widgets - Recent features denials

EasyAdmin の 'Start' ボタンをクリックし、'Widgets' → "Recent feature denials" を選択します。このウィンドウは、機能ごとのライセンス拒否を簡易集計で表示します。長期/短期の期間で拒否数を表示します。

![フィーチャーごとの長期・短期の拒否要求数を表示する EasyAdmin の Recent feature denials ウィジェット。](/img/legacy/Screenshot-2023-03-13-at-12.41.26.png)

Recent Features Denials

## さらに

上記の各種履歴ライセンスレポートに加えて、OpenLM ではカスタマイズしたライセンスレポートを作成できるプラットフォームも提供しています。詳細は[こちら](../../openlm-reporting-hub/openlm-reporting-hub-and-customized-license-reporting.md)をご覧ください。

ライセンス使用レポートに関する質問やリクエストがあれば、[サポートチーム](https://www.openlm.com/contact-us/)（support@openlm.com）までご連絡ください。
