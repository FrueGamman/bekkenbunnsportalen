import { useState, useEffect } from "react";
import { directusFetch } from "../lib/directus";

export interface ConditionNavItem {
  id: string;
  title: string;
  icon: string;
}

/** Fetches the list of conditions (tilstander) from Directus for the condition page nav. */
export function useConditionList(language: string): ConditionNavItem[] {
  const [list, setList] = useState<ConditionNavItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const fetchList = async () => {
      try {
        const rows = await directusFetch<Array<{
          slug: string;
          side_tittel?: string | null;
          side_tittel_en?: string | null;
          navn?: string | null;
          ikon?: string | null;
        }>>(
          `/items/tilstander?fields=slug,side_tittel,side_tittel_en,navn,ikon&sort=0`
        );
        if (cancelled || !rows) return;
        const items: ConditionNavItem[] = (rows || []).map((c) => ({
          id: c.slug,
          title:
            (language === "en" && c.side_tittel_en) ? c.side_tittel_en
            : (c.side_tittel || c.navn || c.slug) ?? "",
          icon: c.ikon || "/vector.svg",
        }));
        // Ensure pregnancy is always in the list (same as hero)
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
      } catch (err) {
        console.error("Failed to fetch condition list from Directus", err);
        if (!cancelled) setList([]);
      }
    };
    fetchList();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return list;
}
