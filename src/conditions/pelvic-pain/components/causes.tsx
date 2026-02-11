"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific data arrays
const causesData = {
  no: {
    pageTitle: "Årsaker",
    sections: [
      {
        id: "opening_quote",
        isHighlight: true,
        content: "Etter fødselsskaden var jeg konstant redd for å ikke ha kontroll på luft, urin og avføring. Jeg holdt meg hele tiden og etterhvert kom smertene i tillegg",
        author: "Kvinne, 28 år"
      },
      {
        id: "muscular",
        title: "Muskulær årsak",
        hasSideBySide: true,
        content: "Spenninger i muskelvev i bekkenet, og særlig i bekkenbunnsmuskulaturen har ofte en sentral rolle ved dysfunksjoner og smerter fra underliv/bekken. Dette gjelder både hos kvinner og menn. Smerter fra muskulatur beskrives ofte som \"tannpine\", en dyp, vanskelig lokaliserbar smerte.\n\nGenerelt er det lurt å lære seg å kjenne forskjell mellom spenning og avspenning av bekkenbunnsmuskulaturen og for mange er det veien til bedre funksjon og mindre smerter.",
        hasImage: true,
        image: {
          src: "/painMuscle.jpg",
          alt: "Utsnitt av en person som holder hendene mot magen som i smerte"
        }
      },
      {
        id: "nervous_system",
        title: "Nervesystemet",
        hasQuote: true,
        quote: {
          text: "Jeg forstår ikke hvorfor jeg har smertene mine. Legene har undersøkt meg mange ganger uten at vi finner noen årsak til de smertene jeg har. Dette er svært vanskelig å forholde seg til.",
          author: "Kvinne, 35 år"
        },
        content: "Nervesystemet består av hjernen, ryggmargen og alt av nerver til hele kroppen. Dette systemet er en forutsetning for all fornemmelse of funksjon.\n\nUten smerteopplevelse vil vi ikke kunne ta vare på oss selv, fordi vi ikke kjenner det potensielt skadelige. Smerter er kroppens sterkeste og viktigste signal for overlevelse, og smerten er derfor vanskelig å overse.\n\nNår smerter har vedvart over tid vet vi at nervesystemet blir «hypersensitivt». Dette medfører at smertene kan øke i intensitet og omfang uten at det betyr at smertene er et signal om økt skade eller sykdom.",
        hasImage: true,
        image: {
          src: "/jpg PPT og WEB/kvinne-bekken-inferior-nerver-2.jpg",
          alt: "Nervesystemet i bekkenet"
        },
        hasSecondQuote: true,
        secondQuote: {
          text: "Smertene startet etter at jeg fikk fjernet hemoroider.",
          author: "Mann, 45 år"
        },
        additionalContent: "Noen ganger påvirkes nerver direkte av:",
        listItems: [
          "Operative inngrep i områder hvor nerven ligger",
          "Arrvev etter for eksempel strålebehandling",
          "Prolaps eller strukturelle endringer i rygg eller bekkenet",
          "Skade av nerver eller annet vev i bekkenet som følge av for eksempel fødsel, ulykke eller lignende",
          "Høy spenning i muskulatur/vev og dermed avklemming av nerven der den passerer"
        ],
        hasSubsection: true,
        subsectionTitle: "Bekkenets hovednerve",
        subsectionContent: "Bekkenets hovednerve kalles Nervus Pudendus. Nervus Pudendus sørger for at vi har kontroll over muskulatur i bekkenet, over vannlating og tømming av avføring. I tillegg gir den følsomhet i klitoris, tuppen av penis, kjønnsleppene, bakerste del av pungen og endetarmen. Om denne påvirkes kan pasienten oppleve ulike symptomer inkludert smerter.\n\nHvis du vil lese mer om pudendal påvirkning finner du lenke til engelsk nettside under «Ressurser».",
        hasSubsectionImages: true,
        subsectionImages: [
          {
            src: "/jpg PPT og WEB/pudendal-nerve-with-text.jpg",
            alt: "Pudendal Nerve illustration with anatomy text"
          },
          {
            src: "/jpg PPT og WEB/pudendal-nerve-3.jpg",
            alt: "Detailed view of the Pudendal Nerve path"
          },
          {
            src: "/jpg PPT og WEB/kvinne-bekken-inferior-nerver-3.jpg",
            alt: "Nervus Pudendus illustrasjon"
          }
        ]
      }
    ]
  },
  en: {
    pageTitle: "Causes",
    sections: [
      {
        id: "opening_quote",
        isHighlight: true,
        content: "After the birth injury, I was constantly afraid of not having control over gas, urine and stool. I held on all the time and eventually the pain came in addition",
        author: "Woman, 28 years"
      },
      {
        id: "muscular",
        title: "Muscular cause",
        hasSideBySide: true,
        content: "Tension in muscle tissue in the pelvis, and especially in the pelvic floor muscles, often plays a central role in dysfunctions and pain from the pelvic area. This applies to both women and men. Pain from muscles is often described as \"toothache\", a deep, difficult to localize pain.\n\nGenerally, it is wise to learn to distinguish between tension and relaxation of the pelvic floor muscles, and for many, this is the path to better function and less pain.",
        hasImage: true,
        image: {
          src: "/painMuscle.jpg",
          alt: "Person holding hands against stomach in pain"
        }
      },
      {
        id: "nervous_system",
        title: "Nervous system",
        hasQuote: true,
        quote: {
          text: "I don't understand why I have my pain. The doctors have examined me many times without finding any cause for the pain I have. This is very difficult to deal with.",
          author: "Woman, 35 years"
        },
        content: "The nervous system consists of the brain, spinal cord and all the nerves to the whole body. This system is a prerequisite for all sensation and function.\n\nWithout pain experience, we would not be able to take care of ourselves, because we do not know the potentially harmful. Pain is the body's strongest and most important signal for survival, and the pain is therefore difficult to ignore.\n\nWhen pain has persisted over time, we know that the nervous system becomes \"hypersensitive\". This means that the pain can increase in intensity and scope without it meaning that the pain is a signal of increased damage or disease.",
        hasImage: true,
        image: {
          src: "/jpg PPT og WEB/kvinne-bekken-inferior-nerver-2.jpg",
          alt: "The nervous system in the pelvis"
        },
        hasSecondQuote: true,
        secondQuote: {
          text: "The pain started after I had hemorrhoids removed.",
          author: "Man, 45 years"
        },
        additionalContent: "Sometimes nerves are directly affected by:",
        listItems: [
          "Surgical procedures in areas where the nerve lies",
          "Scar tissue after, for example, radiation treatment",
          "Prolapse or structural changes in the back or pelvis",
          "Damage to nerves or other tissue in the pelvis as a result of, for example, childbirth, accident or similar",
          "High tension in muscles/tissue and thus compression of the nerve where it passes"
        ],
        hasSubsection: true,
        subsectionTitle: "Pelvic main nerve",
        subsectionContent: "The pelvic main nerve is called the Pudendal Nerve. The Pudendal Nerve ensures that we have control over muscles in the pelvis, over urination and bowel movements. In addition, it provides sensitivity in the clitoris, tip of the penis, labia, back of the scrotum and rectum. If this is affected, the patient may experience various symptoms including pain.\n\nIf you want to read more about pudendal involvement, you can find a link to an English website under \"Resources\".",
        hasSubsectionImages: true,
        subsectionImages: [
          {
            src: "/jpg PPT og WEB/pudendal-nerve-with-text.jpg",
            alt: "Pudendal Nerve illustration with anatomy text"
          },
          {
            src: "/jpg PPT og WEB/pudendal-nerve-3.jpg",
            alt: "Detailed view of the Pudendal Nerve path"
          },
          {
            src: "/jpg PPT og WEB/kvinne-bekken-inferior-nerver-3.jpg",
            alt: "Pudendal Nerve illustration"
          }
        ]
      }
    ]
  }
} as const

export const Causes = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/couse.png"
              alt="Causes"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{causesData[language].pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {causesData[language].sections.map((section) => {
            const hasTitle = 'title' in section && section.title;
            const sectionAny = section as any;

            const content = (
              <div className={styles.normalFunctionContent}>
                {/* Opening highlight quote */}
                {sectionAny.isHighlight && sectionAny.author && (
                  <div className={styles.highlightBox} style={{ marginBottom: '28px', padding: '20px' }}>
                    <p
                      className={styles.enhancedParagraph}
                      style={{
                        fontStyle: 'italic',
                        marginBottom: '14px',
                        lineHeight: '1.8',
                        wordSpacing: '1px'
                      }}
                    >
                      "{sectionAny.content}"
                    </p>
                    <p className={styles.enhancedParagraph} style={{ marginBottom: 0 }}>
                      <em>{sectionAny.author}</em>
                    </p>
                  </div>
                )}

                {/* Side by side layout for muscular section */}
                {sectionAny.hasSideBySide && sectionAny.hasImage ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px',
                    alignItems: 'start',
                    marginBottom: '24px'
                  }}>
                    <div>
                      {sectionAny.content.split('\n\n').map((para: string, idx: number) => (
                        <p
                          key={idx}
                          className={styles.enhancedParagraph}
                          style={{
                            marginBottom: '20px',
                            lineHeight: '1.9',
                            wordSpacing: '1px'
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                    <div style={{
                      flex: '0 0 350px',
                      minWidth: '280px',
                      maxWidth: '350px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }}>
                      <img
                        src={sectionAny.image.src}
                        alt={sectionAny.image.alt}
                        style={{
                          width: '100%',
                          height: '280px',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderRadius: '8px',
                          boxShadow: resolvedTheme === 'dark'
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                            : '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Render image if it's not side-by-side but has one */}
                    {sectionAny.hasImage && !sectionAny.hasSideBySide && (
                      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                        <img
                          src={sectionAny.image.src}
                          alt={sectionAny.image.alt}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '400px',
                            borderRadius: '12px',
                            boxShadow: resolvedTheme === 'dark'
                              ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                              : '0 8px 24px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </div>
                    )}
                    {/* Regular content paragraphs */}
                    {!sectionAny.isHighlight && sectionAny.content && (
                      <>
                        {sectionAny.content.split('\n\n').map((para: string, idx: number) => (
                          <p
                            key={idx}
                            className={styles.enhancedParagraph}
                            style={{
                              marginBottom: '20px',
                              lineHeight: '1.9',
                              wordSpacing: '1px'
                            }}
                          >
                            {para}
                          </p>
                        ))}
                      </>
                    )}
                  </>
                )}

                {/* First quote box */}
                {sectionAny.hasQuote && sectionAny.quote && (
                  <div className={styles.highlightBox} style={{ marginBottom: '24px', marginTop: '24px', padding: '20px' }}>
                    <p
                      className={styles.enhancedParagraph}
                      style={{
                        fontStyle: 'italic',
                        marginBottom: '14px',
                        lineHeight: '1.8',
                        wordSpacing: '1px'
                      }}
                    >
                      "{sectionAny.quote.text}"
                    </p>
                    <p className={styles.enhancedParagraph} style={{ marginBottom: 0 }}>
                      <em>{sectionAny.quote.author}</em>
                    </p>
                  </div>
                )}

                {/* Second quote box */}
                {sectionAny.hasSecondQuote && sectionAny.secondQuote && (
                  <div className={styles.highlightBox} style={{ marginBottom: '24px', marginTop: '24px', padding: '20px' }}>
                    <p
                      className={styles.enhancedParagraph}
                      style={{
                        fontStyle: 'italic',
                        marginBottom: '14px',
                        lineHeight: '1.8',
                        wordSpacing: '1px'
                      }}
                    >
                      "{sectionAny.secondQuote.text}"
                    </p>
                    <p className={styles.enhancedParagraph} style={{ marginBottom: 0 }}>
                      <em>{sectionAny.secondQuote.author}</em>
                    </p>
                  </div>
                )}

                {/* Additional content before list */}
                {sectionAny.additionalContent && (
                  <p
                    className={styles.enhancedParagraph}
                    style={{
                      marginTop: '20px',
                      marginBottom: '14px',
                      lineHeight: '1.9',
                      wordSpacing: '1px'
                    }}
                  >
                    {sectionAny.additionalContent}
                  </p>
                )}

                {/* List items */}
                {sectionAny.listItems && (
                  <ul className={styles.resourceList} style={{ marginTop: '10px', marginBottom: '24px' }}>
                    {sectionAny.listItems.map((item: string, itemIndex: number) => (
                      <li
                        key={itemIndex}
                        className={styles.resourceListItem}
                        style={{
                          marginBottom: '12px',
                          lineHeight: '1.8'
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Subsection */}
                {sectionAny.hasSubsection && sectionAny.subsectionTitle && (
                  <div style={{ marginTop: '28px' }}>
                    <h5 className={styles.subsectionHeading} style={{
                      color: resolvedTheme === 'dark' ? '#fff' : '#333'
                    }}>
                      {sectionAny.subsectionTitle}
                    </h5>
                    {sectionAny.subsectionContent && (
                      <>
                        {sectionAny.subsectionContent.split('\n\n').map((para: string, idx: number) => (
                          <p
                            key={idx}
                            className={styles.enhancedParagraph}
                            style={{
                              marginBottom: '20px',
                              lineHeight: '1.9',
                              wordSpacing: '1px'
                            }}
                          >
                            {para}
                          </p>
                        ))}
                      </>
                    )}
                    {sectionAny.hasSubsectionImages && sectionAny.subsectionImages && (
                      <div style={{
                        marginTop: '1.5rem',
                        marginBottom: '1rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                      }}>
                        {sectionAny.subsectionImages.map((img: any, idx: number) => (
                          <div key={idx} style={{ textAlign: 'center' }}>
                            <img
                              src={img.src}
                              alt={img.alt}
                              style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '300px',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: resolvedTheme === 'dark'
                                  ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                                  : '0 4px 12px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );

            // Only wrap if section has title
            if (hasTitle) {
              return (
                <SectionAccordion
                  key={section.id}
                  title={sectionAny.title}
                  isDarkMode={resolvedTheme === 'dark'}
                  defaultOpen={false}
                >
                  {content}
                </SectionAccordion>
              );
            } else {
              return <div key={section.id} style={{ marginBottom: '24px' }}>{content}</div>;
            }
          })}
        </div>
      </div>
    </>
  )
}