# Urinary retention (Tømmingsproblemer for urin)

**All content for this condition comes from Directus only. There is no hardcoded fallback.**

- The live route `/conditions/urinary-retention` is rendered by `src/pages/conditions/ConditionPage.tsx`, which fetches the tilstand by slug `urinary-retention` from Directus and renders `TilstandIntroduction` + `TilstandDynamicSection`.
- The local components in `components/` (causes, symptoms, treatment, etc.) are **not** used by that route; they have empty data so the codebase does not imply any fallback.

## Syncing section and subsection content to Directus

To fill the tilstand in Directus with sections and subsections (Funksjon, Symptomer, Årsaker, Utredning, Behandling, Øvelser, Ressurser, Referanser and their trekkspill/accordion items), run:

```bash
npm run sync:urinary-retention
```

or

```bash
node scripts/sync-urinary-retention-directus.js
```

- **Requires** `.env`: `VITE_DIRECTUS_URL`, `VITE_DIRECTUS_TOKEN`.
- **Data source**: `scripts/urinary-retention-tilstand-data.json`. Edit this file to change section titles, intros and trekkspill (accordion items with optional underseksjoner) before syncing.
- The script finds the tilstand by slug `urinary-retention` and PATCHes it with the JSON payload.
