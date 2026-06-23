---
title: "ReportingDataAPI"
sidebar_position: 2
description: "Authenticate with OpenLM Identity Server, then read license data from the ReportingDataAPI GraphQL endpoint. Includes the full query and field reference."
---

This guide is for external and client-side integrators who need access to OpenLM Reporting. The ReportingDataAPI uses OAuth 2.0 for authentication.

## Overview

To read data from the ReportingDataAPI, you authenticate with the OpenLM Identity Server, receive a short-lived JWT access token, and send that token as a `Bearer` credential on every API request.

The flow has three steps:

```text
1. Client ID + Client Secret  ──▶  2. POST /connect/token  ──▶  3. Call the API
   (issued to your service)         (Identity Server)
```

This is a server-to-server flow. There is no user login or browser redirect — your application authenticates as itself.

## Prerequisites

To authenticate and call the API, you need the following:

| You need | Value or where it comes from |
| :---- | :---- |
| Client ID | A per-customer client issued to you. |
| Client Secret | Issued to you with the client — keep it secret, never commit it. |
| Identity Server base URL `{BASE_URL}` | `https://cloud-us.openlm.com/identity` (prod-us) or `https://cloud-eu.openlm.com/identity` (prod-eu). |
| Scope | `openlm.reporting-data-api-service.scope` |
| ReportingDataAPI base URL | `{BASE_URL}/api/reporting-data-api/graphql` |

:::note
This client supports the `client_credentials` grant. The issued access token is a JWT and is valid for 3,600 seconds (1 hour). The customer this client belongs to is encoded in the Client ID (the trailing GUID) and surfaced as the `customer_name` claim in the token.
:::

## Step 1 — Generate your client credentials

Your integration is identified by a Client ID and authenticated by a Client Secret. You generate these yourself from the OpenLM Identity page after logging in. A separate client is provisioned for each customer, so the generated Client ID includes your customer ID.

### Log in to the Identity page

Open the OpenLM Identity page in your browser after signing in with your OpenLM account:

- Prod-us: `https://cloud-us.openlm.com/identity`
- Prod-eu: `https://cloud-eu.openlm.com/identity`

{/* TODO: add screenshot — OpenLM Identity page sign-in screen */}

### Generate a new client

From the Identity page, navigate to the client or API-access section and create a new client for the ReportingDataAPI.

{/* TODO: add screenshot — client / API-access section */}
{/* TODO: add screenshot — new client for the ReportingDataAPI */}

### Copy the Client ID and Client Secret

Once the client is generated, copy both values immediately or download the JSON:

- Client ID.
- Client Secret — shown only at creation time, so store it now.

:::warning
The Client Secret is shown only once at generation time. If you lose it, generate a new client. Store the secret in a secret manager or environment variable — never hardcode it in source or commit it to a repo.
:::

```bash
export OPENLM_CLIENT_ID="<your-client-id>"
export OPENLM_CLIENT_SECRET="<your-client-secret>"
export OPENLM_IDENTITY_URL="https://<your-base-url>/identity"
```

## Step 2 — Find the token endpoint (discovery)

The Identity Server publishes an OpenID Connect discovery document. You can confirm the exact token endpoint at:

```text
GET {OPENLM_IDENTITY_URL}/.well-known/openid-configuration
```

The relevant field is `token_endpoint`, which resolves to:

```text
{OPENLM_IDENTITY_URL}/connect/token
```

You only need to do discovery once — the token endpoint path (`/connect/token`) is stable.

## Step 3 — Request an access token

Send a `POST` to the token endpoint with `grant_type=client_credentials`.

### Request (curl)

```bash
curl -X POST "$OPENLM_IDENTITY_URL/connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=$OPENLM_CLIENT_ID" \
  -d "client_secret=$OPENLM_CLIENT_SECRET" \
  -d "scope=openlm.reporting-data-api-service.scope"
```

### Response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "openlm.reporting-data-api-service.scope"
}
```

Extract `access_token`. It is a JWT — you can decode it (for example, at jwt.io) to inspect claims such as `customer_name`, `name`, `email`, and `role`.

## Step 4 — Call the ReportingDataAPI with the token

Send the token as an `Authorization: Bearer` header on every request. For the full list of supported schemas, see the [Endpoints and GraphQL queries](#endpoints-and-graphql-queries) section later on this page.

### REST example

```bash
curl -X GET "{REPORTING_DATA_API_BASE_URL}/<endpoint>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Accept: application/json"
```

### GraphQL example

```bash
curl -X POST "{REPORTING_DATA_API_BASE_URL}/graphql" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "query": "{ licenseUsage(first: 25) { totalCount pageInfo { hasNextPage endCursor } nodes { user_name feature_name vendor start_time_utc } } }" }'
```

## Token lifetime and refresh

- Access tokens are valid for 3,600 seconds (1 hour) (`expires_in: 3600`).
- The client-credentials flow does not issue refresh tokens — when a token nears expiry, request a new one by repeating Step 3.
- Best practice: cache the token in memory, track its `expires_in` value, and re-request it a few seconds before it expires rather than on every API call.

## Troubleshooting

| Symptom | Likely cause | Fix |
| :---- | :---- | :---- |
| `400 invalid_client` | Wrong Client ID or Secret, or the secret is for a different environment. | Verify credentials match the environment's Identity Server. |
| `400 invalid_scope` | Scope misspelled. | Use exactly `openlm.reporting-data-api-service.scope`. |
| `401 Unauthorized` from the API | Missing or expired token, or wrong audience. | Re-request the token and ensure the `Authorization: Bearer <token>` header is present. |
| `403 Forbidden` | Token valid but lacks rights for that tenant or resource. | Check the `customer_name` claim or the `X-Customer-Name` header. |
| Token works then fails after about 1 hour. | Token expired. | Request a fresh token (Step 3). |

## Reference — Identity configuration (authoritative values)

| Setting | Value |
| :---- | :---- |
| Client ID | `openlm.reporting-data-api-service.client` |
| Allowed grant types | `client_credentials`, `multi_customers` |
| Requires client secret | Yes |
| Scope | `openlm.reporting-data-api-service.scope` |
| API resource | `openlm.reporting-data-api-service.api` |
| Access token type | JWT |
| Access token lifetime | 3,600 s (1 hour) |
| Token claims | `name`, `email`, `customer_name`, `role` |
| Token endpoint | `{identity-url}/connect/token` |
| Discovery | `{identity-url}/.well-known/openid-configuration` |

## Endpoints and GraphQL queries

Authentication (getting a token) is covered earlier on this page, in the [Overview](#overview). All requests require a valid `Authorization: Bearer <token>` header.

The ReportingDataAPI is a GraphQL API — all data is read through a single endpoint.

| Endpoint | Method | Purpose |
| :---- | :---- | :---- |
| `{API_BASE_URL}/graphql` | `POST` | All data queries (and the in-browser GraphQL explorer on `GET`). |
| `{API_BASE_URL}/health` | `GET` | Health check. |

**Field naming:** the schema is camelCase (`licenseUsage`, `pageInfo`, `totalCount`, `orderBy`…). The `groupBy` and `orderBy` argument values are raw column names in snake_case (for example, `"feature_name"`).

The following table is a quick primer on the parameter types your developers use across these queries:

| Parameter | Type | What it does |
| :---- | :---- | :---- |
| `first` | Int | (Cursor paging) How many records to fetch from the start, for example `first: 25`. |
| `after` | String | (Cursor paging) A cursor string from a previous response — fetches the next page after it. |
| `last` / `before` | Int / String | (Cursor paging) Same idea but paging backwards from the end. |
| `skip` | Int | (Offset paging) How many records to skip before reading. |
| `take` | Int | (Offset paging) How many records to read after skipping. |
| `searchTerm` | String | (Filter lists) Optional text to narrow the dropdown values. Leave empty to get all distinct values. |
| `limit` | Int | (Widgets only) How many rows the widget returns — see notes per query. |
| `where` | (filter object) | Optional filter on any field of the result (auto-generated by the server). |
| `order` | (sort object) | Optional sort on any field of the result (auto-generated by the server). |

:::note
The available queries depend on the deployment mode. Queries marked (On-prem only) exist only in the self-hosted version. Queries marked (Cloud only) exist only in the cloud version. Everything else is in both.
:::

### Main report queries

These return paged data. Use cursor-paging parameters: `first`, `after`, `last`, `before`. They also accept `where` (filter) and `order` (sort) on any field.

| Query | Parameters | Notes |
| :---- | :---- | :---- |
| `licenseUsage` | `first`, `after`, `last`, `before`, `where`, `order` | License usage records. |
| `licenseDenials` | `first`, `after`, `last`, `before`, `where`, `order` | License denial records. |
| `sessionDetails` | `first`, `after`, `last`, `before`, `where`, `order` | Application/session records. |
| `projectData` | `first`, `after`, `last`, `before`, `where`, `order` | Project records. |
| `devices` (On-prem only) | `first`, `after`, `last`, `before`, `where`, `order` | Tenant-scoped device records. |

**How to use:** Start with, for example, `licenseUsage(first: 25)`. The response includes `pageInfo.hasNextPage` and an `endCursor`; pass that cursor as `after` to get the next page: `licenseUsage(first: 25, after: "<endCursor>")`. `totalCount` gives the full record count.

### Count queries

These return a single number and take no parameters.

| Query | Returns | Meaning |
| :---- | :---- | :---- |
| `licenseUsageActiveLicenseCount` | Int | Count of currently active licenses. |
| `licenseUsageHostRunningCount` | Int | Count of hosts currently running. |
| `licenseDenialsDenialCountInLast24Hours` | Int | Denials in the last 24 hours. |
| `licenseDenialsNewAlertsCountIn24Hours` | Int | Distinct new denial alerts in the last 24 hours. |

**How to use:** Just call them, for example `{ licenseUsageActiveLicenseCount }`.

### Filter-value lookup queries

These return a paged list of distinct, sorted values for one field, for building filter dropdowns. They all take an optional `searchTerm` plus offset-paging parameters `skip` and `take`.

Parameters for all of them: `searchTerm` (String, optional), `skip` (Int), `take` (Int).

**License Usage:** `licenseUsageLicenseTypeFilterValues`, `licenseUsageVersionFilterValues`, `licenseUsageUserNameFilterValues`, `licenseUsageWorkstationFilterValues`, `licenseUsageVendorFilterValues`, `licenseUsageFeaturePackageFilterValues`, `licenseUsageFeatureProductFilterValues`, `licenseUsageFeaturePackageItemFilterValues`, `licenseUsageIsTokenBasedFilterValues`

**License Denials:** `licenseDenialsUserNameFilterValues`, `licenseDenialsWorkstationFilterValues`, `licenseDenialsMinorErrorFilterValues`, `licenseDenialsMajorErrorFilterValues`, `licenseDenialsErrorTextFilterValues`, `licenseDenialsFeatureNameFilterValues`, `licenseDenialsStatusFilterValues`, `licenseDenialsGroupIdFilterValues`, `licenseDenialsGroupNameFilterValues`, `licenseDenialsCategoryFilterValues`, `licenseDenialsVendorFilterValues`, `licenseDenialsFeatureVersionFilterValues`, `licenseDenialsLicenseTypeFilterValues`, `licenseDenialsAdditionalKeyFilterValues`, `licenseDenialsHostnameFilterValues`, `licenseDenialsLicenseServerFilterValues`

**Session Details:** `sessionDetailsUserFilterValues`, `sessionDetailsWorkstationFilterValues`, `sessionDetailsIdleTimeFilterValues`, `sessionDetailsSessionEndTimeHolidaysFilterValues`, `sessionDetailsSessionEndTimeWeekdaysFilterValues`, `sessionDetailsSessionFilterValues`, `sessionDetailsProcessFilterValues`, `sessionDetailsDependencyFilterValues`, `sessionDetailsCustomerFilterValues`, `sessionDetailsReasonFilterValues`, `sessionDetailsAgentStatusFilterValues`, `sessionDetailsVersionFilterValues`

:::note
For Session Details, the `searchTerm` type varies: `sessionDetailsIdleTimeFilterValues` and `sessionDetailsSessionFilterValues` take a Float `searchTerm`. `sessionDetailsAgentStatusFilterValues` takes an Int `searchTerm`. The two `SessionEndTime` queries take a DateTime `searchTerm`. The rest take a String `searchTerm`.
:::

**Touchpoint Details:** `touchpointDetailsUsernameFilterValues` (String), `touchpointDetailsWorkstationFilterValues` (String), `touchpointDetailsEventDateTimeFilterValues` (DateTime `searchTerm`)

**Dongle Monitoring:** `dongleMonitoringDeviceNameFilterValues`, `dongleMonitoringDeviceDescriptionFilterValues`, `dongleMonitoringManufacturerFilterValues`, `dongleMonitoringUserNameFilterValues`, `dongleMonitoringHostNameFilterValues`, and `dongleMonitoringBlacklistedFilterValues` take a String `searchTerm`. `dongleMonitoringAgentStatusFilterValues` takes an Int `searchTerm`.

**Project Data:** `projectDataProjectNameFilterValues`, `projectDataUserNameFilterValues`, `projectDataPriorityFilterValues`, `projectDataSourceFilterValues` (all String `searchTerm`)

**Device filters (On-prem only):** `deviceNameFilterValues`, `deviceManufacturersFilterValues`, `deviceHostNameFilterValues`, `deviceUserNameFilterValues`

:::note
These take `searchTerm` (String) plus `skip` and `take`. Additionally, `deviceHostNameFilterValues` and `deviceUserNameFilterValues` accept an optional `deviceId` (String) to restrict results to a single device.
:::

**How to use:** `licenseUsageVendorFilterValues(searchTerm: "auto", take: 20)` returns up to 20 distinct vendors containing "auto". Omit `searchTerm` to list all values.

### Dashboard widget queries

These return a simple list (not paged). The key parameter is `limit`.

The `limit` parameter explained:

- Top-N widgets: `limit` is clamped to 5 or 10 only. Any other value (or omitting it) defaults to 10. So `limit: 5` → 5 rows; anything else → 10 rows.
- Full-list widgets (`activeUsersReport`, `licenseServerStatus`, `hostAvailability`): `limit` accepts 1–100; out-of-range or omitted defaults to 100 (a safety cap).

| Query | Parameter | Notes (what it returns / ordering) |
| :---- | :---- | :---- |
| `topDeniedFeatures` | `limit: Int` (5/10) | Most-denied features, highest first. |
| `topDeniedUsers` | `limit: Int` (5/10) | Users with the most denials, highest first. |
| `topMostUsedFeatures` | `limit: Int` (5/10) | Most-used features, highest usage first. |
| `topLeastUsedFeatures` | `limit: Int` (5/10) | Least-used features, lowest usage first. |
| `topLongestSessions` | `limit: Int` (5/10) | Longest sessions, longest first. |
| `topIdleSessions` | `limit: Int` (5/10) | Most idle sessions, highest idle time first. |
| `topProductNames` | `limit: Int` (5/10) | Top products by usage. |
| `topVendorNames` | `limit: Int` (5/10) | Top vendors by usage. |
| `topMostActiveUsers` | `limit: Int` (5/10) | Most-active users (only users with ≥1 session). |
| `topLeastActiveUsers` | `limit: Int` (5/10) | Least-active users (only users with ≥1 session). |
| `activeUsersReport` | `limit: Int` (1–100, default 100) | Currently active sessions. |
| `licenseServerStatus` | `limit: Int` (1–100, default 100) | License server status list. |
| `hostAvailability` | `limit: Int` (1–100, default 100) | Host availability list. |

**How to use:** `topDeniedFeatures(limit: 5)` returns the top 5; `activeUsersReport(limit: 50)` returns up to 50 active sessions.

## Fields list for queries

### Main report queries — fields

Select these inside `nodes { }`.

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

**devices (On-prem only)**

`TenantId` (String), `UserId` (String), `DeviceIdentifier` (String), `DeviceName` (String), `DeviceDescription` (String), `Manufacturer` (String), `DeviceConnectedDateTime` (DateTime), `LastUpdateDateTime` (DateTime), `DeviceDisconnectedDateTime` (DateTime), `UserName` (String), `HostName` (String), `BlacklistedWhenConnectedOrDisconnected` (Boolean), `SerialNumber` (String), `AgentStatus` (AgentStatus enum), `Vendor` (String)

**Example:**

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

### Count queries — no fields

`licenseUsageActiveLicenseCount`, `licenseUsageHostRunningCount`, `licenseDenialsDenialCountInLast24Hours`, and `licenseDenialsNewAlertsCountIn24Hours` each return a single Int. Just request the query name.

```graphql
{ licenseUsageActiveLicenseCount }
```

### Filter-value queries — value type per query

These have no field names to select — `items` returns the raw values directly. The type of each value:

- String values: all License Usage, License Denials, Project Data, Device, and Touchpoint username/workstation filters, plus Session Details user/workstation/process/dependency/customer/reason/version filters, and Dongle device-name/description/manufacturer/username/hostname/blacklisted filters.
- Float values: `sessionDetailsIdleTimeFilterValues`, `sessionDetailsSessionFilterValues`
- Int values: `sessionDetailsAgentStatusFilterValues`, `dongleMonitoringAgentStatusFilterValues`
- DateTime values: `sessionDetailsSessionEndTimeHolidaysFilterValues`, `sessionDetailsSessionEndTimeWeekdaysFilterValues`

**Example:**

```graphql
{
  licenseUsageVendorFilterValues(searchTerm: "", take: 20) {
    totalCount
    pageInfo { hasNextPage }
    items
  }
}
```

### Widget queries — fields (Cloud only)

Select fields directly.

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

**Example:**

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
