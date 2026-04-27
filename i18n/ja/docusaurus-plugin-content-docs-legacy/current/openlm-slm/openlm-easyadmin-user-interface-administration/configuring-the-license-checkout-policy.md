---
title: "ライセンスCheckoutポリシーの設定"
sidebar_position: 5
---
## Checkoutポリシー

OpenLM は多数のライセンスサーバーを監視し、複数のアプリケーションに対して正確なライセンス消費情報を提供します。

ライセンス付きアプリケーションの中でも特に把握が難しい特性の 1 つが "Checkout policy" です。

"Checkout Policy" は、複数セッションが起動されたときにアプリケーションが消費するライセンス数を定義します。例えば、同じユーザーが同一ワークステーションで Autodesk の複数セッションを起動した場合、ライセンスサーバーは 1 本のライセンス消費として扱う場合と、複数本として扱う場合があります。**ライセンス使用状況を正確に報告するためには、ライセンスサーバー（ベンダー）が定義する checkout policy と OpenLM に設定する policy を一致させることが重要です。**

## FlexLM ライセンスファイル: DUP_GROUP

FlexLM ライセンスマネージャーは業界標準となっている広く普及したライセンスマネージャーです。FlexLM は、ライセンスファイル内の DUP_GROUP 機構により checkout policy を決定します。FlexLM の仕様は次のとおりです:

```
DUP_GROUP=... The syntax is:

DUP_GROUP=NONE|SITE|[UHDV]

U = DUP_USER

H = DUP_HOST

D = DUP_DISPLAY

V = DUP_VENDOR_DEF

Any combination of UHDV is allowed, and the DUP_MASK is the OR of the

combination. For example, DUP_GROUP=UHD means the duplicate grouping is

(DUP_USER|DUP_HOST|DUP_DISPLAY), so for a user on the same host and display,

additional uses of a feature do not consume additional licenses.
```

OpenLM は、ライセンスファイルから DUP_GROUP 情報を読み取り、OpenLM の checkout policy に適用することで FlexLM の DUP_GROUP 形式をサポートします。そのためには、ライセンスサーバーマシンに OpenLM Broker をインストールし、OpenLM がライセンスファイルを読み取るよう設定する必要があります。[このドキュメント](../../openlm-broker/index.md) の "Reading a license file" 段落を参照してください。

## Reprise RLM ライセンスファイル: 'Share'

FlexLM と同様に、Reprise RLM のライセンスファイルにも checkout policy の情報が含まれます。Reprise RLM の場合、この情報は 'Share' データとして扱われます。

FlexLM と同様に、OpenLM は Reprise RLM のライセンスファイルを読み取り・解析し、'Share' データを抽出して、RLM の消費ポリシーに基づいた正しいライセンス消費情報を表示できます。

## Checkout policy インターフェース

FlexLM や Reprise RLM 以外のライセンスマネージャー、またはライセンスファイルがない場合は、Checkout policy を手動で設定できます。

特に Reprise RLM などでは、Checkout policy を手動またはライセンスファイル読み取りで設定しないと、ライセンス消費の表示が誤る可能性があります。

設定するには、EasyAdmin Web アプリケーションの 'Administration' ページを開きます。（Start→Administration→Checkout policy）

![スクリーンショット: The Checkout policy interface](/img/legacy/Screenshot-2023-01-24-at-21.44.17.png)

Checkout policy 画面が開き、License servers、Vendors、License type、Asset info、feature / product name に基づいてライセンスフィーチャーを選択できます。下の画像にある "Checkout policy" 列に注目してください:

![スクリーンショット 2: The Checkout policy interface](/img/legacy/Screenshot-2023-01-24-at-21.46.53.png)

指定可能な checkout policy の値は次のとおりです:

- Empty (default): 同一ユーザーが同一ホストで実行する複数セッションを 1 本のライセンス消費として扱います。
- None: 各セッションを 1 本のライセンス消費として扱います。
- User: 同一ユーザーが起動した複数セッションを 1 本のライセンス消費として扱います。
- Display.
- User+Display.
- Host: 同一ホスト上で起動された複数セッションを 1 本のライセンス消費として扱います。
- User + Host: 同一ユーザーが同一ホストで実行する複数セッションを 1 本のライセンス消費として扱います。
- Display+Host.
- User+Display+Host.
- Vendor.
- User+Vendor.
- Display+Vendor.
- User+Display.
- Host+Vendor.
- User+Host+Vendor.
- Display+Host+Vendor.
- Site.

Checkout policy の編集方法は 2 つあります:

1. 単一フィーチャーの checkout policy を変更する: 列のエントリを右クリックして、ドロップダウンメニューから必要な policy を選択します（上の画像参照）。
2. 複数フィーチャーの checkout policy を変更する: 複数のエントリを選択し、"Checkout policy" ウィンドウ上部の "Edit selected" ボタンをクリックします（下図参照）。  
   ![スクリーンショット 3: The Checkout policy interface](/img/legacy/Screenshot-2023-01-24-at-22.00.14.png)

必要な policy を編集したら、"Checkout policy" ウィンドウの 'Save' ボタンをクリックして変更を適用します。
