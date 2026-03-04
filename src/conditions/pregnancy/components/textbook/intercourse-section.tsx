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

  if (dataNo == null || dataEn == null) {
    return (
      <div className={styles.normalFunctionContent} style={{ padding: "1rem" }}>
        <p className={styles.enhancedParagraph}>
          {language === "no"
            ? "Innhold for denne seksjonen hentes fra Directus. Kjør sync eller fyll ut data_no/data_en i kapittelet."
            : "Content for this section is loaded from Directus. Run sync or fill data_no/data_en on the chapter."}
        </p>
      </div>
    )
  }
  const data = language === "no" ? (dataNo as typeof intercourseData.no) : (dataEn as typeof intercourseData.en)

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

