"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific data arrays
const normalFunctionsData = {
  no: {
    pageTitle: "Normal funksjon",
    sections: [
      {
        id: "intro",
        hasImage: true,
        image: {
          src: "/montasjeSmerter.jpg",
          alt: "Chronic Pelvic Pain"
        },
        content: [
          "Langvarige underlivssmerter, er en vanlig tilstand som rammer både kvinner og menn. Tilstanden gir mange ulike plager i daglige aktiviteter, som for eksempel problemer med tømning av tarm/blære, smerter ved seksuell aktivitet eller ved det å sitte. Langvarige underlivssmerter er ofte lokalisert i nedre del av mage, i underlivet og i organer knyttet til underliv/bekken.",
          "Tilstanden benevnes i litteraturen som \"CPP\" som står for Chronic Pelvic Pain. Den norske oversettelsen av dette er kroniske bekkensmerter. I denne teksten bruker vi benevnelsen langvarige underlivssmerter.",
          "Ved utredning finner en ofte ikke en eksakt årsak til smertene. I mange tilfeller ser man at det som kan ha igangsatt plagene (for eksempel en infeksjon eller kirurgi) tilheler, men at smertene vedvarer. Akutte smerter oppstår når kroppen på en eller annen måte har en skade. Langvarige smerter er annerledes. Selv om opprinnelig årsak tilheler kan nye \"smertetriggere\" oppstå, for eksempel i vevet rundt der en infeksjon har vært. Dette kan skje i muskulatur og støttevev eller i organer tilknyttet bekken/underliv.",
          "Tilstanden som omtales her er en langvarig smertetilstand som ikke har en åpenbar årsak til tross for grundig utredning.",
          "Informasjonen på denne siden er utformet med tanke på voksne mennesker."
        ],
        hasHighlight: true,
        highlight: "Denne informasjonen er spesielt relevant for voksne som opplever langvarige underlivssmerter.",
        videoText: "Informasjonsfilm om smerte: Smerte forklart på fem minutt, en oversettelse gjort av Universitetssykehuset Nord Norge."
      },
      {
        id: "anatomy",
        title: "Bekkenets anatomi",
        hasImage: true,
        image: {
          src: "/jpg PPT og WEB/kvinne-bekken-inferior--tekst.jpg",
          alt: "Bekkenets anatomi med tekstbeskrivelser"
        },
        content: "Bekkenet er et komplekst kroppsområde som inneholder mange ulike strukturer som utgjør bevegelsesapparatet (eks muskler og skjelett, ledd, leddbånd/ligamenter og støttevev). Bekkenet inneholder også ytre og indre kjønnsorganene, samt tarm og blære."
      },
      {
        id: "pelvic_floor",
        title: "Bekkenbunnen",
        content: "Bekkenbunnsmusklene danner, som navnet antyder, gulvet i bekkenet. Denne samlingen av muskler gir støtte til indre organer og hjelper til med å sikre at du ikke lekker urin eller avføring."
      },
      {
        id: "normal_function",
        title: "Normal bekkenfunksjon",
        content: "Meget komplekse mekanismer, inkludert det autonome nervesystemet, sikrer normal funksjon i bekkenområdet. Bekkenbunnen skal normalt slappe av under toalettbesøk slik at du kan tømme både blære og tarm."
      },
      {
        id: "dysfunction",
        title: "Funksjonelle forstyrrelser",
        content: "Forstyrrelser i organene medfører ofte endret funksjon av muskulatur. Motsatt vil forstyrrelser i muskler kunne gi forstyrrelser av funksjonen til organene i bekkenet."
      },
      {
        id: "stress_impact",
        title: "Stress og belastning",
        content: "Ved økt belastning, som stress, kan det oppstå forstyrrelser i normalfunksjon. Spenninger i bekkenbunnen vil kunne gi smerter ved samleie, og problemer med å tømme blære og tarm."
      }
    ]
  },
  en: {
    pageTitle: "Normal Function",
    sections: [
      {
        id: "intro",
        hasImage: true,
        image: {
          src: "/montasjeSmerter.jpg",
          alt: "Chronic Pelvic Pain"
        },
        content: [
          "Chronic pelvic pain is a common condition that affects both women and men. The condition causes many different problems in daily activities, such as problems with bowel/bladder emptying, pain during sexual activity or when sitting. Chronic pelvic pain is often localized in the lower abdomen, in the pelvic area and in organs connected to the pelvis.",
          "The condition is referred to in the literature as \"CPP\" which stands for Chronic Pelvic Pain. The Norwegian translation of this is chronic pelvic pain. In this text we use the term chronic pelvic pain.",
          "During examination, an exact cause of the pain is often not found. In many cases, it is seen that what may have initiated the problems (for example an infection or surgery) heals, but the pain persists. Acute pain occurs when the body has some kind of injury. Chronic pain is different. Even though the original cause heals, new \"pain triggers\" can arise, for example in the tissue around where an infection has been. This can happen in muscle and supporting tissue or in organs connected to the pelvis.",
          "The condition discussed here is a chronic pain condition that does not have an obvious cause despite thorough examination.",
          "The information on this page is designed with adults in mind."
        ],
        hasHighlight: true,
        highlight: "This information is particularly relevant for adults who experience chronic pelvic pain.",
        videoText: "Information video about pain: Pain explained in five minutes, a translation made by University Hospital of North Norway."
      },
      {
        id: "anatomy",
        title: "Pelvic anatomy",
        hasImage: true,
        image: {
          src: "/jpg PPT og WEB/kvinne-bekken-inferior--tekst.jpg",
          alt: "Pelvic anatomy with text descriptions"
        },
        content: "The pelvis is a complex body area that contains many different structures that make up the musculoskeletal system (e.g., muscles and skeleton, joints, ligaments and supportive tissue). The pelvis also contains external and internal reproductive organs, as well as bowel and bladder."
      },
      {
        id: "pelvic_floor",
        title: "Pelvic floor",
        content: "The pelvic floor muscles form, as the name suggests, the floor of the pelvis. This collection of muscles provides support to internal organs and helps ensure that you don't leak urine or stool."
      },
      {
        id: "normal_function",
        title: "Normal pelvic function",
        content: "Very complex mechanisms, including the autonomic nervous system, ensure normal function in the pelvic area. The pelvic floor should normally relax during toilet visits so that you can empty both bladder and bowel."
      },
      {
        id: "dysfunction",
        title: "Functional disorders",
        content: "Disorders in the organs often lead to altered muscle function. Conversely, muscle disorders can cause disorders in the function of the pelvic organs."
      },
      {
        id: "stress_impact",
        title: "Stress and strain",
        content: "With increased strain, such as stress, disorders in normal function can occur. Tension in the pelvic floor can cause pain during intercourse and problems with emptying bladder and bowel."
      }
    ]
  }
} as const

export const NormalFunctions = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/inNormal.svg"
              alt="Normal Functions"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{normalFunctionsData[language].pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {normalFunctionsData[language].sections.map((section) => {
            // First section with image - show without accordion
            if ('hasImage' in section && section.hasImage) {
              return (
                <div key={section.id} className={styles.normalFunctionSection}>
                  <div className={styles.anatomyItem}>
                    <img
                      src={section.image?.src || ''}
                      alt={section.image?.alt || ''}
                      className={styles.anatomyImage}
                    />
                  </div>
                  <div className={styles.normalFunctionContent}>
                    {section.content && Array.isArray(section.content) ? (
                      section.content.map((contentText: string, contentIndex: number) => (
                        <p key={contentIndex} className={styles.enhancedParagraph}>
                          {contentText}
                        </p>
                      ))
                    ) : section.content && (
                      <p className={styles.enhancedParagraph}>
                        {section.content}
                      </p>
                    )}

                    {'hasHighlight' in section && section.hasHighlight && (
                      <div className={styles.highlightBox}>
                        <p className={styles.enhancedParagraph}>
                          <strong>{section.highlight}</strong>
                        </p>
                      </div>
                    )}

                    {'videoText' in section && section.videoText && (
                      <div className={styles.videoSection}>
                        <p className={styles.enhancedParagraph}>{section.videoText}</p>
                        <div className={styles.videoContainer}>
                          <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                            title="Smerte forklart på fem minutt"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.videoEmbed}
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            }

            // Only wrap sections with titles in accordion
            const hasTitle = 'title' in section && section.title;

            const content = (
              <>
                {(section as any).hasImage && section.id !== 'intro' && (
                  <div className={styles.anatomyItem} style={{ marginBottom: '1.5rem' }}>
                    <img
                      src={(section as any).image?.src || ''}
                      alt={(section as any).image?.alt || ''}
                      className={styles.anatomyImage}
                    />
                  </div>
                )}

                {section.content && Array.isArray(section.content) ? (
                  section.content.map((contentText: string, contentIndex: number) => (
                    <p key={contentIndex} className={styles.enhancedParagraph}>
                      {contentText}
                    </p>
                  ))
                ) : section.content && (
                  <p className={styles.enhancedParagraph}>
                    {section.content}
                  </p>
                )}

                {'hasHighlight' in section && section.hasHighlight && (
                  <div className={styles.highlightBox}>
                    <p className={styles.enhancedParagraph}>
                      <strong>{section.highlight}</strong>
                    </p>
                  </div>
                )}
              </>
            );

            // Return with accordion only if there's a title
            if (hasTitle) {
              return (
                <SectionAccordion
                  key={section.id}
                  title={section.title}
                  isDarkMode={resolvedTheme === 'dark'}
                  defaultOpen={false}
                >
                  {content}
                </SectionAccordion>
              );
            } else {
              // No title - render content without accordion
              return (
                <div key={section.id} className={styles.normalFunctionContent}>
                  {content}
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  )
}