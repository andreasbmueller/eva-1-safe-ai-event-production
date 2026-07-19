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

## Beyond the single-event demo

The Build Week browser prototype focuses on EVA’s single-event workspace and its human-controlled change workflow.

The broader EVA architecture also includes:

- semi-automatic assignment and filing of event-related emails and attachments into the correct event workspace and document folders;
- structured filing of source documents such as contracts, technical riders and rooming lists in their designated event folders;
- future AI-assisted extraction of relevant information from emails and attachments, always presented for human review before it is written to the event master;
- a refreshable multi-event index providing fast and direct access to every active event workspace;
- a future management cockpit consolidating deadlines, responsibilities, critical issues and open tasks across all active events.

Together, these layers connect source information, operational event work and management oversight without creating parallel sources of truth.

## Codex and GPT-5.6

The underlying EVA production concept existed before Build Week. The anonymized browser prototype was newly implemented and refined during Build Week with Codex and GPT-5.6.

I used Codex and GPT-5.6 to:

- translate my domain requirements and safety rules into an implementation plan;
- build the static HTML, CSS and JavaScript application;
- structure the fictional event, task, contact and subtask data;
- implement the controlled task-completion workflow;
- implement PLAN → APPROVE → APPLY with exact before-and-after previews;
- create local persistence, recovery behavior and the audit trail;
- test file:// execution and browser compatibility;
- review privacy, accessibility and robustness;
- identify and repair two concrete safety issues;
- prepare the public documentation and release package.

I made the key product and safety decisions: the single-source-of-truth model, the human approval gates, the scope of every change, the STOP rules and the acceptance criteria.

Codex accelerated implementation, testing and review, while I remained responsible for the domain model, product direction, validation and final approval.

The public demo makes no AI calls at runtime. It demonstrates the human-controlled workflow and the Codex-assisted implementation rather than autonomous event management.

## About the builder

EVA was initiated by Andreas B. Müller, a Swiss live-event producer, cultural project leader and communication professional with more than four decades of experience.

His background includes running an event-management agency, leading tourism and cultural organizations, managing major projects, and serving on the event directorate of Switzerland’s Expo.02 with responsibility for the production of 2,500 events.

Today, he helps lead the program and projects of Kulturfabrik Industrie36 and serves as president and communications lead of gambrinus jazz plus.

He is not a traditional software developer. For EVA, he acted as domain expert, product owner, workflow architect and tester, using Codex and GPT-5.6 to turn operational experience into a working, human-controlled prototype.

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
