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
      description: string
    }
  | {
      id: string
      type: "resources-table"
      title: string
      tableNote: string
      categories: ReadonlyArray<{
        title: string
        resources: ReadonlyArray<{
          name: string
          desc: string
          links: ReadonlyArray<{
            text: string
            url: string
          }>
          type: string
        }>
      }>
    }

const RESOURCES_DATA = {
  no: [
    {
      id: "intro",
      type: "intro",
      description: "Her finner du lenker til relevante nettsider som kan gi deg mer informasjon om urinlekkasje og hjelpe deg å komme i kontakt med andre som har de samme problemene."
    },
    {
      id: "resources-table",
      type: "resources-table",
      title: "Ressursoversikt",
      tableNote: "Snu mobilen på siden for å se hele tabellen.",
      categories: [
        {
          title: "Kompetansetjenester",
          resources: [
              { 
                name: "Nasjonalt senter for bekkenbunnshelse (NBH)", 
                desc: "Ansvarlig for disse nettsidene",
                links: [
                  { text: "Hjemmeside", url: "https://www.unn.no/fag-og-forskning/nasjonal-kompetansetjeneste-for-inkontinens-og-bekkenbunnsykdom-nkib" },
                  { text: "Facebook", url: "https://www.facebook.com/nkib.unn/" }
                ],
                type: "Kompetansetjeneste"
              }
          ]
        },
        {
          title: "Informasjonskilder",
          resources: [
            {
              name: "Helsenorge.no",
              desc: "Informasjon om ulike sykdomstilstander",
              links: [
                { text: "Om urinlekkasje", url: "https://helsenorge.no/sykdom/nyrer-og-urinveier/stressinkontinens" },
                { text: "Forstørret prostata", url: "https://helsenorge.no/sykdom/underliv/forstorret-prostata#Hva-er-symptomene-p%C3%A5-en-forst%C3%B8rret-prostata?" }
              ],
              type: "Informasjonsnettside"
            },
            {
              name: "Norsk MS-veileder",
              desc: "Nasjonal kompetansetjeneste for multippel sklerose (MS) har utarbeidet en norsk veileder om MS. Denne veilederen har en egen del som omhandler blær- og tarmforstyrrelser",
              links: [
                { text: "Hjemmeside", url: "https://helse-bergen.no/norsk-ms-veileder" }
              ],
              type: "Fagveileder"
            },
            {
              name: "Tät.nu",
              desc: "Svensk nettside med informasjon om urininkontinens. De har utviklet ulike apper til hjelp for konservativ behandlling av ulike inkontinenstyper, deriblant veiledning i bekkenbunnstrening",
              links: [
                { text: "Hjemmeside", url: "https://xn--tt-via.nu/" }
              ],
              type: "Informasjonsnettside"
            },
            {
              name: "Nikola.nu",
              desc: "Svensk nettside utviklet av et faglig nettverk. Siden er laget for pasienter og helsepersonell som møter pasienter med blære-og tarmdysfunksjoner",
              links: [
                { text: "Hjemmeside", url: "https://nikola.nu/" },
                { text: "Kateterfakta.nu", url: "https://kateterfakta.nu/" }
              ],
              type: "Fagnettverk"
            }
          ]
        },
        {
          title: "Opplæringsressurser",
          resources: [
            {
              name: "Instruksjonsfilm om bekkenbunnstrening",
              desc: "Utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst. (Dersom du opplever problemer med å komme inn på siden via Explorer, kan det hjelpe å bytte til Chrome nettleser)",
              links: [
                { text: "Instruksjonsfilm", url: "https://www.ahus.no/behandlinger/kurs-og-opplering-for-pasienter-og-parorende/bekkenbunnstrening-e-leringskurs" }
              ],
              type: "E-læringskurs"
            },
            {
              name: "Filminstruksjoner i opptrening av bekkenbunn for menn",
              desc: "E-læringskurs i 4 deler utviklet av St. Olavs Hospital, Helse Midt-Norge RHF",
              links: [
                { text: "Instruksjonsfilmer", url: "http://stolav.no/behandlinger/prostatakreft#opptrening-av-bekkenbunn-etter-prostataoperasjon" }
              ],
              type: "E-læringskurs"
            },
            {
              name: "E-læringskurs: Unngå overstrekk – tøm urinblæren i tide",
              desc: "E-læringskurs utarbeidet ved avdeling for urologi i samarbeid med avdeling for kompetanseutvikling, ved Ahus",
              links: [
                { text: "Kursside", url: "https://oslo-universitetssykehus.no/avdelinger/klinikk-for-kirurgi-inflammasjonsmedisin-og-transplantasjon/avdeling-for-urologi/unnga-overstrekk-tom-urinbleren-i-tide" }
              ],
              type: "E-læringskurs"
            },
            {
              name: "Wellspect education",
              desc: "har mange ulike opplæringsvideoer og opplæringsmateriell",
              links: [
                { text: "Wellspect education", url: "https://www.wellspect.no/education/Artikler/?filters=12" }
              ],
              type: "Opplæringsmateriell"
            }
          ]
        },
        {
          title: "Behandleroversikt",
          resources: [
            {
              name: "Norsk Fysioterapeutforbunds faggruppe for kvinnehelse",
              desc: "Oversikt over behandlere",
              links: [
                { text: "Behandler oversikt", url: "https://fysio.no/kvinnehelse" }
              ],
              type: "Behandlerkatalog"
            }
          ]
        }
      ]
    }
  ],
  en: [
    {
      id: "intro",
      type: "intro",
      description: "Here you will find links to relevant websites that can provide you with more information about urinary incontinence and help you get in touch with others who have the same problems."
    },
    {
      id: "resources-table",
      type: "resources-table",
      title: "Resource Overview",
      tableNote: "Turn your phone sideways to see the full table.",
      categories: [
        {
          title: "Competence Services",
          resources: [
            { 
              name: "National Center for Pelvic Floor Health (NBH)", 
              desc: "Responsible for these websites",
              links: [
                { text: "Homepage", url: "https://www.unn.no/fag-og-forskning/nasjonal-kompetansetjeneste-for-inkontinens-og-bekkenbunnsykdom-nkib" },
                { text: "Facebook", url: "https://www.facebook.com/nkib.unn/" }
              ],
              type: "Competence Service"
            }
          ]
        },
        {
          title: "Information Sources",
          resources: [
            {
              name: "Helsenorge.no",
              desc: "Information about various disease conditions",
              links: [
                { text: "About urinary incontinence", url: "https://helsenorge.no/sykdom/nyrer-og-urinveier/stressinkontinens" },
                { text: "Enlarged prostate", url: "https://helsenorge.no/sykdom/underliv/forstorret-prostata#Hva-er-symptomene-p%C3%A5-en-forst%C3%B8rret-prostata?" }
              ],
              type: "Information Website"
            },
            {
              name: "Norwegian MS Guide",
              desc: "National competence service for multiple sclerosis (MS) has developed a Norwegian guide about MS. This guide has a separate section that deals with bladder and bowel disorders",
              links: [
                { text: "Homepage", url: "https://helse-bergen.no/norsk-ms-veileder" }
              ],
              type: "Professional Guide"
            },
            {
              name: "Tät.nu",
              desc: "Swedish website with information about urinary incontinence. They have developed various apps to help with conservative treatment of different types of incontinence, including guidance in pelvic floor training",
              links: [
                { text: "Homepage", url: "https://xn--tt-via.nu/" }
              ],
              type: "Information Website"
            },
            {
              name: "Nikola.nu",
              desc: "Swedish website developed by a professional network. The site is made for patients and healthcare personnel who meet patients with bladder and bowel dysfunctions",
              links: [
                { text: "Homepage", url: "https://nikola.nu/" },
                { text: "Catheter Facts", url: "https://kateterfakta.nu/" }
              ],
              type: "Professional Network"
            }
          ]
        },
        {
          title: "Educational Resources",
          resources: [
            {
              name: "Instructional video on pelvic floor training",
              desc: "Developed by the Pelvic Center at Akershus University Hospital, Health South-East. (If you experience problems accessing the site via Explorer, it may help to switch to Chrome browser)",
              links: [
                { text: "Instructional video", url: "https://www.ahus.no/behandlinger/kurs-og-opplering-for-pasienter-og-parorende/bekkenbunnstrening-e-leringskurs" }
              ],
              type: "E-learning Course"
            },
            {
              name: "Video instructions in pelvic floor training for men",
              desc: "E-learning course in 4 parts developed by St. Olav's Hospital, Health Mid-Norway RHF",
              links: [
                { text: "Instructional videos", url: "http://stolav.no/behandlinger/prostatakreft#opptrening-av-bekkenbunn-etter-prostataoperasjon" }
              ],
              type: "E-learning Course"
            },
            {
              name: "E-learning course: Avoid overstretching - empty the bladder in time",
              desc: "E-learning course developed by the urology department in collaboration with the competence development department, at Ahus",
              links: [
                { text: "Course page", url: "https://oslo-universitetssykehus.no/avdelinger/klinikk-for-kirurgi-inflammasjonsmedisin-og-transplantasjon/avdeling-for-urologi/unnga-overstrekk-tom-urinbleren-i-tide" }
              ],
              type: "E-learning Course"
            },
            {
              name: "Wellspect education",
              desc: "has many different training videos and training materials",
              links: [
                { text: "Wellspect education", url: "https://www.wellspect.no/education/Artikler/?filters=12" }
              ],
              type: "Training Material"
            }
          ]
        },
        {
          title: "Treatment Provider Overview",
          resources: [
            {
              name: "Norwegian Physiotherapist Association's professional group for women's health",
              desc: "Overview of treatment providers",
              links: [
                { text: "Treatment provider overview", url: "https://fysio.no/kvinnehelse" }
              ],
              type: "Treatment Provider Catalog"
            }
          ]
        }
      ]
    }
  ]
} as const

export const Resources = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const data = RESOURCES_DATA[language];

  const renderContent = (item: ContentItem) => {
    if (item.type === "intro") {
      return (
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {item.description}
            </p>
          </div>
        </div>
      )
    }

    if (item.type === "resources-table") {
      return (
        <SectionAccordion 
          title={item.title} 
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph} style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
            {item.tableNote}
          </p>
          
          <div className={styles.resourceTable}>
            <div className={styles.resourceHeader}>
              <div className={styles.resourceColumn}>{language === 'no' ? 'RESSURS' : 'RESOURCE'}</div>
              <div className={styles.resourceColumn}>{language === 'no' ? 'LENKE' : 'LINK'}</div>
            </div>
            
            {item.categories.map((category, categoryIndex) => 
              category.resources.map((resource, resourceIndex) => (
                <div key={`${categoryIndex}-${resourceIndex}`} className={styles.resourceRow}>
                  <div className={styles.resourceDescription}>
                    <h4 className={styles.resourceName}>
                      {resource.name}
                    </h4>
                    <p className={styles.resourceDesc}>
                      {resource.desc}
                    </p>
                    <span className={styles.resourceType}>
                      {resource.type}
                    </span>
                  </div>
                  <div className={styles.resourceLinks}>
                    {resource.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.resourceLink}
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
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
            <img src="/resource.png" alt="Resources" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>{language === 'no' ? 'Ressurser' : 'Resources'}</h2>
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
  );
};