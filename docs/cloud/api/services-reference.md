---
title: "Services reference"
sidebar_position: 3
draft: true
description: "Each OpenLM microservice exposes a GraphQL API built on HotChocolate for .NET."
---

Each OpenLM microservice exposes a GraphQL API built on HotChocolate for .NET. Every service provides a `/graphql` endpoint and a GraphQL IDE (Nitro or Banana Cake Pop) at `/graphql/ui` for interactive query exploration.

## Service ports summary

| Service | Default port | GraphQL path |
|---------|-------------|-------------|
| Identity API | 5013 | `/graphql` |
| Server Operational API | default | `/graphql` |
| Audit Service | 6501 | `/graphql` |
| Compliance Service | default | `/graphql` |
| Denial Service | 8202 | `/graphql` |
| Usage Service | 8101 | `/graphql` |
| License Access Control | default | `/graphql` |
| License File Management | default | `/graphql` |
| Products Service | 8001 | `/graphql` |
| Users and Groups Service | 7084 | `/graphql` |
| Identity Discovery | 8000 | `/graphql` |

## Shared types

These types appear as nested objects across multiple services, including Denial, Usage, and other enrichment services.

### User type

| Field | Type | Description |
|-------|------|-------------|
| `uid` | String | User unique identifier |
| `userName` | String | Username |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `email` | String | Email address |
| `country` | String | Country |
| `department` | String | Department |
| `phoneNumber` | String | Phone number |
| `defaultGroupName` | String | Default group name |
| `defaultGroupId` | String | Default group ID |

### Server type

| Field | Type | Description |
|-------|------|-------------|
| `serverId` | Int | Server identifier |
| `description` | String | Server description in `port@host` format |
| `lmType` | String | License manager type |
| `source` | String | Data source |

### License type

| Field | Type | Description |
|-------|------|-------------|
| `id` | Int | License ID |
| `name` | String | License name |
| `vendor` | String | Vendor name |
| `version` | String | License version |
| `type` | String | License type |
| `additionalKey` | String | Additional key |
| `productName` | String | Product name from look-up table |

### Project type

| Field | Type | Description |
|-------|------|-------------|
| `projectId` | String | Project identifier |
| `projectName` | String | Project name |
| `workstation` | String | Workstation name |
| `startTime` | DateTime | Start time |
| `endTime` | DateTime | End time |

### AgentData type

| Field | Type | Description |
|-------|------|-------------|
| `ip` | String | Agent IP address |
| `startCurrentIdleTime` | DateTime | Current idle start |
| `idleIntervals` | [IdleIntervalData] | Idle intervals history |
| `processManagerUrl` | String | Process manager URL |

---

## Identity API

**Endpoint:** `http://<host>:5013/graphql`
**UI:** `http://<host>:5013/graphql/ui`
**Database:** SQL Server

Manages accounts, users, roles, and login history.

### Queries

| Operation | Return type | Auth policy | Pagination |
|-----------|------------|-------------|------------|
| `accounts` | `[AccountResponse]` | SysAdminPolicy | Cursor |
| `roles` | `[RoleEntity]` | AdminAccessPolicy | Offset |
| `loginHistories` | `[LoginHistory]` | AdminAccessPolicy | Offset |
| `identityUsers` | `[IdentityUserType]` | AdminAccessPolicy | Offset |
| `identityUser(userId)` | `IdentityUserType` | AdminAccessPolicy | - |
| `usersExtended` | `[UserExtendedType]` | ViewerAccessPolicy | Offset |

### Key types

**AccountResponse:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Account ID |
| `accountName` | String | Account name |
| `displayName` | String | Display name |
| `isActive` | Boolean | Active status |
| `accountType` | AccountType | `Cloud` or `OnPremises` |

**LoginHistory:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | Int | Record ID |
| `userId` | String | User ID |
| `userName` | String | Username |
| `loginTimeUtc` | DateTime | Login timestamp (UTC) |
| `logoutTimeUtc` | DateTime | Logout timestamp (UTC) |
| `loginIp` | String | Login IP address |

### Example query

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

### Mutations

| Operation | Arguments | Return type | Auth policy |
|-----------|-----------|------------|-------------|
| `createUserAsync` | `CreateUserInput!` | `IdentityResult` | AdminAccessPolicy |
| `editUserAsync` | `EditUserInput!` | `IdentityResult` | AdminAccessPolicy |
| `deleteUserAsync` | `userId: String!` | `IdentityResult` | AdminAccessPolicy |
| `assignRolesAsync` | `userId: String!, roleIds: [String]!` | `IdentityResult` | AdminAccessPolicy |

---

## Audit Service

**Endpoint:** `http://<host>:6501/graphql`
**UI:** `http://<host>:6501/graphql/ui`
**Database:** MongoDB

Records audit trail events for all platform operations.

### Queries

| Operation | Return type | Auth policy | Pagination |
|-----------|------------|-------------|------------|
| `audits` | `[AuditEntity]` | ViewerAccessPolicy | Offset |
| `auditsCursor` | `[AuditEntity]` | ViewerAccessPolicy | Cursor |
| `auditByIdAsync(id)` | `AuditEntity` | ViewerAccessPolicy | - |

### AuditEntity type

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID | MongoDB ObjectId |
| `userId` | String | User who performed the action |
| `userName` | String | Username |
| `action` | String | Action performed |
| `objectType` | String | Entity type affected |
| `objectName` | String | Entity name |
| `objectIds` | [String] | Affected entity IDs |
| `serviceName` | String | Which service recorded this |
| `timestamp` | DateTime | When it happened (UTC) |
| `details` | String | Additional JSON details |

### Example query

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

**Endpoint:** `http://<host>/graphql`
**Database:** MongoDB

Manages compliance rules and evaluates license usage against geographical policies.

### Queries

| Operation | Return type | Auth policy | Pagination |
|-----------|------------|-------------|------------|
| `getComplianceRules` | `[ComplianceRule]` | ViewerAccessPolicy | Cursor |
| `getComplianceReportData` | `[ComplianceReportEntry]` | ViewerAccessPolicy | Cursor |

### Mutations

| Operation | Arguments | Return type | Auth policy |
|-----------|-----------|------------|-------------|
| `addComplianceRule` | `ComplianceRuleInput!` | `Boolean` | AdminAccessPolicy |
| `updateComplianceRule` | `ruleId: String!, ComplianceRuleInput!` | `Boolean` | AdminAccessPolicy |
| `deleteComplianceRules` | `ruleIds: [String]!` | `Boolean` | AdminAccessPolicy |
| `importComplianceRules` | `rules: [ComplianceRuleInput]!` | `Boolean` | AdminAccessPolicy |

### FeaturesParamsDto type

Used in compliance rules to specify feature-specific parameters.

| Field | Type | Description |
|-------|------|-------------|
| `featureId` | Int | Feature ID |
| `featureName` | String | Feature name |
| `serverId` | Int | Server ID |
| `serverDescription` | String | Server description |

---

## Denial Service

**Endpoint:** `http://<host>:8202/graphql`
**UI:** `http://<host>:8202/graphql/ui`
**Database:** MongoDB

Records and queries license denial events.

### Queries

| Operation | Return type | Auth policy | Pagination |
|-----------|------------|-------------|------------|
| `denials` | `[DenialEntity]` | SlmAccessPolicy | Cursor (max 250) |

### DenialEntity type

| Field | Type | Description |
|-------|------|-------------|
| `denialId` | Int | Denial ID |
| `vendor` | String | Vendor name |
| `workstationName` | String | Client workstation |
| `actionTimeUtc` | DateTime | When the denial occurred (UTC) |
| `denialType` | DenialType | Type of denial |
| `reason` | String | Denial reason |
| `userData` | User | User information. See [Shared types](#user-type). |
| `serverData` | Server | License server information. See [Shared types](#server-type). |
| `licenseData` | License | License information. See [Shared types](#license-type). |
| `projects` | [Project] | Associated projects. See [Shared types](#project-type). |

### Example query

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

**Endpoint:** `http://<host>:8101/graphql`
**UI:** `http://<host>:8101/graphql/ui`
**Database:** MongoDB

Manages license usage sessions and license removal.

### Queries

| Operation | Return type | Auth policy | Pagination |
|-----------|------------|-------------|------------|
| `getSessions` | `[SessionEntity]` | SlmAccessPolicy | Offset (max 250) |

### SessionEntity type

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | MongoDB ObjectId |
| `sessionId` | Int | Session ID |
| `hostName` | String | Client workstation |
| `serverData` | Server | License server information. See [Shared types](#server-type). |
| `licenseData` | License | License information. See [Shared types](#license-type). |
| `userData` | User | User details. See [Shared types](#user-type). |
| `handle` | Int | Session handle |
| `numLicenses` | Int | License count |
| `startTime` | DateTime | Session start (UTC) |
| `endTime` | DateTime | Session end (UTC), null if active |
| `isBorrowed` | Boolean | Borrowed license flag |
| `lingerTime` | Int | Linger time in seconds |
| `source` | String | Data source |
| `projects` | [Project] | Associated projects. See [Shared types](#project-type). |
| `agentData` | AgentData | Agent-specific data. See [Shared types](#agentdata-type). |

### Mutations

| Operation | Arguments | Return type | Auth policy |
|-----------|-----------|------------|-------------|
| `removeLicense` | `sessionId: Int!` | `Boolean` | AdminAccessPolicy |

### Example query

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

### Example mutation

```graphql
mutation {
  removeLicense(sessionId: 12345)
}
```

---

## License Access Control (LAC)

**Endpoint:** `http://<host>/graphql`
**Database:** MongoDB

Manages license access control assets, rules, and file deployment.

### Queries

| Operation | Return type | Pagination |
|-----------|------------|------------|
| `getLACAssetsPending` | `[LACAssetPending]` | Cursor (max 100) |
| `getLACAssetsReadManageOverview` | `[LACReadManageOverview]` | Cursor (max 100) |
| `getLACAssetContent(assetId, assetType)` | `String` | - |
| `getLACAssetRules` | `[LACAssetRule]` | Cursor (max 100) |
| `getLACAssetsPendingHostsFilterValues(searchTerm)` | `[String]` | Offset (max 100) |
| `getLACAssetsPendingVendorsFilterValues(searchTerm)` | `[String]` | Offset (max 100) |
| `getAssetsLMTypesFilterValues` | `[LicenseServerType]` | - |

**LACAssetType enum:** `ReadOnly`, `Managed`, `Pending`

**LicenseServerType enum:** `FLEXlm`, Reprise License Manager (`RLM`)

### LACAssetRule type

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | MongoDB ObjectId |
| `lacAssetId` | String | Parent asset ID |
| `licenseServerName` | String | Server name |
| `vendor` | String | Vendor name |
| `lmType` | LicenseServerType | FLEXlm or RLM |
| `ruleCategory` | RuleCategory | GlobalOptions, Permissions, Reservations, or other |
| `ruleType` | RuleType | RESERVE, INCLUDE, EXCLUDE, MAXIMUM, TIMEOUT, or other |
| `ruleValue` | String | Rule value |
| `featureInformation` | FeatureInformation | Feature details |
| `entityType` | EntityType | User, Host, IP, or other |
| `entitiesNames` | [String] | Entity names the rule applies to |

### Mutations

| Operation | Arguments | Return type |
|-----------|-----------|------------|
| `approveAssetPending` | `info: ApproveAssetPendingInfo!` | `Boolean` |
| `deployAssetManage` | `assetManageId: String!` | `Boolean` |
| `addRule` | `assetManageId: String!, rule: LACRule!` | `Boolean` |
| `updateRule` | `ruleId: String!, updatedRule: LACRule!` | `Boolean` |
| `deleteRules` | `rulesIds: [String]!` | `Boolean` |

### Example query

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

### Example mutation

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

**Endpoint:** `http://<host>/graphql`
**Database:** MongoDB

Manages license files, drafts, and deployment to license servers.

### Queries

| Operation | Return type | Auth policy | Pagination |
|-----------|------------|-------------|------------|
| `getLicenseFiles` | `[LicenseFileEntity]` | ViewerAccessPolicy | Cursor |
| `getUniqueServerNames` | `[String]` | ViewerAccessPolicy | Offset |
| `getUniqueDraftStatusesAsync` | `[String]` | ViewerAccessPolicy | - |
| `getUniqueOutputFormatsAsync` | `[String]` | ViewerAccessPolicy | - |

### LicenseFileEntity type

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | MongoDB ObjectId |
| `accountId` | String | Tenant or account ID |
| `licenseText` | String | Full license file content |
| `crc` | Long | Cyclic redundancy check (CRC) checksum |
| `receiveDate` | DateTime | Receive date |
| `obsoleteDate` | DateTime | Obsolete date |
| `filePath` | String | File path or location |
| `draft` | LicenseFileDraft | Current draft |
| `serverData` | LicenseServer | Server information |
| `isBrokerActive` | Boolean | Broker status |

### LicenseFileDraft type

| Field | Type | Description |
|-------|------|-------------|
| `licenseText` | String | Draft license content |
| `createDate` | DateTime | Draft creation timestamp |
| `recentlySavedDate` | DateTime | Last save timestamp |
| `pushDate` | DateTime | When pushed to broker |
| `checkSum` | String | MD5 hash of content |
| `status` | DraftStatus | Active or Submitted |
| `note` | String | Deployment note |
| `commandId` | String | Broker command ID |
| `commandStatus` | String | Broker run status |
| `errorResultMessage` | String | Error details if failed |

### Mutations

**Draft operations:**

| Operation | Arguments | Return type | Auth policy |
|-----------|-----------|------------|-------------|
| `createDraftAsync` | `licenseFileId: String!, draftText: String!` | `Boolean` | AdminAccessPolicy |
| `updateDraftAsync` | `licenseFileId: String!, draftText: String!` | `Boolean` | AdminAccessPolicy |
| `deleteDraftAsync` | `licenseFileId: String!` | `Boolean` | AdminAccessPolicy |
| `pushDraftAsync` | `licenseFileId: String!, note: String!` | `String` (commandId) | AdminAccessPolicy |

**Server attachment operations:**

| Operation | Arguments | Return type | Auth policy |
|-----------|-----------|------------|-------------|
| `attachLicenseServer` | `licenseFileId: String!, licenseServerId: Int!, serverName: String!` | `Boolean` | AdminAccessPolicy |
| `detachLicenseServer` | `licenseFileId: String!` | `Boolean` | AdminAccessPolicy |

### Example query

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

**Endpoint:** `http://<host>:8001/graphql`
**UI:** `http://<host>:8001/graphql/ui`
**Database:** MongoDB

Manages products, account products, and product activation.

### Queries

| Operation | Return type | Auth policy |
|-----------|------------|-------------|
| `getProducts` | `[ProductEntity]` | Default |
| `getAccountProducts` | `AccountProductsEntity` | Default |
| `getNavigations` | `[NavigationUIResponse]` | Default |
| `getProductsWithAccounts` | `[ProductDto]` | CloudAccessPolicy |
| `getProductAccounts(productType, activationStatus)` | `[AccountProductDto]` | SysAdminAccessPolicy |
| `getProductsInfo` | `[ProductInfoDto]` | SysAdminAccessPolicy |

### ProductType enum (partial list)

`SLM`, `Audit`, `Compliance`, `Alerts`, `Projects`, `Reporting`, `LAC`, `UGS`, `Identity`, `AgentsHub`, `VLM`, `CloudBroker`, `LicenseManager`, `LFM`, `Products`, `Homepage`

### ProductActivationStatus enum

`Active`, `Fail`, `PendingActivation`, `PendingDeactivation`, `Deactivated`

### Mutations

| Operation | Arguments | Return type | Auth policy |
|-----------|-----------|------------|-------------|
| `changeProductEnabledState` | `productType: ProductType!, enabled: Boolean!` | `Boolean` | AdminAccessPolicy |
| `activateAccountProductAsync` | `productType: String!, activate: Boolean!` | `Boolean` | AdminAccessPolicy |
| `updateProductDefaultRoleAsync` | `productType: String!, roleName: String!` | `Boolean` | AdminAccessPolicy |

### Example query

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

**Endpoint:** `http://<host>:7084/graphql`
**Database:** MongoDB

Read-only GraphQL API for querying users, groups, workstations, and email aliases. All write operations use the REST API.

### Queries

| Operation | Arguments | Return type | Auth policy | Pagination |
|-----------|-----------|------------|-------------|------------|
| `users` | `tenantId: String!` | `[User]` | IntegrationProjectsViewerAccessPolicy | Offset (1M max) |
| `usersCursor` | `tenantId: String!` | `[User]` | IntegrationAccessPolicy | Cursor (1M max) |
| `groupUsers` | `tenantId: String!, groupId: String!` | `[User]` | ViewerAccessPolicy | Offset |
| `groups` | `tenantId: String!, returnRoot: Boolean` | `[Group]` | ViewerAccessPolicy | Offset |
| `groupsCursor` | `tenantId: String!, returnRoot: Boolean` | `[Group]` | IntegrationAccessPolicy | Cursor |
| `childGroups` | `tenantId: String!, groupId: String!` | `[Group]` | IntegrationProjectsViewerAccessPolicy | Offset |
| `workstations` | `tenantId: String!` | `[Computer]` | ViewerAccessPolicy | Offset |
| `workstationsCursor` | `tenantId: String!` | `[Computer]` | IntegrationAccessPolicy | Cursor |
| `groupWorkstations` | `tenantId: String!, groupId: String!` | `[Computer]` | ViewerAccessPolicy | Offset |
| `getEmailAliases` | `tenantId: String!, showAttachedAliases: Boolean!` | `[EmailAlias]` | ViewerAccessPolicy | Offset |

### User type (UGS)

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID | MongoDB ObjectId |
| `username` | String | Username |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `displayName` | String | Display name |
| `email` | String | Email address |
| `department` | String | Department |
| `country` | String | Country |
| `phone` | String | Phone number |
| `isEnabled` | Boolean | Activated status |
| `creationSource` | EntityCreationSource | User creation method |
| `defaultGroupName` | String | Default group |
| `parentGroups` | [ParentExtendedReference] | Parent group memberships |

### Group type

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID | MongoDB ObjectId |
| `groupName` | String | Group name |
| `isEnabled` | Boolean | Activated status |
| `isUserGroup` | Boolean | Contains users |
| `isComputerGroup` | Boolean | Contains computers |
| `userMembersCount` | Long | Approximate user count |
| `childGroupsCount` | Long | Child group count |
| `parentGroups` | [ParentExtendedReference] | Parent groups |

### Example query

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

**Endpoint:** `http://<host>:8000/graphql`
**Database:** MongoDB

Manages identity provider account configurations for Okta, Auth0, Azure AD, and Ping Identity.

### Queries

| Operation | Return type | Auth policy |
|-----------|------------|-------------|
| `getAccount` | `AccountDto` | ViewerAccessPolicy |

### Mutations

| Operation | Arguments | Return type | Auth policy |
|-----------|-----------|------------|-------------|
| `saveAccount` | `dto: AccountDto!` | `Boolean` | AdminAccessPolicy |
| `updateAccount` | `dto: AccountDto!` | `Boolean` | AdminAccessPolicy |
| `deleteAccount` | - (uses tenant context) | `Boolean` | AdminAccessPolicy |

### IdentityServiceDto type

| Field | Type | Description |
|-------|------|-------------|
| `type` | IdentityType | `Okta`, `Auth0`, `Azure`, or `PingIdentity` |
| `url` | String | Service URL |
| `clientId` | String | Client ID |
| `clientSecret` | String | Client secret |
| `apiKey` | String | API key |
| `tenantId` | String | Tenant ID |
| `environmentId` | String | Environment ID |
| `enabled` | Boolean | Service activated status |

### Required fields by provider

| Provider | url | clientId | clientSecret | apiKey | tenantId | environmentId |
|----------|-----|----------|-------------|--------|----------|---------------|
| Okta | Yes | Yes | Yes | Yes | - | - |
| Auth0 | Yes | Yes | Yes | - | - | - |
| Azure AD | - | Yes | Yes | - | Yes | - |
| Ping Identity | Yes | Yes | Yes | - | - | Yes |

### Example query

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

### Example mutation

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
