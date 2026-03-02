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

  const getDirectusAssetId = (value: unknown): string => {
    if (!value) return ""
    if (typeof value === "string") return value
    if (typeof value === "number") return String(value)
    if (typeof value === "object") {
      const record = value as Record<string, unknown>
      if (typeof record.id === "string") return record.id
      if (typeof record.id === "number") return String(record.id)
      if (typeof record.directus_files_id === "string") return record.directus_files_id
      if (typeof record.directus_files_id === "number") return String(record.directus_files_id)
      const nested = record.directus_files_id
      if (nested && typeof nested === "object") {
        const nestedRecord = nested as Record<string, unknown>
        if (typeof nestedRecord.id === "string") return nestedRecord.id
        if (typeof nestedRecord.id === "number") return String(nestedRecord.id)
      }
    }
    return ""
  }

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
        const iconAssetId = getDirectusAssetId(problem.Icon || problem.icon)
          || getDirectusAssetId(problem.Image || problem.image)
        const iconSrc = iconAssetId ? getImageUrl(iconAssetId) : ""

        return (
          <button
            key={problem.id}
            onClick={() => handleCardClick(problemId)}
            className={`${styles.iconCard} ${selectedSection === problemId ? styles.selected : ''}`}
            aria-label={language === "no" ? `Naviger til ${label} seksjon` : `Navigate to ${label} section`}
          >
            <div className={styles.iconContainer}>
              {iconSrc ? (
                <img
                  src={iconSrc}
                  alt={label}
                  className={styles.iconImage}
                  loading="lazy"
                />
              ) : null}
            </div>
            <h3 className={styles.iconLabel}>{label}</h3>
          </button>
        )
      })}
    </div>
  )
}
