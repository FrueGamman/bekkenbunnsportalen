// src/pages/anatomy/Anatomy.tsx
"use client"

import { useLanguage } from "../../context/LanguageContext"
import { useTheme } from "../../context/ThemeContext"
import { Header } from "../../components/Header"
import Footer from "../../components/Footer"
import styles from "./Anatomy.module.css"

// Structured bilingual data for Anatomy page
const ANATOMY_DATA = {
  no: {
    title: "Anatomi",
    subtitle: "Lær om bekkenbunnens anatomi og funksjon",
    overview: {
      title: "Bekkenbunnens anatomi og funksjon",
      description: "Bekkenbunnen er en kompleks struktur som spiller en viktig rolle i urinering, avføring og seksualitet. Her kan du lære om de ulike delene av bekkenbunnen og hvordan de fungerer sammen.",
      imageAlt: "Bekkenbunnens anatomi",
      videoTitle: "Bekkenbunnens anatomi - Instruksjonsvideo",
      musclesTitle: "Bekkenbunnen består av følgende muskler:",
      muscles: [
        { name: "Musculus levator ani", description: "Hovedmuskelen som støtter bekkenbunnens organer. Svakhet kan føre til urinlekkasje, avføringslekkasje, tømmingsproblemer og underlivsframfall." },
        { name: "Musculus coccygeus", description: "Støtter bekkenbunnen sammen med levator ani. Viktig for stabilitet og kontroll ved fysisk aktivitet og under graviditet." },
        { name: "Musculus sphincter ani externus", description: "Ytre lukkemuskel for endetarmen. Kontrollerer avføringen og forebygger avføringslekkasje. Kan skades ved fødsel eller operasjoner." },
        { name: "Musculus bulbospongiosus", description: "Viktig for seksualfunksjon og tømming av urinrøret. Bidrar også til å forebygge urinlekkasje etter vannlating." },
        { name: "Musculus ischiocavernosus", description: "Støtter seksualfunksjon og bidrar til stabilitet i bekkenbunnen. Kan påvirkes ved langvarige underlivssmerter." },
        { name: "Musculus transversus perinei superficialis & profundus", description: "Stabiliserer mellomkjøttet og støtter de andre bekkenbunnsmusklene. Viktig for koordinert funksjon ved vannlating og avføring." },
        { name: "Musculus sphincter urethrae", description: "Lukkemuskel rundt urinrøret som kontrollerer vannlatingen. Svakhet forårsaker urinlekkasje, mens spenninger kan gi tømmingsproblemer." }
      ]
    }
  },
  en: {
    title: "Anatomy",
    subtitle: "Learn about pelvic floor anatomy and function",
    overview: {
      title: "Pelvic floor anatomy and function",
      description: "The pelvic floor is a complex structure that plays an important role in urination, defecation, and sexuality. Here you can learn about the different parts of the pelvic floor and how they work together.",
      imageAlt: "Pelvic floor anatomy",
      videoTitle: "Pelvic floor anatomy - Instructional video",
      musclesTitle: "The pelvic floor consists of the following muscles:",
      muscles: [
        { name: "Musculus levator ani", description: "Main muscle supporting pelvic organs. Weakness can lead to urinary incontinence, fecal incontinence, emptying problems, and pelvic organ prolapse." },
        { name: "Musculus coccygeus", description: "Supports the pelvic floor with levator ani. Important for stability and control during physical activity and pregnancy." },
        { name: "Musculus sphincter ani externus", description: "External anal sphincter. Controls bowel movements and prevents fecal incontinence. Can be damaged during childbirth or surgery." },
        { name: "Musculus bulbospongiosus", description: "Important for sexual function and emptying the urethra. Also helps prevent urinary dribbling after urination." },
        { name: "Musculus ischiocavernosus", description: "Supports sexual function and contributes to pelvic floor stability. Can be affected by chronic pelvic pain." },
        { name: "Musculus transversus perinei superficialis & profundus", description: "Stabilizes the perineum and supports other pelvic floor muscles. Important for coordinated function during urination and defecation." },
        { name: "Musculus sphincter urethrae", description: "Sphincter around the urethra controlling urination. Weakness causes urinary incontinence, while tension can cause emptying problems." }
      ]
    }
  }
} as const

export const Anatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = ANATOMY_DATA[language]

  return (
    <>
      <Header />
      <div className={`${styles.anatomyPage} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>{data.title}</h1>
              <p className={styles.pageSubtitle}>{data.subtitle}</p>
            </div>
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            <div className={styles.overviewSection}>
              <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                  <h2 className={styles.heroTitle}>{data.overview.title}</h2>
                  <p className={styles.heroDescription}>{data.overview.description}</p>
                </div>
                <div className={styles.heroImage}>
                  <img src="/imagePelvic-2.png" alt={data.overview.imageAlt} />
                </div>
              </div>

              {/* YouTube Video Section */}
              <div className={styles.videoSection}>
                <h3 className={styles.videoTitle}>{data.overview.videoTitle}</h3>
                <div className={styles.videoContainer}>
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/hPXslUyO1As"
                    title={data.overview.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoIframe}
                  ></iframe>
                </div>
              </div>

              {/* Pelvic Floor Muscles */}
              <div className={styles.generalInfo}>
                <h3 className={styles.musclesTitle}>{data.overview.musclesTitle}</h3>
                <div className={styles.infoGrid}>
                  {data.overview.muscles.map((muscle, index) => (
                    <div key={index} className={styles.infoCard}>
                      <div className={styles.muscleIcon}>💪</div>
                      <h4>{muscle.name}</h4>
                      {muscle.description && <p>{muscle.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Anatomy
