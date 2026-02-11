export type Language = "no" | "en";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const getInitialLanguage = (): Language => {
  // 1) Use persisted preference if available
  try {
    const saved = localStorage.getItem("language");
    if (saved === "no" || saved === "en") {
      return saved as Language;
    }
  } catch {
    // Ignore storage errors
  }

  // 2) Infer from browser locales / region
  try {
    const browserLocales =
      Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    const localesLower = browserLocales
      .filter(Boolean)
      .map((l) => String(l).toLowerCase());

    const isNorwegianLocale = localesLower.some(
      (l) =>
        l.startsWith("no") || // generic Norwegian
        l.startsWith("nb") || // Bokmål
        l.startsWith("nn") || // Nynorsk
        l.endsWith("-no") // region NO
    );

    if (isNorwegianLocale) {
      return "no";
    }
  } catch {
    // Ignore navigator access errors
  }

  // 3) Fallback by timezone (approximation for Norway)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Europe/Oslo") {
      return "no";
    }
  } catch {
    // Ignore Intl errors
  }

  // 4) Default to English elsewhere
  return "en";
};
