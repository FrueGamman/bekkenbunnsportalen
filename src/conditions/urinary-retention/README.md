# Urinary retention (Tømmingsproblemer for urin)

**All content for this condition comes from Directus only. There is no hardcoded fallback.**

- The live route `/conditions/urinary-retention` is rendered by `src/pages/conditions/ConditionPage.tsx`, which fetches the tilstand by slug `urinary-retention` from Directus and renders `TilstandIntroduction` + `TilstandDynamicSection`.
- The local components in `components/` (causes, symptoms, treatment, etc.) are **not** used by that route; they have empty data so the codebase does not imply any fallback.
- To sync the full original content (from bekkenbunnsportalen.no) into Directus, run:
  ```bash
  node scripts/sync-urinary-retention-directus.js
  ```
  Requires `.env`: `VITE_DIRECTUS_URL`, `VITE_DIRECTUS_TOKEN`. Updates `tilstander` id 2.
