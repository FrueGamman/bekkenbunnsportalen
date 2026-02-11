"use client"
import styles from "./section-content.module.css"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from '../../../components/SectionAccordion'

type CauseSection = {
  id: string
  title?: string
  paragraphs?: string[]
  listTitle?: string
  listItems?: string[]
  nestedTitle?: string
  nestedItems?: string[]
  paragraphAfter?: string
  image?: {
    src: string
    alt: string
    caption?: string
  }
}

type CauseGroup = {
  id: string
  introduction?: string
  quote?: {
    text: string
    author: string
  }
  title?: string
  hasSideBySide?: boolean
  sideBySideImage?: {
    src: string
    alt: string
    caption?: string
  }
  sections: CauseSection[]
}

type CausesContent = {
  pageTitle: string
  groups: CauseGroup[]
}

const CAUSES_DATA: Record<"no" | "en", CausesContent> = {
  no: {
    pageTitle: "Årsaker",
    groups: [
      {
        id: "introduction",
        introduction:
          "Det er mange årsaker til analinkontinens, og tilstanden er ofte forårsaket av flere faktorer. Den største enkeltfaktoren er skade på lukkemuskelen som oppstår under vaginal fødsel. Selv om skaden oppdages og repareres med en gang, vil 30-50% få vedvarende lekkasjesymptomer i større eller mindre grad. Dette forklarer hvorfor analinkontinens er 10-20 ganger hyppigere hos kvinner enn menn.\n\nOperasjoner rundt endetarmen og i bekkenet, nevrologiske sykdommer, medikamenter, tarmsykdom som gir løs konsistens, skader etter stråling av kreft, og overgrep er også blant årsakene til avføringslekkasje. Fordi det kan være mange årsaker til inkontinens, er det viktig å kartlegge sykdommen og mulige årsaker, grundig.",
        quote: {
          text: "Etter å ha født mitt yngste barn startet problemene. Jeg kunne stå ved stellebordet, rett ved toalettet og kjenne at det kom, og det måtte bare komme, jeg kunne jo ikke slippe barnet.",
          author: "kvinne, 34 år"
        },
        hasSideBySide: true,
        sideBySideImage: {
          src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/morogbarn-web-600x399.jpg",
          alt: "Mor og barn illustrasjon",
          caption: "Illustrasjonsfoto. Avføringslekkasje er 10-20 ganger hyppigere hos kvinner enn hos menn. Årsaken er skade på lukkemuskelen som oppstår i forbindelse med fødsel."
        },
        sections: [
          {
            id: "story",
            title: "Etter fødsel og bekkenbunnsproblemer",
            paragraphs: [
              "Generelt etter fødsel, og spesielt etter flere fødsler, er det vanlig at man ser at bekkenbunnen synker. Spesielt kan man se at skilleveggen mellom endetarm og skjede blir svakere, noe som kan medføre at deler av endetarmen kan bule inn i skjeden og gi ufrivillig avføringslekkasje."
            ],
            image: {
              src: "/kvinnelig-bekkenbunn.png",
              alt: "Tversnitt av et kvinnelig underliv som viser med piler hvor livmor, tarm, blære, skjede og urinrør er plassert",
              caption: "Tversnitt som viser plassering av bekkenorganene."
            }
          },
          {
            id: "birth-tear",
            title: "Rift (ruptur) under fødsel",
            paragraphs: [
              "Skjedeåpningen og endetarmsåpningen ligger like ved hverandre. Noen ganger kan det oppstå en rift under fødsel som kan innebære en skade på endetarmens lukkemuskler, en såkalt sfinkterruptur. I slike tilfeller er det viktig at skaden blir identifisert og klassifisert på riktig måte."
            ],
            listTitle: "Klassifisering av fødselsrifter",
            listItems: [
              "Grad III: Omfatter skade på perineum, bekkenbunn, skjede og analsfinkter",
              "Grad IIIa: Mindre enn 50 prosent av ytre eksterne sfinkter er skadet",
              "Grad IIIb: Mer enn 50 prosent av ytre eksterne sfinkter er skadet",
              "Grad IIIc: Skade som også omfatter interne sfinkter",
              "Grad IV: Som grad IIIc men i tillegg skade på anal/rectalslimhinne"
            ],
            nestedTitle: "Problemer i etterkant av denne type skade kan være:",
            nestedItems: [
              "lekkasje av luft og/eller avføring",
              "urinlekkasje",
              "smerter i perineum",
              "dyspareuni (smerter under samleie)"
            ],
            paragraphAfter:
              "Ifølge medisinsk fødselsregister fødte i overkant av 53 000 kvinner i 2012. Av disse opplevde i underkant av 1000 å få alvorlig skade på lukkemuskelen. Man regner med at omtrent en tredjedel av disse vil få plager med lekkasje på ett eller annet tidspunkt."
          },
          {
            id: "support-technique",
            title: "Støtteteknikk og forebygging av fødselsrift",
            paragraphs: [
              "Vi vet at det er større risiko for analinkontinens ved større rupturer, enn ved mindre. Korrekt håndtering av riften er også av betydning for risiko for analinkontinens. I Norge har vi i siden 2009 hatt fokus på støtteteknikk under siste del av fødsel. Dette er en teknikk hvor jordmor ser underlivet når barnet kommer ut, og kan med hendene sine støtte og holde på barnets hode og morens mellomkjøtt, for å unngå rift.",
              "Resultatet av praksisen med støtteteknikk har vært at tallet på alvorlige rifter nesten er blitt halvert de siste årene. Finland er foregangsland på dette feltet. Bruken av støtteteknikk har gjort at Finland er det landet i Europa med lavest antall alvorlige rifter.\n Det er altså mulig å redusere sannsynligheten for å få slike rifter. Den nasjonale veilederen i fødselshjelp anbefaler at det benyttes perineumstøtte og hodestøtte ved alle fødsler. For kvinner som skal føde kan dette være et tema som en kan snakke med jordmor om før fødselen. "
            ],
            image: {
              src: "/stotteteknikk-300x231.jpg",
              alt: "Bilde som viser hvordan man avlaster bekkenet under fødsel",
              caption: "Støtteteknikk under siste del av fødselen kan redusere alvorlige rifter."
            }
          },
          {
            id: "pelvic-training",
            title: "Trene bekkenbunnsmuskulaturen",
            paragraphs: [
              "Gjennom å trene bekkenmuskulaturen etter fødsel, uansett om man har fått en skade eller ikke, reduserer man, og kan også helt unngå å bli plaget av, avførings- og urinlekkasje. Lær mer om trening av bekkenbunnsmuskulaturen under konservativ behandling."
            ]
          },
          {
            id: "aftercare",
            title: "Dersom rifter er oppstått",
            paragraphs: [
              "Alle kvinner som har født bør få instruksjon i bekkenbunnstrening av fysioterapeut for å bedre muligheten til å unngå inkontinens. De som har gjennomgått perinealruptur grad 3 og 4 bør ved utreise få med seg informasjonsskriv om skaden, samt tilbys kontroll etter 6–12 måneder hos gynekolog. Dersom kvinnen har symptomer i form av analinkontinens, bør hun utredes videre samt henvises til behandling."
            ]
          }
        ]
      },
      {
        id: "operations",
        title: "Operasjoner",
        sections: [
          
          {
            id: "prostate",
            title: "Prostataoperasjon",
            paragraphs: [
              "Kreft i prostatakjertelen er i dag den hyppigste kreftform blant menn i Norge. Denne kjertelen ligger foran endetarmen og omkranser urinrøret som en mansjett ved utløpet av urinblæren. Operasjoner på prostata medfører inngrep svært nær muskulaturen og nervene som styrer urin og avføring, og det er en risiko for å bli plaget av analinkontinens i etterkant av slike operasjoner."
            ],
            image: {
              src: "/operasjoner-web.jpg",
              alt: "Bilde som viser utsnitt fra en operasjon",
              caption: "Bilde som viser utsnitt fra en operasjon."
            }
          },
          {
            id: "rectal",
            title: "Operasjon i endetarmen",
            paragraphs: [
              "Ved fjerning av fistler eller hemoroider i området rundt endetarmen, kan det komme skade på lukkemuskelen, og man kan i etterkant få problemer med å holde på avføringen.",
              "I tilfeller av svulst eller kreft i endetarmen kan det være nødvendig å fjerne en del av endetarmen. I motsetning til den lange tynntarmen, er endetarmen kort, og en del av lagringskapasiteten blir redusert med et slikt inngrep. Dette kan føre til lekkasjeplager."
            ]
          },
          {
            id: "stoma",
            title: "Utlagt tarm",
            paragraphs: [
              "Etter sykdom eller operasjon er det noen ganger nødvendig å legge ut tarmen midlertidig, det vil si lage en stomi. Når man da etter en tid legger tilbake tarmen, kan det bli problemer med lekkasje av avføring på grunn av at lukkemuskelen ikke har vært aktiv. Plagene er ofte forbigående."
            ]
          },
          {
            id: "radiation",
            title: "Strålebehandling",
            paragraphs: [
              "Kreftsvulster i bekkenet behandles av og til med strålebehandling. Dessverre klarer man ikke å stråle kun kreftcellene. De friske cellene rundt blir også påvirket. Dette kan ha negativ effekt på avføringen. For eksempel kan slimhinnen i endetarmen bli skadet, noe som medfører nedsatt lagringskapasitet i endetarmen. Dette kan føre til lekkasje av avføring."
            ]
          }
        ]
      },
      {
        id: "medication",
        title: "Medikamenter",
        sections: [
          {
            id: "medication",
            title: "Medikamenter",
            paragraphs: [
              "Medikamenter kan påvirke både tarmens funksjon og avføringskonsistensen. Dette kan føre til en diarétilstand, enten som følge av en forstoppelse eller løs avføring. Løs avføring kan disponere for analinkontinens. Eksempler på slike medikamenter er antibiotika, statiner, antidepressiva, morfinpreparater, nevroleptika, laxantia og metformin."
            ]
          }
        ]
      },
      {
        id: "neurological",
        sections: [
          {
            id: "nerves",
            title: "Nevrologiske sykdommer",
            paragraphs: [
              "Lukkemuskelens funksjon styres av nerver som kommer ut fra ryggmargen. Noen sykdommer gir skade på disse nervene, og kan gi plager i form av forstoppelse eller manglende kontroll på avføring og urin. Andre tilstander slik som multippel sklerose, Parkinson og hjerneslag skyldes skader i sentralnervesystemet, og kan også påvirke tarmens bevegelsesmønster og lukkemuskelfunksjonen. Diabetes kan over tid også gi slike plager.",
              "På bildet nedenfor kan du se hvor man får skade ved de ulike sykdommene."
            ],
            image: {
              src: "/nevrologiske-sykdommer.jpg",
              alt: "Illustrasjon av hjernen og nervene og deres sammenheng med tarmen",
              caption: "Oversikt over nevrologiske tilstander som kan påvirke tarmens bevegelsesmønster og lukkemuskelfunksjon."
            }
          }
        ]
      },
      {
        id: "abuse",
        sections: [
          {
            id: "abuse",
            title: "Overgrep",
            paragraphs: [
              "Seksuelle overgrep kan være årsak til fysisk skade på muskler og vev i bekkenbunn, skjede og/eller analåpning. Denne typen skader kan føre til avføringslekkasje. I tillegg fører overgrep ofte til betydelig psykososial belastning som sekundært kan lede til analinkontinens."
            ]
          }
        ]
      }
    ]
  },
  en: {
    pageTitle: "Causes",
    groups: [
      {
        id: "introduction",
        introduction:
          "There are many causes of anal incontinence, and the condition is often caused by multiple factors. The single largest factor is damage to the sphincter that occurs during vaginal delivery. Even when the injury is detected and repaired immediately, 30–50% will experience persistent leakage symptoms to some degree. This explains why anal incontinence is 10–20 times more common in women than in men.",
        quote: {
          text: "After I gave birth to my youngest child, the problems started. I could stand at the changing table, right by the toilet, and feel it coming—and it just had to come; I couldn’t put the baby down.",
          author: "Woman, 34 years"
        },
        sections: [
          {
            id: "overview",
            title: "Overview",
            paragraphs: [
              "Operations around the rectum and pelvis, neurological diseases, medications, bowel disease that causes loose stools, radiation injury from cancer treatment, and abuse are also among the causes of fecal leakage. Because there may be many causes of incontinence, it is important to map the disease and possible causes thoroughly."
            ],
            image: {
              src: "/morogbarn-web.jpg",
              alt: "Mother and child illustration",
              caption: "Illustration. Fecal incontinence is 10–20 times more common in women than in men; sphincter injury at childbirth is a major cause."
            }
          },
          {
            id: "story",
            title: "After childbirth and pelvic floor problems",
            paragraphs: [
              "Generally after childbirth, and especially after multiple deliveries, it is common to see pelvic floor descent. In particular, the partition between the rectum and vagina can become weaker, which may allow parts of the rectum to bulge into the vagina and cause involuntary fecal leakage."
            ],
            image: {
              src: "/kvinnelig-bekkenbunn.png",
              alt: "Cross-section of female pelvic organs",
              caption: "Anatomical illustration showing the female pelvic organs."
            }
          },
          {
            id: "birth-tear",
            title: "Tear (rupture) during childbirth",
            paragraphs: [
              "The vaginal opening and the anal opening are close together. Sometimes a tear (rupture) can occur during childbirth that may involve damage to the anal sphincter. In such cases it is important that the injury is identified and classified correctly."
            ],
            listTitle: "Classification of birth tears",
            listItems: [
              "Grade III: Includes injury to the perineum, pelvic floor, vagina and anal sphincter",
              "Grade IIIa: Less than 50 percent of the external sphincter is damaged",
              "Grade IIIb: More than 50 percent of the external sphincter is damaged",
              "Grade IIIc: Injury that also includes the internal sphincter",
              "Grade IV: As Grade IIIc but additionally damage to the anal/rectal mucosa"
            ],
            nestedTitle: "Problems that may follow this type of injury include:",
            nestedItems: [
              "leakage of gas and/or stool",
              "urinary leakage",
              "pain in the perineum",
              "dyspareunia (pain during intercourse)"
            ],
            paragraphAfter:
              "According to the Medical Birth Registry, just over 53,000 women gave birth in Norway in 2012. Of these, just under 1,000 experienced serious sphincter injury. It is estimated that about one third of these will experience leakage problems at some point."
          },
          {
            id: "support-technique",
            title: "Support technique and prevention of birth tears",
            paragraphs: [
              "We know that there is a greater risk of anal incontinence with larger ruptures than with smaller ones. Correct handling of the rupture is also important for the risk of anal incontinence. In Norway there has been a focus on the support technique during the final stage of labour since 2009.",
              "The technique involves the midwife supporting the perineum and the baby's head to avoid tearing. The use of support technique has almost halved the number of serious ruptures in recent years. Finland is a leading country in this practice."
            ],
            image: {
              src: "/stotteteknikk-300x231.jpg",
              alt: "Support technique during birth",
              caption: "Support technique can reduce serious tears."
            }
          },
          {
            id: "pelvic-training",
            title: "Pelvic floor training",
            paragraphs: [
              "By training the pelvic floor muscles after childbirth, whether or not an injury has occurred, you can reduce and sometimes completely avoid problems with fecal and urinary leakage."
            ]
          },
          {
            id: "aftercare",
            title: "If tears have occurred",
            paragraphs: [
              "All women who have given birth should receive instruction in pelvic floor training from a physiotherapist to improve the chances of avoiding incontinence. Those who have had a perineal rupture grade 3 or 4 should at discharge receive written information about the injury and be offered follow-up after 6–12 months with a gynecologist. If the woman has symptoms of anal incontinence, she should be investigated further and offered treatment."
            ]
          }
        ]
      },
      {
        id: "operations",
        title: "Operations",
        sections: [
          
          {
            id: "prostate",
            title: "Prostate surgery",
            paragraphs: [
              "Prostate cancer is currently the most common cancer among men in Norway. The prostate sits in front of the rectum and surrounds the urethra at the bladder outlet. Surgery on the prostate takes place very close to the muscles and nerves that control urinary and bowel function, and there is a risk of developing anal incontinence afterwards."
            ],
            image: {
              src: "/operasjoner-web.jpg",
              alt: "Surgical illustration",
              caption: "Image showing an operation scene."
            }
          },
          {
            id: "rectal",
            title: "Rectal surgery",
            paragraphs: [
              "Removal of fistulas or hemorrhoids in the area around the rectum can damage the sphincter, and afterwards it may be difficult to hold stool.",
              "In cases of tumours or cancer in the rectum it may be necessary to remove part of the rectum. The rectum is short compared with the long small intestine, and removing a portion reduces storage capacity — which can lead to leakage problems."
            ]
          },
          {
            id: "stoma",
            title: "Temporary stoma",
            paragraphs: [
              "After disease or surgery it is sometimes necessary to create a temporary stoma. When the bowel is reconnected later, leakage problems may occur because the sphincter has been inactive. These problems are often temporary."
            ]
          },
          {
            id: "radiation",
            title: "Radiation therapy",
            paragraphs: [
              "Pelvic tumours are sometimes treated with radiation therapy. Unfortunately, radiation cannot affect only the cancer cells — healthy tissue around the tumour is also affected. This may negatively affect bowel function. For example, the rectal mucosa may be damaged, reducing storage capacity and potentially causing stool leakage."
            ]
          }
        ]
      },
      {
        id: "medication",
        title: "Medication",
        sections: [
          {
            id: "medication",
            title: "Medication",
            paragraphs: [
              "Medications can affect both bowel function and stool consistency. This can lead to diarrhoea, either as a consequence of constipation or loose stools. Loose stools can predispose to anal incontinence. Examples of such medications are antibiotics, statins, antidepressants, opioid preparations, neuroleptics, laxatives and metformin."
            ]
          }
        ]
      },
      {
        id: "neurological",
        sections: [
          {
            id: "nerves",
            title: "Neurological diseases",
            paragraphs: [
              "The function of the sphincter is controlled by nerves that exit the spinal cord. Some diseases damage these nerves and can cause constipation or lack of control over stool and urine. Conditions such as multiple sclerosis, Parkinson's disease and stroke affect the central nervous system and can also influence bowel motility and sphincter function. Diabetes can, over time, also cause similar problems.",
              "The illustration below shows where damage may occur with the different conditions."
            ],
            image: {
              src: "/nevrologiske-sykdommer.jpg",
              alt: "Illustration of the brain and nerves and their connection to the bowel",
              caption: "Overview of neurological conditions that can affect bowel motility and sphincter function."
            }
          }
        ]
      },
      {
        id: "abuse",
        sections: [
          {
            id: "abuse",
            title: "Abuse",
            paragraphs: [
              "Sexual abuse can cause physical damage to muscles and tissues in the pelvic floor, vagina and/or anal opening. These types of injuries can lead to fecal leakage. In addition, abuse often causes significant psychosocial strain which secondarily can lead to anal incontinence."
            ]
          }
        ]
      }
    ]
  }
}

export const Causes = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const content = CAUSES_DATA[language as keyof typeof CAUSES_DATA] ?? CAUSES_DATA.no

  return (
    <>

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/couse.png" alt="Causes" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{content.pageTitle}</h2>
      </div>

      {content.groups.map((group) => {
        const hasIntro = Boolean(group.introduction)
        const hasQuote = Boolean(group.quote)

        return (
          <div key={group.id} className={styles.sectionContent}>
            {hasQuote && group.quote && (
              <div className={styles.highlightBox}>
                <p>{group.quote.text}</p>
                <p className={styles.quoteAuthor}>{group.quote.author}</p>
              </div>
            )}

            {hasIntro && group.introduction && (
              <div className={styles.sectionContainer} style={{marginBottom: '20px', padding: '20px'}}>
                
                {group.hasSideBySide && group.sideBySideImage ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* First paragraph with image side by side */}
                    <div className={styles.anatomyGrid}>
                      <div>
                        <p className={styles.enhancedParagraph}>
                          {group.introduction.split('\n\n')[0]}
                        </p>
                      </div>
                      <div className={styles.anatomyItem}>
                        <img 
                          src={group.sideBySideImage.src} 
                          alt={group.sideBySideImage.alt} 
                          className={styles.anatomyImage}
                        />
                        {group.sideBySideImage.caption && (
                          <p className={styles.anatomyCaption}>
                            {group.sideBySideImage.caption}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Remaining paragraphs below */}
                    {group.introduction.split('\n\n').length > 1 && (
                      <div>
                        <p className={styles.enhancedParagraph}>
                          {group.introduction.split('\n\n').slice(1).join('\n\n')}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className={styles.enhancedParagraph}>{group.introduction}</p>
                )}
              </div>
            )}

            {group.title && (
              <h2 className={styles.causesMainSectionTitle}>{group.title}</h2>
            )}

            {group.sections.map((section) => {
              const hasTextContent = Boolean(
                section.paragraphs?.length ||
                  section.listTitle ||
                  section.listItems?.length ||
                  section.nestedTitle ||
                  section.nestedItems?.length ||
                  section.paragraphAfter
              )

              return (
                <SectionAccordion 
                  key={section.id}
                  title={section.title || ''}
                  isDarkMode={resolvedTheme === 'dark'}
                  defaultOpen={false}
                >
                   {section.image && (section.id === "story" || section.id === "support-technique" || section.id === "prostate" || section.id === "nerves") ? (
                     <div className={styles.anatomyGrid}>
                       <div>
                         {hasTextContent && (
                           <>
                             {section.paragraphs?.map((paragraph) => (
                               <p key={`${section.id}-p-${paragraph.slice(0,40).replace(/\s+/g,'-')}`} className={styles.enhancedParagraph}>
                                 {paragraph}
                               </p>
                             ))}

                             {section.listTitle && (
                               <h4 className={styles.enhancedSubheading}>{section.listTitle}</h4>
                             )}

                             {section.listItems && (
                               <ul className={styles.diagnosisList}>
                                 {section.listItems.map((item) => (
                                   <li key={`${section.id}-li-${item.slice(0,40).replace(/\s+/g,'-')}`}>{item}</li>
                                 ))}
                               </ul>
                             )}

                             {section.nestedTitle && (
                               <h4 className={styles.enhancedSubheading}>{section.nestedTitle}</h4>
                             )}

                             {section.nestedItems && (
                               <ul className={styles.symptomsList}>
                                 {section.nestedItems.map((item) => (
                                   <li key={`${section.id}-nested-${item.slice(0,40).replace(/\s+/g,'-')}`} className={styles.symptomItem}>
                                     <span className={styles.symptomBullet}>•</span>
                                     <span className={styles.symptomText}>{item}</span>
                                   </li>
                                 ))}
                               </ul>
                             )}

                             {section.paragraphAfter && (
                               <p className={styles.enhancedParagraph}>{section.paragraphAfter}</p>
                             )}
                           </>
                         )}
                       </div>
                       <div className={styles.anatomyItem}>
                         <img
                           src={section.image.src}
                           alt={section.image.alt}
                           className={styles.anatomyImage}
                         />
                         {section.image.caption && (
                           <p className={styles.anatomyCaption}>{section.image.caption}</p>
                         )}
                       </div>
                     </div>
                   ) : (
                     <>
                       {hasTextContent && (
                         <>
                           {section.paragraphs?.map((paragraph) => (
                             <p key={`${section.id}-p-${paragraph.slice(0,40).replace(/\s+/g,'-')}`} className={styles.enhancedParagraph}>
                               {paragraph}
                             </p>
                           ))}

                           {section.listTitle && (
                             <h4 className={styles.enhancedSubheading}>{section.listTitle}</h4>
                           )}

                           {section.listItems && (
                             <ul className={styles.diagnosisList}>
                               {section.listItems.map((item) => (
                                 <li key={`${section.id}-li-${item.slice(0,40).replace(/\s+/g,'-')}`}>{item}</li>
                               ))}
                             </ul>
                           )}

                           {section.nestedTitle && (
                             <h4 className={styles.enhancedSubheading}>{section.nestedTitle}</h4>
                           )}

                           {section.nestedItems && (
                             <ul className={styles.symptomsList}>
                               {section.nestedItems.map((item) => (
                                 <li key={`${section.id}-nested-${item.slice(0,40).replace(/\s+/g,'-')}`} className={styles.symptomItem}>
                                   <span className={styles.symptomBullet}>•</span>
                                   <span className={styles.symptomText}>{item}</span>
                                 </li>
                               ))}
                             </ul>
                           )}

                           {section.paragraphAfter && (
                             <p className={styles.enhancedParagraph}>{section.paragraphAfter}</p>
                           )}
                         </>
                       )}

                       {section.image && (
                         <div className={styles.anatomyGrid}>
                           <div className={styles.anatomyItem}>
                             <img
                               src={section.image.src}
                               alt={section.image.alt}
                               className={styles.anatomyImage}
                             />
                             {section.image.caption && (
                               <p className={styles.anatomyCaption}>{section.image.caption}</p>
                             )}
                           </div>
                         </div>
                       )}
                     </>
                   )}
                </SectionAccordion>
              )
            })}
          </div>
        )
      })}
    </div>
    </>
  )
}
