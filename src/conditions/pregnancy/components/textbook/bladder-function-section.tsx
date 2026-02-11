"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import { Droplets } from 'lucide-react'
import styles from "../section-content.module.css"

const bladderFunctionData = {
  no: {
    title: "Blærefunksjon",

    sections: [
      {
        id: "normal",
        title: "Normal blærefunksjon",
        content: [
          "Urinmengden for en voksen kvinne ligger på en til to liter per døgn, naturligvis avhengig av væskeinntak. Det er derfor normalt å late vannet med tre til fire timers mellomrom i den våkne delen av døgnet. Normalt produserer vi mindre urin i løpet av natten fordi vi skiller ut hormonet ADH (anti diuretisk hormon). Det gjør at man kan sove natten igjennom. Lavere produksjon av dette hormonet ved økende alder, kan være en årsak til at man våkner i løpet av natten med vannlatingstrang. Normal urinmengde på morgenen er 300-600ml. En god vane er å tømme blæren når man står opp, deretter med jevne mellomrom og like før leggetid.",
          "Urinblæren ligger nede i bekkenet. Når blæren fylles med urin forblir trykket i blæren lavt ved at blæremuskulaturen slapper av, fylles og utvides. Lukkemuskelen rundt urinrøret forhindrer at urinen lekker ut. Etterhvert som urinblæren fylles, sendes det signaler som vi oppfatter som vannlatingstrang. Når vi da ønsker å late vannet, utvides øverste del av urinrøret seg og blæremuskelen trekker seg sammen slik at urinen kommer ut."
        ]
      },
      {
        id: "pregnancy",
        title: "Blærefunksjon under graviditet",
        content: [
          "Forandringer i nyrer og urinveier inntrer hos den gravide allerede de første ukene under graviditeten. Svangerskapshormonet progesteron gjør at all glatt muskulatur avspenner mer og blir slappere. Nyrebekkenet og urinlederne utvider seg. I enkelte tilfeller oppstår trykk mot urinlederen slik at passasjen av urin påvirkes. De fleste kjenner ikke noe til endringene, mens noen kan kjenne smerter over ryggen/nyreregionen. Smertene kan forveksles med nyresteinsmerter. Dette trenger sjeldent behandling og går over av seg selv. Dersom drenasjen påvirkes i stor grad behandles dette med å legge en stent (kateter) til nyrebekkenet for avlastning.",
          "Blodvolumet øker gradvis under graviditeten med cirka 40-50 prosent. Blodgjennomstrømmingen i nyrene øker med 30-50 prosent og den gravide vil kunne merke forandringer i form av hyppig vannlating på grunn av økt urinproduksjon. I tillegg får blæra mindre plass ved at livmoren vokser. Kvinnen opplever å ville tisse oftere og på mye mindre volum enn tidligere. Dette bedrer seg noe etter cirka 12 uker når livmoren stiger høyere opp. Noen opplever nesten vannlatingen som normal igjen. Mot slutten av graviditeten vil det igjen bli et press på urinblæren ved at barnets hode synker ned i bekkenet.",
          "Noen gravide opplever å hovne litt opp i kroppen i løpet av dagen. Som følge av økt blodmengde, økt trykk i blodårene og økt trykk fra den voksende livmoren, presses væske fra blodårene ut i vevet. Om natten når man ligger vil denne væsken lettere trekkes inn i blodbanen som igjen gir økt gjennomstrømming i nyrene og dermed økt urinproduksjon. Mange opplever derfor hyppigere vannlating om natten."
        ]
      },
      {
        id: "advice",
        title: "Råd for bedre blæretømming",
        content: [
          "En god sittestilling for en kvinne er å sitte på toalettet med god støtte for lårene og lett fremoverbøyd for på denne måten å kunne slappe av i bekkenbunnen. Gjerne bruke en bred og lav fotkrakk for støtte under føttene. Urinblæra skal av egen kraft tømme seg, uten hjelp av press fra magen/bukpress. Ved endt vannlating skal blæra være helt tom.",
          "Selve blæremuskelen blir også slappere som følge av hormonpåvirkningen. Noen opplever at det går tregere å late vannet og at det er vanskelig å tømme blæra ordentlig. Ufullstendig blæretømming kan føre til det man kaller for \"resturin\", noe som kan disponere for urinveisinfeksjon. Du bør derfor ta deg god tid på toalettet og ikke presse mye på blæren. La blæremuskulaturen få jobbe og tømme seg i fred. Det kan hjelpe å forsøke å starte tisse en gang til etter endt vannlating, såkalt «dobbel-tissing». Ofte vil en da greie å tømme blæren ytterligere."
        ]
      },
      {
        id: "birth",
        title: "Blærefunksjon under og etter fødsel",
        subsections: [
          {
            subtitle: "Under fødsel",
            content: "Under fødselen blir blæren utsatt for et mekanisk trykk og den normale følelsen av vannlatingstrang kan bli endret. Bruk av epidural smertelindring eller spinal bedøvelse kan også påvirke blæren. Dette kan gi nedsatt følelse for blærens fylning og nedsatt evne til å tømme blæren normalt. Under fødselen passer derfor fødselshjelper/jordmor godt på at blæren tømmes regelmessig. Hvis den fødende ikke får til å late vannet tilstrekkelig, kan blæren kateteriseres og urinen tømmes ut via et tynt kateter/plastslange. Det er viktig og sørge for god blæretømming både for å ivareta senere blærefunksjon, men også for å unngå at blæren står i veien for barnet."
          },
          {
            subtitle: "Etter fødsel",
            content: [
              "Blærefunksjon og vannlatingen er ofte påvirket de første dagene etter fødsel. Du kan merke økt urinproduksjon fordi kroppen skiller ut økt væskemengde i kroppen. Det kan oppleves vanskelig å late vannet på grunn av hevelse i vevet omkring urinrørsåpningen etter fødselen. Noen kjenner ikke at blæren er full. Nedsatt følelse og tømmingsvansker gjelder særlig etter epiduralbedøvelse. Tømmingsvansker kan også oppstå i tilfeller hvor det har vært nødvendig og forløse barnet med vakum/tang.",
              "Det er viktig å unngå at blæren blir for full og jordmor følger derfor med på vannlatingsfunksjonen også i fasen etter fødselen. Det bør helst ikke overstige 500 ml i blæren for å unngå det som kalles «overstrekk» av blæren. Slik overstrekk kan gi mer langvarige plager med blæretømming. Ufullstendig tømming av blæra kan føre til urinveisinfeksjoner. Du blir derfor oppfordret til å late vannet og det kontrolleres hvorvidt vannlatingen er tilstrekkelig. Tilstanden følges vanligvis opp med måling av spontan vannlating og undersøkelse av resturin med hjelp av blæreskanner. Dersom du ikke får til og late vannet kan det bli behov for å tømme blæren med kateter. Dette gjøres enten ved hjelp av engangskateter eller det legges inn permanent kateter. Ofte er behovet for kateterisering kortvarig og vannlatingen kommer i gang av seg selv. Dersom plagene vedvarer kan du selv læres opp i å sette engangskateter. Slik behandling har ofte god effekt og fører til normalisering av vannlatingen."
            ]
          }
        ]
      },
      {
        id: "leakage",
        title: "Urinlekkasje",
        content: [
          "Graviditet og fødsel fører til en rekke endringer som kan påvirke kontrollen over blærefunksjonen. Urinlekkasje er vanlig hos kvinner under graviditet og etter fødsel og det oppgis en forekomst på nesten 50 prosent. Ett år etter fødsel er foremkomsten av urinlekkasje redusert til ca 20 prosent. For de fleste er plagene små og forbigående, men for noen kan dette bli et vedvarende og større problem.",
          "Bekkenbunnen spiller en viktig rolle for muligheten til å være kontinent (ikke lekke) for urin. Under graviditeten påvirkes bekkenet av hormoner som myker opp strukturene i bekkenbunnen. Den hormonelle påvirkningen av progesteron fører til at lukkemuskelen rundt urinrøret blir svakere og gir dermed dårligere lukking. Endringer består også av økt vekt og press på bekkenbunn samt endret posisjon av blære og urinrør. Risiko for urinlekkasje øker jo lengre ut i svangerskapet man er.",
          "Til tross for at strukturene i bekkenet mykes opp under svangerskapet, kan det under fødsel oppstå overstrekninger, svekkelse, brist eller skade i muskulatur, ligamenter. Nervene som forsyner underlivet kan også bli påvirket av trykk under vaginal fødsel. Slik påvirkning er som oftest forbigående og det kan ta helt opp til ett år før nervene er tilhelet. I noen tilfeller kan skaden på nervene være permanent.",
          "Hormonell påvirkning under amming vil gi skjøre og tørre slimhinner både i skjeden og urinrøret. Dette kan også gi svakere lukking rundt urinrøret og dermed urinlekkasje."
        ],
        subsections: [
          {
            subtitle: "Stressinkontinens",
            content: "Dette er den vanligste formen for urinlekkasje under graviditet og etter fødsel. Denne lekkasjen skjer i forbindelse med aktivitet, hoste, latter og nys hvor buktrykket øker. Lekkasjen kan være fra noen dråper til små mengder og opphører når aktiviteten stopper. Tilstanden skyldes utilstrekkelig lukkefunksjon rundt urinrøret og kalles stressinkontinens. Lukkefunksjonen kan være svekket som følge av svekket lukkemuskel rundt urinrøret og/eller svekket støttevev i bekkenbunnen."
          },
          {
            subtitle: "Urgeinkontinens/overaktiv blære",
            content: "Urinlekkasje i forbindelse med overaktiv blære kalles urgeinkontinens. Det er forbundet med hyppig, plutselig og sterk vannlatingstrang og blir også kalt hastverkslekkasje. Blærekapasiteten er redusert og en greier ikke å holde på så mye urin av gangen. Det er vanskelig å utsette trangen og lekkasjen gir ofte større mengder urin da urinblæren trekker seg sammen og kan føre til full blæretømming. Det kan også være hyppig og sterk trang uten at det oppstår lekkasje, såkalt urgency. Problemet kan oppleves som meget plagsomt selv om det ikke medfører lekkasje. Slik hastverkstrang kan for noen føre til at man isolerer seg i varierende grad på grunn av at man må ha toalettet nært tilgjengelig. Mange med en slik tilstand opplever også at de må stå opp på natten for å late vannet da blærekapasiteten er nedsatt. Når tilstanden begynner og gå ut over hverdagslivet opplever mange dette som et problem."
          },
          {
            subtitle: "Blandingsinkontinens",
            content: "En kombinasjon av både stress – og urgeinkontinens, kalles blandingsinkontinens."
          },
          {
            subtitle: "Råd",
            content: [
              "Generelle råd er å unngå drikke sent på kvelden noe som kan føre til mindre urinproduksjon på natten dersom hyppig, nattlig vannlating er et problem. For noen kan det være gunstig å redusere væskeinntaket på dagtid også dersom man generelt drikker alt for mye (da gjerne over tre liter). Selve vannlatingsfunksjonen bør også vies oppmerksomhet. Det betyr at man bør sørge for at blæren tømmes så godt som mulig. Du kan lese mer om tips for god sittestilling for vannlating. Dersom man likevel ikke greier å tømme blæren helt på egenhånd, kan det hjelpe å få opplæring i å tømme den med et engangskateter.",
              "Mange av de naturlige endringene som følge av graviditeten og den hormonelle påvirkningen, kan bidra til å gi urinlekkasje. For å styrke kontrollen over blærefunksjonen og redusere risiko for eller symptomer på, urinlekkasje, både under og etter graviditeten, bør man gjøre bekkenbunnsøvelser og trene bekkenbunnsmuskulaturen. Bekkenbunnsmuskulaturen oppleves for mange som svekket rett etter fødsel og det er ikke uvanlig å lekke urin ved feks hoste eller aktivitet, som nevnt stressinkontinens. I denne perioden er det viktig å komme i gang med aktiv bekkenbunnstrening da slik trening ofte har god effekt og mange blir kvitt urinlekkasjen.",
              "Ved urgeinkontinens vil det å kunne gjøre sterke, gode bekkenbunnsknip kunne bidra til å dempe blæretømningsrefleksen. På den måten dempes også den sterke hastverkstrangen slik at man unngår urinlekkasje, før man rekker toalettet. Det å regelmessig trene bekkenbunnen slik at man får kontroll over muskulaturen, og kan bruke den aktivt for å dempe den sterke trangen, er derfor viktig.",
              "Symptomer som beskrevet ved urgeinkontinens kan også skyldes bakterier i urinen og urinveisinfeksjon. Det bør derfor alltid tas urinprøve til dyrkning for å avdekke en eventuell infeksjon slik at den kan behandles etter resistensmønster.",
              "Forstoppelse i tarmen og treg avføring kan i noen tilfeller virke inn på blærefunksjonen og gi symptomer på overaktiv blære. Det er da viktig og behandle forstoppelsen først.",
              "For overvektige vil det være gunstig å gå ned i vekt, noe som gir redusert buktrykk og dermed mindre trykk på urinblæren. Dersom bekkenbunnstrening og andre konservative tiltak ikke har gitt tilfredsstillende resultat kan det være behov for mer rådgivning og utredning. Behandlingen vil kunne bestå av ulike hjelpemidler, blæretrening, elektrostimulering og medikamenter. Noen tilbys også operasjon for å bedre tilstanden. Du kan lese mer om konservativ og kirurgisk behandling for urinlekkasje under Urinlekkasje – behandling."
            ]
          },
          {
            subtitle: "Hvor og når søke råd og hjelp?",
            content: [
              "Det er individuelt hvor lang tid det kan ta før de endringer som svangerskap og fødsel medfører, går tilbake. Det anbefales tidlig oppstart med bekkenbunnstrening for urinlekkasje. Dersom man etter noen måneder ikke opplever tilfredsstillende effekt, bør man få vurdering og veiledning av helsepersonell. Som nevnt kan det ved nervepåvirkning, ta opp mot ett år før symptomene bedres. Men dersom plagene påvirker daglige aktiviteter og gir redusert livskvalitet, bør man søke hjelp. Det kan for eksempel være behov for hjelpemidler eller strukturert behandlingsopplegg hos fysioterapeut eller uroterapeut.",
              "Her er forslag til ulike instanser hvor du kan søke råd og hjelp:",
              "1. Fastlege",
              "2. Jordmor",
              "3. Helsestasjon/helsesykepleier",
              "4. Gynekolog",
              "5. Fysioterapeut",
              "6. Uroterapeut"
            ]
          }
        ]
      },
      {
        title: "Urinveisinfeksjon under graviditet",
        content: [
          "Urinveisinfeksjon, også kalt blærekatarr eller cystitt, er vanlig hos gravide. Hormonelle endringer påvirker slimhinner og muskulatur i urinveiene. Det skjer også mekaniske endringer på grunn av at livmoren vokser. På grunn av dette oppstår det urinveisinfeksjon hos 10-15% av alle gravide. Urinveisinfeksjon hos gravide gir de samme plagene som utenom svangerskap, det vil si svie ved vannlatning, hyppig vannlatning og økt trang. Dersom man i tillegg får feber, og eventuelt rygg- eller magesmerter, kan dette tyde på at infeksjonen har spredd seg lengre oppover urinlederne til nyrebekkenet, såkalt nyrebekkenbetennelse.",
          "Det er viktig å oppdage og behandle urinveisinfeksjon hos gravide da en ubehandlet infeksjon kan føre til for tidlig fødsel og nedsatt vekst hos barnet. Alle gravide blir ved første svangerskapskontroll undersøkt for bakterier i urinen ved å levere urinprøve til dyrkning. Urinveisinfeksjon uten symptomer (asymptomatisk bakteriuri) påvises hos 2-5 prosent. Asymptomatisk bakteriuri er ofte tilbakevendende, og etter behandling bør urinen dyrkes hver fjerde uke resten av svangerskapet."
        ],
        subsections: [
          {
            subtitle: "Råd og forebyggende tiltak",
            items: [
              "Rikelig væskeinntak for god gjennomskylling av urinveiene",
              "Late vannet regelmessig og ved behov",
              "Tømme blæren fullstendig ved vannlating",
              "Late vannet innen 15 minutter etter samleie",
              "Unngå å fryse på ben/underliv",
              "Effekten av tranebær er usikker"
            ]
          },
          {
            subtitle: "Behandling",
            content: [
              "Urinveisinfeksjon hos gravide sees på som kompliserte og skal alltid behandles med antibiotika. Behandlingstiden er 7 dager i motsetning til 3 dager som er vanlig behandling ved ukomplisert urinveisinfeksjon. Antibiotikaen som blir anbefalt er Pivmecillinam, Nitrofurantoin eller Trimetoprim. Bemerk at det hyppig brukte midlet Trimetoprim ikke skal brukes i første trimester, men er helt trygt senere i svangerskapet.",
              "Dersom symptomer på urinveisinfeksjon anbefales det å ta kontakt med lege/jordmor. Ta med urinprøve."
            ]
          }
        ]
      }
    ]
  },
  en: {
    title: "Bladder Function",

    sections: [
      {
        id: "normal",
        title: "Normal Bladder Function",
        content: [
          "The urine volume for an adult woman is 1-2 liters per day, naturally depending on fluid intake. It is therefore normal to urinate every 3-4 hours during the waking hours of the day. We normally produce less urine during the night because we secrete the hormone ADH (anti-diuretic hormone). This allows us to sleep through the night. Lower production of this hormone with increasing age can be a cause of waking up during the night with the urge to urinate. Normal morning urine volume is 300-600ml. A good habit is to empty the bladder when getting up, then at regular intervals and just before bedtime.",
          "The bladder is located down in the pelvis. When the bladder fills with urine, the pressure in the bladder remains low as the bladder muscle relaxes, fills and expands. The sphincter around the urethra prevents urine from leaking out. As the bladder fills, signals are sent that we perceive as the urge to urinate. When we then want to urinate, the upper part of the urethra expands and the bladder muscle contracts so that the urine comes out."
        ]
      },
      {
        id: "pregnancy",
        title: "Bladder Function During Pregnancy",
        content: [
          "Changes in kidneys and urinary tract occur in the pregnant woman already in the first weeks of pregnancy. The pregnancy hormone progesterone causes all smooth muscle to relax more and become slacker. The renal pelvis and ureters expand. In some cases, pressure occurs against the ureter so that the passage of urine is affected. Most people are unaware of the changes, while some may feel pain over the back/kidney region. The pain can be confused with kidney stone pain. This rarely needs treatment and goes away on its own. If drainage is significantly affected, this is treated by placing a stent (catheter) to the renal pelvis for relief.",
          "Blood volume gradually increases during pregnancy by about 40-50 percent. Blood flow in the kidneys increases by 30-50 percent and the pregnant woman will be able to notice changes in the form of frequent urination due to increased urine production. In addition, the bladder has less space as the uterus grows. The woman experiences wanting to urinate more often and with much smaller volumes than before. This improves somewhat after about 12 weeks when the uterus rises higher. Some experience urination as almost normal again. Towards the end of pregnancy, there will again be pressure on the bladder as the baby's head descends into the pelvis.",
          "Some pregnant women experience slight swelling in the body during the day. As a result of increased blood volume, increased pressure in the blood vessels and increased pressure from the growing uterus, fluid is pressed from the blood vessels into the tissue. At night when lying down, this fluid is more easily drawn into the bloodstream which again gives increased flow in the kidneys and thus increased urine production. Many therefore experience more frequent urination at night."
        ]
      },
      {
        id: "advice",
        title: "Advice for Better Bladder Emptying",
        content: [
          "A good sitting position for a woman is to sit on the toilet with good support for the thighs and slightly bent forward to be able to relax in the pelvic floor. Preferably use a wide and low footrest for support under the feet. The bladder should empty itself by its own force, without help from abdominal pressure. When urination is finished, the bladder should be completely empty.",
          "The bladder muscle itself also becomes slacker as a result of hormonal influence. Some experience that it takes longer to urinate and that it is difficult to empty the bladder properly. Incomplete bladder emptying can lead to what is called \"residual urine\", which can predispose to urinary tract infection. You should therefore take your time on the toilet and not press hard on the bladder. Let the bladder muscle work and empty itself in peace. It can help to try to start urinating once more after finished urination, so-called 'double voiding'. Often one will then be able to empty the bladder further."
        ]
      },
      {
        id: "birth",
        title: "Bladder Function During and After Birth",
        subsections: [
          {
            subtitle: "During Birth",
            content: "During birth, the bladder is subjected to mechanical pressure and the normal feeling of the urge to urinate can be changed. Use of epidural pain relief or spinal anesthesia can also affect the bladder. This can give reduced sensation of bladder filling and reduced ability to empty the bladder normally. During birth, the birth attendant/midwife therefore makes sure that the bladder is emptied regularly. If the woman giving birth cannot urinate sufficiently, the bladder can be catheterized and the urine emptied via a thin catheter/plastic tube. It is important to ensure good bladder emptying both to maintain later bladder function, but also to prevent the bladder from standing in the way of the baby."
          },
          {
            subtitle: "After Birth",
            content: [
              "Bladder function and urination are often affected the first days after birth. You may notice increased urine production because the body excretes increased amounts of fluid in the body. It can be difficult to urinate due to swelling in the tissue around the urethral opening after birth. Some do not feel that the bladder is full. Reduced sensation and emptying difficulties apply especially after epidural anesthesia. Emptying difficulties can also occur in cases where it has been necessary to deliver the baby with vacuum/forceps.",
              "It is important to avoid the bladder becoming too full and the midwife therefore monitors the urination function also in the phase after birth. It should preferably not exceed 500 ml in the bladder to avoid what is called 'overstretching' of the bladder. Such overstretching can give more long-term problems with bladder emptying. Incomplete emptying of the bladder can lead to urinary tract infections. You are therefore encouraged to urinate and it is checked whether urination is sufficient. The condition is usually followed up with measurement of spontaneous urination and examination of residual urine with the help of bladder scanner. If you cannot urinate, it may be necessary to empty the bladder with a catheter. This is done either with the help of an intermittent catheter or a permanent catheter is inserted. Often the need for catheterization is short-term and urination starts on its own. If the problems persist, you can learn to insert an intermittent catheter yourself. Such treatment often has good effect and leads to normalization of urination."
            ]
          }
        ]
      },
      {
        id: "leakage",
        title: "Urinary Leakage",
        content: [
          "Pregnancy and childbirth lead to a number of changes that can affect control over bladder function. Urinary leakage is common in women during pregnancy and after childbirth and an occurrence of almost 50 percent is reported. One year after birth, the occurrence of urinary leakage is reduced to about 20 percent. For most, the problems are small and temporary, but for some this can become a persistent and larger problem.",
          "The pelvic floor plays an important role for the ability to be continent (not leak) for urine. During pregnancy, the pelvis is affected by hormones that soften the structures in the pelvic floor. The hormonal influence of progesterone causes the sphincter around the urethra to become weaker and thus give poorer closure. Changes also consist of increased weight and pressure on the pelvic floor as well as changed position of bladder and urethra. The risk of urinary leakage increases the further into pregnancy you are.",
          "Despite the fact that the structures in the pelvis soften during pregnancy, overstretching, weakening, rupture or damage to muscles and ligaments can occur during childbirth. The nerves that supply the pelvic area can also be affected by pressure during vaginal birth. Such influence is most often temporary and it can take up to a year before the nerves are healed. In some cases, the damage to the nerves can be permanent.",
          "Hormonal influence during breastfeeding will give fragile and dry mucous membranes both in the vagina and urethra. This can also give weaker closure around the urethra and thus urinary leakage."
        ],
        subsections: [
          {
            subtitle: "Stress Incontinence",
            content: "This is the most common form of urinary leakage during pregnancy and after childbirth. This leakage occurs in connection with activity, coughing, laughter and sneezing where abdominal pressure increases. The leakage can be from a few drops to small amounts and stops when the activity stops. The condition is due to insufficient closure function around the urethra and is called stress incontinence. The closure function can be weakened as a result of weakened sphincter around the urethra and/or weakened support tissue in the pelvic floor."
          },
          {
            subtitle: "Urge Incontinence/Overactive Bladder",
            content: "Urinary leakage in connection with overactive bladder is called urge incontinence. It is associated with frequent, sudden and strong urge to urinate and is also called urgency leakage. Bladder capacity is reduced and one cannot hold as much urine at a time. It is difficult to postpone the urge and the leakage often gives larger amounts of urine as the bladder contracts and can lead to complete bladder emptying. There can also be frequent and strong urge without leakage occurring, so-called urgency. The problem can be experienced as very troublesome even if it does not cause leakage. Such urgency can for some lead to isolation to varying degrees because one must have the toilet easily accessible. Many with such a condition also experience having to get up at night to urinate as bladder capacity is reduced. When the condition begins to affect everyday life, many experience this as a problem."
          },
          {
            subtitle: "Mixed Incontinence",
            content: "A combination of both stress and urge incontinence is called mixed incontinence."
          },
          {
            subtitle: "Advice",
            content: [
              "General advice is to avoid drinking late in the evening which can lead to less urine production at night if frequent, nocturnal urination is a problem. For some, it may be beneficial to reduce fluid intake during the day as well if you generally drink too much (then usually over three liters). The urination function itself should also be given attention. This means that you should ensure that the bladder empties as well as possible. You can read more about tips for good sitting position for urination. If you still cannot empty the bladder completely on your own, it can help to get training in emptying it with an intermittent catheter.",
              "Many of the natural changes following pregnancy and hormonal influence can contribute to urinary leakage. To strengthen control over bladder function and reduce the risk of or symptoms of urinary leakage, both during and after pregnancy, you should do pelvic floor exercises and train the pelvic floor muscles. The pelvic floor muscles are experienced by many as weakened right after birth and it is not uncommon to leak urine during, for example, coughing or activity, as mentioned stress incontinence. In this period, it is important to start active pelvic floor training as such training often has good effect and many get rid of urinary leakage.",
              "With urge incontinence, being able to do strong, good pelvic floor contractions can help suppress the bladder emptying reflex. In this way, the strong urgency is also suppressed so that urinary leakage is avoided before reaching the toilet. Regularly training the pelvic floor so that you get control over the muscles and can use it actively to suppress the strong urge is therefore important.",
              "Symptoms as described with urge incontinence can also be due to bacteria in the urine and urinary tract infection. A urine sample should therefore always be taken for culture to detect any infection so that it can be treated according to resistance pattern.",
              "Constipation in the bowel and slow bowel movements can in some cases affect bladder function and cause symptoms of overactive bladder. It is then important to treat the constipation first.",
              "For overweight people, it will be beneficial to lose weight, which gives reduced abdominal pressure and thus less pressure on the bladder. If pelvic floor training and other conservative measures have not given satisfactory results, there may be a need for more counseling and evaluation. The treatment may consist of various aids, bladder training, electrical stimulation and medications. Some are also offered surgery to improve the condition. You can read more about conservative and surgical treatment for urinary leakage under Urinary Leakage - Treatment."
            ]
          },
          {
            subtitle: "Where and When to Seek Advice and Help?",
            content: [
              "It is individual how long it can take before the changes that pregnancy and childbirth entail go back. Early start with pelvic floor training for urinary leakage is recommended. If you do not experience satisfactory effect after a few months, you should get evaluation and guidance from healthcare personnel. As mentioned, with nerve involvement, it can take up to a year before the symptoms improve. But if the problems affect daily activities and give reduced quality of life, you should seek help. There may for example be a need for aids or structured treatment programs with a physiotherapist or urotherapist.",
              "Here are suggestions for various instances where you can seek advice and help:",
              "1. General practitioner",
              "2. Midwife",
              "3. Health station/health nurse",
              "4. Gynecologist",
              "5. Physiotherapist",
              "6. Urotherapist"
            ]
          }
        ]
      },
      {
        id: "infection",
        title: "Urinary Tract Infection During Pregnancy",
        content: [
          "Urinary tract infection, also called bladder catarrh or cystitis, is common in pregnant women. Hormonal changes affect mucous membranes and muscles in the urinary tract. Mechanical changes also occur because the uterus grows. Because of this, urinary tract infection occurs in 10-15% of all pregnant women. Urinary tract infection in pregnant women gives the same problems as outside pregnancy, namely burning during urination, frequent urination and increased urge. If you also get a fever, and possibly back or abdominal pain, this may indicate that the infection has spread further up the ureters to the renal pelvis, so-called pyelonephritis.",
          "It is important to detect and treat urinary tract infection in pregnant women as an untreated infection can lead to premature birth and reduced growth in the child. All pregnant women are examined for bacteria in the urine at the first pregnancy check-up by delivering a urine sample for culture. Urinary tract infection without symptoms (asymptomatic bacteriuria) is detected in 2-5 percent. Asymptomatic bacteriuria is often recurrent, and after treatment, urine should be cultured every fourth week for the rest of the pregnancy."
        ],
        subsections: [
          {
            subtitle: "Advice and Preventive Measures",
            items: [
              "Adequate fluid intake for good flushing of the urinary tract",
              "Urinate regularly and when needed",
              "Empty the bladder completely during urination",
              "Urinate within 15 minutes after intercourse",
              "Avoid getting cold on legs/pelvic area",
              "The effect of cranberry is uncertain"
            ]
          },
          {
            subtitle: "Treatment",
            content: [
              "Urinary tract infection in pregnant women is seen as complicated and should always be treated with antibiotics. Treatment time is 7 days as opposed to 3 days which is usual treatment for uncomplicated urinary tract infection. The antibiotic that is recommended is Pivmecillinam, Nitrofurantoin or Trimetoprim. Note that the frequently used agent Trimetoprim should not be used in the first trimester, but is completely safe later in pregnancy.",
              "If symptoms of urinary tract infection are present, it is recommended to contact a doctor/midwife. Bring a urine sample."
            ]
          }
        ]
      }
    ]
  }
} as const

export const BladderFunctionSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = bladderFunctionData[language]

  return (
    <>
      {data.sections.map((section: any, index: number) => (
        <SectionAccordion
          key={index}
          id={`bladder-function-${section.id}`}
          title={section.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
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

            {/* Subsections */}
            {section.subsections && section.subsections.map((subsection: any, sIndex: number) => (
              <div key={sIndex} style={{ marginTop: '24px' }}>
                <h5 className={styles.subsectionHeading} style={{
                  color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                }}>
                  {subsection.subtitle}
                </h5>

                {subsection.content && (
                  Array.isArray(subsection.content) ? (
                    subsection.content.map((paragraph: string, pIndex: number) => (
                      <p key={pIndex} className={styles.enhancedParagraph}>
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className={styles.enhancedParagraph}>
                      {subsection.content}
                    </p>
                  )
                )}

                {subsection.items && (
                  <ul className={styles.resourceList}>
                    {subsection.items.map((item: string, iIndex: number) => (
                      <li key={iIndex} className={styles.resourceListItem}>
                        {item}
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
