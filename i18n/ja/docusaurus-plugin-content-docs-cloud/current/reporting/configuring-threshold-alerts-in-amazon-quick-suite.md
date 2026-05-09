---
title: Amazon Quick Suite でしきい値アラートを構成する
sidebar_label: Quick Suite しきい値アラート
sidebar_position: 1
description: "Amazon Quick Suite のしきい値アラートを使用して、公開ダッシュボード上のビジネスメトリクスを監視します。"
---

# Amazon Quick Suite でしきい値アラートを構成する

Amazon Quick Suite のしきい値アラートを使用すると、公開ダッシュボード上のビジネスメトリクスを監視できます。Amazon Quick Suite は、データセットの更新後にルールを評価し、アラートメールを送信します。

## アラートを作成できるユーザー

アラートは、サインイン中のユーザーアカウントに紐づきます。公開ダッシュボードを開ける Reader、Author、Admin は、それぞれ自分用のアラートを作成できます。

## 対応するビジュアルタイプ

しきい値アラートは、次のビジュアルタイプで作成できます。

- KPI ビジュアル
- ゲージチャート
- テーブル
- ピボットテーブル

:::info
アラートは公開ダッシュボードから作成します。Amazon Quick Suite は分析モードではしきい値アラートをサポートしません。
:::

## アラートを作成する

**ステップ 1: 公開ダッシュボードを開く**

監視対象のメトリクスを含む公開ダッシュボードを開きます。

**ステップ 2: 対象の数値を選択する**

監視したい数値セルを選択します。ユーザー名やフィーチャ名などのテキストフィールドではなく、値のセルを選択してください。

![対象の数値セルを含む Amazon Quick Suite の公開ダッシュボード。](/img/reporting/quick-suite-threshold-alerts/select-target-cell.png)
*対象の数値セルを含む Amazon Quick Suite の公開ダッシュボード。*

**ステップ 3: アラートペインを開く**

アクションメニューでベルアイコンを選択し、**Create alert** ペインを開きます。

![Amazon Quick Suite の Create alert ペイン。](/img/reporting/quick-suite-threshold-alerts/click-alert-icon.png)
*Amazon Quick Suite の Create alert ペイン。*

**ステップ 4: ルールを設定する**

アラートペインで次の項目を設定します。

- アラート名を入力します。
- **Value to track** のメトリクスを確認します。
- 条件を選択します。
  - しきい値より大きい
  - しきい値より小さい
  - しきい値と等しい
- しきい値を入力します。
- 必要に応じて、データが返らない場合にメールを送る設定を選択します。

![条件としきい値を設定した Amazon Quick Suite のアラートペイン。](/img/reporting/quick-suite-threshold-alerts/configure-threshold-rules.png)
*条件としきい値を設定した Amazon Quick Suite のアラートペイン。*

**ステップ 5: スケジュールを選択して保存する**

同じペインで、Amazon Quick Suite がアラートを評価する頻度を選択します。

- As frequently as possible
- Daily
- Weekly

その後、アラートを保存します。

## 例

特定ユーザーの `Usage Time (Hours)` を監視する場合は、ユーザー名やフィーチャ名のセルではなく、テーブル内の数値セルを選択します。

## アラートの動作

- アラートは、サインイン中の Amazon Quick Suite アカウントに紐づきます。
- Amazon Quick Suite は、そのアカウントに関連付けられたメールアドレスに通知を送信します。
- アラートは、選択したビジュアルに表示されている値を追跡します。

:::note
Amazon Quick Suite はアラートをリアルタイムでは評価しません。データセット更新後にルールを確認します。データセット更新が毎朝実行される場合は、値がしきい値を超えたあと、その更新処理の後にアラートメールが届きます。
:::

## メール通知の例

メール通知には、現在のメトリクス値と、ビジュアルに含まれる関連ディメンション値が表示されます。

![メトリクス値と関連情報を表示する Amazon Quick Suite のしきい値アラートメール。](/img/reporting/quick-suite-threshold-alerts/alert-email-example.png)
*メトリクス値と関連情報を表示する Amazon Quick Suite のしきい値アラートメール。*
