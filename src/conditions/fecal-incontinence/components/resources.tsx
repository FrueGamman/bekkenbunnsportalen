"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

// Bilingual data structure
const RESOURCES_DATA = {
  no: {
    pageTitle: "Ressurser",
    introText: "Her finner du lenker til relevante nettsider som kan gi deg mer informasjon om avføringslekkasje og hjelpe deg å komme i kontakt med andre som har de samme problemene",
    visitLink: "Besøk",
    resourceCategories: [
      {
        title: "Kompetansetjenester",
        resources: [
          { 
            name: "Nasjonalt senter for bekkenbunnshelse (NBH)", 
            url: "https://www.unn.no/fag-og-forskning/nasjonal-kompetansetjeneste-for-inkontinens-og-bekkenbunnsykdom-nkib", 
            type: "Hjemmeside" 
          },
          { 
            name: "NBH Facebook", 
            url: "https://www.facebook.com/nkib.unn/", 
            type: "Facebook" 
          }
        ]
      },
      {
        title: "Organisasjoner",
        resources: [
          { 
            name: "Norilco - Norsk forening for stomi, reservoar og mage-tarmkreft", 
            url: "https://www.norilco.no/", 
            type: "Hjemmeside" 
          }
        ]
      },
      {
        title: "Behandlere",
        resources: [
          { 
            name: "Norsk Fysioterapeutforbunds faggruppe for kvinnehelse - Oversikt over behandlere", 
            url: "https://fysio.no/kvinnehelse", 
            type: "Behandler oversikt" 
          }
        ]
      },
      {
        title: "Instruksjonsfilmer",
        resources: [
          { 
            name: "Instruksjonsfilm om Avføringslekkasje - Filmen er for pasienter og pårørende. Utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst. (Dersom du opplever problemer med å komme inn på siden via Explorer, kan det hjelpe å bytte til Chrome nettleser)", 
            url: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/955b05f5-59e8-45cc-8f31-b8903b59aaef/index.html", 
            type: "Instruksjonsfilm" 
          },
          { 
            name: "Instruksjonsfilm om bekkenbunnstrening - Utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst. (Dersom du opplever problemer med å komme inn på siden via Explorer, kan det hjelpe å bytte til Chrome nettleser)", 
            url: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/fa7d776e-65d9-4140-9c10-569f4f9bf317/index.html", 
            type: "Instruksjonsfilm" 
          },
          { 
            name: "Filminstruksjoner i opptrening av bekkenbunn for menn - E-læringskurs i 4 deler utviklet av St. Olavs Hospital, Helse Midt-Norge RHF", 
            url: "https://stolav.no/behandlinger/prostatakreft#opptrening-av-bekkenbunn-etter-prostataoperasjon", 
            type: "Instruksjonsfilmer" 
          }
        ]
      },
      {
        title: "Faglige retningslinjer",
        resources: [
          { 
            name: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser (NBH)", 
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf", 
            type: "Gå til veileder" 
          }
        ]
      },
      {
        title: "Pasientinformasjon",
        resources: [
          { 
            name: "Pasientinformasjon fra UNN - Tiltak som kan hjelpe ved lekkasje, forstoppelse og tømmingsproblemer for avføring", 
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/Pasientinformasjon-KIPS-Tiltak-som-kan-hjelpe-ved-lekkasje-forstoppelse-og-tommingsproblemer-for-avforing.pdf", 
            type: "Pasientinformasjon" 
          }
        ]
      },
      {
        title: "Informasjonsbrosjyrer",
        resources: [
          { 
            name: "Informasjonsbrosjyre om sakral nervemodulering - Interstim-behandling for problemer med tarmkontroll, en pasientveiledning. Medtronic", 
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/UC201808131NO_Interstim_Patient_Brochure_Bowel_Rebrand_A5_Pres.pdf", 
            type: "Brosjyre" 
          }
        ]
      },
      {
        title: "MS-veileder",
        resources: [
          { 
            name: "Norsk MS-veileder - Nasjonal kompetansetjeneste for multippel sklerose (MS) har utarbeidet en norsk veileder om MS. Denne veilederen har en egen del som omhandler blær- og tarmforstyrrelser", 
            url: "https://helse-bergen.no/norsk-ms-veileder", 
            type: "Hjemmeside" 
          },
          { 
            name: "Tarmforstyrrelser - Del av MS-veilederen", 
            url: "https://www.msveileder.no/artikkel/76/tarmforstyrrelser", 
            type: "Tarmforstyrrelser" 
          }
        ]
      },
      {
        title: "Informasjonsfilmer",
        resources: [
          { 
            name: "Norsk Helseinformatikk - Informasjonsfilm om hva som skjer ved avføringsinkontinens, årsaker og symptomer", 
            url: "https://nhi.no/animasjoner/magetarm/avforingslekkasje/", 
            type: "Informasjonsfilm" 
          }
        ]
      },
      {
        title: "Internasjonale ressurser",
        resources: [
          { 
            name: "Nikola.nu - Svensk nettside utviklet av et faglig nettverk. Siden er laget for pasienter og helsepersonell som møter pasienter med blære-og tarmdysfunksjoner", 
            url: "https://nikola.nu/", 
            type: "Hjemmeside" 
          }
        ]
      },
      {
        title: "Forskning og registre",
        resources: [
          { 
            name: "Folkehelseinstituttet - Informasjon om Medisinsk fødselsregister som gir oversikt over alle fødsler i Norge, og tilrettelegger data for forskning og helseanalyser", 
            url: "https://www.fhi.no/hn/helseregistre-og-registre/mfr/", 
            type: "Medisinsk fødselsregister" 
          },
          { 
            name: "Norsk register for analinkontinens (NRA) - Nasjonalt medisinsk kvalitetsregister for analinkontinens", 
            url: "https://www.unn.no/fag-og-forskning/medisinske-kvalitetsregistre/nra-norsk-register-for-analinkontinens/", 
            type: "Kvalitetsregister" 
          }
        ]
      },
      {
        title: "Tarmfunksjon",
        resources: [
          { 
            name: "Hvordan tarmen fungerer - Instruksjonsfilm om tarmens funksjon, utarbeidet av Coloplast", 
            url: "https://www.coloplast.no/blare-og-tarm-/forbruker/a-leve-med-tarmproblemer/#section=Hvordan-tarmen-fungerer_296028", 
            type: "Informasjonsfilm" 
          }
        ]
      }
    ]
  },
  en: {
    pageTitle: "Resources",
    introText: "Here you will find links to relevant websites that can give you more information about fecal incontinence and help you get in touch with others who have the same problems",
    visitLink: "Visit",
    resourceCategories: [
      {
        title: "Competence Services",
        resources: [
          { 
            name: "National Center for Pelvic Floor Health (NBH)", 
            url: "https://www.unn.no/fag-og-forskning/nasjonal-kompetansetjeneste-for-inkontinens-og-bekkenbunnsykdom-nkib", 
            type: "Website" 
          },
          { 
            name: "NBH Facebook", 
            url: "https://www.facebook.com/nkib.unn/", 
            type: "Facebook" 
          }
        ]
      },
      {
        title: "Organizations",
        resources: [
          { 
            name: "Norilco - Norwegian Association for Stoma, Reservoir and Gastrointestinal Cancer", 
            url: "https://www.norilco.no/", 
            type: "Website" 
          }
        ]
      },
      {
        title: "Treatment Providers",
        resources: [
          { 
            name: "Norwegian Physiotherapy Association's Women's Health Group - Provider Directory", 
            url: "https://fysio.no/kvinnehelse", 
            type: "Provider Directory" 
          }
        ]
      },
      {
        title: "Instructional Videos",
        resources: [
          { 
            name: "Instructional Film about Fecal Incontinence - The film is for patients and relatives. Developed by the Pelvic Center at Akershus University Hospital, Health South-East. (If you experience problems accessing the page via Explorer, it may help to switch to Chrome browser)", 
            url: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/955b05f5-59e8-45cc-8f31-b8903b59aaef/index.html", 
            type: "Instructional Film" 
          },
          { 
            name: "Instructional Film about Pelvic Floor Training - Developed by the Pelvic Center at Akershus University Hospital, Health South-East. (If you experience problems accessing the page via Explorer, it may help to switch to Chrome browser)", 
            url: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/fa7d776e-65d9-4140-9c10-569f4f9bf317/index.html", 
            type: "Instructional Film" 
          },
          { 
            name: "Video Instructions for Pelvic Floor Training for Men - E-learning course in 4 parts developed by St. Olavs Hospital, Health Mid-Norway RHF", 
            url: "https://stolav.no/behandlinger/prostatakreft#opptrening-av-bekkenbunn-etter-prostataoperasjon", 
            type: "Instructional Videos" 
          }
        ]
      },
      {
        title: "Clinical Guidelines",
        resources: [
          { 
            name: "Clinical Guidelines for Assessment and Conservative Treatment of Anorectal Functional Disorders (NBH)", 
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf", 
            type: "Go to Guidelines" 
          }
        ]
      },
      {
        title: "Patient Information",
        resources: [
          { 
            name: "Patient Information from UNN - Measures that can help with leakage, constipation and emptying problems for bowel movements", 
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/Pasientinformasjon-KIPS-Tiltak-som-kan-hjelpe-ved-lekkasje-forstoppelse-og-tommingsproblemer-for-avforing.pdf", 
            type: "Patient Information" 
          }
        ]
      },
      {
        title: "Information Brochures",
        resources: [
          { 
            name: "Information Brochure about Sacral Nerve Modulation - Interstim treatment for bowel control problems, a patient guide. Medtronic", 
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2023/02/UC201808131NO_Interstim_Patient_Brochure_Bowel_Rebrand_A5_Pres.pdf", 
            type: "Brochure" 
          }
        ]
      },
      {
        title: "MS Guide",
        resources: [
          { 
            name: "Norwegian MS Guide - National competence service for multiple sclerosis has developed a Norwegian guide about MS. This guide has a special section on bladder and bowel disorders", 
            url: "https://helse-bergen.no/norsk-ms-veileder", 
            type: "Website" 
          },
          { 
            name: "Bowel Disorders - Part of the MS Guide", 
            url: "https://www.msveileder.no/artikkel/76/tarmforstyrrelser", 
            type: "Bowel Disorders" 
          }
        ]
      },
      {
        title: "Information Videos",
        resources: [
          { 
            name: "Norwegian Health Information - Information video about what happens with fecal incontinence, causes and symptoms", 
            url: "https://nhi.no/animasjoner/magetarm/avforingslekkasje/", 
            type: "Information Video" 
          }
        ]
      },
      {
        title: "International Resources",
        resources: [
          { 
            name: "Nikola.nu - Swedish website developed by a professional network. The site is made for patients and healthcare personnel who meet patients with bladder and bowel dysfunction", 
            url: "https://nikola.nu/", 
            type: "Website" 
          }
        ]
      },
      {
        title: "Research and Registries",
        resources: [
          { 
            name: "Norwegian Institute of Public Health - Information about the Medical Birth Registry which provides an overview of all births in Norway, and facilitates data for research and health analyses", 
            url: "https://www.fhi.no/hn/helseregistre-og-registre/mfr/", 
            type: "Medical Birth Registry" 
          },
          { 
            name: "Norwegian Register for Anal Incontinence (NRA) - National medical quality register for anal incontinence", 
            url: "https://www.unn.no/fag-og-forskning/medisinske-kvalitetsregistre/nra-norsk-register-for-analinkontinens/", 
            type: "Quality Register" 
          }
        ]
      },
      {
        title: "Bowel Function",
        resources: [
          { 
            name: "How the Bowel Works - Instructional video about bowel function, developed by Coloplast", 
            url: "https://www.coloplast.no/blare-og-tarm-/forbruker/a-leve-med-tarmproblemer/#section=Hvordan-tarmen-fungerer_296028", 
            type: "Information Video" 
          }
        ]
      }
    ]
  }
} as const

export const Resources = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = RESOURCES_DATA[language]

  return (
    <>

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/resource.png"
            alt="Resources"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        <p className={styles.enhancedParagraph}>{data.introText}</p>
        
        {data.resourceCategories.map((category, categoryIndex) => (
          <SectionAccordion 
            key={categoryIndex}
            title={category.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.resourcesList}>
              {category.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className={styles.resourceItem}>
                  <div className={styles.resourceInfo}>
                    <h4 className={styles.resourceName}>{resource.name}</h4>
                    <span className={styles.resourceType}>{resource.type}</span>
                  </div>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.resourceLink}
                  >
                    {data.visitLink}
                  </a>
                </div>
              ))}
            </div>
          </SectionAccordion>
        ))}

      </div>
    </div>
    </>
  )
}