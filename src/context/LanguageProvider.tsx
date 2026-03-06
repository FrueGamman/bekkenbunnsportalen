"use client";

import type React from "react";
import { useState, useMemo, useCallback, type ReactNode } from "react";
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

  const t = useCallback((key: string): string => {
    const table = translations[languageState as keyof typeof translations] as Record<string, string> | undefined;
    
    if (!table) {
      console.warn(`Language table not found for: ${languageState}`);
      return key;
    }
    
    const translation = table[key];
    if (!translation) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation missing for key: "${key}" in language: ${languageState}`);
      }
      return key;
    }
    
    return translation;
  }, [languageState]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ language: languageState, setLanguage, t }),
    [languageState, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};


