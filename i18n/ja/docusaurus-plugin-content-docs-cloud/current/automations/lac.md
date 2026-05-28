---
sidebar_position: 1
title: ライセンスアクセス制御 (LAC)
---

# ライセンスアクセス制御（LAC）

License Access Control（LAC）は、ベンダー固有のオプションファイルや管理コンソールに触れることなく、「誰がどのライセンスを使えるか」を一元的・ベンダー非依存で制御する仕組みです。LAC を使って、アクセスルールの定義、席の予約、ポリシーのスケジューリング、変更のデプロイ、利用状況の監査を FlexLM、DSLS、RLM、Autodesk Cloud、LinkedIn などにわたって実施できます。

## できること

- 統一ルール管理: 一度定義すれば、各ライセンスマネージャーの形式へ変換
- 権限と予約: INCLUDE/EXCLUDE による許可/禁止、RESERVE による席の予約
- スケジューリング/ポリシー: 地域やシフトに合わせ特定の曜日/時間で有効化
- 自動デプロイと履歴: 変更をデプロイ、ステータス確認、誰がいつ何を変更したか追跡
- 可視化: リアルタイム/履歴の「誰が何を使用中か」を把握

## 基本概念

- LAC Asset: 管理対象のライセンス実体（例: FlexLM のサーバー/ベンダーペア、Autodesk Cloud テナント）。新規は「承認待ち」で、管理前に承認が必要。
- Rules: フィーチャ/製品ごとのアクセス定義（INCLUDE/EXCLUDE/RESERVE、MAX、TIMEOUT など）
- Policies: ルールの集合。有効/無効の切替やスケジュールが可能。
- Deploy: 現行ポリシーのルールを対象アセットへ反映。クラウドアセットはルール単位で更新。

## 対応ライセンスマネージャー

- FlexLM (FLEXnet Publisher)
- DSLS (Dassault)
- RLM (Reprise)
- Autodesk Cloud (named‑user)
- LinkedIn (named‑user)

利用できるルールはマネージャーによって異なります。LAC は対象に適用可能な種類のみを表示します。

## 画面と操作

LAC のサイドバーは「Operational」（Overview）と「Management」（Pending、Denied、Policies、Rules、Deployment、Settings）の 2 つに分かれています。

### Overview

承認済みアセットの中央ダッシュボードです。

![The LAC Overview page lists each approved asset with its server name, license manager type, vendor, and the number of rules and policies attached.](/services/lac/overview.png)
*Figure 1. LAC の Overview ページ。承認済みアセットごとにサーバー名、ライセンスマネージャータイプ、ベンダー、ルール数、ポリシー数が表示されます。*

### Pending

承認待ちのアセットを一覧表示します。

![The LAC Pending page lists newly discovered assets and previews the current option file content for the selected asset.](/services/lac/pending.png)
*Figure 2. LAC の Pending ページ。新たに検出されたアセットを一覧表示し、選択したアセットの現行オプションファイル内容をプレビューします。*

### Denied

過去に拒否したアセットの一覧です。**Restore To Pending** で再度承認待ちに戻せます。

![The LAC Denied Assets page lists assets you previously denied, with a Restore To Pending action.](/services/lac/denied.png)
*Figure 3. LAC の Denied Assets ページ。以前に拒否したアセットを一覧表示し、Restore To Pending（保留に戻す）操作が利用できます。*

### Policies

ルールをまとめたポリシーの一覧です。スケジュールを設定して時間帯ごとに有効化できます。

![The LAC Policies page lists policies with their description, server, license manager type, vendor, deploy cron, and create/update dates.](/services/lac/policies.png)
*Figure 4. LAC の Policies ページ。各ポリシーの説明、サーバー、ライセンスマネージャータイプ、ベンダー、デプロイ Cron、作成日／更新日が表示されます。*

### Rules

**Deployed** と **Undeployed** の 2 つのタブでルールの状態を切り替えて表示します。Add Rule ウィザードでは複数のエンティティと複数のフィーチャーを一度に選択でき、LAC はエンティティ × フィーチャーの組み合わせごとにルールを作成します。

![The Deployed tab on the LAC Rules page lists rules already pushed to the license manager.](/services/lac/rules-deployed.png)
*Figure 5. LAC の Rules ページの Deployed タブ。ライセンスマネージャーに反映済みのルールが表示されます。*

![The Undeployed tab on the LAC Rules page lists rules that have been saved but not yet deployed.](/services/lac/rules-undeployed.png)
*Figure 6. LAC の Rules ページの Undeployed タブ。保存済みでまだデプロイされていないルールが表示されます。*

### Deployment

**Queue**、**Schedule**、**History** の 3 つのタブでデプロイ活動を追跡します。

![The Queue tab on the LAC Deployment page lists deployments awaiting Broker processing.](/services/lac/deployment-que.png)
*Figure 7. LAC の Deployment ページの Queue タブ。Broker による処理待ちのデプロイが一覧表示されます。*

![The Schedule tab on the LAC Deployment page lists upcoming, automatically scheduled policy deployments.](/services/lac/deployment-schedule.png)
*Figure 8. LAC の Deployment ページの Schedule タブ。自動でスケジュールされた今後のポリシーデプロイが一覧表示されます。*

![The History tab on the LAC Deployment page lists completed deployments with status, timestamp, and any skipped rules.](/services/lac/deployment-history.png)
*Figure 9. LAC の Deployment ページの History タブ。完了済みデプロイのステータス、タイムスタンプ、スキップされたルールが表示されます。*

### Settings

組織全体に適用される LAC の設定ページです。

![The LAC Settings page shows the Workstation Agent Enforcement toggle, an info tooltip, and a Save button.](/services/lac/SETTINGS.png)
*Figure 10. LAC の Settings ページ。Workstation Agent Enforcement トグル、情報ツールチップ、Save ボタンが表示されます。*

#### Workstation Agent Enforcement

有効化すると、LAC はルールをデプロイする前にユーザーに OpenLM Workstation Agent がインストールされ動作中であることを確認します。アクティブなエージェントを持たないユーザー向けのルールはデプロイ時にスキップされ、*Deployment → History* に記録されます。グループとホスト向けのルールは常に通常どおりデプロイされます。

- **対象ルール**：個々のユーザーを対象とするルールのみ（INCLUDE、INCLUDEALL、ALLOW、RESERVE）
- **スコープ**：組織全体に適用
- **タイミング**：次回のデプロイから適用。既存の割り当ては遡及的に取り消されません

## 一般的なワークフロー

1) アセットの承認

- 新しいライセンスソースは承認待ちの LAC アセットとして表示されます。管理したいものを承認します。Subscription Optimizer（../subscription-optimizer）等の自動化と連携する場合はアセットを「最適化対象」に指定できます。

2) ルールの作成

- フィーチャ/製品に対して許可（INCLUDE/EXCLUDE）や予約（RESERVE）を追加します。ルール対象はユーザー、グループ、ホスト、IP（FlexLM）、名前付きユーザー（クラウド）など。

3) ポリシー化とスケジュール（任意）

- ルールをポリシーにまとめ、曜日/時間で有効化をスケジュールします。

4) デプロイ

- 変更をライセンスマネージャーへ反映。レスポンスやデプロイ履歴を確認します。

5) 監視

- 利用レポートや監査ログでアクセス/可用性/順守の状況を検証します。

## 管理者向けクイックチェックリスト

LACを素早く有効化し認証するにはこのチェックリストを使用してください。

1) アセット承認

- LAC を開き、制御したいアセット（サーバー/テナント）を承認します。
- クラウドアセットは SAS Agent 経由で管理者資格情報が連携されていることを確認します。

2) モード選択（オンプレのみ）

- FlexLM/DSLS/RLM は管理モード（LAC がルールを書き込む）または参照専用（既存ルールを表示）のいずれか。

3) 利用対象ルールの作成（INCLUDE）

- 製品/フィーチャを利用できる対象ユーザー/グループを指定します。

4) 必要に応じて予約（RESERVE）

- 重要度が高い場合、特定のユーザー/グループに確保席を予約します。

5) 整理とスケジュール（任意）

- ルールをポリシー化し、有効化ウィンドウをスケジュールします。

6) デプロイ

- 変更をデプロイし、LAC アセットのステータスを確認します。

7) 検証と監視

- 対象ユーザーで動作確認し、監査/デプロイ履歴や利用レポートを確認します。

## ルールカテゴリと代表的な種類

- 権限 (Permissions)
  - INCLUDE / EXCLUDE（ユーザー、グループ、ホスト、IP 範囲（FlexLM）、名前付きユーザー（クラウド））
- 予約 (Reservations)
  - RESERVE（ユーザー/グループへの席予約）
- 制限 (Limitations)
  - MAX n（同時利用の上限）、TIMEOUT（FlexLM のアイドルタイムアウト）、その他マネージャー固有の制限
- Global options（マネージャー固有）
  - 全体の挙動に影響する広域設定

LAC は入力を検証し、各マネージャーに適したバックエンド構文へ自動変換します。

## プラットフォーム別の例

### FlexLM（サーバーベース）

- 目標: 「Designers」グループにフィーチャー ACD の使用を許可し、特定ユーザーを ACDLT から除外、「CAD-Leads」グループに ACD の3ライセンスを予約し、ACD の同時使用を10に制限します。アイドル状態のセッションは30分後にタイムアウトします。

LAC 上の手順:

- 権限 (Permissions)
  - INCLUDE group Designers → feature ACD
  - EXCLUDE user alice → feature ACDLT
- 予約 (Reservations)
  - RESERVE 3 → feature ACD → group CAD‑Leads
- 制限 (Limitations)
  - MAX 10 → feature ACD
  - TIMEOUT 1800 → feature ACD (idle close after 1800 seconds)

FlexLM アセットへデプロイします。LAC は適切な options ファイル記述を生成し、Broker 経由で反映します。

FlexLM の設定例（参考）:

```
INCLUDE ACD GROUP Designers
EXCLUDE ACDLT USER alice
RESERVE 3 ACD GROUP CAD-Leads
MAX 10 ACD
TIMEOUT ACD 1800
```

注意

- INCLUDE/RESERVE はグループの活用を推奨（保守容易性）
- デプロイ後、ベンダー要件により reread/restart が必要な場合があります（LAC にステータスが表示されます）。

### Autodesk Cloud（名前付きユーザー）

- 目標: 「BIM-Users」グループに AutoCAD のネームドユーザーライセンスへのアクセスを許可し、2名のプロジェクトリード用に席を予約し、「すべてに一括割り当て」パターンを防止します。

LAC 上の手順:

- Autodesk Cloud アセットを承認し、SAS Agent に有効な管理者認証情報が設定されていることを確認します。
- 権限 (Permissions)
  - INCLUDE group BIM‑Users → product AutoCAD
- 予約 (Reservations)
  - RESERVE user lead1@example.com → AutoCAD
  - RESERVE user lead2@example.com → AutoCAD
- （任意）Subscription Optimizer を使用する場合は、アセットを「最適化済み」としてマークします。
- デプロイ: LAC がルールごとに Autodesk テナントへ更新を実行します。

動作

- 名前付きユーザーのアクセスはクラウド側で強制されます。LAC は API を通じ割り当てを作成/更新します。
- アセット全体への一括割り当ては避け、INCLUDE/RESERVE による制御を維持してください。
- Subscription Optimizer（../subscription-optimizer）を併用する場合、INCLUDE が適格性、RESERVE が確保席を表し、必要に応じて最適化が非クリティカル席を再割当します。

## ステップバイステップ: はじめに

1. 管理対象にする LAC アセットを承認します。
2. 対象となるユーザーまたはグループに対して INCLUDE ルールを作成し、必要に応じて RESERVE ルールを追加します。
3. （任意）ポリシーを作成し、特定の時間帯にスケジュールします。
4. 変更をアセットにデプロイし、デプロイ状況を確認します。
5. 対象範囲内のユーザーでテストしてアクセスを確認し、レポートで利用状況を確認します。

## ベストプラクティス

- 保守を簡素化するため、個別ユーザーよりもグループを優先します。
- 対象者の定義はまず INCLUDE ルールから始め、確実なアクセスが必要な箇所にのみ RESERVE を追加します。
- スケジューリングを活用して、地域/チーム間でアクセス時間帯を切り替えます。
- デプロイ履歴と利用状況を定期的に見直し、未使用のルールは廃止します。
- クラウドのネームドユーザープラットフォームでは「assign all」のような一括割り当てを避け、ルールベースの制御を推奨します。

## LAC の適用箇所

- ルールベース制御とスケジューリングに対応したオプションファイル管理（オンプレミスの FlexLM/DSLS/RLM）。
- Autodesk Cloud および LinkedIn のネームドユーザー制御。
- 自動席再割り当てのための Subscription Optimizer の対象判定と予約（../subscription-optimizer）。

## 関連セットアップ

- Process Managerプロセスマネージャー（利用シグナル）: /cloud/automations/process-manager
- Personal Dashboardパーソナルダッシュボード（ユーザー通知/セルフサービス）: ../users/personal-dashboard.md

## FAQ

<details>
<summary>FAQ を表示</summary>

Q: LAC はオプションファイルを完全に置き換えますか？  
A: FlexLM/DSLS/RLM の「管理（managed）」モードでは、LAC が信頼できる唯一の情報源となり、ルールをサーバーへデプロイします。「読み取り専用（read-only）」モードでは、既存ファイルを取り込み表示するだけで変更は行いません。

Q: マネージャーごとに利用できるルールはどれですか？  
A: LAC は選択したライセンスマネージャーで有効な種類のみを提供します。たとえば、FlexLM は INCLUDE/EXCLUDE/RESERVE/MAX/TIMEOUT をサポートします。Autodesk Cloud はネームドユーザーの権限と予約に特化しています。

Q: LAC は Subscription Optimizer とどのように連携しますか？  
A: LAC が対象（INCLUDE）と予約（RESERVE）を定義します。Subscription Optimizer は、全席が使用中の際にこれらの情報を用いて自動で席を再割り当てします。

Q: 変更を監査できますか？  
A: はい。デプロイ状況と変更履歴が追跡されます。誰がいつ何を変更したかを確認できます。

</details>

## トラブルシューティング

<details>
<summary>トラブルシューティングを表示</summary>

- ルールが反映されない  
  - アセットが承認済みで管理対象になっていることを確認します。  
  - ポリシーが有効化され、正常にデプロイされているか確認します。  
  - FlexLM の場合、ベンダー要件に応じてサーバーの再読み込み/再起動が完了しているか確認します。

- ユーザーがフィーチャーにアクセスできない  
  - INCLUDE/EXCLUDE の順序を確認し、対象ユーザー/グループが有効なポリシーで指定されているかを確認します。  
  - 予約席が必要な場合、該当するフィーチャー/プールに対する RESERVE ルールが存在するか確認します。

- クラウド（Autodesk/LinkedIn）のデプロイエラー  
  - SAS Agent 経由の管理者資格情報が有効であり、（必要に応じて）アセットが最適化対象としてマークされていることを確認します。  
  - アセット全体への「assign all」は避け、ルールベースの割り当てを使用します。

- 想定外のアクセス  
  - 重複するポリシーやスケジューリングの時間帯を見直します。  
  - グローバル設定やマネージャー固有の設定（例: ローカルルールを上書きする FlexLM のオプション）を確認します。

</details>
