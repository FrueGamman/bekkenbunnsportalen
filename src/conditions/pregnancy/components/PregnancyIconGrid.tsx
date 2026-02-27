"use client"

import { useTheme } from "../../../context/ThemeContext"
import styles from "./PregnancyIconGrid.module.css"
import type { PregnancyProblem } from "../../../types/cms"
import { getImageUrl } from "../../../lib/directus"

interface PregnancyIconGridProps {
  language: "no" | "en"
  problems?: PregnancyProblem[]
  onNavigate?: (sectionId: string) => void
  selectedSection?: string | null
}

export const PregnancyIconGrid = ({ language, problems = [], onNavigate, selectedSection }: PregnancyIconGridProps) => {
  const { resolvedTheme } = useTheme()

  const handleCardClick = (problemId: string) => {
    if (onNavigate) {
      if (selectedSection === problemId) {
        onNavigate('')
      } else {
        onNavigate(problemId)
      }
    } else {
      const element = document.getElementById(problemId)
      if (element) {
        const offset = 100
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        })
      }
    }
  }

  // Fallback if no problems loaded yet
  if (!problems || problems.length === 0) return null

  return (
    <div className={`${styles.iconGrid} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      {problems.map((problem) => {
        // Fallback to English name if Norwegian name is missing (though unlikely in a NO-first project)
        const label = language === "en" && problem.name_en ? problem.name_en : problem.name_no
        // Use slug if available for the DOM ID, otherwise a sanitized name
        const problemId = problem.slug || problem.name_no?.toLowerCase().replace(/\s+/g, '-') || `problem-${problem.id}`

        return (
          <button
            key={problem.id}
            onClick={() => handleCardClick(problemId)}
            className={`${styles.iconCard} ${selectedSection === problemId ? styles.selected : ''}`}
            aria-label={language === "no" ? `Naviger til ${label} seksjon` : `Navigate to ${label} section`}
          >
            <div className={styles.iconContainer}>
              <img
                src={problem.icon ? getImageUrl(problem.icon) : "/placeholder.svg"}
                alt={label}
                className={styles.iconImage}
                loading="lazy"
              />
            </div>
            <h3 className={styles.iconLabel}>{label}</h3>
          </button>
        )
      })}
    </div>
  )
}
