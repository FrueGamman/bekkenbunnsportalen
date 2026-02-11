"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'
import { ClickableImage } from '../../../components/ui/ClickableImage'

const COMMON_PROBLEMS_DATA = {
  no: {
    pageTitle: 'Vanlige plager',
    sections: [
      {
        id: 'urinlekkasje',
        title: 'Urinlekkasje',
        image: '/image-7.svg',
        intro: 'Mange opplever urinlekkasje under graviditet og etter fødsel. De to vanligste formene for urinlekkasje er stressinkontinens og urgeinkontinens:',
        types: [
          'Stressinkontinens skyldes svekket lukkefunksjon i eller rundt urinrøret',
          'Urgeinkontinens skyldes overaktivitet blæremuskelen'
        ],
        subsections: [
          {
            id: 'stress-symptoms',
            title: 'Symptomer stressinkontinens',
            items: [
              'Urinlekkasje i forbindelse med aktivitet (eks hoste/nys/hopp)',
              'Lekkasje under samleie',
              'Fra noen dråper urin til større mengder'
            ]
          },
          {
            id: 'urge-symptoms',
            title: 'Symptomer urgeinkontinens',
            items: [
              'Urinlekkasje',
              'Hyppig og plutselig vannlatingstrang',
              'Uimotståelig vannlatingstrang (urgency)',
              'Liten blærekapasitet',
              'Nattlig vannlating'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Råd til selvhjelp',
            items: [
              'Bekkenbunnstrening',
              'Unngå å drikke sent på kvelden',
              'Vektreduksjon ved overvekt',
              'Forsøk å utsette vannlatingen og dermed øke blærekapasiteten ved urgeinkontinens',
              'Behandle eventuell forstoppelse for avføring'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Dersom rådene til selvhjelp ikke gir tilfredsstillende resultat, bør man oppsøke fastlege for videre utredning og behandling. Det kreves ulik tilnærming for behandling av de ulike lekkasjeformene.'
          }
        ]
      },
      {
        id: 'avforingslekkasje',
        title: 'Avføringslekkasje',
        image: '/fecalincontinence.svg',
        intro: 'Endret avføringsmønster og problemer med å kontrollere luftavgang er ikke uvanlig de første 3 måneder etter fødsel.',
        keyPoints: [
          'Ved luftlekkasje de første ukene etter fødsel vil som regel bekkenbunnstrening være god behandling',
          'Det er ikke normalt å ha lekkasje av avføring etter fødsel'
        ],
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptomer',
            items: [
              'Lekkasje av luft, flytende eller fast avføring',
              'Soiling (striper i undertøyet)',
              'Episoder med brå og sterk trang til avføring (hastverkslekkasje/urge)',
              'Manglende evne til å kjenne når du skal ha avføring'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Råd til selvhjelp',
            items: [
              'Bekkenbunnstrening',
              'Regulere avføringskonsistens',
              'Assistert tømming med ballongsprøyte'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Henvisning til gastrokirurg via fastlege ved plagsom lekkasje av flytende eller fast avføring, 6–12 uker etter fødsel. Det finnes flere konservative tiltak som krever spesialopplæring fra helsepersonell, som for eksempel irrigasjon. Dersom slik behandling ikke fører frem, finnes ulike kirurgiske tilbud.'
          }
        ]
      },
      {
        id: 'forstoppelse',
        title: 'Forstoppelse',
        image: '/constipation.svg',
        intro: 'Rett etter fødsel er det vanlig med hard og smertefull avføring. Dersom smerte rundt endetarmsåpningen er hovedproblemet kan man forsøke:',
        initialAdvice: [
          'Hånddusj med lunket vann mot underlivet under avføring',
          'Å smøre lokalbedøvelse som Xylocain-salve mot endetarmsåpningen før avføring'
        ],
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptomer',
            items: [
              'Avføringsbesvær med hard, treg, uregelmessig, ufullstendig eller sjelden avføring',
              'Oppblåsthet/luftplager',
              'Magesmerter',
              'Vanskelig å tørke seg ren'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Råd til selvhjelp',
            items: [
              'Gode dovaner, ikke utsett avføring',
              'Fysisk aktivitet',
              'Husk amming krever høyere væskeinntak',
              'Regulere avføringskonsistens. Legemidler som kan brukes for å mykgjøre avføringen er for eksempel Laktulose eller Movicol',
              'Klyster (mini-, olje- eller saltvannsklyster)',
              'Assistert tarmtømming med skyllesprøyte'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Ved manglende effekt bør man henvises via fastlege til gastrokirurg for systematisk utredning og behandling.'
          }
        ]
      },
      {
        id: 'hemoroider',
        title: 'Hemoroider',
        image: '/Hemorhoids.svg',
        intro: 'Det finnes to typer hemoroider, indre og ytre:',
        types: [
          'Indre hemorider kommer fra øvre del av endetarmen',
          'Ytre hemoroider kommer fra utsiden av endetarmsåpningen',
          'Ved usikkerhet om hva blødning fra endetarm eller i avføring skyldes skal lege alltid kontaktes'
        ],
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptomer hemoroider',
            items: [
              'Synlig blod på toalettpapiret eller i avføringen',
              'Irritasjon/kløe i endetarmen',
              'Smerter i endetarmen, spesielt under avføring',
              'Tyngdefornemmelse',
              'Kan være synlig utposning',
              'Følelse av ufullstending tømming',
              'Vanskelig å tørke seg rein'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Råd til selvhjelp',
            items: [
              'Unngå å presse ved toalettbesøk',
              'Regulere avføringskonsistens',
              'Lokal behandling i 3–4 uker med reseptfri kortisonholdig salve, Sheriproct'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Henvisning via fastlege til kirurgisk poliklinikk ved vedvarende plager'
          },
          {
            id: 'thrombosed-symptoms',
            title: 'Symptomer ytre tromboserte hemoroider',
            items: [
              'Harde, blålige og smertefulle utposninger på yttersiden av endetarmen, uavhengig av avføring'
            ]
          },
          {
            id: 'thrombosed-advice',
            title: 'Råd ved tromboserte hemoroider',
            items: [
              'Tøm blodansamlingen fra hemoroiden for å lindre smerten',
              'Lokal behandling med reseptfri kortisonholdig salve, Sheriproct kan lindre',
              'Tilstanden bør behandles da den er svært smertefull'
            ]
          },
          {
            id: 'thrombosed-help',
            title: 'Når og hvor søke hjelp ved tromboserte hemoroider?',
            description: 'Anbefalingen er henvisning til kirurgi som øyeblikkelig hjelp via fastlege eller legevakt. Uten kirurgi vil smertene og kulen forsvinne i løpet av 4–6 uker.'
          }
        ]
      },
      {
        id: 'smertefull-avforing',
        title: 'Smertefull avføring',
        image: '/Pain bowl movement.svg',
        intro: 'De første dagene etter fødsel opplever mange avføringen som smertefull. Unngå hard avføring med rikelig drikke og eventuelt avføringsmidler. Tilstreb ro ved toalettbesøk. Det kan lindre å skylle underlivet med lunket vann under avføring. Ved usikkerhet om hva blødning fra endetarm eller i avføring skyldes skal lege alltid kontaktes.',
        subsections: [
          {
            id: 'fissure-symptoms',
            title: 'Symptomer kronisk analfissur',
            items: [
              'Rift i slimhinnen i endetarmsåpningen',
              'Krampaktige smerter som kan vare fra 20 minutter og opptil flere timer etter avføring',
              'Noen ganger små blødninger',
              'Stram, smertefull lukkemuskel',
              'Ofte ses en liten hudflik i enden av såret'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Råd til selvhjelp',
            items: [
              'Regulere avføringskonsistens',
              'Ikke utsett avføring ved trang',
              'Bruk gjerne hånddusj etter avføring',
              'Unngå overdrevet vasking/bruk av såpe',
              'Beskyttende barrierekremer/servietter',
              'Lokal bedøvende gele for kortvarig bruk (Xylocain)',
              'Smertestillende (Paracetamol/Ibuprofen)'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Ved plager over 6 uker bør man oppsøke fastlege for utredning og behandling.'
          }
        ]
      },
      {
        id: 'hastverkstrang',
        title: 'Hastverkstrang',
        image: '/Emergency.svg',
        subsections: [
          {
            id: 'bowel-symptoms',
            title: 'Symptomer hastverkstrang for avføring',
            items: [
              'Sterk og plutselig trang (urgency)',
              'Kan ikke utsette avføringen i 15 minutter',
              'Redd for å lekke',
              'Vanskelig å delta på aktiviteter som før',
              'Løs avføring',
              'Lekkasje for luft eller avføring'
            ]
          },
          {
            id: 'bowel-selfhelp',
            title: 'Råd til selvhjelp for avføring',
            items: [
              'Etablere gode dovaner',
              'Tilstrebe normal avføringskonsistens',
              'Bekkenbunnstrening',
              'Assistert tømming med ballongsprøyte'
            ]
          },
          {
            id: 'bowel-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Dersom rådene til selvhjelp ikke gir tilfredsstillende resultat, bør man oppsøke fastlege for videre utredning og behandling.'
          },
          {
            id: 'urinary-symptoms',
            title: 'Symptomer hastverkstrang for urin',
            items: [
              'Plutselig og uimotståelig vannlatingstrang (urgency)',
              'Kan ikke utsette vannlatingen',
              'Redd for å lekke',
              'Liten blærekapasitet',
              'Nattlig vannlating',
              'Lekkasje for urin',
              'Vanskelig å delta på aktiviteter som før'
            ]
          },
          {
            id: 'urinary-selfhelp',
            title: 'Råd til selvhjelp for urin',
            items: [
              'Forsøk å utsette vannlating og dermed øke blærekapasitet',
              'Unngå å drikke sent på kvelden',
              'Bekkenbunnstrening',
              'Behandle eventuell forstoppelse for avføring'
            ]
          },
          {
            id: 'urinary-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Dersom rådene til selvhjelp ikke gir tilfredsstillende resultat, bør man oppsøke fastlege for videre utredning og behandling.'
          }
        ]
      },
      {
        id: 'urinveisinfeksjon',
        title: 'Urinveisinfeksjon',
        image: '/Urinary Infenction.svg',
        intro: 'Urinveisinfeksjon er mer vanlig blant gravide enn ikke-gravide kvinner. Alle gravide undersøkes for forekomst av bakterier i urinen ved første svangerskapskontroll. Urinveisinfeksjon under graviditet skal alltid behandles med antibiotika.',
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptomer',
            items: [
              'Svie/smerter ved vannlating',
              'Hyppig vannlating',
              'Smerte/ubehag over blæren',
              'Blod i urinen',
              'Ryggsmerter',
              'Feber'
            ]
          },
          {
            id: 'prevention',
            title: 'Forebygging og råd',
            items: [
              'Drikk mye',
              'Lat vannet ofte',
              'Tøm blæren tom',
              'Lat vannet etter samleie',
              'Unngå å fryse på ben/underliv',
              'Effekten av tranebær er usikker'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp',
            description: 'Søk hjelp hos fastlege eller jordmor ved symptomer, husk å ta med urinprøve. Urinveisinfeksjon hos gravide skal alltid behandles med antibiotika.'
          }
        ]
      },
      {
        id: 'tyngdefolelse-prolaps',
        title: 'Tyngdefølelse og prolaps',
        image: '/Heaviness and Prolapse.svg',
        intro: 'Tyngdefornemmelse og følelsen av prolaps enten via skjede eller endetarm, er vanlig de første månedene etter fødsel. Tilstanden kan bedre seg etter ammeperioden som følge av hormonelle endringer. Det finnes ulike typer prolaps som gir forskjellige symptomer.',
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptomer',
            items: [
              'Tømmingsvansker for urin eller avføring',
              'Må trykke med en finger på bakre skjedevegg for å få ut avføringen fra endetarmen',
              'Lekkasje av urin eller avføring',
              'Utbulinger og følelse av press i skjeden'
            ]
          },
          {
            id: 'advice',
            title: 'Råd',
            items: [
              'Bekkenbunnstrening',
              'Konsistensregulering av avføring',
              'Tømmingsregime'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Dersom vedvarende plager bør man oppsøke fastege for undersøkelse og eventuell videre henvisning til gynekolog for vedvarende vannlatingsbesvær eller gastrokirurg for hjelp til tømmingsproblemer for avføring.'
          }
        ]
      },
      {
        id: 'fodselsrift',
        title: 'Fødselsrift',
        image: '/Perineal Tears (2).svg',
        intro: 'Det er vanlig at det oppstår rifter i underlivet i forbindelse med fødsel. Større rifter som involverer lukkemuskel er sjeldne og behandles særskilt. I Norge er det er stort fokus på å forebygge forekomst av store fødselsrifter. Det er vanlig å ha problemer med å kontrollere luft og urin den første tiden etter fødsel. Det er ikke normalt å ha lekkasje av avføring etter fødsel med fødselsrift.',
        subsections: [
          {
            id: 'initial-advice',
            title: 'Råd den første tiden etter fødselsrift',
            items: [
              'Skylle med hånddusj morgen og kveld samt etter hver avføring',
              'Ikke bruk såpe',
              'Skifte bind regelmessig',
              'Trykkavlastning av underlivet',
              'Smertestillende ved behov',
              'Konsistensregulering av avføringen'
            ]
          },
          {
            id: 'infection-symptoms',
            title: 'Symptomer på sårinfeksjon',
            items: [
              'Feber',
              'Økende smerter',
              'Hevelse, rødhet, varme, eventuelt puss',
              'Revning av sår'
            ]
          },
          {
            id: 'seek-help',
            title: 'Når og hvor søke hjelp?',
            description: 'Dersom tegn til infeksjon bør du oppsøke legehjelp innen ett døgn.'
          }
        ]
      },
      {
        id: 'samleie',
        title: 'Samleie',
        image: '/Sexualintercourse.svg',
        subsections: [
          {
            id: 'pain',
            title: 'Smerter',
            description: 'Langvarige, vedvarende eller tilbakevendende smerter ved samleie er ikke normalt. Tilstanden har mange navn som vestibulitt, vulvodyni, dyspareuni, vaginisme, overaktiv bekkkenbunn eller langvarige underlivssmerter. Tilstandene krever individuell utredning og behandling.'
          },
          {
            id: 'pregnancy',
            title: 'Samleie i svangerskapet',
            items: [
              'Ufarlig ved normalt svangerskap',
              'Spor av blod under samleie er vanlig',
              'Noen rådes til å avstå fra samleie på grunn av ulike forhold – følg råd gitt av lege eller jordmor'
            ]
          },
          {
            id: 'pregnancy-help',
            title: 'Når og hvor søke hjelp ved graviditet?',
            items: [
              'Ved større/vedvarende blødning',
              'Smerter i magen'
            ]
          },
          {
            id: 'postpartum',
            title: 'Samleie etter fødsel',
            description: 'Samleie de første seks ukene etter fødsel kan gi ubehag, påvirke sårtilhelingen og øke infeksjonsfaren. Ubehag ved samleie kan også forekomme etter seksukersperioden. Tørre slimhinner er ikke uvanlig i ammeperioden.'
          },
          {
            id: 'postpartum-advice',
            title: 'Råd',
            items: [
              'Ved samleie de første seks ukene bør kondom benyttes',
              'Glidemiddel anbefales ved tørre slimhinner',
              'Oppsøk hjelp hos fastege dersom ubehag ved samleie blir et vedvarende problem'
            ]
          }
        ]
      }
    ]
  },
  en: {
    pageTitle: 'Common Problems',
    sections: [
      {
        id: 'urinlekkasje',
        title: 'Urinary Incontinence',
        image: '/image-7.svg',
        intro: 'Many experience urinary incontinence during pregnancy and after childbirth. The two most common forms of urinary incontinence are stress incontinence and urge incontinence:',
        types: [
          'Stress incontinence is due to weakened closing function in or around the urethra',
          'Urge incontinence is due to overactivity of the bladder muscle'
        ],
        subsections: [
          {
            id: 'stress-symptoms',
            title: 'Stress Incontinence Symptoms',
            items: [
              'Urinary leakage during activity (e.g., coughing/sneezing/jumping)',
              'Leakage during intercourse',
              'From a few drops of urine to larger amounts'
            ]
          },
          {
            id: 'urge-symptoms',
            title: 'Urge Incontinence Symptoms',
            items: [
              'Urinary leakage',
              'Frequent and sudden urge to urinate',
              'Irresistible urge to urinate (urgency)',
              'Small bladder capacity',
              'Nighttime urination'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Self-Help Advice',
            items: [
              'Pelvic floor exercises',
              'Avoid drinking late in the evening',
              'Weight reduction if overweight',
              'Try to delay urination to increase bladder capacity for urge incontinence',
              'Treat any constipation'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help?',
            description: 'If self-help advice does not provide satisfactory results, you should see a general practitioner for further investigation and treatment. Different approaches are required for treating the different forms of leakage.'
          }
        ]
      },
      {
        id: 'avforingslekkasje',
        title: 'Fecal Incontinence',
        image: '/fecalincontinence.svg',
        intro: 'Altered bowel patterns and problems controlling gas are not uncommon in the first 3 months after childbirth.',
        keyPoints: [
          'For gas leakage in the first weeks after childbirth, pelvic floor exercises will usually be good treatment',
          'It is not normal to have fecal leakage after childbirth'
        ],
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptoms',
            items: [
              'Leakage of gas, liquid, or solid stool',
              'Soiling (streaks in underwear)',
              'Episodes of sudden and strong urge to defecate (urge incontinence)',
              'Inability to sense when you need to have a bowel movement'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Self-Help Advice',
            items: [
              'Pelvic floor exercises',
              'Regulate stool consistency',
              'Assisted evacuation with bulb syringe'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help?',
            description: 'Referral to gastrointestinal surgeon via general practitioner for bothersome leakage of liquid or solid stool, 6–12 weeks after childbirth. There are several conservative measures that require specialized training from healthcare personnel, such as irrigation. If such treatment is not successful, various surgical options are available.'
          }
        ]
      },
      {
        id: 'forstoppelse',
        title: 'Constipation',
        image: '/constipation.svg',
        intro: 'Right after childbirth, it is common to have hard and painful bowel movements. If pain around the anal opening is the main problem, you can try:',
        initialAdvice: [
          'Hand shower with lukewarm water to the pelvic area during bowel movement',
          'Applying local anesthetic such as Xylocaine ointment to the anal opening before bowel movement'
        ],
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptoms',
            items: [
              'Bowel difficulties with hard, slow, irregular, incomplete, or infrequent bowel movements',
              'Bloating/gas problems',
              'Abdominal pain',
              'Difficult to clean properly'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Self-Help Advice',
            items: [
              'Good toilet habits, do not postpone bowel movements',
              'Physical activity',
              'Remember breastfeeding requires higher fluid intake',
              'Regulate stool consistency. Medications that can be used to soften stool include Lactulose or Movicol',
              'Enema (mini-, oil- or saline enemas)',
              'Assisted bowel evacuation with irrigation syringe'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help?',
            description: 'If there is no effect, referral via general practitioner to gastrointestinal surgeon for systematic investigation and treatment is recommended.'
          }
        ]
      },
      {
        id: 'hemoroider',
        title: 'Hemorrhoids',
        image: '/Hemorhoids.svg',
        intro: 'There are two types of hemorrhoids, internal and external:',
        types: [
          'Internal hemorrhoids come from the upper part of the rectum',
          'External hemorrhoids come from outside the anal opening',
          'If uncertain about what bleeding from the rectum or in stool is caused by, a doctor should always be contacted'
        ],
        subsections: [
          {
            id: 'symptoms',
            title: 'Hemorrhoid Symptoms',
            items: [
              'Visible blood on toilet paper or in stool',
              'Irritation/itching in the rectum',
              'Pain in the rectum, especially during bowel movements',
              'Feeling of heaviness',
              'May have visible protrusion',
              'Feeling of incomplete evacuation',
              'Difficult to clean properly'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Self-Help Advice',
            items: [
              'Avoid straining during toilet visits',
              'Regulate stool consistency',
              'Local treatment for 3–4 weeks with over-the-counter cortisone ointment, Sheriproct'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help?',
            description: 'Referral via general practitioner to surgical outpatient clinic for persistent problems.'
          },
          {
            id: 'thrombosed-symptoms',
            title: 'External Thrombosed Hemorrhoid Symptoms',
            items: [
              'Hard, bluish, and painful protrusions on the outside of the rectum, independent of bowel movements'
            ]
          },
          {
            id: 'thrombosed-advice',
            title: 'Advice for Thrombosed Hemorrhoids',
            items: [
              'Drain the blood collection from the hemorrhoid to relieve pain',
              'Local treatment with over-the-counter cortisone ointment, Sheriproct can provide relief',
              'The condition should be treated as it is very painful'
            ]
          },
          {
            id: 'thrombosed-help',
            title: 'When and Where to Seek Help for Thrombosed Hemorrhoids?',
            description: 'The recommendation is referral to surgery as emergency help via general practitioner or emergency room. Without surgery, the pain and lump will disappear within 4–6 weeks.'
          }
        ]
      },
      {
        id: 'smertefull-avforing',
        title: 'Painful Bowel Movements',
        image: '/Pain bowl movement.svg',
        intro: 'In the first days after childbirth, many experience painful bowel movements. Avoid hard stool with ample fluids and possibly laxatives. Seek calm during toilet visits. It can be soothing to rinse the pelvic area with lukewarm water during bowel movements. If uncertain about what bleeding from the rectum or in stool is caused by, a doctor should always be contacted.',
        subsections: [
          {
            id: 'fissure-symptoms',
            title: 'Chronic Anal Fissure Symptoms',
            items: [
              'Tear in the mucous membrane of the anal opening',
              'Spasmodic pain that can last from 20 minutes to several hours after bowel movement',
              'Sometimes small bleeding',
              'Tight, painful sphincter muscle',
              'Often a small skin tag is seen at the end of the wound'
            ]
          },
          {
            id: 'selfhelp',
            title: 'Self-Help Advice',
            items: [
              'Regulate stool consistency',
              'Do not postpone bowel movement when feeling the urge',
              'Use hand shower after bowel movement',
              'Avoid excessive washing/use of soap',
              'Protective barrier creams/wipes',
              'Local anesthetic gel for short-term use (Xylocaine)',
              'Pain relief (Paracetamol/Ibuprofen)'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help?',
            description: 'For problems lasting more than 6 weeks, you should see a general practitioner for investigation and treatment.'
          }
        ]
      },
      {
        id: 'hastverkstrang',
        title: 'Urgency',
        image: '/Emergency.svg',
        subsections: [
          {
            id: 'bowel-symptoms',
            title: 'Bowel Urgency Symptoms',
            items: [
              'Strong and sudden urge (urgency)',
              'Cannot delay bowel movement for 15 minutes',
              'Afraid of leaking',
              'Difficult to participate in activities as before',
              'Loose stool',
              'Leakage of gas or stool'
            ]
          },
          {
            id: 'bowel-selfhelp',
            title: 'Self-Help Advice for Bowel',
            items: [
              'Establish good toilet habits',
              'Strive for normal stool consistency',
              'Pelvic floor exercises',
              'Assisted evacuation with bulb syringe'
            ]
          },
          {
            id: 'bowel-help',
            title: 'When and Where to Seek Help?',
            description: 'If self-help advice does not provide satisfactory results, you should see a general practitioner for further investigation and treatment.'
          },
          {
            id: 'urinary-symptoms',
            title: 'Urinary Urgency Symptoms',
            items: [
              'Sudden and irresistible urge to urinate (urgency)',
              'Cannot delay urination',
              'Afraid of leaking',
              'Small bladder capacity',
              'Nighttime urination',
              'Urinary leakage',
              'Difficult to participate in activities as before'
            ]
          },
          {
            id: 'urinary-selfhelp',
            title: 'Self-Help Advice for Urination',
            items: [
              'Try to delay urination to increase bladder capacity',
              'Avoid drinking late in the evening',
              'Pelvic floor exercises',
              'Treat any constipation'
            ]
          },
          {
            id: 'urinary-help',
            title: 'When and Where to Seek Help?',
            description: 'If self-help advice does not provide satisfactory results, you should see a general practitioner for further investigation and treatment.'
          }
        ]
      },
      {
        id: 'urinveisinfeksjon',
        title: 'Urinary Tract Infection',
        image: '/Urinary Infenction.svg',
        intro: 'Urinary tract infection is more common among pregnant women than non-pregnant women. All pregnant women are tested for the presence of bacteria in their urine at the first prenatal checkup. Urinary tract infection during pregnancy should always be treated with antibiotics.',
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptoms',
            items: [
              'Burning/pain when urinating',
              'Frequent urination',
              'Pain/discomfort over the bladder',
              'Blood in urine',
              'Back pain',
              'Fever'
            ]
          },
          {
            id: 'prevention',
            title: 'Prevention and Advice',
            items: [
              'Drink plenty',
              'Urinate often',
              'Empty bladder completely',
              'Urinate after intercourse',
              'Avoid getting cold legs/pelvis',
              'The effect of cranberry is uncertain'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help',
            description: 'Seek help from a general practitioner or midwife with symptoms, remember to bring a urine sample. Urinary tract infection in pregnant women should always be treated with antibiotics.'
          }
        ]
      },
      {
        id: 'tyngdefolelse-prolaps',
        title: 'Heaviness and Prolapse',
        image: '/Heaviness and Prolapse.svg',
        intro: 'Feeling of heaviness and sensation of prolapse either via vagina or rectum is common in the first months after childbirth. The condition can improve after the breastfeeding period due to hormonal changes. There are various types of prolapse that cause different symptoms.',
        subsections: [
          {
            id: 'symptoms',
            title: 'Symptoms',
            items: [
              'Difficulty emptying bladder or bowel',
              'Must press with a finger on the back vaginal wall to get stool out from the rectum',
              'Urinary or fecal leakage',
              'Bulges and feeling of pressure in the vagina'
            ]
          },
          {
            id: 'advice',
            title: 'Advice',
            items: [
              'Pelvic floor exercises',
              'Stool consistency regulation',
              'Bladder/bowel emptying regimen'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help?',
            description: 'If persistent problems, you should see a general practitioner for examination and possible further referral to gynecologist for persistent urination problems or gastrointestinal surgeon for help with bowel evacuation problems.'
          }
        ]
      },
      {
        id: 'fodselsrift',
        title: 'Perineal Tears',
        image: '/Perineal Tears (2).svg',
        intro: 'It is common for tears to occur in the pelvic area during childbirth. Larger tears involving the sphincter muscle are rare and are treated specifically. In Norway, there is great focus on preventing the occurrence of large perineal tears. It is common to have problems controlling gas and urine in the first period after childbirth. It is not normal to have fecal leakage after childbirth with perineal tear.',
        subsections: [
          {
            id: 'initial-advice',
            title: 'Advice for the First Period After Perineal Tear',
            items: [
              'Rinse with hand shower morning and evening and after each bowel movement',
              'Do not use soap',
              'Change pads regularly',
              'Pressure relief of the pelvic area',
              'Pain relief as needed',
              'Stool consistency regulation'
            ]
          },
          {
            id: 'infection-symptoms',
            title: 'Wound Infection Symptoms',
            items: [
              'Fever',
              'Increasing pain',
              'Swelling, redness, warmth, possibly pus',
              'Wound dehiscence'
            ]
          },
          {
            id: 'seek-help',
            title: 'When and Where to Seek Help?',
            description: 'If signs of infection, you should seek medical help within one day.'
          }
        ]
      },
      {
        id: 'samleie',
        title: 'Sexual Intercourse',
        image: '/Sexualintercourse.svg',
        subsections: [
          {
            id: 'pain',
            title: 'Pain',
            description: 'Long-term, persistent, or recurring pain during intercourse is not normal. The condition has many names such as vestibulitis, vulvodynia, dyspareunia, vaginismus, overactive pelvic floor, or chronic pelvic pain. The conditions require individual investigation and treatment.'
          },
          {
            id: 'pregnancy',
            title: 'Intercourse During Pregnancy',
            items: [
              'Safe during normal pregnancy',
              'Traces of blood during intercourse are common',
              'Some are advised to abstain from intercourse due to various circumstances – follow advice given by doctor or midwife'
            ]
          },
          {
            id: 'pregnancy-help',
            title: 'When and Where to Seek Help During Pregnancy?',
            items: [
              'With larger/persistent bleeding',
              'Abdominal pain'
            ]
          },
          {
            id: 'postpartum',
            title: 'Intercourse After Childbirth',
            description: 'Intercourse in the first six weeks after childbirth can cause discomfort, affect wound healing, and increase infection risk. Discomfort during intercourse can also occur after the six-week period. Dry mucous membranes are not uncommon during breastfeeding.'
          },
          {
            id: 'postpartum-advice',
            title: 'Advice',
            items: [
              'Condoms should be used for intercourse in the first six weeks',
              'Lubricant is recommended for dry mucous membranes',
              'Seek help from general practitioner if discomfort during intercourse becomes a persistent problem'
            ]
          }
        ]
      }
    ]
  }
} as const

interface CommonProblemsProps {
  selectedSection?: string
}

export const CommonProblems = ({ selectedSection }: CommonProblemsProps) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = COMMON_PROBLEMS_DATA[language]

  // Filter sections if a specific section is selected
  const sectionsToShow = selectedSection
    ? data.sections.filter(section => section.id === selectedSection)
    : data.sections

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/famicons_people-outline(1).png"
              alt="Common Problems"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {sectionsToShow.map((section) => (
            <div key={section.id} className={styles.normalFunctionSection}>
              <h3 className={styles.causesMainSectionTitle}>{section.title}</h3>

              {'image' in section && section.image && (
                <div className={styles.anatomySection}>
                  <ClickableImage
                    src={section.image}
                    alt={section.title}
                    className={styles.anatomyImage}
                    enlargeable={true}
                    loading="lazy"
                  />
                </div>
              )}

              {'intro' in section && section.intro && (
                <p className={styles.enhancedParagraph}>{section.intro}</p>
              )}

              {'types' in section && section.types && (
                <ul className={styles.resourceList}>
                  {section.types.map((type: string, typeIdx: number) => (
                    <li key={`${section.id}-type-${typeIdx}`} className={styles.resourceListItem}>{type}</li>
                  ))}
                </ul>
              )}

              {'keyPoints' in section && section.keyPoints && (
                <ul className={styles.resourceList}>
                  {section.keyPoints.map((point: string, pointIdx: number) => (
                    <li key={`${section.id}-point-${pointIdx}`} className={styles.resourceListItem}>{point}</li>
                  ))}
                </ul>
              )}

              {'initialAdvice' in section && section.initialAdvice && (
                <ul className={styles.resourceList}>
                  {section.initialAdvice.map((advice: string, adviceIdx: number) => (
                    <li key={`${section.id}-advice-${adviceIdx}`} className={styles.resourceListItem}>{advice}</li>
                  ))}
                </ul>
              )}

              {'subsections' in section && section.subsections && section.subsections.map((subsection) => (
                <SectionAccordion
                  key={subsection.id}
                  title={subsection.title}
                  isDarkMode={resolvedTheme === 'dark'}
                  defaultOpen={false}
                >
                  {'description' in subsection && subsection.description && (
                    <p className={styles.enhancedParagraph}>{subsection.description}</p>
                  )}

                  {'items' in subsection && subsection.items && (
                    <ul className={styles.resourceList}>
                      {subsection.items.map((item: string, itemIdx: number) => (
                        <li key={`${subsection.id}-item-${itemIdx}`} className={styles.resourceListItem}>{item}</li>
                      ))}
                    </ul>
                  )}
                </SectionAccordion>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
