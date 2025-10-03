---
sidebar_position: 3
---

# Touch Points Events

## 概要

**Touch Points Events**は、OpenLM　Workstation Agentがインストールされているワークステーションから、ユーザーが登録済みURL（サブディレクトリを含む）にどのくらいの頻度でアクセスするかを報告します。Workstation Agentは、アクセスされたURLを自動的に検出し、監視対象の候補として提案します。滞在時間ではなく、ウェブサイトへのアクセス頻度を追跡します。

## 前提条件

- **エージェントアクティビティマネージャー(Agent Activity Manager)**: すべての対象マシンにWorkstation Agentをインストールします。
- **Agents Hub**で設定を構成します
[設定ガイド](./../../services/data-collection/agents_hub.md)。

## 監視対象URLの登録

監視対象URLを登録するには、次の手順に従ってください。

1. **Agents Hub**で、自動的に検出されたURLを確認します。
2. URLを承認して監視を有効にするか、監視したくないURLをオフに切り替えます（拒否）。
3. 特定のウェブサイトを監視するために、URL（サブディレクトリを含む）を手動で追加することもできます。

登録後、**Touch Points Events**でURLアクセス頻度レポートを表示します。

- **username**または**workstation**でレポートをフィルタリングします。