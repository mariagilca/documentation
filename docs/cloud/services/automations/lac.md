---
sidebar_position: 1
title: License Access Control (LAC)
---

# License Access Control (LAC)

License Access Control (LAC) provides a centralized, vendor‑agnostic way to control who can use which licenses, without touching vendor‑specific options files or admin consoles. Use LAC to define access rules, reserve seats, schedule policies, deploy changes, and audit usage across FlexLM, DSLS, RLM, Autodesk Cloud, LinkedIn, and more.

## What you can do

- Unified rule management: Define access once; LAC translates to each license manager’s format.
- Permissions and reservations: INCLUDE/EXCLUDE access, and RESERVE seats for users or groups.
- Scheduling and policies: Activate rule sets on specific days/hours for regional or shift needs.
- Auto‑deploy and history: Deploy changes, view status, and track who changed what and when.
- Usage visibility: See who is using what, in real time and historically.

## Concepts

- LAC Asset: A managed license entity (e.g., a FlexLM server/vendor pair or Autodesk Cloud tenant). New assets arrive as “pending” and must be approved before management.
- Rules: Access definitions (e.g., INCLUDE/EXCLUDE/RESERVE, MAX, TIMEOUT) per feature or product.
- Policies: Collections of rules you can enable/disable and schedule.
- Deploy: Push current policy rules to the target asset. For cloud assets, LAC deploys per‑rule updates.

## Supported license managers

- FlexLM (FLEXnet Publisher)
- DSLS (Dassault)
- RLM (Reprise)
- Autodesk Cloud (named‑user)
- LinkedIn (named‑user)

Rule availability varies by manager; LAC exposes only the types that apply.

## Typical workflow

1) Approve assets

- New license sources appear as pending LAC assets. Approve those you want to manage. You can mark assets as “optimized” to allow integration with automations such as Subscription Optimizer (../subscription-optimizer).

2) Create rules

- Add permissions (INCLUDE/EXCLUDE) and reservations (RESERVE) for features or products. Rules can target users, groups, hosts, IPs (for FlexLM), or named‑user accounts (for cloud platforms).

3) Organize into policies and schedule (optional)

- Group rules into policies and schedule them to activate on specific days/hours.

4) Deploy

- Push changes to the license manager. Track response and review deployment history.

5) Monitor

- Use usage reports and audit logs to validate access, availability, and compliance signals.

## Admin quick checklist

Use this checklist to enable and validate LAC quickly:

1) Approve assets

- Open LAC and approve the assets (servers/tenants) you want to control.
- For cloud assets, ensure admin credentials are connected via SAS Agent.

2) Choose mode (on‑prem only)

- FlexLM/DSLS/RLM can be managed (LAC writes rules) or read‑only (LAC displays existing rules).

3) Create eligibility rules (INCLUDE)

- Target users/groups that should be allowed to use a product/feature.

4) Add reservations if required (RESERVE)

- Reserve guaranteed seats for specific users or groups where business‑critical.

5) Organize and schedule (optional)

- Group rules into a policy and schedule activation windows.

6) Deploy

- Deploy changes and confirm status on the LAC asset.

7) Validate and monitor

- Test with a user in scope. Review audit/deploy history and usage reports.

## Rule categories and common types

- Permissions
  - INCLUDE / EXCLUDE users, groups, hosts, IP ranges (FlexLM), or named users (cloud)
- Reservations
  - RESERVE seats for users or groups
- Limitations
  - MAX n (limit concurrent usage), TIMEOUT (FlexLM idle timeout), and manager‑specific limits
- Global options (manager‑specific)
  - Broad settings impacting overall behavior

LAC validates inputs and converts to the correct back‑end syntax for each manager.

## Platform examples

### FlexLM (server‑based)

- Goal: Allow the “Designers” group to use feature `ACD`, deny a specific user for `ACDLT`, reserve 3 seats of `ACD` for the “CAD‑Leads” group, and limit `ACD` to 10 concurrent uses. Idle sessions should time out after 30 minutes.

Steps in LAC:

- Permissions
  - INCLUDE group Designers → feature ACD
  - EXCLUDE user alice → feature ACDLT
- Reservations
  - RESERVE 3 → feature ACD → group CAD‑Leads
- Limitations
  - MAX 10 → feature ACD
  - TIMEOUT 1800 → feature ACD (idle close after 1800 seconds)

Deploy to the FlexLM asset. LAC generates the correct options file entries and pushes them via Broker.

What FlexLM sees (illustrative):

```
INCLUDE ACD GROUP Designers
EXCLUDE ACDLT USER alice
RESERVE 3 ACD GROUP CAD-Leads
MAX 10 ACD
TIMEOUT ACD 1800
```

Tips

- Prefer groups for INCLUDE/RESERVE to simplify maintenance.
- After deployment, a reread/restart may be required by the vendor; LAC shows the deploy status.

### Autodesk Cloud (named‑user)

- Goal: Permit the “BIM‑Users” group to access AutoCAD named‑user seats; reserve seats for two project leads; prevent mass assign‑all patterns.

Steps in LAC:

- Approve the Autodesk Cloud asset; ensure SAS Agent holds valid admin credentials.
- Permissions
  - INCLUDE group BIM‑Users → product AutoCAD
- Reservations
  - RESERVE user lead1@example.com → AutoCAD
  - RESERVE user lead2@example.com → AutoCAD
- (Optional) Mark the asset as “optimized” if you plan to use Subscription Optimizer.
- Deploy. LAC performs per‑rule updates to the Autodesk tenant.

Behavior

- Named‑user access is enforced by the cloud platform; LAC writes/updates assignments through the API.
- Avoid entire‑asset “assign all”; keep control with INCLUDE and RESERVE rules.
- With Subscription Optimizer (../subscription-optimizer), INCLUDE defines eligibility and RESERVE reflects guaranteed seats while the optimizer reassigns non‑critical seats when needed.

## Step‑by‑step: Getting started

1. Approve the LAC asset(s) you want to manage.
2. Create INCLUDE rules for eligible users or groups; add RESERVE rules as needed.
3. (Optional) Create a policy and schedule it to specific time windows.
4. Deploy changes to the asset and verify the deploy status.
5. Confirm access by testing with a user in scope; review usage in reports.

## Best practices

- Prefer groups over individual users to simplify maintenance.
- Start with INCLUDE rules to define eligibility; add RESERVE only where guaranteed access is required.
- Use scheduling to shift access windows between regions/teams.
- Review deployment history and usage regularly; retire unused rules.
- For cloud named‑user platforms, avoid “assign all” patterns—favor rule‑based control.

## Where LAC is used

- Options file management (on‑prem FlexLM/DSLS/RLM) with rule‑based control and scheduling.
- Named‑user control for Autodesk Cloud and LinkedIn.
- Subscription Optimizer eligibility and reservations (../subscription-optimizer) for automated seat reallocation.

## Related setup

- Process Manager (usage signals): ../data-collection/process-manager.md
- Personal Dashboard (user notifications/self‑service): ../users/personal-dashboard.md

## FAQ

<details>
<summary>Show FAQ</summary>

Q: Does LAC replace options files entirely?  
A: For FlexLM/DSLS/RLM in “managed” mode, LAC becomes the source of truth and deploys rules to the server. In “read‑only” mode, LAC imports and displays existing files without changing them.

Q: Which rules are available per manager?  
A: LAC exposes only valid types for the selected manager. For example, FlexLM supports INCLUDE/EXCLUDE/RESERVE/MAX/TIMEOUT; Autodesk Cloud focuses on named‑user permissions and reservations.

Q: How does LAC interact with Subscription Optimizer?  
A: LAC defines eligibility (INCLUDE) and performs reservations (RESERVE). Subscription Optimizer uses these to reassign seats automatically when all seats are in use.

Q: Can I audit changes?  
A: Yes. Deployment status and change history are tracked. You can review who changed what and when.

</details>

## Troubleshooting

<details>
<summary>Show troubleshooting</summary>

- Rules not taking effect
  - Confirm the asset is approved and managed.
  - Check that the policy is enabled and deployed successfully.
  - For FlexLM, ensure the server reread/restart completed if required by the vendor.

- Users can’t access a feature
  - Verify INCLUDE/EXCLUDE order and that the user/group is targeted by an active policy.
  - For reserved seats, ensure a RESERVE rule exists for the correct feature/pool.

- Cloud (Autodesk/LinkedIn) deploy errors
  - Ensure admin credentials are valid via SAS Agent and the asset is marked as optimized (if required).
  - Avoid entire‑asset “assign all”; use rule‑based assignments.

- Unexpected access
  - Review overlapping policies and scheduling windows.
  - Check global or manager‑specific settings (e.g., FlexLM options that override local rules).

</details>
