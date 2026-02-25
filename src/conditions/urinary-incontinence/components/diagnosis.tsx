"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"



// Content data structure
type DiagnosisData = {
  pageTitle: string;
  intro: {
    lead: string;
    questions: string;
    questionList: string[];
    process: string;
  };
  sections: Array<{
    id: string;
    title: string;
    content: Array<{
      type: "paragraph" | "list" | "link";
      text?: string;
      items?: string[];
      linkText?: string;
      linkUrl?: string;
      linkContext?: string;
    }>;
  }>;
};

/*
const DIAGNOSIS_DATA: Record<'no' | 'en', DiagnosisData> = {
  ...
}
*/
const DIAGNOSIS_DATA: Record<'no' | 'en', DiagnosisData> = {
  no: {
    pageTitle: "Utredning",
    intro: { lead: "", questions: "", questionList: [], process: "" },
    sections: []
  },
  en: {
    pageTitle: "Diagnosis",
    intro: { lead: "", questions: "", questionList: [], process: "" },
    sections: []
  }
};

export const Diagnosis = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const { pageTitle, intro, sections } = DIAGNOSIS_DATA[language]

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/solae.png"
              alt="Diagnosis"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {/* Intro Section with Image */}
          <div className={styles.normalFunctionSection}>
            <div className={styles.diagnosisIntroLayout}>
              <div className={styles.diagnosisIntroText}>
                <p className={styles.enhancedParagraph}>{intro.lead}</p>

                <h4 className={styles.normalFunctionTitle}>{intro.questions}</h4>
                <ul className={styles.bulletList}>
                  {intro.questionList.map((question) => (
                    <li key={question.substring(0, 30)} className={styles.enhancedParagraph}>
                      {question}
                    </li>
                  ))}
                </ul>

                <p className={styles.enhancedParagraph}>{intro.process}</p>
              </div>

              <div className={styles.diagnosisIntroImage}>
                <div className={styles.diagnosisImageContainer}>
                  <img
                    src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/shutterstock_mann159831206.jpg"
                    alt="Utredning illustrasjon"
                    className={styles.diagnosisImage}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sections as Accordions */}
          {sections.map((section) => (
            <SectionAccordion
              key={section.id}
              title={section.title}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              {section.content.map((item) => {
                if (item.type === "paragraph") {
                  return (
                    <p key={item.text?.substring(0, 50)} className={styles.enhancedParagraph}>
                      {item.text}
                    </p>
                  );
                }

                if (item.type === "list") {
                  return (
                    <ul key={item.items?.[0]?.substring(0, 40)} className={styles.bulletList}>
                      {item.items?.map((listItem) => (
                        <li key={listItem.substring(0, 40)} className={styles.enhancedParagraph}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (item.type === "link") {
                  return (
                    <p key={item.linkText} className={styles.enhancedParagraph}>
                      {item.linkContext} (<a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.resourceLink}
                      >
                        {item.linkText}
                      </a>){item.text}
                    </p>
                  );
                }

                return null;
              })}
            </SectionAccordion>
          ))}
        </div>
      </div>
    </>
  )
}