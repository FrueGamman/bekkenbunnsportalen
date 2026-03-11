import { useState, useEffect } from "react";
import { directusFetch, getImageUrl } from "../lib/directus";
import { fetchWithCache } from "../lib/directusCache";

export interface ConditionNavItem {
  id: string;
  title: string;
  icon: string;
}

type RawConditions = Array<{
  slug: string;
  side_tittel?: string | null;
  side_tittel_en?: string | null;
  navn?: string | null;
  ikon?: string | null;
}>;

/** Fetches the list of conditions (tilstander) from Directus for the condition page nav. */
export function useConditionList(language: string): ConditionNavItem[] {
  const [list, setList] = useState<ConditionNavItem[]>([]);

  useEffect(() => {
    const cacheKey = `directus:condition-list:${language}`;

    const cleanup = fetchWithCache<RawConditions>(
      cacheKey,
      () =>
        directusFetch<RawConditions>(
          `/items/tilstander?fields=slug,side_tittel,side_tittel_en,navn,ikon&sort=0`
        ),
      (rows) => {
        if (!rows) return;
        const items: ConditionNavItem[] = (rows || []).map((c) => ({
          id: c.slug,
          title:
            (language === "en" && c.side_tittel_en)
              ? c.side_tittel_en
              : (c.side_tittel || c.navn || c.slug) ?? "",
          icon: c.ikon ? getImageUrl(c.ikon) : "/vector.svg",
        }));
        // Ensure pregnancy is always in the list
        const hasPregnancy = items.some((i) => i.id === "pregnancy");
        if (!hasPregnancy) {
          items.push({
            id: "pregnancy",
            title:
              language === "no"
                ? "Plager under graviditet og etter fødsel"
                : "Pregnancy and postpartum issues",
            icon: "/vector-2.svg",
          });
        }
        setList(items);
      },
      () => {
        // No loading state needed for nav list — use fallback until ready
      },
    );

    return cleanup;
  }, [language]);

  return list;
}
