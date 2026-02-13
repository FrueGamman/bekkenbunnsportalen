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
          directusFetch<ELearningCourse[]>(`/items/e_learning_courses?fields=*,translations.*`),
          directusFetch<Event[]>(`/items/events?fields=*,translations.*`),
          directusFetch<Pasientorganisasjon[]>(`/items/pasientorganisasjoner?filter[aktiv][_eq]=true`),
          directusFetch<any[]>(`/items/tilstander?fields=slug,navn,side_tittel_en,ikon`)
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

        // Map data to the internal format
        const mappedData: HomepageData = {
          hero: {
            title: homePage?.hero_tittel || "Velkommen til Bekkenbunnsportalen",
            description: homePage?.hero_beskrivelse || "Din portal for informasjon om bekkenbunnshelse.",
            subtitle: homePage?.hero_undertekst || "Bekkenbunnsportalen presenteres av Nasjonalt senter for Bekkenbunnshelse (NBH)"
          },
          exercises: {
            title: homePage?.ovelser_tittel || "Bekkenbunnsøvelser",
            subtitle: homePage?.ovelser_undertittel || "Lær å styrke bekkenbunnen med målrettede øvelser",
            description: homePage?.ovelser_beskrivelse || "Bekkenbunnen består av muskler som støtter underlivsorganene.",
            buttonText: homePage?.ovelser_knapp_tekst || "Se øvelser"
          },
          video: {
            title: homePage?.video_tittel || "Video om bekkenbunnshelse",
            id: homePage?.video_id || "",
            type: homePage?.video_type || "vimeo"
          },
          testimonials: {
            title: homePage?.historier_tittel || "Pasienthistorier og erfaringer",
            description: homePage?.historier_beskrivelse || "Hør fra andre som har opplevd bekkenbunnsplager.",
            stories: stories ? stories.map(s => {
              const t = findTranslation(s.translations, language);
              return {
                text: t?.quote_text || "",
                attribution: t?.attribution || `${s.gender === 'male' ? (language === 'no' ? 'Mann' : 'Man') : (language === 'no' ? 'Kvinne' : 'Woman')}, ${s.age} ${language === 'no' ? 'år' : 'years'}`
              };
            }) : []
          },
          elearning: {
            title: homePage?.elaring_tittel || (courses && courses[0] ? findTranslation(courses[0].translations, language)?.title : "") || "",
            description: homePage?.elaring_beskrivelse || (courses && courses[0] ? findTranslation(courses[0].translations, language)?.description?.replace(/<[^>]*>/g, '') : "") || "",
            url: homePage?.elaring_lenke || (courses && courses[0] ? courses[0].course_url : "") || "",
            thumbnail: (courses && courses[0] ? courses[0].thumbnail : "") || ""
          },
          conference: {
            title: homePage?.konferanse_tittel || (events && events[0] ? findTranslation(events[0].translations, language)?.title : "") || "",
            subtitle: homePage?.konferanse_undertekst || "",
            description: homePage?.konferanse_beskrivelse || (events && events[0] ? findTranslation(events[0].translations, language)?.description?.replace(/<[^>]*>/g, '') : "") || "",
            date: homePage?.konferanse_dato || (events && events[0] ? events[0].start_date : "") || "",
            location: homePage?.konferanse_sted || (events && events[0] ? events[0].location : "") || "",
            url: homePage?.konferanse_lenke || (events && events[0] ? events[0].external_url : "") || ""
          },
          organizations: {
            title: homePage?.organisasjoner_tittel || "Pasient- og brukerorganisasjoner",
            description: homePage?.organisasjoner_beskrivelse || "Pasient- og brukerorganisasjonene er interesseorganisasjoner...",
            items: orgs ? orgs.map(o => ({
              name: o.navn || "",
              url: o.lenke || "",
              logo: o.logo || ""
            })) : []
          },
          conditions: conditions ? conditions.map(c => ({
            title: (language === 'en' && c.side_tittel_en) ? c.side_tittel_en : (c.navn || ""),
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
