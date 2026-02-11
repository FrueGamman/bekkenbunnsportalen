"use client"
import styles from "./section-content.module.css"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from '../../../components/SectionAccordion'
import { FecalIncontinenceIntroduction } from "./shared-introduction"

// Content data structure
type ContentItem = {
  id: string
  type: "section"
  title: string
  description: string
  hasImage?: boolean
  imageSrc?: string
  imageAlt?: string
  hasImages?: boolean
  images?: ReadonlyArray<{
    id: string
    src: string
    alt: string
    caption: string
  }>
}

// Language-specific content data
const contentData = {
  no: [
    {
      id: "intestinal_structure",
      type: "section" as const,
      title: "Tarmens oppbygging",
      description:
        "Magetarmkanalen begynner ved munnhulen og slutter ved endetarmsåpningen. Den består av munnhule, spiserør, magesekk, tolvfingertarm, tynntarm, tykktarm, endetarm og analkanalen med dens lukkemuskler. Tykktarm og endetarm ivaretar en veldig vesentlig rolle for normal funksjon. Tarmen består av slimhinne samt to ytre muskellag.\n\nTarmens bevegelsesmønster reguleres av tarmens eget nervesystem, sirkulerende hormoner i blodet samt nerveimpulser fra hjerne og ryggmarg. Alt i alt er bevegelsesmønsteret et komplekst resultat av alle disse faktorer. Endring i denne balansen vil kunne føre til funksjonsforstyrrelser, for eksempel analinkontinens, forstoppelse og tømmingsproblemer.",
      hasImage: true,
      imageSrc: "/tarmens.png",
      imageAlt: "Tarmens oppbygging"
    },
    {
      id: "continence_mechanism",
      type: "section" as const,
      title: "Kontinensmekanisme",
      description:
        "Å være kontinent innebærer å ha kontroll på avføring og tarmluft. Kontinensmekanismen innebærer et samspill av mange faktorer. Koordinasjon av tykktarmen, endetarmen, bekkenbunnen og analkanalen er vesentlig. I tillegg er intakte kognitive funksjoner, evne til forflytning samt tilgang til toalettfasiliteter avgjørende.\n\nNede i bekkenet ligger bekkenbunnen som danner en muskulært gulv ved hjelp av en stor slynge-/hesteskoformet muskelplate. Muskelen er festet baktil i korsbenet og halebenet og i bekkenets sideflater og lukkes fortil mot fremre bekkenben med en tverrgående muskeplate. Endetarmen samt urinrør (og skjede hos kvinner) passerer igjennom dette gulvet som en trakt, via spalting i muskelplaten.",
      hasImage: true,
      imageSrc: "/kontinensmekanisme.png",
      imageAlt: "Kontinensmekanisme"
    },
    {
      id: "incontinence_definition",
      type: "section" as const,
      title: "Avføringslekkasje (anal inkontinens)",
      description:
        "Avføringslekkasje innebærer ufrivillig lekkasje for fast eller flytende avføring og manglende evne til å utsette trang. Om det i tillegg forekommer lekkasje for luft, kalles tilstanden anal inkontinens, som kan oppleves som en like plagsom tilstand.\n\nFunksjonsforstyrrelse som fører til anal inkontinens kan være skade på analkanalens lukkemuskler, for eksempel i forbindelse med fødselsskader eller kirurgi. Andre årsaker kan være betennelse i endetarmens slimhinne som ved for eksempel inflammatorisk tarmsykdom. Anal inkontinens sees også i forbindelse med andre tilstander som nevrologiske sykdommer, ryggmargsskade, diabetes mellitus, som bivirkning til medikamenter og medfødte misdannelser."
    },
    {
      id: "defecation",
      type: "section" as const,
      title: "Tarmtømming (defekasjon)",
      description:
        "En normal tarmtømming er et samspill mellom ikke-viljestyrte og viljestyrte prosesser. Dette samspillet er komplekst og deler av selve mekanismen er ikke fullstendig kartlagt. I forbindelse med måltid igangsettes en massebevegelse i tykktarmen, avføring passerer fra tykktarmen og ned i endetarmen. Denne mekanismen sender nervesignaler til analkanalens lukkemuskler, primært til den ytre lukkemuskelen og bekkenbunnen som trekker seg sammen inntil en har kommet frem til toalettet. Deretter skjer en avslapning av både ytre- og indre lukkemuskel og tømmingen kan skje.",
      hasImages: true,
      images: [
        {
          id: "sphincter_front_no",
          src: "/fecal-sphincter-front-woie.png",
          alt: "Skjematisk illustrasjon av bekkenbunnen sett forfra",
          caption: "Skjematisk illustrasjon av bekkenbunnen sett forfra. Illustrasjonen viser nedre del av endetarm, bekkenbunnen samt analkanalen med tilhørende indre- og ytre lukkemuskel."
        },
        {
          id: "sphincter_side_no",
          src: "/fecal-sphincter-side-woie.png",
          alt: "Skjematisk illustrasjon av bekkenbunnen sett fra siden",
          caption: "Skjematisk illustrasjon av bekkenbunnen sett fra siden. Illustrasjonen viser nedre del av endetarm, haleben og korsben samt analkanalen med tilhørende indre- og ytre lukkemuskel."
        }
      ]
    }
  ],
  en: [
    {
      id: "intestinal_structure",
      type: "section" as const,
      title: "Intestinal Structure",
      description:
        "The gastrointestinal tract begins at the mouth and ends at the anus. It consists of the mouth, esophagus, stomach, duodenum, small intestine, colon, rectum and the anal canal with its sphincters. The colon and rectum play a very important role for normal function.\n\nThe colon begins in the right groin area, ascends on the right side of the abdomen, crosses over the stomach and descends along the left side, ending with the rectum which opens into the anal canal. The main function of the colon is to extract fluid from the stool so that a solid consistency is achieved. The movement pattern of the intestine is regulated by the intestine's own nervous system, circulating hormones in the blood, and nerve impulses from the brain and spinal cord.",
      hasImage: true,
      imageSrc: "/tarmens.png",
      imageAlt: "Intestinal Structure"
    },
    {
      id: "continence_mechanism",
      type: "section" as const,
      title: "Continence Mechanism",
      description:
        "Being continent means having control over stool and gas. The continence mechanism involves an interaction of many factors. Coordination of the colon, rectum, pelvic floor and anal canal is essential for maintaining continence.\n\nPelvic Floor: Within the pelvis lies the pelvic floor, which forms a muscular floor with a large sling-/horseshoe-shaped muscle plate. The rectum and urethra (and vagina in women) pass through this floor like a funnel. The pelvic floor supports the pelvic organs and contributes to the closure mechanism.\n\nAnal Canal: The anal canal is the lower part of the rectum and consists of internal and external sphincters. The internal sphincter is a continuation of the intestinal wall thickened into a ring muscle. This consists of smooth muscle controlled by the autonomic nervous system. The external sphincter is a ring of striated muscle forming a funnel.\n\nRectum: The rectum functions as a temporary storage site for stool. When stool enters the rectum, this is registered by nerve cells that provide a sensation of needing to defecate.",
      hasImage: true,
      imageSrc: "/kontinensmekanisme.png",
      imageAlt: "Continence Mechanism"
    },
    {
      id: "incontinence_definition",
      type: "section" as const,
      title: "Fecal Incontinence (Anal Incontinence)",
      description:
        "Fecal incontinence means involuntary leakage of solid or liquid stool and the inability to defer the urge. If leakage of gas also occurs, the condition is called anal incontinence.\n\nFecal incontinence can range from small amounts of seepage to complete loss of bowel control. The problem can occur suddenly or develop gradually over time. The condition affects 2-8% of the population and is significantly underreported due to taboo and shame."
    },
    {
      id: "defecation",
      type: "section" as const,
      title: "Bowel Emptying (Defecation)",
      description:
        "Normal bowel emptying is an interaction between involuntary and voluntary processes. In connection with meals, a mass movement is initiated in the colon, stool passes from the colon down into the rectum.\n\nWhen stool enters the rectum and stretches the intestinal wall, this gives a sensation of needing to defecate. The internal sphincter opens automatically (reflex), while the external sphincter is kept closed by will. When convenient, we relax the external sphincter and pelvic floor, and defecation can occur. For normal defecation, it is important to have adequate time and sit in a relaxed position.",
      hasImages: true,
      images: [
        {
          id: "sphincter_front_en",
          src: "/fecal-sphincter-front-woie.png",
          alt: "Schematic illustration of the pelvic floor viewed from the front",
          caption: "Schematic illustration of the pelvic floor viewed from the front. The illustration shows the lower part of the rectum, pelvic floor, and the anal canal with associated internal and external sphincter muscles."
        },
        {
          id: "sphincter_side_en",
          src: "/fecal-sphincter-side-woie.png",
          alt: "Schematic illustration of the pelvic floor viewed from the side",
          caption: "Schematic illustration of the pelvic floor viewed from the side. The illustration shows the lower part of the rectum, coccyx and sacrum, and the anal canal with associated internal and external sphincter muscles."
        }
      ]
    }
  ]
} as const

export const NormalFunctions = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const renderContent = (item: ContentItem) => {
    return (
      <SectionAccordion 
        title={item.title}
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
      >
        {item.hasImage && item.imageSrc && item.imageAlt ? (
          <div className={styles.anatomyGrid}>
            <div>
              <p className={styles.enhancedParagraph}>{item.description}</p>
            </div>
            <div className={styles.anatomyItem}>
              <img src={item.imageSrc} alt={item.imageAlt} className={styles.anatomyImage} />
            </div>
          </div>
        ) : (
          <p className={styles.enhancedParagraph}>{item.description}</p>
        )}
        {item.hasImages && item.images && (
          <div className={styles.anatomySection}>
            <div className={styles.anatomyGrid}>
              {item.images.map((img) => (
                <div key={img.id} className={styles.anatomyItem}>
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className={styles.anatomyImage}
                  />
                  <p className={styles.anatomyCaption}>{img.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionAccordion>
    )
  }

  return (
    <>
      <FecalIncontinenceIntroduction />
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/inNormal.svg" alt="Normal Functions" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{language === "no" ? "Funksjon" : "Normal Functions"}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        {contentData[language].map((item) => (
          <div key={item.id}>
            {renderContent(item)}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
