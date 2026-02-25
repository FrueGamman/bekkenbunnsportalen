// src/pages/anatomy/components/FecalIncontinenceAnatomy.tsx
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./AnatomyComponent.module.css"

const FECAL_INCONTINENCE_DATA = {
  no: {
    title: "Avføringslekkasje - Anatomi",
    subtitle: "Forstå fordøyelsessystemets anatomi ved avføringslekkasje",
    digestiveSystemTitle: "Fordøyelsessystemet",
    digestiveSystemDesc: "Tykktarm, endetarm og analkanalen jobber sammen for å kontrollere avføring. Problemer i noen av disse strukturene kan føre til avføringslekkasje.",
    colonTitle: "Tykktarm (Kolon)",
    colonDesc: "Tykktarmen absorberer vann fra matrestene og former avføring. Konsistensen av avføringen påvirker kontrollmulighetene.",
    rectumTitle: "Endetarm (Rektum)",
    rectumDesc: "Endetarmen lagrer avføring midlertidig og gir signal når det er tid for tømming. Problemer med sensorikk kan svekke denne funksjonen.",
    analCanalTitle: "Analkanal",
    analCanalDesc: "Analkanalen inneholder to sfinkter (lukkemuskler) som holder avføringen inne til det er tid for tømming.",
    imageAlt: "Anatomi av analsfinkter",
    imageCaption: "Indre og ytre analsfinkter kontrollerer avføring",
    sphinctersTitle: "Analsfinkter og kontroll",
    internalSphincterTitle: "Indre sfinkter",
    internalSphincterDesc: "Den indre sfinktere er ufrivillig og holder analkanalen lukket i hvile. Skade kan føre til passiv lekkasje.",
    externalSphincterTitle: "Ytre sfinkter",
    externalSphincterDesc: "Den ytre sfinktere er frivillig og kan bevisst anspennes. Svakhet eller skade reduserer evnen til å holde avføringen inne.",
    puborectalisTitle: "Puborektalis muskel",
    puborectalisDesc: "Denne muskelen danner en løkke rundt endetarmen og bidrar til kontinens ved å skape en vinkel. Svakhet påvirker kontrollen.",
    functionTitle: "Avføringskontroll",
    step1Title: "Lagring",
    step1Desc: "Endetarmen lagrer avføring mens begge sfinkter holder analkanalen lukket. Puborektalis muskelen opprettholder endetarmsvinkelen.",
    step2Title: "Registrering",
    step2Desc: "Sensorer i endetarmen og analkanalen registrerer innholdet og gir signal til hjernen. Svekket sensorikk reduserer varselet.",
    step3Title: "Tømming",
    step3Desc: "Ved avføring slapper sfinkter og puborektalis av, slik at endetarmen kan tømmes. Skade på disse strukturene forstyrrer kontrollen.",
    bristolTitle: "Bristol avføringsskala",
    bristolImageAlt: "Bristol avføringsskala",
    bristolDesc: "Bristol-skalaen klassifiserer avføring i syv typer. Type 3-4 er normalt. For hard eller løs avføring kan øke risikoen for lekkasje."
  },
  en: {
    title: "Fecal Incontinence - Anatomy",
    subtitle: "Understanding digestive system anatomy in fecal incontinence",
    digestiveSystemTitle: "Digestive System",
    digestiveSystemDesc: "The colon, rectum, and anal canal work together to control bowel movements. Problems in any of these structures can lead to fecal incontinence.",
    colonTitle: "Colon (Large Intestine)",
    colonDesc: "The colon absorbs water from food remnants and forms stool. Stool consistency affects control abilities.",
    rectumTitle: "Rectum",
    rectumDesc: "The rectum temporarily stores stool and signals when it's time to empty. Problems with sensation can weaken this function.",
    analCanalTitle: "Anal Canal",
    analCanalDesc: "The anal canal contains two sphincters that hold stool in until it's time to empty.",
    imageAlt: "Anatomy of anal sphincters",
    imageCaption: "Internal and external anal sphincters control bowel movements",
    sphinctersTitle: "Anal Sphincters and Control",
    internalSphincterTitle: "Internal Sphincter",
    internalSphincterDesc: "The internal sphincter is involuntary and keeps the anal canal closed at rest. Damage can lead to passive leakage.",
    externalSphincterTitle: "External Sphincter",
    externalSphincterDesc: "The external sphincter is voluntary and can be consciously tightened. Weakness or damage reduces the ability to hold stool in.",
    puborectalisTitle: "Puborectalis Muscle",
    puborectalisDesc: "This muscle forms a loop around the rectum and contributes to continence by creating an angle. Weakness affects control.",
    functionTitle: "Bowel Control",
    step1Title: "Storage",
    step1Desc: "The rectum stores stool while both sphincters keep the anal canal closed. The puborectalis muscle maintains the rectal angle.",
    step2Title: "Detection",
    step2Desc: "Sensors in the rectum and anal canal detect contents and signal the brain. Weakened sensation reduces warning.",
    step3Title: "Emptying",
    step3Desc: "During defecation, sphincters and puborectalis relax, allowing the rectum to empty. Damage to these structures disrupts control.",
    bristolTitle: "Bristol Stool Scale",
    bristolImageAlt: "Bristol stool scale",
    bristolDesc: "The Bristol scale classifies stool into seven types. Type 3-4 is normal. Too hard or loose stool can increase the risk of leakage."
  }
} as const

export const FecalIncontinenceAnatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = FECAL_INCONTINENCE_DATA[language]

  return (
    <div className={`${styles.anatomyComponent} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </div>

      {/* Main Anatomy Section */}
      <div className={styles.anatomySection}>
        <div className={styles.anatomyGrid}>
          <div className={styles.anatomyContent}>
            <h3>{data.digestiveSystemTitle}</h3>
            <p>{data.digestiveSystemDesc}</p>
            
            <div className={styles.structureList}>
              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/belly-1.png" alt="Large Intestine" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.colonTitle}</h4>
                  <p>{data.colonDesc}</p>
                </div>
              </div>

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/symptoms.png" alt="Rectum" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.rectumTitle}</h4>
                  <p>{data.rectumDesc}</p>
                </div>
              </div>

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/imagePelvic-1.png" alt="Anal Canal" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.analCanalTitle}</h4>
                  <p>{data.analCanalDesc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.anatomyImage}>
            <img src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2024/04/Indre-og-ytre-sfinkter.jpg" alt={data.imageAlt} />
            <p className={styles.imageCaption}>{data.imageCaption}</p>
          </div>
        </div>
      </div>

      {/* Sphincter Muscles Section */}
      <div className={styles.detailSection}>
        <h3>{data.sphinctersTitle}</h3>
        <div className={styles.muscleGrid}>
          <div className={styles.muscleCard}>
            <h4>{data.internalSphincterTitle}</h4>
            <p>{data.internalSphincterDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.externalSphincterTitle}</h4>
            <p>{data.externalSphincterDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.puborectalisTitle}</h4>
            <p>{data.puborectalisDesc}</p>
          </div>
        </div>
      </div>

      {/* Function Section */}
      <div className={styles.functionSection}>
        <h3>{data.functionTitle}</h3>
        <div className={styles.functionContent}>
          <div className={styles.functionStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>{data.step1Title}</h4>
              <p>{data.step1Desc}</p>
            </div>
          </div>
          <div className={styles.functionStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>{data.step2Title}</h4>
              <p>{data.step2Desc}</p>
            </div>
          </div>
          <div className={styles.functionStep}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>{data.step3Title}</h4>
              <p>{data.step3Desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bristol Scale Section */}
      <div className={styles.detailSection}>
        <h3>{data.bristolTitle}</h3>
        <div className={styles.bristolSection}>
          <div className={styles.bristolImage}>
            <img src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/bristol_skala.png" alt={data.bristolImageAlt} />
          </div>
          <div className={styles.bristolContent}>
            <p>{data.bristolDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
