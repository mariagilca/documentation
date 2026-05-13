# Remaining Zoho forms to create

`DocsSub_Topics` is done. The other four forms still need to be built. Each spec below maps one-to-one to a form you create from scratch inside **OpenLM Customerportal**, the same way we did Topics.

## Lessons learned from building Topics (read first)

A few things the form builder does that surprised me. Apply these as you go.

- **Field link names need to be set manually.** When you change a field's display name, the link name doesn't always update automatically. After you set the display name, also triple-click the **Field link name** input and type the same value. The Cloud Functions API depends on the exact link name.
- **`Type` is a reserved keyword.** Zoho silently renames the link to `Type_field`. If you ever need a `Type` field, set its link name to a different value (we used `Topic_Type` on `DocsSub_Topics`).
- **Decision Box is in Advanced Fields**, not Basic Fields. Scroll the left palette. Alternatively click the Zia "Is Active" suggestion chip — it adds a Decision Box directly. (Rename `Is Active` to `Active` afterwards, both display and link.)
- **Drag drops next to an existing field.** Drop into a clearly empty area below the last field, not on top of one. Otherwise the drop is interpreted as a select, your rename hits the existing field, and chaos follows.
- **Drop Down choices are editable inline.** Click the placeholder "Type new choice" text, type the value. Three default placeholders are provided; remove or add with the + / − buttons.
- **Mark unique fields with "No duplicate values"** in the right-hand Validation section.
- **"Mandatory" is separate from "No duplicate values".** Set both for ID-like fields.

## Form 2: `DocsSub_Subscribers`

One row per email subscriber. **Form link name must be exactly `DocsSub_Subscribers`.**

| Field display name | Field link name | Field type | Validation / notes |
| --- | --- | --- | --- |
| Email | `Email` | **Email** (Basic Fields) | Mandatory, No duplicate values. |
| Confirmed | `Confirmed` | Decision Box (Advanced) | Initial value: unchecked. |
| Unsubscribe_Token | `Unsubscribe_Token` | Single Line | No duplicate values. A workflow seeds it; don't make it Mandatory in the form. |
| Locale | `Locale` | Drop Down | Choices: `en`, `ja`. Initial value: `en`. |
| Status | `Status` | Drop Down | Choices: `Active`, `Unsubscribed`. Initial value: `Active`. |
| Last_Confirmed_At | `Last_Confirmed_At` | Date-Time (Basic Fields → Date, then change to "Date-Time" in field settings) | Optional. |

**Workflow on this form:** Settings → Workflows → On record creation, set `Unsubscribe_Token` to `zoho.currenttime.toString() + zoho.adminuser.toString()` — or any random string Deluge expression. Simpler: a Deluge function `Unsubscribe_Token = zoho.encryption.sha256(input.Email + zoho.currenttime.toString())`. Either works; the Cloud Functions code only requires that the field is populated and unique.

## Form 3: `DocsSub_Subscriptions`

Many-to-many join between `DocsSub_Subscribers` and `DocsSub_Topics`. **Create this form AFTER Subscribers and Topics exist** — the lookup fields below depend on them.

| Field display name | Field link name | Field type | Validation / notes |
| --- | --- | --- | --- |
| Subscriber | `Subscriber` | **Lookup** (Advanced Fields) → choose `DocsSub_Subscribers`, display field `Email` | Mandatory. |
| Topic | `Topic` | **Lookup** (Advanced Fields) → choose `DocsSub_Topics`, display field `Topic_ID` | Mandatory. |
| Status | `Status` | Drop Down | Choices: `Pending`, `Active`, `Unsubscribed`. Initial value: `Active`. |

Lookups in Zoho Creator give you a record picker that points at the linked form's report (`All_DocsSub_Subscribers` / `All_DocsSub_Topics`). The Cloud Functions code queries via `Subscriber.ID` and `Topic.Topic_ID`, which Zoho exposes once the lookup is wired up.

## Form 4: `DocsSub_Pending_Confirmations`

Short-lived double-opt-in tokens. **Form link name must be exactly `DocsSub_Pending_Confirmations`.**

| Field display name | Field link name | Field type | Validation / notes |
| --- | --- | --- | --- |
| Token | `Token` | Single Line | Mandatory, No duplicate values. Increase character maximum to ~100. |
| Email | `Email` | Email | Mandatory. |
| Topic_IDs | `Topic_IDs` | Multi Line | Comma-separated `Topic_ID` values. The Cloud Function packs them. |
| Expires_At | `Expires_At` | Date-Time | Mandatory. |
| Used | `Used` | Decision Box | Initial value: unchecked. |

## Form 5: `DocsSub_Notification_Log`

Audit trail of sent emails. **Form link name must be exactly `DocsSub_Notification_Log`.**

| Field display name | Field link name | Field type | Validation / notes |
| --- | --- | --- | --- |
| Email | `Email` | Email | Mandatory. |
| Topic_ID | `Topic_ID` | Single Line | Mandatory. |
| Subject | `Subject` | Single Line | Mandatory. |
| Sent_At | `Sent_At` | Date-Time | Mandatory. |
| Status | `Status` | Drop Down | Choices: `Sent`, `Failed`, `Bounced`. Initial value: `Sent`. |

## After you save the four forms

Two checks I'd appreciate. They are quick.

1. Open each form's default report (`All_DocsSub_*`) and confirm it exists. Zoho auto-creates one per form, but if any are missing, the Cloud Functions queries will fail.
2. Verify each field link name in the form's **Settings → Fields** view matches the spec above. The Cloud Functions code is hard-wired to these names; a mismatch silently breaks the integration.

When that's done, ping me with anything that drifted from the spec (a field that came out as `Email_field` because Zoho renamed it, for example) and I'll patch the code to match.

## Then we'll do these together

1. Generate the Zoho OAuth refresh token in the API Console. I'll walk you through the steps; you copy the values into Firebase Secret Manager. I never touch the credentials.
2. Seed `DocsSub_Topics` with starter rows (~15 rows: 12 doc sections, 2 channels, optionally a few specific pages). I can do this once the form exists — it's just a sequence of "add record" clicks.
3. Add the Firestore TTL policy on `pending.expiresAt`.
4. Deploy the Cloud Functions.
