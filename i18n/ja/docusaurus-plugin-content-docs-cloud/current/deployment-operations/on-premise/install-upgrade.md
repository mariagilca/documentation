---
title: アップグレード
description: "初回インストールでは、まず Deployment paths でセットアップ経路を選択し、続いて Platform installation に進みます。"
sidebar_position: 7
---

初回インストールの場合は、まず [デプロイパス](./deployment-paths) で導入方法を選び、その後 [プラットフォームのインストール](./deployment-guide/platform-installation) に進んでください。

このページでは、既存デプロイメントをアップグレードする手順を説明します。

## アップグレード前

- 破壊的変更、移行手順、必須のデータベース変更がないかリリースノートを確認します
- アップグレード前にデータベースをバックアップします
- 開始前にすべての Pod が正常であることを確認します（`kubectl get pods -n openlm`）

## アップグレードの実行

```bash
helm upgrade monohelm monohelm-<new-version>.tgz \
  -f mono-values.yaml \
  -n openlm
```

## アップグレード後

- Pod の起動を監視します: `kubectl get pods -n openlm -w`
- 主要サービスが正常に応答していることを確認します
- データフロー（ライセンスイベント、レポートパイプライン、directory sync）を検証します
- プラットフォーム UI にエラーがないか確認します

## ロールバック

問題が発生した場合、Helm によるロールバックが可能です。

```bash
helm rollback monohelm -n openlm
```
