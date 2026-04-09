---
sidebar_position: 29
---
# 仮想ライセンスマネージャー（VLM）

## 概要

**Virtual License Manager（VLM）** は、ライセンスをユーザーやデバイスに仮想的に割り当てて管理するソリューションです。本バージョンでは **FlexNet Embedded** ライセンスマネージャーを管理します。将来的には、API 等の外部インターフェースを提供するその他のライセンスマネージャーにも対応予定です。




## VLM のユーザーロール

VLM には 2 つのロールがあります。

* **Admin Role**
* **Manager Role**

### Admin ロール

Admin ロールのユーザーができること:

* 物理ライセンスマネージャー、仮想ライセンスマネージャー、仮想プール、Manager ロールのユーザーの表示と管理
* 仮想ライセンスマネージャーおよび仮想プールの作成・削除
* Manager ロールのユーザーに仮想プールの管理権限を割り当て

### Manager ロール

Manager ロールのユーザーができること:

* 仮想プールの閲覧、デバイスやユーザーへのライセンスの個別割り当て/解除
* 識別のため、デバイスやユーザー ID に説明を追加


## VLM の開始方法

### ステップ 1: 登録とログイン

1. [OpenLM Cloud Portal](https://www.openlm.com/products/software-license-management-cloud-saas) で登録します。
2. 地域に応じた OpenLM Cloud Portal にログインします。

   * **Global:** [cloud.openlm.com](https://cloud.openlm.com)
   * **EU:** [eu-cloud.openlm.com](https://eu-cloud.openlm.com)

### ステップ 2: VLM を有効化

OpenLM Cloud Portal のアカウントから Virtual License Manager を有効化します。

### ステップ 3: VLM を開く

Virtual License Manager の製品カードで **Open** を選択し、ロールに応じた VLM インターフェースへアクセスします。

* **Admin UI**
* **Manager UI**



## 詳細な使い方

### Admin ロールの操作

#### 物理ライセンスマネージャーの同期

1. ナビゲーションメニューで **Physical LM** を選択します。
2. 次の列を確認します。

   * **Available Features:** VLM に割り当て可能なフィーチャ
   * **Total Features:** 各マネージャーが提供するフィーチャの総数

#### 仮想ライセンスマネージャーの作成

1. 対象の物理ライセンスマネージャーを選択します。
2. **Create Virtual LM** を選択します。
3. 必要項目（Name、Type、Description）を入力し、フィーチャを選択して **SAVE**。

#### 仮想ライセンスマネージャーの管理

* Available/Total Features を確認
* 仮想プールが紐付いていない場合、仮想ライセンスマネージャーを削除可能

#### 仮想プールの作成

1. 仮想ライセンスマネージャーを選択します。
2. **Create Virtual Pool** を選択します。
3. 詳細（Name、Allocation Manager、Description）を入力し、フィーチャ選択、ライセンス数量を設定して **SAVE**。

#### 仮想プールの管理

* 利用可能なフィーチャを確認
* 必要に応じて仮想プールを削除

#### Manager ロールのユーザー管理

* VLM の **Users** タブまたは Users and Groups からアクセス
* **Identity & Access Management (IAM) → Users** からユーザーを招待



### Manager ロールの操作

#### 仮想プールの閲覧と管理

* ナビゲーションで **Virtual Pools** を選択
* 必要に応じて列の管理、検索、エクスポート

#### ライセンスの割り当て

1. 仮想プールを選び **Manage Licenses Allocations** をクリック。
2. フィーチャを選択し **Execute Licenses Allocations**。
3. Device ID を入力し、説明を追加して **SAVE**。

#### ライセンスの削除と説明の編集

1. **Device IDs** の数字リンクを選択します。
2. **Edit** ボタンで説明を更新、**Delete** ボタンで割り当てを削除します。

**注意：** 実サーバーとのライセンス同期には 1～2 分かかる場合があります。
