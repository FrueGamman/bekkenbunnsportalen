import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import styles from "./testimonial-section.module.css"

// Testimonial data from useful page content
const TESTIMONIAL_DATA = {
  no: {
    title: "Pasienthistorier og erfaringer",
    subtitle: "Hør fra andre som har opplevd bekkenbunnsplager",
    intro: "Disse historiene viser at du ikke er alene, og at det finnes hjelp å få. Mange har funnet måter å håndtere sine plager på.",
    viewMore: "Se flere historier",
    viewMoreLink: "/useful?tab=pasienthistorier",
    testimonials: [
      { text: "Jeg trodde det var normalt å ha smerter, men etter å ha snakket med legen fant jeg ut at det ikke var det.", attribution: "Kvinne, 28 år" },
      { text: "Fysioterapien hjalp meg å forstå kroppen min bedre og reduserte smertene betydelig.", attribution: "Kvinne, 35 år" },
      { text: "Det var vanskelig å snakke om, men å få hjelp var det beste jeg har gjort.", attribution: "Kvinne, 42 år" },
      { text: "Etter prostataoperasjonen hadde jeg lekkasjeproblemer, men bekkenbunnsøvelsene hjalp meg å få kontroll igjen.", attribution: "Mann, 58 år" },
      { text: "Jeg lærte at bekkenbunnssmerter kan behandles, og jeg føler meg mye bedre nå.", attribution: "Kvinne, 31 år" },
      { text: "Det tok tid å finne riktig behandling, men det var verdt det.", attribution: "Kvinne, 38 år" },
      { text: "Jeg trodde ikke menn kunne ha bekkenbunnsplager, men fysioterapeuten hjalp meg med øvelser som fungerte.", attribution: "Mann, 45 år" },
      { text: "Jeg forstod ikke hvorfor jeg hadde smerter, men nå vet jeg at det finnes hjelp.", attribution: "Kvinne, 26 år" },
      { text: "Fysioterapeuten lærte meg øvelser som hjalp meg å få kontroll over smertene.", attribution: "Kvinne, 33 år" },
      { text: "Det var skummelt å snakke om, men legen var forståelsesfull og hjelpsom.", attribution: "Kvinne, 29 år" },
      { text: "Jeg lærte at kostholdet mitt hadde mye å si for tarmfunksjonen.", attribution: "Kvinne, 45 år" },
      { text: "Bekkenbunnstreningen etter operasjonen var avgjørende for å gjenvinne kontrollen.", attribution: "Mann, 62 år" },
      { text: "Toalettstillingen var viktigere enn jeg trodde.", attribution: "Kvinne, 52 år" },
      { text: "Jeg var skeptisk til fysioterapi først, men det gjorde en stor forskjell for smertene mine.", attribution: "Mann, 51 år" },
      { text: "Jeg føler meg ikke lenger like mandig som før. Det gjør noe med en å måtte gå med bleier.", attribution: "Mann, 63 år" },
      { text: "Som mann var det vanskelig å finne informasjon, men fysioterapi hjalp.", attribution: "Mann, 34 år" },
      { text: "Det å lære hva jeg skal gjøre for å unngå å spenne meg så fryktelig har vært redningen min.", attribution: "Mann, 41 år" },
      { text: "Jeg var på hyttetur i påsken sammen med venner. Det er ikke helt enkelt, men jeg planlegger godt og er nøye med kost og rutiner, så går det greit.", attribution: "Mann, 30 år" },
      { text: "Rutiner og riktig toalettstilling gjorde stor forskjell.", attribution: "Mann, 50 år" },
      { text: "Jeg føler meg aldri helt tømt og må returnere tilbake til do flere ganger i løpet av dagen.", attribution: "Mann, 42 år" }
    ]
  },
  en: {
    title: "Patient stories and experiences",
    subtitle: "Hear from others who have experienced pelvic floor problems",
    intro: "These stories show that you are not alone, and that help is available. Many have found ways to manage their problems.",
    viewMore: "View more stories",
    viewMoreLink: "/useful?tab=pasienthistorier",
    testimonials: [
      { text: "I thought it was normal to have pain, but after talking to the doctor I found out it wasn't.", attribution: "Woman, 28 years old" },
      { text: "Physiotherapy helped me understand my body better and significantly reduced the pain.", attribution: "Woman, 35 years old" },
      { text: "It was difficult to talk about, but getting help was the best thing I did.", attribution: "Woman, 42 years old" },
      { text: "After prostate surgery I had leakage problems, but pelvic floor exercises helped me regain control.", attribution: "Man, 58 years old" },
      { text: "I learned that pelvic pain can be treated, and I feel much better now.", attribution: "Woman, 31 years old" },
      { text: "It took time to find the right treatment, but it was worth it.", attribution: "Woman, 38 years old" },
      { text: "I didn't think men could have pelvic floor problems, but the physiotherapist helped me with exercises that worked.", attribution: "Man, 45 years old" },
      { text: "I didn't understand why I had pain, but now I know help is available.", attribution: "Woman, 26 years old" },
      { text: "The physiotherapist taught me exercises that helped me gain control over the pain.", attribution: "Woman, 33 years old" },
      { text: "It was scary to talk about, but the doctor was understanding and helpful.", attribution: "Woman, 29 years old" },
      { text: "I learned that my diet had a lot to say about bowel function.", attribution: "Woman, 45 years old" },
      { text: "Pelvic floor training after surgery was crucial for regaining control.", attribution: "Man, 62 years old" },
      { text: "Toilet position was more important than I thought.", attribution: "Woman, 52 years old" },
      { text: "I was skeptical about physiotherapy at first, but it made a big difference for my pain.", attribution: "Man, 51 years old" },
      { text: "I no longer feel as manly as before. Having to wear diapers does something to you.", attribution: "Man, 63 years old" },
      { text: "As a man, finding the right information was hard, but physio helped.", attribution: "Man, 34 years old" },
      { text: "Learning what I need to do to avoid tensing up so terribly has been my salvation.", attribution: "Man, 41 years old" },
      { text: "I was on a cabin trip at Easter with friends. It's not entirely easy, but I plan well and am careful with diet and routines, so it goes well.", attribution: "Man, 30 years old" },
      { text: "Routine and proper toilet posture made a big difference.", attribution: "Man, 50 years old" },
      { text: "I never feel completely emptied and have to return to the toilet several times during the day.", attribution: "Man, 42 years old" }
    ]
  }
} as const

interface TestimonialSectionProps {
  overVideo?: boolean;
  cmsData?: {
    title: string;
    subtitle: string;
    intro: string;
    testimonials: {
      text: string;
      attribution: string;
    }[];
  };
}

export const TestimonialSection = ({ overVideo = false, cmsData }: TestimonialSectionProps) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const staticData = TESTIMONIAL_DATA[language]
  const isDarkMode = resolvedTheme === 'dark'

  const title = cmsData?.title || staticData.title
  const subtitle = cmsData?.subtitle || staticData.subtitle
  const intro = cmsData?.intro || staticData.intro
  const testimonials = cmsData?.testimonials && cmsData.testimonials.length > 0
    ? cmsData.testimonials
    : staticData.testimonials

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Reveal header and content on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) setHeaderVisible(true)
            if (entry.target === contentRef.current) setContentVisible(true)
          }
        })
      },
      { root: null, threshold: 0.2 }
    )

    if (headerRef.current) observer.observe(headerRef.current)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [])

  const handleViewMore = () => {
    navigate(staticData.viewMoreLink)
  }

  return (
    <section className={`${styles.testimonialSection} ${overVideo ? styles.overVideo : ''} ${isDarkMode ? styles.dark : styles.light}`}>
      {/* Background now provided by BackgroundVideoGroup wrapper */}

      <div className={styles.container}>
        {/* Header at the top center */}
        <div
          ref={headerRef}
          className={`${styles.sectionHeader} ${headerVisible ? styles.revealVisible : styles.revealHidden}`}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.intro}>{intro}</p>
        </div>

        <div
          ref={contentRef}
          className={`${styles.content} ${contentVisible ? styles.revealVisible : styles.revealHidden}`}
        >
          {/* Left side - Testimonials */}
          <div className={styles.testimonialsContainer}>

            <div className={styles.testimonialSlider}>
              <div
                key={currentTestimonial}
                className={styles.testimonialCard}
              >
                <div className={styles.quoteIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor" />
                  </svg>
                </div>
                <blockquote className={styles.testimonialQuote}>
                  "{testimonials[currentTestimonial]?.text}"
                </blockquote>
                <cite className={styles.testimonialAttribution}>
                  — {testimonials[currentTestimonial]?.attribution}
                </cite>
              </div>

              {/* Navigation dots */}
              <div className={styles.testimonialDots}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentTestimonial ? styles.dotActive : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* View more button */}
              <button
                className={styles.viewMoreButton}
                onClick={handleViewMore}
              >
                {staticData.viewMore}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
