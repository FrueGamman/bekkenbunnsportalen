"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./pregnancy-overview.module.css"

interface PregnancyOverviewProps {
  onNavigate: (section: string, subsection?: string) => void
}

export const PregnancyOverview = ({ onNavigate }: PregnancyOverviewProps) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const handleCardClick = (id: string) => {
    onNavigate(id)
    setTimeout(() => {
      document.getElementById('preg-overview-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const content = language === 'no' ? {
    hero: {
      title: "Under graviditet og fødsel skjer det endringer i bekkenbunnen som kan påvirke naturlige funksjoner som vannlatning, avføring og seksualfunksjon.",
      description: "De fleste endringene er vanlige og vil normalisere seg selv. Noen endringer kan oppleves plagsomme og trenger en mer aktiv tilnærming, enten igjennom tiltak du kan gjøre selv eller gjennom oppfølging av helsevesenet. Dersom plagene går ut over daglige gjøremål og livskvalitet bør du søke hjelp. På disse sidene finnes oversikt over vanlige plager, råd og behandling.",
      note: "Læreboken inneholder utfyllende og samlet informasjon.",
      image: {
        src: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/topp2-1024x514.jpg",
        alt: "Gravid kvinne med hånden på magen",
        caption: "Endringer i bekkenbunnen under graviditet er vanlige"
      }
    },
    cards: [
      {
        id: "common-problems",
        title: "Vanlige plager",
        icon: "/famicons_people-outline(1).png",
        description: "Informasjon om vanlige underlivsplager under graviditet og etter fødsel",
        color: "#4A90E2"
      },
      {
        id: "textbook",
        title: "Lærebok",
        icon: "/resource.png",
        description: "Utfyllende informasjon om bekkenbunnen, anatomi og funksjon",
        color: "#7B68EE"
      },
      {
        id: "exercises",
        title: "Bekkenbunnstrening",
        icon: "/exercises.png",
        description: "Lær riktig teknikk for bekkenbunnstrening",
        color: "#50C878"
      },
      {
        id: "resources",
        title: "Søk hjelp",
        icon: "/resource.png",
        description: "Finn ressurser og informasjon om hvor du kan søke hjelp",
        color: "#FF6B6B"
      }
    ],
    quick: {
      commonProblemsTitle: "Vanlige plager",
      commonProblems: [
        "Urinlekkasje",
        "Avføringslekkasje",
        "Forstoppelse",
        "Hemoroider",
        "Smertefull avføring",
        "Hastverkstrang",
        "Urinveisinfeksjon",
        "Tyngdefølelse og prolaps",
        "Fødselsrift",
        "Samleie"
      ],
      textbookTitle: "Lærebok",
      textbook: [
        "Bekkenbunnen",
        "Underlivet i graviditeten",
        "Forløsningsmetode",
        "Fødselsrifter",
        "Underlivsframfall / prolaps",
        "Blærefunksjon",
        "Tarmfunksjon",
        "Samleie",
        "Kvinnelig omskjæring",
        "Søk hjelp",
        "Referanser"
      ]
    }
  } : {
    hero: {
      title: "During pregnancy and childbirth, changes occur in the pelvic floor that can affect natural functions such as urination, bowel movements, and sexual function.",
      description: "Most changes are normal and will normalize on their own. Some changes can be troublesome and require a more active approach, either through self-care measures or through healthcare follow-up. If the problems affect daily activities and quality of life, you should seek help. These pages provide an overview of common problems, advice, and treatment.",
      note: "The textbook contains comprehensive and collected information.",
      image: {
        src: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/topp2-1024x514.jpg",
        alt: "Pregnant woman with hand on belly",
        caption: "Changes in the pelvic floor during pregnancy are common"
      }
    },
    cards: [
      {
        id: "common-problems",
        title: "Common Problems",
        icon: "/famicons_people-outline(1).png",
        description: "Information about common pelvic floor problems during pregnancy and after childbirth",
        color: "#4A90E2"
      },
      {
        id: "textbook",
        title: "Textbook",
        icon: "/resource.png",
        description: "Comprehensive information about the pelvic floor, anatomy and function",
        color: "#7B68EE"
      },
      {
        id: "exercises",
        title: "Pelvic Floor Training",
        icon: "/exercises.png",
        description: "Learn proper technique for pelvic floor exercises",
        color: "#50C878"
      },
      {
        id: "resources",
        title: "Seek Help",
        icon: "/resource.png",
        description: "Find resources and information about where to seek help",
        color: "#FF6B6B"
      }
    ],
    quick: {
      commonProblemsTitle: "Common problems",
      commonProblems: [
        "Urinary incontinence",
        "Fecal incontinence",
        "Constipation",
        "Hemorrhoids",
        "Painful bowel movements",
        "Urgency",
        "Urinary tract infection",
        "Heaviness and prolapse",
        "Perineal tears",
        "Sexual intercourse"
      ],
      textbookTitle: "Textbook",
      textbook: [
        "Pelvic floor",
        "Pelvic area during pregnancy",
        "Delivery method",
        "Perineal tears",
        "Pelvic organ prolapse",
        "Bladder function",
        "Bowel function",
        "Sexual intercourse",
        "Female circumcision",
        "Seek help",
        "References"
      ]
    }
  }

  return (
    <div className={`${styles.overviewContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroLayout}>
          <div className={styles.heroText}>
            <h2 className={styles.heroTitle}>{content.hero.title}</h2>
            <p className={styles.heroDescription}>{content.hero.description}</p>
            <p className={styles.heroNote}>{content.hero.note}</p>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImageContainer}>
              <img
                src={content.hero.image.src}
                alt={content.hero.image.alt}
                className={styles.heroImageElement}
                loading="lazy"
              />
              <p className={styles.heroImageCaption}>{content.hero.image.caption}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <p className={styles.mobileHint}>
        {language === 'no' ? 'Innhold vises under kortene' : 'Content appears below the cards'}
      </p>
      <div className={styles.cardsGrid}>
        {content.cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={styles.card}
            style={{ '--card-color': card.color } as React.CSSProperties}
          >
            <div className={styles.cardIconWrapper}>
              <div className={styles.cardIconCircle}>
                <img 
                  src={card.icon} 
                  alt={card.title}
                  className={styles.cardIcon}
                />
              </div>
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>

            {/* Embed common problems list directly inside the Vanlige plager/Common Problems card */}
            {card.id === 'common-problems' && (
              <ul className={styles.cardList}>
                {content.quick.commonProblems.map((item: string, idx: number) => (
                  <li key={`cpl-${idx}`} className={styles.cardListItem}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </button>
        ))}
      </div>

      {/* Anchor to scroll to when a card is tapped */}
      <div id="preg-overview-content" />

      {/* Quick Sections */}
      <div className={styles.quickSections}>
        <div className={styles.quickSectionCard}>
          <div className={styles.quickSectionHeader}>{content.quick.commonProblemsTitle}</div>
          <ul className={styles.quickList}>
            {content.quick.commonProblems.map((item, idx) => {
              // Map display names to section IDs
              const sectionIdMap: Record<string, string> = {
                'Urinlekkasje': 'urinlekkasje',
                'Avføringslekkasje': 'avforingslekkasje', 
                'Forstoppelse': 'forstoppelse',
                'Hemoroider': 'hemoroider',
                'Smertefull avføring': 'smertefull-avforing',
                'Hastverkstrang': 'hastverkstrang',
                'Urinveisinfeksjon': 'urinveisinfeksjon',
                'Tyngdefølelse og prolaps': 'tyngdefolelse-prolaps',
                'Fødselsrift': 'fodselsrift',
                'Samleie': 'samleie',
                // English mappings
                'Urinary incontinence': 'urinlekkasje',
                'Fecal incontinence': 'avforingslekkasje',
                'Constipation': 'forstoppelse',
                'Hemorrhoids': 'hemoroider',
                'Painful bowel movements': 'smertefull-avforing',
                'Urgency': 'hastverkstrang',
                'Urinary tract infection': 'urinveisinfeksjon',
                'Heaviness and prolapse': 'tyngdefolelse-prolaps',
                'Perineal tears': 'fodselsrift',
                'Sexual intercourse': 'samleie'
              }
              
              const sectionId = sectionIdMap[item] || 'common-problems'
              
              return (
                <li key={`cp-${idx}`} className={styles.quickListItem}>
                  <button
                    type="button"
                    onClick={() => onNavigate('common-problems', sectionId)}
                    className={styles.quickLink}
                    aria-label={`${content.quick.commonProblemsTitle} – ${item}`}
                  >
                    <span>{item}</span>
                    <span className={styles.quickChevron}>›</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.quickSectionCard}>
          <div className={styles.quickSectionHeader}>{content.quick.textbookTitle}</div>
          <ul className={styles.quickList}>
            {content.quick.textbook.map((item, idx) => (
              <li key={`tb-${idx}`} className={styles.quickListItem}>
                <button
                  type="button"
                  onClick={() => onNavigate('textbook')}
                  className={styles.quickLink}
                  aria-label={`${content.quick.textbookTitle} – ${item}`}
                >
                  <span>{item}</span>
                  <span className={styles.quickChevron}>›</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
