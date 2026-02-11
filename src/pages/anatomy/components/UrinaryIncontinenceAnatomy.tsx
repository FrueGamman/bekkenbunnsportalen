// src/pages/anatomy/components/UrinaryIncontinenceAnatomy.tsx
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./AnatomyComponent.module.css"

const URINARY_INCONTINENCE_DATA = {
  no: {
    title: "Urininkontinens - Anatomi",
    subtitle: "Forstå urinsystemets anatomi ved urinlekkasje",
    urinarySystemTitle: "Urinsystemet",
    urinarySystemDesc: "Urinsystemet består av nyrer, urinledere, blæren og urinrøret. Alle disse delene må fungere sammen for å opprettholde urinkontroll.",
    kidneysTitle: "Nyrer",
    kidneysDesc: "Nyrene filtrerer blodet og produserer urin. Urin sendes via urinledere til blæren for lagring.",
    bladderTitle: "Urinblære",
    bladderDesc: "Blæren lagrer urin til du er klar for å tømme den. Blæreveggen inneholder detrusormuskelen som trekker seg sammen ved vannlating.",
    pelvicFloorTitle: "Bekkenbunnsmuskulatur",
    pelvicFloorDesc: "Bekkenbunnsmuskler omgir og støtter urinrøret. Svakhet i disse musklene er en hovedårsak til stressinkontinens.",
    imageAlt: "Anatomi av urinsystemet",
    imageCaption: "Strukturer som kontrollerer urinlekkasje",
    musclesTitle: "Bekkenbunnsmuskler og urinkontroll",
    levatorTitle: "Levator ani",
    levatorDesc: "Denne store muskelplaten danner gulvet i bekkenet og støtter blæren og urinrøret. Svakhet fører til nedsatt støtte.",
    sphincterTitle: "Urinrørssfinkter",
    sphincterDesc: "Sfinktermusklene rundt urinrøret holder det lukket. Ved stressinkontinens kan disse musklene svikte under press.",
    supportTitle: "Støttevev",
    supportDesc: "Bindevev og ligamenter holder blæren og urinrøret i riktig posisjon. Skade på disse kan forårsake urinlekkasje.",
    functionTitle: "Urinrørsfunksjon",
    step1Title: "Lagring",
    step1Desc: "Under lagring er blæreveggen avslappet og sfinktere og bekkenbunnsmuskler er anspente for å holde urin inne.",
    step2Title: "Fyllingssignal",
    step2Desc: "Når blæren blir full, sender nervesignaler beskjed til hjernen. Ved god kontroll kan du utsette vannlating.",
    step3Title: "Vannlating",
    step3Desc: "Ved vannlating slapper sfinktere og bekkenbunnsmuskler av mens blæreveggen trekker seg sammen. Svakhet forstyrrer denne balansen."
  },
  en: {
    title: "Urinary Incontinence - Anatomy",
    subtitle: "Understanding urinary system anatomy in urinary leakage",
    urinarySystemTitle: "Urinary System",
    urinarySystemDesc: "The urinary system consists of kidneys, ureters, bladder, and urethra. All these parts must work together to maintain urinary control.",
    kidneysTitle: "Kidneys",
    kidneysDesc: "The kidneys filter blood and produce urine. Urine is sent via ureters to the bladder for storage.",
    bladderTitle: "Bladder",
    bladderDesc: "The bladder stores urine until you're ready to empty it. The bladder wall contains the detrusor muscle that contracts during urination.",
    pelvicFloorTitle: "Pelvic Floor Muscles",
    pelvicFloorDesc: "Pelvic floor muscles surround and support the urethra. Weakness in these muscles is a major cause of stress incontinence.",
    imageAlt: "Anatomy of the urinary system",
    imageCaption: "Structures that control urinary leakage",
    musclesTitle: "Pelvic Floor Muscles and Urinary Control",
    levatorTitle: "Levator Ani",
    levatorDesc: "This large muscle plate forms the pelvic floor and supports the bladder and urethra. Weakness leads to reduced support.",
    sphincterTitle: "Urethral Sphincter",
    sphincterDesc: "Sphincter muscles around the urethra keep it closed. In stress incontinence, these muscles can fail under pressure.",
    supportTitle: "Support Tissues",
    supportDesc: "Connective tissue and ligaments hold the bladder and urethra in the correct position. Damage to these can cause urinary leakage.",
    functionTitle: "Urethral Function",
    step1Title: "Storage",
    step1Desc: "During storage, the bladder wall is relaxed and sphincters and pelvic floor muscles are tense to hold urine in.",
    step2Title: "Filling Signal",
    step2Desc: "When the bladder becomes full, nerve signals notify the brain. With good control, you can delay urination.",
    step3Title: "Urination",
    step3Desc: "During urination, sphincters and pelvic floor muscles relax while the bladder wall contracts. Weakness disrupts this balance."
  }
} as const

export const UrinaryIncontinenceAnatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = URINARY_INCONTINENCE_DATA[language]

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
            <h3>{data.urinarySystemTitle}</h3>
            <p>{data.urinarySystemDesc}</p>
            
            <div className={styles.structureList}>
              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/health-1.png" alt="Kidneys" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.kidneysTitle}</h4>
                  <p>{data.kidneysDesc}</p>
                </div>
              </div>

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/inSymptoms.png" alt="Bladder" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.bladderTitle}</h4>
                  <p>{data.bladderDesc}</p>
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

      {/* Pelvic Floor Muscles Section */}
      <div className={styles.detailSection}>
        <h3>{data.musclesTitle}</h3>
        <div className={styles.muscleGrid}>
          <div className={styles.muscleCard}>
            <h4>{data.levatorTitle}</h4>
            <p>{data.levatorDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.sphincterTitle}</h4>
            <p>{data.sphincterDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.supportTitle}</h4>
            <p>{data.supportDesc}</p>
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
              <h4>{data.step1Title}</h4>
              <p>{data.step3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
