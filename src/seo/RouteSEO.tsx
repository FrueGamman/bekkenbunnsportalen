import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Seo } from "./Seo";
import { CONDITION_SEO, GENERAL_KEYWORDS } from "./keywords";
import type { ConditionId } from "./keywords";

// Helper function to format condition ID for display
// Using replace with regex instead of replaceAll for compatibility
function formatConditionId(id: string): string {
  // NOSONAR: replaceAll requires ES2021, using replace for TypeScript compatibility
  return id.replace(/-/g, " "); // NOSONAR
}

export function RouteSEO() {
  const { pathname, search, hash } = useLocation();
  const { id } = useParams();
  const { language } = useLanguage();

  const origin = globalThis.window?.location?.origin ?? "";
  const currentUrl = origin + pathname + search + hash;

  const { title, description, jsonLd, noindex, siteName, locale, keywords, htmlLang, alternateLanguages } = useMemo(() => {
    // Check if we're on a condition page and get condition-specific SEO
    const isConditionPage = pathname.startsWith("/conditions") && id;
    const conditionId = (id && Object.keys(CONDITION_SEO).includes(id)) ? id as ConditionId : undefined;
    const conditionSEO = conditionId ? CONDITION_SEO[conditionId] : null;

    type PageMeta = { title: string; description: string; keywords?: string[] };
    const en: Record<string, PageMeta> = {
      home: {
        title: "Pelvic Floor Portal | Evidence-based pelvic floor health",
        description: "Evidence-based information on pelvic floor health for patients and healthcare professionals.",
        keywords: GENERAL_KEYWORDS,
      },
      conditions: {
        title: (() => {
          if (conditionSEO) return conditionSEO.title.en;
          if (id) return `Conditions – ${formatConditionId(id)}`;
          return "Conditions | Pelvic Floor Portal";
        })(),
        description: conditionSEO
          ? conditionSEO.description.en
          : "Learn about symptoms, causes, diagnosis, treatment and exercises.",
        keywords: conditionSEO ? conditionSEO.keywords : undefined,
      },
      useful: {
        title: "Useful information | Pelvic Floor Portal",
        description: "News, patient stories, educational videos and resources.",
      },
      about: {
        title: "About | Pelvic Floor Portal",
        description: "About the Pelvic Floor Portal and the National Center for Pelvic Floor Health (NBH).",
      },
      professional: {
        title: "Resources for healthcare professionals | Pelvic Floor Portal",
        description: "Clinical guidance, scoring tools, e-learning, organizations and conferences.",
      },
      accessibility: {
        title: "Accessibility | Pelvic Floor Portal",
        description: "WCAG 2.2 AA accessibility statement and contact for feedback.",
      },
      privacy: {
        title: "Privacy policy | Pelvic Floor Portal",
        description: "How we process data and your privacy rights.",
      },
      search: {
        title: "Search | Pelvic Floor Portal",
        description: "Search content on the Pelvic Floor Portal.",
      },
    };

    const no: Record<string, PageMeta> = {
      home: {
        title: "Bekkenbunnsportalen | Kunnskapsbasert bekkenbunnshelse",
        description: "Kunnskapsbasert informasjon om bekkenbunnshelse for pasienter og helsepersonell.",
        keywords: GENERAL_KEYWORDS,
      },
      conditions: {
        title: (() => {
          if (conditionSEO) return conditionSEO.title.no;
          if (id) return `Tilstander – ${formatConditionId(id)}`;
          return "Tilstander | Bekkenbunnsportalen";
        })(),
        description: conditionSEO
          ? conditionSEO.description.no
          : "Lær om symptomer, årsaker, utredning, behandling og øvelser.",
        keywords: conditionSEO ? conditionSEO.keywords : undefined,
      },
      useful: {
        title: "Nyttig informasjon | Bekkenbunnsportalen",
        description: "Nyheter, pasienthistorier, undervisningsfilmer og ressurser.",
      },
      about: {
        title: "Om oss | Bekkenbunnsportalen",
        description: "Om Bekkenbunnsportalen og Nasjonalt senter for bekkenbunnshelse (NBH).",
      },
      professional: {
        title: "For helsepersonell | Bekkenbunnsportalen",
        description: "Kliniske retningslinjer, scoringsverktøy, e-læring, organisasjoner og konferanser.",
      },
      accessibility: {
        title: "Tilgjengelighet | Bekkenbunnsportalen",
        description: "Tilgjengelighetserklæring (WCAG 2.2 AA) og kontakt for tilbakemeldinger.",
      },
      privacy: {
        title: "Personvern | Bekkenbunnsportalen",
        description: "Hvordan vi behandler data og dine personvernrettigheter.",
      },
      search: {
        title: "Søk | Bekkenbunnsportalen",
        description: "Søk i innholdet på Bekkenbunnsportalen.",
      },
    };

    const t = language === "no" ? no : en;

    let page = t.home;
    if (pathname.startsWith("/conditions")) page = t.conditions;
    else if (pathname.startsWith("/useful")) page = t.useful;
    else if (pathname.startsWith("/about")) page = t.about;
    else if (pathname.startsWith("/professional") || pathname.startsWith("/helsepersonell")) page = t.professional;
    else if (pathname.startsWith("/accessibility") || pathname.startsWith("/tilgjengelighet")) page = t.accessibility;
    else if (pathname.startsWith("/personvern")) page = t.privacy;
    else if (pathname.startsWith("/search")) page = t.search;

    const websiteJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: language === "no" ? "Bekkenbunnsportalen" : "Pelvic Floor Portal",
      url: "https://bekkenbunnsportalen.no/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://bekkenbunnsportalen.no/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    // BreadcrumbList Schema
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbListJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: language === "no" ? "Hjem" : "Home",
          item: "https://bekkenbunnsportalen.no/",
        },
        ...pathSegments.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
          item: `https://bekkenbunnsportalen.no/${pathSegments.slice(0, index + 1).join("/")}`,
        })),
      ],
    };

    const webPageJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: origin + pathname,
      inLanguage: language === "no" ? "nb-NO" : "en-US",
      isPartOf: { "@type": "WebSite", url: "https://bekkenbunnsportalen.no/", name: language === "no" ? "Bekkenbunnsportalen" : "Pelvic Floor Portal" },
    };

    // Add MedicalCondition structured data for condition pages
    const medicalConditionJsonLd = isConditionPage && conditionSEO ? {
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      name: page.title,
      description: page.description,
      url: origin + pathname,
      inLanguage: language === "no" ? "nb-NO" : "en-US",
      associatedAnatomy: {
        "@type": "AnatomicalStructure",
        name: language === "no" ? "Bekkenbunn" : "Pelvic Floor"
      },
      isPartOf: { "@type": "WebSite", url: "https://bekkenbunnsportalen.no/", name: language === "no" ? "Bekkenbunnsportalen" : "Pelvic Floor Portal" },
    } : null;

    const jsonLdArray = [websiteJsonLd, webPageJsonLd, breadcrumbListJsonLd];
    if (medicalConditionJsonLd) {
      jsonLdArray.push(medicalConditionJsonLd);
    }

    const site = language === "no" ? "Bekkenbunnsportalen" : "Pelvic Floor Portal";
    const loc = language === "no" ? "nb_NO" : "en_US";
    const htmlLang = language === "no" ? "no" : "en";

    // Create alternate language URLs (same path, different language context)
    // Since the app uses a language switcher rather than separate URLs,
    // we'll point both hreflang tags to the same URL
    const alternateLanguages = [
      { lang: "no", url: currentUrl },
      { lang: "en", url: currentUrl },
      { lang: "x-default", url: currentUrl },
    ];

    return {
      title: page.title,
      description: page.description,
      jsonLd: jsonLdArray,
      noindex: pathname.startsWith("/search"),
      siteName: site,
      locale: loc,
      keywords: page.keywords,
      htmlLang,
      alternateLanguages,
    };
  }, [pathname, language, id, currentUrl, origin]);

  return (
    <Seo
      title={title}
      description={description}
      canonical={currentUrl}
      image="/logopelvic.png"
      jsonLd={jsonLd}
      noindex={noindex}
      siteName={siteName}
      locale={locale}
      keywords={keywords}
      htmlLang={htmlLang}
      alternateLanguages={alternateLanguages}
    />
  );
}


