"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific diagnosis data arrays
const diagnosisData = {
  no: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Utredning av underlivsplager under graviditet og etter fødsel krever en grundig vurdering av symptomer, påvirkning på dagliglivet og eventuelle risikofaktorer."
    },
    {
      id: "when_seek_help",
      title: "Når søke hjelp",
      content: [
        "Det er viktig å søke hjelp hvis plagene påvirker daglige aktiviteter, livskvalitet eller hvis du har bekymringer om symptomene dine."
      ]
    },
    {
      id: "assessment_factors",
      title: "Vurderingsfaktorer",
      listItems: [
        "Påvirkning på daglige aktiviteter",
        "Symptomets alvorlighetsgrad og varighet",
        "Tidligere medisinske tilstander",
        "Graviditets- og fødselshistorie",
        "Nåværende medikamentbruk"
      ]
    },
    {
      id: "hemorrhoid_diagnosis",
      title: "Utredning av hemoroider",
      content: [
        "Utredning av hemoroider innebærer vanligvis en grundig anamnese og fysisk undersøkelse. Det kan også være nødvendig med endoskopi for å utelukke andre tilstander."
      ],
      hasHighlightBox: true,
      highlightBox: {
        title: "Henvisning til spesialist",
        content: "Ved vedvarende eller alvorlige hemoroider bør man henvises til kirurgisk poliklinikk for videre utredning og behandling."
      }
    },
    {
      id: "thrombosed_diagnosis",
      title: "Utredning av tromboserte hemoroider",
      content: [
        "Tromboserte hemoroider krever umiddelbar medisinsk oppmerksomhet og kan kreve kirurgisk behandling."
      ],
      hasHighlightBox: true,
      highlightBox: {
        title: "Akutt henvisning",
        content: "Tromboserte hemoroider krever akutt henvisning til kirurgisk poliklinikk for umiddelbar behandling."
      }
    },
    {
      id: "exercise_assessment",
      title: "Vurdering av trening",
      content: [
        "Før man starter med bekkenbunnstrening bør man vurdere sin nåværende tilstand og eventuelle begrensninger. Det kan være nyttig å få veiledning fra fysioterapeut eller annet helsepersonell."
      ]
    },
    {
      id: "professional_evaluation",
      title: "Profesjonell vurdering",
      content: [
        "En profesjonell vurdering kan inkludere fysisk undersøkelse, symptomregistrering og eventuelt ytterligere diagnostiske tester avhengig av symptomene."
      ]
    },
    {
      id: "urinary_help",
      title: "Når og hvor søke hjelp for urinlekkasje",
      content: [
        "Dersom rådene til selvhjelp ikke gir tilfredsstillende resultat, bør man oppsøke fastlege for videre utredning og behandling. Det kreves ulik tilnærming for behandling av de ulike lekkasjeformene."
      ]
    },
    {
      id: "constipation_help",
      title: "Når og hvor søke hjelp for forstoppelse",
      content: [
        "Ved manglende effekt bør man henvises via fastlege til gastrokirurg for systematisk utredning og behandling."
      ]
    },
    {
      id: "fecal_help",
      title: "Når og hvor søke hjelp for avføringslekkasje",
      content: [
        "Henvisning til gastrokirurg via fastlege ved plagsom lekkasje av flytende eller fast avføring, 6–12 uker etter fødsel.",
        "Det finnes flere konservative tiltak som krever spesialopplæring fra helsepersonell, som for eksempel irrigasjon. Dersom slik behandling ikke fører frem, finnes ulike kirurgiske tilbud."
      ]
    },
    {
      id: "hemorrhoids_help",
      title: "Når og hvor søke hjelp for hemoroider",
      content: [
        "Henvisning via fastlege til kirurgisk poliklinikk ved vedvarende plager."
      ]
    },
    {
      id: "persistent_problems",
      hasHighlightBox: true,
      highlightBox: {
        title: "Ved vedvarende problemer",
        content: "Hvis problemene vedvarer eller forverres, er det viktig å søke profesjonell hjelp for å få riktig diagnose og behandling."
      }
    }
  ],
  en: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Assessment of pelvic floor problems during pregnancy and after childbirth requires a thorough evaluation of symptoms, impact on daily life and any risk factors."
    },
    {
      id: "when_seek_help",
      title: "When to seek help",
      content: [
        "It is important to seek help if the problems affect daily activities, quality of life or if you have concerns about your symptoms."
      ]
    },
    {
      id: "assessment_factors",
      title: "Assessment factors",
      listItems: [
        "Impact on daily activities",
        "Severity and duration of symptoms",
        "Previous medical conditions",
        "Pregnancy and childbirth history",
        "Current medication use"
      ]
    },
    {
      id: "hemorrhoid_diagnosis",
      title: "Hemorrhoid assessment",
      content: [
        "Assessment of hemorrhoids usually involves a thorough medical history and physical examination. Endoscopy may also be necessary to rule out other conditions."
      ],
      hasHighlightBox: true,
      highlightBox: {
        title: "Referral to specialist",
        content: "For persistent or severe hemorrhoids, one should be referred to a surgical outpatient clinic for further assessment and treatment."
      }
    },
    {
      id: "thrombosed_diagnosis",
      title: "Assessment of thrombosed hemorrhoids",
      content: [
        "Thrombosed hemorrhoids require immediate medical attention and may require surgical treatment."
      ],
      hasHighlightBox: true,
      highlightBox: {
        title: "Acute referral",
        content: "Thrombosed hemorrhoids require acute referral to a surgical outpatient clinic for immediate treatment."
      }
    },
    {
      id: "exercise_assessment",
      title: "Exercise assessment",
      content: [
        "Before starting pelvic floor training, one should assess their current condition and any limitations. It may be helpful to get guidance from a physiotherapist or other healthcare personnel."
      ]
    },
    {
      id: "professional_evaluation",
      title: "Professional evaluation",
      content: [
        "A professional evaluation may include physical examination, symptom registration and possibly further diagnostic tests depending on the symptoms."
      ]
    },
    {
      id: "urinary_help",
      title: "When and where to seek help for urinary incontinence",
      content: [
        "If self-help advice does not give satisfactory results, one should contact a GP for further assessment and treatment. Different approaches are required for treatment of the different forms of leakage."
      ]
    },
    {
      id: "constipation_help",
      title: "When and where to seek help for constipation",
      content: [
        "If there is no effect, one should be referred via GP to gastric surgeon for systematic investigation and treatment."
      ]
    },
    {
      id: "fecal_help",
      title: "When and where to seek help for fecal incontinence",
      content: [
        "Referral to gastric surgeon via GP for troublesome leakage of liquid or solid stool, 6–12 weeks after birth.",
        "There are several conservative measures that require specialist training from healthcare personnel, such as irrigation. If such treatment does not work, various surgical options are available."
      ]
    },
    {
      id: "hemorrhoids_help",
      title: "When and where to seek help for hemorrhoids",
      content: [
        "Referral via GP to surgical outpatient clinic for persistent problems."
      ]
    },
    {
      id: "persistent_problems",
      hasHighlightBox: true,
      highlightBox: {
        title: "For persistent problems",
        content: "If the problems persist or worsen, it is important to seek professional help to get the right diagnosis and treatment."
      }
    }
  ]
} as const

export const Diagnosis = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Helper function to render content based on item type
  const renderDiagnosisItem = (item: {
    id: string;
    title?: string;
    content?: string | readonly string[];
    isDirectText?: boolean;
    directText?: string;
    listItems?: readonly string[];
    hasHighlightBox?: boolean;
    highlightBox?: { title: string; content: string };
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
          <ul className={styles.resourceList}>
            {item.listItems.map((listItem: string, listIndex: number) => (
              <li key={listIndex} className={styles.resourceListItem}>{listItem}</li>
            ))}
          </ul>
        )}

        {/* Render highlight box */}
        {item.hasHighlightBox && item.highlightBox && (
          <div className={styles.highlightBox}>
            <h4 className={styles.enhancedSubheading}>{item.highlightBox.title}</h4>
            <p className={styles.enhancedParagraph}>{item.highlightBox.content}</p>
          </div>
        )}
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
        <h2 className={styles.sectionTitle}>{language === "no" ? "Utredning" : "Diagnosis"}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        {diagnosisData[language].map((item) => renderDiagnosisItem(item))}
      </div>
    </div>
  )
}