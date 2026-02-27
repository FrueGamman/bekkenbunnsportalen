# Slik får du AI-chat (AI Assistant) til å funke i Directus

Directus har en innebygd **AI Assistant** (chat) fra versjon 11.15. Den lar deg snakke med Directus på naturlig språk, utforske data, redigere innhold og kjøre oppgaver.

## Krav

- **Directus 11.15 eller nyere** (sjekk versjon nederst i admin eller i innstillinger).
- **Bruker med App-tilgang** – du må logge inn i admin-panelet (ikke bare API-token). Offentlige/API-only-brukere får ikke AI Assistant.
- **AI må være skrudd på** på serveren: miljøvariabelen `AI_ENABLED` må være satt (eller ikke satt til `false`). På Sliplane/andre host: sjekk at verten ikke har deaktivert AI.

## Steg 1: API-nøkkel fra en leverandør

Du trenger en API-nøkkel fra **minst én** av disse:

| Leverandør | Modeller |
|------------|----------|
| **OpenAI** | GPT-4o Mini, GPT-4.1, GPT-5 |
| **Anthropic** | Claude (Haiku, Sonnet, Opus) |
| **Google AI** | Gemini 2.5 Flash/Pro, Gemini 3 |

- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [Anthropic Console](https://console.anthropic.com/)
- [Google AI Studio](https://aistudio.google.com/)

**Alternativ (gratis/lokal):** Du kan bruke en **OpenAI-kompatibel** tjener (f.eks. Ollama, LM Studio) under *OpenAI-Compatible* i innstillingene. Kvaliteten varierer med lokale modeller.

## Steg 2: Konfigurer i Directus

1. Logg inn i **Directus Admin** (f.eks. `https://directus-cms.sliplane.app`).
2. Gå til **Innstillinger (Settings) → AI**.
3. **Legg inn API-nøkkel** for den leverandøren du vil bruke:
   - **OpenAI API Key** – for GPT-modeller  
   - **Anthropic API Key** – for Claude  
   - **Google API Key** – for Gemini  
4. Velg **Allowed Models** (tillatte modeller) i nedtrekksmenyen for hver nøkkel – ellers blir ingen modeller tilgjengelige.
5. Klikk **Lagre (Save)**.

Etter lagring er AI Assistant tilgjengelig for alle brukere som har **App-tilgang**.

## Steg 3: Bruke AI-chatten

- AI-chatten finner du i admin-panelet (ikon/panel for «AI Assistant» eller «Chat»).
- Du kan stille spørsmål om data, be om å opprette/oppdatere innhold og utforske samlinger.
- Alle brukere deler samme API-nøkkel; kostnader og bruk telles hos leverandøren. Sett gjerne bruksgrenser i leverandørens dashboard.

## Hvis det ikke fungerer

1. **Sjekk Directus-versjon** – AI Assistant krever 11.15+. Hvis du er på Sliplane eller annen host, oppgrader Directus hvis nødvendig.
2. **AI skrudd av på server** – Be serveradmin/sjekk at `AI_ENABLED` ikke er satt til `false` i miljøvariabler for Directus.
3. **Ingen modeller valgt** – Under Settings → AI må du ha valgt minst én modell under «Allowed Models» for den leverandøren du bruker.
4. **Bruker uten App-tilgang** – Brukeren må ha tilgang til *App* (admin), ikke bare API.

Offisiell dokumentasjon: [Directus AI Assistant – Setup](https://directus.io/docs/guides/ai/assistant/setup).
