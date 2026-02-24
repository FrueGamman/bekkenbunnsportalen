# Prosjektrapport til NBH  
## Bekkenbunnsportalen – moderne webløsning

**Mottaker:** Nasjonalt senter for Bekkenbunnshelse (NBH)  
**Dato:** 13. februar 2025  
**Prosjekt:** Bekkenbunnsportalen – reimplementasjon og modernisering

---

## 1. Sammendrag

Bekkenbunnsportalen er modernisert til en rask, tilgjengelig og fremtidssikret webløsning. Den nye versjonen bygger på React, TypeScript og Vite, med CMS-integrering via Directus. Klinisk innhold og struktur fra den opprinnelige portalen er bevart og forbedret.

---

## 2. Leveranser og funksjonalitet

### 2.1 Hovedmoduler

| Modul | Status | Beskrivelse |
|-------|--------|-------------|
| **Forside** | Ferdig | Hero, øvelser, pasienthistorier, e-læring, konferanse, organisasjoner |
| **Tilstandssider** | Ferdig | Dynamisk innhold fra CMS per tilstand |
| **Urininkontinens** | Ferdig | Normal funksjon, symptomer, årsaker, diagnose, behandling, øvelser, ressurser, referanser |
| **Urinretensjon** | Ferdig | Tilsvarende struktur og innhold |
| **Graviditet** | Ferdig | Oversikt, vanlige plager, lærebok, bekkenbunnstrening, søk hjelp |
| **Førselinkontinens** | På plass | Anatomi og grunnleggende struktur |
| **Forstoppelse** | På plass | Anatomi og grunnleggende struktur |
| **Bekkensmerter** | På plass | Anatomi og grunnleggende struktur |
| **Helsepersonell** | Ferdig | Profesjonell seksjon med organisasjoner, veiledere, scoringsverktøy, e-læring, konferanser |
| **Organisasjoner** | Ferdig | Pasient- og fagorganisasjoner hentet fra Directus |
| **Søk** | Implementert | Søkefunksjon på tvers av innhold |
| **Tilgjengelighet** | Ferdig | Tilgjengelighetsside |

### 2.2 Tekniske egenskaper

- **Språk:** Norsk og engelsk (NO/EN) med språkbytte
- **Tema:** Lys og mørk modus
- **Responsivt design:** Optimert for mobil, nettbrett og desktop
- **Tilgjengelighet:** Tastaturnavigasjon, tydelige fokusindikatorer, semantisk markup
- **CMS:** Directus for hjemmeside, tilstander, organisasjoner, events, e-læring, testimonials
- **Performance:** Vite, code-splitting, effektiv lasting

---

## 3. Arkitektur

### 3.1 Teknisk stabel

- **Frontend:** React 19, TypeScript
- **Bygg:** Vite 7
- **Styling:** CSS Modules (komponentbasert, temavennlig)
- **State:** LanguageContext (NO/EN), ThemeContext (lys/mørk)
- **Ruting:** React Router (inkl. HashRouter for webviews og in-app browsers)
- **CI/CD:** GitHub Actions med lint, tester, build, E2E og tilgjengelighetstester

### 3.2 Integrasjoner

- **Directus:** Hentelse av hero, øvelser, testimonials, e-læring, konferanser, organisasjoner og tilstandsinformasjon
- **Vercel:** Deploy til staging (develop) og produksjon (main)
- **Vimeo:** Video-innhold

---

## 4. Oppdateringer som er gjennomført

Ut fra nylig utviklingsaktivitet er blant annet følgende gjennomført:

- Forside med organisasjonsseksjon (`HomepageOrganizations`)
- Dynamisk seksjon for tilstandssider (`TilstandDynamicSection`)
- Innholdsseksjoner for urininkontinens (symptomer, årsaker, diagnose, behandling, øvelser, ressurser, referanser)
- Innholdsseksjoner for urinretensjon (normal funksjon, symptomer, årsaker, behandling)
- Forbedret ConditionPage med dynamisk navigasjon
- Integrasjon mot Directus for CMS-drevet innhold
- Oppdaterte typer for CMS-data

---

## 5. Teknisk status og rettinger

### 5.1 Importfeil rettet

Det forelå en importfeil i `Organisasjoner.tsx` som ble identifisert 13. februar:

- **Feil:** ` Failed to resolve import "../../../../context/useLanguage"`  
- **Årsak:** Feil relativ sti (én nivå for mye opp)  
- **Løsning:** Endret til `../../../context/useLanguage`  

Feilen er rettet og bør ikke lenger påvirke bygg eller utviklingsserver.

### 5.2 CI/CD

- GitHub Actions er satt opp for lint, tester, build, E2E og tilgjengelighet
- `paths-ignore` er midlertidig satt til å hoppe over alle filer for å unngå automatisk kjøring – kan justeres ved behov
- Deploy til Vercel krever `VERCEL_TOKEN`, `VERCEL_ORG_ID` og `VERCEL_PROJECT_ID` i GitHub secrets

---

## 6. Kjøring og deploy

### 6.1 Lokal utvikling

```bash
npm install
npm run dev
```

Åpne URL som vises i terminalen (f.eks. `http://localhost:5174`).

### 6.2 Bygg for produksjon

```bash
npm run build
npm run preview
```

### 6.3 Miljøvariabler

For full CMS-funksjonalitet trengs:

- `VITE_DIRECTUS_URL` – Directus API-URL
- `VITE_DIRECTUS_TOKEN` – API-token for Directus (ikke committes til repo)

---

## 7. Roadmap (planlagt videreutvikling)

- Søk på tvers av tilstander og seksjoner
- Utskriftsvennlige versjoner av viktige sider
- Innsamlingsbevisst analyse for seksjonsnavigasjon
- Utvidelse av innhold for flere tilstander

---

## 8. Kontakt og vedlegg

Prosjektet er klart for testing og videre drift. Ved spørsmål kan dere ta kontakt med utviklingsteamet.

**Referanser:**
- [Bekkenbunnsportalen (original)](https://nekib.helsekompetanse.no/)
- [Plager under graviditet og etter fødsel](https://nekib.helsekompetanse.no/plager-under-graviditet-og-etter-fodsel/)

---

*Rapport generert 13. februar 2025*
