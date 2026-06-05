---
title: Cloudポータルサイト
description: OpenLM Cloud Platform ポータルでアカウント、ユーザー、ロール、クライアント認可ファイルを管理するためのドラフトドキュメントです。
slug: /legacy/slmc/cloud-portal
tags: [cloud, administration]
---

:::note[Draft]
このページはドラフトです。内容は鋭意レビュー中です。スクリーンショットや手順は変更される場合があります。
:::

## 概要
OpenLM Cloud Platform は、組織のクラウド展開を一元管理します。対象はアクティブな製品、ユーザーとロールの管理（Identity and Access Management (IAM)）、および OpenLM コンポーネント（例: Broker）向けのクライアント認可ファイルです。


## 前提条件（TODO）
以下を用意してください:
- 有効な OpenLM Cloud Platform サブスクリプション（トライアルまたは有償）
- 登録済みユーザー 1 名（初期オーナー / 管理者）
- 必要な OpenLM Cloud Platform エンドポイントへのネットワーク送信許可（Network セクション参照）
- サポート対象のブラウザー（Chrome / Firefox / Edge の最新）  
TODO: システム要件ページへのリンクを追加。

## ポータルへのアクセス
ランディングページで「Go」を選択して Active Products 画面に入ります。ここにはテナントにプロビジョニングされた製品が表示されます。


「Software License Management Cloud」の下で「Open」を選択すると、ライセンス監視とレポートのための OpenLM Web インターフェースが開きます。


## 4. Identity & Access Management (IAM)
歯車アイコンから IAM を開き、Users、外部アイデンティティプロバイダー、Client Authorization Files を管理します。


### 4.1 Users
Users 画面には OpenLM Cloud にアクセスできるアカウントが一覧表示されます。
- 新規登録アカウントはロールが未割り当てです。編集してロールを付与してください。
- ユーザー行にカーソルを置くと、編集（鉛筆）アイコンが表示されます。


ロールドロップダウンから適切なロールを割り当てます（初期管理者は `Admin` を使うことが一般的です）。


### 4.2 ユーザーの招待
「Invite User」をクリックしてメールアドレスで追加ユーザーを招待します。初期アクセスレベルは Admin または Viewer を選択します。


招待によりアカウントが作成されます（ユーザー名 = メールアドレス）。OpenLM アプリケーション内でロールを割り当てる必要があります: `Start -> Administration -> Role`。


### 4.3 Roles
よく使うロール:
- `admin_role`: OpenLM Cloud のフルコントロール
- `openlm_users_role`: 使用状況の閲覧とレポート実行のみ。設定変更は不可。


ロールにユーザーを追加するには:
1. ロールを選択し、Edit をクリックします。
2. Users タブを開きます。
3. Add をクリックします。
4. 必要に応じて検索（右下の検索ボックス）します。
5. ユーザーを選択すると、ロールのメンバー一覧に追加されます。


## 5. Client Authorization Files
Client Authorization Files は Cloud Portal に移行されました。「ADD」からコンポーネント（例: Broker）用の認可ファイルを作成します。

ドロップダウンでコンポーネントを選択し、説明を追加して Save をクリックします。

成功メッセージを確認します。


Secret Key 画面には認可情報が表示されます。以下を使用します:
- Copy: JSON をクリップボードにコピー
- Download: `authorization.json` を保存（コンポーネントにインポート）

## 6. ネットワーク / ファイアウォール要件
以下への outbound HTTPS (443) を許可してください:
- `cloud.openlm.com`
- `identity.openlm.com`

TODO: 地域別エンドポイントや CDN ドメインが必要か確認。

## 7. 外部アイデンティティプロバイダー（TODO）
SSO / 外部 IdP（Azure AD、Okta など）の統合手順を記載します。
TODO: 設定スクリーンショットと属性マッピングのガイドを追加。

## 8. セキュリティ考慮事項（TODO）
- ロールは最小権限の原則に従う
- 認可シークレットの定期的なローテーション
- 資格情報の回復 / MFA（該当する場合）
TODO: MFA のサポート状況を確認。

## 9. トラブルシューティング（TODO）
| 症状 | 可能性のある原因 | 対応 |
| ------- | -------------- | ------ |
| ユーザーがログインできない | ロール未割り当て | Roles セクションでロールを割り当てる |
| コンポーネントの認可に失敗 | シークレット期限切れ / ファイル誤り | `authorization.json` を再作成して再配置 |
| 画像が読み込まれない | アセットパス不足 | 静的画像パスを確認して再ビルド |

追加のログや診断手順は後で追加します。

## 10. 次のステップ（TODO）
- Broker の詳細セットアップガイドへのリンク
- ライセンスサーバー構成へのリンク
- Reporting Hub（提供されている場合）へのリンク

## 11. 変更履歴（ドラフト管理）
- 初期構成のドラフトを追加（DATE: 2025-11-06）
TODO: 公開までに今後の編集履歴をここに追記。

---
## レガシー未整理メモ（統合または削除予定）
以下はドラフト整理中の参照用に保持している原文メモです。

> ORIGINAL NOTES START
> User accounts must have an Account Role; after registration assign the Role.
> Client Authorization Files allow creation of authorization.json for components.
> URLs required: cloud.openlm.com, identity.openlm.com (HTTPS 443)
> ORIGINAL NOTES END

---
## 削除された画像
すべての説明用スクリーンショットは依頼により削除済みです。再追加が必要な場合は、意味のある代替テキストと検証済みパスで復元してください。
