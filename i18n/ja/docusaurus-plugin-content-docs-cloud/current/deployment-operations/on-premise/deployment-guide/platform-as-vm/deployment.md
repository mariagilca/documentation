---
title: デプロイ
sidebar_position: 2
description: "1 つの設定ファイルと 1 つのスクリプトで、単一の仮想マシン上に OpenLM Platform をインストールします。"
---

Platform as VM デプロイでは、単一のスクリプトを使って、クリーンな RHEL 系 OS を完全に動作する OpenLM Platform へ変換します。スクリプトは、K3s のインストール、データベースのプロビジョニング、スキーマの初期化、Kafka トピックの作成、プラットフォームサービスのデプロイをすべて自動的に行います。

開始する前に、[要件](./requirements) ページの内容を必ず完了させてください。

## スクリプトが行うこと

インストーラーは Ansible playbook を実行し、次の処理を行います。

1. 前提条件（OS、RAM、CPU）を検証します。
2. 軽量な Kubernetes 環境として K3s をインストールし、Traefik を Ingress コントローラーとして構成します。
3. クラスタの名前空間を作成し、TLS 証明書を Kubernetes Secret として保存します。
4. インフラサービス（Redis、Kafka、MongoDB、運用データベース、レポーティングデータベース）をデプロイします。
5. 運用データベースとレポーティングデータベースのスキーマを初期化します。
6. プラットフォームが必要とする Kafka トピックを作成します。
7. OpenLM API ゲートウェイと OpenLM Platform サービスをデプロイします。

インストール全体に要する時間は **20〜40 分** で、その大半は初回のコンテナイメージ取得に費やされます。

## デプロイ手順

### 1. デプロイパッケージをダウンロードする

{/* TODO: Replace placeholder URL with the actual customer portal link */}

[OpenLM カスタマーポータル](https://portal.openlm.com/releases/platform-as-vm) から最新リリースをダウンロードします。ファイルは `platform-as-vm-<date>-<commit>.zip` という名前の zip アーカイブです。

ワークステーション上で展開します。

```bash
unzip platform-as-vm-*.zip
```

展開すると、インストーラースクリプト、Helm チャート、Ansible playbook、データベーススキーマを含む `platform-as-vm/` ディレクトリが生成されます。

（任意）リリースページに掲載されている SHA-256 チェックサムと照合してダウンロードを検証します。

```bash
sha256sum platform-as-vm-*.zip
```

### 2. デプロイパッケージを転送する

展開した `platform-as-vm/` ディレクトリを対象 VM にコピーします。

```bash
scp -r platform-as-vm/ <user>@<vm-ip>:~/
```

### 3. TLS 証明書を配置する

VM に SSH 接続し、`config.yaml` で参照するパスに証明書と鍵を配置します。既定の配置場所は次のとおりです。

```bash
sudo mkdir -p /etc/openlm/certs
sudo cp tls.crt /etc/openlm/certs/tls.crt
sudo cp tls.key /etc/openlm/certs/tls.key
sudo chmod 600 /etc/openlm/certs/tls.key
```

ファイルは任意の場所に保存できます。`config.yaml` 側の対応するパスを更新するだけで問題ありません。

### 4. `config.yaml` を編集する

`~/platform-as-vm/config.yaml` を開き、必須の 3 フィールドを設定します。

```yaml
openlm_system_domain: "openlm.yourcompany.com"        # OpenLM の FQDN
tls_cert_path:        "/etc/openlm/certs/tls.crt"    # TLS 証明書のパス
tls_key_path:         "/etc/openlm/certs/tls.key"    # TLS 秘密鍵のパス
```

それ以外のフィールドは、単一 VM デプロイ向けに適切な既定値が設定されています。外部 SQL Server、外部 Kafka、エアギャップ環境などの応用パターンについては、[構成リファレンス](./configuration) を参照してください。

### 5. `passwords.yaml` を編集する

`~/platform-as-vm/passwords.yaml` を開き、同梱の 3 つのデータベース用に強力なパスワードを設定します。

```yaml
postgres_password:     "<強力なパスワード>"
mariadb_root_password: "<別の強力なパスワード>"
mongodb_root_password: "<さらに別の強力なパスワード>"
```

:::warning
これらのパスワードは、データベース初期化時に組み込まれます。初回インストール後に `passwords.yaml` で変更しても、稼働中のデータベースは更新**されません**。一度きりの設定値として扱い、以後はそれぞれのデータベースのネイティブなコマンドでローテーションしてください。
:::

### 6. インストーラーを実行する

デプロイディレクトリの中から実行します。

```bash
cd ~/platform-as-vm
chmod +x entrypoint.sh
./entrypoint.sh
```

スクリプトは sudo パスワードを一度だけ要求します。それ以降は、追加の入力なしで一連の処理を最後まで実行します。

途中でインストーラーが失敗した場合は、原因を修正してから `./entrypoint.sh` を再実行してください。playbook は冪等であり、中断した箇所から処理を再開します。

## デプロイの検証

### Pod を確認する

```bash
kubectl get pods -A
```

次のようになっているはずです。

- `kube-system` – すべての Pod が Running（CoreDNS、Traefik、metrics-server、local-path-provisioner）。
- `openlm-infrastructure` – すべての Pod が Running（Redis、Kafka、MongoDB、MariaDB、PostgreSQL）。
- `openlm` – 約 100 個の Pod があり、ほとんどが Running。一部はインストーラー終了後も数分間 `Init` や `ContainerCreating` の状態にとどまることがあります。サービスがイメージを取得し、依存サービスを待っている間の正常な挙動です。

15 分経過しても `CrashLoopBackOff` から抜けない Pod がある場合は、[トラブルシューティング](./troubleshooting) を参照してください。

### Helm リリースを確認する

```bash
helm list -A
```

すべてのリリースが `STATUS: deployed` と表示されているはずです。

### プラットフォームを開く

ブラウザで `https://<your-domain>/` を開きます。OpenLM のログインページが表示されます。

ブラウザに TLS 警告が表示される場合は、証明書が自己署名であるか、ブラウザが信頼していない CA が発行したものであることを示します。そのような構成では想定どおりの挙動です。

### Power BI と接続する（任意）

Power BI などの BI ツールをレポーティングデータベースに接続するには、次の設定を使用します。

| 設定項目 | 値 |
| --- | --- |
| Server | `<vm-ip-or-fqdn>:30432` |
| Database | `openlm_reporting_db` |
| Username | `postgres` |
| Password | `passwords.yaml` で設定した `postgres_password` |

Power BI Desktop では、**データの取得** → **PostgreSQL データベース** を選択し、サーバーとデータベース名を入力したうえで認証情報を指定します。

## 次のステップ

- プラットフォームの運用 – [運用](./operations) でヘルスチェック、ログ、バックアップ、アップグレードを説明しています。
- 構成のチューニング – [構成リファレンス](./configuration) で外部 SQL Server、外部 Kafka などのパターンを説明しています。
- 問題が発生した場合 – [トラブルシューティング](./troubleshooting) によくある問題と対処法をまとめています。
