"use client"

import { useState } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import { UrinaryIncontinenceIntroduction } from "./shared-introduction"
import { ImageModal } from "../../../components/ui/ImageModal"
import styles from "./section-content.module.css"

// Content data structure
type ContentItem = 
  | {
      id: string
      type: "video-intro"
      title: string
      description: string
      videoSrc: string
      thumbnailSrc: string
      videoTitle: string
    }
  | {
      id: string
      type: "section-with-anatomy"
      title: string
      description: string
      anatomyImages: ReadonlyArray<{
        src: string
        alt: string
        caption: string
      }>
    }
  | {
      id: string
      type: "section"
      title: string
      description: string
    }
  | {
      id: string
      type: "section-with-highlight"
      title: string
      description: string
      highlightBox: string
    }

const NORMAL_FUNCTIONS_DATA = {
  no: {
    pageTitle: "Funksjon",
    content: [
     
      {
        id: "structure",
        type: "section-with-anatomy" as const,
        title: "Urinveienes oppbygging",
        description: "Urinveiene består av nyrene, urinlederne, urinblære og urinrøret. Nyrene produserer urin, urinlederne leder urinen til blæra. Normalt skal vannlating skje viljestyrt. Det vil si at blæra lagrer urinen til vi bestemmer oss for å late vannet. Da trekker blæra seg sammen og lukkemusklene i urinrøret åpner seg slik at blæra kan tømmes.",
        anatomyImages: [
          {
            src: "/imagePelvic-1.png",
            alt: "Female Pelvic Anatomy",
            caption: "Tverrsnitt av kvinnelig bekken"
          },
          {
            src: "/imagePelvic-2.png",
            alt: "Male Pelvic Anatomy",
            caption: "Diverse personer med urinretensjon"
          }
        ]
      },
      {
        id: "kidney",
        type: "section" as const,
        title: "Nyrenes oppgaver",
        description: "Hovedfunksjonen for nyrene er å rense blodet for avfallsstoffer. Nyrene er i tillegg med på å regulere vann-, salt- og syrebasebalansen. De produserer også hormonet erythropoietin (EPO) som stimulerer beinmargen til å produsere flere røde blodlegemer. I tillegg produseres hormonet renin som regulerer blodets volum og blodtrykket."
      },
      {
        id: "bladder",
        type: "section" as const,
        title: "Blæra og urinrørets funksjon",
        description: "Hovedoppgaven til blæra er å lagre urinen i samlefasen og trekke seg sammen når blæra skal tømmes – tømmingsfasen. Urinrørets hovedoppgave er å holde tett i samlefasen og åpne seg for å lede ut urinen når blæra skal tømme seg. Blæra er en hul muskelbeholder som består av flere lag muskulatur og kalles detrusor. I samlefasen er den ettergivelig slik at trykket i blæra skal være lavt. Sterk eller langvarig trykkstigning i samlefasen kan føre til at urin presses ut av urinrøret og gir lekkasje, eller at urin i verste fall presses opp til nyrene. Ei blære med vedvarende høyt trykk kan også gjøre at nyrene ikke får levert urin til blæra. Dermed kan urin samle seg i nyrebekkenet. På sikt kan dette føre til nyreskade. Det er derfor vikig å tømme blæra regelmessig. I tømmefasen slapper urinrøret av mens detrusor trekker seg sammen slik at blæra blir fullstendig tømt."
      },
      {
        id: "normal-urination",
        type: "section-with-highlight" as const,
        title: "Normal vannlating",
        description: "De fleste voksne har ca 4-7 vannlatinger i døgnet, forutsatt at man drikker ca 1500-2000 ml hver dag. Normalt vil blæra gi beskjed til hjernen om normal tissetrang når det er ca. 3 dl i blæra. Dersom man ikke går på toalettet da vil man etter hvert få stadig sterkere vannlatingstrang.",
        highlightBox: "Det anbefales at man tisser på volum mellom 2,5 dl og 4 dl. Under vannlating skal blæra trekke seg sammen og tømme seg mens lukkemusklene i urinrøret skal slappe av og holde seg åpne helt til blæra har tømt seg."
      },
      {
        id: "leakage",
        type: "section" as const,
        title: "Urinlekkasje",
        description: "Urinlekkasje oppstår når trykket i blæra blir høyere enn lukketrykket i urinrøret, slik at større eller mindre mengder urin lekker ut. Økt trykk i blæra kan skyldes at blæremuskelen trekker seg sammen eller at økt buktrykk trykker på blæra fra utsiden."
      }
    ]
  },
  en: {
    pageTitle: "Normal Functions",
    content: [
      
      {
        id: "structure",
        type: "section-with-anatomy" as const,
        title: "Urinary Tract Structure",
        description: "The urinary tract consists of the kidneys, ureters, bladder and urethra. The kidneys produce urine, the ureters lead the urine to the bladder. Normally, urination should occur voluntarily. This means that the bladder stores urine until we decide to urinate. Then the bladder contracts and the sphincter muscles in the urethra open so that the bladder can empty.",
        anatomyImages: [
          {
            src: "/imagePelvic-1.png",
            alt: "Female Pelvic Anatomy",
            caption: "Cross-section of female pelvis"
          },
          {
            src: "/imagePelvic-2.png",
            alt: "Male Pelvic Anatomy",
            caption: "Diverse individuals with urinary retention"
          }
        ]
      },
      {
        id: "kidney",
        type: "section" as const,
        title: "Kidney Functions",
        description: "The main function of the kidneys is to cleanse the blood of waste products. The kidneys also help regulate water, salt and acid-base balance. They also produce the hormone erythropoietin (EPO) which stimulates the bone marrow to produce more red blood cells. In addition, the hormone renin is produced which regulates blood volume and blood pressure."
      },
      {
        id: "bladder",
        type: "section" as const,
        title: "Bladder and Urethra Function",
        description: "The main task of the bladder is to store urine in the storage phase and contract when the bladder is to be emptied – the emptying phase. The main task of the urethra is to stay closed in the storage phase and open to lead out the urine when the bladder is to empty. The bladder is a hollow muscle container consisting of several layers of muscle and is called the detrusor. In the storage phase it is compliant so that the pressure in the bladder should be low. Strong or prolonged pressure increase in the storage phase can lead to urine being pressed out of the urethra causing leakage, or urine being pressed up to the kidneys in the worst case. A bladder with persistently high pressure can also prevent the kidneys from delivering urine to the bladder. Thus urine can collect in the renal pelvis. Over time this can lead to kidney damage. It is therefore important to empty the bladder regularly. In the emptying phase the urethra relaxes while the detrusor contracts so that the bladder is completely emptied."
      },
      {
        id: "normal-urination",
        type: "section-with-highlight" as const,
        title: "Normal Urination",
        description: "Most adults have about 4-7 urinations per day, provided they drink about 1500-2000 ml per day. Normally the bladder will signal to the brain about normal urge when there is about 3 dl in the bladder. If you do not go to the toilet then you will gradually get increasingly stronger urge to urinate.",
        highlightBox: "It is recommended to urinate at volumes between 2.5 dl and 4 dl. During urination the bladder should contract and empty while the sphincter muscles in the urethra should relax and stay open until the bladder has emptied."
      },
      {
        id: "leakage",
        type: "section" as const,
        title: "Urinary Leakage",
        description: "Urinary leakage occurs when the pressure in the bladder becomes higher than the closing pressure in the urethra, so that larger or smaller amounts of urine leak out. Increased pressure in the bladder can be due to the bladder muscle contracting or increased abdominal pressure pressing on the bladder from the outside."
      }
    ]
  }
} as const

export const NormalFunctions = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  const { pageTitle, content } = NORMAL_FUNCTIONS_DATA[language]

  const renderContent = (item: ContentItem) => {
    if (item.type === "section-with-anatomy") {
      return (
        <SectionAccordion 
          key={item.id}
          title={item.title} 
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{item.description}</p>
          <div className={styles.anatomySection}>
            <div className={styles.anatomyGrid}>
              {item.anatomyImages.map((image) => (
                <div key={image.src} className={styles.anatomyItem}>
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className={styles.anatomyImage}
                    onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
                    style={{ cursor: 'pointer' }}
                  />
                  <p className={styles.anatomyCaption}>{image.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionAccordion>
      )
    }

    if (item.type === "section-with-highlight") {
      return (
        <SectionAccordion 
          key={item.id}
          title={item.title} 
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph}>{item.description}</p>
          <div className={styles.highlightBox}>
            <p>{item.highlightBox}</p>
          </div>
        </SectionAccordion>
      )
    }

    return (
      <SectionAccordion 
        key={item.id}
        title={item.title} 
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
      >
        <p className={styles.enhancedParagraph}>{item.description}</p>
      </SectionAccordion>
    )
  }

  return (
    <>
    {/* Introduction Section */}
    <UrinaryIncontinenceIntroduction />

    <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/inNormal.svg" alt="Normal Functions" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{pageTitle}</h2>
      </div>

      <div className={styles.sectionContent}>
        {content.map((item) => (
          <div key={item.id}>
            {renderContent(item)}
          </div>
        ))}
      </div>
    </div>

    {selectedImage && (
      <ImageModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage.src}
        imageAlt={selectedImage.alt}
        onClose={() => setSelectedImage(null)}
      />
    )}
    </>
  )
}
