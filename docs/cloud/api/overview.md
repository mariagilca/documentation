---
title: "GraphQL API overview"
sidebar_position: 1
draft: true
description: "OpenLM exposes GraphQL APIs across its microservices, giving you structured, programmatic access to your license analytics data."
---
# GraphQL API overview

OpenLM exposes GraphQL APIs across its microservices, giving you structured, programmatic access to your license analytics data. Each service provides a `/graphql` endpoint and an interactive GraphQL IDE at `/graphql/ui`.

Use the GraphQL API to:

- Query license usage, denials, compliance, and procurement data
- Retrieve user, group, and workstation information
- Manage license access control rules and license file deployments
- Automate reporting and integrate with external tools

## Authentication

All OpenLM services use OAuth 2.0 with Proof Key for Code Exchange (PKCE) through OpenLM Identity Server. When `AuthSetup.AuthSettings.EnableSecurity` is `true`, include a valid JSON Web Token (JWT) Bearer token in the `Authorization` header of every request.

```
Authorization: Bearer <your-access-token>
```

When security is off (development mode only), endpoints allow anonymous access.

### Authorization policies

Services enforce role-based access through these policies:

| Policy | Access level |
|--------|-------------|
| AdminAccessPolicy | Full create, read, update, and delete access |
| ViewerAccessPolicy | Read-only access |
| SysAdminPolicy | System administrator operations (cloud) |
| CloudAccessPolicy | Cloud-level operations |

## Request flow

When you send a query, the API processes it through these steps:

1. **Send a query** - Your application sends a GraphQL request to the service endpoint with the desired fields, filters, sorting, and pagination parameters.
2. **API authenticates and resolves tenant** - The API verifies the caller identity and determines which customer database to connect to.
3. **Query runs** - The API translates the GraphQL request into an optimized database query specific to the configured back end.
4. **Results return** - The response returns as structured JSON with pagination metadata.

```
Your application -> GraphQL query -> OpenLM service -> Database -> Structured JSON response
```

## Common query patterns

### Pagination

OpenLM services support 2 pagination styles:

- **Offset-based**: Uses `skip` and `take` arguments. Use this for straightforward page navigation.
- **Cursor-based**: Uses `first`, `after`, `before`, and `last` arguments following the Relay specification. Use this for large datasets where consistent pagination matters.

All paginated queries support `totalCount`.

**Offset-based example:**

```graphql
query {
  users(tenantId: "my-tenant", skip: 0, take: 25) {
    items {
      username
      email
    }
    totalCount
  }
}
```

**Cursor-based example:**

```graphql
query {
  denials(first: 10, after: "cursor-value") {
    nodes {
      denialId
      vendor
    }
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Filtering

Use the `where` argument with field-specific operators to narrow results. Common operators include `eq`, `neq`, `contains`, `in`, `gt`, `lt`, and more.

```graphql
query {
  users(tenantId: "my-tenant", where: { isEnabled: { eq: true } }) {
    items {
      username
      email
    }
  }
}
```

Certain services also support a custom `icontains` operator for case-insensitive substring search.

### Sorting

Use the `order` argument with field names and `ASC` or `DESC` directions.

```graphql
query {
  denials(first: 20, order: [{ denialId: DESC }]) {
    nodes {
      denialId
      vendor
    }
  }
}
```

## Multitenant data isolation

The API operates on a strict multitenant architecture. Each customer's data is completely isolated:

- Every customer's data resides in a separate, dedicated database.
- The API verifies customer identity on every request through the authenticated session.
- The API dynamically connects to the correct database based on the authenticated tenant, ensuring zero cross-tenant data access.

## Performance and caching

The API includes the following performance optimizations:

- **Built-in caching** - The cache serves repeated queries with a configurable time-to-live (TTL), reducing response times for frequently accessed data.
- **Pagination** - All list queries paginate by default, ensuring efficient data transfer and preventing unnecessarily large responses.
- **Connection pooling** - A connection pool manages database connections, optimizing resource utilization and query throughput.
- **Cache invalidation** - You can clear the cache on demand when you need fresh data, ensuring the latest results return.

For optimal performance, use filters to narrow down your queries and request only the page sizes you need. Smaller, focused queries return faster and consume fewer resources.

## Supported database back ends

The Reporting API works with multiple database back ends:

| Database | Use case |
|----------|----------|
| SQL Server | On-premises and hybrid deployments |
| PostgreSQL | On-premises and cloud deployments |
| AWS Athena | Cloud deployments with S3-based data lakes |

The API automatically adapts its query generation to the configured database back end, ensuring consistent results regardless of the underlying infrastructure. You do not need to make changes when switching between database back ends.

## Security highlights

| Feature | Description |
|---------|-------------|
| Authentication | OAuth 2.0 + PKCE through OpenLM Identity Server |

| Data isolation | Dedicated database per customer, dynamically resolved per request |
| Transport security | HTTPS encrypts all communication |
| Access control | JWT-based token validation on every API request |
| Read-only access | The Reporting API provides read-only access to reporting data. You cannot modify source data. |
