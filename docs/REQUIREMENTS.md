# EVA Build Week Demo V1 — Requirements

## Product statement

EVA turns fragmented event-production information into one controlled, auditable workflow. The demo must show that AI-assisted automation can help domain experts without removing human responsibility.

## Core demonstration

The viewer should understand within 30 seconds:

1. This is a live-event production dashboard.
2. Information is structured around one event.
3. Tasks and subtasks can be edited safely.
4. Consequential changes require a preview and explicit approval.
5. Every change creates an audit record.
6. No real production data is present.

## Must-have features

- Fully local static web app
- No installation or internet required
- Responsive event dashboard
- Overview metric named **Due in final week**, calculated from the final seven days before the event
- Visible seating type and seating note
- Task filters
- Confirmed mark-complete and reopen workflow
- Backline subtask editor
- PLAN → APPROVE → APPLY workflow
- Contacts view
- Audit & Safety view
- Update-dashboard action
- Demo reset
- Local persistence using localStorage
- Fictional-data disclaimer

## Out of scope for V1

- Real Excel integration
- Real Windows file operations
- Outlook or Gmail integration
- Multi-event production migration
- Authentication
- Cloud synchronization
- OpenAI API calls at runtime
- Real contracts, riders, artists, venues, emails, or phone numbers
- Autonomous decisions
- Production deployment

## Demo narrative

A venue manager opens a production dashboard, sees one critical task, edits detailed backline requirements, reviews a plan, explicitly approves the changes, marks the related task complete, and verifies the audit trail.
