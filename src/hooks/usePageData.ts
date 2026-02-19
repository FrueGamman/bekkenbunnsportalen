import { useState, useEffect } from "react";
import { directusFetch } from "../lib/directus";
import type { PageWithSections } from "../types/cms";

export const usePageData = (collection: string, slug?: string) => {
    const [data, setData] = useState<PageWithSections | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Build fields query to fetch all block data
                const fields = [
                    "*",
                    "seksjoner.*",
                    "seksjoner.item.*",
                    // Special handling for nested items like accordion items
                    "seksjoner.item.items.*"
                ].join(",");

                let url = `/items/${collection}?fields=${fields}`;
                if (slug) {
                    url += `&filter[slug][_eq]=${slug}`;
                }

                const response = await directusFetch<any>(url);

                if (Array.isArray(response)) {
                    setData(response[0] || null);
                } else {
                    setData(response || null);
                }

            } catch (err) {
                console.error(`Failed to fetch page data for ${collection}`, err);
                setError(err instanceof Error ? err : new Error("Unknown error"));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collection, slug]);

    return { data, loading, error };
};
