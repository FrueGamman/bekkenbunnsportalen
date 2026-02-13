export interface PageTranslation {
  languages_code: string;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
}

export interface Page {
  id: string;
  slug: string;
  translations: PageTranslation[];
}

export interface PatientStoryTranslation {
  languages_code: string;
  quote_text: string;
  attribution: string;
}

export interface PatientStory {
  id: string;
  gender: string;
  age: number;
  translations: PatientStoryTranslation[];
}

export interface ELearningCourseTranslation {
  languages_code: string;
  title: string;
  description: string;
}

export interface ELearningCourse {
  id: string;
  provider: string;
  course_url: string;
  thumbnail?: string;
  translations: ELearningCourseTranslation[];
}

export interface EventTranslation {
  languages_code: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Event {
  id: string;
  start_date: string;
  location: string;
  external_url: string;
  translations: EventTranslation[];
}

export interface Hjemmeside {
  id: number;
  hero_tittel: string;
  hero_beskrivelse: string;
  hero_undertekst: string;
  ovelser_tittel: string;
  ovelser_undertittel: string;
  ovelser_beskrivelse: string;
  ovelser_knapp_tekst: string;
  video_tittel: string;
  video_id: string;
  video_type: string;
  historier_tittel: string;
  historier_beskrivelse: string;
  historier_knapp_tekst: string;
  undervisning_tittel: string;
  undervisning_beskrivelse: string;
  elaring_tittel: string;
  elaring_beskrivelse: string;
  elaring_lenke: string;
  konferanse_tittel: string;
  konferanse_beskrivelse: string;
  konferanse_undertekst: string;
  konferanse_dato: string;
  konferanse_sted: string;
  konferanse_lenke?: string;
  organisasjoner_tittel: string;
  organisasjoner_beskrivelse: string;
}


export interface Fagorganisasjon {
  id: number;
  navn: string;
  logo: string | null;
  lenke: string;
  kategori: string; // 'national' | 'international'
  rekkefølge: number;
  aktiv: boolean;
}

export interface Pasientorganisasjon {
  id: number;
  navn: string;
  logo: string | null;
  lenke: string;
  rekkefølge: number;
  aktiv: boolean;
}

export interface OrganizationTranslation {
  languages_code: string;
  name: string;
  description: string;
}

export interface Organization {
  id: string;
  logo: string;
  name: string;
  url: string;
  website_url?: string;
  translations?: OrganizationTranslation[];
}

export interface ConditionTranslation {
  languages_code: string;
  title: string;
  short_description?: string;
  intro_text?: string;
  prevalence_text?: string;
}

export interface Condition {
  id: string;
  slug: string;
  icon: string;
  translations: ConditionTranslation[];
  sections?: ConditionSection[];
}

export interface ConditionSectionTranslation {
  languages_code: string;
  title: string;
  intro_text?: string;
  quote_text?: string;
  quote_attribution?: string;
}

export interface ConditionSection {
  id: string;
  status: string;
  slug: string;
  icon?: string;
  translations: ConditionSectionTranslation[];
  accordion_items?: AccordionItem[];
}

export interface AccordionItemTranslation {
  languages_code: string;
  title: string;
  content: string;
}

export interface AccordionItem {
  id: string;
  status: string;
  translations: AccordionItemTranslation[];
  images?: { directus_files_id: string }[];
}

export interface HomepageData {
  hero: {
    title: string;
    description: string;
    subtitle: string;
  };
  testimonials: {
    name: string;
    text: string;
  }[];
  elearning: {
    title: string;
    description: string;
    thumbnail?: string;
  };
  conference: {
    title: string;
    subtitle: string;
    description: string;
    date: string;
    location: string;
    url: string;
  };
  organizations: {
    name: string;
    logo: string;
    url: string;
  }[];
  conditions: {
    title: string;
    slug: string;
    icon: string;
  }[];
}
export interface TilstandAccordionLink {
  tekst: string;
  url: string;
}

export interface TilstandAccordionItem {
  tittel: string;
  tittel_en?: string;
  innhold: string;
  innhold_en?: string;
  bilde_url?: string;
  bilde_id?: string;
  bilde_alt?: string;
  bilde_caption?: string;
  bilde_posisjon?: 'none' | 'under' | 'side';
  lenker?: TilstandAccordionLink[];
}

export interface Tilstand {
  id: number;
  status: string;
  navn: string;
  slug: string;
  ikon: string | null;
  side_tittel: string;
  side_undertittel: string;
  side_beskrivelse: string;
  side_intro: string | null;

  funksjon_tittel: string;
  funksjon_intro: string;
  funksjon_forekomst_tittel: string | null;
  funksjon_forekomst_innhold: string | null;
  funksjon_video_id: string | null;
  funksjon_video_tittel: string | null;
  funksjon_trekkspill: TilstandAccordionItem[] | null;

  symptomer_tittel: string;
  symptomer_intro: string;
  symptomer_sitat: string;
  symptomer_sitat_kilde: string;
  symptomer_trekkspill: TilstandAccordionItem[] | null;

  arsaker_tittel: string;
  arsaker_intro: string;
  arsaker_sitat: string;
  arsaker_sitat_kilde: string;
  arsaker_trekkspill: TilstandAccordionItem[] | null;

  utredning_tittel: string;
  utredning_intro: string;
  utredning_trekkspill: TilstandAccordionItem[] | null;

  behandling_tittel: string;
  behandling_intro: string;
  behandling_trekkspill: TilstandAccordionItem[] | null;

  ovelse_tittel: string;
  ovelse_intro: string;
  ovelse_trekkspill: TilstandAccordionItem[] | null;

  ressurser_tittel: string;
  ressurser_intro: string;
  ressurser_trekkspill: TilstandAccordionItem[] | null;

  referanser_tittel: string;
  referanser_intro: string;
  referanser_trekkspill: TilstandAccordionItem[] | null;
}
