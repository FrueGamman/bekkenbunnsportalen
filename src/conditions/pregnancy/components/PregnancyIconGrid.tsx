"use client"

import { useTheme } from "../../../context/ThemeContext"
import styles from "./PregnancyIconGrid.module.css"

const COMMON_PROBLEMS = {
  no: [
    { id: "urinlekkasje", label: "Urinlekkasje", icon: "/image-7.svg" },
    { id: "avforingslekkasje", label: "Avføringslekkasje", icon: "/fecalincontinence.svg" },
    { id: "forstoppelse", label: "Forstoppelse", icon: "/constipation.svg" },
    { id: "hemoroider", label: "Hemoroider", icon: "/Hemorhoids.svg" },
    { id: "smertefull-avforing", label: "Smertefull avføring", icon: "/Pain bowl movement.svg" },
    { id: "hastverkstrang", label: "Hastverkstrang", icon: "/Emergency.svg" },
    { id: "urinveisinfeksjon", label: "Urinveisinfeksjon", icon: "/Urinary Infenction.svg" },
    { id: "tyngdefolelse-prolaps", label: "Tyngdefølelse og prolaps", icon: "/Heaviness and Prolapse.svg" },
    { id: "fodselsrift", label: "Fødselsrift", icon: "/Perineal Tears (2).svg" },
    { id: "samleie", label: "Samleie", icon: "/Sexualintercourse.svg" }
  ],
  en: [
    { id: "urinlekkasje", label: "Urinary Incontinence", icon: "/image-7.svg" },
    { id: "avforingslekkasje", label: "Fecal Incontinence", icon: "/fecalincontinence.svg" },
    { id: "forstoppelse", label: "Constipation", icon: "/constipation.svg" },
    { id: "hemoroider", label: "Hemorrhoids", icon: "/Hemorhoids.svg" },
    { id: "smertefull-avforing", label: "Painful Bowel Movements", icon: "/Pain bowl movement.svg" },
    { id: "hastverkstrang", label: "Urgency", icon: "/Emergency.svg" },
    { id: "urinveisinfeksjon", label: "Urinary Tract Infection", icon: "/Urinary Infenction.svg" },
    { id: "tyngdefolelse-prolaps", label: "Heaviness and Prolapse", icon: "/Heaviness and Prolapse.svg" },
    { id: "fodselsrift", label: "Perineal Tears", icon: "/Perineal Tears (2).svg" },
    { id: "samleie", label: "Sexual Intercourse", icon: "/Sexualintercourse.svg" }
  ]
} as const

interface PregnancyIconGridProps {
  language: "no" | "en"
  onNavigate?: (sectionId: string) => void
  selectedSection?: string | null
}

export const PregnancyIconGrid = ({ language, onNavigate, selectedSection }: PregnancyIconGridProps) => {
  const { resolvedTheme } = useTheme()

  const handleCardClick = (problemId: string) => {
    if (onNavigate) {
      // Toggle selection - if already selected, deselect
      if (selectedSection === problemId) {
        onNavigate('')
      } else {
        onNavigate(problemId)
      }
    } else {
      // Fallback to scroll behavior
      const element = document.getElementById(problemId)
      if (element) {
        const offset = 100 // Account for sticky header and navigation
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        })
      }
    }
  }

  return (
    <div className={`${styles.iconGrid} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      {COMMON_PROBLEMS[language].map((problem) => (
        <button
          key={problem.id}
          onClick={() => handleCardClick(problem.id)}
          className={`${styles.iconCard} ${selectedSection === problem.id ? styles.selected : ''}`}
          aria-label={`Navigate to ${problem.label} section`}
        >
          <div className={styles.iconContainer}>
            <img 
              src={problem.icon} 
              alt={problem.label}
              className={styles.iconImage}
              loading="lazy"
            />
          </div>
          <h3 className={styles.iconLabel}>{problem.label}</h3>
        </button>
      ))}
    </div>
  )
}
