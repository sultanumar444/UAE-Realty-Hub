---
name: Lead contact phone capture
description: How the public Get-in-Touch dialog captures international phone + WhatsApp.
---

The public Get-in-Touch dialog (`GetInTouchDialog.tsx`) captures phone numbers with `react-phone-number-input` (`international`, `defaultCountry="AE"`), styled via `src/styles/phone-input.css` (`.ykp-phone`).

**Why flags are allowed:** the library renders country flags as SVG **images** (country-flag-icons), not unicode emoji, so they do not violate the project's no-emoji rule.

**WhatsApp handling:** the `leads` table has no `whatsapp` column, so the dialog's WhatsApp number is appended into the lead `message` field (e.g. `WhatsApp: +44... | Opted in...`). If you later want structured WhatsApp on leads, add a column end-to-end (schema → OpenAPI → codegen → CRM leads view) instead of parsing the message.

**How to apply:** reuse `<PhoneInput className="ykp-phone" international defaultCountry="AE" />` for any new public phone field; keep values E.164.
