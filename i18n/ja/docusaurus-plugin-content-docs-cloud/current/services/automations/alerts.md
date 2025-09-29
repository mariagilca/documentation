---
sidebar_position: 2
---
# OpenLM アラート

## 概要

OpenLM アラートは、条件に応じて通知を発する独自ルールを定義し、ライセンス環境をプロアクティブに監視できるようにします。ライセンスサーバーの停止、使用率の急上昇、ライセンス期限切れなどの潜在的問題を管理者へ通知し、安定性の向上、コンプライアンスの確保、ダウンタイムの最小化に役立ちます。

アラートは次の 3 要素で構成されます。

* **Alert rules**: アラートの契機となる条件
* **Alert log（Alerts タブ）**: 発生したアラートの一覧
* **Notification service**: 配信方法（メール、チケット等）の設定

> **Tip:** 事後対応からプロアクティブな健全性監視へ移行しましょう。



## Alerts タブ
**Alerts** タブには、OpenLM 各サービスで発生したアラートがすべて表示されます。

### できること

* システムが生成したアラートメッセージを閲覧
* 時間、ソース、重大度（Critical、Warning、Info）でフィルタ
* アラートを選択して詳細、発生元、発生時刻を確認

このビューでは、否認の多発や「Java heap space」のようなメモリエラーなど、現在/過去の問題を俯瞰できます。



## Alert Rules タブ

In the **Alert Rules** tab, you define and manage the logic for alerts.

### できること

* 既存ルールを名称・重大度で確認
* トグルでルールの有効/無効を切替
* ルール一覧のフィルタ/検索
* 条件を指定して新規ルールを追加

### ルールの作成

1. Select **Add Rule**.
2. 重大度を設定（warning、alert、notice、system）。
3. 対象サービスを選択:
   - Dongle Monitoring  
   - Projects Service  
   - Directory Synchronization Service  
   - Feature Service  
   - Subscription Optimizer  
   - OpenLM Server  
   - Reporting Service  
   - User Availability Service
4. Assign a rule name.
5. **SAVE** をクリック。

> **Note:** Rules determine *when* an alert is triggered. Notifications define *how* and *who* is informed.



## System Events タブ

The **System Events** tab logs detailed system activity across OpenLM components.

### できること

* View logs including service status changes, warnings, or errors.
* Filter by time, severity, or service name.
* Investigate root causes for triggered alerts.

このセクションは、問題の発生源を把握するうえで Alerts タブを補完します。



## Notification サービス

Use the **Notification Service** to manage how alerts are delivered.

### 対応チャネル

* **Email notifications**: 送信者情報、宛先、セキュリティ設定を構成
* **Ticketing system integration**: メールまたは ServiceNow 等との直接連携でインシデントを起票

### 設定手順

1. Navigate to **Notifications Service** in the sidebar.
2. 通知方法（メール/チケット）を有効/無効化。
3. Add recipients or endpoint details.
4. Send a test notification to confirm setup.

> **Recommendation:** 必ずテストアラートで設定を検証してください。



## ベストプラクティス

* ライセンス要件の変化に応じてルールを定期的に見直す
* 行動の優先順位付けに適切な重大度を設定
* 事後分析や傾向把握に System Events を活用
* Compliance や Notifications と併用して可視性を高める
