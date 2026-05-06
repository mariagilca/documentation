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
- **Audit logging** — granted/denied attempts with timestamps.  
- **Integration** — leverage AD/LDAP groups through UGS; validate features through Features Service.  



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
- Deploying a **Policy** compiles only that policy’s rules (exclusive set for that asset).  
:::



## Prerequisites

1. Install Broker (per license server) and ensure it is reachable.  
2. In each Broker configuration, turn on `Watch option file = true`.  
3. **Approve** the host in Broker Hub.  
4. **Approve** the license server in License Servers (required for Managed mode).  

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
     - Feature (and optional qualifiers such as `licenseId`)  
     - Entity type/value (User, Group, Host; values from UGS/AD)  
     - Rule value (if the rule type requires it)  
   - Save (new rules remain undeployed until you deploy them).  

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

5. **Monitor deployments**  
   - *Deployments → Queue*: requests awaiting Broker processing.  
   - *Deployments → History*: success/failure, timestamp, errors; preview the option file used.  

6. **Operate & iterate**  
   - Use **Audit** logs to verify Granted/Denied outcomes.  
   - Adjust rules/policies; redeploy as required.  



## Pages & actions

### Pending

The Pending page lists assets that have not yet been approved or denied.

- Shows newly detected assets awaiting a decision.  
- **Approve**: select Read-only or Managed.  
- **Deny**: moves the asset to Denied.  

### Denied

The Denied page shows assets you have previously rejected.

- Lists denied assets.  
- **Restore**: send back to Pending.  

### Overview

The Overview page is your central dashboard for approved assets.

- Lists all monitored/managed assets: license server, vendor, mode, rules/policies count, status.  
- Preview asset: compile all linked rules and show current option file.  
- Manual deployment (Managed only).  
- **Edit asset**: toggle *Automatic deployments on group change*.  

:::warning[Asset deletion]
Deleting an asset removes all related data (rules and policies) and unsets *Watch option file* in Broker. To rediscover it, turn on Watch in Broker again. This is irreversible.
:::

### Rules

Use the Rules page to define license access control statements.

- Manage undeployed and deployed rules.  
- Create / Duplicate / Delete rules.  
- Edit is available only for undeployed rules.  
- To change a deployed rule: delete it and create a new 1.  

### Policies

Policies group rules together and define when they are deployed.

- List all policies with details (asset, vendor, type, and so on).  
- Add / Edit / Delete / Activate / Deactivate.  
- Activate/Deactivate updates scheduled deployments automatically.  
- Delete removes scheduled deployments (asset and rules remain).  

### Deployments

The Deployments page tracks all deployment activity.

- **History**: completed deployments with status/time/errors.  
- **Schedule**: all scheduled policy deployments.  
- **Queue**: pending deployments.  



## Validation & reliability

During deployment, LAC validates:  

- **Features** — through Features Service (Operational API).  
- **Users/Groups/Hosts** — through UGS (backed by AD/LDAP).  

If unresolved, the deployment fails early and is not enqueued.  
If Broker write fails, it rolls back to the last working option file.  



## Common use cases (recipes)

### Reserve premium features for senior engineers
1. Add rule: `INCLUDE PremiumFeature FOR GROUP SeniorEngineers`.  
2. (Optional) `EXCLUDE PremiumFeature FOR GROUP JuniorEngineers`.  
3. Add policy *Standard Workday*; select asset; include rules.  
4. (Optional) Schedule policy for business hours.  
5. Deploy.  

### After-hours access for interns
1. Add rule: `INCLUDE PremiumFeature FOR GROUP Interns`.  
2. Policy: *After Hours* (Mon–Fri 18:00–08:00 + weekends).  
3. Ensure only one policy is active per asset.  

### Fast rollback

To revert to a previous configuration:

- Go to *Deployments → History*, note last successful deployment.  
- Re-deploy previous known-good policy (or re-apply from Overview).  



## Troubleshooting

| Symptom | Likely cause | How to fix |
|---------|--------------|------------|
| Asset never appears in Pending | Broker not watching option file; host not approved | Activate *Watch option file*; approve host |
| Can’t choose Managed mode | License server not approved | Approve server in License Servers |
| Deployment fails before queue | Validation failed | Verify feature names; verify entities through UGS/AD |
| Deployment fails on server | Write error; permission issue | Check Broker logs; fix permissions; rollback |
| Rule edit deactivated | Rule is deployed | Delete and recreate rule |
| Policy deploy didn’t include all rules | Policy deployment is exclusive | Deploy asset from Overview if you want all rules |

---

## Best practices

- Use consistent names (for example, `INCLUDE-PremiumFeature-G_SeniorEngineers`).  
- Separate policies by operating window (*Workday* vs *After Hours*).  
- Keep policies exclusive (one active policy per asset).  
- Use Read-only first, then switch to Managed.  
- Batch group-driven deploys (use ~1-hour debounce).  
- Review History after each change.  



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
</details>



## Glossary

- **Asset**: host + port + license manager type + option file.  
- **Managed / Read-only**: LAC control modes.  
- **Rule**: atomic directive (INCLUDE/EXCLUDE/RESERVE).  
- **Policy**: scheduled bundle of rules for one asset.  
- **Deployment**: compile + deliver option file through Broker.  
- **UGS**: User/Group Service (feeds AD/LDAP groups).  
- **Features Service**: authoritative catalog for feature validation.  



## Quick start checklist

- Broker installed; *Watch option file = true*  
- Host approved in Broker Hub  
- License server approved (for Managed)  
- Asset approved (mode selected)  
- Rules created and linked  
- Policy created and deployed  
- Verify Deployments → History and audit entries  
