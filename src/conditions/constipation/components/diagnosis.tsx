// src/conditions/constipation/components/diagnosis.tsx
"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

const DIAGNOSIS_DATA = {
  no: {
    pageTitle: "Utredning",
    patientQuote3: "Jeg sitter ofte over en halv time på do og trykker uten å få til noe, og som oftest er det smertefullt.",
    patientAttribution3: "Kvinne, 60 år",
    relevantExaminationsTitle: "Aktuelle undersøkelser",
    examinationIntro: "For å få så god forståelse og informasjon som mulig om plagene, er det viktig å få frem hele symptombildet.",
    symptomMappingTitle: "Kartlegging av symptomer",
    symptomMappingDesc: "Ofte blir man bedt om å føre en dagbok i forkant av legetimen hvor man under vanlige omstendigheter kartlegger hvor ofte man er på toalettet og eventuelle problemer knyttet til tømmingen.",
    diaryTitle: "Dagbok",
    diaryDesc: "Avføringskonsistens og eventuelle hjelpemidler kartlegges i dagboken.",
    questionnairesTitle: "Spørreskjema",
    questionnairesDesc: "I tillegg brukes ulike spørreskjema for å beskrive symptomene ytterligere.",
    imagingEndoscopyTitle: "Bildediagnostikk og kikkertundersøkelser",
    imagingEndoscopyDesc: "Ulike røntgenundersøkelser og kikkertundersøkelser kan være med på å gi svar på årsakene til tømmingsproblemene:",
    colonoscopyTitle: "Coloskopi og ano-/rectoskopi",
    colonoscopyDesc: "Kikkertundersøkelser som kan avdekke passasje hinder i tarmen.",
    transitTimeTitle: "Colon transittid",
    transitTimeDesc: "En undersøkelse som beskriver tarmpassasjetid.",
    defecographyTitle: "Defecografi",
    defecographyDesc: "Beskriver bekkenbunnens bevegelser ved trykk.",
    patientQuote4: "Irrigasjon har gitt meg friheten til selv å bestemme når jeg vil gå ut med familie og venner.",
    patientAttribution4: "Kvinne, 42 år",
    livingWithTitle: "Å leve med tømmingsvansker",
    livingWithDesc: "Ufullstendig tarmtømming og tømmingsproblemer kan påvirke både hverdagsliv og livskvalitet.",
    treatmentChallenges: "Behandling av slike plager medfører ofte endring av vaner og rutiner. Slike endringer i hverdagen kan være utfordrende å komme i gang med samt det krever en egeninnsats for å greie å gjennomføre det.",
    positiveOutcomes: "Imidlertid opplever de aller fleste at innsatsen de selv bidrar med gjør situasjonen lettere og målet må være å leve så normalt som mulig."
  },
  en: {
    pageTitle: "Diagnosis",
    patientQuote3: "I often sit for over half an hour on the toilet and strain without achieving anything, and it's usually painful.",
    patientAttribution3: "Woman, 60 years",
    relevantExaminationsTitle: "Relevant Examinations",
    examinationIntro: "To get the best possible understanding and information about the problems, it is important to reveal the complete symptom picture.",
    symptomMappingTitle: "Symptom Mapping",
    symptomMappingDesc: "Often you are asked to keep a diary before the doctor's appointment where you map how often you are on the toilet and any problems related to evacuation under normal circumstances.",
    diaryTitle: "Diary",
    diaryDesc: "Stool consistency and any aids are mapped in the diary.",
    questionnairesTitle: "Questionnaires",
    questionnairesDesc: "In addition, various questionnaires are used to describe the symptoms further.",
    imagingEndoscopyTitle: "Imaging and Endoscopy",
    imagingEndoscopyDesc: "Various X-ray examinations and endoscopic examinations can help provide answers to the causes of evacuation problems:",
    colonoscopyTitle: "Colonoscopy and ano-/rectoscopy",
    colonoscopyDesc: "Endoscopic examinations that can reveal passage obstacles in the bowel.",
    transitTimeTitle: "Colon Transit Time",
    transitTimeDesc: "An examination that describes bowel passage time.",
    defecographyTitle: "Defecography",
    defecographyDesc: "Describes pelvic floor movements during straining.",
    patientQuote4: "Irrigation has given me the freedom to decide when I want to go out with family and friends.",
    patientAttribution4: "Woman, 42 years",
    livingWithTitle: "Living with Evacuation Difficulties",
    livingWithDesc: "Incomplete bowel evacuation and evacuation problems can affect both daily life and quality of life.",
    treatmentChallenges: "Treatment of such problems often involves changing habits and routines. Such changes in daily life can be challenging to start with and require personal effort to manage to carry through.",
    positiveOutcomes: "However, most people experience that the effort they contribute makes the situation easier and the goal must be to live as normally as possible."
  }
} as const

export const Diagnosis = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = DIAGNOSIS_DATA[language]

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/solae.png"
            alt="Diagnosis"
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
              <p className={styles.enhancedParagraph}>{data.patientQuote3}</p>
              <p className={styles.enhancedParagraph}><em>{data.patientAttribution3}</em></p>
            </div>
          </div>
        </div>

        <SectionAccordion 
          title={data.relevantExaminationsTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <div className={styles.anatomySection}>
              <div className={styles.anatomyImageContainer}>
                <img
                  src="/examination.jpg"
                  alt="Dietary Guidance"
                  className={styles.anatomyImage}
                />
              </div>
              <div className={styles.anatomyContentWrapper}>
                <p className={styles.enhancedParagraph}>{data.examinationIntro}</p>
              </div>
            </div>
          </div>
        </SectionAccordion>

        <SectionAccordion 
          title={data.symptomMappingTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.symptomMappingDesc}</p>
            
            <h5 className={styles.enhancedSubheading}>{data.diaryTitle}</h5>
            <p className={styles.enhancedParagraph}>{data.diaryDesc}</p>

            <h5 className={styles.enhancedSubheading}>{data.questionnairesTitle}</h5>
            <p className={styles.enhancedParagraph}>{data.questionnairesDesc}</p>
          </div>
        </SectionAccordion>

        <SectionAccordion 
          title={data.imagingEndoscopyTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.imagingEndoscopyDesc}</p>
            
            <ul className={styles.resourceList}>
              <li className={styles.resourceListItem}>
                <strong>1. {data.colonoscopyTitle}</strong>: {data.colonoscopyDesc}
              </li>
              <li className={styles.resourceListItem}>
                <strong>2. {data.transitTimeTitle}</strong>: {data.transitTimeDesc}
              </li>
              <li className={styles.resourceListItem}>
                <strong>3. {data.defecographyTitle}</strong>: {data.defecographyDesc}
              </li>
            </ul>
          </div>
        </SectionAccordion>

        {/* Patient quote - no accordion since no title */}
        <div className={styles.normalFunctionContent}>
          <div className={styles.highlightBox}>
            <p className={styles.enhancedParagraph}>{data.patientQuote4}</p>
            <p className={styles.enhancedParagraph}><em>{data.patientAttribution4}</em></p>
          </div>
        </div>

        <SectionAccordion 
          title={data.livingWithTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.livingWithDesc}</p>
            <p className={styles.enhancedParagraph}>{data.treatmentChallenges}</p>
            <p className={styles.enhancedParagraph}>{data.positiveOutcomes}</p>
          </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}