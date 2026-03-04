# Textbook section data (data_no / data_en)

Data for lærebok-seksjonene brukes av:

1. **Seksjonskomponentene** i `src/conditions/pregnancy/components/textbook/` – de importerer herfra og bruker hardkodet data som fallback når Directus ikke har `data_no`/`data_en`.
2. **Sync-scriptet** `npm run sync:textbook-data` – sender data til Directus (`Pregnancy_Chapters.data_no` / `data_en`).

## Filer

- **Seksjoner med egen datafil (synces til Directus):** `seek-help-data.ts`, `delivery-method-data.ts`, `intercourse-data.ts`, `pelvis-pregnancy-data.ts`.
- **Øvrige kapitler** (pelvic-floor, birth-tears, prolapse, bladder-function, bowel-function, female-circumcision): data ligger fortsatt i respektive `.tsx`-filer. For å synce dem til Directus, opprett tilsvarende `*-data.ts` her (kopier strukturen fra seksjonsfilen) og legg til import + element i `SECTION_DATA` i `scripts/sync-pregnancy-textbook-data-directus.ts`.

## Directus

Kjør `node scripts/add-directus-pregnancy-chapter-data-fields.js` én gang for å opprette feltene `data_no` og `data_en` (JSON) på `Pregnancy_Chapters` hvis de mangler.
