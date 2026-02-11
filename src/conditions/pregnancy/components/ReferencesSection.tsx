"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

const REFERENCES_DATA = {
  no: [
    {
      text: "Berg RC, Denison E. Does Female Genital Mutilation/Cutting (FGM/C) Affect Women's Sexual Functioning? A Systematic Review of the Sexual Consequences of FGM/Cutting.",
      link: "https://link.springer.com/article/10.1007/s13178-011-0048-z",
      pmid: "25505915"
    },
    {
      text: "Berg RC, Odgaard-Jensen J, Fretheim A, Underland V, and Vist G. An Updated Systematic Review and Meta-Analysis of the Obstetric Consequences of Female Genital Mutilation/Cutting.",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4258320/",
      source: "Obstetrics and Gynecology International/2014",
      pmid: "25505915"
    },
    {
      text: "Berg RC, Taraldsen S, Said MA, Sørbye IK, Vangen S. Reasons for and Experiences With Surgical Interventions for Female Genital Mutilation/Cutting (FGM/C): A Systematic Review.",
      link: "https://pubmed.ncbi.nlm.nih.gov/28666656/",
      source: "J Sex Med. 2017 Aug;14(8):977-990",
      pmid: "28666656"
    },
    {
      text: "Borgan E, Nasjonal kompetansetjeneste for kvinnehelse. Omskårede kvinner har helseplager, men det finnes lite kunnskap om hva som hjelper.",
      link: "https://forskning.no/kjonn-og-samfunn-kjonnslemlestelse-medisinske-metoder/omskarede-kvinner-har-helseplager-men-det-finnes-lite-kunnskap-om-hva-som-hjelper/261392",
      source: "Forskning.no 12.6.2018"
    },
    {
      text: "Braekken IH, Majida M, Ellström Engh M, Bø K (2014). Can pelvic floor muscle training improve sexual function in women with pelvic organ prolapse? A randomized controlled trial.",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25401779",
      source: "J Sex Med. 2015 Feb;12(2):470-80"
    },
    {
      text: "Braekken IH, Majida M, Engh ME, Bø K. (2010) Can pelvic floor muscle training reverse pelvic organ prolapse and reduce prolapse symptoms? An assessor-blinded, randomized, controlled trial.",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20435294",
      source: "Am J Obstet Gynecol. 2010 Aug; 203(2):170.e1-7",
      pmid: "20435294"
    },
    {
      text: "Brosjyre med bekkenbunnstrening ved Prolaps",
      link: "https://quintet.no/media/bilder/produkter/nyheter/BEKKENBUNNSTRENING_WEB.pdf"
    },
    {
      text: "Den norske legeforeningen/Norsk Gynekologisk Forening (2020). Kvinnelig omskjæring, kjønnslemlestelse, deinfibulering (2020)",
      link: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/kvinnelig-omskjaring-kjonnslemlestelse-deinfibulering/"
    },
    {
      text: "Den Norske Legeforening/Norsk Gynekologisk Forening (2020). Veileder i Fødselshjelp (2020).",
      link: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/"
    },
    {
      text: "Den Norske Legeforening/Norsk Gynekologisk Forening (2020). Perinealskade og anal sfinkterskade etter fødsel (2020)",
      link: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/perinealskade-og-anal-sfinkterskade-ved-fodsel/"
    },
    {
      text: "Dumoulin C, Cacciari JP, Hay‐Smith EJP (2018). Pelvic floor muscle training versus no treatment, or inactive control treatments, for urinary incontinence in women. Cochrane Systematic Review – Intervention Version published: Oct 2018",
      link: "https://doi.org/10.1002/14651858.CD005654.pub4"
    },
    {
      text: "Faxelid, E, Hogg B, Kaplan A & Nilssen E (1993) Lärbok for barnmorskor Lund, Studentlitteratur."
    },
    {
      text: "Folkehelseinstituttet (2018) Alvorlige fødselsrifter mer enn halvert siden 2005.",
      link: "https://www.fhi.no/nyheter/2018/alvorlige-fodselsrifter-mer-enn-halvert-siden-2005/"
    },
    {
      text: "Folkehelseinstituttet (2019) Medisinsk fødselsregister",
      link: "https://www.fhi.no/hn/helseregistre-og-registre/mfr/"
    },
    {
      text: "Hagen S, Stark D (2011) Conservative prevention and management of pelvic organ prolapse in women. Cochrane Systematic Review – Intervention Version published: December 2011",
      link: "https://doi.org/10.1002/14651858.CD003882.pub4"
    },
    {
      text: "Handa VL, Brubaker L, Ecler K (2019) Effect of pregnancy and childbirth on urinary incontinence and pelvic organ prolapse",
      link: "https://www.uptodate.com/contents/effect-of-pregnancy-and-childbirth-on-urinary-incontinence-and-pelvic-organ-prolapse?search=caesarean%20and%20oab%20UI&topicRef=6874&source=see_link"
    },
    {
      text: "Hay‐Smith EJC, Herderschee R, Dumoulin C, Herbison GP (2011). Comparisons of approaches to pelvic floor muscle training for urinary incontinence in women. Cochrane Systematic Review – Intervention Version published: Dec 2011",
      link: "https://doi.org/10.1002/14651858.CD009508"
    },
    {
      text: "Hellström AL, Lindehall (2006) Uroterapi. Lund, Studentlitteratur"
    },
    {
      text: "Helsedirektoratet (2019) Nasjonal kvalitetsindikator. Keisersnitt.",
      link: "https://www.helsedirektoratet.no/statistikk/statistikk/kvalitetsindikatorer/graviditet-og-fodsel/keisersnitt"
    },
    {
      text: "Helsedirektoratet (2019) Oversikt over anbefalt innhold i svangerskapsomsorgen",
      link: "https://www.helsedirektoratet.no/retningslinjer/svangerskapsomsorgen/dokumenter-svangerskapsomsorgen/Algoritme-oversikt-over-anbefalt-innhold-i-svangerskapsomsorgen.pdf"
    },
    {
      text: "Helsedirektoratet (2018) Urinveisinfeksjon (UVI) hos gravide og ammende",
      link: "https://www.helsedirektoratet.no/retningslinjer/antibiotika-i-sykehus/urinveier/urinveisinfeksjon-uvi-hos-gravide-og-ammende"
    },
    {
      text: "Helse- og omsorgsdepartementet. En gledelig begivenhet (Meld. St 12 (2008-2009)).",
      link: "https://www.regjeringen.no/"
    },
    {
      text: "Helsenorge.no (2019) Keisersnitt",
      link: "https://helsenorge.no/fodsel/keisersnitt"
    },
    {
      text: "Helsenorge.no (2016) Sex når du er gravid",
      link: "https://helsenorge.no/gravid/sex-nar-du-er-gravid"
    },
    {
      text: "Holan S, Hagtvedt ML(red) (2010) Det nye livet. Svangerskap, fødsel og barseltid 2.utgave. Fagbokforlaget."
    },
    {
      text: "Neels H, Mortiers X, De Graas S, Tjalma W, De Wachter S and Vermadel A. Vaginal wind: A literature review. European Journal of Obstetrics & Gynecology and Reproductive Biology 214 (2017) 97–103.",
      link: "https://doi.org/10.1016/j.ejogrb.2017.04.033"
    },
    {
      text: "Norsk gruppe for konservativ behandling av anorektale funksjonsforstyrrelser (2018) Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelse",
      link: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/AI%20retningslinjer%202019%20pdf.pdf"
    },
    {
      text: "Norsk Gynekologisk Forening (34) definisjon på rifter, og the International Classification of Diseases Revision, ICD-10 (35)",
      link: "https://finnkode.ehelse.no/#icd10/0/0/0/2619254"
    },
    {
      text: "Norsk Helseinformatikk NHI (2019)",
      link: "https://nhi.no/familie/graviditet/svangerskap-og-fodsel/sykdommer/fodsel/fodselsskade-lukkemuskel/"
    },
    {
      text: "Norsk helseinformatikk NHI (2017) Keisersnitt",
      link: "https://nhi.no/familie/graviditet/svangerskap-og-fodsel/sykdommer/fodsel/keisersnitt/"
    },
    {
      text: "Norton C, Cody JD (2012) Biofeedback and/or sphincter exercises for the treatment of faecal incontinence in adults. Cochrane Systematic Review – Intervention Version published: July 2012",
      link: "https://doi.org/10.1002/14651858.CD002111.pub3"
    },
    {
      text: "Stafne SN, Salvesen KÅ, Romundstad PR, Torjusen IH, Mørkved S (2012). Does regular exercise including pelvic floor muscle training prevent urinary and anal incontinence during pregnancy? A randomised controlled trial.",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/?term=Does+regular+exercise+including+pelvic+floor+muscle+training+prevent+urinary+and+anal+incontinence+during+pregnancy%3F+A+randomised+controlled+trial.",
      source: "BJOG. 2012 Sep;119(10):1270-80"
    },
    {
      text: "WHO guidelines on the management of health complications from female genital mutilation",
      link: "https://apps.who.int/iris/bitstream/handle/10665/206437/9789241549646_eng.pdf",
      source: "World Health Organization – 2016"
    },
    {
      text: "Woodley, SJ, Boyle, R, Cody JD, Mørkved, S, Hay-Smith, EJC (2017). Pelvic floor muscle training for prevention and treatment of urinary and faecal incontinence in antenatal and postnatal women.",
      link: "http://dx.doi.org/10.1002/14651858.CD007471.pub3",
      source: "Cochrane Database of Systematic Reviews. vol. 2017:CD007471 (12)"
    }
  ],
  en: [
    {
      text: "Berg RC, Denison E. Does Female Genital Mutilation/Cutting (FGM/C) Affect Women's Sexual Functioning? A Systematic Review of the Sexual Consequences of FGM/Cutting.",
      link: "https://link.springer.com/article/10.1007/s13178-011-0048-z",
      pmid: "25505915"
    },
    {
      text: "Berg RC, Odgaard-Jensen J, Fretheim A, Underland V, and Vist G. An Updated Systematic Review and Meta-Analysis of the Obstetric Consequences of Female Genital Mutilation/Cutting.",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4258320/",
      source: "Obstetrics and Gynecology International/2014",
      pmid: "25505915"
    },
    {
      text: "Berg RC, Taraldsen S, Said MA, Sørbye IK, Vangen S. Reasons for and Experiences With Surgical Interventions for Female Genital Mutilation/Cutting (FGM/C): A Systematic Review.",
      link: "https://pubmed.ncbi.nlm.nih.gov/28666656/",
      source: "J Sex Med. 2017 Aug;14(8):977-990",
      pmid: "28666656"
    },
    {
      text: "Borgan E, National Competence Center for Women's Health. Circumcised women have health problems, but there is little knowledge about what helps.",
      link: "https://forskning.no/kjonn-og-samfunn-kjonnslemlestelse-medisinske-metoder/omskarede-kvinner-har-helseplager-men-det-finnes-lite-kunnskap-om-hva-som-hjelper/261392",
      source: "Forskning.no 12.6.2018"
    },
    {
      text: "Braekken IH, Majida M, Ellström Engh M, Bø K (2014). Can pelvic floor muscle training improve sexual function in women with pelvic organ prolapse? A randomized controlled trial.",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25401779",
      source: "J Sex Med. 2015 Feb;12(2):470-80"
    },
    {
      text: "Braekken IH, Majida M, Engh ME, Bø K. (2010) Can pelvic floor muscle training reverse pelvic organ prolapse and reduce prolapse symptoms? An assessor-blinded, randomized, controlled trial.",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20435294",
      source: "Am J Obstet Gynecol. 2010 Aug; 203(2):170.e1-7",
      pmid: "20435294"
    },
    {
      text: "Pelvic floor training brochure for Prolapse",
      link: "https://quintet.no/media/bilder/produkter/nyheter/BEKKENBUNNSTRENING_WEB.pdf"
    },
    {
      text: "Norwegian Medical Association/Norwegian Gynecological Association (2020). Female circumcision, genital mutilation, deinfibulation (2020)",
      link: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/kvinnelig-omskjaring-kjonnslemlestelse-deinfibulering/"
    },
    {
      text: "Norwegian Medical Association/Norwegian Gynecological Association (2020). Obstetrics Guidelines (2020).",
      link: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/"
    },
    {
      text: "Norwegian Medical Association/Norwegian Gynecological Association (2020). Perineal injury and anal sphincter injury after birth (2020)",
      link: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/perinealskade-og-anal-sfinkterskade-ved-fodsel/"
    },
    {
      text: "Dumoulin C, Cacciari JP, Hay‐Smith EJP (2018). Pelvic floor muscle training versus no treatment, or inactive control treatments, for urinary incontinence in women. Cochrane Systematic Review – Intervention Version published: Oct 2018",
      link: "https://doi.org/10.1002/14651858.CD005654.pub4"
    },
    {
      text: "Faxelid, E, Hogg B, Kaplan A & Nilssen E (1993) Textbook for midwives Lund, Studentlitteratur."
    },
    {
      text: "Norwegian Institute of Public Health (2018) Severe birth injuries more than halved since 2005.",
      link: "https://www.fhi.no/nyheter/2018/alvorlige-fodselsrifter-mer-enn-halvert-siden-2005/"
    },
    {
      text: "Norwegian Institute of Public Health (2019) Medical Birth Registry",
      link: "https://www.fhi.no/hn/helseregistre-og-registre/mfr/"
    },
    {
      text: "Hagen S, Stark D (2011) Conservative prevention and management of pelvic organ prolapse in women. Cochrane Systematic Review – Intervention Version published: December 2011",
      link: "https://doi.org/10.1002/14651858.CD003882.pub4"
    },
    {
      text: "Handa VL, Brubaker L, Ecler K (2019) Effect of pregnancy and childbirth on urinary incontinence and pelvic organ prolapse",
      link: "https://www.uptodate.com/contents/effect-of-pregnancy-and-childbirth-on-urinary-incontinence-and-pelvic-organ-prolapse?search=caesarean%20and%20oab%20UI&topicRef=6874&source=see_link"
    },
    {
      text: "Hay‐Smith EJC, Herderschee R, Dumoulin C, Herbison GP (2011). Comparisons of approaches to pelvic floor muscle training for urinary incontinence in women. Cochrane Systematic Review – Intervention Version published: Dec 2011",
      link: "https://doi.org/10.1002/14651858.CD009508"
    },
    {
      text: "Hellström AL, Lindehall (2006) Urotherapy. Lund, Studentlitteratur"
    },
    {
      text: "Norwegian Directorate of Health (2019) National quality indicator. Caesarean section.",
      link: "https://www.helsedirektoratet.no/statistikk/statistikk/kvalitetsindikatorer/graviditet-og-fodsel/keisersnitt"
    },
    {
      text: "Norwegian Directorate of Health (2019) Overview of recommended content in pregnancy care",
      link: "https://www.helsedirektoratet.no/retningslinjer/svangerskapsomsorgen/dokumenter-svangerskapsomsorgen/Algoritme-oversikt-over-anbefalt-innhold-i-svangerskapsomsorgen.pdf"
    },
    {
      text: "Norwegian Directorate of Health (2018) Urinary tract infection (UTI) in pregnant and breastfeeding women",
      link: "https://www.helsedirektoratet.no/retningslinjer/antibiotika-i-sykehus/urinveier/urinveisinfeksjon-uvi-hos-gravide-og-ammende"
    },
    {
      text: "Ministry of Health and Care Services. A joyful event (Meld. St 12 (2008-2009)).",
      link: "https://www.regjeringen.no/"
    },
    {
      text: "Helsenorge.no (2019) Caesarean section",
      link: "https://helsenorge.no/fodsel/keisersnitt"
    },
    {
      text: "Helsenorge.no (2016) Sex when you are pregnant",
      link: "https://helsenorge.no/gravid/sex-nar-du-er-gravid"
    },
    {
      text: "Holan S, Hagtvedt ML(ed) (2010) The new life. Pregnancy, birth and postnatal period 2nd edition. Fagbokforlaget."
    },
    {
      text: "Neels H, Mortiers X, De Graas S, Tjalma W, De Wachter S and Vermadel A. Vaginal wind: A literature review. European Journal of Obstetrics & Gynecology and Reproductive Biology 214 (2017) 97–103.",
      link: "https://doi.org/10.1016/j.ejogrb.2017.04.033"
    },
    {
      text: "Norwegian group for conservative treatment of anorectal dysfunction (2018) Professional guidelines for investigation and conservative treatment of anorectal dysfunction",
      link: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/AI%20retningslinjer%202019%20pdf.pdf"
    },
    {
      text: "Norwegian Gynecological Association (34) definition of tears, and the International Classification of Diseases Revision, ICD-10 (35)",
      link: "https://finnkode.ehelse.no/#icd10/0/0/0/2619254"
    },
    {
      text: "Norwegian Health Information NHI (2019)",
      link: "https://nhi.no/familie/graviditet/svangerskap-og-fodsel/sykdommer/fodsel/fodselsskade-lukkemuskel/"
    },
    {
      text: "Norwegian Health Information NHI (2017) Caesarean section",
      link: "https://nhi.no/familie/graviditet/svangerskap-og-fodsel/sykdommer/fodsel/keisersnitt/"
    },
    {
      text: "Norton C, Cody JD (2012) Biofeedback and/or sphincter exercises for the treatment of faecal incontinence in adults. Cochrane Systematic Review – Intervention Version published: July 2012",
      link: "https://doi.org/10.1002/14651858.CD002111.pub3"
    },
    {
      text: "Stafne SN, Salvesen KÅ, Romundstad PR, Torjusen IH, Mørkved S (2012). Does regular exercise including pelvic floor muscle training prevent urinary and anal incontinence during pregnancy? A randomised controlled trial.",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/?term=Does+regular+exercise+including+pelvic+floor+muscle+training+prevent+urinary+and+anal+incontinence+during+pregnancy%3F+A+randomised+controlled+trial.",
      source: "BJOG. 2012 Sep;119(10):1270-80"
    },
    {
      text: "WHO guidelines on the management of health complications from female genital mutilation",
      link: "https://apps.who.int/iris/bitstream/handle/10665/206437/9789241549646_eng.pdf",
      source: "World Health Organization – 2016"
    },
    {
      text: "Woodley, SJ, Boyle, R, Cody JD, Mørkved, S, Hay-Smith, EJC (2017). Pelvic floor muscle training for prevention and treatment of urinary and faecal incontinence in antenatal and postnatal women.",
      link: "http://dx.doi.org/10.1002/14651858.CD007471.pub3",
      source: "Cochrane Database of Systematic Reviews. vol. 2017:CD007471 (12)"
    }
  ]
} as const

export const ReferencesSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const references = REFERENCES_DATA[language]

  const INTRO_TEXT = {
    no: 'Emnet "Plager under graviditet og etter fødsel" er utviklet av en gruppe spesialister med fagkunnskap på de ulike områdene. Sidene er utarbeidet på bakgrunn av evidensbasert kunnskap. I tillegg gir erfaringsbasert kunnskap en viktig tilleggsinformasjon i formidlingen.',
    en: 'The topic "Problems during pregnancy and after childbirth" is developed by a group of specialists with expertise in the various areas. The pages are based on evidence-based knowledge. In addition, experience-based knowledge provides important additional information in the communication.'
  }

  const PUBLICATION_INFO = {
    no: 'Publisert: 10.01.2020. Oppdatert: 28.02.23.',
    en: 'Published: 10.01.2020. Updated: 28.02.23.'
  }

  const CONTRIBUTORS_TITLE = {
    no: 'Bidratt til utvikling og kvalitetssikring av sidene:',
    en: 'Contributors to the development and quality assurance of the pages:'
  }

  const CONTRIBUTORS = [
    'Mona Rydningen, gastrokirurg, Universitetssykehuset Nord-Norge/Nasjonalt senter for bekkenbunnshelse',
    'Kristine Amundsen, gynekolog, Universitetssykehuset Nord-Norge/Nasjonalt senter for bekkenbunnshelse',
    'Per Espen Lahne, urolog, Universitetssykehuset Nord-Norge/Nasjonalt senter for bekkenbunnshelse',
    'Hilde Tollefsen, uroterapeut, Universitetssykehuset Nord-Norge/Nasjonalt senter for bekkenbunnshelse',
    'Lotte Lindstrøm Eliassen, sykepleier, Universitetssykehuset Nord-Norge/Nasjonalt senter for bekkenbunnshelse',
    'Gry-Hege Sjøhaug, jordmor, Universitetssykehuset Nord-Norge/Nasjonalt senter for bekkenbunnshelse',
    'Tine Vold, psykomotorisk fysioterapeut, Universitetssykehuset Nord-Norge/Nasjonalt senter for bekkenbunnshelse',
    'Gunnbjørg Andreassen, jordmor, Universitetssykehuset Nord-Norge',
    'Line Lyngedal, fysioterapeut, Universitetssykehuset Nord-Norge'
  ]

  return (
    <div id="references" className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="References" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {language === "no" ? "Referanser" : "References"}
        </h2>
      </div>

      <div className={styles.sectionContent}>
        {/* Introduction */}
        <div className={styles.normalFunctionContent}>
          <p className={styles.enhancedParagraph}>
            {INTRO_TEXT[language]}
          </p>
          
          <p className={styles.enhancedParagraph}>
            <strong>{PUBLICATION_INFO[language]}</strong>
          </p>

          <p className={styles.enhancedParagraph}>
            <strong>{CONTRIBUTORS_TITLE[language]}</strong>
          </p>

          <ul className={styles.resourceList}>
            {CONTRIBUTORS.map((contributor, index) => (
              <li key={`contributor-${index}`} className={styles.resourceListItem}>
                {contributor}
              </li>
            ))}
          </ul>
        </div>

        {/* References List in Accordion */}
        <SectionAccordion
          title={language === "no" ? "Felles referanseliste" : "Common reference list"}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <ul className={styles.resourceList}>
              {references.map((reference, index) => (
                <li key={`ref-${index}`} className={styles.resourceListItem}>
                  {reference.text}
                  {'link' in reference && reference.link && (
                    <>
                      {' '}
                      <a 
                        href={reference.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#3b82f6', textDecoration: 'underline' }}
                      >
                        {'source' in reference && reference.source ? reference.source : 'Link'}
                      </a>
                    </>
                  )}
                  {'pmid' in reference && reference.pmid && (
                    <>
                      {' '}
                      PMID: <a 
                        href={`https://www.ncbi.nlm.nih.gov/pubmed/${reference.pmid}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#3b82f6', textDecoration: 'underline' }}
                      >
                        {reference.pmid}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </SectionAccordion>
      </div>
    </div>
  )
}
