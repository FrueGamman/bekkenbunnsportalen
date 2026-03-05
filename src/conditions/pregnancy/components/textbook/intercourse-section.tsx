"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { intercourseData } from "../../../../data/textbook-section-data/intercourse-data"


type IntercourseSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const IntercourseSection = ({ dataNo, dataEn }: IntercourseSectionProps = {}) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = dataNo != null && dataEn != null
    ? (language === "no" ? (dataNo as typeof intercourseData.no) : (dataEn as typeof intercourseData.en))
    : (language === "no" ? intercourseData.no : intercourseData.en)

  return (
    <>
      {data.sections.map((section, index) => (
        <SectionAccordion
          key={index}
          title={section.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className={styles.enhancedParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </SectionAccordion>
      ))}
    </>
  )
}

