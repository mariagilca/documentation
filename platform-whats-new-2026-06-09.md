# OpenLM Platform — What's new in Cho Oyo

**The Cho Oyo release** · Week of June 9, 2026 · Covering changes deployed to Production US and Production EU, February 3 – June 9, 2026

This release cycle adds a new License Parser tool, a Software Discovery suite for SAM, three new integrations, and a major expansion of SaaS and AI license monitoring — alongside a platform-wide interface refresh and more than twenty notable fixes. The full, per-ticket breakdown is in the companion files; this page covers what stands out.

---

## New features

**License Parser** — Drag and drop a FlexLM license file and get an instant, structured view of its contents. The new tool parses files entirely in memory — nothing is written to storage — and adds a Summary view, an Issued At view, and search across the parsed results. It also integrates directly with License Manager.

**Software Discovery for SAM** — Software Asset Management gains a discovery suite: a Software Catalog Discovery page orchestrates discovery agents, while dedicated tabs track discovered vendors, discovered products with enrichment status, and a full history of discovery job runs. Vendor and product discovery can be triggered on demand.

**Zendesk integration** — OpenLM alerts can now create Zendesk tickets automatically, with a new setup interface for authenticating and configuring the connection.

**Google Chat integration** — Receive OpenLM alerts in a Google Chat space and query OpenLM data without leaving the conversation, using slash commands backed by the GraphQL APIs. A consent page covers permissions, and stored integration data can be removed on request.

**Monday SAM** — A new monday.com app brings software asset management to monday, with a seamless registration flow from the monday app into the OpenLM identity-integrated interface.

**Broker stand-by mode** — Brokers can now be paused temporarily without uninstalling them. Broker Hub supports the new command set — including Stand By and Remove License — and AI Proxy gains its own Stand By command.

**AI usage reporting foundation** — AI Proxy usage data is now aggregated hourly, laying the groundwork for AI usage reporting. Anthropic identities are resolved through the claude.ai profile endpoint, and Admin API keys are recognized as well.

**Wider SaaS and AI monitoring** — SaaS Agent now monitors Canva, Zoom, Claude AI allocations (with License Access Control support), Cursor AI, Apollo.io, and LinkedIn company pages, and takes over Altair and JetBrains Cloud monitoring from Cloud Broker. Cloud Broker adds GitHub Copilot usage tracking (credits and requests), initial Google Gemini support, and API-based monday.com monitoring. SaaS Agents can now update themselves remotely.

**Deployment flexibility** — The Software License Manager now supports cloud-managed Redis or Valkey, Brokers can serve as a licensing data source, license allocations support Azure Cosmos DB for MongoDB, and self-signed certificates can be used across the system. The Database Configuration Tool ships as a new web interface that runs in Docker and can generate PostgreSQL connection strings.

---

## Improvements

**A refreshed interface across the platform** — A more consistent look and behavior across screens.

**More room for your data in SLM** — Grid filters moved into the column headers across SLM screens, and checkout policies can now be edited in place.

**Broker Hub housekeeping** — Stale Broker entries that never report data are removed automatically, uploaded Broker files are cleaned up after a configurable time limit, and Brokers that keep reporting without approval receive a suspension command. The hub also shows port details and connected AI Proxy instances.

**A more capable ServiceNow integration** — Synchronization now runs on a daily schedule and reports completion and transform status live in the interface. The connector processes data from 13 tables, receives denial records from the cloud platform, and restricts Viewer-role users from actions they shouldn't take. New Event Management and Alerts components round out the connector.

**Faster, smarter navigation** — Navigation loads faster, menu search behaves better, and the ServiceNow Connector now appears in the on-premises menu.

**Users and groups workflow polish** — The Users and Add/Edit User pages were reworked (including the Groups and Email Aliases sub-tabs), email aliases are searchable from the dropdown, user lists sort by creation date, and stale workstations are cleaned up automatically.

**Trustworthy audit data** — Audit events are processed only when the Audit service is active for a product, and malformed events are filtered out on both cloud and on-premises deployments.

**Reporting refinements** — QuickSight dashboards query data directly for fresher results, Superset BI reports joined the platform navigation, reports can resolve user aliases, and the Reporting Data API supports the full GraphQL `where` clause on the cloud platform.

**Consistent account lifecycle** — Account suspension and deletion events are now handled uniformly across Broker Hub, License Manager, usage tracking, and OpenLM Server.

---

## Fixed issues that stand out

- **Personal Dashboard pages loaded too slowly** — page load performance is fixed.
- **Navigation crashed on click** — a version mismatch between federated modules brought down the navigation component; it no longer does. The EU cloud's BI reports link also points to the right place again.
- **License Access Control rules misbehaved** — deployed rules for on-premises assets no longer jump to the Undeployed tab, duplicate rules no longer appear after reselecting a feature, and FlexLM features display correctly after a rule-type change.
- **Active license allocations were deleted from the database** — allocations now persist as expected.
- **Broker Hub reliability** — approved Brokers no longer flap between Approved and Time Sync Error, configuration updates arrive again, and SaaS Agent Brokers receive their approval messages.
- **Products could not be activated on the US cloud** — activation works again.
- **MATLAB client versions went missing from reports** after a license file change — they're back.
- **The email password was stored in readable form** in the server configuration — it is now protected.
- **Idle-time values were wrong** in the System Monitoring report for some applications.
- **Directory synchronization failed** on GetActiveUsers and could not reach Microsoft Entra ID from the US cloud — both fixed.
- **Dongle and process usage was not displayed** because two features were missing from the feature allowlist.
- **Database upgrades to version 21 failed** on Microsoft SQL Server with a pre-login handshake error.

---

*Full details: per-service and per-week breakdown in `platform-release-notes-by-service-and-week-2026-06-09.md`; complete curated list with work item IDs in `platform-weekly-release-notes-2026-06-09.md`.*
