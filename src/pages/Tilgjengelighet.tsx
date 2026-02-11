"use client"
import { useState } from "react"
import { Header } from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { useLanguage } from "../context/LanguageContext"
import styles from "./About.module.css"

export const Tilgjengelighet = () => {
  const { t } = useLanguage()
  const [feedback, setFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log("Accessibility feedback:", feedback)
    setIsSubmitted(true)
    setFeedback("")
  }

  const lastUpdated = "2025-09-01" // This could be automated from git commit

  return (
    <>
      <Header />
      <main id="main-content" role="main" className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>{t("accessibility.title")}</h1>
          <h2 className={styles.heroSubtitle}>{t("accessibility.subtitle")}</h2>
          <p className={styles.heroDescription}>
            {t("accessibility.description")}
          </p>
          <p className={styles.lastUpdated}>
            <strong>{t("accessibility.last.updated")}</strong> {lastUpdated}
          </p>
        </div>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>{t("accessibility.scope.title")}</h2>
          <Card>
            <CardContent>
              <p>
                {t("accessibility.scope.content")}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>{t("accessibility.wcag.title")}</h2>
          <Card>
            <CardContent>
              <h3>{t("accessibility.wcag.new.requirements")}</h3>
              <ul>
                <li><strong>{t("accessibility.wcag.focus")}</strong> {t("accessibility.wcag.focus.desc")}</li>
                <li><strong>{t("accessibility.wcag.target.size")}</strong> {t("accessibility.wcag.target.size.desc")}</li>
                <li><strong>{t("accessibility.wcag.dragging")}</strong> {t("accessibility.wcag.dragging.desc")}</li>
                <li><strong>{t("accessibility.wcag.auth")}</strong> {t("accessibility.wcag.auth.desc")}</li>
                <li><strong>{t("accessibility.wcag.help")}</strong> {t("accessibility.wcag.help.desc")}</li>
                <li><strong>{t("accessibility.wcag.redundant")}</strong> {t("accessibility.wcag.redundant.desc")}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>{t("accessibility.features.title")}</h2>
          <Card>
            <CardContent>
              <h3>{t("accessibility.features.implemented")}</h3>
              <ul>
                <li>{t("accessibility.features.semantic")}</li>
                <li>{t("accessibility.features.keyboard")}</li>
                <li>{t("accessibility.features.aria")}</li>
                <li>{t("accessibility.features.contrast")}</li>
                <li>{t("accessibility.features.alt.text")}</li>
                <li>{t("accessibility.features.audio")}</li>
                <li>{t("accessibility.features.responsive")}</li>
                <li>{t("accessibility.features.screen.reader")}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>{t("accessibility.feedback.title")}</h2>
          <Card>
            <CardContent>
              <p>
                {t("accessibility.feedback.content")}
                {" "}
                <a href="mailto:nbh@unn.no">nbh@unn.no</a> 
                {" "}{t("accessibility.feedback.or.phone")} {" "}
                <a href="tel:+4777754000">+47 77 75 40 00</a>.
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                  <h3>Tilgjengelighetstilbakemelding</h3>
                  <label htmlFor="feedback" className={styles.feedbackLabel}>
                    Beskriv eventuelle tilgjengelighetsproblemer eller forslag:
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className={styles.feedbackTextarea}
                    rows={5}
                    required
                    aria-describedby="feedback-help"
                  />
                  <p id="feedback-help" className={styles.feedbackHelp}>
                    Din tilbakemelding hjelper oss med å forbedre tilgjengeligheten på nettsiden.
                  </p>
                  <Button type="submit" className={styles.submitButton}>
                    Send tilbakemelding
                  </Button>
                </form>
              ) : (
                <div className={styles.successMessage}>
                  <p>Takk for din tilbakemelding! Vi vil vurdere den og komme tilbake til deg.</p>
                  <Button onClick={() => setIsSubmitted(false)}>
                    Send ny tilbakemelding
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>{t("accessibility.enforcement.title")}</h2>
          <Card>
            <CardContent>
              <p>
                {t("accessibility.enforcement.content")}
              </p>
              <p>
                <strong>Kontakt Digitaliseringsdirektoratet:</strong><br />
                E-post: <a href="mailto:post@digdir.no">post@digdir.no</a><br />
                Telefon: <a href="tel:+4722001200">22 00 12 00</a>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Tilgjengelighet
