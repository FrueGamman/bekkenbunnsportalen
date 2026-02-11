// src/conditions/constipation/components/normal-functions.tsx
"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

const NORMAL_FUNCTIONS_DATA = {
  no: {
    pageTitle: "Funksjon",
    intro: "På disse sidene finner du informasjon om tømmingsproblemer for avføring og forstoppelse. Her er informasjon om symptomer på, utredning og behandling av slike plager.  Kanskje har du slike problemer selv, eller du kjenner noen som er rammet.",
    bowelFunctionTitle: "Normal tarmfunksjon",
    bowelFunctionDesc: "Normal tarmfunksjon innebærer regelmessig og komplett tømming av tarmen uten ubehag eller anstrengelse. Tarminnholdet beveger seg normalt gjennom fordøyelsessystemet.",
    frequencyTitle: "Normal frekvens",
    frequencyDesc: "Normal avføringsfrekvens varierer fra person til person, men ligger vanligvis mellom tre ganger daglig til tre ganger ukentlig.",
    evacuationTitle: "Normal tømming",
    evacuationDesc: "En normal tarmtømming skal føles komplett, uten behov for pressing eller manuell hjelp. Avføringen skal være lett å passere.",
    consistencyTitle: "Normal konsistens",
    consistencyDesc: "Normal avføringskonsistens tilsvarer type 3-4 på Bristol-skalaen, som er formet og myk.",
    peristalsisTitle: "Normal peristaltikk",
    peristalsisDesc: "Peristaltikk er tarmens rytmiske sammentrekninger som driver innholdet fremover. Normal peristaltikk sikrer jevn transport gjennom tarmen.",
    anatomyAlt: "Normal tarmfunksjon og anatomi",
    anatomyCaption: "Illustrasjon av normal tarmfunksjon og anatomi"
  },
  en: {
    pageTitle: "Normal Functions",
    intro: "On these pages you will find information about bowel emptying problems and constipation. Here is information about symptoms, assessment and treatment of such problems. Maybe you have such problems yourself, or you know someone who is affected.",
    bowelFunctionTitle: "Normal Bowel Function",
    bowelFunctionDesc: "Normal bowel function involves regular and complete emptying of the bowel without discomfort or straining. Bowel contents move normally through the digestive system.",
    frequencyTitle: "Normal Frequency",
    frequencyDesc: "Normal bowel frequency varies from person to person, but usually ranges from three times daily to three times weekly.",
    evacuationTitle: "Normal Evacuation",
    evacuationDesc: "A normal bowel movement should feel complete, without the need for straining or manual assistance. Stool should be easy to pass.",
    consistencyTitle: "Normal Consistency",
    consistencyDesc: "Normal stool consistency corresponds to type 3-4 on the Bristol scale, which is formed and soft.",
    peristalsisTitle: "Normal Peristalsis",
    peristalsisDesc: "Peristalsis is the bowel's rhythmic contractions that propel contents forward. Normal peristalsis ensures smooth transport through the intestine.",
    anatomyAlt: "Normal bowel function and anatomy",
    anatomyCaption: "Illustration of normal bowel function and anatomy"
  }
} as const

export const NormalFunctions = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = NORMAL_FUNCTIONS_DATA[language]

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
        <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.intro}</p>
          </div>
        </div>

        {/* Modern Card Design - Text Left, Image Right */}
        <SectionAccordion 
          title={data.bowelFunctionTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{data.bowelFunctionDesc}</p>
          <div className={styles.anatomySection}>
            <div className={styles.anatomyGrid}>
              <div className={styles.anatomyItem}>
                <img 
                  src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX9432678-300x300.jpg" 
                  alt={data.anatomyAlt}
                  className={styles.anatomyImage}
                />
                <p className={styles.anatomyCaption}>
                  {data.anatomyCaption}
                </p>
              </div>
            </div>
          </div>
        </SectionAccordion>
        
        <SectionAccordion 
          title={data.frequencyTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{data.frequencyDesc}</p>
        </SectionAccordion>

        <SectionAccordion 
          title={data.evacuationTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{data.evacuationDesc}</p>
        </SectionAccordion>
        
        <SectionAccordion 
          title={data.consistencyTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{data.consistencyDesc}</p>
        </SectionAccordion>

        <SectionAccordion 
          title={data.peristalsisTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{data.peristalsisDesc}</p>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}