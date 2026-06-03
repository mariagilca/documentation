---
title: "サービスリファレンス"
sidebar_position: 3
draft: true
description: "各 OpenLM マイクロサービスは、.NET 向けの HotChocolate を使って構築された GraphQL API を提供します。"
---
各 OpenLM マイクロサービスは、.NET 向けの HotChocolate を使って構築された GraphQL API を提供します。すべてのサービスは `/graphql` エンドポイントを提供しており、対話的にクエリを試せる GraphQL IDE（Nitro または Banana Cake Pop）を `/graphql/ui` で利用できます。

## サービスポート一覧

| サービス | デフォルトポート | GraphQL パス |
|---------|-------------|-------------|
| Identity API | 5013 | `/graphql` |
| Server Operational API | デフォルト | `/graphql` |
| Audit Service | 6501 | `/graphql` |
| Compliance Service | デフォルト | `/graphql` |
| Denial Service | 8202 | `/graphql` |
| Usage Service | 8101 | `/graphql` |
| License Access Control | デフォルト | `/graphql` |
| License File Management | デフォルト | `/graphql` |
| Products Service | 8001 | `/graphql` |
| Users and Groups Service | 7084 | `/graphql` |
| Identity Discovery | 8000 | `/graphql` |

## 共有型

これらの型は、Denial、Usage その他のエンリッチメントサービスを含め、複数のサービスでネストされたオブジェクトとして登場します。

### User 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `uid` | String | ユーザーの一意識別子 |
| `userName` | String | ユーザー名 |
| `firstName` | String | 名（ファーストネーム） |
| `lastName` | String | 姓（ラストネーム） |
| `email` | String | メールアドレス |
| `country` | String | 国 |
| `department` | String | 部署 |
| `phoneNumber` | String | 電話番号 |
| `defaultGroupName` | String | デフォルトグループ名 |
| `defaultGroupId` | String | デフォルトグループ ID |

### Server 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `serverId` | Int | サーバー識別子 |
| `description` | String | `port@host` 形式のサーバー記述 |
| `lmType` | String | ライセンスマネージャーの種類 |
| `source` | String | データソース |

### License 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | Int | ライセンス ID |
| `name` | String | ライセンス名 |
| `vendor` | String | ベンダー名 |
| `version` | String | ライセンスのバージョン |
| `type` | String | ライセンスタイプ |
| `additionalKey` | String | 追加キー |
| `productName` | String | ルックアップテーブルから取得した製品名 |

### Project 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `projectId` | String | プロジェクト識別子 |
| `projectName` | String | プロジェクト名 |
| `workstation` | String | ワークステーション名 |
| `startTime` | DateTime | 開始時刻 |
| `endTime` | DateTime | 終了時刻 |

### AgentData 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `ip` | String | エージェントの IP アドレス |
| `startCurrentIdleTime` | DateTime | 現在のアイドル開始時刻 |
| `idleIntervals` | [IdleIntervalData] | アイドル区間の履歴 |
| `processManagerUrl` | String | プロセスマネージャー URL |

---

## Identity API

**エンドポイント：** `http://<host>:5013/graphql`
**UI：** `http://<host>:5013/graphql/ui`
**データベース：** SQL Server

アカウント、ユーザー、ロール、ログイン履歴を管理します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー | ページネーション |
|-----------|------------|-------------|------------|
| `accounts` | `[AccountResponse]` | SysAdminPolicy | カーソル |
| `roles` | `[RoleEntity]` | AdminAccessPolicy | オフセット |
| `loginHistories` | `[LoginHistory]` | AdminAccessPolicy | オフセット |
| `identityUsers` | `[IdentityUserType]` | AdminAccessPolicy | オフセット |
| `identityUser(userId)` | `IdentityUserType` | AdminAccessPolicy | - |
| `usersExtended` | `[UserExtendedType]` | ViewerAccessPolicy | オフセット |

### 主な型

**AccountResponse：**

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | String | アカウント ID |
| `accountName` | String | アカウント名 |
| `displayName` | String | 表示名 |
| `isActive` | Boolean | 有効ステータス |
| `accountType` | AccountType | `Cloud` または `OnPremises` |

**LoginHistory：**

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | Int | レコード ID |
| `userId` | String | ユーザー ID |
| `userName` | String | ユーザー名 |
| `loginTimeUtc` | DateTime | ログインタイムスタンプ（UTC） |
| `logoutTimeUtc` | DateTime | ログアウトタイムスタンプ（UTC） |
| `loginIp` | String | ログイン IP アドレス |

### クエリ例

```graphql
query {
  loginHistories(skip: 0, take: 20,
    order: [{ loginTimeUtc: DESC }]) {
    items {
      userName
      loginTimeUtc
      logoutTimeUtc
      loginIp
    }
    totalCount
  }
}
```

### ミューテーション

| 操作 | 引数 | 戻り型 | 認証ポリシー |
|-----------|-----------|------------|-------------|
| `createUserAsync` | `CreateUserInput!` | `IdentityResult` | AdminAccessPolicy |
| `editUserAsync` | `EditUserInput!` | `IdentityResult` | AdminAccessPolicy |
| `deleteUserAsync` | `userId: String!` | `IdentityResult` | AdminAccessPolicy |
| `assignRolesAsync` | `userId: String!, roleIds: [String]!` | `IdentityResult` | AdminAccessPolicy |

---

## Audit Service

**エンドポイント：** `http://<host>:6501/graphql`
**UI：** `http://<host>:6501/graphql/ui`
**データベース：** MongoDB

すべてのプラットフォーム操作の監査証跡イベントを記録します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー | ページネーション |
|-----------|------------|-------------|------------|
| `audits` | `[AuditEntity]` | ViewerAccessPolicy | オフセット |
| `auditsCursor` | `[AuditEntity]` | ViewerAccessPolicy | カーソル |
| `auditByIdAsync(id)` | `AuditEntity` | ViewerAccessPolicy | - |

### AuditEntity 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | ID | MongoDB ObjectId |
| `userId` | String | アクションを実行したユーザー |
| `userName` | String | ユーザー名 |
| `action` | String | 実行されたアクション |
| `objectType` | String | 影響を受けたエンティティ型 |
| `objectName` | String | エンティティ名 |
| `objectIds` | [String] | 影響を受けたエンティティの ID |
| `serviceName` | String | このイベントを記録したサービス |
| `timestamp` | DateTime | イベント発生時刻（UTC） |
| `details` | String | 追加情報の JSON |

### クエリ例

```graphql
query {
  audits(skip: 0, take: 50,
    where: { serviceName: { eq: "Identity" } },
    order: [{ timestamp: DESC }]) {
    items {
      userName
      action
      objectType
      objectName
      timestamp
      details
    }
    totalCount
  }
}
```

---

## Compliance Service

**エンドポイント：** `http://<host>/graphql`
**データベース：** MongoDB

コンプライアンスルールを管理し、地理的ポリシーに対するライセンス利用を評価します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー | ページネーション |
|-----------|------------|-------------|------------|
| `getComplianceRules` | `[ComplianceRule]` | ViewerAccessPolicy | カーソル |
| `getComplianceReportData` | `[ComplianceReportEntry]` | ViewerAccessPolicy | カーソル |

### ミューテーション

| 操作 | 引数 | 戻り型 | 認証ポリシー |
|-----------|-----------|------------|-------------|
| `addComplianceRule` | `ComplianceRuleInput!` | `Boolean` | AdminAccessPolicy |
| `updateComplianceRule` | `ruleId: String!, ComplianceRuleInput!` | `Boolean` | AdminAccessPolicy |
| `deleteComplianceRules` | `ruleIds: [String]!` | `Boolean` | AdminAccessPolicy |
| `importComplianceRules` | `rules: [ComplianceRuleInput]!` | `Boolean` | AdminAccessPolicy |

### FeaturesParamsDto 型

コンプライアンスルールで機能固有のパラメーターを指定するために使用されます。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `featureId` | Int | 機能 ID |
| `featureName` | String | 機能名 |
| `serverId` | Int | サーバー ID |
| `serverDescription` | String | サーバー記述 |

---

## Denial Service

**エンドポイント：** `http://<host>:8202/graphql`
**UI：** `http://<host>:8202/graphql/ui`
**データベース：** MongoDB

ライセンス拒否イベントを記録し、クエリを提供します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー | ページネーション |
|-----------|------------|-------------|------------|
| `denials` | `[DenialEntity]` | SlmAccessPolicy | カーソル（最大 250 件） |

### DenialEntity 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `denialId` | Int | 拒否 ID |
| `vendor` | String | ベンダー名 |
| `workstationName` | String | クライアントワークステーション |
| `actionTimeUtc` | DateTime | 拒否発生時刻（UTC） |
| `denialType` | DenialType | 拒否の種類 |
| `reason` | String | 拒否理由 |
| `userData` | User | ユーザー情報。[共有型](#user-型)を参照。 |
| `serverData` | Server | ライセンスサーバー情報。[共有型](#server-型)を参照。 |
| `licenseData` | License | ライセンス情報。[共有型](#license-型)を参照。 |
| `projects` | [Project] | 関連プロジェクト。[共有型](#project-型)を参照。 |

### クエリ例

```graphql
query {
  denials(first: 10, order: [{ denialId: DESC }]) {
    totalCount
    nodes {
      denialId
      vendor
      workstationName
      actionTimeUtc
      denialType
      userData { userName email }
      serverData { description lmType }
      licenseData { name vendor type }
    }
  }
}
```

---

## Usage Service

**エンドポイント：** `http://<host>:8101/graphql`
**UI：** `http://<host>:8101/graphql/ui`
**データベース：** MongoDB

ライセンス使用セッションとライセンスの解放を管理します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー | ページネーション |
|-----------|------------|-------------|------------|
| `getSessions` | `[SessionEntity]` | SlmAccessPolicy | オフセット（最大 250 件） |

### SessionEntity 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | String | MongoDB ObjectId |
| `sessionId` | Int | セッション ID |
| `hostName` | String | クライアントワークステーション |
| `serverData` | Server | ライセンスサーバー情報。[共有型](#server-型)を参照。 |
| `licenseData` | License | ライセンス情報。[共有型](#license-型)を参照。 |
| `userData` | User | ユーザーの詳細。[共有型](#user-型)を参照。 |
| `handle` | Int | セッションハンドル |
| `numLicenses` | Int | ライセンス数 |
| `startTime` | DateTime | セッション開始時刻（UTC） |
| `endTime` | DateTime | セッション終了時刻（UTC）。アクティブな場合は null |
| `isBorrowed` | Boolean | ボロー（貸し出し）ライセンスのフラグ |
| `lingerTime` | Int | リンガータイム（秒） |
| `source` | String | データソース |
| `projects` | [Project] | 関連プロジェクト。[共有型](#project-型)を参照。 |
| `agentData` | AgentData | エージェント固有のデータ。[共有型](#agentdata-型)を参照。 |

### ミューテーション

| 操作 | 引数 | 戻り型 | 認証ポリシー |
|-----------|-----------|------------|-------------|
| `removeLicense` | `sessionId: Int!` | `Boolean` | AdminAccessPolicy |

### クエリ例

```graphql
query {
  getSessions(skip: 0, take: 25,
    where: { endTime: { eq: null } },
    order: [{ startTime: DESC }]) {
    items {
      sessionId
      hostName
      startTime
      numLicenses
      isBorrowed
      userData { userName email department }
      serverData { description lmType }
      licenseData { name vendor type productName }
    }
    totalCount
  }
}
```

### ミューテーション例

```graphql
mutation {
  removeLicense(sessionId: 12345)
}
```

---

## License Access Control (LAC)

**エンドポイント：** `http://<host>/graphql`
**データベース：** MongoDB

License Access Control のアセット、ルール、およびファイルデプロイを管理します。

### クエリ

| 操作 | 戻り型 | ページネーション |
|-----------|------------|------------|
| `getLACAssetsPending` | `[LACAssetPending]` | カーソル（最大 100 件） |
| `getLACAssetsReadManageOverview` | `[LACReadManageOverview]` | カーソル（最大 100 件） |
| `getLACAssetContent(assetId, assetType)` | `String` | - |
| `getLACAssetRules` | `[LACAssetRule]` | カーソル（最大 100 件） |
| `getLACAssetsPendingHostsFilterValues(searchTerm)` | `[String]` | オフセット（最大 100 件） |
| `getLACAssetsPendingVendorsFilterValues(searchTerm)` | `[String]` | オフセット（最大 100 件） |
| `getAssetsLMTypesFilterValues` | `[LicenseServerType]` | - |

**LACAssetType 列挙：** `ReadOnly`、`Managed`、`Pending`

**LicenseServerType 列挙：** `FLEXlm`、Reprise License Manager (`RLM`)

### LACAssetRule 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | String | MongoDB ObjectId |
| `lacAssetId` | String | 親アセットの ID |
| `licenseServerName` | String | サーバー名 |
| `vendor` | String | ベンダー名 |
| `lmType` | LicenseServerType | FLEXlm または RLM |
| `ruleCategory` | RuleCategory | GlobalOptions、Permissions、Reservations など |
| `ruleType` | RuleType | RESERVE、INCLUDE、EXCLUDE、MAXIMUM、TIMEOUT など |
| `ruleValue` | String | ルールの値 |
| `featureInformation` | FeatureInformation | 機能の詳細 |
| `entityType` | EntityType | User、Host、IP など |
| `entitiesNames` | [String] | ルールの適用対象となるエンティティ名 |

### ミューテーション

| 操作 | 引数 | 戻り型 |
|-----------|-----------|------------|
| `approveAssetPending` | `info: ApproveAssetPendingInfo!` | `Boolean` |
| `deployAssetManage` | `assetManageId: String!` | `Boolean` |
| `addRule` | `assetManageId: String!, rule: LACRule!` | `Boolean` |
| `updateRule` | `ruleId: String!, updatedRule: LACRule!` | `Boolean` |
| `deleteRules` | `rulesIds: [String]!` | `Boolean` |

### クエリ例

```graphql
query {
  getLACAssetRules(first: 20, order: [{ ruleType: ASC }]) {
    nodes {
      id
      licenseServerName
      vendor
      lmType
      ruleCategory
      ruleType
      entityType
      entitiesNames
    }
    totalCount
    pageInfo { hasNextPage endCursor }
  }
}
```

### ミューテーション例

```graphql
mutation {
  addRule(assetManageId: "64a1b2c3d4e5f6789", rule: {
    ruleCategory: PERMISSIONS
    ruleType: EXCLUDE
    featureInformation: { featureName: "AutoCAD_2024" }
    entityType: USER
    entitiesNames: ["john.doe", "jane.smith"]
  })
}
```

---

## License File Management (LFM)

**エンドポイント：** `http://<host>/graphql`
**データベース：** MongoDB

ライセンスファイル、ドラフト、およびライセンスサーバーへのデプロイを管理します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー | ページネーション |
|-----------|------------|-------------|------------|
| `getLicenseFiles` | `[LicenseFileEntity]` | ViewerAccessPolicy | カーソル |
| `getUniqueServerNames` | `[String]` | ViewerAccessPolicy | オフセット |
| `getUniqueDraftStatusesAsync` | `[String]` | ViewerAccessPolicy | - |
| `getUniqueOutputFormatsAsync` | `[String]` | ViewerAccessPolicy | - |

### LicenseFileEntity 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | String | MongoDB ObjectId |
| `accountId` | String | テナントまたはアカウント ID |
| `licenseText` | String | ライセンスファイルの全文 |
| `crc` | Long | CRC（巡回冗長検査）チェックサム |
| `receiveDate` | DateTime | 受信日時 |
| `obsoleteDate` | DateTime | 廃止日時 |
| `filePath` | String | ファイルパスまたは保存場所 |
| `draft` | LicenseFileDraft | 現在のドラフト |
| `serverData` | LicenseServer | サーバー情報 |
| `isBrokerActive` | Boolean | Broker のステータス |

### LicenseFileDraft 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `licenseText` | String | ドラフトのライセンス内容 |
| `createDate` | DateTime | ドラフト作成タイムスタンプ |
| `recentlySavedDate` | DateTime | 最終保存タイムスタンプ |
| `pushDate` | DateTime | Broker へプッシュした日時 |
| `checkSum` | String | 内容の MD5 ハッシュ |
| `status` | DraftStatus | Active または Submitted |
| `note` | String | デプロイメントメモ |
| `commandId` | String | Broker コマンド ID |
| `commandStatus` | String | Broker 実行ステータス |
| `errorResultMessage` | String | 失敗時のエラー詳細 |

### ミューテーション

**ドラフト操作：**

| 操作 | 引数 | 戻り型 | 認証ポリシー |
|-----------|-----------|------------|-------------|
| `createDraftAsync` | `licenseFileId: String!, draftText: String!` | `Boolean` | AdminAccessPolicy |
| `updateDraftAsync` | `licenseFileId: String!, draftText: String!` | `Boolean` | AdminAccessPolicy |
| `deleteDraftAsync` | `licenseFileId: String!` | `Boolean` | AdminAccessPolicy |
| `pushDraftAsync` | `licenseFileId: String!, note: String!` | `String`（commandId） | AdminAccessPolicy |

**サーバー紐付け操作：**

| 操作 | 引数 | 戻り型 | 認証ポリシー |
|-----------|-----------|------------|-------------|
| `attachLicenseServer` | `licenseFileId: String!, licenseServerId: Int!, serverName: String!` | `Boolean` | AdminAccessPolicy |
| `detachLicenseServer` | `licenseFileId: String!` | `Boolean` | AdminAccessPolicy |

### クエリ例

```graphql
query {
  getLicenseFiles(first: 20, order: [{ receiveDate: DESC }]) {
    nodes {
      id
      filePath
      crc
      receiveDate
      obsoleteDate
      serverData {
        serverName
        serverId
        hosts { name port }
      }
      draft {
        status
        createDate
        pushDate
        note
      }
      isBrokerActive
    }
    totalCount
    pageInfo { hasNextPage endCursor }
  }
}
```

---

## Products Service

**エンドポイント：** `http://<host>:8001/graphql`
**UI：** `http://<host>:8001/graphql/ui`
**データベース：** MongoDB

プロダクト、アカウントプロダクト、およびプロダクトのアクティベーションを管理します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー |
|-----------|------------|-------------|
| `getProducts` | `[ProductEntity]` | Default |
| `getAccountProducts` | `AccountProductsEntity` | Default |
| `getNavigations` | `[NavigationUIResponse]` | Default |
| `getProductsWithAccounts` | `[ProductDto]` | CloudAccessPolicy |
| `getProductAccounts(productType, activationStatus)` | `[AccountProductDto]` | SysAdminAccessPolicy |
| `getProductsInfo` | `[ProductInfoDto]` | SysAdminAccessPolicy |

### ProductType 列挙（部分一覧）

`SLM`、`Audit`、`Compliance`、`Alerts`、`Projects`、`Reporting`、`LAC`、`UGS`、`Identity`、`AgentsHub`、`VLM`、`CloudBroker`、`LicenseManager`、`LFM`、`Products`、`Homepage`

### ProductActivationStatus 列挙

`Active`、`Fail`、`PendingActivation`、`PendingDeactivation`、`Deactivated`

### ミューテーション

| 操作 | 引数 | 戻り型 | 認証ポリシー |
|-----------|-----------|------------|-------------|
| `changeProductEnabledState` | `productType: ProductType!, enabled: Boolean!` | `Boolean` | AdminAccessPolicy |
| `activateAccountProductAsync` | `productType: String!, activate: Boolean!` | `Boolean` | AdminAccessPolicy |
| `updateProductDefaultRoleAsync` | `productType: String!, roleName: String!` | `Boolean` | AdminAccessPolicy |

### クエリ例

```graphql
query {
  getProducts(order: [{ productType: ASC }]) {
    items {
      productType
      displayName
      enabled
      navigationItems {
        name
        route
        icon
      }
    }
    totalCount
  }
}
```

---

## Users and Groups Service (UGS)

**エンドポイント：** `http://<host>:7084/graphql`
**データベース：** MongoDB

ユーザー、グループ、ワークステーション、メールエイリアスを照会するための読み取り専用 GraphQL API。書き込み操作はすべて REST API を使用します。

### クエリ

| 操作 | 引数 | 戻り型 | 認証ポリシー | ページネーション |
|-----------|-----------|------------|-------------|------------|
| `users` | `tenantId: String!` | `[User]` | IntegrationProjectsViewerAccessPolicy | オフセット（最大 100 万件） |
| `usersCursor` | `tenantId: String!` | `[User]` | IntegrationAccessPolicy | カーソル（最大 100 万件） |
| `groupUsers` | `tenantId: String!, groupId: String!` | `[User]` | ViewerAccessPolicy | オフセット |
| `groups` | `tenantId: String!, returnRoot: Boolean` | `[Group]` | ViewerAccessPolicy | オフセット |
| `groupsCursor` | `tenantId: String!, returnRoot: Boolean` | `[Group]` | IntegrationAccessPolicy | カーソル |
| `childGroups` | `tenantId: String!, groupId: String!` | `[Group]` | IntegrationProjectsViewerAccessPolicy | オフセット |
| `workstations` | `tenantId: String!` | `[Computer]` | ViewerAccessPolicy | オフセット |
| `workstationsCursor` | `tenantId: String!` | `[Computer]` | IntegrationAccessPolicy | カーソル |
| `groupWorkstations` | `tenantId: String!, groupId: String!` | `[Computer]` | ViewerAccessPolicy | オフセット |
| `getEmailAliases` | `tenantId: String!, showAttachedAliases: Boolean!` | `[EmailAlias]` | ViewerAccessPolicy | オフセット |

### User 型（UGS）

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | ID | MongoDB ObjectId |
| `username` | String | ユーザー名 |
| `firstName` | String | 名 |
| `lastName` | String | 姓 |
| `displayName` | String | 表示名 |
| `email` | String | メールアドレス |
| `department` | String | 部署 |
| `country` | String | 国 |
| `phone` | String | 電話番号 |
| `isEnabled` | Boolean | 有効ステータス |
| `creationSource` | EntityCreationSource | ユーザー作成方法 |
| `defaultGroupName` | String | デフォルトグループ |
| `parentGroups` | [ParentExtendedReference] | 親グループのメンバーシップ |

### Group 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | ID | MongoDB ObjectId |
| `groupName` | String | グループ名 |
| `isEnabled` | Boolean | 有効ステータス |
| `isUserGroup` | Boolean | ユーザーを含むかどうか |
| `isComputerGroup` | Boolean | コンピューターを含むかどうか |
| `userMembersCount` | Long | おおよそのユーザー数 |
| `childGroupsCount` | Long | 子グループ数 |
| `parentGroups` | [ParentExtendedReference] | 親グループ |

### クエリ例

```graphql
query {
  users(tenantId: "my-tenant-id", skip: 0, take: 50,
    where: { isEnabled: { eq: true } },
    order: [{ username: ASC }]) {
    items {
      id
      username
      firstName
      lastName
      email
      department
      isEnabled
      creationSource
      defaultGroupName
      parentGroups { parentId parentName }
    }
    totalCount
    pageInfo { hasPreviousPage hasNextPage }
  }
}
```

---

## Identity Discovery Service

**エンドポイント：** `http://<host>:8000/graphql`
**データベース：** MongoDB

Okta、Auth0、Azure AD、Ping Identity の ID プロバイダーアカウント設定を管理します。

### クエリ

| 操作 | 戻り型 | 認証ポリシー |
|-----------|------------|-------------|
| `getAccount` | `AccountDto` | ViewerAccessPolicy |

### ミューテーション

| 操作 | 引数 | 戻り型 | 認証ポリシー |
|-----------|-----------|------------|-------------|
| `saveAccount` | `dto: AccountDto!` | `Boolean` | AdminAccessPolicy |
| `updateAccount` | `dto: AccountDto!` | `Boolean` | AdminAccessPolicy |
| `deleteAccount` | -（テナントコンテキストを使用） | `Boolean` | AdminAccessPolicy |

### IdentityServiceDto 型

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `type` | IdentityType | `Okta`、`Auth0`、`Azure`、または `PingIdentity` |
| `url` | String | サービス URL |
| `clientId` | String | クライアント ID |
| `clientSecret` | String | クライアントシークレット |
| `apiKey` | String | API キー |
| `tenantId` | String | テナント ID |
| `environmentId` | String | 環境 ID |
| `enabled` | Boolean | サービス有効ステータス |

### プロバイダー別の必須フィールド

| プロバイダー | url | clientId | clientSecret | apiKey | tenantId | environmentId |
|----------|-----|----------|-------------|--------|----------|---------------|
| Okta | はい | はい | はい | はい | - | - |
| Auth0 | はい | はい | はい | - | - | - |
| Azure AD | - | はい | はい | - | はい | - |
| Ping Identity | はい | はい | はい | - | - | はい |

### クエリ例

```graphql
query {
  getAccount {
    accountId
    enabled
    services {
      type
      url
      clientId
      enabled
    }
  }
}
```

### ミューテーション例

```graphql
mutation {
  saveAccount(dto: {
    accountId: "my-account"
    enabled: true
    services: [{
      type: OKTA
      url: "https://myorg.okta.com"
      clientId: "0oa1234567890abcdef"
      clientSecret: "secret123"
      apiKey: "00abc123_api_key"
      enabled: true
    }]
  })
}
```
