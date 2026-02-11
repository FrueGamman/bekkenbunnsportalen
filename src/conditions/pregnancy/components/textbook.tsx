"use client"
import { useEffect } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Import individual textbook section components
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

export const Textbook = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const titles = SECTION_TITLES[language]

  // Handle hash-based navigation to open specific accordion and scroll to it
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        // IDs of all top-level accordions in the textbook
        const topLevelIds = [
          'pelvic-floor',
          'pelvis-pregnancy',
          'delivery-method',
          'birth-tears',
          'prolapse',
          'bladder-function',
          'bowel-function',
          'intercourse',
          'female-circumcision',
          'seek-help'
        ];

        // Check if the hash refers to a nested section within one of these
        const parentId = topLevelIds.find(id => hash.startsWith(`${id}-`) && hash !== id);

        if (parentId) {
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
          {/* Main sections as accordions */}
          <SectionAccordion
            id="pelvic-floor"
            title={titles.pelvicFloor}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <PelvicFloorSection />
          </SectionAccordion>

          <SectionAccordion
            id="pelvis-pregnancy"
            title={titles.pelvisPregnancy}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <PelvisPregnancySection />
          </SectionAccordion>

          <SectionAccordion
            id="delivery-method"
            title={titles.deliveryMethod}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <DeliveryMethodSection />
          </SectionAccordion>

          <SectionAccordion
            id="birth-tears"
            title={titles.birthTears}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <BirthTearsSection />
          </SectionAccordion>

          <SectionAccordion
            id="prolapse"
            title={titles.prolapse}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <ProlapseSection />
          </SectionAccordion>

          <SectionAccordion
            id="bladder-function"
            title={titles.bladderFunction}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <BladderFunctionSection />
          </SectionAccordion>

          <SectionAccordion
            id="bowel-function"
            title={titles.bowelFunction}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <BowelFunctionSection />
          </SectionAccordion>

          <SectionAccordion
            id="intercourse"
            title={titles.intercourse}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <IntercourseSection />
          </SectionAccordion>

          <SectionAccordion
            id="female-circumcision"
            title={titles.femaleCircumcision}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <FemaleCircumcisionSection />
          </SectionAccordion>

          <SectionAccordion
            id="seek-help"
            title={titles.seekHelp}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <SeekHelpSection />
          </SectionAccordion>
        </div>
      </div>
    </div>
  )
}

