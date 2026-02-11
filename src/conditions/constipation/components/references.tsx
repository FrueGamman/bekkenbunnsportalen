"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

const REFERENCES_DATA = {
  no: {
    pageTitle: "Referanser",
    introText: "Emnet \"Tømmingsproblemer og forstoppelse for avføring\" er utviklet av en gruppe spesialister med kunnskap på fagområdet. Sidene er utarbeidet på bakgrunn av evidensbasert kunnskap og i tillegg gir erfaringsbasert kunnskap en viktig tilleggsinformasjon i formidlingen.",
    lastUpdated: "Sist endret 01.07.2020.",
    guidelinesTitle: "Retningslinje",
    guidelines: [
      {
        title: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser (2019).",
        url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/AI%20retningslinjer%202019%20pdf_0.pdf",
        description: "Retningslinjen er utarbeidet av Norsk gruppe for konservativ behandling av anorektale funksjonsforstyrrlser. Dette er en nasjonal anbefaling hvor formålet er å kvalitetssikre både utredning og behandling av AI og kronisk obstipasjon, og gi pasienter lik mulighet til anbefalt pasientforløp, uavhengig av bosted. Utarbeidelsen av den norske retningslinjen er basert på de engelske NICE guidelines, danske guidelines, ICS, Norsk elektronisk legehåndbok, kunnskap fra klinisk praksis og litteratursøk. Der tilpasninger til norske forhold har vært nødvendig, er dette gjort i henhold til prinsippet for best clinical practice."
      }
    ],
    articlesTitle: "Artikler",
    articles: [
      "\"Kronisk obstipasjon og betydning af livsstilsfaktorer\" Mette Borre, Niels Qivst, Dennis raahave, Jonas Worsøe, Jørgen Peter Ærthøj, Peter Christensen og Klaus Krogh. 2015;177:V09140498.",
      "\"Behandling af kronisk obstipasjon hos voksne\" Jørgen Peter Ærthøj, Mette Borre, Klaus Krogh. Kirurgisk afd. P Aarhus Universitetshospital m.fl.",
      "UpToDate. Chronic complications of spinal cord injury and disease. Literature review current through: Nov 2015. This topic last updated: Jul 15, 2014. Authors; Gary M Abrams, MD. Marc Wakasa, MD, Section Editor; Michael J Aminoff, MD, DSc. Deputy Editor: Janet L Wilterdink, MD."
    ],
    booksTitle: "Bøker",
    books: [
      "Læringsnøkkelen. Britt Fadnes og Kirsti Leira, 2010."
    ]
  },
  en: {
    pageTitle: "References",
    introText: "The topic \"Bowel Evacuation Problems and Constipation\" is developed by a group of specialists with knowledge in the field. The pages are based on evidence-based knowledge and in addition, experience-based knowledge provides important additional information in the communication.",
    lastUpdated: "Last updated 01.07.2020.",
    guidelinesTitle: "Guidelines",
    guidelines: [
      {
        title: "Clinical Guidelines for Assessment and Conservative Treatment of Anorectal Functional Disorders (2019).",
        url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/AI%20retningslinjer%202019%20pdf_0.pdf",
        description: "The guidelines are developed by the Norwegian Group for Conservative Treatment of Anorectal Functional Disorders. This is a national recommendation where the purpose is to quality assure both assessment and treatment of AI and chronic constipation, and give patients equal opportunity for recommended patient pathway, regardless of residence. The development of the Norwegian guidelines is based on the English NICE guidelines, Danish guidelines, ICS, Norwegian Electronic Medical Handbook, knowledge from clinical practice and literature search. Where adaptations to Norwegian conditions have been necessary, this has been done according to the principle of best clinical practice."
      }
    ],
    articlesTitle: "Articles",
    articles: [
      "\"Chronic constipation and the importance of lifestyle factors\" Mette Borre, Niels Qivst, Dennis raahave, Jonas Worsøe, Jørgen Peter Ærthøj, Peter Christensen and Klaus Krogh. 2015;177:V09140498.",
      "\"Treatment of chronic constipation in adults\" Jørgen Peter Ærthøj, Mette Borre, Klaus Krogh. Surgical Dept. P Aarhus University Hospital et al.",
      "UpToDate. Chronic complications of spinal cord injury and disease. Literature review current through: Nov 2015. This topic last updated: Jul 15, 2014. Authors; Gary M Abrams, MD. Marc Wakasa, MD, Section Editor; Michael J Aminoff, MD, DSc. Deputy Editor: Janet L Wilterdink, MD."
    ],
    booksTitle: "Books",
    books: [
      "Learning Key. Britt Fadnes and Kirsti Leira, 2010."
    ]
  }
} as const

export const References = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = REFERENCES_DATA[language]

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="References" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {data.introText}
            </p>
            
            <p className={styles.enhancedParagraph}>
              <strong>{data.lastUpdated}</strong>
            </p>
          </div>
        </div>

        <SectionAccordion 
          title={data.guidelinesTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            {data.guidelines.map((guideline, index) => (
              <div key={index} className={styles.referenceItem}>
                <h4 className={styles.referenceTitle}>
                  <a href={guideline.url} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                    {guideline.title}
                  </a>
                </h4>
                <p className={styles.enhancedParagraph}>{guideline.description}</p>
              </div>
            ))}
          </div>
        </SectionAccordion>

        <SectionAccordion 
          title={data.articlesTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <ul className={styles.resourceList}>
              {data.articles.map((article, index) => (
                <li key={index} className={styles.resourceListItem}>
                  {article}
                </li>
              ))}
            </ul>
          </div>
        </SectionAccordion>

        <SectionAccordion 
          title={data.booksTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <ul className={styles.resourceList}>
              {data.books.map((book, index) => (
                <li key={index} className={styles.resourceListItem}>
                  {book}
                </li>
              ))}
            </ul>
          </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}
