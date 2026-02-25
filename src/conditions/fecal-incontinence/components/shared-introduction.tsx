"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"



const INTRODUCTION_DATA = {
  no: {
    title: "Velkommen til informasjon om avføringslekkasje",
    subtitle: "Forstå normal tarmfunksjon og avføringslekkasje",
    description: "På disse sidene finner du informasjon om avføringslekkasje, også kalt fekal eller anal inkontinens. Her er beskrivelse av normalfunksjon til tarmen, symptomer på avføringslekkasje, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet av disse symptomene.",
    keyPoints: [
      "Lær om tarmens oppbygging og funksjon",
      "Forstå normal tarmt​ømming og kontinens",
      "Få innsikt i symptomer og årsaker til avføringslekkasje",
      "Utforsk behandlingsalternativer og håndtering"
    ],
    video: {
      src: "https://player.vimeo.com/video/367327819?autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0",
      thumbnailSrc: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2020/01/Ingunn2.jpg",
      alt: "Våg å snakk om avføringslekkasje",
      caption: "Informasjonsvideo om avføringslekkasje"
    }
  },
  en: {
    title: "Welcome to Fecal Incontinence Information",
    subtitle: "Understanding Normal Bowel Function and Fecal Incontinence",
    description: "These pages provide information about fecal incontinence, also called anal incontinence. Here is a description of the normal function of the bowel, symptoms of fecal incontinence, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected by these symptoms.",
    keyPoints: [
      "Learn about intestinal structure and function",
      "Understand normal bowel emptying and continence",
      "Gain insight into symptoms and causes of fecal incontinence",
      "Explore treatment options and management"
    ],
    video: {
      src: "https://player.vimeo.com/video/367327819?autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0",
      thumbnailSrc: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2020/01/Ingunn2.jpg",
      alt: "Dare to talk about fecal incontinence",
      caption: "Information video about fecal incontinence"
    }
  }
} as const;

export const FecalIncontinenceIntroduction = () => {
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
