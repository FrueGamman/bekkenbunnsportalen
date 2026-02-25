"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";

const INTRODUCTION_DATA = {
  no: {
    description: "På disse sidene finner du informasjon om tømmingsproblemer for urin, urinretensjon. Her er informasjon om normal funksjon av vannlatingen, symptomer på tømmingsproblemer, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet.",
    keyPoints: [
      "Lær om ulike diagnostiske undersøkelser",
      "Forstå hvordan resturinmåling fungerer",
      "Få innsikt i flowmetri og andre tester",
      "Utforsk når spesialistutredning er nødvendig"
    ],
    image: {
      src: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Utredning av urinretensjon",
      caption: "Oversikt over diagnostiske prosedyrer"
    }
  },
  en: {
    description: "On these pages you will find information about urinary emptying problems, urinary retention. Here is information about normal urination function, symptoms of emptying problems, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected.",
    keyPoints: [
      "Learn about various diagnostic examinations",
      "Understand how residual urine measurement works",
      "Gain insight into flowmetry and other tests",
      "Explore when specialist examination is necessary"
    ],
    image: {
      src: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Diagnosis of urinary retention",
      caption: "Overview of diagnostic procedures"
    }
  }
} as const;

interface DiagnosisLink {
  text: string;
  url: string;
}

interface DiagnosisImage {
  src: string;
  alt: string;
}

interface DiagnosisSection {
  id: string;
  title: string;
  content: string;
  hasLinks?: boolean;
  links?: DiagnosisLink[];
  hasImage?: boolean;
  image?: DiagnosisImage;
}

interface DiagnosisContent {
  pageTitle: string;
  patientQuote: string;
  patientAge: string;
  sections: DiagnosisSection[];
}

type SupportedLanguage = "no" | "en";

const DIAGNOSIS_DATA: Record<SupportedLanguage, DiagnosisContent> = {
  no: {
    pageTitle: "Utredning",
    patientQuote: "Jeg kjenner ikke så mye til vannlatingstrangen, men bruker alarm på telefonen som påminnelse.",
    patientAge: "Mann, 36 år",
    sections: [
      {
        id: "residual_urine",
        title: "Resturinmåling",
        content: "Måle mengde urin som er igjen etter vannlating med normal følelse av vannlatingstrang. Dette kan måles ved hjelp av ultralydapparat eller blærescanner hvor en ved hjelp av en probe og gele måler over magen. En kan også måle ved å tømme blæren med et engangskateter etter vannlatingen."
      },
      {
        id: "flowmetry",
        title: "Flowmetri",
        content: "Måling av urinstrømmen. Dette gjøres ved at en later vannet på et spesialtoalett hvor man registrerer mengde urin og hastigheten på strålen."
      },
      {
        id: "diary",
        title: "Drikke- og vannlatingsdagbok",
        content: "Under utredning av de fleste vannlatingsplager er det nesten alltid nødvendig å kartlegge hvordan vannlatingen fungerer i det daglige og dermed viktig at dette blir registrert hjemme.",
        hasLinks: true,
        links: [
          {
            text: "Vannlatingsdagbok (pdf-fil)",
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2022/01/vanlatingsbok.pdf"
          },
          {
            text: "App til registrering utviklet av Wellspect Healthcare",
            url: "http://www.wellspect.no/blare/en-god-start-med-rik/finn-din-egen-rutine/lofric-miksjonsapp"
          },
          {
            text: "App til registrering utviklet av Coloplast",
            url: "https://blaeren.no/et-godt-samtalegrunnlag"
          }
        ],
        hasImage: true,
        image: {
          src: "/atHome.jpg",
          alt: "Female Pelvic Anatomy"
        }
      },
      {
        id: "urodynamic",
        title: "Urodynamisk undersøkelse",
        content: "Ved hjelp av trykksensorer på katetre måles det hvordan blæren arbeider under fylning og tømming samt registrering av urinstrømmen ved vannlating."
      }
    ]
  },
  en: {
    pageTitle: "Diagnosis",
    patientQuote: "I don't feel the urge to urinate much, but I use an alarm on my phone as a reminder.",
    patientAge: "Man, 36 years",
    sections: [
      {
        id: "residual_urine",
        title: "Residual urine measurement",
        content: "Measure the amount of urine remaining after urination with normal sensation of urge to urinate. This can be measured using ultrasound equipment or bladder scanner where one uses a probe and gel to measure over the abdomen. One can also measure by emptying the bladder with a disposable catheter after urination."
      },
      {
        id: "flowmetry",
        title: "Flowmetry",
        content: "Measurement of urine flow. This is done by urinating on a special toilet where the amount of urine and the speed of the stream is recorded."
      },
      {
        id: "diary",
        title: "Drinking and urination diary",
        content: "During assessment of most urination problems, it's almost always necessary to map how urination functions in daily life and thus important that this is recorded at home.",
        hasLinks: true,
        links: [
          {
            text: "Urination diary (pdf file)",
            url: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2022/01/vanlatingsbok.pdf"
          },
          {
            text: "Registration app developed by Wellspect Healthcare",
            url: "http://www.wellspect.no/blare/en-god-start-med-rik/finn-din-egen-rutine/lofric-miksjonsapp"
          },
          {
            text: "Registration app developed by Coloplast",
            url: "https://blaeren.no/et-godt-samtalegrunnlag"
          }
        ],
        hasImage: true,
        image: {
          src: "/atHome.jpg",
          alt: "Female Pelvic Anatomy"
        }
      },
      {
        id: "urodynamic",
        title: "Urodynamic examination",
        content: "Using pressure sensors on catheters, how the bladder works during filling and emptying is measured along with recording of urine flow during urination."
      }
    ]
  }
}

export const Diagnosis = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  // const introduction = INTRODUCTION_DATA[language];

  const { pageTitle, patientQuote, patientAge, sections } = DIAGNOSIS_DATA[language];

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/solae.png" alt="Diagnosis" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {pageTitle}
        </h2>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.highlightBox}>
          <p>
            {patientQuote}
          </p>
          <p className={styles.quoteAuthor}>
            {patientAge}
          </p>
        </div>

        {sections.map((diagnosis) => (
          <SectionAccordion 
            key={diagnosis.id}
            title={diagnosis.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {diagnosis.content}
            </p>
            
            {/* Horizontal layout for links and image */}
            {(diagnosis.hasLinks || diagnosis.hasImage) && (
              <div className={styles.anatomyGrid}>
                {diagnosis.hasLinks && (
                  <div>
                    <ul className={styles.diagnosisList}>
                      {diagnosis.links?.map((link) => (
                        <li key={link.url}>
                          <a
                            className={styles.resourceLink}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {diagnosis.hasImage && (
                  <div className={styles.anatomyItem}>
                    <img 
                      src={diagnosis.image?.src} 
                      alt={diagnosis.image?.alt} 
                      className={styles.anatomyImage} 
                    />
                  </div>
                )}
              </div>
            )}
          </SectionAccordion>
        ))}
      </div>
    </div>
    </>
  );
};