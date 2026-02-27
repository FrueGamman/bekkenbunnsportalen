import { useState, useEffect } from "react";
import type { ConditionPregnancy } from "../types/cms";
import { directusFetch } from "../lib/directus";

export const usePregnancyData = (language: string) => {
    const [data, setData] = useState<ConditionPregnancy | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPregnancyData = async () => {
            try {
                setLoading(true);

                // Fetch Condition_Pregnancy (ID 1) with all nested relations
                // We include problems.* to get all fields like name, about, symptoms, icons
                // We include chapters.* and chapters.sections.* for the textbook
                const query = [
                    "fields=*",
                    "fields=problems.*",
                    "fields=chapters.*",
                    "fields=chapters.sections.*",
                ].join("&");

                const response = await directusFetch<ConditionPregnancy>(
                    `/items/Condition_Pregnancy/1?${query}`
                );

                if (response) {
                    // Sort problems and chapters by the 'sort' field
                    if (response.problems && Array.isArray(response.problems)) {
                        response.problems.sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0));
                    }
                    if (response.chapters && Array.isArray(response.chapters)) {
                        response.chapters.sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0));
                        // Sort sections within each chapter
                        response.chapters.forEach((chapter: any) => {
                            if (chapter.sections && Array.isArray(chapter.sections)) {
                                chapter.sections.sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0));
                            }
                        });
                    }
                    setData(response);
                } else {
                    setData(null);
                }
            } catch (err) {
                console.error("Failed to fetch pregnancy condition details", err);
                setError(err instanceof Error ? err : new Error("Unknown error"));
            } finally {
                setLoading(false);
            }
        };

        fetchPregnancyData();
    }, [language]); // Depend on language to refetch if needed (though fields are included all at once)

    return { data, loading, error };
};
