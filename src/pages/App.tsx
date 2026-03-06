"use client";
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
import HomepageOrganizations from "../components/HomepageOrganizations";

export const App = () => {
  const { language } = useLanguage()
  const { data: cmsData, loading } = useHomepageData(language)

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
        <TryExerciseSection cmsData={cmsData ? cmsData.exercises : undefined} />

        {/* Testimonial + Pasientundervisning over sticky background video */}
        <BackgroundVideoGroup initialSpacer={0}>
        </BackgroundVideoGroup>
        <TestimonialSection cmsData={cmsData ? {
          title: cmsData.testimonials.title,
          subtitle: "",
          intro: cmsData.testimonials.description,
          testimonials: []
        } : undefined} />

        <ElearningSection cmsData={cmsData ? cmsData.education : undefined} />

        {/* E-learning Hero Section - For Healthcare Professionals */}
        <ElearningHeroSection cmsData={cmsData ? {
          title: cmsData.elearning.title,
          description: cmsData.elearning.description,
          buttonText: cmsData.elearning.buttonText,
          url: cmsData.elearning.url,
          image: cmsData.elearning.image
        } : undefined} />

        {/* Arctic Pelvic Floor Meeting / Conference Section */}
        <ConferenceSection cmsData={cmsData ? cmsData.conference : undefined} />

        {/* Additional Resources Section --Organisation cards*/}
        <HomepageOrganizations organizations={cmsData?.organizations} />

        {/* Footer */}
      </main>
      <Footer />
    </div>
  );
};
