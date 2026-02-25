"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

// Bilingual data structure
const REFERENCES_DATA = {
  no: {
    pageTitle: "Referanser",
    introText: "Emnet \"Avføringslekkasje\" er utviklet av en gruppe spesialister med kunnskap på fagområdet. Sidene er utarbeidet på bakgrunn av evidensbasert kunnskap og i tillegg gir erfaringsbasert kunnskap en viktig tilleggsinformasjon i formidlingen.",
    lastUpdated: "Sist endret 01.07.2020.",
    
    guidelinesTitle: "Retningslinje",
    guidelines: [
      {
        title: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser (2019)",
        url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf",
        description: "Retningslinjen er utarbeidet av Norsk gruppe for konservativ behandling av anorektale funksjonsforstyrrlser. Dette er en nasjonal anbefaling hvor formålet er å kvalitetssikre både utredning og behandling av AI og kronisk obstipasjon, og gi pasienter lik mulighet til anbefalt pasientforløp, uavhengig av bosted. Utarbeidelsen av den norske retningslinjen er basert på de engelske NICE guidelines, danske guidelines, ICS, Norsk elektronisk legehåndbok, kunnskap fra klinisk praksis og litteratursøk. Der tilpasninger til norske forhold har vært nødvendig, er dette gjort i henhold til prinsippet for best clinical practice."
      }
    ],
    
    articlesTitle: "Fagartikler",
    articles: [
      "Duelund-Jakobsen, S. Haas, S. Buntzen, L. Lundby, G. Bøje and S. Laurberg. Nurse-led clinics can manage faecal incontinence effectively:results from a tertiary referral centreJ. i: Colorectal DiseaseVolume 17, Issue 8 (2015)",
      "Emmanuel, A. The physiology of defaecation and continence, i: Bowel Continence Nursing, Beaconsfield Publishers Ltd. Edited by Norton, C. and S. Chelvanayagam (2003).",
      "Harari, D. Bowel care in old age, i: Bowel Continence Nursing, Beaconsfield Publishers Ltd. Edited by Norton, C. and S. Chelvanayagam (2003).",
      "Li J., Yuan, M., Liu, Y., Wang. J., Guo, W., (2017) Incidence of constipation in stroke patients: A systematic review and meta-analysis. Medicin (Blatimore) 96(25):e7225",
      "Milsom, I., et al., Epidemiology of urinary incontinence (UI) and other lower urinary tract symptoms (LUTS), pelvic organ prolapse (POP) and anal (AI) incontinence, in Incontinence, P. Abrams, Cardoxo, L., Wagg, A., Wein, A., Editor. 2017, 6th International Consultation on Incontinence.",
      "Norderval, S., Rydningen, M., Lindsetmo, R-O. og D. Lein, B. Vonen (2011). \"Oversiktsartikkel: Sakralnervestimulering.\", i Tidsskr Nor Legeforen 2011; 131:1190 – 3",
      "Dehli, T., Norderval, S., Lindsetmo, R-O. og B.Vonen (2008): \"Oversiktsartikkel: Utredning av anal inkontinens hos voksne.\", i Tidsskriftet Norske Legeforening 2008; 128:1670 – 2",
      "Whitehead, WE, Borrud, L, Goode, PS, Meikle, S, Mueller, ER,Tuteja, A, et al. (2009): \"Fecal incontinence in US adults: epidemiology and risk factors\", i Gastroenterology 2009;137:512–17.",
      "\"Sfinkterskader ved fødsel bør reduseres i Norge, Nasjonal handlingsplan\". Oslo: Sosial- og helsedirektoratet, Nasjonalt råd for fødselsomsorg, 2006.",
      "Huebner, M., et al. (2013). \"Fecal incontinence after obstetric anal sphincter injuries.\" Int J Gynaecol Obstet."
    ],
    
    abuseStatsTitle: "Om hyppighet av overgrep",
    abuseStats: [
      "Sæthre og Holte: Totalt 19% kvinner, 14% menn Alvorlig: 14% kvinner, 9% menn",
      "Folkehelsa, (1994): Totalt: 13% kvinner, 7% menn Alvorlig: 9% kvinner, 5% menn",
      "E.K. Normann: 5% opplever (før de er 18 år) gjentatte, alvorlige seksuelle overgrep",
      "Finkelhor, (USA 1979): 19% kvinner, 9% menn. 1985: 27% kvinner, 16% menn(2015"
    ]
  },
  en: {
    pageTitle: "References",
    introText: "The topic \"Fecal Incontinence\" is developed by a group of specialists with knowledge in the field. The pages are based on evidence-based knowledge and in addition, experience-based knowledge provides important additional information in the communication.",
    lastUpdated: "Last updated 01.07.2020.",
    
    guidelinesTitle: "Guidelines",
    guidelines: [
      {
        title: "Clinical Guidelines for Assessment and Conservative Treatment of Anorectal Functional Disorders (2019)",
        url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf",
        description: "The guidelines are developed by the Norwegian group for conservative treatment of anorectal functional disorders. This is a national recommendation where the purpose is to quality assure both assessment and treatment of AI and chronic constipation, and give patients equal opportunity for recommended patient pathway, regardless of residence. The development of the Norwegian guidelines is based on the English NICE guidelines, Danish guidelines, ICS, Norwegian electronic medical handbook, knowledge from clinical practice and literature search. Where adaptations to Norwegian conditions have been necessary, this has been done according to the principle of best clinical practice."
      }
    ],
    
    articlesTitle: "Scientific Articles",
    articles: [
      "Duelund-Jakobsen, S. Haas, S. Buntzen, L. Lundby, G. Bøje and S. Laurberg. Nurse-led clinics can manage faecal incontinence effectively:results from a tertiary referral centreJ. i: Colorectal DiseaseVolume 17, Issue 8 (2015)",
      "Emmanuel, A. The physiology of defaecation and continence, i: Bowel Continence Nursing, Beaconsfield Publishers Ltd. Edited by Norton, C. and S. Chelvanayagam (2003).",
      "Harari, D. Bowel care in old age, i: Bowel Continence Nursing, Beaconsfield Publishers Ltd. Edited by Norton, C. and S. Chelvanayagam (2003).",
      "Li J., Yuan, M., Liu, Y., Wang. J., Guo, W., (2017) Incidence of constipation in stroke patients: A systematic review and meta-analysis. Medicin (Blatimore) 96(25):e7225",
      "Milsom, I., et al., Epidemiology of urinary incontinence (UI) and other lower urinary tract symptoms (LUTS), pelvic organ prolapse (POP) and anal (AI) incontinence, in Incontinence, P. Abrams, Cardoxo, L., Wagg, A., Wein, A., Editor. 2017, 6th International Consultation on Incontinence.",
      "Norderval, S., Rydningen, M., Lindsetmo, R-O. og D. Lein, B. Vonen (2011). \"Overview article: Sacral nerve stimulation.\", i Tidsskr Nor Legeforen 2011; 131:1190 – 3",
      "Dehli, T., Norderval, S., Lindsetmo, R-O. og B.Vonen (2008): \"Overview article: Assessment of anal incontinence in adults.\", i Tidsskriftet Norske Legeforening 2008; 128:1670 – 2",
      "Whitehead, WE, Borrud, L, Goode, PS, Meikle, S, Mueller, ER,Tuteja, A, et al. (2009): \"Fecal incontinence in US adults: epidemiology and risk factors\", i Gastroenterology 2009;137:512–17.",
      "\"Sphincter injuries during childbirth should be reduced in Norway, National action plan\". Oslo: Social and Health Directorate, National Council for Birth Care, 2006.",
      "Huebner, M., et al. (2013). \"Fecal incontinence after obstetric anal sphincter injuries.\" Int J Gynaecol Obstet."
    ],
    
    abuseStatsTitle: "About frequency of abuse",
    abuseStats: [
      "Sæthre and Holte: Total 19% women, 14% men Serious: 14% women, 9% men",
      "Public Health, (1994): Total: 13% women, 7% men Serious: 9% women, 5% men",
      "E.K. Normann: 5% experience (before they are 18 years old) repeated, serious sexual abuse",
      "Finkelhor, (USA 1979): 19% women, 9% men. 1985: 27% women, 16% men(2015"
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
        </SectionAccordion>

        <SectionAccordion 
          title={data.articlesTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <ul className={styles.resourceList}>
            {data.articles.map((article, index) => (
              <li key={index} className={styles.resourceListItem}>
                {article}
              </li>
            ))}
          </ul>
        </SectionAccordion>

        <SectionAccordion 
          title={data.abuseStatsTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <ul className={styles.resourceList}>
            {data.abuseStats.map((stat, index) => (
              <li key={index} className={styles.resourceListItem}>
                {stat}
              </li>
            ))}
          </ul>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}
