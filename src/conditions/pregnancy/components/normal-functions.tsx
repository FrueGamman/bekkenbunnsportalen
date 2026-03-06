"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Structured data from bekkenbunnsportalen_complete.json
const NORMAL_FUNCTIONS_DATA = {
  no: {
    sections: [
      {
        id: "anatomy",
        title: "Anatomi og funksjon",
        content: [
          {
            type: "paragraph",
            text: "Bekkenet inneholder mange ulike strukturer som utgjør en del av bevegelsesapparatet som muskler, skjelett, ledd, leddbånd/ligamenter og bindevev. Bekkenet inneholder også ytre og indre kjønnsorganer, blære og tarm. Alle strukturer i bekkenet styres av nerver med utspring fra ryggmargen."
          },
          {
            type: "image",
            src: "/media/images/bekkengulv_med_tekst-768x503.png",
            alt: "Illustrasjon av et bekken sett ovenfra med tekst og piler som viser hvor bekkenbunnen, endetarmen, skjeden og urinrøret er plassert",
            caption: "Bekkenbunnens anatomi og plassering"
          },
          {
            type: "paragraph",
            text: "Bekkenbunnsmuskulaturen, også omtalt som bekkenbunnen, utgjør gulvet i kroppen. Den omslutter skjede, urinrør og endetarm, og gir støtte og stabilisering av underlivsorganene. Bekkenbunnen bidrar til kontroll over urin og avføring."
          },
          {
            type: "paragraph",
            text: "Den trekker seg reflektorisk raskt og effektivt sammen rundt urinrør, skjede og endetarm ved hosting, nysing og aktivitet. Dersom bekkenbunnen ikke fungerer som den skal, kan det føre til ufrivillig lekkasje av urin, luft og avføring, samt nedfall av bekkenorganer."
          },
          {
            type: "highlight",
            content: "Bekkenbunnsmuskulaturen er i hovedsak viljestyrt. Det vil si at vi aktivt kan styre sammentrekning og avslapning."
          },
          {
            type: "paragraph",
            text: "Muskulaturen skal normalt slappe av ved toalettbesøk slik at du får til å tømme både blære og tarm. Det er også viktig å kunne kontrollere bekkenbunnen ved samleie. Like viktig som det er å kunne kontrollere knip av bekkenbunnen, er det viktig å kunne slappe av i bekkenbunnsmusklene."
          }
        ]
      },
      {
        id: "changes-during-pregnancy",
        title: "Endringer under graviditet og fødsel",
        content: [
          {
            type: "paragraph",
            text: "Under svangerskap og fødsel strekkes bekkenbunnsmuskulaturen og bindevev slik at støtte- og lukkefunksjonen kan bli påvirket. Muskulaturen, sammen med nervevev og bindevev, tilheles som regel av seg selv og eventuelle plager vil ofte være kortvarige."
          },
          {
            type: "image",
            src: "/media/images/bekkenbunn.jpg",
            alt: "Kvinnelig underliv med bekkenbunn, sett fra siden",
            caption: "Kvinnelig underliv med bekkenbunn, sett fra siden"
          },
          {
            type: "paragraph",
            text: "Hos noen vil derimot en svekkelse eller skade i bekkenbunnen vedvare og kunne føre til flere ulike plager. Muskulatur som er svak eller reagerer for sent, vil ikke gi optimal lukking og støtte ved økning i buktrykket."
          },
          {
            type: "list",
            title: "Mulige plager ved svekket bekkenbunn:",
            items: [
              "Lekkasje av urin, luft eller avføring",
              "Manglende støtte til indre organer i bekkenet",
              "Framfall (nedsigning av livmor, blære eller tarm)",
              "Tyngdefølelse i underlivet"
            ]
          },
          {
            type: "highlight",
            content: "I ammeperioden er muskulatur, bindevev og ligamenter i underlivet under påvirkning av lavt østrogennivå og det kan dermed føles noe \"slappere\". Dette vil ofte bedres etter endt amming."
          },
          {
            type: "paragraph",
            text: "Akkurat som all annen muskulatur kan bekkenbunnsmuskulaturen trenes opp og bli sterkere igjen."
          }
        ]
      },
      {
        id: "pelvic-floor-training",
        title: "Bekkenbunnstrening",
        content: [
          {
            type: "paragraph",
            text: "Under graviditet og fødsel vil bekkenbunnsmuskulatur bli tøyd og bekkenbunnstrening anbefales derfor både i svangerskapet og etter fødsel. Bekkenbunnstrening kan også være effektiv behandling for lekkasje og underlivsprolaps."
          },
          {
            type: "subsection",
            title: "Hvor lenge trene bekkenbunnen?",
            content: [
              {
                type: "paragraph",
                text: "Bekkenbunnstrening anbefales til alle under graviditet og etter fødsel. Slik trening må gjøres riktig, regelmessig og over tid. I starten anbefales daglige øvelser, uavhengig av om man har plager eller ikke."
              },
              {
                type: "list",
                items: [
                  "Ved plager anbefales minimum tre til seks måneders daglig trening",
                  "Når ønsket effekt er oppnådd, kan denne vedlikeholdes med øvelser to ganger ukentlig",
                  "Det er viktig å huske at det aldri er for sent å begynne med bekkenbunnstrening"
                ]
              }
            ]
          },
          {
            type: "subsection",
            title: "Øvelser for bekkenbunnstrening",
            content: [
              {
                type: "paragraph",
                text: "Opptrening og kontroll på bekkenbunnsmuskulaturen er et grunnleggende tiltak som bør iverksettes ved plager. Det er viktig å lære seg å kjenne og kontrollere forskjellen mellom sammentrekning og avslapning av bekkenbunnsmuskulaturen."
              },
              {
                type: "highlight",
                content: "Bekkenbunnstrening skal ikke gjøre vondt. Effekten er god, men det forutsetter at det gjøres riktig og regelmessig."
              },
              {
                type: "exercise-steps",
                title: "Slik gjør du bekkenbunnsøvelser:",
                steps: [
                  {
                    title: "Knip (lukk) igjen rundt urinrør, skjede- og endetarmsåpning",
                    description: "For kvinner: Kjenn at området mellom skjede og endetarm trekker seg litt opp og inn i kroppen. Du kan også legge et par fingre på det samme stedet (mellomkjøttet/perineum) og kjenne at det løftes litt vekk fra fingrene dine når du bruker bekkenbunnen riktig.",
                    tip: "Forestill deg at du skal holde igjen for luft eller stoppe urinstrålen. Det er disse musklene du skal trene."
                  },
                  {
                    title: "Mage-, lår- og setemusklene skal være avslappet",
                    description: "Fokuser på å bruke riktig muskulatur og unngå å spenne annen muskulatur."
                  },
                  {
                    title: "Begynn med å holde i 2-3 sekunder, slipp like lenge",
                    description: "Det er like viktig å hvile helt mellom hvert knip, som det er å knipe, ellers vil man ikke få riktig tak."
                  },
                  {
                    title: "Gjenta 15 ganger morgen og kveld",
                    description: "For noen kan 15 knip være mye i starten. Det er viktigere og få til gode og korrekte knip, enn flest mulig. Antall knip kan økes etterhvert."
                  },
                  {
                    title: "Øk knipetiden litt etter litt",
                    description: "For eksempel kan du øke med 1-2 sekunder hver uke, til du er oppe i 10-12 sekunder. Knipene skal være kontrollerte. Dersom taket \"slipper\" er det bedre å redusere knipetiden slik at det blir et sterkt og godt knip."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "training-during-pregnancy",
        title: "Trening under svangerskapet",
        content: [
          {
            type: "paragraph",
            text: "De generelle anbefalingene om fysisk aktivitet og trening, gjelder også for gravide. Gravide kan trene helt fram til fødselen, så lenge det ikke gir smerter eller ubehag."
          },
          {
            type: "highlight",
            content: "Bekkenbunnstrening anbefales daglig under svangerskapet."
          },
          {
            type: "paragraph",
            text: "Noen gravide opplever tyngdefølelse og press i underlivet. Andre har plager med lekkasje. Graden av plager varierer og bekkenbunnstrening kan være nyttig."
          }
        ]
      },
      {
        id: "training-after-birth",
        title: "Trening etter fødsel",
        content: [
          {
            type: "paragraph",
            text: "Bekkenbunnstrening kan startes umiddelbart etter fødsel. Dersom smerter på grunn av hevelse og sting bør øvelsene utsettes til etter tilheling."
          },
          {
            type: "paragraph",
            text: "Noen kan synes det er vanskelig å få til øvelsene i starten. Underlivet har vært utsatt for en belastning og det kan ta tid før man gjenvinner kontroll på muskulaturen. Det er derfor viktig å fortsette med øvelsene."
          },
          {
            type: "highlight",
            content: "Tips: Kjenn etter om du klarer å trekke sammen bekkenbunnen og gi støtte for underlivsorganene når du løfter og bærer barnet ditt."
          },
          {
            type: "paragraph",
            text: "Etter hvert som man ønsker å komme i gang med trening som utfordrer hele kroppen, er det viktig å ha fokus på bekkenbunnen underveis i treningen."
          },
          {
            type: "list",
            title: "Vær oppmerksom på følgende:",
            items: [
              "Hard fysisk aktivitet som lange løpeturer, hopping og tunge styrkeløft kan være utfordrende for en allerede svekket bekkenbunnsmuskulatur",
              "Man bør trene på å aktivere bekkenbunnsmuskulaturen under denne type trening",
              "Ønsker du å utøve tyngre former for styrketrening krever dette også mye kraft fra bekkenbunnen - gradvis opptrening anbefales",
              "Dersom man under trening opplever lekkasje eller tyngdefølelse i underlivet, kan man justere intensitet og varighet"
            ]
          }
        ]
      },
      {
        id: "when-training-doesnt-help",
        title: "Når bekkenbunnstrening ikke gir ønsket effekt",
        content: [
          {
            type: "paragraph",
            text: "Bekkenbunnstrening kan være effektiv behandling av lekkasje og tyngdefølelse/fremfall. En av årsakene til manglende effekt kan være at bekkenbunnsøvelsene gjøres feil eller at man ikke oppnår kontakt med riktig muskulatur."
          },
          {
            type: "highlight",
            content: "Fysioterapeut kan veilede for riktig teknikk."
          },
          {
            type: "paragraph",
            text: "For de som utfører knipet riktig, men som ikke oppnår ønsket effekt på sine plager, kan det være andre årsaker til dette som for eksempel skade på muskulatur, nerver eller bindevev. Slike skader kan i seg selv vanskeliggjøre bekkenbunnstrening."
          },
          {
            type: "paragraph",
            text: "Da kan fastlege kontaktes for en vurdering og henvisning til spesialist for videre utredning og behandling."
          }
        ]
      },
      {
        id: "pelvic-floor-tension",
        title: "Spenninger i bekkenbunnen",
        content: [
          {
            type: "paragraph",
            text: "Konstant spenning av bekkenbunnsmuskulaturen er ikke gunstig og kan føre til andre plager og smertetilstander."
          },
          {
            type: "highlight",
            content: "Ved bekkenbunnsøvelser er det viktig å klare å slippe godt opp og slappe av i bekkenbunnen mellom knipene. En skal ikke gå med ett konstant knip."
          },
          {
            type: "list",
            title: "Plager ved konstant spenning:",
            items: [
              "Smerter i underlivet",
              "Tømningsvansker for urin",
              "Tømningsvansker for avføring",
              "Smerter ved samleie"
            ]
          },
          {
            type: "paragraph",
            text: "Ved smerte og spenning i bekkenbunnsmuskulaturen er det derfor viktig å utrede for bakenforliggende skader på muskulatur og nerver som kan gi plager, som forsøkes kontrollert med konstant knip."
          },
          {
            type: "paragraph",
            text: "Dersom vedvarende plager bør helsepersonell kontaktes for videre utredning og behandling."
          }
        ]
      }
    ]
  },
  en: {
    sections: [
      {
        id: "anatomy",
        title: "Anatomy and Function",
        content: [
          {
            type: "paragraph",
            text: "The pelvis contains many different structures that form part of the musculoskeletal system, including muscles, skeleton, joints, ligaments, and connective tissue. The pelvis also contains external and internal reproductive organs, bladder and intestines. All structures in the pelvis are controlled by nerves originating from the spinal cord."
          },
          {
            type: "image",
            src: "/media/images/bekkengulv_med_tekst-768x503.png",
            alt: "Illustration of a pelvis seen from above with text and arrows showing where the pelvic floor, rectum, vagina and urethra are located",
            caption: "Pelvic floor anatomy and location"
          },
          {
            type: "paragraph",
            text: "The pelvic floor muscles, also referred to as the pelvic floor, form the floor of the body. They surround the vagina, urethra and rectum, and provide support and stabilization for the pelvic organs. The pelvic floor contributes to control of urine and stool."
          },
          {
            type: "paragraph",
            text: "They contract reflexively quickly and efficiently around the urethra, vagina and rectum when coughing, sneezing and during activity. If the pelvic floor does not function properly, it can lead to involuntary leakage of urine, gas and stool, as well as pelvic organ prolapse."
          },
          {
            type: "highlight",
            content: "The pelvic floor muscles are mainly under voluntary control. This means we can actively control contraction and relaxation."
          },
          {
            type: "paragraph",
            text: "The muscles should normally relax during toilet visits so you can empty both bladder and bowel. It is also important to be able to control the pelvic floor during intercourse. Just as important as being able to control pelvic floor contraction, it is important to be able to relax the pelvic floor muscles."
          }
        ]
      },
      {
        id: "changes-during-pregnancy",
        title: "Changes During Pregnancy and Birth",
        content: [
          {
            type: "paragraph",
            text: "During pregnancy and birth, the pelvic floor muscles and connective tissue are stretched so that the support and closure function may be affected. The muscles, along with nerve tissue and connective tissue, usually heal on their own and any problems will often be short-lived."
          },
          {
            type: "image",
            src: "/media/images/bekkenbunn.jpg",
            alt: "Female pelvis with pelvic floor, seen from the side",
            caption: "Female pelvis with pelvic floor, seen from the side"
          },
          {
            type: "paragraph",
            text: "For some, however, a weakness or injury to the pelvic floor will persist and can lead to various problems. Muscles that are weak or react too slowly will not provide optimal closure and support when abdominal pressure increases."
          },
          {
            type: "list",
            title: "Possible problems with weakened pelvic floor:",
            items: [
              "Leakage of urine, gas or stool",
              "Lack of support for internal organs in the pelvis",
              "Prolapse (descent of uterus, bladder or bowel)",
              "Feeling of heaviness in the pelvis"
            ]
          },
          {
            type: "highlight",
            content: "During breastfeeding, muscles, connective tissue and ligaments in the pelvis are influenced by low estrogen levels and may therefore feel somewhat \"looser\". This will often improve after breastfeeding ends."
          },
          {
            type: "paragraph",
            text: "Just like any other muscle, the pelvic floor muscles can be trained and become stronger again."
          }
        ]
      },
      {
        id: "pelvic-floor-training",
        title: "Pelvic Floor Training",
        content: [
          {
            type: "paragraph",
            text: "During pregnancy and birth, the pelvic floor muscles will be stretched and pelvic floor training is therefore recommended both during pregnancy and after birth. Pelvic floor training can also be an effective treatment for leakage and pelvic organ prolapse."
          },
          {
            type: "subsection",
            title: "How long to train the pelvic floor?",
            content: [
              {
                type: "paragraph",
                text: "Pelvic floor training is recommended for everyone during pregnancy and after birth. Such training must be done correctly, regularly and over time. Daily exercises are recommended initially, regardless of whether you have problems or not."
              },
              {
                type: "list",
                items: [
                  "For problems, a minimum of three to six months of daily training is recommended",
                  "When the desired effect is achieved, this can be maintained with exercises twice weekly",
                  "It is important to remember that it is never too late to start pelvic floor training"
                ]
              }
            ]
          },
          {
            type: "subsection",
            title: "Exercises for pelvic floor training",
            content: [
              {
                type: "paragraph",
                text: "Training and control of the pelvic floor muscles is a fundamental measure that should be implemented for problems. It is important to learn to recognize and control the difference between contraction and relaxation of the pelvic floor muscles."
              },
              {
                type: "highlight",
                content: "Pelvic floor training should not hurt. The effect is good, but it requires that it is done correctly and regularly."
              },
              {
                type: "exercise-steps",
                title: "How to do pelvic floor exercises:",
                steps: [
                  {
                    title: "Contract (close) around the urethra, vagina and anus",
                    description: "For women: Feel the area between the vagina and anus pull slightly up and into the body. You can also place a couple of fingers on the same spot (perineum) and feel it lift slightly away from your fingers when you use the pelvic floor correctly.",
                    tip: "Imagine you are holding back gas or stopping the urine stream. These are the muscles you should train."
                  },
                  {
                    title: "Abdominal, thigh and buttock muscles should be relaxed",
                    description: "Focus on using the right muscles and avoid tensing other muscles."
                  },
                  {
                    title: "Start by holding for 2-3 seconds, release for the same time",
                    description: "It is just as important to rest completely between each contraction as it is to contract, otherwise you will not get the right grip."
                  },
                  {
                    title: "Repeat 15 times morning and evening",
                    description: "For some, 15 contractions may be a lot at first. It is more important to achieve good and correct contractions than as many as possible. The number of contractions can be increased gradually."
                  },
                  {
                    title: "Increase the contraction time gradually",
                    description: "For example, you can increase by 1-2 seconds each week until you reach 10-12 seconds. The contractions should be controlled. If the grip \"slips\", it is better to reduce the contraction time so that it becomes a strong and good contraction."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "training-during-pregnancy",
        title: "Training During Pregnancy",
        content: [
          {
            type: "paragraph",
            text: "The general recommendations for physical activity and training also apply to pregnant women. Pregnant women can train right up until birth, as long as it does not cause pain or discomfort."
          },
          {
            type: "highlight",
            content: "Daily pelvic floor training is recommended during pregnancy."
          },
          {
            type: "paragraph",
            text: "Some pregnant women experience heaviness and pressure in the pelvis. Others have problems with leakage. The degree of problems varies and pelvic floor training can be helpful."
          }
        ]
      },
      {
        id: "training-after-birth",
        title: "Training After Birth",
        content: [
          {
            type: "paragraph",
            text: "Pelvic floor training can be started immediately after birth. If there is pain due to swelling and stitches, the exercises should be postponed until after healing."
          },
          {
            type: "paragraph",
            text: "Some may find it difficult to do the exercises at first. The pelvis has been subjected to stress and it may take time to regain control of the muscles. It is therefore important to continue with the exercises."
          },
          {
            type: "highlight",
            content: "Tip: Check if you can contract the pelvic floor and provide support for the pelvic organs when lifting and carrying your baby."
          },
          {
            type: "paragraph",
            text: "As you want to start training that challenges the whole body, it is important to focus on the pelvic floor during training."
          },
          {
            type: "list",
            title: "Be aware of the following:",
            items: [
              "Intense physical activity such as long runs, jumping and heavy weightlifting can be challenging for an already weakened pelvic floor",
              "You should train to activate the pelvic floor muscles during this type of training",
              "If you want to do heavier forms of strength training, this also requires a lot of strength from the pelvic floor - gradual training is recommended",
              "If you experience leakage or heaviness in the pelvis during training, you can adjust intensity and duration"
            ]
          }
        ]
      },
      {
        id: "when-training-doesnt-help",
        title: "When Pelvic Floor Training Doesn't Give Desired Effect",
        content: [
          {
            type: "paragraph",
            text: "Pelvic floor training can be an effective treatment for leakage and heaviness/prolapse. One reason for lack of effect may be that the pelvic floor exercises are done incorrectly or that you do not achieve contact with the right muscles."
          },
          {
            type: "highlight",
            content: "A physiotherapist can guide you in the correct technique."
          },
          {
            type: "paragraph",
            text: "For those who perform the contraction correctly but do not achieve the desired effect on their problems, there may be other reasons for this, such as damage to muscles, nerves or connective tissue. Such damage can in itself make pelvic floor training difficult."
          },
          {
            type: "paragraph",
            text: "In such cases, contact your GP for an assessment and referral to a specialist for further investigation and treatment."
          }
        ]
      },
      {
        id: "pelvic-floor-tension",
        title: "Tension in the Pelvic Floor",
        content: [
          {
            type: "paragraph",
            text: "Constant tension of the pelvic floor muscles is not beneficial and can lead to other problems and pain conditions."
          },
          {
            type: "highlight",
            content: "During pelvic floor exercises, it is important to be able to release and relax the pelvic floor between contractions. You should not maintain a constant contraction."
          },
          {
            type: "list",
            title: "Problems with constant tension:",
            items: [
              "Pain in the pelvis",
              "Difficulty emptying the bladder",
              "Difficulty emptying the bowel",
              "Pain during intercourse"
            ]
          },
          {
            type: "paragraph",
            text: "With pain and tension in the pelvic floor muscles, it is therefore important to investigate underlying damage to muscles and nerves that may cause problems, which are attempted to be controlled with constant contraction."
          },
          {
            type: "paragraph",
            text: "If problems persist, healthcare professionals should be contacted for further investigation and treatment."
          }
        ]
      }
    ]
  }
}

// Helper component to render content based on type
const ContentRenderer = ({ item, styles, isDarkMode }: { item: Record<string, any>; styles: Record<string, string>; isDarkMode: boolean }) => {
  switch (item.type) {
    case "paragraph":
      return <p className={styles.enhancedParagraph}>{item.text}</p>

    case "image":
      return (
        <div className={styles.imageContainer}>
          <img
            src={item.src}
            alt={item.alt}
            className={styles.sectionImage}
          />
          {item.caption && (
            <p className={styles.imageCaption}>{item.caption}</p>
          )}
        </div>
      )

    case "highlight":
      return (
        <div className={styles.highlightBox}>
          <p className={styles.highlightText}>{item.content}</p>
        </div>
      )

    case "list":
      return (
        <div className={styles.listContainer}>
          {item.title && <h4 className={styles.listTitle}>{item.title}</h4>}
          <ul className={styles.enhancedList}>
            {item.items.map((listItem: string, index: number) => (
              <li key={index} className={styles.enhancedListItem}>{listItem}</li>
            ))}
          </ul>
        </div>
      )

    case "subsection":
      return (
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>{item.title}</h4>
          {(item.content as Array<Record<string, any>>).map((subItem: Record<string, any>, index: number) => (
            <ContentRenderer key={index} item={subItem} styles={styles} isDarkMode={isDarkMode} />
          ))}
        </div>
      )

    case "exercise-steps":
      return (
        <div className={styles.exerciseSteps}>
          <h4 className={styles.exerciseCardTitle}>{item.title}</h4>
          {(item.steps as Array<{ title: string; description: string; tip?: string }>).map((step: { title: string; description: string; tip?: string }, index: number) => (
            <div key={index} className={styles.exerciseStep}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <h5 className={styles.stepTitle}>{step.title}</h5>
                <p className={styles.stepDescription}>{step.description}</p>
                {step.tip && (
                  <div className={styles.stepTip}>
                    <span className={styles.tipIcon}>💡</span>
                    <p>{step.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}

export const NormalFunctions = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'

  const data = NORMAL_FUNCTIONS_DATA[language]

  // Introduction card data
  const introductionData = language === 'no' ? {
    title: "Funksjon",
    subtitle: "Bekkenbunnens funksjon under graviditet og fødsel",
    content: [
      "Under graviditet og fødsel skjer det endringer i bekkenbunnen som kan påvirke naturlige funksjoner som vannlatning, avføring og seksualfunksjon.",
      "De fleste endringene er vanlige og vil normalisere seg selv. Noen endringer kan oppleves plagsomme og trenger en mer aktiv tilnærming, enten igjennom tiltak du kan gjøre selv eller gjennom oppfølging av helsevesenet. Dersom plagene går ut over daglige gjøremål og livskvalitet bør du søke hjelp. På disse sidene finnes oversikt over vanlige plager, råd og behandling.",
      "Læreboken inneholder utfyllende og samlet informasjon."
    ],
    image: {
      src: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/topp2-1024x514.jpg",
      alt: "Bekkenbunnens anatomi under graviditet",
      caption: "Oversikt over bekkenbunnens funksjon"
    }
  } : {
    title: "Function",
    subtitle: "Pelvic Floor Function During Pregnancy and Birth",
    content: [
      "During pregnancy and birth, changes occur in the pelvic floor that can affect natural functions such as urination, defecation, and sexual function.",
      "Most changes are normal and will normalize on their own. Some changes can be experienced as troublesome and need a more active approach, either through measures you can do yourself or through follow-up by the healthcare system. If the problems affect daily activities and quality of life, you should seek help. These pages provide an overview of common problems, advice and treatment.",
      "The textbook contains comprehensive and collected information."
    ],
    image: {
      src: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/topp2-1024x514.jpg",
      alt: "Pelvic floor anatomy during pregnancy",
      caption: "Overview of pelvic floor function"
    }
  }

  return (
    <div id="normal-functions" className={styles.normalFunctionsContainer}>
      {/* Introduction Card */}
      <div className={styles.introductionCard}>
        <div className={styles.introCardContent}>
          <h1 className={styles.introCardTitle}>{introductionData.title}</h1>
          <h2 className={styles.introCardSubtitle}>{introductionData.subtitle}</h2>

          <div className={styles.introCardText}>
            {introductionData.content.map((paragraph, index) => (
              <p key={index} className={styles.introCardParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.introCardImage}>
          <img
            src={introductionData.image.src}
            alt={introductionData.image.alt}
            loading="lazy"
          />
          <p className={styles.introImageCaption}>{introductionData.image.caption}</p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className={styles.sectionsContainer}>
        {data.sections.map((section) => (
          <SectionAccordion
            key={section.id}
            title={section.title}
            isDarkMode={isDarkMode}
            defaultOpen={section.id === 'anatomy'}
          >
            <div className={styles.sectionContent}>
              {section.content.map((item, index) => (
                <ContentRenderer key={index} item={item} styles={styles} isDarkMode={isDarkMode} />
              ))}
            </div>
          </SectionAccordion>
        ))}
      </div>
    </div>
  )
}