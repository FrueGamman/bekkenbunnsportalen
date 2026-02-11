"use client"
// import { Button } from "../components/ui/Button" // Not used in this component
import { Card, CardContent } from "../components/ui/Card"
import { useLanguage } from "../context/LanguageContext"
import { Header } from "../components/Header"
import Footer from "../components/Footer"
import styles from "./About.module.css"

// Structured bilingual data for About page content
const ABOUT_DATA = {
  no: {
    hero: {
      title: "Om Bekkenbunnsportalen",
      subtitle: "En kompetanseportal for inkontinens og bekkenbunnsykdom"
    },
    portal: {
      title: "Om Bekkenbunnsportalen.no",
      description: "Bekkenbunnsportalen er en kompetanseportal for inkontinens og bekkenbunnsykdom. Den er utarbeidet av Nasjonalt senter for bekkenbunnshelse (NBH) for å øke og spre kunnskap og kompetanse innen fagfeltet.",
      purpose: "Bekkenbunnsplager rammer mange kvinner og menn i alle aldre og mange opplever at lidelsene preges av tabu og stigma. Lekkasje (inkontinens) for luft, avføring og urin kan være vanskelig tema å snakke om. Som en følge av dette kan det være vanskelig å finne god og dekkende informasjon om denne typen problemer.",
      target: "Informasjonen på Bekkenbunnsportalen.no er ment for pasienter, pårørende og helsepersonell som jobber med disse ulike tilstandene. Her finner du faglig oppdatert og kvalitetssikret informasjon om ulike tilstander, utredning og behandling innen inkontinens og bekkenbunnsykdom. For helsepersonell finnes det også informasjon om nyttige verktøy og relevante kurs.",
      disclaimer: "Kompetanseportalen er ingen erstatning for undersøkelse eller behandling hos helsepersonell. Dersom du er syk eller trenger medisinsk hjelp av andre grunner, bør du oppsøke lege."
    },
    contact: {
      title: "Kontakt oss",
      email: "E-post",
      address: "Postadresse",
      links: "Du finner oss også her",
      disclaimer: "*Send aldri personopplysninger per e-post."
    },
    contributors: {
      title: "Bidragsytere",
      description: "Informasjonen på Bekkenbunnsportalen.no er levert av ulike fagpersoner og spesialister innen følgende fagområder; urologi, gastrokirurgi, gynekologi, fysioterapi, uroterapi, nevrologi og smertebehandling samt brukerrepresentant. Informasjonen er laget for å gi kunnskap om ulike dysfunksjoner og tilstander i bekkenet til både pasienter, pårørende og helsepersonell.",
      subtitle: "Følgende fagpersoner har bidratt med informasjon til portalen:"
    },
    resources: {
      title: "Informasjonsflyer",
      description: "Dersom du er helsepersonell og ønsker å informere dine pasienter om bekkenbunnsportalen.no, kan du enkelt skrive ut denne informasjonsfolderen og dele ut.",
      download: "Last ned informasjonsflyer (PDF)",
      note: "Flyeren gir oversikt over hva som her finnes av informasjon og er tilpasset A5 størrelse."
    },
    contributorsList: [
      { name: "Birke, Harriet.", title: "Urolog", institution: "St. Olavs Hospital" },
      { name: "Buntzen, Steen.", title: "Gastrokirurg", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Cathrine Boge-Olsnes.", title: "Spes.fysioterapeut", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Evjen, Kristin.", title: "Fysioterapeut/sexolog", institution: "" },
      { name: "Hagemann, Cecilie Therese.", title: "Overlege", institution: "St. Olavs Hospital" },
      { name: "Hanevold, Heidi.", title: "Fysioterapeut", institution: "Finnmarksykehuset, Hammerfest" },
      { name: "Haugstad, Gro Killi.", title: "Førsteamanuensis", institution: "Høgskolen i Oslo og Agder" },
      { name: "Johannessen, Kari.", title: "Spesialsykepleier", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Karoliussen, Clara.", title: "Fysioterapeut", institution: "St.Olavs Hospital" },
      { name: "Kirste, Unni.", title: "Gynekolog/smertelege", institution: "Rikshospitalet, Oslo Universitetssykehus" },
      { name: "Løkeland, Mette.", title: "Gynekolog", institution: "Betanien sykehus" },
      { name: "Løvvik, Anja.", title: "Urolog", institution: "Ahus. Oslo universitetssykehus" },
      { name: "Låhne, Per Espen.", title: "Urolog", institution: "Universitetsykehuset Nord-Norge" },
      { name: "Nicolaisen, Marianne.", title: "Uroterapeut", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Norderval, Stig.", title: "Gastrokirurg", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Nordgård, Anders.", title: "Urolog", institution: "Universitetsykehuset Nord-Norge, Harstad" },
      { name: "Nygaard, Ane Sigrid.", title: "Fysioterapeut", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Pedersen, Torunn.", title: "Spesialsykepleier", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Ramstad, Liv.", title: "Gynekolog", institution: "Ahus. Oslo universitetssykehus" },
      { name: "Ryland, Trude Karen.", title: "Sykepleier", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Schei, Berit.", title: "Professor ved institutt for samfunnsmedisin", institution: "NTNU" },
      { name: "Stafne, Signe.", title: "Fysioterapeut", institution: "St. Olavs Hospital" },
      { name: "Stedenfeldt, Mona.", title: "Fysioterapeut", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Sætherskar, Vibeke.", title: "Brukerrepresentant", institution: "" },
      { name: "Talseth, Trygve.", title: "Urolog", institution: "Rikshospitalet, Oslo Universitetssykehus" },
      { name: "Tollefsen, Hilde.", title: "Uroterapeut", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Verelst, Margareta.", title: "Gynekolog", institution: "Universitetsykehuset Nord-Norge, Tromsø" },
      { name: "Vold, Tine.", title: "Spes.fysioterapeut", institution: "Universitetsykehuset Nord-Norge, Tromsø" }
    ]
  },
  en: {
    hero: {
      title: "About Pelvic Floor Portal",
      subtitle: "A competence portal for incontinence and pelvic floor disorders"
    },
    portal: {
      title: "About Pelvic Floor Portal.no",
      description: "The Pelvic Floor Portal is a competence portal for incontinence and pelvic floor disorders. It is developed by the National Center for Pelvic Floor Health (NBH) to increase and spread knowledge and competence within the field.",
      purpose: "Pelvic floor problems affect many women and men of all ages, and many experience that the conditions are characterized by taboo and stigma. Leakage (incontinence) of air, stool, and urine can be a difficult topic to talk about. As a result, it can be difficult to find good and comprehensive information about this type of problem.",
      target: "The information on Pelvic Floor Portal.no is intended for patients, relatives, and healthcare personnel who work with these various conditions. Here you will find professionally updated and quality-assured information about various conditions, assessment, and treatment within incontinence and pelvic floor disorders. For healthcare personnel, there is also information about useful tools and relevant courses.",
      disclaimer: "The competence portal is not a replacement for examination or treatment by healthcare personnel. If you are sick or need medical help for other reasons, you should contact a doctor."
    },
    contact: {
      title: "Contact us",
      email: "Email",
      address: "Postal address",
      links: "You can also find us here",
      disclaimer: "*Never send personal information by email."
    },
    contributors: {
      title: "Contributors",
      description: "The information on Pelvic Floor Portal.no is provided by various professionals and specialists in the following fields; urology, gastrointestinal surgery, gynecology, physiotherapy, urotherapy, neurology, and pain management as well as user representatives. The information is created to provide knowledge about various dysfunctions and conditions in the pelvis to both patients, relatives, and healthcare personnel.",
      subtitle: "The following professionals have contributed information to the portal:"
    },
    resources: {
      title: "Information flyer",
      description: "If you are healthcare personnel and want to inform your patients about pelvic floor portal.no, you can easily print out this information folder and distribute it.",
      download: "Download information flyer (PDF)",
      note: "The flyer provides an overview of what information is available here and is adapted to A5 size."
    },
    contributorsList: [
      { name: "Birke, Harriet.", title: "Urologist", institution: "St. Olavs Hospital" },
      { name: "Buntzen, Steen.", title: "Gastrointestinal surgeon", institution: "University Hospital North Norway, Tromsø" },
      { name: "Cathrine Boge-Olsnes.", title: "Specialist physiotherapist", institution: "University Hospital North Norway, Tromsø" },
      { name: "Evjen, Kristin.", title: "Physiotherapist/sexologist", institution: "" },
      { name: "Hagemann, Cecilie Therese.", title: "Senior physician", institution: "St. Olavs Hospital" },
      { name: "Hanevold, Heidi.", title: "Physiotherapist", institution: "Finnmark Hospital, Hammerfest" },
      { name: "Haugstad, Gro Killi.", title: "Associate professor", institution: "Oslo and Agder University College" },
      { name: "Johannessen, Kari.", title: "Specialist nurse", institution: "University Hospital North Norway, Tromsø" },
      { name: "Karoliussen, Clara.", title: "Physiotherapist", institution: "St.Olavs Hospital" },
      { name: "Kirste, Unni.", title: "Gynecologist/pain physician", institution: "Rikshospitalet, Oslo University Hospital" },
      { name: "Løkeland, Mette.", title: "Gynecologist", institution: "Betanien Hospital" },
      { name: "Løvvik, Anja.", title: "Urologist", institution: "Ahus. Oslo University Hospital" },
      { name: "Låhne, Per Espen.", title: "Urologist", institution: "University Hospital North Norway" },
      { name: "Nicolaisen, Marianne.", title: "Urotherapist", institution: "University Hospital North Norway, Tromsø" },
      { name: "Norderval, Stig.", title: "Gastrointestinal surgeon", institution: "University Hospital North Norway, Tromsø" },
      { name: "Nordgård, Anders.", title: "Urologist", institution: "University Hospital North Norway, Harstad" },
      { name: "Nygaard, Ane Sigrid.", title: "Physiotherapist", institution: "University Hospital North Norway, Tromsø" },
      { name: "Pedersen, Torunn.", title: "Specialist nurse", institution: "University Hospital North Norway, Tromsø" },
      { name: "Ramstad, Liv.", title: "Gynecologist", institution: "Ahus. Oslo University Hospital" },
      { name: "Ryland, Trude Karen.", title: "Nurse", institution: "University Hospital North Norway, Tromsø" },
      { name: "Schei, Berit.", title: "Professor at the Department of Community Medicine", institution: "NTNU" },
      { name: "Stafne, Signe.", title: "Physiotherapist", institution: "St. Olavs Hospital" },
      { name: "Stedenfeldt, Mona.", title: "Physiotherapist", institution: "University Hospital North Norway, Tromsø" },
      { name: "Sætherskar, Vibeke.", title: "User representative", institution: "" },
      { name: "Talseth, Trygve.", title: "Urologist", institution: "Rikshospitalet, Oslo University Hospital" },
      { name: "Tollefsen, Hilde.", title: "Urotherapist", institution: "University Hospital North Norway, Tromsø" },
      { name: "Verelst, Margareta.", title: "Gynecologist", institution: "University Hospital North Norway, Tromsø" },
      { name: "Vold, Tine.", title: "Specialist physiotherapist", institution: "University Hospital North Norway, Tromsø" }
    ]
  }
} as const

export const About = () => {
  const { language } = useLanguage()
  const data = ABOUT_DATA[language]

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>

          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroLogo}>
              <img 
                src={language === 'no' ? "/norsk-logo.png" : "/english-logo.png"}
                alt={language === 'no' ? "Nasjonalt senter for bekkenbunnshelse logo" : "Norwegian Advisory Unit on Pelvic Floor Health logo"}
                className={styles.logoImage}
              />
            </div>
          </div>

          {/* About Portal */}
          <section className={styles.aboutPortalSection}>
            <Card className={styles.aboutPortalCard}>
              <CardContent className={styles.aboutPortalContent}>
                <h2 className={styles.sectionTitle}>{data.portal.title}</h2>
                
                <p className={styles.aboutPortalDescription}>
                  {data.portal.description}
                </p>

                <p className={styles.aboutPortalDescription}>
                  {data.portal.purpose}
                </p>

                <p className={styles.aboutPortalDescription}>
                  {data.portal.target}
                </p>

                <div className={styles.aboutPortalDisclaimer}>
                  <p className={styles.disclaimerText}>
                    <strong>Viktig:</strong> {data.portal.disclaimer}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact Section */}
          <section className={styles.contactSection}>
            <Card className={styles.contactCard}>
              <CardContent className={styles.contactContent}>
                <h2 className={styles.sectionTitle}>{data.contact.title}</h2>
                
                <div className={styles.contactGrid}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>📧</div>
                    <h3 className={styles.contactItemTitle}>{data.contact.email}</h3>
                    <p className={styles.contactItemText}>
                      <a href="mailto:nbh@unn.no">nbh@unn.no</a>
                    </p>
                    <p className={styles.contactItemText}>
                      <small>{data.contact.disclaimer}</small>
                    </p>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>📍</div>
                    <h3 className={styles.contactItemTitle}>{data.contact.address}</h3>
                    <p className={styles.contactItemText}>
                      Universitetssykehuset Nord-Norge<br />
                      Nasjonalt senter for bekkenbunnshelse<br />
                      Postboks 96<br />
                      9038 Tromsø
                    </p>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>🌐</div>
                    <h3 className={styles.contactItemTitle}>{data.contact.links}</h3>
                    <p className={styles.contactItemText}>
                      <a href="https://www.unn.no/nbh" target="_blank" rel="noopener noreferrer">NBH webside</a><br />
                      <a href="https://www.facebook.com/nbh.unn/" target="_blank" rel="noopener noreferrer">NBH på Facebook</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contributors Section */}
          <section className={styles.contributorsSection}>
            <Card className={styles.contributorsCard}>
              <CardContent className={styles.contributorsContent}>
                <h2 className={styles.sectionTitle}>{data.contributors.title}</h2>
                
                <p className={styles.contributorsDescription}>
                  {data.contributors.description}
                </p>

                <p className={styles.contributorsSubtitle}>
                  {data.contributors.subtitle}
                </p>

                <div className={styles.contributorsList}>
                  {data.contributorsList.map((contributor, index) => (
                    <div key={index} className={styles.contributorItem}>
                      <strong>{contributor.name}</strong> {contributor.title}
                      {contributor.institution && `. ${contributor.institution}`}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Resources Section */}
          <section className={styles.resourcesSection}>
            <Card className={styles.resourcesCard}>
              <CardContent className={styles.resourcesContent}>
                <h2 className={styles.sectionTitle}>{data.resources.title}</h2>
                <p className={styles.resourcesDescription}>
                  {data.resources.description}
                </p>
                <div className={styles.resourceLink}>
                  <a 
                    href="https://nekib.helsekompetanse.no/wp-content/uploads/2023/12/FLYER-bekkenbunnsportalen.no-redigert-19.12.23.pdf" 
                    target="_blank" 
                    rel="noopener"
                    className={styles.downloadLink}
                  >
                    📄 {data.resources.download}
                  </a>
                </div>
                <p className={styles.resourcesNote}>
                  {data.resources.note}
                </p>
              </CardContent>
            </Card>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default About
