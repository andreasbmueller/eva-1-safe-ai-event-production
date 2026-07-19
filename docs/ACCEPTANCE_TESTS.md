# Acceptance tests

Record each result in `CODEX_BUILD_LOG.md`.

## A. Local execution

- [ ] A1 Double-clicking `index.html` opens the demo.
- [ ] A2 No local server is required.
- [ ] A3 No browser console errors appear on initial load.
- [ ] A4 No network request is made.
- [ ] A5 The demo works after the internet connection is disabled.

## B. Privacy

- [ ] B1 All names and organizations are fictional.
- [ ] B2 All email addresses use `example.com`.
- [ ] B3 No private path, username, contract, artist, or venue data appears.
- [ ] B4 A fictional-data disclaimer is visible.

## C. Event header

- [ ] C1 Event title, ID, date, venue, level, doors, show time, seating type, seating note, and status appear.
- [ ] C2 Seating type and seating note are visibly distinct.
- [ ] C3 The header remains usable on a narrow browser window.

## D. Dashboard update

- [ ] D0 The overview labels the final-seven-days metric exactly “Due in final week”.
- [ ] D1 “Update dashboard” recalculates summary values.
- [ ] D2 It changes no task or event value.
- [ ] D3 It updates the displayed refresh time.
- [ ] D4 It adds one audit entry.

## E. Task completion

- [ ] E1 Clicking “Mark complete” shows task ID and title before any change.
- [ ] E2 Cancel leaves all data unchanged.
- [ ] E3 Confirm changes only the selected task.
- [ ] E4 The summary updates.
- [ ] E5 An audit entry records before and after.
- [ ] E6 Repeating completion is idempotent.
- [ ] E7 Reopen uses confirmation and audit.

## F. Subtasks

- [ ] F1 `BKL-001` opens a structured subtask editor.
- [ ] F2 All required fictional backline items are present.
- [ ] F3 Editing the form alone changes no stored data.
- [ ] F4 “Create plan” shows before/after values.
- [ ] F5 APPLY stays disabled until explicit approval.
- [ ] F6 Cancel leaves stored data unchanged.
- [ ] F7 Apply changes only planned fields.
- [ ] F8 Audit records the change.
- [ ] F9 User-entered text is rendered safely.

## G. Event-header editing

- [ ] G1 Header editing uses PLAN → APPROVE → APPLY.
- [ ] G2 Seating-note changes become visible after APPLY.
- [ ] G3 Cancel creates no change.
- [ ] G4 Audit records the exact changed fields.

## H. Reset

- [ ] H1 Reset requires confirmation.
- [ ] H2 Reset restores original fictional data.
- [ ] H3 Reset does not affect files outside browser storage.

## I. Accessibility and UX

- [ ] I1 All actions work with keyboard navigation.
- [ ] I2 Focus states are visible.
- [ ] I3 Dialogs have clear titles, cancel, and confirm actions.
- [ ] I4 Status is not conveyed by color alone.
- [ ] I5 Layout is clear at 1920×1080 and 1366×768.
- [ ] I6 Current Chrome, Edge, and Firefox are supported.

## J. Documentation

- [ ] J1 README includes run and reset instructions.
- [ ] J2 README explains Codex/GPT-5.6 use honestly.
- [ ] J3 README states that the underlying concept predated Build Week.
- [ ] J4 README has a placeholder for `/feedback` Session ID.
- [ ] J5 CODEX_BUILD_LOG.md exists and records test results.

## Definition of done

- All required tests GREEN.
- No privacy test YELLOW or RED.
- No feature required for the recorded demo RED.
- Any limitation is written clearly in README and CODEX_BUILD_LOG.md.
