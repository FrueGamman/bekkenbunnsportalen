export interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  condition: 'fecal-incontinence' | 'pelvic-pain' | 'pregnancy' | 'urinary-incontinence' | 'urinary-retention' | 'constipation' | 'general';
  category: 'exercise' | 'instruction' | 'education' | 'treatment';
  duration?: string;
  language: 'no' | 'en';
}

export const videoDatabase: VideoData[] = [
  // Fecal Incontinence Videos
  {
    id: 'anal-irrigation-intro',
    title: 'Kort introduksjon (Peristeen analirrigasjon)',
    description: 'Introduksjon til Peristeen analirrigasjon system',
    videoUrl: 'https://player.vimeo.com/video/107906921',
    condition: 'fecal-incontinence',
    category: 'instruction',
    language: 'no'
  },
  {
    id: 'anal-irrigation-digestive',
    title: 'Fordøyelsessystemet (Peristeen analirrigasjon)',
    description: 'Forklaring av fordøyelsessystemet i forbindelse med analirrigasjon',
    videoUrl: 'https://player.vimeo.com/video/107906923',
    condition: 'fecal-incontinence',
    category: 'education',
    language: 'no'
  },
  {
    id: 'anal-irrigation-xray',
    title: 'Røntgenbilder med tykktarm avføring (Peristeen analirrigasjon)',
    description: 'Røntgenbilder som viser tykktarm og avføring',
    videoUrl: 'https://player.vimeo.com/video/107906925',
    condition: 'fecal-incontinence',
    category: 'education',
    language: 'no'
  },
  {
    id: 'anal-irrigation-problems',
    title: 'Tarmproblem avføringslekkasje og kronisk forstoppelse (Peristeen analirrigasjon)',
    description: 'Forklaring av tarmproblemer som avføringslekkasje og kronisk forstoppelse',
    videoUrl: 'https://player.vimeo.com/video/107906927',
    condition: 'fecal-incontinence',
    category: 'education',
    language: 'no'
  },
  {
    id: 'anal-irrigation-emptying',
    title: 'Tarmtømming og Peristeen (Peristeen analirrigasjon)',
    description: 'Instruksjon i tarmtømming med Peristeen system',
    videoUrl: 'https://player.vimeo.com/video/107906985',
    condition: 'fecal-incontinence',
    category: 'instruction',
    language: 'no'
  },
  {
    id: 'anal-irrigation-step-by-step',
    title: 'Hvordan bruke Peristeen steg for steg (Peristeen analirrigasjon)',
    description: 'Detaljert steg-for-steg instruksjon i bruk av Peristeen',
    videoUrl: 'https://player.vimeo.com/video/107906922',
    condition: 'fecal-incontinence',
    category: 'instruction',
    language: 'no'
  },

  // General Pelvic Floor Videos
  {
    id: 'pelvic-floor-general',
    title: 'Bekkenbunnsøvelser for urinretensjon',
    description: 'Generelle bekkenbunnsøvelser for urinretensjon',
    videoUrl: 'https://www.youtube.com/embed/-hSZqmuN41E',
    condition: 'general',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'bladder-training',
    title: 'Blæretrening og tømmingsteknikker',
    description: 'Instruksjon i blæretrening og tømmingsteknikker',
    videoUrl: 'https://www.youtube.com/embed/37a_CXKEj5M',
    condition: 'urinary-incontinence',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'pelvic-relaxation',
    title: 'Avspenningsøvelser for bekkenbunnen',
    description: 'Avspenningsøvelser spesielt for bekkenbunnen',
    videoUrl: 'https://www.youtube.com/embed/5OWYlSWEPwo',
    condition: 'pelvic-pain',
    category: 'exercise',
    language: 'no'
  },

  // Pelvic Pain Videos
  {
    id: 'pelvic-pain-relaxation',
    title: 'Bekkenbunnsavspenning for kroniske smerter',
    description: 'Spesialiserte avspenningsøvelser for kroniske bekkenbunnssmerter',
    videoUrl: 'https://www.youtube.com/embed/R3Rydb1nZU4',
    condition: 'pelvic-pain',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'yoga-stretching',
    title: 'Yoga og stretching for bekkenet',
    description: 'Yoga og stretching øvelser spesielt for bekkenet',
    videoUrl: 'https://www.youtube.com/embed/oyGEVPuumtk',
    condition: 'pelvic-pain',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'breathing-techniques',
    title: 'Smertelindring med pusteteknikker',
    description: 'Pusteteknikker for smertelindring',
    videoUrl: 'https://www.youtube.com/embed/5OWYlSWEPwo',
    condition: 'pelvic-pain',
    category: 'exercise',
    language: 'no'
  },

  // Pregnancy Videos
  {
    id: 'pregnancy-pelvic-exercises',
    title: 'Bekkenbunnsøvelser under graviditet',
    description: 'Sikre bekkenbunnsøvelser under graviditet',
    videoUrl: 'https://www.youtube.com/embed/-hSZqmuN41E',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'pregnancy-postpartum-exercises',
    title: 'Bekkenbunnsøvelser etter fødsel',
    description: 'Bekkenbunnsøvelser for å styrke muskulaturen etter fødsel',
    videoUrl: 'https://www.youtube.com/embed/37a_CXKEj5M',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'pregnancy-pelvic-floor-anatomy',
    title: 'Bekkenbunnens anatomi og funksjon',
    description: 'Forklaring av bekkenbunnens anatomi og funksjon under graviditet',
    videoUrl: 'https://www.youtube.com/embed/5OWYlSWEPwo',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'pregnancy-common-problems',
    title: 'Vanlige plager under graviditet og etter fødsel',
    description: 'Oversikt over vanlige plager og hvordan de kan håndteres',
    videoUrl: 'https://www.youtube.com/embed/R3Rydb1nZU4',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'pregnancy-breathing-exercises',
    title: 'Pusteteknikker under graviditet',
    description: 'Pusteteknikker for avspenning og smertehåndtering under graviditet',
    videoUrl: 'https://www.youtube.com/embed/oyGEVPuumtk',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'pregnancy-gentle-stretching',
    title: 'Milde strekkøvelser for gravide',
    description: 'Sikre strekkøvelser for å opprettholde fleksibilitet under graviditet',
    videoUrl: 'https://www.youtube.com/embed/5OWYlSWEPwo',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  },

  // Additional YouTube Videos
  {
    id: 'qufora-irrigation',
    title: 'Qufora Irrisedo Ballonsystem irrigasjonssystem',
    description: 'Instruksjon i Qufora Irrisedo Ballonsystem irrigasjonssystem',
    videoUrl: 'https://www.youtube.com/embed/kZmcg19m0So',
    condition: 'fecal-incontinence',
    category: 'instruction',
    language: 'no'
  },
  {
    id: 'unn-pelvic-floor-women',
    title: 'Bekkenbunnstrening for kvinner (UNN)',
    description: 'Instruksjonsfilm om bekkenbunnstrening for kvinner, filmet på UNN.',
    videoUrl: 'https://player.vimeo.com/video/65880144',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  },
  {
    id: 'stolavs-pelvic-floor-women',
    title: 'Bekkenbunnstrening for kvinner (St. Olavs)',
    description: 'Instruksjonsfilm om bekkenbunnstrening for kvinner fra St. Olavs Hospital.',
    videoUrl: 'https://www.youtube.com/embed/ZTMpEr6GLp8',
    condition: 'pregnancy',
    category: 'exercise',
    language: 'no'
  }
];

export const getVideosByCondition = (condition: string): VideoData[] => {
  return videoDatabase.filter(video => video.condition === condition);
};

export const getVideosByCategory = (category: string): VideoData[] => {
  return videoDatabase.filter(video => video.category === category);
};

export const getVideoById = (id: string): VideoData | undefined => {
  return videoDatabase.find(video => video.id === id);
};
