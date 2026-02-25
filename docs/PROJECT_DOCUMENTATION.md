# Bekkenbunnsportalen – Project Documentation

This document describes how the **Bekkenbunnsportalen** (Pelvic Floor Portal) project works: architecture, files, data flow, and how to work with it.

---

## 1. Overview

**Bekkenbunnsportalen** is a bilingual (Norwegian/English), accessible React web app that provides evidence-based information on pelvic floor health. It is a modern reimplementation of [bekkenbunnsportalen.no](https://www.bekkenbunnsportalen.no/), with:

- **Content from Directus CMS**: Homepage and all condition pages (except pregnancy) are driven by the **Directus** headless CMS.
- **Condition-based structure**: Each “condition” (e.g. urinary incontinence, constipation, pelvic pain) has a fixed set of sections (Normal function, Symptoms, Causes, Diagnosis, Treatment, Exercises, Resources, References). Content per section comes from Directus.
- **Pregnancy**: Has its own UI (overview, textbook, exercises, etc.) and is partly hardcoded; it does not use the same CMS pattern as the other conditions.
- **Professionals / Helsepersonell**: A dedicated section for healthcare professionals (hardcoded content).
- **Accessibility**: Keyboard navigation, focus states, dark/light theme, optional text-to-speech.

---

## 2. Tech Stack

| Layer        | Technology |
|-------------|------------|
| Runtime     | Node.js 20+ |
| Framework   | React 19, TypeScript |
| Build       | Vite 7 |
| Routing     | React Router 7 |
| CMS         | Directus (REST API) |
| Styling     | CSS Modules, global theme CSS |
| State       | React Context (language, theme), local state |
| Hosting     | Vercel (SPA with rewrites) |

---

## 3. Project Structure

```
bekkenbunnsportalen/
├── public/                 # Static assets (images, SVGs)
├── src/
│   ├── main.tsx            # App entry: providers, routes
│   ├── router.tsx          # HashRouter vs BrowserRouter (webview/IAB handling)
│   ├── index.css           # Global styles
│   ├── styles/             # Theme and global CSS
│   │
│   ├── pages/              # Top-level route components
│   │   ├── App.tsx         # Homepage (hero, exercises, testimonials, etc.)
│   │   ├── About.tsx
│   │   ├── conditions/
│   │   │   └── ConditionPage.tsx   # Single page for ALL conditions (urinary-incontinence, constipation, etc.)
│   │   ├── helsepersonell/
│   │   │   └── Helsepersonell.tsx  # Professionals section (hardcoded)
│   │   ├── anatomy/
│   │   ├── search/
│   │   └── ...
│   │
│   ├── components/         # Shared UI components
│   │   ├── Header.tsx, Footer.tsx
│   │   ├── hero-section.tsx, try-exercise-section.tsx, testimonial-section.tsx
│   │   ├── TilstandIntroduction.tsx   # Condition intro + video/image (from CMS)
│   │   ├── TilstandDynamicSection.tsx # Renders one section (symptoms, causes, exercises, etc.) from CMS
│   │   ├── CommonExerciseSection.tsx  # “Try yourself” + videos + app link (used when exercise data from CMS)
│   │   ├── HomepageOrganizations.tsx
│   │   ├── ui/             # Buttons, cards, modals, video player, etc.
│   │   └── ...
│   │
│   ├── conditions/         # Condition-specific components (legacy / pregnancy)
│   │   ├── shared/         # Shared condition UI
│   │   ├── pregnancy/      # Pregnancy overview, textbook, sections (special UI)
│   │   ├── urinary-incontinence/
│   │   ├── urinary-retention/
│   │   ├── fecal-incontinence/
│   │   ├── constipation/
│   │   └── pelvic-pain/
│   │
│   ├── context/            # React context
│   │   ├── LanguageProvider.tsx, LanguageContext.tsx, useLanguage
│   │   └── ThemeProvider.tsx, ThemeContext.tsx, useTheme
│   │
│   ├── hooks/
│   │   ├── useHomepageData.ts   # Fetches homepage data from Directus (hjemmeside, tilstander, etc.)
│   │   ├── useConditionDetails.ts # Fetches one condition (tilstand) by slug from Directus
│   │   ├── usePageData.ts
│   │   └── useTextToSpeech.ts
│   │
│   ├── lib/
│   │   └── directus.ts     # directusFetch(), getImageUrl() – API and asset URLs
│   │
│   ├── types/
│   │   └── cms.ts          # TypeScript types for Directus: Hjemmeside, Tilstand, etc.
│   │
│   ├── seo/                # SEO meta tags, JSON-LD, language alternates
│   │   ├── RouteSEO.tsx
│   │   ├── Seo.tsx
│   │   └── keywords.ts
│   │
│   └── data/               # Static JSON (e.g. constipation seed), no longer main content source
│
├── scripts/                # Node scripts (Directus setup)
│   ├── add-directus-ovelse-fields.js   # Creates exercise fields on tilstander
│   ├── directus-ovelse-fields-show-in-ui.js  # Adjusts sort so fields show in Øvelser section
│   └── seed-constipation-tilstand.js   # Seeds constipation content into Directus
│
├── docs/
│   ├── PROJECT_DOCUMENTATION.md   # This file
│   └── DIRECTUS_OVELSER.md       # How to use exercise fields in Directus
│
├── vite.config.ts          # Vite config; dev proxy to Directus
├── vercel.json             # Build, rewrites, headers for Vercel
├── package.json
└── .env                    # VITE_DIRECTUS_URL, VITE_DIRECTUS_TOKEN (not committed)
```

---

## 4. Data Flow and Directus

### 4.1 Directus base URL and auth

- **Development**: Vite proxies `/items` and `/assets` to the Directus instance (see `vite.config.ts`). The app uses `VITE_DIRECTUS_URL` and `VITE_DIRECTUS_TOKEN` from `.env`.
- **Production**: The same env vars are used; requests go from the browser to the Directus API (or via your backend if you add one).

`src/lib/directus.ts`:

- `directusFetch<T>(endpoint, options)` – GET (or other) request to Directus; returns `result.data` as `T`.
- `getImageUrl(id)` – builds asset URL for Directus file ID (e.g. for images).

### 4.2 Homepage data

- **Hook**: `useHomepageData(language)` in `src/hooks/useHomepageData.ts`.
- **Fetches** (in parallel):
  - `GET /items/hjemmeside` → hero, exercises block, video, testimonials, education, e-learning, conference, etc.
  - `GET /items/testimonials?fields=*,translations.*`
  - `GET /items/e_learning_courses?fields=*,translations.*`
  - `GET /items/events?fields=*,translations.*`
  - `GET /items/pasientorganisasjoner?filter[aktiv][_eq]=true`
  - `GET /items/tilstander?fields=slug,navn,side_tittel,side_tittel_en,ikon` (for condition list in hero).
- **Types**: `Hjemmeside`, `PatientStory`, `ELearningCourse`, `Event`, `Pasientorganisasjon` in `src/types/cms.ts`.
- **Usage**: `App.tsx` passes the normalized `HomepageData` into `HeroSection`, `TryExerciseSection`, `TestimonialSection`, `ElearningSection`, `ConferenceSection`, `HomepageOrganizations`, etc.

### 4.3 Condition (tilstand) data

- **Hook**: `useConditionDetails(slug, language)` in `src/hooks/useConditionDetails.ts`.
- **Fetches**: `GET /items/tilstander?filter[slug][_eq]=<slug>&fields=*` → one **Tilstand** object.
- **Slug** comes from the URL: `/conditions/urinary-incontinence` → slug `urinary-incontinence`. Same for `urinary-retention`, `fecal-incontinence`, `constipation`, `pelvic-pain`, `pregnancy` (pregnancy still uses this for nav; content is partly hardcoded).

The **Tilstand** type in `src/types/cms.ts` defines all section fields. Each section has a prefix:

- **Page intro**: `side_intro`, `side_intro_en`, `side_tittel`, etc.
- **Normal function**: `funksjon_tittel`, `funksjon_intro`, `funksjon_trekkspill`, `funksjon_video_id`, `funksjon_forekomst_innhold`, etc.
- **Symptoms**: `symptomer_tittel`, `symptomer_intro`, `symptomer_sitat`, `symptomer_trekkspill`, etc.
- **Causes**: `arsaker_*`
- **Diagnosis**: `utredning_*`
- **Treatment**: `behandling_*`
- **Exercises**: `ovelse_tittel`, `ovelse_intro`, `ovelse_trekkspill` and optional structured fields: `ovelse_try_yourself_title`, `ovelse_step1_text`, `ovelse_videos` (JSON), `ovelse_steps`, `ovelse_gender_instructions`, `ovelse_smartphone_apps`.
- **Resources**: `ressurser_*`
- **References**: `referanser_*`

Each section typically has `_tittel`, `_tittel_en`, `_intro`, `_intro_en`, and `_trekkspill` (accordion items). Rich text is HTML from Directus.

---

## 5. Routing and Pages

### 5.1 Router setup

- **Entry**: `src/main.tsx` renders `AppRouter` → `ThemeProvider` → `LanguageProvider` → `RouteSEO` + `Routes`.
- **Router type**: `src/router.tsx` chooses `HashRouter` or `BrowserRouter` based on user agent (in-app browsers, webviews, Samsung) so deep links work.
- **Routes** (main ones):
  - `/` → `App` (homepage)
  - `/conditions/:id` → `ConditionPage` (all conditions)
  - `/conditions` → `ConditionPage` (no id)
  - `/professional`, `/helsepersonell` → `Helsepersonell`
  - `/about`, `/accessibility`, `/tilgjengelighet`, `/personvern`, `/useful`, `/search`, `/anatomy`, `/disciplines/gynekologi`, `/test`

### 5.2 Condition page (`ConditionPage.tsx`)

- **Single component** for every condition: `urinary-incontinence`, `urinary-retention`, `fecal-incontinence`, `constipation`, `pelvic-pain`, `pregnancy`.
- **URL**: `/conditions/<id>` (e.g. `/conditions/constipation`). Optional query: `?section=symptoms`.
- **Section list** is defined in `CONDITION_SECTIONS_MAP` in `ConditionPage.tsx`: each condition has an ordered list of section ids and titles (no/en). Example:
  - **Constipation**: no “Normal function”; starts with Symptoms, then Causes, Diagnosis, Treatment, Exercises, Resources, References.
  - **Others**: Normal function, Symptoms, Causes, Diagnosis, Treatment, Exercises, Resources, References.
  - **Pregnancy**: Overview, Exercises, Textbook, Resources, References (and uses different cards).
- **Data**: `useConditionDetails(activeCondition, language)` returns `{ tilstand, loading, error }`. `tilstand` is the full Directus item for that condition.
- **Rendering**:
  - **Pregnancy**: Uses `UpgradedPregnancyContent` and pregnancy-specific section cards.
  - **All others**: `TilstandIntroduction` (intro + prevalence + video/image) and `TilstandDynamicSection` for the active section. Section id (e.g. `symptoms`, `exercises`) is passed as `activeSection`; `TilstandDynamicSection` reads the corresponding prefix from `tilstand` and renders title, intro, accordions, and rich text (including images and blockquotes).

---

## 6. How a Section Is Rendered (CMS-Driven Conditions)

### 6.1 Section mapping

- `ConditionPage` maps `activeSection` (e.g. `exercises`) to a **prefix** (e.g. `ovelse`). That mapping is also duplicated in `TilstandDynamicSection` via `sectionMap`.
- For a given section, the component reads from `tilstand`:
  - `prefix_tittel`, `prefix_tittel_en`
  - `prefix_intro`, `prefix_intro_en`
  - `prefix_trekkspill` (array of accordion items with `tittel`, `innhold`, `tittel_en`, `innhold_en`)
  - Section-specific fields (e.g. `symptomer_sitat`, `funksjon_video_id`).

### 6.2 TilstandDynamicSection

- **File**: `src/components/TilstandDynamicSection.tsx`.
- **Props**: `tilstand`, `activeSection`.
- **Behaviour**:
  - **Exercises**: If structured exercise data exists (`ovelse_try_yourself_title`, `ovelse_step1_text`, `ovelse_video_section_title`, or `ovelse_videos`), it renders `CommonExerciseSection` (try yourself, steps, videos, smartphone apps). Otherwise it renders the generic section: title, intro, accordion from `ovelse_trekkspill`, and rich text.
  - **Other sections**: Renders section title, optional quote (symptoms/causes), intro, then accordion and/or rich text. Rich text is parsed so that:
    - **Blockquotes** → highlight box (tip style).
    - **Images** → clickable anatomy-style items with optional caption and lightbox (`ImageModal`).
  - All HTML from Directus is sanitized and rendered with `dangerouslySetInnerHTML` where needed; images use `getImageUrl()` for Directus assets.

### 6.3 TilstandIntroduction

- **File**: `src/components/TilstandIntroduction.tsx`.
- Renders the condition intro block **above** the section area: `side_intro`, prevalence box (`funksjon_forekomst_innhold`), and optional video or image. Video supports YouTube (ID or URL) and Vimeo; `getVideoEmbedUrl()` normalizes to embed URL. Layout can be side-by-side (text + video/image).

---

## 7. Pregnancy and Helsepersonell

- **Pregnancy**: Has its own section list and cards in `ConditionPage`. Content is a mix of CMS (if tilstand exists for pregnancy) and hardcoded components under `src/conditions/pregnancy/components` (overview, textbook, exercises, resources, references).
- **Helsepersonell** (`/professional`, `/helsepersonell`): Content is hardcoded in `src/pages/helsepersonell/Helsepersonell.tsx`; no Directus-driven content for this page.

---

## 8. Context and Globals

- **Language**: `LanguageProvider` / `useLanguage()` – language is `"no"` or `"en"`; used for labels, SEO, and choosing `_en` fields from CMS.
- **Theme**: `ThemeProvider` / `useTheme()` – light/dark; applied via CSS classes and theme variables.
- **SEO**: `RouteSEO` in `seo/RouteSEO.tsx` sets document title, meta description, canonical URL, hreflang, and JSON-LD based on route and language.

---

## 9. Build, Environment, and Deployment

- **Dev**: `npm run dev` – Vite dev server (port 5174); proxy to Directus for `/items` and `/assets`.
- **Build**: `npm run build` – `tsc` (type-check) + `vite build` → `dist/`.
- **Preview**: `npm run preview` – serves `dist/` locally.
- **Environment**: `.env` (or Vercel env) should define:
  - `VITE_DIRECTUS_URL` – Directus API base (e.g. `https://directus-cms.sliplane.app`).
  - `VITE_DIRECTUS_TOKEN` – Bearer token for Directus (read access).
- **Deploy**: Vercel uses `vercel.json`: build command, output directory `dist`, SPA rewrite `/*` → `/index.html`, and cache/security headers.

---

## 10. Directus Setup and Scripts

- **Collections used**: `hjemmeside`, `tilstander`, `testimonials`, `e_learning_courses`, `events`, `pasientorganisasjoner`, and possibly others for blocks/assets.
- **Condition content**: Stored in **tilstander**: one item per condition, identified by `slug` (e.g. `urinary-incontinence`, `constipation`). All section content is flat fields on that item (e.g. `symptomer_tittel`, `behandling_trekkspill`).
- **Exercise section**: The app supports a “structured” exercise block (try yourself, steps, videos, app link). In Directus, the **tilstander** collection has extra fields for this (see `docs/DIRECTUS_OVELSER.md`):
  - Text: `ovelse_try_yourself_title`, `ovelse_step1_text`, `ovelse_tips_title`, `ovelse_tips_text`, `ovelse_video_section_title`, `ovelse_video_section_description` (and `_en` variants).
  - JSON: `ovelse_videos` (array of `{ src, title, title_en }`), `ovelse_steps`, `ovelse_gender_instructions`, `ovelse_smartphone_apps`.
- **Scripts** (run with Node from project root; require `.env` with Directus URL and token):
  - `scripts/add-directus-ovelse-fields.js` – Creates the exercise-related fields on **tilstander** if they don’t exist.
  - `scripts/directus-ovelse-fields-show-in-ui.js` – Updates field sort order so these fields appear under the “Øvelser” section in the Directus UI.
  - `scripts/seed-constipation-tilstand.js` – Seeds constipation condition content into Directus (from `src/data/constipation-tilstand-seed.json` or similar).

After running the scripts, in Directus you can edit each tilstand (condition) and fill the exercise fields; the **ovelse_videos** field uses a List interface so editors add “video link + title” rows instead of raw JSON.

---

## 11. Key Files Quick Reference

| Purpose | File(s) |
|--------|--------|
| App entry, routes | `src/main.tsx` |
| Router (hash vs history) | `src/router.tsx` |
| Homepage | `src/pages/App.tsx` |
| All conditions (one page) | `src/pages/conditions/ConditionPage.tsx` |
| Fetch condition by slug | `src/hooks/useConditionDetails.ts` |
| Fetch homepage data | `src/hooks/useHomepageData.ts` |
| Directus API | `src/lib/directus.ts` |
| CMS types (Tilstand, Hjemmeside, etc.) | `src/types/cms.ts` |
| Section content from CMS | `src/components/TilstandDynamicSection.tsx` |
| Condition intro + video | `src/components/TilstandIntroduction.tsx` |
| Exercise block (videos, steps, app) | `src/components/CommonExerciseSection.tsx` |
| Professionals page | `src/pages/helsepersonell/Helsepersonell.tsx` |
| Vite + proxy | `vite.config.ts` |
| Deploy config | `vercel.json` |
| Exercise fields in Directus | `docs/DIRECTUS_OVELSER.md` |

---

## 12. Summary

- **Bekkenbunnsportalen** is a React + TypeScript SPA that gets most content from **Directus** (homepage + condition sections).
- One **ConditionPage** serves all conditions; section list is defined per condition in code; content for each section comes from one **Tilstand** item (fields keyed by section prefix).
- **TilstandDynamicSection** renders that content (title, intro, accordions, rich text, images, blockquotes) and, for exercises, can render the structured **CommonExerciseSection** when the corresponding Directus fields are filled.
- **Pregnancy** and **Helsepersonell** use custom/hardcoded UIs. Language and theme are global context; SEO is route-aware. Build is Vite; deploy is Vercel with SPA rewrites.

For editing content, use Directus; for adding new conditions or sections, extend `CONDITION_SECTIONS_MAP` and ensure **tilstander** has the right fields (and types in `cms.ts`).
