---
sidebar_position: 32
title: LDAP Connector
---

LDAP Connector は、OpenLM の Directory Synchronization Service（DSS）からのディレクトリ更新データを外部 AWS インフラストラクチャ（Amazon S3 バケットおよび Amazon SQS キュー（FIFO のみ））に転送します。

DSS が LDAP または Active Directory でユーザーやグループの変更を検出すると、LDAP Connector は自動的にそのデータを設定済みの AWS 送信先に送信します。

:::info
LDAP Connector は**クラウド専用**ソリューションです。オンプレミス環境では利用できません。
:::

## 前提条件

- LDAP Connector プロダクトが有効化された OpenLM Platform アカウント。
- 少なくとも 1 つの同期定義が設定された [Directory Synchronization Service（DSS）](directory-sync.mdx)。
- AWS アカウントで事前に設定された **Amazon S3** バケット。
- AWS アカウントで事前に設定された **Amazon SQS** キュー（FIFO タイプ）。
- S3 バケットと SQS キューへの書き込み権限を持つ AWS 認証情報（**Access Key** と **Secret Access Key**）。個人の認証情報ではなく、マシン間認証用の**サービスアカウント**の使用を推奨します。

## LDAP Connector の有効化

LDAP Connector は **Products** UI で個別のプロダクトとして利用できます。

1. OpenLM Platform で **Products** に移動します。
2. **LDAP Connector** を見つけて有効化します。

有効化すると、LDAP Connector はナビゲーションメニューに他のサービスと並んで表示されます。

:::note
DSS での追加設定は不要です。Directory Sync Service は LDAP Connector が有効化されたことを自動的に検出し、同期イベントをコネクタに送信します。
:::

## 送信先システムの設定

LDAP Connector の UI には、設定済みのすべての送信先システムが表示されます。Amazon S3 と Amazon SQS の送信先を追加できます。

### Amazon S3 送信先の追加

1. ナビゲーションメニューから **LDAP Connector** を開きます。
2. **Create New System** を選択します。
3. システムタイプとして **Amazon S3** を選択します。
4. 必須フィールドを入力します：
   - **Name**：この送信先の表示名。
   - **Bucket Name**：Amazon S3 バケットの名前。
   - **Access Key**：AWS アクセスキー。
   - **Secret Access Key**：AWS シークレットアクセスキー。
   - **Region**：バケットが配置されている AWS リージョン（例：`eu-west-1`）。
5. **Save** を選択します。

### Amazon SQS 送信先の追加

1. ナビゲーションメニューから **LDAP Connector** を開きます。
2. **Create New System** を選択します。
3. システムタイプとして **Amazon SQS** を選択します。
4. 必須フィールドを入力します：
   - **Name**：この送信先の表示名。
   - **Queue URL**：Amazon SQS FIFO キューの完全な URL（AWS コンソールから取得）。
   - **Access Key**：AWS アクセスキー。
   - **Secret Access Key**：AWS シークレットアクセスキー。
   - **Region**：キューが配置されている AWS リージョン。
5. **Save** を選択します。

### 送信先システムの編集

1. 送信先システムのカードヘッダーをクリックして詳細ビューを開きます。
2. **Edit** を選択して設定を変更します。
3. 必須フィールドを更新し、**Save** を選択します。

### 接続の確認

送信先システムの詳細ビューから **Check Connection** を選択すると、LDAP Connector が提供された認証情報で設定済みの AWS リソースに接続できるかを確認できます。

### 送信先システムの削除

1. 送信先システムの詳細ビューを開きます。
2. **Delete** を選択し、削除を確認します。

## 同期履歴

各送信先システムは、同期イベントの結果を記録する同期履歴を保持しています。

同期履歴を表示するには：

1. 送信先システムのカードヘッダーをクリックして詳細ビューを開きます。
2. **Sync History** グリッドで、成功および失敗した同期操作の記録を確認します。

## 同期の仕組み

1. DSS が設定済みの LDAP/Active Directory ソースで変更（ユーザーの作成、更新、削除）を検出する。
2. DSS が変更データを LDAP Connector に送信する。
3. LDAP Connector がすべての設定済み送信先システムにデータを転送する。
4. Amazon S3 バケットに新しいファイルが作成され、Amazon SQS キューに新しいメッセージが追加される。
