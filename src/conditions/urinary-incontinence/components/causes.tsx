"use client";

import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import { SectionAccordion } from "../../../components/SectionAccordion";
import styles from "./section-content.module.css";

type CauseItem = {
  title: string;
  description: string;
  link?: {
    text: string;
    url: string;
  };
  links?: Array<{
    text: string;
    url: string;
  }>;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  sections?: Array<{
    subtitle: string;
    content: string;
  }>;
};

type CausesData = {
  pageTitle: string;
  intro: {
    quote: string;
    attribution: string;
    description: string;
  };
  temporaryCauses: {
    title: string;
    intro: string;
    causes: CauseItem[];
  };
  pregnancyAgeDiseases: {
    title: string;
    quote: string;
    attribution: string;
    sections: Array<{
      title: string;
      subsections: Array<{
        title: string;
        content: string;
        link?: {
          text: string;
          url: string;
        };
        image?: {
          src: string;
          alt: string;
          caption: string;
        };
        bullets?: string[];
        sections?: Array<{
          subtitle: string;
          content: string;
        }>;
      }>;
    }>;
  };
};

/*
const CAUSES_DATA: Record<'no' | 'en', CausesData> = {
  no: {
    pageTitle: "Årsaker",
    intro: {
      quote: '"Jeg føler meg ikke lenger like mandig som før. Det gjør noe med en å måtte gå med bleier."',
      attribution: "Mann, 63 år",
      description: "Det kan være mange årsaker til urininkontinens, og tilstanden er ofte forårsaket av flere faktorer. Det er derfor viktig med grundig kartlegging av tilstanden og mulige årsaker, slik at behandlingen blir riktig og så god som mulig. Videre kan du lese mer om ulike årsaker til urininkontinens."
    },
    ...
  },
  en: {
    ...
  }
}
*/
const CAUSES_DATA: Record<'no' | 'en', CausesData> = {
  no: {
    pageTitle: "Årsaker",
    intro: { quote: "", attribution: "", description: "" },
    temporaryCauses: { title: "Midlertidige årsaker", intro: "", causes: [] },
    pregnancyAgeDiseases: { title: "Svangerskap, aldersforandringer og sykdom", quote: "", attribution: "", sections: [] }
  },
  en: {
    pageTitle: "Causes",
    intro: { quote: "", attribution: "", description: "" },
    temporaryCauses: { title: "Temporary Causes", intro: "", causes: [] },
    pregnancyAgeDiseases: { title: "Pregnancy, Age Changes and Disease", quote: "", attribution: "", sections: [] }
  }
};
export const Causes = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = CAUSES_DATA[language]

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/solae.png"
              alt="Causes"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {/* Intro with quote */}
          <div className={styles.normalFunctionSection}>
            <blockquote className={styles.patientQuote}>
              <p className={styles.quoteText}>{data.intro.quote}</p>
              <footer className={styles.quoteAttribution}>— {data.intro.attribution}</footer>
            </blockquote>
            <p className={styles.enhancedParagraph}>
              {data.intro.description}
            </p>
          </div>

          {/* Temporary Causes */}
          <SectionAccordion
            title={data.temporaryCauses.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {data.temporaryCauses.intro}
            </p>

            {data.temporaryCauses.causes.map((cause) => (
              <div key={cause.title} className={styles.normalFunctionSection}>
                <h4 className={styles.normalFunctionTitle}>{cause.title}</h4>

                {/* Special layout for sections with images that should be side-by-side */}
                {(cause.title === "Medikamenter" || cause.title === "Medications" ||
                  cause.title === "Overdrevet inntak av drikke" || cause.title === "Excessive Intake of Fluids") && cause.image ? (
                  <div className={styles.sideBySideContainer}>
                    <div className={styles.sideBySideText}>
                      <p className={styles.enhancedParagraph}>
                        {cause.description}
                      </p>

                      {cause.link && (
                        <p className={styles.enhancedParagraph}>
                          <a
                            href={cause.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resourceLink}
                          >
                            {cause.link.text}
                          </a>
                        </p>
                      )}
                    </div>

                    <div className={styles.sideBySideImage}>
                      <img
                        src={cause.image.src}
                        alt={cause.image.alt}
                      />
                      <p className={styles.sideBySideImageCaption}>{cause.image.caption}</p>
                    </div>
                  </div>
                ) : (
                  /* Default layout for other sections */
                  <>
                    <p className={styles.enhancedParagraph}>
                      {cause.description}
                    </p>

                    {cause.link && (
                      <p className={styles.enhancedParagraph}>
                        <a
                          href={cause.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.resourceLink}
                        >
                          {cause.link.text}
                        </a>
                      </p>
                    )}

                    {cause.links && (
                      <p className={styles.enhancedParagraph}>
                        Mer informasjon om forstoppelse finner du på siden om {' '}
                        {cause.links.map((link, index) => (
                          <span key={link.url}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.resourceLink}
                            >
                              {link.text}
                            </a>
                            {index < (cause.links?.length ?? 0) - 1 && ' og '}
                          </span>
                        ))}
                      </p>
                    )}

                    {cause.image && (
                      <div className={styles.anatomyItem}>
                        <img
                          src={cause.image.src}
                          alt={cause.image.alt}
                          className={styles.anatomyImage}
                        />
                        <p className={styles.anatomyCaption}>{cause.image.caption}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </SectionAccordion>

          {/* Pregnancy, Age Changes and Diseases */}
          <SectionAccordion
            title={data.pregnancyAgeDiseases.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {/* Quote */}
            <blockquote className={styles.patientQuote}>
              <p className={styles.quoteText}>"{data.pregnancyAgeDiseases.quote}"</p>
              <footer className={styles.quoteAttribution}>— {data.pregnancyAgeDiseases.attribution}</footer>
            </blockquote>

            {/* Sections */}
            {data.pregnancyAgeDiseases.sections.map((section, index) => (
              <div key={section.title || `section-${index}`}>
                {section.title && (
                  <div className={styles.causesMainSectionTitle}>
                    {section.title}
                  </div>
                )}

                {section.subsections.map((subsection) => (
                  <div key={subsection.title} className={styles.normalFunctionSection}>
                    <h4 className={styles.normalFunctionTitle}>{subsection.title}</h4>

                    {subsection.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className={styles.enhancedParagraph}>
                        {paragraph}
                        {pIndex === 0 && subsection.link && (
                          <>
                            {' '}(<a
                              href={subsection.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.resourceLink}
                            >
                              {subsection.link.text}
                            </a>)
                          </>
                        )}
                      </p>
                    ))}

                    {subsection.sections && subsection.sections.map((section) => (
                      <div key={section.subtitle}>
                        <h5 className={styles.enhancedSubheading}>{section.subtitle}</h5>
                        {section.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className={styles.enhancedParagraph}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ))}

                    {subsection.bullets && (
                      <ul className={styles.bulletList}>
                        {subsection.bullets.map((bullet) => (
                          <li key={bullet.substring(0, 50)} className={styles.enhancedParagraph}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {subsection.image && (
                      <div className={styles.anatomyItem}>
                        <img
                          src={subsection.image.src}
                          alt={subsection.image.alt}
                          className={styles.anatomyImage}
                        />
                        <p className={styles.anatomyCaption}>{subsection.image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </SectionAccordion>
        </div>
      </div>
    </>
  )
}
