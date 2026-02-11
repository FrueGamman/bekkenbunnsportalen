"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"

const INTRODUCTION_DATA = {
  no: {
    description: "På disse sidene finner du informasjon om tømmingsproblemer for urin, urinretensjon. Her er informasjon om normal funksjon av vannlatingen, symptomer på tømmingsproblemer, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet.",
    keyPoints: [
      "Utforsk vitenskapelige artikler og studier",
      "Få tilgang til faglige retningslinjer",
      "Les mer om evidensbasert kunnskap",
      "Finn kilder til videre studier"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Referanser for urinretensjon",
      caption: "Oversikt over faglige kilder og referanser"
    }
  },
  en: {
    description: "On these pages you will find information about urinary emptying problems, urinary retention. Here is information about normal urination function, symptoms of emptying problems, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected.",
    keyPoints: [
      "Explore scientific articles and studies",
      "Access professional guidelines",
      "Read more about evidence-based knowledge",
      "Find sources for further study"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "References for urinary retention",
      caption: "Overview of professional sources and references"
    }
  }
} as const;

const REFERENCES_DATA = {
  no: {
    pageTitle: "Referanser",
    intro: "Emnet \"Tømmingsproblemer for urin\" er utviklet av en gruppe spesialister med kunnskap på fagområdet. Sidene er utarbeidet på bakgrunn av evidensbasert kunnskap og i tillegg gir erfaringsbasert kunnskap en viktig tilleggsinformasjon i formidlingen.",
    lastUpdated: "Sist endret 01.07.2020.",
    referencesTitle: "Referanser",
    references: [
      {
        id: "borre_2015",
        authors: "Borre M, Qivst N, Raahave D, Worsøe J, Ærthøj JP, Christensen P og Krogh K",
        title: "Kronisk obstipasjon og betydning af livsstilsfaktorer Ugeskrift for Læger, 2015, Vol 177, Issue 15, p. 2-6",
        link: {
          text: "Read Article",
          url: "https://ugeskriftet.dk/videnskab/kronisk-obstipation-og-betydning-af-livsstilsfaktorer"
        }
      },
      {
        id: "christensen_2015",
        authors: "Christensen P, Niels Qvist, Dennis Raahave, Jonas Worsøe, Jørgen Peter Ærthøj, Mette Borre, Klaus Krogh",
        title: "Kirurgisk afd. P Aarhus Universitetshospital m.fl. \"Behandling af kronisk obstipasjon hos voksne\". Guidline fra 2015",
        link: {
          text: "Download PDF",
          url: "https://dsak.dk/wp-content/uploads/2017/07/Obstipation-hos-voksne.pdf"
        }
      },
      {
        id: "ebbesen_2013",
        authors: "Ebbesen MH, Hunskaar S, Rortveit G and Hannestad YS Yngvild Skaatun",
        title: "Prevalence, incidence and remission of urinary incontinence in women: longitudinal data from the Norwegian HUNT study (EPINCONT) BMC Urology/2013",
        link: {
          text: "Read Study",
          url: "https://bmcurol.biomedcentral.com/articles/10.1186/1471-2490-13-27"
        }
      },
      {
        id: "fadnes_2010",
        authors: "Fadnes B, Leira K og Brodal P (2010)",
        title: "Læringsnøkkelen (Bok). Universitetsforlaget.",
        link: null
      },
      {
        id: "hannestad_2000",
        authors: "Hannestad YS, Rortveit G, Sandvik H, Hunskaar S",
        title: "A community-based epidemiological survey of female urinary incontinence: the Norwegian EPINCONT study. Epidemiology of Incontinence in the County of Nord-Trondelag. Journal of Clinical Epidemiology/2000",
        link: {
          text: "View Article",
          url: "https://www.sciencedirect.com/science/article/pii/S0895435600002328?via%3Dihub"
        }
      },
      {
        id: "hellstrom_2006",
        authors: "Hellström AL, Lindehall (2006)",
        title: "Uroterapi (Bok). Lund, Studentlitteratur.",
        link: null
      },
      {
        id: "hunskaar_2003",
        authors: "Hunskaar S, Burgio K, Diokno A, Herzog AR, Hjalmås K and Lapitan MC",
        title: "Epidemiology and Natural History of Urinary Incontinence in Women. Urology/2003 Oct",
        link: {
          text: "View Article",
          url: "https://www.sciencedirect.com/science/article/pii/S0090429503007556?via%3Dihub"
        }
      },
      {
        id: "knowles_2016",
        authors: "Knowles SRS and Skues J",
        title: "Development and validation of the Shy Bladder and Bowel Scale (SBBS).",
        link: {
          text: "Read Research",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4960499/"
        }
      },
      {
        id: "lyons_2019",
        authors: "Lyons A",
        title: "Paruresis and parcopresis: How GPs can help. NewsGP/2019",
        link: {
          text: "Read Article",
          url: "https://www1.racgp.org.au/newsgp/clinical/paruresis-and-parcopresis-how-gps-can-help"
        }
      },
      {
        id: "milsom_2017",
        authors: "Milsom I, Altman D, Cartwright R, Lapitan MC, Nelson R, Sjöström s, Tikkinen K",
        title: "Incontinence; Epidemiology of urinary incontinence (UI) and other lower urinary tract symptoms (LUTS), pelvic organ prolapse (POP) and anal (AI) incontinence. Edited by Abrams P, Cardoxo L, Wagg A, Wein A. 6th International Consultation on Incontinence. 2017;4-92. Incontinence 6th Edition 2017",
        link: {
          text: "Download PDF",
          url: "https://www.ics.org/publications/ici_6/Incontinence_6th_Edition_2017_eBook_v2.pdf"
        }
      }
    ]
  },
  en: {
    pageTitle: "References",
    intro: "The topic \"Urinary retention\" has been developed by a group of specialists with knowledge in the field. The pages are based on evidence-based knowledge and experience-based knowledge provides important additional information in the communication.",
    lastUpdated: "Last updated 01.07.2020.",
    referencesTitle: "References",
    references: [
      {
        id: "borre_2015",
        authors: "Borre M, Qivst N, Raahave D, Worsøe J, Ærthøj JP, Christensen P and Krogh K",
        title: "Chronic constipation and the significance of lifestyle factors Ugeskrift for Læger, 2015, Vol 177, Issue 15, p. 2-6",
        link: {
          text: "Read Article",
          url: "https://ugeskriftet.dk/videnskab/kronisk-obstipation-og-betydning-af-livsstilsfaktorer"
        }
      },
      {
        id: "christensen_2015",
        authors: "Christensen P, Niels Qvist, Dennis Raahave, Jonas Worsøe, Jørgen Peter Ærthøj, Mette Borre, Klaus Krogh",
        title: "Surgical dept. P Aarhus University Hospital et al. \"Treatment of chronic constipation in adults\". Guideline from 2015",
        link: {
          text: "Download PDF",
          url: "https://dsak.dk/wp-content/uploads/2017/07/Obstipation-hos-voksne.pdf"
        }
      },
      {
        id: "ebbesen_2013",
        authors: "Ebbesen MH, Hunskaar S, Rortveit G and Hannestad YS Yngvild Skaatun",
        title: "Prevalence, incidence and remission of urinary incontinence in women: longitudinal data from the Norwegian HUNT study (EPINCONT) BMC Urology/2013",
        link: {
          text: "Read Study",
          url: "https://bmcurol.biomedcentral.com/articles/10.1186/1471-2490-13-27"
        }
      },
      {
        id: "fadnes_2010",
        authors: "Fadnes B, Leira K and Brodal P (2010)",
        title: "Learning Key (Book). University Press.",
        link: null
      },
      {
        id: "hannestad_2000",
        authors: "Hannestad YS, Rortveit G, Sandvik H, Hunskaar S",
        title: "A community-based epidemiological survey of female urinary incontinence: the Norwegian EPINCONT study. Epidemiology of Incontinence in the County of Nord-Trondelag. Journal of Clinical Epidemiology/2000",
        link: {
          text: "View Article",
          url: "https://www.sciencedirect.com/science/article/pii/S0895435600002328?via%3Dihub"
        }
      },
      {
        id: "hellstrom_2006",
        authors: "Hellström AL, Lindehall (2006)",
        title: "Urotherapy (Book). Lund, Studentlitteratur.",
        link: null
      },
      {
        id: "hunskaar_2003",
        authors: "Hunskaar S, Burgio K, Diokno A, Herzog AR, Hjalmås K and Lapitan MC",
        title: "Epidemiology and Natural History of Urinary Incontinence in Women. Urology/2003 Oct",
        link: {
          text: "View Article",
          url: "https://www.sciencedirect.com/science/article/pii/S0090429503007556?via%3Dihub"
        }
      },
      {
        id: "knowles_2016",
        authors: "Knowles SRS and Skues J",
        title: "Development and validation of the Shy Bladder and Bowel Scale (SBBS).",
        link: {
          text: "Read Research",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4960499/"
        }
      },
      {
        id: "lyons_2019",
        authors: "Lyons A",
        title: "Paruresis and parcopresis: How GPs can help. NewsGP/2019",
        link: {
          text: "Read Article",
          url: "https://www1.racgp.org.au/newsgp/clinical/paruresis-and-parcopresis-how-gps-can-help"
        }
      },
      {
        id: "milsom_2017",
        authors: "Milsom I, Altman D, Cartwright R, Lapitan MC, Nelson R, Sjöström s, Tikkinen K",
        title: "Incontinence; Epidemiology of urinary incontinence (UI) and other lower urinary tract symptoms (LUTS), pelvic organ prolapse (POP) and anal (AI) incontinence. Edited by Abrams P, Cardoxo L, Wagg A, Wein A. 6th International Consultation on Incontinence. 2017;4-92. Incontinence 6th Edition 2017",
        link: {
          text: "Download PDF",
          url: "https://www.ics.org/publications/ici_6/Incontinence_6th_Edition_2017_eBook_v2.pdf"
        }
      }
    ]
  }
} as const

export const References = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const introduction = INTRODUCTION_DATA[language]

  const { pageTitle, intro, lastUpdated, referencesTitle, references } = REFERENCES_DATA[language]

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="References" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{pageTitle}</h2>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{intro}</p>

            <p className={styles.enhancedParagraph}>
              <strong>{lastUpdated}</strong>
            </p>
          </div>
        </div>

        <SectionAccordion 
          title={referencesTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <ul className={styles.resourceList}>
            {references.map((reference) => (
              <li key={reference.id} className={styles.resourceListItem}>
                {reference.authors}. {reference.title}
                {reference.link && (
                  <>
                    <br />
                    <a
                      href={reference.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resourceLink}
                    >
                      {reference.link.text}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}
