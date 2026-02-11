"use client"

import { useState } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { Header } from "../../../components/Header"
import Footer from "../../../components/Footer"
import styles from "./condition-page.module.css"

// Import your existing components
import { OverviewSection, ConditionIntroSection } from "../../shared"
import { NormalFunctions } from "./normal-functions"
import { Symptoms } from "./symptoms" 
import { Causes } from "./causes"
import { Treatment } from "./treatment"
import { Exercises } from "./exercises"

// Import the new components we'll create
import { Diagnosis } from "./diagnosis"
import { Resources } from "./resources"
import { References } from "./references"

// All conditions for the top navigation
const ALL_CONDITIONS = [
  { id: "urinary-incontinence", titleKey: "Urinlekkasje", icon: "/image-7.svg" },
  { id: "urinary-retention", titleKey: "Tømmingsproblemer for urin", icon: "/vector.svg" },
  { id: "fecal-incontinence", titleKey: "Avføringslekkasje", icon: "/fecalincontinence.svg" },
  { id: "constipation", titleKey: "Tømmingsproblemer og forstoppelse for avføring", icon: "/constipation.svg" },
  { id: "pelvic-pain", titleKey: "Langvarige underlivssmerter", icon: "/belly--1--1.svg" },
  { id: "pregnancy", titleKey: "Plager under graviditet og etter fødsel", icon: "/vector-2.svg" },
]

// Define condition sections with your actual icons
const CONDITION_SECTIONS = [
  { id: "normal-functions", title: "Normal Functions", icon: "/normal.png" },
  { id: "symptoms", title: "Symptoms", icon: "/symptoms.png" },
  { id: "causes", title: "Causes", icon: "/couse.png" },
  { id: "diagnosis", title: "Diagnosis", icon: "/solae.png" },
  { id: "treatment", title: "Treatment", icon: "/treat.png" },
  { id: "exercises", title: "Exercises", icon: "/exercises.png" },
  { id: "resources", title: "Resources", icon: "/resource.png" },
  { id: "references", title: "References", icon: "/resource.png" },
]

export default function ConditionPage() {
  const { t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [activeCondition, setActiveCondition] = useState("urinary-incontinence")
  const [activeSection, setActiveSection] = useState("normal-functions")

  const handleConditionClick = (conditionId: string) => {
    setActiveCondition(conditionId)
  }

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "normal-functions":
        return <NormalFunctions />
      case "symptoms":
        return <Symptoms />
      case "causes":
        return <Causes />
      case "diagnosis":
        return <Diagnosis />
      case "treatment":
        return <Treatment />
      case "exercises":
        return <Exercises />
      case "resources":
        return <Resources />
      case "references":
        return <References />
      default:
        return <div>Section under development</div>
    }
  }

  return (
    <div className={`${styles.container} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <Header />

      {/* Page Title */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Tilstander - Urinlekkasje</h1>
      </div>

      {/* Condition Navigation Bar */}
      <div className={styles.conditionNavigation}>
        <div className={styles.conditionNavContainer}>
          {ALL_CONDITIONS.map((condition) => (
            <button
              key={condition.id}
              onClick={() => handleConditionClick(condition.id)}
              className={`${styles.conditionNavItem} ${
                activeCondition === condition.id ? styles.conditionNavItemActive : ""
              }`}
            >
              <div className={styles.conditionIcon}>
                <img
                  src={condition.icon}
                  alt={t(condition.titleKey)}
                  className={styles.conditionIconImage}
                />
              </div>
                                  <span className={styles.conditionTitle}>{t(condition.titleKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Navigation */}
      <div className={styles.sectionNavigation}>
        <div className={styles.sectionNavContainer}>
          {CONDITION_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionChange(section.id)}
              className={`${styles.sectionNavButton} ${
                activeSection === section.id ? styles.sectionNavButtonActive : ""
              }`}
            >
              <img 
                src={section.icon} 
                alt={section.title}
                className={styles.sectionIconImage}
              />
                              <span className={styles.sectionText}>{t(section.title)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <OverviewSection onSectionClick={handleSectionChange} />

      {/* Condition Introduction Section */}
      <ConditionIntroSection conditionId="urinary-incontinence" />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {renderSectionContent()}
        </div>
      </div>

      <Footer />
    </div>
  )
}