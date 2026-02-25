import { useLanguage } from "../context/LanguageContext";
import styles from "./elearning-section.module.css";
import { getImageUrl } from "../lib/directus";

const ELEARNING_DATA = {
  no: {
    title: "Pasientundervisning",
    description: "Her finner du filmer, lydfiler og brosjyrer.",
    button: "Se mer",
    imageAlt: "Pasientundervisning"
  },
  en: {
    title: "Patient Education",
    description: "Here you will find videos, audio files and brochures.",
    button: "See more",
    imageAlt: "Patient education"
  }
} as const;

interface ElearningSectionProps {
  overVideo?: boolean;
  cmsData?: {
    title: string;
    description: string;
    buttonText?: string;
    image?: string;
    thumbnail?: string;
  };
}

export const ElearningSection = ({ overVideo = false, cmsData }: ElearningSectionProps) => {
  const { language } = useLanguage();
  const staticData = ELEARNING_DATA[language];

  const title = cmsData?.title || staticData.title;
  const description = cmsData?.description || staticData.description;
  const buttonLabel = cmsData?.buttonText || staticData.button;
  const imageUrl = cmsData?.image
    ? getImageUrl(cmsData.image)
    : cmsData?.thumbnail
      ? getImageUrl(cmsData.thumbnail)
      : "https://www.bekkenbunnsportalen.no/wp-content/uploads/2022/10/AdobeStock_259480195_mobil-short-v3-scaled.jpg";

  return (
    <div className={`${styles.contentWrapper} ${overVideo ? styles.overVideo : ''}`}>
      {/* Left side with text and button */}
      <div className={styles.leftContent}>
        <h2 className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>
          {description}
        </p>
        <button
          className={styles.moreButton}
          onClick={() => window.location.href = '/useful?tab=pasientundervisning'}
        >
          {buttonLabel}
        </button>
      </div>

      {/* Right side with image */}
      <div className={styles.rightContent}>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={staticData.imageAlt}
            className={styles.patientImage}
          />
        </div>
      </div>
    </div>
  );
};