---
title: OpenLM Platform
description: Draft documentation for managing accounts, users, roles, and client authorization files in the OpenLM Platform portal.
slug: /legacy/slmc/cloud-portal
tags: [cloud, administration]
---

:::note[Draft]
This page is a draft. Content is under active review. Screenshots and steps might change.
:::

## Overview
OpenLM Platform centralizes management of your organization's cloud deployment: active products, user and role administration (Identity and Access Management (IAM)), and client authorization files for OpenLM components (for example, Broker).


## Prerequisites (TODO)
Ensure you have:
- An active OpenLM Platform subscription (trial or paid)
- 1 registered user (initial owner / admin)
- Network egress to required OpenLM Platform endpoints (see Network section)
- Supported browser (Chrome, Firefox, Edge latest)  
TODO: Add link to system requirements page.

## Accessing the portal
Select "Go" on the landing page to enter the Active Products screen. This shows the products provisioned for your tenant.


Selecting "Open" under "Software License Management Cloud" opens the OpenLM Web interface for license monitoring and reporting.


## 4. Identity & access management (IAM)
Use the gear icon to open IAM: manage Users, external identity providers, and Client Authorization Files.


### 4.1 Users
The Users screen lists accounts with access to the OpenLM Platform.
- Newly registered accounts have no role assigned; you must edit the account to grant a role.
- Place your cursor over a user row to reveal the edit (pencil) icon.


From the role dropdown assign the appropriate role (most first-time admins use `Admin`).


### 4.2 Inviting users
Select "Invite User" to add additional users by email. Select their initial access level: Admin or Viewer.


Invitation creates the account (username = email). You must still assign a role inside the OpenLM application: `Start -> Administration -> Role`.


### 4.3 Roles
Common roles:
- `admin_role`: Full control of OpenLM Platform
- `openlm_users_role`: View usage and run reports; cannot modify configuration


To add a user to a role:
1. Select the role and select Edit.
2. Open the Users tab.
3. Select Add.
4. Search (bottom-right search box) if needed.
5. Select the user; they appear in the role membership list.


## 5. Client authorization files
Client Authorization Files moved to the Cloud Portal. Create authorization files for components (for example, Broker) through "ADD".

From the dropdown pick the component, add a description, then Save.

Confirm the success message.


The Secret Key screen shows the authorization info. Use:
- Copy: copies JSON to clipboard
- Download: saves `authorization.json` for import into the component (for example, Broker)

## 6. Network & firewall requirements
Allow outbound HTTPS (443) to:
- `cloud.openlm.com`
- `identity.openlm.com`

TODO: Confirm if any regional endpoints or CDN domains are required.

## 7. External identity providers (TODO)
Describe integration steps for SSO / external IdP (Azure AD, Okta, and so on).
TODO: Add configuration screenshots and attribute mapping guidance.

## 8. Security considerations (TODO)
- Principle of least privilege for roles
- Rotating authorization secrets
- Credential recovery / MFA (if applicable)
TODO: Verify MFA support status.

## 9. Troubleshooting (TODO)
| Symptom | Possible Cause | Action |
| ------- | -------------- | ------ |
| User cannot log in | Role not assigned | Assign role in Roles section |
| Component fails authorization | Secret expired / wrong file | Recreate & redeploy `authorization.json` |
| Images not loading | Missing asset path | Verify static image path and rebuild |

Additional logs & diagnostic steps to be added.

## 10. Next steps (TODO)
- Link to detailed Broker setup guide
- Link to License Server configuration
- Link to Reporting Hub (if provisioned)

## 11. Change log (draft tracking)
- Initial structured draft added (DATE: 2025-11-06)
TODO: Append future edits here until publication.

---
## Legacy unstructured notes (to be merged or removed)
Below is the original raw content retained for reference while the draft is formalized.

> ORIGINAL NOTES START
> User accounts must have an Account Role; after registration assign the Role.
> Client Authorization Files allow creation of authorization.json for components.
> URLs required: cloud.openlm.com, identity.openlm.com (HTTPS 443)
> ORIGINAL NOTES END

---
## Removed images
All illustrative screenshots were intentionally removed per request. If reintroduction is needed, restore them with meaningful alt text and verified paths.
