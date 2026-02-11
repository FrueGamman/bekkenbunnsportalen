"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'
import BackgroundVideoGroup from '../../../components/BackgroundVideoGroup'

// Bilingual data structure
const SYMPTOMS_DATA = {
  no: {
    pageTitle: "Symptomer",
    patientQuote: "En morgen ble jeg spurt av ei venninne om å være med å gå tur. Jeg rakk ikke å gå på toalettet før vi gikk, og i løpet av turen kjente jeg at uhellet var ute. Jeg måtte raskt finne på en unnskyldning og gå hjem før hun merket noe.",
    patientAttribution: "Kvinne, 53 år",
    symptomsIntro: "Mange opplever analinkontinens som en stor belastning, og det påvirker livskvaliteten negativt. Folk som har slike plager, bruker ofte mye tid på å kartlegge offentlige toaletter og det kan bli vanskelig å reise og delta i intime og sosiale situasjoner.",
    symptomsImpact: "Som en av de mest tabubelagte temaene i samfunnet, er avføringslekkasje noe man sjelden hører om. De fleste forbinder det med sykehjem og eldre mennesker. I virkeligheten rammer det både unge og eldre, og det er vanskelig å si nøyaktig hvor mange fordi mørketallene sannsynligvis er store.",
    characteristicsTitle: "Kjennetegn ved analinkontinens",
    symptoms: [
      "Ufrivillig lekkasje via endetarmen av luft, flytende avføring eller fast avføring",
      "Soiling (striper i undertøyet)",
      "Lekkasje ved samleie",
      "Episoder med brå og sterk trang til avføring (hastverkslekkasje/urge)",
      "Manglende evne til å kjenne at du skal ha avføring",
      "Ufullstendig tømming ved toalettbesøk",
      "Nedsatt lyst til å være aktiv og sosial på grunn av lekkasjer eller frykt for dette"
    ],
    illustration: "/firegenerasjoner.jpg",
    illustrationCaption: "Illustrasjonsfoto. Som en av de mest tabubelagte temaene i samfunnet, er avføringslekkasje noe man sjelden hører om. De fleste forbinder det med sykehjem og eldre mennesker. I virkeligheten er det 2-8% av befolkningen hvor begge kjønn rammes, unge så vel som eldre.",
    patientStoryTitle: "Pasienthistorier",
    visitLink: "Les historien"
  },
  en: {
    pageTitle: "Symptoms",
    patientQuote: "One morning I was asked by a friend to go for a walk. I didn't have time to go to the toilet before we left, and during the walk I felt that the accident had happened. I had to quickly make an excuse and go home before she noticed anything.",
    patientAttribution: "Woman, 53 years",
    symptomsIntro: "Many experience anal incontinence as a great burden, and it negatively affects quality of life. People with such problems often spend a lot of time mapping public toilets and it can become difficult to travel and participate in intimate and social situations.",
    symptomsImpact: "As one of the most taboo topics in society, fecal incontinence is something we rarely hear about. Most people associate it with nursing homes and older people. In reality it affects both young and old, and it is difficult to say exactly how many because unreported cases are probably common.",
    characteristicsTitle: "Characteristics of anal incontinence",
    symptoms: [
      "Involuntary leakage of gas, liquid or solid stool",
      "Soiling (stains in underwear)",
      "Leakage during intercourse",
      "Episodes of sudden and strong urge to defecate (urgency)",
      "Impaired sensation of the need to pass stool",
      "Incomplete emptying during toilet visits",
      "Reduced desire to be active and social because of leakage or fear of leakage"
    ],
    patientStoryTitle: "Patient Stories",
    visitLink: "Read the story"
  }
} as const

const patientStories = [
  {
    id: "vibeke",
    title: "Vibeke Sætherskar",
    summary: {
      no: "Vibeke Sætherskar opplevde å miste kontrollen over avføringen, og hun fikk også god hjelp.",
      en: "Vibeke Sætherskar experienced loss of bowel control and received help."
    },
    image: "/vibeke-259x300.jpg",
    imageAlt: "Vibeke Sætherskar",
    imageCaption: "",
    link: "http://www.klikk.no/foreldre/helse/article801667.ece"
  },
  {
    id: "abid-raja",
    title: "Abid Q. Raja",
    summary: {
      no: "Les den sterke historien fra vår kultur- og likestillingsminister Abid Raja om å leve med funksjonsforstyrrelse, forstoppelse og lekkasje for avføring.",
      en: "Read the powerful story from Minister Abid Q. Raja about living with functional disorders, constipation and fecal leakage."
    },
    image: "/abid-raja-20200204.jpg",
    imageAlt: "Abid Q. Raja",
    imageCaption: "Foto: Ilja C. Hendel/Kulturdepartementet",
    link: "https://www.vg.no/helse/i/zG2QL1/det-han-aldri-har-fortalt"
  },
]

export const Symptoms = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = SYMPTOMS_DATA[language]

  return (
    <>

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img src="/inSymptoms.png" alt="Symptoms" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.normalFunctionSection}>
            <div className={styles.normalFunctionContent}>
              <div className={styles.highlightBox}>
                <p className={styles.enhancedParagraph}>{data.patientQuote}</p>
                <p className={styles.enhancedParagraph}>
                  <em>{data.patientAttribution}</em>
                </p>
              </div>
            </div>

            <div className={styles.normalFunctionContent}>
              <p className={styles.enhancedParagraph}>{data.symptomsIntro}</p>
              <p className={styles.enhancedParagraph}>{data.symptomsImpact}</p>
              {language === "no" && (SYMPTOMS_DATA.no as any).illustration && (
                <div className={styles.illustrationContainer}>
                  <img src={(SYMPTOMS_DATA.no as any).illustration} alt={(SYMPTOMS_DATA.no as any).illustrationCaption || ''} className={styles.illustrationImage} />
                  <p className={styles.illustrationCaption}>{(SYMPTOMS_DATA.no as any).illustrationCaption}</p>
                </div>
              )}
            </div>
          </div>

          <SectionAccordion 
            title={data.characteristicsTitle}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
          <ul className={styles.resourceList}>
            {data.symptoms.map((symptom) => (
              <li key={symptom} className={styles.resourceListItem}>
                {symptom}
              </li>
            ))}
          </ul>
        </SectionAccordion>

        <SectionAccordion 
          title={data.patientStoryTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
            <div className={styles.gpEnhancedSection}>
              <div className={styles.gpMappingGrid}>
                {patientStories.map((s) => (
                  <div key={s.id} className={styles.gpSectionCard}>
                    <div className={styles.gpCardTitle}>
                      <span>{s.title}</span>
                    </div>
                    <div className={styles.gpCardContent}>
                      {s.image && (
                        <div className={styles.storyImageWrap}>
                          <img src={s.image} alt={(s as any).imageAlt || s.title} className={styles.storyImage} />
                          {s.imageCaption && <p className={styles.illustrationCaption}>{s.imageCaption}</p>}
                        </div>
                      )}
                      <p className={styles.storyDescription}>
                        {language === "no" ? s.summary.no : s.summary.en}
                      </p>
                      <button
                        onClick={() => window.open(s.link, "_blank")}
                        className={`${styles.resourceLink} ${styles.storyButton}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points="15,3 21,3 21,9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <line
                            x1="10"
                            y1="14"
                            x2="21"
                            y2="3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {data.visitLink}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}
