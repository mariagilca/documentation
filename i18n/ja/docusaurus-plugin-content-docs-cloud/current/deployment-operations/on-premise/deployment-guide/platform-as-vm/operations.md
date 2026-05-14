---
title: 運用
sidebar_position: 4
description: "Platform as VM デプロイの Day-2 運用: ヘルスチェック、ログ、スケール、バックアップ、アップグレード、アンインストール。"
---

このページでは、インストール後のプラットフォーム運用について説明します。インストール時の問題については [トラブルシューティング](./troubleshooting) を参照してください。

## クラスタへのアクセス

インストーラーはホームディレクトリに kubeconfig を書き出し、`~/.bashrc` で `KUBECONFIG` をエクスポートします。VM 上で新しいシェルを開けば、`kubectl` が動作します。

```bash
kubectl get nodes
kubectl get pods -A
```

ノート PC からクラスタにアクセスするには、VM から kubeconfig をコピーし、サーバー URL を書き換えます。

```bash
scp <user>@<vm-ip>:~/.kube/config ./openlm-vm.kubeconfig
sed -i '' 's|127.0.0.1|<vm-public-ip>|' ./openlm-vm.kubeconfig
export KUBECONFIG=$PWD/openlm-vm.kubeconfig
kubectl get nodes
```

## ヘルスチェック

### すべての Pod が動作中であること

```bash
kubectl get pods -A | grep -v Running | grep -v Completed
```

健全なクラスタでは、このコマンドの結果は空になります。`CrashLoopBackOff`、`Error`、`ImagePullBackOff`、`Pending` の状態が数分以上続く Pod がある場合は調査が必要です。[トラブルシューティング](./troubleshooting) を参照してください。

### Helm リリース

```bash
helm list -A
```

すべてのリリースが `STATUS: deployed` と表示されているはずです。`pending-install` や `failed` のまま止まっているリリースは問題です。

### Ingress

```bash
kubectl get ingress -n openlm
```

Traefik が処理するルートが一覧表示されます。プラットフォーム自体には到達できるのに特定の URL が 404 を返す場合は、対応する Ingress がここに存在することを確認してください。

## ログ

### 1 つの Pod を確認する

```bash
kubectl logs <pod-name> -n openlm
kubectl logs <pod-name> -n openlm --tail 100 -f      # 直近 100 行をフォロー
kubectl logs <pod-name> -n openlm --previous         # クラッシュ済みコンテナの最後のログ
```

### あるサービスのすべての Pod を確認する

```bash
kubectl logs -n openlm -l app=openlm-identity --tail 50
```

## バックアップとリストア

プラットフォームでバックアップ対象となる主なステートは、2 種類あります。

1. **永続ボリュームデータ** – ディスク上の Kafka、MongoDB、PostgreSQL、MariaDB のデータ。バックアップ容量の大半を占めます。
2. **K3s クラスタステート** – Kubernetes オブジェクト（Deployment、Secret など）を保持する組み込みデータストア。サイズが小さく、迅速に復元できます。

外部データベース（SQL Server を使う場合）は本ページの対象外です。普段使用されている DBA ツールでバックアップしてください。

### VM 単位のスナップショット（推奨）

ほとんどの顧客にとって、最も簡潔で信頼性の高いバックアップは、ハイパーバイザーまたはクラウドプロバイダーによる VM 全体のスナップショットです。K3s、すべての永続ボリューム、システムステートが一貫した 1 つのイメージとして取得されます。これが推奨アプローチです。

VM プラットフォームが対応していれば、日次スナップショットをスケジュールし、RPO/RTO ポリシーに従って保持してください。

### データベース単位のバックアップ

より細かい RPO が必要な場合、または VM 全体を復元せずにデータを抽出したい場合に使用します。

**PostgreSQL（レポーティング）:**

```bash
kubectl port-forward -n openlm-infrastructure svc/postgres-postgresql 5432:5432 &
PGPASSWORD='<postgres_password>' pg_dump -h localhost -U postgres \
  openlm_reporting_db | gzip > reporting-$(date +%F).sql.gz
kill %1
```

**MariaDB（運用）:**

```bash
kubectl port-forward -n openlm-infrastructure svc/mariadb 3306:3306 &
mysqldump -h localhost -u root -p<mariadb_root_password> \
  --all-databases | gzip > operational-$(date +%F).sql.gz
kill %1
```

**MongoDB:**

```bash
kubectl exec -n openlm-infrastructure mongodb-0 -- \
  mongodump --archive --gzip \
  --uri "mongodb://admin:<mongodb_root_password>@localhost:27017/?authSource=admin" \
  > mongo-$(date +%F).archive.gz
```

リストアは逆の手順をたどります。`kubectl port-forward` を立ち上げ、ダンプを `psql`、`mysql`、`mongorestore` にパイプします。リストア中に書き込みが発生しないよう、対象を利用するサービスは事前にスケールダウンしてください。

## アップグレード

デプロイパッケージには**バージョンが付与されています**。アップグレード手順は次のとおりです。

1. OpenLM から新しいデプロイパッケージを受け取る。
2. VM 上の**別のパス**に展開する（例: `~/platform-as-vm-2026-05/`）。ロールバック用に、以前のパッケージは上書きしないでください。
3. 既存の `config.yaml` を新しいディレクトリにコピーし、新規オプションがあれば反映する。
4. `passwords.yaml` は以前のデプロイからそのままコピーする。同梱データベースを初期化したときと**同じ**パスワードでなければなりません。
5. 新しいディレクトリから `./entrypoint.sh` を実行する。

playbook は冪等です。K3s、名前空間、Secret は既存のものを検出し、変更しません。Helm リリースは新しいチャートバージョンで in-place アップグレードされ、Pod は順次ローリング更新されます。アップグレード中、個別サービスの短時間ダウンタイムは正常な挙動です。サービスごとの合計ダウンタイムは 1 分未満で済むはずです。

:::note
データベーススキーマのマイグレーションは、新バージョンの初回起動時に `AllDbUpgradeAPI` サービスが自動で実行します。このサービスは削除しないでください。
:::

複数のリリースをまたいでメジャーバージョンをアップグレードする場合は、OpenLM サポートにお問い合わせください。特定のバージョン間で必要となるデータマイグレーションがあります。

### ロールバック

アップグレードが失敗した場合や、想定外の挙動が発生した場合:

1. **以前の** デプロイディレクトリに `cd` で移動する。
2. `./entrypoint.sh` を再実行する。

これにより、各 Helm リリースが以前のチャートバージョンへダウングレードされます。

:::warning
スキーマのマイグレーションは可逆ではありません。新バージョンが既に `AllDbUpgradeAPI` を実行している場合、データベースを単純にロールバックすることはできません。スキーマ変更を取り消すには、バックアップからリストアしてください。
:::

## メンテナンスウィンドウ

アップグレードやデータベースレベルの操作は、メンテナンスウィンドウ内で計画してください。プラットフォームは Pod の再起動に強く設計されていますが、次の点に注意してください。

- アクティブなエンドユーザーセッションが一時的に中断される可能性があります。
- レポーティング ETL ジョブが直近のバッチを再実行する場合があります。
- 外部システム（ServiceNow など）との連携は、サービスが復旧するまで Kafka にイベントがキューイングされます。

通常のアップグレードであれば、30 分のメンテナンスウィンドウで十分です。

## アンインストール

プラットフォームと K3s を VM から完全に削除するには次のコマンドを実行します。

```bash
sudo /usr/local/bin/k3s-uninstall.sh
```

:::warning
`k3s-uninstall.sh` は**すべて**を削除します: クラスタ、すべての永続ボリューム（データを含む）、すべてのコンテナイメージ、kubectl 設定。元に戻す手段はありません。後で復旧したい可能性がある場合は、先に VM スナップショットを取得してください。
:::

証明書ディレクトリとデプロイパッケージも削除する場合:

```bash
sudo rm -rf /etc/openlm
rm -rf ~/platform-as-vm*
```
