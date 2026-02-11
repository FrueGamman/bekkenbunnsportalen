"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"



const INTRODUCTION_DATA = {
  no: {
    title: "Velkommen til informasjon om urinlekkasje",
    subtitle: "Forstå normal urinering og urinlekkasje",
    description: "På disse sidene finner du informasjon om urinlekkasje, også kalt urininkontinens.\n Her er beskrivelse av normalfunksjon til urinveiene, symptomer på urinlekkasje, utredning og behandling av slike plager.Kanskje har du slike problemer selv, eller du kjenner noen som er rammet av disse symptomene.",
    prevalence: "Urinlekkasje er utbredt og rammer både kvinner og menn i alle aldersgrupper. Studier viser at rundt 25% av kvinner og 10% av menn opplever urinlekkasje i varierende grad. Forekomsten øker med alderen, men det er ikke en normal del av aldringen. God behandling er tilgjengelig.",
    keyPoints: [
      "Lær om urinveienes oppbygging og funksjon",
      "Forstå normal vannlating og hva som kan gå galt",
      "Få innsikt i symptomer og årsaker til urinlekkasje",
      "Utforsk behandlingsalternativer og håndtering"
    ],
    video: {
      src: "https://player.vimeo.com/video/367328676?autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0",
      thumbnailSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BQSujxu9P9RbGb3NEBjI9KZMEXhXly.png",
      alt: "Introduksjon til urinlekkasje",
      caption: "Informasjonsvideo om urinlekkasje"
    }
  },
  en: {
    title: "Welcome to Urinary Incontinence Information",
    subtitle: "Understanding Normal Urination and Urinary Incontinence",
    description: "These pages provide information about urinary leakage: the normal function of the urinary tract, symptoms, investigation, and treatment.",
    prevalence: "Urinary incontinence is widespread and affects both women and men of all age groups. Studies show that approximately 25% of women and 10% of men experience urinary incontinence to varying degrees. The prevalence increases with age, but it is not a normal part of aging. Good treatment is available.",
    keyPoints: [
      "Learn about the structure and function of the urinary tract",
      "Understand normal urination and what can go wrong",
      "Gain insight into symptoms and causes of urinary incontinence",
      "Explore treatment options and management"
    ],
    video: {
      src: "https://player.vimeo.com/video/367328676?autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0",
      thumbnailSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BQSujxu9P9RbGb3NEBjI9KZMEXhXly.png",
      alt: "Introduction to urinary incontinence",
      caption: "Information video about urinary incontinence"
    }
  }
} as const;

export const UrinaryIncontinenceIntroduction = () => {
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
            {introduction.prevalence && (
              <div className={styles.prevalenceBox}>
                <h3 className={styles.prevalenceTitle}>Forekomst</h3>
                <p className={styles.prevalenceText}>{introduction.prevalence}</p>
              </div>
            )}
          </div>

          <div className={styles.introductionImage}>
            <div className={styles.introVideoWrapper}>
              <div className={styles.introVideoContainer}>
                <iframe
                  className={styles.introVideoIframe}
                  src={introduction.video.src}
                  title={introduction.video.alt}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={styles.introductionImageCaption}>
                {introduction.video.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
