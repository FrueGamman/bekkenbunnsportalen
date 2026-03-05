"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { bladderFunctionData } from "../../../../data/textbook-section-data/bladder-function-data"


type BladderFunctionSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const BladderFunctionSection = ({ dataNo, dataEn }: BladderFunctionSectionProps = {}) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = dataNo != null && dataEn != null
    ? (language === "no" ? (dataNo as typeof bladderFunctionData.no) : (dataEn as typeof bladderFunctionData.en))
    : (language === "no" ? bladderFunctionData.no : bladderFunctionData.en)

  return (
    <>
      {data.sections.map((section: Record<string, any>, index: number) => (
        <SectionAccordion
          key={index}
          id={`bladder-function-${section.id}`}
          title={section.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            {/* Content - can be string or array */}
            {section.content && (
              Array.isArray(section.content) ? (
                section.content.map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className={styles.enhancedParagraph}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className={styles.enhancedParagraph}>
                  {section.content}
                </p>
              )
            )}

            {/* Subsections */}
            {section.subsections && (section.subsections as Array<{ subtitle: string; content?: string | string[]; items?: string[] }>).map((subsection: { subtitle: string; content?: string | string[]; items?: string[] }, sIndex: number) => (
              <div key={sIndex} style={{ marginTop: '24px' }}>
                <h5 className={styles.subsectionHeading} style={{
                  color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                }}>
                  {subsection.subtitle}
                </h5>

                {subsection.content && (
                  Array.isArray(subsection.content) ? (
                    subsection.content.map((paragraph: string, pIndex: number) => (
                      <p key={pIndex} className={styles.enhancedParagraph}>
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className={styles.enhancedParagraph}>
                      {subsection.content}
                    </p>
                  )
                )}

                {subsection.items && (
                  <ul className={styles.resourceList}>
                    {subsection.items.map((item: string, iIndex: number) => (
                      <li key={iIndex} className={styles.resourceListItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </SectionAccordion>
      ))}
    </>
  )
}
