---
id: named-license-analysis
title: ネームドライセンス分析
sidebar_position: 7
---

**Named License Analysis** レポートを使用すると、特定のネームドユーザーに割り当てられたライセンスの利用状況を評価できます。この分析により、ライセンス効率を評価し、非アクティブまたは未活用の割り当てを特定することができます。

![Named Licenses Analysis](/img/reporting/named-licenses-analysis.png)

## できること

- ネームドユーザーライセンス割り当ての使用指標を確認する  
- 機能ごとに未活用ライセンスを特定する  
- 使用データに基づいて割り当てを最適化する  

## ビジュアライゼーション

### ネームドライセンス詳細テーブル

**Named licenses details table** ボタンを選択すると、**ネームドユーザー** として指定されたすべてのライセンスの詳細チャートを表示します。このテーブルは包括的な割り当て情報を提供し、以下を含みます:  

- **ベンダー (Vendor)**  
- **サーバー (Server)**  
- **機能 (Feature)**  
- **バージョン (Version)**  
- **資産情報 (Asset info)**  

**表示される指標:**  

- **数量 (Quantity)**: 機能のために調達されたライセンス総数  
- **割り当て数 (Allocated)**: 個別ユーザーに割り当てられたライセンス数  
- **利用可能ライセンス (Available licenses)**: 調達数と割り当て数の差  
- **利用率 (Utilization percent)**: `(割り当て数 ÷ 調達数) × 100`  

このテーブルにより、現在のライセンス配分と利用可能性を評価できます。  

### 未活用機能トップ10

このセクションには、利用率が20%以下の **ネームドユーザーライセンス機能トップ10** が表示されます。これにより、使用頻度の低い機能をすばやく特定し、ライセンス配分を改善することができます。  

## 表示される値

- **ベンダー (Vendor)**  
- **サーバー (Server)**  
- **機能 (Feature)**  
- **バージョン (Version)**  
- **資産情報 (Asset info)**  
- **数量 (Quantity)**  
- **割り当て数 (Allocated)**  
- **利用可能ライセンス (Available licenses)**  
- **利用率 (Utilization percent)**  

## フィルター

以下のフィルターを使用して結果を絞り込むことができます:  

- **日付範囲 (Date duration)**: 2015年6月10日 – 2025年6月9日  
- **バージョン (Version)**  
- **サーバー名 (Server name)**  
- **ライセンスタイプ (License type)**  
- **機能名 (Feature name)**  
- **製品名 (Product name)**  
- **ベンダー (Vendor)**  
- **ユーザー名 (User name)**  
- **プロジェクト名 (Project name)**  
- **グループ名 (Group name)**  
- **ワークステーション (Workstation)**  
- **ユーザー国 (User country)**  
- **追加キー (Additional key)**  
- **有効期限内 (Expires within)**: 2024年5月22日 – 3000年12月31日  
- **セッション長カテゴリ (Session length category)** 