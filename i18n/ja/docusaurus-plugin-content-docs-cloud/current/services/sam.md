---
sidebar_position: 23
---

# ソフトウェア資産管理（SAM）

## 概要

Software Asset Management は、販売元情報、購買、エンタイトルメント記録を追跡してソフトウェアライセンスを管理します。購入コスト、購入日、価格体系（**Perpetual**、**Maintenance**、**Subscription-Based**）、ライセンス有効期間、保守条件などの情報を保持します。ライセンスサーバーと連携してライセンス詳細を取得し、ワークステーションからソフトウェア使用情報を収集します。

エンタイトルメント記録は Reporting サービスに連携され、管理者は包括的なレポートを生成できます。

## 概要

**Software Asset Management** では次のことが可能です。

- 販売元情報、購買、エンタイトルメント記録の追跡
- 購入情報の記録:
  - 購入コストと日付
  - 価格体系（**Perpetual**、**Maintenance**、**Subscription-Based**）
  - ライセンス有効期間
  - 保守条件
- 連携対象:
  - ライセンスサーバー（ライセンス詳細を取得）
  - ワークステーション（ソフトウェア使用データを収集）
エンドユーザーの端末およびライセンスサーバーに導入されたソフトウェアを通じて情報を収集します。エンタイトルメント記録を作成すると、Reporting サービスがこのデータを使用してレポートを作成します。




## 前提条件

- **Reporting Service** の有効化

## 設定

ホームの **Product** サービスから **Software Asset Manager** を有効化します。

## Sellers

**Seller** セクションには手動で追加した販売元の一覧が表示されます。購買に紐づける前に販売元を作成してください。

### 新しいsellerを追加

- **Add** を選択し、販売元の詳細を入力します。
- **Seller Name**（必須）。その他は任意。
- 変更を保存します。

## Entitlement records

**Entitlement Records** 画面には、調達（購買）エントリが表示されます。

### Entitlement recordsを追加

- **Add Entitlement Record** で手動追加します。
- **Import Entitlement Record** で一括インポートします。

### Entitlement recordsを管理

エンタイトルメント記録の追加・編集時は、以下のタブを使用します。

#### General tab
- **Seller** を選択。
- **Software Name** と **Business Owner** を入力。

#### Feature/process mapping tab
- ライセンスサーバーで管理されるライセンスドフィーチャを追加する場合は **License Server**、サーバーで管理されないソフトウェアを追加する場合は **Process** を選択します。

#### Purchase info tab
- ライセンス購入の詳細と関連コストを入力します。
