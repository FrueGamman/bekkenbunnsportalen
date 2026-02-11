"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

// Bilingual data structure for treatment content
const TREATMENT_DATA = {
  no: {
    pageTitle: "Behandling",
    introQuote: "\"Oi! Jeg kjenner musklene i bekkenbunnen min! De har jeg ikke kjent på 20 år!\"",
    introQuoteAuthor: "Kvinne, 50 år, etter behandling med sakralnervestimulering",
    mainIntro: "Etter utredning vil du og lege avgjøre hvilken behandling som er best for deg. I de aller fleste tilfeller vil en starte med konservativ behandling. Konservativ behandling har for mange god effekt og medfører liten risiko for bivirkninger og komplikasjoner. Konservativ behandling krever en aktiv egeninnsats og forløpet kan ofte strekke seg over tid.",
    mainIntro2: "Dersom en ikke oppnår ønsket effekt med konservativ tilnærming vil det være aktuelt med kirurgisk behandling. Dette kan være ulike inngrep. Type inngrep vurderes ut ifra hvert enkelt tilfelle. De fleste som trenger inngrep for å bedre sine plager har også nytte av konservativ behandling i tillegg. Du kan lese mer om de ulike behandlingsalternativene på de påfølgende sidene.",
    
    conservativeTitle: "Konservativ behandling",
    conservativeIntro: "Første steg i behandling av avføringslekkasje er konservativ behandling. Det betyr enhver behandling som ikke medfører kirurgiske inngrep. Hvis inngrep er nødvendig bør det likevel kombineres med konservativ behandling for optimalt resultat.",
    conservativeApproach: "Konservativ behandling gjennomføres vanligvis hos sykepleier og fysioterapeut. Der vil det bli gjort en utredning av livsstil for å se på om man kan forandre eller påvirke noe for å redusere lekkasjene. Resultater fra slik konservativ behandling har vist svært god effekt.",
    guidanceComponents: "Veiledningen består av:",
    component1: "Kartlegging og eventuelt endring av dorutiner",
    component2: "Kartlegging av mat og drikke",
    component3: "Regulering av konsistensen på avføringen gjennom kosthold eller medikamenter",
    component4: "Bekkenbunnstrening",
    component5: "Bruk av ulike hjelpemidler",
    component6: "Hvordan oppnå komplett tømming av endetarmen for å unngå lekkasje",
    component7: "Irrigasjon (assistert tarmtømming)",
    
    lifestyleTitle: "Livsstilsendring",
    lifestyleDesc: "Livsstilsendring innebærer at man får hjelp til å se med nye øyne hva man kan gjøre i hverdagen for å bedre situasjonen. Hvor ofte går man på do, lytter man til kroppens signaler, hvordan \"spille på lag\" med kroppens reflekser og hva kan man gjøre for å snu uønskede mønstre? Hvorfor er det med aktivitet og mosjon? Økt bevissthet om disse forholdene og et helhetlig bilde på hvordan hverdagen arter seg, gjør det lettere å vurdere hva som bør endres og justeres på.",
    
    dietaryTitle: "Kostveiledning",
    dietaryDesc: "Kostveiledning og eventuelt kostendring kan være viktig for å unngå mat som kan gi økte plager. Slike kostråd er generelle og det er viktig å prøve seg frem for å se hva som fungerer best for den enkelte. For mange som opplever at konsistensen på avføringen er med på å forsterke plagene, vil justeringer i kosten kunne virke positivt og gjenopprette normal avføringskonsistens. Både løs og hard avføring kan forverre lekkasjeplagene. Fiber spiller en viktig rolle for regulering av konsistensen, mens noen typer fiber kan forverre plagene. Enkelte kan merke at sterkt krydret mat, fet mat, alkohol og kustig søtningsstoff kan føre til løsere avføring. Dette gjelder også mat og drikke som inneholder koffein. For noen vil det være gunstig å supplere med konsistensregulerende medikamenter/midler for å opprettholde en konsistens som er lett å kvittere komplett, samt forhindrer lekkasje. Eksempel kan være Vi-Siblin (fibertilskudd).",
    
    bristolScaleTitle: "Bristol skala",
    bristolScaleDesc: "Bristol skala, også kalt Bristol stool scale eller Bristol stool chart, er et diagnostisk verktøy som klassifiserer avføringskonsistensen i syv ulike kategorier. Kategoriene én til syv graderes fra hard avføring (1) til flytende avføring (7). Ved problemer tilstrebes konsistensregulering for å oppnå nummer 4, som regnes som normal avføring. Avføringstype nr 4 er mest optimal for å oppnå kontinens samt komplett tømming.",
    
    medicationsTitle: "Medikamenter",
    medicationsDesc: "Som supplement for å gjøre noe med konsistensen på avføringen kan det være hensiktsmessig å forsøke medikamenter. Noen har for hard avføring som gjør at det etter tømming kommer tynnflytende avføring som er vanskelig å kontrollere. Andre har løsere konsistens på avføringen og som gjør at det er vanskelig å holde igjen og det oppstår lekkasje. I samarbeid med sykepleier/lege finner man frem til det beste alternativet.",
    
    pelvicFloorTitle: "Bekkenbunnstrening",
    pelvicFloorDesc: "Her kan du se en instruksjonsfilm om hvordan man trener bekkenbunnen:",
    pelvicFloorTryTitle: "Prøv selv:",
    pelvicFloorTry1: "Knip (lukk) igjen rundt urinrør, skjede- og endetarmsåpning.",
    pelvicFloorTry2: "Kvinner: Kjenn at området mellom skjede og endetarm trekker seg litt opp og inn i kroppen. Du kan også legge et par fingre på det samme stedet (mellomkjøttet/perineum) og kjenne at det løftes litt vekk fra fingrene dine når du bruker bekkenbunnen riktig.",
    pelvicFloorTry3: "Menn: Kjenn at området mellom pungen og endetarmen (mellomkjøttet/perineum) trekker seg litt opp og inn i kroppen. Penis vil gjøre en \"vippe-bevegelse\" som følge av muskeldraget rundt urinrøret.",
    pelvicFloorTips: "Tips: Forestill deg at du skal holde igjen for luft eller stoppe urinstrålen. Det er disse musklene du skal trene.",
    pelvicFloorRelax: "Mage-, lår- og setemusklene skal være avslappet. Fokuser på å bruke riktig muskulatur og unngå å spenne annen muskulatur.",
    pelvicFloorBegin: "Begynn med å holde i 2-3 sekunder, slipp like lenge. Det er like viktig å hvile helt mellom hvert knip, som det er å knipe, ellers vil man ikke få riktig tak.",
    pelvicFloorRepeat: "Gjenta 15 ganger morgen og kveld. For noen kan 15 knip være mye i starten. Det er viktigere og få til gode og korrekte knip, enn flest mulig. Antall knip kan økes etterhvert.",
    pelvicFloorIncrease: "Øk knipetiden litt etter litt. For eksempel kan du øke med 1-2 sekunder hver uke, til du er oppe i 10-12 sekunder. Knipene skal være kontrollerte. Dersom taket \"slipper\" er det bedre å redusere knipetiden slik at det blir et sterkt og godt knip.",
    
    electrostimulationTitle: "Elektrostimulering/biofeedback",
    biofeedbackDesc: "Hvis det er vanskelig å \"få tak i\" bekkenbunnsmuskulaturen, kan man bruke biofeedback. Metoden går ut på at man visuelt får en tilbakemelding om man bruker musklene på riktig måte. Dette skjer ved hjelp av en probe i endetarmen eller overflateelektroder som avleser muskelaktivitet. Proben eller elektrodene er koblet til en liten monitor. Monitoren gir informasjon om hvor mye du kniper og hvor mye du relakserer muskulaturen.",
    electrostimulationDesc: "Elektrostimulering med svakelektrisk strøm kan benyttes for å trene muskulaturen. Stimuleringen gjøres ved hjelp av en probe i endetarmen eller i skjeden, som er koblet til apparatet. Strømstyrken økes til en selv greier å \"få tak i\" muskulaturen.",
    professionalGuidanceNote: "Opplæring og oppfølging av biofeedback og elektrostimulering bør skje under profesjonell veiledning. Det er viktig å huske på at trening, både med og uten biofeedback eller elektrostimulering, må utføres regelmessig for å bygge opp muskulaturen og for å vedlikeholde den.",
    
    aidsTitle: "Hjelpemidler",
    aidsDesc: "For mange er det stor nytte og hjelp i ulike inkontinensprodukter som innlegg, hudpleieprodukter, ulike analpropper, ballongskyllesprøyte og irrigasjonssett. Mange av produktene inngår i offentlig refusjonsordning, og kan fås på blåresept.",
    
    completeEmptyingTitle: "Komplett tømming",
    completeEmptyingDesc: "Ved at tarmen er komplett tømt ved tarmtømming (defekasjon) reduseres risikoen for å oppleve siving av avføring etter toalettbesøk. I denne forbindelse er sittestilling med reduksjon av den anorektale vinkelen, av betydning for raskere og mer komplett tarmtømming. Dette oppnås best ved å innta en lett foroverbøyd sittestilling med rett rygg der knærne er høyere enn hoftene (huksittende, evt med bruk av fotkrakk), og en avslappet holdning samtidig som en puster med magen. For mer informasjon om råd ved sittestilling kan du lese på siden om tømmingsproblemer for avføring.",
    
    taiTitle: "Tarmtømming med transanal irrigasjon",
    taiDesc: "I enkelte tilfeller er det behov for assistert tømming. Transanal irrigasjon (TAI) er en metode som tømmer tarmen ved at vann føres inn i tykktarmen via et kateter (plastrør) i endetarmen. Vannet stimulerer tarmens peristaltiske bevegelser til å kvitte seg med avføring fra endetarmen og nedre del av tykktarmen. For mange er dette en effektiv metode og en får opplæring av helsepersonell i hvordan utføre dette. Regelmessig irrigasjon kan forebygge lekkasjer og gir kontroll over når og hvor avføringen skal skje.",
    taiBalloonDesc: "Ut fra symptomer og behov kan det for noen være tilstrekkelig å bare skylle den nedre delen av rektum. I slike tilfeller kan en benytte en ballongsprøyte som er en \"enklere\" variant av tarmskylling.",
    taiPrincipleDesc: "Prinsippet bak TAI er det samme, men utstyret finnes i ulike varienter fra ulike leverandører. Noen er på refusjon/blåresept, disse ser du her:",
    
    proceduresTitle: "Inngrep",
    proceduresIntro: "For pasienter som ikke oppnår tilfredsstillende resultat av konservative tiltak, kan kirurgisk behandling være aktuelt. Indikasjon er avføringslekkasje eller luftlekkasje kombinert med manglende evne til å utsette avføring ved trang (urgency).",
    
    snmTitle: "Sakral nervemodulering (SNM)",
    snmDesc: "SNM er anvendt innenfor urologi, gastrokirurgi og senest også gynekologi. Indikasjonen for SNM for avføringslekkasje er vedvarende, ukentlig lekkasje for fast eller flytende avføring, etter gjennomgått konservativ behandling. Ved sammensatte bekkenbunnsdysfunksjoner som for eksempel lekkasje av både urin og avføring, bør metoden vurderes tidlig ved manglende effekt av konservativ behandling.",
    snmDesc2: "SNM er en kirurgisk prosedyre som gjøres på operasjonsstua med lokalbedøvelse og sedasjon, eller i narkose. Sakralnervemodulering innebærer at en sakralnerverot stimuleres elektrisk ved hjelp av en elektrode og en pacemaker. Elektroden legges inn langs de sakrale nerverøttene i bekkenet, enten langs sakralnerve S3 eller S4. Elektroden kobles til pacemakeren i et lukket system under huden. Systemet generer en mild elektrisk impuls som fører til en kompleks modulering av motoriske, sensoriske og autonome nervebaner i både det sentrale og perifere nervesystem. Dette bidrar til en normalisering av vannlating- og avføringsfunksjon, samt påvirker bekkenbunnsmuskulatur.",
    snmDesc3: "Metoden kan utføres enten som en to-trinns prosedyre hvor første trinn er innleggelse av elektrode med en treukers testperiode. Dersom testen gir tilfredsstillende reduksjon i antall lekkasjeepisoder og bedrer plagene, implanteres pacemakeren i andre trinn. Prosedyren kan også gjennomføres i én seanse hvor elektrode og pacemaker blir implantert direkte. Valg av metode avhenger av indikasjon for behandling og klinisk vurdering av kirurg. I dag benyttes et MR-kompatibelt system. Pacemakeren har en batterilevetid på 8 – 15 år, avhengig av type pacemaker og strømforbruk. Når batteriet er utbrukt erstattes den gamle pacemakeren med en ny.",
    snmDesc4: "SNM er en trygg og lite invasiv metode. Suksessraten på SNM ligger mellom 60-90% avhengig av indikasjon. Grovt kan man si at 1/3 blir helt bra, 1/3 blir bedre, mens 1/3 ikke har effekt. SNM er forbundet med få komplikasjoner. Under 4 % av pasienter operert i Norge opplever infeksjon som medfører fjerning av utstyret. De fleste pasientene vil ha behov for oppfølgning med justering av pacemakerinnstillingene.",
    snmDesc5: "Reoperasjon med bytte av elektrode på grunn av endret effekt, eller flytting av pacemaker grunnet smerter eller ubehag forekommer. Andre komplikasjoner er smerte eller ubehag rundt elektrode eller utstrålende smerter til ytre genitalier, lyske eller lår. Dette kan ofte bedres ved justering av stimuleringen. Mellom 10 og 20% av pasientene får likevel utstyret fjernet grunnet tap av effekt eller ubehag som nevnt over.",
    snmDesc6: "SNM for avføringslekkasje tilbys ved alle helseregioner i Norge. Alle operasjoner med SNM for avføringslekkasje blir etter samtykke registrert i Norsk register for avføringslekkasje (NRA).",
    
    sphincterRepairTitle: "Sfinkterplastikk",
    sphincterRepairDesc: "Analkanalen er nederste del av endetarmen og består av indre og ytre sfinkter. Indre sfinkter er en fortsettelse av tarmveggen som er fortykket til en ringmuskel. Denne består av glatt muskulatur som styres av det autonome nervesystemet. Ytre sfinkter er en ring av tverrstripet muskulatur som former en trakt. Ved skade på endetarmens lukkemuskler, for eksempel under fødsel, kan det oppstå lekkasje for luft og/eller avføring. Ved sfinkterplastikk rekonstrueres eventuell defekt i indre og/eller ytre lukkemuskel. Hensikten er å gjennomrette normal anatomi av lukkemusklene som omgir analkanalen.",
    sphincterRepairDesc2: "Den største risikofaktoren for skade på analsfinkter er vaginal fødsel. Alle sfinkterskader som avdekkes etter fødsel skal rekonstrueres innen 12 timer. I tilfeller der skaden avdekkes i ettertid eller ved fortsatt defekt sfinktermuskulatur, kan sekundær sfinkterplastikk være aktuelt.",
    sphincterRepairDesc3: "70 – 80% av pasientene oppgir et godt resultat ett år etter kirurgi. Fullstendig kontinens oppnås sjeldent, men pasientene rapporterer en bedring i livskvalitet og er generelt tilfreds med resultatet. Effekten av sfinkterplastikk synes imidlertid å avta med tiden.",
    sphincterRepairDesc4: "Vanlige komplikasjoner er sårinfeksjon og at stingene går opp, noe som oftest behandles konservativt uten at plastikken ødelegges. Større sårinfeksjoner kan imidlertid føre til behov for reoperasjoner.",
    sphincterRepairDesc5: "Som følge av at SNM nå er etablert som førstevalg ved kirurgisk behandling av avføringslekkasje, utføres relativt få inngrep med sfinkterplastikk årlig.",
    
    colostomyTitle: "Kolostomi",
    colostomyDesc: "En kolostomi er en kirurgisk laget åpning der tykktarmen legges ut på magen og dette kalles en stomi. Tarmen føres ut gjennom bukveggen og sys fast på huden. Stomien er rød og fuktig. Det er ingen nerveender i stomien, og derfor ingen følelse i selve stomien.",
    colostomyDesc2: "Kolostomi kan benyttes der ingen av ovenstående tiltak har fungert, inkludert konservativ behandling. Mange pasienter synes dette er et svært godt alternativ hvor de oppnår kontroll og unngår ufrivillig lekkasje. Livskvaliteten ved en kolostomi øker ved regelmessige tarmtømminger. Et hjelpemiddel kan være å irrigere tarmen (tarmskylling).",
    
    appendicostomyTitle: "Appendicostomi for antegrad tarmirrigasjon",
    appendicostomyDesc: "Appendicostomi er utleggelse av blindtarmen som en åpning på magen (blindtarmsstomi) Dette muliggjør antegrad irrigasjon av kolon. Antegrad irrigasjon er skylling av tykktarmen fra høyre side av tarmen og i «transport- retningen\". Denne metoden benyttes hos pasienter med inkontinens, eventuelt kombinert med forstoppelse eller annen tømningsforstyrrelse. De fleste av pasientene har allerede et etablert analt skylleprogram (irrigasjon). Dette er et lite kirurgiske inngrep. Utenom skyllingene kan åpningen dekkes med et lite plaster.",
    appendicostomyDesc2: "Frekvensen av irrigasjon vil variere noe fra pasient til pasient, men 3 – 7 ganger i uken er vanlig for å unngå avføringslekkasje. Via åpningen settes det inn ett kateter. Gjennomsnittlig benyttes ca 1.5 liter vann ved hver skylling hos voksne.",
    appendicostomyDesc3: "Den vanligste komplikasjonen er sammenvoksing av åpningen. Dette kan korrigeres med blokking eller revisjon.",
    
    // Mestring (Coping) section
    mestringTitle: "Mestring",
    mestringQuote: "\"Jeg var på hyttetur i påsken sammen med venner. Det er ikke helt enkelt, men jeg planlegger godt og er nøye med kost og rutiner, så går det greit. Det blir for kjedelig å sitte hjemme hele tiden.\"",
    mestringQuoteAuthor: "Mann, 30 år",
    livingWithTitle: "Å leve med avføringslekkasje",
    livingWithDesc: "Hvis behandlingen bare delvis eller ikke er vellykket, kan man måtte innse at dette er noe man må leve med. I så tilfelle er det flere ting som kan gjøre situasjonen lettere, og målet må være å leve så normalt som mulig.",
    whatHelpsTitle: "Hva kan gjøre situasjonen bedre?",
    helpMotivationTitle: "Hjelp og motivasjon",
    helpMotivationDesc: "Ved å ta skrittet med å søke hjelp og nå frem til helsepersonell som jobber med avføringslekkasje, vet vi at situasjonen blir lettere. Det å få forståelse og aksept for at dette er et problem, kan i seg selv gi en bedre hverdag.",
    eatDrinkLiveNormalTitle: "Spise, drikke, leve normalt",
    eatDrinkLiveNormalDesc: "\"Jeg sluttet å spise mat for å unngå å få så mye avføring\", er en setning vi dessverre hører av og til. Denne strategien gjør imidlertid ikke livssituasjonen bedre. Man går ned i vekt, og taper muskelmasse og energi.",
    opennessFamilyTitle: "Åpenhet og støtte i familien",
    opennessFamilyDesc: "Å skjule store problemer for sine nærmeste kan føre til at man isolerer seg fra dem. De nærmeste vil ofte vite at noe er galt, og det er bedre å si at man har et problem. Da gir man dem rundt seg sjansen til å ta hensyn og hjelpe til med tilretteleggingen av hverdagen. Vi som mennesker er avhengige av å ha andre mennesker rundt oss som kan støtte oss når vi trenger det.",
    mapAdaptDailyLifeTitle: "Kartlegge og tilpasse hverdagen",
    mapAdaptDailyLifeDesc: "Ved å kartlegge når problemene er verst, blir det lettere å fungere i hverdagen. Når kommer lekkasjene, er det noe spesielt som utløser dem, og er det noen hjelpemidler som vil kunne bedre situasjonen? Helsepersonell vil kunne veilede og anbefale tiltak.",
    sexualityTitle: "Avføringslekkasje og seksualitet",
    sexualityDesc: "Behovet for nærhet og kontakt er sterkt og viktig, og frykt for for eksempel lukt kan gjøre at den som lider av lekkasje setter opp en barriere mellom seg og sine nærmeste. Bare det å prate åpent om problemet i et parforhold kan senke denne barrieren. Det er ikke lett å være partner og ikke forstå hva din nærmeste går gjennom. Ved å ha en åpen kommunikasjon kan man unngå konflikter, både uttalte og uuttalte, noe som skaper rom for nærhet.",
    sexualityDesc2: "Nærhet er noe alle trenger, både pasient og pårørende."
  },
  en: {
    pageTitle: "Treatment",
    introQuote: "\"Wow! I can feel the muscles in my pelvic floor! I haven't felt them for 20 years!\"",
    introQuoteAuthor: "Woman, 50 years old, after treatment with sacral nerve stimulation",
    mainIntro: "After assessment, you and your doctor will decide which treatment is best for you. In most cases, conservative treatment will be started first. Conservative treatment has good effect for many people and carries little risk of side effects and complications. Conservative treatment requires active personal effort and the process can often extend over time.",
    mainIntro2: "If the desired effect is not achieved with a conservative approach, surgical treatment may be relevant. This can involve various procedures. The type of procedure is assessed based on each individual case. Most people who need procedures to improve their symptoms also benefit from conservative treatment in addition. You can read more about the different treatment options on the following pages.",
    
    conservativeTitle: "Conservative treatment",
    conservativeIntro: "The first step in treating fecal incontinence is conservative treatment. This means any treatment that does not involve surgical procedures. If procedures are necessary, they should still be combined with conservative treatment for optimal results.",
    conservativeApproach: "Conservative treatment is usually carried out by nurses and physiotherapists. There, an assessment of lifestyle will be made to see if anything can be changed or influenced to reduce the leakage. Results from such conservative treatment have shown very good effect.",
    guidanceComponents: "The guidance consists of:",
    component1: "Mapping and possibly changing toilet routines",
    component2: "Mapping of food and drink",
    component3: "Regulating the consistency of bowel movements through diet or medications",
    component4: "Pelvic floor training",
    component5: "Use of various aids",
    component6: "How to achieve complete emptying of the rectum to avoid leakage",
    component7: "Irrigation (assisted bowel emptying)",
    
    lifestyleTitle: "Lifestyle changes",
    lifestyleDesc: "Lifestyle changes involve getting help to see with new eyes what you can do in everyday life to improve the situation. How often do you go to the toilet, do you listen to the body's signals, how to \"play along\" with the body's reflexes and what can you do to reverse unwanted patterns? How is it with activity and exercise? Increased awareness of these conditions and a holistic picture of how everyday life unfolds makes it easier to assess what should be changed and adjusted.",
    
    dietaryTitle: "Dietary guidance",
    dietaryDesc: "Dietary guidance and possibly dietary changes can be important to avoid foods that can cause increased problems. Such dietary advice is general and it is important to try things out to see what works best for the individual. For many who experience that the consistency of bowel movements contributes to worsening the problems, adjustments in the diet can have a positive effect and restore normal bowel consistency. Both loose and hard bowel movements can worsen leakage problems. Fiber plays an important role in regulating consistency, while some types of fiber can worsen the problems. Some may notice that strongly spiced food, fatty food, alcohol and artificial sweeteners can lead to looser bowel movements. This also applies to food and drink containing caffeine. For some, it may be beneficial to supplement with consistency-regulating medications/agents to maintain a consistency that is easy to eliminate completely, and prevents leakage. An example can be Vi-Siblin (fiber supplement).",
    
    bristolScaleTitle: "Bristol scale",
    bristolScaleDesc: "Bristol scale, also called Bristol stool scale or Bristol stool chart, is a diagnostic tool that classifies bowel consistency into seven different categories. Categories one to seven are graded from hard bowel movement (1) to liquid bowel movement (7). For problems, consistency regulation is sought to achieve number 4, which is considered normal bowel movement. Bowel movement type no. 4 is most optimal for achieving continence as well as complete emptying.",
    
    medicationsTitle: "Medications",
    medicationsDesc: "As a supplement to do something about the consistency of bowel movements, it may be appropriate to try medications. Some have too hard bowel movements which makes thin liquid bowel movements that are difficult to control come after emptying. Others have looser consistency of bowel movements which makes it difficult to hold back and leakage occurs. In cooperation with nurse/doctor, you find the best alternative.",
    
    pelvicFloorTitle: "Pelvic floor training",
    pelvicFloorDesc: "Here you can see an instructional film about how to train the pelvic floor:",
    pelvicFloorTryTitle: "Try yourself:",
    pelvicFloorTry1: "Squeeze (close) around the urethra, vagina and anal opening.",
    pelvicFloorTry2: "Women: Feel that the area between the vagina and anus pulls up and into the body a little. You can also place a couple of fingers on the same spot (perineum) and feel that it lifts slightly away from your fingers when you use the pelvic floor correctly.",
    pelvicFloorTry3: "Men: Feel that the area between the scrotum and anus (perineum) pulls up and into the body a little. The penis will make a \"rocking movement\" as a result of the muscle pull around the urethra.",
    pelvicFloorTips: "Tips: Imagine that you are going to hold back air or stop the urine stream. These are the muscles you should train.",
    pelvicFloorRelax: "Abdominal, thigh and buttock muscles should be relaxed. Focus on using the right muscles and avoid tensing other muscles.",
    pelvicFloorBegin: "Start by holding for 2-3 seconds, release for the same time. It is equally important to rest completely between each squeeze, as it is to squeeze, otherwise you won't get the right grip.",
    pelvicFloorRepeat: "Repeat 15 times morning and evening. For some, 15 squeezes may be a lot at first. It is more important to get good and correct squeezes, than as many as possible. The number of squeezes can be increased gradually.",
    pelvicFloorIncrease: "Increase the squeeze time little by little. For example, you can increase by 1-2 seconds each week, until you are up to 10-12 seconds. The squeezes should be controlled. If the grip \"slips\" it is better to reduce the squeeze time so that it becomes a strong and good squeeze.",
    
    electrostimulationTitle: "Electrostimulation/biofeedback",
    biofeedbackDesc: "If it is difficult to \"get hold of\" the pelvic floor musculature, biofeedback can be used. The method involves getting visual feedback about whether you are using the muscles correctly. This happens with the help of a probe in the rectum or surface electrodes that read muscle activity. The probe or electrodes are connected to a small monitor. The monitor provides information about how much you squeeze and how much you relax the musculature.",
    electrostimulationDesc: "Electrostimulation with weak electrical current can be used to train the musculature. The stimulation is done with the help of a probe in the rectum or in the vagina, which is connected to the device. The current strength is increased until you yourself manage to \"get hold of\" the musculature.",
    professionalGuidanceNote: "Training and follow-up of biofeedback and electrostimulation should take place under professional guidance. It is important to remember that training, both with and without biofeedback or electrostimulation, must be performed regularly to build up the musculature and to maintain it.",
    
    aidsTitle: "Aids",
    aidsDesc: "For many, there is great benefit and help in various incontinence products such as pads, skin care products, various anal plugs, balloon syringe and irrigation sets. Many of the products are included in the public reimbursement scheme, and can be obtained on prescription.",
    
    completeEmptyingTitle: "Complete emptying",
    completeEmptyingDesc: "By having the bowel completely emptied during bowel movement (defecation), the risk of experiencing seepage of bowel movements after toilet visits is reduced. In this context, sitting position with reduction of the anorectal angle is important for faster and more complete bowel emptying. This is best achieved by assuming a slightly forward-bent sitting position with straight back where the knees are higher than the hips (squatting, possibly with the use of a footstool), and a relaxed posture while breathing with the stomach. For more information about advice on sitting position, you can read on the page about emptying problems for bowel movements.",
    
    taiTitle: "Bowel emptying with transanal irrigation",
    taiDesc: "In some cases, there is a need for assisted emptying. Transanal irrigation (TAI) is a method that empties the bowel by having water introduced into the large intestine via a catheter (plastic tube) in the rectum. The water stimulates the bowel's peristaltic movements to get rid of bowel movements from the rectum and lower part of the large intestine. For many, this is an effective method and you get training from healthcare personnel in how to perform this. Regular irrigation can prevent leakage and gives control over when and where the bowel movement should occur.",
    taiBalloonDesc: "Based on symptoms and needs, it may be sufficient for some to just rinse the lower part of the rectum. In such cases, a balloon syringe can be used, which is a \"simpler\" variant of bowel rinsing.",
    taiPrincipleDesc: "The principle behind TAI is the same, but the equipment comes in different variants from different suppliers. Some are on reimbursement/prescription, you can see these here:",
    
    proceduresTitle: "Procedures",
    proceduresIntro: "For patients who do not achieve satisfactory results from conservative measures, surgical treatment may be relevant. The indication is fecal incontinence or air leakage combined with inability to delay bowel movement when urgent (urgency).",
    
    snmTitle: "Sacral nerve modulation (SNM)",
    snmDesc: "SNM is used within urology, gastrointestinal surgery and most recently also gynecology. The indication for SNM for fecal incontinence is persistent, weekly leakage of solid or liquid bowel movements, after undergoing conservative treatment. For combined pelvic floor dysfunctions such as leakage of both urine and bowel movements, the method should be considered early when conservative treatment is ineffective.",
    snmDesc2: "SNM is a surgical procedure performed in the operating room with local anesthesia and sedation, or under general anesthesia. Sacral nerve modulation involves a sacral nerve root being electrically stimulated with the help of an electrode and a pacemaker. The electrode is placed along the sacral nerve roots in the pelvis, either along sacral nerve S3 or S4. The electrode is connected to the pacemaker in a closed system under the skin. The system generates a mild electrical impulse that leads to complex modulation of motor, sensory and autonomic nerve pathways in both the central and peripheral nervous system. This contributes to normalization of urination and bowel function, and affects pelvic floor musculature.",
    snmDesc3: "The method can be performed either as a two-step procedure where the first step is insertion of electrode with a three-week test period. If the test gives satisfactory reduction in the number of leakage episodes and improves the problems, the pacemaker is implanted in the second step. The procedure can also be performed in one session where electrode and pacemaker are implanted directly. The choice of method depends on indication for treatment and clinical assessment by the surgeon. Today, an MR-compatible system is used. The pacemaker has a battery life of 8-15 years, depending on the type of pacemaker and power consumption. When the battery is used up, the old pacemaker is replaced with a new one.",
    snmDesc4: "SNM is a safe and minimally invasive method. The success rate of SNM is between 60-90% depending on indication. Roughly speaking, 1/3 become completely well, 1/3 become better, while 1/3 have no effect. SNM is associated with few complications. Under 4% of patients operated in Norway experience infection that leads to removal of the equipment. Most patients will need follow-up with adjustment of pacemaker settings.",
    snmDesc5: "Reoperation with replacement of electrode due to changed effect, or moving the pacemaker due to pain or discomfort occurs. Other complications are pain or discomfort around the electrode or radiating pain to external genitals, groin or thigh. This can often be improved by adjusting the stimulation. Between 10 and 20% of patients still have the equipment removed due to loss of effect or discomfort as mentioned above.",
    snmDesc6: "SNM for fecal incontinence is offered in all health regions in Norway. All operations with SNM for fecal incontinence are registered in the Norwegian Register for Fecal Incontinence (NRA) after consent.",
    
    sphincterRepairTitle: "Sphincter repair",
    sphincterRepairDesc: "The anal canal is the lowest part of the rectum and consists of internal and external sphincters. The internal sphincter is a continuation of the intestinal wall that is thickened into a ring muscle. This consists of smooth muscle that is controlled by the autonomic nervous system. The external sphincter is a ring of striated muscle that forms a funnel. When the rectal closure muscles are damaged, for example during childbirth, leakage of air and/or bowel movements can occur. In sphincter repair, any defect in the internal and/or external closure muscle is reconstructed. The purpose is to restore normal anatomy of the closure muscles that surround the anal canal.",
    sphincterRepairDesc2: "The greatest risk factor for damage to the anal sphincters is vaginal delivery. All sphincter injuries discovered after delivery should be reconstructed within 12 hours. In cases where the injury is discovered later or with continued defective sphincter musculature, secondary sphincter repair may be relevant.",
    sphincterRepairDesc3: "70-80% of patients report a good result one year after surgery. Complete continence is rarely achieved, but patients report an improvement in quality of life and are generally satisfied with the result. The effect of sphincter repair seems to decrease over time.",
    sphincterRepairDesc4: "Common complications are wound infection and the stitches coming apart, which is usually treated conservatively without the repair being destroyed. Larger wound infections can, however, lead to a need for reoperations.",
    sphincterRepairDesc5: "As a result of SNM now being established as the first choice for surgical treatment of fecal incontinence, relatively few procedures with sphincter repair are performed annually.",
    
    colostomyTitle: "Colostomy",
    colostomyDesc: "A colostomy is a surgically created opening where the large intestine is brought out on the abdomen and this is called a stoma. The intestine is brought out through the abdominal wall and sewn to the skin. The stoma is red and moist. There are no nerve endings in the stoma, and therefore no feeling in the stoma itself.",
    colostomyDesc2: "Colostomy can be used where none of the above measures have worked, including conservative treatment. Many patients find this a very good alternative where they achieve control and avoid involuntary leakage. Quality of life with a colostomy increases with regular bowel movements. An aid can be to irrigate the bowel (bowel rinsing).",
    
    appendicostomyTitle: "Appendicostomy for antegrade bowel irrigation",
    appendicostomyDesc: "Appendicostomy is the placement of the appendix as an opening on the abdomen (appendix stoma) This enables antegrade irrigation of the colon. Antegrade irrigation is rinsing of the large intestine from the right side of the intestine and in the \"transport direction\". This method is used in patients with incontinence, possibly combined with constipation or other emptying disorder. Most of the patients already have an established anal rinse program (irrigation). This is a small surgical procedure. Apart from the rinses, the opening can be covered with a small plaster.",
    appendicostomyDesc2: "The frequency of irrigation will vary somewhat from patient to patient, but 3-7 times a week is common to avoid fecal incontinence. A catheter is inserted through the opening. On average, about 1.5 liters of water is used for each rinse in adults.",
    appendicostomyDesc3: "The most common complication is fusion of the opening. This can be corrected with blocking or revision.",
    
    // Mestring (Coping) section
    mestringTitle: "Coping",
    mestringQuote: "\"I was on a cabin trip at Easter with friends. It's not entirely easy, but I plan well and am careful with diet and routines, so it goes well. It gets too boring to sit at home all the time.\"",
    mestringQuoteAuthor: "Man, 30 years old",
    livingWithTitle: "Living with fecal incontinence",
    livingWithDesc: "If the treatment is only partially successful or not successful, you may have to realize that this is something you have to live with. In that case, there are several things that can make the situation easier, and the goal must be to live as normally as possible.",
    whatHelpsTitle: "What can make the situation better?",
    helpMotivationTitle: "Help and motivation",
    helpMotivationDesc: "By taking the step to seek help and reaching healthcare personnel who work with fecal incontinence, we know that the situation becomes easier. Getting understanding and acceptance that this is a problem can in itself give a better everyday life.",
    eatDrinkLiveNormalTitle: "Eat, drink, live normally",
    eatDrinkLiveNormalDesc: "\"I stopped eating food to avoid getting so much bowel movement\" is a sentence we unfortunately hear from time to time. This strategy, however, does not make the life situation better. You lose weight, and lose muscle mass and energy.",
    opennessFamilyTitle: "Openness and support in the family",
    opennessFamilyDesc: "Hiding major problems from your closest ones can lead to you isolating yourself from them. The closest ones will often know that something is wrong, and it is better to say that you have a problem. Then you give those around you the chance to take this into account and help with the facilitation of everyday life. We as humans are dependent on having other people around us who can support us when we need it.",
    mapAdaptDailyLifeTitle: "Map and adapt everyday life",
    mapAdaptDailyLifeDesc: "By mapping when the problems are worst, it becomes easier to function in everyday life. When do the leakages come, is there something special that triggers them, and are there any aids that could improve the situation? Healthcare personnel will be able to guide and recommend measures.",
    sexualityTitle: "Fecal incontinence and sexuality",
    sexualityDesc: "The need for closeness and contact is strong and important, and fear of, for example, smell can make the person suffering from leakage put up a barrier between themselves and their closest ones. Just talking openly about the problem in a relationship can lower this barrier. It is not easy to be a partner and not understand what your closest one is going through. By having open communication, you can avoid conflicts, both spoken and unspoken, which creates room for closeness.",
    sexualityDesc2: "Closeness is something everyone needs, both patient and relatives."
  }
} as const

export const Treatment = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = TREATMENT_DATA[language]

  return (
    <>

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/treat.png" alt="Treatment" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
      </div>

      <div className={styles.sectionContent}>
        {/* Quote Section */}


        {/* Main Introduction */}
        <div className={styles.normalFunctionSection}>
        <div className={styles.quoteSection}>
          <blockquote className={styles.quoteText}>
            {data.introQuote}
          </blockquote>
          <cite className={styles.quoteAuthor}>{data.introQuoteAuthor}</cite>
        </div>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.mainIntro}</p>
            <p className={styles.enhancedParagraph}>{data.mainIntro2}</p>
          </div>
        </div>

        {/* Conservative Treatment Section */}
        <SectionAccordion 
          title={data.conservativeTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={true}
        >
          <div className={styles.normalFunctionSection}>
            <div className={styles.normalFunctionContent}>
              <p className={styles.enhancedParagraph}>{data.conservativeIntro}</p>
              <p className={styles.enhancedParagraph}>{data.conservativeApproach}</p>

            <SectionAccordion 
              title={data.guidanceComponents}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <ul className={styles.resourceList}>
                <li className={styles.resourceListItem}>{data.component1}</li>
                <li className={styles.resourceListItem}>{data.component2}</li>
                <li className={styles.resourceListItem}>{data.component3}</li>
                <li className={styles.resourceListItem}>{data.component4}</li>
                <li className={styles.resourceListItem}>{data.component5}</li>
                <li className={styles.resourceListItem}>{data.component6}</li>
                <li className={styles.resourceListItem}>{data.component7}</li>
              </ul>
            </SectionAccordion>

            <SectionAccordion 
              title={data.lifestyleTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.lifestyleDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.dietaryTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.dietaryDesc}</p>
              
              {/* Bristol Scale Section */}
              <div className={styles.bristolScaleSection}>
                <h5 className={styles.enhancedSubheading}>{data.bristolScaleTitle}</h5>
                <p className={styles.enhancedParagraph}>{data.bristolScaleDesc}</p>
                
                <div className={styles.anatomySection}>
                  <div className={styles.anatomyGrid}>
                    <div className={styles.anatomyItem}>
                      <img 
                        src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/bristol_skala.png" 
                        alt="Bristol Stool Scale" 
                        className={`${styles.anatomyImage} ${styles.bristolImage}`}
                      />
                      <p className={styles.anatomyCaption}>Bristol Stool Scale. Reprinted by National Competence Service for Incontinence and Pelvic Floor Disease with permission from Dr KW Heaton, Reader in Medicine at the University of Bristol. 2000 Norgine Pharmaceuticals Limited.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionAccordion>

            <SectionAccordion 
              title={data.medicationsTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.medicationsDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.pelvicFloorTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.pelvicFloorDesc}</p>

              <div className={styles.pelvicFloorExerciseSection}>
                <h5 className={styles.enhancedSubheading}>{data.pelvicFloorTryTitle}</h5>
                
                {/* Step 1 - Common instruction */}
                <div className={styles.exerciseStep}>
                  <div className={styles.stepNumber}>1</div>
                  <p className={styles.enhancedParagraph}>{data.pelvicFloorTry1}</p>
                </div>
                
                {/* Gender-specific instructions */}
                <div className={styles.genderInstructions}>
                  <div className={styles.genderCard}>
                    <div className={styles.genderIcon}>
                      <span className={styles.genderIconFemale}>♀</span>
                    </div>
                    <h6 className={styles.genderTitle}>{language === 'no' ? 'Kvinner:' : 'Women:'}</h6>
                    <p className={styles.genderText}>{data.pelvicFloorTry2}</p>
                  </div>
                  
                  <div className={styles.genderCard}>
                    <div className={styles.genderIcon}>
                      <span className={styles.genderIconMale}>♂</span>
                    </div>
                    <h6 className={styles.genderTitle}>{language === 'no' ? 'Menn:' : 'Men:'}</h6>
                    <p className={styles.genderText}>{data.pelvicFloorTry3}</p>
                  </div>
                </div>
                
                {/* Tips section */}
                <div className={styles.tipsBox}>
                  <h6 className={styles.tipsTitle}>{language === 'no' ? 'Tips:' : 'Tips:'}</h6>
                  <p className={styles.enhancedParagraph}>{data.pelvicFloorTips}</p>
                </div>
                
                {/* Exercise steps */}
                <div className={styles.exerciseSteps}>
                  <div className={styles.exerciseStep}>
                    <div className={styles.stepNumber}>2</div>
                    <p className={styles.enhancedParagraph}>{data.pelvicFloorRelax}</p>
                  </div>
                  
                  <div className={styles.exerciseStep}>
                    <div className={styles.stepNumber}>3</div>
                    <p className={styles.enhancedParagraph}>{data.pelvicFloorBegin}</p>
                  </div>
                  
                  <div className={styles.exerciseStep}>
                    <div className={styles.stepNumber}>4</div>
                    <p className={styles.enhancedParagraph}>{data.pelvicFloorRepeat}</p>
                  </div>
                  
                  <div className={styles.exerciseStep}>
                    <div className={styles.stepNumber}>5</div>
                    <p className={styles.enhancedParagraph}>{data.pelvicFloorIncrease}</p>
                  </div>
                </div>
              </div>
            </SectionAccordion>

            {/* Video Section */}
            <div className={styles.videoSection}>
              <h4 className={styles.enhancedSubheading}>
                {language === 'no' ? 'Her kan du se en instruksjonsfilm om hvordan man trener bekkenbunnen:' : 'Here you can see an instructional video on how to train the pelvic floor:'}
              </h4>
              <div className={styles.videoContainer}>
                <iframe
                  src="https://player.vimeo.com/video/65880144?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1#t="
                  title={language === 'no' ? 'Øvelser for å styrke bekkenbunnen' : 'Exercises to strengthen the pelvic floor'}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className={styles.videoIframe}
                ></iframe>
              </div>
            </div>

            <SectionAccordion 
              title={language === 'no' ? 'E-læringskurs om bekkenbunnstrening' : 'E-learning course on pelvic floor training'}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>
                <a href="https://kurs.helse-sorost.no/ScormServices/ScoStart.aspx?load=preview&scorm_version=1.2&starting_url=/elps40/Content/fa7d776e-65d9-4140-9c10-569f4f9bf317/index.html" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  {language === 'no' ? 'E-læringskurs om bekkenbunnstrening' : 'E-learning course on pelvic floor training'}
                </a>
                {language === 'no' ? ' Filminstruksjon utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst RHF.' : ' Video instruction developed by the Pelvic Center at Akershus University Hospital, Health South-East RHF.'}
              </p>
              
              <p className={styles.enhancedParagraph}>
                <a href="https://stolav.no/behandlinger/prostatakreft#opptrening-av-bekkenbunn-etter-prostataoperasjon" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  {language === 'no' ? 'Filminstruksjoner i opptrening av bekkenbunn for menn' : 'Video instructions for pelvic floor training for men'}
                </a>
                {language === 'no' ? ' E-læringskurs i 4 deler utviklet av St. Olavs Hospital, Helse Midt-Norge RHF.' : ' E-learning course in 4 parts developed by St. Olavs Hospital, Health Mid-Norway RHF.'}
              </p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.electrostimulationTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.biofeedbackDesc}</p>
              <p className={styles.enhancedParagraph}>{data.electrostimulationDesc}</p>
              <p className={styles.enhancedParagraph}>{data.professionalGuidanceNote}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.aidsTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.aidsDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.completeEmptyingTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.completeEmptyingDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.taiTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.taiDesc}</p>
              <p className={styles.enhancedParagraph}>{data.taiBalloonDesc}</p>
              <p className={styles.enhancedParagraph}>{data.taiPrincipleDesc}</p>
              
              <div className={styles.taiProductsGrid}>
                <div className={styles.taiProductItem}>
                  <h6 className={styles.taiProductTitle}>Navina Classic irrigasjonssystem</h6>
                  <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/Navina-Classic_bilde_wellspect.png" alt="Navina Classic irrigation system" className={styles.taiProductImage} />
                  <p className={styles.taiProductCaption}>
                    <a href="http://www.wellspect.no/produkter/tarmprodukter/navina-classic/instruksjoner-og-filmer" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                      {language === 'no' ? 'Instruksjon i Navina Classic irrigasjonssystem' : 'Instructions for Navina Classic irrigation system'}
                    </a>
                    (Wellspect)
                  </p>
                </div>
                <div className={styles.taiProductItem}>
                  <h6 className={styles.taiProductTitle}>Peristeen irrigasjonssystem</h6>
                  <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/Peristeen_bilde_coloplast.jpg" alt="Peristeen irrigation system" className={styles.taiProductImage} />
                  <p className={styles.taiProductCaption}>
                    <a href="https://www.coloplast.no/blare-og-tarm-/bruksanvisninger/veiledninger-for-tarmirrigasjon/" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                      {language === 'no' ? 'Instruksjon i Peristeen irrigasjonssystem' : 'Instructions for Peristeen irrigation system'}
                    </a>
                    (Coloplast)
                  </p>
                </div>
                <div className={styles.taiProductItem}>
                  <h6 className={styles.taiProductTitle}>Qufora Irrisedo Ballonsystem irrigasjonssystem</h6>
                  <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/KvinTo.jpg" alt="Qufora Irrisedo Balloon system irrigation system" className={styles.taiProductImage} />
                  <p className={styles.taiProductCaption}>
                    <a href="https://www.youtube.com/watch?v=kZmcg19m0So" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                      {language === 'no' ? 'Instruksjon i Qufora Irrisedo Ballonsystem irrigasjonssystem' : 'Instructions for Qufora Irrisedo Balloon system irrigation system'}
                    </a>
                    (KvinTo AS)
                  </p>
                </div>
                <div className={styles.taiProductItem}>
                  <h6 className={styles.taiProductTitle}>Aquaflush Irrigasjonssystemer</h6>
                  <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2024/09/Bilde-Aquaflush-Komplett-A-og-L-1-scaled-e1726039190981.jpg" alt="Aquaflush Irrigation systems" className={styles.taiProductImage} />
                  <p className={styles.taiProductCaption}>
                    <a href="https://www.globalhealthtechnology.no/aquaflush-analirrigasjon" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                      {language === 'no' ? 'Instruksjon i Aquaflush Irrigasjonssystemer' : 'Instructions for Aquaflush Irrigation systems'}
                    </a>
                    (Global Health Technology)
                  </p>
                </div>
              </div>
            </SectionAccordion>

            </div>
          </div>
        </SectionAccordion>

        {/* Procedures/Surgery Section */}
        <SectionAccordion 
          title={data.proceduresTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={true}
        >
          <div className={styles.normalFunctionSection}>
            <div className={styles.normalFunctionContent}>
              <p className={styles.enhancedParagraph}>{data.proceduresIntro}</p>

            <SectionAccordion 
              title={data.snmTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.snmDesc}</p>
              <p className={styles.enhancedParagraph}>{data.snmDesc2}</p>
              <p className={styles.enhancedParagraph}>{data.snmDesc3}</p>
              <p className={styles.enhancedParagraph}>{data.snmDesc4}</p>
              <p className={styles.enhancedParagraph}>{data.snmDesc5}</p>
              <p className={styles.enhancedParagraph}>{data.snmDesc6}</p>
              
              <div className={styles.anatomySection}>
                <div className={styles.anatomyGrid}>
                  <div className={styles.anatomyItem}>
                    <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2024/04/Sacral-nerve-stimulation.jpg" alt="Sacral nerve modulation illustration" className={styles.anatomyImage} />
                    <p className={styles.anatomyCaption}>{language === 'no' ? 'Illustrasjon: Sakral nervemodulering' : 'Illustration: Sacral nerve modulation'}</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.highlightBox}>
                <p className={styles.enhancedParagraph}>
                  <a href="https://www.unn.no/fag-og-forskning/medisinske-kvalitetsregistre/nra-norsk-register-for-analinkontinens" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                    {language === 'no' ? 'Norsk register for avføringslekkasje (NRA)' : 'Norwegian Register for Fecal Incontinence (NRA)'}
                  </a>
                </p>
              </div>
            </SectionAccordion>

            <SectionAccordion 
              title={data.sphincterRepairTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.sphincterRepairDesc}</p>
              <p className={styles.enhancedParagraph}>{data.sphincterRepairDesc2}</p>
              <p className={styles.enhancedParagraph}>{data.sphincterRepairDesc3}</p>
              <p className={styles.enhancedParagraph}>{data.sphincterRepairDesc4}</p>
              <p className={styles.enhancedParagraph}>{data.sphincterRepairDesc5}</p>
              
              <div className={styles.anatomySection}>
                <div className={styles.anatomyGrid}>
                  <div className={styles.anatomyItem}>
                    <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2024/04/Indre-og-ytre-sfinkter.jpg" alt="Internal and external sphincters" className={styles.anatomyImage} />
                    <p className={styles.anatomyCaption}>{language === 'no' ? 'Indre og ytre sfinkter' : 'Internal and external sphincters'}</p>
                  </div>
                </div>
              </div>
            </SectionAccordion>

            <SectionAccordion 
              title={data.colostomyTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.colostomyDesc}</p>
              <p className={styles.enhancedParagraph}>{data.colostomyDesc2}</p>
              
              <div className={styles.anatomySection}>
                <div className={styles.anatomyGrid}>
                  <div className={styles.anatomyItem}>
                    <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2024/04/stomi.png" alt="Colostomy stoma" className={styles.anatomyImage} />
                    <p className={styles.anatomyCaption}>{language === 'no' ? 'Kolostomi' : 'Colostomy'}</p>
                  </div>
                </div>
              </div>
            </SectionAccordion>

            <SectionAccordion 
              title={data.appendicostomyTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.appendicostomyDesc}</p>
              <p className={styles.enhancedParagraph}>{data.appendicostomyDesc2}</p>
              <p className={styles.enhancedParagraph}>{data.appendicostomyDesc3}</p>
            </SectionAccordion>

            </div>
          </div>
        </SectionAccordion>

        {/* Mestring (Coping) Section */}
        <SectionAccordion 
          title={data.mestringTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={true}
        >
          <div className={styles.normalFunctionSection}>
            <div className={styles.normalFunctionContent}>
              {/* Quote Section */}
              <div className={styles.quoteSection}>
                <blockquote className={styles.quoteText}>
                  {data.mestringQuote}
                </blockquote>
                <cite className={styles.quoteAuthor}>{data.mestringQuoteAuthor}</cite>
              </div>

            {/* Living with fecal incontinence */}
            <h4 className={styles.enhancedSubheading}>{data.livingWithTitle}</h4>
            <p className={styles.enhancedParagraph}>{data.livingWithDesc}</p>
            
            <div className={styles.anatomySection}>
              <div className={styles.anatomyGrid}>
                <div className={styles.anatomyItem}>
                  <img src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/mann-mestring-web-254x300.jpg" alt="Man coping with fecal incontinence" className={styles.anatomyImage} />
                </div>
              </div>
            </div>

            {/* What can make the situation better? */}
            <h4 className={styles.enhancedSubheading}>{data.whatHelpsTitle}</h4>
            
            <SectionAccordion 
              title={data.helpMotivationTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.helpMotivationDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.eatDrinkLiveNormalTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.eatDrinkLiveNormalDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.opennessFamilyTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.opennessFamilyDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.mapAdaptDailyLifeTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.mapAdaptDailyLifeDesc}</p>
            </SectionAccordion>

            <SectionAccordion 
              title={data.sexualityTitle}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <p className={styles.enhancedParagraph}>{data.sexualityDesc}</p>
              <p className={styles.enhancedParagraph}>{data.sexualityDesc2}</p>
            </SectionAccordion>

            </div>
          </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}