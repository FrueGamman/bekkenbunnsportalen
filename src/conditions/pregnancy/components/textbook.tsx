"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"
import { usePregnancyData } from "../../../hooks/usePregnancyData"
import type { PregnancyChapter } from "../../../types/cms"
import { ChapterSectionRenderer } from "./textbook/ChapterSectionRenderer"
import { TextbookIntro } from "./textbook/textbook-intro"

// Section title keys — shown as accordion headers, pulled from Directus chapter.title_no/en
const CHAPTER_IDS = [
  "pelvic-floor",
  "pelvis-pregnancy",
  "delivery-method",
  "birth-tears",
  "prolapse",
  "bladder-function",
  "bowel-function",
  "intercourse",
  "female-circumcision",
  "seek-help",
] as const

export const Textbook = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const { language: lang } = useLanguage()
  const { data: pregnancyData } = usePregnancyData(lang)
  const chapters = (pregnancyData?.chapters ?? []) as PregnancyChapter[]

  const getTitle = (index: number) => {
    const ch = chapters[index]
    if (!ch) return ""
    return (language === "en" && ch.title_en) ? ch.title_en : ch.title_no
  }

  // Handle hash-based navigation to open specific accordion and scroll to it
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        const topLevelIds = CHAPTER_IDS as readonly string[]

        const closeOtherAccordions = (keepId: string) => {
          topLevelIds.forEach((id) => {
            if (id === keepId) return
            const container = document.getElementById(id)
            if (!container) return
            const button = container.querySelector("button")
            if (button && button.getAttribute("aria-expanded") === "true") {
              button.click()
            }
          })
        }

        const parentId = topLevelIds.find(id => hash.startsWith(`${id}-`) && hash !== id)

        if (parentId) {
          closeOtherAccordions(parentId)
          const parentAccordion = document.getElementById(parentId)
          if (parentAccordion) {
            const button = parentAccordion.querySelector("button")
            if (button && button.getAttribute("aria-expanded") === "false") {
              button.click()
            }
          }
          return
        }

        const element = document.getElementById(hash)
        if (element) {
          closeOtherAccordions(hash)
          const accordionContainer = element.closest(`.${styles.accordionContainer}`) || element
          if (accordionContainer) {
            const button = accordionContainer.querySelector("button")
            if (button && button.getAttribute("aria-expanded") === "false") {
              button.click()
            }
            setTimeout(() => {
              const offset = 100
              const elementPosition = accordionContainer.getBoundingClientRect().top + window.pageYOffset
              window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
            }, 100)
          }
        }
      }
    }

    setTimeout(handleHashNavigation, 200)
    window.addEventListener("hashchange", handleHashNavigation)
    return () => {
      window.removeEventListener("hashchange", handleHashNavigation)
    }
  }, [])

  return (
    <div id="textbook" className={`${styles.sectionContainer} ${resolvedTheme === "dark" ? styles.darkMode : ""}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="Textbook" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {language === "no" ? "Lærebok" : "Textbook"}
        </h2>
      </div>

      <div className={styles.sectionContent}>
        {/* Introduction text */}
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <TextbookIntro />
          </div>
        </div>

        {/* One accordion per chapter — content rendered from Directus sections */}
        <div style={{ marginTop: "24px" }}>
          {CHAPTER_IDS.map((chapterId, index) => (
            <SectionAccordion
              key={chapterId}
              id={chapterId}
              title={getTitle(index)}
              isDarkMode={resolvedTheme === "dark"}
              defaultOpen={false}
            >
              <ChapterSectionRenderer chapter={chapters[index]} />
            </SectionAccordion>
          ))}
        </div>
      </div>
    </div>
  )
}
