"use client"

import type React from "react"
import { useLanguage } from "../../../context/LanguageContext"
import styles from "./Elearning.module.css"

// Structured bilingual data for Elearning component
const ELEARNING_DATA = {
  no: {
    title: "E-læringskurs",
    subtitle: "Utvid din kunnskap med våre spesialiserte kurs",
    goToCourse: "Gå til kurs",
    toCourse: "Til kurs",
    courses: [
      {
        id: "pelvic-floor-dysfunction",
        title: "Bekkenbunn dysfunksjon - Avansert kurs",
        description: "Omfattende kurs om diagnostikk og behandling",
        provider: "Universitetet i Oslo",
        category: "Advanced Training",
        duration: "4 hours",
        link: "https://helsekompetanse.no/",
        featured: true,
      },
      {
        id: "prolapse",
        title: "Prolaps - Klinisk håndtering",
        description: "Praktisk tilnærming til prolapsbehandling",
        provider: "Helse Bergen",
        category: "Clinical Skills",
        duration: "2.5 hours",
        link: "https://helsekompetanse.no/",
      },
      {
        id: "bladder-emptying",
        title: "Blæretømming - Diagnostiske metoder",
        description: "Moderne diagnostikk av tømmingsproblemer",
        provider: "St. Olavs Hospital",
        category: "Diagnostic Methods",
        duration: "3 hours",
        link: "https://helsekompetanse.no/",
      },
      {
        id: "fecal-incontinence",
        title: "Avføringsinkontinens - Behandlingsprotokoll",
        description: "Systematisk tilnærming til behandling",
        provider: "Rikshospitalet",
        category: "Treatment Protocols",
        duration: "2 hours",
        link: "https://helsekompetanse.no/",
      },
    ]
  },
  en: {
    title: "E-learning courses",
    subtitle: "Expand your knowledge with our specialized courses",
    goToCourse: "Go to course",
    toCourse: "To course",
    courses: [
      {
        id: "pelvic-floor-dysfunction",
        title: "Pelvic floor dysfunction - Advanced course",
        description: "Comprehensive course on diagnosis and treatment",
        provider: "University of Oslo",
        category: "Advanced Training",
        duration: "4 hours",
        link: "https://helsekompetanse.no/",
        featured: true,
      },
      {
        id: "prolapse",
        title: "Prolapse - Clinical management",
        description: "Practical approach to prolapse treatment",
        provider: "Helse Bergen",
        category: "Clinical Skills",
        duration: "2.5 hours",
        link: "https://helsekompetanse.no/",
      },
      {
        id: "bladder-emptying",
        title: "Bladder emptying - Diagnostic methods",
        description: "Modern diagnosis of emptying problems",
        provider: "St. Olavs Hospital",
        category: "Diagnostic Methods",
        duration: "3 hours",
        link: "https://helsekompetanse.no/",
      },
      {
        id: "fecal-incontinence",
        title: "Fecal incontinence - Treatment protocol",
        description: "Systematic approach to treatment",
        provider: "Rikshospitalet",
        category: "Treatment Protocols",
        duration: "2 hours",
        link: "https://helsekompetanse.no/",
      },
    ]
  }
} as const

const Elearning: React.FC = () => {
  const { language } = useLanguage()
  const data = ELEARNING_DATA[language]


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>
            <img src="/mdi_college-outline.png" alt="" />
          </span>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </div>
      </div>

      <div className={styles.coursesList}>
        {data.courses.map((course) => (
          <div key={course.id} className={`${styles.courseItem} ${'featured' in course && course.featured ? styles.featured : ""}`}>
            <div className={styles.courseHeader}>
              <div className={styles.courseIcon}>
                <img src="/mdi_play-circle-outline.png" alt="" />
              </div>
              <div className={styles.categoryBadge}>
                <span className={styles.categoryText}>{course.category}</span>
              </div>
            </div>

            <div className={styles.courseContent}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseDescription}>{course.description}</p>

              {course.provider && (
                <div className={styles.courseProvider}>
                  <span className={styles.providerIcon}>🏛️</span>
                  <span className={styles.providerText}>{course.provider}</span>
                </div>
              )}

              {course.duration && (
                <div className={styles.courseNote}>
                  <span className={styles.noteIcon}>⏱️</span>
                  <span className={styles.noteText}>Duration: {course.duration}</span>
                </div>
              )}
            </div>

            <div className={styles.courseActions}>
              <a 
                href={course.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.courseBtn} 
                title={data.goToCourse}
              >
                <span className={styles.courseBtnText}>{data.toCourse}</span>
                <span className={styles.courseBtnIcon}>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Elearning
