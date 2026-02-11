"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"

const femaleCircumcisionData = {
  no: {
    title: "Kvinnelig omskjæring",
    intro: [
      "Kvinnelig omskjæring er en fellesbetegnelse på ulike typer og grader av inngrep hvor ytre kjønnsdeler fjernes helt eller delvis, eller påføres annen varig skade. Det er tradisjonsbestemte og ikke medisinske eller religiøse årsaker som ligger til grunn for at dette gjøres. Kvinnelig omskjæring er ved lov forbudt i Norge. Det er ikke forbudt å være omskåret.",
      "Det er stor variasjon i kvinnelig omskjæring basert på hvor mye som tas bort og skades. Det deles inn i fire ulike graderinger:"
    ],
    types: [
      {
        type: "Type 1",
        description: "Klitoris er delvis eller fullstendig fjernet. Kan være vanskelig å oppdage."
      },
      {
        type: "Type 2",
        description: "Klitoris og indre kjønnslepper er delvis eller fullstendig fjernet."
      },
      {
        type: "Type 3",
        description: "Innsnevring av skjedeinngangen. Deler av indre og ytre kjønnslepper er fjernet og sydd sammen slik at skjedeåpningen reduseres. Ofte er deler av klitoris også fjernet."
      },
      {
        type: "Type 4",
        description: "Alle andre skadelige inngrep i det kvinnelige kjønnsorganet av ikke-medisinske årsaker, for eksempel prikking, gjennomhulling, skjæring, skraping eller brenning."
      }
    ],
    conclusion: "Kvinnelig omskjæring kan føre til varige plager, spesielt når det gjelder smerter, problemer med vannlatning og seksualfunksjon.",
    
    sections: [
      {
        title: "Oppfølging under svangerskapet",
        content: [
          "Alle gravide kvinner som er omskåret bør få god og tilpasset informasjon om hvilken betydning omskjæringen får for svangerskap, fødsel og barseltid. I Norge anbefales det at kvinner fra land som praktiserer omskjæring allerede på første svangerskapskontroll får spørsmål om de er omskåret og om de er lukket. Jordmor, fastlege eller helsesykepleier vil kunne henvise videre til gynekolog ved behov.",
          "I oppfølgingen vil det være samtale hvor det inngår informasjon om norsk lov i løpet av svangerskap/barseltid, samt kvinnens egen holdning til omskjæring. Dette gjelder også holdningen til omskjæring av egne døtre.",
          "Tolk brukes ved behov."
        ]
      },
      {
        title: "Åpnende inngrep",
        content: [
          "Omskjæring som innebærer lukking av underlivet kalles for infibulering. Åpnende inngrep kalles deinfibulering og består i å fjerne sammensyingen av skjedeinngangen. Det er altså bare kjønnsleppene som blir åpnet, det endres ikke på anatomien innover i skjeden. Muskulaturen i skjeden påvirkes heller ikke.",
          "Det er vanlig at kvinner selv tar kontakt med helsevesenet allerede før et svangerskap for å få utført åpnende inngrep. Det er ulike årsaker til at åpnende inngrep utføres. Dette kan være problemer i form av infeksjoner, seksualliv, smerter og vannlatingsplager. Alle som ønsker det får dette tilbudet. Et slikt tilbud krever ikke henvising og kvinnen kan selv ta kontakt og bestille time. Det finnes mer informasjon om ulike kvinneklinikker som har dette lavterskeltilbudet i brosjyren ",
          "Inngrepet utføres som oftest i lokalbedøvelse. For noen få vil narkose være nødvendig. Dette gjelder spesielt for de som opplever inngrepet som problematisk og hvor det gjenskapes tidligere traumer fra omskjæringen. Ved behov tar man smertestillende medisin etter inngrepet."
        ],
        link: {
          text: "«Omskåret?»",
          url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/06/KLL_BrosjyreOmskaaret_norsk.pdf"
        }
      },
      {
        title: "Åpning i forbindelse med svangerskap",
        content: [
          "For å gjøre fødselen så trygg som mulig ønsker helsepersonell at kvinnen er åpnet i god tid før fødsel. Dette fører til mer ro og oversikt for fødselshjelperen, noe som er viktig for ivaretagelse av både mor og barn.",
          "Ved fødsel vil en lukking hindre vaginal overvåkning av barnet, vanskeliggjøre eventuell blærekateterisering og komplisere fødselen. Åpnende inngrep ser ut til å forebygge mulige komplikasjoner slik som større fødselsrifter, blødninger, langvarige fødsler og akutte keisersnitt.",
          "Eksakt tidspunkt for når åpnende inngrep bør utføres er ikke kjent. Inngrepet utføres med fordel før svangerskap inntrer, eller i god tid før fødselen med unntak av de 16 første svangerskapsukene. Inngrepet kan også gjøres under fødsel. Tidspunkt for åpnende inngrep skal bestemmes i samråd med kvinnen selv. I Norge er det forbudt å sy igjen etter fødsel."
        ]
      },
      {
        title: "Råd etter åpning",
        items: [
          "Skyll underlivet med lunket vann ved toalettbesøk for både smertelindring, holde området rent og forebygge infeksjon",
          "Stingene faller av av seg selv i løpet av to-tre uker",
          "Avstå fra samleie i fire til seks uker etter inngrepet på grunn av infeksjonsfare",
          "Ved behov benytt smertestillende gel eller tabletter etter råd fra lege",
          {
            text: "Bekkenbunnstrening kan føre til bedre kontakt med muskulaturen",
            link: {
              text: "Les mer om bekkenbunnstrening",
              url: "/useful?tab=pasientundervisning"
            }
          },
          "Dersom ønskelig utdeles en attest som beskriver at inngrepet var medisinsk nødvendig",
          "Vanligvis ikke nødvendig med etterkontroll",
          "Ved økte smerter som ikke avtar bør fastlege kontaktes med tanke på sårinfeksjon"
        ]
      },
      {
        title: "Endringer etter åpning",
        intro: "Etter åpnende inngrep vil underlivet oppleves annerledes enn tidligere. Enkelte plager kan bedres.",
        items: [
          "Det er helt vanlig å kjenne seg mer åpen nedentil",
          "Mindre smerter og ubehag som følge av omskjæringen",
          "Større vaginalåpning kan føre til enklere penetrering",
          "Økt seksuell nytelse",
          "Vannlatingen kan føles veldig rask og kraftig, dette er helt normalt",
          "Menstruasjonsblodet kan passere fritt",
          "En får ikke så lett infeksjoner i underlivet"
        ]
      },
      {
        title: "Underlivet etter svangerskap og fødsel",
        content: [
          "Mange kvinner som er blitt åpnet i forbindelse med svangerskap og fødsel opplever større grad av «åpent underliv» i etterkant. Det er da viktig å huske på at det bare er den ytre skjedeinngangen som er åpnet, mens skjeden innover samt muskulaturen ikke er påvirket. Uavhengig av situasjonen omkring kvinnelig omskjæring og åpning, er det vanlig å oppleve at underlivet er endret etter svangerskap og fødsel. Mange av disse endringene henger sammen med at muskulatur, bindevev og ligamenter i underlivet er blitt påvirket. I en ammeperiode vil hormonpåvirkning i form av lavt østrogennivå også påvirke underlivet slik at det kan føles «slappere». De fleste slike endringer er forbigående. Dersom man fortsetter å ha plager er dette noe som bør utredes og behandles.",
          "Illustrasjonene under viser hvordan bekkenbunnen fremstår som et «gulv» og en slynge som er festet i fremre bekkenben og går bakover mot halebeinet. Muskulaturen danner støtte rundt urinrør, skjede og endetarm."
        ],
        images: [
          {
            src: "/fecal-sphincter-side.png",
            alt: "Kvinnelig underliv som viser bekkenbunnen sett ovenfra",
            caption: "Kvinnelig underliv som viser bekkenbunnen sett ovenfra"
          },
          {
            src: "/women's-inside-600x353.jpg",
            alt: "Kvinnelig bekken som viser bekkenbunnen sett fra undersiden",
            caption: "Kvinnelig bekken som viser bekkenbunnen sett fra undersiden"
          }
        ],
        closingText: "For å styrke muskulaturen rundt bekkenorganene, i skjeden samt få økt kontroll over tarmluft, urin og avføring, er det viktig å trene bekkenbunnen. Slik trening gjøres ved hjelp av knipeøvelser som kan leses mer om i eget kapittel om ",
        closingLink: {
          text: "bekkenbunnstrening",
          url: "/useful?tab=pasientundervisning"
        }
      },
      {
        title: "Hvor søke råd og veiledning",
        content: [
          "Det kan være vanskelig å snakke om temaet omskjæring. Under ett svangerskap kan man søke råd og veiledning hos egen lege, jordmor eller gynekolog. I hver helseregion finnes det en kvinneklinikk som har et spesielt ansvar for kvinner og jenter som er omskåret. Du kan ta direkte kontakt eller få henvisning.",
          "Går du på skole kan du også kontakte helsesykepleier i skolehelsetjenesten. Om du trenger det, kan du få tilbud om samtale med psykolog. Tolk bør alltid benyttes ved behov for det.",
          "Du kan finne kontaktinformasjon til de ulike kvinneklinikkene i brosjyren "
        ],
        link: {
          text: "«Omskåret?»",
          url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/06/KLL_BrosjyreOmskaaret_norsk.pdf"
        }
      }
    ]
  },
  en: {
    title: "Female Circumcision",
    intro: [
      "Female circumcision is a collective term for various types and degrees of procedures where external genitalia are completely or partially removed, or subjected to other permanent damage. It is based on traditional and not medical or religious reasons. Female circumcision is prohibited by law in Norway. It is not forbidden to be circumcised.",
      "There is great variation in female circumcision based on how much is removed and damaged. It is divided into four different grades:"
    ],
    types: [
      {
        type: "Type 1",
        description: "Clitoris is partially or completely removed. May be difficult to detect."
      },
      {
        type: "Type 2",
        description: "Clitoris and inner labia are partially or completely removed."
      },
      {
        type: "Type 3",
        description: "Narrowing of the vaginal opening. Parts of the inner and outer labia are removed and sewn together so that the vaginal opening is reduced. Often parts of the clitoris are also removed."
      },
      {
        type: "Type 4",
        description: "All other harmful procedures to the female genital organ for non-medical reasons, such as pricking, piercing, cutting, scraping or burning."
      }
    ],
    conclusion: "Female circumcision can lead to permanent problems, especially regarding pain, urination problems and sexual function.",
    
    sections: [
      {
        title: "Follow-up During Pregnancy",
        content: [
          "All pregnant women who are circumcised should receive good and adapted information about the significance of circumcision for pregnancy, childbirth and the postpartum period. In Norway, it is recommended that women from countries that practice circumcision are asked at the first pregnancy check-up whether they are circumcised and whether they are closed. Midwife, GP or health nurse will be able to refer further to a gynecologist if needed.",
          "The follow-up will include a conversation that includes information about Norwegian law during pregnancy/postpartum period, as well as the woman's own attitude to circumcision. This also applies to attitudes towards circumcision of own daughters.",
          "Interpreter is used when needed."
        ]
      },
      {
        title: "Opening Procedure",
        content: [
          "Circumcision that involves closing the genital area is called infibulation. Opening procedure is called deinfibulation and consists of removing the stitching of the vaginal entrance. So it is only the labia that are opened, the anatomy inside the vagina is not changed. The muscles in the vagina are also not affected.",
          "It is common for women to contact the health service even before a pregnancy to have an opening procedure performed. There are various reasons why opening procedures are performed. This can be problems in the form of infections, sex life, pain and urination problems. Everyone who wants it gets this offer. Such an offer does not require a referral and the woman can contact and book an appointment herself. There is more information about various women's clinics that have this low-threshold service in the brochure ",
          "The procedure is most often performed under local anesthesia. For a few, general anesthesia will be necessary. This applies especially to those who experience the procedure as problematic and where previous traumas from the circumcision are recreated. If needed, pain medication is taken after the procedure."
        ],
        link: {
          text: "«Circumcised?»",
          url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/06/KLL_BrosjyreOmskaaret_norsk.pdf"
        }
      },
      {
        title: "Opening in Connection with Pregnancy",
        content: [
          "To make childbirth as safe as possible, healthcare personnel want the woman to be opened well before birth. This leads to more peace and overview for the birth attendant, which is important for the care of both mother and child.",
          "During birth, a closure will prevent vaginal monitoring of the baby, complicate possible bladder catheterization and complicate the birth. Opening procedures appear to prevent possible complications such as larger birth tears, bleeding, prolonged births and emergency cesarean sections.",
          "The exact time when opening procedures should be performed is not known. The procedure is advantageously performed before pregnancy occurs, or well before birth with the exception of the first 16 weeks of pregnancy. The procedure can also be done during childbirth. The timing of opening procedures shall be determined in consultation with the woman herself. In Norway it is forbidden to sew back together after childbirth."
        ]
      },
      {
        title: "Advice After Opening",
        items: [
          "Rinse the genital area with lukewarm water during toilet visits for both pain relief, keeping the area clean and preventing infection",
          "Stitches fall off by themselves within 2-3 weeks",
          "Abstain from intercourse for 4-6 weeks after the procedure due to infection risk",
          "If needed, use pain-relieving gel or tablets as advised by doctor",
          {
            text: "Pelvic floor training can lead to better contact with the muscles",
            link: {
              text: "Read more about pelvic floor training",
              url: "/useful?tab=pasientundervisning"
            }
          },
          "If desired, a certificate is issued stating that the procedure was medically necessary",
          "Usually no follow-up is necessary",
          "If increased pain that does not subside, contact GP regarding wound infection"
        ]
      },
      {
        title: "Changes After Opening",
        intro: "After opening procedures, the genital area will feel different than before. Some problems may improve.",
        items: [
          "It is completely normal to feel more open below",
          "Less pain and discomfort as a result of circumcision",
          "Larger vaginal opening can lead to easier penetration",
          "Increased sexual pleasure",
          "Urination may feel very fast and powerful, this is completely normal",
          "Menstrual blood can pass freely",
          "Less susceptible to infections in the genital area"
        ]
      },
      {
        title: "The Genital Area After Pregnancy and Childbirth",
        content: [
          "Many women who have been opened in connection with pregnancy and childbirth experience a greater degree of \"open genital area\" afterwards. It is then important to remember that only the external vaginal entrance has been opened, while the vagina inside and the muscles are not affected. Regardless of the situation around female circumcision and opening, it is common to experience that the genital area has changed after pregnancy and childbirth. Many of these changes are related to the fact that muscles, connective tissue and ligaments in the genital area have been affected. During a breastfeeding period, hormonal influence in the form of low estrogen levels will also affect the genital area so that it can feel \"slacker\". Most such changes are temporary. If you continue to have problems, this should be investigated and treated.",
          "The illustrations below show how the pelvic floor appears as a \"floor\" and a sling that is attached to the front pelvic bone and goes back towards the tailbone. The muscles form support around the urethra, vagina and rectum."
        ],
        images: [
          {
            src: "/fecal-sphincter-side.png",
            alt: "Female pelvis showing the pelvic floor seen from above",
            caption: "Female pelvis showing the pelvic floor seen from above"
          },
          {
            src: "/women's-inside-600x353.jpg",
            alt: "Female pelvis showing the pelvic floor seen from below",
            caption: "Female pelvis showing the pelvic floor seen from below"
          }
        ],
        closingText: "To strengthen the muscles around the pelvic organs, in the vagina and gain increased control over intestinal gas, urine and stool, it is important to train the pelvic floor. Such training is done with the help of squeeze exercises which can be read more about in a separate chapter on ",
        closingLink: {
          text: "pelvic floor training",
          url: "/useful?tab=pasientundervisning"
        }
      },
      {
        title: "Where to Seek Advice and Guidance",
        content: [
          "It can be difficult to talk about the topic of circumcision. During pregnancy, you can seek advice and guidance from your own doctor, midwife or gynecologist. In each health region there is a women's clinic that has a special responsibility for women and girls who are circumcised. You can make direct contact or get a referral.",
          "If you are in school, you can also contact the school health nurse. If you need it, you can be offered a conversation with a psychologist. Interpreter should always be used when needed.",
          "You can find contact information for the various women's clinics in the brochure "
        ],
        link: {
          text: "«Circumcised?»",
          url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/06/KLL_BrosjyreOmskaaret_norsk.pdf"
        }
      }
    ]
  }
} as const

export const FemaleCircumcisionSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = femaleCircumcisionData[language]

  return (
    <>
        {/* Introduction */}
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            {data.intro.map((paragraph, index) => (
              <p key={index} className={styles.enhancedParagraph}>
                {paragraph}
              </p>
            ))}

            {/* Types of circumcision */}
            <div style={{ margin: '20px 0' }}>
              {data.types.map((type: any, tIndex: number) => (
                <div key={tIndex} style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(5, 56, 112, 0.05)',
                  borderRadius: '6px',
                  borderLeft: `4px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                }}>
                  <strong style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
                    {type.type}:
                  </strong>
                  <span style={{ marginLeft: '8px' }}>{type.description}</span>
                </div>
              ))}
            </div>

            <p className={styles.enhancedParagraph} style={{ marginTop: '16px' }}>
              {data.conclusion}
            </p>
          </div>
        </div>

        {/* Main sections */}
        {data.sections.map((section: any, sectionIndex: number) => (
          <SectionAccordion
            key={sectionIndex}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {/* Section intro */}
              {section.intro && (
                <p className={styles.enhancedParagraph} style={{ marginBottom: '16px' }}>
                  {section.intro}
                </p>
              )}

              {/* Section content */}
              {section.content && section.content.map((paragraph: string, pIndex: number) => (
                <p key={pIndex} className={styles.enhancedParagraph}>
                  {paragraph}
                  {/* Add link inline if this is the paragraph that needs it */}
                  {section.link && pIndex === section.content.length - 2 && (
                    <a
                      href={section.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {section.link.text}
                    </a>
                  )}
                  {section.link && pIndex === section.content.length - 1 && '.'}
                </p>
              ))}

              {/* Items list */}
              {section.items && (
                <ul className={styles.resourceList}>
                  {section.items.map((item: any, iIndex: number) => (
                    <li key={iIndex} className={styles.resourceListItem}>
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          {item.text}
                          {item.link && (
                            <>
                              {' - '}
                              <a
                                href={item.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                                  textDecoration: 'none',
                                  fontWeight: '500'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                              >
                                {item.link.text}
                              </a>
                            </>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* Images for pelvic floor */}
              {section.images && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  margin: '24px 0'
                }}>
                  {section.images.map((img: any, imgIndex: number) => (
                    <figure key={imgIndex} style={{
                      margin: '0',
                      textAlign: 'center'
                    }}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <figcaption className={styles.responsiveFigcaption} style={{
                        fontStyle: 'italic',
                        color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                      }}>
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {/* Closing text with link */}
              {section.closingText && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '20px' }}>
                  {section.closingText}
                  {section.closingLink && (
                    <>
                      <a
                        href={section.closingLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        {section.closingLink.text}
                      </a>
                      .
                    </>
                  )}
                </p>
              )}

              {/* Link at end of content */}
              {section.link && !section.content && (
                <p className={styles.enhancedParagraph}>
                  <a
                    href={section.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {section.link.text}
                  </a>
                </p>
              )}
            </div>
          </SectionAccordion>
        ))}
    </>
  )
}
