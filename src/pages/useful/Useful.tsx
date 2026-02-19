// /pelvic-react/src/pages/useful/Useful.tsx
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
// Removed featured article components and related imports
import { useLanguage } from "../../context/LanguageContext"
import { Header } from "../../components/Header"
import Footer from "../../components/Footer"
import { PatientEducationCards } from "../../components/PatientEducationCards"
import { TryExerciseSection } from "../../components/try-exercise-section"
import styles from "./Useful.module.css"
// import { VideoPlayer } from "../../components/ui/VideoPlayer"

// Video Modal Component
const VideoModal = ({ isOpen, onClose, videoSrc, title }: {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  title: string
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div 
        className={styles.modalContent} 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.modalHeader}>
          <h3 id="modal-title" className={styles.modalTitle}>{title}</h3>
          <button 
            className={styles.modalCloseButton} 
            onClick={onClose}
            aria-label="Lukk video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className={styles.modalVideoContainer}>
          <iframe
            src={videoSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
            className={styles.modalVideoIframe}
          ></iframe>
        </div>
      </div>
    </div>
  )
}

// Featured article card removed

// Structured bilingual data for Useful page
const USEFUL_DATA = {
  no: {
    title: "Nyttig informasjon",
    subtitle: "Siste nyheter, forskning og ressurser innen bekkenbunnshelse",
    description: "Hold deg oppdatert med de nyeste undersøkelser, forskningsresultater og praktiske rådsene",
    backToHome: "Tilbake til forsiden",
    featuredBadge: "Utvalgt",
    readMore: "Les mer",
    readTime: "min lesing",
    tabs: {
      alle: "Alle",
      forskning: "Forskning",
      behandling: "Behandling",
      pasienthistorier: "Pasienthistorier",
      fagfolk: "For fagfolk",
      ovelse: "Øvelse",
      anatomi: "Anatomi"
    },
    categories: {
      patientStory: "Pasienthistorie",
      technology: "Teknologi",
      lifestyle: "Livsstil",
      treatment: "Behandling",
      research: "Forskning",
      anatomy: "Anatomi"
    },
    articles: {
      selectedArticles: "Utvalgte artikler",
      latestNews: "Siste nyheter",
      noResults: "Ingen artikler funnet. Prøv et annet søkeord eller kategori.",
      loadMore: "Last inn flere artikler"
    },
    featured: {
      title: "Ny forskning: Bekkenbunnsmuskulaturens rolle i urininkontinens",
      description: "En ny studie viser at styrket bekkenbunnsmuskulatur kan redusere urininkontinens med opptil 70% hos kvinner.",
      author: "Dr. Sarah Johnson, Urologisk avdeling"
    },
    patientTestimonials: {
      title: "Pasienthistorier og erfaringer",
      subtitle: "Hør fra andre som har opplevd bekkenbunnsplager",
      intro: "Disse historiene viser at du ikke er alene, og at det finnes hjelp å få. Mange har funnet måter å håndtere sine plager på.",
      pelvicPain: {
        title: "Bekkenbunnssmerter",
        quotes: [
          { text: "Jeg trodde det var normalt å ha smerter, men etter å ha snakket med legen fant jeg ut at det ikke var det.", attribution: "Kvinne, 28 år" },
          { text: "Fysioterapien hjalp meg å forstå kroppen min bedre og reduserte smertene betydelig.", attribution: "Kvinne, 35 år" },
          { text: "Det var vanskelig å snakke om, men å få hjelp var det beste jeg har gjort.", attribution: "Kvinne, 42 år" },
          { text: "Jeg lærte at bekkenbunnssmerter kan behandles, og jeg føler meg mye bedre nå.", attribution: "Kvinne, 31 år" },
          { text: "Det tok tid å finne riktig behandling, men det var verdt det.", attribution: "Kvinne, 38 år" },
          { text: "Jeg forstod ikke hvorfor jeg hadde smerter, men nå vet jeg at det finnes hjelp.", attribution: "Kvinne, 26 år" },
          { text: "Fysioterapeuten lærte meg øvelser som hjalp meg å få kontroll over smertene.", attribution: "Kvinne, 33 år" },
          { text: "Det var skummelt å snakke om, men legen var forståelsesfull og hjelpsom.", attribution: "Kvinne, 29 år" },
          { text: "Jeg trodde jeg måtte leve med smertene, men det gjorde jeg ikke.", attribution: "Kvinne, 36 år" },
          { text: "Som mann var det vanskelig å finne informasjon, men fysioterapi hjalp.", attribution: "Mann, 34 år" },
          { text: "Smertene var ikke bare fysiske – å snakke med fagfolk hjalp.", attribution: "Mann, 41 år" },
          { text: "Jeg gruer meg til å gå på do fordi det alltid gjør vondt. Det kjennes som om noe revner.", attribution: "Mann, 30 år" },
          { text: "Smertene startet etter at jeg fikk fjernet hemoroider.", attribution: "Mann, 45 år" },
          { text: "Jeg føler meg sikker på at det ikke er en alvorlig sykdom som ligger bak smertene, til det har jeg vært nok utredet. Samtidig er det frustrerende å ikke vite hvorfor jeg da har vondt.", attribution: "Mann, 39 år" },
          { text: "Smertestillende medisiner ga effekt i starten, men virker ikke like godt nå lenger.", attribution: "Mann, 58 år" },
          { text: "Det å lære hva jeg skal gjøre for å unngå å spenne meg så fryktelig har vært redningen min.", attribution: "Mann, 41 år" },
          { text: "Jeg har lært meg å kjenne på smertene mine. Jeg har åpnet et lokk hos meg selv som jeg aldri har tillatt meg å åpne før. Før så har smertene bare vært der, men nå setter jeg litt ord på dem framfor å bare gjemme dem bort.", attribution: "Mann, 50 år" },
          { text: "Jeg tror jeg har blitt tøffere i det siste. Jeg tørr å si fra og har fått det bedre med meg selv. Men det har ikke vært så lett å få til å slappe av bare med å tenke det.", attribution: "Mann, 31 år" },
          { text: "Jeg var skeptisk til fysioterapi først, men det gjorde en stor forskjell for smertene mine.", attribution: "Mann, 51 år" }
        ]
      },
      constipation: {
        title: "Forstoppelse",
        quotes: [
          { text: "Jeg lærte at kostholdet mitt hadde mye å si for tarmfunksjonen.", attribution: "Kvinne, 45 år" },
          { text: "Toalettstillingen var viktigere enn jeg trodde.", attribution: "Kvinne, 52 år" },
          { text: "Det hjalp å ha en fast rutine og ikke stresse.", attribution: "Kvinne, 38 år" },
          { text: "Jeg forstod ikke hvorfor jeg hadde problemer, men nå vet jeg bedre.", attribution: "Kvinne, 41 år" },
          { text: "Rutiner og riktig toalettstilling gjorde stor forskjell.", attribution: "Mann, 50 år" },
          { text: "Jeg føler meg aldri helt tømt og må returnere tilbake til do flere ganger i løpet av dagen.", attribution: "Mann, 42 år" }
        ]
      },
      fecalIncontinence: {
        title: "Avføringslekkasje",
        quotes: [
          { text: "Det var vanskelig å snakke om, men å få hjelp var viktig for meg.", attribution: "Kvinne, 48 år" },
          { text: "Å be om hjelp var vanskelig, men det ga meg kontroll tilbake.", attribution: "Mann, 56 år" },
          { text: "Jeg var på hyttetur i påsken sammen med venner. Det er ikke helt enkelt, men jeg planlegger godt og er nøye med kost og rutiner, så går det greit. Det blir for kjedelig å sitte hjemme hele tiden.", attribution: "Mann, 30 år" }
        ]
      },
      urinaryIncontinence: {
        title: "Urinlekkasje",
        quotes: [
          { text: "Jeg føler meg ikke lenger like mandig som før. Det gjør noe med en å måtte gå med bleier.", attribution: "Mann, 63 år" },
          { text: "Etter prostataoperasjonen hadde jeg lekkasjeproblemer, men bekkenbunnsøvelsene hjalp meg å få kontroll igjen.", attribution: "Mann, 58 år" },
          { text: "Jeg trodde ikke menn kunne ha bekkenbunnsplager, men fysioterapeuten hjalp meg med øvelser som fungerte.", attribution: "Mann, 45 år" },
          { text: "Bekkenbunnstreningen etter operasjonen var avgjørende for å gjenvinne kontrollen.", attribution: "Mann, 62 år" }
        ]
      },
      urinaryRetention: {
        title: "Urinretensjon",
        quotes: [
          { text: "Jeg lærte at det finnes forskjellige måter å håndtere dette på.", attribution: "Kvinne, 55 år" },
          { text: "Det hjalp å forstå at jeg ikke var alene med dette problemet.", attribution: "Kvinne, 62 år" },
          { text: "Blæretrening og gode vaner hjalp meg mye.", attribution: "Mann, 62 år" },
          { text: "Når jeg tisser er strålen veldig svak og det stopper ofte opp underveis. Jeg unngår offentlige toalett hvor andre kan høre at jeg tisser.", attribution: "Mann, 29 år" }
        ]
      },
      toiletPosition: {
        title: "Riktig toalettstilling",
        intro: "Korrekt stilling på toalettet kan gjøre stor forskjell for tarmfunksjonen.",
        men: {
          title: "For menn",
          tips: [
            "Sitt med knærne høyere enn hoften",
            "Len deg fremover og hvil albuene på knærne",
            "Unngå å stresse eller presse for hardt",
            "Bruk god tid på toalettet"
          ]
        },
        women: {
          title: "For kvinner",
          tips: [
            "Sitt med knærne høyere enn hoften",
            "Len deg fremover og hvil albuene på knærne",
            "Unngå å stresse eller presse for hardt",
            "Bruk god tid på toalettet"
          ]
        }
      }
    },
    anatomy: {
      title: "Anatomi",
      subtitle: "Lær om bekkenbunnens anatomi og funksjon",
      overview: {
        title: "Bekkenbunnens anatomi og funksjon",
        description: "Bekkenbunnen er en kompleks struktur som spiller en viktig rolle i urinering, avføring og seksualitet.",
        videoTitle: "Bekkenbunnens anatomi - Instruksjonsvideo",
        pelvicFloorTitle: "Bekkenbunnsmuskulatur",
        pelvicFloorDesc: "Bekkenbunnsmuskulaturen støtter organene i bekkenet og bidrar til kontroll over urinering og avføring.",
        bladderTitle: "Urinblære",
        bladderDesc: "Urinblæren lagrer urin og tømmes når den er full. Bekkenbunnsmuskulaturen hjelper til med å holde urinen inne.",
        bowelTitle: "Tarm",
        bowelDesc: "Tarmen er ansvarlig for fordøyelse og avføring. Bekkenbunnen bidrar til kontroll over avføring."
      }
    },
    patientEducation: {
      title: "Pasientundervisning",
      subtitle: "Her finner du filmer, lydfiler og brosjyrer",
      description: "Utforsk våre pedagogiske ressurser for å lære mer om bekkenbunnshelse og behandlingsmetoder.",
      resources: "Læringsressurser"
    }
  },
  en: {
    title: "Useful information",
    subtitle: "Latest news, research and resources in pelvic floor health",
    description: "Stay updated with the latest studies, research results and practical advice",
    backToHome: "Back to home",
    featuredBadge: "Featured",
    readMore: "Read more",
    readTime: "min read",
    tabs: {
      alle: "All",
      forskning: "Research",
      behandling: "Treatment",
      livsstil: "Lifestyle",
      teknologi: "Technology",
      pasienthistorier: "Patient stories",
      fagfolk: "For professionals",
      ovelse: "Exercise",
      anatomi: "Anatomy"
    },
    categories: {
      patientStory: "Patient story",
      technology: "Technology",
      lifestyle: "Lifestyle",
      treatment: "Treatment",
      research: "Research",
      anatomy: "Anatomy"
    },
    articles: {
      selectedArticles: "Selected articles",
      latestNews: "Latest news",
      noResults: "No articles found. Try a different search term or category.",
      loadMore: "Load more articles"
    },
    featured: {
      title: "New research: The role of pelvic floor muscles in urinary incontinence",
      description: "A new study shows that strengthened pelvic floor muscles can reduce urinary incontinence by up to 70% in women.",
      author: "Dr. Sarah Johnson, Urology Department"
    },
    patientTestimonials: {
      title: "Patient stories and experiences",
      subtitle: "Hear from others who have experienced pelvic floor problems",
      intro: "These stories show that you are not alone, and that help is available. Many have found ways to manage their problems.",
      pelvicPain: {
        title: "Pelvic pain",
        quotes: [
          { text: "I thought it was normal to have pain, but after talking to the doctor I found out it wasn't.", attribution: "Woman, 28 years old" },
          { text: "Physiotherapy helped me understand my body better and significantly reduced the pain.", attribution: "Woman, 35 years old" },
          { text: "It was difficult to talk about, but getting help was the best thing I did.", attribution: "Woman, 42 years old" },
          { text: "I learned that pelvic pain can be treated, and I feel much better now.", attribution: "Woman, 31 years old" },
          { text: "It took time to find the right treatment, but it was worth it.", attribution: "Woman, 38 years old" },
          { text: "I didn't understand why I had pain, but now I know help is available.", attribution: "Woman, 26 years old" },
          { text: "The physiotherapist taught me exercises that helped me gain control over the pain.", attribution: "Woman, 33 years old" },
          { text: "It was scary to talk about, but the doctor was understanding and helpful.", attribution: "Woman, 29 years old" },
          { text: "I thought I had to live with the pain, but I didn't.", attribution: "Woman, 36 years old" },
          { text: "As a man, finding the right information was hard, but physio helped.", attribution: "Man, 34 years old" },
          { text: "The pain wasn't just physical — talking to professionals helped.", attribution: "Man, 41 years old" },
          { text: "I dread going to the bathroom because it always hurts. It feels like something is tearing.", attribution: "Man, 30 years old" },
          { text: "The pain started after I had hemorrhoids removed.", attribution: "Man, 45 years old" },
          { text: "I feel confident that it's not a serious illness causing the pain, I've been examined enough. At the same time, it's frustrating not knowing why I'm in pain.", attribution: "Man, 39 years old" },
          { text: "Pain medications were effective at first, but don't work as well anymore.", attribution: "Man, 58 years old" },
          { text: "Learning what I need to do to avoid tensing up so terribly has been my salvation.", attribution: "Man, 41 years old" },
          { text: "I have learned to acknowledge my pain. I have opened a lid in myself that I have never allowed myself to open before. Before, the pain was just there, but now I put words to it instead of just hiding it away.", attribution: "Man, 50 years old" },
          { text: "I think I have become tougher lately. I dare to speak up and have gotten better with myself. But it hasn't been so easy to relax just by thinking about it.", attribution: "Man, 31 years old" },
          { text: "I was skeptical about physiotherapy at first, but it made a big difference for my pain.", attribution: "Man, 51 years old" }
        ]
      },
      constipation: {
        title: "Constipation",
        quotes: [
          { text: "I learned that my diet had a lot to say about bowel function.", attribution: "Woman, 45 years old" },
          { text: "Toilet position was more important than I thought.", attribution: "Woman, 52 years old" },
          { text: "It helped to have a regular routine and not stress.", attribution: "Woman, 38 years old" },
          { text: "I didn't understand why I had problems, but now I know better.", attribution: "Woman, 41 years old" },
          { text: "Routine and proper toilet posture made a big difference.", attribution: "Man, 50 years old" },
          { text: "I never feel completely emptied and have to return to the toilet several times during the day.", attribution: "Man, 42 years old" }
        ]
      },
      fecalIncontinence: {
        title: "Fecal incontinence",
        quotes: [
          { text: "It was difficult to talk about, but getting help was important to me.", attribution: "Woman, 48 years old" },
          { text: "Asking for help was hard, but it gave me back control.", attribution: "Man, 56 years old" },
          { text: "I was on a cabin trip at Easter with friends. It's not entirely easy, but I plan well and am careful with diet and routines, so it goes well. It gets too boring to sit at home all the time.", attribution: "Man, 30 years old" }
        ]
      },
      urinaryIncontinence: {
        title: "Urinary incontinence",
        quotes: [
          { text: "I no longer feel as manly as before. Having to wear diapers does something to you.", attribution: "Man, 63 years old" },
          { text: "After prostate surgery I had leakage problems, but pelvic floor exercises helped me regain control.", attribution: "Man, 58 years old" },
          { text: "I didn't think men could have pelvic floor problems, but the physiotherapist helped me with exercises that worked.", attribution: "Man, 45 years old" },
          { text: "Pelvic floor training after surgery was crucial for regaining control.", attribution: "Man, 62 years old" }
        ]
      },
      urinaryRetention: {
        title: "Urinary retention",
        quotes: [
          { text: "I learned that there are different ways to handle this.", attribution: "Woman, 55 years old" },
          { text: "It helped to understand that I wasn't alone with this problem.", attribution: "Woman, 62 years old" },
          { text: "Bladder training and good habits helped a lot.", attribution: "Man, 62 years old" },
          { text: "When I urinate the stream is very weak and it often stops along the way. I avoid public toilets where others can hear me urinating.", attribution: "Man, 29 years old" }
        ]
      },
      toiletPosition: {
        title: "Correct toilet position",
        intro: "Correct position on the toilet can make a big difference for bowel function.",
        men: {
          title: "For men",
          tips: [
            "Sit with knees higher than hips",
            "Lean forward and rest elbows on knees",
            "Avoid straining or pushing too hard",
            "Take your time on the toilet"
          ]
        },
        women: {
          title: "For women",
          tips: [
            "Sit with knees higher than hips",
            "Lean forward and rest elbows on knees",
            "Avoid straining or pushing too hard",
            "Take your time on the toilet"
          ]
        }
      }
    },
    anatomy: {
      title: "Anatomy",
      subtitle: "Learn about pelvic floor anatomy and function",
      overview: {
        title: "Pelvic floor anatomy and function",
        description: "The pelvic floor is a complex structure that plays an important role in urination, defecation, and sexuality.",
        videoTitle: "Pelvic floor anatomy - Instructional video",
        pelvicFloorTitle: "Pelvic floor muscles",
        pelvicFloorDesc: "The pelvic floor muscles support the pelvic organs and contribute to control over urination and defecation.",
        bladderTitle: "Bladder",
        bladderDesc: "The bladder stores urine and empties when full. The pelvic floor muscles help keep urine in.",
        bowelTitle: "Bowel",
        bowelDesc: "The bowel is responsible for digestion and defecation. The pelvic floor contributes to bowel control."
      }
    },
    patientEducation: {
      title: "Patient education",
      subtitle: "Here you will find films, audio files and brochures",
      description: "Explore our educational resources to learn more about pelvic floor health and treatment methods.",
      resources: "Learning resources"
    }
  }
} as const

export const Useful = () => {
  const { language } = useLanguage()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState("pasienthistorier")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState({ src: "", title: "" })
  
  const data = USEFUL_DATA[language]

  const openVideoModal = (videoSrc: string, title: string) => {
    setSelectedVideo({ src: videoSrc, title })
    setModalOpen(true)
  }

  const closeVideoModal = () => {
    setModalOpen(false)
    setSelectedVideo({ src: "", title: "" })
  }

  // Check for tab parameter in URL on component mount
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['pasienthistorier', 'pasientundervisning', 'ovelse'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])


  const tabs = [
    { id: "pasienthistorier", label: data.tabs.pasienthistorier },
    { id: "pasientundervisning", label: "Pasientundervisning" },
    { id: "ovelse", label: "Øvelse" }
  ]

  // Featured article (top section)
  // Featured article removed


  // Filter helpers

  const tabMatches = (category: string) => category === activeTab


  const showFeatured = false

  
  return (
    <>
    <Header />
    <div className={styles.container}>
      

      <main id="main-content" role="main" className={styles.main}>
        

        {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1 className={styles.heroTitle}>{data.title}</h1>
          </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList} role="tablist" aria-label={data.title}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel for current tab */}
        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {/* Selected Articles Section - Conditional based on tab */}
          {/* Removed Alle and Forskning sections */}

        {/* Patient Testimonials Section - Show when pasienthistorier tab is selected */}
        {activeTab === "pasienthistorier" && (
          <div className={styles.contentSections}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <img src="/majesticons_note-text-line.png" alt="patient stories" style={{width:'24px', height:'24px'}} className={styles.sectionIconImage} />
              </div>
              <h2 className={styles.sectionTitle}>{data.patientTestimonials.title}</h2>
            </div>
            
            {/* Hero video: autoplay muted with controls, full width, no background */}
            <div className={styles.videoSection}>
              <div className={`${styles.videoContainer} ${styles.heroVideoContainer}`}>
                <iframe
                  src="https://player.vimeo.com/video/367327819?autoplay=1&muted=1&autopause=0&loop=0&title=1&portrait=1&byline=1"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={language === "no" ? "Pasienthistorie" : "Patient story"}
                  className={styles.videoIframe}
                ></iframe>
              </div>
            </div>

            {/* Restore two original videos under the main one */}
            <div className={styles.videoGrid}>
              <div className={styles.videoCard}>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://player.vimeo.com/video/367328676"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Vimeo pasienthistorie"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
                <h4 className={styles.videoCardTitle}>{language === "no" ? "Pasienthistorie (Vimeo)" : "Patient story (Vimeo)"}</h4>
                <p className={styles.videoCardDescription}>{language === "no" ? "Klikk for å styre lyd og avspilling." : "Click to control sound and playback."}</p>
              </div>

            </div>
            
            <div className={styles.testimonialsIntro}>
              <p className={styles.testimonialsSubtitle}>{data.patientTestimonials.subtitle}</p>
              <p className={styles.testimonialsDescription}>{data.patientTestimonials.intro}</p>
            </div>

            {/* Pelvic Pain Testimonials */}
            <div className={styles.testimonialsSection}>
              <h3 className={styles.testimonialsConditionTitle}>{data.patientTestimonials.pelvicPain.title}</h3>
              <div className={styles.testimonialsGrid}>
                {data.patientTestimonials.pelvicPain.quotes.map((quote, index) => (
                  <div key={index} className={styles.testimonialCard}>
                    <p className={styles.testimonialQuote}>"{quote.text}"</p>
                    <p className={styles.testimonialAttribution}>— {quote.attribution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Constipation Testimonials */}
            <div className={styles.testimonialsSection}>
              <h3 className={styles.testimonialsConditionTitle}>{data.patientTestimonials.constipation.title}</h3>
              <div className={styles.testimonialsGrid}>
                {data.patientTestimonials.constipation.quotes.map((quote, index) => (
                  <div key={index} className={styles.testimonialCard}>
                    <p className={styles.testimonialQuote}>"{quote.text}"</p>
                    <p className={styles.testimonialAttribution}>— {quote.attribution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fecal Incontinence Testimonials */}
            <div className={styles.testimonialsSection}>
              <h3 className={styles.testimonialsConditionTitle}>{data.patientTestimonials.fecalIncontinence.title}</h3>
              <div className={styles.testimonialsGrid}>
                {data.patientTestimonials.fecalIncontinence.quotes.map((quote, index) => (
                  <div key={index} className={styles.testimonialCard}>
                    <p className={styles.testimonialQuote}>"{quote.text}"</p>
                    <p className={styles.testimonialAttribution}>— {quote.attribution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urinary Retention Testimonials */}
            <div className={styles.testimonialsSection}>
              <h3 className={styles.testimonialsConditionTitle}>{data.patientTestimonials.urinaryRetention.title}</h3>
              <div className={styles.testimonialsGrid}>
                {data.patientTestimonials.urinaryRetention.quotes.map((quote, index) => (
                  <div key={index} className={styles.testimonialCard}>
                    <p className={styles.testimonialQuote}>"{quote.text}"</p>
                    <p className={styles.testimonialAttribution}>— {quote.attribution}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Pasientundervisning Section - Show when pasientundervisning tab is selected */}
        {activeTab === "pasientundervisning" && (
          <div className={styles.contentSections}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <img src="/majesticons_note-text-line.png" alt="patient education" style={{width:'24px', height:'24px'}} className={styles.sectionIconImage} />
              </div>
              <h2 className={styles.sectionTitle}>Pasientundervisning</h2>
            </div>
            
            <div className={styles.testimonialsIntro}>
              <p className={styles.testimonialsSubtitle}>{data.patientEducation.subtitle}</p>
              <p className={styles.testimonialsDescription}>{data.patientEducation.description}</p>
            </div>

            {/* Educational Resources - Interactive Cards */}
            <div className={styles.anatomyConditionsSection}>
              <h3 className={styles.testimonialsConditionTitle}>{data.patientEducation.resources}</h3>
              <PatientEducationCards />
            </div>
          </div>
        )}

        {/* Øvelse Section - Show when ovelse tab is selected */}
        {activeTab === "ovelse" && (
          <div className={styles.contentSections}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Øvelse</h2>
            </div>


            {/* Videos from Bekkenbunnstrening – same design as Pasientundervisning */}
            <div className={styles.videoGrid}>
              <div className={styles.videoCard}>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://player.vimeo.com/video/65880144"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Bekkenbunnstrening (Vimeo)"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
                <h4 className={styles.videoCardTitle}>
                  {language === 'no' ? 'Bekkenbunnstrening' : 'Pelvic Floor Training'}
                </h4>
                <p className={styles.videoCardDescription}>
                  {language === 'no' 
                    ? 'Utviklet av Nasjonal kompetansetjeneste for Inkontinens og bekkenbunnsykdom' 
                    : 'Developed by the National Advisory Unit on Incontinence and Pelvic Floor Disorders'}
                </p>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://www.youtube.com/embed/JdIGtPzNbhg"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Menn Del 1 – Introduksjon"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
                <h4 className={styles.videoCardTitle}>Menn Del 1 – Introduksjon</h4>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://www.youtube.com/embed/NraqaXqgIuk"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Menn Del 2 – I stol"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
                <h4 className={styles.videoCardTitle}>Menn Del 2 – I stol</h4>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://www.youtube.com/embed/QTbpFku1pcM"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Menn Del 3 – Froskestilling"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
                <h4 className={styles.videoCardTitle}>Menn Del 3 – Froskestilling</h4>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://www.youtube.com/embed/mHwQzQGPp6U"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Menn Del 4 – Stående og liggende"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
                <h4 className={styles.videoCardTitle}>Menn Del 4 – Stående og liggende</h4>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://www.youtube.com/embed/ZTMpEr6GLp8"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Etter svangerskap og fødsel"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
                <h4 className={styles.videoCardTitle}>Etter svangerskap og fødsel</h4>
              </div>
            </div>
          </div>
        )}



        {/* No Results Message */}
        {(!showFeatured && activeTab !== "pasienthistorier" && activeTab !== "pasientundervisning") && (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>
              {data.articles.noResults}
            </p>
          </div>
        )}
        </div>
      </main>

      <Footer />
    </div>
    
    {/* Video Modal */}
    <VideoModal 
      isOpen={modalOpen}
      onClose={closeVideoModal}
      videoSrc={selectedVideo.src}
      title={selectedVideo.title}
    />
    </>
  )
}

