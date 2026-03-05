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

  const data = dataNo != null && dataEn != null
    ? (language === "no" ? (dataNo as typeof pelvisPregnancyData.no) : (dataEn as typeof pelvisPregnancyData.en))
    : (language === "no" ? pelvisPregnancyData.no : pelvisPregnancyData.en)

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

