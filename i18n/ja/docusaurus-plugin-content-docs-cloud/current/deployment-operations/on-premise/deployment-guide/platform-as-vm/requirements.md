---
title: 要件
sidebar_position: 1
description: "単一の仮想マシンに OpenLM Platform をインストールするためのハードウェア、OS、ネットワーク、TLS の要件です。"
---

Platform as VM デプロイでは、OpenLM Platform 全体を単一の仮想マシンまたはベアメタルサーバー上で実行します。デプロイスクリプトは、クリーンな RHEL 系 OS の上に Kubernetes（K3s）、データベース、メッセージブローカー、キャッシュ、すべての OpenLM サービスをインストールします。実行にあたって、Kubernetes、Ansible、Helm の経験は不要です。

このページでは、開始前に準備しておくべき内容を一覧にまとめています。実際のインストール手順は [デプロイ](./deployment) で説明します。

## ライセンス

プラットフォームの利用には、有効な OpenLM ライセンスが必要です。本番環境へのデプロイ前に、[sales@openlm.com](mailto:sales@openlm.com) までライセンスの取得または延長をお問い合わせください。

## システム要件

| リソース | 最小（評価用） | 推奨（本番用） |
| --- | --- | --- |
| CPU | 4 vCPU | 8 vCPU 以上 |
| RAM | 32 GB | 64 GB |
| ストレージ | 100 GB SSD | 500 GB 以上の SSD |
| ネットワーク | 100 Mbps | 1 Gbps |

インストーラーは最小値を強制チェックし、CPU または RAM が不足する場合は早期に失敗します。

:::warning
最小構成は、負荷の低い評価、デモ、PoC 環境に適した構成です。稼働中の Broker やユーザーが存在する本番用途では、推奨構成以上を使用してください。
:::

## オペレーティングシステム

正式サポート: **RHEL 9、AlmaLinux 9、または Rocky 9**（RHEL 系 9.x）。

Ubuntu、Debian、SUSE はサポートされていません。RHEL 系の旧メジャー（7、8）および新メジャー（10）は、正式な検証対象ではありません。

## ユーザーアカウント

VM 上に、`sudo` 権限を持つ非 root ユーザーアカウントが必要です。インストーラーは開始時に sudo パスワードを一度だけ要求します。

## ネットワーク要件

### 送信（インストール中）

インストーラーが Kubernetes、コンテナイメージ、Helm チャートを取得できるよう、VM から以下のホストへの HTTPS 送信アクセスが必要です。

- `get.k3s.io` – K3s インストーラー
- `public.ecr.aws` – OpenLM コンテナイメージ
- `docker.io`、`bitnami.com` – インフラストラクチャ用コンテナイメージ（Redis、Kafka、MongoDB、MariaDB、PostgreSQL）

VM が HTTPS プロキシ越しにある場合は、インストーラーを実行する前にシェルで `HTTPS_PROXY` と `NO_PROXY` を設定してください。

### 受信（運用中）

VM の手前に配置されているファイアウォールで、以下のポートを開放してください。

| ポート | 送信元 | 用途 |
| --- | --- | --- |
| 443 | エンドユーザー | HTTPS – OpenLM Platform の UI と API |
| 80 | エンドユーザー | 443 への HTTP リダイレクト |
| 6443 | 管理者 | Kubernetes API（VM 外からの `kubectl` アクセス用） |
| 30432 | BI ツール | レポーティングデータベース（PostgreSQL）。Power BI などから接続 |
| 22 | 管理者 | SSH |

VM 内部の K3s 向け `firewalld` ルールはインストーラーが管理するため、手動で設定する必要はありません。

## DNS

`openlm.yourcompany.com` のように、VM を指す完全修飾ドメイン名（FQDN）が必要です。インストーラーを実行する前に、FQDN を VM の IP アドレスへ向ける **A レコード** を作成してください。

VM 上ではなく、クライアントマシンから名前解決を確認してください。

```bash
dig openlm.yourcompany.com +short
# VM の IP アドレスが返されるはずです。
```

DNS レコードを公開できないエアギャップネットワークに VM がある場合は、構成リファレンスの [`add_coredns_hosts_entry` パターン](./configuration#air-gapped-network-without-dns) を参照してください。

## TLS 証明書

**PEM 形式** の TLS 証明書と一致する秘密鍵が必要です。次のいずれでも構いません。

- パブリック CA（Let's Encrypt、DigiCert など）が発行した証明書
- 社内 / コーポレート CA が発行した証明書
- 自己署名証明書（評価用途では許容されます。ブラウザに警告が表示されます）

証明書の Common Name または Subject Alternative Name は、設定する FQDN を含んでいる必要があります。

インストール前に、証明書と鍵が一致していることを確認します。

```bash
openssl x509 -noout -modulus -in tls.crt | md5sum
openssl rsa  -noout -modulus -in tls.key | md5sum
```

2 つの出力は同一でなければなりません。

## キャパシティ上の考慮事項

このデプロイパスは、小規模な顧客環境、評価、PoC を対象として設計されています。すべてのサービスが単一マシンを共有するため、マルチノードクラスタ構成と比べて、システムが処理できる負荷には実用上の上限があります。

環境が単一 VM の容量を超える場合は、マルチノードのデプロイパスへの移行を検討してください: [オンプレミスマシン](../on-premise-machines/requirements)、[AWS](../aws/requirements)、または [Azure](../azure/requirements)。
