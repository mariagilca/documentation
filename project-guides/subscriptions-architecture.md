# OpenLM release-notes subscription: architecture

This document describes the email-subscription feature on the OpenLM documentation site. Visitors enter an email address, confirm via a double-opt-in link, and receive a short email whenever a new OpenLM release is published — that is, whenever any page under `docs/cloud/changelog/` changes.

This guide is for engineers who maintain the docs site, the Zoho Creator workspace, the Firebase project that runs the subscription pipeline, or the Azure Pipelines CI that triggers notifications.

## Scope and goals

One subscriber list, one type of email, one trigger: a release.

- **Subscriber model.** Anyone can subscribe with an email address. Double-opt-in. No topic picker, no per-section granularity, no preference centre. The list is built around a single global question: *Do you want to know when OpenLM ships a new release?*
- **Notification trigger.** When the docs site deploys via Azure Pipelines and the deploy includes one or more changed files under `docs/cloud/changelog/`, the pipeline POSTs the list of changes to a Cloud Function which fans out one email per subscriber.
- **Notification content.** Each email identifies the affected product or feature by name (e.g. *Broker*, *Workstation Agent*, *License Access Control*) — read from the changelog page's `title` frontmatter. A single-area release gets a tight subject like *"OpenLM Broker — new release"*. A multi-area release gets *"OpenLM updates — Broker, Workstation Agent, Audit"* with a bulleted body.
- **Out of scope.** Per-product subscriptions, security-only channel, monthly-newsletter mode, in-product notifications. All are doable later by adding to the existing infrastructure; none are needed for v1.

## System split

Four moving parts. Each is doing real work; none is gratuitous.

| Component | Role |
| --- | --- |
| **Zoho Creator** (workspace `openlm549`, app `OpenLM Customerportal`) | System of record. Holds the subscriber list (`DocsSub_Subscribers`), the short-lived double-opt-in tokens (`DocsSub_Pending_Confirmations`), and the email-send audit trail (`DocsSub_Notification_Log`). Marketing/docs team reviews subscribers inside the Customerportal app. |
| **Firebase Firestore** (project `zoho-creator-dev`, location `eur3`) | Holds short-lived `pending/{token}` confirmation documents. Nothing else. Topic mirror is gone. |
| **Firebase Cloud Functions** (project `zoho-creator-dev`, region `europe-west1`) | Server layer between the docs widget, Azure Pipelines, and Zoho. Holds OAuth secrets the widget can't see. Sends transactional email via ZeptoMail. |
| **ZeptoMail** | Transactional email transport. Sends confirmation links and release notifications. DKIM, SPF, and bounce-CNAME verified on `openlm.com`. |
| **Azure Pipelines** | CI / deploy pipeline that triggers the notification call after a successful docs deploy. |

```
                  ┌──────────────────────────────────────┐
                  │  OpenLM Customerportal (Zoho)        │
                  │                                      │
                  │  DocsSub_Subscribers                 │
                  │  DocsSub_Pending_Confirmations       │
                  │  DocsSub_Notification_Log            │
                  └─────────────▲────────────────▲───────┘
                                │                │
                  (3) upsert    │                │ (5) fan-out
                                │                │
              ┌─────────────────┴────────────────┴───────┐
              │  Cloud Functions (europe-west1)          │
              │                                          │
              │  subscribe / confirmSubscription /       │
              │  unsubscribe / notifyPagesChanged        │
              └──┬────────────▲──────────────▲───────┬───┘
   (1) email +   │            │              │       │ (6) email
   topic-free    │            │ (4) POST     │       │
   POST          │            │   changes    │       │
                 ▼            │              ▼       ▼
   ┌──────────────────┐  ┌────┴──────┐  ┌────────────────┐
   │ React widget +   │  │ Azure     │  │  ZeptoMail     │
   │ Subscribe button │  │ Pipelines │  │                │
   │ on /cloud/ pages │  │ (after    │  └────────────────┘
   └──────────────────┘  │  rsync)   │
                         └───────────┘

(Firestore pending/{token} sits inside the Cloud Functions layer.)
```

## Trigger semantics

A notification fires when:

1. Azure Pipelines runs successfully on `master`.
2. The script `scripts/notify-changelog-changes.js` runs at the end of the pipeline.
3. `git diff --name-only HEAD~1 HEAD` returns one or more files matching `docs/cloud/changelog/**/*.{mdx,md}`.
4. The script POSTs the change list to `notifyPagesChanged`.
5. The function reads the subscriber list and sends one email per active subscriber.

If no changelog files changed in a deploy, the script exits without calling the function. No email goes out. This is the expected behaviour for the vast majority of deploys (typo fixes, content rewrites, etc.).

### What counts as a release

Each `.mdx` (or `.md`) page under `docs/cloud/changelog/` represents one product or feature. The title in the page's frontmatter is the area name that appears in emails. Adding content to that page is a release event for that product.

Today the changelog is structured as:

```
docs/cloud/changelog/
├── components/       (on-prem components: Broker, Workstation Agent, DSA, …)
└── cloud/            (cloud platform features: Process Sessions, Audit, Projects, …)
```

To add a new product to the release-notes stream, drop a new `.mdx` file under either folder with `title: "Product name"` in frontmatter. The script picks it up automatically the next time that file changes.

### What does *not* count

- Any change outside `docs/cloud/changelog/`. So a typo fix in `/cloud/getting-started/` or a new page under `/cloud/api/` produces no email.
- New files under the changelog — the pipeline notifies on the first commit that adds them, treating the creation as the release event.
- Edits that only touch frontmatter or comments. The current script doesn't differentiate; the editor needs to use judgement and not push trivial changelog edits if they don't represent a real release. (Future refinement: parse the file for a release-block tag, only notify if that tag is present.)
- Edits to the curated `/release-notes/` page (`src/pages/release-notes.js` and the JA mirror) while the `notifyReleaseNotesPage` pipeline variable is `false`. See [Silencing the release-notes page trigger](#silencing-the-release-notes-page-trigger).

### Silencing the release-notes page trigger

The curated `/release-notes/` page is the marketing-style "what's new" surface — image-rich, multi-section, and edited continuously as the next codename release is staged. Every edit that lands on `master` would normally fire a subscriber email, which is too noisy for staging work.

To suppress notifications for the page while you stage upcoming release content, set the pipeline variable `notifyReleaseNotesPage` to `false`. Path:

> Azure DevOps → `OpenLM` project → Pipelines → **OpenLMDocumentation** (pipeline ID 619) → **Edit** → **Variables** (top right) → select / add `notifyReleaseNotesPage` → set value to `false` → **OK** → **Save**.

The script `scripts/notify-changelog-changes.js` reads `process.env.NOTIFY_RELEASE_NOTES_PAGE` (piped through `azure-pipelines.yml`). The gate treats `false`, `0`, and `off` (case-insensitive) as silenced; anything else, including an unset value, behaves as enabled. When silenced and the page is in the diff, the script logs:

```
notify-changelog-changes: /release-notes/ page changed but NOTIFY_RELEASE_NOTES_PAGE is off — skipping page-level notification.
```

The gate is scoped to the page only. Edits to changelog `.mdx` files under `docs/cloud/changelog/` and to `static/release-notes/*.json` continue to notify regardless of the flag.

#### Recommended workflow

This is how OpenLM operates the page today.

1. **Default state — silenced.** `notifyReleaseNotesPage` stays at `false` between releases. Continuous edits to the page (copy refinements, image swaps, video updates, structural changes) deploy without emailing subscribers.
2. **Codename declaration — flip on, ship, flip off.** When you're ready to declare the next version codename:
   1. Set `notifyReleaseNotesPage` to `true` (or delete the variable).
   2. Merge the PR that declares the new codename on the page. The deploy fires one subscriber email for the page.
   3. Set `notifyReleaseNotesPage` back to `false` to silence subsequent edits until the next codename.

The toggle is read at pipeline runtime, not at code merge time. You can flip the variable before or after the merge that you want to silence, as long as the flip lands before that deploy's notify step runs. The pipeline log shows the resolved value.

#### Why a runtime variable, not a code constant

Editors and content owners don't always have repo permissions to land a code change. A pipeline variable is mutable from the Azure DevOps UI, audited there, and reversible in seconds. The code-level alternative would force a PR for every toggle.

## Zoho Creator data model

Three forms live inside the existing **OpenLM Customerportal** Creator application under `openlm549`. Workspace permissions in Creator don't allow a separate app to be created by a non-account-owner, so the subscription data lives alongside the CRM data, separated by the `DocsSub_` prefix.

Each form has a corresponding auto-generated default report at `<FormName>_Report` (so `DocsSub_Subscribers` → `DocsSub_Subscribers_Report`). The Cloud Functions query reports, not forms.

### `DocsSub_Subscribers`

One row per email address.

| Field | Type | Notes |
| --- | --- | --- |
| `Email` | Email, unique, mandatory | The subscriber's address. |
| `Confirmed` | Decision Box | True after the user clicks the confirm link. |
| `Unsubscribe_Token` | Single Line | Opaque random token. Used for one-click global unsubscribe from any release email. Populated by the Cloud Function on insert. |
| `Locale` | Drop Down | `en` or `ja`. Defaults to `en`. |
| `Status` | Drop Down | `Active` or `Unsubscribed`. The notification function queries `Status == "Active" && Confirmed == true`. |
| `Last_Confirmed_At` | Date-Time | Set when the user confirms. Format `dd-MMM-yyyy HH:mm:ss`. |

### `DocsSub_Pending_Confirmations`

Short-lived double-opt-in tokens. Firestore `pending/{token}` is the operational source for confirmation; the Zoho row is for admin visibility.

| Field | Type | Notes |
| --- | --- | --- |
| `Token` | Single Line, unique, mandatory | UUID-derived string from the Cloud Function. |
| `Email` | Email, mandatory | The subscriber the token belongs to. |
| `Topic_IDs` | Multi Line | Legacy field. Always written empty in the simplified model. Kept to avoid a schema migration. |
| `Expires_At` | Date-Time | 24 hours after creation. Format `dd-MMM-yyyy HH:mm:ss`. |
| `Used` | Decision Box | Flipped to true on first successful confirm. |

### `DocsSub_Notification_Log`

Audit trail of sent emails.

| Field | Type | Notes |
| --- | --- | --- |
| `Email` | Email | Recipient. |
| `Topic_ID` | Single Line | `slug` of the single changed area, or `batch:N` for multi-change emails. |
| `Subject` (link name `Subject_field`) | Single Line | Email subject line. Zoho reserves `Subject`, so the link name is auto-renamed. |
| `Sent_At` | Date-Time | |
| `Status` | Drop Down | `Sent`, `Failed`, or `Bounced`. |

### Decommissioned forms

`DocsSub_Topics` and `DocsSub_Subscriptions` were created during the topic-based design exploration and are no longer referenced by any code. They can be marked inactive in Zoho or deleted; nothing breaks either way.

### Zoho integration gotchas

- **Reserved field names get auto-renamed.** `Type` becomes `Type_field`, `Subject` becomes `Subject_field`. We use `Subject_field` directly when writing log rows.
- **Date-Time fields don't accept ISO 8601.** Zoho expects `dd-MMM-yyyy HH:mm:ss` (e.g. `14-May-2026 00:46:52`). The Cloud Functions code uses a `zohoDateTime(date)` helper.
- **Empty report queries return HTTP 404.** Our `zoho.js queryReport` helper catches 404 and treats it as an empty result.
- **Reports are queried by link name with the `_Report` suffix.** `DocsSub_Subscribers` form → `DocsSub_Subscribers_Report` is the default report Zoho creates automatically.

## Firebase project

| Setting | Value |
| --- | --- |
| Project ID | `zoho-creator-dev` |
| Billing plan | Blaze (pay-as-you-go) |
| Firestore location | `eur3` (Europe multi-region — *permanent*) |
| Firestore mode | Production (default-deny rules) |
| Cloud Functions region | `europe-west1` |
| Cloud Functions runtime | Node 22 (2nd gen) |
| Artifact Registry retention | 7 days |

A separate `zoho-creator-prod` project will exist for production. The `.firebaserc` uses an alias scheme; see [Dev and prod environments](#dev-and-prod-environments).

### Firestore collections

- **`pending/{token}`** holds short-lived confirmation tokens. A TTL policy on `expiresAt` cleans them up automatically after 24 hours. Fields: `email`, `locale`, `createdAt`, `expiresAt`, `used`, `confirmedAt`.

That's the only collection in use. The `topics/` collection from the previous design is gone.

### Firestore security rules

Default-deny. The Admin SDK (inside Cloud Functions) is the only writer. Only `pending/` exists, and nothing in it is publicly readable.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Cloud Functions

Four functions, all 2nd gen, all `europe-west1`. Source in [`subscriptions-functions/functions/index.js`](../subscriptions-functions/functions/index.js).

| Function | Trigger | Purpose |
| --- | --- | --- |
| `subscribe` | HTTPS callable | Accepts `{email, locale}` from the widget. Generates a token, writes `pending/{token}` to Firestore, mirrors a row to `DocsSub_Pending_Confirmations`, sends the double-opt-in email via ZeptoMail. |
| `confirmSubscription` | HTTPS | `GET /confirmSubscription?token=…`. Validates the token, upserts a `DocsSub_Subscribers` row with `Confirmed = true`, marks the pending doc used, redirects to `/subscribe/confirmed`. |
| `unsubscribe` | HTTPS | `GET /unsubscribe?token=…`. Looks up the subscriber by `Unsubscribe_Token`, flips `Status` to `Unsubscribed`, redirects to `/subscribe/unsubscribed`. |
| `notifyPagesChanged` | HTTPS (POST, gated) | Accepts `{changes: [{slug, title}]}` from Azure Pipelines (auth via `X-Notify-Token` header). For every active confirmed subscriber, sends one email listing the changes; writes a `DocsSub_Notification_Log` row per send. |

### Secrets

All in Google Secret Manager and bound to each function at deploy time.

| Secret | Value or source | Notes |
| --- | --- | --- |
| `ZOHO_CLIENT_ID` | Zoho API Console → Self Client → Client Secret tab | Stable. |
| `ZOHO_CLIENT_SECRET` | Same | Stable. |
| `ZOHO_REFRESH_TOKEN` | Self Client → Generate Code → exchange via curl | Doesn't expire unless revoked. Rotate every 12 months. |
| `ZOHO_OWNER` | `openlm549` | Workspace identifier. |
| `ZOHO_APP_LINK_NAME` | `openlm-customerportal` | Creator app link name. |
| `EMAIL_PROVIDER` | `zeptomail` | Drives the `email.js` branch. Set to `log` for log-only dev. |
| `EMAIL_PROVIDER_API_KEY` | ZeptoMail console → Agent → API tab → Send Mail Token | Required for real sends. Code accepts the value with or without the `Zoho-enczapikey ` prefix. |
| `EMAIL_FROM` | `docs@openlm.com` | Must match a DKIM-verified domain in ZeptoMail. |
| `NOTIFY_PIPELINE_TOKEN` | Random string (e.g. `openssl rand -hex 32`) | Required in the `X-Notify-Token` header on every `notifyPagesChanged` POST. Also set as `notifyPipelineToken` variable in Azure Pipelines. |

Optional: `ZEPTOMAIL_HOST` if the ZeptoMail account is on the EU region (`api.zeptomail.eu`). Defaults to `api.zeptomail.com`.

## React widget and button

Two surfaces, both rendering the same call.

### `SubscribeWidget` — full surface

Path: `src/components/SubscribeWidget/index.tsx`. Used on the dedicated `/subscribe` page. Renders a heading, a one-line explanation, an email field, and a submit button. Self-contained, no Firebase SDK dependency, calls `subscribe` via `fetch` using the callable wire format.

### `SubscribeButton` — utility surface

Path: `src/components/SubscribeButton/index.tsx`. Small button styled like Copy page and Focus mode (same dimensions, same colour variables, same `top: -0.15em` nudge to align with H1s). Click opens a centred modal using the native `<dialog>` element (built-in focus trap, Esc to close, click backdrop to close — no extra libraries). Modal contains the email field and a submit button.

### Where the button mounts

Injected via two theme swizzles:

| Swizzle file | Where the button lands | Gate |
| --- | --- | --- |
| `src/theme/DocItem/Layout/index.tsx` | Breadcrumb row of every individual doc page, between `<DocBreadcrumbs />` and `<FocusModeToggle />`. | Only renders when the URL path starts with `/cloud/`. Hidden in Focus Mode. |
| `src/theme/DocCategoryGeneratedIndexPage/index.tsx` | Category landing pages — *currently no SubscribeButton injection*. (We removed it; the title-row already has the Copy link utility, and the per-doc-page button covers discoverability.) | n/a |

The `/cloud/` gate is intentional. `/legacy/` is in maintenance mode and doesn't get the follow affordance.

### Landing pages

Five MDX-via-JS landing pages under `src/pages/subscribe/`. Cloud Functions redirect to these after subscribe / confirm / unsubscribe events.

- `confirmed.js` — successful double-opt-in.
- `confirm-error.js` — confirmation failed (reason is read from `?reason=` query param).
- `already-confirmed.js` — confirm link used a second time.
- `unsubscribed.js` — successful unsubscribe.
- `unsubscribe-error.js` — unsubscribe link couldn't be processed.

## Email transport

We use **ZeptoMail** (Zoho's transactional service). Reasons: integrated with the existing Zoho billing, generous free tier (10k/month free for first six months), comparable deliverability to Postmark / SendGrid, purpose-built for transactional traffic.

### Domain authentication

`docs@openlm.com` is the sender. Three DNS records on the `openlm.com` zone:

| Record | Type | Host | Purpose |
| --- | --- | --- | --- |
| Domain verification | TXT | one-time token from ZeptoMail | Proves you control the domain. |
| DKIM | TXT | `<selector>._domainkey` (selector provided by ZeptoMail) | Cryptographic signing key. |
| Bounce return-path | CNAME | `bounce-zem` → `cluster89.zeptomail.com` | Lets ZeptoMail receive and classify bounces / complaints. |
| SPF (optional but recommended) | TXT | `@` (root) | Authorizes ZeptoMail to send for the domain. Must extend, not replace, any existing SPF record. |
| DMARC (optional) | TXT | `_dmarc` | Policy for handling unauthenticated mail. |

### Implementation

`email.js` exports `sendEmail({to, subject, html, text})`. It branches on `process.env.EMAIL_PROVIDER`:

- `log` (default): logs and skips. Safe for dev without credentials.
- `zeptomail`: POSTs to `https://api.zeptomail.eu/v1.1/email` or `.com`.
- `postmark`, `sendgrid`, `mailgun`: fallback branches retained for future flexibility.

## Data flow walkthroughs

### A visitor subscribes

1. Visitor opens a /cloud/ doc page. The breadcrumb row shows a small **Subscribe** button (alongside Copy page and Focus Mode).
2. Click → modal opens. Visitor types email, clicks Subscribe.
3. Widget POSTs `{email, locale}` to the `subscribe` Cloud Function.
4. Function generates a random token, writes `pending/{token}` to Firestore with `expiresAt` 24 hours out, mirrors a `DocsSub_Pending_Confirmations` row in Zoho for admin visibility, sends the double-opt-in email via ZeptoMail with a link of the form `…/confirmSubscription?token=…`.
5. Function returns `{ok: true}`. Modal flips to "Check your inbox."

### Visitor confirms

1. Visitor opens the link from the confirmation email. The link targets `confirmSubscription` directly (not proxied through the docs site).
2. Function looks up `pending/{token}` in Firestore, validates (exists, not used, not expired).
3. Function upserts a `DocsSub_Subscribers` row: existing email → update `Confirmed=true`, `Status=Active`, `Last_Confirmed_At=now`; new email → insert with a fresh `Unsubscribe_Token`.
4. Function marks the pending doc `used=true` with `confirmedAt` timestamp.
5. Function redirects the visitor's browser (HTTP 302) to `https://openlm.com/documentation/subscribe/confirmed?locale={en|ja}`.

### A release ships

1. A docs author merges a PR that updates `docs/cloud/changelog/components/broker.mdx`. The PR merges to `master`.
2. Azure Pipelines builds the site, runs accessibility checks, opens the AWS security group, rsyncs the new build to `openlm.com`, closes the security group.
3. The last pipeline step runs `node scripts/notify-changelog-changes.js`.
4. Script runs `git diff --name-only HEAD~1 HEAD`, filters to `docs/cloud/changelog/**.mdx` matches. Finds `docs/cloud/changelog/components/broker.mdx`.
5. Script reads frontmatter, gets `title: Broker`. Builds change payload `[{slug: "/cloud/changelog/components/broker", title: "Broker"}]`.
6. Script POSTs to `notifyPagesChanged` with the `X-Notify-Token` header set to the shared secret.
7. Function authenticates the header, queries Zoho for `Status == "Active" && Confirmed == true` subscribers.
8. For each subscriber, function sends an email with subject *"OpenLM Broker — new release"* via ZeptoMail and writes a `DocsSub_Notification_Log` row.

If the PR also touched `docs/cloud/changelog/cloud/audit.mdx`, the email subject becomes *"OpenLM updates — Broker, Audit"* with a bulleted body linking to both pages.

### A subscriber unsubscribes

1. Every release email includes an unsubscribe link tied to the subscriber's `Unsubscribe_Token`.
2. Click → `unsubscribe?token=…`. Function looks up the subscriber, flips `Status` to `Unsubscribed`.
3. No records are deleted — admins retain the full audit trail.
4. Function redirects to `/subscribe/unsubscribed`.

## Deployment

### First-time setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Authenticate
firebase login

# From the docs repo root
cd subscriptions-functions
firebase use zoho-creator-dev
npm install --prefix functions
```

### Setting secrets

```bash
firebase functions:secrets:set ZOHO_CLIENT_ID
firebase functions:secrets:set ZOHO_CLIENT_SECRET
firebase functions:secrets:set ZOHO_REFRESH_TOKEN
firebase functions:secrets:set ZOHO_OWNER                # openlm549
firebase functions:secrets:set ZOHO_APP_LINK_NAME        # openlm-customerportal
firebase functions:secrets:set EMAIL_PROVIDER            # zeptomail (or log)
firebase functions:secrets:set EMAIL_PROVIDER_API_KEY    # ZeptoMail Send Mail Token
firebase functions:secrets:set EMAIL_FROM                # docs@openlm.com
firebase functions:secrets:set NOTIFY_PIPELINE_TOKEN     # openssl rand -hex 32
```

### Deploy

```bash
firebase deploy --only firestore:rules,functions
```

### Azure Pipelines variables

Set in Azure DevOps → pipeline → Variables tab (or Library variable group):

| Variable | Value |
| --- | --- |
| `notifyUrl` | `https://europe-west1-zoho-creator-dev.cloudfunctions.net/notifyPagesChanged` |
| `notifyPipelineToken` | Same value as the `NOTIFY_PIPELINE_TOKEN` Firebase secret. |
| `notifyReleaseNotesPage` *(optional)* | `false` to silence the curated `/release-notes/` page trigger, `true` (or unset) to fire notifications for page edits. See [Silencing the release-notes page trigger](#silencing-the-release-notes-page-trigger). |

The pipeline step that uses them is already in [`azure-pipelines.yml`](../azure-pipelines.yml).

## Local development

```bash
firebase emulators:start --only functions,firestore
```

Functions run at `http://localhost:5001/zoho-creator-dev/europe-west1/<functionName>`. Firestore emulator at `http://localhost:8080`. Functions shell available with `firebase functions:shell --project zoho-creator-dev` (shell runs against production Firestore and production Zoho unless emulators are also started — use carefully).

To test the notification path locally without triggering a real send, set `EMAIL_PROVIDER=log` in the function's binding before running. The function logs the email instead of sending. Combine with the functions shell to invoke `notifyPagesChanged` directly:

```bash
firebase functions:shell --project zoho-creator-dev
# at the prompt:
notifyPagesChanged.post('http://localhost:5001/zoho-creator-dev/europe-west1/notifyPagesChanged')
  .set('X-Notify-Token', 'the-secret')
  .send({changes: [{slug: '/cloud/changelog/components/broker', title: 'Broker'}]})
```

## Operational notes

- **The `Unsubscribe_Token` is the only way back into a subscriber row from an email link.** Don't delete subscriber rows; flip `Status` to `Unsubscribed` instead. Deleting would orphan any unsubscribe links already in subscribers' inboxes.
- **The TTL policy on Firestore `pending.expiresAt`** auto-deletes confirmation tokens 24 hours after creation. Add it from the Firebase console: Firestore → Indexes → TTL Policies. (Still pending.)
- **Rotate the Zoho refresh token** every twelve months. Old refresh tokens can be revoked from the Zoho API Console.
- **The `NOTIFY_PIPELINE_TOKEN` is the only thing standing between someone on the open internet and a broadcast email to all subscribers.** Rotate it if you suspect leak. Update both the Firebase secret and the Azure Pipelines variable atomically — one-at-a-time will cause notifications to fail.
- **Logs** are the first place to look when something fails. `firebase functions:log --only <name> --project zoho-creator-dev | tail -20`. Each function logs the email and the last four characters of any token, plus the outcome.
- **The pipeline's `git diff HEAD~1 HEAD` assumes squash-merge** (one merge commit per deploy). If a deploy includes multiple commits via a rebase merge, only the most recent commit's changes will be in the diff. For OpenLM's current workflow this is fine; if it stops being fine, change the script to diff against the previous successful build's source version (Azure provides this).
- **The `notifyReleaseNotesPage` pipeline variable silences page-level notifications.** OpenLM keeps it at `false` between codename releases so staging edits don't email subscribers. Flip to `true` (or delete it) just before the codename-declaration merge, then flip back to `false` for the next staging cycle. See [Silencing the release-notes page trigger](#silencing-the-release-notes-page-trigger).

## Dev and prod environments

`zoho-creator-dev` is the current target. When we promote to production:

```jsonc
// subscriptions-functions/.firebaserc
{
  "projects": {
    "default": "zoho-creator-dev",
    "dev":     "zoho-creator-dev",
    "prod":    "zoho-creator-prod"
  }
}
```

Production must:

- Have its own Firestore database (`eur3`).
- Have all nine secrets set independently.
- Use a separate ZeptoMail sender domain or a separate "agent" within the same domain so dev test emails don't pollute production reputation.
- Have its own `NOTIFY_PIPELINE_TOKEN`, set in Azure Pipelines as a different variable (e.g. `notifyPipelineTokenProd`).
- Have the widget's `FUNCTIONS_BASE` resolved at build time based on the target environment.

## Known gotchas (cheat sheet)

| Symptom | Cause | Fix |
| --- | --- | --- |
| Zoho insert returns code 3002 about a date field | ISO 8601 date sent instead of `dd-MMM-yyyy HH:mm:ss` | Use `zohoDateTime()` helper. |
| `Request failed with status code 404` from a Zoho `queryReport` call | Empty result | `queryReport` catches 404 and returns `[]`. Anything else is a real error. |
| Deploy fails: "Couldn't find firebase-functions package" | Forgot `npm install` in `functions/` | `npm install --prefix functions` then retry. |
| Deploy fails: secrets validation 404 | Secret declared in function code but not set in Secret Manager | Run `firebase functions:secrets:set <NAME>` for each. |
| `notifyPagesChanged` returns 401 | Missing or wrong `X-Notify-Token` header | Confirm the pipeline's `notifyPipelineToken` variable matches the function's `NOTIFY_PIPELINE_TOKEN` secret. |
| Pipeline never POSTs even though changelog files changed | `GIT_BASE` mismatch | Set `GIT_BASE` env var in the pipeline step to the previous successful build's commit. |
| Subscriber complains about not getting any emails | They subscribed but never confirmed | Check `DocsSub_Pending_Confirmations` for an unused token, or `DocsSub_Subscribers.Confirmed = false`. |

## What's out of scope for this document

- **Per-product subscription channels.** If we later need separate "release notes" and "security advisories" lists, we'll add a `Channel` column to `DocsSub_Subscribers` and let subscribers pick at signup.
- **In-product notifications.** OpenLM Platform could surface a banner ("new release") inside the product; that's a separate integration with its own delivery mechanism.
- **Subscriber-facing preference centre.** Currently the only self-service action is unsubscribe; adding a "manage preferences" page would require a token-protected web view backed by Zoho.
