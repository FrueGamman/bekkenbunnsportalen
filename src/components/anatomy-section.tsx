"use client"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import styles from "./anatomy-section.module.css"

const ANATOMY_SECTION_DATA = {
  no: {
    title: "Utforsk bekkenbunnens anatomi",
    subtitle: "Lær om strukturen og funksjonene til bekkenbunnen",
    description: "Bekkenbunnen er en kompleks muskelstruktur som spiller en viktig rolle i daglig funksjon. Forstå hvordan den fungerer og hvordan du kan holde den sterk.",
    ctaButton: "kommer snart",
    features: [
      {
        title: "7 muskler",
        description: "Lær om de syv musklene i bekkenbunnen",
        icon: "💪"
      },
      {
        title: "Funksjoner",
        description: "Forstå hvordan bekkenbunnen støtter kroppen",
        icon: "⚡"
      }
    ]
  },
  en: {
    title: "Explore pelvic floor anatomy",
    subtitle: "Learn about the structure and functions of the pelvic floor",
    description: "The pelvic floor is a complex muscle structure that plays an important role in daily function. Understand how it works and how you can keep it strong.",
    ctaButton: "Coming soon",
    features: [
      {
        title: "7 muscles",
        description: "Learn about the seven pelvic floor muscles",
        icon: "💪"
      },
      {
        title: "Functions",
        description: "Understand how the pelvic floor supports the body",
        icon: "⚡"
      }
    ]
  }
} as const

export const AnatomySection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = ANATOMY_SECTION_DATA[language]

  return (
    <section className={`${styles.anatomySection} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{data.title}</h2>
            <h3 className={styles.subtitle}>{data.subtitle}</h3>
            <p className={styles.description}>{data.description}</p>
            
            <div className={styles.ctaButton} role="status" aria-live="polite">
              {data.ctaButton}
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img 
                src="/media/images/bekkengulv_med_tekst-768x503.png" 
                alt={data.title}
                className={styles.mainImage}
              />
              <div className={styles.decorativeCircle1}></div>
              <div className={styles.decorativeCircle2}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

