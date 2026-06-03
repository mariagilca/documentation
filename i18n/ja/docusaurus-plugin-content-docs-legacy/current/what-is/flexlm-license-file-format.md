---
title: "FlexLM License Fileの形式"
description: "FlexLM ライセンスファイルは事実上、ライセンスベンダーとエンドユーザー間の合意であり、利用可能なライセンス数などを規定しています。"
sidebar_position: 17
---
## 全般

FlexLM License Fileは、実質的にライセンスベンダーとエンドユーザー間の契約です。利用可能なライセンス数、各ライセンスのチェックアウトポリシー、各ライセンスの有効期間と有効期限などを詳しく説明しています。FlexLMライセンスマネージャーデーモン（lmgrd）は、License Fileを解釈して、さまざまなライセンスベンダーデーモンにライセンス要求をディスパッチします。

このドキュメントは、License Fileの形式と構文、およびライセンスされたアプリケーションの利用への影響についての簡単な説明です。

## サーバー行

License Fileは通常、単一のSERVER行、またはサーバーのトライアド構成の場合は3つのSERVER行で始まります。SERVER行は、ライセンスサーバーの

- ホスト名
- ホストID（MACアドレス）
- ライセンスマネージャーデーモン（lmgrd）のTCP/IPポート番号を指定します。ポートが指定されていない場合は、27000〜27009の範囲で最初に使用可能なポートが使用されます。

### 構文

サーバー行の構文は次のとおりです。

```
SERVER <サーバー名> <ホストID> <lmgrdポート>
```

### 例

```
SERVER my_server 001122334455 27000
```

## ベンダー行

VENDOR行は、

- ベンダーデーモン名とパスを指定します。lmgrdはこの行を使用してベンダーデーモンを起動します。
- Options Fileのパス
- ベンダーデーモンのTCP/IPポート番号（デフォルト2080）

### 構文

```
VENDOR vendor [vendor_daemon_path][[options=]options_file_path] [[port=]port]
```

### 例

```
VENDOR adskflex adskflex.opt port=2080
```

## フィーチャー行/インクリメント行

FEATURE / INCREMENT行は、特定のライセンスを記述します。単一のFEATURE（またはINCREMENT）行の後に複数のINCREMENT行が続く場合があり、個別のライセンスプールが作成されます。

### 構文

```
{FEATURE|INCREMENT} feature vendor feat_version exp_date num_lic SIGN=sign [optional_attributes]
```

### 例

```
FEATURE MayaUnltdf sgiawd 7.000 17-aug-2005 2 001122334455
```

## パッケージ行

PACKAGE行は、製品スイートのライセンスの概要を提供し、主に同じFEATURE行の引数を共有する機能の配布を容易にします。PACKAGE行は単独では効果がありません。これらのライセンスを効果的にアクティブ化するには、FEATURE / INCREMENT行が必要です。

### 構文

```
PACKAGE package vendor COMPONENTS=pkg_list SIGN=pkg_sign
```

### 例

```
PACKAGE suite_example vendor_name version SIGN=12345 COMPONENTS="feature_1:version_1:3 feature_2:version_2:4"

FEATURE suite_example vendor_name version issue_date 2 SIGN=54321 SN=123
```

この場合、feature_1またはfeature_2のいずれかをチェックアウトすると、suite_exampleスイートもチェックアウトされます。利用可能なライセンスの総数は、feature_1の場合は3×2=6、feature_2の場合は4×2=8です。

FlexLM License Fileの形式の詳細については、このドキュメントを参照してください。