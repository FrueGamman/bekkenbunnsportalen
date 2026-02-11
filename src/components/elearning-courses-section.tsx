// src/components/elearning-courses-section.tsx
"use client"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../translations/translations"
import styles from "./elearning-courses-section.module.css"

export const ElearningCoursesSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className={styles.elearningSection}>
      <div className={styles.elearningContainer}>
        <div className={styles.elearningHeader}>
          <h2 className={styles.elearningTitle}>
            {t["elearning.section.title"]}
          </h2>
          <p className={styles.elearningDescription}>
            {t["elearning.section.description"]}
          </p>
        </div>

        <div className={styles.elearningGrid}>
          {/* Course 1: Assessment and treatment of pelvic floor dysfunctions */}
          <div className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <div className={styles.courseIcon}>
                <img 
                  src="/octicon-book-16.svg" 
                  alt={t["elearning.course1.altText"]} 
                  className={styles.courseIconImage} 
                />
              </div>
              <span className={styles.courseProvider}>
                {t["elearning.course1.provider"]}
              </span>
            </div>
            <h3 className={styles.courseTitle}>
              {t["elearning.course1.title"]}
            </h3>
            <p className={styles.courseDescription}>
              {t["elearning.course1.description"]}
            </p>
            <div className={styles.courseFooter}>
              <span className={styles.courseType}>
                {t["elearning.course1.type"]}
              </span>
              <a 
                href="https://helsekompetanse.no/login/index.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.courseButton}
              >
                {t["elearning.course1.buttonText"]}
                <img 
                  src="/streamline-color_expand-window-2.png" 
                  alt="" 
                  className={styles.courseButtonIcon} 
                />
              </a>
            </div>
          </div>

          {/* Course 2: Pelvic organ prolapse */}
          <div className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <div className={styles.courseIcon}>
                <img 
                  src="/octicon-book-16.svg" 
                  alt={t["elearning.course2.altText"]} 
                  className={styles.courseIconImage} 
                />
              </div>
              <span className={styles.courseProvider}>
                {t["elearning.course2.provider"]}
              </span>
            </div>
            <h3 className={styles.courseTitle}>
              {t["elearning.course2.title"]}
            </h3>
            <p className={styles.courseDescription}>
              {t["elearning.course2.description"]}
            </p>
            <div className={styles.courseFooter}>
              <span className={styles.courseType}>
                {t["elearning.course2.type"]}
              </span>
              <a 
                href="https://kursbygger.ihelse.net/?startcourseid=726&tracking=" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.courseButton}
              >
                {t["elearning.course2.buttonText"]}
                <img 
                  src="/streamline-color_expand-window-2.png" 
                  alt="" 
                  className={styles.courseButtonIcon} 
                />
              </a>
            </div>
          </div>

          {/* Course 3: Avoid overstretching */}
          <div className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <div className={styles.courseIcon}>
                <img 
                  src="/octicon-book-16.svg" 
                  alt={t["elearning.course3.altText"]} 
                  className={styles.courseIconImage} 
                />
              </div>
              <span className={styles.courseProvider}>
                {t["elearning.course3.provider"]}
              </span>
            </div>
            <h3 className={styles.courseTitle}>
              {t["elearning.course3.title"]}
            </h3>
            <p className={styles.courseDescription}>
              {t["elearning.course3.description"]}
            </p>
            <div className={styles.courseFooter}>
              <span className={styles.courseType}>
                {t["elearning.course3.type"]}
              </span>
              <button className={styles.courseButton} disabled>
                {t["elearning.course3.buttonText"]}
              </button>
            </div>
          </div>

          {/* Course 4: Instructional video on Fecal Incontinence */}
          <div className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <div className={styles.courseIcon}>
                <img 
                  src="/mynaui_video.png" 
                  alt={t["elearning.course4.altText"]} 
                  className={styles.courseIconImage} 
                />
              </div>
              <span className={styles.courseProvider}>
                {t["elearning.course4.provider"]}
              </span>
            </div>
            <h3 className={styles.courseTitle}>
              {t["elearning.course4.title"]}
            </h3>
            <p className={styles.courseDescription}>
              {t["elearning.course4.description"]}
            </p>
            <div className={styles.courseFooter}>
              <span className={styles.courseType}>
                {t["elearning.course4.type"]}
              </span>
              <a 
                href="/conditions/fecal-incontinence" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.courseButton}
              >
                {t["elearning.course4.buttonText"]}
                <img 
                  src="/streamline-color_expand-window-2.png" 
                  alt="" 
                  className={styles.courseButtonIcon} 
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
