import { useLanguage } from "../../context/LanguageContext"
import { useTheme } from "../../context/ThemeContext"
import styles from "./overview-section.module.css"

// Structured bilingual data for Overview section
const OVERVIEW_DATA = {
  no: {
    title: "Oversikt over seksjoner",
    description: "I denne seksjonen finner du informasjon om:",
    sections: [
      {
        id: "normal-functions",
        title: "Normalfunksjoner",
        description: "Lær om hvordan bekkenbunnen fungerer normalt"
      },
      {
        id: "symptoms",
        title: "Symptomer",
        description: "Vanlige symptomer og tegn på tilstanden"
      },
      {
        id: "causes",
        title: "Årsaker",
        description: "Mulige årsaker og risikofaktorer"
      },
      {
        id: "diagnosis",
        title: "Utredning",
        description: "Hvordan tilstanden utredes og diagnostiseres"
      },
      {
        id: "treatment",
        title: "Behandling",
        description: "Behandlingsalternativer og tiltak"
      },
      {
        id: "exercises",
        title: "Øvelser",
        description: "Bekkenbunnsøvelser og trening"
      },
      {
        id: "resources",
        title: "Ressurser",
        description: "Nyttige lenker og informasjon"
      },
      {
        id: "references",
        title: "Referanser",
        description: "Kilder og referanser"
      }
    ]
  },
  en: {
    title: "Section overview",
    description: "In this section you will find information about:",
    sections: [
      {
        id: "normal-functions",
        title: "Normal functions",
        description: "Learn about how the pelvic floor works normally"
      },
      {
        id: "symptoms",
        title: "Symptoms",
        description: "Common symptoms and signs of the condition"
      },
      {
        id: "causes",
        title: "Causes",
        description: "Possible causes and risk factors"
      },
      {
        id: "diagnosis",
        title: "Diagnosis",
        description: "How the condition is assessed and diagnosed"
      },
      {
        id: "treatment",
        title: "Treatment",
        description: "Treatment options and measures"
      },
      {
        id: "exercises",
        title: "Exercises",
        description: "Pelvic floor exercises and training"
      },
      {
        id: "resources",
        title: "Resources",
        description: "Useful links and information"
      },
      {
        id: "references",
        title: "References",
        description: "Sources and references"
      }
    ]
  }
} as const

interface OverviewSectionProps {
  onSectionClick?: (sectionId: string) => void
}

export const OverviewSection = ({ onSectionClick }: OverviewSectionProps) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  
  const data = OVERVIEW_DATA[language as keyof typeof OVERVIEW_DATA]

  const handleSectionClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId)
    }
  }

  return (
    <div className={`${styles.overviewContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.overviewHeader}>
        <h2 className={styles.overviewTitle}>{data.title}</h2>
        <p className={styles.overviewDescription}>{data.description}</p>
      </div>
      
      <div className={styles.sectionsGrid}>
        {data.sections.map((section: any) => (
          <div 
            key={section.id}
            className={styles.sectionCard}
            onClick={() => handleSectionClick(section.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSectionClick(section.id)
              }
            }}
            aria-label={`Go to ${section.title} section`}
          >
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <p className={styles.sectionDescription}>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
