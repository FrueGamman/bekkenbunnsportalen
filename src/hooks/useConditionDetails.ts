import { useState, useEffect } from "react";
import type { Condition } from "../types/cms";
import { directusFetch } from "../lib/directus";

export const useConditionDetails = (slug: string, language: string) => {
  const [data, setData] = useState<Condition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCondition = async () => {
      try {
        setLoading(true);
        // Fetch condition with translations, and nested sections with their translations and accordion items
        const response = await directusFetch<Condition[]>(
          `/items/conditions?filter[slug][_eq]=${slug}&fields=*,translations.*,sections.*,sections.translations.*,sections.accordion_items.*,sections.accordion_items.translations.*,sections.accordion_items.images.*`
        );

        if (response && response.length > 0) {
          setData(response[0]);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error(`Failed to fetch condition details for ${slug}`, err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCondition();
    }
  }, [slug, language]);

  return { data, loading, error };
};
