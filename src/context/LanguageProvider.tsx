"use client";

import type React from "react";
import { useState, useMemo, type ReactNode } from "react";
import { getInitialLanguage } from "./languageTypes";
import type { Language } from "./languageTypes";
import { LanguageContext } from "./LanguageContext";
import { translations } from "../translations/translations";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [languageState, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {
      // Ignore storage errors
    }
  };

  /**
   * Translation function with comprehensive fallback logic
   * Pulls from centralized translations file for consistency across all pages
   * @param key - Translation key to lookup
   * @returns Translated string or the key itself if not found
   */
  const t = (key: string): string => {
    const table = translations[languageState as keyof typeof translations] as Record<string, string> | undefined;
    
    // Fallback: return key if language table doesn't exist
    if (!table) {
      console.warn(`Language table not found for: ${languageState}`);
      return key;
    }
    
    // Return translation or key if translation doesn't exist
    const translation = table[key];
    if (!translation) {
      // Only warn in development, not production
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation missing for key: "${key}" in language: ${languageState}`);
      }
      return key;
    }
    
    return translation;
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ language: languageState, setLanguage, t }),
    [languageState] // Only recreate when language changes
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};


