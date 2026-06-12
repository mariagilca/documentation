# OpenLM Platform release notes by service and release week

This file covers the 199 customer-facing work items from the February 3 – June 9, 2026 export: the 174 curated items from `platform-weekly-release-notes-2026-06-09.md` plus the 25 items already published in the `static/release-notes/*.json` changelogs.

Items are grouped by service, then by release week, newest first. Already-published items appear under the week of their changelog release, with the release version and source changelog noted, and use their published wording. Curated items have no per-item dates in the export, so they appear under the export's report week, June 9, 2026. Change types are ordered Fixed, Improved, Updated, Added, Removed.

## Release weeks covered

> **Update (June 11, 2026):** 62127, 62400, 64221, and 64266 (Material Design migrations) were subsequently removed from the published changelog history — framework migrations are internal per editorial decision. Counts in this snapshot predate that removal.

| Week | Items | Source |
| --- | --- | --- |
| Week of June 9, 2026 | 151 | export report week (pending changelog publication) |
| Week of May 31, 2026 | 6 | published changelog release |
| Week of April 28, 2026 | 5 | published changelog release |
| Week of March 7, 2026 | 1 | published changelog release |
| Week of February 12, 2026 | 2 | published changelog release |
| Week of February 2, 2026 | 7 | published changelog release |
| Week of October 6, 2025 | 2 | published changelog release |
| Week of March 16, 2022 | 1 | published changelog release |
| Week of February 23, 2022 | 1 | published changelog release |

## Agent Activity Manager

### Week of April 28, 2026 — release 04.26 (`agent-activity-manager` changelog)

**Added**

- 41709: Added the Automatic Agent Update feature. Admins can now upload an Agent MSI installer in Agent Activity Manager and roll it out to selected Agents or all Agents at once. Installers are distributed peer-to-peer between Agents and verified by certificate before any upgrade runs.

## Agent Services

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 73177: Fixed an issue where dongle and process usage was not displayed because the offline monitoring and process-user features were missing from the feature allowlist.

**Improved**

- 57021: Agents no longer produce project-related notifications when the projects configuration is disabled in Agents Hub.

## Agents Hub

### Week of April 28, 2026 — release 04.26 (`agents-hub` changelog)

**Improved**

- 68738: Workstation Agents now receive data from each upstream service independently — if Process Manager, Dongle Monitoring, or another data source is unavailable, the Agent still receives data from the others instead of failing initialization.

### Week of February 2, 2026 — release 01.26 (`agents-hub` changelog)

**Fixed**

- 65425: Fixed an error caused by non-positive cache expiration values.

**Added**

- 62127: Migrated the user interface to Material Design.

## AI Proxy

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 69759: Improved identification of Anthropic users. OAuth identities are now resolved through the claude.ai profile endpoint.
- 70031: Added identity resolution for Anthropic Admin API keys.

**Added**

- 70707: Added a Stand By command that temporarily pauses AI Proxy activity.
- 72304, 72305: Added hourly aggregation of AI Proxy usage data, the foundation for AI usage reporting.

## Alerts and notifications

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 43395: Added a button for sending a sample push notification so you can test push delivery.
- 59400: Moved the notification menu items under Management.
- 59430: Removed the Viewer role from the Notifications service.
- 62472: Redesigned the Notifications interface with the Angular Material design system.

**Added**

- 45125: Added support for multiple push notification subscribers per application.

## Audit

### Week of June 9, 2026 — pending changelog publication

**Added**

- 59451: Audit events are now processed and displayed only when the Audit service is activated for the product.
- 64352, 65543, 66020: Redesigned the Audit interface with the Angular Material design system.
- 72532, 72533: Added validation that filters out malformed audit events, on both cloud and on-premises deployments.

## Broker

### Week of June 9, 2026 — pending changelog publication

**Added**

- 68327: Added a stand-by mode that lets you temporarily pause a Broker without uninstalling it.

### Week of March 7, 2026 — release v26.3.2.1352 (`broker` changelog)

**Updated**

- 65261: Updated command format for Remove License

## Broker Hub

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 65341: Fixed an issue where SaaS Agent Brokers did not receive approval messages.
- 66791: Fixed an issue where Broker Hub stopped receiving configuration updates.
- 69304: Fixed an issue where an approved Broker's status changed repeatedly between Approved and Time Sync Error.

**Improved**

- 60113, 64364: Redesigned the Broker Hub interface to match OpenLM design standards, using the Angular Material design system.
- 62461: Broker files uploaded for the Update Broker flow are now deleted automatically after a configurable time limit, 24 hours by default.
- 66437: Added a re-read and restart option for deployed license file requests.
- 67024: Brokers that keep reporting without being approved are now sent a suspension command.
- 69603: Realigned the Pending Brokers grid.
- 70661: Broker Hub now lists connected AI Proxy instances, both in the interface and through the Broker Hub API.
- 71025: Broker Hub now displays additional information for Broker ports.

**Added**

- 62459: Broker entries that remain in New status without reporting data are now deleted automatically after a configurable period.
- 65917: Added options to disable license file and options file upload.
- 70696: Added support for the new Broker commands, including Remove License and Stand By.

## Cloud Broker

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 67351: Added initial monitoring support for Google Gemini.
- 67727: Added monday.com monitoring through the monday.com API, covering license totals, expiration, and features.
- 72710: Added GitHub Copilot usage tracking, including credits and request counts.

### Week of May 31, 2026 — release 05.26 (`cloud-broker` changelog)

**Updated**

- 69369: Updated the LAC message format across all plug-ins, including Monday.com and Office/Azure, to use explicit user attributes and to validate the fields each plug-in requires.

**Added**

- 19154: Added support for monitoring Adobe Creative Cloud license allocations, imported from the Adobe admin console CSV export.
- 61853: Added LAC message publishing and Deploy LAC command handling for the Bentley portal, enabling license allocation and deallocation.
- 63908: Added monitoring of Amazon QuickSight license usage.
- 65134: Added JetBrains deploy commands to add or remove users and assign or revoke licenses, with clear messaging when a verified domain is required.
- 70128: Added initial Cursor AI monitoring through the Admin API, beginning with license allocation data.

### Week of April 28, 2026 — release 04.26 (`cloud-broker` changelog)

**Fixed**

- 67077: Fixed the DocuSign connection verification error and clarified the setup documentation, including how to obtain the User ID, Account ID, Organization ID, Private Key, and Integration Key.

**Added**

- 63089: Added support for monitoring Atlassian Confluence Cloud.
- 66465: Added Bentley license usage monitoring from CSV reports for use with SLM, complementing the existing ServiceNow reporting.

## Cloud platform administration

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 68506: Fixed an issue on the US cloud platform where some products could not be activated.

**Added**

- 63547: Redesigned the Cloud Admin interface with the Angular Material design system.

## Compliance

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 54782: Added a "Product not activated" screen that explains how to activate Compliance.
- 59598: Renamed the service interface to Compliance.

**Added**

- 62471: Redesigned the Compliance interface with the Angular Material design system.

## Database tools

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 35189: Fixed a Database Upgrade Tool failure when upgrading Microsoft SQL Server databases to version 21, caused by a pre-login handshake error.

**Improved**

- 30427: The Database Configuration Tool form now resizes to fit the window.
- 30458: Improved the Database Configuration Tool setup flow and interface.

**Added**

- 42528: Added a new Database Configuration Tool interface that runs in Docker.
- 52615: Added support for creating PostgreSQL connection strings.

## Denials

### Week of June 9, 2026 — pending changelog publication

**Added**

- 64761: Redesigned the Denials interface with the Angular Material design system.

## Directory Synchronization

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 60689: Fixed a synchronization failure that produced a GetActiveUsers error.
- 62877: Fixed an issue where the service could not connect to Microsoft Entra ID from the US cloud.

## Dongle Monitoring

### Week of February 2, 2026 — release 01.26 (`dongle-monitoring` changelog)

**Added**

- 64221: Migrated the user interface to Material Design.

## End-User Services

### Week of March 16, 2022 — release v22.3 (`legacy-end-user-services` changelog)

**Added**

- 31736: New API for "Usage by projects".

## Freshworks Alerts integration

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 62220: Restricted access to the integration to users with the Admin role.

**Added**

- 64350: Redesigned the Freshworks Alerts interface with the Angular Material design system.

## Google Chat integration

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 68561: OpenLM alerts can now be pushed to a Google Chat space.
- 68562: Added slash commands that query OpenLM data directly from Google Chat.
- 70975: Added the Google trademark symbol to meet Google branding requirements.

**Added**

- 69087: Added the ability to remove stored integration data on request.
- 69137: Added the permission consent page for the Google Chat integration.

## Homepage

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 71922: The dashboard now shows toast feedback when its data is refreshed.
- 71923, 71927: Added primary actions to the dashboard toolbar — Activate Product, Invite User, and Take the Tour — with tooltips on the toolbar buttons.
- 71926: Restored the Documentation and Contact Us links. Primary calls to action are now shown only to administrators.
- 72718, 72721: Laid the groundwork for customizable dashboards: account-level layout persistence, a drag handle, and a per-widget Delete menu.

**Added**

- 70646: Added a trial countdown with an upgrade path to a paid plan.

**Removed**

- 71925: Removed the Activated Products widget, pending rework.

## Identity

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 67357: Clarified how SaaS Agent credentials are presented to avoid confusion during setup.

### Week of February 23, 2022 — release v22.2 (`legacy-identity-service` changelog)

**Fixed**

- 36588: Identity Service installer crashes.

## License Access Control

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 73183: Fixed an issue where deployed rules for on-premises assets moved to the Undeployed tab after deployment.
- 73195: Fixed duplicate rules appearing in the Undeployed tab after reselecting a feature from the Keyword Name dropdown.
- 73197: Fixed an issue where the FlexLM feature was not displayed after the rule type was changed.

**Improved**

- 56662: Split the rules list into clearer views, separating active and inactive rules.
- 65236: Rule history error messages now show details in a tooltip.
- 70531: Added GraphQL API documentation.

**Added**

- 68044: Revamped the License Access Control documentation.

## License Allocations

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 67011: Fixed an issue where active allocations were deleted from the database.

**Added**

- 64094: Added support for Azure Cosmos DB for MongoDB.
- 64638: Redesigned the License Allocations interface with the Angular Material design system.

## License Manager

### Week of June 9, 2026 — pending changelog publication

**Added**

- 63488: Added a Download license file option.

## License Parser

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 72832: The parser now shows a clear message when you upload an unsupported file type.

**Added**

- 66762, 66764, 66768, 66769: Added the License Parser, a new tool for FlexLM license files: drag and drop a license file, parse it, and review the outcome.
- 66992: Added integration with License Manager.
- 68084: Added search across parsed results.
- 69881, 69882, 69883: Added a Summary view and an Issued At view for parsed license files.
- 71358, 71360: License files are parsed in memory and are no longer written to any storage system.
- 73941: Drag and drop now works only inside the designated parser area.

## License Servers

### Week of June 9, 2026 — pending changelog publication

**Added**

- 63472: Added links from License Server Statistics entries to the related views.

## Monday SAM

### Week of June 9, 2026 — pending changelog publication

**Added**

- 67609: Added the Monday SAM interface, built on the new design.
- 67685: Added a seamless registration flow that redirects from the monday.com app to the OpenLM identity-integrated interface.

## Navigation

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 70561: Fixed a wrong redirection link to BI reports on the EU cloud platform.
- 71478: Fixed a crash when clicking navigation items, caused by a version mismatch between federated modules.

**Improved**

- 68341: Improved navigation loading performance.
- 69734: Improved search behavior in the navigation menu.
- 73235: The ServiceNow Connector now appears in the navigation menu on on-premises deployments.

## Onboarding

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 58331: Fixed the text in the "Cancel Onboarding" dialog.

## OpenLM Connector for monday.com

### Week of June 9, 2026 — pending changelog publication

**Added**

- 60290: Added OAuth authorization.
- 60596: Added a "How to use" page.
- 62726: Added a cookie consent section.

## OpenLM Server

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 29622: The email password is no longer stored in readable form in the server configuration.
- 63609: Fixed a parsing error for license server status lines reported by FlexLM.
- 64100: Fixed missing MATLAB client versions in reports after a license file change.
- 64196: Fixed an error when processing RMS port messages.

**Improved**

- 65490: RLM reporting now supports multiple ISV servers (version 25).
- 69479: License managers that are not licensed are now disabled.
- 70214: Reduced repeated errors when multiple Agents report for the same environment on the legacy EU cloud.

### Week of February 12, 2026 — release v26.2.9.1342 (`legacy-slm` changelog)

**Improved**

- 67173: FlexLM debug log parsing now supports ISO 8601 timestamps (MLM).

**Added**

- 58111: Detailed token reporting for Synera on RLM. Synera token usage is now reported with component-level detail (not just the package feature).

### Week of October 6, 2025 — release v25.9.30 (`legacy-slm` changelog)

**Fixed**

- 62967: Addressed parsing errors for Green Hills License Manager headers that caused license data to fail loading.
- 63023: Fixed a FlexLM data-analysis failure triggered by vendor string changes introduced in newer FlexLM versions.

## Personal Dashboard

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 73255: Fixed slow page loads.

### Week of February 2, 2026 — release 01.26 (`eus` changelog)

**Added**

- 51034: Reordered Personal Dashboard notifications from newest to oldest.
- 64266: Migrated Personal Dashboard user interface to Material Design.

## Platform-wide

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 52431: You can now use self-signed certificates in the system.
- 65985, 69580, 69583, 70022, 70145: Account suspension and deletion events are now handled consistently across services, including Broker Hub, License Manager, usage tracking, and OpenLM Server.

## Process Manager

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 64298: Fixed incorrect idle-time values in the System Monitoring report for some applications.

**Improved**

- 65352: Improved the process monitoring flow.

**Added**

- 53598, 53599: Added the shadow license release and consumption flows, as part of the Applications Manager migration.

### Week of February 2, 2026 — release 01.26 (`process-manager` changelog)

**Added**

- 62400: Migrated the user interface to Material Design.
- 65847: Added function to disable license harvesting for specific users and groups.

## Process Sessions

### Week of June 9, 2026 — pending changelog publication

**Added**

- 64947: Redesigned the Process Sessions interface with the Angular Material design system.

## Projects

### Week of June 9, 2026 — pending changelog publication

**Added**

- 64647: Redesigned the Projects interface with the Angular Material design system.

## Reporting and analytics

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 72831: Fixed process session data processing on the US cloud platform.

**Improved**

- 67299: Superset BI reports are now integrated into the platform navigation.
- 70605: Added a loading message while QuickSight dashboards load.
- 72282: QuickSight dashboards now query data directly for fresher results. Removed the Executive Summary dashboard.

**Added**

- 71584: The Reporting Data API now supports the full GraphQL `where` clause on the cloud platform.

## SaaS Agent

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 64738: Monitoring failures are now reported to Alerts and Audit.
- 65349: Added Canva license monitoring.
- 65361: Added Zoom license monitoring.
- 67880: Added LinkedIn Company Page monitoring.
- 69225: Added monitoring of Claude AI allocations, with License Access Control support.
- 70173: Added Cursor AI monitoring.

**Added**

- 54609: Added Apollo.io monitoring.
- 61978, 61980: Moved Altair and JetBrains Cloud monitoring from Cloud Broker to SaaS Agent.
- 65369: Added remote automated update of SaaS Agents.
- 69368: Updated the License Access Control message format across all SaaS Agent plugins, including Autodesk and LinkedIn.

## ServiceNow integration

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 62897: Added a scheduled daily synchronization.
- 62898: Synchronization completion and transform status now appear in the interface in real time.
- 64386: Denial records from the cloud platform are now sent to the ServiceNow Connector.
- 65322: The connector now processes data from 13 tables and populates the corresponding staging and target tables.
- 73037: Users with the Viewer role can no longer perform restricted actions in the integration interface.

**Added**

- 70254: Added the ServiceNow Alerts component to the connector interface.
- 71411: Added the ServiceNow Event Management component scope to the connector interface.

## Software Asset Management

### Week of June 9, 2026 — pending changelog publication

**Fixed**

- 67283: Fixed SAM Catalog GraphQL endpoint errors when accessed through the API gateway on on-premises deployments.

**Improved**

- 54143: Entitlement records can now be created from license server and process data coming from the reporting service.
- 55632: Renamed the Vendors endpoint to Sellers.
- 56194: Entitlement records now include procurement and process information.
- 59167: Added CSV import and export of seller information.
- 62559: Added a currency conversion factor for cost data.
- 73027: The Software Discovery tab is now hidden on on-premises deployments.

**Added**

- 68638: Updated the Add/Edit Entitlement page.
- 69158, 73637: Added the Software Catalog Discovery page with discovery agent orchestration.
- 70966: Added a Job Runs & History tab with active job monitoring and run history browsing.
- 71029: Added a Discovered Vendors tab with a vendor grid, vendor management, and a dialog for triggering vendor discovery.
- 71030: Added a Discovered Products tab with a product grid, enrichment status, and a dialog for triggering product discovery.

## Software License Manager

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 53243: You can now edit checkout policies.
- 71566: Grid filters are now embedded in the column headers across SLM screens, leaving more space for data.

**Added**

- 62933: Added support for Broker as a licensing data source.
- 68650: Added support for cloud-managed Redis or Valkey.

## Usage tracking

### Week of June 9, 2026 — pending changelog publication

**Added**

- 56918: Added automatic restart for the monitoring data engine services.
- 69319: Optimized the Usage application interface and grid performance.

## Users and groups

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 51411: Added a search option inside the Email Aliases dropdown.
- 57631: User lists can now be sorted by user creation date.
- 59399: Moved the Workstations tab under the Management section.
- 71879, 71887, 71900, 71901: Improved the Users page and the Add/Edit User page, including the Groups and Email Aliases sub-tabs.

**Added**

- 59080: Added automatic cleanup of stale workstations.
- 66536: Reporting now supports user alias information.

## Zendesk integration

### Week of June 9, 2026 — pending changelog publication

**Improved**

- 70537: Added the Zendesk authentication and integration setup interface.

**Added**

- 68565: OpenLM alerts can now create Zendesk tickets automatically.
