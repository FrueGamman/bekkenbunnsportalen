"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"
import { usePregnancyData } from "../../../hooks/usePregnancyData"
import type { PregnancyChapter } from "../../../types/cms"

// Import individual textbook section components (same design as original; accept optional data from Directus)
import { TextbookIntro } from "./textbook/textbook-intro"
import { PelvicFloorSection } from "./textbook/pelvic-floor-section"
import { PelvisPregnancySection } from "./textbook/pelvis-pregnancy-section"
import { DeliveryMethodSection } from "./textbook/delivery-method-section"
import { BirthTearsSection } from "./textbook/birth-tears-section"
import { ProlapseSection } from "./textbook/prolapse-section"
import { BladderFunctionSection } from "./textbook/bladder-function-section"
import { BowelFunctionSection } from "./textbook/bowel-function-section"
import { IntercourseSection } from "./textbook/intercourse-section"
import { FemaleCircumcisionSection } from "./textbook/female-circumcision-section"
import { SeekHelpSection } from "./textbook/seek-help-section"

// Import section titles for accordion headers
const SECTION_TITLES = {
  no: {
    pageTitle: "Lærebok",
    pelvicFloor: "Bekkenbunnen",
    pelvisPregnancy: "Underlivet i graviditeten",
    deliveryMethod: "Forløsningsmetode",
    birthTears: "Fødselsrifter",
    prolapse: "Underlivsframfall/prolaps",
    bladderFunction: "Blærefunksjon",
    bowelFunction: "Tarmfunksjon",
    intercourse: "Samleie",
    femaleCircumcision: "Kvinnelig omskjæring",
    seekHelp: "Søk hjelp"
  },
  en: {
    pageTitle: "Textbook",
    pelvicFloor: "Pelvic Floor",
    pelvisPregnancy: "The Genital Area During Pregnancy",
    deliveryMethod: "Delivery Method",
    birthTears: "Birth Tears",
    prolapse: "Pelvic Organ Prolapse",
    bladderFunction: "Bladder Function",
    bowelFunction: "Bowel Function",
    intercourse: "Intercourse",
    femaleCircumcision: "Female Circumcision",
    seekHelp: "Seek Help"
  }
} as const

const CHAPTER_IDS = [
  "pelvic-floor",
  "pelvis-pregnancy",
  "delivery-method",
  "birth-tears",
  "prolapse",
  "bladder-function",
  "bowel-function",
  "intercourse",
  "female-circumcision",
  "seek-help",
] as const

export const Textbook = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const { language: lang } = useLanguage()
  const { data: pregnancyData } = usePregnancyData(lang)
  const chapters = (pregnancyData?.chapters ?? []) as PregnancyChapter[]
  const titles = SECTION_TITLES[language]

  const getChapter = (index: number) => chapters[index]
  const getTitle = (index: number, key: keyof typeof SECTION_TITLES.no) => {
    const ch = getChapter(index)
    if (ch?.title_no != null) return language === "en" && ch.title_en ? ch.title_en : ch.title_no
    return titles[key]
  }
  const getData = (index: number): { dataNo?: unknown; dataEn?: unknown } => {
    const ch = getChapter(index)
    if (ch?.data_no != null && ch?.data_en != null) return { dataNo: ch.data_no, dataEn: ch.data_en }
    return {}
  }

  // Handle hash-based navigation to open specific accordion and scroll to it
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        const topLevelIds = CHAPTER_IDS as readonly string[]

        const closeOtherAccordions = (keepId: string) => {
          topLevelIds.forEach((id) => {
            if (id === keepId) return
            const container = document.getElementById(id)
            if (!container) return
            const button = container.querySelector('button')
            if (button && button.getAttribute('aria-expanded') === 'true') {
              button.click()
            }
          })
        }

        // Check if the hash refers to a nested section within one of these
        const parentId = topLevelIds.find(id => hash.startsWith(`${id}-`) && hash !== id);

        if (parentId) {
          closeOtherAccordions(parentId)
          const parentAccordion = document.getElementById(parentId)
          if (parentAccordion) {
            const button = parentAccordion.querySelector('button')
            if (button && button.getAttribute('aria-expanded') === 'false') {
              button.click()
            }
          }
          // We return here because the nested SectionAccordion will handle its own 
          // opening and scrolling once it's rendered.
          return;
        }

        // Standard top-level accordion handling
        const element = document.getElementById(hash)
        if (element) {
          closeOtherAccordions(hash)
          const accordionContainer = element.closest(`.${styles.accordionContainer}`) || element
          if (accordionContainer) {
            const button = accordionContainer.querySelector('button')
            if (button && button.getAttribute('aria-expanded') === 'false') {
              button.click()
            }
            setTimeout(() => {
              const offset = 100
              const elementPosition = accordionContainer.getBoundingClientRect().top + window.pageYOffset
              window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
              })
            }, 100)
          }
        }
      }
    }

    // Wait a bit for initial render
    setTimeout(handleHashNavigation, 200)
    window.addEventListener('hashchange', handleHashNavigation)
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  return (
    <div id="textbook" className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="Textbook" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{titles.pageTitle}</h2>
      </div>

      <div className={styles.sectionContent}>
        {/* Introduction */}
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <TextbookIntro />
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          {/* Same design as original; data from Directus (chapters[].data_no / data_en) when set, else fallback to hardcoded */}
          <SectionAccordion id={CHAPTER_IDS[0]} title={getTitle(0, "pelvicFloor")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <PelvicFloorSection {...getData(0)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[1]} title={getTitle(1, "pelvisPregnancy")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <PelvisPregnancySection {...getData(1)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[2]} title={getTitle(2, "deliveryMethod")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <DeliveryMethodSection {...getData(2)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[3]} title={getTitle(3, "birthTears")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <BirthTearsSection {...getData(3)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[4]} title={getTitle(4, "prolapse")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <ProlapseSection {...getData(4)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[5]} title={getTitle(5, "bladderFunction")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <BladderFunctionSection {...getData(5)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[6]} title={getTitle(6, "bowelFunction")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <BowelFunctionSection {...getData(6)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[7]} title={getTitle(7, "intercourse")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <IntercourseSection {...getData(7)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[8]} title={getTitle(8, "femaleCircumcision")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <FemaleCircumcisionSection {...getData(8)} />
          </SectionAccordion>
          <SectionAccordion id={CHAPTER_IDS[9]} title={getTitle(9, "seekHelp")} isDarkMode={resolvedTheme === 'dark'} defaultOpen={false}>
            <SeekHelpSection {...getData(9)} />
          </SectionAccordion>
        </div>
      </div>
    </div>
  )
}

