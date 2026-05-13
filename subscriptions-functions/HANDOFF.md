# Subscriptions feature — handoff and next steps

This document tracks the state of the docs-subscription rollout: what's deployed, what's coded but not yet deployed, and what still needs a human in the loop.

For the design rationale see [`../project-guides/subscriptions-architecture.md`](../project-guides/subscriptions-architecture.md).

## What's live right now

### Firebase project `zoho-creator-dev`

- **Plan**: Blaze (pay-as-you-go). No upgrade needed.
- **Cloud Firestore**: created. Database ID `(default)`, location **eur3 (Europe multi-region)**. *This location is permanent.*
- **Security rules**: published. Public read on `topics/`; default-deny on everything else. See `firestore.rules`.
- **Collections**: empty. They'll come into existence the first time the functions write to them.
- **Cloud Functions**: not yet deployed. Source is in this directory and ready to ship.

### Zoho Creator workspace `openlm549`

- **Inspected**: only one app, `OpenLM Customerportal`, accessible to Maria.
- **Existing subscriptions infrastructure in that app**: confirmed to be the *product-license* subscription system (form `Create Subscription`, fields `Select Product`, `Select Plan`, `No of Users`, `Billing Cycle`, `ZS Product ID`, `ZS Plan ID`, `ZS Customer ID`, `subscription_id`). Completely unrelated to docs subscriptions — safe to leave alone.
- **Approach**: forms live inside the existing OpenLM Customerportal app, prefixed `DocsSub_`. (We tried three times to elevate Maria to workspace admin in `openlm549` so we could create a separate "Docs Subscriptions" app; Zoho Creator seems to restrict app creation to the account owner regardless of the role.)
- **All 5 forms created and saved** in OpenLM Customerportal:
  - `DocsSub_Topics` — `Topic_ID`, `Name`, `Type` (link name `Topic_Type`; choices Section/Page/Channel), `Slug_Or_Path`, `Description`, `Active`.
  - `DocsSub_Subscribers` — `Email` (unique, mandatory), `Confirmed`, `Unsubscribe_Token`, `Locale` (en/ja), `Status` (Active/Unsubscribed), `Last_Confirmed_At`.
  - `DocsSub_Subscriptions` — `Subscriber` (Lookup → DocsSub_Subscribers, mandatory), `Topic` (Lookup → DocsSub_Topics, mandatory), `Status` (Pending/Active/Unsubscribed).
  - `DocsSub_Pending_Confirmations` — `Token` (mandatory), `Email` (mandatory), `Topic_IDs` (Multi Line), `Expires_At` (Date-Time), `Used` (Decision Box).
  - `DocsSub_Notification_Log` — `Email`, `Topic_ID`, `Subject` (link name `Subject_field` due to Zoho reservation — only used by stubbed `sendDigests`, will patch when implemented), `Sent_At` (Date-Time), `Status` (Sent/Failed/Bounced).
- **Cloud Functions code patched** to use the actual link names (`Topic_Type` instead of `Type`).
- **Workflow on `DocsSub_Subscribers` to seed `Unsubscribe_Token`** — not yet added. The `confirmSubscription` function generates one when a new subscriber row is created via the API, so this is only needed as a safety net for rows created manually via the Zoho UI.

### Docs site React widget

- **`src/components/SubscribeWidget/`** created. TypeScript component (`index.tsx`) plus scoped styles (`index.module.css`). Fetches topics from `listTopics` on mount, renders email + grouped topic checkboxes, calls `subscribe` on submit, handles loading / submitting / submitted / error states. Localised via Docusaurus's `translate`; respects `prefers-reduced-motion`; works light and dark.
- Drop into any MDX page:
  ```mdx
  import SubscribeWidget from '@site/src/components/SubscribeWidget';

  <SubscribeWidget />
  ```
  Or scope it to a subset of topics:
  ```mdx
  <SubscribeWidget onlyTopicIds={["channel:cloud-releases","section:cloud/reports"]} />
  ```
- Confirmed to transpile cleanly against the project's Babel setup.

## What you need to do next, in order

### 1. Generate Zoho OAuth credentials

In the Zoho API Console (`https://api-console.zoho.eu/` for EU, `.com` for US), register a **Server-based Application** named "Docs Subscriptions Backend" and produce:

- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN` — generate via the self-client flow with these scopes: `ZohoCreator.form.CREATE`, `ZohoCreator.report.READ`, `ZohoCreator.report.UPDATE`, `ZohoCreator.meta.READ`.

I should *not* see these values directly. Paste them into Secret Manager yourself:

```bash
cd subscriptions-functions
firebase functions:secrets:set ZOHO_CLIENT_ID
firebase functions:secrets:set ZOHO_CLIENT_SECRET
firebase functions:secrets:set ZOHO_REFRESH_TOKEN
firebase functions:secrets:set ZOHO_OWNER          # value: openlm549
firebase functions:secrets:set ZOHO_APP_LINK_NAME  # value: openlm-customerportal
```

### 2. Decide on an email transport

The `email.js` module supports Postmark, SendGrid, and Mailgun out of the box. Until `EMAIL_PROVIDER_API_KEY` is set, sends are logged-only. To go live:

```bash
firebase functions:secrets:set EMAIL_PROVIDER_API_KEY
firebase functions:secrets:set EMAIL_FROM
# Plus, if using a non-default provider, set EMAIL_PROVIDER and provider-specific extras.
```

My recommendation is Postmark for deliverability; SendGrid if you want a generous free tier.

### 3. Deploy the functions

```bash
cd subscriptions-functions
firebase login
firebase use zoho-creator-dev
npm install --prefix functions
firebase deploy --only firestore:rules,functions
```

Functions deploy to region `europe-west1` (matches the eur3 Firestore location).

### 4. Add the Firestore TTL policy on `pending.expiresAt`

In the Firebase console: **Firestore → Indexes → TTL Policies → Add Policy**. Collection `pending`, field `expiresAt`. Expired confirmation tokens auto-delete after that.

### 5. Run the first sync

Once the Topics form exists in Zoho with at least one active row, kick the sync function once:

```bash
firebase functions:shell
# then in the shell:
syncTopicsFromZoho()
```

Confirm rows appear in Firestore `topics/`.

## What's out of scope for this handoff

- **The `/subscribe/confirmed`, `/subscribe/confirm-error`, `/subscribe/unsubscribed` landing pages** — the Cloud Functions redirect to these paths after a confirm / unsubscribe; they need to exist as MDX pages somewhere under `docs/` (or as static pages under `src/pages/`) before launch. Minimal example: a one-line "You're subscribed" page that imports the docs theme.
- **The digest content-fingerprinting logic** — the `sendDigests` function is stubbed. Wiring it up requires a content source (sitemap walk, Docusaurus build-time export, etc.).
- **Japanese-locale email content** — basic JA strings are in place inside `functions/index.js`; the widget's UI text uses Docusaurus's `translate` so it'll pull from `i18n/ja/code.json` once strings are extracted with `npm run write-translations -- --locale ja`.

## Verification I ran before handing off

- All Cloud Functions JavaScript files parse cleanly under Node 22 (`node --check`).
- `firebase.json`, `.firebaserc`, and `functions/package.json` are valid JSON.
- Firestore collections used by the functions (`topics`, `pending`) match the architecture doc.
- Zoho forms used by the functions (`DocsSub_Subscribers`, `DocsSub_Subscriptions`, `DocsSub_Pending_Confirmations`) match the architecture doc and exist in the Customerportal app.
- Zoho reports used by the functions (`DocsSub_Subscribers_Report`, `DocsSub_Subscriptions_Report`, `DocsSub_Topics_Report`) are the default report names Zoho auto-creates for each form.
- Firestore rules in this repo (`firestore.rules`) match what's published in the console.
- `SubscribeWidget/index.tsx` transpiles via the project's Babel chain (TypeScript + React presets).
