---
title: "IBM Rational FlexNet トークンベースのライセンス"
description: IBM Rational License Server は、IBM Rational 製品のライセンスに FLEXnet (FlexLM) を使用します。
sidebar_position: 11
---
## IBM Rational FlexNet トークンベースのライセンスとは?

IBM Rational License Server は、IBM Rational 製品のライセンスに FLEXnet (FlexLM) を使用します。

## FlexNet の主なコンポーネント

FLEXnet の 4 つの主なコンポーネントは次のとおりです。

- ライセンス マネージャー デーモン、lmgrd
- ベンダー デーモン、telelogic
- クライアント アプリケーション プログラム、この場合は任意の IBM Rational アプリケーション
- ライセンス ファイル、license.dat

## 動作の仕組み

- IBM Rational 製品を起動すると、プログラムは TELELOGIC_LICENSE_FILE システム変数を使用して、FLEXnet ライセンス サーバーを実行しているコンピューターの名前と使用しているポートを調べます。
- プログラムは、指定されたポートを使用して、FLEXnet ライセンス サーバー上のライセンス マネージャーに接続します。フローティング ライセンスを要求し、Telelogic ベンダー デーモンに要求を行います。
- FLEXnet ライセンス サーバーでは、ライセンス マネージャーが要求を Telelogic ベンダー デーモンに送信します。Telelogic ベンダー デーモンは、利用可能なライセンスがあるかどうかを確認します。
- 空きライセンスがある場合、Telelogic ベンダー デーモンはライセンスを付与し、プログラムが実行されます。利用可能なライセンスがない場合、Telelogic ベンダー デーモンは要求を拒否し、プログラムは起動に失敗してライセンス拒否メッセージを表示します。

トークンベースのライセンス

トークン ライセンスは、実際にはフローティング ライセンスの一種ですが、ライセンスのプールを持つ代わりに、トークンのプールを持っています。フィーチャーがチェックアウトされると、一定量のトークンが消費されます。消費されるトークンの数は各フィーチャーに固有であり、ライセンス ファイルのフィーチャー/インクリメント行に表示されます。アプリケーションを閉じると、トークンはプールに戻され、他のエンド ユーザーが使用できるようになります。

## トークン ライセンスの利点

取得したライセンスを複数の製品に適用できることは、魅力的なコンセプトです。

- お客様は、取得できる機能の全容を常に把握しているわけではありません。トークン ベースのライセンス スキームを持つことで、ライセンス取得からのお客様の満足度が保証されます。
- 開発段階が進むにつれて、お客様のニーズは変化します。異なるライセンス機能が必要になり、「未使用」のソフトウェアの料金をなくすことができます。
- ライセンス購入方法全体が簡素化されます。お客様は、新しい発注書や評価プロセスなしで、プロジェクト中に新しいソフトウェアを追加/試用できます。

## Rational ツールのトークンベースのライセンス

### IBM Rational ライセンスの種類

IBM Rational には、次のライセンスの種類が含まれています。

DOORS、Synergy、Change、Tau、System Architect、Focal Point、Rhapsody、Publishing Engine、Logiscope、Team Webtop

### IBM Rational トークン ライセンス ファイルの例

- インクリメント/変更行は、消費されるトークンの数を示します。

```
INCREMENT Change telelogic 2015.04302 30-apr-2015 1 ...

VENDOR_STRING=T10-999999:t,TLSTOK,1.0,Change,5  ... // 5 トークン相当。
```

- これは、ライセンス内のトークンの総数を示す INCREMENT 行です。

この場合、200 です。

```
INCREMENT TLSTOK ibmratl 2.0 30-apr-2015 200 ISSUER=IBM
```

### Rational License Server 8.1.1

Rational License Server 8.1.1 は、すべてのベンダー デーモン (telelogic、rational、ibmratl) を 1 つに統合します。この変更は、ClearCase や ClearQuest などの複数の Rational 製品にも組み込まれています。

## 参照

https://publib.boulder.ibm.com/infocenter/rational/v0r0m0/index.jsp?topic=/com.ibm.rational.license.doc/topics/r_lic_log_file.html

https://www-01.ibm.com/support/docview.wss?uid=swg27023414&aid=1