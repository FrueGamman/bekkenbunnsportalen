"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"

const INTRODUCTION_DATA = {
  no: {
    description: "På disse sidene finner du informasjon om tømmingsproblemer for urin, urinretensjon. Her er informasjon om normal funksjon av vannlatingen, symptomer på tømmingsproblemer, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet.",
    keyPoints: [
      "Finn kompetansetjenester og spesialister",
      "Koble deg til pasientorganisasjoner og støttegrupper",
      "Utforsk informasjonskilder og nyttige nettsider",
      "Få tilgang til praktiske ressurser og verktøy"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Ressurser for urinretensjon",
      caption: "Oversikt over hjelpe- og støtteressurser"
    }
  },
  en: {
    description: "On these pages you will find information about urinary emptying problems, urinary retention. Here is information about normal urination function, symptoms of emptying problems, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected.",
    keyPoints: [
      "Find competence services and specialists",
      "Connect with patient organizations and support groups",
      "Explore information sources and useful websites",
      "Access practical resources and tools"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Resources for urinary retention",
      caption: "Overview of help and support resources"
    }
  }
} as const;

const RESOURCES_DATA = {
  no: {
    pageTitle: "Ressurser",
    description: "Her finner du lenker til relevante nettsider som kan gi deg mer informasjon om tømmingsproblemer for urin og hjelpe deg å komme i kontakt med andre som har de samme problemene.",
    categories: [
      {
        id: "competence_services",
        title: "Kompetansetjenester",
        resources: [
          { 
            name: "Nasjonalt senter for bekkenbunnshelse (NBH)", 
            desc: "Ansvarlig for disse nettsidene",
            links: [
              { text: "Hjemmeside", url: "https://www.unn.no/fag-og-forskning/nasjonal-kompetansetjeneste-for-inkontinens-og-bekkenbunnsykdom-nkib" },
              { text: "Facebook", url: "https://www.facebook.com/nkib.unn/" }
            ],
            type: "Nettside"
          }
        ]
      },
      {
        id: "information_sources",
        title: "Informasjonskilder",
        resources: [
          {
            name: "Helsenorge.no",
            desc: "Informasjon om ulike sykdomstilstander",
            links: [
              { text: "Om urinlekkasje", url: "https://helsenorge.no/sykdom/nyrer-og-urinveier/stressinkontinens" },
              { text: "Forstørret prostata", url: "https://helsenorge.no/sykdom/underliv/forstorret-prostata#Hva-er-symptomene-p%C3%A5-en-forst%C3%B8rret-prostata?" }
            ],
            type: "Nettside"
          },
          {
            name: "Norsk MS-veileder",
            desc: "Nasjonal kompetansetjeneste for multippel sklerose (MS) har utarbeidet en norsk veileder om MS. Denne veilederen har en egen del som omhandler blær- og tarmforstyrrelser",
            links: [
              { text: "Hjemmeside", url: "https://helse-bergen.no/norsk-ms-veileder" },
              { text: "Vannlatingsproblemer", url: "https://www.msveileder.no/artikkel/88/vannlatingsproblemer" }
            ],
            type: "Veileder"
          },
          {
            name: "Tät.nu",
            desc: "Svensk nettside med informasjon om urininkontinens. De har utviklet ulike apper til hjelp for konservativ behandlling av ulike inkontinenstyper, deriblant veiledning i bekkenbunnstrening",
            links: [
              { text: "Hjemmeside", url: "https://xn--tt-via.nu/" }
            ],
            type: "Nettside"
          },
          {
            name: "Nikola.nu",
            desc: "Svensk nettside utviklet av et faglig nettverk. Siden er laget for pasienter og helsepersonell som møter pasienter med blære-og tarmdysfunksjoner",
            links: [
              { text: "Hjemmeside", url: "https://nikola.nu/" },
              { text: "Kateterfakta.nu", url: "https://nikola.nu/" }
            ],
            type: "Nettside"
          }
        ]
      },
      {
        id: "training_resources",
        title: "Opplæringsressurser",
        resources: [
          {
            name: "Instruksjonsfilm om bekkenbunnstrening",
            desc: "Utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst. (Dersom du opplever problemer med å komme inn på siden via Explorer, kan det hjelpe å bytte til Chrome nettleser)",
            links: [
              { text: "Instruksjonsfilm", url: "https://www.ahus.no/behandlinger/kurs-og-opplering-for-pasienter-og-parorende/bekkenbunnstrening-e-leringskurs" }
            ],
            type: "Video"
          },
          {
            name: "Filminstruksjoner i opptrening av bekkenbunn for menn",
            desc: "E-læringskurs i 4 deler utviklet av St. Olavs Hospital, Helse Midt-Norge RHF",
            links: [
              { text: "Instruksjonsfilmer", url: "http://stolav.no/behandlinger/prostatakreft#opptrening-av-bekkenbunn-etter-prostataoperasjon" }
            ],
            type: "Video"
          },
          {
            name: "E-læringskurs: Unngå overstrekk – tøm urinblæren i tide",
            desc: "E-læringskurs utarbeidet ved avdeling for urologi i samarbeid med avdeling for kompetanseutvikling, ved Ahus",
            links: [
              { text: "Kursside", url: "https://oslo-universitetssykehus.no/avdelinger/klinikk-for-kirurgi-inflammasjonsmedisin-og-transplantasjon/avdeling-for-urologi/unnga-overstrekk-tom-urinbleren-i-tide" }
            ],
            type: "E-læring"
          },
          {
            name: "Wellspect education",
            desc: "har mange ulike opplæringsvideoer og opplæringsmateriell",
            links: [
              { text: "Wellspect education", url: "https://www.wellspect.no/education/Artikler/?filters=12" }
            ],
            type: "Opplæring"
          }
        ]
      },
      {
        id: "provider_overview",
        title: "Behandleroversikt",
        resources: [
          {
            name: "Norsk Fysioterapeutforbunds faggruppe for kvinnehelse",
            desc: "Oversikt over behandlere",
            links: [
              { text: "Behandler oversikt", url: "https://fysio.no/kvinnehelse" }
            ],
            type: "Katalog"
          }
        ]
      }
    ]
  },
  en: {
    pageTitle: "Resources",
    description: "Here you will find links to relevant websites that can give you more information about urinary emptying problems and help you get in touch with others who have the same problems.",
    categories: [
      {
        id: "competence_services",
        title: "Competence Services",
        resources: [
          { 
            name: "National Center for Pelvic Floor Health (NBH)", 
            desc: "Responsible for these websites",
            links: [
              { text: "Homepage", url: "https://www.unn.no/fag-og-forskning/nasjonal-kompetansetjeneste-for-inkontinens-og-bekkenbunnsykdom-nkib" },
              { text: "Facebook", url: "https://www.facebook.com/nkib.unn/" }
            ],
            type: "Website"
          }
        ]
      },
      {
        id: "information_sources",
        title: "Information Sources",
        resources: [
          {
            name: "Helsenorge.no",
            desc: "Information about various disease conditions",
            links: [
              { text: "About urinary leakage", url: "https://helsenorge.no/sykdom/nyrer-og-urinveier/stressinkontinens" },
              { text: "Enlarged prostate", url: "https://helsenorge.no/sykdom/underliv/forstorret-prostata#Hva-er-symptomene-p%C3%A5-en-forst%C3%B8rret-prostata?" }
            ],
            type: "Website"
          },
          {
            name: "Norwegian MS Guide",
            desc: "National competence service for multiple sclerosis (MS) has developed a Norwegian guide about MS. This guide has a special section that deals with bladder and bowel disorders",
            links: [
              { text: "Homepage", url: "https://helse-bergen.no/norsk-ms-veileder" },
              { text: "Urination problems", url: "https://www.msveileder.no/artikkel/88/vannlatingsproblemer" }
            ],
            type: "Guide"
          },
          {
            name: "Tät.nu",
            desc: "Swedish website with information about urinary incontinence. They have developed various apps to help with conservative treatment of different incontinence types, including guidance in pelvic floor training",
            links: [
              { text: "Homepage", url: "https://xn--tt-via.nu/" }
            ],
            type: "Website"
          },
          {
            name: "Nikola.nu",
            desc: "Swedish website developed by a professional network. The site is made for patients and healthcare personnel who meet patients with bladder and bowel dysfunctions",
            links: [
              { text: "Homepage", url: "https://nikola.nu/" },
              { text: "Catheter facts", url: "https://nikola.nu/" }
            ],
            type: "Website"
          }
        ]
      },
      {
        id: "training_resources",
        title: "Training Resources",
        resources: [
          {
            name: "Instructional video on pelvic floor training",
            desc: "Developed by the Pelvic Center at Akershus University Hospital, Health South-East. (If you experience problems accessing the site via Explorer, it may help to switch to Chrome browser)",
            links: [
              { text: "Instructional video", url: "https://www.ahus.no/behandlinger/kurs-og-opplering-for-pasienter-og-parorende/bekkenbunnstrening-e-leringskurs" }
            ],
            type: "Video"
          },
          {
            name: "Video instructions for pelvic floor training for men",
            desc: "E-learning course in 4 parts developed by St. Olav's Hospital, Health Mid-Norway RHF",
            links: [
              { text: "Instructional videos", url: "http://stolav.no/behandlinger/prostatakreft#opptrening-av-bekkenbunn-etter-prostataoperasjon" }
            ],
            type: "Video"
          },
          {
            name: "E-learning course: Avoid overstretching - empty the bladder in time",
            desc: "E-learning course developed by the urology department in collaboration with the competence development department, at Ahus",
            links: [
              { text: "Course page", url: "https://oslo-universitetssykehus.no/avdelinger/klinikk-for-kirurgi-inflammasjonsmedisin-og-transplantasjon/avdeling-for-urologi/unnga-overstrekk-tom-urinbleren-i-tide" }
            ],
            type: "E-learning"
          },
          {
            name: "Wellspect education",
            desc: "has many different training videos and training materials",
            links: [
              { text: "Wellspect education", url: "https://www.wellspect.no/education/Artikler/?filters=12" }
            ],
            type: "Training"
          }
        ]
      },
      {
        id: "provider_overview",
        title: "Provider Overview",
        resources: [
          {
            name: "Norwegian Physiotherapy Association's professional group for women's health",
            desc: "Overview of providers",
            links: [
              { text: "Provider overview", url: "https://fysio.no/kvinnehelse" }
            ],
            type: "Catalog"
          }
        ]
      }
    ]
  }
} as const

export const Resources = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const introduction = INTRODUCTION_DATA[language];

  const { pageTitle, description, categories } = RESOURCES_DATA[language];

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="Resources" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{pageTitle}</h2>
      </div>


      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {description}
            </p>
          </div>
        </div>

        {categories.map((category) => (
          <SectionAccordion 
            key={category.id}
            title={category.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.resourcesList}>
              {category.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className={styles.resourceItem}>
                  <div className={styles.resourceInfo}>
                    <h4 className={styles.resourceName}>{resource.name}</h4>
                    {resource.desc && (
                      <p className={styles.resourceDescription}>
                        {resource.desc}
                      </p>
                    )}
                    <span className={styles.resourceType}>{resource.type}</span>
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
              ))}
            </div>
          </SectionAccordion>
        ))}
      </div>
    </div>
    </>
  );
};

