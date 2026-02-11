"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"
import { CommonExerciseSection } from "../../../components/CommonExerciseSection"



const TREATMENT_DATA = {
  no: {
    pageTitle: "Behandling",
    intro: {
      para1: "Etter utredning vil du og lege avgjøre hvilken behandling som er best for deg. I de aller fleste tilfeller vil en starte med konservativ (ikke-kirurgisk) behandling. Konservativ behandling har for mange god effekt og medfører liten risiko for bivirkninger og komplikasjoner. Konservativ behandling krever en aktiv egeninnsats og forløpet kan ofte strekke seg over tid.",
      para2: "Dersom en ikke oppnår ønsket effekt med konservativ tilnærming vil det være aktuelt med kirurgisk behandling. Dette kan være ulike inngrep. Type inngrep vurderes ut ifra hvert enkelt tilfelle. De fleste som trenger inngrep for å bedre sine plager har også nytte av konservativ behandling i tillegg."
    },
    conservativeTreatment: {
      title: "Konservativ behandling",
      intro: "Konservativ behandling av urinlekkasje gjennomføres gjerne av sykepleier med spesialkompetanse – uroterapeut, eller fysioterapeut. Behandlingen har ofte et lengre perspektiv. Fra 3 til 6 måneder er vanlig, av og til er det nødvendig med lengre tid. Det gjennomføres oppfølging og evaluering av behandlingen, om det har blitt bedre eller ikke. Avhengig av resultat vurderes videre tiltak.",
      pelvicFloorTraining: {
        title: "Bekkenbunnstrening",
        intro: "Opptrening og kontroll på bekkenbunnsmuskulaturen er et grunnleggende tiltak som bør iverksettes. Effekten er god, men det forutsetter at det gjøres riktig og regelmessig. Individuell veiledning eller gruppetrening kan være nyttig dersom det er usikkerhet på om øvelsene gjøres riktig eller at effekten uteblir.",
        videoNote: "Her kan du se en instruksjonsfilm om hvordan man trener bekkenbunnen:",
        video: {
          src: "https://www.youtube.com/embed/ZTMpEr6GLp8?rel=0",
          title: "Bekkenbunnstrening for kvinner"
        },
        moreVideosNote: "På siden",
        moreVideosLink: "/useful?tab=pasientundervisning",
        moreVideosLinkText: "Pasientundervisning og Bekkenbunnstrening",
        moreVideosNote2: "finner du instruksjonsfilmer om bekkenbunnstrening rettet både mot kvinner og menn."
      },
      exerciseData: {
        pageTitle: "Bekkenbunnstrening",
        tryYourselfTitle: "Prøv selv",
        step1Text: "Knip (lukk) igjen rundt urinrør, skjede- og endetarmsåpning.",
        genderInstructions: [
          {
            title: "Kvinner",
            text: "Kjenn at området mellom skjede og endetarm trekker seg litt opp og inn i kroppen. Du kan også legge et par fingre på det samme stedet (mellomkjøttet/perineum) og kjenne at det løftes litt vekk fra fingrene dine når du bruker bekkenbunnen riktig.",
            icon: "♀",
            iconColor: "#e91e63"
          },
          {
            title: "Menn", 
            text: "Kjenn at området mellom pungen og endetarmen (mellomkjøttet/perineum) trekker seg litt opp og inn i kroppen. Penis vil gjøre en \"vippe-bevegelse\" som følge av muskeldraget rundt urinrøret.",
            icon: "♂",
            iconColor: "#2196f3"
          }
        ] as any,
        tipsTitle: "Tips",
        tipsText: "Forestill deg at du skal holde igjen for luft eller stoppe urinstrålen. Det er disse musklene du skal trene.",
        exerciseSteps: [
          {
            number: 2,
            text: "Mage-, lår- og setemusklene skal være avslappet. Fokuser på å bruke riktig muskulatur og unngå å spenne annen muskulatur."
          },
          {
            number: 3,
            text: "Begynn med å holde i 2-3 sekunder, slipp like lenge. Det er like viktig å hvile helt mellom hvert knip, som det er å knipe, ellers vil man ikke få riktig tak."
          },
          {
            number: 4,
            text: "Gjenta 15 ganger morgen og kveld. For noen kan 15 knip være mye i starten. Det er viktigere og få til gode og korrekte knip, enn flest mulig. Antall knip kan økes etterhvert."
          },
          {
            number: 5,
            text: "Øk knipetiden litt etter litt. For eksempel kan du øke med 1-2 sekunder hver uke, til du er oppe i 10-12 sekunder. Knipene skal være kontrollerte. Dersom taket \"slipper\" er det bedre å redusere knipetiden slik at det blir et sterkt og godt knip."
          }
        ] as any,
        videoSectionTitle: "Instruksjonsfilmer",
        videoSectionDescription: "Her kan du se instruksjonsfilmer om hvordan man trener bekkenbunnen:",
        videos: [
          {
            src: "https://www.youtube.com/embed/ZTMpEr6GLp8?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1",
            title: "Bekkenbunnstrening for kvinner"
          }
        ] as any,
        smartphoneApps: {
          title: "Flere instruksjonsfilmer",
          description: "På siden Pasientundervisning og Bekkenbunnstrening finner du instruksjonsfilmer om bekkenbunnstrening rettet både mot kvinner og menn.",
          linkText: "Pasientundervisning og Bekkenbunnstrening",
          linkUrl: "/useful?tab=pasientundervisning"
        }
      },
      biofeedback: {
        title: "Biofeedback/Elektrostimulering",
        intro: "Hvis det er vanskelig å trene bekkenbunnsmuskulaturen kan man bruke biofeedback. Metoden går ut på at man visuelt får en tilbakemelding om man bruker musklene på riktig måte. Dette skjer ved hjelp av en probe i skjede eller endetarm, eller overflateelektroder som avleser muskelaktivitet. Proben eller elektrodene er koblet til et lite apparat. Apparatet gir informasjon om hvor kraftig du kniper og hvor mye du relakserer/slapper av i muskulaturen.",
        electrostimulation: "Slike apparater kan også benyttes for å gi elektriske impulser til muskulaturen for å øke muskelkontraksjonen, såkalt elektrostimulering. Man stiller selv på apparatet og det benyttes gjerne faste dataprogram som gir signal om når du skal knipe og når du skal hvile. Elektrostimulering kan også forsøkes via hudelektroder for å påvirke nervesignaler som styrer bekkenbunnen. Noen programmer er ment for å påvirke nervesignalene til blæra, som for eksempel til behandling av overaktiv blære.",
        guidance: "Opplæring og oppfølging av biofeedback og elektrostimulering bør skje under profesjonell veiledning. Det er viktig å huske på at trening, både med og uten biofeedback eller elektrostimulering, må utføres regelmessig for å bygge opp muskelaturen og for å vedlikeholde den."
      },
      lifestyle: {
        title: "Livsstilsendring",
        intro: "I behandlingen av urinlekkasje hører det med å ha en gjennomgang av livsstilsfaktorer som kan påvirke vannlatingen. Dette innebærer å se nærmere på mat man spiser som kan påvirke blærefunksjonen, og hva og hvor mye man drikker. Toalettrutiner gjennomgås for å se på når og hvordan man går på toalettet. Dette kan høres basalt ut, men overraskende mange gjør små \"feil\" eller har vaner som i stor grad kan påvirke vannlatingsfunksjonen. Søvn, hvile og stress er momenter som for mange kan påvirke graden av symptomer.",
        weightLoss: "For noen kan overvekt bidra til vannlatingsplagene og her vil vektreduksjon kunne hjelpe."
      },
      bladderTraining: {
        title: "Blæretrening",
        intro: "Blæretrening er nyttig ved overaktiv blære hvor målet er å forbedre og øke både blærekapasiteten og tidsintervallene mellom vannlatingene. Slik trening er avhengig av en forståelse av de nedre urinveienes funksjon og hvordan ytre faktorer i miljøet kan ha en betydning. Blæretrening består av undervisning og skjematisk oppsatte tidspunkt for vannlating med systematisk forlengelse av intervallene. Formålet med å late vannet til faste tidspunkt som etterhvert utvides, er å \"ta over kontrollen\" for når blæren skal tømmes. Samtidig er det viktig å lære seg å hemme signalene ved plutselig og sterk innsettende vannlatingstrang (urgency).",
        tipsTitle: "Tips for å hemme trang:",
        tips: [
          "Knipe med bekkenbunnen for å \"lukke igjen\" urinrøret slik at blæremuskelen får signaler på å slappe av. Her lønner det seg og trene bekkenbunnen slik at en har kraftige og gode muskelsammentrekninger.",
          "Mekanisk klemme av urinrøret, også her med hensikt på å lukke igjen. Dette kan gjøres ved å sette seg på en kant, trykke mot vulva med hånden hos kvinner eller klemme urinrøret ved å komprimere med hånden rundt penis hos menn.",
          "\"Steppe\" eller trippe med føttene kan for mange gi signaler til blæren om å \"roe seg\", slik at trangen avtar.",
          "Avledning i den grad det er mulig, er også effektivt for å dempe vannlatingstrang. Det kan da være nyttig å ha trent på dette på forhånd for eksempel ved å ha innøvd en regle eller et sangvers som en skal si eller synge."
        ],
        conclusion: "For å kunne utføre blæretrening er det nødvendig å kartlegge vannlatingen med føring av vannlatingsdagbok. En uroterapeut vil kunne hjelpe med veiledning og oppfølging ved slik blæretrening."
      },
      medications: {
        title: "Medikamenter",
        intro: "Noen typer urinlekkasje kan behandles med medikamenter. Blæredempende medikamenter som gjør at blæren tillater å fylles mer, er nyttig for å behandle overaktiv blære. Ofte er det viktig å prøve seg frem med ulike tabletter og tablettkombinasjoner dersom man ikke oppnår ønsket effekt. Slike medikamenter finnes som tabletter, men kan også gis som plaster på huden eller væskeoppløsning som settes inn i blæra med kateter.",
        nighttime: "Tilstander der nattlig urinlekkasje skjer på grunn av overproduksjon av urin om natten, kan i noen tilfeller behandles med medisin som reduserer urinproduksjonen om natten. Det er viktig at instruksjon for bruk av medisinen, følges nøye. Har man store hevelser i bena ved leggetid kan dette føre til høy urinproduksjon på natten når man ligger flatt. Støttestrømper på dagen vil hindre hevelse og gir derfor mindre urinproduksjon på natten.",
        sideEffects: "Enkelte kan oppleve at noen medikamenter kan gi bivirkninger. Da er det viktig å ta kontakt med lege/uroterapeut slik at en enten kan gjøre tiltak for å forbedre bivirkningen, eller en velger å forsøke andre medikamenter."
      },
      aids: {
        title: "Hjelpemidler",
        intro: "For mange er det stor nytte og hjelp i ulike hjelpemidler eller inkontinensprodukter. Mye av produktene inngår i offentlig refusjonsordning og kan fås på blåresept ved inkontinens.",
        devices: "For kvinner finnes det hjelpemidler som inkontinensbuer og vaginaltamponger som gir en form for støtte mot urinrøret når de plasseres riktig i skjeden. For menn finnes det ulike klemmer som kan forsøkes.",
        pads: "Det finnes egne innlegg for urininkontinens. De er tilpasset både til kvinner og menn samt finnes i ulike størrelser og fasonger. For mange vil det være hensiktsmessig å få tilpasset produkter eller oppfølging for bruk av de, i samråd med helsepersonell."
      },
      catheterization: {
        title: "Kateterisering",
        intro: "Mange som ikke greier å tømme blæren helt kan ha nytte av å tømme blæren komplett med kateter. Det benyttes da fortrinnsvis engangskateter for å tømme blæra. Dette kalles ren intermitterende kateterisering (RIK). Man får opplæring av helsepersonell til å lære teknikken for å sette kateter på seg selv.",
        permanent: "I noen tilfeller er permanent inneliggende kateter et godt alternativ ved uttalte symptomer og problemer med urinlekkasje. Man oppnår da å lede urinen kontrollert, via en tynn slange fra blæren til en oppsamlingspose, og unngår lekkasjer og kontakt av urin mot huden.",
        considerations: "Permanent kateter er ikke førstevalg av behandlingsmetode da inneliggende urinkateter kan gi plager som sår i urinrøret, dannelse av blærestein, smerter og urinveisinfeksjoner. Likevel kan det være tilfeller hvor dette er den beste løsningen, for eksempel ved annen alvorlig sykdomstilstand."
      },
      permanentCatheter: {
        title: "Kateter",
        intro: "I enkelte tilfeller er inneliggende permanent kateter et godt alternativ ved uttalte symptomer og problemer med urinlekkasje. Man oppnår da å lede urinen kontrollert, via en tynn slange fra blæren til en oppsamlingspose, og unngår lekkasjer og kontakt av urin mot huden. Kateteret kan legges gjennom urinrøret eller via et lite snitt i huden over urinblæren.",
        considerations: "Permanent kateter er ikke førstevalg av behandlingsmetode da inneliggende urinkateter kan gi plager som sår i urinrøret, dannelse av blærestein, smerter og urinveisinfeksjoner. Likevel kan det være tilfeller hvor dette er den beste løsningen, for eksempel ved annen alvorlig sykdomstilstand."
      }
    },
    surgicalProcedures: {
      title: "Inngrep",
      intro: "Kirurgisk behandling av urinlekkasje kan være aktuelt dersom konservativ behandling ikke har gitt ønsket resultat, eller der man ut ifra utredningen finner forhold som kun kan behandles med inngrep.",
      incontinenceSling: {
        title: "Inkontinensslynge",
        intro: "Inkontinensslynge (TVT) er gullstandard i behandling ved stresslekkasje hos kvinner. Hensikten med slyngen er å løfte urinrøret tilbake til sin opprinnelige posisjon og lage et understøttende «hamakklignende» bånd under urinrøret. Dette skaper igjen et bedre støtteapparat rundt urinrøret. Inngrepet gjøres i fyll- eller regional narkose gjennom skjeden, evt med kombinerte små snitt på magen eller opp i lysken. Slyngen settes opp med formål å gi støtte slik at en ved «hosting, løft eller anstrengelse» ikke får lekkasje.",
        women: "TVT finnes i to varianter: TVT (tension free vaginal tape) der slyngen festes i muskelvev over bekkenbunnen via to små hudsnitt på magen eller TVT-O (tension-free vaginal tape obturator) der slyngen festes i muskelvev i bekkenområdet via to små hudsnitt opp i lysken. Det er visse forskjeller mellom teknikkene, og det er spesialisten som vurderer hvilken variant som er best for deg.",
        men: "For menn finnes det også en variant av TVT prosedyren, som heter AdVance slynge. Hensikten er den samme som for kvinner, men det gjøres andre snitt og bånd festes annerledes enn for kvinner."
      },
      injection: {
        title: "Injeksjon",
        content: "Injeksjon av bulking middel (Bulkamid) gjøres der urinrøret er blitt slakkere etter alder eller fødsel, slik at innholdet i urinrøret og vevet rundt blåren tykkere. På denne måten blir det tettere rundt urinrøret og lekkasjen blir mindre. Inngrepet gjøres via urinrøret, og det sprøytes inn bulking middel (hyaluronsyre-lignende gel) flere steder i slimhinnen som omgir urinrøret. Prosedyren utføres enten i dagbehandling eller poliklinisk, og det kan gjøres i lokalbedøvelse eller i fyll- eller regional narkose."
      },
      botox: {
        title: "Botox injeksjonsbehandling",
        content: "Botox injeksjonsbehandling mot urininkontinens gjøres med det formål å \"lamme\" blæren slik at den roer seg ned og kan romme mer. Inngrepet gjøres via urinrøret, og det settes inn et cystoskop slik at man ser innvendig i blæra. Ved hjelp av en nål stikker man inn flere steder i blæremuskelen, såkalt Botoxinjeksjon. Prosedyren utføres enten i dagbehandling eller poliklinisk, og det kan gjøres i lokalbedøvelse eller i fyll- eller regional narkose. En kan forvente at det tar rundt 5 til 14 dager før effekten av Botox-behandlingen inntreffer, og virketiden er ofte på rundt 6 måneder. Man får en oppfølgingstime der man revurderer effekten, og vurderer om det er behov for mer Botox eller om det skal gjøres andre tiltak."
      },
      sacralNerve: {
        title: "Sakralnervemodulering",
        content: "Sakralnervemodulering benyttes for pasienter med overaktiv blære ved trengningsinkontinens som ikke har hatt tilstrekkelig effekt av andre behandlingsalternativer. Dette er en behandlingsform som påvirker nervesignalene fra blæren til ryggmargen og hjernen. En elektrisk stimulator (en liten pacemaker) settes inn under huden. Den er koblet til ledninger som går frem til nervene ved korsbenet, som igjen står i forbindelse med nervene til urinblæren. Metoden går ut på å gi elektriske signaler slik at de nervesignalene som styrer urinblærefunksjonen påvirkes. Dette er et todelt inngrep. Først prøves effekten av metoden med bruk av et eksternt apparat (på utsiden av kroppen) i en periode (ca 2 uker). Pasienten fører dagbok over effekten. Pasienter som får god effekt av behandlingen, får innsatt en permanent stimulator (pacemaker). Når pacemakeren er satt inn kan pasienten regulere styrken på stimuleringen ved hjelp av fjernkontroll."
      },
      artificialSphincter: {
        title: "Kunstig lukkemuskel",
        content: "Kunstig lukkemuskel (AMS 800) er aktuelt ved alvorlig grad av stressinkontinens hos menn der andre behandlingstiltak ikke har hatt tilfredsstillende effekt, eller der det ikke finnes vevsforhold som gjør at andre tiltak kan la seg gjøre. Enhet som skal virke som en lukkemuskel settes inn via et snitt i huden (operasjon i narkose). Enheten består av en cuff (mansjett) som legges rundt urinrøret, en pumpe med ventiler som opereres inn på utsiden av testiklene og en trykktank som opereres inn i magehulen. Disse tre delene er koblet sammen. Ved å trykke på pumpen i pungen åpner man slik at man kan tisse, deretter fylles trykkmansjetten som sitter rundt urinrøret igjen automatisk og lukker slik at det ikke skal lekke."
      },
      bladderEnlargement: {
        title: "Blæreforstørrelse",
        content: "Blæreforstørrelse (entero-cystoplastikk) kan være aktuelt for noen pasienter ved alvorlig grad av urgency inkontinens og svært liten blærekapasitet der andre behandlingsmetoder ikke har effekt. Dette er et stort kirurgisk inngrep der en åpner opp blæren og lager den større ved å sy fast et stykke tarm på toppen av blæren. Tarmstykket gjør blæreveggen større og gir en større og roligere blære som følge."
      },
      urinaryDiversion: {
        title: "Urinavledning",
        content: "I de aller mest alvorlige tilfellene av urininkontinens der en ikke har fått tilfredsstillende resultat av andre tiltak, kan det være aktuelt å lede urinen ut en annen vei enn gjennom urinrøret. Dette kan gjøres ved å koble urinleder til et stykke tarm som går ut i en åpning i magen (stomi), og der en bruker urinpose for oppsamling. Eller en kan lage seg et reservoir (innvendig blærepose laget av tarm) inni kroppen som en tømmer fra utsiden ved å sette inn kateter. Denne varianten kalles kontinent reservoar."
      }
    },
    coping: {
      title: "Mestring",
      livingWithLeakage: {
        title: "Å leve med lekkasje",
        intro: "Det å leve med urinlekkasje kan for mange oppleves svært belastende og redusere livskvaliteten. Et aktivt hverdagsliv som innbefatter sosialt samvær, arbeidsliv, trening og reiser kan være vanskelig fordi urinlekkasjen hindrer deg i å gjøre det du ønsker. Det er vanlig at personer med urinlekkasje føler skam og frustrasjon knyttet til sine plager. Det kan føre til tilbaketrekning fra sosialt samvær og unngåelse av aktiviteter som utløser lekkasje.",
        para2: "Ved å ta tak i plagene og få hjelp, er det forventninger om at det skal kunne bli bedre. Dette må sees både i lys av at det finnes gode behandlingstilbud, men også at mange tilpasser seg plagene. Det kan være godt å vite at mange får bedre kontroll over plagene og at mange opplever mindre ubehag. Fokus endres til andre ting og plagene mister noe av sitt fokus."
      },
      whatCanHelp: {
        title: "Hva kan gjøre situasjonen bedre?",
        intro: "Mange vil oppleve at motivasjonen for å få til en endring av sin situasjon påvirkes av flere faktorer:",
        list: [
          "Hjelpetilbud",
          "Optimisme – tro på at det hjelper",
          "Åpenhet overfor familie og venner. Det å snakke om det kan gjøre at belastningen føles mindre",
          "Kartlegging av egen hverdag. Hva er det som du ikke får til eller som du synes er vanskelig? Hvilke situasjoner er det som utløser plagene?",
          "Ikke overdrivelse av det negative. Forsøk å ha fokus på det som fungerer godt for deg"
        ],
        conclusion: "Dette er faktorer som kan gi krefter til endring. Det er viktig at du har en forståelse og en innsikt i hva som er dine plager og problemer. Du bør også ha kunnskap om hva som finnes av tiltak og behandlingstilbud du kan forsøke."
      },
      sexuality: {
        title: "Urinlekkasje og seksualitet",
        content: "Seksualitet og samliv er en viktig del av livet og at du har det bra. Likevel har vi forståelse for at du kanskje synes det er vanskelig eller flaut å snakke om dette. Det er ikke uvanlig at urinlekkasje gjør at man vegrer seg for sex, enten alene eller sammen med en partner. Det er viktig at du forteller legen din om slike problemer. Kanskje kan det hjelpe å snakke med andre, som en psykolog eller sexolog. Ved problemstillinger knyttet til seksualitet kan det være aktuelt å innhente råd fra sexologisk poliklinikk."
      }
    }
  },
  en: {
    pageTitle: "Treatment",
    intro: {
      para1: "After investigation, you and your doctor will decide which treatment is best for you. In most cases, conservative (non-surgical) treatment is started first. Conservative treatment has good effects for many and carries little risk of side effects and complications. Conservative treatment requires active self-effort and the course can often extend over time.",
      para2: "If the desired effect is not achieved with a conservative approach, surgical treatment will be relevant. This can be various procedures. The type of procedure is assessed on a case-by-case basis. Most people who need procedures to improve their symptoms also benefit from conservative treatment in addition."
    },
    conservativeTreatment: {
      title: "Conservative Treatment",
      intro: "Conservative treatment of urinary incontinence is usually carried out by a nurse with special competence - urotherapist, or physiotherapist. The treatment often has a longer perspective. From 3 to 6 months is common, sometimes longer is necessary. Follow-up and evaluation of the treatment is carried out, whether it has improved or not. Depending on the results, further measures are considered.",
      pelvicFloorTraining: {
        title: "Pelvic Floor Training",
        intro: "Training and control of the pelvic floor muscles is a basic measure that should be implemented. The effect is good, but it requires that it is done correctly and regularly. Individual guidance or group training can be useful if there is uncertainty about whether the exercises are done correctly or that the effect is absent.",
        videoNote: "Here you can watch an instructional video about how to train the pelvic floor:",
        video: {
          src: "https://www.youtube.com/embed/ZTMpEr6GLp8?rel=0",
          title: "Pelvic floor training for women"
        },
        moreVideosNote: "On the page",
        moreVideosLink: "/useful?tab=pasientundervisning",
        moreVideosLinkText: "Patient Education and Pelvic Floor Training",
        moreVideosNote2: "you can find instructional videos about pelvic floor training for both women and men."
      },
      exerciseData: {
        pageTitle: "Pelvic Floor Training",
        tryYourselfTitle: "Try yourself",
        step1Text: "Squeeze (close) around the urethra, vagina and rectal opening.",
        genderInstructions: [
          {
            title: "Women",
            text: "Feel that the area between the vagina and rectum pulls slightly up and into the body. You can also place a couple of fingers on the same area (perineum) and feel that it lifts slightly away from your fingers when you use the pelvic floor correctly.",
            icon: "♀",
            iconColor: "#e91e63"
          },
          {
            title: "Men", 
            text: "Feel that the area between the scrotum and rectum (perineum) pulls slightly up and into the body. The penis will make a \"tipping motion\" as a result of the muscle pull around the urethra.",
            icon: "♂",
            iconColor: "#2196f3"
          }
        ] as any,
        tipsTitle: "Tips",
        tipsText: "Imagine that you should hold in gas or stop the urine stream. These are the muscles you should train.",
        exerciseSteps: [
          {
            number: 2,
            text: "Abdominal, thigh and buttock muscles should be relaxed. Focus on using the correct muscles and avoid tensing other muscles."
          },
          {
            number: 3,
            text: "Start by holding for 2-3 seconds, release for the same time. It is just as important to rest completely between each squeeze as it is to squeeze, otherwise you will not get the right grip."
          },
          {
            number: 4,
            text: "Repeat 15 times morning and evening. For some, 15 squeezes may be a lot at first. It is more important to achieve good and correct squeezes than as many as possible. The number of squeezes can be increased over time."
          },
          {
            number: 5,
            text: "Increase the squeeze time little by little. For example, you can increase by 1-2 seconds each week, until you are up to 10-12 seconds. The squeezes should be controlled. If the grip \"slips\" it is better to reduce the squeeze time so that it becomes a strong and good squeeze."
          }
        ] as any,
        videoSectionTitle: "Instructional Videos",
        videoSectionDescription: "Here you can watch instructional videos about how to train the pelvic floor:",
        videos: [
          {
            src: "https://www.youtube.com/embed/ZTMpEr6GLp8?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1",
            title: "Pelvic floor training for women"
          }
        ] as any,
        smartphoneApps: {
          title: "More instructional videos",
          description: "On the page Patient Education and Pelvic Floor Training you can find instructional videos about pelvic floor training for both women and men.",
          linkText: "Patient Education and Pelvic Floor Training",
          linkUrl: "/useful?tab=pasientundervisning"
        }
      },
      biofeedback: {
        title: "Biofeedback/Electrostimulation",
        intro: "If it is difficult to train the pelvic floor muscles, you can use biofeedback. The method involves visually receiving feedback on whether you are using the muscles correctly. This happens with the help of a probe in the vagina or rectum, or surface electrodes that read muscle activity. The probe or electrodes are connected to a small device. The device provides information about how hard you squeeze and how much you relax the muscles.",
        electrostimulation: "Such devices can also be used to give electrical impulses to the muscles to increase muscle contraction, so-called electrostimulation. You set the device yourself and fixed data programs are often used that signal when you should squeeze and when you should rest. Electrostimulation can also be tried via skin electrodes to affect nerve signals that control the pelvic floor. Some programs are meant to affect the nerve signals to the bladder, such as for the treatment of overactive bladder.",
        guidance: "Training and follow-up of biofeedback and electrostimulation should take place under professional guidance. It is important to remember that training, both with and without biofeedback or electrostimulation, must be performed regularly to build up the muscles and to maintain them."
      },
      lifestyle: {
        title: "Lifestyle Changes",
        intro: "In the treatment of urinary incontinence, it is important to review lifestyle factors that can affect urination. This involves looking more closely at food you eat that can affect bladder function, and what and how much you drink. Toilet routines are reviewed to look at when and how you go to the toilet. This may sound basic, but surprisingly many make small \"mistakes\" or have habits that can greatly affect urination function. Sleep, rest and stress are factors that for many can affect the degree of symptoms.",
        weightLoss: "For some, being overweight can contribute to urination problems and here weight loss can help."
      },
      bladderTraining: {
        title: "Bladder Training",
        intro: "Bladder training is useful for overactive bladder where the goal is to improve and increase both bladder capacity and time intervals between urinations. Such training depends on an understanding of the lower urinary tract function and how external environmental factors can be important. Bladder training consists of education and schematically set times for urination with systematic extension of intervals. The purpose of urinating at fixed times that are gradually extended is to \"take over control\" of when the bladder should be emptied. At the same time, it is important to learn to inhibit signals during sudden and strong onset of urge to urinate (urgency).",
        tipsTitle: "Tips for inhibiting urge:",
        tips: [
          "Squeeze with the pelvic floor to \"close\" the urethra so that the bladder muscle gets signals to relax. Here it pays to train the pelvic floor so that you have strong and good muscle contractions.",
          "Mechanically squeeze the urethra, also here with the intention of closing. This can be done by sitting on an edge, pressing against the vulva with the hand in women or squeezing the urethra by compressing with the hand around the penis in men.",
          "\"Stepping\" or tiptoeing with the feet can for many give signals to the bladder to \"calm down\", so that the urge subsides.",
          "Distraction to the extent possible is also effective for dampening the urge to urinate. It can then be useful to have practiced this in advance, for example by having learned a rhyme or a song verse to say or sing."
        ],
        conclusion: "To be able to perform bladder training, it is necessary to map urination by keeping a voiding diary. A urotherapist can help with guidance and follow-up with such bladder training."
      },
      medications: {
        title: "Medications",
        intro: "Some types of urinary incontinence can be treated with medications. Bladder-calming medications that allow the bladder to fill more are useful for treating overactive bladder. It is often important to try different tablets and tablet combinations if the desired effect is not achieved. Such medications are available as tablets, but can also be given as patches on the skin or liquid solution that is inserted into the bladder with a catheter.",
        nighttime: "Conditions where nighttime urinary incontinence occurs due to overproduction of urine at night can in some cases be treated with medication that reduces urine production at night. It is important that instructions for use of the medication are followed carefully. If you have large swellings in the legs at bedtime, this can lead to high urine production at night when lying flat. Support stockings during the day will prevent swelling and therefore give less urine production at night.",
        sideEffects: "Some may experience that some medications can have side effects. Then it is important to contact a doctor/urotherapist so that one can either take measures to improve the side effect, or one chooses to try other medications."
      },
      aids: {
        title: "Aids",
        intro: "For many, there is great benefit and help in various aids or incontinence products. Many of the products are included in public reimbursement schemes and can be obtained on prescription for incontinence.",
        devices: "For women, there are aids such as incontinence pessaries and vaginal tampons that provide a form of support to the urethra when placed correctly in the vagina. For men, there are various clamps that can be tried.",
        pads: "There are special pads for urinary incontinence. They are adapted for both women and men and come in different sizes and shapes. For many, it will be appropriate to have products fitted or follow-up for their use, in consultation with healthcare personnel."
      },
      catheterization: {
        title: "Catheterization",
        intro: "Many who cannot empty the bladder completely can benefit from emptying the bladder completely with a catheter. Single-use catheters are then preferably used to empty the bladder. This is called clean intermittent catheterization (CIC). You receive training from healthcare personnel to learn the technique for inserting a catheter yourself.",
        permanent: "In some cases, a permanent indwelling catheter is a good alternative for pronounced symptoms and problems with urinary incontinence. This achieves controlled drainage of urine, via a thin tube from the bladder to a collection bag, and avoids leaks and contact of urine with the skin.",
        considerations: "Permanent catheter is not the first choice of treatment method as indwelling urinary catheter can cause problems such as sores in the urethra, formation of bladder stones, pain and urinary tract infections. However, there may be cases where this is the best solution, for example in the case of other serious illness."
      },
      permanentCatheter: {
        title: "Catheter",
        intro: "In some cases, a permanent indwelling catheter is a good alternative for pronounced symptoms and problems with urinary incontinence. This achieves controlled drainage of urine, via a thin tube from the bladder to a collection bag, and avoids leaks and contact of urine with the skin. The catheter can be inserted through the urethra or via a small incision in the skin above the bladder.",
        considerations: "Permanent catheter is not the first choice of treatment method as an indwelling urinary catheter can cause problems such as sores in the urethra, formation of bladder stones, pain and urinary tract infections. However, there may be cases where this is the best solution, for example in other serious disease conditions."
      }
    },
    surgicalProcedures: {
      title: "Surgical Procedures",
      intro: "Surgical treatment of urinary incontinence may be relevant if conservative treatment has not given the desired result, or where conditions are found from the investigation that can only be treated with procedures.",
      incontinenceSling: {
        title: "Incontinence Sling",
        intro: "Incontinence sling (TVT) is the gold standard in treatment of stress incontinence in women. The purpose of the sling is to lift the urethra back to its original position and create a supporting \"hammock-like\" band under the urethra. This again creates a better support apparatus around the urethra. The procedure is done under general or regional anesthesia through the vagina, possibly with combined small incisions on the abdomen or up in the groin. The sling is set up with the purpose of providing support so that when \"coughing, lifting or exertion\" there is no leakage.",
        women: "TVT comes in two variants: TVT (tension free vaginal tape) where the sling is attached in muscle tissue above the pelvic floor via two small skin incisions on the abdomen or TVT-O (tension-free vaginal tape obturator) where the sling is attached in muscle tissue in the pelvic area via two small skin incisions up in the groin. There are certain differences between the techniques, and it is the specialist who assesses which variant is best for you.",
        men: "For men, there is also a variant of the TVT procedure, called AdVance sling. The purpose is the same as for women, but different incisions are made and the band is attached differently than for women."
      },
      injection: {
        title: "Injection",
        content: "Injection of bulking agent (Bulkamid) is done where the urethra has become looser after age or childbirth, so that the contents of the urethra and the tissue around the bladder become thicker. In this way it becomes tighter around the urethra and the leakage becomes less. The procedure is done via the urethra, and bulking agent (hyaluronic acid-like gel) is injected in several places in the mucous membrane surrounding the urethra. The procedure is performed either in day treatment or outpatient, and can be done under local anesthesia or under general or regional anesthesia."
      },
      botox: {
        title: "Botox Injection Treatment",
        content: "Botox injection treatment for urinary incontinence is done with the purpose of \"paralyzing\" the bladder so that it calms down and can hold more. The procedure is done via the urethra, and a cystoscope is inserted so that the inside of the bladder is visible. Using a needle, multiple injections are made into the bladder muscle, so-called Botox injections. The procedure is performed either in day treatment or outpatient, and can be done under local anesthesia or under general or regional anesthesia. One can expect it to take around 5 to 14 days before the effect of the Botox treatment occurs, and the duration of action is often around 6 months. You get a follow-up appointment where the effect is reassessed, and it is assessed whether more Botox is needed or whether other measures should be taken."
      },
      sacralNerve: {
        title: "Sacral Nerve Modulation",
        content: "Sacral nerve modulation is used for patients with overactive bladder with urge incontinence who have not had sufficient effect from other treatment alternatives. This is a treatment form that affects the nerve signals from the bladder to the spinal cord and brain. An electrical stimulator (a small pacemaker) is inserted under the skin. It is connected to wires that go forward to the nerves at the sacrum, which in turn are connected to the nerves to the bladder. The method involves giving electrical signals so that the nerve signals that control bladder function are affected. This is a two-part procedure. First, the effect of the method is tested using an external device (on the outside of the body) for a period (about 2 weeks). The patient keeps a diary of the effect. Patients who get good effect from the treatment get a permanent stimulator (pacemaker) inserted. When the pacemaker is inserted, the patient can regulate the strength of the stimulation using a remote control."
      },
      artificialSphincter: {
        title: "Artificial Sphincter",
        content: "Artificial sphincter (AMS 800) is relevant for severe stress incontinence in men where other treatment measures have not had satisfactory effect, or where there are no tissue conditions that make other measures possible. A unit that will act as a sphincter is inserted via an incision in the skin (operation under anesthesia). The unit consists of a cuff (cuff) that is placed around the urethra, a pump with valves that is operated on the outside of the testicles and a pressure tank that is operated into the abdominal cavity. These three parts are connected together. By pressing the pump in the scrotum, you open it so you can urinate, then the pressure cuff that sits around the urethra is filled again automatically and closes so that it does not leak."
      },
      bladderEnlargement: {
        title: "Bladder Enlargement",
        content: "Bladder enlargement (entero-cystoplasty) may be relevant for some patients with severe urgency incontinence and very small bladder capacity where other treatment methods have no effect. This is a major surgical procedure where the bladder is opened and made larger by sewing a piece of intestine on top of the bladder. The intestine piece makes the bladder wall larger and gives a larger and calmer bladder as a result."
      },
      urinaryDiversion: {
        title: "Urinary Diversion",
        content: "In the very most serious cases of urinary incontinence where satisfactory results have not been obtained from other measures, it may be relevant to lead the urine out a different way than through the urethra. This can be done by connecting the ureter to a piece of intestine that goes out into an opening in the stomach (stoma), and where a urine bag is used for collection. Or one can make a reservoir (internal bladder bag made of intestine) inside the body that is emptied from the outside by inserting a catheter. This variant is called a continent reservoir."
      }
    },
    coping: {
      title: "Coping",
      livingWithLeakage: {
        title: "Living with Leakage",
        intro: "Living with urinary incontinence can for many be experienced as very burdensome and reduce quality of life. An active everyday life that includes social interaction, work life, exercise and travel can be difficult because urinary incontinence prevents you from doing what you want. It is common for people with urinary incontinence to feel shame and frustration related to their complaints. This can lead to withdrawal from social interaction and avoidance of activities that trigger leakage.",
        para2: "By addressing the problems and getting help, there are expectations that it should get better. This must be seen both in light of the fact that there are good treatment offers, but also that many adapt to the complaints. It can be good to know that many get better control of the complaints and that many experience less discomfort. Focus shifts to other things and the complaints lose some of their focus."
      },
      whatCanHelp: {
        title: "What can improve the situation?",
        intro: "Many will experience that the motivation to achieve a change in their situation is influenced by several factors:",
        list: [
          "Help offers",
          "Optimism - belief that it helps",
          "Openness to family and friends. Talking about it can make the burden feel less",
          "Mapping your own everyday life. What is it that you can't do or that you find difficult? What situations trigger the complaints?",
          "Not exaggerating the negative. Try to focus on what works well for you"
        ],
        conclusion: "These are factors that can give strength to change. It is important that you have an understanding and insight into what your complaints and problems are. You should also have knowledge of what measures and treatment offers you can try."
      },
      sexuality: {
        title: "Urinary Incontinence and Sexuality",
        content: "Sexuality and relationship are an important part of life and that you are doing well. However, we understand that you may find it difficult or embarrassing to talk about this. It is not uncommon for urinary incontinence to make people reluctant to have sex, either alone or with a partner. It is important that you tell your doctor about such problems. Perhaps it can help to talk to others, such as a psychologist or sexologist. For issues related to sexuality, it may be relevant to obtain advice from a sexological clinic."
      }
    }
  }
} as const

export const Treatment = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = TREATMENT_DATA[language]

  return (
    <>
      {/* Introduction Section */}

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/solae.png"
              alt="Treatment"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {/* Intro paragraphs */}
          <div className={styles.normalFunctionSection}>
            <p className={styles.enhancedParagraph}>
              {data.intro.para1}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.intro.para2}
            </p>
          </div>

          {/* ACCORDION 1: Conservative Treatment */}
          <SectionAccordion 
            title={data.conservativeTreatment.title} 
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.intro}
            </p>

            {/* Pelvic Floor Training */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.pelvicFloorTraining.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.pelvicFloorTraining.intro}
            </p>
            
            {/* Common Exercise Section */}
            <CommonExerciseSection {...data.conservativeTreatment.exerciseData} />

            {/* Biofeedback */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.biofeedback.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.biofeedback.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.biofeedback.electrostimulation}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.biofeedback.guidance}
            </p>

            {/* Lifestyle Changes */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.lifestyle.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.lifestyle.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.lifestyle.weightLoss}
            </p>

            {/* Bladder Training */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.bladderTraining.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.bladderTraining.intro}
            </p>
            
            <h4 className={styles.normalFunctionTitle}>{data.conservativeTreatment.bladderTraining.tipsTitle}</h4>
            <ul className={styles.bulletList}>
              {data.conservativeTreatment.bladderTraining.tips.map((tip) => (
                <li key={tip.substring(0, 50)}>{tip}</li>
              ))}
            </ul>
            
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.bladderTraining.conclusion}
            </p>

            {/* Medications */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.medications.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.medications.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.medications.nighttime}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.medications.sideEffects}
            </p>

            {/* Aids */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.aids.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.aids.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.aids.devices}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.aids.pads}
            </p>

            {/* Catheterization */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.catheterization.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.catheterization.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.catheterization.permanent}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.catheterization.considerations}
            </p>
          </SectionAccordion>

          {/* ACCORDION 2: Surgical Procedures */}
          <SectionAccordion 
            title={data.surgicalProcedures.title} 
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.intro}
            </p>

            {/* Incontinence Sling */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.incontinenceSling.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.incontinenceSling.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.incontinenceSling.women}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.incontinenceSling.men}
            </p>

            {/* Injection */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.injection.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.injection.content}
            </p>

            {/* Botox */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.botox.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.botox.content}
            </p>

            {/* Sacral Nerve */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.sacralNerve.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.sacralNerve.content}
            </p>

            {/* Artificial Sphincter */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.artificialSphincter.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.artificialSphincter.content}
            </p>

            {/* Bladder Enlargement */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.bladderEnlargement.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.bladderEnlargement.content}
            </p>

            {/* Urinary Diversion */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.urinaryDiversion.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.urinaryDiversion.content}
            </p>
          </SectionAccordion>

          {/* ACCORDION 3: Coping */}
          <SectionAccordion 
            title={data.coping.title} 
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {/* Living with Leakage */}
            <h3 className={styles.subsectionTitle}>{data.coping.livingWithLeakage.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.coping.livingWithLeakage.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.coping.livingWithLeakage.para2}
            </p>

            {/* What Can Help */}
            <h3 className={styles.subsectionTitle}>{data.coping.whatCanHelp.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.coping.whatCanHelp.intro}
            </p>
            <ul className={styles.bulletList}>
              {data.coping.whatCanHelp.list.map((item) => (
                <li key={item.substring(0, 50)}>{item}</li>
              ))}
            </ul>
            <p className={styles.enhancedParagraph}>
              {data.coping.whatCanHelp.conclusion}
            </p>

            {/* Sexuality */}
            <h3 className={styles.subsectionTitle}>{data.coping.sexuality.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.coping.sexuality.content}
            </p>
          </SectionAccordion>
        </div>
      </div>
    </>
  )
}
