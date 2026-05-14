---
title: トラブルシューティング
sidebar_position: 5
description: "Platform as VM デプロイで発生しやすいインストール時およびインストール後の問題と、現実的な解決策をまとめます。"
---

このページでは、最もよく見られる問題を一覧にまとめています。記載のない問題に直面した場合の一般的な進め方は次のとおりです。

1. `kubectl get pods -A` で失敗している Pod を特定する。
2. `kubectl logs <pod> -n <namespace> --tail 200` でその出力を確認する。
3. `kubectl describe pod <pod> -n <namespace>` で末尾の最近のイベントを確認する。

## インストーラーの失敗

### 「This playbook is only for RedHat-family systems」

インストーラーは RHEL と AlmaLinux のみをサポートします。Ubuntu、Debian、SUSE はサポートされていません。サポート対象の OS で VM をプロビジョニングし直してください。[要件](./requirements) を参照してください。

### 「Minimum 32 GB RAM required」/「Minimum 4 CPU cores required」

VM のスペックが不足しています。回避策はありません。継続する前に VM をリサイズしてください。

### sudo パスワードプロンプトで「Authentication failure」

入力したパスワードが誤っているか、ユーザーに sudo 権限がありません。次のコマンドで確認します。

```bash
sudo -v
```

失敗する場合は、VM をプロビジョニングした担当者に sudo 権限の付与を依頼してください。

### 「Wait for K3s to be ready」で停止する

K3s のダウンロード中、または API サーバーの起動が遅いだけのことが多いです。5 分待っても止まったままの場合は、別の SSH セッションを開いて確認します。

```bash
sudo systemctl status k3s
sudo journalctl -u k3s --no-pager --since "5 minutes ago"
```

最も多い原因は、VM から `get.k3s.io` への送信 HTTPS アクセスができないことです。プロキシまたはファイアウォールを修正し、インストーラーを再実行してください。

### 「Helm install」で失敗する

インストーラーの出力中の Helm エラーメッセージを確認します。典型的な原因は次のとおりです。

- **タイムアウト** – チャートの Pod が時間内に Ready 状態にならない。`kubectl get pods -n openlm-infrastructure` を実行し、失敗している Pod のイベントを確認します。
- **ImagePullBackOff** – VM がコンテナイメージレジストリに到達できない。`public.ecr.aws` と `docker.io` への送信 HTTPS を確認してください。
- **ディスク容量不足** – `df -h` を実行し、`/var/lib/rancher/k3s` の領域を空けます。

根本原因を修正してから `./entrypoint.sh` を再実行します。playbook は冪等であり、中断した箇所から再開します。

## インストール後の問題

### Pod が `Pending` のまま

```bash
kubectl describe pod <pod> -n openlm | tail -20
```

Events セクションを確認します。典型的な原因は次のとおりです。

- **メモリまたは CPU 不足** – VM がオーバーサブスクライブされている。VM をリサイズするか、重要度の低いサービスをスケールダウンしてください。
- **PVC が Pending のまま** – `kubectl get pvc -n openlm-infrastructure`。PVC が `Pending` の場合、ストレージクラスがプロビジョニングできません。`kube-system` 内で `local-path-provisioner` が稼働していることを確認してください。

### Pod が `ImagePullBackOff` のまま

```bash
kubectl describe pod <pod> -n openlm | grep -i image
```

そこに表示されるイメージタグは、`public.ecr.aws/r3q3q2f4/` 上で有効である必要があります。タグが正しいように見える場合、原因はネットワークの問題です。

```bash
curl -I https://public.ecr.aws/r3q3q2f4/olm-server/manifests/latest 2>&1 | head -5
```

ここで TLS エラーやタイムアウトが返る場合、VM はレジストリに到達できていません。プロキシまたはファイアウォールを修正してください。

タグ自体が誤っている、または見覚えのないタグであれば、デプロイパッケージが破損している可能性があります。OpenLM から再ダウンロードしてください。

### Pod が `CrashLoopBackOff` のまま

```bash
kubectl logs <pod> -n openlm --previous --tail 100
```

`--previous` フラグが重要です。直前にクラッシュしたコンテナのログを表示し、新しい（空の）コンテナのログではありません。よくあるパターン:

- **データベース接続失敗** – サービスがデータベースに到達できない。`mariadb-0`、`postgres-postgresql-0`、`mongodb-0` が Running であること、`passwords.yaml` のパスワードがデータベース初期化時のものと一致していることを確認してください。
- **Kafka トピックがない** – サービスが必要なトピックを参照しているのに作成されていない。トピック作成スクリプトを再実行してください（[Kafka トピックがない](#missing-kafka-topics) を参照）。
- **スキーマの不整合** – データベーススキーマが古い。`AllDbUpgradeAPI` サービスが起動時にスキーマを移行します。Running 状態であることを確認し、ログを確認してください。

### OpenLM の URL が 404 または Bad Gateway を返す

```bash
# Traefik はリクエストをルーティングしているか
kubectl logs -n kube-system -l app.kubernetes.io/name=traefik --tail 50

# Ingress は存在するか
kubectl get ingress -n openlm | grep <path-prefix>
```

想定する Ingress が存在しない場合、プラットフォームの Helm リリースが完全にインストールされていません。`./entrypoint.sh` を再実行してください。

### ブラウザに TLS / 証明書エラーが表示される

- **`NET::ERR_CERT_AUTHORITY_INVALID`** – 証明書が自己署名、またはブラウザが信頼していない CA から発行されている。本番外の構成では想定どおりです。
- **`NET::ERR_CERT_COMMON_NAME_INVALID`** – 証明書が使用中の FQDN を含んでいない。正しい名前で証明書を再発行し、インストーラーを再実行してください。インストーラーは証明書ファイルを再読み込みし、Kubernetes Secret を更新します。
- **"certificate has expired"** – 上記と同じく再発行と再実行を行います。インストーラーは常に、Kubernetes Secret 上の証明書を現在のファイル内容で上書きします。

証明書と鍵が一致しているか確認するには:

```bash
openssl x509 -noout -modulus -in /etc/openlm/certs/tls.crt | md5sum
openssl rsa  -noout -modulus -in /etc/openlm/certs/tls.key | md5sum
```

2 つの出力は同一でなければなりません。

## DNS の問題

### プラットフォーム自身のドメインで「host not found」と出てサービスがクラッシュする

症状: プラットフォームに対してコールバックするサービス（例: トークンを発行する identity サービス）が「host not found」で失敗する。

原因: クラスタの内部 DNS が `openlm_system_domain` を解決できない。VM が、その FQDN が公開されていないネットワークに置かれている場合に発生しがちです。

修正 – `config.yaml` に CoreDNS の hosts エントリを設定し、インストーラーを再実行します。

```yaml
add_coredns_hosts_entry: true
coredns_hosts_entry_ip:  "<VM の IP>"
```

完全なパターンについては [DNS のないエアギャップネットワーク](./configuration#air-gapped-network-without-dns) を参照してください。

### エンドユーザーがプラットフォームに到達できない

VM 上ではなく**ユーザーのマシン**で `dig <openlm_system_domain> +short` を実行します。VM の IP に解決されない場合は、DNS A レコードを修正してください。解決はされているのに接続が確立しない場合は、外部ファイアウォールを確認してください。ユーザーのネットワークから 443 番ポートを通す必要があります。

## データベースの問題

### PostgreSQL または MariaDB のパスワードをリセットする

同梱データベースのパスワードはインストール時に一度だけ設定されます。その後、`passwords.yaml` は真の値の出所ではなくなります。リセット方法は次のとおりです。

**PostgreSQL:**

```bash
kubectl exec -n openlm-infrastructure -it postgres-postgresql-0 -- \
  psql -U postgres -c "ALTER USER postgres WITH PASSWORD '<new-password>';"
```

**MariaDB:**

```bash
kubectl exec -n openlm-infrastructure -it mariadb-0 -- \
  mysql -uroot -p'<old-password>' -e \
  "ALTER USER 'root'@'%' IDENTIFIED BY '<new-password>'; FLUSH PRIVILEGES;"
```

その後 `passwords.yaml` を更新し、プラットフォームサービスが新しいパスワードを反映するようインストーラーを再実行します。

### 同梱データベースに直接接続する

```bash
# PostgreSQL
kubectl port-forward -n openlm-infrastructure svc/postgres-postgresql 5432:5432

# MariaDB
kubectl port-forward -n openlm-infrastructure svc/mariadb 3306:3306

# MongoDB
kubectl port-forward -n openlm-infrastructure svc/mongodb 27017:27017
```

別のターミナルから `psql`、`mysql`、`mongosh` を `localhost` に向けて実行します。

## Kafka の問題

<a id="missing-kafka-topics"></a>

### Kafka トピックがない

サービスのログに「topic does not exist」や「Unknown topic or partition」が出る場合は、トピック作成スクリプトを再実行します。

```bash
kubectl cp installation_files/kafka_topics/full_topic_list_create.sh \
  openlm-infrastructure/kafka-controller-0:/tmp/create-topics.sh
kubectl exec -n openlm-infrastructure kafka-controller-0 -- \
  bash /tmp/create-topics.sh
```

このスクリプトは冪等です。既に存在するトピックはスキップします。

### 既存トピックを一覧表示する

```bash
kubectl exec -n openlm-infrastructure kafka-controller-0 -- \
  /opt/bitnami/kafka/bin/kafka-topics.sh \
  --bootstrap-server localhost:9092 --list
```

## ディスク容量

K3s、コンテナイメージ、データベースデータはすべて VM のプライマリディスクに置かれます。Pod が Eviction 警告とともに失敗し始めたら、ディスク使用量を確認します。

```bash
df -h
sudo du -sh /var/lib/rancher/k3s/*
sudo du -sh /var/lib/rancher/k3s/storage/*   # 永続ボリュームのデータ
```

`/var/lib/rancher/k3s` が満杯であれば、最も単純な対策はディスクを拡張することです。使用していないコンテナイメージを掃除するには、次のコマンドを使います。

```bash
sudo k3s crictl images        # 一覧表示
sudo k3s crictl rmi --prune   # 未使用を削除
```

## サポートへの連絡

OpenLM サポートに連絡する際は、次の情報を添えてください。

1. `kubectl get pods -A` の出力。
2. `helm list -A` の出力。
3. 失敗している Pod のログ: `kubectl logs <pod> -n <ns> --tail 500`。
4. Pod が起動していない場合は `kubectl describe pod <pod> -n <ns>` の出力。
5. `config.yaml`（パスワードは伏せ字にする）と、デプロイパッケージのバージョン。
