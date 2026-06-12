# Second audit: internal tickets in the published changelog entries

**Scope:** the 134 bullets (153 work items) placed as `06.26` / `2026-06-09` entries across 34 `static/release-notes/*.json` files on June 11, 2026.
**Method:** two independent passes — a rule-and-judgment review against the raw Azure DevOps titles, and an adversarial fresh-eyes review with strict criteria (judge by the raw title, not the polished changelog text). Verdicts below are the merged result. **No entries have been removed yet** — this report identifies; you approve.

**Result: 120 of 134 bullets are clean.** 7 bullets (10 work items) are internal and should come out; 7 bullets (8 work items) are borderline and need a call or a rewording.

## Recommend removal — internal only

| File | Category | IDs | Why it's internal |
| --- | --- | --- | --- |
| ai-proxy.json | added | 72304, 72305 | Kafka→SQL/Iceberg ETL plumbing; self-described "foundation" for AI usage reporting that hasn't shipped. Publish when the reporting ships. |
| audit.json | added | 72532, 72533 | Guards against OpenLM's own developers ignoring Audit Client integration policies. Customer effect too indirect. |
| cloud-broker.json | improved | 67351 | Raw ticket says Google Gemini monitoring is a **PoC** — not generally available. Conflicts with the release-notes page, which lists "initial Google Gemini support"; align both when GA. |
| cloud.json | improved | 63547 | Cloud Admin is OpenLM staff/partner tooling, not a customer surface. Consistent with the first audit's exclusion of other Cloud Admin items (60344, 60133, 62311). |
| homepage.json | improved | 72718, 72721 | Groundwork for the unreleased customizable-dashboards v2 (backend layout schema + widget chrome). Same embargo logic as Broker stand-by: publish when the feature ships. |
| process-manager.json | improved | 65352 | "Monitoring flow improvement" — no identifiable customer-visible change. Remove, or pull detail from the ticket and rewrite. |
| usage.json | added | 56918 | Automatic restart of MDE services — ops-only reliability work. Arguably relevant to on-prem operators; weak case to keep. |

Knock-on effects if all seven are removed: `cloud.json`'s 06.26 entry keeps one item (68506); `usage.json` keeps one (69319); `ai-proxy.json` keeps two (69759, 70031). No file ends up empty.

## Borderline — keep with a decision or rewording

| File | Category | IDs | Issue and recommendation |
| --- | --- | --- | --- |
| saas-agent.json | added | 69368 | Internal LAC message-format change between OpenLM components. **But** its twin 69369 is already published in cloud-broker 05.26 — removing one while the other stays is inconsistent. Recommend: keep for precedent, or remove both. |
| servicenow.json | improved | 65322 | Real effect (13 ServiceNow tables now populated) hidden behind ETL wording ("staging/target tables"). Keep; reword to the outcome. |
| reporting.json | fixed | 72831 | Raw ticket is a bare ops pointer ("US platform Cloud - Process Session data"). Keep; reword to the symptom: process-session data missing on the US cloud. |
| software-asset-management.json | added | 69158, 73637 | The Discovery page shipped (sibling tabs prove it), but 73637 is project-setup/app-shell scaffolding. Keep the bullet; drop 73637 from the ID list. |
| agent.json | improved | 57021 | Visible effect (no project notifications when the feature is disabled) but K8s/config-flavored raw. Lean keep. |
| google-chat.json | added | 69087 | Data-removal endpoint — likely Google Marketplace compliance, but customer-relevant (your stored data can be deleted). Lean keep. |
| google-chat.json | improved | 70975 | Google trademark symbol — visible but trivial branding compliance. Keep or drop as noise; no harm either way. |

## Notes

The five highest-confidence internal slip-throughs (72304/72305, 72532/72533, 67351, 63547, 69368) all carry explicit internal markers in their raw titles: ETL/sinks, "developers… ignore integration policies", "PoC", Cloud Admin, message format. Worth adding these markers to the exclusion heuristics for the next weekly export.

If you approve the removals, the items move to `changelog-parked-items-2026-06.md` (Gemini PoC and dashboard-v2 join the embargo section alongside Broker stand-by) and the per-item decision log (`platform-weekly-release-notes-2026-06-09-audit.csv`) gets updated so the ledger stays exact.
