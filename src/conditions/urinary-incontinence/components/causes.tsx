"use client";

import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import { SectionAccordion } from "../../../components/SectionAccordion";
import styles from "./section-content.module.css";

type CauseItem = {
  title: string;
  description: string;
  link?: {
    text: string;
    url: string;
  };
  links?: Array<{
    text: string;
    url: string;
  }>;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  sections?: Array<{
    subtitle: string;
    content: string;
  }>;
};

type CausesData = {
  pageTitle: string;
  intro: {
    quote: string;
    attribution: string;
    description: string;
  };
  temporaryCauses: {
    title: string;
    intro: string;
    causes: CauseItem[];
  };
  pregnancyAgeDiseases: {
    title: string;
    quote: string;
    attribution: string;
    sections: Array<{
      title: string;
      subsections: Array<{
        title: string;
        content: string;
        link?: {
          text: string;
          url: string;
        };
        image?: {
          src: string;
          alt: string;
          caption: string;
        };
        bullets?: string[];
        sections?: Array<{
          subtitle: string;
          content: string;
        }>;
      }>;
    }>;
  };
};

const CAUSES_DATA: Record<'no' | 'en', CausesData> = {
  no: {
    pageTitle: "Årsaker",
    intro: {
      quote: '"Jeg føler meg ikke lenger like mandig som før. Det gjør noe med en å måtte gå med bleier."',
      attribution: "Mann, 63 år",
      description: "Det kan være mange årsaker til urininkontinens, og tilstanden er ofte forårsaket av flere faktorer. Det er derfor viktig med grundig kartlegging av tilstanden og mulige årsaker, slik at behandlingen blir riktig og så god som mulig. Videre kan du lese mer om ulike årsaker til urininkontinens."
    },
    temporaryCauses: {
      title: "Midlertidige årsaker",
      intro: "Midlertidige tilstander kan forårsake urininkontinens, og for å unngå et permanent problem bør de tas alvorlig og behandles så snart det lar seg gjøre.",
      causes: [
        {
          title: "Urinveisinfeksjon",
          description: "Urinveisinfeksjon kan irritere blæra og gi en hyppigere og sterkere trang til å late vannet. Dette hastverket kan føre til urinlekkasje og kan ofte være det eneste tegnet på en slik infeksjon. Flere tegn kan være smerter og svie ved vannlating og illeluktende urin. Det vil være gunstig å øke væskeinntaket for bedre gjennomskylling av urinveiene, samt sørge for at blæra tømmes komplett. Urinveisinfeksjon behandles med antibiotika.",
          link: {
            text: "Mer informasjon om urinveisinfeksjon finnes på helsenorge.no",
            url: "https://helsenorge.no/sykdom/nyrer-og-urinveier/blarekatarr#Symptomer-p%C3%A5-urinveisinfeksjon"
          }
        },
        {
          title: "Medikamenter",
          description: "Det finnes flere medikamenter som kan gi bivirkning i form av urinlekkasje og det kan derfor være nyttig å lese på bivirkningsprofilen til ulike medikamentene, for å kjenne til dette. Vanndrivende medikamenter som for eksempel Furosemid, øker produksjonen av urin og kan føre til raskere fylning av blæra. Urinlekkasje kan inntre som følge av dette. Andre medikamenter som antipsykotiske- og antidepressive legemidler kan også forårsake urininkontinens.",
          image: {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/shutterstock_153864095.jpg",
            alt: "Medikamenter illustrasjon",
            caption: "Illustrasjonsfoto"
          }
        },
        {
          title: "Obstipasjon",
          description: "Obstipasjon, det vil si forstoppelse for avføring, kan påvirke blærefunksjonen. Blære- og tarmfunksjonen har lik nerveforsyning fra sentralnervesystemet og problemer og symptomer på den ene funksjonen kan således også virke inn på den andre. Det er derfor viktig å tenke på at dersom en er plaget med obstipasjon bør dette behandles så godt som mulig for å kunne bedre symptomene fra blæra. For å unngå obstipasjon anbefales daglig aktivitet, rikelig væskeinntak og mer fiber i kosten i form av grove kornprodukter, frukt og grønnsaker.",
          links: [
            {
              text: "tømmingsvansker for avføring",
              url: "/conditions/constipation"
            },
            {
              text: "helsenorge.no",
              url: "https://helsenorge.no/sykdom/mage-og-tarm/forstoppelse"
            }
          ]
        },
        {
          title: "Overdrevet inntak av drikke",
          description: "Anbefalt væskeinntak ligger et sted mellom 1,5–2 liter hver dag. Sterkt overdrevet inntak av vann og annen drikke kan føre til urinlekkasje siden kroppen må skille ut mye væske og dermed blir blæra raskere og oftere full. Overdrevet inntak av vann kan også føre med seg andre bivirkninger, fordi vannet drar med seg saltstoffer ut av kroppen og man kan få ubalanse i disse saltene (hyponatremi).",
          image: {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/shutterstock_137911295.jpg",
            alt: "Nærbilde av væske som blir sjenket oppi et glass fra en grønn flaske",
            caption: "Illustrasjonsfoto"
          },
          link: {
            text: "hyponatremi",
            url: "https://www.legemiddelhandboka.no/T23.3.1/Hyponatremi"
          }
        }
      ]
    },
    pregnancyAgeDiseases: {
      title: "Svangerskap, aldersforandringer og sykdom",
      quote: "Når jeg skal noen steder, skaffer jeg meg alltid en oversikt over hvor toalettene er, fordi når jeg først må på toalettet, har jeg kun et par minutter på meg før det kommer.",
      attribution: "Kvinne, 56 år",
      sections: [
        {
          title: "",
          subsections: [
            {
              title: "Graviditet og fødsel",
              content: "Studier viser at det er en større andel kvinner enn menn som får urinlekkasje i ung alder, og én av årsakene til dette er graviditet og fødsel. Hormonelle forandringer og vekten av å bære et barn kan gjøre musklene som kontrollerer vannlatingen svakere. Selve fødselen kan også påvirke muskelvev og nerver i bekkenet."
            }
          ]
        },
        {
          title: "",
          subsections: [
            {
              title: "Aldersforandringer",
              content: "Hormonelle forandringer, sykdommer og generell aldring av kroppen gjør at sjansen for å få urinlekkasje øker med alderen. Hvis man røyker eller er overvektig øker risikoen ytterligere."
            }
          ]
        },
        {
          title: "Sykdommer",
          subsections: [
            {
              title: "Tilstander hvor livmor fjernes",
              content: "Svulster, blødsningsforstyrrelser og plagsomme muskelknuter (myomer), kan være årsaker til at livmor fjernes (hysterektomi). Livmoren og urinblæra ligger tett opp mot hverandre og støttes opp av samme muskulatur, bindevev og ligamenter. Når livmoren fjernes vil det for noen kunne skje en skade på disse strukturene, som igjen kan føre til urinlekkasje. Problemer med fremfall (prolaps) av organer i bekkenet kan også gi symptomer i form av urinlekkasje.",
              link: {
                text: "hysterektomi",
                url: "https://nhi.no/sykdommer/kvinne/diverse/fjerning-av-livmor-hysterektomi/"
              }
            },
            {
              title: "Forstørret prostata (prostatahyperplasi)",
              content: "Prostata er en kjertel hos menn som omslutter første del av urinrøret. Forstørret prostata er en meget vanlig tilstand hos menn. Prostata vokser hele livet så lenge det produseres/tilføres testosteron. Forstørret prostata kan gi følger som må behandles mer akutt, som urinveisinfeksjon, blærestein og overfylt blære.\n\nMan deler symptomene på forstørret prostata inn i to hovedgrupper; tømmingsproblemer og lagringsproblemer. Tidligere ble slike tilstander kalt \"Prostatisme\", nå benevnes det som LUTS (Lower Urinary Tract Symptoms).",
              sections: [
                {
                  subtitle: "Tømmingsproblemer",
                  content: "Tømmingsproblemer innebærer at man har problemer i tømmingsfasen. Trykket på strålen er svakt og mange må ofte bruke bukpress for å få til å tømme blæra.\n\nSpesielt på morgenen er det vanlig med mange hyppige vannlatinger med like stor mengde hver gang. Dette tyder ofte på at blæra ikke ble skikkelig tømt ved første vannlating som kan skyldes stram blærehalsmuskulatur. Tilstanden kan gi sjenerende etterdrypp av urin ved at noe urin ligger igjen i urinrøret og tømmer seg gradvis ved bevegelse etter endt vannlating."
                },
                {
                  subtitle: "Lagringsproblemer",
                  content: "Lagringsproblemer innebærer problemer i blæras lagringsfase. Man må ofte på toalettet, trangen kan være plutselig og sterk og noen ganger oppstår urinlekkasje pågrunn av økt trykk i blæremuskelen (Detrusor).\n\nSpesielt på natten kan hyppig vannlatingstrang være plagsomt når det hindrer god nattesøvn."
                }
              ]
            },
            {
              title: "Prostatakreft",
              content: "Prostatakreft kan i enkelte tilfeller gi symptomer som nattlig vannlating (nokturi), hyppig vannlatingstrang og problemer med å late vannet. Sammenhengen mellom urinlekkasje og kreft i prostata er først og fremst en konsekvens av langtkommen sykdom eller behandling. Stråling, operasjon eller begge deler, kan gi forandringer som enten kan gi overaktiv blære eller dårligere lukkefunksjon. Selve vevet i og rundt blæra kan også bli irritert og skadet."
            },
            {
              title: "Nevrologiske sykdommer",
              content: "Nevrologsike sykdommer som Ryggmargsskade, Parkinson sykdom, Multippel Sklerose (MS) og hjerneslag kan påvirke nervesystemet slik at man mister kontroll over blærefunksjonen. Symptomene kan være urgency (hastverkstrang) eller stresslekkasje (lekkasje ved hoste/nys/løft og lignende). Det kan også forekomme nedsatt følelse av fylning og vannlatingstrang. I slike tilfeller kan blæren bli overstrukket og få nedsatt funksjon.\n\nAndre tilstander kan bidra til urininkontinens, for eksempel diabetes, depresjon og kronisk hjertesvikt. Røyking, fedme og overvekt kan også disponere for urininkontinens.",
              link: {
                text: "MS",
                url: "https://msveileder.no/artikkel/88/vannlatingsforstyrrelser"
              }
            }
          ]
        }
      ]
    }
  },
  en: {
    pageTitle: "Causes",
    intro: {
      quote: '"I no longer feel as masculine as before. It does something to you to have to wear diapers."',
      attribution: "Man, 63 years old",
      description: "There can be many causes of urinary incontinence, and the condition is often caused by several factors. It is therefore important to thoroughly map the condition and possible causes, so that the treatment becomes correct and as good as possible. Below you can read more about various causes of urinary incontinence."
    },
    temporaryCauses: {
      title: "Temporary Causes",
      intro: "Temporary conditions can cause urinary incontinence, and to avoid a permanent problem they should be taken seriously and treated as soon as possible.",
      causes: [
        {
          title: "Urinary Tract Infection",
          description: "Urinary tract infection can irritate the bladder and cause a more frequent and stronger urge to urinate. This urgency can lead to urinary incontinence and can often be the only sign of such an infection. Other signs may be pain and burning during urination and foul-smelling urine. It will be beneficial to increase fluid intake for better flushing of the urinary tract, and ensure that the bladder is completely emptied. Urinary tract infection is treated with antibiotics.",
          link: {
            text: "More information about urinary tract infection can be found on helsenorge.no",
            url: "https://helsenorge.no/sykdom/nyrer-og-urinveier/blarekatarr#Symptomer-p%C3%A5-urinveisinfeksjon"
          }
        },
        {
          title: "Medications",
          description: "There are several medications that can have side effects in the form of urinary incontinence and it can therefore be useful to read the side effect profile of various medications to be aware of this. Diuretic medications such as Furosemid increase urine production and can lead to faster filling of the bladder. Urinary incontinence can occur as a result of this. Other medications such as antipsychotic and antidepressant drugs can also cause urinary incontinence.",
          image: {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/shutterstock_153864095.jpg",
            alt: "Medications illustration",
            caption: "Illustration photo"
          }
        },
        {
          title: "Constipation",
          description: "Constipation, that is, constipation for bowel movements, can affect bladder function. Bladder and bowel function have the same nerve supply from the central nervous system and problems and symptoms on one function can thus also affect the other. It is therefore important to consider that if you are affected by constipation, this should be treated as well as possible to be able to improve symptoms from the bladder. To avoid constipation, daily activity, ample fluid intake and more fiber in the diet in the form of whole grain products, fruits and vegetables are recommended.",
          links: [
            {
              text: "emptying difficulties for stool",
              url: "/conditions/constipation"
            },
            {
              text: "helsenorge.no",
              url: "https://helsenorge.no/sykdom/mage-og-tarm/forstoppelse"
            }
          ]
        },
        {
          title: "Excessive Intake of Fluids",
          description: "Recommended fluid intake is somewhere between 1.5-2 liters each day. Highly excessive intake of water and other drinks can lead to urinary incontinence since the body must excrete a lot of fluid and thus the bladder fills faster and more often. Excessive intake of water can also bring other side effects, because the water draws salt substances out of the body and you can get an imbalance in these salts (hyponatremia).",
          image: {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/shutterstock_137911295.jpg",
            alt: "Close-up of liquid being poured into a glass from a green bottle",
            caption: "Illustration photo"
          },
          link: {
            text: "hyponatremia",
            url: "https://www.legemiddelhandboka.no/T23.3.1/Hyponatremi"
          }
        }
      ]
    },
    pregnancyAgeDiseases: {
      title: "Pregnancy, Age Changes and Disease",
      quote: "When I go somewhere, I always get an overview of where the toilets are, because when I first need to go to the toilet, I only have a few minutes before it comes.",
      attribution: "Woman, 56 years",
      sections: [
        {
          title: "",
          subsections: [
            {
              title: "Pregnancy and Childbirth",
              content: "Studies show that there is a larger proportion of women than men who develop urinary incontinence at a young age, and one of the reasons for this is pregnancy and childbirth. Hormonal changes and the weight of carrying a child can weaken the muscles that control urination. Childbirth itself can also affect muscle tissue and nerves in the pelvis."
            }
          ]
        },
        {
          title: "",
          subsections: [
            {
              title: "Age Changes",
              content: "Hormonal changes, diseases and general aging of the body mean that the chance of developing urinary incontinence increases with age. If you smoke or are overweight, the risk increases further.",
              image: {
                src: "/arsaker.jpg",
                alt: "Pregnancy, childbirth and age changes",
                caption: "Illustration photo"
              }
            }
          ]
        },
        {
          title: "Diseases",
          subsections: [
            {
              title: "Conditions where the uterus is removed",
              content: "Tumors, bleeding disorders and bothersome muscle nodes (myomas) can be reasons for removing the uterus (hysterectomy). The uterus and bladder lie close together and are supported by the same musculature, connective tissue and ligaments. When the uterus is removed, damage to these structures may occur for some, which in turn can lead to urinary incontinence. Problems with prolapse of organs in the pelvis can also cause symptoms in the form of urinary incontinence.",
              link: {
                text: "hysterectomy",
                url: "https://nhi.no/sykdommer/kvinne/diverse/fjerning-av-livmor-hysterektomi/"
              }
            },
            {
              title: "Enlarged prostate (prostatic hyperplasia)",
              content: "The prostate is a gland in men that surrounds the first part of the urethra. Enlarged prostate is a very common condition in men. The prostate grows throughout life as long as testosterone is produced/supplied. Enlarged prostate can have consequences that need more acute treatment, such as urinary tract infection, bladder stones and overfilled bladder.\n\nThe symptoms of enlarged prostate are divided into two main groups; emptying problems and storage problems. Previously, such conditions were called \"Prostatism\", now it is referred to as LUTS (Lower Urinary Tract Symptoms).",
              sections: [
                {
                  subtitle: "Emptying problems",
                  content: "Emptying problems mean that you have problems in the emptying phase. The pressure on the stream is weak and many often have to use abdominal pressure to be able to empty the bladder.\n\nEspecially in the morning, it is common to have many frequent urinations with the same amount each time. This often indicates that the bladder was not properly emptied at the first urination, which can be due to tight bladder neck muscles. The condition can cause annoying post-void dribbling when some urine remains in the urethra and empties gradually with movement after urination."
                },
                {
                  subtitle: "Storage problems",
                  content: "Storage problems involve problems in the bladder's storage phase. You often have to go to the toilet, the urge can be sudden and strong and sometimes urinary incontinence occurs due to increased pressure in the bladder muscle (Detrusor).\n\nEspecially at night, frequent urination can be bothersome when it prevents good night sleep."
                }
              ]
            },
            {
              title: "Prostate cancer",
              content: "Prostate cancer can in some cases cause symptoms such as nighttime urination (nocturia), frequent urge to urinate and problems urinating. The connection between urinary incontinence and prostate cancer is primarily a consequence of advanced disease or treatment. Radiation, surgery or both can cause changes that can either cause overactive bladder or poorer closing function. The tissue in and around the bladder can also be irritated and damaged."
            },
            {
              title: "Neurological diseases",
              content: "Neurological diseases such as spinal cord injury, Parkinson's disease, Multiple Sclerosis (MS) and stroke can affect the nervous system so that you lose control over bladder function. Symptoms may be urgency or stress incontinence (leakage when coughing/sneezing/lifting and similar). Reduced sensation of filling and urge to urinate may also occur. In such cases, the bladder can become overstretched and have reduced function.\n\nOther medical conditions can contribute to urinary incontinence, such as diabetes, depression and chronic heart failure. Smoking, obesity and overweight can also predispose to urinary incontinence.",
              link: {
                text: "MS",
                url: "https://msveileder.no/artikkel/88/vannlatingsforstyrrelser"
              }
            }
          ]
        }
      ]
    }
  }
}

export const Causes = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = CAUSES_DATA[language]

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/solae.png"
              alt="Causes"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {/* Intro with quote */}
          <div className={styles.normalFunctionSection}>
            <blockquote className={styles.patientQuote}>
              <p className={styles.quoteText}>{data.intro.quote}</p>
              <footer className={styles.quoteAttribution}>— {data.intro.attribution}</footer>
            </blockquote>
            <p className={styles.enhancedParagraph}>
              {data.intro.description}
            </p>
          </div>

          {/* Temporary Causes */}
          <SectionAccordion 
            title={data.temporaryCauses.title} 
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {data.temporaryCauses.intro}
            </p>

            {data.temporaryCauses.causes.map((cause) => (
              <div key={cause.title} className={styles.normalFunctionSection}>
                <h4 className={styles.normalFunctionTitle}>{cause.title}</h4>
                
                {/* Special layout for sections with images that should be side-by-side */}
                {(cause.title === "Medikamenter" || cause.title === "Medications" || 
                  cause.title === "Overdrevet inntak av drikke" || cause.title === "Excessive Intake of Fluids") && cause.image ? (
                  <div className={styles.sideBySideContainer}>
                    <div className={styles.sideBySideText}>
                      <p className={styles.enhancedParagraph}>
                        {cause.description}
                      </p>
                      
                      {cause.link && (
                        <p className={styles.enhancedParagraph}>
                          <a 
                            href={cause.link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.resourceLink}
                          >
                            {cause.link.text}
                          </a>
                        </p>
                      )}
                    </div>
                    
                    <div className={styles.sideBySideImage}>
                      <img 
                        src={cause.image.src} 
                        alt={cause.image.alt} 
                      />
                      <p className={styles.sideBySideImageCaption}>{cause.image.caption}</p>
                    </div>
                  </div>
                ) : (
                  /* Default layout for other sections */
                  <>
                    <p className={styles.enhancedParagraph}>
                      {cause.description}
                    </p>
                    
                    {cause.link && (
                      <p className={styles.enhancedParagraph}>
                        <a 
                          href={cause.link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.resourceLink}
                        >
                          {cause.link.text}
                        </a>
                      </p>
                    )}
                    
                    {cause.links && (
                      <p className={styles.enhancedParagraph}>
                        Mer informasjon om forstoppelse finner du på siden om {' '}
                        {cause.links.map((link, index) => (
                          <span key={link.url}>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={styles.resourceLink}
                            >
                              {link.text}
                            </a>
                            {index < (cause.links?.length ?? 0) - 1 && ' og '}
                          </span>
                        ))}
                      </p>
                    )}
                    
                    {cause.image && (
                      <div className={styles.anatomyItem}>
                        <img 
                          src={cause.image.src} 
                          alt={cause.image.alt} 
                          className={styles.anatomyImage}
                        />
                        <p className={styles.anatomyCaption}>{cause.image.caption}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </SectionAccordion>

          {/* Pregnancy, Age Changes and Diseases */}
          <SectionAccordion 
            title={data.pregnancyAgeDiseases.title} 
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {/* Quote */}
            <blockquote className={styles.patientQuote}>
              <p className={styles.quoteText}>"{data.pregnancyAgeDiseases.quote}"</p>
              <footer className={styles.quoteAttribution}>— {data.pregnancyAgeDiseases.attribution}</footer>
            </blockquote>

            {/* Sections */}
            {data.pregnancyAgeDiseases.sections.map((section, index) => (
              <div key={section.title || `section-${index}`}>
                {section.title && (
                  <div className={styles.causesMainSectionTitle}>
                    {section.title}
                  </div>
                )}
                
                {section.subsections.map((subsection) => (
                  <div key={subsection.title} className={styles.normalFunctionSection}>
                    <h4 className={styles.normalFunctionTitle}>{subsection.title}</h4>
                    
                    {subsection.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className={styles.enhancedParagraph}>
                        {paragraph}
                        {pIndex === 0 && subsection.link && (
                          <>
                            {' '}(<a 
                              href={subsection.link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={styles.resourceLink}
                            >
                              {subsection.link.text}
                            </a>)
                          </>
                        )}
                      </p>
                    ))}

                    {subsection.sections && subsection.sections.map((section) => (
                      <div key={section.subtitle}>
                        <h5 className={styles.enhancedSubheading}>{section.subtitle}</h5>
                        {section.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className={styles.enhancedParagraph}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ))}

                    {subsection.bullets && (
                      <ul className={styles.bulletList}>
                        {subsection.bullets.map((bullet) => (
                          <li key={bullet.substring(0, 50)} className={styles.enhancedParagraph}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {subsection.image && (
                      <div className={styles.anatomyItem}>
                        <img 
                          src={subsection.image.src} 
                          alt={subsection.image.alt} 
                          className={styles.anatomyImage}
                        />
                        <p className={styles.anatomyCaption}>{subsection.image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </SectionAccordion>
        </div>
      </div>
    </>
  )
}
