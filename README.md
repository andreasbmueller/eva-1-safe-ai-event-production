# EVA 1.0 — Safe AI Event Production

EVA is a human-controlled workflow concept for live-event production. This repository contains a fully anonymized, self-contained competition demo.

## Problem

Event production information is often fragmented across documents, messages, and individual responsibilities. Consequential updates can become difficult to review and trace.

## Solution

This single-event dashboard structures event facts, production tasks, backline details, contacts, and an audit trail. It demonstrates a safety model in which a person previews and explicitly approves consequential changes.

## Features

- Event overview with a distinct seating type and seating note
- Production summaries including **Due in final week** (the final seven days before the event), readiness, deadlines, and owners
- Task filters and confirmed complete/reopen actions
- Backline subtask editor
- `PLAN → APPROVE → APPLY` for event and subtask edits
- Fictional contacts, append-only session audit, and confirmed reset
- Responsive and keyboard-operable interface

## Safety model

There is no automatic deletion or silent overwrite. Event and subtask edits remain drafts until a plan is created, reviewed, explicitly approved, and applied. Task status changes require confirmation and affect one task only. Each applied change records before and after values.

## How to run

Double-click `index.html`. The demo opens directly through `file://`; no server, installation, account, API key, or internet connection is needed.

## How to reset

Select **Reset demo** in the header and confirm. This restores the original fictional sample state in browser `localStorage`; it never changes local files.

## Sample data and privacy

`demo-data/demo-event.json` is the human-readable sample source. `demo-data.js` mirrors it for local browser loading. All people, events, venues, organizations, email addresses, and phone numbers are fictional. The demo is not connected to the private EVA production system and contains no production data.

## Browser support

Designed for current Chrome, Edge, and Firefox on Windows. The implementation uses classic scripts and avoids modules and `fetch()` for `file://` compatibility.

## Project limitations

- Single fictional event only
- Browser-local persistence only; no synchronization or authentication
- No Excel, email, calendar, file-system, or production integration
- No AI model runs at runtime
- Readiness is a transparent task-completion indicator, not an AI prediction

## Codex and GPT-5.6

The underlying EVA production concept existed before Build Week. The anonymized browser demo was implemented and refined during Build Week with Codex and GPT-5.6. Its purpose is to demonstrate a safe human–AI workflow and Codex-assisted implementation; it does not claim autonomous operation.

## Codex `/feedback` Session ID

Session ID: `019f74f5-40ee-7ee0-b7c2-91d7caa27a07`

## Build Week demo/video checklist

- Keep the public video under three minutes and include voiceover
- Show event overview, seating note, and critical task
- Demonstrate backline `PLAN → APPROVE → APPLY`
- Demonstrate confirmed task completion and its audit record
- Show dashboard update and local reset
- Explain honestly how Codex and GPT-5.6 were used
- Confirm no private data, copyrighted music, or third-party trademarks appear

## License

MIT. See `LICENSE`.
