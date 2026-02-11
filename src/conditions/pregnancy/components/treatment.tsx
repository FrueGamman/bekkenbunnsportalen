"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific treatment data arrays
const treatmentData = {
  no: [
    {
      id: "intro",
      content: [
        "Læreboken inneholder informasjon om normalfunksjoner, symptomer på problemer, utredning og behandling av ulike underlivsplager og funksjonsforstyrrelser. Med denne informasjonen ønsker vi å formidle kunnskap og åpenhet rundt ulike underlivsplager under graviditet og etter fødsel, slik at flere kan søke hjelp om det oppstår utfordringer.",
        "De fleste endringer man opplever i underlivet er både normale og forventet. Noen av plagene og problemene vet vi det knytter seg noen spørsmål til, spesielt omkring vannlatning og avføring. Det er fint å ta dette opp med din jordmor og/eller fastlege både i svangerskapet og etter fødselen, og også ved barselavdelingen/sykehuset ved utreise."
      ]
    },
    {
      id: "anatomy_function",
      title: "Anatomi og funksjon",
      content: [
        "Bekkenet inneholder mange ulike strukturer som utgjør en del av bevegelsesapparatet som muskler, skjelett, ledd, leddbånd/ligamenter og bindevev. Bekkenet inneholder også ytre og indre kjønnsorganer, blære og tarm. Alle strukturer i bekkenet styres av nerver med utspring fra ryggmargen.",
        "Bekkenbunnsmuskulaturen, også omtalt som bekkenbunnen, utgjør gulvet i kroppen. Den omslutter skjede, urinrør og endetarm, og gir støtte og stabilisering av underlivsorganene. Bekkenbunnen bidrar til kontroll over urin og avføring. Den trekker seg reflektorisk raskt og effektivt sammen rundt urinrør, skjede og endetarm ved hosting, nysing, hopp og løfting."
      ]
    },
    {
      id: "pelvic_floor_training",
      title: "Bekkenbunnstrening",
      hasImage: true,
      image: {
        src: "/pelvic_floor_training.png",
        alt: "Bekkenbunnstrening",
        caption: "Bekkenbunnstrening"
      },
      content: [
        "Bekkenbunnstrening er en viktig del av behandlingen for underlivsplager. Det er viktig å lære seg riktig teknikk og å være konsistent med øvelsene."
      ],
      hasSubsections: true,
      subsections: [
        {
          id: "how_to_do_training",
          title: "Hvordan utføre bekkenbunnstrening",
          listItems: [
            "Klem sammen rundt urinrør, skjede og endetarm som om du holder tilbake urin og avføring",
            "Hold sammentrekningen i 5-10 sekunder",
            "Slapp av helt i 5-10 sekunder",
            "Gjenta 8-12 ganger, 3 ganger daglig",
            "Pust normalt under øvelsene"
          ]
        },
        {
          id: "training_benefits",
          title: "Viktighet av bekkenbunnstrening",
          content: [
            "Bekkenbunnstrening kan hjelpe med å forhindre og behandle urinlekkasje, avføringslekkasje og andre underlivsplager. Det er spesielt viktig under og etter graviditet."
          ]
        }
      ]
    },
    {
      id: "after_birth",
      title: "Etter fødsel",
      hasImage: true,
      image: {
        src: "/postpartum_exercise.png",
        alt: "Postpartum Exercise",
        caption: "Postpartum Exercise"
      },
      content: [
        "Etter fødsel er det viktig å gradvis gjenoppta bekkenbunnstrening. Start med milde øvelser og øk intensiteten gradvis.",
        "Det kan ta tid før bekkenbunnen gjenoppretter sin styrke og funksjon etter fødsel. Vær tålmodig og konsistent med treningen."
      ]
    },
    {
      id: "hemorrhoid_treatment",
      title: "Behandling av hemoroider",
      hasImage: true,
      image: {
        src: "/hemorrhoid_treatment.png",
        alt: "Hemorrhoid Treatment",
        caption: "Hemorrhoid Treatment"
      },
      hasSubsections: true,
      subsections: [
        {
          id: "self_help",
          title: "Råd til selvhjelp",
          listItems: [
            "Unngå å presse ved toalettbesøk",
            "Regulere avføringskonsistens",
            "Lokal behandling med reseptfri salve"
          ]
        },
        {
          id: "thrombosed_treatment",
          title: "Behandling av tromboserte hemoroider",
          listItems: [
            "Kald kompress for å redusere hevelse",
            "Smertebehandling med reseptfri medikamenter",
            "Henvisning til lege ved alvorlige tilfeller"
          ]
        }
      ]
    },
    {
      id: "treatment_limitations",
      title: "Begrensninger i behandling",
      content: [
        "Noen tilstander kan kreve mer spesialisert behandling enn det som kan gjøres hjemme. Det er viktig å søke profesjonell hjelp hvis problemene vedvarer eller forverres."
      ]
    },
    {
      id: "pelvic_tension",
      title: "Bekkenbunnsspenning",
      content: [
        "Noen kvinner kan oppleve for mye spenning i bekkenbunnen, noe som kan føre til smerter og problemer med seksualfunksjon.",
        "Dette kan kreve spesialisert behandling fra fysioterapeut eller annet helsepersonell med kunnskap om bekkenbunnsproblemer."
      ]
    }
  ],
  en: [
    {
      id: "intro",
      content: [
        "The textbook contains information about normal functions, symptoms of problems, assessment and treatment of various pelvic floor problems and functional disorders. With this information, we want to communicate knowledge and openness about various pelvic floor problems during pregnancy and after childbirth, so that more people can seek help if challenges arise.",
        "Most changes experienced in the pelvic area are both normal and expected. Some of the problems and issues we know are associated with some questions, especially about urination and bowel movements. It's good to discuss this with your midwife and/or GP both during pregnancy and after birth, and also at the maternity ward/hospital upon discharge."
      ]
    },
    {
      id: "anatomy_function",
      title: "Anatomy and function",
      content: [
        "The pelvis contains many different structures that form part of the musculoskeletal system such as muscles, skeleton, joints, ligaments and connective tissue. The pelvis also contains external and internal reproductive organs, bladder and intestines. All structures in the pelvis are controlled by nerves originating from the spinal cord.",
        "The pelvic floor muscles, also referred to as the pelvic floor, form the floor of the body. It surrounds the vagina, urethra and rectum, and provides support and stabilization of the pelvic organs. The pelvic floor contributes to control over urine and stool. It contracts reflexively quickly and effectively around the urethra, vagina and rectum during coughing, sneezing, jumping and lifting."
      ]
    },
    {
      id: "pelvic_floor_training",
      title: "Pelvic floor training",
      hasImage: true,
      image: {
        src: "/pelvic_floor_training.png",
        alt: "Pelvic Floor Training",
        caption: "Pelvic Floor Training"
      },
      content: [
        "Pelvic floor training is an important part of treatment for pelvic floor problems. It is important to learn the correct technique and to be consistent with the exercises."
      ],
      hasSubsections: true,
      subsections: [
        {
          id: "how_to_do_training",
          title: "How to perform pelvic floor training",
          listItems: [
            "Squeeze around the urethra, vagina and rectum as if you are holding back urine and stool",
            "Hold the contraction for 5-10 seconds",
            "Relax completely for 5-10 seconds",
            "Repeat 8-12 times, 3 times daily",
            "Breathe normally during the exercises"
          ]
        },
        {
          id: "training_benefits",
          title: "Importance of pelvic floor training",
          content: [
            "Pelvic floor training can help prevent and treat urinary incontinence, fecal incontinence and other pelvic floor problems. It is particularly important during and after pregnancy."
          ]
        }
      ]
    },
    {
      id: "after_birth",
      title: "After birth",
      hasImage: true,
      image: {
        src: "/postpartum_exercise.png",
        alt: "Postpartum Exercise",
        caption: "Postpartum Exercise"
      },
      content: [
        "After birth, it is important to gradually resume pelvic floor training. Start with gentle exercises and gradually increase the intensity.",
        "It may take time for the pelvic floor to restore its strength and function after birth. Be patient and consistent with the training."
      ]
    },
    {
      id: "hemorrhoid_treatment",
      title: "Hemorrhoid treatment",
      hasImage: true,
      image: {
        src: "/hemorrhoid_treatment.png",
        alt: "Hemorrhoid Treatment",
        caption: "Hemorrhoid Treatment"
      },
      hasSubsections: true,
      subsections: [
        {
          id: "self_help",
          title: "Self-help advice",
          listItems: [
            "Avoid straining during toilet visits",
            "Regulate stool consistency",
            "Local treatment with over-the-counter ointment"
          ]
        },
        {
          id: "thrombosed_treatment",
          title: "Treatment of thrombosed hemorrhoids",
          listItems: [
            "Cold compress to reduce swelling",
            "Pain treatment with over-the-counter medications",
            "Referral to doctor for severe cases"
          ]
        }
      ]
    },
    {
      id: "treatment_limitations",
      title: "Treatment limitations",
      content: [
        "Some conditions may require more specialized treatment than what can be done at home. It is important to seek professional help if the problems persist or worsen."
      ]
    },
    {
      id: "pelvic_tension",
      title: "Pelvic floor tension",
      content: [
        "Some women may experience too much tension in the pelvic floor, which can lead to pain and problems with sexual function.",
        "This may require specialized treatment from a physiotherapist or other healthcare personnel with knowledge of pelvic floor problems."
      ]
    }
  ]
} as const

export const Treatment = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Helper function to render content based on item type
  const renderTreatmentItem = (item: {
    id: string;
    title?: string;
    content?: string | readonly string[];
    isDirectText?: boolean;
    directText?: string;
    hasSubsections?: boolean;
    subsections?: ReadonlyArray<{
      id: string;
      title: string;
      content?: string | readonly string[];
      listItems?: readonly string[];
    }>;
    hasImage?: boolean;
    image?: { src: string; alt: string; caption: string };
  }) => {
    const hasTitle = item.title;
    
    const content = (
      <div className={styles.normalFunctionContent}>
        {item.content && Array.isArray(item.content) ? (
          item.content.map((contentText: string, contentIndex: number) => (
            <p key={contentIndex} className={styles.enhancedParagraph}>
              {contentText}
            </p>
          ))
        ) : item.content && (
          <p className={styles.enhancedParagraph}>{item.content}</p>
        )}

        {/* Render image */}
        {item.hasImage && item.image && (
          <div className={styles.anatomySection}>
            <div className={styles.anatomyGrid}>
              <div className={styles.anatomyItem}>
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className={styles.anatomyImage}
                />
                <p className={styles.anatomyCaption}>{item.image.caption}</p>
              </div>
            </div>
          </div>
        )}

        {/* Render subsections */}
        {item.hasSubsections && item.subsections && item.subsections.map((subsection: {
          id: string;
          title: string;
          content?: string | readonly string[];
          listItems?: readonly string[];
        }) => (
          <div key={subsection.id}>
            <h4 className={styles.enhancedSubheading}>{subsection.title}</h4>
            
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
    <div id="treatment" className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/treat.png"
            alt="Treatment"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{language === "no" ? "Behandling" : "Treatment"}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        {treatmentData[language].map((item) => renderTreatmentItem(item))}
      </div>
    </div>
  )
}