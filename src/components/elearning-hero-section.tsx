import { useLanguage } from "../context/LanguageContext"
import { translations } from "../translations/translations"
import { getImageUrl } from "../lib/directus"
import styles from "./elearning-hero-section.module.css"

interface ElearningHeroSectionProps {
  cmsData?: {
    title: string;
    description: string;
    buttonText?: string;
    url?: string;
    image?: string;
  };
}

export const ElearningHeroSection = ({ cmsData }: ElearningHeroSectionProps) => {
  const { language } = useLanguage()
  const t = translations[language]

  if (!cmsData?.title && !cmsData?.description) {
    return null
  }

  const imageUrl = cmsData?.image ? getImageUrl(cmsData.image) : "/vector-logo.png"
  const courseUrl = cmsData?.url || "https://helsekompetanse.no/course/view.php?id=233"
  const buttonLabel = cmsData?.buttonText || t["elearning.hero.buttonText"]

  return (
    <div className={styles.elearningSection}>
      <div className={styles.elearningContainer}>
        <div className={styles.elearningContent}>
          <div className={styles.elearningImage}>
            <img
              src={imageUrl}
              alt={t["elearning.hero.imageAlt"]}
              className={styles.elearningImageFile}
            />
          </div>
          <div className={styles.elearningText}>
            {cmsData.title && (
              <h2 className={styles.elearningTitle}>
                {cmsData.title}
              </h2>
            )}
            {cmsData.description && (
              <p className={styles.elearningDescription}>
                {cmsData.description}
              </p>
            )}
            <a
              href={courseUrl}
              className={styles.elearningButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
