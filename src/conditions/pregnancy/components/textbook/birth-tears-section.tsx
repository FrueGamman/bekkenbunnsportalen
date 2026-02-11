"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import { Scissors } from 'lucide-react'
import styles from "../section-content.module.css"

const birthTearsData = {
  no: {
    title: "Fødselsrifter",
    intro: "I forbindelse med fødsel er det vanlig at det oppstår rifter i fødselskanalens vev. Fødselsrifter kan oppstå i skjedeveggen, i slimhinnene i skjedeinngangen og ved urinrørsåpningen, i små og store kjønnslepper og i mellomkjøttet. Etter fødsel blir vevet innenfor og utenfor skjedeinngangen undersøkt nøye for å oppdage og bestemme omfanget av fødselsrifter.",
    
    sections: [
      {
        title: "Gradering av fødselsrifter",
        intro: "Fødselshjelperen undersøker lukkemuskelen, mellomkjøttet og bakre skjedevegg ved å kjenne med en finger i endetarmen innenfor lukkemuskelen. De fleste rifter sys på fødestuen av jordmor eller fødselslege. De fleste får ingen varige plager etter fødselsrifter. Dersom utfordringer med lekkasje av luft eller avføring etter en fødselsrift, bør det tas kontakt med lege for videre undersøkelse og hjelp. Lekkasje av luft og avføring kan også være tegn på en fødselsrift mot endetarmen som dessverre ikke ble oppdaget i forbindelse med fødselen.",
        content: [
          "Fødselsrifter er delt inn i fire ulike grader. Det er kun grad 3 og 4 som defineres som alvorlige rifter. Grad 3 og 4 rifter omtales som «sfinkterrifter» og innebærer at lukkemuskelen rundt endetarmen er blitt skadet. Dersom det oppstår alvorlige rifter skal dette repareres på operasjonsstuen og ikke på fødestuen.",
          "Forekomsten av grad 3 og 4 rifter i Norge ligger på 1,6 % (tall fra 2018)."
        ],
        grades: [
          {
            grade: "Grad 1",
            description: "Overfladisk rift i hud i mellomkjøttet (perineum) eller vaginalslimhinne"
          },
          {
            grade: "Grad 2",
            description: "Rift i muskulatur i mellomkjøttet (perineum), men uten rift i den ytre lukkemuskel (ekstern sfinkter)"
          },
          {
            grade: "Grad 3",
            description: "Rift i mellomkjøttet (perineum) som involverer ytre lukkemuskel (analsfinkter)",
            subgrades: [
              "3a: Rift i mindre enn 50 % av ytre lukkemuskel",
              "3b: Rift i mer enn 50 % av ytre lukkemuskel",
              "3c: Rift i ytre og indre del av lukkemuskel"
            ]
          },
          {
            grade: "Grad 4",
            description: "Rift i mellomkjøttet (perineum) som involverer lukkemuskel og endetarmens slimhinne"
          }
        ],
        detailedGrades: [
          {
            title: "Grad 1 fødselsrift",
            content: "I forbindelse med vaginal fødsel vil mindre fødselsrifter (grad 1) oppstå hyppigst. Disse blir sydd umiddelbart. Overfladiske sår blir vanligvis ikke sydd og disse gror fint av seg selv."
          },
          {
            title: "Grad 2 fødselsrift",
            content: "Grad 2 rifter involverer dypere lag i vev og muskulatur. Slike rifter blir sydd slik at muskelvevet som er skadet eller det kommer sammen igjen og mellomkjøttet får tilbake sin normale tykkelse."
          },
          {
            title: "Grad 3-4 fødselsrift",
            content: "Noen få kvinner får dessverre større rifter hvor lukkemuskelen omkring endetarmen blir skadet (grad 3 og 4). Hvis det har oppstått en skade på lukkemuskelen (grad 3-4), skal den repareres innen 6-12 timer etter en fødsel. Operasjonen foregår på operasjonsstuen, vanligvis i ryggbedøvelse. Formålet er å rekonstruere lukkemuskelen og mellomkjøttet slik at kvinnen ikke får plager med lekkasje av luft eller avføring i fremtiden. Kjente risikofaktorer for grad 3 og 4 rifter er førstegangsfødende, mors alder, barnets fødselsvekt og instrumentell forløsning (vakuum og tang). Man kan ikke forutsi hvilken kvinne som får slike rifter til tross at risikofaktorer er kjent. Kvinnen skal få utreise ha mottatt både muntlig og skriftlig informasjon om omfanget av riften og plan for videre oppfølging. Informasjon til pasienter som ved fødsel har fått en skade av endetarmens lukkemuskel er utarbeidet av Norsk gynekologisk forening.",
            link: {
              text: "Informasjon til pasienter som ved fødsel har fått en skade av endetarmens lukkemuskel",
              url: "https://www.legeforeningen.no/contentassets/d3176bad02024b6e9c215c175a801996/pasientinformasjon-om-rifter-og-skader-etter-fodsel_hoeringsutkastogm2025.pdf"
            }
          }
        ]
      },
      {
        title: "Forebygging av fødselsrifter",
        intro: "Det er lagt ned et betydelig arbeid i Norge for å forebygge grad 3 og 4 rifter hos kvinner som føder. Dette har resultert i at forekomsten er halvert fra 2005 og til i dag. I 2018 var prosentandelen på slike rifter 1,6 % i Norge.",
        subsections: [
          {
            subtitle: "Veiledning og støtteteknikk",
            content: [
              "I siste del av fødselen er det nødvendig at kvinnen og fødselshjelper har god kommunikasjon slik at den fødende kan bli veiledet i hvordan det er gunstig å trykke og puste. Det er ikke alltid så lett å følge råd og veiledning når barnets hode presser på i skjedeåpningen, men det er viktig og ha fokus på dette.",
              "Når barnets hode skal trykkes ut gjennom bekkenbunnen og skjedeåpningen, vil jordmor være aktivt støttende med begge hendene sine. Den ene hånden bremser hodets hastighet og den andre hånden støtter mellomkjøttet (perineum) med såkalt «finskegrepet». Finskegrepet er en støtteteknikk som innebærer at fødselshjelper støtter vevet mellom skjeden og endetarmen med en hånd, samtidig som den andre hånden styrer farten på barnets hode og skulder.",
              "På de aller siste riene er det ønskelig at barnet blir ført sakte frem slik at barnets hode/panne er synlig og blir stående slik over en ri eller to. Dette bidrar til at vevet tøyes slik at faren for større rifter reduseres. Dette gir gjerne en intens smerte, men smertene gir seg imidlertid i det barnets hode er født.",
              "For at fødselshjelperen skal kunne støtte og observere mellomkjøttet, er fødestilling av betydning. Det er flere fine fødestillinger som gir god oversikt over mellomkjøttet, for eksempel halvt sittende i fødeseng, liggende på siden hvor kvinnen får hjelp til å støtte benet eller knestående. Fødselshjelper vil veilede undeveis for å finne en god fødestilling."
            ]
          },
          {
            subtitle: "Episiotomi",
            content: [
              "Episiotomi er utvidelse av skjedeåpningen ved at man legger et klipp i mellomkjøttet. Et klipp gjøres kontrollert for å unngå en større ukontrollert rift og skade i skjedeveggen samt skade på lukkemuskelen i endetarmen. Behovet for episiotomi vurderes underveis i utdrivingsfasen (siste del av fødselen) og et eventuelt klipp legges like før barnets hode fødes. Episiotomi benyttes regelmessig i de tilfeller der barnet må forløses med sugekopp eller tang. Dersom det haster med å få ut barnet og en ikke har tid til og la vevet tøyes tilstrekkelig, må det også klippes. Etter fødselen sys dette klippet igjen."
            ]
          }
        ]
      },
      {
        title: "Sårtilhelingsperioden",
        content: [
          "Små fødselsrifter er vanlig under vaginale fødsler. Noen gror av seg selv, mens andre må sys. Dersom man er blitt sydd, kan stingene føles litt ubehagelig i noen dager etter fødselen. Tråden som er brukt vil løse seg opp og falle av etter to til fire uker. Stingene skal dermed ikke fjernes med mindre de er svært plagsomme. I disse ukene kan det klø litt i området hvor det er sydd. Det anbefales å sørge for god hygiene nedentil. Det bør ikke skrubbes eller vaskes iherdig i området hvor det er sydd, men det anbefales å dusje seg nedentil morgen og kveld, samt etter hver avføring. Klapp underlivet tørt for å unngå irritasjon i stingene. Bind bør skiftes regelmessig.",
          "Det kan svi noe i forbindelse med vannlating dersom urinen kommer i kontakt med sårflaten. Dette er helt normalt. Avføringen kommer vanligvis i gang først et par dager etter fødsel. Ved større rifter vil det tilbys avføringsmiddel like etter fødsel. Dette bør benyttes de første to ukene etter fødsel slik at ikke avføringen blir hard. Unngå å trykke for mye ved toalettbesøk. Det kan oppleves litt smertefullt å ha avføring de første gangene. Ett råd er å skylle området med lunket vann/hånddusj under avføring.",
          "Forsøk å avlaste vevet i underlivet ved å ikke sitte for lenge om gangen, den første uken etter fødsel. Det er en god idé å skifte på ammestillinger, gjerne amme ved å ligge på siden. Vevet i underlivet er blodrikt og godt sirkulert, noe som gjør at sår gror raskt. I løpet av en til to uker vil små rifter være grodd. Tilheling av større rifter vil normalt ta tre til fire uker. Det er ikke uvanlig å ha endret følelse (sensibilitet) i underlivet denne perioden.",
          "Ved plagsomme smerter i underlivet kan smertestillende medikamenter benyttes. Ved skade på endetarmens lukkemuskel og behov for smertestillende anbefaler Norsk gynekologisk forening de to første ukene, bruk av 1 gram paracetamol (Paracet/Panodil) opptil 4 ganger i døgnet. Dette kan suppleres med Ibux 400 mg 3 ganger daglig. Ved sterke smerter eller feber, bør lege eller fødeavdeling kontaktes. Økende smerter kan være tegn på infeksjon eller blodansamlinger i vevet."
        ],
        subsections: [
          {
            subtitle: "Tegn på infeksjon",
            content: "Feber over 38 grader, økende smerte nedentil, illeluktende utflod, rødhet og økende hevelse i underlivet kan være tegn på sårinfeksjon. Dersom slike symptomer bør lege kontaktes. Økende smerte kan også være tegn på blodansamlinger i vevet."
          },
          {
            subtitle: "Tegn på ufullstendig sying/uoppdaget rift",
            content: "Ved symptomer på sårruptur, det vil si at sting går opp og såret \"gaper\", bør man oppsøke lege. Tegn på en slik tilstand kan være som ved tegn på infeksjon. I tillegg kan lekkasje for avføring også være et symptom på sårruptur, eller det kan være en fødselsrift som ikke er blitt oppdaget. Det er viktig at lege oppsøkes slik at skaden kan repareres."
          }
        ],
        seekHelp: {
          title: "Søk hjelp i følgende situasjoner",
          items: [
            "Ved feber",
            "Ved stor hevelse i vevet",
            "Dersom økende sårsmerter",
            "Mistanke om at sår er sprukket opp",
            "Mistanke om uoppdaget fødselsrift (lekkasje av avføring)"
          ]
        }
      },
      {
        title: "Råd om bekkenbunnstrening",
        content: "Det er viktig å komme tidlig i gang med bekkenbunnstrening etter fødsel. Dersom det er oppstått rifter vil både hevelse og sting kunne føre til ubehag i forbindelse med slik trening. Man bør da prøve seg frem, og når det kjennes greit ut bør slik trening gjennomføres daglig. Bekkenbunnstrening fører til økt blodsirkulasjon og bedrer sårtilhelingen.",
        link: {
          text: "Les mer utfyllende om bekkenbunnstrening",
          url: "#pelvic-floor"
        }
      },
      {
        title: "Endring av underlivet",
        content: [
          "Noen opplever at underlivet etter svangerskap og fødsel ikke er helt som før. Mange av endringene er forbigående og vil normalisere seg i løpet av seks til åtte uker etter fødsel. I ammeperioden er muskulatur, bindevev og ligamenter i underlivet under påvirkning av lavt østrogennivå og det kan dermed føles noe \"slappere\". Dette vil bedres etter endt amming. Underlivet kan også oppleves endret utseendemessig, i de fleste tilfeller er dette naturlige endringer.",
          "Dersom lukkemuskelen i endetarmen ikke fungerer kan dette føre til plager i form av manglende kontroll over tarmluft, lekkasje av avføring eller hastverk for å rekke frem til toalettet ved avføringstrang."
        ],
        link: {
          text: "Les mer om avføringslekkasje",
          url: "/conditions/fecal-incontinence"
        }
      }
    ]
  },
  en: {
    title: "Birth Tears",
    intro: "In connection with childbirth, it is common for tears to occur in the birth canal tissue. Birth tears can occur in the vaginal wall, in the mucous membranes at the vaginal opening and at the urethral opening, in the labia minora and majora, and in the perineum. After birth, the tissue inside and outside the vaginal opening is carefully examined to detect and determine the extent of birth tears.",
    
    sections: [
      {
        title: "Grading of Birth Tears",
        intro: "The birth assistant examines the sphincter muscle, perineum and posterior vaginal wall by feeling with a finger in the rectum inside the sphincter muscle. Most tears are sutured in the delivery room by a midwife or obstetrician. Most people do not experience permanent problems after birth tears. If there are challenges with leakage of gas or stool after a birth tear, a doctor should be contacted for further examination and help. Leakage of gas and stool can also be a sign of a birth tear towards the rectum that unfortunately was not discovered during childbirth.",
        content: [
          "Birth tears are divided into four different grades. Only grade 3 and 4 are defined as serious tears. Grade 3 and 4 tears are referred to as \"sphincter tears\" and mean that the sphincter muscle around the rectum has been damaged. If serious tears occur, this should be repaired in the operating room and not in the delivery room.",
          "The incidence of grade 3 and 4 tears in Norway is 1.6% (figures from 2018)."
        ],
        grades: [
          {
            grade: "Grade 1",
            description: "Superficial tear in the skin of the perineum or vaginal mucosa"
          },
          {
            grade: "Grade 2",
            description: "Tear in the musculature of the perineum, but without tear in the external sphincter muscle"
          },
          {
            grade: "Grade 3",
            description: "Tear in the perineum involving the external sphincter muscle (anal sphincter)",
            subgrades: [
              "3a: Tear in less than 50% of the external sphincter muscle",
              "3b: Tear in more than 50% of the external sphincter muscle",
              "3c: Tear in both external and internal parts of the sphincter muscle"
            ]
          },
          {
            grade: "Grade 4",
            description: "Tear in the perineum involving the sphincter muscle and the mucous membrane of the rectum"
          }
        ],
        detailedGrades: [
          {
            title: "Grade 1 Birth Tear",
            content: "In connection with vaginal delivery, minor birth tears (grade 1) occur most frequently. These are sutured immediately. Superficial wounds are usually not sutured and these heal well on their own."
          },
          {
            title: "Grade 2 Birth Tear",
            content: "Grade 2 tears involve deeper layers of tissue and muscles. Such tears are sutured so that the muscle tissue that is damaged comes together again and the perineum regains its normal thickness."
          },
          {
            title: "Grade 3-4 Birth Tear",
            content: "A few women unfortunately experience more severe tears where the sphincter muscle around the rectum is damaged (grade 3 and 4). If damage to the sphincter muscle has occurred (grade 3-4), it should be repaired within 6-12 hours after birth. The operation takes place in the operating room, usually under epidural anesthesia. The purpose is to reconstruct the sphincter muscle and perineum so that the woman does not experience problems with leakage of gas or stool in the future. Known risk factors for grade 3 and 4 tears are first-time mothers, mother's age, baby's birth weight, and instrumental delivery (vacuum and forceps). It is not possible to predict which woman will get such tears even though risk factors are known. The woman should receive both oral and written information about the extent of the tear and a plan for further follow-up before discharge. Information for patients who have sustained damage to the anal sphincter muscle during childbirth has been prepared by the Norwegian Society of Gynecology and Obstetrics.",
            link: {
              text: "Information for patients who have sustained damage to the anal sphincter muscle during childbirth",
              url: "https://www.legeforeningen.no/contentassets/d3176bad02024b6e9c215c175a801996/pasientinformasjon-om-rifter-og-skader-etter-fodsel_hoeringsutkastogm2025.pdf"
            }
          }
        ]
      },
      {
        title: "Prevention of Birth Tears",
        intro: "Considerable work has been done in Norway to prevent grade 3 and 4 tears in women giving birth. This has resulted in the incidence being halved from 2005 to today. In 2018, the percentage of such tears was 1.6% in Norway.",
        subsections: [
          {
            subtitle: "Guidance and Support Technique",
            content: [
              "In the last part of childbirth, it is necessary for the woman and birth assistant to have good communication so that the woman giving birth can be guided on how to push and breathe beneficially. It is not always easy to follow advice and guidance when the baby's head is pressing on the vaginal opening, but it is important to focus on this.",
              "When the baby's head is to be pushed out through the pelvic floor and vaginal opening, the midwife will be actively supportive with both hands. One hand slows down the head's speed and the other hand supports the perineum with the so-called \"hands-on technique\". The hands-on technique is a support technique where the birth assistant supports the tissue between the vagina and rectum with one hand, while the other hand controls the speed of the baby's head and shoulders.",
              "During the very last contractions, it is desirable that the baby is brought forward slowly so that the baby's head/forehead is visible and remains so over one or two contractions. This helps the tissue to stretch so that the risk of larger tears is reduced. This usually causes intense pain, but the pain subsides when the baby's head is born.",
              "For the birth assistant to be able to support and observe the perineum, the birthing position is important. There are several good birthing positions that provide a good overview of the perineum, for example semi-sitting in the birthing bed, lying on the side where the woman gets help supporting her leg, or kneeling. The birth assistant will guide along the way to find a good birthing position."
            ]
          },
          {
            subtitle: "Episiotomy",
            content: [
              "Episiotomy is the enlargement of the vaginal opening by making a cut in the perineum. A cut is made in a controlled manner to avoid a larger uncontrolled tear and damage to the vaginal wall as well as damage to the sphincter muscle in the rectum. The need for episiotomy is assessed during the pushing stage (last part of childbirth) and any cut is made just before the baby's head is born. Episiotomy is regularly used in cases where the baby must be delivered with a vacuum cup or forceps. If it is urgent to get the baby out and there is no time to let the tissue stretch sufficiently, a cut must also be made. After birth, this cut is sutured."
            ]
          }
        ]
      },
      {
        title: "Wound Healing Period",
        content: [
          "Small birth tears are common during vaginal deliveries. Some heal on their own, while others must be sutured. If you have been sutured, the stitches may feel slightly uncomfortable for a few days after birth. The thread used will dissolve and fall off after two to four weeks. The stitches should therefore not be removed unless they are very bothersome. During these weeks, the area where it is sutured may itch a bit. It is recommended to ensure good hygiene down there. The area where it is sutured should not be scrubbed or washed vigorously, but it is recommended to shower down there morning and evening, as well as after each bowel movement. Pat the genital area dry to avoid irritation of the stitches. Pads should be changed regularly.",
          "There may be some stinging during urination if the urine comes into contact with the wound surface. This is completely normal. Bowel movements usually start a couple of days after birth. For larger tears, a stool softener will be offered right after birth. This should be used for the first two weeks after birth so that the stool does not become hard. Avoid pushing too much during toilet visits. Having a bowel movement may feel slightly painful the first few times. One tip is to rinse the area with lukewarm water/hand shower during bowel movements.",
          "Try to relieve the tissue in the genital area by not sitting for too long at a time during the first week after birth. It is a good idea to alternate breastfeeding positions, preferably breastfeed while lying on your side. The tissue in the genital area is richly supplied with blood and well circulated, which means that wounds heal quickly. Within one to two weeks, small tears will have healed. Healing of larger tears will normally take three to four weeks. It is not uncommon to have altered sensation (sensitivity) in the genital area during this period.",
          "For bothersome pain in the genital area, pain relief medications can be used. For damage to the rectum's sphincter muscle and need for pain relief, the Norwegian Society of Gynecology recommends for the first two weeks, use of 1 gram paracetamol (Paracet/Panodil) up to 4 times a day. This can be supplemented with Ibux 400 mg 3 times daily. For severe pain or fever, a doctor or maternity ward should be contacted. Increasing pain may be a sign of infection or blood collections in the tissue."
        ],
        subsections: [
          {
            subtitle: "Signs of Infection",
            content: "Fever over 38 degrees, increasing pain down there, foul-smelling discharge, redness and increasing swelling in the genital area may be signs of wound infection. If such symptoms occur, a doctor should be contacted. Increasing pain can also be a sign of blood collections in the tissue."
          },
          {
            subtitle: "Signs of Incomplete Suturing/Undetected Tear",
            content: "If symptoms of wound rupture occur, meaning that stitches come apart and the wound \"gapes\", a doctor should be consulted. Signs of such a condition may be similar to signs of infection. In addition, leakage of stool can also be a symptom of wound rupture, or it may be a birth tear that has not been detected. It is important that a doctor is consulted so that the damage can be repaired."
          }
        ],
        seekHelp: {
          title: "Seek Help in the Following Situations",
          items: [
            "In case of fever",
            "In case of significant swelling in the tissue",
            "If increasing wound pain",
            "Suspicion that wound has ruptured",
            "Suspicion of undetected birth tear (fecal leakage)"
          ]
        }
      },
      {
        title: "Advice About Pelvic Floor Training",
        content: "It is important to start pelvic floor training early after birth. If tears have occurred, both swelling and stitches may cause discomfort in connection with such training. You should then experiment, and when it feels okay, such training should be done daily. Pelvic floor training leads to increased blood circulation and improves wound healing.",
        link: {
          text: "Read more extensively about pelvic floor training",
          url: "#pelvic-floor"
        }
      },
      {
        title: "Changes in the Pelvic Area",
        content: [
          "Some experience that the genital area after pregnancy and childbirth is not quite as before. Many of the changes are temporary and will normalize within six to eight weeks after birth. During the breastfeeding period, muscles, connective tissue and ligaments in the genital area are affected by low estrogen levels and may therefore feel somewhat \"looser\". This will improve after breastfeeding ends. The genital area may also be experienced as changed in appearance, in most cases these are natural changes.",
          "If the sphincter muscle in the rectum does not function, this can lead to problems in the form of lack of control over intestinal gas, fecal leakage or urgency to reach the toilet when feeling the urge to defecate."
        ],
        link: {
          text: "Read more about fecal incontinence",
          url: "/conditions/fecal-incontinence"
        }
      }
    ]
  }
} as const

export const BirthTearsSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = birthTearsData[language]

  return (
    <>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.intro}</p>
          </div>
        </div>

        {data.sections.map((section: any, index: number) => (
          <SectionAccordion
            key={index}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {section.intro && (
                <p className={styles.enhancedParagraph} style={{ marginBottom: '20px' }}>
                  {section.intro}
                </p>
              )}

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

              {/* Grades section */}
              {section.grades && (
                <div style={{ margin: '20px 0' }}>
                  {section.grades.map((grade: any, gIndex: number) => (
                    <div key={gIndex} style={{ 
                      marginBottom: '16px',
                      padding: '12px',
                      background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(5, 56, 112, 0.05)',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                    }}>
                      <strong style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
                        {grade.grade}:
                      </strong>
                      <span style={{ marginLeft: '8px' }}>{grade.description}</span>
                      {/* Subgrades for Grade 3 */}
                      {grade.subgrades && (
                        <ul style={{ 
                          marginTop: '8px', 
                          marginLeft: '24px',
                          listStyleType: 'disc',
                          color: resolvedTheme === 'dark' ? '#e0e0e0' : '#333'
                        }}>
                          {grade.subgrades.map((subgrade: string, sgIndex: number) => (
                            <li key={sgIndex} style={{ marginBottom: '4px' }}>
                              {subgrade}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Detailed Grades subsections */}
              {section.detailedGrades && section.detailedGrades.map((detailGrade: any, dgIndex: number) => (
                <div key={`dg-${dgIndex}`} style={{ marginTop: '24px' }}>
                  <h5 className={styles.subsectionHeading} style={{ 
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {detailGrade.title}
                  </h5>
                  <p className={styles.enhancedParagraph}>
                    {detailGrade.content}
                  </p>
                  {detailGrade.link && (
                    <p className={styles.enhancedParagraph} style={{ marginTop: '12px' }}>
                      <a 
                        href={detailGrade.link.url}
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
                        {detailGrade.link.text}
                      </a>
                    </p>
                  )}
                </div>
              ))}

              {/* Subsections */}
              {section.subsections && section.subsections.map((subsection: any, sIndex: number) => (
                <div key={sIndex} style={{ marginTop: '24px' }}>
                  <h5 className={styles.subsectionHeading} style={{ 
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {subsection.subtitle}
                  </h5>
                  {Array.isArray(subsection.content) ? (
                    subsection.content.map((para: string, pIndex: number) => (
                      <p key={pIndex} className={styles.enhancedParagraph}>
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className={styles.enhancedParagraph}>{subsection.content}</p>
                  )}
                </div>
              ))}

              {/* Seek Help box */}
              {section.seekHelp && (
                <div style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: resolvedTheme === 'dark' ? 'rgba(255, 100, 100, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                  borderRadius: '8px',
                  border: `2px solid ${resolvedTheme === 'dark' ? 'rgba(255, 100, 100, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`
                }}>
                  <h5 className={styles.subsectionHeading} style={{ 
                    marginBottom: '12px',
                    color: resolvedTheme === 'dark' ? '#ff6b6b' : '#dc3545'
                  }}>
                    {section.seekHelp.title}
                  </h5>
                  <ul className={styles.resourceList}>
                    {section.seekHelp.items.map((item: string, iIndex: number) => (
                      <li key={iIndex} className={styles.resourceListItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Link at the end */}
              {section.link && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '20px' }}>
                  <a 
                    href={section.link.url}
                    className={styles.inlineLink}
                    style={{
                      color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
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

