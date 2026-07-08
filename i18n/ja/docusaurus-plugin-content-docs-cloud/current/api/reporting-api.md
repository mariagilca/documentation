---
title: "ReportingDataAPI"
sidebar_position: 2
description: "OpenLM Identity Server で認証し、ReportingDataAPI の GraphQL エンドポイントからライセンスデータを読み取ります。クエリとフィールドの完全なリファレンスを含みます。"
---

このガイドは、OpenLM Reporting へのアクセスが必要な外部およびクライアント側のインテグレーター向けです。ReportingDataAPI は認証に OAuth 2.0 を使用します。

## 概要

ReportingDataAPI からデータを読み取るには、OpenLM Identity Server で認証し、短期間有効な JWT アクセストークンを受け取り、そのトークンをすべての API リクエストで `Bearer` 認証情報として送信します。

フローは次の 3 ステップです。

```text
1. Client ID + Client Secret  ──▶  2. POST /connect/token  ──▶  3. Call the API
   (issued to your service)         (Identity Server)
```

これはサーバー間 (server-to-server) フローです。ユーザーログインやブラウザーのリダイレクトはありません。アプリケーションは自分自身として認証します。

## 前提条件

認証して API を呼び出すには、次のものが必要です。

| 必要なもの | 値または取得元 |
| :---- | :---- |
| Client ID | お客様ごとに発行されるクライアント。 |
| Client Secret | クライアントとともに発行されます。秘密として扱い、決してコミットしないでください。 |
| Identity Server ベース URL `{IDENTITY_URL}` | `https://cloud-us.openlm.com/identity`（prod-us）または `https://cloud-eu.openlm.com/identity`（prod-eu）。 |
| ベース URL `{BASE_URL}` | `https://cloud-us.openlm.com`（prod-us）または `https://cloud-eu.openlm.com`（prod-eu）。 |
| スコープ | `openlm.reporting-data-api-service.scope` |
| ReportingDataAPI ベース URL `{API_BASE_URL}` | `{BASE_URL}/api/reportingdataapi` |

:::note
このクライアントは `client_credentials` グラントをサポートします。発行されるアクセストークンは JWT で、有効期間は 3,600 秒（1 時間）です。このクライアントが属するお客様は Client ID（末尾の GUID）にエンコードされ、トークンの `customer_name` クレームとして公開されます。
:::

## ステップ 1 — クライアント認証情報を生成する

インテグレーションは Client ID で識別され、Client Secret で認証されます。これらの値は、ログイン後に OpenLM Identity ページで自分で生成します。お客様ごとに個別のクライアントがプロビジョニングされるため、生成される Client ID にはお客様 ID が含まれます。

### Identity ページにログインする

OpenLM アカウントでサインインした後、ブラウザーで OpenLM Identity ページを開きます。

- Prod-us: `https://cloud-us.openlm.com/identity`
- Prod-eu: `https://cloud-eu.openlm.com/identity`

{/* TODO: add screenshot — OpenLM Identity page sign-in screen */}

### 新しいクライアントを生成する

Identity ページで、クライアントまたは API アクセスのセクションに移動し、ReportingDataAPI 用の新しいクライアントを作成します。

{/* TODO: add screenshot — client / API-access section */}
{/* TODO: add screenshot — new client for the ReportingDataAPI */}

### Client ID と Client Secret をコピーする

クライアントを生成したら、両方の値をすぐにコピーするか、JSON をダウンロードします。

- Client ID。
- Client Secret — 作成時にのみ表示されるため、ここで保存してください。

:::warning
Client Secret は生成時に一度だけ表示されます。紛失した場合は、新しいクライアントを生成してください。シークレットはシークレットマネージャーまたは環境変数に保存し、決してソースにハードコードしたりリポジトリにコミットしたりしないでください。
:::

```bash
export OPENLM_CLIENT_ID="<your-client-id>"
export OPENLM_CLIENT_SECRET="<your-client-secret>"
export OPENLM_IDENTITY_URL="https://<your-base-url>/identity"
```

## ステップ 2 — トークンエンドポイントを確認する（ディスカバリー）

Identity Server は OpenID Connect ディスカバリードキュメントを公開しています。正確なトークンエンドポイントは、次の場所で確認できます。

```text
GET {IDENTITY_URL}/.well-known/openid-configuration
```

該当するフィールドは `token_endpoint` で、次のように解決されます。

```text
{IDENTITY_URL}/connect/token
```

ディスカバリーは一度だけ実行すれば十分です。トークンエンドポイントのパス（`/connect/token`）は安定しています。

## ステップ 3 — アクセストークンをリクエストする

`grant_type=client_credentials` を指定して、トークンエンドポイントに `POST` を送信します。

### リクエスト（curl）

```bash
curl -X POST "$OPENLM_IDENTITY_URL/connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=$OPENLM_CLIENT_ID" \
  -d "client_secret=$OPENLM_CLIENT_SECRET" \
  -d "scope=openlm.reporting-data-api-service.scope"
```

### レスポンス

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "openlm.reporting-data-api-service.scope"
}
```

`access_token` を取り出します。これは JWT です。デコードして（例: jwt.io で）、`customer_name`、`name`、`email`、`role` などのクレームを確認できます。

## ステップ 4 — トークンを使用して ReportingDataAPI を呼び出す

トークンをすべてのリクエストで `Authorization: Bearer` ヘッダーとして送信します。サポートされるスキーマの完全な一覧については、このページ後半の「[エンドポイントと GraphQL クエリ](#エンドポイントと-graphql-クエリ)」セクションを参照してください。

### REST の例

```bash
curl -X GET "{API_BASE_URL}/<endpoint>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Accept: application/json"
```

### GraphQL の例

```bash
curl -X POST "{API_BASE_URL}/graphql" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "query": "{ licenseUsage(first: 25) { totalCount pageInfo { hasNextPage endCursor } nodes { user_name feature_name vendor start_time_utc } } }" }'
```

## トークンの有効期間と更新

- アクセストークンの有効期間は 3,600 秒（1 時間）です（`expires_in: 3600`）。
- client_credentials フローはリフレッシュトークンを発行しません。トークンの有効期限が近づいたら、ステップ 3 を繰り返して新しいトークンを取得します。
- ベストプラクティス: トークンをメモリにキャッシュし、`expires_in` の値を追跡して、API 呼び出しのたびにではなく有効期限の数秒前に再取得します。

## トラブルシューティング

| 症状 | 考えられる原因 | 対処 |
| :---- | :---- | :---- |
| `400 invalid_client` | Client ID または Secret が間違っているか、シークレットが別の環境のものです。 | 認証情報がその環境の Identity Server と一致していることを確認します。 |
| `400 invalid_scope` | スコープのスペルが間違っています。 | 正確に `openlm.reporting-data-api-service.scope` を使用します。 |
| API からの `401 Unauthorized` | トークンが欠落または期限切れか、オーディエンスが間違っています。 | トークンを再取得し、`Authorization: Bearer <token>` ヘッダーがあることを確認します。 |
| `403 Forbidden` | トークンは有効ですが、そのテナントまたはリソースに対する権限がありません。 | `customer_name` クレームまたは `X-Customer-Name` ヘッダーを確認します。 |
| トークンが機能した後、約 1 時間で失敗する。 | トークンが期限切れになりました。 | 新しいトークンを取得します（ステップ 3）。 |

## リファレンス — Identity 設定（正式な値）

| 設定 | 値 |
| :---- | :---- |
| クライアントシークレットの要否 | 必須 |
| スコープ | `openlm.reporting-data-api-service.scope` |
| アクセストークンの種類 | JWT |
| アクセストークンの有効期間 | 3,600 秒（1 時間） |
| トークンクレーム | `name`, `email`, `customer_name`, `role` |
| トークンエンドポイント | `{IDENTITY_URL}/connect/token` |
| ディスカバリー | `{IDENTITY_URL}/.well-known/openid-configuration` |

## エンドポイントと GraphQL クエリ

認証（トークンの取得）については、このページ前半の「[概要](#概要)」で説明しています。以下のすべてのリクエストには、有効な `Authorization: Bearer <token>` ヘッダーが必要です。

ReportingDataAPI は GraphQL API です。すべてのデータは単一のエンドポイント経由で読み取ります。

| エンドポイント | メソッド | 用途 |
| :---- | :---- | :---- |
| `{API_BASE_URL}/graphql` | `POST` | すべてのデータクエリ（`GET` ではブラウザー内 GraphQL エクスプローラー）。 |
| `{API_BASE_URL}/health` | `GET` | ヘルスチェック。 |

**フィールドの命名:** スキーマは camelCase です（`licenseUsage`、`pageInfo`、`totalCount`、`orderBy` など）。`groupBy` および `orderBy` の引数値は snake_case の生の列名です（例: `"feature_name"`）。

次の表は、これらのクエリ全体で開発者が使用するパラメーターの型の概要です。

| パラメーター | 型 | 説明 |
| :---- | :---- | :---- |
| `first` | Int | （カーソルページング）先頭から取得するレコード数。例: `first: 25`。 |
| `after` | String | （カーソルページング）前回のレスポンスのカーソル文字列。その後の次ページを取得します。 |
| `last` / `before` | Int / String | （カーソルページング）考え方は同じですが、末尾から逆方向にページングします。 |
| `skip` | Int | （オフセットページング）読み取り前にスキップするレコード数。 |
| `take` | Int | （オフセットページング）スキップ後に読み取るレコード数。 |
| `searchTerm` | String | （フィルターリスト）ドロップダウンの値を絞り込む任意のテキスト。空にするとすべての一意な値を取得します。 |
| `limit` | Int | （ウィジェット専用）ウィジェットが返す行数。各クエリの注記を参照してください。 |
| `where` | （フィルターオブジェクト） | 結果の任意のフィールドに対する任意のフィルター（サーバーが自動生成）。 |
| `order` | （ソートオブジェクト） | 結果の任意のフィールドに対する任意のソート（サーバーが自動生成）。 |

:::note
利用可能なクエリはデプロイメントモードによって異なります。（オンプレミスのみ）と記載されたクエリはセルフホスト版にのみ存在します。（クラウドのみ）と記載されたクエリはクラウド版にのみ存在します。それ以外はすべて両方に存在します。
:::

### メインレポートクエリ

これらはページングされたデータを返します。カーソルページングのパラメーター `first`、`after`、`last`、`before` を使用します。また、任意のフィールドに対する `where`（フィルター）と `order`（ソート）も受け付けます。

| クエリ | パラメーター | 説明 |
| :---- | :---- | :---- |
| `licenseUsage` | `first`, `after`, `last`, `before`, `where`, `order` | ライセンス使用レコード。 |
| `licenseDenials` | `first`, `after`, `last`, `before`, `where`, `order` | ライセンス拒否レコード。 |
| `sessionDetails` | `first`, `after`, `last`, `before`, `where`, `order` | アプリケーション／セッションレコード。 |
| `projectData` | `first`, `after`, `last`, `before`, `where`, `order` | プロジェクトレコード。 |
| `devices`（オンプレミスのみ） | `first`, `after`, `last`, `before`, `where`, `order` | テナントスコープのデバイスレコード。 |

**使い方:** 例えば `licenseUsage(first: 25)` から始めます。レスポンスには `pageInfo.hasNextPage` と `endCursor` が含まれます。そのカーソルを `after` として渡すと次のページを取得できます: `licenseUsage(first: 25, after: "<endCursor>")`。`totalCount` は全レコード数を返します。

### カウントクエリ

これらは単一の数値を返し、パラメーターを取りません。

| クエリ | 戻り値 | 意味 |
| :---- | :---- | :---- |
| `licenseUsageActiveLicenseCount` | Int | 現在アクティブなライセンスの数。 |
| `licenseUsageHostRunningCount` | Int | 現在実行中のホストの数。 |
| `licenseDenialsDenialCountInLast24Hours` | Int | 過去 24 時間の拒否数。 |
| `licenseDenialsNewAlertsCountIn24Hours` | Int | 過去 24 時間における一意な新規拒否アラート数。 |

**使い方:** 例えば `{ licenseUsageActiveLicenseCount }` のように直接呼び出します。

### フィルター値ルックアップクエリ

これらは、1 つのフィールドについて重複のないソート済みの値をページング形式で返し、フィルターのドロップダウンを構築するのに使用します。いずれも任意の `searchTerm` と、オフセットページングのパラメーター `skip`、`take` を取ります。

すべてに共通のパラメーター: `searchTerm`（String、任意）、`skip`（Int）、`take`（Int）。

**License Usage:** `licenseUsageLicenseTypeFilterValues`, `licenseUsageVersionFilterValues`, `licenseUsageUserNameFilterValues`, `licenseUsageWorkstationFilterValues`, `licenseUsageVendorFilterValues`, `licenseUsageFeaturePackageFilterValues`, `licenseUsageFeatureProductFilterValues`, `licenseUsageFeaturePackageItemFilterValues`, `licenseUsageIsTokenBasedFilterValues`

**License Denials:** `licenseDenialsUserNameFilterValues`, `licenseDenialsWorkstationFilterValues`, `licenseDenialsMinorErrorFilterValues`, `licenseDenialsMajorErrorFilterValues`, `licenseDenialsErrorTextFilterValues`, `licenseDenialsFeatureNameFilterValues`, `licenseDenialsStatusFilterValues`, `licenseDenialsGroupIdFilterValues`, `licenseDenialsGroupNameFilterValues`, `licenseDenialsCategoryFilterValues`, `licenseDenialsVendorFilterValues`, `licenseDenialsFeatureVersionFilterValues`, `licenseDenialsLicenseTypeFilterValues`, `licenseDenialsAdditionalKeyFilterValues`, `licenseDenialsHostnameFilterValues`, `licenseDenialsLicenseServerFilterValues`

**Session Details:** `sessionDetailsUserFilterValues`, `sessionDetailsWorkstationFilterValues`, `sessionDetailsIdleTimeFilterValues`, `sessionDetailsSessionEndTimeHolidaysFilterValues`, `sessionDetailsSessionEndTimeWeekdaysFilterValues`, `sessionDetailsSessionFilterValues`, `sessionDetailsProcessFilterValues`, `sessionDetailsDependencyFilterValues`, `sessionDetailsCustomerFilterValues`, `sessionDetailsReasonFilterValues`, `sessionDetailsAgentStatusFilterValues`, `sessionDetailsVersionFilterValues`

:::note
Session Details では、`searchTerm` の型が異なります。`sessionDetailsIdleTimeFilterValues` と `sessionDetailsSessionFilterValues` は Float の `searchTerm` を取ります。`sessionDetailsAgentStatusFilterValues` は Int の `searchTerm` を取ります。2 つの `SessionEndTime` クエリは DateTime の `searchTerm` を取ります。その他は String の `searchTerm` を取ります。
:::

**Touchpoint Details:** `touchpointDetailsUsernameFilterValues`（String）、`touchpointDetailsWorkstationFilterValues`（String）、`touchpointDetailsEventDateTimeFilterValues`（DateTime の `searchTerm`）

**Dongle Monitoring:** `dongleMonitoringDeviceNameFilterValues`、`dongleMonitoringDeviceDescriptionFilterValues`、`dongleMonitoringManufacturerFilterValues`、`dongleMonitoringUserNameFilterValues`、`dongleMonitoringHostNameFilterValues`、`dongleMonitoringBlacklistedFilterValues` は String の `searchTerm` を取ります。`dongleMonitoringAgentStatusFilterValues` は Int の `searchTerm` を取ります。

**Project Data:** `projectDataProjectNameFilterValues`、`projectDataUserNameFilterValues`、`projectDataPriorityFilterValues`、`projectDataSourceFilterValues`（すべて String の `searchTerm`）

**デバイスフィルター（オンプレミスのみ）:** `deviceNameFilterValues`、`deviceManufacturersFilterValues`、`deviceHostNameFilterValues`、`deviceUserNameFilterValues`

:::note
これらは `searchTerm`（String）と `skip`、`take` を取ります。さらに、`deviceHostNameFilterValues` と `deviceUserNameFilterValues` は、結果を 1 つのデバイスに限定する任意の `deviceId`（String）を受け付けます。
:::

**使い方:** `licenseUsageVendorFilterValues(searchTerm: "auto", take: 20)` は "auto" を含む一意なベンダーを最大 20 件返します。すべての値を一覧するには `searchTerm` を省略します。

### ダッシュボードウィジェットクエリ

これらは（ページングされていない）単純なリストを返します。主要なパラメーターは `limit` です。

`limit` パラメーターの説明:

- Top-N ウィジェット: `limit` は 5 または 10 のみに制限されます。それ以外の値（または省略時）は 10 になります。つまり `limit: 5` → 5 行、それ以外 → 10 行。
- 全リストウィジェット（`activeUsersReport`、`licenseServerStatus`、`hostAvailability`）: `limit` は 1〜100 を受け付けます。範囲外または省略時は安全上限として 100 になります。

| クエリ | パラメーター | 説明（戻り値／並び順） |
| :---- | :---- | :---- |
| `topDeniedFeatures` | `limit: Int`（5/10） | 拒否が最も多い機能。多い順。 |
| `topDeniedUsers` | `limit: Int`（5/10） | 拒否が最も多いユーザー。多い順。 |
| `topMostUsedFeatures` | `limit: Int`（5/10） | 最も使用された機能。使用量が多い順。 |
| `topLeastUsedFeatures` | `limit: Int`（5/10） | 最も使用されていない機能。使用量が少ない順。 |
| `topLongestSessions` | `limit: Int`（5/10） | 最も長いセッション。長い順。 |
| `topIdleSessions` | `limit: Int`（5/10） | 最もアイドル時間が長いセッション。アイドル時間が長い順。 |
| `topProductNames` | `limit: Int`（5/10） | 使用量上位の製品。 |
| `topVendorNames` | `limit: Int`（5/10） | 使用量上位のベンダー。 |
| `topMostActiveUsers` | `limit: Int`（5/10） | 最もアクティブなユーザー（1 セッション以上のユーザーのみ）。 |
| `topLeastActiveUsers` | `limit: Int`（5/10） | 最もアクティブでないユーザー（1 セッション以上のユーザーのみ）。 |
| `activeUsersReport` | `limit: Int`（1〜100、デフォルト 100） | 現在アクティブなセッション。 |
| `licenseServerStatus` | `limit: Int`（1〜100、デフォルト 100） | ライセンスサーバーのステータス一覧。 |
| `hostAvailability` | `limit: Int`（1〜100、デフォルト 100） | ホストの可用性一覧。 |

**使い方:** `topDeniedFeatures(limit: 5)` は上位 5 件を返します。`activeUsersReport(limit: 50)` は最大 50 件のアクティブセッションを返します。

## クエリのフィールド一覧

### メインレポートクエリ — フィールド

`nodes { }` 内で次のフィールドを選択します。

**licenseUsage**

`usage_id` (String), `borrowed` (Int), `country` (String), `department` (String), `duration` (Float), `email` (String), `end_time_utc` (DateTime), `feature_name` (String), `first_name` (String), `group_name` (String), `host_id` (String), `host_name` (String), `idle_time` (Float), `is_token_based` (String), `last_name` (String), `lic_inv_additional_key` (String), `lic_inv_type` (String), `lic_inv_vendor` (String), `lic_inv_version` (String), `license_id` (String), `mobile_phone` (String), `num_of_licenses` (Int), `package_id` (String), `package_name` (String), `product_name` (String), `project_name` (String), `quantity` (Int), `region` (String), `remote_ip` (String), `server_id` (String), `server_name` (String), `software_name` (String), `source` (String), `start_date_utc` (DateTime), `start_time_utc` (DateTime), `user_id` (String), `user_name` (String)

**licenseDenials**

`denial_id` (String), `additional_key` (String), `category` (String), `date_utc` (DateTime), `denial_category` (String), `denial_date` (DateTime), `denial_hour_in_day_utc` (Int), `denial_hour_utc` (DateTime), `denial_month_utc` (DateTime), `denial_timestamp` (DateTime), `denial_type` (String), `denial_week_utc` (DateTime), `department` (String), `error_message` (String), `feature_name` (String), `grp_id` (String), `grp_is_computers_group` (Int), `grp_is_user_group` (Int), `grp_name` (String), `grp_timestamp` (DateTime), `host_name` (String), `host_port` (String), `license_id` (String), `license_type` (String), `licsrv_description` (String), `licsrv_istokenenabled` (String), `licsrv_licmanager` (String), `licsrv_timestamp` (DateTime), `licsrv_timezone` (String), `major_err` (String), `minor_err` (String), `num_of_licenses` (Int), `product_name` (String), `project_id` (String), `project_name` (String), `region` (String), `series_no` (String), `server_id` (String), `status` (String), `transaction_id` (String), `ts_ms` (DateTime), `user_country` (String), `user_description` (String), `user_display_name` (String), `user_email` (String), `user_first_name` (String), `user_id` (String), `user_is_valid` (String), `user_last_name` (String), `user_lower_user_name` (String), `user_mobile_phone` (String), `user_name` (String), `user_office` (String), `user_phone_number` (String), `user_timestamp` (DateTime), `vendor` (String), `version` (String), `workstation` (String)

**sessionDetails**

`session_id` (String), `agent_status` (Int), `customer_id` (String), `dll_name` (String), `host_name` (String), `monitoring_id` (String), `process_id` (String), `process_name` (String), `session_duration_in_min` (Float), `session_end_time` (DateTime), `session_start_time` (DateTime), `shutdown_reason` (String), `total_idle_time_in_min` (Float), `transaction_id` (String), `user_id` (String), `user_name` (String), `version` (String)

**touchpointDetails**

`id` (String), `customer_id` (String), `event_date_time` (DateTime), `event_type` (Int), `event_type_desc` (String), `found_url` (String), `page_title` (String), `row_number` (Long), `touchpoint_event_source` (String), `ts_ms` (DateTime), `user_id` (String), `user_name` (String), `website_type` (String), `workstation` (String), `local_host` (String), `main_domain` (String), `sub_domain` (String)

**dongleMonitoring**

`monitoring_id` (String), `agent_status` (Int), `blacklisted_when_connected_or_disconnected` (String), `customer_id` (String), `device_connected_date_time` (DateTime), `device_description` (String), `device_disconnected_date_time` (DateTime), `device_identifier` (String), `device_name` (String), `host_name` (String), `last_update_date_time` (DateTime), `manufacturer` (String), `row_number` (Long), `serial_number` (String), `user_name` (String), `vendor` (String), `user_id` (String)

**projectData**

`project_id` (String), `action` (Int), `end_date_utc` (DateTime), `group_id` (String), `group_name` (String), `is_enabled` (String), `percent_done` (Float), `priority` (String), `project_name` (String), `row_number` (Long), `source` (String), `start_date_utc` (DateTime), `ts_ms` (DateTime), `user_name` (String), `priority_text` (String)

**devices（オンプレミスのみ）**

`TenantId` (String), `UserId` (String), `DeviceIdentifier` (String), `DeviceName` (String), `DeviceDescription` (String), `Manufacturer` (String), `DeviceConnectedDateTime` (DateTime), `LastUpdateDateTime` (DateTime), `DeviceDisconnectedDateTime` (DateTime), `UserName` (String), `HostName` (String), `BlacklistedWhenConnectedOrDisconnected` (Boolean), `SerialNumber` (String), `AgentStatus` (AgentStatus enum), `Vendor` (String)

**例:**

```graphql
{
  licenseUsage(first: 25) {
    totalCount
    pageInfo { hasNextPage endCursor }
    nodes {
      user_name
      feature_name
      vendor
      start_time_utc
    }
  }
}
```

### カウントクエリ — フィールドなし

`licenseUsageActiveLicenseCount`、`licenseUsageHostRunningCount`、`licenseDenialsDenialCountInLast24Hours`、`licenseDenialsNewAlertsCountIn24Hours` はそれぞれ単一の Int を返します。クエリ名を直接リクエストします。

```graphql
{ licenseUsageActiveLicenseCount }
```

### フィルター値クエリ — クエリごとの値の型

これらには選択するフィールド名がありません。`items` が生の値を直接返します。各値の型は次のとおりです。

- String 値: すべての License Usage、License Denials、Project Data、Device、Touchpoint のユーザー名／ワークステーションフィルター。加えて、Session Details のユーザー／ワークステーション／プロセス／依存関係／顧客／理由／バージョンフィルター、Dongle のデバイス名／説明／製造元／ユーザー名／ホスト名／ブラックリストフィルター。
- Float 値: `sessionDetailsIdleTimeFilterValues`、`sessionDetailsSessionFilterValues`
- Int 値: `sessionDetailsAgentStatusFilterValues`、`dongleMonitoringAgentStatusFilterValues`
- DateTime 値: `sessionDetailsSessionEndTimeHolidaysFilterValues`、`sessionDetailsSessionEndTimeWeekdaysFilterValues`

**例:**

```graphql
{
  licenseUsageVendorFilterValues(searchTerm: "", take: 20) {
    totalCount
    pageInfo { hasNextPage }
    items
  }
}
```

### ウィジェットクエリ — フィールド（Cloud のみ）

フィールドを直接選択します。

**topDeniedFeatures**

`feature_name` (String), `vendor` (String), `product_name` (String), `license_type` (String), `denial_type` (String), `denial_category` (String), `denial_count` (Long), `last_denial_date` (DateTime)

**topDeniedUsers**

`user_id` (String), `user_name` (String), `department` (String), `email` (String), `denial_count` (Long), `unique_denied_features` (Long), `last_denial_date` (DateTime)

**topMostUsedFeatures / topLeastUsedFeatures**

`feature_name` (String), `software_name` (String), `vendor` (String), `license_type` (String), `package_id` (Int), `total_duration_days` (Float), `unique_users` (Long), `last_used_utc` (DateTime)

**topLongestSessions**

`usage_id` (Int), `feature_name` (String), `software_name` (String), `vendor` (String), `package_id` (Int), `server_name` (String), `user_id` (String), `user_name` (String), `first_name` (String), `last_name` (String), `department` (String), `group_name` (String), `start_time_utc` (DateTime), `end_time_utc` (DateTime), `date` (DateTime), `duration_days` (Float), `idle_time_hours` (Float), `is_active` (Boolean)

**topIdleSessions**

`usage_id` (Int), `feature_name` (String), `software_name` (String), `vendor` (String), `package_id` (Int), `server_name` (String), `user_id` (String), `user_name` (String), `first_name` (String), `last_name` (String), `department` (String), `group_name` (String), `start_time_utc` (DateTime), `end_time_utc` (DateTime), `duration_days` (Float), `idle_time_hours` (Float)

**topProductNames**

`product_name` (String), `vendor` (String), `session_count` (Long), `total_duration_days` (Float), `unique_users` (Long), `unique_features` (Long)

**topVendorNames**

`vendor` (String), `package_id` (Int), `session_count` (Long), `total_duration_days` (Float), `unique_users` (Long), `unique_features` (Long), `unique_products` (Long)

**topMostActiveUsers / topLeastActiveUsers**

`user_id` (String), `package_id` (Int), `user_name` (String), `first_name` (String), `last_name` (String), `department` (String), `email` (String), `mobile_phone` (String), `group_name` (String), `session_count` (Long), `total_duration_days` (Float), `total_idle_time_hours` (Float), `unique_features` (Long), `last_seen_utc` (DateTime)

**activeUsersReport**

`usage_id` (Int), `user_id` (String), `user_name` (String), `group_name` (String), `feature_name` (String), `software_name` (String), `server_name` (String), `host_id` (String), `num_of_licenses` (Int), `borrowed` (Int), `idle_time_hours` (Float), `start_time_utc` (DateTime), `date` (DateTime), `running_days` (Long), `running_hours` (Long), `running_minutes` (Long), `running_seconds` (Long), `borrowed_text` (String), `session_length_category` (String)

**licenseServerStatus**

`transaction_id` (String), `server_id` (Int), `server_name` (String), `license_manager_type` (String), `host_name` (String), `server_port` (Int), `host_status` (String), `server_status` (String), `update_date_utc` (DateTime), `ts_ms` (String), `ts_ms_converted` (DateTime)

**hostAvailability**

`host_name` (String), `server_port` (Int), `host_status` (String), `server_name` (String), `vendor` (String), `license_manager_type` (String), `last_seen_utc` (DateTime)

**例:**

```graphql
{
  topDeniedFeatures(limit: 5) {
    feature_name
    vendor
    denial_count
    last_denial_date
  }
}
```
