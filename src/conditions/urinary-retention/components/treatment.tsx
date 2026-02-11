"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";

const INTRODUCTION_DATA = {
  no: {
    description: "På disse sidene finner du informasjon om tømmingsproblemer for urin, urinretensjon. Her er informasjon om normal funksjon av vannlatingen, symptomer på tømmingsproblemer, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet.",
    keyPoints: [
      "Lær om konservative behandlingsalternativer",
      "Forstå når kirurgisk behandling kan være nødvendig",
      "Få praktiske råd for håndtering av problemet",
      "Utforsk forskjellige behandlingsmetoder"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Behandling av urinretensjon",
      caption: "Oversikt over behandlingsalternativer"
    }
  },
  en: {
    description: "On these pages you will find information about urinary emptying problems, urinary retention. Here is information about normal urination function, symptoms of emptying problems, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected.",
    keyPoints: [
      "Learn about conservative treatment options",
      "Understand when surgical treatment may be necessary",
      "Get practical advice for managing the problem",
      "Explore different treatment methods"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Treatment of urinary retention",
      caption: "Overview of treatment options"
    }
  }
} as const;

interface PositionImage {
  src: string;
  alt: string;
  caption: string;
}

interface TreatmentSection {
  id: string;
  title: string;
  content?: string;
  hasImage?: boolean;
  image?: { src: string; alt: string; caption: string };
  hasGenderTips?: boolean;
  hasPositionImages?: boolean;
  positionImages?: PositionImage[];
  note?: string;
  // Fields for good_urination_rules
  intro?: string;
  position?: string;
  conclusion?: string;
  source?: string;
  rules?: string[];
  // Fields for links (like catheterization resources)
  hasLinks?: boolean;
  links?: { text: string; url: string }[];
}

interface SurgicalSection { id: string; title: string; content: string }

interface CopingSection {
  id: string;
  title: string;
  content: string | string[];
  hasImage?: boolean;
  image?: { src: string; alt: string; caption: string };
}

interface TreatmentContent {
  pageTitle: string;
  patientQuote: string;
  patientAge: string;
  patientGuide: string;
  conservativeTitle: string;
  surgicalTitle: string;
  copingTitle: string;
  surgicalIntro: string;
  copingQuote: string;
  copingQuoteAuthor: string;
  sections: TreatmentSection[];
  surgicalSections: SurgicalSection[];
  copingSections: CopingSection[];
}

type SupportedLanguage = "no" | "en";

// Structured bilingual data for treatment content
const TREATMENT_DATA: Record<SupportedLanguage, TreatmentContent> = {
  no: {
    pageTitle: "Behandling",
    patientQuote: "Jeg har nok aldri tatt meg god tid på toalettet og har alltid presset for å bli ferdig raskt.",
    patientAge: "Kvinne, 82 år",
    patientGuide: "Videre på disse sidene finner du informasjon om behandling, blant annet råd om enkle tiltak du selv kan gjøre hjemme. Dersom konservative tiltak ikke gir ønsket effekt, kan kirurgiske inngrep være aktuelle.",
    conservativeTitle: "1. Konservativ behandling",
    surgicalTitle: "2. Kirurgisk behandling",
    copingTitle: "3. Mestring",
    surgicalIntro: "Dersom konservativ behandling er forsøkt og man ikke har lyktes i å bli bra, kan det være aktuelt med kirurgisk behandling. Andre ganger er symptomene og plagene så store at en velger å gå direkte til kirurgi. Det er viktig og sørge for at nyrefunksjonen ivaretas på en god måte ved problemer med å tømme ut urin. Dersom det er fare for at nyrene kan skades blir valg av behandling naturlig sett i sammenheng med dette, noe som er viktig for hvilken behandling som velges.",
    copingQuote: "Jeg lekker ikke så mye, men det kommer litt og litt. Jeg føler meg aldri ren, jeg føler at jeg lukter.",
    copingQuoteAuthor: "Kvinne, 28 år",
    sections: [
      {
        id: "toilet_habits",
        title: "Etablere gode toalettvaner",
        content: "Med dette menes at en later vannet regelmessig, minst 4 ganger per dag. Det er viktig å tilpasse antall blæretømminger slik at vannlatingsvolum per gang ligger mellom 250-400 (max 500) ml. Ved små urinvolum bør man unngå å late vannet med en gang man kjenner at det er noe i blæren, for å unngå å få redusert blærekapasitet. Her vil noen ha hjelp i å late vannet \"etter klokken\" hver 3.-4. time og ikke etter trangfølelse. Sørg for å bruke rikelig med tid på toalettet og unngå å stresse.",
        hasImage: true,
        image: {
          src: "/oldFemale.jpg",
          alt: "Bilde av en eldre dame som prater med helsepersonell",
          caption: "Bilde av en eldre dame som prater med helsepersonell"
        }
      },
      {
        id: "position",
        title: "Stilling på toalettet er også av betydning",
        content: "Viktig å ha god kontakt mellom føttene og gulvet når en sitter slik at en får til å slappe godt av samt har ryggen lett fremoverlent. For menn som later vannet stående kan det oppleves avlastende å støtte med en strak arm mot veggen bak toalettet og kjenne at bekkenbunn og setemuskulatur slapper av. Menn som har svak blæremuskel tømmer seg gjerne bedre ved å sitte enn ved å stå. Når kvinner står, tømmer de dårligere.",
        hasGenderTips: true,
        hasPositionImages: true,
        positionImages: [
          {
            src: "/trinn1_0-1.png",
            alt: "Trinn 1 - Knærne høyere enn hoften",
            caption: "Trinn 1 - Knærne høyere enn hoften"
          },
          {
            src: "/trinn2-1.png",
            alt: "Trinn 2 - Len fremover og hvil albuene på knærne",
            caption: "Trinn 2 - Len fremover og hvil albuene på knærne"
          },
          {
            src: "/trinn3-1.png",
            alt: "Trinn 3 - Spenn magen ut og rett ryggen",
            caption: "Trinn 3 - Spenn magen ut og rett ryggen"
          },
          {
            src: "/trin4.png",
            alt: "Korrekt posisjon - knærne høyere enn hoften. Len fremover og hvil albuene på knærne. Spenn magen ut og rett ryggen",
            caption: "Korrekt posisjon - knærne høyere enn hoften. Len fremover og hvil albuene på knærne. Spenn magen ut og rett ryggen"
          }
        ],
        note: "(Reprodusert med tillatelse fra Ray Addison (UK), kontinenssykepleier og Wendy Ness (UK), kolorektal spesialsykepleier. Norgine 2007.)"
      },
      {
        id: "good_urination_rules",
        title: "Doregler for god tissekvalitet",
        intro: "Sitt framoverbøyd med albuene på knærne og slipp hodet forover.",
        position: "I denne stillingen:",
        conclusion: "Dette bør gjøres ved hver vannlating for å øve på å slippe spenninger i bekkenbunnen.",
        source: "Instruksjonen på \"god tissekvalitet,\" som den heter, er hentet fra boka \"Læringsnøkkelen\" Forfatter: Britt Fadnes og Kirsti Leira, 2010. Hensikten med denne instruksjonen er å ha fokus innover i kroppen, oppnå bedre kroppskontakt og oppdatere hjernens opplevelse av kroppen. Den roer ned indre stress som igjen påvirker spenningen i muskulatur, inkludert bekkenbunnen og dermed gir blære og tarm bedre forhold til å tømme uten bruk av buktrykk.",
        rules: [
          "Kjenn om hodet kan være tungt, og du kan gi slipp i nakken",
          "Kjenn om du kan slippe tennene fra hverandre, hvile kjevene og la tunga hvile midt i munnen",
          "Kjenn om du kan slippe spenninger i magen og la den få lov til i henge ned mot lårene. Når du puster inn merker du kanskje at magen utvidere seg i retninga av lårene, og når du slipper pusten ut synker magen inn igjen",
          "Kjenn om du klarer å slippe alle spenninger i bekkenbunnen og la alle åpninger stå åpne. Som å «åpne alle sluser» og la det begynne å sildretisse. Da tar det litt lengre tid å tisse. Når det har sluttet å renne skal du bli sittende litt og vente på en eventuell restskvett."
        ]
      },
      {
        id: "relaxation",
        title: "Avslapning i muskulatur",
        content: "For at urinen skal passere er det viktig at de indre lukkemusklene i urinrøret og muskulaturen i bekkenbunnen slapper av. Det er viktig å unngå og knipe/spenne muskulaturen. Det kan være en fordel å trene på å knipe og slippe for å kjenne når muskelaturen slapper godt av. Noen kan ha hjelp av å trene på avspenning individuelt med fysioterapeut.\n\nVannlatingsrefleksen krever god tid og oppmerksomhet – og prosessen må få jobbe uavbrutt til blæren er helt tom. Unngå distraksjoner eller stress."
      },
      {
        id: "double_voiding",
        title: "Dobbeltissing",
        content: "Etter endt vannlating kan en gjenta vannlatingen. Dette kan gjøres med å endre stilling ved for eksempel å reise seg opp fra toalettet for så å sette seg og late vannet på ny og se om en da greier å tømme ytterligere."
      },
      {
        id: "catheter",
        title: "Engangskateterisering",
        content: "Dersom en ikke klarer å tømme blæren på vanlig måte, må man lære seg å tømme blæren med kateter. Når man har lært dette, er det en enkel, grei og renslig måte å tømme blæren på.",
        hasLinks: true,
        links: [
          {
            text: "Instruksjonsfilmer fra Wellspect Healthcare",
            url: "http://www.wellspect.no/"
          },
          {
            text: "Instruksjonsfilmer fra Coloplast",
            url: "https://www.coloplast.no/"
          },
          {
            text: "Instruksjonsfilmer fra Hollister",
            url: "https://www.hollister.com/"
          }
        ]
      },
      {
        id: "permanent_catheter",
        title: "Permanent kateter",
        content: "Dersom det ikke er mulig å tømme blæren på annen måte, er det mulig å legge inn et permanent kateter. Selv om det blir byttet regelmessig, vil det i det lange løp alltid innebære mange komplikasjoner. Det er noen fordeler ved å ha kateter direkte inn i blæren gjennom huden i stedet for gjennom urinrøret."
      },
      {
        id: "self_dilation",
        title: "Selvblokking med kateter",
        content: "Har man forsnevring i urinrøret og har blitt behandlet kirurgisk med oppblokking, kan noen også måtte fortsette med å blokke med kateter selv. Dette gjøres ved hjelp av engangskateter som en får opplæring i å utføre. Kateter føres inn i urinrøret forbi det trange området og trekkes ut, og vil på denne måten holde urinrøret åpent."
      },
      {
        id: "medications",
        title: "Medikamenter",
        content: "Tabletter for å få lukkemuskelaturen rundt urinrøret til å slappe bedre av samt tabletter som krymper prostata hos menn er også alternativ dersom slike forhold skaper problemer med å tømme blæren (eks Omnic, Tamsulosin div)."
      },
      {
        id: "exposure",
        title: "Eksponeringstrening",
        content: "Ved tilstander hvor det ikke er påvist noe galt med urinveiene, men hvor problemet skyldes en fobi, bør man henvises til psykologspesialist som har erfaring med behandling av slike tilstander. Eksponeringstrening har vist veldig gode resultater. I tillegg er det nyttig og komme i kontakt med andre i samme situasjon – likemenn. Tilstanden er relativt vanlig, likevel er det få som kjenner til den i Norge."
      }
    ],
    surgicalSections: [
      {
        id: "block_dilation",
        title: "Blokking",
        content: "Blokking er et inngrep som gjøres dersom et område i urinrøret er trangt og skaper passasjehinder. Slik utvidelse av det trange området gjøres i lokalbedøvelse ved hjelp av et instrument som føres forbi og utvider/presser ut det trange partiet."
      },
      {
        id: "internal_urethrotomy",
        title: "Intern urethrotomi",
        content: "Inngrep som innebærer en spalting av forsnevringen i urinrøret. Ved å snitte i/åpne opp det trange området utvides det. Et kateter legges deretter midlertidig inn i urinrøret slik at det holdes åpent en stund til at det har grodd."
      },
      {
        id: "urethroplasty",
        title: "Urethroplastikk",
        content: "Dette inngrepet er ofte eneste måte å bli varig bra på ved plager med striktur. Urethroplastikk innebærer at det innsnevrede partiet av urinrøret fjernes, og det transplanteres slimhinne, f.eks. fra munnslimhinnen, som erstatning."
      },
      {
        id: "turp",
        title: "TUR-P",
        content: "Dersom plager med å late vannet skyldes at prostatakjertelen klemmer inn mot urinrøret, kan deler av prostatavevet fjernes slik at det blir mer åpent og bedre plass for urinen. Dette kalles transurethral reseksjon av prostata (TUR-P)."
      },
      {
        id: "sacral_neuromod",
        title: "Sakral nervemodulering",
        content: "Problemer med vannlatingen kan skyldes at nervesignalene er påvirket og at signaler til både blæremuskulatur, lukkemuskulatur og vannlatingssenter i hjernen, ikke fungerer slik de skal. I enkelte tilfeller kan det forsøkes å stimulere/modulere nervene nede i ryggen (sakral del) som blant annet styrer vannlatingen. Dette gjøres ved hjelp av en elektrode og en stimulator (pacemaker) som gir svake strømsignaler."
      },
      {
        id: "urostomy",
        title: "Urostomi",
        content: "I noen tilfeller er problemene store og uttalte. I tillegg kan det være andre elementer som feks annen sykdom/livssituasjon som spiller inn på hvordan plagene best bør håndteres. Et inngrep om da kan være aktuelt er å få en urinavledning i form av en urostomi. De vil si til at urinen kommer ut via en åpning på magen, som kobles pose på."
      },
      {
        id: "continent_stoma",
        title: "Kontinent stomi",
        content: "Noen ganger kan det lages et innvendig reservoar som man kan tappe med kateter gjennom en åpning på magen. En slik løsning hvor urinen ikke renner ut av seg selv, men må tømmes, kalles kontinent stomi."
      }
    ],
    copingSections: [
      {
        id: "living_with",
        title: "Å leve med tømmingsvansker",
        content: "Ufullstendig vannlating, å ikke få til å late vannet, eller å ha plager som følge av dette, kan påvirke hverdagsliv og livskvalitet. Behandling av tømmingsvansker medfører ofte endring av vaner og rutiner. Slike endringer i hverdagen kan være utfordrende å komme i gang med samt at det krever en egeninnsats for å greie å gjennomføre det. Imidlertid opplever de aller fleste at innsatsen de selv bidrar med gjør situasjonen lettere og målet må være å leve så normalt som mulig.",
        hasImage: true,
        image: {
          src: "/COLOURBOX2272941.jpg",
          alt: "Bilde av en eldre dame som prater med helsepersonell",
          caption: "Bilde av en eldre dame som prater med helsepersonell"
        }
      },
      {
        id: "help_motivation",
        title: "Hjelp og motivasjon",
        content: "I noen tilfeller er det nødvendig å tømme blæren med kateter. Mange opplever en høy terskel for å starte med selvkateterisering. Det kan for eksempel bero på frykt for å skade, om det vil gjøre vondt og tilgjengelighet av utstyr. Det er derfor viktig å få god informasjon om hva det innebærer og opplæring slik at en er trygg på å utføre dette enten selv eller en får hjelp av andre.\n\nHos noen kan det være behov for andre tilpasninger, som for eksempel endring av toalettrutiner, regelmessig blæretømming med mer. Ved å ta kontakt med helsepersonell som jobber med slike tilstander vil en kunne få støtte og veiledning."
      },
      {
        id: "openness_support",
        title: "Åpenhet og støtte",
        content: "Noen kan være bekymret for hva andre vil si, for eksempel partner, venner eller barna. Her må hver enkelt kjenne på hva en ønsker å dele. Ved å være åpen om situasjonen gir man dem rundt seg sjansen til å ta hensyn. Det vil føles trygt å ha mennesker rundt seg som kan støtte en når man trenger det. Barna vil lettere kunne forstå og unngår bekymring dersom de får informasjon."
      },
      {
        id: "time",
        title: "Tid",
        content: "Å tilpasse hverdagen til nye rutiner er en overgangsfase, hvor de nye rutinene vil kunne skape grunnlaget for å leve så normalt som mulig.\n\nDet er viktig å bruke tilstrekkelig tid ved toalettbesøk slik at en evner å få lagt til rette for så optimal tømming som mulig og at en er fokusert på selve vannlatingen. Det er ofte ikke snakk om mange minuttene, men denne tiden er av stor betydning for resultatet."
      }
    ]
  },
  en: {
    pageTitle: "Treatment and Management",
    patientQuote: "I have probably never taken my time in the bathroom and have always rushed to finish quickly.",
    patientAge: "Woman, 82 years old",
    patientGuide: "Further on these pages, you will find information about treatment, including advice on simple measures you can do at home yourself. If conservative measures are not sufficient, surgical procedures may be considered.",
    conservativeTitle: "1. Conservative treatment",
    surgicalTitle: "2. Surgical treatment",
    copingTitle: "3. Coping",
    surgicalIntro: "If conservative treatment has been tried without success, surgical treatment may be appropriate. Sometimes the symptoms are so severe that surgery is chosen directly. It is important to ensure that kidney function is safeguarded when there are problems emptying urine. If there is a risk of kidney damage, the choice of treatment is naturally considered in light of this.",
    copingQuote: "It is important to remember that help is available, and that it is possible to live a good life with urinary retention.",
    copingQuoteAuthor: "Healthcare personnel",
    sections: [
      {
        id: "toilet_habits",
        title: "Establish good toilet habits",
        content: "This means urinating regularly, at least 4 times per day. It is important to adjust the number of bladder emptyings so that the voided volume per void is between 250–400 (max 500) ml. With small urine volumes, one should avoid urinating as soon as one feels something in the bladder, to avoid reduced bladder capacity. Some will need help to urinate \"by the clock\" every 3–4 hours and not by urge. Allow plenty of time on the toilet and avoid stress.",
        hasImage: true,
        image: {
          src: "/oldFemale.jpg",
          alt: "Image of an elderly woman talking with healthcare personnel",
          caption: "Image of an elderly woman talking with healthcare personnel"
        }
      },
      {
        id: "position",
        title: "Position on the toilet is also important",
        content: "Important to have good contact between the feet and the floor when sitting so that one can relax well and have the back slightly forward. For men who urinate standing, it can be relieving to support with a straight arm against the wall behind the toilet and feel that the pelvic floor and buttock muscles relax. Men who have weak bladder muscles usually empty better by sitting than by standing. When women stand, they empty worse.",
        hasGenderTips: true,
        hasPositionImages: true,
        positionImages: [
          {
            src: "/trinn1_0-1.png",
            alt: "Step 1 - Knees higher than hips",
            caption: "Step 1 - Knees higher than hips"
          },
          {
            src: "/trinn2-1.png",
            alt: "Step 2 - Lean forward and rest elbows on knees",
            caption: "Step 2 - Lean forward and rest elbows on knees"
          },
          {
            src: "/trinn3-1.png",
            alt: "Step 3 - Expand the abdomen and straighten the back",
            caption: "Step 3 - Expand the abdomen and straighten the back"
          },
          {
            src: "/trin4.png",
            alt: "Correct position - knees higher than hips. Lean forward and rest elbows on knees. Expand the abdomen and straighten the back",
            caption: "Correct position - knees higher than hips. Lean forward and rest elbows on knees. Expand the abdomen and straighten the back"
          }
        ],
        note: "(Reproduced with permission from Ray Addison (UK), continence nurse, and Wendy Ness (UK), colorectal specialist nurse. Norgine 2007.)"
      },
      {
        id: "good_urination_rules",
        title: "Guidelines for good urination quality",
        intro: "Sit leaning forward with elbows on your knees and let your head drop forward.",
        position: "In this position:",
        conclusion: "This should be done at each urination to practice releasing tension in the pelvic floor.",
        source: "The instruction on 'good urination quality' is from the book 'Læringsnøkkelen' (The Learning Key) by Britt Fadnes and Kirsti Leira, 2010. The purpose is to focus inward on the body, achieve better body awareness and update the brain's perception of the body. It reduces internal stress, which affects muscle tension, including the pelvic floor, and thus gives the bladder and bowel better conditions to empty without using abdominal pressure.",
        rules: [
          "Notice if the head can feel heavy, and you can release the neck",
          "Notice if you can release the teeth from each other, rest the jaws and let the tongue rest in the middle of the mouth",
          "Notice if you can release tension in the abdomen and let it hang down towards the thighs. When you inhale, you may feel the belly expand towards the thighs, and when you exhale it sinks back in",
          "Notice if you can release all tension in the pelvic floor and let all openings remain open. Like 'opening all the gates' and letting the urine start to trickle. This may take a little longer. When it has stopped flowing, remain seated a little while and wait for a possible residual stream."
        ]
      },
      {
        id: "relaxation",
        title: "Muscle relaxation",
        content: "For urine to pass, it is important that the internal sphincter muscles of the urethra and the pelvic floor muscles relax. It is important to avoid clenching/tensing the muscles. It can be beneficial to practice clenching and releasing to feel when the muscles relax well. Some may benefit from practicing relaxation individually with a physiotherapist.\n\nThe urination reflex requires good time and attention – and the process must work uninterrupted until the bladder is completely empty. Avoid distractions or stress."
      },
      {
        id: "double_voiding",
        title: "Double voiding",
        content: "After finishing urination, you can try urinating again. This can be done by changing position, for example by standing up from the toilet and then sitting down and urinating again to see if you can empty more."
      },
      {
        id: "catheter",
        title: "Intermittent catheterization",
        content: "If you cannot empty the bladder in the usual way, you must learn to empty the bladder with a catheter. Once learned, this is a simple, clean way to empty the bladder.",
        hasLinks: true,
        links: [
          {
            text: "Instructional videos from Wellspect Healthcare",
            url: "http://www.wellspect.no/"
          },
          {
            text: "Instructional videos from Coloplast",
            url: "https://www.coloplast.no/"
          },
          {
            text: "Instructional videos from Hollister",
            url: "https://www.hollister.com/"
          }
        ]
      },
      {
        id: "permanent_catheter",
        title: "Permanent catheter",
        content: "If it is not possible to empty the bladder in any other way, a permanent catheter may be considered. Even if it is changed regularly, in the long run it will always involve complications. There are some advantages to having a catheter placed directly into the bladder through the skin instead of through the urethra."
      },
      {
        id: "self_dilation",
        title: "Self-dilation with catheter",
        content: "If there is a narrowing of the urethra and it has been treated surgically by dilation, some may need to continue dilating themselves with a catheter. This is done with a single-use catheter that you are trained to perform. The catheter is inserted past the narrow area and withdrawn, keeping the urethra open."
      },
      {
        id: "medications",
        title: "Medications",
        content: "Tablets to help the sphincter muscles around the urethra relax better, as well as tablets that shrink the prostate in men, are also alternatives if such conditions cause problems emptying the bladder (e.g. Omnic, Tamsulosin, etc.)."
      },
      {
        id: "exposure",
        title: "Exposure training",
        content: "In conditions where nothing is found wrong with the urinary tract, but where the problem is due to a phobia, one should be referred to a psychologist specialist who has experience treating such conditions. Exposure training has shown very good results. In addition, it is useful to get in contact with others in the same situation – peer support. The condition is relatively common, yet few are aware of it in Norway."
      }
    ],
    surgicalSections: [
      {
        id: "block_dilation",
        title: "Dilation",
        content: "Dilation is performed if an area in the urethra is narrow and creates an obstruction. The tight area is widened under local anesthesia using an instrument that is passed through and expands/presses out the tight segment."
      },
      {
        id: "internal_urethrotomy",
        title: "Internal urethrotomy",
        content: "A procedure involving incision of the urethral stricture. By cutting/opening the narrow area, it is widened. A catheter is then temporarily placed in the urethra to keep it open for a while until it has healed."
      },
      {
        id: "urethroplasty",
        title: "Urethroplasty",
        content: "This procedure is often the only way to achieve permanent improvement for stricture problems. Urethroplasty involves removing the narrowed part of the urethra, and transplanting mucous membrane, for example from the oral mucosa, as a replacement."
      },
      {
        id: "turp",
        title: "TUR-P",
        content: "If problems with urinating are due to the prostate gland pressing against the urethra, parts of the prostate tissue can be removed so that it becomes more open and better space for urine. This is called transurethral resection of the prostate (TUR-P)."
      },
      {
        id: "sacral_neuromod",
        title: "Sacral neuromodulation",
        content: "Problems with urination can be due to nerve signals being affected and signals to both the bladder muscle, sphincter muscle and urination center in the brain, not functioning as they should. In some cases, it can be attempted to stimulate/modulate the nerves in the lower back (sacral part) which among other things control urination. This is done using an electrode and a stimulator (pacemaker) that provides weak electrical signals."
      },
      {
        id: "urostomy",
        title: "Urostomy",
        content: "In some cases, the problems are large and significant. In addition, there may be other elements such as other illness/life situation that play into how the complaints are best managed. A procedure that may then be relevant is to get urinary diversion in the form of a urostomy. This means that urine comes out via an opening in the abdomen, to which a bag is attached."
      },
      {
        id: "continent_stoma",
        title: "Continent stoma",
        content: "Sometimes an internal reservoir can be created that can be drained with a catheter through an opening in the abdomen. Such a solution where urine does not run out by itself, but must be emptied, is called a continent stoma."
      }
    ],
    copingSections: [
      {
        id: "living_with",
        title: "Living with emptying difficulties",
        content: "Incomplete urination, not being able to urinate, or having complaints as a result of this, can affect daily life and quality of life. Treatment of emptying difficulties often involves changing habits and routines. Such changes in everyday life can be challenging to get started with and it requires personal effort to manage to carry it out. However, most people find that the effort they contribute makes the situation easier and the goal must be to live as normally as possible.",
        hasImage: true,
        image: {
          src: "/COLOURBOX2272941.jpg",
          alt: "Image of an elderly woman talking with healthcare personnel",
          caption: "Image of an elderly woman talking with healthcare personnel"
        }
      },
      {
        id: "help_motivation",
        title: "Help and motivation",
        content: "In some cases, it is necessary to empty the bladder with a catheter. Many experience a high threshold for starting with self-catheterization. This may be due to fear of injury, whether it will hurt, and availability of equipment. It is therefore important to get good information about what it entails and training so that one is confident in performing this either oneself or getting help from others.\n\nFor some, there may be a need for other adaptations, such as changing toilet routines, regular bladder emptying, and more. By contacting healthcare personnel who work with such conditions, one can get support and guidance."
      },
      {
        id: "openness_support",
        title: "Openness and support",
        content: "Some may be concerned about what others will say, for example partner, friends or children. Here, each person must feel what they want to share. By being open about the situation, you give those around you the chance to be considerate. It will feel safe to have people around you who can support you when you need it. Children will more easily understand and avoid worry if they receive information."
      },
      {
        id: "time",
        title: "Time",
        content: "Adapting everyday life to new routines is a transition phase, where the new routines can create the foundation for living as normally as possible.\n\nIt is important to use sufficient time during toilet visits so that one is able to arrange for as optimal emptying as possible and that one is focused on the urination itself. It is often not a matter of many minutes, but this time is of great importance for the result."
      }
    ]
  }
};

export const Treatment = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const introduction = INTRODUCTION_DATA[language];

  const data = TREATMENT_DATA[language];

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/treat.png" alt="Treatment" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {data.pageTitle}
        </h2>
      </div>
      <div className={styles.sectionContent}>
        
        <div className={styles.normalFunctionSection}>
          <div className={styles.highlightBox}>
            <p>
              {data.patientQuote}
            </p>
            <p className={styles.quoteAuthor}>
              {data.patientAge}
            </p>
          </div>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {data.patientGuide}
            </p>
          </div>
        </div>
        
        
        {/* 1. Konservativ behandling */}
        <SectionAccordion 
          title={data.conservativeTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
        {data.sections.map((section) => (
          <SectionAccordion 
            key={section.id}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {section.hasImage && section.image ? (
              <div className={styles.anatomyGrid}>
                <div>
                  <p className={styles.enhancedParagraph}>
                    {section.content}
                  </p>
                </div>
                <div className={styles.anatomyItem}>
                  <img 
                    src={section.image.src} 
                    alt={section.image.alt} 
                    className={styles.anatomyImage}
                  />
                  <p className={styles.anatomyCaption}>
                    {section.image.caption}
                  </p>
                </div>
              </div>
            ) : (
              <p className={styles.enhancedParagraph}>
                {section.content}
              </p>
            )}

            {(section.hasGenderTips || section.hasPositionImages) && (
              <div className={styles.anatomySection}>
                <div className={styles.anatomyGrid}>
                  {section.hasGenderTips && (
                    <div>
                      <div className={styles.highlightBox}>
                        <h5 className={styles.enhancedSubheading}>
                          {language === 'no' ? 'Menn' : 'Men'}
                        </h5>
                        <ul className={styles.resourceList}>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Sitt ned når du tisser' : 'Sit down when you urinate'}
                          </li>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Ha god kontakt mellom føttene og gulvet' : 'Have good contact between feet and floor'}
                          </li>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Len deg lett fremover' : 'Lean slightly forward'}
                          </li>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Slapp av i bekkenbunnen' : 'Relax the pelvic floor'}
                          </li>
                        </ul>
                      </div>
                      <div className={styles.highlightBox} style={{ marginTop: '1rem' }}>
                        <h5 className={styles.enhancedSubheading}>
                          {language === 'no' ? 'Kvinner' : 'Women'}
                        </h5>
                        <ul className={styles.resourceList}>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Sitt ned når du tisser' : 'Sit down when you urinate'}
                          </li>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Ha god kontakt mellom føttene og gulvet' : 'Have good contact between feet and floor'}
                          </li>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Len deg lett fremover' : 'Lean slightly forward'}
                          </li>
                          <li className={styles.resourceListItem}>
                            {language === 'no' ? 'Slapp av i bekkenbunnen' : 'Relax the pelvic floor'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {section.hasPositionImages && (
                    <div className={styles.anatomyItem}>
                      <div className={styles.anatomyGrid}>
                        {section.positionImages!.map((image) => (
                          <div key={image.src} className={styles.anatomyItem}>
                            <img 
                              src={image.src} 
                              alt={image.alt} 
                              className={styles.anatomyImage}
                            />
                            <p className={styles.anatomyCaption}>
                              {image.caption}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className={styles.illustrationDescription}>
                        {section.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {section.id === 'good_urination_rules' && (
              <>
                <p className={styles.enhancedParagraph}>
                  {section.intro}
                </p>
                <p className={styles.enhancedParagraph}>
                  {section.position}
                </p>
                <ul className={styles.diagnosisList}>
                  {section.rules!.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
                <p className={styles.enhancedParagraph}>
                  {section.conclusion}
                </p>
                <div className={styles.highlightBox}>
                  <p>
                    {section.source}
                  </p>
                </div>
              </>
            )}

            {section.hasLinks && section.links && (
              <div className={styles.resourcesSection}>
                <h4 className={styles.resourcesTitle}>
                  {language === 'no' ? 'Instruksjonsressurser:' : 'Instructional Resources:'}
                </h4>
                <ul className={styles.resourceList}>
                  {section.links.map((link) => (
                    <li key={link.url} className={styles.resourceListItem}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.resourceLink}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </SectionAccordion>
        ))}
        </SectionAccordion>

        {/* 2. Kirurgisk behandling */}
        <SectionAccordion 
          title={data.surgicalTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.surgicalIntro}</p>
        </div>

        {data.surgicalSections.map((section) => (
          <SectionAccordion 
            key={section.id}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {section.content}
            </p>
          </SectionAccordion>
        ))}
        </SectionAccordion>

        {/* 3. Mestring */}
        <SectionAccordion 
          title={data.copingTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
        <div className={styles.highlightBox}>
          <p>{data.copingQuote}</p>
          <p className={styles.quoteAuthor}>{data.copingQuoteAuthor}</p>
        </div>

        {data.copingSections.map((section) => (
          <SectionAccordion 
            key={section.id}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {section.hasImage && section.image ? (
              <div className={styles.anatomyGrid}>
                <div>
                  {Array.isArray(section.content) ? (
                    section.content.map((content) => (
                      <p key={content} className={styles.enhancedParagraph}>{content}</p>
                    ))
                  ) : (
                    <p className={styles.enhancedParagraph}>
                      {section.content}
                    </p>
                  )}
                </div>
                <div className={styles.anatomyItem}>
                  <img 
                    src={section.image.src} 
                    alt={section.image.alt} 
                    className={styles.anatomyImage}
                  />
                  <p className={styles.anatomyCaption}>
                    {section.image.caption}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {Array.isArray(section.content) ? (
                  section.content.map((content) => (
                    <p key={content} className={styles.enhancedParagraph}>{content}</p>
                  ))
                ) : (
                  <p className={styles.enhancedParagraph}>
                    {section.content}
                  </p>
                )}
              </>
            )}
          </SectionAccordion>
        ))}
        </SectionAccordion>

      </div>
    </div>
    </>
  );
};