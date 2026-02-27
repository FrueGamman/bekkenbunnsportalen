"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./UpgradedPregnancyPage.module.css"

import { PregnancyIconGrid } from "./PregnancyIconGrid"
import { ConditionSection } from "./ConditionSection"
import type { ConditionPregnancy, PregnancyProblem } from "../../../types/cms"
import { getImageUrl } from "../../../lib/directus"

// Pregnancy content is from Directus only (usePregnancyData). No duplicate hardcoded body content.
// Hardcoded text fallback for empty CMS values or structural labels only:
const PAGE_CONTENT = {
  no: {
    sectionTitle: "Vanlige plager under graviditet og etter fødsel",
  },
  en: {
    sectionTitle: "Common problems during pregnancy and after childbirth",
  }
} as const

interface Props {
  data: ConditionPregnancy | null
}

export const UpgradedPregnancyContent = ({ data }: Props) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const content = PAGE_CONTENT[language]
  const hasScrolledRef = useRef(false)

  // Use CMS data or fallbacks
  const heroTitle = data ? (language === 'en' && data.hero_title_en ? data.hero_title_en : data.hero_title_no) : "";
  const heroDescription = data ? (language === 'en' && data.hero_description_en ? data.hero_description_en : data.hero_description_no) : "";
  const heroImage = data?.hero_image ? getImageUrl(data.hero_image) : "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/topp2-1024x514.jpg";

  const problems = (data?.problems || []) as PregnancyProblem[];

  // Get all valid section IDs based on CMS problems
  const validSectionIds = problems.map(p => p.slug || p.name_en?.toLowerCase().replace(/\s+/g, '-') || `problem-${p.id}`)

  // Get the first section ID as default
  const firstSectionId = validSectionIds[0] || null

  const [selectedSection, setSelectedSection] = useState<string | null>(firstSectionId)

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')

      if (hash) {
        if (validSectionIds.includes(hash)) {
          setSelectedSection(hash)

          const scrollToSection = (attempts = 0) => {
            const element = document.getElementById(hash)
            if (element) {
              const offset = 100
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
              window.scrollTo({
                top: elementPosition - offset,
                behavior: hasScrolledRef.current ? 'smooth' : 'auto'
              })
              hasScrolledRef.current = true
            } else if (attempts < 10) {
              setTimeout(() => scrollToSection(attempts + 1), 100)
            }
          }
          scrollToSection()
        } else {
          setSelectedSection(firstSectionId)
          hasScrolledRef.current = false
        }
      } else {
        setSelectedSection(firstSectionId)
        hasScrolledRef.current = false
      }
    }

    handleHashNavigation()
    window.addEventListener('hashchange', handleHashNavigation)
    return () => window.removeEventListener('hashchange', handleHashNavigation)
  }, [validSectionIds, firstSectionId])

  const handleSectionNavigation = (sectionId: string) => {
    if (sectionId === '') {
      setSelectedSection(null)
      window.history.pushState(null, '', window.location.pathname + window.location.search)
    } else {
      setSelectedSection(sectionId)
      window.history.pushState(null, '', `#${sectionId}`)

      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 100
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const renderRichText = (html?: string) => {
    if (!html) return undefined;

    // Convert directus-links / videos etc. if required, for now just standard innerHTML
    return (
      <div
        className={styles.tabContent}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  if (!data) return null;

  return (
    <div className={`${styles.container} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      {/* Hero Section */}
      <section id="oversikt" className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            <p className={styles.heroDescription}>{heroDescription}</p>
          </div>
          <div className={styles.heroImage}>
            <img
              src={heroImage}
              alt={heroTitle}
              className={styles.heroImageElement}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>

        <section id="vanlige-plager" className={styles.problemsSection}>
          <h2 className={styles.sectionTitle}>{content.sectionTitle}</h2>

          <PregnancyIconGrid
            language={language}
            problems={problems}
            onNavigate={handleSectionNavigation}
            selectedSection={selectedSection}
          />

          {selectedSection && problems
            .filter(problem => {
              const pId = problem.slug || problem.name_en?.toLowerCase().replace(/\s+/g, '-') || `problem-${problem.id}`
              return pId === selectedSection
            })
            .map((problem) => {
              const problemId = problem.slug || problem.name_en?.toLowerCase().replace(/\s+/g, '-') || `problem-${problem.id}`
              const title = (language === 'en' && problem.name_en) ? problem.name_en : problem.name_no

              const about = language === 'en' && problem.about_en ? problem.about_en : problem.about_no;
              const symptoms = language === 'en' && problem.symptoms_en ? problem.symptoms_en : problem.symptoms_no;
              const selfHelp = language === 'en' && problem.self_help_en ? problem.self_help_en : problem.self_help_no;
              const seekHelp = language === 'en' && problem.seek_help_en ? problem.seek_help_en : problem.seek_help_no;

              const linkText = language === 'en' && problem.link_text_en ? problem.link_text_en : problem.link_text_no;
              const pdfText = language === 'en' && problem.pdf_button_text_en ? problem.pdf_button_text_en : problem.pdf_button_text_no;

              return (
                <ConditionSection
                  key={problem.id}
                  id={problemId}
                  title={title}
                  language={language}
                  image={problem.image ? { src: getImageUrl(problem.image), alt: title } : undefined}
                  link={problem.link_url ? { url: problem.link_url, text: linkText || problem.link_url } : undefined}
                  pdf={problem.pdf_file ? { url: getImageUrl(problem.pdf_file), buttonText: pdfText || 'Last ned PDF' } : undefined}
                  content={{
                    about: renderRichText(about),
                    symptoms: renderRichText(symptoms),
                    selfHelp: renderRichText(selfHelp),
                    seekHelp: renderRichText(seekHelp)
                  }}
                />
              )
            })
          }
        </section>
      </main>
    </div>
  )
}
