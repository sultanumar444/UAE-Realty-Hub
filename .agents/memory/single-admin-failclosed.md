---
name: Single-admin fail-closed auth
description: Why the CRM admin gate (server + client) must reject when the admin email env var is missing
---

The CRM is locked to one admin account. Authorization compares the signed-in Clerk
user's primary email against `ADMIN_EMAIL` (server `requireAuth`) / `VITE_ADMIN_EMAIL`
(client `AdminGate`).

**Rule:** Both gates must be fail-closed. If the admin email env var is unset/empty,
the server returns 500 (Server misconfiguration) and the client blocks the CRM —
never fall through to "allow any authenticated user".

**Why:** An earlier version only enforced the email match *inside* `if (ADMIN_EMAIL)`,
so a missing/misconfigured env var silently downgraded to "any signed-in Clerk user
can write" — a real privilege-escalation hole for a single-admin product.

**How to apply:** Any change to the auth gates must keep the missing-env branch
explicitly denying access. There is no public sign-up; the admin user is provisioned
directly in Clerk and must be re-created in the production Clerk instance after publish.
