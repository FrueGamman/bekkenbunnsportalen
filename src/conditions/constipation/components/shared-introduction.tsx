"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"

const INTRODUCTION_DATA = {
  no: {
    title: "Velkommen til informasjon om forstoppelse",
    subtitle: "Forstå normal tarmfunksjon og forstoppelse",
    description: "På disse sidene finner du informasjon om tømmingsproblemer for avføring og forstoppelse. Her er informasjon om symptomer på, utredning og behandling av slike plager.",
    image: {
        src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX9432678-300x300.jpg",
      alt: "Normal tarmfunksjon og anatomi",
      caption: "Oversikt over tarmens funksjon"
    }
  },
  en: {
    title: "Welcome to Constipation Information",
    subtitle: "Understanding Normal Bowel Function and Constipation",
    description: "On these pages you will find information about bowel emptying problems and constipation. Here is information about symptoms, assessment and treatment of such problems.",
    image: {
        src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX9432678-300x300.jpg",
      alt: "Normal bowel function and anatomy",
      caption: "Overview of bowel function"
    }
  }
} as const;

export const ConstipationIntroduction = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const introduction = INTRODUCTION_DATA[language]

  return (
    <>
      {/* Introduction Section */}
      <div className={`${styles.introductionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.introductionContent}>
          <div className={styles.introductionText}>
            <p className={styles.introductionDescription}>{introduction.description}</p>
          </div>
          
          <div className={styles.introductionImage}>
            <div className={styles.introductionImageContainer}>
              <img 
                src={introduction.image.src} 
                alt={introduction.image.alt} 
                className={styles.introductionImageElement}
              />
              <p className={styles.introductionImageCaption}>
                {introduction.image.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
