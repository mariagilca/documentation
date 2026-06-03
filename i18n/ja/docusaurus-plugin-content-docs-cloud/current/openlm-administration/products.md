---
title: "製品（Products）"
description: "Products では、アカウントで有効な OpenLM サービスを確認・管理できます。サービスの有効化もここで行えます。"
sidebar_position: 2
---

## 概要

**Products** を使用すると、アカウントで有効な OpenLM サービスを確認・管理できます。ここでサービスを有効化することもできます。**Active products** には、有効な製品がすべて表示されます。製品名を選択するとユーザーインターフェースが開き、**Learn more** を選択すると製品の詳細が表示されます。

![OpenLM Products page](/services/openlm_administration/products.png)
*OpenLM Products page*

## システム製品

ライセンス構成に関係なく、デフォルトで有効になるシステム製品が 10 個あります。これらのシステム製品は常に **Active products** に表示されます。

- Agent Activity Manager
- AgentsHub
- Audit
- Broker Hub
- Cloud Broker
- Identity service
- Notifications
- Reporting
- Users and Groups
- License Manager

## 製品を表示

1. OpenLM ポータルで **Products** を開きます。
2. **Active products** を確認します。
3. **Lite view** と **Detailed view** のトグルでカード表示を切り替えます。

- **Lite view** はコンパクトなカード表示です。
- **Detailed view** は製品の説明と含まれるサービスを表示します。

## 既定ロールを設定

各製品には既定ロールを割り当てる **Settings** があります。

1. 製品カードで **Settings** を選択します。
2. **Default role** で既定のロールを選択します。
3. **Save** を選択します。

![Default role settings for a product](/services/openlm_administration/product-settings-roles.png)
*Default role settings for a product*

既定ロールは **Viewer** で、新規ユーザー作成時に自動的に事前選択されます。
