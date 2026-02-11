"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific data arrays
const referencesData = {
  no: {
    pageTitle: "Referanser",
    intro: "Faglige referanser og kilder til informasjon om langvarige underlivssmerter. Informasjonen er basert på evidensbasert kunnskap og er utviklet av spesialister innen fagområdet.",
    currentArticlesTitle: "Aktuelle fagartikler",
    currentArticles: [
      {
        text: "L. Getz, A.L.K E Ulvestad. (2011) Menneskets biologi – mettet med erfaring. Tidsskrift for Den Norske Lægeforening 131:683-7."
      },
      {
        text: "Brodal, P. (2005) Smertens nevrobiologi. Tidsskrift for Den Norske Lægeforening, 125 (17), 2370-2373."
      },
      {
        text: "Butler, David S. Explain pain. Noigroup Publ. Adelaid 2003."
      },
      {
        text: "International Pelvic Pain Society har flere ",
        linkText: "Pasientbrosjyrer",
        url: "https://pelvicpain.org/patients/educational-resources/"
      },
      {
        text: "Van Kerrebroeck P. (2016) Understanding the pelvic pain mechanism is key to find an adequate therapeutic approach. Urologia. 2016 Jun 25;83 Suppl 1:2-4. doi: 10.5301/uro.5000183. Epub 2016 Jun 23."
      },
      {
        text: "",
        linkText: "Smertefull blære - Utredning og behandling av smertefull blære/IC",
        linkAfter: " av urolog Tore-Erik Sand, Ahus og Bekkensenteret.",
        url: "https://nhi.no/sykdommer/nyrerurinveier/urinveisinfeksjoner/interstitiell-cystitt/"
      }
    ],
    contributorsTitle: "Forfattere av innholdet",
    contributorsIntro: "Følgende forfattere av innholdet og deltagere i norsk fagnettverk for langvarige underlivssmerter:",
    contributors: [
      "Unni Kirste, gynekolog/smertelege",
      "Clara Karoliussen, fysioterapeut, St.Olavs Hospital",
      "Gro Killi Haugstad, førsteamanuensis, HIOA",
      "Heidi Hanevold, fysioterapeut Hammerfest Finnmarksykehuset",
      "Ane Sigrid Henriksen, fysioterapeut, Nasjonalt senter for bekkenbunnshelse, Universitetssykehuset Nord Norge",
      "Mette Løkeland, gynekolog, Betanien sykehus",
      "Harriet Birke, urolog, St. Olavs Hospital",
      "Kristin Evjen, fysioterapeut, Kristin Evjen – Helse og livskvalitet, Ålesund",
      "Cecilie Therese Hagemann, førsteamanuensis/overlege St. Olavs Hospital",
      "Berit Schei, professor ved institutt for samfunnsmedisin, NTNU",
      "Signe Stafne, fysioterapeut, St. Olavs Hospital",
      "Liv Ramstad, gynekolog Ahus",
      "Anja Løvvik, urolog, Ahus",
      "Anne Tine Vold, psykomotorisk fysioterapeut, Nasjonalt senter for bekkenbunnshelse, Universitetssykehuset Nord Norge",
      "Cathrine Boge-Olsnes, psykomotorisk fysioterapeut, Nasjonalt senter for bekkenbunnshelse, Universitetssykehuset Nord Norge",
      "Steen Buntzen, gastrokirurg, Nasjonalt senter for bekkenbunnshelse, Universitetssykehuset Nord Norge"
    ]
  },
  en: {
    pageTitle: "References",
    intro: "Professional references and sources of information about chronic pelvic pain. The information is based on evidence-based knowledge and is developed by specialists in the field.",
    currentArticlesTitle: "Current Scientific Articles",
    currentArticles: [
      {
        text: "L. Getz, A.L.K E Ulvestad. (2011) Human biology – saturated with experience. Journal of the Norwegian Medical Association 131:683-7."
      },
      {
        text: "Brodal, P. (2005) The neurobiology of pain. Journal of the Norwegian Medical Association, 125 (17), 2370-2373."
      },
      {
        text: "Butler, David S. Explain pain. Noigroup Publ. Adelaide 2003."
      },
      {
        text: "International Pelvic Pain Society has several ",
        linkText: "patient brochures",
        url: "https://pelvicpain.org/patients/educational-resources/"
      },
      {
        text: "Van Kerrebroeck P. (2016) Understanding the pelvic pain mechanism is key to find an adequate therapeutic approach. Urologia. 2016 Jun 25;83 Suppl 1:2-4. doi: 10.5301/uro.5000183. Epub 2016 Jun 23."
      },
      {
        text: "",
        linkText: "Painful Bladder - Investigation and treatment of painful bladder/IC",
        linkAfter: " by urologist Tore-Erik Sand, Ahus and Bekkensenteret.",
        url: "https://nhi.no/sykdommer/nyrerurinveier/urinveisinfeksjoner/interstitiell-cystitt/"
      }
    ],
    contributorsTitle: "Content Authors",
    contributorsIntro: "The following authors and participants in the Norwegian professional network for chronic pelvic pain:",
    contributors: [
      "Unni Kirste, gynecologist/pain specialist",
      "Clara Karoliussen, physiotherapist, St.Olavs Hospital",
      "Gro Killi Haugstad, associate professor, HIOA",
      "Heidi Hanevold, physiotherapist Hammerfest Finnmark Hospital",
      "Ane Sigrid Henriksen, physiotherapist, National Center for Pelvic Floor Health, University Hospital of North Norway",
      "Mette Løkeland, gynecologist, Betanien Hospital",
      "Harriet Birke, urologist, St. Olavs Hospital",
      "Kristin Evjen, physiotherapist, Kristin Evjen – Health and Quality of Life, Ålesund",
      "Cecilie Therese Hagemann, associate professor/senior consultant St. Olavs Hospital",
      "Berit Schei, professor at the Department of Public Health and Nursing, NTNU",
      "Signe Stafne, physiotherapist, St. Olavs Hospital",
      "Liv Ramstad, gynecologist Ahus",
      "Anja Løvvik, urologist, Ahus",
      "Anne Tine Vold, psychomotor physiotherapist, National Center for Pelvic Floor Health, University Hospital of North Norway",
      "Cathrine Boge-Olsnes, psychomotor physiotherapist, National Center for Pelvic Floor Health, University Hospital of North Norway",
      "Steen Buntzen, gastrointestinal surgeon, National Center for Pelvic Floor Health, University Hospital of North Norway"
    ]
  }
}

export const References = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="References" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{referencesData[language].pageTitle}</h2>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {referencesData[language].intro}
            </p>
          </div>
        </div>

          {/* Current Scientific Articles Section */}
          <SectionAccordion 
            title={referencesData[language].currentArticlesTitle}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={true}
          >
            <div className={styles.normalFunctionContent}>
              <ul className={styles.resourceList}>
                {referencesData[language].currentArticles.map((article, index) => (
                  <li key={index} className={styles.resourceListItem}>
                    {article.text}
                    {(article as any).linkText && (article as any).url && (
                      <a 
                        href={(article as any).url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.inlineLink}
                      >
                        {(article as any).linkText}
                      </a>
                    )}
                    {(article as any).linkAfter && (article as any).linkAfter}
                  </li>
                ))}
              </ul>
            </div>
          </SectionAccordion>

          {/* Contributors Section */}
        <SectionAccordion 
            title={referencesData[language].contributorsTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
              <p className={styles.enhancedParagraph}>
                {referencesData[language].contributorsIntro}
              </p>
            <ul className={styles.resourceList}>
                {referencesData[language].contributors.map((contributor, index) => (
                <li key={index} className={styles.resourceListItem}>
                    {contributor}
                </li>
              ))}
            </ul>
          </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  )
}