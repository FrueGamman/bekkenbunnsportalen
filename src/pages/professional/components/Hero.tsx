"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Hero.module.css"
import Scoringsverktoy from "./Scoringsverktoy"
import Veilideri from "./Veilideri"
import Elearning from "./Elearning"
import Organisasjoner from "./Organisasjoner"
import Conferences from "./Conferences"
import { Separator } from "@radix-ui/react-separator"

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState("allAreas")
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const navigate = useNavigate()

  const cardData = [
    {
      key: "investigation",
      icon: "/material-symbols_stethoscope-outline-rounded.png",
      text: "Investigation and diagnostics",
      component: "guidelines",
    },
    {
      key: "treatmentMethods",
      icon: "/pajamas_status-health.png",
      text: "Treatment methods",
      component: "guidelines",
    },
    {
      key: "guidelines",
      icon: "/majesticons_note-text-line.png",
      text: "Guidelines",
      component: "guidelines",
    },
    {
      key: "research",
      icon: "/gg_search.png",
      text: "Research",
      component: "guidelines",
    },
    {
      key: "education",
      icon: "/mdi_college-outline.png",
      text: "Education and courses",
      component: "elearning",
    },
    {
      key: "clinicalTools",
      icon: "/bx_data.png",
      text: "Clinical tools",
      component: "scoring",
    },
    {
      key: "certification",
      icon: "/cil_badge.png",
      text: "Certification",
      component: "organizations",
    },
    {
      key: "consultationServices",
      icon: "/bx_message-rounded.png",
      text: "Consultation services",
      component: "organizations",
    },
  ]

  const tabs = [
    { key: "allAreas", text: "All areas" },
    { key: "gynecology", text: "Gynecology" },
    { key: "urology", text: "Urology" },
    { key: "physiotherapy", text: "Physiotherapy" },
    { key: "nursing", text: "Nursing" },
    { key: "gastroenterology", text: "Gastroenterology" },
    { key: "neurology", text: "Neurology" },
  ]

  const renderContent = () => {
    // If a specific card is active, show only that component
    if (activeCard === "elearning") {
      return (
        <div className={styles.contentContainer}>
          <Elearning />
        </div>
      )
    }

    if (activeCard === "guidelines") {
      return (
        <div className={styles.contentContainer}>
          <Veilideri />
        </div>
      )
    }

    if (activeCard === "scoring") {
      return (
        <div className={styles.contentContainer}>
          <Scoringsverktoy />
        </div>
      )
    }

    if (activeCard === "organizations") {
      return (
        <div className={styles.contentContainer}>
          <Organisasjoner />
        </div>
      )
    }

    // Default view - show all components
    if (activeTab === "allAreas") {
      return (
        <div className={styles.contentContainer}>
          <Elearning />
          <Veilideri />
          <Scoringsverktoy />
          <Organisasjoner />
          <Conferences />
        </div>
      )
    }

    // For specific tabs, show relevant components
    const contentMap: { [key: string]: React.ReactElement[] } = {
      gynecology: [
        <Elearning key="elearning" />,
        <Veilideri key="veilideri" />,
        <Scoringsverktoy key="scoring" />,
        <Organisasjoner key="organizations" />,
      ],
      urology: [
        <Elearning key="elearning" />,
        <Veilideri key="veilideri" />,
        <Scoringsverktoy key="scoring" />,
        <Organisasjoner key="organizations" />,
      ],
      physiotherapy: [
        <Elearning key="elearning" />,
        <Veilideri key="veilideri" />,
        <Scoringsverktoy key="scoring" />,
        <Organisasjoner key="organizations" />,
      ],
      nursing: [
        <Elearning key="elearning" />,
        <Veilideri key="veilideri" />,
        <Scoringsverktoy key="scoring" />,
        <Organisasjoner key="organizations" />,
      ],
    }

    return <div className={styles.contentContainer}>{contentMap[activeTab] || <Elearning key="default" />}</div>
  }

  const renderSelectedCardContent = () => {
    if (!selectedCard) return null
    if (selectedCard === "investigation") {
      return (
        <div className={styles.contentContainer}>
          <div className={styles.listContainer}>
            <ul>
              <li>Primary diagnostic pathway</li>
              <li>Neurogenic bladder evaluation</li>
              <li>Fecal incontinence workup</li>
              <li>Constipation workup</li>
              <li>Pelvic pain workup</li>
              <li>
                <a href="https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" target="_blank" rel="noopener noreferrer">
                  Anorectal disorders – national guideline (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
    }
    if (selectedCard === "treatmentMethods") {
      return (
        <div className={styles.contentContainer}>
          <div className={styles.listContainer}>
            <ul>
              <li>Conservative management: pelvic floor muscle training (PFMT)</li>
              <li>Fecal incontinence: conservative care and biofeedback</li>
              <li>Constipation: lifestyle and bowel routines</li>
              <li>Neurogenic dysfunction management</li>
              <li>Escalation: surgery and medications</li>
              <li>Postpartum PFMT</li>
            </ul>
          </div>
        </div>
      )
    }
    if (selectedCard === "guidelines") {
      return (
        <div className={styles.contentContainer}>
          <ul>
            <li>
              <a href="https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" target="_blank" rel="noopener noreferrer">
                Anorectal disorders – national guideline (PDF)
              </a>
            </li>
          </ul>
        </div>
      )
    }
    if (selectedCard === "research") {
      return (
        <div className={styles.contentContainer}>
          <ul>
            <li><a href="https://helsekompetanse.no/" target="_blank" rel="noopener noreferrer">Bekkenbunnsportalen (NBH)</a></li>
            <li><a href="https://www.ahus.no" target="_blank" rel="noopener noreferrer">Bekkensenteret ved Ahus</a></li>
            <li><a href="https://www.unn.no" target="_blank" rel="noopener noreferrer">Universitetssykehuset Nord‑Norge (UNN)</a></li>
            <li><a href="https://www.stolav.no" target="_blank" rel="noopener noreferrer">St. Olavs hospital</a></li>
          </ul>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Resources for healthcare professionals</h1>
          <h2 className={styles.heroSubtitle}>Clinical guidance, tools and courses in pelvic floor health</h2>
          <p className={styles.heroDescription}>Browse guidelines, scoring tools, e-learning, organizations and conferences.</p>
        </div>

        <div className={styles.heroTable}>
          <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.activeTab : ""}`}
                onClick={() => {
                  setActiveTab(tab.key)
                  setActiveCard(null) // Reset active card when changing tabs
                }}
              >
                {tab.text}
              </button>
            ))}
          </div>

          <div className={styles.cardsGrid}>
            {cardData.map((card) => (
              <div
                key={card.key}
                className={styles.card}
                role="button"
                tabIndex={0}
                onClick={() => {
                  // Navigate to a dedicated page like /professional/:discipline/:topic
                  const discipline =
                    activeTab === "allAreas" ? "alle" :
                    activeTab === "gynecology" ? "gynekologi" :
                    activeTab === "urology" ? "urologi" :
                    activeTab === "physiotherapy" ? "fysioterapi" :
                    activeTab === "nursing" ? "sykepleie" :
                    activeTab === "gastroenterology" ? "gastroenterologi" :
                    activeTab === "neurology" ? "nevrologi" : "alle"
                  navigate(`/professional/${discipline}/${card.key}`)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedCard(card.key)
                }}
              >
                <div className={styles.iconContainer}>
                  <div className={styles.iconCircle}>
                    <span className={styles.icon}>
                      <img src={card.icon || "/placeholder.svg"} alt={card.text} />
                      
                    </span>
                  </div>
                </div>
                <Separator className={styles.heroCardSeparator} />
                
                <div className={styles.cardText}>{card.text}</div>
              </div>
            ))}
          </div>
        </div>

        {activeCard && (
          <div className={styles.backToAllContainer}>
            <button className={styles.backToAllBtn} onClick={() => setActiveCard(null)}>
              ← Back to all
            </button>
          </div>
        )}

        <section className="Down"></section>
        {/* Content sections below the table - filtered based on active tab */}
        {renderContent()}
        {selectedCard ? renderSelectedCardContent() : renderContent()}

        <section className={styles.quickAccessSection}>
          <div className={styles.quickAccessContent}>
            <h3 className={styles.quickAccessTitle}>Quick Access for Healthcare Professionals</h3>
            <p className={styles.quickAccessSubtitle}>
              Access essential resources and tools for immediate clinical use
            </p>
            <div className={styles.quickAccessGrid}>
              <button className={styles.quickAccessButton}>
                <span className={styles.quickAccessIcon}>
                  <img src="/ion_call-outline.png" alt="" />
                </span>
                Emergency Consultation
              </button>
              <button className={styles.quickAccessButton}>
                <span className={styles.quickAccessIcon}>
                  <img src="/mynaui_download.png" alt="" />
                </span>
                Assessment Forms
              </button>
              <button className={styles.quickAccessButton}>
                <span className={styles.quickAccessIcon}>
                  <img src="/majesticons_chat-line.png" alt="" />
                </span>
                Expert Networks
              </button>
              <button className={styles.quickAccessButton}>
                <span className={styles.quickAccessIcon}>
                  <img src="/sd.png" alt="" />
                </span>
                Clinical Guidelines
              </button>
            </div>
            
          </div>
        </section>
      </div>
    </>
  )
}

export default Hero
