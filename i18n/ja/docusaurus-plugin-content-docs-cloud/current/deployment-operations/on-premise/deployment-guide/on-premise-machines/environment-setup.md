---
title: 環境セットアップ
description: "on-premise machines 経路における、マシンのプロビジョニング、Kubernetes のインストール、クラスター構成、インフラサービスのデプロイについて説明します。"
sidebar_position: 2
---

このページでは、オンプレミスマシン構成向けのマシン準備、Kubernetes インストール、クラスタ設定、インフラサービスデプロイについて説明します。

インフラチームがすでに Kubernetes クラスタとインフラサービスを準備済みの場合は、[前提条件](./prerequisites) に進んで準備完了を確認し、その後 [プラットフォームのインストール](../platform-installation) に進んでください。

## マシン準備

[要件](./requirements) に従ってマシンを用意します。次のノードロールを想定してください。

| ロール | 用途 | 推奨仕様 |
| --- | --- | --- |
| Master node | クラスタ control plane と Ingress 入口 | 安定性のため Kubernetes システムワークロードのみを実行 |
| Infrastructure node | データベース、Kafka、Redis | 一部 DB イメージのため x86 アーキテクチャ必須 |
| Worker nodes (2-3) | OpenLM Platform のマイクロサービス | ARM または x86 |
| Reporting nodes (2) | Spark ワークロードと Apache Superset | ARM または x86 |

:::note
同じクラスタ内で ARM と x86 を混在させることは可能です。Infrastructure ノードは、すべてのデータベースコンテナイメージとの互換性のため x86 にしてください。
:::

## ネットワーク設定

各マシンには次が必要です。

- クラスタ内通信用の **プライベート IP アドレス**（プライベートネットワーク上で通信制限なし）
- 必要に応じて、管理用の **パブリック IP アドレス**（SSH 22 番ポートのみに制限）
- Master node 上で Ingress トラフィック用の HTTP **80** と **443** 番ポートを開放
- クラスタ管理用に、ネットワーク経由で Kubernetes API へアクセス可能であること

## Kubernetes のインストール

以下の例では MicroK8s を使用します。他のディストリビューション（kubeadm、k3s、RKE2）でも流れはほぼ同じです。

### 各ノードに MicroK8s をインストール

```bash
sudo apt update && sudo apt install snapd -y
sudo snap install microk8s --classic
```

### advertise address の設定

各ノードで `/var/snap/microk8s/current/args/kube-apiserver` を編集し、プライベートネットワーク IP を設定します。

```
--advertise-address=<PRIVATE_IP>
```

変更後、MicroK8s を再起動します。

```bash
sudo snap restart microk8s
```

### ノードをクラスタへ参加

Master node で join token を生成します。

```bash
microk8s add-node
```

表示されたコマンドを各 Worker node で実行します。

```bash
microk8s join <MASTER_IP>:<PORT>/<TOKEN>
```

参加させるノードごとに Master で `add-node` を実行します。すべて接続されたことを確認します。

```bash
microk8s kubectl get nodes
```

## クラスタトポロジーとノードラベル

Affinity ルールに基づいてワークロードが正しいマシンへ配置されるよう、ノードへラベルを付与します。

```bash
kubectl label node <infra-node>     openlm.com/role=infrastructure-workload
kubectl label node <worker-node-1>  openlm.com/role=main-workload
kubectl label node <worker-node-2>  openlm.com/role=main-workload
kubectl label node <worker-node-3>  openlm.com/role=main-workload
kubectl label node <report-node-1>  openlm.com/role=reporting-workload
kubectl label node <report-node-2>  openlm.com/role=reporting-workload
```

ラベル確認:

```bash
kubectl get nodes --show-labels
```

## インフラのインストール

すべてのノード接続後、専用 namespace にインフラサービスをデプロイします。

```bash
kubectl create namespace openlm-infrastructure
```

### サービスのデプロイ

インフラサービス（MongoDB、MariaDB/PostgreSQL、Kafka、Redis）は、デプロイパッケージに含まれる Helm チャートでデプロイします。

各サービスについて:

1. `values.yaml` に storage class 名とストレージサイズを設定
2. 必要に応じて、Infrastructure ノードへ配置するため node selector を追加
3. Helm でインストール

```bash
helm install <release-name> <chart>.tgz -f values.yaml -n openlm-infrastructure
```

### インフラの確認

すべてのインフラ Pod が起動していることを確認します。

```bash
kubectl get pods -n openlm-infrastructure
```

次へ進む前に、各サービス（MongoDB、SQL database、Kafka、Redis）への接続性を確認してください。

## 次の手順

クラスタが稼働し、インフラサービスが正常であれば:

1. [前提条件](./prerequisites) チェックリストを完了
2. [プラットフォームのインストール](../platform-installation) に進む
