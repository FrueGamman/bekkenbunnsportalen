"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

// Language-specific treatment data arrays
const treatmentData = {
  no: [
    {
      id: "conservative_measures",
      sectionTitle: "Konservative tiltak",
      content: [
        "Optimal avføringskonsistens er ofte første steget i behandlingen både når det gjelder lekkasje og tømmingsproblemer for avføring. Noen tiltak for optimalisering kan man gjøre selv, men dersom man ikke når ønsket effekt er det er det hjelp å få."
      ],
      subsections: [
        {
          id: "regulering",
          title: "Regulering av avføringskonsistens",
          content: [
            "Optimal avføringskonsistens er ofte første steget i behandlingen både når det gjelder lekkasje og tømmingsproblemer for avføring. Noen tiltak for optimalisering kan man gjøre selv, men dersom man ikke når ønsket effekt er det er det hjelp å få."
          ]
        },
        {
          id: "kostrad",
          title: "Kostråd",
          content: [
            "Alle kostråd er generelle. Det finnes få studier med evidens for hvilke konkrete matvarer som påvirker avføringskonsistensen. Det er derfor viktig å ta utgangspunkt i egne erfaringer og kostråd for så å prøve seg frem for å finne de matsortene som fungerer og de som fører til forverring."
          ],
          dietSections: [
            {
              title: "Kost som kan føre til/forverre løs avføring",
              items: [
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
              content: "Kostendringer i forhold til kronisk forstoppelse (obstipasjon) er sjeldent effektivt, men kan ha effekt ved forbigående episoder med forstoppelse.\n\nØkt inntak av fiber er effektivt, parallelt med økt væskeinntak. Matvarer som svisker, kli, probiotika og kiwi kan mykgjøre konsistensen."
            }
          ]
        },
        {
          id: "fysisk_aktivitet",
          title: "Fysisk aktivitet",
          content: [
            "Det er mange positive helseeffekter av fysisk aktivitet og mosjon. Dette gjelder også på tarmfunksjonen. Fysisk aktivitet fremmer tarmens bevegelse (peristaltikk) og bidrar positivt, spesielt ved hard avføring. Helsedirektoratet anbefaler minimum 30 minutters daglig fysisk aktivitet med moderat intensitet."
          ]
        },
        {
          id: "dovaner",
          title: "Dovaner og sittestilling",
          content: [
            "Dette er svært viktig for en komplett tømming uten å måtte presse overdrevent.",
            "Bygg opp under beina med feks. en fotkrakk slik at knærne kommer over hoftehøyde.",
            "Slapp av i skuldre, len deg litt forover og støtt albuene på knærne.",
            "Slapp av, pust godt og slipp ut magen.",
            `Unngå overdreven trykking, men fokuser på å "åpne opp" for avføring.`,
            "Bruk litt tid på å konsentrere deg om å la avføringen komme i gang av seg selv.",
            "Spill på lag med den naturlige tarmrefleksen som settes i gang ca 20 minutter etter et måltid.",
            "(Reprodusert med tillatelse fra Ray Addison (UK), kontinenssykepleier og Wendy Ness (UK), kolorektal specialsykepleier. Norgine 2007.)",
            `Det viser seg at mange har feil sittestilling på toalettet, og presser for å få tømt seg. Det er derfor viktig å lære seg riktig sittestilling, og hvordan bekkenet fungerer under press. Ved anbefalt sittestilling holdes ryggen rett, og knærne er høyere enn hoften. Oppbygging (krakk) under beina bidrar til det. Hvis man i tillegg puster med magen og slapper av vil tarmen tømme seg lettere. Å gå på toalettet til samme tidspunkt "lærer" tarmen å tømme seg regelmessig.`
          ],
          hasImages: true,
          images: [
            { src: "/trinn1_0-1.png", alt: "Trinn 1: Knærne høyere enn hoften", caption: "Trinn 1: Knærne høyere enn hoften" },
            { src: "/trinn2-1.png", alt: "Trinn 2: Len fremover og hvil albuene på knærne", caption: "Trinn 2: Len fremover og hvil albuene på knærne" },
            { src: "/trinn3-1.png", alt: "Trinn 3: Spenn magen ut og rett ryggen", caption: "Trinn 3: Spenn magen ut og rett ryggen" },
            { src: "/korrekt-toiledPosistion.png", alt: "Korrekt sittestilling på toalettet", caption: "Korrekt sittestilling på toalettet" }
          ]
        },
        {
          id: "avspenning",
          title: "Avspenning av muskulatur",
          content: [
            "For at avføringen skal passere er det viktig at lukkemuskelen i endetarmen og muskulaturen i bekkenbunnen slapper av. Det er viktig å unngå og knipe/spenne muskulaturen. Det kan være en fordel å trene på å knipe og slippe for å kjenne når muskelaturen slapper godt av. Noen kan ha hjelp av å trene på avspenning individuelt med fysioterpeut."
          ]
        },
        {
          id: "ballongsproyte",
          title: "Ballongsprøyte",
          content: "Ballongsprøyte (størrelse 10) er en form for miniirrigasjon. Den fungerer som en tarmskylling med springvann av nederste del av endetarmen for å tilstrebe komplett tømming. Denne kan brukes både før tømming for å komme i gang, og også etter tømming for å tilstrebe komplett tømming."
        },
        {
          id: "glyserol",
          title: "Glyserol stikkpille",
          content: "Dette er et alternativ for å stimulere tarmen til kontraksjoner og tømming av nedre del av tarmen. Medikamentet er et uregistrert preparat og fås på resept."
        },
        {
          id: "klyster",
          title: "Klyster",
          content: "Ved mindre plager av kortere varighet kan et miniklyster prøves først. For eksempel natriumlaurylsulfat (Microlax) tube, 5 ml. Ved mer uttalte, kortvarige plager kan større klyster brukes. Eksempler på dette er olje-glyserol-klyster eller saltvannsklyster, 120 ml opptil to ganger per dag i tre døgn. Man kan gjerne også kombinere disse to ved først å sette olje for så å sette inn saltvannsklyster. Rectalsonde kan benyttes for å få væsken lengre opp i tarmen. Klysterbehandlingen kan gjentas ved behov."
        },
        {
          id: "tai",
          title: "Transanal irrigasjon",
          content: [
            "I tilfeller der forstoppelse og tømmingsproblem ikke løses ved tiltakene som nevnt over, kan det være behov for assistert tømming. Transanal irrigasjon (TAI) er en metode som tømmer tarmen ved at vann føres inn i tykktarmen via et kateter (plastrør) i endetarmen. Vannet stimulerer tarmens peristaltiske bevegelser til å kvitte seg med avføring fra endetarmen og nedre del av tykktarmen. For mange er dette en effektiv metode som har som mål å sørge for regelmessig og forutsigbar tømming som forebygger forstoppelse og lekkasjer. Utstyret er på blåresept og opplæring må gis av helsepersonell.",
            `Ut fra symptomer og behov kan det for noen være tilstrekkelig å bare skylle den nedre delen av rektum. I slike tilfeller kan en benytte en ballongsprøyte som er en "enklere" variant av irrigasjon eller skylling.`,
            `Prinsippet bak TAI er det samme, men utstyret finnes i ulike varienter fra ulike leverandører. Noen er på refusjon/blåresept, disse ser du her:`
          ],
          hasImages: true,
          images: [
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/Navina-Classic_bilde_wellspect.png", alt: "Navina Classic irrigasjonssystem", caption: "Navina Classic irrigasjonssystem (Wellspect)" },
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/Peristeen_bilde_coloplast.jpg", alt: "Peristeen irrigasjonssystem", caption: "Peristeen irrigasjonssystem (Coloplast)" },
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/KvinTo.jpg", alt: "Qufora Irrisedo Ballonsystem irrigasjonssystem", caption: "Qufora Irrisedo Ballonsystem irrigasjonssystem (KvinTo AS)" },
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2024/09/Bilde-Aquaflush-Komplett-A-og-L-1-scaled-e1726039190981-2048x1778.jpg", alt: "Aquaflush Irrigasjonssystemer", caption: "Aquaflush Irrigasjonssystemer (Global Health Technology)" }
          ]
        }
      ],
      medicationSections: [
        {
          title: "Medikamenter ved løs avføring/diaré:",
          items: [
            "Loperamid (Immodium) 2 mg 16 kapsler (reseptfri)",
            "Loperamid (Immodium) 2 mg i større pakninger (reseptbelagt)"
          ]
        },
        {
          title: "Graviditet og amming:",
          content: "Det er begrenset erfaring ved bruk av Loperamid under graviditet. Rådfør deg derfor med lege før bruk dersom du er gravid. Bruk ikke Loperamid hvis du ammer. Små mengder av legemidlet kan gå over i morsmelken."
        },
        {
          title: "Medikamenter ved forstoppelse",
          osmotic: {
            description: "Osmotiske legemidler trekker vann inn i tarmen og mykgjør avføringen:",
            items: [
              "Makragol (Movicol) finnes i pulver (reseptbelagt)",
              "Laktulose/ Duphalac mikstur (reseptfri)"
            ]
          },
          peristaltic: {
            description: "Peristaltikkfremmende legemidler øker tarmens naturlige bevegelse:",
            items: [
              "Bisacodyl preparat (for eksempel Dulcolax) (reseptbelagt)",
              "Natriumpikosulfat (for eksempel Laxoberal) (reseptbelagt)"
            ]
          },
          pregnancyNote: "Alle legemidlene nevnt over kan brukes under graviditet og amming."
        }],
      
    },
    {
      id: "surgical",
      sectionTitle: "Kirurgisk behandling",
      content: [
        "Dersom man ikke kommer til mål med konservativ behandling vurderes andre tiltak. Flere ulike kirurgiske tilnærminger kan være et alternativ."
      ],
      listItems: [
        "Utlagt tykktarm (colostomi) med eller uten tarmskylling via stomien (retrograd irrigasjon)",
        "Utlagt tykk- og blindtarm (appendikostomi) med henblikk på tarmskylling via blindtarmen (antegrad irrigasjon)",
        "Utlagt tynntarm (bøyleileostomi eller endeileostomi)",
        "Fjernelse av tykktarm og sammenføyning av tynntarm til endetarm (kolektomi og ileorektalanastomose)"
      ]
    },
    {
      id: "coping",
      sectionTitle: "Mestring",
      content: [
        "Ufullstendig tarmtømming og tømmingsproblemer kan påvirke både hverdagsliv og livskvalitet. Behandling av slike plager medfører ofte endring av vaner og rutiner. Slike endringer i hverdagen kan være utfordrende å komme i gang med samt det krever en egeninnsats for å greie å gjennomføre det. Imidlertid opplever de aller fleste at innsatsen de selv bidrar med gjør situasjonen lettere og målet må være å leve så normalt som mulig."
      ],
      subsections: [
        { id: "help_motivation", title: "Hjelp og motivasjon", content: "Ved å søke hjelp hos helsepersonell som jobber med tømmingsproblem vet vi at situasjonen blir lettere. Det å få forståelse og aksept for at dette er et problem kan i seg selv gi en bedre hverdag. Helsepersonell vil kunne gi nødvendig opplæring, støtte og motivasjon." },
        { id: "map_everyday", title: "Kartlegge og tilpasse hverdagen", content: "Ved å kartlegge problemene blir det lettere å fungere i hverdagen. Mange som sliter med tømmingsproblem opplever at de sitter på toalettet store deler av dagen, og føler seg aldri tømt/alltid oppblåst. Hjelp til en forutsigbar og regelmessig tarmtømming med anvendbare hjelpemidler vil kunne bedre situasjonen. Her vil helsepersonell kunne veilede og anbefale tiltak." },
        { id: "openness", title: "Åpenhet og støtte i familien", content: "Noen kan være bekymret for hva andre vil si, for eksempel partner, venner eller barna. Her må hver enkelt kjenne på hva en ønsker å dele. Ved å være åpen kan omgivelsene lettere ta hensyn og bidra til tilrettelegging i hverdagen." }
      ]
    }
  ],
  en: [
    {
      id: "conservative_intro",
      sectionTitle: "Conservative Treatment",
      isDirectText: true,
      directText: "Optimal stool consistency is often the first step in treating both leakage and emptying problems. Some optimization can be done by yourself, but if you do not reach the desired effect, help is available."
    },
    {
      id: "optimal_consistency",
      title: "Optimal Stool Consistency",
      content: [
        "Optimal stool consistency is often the first step in treating both leakage and emptying problems. Some optimization can be done by yourself, but if you do not reach the desired effect, help is available."
      ],
      subsections: [
      ]
    },
    {
      id: "regulation",
      title: "Stool Consistency Regulation",
      content: [
        "Optimizing stool consistency is often the first treatment step. Some measures can be tried at home; if they are insufficient, seek help."
      ],
      subsections: [
        {
          id: "diet",
          title: "Diet",
          content: [
            "Dietary advice is general. Few studies show which foods change consistency. Start from your own experience and try to find what helps or worsens symptoms."
          ],
          dietSections: [
            {
              title: "Foods that may worsen loose stools",
              items: [
                "Spicy and fatty foods, caffeine (coffee, cola, energy drinks), alcohol, artificial sweeteners (sorbitol, xylitol).",
                "Insoluble fiber may loosen stools and increase frequency. Examples: whole grains, all types of cabbage, corn, nuts, seeds, and dried fruit."
              ]
            },
            {
              title: "Foods that may help firm loose stools",
              content: "Soluble fibers absorb water and form a more cohesive stool. Examples: oats, barley, banana, apple, potato, carrot, sweet potato."
            },
            {
              title: "Diet in constipation",
              content: "Dietary changes rarely solve chronic constipation but may help in temporary episodes. Increase fiber and fluids. Prunes, bran, probiotics, and kiwi can soften stools."
            }
          ]
        },
        {
          id: "fiber_supplements",
          title: "Fiber Supplements",
          content: [
            "Psyllium/ispaghula husk (e.g., Vi‑Siblin, Lunelax) can regulate loose stools. Suggested dose ~7.1 g/day (follow product). With constipation, drink 1.5–2 L/day. Usually well‑tolerated; available OTC."
          ]
        }
      ]
    },
    {
      id: "medication",
      title: "Medication",
      content: [
        "Medications can help with both loose and hard stools. Some are OTC, others prescription. Follow the package leaflet. Persistent symptoms should be evaluated."
      ],
      medicationSections: [
        {
          title: "Medications for diarrhea:",
          items: [
            "Loperamide (Imodium) 2 mg 16 capsules (OTC)",
            "Loperamide (Imodium) 2 mg larger packs (prescription)"
          ]
        },
        {
          title: "Pregnancy and breastfeeding:",
          content: "Limited experience with loperamide in pregnancy—consult a doctor. Avoid during breastfeeding."
        },
        {
          title: "Medications for constipation",
          osmotic: {
            description: "Osmotic agents draw water into the bowel and soften stools:",
            items: [
              "Macrogol (Movicol) powder (prescription)",
              "Lactulose/Duphalac mixture (OTC)"
            ]
          },
          peristaltic: {
            description: "Prokinetic agents increase bowel movement:",
            items: [
              "Bisacodyl (e.g., Dulcolax) (prescription)",
              "Sodium picosulfate (e.g., Laxoberal) (prescription)"
            ]
          },
          pregnancyNote: "All medications listed can be used during pregnancy and breastfeeding."
        }
      ]
    },
    {
      id: "physical_activity",
      title: "Physical Activity",
      content: [
        "Supports peristalsis and is helpful especially with hard stools. Aim for at least 30 minutes of daily moderate activity."
      ]
    },
    {
      id: "toilet_habits",
      title: "Toilet Habits and Posture",
      content: [
        "Important for complete evacuation without straining."
      ],
      subsections: [
        {
          id: "toilet_posture",
          title: "Correct Toilet Posture",
          content: [
            "Use a footstool so knees are above hip level.",
            "Relax shoulders, lean forward, support elbows on knees.",
            "Relax, breathe, and let the abdomen soften.",
            "Avoid straining—focus on 'opening' instead.",
            "Give reflexes time to start the bowel movement.",
            "Use the natural gastrocolic reflex ~20 minutes after a meal."
          ],
          hasImages: true,
          images: [
            { src: "/trinn1_0-1.png", alt: "Step 1: Knees higher than hips", caption: "Step 1: Knees higher than hips" },
            { src: "/trinn2-1.png", alt: "Step 2: Lean forward and rest elbows on knees", caption: "Step 2: Lean forward and rest elbows on knees" },
            { src: "/trinn3-1.png", alt: "Step 3: Push out abdomen and straighten back", caption: "Step 3: Push out abdomen and straighten back" },
            { src: "/korrekt-toiledPosistion.png", alt: "Correct toilet posture", caption: "Correct toilet posture" }
          ]
        }
      ]
    },
    {
      id: "muscle_relaxation",
      title: "Muscle Relaxation",
      content: [
        "The anal sphincter and pelvic floor must relax. Practicing contract‑and‑release helps. Some need guidance from a physiotherapist."
      ]
    },
    {
      id: "assisted_emptying",
      title: "Assisted Emptying",
      subsections: [
        {
          id: "balloon_syringe",
          title: "Balloon Syringe",
          content: "Mini‑irrigation of the distal rectum to achieve complete emptying. Can be used before or after a bowel movement."
        },
        {
          id: "glycerin_suppository",
          title: "Glycerol Suppository",
          content: "Stimulates contractions and emptying of the distal bowel. Unregistered product—prescription only."
        },
        {
          id: "enema",
          title: "Enema",
          content: "For short episodes, try mini‑enema first. For more pronounced issues, use larger enemas. May be repeated as needed."
        },
        {
          id: "transanal_irrigation",
          title: "Transanal Irrigation",
          content: [
            "Water is introduced into the colon via a catheter in the rectum to stimulate peristalsis and achieve regular, predictable emptying. Training is provided by healthcare personnel. Equipment is on prescription.",
            "The principle behind TAI is the same, but equipment comes in different variants from various suppliers. Some are on reimbursement/prescription, shown here:"
          ],
          hasImages: true,
          images: [
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/Navina-Classic_bilde_wellspect.png", alt: "Navina Classic irrigation system", caption: "Navina Classic irrigation system (Wellspect)" },
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/Peristeen_bilde_coloplast.jpg", alt: "Peristeen irrigation system", caption: "Peristeen irrigation system (Coloplast)" },
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/KvinTo.jpg", alt: "Qufora Irrisedo Balloon system irrigation system", caption: "Qufora Irrisedo Balloon system (KvinTo AS)" },
            { src: "https://nekib.helsekompetanse.no/wp-content/uploads/2024/09/Bilde-Aquaflush-Komplett-A-og-L-1-scaled-e1726039190981-2048x1778.jpg", alt: "Aquaflush Irrigation Systems", caption: "Aquaflush Irrigation Systems (Global Health Technology)" }
          ]
        }
      ]
    }
  ]
} as const

export const Treatment = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Intro content (language-aware)
  const intro = language === 'no'
    ? {
        quote: '"Daglig tarmskylling med lunkent vann har gitt meg en bedre hverdag med forutsigbar tarmtømming."',
        author: 'Kvinne, 53 år',
        mainIntro: 'Videre på disse sidene er det informasjon om behandling med blant annet råd om enkle grep du selv kan utføre hjemme. Dersom man ikke kommer i mål med konservative tiltak, kan det være aktuelt med kirurgiske inngrep.',
        mainIntro2: ''
      }
    : {
        quote: '"Wow! I can feel the muscles in my pelvic floor! I haven\'t felt them for 20 years!"',
        author: 'Woman, 50 years old, after treatment with sacral nerve stimulation',
        mainIntro: 'After assessment, you and your doctor will decide which treatment is best for you. In most cases, conservative treatment will be started first. Conservative treatment has good effect for many people and carries little risk of side effects and complications. Conservative treatment requires active personal effort and the process can often extend over time.',
        mainIntro2: 'If the desired effect is not achieved with a conservative approach, surgical treatment may be relevant. This can involve various procedures. The type of procedure is assessed based on each individual case. Most people who need procedures to improve their symptoms also benefit from conservative treatment in addition. You can read more about the different treatment options on the following pages.'
      }

  // Helper function to render content based on item type
  const renderTreatmentItem = (item: {
    id: string;
    sectionTitle?: string;
    title?: string;
    content?: string | readonly string[];
    isDirectText?: boolean;
    directText?: string;
    subsections?: ReadonlyArray<{
      id: string;
      title: string;
      content?: string | readonly string[];
      hasImage?: boolean;
      image?: {
        src: string;
        alt: string;
        caption: string;
      };
      hasImages?: boolean;
      images?: ReadonlyArray<{
        src: string;
        alt: string;
        caption: string;
      }>;
      dietSections?: ReadonlyArray<{
        title: string;
        items?: readonly string[];
        content?: string;
      }>;
    }>;
    medicationSections?: ReadonlyArray<{
      title: string;
      items?: readonly string[];
      content?: string;
      osmotic?: {
        description: string;
        items: readonly string[];
      };
      peristaltic?: {
        description: string;
        items: readonly string[];
      };
      pregnancyNote?: string;
    }>;
    hasImage?: boolean;
    image?: {
      src: string;
      alt: string;
      caption: string;
    };
    hasImages?: boolean;
    images?: ReadonlyArray<{
      src: string;
      alt: string;
      caption: string;
    }>;
    listItems?: readonly string[];
  }) => {
    return (
      <SectionAccordion 
        key={item.id}
        title={item.sectionTitle || item.title || ''}
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
      >
        <div className={styles.normalFunctionContent}>
          {item.isDirectText ? (
            <p className={styles.enhancedParagraph}>{item.directText}</p>
          ) : item.content && Array.isArray(item.content) ? (
            item.content.map((contentText: string, contentIndex: number) => (
              <p key={contentIndex} className={styles.enhancedParagraph}>
                {contentText}
              </p>
            ))
          ) : item.content && (
            <p className={styles.enhancedParagraph}>{item.content}</p>
          )}

          {/* Render subsections */}
          {item.subsections && item.subsections.map((subsection: {
            id: string;
            title: string;
            content?: string | readonly string[];
            hasImage?: boolean;
            image?: {
              src: string;
              alt: string;
              caption: string;
            };
            hasImages?: boolean;
            images?: ReadonlyArray<{
              src: string;
              alt: string;
              caption: string;
            }>;
            dietSections?: ReadonlyArray<{
              title: string;
              items?: readonly string[];
              content?: string;
            }>;
          }) => (
            <div key={subsection.id}>
              {/* Special layout for Bristol scale section */}
              {subsection.id === 'ulike_ty' || subsection.id === 'bristol_scale' ? (
                <>
                  <h5 className={styles.enhancedSubheading}>{subsection.title}</h5>
                  <div className={styles.bristolScaleContainer}>
                    <div className={styles.bristolScaleContent}>
                      {subsection.content && Array.isArray(subsection.content) ? (
                        subsection.content.map((text: string, textIndex: number) => (
                          <p key={textIndex} className={styles.enhancedParagraph}>{text}</p>
                        ))
                      ) : subsection.content && (
                        <p className={styles.enhancedParagraph}>{subsection.content}</p>
                      )}
                    </div>
                    {subsection.hasImage && subsection.image && (
                      <div className={styles.bristolScaleImageWrapper}>
                        <div>
                          <img 
                            src={subsection.image.src} 
                            alt={subsection.image.alt} 
                            className={styles.bristolImage}
                          />
                          <p className={styles.anatomyImageCaption}>{subsection.image.caption}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h5 className={styles.enhancedSubheading}>{subsection.title}</h5>
                  
                  {subsection.content && Array.isArray(subsection.content) ? (
                    subsection.content.map((text: string, textIndex: number) => (
                      <p key={textIndex} className={styles.enhancedParagraph}>{text}</p>
                    ))
                  ) : subsection.content && (
                    <p className={styles.enhancedParagraph}>{subsection.content}</p>
                  )}

                  {/* Render diet sections */}
                  {subsection.dietSections && subsection.dietSections.map((dietSection: {
                    title: string;
                    items?: readonly string[];
                    content?: string;
                  }, dietIndex: number) => (
                    <div key={dietIndex}>
                      <h6 className={styles.enhancedSubheading}>{dietSection.title}</h6>
                      {dietSection.items ? (
                        <ul className={styles.diagnosisList}>
                          {dietSection.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      ) : dietSection.content && (
                        <p className={styles.enhancedParagraph}>{dietSection.content}</p>
                      )}
                    </div>
                  ))}

                  {/* Render single image if present */}
                  {subsection.hasImage && subsection.image && (
                    <div className={styles.anatomySection}>
                      <div className={styles.anatomyGrid}>
                        <div className={styles.anatomyItem}>
                          <img 
                            src={subsection.image.src} 
                            alt={subsection.image.alt} 
                            className={styles.anatomyImage}
                          />
                          <p className={styles.anatomyCaption}>{subsection.image.caption}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Render multiple images if present */}
              {'hasImages' in subsection && subsection.hasImages && 'images' in subsection && subsection.images && (
                <div className={styles.anatomySection}>
                  <div className={styles.anatomyGrid}>
                    {subsection.images.map((img: { src: string; alt: string; caption: string }, imgIndex: number) => (
                      <div key={imgIndex} className={styles.anatomyItem}>
                        <img 
                          src={img.src} 
                          alt={img.alt} 
                          className={styles.anatomyImage}
                        />
                        <p className={styles.anatomyCaption}>{img.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Render medication sections */}
          {item.medicationSections && item.medicationSections.map((medSection: {
            title: string;
            items?: readonly string[];
            content?: string;
            osmotic?: {
              description: string;
              items: readonly string[];
            };
            peristaltic?: {
              description: string;
              items: readonly string[];
            };
            pregnancyNote?: string;
          }, medIndex: number) => (
            <div key={medIndex}>
              <h5 className={styles.enhancedSubheading}>{medSection.title}</h5>
              
              {medSection.items && (
                <ul className={styles.diagnosisList}>
                  {medSection.items.map((medItem: string, itemIndex: number) => (
                    <li key={itemIndex}>{medItem}</li>
                  ))}
                </ul>
              )}
              
              {medSection.content && (
                <p className={styles.enhancedParagraph}>{medSection.content}</p>
              )}

              {medSection.osmotic && (
                <div>
                  <p className={styles.enhancedParagraph}>
                    <span className={styles.medicalTerm}>Osmotic agents</span> {medSection.osmotic.description}
                  </p>
                  <ul className={styles.diagnosisList}>
                    {medSection.osmotic.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {medSection.peristaltic && (
                <div>
                  <p className={styles.enhancedParagraph}>
                    <span className={styles.medicalTerm}>Prokinetic agents</span> {medSection.peristaltic.description}
                  </p>
                  <ul className={styles.diagnosisList}>
                    {medSection.peristaltic.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {medSection.pregnancyNote && (
                <p className={styles.enhancedParagraph}>{medSection.pregnancyNote}</p>
              )}
            </div>
          ))}

          {/* Render image if present at item level */}
          {item.hasImage && item.image && (
            <div className={styles.anatomySection}>
              <div className={styles.anatomyGrid}>
                <div className={styles.anatomyItem}>
                  <img 
                    src={item.image.src} 
                    alt={item.image.alt} 
                    className={styles.anatomyImage}
                  />
                  <p className={styles.anatomyCaption}>{item.image.caption}</p>
                </div>
              </div>
            </div>
          )}

          {/* Render multiple images if present (for toilet posture steps) */}
          {item.hasImages && item.images && (
            <div className={styles.anatomySection}>
              <div className={styles.anatomyGrid}>
                {item.images.map((img: { src: string; alt: string; caption: string }, imgIndex: number) => (
                  <div key={imgIndex} className={styles.anatomyItem}>
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className={styles.anatomyImage}
                    />
                    <p className={styles.anatomyCaption}>{img.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render list items */}
          {item.listItems && (
            <ul className={styles.diagnosisList}>
              {item.listItems.map((listItem: string, listIndex: number) => (
                <li key={listIndex}>{listItem}</li>
              ))}
            </ul>
          )}
        </div>
      </SectionAccordion>
    )
  }

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img src="/treat.png" alt="Treatment" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>{language === 'no' ? 'Behandling' : 'Treatment'}</h2>
        </div>

        <div className={styles.sectionContent}>
        {/* Intro: Quote + main intro inside white card */}
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <div className={styles.quoteSection}>
              <blockquote className={styles.quoteText}>{intro.quote}</blockquote>
              <cite className={styles.quoteAuthor}>{intro.author}</cite>
            </div>
            <p className={styles.enhancedParagraph}>{intro.mainIntro}</p>
            {intro.mainIntro2 && (
              <p className={styles.enhancedParagraph}>{intro.mainIntro2}</p>
            )}
          </div>
        </div>

          {treatmentData[language].map((item) => renderTreatmentItem(item))}
        </div>
      </div>
    </>
  )
}