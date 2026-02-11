// src/pages/anatomy/components/ConstipationAnatomy.tsx
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./AnatomyComponent.module.css"

const CONSTIPATION_DATA = {
  no: {
    title: "Forstoppelse - Anatomi",
    subtitle: "Forstå fordøyelsessystemets anatomi ved forstoppelse",
    digestiveTitle: "Fordøyelsessystemet",
    digestiveDesc: "Fordøyelsessystemet består av flere organer som jobber sammen for å fordøye mat og fjerne avfall. Ved forstoppelse påvirkes tykktarmens og endetarmens funksjon.",
    colonTitle: "Tykktarm (Kolon)",
    colonDesc: "Tykktarmen absorberer vann og salter fra matrestene og danner avføring. Langsom bevegelse i tykktarmen kan føre til hard avføring.",
    rectumTitle: "Endetarm (Rektum)",
    rectumDesc: "Endetarmen er den siste delen av fordøyelsessystemet og lagrer avføring før tømming. Problemer med endetarmen kan forårsake forstoppelse.",
    pelvicFloorTitle: "Bekkenbunnsmuskulatur",
    pelvicFloorDesc: "Bekkenbunnsmuskler påvirker evnen til å tømme tarmen. Anspente muskler eller svakhet kan bidra til forstoppelse.",
    imageAlt: "Korrekt toalettposisjon",
    imageCaption: "Riktig posisjon på toalettet kan lette tarmtømming",
    processTitle: "Avføringsprosessen",
    step1Title: "Tarmens bevegelse",
    step1Desc: "Tykktarmen beveger avføringen mot endetarmen gjennom peristaltiske bevegelser. Langsom bevegelse kan føre til hard avføring.",
    step2Title: "Lagring i endetarmen",
    step2Desc: "Endetarmen lagrer avføringen til det er tid for tømming. Sensorer registrerer når endetarmen er full.",
    step3Title: "Tømming",
    step3Desc: "Ved avføring slapper bekkenbunnsmuskler og sfinkter av, slik at avføringen kan passere. Anspente muskler kan hindre fullstendig tømming."
  },
  en: {
    title: "Constipation - Anatomy",
    subtitle: "Understanding digestive system anatomy in constipation",
    digestiveTitle: "Digestive System",
    digestiveDesc: "The digestive system consists of several organs working together to digest food and eliminate waste. In constipation, the function of the colon and rectum is affected.",
    colonTitle: "Colon (Large Intestine)",
    colonDesc: "The colon absorbs water and salts from food remnants and forms stool. Slow movement in the colon can lead to hard stool.",
    rectumTitle: "Rectum",
    rectumDesc: "The rectum is the final part of the digestive system and stores stool before elimination. Problems with the rectum can cause constipation.",
    pelvicFloorTitle: "Pelvic Floor Muscles",
    pelvicFloorDesc: "Pelvic floor muscles affect the ability to empty the bowel. Tense muscles or weakness can contribute to constipation.",
    imageAlt: "Correct toilet position",
    imageCaption: "The right position on the toilet can ease bowel movements",
    processTitle: "Defecation Process",
    step1Title: "Bowel Movement",
    step1Desc: "The colon moves stool toward the rectum through peristaltic movements. Slow movement can lead to hard stool.",
    step2Title: "Storage in Rectum",
    step2Desc: "The rectum stores stool until it's time for elimination. Sensors detect when the rectum is full.",
    step3Title: "Elimination",
    step3Desc: "During defecation, pelvic floor muscles and sphincter relax, allowing stool to pass. Tense muscles can prevent complete evacuation."
  }
} as const

export const ConstipationAnatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = CONSTIPATION_DATA[language]

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
            <h3>{data.digestiveTitle}</h3>
            <p>{data.digestiveDesc}</p>
            
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
                  <img src="/consipationZ.jpg" alt="Rectum" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.rectumTitle}</h4>
                  <p>{data.rectumDesc}</p>
                </div>
              </div>

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/imagePelvic-1.png" alt="Pelvic Floor" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.pelvicFloorTitle}</h4>
                  <p>{data.pelvicFloorDesc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.anatomyImage}>
            <img src="/korrekt-toiledPosistion.png" alt={data.imageAlt} />
            <p className={styles.imageCaption}>{data.imageCaption}</p>
          </div>
        </div>
      </div>

      {/* Defecation Process Section */}
      <div className={styles.functionSection}>
        <h3>{data.processTitle}</h3>
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
    </div>
  )
}
