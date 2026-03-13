import { useState, useEffect } from "react";
import type { Condition, Tilstand } from "../types/cms";
import { directusFetch } from "../lib/directus";
import { fetchWithCache } from "../lib/directusCache";

export const useConditionDetails = (slug: string, language: string) => {
  const [data, setData] = useState<Condition | null>(null);
  const [tilstand, setTilstand] = useState<Tilstand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    setData(null);
    const cacheKey = `directus:tilstand:${slug}:${language}`;

    const cleanup = fetchWithCache<Tilstand | null>(
      cacheKey,
      async () => {
        const tilstandResponse = await directusFetch<Tilstand[]>(
          `/items/tilstander?filter[slug][_eq]=${slug}&fields=*`
        );
        return tilstandResponse?.[0] ?? null;
      },
      (result) => {
        setTilstand(result ?? null);
      },
      (isLoading) => {
        setLoading(isLoading);
      },
    );

    return cleanup;
  }, [slug, language]);

  return { data, tilstand, loading, error };
};
