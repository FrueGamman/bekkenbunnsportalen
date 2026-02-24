import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import { getImageUrl } from "../lib/directus"
import styles from "./try-exercise-section.module.css"

const EXERCISE_SECTION_DATA = {
  no: {
    title: "Bekkenbunnsøvelser",
    subtitle: "Lær å styrke bekkenbunnen med målrettede øvelser",
    description: "Bekkenbunnen består av muskler som støtter underlivsorganene. Regelmessig trening kan forebygge og behandle plager.",
    buttonText: "Les mer",
    physioButtonText: "Finn fysioterapeut",
  },
  en: {
    title: "Pelvic Floor Exercises",
    subtitle: "Learn to strengthen the pelvic floor with targeted exercises",
    description: "The pelvic floor consists of muscles that support the pelvic organs. Regular training can prevent and treat problems.",
    buttonText: "Read more",
    physioButtonText: "Find physiotherapist",
  }
} as const

interface TryExerciseSectionProps {
  cmsData?: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    physioButtonText: string;
    physioLink: string;
    image: string;
  };
}

export const TryExerciseSection = ({ cmsData }: TryExerciseSectionProps) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const navigate = useNavigate()

  const staticData = EXERCISE_SECTION_DATA[language]

  const title = cmsData?.title || staticData.title
  const subtitle = cmsData?.subtitle || staticData.subtitle
  const description = cmsData?.description || staticData.description
  const physioButtonText = cmsData?.physioButtonText || staticData.physioButtonText
  const physioLink = cmsData?.physioLink || "https://fysio.no/kvinnehelse"
  const imageUrl = cmsData?.image ? getImageUrl(cmsData.image) : "/media/image/bekkenbunn.jpg"

  // removed "Les mer" button; keep CTA to Øvelse tab on Useful
  const handleSeeUsefulExercises = () => {
    navigate('/useful?tab=ovelse')
  }

  return (
    <section className={`${styles.tryExerciseSection} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Image on the left */}
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                src={imageUrl}
                alt="Pelvic floor exercises"
                className={styles.mainImage}
              />
              <div className={styles.decorativeCircle1}></div>
              <div className={styles.decorativeCircle2}></div>
            </div>
          </div>

          {/* Text content on the right */}
          <div className={styles.textContent}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <p className={styles.description}>{description}</p>


            <div className={styles.buttonGroup}>
              <button
                className={styles.startButton}
                onClick={handleSeeUsefulExercises}
              >
                {cmsData?.buttonText || staticData.buttonText}
              </button>

              <a
                href={physioLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.physioButton}
              >
                {physioButtonText}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}