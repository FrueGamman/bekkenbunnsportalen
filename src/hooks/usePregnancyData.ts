import { useState, useEffect } from "react";
import type { ConditionPregnancy, PregnancyChapter, PregnancyProblem, PregnancySection } from "../types/cms";
import { directusFetch } from "../lib/directus";

const normalizeProblemSlug = (slug: string) => {
    if (!slug) return slug;
    // Keep backwards compatibility with older slug variants imported from legacy content.
    if (slug === "tyngdefolelse-og-prolaps") {
        return "tyngdefolelse-prolaps";
    }
    return slug;
};

const PROBLEM_TO_TEXTBOOK_HASH: Record<string, string> = {
    urinlekkasje: "bladder-function",
    avforingslekkasje: "bowel-function",
    forstoppelse: "bowel-function",
    hemoroider: "bowel-function",
    "smertefull-avforing": "bowel-function",
    fodselsrift: "birth-tears",
    "tyngdefolelse-prolaps": "prolapse",
    samleie: "intercourse",
    hastverkstrang: "bowel-function",
    urinveisinfeksjon: "bladder-function",
};

const normalizePregnancyTextbookLink = (linkUrl: string, fallbackSlug?: string) => {
    const trimmed = linkUrl.trim();
    if (!trimmed) return trimmed;

    const normalizedSlug = fallbackSlug ? normalizeProblemSlug(fallbackSlug) : "";
    const textbookHash = normalizedSlug ? PROBLEM_TO_TEXTBOOK_HASH[normalizedSlug] : "";

    if (trimmed.includes("/conditions/pregnancy") && trimmed.includes("section=textbook")) {
        if (trimmed.includes("#") || !textbookHash) {
            return trimmed;
        }
        return `${trimmed}#${textbookHash}`;
    }

    return trimmed;
};

const normalizePregnancyProblemLink = (linkUrl?: string, fallbackSlug?: string) => {
    if (!linkUrl) return linkUrl;

    const trimmed = linkUrl.trim();
    if (!trimmed) return trimmed;

    const fallback = fallbackSlug ? normalizeProblemSlug(fallbackSlug) : "";

    // Legacy links from imported WP content, e.g.
    // /conditions/pregnancy?section=overviewvanlige-plager/samleie/
    // should become /conditions/pregnancy?section=overview#samleie
    const legacyMatch = trimmed.match(/overviewvanlige-plager\/([^/?#]+)\/?/i)
        || trimmed.match(/vanlige-plager\/([^/?#]+)\/?/i);

    if (legacyMatch?.[1]) {
        const slug = normalizeProblemSlug(legacyMatch[1].toLowerCase());
        return `/conditions/pregnancy?section=overview#${slug}`;
    }

    // If this is a pregnancy overview link without hash, attach the problem hash.
    if (trimmed.includes("/conditions/pregnancy") && trimmed.includes("section=overview")) {
        if (trimmed.includes("#")) {
            return trimmed;
        }
        if (fallback) {
            return `${trimmed}#${fallback}`;
        }
    }

    return normalizePregnancyTextbookLink(trimmed, fallback);
};

const isPregnancyProblem = (value: number | PregnancyProblem): value is PregnancyProblem => {
    return typeof value === "object" && value !== null;
};

const isPregnancyChapter = (value: number | PregnancyChapter): value is PregnancyChapter => {
    return typeof value === "object" && value !== null;
};

const isPregnancySection = (value: number | PregnancySection): value is PregnancySection => {
    return typeof value === "object" && value !== null;
};

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
                    "fields=ressurser_tittel",
                    "fields=ressurser_tittel_en",
                    "fields=ressurser_intro",
                    "fields=ressurser_intro_en",
                    "fields=ressurser_trekkspill",
                ].join("&");

                const response = await directusFetch<ConditionPregnancy>(
                    `/items/Condition_Pregnancy/1?${query}`
                );

                if (response) {
                    // Sort problems and chapters by the 'sort' field
                    if (response.problems && Array.isArray(response.problems)) {
                        const normalizedProblems = response.problems
                            .filter(isPregnancyProblem)
                            .sort((a, b) => (a.sort || 0) - (b.sort || 0))
                            .map((problem) => {
                                const normalizedSlug = normalizeProblemSlug(problem.slug || "");

                                return {
                                    ...problem,
                                    slug: normalizedSlug || problem.slug,
                                    link_url: normalizePregnancyProblemLink(problem.link_url, normalizedSlug || problem.slug),
                                };
                            });

                        response.problems = normalizedProblems;
                    }
                    if (response.chapters && Array.isArray(response.chapters)) {
                        const normalizedChapters = response.chapters
                            .filter(isPregnancyChapter)
                            .sort((a, b) => (a.sort || 0) - (b.sort || 0))
                            .map((chapter) => {
                                const normalizedSections = Array.isArray(chapter.sections)
                                    ? chapter.sections
                                        .filter(isPregnancySection)
                                        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
                                    : chapter.sections;

                                return {
                                    ...chapter,
                                    sections: normalizedSections,
                                };
                            });

                        response.chapters = normalizedChapters;
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
