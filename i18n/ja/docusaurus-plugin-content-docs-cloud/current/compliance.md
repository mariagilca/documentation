---
title: "Compliance"
sidebar_position: 7
description: "Compliance を使用すると、地理的ルールに基づいてライセンス使用の順守状況を監視できます。国や地域に紐づくライセンス使用ポリシーを定義できます。"
---

## 概要

**Compliance** を使用すると、地域ルールに基づいてライセンス使用の順守状況を監視できます。国や地域に紐づく使用ポリシーを定義し、ユーザーの地理的位置に基づく不適合な使用をレポートします。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Licenses and Features（ライセンスと機能）→ Compliance** を選択します。

**事前準備:** [OpenLM Products](/cloud/openlm-administration/products) で **Compliance** を有効化し、対象のライセンスマネージャが OpenLM にデータを送信していることを確認します。

**関連:** [OpenLM Broker](/cloud/data-collection/openlm-broker) · [Workstation Agent](/cloud/for-end-users/workstation-agent)
:::

## 前提条件

 - **Compliance**を[Products](./openlm-administration/products)で有効化.
 - コンプライアンスレポートを表示するには、ルールを作成する対象ライセンスマネージャが OpenLM にデータを送信している必要があります（以下の経路）。
  - **Broker** (ライセンス)
  - **Workstation Agent** (プロセス、実行ファイル、ウェブサービス）
  
## 設定

**Settings** パネルで、OpenLM のライセンスインベントリを Compliance と連携できます。 

- 連携が **On** の場合、インベントリから直接フィーチャを選択できます。
- 連携が **Off** の場合、各フィーチャのライセンス情報を手動で入力します。

> **Important:** コンプライアンスサービスとライセンスインベントリの不整合を防ぐため、インベントリ連携を有効化してください。

![Compliance settings](/services/compliance/compliance-settings.png)
*Compliance settings*

## コンプライアンスルール

**Compliance Rules** パネルでコンプライアンスルールを管理します。

- **Add Rule**: 新しいルールを作成
- **Delete**: 既存のルールを削除
- **Import Rules**: 以前にエクスポートしたルール（CSV）をインポート

![Compliance rules](/services/compliance/compliance-rules.png)
*Compliance rules*

### 新しいルールの追加

追加手順:

1. **Compliance Rules**パネルで**Add Rule**を選択。
2. **General** パネルで次の項目を設定します。
   - **Entity Type**: レポートの基準を **User** または **Machine**（ユーザー/ホストの所在地）から選択。
   - **Rule Type**: **Country**、**Region**、**Global** から選択。
     - **Global**: 常にすべてのユーザー/マシンを順守とみなす。
     - **Country/Region**: **Rule Value** に対象の国または地域を指定。
   - **Start Date/Time** と **End Date/Time**: ルールの有効期間を設定。

![General compliance settings](/services/compliance/compliance-general.png)
*General compliance settings*
 
3. **Feature parameters** タブを開きます。
   - 連携が有効な場合は **SELECT FEATURES** を選択し、インベントリから該当フィーチャを選びます。フィルターで絞り込み可能です。
   - 1 つのルールで選択できるフィーチャは 1 つのみです。複数ある場合はルールを分けて作成します。

![Select features for compliance rules](/services/compliance/compliance-select-features.png)
*Select features for compliance rules*

4. インベントリ連携を無効にしている場合は、必要なフィーチャパラメータを手動入力します。
   - **Check feature in OpenLM license inventory** でパラメータを検証します。
   - 一致すれば確認メッセージが表示されます。
   - 不一致の場合はエラーメッセージが表示されます。内容を見直して修正してください。

コンプライアンスのレポートは、Reporting セクションの **Compliance Report** を参照してください。
