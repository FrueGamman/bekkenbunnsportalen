import { useEffect } from "react";

type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  siteName?: string;
  locale?: string; // e.g. nb_NO, en_US
  twitterSite?: string; // e.g. @account
  keywords?: string | string[]; // SEO keywords
  alternateLanguages?: Array<{ lang: string; url: string }>; // For hreflang tags
  htmlLang?: string; // HTML lang attribute (e.g., "no", "en")
};

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string, hreflang?: string) {
  if (!href) return;
  // For hreflang, we need to find by both rel and hreflang
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) {
      el.setAttribute("hreflang", hreflang);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}


function normalizeCanonical(url: string): string {
  try {
    // Prefer non-hash canonical when app is served with hash routing
    const u = new URL(url, window.location.origin);
    // Remove common tracking query params from canonical
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
      "mc_cid",
      "mc_eid",
    ];
    trackingParams.forEach((p) => u.searchParams.delete(p));
    if (u.hash.startsWith("#/")) {
      u.pathname = u.hash.slice(1);
      u.hash = "";
    }
    return u.toString();
  } catch {
    return url;
  }
}

export function Seo({ title, description, canonical, image, noindex, jsonLd, siteName, locale, twitterSite, keywords, alternateLanguages, htmlLang }: SeoProps) {
  useEffect(() => {
    // Set HTML lang attribute
    if (htmlLang) {
      document.documentElement.lang = htmlLang;
    }

    if (title) document.title = title;
    if (description) setMetaTag("name", "description", description);
    if (keywords) {
      const keywordsStr = Array.isArray(keywords) ? keywords.join(", ") : keywords;
      setMetaTag("name", "keywords", keywordsStr);
    }
    if (noindex) setMetaTag("name", "robots", "noindex,follow");
    else setMetaTag("name", "robots", "index,follow");

    const url = canonical || window.location.href;
    const canonicalUrl = normalizeCanonical(url);
    setLinkTag("canonical", canonicalUrl);

    // Set up hreflang tags for alternate languages
    // Remove all existing alternate link tags first
    const existingAlternates = document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]');
    existingAlternates.forEach((el) => el.remove());

    // Add hreflang tags for alternate languages
    if (alternateLanguages && alternateLanguages.length > 0) {
      alternateLanguages.forEach(({ lang, url: altUrl }) => {
        setLinkTag("alternate", altUrl, lang);
      });
    } else {
      // Default: add both languages pointing to current URL
      const currentLang = htmlLang === "no" ? "no" : "en";
      const otherLang = currentLang === "no" ? "en" : "no";
      setLinkTag("alternate", canonicalUrl, currentLang);
      setLinkTag("alternate", canonicalUrl, otherLang);
      setLinkTag("alternate", canonicalUrl, "x-default");
    }

    const base = typeof window !== "undefined" ? window.location.origin : "";
    const img = image || "/logopelvic.png";
    const shareImage = /^https?:\/\//i.test(img) ? img : (base ? base + img : img);
    // Open Graph
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", title || "");
    setMetaTag("property", "og:description", description || "");
    setMetaTag("property", "og:image", shareImage);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:site_name", siteName || "Bekkenbunnsportalen");
    setMetaTag("property", "og:locale", locale || "nb_NO");

    // Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title || "");
    setMetaTag("name", "twitter:description", description || "");
    setMetaTag("name", "twitter:image", shareImage);
    if (twitterSite) setMetaTag("name", "twitter:site", twitterSite);

    // JSON-LD structured data
    const existing = Array.from(document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]'));
    existing.forEach((n) => n.parentElement?.removeChild(n));
    const jsonList = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    jsonList.forEach((obj) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-dynamic", "true");
      script.text = JSON.stringify(obj);
      document.head.appendChild(script);
    });
  }, [title, description, canonical, image, noindex, jsonLd, siteName, locale, twitterSite, keywords, alternateLanguages, htmlLang]);

  return null;
}


