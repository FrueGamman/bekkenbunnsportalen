// src/pages/anatomy/components/PelvicPainAnatomy.tsx
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./AnatomyComponent.module.css"

const PELVIC_PAIN_DATA = {
  no: {
    title: "Bekkenbunnssmerter - Anatomi",
    subtitle: "Forstå anatomien relatert til bekkenbunnssmerter",
    pelvicStructuresTitle: "Strukturer i bekkenet",
    pelvicStructuresDesc: "Bekkenet er et komplekst område som inneholder muskler, nerver, blodårer og organer. Smerter kan oppstå fra enhver av disse strukturene.",
    pelvicFloorTitle: "Bekkenbunnsmuskulatur",
    pelvicFloorDesc: "Musklene i bekkenbunnen kan bli anspente eller svake, noe som kan føre til smerter. Muskelstramhet er en vanlig årsak til kroniske bekkensmerter.",
    nervesTitle: "Nerver",
    nervesDesc: "Nervene i bekkenet sender smertesignaler til hjernen. Nervetrykk eller irritasjon kan forårsake vedvarende smerter i bekkenet.",
    organsTitle: "Organer",
    organsDesc: "Blære, tarm, livmor og andre bekkenet organer kan være kilder til smerte. Betennelse eller dysfunksjon i disse kan gi bekkensmerter.",
    imageAlt: "Anatomi av bekkenområdet",
    imageCaption: "Anatomiske strukturer som kan være involvert i bekkenbunnssmerter",
    pathwaysTitle: "Smerteveier og nervesystem",
    sensoryTitle: "Sensoriske nerver",
    sensoryDesc: "Sensoriske nerver registrerer berøring, trykk og smerte i bekkenområdet og sender signaler til ryggmargen og hjernen.",
    motorTitle: "Motoriske nerver",
    motorDesc: "Motoriske nerver styrer muskelsammentrekning i bekkenbunnen. Dysfunksjon kan føre til muskelkramper eller svakhet.",
    autonomicTitle: "Autonome nerver",
    autonomicDesc: "Det autonome nervesystemet regulerer blære- og tarmfunksjon. Forstyrrelser kan forårsake smerter og funksjonsproblemer."
  },
  en: {
    title: "Pelvic Pain - Anatomy",
    subtitle: "Understanding the anatomy related to pelvic pain",
    pelvicStructuresTitle: "Pelvic Structures",
    pelvicStructuresDesc: "The pelvis is a complex area containing muscles, nerves, blood vessels, and organs. Pain can arise from any of these structures.",
    pelvicFloorTitle: "Pelvic Floor Muscles",
    pelvicFloorDesc: "The pelvic floor muscles can become tense or weak, which can lead to pain. Muscle tightness is a common cause of chronic pelvic pain.",
    nervesTitle: "Nerves",
    nervesDesc: "Nerves in the pelvis send pain signals to the brain. Nerve compression or irritation can cause persistent pelvic pain.",
    organsTitle: "Organs",
    organsDesc: "The bladder, bowel, uterus and other pelvic organs can be sources of pain. Inflammation or dysfunction in these can cause pelvic pain.",
    imageAlt: "Anatomy of the pelvic region",
    imageCaption: "Anatomical structures that may be involved in pelvic pain",
    pathwaysTitle: "Pain Pathways and Nervous System",
    sensoryTitle: "Sensory Nerves",
    sensoryDesc: "Sensory nerves detect touch, pressure, and pain in the pelvic area and send signals to the spinal cord and brain.",
    motorTitle: "Motor Nerves",
    motorDesc: "Motor nerves control muscle contraction in the pelvic floor. Dysfunction can lead to muscle spasms or weakness.",
    autonomicTitle: "Autonomic Nerves",
    autonomicDesc: "The autonomic nervous system regulates bladder and bowel function. Disturbances can cause pain and functional problems."
  }
} as const

export const PelvicPainAnatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = PELVIC_PAIN_DATA[language]

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
            <h3>{data.pelvicStructuresTitle}</h3>
            <p>{data.pelvicStructuresDesc}</p>
            
            <div className={styles.structureList}>
              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/imagePelvic-1.png" alt="Pelvic Floor" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.pelvicFloorTitle}</h4>
                  <p>{data.pelvicFloorDesc}</p>
                </div>
              </div>

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/image-1.png" alt="Nerves" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.nervesTitle}</h4>
                  <p>{data.nervesDesc}</p>
                </div>
              </div>

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/health-1.png" alt="Organs" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.organsTitle}</h4>
                  <p>{data.organsDesc}</p>
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

      {/* Pain Pathways Section */}
      <div className={styles.detailSection}>
        <h3>{data.pathwaysTitle}</h3>
        <div className={styles.muscleGrid}>
          <div className={styles.muscleCard}>
            <h4>{data.sensoryTitle}</h4>
            <p>{data.sensoryDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.motorTitle}</h4>
            <p>{data.motorDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.autonomicTitle}</h4>
            <p>{data.autonomicDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
