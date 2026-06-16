---
name: Drizzle wraps Postgres error codes on the cause chain
description: How to detect Postgres SQLSTATE codes (e.g. FK violations) when using Drizzle ORM in this repo
---

Drizzle ORM (node-postgres) wraps the underlying pg error in a "Failed query" Error. The original pg error — with its SQLSTATE `code` (e.g. `23503` foreign_key_violation, `23505` unique_violation) — is NOT on the top-level error. It lives on the `cause` chain.

**How to apply:** To map a DB constraint error to a controlled HTTP response, walk `err.cause` (a few levels) looking for a string `code`. See `pgErrorCode()` in `artifacts/api-server/src/routes/leads/index.ts`. Checking only `err.code` at the top level silently misses the code and the error bubbles to a 500.
