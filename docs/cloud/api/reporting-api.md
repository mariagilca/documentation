---
title: "Authenticate to the Reporting Data API"
sidebar_position: 1
description: "Generate client credentials, request a client-credentials JWT from OpenLM Identity Server, and authenticate to the OpenLM Reporting Data API."
---

This guide is for external and client-side integrators who need access to OpenLM Reporting. The Reporting Data API uses OAuth 2.0 for authentication.

## Overview

To read data from the Reporting Data API, you authenticate with the OpenLM Identity Server, receive a short-lived JWT access token, and send that token as a `Bearer` credential on every API request.

The flow has three steps:

```text
1. Client ID + Client Secret  ──▶  2. POST /connect/token  ──▶  3. Call the API
   (issued to your service)         (Identity Server)
```

This is a server-to-server flow. There is no user login or browser redirect. Your application authenticates as itself.

## Prerequisites

To authenticate and call the API, you need the following:

| You need | Value or where it comes from |
| :---- | :---- |
| Client ID | A per-customer client issued to you. |
| Client Secret | Issued to you with the client. Keep it secret and never commit it. |
| Identity Server base URL `{IDENTITY_URL}` | `https://cloud-us.openlm.com/identity` (prod-us) or `https://cloud-eu.openlm.com/identity` (prod-eu). |
| Scope | `openlm.reporting-data-api-service.scope` |
| Reporting Data API base URL `{API_BASE_URL}` | `{IDENTITY_URL}/api/reporting-data-api` |

:::note
This client supports the `client_credentials` grant. The issued access token is a JWT and is valid for 3,600 seconds (1 hour). The customer this client belongs to is encoded in the Client ID (the trailing GUID) and surfaced as the `customer_name` claim in the token.
:::

## Step 1: Generate your client credentials

Your integration is identified by a Client ID and authenticated by a Client Secret. You generate these yourself from the OpenLM Identity page after logging in. A separate client is provisioned for each customer, so the generated Client ID includes your customer ID.

### Log in to the Identity page

Open the OpenLM Identity page in your browser after signing in with your OpenLM account:

- Prod-us: `https://cloud-us.openlm.com/identity`
- Prod-eu: `https://cloud-eu.openlm.com/identity`

### Generate a new client

From the Identity page, navigate to the client or API-access section and create a new client for the Reporting Data API.

### Copy the Client ID and Client Secret

Once the client is generated, copy both values immediately or download the JSON:

- Client ID.
- Client Secret, shown only at creation time, so store it now.

:::warning
The Client Secret is shown only once at generation time. If you lose it, generate a new client. Store the secret in a secret manager or environment variable. Never hardcode it in source or commit it to a repo.
:::

```bash
export OPENLM_CLIENT_ID="<your-client-id>"
export OPENLM_CLIENT_SECRET="<your-client-secret>"
export OPENLM_IDENTITY_URL="https://<your-base-url>/identity"
```

## Step 2: Find the token endpoint (discovery)

The Identity Server publishes an OpenID Connect discovery document. You can confirm the exact token endpoint at:

```text
GET {IDENTITY_URL}/.well-known/openid-configuration
```

The relevant field is `token_endpoint`, which resolves to:

```text
{IDENTITY_URL}/connect/token
```

You only need to do discovery once. The token endpoint path (`/connect/token`) is stable.

## Step 3: Request an access token

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

Extract `access_token`. It is a JWT. You can decode it (for example, at jwt.io) to inspect claims such as `customer_name`, `name`, `email`, and `role`.

## Step 4: Call the Reporting Data API with the token

Send the token as an `Authorization: Bearer` header on every request. For the full list of supported queries, see [Query the Reporting Data API](./reporting-api-queries).

### Example request

```bash
curl -X POST "{API_BASE_URL}/graphql" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "query": "{ licenseUsage(first: 25) { totalCount pageInfo { hasNextPage endCursor } nodes { user_name feature_name vendor start_time_utc } } }" }'
```

## Token lifetime and refresh

- Access tokens are valid for 3,600 seconds (1 hour) (`expires_in: 3600`).
- The client-credentials flow does not issue refresh tokens. When a token nears expiry, request a new one by repeating Step 3.
- Best practice: cache the token in memory, track its `expires_in` value, and re-request it a few seconds before it expires rather than on every API call.

## Troubleshooting

| Symptom | Likely cause | Fix |
| :---- | :---- | :---- |
| `400 invalid_client` | Wrong Client ID or Secret, or the secret is for a different environment. | Verify credentials match the environment's Identity Server. |
| `400 invalid_scope` | Scope misspelled. | Use exactly `openlm.reporting-data-api-service.scope`. |
| `401 Unauthorized` from the API | Missing or expired token, or wrong audience. | Re-request the token and ensure the `Authorization: Bearer <token>` header is present. |
| `403 Forbidden` | Token valid but lacks rights for that tenant or resource. | Check the `customer_name` claim or the `X-Customer-Name` header. |
| Token works then fails after about 1 hour. | Token expired. | Request a fresh token (Step 3). |

## Identity configuration reference

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
| Token endpoint | `{IDENTITY_URL}/connect/token` |
| Discovery | `{IDENTITY_URL}/.well-known/openid-configuration` |

## Related pages

- [Query the Reporting Data API](./reporting-api-queries): endpoints and the full GraphQL query catalog.
- [Reporting Data API field reference](./reporting-api-fields): the fields each query returns.
