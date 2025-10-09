---
sidebar_position: 1
---

# ブローカーハブ（Broker Hub）

## 概要

**Broker Hub** は、ライセンスサーバーにインストールされたBrokerの参照・承認・拒否を一元的に行うインターフェースです。Brokerはまず Hub にデータを報告し、その後の処理へと引き渡します。

## 前提条件

Broker Hub に表示される前に、各ライセンスサーバーへBrokerをインストールしておく必要があります。

### Broker 認可ファイルの準備

[認可ファイルを生成](../openlm-administration/identity#%E8%AA%8D%E5%8F%AFauthorization)

### Brokerのインストール
[コンポーネントのインストールガイド](../../install/components_installation)

## 認可ファイルの取り込み

インストール後、生成済みの認可ファイルをBrokerへ取り込みます。

1. Broker の UI で認可ファイルをアップロードします。
2. **Continue** を選択します。

## 初期セットアップ

Brokerは、ライセンスサーバー上のライセンスマネージャーを自動検出し、接続性を確認します。

検出が完了したら:

- 検出されたライセンスマネージャーを確認します。
- OpenLM の UI を開き、Brokerを承認して監視を開始します。

Brokerコンソール上で、OpenLM Server のステータスが **Active** と表示されます。

## Broker Hub での承認

Brokerのインストール後:

1. ホームのナビゲーションから **Broker Hub** を開きます。
2. **Pending Approval** と表示された新規Brokerを見つけます。
3. Brokerに紐づく OpenLM アイコンを選択し、承認へ進みます。
4. ダイアログで対象ブローカーを選び **Approve**。

Brokerを承認すると、対応するライセンスマネージャーが **Pending Servers** に表示されます。必要に応じてサーバーを承認または拒否します。
