// src/pages/anatomy/components/PregnancyAnatomy.tsx
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./AnatomyComponent.module.css"

const PREGNANCY_DATA = {
  no: {
    title: "Graviditet - Anatomi",
    subtitle: "Forstå anatomiske endringer under graviditet",
    changesTitle: "Endringer i bekkenet",
    changesDesc: "Under graviditet gjennomgår kroppen store anatomiske endringer. Livmoren vokser betydelig, noe som påvirker bekkenbunnen, blæren og andre bekkenet organer.",
    uterusTitle: "Livmor (Uterus)",
    uterusDesc: "Livmoren ekspanderer dramatisk under graviditet for å romme det voksende fosteret. Dette legger press på bekkenbunnsmuskulaturen.",
    pelvicFloorTitle: "Bekkenbunnsmuskulatur",
    pelvicFloorDesc: "Vekten av det voksende fosteret og livmoren belaster bekkenbunnen. Hormonelle endringer gjør også musklene mer elastiske, noe som kan svekke dem.",
    bladderTitle: "Urinblære",
    bladderDesc: "Den ekspanderende livmoren presser på blæren, noe som reduserer kapasiteten og kan føre til hyppigere vannlating eller stressinkontinens.",
    imageAlt: "Anatomi under graviditet",
    imageCaption: "Anatomiske endringer i bekkenet under graviditet",
    stagesTitle: "Graviditetsstadier og påvirkning",
    firstTrimesterTitle: "1. trimester",
    firstTrimesterDesc: "Hormonelle endringer begynner å påvirke bekkenets vev. Økt blodvolum og væskeretensjon kan starte allerede nå.",
    secondTrimesterTitle: "2. trimester",
    secondTrimesterDesc: "Livmoren vokser raskt og begynner å legge merkbart press på bekkenbunnen. Bekkenbunnstrening anbefales.",
    thirdTrimesterTitle: "3. trimester",
    thirdTrimesterDesc: "Maksimalt press på bekkenbunnen når fosteret er fullt utviklet. Risiko for inkontinens og bekkenbunnsproblemer øker.",
    birthTitle: "Fødsel og påvirkning",
    laborTitle: "Veer og åpningsfase",
    laborDesc: "Under veer strekkes livmorhalsen og bekkenbunnen forbereder seg på fødsel. Intenst press på alle bekkenstrukturer.",
    deliveryTitle: "Utdrivningsfase",
    deliveryDesc: "Bekkenbunnen strekkes maksimalt når barnet passerer gjennom fødselskanalen. Risiko for rifter og muskelskade.",
    recoveryTitle: "Etter fødsel",
    recoveryDesc: "Bekkenbunnen trenger tid for å gjenvinne tonus og styrke. Tidlig rehabilitering er viktig for å forebygge langsiktige problemer."
  },
  en: {
    title: "Pregnancy - Anatomy",
    subtitle: "Understanding anatomical changes during pregnancy",
    changesTitle: "Changes in the Pelvis",
    changesDesc: "During pregnancy, the body undergoes major anatomical changes. The uterus grows significantly, affecting the pelvic floor, bladder, and other pelvic organs.",
    uterusTitle: "Uterus",
    uterusDesc: "The uterus expands dramatically during pregnancy to accommodate the growing fetus. This puts pressure on the pelvic floor muscles.",
    pelvicFloorTitle: "Pelvic Floor Muscles",
    pelvicFloorDesc: "The weight of the growing fetus and uterus strains the pelvic floor. Hormonal changes also make muscles more elastic, which can weaken them.",
    bladderTitle: "Bladder",
    bladderDesc: "The expanding uterus presses on the bladder, reducing capacity and potentially causing more frequent urination or stress incontinence.",
    imageAlt: "Anatomy during pregnancy",
    imageCaption: "Anatomical changes in the pelvis during pregnancy",
    stagesTitle: "Pregnancy Stages and Impact",
    firstTrimesterTitle: "1st Trimester",
    firstTrimesterDesc: "Hormonal changes begin to affect pelvic tissues. Increased blood volume and fluid retention may start already now.",
    secondTrimesterTitle: "2nd Trimester",
    secondTrimesterDesc: "The uterus grows rapidly and begins to put noticeable pressure on the pelvic floor. Pelvic floor training is recommended.",
    thirdTrimesterTitle: "3rd Trimester",
    thirdTrimesterDesc: "Maximum pressure on the pelvic floor as the fetus is fully developed. Risk of incontinence and pelvic floor problems increases.",
    birthTitle: "Birth and Impact",
    laborTitle: "Labor and Dilation",
    laborDesc: "During labor, the cervix dilates and the pelvic floor prepares for birth. Intense pressure on all pelvic structures.",
    deliveryTitle: "Delivery Phase",
    deliveryDesc: "The pelvic floor stretches maximally as the baby passes through the birth canal. Risk of tears and muscle damage.",
    recoveryTitle: "After Birth",
    recoveryDesc: "The pelvic floor needs time to regain tone and strength. Early rehabilitation is important to prevent long-term problems."
  }
} as const

export const PregnancyAnatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = PREGNANCY_DATA[language]

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
            <h3>{data.changesTitle}</h3>
            <p>{data.changesDesc}</p>
            
            <div className={styles.structureList}>
              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/belly-1.png" alt="Uterus" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.uterusTitle}</h4>
                  <p>{data.uterusDesc}</p>
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

              <div className={styles.structureItem}>
                <div className={styles.structureIcon}>
                  <img src="/health-1.png" alt="Bladder" />
                </div>
                <div className={styles.structureInfo}>
                  <h4>{data.bladderTitle}</h4>
                  <p>{data.bladderDesc}</p>
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

      {/* Pregnancy Stages Section */}
      <div className={styles.detailSection}>
        <h3>{data.stagesTitle}</h3>
        <div className={styles.muscleGrid}>
          <div className={styles.muscleCard}>
            <h4>{data.firstTrimesterTitle}</h4>
            <p>{data.firstTrimesterDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.secondTrimesterTitle}</h4>
            <p>{data.secondTrimesterDesc}</p>
          </div>
          <div className={styles.muscleCard}>
            <h4>{data.thirdTrimesterTitle}</h4>
            <p>{data.thirdTrimesterDesc}</p>
          </div>
        </div>
      </div>

      {/* Birth Process Section */}
      <div className={styles.functionSection}>
        <h3>{data.birthTitle}</h3>
        <div className={styles.functionContent}>
          <div className={styles.functionStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>{data.laborTitle}</h4>
              <p>{data.laborDesc}</p>
            </div>
          </div>
          <div className={styles.functionStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>{data.deliveryTitle}</h4>
              <p>{data.deliveryDesc}</p>
            </div>
          </div>
          <div className={styles.functionStep}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>{data.recoveryTitle}</h4>
              <p>{data.recoveryDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
