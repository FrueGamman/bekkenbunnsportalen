"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./UpgradedPregnancyPage.module.css"

// Import new components
import { PregnancyIconGrid } from "./PregnancyIconGrid"
import { ConditionSection } from "./ConditionSection"

// Import existing data from common-problems
import { COMMON_PROBLEMS_DATA } from "./common-problems-data"

// Map URL-friendly anchor names to actual section IDs
const ANCHOR_TO_SECTION_ID: Record<string, string> = {
  'aforingslekkasje': 'avforingslekkasje', // Support shorter URL-friendly name
  'prolaps': 'tyngdefolelse-prolaps', // Support shorter URL-friendly name
  // Direct mappings for other sections
  'samleie': 'samleie',
  'fodselsrift': 'fodselsrift',
  'urinlekkasje': 'urinlekkasje',
  'forstoppelse': 'forstoppelse',
  'hemoroider': 'hemoroider',
  'smertefull-avforing': 'smertefull-avforing',
  'hastverkstrang': 'hastverkstrang',
  'urinveisinfeksjon': 'urinveisinfeksjon',
}

const PAGE_CONTENT = {
  no: {
    title: "Plager under graviditet og etter fødsel",
    heroTitle: "Under graviditet og fødsel skjer det endringer i bekkenbunnen som kan påvirke naturlige funksjoner som vannlatning, avføring og seksualfunksjon.",
    heroDescription: "De fleste endringene er vanlige og vil normalisere seg selv. Noen endringer kan oppleves plagsomme og trenger en mer aktiv tilnærming, enten igjennom tiltak du kan gjøre selv eller gjennom oppfølging av helsevesenet. Dersom plagene går ut over daglige gjøremål og livskvalitet bør du søke hjelp.",
    heroNote: "Læreboken inneholder utfyllende og samlet informasjon.",
    sectionTitle: "Vanlige plager under graviditet og etter fødsel"
  },
  en: {
    title: "Problems during pregnancy and after childbirth",
    heroTitle: "During pregnancy and childbirth, changes occur in the pelvic floor that can affect natural functions such as urination, bowel movements, and sexual function.",
    heroDescription: "Most changes are normal and will normalize on their own. Some changes can be troublesome and require a more active approach, either through self-care measures or through healthcare follow-up. If the problems affect daily activities and quality of life, you should seek help.",
    heroNote: "The textbook contains comprehensive and collected information.",
    sectionTitle: "Common problems during pregnancy and after childbirth"
  }
} as const

export const UpgradedPregnancyContent = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const content = PAGE_CONTENT[language]
  const problemsData = COMMON_PROBLEMS_DATA[language]
  const hasScrolledRef = useRef(false)

  // Get all valid section IDs
  const validSectionIds = problemsData.sections.map(section => section.id)

  // Get the first section ID as default
  const firstSectionId = validSectionIds[0] || null

  // State to track which section is currently visible - default to first section
  const [selectedSection, setSelectedSection] = useState<string | null>(firstSectionId)

  // Handle hash-based navigation on mount and hash changes
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')

      if (hash) {
        // Map URL-friendly anchor to actual section ID
        // Map URL-friendly anchor to actual section ID and ensure TypeScript safety
        const sectionId = ANCHOR_TO_SECTION_ID[hash] as typeof validSectionIds[number] || hash

        if (validSectionIds.includes(sectionId as (typeof validSectionIds)[number])) {
          setSelectedSection(sectionId as (typeof validSectionIds)[number])

          // Scroll to section - wait for element to be available
          const scrollToSection = (attempts = 0) => {
            const element = document.getElementById(sectionId) || document.getElementById(hash)
            if (element) {
              const offset = 100 // Account for sticky header
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
              window.scrollTo({
                top: elementPosition - offset,
                behavior: hasScrolledRef.current ? 'smooth' : 'auto'
              })
              hasScrolledRef.current = true
            } else if (attempts < 10) {
              // Retry up to 10 times (1 second total) if element not found
              setTimeout(() => scrollToSection(attempts + 1), 100)
            }
          }
          scrollToSection()
        } else {
          // Invalid hash - default to first section
          setSelectedSection(firstSectionId)
          hasScrolledRef.current = false
        }
      } else {
        // No hash - default to first section
        setSelectedSection(firstSectionId)
        hasScrolledRef.current = false
      }
    }

    // Handle initial load
    handleHashNavigation()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation)

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [validSectionIds, firstSectionId])

  // Map section ID to URL-friendly anchor name
  const getAnchorName = (sectionId: string): string => {
    // Find the anchor name that maps to this section ID
    const anchorEntry = Object.entries(ANCHOR_TO_SECTION_ID).find(([_, id]) => id === sectionId)
    return anchorEntry ? anchorEntry[0] : sectionId
  }

  // Handle navigation from icon grid
  const handleSectionNavigation = (sectionId: string) => {
    if (sectionId === '') {
      setSelectedSection(null)
      // Update URL to remove hash
      window.history.pushState(null, '', window.location.pathname + window.location.search)
    } else {
      setSelectedSection(sectionId)
      // Update URL with hash using URL-friendly anchor name
      const anchorName = getAnchorName(sectionId)
      window.history.pushState(null, '', `#${anchorName}`)

      // Scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 100 // Account for sticky header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  // Helper function to render content from existing data structure
  const renderProblemContent = (section: any, tabType: 'about' | 'symptoms' | 'selfHelp' | 'seekHelp') => {
    switch (tabType) {
      case 'about':
        return (
          <div className={styles.tabContent}>
            {section.intro && <p className={styles.contentParagraph}>{section.intro}</p>}
            {section.types && (
              <ul className={styles.contentList}>
                {section.types.map((type: string, idx: number) => (
                  <li key={`type-${idx}`}>{type}</li>
                ))}
              </ul>
            )}
            {section.keyPoints && (
              <ul className={styles.contentList}>
                {section.keyPoints.map((point: string, idx: number) => (
                  <li key={`point-${idx}`} dangerouslySetInnerHTML={{ __html: point }} />
                ))}
              </ul>
            )}
            {section.initialAdvice && (
              <ul className={styles.contentList}>
                {section.initialAdvice.map((advice: string, idx: number) => (
                  <li key={`advice-${idx}`}>{advice}</li>
                ))}
              </ul>
            )}
          </div>
        )

      case 'symptoms': {
        // Get all symptom-related subsections
        const symptomsSubsections = section.subsections?.filter((sub: any) =>
          sub.id.includes('symptoms') || sub.id === 'symptoms'
        )
        return symptomsSubsections && symptomsSubsections.length > 0 ? (
          <div className={styles.tabContent}>
            {symptomsSubsections.map((subsection: any) => (
              <div key={subsection.id} className={styles.subsectionContent}>
                {symptomsSubsections.length > 1 && (
                  <h4 className={styles.subsectionTitle}>{subsection.title}</h4>
                )}
                {subsection.items && (
                  <ul className={styles.contentList}>
                    {subsection.items.map((item: string, itemIdx: number) => (
                      <li key={`${subsection.id}-item-${itemIdx}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null
      }

      case 'selfHelp': {
        // Get all self-help related subsections
        const selfHelpSubsections = section.subsections?.filter((sub: any) =>
          sub.id === 'selfhelp' || sub.id.includes('selfhelp') ||
          (sub.id.includes('advice') && !sub.id.includes('help'))
        )
        return selfHelpSubsections && selfHelpSubsections.length > 0 ? (
          <div className={styles.tabContent}>
            {selfHelpSubsections.map((subsection: any) => (
              <div key={subsection.id} className={styles.subsectionContent}>
                {selfHelpSubsections.length > 1 && (
                  <h4 className={styles.subsectionTitle}>{subsection.title}</h4>
                )}
                {subsection.description && (
                  <p className={styles.contentParagraph}>{subsection.description}</p>
                )}
                {subsection.items && (
                  <ul className={styles.contentList}>
                    {subsection.items.map((item: string, itemIdx: number) => (
                      <li key={`${subsection.id}-item-${itemIdx}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null
      }

      case 'seekHelp': {
        // Get all help-seeking related subsections (excluding advice sections)
        const seekHelpSubsections = section.subsections?.filter((sub: any) =>
          (sub.id === 'seek-help' || sub.id.includes('help')) &&
          !sub.id.includes('selfhelp') && !sub.id.includes('advice')
        )
        return seekHelpSubsections && seekHelpSubsections.length > 0 ? (
          <div className={styles.tabContent}>
            {seekHelpSubsections.map((subsection: any) => (
              <div key={subsection.id} className={styles.subsectionContent}>
                {seekHelpSubsections.length > 1 && (
                  <h4 className={styles.subsectionTitle}>{subsection.title}</h4>
                )}
                {subsection.description && (
                  <p className={styles.contentParagraph}>{subsection.description}</p>
                )}
                {subsection.items && (
                  <ul className={styles.contentList}>
                    {subsection.items.map((item: string, itemIdx: number) => (
                      <li key={`${subsection.id}-item-${itemIdx}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null
      }

      default:
        return null
    }
  }

  return (
    <div className={`${styles.container} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      {/* Hero Section */}
      <section id="oversikt" className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
            <p className={styles.heroDescription}>{content.heroDescription}</p>
          </div>
          <div className={styles.heroImage}>
            <img
              src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/topp2-1024x514.jpg"
              alt="Pregnant woman"
              className={styles.heroImageElement}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>

        {/* Common Problems Section */}
        <section id="vanlige-plager" className={styles.problemsSection}>
          <h2 className={styles.sectionTitle}>{content.sectionTitle}</h2>

          {/* Icon Grid */}
          <PregnancyIconGrid
            language={language}
            onNavigate={handleSectionNavigation}
            selectedSection={selectedSection}
          />

          {/* Problem Sections with Tabs - Show only selected section */}
          {selectedSection && problemsData.sections
            .filter(section => section.id === selectedSection)
            .map((section) => (
              <ConditionSection
                key={section.id}
                id={section.id}
                title={section.title}
                language={language}
                image={(section as any).image ? { src: (section as any).image, alt: section.title } : undefined}
                video={(section as any).video}
                content={{
                  about: renderProblemContent(section, 'about'),
                  symptoms: renderProblemContent(section, 'symptoms'),
                  selfHelp: renderProblemContent(section, 'selfHelp'),
                  seekHelp: renderProblemContent(section, 'seekHelp')
                }}
              />
            ))
          }
        </section>

        {/* Textbook, Resources, and References are intentionally not shown in overview here.
              They are accessible via the page tabs/navigation. */}
      </main>
    </div>
  )
}
