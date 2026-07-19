# Safety and privacy constraints

## Hard privacy boundary

Never include or infer:

- real artist names
- real venue names
- real event dates from the production system
- real email addresses
- real telephone numbers
- real contract values
- real travel or hotel details
- Dropbox paths
- Windows usernames
- internal event IDs
- screenshots from the private production system
- private source documents or excerpts

## Safe demo behavior

- All data is fictional.
- All writes remain inside browser localStorage.
- The demo makes no network requests.
- The demo never deletes local files.
- “Reset demo” resets only fictional browser data.
- Every consequential edit is previewed and confirmed.
- Audit entries are append-only during a demo session.
- The user can cancel before APPLY.

## Claims boundary

Allowed:
- “The production concept was developed from a real live-event workflow.”
- “The anonymized browser demo was implemented with Codex and GPT-5.6.”
- “The workflow demonstrates human-controlled automation.”

Not allowed without proof:
- productivity percentages
- cost savings
- error-reduction percentages
- customer counts
- claims of autonomous operation
- claims that the demo is connected to production
