# Directus pregnancy content layout

Content and layout in Directus for the pregnancy condition are aligned with the live page: [https://www.bekkenbunnsportalen.no/conditions/pregnancy](https://www.bekkenbunnsportalen.no/conditions/pregnancy).

**Directus på norsk:** All display names in Directus for pregnancy are in Norwegian (Norsk). No translation system – everything shows in Norsk:
- **Bokmerker:** The presets script uses Norwegian titles (Graviditet – Hovedside, osv.).
- **Visningsnavn for samlinger:** Run `node scripts/directus-display-names-norsk.js` to set collection display names to Norsk (Condition_Pregnancy → «Graviditet – Hovedside», Pregnancy_Problems → «Graviditet – Plager», Pregnancy_Chapters → «Graviditet – Kapitler»). The script sets the same Norsk name for both en-US and nb-NO so the sidebar always shows Norsk.

## 1. Bookmarks and list layouts (script)

A script creates **bookmarks (bokmerker)** in the Directus sidebar in **Norsk**, so content managers see "Graviditet – Hovedside", "Graviditet – Plager", and "Graviditet – Kapitler". It also updates any existing English-named pregnancy presets to Norwegian to avoid duplicates.

### Run the script

```bash
node scripts/directus-pregnancy-presets.js
```

**Required in `.env`:**
- `VITE_DIRECTUS_URL` – Directus instance URL (e.g. `https://directus-cms.sliplane.app`)
- `VITE_DIRECTUS_TOKEN` – Token with permission to create presets (admin or preset create)

**Optional:**
- `DIRECTUS_PRESET_ROLE_ID` – If set, bookmarks are created for this role so all users in the role see them. Otherwise the preset is created for the current user.

The script is idempotent: it updates existing English-titled presets to Norwegian (no duplicates) and only creates a bookmark if the collection has none.

### Collection display names (all in Norsk)

So that **everything in Directus shows in Norsk** (no translation – display names only), run:

```bash
node scripts/directus-display-names-norsk.js
```

This sets the **collection** display names to Norwegian for the three pregnancy collections (Graviditet – Hovedside, Graviditet – Plager, Graviditet – Kapitler) for both en-US and nb-NO, so the sidebar and breadcrumbs always show Norsk. Run after the presets script if you add new instances.

### What it creates (Norsk)

| Bokmerketittel          | Samling              | Listevisning                           |
|-------------------------|----------------------|----------------------------------------|
| Graviditet – Hovedside  | Condition_Pregnancy  | Tabular                                |
| Graviditet – Plager     | Pregnancy_Problems  | Kort, sortert på `sort`, tittel/undertittel |
| Graviditet – Kapitler   | Pregnancy_Chapters   | Kort, sortert på `sort`, tittel/undertittel |

## 2. Form layout (field order) – match the live page

So the CMS “design” is the same as the website, field order in the **detail form** should follow the page structure. Configure this in **Directus → Settings → Data Model** (field order and groups).

### Condition_Pregnancy (single item)

Order and group fields to match the page:

1. **Hero** – `hero_title_no`, `hero_title_en`, `hero_description_no`, `hero_description_en`, `hero_image`
2. **Problems** – relation to Pregnancy_Problems (the “Vanlige plager” grid)
3. **Chapters** – relation to Pregnancy_Chapters (the “Lærebok” content)
4. **Exercises** – `ovelse_*` fields (shared exercises block)
5. **Resources** – `ressurser_*` fields
6. **References** – `referanser_*` fields

### Pregnancy_Problems (each common problem)

Order fields to match the problem tabs on the site:

1. **Name** – `name_no`, `name_en`, `slug`, `sort`, `icon`
2. **About** – `about_no`, `about_en`
3. **Symptoms** – `symptoms_no`, `symptoms_en`
4. **Self-help** – `self_help_no`, `self_help_en`
5. **Seek help** – `seek_help_no`, `seek_help_en`
6. **Media & links** – `image`, `link_url`, `link_text_no`, `link_text_en`, `pdf_file`, etc.

### Pregnancy_Chapters (textbook)

1. **Chapter** – `title_no`, `title_en`, `sort`, `condition_id`
2. **Sections** – nested sections with `title_no`, `title_en`, `content_no`, `content_en`, `sort`

## 3. Content parity with the live site

All pregnancy content in Directus should match what is shown on [bekkenbunnsportalen.no/conditions/pregnancy](https://www.bekkenbunnsportalen.no/conditions/pregnancy). If you add or change content on the site, update Directus accordingly. For bulk migration from existing data, use or extend `scripts/migrate.ts`.

## 4. Vite app: pregnancy page (ingen duplikat)

The pregnancy page in the app (`/conditions/pregnancy`, e.g. `http://localhost:5173/conditions/pregnancy` or `--port 5174`) uses **only CMS data** from Directus: hero, problems, chapters, exercises, resources, and references come from `usePregnancyData` (Condition_Pregnancy and relations). There is no duplicate hardcoded body content; only small UI labels (e.g. section title "Vanlige plager under graviditet og etter fødsel") are fixed in code. Colors, layout, and UI/UX are unchanged from the original design.
