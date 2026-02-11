"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific causes data arrays
const causesData = {
  no: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Under graviditet og fødsel skjer det endringer i bekkenbunnen som kan påvirke naturlige funksjoner som vannlatning, avføring og seksualfunksjon."
    },
    {
      id: "general_info",
      content: [
        "De fleste endringene er vanlige og vil normalisere seg selv. Noen endringer kan oppleves plagsomme og trenger en mer aktiv tilnærming, enten igjennom tiltak du kan gjøre selv eller gjennom oppfølging av helsevesenet. Dersom plagene går ut over daglige gjøremål og livskvalitet bør du søke hjelp. På disse sidene finnes oversikt over vanlige plager, råd og behandling.",
        "Læreboken inneholder utfyllende og samlet informasjon."
      ]
    },
    {
      id: "common_complaints",
      title: "Vanlige plager etter fødsel",
      hasSubsections: true,
      subsections: [
        {
          id: "fecal_incontinence",
          title: "Avføringslekkasje",
          content: [
            "Endret avføringsmønster og problemer med å kontrollere luftavgang er ikke uvanlig de første 3 måneder etter fødsel."
          ],
          listItems: [
            "Ved luftlekkasje de første ukene etter fødsel vil som regel bekkenbunnstrening være god behandling",
            "Det er ikke normalt å ha lekkasje av avføring etter fødsel"
          ],
          hasSubSubsections: true,
          subSubsections: [
            {
              id: "symptoms",
              title: "Symptomer",
              listItems: [
                "Lekkasje av luft, flytende eller fast avføring",
                "Soiling (striper i undertøyet)",
                "Episoder med brå og sterk trang til avføring (hastverkslekkasje/urge)",
                "Manglende evne til å kjenne når du skal ha avføring"
              ]
            },
            {
              id: "self_help",
              title: "Råd til selvhjelp",
              listItems: [
                "Bekkenbunnstrening",
                "Regulere avføringskonsistens",
                "Assistert tømming med ballongsprøyte"
              ]
            },
            {
              id: "when_seek_help",
              title: "Når og hvor søke hjelp?",
              content: [
                "Henvisning til gastrokirurg via fastlege ved plagsom lekkasje av flytende eller fast avføring, 6–12 uker etter fødsel.",
                "Det finnes flere konservative tiltak som krever spesialopplæring fra helsepersonell, som for eksempel irrigasjon. Dersom slik behandling ikke fører frem, finnes ulike kirurgiske tilbud."
              ]
            }
          ]
        },
        {
          id: "constipation",
          title: "Forstoppelse",
          content: [
            "Rett etter fødsel er det vanlig med hard og smertefull avføring. Dersom smerte rundt endetarmsåpningen er hovedproblemet kan man forsøke:"
          ],
          listItems: [
            "hånddusj med lunket vann mot underlivet under avføring",
            "å smøre lokalbedøvelse som Xylocain-salve mot endetarmsåpningen før avføring"
          ],
          hasSubSubsections: true,
          subSubsections: [
            {
              id: "constipation_symptoms",
              title: "Symptomer",
              listItems: [
                "Avføringsbesvær med hard, treg, uregelmessig, ufullstendig eller sjelden avføring",
                "Oppblåsthet/luftplager",
                "Magesmerter",
                "Vanskelig å tørke seg ren"
              ]
            },
            {
              id: "constipation_self_help",
              title: "Råd til selvhjelp",
              listItems: [
                "Gode dovaner, ikke utsett avføring",
                "Fysisk aktivitet",
                "Husk amming krever høyere væskeinntak",
                "Regulere avføringskonsistens. Legemidler som kan brukes for å mykgjøre avføringen er for eksempel Laktulose eller Movicol",
                "Klyster (mini-, olje- eller saltvannsklyster)",
                "Assistert tarmtømming som ballongssprøyte størrelse 10"
              ]
            },
            {
              id: "constipation_help",
              title: "Når og hvor søke hjelp?",
              content: [
                "Ved manglende effekt bør man henvises via fastlege til gastrokirurg for systematisk utredning og behandling."
              ]
            }
          ]
        },
        {
          id: "hemorrhoids",
          title: "Hemoroider",
          content: [
            "Det finnes to typer hemoroider, indre og ytre:"
          ],
          listItems: [
            "Indre hemorider kommer fra øvre del av endetarmen",
            "Ytre hemoroider kommer fra utsiden av endetarmsåpningen",
            "Ved usikkerhet om hva blødning fra endetarm eller i avføring skyldes skal lege alltid kontaktes"
          ],
          hasSubSubsections: true,
          subSubsections: [
            {
              id: "hemorrhoid_symptoms",
              title: "Symptomer hemoroider",
              listItems: [
                "Synlig blod på toalettpapiret eller i avføringen",
                "Irritasjon/kløe i endetarmen",
                "Smerter i endetarmen, spesielt under avføring",
                "Tyngdefornemmelse",
                "Kan være synlig utposning",
                "Følelse av ufullstending tømming",
                "Vanskelig å tørke seg rein"
              ]
            },
            {
              id: "hemorrhoid_self_help",
              title: "Råd til selvhjelp",
              listItems: [
                "Unngå å presse ved toalettbesøk",
                "Regulere avføringskonsistens",
                "Lokal behandling i 3–4 uker med reseptfri kortisonholdig salve, Sheriproct"
              ]
            },
            {
              id: "hemorrhoid_help",
              title: "Når og hvor søke hjelp?",
              content: [
                "Henvisning via fastlege til kirurgisk poliklinikk ved vedvarende plager."
              ]
            }
          ]
        }
      ]
    }
  ],
  en: [
    {
      id: "intro",
      isDirectText: true,
      directText: "During pregnancy and childbirth, changes occur in the pelvic floor that can affect natural functions such as urination, bowel movements, and sexual function."
    },
    {
      id: "general_info",
      content: [
        "Most changes are common and will normalize themselves. Some changes can be experienced as troublesome and need a more active approach, either through measures you can do yourself or through follow-up by the health service. If the problems affect daily activities and quality of life, you should seek help. These pages provide an overview of common problems, advice and treatment.",
        "The textbook contains comprehensive and collected information."
      ]
    },
    {
      id: "common_complaints",
      title: "Common complaints after birth",
      hasSubsections: true,
      subsections: [
        {
          id: "fecal_incontinence",
          title: "Fecal incontinence",
          content: [
            "Changed bowel patterns and problems controlling gas are not uncommon in the first 3 months after birth."
          ],
          listItems: [
            "For gas leakage in the first weeks after birth, pelvic floor training will usually be good treatment",
            "It is not normal to have fecal leakage after birth"
          ],
          hasSubSubsections: true,
          subSubsections: [
            {
              id: "symptoms",
              title: "Symptoms",
              listItems: [
                "Leakage of gas, liquid or solid stool",
                "Soiling (streaks in underwear)",
                "Episodes of sudden and strong urge to defecate (urgency leakage/urge)",
                "Inability to sense when you need to have a bowel movement"
              ]
            },
            {
              id: "self_help",
              title: "Self-help advice",
              listItems: [
                "Pelvic floor training",
                "Regulate stool consistency",
                "Assisted emptying with balloon syringe"
              ]
            },
            {
              id: "when_seek_help",
              title: "When and where to seek help?",
              content: [
                "Referral to gastric surgeon via GP for troublesome leakage of liquid or solid stool, 6–12 weeks after birth.",
                "There are several conservative measures that require specialist training from healthcare personnel, such as irrigation. If such treatment does not work, various surgical options are available."
              ]
            }
          ]
        },
        {
          id: "constipation",
          title: "Constipation",
          content: [
            "Right after birth, hard and painful bowel movements are common. If pain around the anal opening is the main problem, you can try:"
          ],
          listItems: [
            "hand shower with lukewarm water against the abdomen during bowel movements",
            "applying local anesthetic such as Xylocaine ointment to the anal opening before bowel movements"
          ],
          hasSubSubsections: true,
          subSubsections: [
            {
              id: "constipation_symptoms",
              title: "Symptoms",
              listItems: [
                "Bowel difficulties with hard, slow, irregular, incomplete or infrequent bowel movements",
                "Bloating/gas problems",
                "Stomach pain",
                "Difficult to wipe clean"
              ]
            },
            {
              id: "constipation_self_help",
              title: "Self-help advice",
              listItems: [
                "Good toilet habits, don't postpone bowel movements",
                "Physical activity",
                "Remember breastfeeding requires higher fluid intake",
                "Regulate stool consistency. Medications that can be used to soften stool include Lactulose or Movicol",
                "Enemas (mini, oil or saline enemas)",
                "Assisted bowel emptying such as balloon syringe size 10"
              ]
            },
            {
              id: "constipation_help",
              title: "When and where to seek help?",
              content: [
                "If there is no effect, one should be referred via GP to gastric surgeon for systematic investigation and treatment."
              ]
            }
          ]
        },
        {
          id: "hemorrhoids",
          title: "Hemorrhoids",
          content: [
            "There are two types of hemorrhoids, internal and external:"
          ],
          listItems: [
            "Internal hemorrhoids come from the upper part of the rectum",
            "External hemorrhoids come from outside the anal opening",
            "If unsure about what bleeding from the rectum or in stool is caused by, a doctor should always be contacted"
          ],
          hasSubSubsections: true,
          subSubsections: [
            {
              id: "hemorrhoid_symptoms",
              title: "Hemorrhoid symptoms",
              listItems: [
                "Visible blood on toilet paper or in stool",
                "Irritation/itching in the rectum",
                "Pain in the rectum, especially during bowel movements",
                "Feeling of heaviness",
                "May be visible bulging",
                "Feeling of incomplete emptying",
                "Difficult to wipe clean"
              ]
            },
            {
              id: "hemorrhoid_self_help",
              title: "Self-help advice",
              listItems: [
                "Avoid straining during toilet visits",
                "Regulate stool consistency",
                "Local treatment for 3–4 weeks with over-the-counter cortisone ointment, Sheriproct"
              ]
            },
            {
              id: "hemorrhoid_help",
              title: "When and where to seek help?",
              content: [
                "Referral via GP to surgical outpatient clinic for persistent problems."
              ]
            }
          ]
        }
      ]
    }
  ]
} as const

export const Causes = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Helper function to render content based on item type
  const renderCauseItem = (item: {
    id: string;
    title?: string;
    content?: string | readonly string[];
    isDirectText?: boolean;
    directText?: string;
    hasSubsections?: boolean;
    listItems?: readonly string[];
    subsections?: ReadonlyArray<{
      id: string;
      title: string;
      content?: string | readonly string[];
      hasSubSubsections?: boolean;
      subSubsections?: ReadonlyArray<{
        id: string;
        title: string;
        content?: string | readonly string[];
        listItems?: readonly string[];
      }>;
      listItems?: readonly string[];
    }>;
  }) => {
    const hasTitle = item.title;
    
    const content = (
      <div className={styles.normalFunctionContent}>
        {item.isDirectText ? (
          <p className={styles.enhancedParagraph}>{item.directText}</p>
        ) : item.content && Array.isArray(item.content) ? (
          item.content.map((contentText: string, contentIndex: number) => (
            <p key={contentIndex} className={styles.enhancedParagraph}>
              {contentText}
            </p>
          ))
        ) : item.content && (
          <p className={styles.enhancedParagraph}>{item.content}</p>
        )}

        {/* Render list items */}
        {item.listItems && (
          <ul className={styles.diagnosisList}>
            {item.listItems.map((listItem: string, listIndex: number) => (
              <li key={listIndex}>{listItem}</li>
            ))}
          </ul>
        )}

        {/* Render subsections */}
        {item.hasSubsections && item.subsections && item.subsections.map((subsection: {
          id: string;
          title: string;
          content?: string | readonly string[];
          hasSubSubsections?: boolean;
          subSubsections?: ReadonlyArray<{
            id: string;
            title: string;
            content?: string | readonly string[];
            listItems?: readonly string[];
          }>;
          listItems?: readonly string[];
        }) => (
          <div key={subsection.id} className={styles.normalFunctionSection}>
            <h4 className={styles.enhancedSubheading}>{subsection.title}</h4>
            <div className={styles.normalFunctionContent}>
                {subsection.content && Array.isArray(subsection.content) ? (
                  subsection.content.map((text: string, textIndex: number) => (
                    <p key={textIndex} className={styles.enhancedParagraph}>{text}</p>
                  ))
                ) : subsection.content && (
                  <p className={styles.enhancedParagraph}>{subsection.content}</p>
                )}

                {subsection.listItems && (
                  <ul className={styles.diagnosisList}>
                    {subsection.listItems.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Render sub-subsections */}
                {subsection.hasSubSubsections && subsection.subSubsections && subsection.subSubsections.map((subSubsection: {
                  id: string;
                  title: string;
                  content?: string | readonly string[];
                  listItems?: readonly string[];
                }) => (
                  <div key={subSubsection.id}>
                    <h5 className={styles.enhancedSubheading}>{subSubsection.title}</h5>
                    
                    {subSubsection.content && Array.isArray(subSubsection.content) ? (
                      subSubsection.content.map((text: string, textIndex: number) => (
                        <p key={textIndex} className={styles.enhancedParagraph}>{text}</p>
                      ))
                    ) : subSubsection.content && (
                      <p className={styles.enhancedParagraph}>{subSubsection.content}</p>
                    )}

                    {subSubsection.listItems && (
                      <ul className={styles.diagnosisList}>
                        {subSubsection.listItems.map((item: string, itemIndex: number) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    );

    // Only wrap if section has title
    if (hasTitle) {
      return (
        <SectionAccordion
          key={item.id}
          id={item.id}
          title={item.title!}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          {content}
        </SectionAccordion>
      );
    } else {
      return <div key={item.id} id={item.id}>{content}</div>;
    }
  }

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
    <>
      <div id="causes" className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/couse.png"
              alt="Causes"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{language === "no" ? "Årsaker" : "Causes"}</h2>
        </div>
        
        <div className={styles.sectionContent}>
          {causesData[language].map((item) => renderCauseItem(item))}
        </div>
      </div>
    </>
  )
}