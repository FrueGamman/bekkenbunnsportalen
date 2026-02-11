"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific symptoms data arrays
const symptomsData = {
  no: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Under graviditet og fødsel kan det oppstå ulike symptomer og plager som påvirker bekkenbunnsfunksjonen. Det er viktig å kjenne til disse symptomene for å kunne søke riktig hjelp."
    },
    {
      id: "urinary_symptoms",
      title: "Symptomer relatert til urinlekkasje",
      hasSubsections: true,
      subsections: [
        {
          id: "stress_incontinence",
          title: "Symptomer stressinkontinens",
          listItems: [
            "Urinlekkasje i forbindelse med aktivitet (eks hoste/nys/hopp)",
            "Lekkasje under samleie",
            "Fra noen dråper urin til større mengder"
          ]
        },
        {
          id: "urge_incontinence",
          title: "Symptomer urgeinkontinens",
          listItems: [
            "Urinlekkasje",
            "Hyppig og plutselig vannlatingstrang",
            "Uimotståelig vannlatingstrang (urgency)",
            "Liten blærekapasitet",
            "Nattlig vannlating"
          ]
        }
      ]
    },
    {
      id: "bowel_symptoms",
      title: "Symptomer relatert til tarmfunksjon",
      hasSubsections: true,
      subsections: [
        {
          id: "fecal_incontinence",
          title: "Avføringslekkasje symptomer",
          listItems: [
            "Lekkasje av luft, flytende eller fast avføring",
            "Soiling (striper i undertøyet)",
            "Episoder med brå og sterk trang til avføring (hastverkslekkasje/urge)",
            "Manglende evne til å kjenne når du skal ha avføring"
          ]
        },
        {
          id: "constipation",
          title: "Forstoppelse symptomer",
          listItems: [
            "Avføringsbesvær med hard, treg, uregelmessig, ufullstendig eller sjelden avføring",
            "Oppblåsthet/luftplager",
            "Magesmerter",
            "Vanskelig å tørke seg ren"
          ]
        }
      ]
    },
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
      id: "painful_bowel",
      title: "Symptomer kronisk analfissur",
      listItems: [
        "Rift i slimhinnen i endetarmsåpningen",
        "Krampaktige smerter som kan vare fra 20 minutter og opptil flere timer etter avføring",
        "Noen ganger små blødninger",
        "Stram, smertefull lukkemuskel",
        "Ofte ses en liten hudflik i enden av såret"
      ]
    },
    {
      id: "urgency_symptoms",
      title: "Symptomer hastverkstrang",
      hasSubsections: true,
      subsections: [
        {
          id: "bowel_urgency",
          title: "Symptomer hastverkstrang for avføring",
          listItems: [
            "Sterk og plutselig trang (urgency)",
            "Kan ikke utsette avføringen i 15 minutter",
            "Redd for å lekke",
            "Vanskelig å delta på aktiviteter som før",
            "Løs avføring",
            "Lekkasje for luft eller avføring"
          ]
        },
        {
          id: "urinary_urgency",
          title: "Symptomer hastverkstrang for urin",
          listItems: [
            "Plutselig og uimotståelig vannlatingstrang (urgency)",
            "Kan ikke utsette vannlatingen",
            "Redd for å lekke",
            "Liten blærekapasitet",
            "Nattlig vannlating",
            "Lekkasje for urin",
            "Vanskelig å delta på aktiviteter som før"
          ]
        }
      ]
    },
    {
      id: "uti_symptoms",
      title: "Symptomer urinveisinfeksjon",
      listItems: [
        "Svie/smerter ved vannlating",
        "Hyppig vannlating",
        "Smerte/ubehag over blæren",
        "Blod i urinen",
        "Ryggsmerter",
        "Feber"
      ]
    },
    {
      id: "prolapse_symptoms",
      title: "Symptomer tyngdefølelse og prolaps",
      listItems: [
        "Tømmingsvansker for urin eller avføring",
        "Må trykke med en finger på bakre skjedevegg for å få ut avføringen fra endetarmen",
        "Lekkasje av urin eller avføring",
        "Utbulinger og følelse av press i skjeden"
      ]
    },
    {
      id: "infection_symptoms",
      title: "Symptomer på sårinfeksjon etter fødselsrift",
      listItems: [
        "Feber",
        "Økende smerter",
        "Hevelse, rødhet, varme, eventuelt puss",
        "Revning av sår"
      ]
    }
  ],
  en: [
    {
      id: "intro",
      isDirectText: true,
      directText: "During pregnancy and childbirth, various symptoms and problems may occur that affect pelvic floor function. It is important to be aware of these symptoms in order to seek appropriate help."
    },
    {
      id: "urinary_symptoms",
      title: "Symptoms related to urinary incontinence",
      hasSubsections: true,
      subsections: [
        {
          id: "stress_incontinence",
          title: "Stress incontinence symptoms",
          listItems: [
            "Urinary leakage during activity (e.g., coughing/sneezing/jumping)",
            "Leakage during intercourse",
            "From a few drops of urine to larger amounts"
          ]
        },
        {
          id: "urge_incontinence",
          title: "Urge incontinence symptoms",
          listItems: [
            "Urinary leakage",
            "Frequent and sudden urge to urinate",
            "Irresistible urge to urinate (urgency)",
            "Small bladder capacity",
            "Nighttime urination"
          ]
        }
      ]
    },
    {
      id: "bowel_symptoms",
      title: "Symptoms related to bowel function",
      hasSubsections: true,
      subsections: [
        {
          id: "fecal_incontinence",
          title: "Fecal incontinence symptoms",
          listItems: [
            "Leakage of gas, liquid or solid stool",
            "Soiling (streaks in underwear)",
            "Episodes of sudden and strong urge to defecate (urgency incontinence)",
            "Inability to sense when you need to have a bowel movement"
          ]
        },
        {
          id: "constipation",
          title: "Constipation symptoms",
          listItems: [
            "Bowel difficulties with hard, slow, irregular, incomplete or infrequent bowel movements",
            "Bloating/gas problems",
            "Abdominal pain",
            "Difficult to wipe clean"
          ]
        }
      ]
    },
    {
      id: "hemorrhoid_symptoms",
      title: "Hemorrhoid symptoms",
      listItems: [
        "Visible blood on toilet paper or in stool",
        "Irritation/itching in the rectum",
        "Pain in the rectum, especially during bowel movements",
        "Feeling of heaviness",
        "May have visible protrusion",
        "Feeling of incomplete evacuation",
        "Difficult to wipe clean"
      ]
    },
    {
      id: "painful_bowel",
      title: "Chronic anal fissure symptoms",
      listItems: [
        "Tear in the mucous membrane of the anal opening",
        "Spasmodic pain that can last from 20 minutes to several hours after bowel movement",
        "Sometimes small bleeding",
        "Tight, painful sphincter muscle",
        "Often a small skin tag is seen at the end of the wound"
      ]
    },
    {
      id: "urgency_symptoms",
      title: "Urgency symptoms",
      hasSubsections: true,
      subsections: [
        {
          id: "bowel_urgency",
          title: "Bowel urgency symptoms",
          listItems: [
            "Strong and sudden urge (urgency)",
            "Cannot delay bowel movement for 15 minutes",
            "Afraid of leaking",
            "Difficult to participate in activities as before",
            "Loose stool",
            "Leakage of gas or stool"
          ]
        },
        {
          id: "urinary_urgency",
          title: "Urinary urgency symptoms",
          listItems: [
            "Sudden and irresistible urge to urinate (urgency)",
            "Cannot delay urination",
            "Afraid of leaking",
            "Small bladder capacity",
            "Nighttime urination",
            "Urinary leakage",
            "Difficult to participate in activities as before"
          ]
        }
      ]
    },
    {
      id: "uti_symptoms",
      title: "Urinary tract infection symptoms",
      listItems: [
        "Burning/pain when urinating",
        "Frequent urination",
        "Pain/discomfort over the bladder",
        "Blood in urine",
        "Back pain",
        "Fever"
      ]
    },
    {
      id: "prolapse_symptoms",
      title: "Heaviness and prolapse symptoms",
      listItems: [
        "Difficulty emptying bladder or bowel",
        "Must press with a finger on the back vaginal wall to get stool out from the rectum",
        "Urinary or fecal leakage",
        "Bulges and feeling of pressure in the vagina"
      ]
    },
    {
      id: "infection_symptoms",
      title: "Wound infection symptoms after perineal tear",
      listItems: [
        "Fever",
        "Increasing pain",
        "Swelling, redness, warmth, possibly pus",
        "Wound dehiscence"
      ]
    }
  ]
} as const

export const Symptoms = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const renderSymptomItem = (item: {
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
    hasHighlightBox?: boolean;
    highlightBox?: { title: string; content: string };
    listItems?: readonly string[];
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

        {/* Render direct list items */}
        {item.listItems && (
          <ul className={styles.resourceList}>
            {item.listItems.map((listItem: string, listIndex: number) => (
              <li key={listIndex} className={styles.resourceListItem}>{listItem}</li>
            ))}
          </ul>
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
              <ul className={styles.resourceList}>
                {subsection.listItems.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className={styles.resourceListItem}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

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
        // Find the accordion with this ID
        const element = document.getElementById(hash)
        if (element) {
          // Check if it's a SectionAccordion
          const accordionContainer = element.closest(`.${styles.accordionContainer}`) || element
          if (accordionContainer) {
            // Find the button to open the accordion
            const button = accordionContainer.querySelector('button')
            if (button && button.getAttribute('aria-expanded') === 'false') {
              button.click() // Open the accordion
            }
            
            // Scroll to the element
            setTimeout(() => {
              const offset = 100 // Account for sticky header
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

    // Handle initial load
    handleHashNavigation()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation)
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  return (
    <>
      <div id="symptoms" className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/inSymptoms.png"
              alt="Symptoms"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{language === "no" ? "Symptomer" : "Symptoms"}</h2>
        </div>
        
        <div className={styles.sectionContent}>
          {symptomsData[language].map((item) => renderSymptomItem(item))}
        </div>
      </div>
    </>
  )
}
