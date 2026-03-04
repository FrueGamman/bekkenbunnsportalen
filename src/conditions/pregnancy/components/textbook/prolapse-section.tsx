"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { prolapseData } from "../../../../data/textbook-section-data/prolapse-data"


type ProlapseSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const ProlapseSection = ({ dataNo, dataEn }: ProlapseSectionProps = {}) => {
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
  const data = language === "no" ? (dataNo as typeof prolapseData.no) : (dataEn as typeof prolapseData.en)

  return (
    <>
        {data.sections.map((section: Record<string, any>, index: number) => (
          <SectionAccordion
            key={index}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {/* Intro paragraph */}
              {section.intro && !section.types && (
                <p className={styles.enhancedParagraph} style={{ marginBottom: '20px' }}>
                  {section.intro}
                </p>
              )}

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

              {/* Types of prolapse with symptoms */}
              {section.types && (section.types as Array<{ name: string; image?: { src: string; alt: string; caption: string }; symptoms: readonly string[] }>).map((type: { name: string; image?: { src: string; alt: string; caption: string }; symptoms: readonly string[] }, tIndex: number) => (
                <div key={tIndex} style={{ marginTop: tIndex > 0 ? '32px' : '0', marginBottom: '24px' }}>
                  <h5 className={styles.subsectionHeading} style={{ 
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {type.name}
                  </h5>
                  
                  {/* Image and symptoms in row layout */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '24px',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'
                  }}>
                    {/* Image for this type */}
                    {type.image && (
                      <figure style={{
                        margin: '0',
                        flex: '0 0 300px',
                        minWidth: '250px',
                        textAlign: 'center'
                      }}>
                        <img
                          src={type.image.src}
                          alt={type.image.alt}
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
                          {type.image.caption}
                        </figcaption>
                      </figure>
                    )}
                    
                    {/* Symptoms list */}
                    <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                      <h6 className={styles.contentSubheading} style={{
                        margin: '0 0 12px 0',
                        color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                      }}>
                        {language === 'no' ? 'Symptomer:' : 'Symptoms:'}
                      </h6>
                      <ul className={styles.resourceList}>
                        {type.symptoms.map((symptom: string, sIndex: number) => (
                          <li key={sIndex} className={styles.resourceListItem}>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {/* Subsections for treatment section */}
              {section.subsections && (section.subsections as Array<Record<string, any>>).map((subsection: Record<string, any>, sIndex: number) => (
                <div key={sIndex} style={{ marginTop: '24px' }}>
                  <h5 className={styles.subsectionHeading} style={{ 
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {subsection.subtitle}
                  </h5>
                  
                  {subsection.intro && (
                    <p className={styles.enhancedParagraph} style={{ marginBottom: '12px' }}>
                      {subsection.intro}
                    </p>
                  )}

                  {subsection.content && (
                    <p className={styles.enhancedParagraph}>
                      {subsection.content}
                    </p>
                  )}

                  {subsection.items && (
                    <ul className={styles.resourceList}>
                      {(subsection.items as Array<string | Record<string, any>>).map((item: string | Record<string, any>, iIndex: number) => (
                        <li key={iIndex} className={styles.resourceListItem}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              {item.linkText && item.url ? (
                                <>
                                  <a 
                                    href={item.url}
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
                                    {item.linkText}
                                  </a>
                                  {item.textAfter}
                                </>
                              ) : item.link ? (
                                <>
                                  {' '}
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
                              ) : null}
                            </>
                          )}
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

