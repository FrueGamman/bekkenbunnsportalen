"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { birthTearsData } from "../../../../data/textbook-section-data/birth-tears-data"


type BirthTearsSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const BirthTearsSection = ({ dataNo, dataEn }: BirthTearsSectionProps = {}) => {
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
  const data = language === "no" ? (dataNo as typeof birthTearsData.no) : (dataEn as typeof birthTearsData.en)

  return (
    <>
      <div className={styles.normalFunctionSection}>
        <div className={styles.normalFunctionContent}>
          <p className={styles.enhancedParagraph}>{data.intro}</p>
        </div>
      </div>

      {data.sections.map((section: Record<string, any>, index: number) => (
        <SectionAccordion
          key={index}
          title={section.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            {section.intro && (
              <p className={styles.enhancedParagraph} style={{ marginBottom: '20px' }}>
                {section.intro}
              </p>
            )}

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

            {/* Grades section */}
            {section.grades && (
              <div style={{ margin: '20px 0' }}>
                {(section.grades as Array<{ grade: string; description: string; subgrades?: readonly string[] }>).map((grade: { grade: string; description: string; subgrades?: readonly string[] }, gIndex: number) => (
                  <div key={gIndex} style={{
                    marginBottom: '16px',
                    padding: '12px',
                    background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(5, 56, 112, 0.05)',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                  }}>
                    <strong style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
                      {grade.grade}:
                    </strong>
                    <span style={{ marginLeft: '8px' }}>{grade.description}</span>
                    {/* Subgrades for Grade 3 */}
                    {grade.subgrades && (
                      <ul style={{
                        marginTop: '8px',
                        marginLeft: '24px',
                        listStyleType: 'disc',
                        color: resolvedTheme === 'dark' ? '#e0e0e0' : '#333'
                      }}>
                        {grade.subgrades.map((subgrade: string, sgIndex: number) => (
                          <li key={sgIndex} style={{ marginBottom: '4px' }}>
                            {subgrade}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Grades subsections */}
            {section.detailedGrades && (section.detailedGrades as Array<{ title: string; content: string; link?: { text: string; url: string } }>).map((detailGrade: { title: string; content: string; link?: { text: string; url: string } }, dgIndex: number) => (
              <div key={`dg-${dgIndex}`} style={{ marginTop: '24px' }}>
                <h5 className={styles.subsectionHeading} style={{
                  color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                }}>
                  {detailGrade.title}
                </h5>
                <p className={styles.enhancedParagraph}>
                  {detailGrade.content}
                </p>
                {detailGrade.link && (
                  <p className={styles.enhancedParagraph} style={{ marginTop: '12px' }}>
                    <a
                      href={detailGrade.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {detailGrade.link.text}
                    </a>
                  </p>
                )}
              </div>
            ))}

            {/* Subsections */}
            {section.subsections && (section.subsections as Array<{ subtitle: string; content: string | string[] }>).map((subsection: { subtitle: string; content: string | string[] }, sIndex: number) => (
              <div key={sIndex} style={{ marginTop: '24px' }}>
                <h5 className={styles.subsectionHeading} style={{
                  color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                }}>
                  {subsection.subtitle}
                </h5>
                {Array.isArray(subsection.content) ? (
                  subsection.content.map((para: string, pIndex: number) => (
                    <p key={pIndex} className={styles.enhancedParagraph}>
                      {para}
                    </p>
                  ))
                ) : (
                  <p className={styles.enhancedParagraph}>{subsection.content}</p>
                )}
              </div>
            ))}

            {/* Seek Help box */}
            {section.seekHelp && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                background: resolvedTheme === 'dark' ? 'rgba(255, 100, 100, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                borderRadius: '8px',
                border: `2px solid ${resolvedTheme === 'dark' ? 'rgba(255, 100, 100, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`
              }}>
                <h5 className={styles.subsectionHeading} style={{
                  marginBottom: '12px',
                  color: resolvedTheme === 'dark' ? '#ff6b6b' : '#dc3545'
                }}>
                  {section.seekHelp.title}
                </h5>
                <ul className={styles.resourceList}>
                  {section.seekHelp.items.map((item: string, iIndex: number) => (
                    <li key={iIndex} className={styles.resourceListItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Link at the end */}
            {section.link && (
              <p className={styles.enhancedParagraph} style={{ marginTop: '20px' }}>
                <a
                  href={section.link.url}
                  className={styles.inlineLink}
                  style={{
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  {section.link.text}
                </a>
              </p>
            )}
          </div>
        </SectionAccordion>
      ))}
    </>
  )
}

