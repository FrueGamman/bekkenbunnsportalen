"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";


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
      {
        id: "kidneys",
        title: "Nyrenes oppgaver",
        content: "Hovedfunksjonen for nyrene er å rense blodet for avfallsstoffer. Nyrene er i tillegg med på å regulere vann-, salt- og syrebasebalansen. De produserer også hormonet erythropoietin (EPO) som stimulerer beinmargen til å produsere flere røde blodlegemer. I tillegg produseres hormonet renin som regulerer blodets volum og blodtrykket."
      },
      {
        id: "bladder_function",
        title: "Blæra og urinrørets funksjon",
        content: "Hovedoppgaven til blæren er å lagre urinen i samlefasen og trekke seg sammen når blæren skal tømmes – tømmingsfasen. Urinrørets hovedoppgave er å holde tett i samlefasen og åpne seg for å lede ut urinen når blæren skal tømme seg. Blæren er en hul muskelbeholder som består av flere lag muskulatur og kalles detrusor. I samlefasen er den ettergivelig slik at trykket i blæren skal være lavt. Sterk eller langvarig trykkstigning i samlefasen kan føre til at urin presses ut av urinrøret og gir lekkasje, eller at urin i verste fall presses opp til nyrene. Ei blære med vedvarende høyt trykk kan også gjøre at nyrene ikke får levert urin til blæren. Dermed kan urin samle seg i nyrebekkenet. På sikt kan dette føre til nyreskade. Det er derfor vikig å tømme blæren regelmessig.\n\nI tømmefasen slapper urinrøret av mens detrusor trekker seg sammen slik at blæren blir fullstendig tømt."
      },
      {
        id: "normal_urination",
        title: "Normal vannlating",
        content: "De fleste voksne har ca 4-7 vannlatinger i døgnet, forutsatt at man drikker ca 1500-2000 ml hver dag. Normalt vil blæren gi beskjed til hjernen om normal tissetrang når det er ca. 3 dl i blæren. Dersom man ikke går på toalettet da vil man etter hvert få stadig sterkere vannlatingstrang. Det anbefales at man tisser på volum mellom 2,5 dl og 4 dl. Under vannlating skal blæren trekke seg sammen og tømme seg mens lukkemusklene i urinrøret skal slappe av og holde seg åpne helt til blæren har tømt seg."
      },
      {
        id: "incontinence",
        title: "Urinlekkasje",
        content: "Urinlekkasje oppstår når trykket i blæren blir høyere enn lukketrykket i urinrøret, slik at større eller mindre mengder urin lekker ut. Økt trykk i blæren kan skyldes at blæremuskelen trekker seg sammen eller at økt buktrykk trykker på blæren fra utsiden."
      }
    ]
  },
  en: {
    pageTitle: "Normal function",
    sections: [
      {
        id: "structure",
        title: "Urinary System Structure",
        content: "The urinary system consists of the kidneys, ureters, bladder, and urethra. The kidneys produce urine, the ureters lead the urine to the bladder. Normally, urination should be voluntary. This means that the bladder stores urine until we decide to urinate. Then the bladder contracts and the sphincter muscles in the urethra open so that the bladder can be emptied.",
        hasAnatomyImages: true,
        anatomyImages: [
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/nyeste-kvinnelig-tverrsnitt-2018_0.png",
            alt: "Cross-section of female pelvis",
            caption: "Cross-section of a female pelvis showing with arrows where the uterus, intestine, bladder, vagina and urethra are located"
          },
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/normal-anatomi_0.png",
            alt: "Cross-section of male pelvis",
            caption: "Cross-section of a male pelvis showing with arrows where the bladder, intestine, bladder, prostate gland and urethra are located"
          }
        ]
      },
      {
        id: "kidneys",
        title: "Kidney Functions",
        content: "The main function of the kidneys is to cleanse the blood of waste products. The kidneys also help regulate water, salt, and acid-base balance. They also produce the hormone erythropoietin (EPO) which stimulates the bone marrow to produce more red blood cells. In addition, the hormone renin is produced, which regulates blood volume and blood pressure."
      },
      {
        id: "bladder_function",
        title: "Bladder and Urethra Function",
        content: "The main task of the bladder is to store urine in the collection phase and contract when the bladder is to be emptied – the emptying phase. The main task of the urethra is to stay closed in the collection phase and open to lead out the urine when the bladder is to empty itself. The bladder is a hollow muscle container consisting of several layers of muscle and is called the detrusor. In the collection phase, it is compliant so that the pressure in the bladder should be low. Strong or prolonged pressure increase in the collection phase can cause urine to be pressed out of the urethra and cause leakage, or in the worst case, urine to be pressed up to the kidneys. A bladder with persistently high pressure can also prevent the kidneys from delivering urine to the bladder. Thus, urine can collect in the renal pelvis. Over time, this can lead to kidney damage. It is therefore important to empty the bladder regularly.\n\nIn the emptying phase, the urethra relaxes while the detrusor contracts so that the bladder is completely emptied."
      },
      {
        id: "normal_urination",
        title: "Normal Urination",
        content: "Most adults have about 4-7 urinations per day, provided they drink about 1500-2000 ml each day. Normally, the bladder will notify the brain of normal urge to urinate when there is about 3 dl in the bladder. If you don't go to the toilet then, you will gradually get increasingly stronger urge to urinate. It is recommended that you urinate at volumes between 2.5 dl and 4 dl. During urination, the bladder should contract and empty while the sphincter muscles in the urethra should relax and stay open until the bladder has emptied."
      },
      {
        id: "incontinence",
        title: "Urinary Incontinence",
        content: "Urinary incontinence occurs when the pressure in the bladder becomes higher than the closing pressure in the urethra, so that larger or smaller amounts of urine leak out. Increased pressure in the bladder can be due to the bladder muscle contracting or increased abdominal pressure pressing on the bladder from the outside."
      }
    ]
  }
} as const

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
                        {sectionWithAnatomy.anatomyImages?.map((image, imageIndex) => (
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
