/**
 * Thin Zoho Creator v2.1 REST client.
 *
 * Handles OAuth refresh-token exchange (cached in memory for the lifetime
 * of the function instance) and exposes helpers for the four operations
 * the subscriptions functions need: insert a form record, query a report,
 * update a report record, and fetch a list of records for sync.
 *
 * Docs: https://www.zoho.com/creator/help/api/v2/
 *
 * Configuration comes from environment variables that the Cloud Functions
 * runtime binds from Secret Manager:
 *   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN,
 *   ZOHO_OWNER (account holder, e.g. "openlm549"),
 *   ZOHO_APP_LINK_NAME (e.g. "docs-subscriptions").
 *
 * The Zoho API base is the EU data center by default (`creator.zoho.eu`).
 * If the account lives in `.com`, set ZOHO_API_BASE to override.
 */

const axios = require("axios");
const logger = require("firebase-functions/logger");

const API_BASE = process.env.ZOHO_API_BASE || "https://creator.zoho.com";
const ACCOUNTS_BASE = (process.env.ZOHO_API_BASE || "").includes(".eu")
  ? "https://accounts.zoho.eu"
  : "https://accounts.zoho.com";

let cachedToken = null;
let cachedTokenExpiry = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedTokenExpiry - 60_000) {
    return cachedToken;
  }
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  });
  const res = await axios.post(
    `${ACCOUNTS_BASE}/oauth/v2/token`,
    params.toString(),
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}},
  );
  cachedToken = res.data.access_token;
  cachedTokenExpiry = Date.now() + (res.data.expires_in || 3600) * 1000;
  return cachedToken;
}

function appBase() {
  return `${API_BASE}/api/v2/${process.env.ZOHO_OWNER}/${process.env.ZOHO_APP_LINK_NAME}`;
}

async function authed(config) {
  const token = await getAccessToken();
  return axios({
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Zoho-oauthtoken ${token}`,
    },
  });
}

/**
 * Insert one record into a Creator form.
 * @param {string} formLinkName e.g. "Pending_Confirmations"
 * @param {object} data field link name -> value
 * @returns {Promise<object>} the created record (Zoho returns {code, data: {...}})
 */
async function insertForm(formLinkName, data) {
  const url = `${appBase()}/form/${formLinkName}`;
  const res = await authed({method: "POST", url, data: {data}});
  if (res.data.code !== 3000) {
    logger.error("zoho.insertForm failed", {formLinkName, response: res.data});
    throw new Error(`Zoho insert failed: ${res.data.message || res.data.code}`);
  }
  return res.data.data;
}

/**
 * Query a Creator report with an optional criteria string.
 * Pages automatically; returns the concatenated record list.
 * @param {string} reportLinkName e.g. "All_Subscribers"
 * @param {string} [criteria] Zoho criteria, e.g. `Email == "a@b.c"`
 * @param {number} [max] safety cap on records returned
 */
async function queryReport(reportLinkName, criteria, max = 1000) {
  const url = `${appBase()}/report/${reportLinkName}`;
  const records = [];
  let from = 1;
  const limit = 200;
  while (records.length < max) {
    let res;
    try {
      res = await authed({
        method: "GET",
        url,
        params: {criteria, from, limit},
      });
    } catch (err) {
      // Zoho returns HTTP 404 (not 200 with an empty list) when a report
      // has no records matching the criteria. Treat that as "no results"
      // and stop paging. Anything else is a real error and re-thrown.
      if (err.response && err.response.status === 404) break;
      throw err;
    }
    // Some endpoints return 200 with code 3100 for the same condition.
    if (res.data.code === 3100 || !res.data.data) break;
    records.push(...res.data.data);
    if (res.data.data.length < limit) break;
    from += limit;
  }
  return records;
}

/**
 * Update one record in a Creator report by its Zoho record ID.
 * @param {string} reportLinkName
 * @param {string} recordId Zoho's internal ID
 * @param {object} data field -> new value
 */
async function updateRecord(reportLinkName, recordId, data) {
  const url = `${appBase()}/report/${reportLinkName}/${recordId}`;
  const res = await authed({method: "PATCH", url, data: {data}});
  if (res.data.code !== 3000) {
    logger.error("zoho.updateRecord failed", {reportLinkName, recordId, response: res.data});
    throw new Error(`Zoho update failed: ${res.data.message || res.data.code}`);
  }
  return res.data.data;
}

module.exports = {
  getAccessToken,
  insertForm,
  queryReport,
  updateRecord,
};
