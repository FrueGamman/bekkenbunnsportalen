## Bekkenbunnsportalen (Modern React)

A modern, accessible React reimplementation and improvement of Bekkenbunnsportalen.

- Original reference: [Bekkenbunnsportalen](https://nekib.helsekompetanse.no/)
- Pregnancy section reference: [Plager under graviditet og etter fødsel](https://nekib.helsekompetanse.no/plager-under-graviditet-og-etter-fodsel/)

This app preserves the clinical content and structure while delivering a faster, clearer 2025 UI/UX with better accessibility and navigation.

### Highlights vs original
- Cleaner “Overview” landing for each condition, with card-based navigation and quick links
- Progressive disclosure via accordions and quick sections for scannability
- Dark mode, responsive layout, improved focus states and keyboard navigation
- Reduced visual noise (subtle styling, fewer gradients) while retaining emphasis where needed
- Performance-first implementation (Vite + code-splitting; removed redundant intro blocks where appropriate)


## Architecture

- Frontend: React + TypeScript + Vite
- Styling: CSS Modules (scoped, theme-aware)
- State/Context: `LanguageContext` (NO/EN), `ThemeContext` (light/dark)
- Routing: React Router in `src/pages/conditions/ConditionPage.tsx` maps conditions → sections
- Components grouped by condition: `src/conditions/<condition>/components`

### Key paths
- Conditions page router: `src/pages/conditions/ConditionPage.tsx`
- Shared condition UI: `src/conditions/shared`
- Pregnancy condition components: `src/conditions/pregnancy/components`


## Pregnancy section (modernized)

The pregnancy section mirrors the information architecture of the original while presenting it in a clearer overview-first experience.

- Overview entry: `src/conditions/pregnancy/components/overview.tsx`
  - Hero text + image and caption (matches original reference)
  - Cards to main sub-areas (Vanlige plager, Lærebok, Bekkenbunnstrening, Søk hjelp)
  - Embedded “Vanlige plager” list inside the card for quicker scanning
  - Quick sections (two compact lists) that mirror the original site structure
- Styling: `src/conditions/pregnancy/components/pregnancy-overview.module.css`
  - Calmer visual design (reduced gradients, subtle hover)
  - Two-column hero layout collapsing to single column on mobile

### Navigation behavior
- Default section for pregnancy is `overview` (replacing “Normal Functions” for clarity)
- Section switching wired via the parent condition router:
  - Standalone page: `src/conditions/pregnancy/components/condition-page.tsx`
  - Global router: `src/pages/conditions/ConditionPage.tsx`

### Content parity
- Introductory text, hero imagery and caption are preserved from the original site
  - Always cite: [Main portal](https://nekib.helsekompetanse.no/), [Pregnancy section](https://nekib.helsekompetanse.no/plager-under-graviditet-og-etter-fodsel/)


## Other conditions

Each condition follows a consistent file structure under `src/conditions/<condition>/components`, typically including:

- `normal-functions.tsx`, `symptoms.tsx`, `causes.tsx`, `diagnosis.tsx`, `treatment.tsx`, `exercises.tsx`, `resources.tsx`, `references.tsx`
- Section content is organized into language-specific, typed data objects, and rendered via composable components (e.g., `SectionAccordion`)


## Accessibility

- Keyboard navigable cards and links
- Clear focus states, proper semantics for lists and buttons
- High-contrast dark mode variants
- Content mirrored to maintain clinical fidelity


## Development

### Prerequisites
- Node.js 18+

### Install & run
```
npm install
npm run dev
```

Open the dev server URL shown in your terminal (typically `http://localhost:5173`).

### Build
```
npm run build
npm run preview
```


## Project structure

```
src/
  components/                // Global, reusable UI components
  conditions/
    shared/                  // Shared condition UI and helpers
    pregnancy/
      components/
        overview.tsx         // Pregnancy landing (Overview)
        pregnancy-overview.module.css
        condition-page.tsx   // Standalone condition page (with tabs)
        ...                  // Symptoms, Causes, Diagnosis, Treatment, etc.
    urinary-incontinence/
    urinary-retention/
    fecal-incontinence/
    constipation/
    pelvic-pain/
  pages/
    conditions/ConditionPage.tsx  // Router for all conditions
  context/                   // Language and Theme contexts
  styles/                    // Global CSS (theme/readability)
```


## Coding standards

- TypeScript-first; explicit function signatures for exported APIs
- CSS Modules for component co-location and scoping
- Prefer composition (e.g., accordions, section blocks) over complex monoliths
- Keep comments minimal and meaningful (edge cases, invariants, rationale)


## Roadmap

- Add search across conditions and sections
- Add print-friendly versions of key pages
- Add analytics events for section navigation (consent-aware)


## License

This project is provided for educational and internal use. Content originates from Bekkenbunnsportalen and is referenced for parity and accuracy:

- [Bekkenbunnsportalen](https://nekib.helsekompetanse.no/)
- [Plager under graviditet og etter fødsel](https://nekib.helsekompetanse.no/plager-under-graviditet-og-etter-fodsel/)
