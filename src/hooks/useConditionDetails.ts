import { useState, useEffect } from "react";
import type { Condition, Tilstand } from "../types/cms";
import { directusFetch } from "../lib/directus";

export const useConditionDetails = (slug: string, language: string) => {
  const [data, setData] = useState<Condition | null>(null);
  const [tilstand, setTilstand] = useState<Tilstand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        setLoading(true);

        // Fetch from original conditions collection (for structure/metadata)
        const conditionResponse = await directusFetch<Condition[]>(
          `/items/conditions?filter[slug][_eq]=${slug}&fields=*,translations.*,sections.*,sections.translations.*,sections.accordion_items.*,sections.accordion_items.translations.*,sections.accordion_items.images.*`
        );

        // Fetch from new tilstander collection (for simple editing)
        const tilstandResponse = await directusFetch<Tilstand[]>(
          `/items/tilstander?filter[slug][_eq]=${slug}&fields=*`
        );

        if (conditionResponse && conditionResponse.length > 0) {
          setData(conditionResponse[0]);
        } else {
          setData(null);
        }

        if (tilstandResponse && tilstandResponse.length > 0) {
          setTilstand(tilstandResponse[0]);
        } else {
          setTilstand(null);
        }

      } catch (err) {
        console.error(`Failed to fetch condition details for ${slug}`, err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchConditions();
    }
  }, [slug, language]);

  return { data, tilstand, loading, error };
};
