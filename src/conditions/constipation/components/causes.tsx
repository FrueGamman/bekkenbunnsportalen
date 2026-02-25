// src/conditions/constipation/components/causes.tsx
"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

const CAUSES_DATA = {
  no: {
    pageTitle: "Årsaker",
    patientQuote: "Jeg føler meg aldri helt tømt og må returnere tilbake til do flere ganger i løpet av dagen.",
    patientAttribution: "Mann, 42 år",
    variousConditionsTitle: "Problemer med å tømme tarmen kan skyldes ulike tilstander",
    lifestyleChangesTitle: "Endringer i livsstil",
    lifestyleChangesDesc: "Forstoppelse kan oppstå dersom toalettvaner endrer seg, ved for eksempel stress, endret aktivitetsnivå, vanskeligheter med tilgang på toalett, og ved endring i inntak av mat, drikke og ulike medisiner.",
    structuralProblemsTitle: "Strukturelle problemer",
    structuralProblemsDesc: "Stenoser/forsnevring i tarmen etter kirurgi eller andre sykdomstilstander i tarmen kan gi tømmingsvansker.",
    neurologicalTitle: "Nevrologiske tilstander",
    neurologicalDesc: "Nevrologiske tilstander som for eksempel Multippelsklerose, Parkinson sykdom og ryggmargskade.",
    anatomicalTitle: "Anatomiske forhold",
    anatomicalDesc: "Mulig årsak til tømmingsvansker er rectocele, analprolaps, slimhinne prolaps i nedre del av tarmen. Dette er tilstander der tarmen har fått en utposning/svakhet i tarmveggen som forhindrer normal passasje av avføringen.",
    behavioralTitle: "Atferdsmessige faktorer",
    behavioralDesc: "Overdreven pressing over lang tid kan være årsak til et tømmingsproblem.",
    bladderIssuesTitle: "Blæreproblemer",
    bladderIssuesDesc: "Oppfylninger i blæren, som store mengder urin eller blæretumor, kan gi forstoppelsesplager.",
    imageAlt: "Bilde av en mann som klemmer hendene mot magen som for å dempe smerte",
    imageCaption: "Mann som opplever magesmerter relatert til tømmingsproblemer"
  },
  en: {
    pageTitle: "Causes",
    patientQuote: "I never feel completely emptied and have to return to the toilet several times during the day.",
    patientAttribution: "Man, 42 years",
    variousConditionsTitle: "Problems with bowel evacuation can be due to various conditions",
    lifestyleChangesTitle: "Lifestyle Changes",
    lifestyleChangesDesc: "Constipation can occur if toilet habits change, for example: stress, changed activity level, difficulties with access to toilet, and changes in intake of food, drink and various medications.",
    structuralProblemsTitle: "Structural Problems",
    structuralProblemsDesc: "Stenoses/narrowing in the bowel after surgery or other disease conditions in the bowel can cause evacuation difficulties.",
    neurologicalTitle: "Neurological Conditions",
    neurologicalDesc: "Neurological conditions such as Multiple Sclerosis, Parkinson's Disease, and spinal cord injury can affect bowel function.",
    anatomicalTitle: "Anatomical Factors",
    anatomicalDesc: "Possible causes of evacuation difficulties are rectocele, anal prolapse, mucosal prolapse in the lower part of the bowel. These are conditions where the bowel has developed a bulge/weakness in the bowel wall that prevents normal passage of stool.",
    behavioralTitle: "Behavioral Factors",
    behavioralDesc: "Excessive straining over a long time can be a cause of evacuation problems.",
    bladderIssuesTitle: "Bladder Problems",
    bladderIssuesDesc: "Bladder filling, such as large amounts of urine or bladder tumor, can cause constipation problems.",
    imageAlt: "Image of a man holding his hands against his stomach as if to relieve pain",
    imageCaption: "Man experiencing abdominal pain related to bowel evacuation problems"
  }
} as const

export const Causes = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = CAUSES_DATA[language]

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
          title={data.variousConditionsTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            {/* Image of man holding stomach with content in row */}
            <div className={styles.anatomySection}>
              <div className={styles.anatomyImageContainer}>
                <img 
                  src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/COLOURBOX12002837_0.jpg" 
                  alt={data.imageAlt}
                  className={styles.anatomyImage}
                />
                <p className={styles.anatomyImageCaption}>
                  {data.imageCaption}
                </p>
              </div>
              <div className={styles.anatomyContentWrapper}>
                <ul className={styles.causesList}>
                  <li className={styles.causeItem}>
                    <span className={styles.causeBullet}>•</span>
                    <span className={styles.causeText}>{data.lifestyleChangesDesc}</span>
                  </li>
                  <li className={styles.causeItem}>
                    <span className={styles.causeBullet}>•</span>
                    <span className={styles.causeText}>{data.structuralProblemsDesc}</span>
                  </li>
                  <li className={styles.causeItem}>
                    <span className={styles.causeBullet}>•</span>
                    <span className={styles.causeText}>{data.neurologicalDesc}</span>
                  </li>
                  <li className={styles.causeItem}>
                    <span className={styles.causeBullet}>•</span>
                    <span className={styles.causeText}>{data.anatomicalDesc}</span>
                  </li>
                  <li className={styles.causeItem}>
                    <span className={styles.causeBullet}>•</span>
                    <span className={styles.causeText}>{data.behavioralDesc}</span>
                  </li>
                  <li className={styles.causeItem}>
                    <span className={styles.causeBullet}>•</span>
                    <span className={styles.causeText}>{data.bladderIssuesDesc}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}