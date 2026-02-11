"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific data arrays
const treatmentData = {
  no: {
    pageTitle: "Behandling",
    intro: "",
    initialQuote: {
      text: "Jeg har forsøkt mange forskjellige behandlinger både medisiner, operasjoner og fysioterapi uten at det har gitt meg noen varig effekt.",
      author: "Kvinne, 53 år"
    },
    sections: [
      {
        id: "holistic",
        title: "Helhetlig tilnærming",
        hasImage: true,
        image: {
          src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX9507012_resize.jpg",
          alt: "Bilde av flere kvinner som ligger på treningsmatter og slapper av med øynene igjen og hendene på magen",
          caption: ""
        },
        content: "Smerter påvirker hele kroppen, inkludert våre tanker og følelser. Depresjon, uro, engstelse og søvnproblemer er vanlige ved langvarig smerte og kan forsterke smerteopplevelsen.\n\nVed langvarige smerter skjer det endringer i nervesystemet, både i hjernen og i det smertefulle området.\n\nDisse forandringene i nervesystemet kan normaliseres gjennom ulike tilnærminger. Å lære å påvirke tanker og væremåte vil kunne dempe blant annet bekymring og stress. Stress virker ofte forsterkende på smertene og kan reduseres ved en rekke ulike teknikker. Mange finner hjelp til å bli bevisst egne mekanismer, komme bedre i kontakt med seg selv og egen kropp og dens reaksjonsmåter gjennom blant annet fysioterapi, mindfulness, yoga, meditasjon og samtaleterapi.",
        hasRelaxationIcons: true,
        relaxationIcons: [
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/avs1.png",
            alt: "Illustrasjon av en kvinne som ligger på rygg og slapper av",
            audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/172964751%3Fsecret_token%3Ds-qemHe&color=6aaad6&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false"
          },
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/avs2.png",
            alt: "Illustrasjon av en person som sitter i lotusstilling",
            audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/172962141%3Fsecret_token%3Ds-sHuQd&color=6aaad6&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false"
          },
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/avs3.png",
            alt: "Illustrasjon av en person som sover i en seng",
            audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/172964808%3Fsecret_token%3Ds-yQXdb&color=6aaad6&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false"
          }
        ]
      },
      {
        id: "physiotherapy",
        title: "Fysioterapi",
        content: "Å leve med langvarige smerter påvirker alle deler av livet. Ofte har pasienter med smerter i kroppen muskelspenninger og bundet pust (anspent pust). Mange er ikke er klar over sine muskelspenninger og at disse kan være en medvirkende årsak til smertene. Å behandle muskel- og skjelettsystemet er derfor en viktig del av behandlingen av langvarige underlivssmerter. Lege kan skrive ut rekvisisjon til fysioterapi.\n\nUndersøkelsen kan være konsentrert rundt bekkenområdet, men vil som regel ta for seg flere deler av kroppen. Ut fra ulike funn i undersøkelsen vil du tilbys forskjellig type behandling. Det kan være aktuelt å starte opp individuell behandling hos fysioterapeut eller du kan henvises videre til gruppebehandling der det er tilgjengelig. Her vil komme oppdatert oversikt over fysioterapeuter med kompetanse på behandling av langvarige underlivssmerter",
        hasSubsection: true,
        subsectionTitle: "Mål og tiltak ved fysioterapi",
        subsectionContent: "Fysioterapeuten gir det som kalles konservativ behandling som har som mål:",
        goals: [
          "Å øke kroppskontakt",
          "Regulere spenninger",
          "Bedre funksjon"
        ],
        methodsIntro: "Tiltak kan bestå av:",
        methods: [
          "Øvelsesbehandling",
          "Massasje",
          "Avspenningsteknikker",
          "Knipeøvelser",
          "Elektrostimulering og biofeedback"
        ],
        hasSpecialistCenters: true,
        specialistTitle: "Behandlingstilbud i spesialisthelsetjenesten i Norge rettet mot langvarige underlivssmerter",
        centers: [
          "Behandlingstilbud ved Vulvaklinikken på St.Olavs",
          "Behandlingstilbud ved Vulvaklinikken ved Oslo Universitetssykehus",
          "Ved Universitetssykehuset Nord-Norge finnes et tilbud med gruppebehandling for pasienter med underlivssmerter med somatokognitiv terapi (PUST)"
        ],
        pustLinks: [
          {
            text: "PUST for kvinner",
            url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/PUST%20FOR%20KVINNER%20Brosjyre.pdf"
          },
          {
            text: "PUST for menn",
            url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/PUST%20FOR%20MENN%20Brosjyre.pdf"
          }
        ],
        centerNote: "Ved de fleste helseforetak er det smerteklinikker som behandler langvarige smertetilstander."
      },
      {
        id: "medications",
        title: "Medikamenter",
        hasQuote: true,
        quote: {
          text: "Smertestillende medisiner ga effekt i starten, men virker ikke like godt nå lenger.",
          author: "Mann, 58 år"
        },
        content: "Smertestillende medikamenter er en midlertidig løsning for symptomlette. Antiepilektikum, antidepressiva eller lokal anestesi, som botox/marcain, kan brukes for å bryte smertesignaler i et smertesensitivt område. Alle medikamenter kan ha bivirkninger. Dette gjelder spesielt opiater som kan være vanedannende. Legen din vil hjelpe deg å kombinere medikamenter og veilede deg i bruk som virker mest hensiktsmessig."
      },
      {
        id: "surgery",
        title: "Operasjon",
        content: "I enkelte tilfeller vil operasjon være aktuelt for utredning og/eller behandling av smertefulle tilstander. Dersom det ved utredning påvises organisk sykdom som kan bedres med operasjon, kan dette være aktuelt. Det kan imidlertid være vanskelig å finne en klar årsak til smertene. Både klinisk erfaring og forskning viser at operasjon ved langvarige underlivssmerter ikke nødvendigvis gir smertelindring. Det er anbefalt å forsøke konservativ (ikke kirurgisk) behandling først. All operasjon kan potensielt gi ikke-vendbare problemer som arrvev og mulige utvidede smerter."
      },
      {
        id: "expectations",
        title: "Forventninger til behandling",
        hasQuote: true,
        quote: {
          text: "Botox hjalp meg ved å gi meg en pause fra smertene. Når jeg også fikk jobbet med å lære meg å gi slipp på spenninger i underlivet ble smertene borte mer permanent.",
          author: "Kvinne, 38 år"
        },
        content: "Behandling av langvarige underlivssmerter er en langsom prosess som kan innebære flere former for behandling. Det kan også være at smertene ikke blir helt borte. Vellykket behandling kan bety en såpass stor reduksjon av dine smerter at du kan finne tilbake til en god og verdifull hverdag."
      },
      {
        id: "coping",
        title: "Mestring",
        hasMultipleQuotes: true,
        quotes: [
          {
            text: "Det å lære hva jeg skal gjøre for å unngå å spenne meg så fryktelig har vært redningen min.",
            author: "Mann, 41 år"
          },
          {
            text: "God helse har den som har evne og kapasitet til å mestre og tilpasse seg livets uunngåelige vanskeligheter og hverdagens krav.",
            author: "Professor Peter f. Hjort"
          }
        ],
        content: "Mestring er et mangetydig begrep. Innen psykologien brukes «mestring» om en persons evne til å håndtere livshendelser, situasjoner og påkjenninger som overstiger det som kan klares på ren rutine. Mestring kan i stor grad læres gjennom teori, og ikke minst gjennom erfaring (øvelse).",
        hasImage: true,
        image: {
          src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX2283342_resize.jpg",
          alt: "Person som mestrer utfordringer",
          caption: ""
        },
        additionalContent: "En rekke definisjoner av mestring innen helse peker på at mestring handler om at den enkelte person endrer forestillinger, følelser og atferd på en måte som gjenoppretter mening og sammenheng i livet, som bidrar til å bearbeide følelsesmessige reaksjoner, problemløsning og forbedret livssituasjon.",
        externalLink: {
          text: "Les mer om mestring på Nasjonal kompetansetjeneste for læring og mestring innen helse",
          url: "https://mestring.no/hva-er-laering-og-mestring/sentrale-begreper/mestring/"
        },
        hasPatientStories: true,
        patientStoriesTitle: "Pasienthistorier om tilfriskning",
        patientStories: [
          {
            text: "I perioder kan jeg få veldig vondt under avføring og kjenner at jeg spenner meg i bekkenbunnen. I de periodene har jeg hatt smerter i skjeden også. Det er som om alt henger sammen i underlivet. Jeg har begynt å kjenne når jeg er anspent og kan riste litt løs. Nå vet jeg at når man anspenner seg så stenger man for pusten. I stedet kan man bruke litt rom og slippe seg ut litt.",
            author: "Kvinne, 32 år"
          },
          {
            text: "Jeg har lært meg å kjenne på smertene mine. Jeg har åpnet et lokk hos meg selv som jeg aldri har tillatt meg å åpne før. Før så har smertene bare vært der, men nå setter jeg litt ord på dem framfor å bare gjemme dem bort. Jeg tillater meg selv å ha det litt tøft innimellom. Det ligger der når det er travelt og hektisk, at nå må jeg huske å slappe av, puste litt og tøye litt. For før har jeg bare kjørt på hele veien. Selv om jeg så vidt har klart å gå ut av senga så har jeg løpt maraton etterpå, for å sette det på spissen.",
            author: "Mann, 50 år"
          },
          {
            text: "Jeg tror jeg har blitt tøffere i det siste. Jeg tørr å si fra og har fått det bedre med meg selv. Men det har ikke vært så lett å få til å slappe av bare med å tenke det. Det har nok vært hele sammenhengen. Jeg fikk en jobb som jeg trivdes i, ble kjent med folk og fikk anerkjennelse. Da tror jeg kroppen begynte å slappe litt mer av automatisk. Jeg har gått og bekymra meg unødig.",
            author: "Mann, 31 år"
          },
          {
            text: "I det siste har jeg begynt å ta den plassen jeg trenger. I stedet for å sitte å anspenne meg en hel busstur for å gi plass til andre, så senker jeg skuldrene og puster. Hvorfor skal jeg sitte så fryktelig fint i bussen bare fordi jeg er dame. Jeg kan vel få lov å slippe meg litt løs, lene meg bakover og til og med slippe beina litt fra hverandre.",
            author: "Kvinne, 38 år"
          },
          {
            text: "Smerter ved samleie har jeg hatt i mange år. Jeg har trodd at det skulle være sånn og har akseptert mye smerter. Derfor begynte jeg hos psykolog, for å bli ferdig med de ubearbeidede tingene. Nå har jeg truffet en ny mann. Jeg er ikke så redd for ting i underlivet lengre og har masse glede av samliv. Å ha forstoppelse har også vært vanskelig i forhold til samliv. To ganger har jeg operert bort hemorroider. Jeg har følt meg skitten, og har vært redd for at det skulle være lukt. Nå kjenner jeg en helt annen ro, jeg tenker ikke på det. Jeg bruker ballongsprøyte med vann og olje og er ikke så bekymret for å bli forstoppet lenger. Jo flere ulike måter jeg kan mestre det på jo mere slapper jeg av. Det er ikke noe vits i å gå å snurpe igjen lenger, for å si det sånn.",
            author: "Kvinne, 46 år"
          }
        ],
        closingText: "Pasientberetningene over viser til hvordan disse pasientene har klart å skape endringer i sin tilværelse på ulike måter, og på ulike felt, og at dette har gitt en tilfriskning."
      }
    ]
  },
  en: {
    pageTitle: "Treatment",
    intro: "",
    initialQuote: {
      text: "I have tried many different treatments including medications, surgery and physiotherapy without any lasting effect.",
      author: "Woman, 53 years"
    },
    sections: [
      {
        id: "holistic",
        title: "Holistic Approach",
        hasImage: true,
        image: {
          src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX9507012_resize.jpg",
          alt: "Image of several women lying on exercise mats relaxing with their eyes closed and hands on their stomach",
          caption: ""
        },
        content: "Pain affects the whole body, including our thoughts and feelings. Depression, anxiety, worry and sleep problems are common with chronic pain and can intensify the pain experience.\n\nWith chronic pain, changes occur in the nervous system, both in the brain and in the painful area.\n\nThese changes in the nervous system can be normalized through various approaches. Learning to influence thoughts and behavior can help reduce worry and stress. Stress often intensifies pain and can be reduced through a variety of techniques. Many find help in becoming aware of their own mechanisms, getting better in touch with themselves and their body's reactions through physiotherapy, mindfulness, yoga, meditation and talk therapy.",
        hasRelaxationIcons: true,
        relaxationIcons: [
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/avs1.png",
            alt: "Illustration of a woman lying on her back relaxing",
            audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/172964751%3Fsecret_token%3Ds-qemHe&color=6aaad6&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false"
          },
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/avs2.png",
            alt: "Illustration of a person sitting in lotus position",
            audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/172962141%3Fsecret_token%3Ds-sHuQd&color=6aaad6&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false"
          },
          {
            src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/avs3.png",
            alt: "Illustration of a person sleeping in a bed",
            audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/172964808%3Fsecret_token%3Ds-yQXdb&color=6aaad6&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false"
          }
        ]
      },
      {
        id: "physiotherapy",
        title: "Physiotherapy",
        content: "Living with chronic pain affects all parts of life. Often patients with body pain have muscle tension and restricted breathing (tense breathing). Many are not aware of their muscle tension and that it can be a contributing cause of pain. Treating the musculoskeletal system is therefore an important part of treating chronic pelvic pain. A doctor can write a referral for physiotherapy.\n\nThe examination can be concentrated around the pelvic area, but will usually cover several parts of the body. Based on various findings in the examination, you will be offered different types of treatment. It may be relevant to start individual treatment with a physiotherapist or you may be referred to group treatment where available. An updated overview of physiotherapists with expertise in treating chronic pelvic pain will be available here",
        hasSubsection: true,
        subsectionTitle: "Goals and Measures in Physiotherapy",
        subsectionContent: "The physiotherapist provides what is called conservative treatment which aims to:",
        goals: [
          "Increase body awareness",
          "Regulate tension",
          "Improve function"
        ],
        methodsIntro: "Measures may consist of:",
        methods: [
          "Exercise treatment",
          "Massage",
          "Relaxation techniques",
          "Kegel exercises",
          "Electrical stimulation and biofeedback"
        ],
        hasSpecialistCenters: true,
        specialistTitle: "Treatment Options in Specialist Health Services in Norway for Chronic Pelvic Pain",
        centers: [
          "Treatment options at the Vulva Clinic at St.Olavs",
          "Treatment options at the Vulva Clinic at Oslo University Hospital",
          "At University Hospital of North Norway there is a group treatment program for patients with pelvic pain using somatocognitive therapy (PUST)"
        ],
        pustLinks: [
          {
            text: "PUST for women",
            url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/PUST%20FOR%20KVINNER%20Brosjyre.pdf"
          },
          {
            text: "PUST for men",
            url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/PUST%20FOR%20MENN%20Brosjyre.pdf"
          }
        ],
        centerNote: "Most health trusts have pain clinics that treat chronic pain conditions."
      },
      {
        id: "medications",
        title: "Medications",
        hasQuote: true,
        quote: {
          text: "Pain medications were effective at first, but don't work as well anymore.",
          author: "Man, 58 years"
        },
        content: "Pain medications are a temporary solution for symptom relief. Antiepileptic drugs, antidepressants or local anesthesia, such as botox/marcain, can be used to interrupt pain signals in a pain-sensitive area. All medications can have side effects. This especially applies to opiates which can be addictive. Your doctor will help you combine medications and guide you in use that works most appropriately."
      },
      {
        id: "surgery",
        title: "Surgery",
        content: "In some cases, surgery will be relevant for investigation and/or treatment of painful conditions. If organic disease that can be improved with surgery is detected during investigation, this may be relevant. However, it can be difficult to find a clear cause of the pain. Both clinical experience and research show that surgery for chronic pelvic pain does not necessarily provide pain relief. It is recommended to try conservative (non-surgical) treatment first. All surgery can potentially cause irreversible problems such as scar tissue and possible extended pain."
      },
      {
        id: "expectations",
        title: "Treatment Expectations",
        hasQuote: true,
        quote: {
          text: "Botox helped me by giving me a break from the pain. When I also worked on learning to release tension in the pelvic area, the pain went away more permanently.",
          author: "Woman, 38 years"
        },
        content: "Treatment of chronic pelvic pain is a slow process that can involve several forms of treatment. It may also be that the pain does not completely go away. Successful treatment can mean such a large reduction in your pain that you can find your way back to a good and valuable everyday life."
      },
      {
        id: "coping",
        title: "Coping and Self-Management",
        hasMultipleQuotes: true,
        quotes: [
          {
            text: "Learning what I need to do to avoid tensing up so terribly has been my salvation.",
            author: "Man, 41 years"
          },
          {
            text: "Good health belongs to those who have the ability and capacity to cope with and adapt to life's inevitable difficulties and everyday demands.",
            author: "Professor Peter f. Hjort"
          }
        ],
        content: "Coping is a multifaceted concept. In psychology, 'coping' refers to a person's ability to handle life events, situations and stresses that exceed what can be managed through pure routine. Coping can largely be learned through theory, and not least through experience (practice).",
        hasImage: true,
        image: {
          src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX2283342_resize.jpg",
          alt: "Person coping with challenges",
          caption: ""
        },
        additionalContent: "Numerous definitions of coping in health point to the fact that coping involves the individual changing perceptions, feelings and behavior in a way that restores meaning and coherence in life, which helps process emotional reactions, problem-solving and improved life situation.",
        externalLink: {
          text: "Read more about coping at the National Competence Service for Learning and Coping in Health",
          url: "https://mestring.no/hva-er-laering-og-mestring/sentrale-begreper/mestring/"
        },
        hasPatientStories: true,
        patientStoriesTitle: "Patient Stories of Recovery",
        patientStories: [
          {
            text: "At times I can get very painful during bowel movements and feel that I tense up in my pelvic floor. During those periods I have also had pain in my vagina. It's as if everything is connected in the pelvic area. I have started to recognize when I am tense and can shake loose a bit. Now I know that when you tense up, you hold your breath. Instead, you can use a little space and let yourself relax a bit.",
            author: "Woman, 32 years"
          },
          {
            text: "I have learned to acknowledge my pain. I have opened a lid in myself that I have never allowed myself to open before. Before, the pain was just there, but now I put words to it instead of just hiding it away. I allow myself to have it a bit tough sometimes. It's there when things are busy and hectic, that now I must remember to relax, breathe a little and stretch a little. Because before I just kept going all the way. Even if I could barely get out of bed, I ran a marathon afterwards, to put it bluntly.",
            author: "Man, 50 years"
          },
          {
            text: "I think I have become tougher lately. I dare to speak up and have gotten better with myself. But it hasn't been so easy to relax just by thinking about it. It has probably been the whole context. I got a job that I enjoyed, met people and got recognition. Then I think the body started to relax a bit more automatically. I have been worrying unnecessarily.",
            author: "Man, 31 years"
          },
          {
            text: "Lately I have started to take the space I need. Instead of sitting and tensing up an entire bus ride to make room for others, I lower my shoulders and breathe. Why should I sit so terribly proper on the bus just because I am a woman. I can surely be allowed to loosen up a bit, lean back and even let my legs spread apart a little.",
            author: "Woman, 38 years"
          },
          {
            text: "I have had pain during intercourse for many years. I thought it should be like that and have accepted a lot of pain. That's why I started seeing a psychologist, to get through the unprocessed things. Now I have met a new man. I am not so afraid of things in the pelvic area anymore and have lots of joy from intimacy. Having constipation has also been difficult in relation to intimacy. Twice I have had hemorrhoids surgically removed. I felt dirty, and was afraid there would be a smell. Now I feel a completely different peace, I don't think about it. I use a balloon syringe with water and oil and am not so worried about getting constipated anymore. The more different ways I can cope with it, the more I relax. There's no point in going around all tense anymore, so to speak.",
            author: "Woman, 46 years"
          }
        ],
        closingText: "The patient stories above show how these patients have managed to create changes in their lives in different ways, and in different areas, and that this has brought about recovery."
      }
    ]
  }
} as const

export const Treatment = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Page-specific introduction content for treatment (currently unused)
  /*
  const introductionContent = {
    title: "Behandling av langvarige underlivssmerter",
    subtitle: "Helhetlig tilnærming til smertelindring og bedre livskvalitet",
    description: "Behandling av langvarige underlivssmerter krever en helhetlig tilnærming som kombinerer ulike behandlingsmetoder. Det finnes ingen universell løsning, men mange pasienter opplever betydelig forbedring gjennom en kombinasjon av fysioterapi, medikamenter, og psykologisk støtte.\n\nViktige behandlingsprinsipper inkluderer å adressere både fysiske og psykiske faktorer, lære smertemanagement-teknikker, og bygge opp en støttende behandlingsallianse med helsepersonell.",
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/montasje_smerter_hd-1024x273.jpg",
      alt: "Behandling av langvarige underlivssmerter",
      caption: "Helhetlig behandling kan gi betydelig smertelindring"
    }
  }
  */

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/treat.png"
            alt="Treatment"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{treatmentData[language].pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        {/* Initial Quote */}
        {'initialQuote' in treatmentData[language] && (
          <div className={styles.normalFunctionSection}>
            <div className={styles.highlightBox}>
              <p className={styles.enhancedParagraph}>
                "<em>{treatmentData[language].initialQuote.text}</em>"
              </p>
              <p className={styles.enhancedParagraph}>
                <em>{treatmentData[language].initialQuote.author}</em>
              </p>
            </div>
          </div>
        )}

        {treatmentData[language].sections.map((section) => (
          <SectionAccordion 
            key={section.id}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {'hasQuote' in section && section.hasQuote && (
                <div className={styles.highlightBox}>
                  <p className={styles.enhancedParagraph}>
                    "<em>{section.quote?.text || ''}</em>"
                  </p>
                  <p className={styles.enhancedParagraph}>
                    <em>{section.quote?.author || ''}</em>
                  </p>
                </div>
              )}

              {'hasMultipleQuotes' in section && section.hasMultipleQuotes && 'quotes' in section && (
                <>
                  {(section as any).quotes.map((quote: any, quoteIndex: number) => (
                    <div key={quoteIndex} className={styles.highlightBox} style={{ marginBottom: '20px' }}>
                      <p className={styles.enhancedParagraph}>
                        "<em>{quote.text}</em>"
                      </p>
                      <p className={styles.enhancedParagraph}>
                        <em>{quote.author}</em>
                      </p>
                    </div>
                  ))}
                </>
              )}

              {(() => {
                // Handle side-by-side layout for mestring section with text and image
                if ('hasImage' in section && section.hasImage && 'additionalContent' in section && section.content) {
                  const img = (section as any).image;
                  if (img) {
                    return (
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        gap: '30px',
                        alignItems: 'flex-start',
                        margin: '20px 0',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{ 
                          flex: '1 1 300px',
                          minWidth: '300px'
                        }}>
                          {section.content.split('\n\n').map((paragraph: string, idx: number) => (
                            <p key={idx} className={styles.enhancedParagraph}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div style={{ 
                          flex: '0 0 350px',
                          minWidth: '280px',
                          maxWidth: '350px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-start'
                        }}>
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{ 
                              width: '100%',
                              height: '280px',
                              objectFit: 'cover',
                              objectPosition: 'center',
                              borderRadius: '8px',
                              boxShadow: resolvedTheme === 'dark' 
                                ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                                : '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                }
                
                // Handle standalone images (no additionalContent) - center them
                if ('hasImage' in section && section.hasImage && !('additionalContent' in section) && section.content) {
                  const img = (section as any).image;
                  if (img) {
                    return (
                      <>
                        {section.content.split('\n\n').map((paragraph: string, idx: number) => (
                          <p key={idx} className={styles.enhancedParagraph}>
                            {paragraph}
                          </p>
                        ))}
                        <div style={{ 
                          display: 'flex',
                          justifyContent: 'center',
                          margin: '30px 0',
                          width: '100%'
                        }}>
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{ 
                              maxWidth: '500px',
                              width: '100%',
                              height: 'auto',
                              borderRadius: '8px',
                              boxShadow: resolvedTheme === 'dark' 
                                ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                                : '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </div>
                      </>
                    );
                  }
                }
                return null;
              })()}

              {/* Display content normally for sections without images */}
              {section.content && !('hasImage' in section && section.hasImage) && (
                <>
                  {section.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className={styles.enhancedParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </>
              )}

              {'additionalContent' in section && (
                <p className={styles.enhancedParagraph}>
                  {(section as any).additionalContent}
                </p>
              )}

              {'externalLink' in section && (section as any).externalLink && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '15px' }}>
                  <a 
                    href={(section as any).externalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                      textDecoration: 'none',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {(section as any).externalLink.text} →
                  </a>
                </p>
              )}

              {(() => {
                // Handle relaxation icons with audio
                if ('hasRelaxationIcons' in section && 'relaxationIcons' in section) {
                  const icons = (section as any).relaxationIcons;
                  if (icons && Array.isArray(icons)) {
                    return (
                      <div style={{ 
                        margin: '30px 0',
                        padding: '20px',
                        background: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                        borderRadius: '12px',
                        border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                      }}>
                        <h4 className={styles.subsectionHeading} style={{
                          textAlign: 'center',
                          marginBottom: '25px',
                          color: resolvedTheme === 'dark' ? '#fff' : '#333',
                        }}>
                          {language === 'no' ? 'Avspenningsteknikker med lydguide' : 'Relaxation Techniques with Audio Guide'}
                        </h4>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                          gap: '25px',
                          justifyItems: 'center',
                          maxWidth: '1200px',
                          margin: '0 auto'
                        }}>
                          {icons.map((icon: any, iconIndex: number) => (
                            <div key={iconIndex} style={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'center',
                              width: '100%',
                              maxWidth: '320px',
                              padding: '20px',
                              background: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                              borderRadius: '12px',
                              boxShadow: resolvedTheme === 'dark' 
                                ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                                : '0 4px 12px rgba(0, 0, 0, 0.08)',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
                            }}>
                              <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                padding: '15px',
                                background: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                                borderRadius: '8px',
                              }}>
                                <img
                                  src={icon.src}
                                  alt={icon.alt}
                                  style={{ 
                                    maxWidth: '120px', 
                                    height: 'auto',
                                    display: 'block',
                                    filter: resolvedTheme === 'dark' ? 'brightness(0.9)' : 'none',
                                  }}
                                />
                              </div>
                              {icon.audioUrl && (
                                <div style={{ 
                                  width: '100%',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  boxShadow: resolvedTheme === 'dark'
                                    ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                }}>
                                  <iframe
                                    src={icon.audioUrl}
                                    width="100%"
                                    height="166"
                                    frameBorder="0"
                                    scrolling="no"
                                    allow="autoplay"
                                    title={`Audio for ${icon.alt}`}
                                    style={{ 
                                      border: 'none',
                                      display: 'block',
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                }
                return null;
              })()}

              {'hasSubsection' in section && section.hasSubsection && (
                <>
                  <h4 className={styles.normalFunctionTitle}>
                    {section.subsectionTitle}
                  </h4>
                  {section.subsectionContent && (
                    <p className={styles.enhancedParagraph}>{section.subsectionContent}</p>
                  )}
                </>
              )}
              
              {'goals' in section && section.goals && (
                <ul className={styles.resourceList}>
                  {section.goals.map((goal: string, goalIndex: number) => (
                    <li key={goalIndex} className={styles.resourceListItem}>{goal}</li>
                  ))}
                </ul>
              )}
              
              {'methodsIntro' in section && section.methodsIntro && (
                <p className={styles.enhancedParagraph}>{section.methodsIntro}</p>
              )}
              
              {'methods' in section && section.methods && (
                <ul className={styles.resourceList}>
                  {section.methods.map((method: string, methodIndex: number) => (
                    <li key={methodIndex} className={styles.resourceListItem}>{method}</li>
                  ))}
                </ul>
              )}

              {'hasSpecialistCenters' in section && section.hasSpecialistCenters && (
                <>
                  <h4 className={styles.normalFunctionTitle}>
                    {section.specialistTitle}
                  </h4>
                  <ul className={styles.resourceList}>
                    {section.centers && section.centers.map((center: string, centerIndex: number) => (
                      <li key={centerIndex} className={styles.resourceListItem}>
                        {center}
                        {'pustLinks' in section && section.pustLinks && centerIndex === 2 && (
                          <ul style={{ 
                            marginTop: '10px', 
                            marginLeft: '20px',
                            listStyle: 'circle'
                          }}>
                            {(section as any).pustLinks.map((link: any, linkIndex: number) => (
                              <li key={linkIndex} style={{ marginBottom: '5px' }}>
                                <a 
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                                    textDecoration: 'none',
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                  {link.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  {section.centerNote && (
                    <p className={styles.enhancedParagraph}>{section.centerNote}</p>
                  )}
                </>
              )}

              {'hasPatientStories' in section && section.hasPatientStories && 'patientStories' in section && (
                <>
                  <h4 className={styles.normalFunctionTitle} style={{ marginTop: '30px' }}>
                    {(section as any).patientStoriesTitle}
                  </h4>
                  {(section as any).patientStories.map((story: any, storyIndex: number) => (
                    <div key={storyIndex} className={styles.highlightBox} style={{ 
                      marginBottom: '20px',
                      background: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                      borderLeft: `4px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc'}`
                    }}>
                      <p className={styles.enhancedParagraph}>
                        "<em>{story.text}</em>"
                      </p>
                      <p className={styles.enhancedParagraph}>
                        <em>{story.author}</em>
                      </p>
                    </div>
                  ))}
                  {'closingText' in section && (
                    <p className={styles.enhancedParagraph} style={{ 
                      marginTop: '20px',
                      fontStyle: 'italic'
                    }}>
                      {(section as any).closingText}
                    </p>
                  )}
                </>
              )}
            </div>
          </SectionAccordion>
        ))}
      </div>
    </div>
    </>
  )
}