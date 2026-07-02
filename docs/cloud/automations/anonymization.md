---
title: Anonymization
sidebar_position: 6
draft: true
description: "Anonymize personal user data for privacy compliance in the OpenLM Platform. Create anonymization policies, run one-time broad or absolute anonymizations, and monitor runs from the Anonymization service."
---

Anonymization lets you permanently remove personal user data from OpenLM usage records to meet privacy and data-protection obligations, such as the General Data Protection Regulation (GDPR). It is built for administrators who are responsible for data governance: you decide which user details are personal, who they belong to, and when they are anonymized, and Anonymization applies those decisions consistently across the data OpenLM has collected.

## What Anonymization does

OpenLM collects usage data — license checkouts, process sessions, denials, dongle activity, and more — and each record identifies the user it belongs to by details such as username, full name, email address, and phone number. Retaining that personal data indefinitely is often neither necessary nor permitted. Anonymization replaces those details with irreversible hashed values so that the usage statistics remain intact while the person behind them can no longer be identified.

With Anonymization, you can do the following:

- Anonymize personal data continuously, on a schedule, or on demand, without deleting the underlying usage history.
- Choose exactly which user fields to anonymize, from the username and email address to the department, phone number, and office.
- Target only the users a rule of privacy applies to, by country, department, source, and directory group.
- Exempt specific users from a policy so that their data is preserved.
- Fully erase an individual or a group on request, removing them from Users and Groups and anonymizing all of their data — the operation behind a "right to be forgotten" request.
- Track every anonymization run in real time and review a searchable history of what was anonymized and when.

## How Anonymization works

Anonymization is organized around 2 entities, which also correspond to the 2 items in its navigation:

- **Policies** — rule-based anonymization that runs automatically when its conditions are met. A policy defines which fields to anonymize, which users it applies to, and what triggers it. You can disable a policy to pause it without deleting it.
- **Single anonymization** — a one-time run that you start yourself. Its status and results appear in History, alongside your scheduled policy runs.

### What "anonymize" means

When Anonymization processes a field, it replaces the value with a SHA-256 (Secure Hash Algorithm) hash — a fixed-length string of letters and numbers that cannot be reversed back to the original value. This is a one-way transformation, not encryption: no key restores the original data.

Most fields are hashed **deterministically**, so the same input always produces the same output. This keeps usage reports consistent — for example, 2 anonymized sessions that belonged to the same person still group together. Two fields, **Username** and **Unified Username**, are hashed with a random salt instead, so each run produces a different value. This prevents conflicts in Users and Groups, where usernames must stay unique, when a name is reused after an earlier user was anonymized.

Fields with no value stay empty rather than hashed.

### What triggers a policy

A policy's type controls when it runs. All 3 types anonymize the fields you select for the users who match the policy criteria; they differ only in timing.

| Type (as shown) | When it runs | Typical use |
|---|---|---|
| On sessions closed | Each time a session closes, if the session's user matches the policy. | Anonymize personal data continuously as usage is recorded, so stored data is never identifiable for longer than a session. |
| On a relative date | Every day at a set time, on all data older than a threshold you define (for example, older than 6 months). | Enforce a rolling retention window — keep recent data identifiable, anonymize anything past the limit. |
| On a fixed date | On data that falls within a fixed start and end date. | Anonymize a specific historical period, such as a past project or an employee's tenure. |

Sessions come from across the OpenLM Platform. The **On sessions closed** type responds to closed sessions from dongle monitoring, process sessions, touch point events, monitored sessions, denials, disposable tokens, and monitored allocations.

### How policy criteria combine

A policy can filter users by **country**, **department**, **source**, and **directory group**. These criteria combine together: a user is anonymized only if they match *every* criterion you set. A criterion you leave empty is ignored.

For example, a policy with countries `USA` and `Moldova` and source `LDAP` anonymizes a user whose country is USA and whose source is LDAP, but not a user whose country is USA and whose source is System.

:::warning
A policy with no criteria at all matches every user in the system. Anonymization warns you before it saves such a policy. See [Safeguards and restrictions](#safeguards-and-restrictions).
:::

## What you need

- Access to the OpenLM Platform, with the Anonymization service available to your organization.
- An Anonymization administrator role to create policies or run anonymizations, or the viewer role to review them. See [Roles and permissions](#roles-and-permissions).
- User data in [Users and Groups](../users/users-and-groups), which supplies the users, groups, and fields that Anonymization works with.
- OpenLM usage data being collected (for example, through [Broker](../getting-started/install-broker) and the [Workstation Agent](../getting-started/install-workstation-agent)), so that there are sessions to anonymize.

## Roles and permissions

What you can do in Anonymization depends on your assigned role.

| Role | What you can do |
|---|---|
| Anonymization administrator | Full access. View policies and history, create and edit policies, enable and disable them, delete them, run single anonymizations, and manage exemptions. Account administrators have the same access. |
| Anonymization viewer | Read-only access. View the policy list and the History page. Cannot create, edit, duplicate, enable, disable, or delete policies, and cannot run a single anonymization. |

A signed-in user who has neither role sees a "not enough permissions" message instead of the interface, and the navigation is hidden until a role is granted. If this happens to you, contact your OpenLM administrator to request access.

## Key terms

The following terms appear throughout this guide and the interface.

| Term | Meaning |
|---|---|
| Anonymize | Replace a value with an irreversible SHA-256 hash so the original cannot be recovered. |
| Policy | A saved rule that anonymizes selected fields for matching users when its trigger condition is met. |
| Single anonymization | A one-time anonymization run that you start manually, either broad or absolute. |
| Broad anonymization | Anonymizes the *fields you select* for users who match criteria you define. |
| Absolute anonymization | Anonymizes *all* fields for the specific users or groups you select and removes them from Users and Groups. |
| Criteria | The country, department, source, and group filters that decide which users a policy or broad run applies to. |
| Exemption | A user you exclude from a policy so that their data is never anonymized by it. |
| Threshold | For a relative-date policy, the age past which data is anonymized (a number plus a unit of days, weeks, months, or years). |
| Trigger time | The time of day a scheduled policy runs. |
| Anonymized field | A user field selected for anonymization, such as Email, Country, or Phone. |

## Get started

### Open Anonymization

Anonymization runs inside the OpenLM Platform in your web browser, at an address of this form:

```text
https://cloud-XX.openlm.com/anonymization/#/anonymization
```

where `cloud-XX` is your OpenLM cloud instance (for example, `cloud-us`). You can also open it from the OpenLM Platform app launcher.

Anonymization uses the OpenLM Platform single sign-on. There is no separate login form: if you are not already signed in, your browser is redirected to the OpenLM login page and returns you to Anonymization afterward. To sign out, open the account menu in the header and select **Log Out**.

### Explore the interface

The header shows the product name, **Anonymization**, and your signed-in account. The navigation has two items:

| Item | Purpose |
|---|---|
| Anonymization | The home page. Lists your policies, and provides the actions to create policies and to start a single anonymization. |
| History | A record of every anonymization run — scheduled and one-time — with live progress and results. |

### The Anonymization workflow

A typical path through Anonymization looks like this:

1. **Decide what is personal.** Identify the user fields that count as personal data for your obligations.
2. **Create a policy.** On the Anonymization page, add a policy that anonymizes those fields for the right users on the right trigger.
3. **Exempt anyone who must be preserved** (optional). Add exemptions for users whose data you must retain.
4. **Handle one-off requests with a single anonymization.** Run a broad or absolute anonymization when you need to act once rather than on a schedule.
5. **Monitor results.** On the History page, confirm that runs complete and review which users were anonymized.

## Work with anonymization policies

The Anonymization page lists every policy you have defined and is where you create, edit, and manage them.

### View policies

Each row on the policy list shows the following:

| Column | Description |
|---|---|
| Policy Name | The name of the policy. A disabled policy is marked so you can tell it is paused. |
| Type | The trigger type: On sessions closed, On a relative date, or On a fixed date. |
| Anonymized Fields | How many fields the policy anonymizes. The value reads `0` when none are set, a count such as `3`, or **All users' data** when every field is selected. |
| Last Run | When the policy most recently ran. |

Use the toolbar to refresh the list, filter by Policy Name or Type, add a policy, or start a single anonymization. Select one or more policies with the row check boxes to enable, disable, or delete them.

### Create a policy

Only administrators can create policies.

1. On the Anonymization page, select **Add policy**. The Add Anonymization Policy form opens.
2. Under **1. Select policy type and parameters**, do the following:
   1. In **Policy name**, enter a unique name. The name is required, and it cannot be changed later.
   2. Leave the toggle set to **Enabled** so the policy is active, or set it to **Disabled** to save it paused.
   3. Select a policy type: **On sessions closed**, **On a relative date**, or **On a fixed date**. See [What triggers a policy](#what-triggers-a-policy).
3. Set the policy criteria — the users the policy applies to. All criteria are optional, and a user must match every one you set:
   - **Countries** — one or more user countries.
   - **Departments** — one or more departments.
   - **Group** — one or more directory groups.
   - **Source** — one or more sources the user records came from (for example, LDAP or CSV).
4. If you chose a scheduled type, set its timing:
   - **On a relative date** — enter a **Threshold** (1–100) and a **Period** of Days, Weeks, Months, or Years, then set a **Trigger Time**. The policy runs daily at that time and anonymizes data older than the threshold.
   - **On a fixed date** — set the **Anonymization date range** (a **Start date** and **End date**) and a **Trigger Time**.
5. (Optional) Add exemptions. See [Exempt users from a policy](#exempt-users-from-a-policy).
6. Under **2. Select fields to be anonymized**, select the check box for each field to anonymize. At least 1 field is required. **Username**, **Last Name**, and **First Name** are selected by default. For the full list, see [Anonymizable fields reference](#anonymizable-fields-reference).
7. Review the **Summary**, which describes in plain language what the policy does.
8. Select **Save**.

:::note
If you save a policy with no criteria, Anonymization warns you that the policy anonymizes all users in the system, and asks you to confirm.
:::

### Choose which fields to anonymize

Anonymization can process 14 user fields. Select only the fields that are personal data for your purpose; the rest are left untouched so that reports keep as much detail as your obligations allow. The **Username** and **Unified Username** fields are hashed with a random value each run, so an anonymized user name differs between runs by design. See [What "anonymize" means](#what-anonymize-means) and the [Anonymizable fields reference](#anonymizable-fields-reference).

### Exempt users from a policy

Exemptions let you preserve specific users' data even when they match a policy's criteria — for example, service accounts or users under a legal hold.

1. In the policy form, under **Exemptions**, select **Add exemption**. The Exemptions dialog opens.
2. Select the check box for each user to exempt. Use the search box and column filters to find users by user name, first name, last name, email, or country.
3. Select **Confirm**.

The form then shows a link such as **3 exemptions applied**. Select it to review or change the exemptions. Clearing every user in the dialog removes all exemptions.

:::note
Exemptions apply to individual users only, not to groups. An exempted user is skipped even if they match every other criterion.
:::

### Edit a policy

1. On the Anonymization page, find the policy and select the edit icon.
2. Change the criteria, timing, fields, or exemptions.
3. Select **Save**.

:::note
You cannot change a policy's **name** or **type** after it is created; both are read-only when you edit. To change either, duplicate the policy or create a new one.
:::

### Duplicate a policy

Duplicate a policy to reuse its settings as the starting point for a new one.

1. On the Anonymization page, find the policy and select the duplicate icon.
2. The form opens as a new policy, pre-filled from the original and named **Copy of - _original name_**. Adjust it, including the name.
3. Select **Save**.

### Enable or disable policies

Disabling a policy pauses it: it stays in the list but does not run again until you enable it. Existing anonymized data is unaffected.

1. On the Anonymization page, select the check box for one or more policies.
2. Select **Enable** or **Disable**. The action applies to all selected policies.

### Delete policies

1. On the Anonymization page, select the check box for one or more policies.
2. Select **Delete**.
3. In the confirmation dialog, confirm the deletion.

:::warning
Deleting a policy is permanent and cannot be undone. Deleting a policy does not restore data that the policy already anonymized — anonymization itself is irreversible.
:::

## Run a single anonymization

A single anonymization is a one-time run that you start yourself, rather than a saved policy. Use it for one-off requests and immediate actions. It comes in 2 forms.

| Form | What it anonymizes | Reversible | Kept in history |
|---|---|---|---|
| Broad | The fields you select, for users who match criteria you define. | No | 90 days |
| Absolute | Every field, for the specific users or groups you select, and removes them from Users and Groups. | No | Permanently |

Only administrators can run a single anonymization. To open the page, select **Single anonymization** on the Anonymization page.

### Run a broad single anonymization

A broad single anonymization is the one-time equivalent of a policy: it anonymizes the fields you choose for matching users, once.

1. On the Single Anonymization page, under **1. Select anonymization type**, select **Broad**.
2. Set the criteria for the users to anonymize — **Countries**, **Departments**, **Group**, and **Source**. As with policies, a user must match every criterion you set.
3. (Optional) Turn on **Enable date range** and set a start and end date to limit the run to data in that period.
4. (Optional) Add exemptions to preserve specific users.
5. Under **2. Select fields to be anonymized**, select the fields to anonymize. **Username**, **Last Name**, and **First Name** are selected by default.
6. Review the **Summary**, then select **Run**.

:::note
If you run a broad anonymization with no criteria, Anonymization warns you that it anonymizes all users in the system, and asks you to confirm.
:::

### Run an absolute single anonymization

An absolute anonymization fully erases the identity of specific people. It anonymizes *all* fields for the users or groups you select, and removes those users from Users and Groups. Use it to satisfy an erasure request.

1. On the Single Anonymization page, under **1. Select anonymization type**, select **Absolute**.
2. Choose whether to select **Users** or **Groups**, then select the check box for each user or group to anonymize. Use search and filters to find them.
3. An absolute run anonymizes all fields, so the field check boxes are selected and locked — you do not choose fields.
4. Select **Run**.
5. In the **Absolute Anonymization** confirmation dialog, confirm to proceed.

:::warning
Absolute anonymization is permanent and cannot be undone. The selected users are removed from Users and Groups, and their anonymized data in the Users and Groups Service is deleted about a week after the run. Absolute runs are the only anonymization records kept permanently in History.
:::

## Monitor anonymization runs

The History page records every anonymization run — from scheduled policies and from single anonymizations — with live progress and results.

### View history

Each row shows the following:

| Column | Description |
|---|---|
| Policy Name | The policy or single anonymization that ran. |
| Type | The type of run, such as a scheduled relative-date policy, a closed-session run, or a single broad or absolute run. |
| Anonymized Fields | The number of fields anonymized, or **All users' data** when every field was anonymized. |
| Started at | When the run began. |
| Ended at | When the run finished. |
| Anonymized users | The run's progress or result — see the following states. |

Filter by Policy Name or Type, and select **Refresh** to reload the latest data.

### Track progress in real time

The Anonymized users column reflects each run's live state:

| State | What it means |
|---|---|
| Pending | The run is queued and has not started. |
| In Progress… | The run is under way; a percentage is not yet available. |
| In progress - _N_% | The run is under way, with a live percentage and progress bar. |
| A number (for example, `128`) | The run finished, having anonymized that many users. |

Progress updates automatically while you watch the page. When a run reaches 100%, the row refreshes to show the final count.

### See who a run anonymized

For a completed run other than an absolute one, select the anonymized-users count to open the **Anonymized Users** dialog. It lists the users the run anonymized, with their user name, first name, last name, email, and country, and you can search the list.

:::note
Absolute runs do not keep a per-user list, so the count for an absolute run is not selectable.
:::

### Data retention

Anonymization keeps history according to the type of run:

- **Absolute single anonymizations** are kept **permanently**, for compliance and audit.
- **All other runs** — scheduled policies, closed-session runs, and broad single anonymizations — and their per-user detail are kept for **90 days**, then removed automatically.

This retention applies to the *history records*, not to the anonymized data itself: anonymization is permanent regardless of how long its history is retained.

## Safeguards and restrictions

Anonymization includes safeguards against irreversible mistakes:

- **The `OpenLM_Everyone` group cannot be used.** Because it contains every user, it is blocked from policies and from both broad and absolute single anonymizations, and it does not appear in group pickers. This prevents anonymizing the entire organization at once.
- **A policy or broad run with no criteria matches everyone.** Anonymization warns you and requires confirmation before it proceeds.
- **Absolute anonymization requires confirmation** and clearly states that it is permanent.
- **Anonymization is irreversible.** It has no undo and no key to restore original values. Confirm your criteria and field selection before you run.

## Reference

### Anonymizable fields reference

Anonymization can process the following 14 user fields. **Username** and **Last Name** and **First Name** are selected by default in new policies and broad runs.

| Field | Notes |
|---|---|
| Username | Hashed with a random salt; the result differs each run. |
| Unified Username | Hashed with a random salt; the result differs each run. |
| First Name | Selected by default. |
| Last Name | Selected by default. |
| Display Name | |
| Title | |
| Department | |
| Phone | |
| Mobile Phone | |
| Country | |
| Description | |
| Office | |
| Email | |
| Password | |

All fields except Username and Unified Username are hashed deterministically: the same value always produces the same result.

### Policy types reference

| Type | Trigger | Timing controls |
|---|---|---|
| On sessions closed | Runs whenever a matching user's session closes. | None. |
| On a relative date | Runs daily and anonymizes data older than a threshold. | Threshold (1–100), Period (Days, Weeks, Months, Years), and Trigger Time. |
| On a fixed date | Anonymizes data within a fixed date range. | Start date, End date, and Trigger Time. |

### Session sources reference

The **On sessions closed** policy type reacts to closed sessions from the following OpenLM sources:

- Dongle monitoring devices
- Touch point events
- Process sessions
- Monitored sessions
- Denials
- Disposable tokens
- Monitored allocations

### Rules and limits

| Rule | Detail |
|---|---|
| Policy name | Required, and unique within your organization. Cannot be changed after creation. |
| Fields to anonymize | At least 1 is required. |
| Relative-date threshold | A whole number from 1 to 100. |
| Trigger time | Set on a 12-hour clock with AM or PM. |
| `OpenLM_Everyone` group | Cannot be used for any anonymization. |
| Exemptions | Individual users only. |

### Roles reference

| Role | Access |
|---|---|
| Anonymization administrator | Full read and write access to policies, single anonymizations, and history. Account administrators have the same access. |
| Anonymization viewer | Read-only access to the policy list and History. Cannot create, change, delete, or run anything. |

## Frequently asked questions

### Can I reverse an anonymization?

No. Anonymization replaces values with irreversible hashes, and it has no key or undo. Before you run a policy or a single anonymization, confirm the criteria and the fields you selected.

### Why does the same user name produce a different value each time?

The **Username** and **Unified Username** fields are intentionally hashed with a random salt so that each run produces a unique value. This prevents conflicts in Users and Groups, where user names must be unique, if a name is reused after an earlier user was anonymized. All other fields are hashed deterministically and produce the same value each time.

### What is the difference between a policy and a single anonymization?

A policy runs automatically and repeatedly whenever its trigger condition is met. A single anonymization is a one-time run you start yourself. Both appear in History.

### What is the difference between broad and absolute anonymization?

A broad anonymization hides only the fields you select, for users who match your criteria. An absolute anonymization hides *all* fields for the specific users or groups you select and removes them from Users and Groups. Broad runs are kept in History for 90 days; absolute runs are kept permanently.

### Why can't I select the `OpenLM_Everyone` group?

`OpenLM_Everyone` contains every user, so it is blocked from anonymization to prevent anonymizing your whole organization at once. Target users with more specific criteria or groups instead.

### Why did a run disappear from History?

History for everything except absolute single anonymizations is kept for 90 days and then removed automatically. Absolute runs are kept permanently. See [Data retention](#data-retention).

### Why can't I create or run anything?

You most likely have the viewer role, which is read-only. Ask your OpenLM administrator for the Anonymization administrator role. If you see a "not enough permissions" message with no interface, you have neither role yet.
