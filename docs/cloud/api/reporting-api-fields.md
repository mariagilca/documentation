---
title: "Reporting Data API field reference"
sidebar_position: 3
description: "Field reference for every OpenLM Reporting Data API GraphQL query: report node fields, widget fields, and filter-value types."
---

This page lists the fields each OpenLM Reporting Data API query returns. For the queries themselves and their parameters, see [Query the Reporting Data API](./reporting-api-queries).

## Main report query fields

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

## Count queries (no fields)

`licenseUsageActiveLicenseCount`, `licenseUsageHostRunningCount`, `licenseDenialsDenialCountInLast24Hours`, and `licenseDenialsNewAlertsCountIn24Hours` each return a single Int. Request the query name.

```graphql
{ licenseUsageActiveLicenseCount }
```

## Filter-value query value types

These have no field names to select. `items` returns the raw values directly. The type of each value:

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

## Widget query fields (Cloud only)

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

## Related pages

- [Query the Reporting Data API](./reporting-api-queries): endpoints, parameters, and the query catalog.
- [Authenticate to the Reporting Data API](./reporting-api): get a Bearer token first.
