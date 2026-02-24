"use client";

import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import { SectionAccordion } from "../../../components/SectionAccordion";
import styles from "./section-content.module.css";

// Content data structure
type ContentItem =
  | {
    id: string
    type: "section"
    title: string
    description: string
    images?: ReadonlyArray<{
      src: string
      alt: string
      caption: string
    }>
  }
  | {
    id: string
    type: "symptom"
    title: string
    description: string
  }

type SymptomsData = {
  pageTitle: string
  introQuote: string
  introQuoteAuthor: string
  content: ContentItem[]
}

/*
const SYMPTOMS_DATA: Record<'no' | 'en', SymptomsData> = {
  no: {
    pageTitle: "Symptomer",
    introQuote: "Jeg lekker ikke så mye, men det kommer litt og litt. Jeg føler meg aldri ren, jeg føler at jeg lukter.",
    introQuoteAuthor: "Kvinne, 35 år",
    content: [
      {
        id: "what-is-it",
        type: "section" as const,
        title: "Hva er det?",
        description: "Urinlekkasje innebærer enhver ufrivillig vannlating. For mange blir det et sosialt og hygienisk problem. Til tross for at det de siste årene er blitt mer åpenhet rundt problemet, er det fortsatt tabubelagt.\n\nStudier har vist at ca 25% av kvinner over 20 år har ufrivillig vannlating. Prosentandelen øker med alder. Den er lavest hos de yngste hvor man anslår 12% for de under 30 år, og rundt 30% for de mellom 50-54 år. Hos kvinner over 90 år er andelen rundt 40%.\n\nDet rapporteres litt lavere forekomst hos unge menn sammenlignet med kvinner, rundt 5%. Hos eldre menn er forekomsten sammenlignbar med kvinner i samme alder."
      },
      {
        id: "types-intro",
        type: "section" as const,
        title: "Typer urinlekkasje",
        description: "En kan rammes av ulike typer urinlekkasje:",
        images: [
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/toverud_ul_symptomer.png",
            alt: "Tverrsnitt av urinrør",
            caption: "Illustrasjon til venstre: urininkontinens ved overaktiv blære. Illustrasjon til høyre: stressinkontinens."
          }
        ]
      },
      {
        id: "urge",
        type: "symptom" as const,
        title: "Urgeinkontinens/hastverkslekkasje",
        description: "Ufrivilling lekkasje som skjer i forbindelse med plutselig og veldig sterk vannlatingstrang. Blæremuskelaturen trekker seg plutselig sammen og høyt trykk i blæra fører til lekkasje. Dette kalles overaktiv blære (OAB) og er ofte ledsaget av hyppig vannlating."
      },
      {
        id: "stress",
        type: "symptom" as const,
        title: "Stressinkontinens/anstrengelseslekkasje",
        description: "Ufrivillig lekkasje i forbindelse med økt buktrykk som for eksempel ved hosting, nysing eller annen anstrengelse. Lukkemekanismen i urinrøret er for svak."
      },
      {
        id: "mixed",
        type: "symptom" as const,
        title: "Blandingslekkasje",
        description: "En blanding av urge- og stressinkontinens."
      },
      {
        id: "night",
        type: "symptom" as const,
        title: "Nattlig lekkasje",
        description: "Urinlekkasje mens man sover. Nattlig vannlating hvor man våkner pga vannlatingstrang, kalles nokturi."
      },
      {
        id: "overflow",
        type: "symptom" as const,
        title: "Overflow-inkontinens/overløpslekkasje",
        description: "Overfylt blære som gir lekkasje."
      },
      {
        id: "drip",
        type: "symptom" as const,
        title: "Etterdryppslekkasje",
        description: "Lekkasje som oppstår etter endt vannlating. Det er ofte små volum, noen dråper og ikke nødvendigvis merkbar. Hos menn kan en liten mengde urin bli liggende igjen i urinrøret etter vannlating og når man begynner å bevege seg drypper det ut."
      }
    ]
  },
  en: {
    pageTitle: "Symptoms",
    introQuote: "I don't leak that much, but it comes little by little. I never feel clean, I feel like I smell.",
    introQuoteAuthor: "Woman, 35 years old",
    content: [
      {
        id: "what-is-it",
        type: "section" as const,
        title: "What is it?",
        description: "Urinary incontinence involves any involuntary urination. For many, it becomes a social and hygienic problem. Despite increased openness about the issue in recent years, it is still taboo.\n\nStudies have shown that approximately 25% of women over 20 years have involuntary urination. The percentage increases with age. It is lowest among the youngest where it is estimated at 12% for those under 30 years, and around 30% for those between 50-54 years. In women over 90 years, the proportion is around 40%.\n\nA slightly lower prevalence is reported in young men compared to women, around 5%. In older men, the prevalence is comparable to women of the same age."
      },
      {
        id: "types-intro",
        type: "section" as const,
        title: "Types of urinary incontinence",
        description: "One can be affected by different types of urinary incontinence:",
        images: [
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/toverud_ul_symptomer.png",
            alt: "Cross-section of urethra",
            caption: "Left illustration: urinary incontinence with overactive bladder. Right illustration: stress incontinence."
          }
        ]
      },
      {
        id: "urge",
        type: "symptom" as const,
        title: "Urge incontinence",
        description: "Involuntary leakage that occurs in connection with sudden and very strong urge to urinate. The bladder muscle suddenly contracts and high pressure in the bladder leads to leakage. This is called overactive bladder (OAB) and is often accompanied by frequent urination."
      },
      {
        id: "stress",
        type: "symptom" as const,
        title: "Stress incontinence",
        description: "Involuntary leakage in connection with increased abdominal pressure such as coughing, sneezing or other exertion. The closing mechanism in the urethra is too weak."
      },
      {
        id: "mixed",
        type: "symptom" as const,
        title: "Mixed incontinence",
        description: "A mixture of urge and stress incontinence."
      },
      {
        id: "night",
        type: "symptom" as const,
        title: "Nocturnal incontinence",
        description: "Urinary leakage while sleeping. Nighttime urination where one wakes up due to urge to urinate is called nocturia."
      },
      {
        id: "overflow",
        type: "symptom" as const,
        title: "Overflow incontinence",
        description: "Overfilled bladder that causes leakage."
      },
      {
        id: "drip",
        type: "symptom" as const,
        title: "Post-void dribbling",
        description: "Leakage that occurs after urination has ended. It is often small volumes, a few drops and not necessarily noticeable. In men, a small amount of urine may remain in the urethra after urination and when one starts to move it drips out."
      }
    ]
  }
} as const
*/
const SYMPTOMS_DATA: Record<'no' | 'en', SymptomsData> = {
  no: { pageTitle: "Symptomer", introQuote: "", introQuoteAuthor: "", content: [] as ContentItem[] },
  en: { pageTitle: "Symptoms", introQuote: "", introQuoteAuthor: "", content: [] as ContentItem[] }
};

export const Symptoms = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const { pageTitle, introQuote, introQuoteAuthor, content } = SYMPTOMS_DATA[language]

  const renderContent = (item: ContentItem) => {
    if (item.type === "symptom") {
      return (
        <SectionAccordion
          title={item.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>
            {item.description}
          </p>
        </SectionAccordion>
      )
    }

    // For sections with title, use accordion
    if (item.title) {
      return (
        <SectionAccordion
          title={item.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>
            {item.description}
          </p>
          {item.images && (
            <div className={styles.anatomySection}>
              <div className={styles.anatomyGrid}>
                {item.images.map((image) => (
                  <div key={image.src} className={styles.anatomyItem2}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={styles.anatomyImage}
                    />
                    <p className={styles.anatomyCaption}>
                      {image.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionAccordion>
      )
    }

    // For sections without title (should not happen with current data)
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

  return (
    <>
      {/* Introduction Section */}

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img src="/inSymptoms.png" alt="Symptoms" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>{pageTitle}</h2>
        </div>

        {/* Patient Quote */}
        <div className={styles.quoteContainer}>
          <blockquote className={styles.patientQuote}>
            <p className={styles.quoteText}>"{introQuote}"</p>
            <cite className={styles.quoteAuthor}>— {introQuoteAuthor}</cite>
          </blockquote>
        </div>

        <div className={styles.sectionContent}>
          {content.map((item) => (
            <div key={item.id}>
              {renderContent(item)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



