import { Button } from "./ui/Button"
import { translations } from "../translations/translations"
import styles from "./conference-section.module.css"

interface ConferenceSectionProps {
  cmsData?: {
    title: string;
    subtitle: string;
    description: string;
    date: string;
    location: string;
    url: string;
  };
}

export const ConferenceSection = ({ cmsData }: ConferenceSectionProps) => {
  // Conference section is English-only by default in translations
  const t = translations['en']

  const title = cmsData?.title || t["conference.title"]
  const subtitle = cmsData?.subtitle || t["conference.subtitle"]
  const description = cmsData?.description || t["conference.description"]
  const date = cmsData?.date || t["conference.dates"]
  const location = cmsData?.location || t["conference.location"]
  const url = cmsData?.url || 'https://apfm.no'

  // Extract day from date string for the icon if possible
  const dayMatch = date.match(/\d+/)
  const displayDay = dayMatch ? dayMatch[0] : "17"

  return (
    <section className={styles.conferenceSection}>
      <div className={styles.conferenceContent}>
        <h2 className={styles.conferenceTitle}>{title}</h2>
        <p className={styles.conferenceSubtitle}>{subtitle}</p>
        <p className={styles.conferenceDescription}>{description}</p>

        <div className={styles.conferenceButtons}>
          <Button
            variant="outline"
            className={styles.conferenceLearnButton}
            onClick={() => window.open(url, '_blank')}
          >
            {t["conference.learnMore"]}
          </Button>
        </div>
      </div>

      <div className={styles.conferenceCardsContainer}>
        <div className={styles.conferenceCard}>
          <div className={styles.conferenceIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" fill="white" />
            </svg>
          </div>
          <h3 className={styles.conferenceYear}>{t["conference.year"]}</h3>
          <p className={styles.conferenceArctic}>{t["conference.arctic"]}</p>
        </div>

        <div className={styles.conferenceDateCard}>
          <div className={styles.conferenceDateContainer}>
            <div className={styles.conferenceDateIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" fill="white" />
                <text x="12" y="16" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">{displayDay}</text>
              </svg>
            </div>
            <span className={styles.conferenceDate}>{date}</span>
          </div>
        </div>

        <div className={styles.conferenceDetailsCard}>
          <div className={styles.conferenceDetail}>
            <span className={styles.conferenceDetailIcon}>📍</span>
            <span className={styles.conferenceDetailLabel}>{location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}