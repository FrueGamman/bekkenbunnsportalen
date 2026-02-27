import { useLanguage } from "../context/LanguageContext"
import { translations } from "../translations/translations"
import { getImageUrl } from "../lib/directus"
import styles from "./conference-section.module.css"

interface ConferenceSectionProps {
  cmsData?: {
    title: string
    subtitle: string
    description: string
    buttonText: string
    date: string
    location: string
    url: string
    image: string
  }
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
    </svg>
  )
}

export const ConferenceSection = ({ cmsData }: ConferenceSectionProps) => {
  const { language } = useLanguage()
  const t = translations[language]

  const title = cmsData?.title ?? t["conference.title"]
  const subtitle = cmsData?.subtitle ?? t["conference.subtitle"]
  const description = cmsData?.description ?? t["conference.description"]
  const date = cmsData?.date ?? t["conference.dates"]
  const location = cmsData?.location ?? t["conference.location"]
  const url = (cmsData?.url?.trim()) || "https://apfm.no"
  const imageUrl = cmsData?.image ? getImageUrl(cmsData.image) : ""
  const year = cmsData?.date?.match(/\d{4}/)?.[0] ?? t["conference.year"]
  const eventName = t["conference.arctic"]

  /* Same left-to-right gradient as CSS so overlay applies to CMS image too */
  const overlayGradient =
    "linear-gradient(90deg, rgba(5,56,112,0.68) 0%, rgba(5,56,112,0.48) 25%, rgba(5,56,112,0.32) 50%, rgba(5,56,112,0.14) 75%, rgba(5,56,112,0.02) 100%)"
  const bannerStyle = imageUrl
    ? { backgroundImage: `${overlayGradient}, url(${imageUrl})` }
    : undefined

  return (
    <section
      className={styles.banner}
      aria-labelledby="conference-panel-title"
    >
      <div
        className={styles.bannerBg}
        style={bannerStyle}
        aria-hidden="true"
      />
      <div className={styles.bannerInner}>
        <div className={styles.leftPanel}>
          <span className={styles.year}>{year}</span>
          <span className={styles.eventName}>{eventName}</span>
          <span className={styles.separator} aria-hidden="true" />
          <div className={styles.metaRow}>
            <CalendarIcon className={styles.metaIcon} />
            <span className={styles.metaText}>{date}</span>
          </div>
          <span className={styles.separator} aria-hidden="true" />
          <div className={styles.metaRow}>
            <MapPinIcon className={styles.metaIcon} />
            <span className={styles.metaText}>{location}</span>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <h2 id="conference-panel-title" className={styles.panelTitle}>
            {title}
          </h2>
          <p className={styles.panelSubtitle}>{subtitle}</p>
          <p className={styles.panelDescription}>{description}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            More info
          </a>
        </div>
      </div>
    </section>
  )
}
