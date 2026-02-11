// src/components/LanguageSelector.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"
import type { Language } from "../context/languageTypes"
import { useTextToSpeech } from "../hooks/useTextToSpeech"
import { Button } from "./ui/Button"
import styles from "./LanguageSelector.module.css"

const languages = [
  { code: "no" as Language, name: "Norsk", flag: "🇳🇴" },
  { code: "en" as Language, name: "English", flag: "🇬🇧" },
]

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const { setLanguage: setTTSLanguage } = useTextToSpeech()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language)

  // Update TTS language when app language changes
  useEffect(() => {
    setTTSLanguage(language)
  }, [language, setTTSLanguage])

  return (
    <div className={styles.container}>
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        className={styles.trigger}
        aria-label={`Velg språk. Nåværende språk: ${currentLanguage?.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.flag} aria-hidden="true">{currentLanguage?.flag}</span>
        <span className="sr-only">{currentLanguage?.name}</span>
      </Button>

      {isOpen && (
        <>
          <div 
            className={styles.overlay} 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div 
            className={styles.dropdown}
            role="listbox"
            aria-label="Velg språk"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`${styles.option} ${language === lang.code ? styles.active : ""}`}
                role="option"
                aria-selected={language === lang.code}
                aria-label={`Velg ${lang.name}`}
              >
                <span className={styles.flag} aria-hidden="true">{lang.flag}</span>
                <span className={styles.name}>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
