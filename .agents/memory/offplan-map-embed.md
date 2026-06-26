---
name: Off-plan map embed safety
description: How a pasted Google Maps link becomes an iframe src on the off-plan detail page, and the host-validation rule.
---

# Off-plan detail map embed (`buildMapSrc` in `OffPlanProject.tsx`)

Admins paste a Google Maps link (share link, place URL with `@lat,lng`, `?q=`, or a full `<iframe>` snippet) into the off-plan project `mapUrl` field. `buildMapSrc()` converts it to an embeddable iframe `src`.

## Rule: only frame verbatim URLs from Google hosts
A pasted URL is returned verbatim (used directly as iframe `src`) **only** when it both looks embeddable (`/maps/embed` or `output=embed`) **and** `isGoogleMapsHost()` passes (`google.com`, `*.google.com`, `maps.app.goo.gl`, `goo.gl`). Otherwise it falls through to coordinate/`?q=` parsing, and finally to a constructed `https://www.google.com/maps?q=<encoded>&output=embed` search embed.

**Why:** without the host gate, any pasted non-Google URL containing `output=embed` would be framed directly — an arbitrary-iframe-source risk flagged in code review.

**How to apply:** keep the host check on the verbatim-return path. `maps.app.goo.gl` short links carry no coords/`q`, so they degrade to a search-query embed (renders a map, never a verbatim untrusted frame) — this is acceptable, do not "fix" it by framing the short link directly.
