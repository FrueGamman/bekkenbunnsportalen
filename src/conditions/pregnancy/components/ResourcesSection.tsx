"use client"

import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

interface ResourceItem {
  name: string
  description: string
  link?: string
}

const RESOURCES_DATA = {
  no: [
    {
      id: "kompetansetjenester",
      title: "Kompetansetjenester",
      items: [
        {
          name: "Bekkensenteret ved Akershus universitetssykehus",
          description: "Spesialisttjeneste for bekkenbunnsproblemer og underlivsplager.",
          link: "https://www.ahus.no/bekkensenteret"
        },
        {
          name: "Nasjonal kompetansetjeneste for endometriose og adenomyose",
          description: "Nasjonal kompetansetjeneste for endometriose og adenomyose ved Oslo universitetssykehus.",
          link: "https://www.oslo-universitetssykehus.no/avdelinger/kvinneklinikken/gynekologisk-avdeling/nasjonal-kompetansetjeneste-endometriose-og-adenomyose/"
        }
      ]
    },
    {
      id: "organisasjoner",
      title: "Organisasjoner",
      items: [
        {
          name: "Barselambassadørene",
          description: "Ressurser og støtte for gravide og nybakte mødre.",
          link: "https://barselambassadorene.no/"
        }
      ]
    },
    {
      id: "behandlere",
      title: "Behandlere",
      items: [
        {
          name: "Fysioterapeuter",
          description: "Spesialiserte fysioterapeuter som jobber med bekkenbunnsproblemer.",
          link: "https://fysio.no/kvinnehelse"
        }
      ]
    },
  ],
  en: [
    {
      id: "kompetansetjenester",
      title: "Competence Services",
      items: [
        {
          name: "Pelvic Center at Akershus University Hospital",
          description: "Specialist service for pelvic floor problems and pelvic floor complaints.",
          link: "https://www.ahus.no/bekkensenteret"
        },
        {
          name: "National Competence Service for Endometriosis and Adenomyosis",
          description: "National competence service for endometriosis and adenomyosis at Oslo University Hospital.",
          link: "https://www.oslo-universitetssykehus.no/avdelinger/kvinneklinikken/gynekologisk-avdeling/nasjonal-kompetansetjeneste-endometriose-og-adenomyose/"
        }
      ]
    },
    {
      id: "organisasjoner",
      title: "Organizations",
      items: [
        {
          name: "Barselambassadørene",
          description: "Resources and support for pregnant women and new mothers.",
          link: "https://barselambassadorene.no/"
        }
      ]
    },
    {
      id: "behandlere",
      title: "Treatment Providers",
      items: [
        {
          name: "Physiotherapists",
          description: "Specialized physiotherapists who work with pelvic floor problems.",
          link: "https://fysio.no/kvinnehelse"
        }
      ]
    },
  ]
} as const

interface ResourcesSectionProps {
  language: "no" | "en"
}

export const ResourcesSection = ({ language }: ResourcesSectionProps) => {
  const { resolvedTheme } = useTheme()
  const resources = RESOURCES_DATA[language]

  const INTRO_TEXT = {
    no: "Her finner du nyttige ressurser og lenker til informasjon om underlivsplager under graviditet og etter fødsel.",
    en: "Here you will find useful resources and links to information about pelvic floor problems during pregnancy and after childbirth."
  }

  return (
    <section 
      id="ressurser"
      className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="Resources" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {language === "no" ? "Ressurser" : "Resources"}
        </h2>
      </div>

      <div className={styles.sectionContent}>
        <p className={styles.enhancedParagraph}>
          {INTRO_TEXT[language]}
        </p>

        {resources.map((section) => (
          <SectionAccordion
            key={section.id}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              <ul className={styles.resourceList}>
                {section.items.map((item: ResourceItem, index: number) => (
                  <li key={index} className={styles.resourceListItem}>
                    <strong>{item.name}</strong>
                    <p className={styles.enhancedParagraph}>{item.description}</p>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.resourceLink}
                      >
                        {language === "no" ? "Besøk nettside" : "Visit website"} →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </SectionAccordion>
        ))}
      </div>
    </section>
  )
}
