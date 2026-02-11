"use client";

import { createContext } from "react";
import type { LanguageContextType } from "./languageTypes";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Re-export hook and types for convenience
export { useLanguage } from "./useLanguage";
export type { Language, LanguageContextType } from "./languageTypes";
