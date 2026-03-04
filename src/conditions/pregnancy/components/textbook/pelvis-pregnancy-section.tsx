"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { pelvisPregnancyData } from "../../../../data/textbook-section-data/pelvis-pregnancy-data"

type PelvisPregnancySectionProps = { dataNo?: unknown; dataEn?: unknown }

export const PelvisPregnancySection = ({ dataNo, dataEn }: PelvisPregnancySectionProps = {}) => {
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
  const data = language === "no" ? (dataNo as typeof pelvisPregnancyData.no) : (dataEn as typeof pelvisPregnancyData.en)

  return (
    <>
      <div className={styles.normalFunctionSection}>
        <div className={styles.normalFunctionContent}>
          <p className={styles.enhancedParagraph}>{data.intro}</p>
        </div>
      </div>

      {data.sections.map((section, index) => (
        <SectionAccordion
          key={index}
          title={section.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            {section.content.map((paragraph, pIndex) => {
              // Check if this paragraph should have a link
              const sectionAny = section as unknown as Record<string, any>;
              const hasLink = sectionAny.link && pIndex === section.content.length - 1 && paragraph.includes(sectionAny.link.text)

              if (hasLink && sectionAny.link) {
                const parts = paragraph.split(sectionAny.link.text)
                return (
                  <p key={pIndex} className={styles.enhancedParagraph}>
                    {parts[0]}
                    <a
                      href={sectionAny.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inlineLink}
                    >
                      {sectionAny.link.text}
                    </a>
                    {parts[1]}
                  </p>
                )
              }

              return (
                <p key={pIndex} className={styles.enhancedParagraph}>
                  {paragraph}
                </p>
              )
            })}
          </div>
        </SectionAccordion>
      ))}
    </>
  )
}

