---
name: Public-read draft gating
description: How public GET endpoints must hide unpublished content while CRM (authenticated) sees everything, in this Express + Clerk API.
---

# Public-read endpoints must gate unpublished content server-side

Any public (non-`requireAuth`) GET route that serves content with a `status` (draft/published) workflow must enforce published-only **on the server**, not just in the client UI. Client-side filtering (`status !== "published"`) does not stop anyone from hitting the API directly and reading drafts.

**Pattern used:** `clerkMiddleware` is applied globally in `app.ts`, so `getAuth(req)?.userId` works inside *any* handler — even ones without `requireAuth`. Use it to branch:

- `const isAuthed = Boolean(getAuth(req)?.userId);`
- List route: `const status = isAuthed ? requestedStatus : "published";`
- by-slug / by-id routes: push `eq(table.status, "published")` into the WHERE conditions only when `!isAuthed`.

This lets the authenticated CRM list/preview drafts while the public site (and anonymous API callers) only ever see published rows.

**Why:** an architect review caught that the posts feature leaked drafts via `GET /posts`, `/posts/by-slug/:slug`, and `/posts/:id` because gating lived only in the React pages.

**How to apply:** whenever you add a public read endpoint backed by a table that has a publish/visibility flag, gate it with the `getAuth` branch above. Verify by inserting a draft row directly and curling the endpoint anonymously (expect it hidden / 404).
