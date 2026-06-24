---
name: Arabic i18n architecture
description: How site-wide Arabic translation works and the convention for adding new translatable copy.
---

# Arabic translation (English-source-keyed fallback)

`src/lib/language.tsx` `t()` resolves in this order: legacy dot-keyed `TRANSLATIONS`
(en/ar pairs) → if `lang === "en"` return the key verbatim → else `AR[key]` (an
English-string → Arabic map) → else the key itself. So components wrap visible copy
as `t("Exact English string")`; the English string IS the dictionary key.

**Why:** lets any component become translatable without inventing key namespaces,
and lets a future agent build the Arabic dictionary just by grepping `t("...")`
literals. Subagents wrapped ~20 public pages this way; the main agent owns `AR`.

**How to apply:**
- New public-facing copy: wrap with `t("English")` and add the same English key +
  Arabic value to the `AR` object in `language.tsx`. Keep a consistent glossary
  (e.g. Properties=العقارات, View Details=عرض التفاصيل, Off Plan=على الخارطة).
- `<select>`: set an explicit English `value="..."` on each `<option>` and translate
  only the display text (`{t(label)}`), so filter/query logic that compares the
  value keeps working.
- Do NOT wrap dynamic DB data (titles, prices, agent names), classNames, hrefs,
  data-testid, or anything used in logic.
- CRM/admin pages are intentionally left English (not translated).
- RTL is handled globally: `dir`/`lang` are set on `document.documentElement` from
  the selected language; no per-component RTL needed.
- To eyeball Arabic locally, temporarily flip the initial `useState<Lang>("en")` to
  `"ar"` (fresh session has empty localStorage), screenshot, then revert.
