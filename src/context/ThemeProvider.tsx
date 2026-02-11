"use client"
import React, { useEffect, useState } from 'react'
import { resolveTheme } from './themeTypes'
import type { ThemeMode, ContrastMode } from './themeTypes'
import { ThemeContext } from './ThemeContext'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize state from localStorage immediately
  const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light'
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    return (savedTheme && ['light', 'dark'].includes(savedTheme)) ? savedTheme : 'light'
  }

  const getInitialContrast = (): ContrastMode => {
    if (typeof window === 'undefined') return 'normal'
    const savedContrast = localStorage.getItem('contrast') as ContrastMode
    return (savedContrast && ['normal', 'high'].includes(savedContrast)) ? savedContrast : 'normal'
  }

  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme)
  const [contrast, setContrastState] = useState<ContrastMode>(getInitialContrast)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(resolveTheme(getInitialTheme()))

  // Save to localStorage whenever theme or contrast changes
  useEffect(() => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('contrast', contrast)
  }, [theme, contrast])

  // Update resolved theme when theme changes
  useEffect(() => {
    const baseResolvedTheme = resolveTheme(theme)
    setResolvedTheme(baseResolvedTheme)
  }, [theme])

  // Apply theme and contrast classes to document
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark', 'normal-contrast', 'high-contrast')
    body.classList.remove('light', 'dark', 'normal-contrast', 'high-contrast')
    
    // Add current resolved theme and contrast classes
    root.classList.add(resolvedTheme, `${contrast}-contrast`)
    body.classList.add(resolvedTheme, `${contrast}-contrast`)

    // Also set data attributes for CSS variable themes
    root.setAttribute('data-theme', resolvedTheme)
    root.setAttribute('data-contrast', contrast)
    body.setAttribute('data-theme', resolvedTheme)
    body.setAttribute('data-contrast', contrast)
    
    // Set color-scheme meta tag
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]')
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', resolvedTheme)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'color-scheme'
      meta.content = resolvedTheme
      document.head.appendChild(meta)
    }
  }, [resolvedTheme, contrast])

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleContrast = () => {
    setContrastState(prev => prev === 'normal' ? 'high' : 'normal')
  }

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme)
  }

  const setContrast = (newContrast: ContrastMode) => {
    setContrastState(newContrast)
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      contrast,
      resolvedTheme,
      toggleTheme,
      toggleContrast,
      setTheme,
      setContrast
    }}>
      {children}
    </ThemeContext.Provider>
  )
}


