---
sidebar_position: 4
---

# エージェントアクティビティマネージャー（Agent Activity Manager）

## 概要

**Agent Activity Manager** を使用すると、エンドユーザー端末に接続された Workstation Agent を監視できます。リモートでの再起動や、不要になったWorkstation Agentの削除が可能です。


## 前提条件

- 少なくとも 1 台の端末に Workstation Agent をインストールし、接続してください。

## Workstation Agent のインストールと接続

以下の手順で Workstation Agent をインストールし、システムへ接続します。

1. システム要件に従ってエンドユーザー端末を準備します（URL 後日）。
2. [OpenLM ダウンロードページ](https://www.openlm.com/downloads/) から Workstation Agent を入手します。
3. インストーラを実行し、ライセンス条項に同意して **Next**。
4. 使用中アプリケーションに対応する拡張を選択（該当なければ未選択のまま）し、**Next**。
5. インストールパスを指定、または既定のまま **Next**。
6. デプロイ種別（**Cloud** または **On-Premise**）を選択し **Next**。

**Cloud / On-Premise 共通:**

7. エンドユーザーにPersonal Dashboard（ライセンスリポジトリ等）へのアクセスを許可するか選択し、**Next**。

**On-Premise のみ:**

8. **Dongle Monitoring** を有効化するか選択し、**Next**。
9. ホスト名にシステムの FQDN と `/agents-hub` を入力し、ポート 443 の疎通を確認します。



**Cloud / On-Premise 共通:**

10. Identity で発行した **Agent Authorization File** をインポートし、**Next**。
11. **Finish** を選択して完了します。



### エージェント認可ファイルの準備

本システムは OAuth 認証を使用し、各コンポーネントが接続前に認証を行う必要があります。

1. **Home Page** で **Identity** を選択します。
2. **Add Client** を選択し、クライアントタイプに **Agent** を指定します。
3. **Save** を選択し、生成された **Agent Authorization File** をダウンロードします。


## 接続済み Workstation Agent の管理

インストール後は、次の操作が可能です。

- 接続済みエージェントの情報を一覧表示（以下を含む）
  - Host Name
  - User Name
  - IP Address
  - Agent Version
- 各エージェントのオンライン/オフライン状態を監視
- エージェントをリモート再起動
- 不要なエージェントを削除
