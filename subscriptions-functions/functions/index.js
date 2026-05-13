/**
 * Cloud Functions for the OpenLM docs subscription feature.
 *
 * Simplified architecture: one global subscriber list. No topics, no
 * per-section granularity. When the docs deploy ships, Azure Pipelines
 * POSTs the list of changed pages to `notifyPagesChanged`, which fans
 * out one email per active subscriber.
 *
 * Functions in this file:
 *   subscribe              HTTPS callable from the widget. Takes {email}.
 *   confirmSubscription    HTTPS, link target in the confirm email.
 *   unsubscribe            HTTPS, link target in any sent email.
 *   notifyPagesChanged     HTTPS, invoked by Azure Pipelines after deploy.
 *
 * All functions deploy to region europe-west1. Secrets are bound at
 * deploy time from Google Secret Manager; see ../README.md for the list.
 *
 * Source-of-truth strategy: Zoho Creator holds Subscribers,
 * Pending_Confirmations, and Notification_Log. Firestore only stores
 * short-lived `pending/{token}` docs for the double-opt-in flow.
 */

const {randomUUID} = require("crypto");
const {onCall, onRequest, HttpsError} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

const zoho = require("./zoho");
const {sendEmail} = require("./email");

admin.initializeApp();
const db = admin.firestore();

setGlobalOptions({region: "europe-west1", maxInstances: 10});

const ZOHO_SECRETS = [
  "ZOHO_CLIENT_ID",
  "ZOHO_CLIENT_SECRET",
  "ZOHO_REFRESH_TOKEN",
  "ZOHO_OWNER",
  "ZOHO_APP_LINK_NAME",
];
const EMAIL_SECRETS = [
  "EMAIL_PROVIDER",
  "EMAIL_PROVIDER_API_KEY",
  "EMAIL_FROM",
];
// Shared secret required in the X-Notify-Token header on
// notifyPagesChanged calls. Prevents anyone on the open internet from
// triggering broadcast emails.
const NOTIFY_SECRETS = ["NOTIFY_PIPELINE_TOKEN"];

const DOCS_BASE = "https://openlm.com/documentation";
// Direct Cloud Function URLs inside outgoing emails. When we set up an
// nginx proxy on openlm.com forwarding /documentation/api/subscribe/*,
// flip this back to `${DOCS_BASE}/api/subscribe`.
const FUNCTIONS_PUBLIC_BASE =
  "https://europe-west1-zoho-creator-dev.cloudfunctions.net";
const CONFIRM_TTL_HOURS = 24;
const TOKEN_TAIL_FOR_LOGS = (t) => (t ? t.slice(-4) : "");

// Zoho Creator Date-Time fields expect "dd-MMM-yyyy HH:mm:ss" (e.g.
// "14-May-2026 00:46:52"), not ISO 8601. Helper produces that shape
// from any Date instance, using UTC components.
const ZOHO_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function zohoDateTime(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return [
    pad(date.getUTCDate()),
    ZOHO_MONTHS[date.getUTCMonth()],
    date.getUTCFullYear(),
  ].join("-") + " " + [
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
  ].join(":");
}

// ---------------------------------------------------------------------------
// subscribe — create a pending confirmation, send the double-opt-in email.
// ---------------------------------------------------------------------------

exports.subscribe = onCall(
  {secrets: [...ZOHO_SECRETS, ...EMAIL_SECRETS], cors: true},
  async (req) => {
    const {email, locale = "en"} = req.data || {};

    if (!isValidEmail(email)) {
      throw new HttpsError("invalid-argument", "A valid email is required.");
    }

    const token = randomUUID() + randomUUID().replace(/-/g, "");
    const now = admin.firestore.Timestamp.now();
    const expiresAt = admin.firestore.Timestamp.fromMillis(
      Date.now() + CONFIRM_TTL_HOURS * 60 * 60 * 1000,
    );

    await db.collection("pending").doc(token).set({
      email,
      locale,
      createdAt: now,
      expiresAt,
    });

    try {
      await zoho.insertForm("DocsSub_Pending_Confirmations", {
        Token: token,
        Email: email,
        Topic_IDs: "", // legacy field; left empty in the simplified model
        Expires_At: zohoDateTime(expiresAt.toDate()),
        Used: false,
      });
    } catch (err) {
      // Firestore is the operational source for confirmation; the Zoho
      // row is only for admin visibility. Continue on failure.
      logger.error("Zoho pending insert failed", {err: err.message});
    }

    const confirmUrl = `${FUNCTIONS_PUBLIC_BASE}/confirmSubscription?token=${encodeURIComponent(token)}`;
    await sendEmail({
      to: email,
      subject: locale === "ja"
        ? "OpenLMドキュメントの購読を確認してください"
        : "Confirm your OpenLM docs subscription",
      html: confirmEmailHtml({confirmUrl, locale}),
      text: confirmEmailText({confirmUrl, locale}),
    });

    logger.info("subscribe: pending created", {
      email, tokenTail: TOKEN_TAIL_FOR_LOGS(token),
    });
    return {ok: true};
  },
);

// ---------------------------------------------------------------------------
// confirmSubscription — token-clicking endpoint.
// ---------------------------------------------------------------------------

exports.confirmSubscription = onRequest(
  {secrets: [...ZOHO_SECRETS]},
  async (req, res) => {
    const token = req.query.token;
    if (!token || typeof token !== "string") {
      return res.redirect(`${DOCS_BASE}/subscribe/confirm-error?reason=missing_token`);
    }

    const ref = db.collection("pending").doc(token);
    const snap = await ref.get();
    if (!snap.exists) {
      return res.redirect(`${DOCS_BASE}/subscribe/confirm-error?reason=unknown_token`);
    }
    const pending = snap.data();
    if (pending.expiresAt.toMillis() < Date.now()) {
      return res.redirect(`${DOCS_BASE}/subscribe/confirm-error?reason=expired`);
    }
    if (pending.used) {
      return res.redirect(`${DOCS_BASE}/subscribe/already-confirmed`);
    }

    try {
      // Upsert the Subscriber row.
      const existing = await zoho.queryReport(
        "DocsSub_Subscribers_Report",
        `Email == "${pending.email}"`,
        1,
      );
      const nowZoho = zohoDateTime(new Date());
      if (existing.length > 0) {
        await zoho.updateRecord("DocsSub_Subscribers_Report", existing[0].ID, {
          Confirmed: true,
          Status: "Active",
          Locale: pending.locale,
          Last_Confirmed_At: nowZoho,
        });
      } else {
        await zoho.insertForm("DocsSub_Subscribers", {
          Email: pending.email,
          Confirmed: true,
          Status: "Active",
          Locale: pending.locale,
          Unsubscribe_Token: randomUUID(),
          Last_Confirmed_At: nowZoho,
        });
      }

      await ref.update({used: true, confirmedAt: admin.firestore.Timestamp.now()});

      logger.info("confirmSubscription: success", {
        email: pending.email,
        tokenTail: TOKEN_TAIL_FOR_LOGS(token),
      });
      return res.redirect(`${DOCS_BASE}/subscribe/confirmed?locale=${pending.locale}`);
    } catch (err) {
      logger.error("confirmSubscription: zoho failure", {
        err: err.message, tokenTail: TOKEN_TAIL_FOR_LOGS(token),
      });
      return res.redirect(`${DOCS_BASE}/subscribe/confirm-error?reason=server`);
    }
  },
);

// ---------------------------------------------------------------------------
// unsubscribe — one-click endpoint linked from every email footer.
// ---------------------------------------------------------------------------

exports.unsubscribe = onRequest(
  {secrets: [...ZOHO_SECRETS]},
  async (req, res) => {
    const token = req.query.token;
    if (!token || typeof token !== "string") {
      return res.redirect(`${DOCS_BASE}/subscribe/unsubscribe-error`);
    }
    try {
      const subs = await zoho.queryReport(
        "DocsSub_Subscribers_Report",
        `Unsubscribe_Token == "${token}"`,
        1,
      );
      if (subs.length === 0) {
        return res.redirect(`${DOCS_BASE}/subscribe/unsubscribe-error`);
      }
      await zoho.updateRecord("DocsSub_Subscribers_Report", subs[0].ID, {
        Status: "Unsubscribed",
      });
      return res.redirect(`${DOCS_BASE}/subscribe/unsubscribed`);
    } catch (err) {
      logger.error("unsubscribe: failure", {err: err.message});
      return res.redirect(`${DOCS_BASE}/subscribe/unsubscribe-error`);
    }
  },
);

// ---------------------------------------------------------------------------
// notifyPagesChanged — Azure Pipelines posts after a docs deploy.
//
// Payload:
//   {
//     "changes": [
//       {"slug": "/cloud/reports/customising-reports", "title": "Customising reports"},
//       {"slug": "/cloud/changelog/2026-05", "title": "Changelog: May 2026"}
//     ]
//   }
//
// Header (required):
//   X-Notify-Token: <NOTIFY_PIPELINE_TOKEN>
//
// For each active subscriber, we send one email listing every changed
// page in the batch and write one DocsSub_Notification_Log row.
// ---------------------------------------------------------------------------

exports.notifyPagesChanged = onRequest(
  {
    secrets: [...ZOHO_SECRETS, ...EMAIL_SECRETS, ...NOTIFY_SECRETS],
    timeoutSeconds: 540,
    cors: false,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({error: "Method not allowed"});
      return;
    }
    if (req.get("X-Notify-Token") !== process.env.NOTIFY_PIPELINE_TOKEN) {
      logger.warn("notifyPagesChanged: rejected (bad/missing X-Notify-Token)");
      res.status(401).json({error: "Unauthorized"});
      return;
    }

    const changes = Array.isArray(req.body?.changes) ? req.body.changes : [];
    if (changes.length === 0) {
      res.status(400).json({error: "No changes provided"});
      return;
    }

    // Sanity cap so a malformed payload can't burn through Cloud
    // Functions budget. Real docs deploys touch a handful of pages, not
    // hundreds.
    if (changes.length > 500) {
      res.status(400).json({error: "Too many changes in one batch (max 500)"});
      return;
    }

    // Fetch every Active, Confirmed subscriber once.
    const subscribers = await zoho.queryReport(
      "DocsSub_Subscribers_Report",
      `Status == "Active" && Confirmed == true`,
      5000,
    );

    if (subscribers.length === 0) {
      logger.info("notifyPagesChanged: no subscribers to notify");
      res.json({sent: 0, failed: 0, changeCount: changes.length});
      return;
    }

    let sent = 0;
    let failed = 0;
    const nowZoho = zohoDateTime(new Date());

    for (const sub of subscribers) {
      const email = sub.Email;
      const unsubToken = sub.Unsubscribe_Token;
      const locale = (sub.Locale || "en").toLowerCase() === "ja" ? "ja" : "en";
      const unsubUrl = `${FUNCTIONS_PUBLIC_BASE}/unsubscribe?token=${encodeURIComponent(unsubToken)}`;

      try {
        await sendEmail({
          to: email,
          subject: digestSubject(changes, locale),
          html: digestEmailHtml({changes, unsubUrl, locale}),
          text: digestEmailText({changes, unsubUrl, locale}),
        });
        sent++;
        // Best-effort log row. Don't fail the whole batch on a log error.
        zoho.insertForm("DocsSub_Notification_Log", {
          Email: email,
          Topic_ID: changes.length === 1 ? changes[0].slug : `batch:${changes.length}`,
          Subject_field: digestSubject(changes, locale),
          Sent_At: nowZoho,
          Status: "Sent",
        }).catch(() => {});
      } catch (err) {
        failed++;
        logger.error("notifyPagesChanged: send failed", {
          email, err: err.message,
        });
        zoho.insertForm("DocsSub_Notification_Log", {
          Email: email,
          Topic_ID: changes.length === 1 ? changes[0].slug : `batch:${changes.length}`,
          Subject_field: digestSubject(changes, locale),
          Sent_At: nowZoho,
          Status: "Failed",
        }).catch(() => {});
      }
    }

    logger.info("notifyPagesChanged: done", {
      sent, failed, changeCount: changes.length, subscriberCount: subscribers.length,
    });
    res.json({sent, failed, changeCount: changes.length});
  },
);

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function isValidEmail(email) {
  if (typeof email !== "string") return false;
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- confirmation email -----------------------------------------------------

function confirmEmailHtml({confirmUrl, locale}) {
  const heading = locale === "ja"
    ? "OpenLMドキュメントの購読を確認してください"
    : "Confirm your OpenLM docs subscription";
  const body = locale === "ja"
    ? `<p>下のリンクをクリックして、OpenLMドキュメント更新の購読を確定してください。</p>`
    : `<p>Click the link below to confirm your subscription. We'll email you when any docs page changes.</p>`;
  const cta = locale === "ja" ? "購読を確認する" : "Confirm subscription";
  const expiry = locale === "ja"
    ? `${CONFIRM_TTL_HOURS}時間以内にご確認ください。`
    : `The link expires in ${CONFIRM_TTL_HOURS} hours. If you didn't sign up, ignore this email.`;
  return `
    <!doctype html>
    <html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h1 style="font-size: 20px;">${heading}</h1>
      ${body}
      <p style="margin: 32px 0;">
        <a href="${confirmUrl}" style="background: #1d4ed8; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none;">${cta}</a>
      </p>
      <p style="color: #6b7280; font-size: 13px;">${expiry}</p>
    </body></html>
  `;
}

function confirmEmailText({confirmUrl, locale}) {
  if (locale === "ja") {
    return `OpenLMドキュメントの購読を確認するには、以下のリンクを開いてください:\n\n${confirmUrl}\n\n${CONFIRM_TTL_HOURS}時間以内にご確認ください。`;
  }
  return `Confirm your OpenLM docs subscription by opening this link:\n\n${confirmUrl}\n\nThis link expires in ${CONFIRM_TTL_HOURS} hours. If you didn't sign up, ignore this email.`;
}

// --- change-notification email ---------------------------------------------

/**
 * Build the email subject for a release-notification batch.
 *   1 area changed → "OpenLM Broker — new release"
 *   N areas changed → "OpenLM updates — Broker, Workstation Agent, Audit"
 *
 * "title" in each change object is the human-readable area name (read
 * from the changelog page's frontmatter title by the pipeline).
 */
function digestSubject(changes, locale) {
  if (changes.length === 1) {
    return locale === "ja"
      ? `OpenLM ${changes[0].title} — 新しいリリース`
      : `OpenLM ${changes[0].title} — new release`;
  }
  const names = changes.map((c) => c.title).join(", ");
  return locale === "ja"
    ? `OpenLM アップデート — ${names}`
    : `OpenLM updates — ${names}`;
}

function digestEmailHtml({changes, unsubUrl, locale}) {
  const isMulti = changes.length > 1;
  const intro = locale === "ja"
    ? (isMulti
      ? `<p>${changes.length}件のOpenLM製品で新しいリリースがあります:</p>`
      : `<p>OpenLM ${escapeHtml(changes[0].title)} に新しいリリースがあります。</p>`)
    : (isMulti
      ? `<p>${changes.length} OpenLM products have new releases:</p>`
      : `<p>OpenLM <strong>${escapeHtml(changes[0].title)}</strong> has a new release.</p>`);

  let body;
  if (isMulti) {
    const items = changes.map((c) => {
      const url = `${DOCS_BASE}${c.slug.startsWith("/") ? c.slug : "/" + c.slug}`;
      return `<li><a href="${url}">${escapeHtml(c.title)}</a></li>`;
    }).join("");
    body = `<ul style="line-height: 1.7;">${items}</ul>`;
  } else {
    const c = changes[0];
    const url = `${DOCS_BASE}${c.slug.startsWith("/") ? c.slug : "/" + c.slug}`;
    const cta = locale === "ja" ? "リリースノートを見る" : "See what changed";
    body = `<p style="margin: 28px 0;">
        <a href="${url}" style="background: #1d4ed8; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none;">${cta}</a>
      </p>`;
  }

  const unsubLabel = locale === "ja" ? "購読を解除する" : "Unsubscribe";
  return `
    <!doctype html>
    <html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      ${intro}
      ${body}
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
      <p style="color: #6b7280; font-size: 13px;">
        <a href="${unsubUrl}" style="color: #6b7280;">${unsubLabel}</a>
      </p>
    </body></html>
  `;
}

function digestEmailText({changes, unsubUrl, locale}) {
  const isMulti = changes.length > 1;
  let intro;
  let lines;
  if (isMulti) {
    intro = locale === "ja"
      ? `${changes.length}件のOpenLM製品で新しいリリースがあります:`
      : `${changes.length} OpenLM products have new releases:`;
    lines = changes.map((c) => {
      const url = `${DOCS_BASE}${c.slug.startsWith("/") ? c.slug : "/" + c.slug}`;
      return `- ${c.title}\n  ${url}`;
    }).join("\n");
  } else {
    const c = changes[0];
    const url = `${DOCS_BASE}${c.slug.startsWith("/") ? c.slug : "/" + c.slug}`;
    intro = locale === "ja"
      ? `OpenLM ${c.title} に新しいリリースがあります。`
      : `OpenLM ${c.title} has a new release.`;
    lines = url;
  }
  const unsubLabel = locale === "ja" ? "購読を解除する" : "Unsubscribe";
  return `${intro}\n\n${lines}\n\n---\n${unsubLabel}: ${unsubUrl}\n`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
