# Changelog — 05.26 release (customer-facing)

Customer-facing changes only, compiled from the 11 Azure DevOps release queries for the 05.26 release. Internal hardening (Kubernetes secrets, Trivy CVE scans, readiness/liveness health checks, `LicenseManagerClient` bumps, Angular refactors) and the Agent component are excluded per request.

When approved, each section becomes one `05.26` object (version `05.26`, `createdAt` `1779926400` = 2026-05-28) prepended to the matching `static/release-notes/<noteKey>.json`.

Five components have customer-facing changes this release: Agents Hub, Personal Dashboard, Dongle Monitoring, Process Manager, and Session Creator. Subscription Optimizer, End-User Services, Agent Activity Manager, Alerts Service, and License Harvester shipped internal-only work and are omitted.

---

## Drafted entries

### Agents Hub — `agents-hub`

**Fixed**

- 72260: Fixed an issue where the `AccountEventsConsumer` failed to deserialize the `AccountStatus` value from a Kafka message.
- 72387: Fixed an issue where the `TouchPointEvents` hub method failed to be invoked.
- 73264: Fixed a `NullInjectorError` that prevented some pages from loading.

### Personal Dashboard — `personal-dashboard`

**Fixed**

- 73253: Fixed an incorrect error message shown when adding a project that already exists.
- 73259: Fixed an issue where the "License in Use" modal window was too large.

**Improved**

- 73255: Improved Personal Dashboard page load times.

### Dongle Monitoring — `dongle-monitoring`

**Fixed**

- 72478: Fixed an issue where an offline message failed to process.
- 73205: Fixed an issue where the V10 partial-index migration silently failed on fresh databases, so the V11 and V12 migrations never ran.
- 73268: Fixed an issue on the Dongle Usage page where the "Last Update" column used ISO 8601 format instead of a 12-hour clock.

### Process Manager — `process-manager`

**Fixed**

- 72512: Fixed a delay in monitoring data collection observed on the US production environment.

### Session Creator — `session-creator` *(component to confirm: `session-creator` vs `process-sessions`)*

**Added**

- 65330 / 69779: Added a resilient session-creation flow that recovers from User and Group Service (UGS) lookup failures.

**Fixed**

- 72329: Fixed an issue where a write lock could not be acquired when creating a new session.
- 72766: Fixed a query that was not scoped per tenant when enriching pending sessions (backported from Agents Hub).

---

## Release-notes highlights

Ranked by customer impact:

1. **Session Creator — resilient session creation (`65330`/`69779`).** New capability: sessions recover from UGS lookup failures instead of failing.
2. **Process Manager — monitoring data lag fixed (`72512`).** Resolves a production data-collection delay affecting reported accuracy.
3. **Dongle Monitoring — three fixes (`73205`, `72478`, `73268`).** `73205` prevents broken schemas on fresh databases; the others fix offline-message processing and a timestamp display bug.
4. **Agents Hub — page access restored (`73264`, `72260`, `72387`).** `73264` restored pages that failed with a `NullInjectorError`.
5. **Personal Dashboard — UX fixes (`73255`, `73253`, `73259`).** Faster page loads plus two visible UI corrections.

> Note: the Agent dongle-usage fix (`70938`, from the Agent Platform query) was the only customer-facing item in the Agent component and is excluded along with the rest of Agent 05.26.
