import { Card, CardContent } from "./ui/Card"
import { Separator } from "./ui/Separator"
import { useLanguage } from "./../context/LanguageContext"
import { useNavigate } from "react-router-dom"
import styles from "./hero-section.module.css"
import Logo from "/logopelvic.png"
import type React from "react"
import { getImageUrl } from "../lib/directus"

interface HealthCondition {
  id: string | number
  titleKey: string
  icon: string
  secondaryIcon?: string
  route: string
  isCms?: boolean
}

interface HeroSectionProps {
  cmsData?: {
    title: string;
    description: string;
    subtitle: string;
    conditions?: {
      title: string;
      slug: string;
      icon: string;
    }[];
  };
}

// Structured bilingual data for Hero section
const HERO_DATA = {
  no: {
    title: "Velkommen til Bekkenbunnsportalen.no",
    description: "Dette er en kompetanseportal hvor du finner faglig oppdatert og kvalitetssikret informasjon om ulike tilstander, utredning og behandling innen inkontinens og bekkenbunnsykdom hos både kvinner og menn.",
    subtitle: "Bekkenbunnsportalen presenteres av Nasjonalt senter for Bekkenbunnshelse (NBH)",
    conditions: {
      urinaryIncontinence: "Urinlekkasje",
      urinaryRetention: "Tømmingsproblemer for urin",
      fecalIncontinence: "Avføringslekkasje",
      constipation: "Tømmingsproblemer og forstoppelse for avføring",
      pelvicPain: "Langvarige underlivssmerter",
      pregnancy: "Plager under graviditet og etter fødsel"
    }
  },
  en: {
    title: "Welcome to the Pelvic Floor Portal",
    description: "This is a knowledge portal where you will find up-to-date, quality-assured information on conditions, assessment and treatment within incontinence and pelvic floor disorders for both women and men. Here we include that the portal applies to both genders.",
    subtitle: "Presented by the National Center for Pelvic Floor Health (NBH)",
    conditions: {
      urinaryIncontinence: "Urinary Incontinence",
      urinaryRetention: "Urinary Retention",
      fecalIncontinence: "Fecal Incontinence",
      constipation: "Constipation",
      pelvicPain: "Pelvic Pain",
      pregnancy: "Pregnancy & Postpartum"
    }
  }
} as const

export const HeroSection = ({ cmsData }: HeroSectionProps) => {
  const { language } = useLanguage()
  const navigate = useNavigate()

  const staticData = HERO_DATA[language]

  const title = cmsData?.title || staticData.title
  const description = cmsData?.description || staticData.description
  const subtitle = cmsData?.subtitle || staticData.subtitle

  const healthConditions: HealthCondition[] = (cmsData?.conditions && cmsData.conditions.length > 0) ?
    cmsData.conditions.map((c, i) => ({
      id: `cms-${i}`,
      titleKey: c.title,
      icon: getImageUrl(c.icon),
      route: c.slug,
      isCms: true
    })) : [
      {
        id: 1,
        titleKey: staticData.conditions.urinaryIncontinence,
        icon: "/image-7.svg",
        route: "urinary-incontinence",
      },
      {
        id: 2,
        titleKey: staticData.conditions.urinaryRetention,
        icon: "/vector.svg",
        route: "urinary-retention",
      },
      {
        id: 3,
        titleKey: staticData.conditions.fecalIncontinence,
        icon: "/fecalincontinence.svg",
        route: "fecal-incontinence",
      },
      {
        id: 4,
        titleKey: staticData.conditions.constipation,
        icon: "/constipation.svg",
        route: "constipation",
      },
      {
        id: 5,
        titleKey: staticData.conditions.pelvicPain,
        icon: "/belly--1--1.svg",
        route: "pelvic-pain",
      },
      {
        id: 6,
        titleKey: staticData.conditions.pregnancy,
        icon: "/vector-2.svg",
        route: "pregnancy",
      },
    ]

  const handleConditionClick = (route: string) => {
    navigate(`/conditions/${route}`)
  }

  // Safely resolve a translated title, with fallback
  const getSafeTitle = (titleKey: string): string => {
    if (!titleKey || typeof titleKey !== "string") return "Mangler tittel"
    const trimmed = titleKey.trim()
    if (trimmed.length === 0) return "Mangler tittel"
    return trimmed
  }

  // Format long condition titles onto two lines at meaningful joiners
  const formatConditionTitle = (title: string): React.ReactNode => {
    const safe = getSafeTitle(title)

    // Specific 3-line formatting for the long constipation title
    // "Tømmingsproblemer og forstoppelse for avføring" ->
    // 1) "Tømmingsproblemer og"  2) "forstoppelse for"  3) "avføring"
    if (safe.toLowerCase() === "tømmingsproblemer og forstoppelse for avføring") {
      return (
        <>
          <span>Tømmingsproblemer og</span>
          <br />
          <span>forstoppelse for</span>
          <br />
          <span>avføring</span>
        </>
      )
    }

    // Generic: split at " og " keeping it on line 1, then try to split the rest at the last space
    const ogIndex = safe.indexOf(" og ")
    if (ogIndex >= 0) {
      const line1 = safe.slice(0, ogIndex + 3).trim() // include "og"
      const rest = safe.slice(ogIndex + 3).trim()

      // If the rest contains multiple words, break before the last word (to keep the last word alone)
      const lastSpace = rest.lastIndexOf(" ")
      if (lastSpace > 0) {
        const line2 = rest.slice(0, lastSpace).trim()
        const line3 = rest.slice(lastSpace).trim()
        return (
          <>
            <span>{line1}</span>
            <br />
            <span>{line2}</span>
            <br />
            <span>{line3}</span>
          </>
        )
      }

      return (
        <>
          <span>{line1}</span>
          <br />
          <span>{rest}</span>
        </>
      )
    }

    // Otherwise split at " for ", keeping "for ..." on line 2
    const forIndex = safe.indexOf(" for ")
    if (forIndex >= 0) {
      const line1 = safe.slice(0, forIndex).trim()
      const line2 = safe.slice(forIndex).trim() // starts with "for"
      return (
        <>
          <span>{line1}</span>
          <br />
          <span>{line2}</span>
        </>
      )
    }
    return safe
  }

  const renderConditionIcon = (condition: HealthCondition, altText: string) => {
    if (condition.secondaryIcon) {
      return (
        <div className={styles.heroCardImageContainer}>
          <img
            className={styles.heroCardImage}
            alt={altText}
            src={condition.icon || "/placeholder.svg"}
          />
          <img
            className={styles.heroCardSecondaryImage}
            alt="Secondary icon"
            src={condition.secondaryIcon || "/placeholder.svg"}
            style={{ width: "24px", height: "24px" }}
          />
        </div>
      )
    }
    return (
      <img
        className={styles.heroCardImage}
        alt={altText}
        src={condition.icon || "/placeholder.svg"}
        style={{ width: "84px", height: "96px", objectFit: "contain" }}
      />
    )
  }

  return (
    <div className={`${styles.heroWrapper} ${styles.glassContainer}`}>
      <section className={styles.heroSection} aria-label="Hovedseksjon med informasjon om bekkenbunnshelse">
        <div className={styles.heroContent}>
          <div className={styles.heroTitleGroup}>
            <img
              src={Logo || "/placeholder.svg"}
              alt="Bekkenbunnsportalen"
              className={styles.logo}
            />
            <div className={styles.heroTitleRow}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleLine1}>
                  {language === 'no' ? 'Velkommen til' : 'Welcome to the'}
                </span>
                <span className={styles.heroTitleLine2}>
                  {language === 'no' ? 'Bekkenbunnsportalen.no' : 'Pelvic Floor Portal'}
                </span>
                {/* Fallback override if title from CMS is different in structure */}
                {title && title !== staticData.title && (
                  <span style={{ display: 'none' }}>{title}</span>
                )}
              </h1>
            </div>
          </div>
          <div className={styles.heroDescription}>
            <p className={styles.heroDescriptionText}>{description}</p>
            <p className={styles.heroSubtitle}>{subtitle}</p>
          </div>
        </div>

        <div className={styles.heroCardsGrid}>
          {healthConditions.map((condition) => (
            <Card
              key={condition.id}
              className={styles.heroCard}
              onClick={() => handleConditionClick(condition.route)}
              role="button"
              tabIndex={0}
              aria-label={`${getSafeTitle(condition.titleKey)} - Klikk for å lese mer om denne tilstanden`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleConditionClick(condition.route)
                }
              }}
            >
              <CardContent className={styles.heroCardContent}>
                <figure className={styles.heroCardFigure}>
                  <div className={styles.heroCardIcon}>{renderConditionIcon(condition, getSafeTitle(condition.titleKey))}</div>
                  <Separator className={styles.heroCardSeparator} aria-hidden="true" />
                  <figcaption className={styles.heroCardTitleText}>{formatConditionTitle(getSafeTitle(condition.titleKey))}</figcaption>
                </figure>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
