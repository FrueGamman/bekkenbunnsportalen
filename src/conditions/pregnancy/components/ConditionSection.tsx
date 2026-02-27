"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./ConditionSection.module.css"

const TAB_LABELS = {
  no: {
    about: "Om plagene",
    symptoms: "Symptomer",
    selfHelp: "Råd til selvhjelp",
    seekHelp: "Når og hvor søke hjelp"
  },
  en: {
    about: "About the condition",
    symptoms: "Symptoms",
    selfHelp: "Self-help advice",
    seekHelp: "When and where to seek help"
  }
} as const

const TEXTBOOK_LINK = {
  no: "Les mer i læreboken",
  en: "Read more in the textbook"
} as const

// Mapping of condition IDs to textbook section hashes for deep linking
const CONDITION_TO_TEXTBOOK_SECTION: Record<string, string> = {
  'urinlekkasje': 'bladder-function',
  'avforingslekkasje': 'bowel-function',
  'forstoppelse': 'bowel-function',
  'hemoroider': 'bowel-function',
  'smertefull-avforing': 'bowel-function',
  'fodselsrift': 'birth-tears',
  'tyngdefolelse-prolaps': 'prolapse',
  'samleie': 'intercourse',
  'hastverkstrang': 'bowel-function',
  'urinveisinfeksjon': 'bladder-function',
}

interface TabContent {
  about?: ReactNode
  video?: string
  symptoms?: ReactNode
  selfHelp?: ReactNode
  seekHelp?: ReactNode
}

interface ConditionSectionProps {
  id: string
  title: string
  language: "no" | "en"
  content: TabContent
  video?: string
  image?: {
    src: string
    alt: string
  }
  link?: {
    url: string
    text: string
  }
  pdf?: {
    url: string
    buttonText: string
  }
}

export const ConditionSection = ({
  id,
  title,
  language,
  content,
  image,
  video,
  link,
  pdf
}: ConditionSectionProps) => {
  const { resolvedTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<keyof TabContent>("about")
  const [isMobile, setIsMobile] = useState(false)
  const tabListRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { id: routeConditionId } = useParams()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const tabs = [
    { key: "about" as const, label: TAB_LABELS[language].about, content: content.about },
    { key: "symptoms" as const, label: TAB_LABELS[language].symptoms, content: content.symptoms },
    { key: "selfHelp" as const, label: TAB_LABELS[language].selfHelp, content: content.selfHelp },
    { key: "seekHelp" as const, label: TAB_LABELS[language].seekHelp, content: content.seekHelp }
  ].filter(tab => tab.content) // Only show tabs that have content

  const handleTabClick = (tabKey: keyof TabContent) => {
    setActiveTab(tabKey)
  }

  const handleKeyDown = (event: React.KeyboardEvent, tabKey: keyof TabContent) => {
    const currentIndex = tabs.findIndex(tab => tab.key === tabKey)
    let newIndex: number

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault()
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
        setActiveTab(tabs[newIndex].key)
        break
      case "ArrowRight":
        event.preventDefault()
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
        setActiveTab(tabs[newIndex].key)
        break
      case "Home":
        event.preventDefault()
        setActiveTab(tabs[0].key)
        break
      case "End":
        event.preventDefault()
        setActiveTab(tabs[tabs.length - 1].key)
        break
    }
  }

  const handleTextbookClick = () => {
    const conditionId = routeConditionId || "pregnancy"
    const textbookSection = CONDITION_TO_TEXTBOOK_SECTION[id] || ''
    const hash = textbookSection ? `#${textbookSection}` : ''
    navigate(`/conditions/${conditionId}?section=textbook${hash}`)
  }

  const activeContent = tabs.find(tab => tab.key === activeTab)?.content

  return (
    <section
      id={id}
      className={`${styles.conditionSection} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}
    >
      <div className={styles.sectionHeader}>
        {image && (
          <div className={styles.imageContainer}>
            <img
              src={image.src}
              alt={image.alt}
              className={styles.sectionImage}
              loading="lazy"
            />
          </div>
        )}
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>

      {!isMobile ? (
        // Desktop: Tabs
        <div className={styles.tabsContainer}>
          <div
            ref={tabListRef}
            className={styles.tabList}
            role="tablist"
            aria-label={`${title} information tabs`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, tab.key)}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`${id}-${tab.key}-panel`}
                id={`${id}-${tab.key}-tab`}
                tabIndex={activeTab === tab.key ? 0 : -1}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className={styles.tabPanel}
            role="tabpanel"
            aria-labelledby={`${id}-${activeTab}-tab`}
            id={`${id}-${activeTab}-panel`}
          >
            <div className={styles.tabPanelContent}>
              <div className={styles.textContent}>
                {activeContent}
              </div>
              {activeTab === 'about' && video && (
                <div className={styles.videoWrapper}>
                  <div className={styles.videoContainer}>
                    <iframe
                      className={styles.videoIframe}
                      src={video}
                      title="Pasienthistorie"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Mobile: Accordion
        <div className={styles.accordionContainer}>
          {tabs.map((tab) => (
            <details
              key={tab.key}
              className={styles.accordionItem}
              open={activeTab === tab.key}
            >
              <summary
                className={styles.accordionSummary}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(activeTab === tab.key ? "about" : tab.key)
                }}
              >
                {tab.label}
                <span className={styles.accordionIcon} aria-hidden="true">
                  {activeTab === tab.key ? "−" : "+"}
                </span>
              </summary>
              <div className={styles.accordionContent}>
                {tab.content}
                {tab.key === 'about' && video && (
                  <div className={styles.videoContainer} style={{ marginTop: "1.5rem" }}>
                    <iframe
                      className={styles.videoIframe}
                      src={video}
                      title="Pasienthistorie"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      )}

      <div className={styles.sectionFooter}>
        {link && (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textbookButton}
          >
            {link.text} ↗
          </a>
        )}
        {pdf && (
          <a
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textbookButton}
          >
            {pdf.buttonText} 📄
          </a>
        )}
        <button
          onClick={handleTextbookClick}
          className={styles.textbookButton}
          aria-label="Navigate to textbook section"
        >
          {TEXTBOOK_LINK[language]} →
        </button>
      </div>
    </section>
  )
}
