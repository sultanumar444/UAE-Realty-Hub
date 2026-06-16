# Your Key Property Management

A Dubai & Abu Dhabi real estate brokerage website with a built-in team CRM. The public marketing site showcases property listings and captures leads; the authenticated CRM lets the team manage listings, leads, and agents, and export a portal XML feed.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/your-key-property run dev` — run the web app (Vite)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/scripts run seed` — seed agents + listings (idempotent; skips if listings exist)
- Required env: `DATABASE_URL`; Clerk: `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` (and `VITE_CLERK_PROXY_URL` in production)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web: React + Vite + Tailwind, wouter routing, TanStack Query
- API: Express 5
- Auth: Clerk (team sign-up/sign-in)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Object storage: App Storage for listing/agent images

## Where things live

- DB schema (source of truth): `lib/db/src/schema/{listings,leads,agents}.ts`
- API contract: `lib/api-spec/openapi.yaml` → codegen into `@workspace/api-client-react` (hooks) and `@workspace/api-zod` (schemas)
- API route handlers: `artifacts/api-server/src/routes/{listings,leads,agents}/index.ts`
- CRM UI: `artifacts/your-key-property/src/pages/Crm.tsx` + `src/pages/crm/*`
- Public ↔ DB glue: `artifacts/your-key-property/src/lib/{useProperties.ts,listingApi.ts}`
- Auth wiring: `artifacts/your-key-property/src/auth/clerk.tsx`
- Seed data: `scripts/src/seed.ts`

## Architecture decisions

- Public pages (`/`, `/properties`, `/contact`, property detail) are open; only `/crm` and all write/admin API routes are gated (Clerk `requireAuth`). `POST /leads` is intentionally public for lead capture.
- The public site reads listings from the DB but falls back to a bundled static catalogue (`src/lib/properties.ts`) when no published listings exist, so the marketing site never renders empty.
- DB-backed `Property` objects carry `dbBacked: true`; the property-detail enquiry form only attaches `listingId` for DB-backed listings to avoid FK violations against static fallback IDs.
- Generated OpenAPI input types treat optional fields as `T | undefined` (not `null`); form mappers emit `undefined` for empty optional fields.
- Listing/agent images store an object path; `storageUrl()` maps `/objects/...` paths to `/api/storage/objects/...` and leaves bundled `/images/...` paths untouched.

## Product

- Public: browse/search listings, view property detail with mortgage/ROI tools, submit enquiries and contact-form leads.
- CRM (team, behind auth): Listings CRUD with image upload, Leads inbox with status workflow, Agents/team management.
- Portal XML feed export endpoint (Bayut/Dubizzle/Property Finder). Inbound portal sync needs partner credentials (not configured).

## User preferences

- Brand: navy `#0A1628` + gold `#C9974C`. "Vertical Ascent" design language. No emojis anywhere.
- Branding/content sourced from www.yourkey.ae (logos, two office addresses, contact numbers).

## Gotchas

- Do not change the OpenAPI `info.title` — it controls generated filenames.
- After editing `lib/*`, run `pnpm run typecheck:libs` before leaf artifact checks.
- Drizzle wraps Postgres errors; the pg error `code` (e.g. `23503` FK violation) lives on the error `cause` chain, not the top-level error. See the `pgErrorCode` helper in the leads route.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
