---
name: Arabic i18n dictionary
description: How the t()-based Arabic dictionary works and the duplicate-key trap when adding strings
---

The web app's Arabic translations live in a single `AR: Record<string,string>` object in
`artifacts/your-key-property/src/lib/language.tsx`, keyed by the **English source string**
(`t("English text")` returns the AR value when lang==="ar", else the English source).

**Trap:** because it is one object literal, adding a key that already exists elsewhere in the
object fails typecheck with TS1117 ("multiple properties with the same name"). Many common
words are already present (e.g. Email, Phone, Amenities, Message, Bedrooms, Handover).

**How to apply:** before appending new AR keys, grep the file for each English string and only
add the ones not already defined. Run `pnpm --filter @workspace/your-key-property run typecheck`
to catch dupes.
