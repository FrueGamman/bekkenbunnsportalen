"use client"
import { useState } from "react"
import { Card, CardContent } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { useLanguage } from "../../context/useLanguage"
import { Header } from "../../components/Header"
import { ConferenceSection } from "../../components/conference-section"
import Footer from "../../components/Footer"
// import { PelvicFloorCourseSection } from "../../components/PelvicFloorCourseSection"
import styles from "./Helsepersonell.module.css"

// Define types for the new content structure
interface ContentItem {
  text: string
  link?: string
}

interface ContentSection {
  heading?: string
  description?: string
  items?: ContentItem[]
}

interface ContentCardProps {
  titleKey: string // Key for translation
  category: string
  categoryLabel: string
  sections: ContentSection[]
}

// ARIA labels interface
interface AriaLabels {
  clickToToggle: string
  open: string
  close: string
  details: string
  searchLabel: string
  searchHelp: string
}

// New ContentCard component to handle structured content
const ContentCard = ({ titleKey, categoryLabel, sections, onClick, isSelected, ariaLabels }: ContentCardProps & { onClick: () => void, isSelected: boolean, ariaLabels: AriaLabels }) => {
  return (
    <Card 
      className={`${styles.contentCard} ${isSelected ? styles.contentCardSelected : ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-expanded={isSelected}
      aria-label={`${titleKey} - ${categoryLabel}. ${ariaLabels.clickToToggle} ${isSelected ? ariaLabels.close : ariaLabels.open} ${ariaLabels.details}`}
    >
      <CardContent className={styles.contentCardContent}>
        <div className={styles.contentCardHeader}>
          <span className={styles.contentCardBadge}>{categoryLabel}</span>
        </div>
        <h3 className={styles.contentCardTitle}>{titleKey}</h3>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.contentSection}>
            {section.heading && <h4 className={styles.contentSectionHeading}>{section.heading}</h4>}
            {section.description && <p className={styles.contentSectionDescription}>{section.description}</p>}
            {section.items && (
              <ul className={styles.contentSectionList}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.contentSectionListItem}>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.contentLink}>
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Structured bilingual data for Helsepersonell page
const HELSEPERSONELL_DATA = {
  no: {
    title: "For helsepersonell",
    subtitle: "Sidene er under oppdatering",
    description: "Faglige ressurser, retningslinjer og verktøy for helsepersonell som jobber med bekkenbunnshelse.",
    searchPlaceholder: "Søk etter faglige ressurser, retningslinjer eller emner...",
    backToHome: "Tilbake til forsiden",
    tabs: {
      alle: "Alle",
      forskning: "Forskning",
      behandling: "Behandling",
      livsstil: "Livsstil",
      teknologi: "Teknologi",
      pasienthistorier: "Pasienthistorier",
      fagfolk: "For fagfolk",
    },
    categories: {
      patientStory: "Pasienthistorie",
      technology: "Teknologi",
      lifestyle: "Livsstil",
      treatment: "Behandling",
      research: "Forskning",
      eLearning: "E-læring",
      scoringsverktoy: "Scoringsverktøy",
    },
    articles: {
      selectedArticles: "Utvalgte artikler",
      latestNews: "Siste nyheter",
      noResults: "Ingen artikler funnet for søket ditt.",
      loadMore: "Last inn flere artikler",
    },
    guidelines: {
      title: "Faglige retningslinjer og veiledere",
      description: "Nasjonale og internasjonale retningslinjer for helsepersonell",
      noResults: "Ingen retningslinjer funnet for søket ditt.",
      heading: "VEILEDER / KILDE / LENKE",
      categoryLabel: "Faglige retningslinjer og veiledere",
      tableHeaders: {
        veileder: "VEILEDER",
        kilde: "KILDE",
        lenke: "LENKE"
      }
    },
    aria: {
      clickToToggle: "Klikk for å",
      open: "åpne",
      close: "lukke",
      details: "detaljer",
      searchLabel: "Søk i faglige ressurser",
      searchHelp: "Søk etter faglige ressurser, retningslinjer eller emner"
    },
    elearningHero: {
      imageAlt: "Bekkenbunnsdysfunksjoner",
      title: "Utredning og behandling av bekkenbunnsdysfunksjoner",
      description: "Dette e-læringskurset er for helsepersonell og vil gi deg kunnskap om tverrfaglig og systematisk tilnærming til dysfunksjoner i bekkenbunnen med fokus på vannlatningsfunksjon, avføringsfunksjon, seksualfunksjon og smerter.",
      buttonText: "Gå til kurs"
    },
    scoringTools: {
      description: "Her finner du informasjon om ulike scoringsverktøy innen ulike dysfunksjoner til bruk ved utredning og oppfølging for å vurdere effekt av behandling. International Consultation on Incontinence har utarbeidet ulike International Consultation on Incontinence Modular Questionnaire (ICIQ) scoringsskjema. For å benytte disse verktøyene sendes mail til ICIQ gruppen, kontaktinformasjon finnes på hjemmesiden deres.",
      headings: {
        urinaryDysfunction: "Vannlatingsdysfunksjon/ urininkontinens",
        fecalDysfunction: "Fekal dysfunksjon/ fekal inkontinens",
        pain: "Smerter",
        promPrem: "PROM/PREM"
      },
      promPremDescription: "Bruk av pasientrapporterte data med PROM (Patient Reported Outcome Measures) og PREM (Patient Reported Experience Measures) er viktige verktøy for blant annet å måle effekt av tiltak, oppdage endringer i helse som er relevante for pasient og samfunn, samt øker pasientinvolveringen."
    },
    elearning: {
      title: "E-læringskurs",
      description: "Faglige kurs og instruksjonsvideoer for helsepersonell innen bekkenbunnshelse"
    },
    organizations: {
      title: "Organisasjoner og faglige nettverk for helsepersonell",
      description: "Nasjonale og internasjonale fagorganisasjoner innen bekkenbunnshelse"
    },
    guidelinesTable: [
      {
        veileder: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser",
        kilde: "NBH/Helsebiblioteket",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Consensus statement on bladder training and bowel training",
        kilde: "ICS.org",
        lenke: "Gå til publikasjon"
      },
      {
        veileder: "Henvisningsveiledning UNN",
        kilde: "UNN",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Guideline for the diagnosis and treatment of Faecal Incontinence – A UEG/ESCP/ESNM/ESPCG",
        kilde: "Pubmed",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Langvarige bekkensmerter (2024)",
        kilde: "Metodebok Gynekologi og obstetrikk",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Veileder i gynekologi – Perinealskade og anal sfinkterskade ved fødsel",
        kilde: "Metodebok Norsk gynekologisk forening",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Urininkontinens. Norsk gynekologisk forening.",
        kilde: "Metodebok Norsk gynekologisk forening",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Kroniske smertetilstander i vulva",
        kilde: "Metodebok Norsk gynekologisk forening",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Veileder for forebygging av kateterassosierte urinveisinfeksjoner",
        kilde: "Folkehelseinstituttet",
        lenke: "Gå til veileder"
      },
      {
        veileder: "Snakk om det! Strategi for seksuell helse (2017-2022)",
        kilde: "Helse-og omsorgsdepartementet",
        lenke: "Gå til strategiplan"
      },
      {
        veileder: "Oppslagsverk for helsepersonell som jobber med prevensjon, seksuelt overførbare infeksjoner og annen tematikk innenfor seksuell og reproduktiv helse.",
        kilde: "Sexogsamfunn.no",
        lenke: "eMetodebok for seksuell helse"
      }
    ],
    elearningCourses: {
      prolapse: {
        heading: "Fremfall av underlivsorganer (underlivsprolaps)",
        description: "E-læringkurs utarbeidet av Bekkensenteret ved Ahus.",
        linkText: "Til kurset"
      },
      avoidOverstretching: {
        heading: "Unngå overstrekk – tøm urinblæren i tide",
        description: "E-læringskurs utarbeidet ved avdeling for urologi i samarbeid med avdeling for kompetanseutvikling, ved Ahus. (Dersom du opplever problemer med å komme inn på siden via Explorer, kan det hjelpe å bytte til Chrome nettleser).",
        linkText: "Til kurset"
      },
      fecalIncontinenceVideo: {
        heading: "Instruksjonsfilm om Avføringslekkasje",
        description: "Utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst. (Dersom du opplever problemer med å komme inn på siden via Explorer, kan det hjelpe å bytte til Chrome nettleser).",
        linkText: "Til kurset"
      }
    },
    coursesDisplay: {
      course1: {
        provider: "NEKIB",
        title: "Utredning og behandling av bekkenbunnsdysfunksjoner",
        description: "Dette kurset vil gi deg kunnskap om tverrfaglig og systematisk tilnærming til dysfunksjoner i bekkenbunnen med fokus på vannlatningsfunksjon, avføringsfunksjon, seksualfunksjon og smerter.",
        type: "E-læringskurs",
        buttonText: "Til kurset",
        altText: "E-læring"
      },
      course2: {
        provider: "Bekkensenteret ved Ahus",
        title: "Fremfall av underlivsorganer (underlivsprolaps)",
        description: "E-læringkurs utarbeidet av Bekkensenteret ved Ahus. Kurset gir innsikt i diagnostikk og behandling av underlivsprolaps.",
        type: "E-læringskurs",
        buttonText: "Til kurset",
        altText: "E-læring"
      },
      course3: {
        provider: "Ahus",
        title: "Unngå overstrekk – tøm urinblæren i tide",
        description: "E-læringskurs utarbeidet ved avdeling for urologi i samarbeid med avdeling for kompetanseutvikling, ved Ahus.",
        type: "E-læringskurs",
        buttonText: "Til kurset",
        altText: "E-læring"
      },
      course4: {
        provider: "Bekkensenteret ved Ahus",
        title: "Instruksjonsfilm om Avføringslekkasje",
        description: "Utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst. Instruksjonsvideoer for behandling av avføringslekkasje.",
        type: "Instruksjonsfilm",
        buttonText: "Se video",
        altText: "Video"
      }
    },
    selectedCardContent: {
      "Utredning og diagnostikk": {
        sections: [
          {
            heading: "Kliniske undersøkelsesmetoder",
            description: "Detaljert oversikt over kliniske undersøkelsesmetoder for bekkenbunnsdysfunksjoner inkluderer:",
            items: [
              "Anamnese og symptombeskrivelse",
              "Fysisk undersøkelse av bekkenbunnen",
              "Palpasjon og funksjonstester",
              "Vurdering av muskelstyrke og koordinasjon"
            ]
          },
          {
            heading: "Bildediagnostikk",
            description: "Moderne bildediagnostiske metoder:",
            items: [
              "Ultralyd av bekkenbunnen",
              "MR-undersøkelse",
              "Urodynamisk undersøkelse",
              "Defekografi"
            ]
          }
        ]
      },
      "Behandlingsmetoder": {
        sections: [
          {
            heading: "Konservativ behandling",
            description: "Førstelinjebehandling inkluderer:",
            items: [
              "Bekkenbunnstrening og fysioterapi",
              "Livsstilsendringer og kosthold",
              "Blæretrening og tømmingsregimer",
              "Biofeedback og elektrostimulering"
            ]
          },
          {
            heading: "Kirurgiske metoder",
            description: "Ved behov for kirurgisk behandling:",
            items: [
              "Minimalt invasive prosedyrer",
              "Mesh-kirurgi (når indikert)",
              "Rekonstruktive inngrep",
              "Robotassistert kirurgi"
            ]
          }
        ]
      }
    },
    contentCards: {
      arcticMeeting: {
        title: "Arctic Pelvic Floor Meeting",
        description: "Årlig konferanse for fagpersoner innen bekkenbunnshelse",
        registration: "Påmelding til konferansen",
        committee: "Organisasjonskomité",
        presentations: "Presentasjoner og program"
      },
      patientTools: {
        title: "Pasientverktøy og ressurser",
        description: "Verktøy og ressurser for pasienter med bekkenbunnsplager",
        analIrrigation: "Analirrigasjon - instruksjonsvideoer",
        patientEducation: "Pasientundervisning og informasjon",
        selfAssessment: "Selvtest for avføringslekkasje"
      },
      elearning: {
        title: "E-læringskurs",
        description: "Faglige kurs og instruksjonsvideoer for helsepersonell",
        course1: "Utredning og behandling av bekkenbunnsdysfunksjoner",
        course2: "Fremfall av underlivsorganer (underlivsprolaps)",
        course3: "Unngå overstrekk – tøm urinblæren i tide",
        course4: "Instruksjonsfilm om Avføringslekkasje"
      },
      professional: {
        primaryPathway: "Primær utredningsvei: Fastlege → Spesialist",
        neuroBladder: "Nevrogen blære: Nevro-urologisk utredning",
        fiWorkup: "Analinkontinens: Konservativ førstelinje",
        constipationWorkup: "Kronisk obstipasjon: Primærtiltak",
        pelvicPainWorkup: "Langvarige bekkensmerter: Tverrfaglig kartlegging",
        anorectalGuidelines: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser | NBH/Helsebiblioteket"
      },
      treatment: {
        conservativePfmt: "Konservativ behandling: Bekkenbunnstrening",
        fiConservativeBiofeedback: "Analinkontinens: Biofeedback og elektrostimulering",
        constipationLifestyle: "Obstipasjon: Toalett-trening og kosthold",
        neurogenicManagement: "Nevrogen blære: Intermitterende kateterisering",
        escalationSurgeryMeds: "Ved manglende effekt: Kirurgi og medikamenter",
        postpartumPfmt: "Svangerskap/barsel: Tidlig bekkenbunnstrening"
      }
    }
  },
  en: {
    title: "For healthcare personnel",
    subtitle: "Pages are under update",
    description: "Professional resources, guidelines and tools for healthcare personnel working with pelvic floor health.",
    searchPlaceholder: "Search for professional resources, guidelines or topics...",
    backToHome: "Back to home",
    tabs: {
      alle: "All",
      forskning: "Research",
      behandling: "Treatment",
      livsstil: "Lifestyle",
      teknologi: "Technology",
      pasienthistorier: "Patient stories",
      fagfolk: "For professionals",
    },
    categories: {
      patientStory: "Patient story",
      technology: "Technology",
      lifestyle: "Lifestyle",
      treatment: "Treatment",
      research: "Research",
      eLearning: "E-learning",
      scoringsverktoy: "Scoring tools",
    },
    articles: {
      selectedArticles: "Selected articles",
      latestNews: "Latest news",
      noResults: "No articles found for your search.",
      loadMore: "Load more articles",
    },
    guidelines: {
      title: "Professional guidelines and guides",
      description: "National and international guidelines for healthcare personnel",
      noResults: "No guidelines found for your search.",
      heading: "GUIDELINE / SOURCE / LINK",
      categoryLabel: "Professional guidelines and guides",
      tableHeaders: {
        veileder: "GUIDELINE",
        kilde: "SOURCE",
        lenke: "LINK"
      }
    },
    aria: {
      clickToToggle: "Click to",
      open: "open",
      close: "close",
      details: "details",
      searchLabel: "Search professional resources",
      searchHelp: "Search for professional resources, guidelines or topics"
    },
    elearningHero: {
      imageAlt: "Pelvic floor dysfunctions",
      title: "Assessment and treatment of pelvic floor dysfunctions",
      description: "This e-learning course is for healthcare personnel and will provide you with knowledge about interdisciplinary and systematic approaches to pelvic floor dysfunctions with focus on urinary function, bowel function, sexual function and pain.",
      buttonText: "Go to course"
    },
    scoringTools: {
      description: "Here you will find information about various scoring tools for different dysfunctions to be used in assessment and follow-up to evaluate treatment effects. The International Consultation on Incontinence has developed various International Consultation on Incontinence Modular Questionnaire (ICIQ) scoring forms. To use these tools, send an email to the ICIQ group, contact information can be found on their website.",
      headings: {
        urinaryDysfunction: "Urinary dysfunction / urinary incontinence",
        fecalDysfunction: "Fecal dysfunction / fecal incontinence",
        pain: "Pain",
        promPrem: "PROM/PREM"
      },
      promPremDescription: "The use of patient-reported data with PROM (Patient Reported Outcome Measures) and PREM (Patient Reported Experience Measures) are important tools for, among other things, measuring the effect of interventions, detecting changes in health that are relevant to patients and society, and increasing patient involvement."
    },
    elearning: {
      title: "E-learning courses",
      description: "Professional courses and instructional videos for healthcare personnel in pelvic floor health"
    },
    organizations: {
      title: "Organizations and professional networks for healthcare personnel",
      description: "National and international professional organizations in pelvic floor health"
    },
    guidelinesTable: [
      {
        veileder: "Professional guidelines for assessment and conservative treatment of anorectal functional disorders",
        kilde: "NBH/Helsebiblioteket",
        lenke: "Go to guide"
      },
      {
        veileder: "Consensus statement on bladder training and bowel training",
        kilde: "ICS.org",
        lenke: "Go to publication"
      },
      {
        veileder: "Referral guidelines UNN",
        kilde: "UNN",
        lenke: "Go to guide"
      },
      {
        veileder: "Guideline for the diagnosis and treatment of Faecal Incontinence – A UEG/ESCP/ESNM/ESPCG",
        kilde: "Pubmed",
        lenke: "Go to guide"
      },
      {
        veileder: "Chronic pelvic pain (2024)",
        kilde: "Gynecology and Obstetrics Methods",
        lenke: "Go to guide"
      },
      {
        veileder: "Guideline in gynecology – Perineal injury and anal sphincter injury during childbirth",
        kilde: "Norwegian Gynecological Association Methods",
        lenke: "Go to guide"
      },
      {
        veileder: "Urinary incontinence. Norwegian Gynecological Association.",
        kilde: "Norwegian Gynecological Association Methods",
        lenke: "Go to guide"
      },
      {
        veileder: "Chronic pain conditions in the vulva",
        kilde: "Norwegian Gynecological Association Methods",
        lenke: "Go to guide"
      },
      {
        veileder: "Guidelines for prevention of catheter-associated urinary tract infections",
        kilde: "Norwegian Institute of Public Health",
        lenke: "Go to guide"
      },
      {
        veileder: "Talk about it! Strategy for sexual health (2017-2022)",
        kilde: "Ministry of Health and Care Services",
        lenke: "Go to strategy plan"
      },
      {
        veileder: "Reference work for healthcare personnel working with contraception, sexually transmitted infections and other topics within sexual and reproductive health.",
        kilde: "Sexogsamfunn.no",
        lenke: "eMethods for sexual health"
      }
    ],
    elearningCourses: {
      prolapse: {
        heading: "Pelvic organ prolapse",
        description: "E-learning course developed by the Pelvic Floor Center at Ahus.",
        linkText: "Go to course"
      },
      avoidOverstretching: {
        heading: "Avoid overstretching – empty the bladder in time",
        description: "E-learning course developed by the urology department in collaboration with the competence development department at Ahus. (If you experience problems accessing the page via Explorer, switching to Chrome browser may help).",
        linkText: "Go to course"
      },
      fecalIncontinenceVideo: {
        heading: "Instructional video on Fecal Incontinence",
        description: "Developed by the Pelvic Floor Center at Akershus University Hospital, South-Eastern Norway Regional Health Authority. (If you experience problems accessing the page via Explorer, switching to Chrome browser may help).",
        linkText: "Go to course"
      }
    },
    coursesDisplay: {
      course1: {
        provider: "NEKIB",
        title: "Assessment and treatment of pelvic floor dysfunctions",
        description: "This course will provide you with knowledge about interdisciplinary and systematic approaches to pelvic floor dysfunctions with focus on urinary function, bowel function, sexual function and pain.",
        type: "E-learning course",
        buttonText: "Go to course",
        altText: "E-learning"
      },
      course2: {
        provider: "Pelvic Floor Center at Ahus",
        title: "Pelvic organ prolapse",
        description: "E-learning course developed by the Pelvic Floor Center at Ahus. The course provides insights into diagnostics and treatment of pelvic organ prolapse.",
        type: "E-learning course",
        buttonText: "Go to course",
        altText: "E-learning"
      },
      course3: {
        provider: "Ahus",
        title: "Avoid overstretching – empty the bladder in time",
        description: "E-learning course developed by the urology department in collaboration with the competence development department at Ahus.",
        type: "E-learning course",
        buttonText: "Go to course",
        altText: "E-learning"
      },
      course4: {
        provider: "Pelvic Floor Center at Ahus",
        title: "Instructional video on Fecal Incontinence",
        description: "Developed by the Pelvic Floor Center at Akershus University Hospital, South-Eastern Norway Regional Health Authority. Instructional videos for treatment of fecal incontinence.",
        type: "Instructional video",
        buttonText: "Watch video",
        altText: "Video"
      }
    },
    selectedCardContent: {
      "Utredning og diagnostikk": {
        sections: [
          {
            heading: "Clinical examination methods",
            description: "Detailed overview of clinical examination methods for pelvic floor dysfunctions includes:",
            items: [
              "Medical history and symptom description",
              "Physical examination of the pelvic floor",
              "Palpation and functional tests",
              "Assessment of muscle strength and coordination"
            ]
          },
          {
            heading: "Imaging diagnostics",
            description: "Modern imaging diagnostic methods:",
            items: [
              "Pelvic floor ultrasound",
              "MRI examination",
              "Urodynamic examination",
              "Defecography"
            ]
          }
        ]
      },
      "Behandlingsmetoder": {
        sections: [
          {
            heading: "Conservative treatment",
            description: "First-line treatment includes:",
            items: [
              "Pelvic floor muscle training and physiotherapy",
              "Lifestyle changes and diet",
              "Bladder training and voiding regimens",
              "Biofeedback and electrostimulation"
            ]
          },
          {
            heading: "Surgical methods",
            description: "When surgical treatment is needed:",
            items: [
              "Minimally invasive procedures",
              "Mesh surgery (when indicated)",
              "Reconstructive procedures",
              "Robot-assisted surgery"
            ]
          }
        ]
      }
    },
    contentCards: {
      arcticMeeting: {
        title: "Arctic Pelvic Floor Meeting",
        description: "Annual conference for professionals in pelvic floor health",
        registration: "Conference registration",
        committee: "Organizing committee",
        presentations: "Presentations and program"
      },
      patientTools: {
        title: "Patient tools and resources",
        description: "Tools and resources for patients with pelvic floor problems",
        analIrrigation: "Anal irrigation - instructional videos",
        patientEducation: "Patient education and information",
        selfAssessment: "Self-assessment for fecal incontinence"
      },
      elearning: {
        title: "E-learning courses",
        description: "Professional courses and instructional videos for healthcare personnel",
        course1: "Assessment and treatment of pelvic floor dysfunctions",
        course2: "Pelvic organ prolapse",
        course3: "Avoid overstretching - empty the bladder in time",
        course4: "Instructional video on Fecal Incontinence"
      },
      professional: {
        primaryPathway: "Primary assessment pathway: GP → Specialist",
        neuroBladder: "Neurogenic bladder: Neuro-urological assessment",
        fiWorkup: "Fecal incontinence: Conservative first-line",
        constipationWorkup: "Chronic constipation: Primary measures",
        pelvicPainWorkup: "Chronic pelvic pain: Multidisciplinary evaluation",
        anorectalGuidelines: "Professional guidelines for assessment and conservative treatment of anorectal functional disorders | NBH/Health Library"
      },
      treatment: {
        conservativePfmt: "Conservative treatment: Pelvic floor muscle training",
        fiConservativeBiofeedback: "Fecal incontinence: Biofeedback and electrostimulation",
        constipationLifestyle: "Constipation: Toilet training and diet",
        neurogenicManagement: "Neurogenic bladder: Intermittent catheterization",
        escalationSurgeryMeds: "If insufficient response: Surgery and medication",
        postpartumPfmt: "Pregnancy/postpartum: Early pelvic floor muscle training"
      }
    }
  }
} as const

export const Helsepersonell = () => {
  const { language } = useLanguage()
  const [activeTab] = useState("alle")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  
  const data = HELSEPERSONELL_DATA[language]

  // Removed tabs as requested

  const contentCards: ContentCardProps[] = [
    /* COMMENTED OUT - First 3 cards
    {
      titleKey: data.contentCards.patientTools.title,
      category: "alle",
      categoryLabel: "Verktøy",
      sections: [
        {
          description: data.contentCards.patientTools.description,
          items: [
            {
              text: data.contentCards.patientTools.analIrrigation,
              link: "/useful"
            },
            {
              text: data.contentCards.patientTools.patientEducation,
              link: "/useful?tab=pasientundervisning"
            },
            {
              text: data.contentCards.patientTools.selfAssessment,
              link: "/conditions/fecal-incontinence?section=diagnosis#self-test"
            }
          ]
        }
      ]
    },
    {
      titleKey: data.contentCards.elearning.title,
      category: "behandling",
      categoryLabel: "Kurs",
      sections: [
        {
          description: data.contentCards.elearning.description,
          items: [
            {
              text: data.contentCards.elearning.course1,
              link: "https://helsekompetanse.no/login/index.php"
            },
            {
              text: data.contentCards.elearning.course2,
              link: "https://kursbygger.ihelse.net/?startcourseid=726&tracking="
            },
            {
              text: data.contentCards.elearning.course3,
              link: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/9818edac-c296-46b4-b1e1-f17f4016091b/index.html"
            },
            {
              text: data.contentCards.elearning.course4,
              link: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/955b05f5-59e8-45cc-8f31-b8903b59aaef/index.html"
            }
          ]
        }
      ]
    },
    // Modern 2025 Content Cards - Enhanced Organization
    {
      titleKey: "Utredning og diagnostikk",
      category: "alle",
      categoryLabel: "Alle fagområder",
      sections: [
        {
          description: "Komplett oversikt over diagnostiske verktøy og utredningsmetoder for bekkenbunnsdysfunksjoner.",
          items: [
            { text: data.contentCards.professional.primaryPathway },
            { text: data.contentCards.professional.neuroBladder },
            { text: data.contentCards.professional.fiWorkup },
            { text: data.contentCards.professional.constipationWorkup },
            { text: data.contentCards.professional.pelvicPainWorkup },
            { text: data.contentCards.professional.anorectalGuidelines, link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" }
          ]
        }
      ]
    },
    END COMMENTED OUT */
    {
      titleKey: "Mestring og livskvalitet",
      category: "livsstil",
      categoryLabel: "Livsstil og mestring",
      sections: [
        {
          description: "Strategier for mestring og forbedring av livskvalitet for personer med bekkenbunnsplager.",
          items: [
            { text: "Kognitiv atferdsterapi (CBT) for bekkenbunnsplager" },
            { text: "Stressreduksjon og avslapningsteknikker" },
            { text: "Sosial støtte og nettverk" },
            { text: "Selvstendighet og daglig fungering" },
            { text: "Psykologisk støtte og rådgivning" }
          ]
        }
      ]
    },
    {
      titleKey: "Utredning og diagnostikk",
      category: "fagfolk",
      categoryLabel: "Gynekologi",
      sections: [
        {
          description: "Gynekologisk spesialisert utredning og diagnostikk av bekkenbunnsdysfunksjoner hos kvinner.",
          items: [
            { text: data.contentCards.professional.primaryPathway },
            { text: data.contentCards.professional.fiWorkup },
            { text: data.contentCards.professional.pelvicPainWorkup },
            { text: data.contentCards.professional.anorectalGuidelines, link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" }
          ]
        }
      ]
    },
    {
      titleKey: "Utredning og diagnostikk",
      category: "fagfolk",
      categoryLabel: "Urologi",
      sections: [
        {
          description: "Urologisk spesialisert utredning og diagnostikk av urinveisdysfunksjoner.",
          items: [
            { text: data.contentCards.professional.primaryPathway },
            { text: data.contentCards.professional.neuroBladder },
            { text: data.contentCards.professional.anorectalGuidelines, link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" }
          ]
        }
      ]
    },
    {
      titleKey: "Utredning og diagnostikk",
      category: "fagfolk",
      categoryLabel: "Fysioterapi",
      sections: [
        {
          description: "Fysioterapeutisk utredning og funksjonell diagnostikk av bekkenbunnsmuskulatur.",
          items: [
            { text: data.contentCards.professional.constipationWorkup },
            { text: data.contentCards.professional.fiWorkup },
            { text: data.contentCards.professional.pelvicPainWorkup },
            { text: data.contentCards.professional.anorectalGuidelines, link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" }
          ]
        }
      ]
    },
    {
      titleKey: "Utredning og diagnostikk",
      category: "fagfolk",
      categoryLabel: "Sykepleie",
      sections: [
        {
          description: "Sykepleierutredning og helsefremmende diagnostikk av bekkenbunnshelse.",
          items: [
            { text: data.contentCards.professional.primaryPathway },
            { text: data.contentCards.professional.fiWorkup },
            { text: data.contentCards.professional.constipationWorkup },
            { text: data.contentCards.professional.anorectalGuidelines, link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" }
          ]
        }
      ]
    },
    {
      titleKey: "Utredning og diagnostikk",
      category: "fagfolk",
      categoryLabel: "Gastroenterologi",
      sections: [
        {
          description: "Gastroenterologisk utredning av analinkontinens og forstoppelse.",
          items: [
            { text: data.contentCards.professional.fiWorkup },
            { text: data.contentCards.professional.constipationWorkup },
            { text: data.contentCards.professional.anorectalGuidelines, link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf" }
          ]
        }
      ]
    },
    {
      titleKey: "Utredning og diagnostikk",
      category: "fagfolk",
      categoryLabel: "Nevrologi",
      sections: [
        {
          description: "Nevrologisk vurdering ved nevrogen blæredysfunksjon og bekkenbunnssmerter.",
          items: [
            { text: data.contentCards.professional.neuroBladder },
            { text: data.contentCards.professional.pelvicPainWorkup }
          ]
        }
      ]
    },
    {
      titleKey: "Behandlingsmetoder",
      category: "behandling",
      categoryLabel: "Alle fagområder",
      sections: [
        {
          description: "Evidensbaserte behandlingsmetoder for ulike bekkenbunnsdysfunksjoner.",
          items: [
            { text: data.contentCards.treatment.conservativePfmt },
            { text: data.contentCards.treatment.fiConservativeBiofeedback },
            { text: data.contentCards.treatment.constipationLifestyle },
            { text: data.contentCards.treatment.neurogenicManagement },
            { text: data.contentCards.treatment.escalationSurgeryMeds },
            { text: data.contentCards.treatment.postpartumPfmt }
          ]
        }
      ]
    },
    /* COMMENTED OUT - Nasjonale retningslinjer
    {
      titleKey: "Nasjonale retningslinjer",
      category: "alle",
      categoryLabel: "Alle fagområder",
      sections: [
        {
          description: "Aktuelle nasjonale og internasjonale retningslinjer for bekkenbunnshelse.",
          items: [
            { text: "NBH retningslinjer" },
            { text: "Norsk gynekologisk forening" },
            { text: "Internasjonale standarder" },
            { text: "Kvalitetsindikatorer" }
          ]
        }
      ]
    },
    END COMMENTED OUT */
    {
      titleKey: "Forskning og evidens",
      category: "forskning",
      categoryLabel: "Alle fagområder",
      sections: [
        {
          description: "Aktuell forskning og evidensbasert kunnskap innen bekkenbunnshelse.",
          items: [
            { text: "Bekkenbunnsportalen (NBH)", link: "/" },
            { text: "Bekkensenteret ved Ahus", link: "https://www.ahus.no" },
            { text: "Universitetssykehuset Nord-Norge (UNN)", link: "https://www.unn.no" },
            { text: "St. Olavs hospital", link: "https://www.stolav.no" }
          ]
        }
      ]
    },
    {
      titleKey: "Livsstil og forebygging",
      category: "livsstil",
      categoryLabel: "Livsstil",
      sections: [
        {
          description: "Livsstilsfaktorer som påvirker bekkenbunnshelse og forebyggende tiltak.",
          items: [
            { text: "Kosthold og bekkenbunnshelse" },
            { text: "Fysisk aktivitet og bekkenbunn" },
            { text: "Røyking og bekkenbunnshelse" },
            { text: "Vekt og bekkenbunnshelse" }
          ]
        }
      ]
    },
    {
      titleKey: "Pasienthistorier og erfaringer",
      category: "pasienthistorier",
      categoryLabel: "Pasienthistorier",
      sections: [
        {
          description: "Pasienthistorier og erfaringer fra personer med bekkenbunnsplager.",
          items: [
            { text: "Historier om urinlekkasje" },
            { text: "Historier om avføringslekkasje" },
            { text: "Historier om bekkenbunnssmerter" },
            { text: "Historier om graviditet og fødsel" }
          ]
        }
      ]
    },
    // Row 2 - Professional Development
    {
      titleKey: "Utdanning og kurs",
      category: "behandling",
      categoryLabel: "Alle fagområder",
      sections: [
        {
          description: "Kontinuerlig faglig utvikling og spesialisert utdanning.",
          items: [
            { text: "E-læringskurs" },
            { text: "Workshops og seminarer" },
            { text: "Spesialistutdanning" },
            { text: "Konferanser" }
          ]
        }
      ]
    },
    {
      titleKey: "Kliniske verktøy",
      category: "teknologi",
      categoryLabel: "Alle fagområder",
      sections: [
        {
          description: "Praktiske verktøy og ressurser for klinisk arbeid.",
          items: [
            { text: "Spørreskjemaer" },
            { text: "Vurderingsskjemaer" },
            { text: "Behandlingsprotokoller" },
            { text: "Pasientinformasjon" }
          ]
        }
      ]
    },
    {
      titleKey: "Digital helse og teknologi",
      category: "teknologi",
      categoryLabel: "Moderne teknologi",
      sections: [
        {
          description: "Innovative teknologiske løsninger for bekkenbunnshelse.",
          items: [
            { text: "Mobilapplikasjoner for bekkenbunnstrening" },
            { text: "Wearable teknologi for monitoring" },
            { text: "AI-assistert diagnostikk" },
            { text: "Virtual reality for behandling" },
            { text: "Telemedisin og fjernkonsultasjon" }
          ]
        }
      ]
    },
    {
      titleKey: data.categories.eLearning,
      category: "behandling",
      categoryLabel: data.categories.eLearning,
      sections: [
        {
          heading: data.elearningCourses.prolapse.heading,
          description: data.elearningCourses.prolapse.description,
          items: [
            {
              text: data.elearningCourses.prolapse.linkText,
              link: "https://kursbygger.ihelse.net/?startcourseid=726&tracking=",
            },
          ],
        },
        {
          heading: data.elearningCourses.avoidOverstretching.heading,
          description: data.elearningCourses.avoidOverstretching.description,
          items: [
            {
              text: data.elearningCourses.avoidOverstretching.linkText,
              link: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/955b05f5-59e8-45cc-8f31-b8903b59aaef/index.html",
            },
          ],
        },

        {
          heading: data.elearningCourses.fecalIncontinenceVideo.heading,
          description: data.elearningCourses.fecalIncontinenceVideo.description,
          items: [
            {
              text: data.elearningCourses.fecalIncontinenceVideo.linkText,
              link: "https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/955b05f5-59e8-45cc-8f31-b8903b59aaef/index.html",
            },
          ],
        },
      ],
    },
    {
      titleKey: data.categories.scoringsverktoy,
      category: "alle",
      categoryLabel: data.categories.scoringsverktoy,
      sections: [
        {
          description: data.scoringTools.description,
          items: [
            { 
              text: "International Consultation on Incontinence", 
              link: "https://iciq.net/" 
            }
          ],
        },
        {
          heading: data.scoringTools.headings.urinaryDysfunction,
          items: [
            { 
              text: 'ICIQ-UI-SF "ICIQ-Urinary Incontinence- Short Form"', 
              link: "https://iciq.net/iciq-ui-sf" 
            },
            { 
              text: 'ICIQ-OAB "ICIQ-Overactive Bladder"', 
              link: "https://iciq.net/iciq-oab" 
            },
            {
              text: "NKIR spørreskjema Norsk kvinnelig inkontinensregister spørreskjema for urininkontinens som besvares før og etter operasjon som gir grunnlag for en inkontinensindex/tallverdi som forteller om graden av plager og symptomer grunnet stressinkontinens og overaktiv blære.",
              link: "https://nekib.helsekompetanse.no/wp-content/uploads/2024/09/NKIR-skjema.pdf",
            },
            {
              text: "IPSS Internasjonal prostatasymptomskår",
              link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/03/IPSS-Skjema-om-vannlatingsproblemer.pdf",
            },
            {
              text: "Drikke- og miksjonsliste. Kartleggingsverktøy for registrering av urinvolum- og frekvens (også ved kateterisering), drikkevolum- og frekvens og lekkasjeregistrering. (Eksempel fra UNN Tromsø)",
              link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/03/Drikke-og-miksjonsliste.pdf",
            },
          ],
        },
        {
          heading: data.scoringTools.headings.fecalDysfunction,
          items: [
            {
              text: "St Marks Validert graderingssystem for fekal inkontinens. (Vaizey CJ, Carapeti E, Cahill JA, Kamm MA. Prospective comparison of faecal incontinence grading systems. GUT 1999; 44:77-80)",
              link: "https://gut.bmj.com/content/44/1/77",
            },
            {
              text: "ODSS m/Wexner. Obstructed Defecation Syndrome Score og Wexner score, graderingssystem for obstipasjon.",
              link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/03/Wexner-score.pdf",
            },
            { 
              text: "FIQLS – Norsk validert versjon av Fecal Incontinence Quality of Life Scale", 
              link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/03/FIQLS-Norsk-versjon.pdf",
            },
            {
              text: 'ICIQ-B "ICIQ-Bowel." Sykdomsspesifikt mål på analinkontinens og dens innvirkning på livskvalitet. Publikasjonen "Translation and validation of a Norwegian version of ICIQ-B" finnes som abstract på ICS nettsider.',
              link: "https://iciq.net/iciq-b",
            },
            {
              text: "Avføringsdagbok. Kartleggingsverktøy for registrering av avføringsmønster, frekvens og lekkasjeregistrering. (Eksempel fra UNN Narvik)",
              link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/03/Avforingsdagbok.pdf",
            },
          ],
        },
        {
          heading: data.scoringTools.headings.pain,
          items: [
            {
              text: "VAS. Visuell analog skala. Målemetode for å gradere pasientens subjektive symptomer eller plager. Pasienten blir vanligvis bedt om å angi et sted på en 10cm linje som tilsvarer nivå av symptom hvor 0 betyr ingen smerter og 10 er maksimal smerte.",
            },
          ],
        },
        {
          heading: data.scoringTools.headings.promPrem,
          description: data.scoringTools.promPremDescription,
          items: [
            {
              text: "Mer informasjon om pasientrapporterte data, ulike skjema og lenker finnes på siden til Fagsenter for pasientrapporterte data.",
              link: "https://unn.no/fag-og-forskning/fagsenter-for-pasientrapporterte-data",
            },
          ],
        },
      ],
    },
  ]

  // Guidelines URLs (same for both languages)
  const guidelineUrls = [
    "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf",
    "https://www.ics.org/Documents/DocumentsDownload.aspx?DocumentID=5916",
    "https://www.unn.no/henvisninger-til-unn",
    "https://pubmed.ncbi.nlm.nih.gov/35303758/",
    "https://metodebok.no/index.php?action=topic&item=jzbn27V4",
    "https://metodebok.no/index.php?action=topic&item=qqnzK4BK",
    "https://metodebok.no/index.php?action=topic&item=MGUaPMYb",
    "https://metodebok.no/index.php?action=topic&item=JxBt8Wny",
    "https://www.fhi.no/nettpub/urinveisinfeksjoner/",
    "https://www.regjeringen.no/no/dokumenter/god-seksuell-helse-vart-felles-ansvar.-strategi-for-seksuell-helse/id3115832/?ch=1",
    "https://emetodebok.no/"
  ]

  // Get language-specific guidelines data with URLs
  const guidelinesData = data.guidelinesTable.map((guideline, index) => ({
    ...guideline,
    url: guidelineUrls[index]
  }))

  // Filter content cards based on search query and active tab
  const filteredContentCards = contentCards.filter(
    (card) =>
      (card.category === "alle" || card.category === activeTab) &&
      card.titleKey.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter guidelines based on search query
  const filteredGuidelines = guidelinesData.filter(
    (guideline) =>
      guideline.veileder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guideline.kilde.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guideline.lenke.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Professional page hero (distinct from homepage) */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>{data.title}</h1>
                <h2 className={styles.heroSubtitle}>{data.subtitle}</h2>
                <p className={styles.heroDescription}>{data.description}</p>
              </div>
            </div>
          </div>
            {/* Search container temporarily hidden */}
            {false && <div className={styles.searchContainer}>
              <label htmlFor="search-input" className="sr-only">
                {data.aria.searchLabel}
              </label>
              <Input
                id="search-input"
                style={{ outline: "none", border: "none" }}
                className={styles.searchInput}
                placeholder={data.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-describedby="search-help"
                role="searchbox"
              />
              <div className={styles.searchIcon} aria-hidden="true">
                <img className={styles.searchIconImage} alt="" src="/group.png" />
              </div>
              <div id="search-help" className="sr-only">
                {data.aria.searchHelp}
              </div>
            </div>}
          {/* Navigation Tabs - Removed as requested */}
          {/* Guidelines Table Section - Always show */}
          <div 
            className={styles.guidelinesSection}
            role="tabpanel"
            id="tabpanel-alle"
            aria-labelledby="tab-alle"
            tabIndex={0}
          >
            <div className={styles.guidelinesHeader}>
              <h2 className={styles.guidelinesTitle}>{data.guidelines.title}</h2>
              <p className={styles.guidelinesDescription}>
                {data.guidelines.description}
              </p>
            </div>
            
            {filteredGuidelines.length > 0 ? (
              <div className={styles.guidelinesTableContainer}>
                <div className={styles.guidelinesTable}>
                  <div className={styles.tableHeader}>
                    <div className={styles.tableHeaderCell}>{data.guidelines.tableHeaders.veileder}</div>
                    <div className={styles.tableHeaderCell}>{data.guidelines.tableHeaders.kilde}</div>
                    <div className={styles.tableHeaderCell}>{data.guidelines.tableHeaders.lenke}</div>
                  </div>
                  
                  {filteredGuidelines.map((guideline, index) => (
                    <div key={index} className={styles.tableRow}>
                      <div className={styles.tableCell}>{guideline.veileder}</div>
                      <div className={styles.tableCell}>{guideline.kilde}</div>
                      <div className={styles.tableCell}>
                        <a href={guideline.url} className={styles.tableLink} target="_blank" rel="noopener noreferrer">
                          {guideline.lenke}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.noResults}>
                <p className={styles.noResultsText}>{data.guidelines.noResults}</p>
              </div>
            )}
          </div>

          {/* E-learning Section with aka.png image - Temporarily hidden until new link is available */}
          {false && <div className={styles.elearningSection}>
            <div className={styles.elearningContainer}>
              <div className={styles.elearningContent}>
                <div className={styles.elearningImage}>
                  <img src="/vector-logo.png" alt={data.elearningHero.imageAlt} className={styles.elearningImageFile} />
                </div>
                <div className={styles.elearningText}>
                  <h2 className={styles.elearningTitle}>{data.elearningHero.title}</h2>
                  <p className={styles.elearningDescription}>
                    {data.elearningHero.description}
                  </p>
                  <a href="https://helsekompetanse.no/course/view.php?id=233" className={styles.elearningButton} target="_blank" rel="noopener noreferrer">
                    {data.elearningHero.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>}

          {/* Arctic Pelvic Floor Meeting Section - shared homepage component for identical design */}
          <ConferenceSection />

          {/* Display Content Cards */}
          <div 
            className={styles.contentCardsGrid}
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
          >
            {filteredContentCards.length > 0 ? (
              filteredContentCards.map((card, index) => (
                <ContentCard 
                  key={index} 
                  {...card} 
                  onClick={() => {}}
                  isSelected={selectedCard === card.titleKey}
                  ariaLabels={data.aria}
                />
              ))
            ) : (
              <div className={styles.noResults}>
                <p className={styles.noResultsText}>{data.articles.noResults}</p>
              </div>
            )}
          </div>

          {/* Selected Card Content */}
          {selectedCard && (
            <div className={styles.selectedCardContent}>
              <div className={styles.selectedCardHeader}>
                <h2 className={styles.selectedCardTitle}>{selectedCard}</h2>
                <button 
                  className={styles.closeButton}
                  onClick={() => setSelectedCard(null)}
                >
                  ×
                </button>
              </div>
              <div className={styles.selectedCardBody}>
                {selectedCard === "Utredning og diagnostikk" && data.selectedCardContent["Utredning og diagnostikk"] && (
                  <div>
                    {data.selectedCardContent["Utredning og diagnostikk"].sections.map((section, idx) => (
                      <div key={idx}>
                        <h3>{section.heading}</h3>
                        <p>{section.description}</p>
                        <ul>
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedCard === "Behandlingsmetoder" && data.selectedCardContent["Behandlingsmetoder"] && (
                  <div>
                    {data.selectedCardContent["Behandlingsmetoder"].sections.map((section, idx) => (
                      <div key={idx}>
                        <h3>{section.heading}</h3>
                        <p>{section.description}</p>
                        <ul>
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedCard === "Nasjonale retningslinjer" && (
                  <div>
                    <h3>NBH retningslinjer</h3>
                    <p>Nasjonalt senter for Bekkenbunnshelse (NBH) har utarbeidet omfattende retningslinjer for:</p>
                    <ul>
                      <li>Utredning og diagnostikk</li>
                      <li>Konservativ behandling</li>
                      <li>Kirurgiske indikasjoner</li>
                      <li>Oppfølging og kvalitetssikring</li>
                    </ul>
                    
                    <h3>Norsk gynekologisk forening</h3>
                    <p>Spesialiserte retningslinjer for:</p>
                    <ul>
                      <li>Urininkontinens hos kvinner</li>
                      <li>Fremfall av underlivsorganer</li>
                      <li>Seksuell dysfunksjon</li>
                      <li>Kroniske smerter</li>
                    </ul>
                  </div>
                )}
                
                {selectedCard === "Forskning og evidens" && (
                  <div>
                    <h3>Publiserte studier</h3>
                    <p>Aktuell forskning innen bekkenbunnshelse:</p>
                    <ul>
                      <li>Randomiserte kontrollerte studier</li>
                      <li>Kohortstudier og registerdata</li>
                      <li>Kvalitative studier</li>
                      <li>Implementeringsforskning</li>
                    </ul>
                    
                    <h3>Systematiske oversikter</h3>
                    <p>Cochrane-oversikter og andre systematiske gjennomganger:</p>
                    <ul>
                      <li>Behandlingseffekt av bekkenbunnstrening</li>
                      <li>Kirurgiske metoder for inkontinens</li>
                      <li>Forebyggende tiltak</li>
                      <li>Kostnadseffektivitet</li>
                    </ul>
                  </div>
                )}
                
                {selectedCard === "Utdanning og kurs" && (
                  <div>
                    <h3>E-læringskurs</h3>
                    <p>Interaktive digitale læringsressurser:</p>
                    <ul>
                      <li>Grunnopplæring i bekkenbunnshelse</li>
                      <li>Spesialiserte kurs for ulike faggrupper</li>
                      <li>Kontinuerlig faglig utvikling</li>
                      <li>Sertifiseringsprogrammer</li>
                    </ul>
                    
                    <h3>Workshops og seminarer</h3>
                    <p>Praktisk opplæring og faglige møter:</p>
                    <ul>
                      <li>Hendson-baserte workshops</li>
                      <li>Faglige konferanser</li>
                      <li>Networking og kunnskapsdeling</li>
                      <li>Internasjonale samarbeid</li>
                    </ul>
                  </div>
                )}
                
                {selectedCard === "Kliniske verktøy" && (
                  <div>
                    <h3>Spørreskjemaer</h3>
                    <p>Validerte måleinstrumenter for:</p>
                    <ul>
                      <li>Symptomvurdering og alvorlighetsgrad</li>
                      <li>Livskvalitetsmåling</li>
                      <li>Behandlingseffekt</li>
                      <li>Pasientopplevelse</li>
                    </ul>
                    
                    <h3>Vurderingsskjemaer</h3>
                    <p>Strukturerte vurderingsverktøy:</p>
                    <ul>
                      <li>Kliniske undersøkelsesprotokoller</li>
                      <li>Behandlingsplanlegging</li>
                      <li>Risikovurdering</li>
                      <li>Oppfølgingsskjemaer</li>
                    </ul>
                  </div>
                )}
                
                {selectedCard === "Sertifisering" && (
                  <div>
                    <h3>Sertifiseringskrav</h3>
                    <p>Krav for sertifisering som bekkenbunnsspesialist:</p>
                    <ul>
                      <li>Grunnopplæring og spesialisering</li>
                      <li>Klinisk erfaring og caseload</li>
                      <li>Kontinuerlig faglig utvikling</li>
                      <li>Kvalitetssikring og evaluering</li>
                    </ul>
                    
                    <h3>Kompetansebevis</h3>
                    <p>Dokumentasjon av kompetanse:</p>
                    <ul>
                      <li>Utdanningsbevis og kursdeltakelse</li>
                      <li>Klinisk erfaring og referanser</li>
                      <li>Peer review og kollegavurdering</li>
                      <li>Gjenopptakelse og oppdatering</li>
                    </ul>
                  </div>
                )}
                
                {selectedCard === "Konsulasjonstjenester" && (
                  <div>
                    <h3>Telemedisin</h3>
                    <p>Digitale konsultasjonstjenester:</p>
                    <ul>
                      <li>Videokonsultasjoner</li>
                      <li>Digital symptomvurdering</li>
                      <li>Fjernmonitorering</li>
                      <li>Digital behandlingsstøtte</li>
                    </ul>
                    
                    <h3>Spesialistkonsultasjon</h3>
                    <p>Direkte tilgang til spesialistkompetanse:</p>
                    <ul>
                      <li>Rask henvisning og triage</li>
                      <li>Andre mening og rådgivning</li>
                      <li>Komplekse tilstander</li>
                      <li>Tverrfaglig samarbeid</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* E-Learning Courses Section */}
          <div className={styles.elearningSection}>
            <div className={styles.elearningContainer}>
              <div className={styles.elearningHeader}>
                <h2 className={styles.elearningTitle}>{data.elearning.title}</h2>
                <p className={styles.elearningDescription}>
                  {data.elearning.description}
                </p>
              </div>

              <div className={styles.elearningGrid}>
                {/* Course 1: Assessment and treatment of pelvic floor dysfunctions */}
                <div className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <div className={styles.courseIcon}>
                      <img src="/octicon-book-16.svg" alt={data.coursesDisplay.course1.altText} className={styles.courseIconImage} />
                    </div>
                    <span className={styles.courseProvider}>{data.coursesDisplay.course1.provider}</span>
                  </div>
                  <h3 className={styles.courseTitle}>{data.coursesDisplay.course1.title}</h3>
                  <p className={styles.courseDescription}>
                    {data.coursesDisplay.course1.description}
                  </p>
                  <div className={styles.courseFooter}>
                    <span className={styles.courseType}>{data.coursesDisplay.course1.type}</span>
                    <a 
                      href="https://helsekompetanse.no/course/view.php?id=233" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.courseButton}
                    >
                      {data.coursesDisplay.course1.buttonText}
                      <img src="/streamline-color_expand-window-2.png" alt="" className={styles.courseButtonIcon} />
                    </a>
                  </div>
                </div>

                {/* Course 2: Pelvic organ prolapse */}
                <div className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <div className={styles.courseIcon}>
                      <img src="/octicon-book-16.svg" alt={data.coursesDisplay.course2.altText} className={styles.courseIconImage} />
                    </div>
                    <span className={styles.courseProvider}>{data.coursesDisplay.course2.provider}</span>
                  </div>
                  <h3 className={styles.courseTitle}>{data.coursesDisplay.course2.title}</h3>
                  <p className={styles.courseDescription}>
                    {data.coursesDisplay.course2.description}
                  </p>
                  <div className={styles.courseFooter}>
                    <span className={styles.courseType}>{data.coursesDisplay.course2.type}</span>
                    <a 
                      href="https://kursbygger.ihelse.net/?startcourseid=726&tracking="
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.courseButton}
                    >
                      {data.coursesDisplay.course2.buttonText}
                      <img src="/streamline-color_expand-window-2.png" alt="" className={styles.courseButtonIcon} />
                    </a>
                  </div>
                </div>

                {/* Course 3: Avoid overstretching */}
                <div className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <div className={styles.courseIcon}>
                      <img src="/octicon-book-16.svg" alt={data.coursesDisplay.course3.altText} className={styles.courseIconImage} />
                    </div>
                    <span className={styles.courseProvider}>{data.coursesDisplay.course3.provider}</span>
                  </div>
                  <h3 className={styles.courseTitle}>{data.coursesDisplay.course3.title}</h3>
                  <p className={styles.courseDescription}>
                    {data.coursesDisplay.course3.description}
                  </p>
                  <div className={styles.courseFooter}>
                    <span className={styles.courseType}>{data.coursesDisplay.course3.type}</span>
                    <a href="https://kurskatalog.helse-sorost.no/kurs/9040/" target="_blank" rel="noopener noreferrer" className={styles.courseButton} >
                      {data.coursesDisplay.course3.buttonText}
                      <img src="/streamline-color_expand-window-2.png" alt="" className={styles.courseButtonIcon} />

                    </a>
                  </div>
                </div>

                {/* Course 4: Instructional video on Fecal Incontinence */}
                <div className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <div className={styles.courseIcon}>
                      <img src="/mynaui_video.png" alt={data.coursesDisplay.course4.altText} className={styles.courseIconImage} />
                    </div>
                    <span className={styles.courseProvider}>{data.coursesDisplay.course4.provider}</span>
                  </div>
                  <h3 className={styles.courseTitle}>{data.coursesDisplay.course4.title}</h3>
                  <p className={styles.courseDescription}>
                    {data.coursesDisplay.course4.description}
                  </p>
                  <div className={styles.courseFooter}>
                    <span className={styles.courseType}>{data.coursesDisplay.course4.type}</span>
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className={styles.courseButton}
                      style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}
                    >
                      {data.coursesDisplay.course4.buttonText}
                      <img src="/streamline-color_expand-window-2.png" alt="" className={styles.courseButtonIcon} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Organizations Section */}
          <div className={styles.organizationsSection}>
            <div className={styles.organizationsContainer}>
              <div className={styles.organizationsHeader}>
                <h2 className={styles.organizationsTitle}>{data.organizations.title}</h2>
                <p className={styles.organizationsDescription}>
                  {data.organizations.description}
                </p>
              </div>
              
              <div className={styles.organizationsGrid}>
                {/* National Organizations */}
                <div className={styles.organizationCard}>
                  <a href="https://www.nsf.no/faggrupper/urologi" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/nsfs-faggruppe-av-sykepleiere-i-urologi.png" alt="NSFs Faggruppe av Sykepleiere i Urologi" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>NSFs Faggruppe av Sykepleiere i Urologi</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.utfnordic.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/uroterapeutisk-forening.png" alt="Uroterapeutisk Forening" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>Uroterapeutisk Forening</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.nsf.no/faggrupper/stomiomsorg" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/sykepleiere-i-stomiomsorg.jpg" alt="Sykepleiere i Stomiomsorg" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>Sykepleiere i Stomiomsorg</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://fysio.no/kvinnehelse" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/norsk-fysioterapiforbund-faggruppe-for-kvinnehelse.png" alt="Norsk Fysioterapiforbund Faggruppe for Kvinnehelse" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>Norsk Fysioterapiforbund Faggruppe for Kvinnehelse</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://vulva.no/om-oss/om-vulvaforum/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/vulvaforum.svg" alt="Vulvaforum" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>Vulvaforum</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.smertenettverk.no/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/cil_badge.png" alt="Smertenettverk" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>Smertenettverk</span>
                  </a>
                </div>
                
                {/* International Organizations */}
                <div className={styles.organizationCard}>
                  <a href="https://uroweb.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/european-association-of-urology.svg" alt="European Association of Urology" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>European Association of Urology</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.ics.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/international-continence-society.svg" alt="International Continence Society" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>International Continence Society</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.iuga.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/international-urogynecological-association.svg" alt="International Urogynecological Association" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>International Urogynecological Association</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.escp.eu.com/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/european-society-of-coloproctology.png" alt="European Society of Coloproctology" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>European Society of Coloproctology</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.auanet.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/american-urological-association.png" alt="American Urological Association" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>American Urological Association</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://pelvicpain.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/international-pelvic-pain-society.svg" alt="International Pelvic Pain Society" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>International Pelvic Pain Society</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="http://www.painful-bladder.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/cil_badge.png" alt="International Painful Bladder Foundation" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>International Painful Bladder Foundation</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://thepogp.co.uk/default.aspx" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/pelvic-obstetric-and-gynaecological-physiotherapy.png" alt="Pelvic, Obstetric and Gynaecological Physiotherapy (POGP)" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>Pelvic, Obstetric and Gynaecological Physiotherapy (POGP)</span>
                  </a>
                </div>
                
                <div className={styles.organizationCard}>
                  <a href="https://www.issvd.org/" target="_blank" rel="noopener noreferrer" className={styles.organizationLink}>
                    <img src="/logos/the-international-society-for-the-study-of-vulvovaginal-disease.webp" alt="The International Society for the Study of Vulvovaginal Disease (ISSVD)" className={styles.organizationLogo} />
                    <span className={styles.organizationName}>The International Society for the Study of Vulvovaginal Disease (ISSVD)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
