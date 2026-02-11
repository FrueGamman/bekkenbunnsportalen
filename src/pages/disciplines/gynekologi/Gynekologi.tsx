"use client"
import { useState } from "react"
// import { useLanguage } from "../../../context/LanguageContext" // Not used yet
import { Header } from "../../../components/Header"
import Footer from "../../../components/Footer"
import { Card, CardContent } from "../../../components/ui/Card"
import styles from "./Gynekologi.module.css"

export const Gynekologi = () => {
  // const { t } = useLanguage() // Not used yet, will be used for translations
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", label: "Oversikt" },
    { id: "diagnosis", label: "Utredning" },
    { id: "treatment", label: "Behandling" },
    { id: "pregnancy", label: "Graviditet og fødsel" },
    { id: "prolapse", label: "Prolaps" },
    { id: "resources", label: "Ressurser" },
  ]

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Gynekologi</h1>
          <p className={styles.heroDescription}>
            Spesialisert gynekologisk utredning og behandling av bekkenbunnsdysfunksjoner hos kvinner.
          </p>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`${styles.tabButton} ${activeSection === section.id ? styles.tabButtonActive : ""}`}
                role="tab"
                aria-selected={activeSection === section.id}
                aria-controls={`tabpanel-${section.id}`}
                id={`tab-${section.id}`}
                tabIndex={activeSection === section.id ? 0 : -1}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.contentContainer}>
          {activeSection === "overview" && (
            <div className={styles.tabPanel} role="tabpanel" id="tabpanel-overview" aria-labelledby="tab-overview">
              <Card className={styles.contentCard}>
                <CardContent className={styles.cardContent}>
                  <h2 className={styles.sectionTitle}>Gynekologisk oversikt</h2>
                  <p className={styles.sectionDescription}>
                    Gynekologi fokuserer på kvinnens reproduktive helse og bekkenbunnsfunksjoner. 
                    Som gynekolog jobber du med utredning og behandling av ulike bekkenbunnsdysfunksjoner 
                    som kan påvirke kvinners livskvalitet.
                  </p>
                  
                  <div className={styles.highlightBox}>
                    <h3 className={styles.highlightTitle}>Vanlige gynekologiske bekkenbunnsplager:</h3>
                    <ul className={styles.highlightList}>
                      <li>Urinlekkasje (stressinkontinens, urgeinkontinens)</li>
                      <li>Avføringslekkasje</li>
                      <li>Bekkenbunnsprolaps (fremfall av organer)</li>
                      <li>Bekkenbunnssmerter</li>
                      <li>Seksuelle dysfunksjoner</li>
                      <li>Plager etter fødsel</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "diagnosis" && (
            <div className={styles.tabPanel} role="tabpanel" id="tabpanel-diagnosis" aria-labelledby="tab-diagnosis">
              <Card className={styles.contentCard}>
                <CardContent className={styles.cardContent}>
                  <h2 className={styles.sectionTitle}>Gynekologisk utredning</h2>
                  <p className={styles.sectionDescription}>
                    Systematisk tilnærming til utredning av bekkenbunnsdysfunksjoner hos kvinner.
                  </p>
                  
                  <div className={styles.diagnosisSection}>
                    <h3 className={styles.subsectionTitle}>Anamnese og symptomer</h3>
                    <ul className={styles.diagnosisList}>
                      <li>Detaljert anamnese om urinlekkasje, avføringslekkasje og smerter</li>
                      <li>Graviditets- og fødehistorikk</li>
                      <li>Seksuell funksjon og livskvalitet</li>
                      <li>Medikamentbruk og komorbiditeter</li>
                    </ul>
                  </div>

                  <div className={styles.diagnosisSection}>
                    <h3 className={styles.subsectionTitle}>Klinisk undersøkelse</h3>
                    <ul className={styles.diagnosisList}>
                      <li>Gynekologisk undersøkelse med spekulum</li>
                      <li>Bimanuell undersøkelse av bekkenbunnen</li>
                      <li>Vurdering av prolaps (POP-Q klassifisering)</li>
                      <li>Bekkenbunnsmuskulatur vurdering</li>
                    </ul>
                  </div>

                  <div className={styles.diagnosisSection}>
                    <h3 className={styles.subsectionTitle}>Spesialiserte undersøkelser</h3>
                    <ul className={styles.diagnosisList}>
                      <li>Urodynamisk undersøkelse</li>
                      <li>Ultrasonografi av bekkenbunnen</li>
                      <li>MR-undersøkelse ved komplekse tilfeller</li>
                      <li>Endoskopiske undersøkelser</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "treatment" && (
            <div className={styles.tabPanel} role="tabpanel" id="tabpanel-treatment" aria-labelledby="tab-treatment">
              <Card className={styles.contentCard}>
                <CardContent className={styles.cardContent}>
                  <h2 className={styles.sectionTitle}>Gynekologisk behandling</h2>
                  <p className={styles.sectionDescription}>
                    Evidensbaserte behandlingsmetoder for gynekologiske bekkenbunnsplager.
                  </p>
                  
                  <div className={styles.treatmentSection}>
                    <h3 className={styles.subsectionTitle}>Konservativ behandling</h3>
                    <ul className={styles.treatmentList}>
                      <li>Bekkenbunnstrening og fysioterapi</li>
                      <li>Livsstilsendringer og vektkontroll</li>
                      <li>Medikamentell behandling</li>
                      <li>Pessar ved prolaps</li>
                    </ul>
                  </div>

                  <div className={styles.treatmentSection}>
                    <h3 className={styles.subsectionTitle}>Kirurgisk behandling</h3>
                    <ul className={styles.treatmentList}>
                      <li>Stressinkontinens kirurgi (TVT, TOT)</li>
                      <li>Prolaps kirurgi (sakrokolpopexi, vaginale operasjoner)</li>
                      <li>Rekonstruktive inngrep</li>
                      <li>Minimalt invasive teknikker</li>
                    </ul>
                  </div>

                  <div className={styles.treatmentSection}>
                    <h3 className={styles.subsectionTitle}>Tverrfaglig samarbeid</h3>
                    <ul className={styles.treatmentList}>
                      <li>Fysioterapeutisk behandling</li>
                      <li>Urologisk konsultasjon</li>
                      <li>Psykologisk støtte</li>
                      <li>Ergoterapeutisk veiledning</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "pregnancy" && (
            <div className={styles.tabPanel} role="tabpanel" id="tabpanel-pregnancy" aria-labelledby="tab-pregnancy">
              <Card className={styles.contentCard}>
                <CardContent className={styles.cardContent}>
                  <h2 className={styles.sectionTitle}>Graviditet og fødsel</h2>
                  <p className={styles.sectionDescription}>
                    Spesielle hensyn ved bekkenbunnsplager under graviditet og etter fødsel.
                  </p>
                  
                  <div className={styles.pregnancySection}>
                    <h3 className={styles.subsectionTitle}>Under graviditet</h3>
                    <ul className={styles.pregnancyList}>
                      <li>Forebygging av bekkenbunnsplager</li>
                      <li>Bekkenbunnstrening under graviditet</li>
                      <li>Håndtering av eksisterende plager</li>
                      <li>Forberedelse til fødsel</li>
                    </ul>
                  </div>

                  <div className={styles.pregnancySection}>
                    <h3 className={styles.subsectionTitle}>Etter fødsel</h3>
                    <ul className={styles.pregnancyList}>
                      <li>Vurdering av fødselskader</li>
                      <li>Rehabilitering av bekkenbunnen</li>
                      <li>Behandling av fødselsrelaterte plager</li>
                      <li>Langsiktig oppfølging</li>
                    </ul>
                  </div>

                  <div className={styles.pregnancySection}>
                    <h3 className={styles.subsectionTitle}>Fødselsforberedelse</h3>
                    <ul className={styles.pregnancyList}>
                      <li>Optimal fødselsstilling</li>
                      <li>Perineal beskyttelse</li>
                      <li>Episiotomi og perineal sutur</li>
                      <li>Postpartum bekkenbunnsrehabilitering</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "prolapse" && (
            <div className={styles.tabPanel} role="tabpanel" id="tabpanel-prolapse" aria-labelledby="tab-prolapse">
              <Card className={styles.contentCard}>
                <CardContent className={styles.cardContent}>
                  <h2 className={styles.sectionTitle}>Bekkenbunnsprolaps</h2>
                  <p className={styles.sectionDescription}>
                    Utredning og behandling av organfremfall i bekkenet.
                  </p>
                  
                  <div className={styles.prolapseSection}>
                    <h3 className={styles.subsectionTitle}>POP-Q klassifisering</h3>
                    <ul className={styles.prolapseList}>
                      <li>Anterior kompartement (cystocele)</li>
                      <li>Posterior kompartement (rectocele)</li>
                      <li>Apikal kompartement (uterusprolaps)</li>
                      <li>Vaginal cuff prolaps</li>
                    </ul>
                  </div>

                  <div className={styles.prolapseSection}>
                    <h3 className={styles.subsectionTitle}>Behandlingsalternativer</h3>
                    <ul className={styles.prolapseList}>
                      <li>Konservativ behandling med pessar</li>
                      <li>Bekkenbunnstrening</li>
                      <li>Vaginal kirurgi</li>
                      <li>Laparoskopisk sakrokolpopexi</li>
                      <li>Robotassistert kirurgi</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "resources" && (
            <div className={styles.tabPanel} role="tabpanel" id="tabpanel-resources" aria-labelledby="tab-resources">
              <Card className={styles.contentCard}>
                <CardContent className={styles.cardContent}>
                  <h2 className={styles.sectionTitle}>Ressurser for gynekologer</h2>
                  <p className={styles.sectionDescription}>
                    Faglige ressurser og verktøy for gynekologisk bekkenbunnsarbeid.
                  </p>
                  
                  <div className={styles.resourcesSection}>
                    <h3 className={styles.subsectionTitle}>Faglige retningslinjer</h3>
                    <ul className={styles.resourcesList}>
                      <li>
                        <a href="https://www.legeforeningen.no/" target="_blank" rel="noopener noreferrer">
                          Norsk gynekologisk forening - Retningslinjer
                        </a>
                      </li>
                      <li>
                        <a href="https://www.ics.org/" target="_blank" rel="noopener noreferrer">
                          International Continence Society
                        </a>
                      </li>
                      <li>
                        <a href="https://www.augs.org/" target="_blank" rel="noopener noreferrer">
                          American Urogynecologic Society
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.resourcesSection}>
                    <h3 className={styles.subsectionTitle}>E-læringskurs</h3>
                    <ul className={styles.resourcesList}>
                      <li>
                        <a href="https://helsekompetanse.no/" target="_blank" rel="noopener noreferrer">
                          Utredning og behandling av bekkenbunnsdysfunksjoner
                        </a>
                      </li>
                      <li>
                        <a href="https://kursbygger.ihelse.net/?startcourseid=726" target="_blank" rel="noopener noreferrer">
                          Fremfall av underlivsorganer (underlivsprolaps)
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.resourcesSection}>
                    <h3 className={styles.subsectionTitle}>Verktøy og skjemaer</h3>
                    <ul className={styles.resourcesList}>
                      <li>POP-Q klassifiseringsskjema</li>
                      <li>Bekkenbunnssymptom spørreskjema</li>
                      <li>Livskvalitetsskalaer</li>
                      <li>Urodynamisk undersøkelse protokoll</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
