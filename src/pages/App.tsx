"use client";
import { Card, CardContent } from "../components/ui/Card";
import { Separator } from "../components/ui/Separator";
import { useLanguage } from "../context/LanguageContext";
import Footer from "../components/Footer";

import { Header } from "../components/Header";
import styles from "./App.module.css";
import { HeroSection } from "../components/hero-section";
import { TryExerciseSection } from "../components/try-exercise-section";
import { ElearningSection } from "../components/elearning-section";
import { ElearningHeroSection } from "../components/elearning-hero-section";
import { ConferenceSection } from "../components/conference-section";
import { TestimonialSection } from "../components/testimonial-section";
import BackgroundVideoGroup from "../components/BackgroundVideoGroup";
import { useHomepageData } from "../hooks/useHomepageData";
import { getImageUrl } from "../lib/directus";

// Structured bilingual data for App content (Fallbacks)
const APP_DATA = {
  no: {
    organizations: {
      title: "Pasient- og brukerorganisasjoner",
      description: "Pasient- og brukerorganisasjonene er interesseorganisasjoner som arbeider for personer med sykdom og nedsatt funksjonsevne. Under finner du en oversikt over aktuelle organisasjoner innenfor inkontinens og bekkenbunnsykdom."
    }
  },
  en: {
    organizations: {
      title: "Patient and User Organizations",
      description: "Patient and user organizations are advocacy groups that work for people with illness and reduced functional ability. Below you will find an overview of relevant organizations within incontinence and pelvic floor disorders."
    }
  }
} as const;

export const App = () => {
  const { language } = useLanguage()
  const { data: cmsData, loading } = useHomepageData(language)
  const fallbackData = APP_DATA[language]

  console.log("App component loaded", { language, loading, hasCmsData: !!cmsData })

  return (
    <div className={`${styles.container} ${styles.noOverlay}`}>
      {/* Header Navigation */}
      <Header />

      <main id="main-content" role="main" className={styles.mainContent}>
        {/* Hero Section */}
        <HeroSection cmsData={cmsData ? {
          title: cmsData.hero.title,
          description: cmsData.hero.description,
          subtitle: cmsData.hero.subtitle,
          conditions: cmsData.conditions
        } : undefined} />

        {/* Try Exercise Section - Prøv selv */}
        <TryExerciseSection cmsData={cmsData ? {
          title: "Bekkenbunnsøvelser", // Using static title as it is often consistent
          subtitle: "Lær å styrke bekkenbunnen med målrettede øvelser",
          description: "Bekkenbunnen består av muskler som støtter underlivsorganene. Regelmessig trening kan forebygge og behandle plager."
        } : undefined} />

        {/* Testimonial + Pasientundervisning over sticky background video */}
        <BackgroundVideoGroup initialSpacer={0}>
        </BackgroundVideoGroup>
        <TestimonialSection cmsData={cmsData ? {
          title: "Pasienthistorier og erfaringer",
          subtitle: "Hør fra andre som har opplevd bekkenbunnsplager",
          intro: "Disse historiene viser at du ikke er alene, og at det finnes hjelp å få. Mange har funnet måter å håndtere sine plager på.",
          testimonials: cmsData.testimonials
        } : undefined} />

        <ElearningSection cmsData={cmsData ? cmsData.elearning : undefined} />

        {/* E-learning Hero Section - For Healthcare Professionals */}
        <ElearningHeroSection cmsData={cmsData ? {
          title: "E-læringskurs for helsepersonell",
          description: "Vi har utviklet et e-læringskurs spesielt rettet mot helsepersonell som ønsker å øke sin kompetanse innen utredning og behandling av bekkenbunnssykdom."
        } : undefined} />

        {/* Arctic Pelvic Floor Meeting / Conference Section */}
        <ConferenceSection cmsData={cmsData ? cmsData.conference : undefined} />

        {/* Additional Resources Section --Organisation cards*/}
        <section className={styles.resourcesSection} aria-labelledby="organizations-heading">
          <div className={styles.sectionHeader}>
            <h2 id="organizations-heading" className={styles.sectionTitle}>
              {cmsData ? "Pasient- og brukerorganisasjoner" : fallbackData.organizations.title}
            </h2>
            <p className={styles.sectionDescription}>
              {cmsData ? "Pasient- og brukerorganisasjonene er interesseorganisasjoner som arbeider for personer med sykdom og nedsatt funksjonsevne. Under finner du en oversikt over aktuelle organisasjoner innenfor inkontinens og bekkenbunnsykdom." : fallbackData.organizations.description}
            </p>
          </div>
          <div className={styles.resourcesContainer}>
            {cmsData && cmsData.organizations && cmsData.organizations.length > 0 ? (
              cmsData.organizations.map((org, index) => (
                <Card key={index} className={styles.resourceCard}>
                  <CardContent className={styles.resourceCardContent}>
                    <div className={styles.resourceImageContainer}>
                      <a
                        href={org.url}
                        className={styles.resourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Gå til ${org.name} nettside`}
                      >
                        {org.logo ? (
                          <img
                            className={styles.resourceImage}
                            alt={org.name}
                            src={getImageUrl(org.logo)}
                            style={{ width: "140px", objectFit: "contain" }}
                          />
                        ) : (
                          <div className={styles.resourceLogoPlaceholder}>
                            {org.name}
                          </div>
                        )}
                      </a>
                    </div>
                    <Separator className={styles.resourceSeparator} />
                    <p className={styles.resourceInfoText}>{org.name}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {/* Fallback hardcoded organizations if CMS is empty or loading */}
                <Card className={styles.resourceCard}>
                  <CardContent className={styles.resourceCardContent}>
                    <div className={styles.resourceImageContainer}>
                      <a
                        href="https://barselambassadorene.no"
                        className={styles.resourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Gå til Barselambassadørene nettside">
                        <img
                          className={styles.resourceImage}
                          alt="Barselambassadørene"
                          src="/ba-logo.svg"
                          style={{ width: "140px" }}
                        />
                      </a>
                    </div>
                    <Separator className={styles.resourceSeparator} />
                    <p className={styles.resourceInfoText}>Barselambassadørene</p>
                  </CardContent>
                </Card>
                {/* ... other hardcoded cards ... */}
              </>
            )}
          </div>
        </section>

        {/* Footer */}
      </main>
      <Footer />
    </div>
  );
};
