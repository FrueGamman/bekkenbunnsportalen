"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";

const INTRODUCTION_DATA = {
  no: {
    description: "På disse sidene finner du informasjon om tømmingsproblemer for urin, urinretensjon. Her er informasjon om normal funksjon av vannlatingen, symptomer på tømmingsproblemer, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet.",
    keyPoints: [
      "Lær om konservative behandlingsalternativer",
      "Forstå når kirurgisk behandling kan være nødvendig",
      "Få praktiske råd for håndtering av problemet",
      "Utforsk forskjellige behandlingsmetoder"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Behandling av urinretensjon",
      caption: "Oversikt over behandlingsalternativer"
    }
  },
  en: {
    description: "On these pages you will find information about urinary emptying problems, urinary retention. Here is information about normal urination function, symptoms of emptying problems, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected.",
    keyPoints: [
      "Learn about conservative treatment options",
      "Understand when surgical treatment may be necessary",
      "Get practical advice for managing the problem",
      "Explore different treatment methods"
    ],
    image: {
      src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX12986833.jpg",
      alt: "Treatment of urinary retention",
      caption: "Overview of treatment options"
    }
  }
} as const;

interface PositionImage {
  src: string;
  alt: string;
  caption: string;
}

interface TreatmentSection {
  id: string;
  title: string;
  content?: string;
  hasImage?: boolean;
  image?: { src: string; alt: string; caption: string };
  hasGenderTips?: boolean;
  hasPositionImages?: boolean;
  positionImages?: PositionImage[];
  note?: string;
  // Fields for good_urination_rules
  intro?: string;
  position?: string;
  conclusion?: string;
  source?: string;
  rules?: string[];
  // Fields for links (like catheterization resources)
  hasLinks?: boolean;
  links?: { text: string; url: string }[];
}

interface SurgicalSection { id: string; title: string; content: string }

interface CopingSection {
  id: string;
  title: string;
  content: string | string[];
  hasImage?: boolean;
  image?: { src: string; alt: string; caption: string };
}

interface TreatmentContent {
  pageTitle: string;
  patientQuote: string;
  patientAge: string;
  patientGuide: string;
  conservativeTitle: string;
  surgicalTitle: string;
  copingTitle: string;
  surgicalIntro: string;
  copingQuote: string;
  copingQuoteAuthor: string;
  sections: TreatmentSection[];
  surgicalSections: SurgicalSection[];
  copingSections: CopingSection[];
}

type SupportedLanguage = "no" | "en";

// Structured bilingual data for treatment content
/*
const TREATMENT_DATA: Record<SupportedLanguage, TreatmentContent> = {
  no: {
    pageTitle: "Behandling",
    patientQuote: "Jeg har nok aldri tatt meg god tid på toalettet og har alltid presset for å bli ferdig raskt.",
    patientAge: "Kvinne, 82 år",
    ...
  },
  en: {
    ...
  }
};
*/

const TREATMENT_DATA: Record<SupportedLanguage, TreatmentContent> = {
  no: {
    pageTitle: "Behandling",
    patientQuote: "",
    patientAge: "",
    patientGuide: "",
    conservativeTitle: "",
    surgicalTitle: "",
    copingTitle: "",
    surgicalIntro: "",
    copingQuote: "",
    copingQuoteAuthor: "",
    sections: [] as any[],
    surgicalSections: [] as any[],
    copingSections: [] as any[],
  },
  en: {
    pageTitle: "Treatment",
    patientQuote: "",
    patientAge: "",
    patientGuide: "",
    conservativeTitle: "",
    surgicalTitle: "",
    copingTitle: "",
    surgicalIntro: "",
    copingQuote: "",
    copingQuoteAuthor: "",
    sections: [] as any[],
    surgicalSections: [] as any[],
    copingSections: [] as any[],
  }
};


export const Treatment = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const introduction = INTRODUCTION_DATA[language];

  const data = TREATMENT_DATA[language];

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img src="/treat.png" alt="Treatment" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>
            {data.pageTitle}
          </h2>
        </div>
        <div className={styles.sectionContent}>

          <div className={styles.normalFunctionSection}>
            <div className={styles.highlightBox}>
              <p>
                {data.patientQuote}
              </p>
              <p className={styles.quoteAuthor}>
                {data.patientAge}
              </p>
            </div>
            <div className={styles.normalFunctionContent}>
              <p className={styles.enhancedParagraph}>
                {data.patientGuide}
              </p>
            </div>
          </div>


          {/* 1. Konservativ behandling */}
          <SectionAccordion
            title={data.conservativeTitle}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {data.sections.map((section) => (
              <SectionAccordion
                key={section.id}
                title={section.title}
                isDarkMode={resolvedTheme === 'dark'}
                defaultOpen={false}
              >
                {section.hasImage && section.image ? (
                  <div className={styles.anatomyGrid}>
                    <div>
                      <p className={styles.enhancedParagraph}>
                        {section.content}
                      </p>
                    </div>
                    <div className={styles.anatomyItem}>
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className={styles.anatomyImage}
                      />
                      <p className={styles.anatomyCaption}>
                        {section.image.caption}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className={styles.enhancedParagraph}>
                    {section.content}
                  </p>
                )}

                {(section.hasGenderTips || section.hasPositionImages) && (
                  <div className={styles.anatomySection}>
                    <div className={styles.anatomyGrid}>
                      {section.hasGenderTips && (
                        <div>
                          <div className={styles.highlightBox}>
                            <h5 className={styles.enhancedSubheading}>
                              {language === 'no' ? 'Menn' : 'Men'}
                            </h5>
                            <ul className={styles.resourceList}>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Sitt ned når du tisser' : 'Sit down when you urinate'}
                              </li>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Ha god kontakt mellom føttene og gulvet' : 'Have good contact between feet and floor'}
                              </li>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Len deg lett fremover' : 'Lean slightly forward'}
                              </li>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Slapp av i bekkenbunnen' : 'Relax the pelvic floor'}
                              </li>
                            </ul>
                          </div>
                          <div className={styles.highlightBox} style={{ marginTop: '1rem' }}>
                            <h5 className={styles.enhancedSubheading}>
                              {language === 'no' ? 'Kvinner' : 'Women'}
                            </h5>
                            <ul className={styles.resourceList}>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Sitt ned når du tisser' : 'Sit down when you urinate'}
                              </li>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Ha god kontakt mellom føttene og gulvet' : 'Have good contact between feet and floor'}
                              </li>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Len deg lett fremover' : 'Lean slightly forward'}
                              </li>
                              <li className={styles.resourceListItem}>
                                {language === 'no' ? 'Slapp av i bekkenbunnen' : 'Relax the pelvic floor'}
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                      {section.hasPositionImages && (
                        <div className={styles.anatomyItem}>
                          <div className={styles.anatomyGrid}>
                            {section.positionImages!.map((image) => (
                              <div key={image.src} className={styles.anatomyItem}>
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className={styles.anatomyImage}
                                />
                                <p className={styles.anatomyCaption}>
                                  {image.caption}
                                </p>
                              </div>
                            ))}
                          </div>
                          <p className={styles.illustrationDescription}>
                            {section.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {section.id === 'good_urination_rules' && (
                  <>
                    <p className={styles.enhancedParagraph}>
                      {section.intro}
                    </p>
                    <p className={styles.enhancedParagraph}>
                      {section.position}
                    </p>
                    <ul className={styles.diagnosisList}>
                      {section.rules!.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                    <p className={styles.enhancedParagraph}>
                      {section.conclusion}
                    </p>
                    <div className={styles.highlightBox}>
                      <p>
                        {section.source}
                      </p>
                    </div>
                  </>
                )}

                {section.hasLinks && section.links && (
                  <div className={styles.resourcesSection}>
                    <h4 className={styles.resourcesTitle}>
                      {language === 'no' ? 'Instruksjonsressurser:' : 'Instructional Resources:'}
                    </h4>
                    <ul className={styles.resourceList}>
                      {section.links.map((link) => (
                        <li key={link.url} className={styles.resourceListItem}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resourceLink}
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </SectionAccordion>
            ))}
          </SectionAccordion>

          {/* 2. Kirurgisk behandling */}
          <SectionAccordion
            title={data.surgicalTitle}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              <p className={styles.enhancedParagraph}>{data.surgicalIntro}</p>
            </div>

            {data.surgicalSections.map((section) => (
              <SectionAccordion
                key={section.id}
                title={section.title}
                isDarkMode={resolvedTheme === 'dark'}
                defaultOpen={false}
              >
                <p className={styles.enhancedParagraph}>
                  {section.content}
                </p>
              </SectionAccordion>
            ))}
          </SectionAccordion>

          {/* 3. Mestring */}
          <SectionAccordion
            title={data.copingTitle}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.highlightBox}>
              <p>{data.copingQuote}</p>
              <p className={styles.quoteAuthor}>{data.copingQuoteAuthor}</p>
            </div>

            {data.copingSections.map((section) => (
              <SectionAccordion
                key={section.id}
                title={section.title}
                isDarkMode={resolvedTheme === 'dark'}
                defaultOpen={false}
              >
                {section.hasImage && section.image ? (
                  <div className={styles.anatomyGrid}>
                    <div>
                      {Array.isArray(section.content) ? (
                        section.content.map((content) => (
                          <p key={content} className={styles.enhancedParagraph}>{content}</p>
                        ))
                      ) : (
                        <p className={styles.enhancedParagraph}>
                          {section.content}
                        </p>
                      )}
                    </div>
                    <div className={styles.anatomyItem}>
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className={styles.anatomyImage}
                      />
                      <p className={styles.anatomyCaption}>
                        {section.image.caption}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {Array.isArray(section.content) ? (
                      section.content.map((content) => (
                        <p key={content} className={styles.enhancedParagraph}>{content}</p>
                      ))
                    ) : (
                      <p className={styles.enhancedParagraph}>
                        {section.content}
                      </p>
                    )}
                  </>
                )}
              </SectionAccordion>
            ))}
          </SectionAccordion>

        </div>
      </div>
    </>
  );
};