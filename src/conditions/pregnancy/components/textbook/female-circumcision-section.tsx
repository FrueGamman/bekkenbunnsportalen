"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { femaleCircumcisionData } from "../../../../data/textbook-section-data/female-circumcision-data"


type FemaleCircumcisionSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const FemaleCircumcisionSection = ({ dataNo, dataEn }: FemaleCircumcisionSectionProps = {}) => {
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
  const data = language === "no" ? (dataNo as typeof femaleCircumcisionData.no) : (dataEn as typeof femaleCircumcisionData.en)

  return (
    <>
        {/* Introduction */}
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            {data.intro.map((paragraph, index) => (
              <p key={index} className={styles.enhancedParagraph}>
                {paragraph}
              </p>
            ))}

            {/* Types of circumcision */}
            <div style={{ margin: '20px 0' }}>
              {data.types.map((type: { type: string; description: string }, tIndex: number) => (
                <div key={tIndex} style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(5, 56, 112, 0.05)',
                  borderRadius: '6px',
                  borderLeft: `4px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                }}>
                  <strong style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
                    {type.type}:
                  </strong>
                  <span style={{ marginLeft: '8px' }}>{type.description}</span>
                </div>
              ))}
            </div>

            <p className={styles.enhancedParagraph} style={{ marginTop: '16px' }}>
              {data.conclusion}
            </p>
          </div>
        </div>

        {/* Main sections */}
        {data.sections.map((section: Record<string, any>, sectionIndex: number) => (
          <SectionAccordion
            key={sectionIndex}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {/* Section intro */}
              {section.intro && (
                <p className={styles.enhancedParagraph} style={{ marginBottom: '16px' }}>
                  {section.intro}
                </p>
              )}

              {/* Section content */}
              {section.content && section.content.map((paragraph: string, pIndex: number) => (
                <p key={pIndex} className={styles.enhancedParagraph}>
                  {paragraph}
                  {/* Add link inline if this is the paragraph that needs it */}
                  {section.link && pIndex === section.content.length - 2 && (
                    <a
                      href={section.link.url}
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
                      {section.link.text}
                    </a>
                  )}
                  {section.link && pIndex === section.content.length - 1 && '.'}
                </p>
              ))}

              {/* Items list */}
              {section.items && (
                <ul className={styles.resourceList}>
                  {(section.items as Array<string | { text: string; link?: { text: string; url: string } }>).map((item: string | { text: string; link?: { text: string; url: string } }, iIndex: number) => (
                    <li key={iIndex} className={styles.resourceListItem}>
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          {item.text}
                          {item.link && (
                            <>
                              {' - '}
                              <a
                                href={item.link.url}
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
                                {item.link.text}
                              </a>
                            </>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* Images for pelvic floor */}
              {section.images && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  margin: '24px 0'
                }}>
                  {(section.images as Array<{ src: string; alt: string; caption: string }>).map((img: { src: string; alt: string; caption: string }, imgIndex: number) => (
                    <figure key={imgIndex} style={{
                      margin: '0',
                      textAlign: 'center'
                    }}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <figcaption className={styles.responsiveFigcaption} style={{
                        fontStyle: 'italic',
                        color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                      }}>
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {/* Closing text with link */}
              {section.closingText && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '20px' }}>
                  {section.closingText}
                  {section.closingLink && (
                    <>
                      <a
                        href={section.closingLink.url}
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
                        {section.closingLink.text}
                      </a>
                      .
                    </>
                  )}
                </p>
              )}

              {/* Link at end of content */}
              {section.link && !section.content && (
                <p className={styles.enhancedParagraph}>
                  <a
                    href={section.link.url}
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
