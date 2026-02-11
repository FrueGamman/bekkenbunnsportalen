"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific data arrays
const diagnosisData = {
  no: {
    pageTitle: "Utredning",
    initialQuote: {
      text: "Jeg har vært til mange utredninger hos ulike spesialister, uten at de har funnet svar på hvorfor jeg har smertene mine.",
      author: "Kvinne, 54 år"
    },
    sections: [
    {
      id: "intro",
      hasSideBySide: true,
      content: "Det er viktig å utrede langvarige underlivssmerter for å gi rett behandling. et ledd i utredningen er å utelukke bakenforliggende sykdom eller skade som trenger spesifikk behandling. første ledd i utredning ved langvarig smerteproblematikk er ofte fastlegen. det er nyttig at du er forberedt på hvilke symptomer du bør formidle i samtalen med legen din.",
      hasImage: true,
      image: {
        src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX1691196_resize.jpg",
        alt: "Bilde av en hånd som holder en sort penn og skriver på et skjema",
        caption: ""
      }
    },
    {
      id: "preparation",
      title: "Forberedelse til legetime",
      subsectionTitle: "Tenk over følgende:",
      listItems: [
        "Når startet smertene?",
        "Hva forverrer eller bedrer smertene?",
        "Blir smertene forverret av stress?",
        "Varierer smertene i løpet av dagen, uken eller måneden?",
        "Varierer smertene ut fra syklus?",
        "Sover du godt?",
        "Har smertene endret seg over tid?",
        "Opplever du endret sensibilitet i huden som smerter, stråling, temperaturforandring?",
        "Opplever du økte smerter ellers i kroppen?",
        "Har du smerter ved samleie?",
        "Føler du deg nedstemt og urolig?",
        "Opplever du lekkasje av urin eller avføring/luft?",
        "Hvordan fungerer naturlige funksjoner som vannlating og tarmtømming?",
        "Hvilken medisinsk behandling eller kirurgiske inngrep har blitt utført?",
        "Har de hatt effekt?",
        "Hva har du gjort for å lindre smertene?",
        "Hvilke medikamenter har du tidligere brukt?",
        "Hvilken medisiner bruker du nå?",
        "Hva tror du selv er årsaken til smertene dine?",
        "Hva er du mest urolig for, hva bekymrer deg mest?"
      ],
      additionalContent: "Bekkenet har flere funksjoner. Skjelettet omslutter dine indre organer og forbinder under og overdelen av kroppen. Spenninger/dysfunksjon i en del av kroppen vil kunne påvirke andre deler av kroppen. Derfor er det like viktig å undersøke lokale forhold i bekkenet som hvordan du står og går og beveger deg. Organene i underlivet undersøkes, og legen vil kartlegge følsomhet/sensibilitet og vurdere om du har muskelspenninger."
    },
    {
      id: "examinations",
      title: "Undersøkelser",
      content: "Ut fra undersøkelse hos fastlegen kan det være aktuelt at du blir henvist videre til spesialist. Du vil da bli henvist til konsultasjon hos gastrolege, nevrolog, gynekolog eller urolog med gjennomgang av sykehistorie og undersøkelse av bekkenet.\n\nI noen tilfeller henviser spesialist til ytterligere spesialundersøkelser som for eksempel:",
      examinationLinks: [
        {
          text: "Urodynamiske undersøkelser ved blære/urinveisplager",
          linkText: "Les mer om urodynamisk undersøkelse",
          url: "https://sml.snl.no/urodynamikk"
        },
        {
          text: "Ultralyd",
          linkText: "Les mer om ultralyd",
          url: "https://sml.snl.no/ultralydunders%C3%B8kelse"
        },
        {
          text: "MR",
          linkText: "Les mer om MR",
          url: "https://sml.snl.no/MR-unders%C3%B8kelse"
        },
        {
          text: "CT",
          linkText: "Les mer om CT",
          url: "https://nhi.no/sykdommer/infeksjoner/undersokelser/ct-av-bukhulen"
        },
        {
          text: "Defekografi",
          linkText: "Les mer om defecografi",
          url: "https://sml.snl.no/defekografi"
        },
        {
          text: "Koloskopi",
          linkText: "Les mer om koloskopi",
          url: "https://nhi.no/sykdommer/kirurgi/undersokelser/koloskopi"
        },
        {
          text: "Cystoskopi/kikkertundersøkelse av urinblæren",
          linkText: "Les mer om cystoskopi",
          url: "https://sml.snl.no/cystoskopi"
        }
      ],
      closingContent: "Når fastlegen eller legespesialist konkluderer med diagnosen langvarig underlivssmerte, er dette ut fra mangelen på funn av bakenforliggende sykdom i utredningen. Smertene har vanligvis ikke et entydig opphav og ofte finner legen overfølsomhet i området, samt muskelspenninger. Behandlingen for slike tilstander vil ofte involvere flere fagprofesjoner."
    },
    {
      id: "patient_quote_1",
      hasQuote: true,
      quote: {
        text: "Jeg føler meg sikker på at det ikke er en alvorlig sykdom som ligger bak smertene, til det har jeg vært nok utredet. Samtidig er det frustrerende å ikke vite hvorfor jeg da har vondt",
        author: "Mann, 39 år"
      }
    },
    {
      id: "physiotherapy_role",
      content: "Fysioterapeut inkluderes ofte i både utredning og behandling og vil vanligvis ha et litt annet fokus enn legen har hatt. Ditt bevegelsesmønster vil bli nærmere undersøkt for å kartlegge hvordan du bruker kroppen din i det daglige og hvilke områder i kroppen som har økte eller reduserte muskelspenninger."
    },
    {
      id: "patient_quote_2",
      hasQuote: true,
      quote: {
        text: "Noen har snakket om at det kan være stress og spenninger i musklene mine som er med på å gi meg smerter, men ingen har gitt meg svaret på hvordan jeg skulle kunne endre på dette.",
        author: "Kvinne, 23 år"
      }
    },
    {
      id: "internal_exam",
      content: "I enkelte tilfeller kan fysioterapeuten utføre en innvendig undersøkelse vaginalt eller analt for å bedømme funksjon og spenningsnivå av bekkenbunnsmuskulaturen."
    }
  ]
  },
  en: {
    pageTitle: "Diagnosis",
    initialQuote: {
      text: "I have been to many examinations with various specialists, without them finding an answer to why I have my pain.",
      author: "Woman, 54 years"
    },
    sections: [
    {
      id: "intro",
      hasSideBySide: true,
      content: "It is important to investigate chronic pelvic pain to provide proper treatment. Part of the investigation is to rule out underlying disease or injury that requires specific treatment. The first step in investigating chronic pain problems is often the general practitioner. It is useful that you are prepared for which symptoms you should communicate in the conversation with your doctor.",
      hasImage: true,
      image: {
        src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX1691196_resize.jpg",
        alt: "Image of a hand holding a black pen writing on a form",
        caption: ""
      }
    },
    {
      id: "preparation",
      title: "Preparation for Doctor's Appointment",
      subsectionTitle: "Think about the following:",
      listItems: [
        "When did the pain start?",
        "What makes the pain worse or better?",
        "Does the pain worsen with stress?",
        "Does the pain vary during the day, week or month?",
        "Does the pain vary with your cycle?",
        "Do you sleep well?",
        "Has the pain changed over time?",
        "Do you experience altered skin sensitivity such as pain, radiation, temperature change?",
        "Do you experience increased pain elsewhere in the body?",
        "Do you have pain during intercourse?",
        "Do you feel depressed and anxious?",
        "Do you experience leakage of urine or stool/gas?",
        "How do natural functions such as urination and bowel movements work?",
        "What medical treatment or surgical procedures have been performed?",
        "Have they been effective?",
        "What have you done to relieve the pain?",
        "What medications have you used before?",
        "What medications do you use now?",
        "What do you think is the cause of your pain?",
        "What are you most worried about, what concerns you most?"
      ],
      additionalContent: "The pelvis has several functions. The skeleton encloses your internal organs and connects the lower and upper parts of the body. Tension/dysfunction in one part of the body can affect other parts of the body. Therefore, it is equally important to examine local conditions in the pelvis as how you stand and walk and move. The organs in the pelvis are examined, and the doctor will map sensitivity and assess whether you have muscle tension."
    },
    {
      id: "examinations",
      title: "Examinations",
      content: "Based on examination by the general practitioner, it may be relevant that you are referred to a specialist. You will then be referred for consultation with a gastroenterologist, neurologist, gynecologist or urologist with a review of medical history and examination of the pelvis.\n\nIn some cases, the specialist refers to further special examinations such as:",
      examinationLinks: [
        {
          text: "Urodynamic examinations for bladder/urinary tract problems",
          linkText: "Read more about urodynamic examination",
          url: "https://sml.snl.no/urodynamikk"
        },
        {
          text: "Ultrasound",
          linkText: "Read more about ultrasound",
          url: "https://sml.snl.no/ultralydunders%C3%B8kelse"
        },
        {
          text: "MRI",
          linkText: "Read more about MRI",
          url: "https://sml.snl.no/MR-unders%C3%B8kelse"
        },
        {
          text: "CT",
          linkText: "Read more about CT",
          url: "https://nhi.no/sykdommer/infeksjoner/undersokelser/ct-av-bukhulen"
        },
        {
          text: "Defecography",
          linkText: "Read more about defecography",
          url: "https://sml.snl.no/defekografi"
        },
        {
          text: "Colonoscopy",
          linkText: "Read more about colonoscopy",
          url: "https://nhi.no/sykdommer/kirurgi/undersokelser/koloskopi"
        },
        {
          text: "Cystoscopy/scope examination of the bladder",
          linkText: "Read more about cystoscopy",
          url: "https://sml.snl.no/cystoskopi"
        }
      ],
      closingContent: "When the general practitioner or medical specialist concludes with the diagnosis of chronic pelvic pain, this is based on the lack of findings of underlying disease in the investigation. The pain usually does not have a clear origin and often the doctor finds hypersensitivity in the area, as well as muscle tension. Treatment for such conditions will often involve several professional groups."
    },
    {
      id: "patient_quote_1",
      hasQuote: true,
      quote: {
        text: "I feel confident that there is no serious illness behind the pain, I have been examined enough for that. At the same time, it is frustrating not to know why I have pain",
        author: "Man, 39 years"
      }
    },
    {
      id: "physiotherapy_role",
      content: "A physiotherapist is often included in both examination and treatment and will usually have a slightly different focus than the doctor has had. Your movement pattern will be examined more closely to map how you use your body in daily life and which areas of the body have increased or reduced muscle tension."
    },
    {
      id: "patient_quote_2",
      hasQuote: true,
      quote: {
        text: "Some have talked about how it might be stress and tension in my muscles that contribute to giving me pain, but no one has given me the answer on how I could change this.",
        author: "Woman, 23 years"
      }
    },
    {
      id: "internal_exam",
      content: "In some cases, the physiotherapist can perform an internal examination vaginally or anally to assess the function and tension level of the pelvic floor muscles."
    }
  ]
  }
} as const

export const Diagnosis = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const { pageTitle, initialQuote, sections } = diagnosisData[language]

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          const accordionContainer = element.closest(`.${styles.accordionContainer}`) || element
          if (accordionContainer) {
            const button = accordionContainer.querySelector('button')
            if (button && button.getAttribute('aria-expanded') === 'false') {
              button.click()
            }
            setTimeout(() => {
              const offset = 100
              const elementPosition = accordionContainer.getBoundingClientRect().top + window.pageYOffset
              window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
              })
            }, 100)
          }
        }
      }
    }

    handleHashNavigation()
    window.addEventListener('hashchange', handleHashNavigation)
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  return (
    <div id="diagnosis" className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/solae.png"
            alt="Diagnosis"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        {/* Patient Quote - moved inside sectionContent */}
        {initialQuote && (
          <div className={styles.quoteContainer}>
            <blockquote className={styles.patientQuote}>
              <p className={styles.quoteText}>"{initialQuote.text}"</p>
              <cite className={styles.quoteAuthor}>— {initialQuote.author}</cite>
            </blockquote>
          </div>
        )}
        {sections.map((section) => {
          const hasTitle = 'title' in section && section.title;
          
          const content = (
            <div className={styles.normalFunctionContent}>
              {/* Handle side-by-side layout for intro section */}
              {'hasSideBySide' in section && section.hasSideBySide && 'hasImage' in section && section.hasImage && (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  gap: '30px',
                  alignItems: 'flex-start',
                  margin: '20px 0',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ 
                    flex: '1 1 300px',
                    minWidth: '300px'
                  }}>
                    <p className={styles.enhancedParagraph}>
                      {section.content}
                    </p>
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
                      src={(section as any).image.src}
                      alt={(section as any).image.alt}
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
              )}

              {/* Handle quotes */}
              {'hasQuote' in section && section.hasQuote && 'quote' in section && (
                <div className={styles.quoteContainer}>
                  <blockquote className={styles.patientQuote}>
                    <p className={styles.quoteText}>"{(section as any).quote.text}"</p>
                    <cite className={styles.quoteAuthor}>— {(section as any).quote.author}</cite>
                  </blockquote>
                </div>
              )}

              {/* Regular content (not side-by-side) */}
              {'content' in section && section.content && !('hasSideBySide' in section && section.hasSideBySide) && !('hasQuote' in section && section.hasQuote) && (
                section.content.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className={styles.enhancedParagraph}>
                    {paragraph}
                  </p>
                ))
              )}

              {'subsectionTitle' in section && section.subsectionTitle && (
                <h4 className={styles.enhancedSubheading}>
                  {section.subsectionTitle}
                </h4>
              )}

              {'listItems' in section && section.listItems && (
                <ul className={styles.resourceList}>
                  {section.listItems.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className={styles.resourceListItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {'examinationLinks' in section && (section as any).examinationLinks && (
                <ul className={styles.resourceList}>
                  {(section as any).examinationLinks.map((exam: any, examIndex: number) => (
                    <li key={examIndex} className={styles.resourceListItem}>
                      {exam.text}.{' '}
                      <a 
                        href={exam.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                          textDecoration: 'none',
                          fontWeight: '500',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        {exam.linkText}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {'additionalContent' in section && section.additionalContent && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '15px' }}>
                  {(section as any).additionalContent}
                </p>
              )}

              {'closingContent' in section && section.closingContent && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '15px' }}>
                  {(section as any).closingContent}
                </p>
              )}
            </div>
          );

          // Only wrap if section has title
          if (hasTitle) {
            return (
              <SectionAccordion 
                key={section.id}
                id={section.id}
                title={section.title}
                isDarkMode={resolvedTheme === 'dark'}
                defaultOpen={false}
              >
                {content}
              </SectionAccordion>
            );
          } else {
            // Wrap intro section in white rounded background
            if (section.id === 'intro') {
              return (
                <div key={section.id} id={section.id} className={styles.normalFunctionSection}>
                  {content}
                </div>
              );
            }
            return <div key={section.id} id={section.id}>{content}</div>;
          }
        })}
      </div>
    </div>
  )
}