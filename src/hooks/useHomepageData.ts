import { useState, useEffect } from "react";
import { directusFetch } from "../lib/directus";
import type {
  Hjemmeside,
  PatientStory,
  ELearningCourse,
  Event,
  Pasientorganisasjon,
  Condition
} from "../types/cms";

export interface HomepageData {
  hero: {
    title: string;
    description: string;
    subtitle: string;
  };
  exercises: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
  video: {
    title: string;
    id: string;
    type: string;
  };
  testimonials: {
    title: string;
    description: string;
    stories: {
      text: string;
      attribution: string;
    }[];
  };
  elearning: {
    title: string;
    description: string;
    url: string;
    thumbnail: string;
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
    title: string;
    description: string;
    items: {
      name: string;
      url: string;
      logo: string | null;
    }[];
  };
  conditions: {
    title: string;
    slug: string;
    icon: string;
  }[];
}

export const useHomepageData = (language: string) => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all required data in parallel using allSettled to be resilient
        const results = await Promise.allSettled([
          directusFetch<Hjemmeside>(`/items/hjemmeside`),
          directusFetch<PatientStory[]>(`/items/testimonials?fields=*,translations.*`),
          // These collections might be missing in some Directus instances
          directusFetch<ELearningCourse[]>(`/items/e_learning_courses?fields=*,translations.*`).catch(() => []),
          directusFetch<Event[]>(`/items/events?fields=*,translations.*`).catch(() => []),
          directusFetch<Pasientorganisasjon[]>(`/items/pasientorganisasjoner?filter[aktiv][_eq]=true`),
          directusFetch<any[]>(`/items/tilstander?fields=slug,navn,side_tittel,side_tittel_en,ikon`)
        ]);

        const [
          hjemmesideRes,
          storiesRes,
          coursesRes,
          eventsRes,
          orgsRes,
          conditionsRes
        ] = results;

        const homePage = hjemmesideRes.status === 'fulfilled' ? hjemmesideRes.value : null;
        const stories = storiesRes.status === 'fulfilled' ? storiesRes.value : null;
        const courses = coursesRes.status === 'fulfilled' ? coursesRes.value : null;
        const events = eventsRes.status === 'fulfilled' ? eventsRes.value : null;
        const orgs = orgsRes.status === 'fulfilled' ? orgsRes.value : null;
        const conditions = conditionsRes.status === 'fulfilled' ? conditionsRes.value : null;

        const findTranslation = <T extends { languages_code: string }>(translations: T[] | undefined, lang: string) => {
          if (!translations || !translations.length) return null;
          return translations.find(t => t.languages_code === lang) || translations[0];
        };

        // Helper: get language-aware field from Directus _no/_en pattern
        const getField = <K extends keyof NonNullable<typeof homePage>>(baseKey: K, enKey: string) => {
          const base = homePage?.[baseKey];
          const en = homePage?.[enKey as K];
          return (language === 'en' && en) ? String(en) : (base ? String(base) : "");
        };

        // Map data to the internal format
        const mappedData: HomepageData = {
          hero: {
            title: getField("hero_tittel", "hero_tittel_en") || (language === 'no' ? "Velkommen til Bekkenbunnsportalen" : "Welcome to the Pelvic Floor Portal"),
            description: getField("hero_beskrivelse", "hero_beskrivelse_en") || (language === 'no' ? "Din portal for informasjon om bekkenbunnshelse." : "Your portal for pelvic floor health information."),
            subtitle: getField("hero_undertekst", "hero_undertekst_en") || (language === 'no' ? "Bekkenbunnsportalen presenteres av Nasjonalt senter for Bekkenbunnshelse (NBH)" : "The Pelvic Floor Portal is presented by the National Center for Pelvic Floor Health (NBH)")
          },
          exercises: {
            title: getField("ovelser_tittel", "ovelser_tittel_en") || (language === 'no' ? "Bekkenbunnsøvelser" : "Pelvic floor exercises"),
            subtitle: getField("ovelser_undertittel", "ovelser_undertittel_en") || (language === 'no' ? "Lær å styrke bekkenbunnen med målrettede øvelser" : "Learn to strengthen your pelvic floor with targeted exercises"),
            description: getField("ovelser_beskrivelse", "ovelser_beskrivelse_en") || (language === 'no' ? "Bekkenbunnen består av muskler som støtter underlivsorganene." : "The pelvic floor consists of muscles that support the pelvic organs."),
            buttonText: getField("ovelser_knapp_tekst", "ovelser_knapp_tekst_en") || (language === 'no' ? "Se øvelser" : "View exercises")
          },
          video: {
            title: getField("video_tittel", "video_tittel_en") || (language === 'no' ? "Video om bekkenbunnshelse" : "Video about pelvic floor health"),
            id: homePage?.video_id || "",
            type: homePage?.video_type || "vimeo"
          },
          testimonials: {
            title: getField("historier_tittel", "historier_tittel_en") || (language === 'no' ? "Pasienthistorier og erfaringer" : "Patient stories and experiences"),
            description: getField("historier_beskrivelse", "historier_beskrivelse_en") || (language === 'no' ? "Hør fra andre som har opplevd bekkenbunnsplager." : "Hear from others who have experienced pelvic floor issues."),
            stories: stories ? stories.map(s => {
              const t = findTranslation(s.translations, language);
              return {
                text: t?.quote_text || "",
                attribution: t?.attribution || `${s.gender === 'male' ? (language === 'no' ? 'Mann' : 'Man') : (language === 'no' ? 'Kvinne' : 'Woman')}, ${s.age} ${language === 'no' ? 'år' : 'years'}`
              };
            }) : []
          },
          elearning: {
            title: getField("elaring_tittel", "elaring_tittel_en") || (courses && courses[0] ? findTranslation(courses[0].translations, language)?.title : "") || "",
            description: getField("elaring_beskrivelse", "elaring_beskrivelse_en") || (courses && courses[0] ? findTranslation(courses[0].translations, language)?.description?.replace(/<[^>]*>/g, '') : "") || "",
            url: homePage?.elaring_lenke || (courses && courses[0] ? courses[0].course_url : "") || "",
            thumbnail: (courses && courses[0] ? courses[0].thumbnail : "") || ""
          },
          conference: {
            title: getField("konferanse_tittel", "konferanse_tittel_en") || (events && events[0] ? findTranslation(events[0].translations, language)?.title : "") || "",
            subtitle: getField("konferanse_undertekst", "konferanse_undertekst_en") || "",
            description: getField("konferanse_beskrivelse", "konferanse_beskrivelse_en") || (events && events[0] ? findTranslation(events[0].translations, language)?.description?.replace(/<[^>]*>/g, '') : "") || "",
            date: homePage?.konferanse_dato || (events && events[0] ? events[0].start_date : "") || "",
            location: (language === 'en' && homePage?.konferanse_sted_en) ? homePage.konferanse_sted_en : (homePage?.konferanse_sted || (events && events[0] ? events[0].location : "") || ""),
            url: homePage?.konferanse_lenke || (events && events[0] ? events[0].external_url : "") || ""
          },
          organizations: {
            title: getField("organisasjoner_tittel", "organisasjoner_tittel_en") || (language === 'no' ? "Pasient- og brukerorganisasjoner" : "Patient and user organizations"),
            description: getField("organisasjoner_beskrivelse", "organisasjoner_beskrivelse_en") || (language === 'no' ? "Pasient- og brukerorganisasjonene er interesseorganisasjoner..." : "Patient and user organizations are advocacy groups..."),
            items: orgs ? orgs.map(o => ({
              name: o.navn || "",
              url: o.lenke || "",
              logo: o.logo || ""
            })) : []
          },
          conditions: conditions ? conditions.map(c => ({
            title: (language === 'en' && c.side_tittel_en) ? c.side_tittel_en : (c.side_tittel || c.navn || ""),
            slug: c.slug,
            icon: c.ikon
          })) : []
        };

        setData(mappedData);
      } catch (err) {
        console.error("Failed to fetch home page data", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { data, loading, error };
};
