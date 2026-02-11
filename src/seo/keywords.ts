/**
 * SEO Keywords mapping for condition pages
 * Based on seo_keywords.csv
 */

export type ConditionId = 
  | "urinary-incontinence" 
  | "urinary-retention" 
  | "fecal-incontinence" 
  | "constipation" 
  | "pelvic-pain" 
  | "pregnancy";

export interface ConditionSEO {
  keywords: string[];
  title: {
    no: string;
    en: string;
  };
  description: {
    no: string;
    en: string;
  };
}

export const CONDITION_SEO: Record<ConditionId, ConditionSEO> = {
  "urinary-incontinence": {
    keywords: [
      "urinlekkasje",
      "årsaker til urinlekkasje",
      "behandling urinlekkasje kvinner",
      "behandling urinlekkasje menn",
      "stressinkontinens hos kvinner",
      "urgeinkontinens",
      "blandingsinkontinens behandling",
      "uroterapeut urinlekkasje",
      "inkontinens hos eldre",
      "lekkasje urin trening",
      "urinlekkasje idrett aktiv kvinne",
      "lekkasje menn etter prostatektomi",
      "operasjon for urinlekkasje kvinner",
      "livsstilsendringer urinlekkasje",
      "blærekontroll trening hjemme",
      "inkontinens og trening",
      "overaktiv blære symptomer",
    ],
    title: {
      no: "Urinlekkasje – Symptomer, Årsaker og Behandling | Bekkenbunnsportalen",
      en: "Urinary Incontinence – Symptoms, Causes and Treatment | Pelvic Floor Portal",
    },
    description: {
      no: "Lær om urinlekkasje: symptomer, årsaker, utredning og behandling. Informasjon om stressinkontinens, urgeinkontinens og blandingsinkontinens. Behandlingsalternativer inkluderer bekkenbunnstrening, blæretrening og operasjon.",
      en: "Learn about urinary incontinence: symptoms, causes, diagnosis and treatment. Information on stress incontinence, urge incontinence and mixed incontinence. Treatment options include pelvic floor exercises, bladder training and surgery.",
    },
  },
  "urinary-retention": {
    keywords: [
      "tømmingsproblemer urin",
      "nevrogen blære symptomer",
      "blærekatastrofe etter fødsel",
    ],
    title: {
      no: "Tømmingsproblemer for Urin – Symptomer og Behandling | Bekkenbunnsportalen",
      en: "Urinary Retention – Symptoms and Treatment | Pelvic Floor Portal",
    },
    description: {
      no: "Informasjon om tømmingsproblemer for urin: symptomer, årsaker og behandling. Lær om nevrogen blære og blærekatastrofe etter fødsel.",
      en: "Information about urinary retention: symptoms, causes and treatment. Learn about neurogenic bladder and bladder dysfunction after childbirth.",
    },
  },
  "fecal-incontinence": {
    keywords: [
      "avføringslekkasje",
      "behandling avføringslekkasje",
      "analinkontinens behandling",
      "lekkasje avføring trening",
    ],
    title: {
      no: "Avføringslekkasje – Symptomer, Årsaker og Behandling | Bekkenbunnsportalen",
      en: "Fecal Incontinence – Symptoms, Causes and Treatment | Pelvic Floor Portal",
    },
    description: {
      no: "Lær om avføringslekkasje (analinkontinens): symptomer, årsaker, utredning og behandling. Behandlingsalternativer inkluderer bekkenbunnstrening og livsstilsendringer.",
      en: "Learn about fecal incontinence (anal incontinence): symptoms, causes, diagnosis and treatment. Treatment options include pelvic floor exercises and lifestyle changes.",
    },
  },
  "constipation": {
    keywords: [
      "forstoppelse og bekkenbunn",
      "tømmingsproblemer og forstoppelse for avføring",
    ],
    title: {
      no: "Forstoppelse og Bekkenbunn – Symptomer og Behandling | Bekkenbunnsportalen",
      en: "Constipation and Pelvic Floor – Symptoms and Treatment | Pelvic Floor Portal",
    },
    description: {
      no: "Informasjon om forstoppelse og bekkenbunn: symptomer, årsaker og behandling. Lær om tømmingsproblemer for avføring og bekkenbunnsdysfunksjon.",
      en: "Information about constipation and pelvic floor: symptoms, causes and treatment. Learn about bowel emptying problems and pelvic floor dysfunction.",
    },
  },
  "pelvic-pain": {
    keywords: [
      "langvarige underlivssmerter",
      "bekkensmerter årsaker",
      "underlivssmerter menn",
      "underlivssmerter kvinner",
      "tyngdefornemmelse underlivet",
    ],
    title: {
      no: "Langvarige Underlivssmerter – Symptomer, Årsaker og Behandling | Bekkenbunnsportalen",
      en: "Chronic Pelvic Pain – Symptoms, Causes and Treatment | Pelvic Floor Portal",
    },
    description: {
      no: "Lær om langvarige underlivssmerter og bekkensmerter: symptomer, årsaker, utredning og behandling. Informasjon for både kvinner og menn.",
      en: "Learn about chronic pelvic pain: symptoms, causes, diagnosis and treatment. Information for both women and men.",
    },
  },
  "pregnancy": {
    keywords: [
      "plager under graviditet etter fødsel",
      "bekkenbunnsdysfunksjon etter fødsel",
      "bekkenbunnsøvelser etter fødsel",
      "bekkenbunn øvelser graviditet",
      "rehabilitering bekkenbunn etter fødsel",
      "blærekatastrofe etter fødsel",
    ],
    title: {
      no: "Plager under Graviditet og etter Fødsel – Bekkenbunnshelse | Bekkenbunnsportalen",
      en: "Pregnancy and Postpartum Issues – Pelvic Floor Health | Pelvic Floor Portal",
    },
    description: {
      no: "Informasjon om bekkenbunnsplager under graviditet og etter fødsel. Lær om bekkenbunnsdysfunksjon, bekkenbunnsøvelser og rehabilitering etter fødsel.",
      en: "Information about pelvic floor issues during pregnancy and after childbirth. Learn about pelvic floor dysfunction, pelvic floor exercises and postpartum rehabilitation.",
    },
  },
};

// General keywords for the site
export const GENERAL_KEYWORDS = [
  "bekkenbunnsøvelser",
  "hvordan trene bekkenbunnen",
  "treningsprogram bekkenbunn",
  "fysioterapi bekkenbunn",
  "knipeøvelser kvinne",
  "bekkenbunnstrening menn",
  "knipeøvelser teknikk korrekt",
  "blæretrening teknikk",
  "bekkenbunn muskler og anatomi",
  "bekkenbunn relasjon til seksualitet",
  "biofeedback bekkenbunn effekt",
  "bekkenbunnstrening app",
  "tung løft bekkenbunnskade",
  "fremfall livmor symptomer",
  "kirurgi fremfall livmor",
];
