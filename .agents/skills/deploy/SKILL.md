---
name: deploy
description: Run full validation (typecheck + build + dry-run) then deploy to Cloudflare Workers. Use before any production deployment.
disable-model-invocation: true
---

Run full validation then deploy:

```bash
cd /Users/FradSer/Developer/FradSer/git-agent/git-agent-home
pnpm check && pnpm deploy
```

If `pnpm check` fails, fix the errors before deploying. Do not skip validation.
