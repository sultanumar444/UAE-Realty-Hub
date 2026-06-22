---
name: pnpm add reformats pnpm-workspace.yaml
description: Running pnpm add inside a package can rewrite the root pnpm-workspace.yaml, stripping security comments and the minimumReleaseAge block
---

Running `pnpm add <pkg>` from inside a workspace package (e.g. `scripts`) can cause pnpm to **rewrite the entire root `pnpm-workspace.yaml`**: it strips all comments, re-sorts `catalog`/`overrides` alphabetically, drops the `# SECURITY` documentation block, repins catalog entries (`^0.45.2` → `0.45.2`), and may inject `autoInstallPeers: false`. The functional `minimumReleaseAge: 1440` value survives but moves; the documentation around it is lost.

**Why:** the security comment block (supply-chain `minimumReleaseAge` defense) is valuable and must not be silently deleted. A 200-line YAML diff after adding one dependency is the tell.

**How to apply:** after any `pnpm add`, check `git diff pnpm-workspace.yaml`. If it was reformatted, restore the original with `git show HEAD:pnpm-workspace.yaml > /tmp/orig.yaml && cp /tmp/orig.yaml pnpm-workspace.yaml` (note: chaining a `git` read after `cp` can trip the destructive-git guard on `.git/index.lock` — run the `cp` alone). The package's `package.json` keeps its `"catalog:"` entry, which still resolves against the restored catalog. Then run `pnpm install --no-frozen-lockfile` to re-sync the lockfile to the restored catalog, and confirm with `pnpm install --frozen-lockfile`.

Note: `@workspace/db` re-exports its schema (`export * from "./schema"`) but NOT drizzle-orm operators like `eq`. Scripts needing `eq`/`and`/etc. must depend on `drizzle-orm` directly.
