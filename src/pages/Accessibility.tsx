"use client"
import { Header } from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent } from "../components/ui/Card"
import styles from "./About.module.css"

export const Accessibility = () => {

  return (
    <>
      <Header />
      <main id="main-content" role="main" className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Accessibility statement</h1>
          <h2 className={styles.heroSubtitle}>WCAG 2.2 AA and EAA 2025 compliance</h2>
          <p className={styles.heroDescription}>
            This service is developed to meet WCAG 2.2 level AA in accordance with the Norwegian Anti-Discrimination and Accessibility Act and the European Accessibility Act (EAA 2025).
          </p>
        </div>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Scope</h2>
          <Card>
            <CardContent>
              <p>
                The statement covers our website and mobile views. We continuously work to ensure all functionality is operable by keyboard, has logical focus order, visible focus styles, sufficient colour contrast, proper semantics/ARIA, accessible forms and error handling, and accessible multimedia.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>WCAG 2.2 AA Requirements</h2>
          <Card>
            <CardContent>
              <h3>New requirements in WCAG 2.2:</h3>
              <ul>
                <li><strong>Focus Not Obscured:</strong> Focus indicators are always visible</li>
                <li><strong>Target Size:</strong> All clickable elements are at least 24x24 pixels</li>
                <li><strong>Dragging Alternatives:</strong> All drag functions have keyboard alternatives</li>
                <li><strong>Accessible Authentication:</strong> No CAPTCHA or complex security tests</li>
                <li><strong>Consistent Help:</strong> Help functions are available consistently across all pages</li>
                <li><strong>Redundant Entry:</strong> Users are not forced to enter the same information multiple times</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Accessibility Features</h2>
          <Card>
            <CardContent>
              <h3>Implemented features:</h3>
              <ul>
                <li>Semantic HTML structure with proper headings and landmarks</li>
                <li>Complete keyboard navigation with visible focus indicators</li>
                <li>ARIA labels and roles where necessary</li>
                <li>High contrast between text and background (minimum 4.5:1)</li>
                <li>Alternative text for all images</li>
                <li>Accessible audio player with transcripts</li>
                <li>Responsive design that works on all devices</li>
                <li>Screen reader compatible navigation</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Feedback and contact</h2>
          <Card>
            <CardContent>
              <p>
                If you experience barriers, need content in another format, or want to report an accessibility issue, please contact us at
                {" "}
                <a href="mailto:nbh@unn.no">nbh@unn.no</a>
                {" "}
                or phone
                {" "}
                <a href="tel:+4777754000">+47 77 75 40 00</a>.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Enforcement</h2>
          <Card>
            <CardContent>
              <p>
                The Digitalisation Agency (Digitaliseringsdirektoratet) supervises compliance. You can lodge a complaint with the authority if you do not receive a satisfactory response to your feedback.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Accessibility


