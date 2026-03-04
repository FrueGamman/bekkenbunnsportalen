"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { seekHelpData } from "../../../../data/textbook-section-data/seek-help-data"

type SeekHelpSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const SeekHelpSection = ({ dataNo, dataEn }: SeekHelpSectionProps = {}) => {
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
  const data = language === "no" ? (dataNo as typeof seekHelpData.no) : (dataEn as typeof seekHelpData.en)

  return (
    <div id="seek-help">
        {data.sections.map((section, index) => (
          <SectionAccordion
            key={index}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {Array.isArray(section.content) ? (
                <>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className={styles.enhancedParagraph}>{paragraph}</p>
                  ))}
                  {'link' in section && section.link && (
                    <p className={styles.enhancedParagraph}>
                      <a 
                        href={section.link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.resourceLink}
                      >
                        {section.link.text}
                      </a>
                    </p>
                  )}
                </>
              ) : (
                <p className={styles.enhancedParagraph}>{section.content}</p>
              )}
            </div>
          </SectionAccordion>
        ))}
    </div>
  )
}

