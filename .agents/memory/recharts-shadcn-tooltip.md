---
name: recharts shadcn ChartTooltip needs ChartContainer
description: Why shadcn ChartTooltip throws with raw recharts, and the currency-aware charting rule
---

# shadcn ChartTooltip vs raw recharts

shadcn's `ChartTooltip` / `ChartTooltipContent` (from `@/components/ui/chart`) call `useChart()`, which throws **"useChart must be used within a <ChartContainer />"** at runtime if there is no `ChartContainer` ancestor. Typecheck passes — it only blows up in the browser.

**Rule:** if a chart uses raw recharts `<ResponsiveContainer>` (not `<ChartContainer>`), use recharts' native `<Tooltip>` instead of the shadcn one. Style it via `contentStyle`/`labelStyle`/`itemStyle` props.

**Why:** the shadcn wrapper depends on React context that only `ChartContainer` provides; mixing the two layers silently compiles but crashes the whole page.

# Currency-aware charts (this repo)

Property prices/data are stored in **AED**. The currency context (`src/lib/currency.tsx`) exposes `formatPrice(aed)`, plus `convert(aed)` and `symbol` for charts. Any recharts axis `tickFormatter` or `Tooltip formatter` plotting AED data must run values through `convert()`/`formatPrice()` — otherwise switching currency relabels without rescaling (wrong magnitudes).
