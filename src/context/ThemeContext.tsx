// src/context/ThemeContext.tsx
"use client"
import { createContext } from 'react'
import type { ThemeContextType } from './themeTypes'

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Re-export hook and types for convenience
export { useTheme } from './useTheme'
export type { ThemeMode, ContrastMode, ThemeContextType } from './themeTypes'