---
sidebar_position: 7
---

# コンプライアンス（Compliance）

## 概要

**Compliance** を使用すると、地域ルールに基づいてライセンス使用の順守状況を監視できます。国や地域に紐づく使用ポリシーを定義し、ユーザーの地理的位置に基づく不適合な使用をレポートします。


## 前提条件

 - Activate **Compliance** in [Products](./openlm-administration/products).
 - コンプライアンスレポートを表示するには、ルールを作成する対象ライセンスマネージャが OpenLM にデータを送信している必要があります（以下の経路）。
  - **Broker** (for licenses)
  - **Workstation Agent** (for tracking compliance of processes, executables, or web services)

## 設定

**Settings** パネルで、OpenLM のライセンス在庫を Compliance と連携できます。 

- 連携が **On** の場合、在庫から直接フィーチャを選択できます。
- 連携が **Off** の場合、各フィーチャのライセンス情報を手動で入力します。

> **Important:** コンプライアンスサービスとライセンス在庫の不整合を防ぐため、在庫連携を有効化してください。

![Compliance settings](/services/compliance/compliance-settings.png)


## コンプライアンスルール

**Compliance Rules** パネルでコンプライアンスルールを管理します。

- **Add Rule**: 新しいルールを作成
- **Delete**: 既存のルールを削除
- **Import Rules**: 以前にエクスポートしたルール（CSV）をインポート

![Compliance rules](/services/compliance/compliance-rules.png)



### 新しいルールの追加

追加手順:

1. Select **Add Rule** in **Compliance Rules** panel.
2. **General** パネルで次の項目を設定します。
   - **Entity Type**: レポートの基準を **User** または **Machine**（ユーザー/ホストの所在地）から選択。
   - **Rule Type**: **Country**、**Region**、**Global** から選択。
     - **Global**: 常にすべてのユーザー/マシンを順守とみなす。
     - **Country/Region**: **Rule Value** に対象の国または地域を指定。
   - **Start Date/Time** と **End Date/Time**: ルールの有効期間を設定。

![General compliance settings](/services/compliance/compliance-general.png)
 
3. **Feature parameters** タブを開きます。
   - 連携が有効な場合は **SELECT FEATURES** を選択し、在庫から該当フィーチャを選びます。フィルターで絞り込み可能です。
   - 1 つのルールで選択できるフィーチャは 1 つのみです。複数ある場合はルールを分けて作成します。

![Select features for compliance rules](/services/compliance/compliance-select-features.png)

4. 在庫連携を無効にしている場合は、必要なフィーチャパラメータを手動入力します。
   - **Check feature in OpenLM license inventory** でパラメータを検証します。
   - 一致すれば確認メッセージが表示されます。
   - 不一致の場合はエラーメッセージが表示されます。内容を見直して修正してください。

コンプライアンスのレポートは、Reporting セクションの **Compliance Report** を参照してください。
