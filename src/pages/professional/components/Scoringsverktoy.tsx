"use client"

import type React from "react"
import styles from "./Scoringsverktoy.module.css"

type ToolItem = {
  id: string
  name: string
  description: string
  link?: string
}

const Scoringsverktoy: React.FC = () => {
  const scoringTools: { category: string; tools: ToolItem[] }[] = [
    {
      category: "Urinary symptoms",
      tools: [
        {
          id: "iciq-ui-sf",
          name: "ICIQ-UI-SF",
          description: "International Consultation on Incontinence Questionnaire – Urinary Incontinence Short Form",
          link: "https://iciq.net/iciq-ui-sf",
        },
        {
          id: "iciq-oab",
          name: "ICIQ-OAB",
          description: "Overactive Bladder Questionnaire",
          link: "https://iciq.net/iciq-oab",
        },
        {
          id: "nkir",
          name: "NKIR symptom questionnaire",
          description: "Norwegian questionnaire for urinary symptoms in women",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2024/09/NKIR-skjema.pdf",
        },
        {
          id: "ipss",
          name: "IPSS",
          description: "International Prostate Symptom Score",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/03/IPSS-Skjema-om-vannlatingsproblemer.pdf",
        },
        {
          id: "voiding-diary",
          name: "Voiding diary",
          description: "24–72 hour bladder diary",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/03/VANNLATINGSDAGBOK.pdf",
        },
      ],
    },
    {
      category: "Fecal symptoms",
      tools: [
        {
          id: "st-marks",
          name: "St Marks",
          description: "St. Mark’s Incontinence Score",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/03/St_Marks-score-red-2023.doc.pdf",
        },
        {
          id: "odss-wexner",
          name: "ODSS m/Wexner",
          description: "Obstructed Defecation Score with Wexner",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/03/ODSS_WEXNER-red-2023.docx.pdf",
        },
        {
          id: "fiqls",
          name: "FIQLS",
          description: "Fecal Incontinence Quality of Life Scale",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/03/FIQLS.pdf",
        },
        {
          id: "iciq-b",
          name: "ICIQ-B",
          description: "ICIQ-Bowel Questionnaire",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/03/ICIQ_B-norsk-versjon.pdf",
        },
        {
          id: "bowel-diary",
          name: "Bowel diary",
          description: "Daily stool diary",
          link: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2024/09/AvforingsDAGBOK-eksempel-fra-UNN-Narvik.doc",
        },
      ],
    },
    {
      category: "Pain",
      tools: [
        {
          id: "vas",
          name: "VAS",
          description: "Visual Analogue Scale for pain",
        },
      ],
    },
  ]

  const accessLabelTemplate = "Open {tool}"

  const buildAccessLabel = (toolName: string) => {
    if (!accessLabelTemplate.includes("{tool}")) {
      return `${accessLabelTemplate} ${toolName}`
    }
    return accessLabelTemplate.replace("{tool}", toolName)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>
            <img src="/bx_data.png" alt="" />
          </span>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Clinical scoring tools</h2>
          <p className={styles.subtitle}>Validated questionnaires and diaries used in pelvic floor assessment.</p>
        </div>
      </div>

      <p className={styles.subtitle}>
        <a
          href="https://iciq.net/"
          target="_blank"
          rel="noreferrer"
        >
          ICIQ (International Consultation on Incontinence Questionnaires)
        </a>
        {" "}hosts validated questionnaires and translations.
      </p>

      <div className={styles.categoriesList}>
        {scoringTools.map((category) => (
          <div key={category.category} className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.toolsList}>
              {category.tools.map((tool) => (
                <div key={tool.id} className={styles.toolItem}>
                  <div className={styles.toolIcon}>
                    <img src="/chart-icon.png" alt="" />
                  </div>
                  <div className={styles.toolInfo}>
                    <h4 className={styles.toolName}>{tool.name}</h4>
                    <p className={styles.toolDescription}>{tool.description}</p>
                  </div>
                  {tool.link ? (
                    <a
                      className={styles.toolBtn}
                      href={tool.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={buildAccessLabel(tool.name)}
                      title={buildAccessLabel(tool.name)}
                    >
                      <span className={styles.toolBtnIcon}>
                        <img src="/streamline-color_expand-window-2.png" alt="" />
                      </span>
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.promSection}>
        <h3 className={styles.promTitle}>PROM – Patient-Reported Outcome Measures</h3>
        <p className={styles.promDescription}>PROM are standardized questionnaires capturing patients' assessments of symptoms and quality of life.</p>
        <p className={styles.promDescription}>
          Read more at {""}
          <a
            href="https://www.kvalitetsregistre.no/pasientrapporterte-data#kva-er-prom"
            target="_blank"
            rel="noreferrer"
            className={styles.promLink}
          >
            The Norwegian National Quality Registries
          </a>
          {" "}about PROM.
        </p>
      </div>
    </div>
  )
}

export default Scoringsverktoy
