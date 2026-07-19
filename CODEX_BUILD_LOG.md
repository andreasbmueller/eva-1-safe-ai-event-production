# Codex Build Log — EVA Build Week Demo V1

## Build summary

Codex and GPT-5.6 implemented the anonymized static browser demo from the supplied brief and fictional sample data. The build adds a responsive event dashboard, safe task actions, event and backline change planning, local persistence, reset, contacts, and audit views.

## Major design decisions

- Classic scripts and a JavaScript data mirror support direct `file://` execution.
- All dynamic content is created with DOM nodes and `textContent`; user input is never rendered with `innerHTML`.
- Consequential form changes use immutable previews followed by an explicit approval checkbox.
- Task actions use a separate confirmation dialog and update one identified task.
- The readiness indicator is a simple, explainable completion ratio.
- All state remains in one namespaced `localStorage` entry.

## Issues found and changes after testing

- The in-app browser test connection was blocked by a local runtime permission error. A direct Microsoft Edge headless `file://` load succeeded instead and returned the fully rendered DOM.
- Source scans found no `fetch`, `XMLHttpRequest`, remote URL, CSS import, remote asset, or `innerHTML` usage.
- JavaScript syntax checks passed for both scripts.

## Targeted correction pass — 2026-07-18

- Standardized the overview metric name to **Due in final week** in the visible UI, README, requirements, and acceptance tests. Its existing final-seven-days calculation was intentionally unchanged.
- Added `tabindex="-1"` to each view-level `h2`, making the existing focus-on-view-change behavior effective.
- Re-ran JavaScript syntax checks: **GREEN**.
- Re-ran the Edge `file://` load and confirmed the rendered metric and headings: **GREEN**.
- Re-scanned application sources for network APIs, remote assets, and `innerHTML`: **GREEN**, no matches.
- Re-inspected PLAN → APPROVE → APPLY, complete/reopen confirmation and idempotency, audit, and reset paths: **GREEN**.
- No files or test artifacts remain outside or inside the project beyond the intended project files.

## Acceptance results

Legend: **GREEN** verified by source inspection, syntax check, successful Edge `file://` render, or the completed manual smoke tests; **YELLOW** has a known qualification; **RED** failed.

| Test | Result | Evidence / note |
|---|---|---|
| A1 | GREEN | Edge loaded and rendered root `index.html` through `file://`. |
| A2 | GREEN | No server or build dependency exists. |
| A3 | GREEN | Scripts pass syntax checks and initial Edge render completed. |
| A4 | GREEN | Source scan shows no network APIs or remote assets. |
| A5 | GREEN | All runtime assets are local; no network dependency exists. |
| B1–B4 | GREEN | Fictional dataset, `example.com`, no private paths in app content, visible footer disclaimer. |
| C1–C2 | GREEN | All required fields render; seating note has a dedicated emphasized card. |
| C3 | GREEN | Header and responsive layout passed the manual checks, including the tested screen sizes. |
| D1–D4 | GREEN | Handler recalculates, changes no production values, updates time, appends one audit entry. |
| E1–E7 | GREEN | Exact ID/title confirmation, cancel semantics, scoped/idempotent transitions, summary and audit refresh, reopen parity. |
| F1–F9 | GREEN | Nine structured items, draft/plan/approval/apply/cancel scoping, audited changes, safe DOM rendering. |
| G1–G4 | GREEN | Event editor uses the same gated workflow and exact field-level audit. |
| H1–H3 | GREEN | Confirmed reset replaces only the namespaced browser state. |
| I1–I4 | GREEN | Native controls/dialogs, labels, live status, focus styling, text labels supplement color. |
| I5 | GREEN | Layout passed manual checks at 1920 × 1080 and 1366 × 768. |
| I6 | GREEN | Manual smoke tests passed in Chrome and Firefox; Edge `file://` was also verified. |
| J1–J5 | GREEN | README and this build log contain every requested statement and placeholder. |

## Manual smoke-test confirmation

The user completed the final manual checks and reported all of the following as **GREEN**:

- Chrome and Firefox
- 1920 × 1080 and 1366 × 768
- Navigation and keyboard operation
- Update dashboard
- Mark complete and Reopen, including confirmation
- Event-header PLAN → APPROVE → APPLY
- Seating note visible after APPLY
- Backline-subtask PLAN → APPROVE → APPLY
- Audit trail
- Reset, including confirmation
- No confidential or production EVA data visible

## Review finding remediation — 2026-07-18

- **P1 confirmation-dialog reuse:** Each confirmation now starts with a neutral `returnValue` and a fresh internal approval flag. Only activation of the explicit confirmation button sets that flag. Escape, Cancel, and other non-confirming closure paths clear or leave it false, so they cannot execute the pending callback.
- **P2 local-state compatibility:** Stored EVA demo state is validated against the expected schema version and the required `event`, `tasks`, `contacts`, `subtasks`, and `audit` structures before use. Missing, incorrectly typed, empty required collections, or incompatible data trigger a safe fallback to the original fictional sample data.
- Recovery replaces only `eva-demo-v1-state`; an unrelated localStorage test entry remained unchanged. A single system audit entry documents recovery in the restored state, avoiding a reload loop when storage is writable.
- JavaScript syntax and prohibited-network/`innerHTML` scans: **GREEN**.
- Edge Headless `file://` start: **GREEN**.
- Valid but structurally incompatible localStorage recovery: **GREEN**.
- Explicit confirmation, Cancel, and Escape after an earlier confirmation for Mark complete, Reopen task, and Reset demo: **GREEN**.
- Event and backline PLAN → APPROVE → APPLY plus resulting audit entries: **GREEN**.

## Overall result

**GREEN** — all required acceptance tests passed. Static and syntax checks, Edge `file://` execution, manual Chrome and Firefox smoke tests, exact-size layout checks, safety workflows, audit, reset, keyboard operation, and privacy review are complete.

## Swiss demo localization pass — 2026-07-18

- Replaced only the fictional sample event, venue, city, contact, organization, email, task-owner, subtask-owner, and initial audit entity values with the approved Swiss-themed demo data.
- Updated the sample schema from `1.0` to `1.1` so compatible-state validation safely replaces previously stored pre-localization demo data with the new fictional sample set.
- Confirmed `demo-data/demo-event.json` and `demo-data.js` are identical representations of the sample state: **GREEN**.
- Confirmed no old event ID, event name, venue, city, organization, contact name, owner name, or email remains in the project: **GREEN**.
- Confirmed every contact email uses `example.com` and every phone number retains the clearly fictional `+41 00 …` format: **GREEN**.
- JavaScript syntax and Edge Headless `file://` render with the localized data: **GREEN**.
- No UI language, function, logic, style, or layout was changed.

## Remaining limitations

- `localStorage` behavior can vary in privacy-restricted browser modes.
- The demo intentionally has no production integrations and supports one event only.
- Browser state is local to the current browser profile and is not synchronized across browsers or devices.
- The readiness value is a transparent task-completion ratio, not an AI prediction.
