"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { VideoPlayer } from "../../../../components/ui/VideoPlayer"

const pelvicFloorData = {
  no: {
    title: "Bekkenbunnen",
    anatomyTitle: "Anatomi og funksjon",
    anatomyImageCaption: "Bekkenbunnen består av muskulatur og bindevev som danner gulvet i bekkenet.",
    anatomy: [
      "Bekkenet inneholder mange ulike strukturer som utgjør en del av bevegelsesapparatet som muskler, skjelett, ledd, leddbånd/ligamenter og bindevev. Bekkenet inneholder også ytre og indre kjønnsorganer, blære og tarm. Alle strukturer i bekkenet styres av nerver med utspring fra ryggmargen.",
      "Bekkenbunnsmuskulaturen, også omtalt som bekkenbunnen, utgjør gulvet i kroppen. Den omslutter skjede, urinrør og endetarm, og gir støtte og stabilisering av underlivsorganene. Bekkenbunnen bidrar til kontroll over urin og avføring. Den trekker seg reflektorisk raskt og effektivt sammen rundt urinrør, skjede og endetarm ved hosting, nysing og aktivitet. Dersom bekkenbunnen ikke fungerer som den skal, kan det føre til ufrivillig lekkasje av urin, luft og avføring, samt nedfall av bekkenorganer.",
      "Bekkenbunnsmuskulaturen er i hovedsak viljestyrt. Det vil si at vi aktivt kan styre sammentrekning og avslapning. Muskulaturen skal normalt slappe av ved toalettbesøk slik at du får til å tømme både blære og tarm. Det er også viktig å kunne kontrollere bekkenbunnen ved samleie. Like viktig som det er å kunne kontrollere knip av bekkenbunnen, er det viktig å kunne slappe av i bekkenbunnsmusklene.",
      "Under svangerskap og fødsel strekkes bekkenbunnsmuskulaturen og bindevev slik at støtte- og lukkefunksjonen kan bli påvirket. Muskulaturen, sammen med nervevev og bindevev, tilheles som regel av seg selv og eventuelle plager vil ofte være kortvarige.",
      "Hos noen vil derimot en svekkelse eller skade i bekkenbunnen vedvare og kunne føre til flere ulike plager. Muskulatur som er svak eller reagerer for sent, vil ikke gi optimal lukking og støtte ved økning i buktrykket. Noen vil da oppleve lekkasje av urin, luft eller avføring. Manglende støtte til indre organer i bekkenet kan også føre til framfall som er nedsigning av livmor, blære eller tarm. I ammeperioden er i tillegg muskulatur, bindevev og ligamenter i underlivet under påvirkning av lavt østrogennivå og det kan dermed føles noe \"slappere\". Dette vil ofte bedres etter endt amming.",
      "Akkurat som all annen muskulatur kan bekkenbunnsmuskulaturen trenes opp og bli sterkere igjen."
    ],

    trainingTitle: "Bekkenbunnstrening",
    trainingIntro: "Under graviditet og fødsel vil bekkenbunnsmuskulatur bli tøyd og bekkenbunnstrening anbefales derfor både i svangerskapet og etter fødsel.",
    trainingBenefit: "Bekkenbunnstrening kan også være effektiv behandling for lekkasje og underlivsprolaps.",
    imageCaption: "Kvinnelig underliv med bekkenbunn, sett fra siden.",

    durationTitle: "Hvor lenge trene bekkenbunnen?",
    duration: [
      "Bekkenbunnstrening anbefales til alle under graviditet og etter fødsel. Slik trening må gjøres riktig, regelmessig og over tid. I starten anbefales daglige øvelser, uavhengig av om man har plager eller ikke. Ved plager anbefales minimum tre til seks måneders daglig trening. Når ønsket effekt er oppnådd, kan denne vedlikeholdes med øvelser to ganger ukentlig.",
      "Det er viktig å huske at det aldri er for sent å begynne med bekkenbunnstrening."
    ],

    exercisesTitle: "Øvelser for bekkenbunnstrening",
    exercisesIntro: "Opptrening og kontroll på bekkenbunnsmuskulaturen er et grunnleggende tiltak som bør iverksettes ved plager. Det er viktig å lære seg å kjenne og kontrollere forskjellen mellom sammentrekning og avslapning av bekkenbunnsmuskulaturen. Bekkenbunnstrening skal ikke gjøre vondt. Effekten er god, men det forutsetter at det gjøres riktig og regelmessig. Individuell veiledning eller gruppetrening kan være nyttig dersom det er usikkerhet på om øvelsene gjøres riktig eller at effekten uteblir.",

    exercises: [
      {
        title: "Knip (lukk) igjen rundt urinrør, skjede- og endetarmsåpning.",
        content: "Kvinner: Kjenn at området mellom skjede og endetarm trekker seg litt opp og inn i kroppen. Du kan også legge et par fingre på det samme stedet (mellomkjøttet/perineum) og kjenne at det løftes litt vekk fra fingrene dine når du bruker bekkenbunnen riktig.",
        tip: "Tips: Forestill deg at du skal holde igjen for luft eller stoppe urinstrålen. Det er disse musklene du skal trene."
      },
      {
        title: "Mage-, lår- og setemusklene skal være avslappet.",
        content: "Fokuser på å bruke riktig muskulatur og unngå å spenne annen muskulatur.",
        tip: undefined
      },
      {
        title: "Begynn med å holde i 2-3 sekunder, slipp like lenge.",
        content: "Det er like viktig å hvile helt mellom hvert knip, som det er å knipe, ellers vil man ikke få riktig tak.",
        tip: undefined
      },
      {
        title: "Gjenta 15 ganger morgen og kveld.",
        content: "For noen kan 15 knip være mye i starten. Det er viktigere og få til gode og korrekte knip, enn flest mulig. Antall knip kan økes etterhvert.",
        tip: undefined
      },
      {
        title: "Øk knipetiden litt etter litt.",
        content: "For eksempel kan du øke med 1-2 sekunder hver uke, til du er oppe i 10-12 sekunder. Knipene skal være kontrollerte. Dersom taket \"slipper\" er det bedre å redusere knipetiden slik at det blir et sterkt og godt knip.",
        tip: undefined
      }
    ] as Array<{ title: string, content: string, tip?: string }>,

    instructionVideosTitle: "Instruksjonsfilmer om hvordan trene bekkenbunnen",
    instructionVideos: "På siden Pasientundervisning og Bekkenbunnstrening finner du instruksjonsfilmer om bekkenbunnstrening rettet både mot kvinner og menn.",
    instructionVideosLink: "/useful?tab=pasientundervisning",
    instructionVideosLinkText: "Pasientundervisning og Bekkenbunnstrening",

    videoUnnTitle: "Bekkenbunnstrening (UNN)",
    videoUnnUrl: "https://player.vimeo.com/video/65880144",
    videoUnnDescription: "Original instruksjonsfilm fra UNN som viser øvelser for å styrke bekkenbunnen.",
    videoStOlavsTitle: "Bekkenbunnstrening (St. Olavs)",
    videoStOlavsUrl: "https://www.youtube.com/embed/ZTMpEr6GLp8",
    videoStOlavsDescription: "Alternativ film fra St. Olavs Hospital med grundig veiledning i treningsteknikk.",

    pregnancyTitle: "Trening under svangerskapet",
    pregnancy: "De generelle anbefalingene om fysisk aktivitet og trening, gjelder også for gravide. Gravide kan trene helt fram til fødselen, så lenge det ikke gir smerter eller ubehag. Bekkenbunnstrening anbefales daglig under svangerskapet. Noen gravide opplever tyngdefølelse og press i underlivet. Andre har plager med lekkasje. Graden av plager varierer og bekkenbunnstrening kan være nyttig.",

    postpartumTitle: "Trening etter fødsel",
    postpartum: [
      "Bekkenbunnstrening kan startes umiddelbart etter fødsel. Dersom smerter på grunn av hevelse og sting bør øvelsene utsettes til etter tilheling. Noen kan synes det er vanskelig å få til øvelsene i starten. Underlivet har vært utsatt for en belastning og det kan ta tid før man gjenvinner kontroll på muskulaturen. Det er derfor viktig å fortsette med øvelsene. Et tips er å kjenne etter om du klarer å trekke sammen bekkenbunnen og gi støtte for underlivsorganene når du løfter og bærer barnet ditt.",
      "Etter hvert som man ønsker å komme i gang med trening som utfordrer hele kroppen, er det viktig å ha fokus på bekkenbunnen underveis i treningen. Vær oppmerksom på at hard fysisk aktivitet som lange løpeturer, hopping og tunge styrkeløft kan være utfordrende for en allerede svekket bekkenbunnsmuskulatur. Man bør derfor trene på å aktivere bekkenbunnsmuskulaturen under denne type trening. Ønsker du å utøve tyngre former for styrketrening krever dette også mye kraft fra bekkenbunnen. Det anbefales derfor gradvis opptrening. Dersom man under trening opplever lekkasje eller tyngdefølelse i underlivet, kan man justere intensitet og varighet slik at man klarer å gjennomføre treningen."
    ],

    noEffectTitle: "Når bekkenbunnstrening ikke gir ønsket effekt",
    noEffect: [
      "Bekkenbunnstrening kan være effektiv behandling av lekkasje og tyngdefølelse/fremfall. En av årsakene til manglende effekt kan være at bekkenbunnsøvelsene gjøres feil eller at man ikke oppnår kontakt med riktig muskulatur. Fysioterapeut kan veilede for riktig teknikk.",
      "For de som utfører knipet riktig, men som ikke oppnår ønsket effekt på sine plager, kan det være andre årsaker til dette som for eksempel skade på muskulatur, nerver eller bindevev. Slike skader kan i seg selv vanskeliggjøre bekkenbunnstrening. Da kan fastlege kontaktes for en vurdering og henvisning til spesialist for videre utredning og behandling."
    ],

    tensionTitle: "Spenninger i bekkenbunnen",
    tension: [
      "Konstant spenning av bekkenbunnsmuskulaturen er ikke gunstig og kan føre til andre plager og smertetilstander.",
      "Ved bekkenbunnsøvelser er det viktig å klare å slippe godt opp og slappe av i bekkenbunnen mellom knipene. En skal ikke gå med ett konstant knip. Dette kan gi spenning som kan føre til smerter i underlivet. Andre plager kan være tømningsvansker for urin, avføring og smerter ved samleie. Ved smerte og spenning i bekkenbunnsmuskulaturen er det derfor viktig å utrede for bakenforliggende skader på muskulatur og nerver som kan gi plager, som forsøkes kontrollert med konstant knip.",
      "Dersom vedvarende plager bør helsepersonell kontaktes for videre utredning og behandling."
    ]
  },
  en: {
    title: "The Pelvic Floor",
    anatomyTitle: "Anatomy and Function",
    anatomyImageCaption: "The pelvic floor consists of muscles and connective tissue that form the floor of the pelvis.",
    anatomy: [
      "The pelvis contains many different structures that form part of the musculoskeletal system such as muscles, skeleton, joints, ligaments and connective tissue. The pelvis also contains external and internal reproductive organs, bladder and bowel. All structures in the pelvis are controlled by nerves originating from the spinal cord.",
      "The pelvic floor muscles, also referred to as the pelvic floor, form the floor of the body. It surrounds the vagina, urethra and rectum, and provides support and stabilization of the pelvic organs. The pelvic floor contributes to control over urine and stool. It contracts reflexively quickly and effectively around the urethra, vagina and rectum during coughing, sneezing and activity. If the pelvic floor does not function properly, it can lead to involuntary leakage of urine, gas and stool, as well as prolapse of pelvic organs.",
      "The pelvic floor muscles are primarily under voluntary control. This means that we can actively control contraction and relaxation. The muscles should normally relax during toilet visits so that you can empty both bladder and bowel. It is also important to be able to control the pelvic floor during intercourse. Just as important as being able to control pelvic floor contraction is being able to relax the pelvic floor muscles.",
      "During pregnancy and childbirth, the pelvic floor muscles and connective tissue are stretched so that the support and closure function can be affected. The muscles, together with nerve tissue and connective tissue, usually heal by themselves and any complaints are often short-lived.",
      "However, for some, a weakening or damage to the pelvic floor will persist and can lead to several different complaints. Muscles that are weak or react too slowly will not provide optimal closure and support when abdominal pressure increases. Some will then experience leakage of urine, gas or stool. Lack of support for internal organs in the pelvis can also lead to prolapse, which is the descent of the uterus, bladder or bowel. During the breastfeeding period, muscles, connective tissue and ligaments in the pelvic area are also affected by low estrogen levels and may therefore feel somewhat \"looser\". This will often improve after breastfeeding ends.",
      "Just like all other muscles, the pelvic floor muscles can be trained and become stronger again."
    ],

    trainingTitle: "Pelvic Floor Training",
    trainingIntro: "During pregnancy and childbirth, the pelvic floor muscles will be stretched and pelvic floor training is therefore recommended both during pregnancy and after birth.",
    trainingBenefit: "Pelvic floor training can also be effective treatment for leakage and pelvic organ prolapse.",
    imageCaption: "Female pelvic area with pelvic floor, seen from the side.",

    durationTitle: "How Long to Train the Pelvic Floor?",
    duration: [
      "Pelvic floor training is recommended for everyone during pregnancy and after childbirth. Such training must be done correctly, regularly and over time. Initially, daily exercises are recommended, regardless of whether you have complaints or not. For complaints, a minimum of three to six months of daily training is recommended. When the desired effect is achieved, this can be maintained with exercises twice weekly.",
      "It is important to remember that it is never too late to start pelvic floor training."
    ],

    exercisesTitle: "Pelvic Floor Training Exercises",
    exercisesIntro: "Training and control of the pelvic floor muscles is a fundamental measure that should be implemented for complaints. It is important to learn to recognize and control the difference between contraction and relaxation of the pelvic floor muscles. Pelvic floor training should not hurt. The effect is good, but it requires that it is done correctly and regularly. Individual guidance or group training can be useful if there is uncertainty about whether the exercises are being done correctly or if the effect is absent.",

    exercises: [
      {
        title: "Contract (close) around the urethra, vaginal and rectal opening.",
        content: "Women: Feel that the area between the vagina and rectum pulls slightly up and into the body. You can also place a couple of fingers on the same spot (the perineum) and feel that it lifts slightly away from your fingers when you use the pelvic floor correctly.",
        tip: "Tip: Imagine that you want to hold back gas or stop the urine stream. These are the muscles you should train."
      },
      {
        title: "Abdominal, thigh and buttock muscles should be relaxed.",
        content: "Focus on using the correct muscles and avoid tensing other muscles.",
        tip: undefined
      },
      {
        title: "Start by holding for 2-3 seconds, release for the same amount of time.",
        content: "It is just as important to rest completely between each contraction as it is to contract, otherwise you will not get the right grip.",
        tip: undefined
      },
      {
        title: "Repeat 15 times morning and evening.",
        content: "For some, 15 contractions may be a lot in the beginning. It is more important to achieve good and correct contractions than as many as possible. The number of contractions can be increased gradually.",
        tip: undefined
      },
      {
        title: "Increase contraction time little by little.",
        content: "For example, you can increase by 1-2 seconds each week until you reach 10-12 seconds. Contractions should be controlled. If the grip \"releases\", it is better to reduce the contraction time so that it becomes a strong and good contraction.",
        tip: undefined
      }
    ] as Array<{ title: string, content: string, tip?: string }>,

    instructionVideosTitle: "Instructional Videos on How to Train the Pelvic Floor",
    instructionVideos: "On the Patient Education and Pelvic Floor Training page, you will find instructional videos about pelvic floor training aimed at both women and men.",
    instructionVideosLink: "/useful?tab=pasientundervisning",
    instructionVideosLinkText: "Patient Education and Pelvic Floor Training",

    videoUnnTitle: "Pelvic Floor Training (UNN)",
    videoUnnUrl: "https://player.vimeo.com/video/65880144",
    videoUnnDescription: "Original instructional film from UNN showing exercises to strengthen the pelvic floor.",
    videoStOlavsTitle: "Pelvic Floor Training (St. Olavs)",
    videoStOlavsUrl: "https://www.youtube.com/embed/ZTMpEr6GLp8",
    videoStOlavsDescription: "Alternative film from St. Olavs Hospital with thorough guidance on training techniques.",

    pregnancyTitle: "Training During Pregnancy",
    pregnancy: "The general recommendations for physical activity and exercise also apply to pregnant women. Pregnant women can exercise right up to childbirth, as long as it does not cause pain or discomfort. Pelvic floor training is recommended daily during pregnancy. Some pregnant women experience a feeling of heaviness and pressure in the pelvic area. Others have problems with leakage. The degree of complaints varies and pelvic floor training can be useful.",

    postpartumTitle: "Training After Birth",
    postpartum: [
      "Pelvic floor training can be started immediately after birth. If there is pain due to swelling and stitches, the exercises should be postponed until after healing. Some may find it difficult to do the exercises initially. The pelvic area has been subjected to strain and it may take time before you regain control of the muscles. It is therefore important to continue with the exercises. A tip is to check if you can contract the pelvic floor and provide support for the pelvic organs when you lift and carry your baby.",
      "As you want to start training that challenges the whole body, it is important to focus on the pelvic floor during the workout. Be aware that hard physical activity such as long running sessions, jumping and heavy strength training can be challenging for an already weakened pelvic floor muscles. You should therefore practice activating the pelvic floor muscles during this type of training. If you want to practice heavier forms of strength training, this also requires a lot of force from the pelvic floor. Gradual training is therefore recommended. If you experience leakage or a feeling of heaviness in the pelvic area during training, you can adjust the intensity and duration so that you can complete the training."
    ],

    noEffectTitle: "When Pelvic Floor Training Does Not Give the Desired Effect",
    noEffect: [
      "Pelvic floor training can be effective treatment for leakage and feeling of heaviness/prolapse. One of the reasons for lack of effect may be that the pelvic floor exercises are done incorrectly or that you do not achieve contact with the correct muscles. A physiotherapist can guide for correct technique.",
      "For those who perform the contraction correctly but do not achieve the desired effect on their complaints, there may be other reasons for this such as damage to muscles, nerves or connective tissue. Such damage can in itself make pelvic floor training difficult. Then a GP can be contacted for an assessment and referral to a specialist for further investigation and treatment."
    ],

    tensionTitle: "Tension in the Pelvic Floor",
    tension: [
      "Constant tension of the pelvic floor muscles is not beneficial and can lead to other complaints and pain conditions.",
      "During pelvic floor exercises, it is important to be able to release well and relax the pelvic floor between contractions. You should not walk around with a constant contraction. This can cause tension that can lead to pain in the pelvic area. Other complaints can be difficulty emptying urine, stool and pain during intercourse. In case of pain and tension in the pelvic floor muscles, it is therefore important to investigate for underlying damage to muscles and nerves that can cause complaints, which are attempted to be controlled with constant contraction.",
      "If persistent complaints, healthcare personnel should be contacted for further investigation and treatment."
    ]
  }
} as const

export const PelvicFloorSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = pelvicFloorData[language]

  return (
    <div id="pelvic-floor">
      <SectionAccordion
        title={data.anatomyTitle}
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
        id="pelvic-floor-anatomy"
      >
        <div className={styles.normalFunctionContent}>
          <figure style={{
            margin: '20px auto 30px',
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <img
              src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/beken2.jpg"
              alt={data.anatomyImageCaption}
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
              {data.anatomyImageCaption}
            </figcaption>
          </figure>

          {data.anatomy.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </SectionAccordion>

      <SectionAccordion
        title={data.trainingTitle}
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
        id="pelvic-floor-training"
      >
        <div className={styles.normalFunctionContent}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: '20px 0 30px'
          }}>
            <figure style={{
              margin: '0',
              flex: '1 1 300px',
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <img
                src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/bekkenbunn.jpg"
                alt={data.imageCaption}
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
                {data.imageCaption}
              </figcaption>
            </figure>

          </div>

          <p className={styles.enhancedParagraph}>{data.trainingIntro}</p>
          <p className={styles.enhancedParagraph}>{data.trainingBenefit}</p>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.durationTitle}
          </h5>
          {data.duration.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.exercisesTitle}
          </h5>
          <p className={styles.enhancedParagraph}>{data.exercisesIntro}</p>

          <ul className={styles.resourceList}>
            {data.exercises.map((exercise, index) => (
              <li key={index} className={styles.resourceListItem}>
                <strong>{exercise.title}</strong>
                <p className={styles.enhancedParagraph}>{exercise.content}</p>
                {exercise.tip && (
                  <p className={styles.enhancedParagraph} style={{ fontStyle: 'italic' }}>
                    {exercise.tip}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.instructionVideosTitle}
          </h5>
          <p className={styles.enhancedParagraph}>
            {data.instructionVideos}{' '}
            <a
              href={data.instructionVideosLink}
              className={styles.inlineLink}
            >
              {data.instructionVideosLinkText}
            </a>
          </p>

          <div className={styles.videoGallery}>
            <div className={styles.videoCard}>
              <VideoPlayer
                videoUrl={data.videoUnnUrl}
                title={data.videoUnnTitle}
                hideOverlay
              />
              <div className={styles.videoCardContent}>
                <h6 className={styles.videoCardTitle}>{data.videoUnnTitle}</h6>
                <p className={styles.videoCardDescription}>{data.videoUnnDescription}</p>
              </div>
            </div>
            <div className={styles.videoCard}>
              <VideoPlayer
                videoUrl={data.videoStOlavsUrl}
                title={data.videoStOlavsTitle}
                hideOverlay
              />
              <div className={styles.videoCardContent}>
                <h6 className={styles.videoCardTitle}>{data.videoStOlavsTitle}</h6>
                <p className={styles.videoCardDescription}>{data.videoStOlavsDescription}</p>
              </div>
            </div>
          </div>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.pregnancyTitle}
          </h5>
          <p className={styles.enhancedParagraph}>{data.pregnancy}</p>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.postpartumTitle}
          </h5>
          {data.postpartum.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.noEffectTitle}
          </h5>
          {data.noEffect.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.tensionTitle}
          </h5>
          {data.tension.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </SectionAccordion>
    </div>
  )
}

