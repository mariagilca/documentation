---
title: "オプションファイルの読み取りメカニズムを介したユーザーとグループのインポート - KB4037a"
sidebar_label: "オプションファイルの読み取りメカニズムを介したユーザーとグループのインポート - KB4037a"
---

<!-- Source: https://www.openlm.com/knowledge-base/importing-users-and-groups-via-the-options-files-reading-mechanism-kb4037a/ -->

* [ライセンス割り当てマネージャー（オプションファイル）](https://www.openlm.com/knowledge-base-category/options-file-management/ "ライセンス割り当てマネージャー（オプションファイル）")
* オプションファイルの読み取りメカニズムを介したユーザーとグループのインポート - KB4037a

# オプションファイルの読み取りメカニズムを介したユーザーとグループのインポート - KB4037a

目次

* [背景](#0-toc-title)
* [開始点](#1-toc-title)
* [手順](#2-toc-title)

## 背景 [#](#0-toc-title)

お客様は、ユーザーのリストを簡単に紹介し、OpenLMデータベースのグループのメンバーとして整理する方法を要求しています。この要求は、LDAPグループまたは属性で明示的に決定できなかった大規模なユーザーリストに特に関連していました。

OpenLMには、[さまざまなエンティティをデータベースに導入する](https://www.openlm.com/knowledge-base/introducing-entities-in-openlm-users-groups-ip-and-hosts/)いくつかの方法があります。このアプリケーションノートでは、FlexLMオプションファイルを読み取るOpenLMの機能を利用するこのような方法について詳しく説明します。

## 開始点 [#](#1-toc-title)

この手順の前は、OpenLM EveryoneデフォルトグループのメンバーとしてユーザーU1、…、U6のみがいました。それらをMYTESTGROUPグループに導入し、その過程で新しいユーザーNEWUSER1、…、NEWUSER4を追加したいと考えていました。

## 手順 [#](#2-toc-title)

1. 既に監視しているFlexLM [ライセンスマネージャー](https://www.openlm.com/license-manager-capabilities/ "ライセンスマネージャー")の1つにOpenLM Brokerをインストールする必要があります。どれでもかまいません。以下の画像で必要な構成を参照してください。

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20806%20693'%3E%3C/svg%3E)![](/img/legacy/kb/options-file-watch-broker.png)

2. そのマシンでデモ - オプションファイルを作成します。このファイルの形式は次のようになります。

```
GROUPCASEINSENSITIVE ON

GROUP MYTESTGROUP U1 U2 U3 NEWUSER1 NEWUSER2

GROUP MYTESTGROUP U4 U5 U6 NEWUSER3 NEWUSER4

```

翻訳：

GROUPCASEINSENSITIVE：ユーザー名とグループ名は大文字と小文字を区別しません。

GROUP MYTESTGROUP：グループ行は意図的に分割されました。これは、FlexLMのグループ行の長さに200文字の制限があるためです。そのグループにさらにユーザーを追加するには、より小さな部分に分割する必要があります。

3. **EasyAdmin → 開始 → 管理 → Options File → エントリを選択してダブルクリックまたはEditをクリック**で、「オプションファイルデータフローの方向」ダイアログフレームでオプションファイルから読み取るようにOpenLMを設定します。現在、EasyAdminオプションファイルインターフェイスでオプションをアクティブに管理するように構成されている場合は、この手順が完了したらオプションファイルの書き込みに戻ることを忘れないでください。明確にするために、以下の画像を参照してください。**Save**をクリックします。

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201920%201080'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-18.06.46.png)

4. EasyAdminの開始 → オプションファイル → オプションファイル管理ウィンドウが、ブローカーマシンで構成したオプションファイルを認識していることを確認します。[オプションファイルの構成については、こちら](https://www.openlm.com/knowledge-base/options-file-management-using-openlm-easyadmin-kb4007/)で詳しく読むことができます。

5. その後、OpenLMグループはオプションファイルで定義されているように表示されます。