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
  section_type: "overview" | "normal-functions" | "symptoms" | "causes" | "diagnosis" | "treatment" | "exercises" | "resources" | "references" | "textbook";
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
