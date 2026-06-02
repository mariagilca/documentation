---
id: license-access-control
title: ライセンスアクセス制御 (LAC)
sidebar_position: 1
slug: lac
description: "対象読者: OpenLM の管理者およびオペレーター。目的: ライセンスアクセス制御 (LAC) を構成、デプロイ、運用し、誰がどのライセンスをいつ使用できるかを管理します。"
---
対象読者: OpenLM の管理者およびオペレーター  
目的: ライセンスアクセス制御 (LAC) を構成、デプロイ、運用し、誰がどのライセンスをいつ使用できるかを管理します。


## LAC とは

ライセンスアクセス制御 (LAC) は、ライセンス管理を受動的な監視から、能動的でポリシー主導の制御へと変えます。ルール（誰が／何を／いつ）を定義すると、LAC がそれをオプションファイルにコンパイルしてライセンスマネージャーへデプロイします。ライセンスマネージャーは、チェックアウト時にそれらのルールを適用します。LAC は、監査とトラブルシューティングのために結果も記録します。

### 機能

- **きめ細かいアクセス制御** — 特定のフィーチャー、ユーザー、グループ、ホストを対象にします。  
- **ポリシー** — ルールをまとめ、スケジュールを追加します。1 つのアセットで同時に有効化できるポリシーは 1 つだけです。  
- **ルールの一括作成** — Add Rule ウィザードで複数のエンティティと複数のフィーチャーを選択します。LAC はエンティティ × フィーチャーの組み合わせごとに 1 つのルールを作成し、重複は警告とともにスキップします。  
- **Workstation Agent の強制** — LAC がユーザーにライセンスを割り当てる前に、OpenLM Workstation Agent を必須にできます（任意。*Settings* を参照）。  
- **SaaS サポート** — オンプレミスのサーバーに加えて、AutodeskCloud などの SaaS ライセンスマネージャーにポリシーを（手動およびスケジュールで）デプロイします。  
- **監査ログ** — 許可／拒否の試行を、タイムスタンプと各変更を実行したユーザーとともに記録します。  
- **連携** — UGS を通じて AD/LDAP グループを活用し、Features Service を通じてフィーチャーを検証します。  



## 対応ライセンスマネージャー

LAC は 2 種類のライセンスマネージャーを管理します。オンプレミスのマネージャーでは、LAC がルールをオプションファイルにコンパイルし、Broker を通じてサーバーへデプロイします。SaaS プラットフォームでは、LAC がルール単位の名前付きユーザー更新をクラウドテナントへ直接適用します。

**オンプレミス（オプションファイルベース）**

- [Flexera FlexNet (FLEXlm)](../data-collection/connect-license-managers/engineering-lms/flexera-flexnet-flexlm.mdx)  
- [DSLS](../data-collection/connect-license-managers/engineering-lms/dsls.mdx)  
- [Reprise RLM](../data-collection/connect-license-managers/engineering-lms/reprise-rlm.mdx)  
- [LM-X](../data-collection/connect-license-managers/engineering-lms/lm-x.mdx)  
- [Sentinel RMS](../data-collection/connect-license-managers/engineering-lms/sentinel-rms.mdx)  

**SaaS（名前付きユーザー）**

- [Autodesk Cloud](../data-collection/connect-license-managers/saas-platforms/autodesk-cloud.mdx)  
- [LinkedIn Sales Navigator](../data-collection/connect-license-managers/saas-platforms/linkedin-sales-navigator.mdx)  

利用できるルールの種類はライセンスマネージャーによって異なります。LAC は、選択したマネージャーがサポートするルールカテゴリと種類のみを表示します。たとえば、FlexLM は INCLUDE、EXCLUDE、RESERVE、MAX、TIMEOUT のディレクティブに対応し、SaaS プラットフォームは名前付きユーザーの権限と予約に特化しています。



## 基本概念

- **アセット (Asset)**（LAC における）: ホスト + ポート + ライセンスマネージャータイプ + オプションファイルの一意の組み合わせ。  
- **モード (Mode)**:  
  - *読み取り専用 (Read-only)* — オプションファイルの内容を監視します。制御は行いません。  
  - *管理 (Managed)* — LAC がオプションファイルを制御し、サーバーへデプロイします。  
- **ルール (Rule)**: 個々のディレクティブ（例: `INCLUDE feature X FOR GROUP SeniorEngineers`）。  
- **ポリシー (Policy)**: 単一のアセットに対するルールの集合。任意でスケジュールを設定できます。  
- **デプロイメント (Deployment)**: ルールをオプションファイルにコンパイルし、Broker を通じてライセンスサーバーへ送信すること。  

:::tip[主な動作]
- **Overview** ページからデプロイすると、アセットにリンクされたすべてのルールがコンパイルされます。  
- **Policy** をデプロイすると、そのポリシーのルールのみがコンパイルされます（そのアセットに対する排他的なセット）。  
:::



## 前提条件

1. （ライセンスサーバーごとに）Broker をインストールし、到達可能であることを確認します。  
2. 各 Broker の構成で `Watch option file = true` を有効にします。  
3. Broker Hub でホストを**承認**します。  
4. License Servers でライセンスサーバーを**承認**します（管理 (Managed) モードに必要）。  
5. （任意。Workstation Agent の強制用）OpenLM Workstation Agent をユーザーのマシンにデプロイし、個々のユーザー向けルールを割り当てる前に LAC がアクティブなエージェントを確認できるようにします。  

:::note[データの可用性]
前提条件を満たすと、LAC は新しいアセットを Pending に表示します（検出までに若干の遅延が生じることがあります）。
:::



## 一般的なワークフロー

1. **アセットの検出と承認**  
   - *Pending → アセットを選択 → Approve* に移動します。  
   - モードを選択します:  
     - *読み取り専用 (Read-only)*: 監視のみ（ライセンスサーバーの承認は不要）。  
     - *管理 (Managed)*: 完全な制御（ライセンスサーバーの承認が必要）。  
   - 承認すると、LAC は現在のオプションファイルを未デプロイのルールとして解析します。  

2. **ルールの作成**  
   - *Rules → Add rule* を開きます。  
   - 関連するアセットを選択します（ライセンスマネージャーに応じて、利用可能なルールカテゴリ／種類が絞り込まれます）。  
   - 次を定義します:  
     - カテゴリ（例: Permissions、Reservations）  
     - 種類（例: INCLUDE、EXCLUDE、RESERVE）  
     - フィーチャー（1 つまたは複数。`licenseId` などの任意の修飾子も指定可能）  
     - エンティティの種類／値（User、Group、Host。値は UGS/AD から取得） — 複数のエンティティを一度に選択できます  
     - ルール値（ルールの種類が必要とする場合）  
   - 保存します。新しいルールは、デプロイするまで未デプロイのままです。複数のエンティティやフィーチャーを選択すると、LAC はエンティティ × フィーチャーの組み合わせごとに 1 つのルールを作成し、重複は警告とともにスキップします。  

3. **ルールをポリシーにまとめる**  
   - *Policies → Add Policy* に移動します。  
   - **Name**、**Description**、**Status**（active/inactive）を入力します。  
   - 任意の **Schedule**（曜日／時刻）を追加します。  
   - **アセット**を選択します（ポリシーごとに 1 アセット）。  
   - **ルール**を選択します（アセットで絞り込み）。  
   - 保存します。アクティブかつスケジュール設定済みの場合、LAC はデプロイを自動的にスケジュールします。  

4. **デプロイ**  
   - 手動（アセット全体）: *Overview → 管理 (Managed) アセットを選択 → Deploy*（すべてのルール）。  
   - 手動（ポリシーのみ）: *Policies → ポリシーを選択 → Deploy*（そのポリシーのルールのみ）。  
   - スケジュール（ポリシー）: LAC はポリシーのスケジュールに基づいてデプロイをキューに入れます。  
   - SaaS ライセンスマネージャー（例: AutodeskCloud）は、手動とスケジュールの両方のポリシーデプロイに対応します。  

5. **デプロイの監視**  
   - *Deployment → Queue*: Broker による処理を待機しているリクエスト。  
   - *Deployment → Schedule*: スケジュールされたポリシーデプロイ。  
   - *Deployment → History*: 成功／失敗、タイムスタンプ、エラー、スキップされたルール。使用したオプションファイルをプレビューできます。  

6. **運用と改善**  
   - **Audit** ログを使用して、許可 (Granted)／拒否 (Denied) の結果を確認し、各変更を実行したユーザーを把握します。  
   - ルール／ポリシーを調整し、必要に応じて再デプロイします。  



## 画面と操作

LAC は、サイドバーで 2 つのページ群に分かれています: **Operational**（Overview）と **Management**（Pending、Denied、Policies、Rules、Deployment、Settings）。

### Overview

Overview ページは、承認済みアセットの中央ダッシュボードです。

![The LAC Overview page lists each approved asset with its server name, license manager type, vendor, and the number of rules and policies attached.](/services/lac/overview.png)
*図 1. LAC の Overview ページは、承認済みの各アセットについて、サーバー名、ライセンスマネージャータイプ、ベンダー、リンクされたルール数とポリシー数を一覧表示します。*

- 監視／管理対象のすべてのアセットを一覧表示します: サーバー名、ライセンスマネージャータイプ、ベンダー、ルール数、ポリシー数。  
- アセットのプレビュー: リンクされたすべてのルールをコンパイルし、現在のオプションファイルを表示します。  
- 手動デプロイ（管理 (Managed) のみ）。  
- **Edit asset**: *Automatic deployments on group change*（グループ変更時の自動デプロイ）を切り替えます。  

:::warning[アセットの削除]
アセットを削除すると、関連するすべてのデータ（ルールとポリシー）が削除され、Broker の *Watch option file* が解除されます。再検出するには、Broker で Watch を再度有効にします。この操作は元に戻せません。
:::

### Pending

Pending ページは、まだ承認も拒否もされていないアセットを一覧表示します。

![The LAC Pending page lists newly discovered assets and previews the current option file content for the selected asset.](/services/lac/pending.png)
*図 2. LAC の Pending ページは、新たに検出されたアセットを一覧表示し、選択したアセットの現在のオプションファイルの内容をプレビューします。*

- 判断待ちの、新たに検出されたアセットを表示します。  
- **Approve**: 読み取り専用 (Read-only) または管理 (Managed) を選択します。  
- **Deny**: アセットを Denied に移動します。  
- 行を選択すると、そのサーバー上に現在あるオプションファイルがプレビューされます。  

### Denied

Denied ページは、以前に拒否したアセットを表示します。

![The LAC Denied Assets page lists assets you previously denied, with a Restore To Pending action.](/services/lac/denied.png)
*図 3. LAC の Denied Assets ページは、以前に拒否したアセットを Restore To Pending 操作とともに一覧表示します。*

- 拒否したアセットを一覧表示します。  
- **Restore To Pending**: アセットを Pending に戻して再承認できるようにします。  

### Policies

ポリシーはルールをまとめ、いつデプロイするかを定義します。

![The LAC Policies page lists policies with their description, server, license manager type, vendor, deploy cron, and create/update dates.](/services/lac/policies.png)
*図 4. LAC の Policies ページは、各ポリシーの説明、サーバー、ライセンスマネージャータイプ、ベンダー、デプロイ Cron、作成日／更新日を一覧表示します。*

- すべてのポリシーを詳細とともに一覧表示します（アセット、ベンダー、ライセンスマネージャータイプ、デプロイ Cron、作成日・更新日）。  
- **Add Policy** / **Disable**（または Enable）/ **Delete**。  
- ポリシーを有効化／無効化すると、スケジュールされたデプロイが自動的に更新されます。  
- ポリシーを削除すると、そのスケジュールされたデプロイが削除されます。アセットとそのルールは残ります。  

### Rules

Rules ページを使用して、ライセンスアクセス制御のステートメントを定義します。

- **Deployed** と **Undeployed** の 2 つのタブで、ルールの状態を分けて表示します。  
- **Add Rule** / **Delete**。  
- 編集は未デプロイのルールでのみ可能です。デプロイ済みのルールを変更するには、削除して新しく作成します。  
- Add Rule ウィザードは、1 回の送信で複数のエンティティと複数のフィーチャーを受け付けます。LAC はエンティティ × フィーチャーの組み合わせごとに 1 つのルールを作成し、バッチ全体を失敗させるのではなく、重複は警告とともにスキップします。  

![The Deployed tab on the LAC Rules page lists rules already pushed to the license manager.](/services/lac/rules-deployed.png)
*図 5. LAC の Rules ページの Deployed タブは、ライセンスマネージャーへすでにプッシュされたルールを一覧表示します。*

![The Undeployed tab on the LAC Rules page lists rules that have been saved but not yet deployed.](/services/lac/rules-undeployed.png)
*図 6. LAC の Rules ページの Undeployed タブは、保存済みでまだデプロイされていないルールを一覧表示します。*

### Deployment

Deployment ページは、Queue、Schedule、History の 3 つのタブで、すべてのデプロイ活動を追跡します。

**Queue** — Broker による処理を待機しているデプロイ。

![The Queue tab on the LAC Deployment page lists deployments awaiting Broker processing.](/services/lac/deployment-que.png)
*図 7. LAC の Deployment ページの Queue タブは、Broker による処理を待機しているデプロイを一覧表示します。*

**Schedule** — スケジュールされたポリシーデプロイ。

![The Schedule tab on the LAC Deployment page lists upcoming, automatically scheduled policy deployments.](/services/lac/deployment-schedule.png)
*図 8. LAC の Deployment ページの Schedule タブは、自動的にスケジュールされた今後のポリシーデプロイを一覧表示します。*

**History** — ステータス、タイムスタンプ、エラー、およびデプロイ中に LAC がスキップしたルールを含む、完了済みのデプロイ。

![The History tab on the LAC Deployment page lists completed deployments with status, timestamp, and any skipped rules.](/services/lac/deployment-history.png)
*図 9. LAC の Deployment ページの History タブは、ステータス、タイムスタンプ、スキップされたルールとともに、完了済みのデプロイを一覧表示します。*

### Settings

Settings ページは、組織全体に適用される LAC の構成を保持します。設定を切り替えて **Save** を選択すると適用されます。

![The LAC Settings page shows the Workstation Agent Enforcement toggle, an info tooltip, and a Save button.](/services/lac/SETTINGS.png)
*図 10. LAC の Settings ページには、Workstation Agent Enforcement トグル、情報ツールチップ、Save ボタンが表示されます。*

#### Workstation Agent Enforcement

有効にすると、LAC は、ユーザーを対象とするルールをデプロイする前に、そのユーザーに OpenLM Workstation Agent がインストールされ、アクティブであることを確認します。アクティブなエージェントを持たないユーザー向けのルールは、デプロイ中にスキップされ、*Deployment → History* に報告されます。グループおよびホスト向けのルールは、常に通常どおりデプロイされます。

- **対象となるルールの種類** — 個々のユーザーを対象とするルールのみ: INCLUDE、INCLUDEALL、ALLOW、RESERVE。  
- **スコープ** — 組織全体に適用されます。  
- **タイミング** — 次回のデプロイ時に適用されます。既存の割り当ては遡及的に取り消されません。  
- **検出** — LAC は、一時的にオフラインのエージェントと、インストールされていないエージェントを区別します。スキップの対象となるのは後者のみです。  

:::note[ライセンスマネージャーのサポート]
Workstation Agent の強制は、ユーザーとワークステーションを関連付けるために LAC が必要とするデータを提供しないライセンスマネージャーには適用されません。この制限は、該当する場合に UI に表示されます。
:::



## 検証と信頼性

デプロイ中、LAC は次を検証します:  

- **フィーチャー** — Features Service（Operational API）を通じて。  
- **ユーザー／グループ／ホスト** — UGS（AD/LDAP がバックエンド）を通じて。  
- **Workstation Agent**（強制が有効な場合）— Agent Activity Manager を通じて。  

### 破損したエンティティに対するスキップ動作

LAC は、参照先のエンティティが 1 つ無効になっただけでデプロイ全体を失敗させることはなくなりました。代わりに、個々のルールがスキップされ、デプロイの残りは続行されます:  

- UGS で無効化または削除されたユーザー — ルールはスキップされます。  
- 空、無効化、または削除されたグループ — ルールはスキップされます。  
- アクティブな Workstation Agent を持たないワークステーション（強制が有効な場合）— ユーザーを対象とするルールはスキップされます。  

スキップされたルールは、その理由とともに *Deployment → History* に一覧表示されるため、原因となったエンティティを修正して再デプロイできます。

Broker への書き込みが失敗した場合、LAC は最後に正常だったオプションファイルにロールバックします。



## 監査ログ

LAC は、ルールの変更、ポリシーの変更、デプロイのたびに監査イベントを発行します。各イベントには次が含まれます:

- **タイムスタンプ**。  
- **結果** — 許可 (Granted) / 拒否 (Denied) / スキップ (Skipped)。  
- **ユーザー** — 変更を実行した認証済みユーザー。バックグラウンドジョブおよびスケジュールされたジョブは、固定のシステム識別子を使用します。  
- **対象** — 影響を受けたアセット、ルール、またはポリシー。  

監査ログを使用して、誰が何を変更したかを追跡し、デプロイの結果を確認します。



## 一般的なユースケース（レシピ）

### シニアエンジニア向けにプレミアムフィーチャーを予約する
1. ルールを追加: `INCLUDE PremiumFeature FOR GROUP SeniorEngineers`。  
2. （任意）`EXCLUDE PremiumFeature FOR GROUP JuniorEngineers`。  
3. ポリシー *Standard Workday* を追加し、アセットを選択して、ルールを含めます。  
4. （任意）ポリシーを業務時間にスケジュールします。  
5. デプロイします。  

### 1 つのフィーチャーに多数のグループを一括で追加する
1. *Rules → Add Rule* を開きます。  
2. アセット、カテゴリ、ルールの種類（例: INCLUDE）を選択します。  
3. フィーチャーを選択します。  
4. エンティティピッカーで、含めたいすべてのグループを選択します。  
5. 保存します。LAC はグループごとに 1 つのルールを作成し、そのフィーチャーにすでに存在する重複はスキップします。  

### インターン向けの時間外アクセス
1. ルールを追加: `INCLUDE PremiumFeature FOR GROUP Interns`。  
2. ポリシー: *After Hours*（月〜金 18:00〜08:00 + 週末）。  
3. アセットごとに有効なポリシーが 1 つだけになるようにします。  

### エージェント未導入のユーザーをプレミアムライセンスからブロックする
1. 許可するユーザー層に OpenLM Workstation Agent をデプロイします。  
2. *Settings* に移動し、**Workstation Agent Enforcement** を有効にします。  
3. ポリシーをデプロイします。アクティブなエージェントを持たないユーザーはスキップされ、*Deployment → History* に報告されます。  

### 迅速なロールバック

以前の構成に戻すには:

- *Deployment → History* に移動し、最後に成功したデプロイを確認します。  
- 以前の既知の正常なポリシーを再デプロイします（または Overview から再適用します）。  



## トラブルシューティング

| 症状 | 考えられる原因 | 対処方法 |
|---------|--------------|------------|
| アセットが Pending に表示されない | Broker がオプションファイルを監視していない。ホストが承認されていない | *Watch option file* を有効にする。ホストを承認する |
| 管理 (Managed) モードを選択できない | ライセンスサーバーが承認されていない | License Servers でサーバーを承認する |
| キュー投入前にデプロイが失敗する | すべてのルールで検証が失敗した | フィーチャー名を確認する。UGS/AD でエンティティを確認する |
| デプロイ後に一部のルールが見当たらない | 破損したエンティティ、または Workstation Agent の強制 | *Deployment → History* でスキップされたルールを確認する。エンティティを修正するか、Workstation Agent をインストールする |
| サーバーでデプロイが失敗する | 書き込みエラー。権限の問題 | Broker のログを確認する。権限を修正する。ロールバックする |
| ルールの編集が無効になっている | ルールがデプロイ済み | ルールを削除して再作成する |
| ポリシーのデプロイにすべてのルールが含まれなかった | ポリシーのデプロイは排他的 | すべてのルールが必要な場合は Overview からアセットをデプロイする |

---

## ベストプラクティス

- 一貫した名前を使用します（例: `INCLUDE-PremiumFeature-G_SeniorEngineers`）。  
- 運用時間帯ごとにポリシーを分けます（*Workday* と *After Hours* など）。  
- ポリシーは排他的に保ちます（アセットごとに有効なポリシーは 1 つ）。  
- まず読み取り専用 (Read-only) を使用し、その後で管理 (Managed) に切り替えます。  
- グループ起点のデプロイはまとめて行います（約 1 時間のデバウンスを使用）。  
- 各変更の後に、スキップされたルールの一覧を含めて *Deployment → History* を確認します。  
- Workstation Agent Enforcement を有効にする前に、次回のデプロイで大量のスキップが発生しないよう、対象となるユーザー層にエージェントがデプロイされていることを確認します。  



## 例: プレミアムライセンスの競合を解決する

**問題**: ジュニアがプレミアム席を占有する → シニアがブロックされる → プロジェクトの遅延。  

**LAC による解決策**:  
1. プレミアムライセンスのアセットを管理 (Managed) モードで承認します。  
2. ルールを作成します（シニアを INCLUDE、任意でジュニアを EXCLUDE）。  
3. *Workday ポリシー*（08:00〜18:00）を追加します。  
4. （任意）*After Hours* ポリシーを追加します。  
5. デプロイと監査ログを監視します。  

**結果**: シニアは業務時間中に確実にアクセスでき、ジュニアは後回しまたは時間外のアクセスになります。  



## FAQ

<details>
<summary>LAC に関するよくある質問</summary>

**LAC はソフトウェアをアンインストールしたり、プロセスを終了したりしますか?**  
いいえ。制御はライセンスのチェックアウト時に行われます。  

**1 つのポリシーで複数のアセットを管理できますか?**  
いいえ。1 ポリシー = 1 アセットです。  

**アセットを削除するとどうなりますか?**  
関連するすべてのデータが削除されます。再検出するには Watch を再度有効にする必要があります。  

**デプロイ済みのルールを編集できますか?**  
いいえ。削除して新しく作成します。  

**Workstation Agent Enforcement を有効にすると、既存のライセンス割り当てはどうなりますか?**  
何も起きません。強制は次回のデプロイ時にのみ適用されます。既存の割り当ては取り消されません。  

**Workstation Agent Enforcement はグループまたはホストのルールに適用されますか?**  
いいえ。個々のユーザーを対象とするルール（INCLUDE、INCLUDEALL、ALLOW、RESERVE）にのみ適用されます。  

**1 人の不正なユーザーでデプロイが失敗しなくなったのはなぜですか?**  
LAC は現在、デプロイ全体を失敗させる代わりに、破損したエンティティ（無効化または削除されたユーザー、空または削除されたグループ）を含むルールをスキップします。スキップされたルールは *Deployment → History* に表示されます。  
</details>



## 用語集

- **アセット (Asset)**: ホスト + ポート + ライセンスマネージャータイプ + オプションファイル。  
- **管理 / 読み取り専用 (Managed / Read-only)**: LAC の制御モード。  
- **ルール (Rule)**: アトミックなディレクティブ（INCLUDE/EXCLUDE/RESERVE/ALLOW）。  
- **ポリシー (Policy)**: 1 つのアセットに対する、スケジュール可能なルールのまとまり。  
- **デプロイメント (Deployment)**: オプションファイルをコンパイルし、Broker を通じて配信すること。  
- **UGS**: User/Group Service（AD/LDAP グループを供給）。  
- **Features Service**: フィーチャー検証のための信頼できるカタログ。  
- **Workstation Agent**: ユーザーのマシンにインストールされる OpenLM クライアント。Workstation Agent Enforcement に必要です。  
- **Agent Activity Manager**: どのワークステーションでエージェントがアクティブかを追跡するサービス。LAC はデプロイ中にこれを照会します。  



## クイックスタートチェックリスト

- Broker をインストール済み。*Watch option file = true*  
- Broker Hub でホストを承認済み  
- ライセンスサーバーを承認済み（管理 (Managed) 用）  
- アセットを承認済み（モードを選択）  
- ルールを作成しリンク済み  
- ポリシーを作成しデプロイ済み  
- （任意）Workstation Agent をユーザーにデプロイ済み。*Settings → Workstation Agent Enforcement* を有効化  
- *Deployment → History* と監査エントリを確認  
