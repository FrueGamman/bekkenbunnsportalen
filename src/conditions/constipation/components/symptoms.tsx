// src/conditions/constipation/components/symptoms.tsx
"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'
import { ConstipationIntroduction } from './shared-introduction'

const SYMPTOMS_DATA = {
  no: {
    pageTitle: "Symptomer",
    patientQuote: "Jeg gruer meg for å gå på do borte. Jeg må ofte hjelpe til å få ut avføringen med fingrene, det har jeg aldri fortalt til noen.",
    patientAttribution: "Kvinne, 37 år",
    mainSymptomsTitle: "Hovedsymptomer",
    symptoms: [
      "Følelse av ufullstendig tømming",
      "Oppblåsthet",
      "Luftplager",
      "Må returnere til toalettet flere ganger",
      "Vanskelig å tørke seg rein",
      "Avføringslekkasje er vanlig"
    ],
    evacuationVsConstipationTitle: "Tømmingsvansker vs. forstoppelse",
    evacuationVsConstipationDesc: "Ved tømmingsvansker er man ofte på toalettet daglig og gjerne flere ganger daglig i motsetning til forstoppelse. Ved problemer med langsom peristaltikk i tarmen kan det gå 4-5 dager mellom tømmingene.",
    alarmSymptomsTitle: "Alarmsymptomer",
    alarmSymptomsDesc: "Dersom man ser blod og slim i avføringen er det et alarmsymptom som betinger nærmere utredning av endetarm og tykktarm. Lege bør alltid oppsøkes i slike tilfeller.",
    bristolScaleTitle: "Bristol skala",
    bristolScaleDesc: "Bristol skala, også kalt Bristol stool scale/chart, er et diagnostisk verktøy som klassifiserer avføringskonsistensen i syv ulike kategorier. Kategoriene en til syv graderes fra fast avføring (1) til flytende avføring (7).",
    bristolOptimalTitle: "Optimal avføringskonsistens",
    bristolOptimalDesc: "Ved problemer både med lekkasje og tømming ønsker man å tilnærme seg kategori fire som regnes som normal avføring. Denne avføringstype er mest optimal for å oppnå kontinens samt komplett tømming.",
    bristolImageAlt: "Bristol Stool Scale - Bristolskalane for de 7 typer avføring fra flytende (type 7) til hard (type 1)",
    bristolImageCaption: "Bristol Stool Scale - Bristolskalane for de 7 typer avføring fra flytende (type 7) til hard (type 1)",
    analFissureTitle: "Analfissur",
    analFissureDesc: "Analfissur er et langsgående sår i huden i analkanalen. Såret oppstår som regel på grunn av press og uttøyning på kanalen ved passasje av hard avføring. Forstoppelse er derfor en vanlig årsak. Smertene skyldes krampe i indre lukkemuskelen (analsfinkteren) i endetarmen. Krampene er en naturlig reaksjon fra kroppen for å beskytte seg mot ytterligere skade. Krampene reduserer blodgjennomstrømningen til såret og dermed hemmes tilhelingen. En analfissur kan være en akutt eller kronisk tilstand.",
    analFissureSymptoms: "Symptomer: Smerte ved og etter avføring, små mengder blod på toalettpapiret, stramme smerter i endetarmsområdet.",
    analFissureTreatment: "Behandling: Behandlingen av akutte analfissurer går i hovedsak på å redusere smertene og få til en god sårtilheling. Dette kan gjøres med lokalbedøvende salve (Xylocain salve), sittebad med lunkent vann samt tiltak for å unngå hard avføring. Kroniske analfissurer kan ha behov for kirurgisk behandling."
  },
  en: {
    pageTitle: "Symptoms",
    patientQuote: "I dread going to the toilet when I'm away from home. I often have to help get the stool out with my fingers, which I've never told anyone about.",
    patientAttribution: "Woman, 37 years",
    mainSymptomsTitle: "Main Symptoms",
    symptoms: [
      "Feeling of incomplete evacuation",
      "Bloating",
      "Gas problems",
      "Must return to toilet multiple times",
      "Difficult to clean properly",
      "Fecal incontinence is common"
    ],
    evacuationVsConstipationTitle: "Evacuation difficulties vs. constipation",
    evacuationVsConstipationDesc: "With evacuation difficulties, one is often on the toilet daily and often several times daily, unlike constipation. With problems of slow peristalsis in the bowel, it can be 4-5 days between evacuations.",
    alarmSymptomsTitle: "Alarm Symptoms",
    alarmSymptomsDesc: "If you see blood and mucus in the stool, this is an alarm symptom that requires further investigation of the rectum and colon. A doctor should always be consulted in such cases.",
    bristolScaleTitle: "Bristol Scale",
    bristolScaleDesc: "The Bristol scale, also called Bristol stool scale/chart, is a diagnostic tool that classifies stool consistency into seven different categories. Categories one to seven are graded from hard stool (1) to liquid stool (7).",
    bristolOptimalTitle: "Optimal Stool Consistency",
    bristolOptimalDesc: "For problems with both leakage and evacuation, one wants to approach category four which is considered normal stool. This stool type is most optimal for achieving continence as well as complete evacuation.",
    bristolImageAlt: "Bristol Stool Scale - Bristol scale for the 7 types of stool from liquid (type 7) to hard (type 1)",
    bristolImageCaption: "Bristol Stool Scale - Bristol scale for the 7 types of stool from liquid (type 7) to hard (type 1)",
    analFissureTitle: "Anal Fissure",
    analFissureDesc: "An anal fissure is a longitudinal wound in the skin in the anal canal. The wound usually occurs due to pressure and stretching of the canal when passing hard stool. Constipation is therefore a common cause. The pain is due to spasm in the internal sphincter muscle in the rectum. The spasms are a natural reaction of the body to protect itself against further damage. The spasms reduce blood flow to the wound and thus healing is inhibited. An anal fissure can be an acute or chronic condition.",
    analFissureSymptoms: "Symptoms: Pain during and after bowel movements, small amounts of blood on toilet paper, tight pain in the rectal area.",
    analFissureTreatment: "Treatment: Treatment of acute anal fissures mainly focuses on reducing pain and achieving good wound healing. This can be done with local anesthetic ointment (Xylocaine), sitz bath with lukewarm water, and measures to avoid hard stool. Chronic anal fissures may require surgical treatment."
  }
} as const

export const Symptoms = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = SYMPTOMS_DATA[language]

  return (
    <>
      {/* Shared Introduction */}
      <ConstipationIntroduction />

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/inSymptoms.png"
            alt="Symptoms"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <div className={styles.highlightBox}>
              <p className={styles.enhancedParagraph}>{data.patientQuote}</p>
              <p className={styles.enhancedParagraph}><em>{data.patientAttribution}</em></p>
            </div>
          </div>
        </div>

        <SectionAccordion 
          title={data.mainSymptomsTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <ul className={styles.resourceList}>
            {data.symptoms.map((symptom) => (
              <li key={symptom} className={styles.resourceListItem}>
                {symptom}
              </li>
            ))}
          </ul>
        </SectionAccordion>

        <SectionAccordion 
          title={data.evacuationVsConstipationTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{data.evacuationVsConstipationDesc}</p>
        </SectionAccordion>

        <SectionAccordion 
          title={data.alarmSymptomsTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.highlightBox}>
            <p className={styles.enhancedParagraph}>{data.alarmSymptomsDesc}</p>
          </div>
        </SectionAccordion>

        <SectionAccordion 
          title={data.bristolScaleTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.anatomyGrid}>
            <div>
              <p className={styles.enhancedParagraph}>{data.bristolScaleDesc}</p>
              
              <h4 className={styles.enhancedSubheading}>{data.bristolOptimalTitle}</h4>
              <p className={styles.enhancedParagraph}>{data.bristolOptimalDesc}</p>
              
              <p className={styles.enhancedParagraph}>
                <a 
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1945713/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.resourceLink}
                >
                  Les mer om Bristol Stool Scale
                </a>
              </p>
            </div>
            <div className={styles.anatomyItem}>
              <img 
                src="/bristol_skala.png" 
                alt={data.bristolImageAlt}
                className={styles.anatomyImage}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <p className={styles.anatomyCaption}>
                {data.bristolImageCaption}
              </p>
            </div>
          </div>
        </SectionAccordion>

        <SectionAccordion 
          title={data.analFissureTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.analFissureDesc}</p>
            <h4 className={styles.enhancedSubheading}>{data.analFissureSymptoms}</h4>
            <h4 className={styles.enhancedSubheading}>{data.analFissureTreatment}</h4>
          </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}