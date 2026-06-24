---
name: CRM PATCH clear semantics
description: Why CRM edit forms must send explicit empty values, not undefined, for clearable fields
---

# CRM update forms: clearing fields

When a CRM edit form maps state to an OpenAPI `*Input`/`*Update` payload, do NOT collapse empty
collections/strings to `undefined` for fields the admin should be able to CLEAR.

**Why:** `JSON.stringify` drops `undefined` keys, so the server never receives them; the PATCH
route spreads `{ ...parsed.data }`, meaning an omitted field is treated as "leave unchanged",
not "set to empty". Result: once a field is set, it can never be cleared via the UI.

**How to apply:** For clearable arrays send `[]`; for clearable nullable scalars send `null`
(or `""` if the column is non-null text with a default). Only collapse to `undefined` for fields
that genuinely should never be cleared. Create is unaffected because empty values match schema
defaults. Applies to off-plan project fields (floorPlans, paymentMilestones, materials,
locationImage, mapAddress, gallery, amenities, highlights) in OffPlanProjectsPanel.tsx.
