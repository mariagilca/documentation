/**
 * Pluggable transactional-email transport.
 *
 * The default implementation logs and skips the send so the rest of the
 * pipeline can run in dev without a real provider. To wire up a real
 * provider, replace the body of `sendEmail` with one of the sketches
 * below — they each cover one HTTPS round trip.
 *
 * Recommended providers, in order of cost-effectiveness for our volume:
 *   - Postmark (https://postmarkapp.com/) — best deliverability, ~$15/mo for 10k.
 *   - SendGrid (https://sendgrid.com/) — large free tier.
 *   - Mailgun (https://mailgun.com/) — solid EU region option.
 *
 * The EMAIL_PROVIDER_API_KEY and EMAIL_FROM secrets are bound by the
 * functions runtime; this module reads them from process.env at call time.
 */

const axios = require("axios");
const logger = require("firebase-functions/logger");

/**
 * @param {object} message
 * @param {string} message.to
 * @param {string} message.subject
 * @param {string} message.html
 * @param {string} [message.text]
 * @param {string} [message.headers]
 */
async function sendEmail({to, subject, html, text, headers}) {
  const provider = process.env.EMAIL_PROVIDER || "log";
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM || "docs@openlm.com";

  if (provider === "log" || !apiKey) {
    logger.info("email.sendEmail (no provider configured, logging only)", {
      to, subject, fromConfigured: !!process.env.EMAIL_FROM,
    });
    return {provider: "log", skipped: true};
  }

  if (provider === "zeptomail") {
    // Zoho's transactional email service. Region-aware host (EU or US)
    // controlled by ZEPTOMAIL_HOST env var; defaults to .com.
    // Docs: https://www.zoho.com/zeptomail/help/api/email-api.html
    const host = process.env.ZEPTOMAIL_HOST || "api.zeptomail.com";
    // ZeptoMail UI shows the token as "Zoho-enczapikey <token>". Accept
    // either form — we strip the prefix here so the user doesn't have to.
    const rawToken = String(apiKey || "").trim();
    const token = rawToken.startsWith("Zoho-enczapikey ")
      ? rawToken.slice("Zoho-enczapikey ".length).trim()
      : rawToken;
    const res = await axios.post(
      `https://${host}/v1.1/email`,
      {
        from: {address: from},
        to: [{email_address: {address: to}}],
        subject,
        htmlbody: html,
        textbody: text || "",
      },
      {
        headers: {
          "Authorization": `Zoho-enczapikey ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      },
    );
    return {provider: "zeptomail", id: res.data?.data?.[0]?.message_id};
  }

  if (provider === "postmark") {
    const res = await axios.post(
      "https://api.postmarkapp.com/email",
      {
        From: from,
        To: to,
        Subject: subject,
        HtmlBody: html,
        TextBody: text,
        MessageStream: "outbound",
        Headers: headers,
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": apiKey,
        },
      },
    );
    return {provider: "postmark", id: res.data.MessageID};
  }

  if (provider === "sendgrid") {
    await axios.post(
      "https://api.sendgrid.com/v3/mail/send",
      {
        personalizations: [{to: [{email: to}]}],
        from: {email: from},
        subject,
        content: [
          {type: "text/plain", value: text || ""},
          {type: "text/html", value: html},
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );
    return {provider: "sendgrid"};
  }

  if (provider === "mailgun") {
    const domain = process.env.MAILGUN_DOMAIN;
    const form = new URLSearchParams({
      from, to, subject, html, text: text || "",
    });
    const res = await axios.post(
      `https://api.eu.mailgun.net/v3/${domain}/messages`,
      form.toString(),
      {
        auth: {username: "api", password: apiKey},
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
      },
    );
    return {provider: "mailgun", id: res.data.id};
  }

  throw new Error(`Unknown EMAIL_PROVIDER: ${provider}`);
}

module.exports = {sendEmail};
