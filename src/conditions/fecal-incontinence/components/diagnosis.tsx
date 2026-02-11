"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

// Bilingual data structure (verbatim content from the old site pages)
const DIAGNOSIS_DATA = {
  no: {
    pageTitle: "Utredning",
    introParagraphs: [
      "For å få best mulig hjelp for inkontinens, må det gjennomføres en grundig utredning av problemene dine. Utredningen tar sikte på å avdekke årsaken til lekkasjeplagene, og en grundig gjennomgang av sykehistorien din er essensiell.",
      "Sentrale spørsmål i denne kartleggingen vil være: Når og i hvilken sammenheng startet lekkasjene? Hvor ofte og hvor mye lekker du?",
      "Utredningen starter med at du kartlegger dine egne plager i en periode, før du bestiller time hos fastlegen. Benytt gjerne en avføringsdagbok for å beskrive plagene og hvordan de påvirker hverdagen. Om nødvendig sender fastlegen deg videre til en spesialist.",
      "Mange med avføringslekkasje har også plager med urinlekkasje og det er viktig at du forteller om dette til behandler."
    ],
    introImage: {
      src: "/eldredame-web.jpg",
      alt: "Eldre dame som ser misfornøyd til siden",
      caption: "Illustrasjonsfoto fra utredningssiden."
    },
    // testimonial will be rendered at the very top (moved in JSX)
    quote: {
      text: "Jeg har hatt lekkasjer i 30 år. Jeg startet i grunnen tidlig med å gå til legen med problemet, men fikk beskjed om at det ikke var noe å gjøre, og dro hjem med resept på bind. Etter å ha vært fire ganger hos legen, fikk jeg resept på antidepressiva, og fortsatt ingen hjelp. Jeg har isolert meg i 30 år, og de andre i bygda synes nok jeg er litt rar, men i virkeligheten kan jeg ikke gå noen steder fordi jeg lekker hele tiden.",
      author: "Kvinne, 70 år"
    },
    resources: [],

    gpSection: {
      title: "Hva gjør fastlegen?",
      paragraphs: [
        "Et viktig skritt mot rett behandling er å få en grundig utredning hos fastlegen. Fastlegen vil undersøke deg, kanskje med rectoskopi hvor legen kan inspisere slimhinnen i endetarmen og nedre del av sigmoideum. Dette gjøres via et smalt, gjennomsiktig rør. For å kunne se på endetarmen må man ligge på en benk med bena i benholdere.",
        "Fastlegen kan henvise deg videre til spesialist. Hos spesialisten kan du få hjelp gjennom ulike typer behandlinger. Det som imidlertid er viktig å påpeke, er at du allerede på dette tidspunktet kan få veiledning til enkle grep som kan starte prosessen med å redusere symptomene."
      ],
      kartlegging: [
        "Antall fødsler? Normal? Problemer?",
        "Har pasienten lekkasje av avføring? Urgency (det vil si manglende evne til å utsette/holde igjen avføring)?",
        "Når og i hvilken forbindelse startet problemet?",
        "Følelse av ufullstendig tømming?",
        "Smerter ved tømming?",
        "Smerter generelt i bekkenbunnen?",
        "Problemer i forbindelse med samleie?",
        "Tidligere kirurgi/stråling i bekkenet?",
        "Tidligere bekkenbunnstrening, biofeedback, elektrostimulering?",
        "Bare luftlekkasje uten urgency? (Kan henvises direkte til bekkenbunnstrening)",
        "Urinlekkasje?",
        "Overgrep?"
      ]
    },

    specialistSection: {
      title: "Hva gjør spesialisten?",
      paragraphs: [
        "Når fastlegen har utredet, og eventuelt kommer frem til at problemet må tas videre for behandling, sender legen en henvisning til spesialist på sykehuset, hvor du kommer til en lege eller sykepleier.",
        "På sykehuset gjør de videre utredning på ulike måter vurdert ut fra opplysninger i henvisningen. Det mest vanlige er at legen kjenner på endetarmen, ser et stykke opp i endetarmen (rectoscopi), og gjør ultralyd av endetarmen for å se om muskelapparatet er intakt. Dette er ofte det første som blir gjort, men det er en rekke andre undersøkelser som kan være aktuelle hvis legen trenger mer informasjon."
      ],
      investigations: [
        "Inspeksjon: Spesialisten vil se og kjenne på området rundt analåpningen, samt kjenne på muskulaturen ytterst i rektum.",
        "Rectoscopi: Legen ser nedre del av tarmen.",
        "Anal ultralyd: Ved hjelp av ekko fra lydbølger får man bilder av rektum, sfinktermuskulaturen (lukkemuskelen) og nærliggende vev.",
        "Sensibilitetsstest: Viser følsomheten for fylling og gir svar på hvor stor mengde avføring endetarmen kan holde.",
        "Defecografi: En røntgenundersøkelse som viser om tykktarmen tømmer seg normalt."
      ],
      afterwords: "Etter å ha undersøkt deg grundig, vurderer spesialisten om det er behov for konservativ behandling eller inngrep.",
      sources: ["Retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser (2019) - NBH"]
    },

    selfTestSection: {
      title: "Test deg selv (St. Marks test)",
      paragraphs: [
        "Gjør de valgene under som passer din situasjon for å ta St. Mark-testen. Du kan skrive ut arket og ta med til din lege.",
        "St. Marks Hospital i England er et sykehus som over lengre tid og med gode resultater har jobbet med mennesker med problemer i bekkenbunnen. De har laget et skjema som kan brukes på alle med analinkontinens for å få en pekepinn på hvordan problemene er.",
        "Det er svært viktig å påpeke at denne testen er et verktøy for helsepersonell, og for å få den korrekt skal det gjøres i samarbeid med erfarent helsepersonell. Det eksisterer per i dag ingen grenseverdi som sier noe om hvor plaget du er, men scoringsskjemaet angir en grad av lekkasje og benyttes til å evaluere endring over tid. 0 tilsvarer ingen lekkasjeplager, mens 24 er fullstendig lekkasje.",
        "Husk: Det skal kun tas hensyn til de 4 siste ukene når man fyller ut testen."
      ],
      note: "Ingen av feltene du fyller inn blir lagret på nettstedet. Du kan skrive ut arket og ta med til din lege."
    }
  },
  en: {
    pageTitle: "Diagnosis",
    introParagraphs: [
      "To get the best possible help for incontinence, a thorough assessment of your problems must be carried out. The assessment aims to reveal the cause of your leakage symptoms, and a thorough review of your medical history is essential.",
      "Key questions in this mapping will be: When and in what context did the leakage start? How often and how much do you leak?",
      "The assessment begins with you mapping your own symptoms for a period before booking an appointment with your GP. Consider using a bowel diary to describe your symptoms and how they affect daily life. If necessary, the GP will refer you to a specialist.",
      "Many people with fecal leakage also have urinary leakage and it is important that you tell your clinician about this."
    ],
    introImage: {
      src: "/eldredame-web.jpg",
      alt: "Older woman looking slightly dissatisfied",
      caption: "Illustration from the diagnosis page."
    },
    quote: {
      text: "I have had leakage for 30 years. I initially went to the doctor about the problem, but was told there was nothing to be done and went home with a prescription for pads. After four visits I was prescribed antidepressants and still received no help. I have isolated myself for 30 years, and people in the village probably think I'm a bit strange, but in reality I cannot go anywhere because I leak all the time.",
      author: "Woman, 70 years"
    },
    resources: [],

    gpSection: {
      title: "What does the GP do?",
      paragraphs: [
        "An important step towards appropriate treatment is a thorough assessment by your GP. The GP will examine you, possibly with rectoscopy where the doctor can inspect the mucosa of the rectum and lower part of the sigmoid colon. This is done using a narrow, transparent tube. To view the rectum you will lie on an examination couch with your legs in supports.",
        "The GP can refer you on to a specialist. At the specialist clinic you can receive different types of treatment. It is important to note that even at this stage you can receive advice on simple measures that may begin to reduce symptoms."
      ],
      kartlegging: [
        "Number of births? Normal? Problems?",
        "Does the patient have fecal leakage? Urgency (inability to defer/hold back bowel movements)?",
        "When and in what context did the problem start?",
        "Feeling of incomplete emptying?",
        "Pain during bowel movements?",
        "General pelvic floor pain?",
        "Problems related to intercourse?",
        "Previous surgery/radiation in the pelvis?",
        "Previous pelvic floor training, biofeedback, electrostimulation?",
        "Only air leakage without urgency? (May be referred directly to pelvic floor training)",
        "Urinary leakage?",
        "Abuse?"
      ]
    },

    specialistSection: {
      title: "What does the specialist do?",
      paragraphs: [
        "When the GP has assessed you and decides that the problem needs specialist assessment, the GP will refer you to a specialist at the hospital where you will see a doctor or nurse.",
        "At the hospital they will perform further investigations based on the referral. The most common first steps are a digital rectal examination, rectoscopy, and endoanal ultrasound to check whether the muscle apparatus is intact. There are a number of other tests that may be used if more information is required."
      ],
      investigations: [
        "Inspection: The specialist will look at and feel the area around the anal opening and palpate the muscles at the end of the rectum.",
        "Rectoscopy: The doctor inspects the lower part of the bowel.",
        "Anal ultrasound: Uses sound echoes to produce images of the rectum, sphincter muscles and adjacent tissue.",
        "Sensory testing: Shows sensitivity for filling and indicates how much stool the rectum can hold.",
        "Defecography: An X-ray examination that shows whether the large bowel empties normally."
      ],
      afterwords: "After thoroughly examining you, the specialist will assess whether conservative treatment or surgery is appropriate.",
      sources: ["Guidelines for assessment and conservative treatment of anorectal dysfunction (2019) - NBH"]
    },

    selfTestSection: {
      title: "Self-test (St. Marks test)",
      paragraphs: [
        "Make the choices below that fit your situation to take the St. Marks test. You can print the sheet and bring it to your clinician.",
        "St. Marks Hospital in England is a hospital that over time and with good results has worked with people with pelvic floor problems. They have developed a questionnaire that can be used for all with anal incontinence to get an indication of how severe the problems are.",
        "It is very important to emphasize that this test is a tool for health professionals, and to be performed correctly it should be done in collaboration with experienced clinicians. There is currently no cut-off value that tells how bothered you are, but the scoring sheet indicates a degree of leakage and is used to evaluate change over time. 0 corresponds to no leakage problems, while 24 is complete leakage.",
        "Remember: Only consider the last 4 weeks when completing the test."
      ],
      note: "None of the fields you fill in are stored on the website. You may print the form and bring it to your clinician."
    }
  }
} as const

export const Diagnosis = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = DIAGNOSIS_DATA[language]
  const introFirst = data.introParagraphs.slice(0, 2)
  const introRest = data.introParagraphs.slice(2)

  return (
    <>

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/solae.png"
            alt="Diagnosis"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            {data.quote && (
              <div className={styles.highlightBox}>
                <p>{data.quote.text}</p>
                <p className={styles.quoteAuthor}>{data.quote.author}</p>
              </div>
            )}

            <div className={styles.sideBySideContainer}>
              <div className={styles.sideBySideText}>
                {introFirst.map((p, i) => (
                  <p key={`intro-${i}`} className={styles.enhancedParagraph}>{p}</p>
                ))}
              </div>

              {data.introImage && (
                <div className={styles.sideBySideImage}>
                  <img src={data.introImage.src} alt={data.introImage.alt} className={styles.sideBySideImageElement} />
                  {data.introImage.caption && <p className={styles.sideBySideImageCaption}>{data.introImage.caption}</p>}
                </div>
              )}
            </div>

            {/* Keep the following paragraphs full-width (unchanged) */}
            {introRest.map((p, i) => (
              <p key={`intro-rest-${i}`} className={styles.enhancedParagraph}>{p}</p>
            ))}

          </div>
        </div>

        <SectionAccordion 
          title={data.gpSection.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          {data.gpSection.paragraphs.map((p, i) => (
            <p key={`gp-p-${i}`} className={styles.enhancedParagraph}>{p}</p>
          ))}

          <h4 className={styles.normalFunctionTitle}>Kartlegging</h4>
          <ul className={styles.resourceList}>
            {data.gpSection.kartlegging.map((item, idx) => (
              <li key={`gp-k-${idx}`} className={styles.resourceListItem}>{item}</li>
            ))}
          </ul>
        </SectionAccordion>

        <SectionAccordion 
          title={data.specialistSection.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          {data.specialistSection.paragraphs.map((p, i) => (
            <p key={`spec-p-${i}`} className={styles.enhancedParagraph}>{p}</p>
          ))}

          <h4 className={styles.normalFunctionTitle}>Mulige undersøkelser</h4>
          <ul className={styles.resourceList}>
            {data.specialistSection.investigations.map((item, idx) => (
              <li key={`spec-i-${idx}`} className={styles.resourceListItem}>{item}</li>
            ))}
          </ul>

          {data.specialistSection.afterwords && (
            <p className={styles.enhancedParagraph}>{data.specialistSection.afterwords}</p>
          )}
        </SectionAccordion>

        <SectionAccordion 
          id="self-test"
          title={data.selfTestSection.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          {data.selfTestSection.paragraphs.map((p, i) => (
            <p key={`test-p-${i}`} className={styles.enhancedParagraph}>{p}</p>
          ))}
          <p className={styles.enhancedParagraph}><strong>{data.selfTestSection.note}</strong></p>

          
          {/* Embed St. Marks table (Norwegian) */}
          {language === 'no' ? (
            <div className={styles.tableWrapper}>
              <p className={styles.enhancedParagraph}><em>Ingen av feltene du fyller inn blir lagret på nettstedet.</em></p>

              <table className={styles.stMarksTable}>
                <tbody>
                  <tr>
                    <td style={{width: '20%'}}>Navn</td>
                    <td style={{width: '80%'}}>_________________________________________</td>
                  </tr>
                  <tr>
                    <td>Fødselsdato</td>
                    <td>_________________________________________</td>
                  </tr>
                </tbody>
              </table>

              <table className={styles.stMarksTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Aldri</th>
                    <th>Sjelden</th>
                    <th>Av og til</th>
                    <th>Ukentlig</th>
                    <th>Daglig</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lekkasje av fast avføring</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Lekkasje av flytende avføring</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Lekkasje av luft</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Endring av livsstil</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </table>

              <p className={styles.enhancedParagraph}><em>Aldri: Ingen tilfeller de siste fire ukene. Sjelden: 1 tilfelle de siste fire ukene. Av og til: Mer enn 1 tilfelle de siste fire ukene, men mindre enn 1 tilfelle i uka. Ukentlig: 1 eller flere tilfeller i uka, men mindre enn 1 tilfelle per dag. Daglig: 1 eller flere tilfeller pr dag.</em></p>

              <table className={styles.stMarksTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Nei</th>
                    <th>Ja</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Behov for å bruke bind eller propp pga. lekkasje av avføring</td>
                    <td>0</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Bruk av forstoppelsesmedikamenter</td>
                    <td>0</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Manglende evne til å utsette avføring i 15 minutter</td>
                    <td>0</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </table>

              <p className={styles.enhancedParagraph}><strong>Poeng og tolkning:</strong> Skjemaet gir en totalscore mellom 0 og 24. 0 tilsvarer ingen lekkasjeplager, mens 24 angir mest mulig alvorlig lekkasje. Husk å ta hensyn kun til de siste 4 ukene ved utfylling.</p>
              <p className={styles.enhancedParagraph}>Skriv ut skjemaet og ta det med til helsepersonell for korrekt vurdering.</p>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <p className={styles.enhancedParagraph}><em>None of the fields you fill in are stored on this website.</em></p>

              <table className={styles.stMarksTable}>
                <tbody>
                  <tr>
                    <td style={{width: '20%'}}>Name</td>
                    <td style={{width: '80%'}}>_________________________________________</td>
                  </tr>
                  <tr>
                    <td>Date of birth</td>
                    <td>_________________________________________</td>
                  </tr>
                </tbody>
              </table>

              <table className={styles.stMarksTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Never</th>
                    <th>Rarely</th>
                    <th>Occasionally</th>
                    <th>Weekly</th>
                    <th>Daily</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Leakage of solid stool</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Leakage of liquid stool</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Leakage of flatus</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Alteration of lifestyle</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </table>

              <p className={styles.enhancedParagraph}><em>Never: No episodes in the last four weeks. Rarely: 1 episode in the last four weeks. Occasionally: More than 1 episode in the last four weeks but less than 1 episode per week. Weekly: 1 or more episodes per week but less than 1 episode per day. Daily: 1 or more episodes per day.</em></p>

              <table className={styles.stMarksTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>No</th>
                    <th>Yes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Need to wear a pad or plug because of leakage</td>
                    <td>0</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Use of constipating medication</td>
                    <td>0</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Inability to defer defaecation for 15 minutes</td>
                    <td>0</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </table>

              <p className={styles.enhancedParagraph}><strong>Scoring and interpretation:</strong> The form gives a total score between 0 and 24. 0 = no leakage problems; 24 = most severe leakage. Consider only the last 4 weeks when completing.</p>
              <p className={styles.enhancedParagraph}>Print the form and bring it to your clinician for correct assessment.</p>
            </div>
          )}
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}