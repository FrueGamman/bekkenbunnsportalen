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

  // Hero (Directus: hero_*)
  hero_tittel: string;
  hero_tittel_en?: string | null;
  hero_beskrivelse: string;
  hero_beskrivelse_en?: string | null;
  hero_undertekst: string;
  hero_undertekst_en?: string | null;

  // Exercises (Directus: ovelser_*)
  ovelser_tittel: string;
  ovelser_tittel_en?: string | null;
  ovelser_undertittel: string;
  ovelser_undertittel_en?: string | null;
  ovelser_beskrivelse: string;
  ovelser_beskrivelse_en?: string | null;
  ovelser_knapp_tekst: string;
  ovelser_knapp_tekst_en?: string | null;
  ovelser_fysio_knapp_tekst?: string | null;
  ovelser_fysio_knapp_tekst_en?: string | null;
  ovelser_fysio_lenke?: string | null;
  ovelser_bilde?: string | null;

  // Video
  video_tittel: string;
  video_tittel_en?: string | null;
  video_id: string;
  video_type: string;

  // Testimonials (Directus: historier_*)
  historier_tittel: string;
  historier_tittel_en?: string | null;
  historier_beskrivelse: string;
  historier_beskrivelse_en?: string | null;
  historier_knapp_tekst: string;
  historier_knapp_tekst_en?: string | null;

  // Education (Directus: undervisning_*)
  undervisning_tittel: string;
  undervisning_tittel_en?: string | null;
  undervisning_beskrivelse: string;
  undervisning_beskrivelse_en?: string | null;
  undervisning_knapp_tekst?: string | null;
  undervisning_knapp_tekst_en?: string | null;
  undervisning_bilde?: string | null;

  // E-learning (Directus: elaring_*)
  elaring_tittel: string;
  elaring_tittel_en?: string | null;
  elaring_beskrivelse: string;
  elaring_beskrivelse_en?: string | null;
  elaring_knapp_tekst?: string | null;
  elaring_knapp_tekst_en?: string | null;
  elaring_lenke: string;
  elaring_bilde?: string | null;

  // Conference (Directus: konferanse_*)
  konferanse_tittel: string;
  konferanse_tittel_en?: string | null;
  konferanse_beskrivelse: string;
  konferanse_beskrivelse_en?: string | null;
  konferanse_undertekst: string;
  konferanse_undertekst_en?: string | null;
  konferanse_undertittel?: string | null;
  konferanse_undertittel_en?: string | null;
  konferanse_knapp_tekst?: string | null;
  konferanse_knapp_tekst_en?: string | null;
  konferanse_dato: string;
  konferanse_sted: string;
  konferanse_sted_en?: string | null;
  konferanse_lenke?: string;
  konferanse_bilde?: string | null;

  // Organizations (Directus: organisasjoner_*)
  organisasjoner_tittel: string;
  organisasjoner_tittel_en?: string | null;
  organisasjoner_beskrivelse: string;
  organisasjoner_beskrivelse_en?: string | null;
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
  tekst_en?: string;
  url: string;
}

export interface TilstandAccordionItem {
  tittel: string;
  tittel_en?: string | null;
  innhold: string;
  innhold_en?: string | null;
  bilde_url?: string;
  bilde_id?: string;
  bilde_alt?: string;
  bilde_alt_en?: string | null;
  bilde_caption?: string;
  bilde_caption_en?: string | null;
  bilde_posisjon?: 'none' | 'under' | 'side';
  lenker?: TilstandAccordionLink[];
}

export interface Tilstand {
  id: number;
  status: string;
  navn: string;
  slug: string;
  ikon: string | null;

  // Page-level (Directus: side_*)
  side_tittel: string;
  side_tittel_en?: string | null;
  side_undertittel: string;
  side_undertittel_en?: string | null;
  side_beskrivelse: string;
  side_beskrivelse_en?: string | null;
  side_intro: string | null;
  side_intro_en?: string | null;
  side_intro_Image?: string | null;

  // Normal functions / Funksjon (Directus: funksjon_*)
  funksjon_tittel: string;
  funksjon_tittel_en?: string | null;
  funksjon_intro: string;
  funksjon_intro_en?: string | null;
  funksjon_forekomst_tittel: string | null;
  funksjon_forekomst_tittel_en?: string | null;
  funksjon_forekomst_innhold: string | null;
  funksjon_forekomst_innhold_en?: string | null;
  funksjon_video_id: string | null;
  funksjon_video_tittel: string | null;
  funksjon_video_tittel_en?: string | null;
  funksjon_trekkspill: TilstandAccordionItem[] | null;

  // Symptoms (Directus: symptomer_*)
  symptomer_tittel: string;
  symptomer_tittel_en?: string | null;
  symptomer_intro: string;
  symptomer_intro_en?: string | null;
  symptomer_sitat: string;
  symptomer_sitat_en?: string | null;
  symptomer_sitat_kilde: string;
  symptomer_sitat_kilde_en?: string | null;
  symptomer_trekkspill: TilstandAccordionItem[] | null;

  // Causes (Directus: arsaker_*)
  arsaker_tittel: string;
  arsaker_tittel_en?: string | null;
  arsaker_intro: string;
  arsaker_intro_en?: string | null;
  arsaker_sitat: string;
  arsaker_sitat_en?: string | null;
  arsaker_sitat_kilde: string;
  arsaker_sitat_kilde_en?: string | null;
  arsaker_trekkspill: TilstandAccordionItem[] | null;

  // Diagnosis (Directus: utredning_*)
  utredning_tittel: string;
  utredning_tittel_en?: string | null;
  utredning_intro: string;
  utredning_intro_en?: string | null;
  utredning_trekkspill: TilstandAccordionItem[] | null;

  // Treatment (Directus: behandling_*)
  behandling_tittel: string;
  behandling_tittel_en?: string | null;
  behandling_intro: string;
  behandling_intro_en?: string | null;
  behandling_trekkspill: TilstandAccordionItem[] | null;

  // Exercises (Directus: ovelse_*)
  ovelse_tittel: string;
  ovelse_tittel_en?: string | null;
  ovelse_intro: string;
  ovelse_intro_en?: string | null;
  ovelse_trekkspill: TilstandAccordionItem[] | null;
  /** Structured exercise block (original design): try-yourself + videos. Stored as JSON in Directus. */
  ovelse_try_yourself_title?: string | null;
  ovelse_try_yourself_title_en?: string | null;
  ovelse_step1_text?: string | null;
  ovelse_step1_text_en?: string | null;
  ovelse_tips_title?: string | null;
  ovelse_tips_title_en?: string | null;
  ovelse_tips_text?: string | null;
  ovelse_tips_text_en?: string | null;
  ovelse_video_section_title?: string | null;
  ovelse_video_section_title_en?: string | null;
  ovelse_video_section_description?: string | null;
  ovelse_video_section_description_en?: string | null;
  /** Array of { src, title?, title_en? }. JSON in Directus. */
  ovelse_videos?: { src: string; title?: string; title_en?: string }[] | null;
  /** Array of { number, text?, text_en? }. JSON in Directus. */
  ovelse_steps?: { number: number; text?: string; text_en?: string }[] | null;
  /** Array of { title, title_en?, text, text_en?, icon, iconColor }. JSON in Directus. */
  ovelse_gender_instructions?: { title?: string; title_en?: string; text?: string; text_en?: string; icon?: string; iconColor?: string }[] | null;
  /** { title?, title_en?, description?, description_en?, linkText?, linkText_en?, linkUrl }. JSON in Directus. */
  ovelse_smartphone_apps?: { title?: string; title_en?: string; description?: string; description_en?: string; linkText?: string; linkText_en?: string; linkUrl?: string } | null;

  // Resources (Directus: ressurser_*)
  ressurser_tittel: string;
  ressurser_tittel_en?: string | null;
  ressurser_intro: string;
  ressurser_intro_en?: string | null;
  ressurser_trekkspill: TilstandAccordionItem[] | null;

  // References (Directus: referanser_*)
  referanser_tittel: string;
  referanser_tittel_en?: string | null;
  referanser_intro: string;
  referanser_intro_en?: string | null;
  referanser_trekkspill: TilstandAccordionItem[] | null;

  seksjoner?: PageSection[];
}

export interface BlockHero {
  tittel_no: string;
  tittel_en?: string;
  undertittel_no?: string;
  undertittel_en?: string;
  beskrivelse_no?: string;
  beskrivelse_en?: string;
  bilde?: string;
}

export interface BlockRichText {
  tittel_no?: string;
  tittel_en?: string;
  innhold_no: string;
  innhold_en?: string;
}

export interface BlockAccordionItem {
  tittel_no: string;
  tittel_en?: string;
  innhold_no: string;
  innhold_en?: string;
}

export interface BlockAccordion {
  tittel_no?: string;
  tittel_en?: string;
  innhold_no?: string;
  innhold_en?: string;
  items: BlockAccordionItem[];
}

export interface BlockImage {
  bilde: string;
  bildetekst_no?: string;
  bildetekst_en?: string;
}

export interface BlockLink {
  tekst_no: string;
  tekst_en?: string;
  type: 'external' | 'internal_tilstand' | 'internal_side';
  url?: string;
  lenke_tilstand?: string | Tilstand;
  lenke_side?: string | Page;
}

export interface BlockVideo {
  tittel_no?: string;
  tittel_en?: string;
  video_id: string;
  video_type: 'vimeo' | 'youtube';
}

export interface BlockCard {
  overtittel_no?: string;
  overtittel_en?: string;
  tittel_no: string;
  tittel_en?: string;
  beskrivelse_no?: string;
  beskrivelse_en?: string;
  lenke_tekst_no?: string;
  lenke_tekst_en?: string;
  lenke_url?: string;
}

export interface BlockCardGrid {
  tittel_no?: string;
  tittel_en?: string;
  items: BlockCard[];
}

export type BlockData = BlockHero | BlockRichText | BlockAccordion | BlockImage | BlockLink | BlockVideo | BlockCardGrid;

export interface PageSection {
  id: string | number;
  item: BlockData;
  collection: 'block_hero' | 'block_rich_text' | 'block_accordion' | 'block_image' | 'block_link' | 'block_video' | 'block_card_grid';
}

export interface PageWithSections {
  id: number;
  slug: string;
  tittel_no?: string;
  tittel_en?: string;
  seksjoner: PageSection[];
}
