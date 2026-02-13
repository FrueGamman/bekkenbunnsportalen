"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";


/*
const INTRODUCTION_DATA = {
  no: {
    description: "På disse sidene finner du informasjon om tømmingsproblemer for urin, urinretensjon. Her er informasjon om normal funksjon av vannlatingen, symptomer på tømmingsproblemer, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet.",
    keyPoints: [
      "Lær om urinveienes oppbygging og funksjon",
      "Forstå normal vannlating og hva som kan gå galt",
      "Få innsikt i symptomer og årsaker til urinretensjon",
      "Utforsk behandlingsalternativer og håndtering"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Urinveienes oppbygging og funksjon",
      caption: "Oversikt over urinveienes oppbygging"
    }
  },
  en: {
    description: "On these pages you will find information about urinary emptying problems, urinary retention. Here is information about normal urination function, symptoms of emptying problems, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected.",
    keyPoints: [
      "Learn about the structure and function of the urinary tract",
      "Understand normal urination and what can go wrong",
      "Gain insight into symptoms and causes of urinary retention",
      "Explore treatment options and management"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Urinary tract structure and function",
      caption: "Overview of urinary tract structure"
    }
  }
} as const;

const NORMAL_FUNCTIONS_DATA = {
  no: {
    pageTitle: "Funksjon",
    sections: [
      {
        id: "structure",
        title: "Urinveienes oppbygging",
        content: "Urinveiene består av nyrene, urinlederne, urinblære og urinrøret. Nyrene produserer urin, urinlederne leder urinen til blæren. Normalt skal vannlating skje viljestyrt. Det vil si at blæren lagrer urinen til vi bestemmer oss for å late vannet. Da trekker blæren seg sammen og lukkemusklene i urinrøret åpner seg slik at blæren kan tømmes.",
        hasAnatomyImages: true,
        anatomyImages: [
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/nyeste-kvinnelig-tverrsnitt-2018_0.png",
            alt: "Tverrsnitt av kvinnelig bekken",
            caption: "Tversnitt av et kvinnelig underliv som viser med piler hvor livmor, tarm, blære, skjede og urinrør er plassert"
          },
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/normal-anatomi_0.png",
            alt: "Tverrsnitt av mannlig bekken",
            caption: "Tversnitt av et mannlig underliv som viser med piler hvor blære, tarm, blære, prostatakjertel og urinrør er plassert"
          }
        ]
      },
      ...
    ]
  },
  en: {
    pageTitle: "Normal function",
    sections: [
      ...
    ]
  }
} as const
*/

const INTRODUCTION_DATA = {
  no: {
    description: "",
    keyPoints: [] as string[],
    image: { src: "", alt: "", caption: "" }
  },
  en: {
    description: "",
    keyPoints: [] as string[],
    image: { src: "", alt: "", caption: "" }
  }
};

const NORMAL_FUNCTIONS_DATA = {
  no: { pageTitle: "Funksjon", sections: [] as any[] },
  en: { pageTitle: "Normal function", sections: [] as any[] }
};


export const NormalFunctions = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const { pageTitle, sections } = NORMAL_FUNCTIONS_DATA[language];
  const introduction = INTRODUCTION_DATA[language];

  return (
    <>
      {/* Introduction Section */}
      <div className={`${styles.introductionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={`${styles.introductionContent} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
          <div className={`${styles.introductionText} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
            <p className={`${styles.introductionDescription} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>{introduction.description}</p>

            {/* Commented out keyPoints checklist as per new design */}
            {/* <div className={styles.keyPointsContainer}>
            <h3 className={styles.keyPointsTitle}>Hva du vil lære:</h3>
            <ul className={styles.keyPointsList}>
              {introduction.keyPoints.map((point, index) => (
                <li key={index} className={styles.keyPoint}>
                  <span className={styles.keyPointIcon}>✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div> */}
          </div>

          <div className={styles.introductionImage}>
            <div className={styles.introImageWrapper}>
              <div className={styles.introImageContainer}>
                <img
                  src={introduction.image.src}
                  alt={introduction.image.alt}
                  className={styles.introImageElement}
                />
              </div>
              <p className={styles.introductionImageCaption}>
                {introduction.image.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/inNormal.svg"
              alt="Normal Functions"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>
            {pageTitle}
          </h2>
        </div>
        <div className={styles.sectionContent}>

          {sections.map((section) => {
            const sectionWithImage = section as typeof section & { hasImage?: boolean; image?: { src: string; alt: string; caption: string } };
            const sectionWithAnatomy = section as typeof section & { hasAnatomyImages?: boolean; anatomyImages?: Array<{ src: string; alt: string; caption: string }> };
            const sectionWithHighlight = section as typeof section & { hasHighlight?: boolean; highlight?: string };

            return (
              <SectionAccordion
                key={section.id}
                title={section.title}
                isDarkMode={resolvedTheme === 'dark'}
                defaultOpen={false}
              >
                {sectionWithImage.hasImage ? (
                  <div className={styles.diagnosisIntroLayout}>
                    <div className={styles.diagnosisIntroText}>
                      <p className={styles.diagnosisIntroLead}>
                        {section.content}
                      </p>
                    </div>
                    <div className={styles.diagnosisIntroImage}>
                      <div className={styles.diagnosisImageContainer}>
                        <img
                          src={sectionWithImage.image?.src}
                          alt={sectionWithImage.image?.alt}
                          className={styles.diagnosisImage}
                        />
                        <p className={styles.diagnosisImageCaption}>
                          {sectionWithImage.image?.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : sectionWithAnatomy.hasAnatomyImages ? (
                  <>
                    <p className={styles.enhancedParagraph}>
                      {section.content}
                    </p>
                    <div className={styles.anatomySection}>
                      <div className={styles.anatomyGrid}>
                        {sectionWithAnatomy.anatomyImages?.map((image: { src: string; alt: string; caption: string }, imageIndex: number) => (
                          <div key={imageIndex} className={styles.anatomyItem}>
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
                  </>
                ) : (
                  <>
                    <p className={styles.enhancedParagraph}>
                      {section.content}
                    </p>
                    {sectionWithHighlight.hasHighlight && (
                      <div className={styles.highlightBox}>
                        <p>{sectionWithHighlight.highlight}</p>
                      </div>
                    )}
                  </>
                )}
              </SectionAccordion>
            );
          })}

        </div>
      </div>
    </>
  );
};
