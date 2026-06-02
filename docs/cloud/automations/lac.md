---
id: license-access-control
title: License Access Control (LAC)
sidebar_position: 1
slug: lac
description: "Audience: OpenLM admins and operators Goal: Configure, deploy, and operate License Access Control (LAC) to govern who can use which licenses and when."
---
Audience: OpenLM admins and operators  
Goal: Configure, deploy, and operate License Access Control (LAC) to govern who can use which licenses and when.


## What is LAC?

License Access Control (LAC) turns license management from passive monitoring into active, policy-driven enforcement. You define rules (who/what/when), and LAC compiles and deploys an option file to the license manager. The license manager then enforces those rules at checkout time. LAC also logs outcomes for audit and troubleshooting.

### Capabilities

- **Granular access control** — target specific features, users, groups, hosts.  
- **Policies** — bundle rules, add schedules; only 1 policy is active per asset at a time.  
- **Bulk rule creation** — select multiple entities and multiple features in the Add Rule wizard. LAC creates one rule per entity × feature combination and skips duplicates with a warning.  
- **Workstation Agent enforcement** — optionally require the OpenLM Workstation Agent before LAC allocates licenses to a user (see *Settings*).  
- **SaaS support** — deploy policies (manual and scheduled) to SaaS license managers such as AutodeskCloud, in addition to on-premises servers.  
- **Audit logging** — granted/denied attempts with timestamps and the user who triggered each change.  
- **Integration** — leverage AD/LDAP groups through UGS; validate features through Features Service.  



## Supported license managers

LAC manages two categories of license manager. For on-premises managers, LAC compiles your rules into an option file and deploys it to the server through Broker. For SaaS platforms, LAC applies per-rule, named-user updates directly to the cloud tenant.

**On-premises (option file based)**

- [Flexera FlexNet (FLEXlm)](../data-collection/connect-license-managers/engineering-lms/flexera-flexnet-flexlm.mdx)  
- [DSLS](../data-collection/connect-license-managers/engineering-lms/dsls.mdx)  
- [Reprise RLM](../data-collection/connect-license-managers/engineering-lms/reprise-rlm.mdx)  
- [LM-X](../data-collection/connect-license-managers/engineering-lms/lm-x.mdx)  
- [Sentinel RMS](../data-collection/connect-license-managers/engineering-lms/sentinel-rms.mdx)  

**SaaS (named-user)**

- [Autodesk Cloud](../data-collection/connect-license-managers/saas-platforms/autodesk-cloud.mdx)  
- [LinkedIn Sales Navigator](../data-collection/connect-license-managers/saas-platforms/linkedin-sales-navigator.mdx)  

Available rule types depend on the license manager. LAC presents only the rule categories and types that the selected manager supports. For example, FlexLM accepts INCLUDE, EXCLUDE, RESERVE, MAX, and TIMEOUT directives, whereas SaaS platforms focus on named-user permissions and reservations.



## Key concepts

- **Asset** (in LAC): A unique combo of host + port + license manager type + option file.  
- **Mode**:  
  - *Read-only* — monitor option file content; no control.  
  - *Managed* — LAC controls and deploys option files to the server.  
- **Rule**: An individual directive (for example, `INCLUDE feature X FOR GROUP SeniorEngineers`).  
- **Policy**: A collection of rules for a single asset, optionally scheduled.  
- **Deployment**: Compiling rules into an option file and sending it to the license server through Broker.  

:::tip[Key behavior]
- Deploying from the **Overview** page compiles all rules linked to the asset.  
- Deploying a **Policy** compiles only that policy's rules (exclusive set for that asset).  
:::



## Prerequisites

1. Install Broker (per license server) and ensure it is reachable.  
2. In each Broker configuration, turn on `Watch option file = true`.  
3. **Approve** the host in Broker Hub.  
4. **Approve** the license server in License Servers (required for Managed mode).  
5. (Optional, for Workstation Agent enforcement) Deploy the OpenLM Workstation Agent to user machines so LAC can confirm an active agent before allocating individual-user rules.  

:::note[Data availability]
Once you meet the prerequisites, LAC surfaces new assets on Pending (allow brief discovery delay).
:::



## Typical workflow

1. **Discover & approve an asset**  
   - Go to *Pending → select an asset → Approve*.  
   - Select a mode:  
     - *Read-only*: monitor only (no license-server approval required).  
     - *Managed*: full control (license server approval required).  
   - On approval, LAC parses the current option file into undeployed rules.  

2. **Create rules**  
   - Open *Rules → Add rule*.  
   - Pick the associated asset (filters available rule categories/types by license manager).  
   - Define:  
     - Category (for example Permissions, Reservations)  
     - Type (for example, INCLUDE, EXCLUDE, RESERVE)  
     - Feature or features (and optional qualifiers such as `licenseId`)  
     - Entity type/value (User, Group, Host; values from UGS/AD) — you can select multiple entities at once  
     - Rule value (if the rule type requires it)  
   - Save. New rules remain undeployed until you deploy them. When you select multiple entities and/or features, LAC creates one rule per entity × feature combination and skips any duplicates with a warning.  

3. **Bundle rules into a policy**  
   - Go to *Policies → Add Policy*.  
   - Fill **Name**, **Description**, **Status** (active/inactive).  
   - Add optional **Schedule** (days/times).  
   - Select the **asset** (1 asset per policy).  
   - Select **rules** (filtered by asset).  
   - Save. If active and scheduled, LAC automatically schedules deployments.  

4. **Deploy**  
   - Manual (asset-wide): *Overview → select Managed asset → Deploy* (all rules).  
   - Manual (policy-only): *Policies → select policy → Deploy* (only policy rules).  
   - Scheduled (policy): LAC enqueues deployments based on the policy schedule.  
   - SaaS license managers (for example, AutodeskCloud) support both manual and scheduled policy deployments.  

5. **Monitor deployments**  
   - *Deployment → Queue*: requests awaiting Broker processing.  
   - *Deployment → Schedule*: scheduled policy deployments.  
   - *Deployment → History*: success/failure, timestamp, errors, skipped rules; preview the option file used.  

6. **Operate & iterate**  
   - Use **Audit** logs to verify Granted/Denied outcomes and to see which user made each change.  
   - Adjust rules/policies; redeploy as required.  



## Pages & actions

LAC is grouped into two sets of pages in the sidebar: **Operational** (Overview) and **Management** (Pending, Denied, Policies, Rules, Deployment, Settings).

### Overview

The Overview page is your central dashboard for approved assets.

![The LAC Overview page lists each approved asset with its server name, license manager type, vendor, and the number of rules and policies attached.](/services/lac/overview.png)
*Figure 1. The LAC Overview page lists each approved asset with its server name, license manager type, vendor, and the number of rules and policies attached.*

- Lists all monitored/managed assets: server name, license manager type, vendor, rules count, policies count.  
- Preview asset: compile all linked rules and show the current option file.  
- Manual deployment (Managed only).  
- **Edit asset**: toggle *Automatic deployments on group change*.  

:::warning[Asset deletion]
Deleting an asset removes all related data (rules and policies) and unsets *Watch option file* in Broker. To rediscover it, turn on Watch in Broker again. This is irreversible.
:::

### Pending

The Pending page lists assets that have not yet been approved or denied.

![The LAC Pending page lists newly discovered assets and previews the current option file content for the selected asset.](/services/lac/pending.png)
*Figure 2. The LAC Pending page lists newly discovered assets and previews the current option file content for the selected asset.*

- Shows newly detected assets awaiting a decision.  
- **Approve**: select Read-only or Managed.  
- **Deny**: moves the asset to Denied.  
- Selecting a row previews the option file currently on that server.  

### Denied

The Denied page shows assets you have previously rejected.

![The LAC Denied Assets page lists assets you previously denied, with a Restore To Pending action.](/services/lac/denied.png)
*Figure 3. The LAC Denied Assets page lists assets you previously denied, with a Restore To Pending action.*

- Lists denied assets.  
- **Restore To Pending**: send the asset back to Pending for re-approval.  

### Policies

Policies group rules together and define when they are deployed.

![The LAC Policies page lists policies with their description, server, license manager type, vendor, deploy cron, and create/update dates.](/services/lac/policies.png)
*Figure 4. The LAC Policies page lists policies with their description, server, license manager type, vendor, deploy cron, and create/update dates.*

- Lists all policies with details (asset, vendor, license manager type, deploy cron, create and update dates).  
- **Add Policy** / **Disable** (or Enable) / **Delete**.  
- Enabling and disabling a policy updates scheduled deployments automatically.  
- Deleting a policy removes its scheduled deployments. The asset and its rules remain.  

### Rules

Use the Rules page to define license access control statements.

- Two tabs separate rule state: **Deployed** and **Undeployed**.  
- **Add Rule** / **Delete**.  
- Edit is available only for undeployed rules. To change a deployed rule, delete it and create a new one.  
- The Add Rule wizard accepts multiple entities and multiple features in a single submission. LAC creates one rule per entity × feature combination and skips duplicates with a warning rather than failing the whole batch.  

![The Deployed tab on the LAC Rules page lists rules already pushed to the license manager.](/services/lac/rules-deployed.png)
*Figure 5. The Deployed tab on the LAC Rules page lists rules already pushed to the license manager.*

![The Undeployed tab on the LAC Rules page lists rules that have been saved but not yet deployed.](/services/lac/rules-undeployed.png)
*Figure 6. The Undeployed tab on the LAC Rules page lists rules that have been saved but not yet deployed.*

### Deployment

The Deployment page tracks all deployment activity across three tabs: Queue, Schedule, and History.

**Queue** — deployments awaiting Broker processing.

![The Queue tab on the LAC Deployment page lists deployments awaiting Broker processing.](/services/lac/deployment-que.png)
*Figure 7. The Queue tab on the LAC Deployment page lists deployments awaiting Broker processing.*

**Schedule** — scheduled policy deployments.

![The Schedule tab on the LAC Deployment page lists upcoming, automatically scheduled policy deployments.](/services/lac/deployment-schedule.png)
*Figure 8. The Schedule tab on the LAC Deployment page lists upcoming, automatically scheduled policy deployments.*

**History** — completed deployments with status, timestamp, errors, and any rules that LAC skipped during the deployment.

![The History tab on the LAC Deployment page lists completed deployments with status, timestamp, and any skipped rules.](/services/lac/deployment-history.png)
*Figure 9. The History tab on the LAC Deployment page lists completed deployments with status, timestamp, and any skipped rules.*

### Settings

The Settings page holds organization-wide LAC configuration. Toggle a setting and select **Save** to apply.

![The LAC Settings page shows the Workstation Agent Enforcement toggle, an info tooltip, and a Save button.](/services/lac/SETTINGS.png)
*Figure 10. The LAC Settings page shows the Workstation Agent Enforcement toggle, an info tooltip, and a Save button.*

#### Workstation Agent Enforcement

When enabled, LAC verifies that users have the OpenLM Workstation Agent installed and active before deploying rules that target them. Rules for users without an active agent are skipped during deployment and reported in *Deployment → History*. Group and host rules are always deployed normally.

- **Affected rule types** — only rules that target individual users: INCLUDE, INCLUDEALL, ALLOW, and RESERVE.  
- **Scope** — applies organization-wide.  
- **Timing** — applies on the next deployment. Existing allocations are not retroactively revoked.  
- **Detection** — LAC distinguishes an agent that is temporarily offline from an agent that is not installed; only the latter triggers a skip.  

:::note[License manager support]
Workstation Agent enforcement is not applied to license managers that do not provide the data LAC needs to correlate users with workstations. The UI surfaces this restriction when relevant.
:::



## Validation & reliability

During deployment, LAC validates:  

- **Features** — through Features Service (Operational API).  
- **Users/Groups/Hosts** — through UGS (backed by AD/LDAP).  
- **Workstation Agent** (if enforcement is enabled) — through Agent Activity Manager.  

### Skip behavior for corrupted entities

LAC no longer fails a whole deployment because a single referenced entity has become invalid. Instead, individual rules are skipped and the rest of the deployment proceeds:

- A user that has been disabled or deleted in UGS — rule skipped.  
- A group that is empty, disabled, or deleted — rule skipped.  
- A workstation without an active Workstation Agent (when enforcement is enabled) — user-targeted rule skipped.  

Skipped rules are listed in *Deployment → History* along with the reason, so you can fix the underlying entity and redeploy.

If Broker write fails, LAC rolls back to the last working option file.



## Audit logging

LAC publishes an audit event for each rule change, policy change, and deployment. Each event includes:

- **Timestamp**.  
- **Outcome** — Granted / Denied / Skipped.  
- **User** — the authenticated user who made the change. Background and scheduled jobs use a fixed system identifier.  
- **Target** — the asset, rule, or policy affected.  

Use audit logs to trace who changed what and to confirm deployment outcomes.



## Common use cases (recipes)

### Reserve premium features for senior engineers
1. Add rule: `INCLUDE PremiumFeature FOR GROUP SeniorEngineers`.  
2. (Optional) `EXCLUDE PremiumFeature FOR GROUP JuniorEngineers`.  
3. Add policy *Standard Workday*; select asset; include rules.  
4. (Optional) Schedule policy for business hours.  
5. Deploy.  

### Add many groups to one feature in a single step
1. Open *Rules → Add Rule*.  
2. Pick the asset, category, and rule type (for example, INCLUDE).  
3. Select the feature.  
4. In the entity picker, select all the groups you want to include.  
5. Save. LAC creates one rule per group, skipping any duplicates that already exist for that feature.  

### After-hours access for interns
1. Add rule: `INCLUDE PremiumFeature FOR GROUP Interns`.  
2. Policy: *After Hours* (Mon–Fri 18:00–08:00 + weekends).  
3. Ensure only one policy is active per asset.  

### Block non-Agent users from premium licenses
1. Deploy the OpenLM Workstation Agent to the user population that should be allowed.  
2. Go to *Settings* and turn on **Workstation Agent Enforcement**.  
3. Deploy your policy. Users without an active agent are skipped and reported in *Deployment → History*.  

### Fast rollback

To revert to a previous configuration:

- Go to *Deployment → History*, note the last successful deployment.  
- Re-deploy the previous known-good policy (or re-apply from Overview).  



## Troubleshooting

| Symptom | Likely cause | How to fix |
|---------|--------------|------------|
| Asset never appears in Pending | Broker not watching option file; host not approved | Activate *Watch option file*; approve host |
| Can't choose Managed mode | License server not approved | Approve server in License Servers |
| Deployment fails before queue | Validation failed for every rule | Verify feature names; verify entities through UGS/AD |
| Some rules missing after deployment | Corrupted entities or Workstation Agent enforcement | Check *Deployment → History* for skipped rules; fix entities or install the Workstation Agent |
| Deployment fails on server | Write error; permission issue | Check Broker logs; fix permissions; rollback |
| Rule edit deactivated | Rule is deployed | Delete and recreate rule |
| Policy deploy didn't include all rules | Policy deployment is exclusive | Deploy asset from Overview if you want all rules |

---

## Best practices

- Use consistent names (for example, `INCLUDE-PremiumFeature-G_SeniorEngineers`).  
- Separate policies by operating window (*Workday* vs *After Hours*).  
- Keep policies exclusive (one active policy per asset).  
- Use Read-only first, then switch to Managed.  
- Batch group-driven deploys (use ~1-hour debounce).  
- Review *Deployment → History* after each change, including the skipped-rules list.  
- Before turning on Workstation Agent Enforcement, confirm the agent is deployed to the relevant user population to avoid mass skips on the next deployment.  



## Example: solving premium-license contention

**Problem**: Juniors occupy premium seats → seniors blocked → project delays.  

**Solution with LAC**:  
1. Approve premium license asset in Managed mode.  
2. Create rules (INCLUDE seniors, optionally EXCLUDE juniors).  
3. Add *Workday policy* (08:00–18:00).  
4. (Optional) Add *After Hours* policy.  
5. Monitor deployments and audit logs.  

**Result**: Seniors get reliable access during work hours; juniors get deferred or off-hours access.  



## FAQ

<details>
<summary>Frequently asked questions about LAC</summary>

**Does LAC uninstall software or kill processes?**  
No. Enforcement happens at license checkout.  

**Can I manage multiple assets with one policy?**  
No. One policy = one asset.  

**What happens if I delete an asset?**  
All related data is deleted; rediscovery requires re-enabling Watch.  

**Can I edit a deployed rule?**  
No. Delete it and create a new one.  

**What happens to existing license allocations when I turn on Workstation Agent Enforcement?**  
Nothing — enforcement applies only on the next deployment. Existing allocations are not revoked.  

**Does Workstation Agent Enforcement apply to group or host rules?**  
No. It applies only to rules that target individual users (INCLUDE, INCLUDEALL, ALLOW, RESERVE).  

**Why is a single bad user no longer breaking my deployment?**  
LAC now skips rules with corrupted entities (disabled or deleted users, empty or deleted groups) instead of failing the whole deployment. Skipped rules show up in *Deployment → History*.  
</details>



## Glossary

- **Asset**: host + port + license manager type + option file.  
- **Managed / Read-only**: LAC control modes.  
- **Rule**: atomic directive (INCLUDE/EXCLUDE/RESERVE/ALLOW).  
- **Policy**: scheduled bundle of rules for one asset.  
- **Deployment**: compile + deliver option file through Broker.  
- **UGS**: User/Group Service (feeds AD/LDAP groups).  
- **Features Service**: authoritative catalog for feature validation.  
- **Workstation Agent**: OpenLM client installed on user machines; required for Workstation Agent Enforcement.  
- **Agent Activity Manager**: service that tracks which workstations have an active agent; LAC queries it during deployment.  



## Quick start checklist

- Broker installed; *Watch option file = true*  
- Host approved in Broker Hub  
- License server approved (for Managed)  
- Asset approved (mode selected)  
- Rules created and linked  
- Policy created and deployed  
- (Optional) Workstation Agent deployed to users; *Settings → Workstation Agent Enforcement* turned on  
- Verify *Deployment → History* and audit entries  
