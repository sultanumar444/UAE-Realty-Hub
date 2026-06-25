---
name: Public team is CRM-driven, no static fallback
description: Why the public Agents + About team grids render only DB agents and how seed keeps the roster in sync.
---

The public "Meet The Team" grids on both `Agents.tsx` and `About.tsx` render **only** active DB agents (`useListAgents()` filtered by `active`), with a graceful empty state when none exist. There is intentionally **no** hardcoded static fallback roster.

**Why:** The owner wants adding/deleting an agent in the CRM to reflect everywhere — a static fallback would resurrect removed agents whenever the active set is empty, contradicting that requirement.

**How to apply:**
- Do not reintroduce a `FALLBACK_*` agent array on public team pages. Show the empty state instead.
- The team roster is seeded idempotently by `ensureAgents()` in `scripts/src/seed.ts`, which inserts any missing agents matched by name and runs independently of whether listings already exist (i.e. before the "listings already present" early return), so existing environments get topped up too.
- Production parity: after publishing, the production DB must be seeded (or the agents created via CRM) — they are not auto-copied from dev.
