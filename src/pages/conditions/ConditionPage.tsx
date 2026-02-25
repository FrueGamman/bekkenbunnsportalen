"use client";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./ConditionPage.module.css";
import { useConditionDetails } from "../../hooks/useConditionDetails";
import { TilstandDynamicSection } from "../../components/TilstandDynamicSection";
import { TilstandIntroduction } from "../../components/TilstandIntroduction";

// Import pregnancy components (pregnancy has unique UI not in standard CMS pattern)
import { NormalFunctions as PregnancyNormalFunctions } from "../../conditions/pregnancy/components/normal-functions";
import { UpgradedPregnancyContent } from "../../conditions/pregnancy/components/UpgradedPregnancyContent";

const PREGNANCY_SECTION_CARDS = {
  no: [
    {
      id: "symptoms",
      title: "Symptomer",
      description:
        "Denne seksjonen gir deg grundig informasjon om symptomer og tegn som kan oppstå under graviditet og etter fødsel.",
      icon: "/symptoms.png",
    },
    {
      id: "causes",
      title: "Årsaker",
      description:
        "Under graviditet og fødsel skjer det endringer i bekkenbunnen som kan påvirke vannlatning, avføring og seksualfunksjon.",
      icon: "/couse.png",
    },
    {
      id: "diagnosis",
      title: "Utredning",
      description:
        "Denne seksjonen gir oversikt over undersøkelser, tester og vurderinger som brukes ved bekkenbunnsplager.",
      icon: "/solae.png",
    },
    {
      id: "treatment",
      title: "Behandling",
      description:
        "Her finner du kunnskap om konservativ behandling, praktiske råd og håndtering av bekkenbunnsplager.",
      icon: "/treat.png",
    },
    {
      id: "exercises",
      title: "Øvelser",
      description:
        "Utforsk bekkenbunnsøvelser, avspenningsteknikker og treningsråd for svangerskap og barseltid.",
      icon: "/exercises.png",
    },
    {
      id: "textbook",
      title: "Lærebok",
      description:
        "Fordyp deg i lærebokens kapitler om bekkenbunnens anatomi, påvirkning og tilheling etter fødsel.",
      icon: "/normal.png",
    },
    {
      id: "resources",
      title: "Ressurser",
      description:
        "Her finner du lenker til kompetansetjenester, organisasjoner og nyttige hjelpemidler.",
      icon: "/resource.png",
    },
    {
      id: "references",
      title: "Referanser",
      description:
        "Les faglige kilder, retningslinjer og studier som ligger til grunn for innholdet.",
      icon: "/resource.png",
    },
  ],
  en: [
    {
      id: "symptoms",
      title: "Symptoms",
      description:
        "This section provides detailed information about symptoms and signs that may occur during pregnancy and after birth.",
      icon: "/symptoms.png",
    },
    {
      id: "causes",
      title: "Causes",
      description:
        "During pregnancy and childbirth, changes occur in the pelvic floor that can affect urination, bowel function, and sexual health.",
      icon: "/couse.png",
    },
    {
      id: "diagnosis",
      title: "Diagnosis",
      description:
        "Explore the examinations, tests, and assessments used to evaluate pelvic floor issues.",
      icon: "/solae.png",
    },
    {
      id: "treatment",
      title: "Treatment",
      description:
        "Learn about conservative treatment options, practical advice, and everyday management strategies.",
      icon: "/treat.png",
    },
    {
      id: "exercises",
      title: "Exercises",
      description:
        "Discover pelvic floor exercises, relaxation techniques, and training tips for pregnancy and postpartum.",
      icon: "/exercises.png",
    },
    {
      id: "textbook",
      title: "Textbook",
      description:
        "Dive into textbook chapters covering pelvic floor anatomy, pregnancy impact, and recovery after birth.",
      icon: "/normal.png",
    },
    {
      id: "resources",
      title: "Resources",
      description:
        "Access links to specialist services, organisations, and practical tools.",
      icon: "/resource.png",
    },
    {
      id: "references",
      title: "References",
      description:
        "Review the scientific articles, guidelines, and evidence supporting the content.",
      icon: "/resource.png",
    },
  ],
} as const;

// All conditions for the top navigation - bilingual
const ALL_CONDITIONS_DATA = {
  no: [
    { id: "urinary-incontinence", title: "Urinlekkasje", icon: "/image-7.svg" },
    {
      id: "urinary-retention",
      title: "Tømmingsproblemer for urin",
      icon: "/vector.svg",
    },
    {
      id: "fecal-incontinence",
      title: "Avføringslekkasje",
      icon: "/fecalincontinence.svg",
    },
    {
      id: "constipation",
      title: "Tømmingsproblemer og forstoppelse for avføring",
      icon: "/constipation.svg",
    },
    {
      id: "pelvic-pain",
      title: "Langvarige underlivssmerter",
      icon: "/belly--1--1.svg",
    },
    {
      id: "pregnancy",
      title: "Plager under graviditet og etter fødsel",
      icon: "/vector-2.svg",
    },
  ],
  en: [
    { id: "urinary-incontinence", title: "Urinary incontinence", icon: "/image-7.svg" },
    {
      id: "urinary-retention",
      title: "Urinary retention",
      icon: "/vector.svg",
    },
    {
      id: "fecal-incontinence",
      title: "Fecal incontinence",
      icon: "/fecalincontinence.svg",
    },
    {
      id: "constipation",
      title: "Constipation and emptying problems",
      icon: "/constipation.svg",
    },
    {
      id: "pelvic-pain",
      title: "Chronic pelvic pain",
      icon: "/belly--1--1.svg",
    },
    {
      id: "pregnancy",
      title: "Pregnancy and postpartum issues",
      icon: "/vector-2.svg",
    },
  ],
} as const;

// Define condition-specific sections based on sitemap - bilingual
const CONDITION_SECTIONS_MAP = {
  "urinary-incontinence": {
    no: [
      { id: "normal-functions", title: "Funksjon", icon: "/normal.png" },
      { id: "symptoms", title: "Symptomer", icon: "/symptoms.png" },
      { id: "causes", title: "Årsaker", icon: "/couse.png", },
      { id: "diagnosis", title: "Utredning", icon: "/solae.png", },
      { id: "treatment", title: "Behandling", icon: "/treat.png", },
      { id: "exercises", title: "Øvelser", icon: "/exercises.png" },
      { id: "resources", title: "Ressurser", icon: "/resource.png" },
      { id: "references", title: "Referanser", icon: "/resource.png" },
    ],
    en: [
      { id: "normal-functions", title: "Normal Functions", icon: "/normal.png" },
      { id: "symptoms", title: "Symptoms", icon: "/symptoms.png" },
      { id: "causes", title: "Causes", icon: "/couse.png" },
      { id: "diagnosis", title: "Diagnosis", icon: "/solae.png", },
      { id: "treatment", title: "Treatment", icon: "/treat.png", },
      { id: "exercises", title: "Exercises", icon: "/exercises.png" },
      { id: "resources", title: "Resources", icon: "/resource.png" },
      { id: "references", title: "References", icon: "/resource.png" },
    ]
  },
  "urinary-retention": {
    no: [
      { id: "normal-functions", title: "Funksjon", icon: "/normal.png" },
      { id: "symptoms", title: "Symptomer", icon: "/symptoms.png" },
      { id: "causes", title: "Årsaker", icon: "/couse.png" },
      { id: "diagnosis", title: "Utredning", icon: "/solae.png" },
      { id: "treatment", title: "Behandling", icon: "/treat.png", },
      { id: "exercises", title: "Øvelser", icon: "/exercises.png" },
      { id: "resources", title: "Ressurser", icon: "/resource.png" },
      { id: "references", title: "Referanser", icon: "/resource.png" },
    ],
    en: [
      { id: "normal-functions", title: "Normal Functions", icon: "/normal.png" },
      { id: "symptoms", title: "Symptoms", icon: "/symptoms.png" },
      { id: "causes", title: "Causes", icon: "/couse.png" },
      { id: "diagnosis", title: "Diagnosis", icon: "/solae.png" },
      { id: "treatment", title: "Treatment", icon: "/treat.png", },
      { id: "exercises", title: "Exercises", icon: "/exercises.png" },
      { id: "resources", title: "Resources", icon: "/resource.png" },
      { id: "references", title: "References", icon: "/resource.png" },
    ]
  },
  "fecal-incontinence": {
    no: [
      { id: "normal-functions", title: "Funksjon", icon: "/normal.png" },
      { id: "symptoms", title: "Symptomer", icon: "/symptoms.png", },
      { id: "causes", title: "Årsaker", icon: "/couse.png" },
      { id: "diagnosis", title: "Utredning", icon: "/solae.png", },
      { id: "treatment", title: "Behandling", icon: "/treat.png", },
      { id: "exercises", title: "Øvelser", icon: "/exercises.png" },
      { id: "resources", title: "Ressurser", icon: "/resource.png" },
      { id: "references", title: "Referanser", icon: "/resource.png" },
    ],
    en: [
      { id: "normal-functions", title: "Normal Functions", icon: "/normal.png" },
      { id: "symptoms", title: "Symptoms", icon: "/symptoms.png", },
      { id: "causes", title: "Causes", icon: "/couse.png", },
      { id: "diagnosis", title: "Diagnosis", icon: "/solae.png", },
      { id: "treatment", title: "Treatment", icon: "/treat.png", },
      { id: "exercises", title: "Exercises", icon: "/exercises.png" },
      { id: "resources", title: "Resources", icon: "/resource.png" },
      { id: "references", title: "References", icon: "/resource.png" },
    ]
  },
  "constipation": {
    no: [
      { id: "symptoms", title: "Symptomer", icon: "/symptoms.png" },
      { id: "causes", title: "Årsaker", icon: "/couse.png" },
      { id: "diagnosis", title: "Utredning", icon: "/solae.png" },
      { id: "treatment", title: "Behandling", icon: "/treat.png", },
      { id: "exercises", title: "Øvelser", icon: "/exercises.png" },
      { id: "resources", title: "Ressurser", icon: "/resource.png" },
      { id: "references", title: "Referanser", icon: "/resource.png" },
    ],
    en: [
      { id: "symptoms", title: "Symptoms", icon: "/symptoms.png" },
      { id: "causes", title: "Causes", icon: "/couse.png" },
      { id: "diagnosis", title: "Diagnosis", icon: "/solae.png" },
      { id: "treatment", title: "Treatment", icon: "/treat.png" },
      { id: "exercises", title: "Exercises", icon: "/exercises.png" },
      { id: "resources", title: "Resources", icon: "/resource.png" },
      { id: "references", title: "References", icon: "/resource.png" },
    ]
  },
  "pelvic-pain": {
    no: [
      { id: "normal-functions", title: "Funksjon", icon: "/normal.png" },
      { id: "symptoms", title: "Symptomer", icon: "/symptoms.png" },
      { id: "causes", title: "Årsaker", icon: "/couse.png" },
      { id: "diagnosis", title: "Utredning", icon: "/solae.png" },
      { id: "treatment", title: "Behandling", icon: "/treat.png" },
      { id: "exercises", title: "Øvelser", icon: "/exercises.png" },
      { id: "resources", title: "Ressurser", icon: "/resource.png" },
      { id: "references", title: "Referanser", icon: "/resource.png" },
    ],
    en: [
      { id: "normal-functions", title: "Normal Functions", icon: "/normal.png" },
      { id: "symptoms", title: "Symptoms", icon: "/symptoms.png" },
      { id: "causes", title: "Causes", icon: "/couse.png" },
      { id: "diagnosis", title: "Diagnosis", icon: "/solae.png" },
      { id: "treatment", title: "Treatment", icon: "/treat.png" },
      { id: "exercises", title: "Exercises", icon: "/exercises.png" },
      { id: "resources", title: "Resources", icon: "/resource.png" },
      { id: "references", title: "References", icon: "/resource.png" },
    ]
  },
  "pregnancy": {
    no: [
      { id: "overview", title: "Oversikt", icon: "/normal.png" },
      { id: "exercises", title: "Øvelser", icon: "/exercises.png" },
      { id: "textbook", title: "Lærebok", icon: "/normal.png" },
      { id: "resources", title: "Ressurser", icon: "/resource.png" },
      { id: "references", title: "Referanser", icon: "/resource.png" },
    ],
    en: [
      { id: "overview", title: "Overview", icon: "/normal.png" },
      { id: "exercises", title: "Exercises", icon: "/exercises.png" },
      { id: "textbook", title: "Textbook", icon: "/normal.png" },
      { id: "resources", title: "Resources", icon: "/resource.png" },
      { id: "references", title: "References", icon: "/resource.png" },
    ]
  }
} as const;

export default function ConditionPage() {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const { id } = useParams(); // Get the condition ID from URL
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCondition, setActiveCondition] = useState(
    id || "urinary-incontinence"
  );
  const [activeSection, setActiveSection] = useState("overview");

  // Map activeSection to tilstand field prefixes for fallback check
  const sectionMap: Record<string, string> = {
    "normal-functions": "funksjon",
    "symptoms": "symptomer",
    "causes": "arsaker",
    "diagnosis": "utredning",
    "treatment": "behandling",
    "exercises": "ovelse",
    "resources": "ressurser",
    "references": "referanser",
    "textbook": "funksjon"
  };

  // Fetch CMS data for the active condition (all non-pregnancy conditions use Directus)
  const { tilstand: cmsTilstand, loading: cmsLoading } = useConditionDetails(activeCondition, language);

  const ALL_CONDITIONS = ALL_CONDITIONS_DATA[language];
  const CONDITION_SECTIONS = CONDITION_SECTIONS_MAP[activeCondition as keyof typeof CONDITION_SECTIONS_MAP]?.[language] || [];
  const pregnancyCards =
    activeCondition === "pregnancy"
      ? PREGNANCY_SECTION_CARDS[language]
      : [];

  // ... (previous useEffects remain same)
  // Update active condition when URL parameter changes
  useEffect(() => {
    if (id) {
      setActiveCondition(id);
    }
  }, [id]);

  // Sync section from query param and default when missing/invalid
  useEffect(() => {
    const sectionParam = searchParams.get("section");
    const navigableSectionIds = new Set(
      CONDITION_SECTIONS.map((section) => section.id)
    );
    if (activeCondition === "pregnancy") {
      pregnancyCards.forEach((card) => {
        navigableSectionIds.add(card.id);
      });
      // Add "overview" as a valid section for pregnancy
      navigableSectionIds.add("overview");
    }

    const hasHash = window.location.hash && window.location.hash.length > 1;
    const validSection = sectionParam
      ? navigableSectionIds.has(sectionParam as any)
      : false;

    if (sectionParam && validSection) {
      if (sectionParam !== activeSection) {
        setActiveSection(sectionParam);
      }
    } else {
      if (activeCondition === "pregnancy" && hasHash) {
        if (activeSection !== "overview") {
          setActiveSection("overview");
        }
      } else {
        const firstSection = CONDITION_SECTIONS[0]?.id || "overview";
        if (activeSection !== firstSection) {
          setActiveSection(firstSection);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, id, activeCondition]);

  // Canonicalize URL when missing id (e.g., /conditions)
  useEffect(() => {
    if (!id) {
      navigate(`/conditions/${activeCondition}?section=${activeSection}`, {
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConditionClick = (conditionId: string) => {
    setActiveCondition(conditionId);
    const newSections = CONDITION_SECTIONS_MAP[conditionId as keyof typeof CONDITION_SECTIONS_MAP]?.[language] || [];
    const firstSection = newSections[0]?.id || "normal-functions";
    setActiveSection(firstSection);
    navigate(`/conditions/${conditionId}?section=${firstSection}`);
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    if (id) {
      navigate(`/conditions/${id}?section=${sectionId}`);
    } else {
      navigate(`/conditions/${activeCondition}?section=${sectionId}`);
    }
  };

  const renderSectionContent = () => {
    // Pregnancy has unique UI components not in the standard CMS pattern
    if (activeCondition === "pregnancy") {
      if (activeSection === "overview") {
        return <UpgradedPregnancyContent />;
      }
      if (activeSection === "normal-functions") {
        return (
          <>
            <PregnancyNormalFunctions />
            {pregnancyCards.length > 0 && (
              <div
                className={`${styles.pregnancyCardGrid} ${resolvedTheme === "dark" ? styles.darkMode : styles.lightMode}`}
                role="navigation"
                aria-label={language === "no" ? "Utforsk flere temasider for graviditet" : "Explore additional pregnancy topics"}
              >
                {pregnancyCards.map((card) => {
                  const isActive = activeSection === (card.id as any);
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleSectionChange(card.id)}
                      className={`${styles.pregnancyCard} ${isActive ? styles.pregnancyCardActive : ""}`}
                      aria-pressed={isActive}
                      aria-label={`${card.title} - ${card.description}`}
                    >
                      <div className={styles.pregnancyCardHeader}>
                        <div className={styles.pregnancyCardIconWrapper}>
                          <img src={card.icon} alt="" role="presentation" className={styles.pregnancyCardIcon} />
                        </div>
                        <h3 className={styles.pregnancyCardTitle}>{card.title}</h3>
                      </div>
                      <p className={styles.pregnancyCardDescription}>{card.description}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        );
      }
    }

    // All content from Directus CMS
    if (!cmsTilstand) return null;

    return (
      <>
        {activeSection === "normal-functions" && (
          <TilstandIntroduction tilstand={cmsTilstand} />
        )}
        <TilstandDynamicSection tilstand={cmsTilstand} activeSection={activeSection} />
      </>
    );
  };

  return (
    <>
      <Header />
      <div className={`${styles.container} ${resolvedTheme === 'dark' ? styles.darkMode : styles.lightMode}`}>
        <main id="main-content" role="main">
          {/* Page Title */}
          <div className={`${styles.pageHeader} ${resolvedTheme === 'dark' ? styles.darkMode : styles.lightMode}`}>
            <h1 className={styles.pageTitle}>{language === 'no' ? 'Tilstander' : 'Conditions'}</h1>
          </div>

          {/* Condition Navigation Bar -- the Upper one*/}
          <div className={`${styles.conditionNavigation} ${resolvedTheme === 'dark' ? styles.darkMode : styles.lightMode}`}>
            <div className={styles.conditionNavContainer}>
              {ALL_CONDITIONS.map((condition) => (
                <button
                  key={condition.id}
                  onClick={() => handleConditionClick(condition.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleConditionClick(condition.id);
                    }
                  }}
                  className={`${styles.conditionNavItem} ${activeCondition === condition.id
                    ? styles.conditionNavItemActive
                    : ""
                    }`}
                  aria-label={`Select ${condition.title} condition`}
                >
                  <div className={styles.conditionIcon}>
                    <img
                      src={condition.icon || "/placeholder.svg"}
                      alt={condition.title}
                      className={styles.conditionIconImage}
                    />
                  </div>
                  <div className={styles.conditionTitle}>{condition.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section Navigation -- the Downers */}
          <div
            className={`${styles.sectionNavigation} ${resolvedTheme === 'dark' ? styles.darkMode : styles.lightMode}`}
            aria-label={language === 'no' ? 'Seksjonsnavigasjon' : 'Section navigation'}
          >
            <div className={styles.sectionNavList} role="tablist">
              {CONDITION_SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    id={`tab-${section.id}`}
                    role="tab"
                    aria-controls={`panel-${section.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSectionChange(section.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSectionChange(section.id);
                      }
                    }}
                    className={`${styles.sectionNavButton} ${isActive ? styles.sectionNavButtonActive : ""
                      }`}
                    aria-label={language === 'no' ? `Velg seksjon ${section.title}` : `Select section ${section.title}`}
                  >
                    <span className={styles.sectionText}>{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className={`${styles.mainContent} ${resolvedTheme === 'dark' ? styles.darkMode : styles.lightMode}`}>
            <div
              id={`panel-${activeSection}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeSection}`}
              className={`${styles.contentContainer} ${resolvedTheme === 'dark' ? styles.darkMode : styles.lightMode}`}
            >

              {renderSectionContent()}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
