"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"


// Content data structure
type ContentItem = 
  | {
      id: string
      type: "intro"
      intro: string
      lastUpdated: string
    }
  | {
      id: string
      type: "references"
      title: string
      references: readonly string[]
    }

const REFERENCES_DATA = {
  no: [
    {
      id: "intro",
      type: "intro",
      intro: 'Emnet "Urinlekkasje" er utviklet av en gruppe spesialister med kunnskap på fagområdet. Sidene er utarbeidet på bakgrunn av evidensbasert kunnskap og i tillegg gir erfaringsbasert kunnskap en viktig tilleggsinformasjon i formidlingen.',
      lastUpdated: "Sist endret 01.07.2020."
    },
    {
      id: "references",
      type: "references",
      title: "Referanser",
      references: [
        "Drake MJ, Nixon PM et al. Drug-induced bladder and urinary disorders. Drug safety 1998; 19(1): 45-55.",
        "Ebbesen, Marit Helen, Hunskaar, Steinar, Rortveit, Guri og Yngvild Skaatun Hannestad (2013): \"Prevalence, incidence and remission of urinary incontinence in women: longitudinal data from the Norwegian HUNT study (EPINCONT)\", i BMC Urology 2013, 13:27. Elektronisk utgave her.",
        "Gleason, Jonathan L., Richter, Holly E., Redden, David T., Goode, Patricia S., Burgio, Kathryn L. og Alayne D. Markland (2013): \"Caffeine, and Urinary Incontinence in US Women\", i Int Urogynecol J. 2013 February; 24(2): 295–302.",
        "Hannestad, Y.S., et al., \"A community-based epidemiological survey of female urinary incontinence: the Norwegian EPINCONT study. Epidemiology of Incontinence in the County of Nord-Trondelag.\" J Clin Epodemiol, 2000. 53(11): p. 1150-7.",
        "Hellström, A. og Lindehall B. \"Uroterapi.\" Författarna och Studentlitteratur, 2006.",
        "Hunskaar, Steinar, Burgio, Kathryn, Diokno, Anaias, Herzog, A. Regula, Hjalmås, Kelm og Marie C. Lapitan (2003): \"Epidemiology and Natural History of Urinary Incontinence in Women\", i Urology. 2003 Oct;62(4 Suppl 1):16-23.",
        "International Incontinence Society (2005); \"Evaluation and treatment of urinary incontinence, pelvic organ prolapse and faecal incontinence.\"",
        "Malmberg, L. og Mattiasson, A. \"I vått och torrt: om de nedre urinvägarnas funktionsstörningar\". Författarna och Studentlitteratur, 2005.",
        "Milsom, I., et al., Epidemiology of urinary incontinence (UI) and other lower urinary tract symptoms (LUTS), pelvic organ prolapse (POP) and anal (AI) incontinence, in Incontinence, P. Abrams, Cardoxo, L., Wagg, A., Wein, A., Editor. 2017, 6th International Consultation on Incontinence.",
        "Norlen L. og Siltberg, H. \"Hålla tätt. En bok om urininkontinens och överaktiv blåsa.\" Pharmacia Sverige AB, 2003.",
        "Norsk Gynekologisk Veileder i gynekologi – Inkontinens.",
        "Norsk Urologisk Forening – Anbefalinger for allmennleger.",
        "Omli, Ragnhild, Hunskaar, Steinar, Mykletun, Arnstein, Romild, Ulla og Esther Kuhry (2013): \"Urinary incontinence and risk of functional decline in older women: data from the Norwegian HUNT-study\", i BMC Geriatrics 2013, 13:47. Elektronisk utgave.",
        "Shamliyan, Tatyana A., Wyman, Jean F., Ping, Ryan, Wilt, Timothy J. og Robert L. Kane (2009): \"Male Urinary Incontinence: Prevalence, Risk Factors, and Preventive Interventions\", i Rev Urol. 2009 Summer;11(3):145-65.",
        "Wille, S. og Hjälmås, K. \"Sängvätning och annan urininkontinens hos barn.\" Författarna och Studentlitteratur, 1997.",
        "Zubieta M, Carr RL, Drake MJ, Bø K. \"Influence of voluntary pelvic floor muscle contraction and pelvic floor muscle training on urethral closure pressures: a systematic literature review.\" Int Urogynecol J. 2016 May;27(5):687-96. doi: 10.1007/s00192-015-2856-9. Epub 2015 Sep 25. Review.",
        "Xu D, Huang L, Gao J, et al. \"Effects of an education program on toileting behaviors and bladder symptoms in overactive bladder patients with type 2 diabetes: A randomized clinical trial.\" Int J Nurs Stud. 2018 Jul 8;87:131-139. doi: 10.1016/j.ijnurstu.2018.07.001."
      ]
    }
  ],
  en: [
    {
      id: "intro",
      type: "intro",
      intro: 'The topic "Urinary incontinence" has been developed by a group of specialists with knowledge in the field. The pages are based on evidence-based knowledge and experience-based knowledge provides important additional information in the communication.',
      lastUpdated: "Last updated 01.07.2020."
    },
    {
      id: "references",
      type: "references",
      title: "References",
      references: [
        "Drake MJ, Nixon PM et al. Drug-induced bladder and urinary disorders. Drug safety 1998; 19(1): 45-55.",
        "Ebbesen, Marit Helen, Hunskaar, Steinar, Rortveit, Guri og Yngvild Skaatun Hannestad (2013): \"Prevalence, incidence and remission of urinary incontinence in women: longitudinal data from the Norwegian HUNT study (EPINCONT)\", i BMC Urology 2013, 13:27. Elektronisk utgave her.",
        "Gleason, Jonathan L., Richter, Holly E., Redden, David T., Goode, Patricia S., Burgio, Kathryn L. og Alayne D. Markland (2013): \"Caffeine, and Urinary Incontinence in US Women\", i Int Urogynecol J. 2013 February; 24(2): 295–302.",
        "Hannestad, Y.S., et al., \"A community-based epidemiological survey of female urinary incontinence: the Norwegian EPINCONT study. Epidemiology of Incontinence in the County of Nord-Trondelag.\" J Clin Epodemiol, 2000. 53(11): p. 1150-7.",
        "Hellström, A. og Lindehall B. \"Uroterapi.\" Författarna och Studentlitteratur, 2006.",
        "Hunskaar, Steinar, Burgio, Kathryn, Diokno, Anaias, Herzog, A. Regula, Hjalmås, Kelm og Marie C. Lapitan (2003): \"Epidemiology and Natural History of Urinary Incontinence in Women\", i Urology. 2003 Oct;62(4 Suppl 1):16-23.",
        "International Incontinence Society (2005); \"Evaluation and treatment of urinary incontinence, pelvic organ prolapse and faecal incontinence.\"",
        "Malmberg, L. og Mattiasson, A. \"I vått och torrt: om de nedre urinvägarnas funktionsstörningar\". Författarna och Studentlitteratur, 2005.",
        "Milsom, I., et al., Epidemiology of urinary incontinence (UI) and other lower urinary tract symptoms (LUTS), pelvic organ prolapse (POP) and anal (AI) incontinence, in Incontinence, P. Abrams, Cardoxo, L., Wagg, A., Wein, A., Editor. 2017, 6th International Consultation on Incontinence.",
        "Norlen L. og Siltberg, H. \"Hålla tätt. En bok om urininkontinens och överaktiv blåsa.\" Pharmacia Sverige AB, 2003.",
        "Norsk Gynekologisk Veileder i gynekologi – Inkontinens.",
        "Norsk Urologisk Forening – Anbefalinger for allmennleger.",
        "Omli, Ragnhild, Hunskaar, Steinar, Mykletun, Arnstein, Romild, Ulla og Esther Kuhry (2013): \"Urinary incontinence and risk of functional decline in older women: data from the Norwegian HUNT-study\", i BMC Geriatrics 2013, 13:47. Elektronisk utgave.",
        "Shamliyan, Tatyana A., Wyman, Jean F., Ping, Ryan, Wilt, Timothy J. og Robert L. Kane (2009): \"Male Urinary Incontinence: Prevalence, Risk Factors, and Preventive Interventions\", i Rev Urol. 2009 Summer;11(3):145-65.",
        "Wille, S. og Hjälmås, K. \"Sängvätning och annan urininkontinens hos barn.\" Författarna och Studentlitteratur, 1997.",
        "Zubieta M, Carr RL, Drake MJ, Bø K. \"Influence of voluntary pelvic floor muscle contraction and pelvic floor muscle training on urethral closure pressures: a systematic literature review.\" Int Urogynecol J. 2016 May;27(5):687-96. doi: 10.1007/s00192-015-2856-9. Epub 2015 Sep 25. Review.",
        "Xu D, Huang L, Gao J, et al. \"Effects of an education program on toileting behaviors and bladder symptoms in overactive bladder patients with type 2 diabetes: A randomized clinical trial.\" Int J Nurs Stud. 2018 Jul 8;87:131-139. doi: 10.1016/j.ijnurstu.2018.07.001."
      ]
    }
  ]
} as const

export const References = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = REFERENCES_DATA[language];

  const renderContent = (item: ContentItem) => {
    if (item.type === "intro") {
      return (
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {item.intro}
            </p>
            
            <p className={styles.enhancedParagraph}>
              <strong>{item.lastUpdated}</strong>
            </p>
          </div>
        </div>
      )
    }

    if (item.type === "references") {
      return (
        <SectionAccordion 
          title={item.title} 
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <ul className={styles.resourceList}>
            {item.references.map((reference, index) => (
              <li key={index} className={styles.resourceListItem}>
                {reference}
              </li>
            ))}
          </ul>
        </SectionAccordion>
      )
    }

    return null
  }

  return (
    <>
      {/* Introduction Section */}

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img src="/resource.png" alt="References" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>{language === 'no' ? 'Referanser' : 'References'}</h2>
        </div>
        <div className={styles.sectionContent}>
          {data.map((item) => (
            <div key={item.id}>
              {renderContent(item)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
