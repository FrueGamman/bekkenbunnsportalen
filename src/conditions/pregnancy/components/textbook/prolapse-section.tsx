"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import { TrendingDown } from 'lucide-react'
import styles from "../section-content.module.css"

const prolapseData = {
  no: {
    title: "Underlivsframfall/prolaps",
    
    sections: [
      {
        title: "Hva er framfall?",
        content: "Genitalt prolaps kalles på norsk framfall eller nedsenkning av underlivsorganer. Prolaps skyldes svekket bindevev og muskulatur i bekkenbunnen som gir et slakkere \"opphengsapparat\". Dette fører til at organene synker ned. Lett grad av framfall er normalt og vanlig under graviditet og etter fødsel. I de fleste tilfeller vil dette gå tilbake av seg selv i løpet av barseltiden og det første året etter fødselen. Endringer i hormonbalansen etter avsluttet amming vil også bidra til normalisering av slimhinner og bindevev. Framfall i underlivet regnes ikke som en farlig tilstand."
      },
      {
        title: "Årsak",
        content: [
          "Årsaken til prolaps er i de fleste tilfeller knyttet til endringer i bekkenbunnsmuskulatur og bindevev etter svangerskap og fødsel. Ofte er det ikke mulig å peke på en enkelt årsak. Man vet at varighet av trykketid i fødsel og barnets fødselsvekt spiller inn. Bruk av tang ved forløsning er vist å gi høyere risiko for å utvikle fremfall, enn bruk av sugekopp.",
          "Svangerskap og fødsel er hovedårsak til prolaps, men tilstanden melder seg i mange tilfeller når østrogenproduksjonen avtar etter overgangsalderen."
        ]
      },
      {
        title: "Ulike typer prolaps",
        types: [
          {
            name: "Uterusprolaps/livmorframfall",
            image: {
              src: "/nyeste-kvinnelig-uterusprolaps-300x266.jpg",
              alt: "Uterusprolaps/livmorframfall",
              caption: "Illustrasjon av uterusprolaps"
            },
            symptoms: [
              "Tyngdefølelse i underlivet",
              "Følelse av at noe buler ut gjennom skjedeåpningen",
              "Synlig kul i skjedeåpningen",
              "Problemer med å gjennomføre samleie",
              "Problemer med å tømme blæren",
              "Lekkasje av urin",
              "Sårhet"
            ]
          },
          {
            name: "Cystocele/framfall av blære",
            image: {
              src: "/nyeste-kvinnelig-blaereprolaps-300x265.jpg",
              alt: "Cystocele/framfall av blære",
              caption: "Illustrasjon av cystocele"
            },
            symptoms: [
              "Tyngdefølelse i underlivet",
              "Følelse av at noe buler ut gjennom skjedeåpningen",
              "Synlig kul i skjedeåpningen",
              "Tømmingsproblemer for urin",
              "Urinlekkasje"
            ]
          },
          {
            name: "Enterocele/framfall av tynntarm",
            image: {
              src: "/entrocele-300x263.jpg",
              alt: "Enterocele/framfall av tynntarm",
              caption: "Illustrasjon av enterocele"
            },
            symptoms: [
              "Tømmingsproblemer for avføring"
            ]
          },
          {
            name: "Rectocele/utbukning av endetarm",
            image: {
              src: "/nyeste-kvinnelig-rectocele-300x264.jpg",
              alt: "Rectocele/utbukning av endetarm",
              caption: "Illustrasjon av rectocele"
            },
            symptoms: [
              "Tømmingsproblemer for avføring",
              "Må trykke med finger mot bakre skjedevegg for å få ut avføringen",
              "Følelse av utbuling gjennom skjedeåpningen",
              "Synlig kul i skjedeåpningen",
              "Ubehag under samleie"
            ]
          },
          {
            name: "Rectumprolaps/framfall av endetarm",
            image: {
              src: "/nyeste-kvinnelig-rektumprolaps-300x266.jpg",
              alt: "Rectumprolaps/framfall av endetarm",
              caption: "Illustrasjon av rectumprolaps"
            },
            symptoms: [
              "Ufullstendig og hyppig tømming av avføring",
              "Avføringslekkasje",
              "Synlig kul i endetarmsåpningen"
            ]
          }
        ]
      },
      {
        title: "Råd og behandling",
        intro: "Lett grad av framfall er normalt og vanlig under graviditet og etter fødsel. I de fleste tilfeller vil dette gå tilbake av seg selv i løpet av barseltiden og det første året etter fødselen. Endringer i hormonbalansen etter avsluttet amming vil også føre til bedring.",
        subsections: [
          {
            subtitle: "Råd til selvhjelp",
            intro: "Mange av symptomene kan bedres ved hjelp av enkle tiltak:",
            items: [
              {
                text: "",
                linkText: "Bekkenbunnstrening",
                url: "/useful?tab=pasientundervisning",
                textAfter: " kan være god behandling for lett grad av framfall, tyngdefølelse, lekkasjesymptomer samt forebygge tilbakefall."
              },
              {
                text: "",
                linkText: "Regulering av avføringskonsistens",
                url: "/conditions/pregnancy?section=textbook#bowel-function",
                textAfter: " kan være gunstig både for tømmingsproblemer og for lekkasje av avføring."
              },
              {
                text: "",
                linkText: "Assistert tarmtømming",
                url: "/conditions/pregnancy?section=textbook#bowel-function",
                textAfter: " ved tømmingsproblemer for avføring. Ballongssprøyte (størrelse 10) og klyster (mini-, olje- eller saltvannsklyster) kan forsøkes og kjøpes reseptfritt på apoteket."
              },
              {
                text: "Økt fokus på ",
                linkText: "god blæretømming",
                url: "/conditions/pregnancy?section=textbook#bladder-function",
                textAfter: " ved å ta seg god tid, slappe av i bekkenbunnen samt \"dobbel-tisse\"."
              }
            ]
          },
          {
            subtitle: "Når søke hjelp",
            content: "Ved manglende effekt av råd til selvhjelp og plagene påvirker hverdagslivet og livskvaliteten, bør fastlege oppsøkes for utredning og behandling. Søk også hjelp dersom synlig kul i skjede eller endetarm."
          },
          {
            subtitle: "Andre konservative tiltak",
            items: [
              {
                text: "",
                linkText: "Østrogenkrem/stikkpiller",
                url: "https://www.helsenorge.no/seksualitet-og-samliv/overgangsalderen/lokale-ostrogener/"
              },
              {
                text: "Pessarring. Dette er en myk plastring som blir tilpasset hos lege/gynekolog. Den blir lagt inn i skjeden og skal ligge der kontinuerlig. Du skal ikke kjenne at du har den innvendig. Den virker ved å løfte opp framfallet slik at du blir kvitt følelsen av kul i skjedeåpningen og eventuelle andre plager som fremfallet gir deg. Det er nødvendig å kontrollere noen ganger i året at ringen ligger som den skal og ikke skaper gnagsår. Kvinner som bruker en slik ring, anbefales å bruke østrogen krem/stikkpiller for å forhindre gnagsår i skjedens slimhinner."
              },
              {
                text: "",
                linkText: "Engangskateterisering",
                url: "https://www.lommelegen.no/sykdom/tommingsproblemer-for-urin-voksne/behandling/engangskateterisering-av-blaeren",
                textAfter: " av blæren"
              },
              {
                text: "",
                linkText: "Transanal irrigasjon",
                url: "/useful?tab=pasientundervisning",
                textAfter: " av tarmen"
              }
            ]
          },
          {
            subtitle: "Kirurgisk behandling",
            intro: "Noen tilstander krever kirurgi uten forutgående konservativ behandling. Ved framfall er det nødvendig med grundig utredning med tverrfaglig fokus hvor både gynekolog og gastrokirurg er involvert. Det er kvinnens individuelle tilstand og behov som skal ligge til grunn for valg av operasjonsmetode. Kvinner som planlegger flere barn frarådes operasjon for underlivsframfall.",
            content: "Dette er en oversikt over de vanligste operasjoner for underlivsframfall. Operasjonen kan bestå av et av punktene under eller en kombinasjon av flere:",
            items: [
              "Fremre skjedevegg blir strammet opp og blæren blir løftet til sin naturlige plass (fremre kolporafi, for cystocele)",
              "Forkorte livmorhalsen eller fjerne livmor og livmorhalsen (cervix amputasjon, total/subtotal hysterektomi, for uterusprolaps)",
              "Bakre skjedevegg blir strammet opp (bakre kolporafi, for rectocele)",
              "Musklene i mellomkjøttet blir trukket sammen for å styrke bakre skjedevegg og få bedre høyde på mellomkjøttet (kolpoperineorafi, for rectocele)",
              "Kombinasjon av forkorting av livmorhals, oppstramming av fremre/bakre skjedevegg og oppbygging av mellomkjøttet (manchesterplastikk, kombinasjonstilstand)",
              "Ved nedsunken livmor/livmortapp eller skjedetopp etter fjerning av livmor, kan den festes til bindevevsstrukturer i bekkenveggen via skjeden (spinafiksasjon) eller med nett på innsiden av halebeinet via kikkhullskirurgi (kolposakropeksi, kombinasjonstilstand)",
              "Innleggelse av nett som heiser opp endetarmen mot bakre bukvegg via kikkhullskirurgi (lapraskopisk ventral rectopeksi, ved rectumprolaps)"
            ]
          }
        ]
      }
    ]
  },
  en: {
    title: "Pelvic Organ Prolapse",
    
    sections: [
      {
        title: "What is Prolapse?",
        content: "Genital prolapse is called pelvic organ descent or prolapse in Norwegian. Prolapse is caused by weakened connective tissue and muscles in the pelvic floor which creates a looser \"suspension system\". This causes the organs to descend. A mild degree of prolapse is normal and common during pregnancy and after childbirth. In most cases, this will resolve on its own during the postpartum period and the first year after birth. Changes in hormonal balance after breastfeeding ends will also contribute to normalization of mucous membranes and connective tissue. Pelvic organ prolapse is not considered a dangerous condition."
      },
      {
        title: "Cause",
        content: [
          "The cause of prolapse is in most cases related to changes in pelvic floor muscles and connective tissue after pregnancy and childbirth. Often it is not possible to point to a single cause. It is known that the duration of pushing time during birth and the baby's birth weight play a role. The use of forceps during delivery has been shown to give a higher risk of developing prolapse than the use of vacuum extraction.",
          "Pregnancy and childbirth are the main causes of prolapse, but the condition often appears when estrogen production decreases after menopause."
        ]
      },
      {
        title: "Different Types of Prolapse",
        types: [
          {
            name: "Uterine prolapse",
            image: {
              src: "/nyeste-kvinnelig-uterusprolaps-300x266.jpg",
              alt: "Uterine prolapse",
              caption: "Illustration of uterine prolapse"
            },
            symptoms: [
              "Feeling of heaviness in the pelvis",
              "Feeling that something is bulging through the vaginal opening",
              "Visible bulge in the vaginal opening",
              "Problems having intercourse",
              "Problems emptying the bladder",
              "Urinary leakage",
              "Soreness"
            ]
          },
          {
            name: "Cystocele/bladder prolapse",
            image: {
              src: "/nyeste-kvinnelig-blaereprolaps-300x265.jpg",
              alt: "Cystocele/bladder prolapse",
              caption: "Illustration of cystocele"
            },
            symptoms: [
              "Feeling of heaviness in the pelvis",
              "Feeling that something is bulging through the vaginal opening",
              "Visible bulge in the vaginal opening",
              "Urinary emptying problems",
              "Urinary leakage"
            ]
          },
          {
            name: "Enterocele/small bowel prolapse",
            image: {
              src: "/entrocele-300x263.jpg",
              alt: "Enterocele/small bowel prolapse",
              caption: "Illustration of enterocele"
            },
            symptoms: [
              "Bowel emptying problems"
            ]
          },
          {
            name: "Rectocele/rectal bulge",
            image: {
              src: "/nyeste-kvinnelig-rectocele-300x264.jpg",
              alt: "Rectocele/rectal bulge",
              caption: "Illustration of rectocele"
            },
            symptoms: [
              "Bowel emptying problems",
              "Need to press with finger against posterior vaginal wall to evacuate stool",
              "Feeling of bulging through the vaginal opening",
              "Visible bulge in the vaginal opening",
              "Discomfort during intercourse"
            ]
          },
          {
            name: "Rectal prolapse",
            image: {
              src: "/nyeste-kvinnelig-rektumprolaps-300x266.jpg",
              alt: "Rectal prolapse",
              caption: "Illustration of rectal prolapse"
            },
            symptoms: [
              "Incomplete and frequent bowel movements",
              "Fecal leakage",
              "Visible bulge in the anal opening"
            ]
          }
        ]
      },
      {
        title: "Advice and Treatment",
        intro: "A mild degree of prolapse is normal and common during pregnancy and after childbirth. In most cases, this will resolve on its own during the postpartum period and the first year after birth. Changes in hormonal balance after breastfeeding ends will also lead to improvement.",
        subsections: [
          {
            subtitle: "Self-help Advice",
            intro: "Many of the symptoms can be improved with simple measures:",
            items: [
              {
                text: "",
                linkText: "Pelvic floor training",
                url: "/useful?tab=pasientundervisning",
                textAfter: " can be good treatment for mild prolapse, feeling of heaviness, leakage symptoms, and prevent recurrence."
              },
              {
                text: "",
                linkText: "Regulation of stool consistency",
                url: "/conditions/pregnancy?section=textbook#bowel-function",
                textAfter: " can be beneficial for both emptying problems and fecal leakage."
              },
              {
                text: "",
                linkText: "Assisted bowel emptying",
                url: "/conditions/pregnancy?section=textbook#bowel-function",
                textAfter: " for bowel emptying problems. Bulb syringe (size 10) and enemas (mini-, oil- or saline enemas) can be tried and purchased over-the-counter at pharmacies."
              },
              {
                text: "Increased focus on ",
                linkText: "good bladder emptying",
                url: "/conditions/pregnancy?section=textbook#bladder-function",
                textAfter: " by taking your time, relaxing the pelvic floor, and \"double voiding\"."
              }
            ]
          },
          {
            subtitle: "When to Seek Help",
            content: "If self-help advice is not effective and the complaints affect daily life and quality of life, a general practitioner should be consulted for evaluation and treatment. Also seek help if there is a visible bulge in the vagina or rectum."
          },
          {
            subtitle: "Other Conservative Measures",
            items: [
              {
                text: "",
                linkText: "Estrogen cream/suppositories",
                url: "https://www.helsenorge.no/seksualitet-og-samliv/overgangsalderen/lokale-ostrogener/"
              },
              {
                text: "Pessary ring. This is a soft plastic ring that is fitted by a doctor/gynecologist. It is inserted into the vagina and should remain there continuously. You should not feel that you have it inside. It works by lifting up the prolapse so that you get rid of the feeling of a bulge in the vaginal opening and any other complaints that the prolapse gives you. It is necessary to check a few times a year that the ring is positioned correctly and does not create pressure sores. Women who use such a ring are recommended to use estrogen cream/suppositories to prevent pressure sores in the vaginal mucosa."
              },
              {
                text: "",
                linkText: "Intermittent catheterization",
                url: "https://www.lommelegen.no/sykdom/tommingsproblemer-for-urin-voksne/behandling/engangskateterisering-av-blaeren",
                textAfter: " of the bladder"
              },
              {
                text: "",
                linkText: "Transanal irrigation",
                url: "/useful?tab=pasientundervisning",
                textAfter: " of the bowel"
              }
            ]
          },
          {
            subtitle: "Surgical Treatment",
            intro: "Some conditions require surgery without prior conservative treatment. In cases of prolapse, thorough evaluation with multidisciplinary focus involving both gynecologist and gastrointestinal surgeon is necessary. The woman's individual condition and needs should form the basis for choice of surgical method. Women planning more children are advised against surgery for pelvic organ prolapse.",
            content: "This is an overview of the most common operations for pelvic organ prolapse. The operation may consist of one of the points below or a combination of several:",
            items: [
              "Anterior vaginal wall is tightened and the bladder is lifted to its natural position (anterior colporrhaphy, for cystocele)",
              "Shorten the cervix or remove the uterus and cervix (cervix amputation, total/subtotal hysterectomy, for uterine prolapse)",
              "Posterior vaginal wall is tightened (posterior colporrhaphy, for rectocele)",
              "The muscles in the perineum are pulled together to strengthen the posterior vaginal wall and achieve better height of the perineum (colpoperineorrhaphy, for rectocele)",
              "Combination of cervix shortening, tightening of anterior/posterior vaginal wall and reconstruction of the perineum (Manchester procedure, combination condition)",
              "For descended uterus/cervical stump or vaginal vault after removal of uterus, it can be attached to connective tissue structures in the pelvic wall via the vagina (sacrospinous fixation) or with mesh on the inside of the tailbone via laparoscopy (colposacropexy, combination condition)",
              "Insertion of mesh that lifts the rectum towards the posterior abdominal wall via laparoscopy (laparoscopic ventral rectopexy, for rectal prolapse)"
            ]
          }
        ]
      }
    ]
  }
} as const

export const ProlapseSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = prolapseData[language]

  return (
    <>
        {data.sections.map((section: any, index: number) => (
          <SectionAccordion
            key={index}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {/* Intro paragraph */}
              {section.intro && !section.types && (
                <p className={styles.enhancedParagraph} style={{ marginBottom: '20px' }}>
                  {section.intro}
                </p>
              )}

              {/* Content - can be string or array */}
              {section.content && (
                Array.isArray(section.content) ? (
                  section.content.map((paragraph: string, pIndex: number) => (
                    <p key={pIndex} className={styles.enhancedParagraph}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className={styles.enhancedParagraph}>
                    {section.content}
                  </p>
                )
              )}

              {/* Types of prolapse with symptoms */}
              {section.types && section.types.map((type: any, tIndex: number) => (
                <div key={tIndex} style={{ marginTop: tIndex > 0 ? '32px' : '0', marginBottom: '24px' }}>
                  <h5 className={styles.subsectionHeading} style={{ 
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {type.name}
                  </h5>
                  
                  {/* Image and symptoms in row layout */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '24px',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'
                  }}>
                    {/* Image for this type */}
                    {type.image && (
                      <figure style={{
                        margin: '0',
                        flex: '0 0 300px',
                        minWidth: '250px',
                        textAlign: 'center'
                      }}>
                        <img
                          src={type.image.src}
                          alt={type.image.alt}
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
                          {type.image.caption}
                        </figcaption>
                      </figure>
                    )}
                    
                    {/* Symptoms list */}
                    <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                      <h6 className={styles.contentSubheading} style={{
                        margin: '0 0 12px 0',
                        color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                      }}>
                        {language === 'no' ? 'Symptomer:' : 'Symptoms:'}
                      </h6>
                      <ul className={styles.resourceList}>
                        {type.symptoms.map((symptom: string, sIndex: number) => (
                          <li key={sIndex} className={styles.resourceListItem}>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {/* Subsections for treatment section */}
              {section.subsections && section.subsections.map((subsection: any, sIndex: number) => (
                <div key={sIndex} style={{ marginTop: '24px' }}>
                  <h5 className={styles.subsectionHeading} style={{ 
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {subsection.subtitle}
                  </h5>
                  
                  {subsection.intro && (
                    <p className={styles.enhancedParagraph} style={{ marginBottom: '12px' }}>
                      {subsection.intro}
                    </p>
                  )}

                  {subsection.content && (
                    <p className={styles.enhancedParagraph}>
                      {subsection.content}
                    </p>
                  )}

                  {subsection.items && (
                    <ul className={styles.resourceList}>
                      {subsection.items.map((item: any, iIndex: number) => (
                        <li key={iIndex} className={styles.resourceListItem}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              {item.linkText && item.url ? (
                                <>
                                  <a 
                                    href={item.url}
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
                                    {item.linkText}
                                  </a>
                                  {item.textAfter}
                                </>
                              ) : item.link ? (
                                <>
                                  {' '}
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
                              ) : null}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </SectionAccordion>
        ))}
    </>
  )
}

