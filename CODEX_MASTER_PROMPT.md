# Codex master prompt — EVA Build Week Demo V1

You are building the core implementation of an OpenAI Build Week project using GPT-5.6 in Codex.

## Project

**EVA 1.0 — Safe AI Event Production**

EVA is a human-controlled workflow system for live event production. The production version is a Windows/Excel/PowerShell system used by a small Swiss cultural venue. For Build Week, create a fully anonymized, self-contained browser demo that communicates the product concept without exposing any production files or private information.

## First response: plan only

Before editing files:

1. Inspect every file in this repository.
2. Summarize the product and safety requirements.
3. Propose a concise implementation plan.
4. List the files you will create or modify.
5. Identify risks, especially privacy, destructive actions, external dependencies, and browser compatibility.
6. Wait for explicit approval before implementation.

Do not write code in the first response.

## Technical constraints

Build a static web application using only:

- HTML
- CSS
- vanilla JavaScript

It must:

- run locally by double-clicking `index.html`
- require no server, build step, package manager, API key, login, database, internet connection, or browser extension
- avoid JavaScript modules and `fetch()` so it works from `file://`
- use no third-party libraries, fonts, images, trademarks, music, analytics, or remote assets
- store demo changes only in `localStorage`
- include a visible “Reset demo” action that restores the original sample data
- use accessible semantic HTML, keyboard-operable controls, clear focus states, and responsive layout
- work in current Chrome, Edge, and Firefox on Windows
- keep all text in English for the competition demo
- display a small footer stating that all people, events, venues, and contact details are fictional

## Product requirements

Create a polished single-event operations dashboard.

### 1. Event header

Display:

- event name
- event ID
- date
- venue
- production level
- doors
- show time
- seating type
- seating note
- production status
- last refreshed time

The seating note must be clearly visible. This is important because a real test showed the distinction between “seating type” and “seating note”.

### 2. Navigation

Provide clear sections or tabs:

- Overview
- Tasks
- Subtasks
- Contacts
- Audit & Safety

### 3. Overview

Show:

- open tasks
- due this week
- critical tasks
- completed tasks
- next deadline
- responsible team members
- production readiness indicator

Add an “Update dashboard” button. It must refresh the visible summaries from the current local state and add a non-destructive audit entry.

### 4. Tasks

Display all production tasks with:

- ID
- title
- area
- due date
- owner
- priority
- status
- notes

Provide filters for status, area, and priority.

### 5. Safe “Mark complete” workflow

A task may not be completed immediately by a single unconfirmed click.

Required interaction:

1. User clicks “Mark complete”.
2. A confirmation dialog shows the exact task ID and title.
3. User confirms or cancels.
4. On confirmation, update only that task.
5. Add an audit entry showing before and after status.
6. Refresh summaries.
7. Show a success message.
8. Repeating the action on an already completed task must be safe and must not create inconsistent state.

Also provide “Reopen task” with the same confirmation and audit behavior.

### 6. Subtask editor

Create a user-friendly detailed editor for the task `BKL-001 — Confirm backline requirements`.

The editor must support these fictional subitems:

- Drum kit
- Hammond-style organ
- Grand piano
- Bass amplifier
- Guitar amplifier 1
- Guitar amplifier 2
- Voltage transformers
- Music stands
- Additional requirements

For each item allow:

- required: Yes / No / TBC
- status
- owner
- note
- show-sheet relevant: Yes / No

Changes must use the same safety pattern:

**PLAN → APPROVE → APPLY**

### 7. PLAN → APPROVE → APPLY

For event-header and subtask edits:

- Edit values in a form.
- Clicking “Create plan” must not change stored data.
- Show a human-readable before/after preview.
- Require an explicit approval checkbox.
- Only then enable “Apply changes”.
- Applying must update only the planned fields.
- Add a detailed audit entry.
- Allow cancellation without changes.

Do not call this autonomous. Make human approval visually central.

### 8. Contacts

Display fictional contacts with:

- role
- name
- organization
- email
- phone
- preferred communication method

Use only `example.com` email addresses and obviously fictional names and organizations.

### 9. Audit & Safety

Show:

- timestamp
- action
- entity
- before
- after
- initiated by
- result

Also show the operating principles:

- no automatic deletion
- no silent overwrite
- human approval before consequential changes
- changes are scoped to one event and one entity
- audit trail for every change
- reset available for the fictional demo only

### 10. Visual design

Use a professional, calm operations-dashboard style inspired by a live-event venue:

- warm orange as the primary/header color
- strong blue for actions and navigation
- neutral white/grey surfaces
- green only for confirmed success
- amber for warnings
- red only for critical risk

Do not use gradients, decorative stock photos, or fake AI imagery.

The dashboard should look credible in a 3-minute product demo and at 16:9 screen recording size.

## Data

Use the fictional data from `demo-data/demo-event.json`.

You may copy it into a normal non-module JavaScript data file so the app works from `file://`, but keep the JSON file as the human-readable sample-data source.

## Files to create

At minimum:

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `LICENSE`
- `CODEX_BUILD_LOG.md`

You may add small local files if they improve maintainability, but keep the project simple.

## README requirements

The README must include:

- problem
- solution
- features
- safety model
- how to run
- how to reset
- sample data statement
- privacy statement
- browser support
- project limitations
- how Codex and GPT-5.6 were used
- a short section for the Codex `/feedback` Session ID
- Build Week demo/video checklist

Be completely honest:

- the underlying EVA production concept existed before Build Week
- the anonymized browser demo was implemented and refined during Build Week with Codex and GPT-5.6
- the demo is not connected to the private production system
- it does not use an AI model at runtime
- its purpose is to demonstrate a safe human–AI workflow and the Codex-assisted implementation

## Code quality

- Use clear names and small functions.
- Add concise comments only where useful.
- Avoid duplicated logic.
- Do not use `innerHTML` with untrusted user input.
- Escape or render user-entered text safely with `textContent`.
- Validate dates and required fields.
- Preserve original demo data for reset.
- Do not add hidden network calls.
- Do not add telemetry.
- Do not add fake claims, fake metrics, or references to real artists.

## Testing

After implementation:

1. Run every test in `docs/ACCEPTANCE_TESTS.md`.
2. Create `CODEX_BUILD_LOG.md` documenting:
   - what Codex built
   - major design decisions
   - issues found
   - changes made after testing
   - remaining limitations
3. Report the test result as:
   - GREEN
   - YELLOW with explanation
   - RED with explanation
4. Do not declare the project finished while a required test is RED.

## Final response

When finished, provide:

- concise summary
- file list
- test result
- exact local run instruction
- limitations
- suggested 3-minute demo flow
- reminder to run `/feedback` and save the Codex Session ID
