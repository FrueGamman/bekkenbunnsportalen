"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";

/*
const CAUSES_DATA = {
  no: {
    pageTitle: "Årsaker",
    patientQuote: "Når jeg tisser er strålen veldig svak og det stopper ofte opp underveis. Jeg unngår offentlige toalett hvor andre kan høre at jeg tisser.",
    patientAge: "Mann, 29 år",
    causes: [
      {
        id: "various",
        title: "Ulike årsaker",
        content: "Problemer med å tømme blæren kan skyldes ulike tilstander. For eksempel kan ulike sykdommer forstyrre nervesignalene mellom vannlatingssentrene i hjernen og blæren. Eksempler på dette kan være Multippel sklerose (MS), Parkinson, hjerneslag, skiveprolaps eller operasjoner i bekkenet. Disse tilstandene kan føre til nevrogen påvirkning slik at blæren ikke trekker seg så godt sammen ved tømming eller at lukkemuskelen i urinrøret ikke åpner seg slik den skal. Tømmingsproblemer kan også være av psykologisk art, men det er viktig å utelukke andre årsaker."
      },
      ...
    ]
  },
  en: {
    ...
  }
} as const
*/

const CAUSES_DATA = {
  no: { pageTitle: "Årsaker", patientQuote: "", patientAge: "", causes: [] as any[] },
  en: { pageTitle: "Causes", patientQuote: "", patientAge: "", causes: [] as any[] }
};


export const Causes = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const { pageTitle, patientQuote, patientAge, causes } = CAUSES_DATA[language];
  // const introduction = INTRODUCTION_DATA[language];

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img src="/couse.png" alt="Causes" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>
            {pageTitle}
          </h2>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.highlightBox}>
            <p>
              {patientQuote}
            </p>
            <p className={styles.quoteAuthor}>
              {patientAge}
            </p>
          </div>

          {causes.map((cause, index) => (
            <SectionAccordion
              key={index}
              title={cause.title}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              {('hasSideBySide' in cause) && (cause as any).hasSideBySide ? (
                <div className={styles.sideBySideContainer}>
                  <div className={styles.sideBySideText}>
                    <div className={styles.enhancedParagraph}>
                      {cause.content.split('\n\n').map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: index < cause.content.split('\n\n').length - 1 ? '1rem' : '0' }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className={styles.sideBySideImage}>
                    <img
                      src={(cause as any).sideBySideImage.src}
                      alt={(cause as any).sideBySideImage.alt}
                      className={styles.sideBySideImageElement}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.enhancedParagraph}>
                  {cause.content.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} style={{ marginBottom: index < cause.content.split('\n\n').length - 1 ? '1rem' : '0' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </SectionAccordion>
          ))}
        </div>
      </div>
    </>
  );
};