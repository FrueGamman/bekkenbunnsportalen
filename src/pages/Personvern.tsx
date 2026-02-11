"use client"
import { Header } from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent } from "../components/ui/Card"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import styles from "./About.module.css"

const PERSONVERN_CONTENT = {
  no: {
  hero: {
    title: "Personvern og databehandling",
    subtitle: "GDPR og personvern i henhold til norsk lov",
    description:
      "Vi tar personvern på alvor og følger norsk personvernlov og GDPR. Denne siden beskriver hvordan vi samler inn, bruker og beskytter din informasjon.",
  },
  databehandler: {
    title: "Databehandler",
    orgName: "Universitetshospitalet Nord-Norge (UNN)",
    addressLines: ["Sykehusvegen 38", "9019 Tromsø"],
    orgNumber: "974 116 390",
    contactLabel: "Kontakt for personvernspørsmål:",
    email: "nbh@unn.no",
    phone: "+47 77 75 40 00",
  },
  dataCollection: {
    title: "Hvilke data samler vi inn?",
    noSensitiveHeader: "Vi samler IKKE inn følsomme helseopplysninger",
    noSensitiveText:
      "Bekkenbunnsportalen samler ikke inn, lagrer eller behandler følsomme helseopplysninger om brukere. Vi samler kun anonymiserte statistikkdata for å forbedre tjenesten.",
    collectedHeader: "Anonymiserte data vi kan samle:",
    collectedList: [
      "Sidevisninger og navigasjonsmønstre (anonymisert)",
      "Generell brukerstatistikk (uten personidentifikasjon)",
      "Tekniske data som nettlesertype og skjermstørrelse",
      "Feilmeldinger og ytelsesdata for teknisk forbedring",
    ],
    notCollectedHeader: "Data vi IKKE samler:",
    notCollectedList: [
      "Personlige helseopplysninger",
      "Medisinske diagnoser eller symptomer",
      "Personlig identifiserbar informasjon",
      "Kontaktinformasjon uten samtykke",
    ],
  },
  purpose: {
    title: "Formål med databehandling",
    mainHeader: "Hovedformål:",
    mainList: [
      "Tilby informasjon om bekkenbunnshelse",
      "Forbedre brukeropplevelsen på nettsiden",
      "Analysere anonymisert bruk for å optimalisere innhold",
      "Sikre teknisk stabilitet og sikkerhet",
    ],
    legalHeader: "Rettslig grunnlag:",
    legalText:
      "Databehandlingen skjer på grunnlag av offentlig interesse (artikkel 6(1)(e) i GDPR) for å tilby helseinformasjon til samfunnet.",
  },
  security: {
    title: "Infrastruktur og sikkerhet",
    infraHeader: "Godkjent infrastruktur:",
    infraText:
      "Tjenesten bruker godkjent infrastruktur fra Helse Nord og følger nasjonale sikkerhetsstandarder for helsevesenet.",
    measuresHeader: "Sikkerhetstiltak:",
    measuresList: [
      "Kryptert datatransport (HTTPS)",
      "Regelmessige sikkerhetsoppdateringer",
      "Tilgangskontroll og logging",
      "Backup og gjenopprettingsprosedyrer",
      "Overvåking av sikkerhetstrusler",
    ],
  },
  rights: {
    title: "Dine rettigheter",
    intro:
      "Siden vi ikke samler inn personopplysninger, gjelder ikke de vanlige GDPR-rettighetene. Men du har alltid rett til:",
    list: [
      "Informasjon om hvordan nettsiden fungerer",
      "Kontakt oss med spørsmål om personvern",
      "Rapportere sikkerhetsproblemer",
      "Be om endringer i innhold eller funksjonalitet",
    ],
  },
  cookies: {
    title: "Cookies og sporingsverktøy",
    necessaryHeader: "Nødvendige cookies:",
    necessaryText:
      "Vi bruker kun nødvendige cookies for å sikre at nettsiden fungerer korrekt. Disse kan ikke deaktiveres.",
    analyticsHeader: "Analytiske verktøy:",
    analyticsText:
      "Vi kan bruke anonymiserte analytiske verktøy for å forstå hvordan nettsiden brukes, uten å samle personopplysninger.",
    marketingHeader: "Ingen markedsføring:",
    marketingText:
      "Vi bruker ikke cookies eller sporingsverktøy for markedsføring eller profilering av brukere.",
  },
  changes: {
    title: "Endringer i personvernpolicy",
    text:
      "Vi kan oppdatere denne personvernpolicyen fra tid til annen. Eventuelle endringer vil bli publisert på denne siden med oppdatert dato.",
    updatedLabel: "Sist oppdatert:",
    updatedDate: "1. september 2025",
  },
  contact: {
    title: "Kontakt oss",
    intro:
      "Hvis du har spørsmål om personvern eller databehandling, kan du kontakte oss:",
    email: "nbh@unn.no",
    phone: "+47 77 75 40 00",
    address:
      "Universitetshospitalet Nord-Norge, Sykehusvegen 38, 9019 Tromsø",
  },
},
en: {
  hero: {
    title: "Privacy and Data Processing",
    subtitle: "GDPR and privacy in accordance with Norwegian law",
    description:
      "We take privacy seriously and follow Norwegian privacy law and GDPR. This page describes how we collect, use, and protect your information.",
  },
  databehandler: {
    title: "Data Controller",
    orgName: "University Hospital of North Norway (UNN)",
    addressLines: ["Sykehusvegen 38", "9019 Tromsø"],
    orgNumber: "974 116 390",
    contactLabel: "Contact for privacy inquiries:",
    email: "post@bekkenbunnsportalen.no",
    phone: "+47 77 75 40 00",
  },
  dataCollection: {
    title: "What data do we collect?",
    noSensitiveHeader: "We do NOT collect sensitive health information",
    noSensitiveText:
      "The Pelvic Floor Portal does not collect, store, or process sensitive health information about users. We only collect anonymized statistical data to improve the service.",
    collectedHeader: "Anonymized data we may collect:",
    collectedList: [
      "Page views and navigation patterns (anonymized)",
      "General user statistics (without personal identification)",
      "Technical data such as browser type and screen size",
      "Error messages and performance data for technical improvement",
    ],
    notCollectedHeader: "Data we do NOT collect:",
    notCollectedList: [
      "Personal health information",
      "Medical diagnoses or symptoms",
      "Personally identifiable information",
      "Contact information without consent",
    ],
  },
  purpose: {
    title: "Purpose of data processing",
    mainHeader: "Main purposes:",
    mainList: [
      "Provide information about pelvic floor health",
      "Improve user experience on the website",
      "Analyze anonymized usage to optimize content",
      "Ensure technical stability and security",
    ],
    legalHeader: "Legal basis:",
    legalText:
      "Data processing is based on public interest (Article 6(1)(e) of GDPR) to provide health information to the public.",
  },
  security: {
    title: "Infrastructure and security",
    infraHeader: "Approved infrastructure:",
    infraText:
      "The service uses approved infrastructure from Helse Nord and follows national security standards for the healthcare sector.",
    measuresHeader: "Security measures:",
    measuresList: [
      "Encrypted data transfer (HTTPS)",
      "Regular security updates",
      "Access control and logging",
      "Backup and recovery procedures",
      "Security threat monitoring",
    ],
  },
  rights: {
    title: "Your rights",
    intro:
      "Since we do not collect personal data, the usual GDPR rights do not apply. However, you always have the right to:",
    list: [
      "Information about how the website works",
      "Contact us with privacy questions",
      "Report security issues",
      "Request changes to content or functionality",
    ],
  },
  cookies: {
    title: "Cookies and tracking tools",
    necessaryHeader: "Necessary cookies:",
    necessaryText:
      "We only use necessary cookies to ensure the website functions correctly. These cannot be deactivated.",
    analyticsHeader: "Analytics tools:",
    analyticsText:
      "We may use anonymized analytics tools to understand how the website is used, without collecting personal information.",
    marketingHeader: "No marketing:",
    marketingText:
      "We do not use cookies or tracking tools for marketing or user profiling.",
  },
  changes: {
    title: "Changes to privacy policy",
    text:
      "We may update this privacy policy from time to time. Any changes will be published on this page with an updated date.",
    updatedLabel: "Last updated:",
    updatedDate: "September 1, 2025",
  },
  contact: {
    title: "Contact us",
    intro:
      "If you have questions about privacy or data processing, you can contact us:",
    email: "post@bekkenbunnsportalen.no",
    phone: "+47 77 75 40 00",
    address:
      "University Hospital of North Norway, Sykehusvegen 38, 9019 Tromsø",
  },
},
} as const

export const Personvern = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  
  const personvernContent = PERSONVERN_CONTENT[language]

  return (
    <>
      <Header />
      <main id="main-content" role="main" className={`${styles.container} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`} >
        <div className={styles.heroSectionPersonel}>
          <h1 className={styles.heroTitle}>{personvernContent.hero.title}</h1>
          <h2 className={styles.heroSubtitle}>{personvernContent.hero.subtitle}</h2>
          <p className={styles.heroDescription}>{personvernContent.hero.description}</p>
        </div>
        <div className={styles.personvernWrapper}>
          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.databehandler.title}</h2>
            <Card>
              <CardContent>
                <p>
                  <strong>{personvernContent.databehandler.orgName}</strong><br />
                  {personvernContent.databehandler.addressLines[0]}<br />
                  {personvernContent.databehandler.addressLines[1]}<br />
                  Organisasjonsnummer: {personvernContent.databehandler.orgNumber}
                </p>
                <p>
                  <strong>{personvernContent.databehandler.contactLabel}</strong><br />
                  E-post: <a href={`mailto:${personvernContent.databehandler.email}`}>{personvernContent.databehandler.email}</a><br />
                  Telefon: <a href={`tel:${personvernContent.databehandler.phone.replace(/\s/g, '')}`}>{personvernContent.databehandler.phone}</a>
                </p>
              </CardContent>
            </Card>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.dataCollection.title}</h2>
            <Card>
              <CardContent>
                <h3>{personvernContent.dataCollection.noSensitiveHeader}</h3>
                <p>{personvernContent.dataCollection.noSensitiveText}</p>

                <h3>{personvernContent.dataCollection.collectedHeader}</h3>
                <ul>
                  {personvernContent.dataCollection.collectedList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h3>{personvernContent.dataCollection.notCollectedHeader}</h3>
                <ul>
                  {personvernContent.dataCollection.notCollectedList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.purpose.title}</h2>
            <Card>
              <CardContent>
                <h3>{personvernContent.purpose.mainHeader}</h3>
                <ul>
                  {personvernContent.purpose.mainList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h3>{personvernContent.purpose.legalHeader}</h3>
                <p>{personvernContent.purpose.legalText}</p>
              </CardContent>
            </Card>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.security.title}</h2>
            <Card>
              <CardContent>
                <h3>{personvernContent.security.infraHeader}</h3>
                <p>{personvernContent.security.infraText}</p>

                <h3>{personvernContent.security.measuresHeader}</h3>
                <ul>
                  {personvernContent.security.measuresList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.rights.title}</h2>
            <Card>
              <CardContent>
                <p>{personvernContent.rights.intro}</p>
                <ul>
                  {personvernContent.rights.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.cookies.title}</h2>
            <Card>
              <CardContent>
                <h3>{personvernContent.cookies.necessaryHeader}</h3>
                <p>{personvernContent.cookies.necessaryText}</p>

                <h3>{personvernContent.cookies.analyticsHeader}</h3>
                <p>{personvernContent.cookies.analyticsText}</p>

                <h3>{personvernContent.cookies.marketingHeader}</h3>
                <p>{personvernContent.cookies.marketingText}</p>
              </CardContent>
            </Card>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.changes.title}</h2>
            <Card>
              <CardContent>
                <p>{personvernContent.changes.text}</p>
                <p>
                  <strong>{personvernContent.changes.updatedLabel}</strong> {personvernContent.changes.updatedDate}
                </p>
              </CardContent>
            </Card>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>{personvernContent.contact.title}</h2>
            <Card>
              <CardContent>
                <p>{personvernContent.contact.intro}</p>
                <p>
                  <strong>E-post:</strong> <a href={`mailto:${personvernContent.contact.email}`}>{personvernContent.contact.email}</a><br />
                  <strong>Telefon:</strong> <a href={`tel:${personvernContent.contact.phone.replace(/\s/g, '')}`}>{personvernContent.contact.phone}</a><br />
                  <strong>Post:</strong> {personvernContent.contact.address}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Personvern
