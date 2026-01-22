---
title: "OpenLM による URL 監視"
sidebar_position: 5
---
## 前提条件:

- OpenLM SLM または SLMC
- エンドユーザー端末（Windows/Linux）にインストールされた OpenLM Workstation Agent v21 以降、または Browser Agent（URL のみ監視）
- 対応ブラウザー: Chromium ベースの Google Chrome、Edge、Vivaldi、Opera、Brave、Firefox

## クラウドサービス監視とは

多くのアプリケーションが Web へ移行しており、クラウドサービスを監視できる仕組みが求められています。

OpenLM はクラウドサービス／Web アプリを監視する新しい機能を提供しています。レポートでは、各ユーザーがサービスを利用した時間が表示されます。このデータにより、次のようなメリットが得られます。

| **ケース** | **対応** | **効果** |
| --- | --- | --- |
| ユーザーがサービスを使っていないがライセンスが割り当てられている | ライセンスの割り当てを解除する | 未使用ライセンスを削減 |
| ユーザーにライセンスは割り当てられているが、月間で数分しか使っていない | 実際の利用状況を把握し、代替案を検討する | 十分に活用されていないライセンスを削減 |

## URL 監視の設定方法:

1. EasyAdmin のユーザーインターフェイスで **Start → Administration → License Manager Servers** に移動します。ライセンスマネージャーの一覧が表示されます。
2. **Add License Manager** をクリックします。
3. 分かりやすいタイトルを入力します。
4. タイプとして **Browser** を選択します。
5. *Domain* フィールドに監視したい URL を入力します。
6. タイムゾーンを選択します。
7. **Save** をクリックします。

![](/img/legacy/word-image-53992-1.png)

デフォルトでは、Workstation Agent は指定した URL に一致するブラウザー横断のユニークセッションを 1 時間ごとに OpenLM SLM へ報告します。

## 結果

エージェントから報告された結果は License Activity レポートで確認できます:

![](/img/legacy/word-image-53992-2.png)

監視対象のアドレスは Personal Dashboard でエンドユーザーに表示されます:

![](/img/legacy/word-image-53992-3.png)
