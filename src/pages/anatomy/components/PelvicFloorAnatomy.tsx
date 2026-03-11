"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./PelvicFloorAnatomy.module.css"

// Comprehensive anatomy data based on SNL article
const PELVIC_FLOOR_DATA = {
  no: {
    title: "Bekkenbunnens anatomi",
    subtitle: "Lær om bekkenbunnens struktur og funksjon",
    intro: "Bekkenbunnen danner det relativt faste, muskulære gulvet (diaphragma pelvis) i det lille bekkenet. Den består hovedsakelig av én stor, hesteskoformet muskelplate (musculus levator ani) som er formet som en trakt.",
    structure: {
      title: "Struktur og oppbygging",
      content: [
        "Bekkenbunnen er en kompleks muskelstruktur som består av flere lag muskler, bindevev og nerver.",
        "På baksiden er den festet i korsbeinet og halebeinet og i de nedre delene av bekkenets sideflater (ramus ossis ischii). Foran er åpningen i «hesteskoen» lukket kaudalt av en tverrgående seneaktig muskelplate (diaphragma urogenitale).",
        "Musklenes bakre del danner åpning for passasje av endetarmen, mens den fremre, tverrgående delen gir åpning for urinrøret og skjeden."
      ]
    },
    muscles: {
      title: "Bekkenbunnens muskler",
      description: "Bekkenbunnen består av følgende muskler:",
      list: [
        {
          name: "Musculus levator ani",
          description: "Den største og viktigste muskelen i bekkenbunnen, formet som en hesteskotrakk som støtter bekkenorganene"
        },
        {
          name: "Musculus coccygeus",
          description: "En mindre muskel som støtter bekkenbunnen bak"
        },
        {
          name: "Musculus sphincter ani externus",
          description: "Ringformet lukkemuskulatur rundt endetarmsåpningen"
        },
        {
          name: "Musculus bulbospongiosus",
          description: "Ringformet muskulatur foran som støtter urinrør og kjønnsorganer"
        },
        {
          name: "Musculus ischiocavernosus",
          description: "Muskel som støtter de ytre kjønnsorganene"
        },
        {
          name: "Musculus transversus perinei",
          description: "Tverrgående muskel som stabiliserer mellomkjøttet (superficialis & profundus)"
        },
        {
          name: "Musculus sphincter urethrae",
          description: "Lukkemuskel rundt urinrøret som kontrollerer vannlating"
        }
      ]
    },
    functions: {
      title: "Funksjon",
      content: [
        "Bekkenbunnen har flere viktige funksjoner:",
        "• Støtter og holder oppe bekkenorganene (blære, livmor, endetarm)",
        "• Kontrollerer urinering og avføring gjennom lukkemuskulatur",
        "• Bidrar til seksuell funksjon",
        "• Stabiliserer bekkenet og korsryggen",
        "• Bidrar til pusting og trykkregulering i magen"
      ]
    },
    importance: {
      title: "Hvorfor er bekkenbunnen viktig?",
      content: "En sterk og funksjonell bekkenbunn er essensielt for daglig funksjon. Svakhet eller skade i bekkenbunnen kan føre til problemer som urinlekkasje, avføringslekkasje, bekkensmerter eller organframfall."
    }
  },
  en: {
    title: "Pelvic Floor Anatomy",
    subtitle: "Learn about the structure and function of the pelvic floor",
    intro: "The pelvic floor forms the relatively solid, muscular floor (diaphragma pelvis) of the lesser pelvis. It consists mainly of one large, horseshoe-shaped muscle plate (musculus levator ani) shaped like a funnel.",
    structure: {
      title: "Structure and composition",
      content: [
        "The pelvic floor is a complex muscle structure consisting of several layers of muscles, connective tissue and nerves.",
        "At the back, it is attached to the sacrum and coccyx and to the lower parts of the pelvic side surfaces (ramus ossis ischii). In front, the opening in the 'horseshoe' is closed caudally by a transverse tendon-like muscle plate (diaphragma urogenitale).",
        "The posterior part of the muscles forms an opening for passage of the rectum, while the anterior, transverse part provides an opening for the urethra and vagina."
      ]
    },
    muscles: {
      title: "Pelvic floor muscles",
      description: "The pelvic floor consists of the following muscles:",
      list: [
        {
          name: "Musculus levator ani",
          description: "The largest and most important muscle of the pelvic floor, shaped like a horseshoe funnel that supports the pelvic organs"
        },
        {
          name: "Musculus coccygeus",
          description: "A smaller muscle that supports the back of the pelvic floor"
        },
        {
          name: "Musculus sphincter ani externus",
          description: "Ring-shaped sphincter muscle around the anal opening"
        },
        {
          name: "Musculus bulbospongiosus",
          description: "Ring-shaped musculature at the front supporting urethra and genitalia"
        },
        {
          name: "Musculus ischiocavernosus",
          description: "Muscle supporting the external genitalia"
        },
        {
          name: "Musculus transversus perinei",
          description: "Transverse muscle stabilizing the perineum (superficialis & profundus)"
        },
        {
          name: "Musculus sphincter urethrae",
          description: "Sphincter muscle around the urethra controlling urination"
        }
      ]
    },
    functions: {
      title: "Function",
      content: [
        "The pelvic floor has several important functions:",
        "• Supports and holds up the pelvic organs (bladder, uterus, rectum)",
        "• Controls urination and defecation through sphincter muscles",
        "• Contributes to sexual function",
        "• Stabilizes the pelvis and lower back",
        "• Contributes to breathing and pressure regulation in the abdomen"
      ]
    },
    importance: {
      title: "Why is the pelvic floor important?",
      content: "A strong and functional pelvic floor is essential for daily function. Weakness or injury to the pelvic floor can lead to problems such as urinary incontinence, fecal incontinence, pelvic pain or organ prolapse."
    }
  }
} as const

// Exercise data
const EXERCISE_DATA = {
  no: {
    title: "Bekkenbunnsøvelser",
    subtitle: "Trening for å styrke bekkenbunnen",
    intro: "Bekkenbunnstrening er viktig for å opprettholde eller gjenvinne funksjon. Her finner du øvelser som kan hjelpe deg.",
    exercises: [
      {
        id: "basic",
        title: "Grunnleggende bekkenbunnsknip",
        duration: "5-10 sekunder",
        reps: "10 repetisjoner, 3 sett daglig",
        description: "Stram bekkenbunnsmusklene som om du holder på urin. Hold knipet i 5-10 sekunder, deretter slapp av helt. Husk å puste normalt under øvelsen."
      },
      {
        id: "quick",
        title: "Raske knip",
        duration: "1 sekund",
        reps: "10 repetisjoner, 3 sett daglig",
        description: "Gjør raske, kraftige knip av bekkenbunnen. Hold i 1 sekund, slipp helt av. Dette styrker hurtige muskelfibre."
      },
      {
        id: "functional",
        title: "Funksjonell trening",
        duration: "Under aktivitet",
        reps: "Integrer i daglige aktiviteter",
        description: "Aktiver bekkenbunnen før hosting, nysing, løfting eller annen belastning. Dette trener funksjonell styrke."
      }
    ],
    tips: {
      title: "Tips for effektiv trening",
      list: [
        "Start forsiktig og øk gradvis",
        "Tren konsekvent hver dag",
        "Sørg for å slappe helt av mellom knipene",
        "Ikke hold pusten - pust normalt",
        "Bruk riktig teknikk - søk hjelp hvis usikker",
        "Vær tålmodig - resultater tar tid"
      ]
    }
  },
  en: {
    title: "Pelvic Floor Exercises",
    subtitle: "Training to strengthen the pelvic floor",
    intro: "Pelvic floor training is important to maintain or regain function. Here you will find exercises that can help you.",
    exercises: [
      {
        id: "basic",
        title: "Basic pelvic floor contraction",
        duration: "5-10 seconds",
        reps: "10 repetitions, 3 sets daily",
        description: "Tighten the pelvic floor muscles as if holding urine. Hold the contraction for 5-10 seconds, then relax completely. Remember to breathe normally during the exercise."
      },
      {
        id: "quick",
        title: "Quick flicks",
        duration: "1 second",
        reps: "10 repetitions, 3 sets daily",
        description: "Do quick, strong contractions of the pelvic floor. Hold for 1 second, release completely. This strengthens fast muscle fibers."
      },
      {
        id: "functional",
        title: "Functional training",
        duration: "During activity",
        reps: "Integrate into daily activities",
        description: "Activate the pelvic floor before coughing, sneezing, lifting or other stress. This trains functional strength."
      }
    ],
    tips: {
      title: "Tips for effective training",
      list: [
        "Start gently and increase gradually",
        "Train consistently every day",
        "Make sure to relax completely between contractions",
        "Don't hold your breath - breathe normally",
        "Use correct technique - seek help if unsure",
        "Be patient - results take time"
      ]
    }
  }
} as const

export const PelvicFloorAnatomy = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = PELVIC_FLOOR_DATA[language]
  const exerciseData = EXERCISE_DATA[language]

  return (
    <div className={`${styles.pelvicFloorAnatomy} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>{data.title}</h1>
          <h2 className={styles.subtitle}>{data.subtitle}</h2>
          <p className={styles.intro}>{data.intro}</p>
        </div>
        <div className={styles.heroImageContainer}>
        </div>
      </div>

      {/* Structure Section */}
      <div className={styles.structureSection}>
        <h2 className={styles.sectionTitle}>{data.structure.title}</h2>
        <div className={styles.structureGrid}>
          <div className={styles.structureContent}>
            {data.structure.content.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.structureImage}>
          </div>
        </div>
      </div>

      {/* Muscles Section */}
      <div className={styles.musclesSection}>
        <h2 className={styles.sectionTitle}>{data.muscles.title}</h2>
        <p className={styles.musclesDescription}>{data.muscles.description}</p>
        <div className={styles.muscleGrid}>
          {data.muscles.list.map((muscle, index) => (
            <div key={index} className={styles.muscleCard}>
              <div className={styles.muscleNumber}>{index + 1}</div>
              <h3 className={styles.muscleName}>{muscle.name}</h3>
              <p className={styles.muscleDescription}>{muscle.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Functions Section */}
      <div className={styles.functionsSection}>
        <h2 className={styles.sectionTitle}>{data.functions.title}</h2>
        <div className={styles.functionsContent}>
          {data.functions.content.map((item, index) => (
            <p key={index} className={styles.functionItem}>{item}</p>
          ))}
        </div>
      </div>

      {/* Importance Section */}
      <div className={styles.importanceSection}>
        <h2 className={styles.sectionTitle}>{data.importance.title}</h2>
        <p className={styles.importanceText}>{data.importance.content}</p>
      </div>

      {/* Exercises Section */}
      <div className={styles.exercisesSection}>
        <h2 className={styles.sectionTitle}>{exerciseData.title}</h2>
        <h3 className={styles.exerciseSubtitle}>{exerciseData.subtitle}</h3>
        <p className={styles.exerciseIntro}>{exerciseData.intro}</p>
        
        <div className={styles.exercisesGrid}>
          {exerciseData.exercises.map((exercise) => (
            <div key={exercise.id} className={styles.exerciseCard}>
              <div className={styles.exerciseContent}>
                <h4 className={styles.exerciseTitle}>{exercise.title}</h4>
                <div className={styles.exerciseDetails}>
                  <span className={styles.exerciseDetail}>⏱ {exercise.duration}</span>
                  <span className={styles.exerciseDetail}>🔄 {exercise.reps}</span>
                </div>
                <p className={styles.exerciseDescription}>{exercise.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Exercise Tips */}
        <div className={styles.tipsSection}>
          <h3 className={styles.tipsTitle}>{exerciseData.tips.title}</h3>
          <ul className={styles.tipsList}>
            {exerciseData.tips.list.map((tip, index) => (
              <li key={index} className={styles.tipItem}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reference */}
      <div className={styles.referenceSection}>
        <p className={styles.referenceText}>
          {language === 'no' ? 'Kilde: ' : 'Source: '}
          <a 
            href="https://sml.snl.no/bekkenbunnen" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.referenceLink}
          >
            Store medisinske leksikon (SNL)
          </a>
        </p>
      </div>
    </div>
  )
}

