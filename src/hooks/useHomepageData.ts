import { useState, useEffect } from "react";
import { directusFetch } from "../lib/directus";
import type { 
  Page, 
  PatientStory, 
  ELearningCourse, 
  Event, 
  Organization, 
  Condition 
} from "../types/cms";

export interface HomepageData {
  hero: {
    title: string;
    description: string;
    subtitle: string;
  };
  testimonials: {
    text: string;
    attribution: string;
  }[];
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
    name: string;
    url: string;
    logo: string;
  }[];
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
          directusFetch<Page[]>(`/items/pages?filter[slug][_eq]=home&fields=*,translations.*`),
          directusFetch<PatientStory[]>(`/items/patient_stories?fields=*,translations.*`),
          directusFetch<ELearningCourse[]>(`/items/e_learning_courses?fields=*,translations.*`),
          directusFetch<Event[]>(`/items/events?fields=*,translations.*`),
          directusFetch<Organization[]>(`/items/organizations?fields=*,translations.*`),
          directusFetch<Condition[]>(`/items/conditions?fields=*,translations.*`)
        ]);

        const [
          pagesRes, 
          storiesRes, 
          coursesRes, 
          eventsRes, 
          orgsRes, 
          conditionsRes
        ] = results;

        const pages = pagesRes.status === 'fulfilled' ? pagesRes.value : null;
        const stories = storiesRes.status === 'fulfilled' ? storiesRes.value : null;
        const courses = coursesRes.status === 'fulfilled' ? coursesRes.value : null;
        const events = eventsRes.status === 'fulfilled' ? eventsRes.value : null;
        const orgs = orgsRes.status === 'fulfilled' ? orgsRes.value : null;
        const conditions = conditionsRes.status === 'fulfilled' ? conditionsRes.value : null;

        const findTranslation = <T extends { languages_code: string }>(translations: T[] | undefined, lang: string) => {
          if (!translations || !translations.length) return null;
          return translations.find(t => t.languages_code === lang) || translations[0];
        };

        const homePage = pages ? pages[0] : null;
        const homeTrans = homePage ? findTranslation(homePage.translations, language) : null;

        // Map data to the internal format
        const mappedData: HomepageData = {
          hero: {
            title: homeTrans?.title || "Velkommen til Bekkenbunnsportalen",
            description: homeTrans?.content?.replace(/<[^>]*>/g, '') || "Din portal for informasjon om bekkenbunnshelse.",
            subtitle: "Bekkenbunnsportalen presenteres av Nasjonalt senter for Bekkenbunnshelse (NBH)"
          },
          testimonials: stories ? stories.map(s => {
            const t = findTranslation(s.translations, language);
            return {
              text: t?.quote_text || "",
              attribution: t?.attribution || `${s.gender === 'male' ? (language === 'no' ? 'Mann' : 'Man') : (language === 'no' ? 'Kvinne' : 'Woman')}, ${s.age} ${language === 'no' ? 'år' : 'years'}`
            };
          }) : [],
          elearning: {
            title: (courses && courses[0]) ? findTranslation(courses[0].translations, language)?.title || "" : "",
            description: (courses && courses[0]) ? findTranslation(courses[0].translations, language)?.description?.replace(/<[^>]*>/g, '') || "" : "",
            url: (courses && courses[0]) ? courses[0].course_url || "" : "",
            thumbnail: (courses && courses[0]) ? courses[0].thumbnail || "" : ""
          },
          conference: {
            title: (events && events[0]) ? findTranslation(events[0].translations, language)?.title || "" : "",
            subtitle: (events && events[0]) ? findTranslation(events[0].translations, language)?.subtitle || "" : "",
            description: (events && events[0]) ? findTranslation(events[0].translations, language)?.description?.replace(/<[^>]*>/g, '') || "" : "",
            date: (events && events[0]) ? events[0].start_date || "" : "",
            location: (events && events[0]) ? events[0].location || "" : "",
            url: (events && events[0]) ? events[0].external_url || "" : ""
          },
          organizations: orgs ? orgs.map(o => ({
            name: o.name || findTranslation(o.translations, language)?.name || "",
            url: o.url || o.website_url || "",
            logo: o.logo || ""
          })) : [],
          conditions: conditions ? conditions.map(c => ({
            title: findTranslation(c.translations, language)?.title || "",
            slug: c.slug,
            icon: c.icon
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
