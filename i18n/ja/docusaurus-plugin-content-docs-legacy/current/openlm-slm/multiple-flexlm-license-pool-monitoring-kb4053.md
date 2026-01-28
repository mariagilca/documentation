---
title: "複数の FlexLM ライセンスプールの監視"
sidebar_label: "複数の FlexLM ライセンスプールの監視"
---

<!-- Source: https://www.openlm.com/knowledge-base/multiple-flexlm-license-pool-monitoring-kb4053/ -->

* 複数の FlexLM ライセンスプールの監視

# 複数の FlexLM ライセンスプールの監視

目次

* [複数プールとは?](#0-toc-title)
* [複数プール監視のメリット](#1-toc-title)
* [前提条件](#2-toc-title)
* [手順](#3-toc-title)
* [追加キー](#4-toc-title)
* [マッチングが成功しない場合](#5-toc-title)

## 複数プールとは? [#](#0-toc-title)

Flexera のネットワークライセンス管理システムは、ライセンスファイルを用いてクライアントのライセンス在庫を追跡します。ライセンスファイルは、購入済みの機能ライセンスを記録したもので、ライセンスモデル、ライセンス数、有効期限などの属性が含まれます。同じ機能のライセンスを別々に購入することがあり、その場合ライセンスファイル内で別々の "プール" が形成され、各プールが特定の属性を持ちます。

## 複数プール監視のメリット [#](#1-toc-title)

OpenLM システムは複数プールのライセンス使用量を報告できますが、複数プール監視機能を使用しない場合、個々のライセンス使用セッションを特定のプールに紐づけることができません。この欠点は、ライセンスモデルの表示で特に顕著です。[Floating licenses](https://www.google.com/url?q=https%3A%2F%2Fopenlm.com%2Fblog%2Fwhat-are-network-floating-licenses%2F&sa=D&sntz=1&usg=AFQjCNF2BOztR7q0Xa1RadrX0bn3ZEqOiw)、Node locked、[Network named licenses](https://www.google.com/url?q=https%3A%2F%2Fopenlm.com%2Fblog%2Fwhat-are-flexnet-network-named-licenses%2F&sa=D&sntz=1&usg=AFQjCNFxNZFQk_PY3b_DL9vi0yeQq0wESA) がすべて同一プールとして表示されてしまいます。ライセンスモデルによって価格が異なる点にも注意が必要です。

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202560%201322'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-01-24-at-23.53.23.png)

## 前提条件 [#](#2-toc-title)

OpenLM で複数プール監視機能を提供するには、いくつかの要件を満たす必要があります。

### OpenLM をアクティブシステムとして運用

OpenLM はアクティブシステムとして動作する必要があります:

* OpenLM は FlexLM ライセンスファイルを編集・並べ替えます。複数の FlexLM ライセンスプールを監視する前に **FlexLM ライセンスファイルをバックアップ**することを推奨します。
* ライセンスファイルが手動で変更されると、OpenLM はライセンスサーバーを再起動して更新されたライセンス情報を読み込みます。

### OpenLM Broker

OpenLM Broker をライセンスサーバーマシンにインストールする必要があります。

### ライセンスファイル

OpenLM Broker は対象のライセンスマネージャー上の FlexLM ライセンスファイルにアクセスできる必要があります。"LICENSE MANAGER PORT; ADVANCED" の段落を参照してください。

### Options ファイル

OpenLM Broker は対象のライセンスマネージャー上の FlexLM Options ファイルにアクセスできる必要があります。同じドキュメントの "OpenLM Brokerの設定" の段落を参照してください: [リンク](https://www.openlm.jp/docs/option-file/)。FlexLM Options ファイルへのアクセスには、OpenLM Options file management extension のライセンスが必要です。

### Debug log

OpenLM Broker は対象のライセンスマネージャー上の FlexLM Debug log ファイルにアクセスできる必要があります。同じドキュメントの "OpenLM Brokerの手動構成" の段落を参照してください: [リンク](https://www.openlm.jp/docs/flexlm/)。

### OpenLM License file

複数プール監視は OpenLM の新しい拡張機能であり、ライセンスが必要です。このライセンスは OpenLM ライセンスファイル内にベンダーごとに付与されます。ライセンス使用状況の表示は、OpenLM ライセンスと設定に応じて以下のように動作します。

上記の図のとおり、OpenLM ライセンスファイルに特定ベンダーの Multiple pool license monitoring extension が含まれていない場合、ライセンス使用状況は部分的にしか表示されない、またはまったく表示されません。EasyAdmin の "Licenses" ウィンドウは次のように表示されます。使用量 "0" と警告サインに注意してください:

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202560%201322'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-01-24-at-23.55.04.png)

## 手順 [#](#3-toc-title)

OpenLM サーバーが複数プールライセンス監視に設定されると、ライセンスファイル内で複数プールに存在する機能を検出します。その後ライセンスファイルをバックアップし、元のファイルを編集します。OpenLM はライセンスプールを使用優先度に応じて並べ替えます（例: Network Named User ベースのライセンスが通常のフローティングライセンスより優先）。ライセンスの "Asset_info" 属性は、この並べ替えに従って変更されます。

OpenLM にライセンスファイルを並べ替えさせるには:

* OpenLM Broker の設定ツールを開く
* 対象のポートを選択する
* ライセンスファイルのパスを設定する（手動または自動）
* "**Sort**" ボタンをクリックして即時に並べ替える、または
* "**Allow to sort License File**" にチェックして自動的に実行する
* **"Apply"** と "**Restart Broker**" をクリックする

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20806%20693'%3E%3C/svg%3E)![](/img/legacy/kb/broker-sort-license-file.png)

元のライセンスファイルのバックアップは、同じディレクトリに .bak 拡張子で保存されます。

その後 OpenLM Broker がライセンスサーバーを再起動し、ライセンスファイルの変更が反映されます。

続いて OpenLM は複数の情報源から使用情報を集約し、各セッションを対応するライセンスプールにマッチングします。

> **Note:** マッチング処理には時間がかかり、ライセンスはリアルタイムではプールに紐づきません。処理が完了するまで、セッションは任意のプールに割り当てられ、"Currently consumed licenses" および "License activity" の EasyAdmin ウィンドウに通知が表示されます:

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202558%201336'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-01-24-at-23.57.34.png)

## 追加キー [#](#4-toc-title)

ライセンスの Asset info でレポートをフィルタリングし、ライセンスプールごとの使用状況を表示できます。"Currently consumed licenses"、"License usage"、"License activity" の EasyAdmin ウィンドウで利用できます。

## マッチングが成功しない場合 [#](#5-toc-title)

上記のとおり:

1. マッチングに失敗すると、ライセンス使用状況は任意のプールに割り当てられ、通知が表示されます。
2. クライアントが複数プール監視のライセンスを持たない場合、使用状況は部分的にしか表示されません。

### Options ファイルを手動で変更した場合

OpenLM は FlexLM Options ファイルを利用して、ライセンス使用状況をライセンスプールに関連付けます。

次の条件の場合:

1. Options ファイル編集機能を "Write" モードで使用している（OpenLM EasyAdmin の Options file editor でライセンスマネージャーの Options ファイルを編集）
2. かつ、ライセンスサーバーマシン上で Options ファイルが手動で編集された

この場合、OpenLM は Options ファイルを信頼できなくなり、ライセンスプールに関係なく使用状況を報告します。レポートにはライセンスプール属性が含まれず、EasyAdmin User Interface に警告が表示されます。

**解決策:**

この状態を解消し、ライセンスプールとの関連付けを復元する方法は 2 つあります:

1. Options ファイル情報を再読み込みする: EasyAdmin **Start → Administration → Options file → 対象の Options file を選択 → Delete** をクリックします。編集済み Options ファイルはベンダーに再関連付けされます。
2. Options ファイルの外部変更を上書きする: EasyAdmin **Start → Options files → Options File Management → Deploy** を選択します。

### ライセンスファイルを編集した場合

ライセンスファイルの変更が検出されると、OpenLM はライセンスサーバーを再起動し、ライセンスマネージャーのレポートの正確性を確保します。
