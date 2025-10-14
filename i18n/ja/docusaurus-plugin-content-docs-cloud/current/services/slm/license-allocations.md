---
sidebar_position: 14
---

# ライセンス割り当て（License Allocations）

## 概要

**License Allocations** では、組織内のライセンス使用を追跡・分析できます。すべてのチェックアウト/チェックインを記録し、**誰が・どのライセンスを・いつ・どこから・どのくらい** 使用したかを把握できます。

License Allocations は次の用途に役立ちます。

- 監査とコンプライアンス
- トラブルシューティングとユーザー支援
- 過去の利用状況の追跡

## 画面の使い方

### 一般フィルター

フィルターでデータを絞り込みます。

- **Server name**: ライセンスサーバーで絞り込み
- **Vendor name**: ソフトウェアベンダーで絞り込み
- **Product name / feature name**: 特定のツール/モジュールで絞り込み
- **License type**: フローティング、ノードロック、Named User、Single Use
- **Include obsolete**: 非アクティブなフィーチャを含めて履歴分析

### 期間フィルター

**Allocations start/end time** フィルターで以下を選択します。

- クイック範囲（today、yesterday、last 7 days、last 30 days、last 360 days）
- カレンダーからの任意期間指定（Custom range）

## テーブルの見方

各行は 1 件のライセンス使用イベントを表します。主な列:

- **Server name**: 使用されたライセンスサーバー
- **Vendor name**: ソフトウェアベンダー
- **Feature name**: アクセスされたライセンスフィーチャー
- **License type**: 使用したライセンスタイプ
- **User name**: ライセンスをチェックアウトしたユーザー
- **Allocation start / end**: セッション期間のタイムスタンプ

**search bar** で特定のレコードを検索し、**ページネーション** で大量データを操作します。
