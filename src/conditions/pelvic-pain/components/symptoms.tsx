"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"
import { PelvicPainIntroduction } from './shared-introduction'

// Language-specific data arrays
const symptomsData = {
  no: {
    pageTitle: "Symptomer",
    sections: [
    {
      id: "patient_quote_1",
      content: "Jeg gruer meg til å gå på do fordi det alltid gjør vondt. Det kjennes som om noe revner.",
      author: "Kvinne, 32 år",
      isHighlight: true
    },
    {
      id: "intro",
      content: [
        "Langvarige underlivssmerter beskrives som smerter fra nedre del av mage, bekken, underliv og organer i underliv som har vedvart mer enn 6 mnd. Smertene er ofte kraftigere enn man skulle tenke seg ut fra sykehistorie og kan påvirke flere daglige aktiviteter da smertene er lokalisert i et sentralt område av kroppen."
      ]
    },
    {
      id: "common_symptoms",
      title: "Vanlige symptomer ved tilstanden kan være:",
      listItems: [
        { text: "Problemer og smerter ved tømming av tarm og blære", links: [
          { text: "urin", url: "/conditions/urinary-retention" },
          { text: "avføring", url: "/conditions/constipation" }
        ], beforeLinks: "Les mer om tømmingsproblemer for ", betweenLinks: " eller " },
        { text: "Blæreplager i form av tilbakevendende symptomer på urinveisinfeksjoner" },
        { text: "Hyppig vannlatnings- og/eller avføringstrang" },
        { text: "Forstoppelse" },
        { text: "Problemer ved seksuell aktivitet" },
        { text: "Nedsatt seksuell lystfølelse" },
        { text: "Smerter når du sitter eller er i bevegelse" },
        { text: "Fissur, sår i huden rundt endetarmsåpningen som kommer og går og gir sviende smerte ved avføring", links: [
          { text: "Les mer om fissur", url: "https://nhi.no/sykdommer/barn/magetarm/analfissur/" }
        ] },
        { text: "Sårhet i huden rundt skjede" },
        { text: "Hemoroider (utposninger av blodårer i endetarmen)", links: [
          { text: "Les mer om hemoroider", url: "https://nhi.no/sykdommer/kirurgi/magetarmsykdommer/hemoroider/" }
        ] },
        { text: "Irritabel tarm (vekslende løs/hard mage)", links: [
          { text: "Les mer om irritabel tarm", url: "https://nhi.no/sykdommer/magetarm/tykktarm/irritabel-tarm/" }
        ] },
        { text: "Muskelspenninger og smerter flere steder i kroppen" },
        { text: "Symptomrettet behandling som ikke har gitt langvarig effekt" }
      ]
    },
    {
      id: "emotional_impact",
      title: "Langvarige smerter",
      content: "Det å leve med langvarige smerter gjør noe med hele deg. Det påvirker både adferd og emosjoner.Det er vanlig å ha en følelse av å:",
      listItems: [
        "være nedtrykt eller deprimert",
        "ha problemer med søvn",
        "kjenne på uro og engstelse"
      ],
      additionalContent: "Slike følelser påvirker smerteopplevelsen negativt, og kan være med på å forsterke smertene. Om smertene har vart lengre enn seks måneder, kalles tilstanden innen medisinen for «kroniske smerter». Dette er ofte en sammensatt tilstand og smertene er i seg selv den største utfordringen. Langvarige underlivssmerter kan ha flere forskjellige årsaker."
    },
    {
      id: "anatomy",
      title: "Bekkenets anatomi",
      content: "Bekkenet er et komplekst kroppsområde som inneholder mange ulike strukturer som utgjør bevegelsesapparatet (eks muskler og skjelett, ledd, leddbånd/ligamenter og støttevev). Bekkenet inneholder også ytre og indre kjønnsorganene, samt tarm og blære. Både kvinner og menn kan få underlivssmerter. Mye er felles og er allerede beskrevet i teksten over, men da vi har ulik anatomi i underliv og bekkenorganene er det også ulikheter i tilstanden hos kvinner og menn. Kvinner og menn får ofte ulike diagnoser knyttet til dysfunksjon og smerter fra bekkenet."
    },
    {
      id: "men_section",
      title: "Underlivssmerter hos menn",
      hasQuote: true,
      quote: {
        text: "Jeg gruer meg til å gå på do fordi det alltid gjør vondt. Det kjennes som om noe revner.",
        author: "Mann, 30 år"
      },
      content: "Menn beskriver ofte smerter fra blære, penis, testikler og endetarm. Ofte kalles disse smertetilstandene for kronisk prostatitt, spastisk bekkenbunn eller smertefull blære (interstitiell cystitt).",
      hasLink: true,
      linkText: "Les mer om interstitiell cystitt",
      linkUrl: "https://nhi.no/sykdommer/nyrerurinveier/urinveisinfeksjoner/interstitiell-cystitt/"
    },
    {
      id: "women_section",
      title: "Underlivssmerter hos kvinner",
      hasQuote: true,
      quote: {
        text: "Smertene påvirker alle deler av livet mitt. Det å være i bevegelse, det å kunne sitte, gå på do og ikke minst påvirker det mitt seksualliv.",
        author: "Kvinne, 41 år"
      },
      content: "Kvinner beskriver ofte smerter fra blære, skjedeåpning, livmor og endetarm. Det er ikke uvanlig at disse tilstandene blir kalt kronisk urinveisinfeksjon, dyspareuni (smerter ved samleie), vestibulitt, vulvodyni (smerter i området rundt skjedeåpning) eller smertefull blære (interstitiell cystitt).",
      hasMultipleLinks: true,
      links: [
        { text: "interstitiell cystitt", url: "https://nhi.no/sykdommer/nyrerurinveier/urinveisinfeksjoner/interstitiell-cystitt/" },
        { text: "vulvodyni", url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/Pasientinformasjon_Vulvodyni_0_0.pdf" },
        { text: "vulva.no", url: "https://vulva.no/" }
      ],
      additionalContent: "Vulvaforum har en nettside som heter vulva.no hvor du finner mye informasjon om sykdommer i ytre deler av underlivet."
    },
    {
      id: "normal_function",
      title: "Normalfunksjon i bekkenet",
      content: "Svært komplekse mekanismer, som inkluderer det automatiske nervesystemet (",
      hasInlineLink: true,
      inlineLink: { text: "autonome nervesystemet", url: "https://nhi.no/kroppen-var/organer/autonome-nervesystem/" },
      contentAfterLink: ") sørger for normal funksjon i bekkenområdet.\n\nBekkenbunnsmuskulaturen danner som navnet sier bunnen i bekkenet. Denne samlingen av muskulatur gir støtte til indre organer. Ved sammentrekning lukker musklene rundt urinrør, endetarm og skjede (hos kvinner) og er med på å sørge for at du ikke lekker urin eller avføring.\n\nBekkenbunnen skal normalt slappe av ved toalettbesøk slik at du får til å tømme både blære og tarm. Det er også viktig å kunne slappe av i bekkenbunnen ved samleie."
    },
    {
      id: "functional_disorders",
      title: "Funksjonelle forstyrrelser i bekkenet",
      content: "Forstyrrelser i organene medfører ofte endret funksjon av muskulatur. Motsatt vil forstyrrelser i muskler kunne gi forstyrrelser av funksjonen til organene i bekkenet.\n\nVed økt belastning, som stress, kan det oppstå forstyrrelser i normalfunksjon. Forstyrrelsene kan ligge på mange nivåer i vår sammensatte organisme og de ulike nivåene påvirker hverandre gjensidig. Eksempelvis vil stress blant annet gi økt spenning i muskulatur, inkludert bekkenbunnen. Spenninger i bekkenbunnen vil kunne gi smerter ved samleie, og problemer med å tømme blære og tarm.\n\nLekkasjeproblematikk, både av urin og avføring, kan føre til økte spenninger i bekkebunnen, både bevisst og ubevisst.\n\nIndre organer (blære, tarm, skjede, livmor, prostata) kan tilsvarende bli påvirket av stress og belastninger. Dette kan for eksempel gi følger som problemer med fordøyelse og/eller hyppig vannlatningstrang. For de fleste er dette gjenkjennbart i situasjoner der vi gruer oss til noe.\n\nDet er mange eksempler på hvor sammensatt organismen fungerer. Har man opplevd smerter fra underliv/bekken, ved for eksempel samleie eller avføring, vil det være vanskelig å slappe av i disse sammenhengene. Ved forventet smerte spenner vi muskulaturen og kommer inn i en ond sirkel der forventning om smerte forsterker smertene."
    }
  ]
  },
  en: {
    pageTitle: "Symptoms",
    sections: [
    {
      id: "patient_quote_1",
      content: "When I can't sit, it becomes difficult to participate in social activities.",
      author: "Woman, 32 years",
      isHighlight: true
    },
    {
      id: "intro",
      content: [
        "Chronic pelvic pain is described as pain from the lower part of the abdomen, pelvis, pelvic area and organs in the pelvic area that has persisted for more than 6 months. The pain is often more severe than one would expect from the medical history and can affect several daily activities as the pain is located in a central area of the body."
      ]
    },
    {
      id: "common_symptoms",
      title: "Common symptoms of the condition can be:",
      listItems: [
        { text: "Problems and pain when emptying bowel and bladder", links: [
          { text: "urinary", url: "/conditions/urinary-retention" },
          { text: "bowel", url: "/conditions/constipation" }
        ], beforeLinks: "Read more about emptying problems for ", betweenLinks: " or " },
        { text: "Bladder problems in the form of recurring symptoms of urinary tract infections" },
        { text: "Frequent urination and/or bowel movement urge" },
        { text: "Constipation" },
        { text: "Problems during sexual activity" },
        { text: "Reduced sexual desire" },
        { text: "Pain when sitting or moving" },
        { text: "Fissure, sores in the skin around the anus that come and go and cause burning pain during bowel movements", links: [
          { text: "Read more about fissure", url: "https://nhi.no/sykdommer/barn/magetarm/analfissur/" }
        ] },
        { text: "Soreness in the skin around the vagina" },
        { text: "Hemorrhoids (bulges of blood vessels in the rectum)", links: [
          { text: "Read more about hemorrhoids", url: "https://nhi.no/sykdommer/kirurgi/magetarmsykdommer/hemoroider/" }
        ] },
        { text: "Irritable bowel (alternating loose/hard stomach)", links: [
          { text: "Read more about irritable bowel", url: "https://nhi.no/sykdommer/magetarm/tykktarm/irritabel-tarm/" }
        ] },
        { text: "Muscle tension and pain in several places in the body" },
        { text: "Symptom-directed treatment that has not given long-term effect" }
      ]
    },
    {
      id: "emotional_impact",
      title: "Chronic pain",
      content: "Living with chronic pain does something to your whole being. It affects both behavior and emotions. It is common to have a feeling of:",
      listItems: [
        "being depressed or depressed",
        "having sleep problems",
        "feeling anxiety and worry"
      ],
      additionalContent: "Such feelings affect the pain experience negatively and can contribute to intensifying the pain. If the pain has lasted longer than six months, the condition is called \"chronic pain\" in medicine. This is often a complex condition and the pain itself is the biggest challenge. Chronic pelvic pain can have several different causes."
    },
    {
      id: "anatomy",
      title: "Pelvic anatomy",
      content: "The pelvis is a complex body area that contains many different structures that make up the musculoskeletal system (e.g., muscles and skeleton, joints, ligaments and supportive tissue). The pelvis also contains external and internal reproductive organs, as well as bowel and bladder. Both women and men can experience pelvic pain. Much is common and has already been described in the text above, but since we have different anatomy in the pelvis and pelvic organs, there are also differences in the condition in women and men. Women and men often receive different diagnoses related to dysfunction and pain from the pelvis."
    },
    {
      id: "men_section",
      title: "Pelvic pain in men",
      hasQuote: true,
      quote: {
        text: "I dread going to the bathroom because it always hurts. It feels like something is tearing.",
        author: "Man, 30 years"
      },
      content: "Men often describe pain from bladder, penis, testicles and rectum. These pain conditions are often called chronic prostatitis, spastic pelvic floor or painful bladder (interstitial cystitis).",
      hasLink: true,
      linkText: "Read more about interstitial cystitis",
      linkUrl: "https://nhi.no/sykdommer/nyrerurinveier/urinveisinfeksjoner/interstitiell-cystitt/"
    },
    {
      id: "women_section",
      title: "Pelvic pain in women",
      hasQuote: true,
      quote: {
        text: "The pain affects all parts of my life. Being able to move, being able to sit, going to the bathroom, and not least, it affects my sex life.",
        author: "Woman, 41 years"
      },
      content: "Women often describe pain from bladder, vaginal opening, uterus and rectum. It is not uncommon for these conditions to be called chronic urinary tract infection, dyspareunia (pain during intercourse), vestibulitis, vulvodynia (pain in the area around the vaginal opening) or painful bladder (interstitial cystitis).",
      hasMultipleLinks: true,
      links: [
        { text: "interstitial cystitis", url: "https://nhi.no/sykdommer/nyrerurinveier/urinveisinfeksjoner/interstitiell-cystitt/" },
        { text: "vulvodynia", url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/Pasientinformasjon_Vulvodyni_0_0.pdf" },
        { text: "vulva.no", url: "https://vulva.no/" }
      ],
      additionalContent: "Vulvaforum has a website called vulva.no where you can find a lot of information about diseases in the outer parts of the genital area."
    },
    {
      id: "normal_function",
      title: "Normal pelvic function",
      content: "Very complex mechanisms, including the automatic nervous system (",
      hasInlineLink: true,
      inlineLink: { text: "autonomic nervous system", url: "https://nhi.no/kroppen-var/organer/autonome-nervesystem/" },
      contentAfterLink: ") ensure normal function in the pelvic area.\n\nThe pelvic floor muscles form, as the name suggests, the floor of the pelvis. This collection of muscles provides support to internal organs. When contracted, the muscles close around the urethra, rectum and vagina (in women) and help ensure that you don't leak urine or stool.\n\nThe pelvic floor should normally relax during toilet visits so that you can empty both bladder and bowel. It is also important to be able to relax the pelvic floor during intercourse."
    },
    {
      id: "functional_disorders",
      title: "Functional disorders in the pelvis",
      content: "Disorders in the organs often lead to altered muscle function. Conversely, disorders in muscles can cause disorders in the function of the organs in the pelvis.\n\nWith increased stress, such as stress, disturbances in normal function can occur. The disturbances can lie at many levels in our complex organism and the different levels affect each other mutually. For example, stress will among other things cause increased tension in muscles, including the pelvic floor. Tension in the pelvic floor can cause pain during intercourse and problems emptying bladder and bowel.\n\nLeakage problems, both urine and stool, can lead to increased tension in the pelvic floor, both consciously and unconsciously.\n\nInternal organs (bladder, bowel, vagina, uterus, prostate) can similarly be affected by stress and strain. This can, for example, result in problems with digestion and/or frequent urge to urinate. For most people, this is recognizable in situations where we dread something.\n\nThere are many examples of how complex the organism functions. If you have experienced pain from the pelvis/pelvic area, for example during intercourse or bowel movements, it will be difficult to relax in these contexts. With expected pain, we tense the muscles and enter a vicious circle where the expectation of pain intensifies the pain."
    }
  ]
  }
} as const

export const Symptoms = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Page-specific introduction content for symptoms
  const introductionContent = {
    title: "Symptomer ved langvarige underlivssmerter",
    subtitle: "Gjenkjenn symptomer og forstå deres påvirkning på hverdagen",
    description: [
      "Langvarige underlivssmerter, er en vanlig tilstand som rammer både kvinner og menn. Tilstanden gir mange ulike plager i daglige aktiviteter, som for eksempel problemer med tømning av tarm/blære, smerter ved seksuell aktivitet eller ved det å sitte. Langvarige underlivssmerter er ofte lokalisert i nedre del av mage, i underlivet og i organer knyttet til underliv/bekken.\nTilstanden benevnes i litteraturen som \"CPP\" som står for Chronic Pelvic Pain. Den norske oversettelsen av dette er kroniske bekkensmerter. I denne teksten bruker vi benevnelsen langvarige underlivssmerter.\nVed utredning finner en ofte ikke en eksakt årsak til smertene. I mange tilfeller ser man at det som kan ha igangsatt plagene (for eksempel en infeksjon eller kirurgi) tilheler, men at smertene vedvarer. Akutte smerter oppstår når kroppen på en eller annen måte har en skade. Langvarige smerter er annerledes. Selv om opprinnelig årsak tilheler kan nye \"smertetriggere\" oppstå, for eksempel i vevet rundt der en infeksjon har vært. Dette kan skje i muskulatur og støttevev eller i organer tilknyttet bekken/underliv.\nTilstanden som omtales her er en langvarig smertetilstand som ikke har en åpenbar årsak til tross for grundig utredning.\nInformasjonen på denne siden er utformet med tanke på voksne mennesker. \nInformasjonsfilm om smerte:\n ",
      { 
        text: "", 
        link: { 
          text: "Smerte forklart på fem minutt", 
          url: "https://www.youtube.com/watch?v=E9tVWoRhPKU" 
        } 
      },
      ", en oversettelse gjort av Universitetssykehuset Nord Norge."
    ],
    image: {
      src: "https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/montasje_smerter_hd-1024x273.jpg",
      alt: "Symptomer ved langvarige underlivssmerter",
      caption: "Forstå og gjenkjenn symptomer for bedre håndtering"
    }
  }

  return (
    <>
      {/* Shared Introduction */}
      <PelvicPainIntroduction content={introductionContent} />

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/inSymptoms.png"
            alt="Symptoms"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{symptomsData[language].pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        {symptomsData[language].sections.map((section) => {
          const hasTitle = 'title' in section && section.title;
          const sectionAny = section as any;
          
          const content = (
            <div className={styles.normalFunctionContent}>
              {/* Highlight box for initial quotes */}
              {'isHighlight' in section && section.isHighlight && (
                <div className={styles.highlightBox} style={{ marginBottom: '24px' }}>
                  <p className={styles.enhancedParagraph} style={{ fontStyle: 'italic', marginBottom: '12px' }}>
                    "{section.content}"
                  </p>
                  <p className={styles.enhancedParagraph} style={{ marginBottom: 0 }}>
                    <em>{'author' in section ? section.author : ''}</em>
                  </p>
                </div>
              )}

              {/* Regular content (can be string or array) */}
              {!('isHighlight' in section) && 'content' in section && section.content && (
                <>
                  {Array.isArray(section.content) ? (
                    section.content.map((contentText: string, contentIndex: number) => (
                      <p key={contentIndex} className={styles.enhancedParagraph} style={{ marginBottom: '16px', lineHeight: '1.8' }}>
                        {contentText}
                      </p>
                    ))
                  ) : (
                    <>
                      {!sectionAny.hasInlineLink ? (
                        // Simple paragraph without inline links
                        typeof section.content === 'string' && section.content.includes('\n\n') ? (
                          section.content.split('\n\n').map((para: string, paraIdx: number) => (
                            <p key={`para-${paraIdx}`} className={styles.enhancedParagraph} style={{ marginBottom: '16px', lineHeight: '1.8' }}>
                              {para}
                            </p>
                          ))
                        ) : (
                          <p className={styles.enhancedParagraph} style={{ marginBottom: '16px', lineHeight: '1.8' }}>
                            {section.content}
                          </p>
                        )
                      ) : (
                        // Paragraph with inline link
                        <>
                          <p className={styles.enhancedParagraph} style={{ marginBottom: '16px', lineHeight: '1.8' }}>
                            {section.content}
                            <a 
                              href={sectionAny.inlineLink.url}
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
                              {sectionAny.inlineLink.text}
                            </a>
                            {sectionAny.contentAfterLink && !sectionAny.contentAfterLink.includes('\n\n') 
                              ? sectionAny.contentAfterLink 
                              : sectionAny.contentAfterLink.split('\n\n')[0]}
                          </p>
                          {/* Additional paragraphs after inline link */}
                          {sectionAny.contentAfterLink && sectionAny.contentAfterLink.includes('\n\n') && (
                            sectionAny.contentAfterLink.split('\n\n').slice(1).map((para: string, idx: number) => (
                              <p key={`after-${idx}`} className={styles.enhancedParagraph} style={{ marginBottom: '16px', lineHeight: '1.8' }}>
                                {para}
                              </p>
                            ))
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Quote box */}
              {sectionAny.hasQuote && sectionAny.quote && (
                <div className={styles.highlightBox} style={{ marginBottom: '20px', marginTop: '20px' }}>
                  <p className={styles.enhancedParagraph} style={{ fontStyle: 'italic', marginBottom: '12px' }}>
                    "{sectionAny.quote.text}"
                  </p>
                  <p className={styles.enhancedParagraph} style={{ marginBottom: 0 }}>
                    <em>{sectionAny.quote.author}</em>
                  </p>
                </div>
              )}

              {/* Single link after content */}
              {sectionAny.hasLink && sectionAny.linkText && sectionAny.linkUrl && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '12px', marginBottom: '16px' }}>
                  <a 
                    href={sectionAny.linkUrl}
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
                    {sectionAny.linkText}
                  </a>
                </p>
              )}

              {/* Multiple links after content */}
              {sectionAny.hasMultipleLinks && sectionAny.links && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '12px', marginBottom: '16px' }}>
                  Les mer om{' '}
                  {sectionAny.links.map((link: any, linkIdx: number) => (
                    <span key={linkIdx}>
                      <a 
                        href={link.url}
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
                        {link.text}
                      </a>
                      {linkIdx < sectionAny.links.length - 1 && (linkIdx === sectionAny.links.length - 2 ? ' og ' : ', ')}
                    </span>
                  ))}
                  .
                </p>
              )}

              {/* Additional content after links */}
              {sectionAny.additionalContent && (
                <p className={styles.enhancedParagraph} style={{ marginTop: '16px', lineHeight: '1.8' }}>
                  {sectionAny.additionalContent}
                </p>
              )}

              {/* List items with optional links */}
              {sectionAny.listItems && (
                <ul className={styles.resourceList} style={{ marginTop: '12px', marginBottom: '16px' }}>
                  {sectionAny.listItems.map((item: any, itemIndex: number) => (
                    <li key={itemIndex} className={styles.resourceListItem} style={{ marginBottom: '10px', lineHeight: '1.7' }}>
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          {item.text}
                          {item.links && item.links.length > 0 && (
                            <>
                              <br />
                              {item.beforeLinks || ''}
                              {item.links.map((link: any, linkIdx: number) => (
                                <span key={linkIdx}>
                                  <a 
                                    href={link.url}
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
                                    {link.text}
                                  </a>
                                  {linkIdx < item.links.length - 1 && (item.betweenLinks || ', ')}
                                </span>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          // Only wrap if section has title
          if (hasTitle) {
            return (
              <SectionAccordion 
                key={section.id}
                title={section.title}
                isDarkMode={resolvedTheme === 'dark'}
                defaultOpen={false}
              >
                {content}
              </SectionAccordion>
            );
          } else {
            // Sections without title get white background (intro sections)
            return (
              <div key={section.id} className={styles.normalFunctionSection}>
                {content}
              </div>
            );
          }
        })}
      </div>
    </div>
    </>
  )
}