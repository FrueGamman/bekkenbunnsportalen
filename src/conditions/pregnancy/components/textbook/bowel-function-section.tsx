"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"

const bowelFunctionData = {
  no: {
    title: "Tarmfunksjon",
    intro: [
      "En normal tarmtømming er et samspill mellom ikke-viljestyrte og viljestyrte prosesser. Dette samspillet er komplekst og deler av selve mekanismen er ikke fullstendig kartlagt. I forbindelse med måltid igangsettes en massebevegelse i tykktarmen, avføring passerer fra tykktarmen og ned i endetarmen. Denne mekanismen sender nervesignaler til analkanalens lukkemuskler, primært til den ytre lukkemuskelen og bekkenbunnen som trekker seg sammen inntil en har kommet frem til toalettet. Deretter skjer en avslapning av både ytre- og indre lukkemuskel og tømmingen kan skje.",
      "Når tarminnhold passerer fra tykktarmen over til endetarmen, vil nerver i endetarmen signalisere til kroppen at det er på tide å tømme tarmen og føre til avføringstrang. I den nederste delen av endetarmen ligger lukkemuskelen som består av to ringmuskler, en indre og en ytre. For passasje av avføring må begge musklene slappe av, både den indre lukkemuskelen som styres av reflekser og den ytre lukkemuskelen som kan kontrolleres av viljen.",
      "Avføringsfrekvens varierer fra person til person. Det er ikke et mål i seg selv å etterstrebe et spesifikt mønster såfremt at mønsteret i seg selv ikke er et problem. Selv om det ofte refereres til at avføring en gang per dag er det normale, vet man at dette ikke er gjeldende for alle. Under svangerskapet påvirkes tarmen av hormoner som gjør at tarmpassasjen kan ta lengre tid og føre til sjeldnere avføring.",
      "Vanligvis tømmes tarmen naturlig som en del av kroppens forberedelse til fødsel. Mange bekymrer seg imidlertid for at det skal komme avføring når de skal føde. Dette er derimot ikke uvanlig og for jordmor/fødselshjelper er det ikke noe problem om det kommer avføring under fødsel. Når åpningsriene går over til pressrier er barnets hode kommet lengre ned og trykker mot endetarmen. Dette kan gi en intens avføringstrang."
    ],
    
    toiletPosture: {
      title: "Dovaner og sittestilling",
      intro: "For å kunne tømme tarmen komplett uten overdrevet pressing, er det gunstig med gode dovaner og god sittestilling på toalettet.",
      tips: [
        "Bygg opp under beina med feks. en fotkrakk slik at knærne kommer over hoftehøyde.",
        "Slapp av i skuldre, len deg litt forover og støtt albuene på knærne.",
        "Slapp av, pust godt og slipp ut magen.",
        "Unngå overdreven trykking, men fokuser på å \"åpne opp\" for avføring.",
        "Bruk litt tid på å konsentrere deg om å la avføringen komme i gang av seg selv.",
        "Spill på lag med den naturlige tarmrefleksen som settes i gang ca 20 minutter etter et måltid."
      ],
      stepImages: [
        { src: "/trinn1_0-1.png", alt: "Trinn 1: Knærne høyere enn hoften", caption: "Trinn 1: Knærne høyere enn hoften" },
        { src: "/trinn2-1.png", alt: "Trinn 2: Len fremover og hvil albuene på knærne", caption: "Trinn 2: Len fremover og hvil albuene på knærne" },
        { src: "/trinn3-1.png", alt: "Trinn 3: Spenn magen ut og rett ryggen", caption: "Trinn 3: Spenn magen ut og rett ryggen" },
        { src: "/korrekt-toiledPosistion.png", alt: "Korrekt sittestilling på toalettet", caption: "Korrekt sittestilling på toalettet" }
      ],
      image: {
        src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/doposisjon-1.jpg",
        alt: "Riktig sittestilling på toalettet",
        caption: "Reprodusert med tillatelse fra Ray Addison (UK), kontinenssykepleier og Wendy Ness (UK), kolorektal specialsykepleier. Norgine 2007."
      },
      additionalInfo: [
        "Det viser seg at mange har feil sittestilling på toalettet, og presser for å få tømt seg. Det er derfor viktig å lære seg riktig sittestilling, og hvordan bekkenet fungerer under press. Ved anbefalt sittestilling holdes ryggen rett, og knærne er høyere enn hoften. Oppbygging (krakk) under beina bidrar til det. For at avføringen skal passere er det viktig at lukkemuskelen i endetarmen og muskulaturen i bekkenbunnen slapper av. Det er viktig å unngå og knipe/spenne muskulaturen. Det kan være en fordel å trene på å knipe og slippe for å kjenne når muskelaturen slapper godt av. Fokus på å slappe av og \"puste med magen\" er viktig da tarmen tømmer seg lettere.",
        "Å gå på toalettet til samme tidspunkt \"lærer\" tarmen å tømme seg regelmessig."
      ]
    },
    
    sections: [
      {
        id: "constipation",
        title: "Forstoppelse",
        content: [
          "Forstoppelse er vanlig under svangerskap og etter fødsel (både vaginal fødsel og keisersnitt). Årsaker til dette kan være hormonelle endringer, jerntilskudd og mindre aktivitet. Forstoppelse er treg, hard, uregelmessig, ufullstendig eller sjelden avføring. Med sjelden avføring regnes færre enn tre ganger i uken. Normalt er det store individuelle variasjoner i avføringsmønster. Det avgjørende er grad av plager, ubehag og ledsagende symptomer som oppblåsthet,  magesmerter og diaré.",
          "Dersom plager og ubehag finnes det flere tiltak som etablering av gode dovaner, konsistensregulering og assistert tømming. Dersom problemene vedvarer bør man oppsøke egen lege for videre utredning. "
        ],

      },
      {
        title: "Avføringslekkasje",
        content: [
          "Avføringslekkasje er ett vidt begrep og omfatter ufrivillig lekkasje av både luft, fast og flytende avføring. I tillegg lider mange av urgency eller hastverk, som er definert som manglende evne til å utsette avføring i 15 minutter.",
          "Når tarminnhold passerer fra tykktarmen over til endetarmen, vil nerver i endetarmen signalisere til kroppen at det er på tide å tømme tarmen og føre til avføringstrang. I den nederste delen av endetarmen ligger lukkemuskelen som består av to ringmuskler, en indre og en ytre.  For passasje av avføring må begge musklene slappe av, både den indre lukkemuskelen som styres av reflekser og ikke kan kontrolleres med viljen, og den ytre lukkemuskelen som kan kontrolleres av viljen.",
          "Den største enkeltfaktoren for avføringslekkasje er skade på lukkemuskelen som oppstår under vaginal fødsel. Selv om skaden oppdages og repareres med en gang, vil 30-50% få vedvarende lekkasjesymptomer i større eller mindre grad. Problemer med å kontrollere luftavgang er ikke uvanlig de første 3 måneder etter fødsel. Ved luftlekkasje de første ukene etter fødsel vil som regel bekkenbunnstrening være god behandling. Det er derimot ikke normalt å ha lekkasje av avføring etter fødsel."
        ],
        subsections: [
          {
            subtitle: "Symptomer",
            items: [
              "Ufrivillig lekkasje via endetarmen av luft, flytende eller fast avføring",
              "Soiling (striper/spor i undertøyet)",
              "Lekkasje ved samleie",
              "Episoder med brå og sterk trang til avføring (hastverkslekkasje/urgency)",
              "Manglende evne til å kjenne når du skal ha avføring",
              "edsatt lyst til å være aktiv og sosial på grunn av lekkasjer eller frykt for dette"
            ],
            content:'Det er ikke normalt å lekke avføring etter fødsel, men mange opplever endret avføringsmønster og problemer med å kontrollere luftavgang. Om det er slik at noen opplever problemer etter fødsel som påvirker livskvaliteten og daglig aktivitetsnivå, anbefales det å søke hjelp tidlig. Ofte er det enkle råd og tips som kan bedre funksjon, men det kan også være skader som er oversett ved forløsning som bør behandles.'
          },
          {
            subtitle: "Behandling",
            content: [
              "Til å begynne med bør all konservativ behandling, altså tiltak som ikke innbefatter kirurgi, forsøkes. Hovedprisippene er bekkenbunnstrening, regulering av konsistens på avføringen og assistert tømming.",
              "Dersom konservative tiltak ikke fører frem, anbefales henvisning til gastrokirurg eller gynekolog som vurderer kirurgiske tiltak. Den vanligste behandlingen for alvorlig avføringslekkasje er sakral nerve modulering (SNM). Ved denne metoden innsettes en elektrode gjennom hull i korsbenet og plasseres tett inntil en av sakralnervene som kobles til en strømkilde (pacemaker). Strøm fra pacemakeren gis mot nervene og på denne måten påvirkes/moduleres avføringsfunksjonen. Behandlingen er effektiv og blir mye anvendt.",
              " For kvinner som har gjennomgått grad 3 eller grad 4 fødselsrift, repareres skaden ved et operativt inngrep med rekonstruksjon av lukkemuskelen. Dette skal alltid gjøres ved store fødselsskader. Det kan også i enkelte tilfeller gjøres i ettertid så fremt funksjonen ikke har blitt optimal eller at skaden har blitt oversett, en såkalt sekundær sfinkterplastikk.",
              "Mer informasjon om ulike operasjonsmetoder finnes under eget emne om inngrep for avføringslekkasje."
            ],
            items: [
              {
                text: "Bekkenbunnstrening kan styrke muskulaturen og bedre kontrollen."
              },
              {
                text: "Regulering av avføringskonsistens for å oppnå en fast, men myk konsistens kan redusere lekkasje betydelig."
              },
              {
                text: "Ernæring og kosthold kan påvirke tarmfunksjonen. Unngå matvarer som gir løs avføring eller gass."
              },
              {
                text: "Toalettvaner - gå på do når trangen melder seg, ikke utsett dette."
              },
              {
                text: "Ved mer alvorlige tilfeller kan kirurgisk behandling være aktuelt. Dette vurderes av spesialist."
              }
            ]
          }
        ]
      },
      {
        title: "Analfissur",
        content: [
          "Analfissur er en sprekk/sår i slimhinnen i endetarmsåpningen. Vanligvis er det lokalisert baktil, men kan også sees fortil. Analfissur kommer vanligvis etter en episode med hard avføring eller diare.",
          "Vanligvis gror analfissuren av seg selv, men om plagene vedvarer utover seks uker kalles den kronisk. Man bør da oppsøke hjelp for vurdering og behandling."
        ],
        subsections: [
          {
            subtitle: "Symptomer",
            content:"De vanligste symptomene er kraftige smerter, samt beskjeden frisk blødning på toalettpapiret. En kronisk analfissur gir typisk smerter etter dobesøk på grunn av kramper i lukkemuskelen. Smertene kan vare fra 20 min og inntil flere timer etter avføring. Krampene gir redusert blodsirkulasjon og derfor dårligere groforhold for fissuren. Ofte sees en liten hudflik i den enden av såret som er lengst fra endetarmen. Denne hudfliken må ikke forveksles med en inntørket hemoroide (mariske). Marisker gjør aldri vondt."
          },
          {
            subtitle: "Behandling",
            content: [
              "En akutt analfissur gror vanligvis av seg selv. Om fissuren blir ett tilbakevendende problem, finnes det flere tiltak for selvhjelp. Rundt halvparten blir bra med konservativ behandling slik at kirurgi ikke nødvendig. Hensikten med all behandling er å lindre smertene og få såret til å gro, samt forebygge nye tilfeller med analfissur. "
            ],
            
          },
          {
            subtitle: "Konsistens",
            content:"Først og fremt må avføringen konsistensreguleres. Loppefrøskall/ispaghulafrøskall (Vi-Siblin, Lunelax) er anbefalte reseptfrie legemidler. Disse er førstevalg ved både hard og løs avføring om ikke kostholdstiltak fører frem. Hvis manglende effekt av Vi-Siblin for hard avføring, anbefales Movicol som virker osmotisk og inneholder elektrolytter som forhindrer forstyrrelser i saltbalansen. Movicol tas ikke opp i tarmen og kan brukes av gravide og under amming. Målet er å beholde normal konsistens tilsvarende Bristol stool scale 3-4, ihvertfall 3-4 uker etter tilheling. Les mer om konsistensregulering av avføring. "
          },
          {
            subtitle: "Toalettvaner og hygiene",
            content: "Det er viktig å ta vare på huden rundt endetarmsåpninga og ha gode toalettvaner. Når trangen til avføring melder seg, bør en tilstrebe å gå på do umiddelbart, uten unødvendig utsettelser. Dobesøket bør også gjøres så kort som mulig. Etter avføring kan hånddusj eller bidé gjerne benyttes. Overdrevet vasking og bruk av såpe vil tørke ut huden og kan forverre plagene. Det finnes barrierekremer som beskytter huden. Dersom mye irritasjon, kløe og rødhet, kan fastlege foreskrive steroidkremer for å dempe disse plagene."
          },

          {
            subtitle: "Smertelindring",
            content: "Paracet og Ibux kan forsøkes ved sterke smerter. Sterkere medisiner som opioider bør unngås da disse påvirker konsistensen på avføringen og dermed gi motsatt effekt. Ved intense smerter kan lokalbedøvende gele som Xylocain påsmøres for lindring. Salven har ingen helbredende effekt og kan ved langvarig/daglig bruk forverre plagene på grunn av negativ innvirkning på blodsirkulasjonen."
          },
          {
            subtitle: "Salve som opphever analspasme",
            content: "Om analfissuren er kronisk med varighet over 6 uker, forsøkes først behandling med en nitrogenholdig salve (Glycerolnitrat, Rectogesic) eller kalsiumantagonist (Anoheal) som motvirker krampene ved å redusere trykket i den indre lukkemuskelen. Når trykket letter, bedres blodsirkulasjonen. Smertene avtar og groforholdene optimaliseres. Salven påsmøres 2-3 ganger daglig i 4-6 uker. Noen opplever sjenerende hodepine som bivirkning. Disse salvene er reseptbelagte og behandlingen kan startes i allmennpraksis, men anbefales ikke til gravide og ammende."
          },
          {
            subtitle: "Injeksjon i lukkemuskelen",
            content: "Hvis plagene fra en kronisk fissur vedvarer over tre måneder eller kommer hyppig tilbake, anbefales henvisning til spesialisthelsetjenesten. På kirurgisk poliklinikk eller dagkirurgisk avdeling kan en forsøke injeksjon med Botulintoxin A i den indre lukkemuskelen for å minske trykket, bedre blodsirkulasjon og dermed optimalisere tilhelingen. Prosedyren tar bare noen minutter, men kan oppleves smertefull. Om narkose ønskes bør dette komme med i henvisningen fra fastlege. Effekten varer i tre måneder og omtrent halvparten blir bra. Dersom fissuren fortsatt ikke har grodd, kan prosedyren gjentas en gang."
          },
          {
            subtitle: "Kirurgisk behandling",
            content: "Dersom konservativ behandling ikke fører frem kan ved hjelp av kirurgi lette trykket i lukkemuskelen. Denne operasjonen kalles tailored lateral intern sphinkterotomi. Dette er en liten operasjon hvor en liten del av den indre lukkemuskelen spaltes. Cirka 95 % blir bra etter en slik operasjon. Noen få kan oppleve forbigående lekkasje for luft."
          }
        ]
      },
      {
        title: "Hemoroider",
        content: [
          "Hemoroider er utposning av blodårer i endetarmen og er en vanlig plage å få under graviditeten og etter fødsel. Hormonell forandring fører til endring i blodårene slik at veneklaffene som skal returnere blod tilbake til hjertet, jobber dårligere. Etter hvert som barnet vokser vil det økte trykket i bekkenet redusere blodets tilbaketrømming til hjertet. Økt trykk kan også oppstå i forbindelse med selve fødselen samt ved forstoppelse og hard avføring. Dette kan føre til opphopning av blod og gi oppsvulmede blodårer. På samme måte som det lett dannes åreknuter i bena og generelt i underlivet, kan det oppstå åreknuter i og rundt endetarmen. Slike åreknuter eller utposninger, kalles hemoroider.",
          "Det finnes to typer hemoroider, indre og ytre. Indre, også kalt ekte hemoroider, kommer fra øvre del av endetarmen. Disse er ofte ikke synlig utvendig, men kan komme ut ved press for eksempel ved hard avføring. De ytre hemoroidene er derimot på utsiden av endetarmsåpningen. Disse hemoroidene er en eller flere myke, blårøde utposninger i varierende størrelse. Noen ganger kan blodet inni koagulere slik at de blir harde og betente, dette kalles tromboserte hemoroider.",
          "Hemoroider regnes som en kronisk og tilbakevendende plage, mens trombosert hemoroide er en mer akutt tilstand."
        ],
        subsections: [
          {
            subtitle: "Symptomer",
            intro: "Hemoroider gir varierende plager. Noen kan ha hemoroider uten å merke det, mens andre har større plager. Blod i avføringen er et symptom som alltid skal tas alvorlig da det kan være et tegn på annen alvorlig tilstand. Ved usikkerhet om hva blødningen skyldes, bør lege kontaktes.",
            content: "Dette er vanlige symptomer:",
            items: [
              "Irritasjon og kløe i endetarmen",
              "Synlig blod på toalettpapiret eller i avføringen",
              "Smerter i endetarmen, spesielt under avføring",
              "Følelse av ufullstendig tømming og vanskelig å tørke seg rein",
              "Tyngdefornemmelse og synlig utposning i endetarmsåpningen",
              "Ofte i forbindelse med forstoppelse og hard avføring"
            ]
          },
          {
            subtitle: "Inndeling av hemoroider",
            intro: "De indre hemoroidene deles inn i fire ulike grader.",
            grades: [
              { grade: "Grad 1", description: "Ikke synlig på utsiden, men påvises ved undersøkelse hos lege" },
              { grade: "Grad 2", description: "Synlig bare når du presser, glir tilbake av seg selv" },
              { grade: "Grad 3", description: "Er synlig på utsiden hele tiden, men kan skyves inn" },
              { grade: "Grad 4", description: "Er synlig på utsiden hele tiden, kan ikke skyves inn" }
            ]
          },
          {
            subtitle: "Behandling",
            intro: "Behandlingen avhenger av grad og symptomer. Dersom hemoroidene er plagsomme bør de behandles. Behandlingen kan bestå av enkle tiltak du kan gjøre selv, mens andre tiltak krever behandling på sykehus.",
            content: "Tiltak:",
            items: [
              "Sørge for myk avføring gjennom regulering av avføringskonsistens",
              "God tarmbevegelse ved fysisk aktivitet/mosjon",
              "Unngå å presse når du er på toalettet da økt press vil føre til hemoroider",
              "Lokalbehandling med kortisonholdig salve (Scheriprokt) vil få blodårene til og trekke seg sammen, dempe betennelse og lindre ubehag (gjelder indre hemoroider, grad 1-2)",
              "Strikkligering for å stanse blodforsyningen til hemoroiden ved at et gummistrikk plasseres rundt hemoroiden slik at den etter hvert faller av. Dette gjøres poliklinisk. (Gjelder indre hemoroider, grad 3-4)",
              "Transanal hemoroidal deartealisering (THD). Prosedyren går ut på at blodkarene som forsyner hemoroidene, identifiseres ved hjelp av ultralyd og deretter sys igjen med ett sting. Dette gjøres på operasjonsstue. (Gjelder indre hemoroider, grad 3-4)",
              "Ytre/tromboserte hemoroider kan med fordel behandles som øyeblikkelig hjelp i løpet av få dager på kirurgisk poliklinikk. I lokalbedøvelse åpnes blodansamlingen og dette vil gi en umiddelbar smertelindring. Uten akutt behandling vil smertene og kulen forsvinne i løpet av 4-6 uker."
            ]
          }
        ]
      },
      {
        title: "Regulering av avføringskonsistens",
        intro: "Optimal avføringskonsistens er ofte første steget i behandlingen både når det gjelder lekkasje og tømmingsproblemer for avføring. Noen tiltak for optimalisering kan man gjøre selv, men dersom man ikke når ønsket effekt er det hjelp å få.",
        subsections: [
          {
            subtitle: "Ulike typer avføringskonsistens",
            content: [
              "Bristol skala, også kalt Bristol stool scale/chart, er et diagnostisk verktøy som klassifiserer avføringskonsistensen i syv ulike kategorier. Kategoriene en til syv graderes fra fast avføring (1) til flytende avføring (7).",
              "Ved problemer både med lekkasje og tømming ønsker man å tilnærme seg kategori fire som regnes som normal avføring. Denne avføringstype er mest optimal for å oppnå kontinens samt komplett tømming.",
              "Hyppighet av avføring varierer fra person til person. Det er ikke et mål i seg selv å etterstrebe et spesifikt mønster såfremt at mønsteret i seg selv ikke er et problem. Selv om det ofte refereres til at avføring en gang per dag er det normale, vet man at dette ikke er gjeldende for alle."
            ],
            image: {
              src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/bristol_skala.png",
              alt: "Bristol avføringsskala",
              caption: "Bristol Stool Scale. Reprodusert av Nasjonalt senter for bekkenbunnshelse med tillatelse fra Dr KW Heaton, Reader in Medicine at the University of Bristol. 2000 Norgine Pharmaceuticals Limited."
            }
          },
          {
            subtitle: "Kostråd",
            intro: "Alle kostråd er generelle. Det finnes få studier med evidens for hvilke konkrete matvarer som påvirker avføringskonsistensen. Det er derfor viktig å ta utgangspunkt i egne erfaringer og kostråd for så å prøve seg frem for å finne de matsortene som fungerer og de som fører til forverring.",
            sections: [
              {
                title: "Kost som kan føre til eller forverre løs avføring",
                content: [
                  "Sterkt krydret mat, fet mat, mat og drikke som inneholder koffein (kaffe, cola og energidrikker), alkohol og kunstig søtstoff (sorbitol og xylitol).",
                  "Uoppløselig fiber vil trekke med seg væske i tarmkanalen slik at avføringen blir løsere, får et større volum og gi et hyppigere behov for tarmtømming. Eksempler uoppløselig fiber er; hele korn, alle typer kål, mais, nøtter, kjerner og frø samt tørket frukt."
                ]
              },
              {
                title: "Kost som kan virke stoppende på løs avføring",
                content: "Inntak av oppløselig fiber er gunstig. Oppløselig fiber trekker til seg vann og gir en mer geleaktig og samlet avføring. Eksempler på matvarer som inneholder oppløselige fiber er havre, bygg, banan, eple, potet, gulrot og søtpotet."
              },
              {
                title: "Kostråd ved forstoppelse",
                content: [
                  "Kostendringer i forhold til kronisk forstoppelse (obstipasjon) er sjeldent effektivt, men kan ha effekt ved forbigående episoder med forstoppelse.",
                  "Økt inntak av fiber er effektivt, parallelt med økt væskeinntak. Matvarer som svisker, kli, probiotika og kiwi kan mykgjøre konsistensen."
                ]
              }
            ]
          },
          {
            subtitle: "Kostfibertilskudd",
            content: "Ved løs eller flytende avføring er regulering av avføringskonsistens med bruk av loppefrøskall/ispaghulafrøskall (Vi-Siblin, Lunelax) effektivt og bør forsøkes dersom kostråd ikke fører frem. Dette er kostfiber som røres ut i vann og inntas i henhold til bruksanvisning. Anbefalt optimal dose er 7,1 gram loppefrøskall/ Ispaghulafrøskall per dag, men dosen bør tilpasses anbefalingene på gjeldende produkt. Ved forstoppelse er det viktig at man inntar tilstrekkelig væske, ca 1,5-2 liter per døgn. Behandling med loppefrøskall/ispaghulafrøskall gir lite bivirkninger. Man kan kjøpe disse produktene uten resept på apoteket."
          },
          {
            subtitle: "Medikamentell behandling",
            intro: "Det finnes ulike medikamenter som har effekt på både løs og hard avføring. Noen av disse er reseptfrie, mens andre må foreskrives av lege. Det er viktig at man følger anvisning på pakningsvedleggene. Ved langvarige tilstander bør man få utredet årsaken til plagene.",
            sections: [
              {
                title: "Medikamenter ved løs avføring/diaré",
                items: [
                  "Loperamid (Immodium) 2 mg 16 kapsler (reseptfri)",
                  "Loperamid (Immodium) 2 mg i større pakninger (reseptbelagt)"
                ],
                warning: {
                  title: "Graviditet og amming:",
                  content: "Det er begrenset erfaring ved bruk av Loperamid under graviditet. Rådfør deg derfor med lege før bruk dersom du er gravid. Bruk ikke Loperamid hvis du ammer. Små mengder av legemidlet kan gå over i morsmelken."
                }
              },
              {
                title: "Medikamenter ved forstoppelse",
                content: [
                  "Osmotiske legemidler trekker vann inn i tarmen og mykgjør avføringen:",
                  "• Makragol (Movicol) finnes i pulver (reseptbelagt)",
                  "• Laktulose/ Duphalac mikstur (reseptfri)",
                  "",
                  "Peristaltikkfremmende legemidler øker tarmens naturlige bevegelse:",
                  "• Bisacodyl preparat (for eksempel Dulcolax) (reseptbelagt)",
                  "• Natriumpicosulfat (for eksempel Laxoberal) (reseptbelagt)",
                  "",
                  "Alle legemidlene nevnt over kan brukes under graviditet og amming."
                ]
              }
            ]
          },
          {
            subtitle: "Fysisk aktivitet",
            content: [
              "Det er mange positive helseeffekter av fysisk aktivitet og mosjon. Dette gjelder også på tarmfunksjonen. Fysisk aktivitet fremmer tarmens bevegelse (peristaltikk) og bidrar positivt, spesielt ved hard avføring. Helsedirektoratet anbefaler minimum 30 minutters daglig fysisk aktivitet med moderat intensitet."
            ],
            link: {
              text: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser",
              url: "https://www.helsedirektoratet.no/retningslinjer/anorektale-funksjonsforstyrrelser"
            }
          }
        ]
      }
    ]
  },
  en: {
    title: "Bowel Function",
    intro: [
      "A normal bowel movement is an interaction between involuntary and voluntary processes. This interaction is complex and parts of the mechanism itself are not fully mapped. In connection with meals, a mass movement is initiated in the colon, stool passes from the colon down to the rectum. This mechanism sends nerve signals to the anal canal's sphincter muscles, primarily to the external sphincter and pelvic floor which contract until one reaches the toilet. Then relaxation of both external and internal sphincter occurs and emptying can take place.",
      "When intestinal contents pass from the colon to the rectum, nerves in the rectum will signal to the body that it is time to empty the bowel and lead to the urge to defecate. In the lower part of the rectum lies the sphincter muscle which consists of two ring muscles, one internal and one external. For passage of stool, both muscles must relax, both the internal sphincter muscle which is controlled by reflexes and the external sphincter muscle which can be controlled by will.",
      "Bowel movement frequency varies from person to person. It is not a goal in itself to strive for a specific pattern as long as the pattern itself is not a problem. Although it is often referred to that bowel movements once a day is normal, it is known that this does not apply to everyone. During pregnancy, the intestine is affected by hormones that make intestinal passage take longer and lead to less frequent bowel movements.",
      "Usually the bowel empties naturally as part of the body's preparation for childbirth. However, many worry that there will be stool when they are about to give birth. This is not uncommon and for the midwife/birth assistant it is not a problem if stool comes during childbirth. When opening contractions transition to pushing contractions, the baby's head has come further down and presses against the rectum. This can give an intense urge to defecate."
    ],
    
    toiletPosture: {
      title: "Toilet Habits and Sitting Position",
      intro: "To be able to empty the bowel completely without excessive pressing, it is beneficial to have good toilet habits and good sitting position on the toilet.",
      tips: [
        "Build up under the feet with e.g. a footstool so that the knees come above hip height.",
        "Relax your shoulders, lean slightly forward and rest your elbows on your knees.",
        "Relax, breathe well and let your belly out.",
        "Avoid excessive pressing, but focus on \"opening up\" for stool.",
        "Take some time to concentrate on letting the stool start on its own.",
        "Work with the natural bowel reflex that starts about 20 minutes after a meal."
      ],
      stepImages: [
        { src: "/trinn1_0-1.png", alt: "Step 1: Knees higher than hips", caption: "Step 1: Knees higher than hips" },
        { src: "/trinn2-1.png", alt: "Step 2: Lean forward and rest elbows on knees", caption: "Step 2: Lean forward and rest elbows on knees" },
        { src: "/trinn3-1.png", alt: "Step 3: Push out abdomen and straighten back", caption: "Step 3: Push out abdomen and straighten back" },
        { src: "/korrekt-toiledPosistion.png", alt: "Correct toilet posture", caption: "Correct toilet posture" }
      ],
      image: {
        src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/doposisjon-1.jpg",
        alt: "Correct sitting position on the toilet",
        caption: "Reproduced with permission from Ray Addison (UK), continence nurse and Wendy Ness (UK), colorectal specialist nurse. Norgine 2007."
      },
      additionalInfo: [
        "It turns out that many have the wrong sitting position on the toilet and press to empty themselves. It is therefore important to learn the correct sitting position and how the pelvis functions under pressure. With the recommended sitting position, the back is kept straight and the knees are higher than the hips. Building up (stool) under the feet contributes to this. For the stool to pass, it is important that the sphincter muscle in the rectum and the muscles in the pelvic floor relax. It is important to avoid squeezing/tensing the muscles. It can be an advantage to practice squeezing and releasing to feel when the muscles relax well. Focus on relaxing and \"breathing with the belly\" is important as the bowel empties more easily.",
        "Going to the toilet at the same time \"teaches\" the bowel to empty regularly."
      ]
    },
    
    sections: [
      {
        id: "constipation",
        title: "Constipation",
        content: [
          "Constipation is a common complaint during pregnancy. Up to half of pregnant women may experience constipation. The cause is largely hormonal. The pregnancy hormone progesterone causes the intestine's natural movements (peristalsis) to slow down so that intestinal contents can remain in the intestine longer and the stool becomes firmer. In addition, the iron content in most pregnancy vitamins gives a harder consistency to the stool. For some, the problems worsen when towards the end of pregnancy there is little room for the intestine because the uterus takes up so much space.",
          "During childbirth, it is also not uncommon for there to be longer intervals between bowel movements. With the use of epidural anesthesia, the intestines can be affected so that they work more poorly. From experience, we also know that after childbirth, fear of having a bowel movement can arise. Fear of pain from a possible wound or birth tear can make one reluctant to go to the toilet. By postponing the bowel movement, it will become harder and thus one can enter a vicious circle.",
          "Increased pressure in connection with hard stool during pregnancy and after childbirth is unfavorable for the pelvic floor muscles. The pelvic floor is stretched and stressed. It is important to get good help with bowel movements during pregnancy and after childbirth.",
          "When problems with constipation arise during pregnancy or after childbirth, it is beneficial to start treatment in the form of, among other things, regulation of stool consistency."
        ],
        subsections: [
          {
            subtitle: "Symptoms",
            items: [
              "Slow bowel",
              "Stool that is hard or lumpy",
              "Bowel movements with large volume and/or less frequent than once per 3 days",
              "Feeling of incomplete emptying",
              "Need to press a lot during bowel movements"
            ]
          },
          {
            subtitle: "Advice and Treatment",
            intro: "For constipation, you can try the following measures:",
            items: [
              {
                text: "Fiber/bran in the diet can have a positive effect in mild cases of constipation. Bran is preferably taken with a breakfast mixture or yogurt and must be taken with sufficient amounts of fluid. Fiber/bran is a dietary supplement that can be purchased over-the-counter in grocery stores or pharmacies. It is important that the user drinks sufficient fluids (2-3 liters/day). If you drink too little, the bran can make constipation worse and lead to bloating and nausea. Bran is safe to use during pregnancy and breastfeeding. NB! If medications are used, these should not be taken at the same time as bran as the absorption of the medication may be affected."
              },
              {
                text: "Regulation of stool consistency. For more pronounced constipation, regulation of stool consistency with the help of macrogol may be necessary."
              },
              {
                text: "Physical activity and drinking sufficiently are also important for good bowel function."
              },
              {
                text: "Assisted bowel emptying. For some, assisted bowel emptying is necessary to get the bowel started. Then bulb syringe, mini-, oil- or saline enemas can be tried. These can be purchased over-the-counter at pharmacies."
              },
              {
                text: "For more severe constipation or lack of effect from the above advice, contact your GP or midwife for further advice, help and guidance."
              }
            ]
          }
        ]
      },
      {
        title: "Fecal Leakage",
        content: [
          "Fecal leakage after childbirth is not common, but it does occur. If we include the invisible leakage of gas in the figures, about 20 percent will experience it in the first year after childbirth. About half will have a permanent problem with leakage. It is important to detect and treat the problem as early as possible to reduce the risk of it becoming permanent. For those affected by fecal leakage, it is often uncomfortable to talk about. However, it is important that you contact healthcare personnel for guidance and follow-up.",
          "Fecal leakage after childbirth can be due to damage to the sphincter muscle (anal sphincter) in the rectum during a birth tear. Risk factors for birth tears are high birth weight and use of forceps. Fecal leakage can also occur in connection with other conditions that affect the intestine and pelvic floor."
        ],
        subsections: [
          {
            subtitle: "Symptoms",
            items: [
              "Involuntary leakage of gas",
              "Involuntary leakage of liquid stool",
              "Involuntary leakage of solid stool",
              "Urgency problems with bowel movements",
              "Incomplete bladder emptying"
            ]
          },
          {
            subtitle: "Advice",
            content: [
              "There are several measures to improve the problems. It is important to start with measures as quickly as possible, as fecal leakage in many cases can be significantly improved with the right treatment.",
              "Contact healthcare personnel. In case of fecal leakage after childbirth, it is important to see a doctor for examination and evaluation. GP, gynecologist or gastrointestinal surgeon are relevant instances."
            ],
            items: [
              {
                text: "Pelvic floor training can strengthen the muscles and improve control."
              },
              {
                text: "Regulation of stool consistency to achieve a firm but soft consistency can significantly reduce leakage."
              },
              {
                text: "Nutrition and diet can affect bowel function. Avoid foods that cause loose stools or gas."
              },
              {
                text: "Toilet habits - go to the toilet when the urge arises, do not postpone this."
              },
              {
                text: "In more severe cases, surgical treatment may be relevant. This is assessed by a specialist."
              }
            ]
          }
        ]
      },
      {
        title: "Anal Fissure",
        content: [
          "Anal fissure is a longitudinal wound in the skin in the anal canal. The wound usually occurs due to pressure and stretching on the canal when passing hard stool. Constipation is therefore a common cause. The pain is due to spasm in the internal sphincter muscle (anal sphincter) in the rectum. The spasms are a natural reaction of the body to protect itself against further damage. The spasms reduce blood flow to the wound and thus healing is inhibited. An anal fissure can be an acute or chronic condition and is most commonly seen in women who have recently given birth. The problems are often temporary and not serious, but they can be very painful.",
          "An anal fissure is defined as chronic if it has persisted for more than 6 weeks. This occurs in about one-third of those who get an anal fissure. With chronic anal fissure, small skin tags are often seen on the inside and/or outside of the anal opening."
        ],
        subsections: [
          {
            subtitle: "Symptoms",
            items: [
              "Burning and/or stabbing pain during and especially after bowel movements. The pain can last for several hours.",
              "Bright red blood on toilet paper",
              "Itching",
              "Small skin tags that can be seen or felt"
            ]
          },
          {
            subtitle: "Acute Fissure – Advice and Treatment",
            content: [
              "Most anal fissures heal on their own within 2-4 weeks. The key to healing is to optimize stool consistency so that the stool becomes soft, as well as good anal hygiene. This can be achieved by the following measures:"
            ],
            items: [
              {
                text: "Regulation of stool consistency to achieve soft stool. For hard stool, Movicol is recommended which works osmotically and contains electrolytes that prevent disturbances in salt balance. Movicol is not absorbed in the intestine and can be used by pregnant and breastfeeding women. The goal is to maintain normal consistency corresponding to Bristol stool scale 3-4, at least 3-4 weeks after healing."
              }
            ]
          },
          {
            subtitle: "Toilet Habits and Hygiene",
            content: "It is important to take care of the skin around the anal opening and have good toilet habits. When the urge to have a bowel movement arises, one should strive to go to the toilet immediately, without unnecessary delays. The toilet visit should also be made as short as possible. After bowel movements, a hand shower or bidet can be used. Excessive washing and use of soap will dry out the skin and can worsen the problems. There are barrier creams that protect the skin. If there is a lot of irritation, itching and redness, a GP can prescribe steroid creams to alleviate these problems."
          },
          {
            subtitle: "Pain Relief",
            content: "Paracetamol and Ibuprofen can be tried for severe pain. Stronger medications such as opioids should be avoided as these affect the consistency of the stool and thus have the opposite effect. For intense pain, local anesthetic gel such as Xylocaine can be applied for relief. The ointment has no healing effect and with prolonged/daily use can worsen the problems due to negative impact on blood circulation."
          },
          {
            subtitle: "Ointment That Relieves Anal Spasm",
            content: "If the anal fissure is chronic with a duration of over 6 weeks, treatment with a nitrogen-containing ointment (Glycerol nitrate, Rectogesic) or calcium antagonist (Anoheal) is first attempted, which counteracts the spasms by reducing the pressure in the internal sphincter muscle. When the pressure eases, blood circulation improves. Pain decreases and healing conditions are optimized. The ointment is applied 2-3 times daily for 4-6 weeks. Some experience bothersome headaches as a side effect. These ointments are prescription-only and treatment can be started in general practice, but is not recommended for pregnant and breastfeeding women."
          },
          {
            subtitle: "Injection in the Sphincter Muscle",
            content: "If the problems from a chronic fissure persist over three months or recur frequently, referral to specialist health services is recommended. At a surgical outpatient clinic or day surgery department, injection with Botulinum toxin A in the internal sphincter muscle can be attempted to reduce pressure, improve blood circulation and thus optimize healing. The procedure takes only a few minutes but can be experienced as painful. If anesthesia is desired, this should be included in the referral from the GP. The effect lasts for three months and about half get better. If the fissure still has not healed, the procedure can be repeated once."
          },
          {
            subtitle: "Surgical Treatment",
            content: "If conservative treatment does not work, surgery can help ease the pressure in the sphincter muscle. This operation is called tailored lateral internal sphincterotomy. This is a small operation where a small part of the internal sphincter muscle is split. About 95% get better after such an operation. A few may experience temporary gas leakage."
          }
        ]
      },
      {
        title: "Hemorrhoids",
        content: [
          "Hemorrhoids are bulging of blood vessels in the rectum and are a common complaint during pregnancy and after childbirth. Hormonal changes lead to changes in the blood vessels so that the venous valves that should return blood back to the heart work more poorly. As the baby grows, the increased pressure in the pelvis will reduce the blood's return flow to the heart. Increased pressure can also occur in connection with childbirth itself as well as with constipation and hard stool. This can lead to accumulation of blood and cause swollen blood vessels. In the same way that varicose veins easily form in the legs and generally in the pelvic area, varicose veins can occur in and around the rectum. Such varicose veins or bulges are called hemorrhoids.",
          "There are two types of hemorrhoids, internal and external. Internal, also called true hemorrhoids, come from the upper part of the rectum. These are often not visible externally but can come out with pressure, for example with hard stool. External hemorrhoids, however, are on the outside of the anal opening. These hemorrhoids are one or more soft, bluish-red bulges in varying sizes. Sometimes the blood inside can coagulate so that they become hard and inflamed, this is called thrombosed hemorrhoids.",
          "Hemorrhoids are considered a chronic and recurrent complaint, while thrombosed hemorrhoids are a more acute condition."
        ],
        subsections: [
          {
            subtitle: "Symptoms",
            intro: "Hemorrhoids cause varying complaints. Some may have hemorrhoids without noticing it, while others have greater problems. Blood in the stool is a symptom that should always be taken seriously as it may be a sign of another serious condition. If uncertain about what the bleeding is due to, a doctor should be contacted.",
            content: "These are common symptoms:",
            items: [
              "Irritation and itching in the rectum",
              "Visible blood on toilet paper or in stool",
              "Pain in the rectum, especially during bowel movements",
              "Feeling of incomplete emptying and difficult to wipe clean",
              "Feeling of heaviness and visible bulge in the anal opening",
              "Often in connection with constipation and hard stool"
            ]
          },
          {
            subtitle: "Classification of Hemorrhoids",
            intro: "Internal hemorrhoids are divided into four different grades.",
            grades: [
              { grade: "Grade 1", description: "Not visible on the outside, but detected by examination at the doctor" },
              { grade: "Grade 2", description: "Visible only when you press, slides back by itself" },
              { grade: "Grade 3", description: "Visible on the outside all the time, but can be pushed in" },
              { grade: "Grade 4", description: "Visible on the outside all the time, cannot be pushed in" }
            ]
          },
          {
            subtitle: "Treatment",
            intro: "Treatment depends on grade and symptoms. If hemorrhoids are troublesome, they should be treated. Treatment can consist of simple measures you can do yourself, while other measures require treatment at the hospital.",
            content: "Measures:",
            items: [
              "Ensure soft stool through regulation of stool consistency",
              "Good bowel movement through physical activity/exercise",
              "Avoid pressing when you are on the toilet as increased pressure will lead to hemorrhoids",
              "Local treatment with cortisone ointment (Scheriprokt) will cause blood vessels to contract, reduce inflammation and relieve discomfort (applies to internal hemorrhoids, grade 1-2)",
              "Rubber band ligation to stop blood supply to the hemorrhoid by placing a rubber band around the hemorrhoid so that it eventually falls off. This is done on an outpatient basis. (Applies to internal hemorrhoids, grade 3-4)",
              "Transanal hemorrhoidal dearterialization (THD). The procedure involves identifying the blood vessels that supply the hemorrhoids using ultrasound and then suturing them closed with one stitch. This is done in the operating room. (Applies to internal hemorrhoids, grade 3-4)",
              "External/thrombosed hemorrhoids can advantageously be treated as emergency help within a few days at a surgical outpatient clinic. Under local anesthesia, the blood accumulation is opened and this will provide immediate pain relief. Without acute treatment, the pain and lump will disappear within 4-6 weeks."
            ]
          }
        ]
      },
      {
        id: "consistency-regulation",
        title: "Regulation of Stool Consistency",
        intro: "Optimal stool consistency is often the first step in treatment for both leakage and bowel emptying problems. Some optimization measures can be done yourself, but if you do not achieve the desired effect, help is available.",
        subsections: [
          {
            subtitle: "Different Types of Stool Consistency",
            content: [
              "The Bristol scale, also called Bristol stool scale/chart, is a diagnostic tool that classifies stool consistency into seven different categories. Categories one to seven are graded from solid stool (1) to liquid stool (7).",
              "For problems with both leakage and emptying, you want to approach category four, which is considered normal stool. This stool type is most optimal for achieving continence and complete emptying.",
              "Frequency of bowel movements varies from person to person. It is not a goal in itself to strive for a specific pattern as long as the pattern itself is not a problem. Although it is often referred to that bowel movements once a day is normal, it is known that this does not apply to everyone."
            ],
            image: {
              src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/bristol_skala.png",
              alt: "Bristol Stool Scale",
              caption: "Bristol Stool Scale. Reproduced by the National Center for Pelvic Floor Health with permission from Dr KW Heaton, Reader in Medicine at the University of Bristol. 2000 Norgine Pharmaceuticals Limited."
            }
          },
          {
            subtitle: "Dietary Advice",
            intro: "All dietary advice is general. There are few studies with evidence for which specific foods affect stool consistency. It is therefore important to start from your own experiences and dietary advice and then experiment to find the food types that work and those that lead to worsening.",
            sections: [
              {
                title: "Food that can cause or worsen loose stools",
                content: [
                  "Strongly spiced food, fatty food, food and drinks containing caffeine (coffee, cola and energy drinks), alcohol and artificial sweeteners (sorbitol and xylitol).",
                  "Insoluble fiber will draw fluid into the intestinal tract so that the stool becomes looser, gets a larger volume and gives a more frequent need for bowel movements. Examples of insoluble fiber are; whole grains, all types of cabbage, corn, nuts, seeds and dried fruit."
                ]
              },
              {
                title: "Food that can help stop loose stools",
                content: "Intake of soluble fiber is beneficial. Soluble fiber draws water to itself and gives a more gel-like and cohesive stool. Examples of foods containing soluble fiber are oats, barley, banana, apple, potato, carrot and sweet potato."
              },
              {
                title: "Dietary advice for constipation",
                content: [
                  "Dietary changes for chronic constipation (obstipation) are rarely effective but can have an effect for temporary episodes of constipation.",
                  "Increased intake of fiber is effective, along with increased fluid intake. Foods such as prunes, bran, probiotics and kiwi can soften consistency."
                ]
              }
            ]
          },
          {
            subtitle: "Dietary Fiber Supplements",
            content: "For loose or liquid stools, regulation of stool consistency using psyllium husk/ispaghula husk (Vi-Siblin, Lunelax) is effective and should be tried if dietary advice does not work. This is dietary fiber that is mixed in water and taken according to instructions. Recommended optimal dose is 7.1 grams psyllium husk/ispaghula husk per day, but the dose should be adapted to the recommendations on the current product. For constipation, it is important to consume sufficient fluids, about 1.5-2 liters per day. Treatment with psyllium husk/ispaghula husk has few side effects. You can buy these products over-the-counter at pharmacies."
          },
          {
            subtitle: "Medication Treatment",
            intro: "There are various medications that have an effect on both loose and hard stools. Some of these are over-the-counter, while others must be prescribed by a doctor. It is important to follow the instructions on the package inserts. For long-term conditions, the cause of the problems should be investigated.",
            sections: [
              {
                title: "Medications for loose stools/diarrhea",
                items: [
                  "Loperamide (Immodium) 2 mg 16 capsules (over-the-counter)",
                  "Loperamide (Immodium) 2 mg in larger packages (prescription)"
                ],
                warning: {
                  title: "Pregnancy and breastfeeding:",
                  content: "There is limited experience with the use of Loperamide during pregnancy. Consult a doctor before use if you are pregnant. Do not use Loperamide if you are breastfeeding. Small amounts of the medicine can pass into breast milk."
                }
              },
              {
                title: "Medications for constipation",
                content: [
                  "Osmotic agents draw water into the intestine and soften the stool:",
                  "• Macrogol (Movicol) available in powder (prescription)",
                  "• Lactulose/ Duphalac mixture (over-the-counter)",
                  "",
                  "Peristalsis-promoting agents increase the intestine's natural movement:",
                  "• Bisacodyl preparation (for example Dulcolax) (prescription)",
                  "• Sodium picosulfate (for example Laxoberal) (prescription)",
                  "",
                  "All medications mentioned above can be used during pregnancy and breastfeeding."
                ]
              }
            ]
          },
          {
            subtitle: "Physical Activity",
            content: [
              "There are many positive health effects of physical activity and exercise. This also applies to bowel function. Physical activity promotes the intestine's movement (peristalsis) and contributes positively, especially for hard stools. The Norwegian Directorate of Health recommends a minimum of 30 minutes of daily physical activity with moderate intensity."
            ],
            link: {
              text: "Professional guidelines for assessment and conservative treatment of anorectal functional disorders",
              url: "https://www.helsedirektoratet.no/retningslinjer/anorektale-funksjonsforstyrrelser"
            }
          }
        ]
      }
    ]
  }
} as const

export const BowelFunctionSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = bowelFunctionData[language]

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
          </div>
        </div>

        {/* Toilet Posture Section */}
        <SectionAccordion
          title={data.toiletPosture.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph} style={{ marginBottom: '16px' }}>
              {data.toiletPosture.intro}
            </p>

            <ul className={styles.resourceList} style={{ marginBottom: '24px' }}>
              {data.toiletPosture.tips.map((tip: string, index: number) => (
                <li key={`tip-${index}-${tip.substring(0, 15)}`} className={styles.resourceListItem}>
                  {tip}
                </li>
              ))}
            </ul>

            {/* All toilet posture images in one container */}
            <figure style={{
              margin: '24px auto',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {/* Step images */}
                {data.toiletPosture.stepImages && data.toiletPosture.stepImages.map((stepImg: any, index: number) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <img
                      src={stepImg.src}
                      alt={stepImg.alt}
                      style={{
                        width: '100%',
                        maxWidth: '180px',
                        height: 'auto',
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Single caption for all images */}
              <figcaption className={styles.responsiveFigcaption} style={{
                fontStyle: 'italic',
                color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
              }}>
                {data.toiletPosture.image.caption}
              </figcaption>
            </figure>

            {data.toiletPosture.additionalInfo.map((paragraph: string, index: number) => (
              <p key={index} className={styles.enhancedParagraph} style={{ marginTop: index === 0 ? '24px' : '16px' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </SectionAccordion>

        {/* Main sections */}
        {data.sections.map((section: any, sectionIndex: number) => (
          <SectionAccordion
            key={sectionIndex}
            id={section.id ? `bowel-function-${section.id}` : undefined}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {/* Section content */}
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

              {/* Image for Bristol Scale */}
              {section.image && (
                <figure style={{
                  margin: '24px auto',
                  maxWidth: '400px',
                  textAlign: 'center'
                }}>
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    style={{
                      width: '100%',
                      maxWidth: '350px',
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <figcaption className={styles.responsiveFigcaption} style={{
                    fontStyle: 'italic',
                    color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                  }}>
                    {section.image.caption}
                  </figcaption>
                </figure>
              )}

              {/* Section intro */}
              {section.intro && (
                <p className={styles.enhancedParagraph} style={{ marginBottom: '20px' }}>
                  {section.intro}
                </p>
              )}

              {/* Subsections */}
              {section.subsections?.map((subsection: any, subIndex: number) => (
                <div key={`subsection-${subIndex}-${subsection.subtitle || subIndex}`} style={{ marginTop: '24px' }}>
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
                    Array.isArray(subsection.content) ? (
                      subsection.content.map((paragraph: string, pIndex: number) => (
                        <p key={pIndex} className={styles.enhancedParagraph}>
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className={styles.enhancedParagraph} style={{ marginBottom: '12px' }}>
                        {subsection.content}
                      </p>
                    )
                  )}

                  {/* Image within subsection */}
                  {subsection.image && (
                    <figure style={{
                      margin: '24px auto',
                      maxWidth: '400px',
                      textAlign: 'center'
                    }}>
                      <img
                        src={subsection.image.src}
                        alt={subsection.image.alt}
                        style={{
                          width: '100%',
                          maxWidth: '350px',
                          height: 'auto',
                          borderRadius: '6px',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <figcaption className={styles.responsiveFigcaption} style={{
                        fontStyle: 'italic',
                        color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
                      }}>
                        {subsection.image.caption}
                      </figcaption>
                    </figure>
                  )}

                  {/* Nested sections within subsection */}
                  {subsection.sections && subsection.sections.map((nestedSection: any, nsIndex: number) => (
                    <div key={nsIndex} style={{ marginTop: '20px', marginLeft: '12px' }}>
                      <h6 style={{
                        fontWeight: '600',
                        margin: '12px 0 10px',
                        color: resolvedTheme === 'dark' ? '#8ab4d6' : '#156ba8'
                      }}>
                        {nestedSection.title}
                      </h6>
                      {Array.isArray(nestedSection.content) ? (
                        nestedSection.content.map((paragraph: string, pIndex: number) => (
                          <p key={pIndex} className={styles.enhancedParagraph}>
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p className={styles.enhancedParagraph}>
                          {nestedSection.content}
                        </p>
                      )}
                      {nestedSection.items && (
                        <ul className={styles.resourceList}>
                          {nestedSection.items.map((item: string, iIndex: number) => (
                            <li key={iIndex} className={styles.resourceListItem}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* Warning box */}
                      {nestedSection.warning && (
                        <div style={{
                          marginTop: '16px',
                          padding: '12px',
                          background: resolvedTheme === 'dark' ? 'rgba(255,193,7,0.1)' : 'rgba(255,193,7,0.15)',
                          borderLeft: `4px solid ${resolvedTheme === 'dark' ? '#ffc107' : '#ff9800'}`,
                          borderRadius: '4px'
                        }}>
                          <strong style={{ color: resolvedTheme === 'dark' ? '#ffc107' : '#ff6f00' }}>
                            {nestedSection.warning.title}
                          </strong>
                          <p className={styles.enhancedParagraph} style={{ marginTop: '8px', marginBottom: '0' }}>
                            {nestedSection.warning.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Grades for hemorrhoids */}
                  {subsection.grades && (
                    <div style={{ margin: '16px 0' }}>
                      {subsection.grades.map((grade: any, gIndex: number) => (
                        <div key={gIndex} style={{
                          marginBottom: '12px',
                          padding: '10px',
                          background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(5, 56, 112, 0.05)',
                          borderRadius: '6px',
                          borderLeft: `3px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                        }}>
                          <strong style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
                            {grade.grade}:
                          </strong>
                          <span style={{ marginLeft: '8px' }}>{grade.description}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* List items */}
                  {subsection.items && (
                    <ul className={styles.resourceList}>
                      {subsection.items.map((item: any, iIndex: number) => (
                        <li key={iIndex} className={styles.resourceListItem}>
                          {typeof item === 'string' ? item : item.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Link at the end of subsection */}
                  {subsection.link && (
                    <p className={styles.enhancedParagraph} style={{ marginTop: '16px' }}>
                      <a
                        href={subsection.link.url}
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
                        {subsection.link.text}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </SectionAccordion>
        ))}
    </>
  )
}
