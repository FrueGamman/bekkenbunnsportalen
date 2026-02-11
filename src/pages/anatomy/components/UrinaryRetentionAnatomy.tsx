// src/pages/anatomy/components/UrinaryRetentionAnatomy.tsx
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./AnatomyComponent.module.css"

const URINARY_RETENTION_DATA = {
  no: {
    title: "Urinretensjon - Anatomi",
    subtitle: "Forstå urinsystemets anatomi ved urinretensjon",
    bladderTitle: "Urinblæren",
    bladderDesc: "Urinblæren lagrer urin før tømming. Ved urinretensjon kan blæren ikke tømmes fullstendig, noe som kan skyldes problemer med blæremuskelen eller sfinktere.",
    detrusorTitle: "Detrusormuskel",
    detrusorDesc: "Detrusormuskelen er blæreveggen som trekker seg sammen for å tømme blæren. Svak sammentrekning eller anspenthet kan føre til urinretensjon.",
    urethraTitle: "Urinrør (Uretra)",
    urethraDesc: "Urinrøret fører urin fra blæren ut av kroppen. Blokkering eller innsnevring kan hindre normal urinflyten.",
    pelvicFloorTitle: "Bekkenbunnsmuskulatur",
    pelvicFloorDesc: "Bekkenbunnsmuskler omgir urinrøret og bidrar til urinkontroll. Overaktive muskler kan hindre fullstendig blæretømming.",
    imageAlt: "Anatomi av urinsystemet",
    imageCaption: "Strukturer involvert i urinfunksjon",
    voidingTitle: "Vannlatingsprosessen",
    step1Title: "Blærefylling",
    step1Desc: "Urin samles i blæren fra nyrene gjennom urinlederne. Blæreveggen strekker seg etter hvert som blæren fylles.",
    step2Title: "Signalering",
    step2Desc: "Når blæren er full, sender nervesignaler beskjed til hjernen om at det er tid for vannlating.",
    step3Title: "Tømming",
    step3Desc: "Detrusormuskelen trekker seg sammen mens sfinktere og bekkenbunnsmuskler slapper av, slik at urin kan passere ut. Ved urinretensjon fungerer ikke denne koordineringen riktig."
  },
  en: {
    title: "Urinary Retention - Anatomy",
    subtitle: "Understanding urinary system anatomy in urinary retention",
    bladderTitle: "Bladder",
    bladderDesc: "The bladder stores urine before emptying. In urinary retention, the bladder cannot empty completely, which may be due to problems with the bladder muscle or sphincters.",
    detrusorTitle: "Detrusor Muscle",
    detrusorDesc: "The detrusor muscle is the bladder wall that contracts to empty the bladder. Weak contraction or tension can lead to urinary retention.",
    urethraTitle: "Urethra",
    urethraDesc: "The urethra carries urine from the bladder out of the body. Blockage or narrowing can prevent normal urine flow.",
    pelvicFloorTitle: "Pelvic Floor Muscles",
    pelvicFloorDesc: "Pelvic floor muscles surround the urethra and contribute to urinary control. Overactive muscles can prevent complete bladder emptying.",
    imageAlt: "Anatomy of the urinary system",
    imageCaption: "Structures involved in urinary function",
    voidingTitle: "Voiding Process",
    step1Title: "Bladder Filling",
    step1Desc: "Urine collects in the bladder from the kidneys through the ureters. The bladder wall stretches as the bladder fills.",
    step2Title: "Signaling",
    step2Desc: "When the bladder is full, nerve signals tell the brain it's time to void.",
    step3Title: "Emptying",
    step3Desc: "The detrusor muscle contracts while sphincters and pelvic floor muscles relax, allowing urine to pass out. In urinary retention, this coordination doesn't work properly."
  }
} as const

export const UrinaryRetentionAnatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = URINARY_RETENTION_DATA[language]

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
            <h3>{data.bladderTitle}</h3>
            <p>{data.bladderDesc}</p>
            
            <div className={styles.structureList}>
              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/inResource.png" alt="Bladder" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.detrusorTitle}</h4>
                  <p>{data.detrusorDesc}</p>
                </div>
              </div>

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/health-1.png" alt="Urethra" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.urethraTitle}</h4>
                  <p>{data.urethraDesc}</p>
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
            <img src="/imagePelvic-2.png" alt={data.imageAlt} />
            <p className={styles.imageCaption}>{data.imageCaption}</p>
          </div>
        </div>
      </div>

      {/* Voiding Process Section */}
      <div className={styles.functionSection}>
        <h3>{data.voidingTitle}</h3>
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
