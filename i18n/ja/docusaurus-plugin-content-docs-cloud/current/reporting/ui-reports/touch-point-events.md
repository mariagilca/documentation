---
title: "Touch Point Events"
description: "Touch Point Events は、OpenLM Workstation Agent を導入したワークステーションから、登録済み URL（サブディレクトリを含む）にユーザーがアクセスする頻度をレポートします。"
sidebar_position: 3
---

## 概要

**Touch Point Events**は、OpenLM　Workstation Agentがインストールされているワークステーションから、ユーザーが登録済みURL（サブディレクトリを含む）にどのくらいの頻度でアクセスするかを報告します。Workstation Agentは、アクセスされたURLを自動的に検出し、監視対象の候補として提案します。滞在時間ではなく、ウェブサイトへのアクセス頻度を追跡します。

:::info[アプリでの場所]
OpenLM Platform の**アプリランチャー**（右上のグリッドアイコン）を開き、**Agents（エージェント）→ Touch Point Events** を選択します。

**事前準備:** 対象マシンに OpenLM Workstation Agent をインストールし、[Agents Hub](/cloud/data-collection/agents_hub) で監視対象 URL を登録します。
:::

## 前提条件

- **エージェントアクティビティマネージャー(Agent Activity Manager)**: すべての対象マシンにWorkstation Agentをインストールします。
- **Agents Hub**で設定を構成します
[設定ガイド](/cloud/data-collection/agents_hub)。

## 監視対象URLの登録

監視対象URLを登録するには、次の手順に従ってください。

1. **Agents Hub**で、自動的に検出されたURLを確認します。
2. URLを承認して監視を有効にするか、監視したくないURLをオフに切り替えます（拒否）。
3. 特定のウェブサイトを監視するために、URL（サブディレクトリを含む）を手動で追加することもできます。

登録後、**Touch Point Events**でURLアクセス頻度レポートを表示します。

- **username**または**workstation**でレポートをフィルタリングします。