# Changelog items parked or deferred — June 2026

Items from the curated set not yet placed in `static/release-notes/*.json`.

## Deferred — stand-by embargo (publish when the stand-by family ships)

- **AI Proxy** [Added] 70707: Added a Stand By command that temporarily pauses AI Proxy activity.
- **Broker** [Added] 68327: Added a stand-by mode that lets you temporarily pause a Broker without uninstalling it.
- **Broker Hub** [Added] 70696: Added support for the new Broker commands, including Remove License and Stand By.

### Added June 11, 2026 — removed from published changelog after the second audit

- **AI Proxy** [Added] 72304, 72305: Added hourly aggregation of AI Proxy usage data, the foundation for AI usage reporting. *(publish when AI usage reporting ships)*
- **Cloud Broker** [Improved] 67351: Added initial monitoring support for Google Gemini. *(PoC — publish at general availability)*
- **Homepage** [Improved] 72718, 72721: Groundwork for customizable dashboards: account-level layout persistence, drag handle, per-widget Delete menu. *(publish when dashboards v2 ships)*

## Parked — placement decision needed

Navigation has no changelog page (per decision). OpenLM Server fixes likely belong in `legacy-slm.json` under a real server version. Platform-wide items span several services.

- **Navigation** [Fixed] 70561: Fixed a wrong redirection link to BI reports on the EU cloud platform.
- **Navigation** [Fixed] 71478: Fixed a crash when clicking navigation items, caused by a version mismatch between federated modules.
- **Navigation** [Improved] 68341: Improved navigation loading performance.
- **Navigation** [Improved] 69734: Improved search behavior in the navigation menu.
- **Navigation** [Improved] 73235: The ServiceNow Connector now appears in the navigation menu on on-premises deployments.
- **OpenLM Server** [Fixed] 29622: The email password is no longer stored in readable form in the server configuration. *(only remaining server item — six siblings filed in legacy-slm v26.5.28.1412 on June 11, 2026)*
- **Platform-wide** [Improved] 52431: You can now use self-signed certificates in the system.
- **Platform-wide** [Improved] 65985, 69580, 69583, 70022, 70145: Account suspension and deletion events are now handled consistently across services, including Broker Hub, License Manager, usage tracking, and OpenLM Server.
