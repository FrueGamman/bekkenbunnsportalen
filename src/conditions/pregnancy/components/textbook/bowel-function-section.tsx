"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { bowelFunctionData } from "../../../../data/textbook-section-data/bowel-function-data"


type BowelFunctionSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const BowelFunctionSection = ({ dataNo, dataEn }: BowelFunctionSectionProps = {}) => {
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
  const data = language === "no" ? (dataNo as typeof bowelFunctionData.no) : (dataEn as typeof bowelFunctionData.en)

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
          </div>
        </div>

        {/* Toilet Posture Section */}
        <SectionAccordion
          title={data.toiletPosture.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph} style={{ marginBottom: '16px' }}>
              {data.toiletPosture.intro}
            </p>

            <ul className={styles.resourceList} style={{ marginBottom: '24px' }}>
              {data.toiletPosture.tips.map((tip: string, index: number) => (
                <li key={`tip-${index}-${tip.substring(0, 15)}`} className={styles.resourceListItem}>
                  {tip}
                </li>
              ))}
            </ul>

            {/* All toilet posture images in one container */}
            <figure style={{
              margin: '24px auto',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {/* Step images */}
                {data.toiletPosture.stepImages && data.toiletPosture.stepImages.map((stepImg: { src: string; alt: string; caption: string }, index: number) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <img
                      src={stepImg.src}
                      alt={stepImg.alt}
                      style={{
                        width: '100%',
                        maxWidth: '180px',
                        height: 'auto',
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Single caption for all images */}
              <figcaption className={styles.responsiveFigcaption} style={{
                fontStyle: 'italic',
                color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
              }}>
                {data.toiletPosture.image.caption}
              </figcaption>
            </figure>

            {data.toiletPosture.additionalInfo.map((paragraph: string, index: number) => (
              <p key={index} className={styles.enhancedParagraph} style={{ marginTop: index === 0 ? '24px' : '16px' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </SectionAccordion>

        {/* Main sections */}
        {data.sections.map((section: Record<string, any>, sectionIndex: number) => (
          <SectionAccordion
            key={sectionIndex}
            id={section.id ? `bowel-function-${section.id}` : undefined}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {/* Section content */}
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

              {/* Image for Bristol Scale */}
              {section.image && (
                <figure style={{
                  margin: '24px auto',
                  maxWidth: '400px',
                  textAlign: 'center'
                }}>
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    style={{
                      width: '100%',
                      maxWidth: '350px',
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <figcaption className={styles.responsiveFigcaption} style={{
                    fontStyle: 'italic',
                    color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                  }}>
                    {section.image.caption}
                  </figcaption>
                </figure>
              )}

              {/* Section intro */}
              {section.intro && (
                <p className={styles.enhancedParagraph} style={{ marginBottom: '20px' }}>
                  {section.intro}
                </p>
              )}

              {/* Subsections */}
              {(section.subsections as Array<Record<string, any>> | undefined)?.map((subsection: Record<string, any>, subIndex: number) => (
                <div key={`subsection-${subIndex}-${subsection.subtitle || subIndex}`} style={{ marginTop: '24px' }}>
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
                    Array.isArray(subsection.content) ? (
                      subsection.content.map((paragraph: string, pIndex: number) => (
                        <p key={pIndex} className={styles.enhancedParagraph}>
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className={styles.enhancedParagraph} style={{ marginBottom: '12px' }}>
                        {subsection.content}
                      </p>
                    )
                  )}

                  {/* Image within subsection */}
                  {subsection.image && (
                    <figure style={{
                      margin: '24px auto',
                      maxWidth: '400px',
                      textAlign: 'center'
                    }}>
                      <img
                        src={subsection.image.src}
                        alt={subsection.image.alt}
                        style={{
                          width: '100%',
                          maxWidth: '350px',
                          height: 'auto',
                          borderRadius: '6px',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <figcaption className={styles.responsiveFigcaption} style={{
                        fontStyle: 'italic',
                        color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                      }}>
                        {subsection.image.caption}
                      </figcaption>
                    </figure>
                  )}

                  {/* Nested sections within subsection */}
                  {subsection.sections && (subsection.sections as Array<Record<string, any>>).map((nestedSection: Record<string, any>, nsIndex: number) => (
                    <div key={nsIndex} style={{ marginTop: '20px', marginLeft: '12px' }}>
                      <h6 style={{
                        fontWeight: '600',
                        margin: '12px 0 10px',
                        color: resolvedTheme === 'dark' ? '#8ab4d6' : '#156ba8'
                      }}>
                        {nestedSection.title}
                      </h6>
                      {Array.isArray(nestedSection.content) ? (
                        nestedSection.content.map((paragraph: string, pIndex: number) => (
                          <p key={pIndex} className={styles.enhancedParagraph}>
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p className={styles.enhancedParagraph}>
                          {nestedSection.content}
                        </p>
                      )}
                      {nestedSection.items && (
                        <ul className={styles.resourceList}>
                          {nestedSection.items.map((item: string, iIndex: number) => (
                            <li key={iIndex} className={styles.resourceListItem}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* Warning box */}
                      {nestedSection.warning && (
                        <div style={{
                          marginTop: '16px',
                          padding: '12px',
                          background: resolvedTheme === 'dark' ? 'rgba(255,193,7,0.1)' : 'rgba(255,193,7,0.15)',
                          borderLeft: `4px solid ${resolvedTheme === 'dark' ? '#ffc107' : '#ff9800'}`,
                          borderRadius: '4px'
                        }}>
                          <strong style={{ color: resolvedTheme === 'dark' ? '#ffc107' : '#ff6f00' }}>
                            {nestedSection.warning.title}
                          </strong>
                          <p className={styles.enhancedParagraph} style={{ marginTop: '8px', marginBottom: '0' }}>
                            {nestedSection.warning.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Grades for hemorrhoids */}
                  {subsection.grades && (
                    <div style={{ margin: '16px 0' }}>
                      {(subsection.grades as Array<{ grade: string; description: string }>).map((grade: { grade: string; description: string }, gIndex: number) => (
                        <div key={gIndex} style={{
                          marginBottom: '12px',
                          padding: '10px',
                          background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(5, 56, 112, 0.05)',
                          borderRadius: '6px',
                          borderLeft: `3px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                        }}>
                          <strong style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
                            {grade.grade}:
                          </strong>
                          <span style={{ marginLeft: '8px' }}>{grade.description}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* List items */}
                  {subsection.items && (
                    <ul className={styles.resourceList}>
                      {(subsection.items as Array<string | { text: string }>).map((item: string | { text: string }, iIndex: number) => (
                        <li key={iIndex} className={styles.resourceListItem}>
                          {typeof item === 'string' ? item : item.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Link at the end of subsection */}
                  {subsection.link && (
                    <p className={styles.enhancedParagraph} style={{ marginTop: '16px' }}>
                      <a
                        href={subsection.link.url}
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
                        {subsection.link.text}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </SectionAccordion>
        ))}
    </>
  )
}
