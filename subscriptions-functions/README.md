# Docs subscriptions — Firebase backend

The Cloud Functions, Firestore rules, and Firebase config for the documentation topic-subscription feature. Sits next to the docs site but deploys independently to the Firebase project `zoho-creator-dev`.

For the design overview (data model, request flows, Zoho schema) see [`../project-guides/subscriptions-architecture.md`](../project-guides/subscriptions-architecture.md).

## Prerequisites

- Node 22 (matches the runtime the functions deploy with)
- Firebase CLI: `npm install -g firebase-tools`
- gcloud CLI for managing Secret Manager values (optional — the Firebase CLI can do this too)
- Owner or Editor access on the `zoho-creator-dev` GCP project

## First-time setup

```bash
cd subscriptions-functions
firebase login
firebase use zoho-creator-dev
npm install --prefix functions
```

## Configure secrets

The functions read the following secrets from Google Secret Manager. Create each one with `firebase functions:secrets:set`:

```bash
firebase functions:secrets:set ZOHO_CLIENT_ID
firebase functions:secrets:set ZOHO_CLIENT_SECRET
firebase functions:secrets:set ZOHO_REFRESH_TOKEN
firebase functions:secrets:set ZOHO_OWNER             # value: openlm549
firebase functions:secrets:set ZOHO_APP_LINK_NAME     # value: openlm-customerportal
firebase functions:secrets:set EMAIL_PROVIDER_API_KEY # transactional email provider key
firebase functions:secrets:set EMAIL_FROM             # for example: docs@openlm.com
```

To generate the three `ZOHO_*` auth values, see the credentials section in the architecture guide.

## Deploy

```bash
firebase deploy --only firestore:rules,functions
```

Firestore rules and all functions go up together. To deploy a single function:

```bash
firebase deploy --only functions:subscribe
```

## Local development

```bash
firebase emulators:start --only functions,firestore
```

Functions then run at `http://localhost:5001/zoho-creator-dev/europe-west1/<functionName>`.

## What's here

| Path | Purpose |
| --- | --- |
| `firebase.json` | Firebase project config: function source dir, Firestore rules path, emulator ports. |
| `firestore.rules` | Source of the security rules deployed to Firestore. Mirrors what's live in the console. |
| `functions/package.json` | Node 22, firebase-admin, firebase-functions, axios for the Zoho REST API. |
| `functions/index.js` | All HTTPS and scheduled functions: `subscribe`, `confirmSubscription`, `unsubscribe`, `listTopics`, `syncTopicsFromZoho`, `sendDigests`. |
| `functions/zoho.js` | Thin Zoho Creator v2 REST client: refresh-token handling, form-insert, report-query, report-update. |
| `functions/email.js` | Pluggable transactional-email transport. Defaults to a no-op until `EMAIL_PROVIDER_API_KEY` is set. |

## Email transport

The `email.js` module exports `sendEmail({to, subject, html, text})`. The default implementation logs and skips sending. To wire up a real provider, replace the body of `sendEmail` with a call to the provider's HTTPS API. See `email.js` for the Postmark, SendGrid, and Mailgun sketches.

## Operational checks after deploying

1. Hit `listTopics`: `curl https://europe-west1-zoho-creator-dev.cloudfunctions.net/listTopics`. Expect `{topics: []}` until the first sync runs.
2. Run the sync manually: `firebase functions:shell` → `syncTopicsFromZoho()`. Then re-hit `listTopics`.
3. Hit `subscribe` with a test email. Confirm a row appears in Zoho `Pending_Confirmations` and a confirmation email is sent (or logged, if no email provider is wired up).
