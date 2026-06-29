---
title: システム要件
sidebar_position: 1
description: "OpenLM AI Proxy を導入するためのホスト、ランタイム、ネットワークの要件。"
---

AI Proxy は、ネットワーク内の単一の Linux ホスト上で Docker Compose スタックとして実行されます。導入する前に、以下の要件を確認してください。

## ホスト要件

- 64 ビットの Linux ホスト。AI Proxy は Ubuntu 24.04 LTS でテストされています。
- Docker Compose v2 プラグイン (`docker compose`) を備えた Docker Engine。
- AI Proxy 経由でルーティングする LLM プロバイダーおよび OpenLM Platform エンドポイントへのアウトバウンドインターネットアクセス。

## ハードウェア要件

このスタックは、API、UI、MongoDB、Redis の 4 つのコンテナーを実行します。以下を出発点として使用し、リクエスト量と利用データの保持期間に基づいてスケールしてください。

| リソース | 最小 | 推奨 |
| --- | --- | --- |
| CPU | 2 vCPU | 4 vCPU |
| メモリ | 4 GB | 8 GB |
| ディスク | 20 GB | 50 GB 以上 |

MongoDB のストレージは、保持する利用レコードの数に応じて増加します。長い保持期間や高いリクエスト量に備えて、追加のディスクをプロビジョニングしてください。

## ネットワーク要件

以下の接続性を確保してください。

- **プロバイダーへのアウトバウンド。** AI Proxy 経由でルーティングする各 LLM プロバイダー (例: Anthropic、OpenAI、Google Vertex AI) への HTTPS (ポート 443)。
- **OpenLM Platform へのアウトバウンド。** 利用データを配信する Open Platform Connection 用に、OpenLM Platform エンドポイントへの HTTPS (ポート 443)。
- **クライアントからのインバウンド。** クライアントは、Docker Compose ファイルでマッピングするホストポートで AI Proxy の API と UI に到達します。これらのポートは、必要とするネットワークのみに制限してください。

MongoDB と Redis は内部コンテナーとして実行され、既定ではホストの外部に公開されません。

## サポートされる AI プラットフォーム

AI Proxy は、以下のプラットフォームのリクエストをルーティングおよび計測できます。

- Anthropic (Claude Code)
- OpenAI
- Google Vertex AI (Gemini)

Cursor は AI Proxy 経由ではサポートされていません。各プラットフォームのステータスと認証モードの概要については、[AI Proxy](/cloud/deployment-operations/ai-proxy/) を参照してください。
