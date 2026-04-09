---
sidebar_position: 2
draft: true
---

# Reporting API

OpenLM Reporting API is a GraphQL-based data access layer that provides real-time, structured access to your organization's license analytics data. Use a single, flexible GraphQL endpoint that supports filtering, sorting, pagination, and aggregation across all data modules.

## Available data modules

The API provides access to multiple data modules, each covering a specific area of license management. A data module represents a distinct category of license-related information that you can independently query, filter, and analyze. OpenLM can add modules based on your reporting requirements.

| # | Module | What it covers |
|---|--------|---------------|
| 1 | License Usage | Tracks who used which license, when, and for how long. Filter by user, feature, time range, or duration. |
| 2 | Denials | Records license request denials. Filter by user, feature, time range, or denial type. |
| 3 | Server Status | Shows the current and historical status of license servers. Filter by server name or status. |
| 4 | Concurrent Measures | Captures license concurrency data: how many licenses were in use compared to available at a given time. Filter by feature, used or free license ranges. |
| 5 | Allocations | Tracks license allocation transactions. Filter by active or inactive status and time range. Summary: active compared to inactive allocation counts. |
| 6 | Procurement | Manages license procurement records, including expiration tracking. Filter by expired or active status and expiry windows. Summary: expired, expiring within 30 days, and active counts. |
| 7 | Touchpoints | Logs user interaction touchpoints. Filter by event type, source, or website. Summary: unique users, workstations, and sources. |
| 8 | Processes | Records application processes using licenses. Filter by shutdown reason or agent status. Summary: shutdown reason and agent status breakdowns. |
| 9 | Dongle Monitoring | Monitors hardware dongles. Filter by connection status or denylist flag. Summary: connected, disconnected, and denylisted counts. |
| 10 | Not Used Licenses | Identifies licenses that are available but not currently in use. Filter by feature, server, or available license count. |

## Query capabilities

Each data module supports different types of queries, giving you comprehensive access to your license data.

### Listing and filtering

Retrieve paginated lists of records with optional filtering and sorting.

- **Filtering**: Each module supports 10 to 50+ filter fields including date ranges, text matching, numeric ranges, and Boolean flags.
- **Sorting**: Sort results by any available field in ascending or descending order.
- **Pagination**: All list queries return paginated results with metadata including total count, total pages, current page, and navigation flags.

### Record look up

Retrieve a single record by its unique identifier for detailed inspection.

### Aggregation and analytics

Use `GROUP BY` aggregations to analyze your data across dimensions. Supported aggregation types:

| Aggregation | Description |
|-------------|-------------|
| `COUNT` | Count the number of records in each group |
| `SUM` | Sum a numeric field across each group |
| `AVG` | Calculate the average of a numeric field per group |
| `MIN` | Find the minimum value in each group |
| `MAX` | Find the maximum value in each group |
| `COUNT_DISTINCT` | Count unique values in each group |

You can group by any field and combine aggregations with filters for targeted analytics.

### Summaries and group summaries

- **Summary**: Pre-built statistics specific to each module, for example, total active allocations, expired procurement counts, or connected dongle counts.
- **Group summary**: The same summary statistics broken down by a grouping field of your choice, for example, summary per feature, per user, or per server.

## Query examples

The following examples show the types of data retrieval possible across different modules.

### Top users by license usage

Find the 50 users with the highest total usage duration for AutoCAD.

```graphql
query {
  licenseUsageAggregates(
    groupBy: "user_name"
    aggregateType: SUM
    aggregateField: "duration"
    filter: { featureName: "AutoCAD" }
    pageSize: 50
    orderBy: "value"
    orderDesc: true
  ) {
    items {
      groupValue
      value
    }
    pageInfo {
      totalCount
    }
  }
}
```

### License denials by feature

Count how many denials occurred per feature in the last 30 days.

```graphql
query {
  denialsAggregates(
    groupBy: "feature_name"
    aggregateType: COUNT
    aggregateField: "id"
    filter: {
      timestampFrom: "2026-03-08"
      timestampTo: "2026-04-08"
    }
    orderBy: "value"
    orderDesc: true
  ) {
    items {
      groupValue
      value
    }
  }
}
```

### Procurement summary

Get a quick overview of your license procurement status.

```graphql
query {
  licenseProcurementSummary {
    totalProcurements
    expiredCount
    expiringWithin30Days
    activeCount
  }
}
```

### Filtered license usage list

Get a paginated list of MATLAB usage records for a specific user.

```graphql
query {
  licenseUsage(
    filter: {
      userName: "john.smith"
      featureName: "MATLAB"
    }
    page: 1
    pageSize: 25
    orderBy: "timestamp"
    orderDesc: true
  ) {
    items {
      userName
      featureName
      timestamp
      duration
    }
    pageInfo {
      totalCount
      totalPages
      currentPage
      hasNextPage
    }
  }
}
```
