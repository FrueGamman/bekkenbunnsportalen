# Øvelser i alle tilstander – data fra Directus

Øvelsesseksjonen bruker **samme design som originalen** (Prøv selv, steg, instruksjonsvideoer, app-lenke) når tilstanden har strukturert øvelsesdata i Directus. Video og tekster kommer da fra CMS.

## Hvor ser jeg feltene i Directus?

- **Innhold:** Gå til **Content** → **tilstander** → åpne en tilstand (f.eks. Urinretensjon). Scroll ned til seksjonen **💪 Øvelser**. Under «Øvelser – intro og trekkspill» ligger de nye feltene: *Prøv selv*-tittel, steg 1, tips, videoseksjon, videoer (JSON), steg (JSON), kjønnsinstruksjoner (JSON), app-lenke (JSON).
- **Datamodell:** **Settings** → **Data Model** → **tilstander** – alle felt som starter med `ovelse_` er øvelsesfeltene.
- Ser du dem fortsatt ikke? Prøv hard oppdatering (Ctrl+F5 / Cmd+Shift+R) eller logg ut og inn igjen.

## Felter i Directus (tilstander)

Legg til disse feltene på collection **tilstander** (eller fyll dem ut hvis de finnes):

| Felt | Type | Beskrivelse |
|------|------|-------------|
| `ovelse_try_yourself_title` | string | Tittel for "Prøv selv"-accordion (f.eks. "Prøv selv:") |
| `ovelse_try_yourself_title_en` | string | Engelsk |
| `ovelse_step1_text` | string | Tekst for steg 1 (knip rundt urinrør/skjede/endetarm) |
| `ovelse_step1_text_en` | string | Engelsk |
| `ovelse_tips_title` | string | F.eks. "Tips:" |
| `ovelse_tips_title_en` | string | Engelsk |
| `ovelse_tips_text` | string | Tips-tekst |
| `ovelse_tips_text_en` | string | Engelsk |
| `ovelse_video_section_title` | string | F.eks. "Instruksjonsvideoer" |
| `ovelse_video_section_title_en` | string | Engelsk |
| `ovelse_video_section_description` | string | Kort beskrivelse over videoene |
| `ovelse_video_section_description_en` | string | Engelsk |
| `ovelse_videos` | JSON (List) | I Directus vises feltet som **«Legg til video»** med rader: **Video-URL (embed)**, **Tittel**, **Tittel (EN)**. Bruk embed-URL (f.eks. `https://www.youtube.com/embed/VIDEO_ID`). |
| `ovelse_steps` | JSON | Array: `[{"number": 2, "text": "...", "text_en": "..."}, {"number": 3, ...}, ...]` |
| `ovelse_gender_instructions` | JSON | Array: `[{"title": "Kvinner", "title_en": "Women", "text": "...", "text_en": "...", "icon": "♀", "iconColor": "#4993C1"}, {"title": "Menn", ...}]` |
| `ovelse_smartphone_apps` | JSON | Objekt: `{"title": "...", "title_en": "...", "description": "...", "linkText": "...", "linkUrl": "https://..."}` |

Når minst ett av `ovelse_try_yourself_title`, `ovelse_step1_text`, `ovelse_video_section_title` eller `ovelse_videos` er satt, rendres **originaldesignet** (CommonExerciseSection). Ellers vises vanlig intro + trekkspill.

## Eksempel (tømmingsproblemer for urin)

For å få øvelsesblokken med video som i originalen, kan du sette f.eks. for tilstanden med slug **urinary-retention**:

- **ovelse_try_yourself_title**: `Prøv selv:`
- **ovelse_step1_text**: `Knip (lukk) igjen rundt urinrør, skjede- og endetarmsåpning.`
- **ovelse_video_section_title**: `Instruksjonsvideoer`
- **ovelse_video_section_description**: `Filminstruksjoner i opptrening av bekkenbunn for menn. E-læringskurs i 4 deler utviklet av St. Olavs Hospital, Helse Midt-Norge RHF.`
- **ovelse_videos**: Klikk «Legg til video» og fyll inn for hver video:
  - **Video-URL (embed)**: f.eks. `https://www.youtube.com/embed/JdIGtPzNbhg`
  - **Tittel**: f.eks. «Del 1. Introduksjon»
  - **Tittel (EN)**: f.eks. «Part 1. Introduction»

Tilsvarende kan settes for **urinary-incontinence**, **fecal-incontinence**, **constipation** og **pelvic-pain** (ev. med egne videoer og tekster per tilstand).
