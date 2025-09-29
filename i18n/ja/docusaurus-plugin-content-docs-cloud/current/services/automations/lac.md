---
sidebar_position: 1
title: License Access Control (LAC)
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

Use this checklist to enable and validate LAC quickly:

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

- Permissions
  - INCLUDE / EXCLUDE（ユーザー、グループ、ホスト、IP 範囲（FlexLM）、名前付きユーザー（クラウド））
- Reservations
  - RESERVE（ユーザー/グループへの席予約）
- Limitations
  - MAX n（同時利用の上限）、TIMEOUT（FlexLM のアイドルタイムアウト）、その他マネージャー固有の制限
- Global options（マネージャー固有）
  - 全体の挙動に影響する広域設定

LAC は入力を検証し、各マネージャーに適したバックエンド構文へ自動変換します。

## プラットフォーム別の例

### FlexLM（サーバーベース）

- Goal: Allow the “Designers” group to use feature `ACD`, deny a specific user for `ACDLT`, reserve 3 seats of `ACD` for the “CAD‑Leads” group, and limit `ACD` to 10 concurrent uses. Idle sessions should time out after 30 minutes.

LAC 上の手順:

- Permissions
  - INCLUDE group Designers → feature ACD
  - EXCLUDE user alice → feature ACDLT
- Reservations
  - RESERVE 3 → feature ACD → group CAD‑Leads
- Limitations
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

Tips

- INCLUDE/RESERVE はグループの活用を推奨（保守容易性）
- デプロイ後、ベンダー要件により reread/restart が必要な場合があります（LAC にステータスが表示されます）。

### Autodesk Cloud（名前付きユーザー）

- Goal: Permit the “BIM‑Users” group to access AutoCAD named‑user seats; reserve seats for two project leads; prevent mass assign‑all patterns.

LAC 上の手順:

- Approve the Autodesk Cloud asset; ensure SAS Agent holds valid admin credentials.
- Permissions
  - INCLUDE group BIM‑Users → product AutoCAD
- Reservations
  - RESERVE user lead1@example.com → AutoCAD
  - RESERVE user lead2@example.com → AutoCAD
- (Optional) Mark the asset as “optimized” if you plan to use Subscription Optimizer.
- Deploy. LAC performs per‑rule updates to the Autodesk tenant.

動作

- 名前付きユーザーのアクセスはクラウド側で強制されます。LAC は API を通じ割り当てを作成/更新します。
- アセット全体への一括割り当ては避け、INCLUDE/RESERVE による制御を維持してください。
- Subscription Optimizer（../subscription-optimizer）を併用する場合、INCLUDE が適格性、RESERVE が確保席を表し、必要に応じて最適化が非クリティカル席を再割当します。

## ステップバイステップ: はじめに

1. Approve the LAC asset(s) you want to manage.
2. Create INCLUDE rules for eligible users or groups; add RESERVE rules as needed.
3. (Optional) Create a policy and schedule it to specific time windows.
4. Deploy changes to the asset and verify the deploy status.
5. Confirm access by testing with a user in scope; review usage in reports.

## ベストプラクティス

- Prefer groups over individual users to simplify maintenance.
- Start with INCLUDE rules to define eligibility; add RESERVE only where guaranteed access is required.
- Use scheduling to shift access windows between regions/teams.
- Review deployment history and usage regularly; retire unused rules.
- For cloud named‑user platforms, avoid “assign all” patterns—favor rule‑based control.

## LAC の適用箇所

- Options file management (on‑prem FlexLM/DSLS/RLM) with rule‑based control and scheduling.
- Named‑user control for Autodesk Cloud and LinkedIn.
- Subscription Optimizer eligibility and reservations (../subscription-optimizer) for automated seat reallocation.

## 関連セットアップ

- Process Manager (usage signals): ../data-collection/process-manager.md
- Personal Dashboard (user notifications/self‑service): ../users/personal-dashboard.md

## FAQ

<details>
<summary>Show FAQ</summary>

Q: Does LAC replace options files entirely?  
A: For FlexLM/DSLS/RLM in “managed” mode, LAC becomes the source of truth and deploys rules to the server. In “read‑only” mode, LAC imports and displays existing files without changing them.

Q: Which rules are available per manager?  
A: LAC exposes only valid types for the selected manager. For example, FlexLM supports INCLUDE/EXCLUDE/RESERVE/MAX/TIMEOUT; Autodesk Cloud focuses on named‑user permissions and reservations.

Q: How does LAC interact with Subscription Optimizer?  
A: LAC defines eligibility (INCLUDE) and performs reservations (RESERVE). Subscription Optimizer uses these to reassign seats automatically when all seats are in use.

Q: Can I audit changes?  
A: Yes. Deployment status and change history are tracked. You can review who changed what and when.

</details>

## トラブルシューティング

<details>
<summary>Show troubleshooting</summary>

- Rules not taking effect
  - Confirm the asset is approved and managed.
  - Check that the policy is enabled and deployed successfully.
  - For FlexLM, ensure the server reread/restart completed if required by the vendor.

- Users can’t access a feature
  - Verify INCLUDE/EXCLUDE order and that the user/group is targeted by an active policy.
  - For reserved seats, ensure a RESERVE rule exists for the correct feature/pool.

- Cloud (Autodesk/LinkedIn) deploy errors
  - Ensure admin credentials are valid via SAS Agent and the asset is marked as optimized (if required).
  - Avoid entire‑asset “assign all”; use rule‑based assignments.

- Unexpected access
  - Review overlapping policies and scheduling windows.
  - Check global or manager‑specific settings (e.g., FlexLM options that override local rules).

</details>
