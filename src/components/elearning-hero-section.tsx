import { useLanguage } from "../context/LanguageContext"
import { translations } from "../translations/translations"
import styles from "./elearning-hero-section.module.css"

interface ElearningHeroSectionProps {
  cmsData?: {
    title: string;
    description: string;
  };
}

export const ElearningHeroSection = ({ cmsData }: ElearningHeroSectionProps) => {
  const { language } = useLanguage()
  const t = translations[language]

  const title = cmsData?.title || t["elearning.hero.title"]
  const description = cmsData?.description || t["elearning.hero.description"]

  return (
    <div className={styles.elearningSection}>
      <div className={styles.elearningContainer}>
        <div className={styles.elearningContent}>
          <div className={styles.elearningImage}>
            <img
              src="/vector-logo.png"
              alt={t["elearning.hero.imageAlt"]}
              className={styles.elearningImageFile}
            />
          </div>
          <div className={styles.elearningText}>
            <h2 className={styles.elearningTitle}>
              {title}
            </h2>
            <p className={styles.elearningDescription}>
              {description}
            </p>
            <a
              href="https://helsekompetanse.no/course/view.php?id=233"
              className={styles.elearningButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t["elearning.hero.buttonText"]}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
